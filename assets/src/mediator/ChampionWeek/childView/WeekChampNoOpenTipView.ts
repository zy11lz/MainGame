module Pro
{

    /**
    * 
    * 冠军赛界面-未启时提示视图
    *
    * @author jason.xu
    * 
    */
    export class WeekChampNoOpenTipView extends ProUI.WeekChampion.ChildView.NoOpenTipViewUI
    {

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

        private _targetTimer = 0;
        private refreshView(): void
        {
            Laya.timer.clear(this, this.onTimer);
            //当前是还未开启还是未入局
            let isOpen = WeekChampionDataMgr.isOpening;
            if (!isOpen)
            {
                if (WeekChampionDataMgr.state == Pb_God._emChampionState._emChampionState_End)
                {  //已结束
                    this.txtNoOpenContent.text = Global.getLangStr("week_champ_msg18");
                } else
                {
                    this.txtNoOpenContent.text = Global.getLangStr("week_champ_msg8");
                }
                this._targetTimer = WeekChampionDataMgr.nextOpenTime;
                Laya.timer.loop(500, this, this.onTimer);
                this.onTimer();
            } else if (WeekChampionDataMgr.isMatching)
            { //匹配中                
                this.txtNoOpenContent.text = Global.getLangStr("week_champ_msg8");
                this._targetTimer = WeekChampionDataMgr.getNextOpenTime() / 1000;
                Laya.timer.loop(500, this, this.onTimer);
                this.onTimer();
            } else
            {
                this.txtNoOpenContent.text = Global.getLangStr("week_champ_msg9");
                this.htmlOpenTimer.showText = Global.getLangStr("week_champ_msg2");
            }
        }

        private onTimer(): void
        {
            let strTime = Global.GetRemindTime(this._targetTimer - TimeController.currTimer / 1000, 7);
            let needRank = cfg.WeekChampionConstInfoCfgData.getFirstInfo().needLadderRank;
            this.htmlOpenTimer.showText = Global.getLangStr("week_champ_msg11", strTime, needRank); //开启倒计时:&#160;<font color='#17f000'>{0}</font><br>排位赛前<font color='#17f000'>{1}名</font>的玩家将自动参与
        }

        public cleanUp(): void
        {
            Laya.timer.clear(this, this.onTimer);
            this.removeDataEvent();

        }
    }
}