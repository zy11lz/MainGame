
module Pro
{
	/**
	 * 转换
	 */
	export class HeroExchangeSwitchTabel extends ProUI.Hero.HeroExchange.Switch.MainUI implements ITableView
	{

		/** 当前选择的英雄类型索引 */
		TmpSelectHeroTypeIndex = -1;

		/** 当前所有的英雄类型列表 */
		TmpSelectHeroTypeAry: Array<number>;

		/** 当前选择的英雄索引 */
		TmpSelectHeroIndex = -1;
		/**置换后的结果0取消，1保存 */
		Replacement = -1
		/** 当前需要的星级 */
		TmpHeroStarAry: Array<number>;

		/** 背包的英雄列表 */
		TmpHeroList: Array<Net.hero>;

		/** 特效 */
		Eff_Left_show: EffNode = null;
		Eff_Right_show: EffNode = null;

		/** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{
			this.loadHeroType();
			this.SureBtn.onClick(this, this.onSureClick);
			this.CancelBtn.onClick(this, this.onCancelClick);
			this.SaveBtn.onClick(this, this.onSaveClick);
		}

		//-------------------------------------------------------------------------------------------
		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		addEvent(): void
		{
			EventMgr.on(CmdEvent.Call_Change, this, this.onChange);
			EventMgr.on(CmdEvent.Call_SaveChangeAck, this, this.onSaveChangeAck);
		}

		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		removeEvent(): void
		{
			EventMgr.off(CmdEvent.Call_Change, this, this.onChange);
			EventMgr.off(CmdEvent.Call_SaveChangeAck, this, this.onSaveChangeAck);
		}

		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		show(): void
		{
			if (this.Eff_Left_show == null)
			{
				//精灵蛋特效直接加载位置不做改变会向左偏移10个像素
				this.Eff_Left_show = EffectMgr.Inst.createEffectOne("ui_heroExchange_left", new Laya.Point(10, 0), -1, 1, 1, this.SelectRoleItem.effPos, false, ResReleaseType.Reference);
				this.Eff_Left_show.visible = false;
			}
			if (this.Eff_Right_show == null)
			{
				this.Eff_Right_show = EffectMgr.Inst.createEffectOne("ui_heroExchange_right", null, -1, 1, 1, this.NewRoleItem.effPos, false, ResReleaseType.Reference);
				this.Eff_Right_show.visible = false;
			}

			this.refreshHeroType();
		}

		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		hide(): void
		{
			if (this.Eff_Left_show != null)
			{
				// this.Eff_Left_show.removeSelf();
				EffectMgr.Inst.releaseEffect(this.Eff_Left_show);
				this.Eff_Left_show = null;
			}
			if (this.Eff_Right_show != null)
			{
				// this.Eff_Right_show.removeSelf();
				EffectMgr.Inst.releaseEffect(this.Eff_Right_show);
				this.Eff_Right_show = null;
			}

			this.cycleExchangeRoles();

		}

		setData($data: any): void
		{

		}

		/** 页签组件销毁 */
		dispose(): void
		{

		}

		//---------------------------英雄类型------------------------------
		/** 获取英雄限制类型 */
		loadHeroType()
		{
			if (this.TmpSelectHeroTypeAry != null)
			{
				return;
			}

			this.TmpSelectHeroTypeAry = [];
			let tmpFirstInfo = cfg.PetCallChangeCfgData.getFirstInfo();
			tmpFirstInfo.needPetType.split(";").forEach(elment =>
			{
				this.TmpSelectHeroTypeAry.push(parseInt(elment));
			});
			this.TmpSelectHeroTypeAry.unshift(0);

			this.TmpHeroStarAry = [];
			cfg.PetCallChangeCfgData.getDataAll().forEach(elment =>
			{
				this.TmpHeroStarAry.push(elment.petStar);
			});

		}

		/** 刷新英雄类型 */
		refreshHeroType()
		{
			if (this.Replacement == -1)
			{ this.TmpSelectHeroTypeIndex = -1; }
			this.HeroTypeBox.onRefresh(this.TmpSelectHeroTypeAry.length, this, (itemUI: component.UIButton, index: number) =>
			{
				Global.setResPetType(itemUI, this.TmpSelectHeroTypeAry[index]);
				itemUI.onClick(this, this.onHeroTypeClick);

				if (this.Replacement == -1)
				{
					if (this.TmpSelectHeroTypeIndex == -1)
					{
						this.onHeroTypeClick(itemUI);
					}
				} else
				{
					if (this.TmpSelectHeroTypeIndex == index)
					{
						this.onHeroTypeClick(itemUI);
					}
				}


			});
		}

		/** 选择一个英雄类型 */
		onHeroTypeClick(btn: component.UIButton)
		{
			this.HeroTypeSelectImg.x = btn.x;
			this.HeroTypeSelectImg.y = btn.y;
			this.TmpSelectHeroTypeIndex = this.TmpSelectHeroTypeAry[parseInt(btn.name)];
			this.refreshPetList();
			this.cycleExchangeRoles();
			this.refreshExchangeInfo();
		}

