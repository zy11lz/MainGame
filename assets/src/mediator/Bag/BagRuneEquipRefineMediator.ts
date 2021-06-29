
module Pro
{
	/**
     * 符文洗练
     */
	export class BagRuneEquipRefineMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Bag.RuneEquipRefineUI;


		/** 当前操作的神装 */
		TmpEquipItem: Pb_God.PBItem;

		/** 当前锁定的技能id */
		private _lockSkillIds: number[] = [];

		/** 当前是否锁定属性 */
		private _lockSttribute: boolean;

		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return null;
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Bag.RuneEquipRefineUI, 1, BaseAddLayer.TopUI, true);
		}

		/** 关闭UI*/
		closeUI(): void
		{
			this.closePanel();
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{
			this.UIPanel.btnClose.onClick(this, this.closeUI);
			this.UIPanel.QABtn.onClick(this, (btn: component.UIButton) =>
			{
				CommonHelpView.show(btn, Global.getLangStr("runeRebuild"));
			});
			this.UIPanel.RefineBtn.onClick(this, this.onRefineClick);
			this.UIPanel.SaveBtn.onClick(this, this.onSaveClick);
		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		addEvent(): void
		{
			this.addEventMgr(CmdEvent.Item_RuneRefine, this, this.onRefine);
			this.addEventMgr(CmdEvent.Item_SaveRuneRefine, this, this.onSave);
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{

		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{
			this.TmpEquipItem = this.UIOpenData.customObject as Pb_God.PBItem;
			this._lockSkillIds = [];
			this._lockSttribute = false;
			this.refreshUI();
		}

		/** 重铸后回调 */
		private onRefine(): void
		{
			this.refreshUI();
		}
		/** 保存后回调 */
		private onSave(): void
		{
			this.refreshUI();
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

			//icon
			this.UIPanel.ItemInfo.setItemInfo(this.TmpEquipItem, false, false, false);

			this.UIPanel.ItemNameLb.text = cfg.ItemCfgData.getNameById(this.TmpEquipItem.itemid);

			//消耗
			let tmpItemSubType = cfg.ItemCfgData.getSubTypeById(this.TmpEquipItem.itemid);
			let tmpCostAry = cfg.RuneRefineCfgData.getNeedItemAryById(tmpItemSubType);
			this.UIPanel.RefineCostBox.onRefresh(tmpCostAry.length, this, (itemUI: Laya.Box, index: number) =>
			{
				let tmpCostInfo = tmpCostAry[index];
				let tmpIconImg = itemUI.getChildAt(0) as Laya.Image;
				let tmpNumLb = itemUI.getChildAt(1) as component.UILabel;
				Global.setResIconWithItemID(tmpIconImg, CfgID.ResType.Item, tmpCostInfo.itemid);
				Global.setResNumWithItemInfo(tmpNumLb, tmpCostInfo.itemid, tmpCostInfo.itemcount, true, true, "#FFF6E8", "#e60000");
			});

			this.refreshLockCostInfo();

			this.refreshAtterInfo(this.UIPanel.BeforeRefineItem, this.TmpEquipItem.skillinfo, this.TmpEquipItem.randattr, true);
			this.refreshAtterInfo(this.UIPanel.AfterRefineItem, this.TmpEquipItem.refineskill, this.TmpEquipItem.refineattr, false);


			//按钮状态
			this.UIPanel.SaveBtn.visible = this.TmpEquipItem.refineattr != null;
			this.UIPanel.SaveBtn.layoutEnabled = this.UIPanel.SaveBtn.visible;
			this.UIPanel.RefineBox.refresh();
		}

		/** 刷新当前锁定消耗显示 */
		private refreshLockCostInfo(): void
		{
			//重置当前锁定的技能列表，是不是在当前技能列表里面还存在
			let oldList = this._lockSkillIds;
			let newList = this._lockSkillIds = [];
			for (let skill of this.TmpEquipItem.skillinfo)
			{
				if (oldList.indexOf(skill.skillid) >= 0) newList.push(skill.skillid);
			}
			this.UIPanel.BeforeRefineItem.boxLockCost.visible = newList.length > 0;
			this.UIPanel.BeforeRefineItem.attributeLockCost.visible = this._lockSttribute;
			let itemSubType = cfg.ItemCfgData.getSubTypeById(this.TmpEquipItem.itemid);
			let needItem = cfg.RuneRefineCfgData.getLockNeedItemAryById(itemSubType)[0];
			this.UIPanel.BeforeRefineItem.txtAtteibutelLockCost.text = needItem.itemcount + "";
			if (newList.length > 0)
			{
				this.UIPanel.BeforeRefineItem.txtLockCost.text = (needItem.itemcount * newList.length) + "";
			}

		}

		/** 刷新属性 */
		refreshAtterInfo(itemUI: ProUI.Bag.RuneEquipRefineItemUI, skillAry: Pb_God.PBSkillInfo[], attrAry: Pb_God.PBAttrBaseInfo[], isBefore: boolean)
		{

			itemUI.AtterBox.onRefresh(attrAry.length, this, (itemUI: ProUI.Utils.AtterItemInfoUI, index: number) =>
			{
				let tmpAtterID = attrAry[index].type;
				let tmpAtterValue = Global.longToNumber(attrAry[index].value) / 100;
				let tmpAtterRate = attrAry[index].rate / 100;
				itemUI.imgType.frame = tmpAtterID;
				itemUI.TitleLb.text = cfg.BattleCfgData.getDescByAttrType(tmpAtterID) + ":";
				itemUI.NumLb.text = tmpAtterValue > 0 ? tmpAtterValue.toString() : tmpAtterRate + "%";
				itemUI.NumLb.color = "#784720";
				itemUI.TitleLb.color = "#784720";
				itemUI.NumLb.x = itemUI.TitleLb.x + itemUI.TitleLb.width + 3;
			});

			itemUI.SkillBox.onRefresh(skillAry.length, this, (itemUI: ProUI.Utils.SkillItemLongUI, index: number) =>
			{
				let tempSkill = skillAry[index];
				let tempSkillInfo = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(tempSkill.skillid, tempSkill.skilllevel);
				itemUI.NameLb.text = tempSkillInfo.name;
				itemUI.DesLb.text = tempSkillInfo.des;
				itemUI.DesLb.fontSize = 18;
				Global.setResIconWithItemID(itemUI.IconImg, CfgID.ResType.Skill, tempSkillInfo.skillIndex);
				Global.setResQuWithItemID(itemUI.BGImg, CfgID.ResType.Skill, tempSkillInfo.skillIndex);
				itemUI.lockBtn.visible = isBefore;
				if (isBefore)
				{
					itemUI.imgLock.visible = this._lockSkillIds.indexOf(tempSkill.skillid) >= 0;
					itemUI.lockBtn.onClick(this, () =>
					{
						itemUI.imgLock.visible = !itemUI.imgLock.visible;
						this.setSkillIndexLock(index, itemUI.imgLock.visible, tempSkill.skillid);
					})


				}


			});

			//宝石重铸锁定属性
			itemUI.lockAttributeBtn.visible = isBefore && this.TmpEquipItem.skillinfo.length > 0;
			if (isBefore)
			{
				itemUI.imgLockBtn.visible = this._lockSttribute;
				itemUI.lockAttributeBtn.onClick(this, () =>
				{
					itemUI.imgLockBtn.visible = !itemUI.imgLockBtn.visible;
					this._lockSttribute = itemUI.imgLockBtn.visible;
					if (this._lockSttribute)
						TipsUtils.showTipsByLanId("ui_Bag_RuneEquip_msg16");
					this.refreshLockCostInfo();
				})
			}


		}

		/** 切换锁定状态 */
		private setSkillIndexLock(index: number, isLock: boolean, lockSkillId: number): void
		{
			if (isLock)
			{
				this._lockSkillIds.push(lockSkillId);
				//如果还有没有保存的，就给个提示
				if (this.TmpEquipItem.refineskill.length > 0)
				{
					let hasSkill = false;
					for (let skill of this.TmpEquipItem.refineskill)
					{
						if (skill.skillid == lockSkillId)
						{
							hasSkill = true;
							break;
						}
					}
					if (!hasSkill)
						TipsUtils.showTipsByLanId("ui_Bag_RuneEquip_msg10");
				}
			}
			else
			{
				let lockIndex = this._lockSkillIds.indexOf(lockSkillId);
				if (lockIndex >= 0) this._lockSkillIds.splice(lockIndex, 1);
			}
			this.refreshLockCostInfo();
		}

		/** 洗练 */
		onRefineClick()
		{
			//如果所有的技能和属性都被锁定无法重铸
			let lockSkillIds = true;
			for (var index = 0; index < this.TmpEquipItem.skillinfo.length; index++)
			{
				var element = this._lockSkillIds.indexOf(this.TmpEquipItem.skillinfo[index].skillid);
				if (element < 0)
				{
					lockSkillIds = false;
					break;
				}
			}
			if (this._lockSttribute && lockSkillIds)
			{
				TipsUtils.showTips(Global.getLangStr("ui_Bag_RuneEquip_msg15"));
				return;
			}

			//是否有锁定技能或属性，有的话判断是否有足够的资源
			let tmpItemSubType = cfg.ItemCfgData.getSubTypeById(this.TmpEquipItem.itemid);
			let tmpCostAry = cfg.RuneRefineCfgData.getNeedItemAryById(tmpItemSubType);
			let locking = this._lockSkillIds.length > 0 ? this._lockSkillIds.length : 0;
			locking = this._lockSttribute ? locking + 1 : locking;
			if (!Global.isFullAllRes(tmpCostAry)) return;
			if (locking > 0)
			{
				let lockneedItem = cfg.RuneRefineCfgData.getLockNeedItemAryById(tmpItemSubType);
				if (!Global.isFullRes(lockneedItem[0].itemid, lockneedItem[0].itemcount * locking, true)) return;
			}

			//判断
			ItemSend.runeRefine(this.TmpEquipItem.itemsn, this._lockSkillIds, this._lockSttribute);
		}

		/** 保存 */
		onSaveClick()
		{
			ItemSend.saveRuneRefine(this.TmpEquipItem.itemsn);
		}
	}
}