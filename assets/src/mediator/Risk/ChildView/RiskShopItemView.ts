module Pro
{
    /**
     * 冒险商店单个item 
     *  此处与商城item共用视图，只是逻辑有区分而已。
    * @author jason.xu
    */
    export class RiskShopItemView extends ProUI.Shop.ShopItemViewUI
    {

        //购买的道具
        private _itemInfo: cfg.AddItemInfo;
        //消耗的道具
        private _needItemInfo: cfg.AddItemInfo;

        /** 商品对应的index（商品数据唯一id，并非配置表） */
        private _shopIndex: number;

        constructor()
        {
            super();
            this.init();
        }
        private init()
        {
            this.htmlTxtLimit.showText = "";  //限购1，不需要显示限购信息
            this.backBtn.onClick(this, this.onClickHandler);
        }

        private onClickHandler(btn: component.UIButton)
        {

            if (this.imgFullLimt.visible) return; //满了，不能再买了

            //检查消耗的道具是否足够。
            let needItem = this._needItemInfo;
            if (!Global.isFullRes(needItem.itemid, needItem.itemcount, true))
                return;

            //二级弹窗确认				
            let itemName = cfg.ItemCfgData.getNameById(this._itemInfo.itemid);
            let alertDes = Global.getLangStr("shop_msg16", itemName);
            AlertShow.showConfirmAlert(alertDes, this, () =>
            {
                RiskSend.shopBuy(this._shopIndex);
            });
        }

        public setShopData(shopIndex: number, shopCfgId: number): void
        {
            this._shopIndex = shopIndex;
            let shopCfg = cfg.RiskShopCfgData.getInfo(shopCfgId);
            this.refreshItemInfo(cfg.RiskShopCfgData.getSellItemByCfgInfo(shopCfg));
            this.refreshNeedCurrencyInfo(cfg.RiskShopCfgData.getNeedItemByCfgInfo(shopCfg));

            this.refreshItemDiscount(shopCfg.discount);
            this.resetBuyFull(RiskDataMgr.checkShopHasBuy(shopIndex));
        }


        /** 设置打折信息 */
        private refreshItemDiscount(discount: number)
        {
            if (discount <= 0 || discount >= 10)
            {
                this.imgDiscount.visible = false;
            } else
            {
                // this.txtDiscount.text = Global.getLangStr("shop_msg17", discount);
                this.imgDiscount.visible = true;
                this.imgDiscount.skin = Pro.UrlMgr.getShopUrl(`common_zhekou${ discount }`);
            }
        }

        /** 设置是否已售完 */
        private resetBuyFull(isFull: boolean): void
        {
            this.imgFullBack.visible = isFull;
            this.imgFullLimt.visible = isFull;
        }

        /**
         * 设置道具显示
         */
        private refreshItemInfo(addItemInfo: cfg.AddItemInfo)
        {
            this._itemInfo = addItemInfo;
            this.txtName.text = cfg.ItemCfgData.getNameById(addItemInfo.itemid);
            this.itemUI.setItemInfo(addItemInfo);
        }

        /**
         * 设置消耗的货币显示
         */
        private refreshNeedCurrencyInfo(addItemInfo: cfg.AddItemInfo)
        {
            this._needItemInfo = addItemInfo;
            //道具ID转换成小图标资源            
            Global.setResSmallIconWithItemID(this.imgCurrency, addItemInfo.itemid);
            this.txtCurrencyCount.text = addItemInfo.itemcount + "";
        }
    }
}