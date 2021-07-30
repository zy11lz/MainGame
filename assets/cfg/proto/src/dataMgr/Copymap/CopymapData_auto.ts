
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
	export class CopymapData_auto extends CopymapDataMgrBase
	{
		constructor()
		{
			super()
			//通用返回(失败才返回)
			EventMgr.on(Cmd.S2C_Copymap_CommonAck.cmdName, this, this.onCommonAck)
			//同步副本数据 PBPlayerCopymapInfo
			EventMgr.on(Cmd.S2C_Copymap_SynInfo.cmdName, this, this.onSynInfo)
			//同步购买次数 PBPlayerCopymapInfo
			EventMgr.on(Cmd.S2C_Copymap_BuyCount.cmdName, this, this.onBuyCount)
		}
		/*****
		 *通用返回(失败才返回)
		 * @param 
		 */
		protected onCommonAck(): void
		{
			
		}
		/*****
		 *同步副本数据 PBPlayerCopymapInfo
		 * @param PBPlayerCopymapInfo
		 * 		copymaptype			uint32	副本类型
		 * 		dailyentercount			uint32	日进入次数
		 * 		maxsubtype			uint32	挑战的最大子类型
		 * 		daybuycount			uint32	购买的次数
		 */
		protected onSynInfo(value: Pb_God.PBPlayerCopymapInfo): void
		{
			
		}
		/*****
		 *同步购买次数 PBPlayerCopymapInfo
		 * @param PBPlayerCopymapInfo
		 * 		copymaptype			uint32	副本类型
		 * 		dailyentercount			uint32	日进入次数
		 * 		maxsubtype			uint32	挑战的最大子类型
		 * 		daybuycount			uint32	购买的次数
		 */
		protected onBuyCount(value: Pb_God.PBPlayerCopymapInfo): void
		{
			
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}