module Pro
{
    /**
    *
    * 周冠军赛
    *
    * @author lz
    *
    */
    export class WeekChampionArenaTop3Mediator extends BaseMediator implements IMediator
    {
        /** 排行榜类型 */
        private _rankType: Pb_God._emTopListType;

        /** 倒计时的目标时间戳，单位毫秒 */
        private _targetTime = 0;

        /** 当前角色列表, 简化运算 */
        private _roleBoxList: Array<WeekChampArenaEnterRole>;

        public UIPanel: ProUI.WeekChampion.WeekChampionArenaTop3UI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("arenaenter"), UrlMgr.getAtlas("arenaTop3"), UrlMgr.getAtlas("xinzeng"),UrlMgr.getAtlas("champion")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return [];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.WeekChampion.WeekChampionArenaTop3UI, 3);
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
            this._roleBoxList = new Array<WeekChampArenaEnterRole>();
            let boxAvatarList = this.UIPanel.boxAvatarList;
            for (let i = 0; i < boxAvatarList.numChildren; i++)
            {
                let box = boxAvatarList._children[i] as WeekChampArenaEnterRole;
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
            this.refreshUI();
        }


        /** 本类界面打开状态下监听消息列表 */
        public addEvent(): void
        {
            // this.addEventMgr(EventNotify.Embattle_Zhenxing_Changed, this, this.zhenXingChanged);

            this.UIPanel.closeBtn.onClick(this, this.closeUI);

            this.UIPanel.btnRank.onClick(this, this.onClickRank);
            this.UIPanel.btnEmbattle.onClick(this, this.onClickEmbattle);
            this.UIPanel.btnEnter.onClick(this, this.onClickEnter);
            this.UIPanel.btnHelp.onClick(this, this.onClickHelp);
            this.UIPanel.btnShape.onClick(this, this.onClickShape);
            this.UIPanel.shopBtn.onClick(this, this.onClickShop);
            

            

            //打开返回			PBG2CChampionOpenAck
            this.addEventMgr(CmdEvent.WeekChampion_OpenAck, this, this.onOpenChampionAck);
            this.addEventMgr(CmdEvent.TopList_List_Ack, this, this.onList_Ack);
            this.addEventMgr(CmdEvent.WeekChampion_Like, this, this.onLikeNum);
        }

        /** 本类界面打开状态下监听消息列表 */
        public removeEvent(): void
        {

        }

        public refreshUI()
        {
            //周冠军赛
            this.setUIBG(Global.getUIBGPathWithName(PanelNotify.Open_WeekChampion));
            WeekChampionSend.openAsk();
            this._rankType = Pb_God._emTopListType.TopListType_BWWeekChampion;
            
            TopListSend.list(this._rankType, 1, 3, 0, 0, 0, 0);
        }

        /** 点击冠军赛排行榜按钮 */
        private onClickRank(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RankDetail, Pb_God._emTopListType.TopListType_BWWeekChampion));
        }

        /** 点击冠军赛布阵按钮 */
        private onClickEmbattle(): void
        {
            if(WeekChampionDataMgr.state == Pb_God._emChampionState._emChampionState_Guess || WeekChampionDataMgr.state == Pb_God._emChampionState._emChampionState_Fight)
            {
                Pro.TipsUtils.showTips(Global.getLangStr("week_champ_msg1"));   
                return;
            }
            UIManager.Inst.forceOpen(new EmbattleOpenUIData(Pb_God._emZhenfaType.ZhenfaType_WeekChampion));
        }

        /** 点击进入挑战按钮 */
        private onClickEnter(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_WeekChampion), BaseBackUIType.CloseQuene);
            this.closeUI();
        }

        /** 点击形象设置 */
        private onClickShape(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ShapeDev, 2));
        }

        /** 点击帮助按钮 */
        private onClickHelp(): void
        {
            let strHelp: string = Global.getLangStr("weekChampionTips");
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Help, strHelp));
        }

        /** 点击商店按钮 */
        private onClickShop(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Shop, Pb_God._emShopType.ShopType_WeekChampion));
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
            this.UIPanel.txtLine1Title.text = Global.getLangStr("champ_msg1");
            let isOpening = WeekChampionDataMgr.isOpening;
            let isMatching = WeekChampionDataMgr.isMatching;
            if (isOpening)
            {
                //开启中
                this.UIPanel.txtLine1Content.text = cfg.WeekChampionRoundCfgData.getNameByRoundID(value.round) + "-";
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
            let openTimeInfo = cfg.WeekChampionConstInfoCfgData.getOpenTimeInfo();
            var currTimer = TimeController.currTimer;
            if (isOpening)
            {
                //当前如果正在开启中，倒计时目标为当前结束时间，日期范围为当天到下一场开始
                var beginDayTime = currTimer;
                var endDayTime = WeekChampionDataMgr.getNextOpenTime();
                this.UIPanel.txtLine4Content.text = Global.getFormatTimeString(beginDayTime, 10) + "-" + Global.getFormatTimeString(endDayTime, 10);

                this._targetTime = openTimeInfo.getEndTime(currTimer);
            } else if (isMatching)
            {
                //匹配中， 在正式开始前的5分钟
                let beginDayTime = currTimer;
                let endDayTime = WeekChampionDataMgr.getNextNextOpenTime();
                this.UIPanel.txtLine4Content.text = Global.getFormatTimeString(beginDayTime, 10) + "-" + Global.getFormatTimeString(endDayTime, 10);
                this._targetTime = value.begintime * 1000;
            } else
            {
                //当前如果还未开启，倒计时目标为下次开启时间，日期范围为下场到下下场日期
                // let nextNextOpenTime = WeekChampionDataMgr.getNextNextOpenTime();
                let nextNextOpenTime = value.endtime * 1000; 
                this._targetTime = value.begintime * 1000;  //没有开启时，这个时间就表示下一场开启的时间
                // this._targetTime = WeekChampionDataMgr.getNextOpenTime();
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
        protected onLikeNum(value: Pb_God.PBU32U32): void
        {
            let count = this._roleBoxList.length;
            for (var i = 0; i < count; i++)
            {
                let role = this._roleBoxList[i];
                if (role.bindPlayerId == value.key)
                {
                    role.setWorshipValue(value.value, false);
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
                    !WeekChampionDataMgr.checkPlayerLike(rankData.playerdisplay.playerid) &&
                    !WeekChampionDataMgr.isLikeMax();
                role.setWorshipValue(worshipNum, canWorship);
                role.setRoleData(1, rankData ? rankData.playerdisplay : null, i);
            }
            this.UIPanel.txtWorshipCount.text = tempClass.selfinfo && tempClass.selfinfo.challengeData ? tempClass.selfinfo.challengeData.likeNum + "" : "0";
        }

    }
}