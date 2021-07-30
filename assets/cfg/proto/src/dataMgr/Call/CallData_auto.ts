
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
	export class CallData_auto extends CallDataMgrBase
	{
		constructor()
		{
			super()
			//	 通用失败返回
			EventMgr.on(Cmd.S2C_Call_Common.cmdName, this, this.onCommon)
			//	 更新召唤信息		PBPlayerCallInfo
			EventMgr.on(Cmd.S2C_Call_Update.cmdName, this, this.onUpdate)
			// 	 伙伴转换返回		PBPlayerCallChange
			EventMgr.on(Cmd.S2C_Call_Change.cmdName, this, this.onChange)
			// 	 伙伴转换保存返回	PBU32
			EventMgr.on(Cmd.S2C_Call_SaveChangeAck.cmdName, this, this.onSaveChangeAck)
			// 	 设置自动分解返回	PBU32
			EventMgr.on(Cmd.S2C_Call_AutoSplit.cmdName, this, this.onAutoSplit)
			// 	 固定伙伴转换返回	PBPlayerCallChange
			EventMgr.on(Cmd.S2C_Call_FixChange.cmdName, this, this.onFixChange)
		}
		/*****
		 *	 通用失败返回
		 * @param 
		 */
		protected onCommon(): void
		{
			
		}
		/*****
		 *	 更新召唤信息		PBPlayerCallInfo
		 * @param PBPlayerCallInfo
		 * 		calltype			uint32	 召唤类型
		 * 		netxfreetime			uint32	 表示可以召唤时间
		 * 		totalcount			uint32	 总召唤次数
		 * 		continuecount			uint32	 连续不出五星次数
		 * 		firstcontinuecount			uint32	 首次出五星的次数
		 */
		protected onUpdate(value: Pb_God.PBPlayerCallInfo): void
		{
			
		}
		/*****
		 * 	 伙伴转换返回		PBPlayerCallChange
		 * @param PBPlayerCallChange
		 * 		basechangesn			uint64	置换的基本英雄
		 * 		petid			uint32	伙伴ID
		 * 		star			uint32	伙伴星级
		 */
		protected onChange(value: Pb_God.PBPlayerCallChange): void
		{
			
		}
		/*****
		 * 	 伙伴转换保存返回	PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onSaveChangeAck(value: Pb_God.PBU32): void
		{
			
		}
		/*****
		 * 	 设置自动分解返回	PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onAutoSplit(value: Pb_God.PBU32): void
		{
			
		}
		/*****
		 * 	 固定伙伴转换返回	PBPlayerCallChange
		 * @param PBPlayerCallChange
		 * 		basechangesn			uint64	置换的基本英雄
		 * 		petid			uint32	伙伴ID
		 * 		star			uint32	伙伴星级
		 */
		protected onFixChange(value: Pb_God.PBPlayerCallChange): void
		{
			
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}