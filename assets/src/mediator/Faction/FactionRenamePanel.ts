module Pro
{

    /**
    *
    * 公会改名界面
    *
    * @author jason.xu
    *
    */
    export class FactionRenamePanel extends ProUI.Faction.FactionRenameUI
    {

        constructor()
        {
            super();
            this.init();
            this.addEvent();
        }

        private init()
        {
            this.inputName.prompt = Global.getLangStr("faction_inputPrompt");
            if (FactionDataMgr.factionDisplay != null)
            { this.inputName.text = FactionDataMgr.factionDisplay.base.name; }
        }

        public show(): void
        {
            LayerManager.Inst.topUILayer.addChild(this);
            let tempCoverSp = PopUpManager.popUpUIAction(this, 0);
            if (tempCoverSp)
            {
                tempCoverSp.on(Laya.Event.CLICK, this, this.closeUI);
            }
            let need = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Faction, Pb_God._emConstant_Faction.C_Faction_RenameNeedDiamond);
            let owen = Global.getItemNum(Pb_God._emExpendType.ExpendType_Diamond);
            this.txtNeedDiamond.text = owen + "/" + need;
        }

        public closeUI(): void
        {
            PopUpManager.removeUIAction(this, 0, true, true);
        }

        private addEvent(): void
        {
            this.btnClose.onClick(this, this.closeUI);
            this.btnOk.onClick(this, this.onClickOk);
        }

        private onClickOk(): void
        {
            let factionName: string = this.inputName.text;
            factionName = factionName.replace(/\s*/g, ""); //去掉空白字符
            if (factionName.length < 2)
            {
                TipsUtils.showTipsByLanId("tips_msg18");
                return;
            }
            //脏字符检测
            if (FilterHelper.Inst.containStr(factionName))
            {
                TipsUtils.showTipsByLanId("tips_msg15");
                return;
            }
            //判断时间
            let leftTime = FactionDataMgr.nextrenametime - TimeController.currTimer / 1000;
            if (leftTime > 0)
            {
                let time = Global.getTimeLengthString(leftTime);
                TipsUtils.showTipsByLanId("common_OpOften", time);
                return;
            }

            //钻石是否足够
            let need = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Faction, Pb_God._emConstant_Faction.C_Faction_RenameNeedDiamond);
            if (!Global.isFullRes(Pb_God._emExpendType.ExpendType_Diamond, need, true))
            { return; }

            this.closeUI();
            FactionSend.rename(factionName);
        }

    }
}