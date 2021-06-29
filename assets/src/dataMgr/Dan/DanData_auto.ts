
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
	export class DanData_auto extends DanDataMgrBase
	{
		constructor()
		{
			super()
			//	 通用错误返回
			EventMgr.on(Cmd.S2C_Dan_Common.cmdName, this, this.onCommon)
			//	 同步主界面数据 	PBG2CDan_SynInfo	
			EventMgr.on(Cmd.S2C_Dan_SynInfo.cmdName, this, this.onSynInfo)
			//	 领取奖励返回 	PBU32
			EventMgr.on(Cmd.S2C_Dan_AwardAck.cmdName, this, this.onAwardAck)
			// 	 购买次数返回		PBU32
			EventMgr.on(Cmd.S2C_Dan_BuyCountAck.cmdName, this, this.onBuyCountAck)
			// 	 总战绩查询返回	PBPlayerDanResult
			EventMgr.on(Cmd.S2C_Dan_TotalResultAck.cmdName, this, this.onTotalResultAck)
			// 	 赛季战绩返回		PBPlayerDanResult
			EventMgr.on(Cmd.S2C_Dan_SeasonResultAck.cmdName, this, this.onSeasonResultAck)
			// 	 赛季所有赛区查询	PBG2CDanSeasonAllAreaAck
			EventMgr.on(Cmd.S2C_Dan_SeasonAllAreaAck.cmdName, this, this.onSeasonAllAreaAck)
			// 	 赛区信息查询		PBDanKingRecord
			EventMgr.on(Cmd.S2C_Dan_SeasonAreaInfoAck.cmdName, this, this.onSeasonAreaInfoAck)
			//	 挑战结果返回		PBG2CDanFightResultAck	
			EventMgr.on(Cmd.S2C_Dan_FightResultAck.cmdName, this, this.onFightResultAck)
			//	 搜索对手返回		PBG2CDanSearch
			EventMgr.on(Cmd.S2C_Dan_Search.cmdName, this, this.onSearch)
			//	 查询我的记录返回 PBG2CDanRecords
			EventMgr.on(Cmd.S2C_Dan_Record.cmdName, this, this.onRecord)
			//	 查询大神记录返回 PBG2CDanRecords
			EventMgr.on(Cmd.S2C_Dan_MasterRecord.cmdName, this, this.onMasterRecord)
			//	挑战请求返回		PBFightBase	
			EventMgr.on(Cmd.S2C_Dan_FightBeginAck.cmdName, this, this.onFightBeginAck)
		}
		/*****
		 *	 通用错误返回
		 * @param 
		 */
		protected onCommon(): void
		{

		}
		/*****
		 *	 同步主界面数据 	PBG2CDan_SynInfo	
		 * @param PBG2CDan_SynInfo
		 * 		curseasonid			uint32	 赛季ID
		 * 		curdanid			uint32	 当前段位ID
		 * 		score			uint32	 当前积分
		 * 		maxscore			uint32	 最大积分
		 * 		exp			int32	 当前经验
		 * 		cacheexp			int32	 缓冲经验
		 * 		fightcount			uint32	 挑战次数
		 * 		buycount			uint32	 购买次数
		 * 		prizedanid			uint32	 领奖的段位ID
		 * 		maxdanid			uint32	 最大的段位ID
		 * 		protmoteresult			uint32	 晋级赛结果
		 * 		bwstarttime			uint32	 跨服开始时间
		 * 		areaid			uint32	 自己赛区
		 * 		rank			uint32	 排名
		 * 		playerid			uint32	 玩家ID
		 * 		worldid			uint32	 世界ID
		 * 		inkingmatch			bool	 参加了王者赛
		 */
		protected onSynInfo(value: Pb_God.PBG2CDan_SynInfo): void
		{
			this.seasonNumber = value.curseasonid;
			this.curDanId = value.curdanid;
			this.curExp = value.exp;
			this.cacheExp = value.cacheexp;
			this.fightCount = value.fightcount;
			this.buyCount = value.buycount;
			this.prizeDanId = value.prizedanid;
			this.maxDanId = value.maxdanid;
			this.protmoteresult = value.protmoteresult;
			this.seasonStartTime = Global.getZeroTimeNumber(value.bwstarttime * 1000 + 1) / 1000;
			this.curAreaId = value.areaid;
			this.inkingMatch = value.inkingmatch;
			this.reddotModel.refresh();
		}
		/*****
		 *	 领取奖励返回 	PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onAwardAck(value: Pb_God.PBU32): void
		{
			this.prizeDanId = value.value;
			this.reddotModel.refresh();
		}
		/*****
		 * 	 购买次数返回		PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onBuyCountAck(value: Pb_God.PBU32): void
		{
			this.buyCount = value.value;
			this.reddotModel.refresh();
		}
		/*****
		 * 	 总战绩查询返回	PBPlayerDanResult
		 * @param PBPlayerDanResult
		 * 		seasonid			uint32	 赛季ID
		 * 		curdanid			uint32	 当前段位ID
		 * 		maxdanid			uint32	 历史最高段位ID
		 * 		exp			int32	 当前经验
		 * 		cacheexp			int32	 缓冲经验
		 * 		score			uint32	 积分(服务器排序匹配用)
		 * 		maxscore			uint32	 最大积分
		 * 		normalsuccount			uint32	 常规赛胜场
		 * 		normaltotalcount			uint32	 常规赛总场数
		 * 		kingsuccount			uint32	 王者赛胜场
		 * 		kingtotalcount			uint32	 王者赛总场数
		 * 		maxdamage			uint64	 单场最大伤害值
		 * 		maxcontinuewin			uint32	 最大连胜场次
		 * 		mvpmaxpet			uint32	 MVP次数最多英雄
		 * 		mvppet			PBU32U32	 MVP次数英雄
		 * 		maxenemy			PBPlayerDanEnemy	 最强对手
		 */
		protected onTotalResultAck(value: Pb_God.PBPlayerDanResult): void
		{

		}
		/*****
		 * 	 赛季战绩返回		PBPlayerDanResult
		 * @param PBPlayerDanResult
		 * 		seasonid			uint32	 赛季ID
		 * 		curdanid			uint32	 当前段位ID
		 * 		maxdanid			uint32	 历史最高段位ID
		 * 		exp			int32	 当前经验
		 * 		cacheexp			int32	 缓冲经验
		 * 		score			uint32	 积分(服务器排序匹配用)
		 * 		maxscore			uint32	 最大积分
		 * 		normalsuccount			uint32	 常规赛胜场
		 * 		normaltotalcount			uint32	 常规赛总场数
		 * 		kingsuccount			uint32	 王者赛胜场
		 * 		kingtotalcount			uint32	 王者赛总场数
		 * 		maxdamage			uint64	 单场最大伤害值
		 * 		maxcontinuewin			uint32	 最大连胜场次
		 * 		mvpmaxpet			uint32	 MVP次数最多英雄
		 * 		mvppet			PBU32U32	 MVP次数英雄
		 * 		maxenemy			PBPlayerDanEnemy	 最强对手
		 */
		protected onSeasonResultAck(value: Pb_God.PBPlayerDanResult): void
		{

		}
		/*****
		 * 	 赛季所有赛区查询	PBG2CDanSeasonAllAreaAck
		 * @param PBG2CDanSeasonAllAreaAck
		 * 		seasonid			uint32	 赛季ID
		 * 		areaid			uint32	 区域ID
		 */
		protected onSeasonAllAreaAck(value: Pb_God.PBG2CDanSeasonAllAreaAck): void
		{

		}
		/*****
		 * 	 赛区信息查询		PBDanKingRecord
		 * @param PBDanKingRecord
		 * 		seasonid			uint32	 赛季ID
		 * 		areaid			uint32	 分区ID
		 * 		topplayer			PBDanKingTopPlayer	 排名信息
		 */
		protected onSeasonAreaInfoAck(value: Pb_God.PBDanKingRecord): void
		{

		}
		/*****
		 *	 挑战结果返回		PBG2CDanFightResultAck	
		 * @param PBG2CDanFightResultAck
		 * 		battlesn			uint64	 战斗流水号
		 * 		score			uint32	 当前积分
		 * 		danid			uint32	 当前段位
		 * 		exp			int32	 当前经验
		 * 		cacheexp			int32	 当前缓冲经验
		 * 		addscore			int32	 增加经验/积分(负数减)
		 * 		prize			PBItemInfo	 奖励
		 * 		promoteresult			uint32	 晋级赛结果
		 */
		protected onFightResultAck(value: Pb_God.PBG2CDanFightResultAck): void
		{
			this.curExp = value.exp;
			this.curDanId = value.danid;
			this.cacheExp = value.cacheexp;
			this.protmoteresult = value.promoteresult;
		}
		/*****
		 *	 搜索对手返回		PBG2CDanSearch
		 * @param PBG2CDanSearch
		 * 		playerdisplay			PBPlayerDisplay	用户display
		 * 		battlepet			PBBattlePet	战斗阵容
		 * 		battlepet2			PBBattlePet	第二战斗阵容
		 * 		danid			uint32	段位id
		 * 		rank			uint32	排行榜名次
		 */
		protected onSearch(value: Pb_God.PBG2CDanSearch): void
		{

		}
		/*****
		 *	 查询我的记录返回 PBG2CDanRecords
		 * @param PBG2CDanRecords
		 * 		records			PBPlayerDanRecord	记录
		 */
		protected onRecord(value: Pb_God.PBG2CDanRecords): void
		{

		}
		/*****
		 *	 查询大神记录返回 PBG2CDanRecords
		 * @param PBG2CDanRecords
		 * 		records			PBPlayerDanRecord	记录
		 */
		protected onMasterRecord(value: Pb_God.PBG2CDanRecords): void
		{

		}
		/*****
		 *	挑战请求返回		PBFightBase	
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
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}