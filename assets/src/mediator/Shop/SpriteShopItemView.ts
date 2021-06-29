module Pro
{

    /**
    * 
    * 模块：杂货铺商城单个商品显示对象
    *
    * @author jason.xu
    * 
    */
    export class SpriteShopItemView extends ProUI.Shop.SpriteShopItemViewUI
    {

        //道具
        private _itemInfo: cfg.AddItemInfo;
        private _shopCfg: cfg.ShopRandPoolCfgInfo;
        private _shopIndex: number;


        constructor()
        {
            super();
            this.init();
        }
        private init()
        {

            this.BuyBtn.onClick(this, this.onClickHandler);
        }

        private onClickHandler()
        {

            if (this.imgFull.visible) return; //满了，不能再买了

            //检查消耗的道具是否足够。
            let needItem = ShopUtils.getNeedItemByCfgInfo(this._shopCfg);
            if (!Global.isFullRes(needItem.itemid, needItem.itemcount, true))
                return;

            //新手引导判断
            if (GuideMgr.Inst.getInShowGuide())
            {
                ShopSend.buy(Pb_God._emShopType.ShopType_Sprite, this._shopIndex, 1);
                return;
            }

            //二级弹窗确认				
            let itemName = cfg.ItemCfgData.getNameById(this._itemInfo.itemid);
            let owndCount = Global.getItemNum(this._itemInfo.itemid);
            let alertDes = Global.getLangStr("shop_msg28", itemName, owndCount)  //`是否购买<font color='#009e00'>${itemName}</font>(拥有:<font color='#009e00'>${owndCount}</font>)?`;
            AlertShow.showConfirmAlert(alertDes, this, () =>
            {
                ShopSend.buy(Pb_God._emShopType.ShopType_Sprite, this._shopIndex, 1);
            });
        }

        /** 设置随机商城商品数据 */
        public setItemByRandShopCfg(shopCfg: cfg.ShopRandPoolCfgInfo, posIndex: number, buyCount: number)
        {
            this._shopCfg = shopCfg;
            this._shopIndex = posIndex;

            //打折
            this.refreshItemDiscount(shopCfg.discount);
            //限购信息
            this.refreshItemLimitBuyView(buyCount, shopCfg.buyCount);

            //道具显示
            this.refreshItemInfo(ShopUtils.getSellItemByCfgInfo(shopCfg)[0]);
            //所需材料显示
            this.refreshNeedCurrencyInfo(ShopUtils.getNeedItemByCfgInfo(shopCfg));
        }


        /** 设置打折信息 */
        private refreshItemDiscount(discount: number)
        {
            if (discount <= 0 || discount >= 10)
            {
                this.imgDiscount.visible = false;
            } else
            {
                this.imgDiscount.skin = Pro.UrlMgr.getShopUrl(`common_zhekou${ discount }`);
                this.imgDiscount.visible = true;
            }
        }

        /** 设置限购信息 */
        public refreshItemLimitBuyView(curCount: number, totalCount: number): void
        {
            if (totalCount == 0)
            { //无限购
                this.imgFull.visible = false;
                this.itemUI.gray = false;
                return;
            }
            if (!curCount) curCount = 0;
            let isFullLimit = curCount >= totalCount;
            this.imgFull.visible = isFullLimit;
            this.itemUI.gray = isFullLimit;
        }

        /**
         * 设置道具显示
         */
        private refreshItemInfo(addItemInfo: cfg.AddItemInfo)
        {
            this._itemInfo = addItemInfo;
            this.itemUI.setItemInfo(addItemInfo);
        }

        /**
         * 设置消耗的货币显示
         */
        private refreshNeedCurrencyInfo(addItemInfo: cfg.AddItemInfo)
        {
            //道具ID转换成小图标资源            
            Global.setResSmallIconWithItemID(this.imgCurrency, addItemInfo.itemid);
            this.txtCurrencyCount.text = Global.numberToTuckString(addItemInfo.itemcount);
            this.hbox.refresh();
        }
    }
}