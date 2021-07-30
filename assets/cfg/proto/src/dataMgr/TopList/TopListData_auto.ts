
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
	export class TopListData_auto extends TopListDataMgrBase
	{
		constructor()
		{
			super()
			//排行榜列表返回	PBS2CTopListList	
			EventMgr.on(Cmd.S2C_TopList_List_Ack.cmdName, this, this.onList_Ack)
			//帮派排行榜列表返回	PBS2CFactionTopList
			EventMgr.on(Cmd.S2C_TopList_FactionList_Ack.cmdName, this, this.onFactionList_Ack)
			//所有世界排行	PBS2CAllTopList
			EventMgr.on(Cmd.S2C_TopList_WorldAll_Ack.cmdName, this, this.onWorldAll_Ack)
			//所有跨服排行	PBS2CAllTopList
			EventMgr.on(Cmd.S2C_TopList_BWAll_Ack.cmdName, this, this.onBWAll_Ack)
			//自己排名信息	PBTopListDetail
			EventMgr.on(Cmd.S2C_TopList_GetSelf_Ack.cmdName, this, this.onGetSelf_Ack)
			//返回奖励索引	PBS2CRewardID 
			EventMgr.on(Cmd.S2C_TopList_RewardID.cmdName, this, this.onRewardID)
		}
		/*****
		 *排行榜列表返回	PBS2CTopListList	
		 * @param PBS2CTopListList
		 * 		ask			PBC2GTopListList	前端发过来的请求信息(方便前端 做界面处理)
		 * 		allcount			uint32	入榜的全部角色数量
		 * 		list			PBTopListDetail	角色列表
		 * 		selfinfo			PBTopListDetail	自己信息
		 */
		protected onList_Ack(value: Pb_God.PBS2CTopListList): void
		{
			
		}
		/*****
		 *帮派排行榜列表返回	PBS2CFactionTopList
		 * @param PBS2CFactionTopList
		 * 		type			uint32	排行类型 _emTopListType
		 * 		beginorder			uint32	开始排行
		 * 		count			uint32	请求数量
		 * 		playerid			uint32	玩家ID
		 * 		worldid			uint32	世界ID
		 * 		allcount			uint32	入榜的全部角色数量
		 * 		list			PBFactionTop	帮派列表
		 * 		selfinfo			PBFactionTop	自己信息
		 */
		protected onFactionList_Ack(value: Pb_God.PBS2CFactionTopList): void
		{
			
		}
		/*****
		 *所有世界排行	PBS2CAllTopList
		 * @param PBS2CAllTopList
		 * 		detail			PBTopListDetail	所有排行信息
		 * 		factiontop			PBFactionTop	帮派信息 
		 */
		protected onWorldAll_Ack(value: Pb_God.PBS2CAllTopList): void
		{
			
		}
		/*****
		 *所有跨服排行	PBS2CAllTopList
		 * @param PBS2CAllTopList
		 * 		detail			PBTopListDetail	所有排行信息
		 * 		factiontop			PBFactionTop	帮派信息 
		 */
		protected onBWAll_Ack(value: Pb_God.PBS2CAllTopList): void
		{
			
		}
		/*****
		 *自己排名信息	PBTopListDetail
		 * @param PBTopListDetail
		 * 		playerdisplay			PBPlayerDisplay	用户标记
		 * 		info			PBTopListInfo	排行数值
		 * 		commonData			PBTopListCommonData	一些公用数据
		 * 		challengeData			PBTopListChallengeData	竞技场数据
		 */
		protected onGetSelf_Ack(value: Pb_God.PBTopListDetail): void
		{
			
		}
		/*****
		 *返回奖励索引	PBS2CRewardID 
		 * @param PBS2CRewardID
		 * 		type			uint32	排行类型 _emTopListType
		 * 		RewardID			uint32	榜单奖励索引
		 */
		protected onRewardID(value: Pb_God.PBS2CRewardID): void
		{
			
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}