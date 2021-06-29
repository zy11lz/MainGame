module Pro
{

    /**
    * 公会发布招募小界面
    * @author jason.xu
    */
    export class FactionIssueRecruitPanel extends ProUI.Faction.FactionIssueRecruitUI
    {

        constructor()
        {
            super();
            this.init();
            this.addEvent();
        }

        private init()
        {
            let issueRecruitCount = FactionDataMgr.issueRecruitCount;
            let maxCount = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Faction, Pb_God._emConstant_Faction.C_Faction_RecruitDayCount);
            this.txtLeftCount.text = Global.getLangStr("common_leftcount2") + (maxCount - issueRecruitCount);
            //判断是否免费
            let isFree: boolean = issueRecruitCount == 0;
            this.viewFree.visible = isFree;
            this.viewFee.visible = !isFree;
            if (!isFree)
            {
                let needCount = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Faction, Pb_God._emConstant_Faction.C_Faction_RecruitNeedDiamond);
                this.txtNeedCount.text = needCount + "";
                this.txtNeedCount2.text = Global.getItemNum(CfgID.ItemID.Diamond) + " / " + needCount;
                this.hboxDes.refresh();
            }
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
            this.btnCancel.onClick(this, this.closeUI);
            this.btnConfirm.onClick(this, this.onClickConfirm);
        }

        private onClickConfirm(): void
        {
            //判断次数
            if (FactionDataMgr.issueRecruitCount >= cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Faction, Pb_God._emConstant_Faction.C_Faction_RecruitDayCount))
            {
                TipsUtils.showTipsByLanId("tips_msg20");
                return;
            }
            //判断时间
            let leftTime = FactionDataMgr.nextrecruittime - TimeController.currTimer / 1000;
            if (leftTime > 0)
            {
                let time = Global.getTimeLengthString(leftTime);
                TipsUtils.showTipsByLanId("common_OpOften", time);
                return;
            }
            //判断钻石是否足够
            if (FactionDataMgr.issueRecruitCount > 0)
            { //除掉第1次免费
                let needDiamond = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Faction, Pb_God._emConstant_Faction.C_Faction_RecruitNeedDiamond);
                if (!Global.isFullRes(Pb_God._emExpendType.ExpendType_Diamond, needDiamond, true))
                    return;
            }

            this.closeUI();

            FactionSend.recruit();
        }

    }
}