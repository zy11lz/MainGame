
/**
*
*  根据 proto 文件自动生成的代码
*
* 【**不可手动修改此类**】，
*
* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的proto文件】
*
* @author liuYang.AutoCreater
*
*/

module Pro
{
	export class ShopData_auto extends ShopDataMgrBase
	{
		constructor()
		{
			super()
			//	 通用错误返回
			EventMgr.on(Cmd.S2C_Shop_Common.cmdName, this, this.onCommon)
			//	 购买返回 			PBCAGShopBuy
			EventMgr.on(Cmd.S2C_Shop_Buy.cmdName, this, this.onBuy)
			//	 重置返回				PBPlayerFixShop
			EventMgr.on(Cmd.S2C_Shop_Reset.cmdName, this, this.onReset)
			//	 刷新返回				PBPlayerRandShop
			EventMgr.on(Cmd.S2C_Shop_Refresh.cmdName, this, this.onRefresh)
			//	 同步随机商店刷新次数	PBG2CSynRandRefreshCount
			EventMgr.on(Cmd.S2C_Shop_SynRandRefreshCount.cmdName, this, this.onSynRandRefreshCount)
		}
		/*****
		 *	 通用错误返回
		 * @param 
		 */
		protected onCommon(): void
		{

		}
		/*****
		 *	 购买返回 			PBCAGShopBuy
		 * @param PBCAGShopBuy
		 * 		shoptype			uint32	 商店类型
		 * 		id			uint32	 固定表示index, 随机商店表示pos(0开始)
		 * 		buycount			uint32	 购买次数
		 */
		protected onBuy(value: Pb_God.PBCAGShopBuy): void
		{
			if (value.shoptype > Pb_God._emShopType.ShopType_MaxFix)
			{ //随机商店
				let randData = this._randShopDatas.get(value.shoptype);
				if (!randData) return;
				let buyCountMaps = randData["buyCountMaps"];
				var count = buyCountMaps.get(value.id) || 0;
				count += value.buycount;
				buyCountMaps.put(value.id, count);
				let shopId = randData.refreshindex[value.id];
				if (value.shoptype == Pb_God._emShopType.ShopType_Sprite)
				{
					this.showSuccessTips(true, shopId, value.buycount);
				}else
				{
					let shopCfgInfo = cfg.ShopRandPoolCfgData.getInfo(shopId);
					let addItems = ShopUtils.getSellItemByCfgInfo(shopCfgInfo);
					let awardItems: cfg.AddItemInfo[] = [];
                    for (let i = 0; i < addItems.length; i++)
                    {
                        let additem: cfg.AddItemInfo = addItems[i];
						let additemInfo = new cfg.AddItemInfo();
						additemInfo.itemid = additem.itemid
						additemInfo.itemcount = additem.itemcount * value.buycount;
                        awardItems.push(additemInfo);
                    }
					AwardOpenUtils.showAwardOpen(awardItems, null);
				}
				EventMgr.trigger(EventNotify.Shop_BuyCount_changed, value.shoptype, value.id, count);
			} else
			{
				let shopId = cfg.ShopFixShopCfgData.getInfoByTypeAndIndex(value.shoptype, value.id).iD;
				var shopCount = this._fixShopBuyCountDatas.get(shopId) || 0;
				shopCount += value.buycount;
				this._fixShopBuyCountDatas.put(shopId, shopCount);
				// this.showSuccessTips(false, shopId, value.buycount);
				let shopCfgInfo = cfg.ShopFixShopCfgData.getInfo(shopId)
				let addItems = ShopUtils.getSellItemByCfgInfo(shopCfgInfo);
				if(value.shoptype != Pb_God._emShopType.ShopType_Common)
				{
					let awardItems: cfg.AddItemInfo[] = [];
                    for (let i = 0; i < addItems.length; i++)
                    {
                        let additem: cfg.AddItemInfo = addItems[i];
						let additemInfo = new cfg.AddItemInfo();
						additemInfo.itemid = additem.itemid
						additemInfo.itemcount = additem.itemcount * value.buycount;
                        awardItems.push(additemInfo);
                    }
					AwardOpenUtils.showAwardOpen(awardItems, null);
				}
				
				if (value.shoptype == Pb_God._emShopType.ShopType_NB) this.reddotModelZeroBuy.refresh(true);
				EventMgr.trigger(EventNotify.Shop_BuyCount_changed, value.shoptype, value.id, shopCount);
				EventMgr.trigger(EventNotify.Shop_FixBuyCount_changed, shopId); //有不同的作用
			}
		}
		/*****
		 *	 重置返回				PBPlayerFixShop
		 * @param PBPlayerFixShop
		 * 		shoptype			uint32	 商店类型
		 * 		buycount			PBU32U32	 购买次数 KEY:索引 value:次数
		 */
		protected onReset(value: Pb_God.PBPlayerFixShop): void
		{
			let map = new ds.StringMap<number>();
			for (var buycountData of value.buycount)
			{
				map.put(buycountData.key, buycountData.value);
			}
			let allFixShop = cfg.ShopFixShopCfgData.getDataArrayByShopType(value.shoptype);
			for (var element of allFixShop)
			{
				let shopId = cfg.ShopFixShopCfgData.getInfoByTypeAndIndex(value.shoptype, element.index).iD;
				this._fixShopBuyCountDatas.put(element.iD, map.get(element.index) || 0);
			}
			EventMgr.trigger(EventNotify.Shop_Reset, value.shoptype);
		}
		/*****
		 *	 刷新返回				PBPlayerRandShop
		 * @param PBPlayerRandShop
		 * 		shoptype			uint32	 商店类型
		 * 		freeleftcount			uint32	 免费刷新剩余次数
		 * 		nextfreetime			uint32	 下次免费刷新时间
		 * 		daybuyrefreshcount			uint32	 每日购买刷新次数
		 * 		refreshindex			uint32	 刷新的索引
		 * 		buycount			PBU32U32	 购买次数 KEY:位置(0开始) value:购买次数
		 * 		daybuycount			PBU32U32	 日限购 KEY:商品id value:购买次数
		 * 		weekbuycount			PBU32U32	 周限购 KEY:商品id value:购买次数
		 * 		monthbuycount			PBU32U32	 月限购 KEY:商品id value:购买次数
		 */
		protected onRefresh(value: Pb_God.PBPlayerRandShop): void
		{
			let randData = this.parseRandShopData(value);
			this._randShopDatas.put(value.shoptype, randData);
			if(!GuideMgr.Inst.getShowGuide()){
				Pro.TipsUtils.showTips(Global.getLangStr("shop_msg34"));
			}
			
			EventMgr.trigger(EventNotify.Shop_Refresh, randData);
		}
		/*****
		 *	 同步随机商店刷新次数	PBG2CSynRandRefreshCount
		 * @param PBG2CSynRandRefreshCount
		 * 		shoptype			uint32	 商店类型
		 * 		freeleftcount			uint32	 免费刷新剩余次数
		 * 		nextfreetime			uint32	 下次免费刷新时间
		 */
		protected onSynRandRefreshCount(value: Pb_God.PBG2CSynRandRefreshCount): void
		{
			let randData = this._randShopDatas.get(value.shoptype);
			if (!randData) return;
			randData.freeleftcount = value.freeleftcount;
			randData.nextfreetime = value.nextfreetime;
			EventMgr.trigger(EventNotify.Shop_RefreshCount_Change, randData);
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}