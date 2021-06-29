
module Pro
{
	/**
	 * 排行榜面板中的奖励页面
	 */
	export class RankDetailRewardTabel extends ProUI.Rank.DetailReward.Reward.MainUI implements ITableView
	{

		/** 排行榜类型 */
		RankType: Pb_God._emTopListType = 0;

		/** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{

		}

		//-------------------------------------------------------------------------------------------
		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		addEvent(): void
		{

		}
		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		removeEvent(): void
		{

		}

		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		show(): void
		{
			if (this.RankType == 0) { return; }
			let list = cfg.ToplistRewardCfgData.getRewardListByType(this.RankType);
			this.listView.onRefresh(list.length, this, (itemUI: ProUI.Rank.DetailReward.Reward.RewardItemUI, index: number) =>
			{
				let cfgData = list[index];
				let lastRank = index > 0 ? list[index - 1].rank : 0;
				let curRank = cfgData.rank;
				if (curRank > lastRank + 1)
				{
					//中间有差，则显示 a~b的形式
					itemUI.imgFrameRank.frame = 0;
					itemUI.txtRank.text = (lastRank + 1) + "~" + curRank;
				} else if (curRank <= 3)
				{
					//前3用图片显示
					itemUI.imgFrameRank.frame = curRank;
					itemUI.txtRank.text = "";
				} else
				{
					itemUI.imgFrameRank.frame = 0;
					itemUI.txtRank.text = curRank + "";
				}
				let addItems = cfg.ToplistRewardCfgData.getAddItemAryByInfo(cfgData);
				itemUI.listItems.onRefresh(addItems.length, this, (itemUI: NorItemUI, index: number) =>
				{
					itemUI.setItemInfo(addItems[index]);
				});
			});
		}

		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		hide(): void
		{

		}

		setData($data: any): void
		{
			this.RankType = $data;
			this.show();
		}

		/** 页签组件销毁 */
		dispose(): void
		{

		}
	}
}