
/**
* 
*	
* 保存服务器的发送的数据
* 
*  1.socket读取二进制数据----》
*  2.二进制数据转换为proto-------》 
*  3.抛出协议事件 -------》 
*  4.各个系统的dataMgr侦听事件，接收并保存服务器发过来的数据 ------》 
*  5.dataMgr抛出数据整理好的CmdEvent事件  -------》 
*  6.各个ui侦听CmdEvent事件，向各个系统的dataMgr提供的方法接口获取最新的数据，更新ui显示
* 
*  ui不负责直接侦听服务器数据事件， 也不负责保存服务器数据，
*  由各个系统的dataMgr统一管理
* 
*/

module Pro
{
	export class ShopDataMgrBase
	{
		constructor()
		{

		}

		//------------------------------自定义代码段-------------------------------------
		public _shopInfo: Pb_God.PBPlayerShop;
		/** 固定商店商品限购次数 */
		protected _fixShopBuyCountDatas = new ds.StringMap<number>();
		/** 随机商店数据 */
		protected _randShopDatas = new ds.StringMap<Pb_God.PBPlayerRandShop>();

		/** 初始化 */
		public init(info: Pb_God.PBPlayerShop)
		{
			this._shopInfo = info;
			//把固定商店限购次数数组转换成唯一映射 ，方便查询
			this._fixShopBuyCountDatas.clear();
			for (let fixshopElement of info.fixshop)
			{
				for (let buycountData of fixshopElement.buycount)
				{
					let shopId = cfg.ShopFixShopCfgData.getInfoByTypeAndIndex(fixshopElement.shoptype, buycountData.key).iD;
					this._fixShopBuyCountDatas.put(shopId, buycountData.value);
				}
			}
			//随机商店数据解析
			this._randShopDatas.clear();
			for (let el of info.randshop)
			{
				this._randShopDatas.put(el.shoptype, this.parseRandShopData(el));
			}

			this.initReddotModel();
		}

		/** 隔天重置 */
		public resetNewDay(): void
		{
			let keys = this._randShopDatas.getKeys();
			for (var key of keys)
			{
				let el = this._randShopDatas.get(key);
				el.daybuyrefreshcount = 0;
			}
			//固定商店购买次数重置
			let fixShopKeys = this._fixShopBuyCountDatas.getKeys();
			for (let shopId of fixShopKeys)
			{
				if (cfg.ShopFixShopCfgData.getDayBuyCountByID(parseInt(shopId)) > 0)
					this._fixShopBuyCountDatas.put(shopId, 0);
			}
			this.reddotModelZeroBuy.refresh(true);
			EventMgr.trigger(EventNotify.Shop_RefreshCount_Change)
		}
		/** 隔周重置 */
		public resetNewServerWeek(): void
		{
			//固定商店购买次数重置
			let fixShopKeys = this._fixShopBuyCountDatas.getKeys();
			for (let shopId of fixShopKeys)
			{
				if (cfg.ShopFixShopCfgData.getWeekBuyCountByID(parseInt(shopId)) > 0)
					this._fixShopBuyCountDatas.put(shopId, 0);
			}
		}

		protected parseRandShopData(randshopElement: Pb_God.PBPlayerRandShop): Pb_God.PBPlayerRandShop
		{
			let buyCountMaps = new ds.StringMap<number>();
			for (let buycountData of randshopElement.buycount)
			{
				buyCountMaps.put(buycountData.key, buycountData.value);
			}
			randshopElement["buyCountMaps"] = buyCountMaps;
			return randshopElement;
		}

		/** 根据固定商店商品id获取购买次数 */
		public getFixBuyCountById(id: number): number
		{
			let ret = this._fixShopBuyCountDatas.get(id);
			if (ret) return ret;
			return 0;
		}

		/** 获取随机商店数据 */
		public getRandShopData(shopType: number): Pb_God.PBPlayerRandShop
		{
			return this._randShopDatas.get(shopType);
		}

