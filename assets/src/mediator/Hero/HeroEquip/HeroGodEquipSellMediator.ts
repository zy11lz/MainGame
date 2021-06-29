module Pro
{
    /**
     * 界面说明： 神装出售确认界面
    * @author jason.xu
    */
    export class HeroGodEquipSellMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Hero.HeroEquip.GodEquipSell.GodEquipSellUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Hero.HeroEquip.GodEquipSell.GodEquipSellUI, 1,BaseAddLayer.CenterUI,true);
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
            let itemInfo = this.UIOpenData.customObject as Pb_God.PBItem;
            //返还百分比
            let returnRate = 60;
            //出售<font color='#009e00'>{0}</font>可获得以下资源（已包含返还的{1}%的洗练消耗），是否确定出售？
            this.UIPanel.htmlContent.showText = Global.getLangStr("item_review_msg10", cfg.ItemCfgData.getNameById(itemInfo.itemid), returnRate);

            //出售得到的道具
            let sellItemInfo = cfg.ItemCfgData.getSellItemInfoById(itemInfo.itemid);
            let returnCount = sellItemInfo.itemcount;
            //洗炼次数计算返还的道具
            let refineCount = itemInfo.godrefinecount;
            if (refineCount > 0)
            {
                let itemStar = cfg.ItemCfgData.getStarNumById(itemInfo.itemid);
                //消耗
                let costItemAry = cfg.GodEquipRefineCfgData.getNeedItemAryByIndex(itemStar);
                for (let costItem of costItemAry)
                {
                    if (costItem.itemid == sellItemInfo.itemid)
                    { //策划说只要这一个道具就好，其它金币什么的就不要返还了
                        returnCount += Math.floor(costItem.itemcount * refineCount * returnRate / 100);
                    }
                }
            }
            this.UIPanel.norItem.setItemID(sellItemInfo.itemid, returnCount, false, true);
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnCancel.onClick(this, this.closeUI);
            this.UIPanel.btnConfirm.onClick(this, this.onClickConfirm);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        private onClickConfirm(): void
        {
            let itemInfo = this.UIOpenData.customObject as Pb_God.PBItem;
            ItemSend.sell(itemInfo.itemsn, 1);
            this.closeUI();
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

    }
}