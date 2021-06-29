module Pro
{
    /**
     * 天界副本神装图鉴
     */
    export class GodEquipViewMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        public UIPanel: ProUI.Heavens.GodEquip.GodEquipViewUI;

        /** 神装数据字典 key:星级 val:对应星级所有神装 */
        private itemInfoDic: { [key: number]: cfg.ItemCfgInfo[] } = {};

        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        /** UI打开前状态 */
        public openUI(): void
        {
            this.showPanel(ProUI.Heavens.GodEquip.GodEquipViewUI, 1, BaseAddLayer.TopUI,true);
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

            // 页签列表
            let data_arr = [];
            for (var i = 1; i <= 12; i++)
            {
                data_arr.push(new component.UITabData("godEquip_Tab_" + i));
            }

            this.UIPanel.tab.onClick(this, this.onTabClick, data_arr,
                [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")])
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {

        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 初始化面板(UI每次打开) */
        public initUI(): void
        {
            this.UIPanel.tab.setSelectTab(0);
        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        public refreshUI(): void
        {

        }

        private onTabClick(tab: component.UITab, tabIndex: number, oldTabIndex: number): void
        {
            let item_arr = this.getItemsByGodEquipType(tabIndex + 1);
            this.UIPanel.itemList.onRefresh(item_arr.length, this, (tmpItem: ProUI.Heavens.ChildPage.GodEquipListItemUI, index: number) =>
            {
                let item_cfg = item_arr[index];

                let tmpInfo = new Pb_God.PBItem();
                tmpInfo.itemid = item_cfg.id;
                tmpInfo.itemcount = 1;
                tmpItem.itemInfo.setItemInfo(tmpInfo, false, false,true);
                let qual_name = Global.getLangStr("godQu_" + item_cfg.quality);
                tmpItem.txt_name.showText = item_cfg.name; //Global.getLangStr("item_review_msg17",qual_name,item_cfg.starNum,item_cfg.name);
                tmpItem.txt_desc.showText = Global.getLangStr("Heaven_godEquip_msg1", item_cfg.starNum);
                //tmpItem.img_tag.skin ="";
            });
        }

        private getItemsByGodEquipType(godequipType: number): cfg.ItemCfgInfo[]
        {
            if (!this.itemInfoDic[godequipType])
            {
                let needQuality = 2;
                let allGodequipItems = cfg.ItemCfgData.getGodItemInfoWithQuality(needQuality);
                let items: cfg.ItemCfgInfo[] = [];
                this.itemInfoDic[godequipType] = items;
                for (let item of allGodequipItems)
                {
                    if (godequipType == cfg.GodEquipSuitCfgData.getTypeBySuitID(parseInt(item.useParam))) items.push(item);
                }
                /* 排序按星级从高到低排序
                    部位从1到4排序 */
                items.sort((a: cfg.ItemCfgInfo, b: cfg.ItemCfgInfo) =>
                {
                    if (a.starNum != b.starNum) return b.starNum - a.starNum;
                    return a.subType - b.subType;
                });
            }
            return this.itemInfoDic[godequipType];
        }
    }
}