		/** 提示购买成功 */
		protected showSuccessTips(isRandomShop: boolean, id: number, buyCount: number): void
		{
			let shopCfgInfo = isRandomShop ? cfg.ShopRandPoolCfgData.getInfo(id) : cfg.ShopFixShopCfgData.getInfo(id);
			let needItem = ShopUtils.getNeedItemByCfgInfo(shopCfgInfo);
			let addItems = ShopUtils.getSellItemByCfgInfo(shopCfgInfo);
			//消耗
			if (!needItem || needItem.itemcount == 0)
			{
				for (let el of addItems) TipsUtils.showItemTips(el.itemid, el.itemcount);
			} else
			{
				// let addItem = addItems[0];
				// let addCount = addItem.itemcount * buyCount;
				// let addItemString = Global.getItemTipsString(addItem.itemid, addCount);
				// let needItemName = cfg.ItemCfgData.getNameById(needItem.itemid);
				// let needCount = needItem.itemcount * buyCount;
				// TipsUtils.showTipsByLanId("tips_msg62", needItemName, needCount, addItemString);
				let pos = new Point(Laya.stage.width / 2, Laya.stage.height / 2);
				EventMgr.trigger(Pro.EventNotify.Award_Effect_Fly, addItems[0], pos)
			}
		}



		/////////////////////////////////////////////////////
		////////////////// 红点  //////////////////////////
		/////////////////////////////////////////////////////
		/** 红点模型-0元礼包， 这里会把所有0元礼包汇集在一起，  */
		public reddotModelZeroBuy: RedDotModel = new RedDotModel;

		public exchangeShopReddotMode: RedDotModel = new RedDotModel;
		/**梦幻积分红点 */
		public integralShopReddotMode: RedDotModel = new RedDotModel;
		private initReddotModel(): void
		{
			this.reddotModelZeroBuy.cleanUp(true);
			let shopList = cfg.ShopFixShopCfgData.getDataArrayByShopType(Pb_God._emShopType.ShopType_NB);
			for (let shopCfgInfo of shopList)
			{
				//确认是不是免费
				if (shopCfgInfo.needItem && parseInt(shopCfgInfo.needItem.split("_")[1]) != 0) continue;
				this.reddotModelZeroBuy.addChildModel(shopCfgInfo.iD, null, shopCfgInfo).setupCheckMethod(this, this.checkZeroBuyReddot);
			}
			this.exchangeShopReddotMode.cleanUp(true);
			this.exchangeShopReddotMode.setSystemSwitchId(Pro.emSystemSwitchType.Seer);
			this.exchangeShopReddotMode.setPlayerItemsListener([CfgID.ItemID.ProphetScore]);
			this.exchangeShopReddotMode.setupCheckMethod(this, this.checkExchangeReddot);

			this.integralShopReddotMode.cleanUp(true);
			this.integralShopReddotMode.setSystemSwitchId(Pro.emSystemSwitchType.Seer);
			this.integralShopReddotMode.setPlayerItemsListener([Pb_God._emExpendType.ExpendType_DreamScore]);
			this.integralShopReddotMode.setupCheckMethod(this, this.integralExchangeReddot);


		}
		private checkZeroBuyReddot(reddot: RedDotModel): boolean
		{
			let shopInfo = reddot.bindData as cfg.ShopFixShopCfgInfo;
			let limitBuyCount = shopInfo.limitBuyCount || shopInfo.dayBuyCount || shopInfo.weekBuyCount || shopInfo.monthBuyCount || 0;
			if (limitBuyCount > 0 && ShopDataMgr.getFixBuyCountById(shopInfo.iD) >= limitBuyCount) return false;
			return true;
		}

		/** 梦幻商店 */
		private checkExchangeReddot(): boolean
		{
			let shopList = cfg.ShopFixShopCfgData.getDataArrayByShopType(Pb_God._emShopType.ShopType_Xianzhi);
			for (let shopCfgInfo of shopList)
			{
				let price = Number(Global.numberToTuckString(ShopUtils.getNeedItemByCfgInfo(shopCfgInfo).itemcount) || 0);
				if (price >= 30 && Global.getItemNum(CfgID.ItemID.ProphetScore) >= price)
				{
					return true;
				}
			}
			return false;
		}

		/** 梦幻积分 */
		private integralExchangeReddot(): boolean
		{
			for (var index = 0; index < CallDataMgr.getdreamJfenCallAry().length; index++)
			{
				let callList1 = cfg.PetCallCallCostCfgData.getNeedItemAryByTypeAndCount(CallDataMgr.getdreamJfenCallAry()[index], 1)[0];
				if (callList1.itemcount <= Global.getItemNum(Pb_God._emExpendType.ExpendType_DreamScore))
				{
					return true;
				}
			}
			return false;
		}
	}
}
