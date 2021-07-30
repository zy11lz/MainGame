
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
	export class LotteryData_auto extends LotteryDataMgrBase
	{
		constructor()
		{
			super()
			// 	 许愿回应 PBG2CLotteryRefresh
			EventMgr.on(Cmd.S2C_Lottery_Refresh.cmdName, this, this.onRefresh)
			// 	 许愿池设置请求 PBG2CLotteryPoolSet
			EventMgr.on(Cmd.S2C_Lottery_Pool_Set.cmdName, this, this.onPool_Set)
		}
		/*****
		 * 	 许愿回应 PBG2CLotteryRefresh
		 * @param PBG2CLotteryRefresh
		 * 		code			uint32	 返回结果 _emResultLottery
		 * 		data			PBPlayerLotteryData	 数据
		 * 		prizeItems			PBU32U32	 奖励物品列表
		 */
		protected onRefresh(value: Pb_God.PBG2CLotteryRefresh): void
		{
			
		}
		/*****
		 * 	 许愿池设置请求 PBG2CLotteryPoolSet
		 * @param PBG2CLotteryPoolSet
		 * 		code			uint32	 结果 _emResultLottery
		 * 		data			PBPlayerLotteryData	 数据
		 */
		protected onPool_Set(value: Pb_God.PBG2CLotteryPoolSet): void
		{
			
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}