module Pro
{
	/**
     * 挂机界面上，首充提示
     */
    export class FirstPayTips extends Laya.Box
    {
        constructor()
        {
            super();
            this.on(Laya.Event.REMOVED, this, this.onUnDisplay);
        }

        //界面被消毁时，要释放一下。
        private onUnDisplay(e): void
        {
            this.cleanUp();
        }

        /** 这个视图，只要是极少的情况下才会显示，所以 
         * 将视图分离开，保证资源在不需要用到时候不加载。 */
        private _view: ProUI.Scene.City.Utils.FirstPayTipsUI;

        //-------------------------------------Event Fun-----------------------------
        /** 初始化 */
        private initView()
        {
            if (this._view) return;
            this._view = new ProUI.Scene.City.Utils.FirstPayTipsUI();
            this.addChild(this._view);
            this._view.btnFirstPay.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FirstPay));
            });
        }

        private _targetTime = 0;
        private MaxTime = 30 * 60;

        public refreshUI(): void
        {
            this.cleanUp();
            //功能还没开的时候，先隐藏显示，同时监听功能的开放等着显示
            if (!PlayerDataMgr.checkSystemSwitchOpen(emSystemSwitchType.FirstPay))
            {
                this.show(false);
                EventMgr.on(EventNotify.System_Switch_Open_Update, this, this.refreshSystemOpenState);
                return;
            }

            let systemOpenTime = PlayerDataMgr.getSystemOpenTimer(emSystemSwitchType.FirstPay);
            this._targetTime = systemOpenTime + this.MaxTime;
            if (this._targetTime <= TimeController.currTimer / 1000)
            { //只有在固定时间内才显示
                this.show(false);
                return;
            }

            Laya.timer.loop(500, this, this.onTimer);
            this.onTimer();
        }

        private refreshSystemOpenState(systemId: number): void
        {
            if (systemId == emSystemSwitchType.FirstPay)
            {
                this.refreshUI();
            }
        }

        private cleanUp(): void
        {
            if (this._view) this._view.destroy(true);
            this._view = null;
            this.visible = false;
            Laya.timer.clear(this, this.onTimer);
            EventMgr.off(EventNotify.System_Switch_Open_Update, this, this.refreshSystemOpenState);
        }

        private show(isShow: boolean): void
        {
            if (this.visible == isShow) return;
            this.visible = isShow;
            if (isShow) this.initView();
            else this.cleanUp();
            this.showEffect(isShow);
        }

        private showEffect(isShow: boolean): void
        {

        }

        private onTimer(): void
        {
            let time = this._targetTime - TimeController.currTimer / 1000;
            if (time < 0)
            { //只有在固定时间内才显示
                this.show(false);
                return;
            }
            let actData = ActivityDataMgr.getActivityDataByType(Pb_God._emActivityType.Activity_FirstCharge);
            if (!actData)
            {
                this.show(false); //活动没有开
                return;
            }
            let amount = cfg.ActivityFirstChargeCfgData.getFirstInfo().amount;
            if (ActivityDataMgr.getActivity_DataValue(actData.id, Pb_God._emActivityDataKey.Activity_Key_ChargeAmount) >= amount)
            {
                this.show(false); //已经激活了
                return;
            }
            this.show(true);
            //不在显示小时，如果那天要显示小时需要修改一下ui_FirstPay_msg5
            //  let hour = Math.floor(time / 3600);   // 时
            let minute = Math.floor((time % 3600) / 60);   // 分
            let second = Math.floor(time % 60); // 秒
            this._view.htmlTimer.showText = Global.getLangStr("ui_FirstPay_msg5",
                Global.ToFitZero(minute, 2), Global.ToFitZero(second, 2));
        }
    }
}