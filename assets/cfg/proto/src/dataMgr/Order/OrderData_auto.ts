
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
	export class OrderData_auto extends OrderDataMgrBase
	{
		constructor()
		{
			super()
			//失败才返回
			EventMgr.on(Cmd.S2C_Order_Common_Ack.cmdName, this, this.onCommon_Ack)
			//返回地址数据 PBAddrData
			EventMgr.on(Cmd.S2C_Order_AddrData.cmdName, this, this.onAddrData)
			//返回订单数据 PBOrderData
			EventMgr.on(Cmd.S2C_Order_OrderData.cmdName, this, this.onOrderData)
			//返回最新的订单信息 PBOrderInfo
			EventMgr.on(Cmd.S2C_Order_OneNewOrder.cmdName, this, this.onOneNewOrder)
		}
		/*****
		 *失败才返回
		 * @param 
		 */
		protected onCommon_Ack(): void
		{
			
		}
		/*****
		 *返回地址数据 PBAddrData
		 * @param PBAddrData
		 * 		addrinfo			PBAddrInfo	地址数据
		 * 		defaultid			uint32	默认地址id
		 */
		protected onAddrData(value: Pb_God.PBAddrData): void
		{
			
		}
		/*****
		 *返回订单数据 PBOrderData
		 * @param PBOrderData
		 * 		orderinfo			PBOrderInfo	订单数据
		 */
		protected onOrderData(value: Pb_God.PBOrderData): void
		{
			
		}
		/*****
		 *返回最新的订单信息 PBOrderInfo
		 * @param PBOrderInfo
		 * 		ordersn			string	游戏订单流水
		 * 		type			uint32	订单类型 _emOrderType
		 * 		status			uint32	0未确认地址，1已确认地址
		 * 		completedtime			uint32	确认时间
		 * 		ordertime			uint32	游戏订单时间
		 * 		chargeid			uint32	商品id
		 * 		chargename			string	商品名字
		 * 		chargeamount			uint32	商品金额
		 * 		addrinfo			PBAddrInfo	地址信息 PBAddrInfo
		 */
		protected onOneNewOrder(value: Pb_God.PBOrderInfo): void
		{
			
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}