		//---------------------------英雄列表------------------------------
		choiceSwitchHeroType(heroType: number)
		{

			if (this.TmpHeroList == null)
			{
				this.TmpHeroList = [];
			}
			else
			{
				this.TmpHeroList.splice(0, this.TmpHeroList.length);
			}

			PetDataMgr.resetHeroSelect();
			PetDataMgr.getPetList().forEach(elment =>
			{
				let tmpHeroType = cfg.PetCfgData.getPetTypeByPetID(elment.id);
				if (this.TmpHeroStarAry.indexOf(elment.star) >= 0 && elment.evolve <= 0 &&
					(tmpHeroType == heroType || (heroType == 0 && this.TmpSelectHeroTypeAry.indexOf(tmpHeroType) >= 0)))
				{
					this.TmpHeroList.push(elment);
				}
			});

			//把上阵状态重置一次
			for (var hero of this.TmpHeroList)
			{
				PetDataMgr.refreshPetOnStore(hero);
			}

			this.TmpHeroList.sort(function (a: Net.hero, b: Net.hero): number
			{
				//a排前则返回-1
				/* 排列顺序按照以下优先级
					5星在前，4星在后
					先按种族，水-火-风
					同星级高等级在前，低等级在后
					同星级同等级按照ID先后进行排序
				*/
				if (a.onStore != b.onStore) { return a.onStore ? 1 : -1; }
				if (a.islock != b.islock) { return a.islock ? 1 : -1; }
				if (a.star != b.star) { return b.star - a.star; }
				if (a.level != b.level) { return b.level - a.level; }
				else { return a.id - b.id; }
			});

		}

		refreshPetList()
		{
			if (this.Replacement == -1 || this.Replacement == 1)
			{
				this.TmpSelectHeroIndex = -1;
				this.Replacement == -1;
			}
			this.choiceSwitchHeroType(this.TmpSelectHeroTypeIndex);
			this.ItemList.onRefresh(this.TmpHeroList.length, this, (itemUI: NorItemUI, index: number) =>
			{
				let tmpInfo = this.TmpHeroList[index];
				itemUI.setPetInfo(tmpInfo);
				let isLock = tmpInfo.onStore || tmpInfo.islock;
				itemUI.setLockImgVisible(isLock, tmpInfo);
				itemUI.IconImg.gray = isLock;
				itemUI.SelectStatueImg.visible = tmpInfo.isSelected;
				itemUI.onClick(this, this.onPetChoiceClick);
				if (this.Replacement == 0)
				{
					if (this.TmpSelectHeroIndex == index)
					{
						itemUI.SelectStatueImg.visible = tmpInfo.isSelected = true;
						this.onPetChoiceClick(itemUI)
						this.Replacement = -1;
					}

				}
			});
		}

		onPetChoiceClick(btn: NorItemUI)
		{
			let tmpIndex = parseInt(btn.name);
			let tmpInfo = this.TmpHeroList[tmpIndex];
			if (tmpInfo.islock)
			{
				TipsUtils.showTipsByLanId("heroSplit_msg2");
				return;
			}


			let func = () =>
			{
				if (tmpInfo.isSelected)
				{
					return;
				}

				tmpInfo.isSelected = !tmpInfo.isSelected;
				btn.SelectStatueImg.visible = tmpInfo.isSelected;

				if (this.TmpSelectHeroIndex >= 0)
				{
					let tmpSelectItem = this.ItemList.getCell(this.TmpSelectHeroIndex) as NorItemUI;
					if (tmpSelectItem != null)
					{
						tmpSelectItem.SelectStatueImg.visible = false;
					}
					let tmpSelectInfo = this.TmpHeroList[this.TmpSelectHeroIndex];
					tmpSelectInfo.isSelected = false;
				}
				this.TmpSelectHeroIndex = tmpIndex;
				btn.IconImg.gray = false;
				btn.setLockImgVisible(false);
				this.refreshExchangeInfo();

			}

			if (PetDataMgr.checkPetOnStore(tmpInfo, true, func))
			{
				return;
			}
		}

