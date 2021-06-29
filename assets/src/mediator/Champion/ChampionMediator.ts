module Pro
{
    /**
    * 竞冠军赛主界面
    * @author jason.xu
    */
    export class ChampionMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Champion.ChampionUI;

        /** 当前是否显示为从32强内查看对战信息， 标记此值时， 返回按钮操作为返回到32强，而不是关闭界面 */
        private _isShow32FightInfo = false;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("champion"),UrlMgr.getAtlas("challenge")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return ["res/champion/jingji_pic_10.png", "res/champion/jingji_pic_11.png", "res/champion/jingji_pic_12.png", "res/champion/jingji_pic_13.png", "res/champion/jingji_pic_16.png"];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Champion.ChampionUI, 1);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.UIPanel.viewBarrage.cleanUp();  //弹幕
            this.UIPanel.viewFighting.cleanUp();  //战斗阵容视图， 分别在我的竞赛、竞猜、和32强赛分页都有可能需要显示
            this.UIPanel.viewFinal32.cleanUp(); //32强分布图
            this.UIPanel.viewGuess.cleanUp();  //竞猜下注图
            this.UIPanel.viewRank.cleanUp();  //排行榜视图
            this.UIPanel.boxNoOpenView.cleanUp();
            this.closePanel();
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            ChampionSend.openAsk();
            ChampionDataMgr.reddotModel.setRedDot(0);
            this.UIPanel.tabGrp.mouseEnabled = false; //先屏蔽点击，等数据稳定后再打开。
        }

        /**
        * 初始化面板ui 
        */
        public initialization(): void
        {
            //主分页按钮
            this.UIPanel.tabGrp.onClick(this, this.onClickTab,
                [new component.UITabData("champ_tab1"), new component.UITabData("champ_tab2"),
                new component.UITabData("champ_tab3"), new component.UITabData("champ_tab4")],
                [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]
            );
        }

        /** 本类界面打开状态下监听消息列表 */
        public addEvent(): void
        {
            //network data event
            //打开返回			PBG2CChampionOpenAck
            this.addEventMgr(CmdEvent.Champion_OpenAck, this, this.onOpenChampionAck);
            //我的竞赛返回		PBG2CChampionSelfGuessAck
            this.addEventMgr(CmdEvent.Champion_SelfGuessAck, this, this.onSelfBattleInfoAck)
            //查询竞猜返回		PBG2CChampionQueryGuessAck
            this.addEventMgr(CmdEvent.Champion_QueryGuessAck, this, this.onQueryGuessAck);
            //查看对战信息		PBChampionBattle
            this.addEventMgr(CmdEvent.Champion_QueryBattleInfo, this, this.onQueryBattleInfo);

            //client data event
            //状态变化
            this.addEventMgr(EventNotify.Champion_StateChange, this, this.onChangeState);
            this.addEventMgr(EventNotify.Champion_ShowFightInfo, this, this.onShowFightInfo);;
            /** 重新保存布阵 */
            this.addEventMgr(EventNotify.Embattle_Save, this, this.onSaveEmbattle);

            this.addEventMgr(EventNotify.Battle_Result, this, this.onBattleResult);

            //ui event 
            this.UIPanel.btnReturn.onClick(this, this.onClickReturn);
            this.UIPanel.btnHelp.onClick(this, this.onclickHelp);
            this.UIPanel.btnShop.onClick(this, this.onClickShop);
            this.UIPanel.btnMyEmbattle.onClick(this, this.onClickEmbattle);
            this.UIPanel.btnRecord.onClick(this, this.onClickRecord);
            this.UIPanel.btnReward.onClick(this, this.onClickReward);

        }

        /** 本类界面打开状态下监听消息列表 */
        public removeEvent(): void
        {

        }

		/*****
		 * 拿到冠军赛数据
         * */
        protected onOpenChampionAck(): void
        {
            this.UIPanel.tabGrp.mouseEnabled = true;
            this.UIPanel.tabGrp.setSelectTab(!ChampionDataMgr.isOpening ? 1 : 0); 
        }

        //规则说明
        private onclickHelp(): void
        {
            let strHelp = Global.getLangStr("champion_help");
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Help, strHelp));
        }
        //竞技商店
        private onClickShop(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Shop, Pb_God._emShopType.ShopType_Challenge), BaseBackUIType.HideBackUI);
        }

        /** 点击布阵 */
        private onClickEmbattle(): void
        {
            UIManager.Inst.forceOpen(new EmbattleOpenUIData(Pb_God._emZhenfaType.ZhenfaType_Guanjun));
        }

        /** 点击战报 */
        private onClickRecord(): void
        {
            ChampionSend.fightRecordAsk();
        }

        /** 点击奖励 */
        private onClickReward(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ChampReward));
        }

        /** 战斗中退出时，界面不会再init, 在此处重新拉取数据 */
        private onBattleResult(battleType: number): void
        {
            if (battleType == Pb_God._emBattleType.BattleType_Champion)
                this.shiftTabPage(this.UIPanel.tabGrp.tabIndex);
        }

        /** 切换主分页 */
        private onClickTab(tab: component.UITab, tabIndex: number, oldTabIndex: number): void
        {
            this.shiftTabPage(tabIndex);
        }
        private shiftTabPage(tabIndex: number): void
        {
            //先把所有该隐藏的全隐藏掉，再在不同的视图中显示出来。
            this.UIPanel.viewBarrage.hide();  //弹幕
            this.UIPanel.viewFighting.hide();  //战斗阵容视图， 分别在我的竞赛、竞猜、和32强赛分页都有可能需要显示
            this.UIPanel.viewFinal32.hide(); //32强分布图
            this.UIPanel.viewGuess.hide();  //竞猜下注图
            this.UIPanel.viewRank.hide();  //排行榜视图
            this.UIPanel.boxNoOpenView.hide();  //未开启或未入围的提示视图
            this.UIPanel.timeView.hide();  //时间视图（各阶段的时间倒计时）
            this._isShow32FightInfo = false;

            this.UIPanel.btnMyEmbattle.visible = false;
            this.UIPanel.btnRecord.visible = false;
            let arr = [this.toMyRacesPageView, this.toGuessPageView, this.toFinal32PageView, this.toRankPageView];
            arr[tabIndex].apply(this);
        }

        /** 切换我的竞赛分页 */
        private toMyRacesPageView(): void
        {
            if (ChampionDataMgr.isOpening)
            {  //活动已开启               
                ChampionSend.selfGuessAsk();
                this.UIPanel.btnRecord.visible = true;
            } else
            {
                this.UIPanel.boxNoOpenView.show();
            }
            this.UIPanel.viewBarrage.show();  //弹幕
            this.UIPanel.btnMyEmbattle.visible = true;
        }

        /** 切换竞猜分页 */
        private toGuessPageView(): void
        {
            if (ChampionDataMgr.isOpening)
            {
                this.UIPanel.viewFighting.show();
                this.UIPanel.viewGuess.show();
                ChampionSend.queryGuessAsk(); //查询竞猜
            }
            this.UIPanel.timeView.show();
            this.UIPanel.viewBarrage.show();  //弹幕
        }

        /** 切换32强赛分页 */
        private toFinal32PageView(): void
        {
            if (ChampionDataMgr.isOpening)
            { //活动已开启，并且选拔赛已结束，方可显示32强视图   _emChampionRound_Area4 为32强
                if(ChampionDataMgr.round > Pb_God._emChampionRound._emChampionRound_Area4)
                {
                    this.UIPanel.viewFinal32.show();
                }
                else
                {
                    this.UIPanel.viewFinal32.show32();
                }
                
            }
            this.UIPanel.timeView.show();
            this.UIPanel.viewBarrage.show();  //弹幕
        }

        /** 切换排行榜分页 */
        private toRankPageView(): void
        {
            this.UIPanel.viewRank.show();
        }

        /** 查看对战信息(从32强对阵列表中，点击了某一个查看) */
        private onShowFightInfo(leftPlayerId: number, rightPlayerId: number, round: number): void
        {
            this._isShow32FightInfo = true;
            this.UIPanel.viewFinal32.hide();
            this.UIPanel.viewFighting.show();

            //向服务器发送查看请求。
            ChampionSend.queryBattleInfo(round, leftPlayerId, rightPlayerId);

        }

        /** 重新布阵 */
        private onSaveEmbattle(embattleType: number): void
        {
            if (embattleType != Pb_God._emZhenfaType.ZhenfaType_Guanjun) return;
            if (!ChampionDataMgr.isOpening) return;
            if (this.UIPanel.tabGrp.tabIndex != 0) return;
            //布阵保存后，重新拉取一次我的竞赛信息        
            ChampionSend.selfGuessAsk();
        }

        /** 模块的刷新方法, 在模块每次被呼出的时候自动调用,  用来同步刷新数据和显示*/
        public refreshUI()
        {
        }


		/*****
		 *我的竞赛返回		PBG2CChampionSelfGuessAck
		 * @param PBG2CChampionSelfGuessAck
		 * 		begintime			uint32	开始时间
		 * 		round			uint32	回合ID_emChampionRound
		 * 		state			uint32	状态_emChampionState
		 * 		battle			PBChampionBattle	战斗显示
		 */
        protected onSelfBattleInfoAck(value: Pb_God.PBG2CChampionSelfGuessAck): void
        {
            if (this.UIPanel.tabGrp.tabIndex != 0) return;
            //判断自己是否已入围参赛
            //刚开始第一回合的准备阶段，从数据上暂时无法分析出自己有没有参与
            // if (value.battle || (value.round == Pb_God._emChampionRound._emChampionRound_Normal1 && value.state == Pb_God._emChampionState._emChampionState_Ready)) {
            if (ChampionDataMgr.isTakePartIn)
            {
                this.UIPanel.viewFighting.show();
                this.UIPanel.viewFighting.setFightInfo(value.battle);
                this.UIPanel.timeView.show();
            } else
            {
                this.UIPanel.boxNoOpenView.show();
            }
        }

		/*****
         * 状态变化
		 */
        protected onChangeState(state: number): void
        {
            //如果当前显示的是32强的查看对阵信息，则无需更新对应分页，只需更新时间状态即可
            if (this._isShow32FightInfo)
            {
                this.UIPanel.timeView.refreshView();
                this.UIPanel.viewFighting.refreshView();
            } else
            {
                //切换到战斗开始状态时，需要拉取当前显示的对战，直接进入战斗
                if (state == Pb_God._emChampionState._emChampionState_Fight)
                {
                    if (this.UIPanel.viewFighting.visible && this.UIPanel.viewFighting.displayedInStage)
                    {
                        this.UIPanel.timeView.refreshView();
                        this.UIPanel.viewFighting.watchCurFight();
                        return;
                    }
                }
                this.shiftTabPage(this.UIPanel.tabGrp.tabIndex);
            }

        }

		/*****
		 *查询竞猜返回		PBG2CChampionQueryGuessAck
		 * @param PBG2CChampionQueryGuessAck
		 * 		begintime			uint32	开始时间
		 * 		round			uint32	回合ID_emChampionRound
		 * 		state			uint32	状态_emChampionState
		 * 		battle			PBChampionBattle	战斗显示
		 * 		guesscoin			uint32	竞猜币
		 * 		leftodds			uint32	左边赔率 扩大一百倍
		 * 		rightodds			uint32	右边赔率 扩大一百倍
		 */
        protected onQueryGuessAck(value: Pb_God.PBG2CChampionQueryGuessAck): void
        {
            if (this.UIPanel.tabGrp.tabIndex != 1) return;
            this.UIPanel.viewFighting.setFightInfo(value.battle);
            this.UIPanel.viewGuess.setGuessAck(value);
        }

		/*****
		 *查看对战信息		PBChampionBattle
		 * @param PBChampionBattle
		 * 		leftbattle			PBBattleDisplay	左边显示
		 * 		rightbattle			PBBattleDisplay	右边显示
		 * 		battlesn			uint64	战斗SN
		 * 		winplayerid			uint32	胜利玩家ID
		 */
        protected onQueryBattleInfo(value: Pb_God.PBChampionBattle): void
        {
            if (!this._isShow32FightInfo) return;
            this.UIPanel.viewFighting.setFightInfo(value);
        }

        private onClickReturn(): void
        {
            //有标记时， 返回到对应分页显示
            if (this._isShow32FightInfo)
            {
                this.shiftTabPage(this.UIPanel.tabGrp.tabIndex);
                return;
            }
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ArenaEnter, 1), BaseBackUIType.CloseQuene);
        }
    }
}