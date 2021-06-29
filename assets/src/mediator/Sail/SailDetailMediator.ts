module Pro
{
	export class SailDetailMediator extends BaseMediator implements IMediator
	{
		public UIOpenData: SailDetailOpenUIData;
		public UIPanel: ProUI.Sail.DetailInfoUI;
		/** 当前已解锁的英雄 */
		private TempPetList: Array<Net.hero>;

		/** 当前选择的英雄类型索引 */
		private TmpSelectHeroTypeIndex = 0;

		/** 当前需要消耗的远航点数 */
		private _needSailPoint = 0;

		/** 上阵的英雄信息 */
		private TmpOnStoreList: Array<Net.hero> = [];

		/** 需要自动加载的资源列表*/
		public autoLoadAtlas(): Array<any>
		{
			return null;
		}

		public openUI(): void
		{
			this.showPanel(ProUI.Sail.DetailInfoUI, 3, BaseAddLayer.TopUI, true);
		}

        /**
         * 关闭UI
         */
		public closeUI(): void
		{
			this.closePanel();
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		public initialization(): void
		{

		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		public addEvent(): void
		{
			this.UIPanel.btnGetPoint.onClick(this, this.onClickGetPoint)
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		public removeEvent(): void
		{

		}

        /**
         * 初始化面板ui
         */
		public initUI(): void
		{
			this.UIPanel.AutoSendBtn.onClick(this, this.onAutoOnStorePets);

			this.UIPanel.SendBtn.onClick(this, this.onAcceptSail);

			this.TmpSelectHeroTypeIndex = -1;
			this.TmpOnStoreList.splice(0, this.TmpOnStoreList.length);
			this.refreshUI();
		}

		/** 点击获取情报 */
		private onClickGetPoint(): void
		{
			UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_QuickFight), BaseBackUIType.HideBackUI);
		}

		public refreshUI()
		{

			let tempSailType = cfg.SailPoolCfgData.getSailTypeByIndex(this.UIOpenData.info.index);

			let tempSailCurPoint = Global.getItemNum(CfgID.ItemID.SailPoint);
			this._needSailPoint = cfg.SailTypeCfgData.getNeedSailPointBySailType(tempSailType); // SailDataMgr.getSailMaxPoint();	
			//活动减免次数
			let actData = ActivityDataMgr.getActivityDataByType(Pb_God._emActivityType.Activity_Times, Pb_God._emActivityTimesType.Activity_Times_Voyage);
			if (actData)
				this._needSailPoint -= parseInt(cfg.ActivityCfgData.getParamByID(actData.id).split(";")[1] || "0");

			this.UIPanel.SailPointLb.text = tempSailCurPoint + "/" + this._needSailPoint;
			// this.UIPanel.btnGetPoint.visible = tempSailCurPoint < this._needSailPoint;

			let tempSailCoolTime = cfg.SailTypeCfgData.getCoolTimeBySailType(tempSailType) * 60;
			this.UIPanel.SaillNeedTimeLb.text = Global.GetRemindTime(tempSailCoolTime);

			PetDataMgr.refreshOnSailHero();
			this.refreshHeroType();
			this.refreshOnStoreList();
		}

		//--------------------------------选择英雄类型---------------------------
		/** 刷新英雄类型 */
		private refreshHeroType()
		{
			let heroTypeNum = 1 + Pb_God._emPetType.PetType_Moon;
			this.UIPanel.HeroTypeBox.onRefresh(heroTypeNum, this, (itemUI: component.UIButton, index: number) =>
			{

				Global.setResPetType(itemUI, index);
				itemUI.onClick(this, this.onHeroTypeClick);

				if (this.TmpSelectHeroTypeIndex == -1)
				{
					this.onHeroTypeClick(itemUI);
				}
			});
		}

		/** 选择一个英雄类型 */
		private onHeroTypeClick(btn: component.UIButton)
		{
			this.UIPanel.HeroTypeSelectImg.x = btn.x;
			this.UIPanel.HeroTypeSelectImg.y = btn.y;
			this.TmpSelectHeroTypeIndex = parseInt(btn.name);
			this.refreshPetsLayer();
		}

		//--------------------------------英雄列表--------------------------------
		/** 刷新当前拥有的角色状态 */
		private refreshPetsLayer()
		{
			this.TempPetList = PetDataMgr.getPetList(this.TmpSelectHeroTypeIndex);
			this.UIPanel.HeroList.onRefresh(this.TempPetList.length, this, this.onHeroListRender);
		}

		/** 刷新状态 */
		private onHeroListRender(item: NorItemUI, index: number): void
		{
			let tmpHeroInfo = this.TempPetList[index] as Net.hero;
			item.setPetInfo(tmpHeroInfo, false);
			item.SelectStatueImg.visible = tmpHeroInfo.isSelected;
			item.SailingStatueImg.visible = tmpHeroInfo.onSail;
			item.onClick(this, this.onHeroListSelect);
		}

		/** 选择英雄列表的目标 */
		private onHeroListSelect(item: NorItemUI)
		{

			let index = parseInt(item.name);
			let tempPetInfo = this.TempPetList[index];
			if (tempPetInfo.onSail)
			{
				return;
			}
			if (tempPetInfo.isSelected)
			{
				let tempIndex = -1;
				for (let i = 0; i < this.TmpOnStoreList.length; i++)
				{
					if (this.TmpOnStoreList[i].sn.equals(tempPetInfo.sn))
					{
						tempIndex = i;
						break;
					}
				}
				this.TmpOnStoreList[tempIndex].isSelected = false;
				this.TmpOnStoreList.splice(tempIndex, 1);
			}
			else if (this.TmpOnStoreList.length < 3)
			{
				this.TmpOnStoreList.push(tempPetInfo);
				this.TempPetList[index].isSelected = true;
			}

			this.refreshOnStoreList();
			this.refreshPetsLayer();

		}

		//----------------------------------英雄上阵列表------------------------------
		/** 刷新上阵列表 */
		private refreshOnStoreList()
		{
			this.UIPanel.HeroOnBox.onRefresh(3, this, (item: NorItemUI, index: number) =>
			{
				if (index < this.TmpOnStoreList.length)
				{
					let tmpHeroInfo = this.TmpOnStoreList[index];
					item.setPetInfo(tmpHeroInfo, false);
					item.onClick(this, () =>
					{
						this.TmpOnStoreList[index].isSelected = false;
						this.TmpOnStoreList.splice(index, 1);
						this.refreshOnStoreList();
						this.refreshPetsLayer();
					});
				}
				else
				{
					item.setEmptyInfo();
				}
			});
			this.UIPanel.HeroOnBGBox.onRefresh(3, null, null);
			this.refreshOnStoreCondition();
		}

		//--------------------------------选择英雄条件刷新-----------------------
		private refreshOnStoreCondition()
		{

			let tempActiveNum = 0;
			let tempNeedPetStar = cfg.SailPoolCfgData.getNeedPetStarByIndex(this.UIOpenData.info.index);
			let tempNeedPetTypeAry = cfg.SailPoolCfgData.getNeedPetTypeAryById(this.UIOpenData.info.index);
			this.UIPanel.SailCondtionBox.onRefresh(1 + tempNeedPetTypeAry.length, this, (itemUI: component.UIButton, index: number) =>
			{
				if (index == 0)
				{
					itemUI.visible = false;
					this.UIPanel.SailCondtionStarBox.x = this.UIPanel.SailCondtionBox.x + this.UIPanel.SailCondtionBox.ContentLayer.x + itemUI.x;
					this.UIPanel.SailCondtionStarBox.y = this.UIPanel.SailCondtionBox.y + this.UIPanel.SailCondtionBox.ContentLayer.y + itemUI.y;
					this.UIPanel.SailCondtionStarLb.text = tempNeedPetStar.toString();
					this.UIPanel.SailCondtionStarBox.gray = this.TmpOnStoreList.filter(elment => elment.star >= tempNeedPetStar).length == 0;
					tempActiveNum += this.UIPanel.SailCondtionStarBox.gray ? 0 : 1;
				}
				else
				{
					let needPetType = tempNeedPetTypeAry[index - 1].value1;
					Global.setResPetType(itemUI, needPetType);
					itemUI.gray = this.TmpOnStoreList.filter(elment => cfg.PetCfgData.getPetTypeByPetID(elment.id) == needPetType).length == 0;
					tempActiveNum += itemUI.gray ? 0 : 1;
				}
				this.UIPanel.SailCondtionLb.color = tempActiveNum >= 1 + tempNeedPetTypeAry.length ? "#5b545b" : "#e60000";
			});
		}

		private onAutoOnStorePets()
		{

			this.TmpOnStoreList.forEach(elment =>
			{
				elment.isSelected = false;
			});
			this.TmpOnStoreList.splice(0, this.TmpOnStoreList.length);

			let tempNeedPetStar = cfg.SailPoolCfgData.getNeedPetStarByIndex(this.UIOpenData.info.index);
			let tempNeedPetTypeAry = cfg.SailPoolCfgData.getNeedPetTypeAryById(this.UIOpenData.info.index);

			let hasStar = false;
			//先找星级达到并且有同类型的
			for (let i = 0; i < tempNeedPetTypeAry.length; i++)
			{
				let once = false;
				for (let j = PetDataMgr.getPetList().length - 1; j >= 0; j--)
				{
					let elment = PetDataMgr.getPetList()[j];
					if (!elment.onSail && !elment.isSelected && elment.star >= tempNeedPetStar && cfg.PetCfgData.getPetTypeByPetID(elment.id) == tempNeedPetTypeAry[i].value1)
					{
						this.TmpOnStoreList.push(elment);
						hasStar = true;
						elment.isSelected = true;
						once = true;
						break;
					}
				}
				if (once) break;
			}

			tempNeedPetTypeAry.forEach(elmentType =>
			{
				let tempActive = this.TmpOnStoreList.filter(elment => cfg.PetCfgData.getPetTypeByPetID(elment.id) == elmentType.value1).length > 0;
				if (!tempActive)
				{
					for (let i = PetDataMgr.getPetList().length - 1; i >= 0; i--)
					{
						let elment = PetDataMgr.getPetList()[i];
						if (!elment.isSelected && !elment.onSail && cfg.PetCfgData.getPetTypeByPetID(elment.id) == elmentType.value1)
						{
							this.TmpOnStoreList.push(elment);
							elment.isSelected = true;
							break;
						}
					}
				}
			});
			//再找星级的
			if (!hasStar)
			{
				for (let i = 0; i < tempNeedPetTypeAry.length; i++)
				{
					let once = false;
					for (let j = PetDataMgr.getPetList().length - 1; j >= 0; j--)
					{
						let elment = PetDataMgr.getPetList()[j];
						if (!elment.onSail && !elment.isSelected && elment.star >= tempNeedPetStar)
						{
							this.TmpOnStoreList.push(elment);
							elment.isSelected = true;
							once = true;
							break;
						}
					}
					if (once) break;
				}
			}

			this.refreshOnStoreList();
			this.refreshPetsLayer();
		}

		private onAcceptSail()
		{
			//情报是否足够
			if (Global.getItemNum(CfgID.ItemID.SailPoint) < this._needSailPoint)
			{
				FuncGuideMgr.Inst.finishFuncGuide();  //数据异常，中断引导
				TipsUtils.showTipsByLanId("tips_msg49");
				return;
			}

			//判断星级条件是否达成
			let needPetStar = cfg.SailPoolCfgData.getNeedPetStarByIndex(this.UIOpenData.info.index);
			if (this.TmpOnStoreList.filter(elment => elment.star >= needPetStar).length == 0)
			{
				FuncGuideMgr.Inst.finishFuncGuide();  //数据异常，中断引导
				TipsUtils.showTipsByLanId("sail_msg5", needPetStar);
				return;
			}
			//判断阵营条件
			let needPetTypeAry = cfg.SailPoolCfgData.getNeedPetTypeAryById(this.UIOpenData.info.index);
			for (let el of needPetTypeAry)
			{
				let needPetType = el.value1;
				if (this.TmpOnStoreList.filter(elment => cfg.PetCfgData.getPetTypeByPetID(elment.id) == needPetType).length == 0)
				{
					let typeString = Global.getLangStr("hero_type_" + needPetType);
					FuncGuideMgr.Inst.finishFuncGuide();  //数据异常，中断引导
					TipsUtils.showTipsByLanId("sail_msg6", typeString);
					return;
				}
			}

			let tempSnAry = [];
			this.TmpOnStoreList.forEach(element =>
			{
				tempSnAry.push(element.sn);
			});
			SailSend.accpet(this.UIOpenData.info.sn, this.UIOpenData.info.index, 0, tempSnAry);
			this.closeUI();
		}



		//-----------------------------------新手引导------------------------------------
        /**
         * 进入本步引导
         */
		public Guide_Enter(step: GuideStep)
		{
			if (step == GuideStep.Func_Sail_6)
			{
				GuideMgr.Inst.showFinger(this.UIPanel.AutoSendBtn, true, this.UIPanel.AutoSendBtn);
			} else if (step == GuideStep.Func_Sail_7)
			{
				GuideMgr.Inst.showFinger(this.UIPanel.SendBtn, true, this.UIPanel.SendBtn);
			}
		}

		// /**
		//  * 操作本步引导
		//  */
		// public Guide_Active(step: GuideStep) {
		// 	if (step == GuideStep.Func_Sail_5) {
		// 		this.UIPanel.AutoSendBtn.activeEvent();
		// 		GuideMgr.Inst.nextActive();
		// 	} else if (step == GuideStep.Func_Sail_6) {
		// 		this.UIPanel.SendBtn.activeEvent();
		// 		GuideMgr.Inst.nextActive();
		// 	}        
		// }
	}
}