module Pro
{
    /**
    *  共鸣
    */
    export class HeroResonanceDownMediator extends BaseMediator implements IMediator
    {

        public UIPanel: ProUI.Hero.HeroResonance.HeroResonanceDownUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Hero.HeroResonance.HeroResonanceDownUI, 0, BaseAddLayer.TopUI, true);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {

        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.refreshUI();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnCancel.onClick(this, this.closeUI);
            this.UIPanel.btnSure.onClick(this, () =>
            {
                ResonanceSend.placeGrid(this.UIOpenData.customObject, this.UIOpenData.customObject2, Global.initLongFromValue(0));
                this.closeUI();
            })
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            let info = ResonanceDataMgr.getInfoByType(this.UIOpenData.customObject);

            this.UIPanel.lblDesc.text = Global.getLangStr(`resonance_msg16_${ info.type }`);
            let gridData = ResonanceDataMgr.getGridByTypeAndGridIndex(info.type, this.UIOpenData.customObject2);
            if (!gridData)
            {
                return;
            }

            let petInfo = PetDataMgr.getPetInfo(gridData.petsn);
            this.UIPanel.currentPet.setPetInfo(petInfo);
            this.UIPanel.toPet.setPetInfo(petInfo);
            if (info.type == Pb_God._emResonanceType.Resonance_Type_Level)
            {
                this.UIPanel.lblStarDesc.visible = false;
                this.UIPanel.lblCurLv.text = "Lv" + petInfo.level;

                this.UIPanel.toPet.LvLb.text = this.UIPanel.lblToLv.text = "Lv" + gridData.value % 10000;
            }
            else if (info.type == Pb_God._emResonanceType.Resonance_Type_Star)
            {
                this.UIPanel.lblStarDesc.visible = true;
                this.UIPanel.lblCurLv.text = this.UIPanel.lblToLv.text = "Lv" + petInfo.level;
                this.UIPanel.toPet.StarBox.setStar(gridData.value);
                Global.setResQuWithNum(this.UIPanel.toPet.BGImg, gridData.value - 1);
                Global.setColorWithNum(this.UIPanel.toPet.LvLb, gridData.value - 1);
                Global.setColorWithNum(this.UIPanel.toPet.NumLb, gridData.value - 1);
            }
        }

    }


}