module Pro {

    /**
    * 
    * 模块：商城单个商品显示对象
    *
    * @author jason.xu
    * 
    */
    export class ShopItemView extends ProUI.Shop.ShopItemViewUI  {

        //------ 下面是需要传递给购买弹窗的数据  -----------
        //道具
        private _itemInfo: cfg.AddItemInfo;
        //限购数量
        private _limitCount: number = 0;
        private _shopCfg: cfg.ShopFixShopCfgInfo | cfg.ShopRandPoolCfgInfo;
        private _shopType: number;
        private _shopIndex: number;
        private _param: string;

        /** vip等级限制 */
        private _vipLimit: number = 0;

        constructor()  {
            super();
            this.init();
        }
        private init()  {
            this.backBtn.onClick(this, this.onClickHandler);
            // ShopUtils.setGlowFilter(this.imgCurrency);
        }

        private onClickHandler(btn: component.UIButton)  {
            if (this.imgFullLimt.visible) return; //满了，不能再买了
            if (this._vipLimit > 0)  {
                TipsUtils.showTipsByLanId("tips_msg52");
                return;
            }
            if(this._shopType == Pb_God._emShopType.ShopType_Tower &&  TrainDataMgr.getTowerStageID(1) < parseInt(this._param))
            {
                TipsUtils.showTipsByLanId("tips_msg84",this._param);
                return;
            }
            // 有个坑  大师塔对战是20001开始
            if(this._shopType == Pb_God._emShopType.ShopType_MasterTower &&  TrainDataMgr.getTowerStageID(2) < parseInt(this._param))
            {
                TipsUtils.showTipsByLanId("tips_msg85",parseInt(this._param) - 20000);
                return;
            }
            //检查消耗的道具是否足够。
            let needItem = ShopUtils.getNeedItemByCfgInfo(this._shopCfg);
            if (!Global.isFullRes(needItem.itemid, needItem.itemcount, true))
                return;
            let ownCount = Global.getItemNum(needItem.itemid);
            let openUIData = new ShopBuyOpenUIData();
            openUIData.limitBuyCount = this._limitCount;
            openUIData.maxCount = Math.floor(ownCount / needItem.itemcount);
            openUIData.addItemInfo = this._itemInfo;
            openUIData.shopCfgInfo = this._shopCfg;
            openUIData.shopType = this._shopType;
            openUIData.shopIndex = this._shopIndex;

            UIManager.Inst.forceOpen(openUIData);
        }

        /** 设置普通商城商品数据 */
        public setItemByFixShopCfg(shopCfg: cfg.ShopFixShopCfgInfo)  {
            this._shopCfg = shopCfg;
            this._shopIndex = shopCfg.index;
            this._shopType = shopCfg.shopType;
            this._param = shopCfg.param;
            //打折
            this.refreshItemDiscount(shopCfg.discount);

            this.refreshFixLimitCountInfo();

            //道具显示
            this.refreshItemInfo(ShopUtils.getSellItemByCfgInfo(shopCfg)[0]);
            //所需材料显示
            this.refreshNeedCurrencyInfo(ShopUtils.getNeedItemByCfgInfo(shopCfg));

            this.refreshSkillLearn();
        }

        /** 刷新普通商城的限购信息 */
        public refreshFixLimitCountInfo()  {
            let shopCfg: cfg.ShopFixShopCfgInfo = this._shopCfg as cfg.ShopFixShopCfgInfo;
            if (shopCfg.needVipLevel > 0 && shopCfg.needVipLevel > PrivilegeDataMgr.vipLevel)  { //VIP等级不够时，显示VIP专属
                this._vipLimit = shopCfg.needVipLevel;
                this.imgFullBack.visible = false;
                this.imgFullLimt.visible = false;
                this.htmlTxtLimit.showText = Global.getLangStr("shop_msg18", shopCfg.needVipLevel); // `<font color='#009e00'>VIP${}</font>专属`;
                return;
            }
            this._vipLimit = 0;
            //限购
            let limitCount = 0;
            let strLimitType = ""
            if (shopCfg.dayBuyCount > 0)  {
                limitCount = shopCfg.dayBuyCount;
                strLimitType = Global.getLangStr("shop_msg19");//每日";
            } else if (shopCfg.weekBuyCount > 0)  {
                limitCount = shopCfg.weekBuyCount;
                strLimitType = Global.getLangStr("shop_msg20");//每周";
            } else if (shopCfg.monthBuyCount > 0)  {
                limitCount = shopCfg.monthBuyCount;
                strLimitType = Global.getLangStr("shop_msg21");//每月";
            } else if (shopCfg.limitBuyCount > 0)  {
                limitCount = shopCfg.limitBuyCount;
                strLimitType = "";
            }

            let buyCount: number = ShopDataMgr.getFixBuyCountById(shopCfg.iD);
            this.refreshItemLimitBuyView(strLimitType, buyCount, limitCount);
        }

