
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
	export class CrossChallengeData_auto extends CrossChallengeDataMgrBase
	{
		constructor()
		{
			super()
			//    失败才返回
			EventMgr.on(Cmd.S2C_CrossChallenge_Common_Ack.cmdName, this, this.onCommon_Ack)
			//    对手信息返回		                        PBCrossChallengeRefresh
			EventMgr.on(Cmd.S2C_CrossChallenge_Refresh.cmdName, this, this.onRefresh)
			//    领取每日宝箱返回	                        PBCrossChallengeDailyInfo
			EventMgr.on(Cmd.S2C_CrossChallenge_DailyPrize.cmdName, this, this.onDailyPrize)
			//	打开跨服竞技场返回						PBCrossChallengeOpenInfo
			EventMgr.on(Cmd.S2C_CrossChallenge_Open.cmdName, this, this.onOpen)
			//    查询玩家信息返回	                    	PBCrossChallengeInfo
			EventMgr.on(Cmd.S2C_CrossChallenge_Query.cmdName, this, this.onQuery)
			//    同步次数		                            PBU32
			EventMgr.on(Cmd.S2C_CrossChallenge_Count.cmdName, this, this.onCount)
			//    点赞返回(key : 玩家id, value : 点赞数)    PBU32U32 
			EventMgr.on(Cmd.S2C_CrossChallenge_HonourLike.cmdName, this, this.onHonourLike)
			//    挑战记录返回		                        PBCrossChallengerResults
			EventMgr.on(Cmd.S2C_CrossChallenge_Record.cmdName, this, this.onRecord)
			//	购买奖品返回 								PBU32
			EventMgr.on(Cmd.S2C_CrossChallenge_BuyPrize.cmdName, this, this.onBuyPrize)
			//	设置防御队伍返回							PBCrossChallengeSetTeamAck
			EventMgr.on(Cmd.S2C_CrossChallenge_SetTeamDEF.cmdName, this, this.onSetTeamDEF)
			//	战斗奖品									PBCrossChallengeFightPrize
			EventMgr.on(Cmd.S2C_CrossChallenge_Prize.cmdName, this, this.onPrize)
			//	设置进攻队伍返回							PBCrossChallengeSetTeamAck
			EventMgr.on(Cmd.S2C_CrossChallenge_SetTeamATK.cmdName, this, this.onSetTeamATK)
		}
		/*****
		 *    失败才返回
		 * @param 
		 */
		protected onCommon_Ack(): void
		{
			
		}
		/*****
		 *    对手信息返回		                        PBCrossChallengeRefresh
		 * @param PBCrossChallengeRefresh
		 * 		targets			PBCrossChallengeInfo	 对手信息
		 */
		protected onRefresh(value: Pb_God.PBCrossChallengeRefresh): void
		{
			
		}
		/*****
		 *    领取每日宝箱返回	                        PBCrossChallengeDailyInfo
		 * @param PBCrossChallengeDailyInfo
		 * 		dailyinfo			uint32	 索引
		 */
		protected onDailyPrize(value: Pb_God.PBCrossChallengeDailyInfo): void
		{
			
		}
		/*****
		 *	打开跨服竞技场返回						PBCrossChallengeOpenInfo
		 * @param PBCrossChallengeOpenInfo
		 * 		order			uint32	 名次
		 * 		score			uint32	 积分
		 * 		scoretime			uint32	 获得积分的时间
		 * 		openflag			uint32	 0：不开放挑战  1:开放挑战
		 * 		overtime			uint32	 对应倒计时时间
		 * 		self			PBCrossChallengeInfo	 自己信息
		 * 		targets			PBCrossChallengeInfo	 对手信息
		 * 		dailyinfo			uint32	 索引
		 * 		likeplayer			uint32	 今天点了赞的玩家，每日清理
		 * 		horourinfo			PBCrossChallengeHonourInfo	 赛季荣耀
		 * 		historyrank			uint32	 历史最高排名
		 * 		seasonindex			uint32	 赛季
		 */
		protected onOpen(value: Pb_God.PBCrossChallengeOpenInfo): void
		{
			
		}
		/*****
		 *    查询玩家信息返回	                    	PBCrossChallengeInfo
		 * @param PBCrossChallengeInfo
		 * 		id			uint32	 id
		 * 		display			PBPlayerDisplay	 玩家显示
		 * 		team			PBPlayerCrossChallengeTeamInfo	 队伍
		 * 		order			uint32	 名次
		 * 		score			uint32	 积分
		 * 		scoretime			uint32	 获得积分的时间
		 * 		like			uint32	 点赞数
		 * 		power			uint32	 战斗力
		 * 		robot			bool	 是否是机器人
		 * 		faction			string	 公会名
		 */
		protected onQuery(value: Pb_God.PBCrossChallengeInfo): void
		{
			
		}
		/*****
		 *    同步次数		                            PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onCount(value: Pb_God.PBU32): void
		{
			
		}
		/*****
		 *    点赞返回(key : 玩家id, value : 点赞数)    PBU32U32 
		 * @param PBU32U32
		 * 		key			uint32	
		 * 		value			uint32	 
		 */
		protected onHonourLike(value: Pb_God.PBU32U32): void
		{
			
		}
		/*****
		 *    挑战记录返回		                        PBCrossChallengerResults
		 * @param PBCrossChallengerResults
		 * 		results			PBCrossChallengerBattleResult	 战斗记录
		 */
		protected onRecord(value: Pb_God.PBCrossChallengerResults): void
		{
			
		}
		/*****
		 *	购买奖品返回 								PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onBuyPrize(value: Pb_God.PBU32): void
		{
			
		}
		/*****
		 *	设置防御队伍返回							PBCrossChallengeSetTeamAck
		 * @param PBCrossChallengeSetTeamAck
		 * 		team			PBPlayerZhenfaInfo	 队伍 3个
		 * 		hideteam			bool	 是否隐藏队伍 3个
		 * 		ok			bool	 第n队设置是否成功
		 */
		protected onSetTeamDEF(value: Pb_God.PBCrossChallengeSetTeamAck): void
		{
			
		}
		/*****
		 *	战斗奖品									PBCrossChallengeFightPrize
		 * @param PBCrossChallengeFightPrize
		 * 		index			uint32	奖品index
		 */
		protected onPrize(value: Pb_God.PBCrossChallengeFightPrize): void
		{
			
		}
		/*****
		 *	设置进攻队伍返回							PBCrossChallengeSetTeamAck
		 * @param PBCrossChallengeSetTeamAck
		 * 		team			PBPlayerZhenfaInfo	 队伍 3个
		 * 		hideteam			bool	 是否隐藏队伍 3个
		 * 		ok			bool	 第n队设置是否成功
		 */
		protected onSetTeamATK(value: Pb_God.PBCrossChallengeSetTeamAck): void
		{
			
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}