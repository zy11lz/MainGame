
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
	export class ActivityData_auto extends ActivityDataMgrBase
	{
		constructor()
		{
			super()
			// 	 通用返回
			EventMgr.on(Cmd.S2C_Activity_Common_ACK.cmdName, this, this.onCommon_ACK)
			//     领取奖品返回             PBG2CActivityDrawReward
			EventMgr.on(Cmd.S2C_Activity_DrawReward.cmdName, this, this.onDrawReward)
			//     活动开始通知，活动ID     PBU32
			EventMgr.on(Cmd.S2C_Activity_Open.cmdName, this, this.onOpen)
			//     活动关闭通知，活动ID     PBU32
			EventMgr.on(Cmd.S2C_Activity_Close.cmdName, this, this.onClose)
			//     活动数据重置，活动ID     PBU32
			EventMgr.on(Cmd.S2C_Activity_Refresh.cmdName, this, this.onRefresh)
			//     返回当前活动的开始时间       PBG2CActivityStartTime
			EventMgr.on(Cmd.S2C_Activity_GetStartTime.cmdName, this, this.onGetStartTime)
			//     返回奖励物品的剩余数量   PBG2CActivityRewardNum
			EventMgr.on(Cmd.S2C_Activity_GetRewardNum.cmdName, this, this.onGetRewardNum)
			//     同步数据                 PBPlayerActivityData
			EventMgr.on(Cmd.S2C_Activity_Data.cmdName, this, this.onData)
			//     定制礼包预选商品         PBG2CActivityCustomGiftOrder 
			EventMgr.on(Cmd.S2C_Activity_CustomGiftOrder.cmdName, this, this.onCustomGiftOrder)
		}
		/*****
		 * 	 通用返回
		 * @param 
		 */
		protected onCommon_ACK(): void
		{
			
		}
		/*****
		 *     领取奖品返回             PBG2CActivityDrawReward
		 * @param PBG2CActivityDrawReward
		 * 		id			uint32	活动ID
		 * 		index			uint32	索引，对应活动配置表里的索引
		 * 		num			uint32	领取数量
		 */
		protected onDrawReward(value: Pb_God.PBG2CActivityDrawReward): void
		{
			
		}
		/*****
		 *     活动开始通知，活动ID     PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onOpen(value: Pb_God.PBU32): void
		{
			
		}
		/*****
		 *     活动关闭通知，活动ID     PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onClose(value: Pb_God.PBU32): void
		{
			
		}
		/*****
		 *     活动数据重置，活动ID     PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onRefresh(value: Pb_God.PBU32): void
		{
			
		}
		/*****
		 *     返回当前活动的开始时间       PBG2CActivityStartTime
		 * @param PBG2CActivityStartTime
		 * 		id			uint32	 活动的ID
		 * 		starttime			uint32	 活动的开启时间
		 */
		protected onGetStartTime(value: Pb_God.PBG2CActivityStartTime): void
		{
			
		}
		/*****
		 *     返回奖励物品的剩余数量   PBG2CActivityRewardNum
		 * @param PBG2CActivityRewardNum
		 * 		id			uint32	活动ID
		 * 		reward			PBU32U32	key是index，value 是num
		 */
		protected onGetRewardNum(value: Pb_God.PBG2CActivityRewardNum): void
		{
			
		}
		/*****
		 *     同步数据                 PBPlayerActivityData
		 * @param PBPlayerActivityData
		 * 		id			uint32	 活动ID
		 * 		resettime			uint32	 上次重置时间
		 * 		acquired			uint32	 已经获得的奖励索引
		 * 		data			PBU32U32	 数值
		 * 		indexdata			PBPlayerActivityIndexData	 针对每个奖励索引数值
		 */
		protected onData(value: Pb_God.PBPlayerActivityData): void
		{
			
		}
		/*****
		 *     定制礼包预选商品         PBG2CActivityCustomGiftOrder 
		 * @param PBG2CActivityCustomGiftOrder
		 */
		protected onCustomGiftOrder(value: Pb_God.PBG2CActivityCustomGiftOrder): void
		{
			
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}