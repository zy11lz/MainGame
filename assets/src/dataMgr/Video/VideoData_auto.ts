
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
	export class VideoData_auto extends VideoDataMgrBase
	{
		constructor()
		{
			super()
			//通用错误返回
			EventMgr.on(Cmd.S2C_Video_Common.cmdName, this, this.onCommon)
			//查询系统录像返回		PBG2CVideoQuerySystemAck		
			EventMgr.on(Cmd.S2C_Video_QuerySystemAck.cmdName, this, this.onQuerySystemAck)
			//点赞次数返回			PBG2CVideoActionAck
			EventMgr.on(Cmd.S2C_Video_LikeCountAck.cmdName, this, this.onLikeCountAck)
			//播放次数返回			PBG2CVideoActionAck
			EventMgr.on(Cmd.S2C_Video_PlayCountAck.cmdName, this, this.onPlayCountAck)
			//分享次数返回			PBG2CVideoActionAck
			EventMgr.on(Cmd.S2C_Video_ShareCountAck.cmdName, this, this.onShareCountAck)
			//查询战斗数据返回		PBG2CVideoDamageDataAck
			EventMgr.on(Cmd.S2C_Video_QueryDamageDataAck.cmdName, this, this.onQueryDamageDataAck)
			//查询录像数据返回		PBPlayerPetView
			EventMgr.on(Cmd.S2C_Video_QueryBattlePetAck.cmdName, this, this.onQueryBattlePetAck)
			//播放录像				PBFightResult
			EventMgr.on(Cmd.S2C_Video_Play.cmdName, this, this.onPlay)
			//查询单个录像返回		PBVideoDisplay
			EventMgr.on(Cmd.S2C_Video_QuerySingleAck.cmdName, this, this.onQuerySingleAck)
			//同步信息				PBPlayerVideo
			EventMgr.on(Cmd.S2C_Video_SynInfo.cmdName, this, this.onSynInfo)
			//查询挂机录像返回		PBWorldStageVideoInfo
			EventMgr.on(Cmd.S2C_Video_QueryHookAck.cmdName, this, this.onQueryHookAck)
			//查询试练塔录像返回	PBWorldStageVideoInfo
			EventMgr.on(Cmd.S2C_Video_QueryTowerAck.cmdName, this, this.onQueryTowerAck)
			//查询玩家录像返回		PBG2CVideoQuerySystemAck
			EventMgr.on(Cmd.S2C_Video_PlayerRecordAck.cmdName, this, this.onPlayerRecordAck)
			//查询竞技场录像返回	PBG2CVideoPlayerRecordAck
			EventMgr.on(Cmd.S2C_Video_PlayerChallengeAck.cmdName, this, this.onPlayerChallengeAck)
			//查询多个录像返回		PBG2CQueryMutileVideo
			EventMgr.on(Cmd.S2C_Video_QueryMutiple.cmdName, this, this.onQueryMutiple)
			//查询跨服录像多个返回	PBG2CQueryMutileVideo
			EventMgr.on(Cmd.S2C_Video_QueryMutipleBW.cmdName, this, this.onQueryMutipleBW)
			//查询跨服伤害数据返回 PBG2CVideoDamageDataAck
			EventMgr.on(Cmd.S2C_Video_QueryDamageDataBW.cmdName, this, this.onQueryDamageDataBW)
			//查询跨服伙伴数据返回 PBPlayerPetView
			EventMgr.on(Cmd.S2C_Video_QueryBattlePetBW.cmdName, this, this.onQueryBattlePetBW)
			//播放跨服录像返回		PBFightResult
			EventMgr.on(Cmd.S2C_Video_PlayBW.cmdName, this, this.onPlayBW)
		}
		/*****
		 *通用错误返回
		 * @param 
		 */
		protected onCommon(): void
		{

		}
		/*****
		 *查询系统录像返回		PBG2CVideoQuerySystemAck		
		 * @param PBG2CVideoQuerySystemAck
		 * 		videotype			uint32	录像类型
		 * 		display			PBVideoDisplay	系统录像显示
		 */
		protected onQuerySystemAck(value: Pb_God.PBG2CVideoQuerySystemAck): void
		{
			this._VideoDic.put(value.videotype, value.display);
		}
		/*****
		 *点赞次数返回			PBG2CVideoActionAck
		 * @param PBG2CVideoActionAck
		 * 		videotype			uint32	系统录像类型
		 * 		battlesn			uint64	流水ID
		 * 		count			uint32	次数
		 */
		protected onLikeCountAck(value: Pb_God.PBG2CVideoActionAck): void
		{
			let tmpResults = this.getVideoDisplay(value.videotype);
			if (tmpResults != null)
			{
				let tmpResultsInfo = tmpResults.filter(element => (element.battlesn as Long).equals(value.battlesn as Long));
				if (tmpResultsInfo.length > 0)
				{
					tmpResultsInfo[0].likecount = value.count;
				}
				SoundMgr.Inst().playSound("getcoin");
				this.reddotModel.refresh();
			}
		}
		/*****
		 *播放次数返回			PBG2CVideoActionAck
		 * @param PBG2CVideoActionAck
		 * 		videotype			uint32	系统录像类型
		 * 		battlesn			uint64	流水ID
		 * 		count			uint32	次数
		 */
		protected onPlayCountAck(value: Pb_God.PBG2CVideoActionAck): void
		{
			let tmpResults = this.getVideoDisplay(value.videotype);
			if (tmpResults != null)
			{
				let tmpResultsInfo = tmpResults.filter(element => (element.battlesn as Long).equals(value.battlesn as Long));
				if (tmpResultsInfo.length > 0)
				{
					tmpResultsInfo[0].playcount = value.count;
				}
			}
		}
		/*****
		 *分享次数返回			PBG2CVideoActionAck
		 * @param PBG2CVideoActionAck
		 * 		videotype			uint32	系统录像类型
		 * 		battlesn			uint64	流水ID
		 * 		count			uint32	次数
		 */
		protected onShareCountAck(value: Pb_God.PBG2CVideoActionAck): void
		{
			let tmpResults = this.getVideoDisplay(value.videotype);
			if (tmpResults != null)
			{
				let tmpResultsInfo = tmpResults.filter(element => (element.battlesn as Long).equals(value.battlesn as Long));
				if (tmpResultsInfo.length > 0)
				{
					tmpResultsInfo[0].sharecount = value.count;
				}
			}
		}
		/*****
		 *查询战斗数据返回		PBG2CVideoDamageDataAck
		 * @param PBG2CVideoDamageDataAck
		 * 		fightResult			PBFightResult	战斗信息
		 */
		protected onQueryDamageDataAck(value: Pb_God.PBG2CVideoDamageDataAck): void
		{
		}
		/*****
		 *查询录像数据返回		PBPlayerPetView
		 * @param PBPlayerPetView
		 * 		petinfo			PBPlayerPetInfo	 伙伴数据
		 * 		factionskilllevel			uint32	 帮派技能等级
		 * 		holyinfo			PBPlayerHolyInfo	 圣物数据
		 */
		protected onQueryBattlePetAck(value: Pb_God.PBPlayerPetView): void
		{
			UIManager.Inst.forceOpen(new HeroViewInfoOpenUIData().initPetView(value));
		}
		/*****
		 *播放录像				PBFightResult
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
		protected onPlay(value: Pb_God.PBFightResult): void
		{
			BattleMgr.Inst.enterBat(value.base, true, 0);
		}
		/*****
		 *查询单个录像返回		PBVideoDisplay
		 * @param PBVideoDisplay
		 * 		battlesn			uint64	流水ID
		 * 		battletype			uint32	战斗类型_emBattleType
		 * 		id			uint32	挑战ID
		 * 		param			uint32	挑战ID
		 * 		maxround			uint32	最大回合数
		 * 		curround			uint32	当前回合数
		 * 		begintime			uint32	战斗时间
		 * 		result			uint32	战斗结果_emCampType
		 * 		leftdisplay			PBBattleDisplay	左边显示
		 * 		rightdisplay			PBBattleDisplay	右边显示
		 * 		likecount			uint32	点赞次数
		 * 		playcount			uint32	播放次数
		 * 		sharecount			uint32	分享次数
		 * 		friendrank			uint32	友方名次
		 * 		enermyrank			uint32	敌方名次
		 * 		danType			uint32	当前赛程（选拔赛、总决赛这种
		 * 		leftDan			PBC2SPatVideoData	超凡段位左边数据
		 * 		rightDan			PBC2SPatVideoData	超凡段位右边数据
		 */
		protected onQuerySingleAck(value: Pb_God.PBVideoDisplay): void
		{

		}
		/*****
		 *同步信息				PBPlayerVideo
		 * @param PBPlayerVideo
		 * 		daylikevideo			uint64	 点赞的录像
		 * 		collectvideo			uint64	 收藏的录像
		 */
		protected onSynInfo(value: Pb_God.PBPlayerVideo): void
		{
			this._VideoRecord = value;
		}
		/*****
		 *查询挂机录像返回		PBWorldStageVideoInfo
		 * @param PBWorldStageVideoInfo
		 * 		stageid			uint32	关卡
		 * 		fast			PBPlayerVideoDisplay	最快
		 * 		fightpower			PBPlayerVideoDisplay	最小战力
		 * 		lately			PBPlayerVideoDisplay	最近/我的通关录像
		 */
		protected onQueryHookAck(value: Pb_God.PBWorldStageVideoInfo): void
		{

		}
		/*****
		 *查询试练塔录像返回	PBWorldStageVideoInfo
		 * @param PBWorldStageVideoInfo
		 * 		stageid			uint32	关卡
		 * 		fast			PBPlayerVideoDisplay	最快
		 * 		fightpower			PBPlayerVideoDisplay	最小战力
		 * 		lately			PBPlayerVideoDisplay	最近/我的通关录像
		 */
		protected onQueryTowerAck(value: Pb_God.PBWorldStageVideoInfo): void
		{

		}
		/*****
		 *查询玩家录像返回		PBG2CVideoQuerySystemAck
		 * @param PBG2CVideoQuerySystemAck
		 * 		videotype			uint32	录像类型
		 * 		display			PBVideoDisplay	系统录像显示
		 */
		protected onPlayerRecordAck(value: Pb_God.PBG2CVideoQuerySystemAck): void
		{

		}
		/*****
		 *查询竞技场录像返回	PBG2CVideoPlayerRecordAck
		 * @param PBG2CVideoPlayerRecordAck
		 * 		battletype			uint32	战斗类型
		 * 		detail			PBFightResult	战斗详情
		 * 		index			uint32	index
		 */
		protected onPlayerChallengeAck(value: Pb_God.PBG2CVideoPlayerRecordAck): void
		{

		}
		/*****
		 *查询多个录像返回		PBG2CQueryMutileVideo
		 * @param PBG2CQueryMutileVideo
		 * 		type			uint32	视频类型 _emVideoType
		 * 		display			PBVideoDisplay	录像显示
		 */
		protected onQueryMutiple(value: Pb_God.PBG2CQueryMutileVideo): void
		{

		}
		/*****
		 *查询跨服录像多个返回	PBG2CQueryMutileVideo
		 * @param PBG2CQueryMutileVideo
		 * 		type			uint32	视频类型 _emVideoType
		 * 		display			PBVideoDisplay	录像显示
		 */
		protected onQueryMutipleBW(value: Pb_God.PBG2CQueryMutileVideo): void
		{

		}
		/*****
		 *查询跨服伤害数据返回 PBG2CVideoDamageDataAck
		 * @param PBG2CVideoDamageDataAck
		 * 		fightResult			PBFightResult	战斗信息
		 */
		protected onQueryDamageDataBW(value: Pb_God.PBG2CVideoDamageDataAck): void
		{

		}
		/*****
		 *查询跨服伙伴数据返回 PBPlayerPetView
		 * @param PBPlayerPetView
		 * 		petinfo			PBPlayerPetInfo	 伙伴数据
		 * 		factionskilllevel			uint32	 帮派技能等级
		 * 		holyinfo			PBPlayerHolyInfo	 圣物数据
		 */
		protected onQueryBattlePetBW(value: Pb_God.PBPlayerPetView): void
		{
			UIManager.Inst.forceOpen(new HeroViewInfoOpenUIData().initPetView(value));
		}
		/*****
		 *播放跨服录像返回		PBFightResult
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
		protected onPlayBW(value: Pb_God.PBFightResult): void
		{
			BattleMgr.Inst.enterBat(value.base, true, 0);
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}