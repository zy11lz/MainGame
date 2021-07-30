
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
	export class ElementData_auto extends ElementDataMgrBase
	{
		constructor()
		{
			super()
			//通用返回(失败才返回)
			EventMgr.on(Cmd.S2C_Element_CommonAck.cmdName, this, this.onCommonAck)
			//更新次数				PBG2CElementUpdateCount
			EventMgr.on(Cmd.S2C_Element_UpdateCount.cmdName, this, this.onUpdateCount)
			//更新关卡				PBPlayerElementInfo
			EventMgr.on(Cmd.S2C_Element_UpdateStage.cmdName, this, this.onUpdateStage)
		}
		/*****
		 *通用返回(失败才返回)
		 * @param 
		 */
		protected onCommonAck(): void
		{
			
		}
		/*****
		 *更新次数				PBG2CElementUpdateCount
		 * @param PBG2CElementUpdateCount
		 * 		dayfightcount			uint32	 今日挑战次数
		 * 		daybuycount			uint32	 今日购买次数
		 */
		protected onUpdateCount(value: Pb_God.PBG2CElementUpdateCount): void
		{
			
		}
		/*****
		 *更新关卡				PBPlayerElementInfo
		 * @param PBPlayerElementInfo
		 * 		pettype			uint32	 类型
		 * 		maxstage			uint32	 历史最高关卡
		 * 		daymaxstage			uint32	 今日最高关卡
		 */
		protected onUpdateStage(value: Pb_God.PBPlayerElementInfo): void
		{
			
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}