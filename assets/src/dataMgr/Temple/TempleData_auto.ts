
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
	export class TempleData_auto extends TempleDataMgrBase
	{
		constructor()
		{
			super()
			//通用返回(失败才返回)
			EventMgr.on(Cmd.S2C_Temple_CommonAck.cmdName, this, this.onCommonAck)
			//同步所有信息			PBG2CTempleSynAll
			EventMgr.on(Cmd.S2C_Temple_SynAll.cmdName, this, this.onSynAll)
			//查看记录返回 		PBG2CTempleQueryRecord
			EventMgr.on(Cmd.S2C_Temple_QueryRecord.cmdName, this, this.onQueryRecord)
			//同步数据 			PBPlayerTemple
			EventMgr.on(Cmd.S2C_Temple_Syn.cmdName, this, this.onSyn)
		}
		/*****
		 *通用返回(失败才返回)
		 * @param 
		 */
		protected onCommonAck(): void
		{

		}
		/*****
		 *同步所有信息			PBG2CTempleSynAll
		 * @param PBG2CTempleSynAll
		 * 		baseinfo			PBTempleInfoBase	神殿基本数据
		 */
		protected onSynAll(value: Pb_God.PBG2CTempleSynAll): void
		{
			this.listToMap(value.baseinfo);
		}
		/*****
		 *查看记录返回 		PBG2CTempleQueryRecord
		 * @param PBG2CTempleQueryRecord
		 * 		id			uint32	 神殿ID
		 * 		record			PBTempleRecord	 挑战记录
		 */
		protected onQueryRecord(value: Pb_God.PBG2CTempleQueryRecord): void
		{

		}
		/*****
		 *同步数据 			PBPlayerTemple
		 * @param PBPlayerTemple
		 * 		nextfighttime			uint32	下次战斗时间
		 */
		protected onSyn(value: Pb_God.PBPlayerTemple): void
		{
			this.limitOverTime = value.nextfighttime;
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}