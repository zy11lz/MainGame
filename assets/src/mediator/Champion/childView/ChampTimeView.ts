module Pro
{

    /**
    * 冠军赛界面-顶部时间倒计时视图
    * @author jason.xu
    */
    export class ChampTimeView extends ProUI.Champion.ChildView.TimeViewUI
    {

        private _timePerfix: string = "";
        /** 毫秒 */
        private _targetTime = 0;

        constructor()
        {
            super();
            this.init();
            this.addUIEvent();
        }
        private init()
        {

        }

        private addUIEvent(): void
        {
        }

        private addDataEvent(): void
        {

        }

        private removeDataEvent(): void
        {

        }

        public hide(): void
        {
            this.visible = false;
            this.removeDataEvent();
        }
        public show(): void
        {
            this.visible = true;
            this.addDataEvent();
            this.refreshView();
        }

        public refreshView(): void
        {
            this.flag.visible = !ChampionDataMgr.isOpening;
            this.boxLb.visible = ChampionDataMgr.isOpening;
            //根据不同的状态，显示不同的倒计时
            if (ChampionDataMgr.isOpening)
            {
                this.txtTitle.text = cfg.ChampionRoundCfgData.getNameByRoundID(ChampionDataMgr.round);
                this.txtTitle1.text = this.txtTitle.text;
                this._targetTime = ChampionDataMgr.stateOverTime * 1000;
                let state = ChampionDataMgr.state;
                if (state == Pb_God._emChampionState._emChampionState_Guess)
                    this._timePerfix = Global.getLangStr("champ_msg14");//竞猜阶段";
                else if (state == Pb_God._emChampionState._emChampionState_Fight)
                    this._timePerfix = Global.getLangStr("champ_msg15");// 比赛阶段";
                else if (state == Pb_God._emChampionState._emChampionState_Ready)
                    this._timePerfix = Global.getLangStr("champ_msg16");// 准备阶段";
            } else if (ChampionDataMgr.isMatching)
            { //匹配中
                let nextTime = ChampionDataMgr.getNextOpenTime();
                this.txtTitle.text = Global.getLangStr("champ_msg12") + Global.getFormatTimeString(nextTime, 10);
                this.txtTitle1.text = this.txtTitle.text;
                this._targetTime = nextTime;
                this._timePerfix = Global.getLangStr("champ_msg13");// 距离开始";
            } else
            {
                let nextTime = ChampionDataMgr.nextOpenTime * 1000;
                this.txtTitle.text = Global.getLangStr("champ_msg12") + Global.getFormatTimeString(nextTime, 10);
                this.txtTitle1.text = this.txtTitle.text;
                this._targetTime = nextTime;
                this._timePerfix = Global.getLangStr("champ_msg13");// 距离开始";
            }
            logI("targetTime:", this._timePerfix, Global.getFormatTimeString(this._targetTime, 4));
            Laya.timer.loop(500, this, this.onTimer);
            this.onTimer();
        }

        private onTimer(): void
        {
            let t = this._targetTime - Pro.TimeController.currTimer;
            this.txtTimer.text = this._timePerfix + "：" + Global.GetRemindTime(t / 1000, 7);
            this.txtTimer1.text = this.txtTimer.text;
        }

        public cleanUp(): void
        {
            this.removeDataEvent();
            Laya.timer.clear(this, this.onTimer);
        }

    }
}