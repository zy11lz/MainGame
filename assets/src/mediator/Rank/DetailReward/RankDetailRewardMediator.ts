
module Pro
{
	/**
	 * 排行版带奖励界面
	 */
	export class RankDetailRewardMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Rank.DetailReward.MainUI;


		/** 排行榜类型 */
		RankType: Pb_God._emTopListType;

		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return [];
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Rank.DetailReward.MainUI, 3);
		}

		/** 关闭UI*/
		closeUI(): void
		{
			this.closePanel();
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{
			this.UIPanel.FunBox.initData(this.UIPanel.tabGrp, [
				new TableBarContinerData("rank_msg4", "rankReward", RankDetailRewardTabel),
				new TableBarContinerData("rank_msg3", "rankList", RankDetailRankListTabel)
			], [new component.UITabStyle("#f13b54", 2, "#f13b54"), new component.UITabStyle("#fffced", 2, "#fffced")]);
		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		addEvent(): void
		{
			this.UIPanel.btnClose.onClick(this, this.closeUI);
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{

		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{
			this.RankType = this.UIOpenData.customObject;
			this.UIPanel.TitleLb.innerHTML = cfg.ToplistCfgData.getNameByType(this.RankType);
			this.UIPanel.FunBox.setTableViewData("rankList", this.RankType);
			this.UIPanel.FunBox.setTableViewData("rankReward", this.RankType);
			this.UIPanel.tabGrp.setSelectTab(0);
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}
	}
}