module Pro
{
    /**
     * 光轮商城
     */
    export class HuPaGiftPageView extends ProUI.ActivityMain.HuPa.HuPaGiftPageUI implements ITableView
    {
        /** 对应开启的活动Id */
        private _actIds: number[];
        /** 对应活动分组配置 */
        private _actGrpPageCfgInfo: cfg.ActivityCommonGroupPageCfgInfo;

        // 付费配置列表
        private _itemDataList: (cfg.ChargeCfgInfo | cfg.ShopFixShopCfgInfo)[];

        /** 当前周期的结束时间 */
        protected _endTime: number;

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public addEvent(): void
        {
            EventMgr.on(CmdEvent.Platform_update_chargeinfo, this, this.refreshListView);
            EventMgr.on(CmdEvent.Platform_SynCharge, this, this.refreshListView);
            EventMgr.on(EventNotify.Shop_BuyCount_changed, this, this.refreshListView);
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public removeEvent(): void
        {
            EventMgr.off(CmdEvent.Platform_update_chargeinfo, this, this.refreshListView);
            EventMgr.off(CmdEvent.Platform_SynCharge, this, this.refreshListView);
            EventMgr.off(EventNotify.Shop_BuyCount_changed, this, this.refreshListView);
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
            Laya.timer.clear(this, this.onTimer);
        }

        public setData($data: any): void
        {
            this._actIds = $data[0];
            this._actGrpPageCfgInfo = $data[1];
            this.btn_help.visible = !!this._actGrpPageCfgInfo.helpTips;
            this.refreshListView();

            this._endTime = ActivityDataMgr.getActivityEndTimeStamp(this._actIds[0]);
            Laya.timer.loop(1000, this, this.onTimer);
            this.onTimer();
        }

        /** 刷新列表 */
        private refreshListView(): void
        {
            //做个简单的排序，将已售完的排到后面
            let canBuyList: (cfg.ChargeCfgInfo | cfg.ShopFixShopCfgInfo)[] = [];
            let buyFullList: (cfg.ChargeCfgInfo | cfg.ShopFixShopCfgInfo)[] = [];
            let shopFixIdArr: string[] = [];
            let chargeIdArr: string[] = [];
            for (let actid of this._actIds)
            {
                let giftParams = cfg.ActivityCfgData.getParamByID(actid).split("|");
                shopFixIdArr = shopFixIdArr.concat(giftParams[0].split(";"));
                chargeIdArr = chargeIdArr.concat(giftParams[1].split(";"));
            }
            //商城购买的
            for (let idstring of shopFixIdArr)
            {
                let shopCfgInfo = cfg.ShopFixShopCfgData.getInfo(parseInt(idstring));
                if (!shopCfgInfo) continue;
                let limitBuyCount = shopCfgInfo.limitBuyCount || shopCfgInfo.dayBuyCount || shopCfgInfo.weekBuyCount || shopCfgInfo.monthBuyCount || 0;
                if (limitBuyCount > 0 && ShopDataMgr.getFixBuyCountById(shopCfgInfo.iD) >= limitBuyCount) buyFullList.push(shopCfgInfo);
                else canBuyList.push(shopCfgInfo);
            }
            //付费购买
            let giftList: cfg.ChargeCfgInfo[] = [];
            for (let idstring of chargeIdArr)
            {
                if (!idstring) continue;
                let chargeCfg = cfg.ChargeCfgData.getInfo(parseInt(idstring));
                if (!chargeCfg)
                {
                    logE("CommonGroupPage charge id error!", this._actGrpPageCfgInfo.indexID, idstring);
                }
                giftList.push(chargeCfg);
            }
            //剔除掉未满足条件的
            giftList = PlatformDataMgr.filterValidChargeList(giftList);
            for (let el of giftList)
            {
                //有限购
                if (el.maxBuyCount > 0)
                {
                    let chargeInfo = PlatformDataMgr.getChargeInfoByCfgInfo(el);
                    if (chargeInfo && chargeInfo.buycount >= el.maxBuyCount)
                    {
                        buyFullList.push(el);
                        continue;
                    }
                }
                canBuyList.push(el);
            }
            this._itemDataList = canBuyList.concat(buyFullList);
            this.itemList.onRefresh(this._itemDataList.length, this, this.onItemRefresh);
        }

        /** 页签组件销毁 */
        public dispose(): void
        {

        }

        private onItemRefresh(item: ProUI.ActivityMain.TimeLimit.PageItemView.BuyGiftsListItemUI, index: number)
        {
            let cfgInfo = this._itemDataList[index];
            if (cfgInfo["shopType"] != null)
            {  //商城购买    
                this.refreshItemByShopInfo(item, cfgInfo as cfg.ShopFixShopCfgInfo);
            } else
            {
                this.refreshItemByChargeInfo(item, cfgInfo as cfg.ChargeCfgInfo);
            }

        }

        /** 刷新商城购买的道具显示 */
        private refreshItemByShopInfo(itemUI: ProUI.ActivityMain.TimeLimit.PageItemView.BuyGiftsListItemUI, shopCfgInfo: cfg.ShopFixShopCfgInfo): void
        {
            //banner显示
            itemUI.TopBanner.visible = false;
            itemUI.txt_title.visible = true;

            let rewards = cfg.AddItemInfo.getAddItemAttr(shopCfgInfo, shopCfgInfo.sellItem, "sellItemInfo");
            let hasBuyCount = ShopDataMgr.getFixBuyCountById(shopCfgInfo.iD);//已购买次数
            let needItem = ShopUtils.getNeedItemByCfgInfo(shopCfgInfo);
            if (needItem && needItem.itemcount > 0)
            {
                itemUI.txt_price.text = cfg.ItemCfgData.getNameById(needItem.itemid) + needItem.itemcount;
                itemUI.imgBuyReddot.visible = false;
            }
            else
            {
                itemUI.txt_price.text = Global.getLangStr("common_money", 0);
                itemUI.imgBuyReddot.visible = true;
            }
            //限购
            let limitBuyCount = shopCfgInfo.limitBuyCount || shopCfgInfo.dayBuyCount || shopCfgInfo.weekBuyCount || shopCfgInfo.monthBuyCount || 0;
            let isLimitBuy = limitBuyCount > 0;
            let can_buy = !isLimitBuy || hasBuyCount < limitBuyCount;
            itemUI.txt_title.showText = shopCfgInfo.name;
            if (isLimitBuy)
            { //限购显示
                //限购周期
                let strPeriod = "";
                if (shopCfgInfo.dayBuyCount > 0) strPeriod = Global.getLangStr("shop_msg19"); //每日
                if (shopCfgInfo.weekBuyCount > 0) strPeriod = Global.getLangStr("shop_msg20"); //每周
                if (shopCfgInfo.monthBuyCount > 0) strPeriod = Global.getLangStr("shop_msg21"); //每月
                itemUI.txt_limit.showText = Global.getLangStr("activity_msg4", strPeriod, limitBuyCount, hasBuyCount, limitBuyCount);
            } else
            {
                itemUI.txt_limit.showText = "";
            }
            itemUI.itemBox.onRefresh(rewards.length, this, (itemUI: NorItemUI, index: number) =>
            {
                itemUI.setItemInfo(rewards[index]);
            });
            itemUI.btn_buy.visible = can_buy;
            itemUI.img_soldOut.visible = !can_buy;
            itemUI.btn_buy.onClick(this, () =>
            {
                //请求购买礼包
                ShopSend.buy(Pb_God._emShopType.ShopType_NB, shopCfgInfo.index, 1);
            });
        }

        /** 刷新付费购买的道具显示 */
        private refreshItemByChargeInfo(itemUI: ProUI.ActivityMain.TimeLimit.PageItemView.BuyGiftsListItemUI, chargeCfgInfo: cfg.ChargeCfgInfo): void
        {

            //banner显示
            itemUI.TopBanner.visible = !!chargeCfgInfo.params;
            itemUI.txt_title.visible = !itemUI.TopBanner.visible;
            if (itemUI.TopBanner.visible)
            {
                itemUI.bannerIcon.skin = `res/Unpack/Icon/ChargeGiftBanner/${ chargeCfgInfo.params }`;
            }

            let rewards = cfg.ChargeCfgData.getAddItemAryByID(chargeCfgInfo.iD);
            let chargeInfo = PlatformDataMgr.getChargeInfoByCfgInfo(chargeCfgInfo);
            let hasBuyCount = chargeInfo ? chargeInfo.buycount : 0;//已购买次数
            let now_price = chargeCfgInfo.needMoney / 100;
            //是否限购
            let isLimitBuy = chargeCfgInfo.maxBuyCount > 0;
            let can_buy = !isLimitBuy || hasBuyCount < chargeCfgInfo.maxBuyCount;
            itemUI.txt_title.showText = chargeCfgInfo.name;
            if (isLimitBuy)
            { //限购显示
                //限购周期
                let strPeriod = "";
                if (chargeCfgInfo.limitBuyPeriod == 1) strPeriod = Global.getLangStr("shop_msg19"); //每日
                if (chargeCfgInfo.limitBuyPeriod == 7) strPeriod = Global.getLangStr("shop_msg20"); //每周
                if (chargeCfgInfo.limitBuyPeriod == 30) strPeriod = Global.getLangStr("shop_msg21"); //每月
                itemUI.txt_limit.showText = Global.getLangStr("activity_msg4", strPeriod, chargeCfgInfo.maxBuyCount, hasBuyCount, chargeCfgInfo.maxBuyCount);
            } else
            {
                itemUI.txt_limit.showText = "";
            }
            itemUI.txt_price.text = Global.getLangStr("common_money", now_price);
            itemUI.imgBuyReddot.visible = false;
            itemUI.itemBox.onRefresh(rewards.length, this, (itemUI: NorItemUI, index: number) =>
            {
                itemUI.setItemInfo(rewards[index]);
            });
            itemUI.btn_buy.visible = can_buy;
            itemUI.img_soldOut.visible = !can_buy;
            itemUI.btn_buy.onClick(this, () =>
            {
                //请求购买礼包
                PlatformDataMgr.onChargeRequest(chargeCfgInfo);
            });
        }


        /** 刷新活动倒计时 */
        private onTimer(): void
        {
            let tmpPassTime = this._endTime - TimeController.currTimer / 1000;;
            if (tmpPassTime < 0)
            {
                tmpPassTime = 0;
            }
            this.htmlTimer.showText = Global.getLangStr("activity_msg5", Global.GetRemindTime(tmpPassTime, 9));
        }

    }
}