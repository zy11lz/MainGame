
module Pro
{
	/**
	 * 排行榜面板中的榜单页面
	 */
	export class RankDetailRankListTabel extends ProUI.Rank.DetailReward.Rank.MainUI implements ITableView
	{

		/** 排行榜类型 */
		RankType: Pb_God._emTopListType = 0;

		/** 排行榜数据标题 */
		private _strValueTitle = "";

		/** 获取当前选择的榜单数据 */
		TempRankList: Pb_God.PBTopListDetail[];

		/** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{

		}

		//-------------------------------------------------------------------------------------------
		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		addEvent(): void
		{
			EventMgr.on(CmdEvent.TopList_List_Ack, this, this.onList_Ack);
		}
		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		removeEvent(): void
		{
			EventMgr.off(CmdEvent.TopList_List_Ack, this, this.onList_Ack);
		}

		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		show(): void
		{
			if (this.RankType == 0) { return; }
			this.imgEmpty.visible = false;
			this.listView.onRefresh(0, null, null);

			//重置底部自己的基础信息显示
			this.MyRankInfo.txtNickname.text = PlayerDataMgr.name;
			this.MyRankInfo.playerIcon.setSimpleInfo(ShapeDataMgr.iconId, ShapeDataMgr.iconFrameID, PlayerDataMgr.gender, 0);
			this.MyRankInfo.txtFightValue.text = PlayerDataMgr.fightPower + "";
			//其它信息显示先隐藏，等排行榜数据到了以后再显示出来
			this.refreshItemRankData(this.MyRankInfo, null);

			let showcount = cfg.ToplistCfgData.getShowLineByType(this.RankType);
			TopListSend.list(this.RankType, 1, showcount, 0, 0, 0, 0);
		}

		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		hide(): void
		{

		}

		setData($data: any): void
		{
			this.RankType = $data;
			switch (this.RankType)
			{
				case Pb_God._emTopListType.TopListType_Element:
				case Pb_God._emTopListType.TopListType_Endless:
					this._strValueTitle = Global.getLangStr("rank_msg9"); //最大通关数
					break;
				case Pb_God._emTopListType.TopListType_PeakDay1:
				case Pb_God._emTopListType.TopListType_PeakDay2:
				case Pb_God._emTopListType.TopListType_PeakDay3:
				case Pb_God._emTopListType.TopListType_PeakDay4:
				case Pb_God._emTopListType.TopListType_PeakDay5:
				case Pb_God._emTopListType.TopListType_AcitivtyBoss:
					this._strValueTitle = Global.getLangStr("rank_msg10");  //总伤害
					break;
			}
			this.show();
		}

		/** 页签组件销毁 */
		dispose(): void
		{

		}

		/** 收到排行榜 */
		private onList_Ack(tempClass: Pb_God.PBS2CTopListList)
		{
			if (this.RankType != tempClass.ask.type) return;

			this.TempRankList = tempClass.list;
			//玩家自己排名信息
			if (tempClass.selfinfo) this.refreshItemRankData(this.MyRankInfo, tempClass.selfinfo.info);

			this.listView.onRefresh(this.TempRankList.length, this, (node: Laya.Image, index: number) =>
			{
				let data = this.TempRankList[index];
				let itemUI = node.getChildAt(0) as ProUI.Rank.DetailReward.Rank.RankItemUI;

				itemUI.playerIcon.setPlayerDisplayInfo(data.playerdisplay);
				itemUI.txtNickname.text = data.playerdisplay.playername;
				itemUI.txtFightValue.text = data.info.subvalue + "";
				itemUI.txtFightValue.text = data.commonData ? (data.commonData.fightpower + "") : (data.info.subvalue + "");

				this.refreshItemRankData(itemUI, data.info);
			});


		}


		private refreshItemRankData(itemUI: ProUI.Rank.DetailReward.Rank.RankItemUI, rankInfo: Pb_God.PBTopListInfo): void
		{
			if (rankInfo)
			{
				itemUI.txtValue.visible = itemUI.txtValueTitle.visible = true;
				itemUI.txtValue.text = rankInfo.value + "";
				itemUI.txtValueTitle.text = this._strValueTitle;
			} else
			{
				itemUI.txtValue.visible = itemUI.txtValueTitle.visible = false;
			}
			let rank = rankInfo ? rankInfo.rank : 0
			if (rank <= 0)
			{
				itemUI.imgFrameRank.frame = 0;
				itemUI.txtRank.text = Global.getLangStr("common_norank");
			} else if (rank <= 3)
			{
				itemUI.imgFrameRank.frame = rank;
				itemUI.txtRank.text = "";
			} else
			{
				itemUI.imgFrameRank.frame = 0;
				itemUI.txtRank.text = rank + "";
			}
		}
	}
}