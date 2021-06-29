module Pro
{
    /**
    * 界面说明：秘境探险（集合了 神界冒险、元素圣殿、天界副本 入口）
    * @author jason.xu
    */
    export class SecretTravelMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.GamesEnter.SecretTravelEnterUI;

        private _colorList = ["#f13c55","#e69900","#4c7399"];

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("secrettravel"), UrlMgr.getAtlas("commontitle01")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): string[]
        {
            return [
                "res/Unpack/games_enter_bg/mijing_shenjie_bg.jpg",
                "res/Unpack/games_enter_bg/mijing_yuansu_bg.jpg",
                "res/Unpack/games_enter_bg/mijing_tianjie_bg.jpg"
            ];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.GamesEnter.SecretTravelEnterUI, 3);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {

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
            let color = this._colorList[index];
            switch (index)
            {
                case 0: //神界冒险
                    var retdot = RiskDataMgr.reddotModel.isRedDot;
                    tempUI.refreshSingleItemView(11, "mijing_shenjie_bg", retdot, this.onClickTabBtnRisk,color);
                    break;
                case 1: //元素圣殿
                    var retdot = ElementDataMgr.reddotModel.isRedDot;
                    tempUI.refreshSingleItemView(12, "mijing_yuansu_bg", retdot, this.onClickTabBtnElement,color);
                    break;
                case 2: //天界副本
                    var retdot = HeavenDungeonDataMgr.reddot.isRedDot;
                    tempUI.refreshSingleItemView(13, "mijing_tianjie_bg", retdot, this.onClickTabBtnHeaven,color);
                    break;
            }
        }


        /** 点击神界冒险 */
        private onClickTabBtnRisk(): void
        {
            var results = BattleMgr.Inst.checkAndWatchingBattleView(Pb_God._emBattleType.BattleType_Risk);
            if (!results)
            {
                RiskSend.open(); //向服务器请求，以返回的数据决定是打开英雄选择界面还是进入神界主界面
            }
        }
        /** 点击元素神殿 */
        private onClickTabBtnElement(): void
        {
            var results = BattleMgr.Inst.checkAndWatchingBattleView(Pb_God._emBattleType.BattleType_Element);
            if (!results)
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Element), BaseBackUIType.HideBackUI);
            }
        }

        /** 点击天界副本 */
        private onClickTabBtnHeaven(): void
        {
            var results = BattleMgr.Inst.checkAndWatchingBattleView(Pb_God._emBattleType.BattleType_HeavenDungeon);
            if (!results)
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeavenMain), BaseBackUIType.HideBackUI);
            }
        }



        //-----------------------------------新手引导------------------------------------
        /**
         * 进入本步引导
         */
        public Guide_Enter(step: GuideStep)
        {
            let guideIndex = -1;
            if (step == GuideStep.Func_Risk_4) guideIndex = 0;

            if (guideIndex >= 0)
            {
                Laya.timer.once(100, this, () =>
                {
                    let cell = this.UIPanel.listView.getCell(guideIndex) as Pro.GamesEnterItemView;
                    GuideMgr.Inst.showFinger(cell, true, cell.btn, 0, 0, 20);
                });
            }
        }

        // /**
        //  * 操作本步引导
        //  */
        // public Guide_Active(step: GuideStep) {
        //     let guideIndex = -1;
        //     if (step == GuideStep.Func_Risk_4) guideIndex = 0;

        //     if (guideIndex >= 0) {
        //         let cell = this.UIPanel.listView.getCell(guideIndex) as Pro.GamesEnterItemView;
        //         cell.btn.activeEvent();
        //         GuideMgr.Inst.nextActive();
        //     }

        // }
    }
}