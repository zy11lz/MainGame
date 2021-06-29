module Pro
{
    /**
    * 
    * 模块：竞技场排位赛主界面
    *
    * @author jason.xu
    * 
    */
    export class ChallengeMediator extends BaseMediator implements IMediator
    {

        public UIPanel: ProUI.Challenge.ChallengeUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("challenge"),UrlMgr.getAtlas("ladder")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Challenge.ChallengeUI, 3);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.closePanel();
        }

        /** 检查UI是否能被重新拉起来 */
        public checkCanDisplayUI(): boolean
        {
            //如果当前正在观看对应的战斗，则界面还不能拉起来，等战斗结束后才能拉
            if (BattleMgr.Inst.getWatchBattleType() == Pb_God._emBattleType.BattleType_Challenge) return false;
            return super.checkCanDisplayUI();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            //////
            //四个分页视图
            this.UIPanel.pageViewContainer.initData(this.UIPanel.tabGrp, [
                new TableBarContinerData("challenge_tab1", "challenge", ChallengePageView),
                new TableBarContinerData("challenge_tab2", "rankview", ChallengeRankPageView),
                new TableBarContinerData("challenge_tab3", "dailyReward", ChallengeDailyRewardPageView),
                new TableBarContinerData("challenge_tab4", "rankReward", ChallengeRankRewardPageView)
            ], [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]);

        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.UIPanel.tabGrp.setSelectTab(0);
            this.refreshUI();

            //红点
            let reddotModel = ChallengeDataMgr.reddotModel;
            this.UIPanel.tabGrp.setRedDotModelList([reddotModel.getChildModel("challenge"), reddotModel.getChildModel("like")]);
        }


        /** 本类界面打开状态下监听消息列表 */
        addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.onClickReturn);
        }

        /** 本类界面打开状态下监听消息列表 */
        public removeEvent(): void
        {
        }

        public refreshUI()
        {
            ChallengeSend.open();
        }


        private onClickReturn(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ArenaEnter), BaseBackUIType.CloseQuene);
            // this.closeUI();

        }
    }
}