module Pro
{
    /**
    * 竞技场查看对手信息界面
    * @author jason.xu
    */
    export class ChallengeTargetInfoPanel extends ProUI.Challenge.ChallengeTargetInfoUI
    {

        private static _panel: any;
        public static show(data: Pb_God.PBChallengeObject): void
        {
            let panel: ChallengeTargetInfoPanel = this._panel;
            if (panel)
            {
                panel.setData(data);
            } else
            {
                this._panel = panel = new ChallengeTargetInfoPanel();
                panel.show(data);
            }
        }

        constructor()
        {
            super();
            this.addEvent();
        }


        public show($data: Pb_God.PBChallengeObject): void
        {
            this.setData($data);
            LayerManager.Inst.topUILayer.addChild(this);
            PopUpManager.popUpUIAction(this, 0);
        }

        public closeUI(): void
        {
            this.removeEvent();
            PopUpManager.removeUIAction(this, 0, true, true);
            this._data = null;
            ChallengeTargetInfoPanel._panel = null;
        }

        private addEvent(): void
        {
            this.btnAttack.onClick(this, this.onClickAttack);
            this.btnClose.onClick(this, this.closeUI);
        }
        private removeEvent(): void
        {
        }

        private onClickAttack(): void
        {
            let ticketId = cfg.ChallengeConstInfoCfgData.getFirstInfo().enterNeedItemID; //竞技币
            //没有次数
            if (!ChallengeDataMgr.hasFree() && !Global.isFullRes(ticketId, 1, true))
                return;
            //发起挑战
            BattleMgr.Inst.createNormalBat(Pb_God._emBattleType.BattleType_Challenge, this._data.id, this._data.param);
            this.closeUI();
        }

        private _data: Pb_God.PBChallengeObject;
        public setData($data: Pb_God.PBChallengeObject): void
        {
            this._data = $data;
            let isRobot = $data.param == 1;
            this.txtNickname.text = this._data.display.playername;
            if (this._data.param) //机器人
                this.txtFightValue.text = this._data.fightpower + "";
            else
                this.txtFightValue.text = this._data.defense.fightpower + "";
            this.viewPlayerIcon.setPlayerDisplayInfo(this._data.display, true, false);
            this.txtScore.text = this._data.score + "";
            this.listPetView.onRefresh(this._data.defense.battlepet.length, this, (norItem: NorItemUI, index: number) =>
            {
                norItem.setPetInfoExtend(this._data.defense.battlepet[index].pet.display, !isRobot, this._data.display);
            });
        }

    }
}