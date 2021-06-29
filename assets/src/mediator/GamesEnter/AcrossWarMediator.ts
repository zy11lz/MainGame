module Pro
{
    /**
    * 界面说明：跨服战场（集合了 跨服天梯、超凡段位赛、跨服竞技场 入口）
    * @author jason.xu
    */
    export class AcrossWarMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.GamesEnter.AcrossWarEnterUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("crossground"), UrlMgr.getAtlas("commontitle01")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): string[]
        {
            return [
                "res/Unpack/games_enter_bg/kuafu_pic01.jpg",
                "res/Unpack/games_enter_bg/kuafu_pic03.jpg"/*,
                "res/Unpack/games_enter_bg/kuafu_pic04.jpg"*/
            ];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.GamesEnter.AcrossWarEnterUI, 3);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.BGImg.scaleX = GameConfig.WinScaleX;
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.refreshUI();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            // this.addEventMgr(EventNotify.test, this, this.test);
            this.UIPanel.btnClose.onClick(this, this.closeUI);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            this.UIPanel.listView.onRefresh(3, this, this.onRefreshTabItem);
        }

        private onRefreshTabItem(tempUI: Pro.GamesEnterItemView, index: number): void
        {
            //活动描述
            tempUI.setDescText(Global.getLangStr("across_war_des_" + index));
            switch (index)
            {
                case 0: //跨服天梯
                    var retdot1 = LadderDataMgr.reddotModel.isRedDot;
                    var retdot2 = !WeekChampionDataMgr.isLikeMax();
                    tempUI.refreshLeftSingleItemView(21, "kuafu_pic02", retdot1, this.onClickTabBtnLadder, "#f13c55");
                    tempUI.refreshRightSingleItemView(24, "kuafu_pic02", retdot2, this.onClickTabBtnWeekChampion, "#f13c55");
                    break;
                case 1: //超凡段位赛
                    var retdot = DanDataMgr.reddotModel.isRedDot;
                    tempUI.refreshSingleItemView(22, "kuafu_pic03", retdot, this.onClickTabBtnDan, "#e9711b");
                    break;
                case 2: //跨服竞技场
                    var retdot = CrossChallengeDataMgr.redDotModel.isRedDot;
                    tempUI.refreshSingleItemView(23, "kuafu_pic04", retdot, this.onClickTabBtnCrossChallenge, "#2b740e");
                    break;
            }
        }

        /** 点击跨服天梯 */
        private onClickTabBtnLadder(): void
        {
            var isInBattle = BattleMgr.Inst.checkAndWatchingBattleView(Pb_God._emBattleType.BattleType_Ladder);
            if (!isInBattle)
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_LadderMain), BaseBackUIType.HideBackUI);
            }
        }
        /** 点击超凡段位赛 */
        private onClickTabBtnDan(): void
        {
            var isInBattle = BattleMgr.Inst.checkAndWatchingBattleView(Pb_God._emBattleType.BattleType_Dan);
            if (!isInBattle)
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_DanMain), BaseBackUIType.HideBackUI);
            }
        }
        /** 跨服竞技场 */
        private onClickTabBtnCrossChallenge(): void
        {
            var isInBattle = BattleMgr.Inst.checkAndWatchingBattleView(Pb_God._emBattleType.BattleType_CrossChallege);
            if (!isInBattle)
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_CrossChallenge));
            }
        }

        /** 周冠军 */
        private onClickTabBtnWeekChampion(): void
        {
            var isInBattle = BattleMgr.Inst.checkAndWatchingBattleView(Pb_God._emBattleType.BattleType_WeekChampion);
            if (!isInBattle)
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_WeekChampionArenaTop3),BaseBackUIType.HideBackUI);
            }
        }
    }
}