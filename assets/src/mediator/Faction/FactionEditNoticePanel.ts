module Pro
{

    /**
    *
    * 公会修改公告界面。
    *
    * @author jason.xu
    *
    */
    export class FactionEditNoticePanel extends ProUI.Faction.FactionEditNoticeUI
    {

        constructor()
        {
            super();
            this.init();
            this.addEvent();
        }

        private init()
        {
            this.inputContent.prompt = Global.getLangStr("faction_inputPrompt2");
            if (FactionDataMgr.factionDisplay)
            {
                this.inputContent.text = FactionDataMgr.factionDisplay.base.declaration;
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
            this.btnClose.onClick(this, this.closeUI);
            this.btnOk.onClick(this, this.onClickOk);
        }

        private onClickOk(): void
        {
            let str = this.inputContent.text;
            str = str.replace(/\s*/g, ""); //去掉空白字符
            //脏字符检测
            if (FilterHelper.Inst.containStr(str, false))
            {
                TipsUtils.showTipsByLanId("tips_msg15");
                return;
            }
            FactionSend.edit(str);
            this.closeUI();
        }

    }
}