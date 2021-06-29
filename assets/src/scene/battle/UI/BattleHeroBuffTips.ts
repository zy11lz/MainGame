module Pro
{
    /**
    * 战斗中英雄buff展示tips
    * @author jason.xu
    */
    export class BattleHeroBuffTips extends ProUI.Scene.Battle.Harm.HeroBuffTipsUI
    {

        private static _view: BattleHeroBuffTips;
        public static show(petDisplay: Pb_God.PBPetDisplay, buffAry: { buffId: number, count: number, continueRound: number }[]): void
        {
            var view = new BattleHeroBuffTips();
            view.show();
            view.setData(petDisplay, buffAry);
            this._view = view;
        }

        public static closeTip(): void
        {
            if (this._view)
            {
                PopUpManager.removeUIAction(this._view, 0, true, true);
                this._view = null;
            }

        }

        constructor()
        {
            super();
        }

        public setData(petDisplay: Pb_God.PBPetDisplay, buffAry: { buffId: number, count: number, continueRound: number }[]): void
        {
            this.txtPetName.text = cfg.PetSkinCfgData.getFileNameById(petDisplay.useskinid);;
            this.txtPetLv.x = this.txtPetName.x + this.txtPetName.width + 15;
            this.txtPetLv.text = Global.getLangStr("attr_lv1", petDisplay.level);

            //buff列表
            this.listView.onRefresh(buffAry.length, this, (itemUI: ProUI.Scene.Battle.Harm.HeroBuffTipsItemUI, index: number) =>
            {
                let buffData = buffAry[index];
                Global.setResIconWithItemID(itemUI.imgIcon, CfgID.ResType.Buff, buffData.buffId);
                itemUI.txtDesc.text = cfg.BuffNewBuffCfgData.getDescByID(buffData.buffId);
                //文字太多时，往上提一点显示
                if (itemUI.txtDesc.textField.lines.length >= 4)
                {
                    itemUI.txtDesc.y = 46;
                }
                else
                {
                    itemUI.txtDesc.y = 62;
                }
                let strName = cfg.BuffNewBuffCfgData.getBuffNameByID(buffData.buffId);
                if (buffData.count > 1)
                {
                    strName += "*" + buffData.count;
                }
                itemUI.txtName.text = strName;
                if (buffData.continueRound > 0 && buffData.continueRound < 20)
                {
                    itemUI.txtTimeOver.text = Global.getLangStr("bat_msg22", buffData.continueRound);
                }
                else
                {
                    itemUI.txtTimeOver.text = "";
                }
            })
            this.bg.height = this.listView.getCellTrueHeight() + 88;
        }

        public show(): void
        {
            LayerManager.Inst.topUILayer.addChild(this);
            //背景添加关闭触发
            let tempCoverSp = PopUpManager.popUpUIAction(this, 0);
            if (tempCoverSp)
            {
                tempCoverSp.on(Laya.Event.CLICK, this, this.closeUI);
            }
        }

        public closeUI(): void
        {
            BattleHeroBuffTips.closeTip();
        }
    }
}