module Pro
{
    /**
    * 界面说明：查看其它玩家个人信息界面(小界面，查看别人个人空间的入口)
    * 可操作加好友、切蹉、举报等等
    * @author jason.xu
    */
    export class PlayerInfoMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.PlayerInfo.PlayerInfoUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("playerinfo")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.PlayerInfo.PlayerInfoUI, 1, BaseAddLayer.TopUI, true);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.closePanel();
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
            let displayer: Pb_God.PBPlayerDisplay = this.UIOpenData.customObject;
            this.UIPanel.btnHome.mouseEnabled = false;  //收到玩家信息再开启按钮，否则会有异常
            //向服务器发起请求玩家的详细信息
            CommonSend.queryPlayerView(displayer.playerid, displayer.logicworldid, 0, 0, Pb_God._emQueryPlayerViewType.QueryPlayerViewType_Main);

            this.UIPanel.viewPlayerIcon.setPlayerDisplayInfo(displayer, false, false);
            this.UIPanel.txtNickname.text = displayer.playername;
            this.UIPanel.txtNickLv.text = "Lv." + displayer.level;
            this.UIPanel.imgFrameSex.frame = displayer.gender + 1; //1男2女
            this.UIPanel.txtVipLv.text = "" + displayer.viplevel;
            this.UIPanel.listView.onRefresh(0, null, null);


            //是否为好友
            let isFriend = !!FriendDataMgr.getFriendInfo(displayer.playerid);
            this.UIPanel.btnAddFriend.visible = !isFriend;
            this.UIPanel.btnPrivateChat.visible = isFriend;
            //是否为黑名单
            let isBlacklist = FriendDataMgr.isBlacklist(displayer.playerid);
            this.UIPanel.txtBlacklistLabel.text = isBlacklist ? Global.getLangStr("playerinfo_msg5") : Global.getLangStr("playerinfo_msg6"); //黑名单 or 加黑名单;

            this.refreshBtnVisible();
            this.refreshUI();
        }

        private refreshBtnVisible()
        {
            let displayer: Pb_God.PBPlayerDisplay = this.UIOpenData.customObject;
            this.UIPanel.btnCompareAttack.visible =
                this.UIPanel.btnPrivateChat.visible =
                this.UIPanel.btnAddFriend.visible =
                this.UIPanel.btnBlacklist.visible =
                this.UIPanel.btnComplain.visible = displayer.worldid == PlayerDataMgr.worldid;

        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(CmdEvent.Common_PlayerViewAck, this, this.onPlayerViewAck)

            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnAddFriend.onClick(this, this.onClickAddFriend);
            this.UIPanel.btnBlacklist.onClick(this, this.onClickBlacklist);
            this.UIPanel.btnCompareAttack.onClick(this, this.onClickCompareAttack);
            this.UIPanel.btnHome.onClick(this, this.onClickHome);
            this.UIPanel.btnPrivateChat.onClick(this, this.onClickPrivateChat);
            this.UIPanel.btnComplain.onClick(this, this.onClickComplain);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 点击黑名单 */
        private onClickBlacklist(): void
        {
            //判断是否已经是黑名单
            let displayer: Pb_God.PBPlayerDisplay = this.UIOpenData.customObject;
            if (!FriendDataMgr.isBlacklist(displayer.playerid))
            {  //拉黑名单操作
                FriendSend.addBlack(displayer.playerid);
            }
            this.closeUI();
            //打开好友黑名单分页
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Friend, 3), BaseBackUIType.CloseQuene);
        }

        /** 点击切蹉 */
        private onClickCompareAttack(): void
        {
            let displayer: Pb_God.PBPlayerDisplay = this.UIOpenData.customObject;
            BattleMgr.Inst.createNormalBat(Pb_God._emBattleType.BattleType_FightEachOther, displayer.playerid, displayer.logicworldid);
        }

        /** 点击个人空间*/
        private onClickHome(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_PlayerInfoHomeOther, this.UIOpenData.customObject), BaseBackUIType.HideBackUI);
        }

        /** 点击加为好友 */
        private onClickAddFriend(): void
        {
            let displayer: Pb_God.PBPlayerDisplay = this.UIOpenData.customObject;
            FriendDataMgr.requestApplyFriend(displayer.playerid);
            TipsUtils.showTipsByLanId("friend_msg23");
        }

        /** 点击私聊 */
        private onClickPrivateChat(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Chat, [Pb_God._emBroadcast_Channel.BroadcastChannel_Player, this.UIOpenData.customObject]), BaseBackUIType.CloseBackUI);
        }

        /** 点击举报 */
        private onClickComplain(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_PlayerComplain, this.UIOpenData.customObject));
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
            if (value.viewtype != Pb_God._emQueryPlayerViewType.QueryPlayerViewType_Main) { return; }
            let viewData = value.main;
            this.UIPanel.btnHome.mouseEnabled = true;
            let danId = viewData.commondisplay.danid;
            this.UIPanel.txtGrading.text = cfg.DanUpgradeCfgData.getDanNameByDanID(danId);
            // this.UIPanel.txtGrading.strokeColor = cfg.DanUpgradeCfgData.getTextColorByDanID(danId);
            this.UIPanel.txtFactionName.text = viewData.factionname || Global.getLangStr("common_none");
            this.UIPanel.txtFightValue.text = viewData.commondisplay.fightpower + "";

            //伙伴列表
            let petList = viewData.petdisplay;
            this.UIPanel.listView.onRefresh(petList.length, this, (tempUI: Pro.NorItemUI, index: number) =>
            {
                let petData = petList[index];
                tempUI.setPetInfoExtend(petData, true, viewData.playerdisplay);
            });
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

    }
}