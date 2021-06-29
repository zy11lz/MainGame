module Pro
{
    /**
    * 神界冒险-事件:神秘事件（其实是另外一种小型的对话类型）
    * @author jason.xu
    */
    export class RiskEventMysteryMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Risk.RiskEventMysteryUI;

        /** 当前已选答案 (-1表示未选状态) */
        private _curSelectAnswer: number = -1;
        private _curTrueAnswer: number = 0;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("riskevent")]
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Risk.RiskEventMysteryUI, 1, BaseAddLayer.TopUI);
        }

        public closeUI(): void
        {
            Laya.timer.clear(this, this.closeUI);
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
            this.refreshUI();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            // this.addEventMgr(EventNotify.test, this, this.test);
            this.UIPanel.btnClose.onClick(this, this.closeUI);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            let gridInfo = RiskDataMgr.gridDataList[this.UIOpenData.customObject - 1];

            let id: number = gridInfo.param;
            let cfgInfo = cfg.RiskEventCfgData.getInfo(id);

            //对方相片
            this.UIPanel.imgTargetIcon.frame = cfgInfo.targetType;
            //题目
            this.UIPanel.txtQuestion.text = cfgInfo.question;

            this._curSelectAnswer = -1;  //重置，表示此题还未解
            //答案列表
            this.refreshAnswerList(cfgInfo);
            Laya.timer.clear(this, this.closeUI);
        }

        /** 刷新答案列表 */
        private refreshAnswerList(cfgInfo: cfg.RiskEventCfgInfo = null): void
        {
            let answers = cfgInfo ? [cfgInfo.option1, cfgInfo.option2] : null;
            this.UIPanel.listAnswer.onRefresh(2, this, (view: RiskEventDialogAnswerView, index: number) =>
            {
                if (cfgInfo) view.setAnswerDes(answers[index], index == 0 ? cfgInfo.needExpend : null);
                view.setResult(this._curSelectAnswer >= 0, this._curSelectAnswer == index, this._curTrueAnswer == index);
                view.onClick(this, () =>
                {
                    if (this._curSelectAnswer >= 0) return; //当前已选择了答案，正在等待中、
                    //点击答案
                    this._curSelectAnswer = index;
                    RiskSend.collectGrid(this.UIOpenData.customObject, index + 1, 0);
                    this.showResult();
                })
            })
        }

        /** 显示答案 */
        private showResult(): void
        {
            let gridInfo = RiskDataMgr.gridDataList[this.UIOpenData.customObject - 1];
            let id: number = gridInfo.param;
            let cfgInfo = cfg.RiskEventCfgData.getInfo(id);
            let resultIndex = cfgInfo.result - 1;
            let resultContent = resultIndex == this._curSelectAnswer ? cfgInfo.trueDes : cfgInfo.faildDes;
            TipsUtils.showTips(resultContent);

            this._curTrueAnswer = resultIndex;
            this.refreshAnswerList();
            //延时自动关闭窗口
            Laya.timer.once(2000, this, this.closeUI);
        }


    }
}