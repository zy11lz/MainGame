module Pro
{

    /**
    * 冠军赛竞猜小弹窗
    * @author jason.xu
    */
    export class ChampGuessPanel extends ProUI.Champion.ChampionGuessPanelUI
    {
        /** 赔率 */
        private _losePercent = 1;
        //是否压左边
        private _isLeft: boolean;

        constructor()
        {
            super();
            this.init();
            this.addEvent();
        }

        private init()
        {

        }

        public show(): void
        {
            LayerManager.Inst.topUILayer.addChild(this);
            PopUpManager.popUpUIAction(this, 0);
        }

        public closeUI(): void
        {
            this.removeEvent();
            PopUpManager.removeUIAction(this, 0, true, true);
        }

        private addEvent(): void
        {
            this.btnClose.onClick(this, this.closeUI);
            this.btnReturn.onClick(this, this.closeUI);
            this.btnConfirm.onClick(this, this.onClickConfirm);
            this.scrollBar.setChangeListener(this, this.onChangeScroll);

            //竞猜下注同步返回	PBG2CChampionSynGuessAck
            EventMgr.on(CmdEvent.Champion_SysGuessAck, this, this.onSysGuessAck);
            // EventMgr.on(CmdEvent.Champion_SysGuessAck, this, this.close)  //竞猜成功即退出界面
        }

        private removeEvent(): void
        {
            //竞猜下注同步返回	PBG2CChampionSynGuessAck
            EventMgr.off(CmdEvent.Champion_SysGuessAck, this, this.onSysGuessAck);
            // EventMgr.off(CmdEvent.Champion_SysGuessAck, this, this.close)  //竞猜成功即退出界面
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
            this.setLosePercent(this._isLeft ? value.leftodds / 100 : value.rightodds / 100);
        }

        /** 确定下注 */
        private onClickConfirm(): void
        {
            let value = this.scrollBar.value;
            if (value <= 0)
            {
                TipsUtils.showTipsByLanId("tips_msg13");
                return;
            }
            ChampionSend.guessAsk(this._isLeft, value);
            this.closeUI();
        }

        /**滑动回调 */
        private onChangeScroll(value: number)
        {
            this.txtInputCount.text = value + "";
            this.txtGetCount.text = Math.floor(value * this._losePercent) + "";
        }

        //设置竞猜的数据
        public setGuessData(nickname: string, isLeft: boolean, losePercent: number)
        {
            this._isLeft = isLeft;
            this.txtNickname.text = nickname;

            let ownCount = ChampionDataMgr.guessCoin;
            this.scrollBar.max = ownCount;
            this.scrollBar.value = ownCount;
            this.txtCanCount.text = ownCount + "";

            this.setLosePercent(losePercent);
        }

        /** 设置赔率 */
        private setLosePercent(value: number): void
        {
            this._losePercent = value;
            this.txtGetCount.text = Math.floor(this.scrollBar.value * this._losePercent) + "";
        }

    }
}