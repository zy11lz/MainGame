
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
	export class FactionData_auto extends FactionDataMgrBase
	{
		constructor()
		{
			super()
			//	 通用返回				失败才返回
			EventMgr.on(Cmd.S2C_Faction_Common.cmdName, this, this.onCommon)
			//	 创建帮会				PBC2GFactionCreate
			EventMgr.on(Cmd.S2C_Faction_Create.cmdName, this, this.onCreate)
			//	 帮会基本数据			PBG2CFactionSyn
			EventMgr.on(Cmd.S2C_Faction_Syn.cmdName, this, this.onSyn)
			//	 退出帮会
			EventMgr.on(Cmd.S2C_Faction_Quit.cmdName, this, this.onQuit)
			//	 请求自己申请帮会列表	PBG2CFactionApplyList	
			EventMgr.on(Cmd.S2C_Faction_SelfApplyList.cmdName, this, this.onSelfApplyList)
			//	 所有自己申请的帮派	PBG2CFactionAllApply	
			EventMgr.on(Cmd.S2C_Faction_SelfAllApply.cmdName, this, this.onSelfAllApply)
			//	 请求帮会列表			PBG2CFactionList	
			EventMgr.on(Cmd.S2C_Faction_TopList.cmdName, this, this.onTopList)
			//	 请求帮会成员列表		PBG2CFactionMemberList
			EventMgr.on(Cmd.S2C_Faction_MemberList.cmdName, this, this.onMemberList)
			//	 帮会删除				PBU32
			EventMgr.on(Cmd.S2C_Faction_Remove.cmdName, this, this.onRemove)
			//	 修改帮派公告			PBC2GFactionEdit
			EventMgr.on(Cmd.S2C_Faction_Edit.cmdName, this, this.onEdit)
			//	 删除一个申请			PBU32	
			EventMgr.on(Cmd.S2C_Faction_DelApply.cmdName, this, this.onDelApply)
			//	 改变官职				失败才返回	
			EventMgr.on(Cmd.S2C_Faction_ChangeJob.cmdName, this, this.onChangeJob)
			//	 申请返回				失败才返回	
			EventMgr.on(Cmd.S2C_Faction_Apply.cmdName, this, this.onApply)
			//	 帮会捐献返回			PBU32
			EventMgr.on(Cmd.S2C_Faction_Donate.cmdName, this, this.onDonate)
			//	 查看申请帮会列表		PBG2CFactionQueryApplyList	
			EventMgr.on(Cmd.S2C_Faction_QueryApplyList.cmdName, this, this.onQueryApplyList)
			//	 修改入会条件			PBCAGFactionSetCondition	
			EventMgr.on(Cmd.S2C_Faction_SetCondition.cmdName, this, this.onSetCondition)
			//	 通知玩家加入帮会		无内容	
			EventMgr.on(Cmd.S2C_Faction_JoinAck.cmdName, this, this.onJoinAck)
			//	 通知玩家退出帮会		无内容	
			EventMgr.on(Cmd.S2C_Faction_ExitAck.cmdName, this, this.onExitAck)
			//	 领取捐献奖励返回		PBU32
			EventMgr.on(Cmd.S2C_Faction_DonatePrize.cmdName, this, this.onDonatePrize)
			//	 活跃度同步返回		PBG2CFactionSynLiveness
			EventMgr.on(Cmd.S2C_Faction_SynLiveness.cmdName, this, this.onSynLiveness)
			//	 技能升级				PBCAGFactionSkillUpgrade
			EventMgr.on(Cmd.S2C_Faction_UpgradeSkill.cmdName, this, this.onUpgradeSkill)
			//	 技能重置				PBG2CFactionSkillReset
			EventMgr.on(Cmd.S2C_Faction_SkillReset.cmdName, this, this.onSkillReset)
			//	帮派副本同步			PBG2CFactionCopymapSyn
			EventMgr.on(Cmd.S2C_Faction_CopymapSyn.cmdName, this, this.onCopymapSyn)
			//	帮派副本排行同步		PBG2CFactionCopymapTop
			EventMgr.on(Cmd.S2C_Faction_CopymapTop.cmdName, this, this.onCopymapTop)
			//	帮派副本副本否买加成buff	PBG2CFactionCopymapSkill
			EventMgr.on(Cmd.S2C_Faction_CopymapUpdateSkill.cmdName, this, this.onCopymapUpdateSkill)
			//	同步捐献活跃度		PBU32
			EventMgr.on(Cmd.S2C_Faction_SynDonateLiveness.cmdName, this, this.onSynDonateLiveness)
			//	帮派副本副本更新次数	PBG2CFactionCopymapUpdateCount
			EventMgr.on(Cmd.S2C_Faction_CopymapUpdateCount.cmdName, this, this.onCopymapUpdateCount)
			//	副本扫荡返回			
			EventMgr.on(Cmd.S2C_Faction_CopymapSweep.cmdName, this, this.onCopymapSweep)
			//	帮派重命名			PBG2CFactionRenameAck		
			EventMgr.on(Cmd.S2C_Faction_Rename.cmdName, this, this.onRename)
			//	公会招募				PBG2CFactionRecruitAck
			EventMgr.on(Cmd.S2C_Faction_Recruit.cmdName, this, this.onRecruit)
			//	副本集结				PBU32
			EventMgr.on(Cmd.S2C_Faction_CopymapNotice.cmdName, this, this.onCopymapNotice)
			//	 帮派红点	无内容
			EventMgr.on(Cmd.S2C_Faction_ApplyHotData.cmdName, this, this.onApplyHotData)
			//	公会弹劾				PBG2CFactionImpeach
			EventMgr.on(Cmd.S2C_Faction_Impeach.cmdName, this, this.onImpeach)
			//	返回所有对阵列表		PBG2CFactionWarListAck
			EventMgr.on(Cmd.S2C_FactionWar_QueryAllListAck.cmdName, this, this.onQueryAllListAck)
			//	返回查询成员列表		PBG2CFactionWarMemberListAck
			EventMgr.on(Cmd.S2C_FactionWar_QueryMemberListAck.cmdName, this, this.onQueryMemberListAck)
			//	返回查询成员信息		PBG2CFactionWarMemberInfoAck
			EventMgr.on(Cmd.S2C_FactionWar_QueryMemberInfoAck.cmdName, this, this.onQueryMemberInfoAck)
			//	返回查询战场日志		PBG2CFactionWarLogAck
			EventMgr.on(Cmd.S2C_FactionWar_QueryWarLog.cmdName, this, this.onQueryWarLog)
			//	返回查询我的日志		PBG2CFactionWarLogAck
			EventMgr.on(Cmd.S2C_FactionWar_QuerySelfLog.cmdName, this, this.onQuerySelfLog)
			//	返回查询目标防御记录	PBG2CFactionWarTarRecordAck
			EventMgr.on(Cmd.S2C_FactionWar_QueryTarRecordLog.cmdName, this, this.onQueryTarRecordLog)
			//	返回查询进攻列表		PBG2CFactionWarAttackListAck
			EventMgr.on(Cmd.S2C_FactionWar_QueryAttackListAck.cmdName, this, this.onQueryAttackListAck)
			//	返回所有宝箱信息		PBG2CFactionWarSynBoxInfo
			EventMgr.on(Cmd.S2C_FactionWar_SynBoxInfo.cmdName, this, this.onSynBoxInfo)
			//	开启宝箱返回			PBFactionWarBox
			EventMgr.on(Cmd.S2C_FactionWar_OpenBoxPrizeAck.cmdName, this, this.onOpenBoxPrizeAck)
			//	开启返回				PBG2CFactionWarSynOpen	
			EventMgr.on(Cmd.S2C_FactionWar_OpenAck.cmdName, this, this.onOpenAck)
			//	返回匹配成功			
			EventMgr.on(Cmd.S2C_FactionWar_SynMatch.cmdName, this, this.onSynMatch)
			//	公会战挑战结果		PBG2CFactionWarFightResult
			EventMgr.on(Cmd.S2C_FactionWar_FightResult.cmdName, this, this.onFightResult)
			//	 帮会日志 			PBFactionAllEvents
			EventMgr.on(Cmd.S2C_Faction_Log.cmdName, this, this.onLog)
			//	同步游戏数据			PBFactionSynGame
			EventMgr.on(Cmd.S2C_Faction_SynGame.cmdName, this, this.onSynGame)
			//	副本进入返回			PBFightBase
			EventMgr.on(Cmd.S2C_Faction_FightBeginAck.cmdName, this, this.onFightBeginAck)
			//	公会战挑战返回		PBFightBase
			EventMgr.on(Cmd.S2C_Faction_WarFightBeginAck.cmdName, this, this.onWarFightBeginAck)
			//	宝箱奖励				PBFactionWarBox
			EventMgr.on(Cmd.S2C_Faction_WarOpenBoxPrizeAck.cmdName, this, this.onWarOpenBoxPrizeAck)
		}
		/*****
		 *	 通用返回				失败才返回
		 * @param 
		 */
		protected onCommon(): void
		{

		}
		/*****
		 *	 创建帮会				PBC2GFactionCreate
		 * @param PBC2GFactionCreate
		 * 		playerid			uint32	创建者ID
		 * 		worldid			uint32	世界ID
		 * 		factionname			string	帮派名
		 * 		creattime			uint32	创建时间
		 * 		factionid			uint32	帮派ID
		 * 		declaration			string	帮派宣言
		 * 		isauto			uint32	是否验证 0不验证
		 * 		joinneedlevel			uint32	加入需要的玩家等级
		 */
		protected onCreate(value: Pb_God.PBC2GFactionCreate): void
		{
			this.setFactionId(value.factionid);
			this.isAutoVerify = !!value.isauto;
			this.joinNeedLevel = value.joinneedlevel;

			EventMgr.trigger(EventNotify.Faction_Change);
		}
		/*****
		 *	 帮会基本数据			PBG2CFactionSyn
		 * @param PBG2CFactionSyn
		 * 		display			PBFactionDisplay	帮派显示
		 * 		jobtype			uint32	帮派职位
		 */
		protected onSyn(value: Pb_God.PBG2CFactionSyn): void
		{
			this.factionDisplay = value.display;
			if (this._jobType != value.jobtype)
			{
				this._jobType = value.jobtype;
				EventMgr.trigger(EventNotify.Faction_JobTypeChange);  //职位变化
			}

			this.setFactionId(value.display.base.factionid);
			this.isAutoVerify = !!value.display.base.isauto;
			this.joinNeedLevel = value.display.base.joinneedlevel;
			EventMgr.trigger(EventNotify.Faction_DisplayUpdate);
		}
		/*****
		 *	 退出帮会
		 * @param 
		 */
		protected onQuit(): void
		{
			this.setFactionId(0);
			if (this.nextjointime) { this.nextjointime = TimeController.currTimer / 1000 + 12 * 3600; }
			else { this.nextjointime = 1; } //不是0就好，说明不是第1次了
		}
		/*****
		 *	 请求自己申请帮会列表	PBG2CFactionApplyList	
		 * @param PBG2CFactionApplyList
		 * 		display			PBFactionDisplay	帮派信息展示
		 * 		allapply			PBG2CFactionAllApply	已经申请的帮派ID
		 */
		protected onSelfApplyList(value: Pb_God.PBG2CFactionApplyList): void
		{
			this.setFactionId(0);  //请求打开帮会的时候，服务器返回了这个，说明服务器端公会已经异常了。
			this._factionList = value.display;
			this._applyFactions.clear();
			if (value.allapply)
			{
				this._applyFactions = Global.listToStringMap(value.allapply.factionid);
			}
		}
		/*****
		 *	 所有自己申请的帮派	PBG2CFactionAllApply	
		 * @param PBG2CFactionAllApply
		 * 		factionid			uint32	已经申请的帮派ID
		 */
		protected onSelfAllApply(value: Pb_God.PBG2CFactionAllApply): void
		{
			this._applyFactions = Global.listToStringMap(value.factionid, this._applyFactions);
		}
		/*****
		 *	 请求帮会列表			PBG2CFactionList	
		 * @param PBG2CFactionList
		 * 		list			PBFactionDisplay	帮派列表
		 * 		leader			PBPlayerDisplay	前三名帮派会长
		 */
		protected onTopList(value: Pb_God.PBG2CFactionList): void
		{
		}
		/*****
		 *	 请求帮会成员列表		PBG2CFactionMemberList
		 * @param PBG2CFactionMemberList
		 * 		members			PBFactionMember	成员列表
		 */
		protected onMemberList(value: Pb_God.PBG2CFactionMemberList): void
		{

		}
		/*****
		 *	 帮会删除				PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onRemove(value: Pb_God.PBU32): void
		{

		}
		/*****
		 *	 修改帮派公告			PBC2GFactionEdit
		 * @param PBC2GFactionEdit
		 * 		declaration			string	宣言
		 */
		protected onEdit(value: Pb_God.PBC2GFactionEdit): void
		{
			if (!this.factionDisplay)
			{
				return;
			}
			TipsUtils.showTipsByLanId("faction_msg37");
			this.factionDisplay.base.declaration = value.declaration;
			EventMgr.trigger(EventNotify.Faction_DisplayUpdate, value.declaration);
		}
		/*****
		 *	 删除一个申请			PBU32	
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onDelApply(value: Pb_God.PBU32): void
		{
			let isFind = false;
			for (var i = 0; i < this._factionApplyList.length; i++)
			{
				let element = this._factionApplyList[i];
				if (element.base.displayer.playerid == value.value)
				{
					isFind = true;
					this._factionApplyList.splice(i, 1);
				}
			}
			if (isFind)
			{
				this.changeMemberApplyState(this._factionApplyList.length > 0);
				EventMgr.trigger(EventNotify.Faction_ApplyList_Update, this._factionApplyList);
			}
		}
		/*****
		 *	 改变官职				失败才返回	
		 * @param 
		 */
		protected onChangeJob(): void
		{

		}
		/*****
		 *	 申请返回				失败才返回	
		 * @param 
		 */
		protected onApply(): void
		{

		}
		/*****
		 *	 帮会捐献返回			PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onDonate(value: Pb_God.PBU32): void
		{
			SoundMgr.Inst().playSound("getcoin");
			this.donateType = value.value;
		}
		/*****
		 *	 查看申请帮会列表		PBG2CFactionQueryApplyList	
		 * @param PBG2CFactionQueryApplyList
		 * 		apply			PBFactionApplyData	申请信息
		 */
		protected onQueryApplyList(value: Pb_God.PBG2CFactionQueryApplyList): void
		{
			this._factionApplyList = value.apply;
			this.changeMemberApplyState(this._factionApplyList.length > 0);
			EventMgr.trigger(EventNotify.Faction_ApplyList_Update, this._factionApplyList);
		}
		/*****
		 *	 修改入会条件			PBCAGFactionSetCondition	
		 * @param PBCAGFactionSetCondition
		 * 		isauto			uint32	是否验证 0不验证
		 * 		joinneedlevel			uint32	加入需要的玩家等级
		 */
		protected onSetCondition(value: Pb_God.PBCAGFactionSetCondition): void
		{
			this.isAutoVerify = !!value.isauto;
			this.joinNeedLevel = value.joinneedlevel;
		}
		/*****
		 *	 通知玩家加入帮会		无内容	
		 * @param 
		 */
		protected onJoinAck(): void
		{
			FactionSend.open();
		}
		/*****
		 *	 通知玩家退出帮会		无内容	
		 * @param 
		 */
		protected onExitAck(): void
		{
			this.setFactionId(0);
		}
		/*****
		 *	 领取捐献奖励返回		PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onDonatePrize(value: Pb_God.PBU32): void
		{
			this.donatePrize.put(value.value, value.value);
		}
		/*****
		 *	 活跃度同步返回		PBG2CFactionSynLiveness
		 * @param PBG2CFactionSynLiveness
		 * 		livenesslevel			uint32	 活跃等级
		 * 		livenessexp			uint32	 活跃经验
		 * 		dailyliveness			uint32	 日活跃度
		 * 		weekliveness			uint32	 周活跃度
		 */
		protected onSynLiveness(value: Pb_God.PBG2CFactionSynLiveness): void
		{
			//活跃变化时提示
			if (this.livenessExp < value.livenessexp)
			{
				TipsUtils.showTipsByLanId("faction_msg35", value.livenessexp - this.livenessExp)
			}
			this.livenessExp = value.livenessexp;
			this.livenessLevel = value.livenesslevel;
			this.dailyLiveness = value.dailyliveness;
			this.weekLiveness = value.weekliveness;
		}
		/*****
		 *	 技能升级				PBCAGFactionSkillUpgrade
		 * @param PBCAGFactionSkillUpgrade
		 * 		jobtype			uint32	职业
		 * 		curlevel			uint32	当前等级
		 */
		protected onUpgradeSkill(value: Pb_God.PBCAGFactionSkillUpgrade): void
		{
			this.skillLevelMap.put(value.jobtype, value.curlevel);
			this.reddotModel.getChildModel("skill").refreshChild(value.jobtype); //刷新指定职业技能的红点状态
			EventMgr.trigger(EventNotify.Faction_Skill_Update, value.jobtype, value.curlevel);
		}
		/*****
		 *	 技能重置				PBG2CFactionSkillReset
		 * @param PBG2CFactionSkillReset
		 * 		jobtype			uint32	职业类型
		 * 		resetcount			uint32	重置次数
		 */
		protected onSkillReset(value: Pb_God.PBG2CFactionSkillReset): void
		{
			this.skillLevelMap.put(value.jobtype, 0);
			this.skillResetCount = value.resetcount;
			this.reddotModel.getChildModel("skill").refreshChild(value.jobtype); //刷新指定职业技能的红点状态
			EventMgr.trigger(EventNotify.Faction_Skill_Update, value.jobtype, 0);
		}
		/*****
		 *	帮派副本同步			PBG2CFactionCopymapSyn
		 * @param PBG2CFactionCopymapSyn
		 * 		copymapinfo			PBFactionCopymapInfo	副本信息
		 * 		skilllevel			uint32	被动技能等级
		 * 		skilldeltime			uint32	被动技能消失时间
		 * 		nextcopymapnotictime			uint32	 下次招募时间
		 * 		lastdamage			int64	当前自己上一次的伤害值 -1表示无伤害
		 */
		protected onCopymapSyn(value: Pb_God.PBG2CFactionCopymapSyn): void
		{
			this.bossBuffLv = value.skilllevel;
			this.bossBuffOverTime = value.skilldeltime;
			this.curBossInfo = value.copymapinfo;
			this.nextcopymapnotictime = value.nextcopymapnotictime;
			this.bossLastHit = value.lastdamage.toNumber();
		}
		/*****
		 *	帮派副本排行同步		PBG2CFactionCopymapTop
		 * @param PBG2CFactionCopymapTop
		 * 		id			uint32	副本ID
		 * 		top			PBFactionCopymapTop	排行信息
		 */
		protected onCopymapTop(value: Pb_God.PBG2CFactionCopymapTop): void
		{

		}
		/*****
		 *	帮派副本副本否买加成buff	PBG2CFactionCopymapSkill
		 * @param PBG2CFactionCopymapSkill
		 * 		skilllevel			uint32	被动技能等级
		 * 		skilldeltime			uint32	被动技能消失时间
		 */
		protected onCopymapUpdateSkill(value: Pb_God.PBG2CFactionCopymapSkill): void
		{
			this.bossBuffLv = value.skilllevel;
			this.bossBuffOverTime = value.skilldeltime;
		}
		/*****
		 *	同步捐献活跃度		PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onSynDonateLiveness(value: Pb_God.PBU32): void
		{
			this.donateliveness = value.value;
		}
		/*****
		 *	帮派副本副本更新次数	PBG2CFactionCopymapUpdateCount
		 * @param PBG2CFactionCopymapUpdateCount
		 * 		copymapbuycount			uint32	 副本购买次数
		 * 		copymapusefreecount			uint32	 副本使用免费次数
		 * 		copymapusebuycount			uint32	 副本使用购买次数
		 */
		protected onCopymapUpdateCount(value: Pb_God.PBG2CFactionCopymapUpdateCount): void
		{
			this.bossBuyCount = value.copymapbuycount;
			this.bossUseBuyCount = value.copymapusebuycount;
			this.bossUseFreeCount = value.copymapusefreecount;
		}
		/*****
		 *	副本扫荡返回			
		 * @param 
		 */
		protected onCopymapSweep(): void
		{

		}
		/*****
		 *	帮派重命名			PBG2CFactionRenameAck		
		 * @param PBG2CFactionRenameAck
		 * 		nextrenametime			uint32	下次重命名时间
		 * 		name			string	名称
		 */
		protected onRename(value: Pb_God.PBG2CFactionRenameAck): void
		{
			this.nextrenametime = value.nextrenametime;
			this._factioName = value.name;
			if (this.factionDisplay)
			{
				this.factionDisplay.base.name = value.name;
			}
			EventMgr.trigger(EventNotify.Faction_DisplayUpdate);
		}
		/*****
		 *	公会招募				PBG2CFactionRecruitAck
		 * @param PBG2CFactionRecruitAck
		 * 		nextrecruittime			uint32	 下次招募时间
		 * 		dayrecruitcount			uint32	 日招募次数
		 */
		protected onRecruit(value: Pb_God.PBG2CFactionRecruitAck): void
		{
			this.nextrecruittime = value.nextrecruittime;
			this.issueRecruitCount = value.dayrecruitcount;
		}
		/*****
		 *	副本集结				PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onCopymapNotice(value: Pb_God.PBU32): void
		{
			this.nextcopymapnotictime = value.value;
		}
		/*****
		 *	 帮派红点	无内容
		 * @param 
		 */
		protected onApplyHotData(): void
		{
			this.changeMemberApplyState(true);
		}
		/*****
		 *	公会弹劾				PBG2CFactionImpeach
		 * @param PBG2CFactionImpeach
		 */
		protected onImpeach(value: Pb_God.PBG2CFactionImpeach): void
		{
			TipsUtils.showTips(Global.getLangStr("faction_msg38"));
		}
		/*****
		 *	返回所有对阵列表		PBG2CFactionWarListAck
		 * @param PBG2CFactionWarListAck
		 * 		self			PBFactionWarList	自己
		 * 		list			PBFactionWarList	对阵信息
		 */
		protected onQueryAllListAck(value: Pb_God.PBG2CFactionWarListAck): void
		{

		}
		/*****
		 *	返回查询成员列表		PBG2CFactionWarMemberListAck
		 * @param PBG2CFactionWarMemberListAck
		 * 		tarfactionid			uint32	目标帮派ID
		 * 		member			PBFactionWarMemberDisplay	成员信息
		 * 		friendstar			uint32	友方总星星
		 * 		enemystar			uint32	敌方总星星
		 * 		ruinslevel			uint32	废墟等级
		 * 		warlist			PBFactionWarList	对战信息
		 */
		protected onQueryMemberListAck(value: Pb_God.PBG2CFactionWarMemberListAck): void
		{
			this.warBuffLv = value.ruinslevel;
			if (value.warlist)
			{
				if (value.warlist.left.factionid == this.getFactionId())
				{
					this.warSelfInfo = value.warlist.left;
					this.warEnemyInfo = value.warlist.right;
				} else
				{
					this.warSelfInfo = value.warlist.right;
					this.warEnemyInfo = value.warlist.left;
				}
			}
		}
		/*****
		 *	返回查询成员信息		PBG2CFactionWarMemberInfoAck
		 * @param PBG2CFactionWarMemberInfoAck
		 * 		battledisplay			PBBattleDisplay	帮派显示
		 * 		beattackstar			uint32	被攻打星数
		 * 		sucdefensecount			uint32	成功防御次数
		 * 		toldefensecount			uint32	据点被挑战次数
		 */
		protected onQueryMemberInfoAck(value: Pb_God.PBG2CFactionWarMemberInfoAck): void
		{

		}
		/*****
		 *	返回查询战场日志		PBG2CFactionWarLogAck
		 * @param PBG2CFactionWarLogAck
		 * 		log			PBFactionWarLog	战场日志信息
		 */
		protected onQueryWarLog(value: Pb_God.PBG2CFactionWarLogAck): void
		{

		}
		/*****
		 *	返回查询我的日志		PBG2CFactionWarLogAck
		 * @param PBG2CFactionWarLogAck
		 * 		log			PBFactionWarLog	战场日志信息
		 */
		protected onQuerySelfLog(value: Pb_God.PBG2CFactionWarLogAck): void
		{

		}
		/*****
		 *	返回查询目标防御记录	PBG2CFactionWarTarRecordAck
		 * @param PBG2CFactionWarTarRecordAck
		 * 		tarplayerid			uint32	目标ID
		 * 		record			PBFactionWarRecord	防御记录
		 */
		protected onQueryTarRecordLog(value: Pb_God.PBG2CFactionWarTarRecordAck): void
		{

		}
		/*****
		 *	返回查询进攻列表		PBG2CFactionWarAttackListAck
		 * @param PBG2CFactionWarAttackListAck
		 * 		member			PBFactionWarMemberDisplay	成员信息
		 */
		protected onQueryAttackListAck(value: Pb_God.PBG2CFactionWarAttackListAck): void
		{

		}
		/*****
		 *	返回所有宝箱信息		PBG2CFactionWarSynBoxInfo
		 * @param PBG2CFactionWarSynBoxInfo
		 * 		totolcount			uint32	总共个数
		 * 		result			uint32	战斗结果 _emBattleResult
		 * 		box			PBFactionWarBox	开启过的宝箱
		 */
		protected onSynBoxInfo(value: Pb_God.PBG2CFactionWarSynBoxInfo): void
		{

		}
		/*****
		 *	开启宝箱返回			PBFactionWarBox
		 * @param PBFactionWarBox
		 * 		pos			uint32	宝箱位置1开始
		 * 		index			uint32	宝箱索引
		 * 		playerid			uint32	开启的玩家ID
		 * 		playername			string	开启的玩家名称
		 */
		protected onOpenBoxPrizeAck(value: Pb_God.PBFactionWarBox): void
		{

		}
		/*****
		 *	开启返回				PBG2CFactionWarSynOpen	
		 * @param PBG2CFactionWarSynOpen
		 * 		isjoin			bool	是否参加
		 */
		protected onOpenAck(value: Pb_God.PBG2CFactionWarSynOpen): void
		{
			this.warIsFinalist = value.isjoin;
			FactionDataMgr.parseCurFactionWarState();
		}
		/*****
		 *	返回匹配成功			
		 * @param 
		 */
		protected onSynMatch(): void
		{
			this.warIsFinalist = true;
			this.parseCurFactionWarState();
		}
		/*****
		 *	公会战挑战结果		PBG2CFactionWarFightResult
		 * @param PBG2CFactionWarFightResult
		 * 		warcount			uint32	次数
		 */
		protected onFightResult(value: Pb_God.PBG2CFactionWarFightResult): void
		{
			this.warUseCount = value.warcount;
			this.reddotModel.refreshChild("factionwar");
		}
		/*****
		 *	 帮会日志 			PBFactionAllEvents
		 * @param PBFactionAllEvents
		 * 		events			PBFactionEvent	事件
		 */
		protected onLog(value: Pb_God.PBFactionAllEvents): void
		{

		}
		/*****
		 *	同步游戏数据			PBFactionSynGame
		 * @param PBFactionSynGame
		 * 		donateliveness			uint32	每日捐献活跃度
		 * 		copymapskilllevel			uint32	副本被动技能等级
		 * 		curcopymapid			uint32	当前副本ID
		 * 		factioname			string	帮派名称
		 * 		dayrecruitcount			uint32	每日招募次数
		 */
		protected onSynGame(value: Pb_God.PBFactionSynGame): void
		{
			//服务器用 客户端不用
		}
		/*****
		 *	副本进入返回			PBFightBase
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
		 *	公会战挑战返回		PBFightBase
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
		protected onWarFightBeginAck(value: Pb_God.PBFightBase): void
		{

		}
		/*****
		 *	宝箱奖励				PBFactionWarBox
		 * @param PBFactionWarBox
		 * 		pos			uint32	宝箱位置1开始
		 * 		index			uint32	宝箱索引
		 * 		playerid			uint32	开启的玩家ID
		 * 		playername			string	开启的玩家名称
		 */
		protected onWarOpenBoxPrizeAck(value: Pb_God.PBFactionWarBox): void
		{

		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}