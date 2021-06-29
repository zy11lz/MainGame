
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
	export class PlatformData_auto extends PlatformDataMgrBase
	{
		constructor()
		{
			super()
			// 通用失败返回
			EventMgr.on(Cmd.S2C_Platform_Common.cmdName, this, this.onCommon)
			// 充值 PBChargeData
			EventMgr.on(Cmd.S2C_Platform_sanqi_charge.cmdName, this, this.onSanqi_charge)
			// 更新充值信息 PBChargeInfo
			EventMgr.on(Cmd.S2C_Platform_update_chargeinfo.cmdName, this, this.onUpdate_chargeinfo)
			// 更新充值信息 PBPlayerPlatform
			EventMgr.on(Cmd.S2C_Platform_SynCharge.cmdName, this, this.onSynCharge)
			// 切支付 PBPlatformMisc
			EventMgr.on(Cmd.S2C_Platform_MISC.cmdName, this, this.onMISC)
		}
		/*****
		 * 通用失败返回
		 * @param 
		 */
		protected onCommon(): void
		{

		}
		/*****
		 * 充值 PBChargeData
		 * @param PBChargeData
		 * 		uid			string	用户ID
		 * 		sid			uint32	服务器ID
		 * 		actorid			uint32	角色ID 
		 * 		orderno			string	游戏研发订单 id
		 * 		money			string	金额
		 * 		productid			uint32	商品ID 
		 * 		time			uint32	当前请求时间
		 * 		ordersign			string	订单sign
		 * 		orderitem			string	订单Item   商品ID*单价（分）*数量*商品名称*内购定义商品ID
		 * 		currencytype			string	国内版不传，海外版必传。如美元USD，默认人民币CNY
		 * 		version			string	版本号
		 * 		clientparam			ClientParam	客户端参数
		 */
		protected onSanqi_charge(value: Pb_God.PBChargeData): void
		{
			logE("onSanqi_charge:" + value);
			if (value.orderno == "" || value.orderno == null)
			{
				AlertShow.showSimpleAlert("充值订单信息异常，请联系客服，或稍后重试!1")
				var logMsg: string = "充值异常1，------> messContent: " + JSON.stringify(value);
				GameLaunch.PostClientLog(logMsg)
			} else
			{
				ThirdMgr.onPayGameNew(value);
			}
		}
		/*****
		 * 更新充值信息 PBChargeInfo
		 * @param PBChargeInfo
		 * 		groupid			uint32	商品组id
		 * 		firstbuytime			uint32	第一次购买时间
		 * 		lastbuytime			uint32	最近一次购买时间
		 * 		buycount			uint32	总购买次数
		 */
		protected onUpdate_chargeinfo(value: Pb_God.PBChargeInfo): void
		{
			this._chargeInfoMap.put(value.groupid, value);
		}
		/*****
		 * 更新充值信息 PBPlayerPlatform
		 * @param PBPlayerPlatform
		 * 		info			PBChargeInfo	商品购买信息
		 */
		protected onSynCharge(value: Pb_God.PBPlayerPlatform): void
		{
			this._chargeInfoMap = Global.listToStringMapData(value.info, "groupid");
		}
		/*****
		 * 切支付 PBPlatformMisc
		 * @param PBPlatformMisc
		 * 		misc			string	切支付url
		 */
		protected onMISC(value: Pb_God.PBPlatformMisc): void
		{
			logD("切支付url:" + value.misc);
			ThirdMgr.sdkSystem.showLog(value.misc);
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}