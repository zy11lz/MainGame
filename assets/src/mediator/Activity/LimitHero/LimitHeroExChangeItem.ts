module Pro
{

    /**
    *
    * 胡帕商城模块
    *
    */
    export class LimitHeroExChangeItem extends ProUI.Shop.HuPaShopItemViewUI
    {

        //------ 下面是需要传递给购买弹窗的数据  -----------
        //道具
        private _itemInfo: cfg.AddItemInfo;
        //限购数量
        private _limitCount: number = 0;
        private _shopCfg: cfg.ActivityExchangeExCfgInfo;
        private _shopIndex: number;
        private _actId: number;

        /** vip等级限制 */
        private _vipLimit: number = 0;

        constructor()
        {
            super();
            this.on(Laya.Event.DISPLAY, this, this.init);
        }
        private init()
        {
            this.on(Laya.Event.UNDISPLAY, this, this.onUnDisplay);
            this.backBtn.onClick(this, this.onClickHandler);
            EventMgr.on(EventNotify.HuPa_Materia_Selected, this, this.onSelect);
        }

        public onUnDisplay()
        {
            EventMgr.off(EventNotify.HuPa_Materia_Selected, this, this.onSelect);
        }

        private onSelect(selectHeros: Long[], selectItems: Long[])
        {
            if (this.visible && this._shopCfg && this._shopCfg.type == 2)
            {
                ActivitySend.drawRewardEx(this._actId, this._shopCfg.index, 0, selectHeros)
            }
        }

        private onClickHandler(btn: component.UIButton)
        {
            if (this._shopCfg.type == 2)
            {
                //精灵兑换
                let allList = PetDataMgr.getLimitHeroList(this._shopCfg.fromItemID);
                if (allList.length > 0)
                { UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_LimitHero_Select_Material, [allList, [], [], [], Math.max(0, this._shopCfg.limitNum - ActivityDataMgr.getHuPaHaveExChangeCount(this._shopCfg.index)), false])); }
                else
                { TipsUtils.showTipsByLanId("activity_title_ExChange",cfg.PetSkinCfgData.getFileNameByPetID(this._shopCfg.fromItemID)); }
            }
            else
            {
                if (this.imgFullLimt.visible) { return; } //满了，不能再买了
                //检查消耗的道具是否足够。
                let needItem = ShopUtils.getNeedItemByExCfgInfo(this._shopCfg);
                if (!Global.isFullRes(needItem.itemid, needItem.itemcount, true))
                { return; }
                let ownCount = Global.getItemNum(needItem.itemid);
                let openUIData = new ShopBuyOpenUIData();
                openUIData.limitBuyCount = this._limitCount;
                openUIData.maxCount = Math.floor(ownCount / needItem.itemcount);
                openUIData.addItemInfo = this._itemInfo;
                openUIData.shopCfgInfo = this._shopCfg;
                openUIData.shopIndex = this._shopIndex;
                openUIData.isExChange = true;
                openUIData.actid = this._actId;
                UIManager.Inst.forceOpen(openUIData);
            }


        }

        /** 设置普通商城商品数据 */
        public setItemByFixShopCfg(shopCfg: cfg.ActivityExchangeExCfgInfo)
        {
            this._shopCfg = shopCfg;
            this._shopIndex = shopCfg.index;
            this._actId = shopCfg.activityID;
            //打折
            this.refreshItemDiscount(shopCfg.discount);

            this.refreshFixLimitCountInfo();

            //道具显示
            this.refreshItemInfo(ShopUtils.getSellItemByExCfgInfo(shopCfg)[0]);
            //所需材料显示
            this.refreshNeedCurrencyInfo(shopCfg);

        }

        /** 刷新普通商城的限购信息 */
        public refreshFixLimitCountInfo()
        {
            this.refreshItemLimitBuyView("", ActivityDataMgr.getHuPaHaveExChangeCount(this._shopCfg.index), this._shopCfg.limitNum);
        }

        /** 设置打折信息 */
        private refreshItemDiscount(discount: number)
        {
            if (!discount)
            {
                this.imgDiscount.visible = false;
                return;
            }
            if (discount <= 0 || discount >= 10)
            {
                this.imgDiscount.visible = false;
            } else
            {
                // this.txtDiscount.text = Global.getLangStr("shop_msg17", discount);
                this.imgDiscount.visible = true;
                this.imgDiscount.skin = Pro.UrlMgr.getShopUrl(`common_zhekou${ discount }`)
            }
        }
        /** 设置限购信息 */
        public refreshItemLimitBuyView(strLimitType: string, curCount: number, totalCount: number): void
        {
            if (totalCount == 0)
            { //无限购
                this.htmlTxtLimit.showText = "";
                this._limitCount = -1;
                this.imgFullBack.visible = false;
                this.imgFullLimt.visible = false;
                this.darkImage.visible = false;
                return;
            }
            if (!curCount) { curCount = 0; }
            this.htmlTxtLimit.showText = strLimitType + Global.getLangStr("shop_msg22", curCount, totalCount);

            this._limitCount = totalCount - curCount;
            let isFullLimit = this._limitCount <= 0;
            this.imgFullBack.visible = false;
            this.imgFullLimt.visible = isFullLimit;
            this.darkImage.visible = isFullLimit
        }

        /**
         * 设置道具显示
         */
        private refreshItemInfo(addItemInfo: cfg.AddItemInfo)
        {
            this._itemInfo = addItemInfo;
            this.txtName.text = cfg.ItemCfgData.getNameById(addItemInfo.itemid);
            this.txtName.color = Global.getResQuColor(cfg.ItemCfgData.getQualityById(addItemInfo.itemid));
            this.itemUI.setItemInfo(addItemInfo);
        }

        /**
         * 设置消耗的货币显示
         */
        private refreshNeedCurrencyInfo(shopCfg: cfg.ActivityExchangeExCfgInfo)
        {
            let addItemInfo = ShopUtils.getNeedItemByExCfgInfo(shopCfg);
            if (shopCfg.type == 2)
            {
                this.imgCurrency.skin = Global.getHeadPathWithIconName(cfg.PetCfgData.getBaseSkinByPetID(shopCfg.fromItemID));
            }
            else
            {
                //道具ID转换成小图标资源
                Global.setResSmallIconWithItemID(this.imgCurrency, addItemInfo.itemid);
            }

            this.txtCurrencyCount.text = Global.numberToTuckString(addItemInfo.itemcount);//addItemInfo.itemcount + "";
        }
    }
}