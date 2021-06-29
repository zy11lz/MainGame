module Pro
{
	/**
	* 模块：指定积分商店(界面与商城主界面类似，但此处只指定一种类型的商店，无分页)
	* @author jason.xu
	*/
	export class ScoreShopMediator extends BaseMediator implements IMediator
	{

		/** 当前显示的普通商城商品列表 */
		private _curFixShopItemList: Array<cfg.ShopFixShopCfgInfo> = [];

		/** 当前正显示的商城类型分页 */
		private _curShopType: Pb_God._emShopType;

		/** 当前正在底部已有资产道具id */
		private _curCurrencyId: number = -1;

		/** item与shopIndex的映射 */
		private _mapItemView = new ds.StringMap<ShopItemView>();


		public UIPanel: ProUI.Shop.ScoreShopUI;

		/** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
		public autoLoadAtlas(): Array<any>
		{
			return [UrlMgr.getAtlas("shop")];
		}

		public openUI(): void
		{
			this.showPanel(ProUI.Shop.ScoreShopUI, 1,BaseAddLayer.CenterUI,true);
		}

		/*** 关闭UI */
		public closeUI(): void
		{
			this.closePanel();
		}

        /**
        * 初始化面板ui 
        */
		public initialization(): void
		{
		}


        /**
         * 初始化面板ui
         */
		public initUI(): void
		{
			this._curShopType = this.UIOpenData.customObject;
			this.refreshPageUIByShopType(this._curShopType, true);
		}

		/** 本类界面打开状态下监听消息列表 */
		public addEvent(): void
		{
			this.addEventMgr(EventNotify.PlayerItemNumChange, this, this.onItemNumChange);
			this.addEventMgr(EventNotify.Shop_BuyCount_changed, this, this.onBuyCountChange);

			this.UIPanel.btnClose.onClick(this, this.closeUI);
		}

		/** 本类界面打开状态下监听消息列表 */
		public removeEvent(): void
		{

		}

		/** 模块的刷新方法, 在模块每次被呼出的时候自动调用,  用来同步刷新数据和显示*/
		public refreshUI()
		{
		}

		/**
		 * 刷新显示相应的商城分页
		 */
		private refreshPageUIByShopType(shopType: number, isForceRefresh: boolean = false): void
		{
			if (this._curShopType == shopType && !isForceRefresh) return;
			this._curShopType = shopType;
			//刷新商品列表
			this._mapItemView.clear();
			this._curFixShopItemList = cfg.ShopFixShopCfgData.getDataArrayByShopType(shopType) || [];
			this.UIPanel.listView.onRefresh(this._curFixShopItemList.length, this, this.onRefreshFixShopItem);

		}

		/** 刷新已有货币资产类型 */
		private refreshCurrency(itemid)
		{
			if (this._curCurrencyId == itemid) return;
			this._curCurrencyId = itemid;

			this.UIPanel.txtCurrencyCount.text = Global.getItemNum(itemid) + "";

			//道具ID转换成小图标资源
			Global.setResSmallIconWithItemID(this.UIPanel.imgCurrency, itemid);
		}


		/** 普通商品元素刷新 */
		private onRefreshFixShopItem(item: ShopItemView, index: number)
		{
			let shopCfgInfo: cfg.ShopFixShopCfgInfo = this._curFixShopItemList[index];
			this._mapItemView.put(shopCfgInfo.index, item);
			item.setItemByFixShopCfg(shopCfgInfo);
			this.refreshCurrency(ShopUtils.getNeedItemByCfgInfo(shopCfgInfo).itemid);
		}

		/** 刷新道具数量 */
		private onItemNumChange(fID: number, tempNewNum: number): void
		{
			if (fID == this._curCurrencyId)
			{
				this.UIPanel.txtCurrencyCount.text = tempNewNum + "";
			}
		}

		/** 单个商品购买次数更新 */
		private onBuyCountChange(shopType: number, shopId: number, buyCount: number)
		{
			if (shopType != this._curShopType) return;
			let itemView: ShopItemView = this._mapItemView.get(shopId);
			if (itemView)
				itemView.refreshFixLimitCountInfo();
		}

	}
}