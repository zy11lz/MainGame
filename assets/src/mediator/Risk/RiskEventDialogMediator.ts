module Pro
{
    /**
    * 神界冒险-事件:与老头对话
    * @author jason.xu
    */
    export class RiskEventDialogMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Risk.RiskEventDialogUI;

        /** 当前已选答案 (-1表示未选状态) */
        private _curSelectAnswer: number = -1;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("riskevent")]
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Risk.RiskEventDialogUI, 1, BaseAddLayer.TopUI);
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
            let gridInfo = RiskDataMgr.gridDataList[this.UIOpenData.customObject - 1];

            let id: number = gridInfo.param;
            let cfgInfo = cfg.RiskDialogCfgData.getInfo(id);
            //题目            
            this.UIPanel.txtQuestion.text = Global.getLangStr("risk_dialog_des") + cfgInfo ? cfgInfo.question : "";

            this._curSelectAnswer = -1;  //重置，表示此题还未解
            //答案列表
            this.refreshAnswerList();
            Laya.timer.clear(this, this.closeUI);
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
        }

        /** 刷新答案列表
         * @param cfgInfo 没有传值时，表示仅仅只需要刷新答案状态，不刷新答案内容
         */
        private refreshAnswerList(): void
        {
            let gridInfo = RiskDataMgr.gridDataList[this.UIOpenData.customObject - 1];
            let cfgInfo = cfg.RiskDialogCfgData.getInfo(gridInfo.param);
            let answers = cfgInfo ? [cfgInfo.option1, cfgInfo.option2, cfgInfo.option3] : [];
            this.UIPanel.listAnswer.onRefresh(answers.length, this, (view: RiskEventDialogAnswerView, index: number) =>
            {
                view.setAnswerDes(answers[index]);
                view.setResult(this._curSelectAnswer >= 0, this._curSelectAnswer == index, this._curSelectAnswer == index);
                view.onClick(this, () =>
                {
                    if (this._curSelectAnswer >= 0) return; //当前已选择了答案，正在等待中、
                    //点击答案
                    this._curSelectAnswer = index;
                    RiskSend.collectGrid(this.UIOpenData.customObject, index + 1, 0);
                    //展示答案
                    this.showResult();
                })
            })
        }

        /** 显示答案 */
        private showResult(): void
        {
            let gridInfo = RiskDataMgr.gridDataList[this.UIOpenData.customObject - 1];
            let id: number = gridInfo.param;
            let cfgInfo = cfg.RiskDialogCfgData.getInfo(id);
            let resultContent = cfgInfo ? [cfgInfo.option1Des, cfgInfo.option2Des, cfgInfo.option3Des][this._curSelectAnswer] : "";
            TipsUtils.showTipsByLanId(resultContent);

            this.refreshAnswerList();
            //延时
            Laya.timer.once(2000, this, this.closeUI);
        }


    }
}