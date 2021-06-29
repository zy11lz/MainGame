module Pro
{
    /**
    * 界面说明： 录相馆个人记录界面
    * @author jason.xu
    */
    export class BattleVedioSelfRecordMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.BattleVedio.BattleVedioSelfRecordUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("vedio")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.BattleVedio.BattleVedioSelfRecordUI, 1, BaseAddLayer.TopUI, true);
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
            VideoSend.querySystem(Pb_God._emVideoType.VideoType_PlayerRecord);
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(CmdEvent.Video_QuerySystemAck, this, this.refreshListView);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
        }

        /** 刷新列表 */
        protected refreshListView(): void
        {
            let list = VideoDataMgr.getVideoDisplay(Pb_God._emVideoType.VideoType_PlayerRecord);
            this.UIPanel.listView.visible = list != null && list.length > 0;
            this.UIPanel.imgEmpty.visible = !this.UIPanel.listView.visible;
            if (this.UIPanel.listView.visible)
            {
                this.UIPanel.listView.onRefresh(list.length, this, (tempUI: Pro.BattleVedioNormalItemView, index: number) =>
                {
                    tempUI.setData(list[index], Pb_God._emVideoType.VideoType_PlayerRecord);
                });
            }
        }

    }
}