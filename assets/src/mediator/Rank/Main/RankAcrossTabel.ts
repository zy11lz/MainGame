
module Pro
{
	/**
	 * 跨服排行
	 */
	export class RankAcrossTabel extends ProUI.Rank.ClientServer.MainUI implements ITableView
	{

		/** 当前选择项的对应排行类型ID */
		private _hoiceRankTypeAry = [
			Pb_God._emTopListType.TopListType_BWFaction,
			Pb_God._emTopListType.TopListType_BWFigthpower,
			Pb_God._emTopListType.TopListType_BWLadder
		];

		/** 将所有排行按类型建立索引 */
		private _rankMapType = new ds.StringMap<Pb_God.PBTopListDetail>();
		/**帮派信息 */
		private _factiontop: Pb_God.PBFactionTop;

		/** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{

		}

		//-------------------------------------------------------------------------------------------
		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		addEvent(): void
		{
			EventMgr.on(CmdEvent.TopList_BWAll_Ack, this, this.onAllListAck);
		}

		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		removeEvent(): void
		{
			EventMgr.off(CmdEvent.TopList_BWAll_Ack, this, this.onAllListAck);
		}

		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		show(): void
		{
			TopListSend.bWAll();
			this.ItemList.onRefresh(0, null, null);
		}

		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		hide(): void
		{
			this._factiontop = null;
			this._rankMapType.clear();
		}

		setData($data: any): void
		{

		}

		/** 收到排行信息 */
		private onAllListAck(value: Pb_God.PBS2CAllTopList): void
		{
			this._factiontop = value.factiontop;
			this._rankMapType.clear();
			for (var el of value.detail)
			{
				if (el && el.info)
					this._rankMapType.put(el.info.type, el);
			}
			this.ItemList.onRefresh(this._hoiceRankTypeAry.length, this, this.onItemListRender);
		}

		//-------------------------------------------------------------------
		onItemListRender(itemUI: Pro.RankMainItemView, index: number)
		{
			let tmpRankType = this._hoiceRankTypeAry[index];
			itemUI.imgBg.frame = tmpRankType - 40;
			//公会排名单独处理
			if (tmpRankType == Pb_God._emTopListType.TopListType_BWFaction)
			{
				itemUI.setFactionRankInfo(this._factiontop, true);
			} else
			{
				let rankData = this._rankMapType.get(tmpRankType);
				itemUI.setPlayRankInfo(rankData, tmpRankType, true);
			}
		}

		/** 页签组件销毁 */
		dispose(): void
		{

		}
	}
}