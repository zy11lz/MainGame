module Pro
{
    export class ExchangeBuyViewMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        public UIPanel: ProUI.Shop.ShopBuyViewUI;

        /** UI打开参数 */
        public UIOpenData: ExchangeBuyOpenUIData;

        /** 当前需要消耗的货币道具ID */
        private _curNeedCurrencyId: number = 1;
        /**
         * 当前道具单个价格
         */
        private _curNeedCurrencyPrice: number = 0;


        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        /** UI打开前状态 */
        public openUI(): void
        {
            this.showPanel(ProUI.Shop.ShopBuyViewUI, 1);
        }

        /** 关闭UI*/
        public closeUI(): void
        {
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {

        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnCancel.onClick(this, this.closeUI);
            this.UIPanel.btnOk.onClick(this, this.onClickBuy);

            this.UIPanel.scrollBar.setChangeListener(this, this.onChangeScroll);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 初始化面板(UI每次打开) */
        public initUI(): void
        {
            this.refreshUI();
        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        public refreshUI(): void
        {
            this.UIPanel.itemUI.setItemID(this.UIOpenData.addItemID, this.UIOpenData.addItemCount);
            //限购
            let limitCount = this.UIOpenData.limitBuyCount;
            let maxCount = this.UIOpenData.maxCount;
            if (limitCount < 0)
            { //没有限购
                this.UIPanel.txtLimit.text = "";
            } else
            {
                maxCount = Math.min(limitCount, maxCount);
                this.UIPanel.txtLimit.text = Global.getLangStr("common_buyLimit1", limitCount); //限购${limitCount}个`;
            }
            //滑块按钮组初始化
            let defaultBuyCount = Math.min(1,maxCount);
            this.UIPanel.scrollBar.max = maxCount;
            this.UIPanel.scrollBar.value = defaultBuyCount;

            this._curNeedCurrencyId = cfg.ActivityCfgData.getExchangeCostItemID(this.UIOpenData.act_id);
            // 消耗货币获取失败 
            if(!this._curNeedCurrencyId)
            {
                this._curNeedCurrencyId = this.UIOpenData.needCurrencyID;
            }
            this._curNeedCurrencyPrice = this.UIOpenData.addItemPrice;

            //商品单价
            this.UIPanel.txtCurrencyPrice.text = this._curNeedCurrencyPrice + "";
            Global.setResSmallIconWithItemID(this.UIPanel.imgCurrency, this._curNeedCurrencyId);

            this.UIPanel.txtName.text = cfg.ItemCfgData.getNameById(this.UIOpenData.addItemID); 

            //重新再刷新一次购买数量， 保证价格显示准确
            this.refreshBuyCount(defaultBuyCount);
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
            if (count == 0 )
            {
                TipsUtils.showTipsByLanId("tips_msg5");
                return;
            }
            // if(this.UIPanel.txtBuyCount.text == '0')
            // {
            //     TipsUtils.showTipsByLanId("bag_msg7",cfg.ItemCfgData.getInfo().name);
            //     return;
            // }
            //判断货币是否足够
            if (!Global.isFullRes(this._curNeedCurrencyId, this._curNeedCurrencyPrice * count, true))
                return;
              
            if(this.UIOpenData.exchanageCfgIndex == -1 && !cfg.ActivityCfgData.getExchangeCostItemID(this.UIOpenData.act_id))
            {  
                ItemSend.fullBuy(this.UIOpenData.addItemID, count as any); 
            }
            else
            {
                // 是否限时活动  
                ActivitySend.drawReward(this.UIOpenData.act_id, this.UIOpenData.exchanageCfgIndex, count);
            }
            this.closeUI();
        }

        /**滑动回调 */
        private onChangeScroll(value: number)
        {
            this.refreshBuyCount(value);
        }
    }
}