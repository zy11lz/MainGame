module Pro
{
    /**
    * 界面说明： 查看其它玩家个人空间主界面
    * 界面与 PlayerInfoHomeSelfMediator 用了同一个UI资源，但操作与逻辑会有很大的区分
    * @author jason.xu
    */
    export class PlayerInfoHomeOtherMediator extends BaseMediator implements IMediator
    {
        //玩家详细信息
        private _playerDisplay: Pb_God.PBPlayerDisplay;

        public UIPanel: ProUI.PlayerInfo.PlayerHomeUI;

        /** 分页对应的数据类型 */
        private _pageMapType = [
            Pb_God._emQueryPlayerViewType.QueryPlayerViewType_Info,
            Pb_God._emQueryPlayerViewType.QueryPlayerViewType_Honor,
            Pb_God._emQueryPlayerViewType.QueryPlayerViewType_Record,
            Pb_God._emQueryPlayerViewType.QueryPlayerViewType_Message
        ]

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("playerinfohome")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return ["res/playerinfohome/shape_001.png"];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.PlayerInfo.PlayerHomeUI, 1, BaseAddLayer.TopUI, true);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.tab.visible = false; //荣耀墙等功能未完善，屏蔽分页按钮
            this.UIPanel.pageViewContainer.initData(this.UIPanel.tab, [
                new TableBarContinerData("playerinfo_tab1", "baseInfo", PlayerHomePageInfoOther),
                new TableBarContinerData("playerinfo_tab2", "honor", PlayerHomePageHonor)
            ], [new component.UITabStyle("#ffeacb", 0, "#541d00"), new component.UITabStyle("#ffffff", 3, "#541d00")]);
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this._playerDisplay = this.UIOpenData.customObject;
            this.UIPanel.tab.setSelectTab(-1);
            this.UIPanel.tab.setSelectTab(0);
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.pageViewContainer.onClick(this, this.onClickTab);

            this.addEventMgr(CmdEvent.Common_PlayerViewAck, this, this.onPlayerViewAck)
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        private onClickTab(index: number, tabName: string): void
        {
            let type = this._pageMapType[index];
            if (!type) return;
            CommonSend.queryPlayerView(this._playerDisplay.playerid, this._playerDisplay.logicworldid, 0, 0, type);
        }


		/*****
		 *查询玩家返回	PBG2CQueryPlayerViewAck
		 * @param PBG2CQueryPlayerViewAck
		 * 		viewtype			uint32	 查询类型 _emQueryPlayerViewType
		 * 		main			PBPlayerView	 主界面
		 * 		honor			PBGlobalHonorDisplay	 荣誉
		 */
        protected onPlayerViewAck(value: Pb_God.PBG2CQueryPlayerViewAck): void
        {
            if (value.viewtype == Pb_God._emQueryPlayerViewType.QueryPlayerViewType_Honor)
                this.setPageViewData("honor", [false, this._playerDisplay.playername, value.honor.honorpoint, value.honor.badge]);    //isSelf, owenNickname, honorpoint, badgeList
            else if (value.viewtype == Pb_God._emQueryPlayerViewType.QueryPlayerViewType_Info)
                this.setPageViewData("baseInfo", value.main);
            // else if (value.viewtype == Pb_God._emQueryPlayerViewType.QueryPlayerViewType_Record)
            //     this.setPageViewData("baseInfo", value.record);
            // else if (value.viewtype == Pb_God._emQueryPlayerViewType.QueryPlayerViewType_Message)
            //     this.setPageViewData("baseInfo", value.message);
        }

        private setPageViewData(pageName: string, data: any): void
        {
            this.UIPanel.pageViewContainer.setTableViewData(pageName, data);
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

    }
}