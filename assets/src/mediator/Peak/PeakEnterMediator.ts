module Pro
{
    /**
     * 界面说明：  巅峰挑战入口界面（宣传页面）
    * @author jason.xu
    */
    export class PeakEnterMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Peak.PeakEnterUI;

        /** 倒计时结束时间 */
        private _timerTarget = 0;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas('peak')]
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Peak.PeakEnterUI, 1, BaseAddLayer.CenterUI,true);
        }

        public closeUI(): void
        {
            super.closeUI();
            Laya.timer.clear(this, this.onTimer);
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
            let openDay = TrainDataMgr.getPeakOpenDay();
            if (openDay == 0)
            {
                //没开启时，定时器为当天24点
                this._timerTarget = Global.getZeroTimeNumber(TimeController.currTimer + 24 * 3600 * 1000) / 1000;
                this.UIPanel.htmlTimer.visible = true;
                this.UIPanel.btnEnter.visible = false;
                Laya.timer.loop(1000, this, this.onTimer);
                this.onTimer();
            } else
            {
                //已开启时，不显示定时器
                this.UIPanel.htmlTimer.visible = false;
                this.UIPanel.btnEnter.visible = true;
            }

            //初始化奖励预览列表
            let trainConstCfgInfo = cfg.TrainConstantsCfgData.getFirstInfo();
            let addItems = cfg.AddItemInfo.getAddItemAttr(trainConstCfgInfo, trainConstCfgInfo.peakPrizeReview, "$peakPrizeReviewArr");
            this.UIPanel.itemView.onRefresh(addItems.length, this, (itemUI: NorItemUI, additemsIndex: number) =>
            {
                itemUI.setItemInfo(addItems[additemsIndex]);
            });

            this.refreshUI();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnEnter.onClick(this, this.onClickEnter);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        private onClickEnter(): void
        {
            if (TrainDataMgr.getPeakOpenDay() < 0)
            {
                TipsUtils.showTipsByLanId("activity_msg23");
                return;
            }
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Peak), BaseBackUIType.CloseBackUI);
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            this.UIPanel.reddotEnter.visible = TrainDataMgr.reddotModelPeak.isRedDot;
        }

        private onTimer(): void
        {
            let leftTimer = this._timerTarget - TimeController.currTimer / 1000;
            if (leftTimer < 0)
            {
                this.UIPanel.htmlTimer.visible = false;
                this.UIPanel.btnEnter.visible = true;
                Laya.timer.clear(this, this.onTimer);
                return;
            }
            this.UIPanel.htmlTimer.showText = Global.getLangStr("peak_msg1", Global.GetRemindTime(leftTimer, 9));
        }

    }
}