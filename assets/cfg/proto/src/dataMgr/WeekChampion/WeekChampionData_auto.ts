
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
	export class WeekChampionData_auto extends WeekChampionDataMgrBase
	{
		constructor()
		{
			super()
			//失败才返回
			EventMgr.on(Cmd.S2C_WeekChampion_Common_Ack.cmdName, this, this.onCommon_Ack)
			//我的竞猜返回		PBG2CChampionSelfGuessAck
			EventMgr.on(Cmd.S2C_WeekChampion_SelfGuessAck.cmdName, this, this.onSelfGuessAck)
			//查询竞猜返回		PBG2CChampionQueryGuessAck
			EventMgr.on(Cmd.S2C_WeekChampion_QueryGuessAck.cmdName, this, this.onQueryGuessAck)
			//竞猜下注同步返回	PBG2CChampionSynGuessAck
			EventMgr.on(Cmd.S2C_WeekChampion_SysGuessAck.cmdName, this, this.onSysGuessAck)
			//查询32强返回		PBG2CChampionQuery32ListAck
			EventMgr.on(Cmd.S2C_WeekChampion_Query32ListAck.cmdName, this, this.onQuery32ListAck)
			//查询4强返回		PBG2CChampionQuery4ListAck
			EventMgr.on(Cmd.S2C_WeekChampion_Query4ListAck.cmdName, this, this.onQuery4ListAck)
			//我的竞猜记录		PBChampionGuessRecord
			EventMgr.on(Cmd.S2C_WeekChampion_GuessRecordAck.cmdName, this, this.onGuessRecordAck)
			//我的战斗记录		PBChampionFightRecord
			EventMgr.on(Cmd.S2C_WeekChampion_FightRecordAck.cmdName, this, this.onFightRecordAck)
			//发送弹幕返回		无内容
			EventMgr.on(Cmd.S2C_WeekChampion_SendDanmuAck.cmdName, this, this.onSendDanmuAck)
			//竞猜结果			PBG2CChampionGuessResultAck
			EventMgr.on(Cmd.S2C_WeekChampion_GuessReusltAck.cmdName, this, this.onGuessReusltAck)
			//查询弹幕返回		PBG2CChampionQueryDanmuAck
			EventMgr.on(Cmd.S2C_WeekChampion_QueryDanmuAck.cmdName, this, this.onQueryDanmuAck)
			//打开返回			PBG2CChampionOpenAck
			EventMgr.on(Cmd.S2C_WeekChampion_OpenAck.cmdName, this, this.onOpenAck)
			//我的结算结果		PBG2CChampionEndResultAck
			EventMgr.on(Cmd.S2C_WeekChampion_EndResultAck.cmdName, this, this.onEndResultAck)
			//查看对战信息		PBChampionBattle
			EventMgr.on(Cmd.S2C_WeekChampion_QueryBattleInfo.cmdName, this, this.onQueryBattleInfo)
			//同步状态			PBG2CChampionSynState
			EventMgr.on(Cmd.S2C_WeekChampion_SynState.cmdName, this, this.onSynState)
			//同步排行结果		PBG2CChampionSynTopResult
			EventMgr.on(Cmd.S2C_WeekChampion_SynTopResult.cmdName, this, this.onSynTopResult)
			//查询对应回合数据	PBG2CChampionQueryRoundAck
			EventMgr.on(Cmd.S2C_WeekChampion_QueryRoundAck.cmdName, this, this.onQueryRoundAck)
			//点赞返回			PBU32U32
			EventMgr.on(Cmd.S2C_WeekChampion_Like.cmdName, this, this.onLike)
		}
		/*****
		 *失败才返回
		 * @param 
		 */
		protected onCommon_Ack(): void
		{
			
		}
		/*****
		 *我的竞猜返回		PBG2CChampionSelfGuessAck
		 * @param PBG2CChampionSelfGuessAck
		 * 		begintime			uint32	开始时间
		 * 		round			uint32	回合ID_emChampionRound
		 * 		state			uint32	状态_emChampionState
		 * 		battle			PBChampionBattle	战斗显示
		 */
		protected onSelfGuessAck(value: Pb_God.PBG2CChampionSelfGuessAck): void
		{
			
		}
		/*****
		 *查询竞猜返回		PBG2CChampionQueryGuessAck
		 * @param PBG2CChampionQueryGuessAck
		 * 		begintime			uint32	开始时间
		 * 		round			uint32	回合ID_emChampionRound
		 * 		state			uint32	状态_emChampionState
		 * 		battle			PBChampionBattle	战斗显示
		 * 		guesscoin			uint32	竞猜币
		 * 		leftodds			uint32	左边赔率 扩大一百倍
		 * 		rightodds			uint32	右边赔率 扩大一百倍
		 */
		protected onQueryGuessAck(value: Pb_God.PBG2CChampionQueryGuessAck): void
		{
			
		}
		/*****
		 *竞猜下注同步返回	PBG2CChampionSynGuessAck
		 * @param PBG2CChampionSynGuessAck
		 * 		leftodds			uint32	左边赔率 扩大一百倍
		 * 		rightodds			uint32	右边赔率 扩大一百倍
		 * 		guessplayerid			uint32	下注的目标ID
		 * 		guesscoin			uint32	剩余的竞猜币
		 */
		protected onSysGuessAck(value: Pb_God.PBG2CChampionSynGuessAck): void
		{
			
		}
		/*****
		 *查询32强返回		PBG2CChampionQuery32ListAck
		 * @param PBG2CChampionQuery32ListAck
		 * 		begintime			uint32	开始时间
		 * 		round			uint32	回合ID_emChampionRound
		 * 		state			uint32	状态_emChampionState
		 * 		areaid			uint32	赛区ID
		 * 		list			PBChampionFight32	列表
		 */
		protected onQuery32ListAck(value: Pb_God.PBG2CChampionQuery32ListAck): void
		{
			
		}
		/*****
		 *查询4强返回		PBG2CChampionQuery4ListAck
		 * @param PBG2CChampionQuery4ListAck
		 * 		begintime			uint32	开始时间
		 * 		round			uint32	回合ID_emChampionRound
		 * 		state			uint32	状态_emChampionState
		 * 		areaid			uint32	赛区ID
		 * 		list			PBChampionFight4	列表
		 */
		protected onQuery4ListAck(value: Pb_God.PBG2CChampionQuery4ListAck): void
		{
			
		}
		/*****
		 *我的竞猜记录		PBChampionGuessRecord
		 * @param PBChampionGuessRecord
		 * 		record			PBChampionGuessRecordInfo	记录
		 * 		recording			PBChampionGuessRecordIng	正在竞猜记录
		 */
		protected onGuessRecordAck(value: Pb_God.PBChampionGuessRecord): void
		{
			
		}
		/*****
		 *我的战斗记录		PBChampionFightRecord
		 * @param PBChampionFightRecord
		 * 		record			PBChampionFightRecordInfo	记录
		 */
		protected onFightRecordAck(value: Pb_God.PBChampionFightRecord): void
		{
			
		}
		/*****
		 *发送弹幕返回		无内容
		 * @param 
		 */
		protected onSendDanmuAck(): void
		{
			
		}
		/*****
		 *竞猜结果			PBG2CChampionGuessResultAck
		 * @param PBG2CChampionGuessResultAck
		 * 		iswin			bool	是否成功
		 * 		addguesscoin			int32	增加的竞猜币 负数表示扣除
		 * 		guesscoin			uint32	剩余的竞猜币
		 */
		protected onGuessReusltAck(value: Pb_God.PBG2CChampionGuessResultAck): void
		{
			
		}
		/*****
		 *查询弹幕返回		PBG2CChampionQueryDanmuAck
		 * @param PBG2CChampionQueryDanmuAck
		 * 		danmu			PBChampionDanmu	列表
		 */
		protected onQueryDanmuAck(value: Pb_God.PBG2CChampionQueryDanmuAck): void
		{
			
		}
		/*****
		 *打开返回			PBG2CChampionOpenAck
		 * @param PBG2CChampionOpenAck
		 * 		begintime			uint32	开始时间
		 * 		round			uint32	回合ID_emChampionRound
		 * 		state			uint32	状态_emChampionState
		 * 		endtime			uint32	状态结束时间
		 * 		currank			uint32	当前名次
		 * 		maxrank			uint32	最高名次
		 */
		protected onOpenAck(value: Pb_God.PBG2CChampionOpenAck): void
		{
			
		}
		/*****
		 *我的结算结果		PBG2CChampionEndResultAck
		 * @param PBG2CChampionEndResultAck
		 * 		rank			uint32	名次
		 * 		fightcount			uint32	比赛场次
		 * 		wincount			uint32	胜场输
		 */
		protected onEndResultAck(value: Pb_God.PBG2CChampionEndResultAck): void
		{
			
		}
		/*****
		 *查看对战信息		PBChampionBattle
		 * @param PBChampionBattle
		 * 		leftbattle			PBBattleDisplay	左边显示
		 * 		rightbattle			PBBattleDisplay	右边显示
		 * 		battlesn			uint64	战斗SN
		 * 		winplayerid			uint32	胜利玩家ID
		 * 		roundid			uint32	回合ID
		 */
		protected onQueryBattleInfo(value: Pb_God.PBChampionBattle): void
		{
			
		}
		/*****
		 *同步状态			PBG2CChampionSynState
		 * @param PBG2CChampionSynState
		 * 		begintime			uint32	开始时间
		 * 		round			uint32	回合ID_emChampionRound
		 * 		state			uint32	状态_emChampionState
		 * 		endtime			uint32	状态结束的时间
		 */
		protected onSynState(value: Pb_God.PBG2CChampionSynState): void
		{
			
		}
		/*****
		 *同步排行结果		PBG2CChampionSynTopResult
		 * @param PBG2CChampionSynTopResult
		 * 		begintime			uint32	开始时间
		 * 		display			PBPlayerDisplay	排名
		 */
		protected onSynTopResult(value: Pb_God.PBG2CChampionSynTopResult): void
		{
			
		}
		/*****
		 *查询对应回合数据	PBG2CChampionQueryRoundAck
		 * @param PBG2CChampionQueryRoundAck
		 * 		begintime			uint32	开始时间
		 * 		round			uint32	回合ID_emChampionRound
		 * 		state			uint32	状态_emChampionState
		 * 		areaid			uint32	赛区ID
		 * 		list			PBChampionFightList	列表
		 */
		protected onQueryRoundAck(value: Pb_God.PBG2CChampionQueryRoundAck): void
		{
			
		}
		/*****
		 *点赞返回			PBU32U32
		 * @param PBU32U32
		 * 		key			uint32	
		 * 		value			uint32	 
		 */
		protected onLike(value: Pb_God.PBU32U32): void
		{
			
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}