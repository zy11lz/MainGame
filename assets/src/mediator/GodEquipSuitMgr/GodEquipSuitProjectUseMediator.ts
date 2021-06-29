module Pro
{
    /**
     * 界面说明： 神装套装方案装配确认界面 
    * @author jason.xu
    */
    export class GodEquipSuitProjectUseMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Heavens.GodEquip.SuitProjectUseUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null; // [UrlMgr.getAtlas('')]
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Heavens.GodEquip.SuitProjectUseUI, 1, BaseAddLayer.TopUI, true);
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
            //即将装载方案的英雄
            let hero: Net.hero = this.UIOpenData.customObject;
            let suitMgrInfo: Pb_God.PBPlayerGodEquipSuitInfo = this.UIOpenData.customObject2;
            //当前装载方案的英雄
            let useHero = PetDataMgr.getPetInfo(suitMgrInfo.petsn);

            // let equipMgrInfo = SuitEquipDataMgr.getSuitMgr(hero.sn);
            // let itemList = equipMgrInfo.getGodList();

            this.UIPanel.htmlDesc.showText = Global.getLangStr("godequip_suitMgr_15", cfg.PetSkinCfgData.getFileNameById(hero.useskinid));

            this.UIPanel.listView.onRefresh(suitMgrInfo.posequip.length, this, (box: Laya.Box, index: number) =>
            {
                let equipInfo = suitMgrInfo.posequip[index];
                let equipItem = box.getChildByName("equipItem") as EquipItemUI;
                let norItem = box.getChildByName("norItem") as NorItemUI;
                norItem.setPetInfo(useHero, false, false);
                let itemInfo = ItemDataMgr.getUsesPBItem(equipInfo.itemsn) || ItemDataMgr.getBagPBItem(equipInfo.itemsn);
                equipItem.setPetGodWeaponID(0, itemInfo);
            })

        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnConfirm.onClick(this, this.onClickConfirm);
            this.UIPanel.btnTodayTips.onClick(this, () =>
            {
                this.UIPanel.imgTodayTips.visible = !this.UIPanel.imgTodayTips.visible;
            })
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 确认 */
        private onClickConfirm(): void
        {
            //今日不再提示
            if (this.UIPanel.imgTodayTips.visible) TodayRepeatOpMgr.Inst.setTag("GodEquipSuitMgrUse");

            let hero: Net.hero = this.UIOpenData.customObject;
            let suitMgrInfo: Pb_God.PBPlayerGodEquipSuitInfo = this.UIOpenData.customObject2;

            PetSend.godSuit_SaveEquipAsk(hero.sn, suitMgrInfo.id);

            this.closeUI();
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

    }
}