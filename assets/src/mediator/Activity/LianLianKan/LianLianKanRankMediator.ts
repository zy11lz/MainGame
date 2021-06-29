module Pro
{
    /**
    * 
    *   连连看
    * 
    */
    export class LianLianKanRankMediator extends BaseMediator implements IMediator
    {

        public UIPanel: ProUI.Challenge.ChallengeUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null
        }

        public openUI(): void
        {
            this.showPanel(ProUI.ActivityMain.LianLianKan.LianLianKanRankUI, 3);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.pageViewContainer.initData(this.UIPanel.tabGrp, [
                new TableBarContinerData("rank_msg3", "lianliankanRank", LianLianKanRankPageView),
                new TableBarContinerData("warorder_tab1", "lianliankanRankReward", LianLianKanRankRewardPageView)
            ], [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]);
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.UIPanel.tabGrp.setSelectTab(0);
            this.refreshUI();
        }


        /** 本类界面打开状态下监听消息列表 */
        addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
        }

        /** 本类界面打开状态下监听消息列表 */
        public removeEvent(): void
        {

        }
    }
}