		//---------------------------英雄兑换------------------------------
		refreshExchangeInfo()
		{
			let resultInfo: Pb_God.PBPlayerCallChange = CallDataMgr.changeinfo;

			this.SelectRoleItem.BaseInfo.visible = this.TmpSelectHeroIndex >= 0 || resultInfo != null;
			if (this.Eff_Left_show)
			{
				this.Eff_Left_show.visible = !this.SelectRoleItem.BaseInfo.visible;
			}

			//显示结果
			if (this.Eff_Right_show) { this.Eff_Right_show.visible = resultInfo == null && this.TmpSelectHeroIndex >= 0; }
			this.NewRoleItem.BaseInfo.visible = resultInfo != null;
			this.NewRoleItem.HeroTypeImg.visible = resultInfo != null;
			this.heroSelView.visible = resultInfo == null;
			this.NewRoleItem.NameLb.text = "????";
			this.NewRoleItem.hboxName.refresh();
			if (resultInfo != null)
			{
				let tmpSelInfo = PetDataMgr.getPetInfo(resultInfo.basechangesn);
				this.refreshExchangeItem(tmpSelInfo.id, tmpSelInfo.star, tmpSelInfo.level, this.SelectRoleItem);
				this.refreshExchangeItem(resultInfo.petid, resultInfo.star, tmpSelInfo.level, this.NewRoleItem);
			} else if (this.TmpSelectHeroIndex >= 0)
			{ //当前选择
				let tmpInfo = this.TmpHeroList[this.TmpSelectHeroIndex];
				this.refreshExchangeItem(tmpInfo.id, tmpInfo.star, tmpInfo.level, this.SelectRoleItem);
			}

			//显示置换按钮
			this.SureBtn.visible = resultInfo == null && this.TmpSelectHeroIndex >= 0;
			this.CancelBtn.visible = resultInfo != null;
			this.SaveBtn.visible = this.CancelBtn.visible;

			//显示置换消耗
			if (this.TmpSelectHeroIndex >= 0)
			{
				let tmpInfo = this.TmpHeroList[this.TmpSelectHeroIndex];
				let tmpNeedItem = cfg.PetCallChangeCfgData.getNeedItemAryWithID(tmpInfo.star);
				Global.setResIconWithItemID(this.SureNeedIconImg, CfgID.ResType.Item, tmpNeedItem.itemid);
				Global.setResNumWithItemInfo(this.SureNeedNumLb, tmpNeedItem.itemid, tmpNeedItem.itemcount);
			}
		}

		refreshExchangeItem(ID: number, Star: number, lv: number, itemUI: ProUI.Hero.HeroExchange.Switch.RoleItemUI)
		{
			let tempRole = itemUI.PreView["baseRole"] as BaseRole;
			if (tempRole == null)
			{
				tempRole = Global.createBaseRoleForPreview(itemUI.PreView);
				itemUI.PreView["baseRole"] = tempRole;
			}
			let skinId = cfg.PetCfgData.getSkinInfoByPetID(ID).id;
			tempRole.resetRes(skinId, RoleResType.Show, true);
			var showScale = cfg.PetSkinCfgData.getShowScaleById(skinId);
			tempRole.scale(showScale, showScale);
			itemUI.StarBox.setStar(Star);
			Global.setResPetType(itemUI.HeroTypeImg, cfg.PetCfgData.getPetTypeByPetID(ID));
			itemUI.NameLb.text = cfg.PetSkinCfgData.getFileNameById(skinId);
			itemUI.LvLb.text = lv.toString();
			itemUI.hboxName.refresh();
			// itemUI.BaseInfo.y = itemUI.PreView.y + itemUI.PreView.height * 0.5 - cfg.PetSkinCfgData.getRoleHeight(resId) - itemUI.BaseInfo.height;
		}

		cycleExchangeRoles()
		{
			let tempOldRole = this.SelectRoleItem.PreView["baseRole"] as BaseRole;
			if (tempOldRole != null)
			{
				Global.removeBaseRole(tempOldRole);
				this.SelectRoleItem.PreView["baseRole"] = null;
			}

			let tempNewRole = this.NewRoleItem.PreView["baseRole"] as BaseRole;
			if (tempNewRole != null)
			{
				Global.removeBaseRole(tempNewRole);
				this.NewRoleItem.PreView["baseRole"] = null;
			}
		}

		//---------------------------------------------------------
		onSureClick()
		{
			let tmpInfo = this.TmpHeroList[this.TmpSelectHeroIndex];
			let tmpNeedItem = cfg.PetCallChangeCfgData.getNeedItemAryWithID(tmpInfo.star);
			if (!Global.isFullRes(tmpNeedItem.itemid, tmpNeedItem.itemcount))
			{
				return;
			}
			CallSend.change(tmpInfo.sn);
		}

		onCancelClick()
		{
			Pro.TipsUtils.showTips(Global.getLangStr("ui_HeroExchange_msg5"));
			CallSend.saveChange(0);
		}

		onSaveClick()
		{
			Pro.TipsUtils.showTips(Global.getLangStr("ui_HeroExchange_msg6"));
			CallSend.saveChange(1);
		}


		/*****
		 * 	 伙伴转换返回		PBPlayerCallChange
		 * @param PBPlayerCallChange
		 */
		protected onChange(value: Pb_God.PBPlayerCallChange): void
		{
			SoundMgr.Inst().playSound("getcard");
			let tmpEffPos = new Laya.Point(this.SelectRoleItem.x + this.SelectRoleItem.width / 2, this.SelectRoleItem.y + 174);
			let tmpEffNode = EffectMgr.Inst.createEffectOne("ui_heroExchange_action", tmpEffPos, null, 2, 1, this, true, ResReleaseType.Reference);
			Laya.timer.once(tmpEffNode.effAllTime, this, this.refreshExchangeInfo);
		}

		/*****
		 * 	 伙伴转换保存返回	PBU32
		 * @param PBU32
		 */
		protected onSaveChangeAck(value: Pb_God.PBU32): void
		{
			this.Replacement = value.value;
			this.show();
		}
	}
}