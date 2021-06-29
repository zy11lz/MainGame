module Pro
{
    /**
     * 界面说明： 问卷调查界面
    * @author jason.xu
    */
    export class QuestionMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Question.QuestionUI;

        /** 钻石数总数 */
        private _maxDiamon = 0;
        /** 金币数最大数 */
        private _maxGold = 0;
        /** 最大题目数 */
        private _maxCount = 0;
        /** 记录上次答题时间，锁定状态 */
        private _lockTime = 0;

        /** 用于处理数字缓的对象 */
        private _textTweenData = { diamon: 0, gold: 0, diamonSpeed: 0, goldSpeed: 0, tick: 0 };

        /** 当前正在答的题目 */
        private _curQuestion: cfg.QuestionCfgInfo;

        //准备提交到中心服的数据（还需要等待服务器返回签名，所以先存起来）
        // private _requestData = {};

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas('question')];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): string[]
        {
            return ["res/Unpack/UIHeadShow/pic_renwu01.png"];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Question.QuestionUI, 1, BaseAddLayer.TopUI, true);
        }

        public closeUI(): void
        {
            Laya.timer.clear(this, this.onTimer);
            Laya.timer.clear(this, this.onTweenUpdate);
            super.closeUI();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            let addItems = cfg.CommonSurveyConstantsCfgData.getPrizeAddItems();
            for (var el of addItems)
            {
                if (el.itemid == CfgID.ItemID.Diamond) { this._maxDiamon = el.itemcount; }
                else if (el.itemid == CfgID.ItemID.Gold) { this._maxGold = el.itemcount; }
            }
            this._maxCount = cfg.QuestionCfgData.getAll().length;
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            //大奖预览
            let addItems = cfg.CommonSurveyConstantsCfgData.getLuckeyPrizeAddItems();
            this.UIPanel.itemListView.onRefresh(addItems.length, this, (itemUI: NorItemUI, additemsIndex: number) =>
            {
                itemUI.setItemInfo(addItems[additemsIndex]);
            });
            this.refreshStep();
            this.refreshReward(false);
            this._lockTime = 0;

            Laya.timer.loop(1000, this, this.onTimer);
            this.onTimer();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            // this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnConfirm.onClick(this, this.onClickConfirm);
            this.UIPanel.btnHelp.onClick(this, this.onClickHelp);
            //签名返回
            // this.addEventMgr(CmdEvent.Common_Sign, this, this.onSign);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 剩余时间 */
        private onTimer(): void
        {
            let overTime = TimeController.worldCreateZeroTime / 1000 + cfg.CommonSurveyConstantsCfgData.getFirstInfo().openDays * 3600 * 24;
            let leftTime = overTime - TimeController.currTimer / 1000;
            this.UIPanel.htmlTimer.showText = Global.getLangStr("question_msg2", Global.GetRemindTime(leftTime, 9));
        }

        /** 点击问号 */
        private onClickHelp(btn: component.UIButton): void
        {
            CommonHelpView.showWithLangKey(btn, "question_help");
        }

        /** 点击提交 */
        private onClickConfirm(): void
        {
            if (!this.UIPanel.input.text)
            {
                TipsUtils.showTipsByLanId("question_msg4");
                return;
            }
            this.confirmAnswer(this.UIPanel.input.text);
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

        /** 刷新奖励显示 */
        private refreshReward(isChange: boolean): void
        {
            let curIndex = PlayerDataMgr.questionIndex;
            let gold = Math.floor(curIndex * this._maxGold / this._maxCount);
            let diamon = Math.floor(curIndex * this._maxDiamon / this._maxCount);
            Laya.timer.clear(this, this.onTweenUpdate);
            //用tween的update更新太慢，只能自己用loop来驱动
            let tweenData = this._textTweenData;
            if (isChange)
            {
                Laya.timer.frameLoop(1, this, this.onTweenUpdate);
                tweenData.tick = 30;
                tweenData.diamonSpeed = (diamon - tweenData.diamon) / tweenData.tick;
                tweenData.goldSpeed = (gold - tweenData.gold) / tweenData.tick;
            } else
            {
                this.UIPanel.txtCoin.text = Global.numberToTuckString(gold) + "/" + Global.numberToTuckString(this._maxGold);
                this.UIPanel.txtDiamon.text = diamon + "/" + this._maxDiamon;
                tweenData.gold = gold;
                tweenData.diamon = diamon;
            }
        }

        //用tween的update更新太慢，只能自己用loop来驱动
        private onTweenUpdate(): void
        {
            let tweenData = this._textTweenData;
            tweenData.tick--;
            if (tweenData.tick <= 0)
            {
                this.refreshReward(false);
                return;
            }
            tweenData.gold += tweenData.goldSpeed;
            tweenData.diamon += tweenData.diamonSpeed;

            this.UIPanel.txtCoin.text = Global.numberToTuckString(Math.floor(tweenData.gold)) + "/" + Global.numberToTuckString(this._maxGold);
            this.UIPanel.txtDiamon.text = Math.floor(tweenData.diamon) + "/" + this._maxDiamon;
        }

        /** 刷新当前题目进度
         * @param isChange  是否为切换题目时。、
         */
        public refreshStep(): void
        {
            let curIndex = PlayerDataMgr.questionIndex;
            let question = cfg.QuestionCfgData.getAll()[curIndex];
            this._curQuestion = question;
            if (!question)
            {
                PlayerDataMgr.questionIndex = 999;
                GameLaunch.saveClientData();
                //向服务器发起领奖。
                CommonSend.surveyPrize();
                this.closeUI();
                return;
            }
            //第n/m题
            this.UIPanel.txtStep.text = Global.getLangStr("risk_msg4", curIndex + 1, this._maxCount);
            this.UIPanel.txtQuestion.text = question.desc;
            if (question.type == 1)
            { //选择题
                this.UIPanel.textTopicBox.visible = false;
                this.UIPanel.choceList.visible = true;
                this.showChoiceListView(question);
            } else
            { //填空题
                this.UIPanel.textTopicBox.visible = true;
                this.UIPanel.choceList.visible = false;
                this.UIPanel.input.text = "";
            }
        }

        /** 显示选择题答案列表 */
        private showChoiceListView(question: cfg.QuestionCfgInfo): void
        {
            let answerlist = question.choice.split("|");
            this.UIPanel.choceList.onRefresh(answerlist.length, this, (itemUI: ProUI.Question.ChoiceItemUI, index: number) =>
            {
                itemUI.imgTrue.visible = false;
                itemUI.skin = "res/question/tiao03.png";
                itemUI.txtIndex.text = String.fromCharCode(65 + index) + ".";  //ABCD
                itemUI.txtContent.text = answerlist[index];
                itemUI.onClick(this, () =>
                {
                    let time = TimeController.currTimer;
                    if (time - this._lockTime < 1000)
                    {
                        TipsUtils.showTipsByLanId("common_OpOften2");
                        return;
                    }
                    this._lockTime = time;
                    itemUI.skin = "res/question/tiao02.png";
                    itemUI.imgTrue.visible = true;
                    this.confirmAnswer(answerlist[index]);
                })
            })
        }

        /** 答题完成，提交答案，并保存进度 */
        private confirmAnswer(answer: string): void
        {
            PlayerDataMgr.questionIndex++;
            GameLaunch.saveClientData();
            this.refreshReward(true);
            Laya.timer.once(300, this, this.refreshStep);

            CommonSend.surveyLog(this._curQuestion.index, this._curQuestion.desc, answer)
            EventMgr.trigger(EventNotify.Question_Change);

        }

        // /** 服务器返回签名 */
        // private onSign(value: Pb_God.PBG2CCommonSign)
        // {
        //     if (value.type != Pb_God._emSignType.Sign_Survey)
        //     { return; }
        //     let requestData = this._requestData[value.params[0]];
        //     if (!requestData) { return; }
        //     requestData.sign = value.sign;
        //     requestData.time = value.time;
        //     let strData = Global.jsonToUrlParam(requestData);
        //     let url = ServerHostData.getQuestionRequestUrl();
        //     //post到中心服上。
        //     new Public.HttpManager.Http().postRequest(url, null, null, strData);
        // }

    }
}