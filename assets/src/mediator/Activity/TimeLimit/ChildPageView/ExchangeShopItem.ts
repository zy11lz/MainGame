module Pro
{
    /**
     * 限时兑换商店物品
     */
    export class ExchangeShopItem extends ProUI.ActivityMain.TimeLimit.PageItemView.LimitExchangeShopItemUI
    {

        private _act_id: number;

        private _exchangeCfg: cfg.ActivityExchangeCfgInfo;

        // 消耗道具id
        private _cost_item_id: number;

        // 兑换的商品ID
        private _shop_item_id: number;

        // 商品单次兑换的数量
        private _shop_item_count: number;

        constructor()
        {
            super();
            this.init();
        }

        private init(): void
        {
            this.backBtn.onClick(this, this.onClickHandler);
        }

        /**
         * 限时兑换活动商品
         * needItemID:所需道具ID
         */
        public setItemByActShopCfg(act_cfg: cfg.ActivityCfgInfo, exchangeCfg: cfg.ActivityExchangeCfgInfo): void
        {

            this._act_id = act_cfg.iD;
            this._exchangeCfg = exchangeCfg;
            let sold_count = ActivityDataMgr.getActivityIndexDataValue(this._act_id, this._exchangeCfg.index
                , Pb_God._emActivityDataKey.Activity_Key_ExchageNum) || 0;//已出售数量
            let max_count = this._exchangeCfg.limitNum;

            this._cost_item_id = cfg.ActivityCfgData.getExchangeCostItemID(act_cfg.iD);
            Global.setResSmallIconWithItemID(this.imgCurrency, this._cost_item_id);
            // 已售完
            this.imgFullBack.visible = this.imgFullLimt.visible = sold_count >= max_count;

            // 价格
            this.txtCurrencyCount.text = this._exchangeCfg.needAmount.toString();

            this.htmlTxtLimit.showText = Global.getLangStr("common_buyLimit2", sold_count, max_count);

            // 商品图标和数量
            let add_item_arr = this._exchangeCfg.addItem.split("_");
            let item_id = parseInt(add_item_arr[0]);
            let item_count = parseInt(add_item_arr[1]);
            this.txtName.text = cfg.ItemCfgData.getNameById(item_id);
            this.txtName.color = Global.getResQuColor(cfg.ItemCfgData.getQualityById(item_id));
            this._shop_item_id = item_id;
            this._shop_item_count = item_count;
            this.imgBargain.visible = exchangeCfg.showBargain == 1;
            this.itemUI.setItemID(item_id, item_count, false, true);
        }

        /**
         * 点击购买
         */
        private onClickHandler(btn: component.UIButton)
        {
            if (this.imgFullLimt.visible) return; //满了，不能再买了

            //检查消耗的道具是否足够。
            if (!Global.isFullRes(this._cost_item_id, this._exchangeCfg.needAmount, true))
                return;
            let ownCount = Global.getItemNum(this._cost_item_id);
            let openUIData = new ExchangeBuyOpenUIData();
            openUIData.act_id = this._act_id;
            openUIData.limitBuyCount = this._exchangeCfg.limitNum;
            openUIData.addItemID = this._shop_item_id;
            openUIData.addItemPrice = this._exchangeCfg.needAmount;
            openUIData.addItemCount = this._shop_item_count;
            openUIData.exchanageCfgIndex = this._exchangeCfg.index;

            let sold_count = ActivityDataMgr.getActivityIndexDataValue(this._act_id, this._exchangeCfg.index
                , Pb_God._emActivityDataKey.Activity_Key_ExchageNum) || 0;//已出售数量
            let max_count = this._exchangeCfg.limitNum;
            let left_count = Math.max(0, max_count - sold_count);
            let can_buy_count = Math.floor(ownCount / this._exchangeCfg.needAmount);
            openUIData.maxCount = Math.min(left_count, can_buy_count);

            UIManager.Inst.forceOpen(openUIData);
        }

    }
}