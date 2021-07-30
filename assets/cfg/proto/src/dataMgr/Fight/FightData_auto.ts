
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
	export class FightData_auto extends FightDataMgrBase
	{
		constructor()
		{
			super()
			//通用失败返回
			EventMgr.on(Cmd.S2C_Fight_Common_Ack.cmdName, this, this.onCommon_Ack)
			//普通战斗返回			PBFightBase
			EventMgr.on(Cmd.S2C_Fight_NormalBegin_Ack.cmdName, this, this.onNormalBegin_Ack)
			//普通战斗结果			PBFightResult
			EventMgr.on(Cmd.S2C_Fight_NormalResult_Ack.cmdName, this, this.onNormalResult_Ack)
			//加载正在进行的战斗	PBFightResult
			EventMgr.on(Cmd.S2C_Fight_LoadIng.cmdName, this, this.onLoadIng)
			//无尽继续返回			PBFightResult
			EventMgr.on(Cmd.S2C_Fight_EndlessContinue_Ack.cmdName, this, this.onEndlessContinue_Ack)
		}
		/*****
		 *通用失败返回
		 * @param 
		 */
		protected onCommon_Ack(): void
		{
			
		}
		/*****
		 *普通战斗返回			PBFightBase
		 * @param PBFightBase
		 * 		battlesn			uint64	流水ID
		 * 		battletype			uint32	战斗类型_emBattleType
		 * 		id			uint32	挑战ID
		 * 		param			uint32	参数
		 * 		randid			uint32	随机种子
		 * 		begintime			uint32	开始时间
		 * 		maxround			uint32	最大回合
		 * 		friend			PBPlayerBattleInfo	伙伴
		 * 		energy			PBPlayerBattleInfo	敌方
		 * 		playback			PBFightPlayback	战斗回放
		 * 		num			uint32	同一对手的第几次战斗
		 * 		clientparam			string	客户端参数
		 * 		serverparam			uint32	服务器参数
		 */
		protected onNormalBegin_Ack(value: Pb_God.PBFightBase): void
		{
			
		}
		/*****
		 *普通战斗结果			PBFightResult
		 * @param PBFightResult
		 * 		base			PBFightBase	战斗公共
		 * 		round			uint32	回合数
		 * 		result			uint32	战斗结果 _emBattleResult
		 * 		endtime			uint32	战斗结束时间
		 * 		friendstate			PBPetFightStateInfo	友方状态
		 * 		energystate			PBPetFightStateInfo	敌方状态
		 * 		prize			PBItemInfo	战斗奖励
		 * 		achieve			PBU32U32	成就数据(服务器用)
		 * 		challengeresult			PBFightChallengeResult	竞技场战斗结果
		 * 		danresult			PBFightDanResult	超凡段位赛结果
		 * 		ladderresult			PBFightLadderResult	跨服天梯结果
		 * 		friendartifactstate			PBPetFightStateInfo	我发神器状态
		 * 		enemyartifactstate			PBPetFightStateInfo	敌方神器状态
		 * 		heavenresult			PBFightHeavenResult	天界副本结果
		 * 		crosschallengeresult			PBFightCrossChallengeResult	跨服竞技场战斗结果
		 */
		protected onNormalResult_Ack(value: Pb_God.PBFightResult): void
		{
			
		}
		/*****
		 *加载正在进行的战斗	PBFightResult
		 * @param PBFightResult
		 * 		base			PBFightBase	战斗公共
		 * 		round			uint32	回合数
		 * 		result			uint32	战斗结果 _emBattleResult
		 * 		endtime			uint32	战斗结束时间
		 * 		friendstate			PBPetFightStateInfo	友方状态
		 * 		energystate			PBPetFightStateInfo	敌方状态
		 * 		prize			PBItemInfo	战斗奖励
		 * 		achieve			PBU32U32	成就数据(服务器用)
		 * 		challengeresult			PBFightChallengeResult	竞技场战斗结果
		 * 		danresult			PBFightDanResult	超凡段位赛结果
		 * 		ladderresult			PBFightLadderResult	跨服天梯结果
		 * 		friendartifactstate			PBPetFightStateInfo	我发神器状态
		 * 		enemyartifactstate			PBPetFightStateInfo	敌方神器状态
		 * 		heavenresult			PBFightHeavenResult	天界副本结果
		 * 		crosschallengeresult			PBFightCrossChallengeResult	跨服竞技场战斗结果
		 */
		protected onLoadIng(value: Pb_God.PBFightResult): void
		{
			
		}
		/*****
		 *无尽继续返回			PBFightResult
		 * @param PBFightResult
		 * 		base			PBFightBase	战斗公共
		 * 		round			uint32	回合数
		 * 		result			uint32	战斗结果 _emBattleResult
		 * 		endtime			uint32	战斗结束时间
		 * 		friendstate			PBPetFightStateInfo	友方状态
		 * 		energystate			PBPetFightStateInfo	敌方状态
		 * 		prize			PBItemInfo	战斗奖励
		 * 		achieve			PBU32U32	成就数据(服务器用)
		 * 		challengeresult			PBFightChallengeResult	竞技场战斗结果
		 * 		danresult			PBFightDanResult	超凡段位赛结果
		 * 		ladderresult			PBFightLadderResult	跨服天梯结果
		 * 		friendartifactstate			PBPetFightStateInfo	我发神器状态
		 * 		enemyartifactstate			PBPetFightStateInfo	敌方神器状态
		 * 		heavenresult			PBFightHeavenResult	天界副本结果
		 * 		crosschallengeresult			PBFightCrossChallengeResult	跨服竞技场战斗结果
		 */
		protected onEndlessContinue_Ack(value: Pb_God.PBFightResult): void
		{
			
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}