module Pro
{
    /**
    *
    * 模块：商城购买弹窗
    *
    * @author jason.xu
    *
    */
    export class ShopBuyViewMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Shop.ShopBuyViewUI;
        public UIOpenData: ShopBuyOpenUIData;

        /** 当前需要消耗的货币道具ID */
        private _curNeedCurrencyId: number = 1;
        private _curNeedCurrencyPrice: number = 0;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("shop")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Shop.ShopBuyViewUI, 1, BaseAddLayer.CenterUI, true);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.closePanel();
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

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            let addItemInfo = this.UIOpenData.addItemInfo;
            this.UIPanel.itemUI.setItemInfo(addItemInfo);
            //限购
            let limitCount = this.UIOpenData.limitBuyCount;
            let maxCount = this.UIOpenData.maxCount;
            if (limitCount < 0)
            { //没有限购
                this.UIPanel.txtLimit.text = "";
            } else
            {
                maxCount = Math.min(limitCount, maxCount);
                this.UIPanel.txtLimit.text = Global.getLangStr("common_buyLimit1", limitCount); //限购${leftCount}个`
            }
            //滑块按钮组初始化
            let defaultBuyCount = 1;
            this.UIPanel.scrollBar.max = maxCount;
            this.UIPanel.scrollBar.value = defaultBuyCount;


            //以下需要跟据不同的商城类型，来做区分处理
            if (this.UIOpenData.shopType <= Pb_God._emShopType.ShopType_MaxFix)
            { //普通商品
                let fixShopCfg: cfg.ShopFixShopCfgInfo = this.UIOpenData.shopCfgInfo as cfg.ShopFixShopCfgInfo;
                this.UIPanel.txtName.text = cfg.ItemCfgData.getNameById(addItemInfo.itemid);
                this.refreshCurrency(ShopUtils.getNeedItemByCfgInfo(fixShopCfg));
            } else
            {
                let randShopCfg: cfg.ShopRandPoolCfgInfo = this.UIOpenData.shopCfgInfo as cfg.ShopRandPoolCfgInfo;
                this.UIPanel.txtName.text = cfg.ItemCfgData.getNameById(addItemInfo.itemid);
                this.refreshCurrency(ShopUtils.getNeedItemByCfgInfo(randShopCfg));
            }

            //重新再刷新一次购买数量， 保证价格显示准确
            this.refreshBuyCount(defaultBuyCount);
        }


        /** 本类界面打开状态下监听消息列表 */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnCancel.onClick(this, this.closeUI);
            this.UIPanel.btnOk.onClick(this, this.onClickBuy);

            this.UIPanel.scrollBar.setChangeListener(this, this.onChangeScroll);
        }

        /** 本类界面打开状态下监听消息列表 */
        public removeEvent(): void
        {

        }


        /**滑动回调 */
        private onChangeScroll(value: number)
        {
            this.refreshBuyCount(value);
        }

        /** 刷新货币与单价 */
        private refreshCurrency(addItemInfo: cfg.AddItemInfo)
        {
            //道具ID转换成小图标资源
            Global.setResSmallIconWithItemID(this.UIPanel.imgCurrency, addItemInfo.itemid);
            this.UIPanel.txtCurrencyPrice.text = addItemInfo.itemcount + "";
            this._curNeedCurrencyId = addItemInfo.itemid;
            this._curNeedCurrencyPrice = addItemInfo.itemcount;
        }

        /**刷新购买数量显示 */
        private refreshBuyCount(value: number)
        {
            this.UIPanel.txtBuyCount.text = value + "";
            this.UIPanel.txtCurrencyCount.text = value * this._curNeedCurrencyPrice + "";
        }

        /**
         * 点击购买按钮
         */
        private onClickBuy(): void
        {
            let count = this.UIPanel.scrollBar.value;
            if (count == 0)
            {
                TipsUtils.showTipsByLanId("tips_msg51");
                return;
            }
            //判断货币是否足够
            if (!Global.isFullRes(this._curNeedCurrencyId, this._curNeedCurrencyPrice * count, true))
            { return; }

            /**
             * 判断是否是兑换
             */
            if (this.UIOpenData.isExChange)
            {
                ActivitySend.drawRewardEx(this.UIOpenData.actid, this.UIOpenData.shopIndex, count, [])
            }
            else
            {
                ShopSend.buy(this.UIOpenData.shopType, this.UIOpenData.shopIndex, count);
            }

            this.closeUI();
        }

    }
}