
module Pro
{
	/**
     * 圣物升级
     */
	export class HeroHolyUpgradeTabel extends ProUI.Hero.HeroHoly.FunLayer0UI implements ITableView
	{

		/** 圣物类型 */
		holyType: number;

		/** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{

		}

		/** 页签组件销毁 */
		dispose(): void
		{

		}

		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		addEvent(): void
		{

		}

		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		removeEvent(): void
		{

		}

		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部主动调用,传递参数信息 */
		setData($data: any): void
		{
			this.holyType = $data;
			this.refreshUI();
		}

		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		show(): void
		{

		}

		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		hide(): void
		{

		}

		/** 刷新状态 */
		public refreshUI()
		{
			let tmpHolyInfo = HolyDataMgr.getHolyInfo(this.holyType);
			let tmpUpLevelInfo = cfg.HolyUpgradeCfgData.getInfoByTypeAndLv(this.holyType, tmpHolyInfo.level);

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

				itemUI.imgType.frame = tmpAtterID;
				itemUI.TitleLb.text = cfg.BattleCfgData.getDescByAttrType(tmpAtterID) + ":";
				itemUI.NumLb.text = tmpAtterValue > 0 ? tmpAtterValue.toString() : tmpAtterRate + "%";
				itemUI.TitleLb.color = "#5b545b";
				itemUI.NumLb.color = "#5b545b";
				itemUI.NumLb.x = itemUI.TitleLb.x + itemUI.TitleLb.width + 3;
			});

			let tempCostAry = cfg.HolyUpgradeCfgData.getNeedItemAryByIndex(tmpUpLevelInfo.id);
			this.CostBox.onRefresh(tempCostAry.length, this, (itemUI: ProUI.Hero.HeroDetail.UpAdvance.CostItemUI, index: number) =>
			{
				itemUI.iconBg.visible = false;
				Global.setResIconWithItemID(itemUI.IconImg, CfgID.ResType.Item, tempCostAry[index].itemid);
				Global.setResNumWithItemInfo(itemUI.NumLb, tempCostAry[index].itemid, tempCostAry[index].itemcount, true, true, "#5b545b", "#e60000");
			});

			this.LvLb.text = tmpHolyInfo.level.toString();
			this.ExpProLb.text = tmpHolyInfo.exp >= tmpUpLevelInfo.maxExp ? Global.getLangStr("common_lv_full") : tmpHolyInfo.exp + "/" + tmpUpLevelInfo.maxExp;
			this.ExpProImg.scaleX = tmpHolyInfo.exp / tmpUpLevelInfo.maxExp;
			this.CostBox.visible = tmpHolyInfo.exp < tmpUpLevelInfo.maxExp;
			this.CostTipsLb.visible = this.CostBox.visible;
			this.SureBtn.visible = this.CostBox.visible;

			this.imgRed.visible = Global.isFullAllRes(tempCostAry,false);
			this.SureBtn.onClick(this, () =>
			{
				if (!Global.isFullAllRes(tempCostAry))
				{
					return false;
				}
				HolySend.upgrade(this.holyType);
			});

		}
	}
}