
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
			
		}
		/*****
		 *	 重置返回				PBPlayerFixShop
		 * @param PBPlayerFixShop
		 * 		shoptype			uint32	 商店类型
		 * 		buycount			PBU32U32	 购买次数 KEY:索引 value:次数
		 */
		protected onReset(value: Pb_God.PBPlayerFixShop): void
		{
			
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
			
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}