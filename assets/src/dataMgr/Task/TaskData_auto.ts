
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
	export class TaskData_auto extends TaskDataMgrBase
	{
		constructor()
		{
			super()
			// 	 完成任务返回		失败才返回
			EventMgr.on(Cmd.S2C_Task_CompleteAck.cmdName, this, this.onCompleteAck)
			//	 新增任务			PBG2CTaskUpdate
			EventMgr.on(Cmd.S2C_Task_Add.cmdName, this, this.onAdd)
			//	 更新任务参数		PBG2CTaskUpdate
			EventMgr.on(Cmd.S2C_Task_Syn.cmdName, this, this.onSyn)
		}
		/*****
		 * 	 完成任务返回		失败才返回
		 * @param 
		 */
		protected onCompleteAck(): void
		{

		}
		/*****
		 *	 新增任务			PBG2CTaskUpdate
		 * @param PBG2CTaskUpdate
		 * 		taskid			uint32	任务ID
		 * 		param			uint32	当前完成参数
		 */
		protected onAdd(value: Pb_God.PBG2CTaskUpdate): void
		{
		}
		/*****
		 *	 更新任务参数		PBG2CTaskUpdate
		 * @param PBG2CTaskUpdate
		 * 		taskid			uint32	任务ID
		 * 		param			uint32	当前完成参数
		 */
		protected onSyn(value: Pb_God.PBG2CTaskUpdate): void
		{
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}