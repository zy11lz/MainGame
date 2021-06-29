module Pro
{
    /**
    *
    * 模块：竞技场总入口界面，包括排位赛与冠军赛入口。
    *
    * @author jason.xu
    *
    */
    export class ArenaEnterMediator extends BaseMediator implements IMediator
    {
        /** 当前显示的分页 0-排位赛  1-冠军赛 */
        private _curPage: number = -1;
        /** 排行榜类型 */
        private _rankType: Pb_God._emTopListType;

        /** 倒计时的目标时间戳，单位毫秒 */
        private _targetTime = 0;

        /** 当前角色列表, 简化运算 */
        private _roleBoxList: Array<ArenaEnterRoleBox>;

        public UIPanel: ProUI.Challenge.ArenaEnterUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("arenaenter"), UrlMgr.getAtlas("arenaTop3"), UrlMgr.getAtlas("xinzeng")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return [];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Challenge.ArenaEnterUI, 3);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            for (let role of this._roleBoxList)
            {
                role.unInitUI();
            }
            Laya.timer.clear(this, this.onTimer);
            this.closePanel();
        }

        /**
        * 初始化面板ui
        */
        public initialization(): void
        {
            this._roleBoxList = new Array<ArenaEnterRoleBox>();
            let boxAvatarList = this.UIPanel.boxAvatarList;
            for (let i = 0; i < boxAvatarList.numChildren; i++)
            {
                let box = boxAvatarList._children[i] as ArenaEnterRoleBox;
                this._roleBoxList[i] = box;
                box.index = i;
            }
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            for (let role of this._roleBoxList)
            {
                role.initUI();
            }
            this._curPage = -1;
            this.resetCurPage(this.UIOpenData.customObject || 0);
            this.refreshUI();
        }


        /** 本类界面打开状态下监听消息列表 */
        public addEvent(): void
        {
            // this.addEventMgr(EventNotify.Embattle_Zhenxing_Changed, this, this.zhenXingChanged);

            this.UIPanel.closeBtn.onClick(this, this.closeUI);

            this.UIPanel.btnLoop.onClick(this, this.onClickLoopPage);
            this.UIPanel.btnChampion.onClick(this, this.onClickChampionPage);

            this.UIPanel.btnRank.onClick(this, this.onClickRank);
            this.UIPanel.btnEmbattle.onClick(this, this.onClickEmbattle);
            this.UIPanel.btnEnter.onClick(this, this.onClickEnter);
            this.UIPanel.btnHelp.onClick(this, this.onClickHelp);
            this.UIPanel.btnAddLoopCount.onClick(this, this.onClickAddLoopCount);
            this.UIPanel.btnShape.onClick(this, this.onClickShape);

            //data event
            this.addEventMgr(EventNotify.PlayerItemNumChange, this, this.onItemNumChange);

            //打开返回			PBG2CChampionOpenAck
            this.addEventMgr(CmdEvent.Champion_OpenAck, this, this.onOpenChampionAck);
            this.addEventMgr(CmdEvent.Challenge_OpenSyn, this, this.onOpenChallengeSyn);
            this.addEventMgr(CmdEvent.TopList_List_Ack, this, this.onList_Ack);
            this.addEventMgr(CmdEvent.Challenge_LikeNum, this, this.onLikeNum);
        }

        /** 本类界面打开状态下监听消息列表 */
        public removeEvent(): void
        {

        }

        public refreshUI()
        {
        }

        /** 点击冠军赛排行榜按钮 */
        private onClickRank(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RankDetail, Pb_God._emTopListType.TopListType_Champion));
        }

        /** 点击冠军赛布阵按钮 */
        private onClickEmbattle(): void
        {
            UIManager.Inst.forceOpen(new EmbattleOpenUIData(Pb_God._emZhenfaType.ZhenfaType_Guanjun));
        }

        /** 点击进入挑战按钮 */
        private onClickEnter(): void
        {
            if (this._curPage == 0)
            { //排位赛
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Challenge), BaseBackUIType.CloseQuene);
            } else
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Champion), BaseBackUIType.CloseQuene);
            }
            this.closeUI();
        }

        /** 点击购买排位赛数量 */
        private onClickAddLoopCount(): void
        {
            let ticketId = cfg.ChallengeConstInfoCfgData.getFirstInfo().enterNeedItemID;
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ShopFullPriceBuy, ticketId));
        }

        /** 点击形象设置 */
        private onClickShape(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ShapeDev, 2));
        }

        /** 点击帮助按钮 */
        private onClickHelp(): void
        {
            let strHelp: string;
            if (this._curPage == 0)
            { strHelp = Global.getLangStr("challenge_help"); }
            else
            { strHelp = Global.getLangStr("champion_help"); }
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Help, strHelp));
        }

        private onClickLoopPage(): void
        {
            this.resetCurPage(0);
        }

        private onClickChampionPage(): void
        {
            this.resetCurPage(1);
        }

        //设置分页
        private resetCurPage(page): void
        {
            if (page == this._curPage) { return; }
            this._curPage = page;

            // (this.UIPanel.btnLoop.getChildByName("imgShade") as Laya.Image).visible = this._curPage != 0;
            // (this.UIPanel.btnChampion.getChildByName("imgShade") as Laya.Image).visible = this._curPage != 1;



            if (this._curPage == 0)
            { //排位赛分页
                this.UIPanel.btnLoop.skin = UrlMgr.getArenaenterUrl("jingji_pic_05");
                this.UIPanel.btnChampion.skin = UrlMgr.getArenaenterUrl("jingji_pic_07");
                this.UIPanel.loopImg.skin = UrlMgr.getArenaenterUrl("jingji_pic_06");
                this.UIPanel.championImg.skin = UrlMgr.getArenaenterUrl("jingji_pic_08");


                this.setUIBG(Global.getUIBGPathWithName(this.mediatorName));
                this.UIPanel.btnRank.visible = false;
                this.UIPanel.btnEmbattle.visible = false;
                this.UIPanel.btnAddLoopCount.visible = true;
                this.UIPanel.loopCountBg.visible = true;
                this.UIPanel.txtLine1Content2.visible = false;

                ChallengeSend.open();
                this._rankType = Pb_God._emTopListType.TopListType_Challenge;
            } else
            { //冠军赛分页

                this.UIPanel.btnLoop.skin = UrlMgr.getArenaenterUrl("jingji_pic_07");
                this.UIPanel.btnChampion.skin = UrlMgr.getArenaenterUrl("jingji_pic_05");
                this.UIPanel.loopImg.skin = UrlMgr.getArenaenterUrl("jingji_pic_06_01");
                this.UIPanel.championImg.skin = UrlMgr.getArenaenterUrl("jingji_pic_08_01");

                this.setUIBG(Global.getUIBGPathWithName(PanelNotify.Open_Champion));
                this.UIPanel.btnRank.visible = true;
                this.UIPanel.btnEmbattle.visible = true;
                this.UIPanel.btnAddLoopCount.visible = false;
                this.UIPanel.loopCountBg.visible = false;
                ChampionSend.openAsk();
                this._rankType = Pb_God._emTopListType.TopListType_Champion;
            }
            TopListSend.list(this._rankType, 1, 3, 0, 0, 0, 0);

            this.UIPanel.jingjiBox.visible = this._curPage == 0;
            this.UIPanel.championBox.visible = this._curPage != 0;
        }


        /*****
         * 拿到排位赛数据
         * 		order			uint32	自己名次
         * 		score			uint32	积分
         */
        protected onOpenChallengeSyn(value: Pb_God.PBG2CChallengeTopInfo): void
        {
            if (this._curPage != 0) { return; }
            this.UIPanel.txtLine1Title.text = Global.getLangStr("arena_msg1");
            this.UIPanel.txtLine1Content.text = value.score + "";

            this.UIPanel.txtLine2Title.text = Global.getLangStr("arena_msg2");
            this.UIPanel.txtLine2Content.text = value.order ? value.order + "" : Global.getLangStr("common_norank");

            let ticketId = cfg.ChallengeConstInfoCfgData.getFirstInfo().enterNeedItemID;
            this.UIPanel.txtLine3Title.text = Global.getLangStr("arena_msg3");
            this.UIPanel.txtLine3Content.text = Global.getItemNum(ticketId) + "";
            this.UIPanel.txtLine3Content.x = this.UIPanel.txtLine3Title.width + this.UIPanel.txtLine3Title.x + 16;

            //赛季时间
            let overTime = ChallengeDataMgr.getSeasonOverTime();
            let beginTime = overTime - cfg.ChallengeConstInfoCfgData.getFirstInfo().seasonDays * 24 * 3600; //周期
            this.UIPanel.txtLine4Content.text = Global.getFormatTimeString(beginTime * 1000, 10) + "-" + Global.getFormatTimeString(overTime * 1000 - 1000, 10);
            this.UIPanel.txtLine4Content2.x = this.UIPanel.txtLine4Content.width + this.UIPanel.txtLine4Content.x + 5;

            this._targetTime = overTime * 1000;
            Laya.timer.loop(20 * 1000, this, this.onTimer);  //分钟为最小单位，20秒驱动一次即可
            this.onTimer();
        }

        /*****
         * 拿到冠军赛数据
         * @param PBG2CChampionOpenAck
         * 		begintime			uint32	开始时间
         * 		round			uint32	回合ID_emChampionRound
         * 		state			uint32	状态_emChampionState
         * 		currank			uint32	当前名次
         * 		maxrank			uint32	最高名次
         */
        protected onOpenChampionAck(value: Pb_God.PBG2CChampionOpenAck): void
        {
            if (this._curPage != 1) { return; }
            this.UIPanel.txtLine1Title.text = Global.getLangStr("champ_msg1");
            let isOpening = ChampionDataMgr.isOpening;
            let isMatching = ChampionDataMgr.isMatching;
            if (isOpening)
            {
                //开启中
                this.UIPanel.txtLine1Content.text = cfg.ChampionRoundCfgData.getNameByRoundID(value.round) + "-";
                this.UIPanel.txtLine1Content2.visible = true;
                let strState = ""; //除了竞猜中和进行中，其它均显示暂未开启
                if (value.state == Pb_God._emChampionState._emChampionState_Guess) { strState = Global.getLangStr("champ_state2"); }
                else if (value.state == Pb_God._emChampionState._emChampionState_Fight) { strState = Global.getLangStr("champ_state3"); }
                else { strState = Global.getLangStr("champ_state1"); }
                this.UIPanel.txtLine1Content2.text = strState;
                this.UIPanel.txtLine1Content2.x = this.UIPanel.txtLine1Content.width + this.UIPanel.txtLine1Content.x + 1;
            } else
            {
                this.UIPanel.txtLine1Content2.visible = false;
                this.UIPanel.txtLine1Content.text = isMatching ? Global.getLangStr("champ_state4") : Global.getLangStr("champ_state1"); //暂未开启";
            }


            this.UIPanel.txtLine2Title.text = Global.getLangStr("champ_msg2");
            this.UIPanel.txtLine2Content.text = value.currank ? value.currank + "" : Global.getLangStr("common_norank");

            this.UIPanel.txtLine3Title.text = Global.getLangStr("champ_msg3");
            this.UIPanel.txtLine3Content.text = value.maxrank ? value.maxrank + "" : Global.getLangStr("common_norank");
            this.UIPanel.txtLine3Content.x = this.UIPanel.txtLine3Title.width + this.UIPanel.txtLine3Title.x + 16;

            //赛季时间
            let openTimeInfo = cfg.ChampionConstInfoCfgData.getOpenTimeInfo();
            var currTimer = TimeController.currTimer;
            if (isOpening)
            {
                //当前如果正在开启中，倒计时目标为当前结束时间，日期范围为当天到下一场开始
                var beginDayTime = currTimer;
                var endDayTime = ChampionDataMgr.getNextOpenTime();
                this.UIPanel.txtLine4Content.text = Global.getFormatTimeString(beginDayTime, 10) + "-" + Global.getFormatTimeString(endDayTime, 10);

                this._targetTime = openTimeInfo.getEndTime(currTimer);
            } else if (isMatching)
            {
                //匹配中， 在正式开始前的5分钟
                let beginDayTime = currTimer;
                let endDayTime = ChampionDataMgr.getNextNextOpenTime();
                this.UIPanel.txtLine4Content.text = Global.getFormatTimeString(beginDayTime, 10) + "-" + Global.getFormatTimeString(endDayTime, 10);
                this._targetTime = ChampionDataMgr.getNextOpenTime();
            } else
            {
                //当前如果还未开启，倒计时目标为下次开启时间，日期范围为下场到下下场日期
                let nextNextOpenTime = ChampionDataMgr.getNextNextOpenTime();
                // this._targetTime = value.begintime * 1000;  //没有开启时，这个时间就表示下一场开启的时间
                this._targetTime = ChampionDataMgr.getNextOpenTime();
                this.UIPanel.txtLine4Content.text = Global.getFormatTimeString(this._targetTime, 10) + "-" + Global.getFormatTimeString(nextNextOpenTime, 10);
            }
            this.UIPanel.txtLine4Content2.x = this.UIPanel.txtLine4Content.width + this.UIPanel.txtLine4Content.x + 5;
            Laya.timer.loop(20 * 1000, this, this.onTimer);  //分钟为最小单位，20秒驱动一次即可
            this.onTimer();
        }

        /** 倒计时回调 */
        private onTimer(): void
        {
            let leftTime = this._targetTime - TimeController.currTimer;
            this.UIPanel.txtLine4Content2.text = Global.getLangStr("arena_msg4", Global.GetRemindTime(leftTime / 1000, 10));
        }


        /*****
         *点赞次数		PBChallengeLikeAck
         * @param PBChallengeLikeAck
         * 		playerID			uint32	玩家id
         * 		likeNum			uint32	次数
         */
        protected onLikeNum(value: Pb_God.PBChallengeLikeAck): void
        {
            let count = this._roleBoxList.length;
            for (var i = 0; i < count; i++)
            {
                let role = this._roleBoxList[i];
                if (role.bindPlayerId == value.playerID)
                {
                    role.setWorshipValue(value.likeNum, false);
                    break;
                }
            }
        }

        /** 收到排行榜 */
        private onList_Ack(tempClass: Pb_God.PBS2CTopListList)
        {
            if (!tempClass.ask || this._rankType != tempClass.ask.type) { return; }
            let list = tempClass.list;
            let selfPlayerId = PlayerDataMgr.uid;
            let count = this._roleBoxList.length;
            for (var i = 0; i < count; i++)
            {
                let role = this._roleBoxList[i];
                let rankData = list[i];
                let worshipNum = rankData && rankData.challengeData ? rankData.challengeData.likeNum : 0;
                let canWorship = rankData && selfPlayerId != rankData.playerdisplay.playerid &&
                    !ChallengeDataMgr.checkPlayerLike(rankData.playerdisplay.playerid) &&
                    !ChallengeDataMgr.isLikeMax();
                role.setWorshipValue(worshipNum, canWorship);
                role.setRoleData(this._curPage, rankData ? rankData.playerdisplay : null, i);
            }
            this.UIPanel.txtWorshipCount.text = tempClass.selfinfo && tempClass.selfinfo.challengeData ? tempClass.selfinfo.challengeData.likeNum + "" : "0";
        }


        /** 刷新道具数量 */
        private onItemNumChange(fID: number, tempNewNum: number): void
        {
            if (this._curPage == 0 && fID == cfg.ChallengeConstInfoCfgData.getFirstInfo().enterNeedItemID)
            {
                this.UIPanel.txtLine3Content.text = tempNewNum + "";
            }
        }
    }
}