        /** 设置随机商城商品数据 */
        public setItemByRandShopCfg(shopCfg: cfg.ShopRandPoolCfgInfo, shopType: number, posIndex: number, buyCount: number)  {
            this._shopCfg = shopCfg;
            this._shopType = shopType;
            this._shopIndex = posIndex;
            this._vipLimit = 0;

            //打折
            this.refreshItemDiscount(shopCfg.discount);
            //限购信息
            this.refreshItemLimitBuyView("", buyCount, shopCfg.buyCount);

            //道具显示
            this.refreshItemInfo(ShopUtils.getSellItemByCfgInfo(shopCfg)[0]);
            //所需材料显示
            this.refreshNeedCurrencyInfo(ShopUtils.getNeedItemByCfgInfo(shopCfg));

            this.refreshSkillLearn();
        }

        /** 技能领悟状态（仅针对技能商城的额外显示） */
        private refreshSkillLearn(): void  {
            if (this._shopType != Pb_God._emShopType.ShopType_Skill)  {
                this.boxLearn.visible = false;
                return;
            }
            let itemId = ShopUtils.getSellItemByCfgInfo(this._shopCfg)[0].itemid;
            //拿到主线上阵英雄列表
            let heros = EmbattleDataMgr.getHerosByType(Pb_God._emZhenfaType.ZhenfaType_Zhuxian);
            //对应英雄身上的天赋技能
            for (var hero of heros)  {
                for (var posType = 1; posType <= 3; posType++)  {
                    let EquipMgr = SuitEquipDataMgr.getSuitMgr(hero.sn);
                    if (!EquipMgr) continue;
                    let tempEquipInfo = EquipMgr.getTalent(posType);
                    if (!tempEquipInfo) continue;
                    let needItems = cfg.SkillNewTalentUpgradeCfgData.getNeedItemAryById(tempEquipInfo.skillindex);
                    for (let needItem of needItems)  {
                        if (needItem.itemid == itemId)  {
                            this.boxLearn.visible = true;
                            return;
                        }
                    }
                }
            }
            this.boxLearn.visible = false;
        }


        /** 设置打折信息 */
        private refreshItemDiscount(discount: number)  {
            if (discount <= 0 || discount >= 10)  {
                this.imgDiscount.visible = false;
            } else  {
                // this.txtDiscount.text = Global.getLangStr("shop_msg17", discount);
                this.imgDiscount.visible = true;
                this.imgDiscount.skin = Pro.UrlMgr.getShopUrl(`common_zhekou${discount}`)
            }
        }
        /** 设置限购信息 */
        public refreshItemLimitBuyView(strLimitType: string, curCount: number, totalCount: number): void  {
            if (totalCount == 0)  { //无限购
                this.htmlTxtLimit.showText = "";
                this._limitCount = -1;
                this.imgFullBack.visible = false;
                this.imgFullLimt.visible = false;
                this.darkImage.visible   = false;   
                return;
            }
            if (!curCount) curCount = 0;
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
        private refreshItemInfo(addItemInfo: cfg.AddItemInfo)  {
            this._itemInfo = addItemInfo;
            this.txtName.text = cfg.ItemCfgData.getNameById(addItemInfo.itemid);
            this.txtName.color = Global.getResQuColor(cfg.ItemCfgData.getQualityById(addItemInfo.itemid));
            this.itemUI.setItemInfo(addItemInfo);
        }

        /**
         * 设置消耗的货币显示
         */
        private refreshNeedCurrencyInfo(addItemInfo: cfg.AddItemInfo)  {
            //道具ID转换成小图标资源            
            Global.setResSmallIconWithItemID(this.imgCurrency, addItemInfo.itemid);
            this.txtCurrencyCount.text = Global.numberToTuckString(addItemInfo.itemcount);//addItemInfo.itemcount + "";
        }
    }
}