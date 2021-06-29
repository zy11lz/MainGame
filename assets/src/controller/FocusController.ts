
module Pro
{
    /**
     *  焦点管理
     *
     */
    export class FocusController
    {

        public static _ins: FocusController;

        public static get ins(): FocusController
        {
            this.init();
            return this._ins;
        }

        static init()
        {
            if (this._ins == null)
            {
                this._ins = new FocusController();
            }
        }

        //记得失去焦点的时间
        private lostStageTime = 0;


        constructor()
        {
            // 侦听焦点
            Laya.stage.on(Laya.Event.BLUR, this, this.onBlurCalled);
            Laya.stage.on(Laya.Event.FOCUS, this, this.onFocusCalled);

            // 场景切换监听
            EventMgr.on(EventNotify.StageFocus, this, this.onStageFocus);
            EventMgr.on(EventNotify.StageBlur, this, this.onStageBlur);
        }

        //------------------------------------舞台焦点切换----------------------------
        private onBlurCalled(e: any)
        {
            EventMgr.trigger(EventNotify.StageBlur);
        }
        private onFocusCalled(e: any)
        {
            EventMgr.trigger(EventNotify.StageFocus);
        }


        // 舞台获得焦点时调度
        private onStageFocus(): void
        {
            if (!GlobalData.isRelease)
            {
                return;
            }

            //logI("舞台获取焦点");
            if (conch)
            {
                Laya.timer.scale = 1;
            }

            //离开时间长一点就掉线
            if (this.lostStageTime != 0 && Laya.timer.currTimer - this.lostStageTime >= 1800 * 1000)
            {
                if (GlobalData.MInScene == GlobalData.StandScene.Main)
                {
                    NetMonitorMgr.Inst.closeServerStatue(true);  //断开重新连接
                }
            }
        }

        // 舞台获得失去时调度
        private onStageBlur(): void
        {
            if (!GlobalData.isRelease)
            {
                return;
            }
            //logI("舞台失去焦点");
            if (conch)
            {
                Laya.timer.scale = 0.1;
            }

            //记录离开时间
            this.lostStageTime = Laya.timer.currTimer;
        }

    }
}