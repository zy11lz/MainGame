module Pro
{
    /**
    * 模块：公会列表界面
    * @author jason.xu
    */
    export class FactionListMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Faction.FactionListUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("factionlist")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Faction.FactionListUI, 3);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.closePanel();
        }

        /**
        * 初始化面板ui 
        */
        public initialization(): void
        {
            this.UIPanel.pageViewContainer.initData(this.UIPanel.tabGrp, [
                new TableBarContinerData("faction_msg21", "listView", FactionListPageListView),
                new TableBarContinerData("faction_msg22", "createView", FactionListPageCreateView),
                new TableBarContinerData("faction_msg23", "searchView", FactionListPageSearchView)
            ],  [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]);

            this.initAni();
        }

        private initAni()
        {
            let sk = new Pro.SkeletonPlayer();
            sk.load(UrlMgr.getSpineSceneUrl("npc/xiaozhi/xiaozhi"));
            this.UIPanel.aniPos.addChild(sk);
            sk.scale(0.5, 0.5);
            sk.playByIndex(0, true);
        }
        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.UIPanel.tabGrp.setSelectTab(0);
            this.refreshUI();
        }

        /** 模块的刷新方法, 在模块每次被呼出的时候自动调用,  用来同步刷新数据和显示*/
        public refreshUI()
        {
        }

        /** 本类界面打开状态下监听消息列表 */
        public addEvent(): void
        {
            //datas
            this.addEventMgr(EventNotify.Faction_Change, this, this.onFactionChange);
        }

        /** 本类界面打开状态下监听消息列表 */
        public removeEvent(): void
        {

        }

        /** 公会信息有变化 */
        private onFactionChange(): void
        {
            if (!FactionDataMgr.isHaveFaction()) return;
            this.closePanel(0, true, true) //有进入公会以后，这个界就再也不需要出现了。
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FactionMain), BaseBackUIType.CloseQuene);
        }



        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public onHide()
        {

        }
    }
}