
module Pro
{
	/**
	 * 背包普通装备确认出售
     */
	export class BagNorEquipSellSureMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Bag.NorEquipSellSureUI;


		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return null;
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Bag.NorEquipSellSureUI, 1, BaseAddLayer.TopUI);
		}

		/** 关闭UI*/
		closeUI(): void
		{
			this.closePanel(0, true, true);
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{
			this.UIPanel.SureBtn.onClick(this, this.onSureClick);
			this.UIPanel.CancelBtn.onClick(this, this.closeUI);
		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		addEvent(): void
		{

		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{

		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{
			let tmpItemList = this.UIOpenData.customObject as Pb_God.PBItem[];
			let tmpHaveHighQu = false;
			let tmpItemAllCount = 0;
			let tmpItemSellItemNum = 0;
			let tmpItemSellItemID = 0;
			tmpItemList.forEach(element =>
			{
				let tmpSellInfo = cfg.ItemCfgData.getSellItemInfoById(element.itemid);
				tmpItemSellItemID = tmpSellInfo.itemid;
				tmpItemAllCount += element.itemcount;
				tmpItemSellItemNum += tmpSellInfo.itemcount * element.itemcount;
				if (cfg.ItemCfgData.getQualityById(element.itemid) >= 5)
				{
					tmpHaveHighQu = true;
				}
			});
			this.UIPanel.TipsLb.visible = tmpHaveHighQu;

			this.UIPanel.RewardItem.setItemID(tmpItemSellItemID, tmpItemSellItemNum);
			this.UIPanel.CostDesLb.text = Global.getLangStr("bag_msg1", tmpItemAllCount);
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}

		/** 确定出售 */
		onSureClick(): void
		{
			this.closeUI();

			let tmpSnList = [];
			(this.UIOpenData.customObject as Pb_God.PBItem[]).forEach(element =>
			{
				tmpSnList.push(element.itemsn);
			});
			ItemSend.sellOneKey(tmpSnList);
		}
	}
}