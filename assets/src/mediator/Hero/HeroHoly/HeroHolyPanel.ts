
module Pro
{
	/**
	 * 圣物操作界面
	 */
	export class HeroHolyPanel extends ProUI.Hero.HeroHoly.MainUI
	{

		/** 当前选择的英雄类型索引 */
		private TmpSelectHeroTypeIndex = -1;

		// private Eff_icon_show: EffNode = null;

		/** 是否显示属性变化动画 */
		private _isPreShowUpgradeAttr = false;

		/** 存储当前圣物所有属性加成值 */
		private _dataDic: { [key: number]: number } = {};

		constructor()
		{
			super();
			this.initUI();
		}

		//---------------------------------------Event------------------------------------
		/** 控制消息监听器 */
		private controllEvents(isOff: boolean = true)
		{
			Global.EventsNotifyControl(this.listensEvents(), isOff);
			if (!isOff)
			{
				this.on(Laya.Event.UNDISPLAY, this, this.controllEvents);
			}
		}

		/** 本类监听消息列表 */
		private listensEvents(): Array<any>
		{
			return [
				CmdEvent.Holy_Unlock, this, this.refreshHeroType,
				CmdEvent.Holy_Upgrade, this, this.refreshHeroType,
				CmdEvent.Holy_Advance, this, this.refreshHeroType,
				CmdEvent.Holy_Upgrade, this, this.onUpgradeFinish,
				CmdEvent.Holy_Advance, this, this.onAdvanceFinish,
			]
		}

		public initUI()
		{
			this.StoryBtn.visible = false;  //暂时屏蔽传记按钮

			this.btnBuyGift.visible = PlatformDataMgr.getCanBuyListByType(Pb_God._emChargeType.ChargeType_Help, emStrongerPayGiftType.Holy).length > 0;
			if (this.btnBuyGift.visible) { this.effBuyGift.play(0, true); }

			this._isPreShowUpgradeAttr = false;
			this.FunBox.initData(this.tabGrp, [
				new TableBarContinerData("hero_msg35", "unlock", HeroHolyLockTabel),
				new TableBarContinerData("hero_msg36", "upgrade", HeroHolyUpgradeTabel),
				new TableBarContinerData("hero_msg37", "upstar", HeroHolyUpStarTabel)
			], [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]);

			this.FunBox.onClick(this, (index: number, tabName: string) =>
			{
				let tmpHolyType = Pb_God._emPetType.PetType_Water + this.TmpSelectHeroTypeIndex;
				this.FunBox.setTableViewData(tabName, tmpHolyType);
			});

			this.ArrowItemUI.onClick(this, (statue: number) =>
			{
				let changeId = 0;
				if (statue == 0)
				{
					changeId = this.TmpSelectHeroTypeIndex - 1;
					if (changeId < 0)
					{
						changeId = 4;
					}
				}
				else if (statue == 1)
				{
					changeId = this.TmpSelectHeroTypeIndex + 1;
					if (changeId > 4)
					{
						changeId = 0;
					}
				}
				this.TmpSelectHeroTypeIndex = changeId;
				this.refreshHeroType();
			});

			this.on(Laya.Event.DISPLAY, this, () =>
			{
				this.controllEvents(false);
			});

			this.QABtn.onClick(this, () =>
			{
				CommonHelpView.show(this.QABtn, Global.getLangStr("holy_instruction"));
			});
			this.btnBuyGift.onClick(this, () =>
			{
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_StrongerPayGift, Pb_God._emChargeType.ChargeType_Help, emStrongerPayGiftType.Holy));
			})

