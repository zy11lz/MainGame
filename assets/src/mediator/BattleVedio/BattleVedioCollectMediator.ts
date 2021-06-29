module Pro
{
    /**
    * 界面说明： 录相馆个人收藏界面
    * @author jason.xu
    */
    export class BattleVedioCollectMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.BattleVedio.BattleVedioCollectUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("vedio")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.BattleVedio.BattleVedioCollectUI, 1, BaseAddLayer.TopUI, true);
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
            VideoSend.querySystem(Pb_God._emVideoType.VideoType_PlayerCollect);
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(CmdEvent.Video_QuerySystemAck, this, this.refreshListView);
            this.addEventMgr(CmdEvent.Video_LikeCountAck, this, this.refreshListView);
            this.addEventMgr(CmdEvent.Video_PlayCountAck, this, this.refreshListView);
            this.addEventMgr(CmdEvent.Video_ShareCountAck, this, this.refreshListView);
            this.addEventMgr(CmdEvent.Video_SynInfo, this, this.onSynInfo);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

		/*****
		 *同步信息				PBPlayerVideo
		 * @param PBPlayerVideo
		 * 		daylikevideo			uint64	 点赞的录像
		 * 		collectvideo			uint64	 收藏的录像
		 */
        protected onSynInfo(value: Pb_God.PBPlayerVideo): void
        {
            //先筛选一次
            let list = VideoDataMgr.getVideoDisplay(Pb_God._emVideoType.VideoType_PlayerCollect);
            if (!list) return;
            let collectMap = Global.listToStringMap(value.collectvideo);
            for (let i = list.length - 1; i >= 0; i--)
            {
                var el = list[i];
                if (!collectMap.get(el.battlesn + ""))
                {
                    list.splice(i, 1);
                }
            }
            this.setList(list);
        }

        /** 刷新列表 */
        protected refreshListView(): void
        {
            let list = VideoDataMgr.getVideoDisplay(Pb_God._emVideoType.VideoType_PlayerCollect);
            this.setList(list);
        }
        protected setList(list: Pb_God.PBVideoDisplay[]): void
        {
            let len = list != null ? list.length : 0;
            this.UIPanel.listView.visible = len > 0;
            this.UIPanel.imgEmpty.visible = len == 0;
            this.UIPanel.txtDes.text = Global.getLangStr("vedio_msg3", len, "30")
            if (this.UIPanel.listView.visible)
            {
                this.UIPanel.listView.onRefresh(len, this, (tempUI: Pro.BattleVedioNormalItemView, index: number) =>
                {
                    tempUI.setData(list[index], Pb_God._emVideoType.VideoType_PlayerCollect);
                });
            }
        }

    }
}