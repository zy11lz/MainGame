module Pro
{

    /**
    * 神界探险小弹窗： 使用生命药水
    * @author jason.xu
    */
    export class RiskDrugHpPanel extends ProUI.Risk.RiskDrugHpViewUI
    {

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
            let darkSprite = PopUpManager.popUpUIAction(this, 0, 1) as component.UIButton;
            darkSprite.onClick(this, this.closeUI);

            this.refreshView();
        }

        public closeUI(): void
        {
            PopUpManager.removeUIAction(this, 0, true, true);
        }

        private addEvent(): void
        {
            this.btnCancel.onClick(this, this.closeUI);
            this.btnConfirm.onClick(this, this.onClickConfirm);
            EventMgr.on(EventNotify.Risk_Hero_Change, this, this.onChangeOpHeroIndex);
        }

        private removeEvent(): void
        {
            EventMgr.off(EventNotify.Risk_Hero_Change, this, this.onChangeOpHeroIndex);
        }

        private refreshView(): void
        {
            this.listHeros.refreshView();
            let maxCount = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Risk, Pb_God._emConstant_Risk.C_Risk_MaxUseHpDrup);
            let leftCount = maxCount - RiskDataMgr.data.usehpdrupcount; //剩余使用次数
            let drugCount = RiskDataMgr.data.hpdrupcount;  //剩余药剂数量
            this.txtLeftCount.text = Global.getLangStr("risk_msg19", leftCount);
            this.txtItemLeftCount.text = Global.getLangStr("risk_msg20", drugCount);
        }

        private onChangeOpHeroIndex(index: number): void
        {
            this.listHeros.refreshHeroList();
        }
        /** 点击确定 */
        private onClickConfirm(): void
        {
            if (RiskDataMgr.data.hpdrupcount <= 0)
            {
                TipsUtils.showTipsByLanId("risk_no_drup");  //暂无该祝福，继续冒险即可发现噢~
                return;
            }
            let maxCount = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Risk, Pb_God._emConstant_Risk.C_Risk_MaxUseHpDrup);
            let leftCount = maxCount - RiskDataMgr.data.usehpdrupcount; //剩余使用次数
            if (leftCount <= 0)
            {
                TipsUtils.showTipsByLanId("risk_use_drup_full");  //该祝福已达到本轮最大使用上限
                return;
            }
            //拿到当前选中的英雄
            let hero = RiskDataMgr.getHeroByIndex(RiskDataMgr.getOperaHeroIndex());
            if (!hero)
            {
                TipsUtils.showTipsByLanId("risk_msg2");
                return;
            }
            //英雄生命已满时，不用提示
            if ((hero.curhp as Long).toNumber() > (hero.maxhp as Long).toNumber() - 1)
            {
                TipsUtils.showTipsByLanId("risk_msg3");
                return;
            }
            RiskSend.useHpDrug(hero.petdisplay.sn);
            this.closeUI();
        }

        public destroy(): void
        {
            this.removeEvent();
            super.destroy();
        }

    }
}