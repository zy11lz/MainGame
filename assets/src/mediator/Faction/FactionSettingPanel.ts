module Pro
{

    /**
    * 
    * 公会设置界面（修改入会条件）
    *
    * @author jason.xu
    * 
    */
    export class FactionSettingPanel extends ProUI.Faction.FactionSettingUI
    {

        /** 创建的公会是否需要验证(true表示需要验证) */
        private _isAutoVerify: boolean = true;
        /** 创建的公会需要的等级 */
        private _arrNeedLv: number[] = [1, 10, 20, 30, 40, 50, 60, 100];
        private _nNeedLvIndex: number = 0;

        constructor()
        {
            super();
            this.init();
            this.addEvent();
        }

        private init()
        {
            //先取反，再反回来，以便更新UI显示
            this._isAutoVerify = !FactionDataMgr.isAutoVerify;
            this.onClickCreateVerify();
            this.resetCreateNeedLvIndex(this._arrNeedLv.indexOf(FactionDataMgr.joinNeedLevel));

        }

        public show(): void
        {
            LayerManager.Inst.topUILayer.addChild(this);
            let tempCoverSp = PopUpManager.popUpUIAction(this, 0);
            if (tempCoverSp)
            {
                tempCoverSp.on(Laya.Event.CLICK, this, this.closeUI);
            }
        }

        public closeUI(): void
        {
            PopUpManager.removeUIAction(this, 0, true, true);
        }

        private addEvent(): void
        {
            this.btnClose.onClick(this, this.closeUI);
            this.btnOk.onClick(this, this.onClickOk);

            this.btnVerifyLeft.onClick(this, this.onClickCreateVerify);
            this.btnVerifyRight.onClick(this, this.onClickCreateVerify);
            this.btnNeedLvLeft.onClick(this, () => { this.resetCreateNeedLvIndex(this._nNeedLvIndex - 1); });
            this.btnNeedLvRight.onClick(this, () => { this.resetCreateNeedLvIndex(this._nNeedLvIndex + 1); });
        }

        /** 点击切换验证设置 */
        private onClickCreateVerify(): void
        {
            this._isAutoVerify = !this._isAutoVerify;
            this.btnVerifyLeft.disabled = !this._isAutoVerify;
            this.btnVerifyRight.disabled = this._isAutoVerify;
            this.txtCreateVerify.text = !this._isAutoVerify ? Global.getLangStr("faction_msg18") : Global.getLangStr("faction_msg19");   //不需要验证 : 需要验证;
        }

        /**  切换入会要求等级*/
        private resetCreateNeedLvIndex(value: number): void
        {
            if (value < 0) value = 0;
            let maxIndex = this._arrNeedLv.length - 1;
            if (value > maxIndex) value = maxIndex;
            this._nNeedLvIndex = value;
            this.btnNeedLvLeft.disabled = value <= 0;
            this.btnNeedLvRight.disabled = value >= maxIndex;
            this.txtCreateNeedLv.text = this._arrNeedLv[value] + Global.getLangStr("common_level");
        }

        /** 点击确定 */
        private onClickOk(): void
        {
            this.closeUI();
            let needLv = this._arrNeedLv[this._nNeedLvIndex];
            if (this._isAutoVerify == FactionDataMgr.isAutoVerify && needLv == FactionDataMgr.joinNeedLevel) return;
            FactionSend.setCondition(this._isAutoVerify ? 1 : 0, needLv)
        }

    }
}