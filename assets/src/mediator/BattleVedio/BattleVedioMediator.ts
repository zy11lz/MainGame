module Pro
{
    /**
    * 界面说明： 录相馆主界面
    * @author jason.xu
    */
    export class BattleVedioMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.BattleVedio.BattleVedioUI;

        public VidioTypeAry: Array<number> = [Pb_God._emVideoType.VideoType_NewPet,
        Pb_God._emVideoType.VideoType_WeekHot,
        Pb_God._emVideoType.VideoType_Challenge,
        Pb_God._emVideoType.VideoType_Champion,
        Pb_God._emVideoType.VideoType_PlayerQiecuo,
        Pb_God._emVideoType.VideoType_FactionWar,
        Pb_God._emVideoType.VideoType_Ladder,
        Pb_God._emVideoType.VideoType_Dan,
        Pb_God._emVideoType.VideoType_WeekChampion];

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("vedio")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.BattleVedio.BattleVedioUI, 3);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {

            //主分页按钮
            this.UIPanel.pageViewContainer.initData(this.UIPanel.tabGrp, [
                // new TableBarContinerData("vedio_tab1", "newHero", BattleVedioPageNewHero, this.VidioTypeAry[0]),
                // new TableBarContinerData("vedio_tab2", "hot", BattleVedioPageHot, this.VidioTypeAry[1]),
                new TableBarContinerData("vedio_tab3", "challenge", BattleVedioPageChallenge, this.VidioTypeAry[2]),
                new TableBarContinerData("vedio_tab4", "champion", BattleVedioPageChampion, this.VidioTypeAry[3]),
                new TableBarContinerData("vedio_tab5", "friendAttack", BattleVedioPageFriendAttack, this.VidioTypeAry[4]),
                new TableBarContinerData("vedio_tab6", "factionwar", BattleVedioPageFactionWar, this.VidioTypeAry[5]),
                new TableBarContinerData("vedio_tab7", "ladder", BattleVedioPageLadder, this.VidioTypeAry[6]),
                new TableBarContinerData("vedio_tab8", "dan", BattleVedioPageDan, this.VidioTypeAry[7])/*,
                new TableBarContinerData("vedio_tab9", "weekChampion", BattleVedioPageWeekChampion, this.VidioTypeAry[8])*/
            ], [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]
            );

            this.UIPanel.tabGrp.hScrollBarSkin = "";

            this.UIPanel.pageViewContainer.onClick(this, (index: number, tabName: string) =>
            {
                if (tabName == "dan")
                    DanSend.masterRecord();
                else
                {
                    VideoSend.querySystem(this.UIPanel.pageViewContainer.getContinerData(tabName).args as number);
                }
            });
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.UIPanel.tabGrp.scrollTo(0);
            this.UIPanel.tabGrp.setSelectTab(0);
            this.refreshWorshipCount();
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            //个人记录和个人收藏按钮根据策划需求隐藏
            // this.UIPanel.btnCollect.onClick(this, this.onClickCollect);
            // this.UIPanel.btnSelfRecord.onClick(this, this.onClickSelfRecord);

            this.addEventMgr(CmdEvent.Video_QuerySystemAck, this, this.onQuerySystemAck);
            this.addEventMgr(CmdEvent.Video_LikeCountAck, this, this.onQuerySystemAck);
            this.addEventMgr(CmdEvent.Video_ShareCountAck, this, this.onQuerySystemAck);
            this.addEventMgr(CmdEvent.Video_PlayCountAck, this, this.onQuerySystemAck);
            this.addEventMgr(CmdEvent.Video_SynInfo, this, this.onQuerySystemAck);
            this.addEventMgr(CmdEvent.Dan_MasterRecord, this, this.onDanMasterRecord);

        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }
        /** 点击收藏 */
        private onClickCollect(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_BattleVedioCollect));
        }
        /** 点击个人记录 */
        private onClickSelfRecord(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_BattleVedioSelfRecord));
        }

        /** 切换主分页 */
        private onClickTab(tab: component.UITab, tabIndex: number, oldTabIndex: number): void
        {
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
        }

        /** 点赞数刷新 */
        private refreshWorshipCount(): void
        {
            let curCount = VideoDataMgr.getTodayLikeTime();
            let maxCount = VideoDataMgr.getTodayMaxLikeTime();
            this.UIPanel.txtWorshipCount.text = Global.getLangStr("vedio_msg1", curCount, maxCount);
        }

        /** 获取录像数据返回 */
        private onQuerySystemAck()
        {
            let tmpTabIndex = this.UIPanel.tabGrp.tabIndex;
            let tmpTabData = this.UIPanel.tabGrp.getItem(tmpTabIndex) as component.UITabData;
            let tmpVidioType = this.UIPanel.pageViewContainer.getContinerData(tmpTabData.tabName).args as number;
            let tmpVidioData = VideoDataMgr.getVideoDisplay(tmpVidioType);
            this.UIPanel.pageViewContainer.setTableViewData(tmpTabData.tabName, tmpVidioData);
            this.refreshWorshipCount();
        }

		/*****
		 *	 查询段位赛大神记录返回 PBG2CDanRecords
		 * @param PBG2CDanRecords
		 * 		records			PBPlayerDanRecord	记录
		 */
        protected onDanMasterRecord(value: Pb_God.PBG2CDanRecords): void
        {
            this.UIPanel.pageViewContainer.setTableViewData("dan", value.records);
        }
    }
}