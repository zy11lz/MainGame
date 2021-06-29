
module Pro
{
	/**
	 * 装备合成记录
	 */
	export class ItemCombinEquipRecordMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.ItemCombin.Equip.Record.MainUI;


		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return null;
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.ItemCombin.Equip.Record.MainUI, 1, BaseAddLayer.TopUI, true);
		}

		/** 关闭UI*/
		closeUI(): void
		{
			this.closePanel();
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{

		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		addEvent(): void
		{
			this.UIPanel.CloseBtn.onClick(this, this.closeUI);
			this.addEventMgr(Cmd.S2C_Item_EquipCompoundLog, this, this.onItemEquipLog);
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{

		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{
			ItemSend.equipCompoundLog();
			this.UIPanel.ItemList.visible = false;
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}

		onItemEquipLog(value: Pb_God.PBG2CEquipCompoundLog)
		{
			this.UIPanel.imgEmpty.visible = value.log.length <= 0;
			this.UIPanel.ItemList.visible = true;
			this.UIPanel.ItemList.onRefresh(value.log.length, this, (itemUI: ProUI.ItemCombin.Equip.Record.RecordItemUI, index: number) =>
			{
				let tmpInfo = value.log[index];
				itemUI.CostTimeLb.text = Global.getFullTimeString(tmpInfo.time * 1000);
				itemUI.ItemBox.onRefresh(tmpInfo.item.length, this, (itemInfoUI: NorItemUI, infoIndex: number) =>
				{
					let tmpItemInfo = tmpInfo.item[infoIndex];
					itemInfoUI.setItemID(tmpItemInfo.itemid, tmpItemInfo.itemcount.toNumber());
				});
				Global.setResIconWithItemID(itemUI.CostIconImg, CfgID.ResType.Item, tmpInfo.expend[0].itemid);
				itemUI.CostNumLb.text = tmpInfo.expend[0].itemcount.toNumber().toString();
			});
		}

	}
}