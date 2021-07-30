
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
	export class ChallengeData_auto extends ChallengeDataMgrBase
	{
		constructor()
		{
			super()
			//失败才返回
			EventMgr.on(Cmd.S2C_Challenge_Common_Ack.cmdName, this, this.onCommon_Ack)
			//对手信息返回		PBG2CChallengeTargetAck
			EventMgr.on(Cmd.S2C_Challenge_Target_Ack.cmdName, this, this.onTarget_Ack)
			//领取周宝箱返回	PBU32
			EventMgr.on(Cmd.S2C_Challenge_WeekPrize.cmdName, this, this.onWeekPrize)
			//自己的排行信息	PBG2CChallengeTopInfo
			EventMgr.on(Cmd.S2C_Challenge_OpenSyn.cmdName, this, this.onOpenSyn)
			//同步进入次数		PBG2CChallengeSynEnterCount
			EventMgr.on(Cmd.S2C_Challenge_SynEnterCount.cmdName, this, this.onSynEnterCount)
			//被点赞次数		PBChallengeLikeAck
			EventMgr.on(Cmd.S2C_Challenge_LikeNum.cmdName, this, this.onLikeNum)
			//点赞次数		PBU32
			EventMgr.on(Cmd.S2C_Challenge_LikeNumToPlayer.cmdName, this, this.onLikeNumToPlayer)
			//对手信息返回		PBG2CChallengeTargetInfo
			EventMgr.on(Cmd.S2C_Challenge_Target_PlayerInfo.cmdName, this, this.onTarget_PlayerInfo)
			//点赞返回			PBU32
			EventMgr.on(Cmd.S2C_Challenge_Like.cmdName, this, this.onLike)
		}
		/*****
		 *失败才返回
		 * @param 
		 */
		protected onCommon_Ack(): void
		{
			
		}
		/*****
		 *对手信息返回		PBG2CChallengeTargetAck
		 * @param PBG2CChallengeTargetAck
		 * 		order			uint32	自己名次
		 * 		target			PBChallengeObject	对手基本信息
		 */
		protected onTarget_Ack(value: Pb_God.PBG2CChallengeTargetAck): void
		{
			
		}
		/*****
		 *领取周宝箱返回	PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onWeekPrize(value: Pb_God.PBU32): void
		{
			
		}
		/*****
		 *自己的排行信息	PBG2CChallengeTopInfo
		 * @param PBG2CChallengeTopInfo
		 * 		order			uint32	自己名次
		 * 		score			uint32	积分
		 */
		protected onOpenSyn(value: Pb_God.PBG2CChallengeTopInfo): void
		{
			
		}
		/*****
		 *同步进入次数		PBG2CChallengeSynEnterCount
		 * @param PBG2CChallengeSynEnterCount
		 * 		daycount			uint32	日次数
		 * 		weekcount			uint32	周次数
		 */
		protected onSynEnterCount(value: Pb_God.PBG2CChallengeSynEnterCount): void
		{
			
		}
		/*****
		 *被点赞次数		PBChallengeLikeAck
		 * @param PBChallengeLikeAck
		 * 		playerID			uint32	玩家id
		 * 		likeNum			uint32	次数
		 */
		protected onLikeNum(value: Pb_God.PBChallengeLikeAck): void
		{
			
		}
		/*****
		 *点赞次数		PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onLikeNumToPlayer(value: Pb_God.PBU32): void
		{
			
		}
		/*****
		 *对手信息返回		PBG2CChallengeTargetInfo
		 * @param PBG2CChallengeTargetInfo
		 * 		order			uint32	自己名次
		 * 		target			PBChallengeObject	对手基本信息
		 */
		protected onTarget_PlayerInfo(value: Pb_God.PBG2CChallengeTargetInfo): void
		{
			
		}
		/*****
		 *点赞返回			PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onLike(value: Pb_God.PBU32): void
		{
			
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}