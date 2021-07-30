
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
	export class LadderData_auto extends LadderDataMgrBase
	{
		constructor()
		{
			super()
			//失败才返回
			EventMgr.on(Cmd.S2C_Ladder_CommonAck.cmdName, this, this.onCommonAck)
			//同步信息			PBG2CLadderSynInfo	
			EventMgr.on(Cmd.S2C_Ladder_SynInfo.cmdName, this, this.onSynInfo)
			//刷新对手返回		PBG2CLadderRefreshAck
			EventMgr.on(Cmd.S2C_Ladder_RefreshAck.cmdName, this, this.onRefreshAck)
			//购买次数返回		PBU32
			EventMgr.on(Cmd.S2C_Ladder_BuyCountAck.cmdName, this, this.onBuyCountAck)
			//同步挑战从数		PBU32
			EventMgr.on(Cmd.S2C_Ladder_SynFightCount.cmdName, this, this.onSynFightCount)
			//战斗结果			PBG2CLadderResult
			EventMgr.on(Cmd.S2C_Ladder_FightResult.cmdName, this, this.onFightResult)
			//英雄殿返回		PBG2CLadderHeroTopAck
			EventMgr.on(Cmd.S2C_Ladder_HeroTopAck.cmdName, this, this.onHeroTopAck)
			//查询我的记录返回	PBG2CLadderRecordAck
			EventMgr.on(Cmd.S2C_Ladder_RecordAck.cmdName, this, this.onRecordAck)
			//查询大神记录返回	PBLadderPublicAllRecord
			EventMgr.on(Cmd.S2C_Ladder_PublicRecordAck.cmdName, this, this.onPublicRecordAck)
			//同步次数			PBU32
			EventMgr.on(Cmd.S2C_Ladder_SynCountAck.cmdName, this, this.onSynCountAck)
			//点赞英雄殿返回	PBG2CLike
			EventMgr.on(Cmd.S2C_Ladder_HeroTopLikeACK.cmdName, this, this.onHeroTopLikeACK)
			//查询玩家数据返回  PBLadderPlayerInfo
			EventMgr.on(Cmd.S2C_Ladder_QueryPlayerInfo.cmdName, this, this.onQueryPlayerInfo)
			//战斗开始	PBFightBase
			EventMgr.on(Cmd.BW2G_Ladder_FightBeginAck.cmdName, this, this.onFightBeginAck)
			//同步刷新对手	PBBW2GSynRefreshRank
			EventMgr.on(Cmd.BW2G_Ladder_SynRefreshRank.cmdName, this, this.onSynRefreshRank)
			//点赞英雄殿返回	PBG2CLike
			EventMgr.on(Cmd.BW2G_Ladder_Like.cmdName, this, this.onLike)
			//检查竞技场排名返回
			EventMgr.on(Cmd.W2G_Ladder_CheckRank.cmdName, this, this.onCheckRank)
		}
		/*****
		 *失败才返回
		 * @param 
		 */
		protected onCommonAck(): void
		{
			
		}
		/*****
		 *同步信息			PBG2CLadderSynInfo	
		 * @param PBG2CLadderSynInfo
		 * 		order			uint32	自己名次
		 * 		target			PBLadderObject	刷新的目标信息
		 */
		protected onSynInfo(value: Pb_God.PBG2CLadderSynInfo): void
		{
			
		}
		/*****
		 *刷新对手返回		PBG2CLadderRefreshAck
		 * @param PBG2CLadderRefreshAck
		 * 		target			PBLadderObject	对手基本信息
		 * 		nextrefreshtime			uint32	下次刷新时间
		 */
		protected onRefreshAck(value: Pb_God.PBG2CLadderRefreshAck): void
		{
			
		}
		/*****
		 *购买次数返回		PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onBuyCountAck(value: Pb_God.PBU32): void
		{
			
		}
		/*****
		 *同步挑战从数		PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onSynFightCount(value: Pb_God.PBU32): void
		{
			
		}
		/*****
		 *战斗结果			PBG2CLadderResult
		 * @param PBG2CLadderResult
		 * 		battlesn			uint64	挑战sn
		 * 		battletype			uint32	挑战类型
		 * 		id			uint32	挑战ID
		 * 		param			uint32	参数
		 * 		result			uint32	战斗结果 _emBattleResult
		 * 		iteminfo			PBItemInfo	奖励信息
		 * 		friend			PBLadderResultInfo	友方
		 * 		enermy			PBLadderResultInfo	敌方
		 */
		protected onFightResult(value: Pb_God.PBG2CLadderResult): void
		{
			
		}
		/*****
		 *英雄殿返回		PBG2CLadderHeroTopAck
		 * @param PBG2CLadderHeroTopAck
		 * 		herotop			PBLadderHeroTop	英雄殿
		 */
		protected onHeroTopAck(value: Pb_God.PBG2CLadderHeroTopAck): void
		{
			
		}
		/*****
		 *查询我的记录返回	PBG2CLadderRecordAck
		 * @param PBG2CLadderRecordAck
		 * 		record			PBPlayerLadderRecord	 记录
		 */
		protected onRecordAck(value: Pb_God.PBG2CLadderRecordAck): void
		{
			
		}
		/*****
		 *查询大神记录返回	PBLadderPublicAllRecord
		 * @param PBLadderPublicAllRecord
		 * 		groupid			uint32	组ID
		 * 		record			PBLadderPublicRecord	大神记录
		 */
		protected onPublicRecordAck(value: Pb_God.PBLadderPublicAllRecord): void
		{
			
		}
		/*****
		 *同步次数			PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onSynCountAck(value: Pb_God.PBU32): void
		{
			
		}
		/*****
		 *点赞英雄殿返回	PBG2CLike
		 * @param PBG2CLike
		 * 		playerid			uint32	player id
		 * 		robot			bool	是否是机器人
		 * 		likes			uint32	点赞数
		 */
		protected onHeroTopLikeACK(value: Pb_God.PBG2CLike): void
		{
			
		}
		/*****
		 *查询玩家数据返回  PBLadderPlayerInfo
		 * @param PBLadderPlayerInfo
		 * 		playerdisplay			PBPlayerDisplay	 player display
		 * 		defense			PBBattlePet	 防守阵容
		 * 		rank			uint32	 排名
		 * 		fightpower			uint32	 战斗力
		 * 		factionname			string	 公会名
		 * 		like			uint32	 点赞数
		 */
		protected onQueryPlayerInfo(value: Pb_God.PBLadderPlayerInfo): void
		{
			
		}
		/*****
		 *战斗开始	PBFightBase
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
		protected onFightBeginAck(value: Pb_God.PBFightBase): void
		{
			
		}
		/*****
		 *同步刷新对手	PBBW2GSynRefreshRank
		 * @param PBBW2GSynRefreshRank
		 * 		rank			uint32	 名次
		 */
		protected onSynRefreshRank(value: Pb_God.PBBW2GSynRefreshRank): void
		{
			
		}
		/*****
		 *点赞英雄殿返回	PBG2CLike
		 * @param PBG2CLike
		 * 		playerid			uint32	player id
		 * 		robot			bool	是否是机器人
		 * 		likes			uint32	点赞数
		 */
		protected onLike(value: Pb_God.PBG2CLike): void
		{
			
		}
		/*****
		 *检查竞技场排名返回
		 * @param 
		 */
		protected onCheckRank(): void
		{
			
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}