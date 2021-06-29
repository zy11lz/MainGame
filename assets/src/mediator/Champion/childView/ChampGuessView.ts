module Pro
{

    /**
    * 
    * 冠军赛界面-战斗中数据视图（包括赛事进程，双方阵营等）
    *
    * @author jason.xu
    * 
    */
    export class ChampGuessView extends ProUI.Champion.ChildView.GuessViewUI
    {
        /** 赔率百分百进度条显示的赔率值范围 */
        private _percentLimit = [1.5, 2.0];
        /** 左边的赔率 */
        private _leftPercent = 0;
        private _leftNickname = "";
        private _leftPlayerId = 0;
        /** 右边的赔率 */
        private _rightPercent = 0;
        private _rightNickname = "";
        /** 当前是否已竞猜 */
        private _isGuess = true;

        constructor()
        {
            super();
            this.init();
            this.addUIEvent();
        }

        private init()
        {
            this._percentLimit[0] = cfg.ChampionConstInfoCfgData.getFirstInfo().minOdds / 100;
            this._percentLimit[1] = cfg.ChampionConstInfoCfgData.getFirstInfo().maxOdds / 100;
        }

        private addUIEvent(): void
        {
            this.btnLeft.onClick(this, this.onClickLeft);
            this.btnRight.onClick(this, this.onClickRight);
            this.btnMyGuess.onClick(this, this.onClickMyGuess);
        }

        private addDataEvent(): void
        {
            // //查询竞猜返回		PBG2CChampionQueryGuessAck
            // EventMgr.on(CmdEvent.Champion_QueryGuessAck, this, this.onQueryGuessAck);
            //竞猜下注同步返回	PBG2CChampionSynGuessAck
            EventMgr.on(CmdEvent.Champion_SysGuessAck, this, this.onSysGuessAck);
            /** 竞猜币数量有变化 */
            EventMgr.on(EventNotify.Champion_GuessCoin_Change, this, this.onChangeGuessCoin);
        }

        private removeDataEvent(): void
        {
            // //查询竞猜返回		PBG2CChampionQueryGuessAck
            // EventMgr.off(CmdEvent.Champion_QueryGuessAck, this, this.onQueryGuessAck);
            //竞猜下注同步返回	PBG2CChampionSynGuessAck
            EventMgr.off(CmdEvent.Champion_SysGuessAck, this, this.onSysGuessAck);
            /** 竞猜币数量有变化 */
            EventMgr.off(EventNotify.Champion_GuessCoin_Change, this, this.onChangeGuessCoin);
        }

        private onClickLeft(): void
        {
            if (this._isGuess) return;
            this.showGuessPanel(this._leftNickname, true, this._leftPercent);
        }

        private onClickRight(): void
        {
            if (this._isGuess) return;
            this.showGuessPanel(this._rightNickname, false, this._rightPercent);
        }

        /** 打开竞猜界面 */
        private showGuessPanel(nickname: string, isLeft: boolean, losePercent: number): void
        {
            if (ChampionDataMgr.state != Pb_God._emChampionState._emChampionState_Guess)
            {
                TipsUtils.showTipsByLanId("champ_msg19");
                return;
            }
            let panel = new ChampGuessPanel();
            panel.setGuessData(nickname, isLeft, losePercent);
            panel.show();
        }

        /** 查看我的竞猜列表 */
        private onClickMyGuess(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ChampionMyGuess));
        }

        public hide(): void
        {
            this.visible = false;
            this._isReadyShow = false;
            Laya.timer.clear(this, this.onTimerQueryOdds);
            this.removeDataEvent();
        }
        private _isReadyShow = false;
        /** 界面show时只是标记一下当前可以显示，等收到数据后再正式显示出来 */
        public show(): void
        {
            this._isReadyShow = true;
        }

        private showAck(): void
        {
            this.visible = true;
            this.addDataEvent();
            this.refreshView();
        }

        public setGuessAck(value: Pb_God.PBG2CChampionQueryGuessAck): void
        {
            if (!this._isReadyShow) return;
            if (!value.battle) return;
            this.showAck();

            this.refreshLosePercent(value.leftodds / 100, value.rightodds / 100);
            this.txtLeftNickname.text = this._leftNickname = value.battle.leftbattle.playerdisplay.playername;
            this.txtRightNickname.text = this._rightNickname = value.battle.rightbattle.playerdisplay.playername;
            this._leftPlayerId = value.battle.leftbattle.playerdisplay.playerid;
        }

        private refreshView(): void
        {
            this.txtJettonCount.text = ChampionDataMgr.guessCoin + "";

            Laya.timer.loop(2000, this, this.onTimerQueryOdds);
            this.onTimerQueryOdds();

        }

        /** 定时查询下注信息 */
        private onTimerQueryOdds(): void
        {
            if (ChampionDataMgr.state == Pb_God._emChampionState._emChampionState_Guess)
                ChampionSend.queryOddsAsk();
        }


		/*****
		 *竞猜下注同步返回	PBG2CChampionSynGuessAck
		 * @param PBG2CChampionSynGuessAck
		 * 		leftodds			uint32	左边赔率 扩大一百倍
		 * 		rightodds			uint32	右边赔率 扩大一百倍
		 * 		guessplayerid			uint32	下注的目标ID
		 * 		guesscoin			uint32	剩余的竞猜币
		 */
        protected onSysGuessAck(value: Pb_God.PBG2CChampionSynGuessAck): void
        {
            this.refreshLosePercent(value.leftodds / 100, value.rightodds / 100);
            let targetState = 0;  //0-未竞猜  1-押左边  2-押右边
            if (value.guessplayerid > 0) targetState = value.guessplayerid == this._leftPlayerId ? 1 : 2;
            this.refreshGuessTarget(targetState);
        }

        private onChangeGuessCoin(value: number): void
        {
            this.txtJettonCount.text = ChampionDataMgr.guessCoin + "";
        }

        /** 刷新竞猜目标（0-未竞猜  1-押左边  2-押右边） */
        private refreshGuessTarget(target: number): void
        {
            this._isGuess = target != 0;
            this.txtBtnLabelLeft.text = target == 1 ? Global.getLangStr("champ_guess1") : Global.getLangStr("champ_guess2");
            this.txtBtnLabelRight.text = target == 2 ? Global.getLangStr("champ_guess1") : Global.getLangStr("champ_guess2");
        }

        /** 刷新赔率 */
        private refreshLosePercent(leftValue: number, rightValue: number): void
        {

            this._leftPercent = leftValue;
            this._rightPercent = rightValue;

            this.txtLeftPercent.text = Global.getLangStr("champ_guessPercent") + leftValue.toFixed(2);
            this.txtRightPercent.text = Global.getLangStr("champ_guessPercent") + rightValue.toFixed(2);
            //右边的进度条压住左边的即可
            this.imgRightProgress.mask.width = this.__getValidProgressValue(leftValue) * this.imgRightProgress.width;
        }

        /** 进度值有效性 */
        private __getValidProgressValue(losePercentValue: number): number
        {
            let progress = (losePercentValue - this._percentLimit[0]) / (this._percentLimit[1] - this._percentLimit[0]);
            if (progress < 0) return 0;
            if (progress > 1) return 1;
            return progress;
        }

        public cleanUp(): void
        {
            this._isReadyShow = false;
            Laya.timer.clear(this, this.onTimerQueryOdds);
            this.removeDataEvent();
        }
    }
}