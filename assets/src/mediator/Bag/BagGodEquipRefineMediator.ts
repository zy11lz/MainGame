
module Pro
{
	/**
	 * 神装洗练
	 */
	export class BagGodEquipRefineMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Bag.GodEquipRefineUI;


		/** 当前操作的神装 */
		TmpEquipItem: Pb_God.PBItem;

		/** 锁定的属性索引 */
		TmpLockAttrAry: Array<number>;

		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return null;
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Bag.GodEquipRefineUI, 1, BaseAddLayer.TopUI, true);
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
				CommonHelpView.show(btn, Global.getLangStr("god_des_1"));
			});
			this.UIPanel.RefineBtn.onClick(this, this.onRefineClick);
			this.UIPanel.SaveBtn.onClick(this, this.onSaveClick);
		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		addEvent(): void
		{
			this.addEventMgr(CmdEvent.Item_GodEquipRefine, this, this.onRefineBack);
			this.addEventMgr(CmdEvent.Item_SaveGodEquipRefine, this, this.onRefineBack);
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{

		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{

			this.TmpEquipItem = this.UIOpenData.customObject as Pb_God.PBItem;
			let tmpItemID = this.TmpEquipItem.itemid;
			let tmpItemQu = cfg.ItemCfgData.getQualityById(tmpItemID);
			// let tmpItemStar   = cfg.ItemCfgData.getStarNumById(tmpItemID);
			let tmpItemName = cfg.ItemCfgData.getNameById(tmpItemID);

			//图标信息
			this.UIPanel.ItemInfo.setItemInfo(this.TmpEquipItem, false, false, false);
			this.UIPanel.ItemNameLb.text = tmpItemName;//Global.getLangStr("item_review_msg17",Global.getLangStr("godQu_"+tmpItemQu),tmpItemStar,tmpItemName);
			// this.UIPanel.ItemNameLb.color = Global.getResQuColor()

			//基础属性
			let tempAtterInfo = cfg.ItemCfgData.getAddAttrAryById(tmpItemID)[0];
			this.UIPanel.BaseInfoTypeImg.frame = tempAtterInfo.type;
			this.UIPanel.BaseInfoNameLb.text = cfg.BattleCfgData.getDescByAttrType(tempAtterInfo.type) + ":";
			this.UIPanel.BaseInfoValueLb.text = tempAtterInfo.value > 0 ? tempAtterInfo.value.toString() : tempAtterInfo.valuePer + "%";

			//刷新洗练属性
			this.UIPanel.LockCostBox.visible = false;
			this.refreshAtterInfo(true);
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}

		private onRefineBack(): void
		{
			this.refreshAtterInfo(false);
		}

		/** 刷新属性 */
		refreshAtterInfo(isInit: boolean = false)
		{
			//道具属性
			let tmpItemPart = cfg.ItemCfgData.getSubTypeById(this.TmpEquipItem.itemid);
			let tmpItemStar = cfg.ItemCfgData.getStarNumById(this.TmpEquipItem.itemid);

			//消耗
			let tmpCostAry = cfg.GodEquipRefineCfgData.getNeedItemAryByIndex(tmpItemStar);
			this.UIPanel.RefineCostBox.onRefresh(tmpCostAry.length, this, (itemUI: Laya.Box, index: number) =>
			{
				let tmpCostInfo = tmpCostAry[index];
				let tmpIconImg = itemUI.getChildAt(0) as Laya.Image;
				let tmpNumLb = itemUI.getChildAt(1) as component.UILabel;
				Global.setResIconWithItemID(tmpIconImg, CfgID.ResType.Item, tmpCostInfo.itemid);
				Global.setResNumWithItemInfo(tmpNumLb, tmpCostInfo.itemid, tmpCostInfo.itemcount, true);
			});

			//重置锁定状态
			this.TmpLockAttrAry = [];
			//洗练前
			this.UIPanel.RefineBeforeBox.onRefresh(this.TmpEquipItem.randattr.length, this, (itemUI: ProUI.Bag.GodEquipRefineItemUI, index: number) =>
			{

				let tmpAtterID = this.TmpEquipItem.randattr[index].type;
				let tmpAtterValue = Global.longToNumber(this.TmpEquipItem.randattr[index].value);
				let tmpAtterRate = this.TmpEquipItem.randattr[index].rate;
				let tmpRefineInfo = cfg.GodEquipRandattrCfgData.getInfoByAtterID(tmpItemStar, tmpItemPart, tmpAtterID, tmpAtterValue);
				let tmpChangeInfo = tmpAtterValue > 0 ? cfg.GodEquipRandattrCfgData.getAttrValueInfoByIndex(tmpRefineInfo.index) :
					cfg.GodEquipRandattrCfgData.getAttrRateInfoByIndex(tmpRefineInfo.index);

				itemUI.frameImgUp.visible = false;
				itemUI.typeImg.frame = tmpAtterID;
				itemUI.NameLb.text = cfg.BattleCfgData.getDescByAttrType(tmpAtterID) + ":";
				itemUI.ValueProLb.text = Global.getAttrValueStringSub(tmpAtterID, tmpAtterValue / 100, tmpAtterRate, 1, 1);
				Global.setProgressBarMask(itemUI.ValueProImg, (tmpAtterValue > 0 ? tmpAtterValue : tmpAtterRate) / tmpChangeInfo.value2);
				if (isInit)
				{
					itemUI.LockImg.visible = false;
				}
				else if (itemUI.LockImg.visible)
				{
					this.onLockAtter(tmpAtterID, true);
				}
				itemUI.LockBtn.onClick(this, () =>
				{
					itemUI.LockImg.visible = !itemUI.LockImg.visible;
					this.onLockAtter(tmpAtterID, itemUI.LockImg.visible);
				});
			});

			//洗练后
			let tmpRandomNum = this.TmpEquipItem.refineattr != null ? this.TmpEquipItem.refineattr.length : 0;
			//将洗炼前的属性形成一个map， 便于在洗炼后显示提升与下降的箭头
			let oldAttrMap = Global.listToStringMapData(this.TmpEquipItem.randattr, "type");
			this.UIPanel.RefineAfterBox.onRefresh(tmpRandomNum, this, (itemUI: ProUI.Bag.GodEquipRefineItemUI, index: number) =>
			{

				let tmpAtterID = this.TmpEquipItem.refineattr[index].type;
				let tmpAtterValue = Global.longToNumber(this.TmpEquipItem.refineattr[index].value);
				let tmpAtterRate = this.TmpEquipItem.refineattr[index].rate;
				let tmpRefineInfo = cfg.GodEquipRandattrCfgData.getInfoByAtterID(tmpItemStar, tmpItemPart, tmpAtterID, tmpAtterValue);
				let tmpChangeInfo = tmpAtterValue > 0 ? cfg.GodEquipRandattrCfgData.getAttrValueInfoByIndex(tmpRefineInfo.index) :
					cfg.GodEquipRandattrCfgData.getAttrRateInfoByIndex(tmpRefineInfo.index);

				itemUI.typeImg.frame = tmpAtterID;
				itemUI.NameLb.text = cfg.BattleCfgData.getDescByAttrType(tmpAtterID) + ":";
				itemUI.ValueProLb.text = Global.getAttrValueStringSub(tmpAtterID, tmpAtterValue / 100, tmpAtterRate, 1, 1);
				Global.setProgressBarMask(itemUI.ValueProImg, (tmpAtterValue > 0 ? tmpAtterValue : tmpAtterRate) / tmpChangeInfo.value2);
				itemUI.LockBtn.visible = false;

				//判断数据变化， 同属性并且加成方式相同（数值还是百分比）
				let oldAttr = oldAttrMap.get(tmpAtterID);
				if (!oldAttr)
				{
					itemUI.frameImgUp.frame = 0;
				} else
				{
					let oldCompareValue = oldAttr.rate;
					let newCompareValue = tmpAtterRate;
					if (tmpAtterValue > 0)
					{ //变化的是具体数值
						oldCompareValue = oldAttr.value.toNumber();
						newCompareValue = tmpAtterValue;
					}
					if (newCompareValue == oldCompareValue || newCompareValue * oldCompareValue == 0) { itemUI.frameImgUp.frame = 0; }
					else if (newCompareValue > oldCompareValue) { itemUI.frameImgUp.frame = 1; }
					else { itemUI.frameImgUp.frame = 2; }
				}
			});

			//洗练次数
			this.UIPanel.RefineTimesLb.text = Global.getLangStr("item_review_msg18", this.TmpEquipItem.godrefinecount);

			//按钮状态
			this.UIPanel.SaveBtn.visible = this.TmpEquipItem.refineattr != null;
			this.UIPanel.SaveBtn.layoutEnabled = this.UIPanel.SaveBtn.visible;
			this.UIPanel.RefineBox.refresh();
		}

		/** 锁定 */
		onLockAtter(tmpAtterID: number, isLock: boolean)
		{

			if (isLock)
			{
				this.TmpLockAttrAry.push(tmpAtterID);
			}
			else
			{
				this.TmpLockAttrAry.splice(this.TmpLockAttrAry.indexOf(tmpAtterID), 1);
			}
			this.UIPanel.LockCostBox.visible = this.TmpLockAttrAry.length > 0;

			//消耗
			if (this.TmpLockAttrAry.length > 0)
			{
				let tmpItemStar = cfg.ItemCfgData.getStarNumById(this.TmpEquipItem.itemid);
				let tmpCostInfo = this.TmpLockAttrAry.length == 1 ? cfg.GodEquipRefineCfgData.getLockOneNeedItemInfoByIndex(tmpItemStar) :
					cfg.GodEquipRefineCfgData.getLockTwoNeedItemInfoByIndex(tmpItemStar);
				Global.setResIconWithItemID(this.UIPanel.LockCostIconImg, CfgID.ResType.Item, tmpCostInfo.itemid);
				Global.setResNumWithItemInfo(this.UIPanel.LockCostNumLb, tmpCostInfo.itemid, tmpCostInfo.itemcount);
			}

		}

		/** 洗练 */
		onRefineClick()
		{

			let tmpItemStar = cfg.ItemCfgData.getStarNumById(this.TmpEquipItem.itemid);

			if (this.TmpLockAttrAry.length > 0)
			{
				let tmpCostInfo = this.TmpLockAttrAry.length == 1 ? cfg.GodEquipRefineCfgData.getLockOneNeedItemInfoByIndex(tmpItemStar) :
					cfg.GodEquipRefineCfgData.getLockTwoNeedItemInfoByIndex(tmpItemStar);
				if (!Global.isFullRes(tmpCostInfo.itemid, tmpCostInfo.itemcount))
				{
					return;
				}
			}

			let tmpCostAry = cfg.GodEquipRefineCfgData.getNeedItemAryByIndex(tmpItemStar);
			if (!Global.isFullAllRes(tmpCostAry))
			{
				return;
			}
			ItemSend.godEquipRefine(this.TmpEquipItem.itemsn, this.TmpLockAttrAry);
		}

		/** 保存 */
		onSaveClick()
		{
			ItemSend.saveGodEquipRefine(this.TmpEquipItem.itemsn);
		}
	}
}