			this.StoryBtn.onClick(this, () =>
			{
				let tmpHolyType = Pb_God._emPetType.PetType_Water + this.TmpSelectHeroTypeIndex;
				let tmpHolyName = cfg.HolyUnlockCfgData.getNameByPetType(tmpHolyType);
				let tmpHolyDes = Global.getLangStr("holy_biography" + tmpHolyType);
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroLibraryStory, [tmpHolyName, tmpHolyDes]));
			});
			Laya.Tween.clearAll(this.IconImg);
			Laya.Tween.to(this.IconImg, { y: this.IconImg.y - 10 }, 700, Laya.Ease.linearOut, Laya.Handler.create(this, this.onTween2));

		}

		public refreshUI()
		{
			this.btnBuyGift.visible = PlatformDataMgr.getCanBuyListByType(Pb_God._emChargeType.ChargeType_Help, emStrongerPayGiftType.Holy).length > 0;
			if (this.btnBuyGift.visible) { this.effBuyGift.play(0, true); }
			if (!this.visible)
			{
				this.TmpSelectHeroTypeIndex = 0;
				this.refreshHeroType();
			}
		}

		public hideUI()
		{
			// if (this.Eff_icon_show != null) { this.Eff_icon_show.removeSelf(); this.Eff_icon_show = null; }
		}

		/** 刷新英雄类型 */
		private refreshHeroType()
		{
			this.TypeBox.onRefresh(5, this, (itemUI: component.UIButton, index: number) =>
			{
				let tmpHolyType = Pb_God._emPetType.PetType_Water + index;
				let tmpRedDotImg = itemUI.getChildAt(0) as Laya.Image;
				tmpRedDotImg.visible = HolyDataMgr.reddotModel.getChildRedDotState(tmpHolyType);
				Global.setResPetType(itemUI, tmpHolyType);
				itemUI.onClick(this, this.onHeroTypeClick);
				if (this.TmpSelectHeroTypeIndex == index)
				{
					this.onHeroTypeClick(itemUI);
				}
			});
		}

		/**
		 * 升级成功
		 */
		private onUpgradeFinish(): void
		{
			this._isPreShowUpgradeAttr = true;
		}

		/**
		 * 进阶成功
		 */
		private onAdvanceFinish(): void
		{
			SoundMgr.Inst().playSound("levelup");
			this._isPreShowUpgradeAttr = true;
			// 计算上一阶数据与当前阶数据差
		}

		/**
		 * 显示升级动画
		 */
		private showUpgradeAnim(): void
		{
			if (!this._isPreShowUpgradeAttr) { return; }
			let tmpHolyType = Pb_God._emPetType.PetType_Water + this.TmpSelectHeroTypeIndex;
			let tmpHolyInfo = HolyDataMgr.getHolyInfo(tmpHolyType);
			if (!tmpHolyInfo) { return; }

			let tmpUpLevelInfo = cfg.HolyUpgradeCfgData.getInfoByTypeAndLv(tmpHolyType, tmpHolyInfo.level);
			let tempAtterAry = cfg.HolyUpgradeCfgData.getAddAttrAryByIndex(tmpUpLevelInfo.id);

			this._isPreShowUpgradeAttr = false;

			//[attrType, changeValue][]
			let addAttrList: number[][] = [];
			for (let attrCfg of tempAtterAry)
			{
				let tmpAtterID = attrCfg.type;
				let tmpAtterValue = attrCfg.value;

				let oldValue = this._dataDic[attrCfg.type] || 0;//旧值取字典内

				// 进度条经验值计算增加的属性
				let expAddAttr_arr = cfg.HolyUpgradeCfgData.getExpAddAttrAryByIndex(tmpUpLevelInfo.id);
				for (let attr_info of expAddAttr_arr)
				{
					if (attr_info.type == tmpAtterID)
					{
						let add_val = Math.floor(tmpHolyInfo.exp / 10) * attr_info.value;
						tmpAtterValue += add_val;
					}
				}

				// 计算进阶加成
				/*let tmpAdvanceInfo = cfg.HolyAdvanceCfgData.getInfoByTypeAndLv(tmpHolyType, tmpHolyInfo.advance);
				if (tmpAdvanceInfo) {
					let addAttInfo_arr = cfg.HolyAdvanceCfgData.getAddAttrAryByIndex(tmpAdvanceInfo.id);
					for (let attrInfo of addAttInfo_arr) {
						if (tmpAtterID == attrInfo.type) {
							tmpAtterValue += tmpAtterValue * attrInfo.valuePer / 10000;
						}
					}
				}*/

				tmpAtterValue = Math.floor(tmpAtterValue);

				if (tmpAtterValue > oldValue)
				{
					addAttrList.push([tmpAtterID, tmpAtterValue - oldValue]);
				}
			}
			this.upAttrListUI.show(addAttrList);
		}


		/** 选择一个英雄类型 */
		private onHeroTypeClick(btn: component.UIButton)
		{
			this.TypeSelectImg.x = btn.x;
			this.TypeSelectImg.y = btn.y;
			this.TmpSelectHeroTypeIndex = parseInt(btn.name);
			this.showUpgradeAnim();
			this.refreshHolyInfoUI();
		}

		/** 刷新圣物图标状态UI */
		refreshHolyInfoUI()
		{

			let tmpHolyType = Pb_God._emPetType.PetType_Water + this.TmpSelectHeroTypeIndex;
			let tmpHolyInfo = HolyDataMgr.getHolyInfo(tmpHolyType);
			this.DesLb.visible = tmpHolyInfo != null;
			this.AtterBox.visible = this.DesLb.visible;
			this.NameLb.text = cfg.HolyUnlockCfgData.getNameByPetType(tmpHolyType) + (tmpHolyInfo == null ? "" : "Lv." + tmpHolyInfo.level);

			{
				this.IconImg.skin = UrlMgr.getHolyUrl(tmpHolyType + "");
			}
			if (tmpHolyInfo != null)
			{

				this.DesLb.text = Global.getLangStr("hero_msg10", Global.getLangStr("hero_type_name_" + tmpHolyType));

				let tmpUpLevelInfo = cfg.HolyUpgradeCfgData.getInfoByTypeAndLv(tmpHolyType, tmpHolyInfo.level);
				let tempAtterAry = cfg.HolyUpgradeCfgData.getAddAttrAryByIndex(tmpUpLevelInfo.id);
				this.AtterBox.onRefresh(tempAtterAry.length, this, (itemUI: ProUI.Utils.AtterItemInfoUI, index: number) =>
				{
					let tmpAtterID = tempAtterAry[index].type;
					let tmpAtterValue = tempAtterAry[index].value;
					let tmpAtterRate = tempAtterAry[index].valuePer;

					// 进度条经验值计算增加的属性
					let expAddAttr_arr = cfg.HolyUpgradeCfgData.getExpAddAttrAryByIndex(tmpUpLevelInfo.id);
					for (let attr_info of expAddAttr_arr)
					{
						if (attr_info.type == tmpAtterID)
						{
							let add_val = Math.floor(tmpHolyInfo.exp / 10) * attr_info.value;
							tmpAtterValue += add_val;
						}
					}

					this._dataDic[tmpAtterID] = tmpAtterValue;// 存储当前属性加成值 不计算进阶加成

					// 计算进阶加成
					let tmpAdvanceInfo = cfg.HolyAdvanceCfgData.getInfoByTypeAndLv(tmpHolyType, tmpHolyInfo.advance);
					if (tmpAdvanceInfo)
					{
						let addAttInfo_arr = cfg.HolyAdvanceCfgData.getAddAttrAryByIndex(tmpAdvanceInfo.id);
						for (let attrInfo of addAttInfo_arr)
						{
							if (tmpAtterID == attrInfo.type)
							{
								tmpAtterValue += tmpAtterValue * attrInfo.valuePer / 10000;
							}
						}
					}


					tmpAtterValue = Math.floor(tmpAtterValue);

					itemUI.imgType.frame = tmpAtterID;
					itemUI.TitleLb.text = cfg.BattleCfgData.getDescByAttrType(tmpAtterID) + ":";
					itemUI.NumLb.text = tmpAtterValue > 0 ? tmpAtterValue.toString() : tmpAtterRate + "%";
					itemUI.TitleLb.color = "#5b545b";
					itemUI.NumLb.color = "#5b545b";
					itemUI.NumLb.x = itemUI.TitleLb.x + itemUI.TitleLb.width + 6;
				});

			}

			this.refreshHolyTabData(tmpHolyInfo == null);
		}

		/** 上下漂浮方法 */
		onTween1(): void
		{
			Laya.Tween.to(this.IconImg, { y: this.IconImg.y - 10 }, 700, Laya.Ease.linearOut, Laya.Handler.create(this, this.onTween2));
		}
		onTween2(): void
		{
			Laya.Tween.to(this.IconImg, { y: this.IconImg.y + 10 }, 550, Laya.Ease.linearOut, Laya.Handler.create(this, this.onTween1));
		}

		/** 刷新圣物功能选项 */
		refreshHolyTabData(isLock: boolean)
		{
			let tmpHolyType = Pb_God._emPetType.PetType_Water + this.TmpSelectHeroTypeIndex;
			let tmpItemAry = new Array<component.UITabData>();
			if (isLock)
			{
				tmpItemAry.push(new component.UITabData("hero_msg11", "unlock", HolyDataMgr.isHaveUnlock(tmpHolyType)));
			}
			else
			{
				tmpItemAry.push(new component.UITabData("hero_msg12", "upgrade", HolyDataMgr.isHaveUpgrade(tmpHolyType)));
				tmpItemAry.push(new component.UITabData("hero_msg13", "upstar", HolyDataMgr.isHaveUpstar(tmpHolyType)));
			}
			this.FunBox.setTableData(tmpItemAry);
		}
	}
}