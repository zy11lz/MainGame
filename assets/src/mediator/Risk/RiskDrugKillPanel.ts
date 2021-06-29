module Pro
{

    /**
    * 神界探险小弹窗： 使用驱魂药水（直接击杀守卫）
    * @author jason.xu
    */
    export class RiskDrugKillPanel extends ProUI.Risk.RiskDrugKillViewUI
    {

        private _curIndex = -1;
        private _guardList: RiskGuardInfo[];

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
        }

        private removeEvent(): void
        {
        }

        private refreshView(): void
        {
            let maxCount = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Risk, Pb_God._emConstant_Risk.C_Risk_MaxUseKillDrup);
            let leftCount = maxCount - RiskDataMgr.data.usekilldrupcount; //剩余使用次数
            let drugCount = RiskDataMgr.data.killdrupcount;  //剩余药剂数量
            this.txtLeftCount.text = Global.getLangStr("risk_msg19", leftCount);
            this.txtItemLeftCount.text = Global.getLangStr("risk_msg21", drugCount);
            this.refreshTargetList();
        }

        /** 刷新目标英雄列表 */
        private refreshTargetList(): void
        {
            let list = RiskDataMgr.getActiveGuardList();
            this._guardList = list;
            this.listHeros.onRefresh(list.length, this, (btn: component.UIButton, index: number) =>
            {
                let data = list[index];
                let imgIcon = btn.getChildByName("icon") as Laya.Image;
                let frame = btn.getChildByName("frame") as component.UIFrameImage; //边框
                let select = btn.getChildByName("select") as Laya.Image;

                let monsterInfo = cfg.RiskMonsterNewCfgData.getMonterInfoWithID(data.monsterId);
                Global.setResIconWithItemID(imgIcon, CfgID.ResType.Pet, monsterInfo.skinId);
                frame.frame = data.guardIndex;
                select.visible = this._curIndex == index;

                btn.onClick(this, select.visible ? null : () =>
                {
                    this._curIndex = index;
                    this.refreshTargetList();
                })
            });
        }



        /** 点击确定 */
        private onClickConfirm(): void
        {
            if (RiskDataMgr.data.killdrupcount <= 0)
            {
                TipsUtils.showTipsByLanId("risk_no_drup");  //暂无该祝福，继续冒险即可发现噢~
                return;
            }
            let maxCount = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Risk, Pb_God._emConstant_Risk.C_Risk_MaxUseKillDrup);
            let leftCount = maxCount - RiskDataMgr.data.usekilldrupcount; //剩余使用次数
            if (leftCount <= 0)
            {
                TipsUtils.showTipsByLanId("risk_use_drup_full");  //该祝福已达到本轮最大使用上限
                return;
            }
            let guardInfo = this._guardList[this._curIndex];
            if (!guardInfo)
            {
                TipsUtils.showTipsByLanId("tips_msg40");
                return;
            }
            RiskSend.useKillDrug(guardInfo.cfgIndex);

            this.closeUI();
        }

        public destroy(): void
        {
            this.removeEvent();
            super.destroy();
        }

    }
}