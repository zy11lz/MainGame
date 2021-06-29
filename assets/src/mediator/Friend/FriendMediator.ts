module Pro
{
    /**
    * 界面说明：好友界面
    * @author jason.xu
    */
    export class FriendMediator extends BaseMediator implements IMediator
    {

        public UIPanel: ProUI.Friend.FriendUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("friend"),UrlMgr.getAtlas("xinzeng")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Friend.FriendUI, 3);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            //四个分页视图
            this.UIPanel.pageViewContainer.initData(this.UIPanel.tabGrp, [
                new TableBarContinerData("friend_tab1", "myFriendList", FriendMyFriendPageView),
                new TableBarContinerData("friend_tab2", "giftView", FriendGiftPageView),
                new TableBarContinerData("friend_tab3", "apply", FriendApplyListPageView),
                new TableBarContinerData("friend_tab4", "blackList", FriendBlacklistPageView)
            ], [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]);

        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            let redDotModes = [
                null,
                FriendDataMgr.reddotModel.getChildModel("recieve"),
                FriendDataMgr.reddotModel.getChildModel("apply"),
                null
            ]
            this.UIPanel.tabGrp.setRedDotModelList(redDotModes);
            // //刷新红点
            // this.refreshRedDotView();
            this.UIPanel.tabGrp.setSelectTab(-1);  //先置成-1 便于刷新分页内容
            this.UIPanel.tabGrp.setSelectTab(this.UIOpenData.customObject || 0);
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
        }

    }
}