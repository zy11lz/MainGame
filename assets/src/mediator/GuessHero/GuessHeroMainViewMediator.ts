module Pro
{
    export class GuessHeroMainViewMediator extends BaseMediator implements IMediator
    {

        public UIPanel: ProUI.GuessHero.GuessHeroMainUI;


        /** private _questionArr=[
             {question:["a1","b1","c1","d1"],answer:0,value:"img_back_0019.png",petType:1},
             {question:["a2","b2","c2","d2"],answer:1,value:"img_back_0020.png",petType:2},
             {question:["a3","b3","c3","d3"],answer:2,value:"img_back_0021.png",petType:3},
             {question:["a4","b4","c4","d4"],answer:3,value:"img_back_0022.png",petType:4},
             {question:["a5","b5","c5","d5"],answer:0,value:"img_back_0023.png",petType:1},
             {question:["a6","b6","c6","d6"],answer:1,value:"img_back_0024.png",petType:2},
             {question:["a7","b7","c1","d1"],answer:2,value:"img_back_0025.png",petType:3},
             {question:["a8","b8","c1","d1"],answer:3,value:"img_back_0026.png",petType:1},

         ]
         **/

        private _currentCfgData: cfg.GuessCfgInfo;

        private _showRewardCfgData: cfg.GuessShowRewardCfgInfo;


        private _currentIndex: number = 0;
        private _currentQuestion: Pb_God.PBG2CQuestion;
        private _showRightAnswerBol: boolean = false;
        private _rightAnswerIndex: number;

        private _remainTime: number = 6;
        private _currentTime: number = 0;
        /**退出游戏，获得排行 */
        private _onExitBol: boolean = false;
        /**当前排名*/
        public curRank: number = 0;

        private _selectedCell: ProUI.GuessHero.item.GuessHeroAnserBtnItemUI;

        private _backMat: Array<number> = [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 1, 0
        ]
        private _backFilters: Laya.ColorFilter[] = [new Laya.ColorFilter(this._backMat)];





        public static ceshiOpen()
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Guess_Hero));

        }
        constructor()
        {
            super();
        }
        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("guessHero"),
            UrlMgr.getUIBgUrl("heroDetailType1"),
            UrlMgr.getUIBgUrl("heroDetailType2"),
            UrlMgr.getUIBgUrl("heroDetailType3"),
            UrlMgr.getUIBgUrl("heroDetailType4"),
            UrlMgr.getUIBgUrl("heroDetailType5"),
            UrlMgr.getUIBgUrl("huodong_caicaibg")
            ];
        }
        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return [UrlMgr.getUIBgUrl("huodong_caicaibg")];
        }
        public openUI()
        {
            this.showPanel(ProUI.GuessHero.GuessHeroMainUI, 3, BaseAddLayer.CenterUI, false, 1);
        }
        /**
        * 关闭UI
        */
        public closeUI()
        {
            Laya.timer.clearAll(this);
            this.closePanel(4);

        }
        public initialization()
        {
            this.UIPanel.answerList.renderHandler = Laya.Handler.create(this, this.renderHandler, null, false);
            this.UIPanel.answerList.mouseHandler = Laya.Handler.create(this, this.mouseHandler, null, false);

            this._showRewardCfgData = cfg.GuessShowRewardCfgData.getFirstInfo();

        }
        public addEvent()
        {
            this.UIPanel.btn_go.onClick(this, this._startGame);
            this.UIPanel.btn_close.onClick(this, this.closeUI);
            this.UIPanel.btn_again.onClick(this, this._startGame);
            this.UIPanel.btn_rank.onClick(this, this.openRankPanel);
            this.UIPanel.btn_tip.onClick(this, this.showTip);


            //选择结果 PBG2CAnswerAck
            this.addEventMgr(Cmd.S2C_Guess_Answer_Ack.cmdName, this, this.onAnswer_Ack)
            //问题下发 PBG2CQuestion
            this.addEventMgr(Cmd.S2C_Guess_Question.cmdName, this, this.onQuestion)
            //答题结束 PBG2CExit
            this.addEventMgr(Cmd.S2C_Guess_Exit.cmdName, this, this.onExit)
            //自己排名信息	PBTopListDetail
            this.addEventMgr(Cmd.S2C_TopList_GetSelf_Ack.cmdName, this, this.onGetSelf_Ack)

        }
        showTip(btn: component.UIButton)
        {

            CommonHelpView.showWithLangKey(btn, this._showRewardCfgData.des);
        }
        openRankPanel()
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Guess_Hero_Rank));

        }
        public removeEvent()
        {
            //选择结果 PBG2CAnswerAck
            this.removeEventMgr(Cmd.S2C_Guess_Answer_Ack.cmdName, this, this.onAnswer_Ack)
            //问题下发 PBG2CQuestion
            this.removeEventMgr(Cmd.S2C_Guess_Question.cmdName, this, this.onQuestion);
            //答题结束 PBG2CExit
            this.removeEventMgr(Cmd.S2C_Guess_Exit.cmdName, this, this.onExit)
            //自己排名信息	PBTopListDetail
            this.removeEventMgr(Cmd.S2C_TopList_GetSelf_Ack.cmdName, this, this.onGetSelf_Ack)

        }
        /*****
         *选择结果 PBG2CAnswerAck
         * @param PBG2CAnswerAck
         * 		result			uint32	0错误1正确
         * 		score			uint32	当前分数
         * 		worngCount			uint32	剩余错误次数,0答题结束
         */
        protected onAnswer_Ack(value: Pb_God.PBG2CAnswerAck): void
        {

            for (let i = 0; i < this._currentQuestion.answers.length; ++i)
            {
                if (this._currentQuestion.answers[i].answerIndex == value.rightAnswers.answerIndex)
                {
                    this._rightAnswerIndex = i;
                    logI("_rightAnswerIndex:" + i + "  answerIndex:" + value.rightAnswers.answerIndex + "  answerText:" + value.rightAnswers.answerText)
                    break;
                }
            }

            this.UIPanel.lbl_currentScore.text = value.score.toString();
            this.UIPanel.lbl_remainTimes.text = value.worngCount + "/" + this._showRewardCfgData.wrongCount;


            if (value.result)
            {
                this._showRight();
            }
            else
            {
                this._showWrong();
            }
            this._showRightAnswer();

            if (value.worngCount <= 0)
            {
                GuessSend.exit_Ask();

            }

            if (value.score > GuessDataMgr.totalScore)
            {
                GuessDataMgr.totalScore = value.score;
            }
        }
        /*****
         *问题下发 PBG2CQuestion
         * @param PBG2CQuestion
         * 		index			uint32	 问题序号
         * 		time			uint32	 答题时间
         * 		answers			PBGuessAnswer	 答案 PBGuessAnswer
         */
        protected onQuestion(value: Pb_God.PBG2CQuestion): void
        {
            this._selectedCell = null;
            this._onExitBol = false;
            this._showAnswerPanel();

            this._currentCfgData = cfg.GuessCfgData.getInfo(value.index);

            this.UIPanel.lbl_answer.text = "猜猜我是谁？";
            this._currentQuestion = value;

            let answersStrArr: string[] = this._currentCfgData.wrong.split("|");

            for (let i = 0; i < this._currentQuestion.answers.length; i++)
            {
                let answer: Pb_God.PBGuessAnswer = this._currentQuestion.answers[i];
                let answerIndex: number = answer.answerIndex - 1
                if (answerIndex < answersStrArr.length)
                {
                    answer.answerText = answersStrArr[answerIndex];
                }
            }


            this.UIPanel.answerList.dataSource = this._currentQuestion.answers;
            this._currentIndex++;
            this._showRightAnswerBol = false;


            this._currentTime = Math.floor((value.time * 1000 - TimeController.currTimer) / 1000);


            this._startTime();


            this.UIPanel.image_hero.skin = null;
            this.UIPanel.image_hero.skin = "res/guessHero/Icon/" + this._currentCfgData.value;
            this.UIPanel.image_hero.filters = this._backFilters;


            //UI背景
            this.UIPanel.frame_bg.frame = this._currentCfgData.petType;


        }
        /*****
         *答题结束 PBG2CExit
         * @param PBG2CExit
         * 		rank			uint32	当前排名
         * 		rightCount			uint32	猜中次数
         */
        protected onExit(value: Pb_God.PBG2CExit): void
        {

            this.UIPanel.lbl_rightGuessTimes.text = value.rightCount.toString();

            this._onExitBol = true;


            Laya.timer.once(1500, this, () =>
            {
                TopListSend.getSelf(Pb_God._emTopListType.TopListType_Guess);
            });



        }



        /*****
         *自己排名信息	PBTopListDetail
         * @param PBTopListDetail
         * 		playerdisplay			PBPlayerDisplay	用户标记
         * 		info			PBTopListInfo	排行数值
         * 		commonData			PBTopListCommonData	一些公用数据
         * 		challengeData			PBTopListChallengeData	竞技场数据
         */
        protected onGetSelf_Ack(value: Pb_God.PBTopListDetail): void
        {
            if (value.info && value.info.type == Pb_God._emTopListType.TopListType_Guess)
            {
                this.curRank = value.info.rank;
            } else
            {
                this.curRank = 0;
            }
            this.UIPanel.lbl_currentRank.text = this.curRank.toString();
            this.UIPanel.lbl_myRank.text = this.curRank.toString();


            if (this._onExitBol) { this.endGame(); }

        }
        public initUI()
        {
            let addItemList: cfg.AddItemInfo[] = cfg.GuessShowRewardCfgData.getRewardsAryByID(1);
            this.UIPanel.list_rewards.onRefresh(addItemList.length, this, (itemUI: NorItemUI, index: number) =>
            {
                itemUI.setItemInfo(addItemList[index]);
            })
            this._onExitBol = false;
            this._showReadyPanel();
            TopListSend.getSelf(Pb_God._emTopListType.TopListType_Guess);
            this.UIPanel.lbl_myRecord.text = GuessDataMgr.totalScore.toString();


        }

        private _startGame()
        {
            //this._currentIndex=0;
            //this._showAnswerPanel();
            //this.nextQuestion();

            this.UIPanel.lbl_remainTimes.text = this._showRewardCfgData.wrongCount + "/" + this._showRewardCfgData.wrongCount;

            GuessSend.begin();

            this.UIPanel.lbl_currentScore.text = "0";
            this.UIPanel.lbl_myRecord.text = GuessDataMgr.totalScore.toString();


        }
        private _tmpEndTime: number;
        private _showReadyPanel(): void
        {
            this.UIPanel.panel_ready.visible = true;
            this.UIPanel.panel_result.visible = false;
            this.UIPanel.panel_answer.visible = false;
            this.UIPanel.panel_score.visible = false;
            this.UIPanel.frame_bg.frame = 8;
            this.UIPanel.image_hero.skin = null;
            this.UIPanel.lbl_myRank.text = this.curRank.toString();
            this.UIPanel.lbl_currentScore.text = "0";


            let actCfgInfo = cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_Guess, 0)[0];

            this._tmpEndTime = ActivityDataMgr.getActivityEndTimeStamp(actCfgInfo.iD);
            //this._tmpEndTime =(TimeController.currTimer+3600000*24-1)/1000
            let tmpPassTime = this._tmpEndTime * 1000 - TimeController.currTimer;

            this._timerPass();
            if (tmpPassTime > 0)
            {
                if (tmpPassTime < 3600000 * 24)
                {
                    Laya.timer.loop(1000, this, this._timerPass);
                }
            }
        }
        private _timerPass()
        {
            let tmpPassTime = this._tmpEndTime * 1000 - TimeController.currTimer;
            if (tmpPassTime > 0)
            {
                this.UIPanel.lbl_finishTime.text = Global.getLangStr("element_msg3", Global.GetRemindTime(tmpPassTime / 1000, 9))
                this.UIPanel.btn_go.visible = true;
                this.UIPanel.btn_again.visible = true;
            } else
            {
                this.UIPanel.lbl_finishTime.text = Global.getLangStr("common_over");
                this.UIPanel.btn_go.visible = false;
                this.UIPanel.btn_again.visible = false;
            }

        }



        private _showAnswerPanel(): void
        {
            this.UIPanel.panel_answer.visible = true;
            this.UIPanel.panel_score.visible = true;
            this.UIPanel.panel_result.visible = false;
            this.UIPanel.panel_ready.visible = false;

            this.UIPanel.frame_time.visible = false;


        }
        private _showResultPanel(): void
        {
            this.UIPanel.panel_result.visible = true;
            this.UIPanel.panel_ready.visible = false;
            this.UIPanel.panel_answer.visible = false;
            this.UIPanel.panel_score.visible = true;
            this.UIPanel.frame_bg.frame = 8;
        }
        private nextQuestion()
        {
            if (this._onExitBol)
            {
                //TopListSend.getSelf(Pb_God._emTopListType.TopListType_Guess);
            } else
            {
                GuessSend.next();
            }

        }
        private _startTime(): void
        {
            Laya.timer.loop(1000, this, this._timerLoop);
            this.UIPanel.frame_time.visible = false;
        }
        private _timerLoop(): void
        {
            this._currentTime--;
            if (this._currentTime < 1)
            {
                this._answerQuestion();
            }
            else if (this._currentTime < 4)
            {
                this.UIPanel.frame_time.visible = true;
                this.UIPanel.frame_time.frame = this._currentTime;
                this.UIPanel.frame_time.scale(2, 2);
                Laya.Tween.to(this.UIPanel.frame_time, { scaleX: 1, scaleY: 1 }, 100);

            }
        }

        public renderHandler(cell: ProUI.GuessHero.item.GuessHeroAnserBtnItemUI, index: number)
        {
            cell.lbl_answer.text = this._currentQuestion.answers[index].answerText;
            cell.img_right.visible = cell.img_wrong.visible = false;

        }
        public mouseHandler(e: Laya.Event, index: number)
        {
            if (e.type != Laya.Event.CLICK) { return; }
            if (this._showRightAnswerBol) { return; }
            this._selectedCell = this.UIPanel.answerList.getCell(index) as ProUI.GuessHero.item.GuessHeroAnserBtnItemUI;

            this._answerQuestion(this._currentQuestion.answers[index].answerIndex);
        }
        private _answerQuestion(answerIndex: number = 999)
        {
            this._showRightAnswerBol = true;
            Laya.timer.clear(this, this._timerLoop);
            this.UIPanel.frame_time.visible = false;
            GuessSend.answer_Ask(answerIndex);

        }


        private _showRightAnswer()
        {
            this._showRightAnswerBol = true;
            Laya.timer.once(1500, this, this.nextQuestion);

            this._selectedCell = this.UIPanel.answerList.getCell(this._rightAnswerIndex) as ProUI.GuessHero.item.GuessHeroAnserBtnItemUI;
            this._selectedCell.img_right.visible = true;

            this.UIPanel.image_hero.filters = null;
            this._selectedCell = null;

        }
        private _showRight()
        {
            this.UIPanel.lbl_answer.text = "答对了!";
            //this.UIPanel.img_answer.visible=true;
            if (this._selectedCell)
            {
                this._selectedCell.img_right.visible = true;
            }

        }
        private _showWrong()
        {
            //this.UIPanel.img_answer.visible=true;
            if (this._selectedCell)
            {
                this._selectedCell.img_wrong.visible = true;
                this.UIPanel.lbl_answer.text = "答错了~";
            } else
            {
                this.UIPanel.lbl_answer.text = "时间到了";
            }

        }
        private endGame()
        {
            this._showResultPanel();

        }



    }





}