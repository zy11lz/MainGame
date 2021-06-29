module Pro
{
    /**
    *  共鸣
    */
    export class HeroResonanceResultMediator extends BaseMediator implements IMediator
    {

        public UIPanel: ProUI.Hero.HeroResonance.HeroResonanceResultUI;


        private _selectPet: Net.hero;
        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("rewardpopup"), UrlMgr.getAtlas("heroupsuc")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Hero.HeroResonance.HeroResonanceResultUI, 0, BaseAddLayer.TopUI, true);
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
        }

        public closeUI()
        {
            super.closeUI();
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            let value: Pb_God.PBG2CResonanceGridChg = this.UIOpenData.customObject;

            let petInfo = PetDataMgr.getPetInfo(value.grid.petsn);

            this.UIPanel.pet.setPetInfo(petInfo);
            this.UIPanel.lblName.text = cfg.PetSkinCfgData.getFileNameById(petInfo.useskinid);


            if (value.type == Pb_God._emResonanceType.Resonance_Type_Level)
            {
                this.UIPanel.resonance1Box.visible = true;
                this.UIPanel.resonance2Box.visible = false;
                this.UIPanel.lblOldLv.text = "LV:" + value.grid.value % 10000;
                this.UIPanel.lblNewLv.text = "LV:" + petInfo.level;

                this.UIPanel.imgTitle.skin = UrlMgr.getRewardpopupUrl("pic_title_dengjitisheng");

            } else
            {
                this.UIPanel.resonance1Box.visible = false;
                this.UIPanel.resonance2Box.visible = true;
                this.UIPanel.StarBoxOld.setStar(value.grid.value);
                this.UIPanel.StarBoxNew.setStar(petInfo.star);

                this.UIPanel.imgTitle.skin = UrlMgr.getHeroupsucUrl("pic_title_shengxingchenggong");

            }
        }

    }


}