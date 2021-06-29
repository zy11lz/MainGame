module Pro
{
    /**
     * 天界副本神装商城
     */
    export class GodEquipShopMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        public UIPanel: ProUI.Heavens.GodEquip.GodEquipShopUI;

        /** UI打开参数 */

        /** 商店数据字典key:商店子类型 val:对应子类型所有商品数组 */
        protected _dataArrBySubType: Object;

        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas('shop')];
        }

        /** UI打开前状态 */
        public openUI(): void
        {
            this.showPanel(ProUI.Heavens.GodEquip.GodEquipShopUI,1,BaseAddLayer.CenterUI,true);
        }

        /** 关闭UI*/
        public closeUI(): void
        {
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.btn_close.onClick(this, this.closeUI);
            let itemCfgList = cfg.ShopFixShopCfgData.getDataArrayByShopType(Pb_God._emShopType.ShopType_GodSuit);
            this._dataArrBySubType = cfg.TemplateUtil.createSimpleIndexFromObj(itemCfgList, "subType");

            // 页签列表
            let data_arr = [];
            for (let k in this._dataArrBySubType)
            {
                data_arr.push(new component.UITabData("godEquip_Tab_" + k));
            }
            this.UIPanel.tab.onClick(this, this.onTabClick, data_arr,
                [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")])
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(EventNotify.PlayerItemNumChange, this, this.refreshUI);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 初始化面板(UI每次打开) */
        public initUI(): void
        {
            this.UIPanel.tab.setSelectTab(0);
            this.refreshView();
        }

        private refreshView(): void
        {
            let _useItemID = cfg.ShopCurrencyTypeCfgData.getCurrencyIdByShopType(Pb_God._emShopType.ShopType_GodSuit);
            Global.setResSmallIconWithItemID(this.UIPanel.img_item_icon, _useItemID);
            this.UIPanel.txt_item_count.text = Global.getItemNum(_useItemID).toString();
        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        public refreshUI(): void
        {
            this.UIPanel.tab.activeCurrentTab();
            this.refreshView();
        }

        private onTabClick(tab: component.UITab, tabIndex: number, oldTabIndex: number): void
        {
            let cfgArr: cfg.ShopFixShopCfgInfo[] = this._dataArrBySubType[tabIndex + 1];
            if (!cfgArr) return;
            let can_show_arr = cfgArr.filter(e =>
            {
                return HeavenDungeonDataMgr.isChpaterStagePassedByIndex(parseInt(e.param));
            });
            this.UIPanel.itemList.onRefresh(can_show_arr.length, this, (tmpItem: ShopItemView, index: number) =>
            {
                let itemCfg = can_show_arr[index];
                tmpItem.setItemByFixShopCfg(itemCfg);
            });
        }

    }
}