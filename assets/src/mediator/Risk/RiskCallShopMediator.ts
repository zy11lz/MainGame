module Pro
{
    /**
    * 界面说明：神界冒险召唤商店
    * 召唤商店会有两个入口， 一个是点击格子上的商店，一个是使用召唤次数直接召唤。
    * @author jason.xu
    */
    export class RiskCallShopMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Risk.RiskCallShopUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("shop"), UrlMgr.getAtlas("riskevent")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Risk.RiskCallShopUI, 1, BaseAddLayer.TopUI,true);
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
            this.refreshShopList([]);  //在等待服务器数据时，先清空视图
            let gridData = this.UIOpenData.customObject as Pb_God.PBPlayerRiskGrid;
            //如果是点击了格子上的商店，则取格子上商店数据
            if (gridData)
            {
                //格子如果没有采集过，说明商品信息还不完整
                if (gridData.openstate != Pb_God._emRiskGridOpenState.RiskGridOpenState_HaveCollect)
                    RiskSend.collectGrid(gridData.grid, 1, 0);
                else
                    this.refreshShopList(gridData.indexvalue);
            } else
            {
                //否则为召唤商店按钮进入
                RiskSend.useTrader();
            }
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(CmdEvent.Risk_ShopBuyAck, this, this.onShopBuyAck);
            this.addEventMgr(Cmd.S2C_Risk_UseTrader.cmdName, this, this.onUseTrader)
            this.addEventMgr(EventNotify.Risk_SingleGrid_Update, this, this.onUpdateSingleGrid);
            this.UIPanel.btnClose.onClick(this, this.closeUI);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

		/*****
		 *使用召唤商人 	PBG2CRiskUseTrader	
		 * @param PBG2CRiskUseTrader
		 * 		shopindex			PBU32U32	 商品信息
		 * 		tradercount			uint32	 当前召唤商人数量
		 */
        protected onUseTrader(value: Pb_God.PBG2CRiskUseTrader): void
        {
            this.refreshShopList(value.shopindex);
        }

        /** 单个格子变化（可能是收到了商店格子的数据） */
        private onUpdateSingleGrid(index: number): void
        {
            let gridInfo = this.UIOpenData.customObject as Pb_God.PBPlayerRiskGrid;
            //不是同一个格子
            if (!gridInfo || gridInfo.grid != index + 1) return;
            this.refreshShopList(RiskDataMgr.gridDataList[index].indexvalue);
        }


        /** 商品购买回调 */
        private onShopBuyAck(value: Pb_God.PBU32): void
        {
            //找出列表中对应的
            for (var i = 0; i < this._shopList.length; i++)
            {
                if (this._shopList[i].key == value.value)
                {
                    this.onRefreshItem(this.UIPanel.listView.getCellWithIndex(i), i);
                    return;
                }
            }
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
        }

        private _shopList: Pb_God.PBU32U32[] = [];
        /** 刷新商品列表 */
        private refreshShopList(shopList: Pb_God.PBU32U32[]): void
        {
            this._shopList = shopList;
            this.UIPanel.listView.onRefresh(this._shopList.length, this, this.onRefreshItem);
        }

        private onRefreshItem(tempUI: ProUI.Risk.ChildView.RiskCallShopItemViewUI, index: number): void
        {
            let shopData: Pb_God.PBU32U32 = this._shopList[index];
            let shopIndex = shopData.value;
            let shopCfg = cfg.RiskShopCfgData.getInfo(shopIndex);
            //打折情况
            let discount = shopCfg.discount;
            if (discount <= 0 || discount >= 10)
            {
                tempUI.imgDiscount.visible = false;
            } else
            {
                // tempUI.txtDiscount.text = Global.getLangStr("shop_msg17", discount);
                tempUI.imgDiscount.visible = true;
                tempUI.imgDiscount.skin = Pro.UrlMgr.getShopUrl(`common_zhekou${ discount }`);
            }
            //道具
            let cellItem = cfg.RiskShopCfgData.getSellItemByCfgInfo(shopCfg);
            tempUI.itemView.setItemInfo(cellItem);
            tempUI.txtName.text = cfg.ItemCfgData.getNameById(cellItem.itemid);
            //货币显示
            let needItem = cfg.RiskShopCfgData.getNeedItemByCfgInfo(shopCfg);
            Global.setResSmallIconWithItemID(tempUI.imgPrice, needItem.itemid);
            tempUI.txtPrice.text = Global.numberToTuckString(needItem.itemcount);


            //已售完
            let isFull = RiskDataMgr.checkShopHasBuy(shopData.key);
            tempUI.btnBuy.mouseEnabled = !isFull;
            tempUI.imgFull.visible = isFull;
            //点击购买
            tempUI.btnBuy.onClick(this, () =>
            {
                if (isFull) return;
                if (!Global.isFullRes(needItem.itemid, needItem.itemcount, true))
                    return;

                //二级弹窗确认				
                let itemName = cfg.ItemCfgData.getNameById(cellItem.itemid);
                let alertDes = Global.getLangStr("shop_msg16", itemName);
                AlertShow.showConfirmAlert(alertDes, this, () =>
                {
                    RiskSend.shopBuy(shopData.key);
                });
            });
        }

    }
}