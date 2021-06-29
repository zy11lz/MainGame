module Pro
{
    /**
    * 神界冒险-事件:问答
    * @author jason.xu
    */
    export class RiskEventAnswerMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Risk.RiskEventAnswerUI;

        private _answers: string[];
        /** 当前已选答案 (-1表示未选状态) */
        private _curSelectAnswer: number = -1;
        private _curTrueAnswer: number = 0;

        /** 当前答题的进度 */
        private _step: number;

        /** 满额奖励列表 */
        private _addItemList: cfg.AddItemInfo[];

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("riskevent")]
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Risk.RiskEventAnswerUI, 1, BaseAddLayer.TopUI);
        }

        public closeUI(): void
        {
            Laya.timer.clear(this, this.refreshStep);
            super.closeUI();
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
            /** 刷新所有奖励预览 */
            let addItemList = cfg.RiskCollectPrizeCfgData.getAddItemArrByStageAndType(RiskDataMgr.data.curstage, Pb_God._emRiskRefreshType.RiskRefreshType_Question);
            this._addItemList = addItemList;
            this.UIPanel.listAllReward.onRefresh(addItemList.length, this, (norItemUI: Pro.NorItemUI, index: number) =>
            {
                let addItem = addItemList[index];
                norItemUI.setItemID(addItem.itemid, addItem.itemcount * 3);
            });

            Laya.timer.clear(this, this.refreshStep);
            this.refreshStep();
            //刷新累计奖励
            this.refreshCurReward();

            // this.refreshUI();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(Cmd.S2C_Risk_QuestionAck.cmdName, this, this.onQuestionAck)

            this.UIPanel.btnClose.onClick(this, this.closeUI);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /*****
         *答题返回			PBG2CRiskQuestionAck
         * @param PBG2CRiskQuestionAck
         * 		grid			uint32	 格子
         * 		index			uint32	 答题索引
         * 		option			uint32	 选项123
         * 		result			uint32	 正确答案
         */
        protected onQuestionAck(value: Pb_God.PBG2CRiskQuestionAck): void
        {
            if (value.grid != this.UIOpenData.customObject) { return; }
            if (value.index != this._step) { return; }

            this._curSelectAnswer = value.option - 1;
            this._curTrueAnswer = value.result - 1;
            this.refreshAnswerList();
            //刷新累计奖励
            this.refreshCurReward();
            //延时切换下一题
            Laya.timer.once(500, this, this.refreshStep);
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

        /** 刷新答题进度，如果答完，则直接关闭界面 */
        public refreshStep(): void
        {
            //答题进度
            let step = 0;
            //当前题目id， 0表示已经结束了，没有题了 。
            let questionId = 0;
            //答对个数
            let trueCount = 0;
            let falseCount = 0;

            let gridInfo = RiskDataMgr.gridDataList[this.UIOpenData.customObject - 1];
            for (var value of gridInfo.indexvalue)
            {
                step++;
                if (value.value == Pb_God._emRiskQuestionResult.RiskQuestionResult_None)
                {
                    //还未答
                    questionId = value.key;
                    break;
                } else if (value.value == Pb_God._emRiskQuestionResult.RiskQuestionResult_Success)
                {
                    //回答正确
                    trueCount++;
                } else if (value.value == Pb_God._emRiskQuestionResult.RiskQuestionResult_Fail)
                {
                    //回答错误
                    falseCount++;
                }
            }

            this._step = step;
            let maxStep = gridInfo.indexvalue.length;
            if (questionId == 0)
            { //没题了
                this.showResultTips(trueCount, falseCount);
                // RiskSend.collectGrid(gridInfo.grid, 0, 0);
                this.closeUI();
                return;
            }
            let questionCfg = cfg.RiskQuestionCfgData.getInfo(questionId);
            this.UIPanel.txtStep.text = Global.getLangStr("risk_msg4", step, maxStep);
            //问题
            this.UIPanel.txtQuestion.text = questionCfg.question;
            //答案列表
            this._curSelectAnswer = -1;  //重置，表示此题还未解
            this.initAnswers(questionCfg);
            this.refreshAnswerList();
        }

        /** 初始化答案列表 */
        private initAnswers(cfgInfo: cfg.RiskQuestionCfgInfo): void
        {
            this._answers = [cfgInfo.optionA, cfgInfo.optionB];
            if (cfgInfo.optionC) { this._answers.push(cfgInfo.optionC); }
            if (cfgInfo.optionD) { this._answers.push(cfgInfo.optionD); }
        }

        /** 刷新答案视图列表 */
        private refreshAnswerList(): void
        {
            this.UIPanel.listAnswer.onRefresh(this._answers.length, this, (tempUI: ProUI.Risk.ChildView.RiskEventAnswerItemUI, index: number) =>
            {
                tempUI.txtIndex.text = String.fromCharCode(65 + index);  //ABCD
                tempUI.txtContent.text = this._answers[index];
                tempUI.imgTrue.visible = this._curSelectAnswer >= 0 && this._curTrueAnswer == index;
                tempUI.imgFaild.visible = this._curSelectAnswer >= 0 && this._curSelectAnswer == index && this._curTrueAnswer != index;
                tempUI.onClick(this, () =>
                {
                    if (this._curSelectAnswer >= 0) { return; } //当前已选择了答案，正在等待中、屏蔽连点操作
                    //点击答案
                    this._curSelectAnswer = index;
                    RiskSend.question(this.UIOpenData.customObject, this._step, index + 1);
                })
            })
        }

        /** 刷新当前奖励显示 */
        private refreshCurReward(): void
        {
            //答对个数
            let trueCount = 0;
            let gridInfo = RiskDataMgr.gridDataList[this.UIOpenData.customObject - 1];
            for (var value of gridInfo.indexvalue)
            {
                if (value.value == Pb_God._emRiskQuestionResult.RiskQuestionResult_Success)
                { //回答正确
                    trueCount++;
                }
            }
            //累计倍率
            let scale = trueCount;
            let items = this._addItemList;
            this.UIPanel.listCurReward.onRefresh(items.length, this, (box: Laya.UIComponent, index: number) =>
            {
                let itemInfo = items[index];
                let icon = box.getChildByName("icon") as Laya.Image;
                let txtCount = box.getChildByName("txtCount") as Laya.Label;
                Global.setResIconWithItemID(icon, CfgID.ResType.Item, itemInfo.itemid);
                txtCount.text = "" + Math.ceil(itemInfo.itemcount * scale);
            });
        }

        /** 结算时,根据对错数量，弹个提示 */
        private showResultTips(trueCount: number, falseCount: number): void
        {
            let langkey = "risk_question_result_normal";
            if (falseCount == 0) //全对
            { langkey = "risk_question_all_true"; }
            else if (falseCount == 1)//错1个
            { langkey = "risk_question_one_faild"; }
            else if (trueCount == 0) //全错
            { langkey = "risk_question_all_faild"; }
            TipsUtils.showTipsByLanId(langkey);
        }
    }
}