module Pro
{
    /**
    * 公会成员操作界面 ， 公会管理员权限
    * @author jason.xu
    */
    export class FactionOpMemberPanel extends ProUI.Faction.FactionOpMemberUI
    {

        private _data: Pb_God.PBFactionMember;

        private _impeach: number//弹劾消耗

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
            PopUpManager.removeUIAction(this, 0, true, true);
        }

        private addEvent(): void
        {
            this.btnClose.onClick(this, this.closeUI);
            this.btnAppoint.onClick(this, this.onClickAppoint);
            this.btnDemotion.onClick(this, this.onClickDemotion);
            this.btnRemove.onClick(this, this.onClickRemove);
            this.btnTransfer.onClick(this, this.onClickTransfer);
            this.btnImpeachmentPresident.onClick(this, this.onClickImpeachmentPresident);
        }

        /** 任命副会长 */
        private onClickAppoint(): void
        {
            FactionSend.changeJob(this._data.displayer.playerid, Pb_God._emFactionJob.FactionJob_Deputy);
            this.closeUI();
        }
        /** 罢免副会长 */
        private onClickDemotion(): void
        {
            FactionSend.changeJob(this._data.displayer.playerid, Pb_God._emFactionJob.FactionJob_People);
            this.closeUI();
        }
        /** 转让会长 */
        private onClickTransfer(): void
        {
            let alertDes = Global.getLangStr("faction_msg12", this._data.displayer.playername);
            AlertShow.showConfirmAlert(alertDes, this, () =>
            {
                FactionSend.changeJob(this._data.displayer.playerid, Pb_God._emFactionJob.FactionJob_Leader);
                this.closeUI();
            });
        }
        /** T出公会 */
        private onClickRemove(): void
        {
            let alertDes = Global.getLangStr("faction_msg13", this._data.displayer.playername);
            AlertShow.showConfirmAlert(alertDes, this, () =>
            {
                FactionSend.kick(this._data.displayer.playerid);
                this.closeUI();
            });
        }

        /** 弹劾会长 */
        private onClickImpeachmentPresident(): void
        {
            if (Global.isFullRes(2, this._impeach, true))
            {
                FactionSend.impeach();
            }
            this.closeUI();
            return;
        }

        public setData(data: Pb_God.PBFactionMember, impeach: cfg.FactionImpeachTimeCfgInfo): void
        {
            this._data = data;
            this._impeach = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Faction, Pb_God._emConstant_Faction.C_Faction_ImpeachCustom);
            this.txtConten.showText = !impeach ? Global.getLangStr("faction_msg14", data.displayer.playername) : Global.getLangStr("impeachmentTxt");
            //如果自己是会长
            if (FactionDataMgr.isChairman())
            {
                this.btnTransfer.visible = true;
                this.btnRemove.visible = true;
                this.btnImpeachmentPresident.visible = false;
                this.btnAppoint.visible = data.job == Pb_God._emFactionJob.FactionJob_People;
                this.btnDemotion.visible = data.job == Pb_God._emFactionJob.FactionJob_Deputy;
                this.btnRemove.y = 748;
            } else if (FactionDataMgr.isVicePresident())
            {  //副会长
                this.btnTransfer.visible = false;
                this.btnAppoint.visible = false;
                this.btnDemotion.visible = false;
                this.btnRemove.visible = true;
                if (impeach)
                {
                    this.btnRemove.visible = false;
                    this.consume.text = this._impeach + ""
                    this.btnImpeachmentPresident.visible = true;
                }
                else
                {
                    this.btnRemove.visible = true;
                    this.btnImpeachmentPresident.visible = false;
                }
                this.btnRemove.y = this.btnDemotion.y;
            } else if (this._impeach)
            {
                this.btnTransfer.visible = false;
                this.btnAppoint.visible = false;
                this.btnDemotion.visible = false;
                this.btnRemove.visible = false;
                this.consume.text = this._impeach + ""
                this.btnImpeachmentPresident.visible = true;
            }
        }

    }
}