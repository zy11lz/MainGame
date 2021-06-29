
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
	export class TeamData_auto extends TeamDataMgrBase
	{
		constructor()
		{
			super()
			//	 通用				通用失败才返回
			EventMgr.on(Cmd.S2C_Team_Common.cmdName, this, this.onCommon)
			//	 返回队伍列表		PBG2CTeamList
			EventMgr.on(Cmd.S2C_Team_List.cmdName, this, this.onList)
			//	 同步队伍信息		PBTeamData
			EventMgr.on(Cmd.S2C_Team_SynData.cmdName, this, this.onSynData)
			//	 离开队伍返回
			EventMgr.on(Cmd.S2C_Team_Exit.cmdName, this, this.onExit)
			//	 设置队伍状态返回	PBCAGTeamSetStatus
			EventMgr.on(Cmd.S2C_Team_SetStatus.cmdName, this, this.onSetStatus)
		}
		/*****
		 *	 通用				通用失败才返回
		 * @param 
		 */
		protected onCommon(): void
		{

		}
		/*****
		 *	 返回队伍列表		PBG2CTeamList
		 * @param PBG2CTeamList
		 * 		teamlist			PBTeamBase	队伍列表
		 */
		protected onList(value: Pb_God.PBG2CTeamList): void
		{
			this.teamList = value.teamlist;
			EventMgr.trigger(EventNotify.Team_Changed);
		}
		/*****
		 *	 同步队伍信息		PBTeamData
		 * @param PBTeamData
		 * 		teamid			uint32	队伍ID
		 * 		targettype			uint32	目标类型
		 * 		targetid			uint32	队伍目标
		 * 		leaderid			uint32	队长ID
		 * 		fullauto			bool	是否队员满自动开启
		 * 		timeauto			bool	是否时间到自动开启
		 * 		members			PBTeamMember	成员列表
		 */
		protected onSynData(value: Pb_God.PBTeamData): void
		{
			this.teamData = value;
			EventMgr.trigger(EventNotify.Team_Changed);
		}
		/*****
		 *	 离开队伍返回
		 * @param 
		 */
		protected onExit(): void
		{
			this.teamData = null;
			EventMgr.trigger(EventNotify.Team_Changed, true);
		}
		/*****
		 *	 设置队伍状态返回	PBCAGTeamSetStatus
		 * @param PBCAGTeamSetStatus
		 * 		fullauto			bool	是否队员满自动开启
		 * 		timeauto			bool	是否时间到自动开启
		 */
		protected onSetStatus(value: Pb_God.PBCAGTeamSetStatus): void
		{
			EventMgr.trigger(EventNotify.Team_Changed);
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}