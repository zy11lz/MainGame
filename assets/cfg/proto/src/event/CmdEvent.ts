
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

module Pro.CmdEvent
{
	/** 选择角色返回	PBSelectPlayerAck*/
	export var Player_SelectPlayer: string = "Player_SelectPlayer";
	/** 基础信息 PBPlayerBase*/
	export var Player_BaseInfo: string = "Player_BaseInfo";
	/** 功能系统信息 PBPlayerSystem*/
	export var Player_SystemInfo: string = "Player_SystemInfo";
	/** 功能系统信息 PBPlayerSystemExt	*/
	export var Player_SystemInfo2: string = "Player_SystemInfo2";
	/** 背包信息 PBPlayerBag*/
	export var Player_BagInfo: string = "Player_BagInfo";
	/** 背包信息 PBPlayerBag 扩展*/
	export var Player_BagInfo2: string = "Player_BagInfo2";
	/** 伙伴信息 PBPlayerPet*/
	export var Player_PetInfo: string = "Player_PetInfo";
	/** 伙伴信息 PBPlayerPet 扩展*/
	export var Player_PetInfo2: string = "Player_PetInfo2";
	/** 伙伴信息3 PBPlayerPetExt	*/
	export var Player_PetInfo3: string = "Player_PetInfo3";
	/** 前端信息 PBClientData*/
	export var Player_ClientInfo: string = "Player_ClientInfo";
	/** 好友信息 PBPlayerFriend*/
	export var Player_Friend: string = "Player_Friend";
	/** 邮件信息 PBPlayerMail*/
	export var Player_Mail: string = "Player_Mail";
	/** 帮会信息 PBPlayerFaction*/
	export var Player_Faction: string = "Player_Faction";
	/** 检测角色名字 PBPlayerNameAck*/
	export var Player_CheckPlayerName: string = "Player_CheckPlayerName";
	/** 玩家数据发送完成	*/
	export var Player_LoadComplete: string = "Player_LoadComplete";
	/** 防沉迷检测 PBPlayerWallowData*/
	export var Player_CheckWallow: string = "Player_CheckWallow";
	/**消耗同步		PBG2CExpendSyn*/
	export var Common_ExpendSyn: string = "Common_ExpendSyn";
	/**时间事件		PBG2CCommon_TimeEvent*/
	export var Common_TimeEvent: string = "Common_TimeEvent";
	/**GM命令返回	PBG2CGMCmdTxtCmd*/
	export var Common_GMCmd: string = "Common_GMCmd";
	/**增加等级 		PBG2CAddLevel*/
	export var Common_AddLevel: string = "Common_AddLevel";
	/**通用道具奖励	PBG2CCommonShowPrize*/
	export var Common_ShowPrize: string = "Common_ShowPrize";
	/**查询玩家返回	PBG2CQueryPlayerViewAck*/
	export var Common_PlayerViewAck: string = "Common_PlayerViewAck";
	/**查询伙伴返回	PBPlayerPetView*/
	export var Common_PetViewAck: string = "Common_PetViewAck";
	/**重命名返回	PBPlayerRename*/
	export var Common_PlayerRenameAck: string = "Common_PlayerRenameAck";
	/**更新战斗力	PBU32*/
	export var Common_UpdateFightPower: string = "Common_UpdateFightPower";
	/**同步跨服信息	PBCommonSynPlayerBigWorld*/
	export var Common_SynPlayerBigWorld: string = "Common_SynPlayerBigWorld";
	/**系统开启(id, time)		PBU32U32*/
	export var Common_SystemSwitch: string = "Common_SystemSwitch";
	/**查询玩家名称	PBPlayerFriendInfo*/
	export var Common_FindPlayerNameAck: string = "Common_FindPlayerNameAck";
	/**查询世界等级 PBU32*/
	export var Common_QueryWorldLevel: string = "Common_QueryWorldLevel";
	/**玩家充值通知 PBU32*/
	export var Common_AddRecharge: string = "Common_AddRecharge";
	/**切磋错误通知 PBU32*/
	export var Common_FightEachOther: string = "Common_FightEachOther";
	/**保存个人空间背景返回 PBU32*/
	export var Common_SetBackground: string = "Common_SetBackground";
	/**设置展示的英雄返回  PBG2CCommonShowPets*/
	export var Common_SetShowPets: string = "Common_SetShowPets";
	/**关注返回(world id, player id) PBU32U32*/
	export var Common_Follow: string = "Common_Follow";
	/**取消关注返回(world id, player id) PBU32U32*/
	export var Common_UnFollow: string = "Common_UnFollow";
	/**设置切磋需要验证返回 PBU32*/
	export var Common_SetFEONeedConfirm: string = "Common_SetFEONeedConfirm";
	/**被请求切磋验证的推送 PBG2CCommonFightRequest*/
	export var Common_FightEachOtherRequest: string = "Common_FightEachOtherRequest";
	/**对方的切磋验证回复 PBG2CCommonFightReply*/
	export var Common_FightEachOtherReply: string = "Common_FightEachOtherReply";
	/**使用邀请码(邀请人的 world id, player id) PBU32U32*/
	export var Common_UseInviteCode: string = "Common_UseInviteCode";
	/**有接受自己邀请的玩家(world id, player id) PBU32U32*/
	export var Common_InvitePlayer: string = "Common_InvitePlayer";
	/**同步邀请奖励 PBPlayerInvitePrize*/
	export var Common_InvitePrize: string = "Common_InvitePrize";
	/**请求校验返回 PBG2CCommonSign*/
	export var Common_Sign: string = "Common_Sign";
	/**请求全服物品记录返回 PBWorldItemLogs*/
	export var Common_WorldItemLog: string = "Common_WorldItemLog";
	/**领取问卷奖励*/
	export var Common_SurveyPrize: string = "Common_SurveyPrize";
	/**开启系统奖励返回 PBU32*/
	export var Common_SystemSwitchPrize: string = "Common_SystemSwitchPrize";
	/**简单通用奖励 PBU32*/
	export var Common_Prize: string = "Common_Prize";
	/**通用返回(失败才返回)*/
	export var Copymap_CommonAck: string = "Copymap_CommonAck";
	/**同步副本数据 PBPlayerCopymapInfo*/
	export var Copymap_SynInfo: string = "Copymap_SynInfo";
	/**同步购买次数 PBPlayerCopymapInfo*/
	export var Copymap_BuyCount: string = "Copymap_BuyCount";
	/**新增				PBPlayerPetInfo*/
	export var Pet_AddNew_Ack: string = "Pet_AddNew_Ack";
	/**删除				PBG2CPet_Remove_Ack*/
	export var Pet_Remove_Ack: string = "Pet_Remove_Ack";
	/**设置阵法返回		PBPlayerZhenfaInfo*/
	export var Pet_Set_Zhenfa_Ack: string = "Pet_Set_Zhenfa_Ack";
	/**升级伙伴返回		PBG2CPet_UpLevel_Ack*/
	export var Pet_UpLevel_Ack: string = "Pet_UpLevel_Ack";
	/**伙伴升阶返回		PBCAGPet_Advance*/
	export var Pet_Advance_Ack: string = "Pet_Advance_Ack";
	/**伙伴升星返回		PBG2CPet_UpStar*/
	export var Pet_UpStar_Ack: string = "Pet_UpStar_Ack";
	/**穿戴装备返回		PBCAGPet_Equip*/
	export var Pet_Equip_Ack: string = "Pet_Equip_Ack";
	/**一键穿戴装备返回	PBG2CPet_AutoEquip*/
	export var Pet_AutoEquip_Ack: string = "Pet_AutoEquip_Ack";
	/**伙伴加锁返回		PBCAGPet_Lock*/
	export var Pet_Lock_Ack: string = "Pet_Lock_Ack";
	/**穿戴符文返回		PBCAGPet_RuneEquip*/
	export var Pet_RuneEquip_Ack: string = "Pet_RuneEquip_Ack";
	/**天赋领悟返回	PBCAGPet_Talent*/
	export var Pet_LearnTalent_Ack: string = "Pet_LearnTalent_Ack";
	/**天赋遗忘返回	PBCAGPet_Talent*/
	export var Pet_DelTalent_Ack: string = "Pet_DelTalent_Ack";
	/**天赋升级返回	PBCAGPet_Talent*/
	export var Pet_UpgradeTalent_Ack: string = "Pet_UpgradeTalent_Ack";
	/**购买背包		PBCAGPet_BuyBag*/
	export var Pet_BuyBag_Ack: string = "Pet_BuyBag_Ack";
	/**失败才返回*/
	export var Pet_Common_Ack: string = "Pet_Common_Ack";
	/**设置皮肤返回	PBCAGPet_SetSkin*/
	export var Pet_SetSkin_Ack: string = "Pet_SetSkin_Ack";
	/**同步显示属性	PBG2CSynPetAttr*/
	export var Pet_SynAttr: string = "Pet_SynAttr";
	/**同步单个战斗力	PBG2CSynPetFightPower*/
	export var Pet_SynFightPower: string = "Pet_SynFightPower";
	/**穿戴神装返回	PBCAGPet_GodEquip*/
	export var Pet_GodEquip_Ack: string = "Pet_GodEquip_Ack";
	/**同步套装格子 	PBPlayerGodEquipSuitInfo*/
	export var Pet_GodSuit_Syn: string = "Pet_GodSuit_Syn";
	/**一键脱下神装	PBU64*/
	export var Pet_GodUnEquipOneKey_Ack: string = "Pet_GodUnEquipOneKey_Ack";
	/**查询伙伴评分 	PBG2CPetQueryScore*/
	export var Pet_QueryScore_Ack: string = "Pet_QueryScore_Ack";
	/**同步属性预览	PBG2CSynPreviewAttr*/
	export var Pet_SynPreviewAttr: string = "Pet_SynPreviewAttr";
	/**置换返回		PBPlayerPetInfo*/
	export var Pet_Replace_Ack: string = "Pet_Replace_Ack";
	/**回退返回		PBPlayerPetInfo*/
	export var Pet_Degenerate_Ack: string = "Pet_Degenerate_Ack";
	/**神装预览返回	PBG2CGodEquipPreview*/
	export var Pet_GodEquipPreview: string = "Pet_GodEquipPreview";
	/**出现没见过的英雄(doing type, sn)	PBU32U64*/
	export var Pet_NotSeenPet: string = "Pet_NotSeenPet";
	/**重生返回(次数，SN)		PBU32U64*/
	export var Pet_Reborn: string = "Pet_Reborn";
	/**购买重生次数返回		PBU32*/
	export var Pet_BuyRebornCount: string = "Pet_BuyRebornCount";
	/**吞噬返回(exp, petsn)		PBU32U64*/
	export var Pet_Swallow: string = "Pet_Swallow";
	/**高星重生		PBU64*/
	export var Pet_HighStarReborn: string = "Pet_HighStarReborn";
	/**进化 PBG2CPet_Evolve_Ack*/
	export var Pet_Evolve_Ack: string = "Pet_Evolve_Ack";
	/**魂器觉醒  PBG2CHorcruxAwake*/
	export var Pet_Horcrux_Awake: string = "Pet_Horcrux_Awake";
	/**魂器强化  PBG2CHorcruxLevelUp*/
	export var Pet_Horcrux_LevelUp: string = "Pet_Horcrux_LevelUp";
	/**宠物状态变化 PBG2CPetStateChg*/
	export var Pet_State_Chg: string = "Pet_State_Chg";
	/**领取档案奖励 PBU32*/
	export var Pet_PetAchivesReward_Chg: string = "Pet_PetAchivesReward_Chg";
	/**	 新增道具				PBG2CNewItem*/
	export var Item_New: string = "Item_New";
	/**	 更新道具信息			PBItem*/
	export var Item_Update: string = "Item_Update";
	/**	 更新道具数量			PBG2CUpdateItem*/
	export var Item_UpdateNum: string = "Item_UpdateNum";
	/**	 使用道具返回			无内容*/
	export var Item_Use: string = "Item_Use";
	/**	 通用失败返回*/
	export var Item_Common: string = "Item_Common";
	/**	 符文合成返回			PBItemSn*/
	export var Item_RuneCompound: string = "Item_RuneCompound";
	/**	 符文重铸返回			PBG2CRuneRefineAck*/
	export var Item_RuneRefine: string = "Item_RuneRefine";
	/**	 符文重铸保存返回		PBItem*/
	export var Item_SaveRuneRefine: string = "Item_SaveRuneRefine";
	/** 	 装备合成返回			失败才返回*/
	export var Item_EquipCompound: string = "Item_EquipCompound";
	/** 	 装备一键合成返回		失败才返回*/
	export var Item_EquipAutoCompound: string = "Item_EquipAutoCompound";
	/** 	 伙伴合成返回			PBG2CPetCompound*/
	export var Item_PetCompound: string = "Item_PetCompound";
	/**	 神装洗练	返回		PBG2CGodEquipRefineAck*/
	export var Item_GodEquipRefine: string = "Item_GodEquipRefine";
	/**	 神装洗练	保存返回	PBItem*/
	export var Item_SaveGodEquipRefine: string = "Item_SaveGodEquipRefine";
	/**	 查询装备合成记录		PBG2CEquipCompoundLog	*/
	export var Item_EquipCompoundLog: string = "Item_EquipCompoundLog";
	/**通用失败返回*/
	export var Fight_Common_Ack: string = "Fight_Common_Ack";
	/**普通战斗返回			PBFightBase*/
	export var Fight_NormalBegin_Ack: string = "Fight_NormalBegin_Ack";
	/**普通战斗结果			PBFightResult*/
	export var Fight_NormalResult_Ack: string = "Fight_NormalResult_Ack";
	/**加载正在进行的战斗	PBFightResult*/
	export var Fight_LoadIng: string = "Fight_LoadIng";
	/**无尽继续返回			PBFightResult*/
	export var Fight_EndlessContinue_Ack: string = "Fight_EndlessContinue_Ack";
	/** 	 完成任务返回		失败才返回*/
	export var Task_CompleteAck: string = "Task_CompleteAck";
	/**	 新增任务			PBG2CTaskUpdate*/
	export var Task_Add: string = "Task_Add";
	/**	 更新任务参数		PBG2CTaskUpdate*/
	export var Task_Syn: string = "Task_Syn";
	/**新邮件 	PBMail*/
	export var Mail_New: string = "Mail_New";
	/**删除返回	 PBAllMailID*/
	export var Mail_Delete: string = "Mail_Delete";
	/**已读返回	PBMailID*/
	export var Mail_Read: string = "Mail_Read";
	/**领取返回	PBAllMailID*/
	export var Mail_Reward: string = "Mail_Reward";
	/**排行榜列表返回	PBS2CTopListList	*/
	export var TopList_List_Ack: string = "TopList_List_Ack";
	/**帮派排行榜列表返回	PBS2CFactionTopList*/
	export var TopList_FactionList_Ack: string = "TopList_FactionList_Ack";
	/**所有世界排行	PBS2CAllTopList*/
	export var TopList_WorldAll_Ack: string = "TopList_WorldAll_Ack";
	/**所有跨服排行	PBS2CAllTopList*/
	export var TopList_BWAll_Ack: string = "TopList_BWAll_Ack";
	/**自己排名信息	PBTopListDetail*/
	export var TopList_GetSelf_Ack: string = "TopList_GetSelf_Ack";
	/**返回奖励索引	PBS2CRewardID */
	export var TopList_RewardID: string = "TopList_RewardID";
	/**失败才返回*/
	export var Challenge_Common_Ack: string = "Challenge_Common_Ack";
	/**对手信息返回		PBG2CChallengeTargetAck*/
	export var Challenge_Target_Ack: string = "Challenge_Target_Ack";
	/**领取周宝箱返回	PBU32*/
	export var Challenge_WeekPrize: string = "Challenge_WeekPrize";
	/**自己的排行信息	PBG2CChallengeTopInfo*/
	export var Challenge_OpenSyn: string = "Challenge_OpenSyn";
	/**同步进入次数		PBG2CChallengeSynEnterCount*/
	export var Challenge_SynEnterCount: string = "Challenge_SynEnterCount";
	/**被点赞次数		PBChallengeLikeAck*/
	export var Challenge_LikeNum: string = "Challenge_LikeNum";
	/**点赞次数		PBU32*/
	export var Challenge_LikeNumToPlayer: string = "Challenge_LikeNumToPlayer";
	/**对手信息返回		PBG2CChallengeTargetInfo*/
	export var Challenge_Target_PlayerInfo: string = "Challenge_Target_PlayerInfo";
	/**点赞返回			PBU32*/
	export var Challenge_Like: string = "Challenge_Like";
	/**	 通用返回				失败才返回*/
	export var Faction_Common: string = "Faction_Common";
	/**	 创建帮会				PBC2GFactionCreate*/
	export var Faction_Create: string = "Faction_Create";
	/**	 帮会基本数据			PBG2CFactionSyn*/
	export var Faction_Syn: string = "Faction_Syn";
	/**	 退出帮会*/
	export var Faction_Quit: string = "Faction_Quit";
	/**	 请求自己申请帮会列表	PBG2CFactionApplyList	*/
	export var Faction_SelfApplyList: string = "Faction_SelfApplyList";
	/**	 所有自己申请的帮派	PBG2CFactionAllApply	*/
	export var Faction_SelfAllApply: string = "Faction_SelfAllApply";
	/**	 请求帮会列表			PBG2CFactionList	*/
	export var Faction_TopList: string = "Faction_TopList";
	/**	 请求帮会成员列表		PBG2CFactionMemberList*/
	export var Faction_MemberList: string = "Faction_MemberList";
	/**	 帮会删除				PBU32*/
	export var Faction_Remove: string = "Faction_Remove";
	/**	 修改帮派公告			PBC2GFactionEdit*/
	export var Faction_Edit: string = "Faction_Edit";
	/**	 删除一个申请			PBU32	*/
	export var Faction_DelApply: string = "Faction_DelApply";
	/**	 改变官职				失败才返回	*/
	export var Faction_ChangeJob: string = "Faction_ChangeJob";
	/**	 申请返回				失败才返回	*/
	export var Faction_Apply: string = "Faction_Apply";
	/**	 帮会捐献返回			PBU32*/
	export var Faction_Donate: string = "Faction_Donate";
	/**	 查看申请帮会列表		PBG2CFactionQueryApplyList	*/
	export var Faction_QueryApplyList: string = "Faction_QueryApplyList";
	/**	 修改入会条件			PBCAGFactionSetCondition	*/
	export var Faction_SetCondition: string = "Faction_SetCondition";
	/**	 通知玩家加入帮会		无内容	*/
	export var Faction_JoinAck: string = "Faction_JoinAck";
	/**	 通知玩家退出帮会		无内容	*/
	export var Faction_ExitAck: string = "Faction_ExitAck";
	/**	 领取捐献奖励返回		PBU32*/
	export var Faction_DonatePrize: string = "Faction_DonatePrize";
	/**	 活跃度同步返回		PBG2CFactionSynLiveness*/
	export var Faction_SynLiveness: string = "Faction_SynLiveness";
	/**	 技能升级				PBCAGFactionSkillUpgrade*/
	export var Faction_UpgradeSkill: string = "Faction_UpgradeSkill";
	/**	 技能重置				PBG2CFactionSkillReset*/
	export var Faction_SkillReset: string = "Faction_SkillReset";
	/**	帮派副本同步			PBG2CFactionCopymapSyn*/
	export var Faction_CopymapSyn: string = "Faction_CopymapSyn";
	/**	帮派副本排行同步		PBG2CFactionCopymapTop*/
	export var Faction_CopymapTop: string = "Faction_CopymapTop";
	/**	帮派副本副本否买加成buff	PBG2CFactionCopymapSkill*/
	export var Faction_CopymapUpdateSkill: string = "Faction_CopymapUpdateSkill";
	/**	同步捐献活跃度		PBU32*/
	export var Faction_SynDonateLiveness: string = "Faction_SynDonateLiveness";
	/**	帮派副本副本更新次数	PBG2CFactionCopymapUpdateCount*/
	export var Faction_CopymapUpdateCount: string = "Faction_CopymapUpdateCount";
	/**	副本扫荡返回			*/
	export var Faction_CopymapSweep: string = "Faction_CopymapSweep";
	/**	帮派重命名			PBG2CFactionRenameAck		*/
	export var Faction_Rename: string = "Faction_Rename";
	/**	公会招募				PBG2CFactionRecruitAck*/
	export var Faction_Recruit: string = "Faction_Recruit";
	/**	副本集结				PBU32*/
	export var Faction_CopymapNotice: string = "Faction_CopymapNotice";
	/**	 帮派红点	无内容*/
	export var Faction_ApplyHotData: string = "Faction_ApplyHotData";
	/**	公会弹劾				PBG2CFactionImpeach*/
	export var Faction_Impeach: string = "Faction_Impeach";
	/**	 PVP技能升级				PBG2CFactionPVPSkillUpgrade*/
	export var Faction_UpgradePVPSkill: string = "Faction_UpgradePVPSkill";
	/**	 PVP技能重置				PBG2CFactionPVPSkillReset*/
	export var Faction_PVPSkillReset: string = "Faction_PVPSkillReset";
	/**	返回所有对阵列表		PBG2CFactionWarListAck*/
	export var FactionWar_QueryAllListAck: string = "FactionWar_QueryAllListAck";
	/**	返回查询成员列表		PBG2CFactionWarMemberListAck*/
	export var FactionWar_QueryMemberListAck: string = "FactionWar_QueryMemberListAck";
	/**	返回查询成员信息		PBG2CFactionWarMemberInfoAck*/
	export var FactionWar_QueryMemberInfoAck: string = "FactionWar_QueryMemberInfoAck";
	/**	返回查询战场日志		PBG2CFactionWarLogAck*/
	export var FactionWar_QueryWarLog: string = "FactionWar_QueryWarLog";
	/**	返回查询我的日志		PBG2CFactionWarLogAck*/
	export var FactionWar_QuerySelfLog: string = "FactionWar_QuerySelfLog";
	/**	返回查询目标防御记录	PBG2CFactionWarTarRecordAck*/
	export var FactionWar_QueryTarRecordLog: string = "FactionWar_QueryTarRecordLog";
	/**	返回查询进攻列表		PBG2CFactionWarAttackListAck*/
	export var FactionWar_QueryAttackListAck: string = "FactionWar_QueryAttackListAck";
	/**	返回所有宝箱信息		PBG2CFactionWarSynBoxInfo*/
	export var FactionWar_SynBoxInfo: string = "FactionWar_SynBoxInfo";
	/**	开启宝箱返回			PBFactionWarBox*/
	export var FactionWar_OpenBoxPrizeAck: string = "FactionWar_OpenBoxPrizeAck";
	/**	开启返回				PBG2CFactionWarSynOpen	*/
	export var FactionWar_OpenAck: string = "FactionWar_OpenAck";
	/**	返回匹配成功			*/
	export var FactionWar_SynMatch: string = "FactionWar_SynMatch";
	/**	公会战挑战结果		PBG2CFactionWarFightResult*/
	export var FactionWar_FightResult: string = "FactionWar_FightResult";
	/**	 帮会日志 			PBFactionAllEvents*/
	export var Faction_Log: string = "Faction_Log";
	/**	同步游戏数据			PBFactionSynGame*/
	export var Faction_SynGame: string = "Faction_SynGame";
	/**	副本进入返回			PBFightBase*/
	export var Faction_FightBeginAck: string = "Faction_FightBeginAck";
	/**	公会战挑战返回		PBFightBase*/
	export var Faction_WarFightBeginAck: string = "Faction_WarFightBeginAck";
	/**	宝箱奖励				PBFactionWarBox*/
	export var Faction_WarOpenBoxPrizeAck: string = "Faction_WarOpenBoxPrizeAck";
	/**	 通用				通用失败才返回*/
	export var Team_Common: string = "Team_Common";
	/**	 返回队伍列表		PBG2CTeamList*/
	export var Team_List: string = "Team_List";
	/**	 同步队伍信息		PBTeamData*/
	export var Team_SynData: string = "Team_SynData";
	/**	 离开队伍返回*/
	export var Team_Exit: string = "Team_Exit";
	/**	 设置队伍状态返回	PBCAGTeamSetStatus*/
	export var Team_SetStatus: string = "Team_SetStatus";
	/**	 通用失败返回*/
	export var Call_Common: string = "Call_Common";
	/**	 更新召唤信息		PBPlayerCallInfo*/
	export var Call_Update: string = "Call_Update";
	/** 	 伙伴转换返回		PBPlayerCallChange*/
	export var Call_Change: string = "Call_Change";
	/** 	 伙伴转换保存返回	PBU32*/
	export var Call_SaveChangeAck: string = "Call_SaveChangeAck";
	/** 	 设置自动分解返回	PBU32*/
	export var Call_AutoSplit: string = "Call_AutoSplit";
	/** 	 固定伙伴转换返回	PBPlayerCallChange*/
	export var Call_FixChange: string = "Call_FixChange";
	/**	 通用错误返回*/
	export var Sail_Common: string = "Sail_Common";
	/**	 刷新返回 	PBG2CSailRefresh*/
	export var Sail_Refresh: string = "Sail_Refresh";
	/**	 接取返回		PBPlayerSailInfo*/
	export var Sail_Accpet: string = "Sail_Accpet";
	/**	 完成返回		PBU32*/
	export var Sail_DelAccpet: string = "Sail_DelAccpet";
	/**	通用错误返回*/
	export var Hook_Common: string = "Hook_Common";
	/**	收益领奖					PBG2CProfitAck	*/
	export var Hook_ProfitAck: string = "Hook_ProfitAck";
	/**	飞新地图返回(新地图ID)	PBU32*/
	export var Hook_FlyNewSceneAck: string = "Hook_FlyNewSceneAck";
	/**	领取关卡奖励返回			PBU32*/
	export var Hook_StagePrizeAck: string = "Hook_StagePrizeAck";
	/**	快速挑战返回				PBG2CSweepAck	*/
	export var Hook_SweepAck: string = "Hook_SweepAck";
	/**	同步新关卡				PBG2CSynStageAck*/
	export var Hook_SynStage: string = "Hook_SynStage";
	/**	 通用错误返回*/
	export var Artifact_Common: string = "Artifact_Common";
	/**	 激活返回 		PBCAGArtifactActive*/
	export var Artifact_Active: string = "Artifact_Active";
	/**	 新增神器 		PBPlayerArtifactInfo*/
	export var Artifact_AddNew: string = "Artifact_AddNew";
	/** 	 升级返回			PBG2CArtifactUpgrade*/
	export var Artifact_Upgrade: string = "Artifact_Upgrade";
	/** 	 技能升级返回		PBG2CArtifactSkill*/
	export var Artifact_Skill: string = "Artifact_Skill";
	/** 	 刻印石头返回		PBU32*/
	export var Artifact_UseStone: string = "Artifact_UseStone";
	/**	 同步信息 		PBPlayerArtifactInfo*/
	export var Artifact_Syn: string = "Artifact_Syn";
	/** 	 幻化返回			PBCAGArtifactShape*/
	export var Artifact_Shape: string = "Artifact_Shape";
	/**	 觉醒				PBU32*/
	export var Artifact_Awake: string = "Artifact_Awake";
	/**	 觉醒奖励			PBU32*/
	export var Artifact_AwakePrize: string = "Artifact_AwakePrize";
	/**	 法阵觉醒推送		PBU32*/
	export var Artifact_FazhenAwake: string = "Artifact_FazhenAwake";
	/**	 通用错误返回*/
	export var Shop_Common: string = "Shop_Common";
	/**	 购买返回 			PBCAGShopBuy*/
	export var Shop_Buy: string = "Shop_Buy";
	/**	 重置返回				PBPlayerFixShop*/
	export var Shop_Reset: string = "Shop_Reset";
	/**	 刷新返回				PBPlayerRandShop*/
	export var Shop_Refresh: string = "Shop_Refresh";
	/**	 同步随机商店刷新次数	PBG2CSynRandRefreshCount*/
	export var Shop_SynRandRefreshCount: string = "Shop_SynRandRefreshCount";
	/**通用返回(失败才返回)*/
	export var Train_CommonAck: string = "Train_CommonAck";
	/**练塔购买次数返回(类型，次数)	PBU32U32*/
	export var Train_TowerBuyCount: string = "Train_TowerBuyCount";
	/**试练塔领奖返回 			PBU32*/
	export var Train_TowerPrize: string = "Train_TowerPrize";
	/**试练塔挑战次数 			PBG2CTowerFightCount*/
	export var Train_TowerFightCount: string = "Train_TowerFightCount";
	/**无尽试炼领奖				PBU32*/
	export var Train_EndlessPrize: string = "Train_EndlessPrize";
	/**无尽试炼选择buff返回		PBU32*/
	export var Train_EndlessBuff: string = "Train_EndlessBuff";
	/**无尽试炼通知buff组		PBU32*/
	export var Train_EndlessBuffGroup: string = "Train_EndlessBuffGroup";
	/**无尽试炼同步信息			PBPlayerTrainEndless*/
	export var Train_SynEndlessInfo: string = "Train_SynEndlessInfo";
	/**查询试练塔录像返回		PBWorldStageVideoInfo*/
	export var Train_QueryTowerVideoAck: string = "Train_QueryTowerVideoAck";
	/**废弃*/
	export var Train_xxxxxxxxxxx: string = "Train_xxxxxxxxxxx";
	/**废弃*/
	export var Train_xxxxxxxxxx: string = "Train_xxxxxxxxxx";
	/** 废弃*/
	export var Train_xxxxxxxxx: string = "Train_xxxxxxxxx";
	/** 购买buff返回			PBU32			*/
	export var Train_PeakBuyBuff: string = "Train_PeakBuyBuff";
	/** 购买次数返回(fight count, buy count) PBU32U32*/
	export var Train_PeakBuyCount: string = "Train_PeakBuyCount";
	/**	 通用错误返回*/
	export var Achieve_Common: string = "Achieve_Common";
	/**	 活跃完成 			PBU32*/
	export var Achieve_LivenessComplete: string = "Achieve_LivenessComplete";
	/**	 活跃领奖 			PBU32*/
	export var Achieve_LivenessPrize: string = "Achieve_LivenessPrize";
	/**	 主线完成				PBU32*/
	export var Achieve_MainComplete: string = "Achieve_MainComplete";
	/**	 新增主线				PBPlayerOneAchieve*/
	export var Achieve_MainAdd: string = "Achieve_MainAdd";
	/**	 更新成就				PBG2CAchieve_Update*/
	export var Achieve_Update: string = "Achieve_Update";
	/**	 历练完成				PBU32*/
	export var Achieve_TrainComplete: string = "Achieve_TrainComplete";
	/**	 更新日活跃			PBU32*/
	export var Achieve_SynDailyLiveness: string = "Achieve_SynDailyLiveness";
	/**	 活动活跃完成 		PBU32*/
	export var Achieve_ActivityLivenessComplete: string = "Achieve_ActivityLivenessComplete";
	/**	 活动活跃领奖 		PBU32*/
	export var Achieve_ActivityLivenessPrize: string = "Achieve_ActivityLivenessPrize";
	/**	 更新活动活跃			PBU32*/
	export var Achieve_SynActivityLiveness: string = "Achieve_SynActivityLiveness";
	/**	 周活跃完成 			PBU32*/
	export var Achieve_WeekLivenessComplete: string = "Achieve_WeekLivenessComplete";
	/**	 周活跃领奖 			PBU32*/
	export var Achieve_WeekLivenessPrize: string = "Achieve_WeekLivenessPrize";
	/**	 更新周活跃			PBU32*/
	export var Achieve_SynWeeklyLiveness: string = "Achieve_SynWeeklyLiveness";
	/** 	 战令完成				PBU32*/
	export var Achieve_WarOrderComplete: string = "Achieve_WarOrderComplete";
	/** 	 战令奖励(等级，是否进阶奖励0/1)				PBU32U32*/
	export var Achieve_WarOrderPrize: string = "Achieve_WarOrderPrize";
	/** 	 同步战令等级(level, exp) PBU32U32*/
	export var Achieve_SyncWarOrderLevel: string = "Achieve_SyncWarOrderLevel";
	/** 	 战令一键奖励			PBG2CWarOrderOneKey*/
	export var Achieve_WarOrderPrizeOneKey: string = "Achieve_WarOrderPrizeOneKey";
	/** 	 图鉴完成				PBU32*/
	export var Achieve_IllustrationComplete: string = "Achieve_IllustrationComplete";
	/** 	 图鉴战力完成		PBU32*/
	export var Achieve_IllustrationPowerComplete: string = "Achieve_IllustrationPowerComplete";
	/** 	 成就之路完成		PBU32*/
	export var Achieve_AchieveRoadComplete: string = "Achieve_AchieveRoadComplete";
	/**通用返回(失败才返回)*/
	export var Expedition_CommonAck: string = "Expedition_CommonAck";
	/**选择难度返回			PBG2CExpeditionInfo*/
	export var Expedition_SelectAck: string = "Expedition_SelectAck";
	/**领取奖励返回 		PBU32*/
	export var Expedition_StagePrizeAck: string = "Expedition_StagePrizeAck";
	/**查询关卡信息返回 	PBExpeditionTar*/
	export var Expedition_StageInfoAck: string = "Expedition_StageInfoAck";
	/**同步伙伴血量 		PBG2CExpeditionSynPetHp		*/
	export var Expedition_SynPetHp: string = "Expedition_SynPetHp";
	/**同步最新关卡 		PBG2CExpeditionSynCurStage		*/
	export var Expedition_SynCurStage: string = "Expedition_SynCurStage";
	/**废弃*/
	export var Expedition_XXXXXXXXX: string = "Expedition_XXXXXXXXX";
	/**废弃*/
	export var Expedition_XXXXXX: string = "Expedition_XXXXXX";
	/**通用返回(失败才返回)*/
	export var Shape_CommonAck: string = "Shape_CommonAck";
	/**增加称号			PBPlayerTitle*/
	export var Shape_AddTitle: string = "Shape_AddTitle";
	/**删除称号 		PBU32*/
	export var Shape_DelTitle: string = "Shape_DelTitle";
	/**同步省份 		PBU32U32*/
	export var Shape_SynProvince: string = "Shape_SynProvince";
	/**设置头像返回 	PBU32*/
	export var Shape_SetHeadAck: string = "Shape_SetHeadAck";
	/**同步所有头像 	PBG2CShapeSynAllHead*/
	export var Shape_SynAllHead: string = "Shape_SynAllHead";
	/**设置头像框返回 	PBU32*/
	export var Shape_SetHeadIconAck: string = "Shape_SetHeadIconAck";
	/**同步所有头像框 	PBG2CShapeSynAllHeadIcon*/
	export var Shape_SynAllHeadIcon: string = "Shape_SynAllHeadIcon";
	/**设置冒险形象返回	PBU32*/
	export var Shape_SetRiskAck: string = "Shape_SetRiskAck";
	/**同步所有冒险形象 PBG2CShapeSynAllRisk*/
	export var Shape_SynAllRisk: string = "Shape_SynAllRisk";
	/**设置称号 		PBU32*/
	export var Shape_SetTitleAck: string = "Shape_SetTitleAck";
	/**同步所有称号 	PBG2CShapeSynAllTitle*/
	export var Shape_SynAllTitle: string = "Shape_SynAllTitle";
	/**同步称号 		PBPlayerTitle*/
	export var Shape_SynTitle: string = "Shape_SynTitle";
	/**增加头像框		PBPlayerHeadIcon*/
	export var Shape_AddHeadIcon: string = "Shape_AddHeadIcon";
	/**同步头像框 		PBPlayerHeadIcon*/
	export var Shape_SynHeadIcon: string = "Shape_SynHeadIcon";
	/**删除头像框 		PBU32*/
	export var Shape_DelTHeadIcon: string = "Shape_DelTHeadIcon";
	/**删除皮肤 		PBU32*/
	export var Shape_DelPetSkin: string = "Shape_DelPetSkin";
	/**增加徽章 		PBPlayerBadge*/
	export var Shape_AddBadge: string = "Shape_AddBadge";
	/**同步荣誉值 		PBU32*/
	export var Shape_SynHonorPoint: string = "Shape_SynHonorPoint";
	/**徽章展示 		PBCAGBadgeDisplay*/
	export var Shape_BadgeDisplay: string = "Shape_BadgeDisplay";
	/**通用返回(失败才返回)*/
	export var Temple_CommonAck: string = "Temple_CommonAck";
	/**同步所有信息			PBG2CTempleSynAll*/
	export var Temple_SynAll: string = "Temple_SynAll";
	/**查看记录返回 		PBG2CTempleQueryRecord*/
	export var Temple_QueryRecord: string = "Temple_QueryRecord";
	/**同步数据 			PBPlayerTemple*/
	export var Temple_Syn: string = "Temple_Syn";
	/**	 通用失败返回*/
	export var Friend_CommonAck: string = "Friend_CommonAck";
	/**	 好友申请			PBPlayerFriendInfo*/
	export var Friend_AddApply: string = "Friend_AddApply";
	/**	 删除申请			PBU32*/
	export var Friend_DelApply: string = "Friend_DelApply";
	/** 	 加好友			PBPlayerFriendInfo*/
	export var Friend_AddFriend: string = "Friend_AddFriend";
	/** 	 删好友			PBU32*/
	export var Friend_DelFriend: string = "Friend_DelFriend";
	/** 	 增加黑名单		PBPlayerFriendInfo*/
	export var Friend_AddBalck: string = "Friend_AddBalck";
	/** 	 移除黑名单		PBU32*/
	export var Friend_DelBalck: string = "Friend_DelBalck";
	/** 	 增加领取礼物		PBU32*/
	export var Friend_RecievePrize: string = "Friend_RecievePrize";
	/** 	 删除领取礼物		PBG2CFriendPrize*/
	export var Friend_DelRecievePrize: string = "Friend_DelRecievePrize";
	/** 	 赠送礼物			PBG2CFriendPrize*/
	export var Friend_SendPrize: string = "Friend_SendPrize";
	/** 	 同步好友信息		PBG2CFriendSyn*/
	export var Friend_SynFriend: string = "Friend_SynFriend";
	/** 	 同步好友上线		PBPlayerFriendInfo*/
	export var Friend_Online: string = "Friend_Online";
	/** 	 同步好友下线		PBPlayerFriendInfo*/
	export var Friend_Offline: string = "Friend_Offline";
	/** 	 推荐好友			PBG2CFriendRefresh*/
	export var Friend_Refresh: string = "Friend_Refresh";
	/** 	 同步支援信息		PBW2GFriendSupportSync*/
	export var Friend_SyncSupport: string = "Friend_SyncSupport";
	/**	 派遣支援返回		PBPlayerSendSupportHero*/
	export var Friend_SendSupport: string = "Friend_SendSupport";
	/**	 搜索返回			PBG2CFriendRefresh*/
	export var Friend_Search: string = "Friend_Search";
	/**	 雇佣支援返回		PBFriendHireSupport*/
	export var Friend_HireSupport: string = "Friend_HireSupport";
	/**	 解雇支援返回		PBFriendHireSupport*/
	export var Friend_FireSupport: string = "Friend_FireSupport";
	/**	 同步已使用支援	PBG2CFriendUsedSupportSync*/
	export var Friend_SyncUsedSupport: string = "Friend_SyncUsedSupport";
	/**通用返回(失败才返回)*/
	export var Element_CommonAck: string = "Element_CommonAck";
	/**更新次数				PBG2CElementUpdateCount*/
	export var Element_UpdateCount: string = "Element_UpdateCount";
	/**更新关卡				PBPlayerElementInfo*/
	export var Element_UpdateStage: string = "Element_UpdateStage";
	/**通用返回(失败才返回)*/
	export var Risk_CommonAck: string = "Risk_CommonAck";
	/**同步所有信息 	PBG2CSynAll*/
	export var Risk_SynAll: string = "Risk_SynAll";
	/**新增格子信息 	PBG2CRiskSynGrid*/
	export var Risk_AddGrid: string = "Risk_AddGrid";
	/**拾取格子返回		PBPlayerRiskGrid*/
	export var Risk_CollectGrid: string = "Risk_CollectGrid";
	/**进入下一层		PBG2CRiskEnterNextStage*/
	export var Risk_EnterNextStage: string = "Risk_EnterNextStage";
	/**领取守卫奖励		PBU32*/
	export var Risk_GuardPrize: string = "Risk_GuardPrize";
	/**同步伙伴血量 	PBPetHp*/
	export var Risk_SynPetHp: string = "Risk_SynPetHp";
	/**同步守卫血量 	PBU32U64*/
	export var Risk_SynGuardHp: string = "Risk_SynGuardHp";
	/**同步生命药剂 		PBG2CRiskSynHpDrug*/
	export var Risk_SynHpDrug: string = "Risk_SynHpDrug";
	/**同步驱魂药剂 	PBG2CRiskSynKillDrug*/
	export var Risk_SynKillDrug: string = "Risk_SynKillDrug";
	/**同步击杀守卫个数 PBU32*/
	export var Risk_SynKillGuard: string = "Risk_SynKillGuard";
	/**同步召唤商人数量 PBU32*/
	export var Risk_SynTrader: string = "Risk_SynTrader";
	/**使用召唤商人 	PBG2CRiskUseTrader	*/
	export var Risk_UseTrader: string = "Risk_UseTrader";
	/**答题返回			PBG2CRiskQuestionAck*/
	export var Risk_QuestionAck: string = "Risk_QuestionAck";
	/**打开商店			PBG2CRiskShopOpenAck*/
	export var Risk_ShopOpenAck: string = "Risk_ShopOpenAck";
	/**商店购买(位置1开始)	PBU32*/
	export var Risk_ShopBuyAck: string = "Risk_ShopBuyAck";
	/**同步被动技能 	PBG2CRiskCollectSkill*/
	export var Risk_SynCollectSkill: string = "Risk_SynCollectSkill";
	/**	 通用错误返回*/
	export var Dan_Common: string = "Dan_Common";
	/**	 同步主界面数据 	PBG2CDan_SynInfo	*/
	export var Dan_SynInfo: string = "Dan_SynInfo";
	/**	 领取奖励返回 	PBU32*/
	export var Dan_AwardAck: string = "Dan_AwardAck";
	/** 	 购买次数返回		PBU32*/
	export var Dan_BuyCountAck: string = "Dan_BuyCountAck";
	/** 	 总战绩查询返回	PBPlayerDanResult*/
	export var Dan_TotalResultAck: string = "Dan_TotalResultAck";
	/** 	 赛季战绩返回		PBPlayerDanResult*/
	export var Dan_SeasonResultAck: string = "Dan_SeasonResultAck";
	/** 	 赛季所有赛区查询	PBG2CDanSeasonAllAreaAck*/
	export var Dan_SeasonAllAreaAck: string = "Dan_SeasonAllAreaAck";
	/** 	 赛区信息查询		PBDanKingRecord*/
	export var Dan_SeasonAreaInfoAck: string = "Dan_SeasonAreaInfoAck";
	/**	 挑战结果返回		PBG2CDanFightResultAck	*/
	export var Dan_FightResultAck: string = "Dan_FightResultAck";
	/**	 搜索对手返回		PBG2CDanSearch*/
	export var Dan_Search: string = "Dan_Search";
	/**	 查询我的记录返回 PBG2CDanRecords*/
	export var Dan_Record: string = "Dan_Record";
	/**	 查询大神记录返回 PBG2CDanRecords*/
	export var Dan_MasterRecord: string = "Dan_MasterRecord";
	/**	挑战请求返回		PBFightBase	*/
	export var Dan_FightBeginAck: string = "Dan_FightBeginAck";
	/**失败才返回*/
	export var Ladder_CommonAck: string = "Ladder_CommonAck";
	/**同步信息			PBG2CLadderSynInfo	*/
	export var Ladder_SynInfo: string = "Ladder_SynInfo";
	/**刷新对手返回		PBG2CLadderRefreshAck*/
	export var Ladder_RefreshAck: string = "Ladder_RefreshAck";
	/**购买次数返回		PBU32*/
	export var Ladder_BuyCountAck: string = "Ladder_BuyCountAck";
	/**同步挑战从数		PBU32*/
	export var Ladder_SynFightCount: string = "Ladder_SynFightCount";
	/**战斗结果			PBG2CLadderResult*/
	export var Ladder_FightResult: string = "Ladder_FightResult";
	/**英雄殿返回		PBG2CLadderHeroTopAck*/
	export var Ladder_HeroTopAck: string = "Ladder_HeroTopAck";
	/**查询我的记录返回	PBG2CLadderRecordAck*/
	export var Ladder_RecordAck: string = "Ladder_RecordAck";
	/**查询大神记录返回	PBLadderPublicAllRecord*/
	export var Ladder_PublicRecordAck: string = "Ladder_PublicRecordAck";
	/**同步次数			PBU32*/
	export var Ladder_SynCountAck: string = "Ladder_SynCountAck";
	/**点赞英雄殿返回	PBG2CLike*/
	export var Ladder_HeroTopLikeACK: string = "Ladder_HeroTopLikeACK";
	/**查询玩家数据返回  PBLadderPlayerInfo*/
	export var Ladder_QueryPlayerInfo: string = "Ladder_QueryPlayerInfo";
	/**战斗开始	PBFightBase*/
	export var BW2G_Ladder_FightBeginAck: string = "BW2G_Ladder_FightBeginAck";
	/**同步刷新对手	PBBW2GSynRefreshRank*/
	export var BW2G_Ladder_SynRefreshRank: string = "BW2G_Ladder_SynRefreshRank";
	/**点赞英雄殿返回	PBG2CLike*/
	export var BW2G_Ladder_Like: string = "BW2G_Ladder_Like";
	/**检查竞技场排名返回*/
	export var W2G_Ladder_CheckRank: string = "W2G_Ladder_CheckRank";
	/**失败才返回*/
	export var Champion_Common_Ack: string = "Champion_Common_Ack";
	/**我的竞猜返回		PBG2CChampionSelfGuessAck*/
	export var Champion_SelfGuessAck: string = "Champion_SelfGuessAck";
	/**查询竞猜返回		PBG2CChampionQueryGuessAck*/
	export var Champion_QueryGuessAck: string = "Champion_QueryGuessAck";
	/**竞猜下注同步返回	PBG2CChampionSynGuessAck*/
	export var Champion_SysGuessAck: string = "Champion_SysGuessAck";
	/**查询32强返回		PBG2CChampionQuery32ListAck*/
	export var Champion_Query32ListAck: string = "Champion_Query32ListAck";
	/**查询4强返回		PBG2CChampionQuery4ListAck*/
	export var Champion_Query4ListAck: string = "Champion_Query4ListAck";
	/**我的竞猜记录		PBChampionGuessRecord*/
	export var Champion_GuessRecordAck: string = "Champion_GuessRecordAck";
	/**我的战斗记录		PBChampionFightRecord*/
	export var Champion_FightRecordAck: string = "Champion_FightRecordAck";
	/**发送弹幕返回		无内容*/
	export var Champion_SendDanmuAck: string = "Champion_SendDanmuAck";
	/**竞猜结果			PBG2CChampionGuessResultAck*/
	export var Champion_GuessReusltAck: string = "Champion_GuessReusltAck";
	/**查询弹幕返回		PBG2CChampionQueryDanmuAck*/
	export var Champion_QueryDanmuAck: string = "Champion_QueryDanmuAck";
	/**打开返回			PBG2CChampionOpenAck*/
	export var Champion_OpenAck: string = "Champion_OpenAck";
	/**我的结算结果		PBG2CChampionEndResultAck*/
	export var Champion_EndResultAck: string = "Champion_EndResultAck";
	/**查看对战信息		PBChampionBattle*/
	export var Champion_QueryBattleInfo: string = "Champion_QueryBattleInfo";
	/**同步状态			PBG2CChampionSynState*/
	export var Champion_SynState: string = "Champion_SynState";
	/**同步排行结果		PBG2CChampionSynTopResult*/
	export var Champion_SynTopResult: string = "Champion_SynTopResult";
	/**查询对应回合数据	PBG2CChampionQueryRoundAck*/
	export var Champion_QueryRoundAck: string = "Champion_QueryRoundAck";
	/**点赞返回			PBU32U32*/
	export var Champion_Like: string = "Champion_Like";
	/**	 GM测试			PBBroadcasStringU32	*/
	export var BroadCast_GM: string = "BroadCast_GM";
	/**	 更新vip等级		PBBroadcasStringU32*/
	export var BroadCast_VipLevelUp: string = "BroadCast_VipLevelUp";
	/**	 公会招募			PBBroadcasFactionRecruit*/
	export var BroadCast_FactionRecruit: string = "BroadCast_FactionRecruit";
	/**	 公会副本集结		PBBroadcasFactionCopymapNotice*/
	export var BroadCast_FactionCopymapNotice: string = "BroadCast_FactionCopymapNotice";
	/**	 竞技场x连胜(名字，多少场)		PBBroadcasStringU32	*/
	export var BroadCast_Challenge: string = "BroadCast_Challenge";
	/**	 冠军赛提醒(开始时间)		PBU32*/
	export var BroadCast_Champion: string = "BroadCast_Champion";
	/**	 跨服竞技场x连胜(名字，多少场)	PBBroadcasStringU32*/
	export var BroadCast_CrossChallenge: string = "BroadCast_CrossChallenge";
	/**	 段位赛x连胜(名字，多少场)	PBBroadcasStringU32*/
	export var BroadCast_Dan: string = "BroadCast_Dan";
	/**	 探宝获得x品质以上道具	PBBroadcastTreasure*/
	export var BroadCast_Treasure: string = "BroadCast_Treasure";
	/**	 合成6星英雄（名字,pet id）	PBBroadcastHeroStar*/
	export var BroadCast_Hero6Star: string = "BroadCast_Hero6Star";
	/**	 9星以上英雄升星		PBBroadcastHeroStar*/
	export var BroadCast_Hero9Star: string = "BroadCast_Hero9Star";
	/**	 建立工会		PBBroadcasFactionCreate*/
	export var BroadCast_Faction: string = "BroadCast_Faction";
	/**	 激活月卡	(玩家名字，月卡类型)	PBBroadcasStringU32*/
	export var BroadCast_MonthCard: string = "BroadCast_MonthCard";
	/**   高级召唤获得5星英雄(玩家名字, pet id)	PBBroadcasStringU32*/
	export var BroadCast_AdvCall5Star: string = "BroadCast_AdvCall5Star";
	/**   首冲奖励			PBBroadcastItems*/
	export var BroadCast_FirstCharge: string = "BroadCast_FirstCharge";
	/**   七日登陆			PBBroadcastItems*/
	export var BroadCast_7DayLogin: string = "BroadCast_7DayLogin";
	/**   主线通关			PBBroadcastHookStage*/
	export var BroadCast_HookStage: string = "BroadCast_HookStage";
	/**   先知召唤(玩家名字, pet id)	PBBroadcasStringU32*/
	export var BroadCast_OracleCall: string = "BroadCast_OracleCall";
	/**	 通关试炼塔		PBBroadcastTower*/
	export var BroadCast_Tower: string = "BroadCast_Tower";
	/**	 元灵解锁(名字，元灵ID)		PBBroadcasStringU32	*/
	export var BroadCast_Artifact: string = "BroadCast_Artifact";
	/**	 先知召唤物品		PBBroadcastItem	*/
	export var BroadCast_OracleCallItem: string = "BroadCast_OracleCallItem";
	/**	 主线第一名(名字, stageid)	PBBroadcasStringU32	*/
	export var BroadCast_MainTop1: string = "BroadCast_MainTop1";
	/**	 试炼塔1第一名(名字, 层数)		PBBroadcasStringU32	*/
	export var BroadCast_Tower1Top1: string = "BroadCast_Tower1Top1";
	/**	 竞技场第一名(名字)			PBBroadcasString	*/
	export var BroadCast_ChallengeTop1: string = "BroadCast_ChallengeTop1";
	/**	 战斗力第一名(名字)			PBBroadcasString	*/
	export var BroadCast_PowerTop1: string = "BroadCast_PowerTop1";
	/**	 高级召唤获得6星英雄(玩家名字, pet id)			PBBroadcasStringU32*/
	export var BroadCast_AdvCall6Star: string = "BroadCast_AdvCall6Star";
	/**	 充值基金(玩家名字, 商品 id)			PBBroadcasStringU32*/
	export var BroadCast_ChargeFund: string = "BroadCast_ChargeFund";
	/**	 充值礼包(玩家名字, 商品 id)			PBBroadcasStringU32*/
	export var BroadCast_ChargeGift: string = "BroadCast_ChargeGift";
	/**	 充值牛逼礼包(玩家名字, 商品 id)			PBBroadcasStringU32	*/
	export var BroadCast_ChargeNB: string = "BroadCast_ChargeNB";
	/**	 公会boss结算(boss名字,章节 id)			PBBroadcasStringU32	*/
	export var BroadCast_FactionBoss: string = "BroadCast_FactionBoss";
	/**	 通关试炼塔2		PBBroadcastTower*/
	export var BroadCast_Tower2: string = "BroadCast_Tower2";
	/**	 试炼塔2第一名(名字, 层数)		PBBroadcasStringU32	*/
	export var BroadCast_Tower2Top1: string = "BroadCast_Tower2Top1";
	/**	 升级返回		PBPlayerHolyInfo*/
	export var Holy_Upgrade: string = "Holy_Upgrade";
	/**	 进阶返回 	PBPlayerHolyInfo*/
	export var Holy_Advance: string = "Holy_Advance";
	/**	 解锁返回 	PBPlayerHolyInfo*/
	export var Holy_Unlock: string = "Holy_Unlock";
	/**通用错误返回*/
	export var Video_Common: string = "Video_Common";
	/**查询系统录像返回		PBG2CVideoQuerySystemAck		*/
	export var Video_QuerySystemAck: string = "Video_QuerySystemAck";
	/**点赞次数返回			PBG2CVideoActionAck*/
	export var Video_LikeCountAck: string = "Video_LikeCountAck";
	/**播放次数返回			PBG2CVideoActionAck*/
	export var Video_PlayCountAck: string = "Video_PlayCountAck";
	/**分享次数返回			PBG2CVideoActionAck*/
	export var Video_ShareCountAck: string = "Video_ShareCountAck";
	/**查询战斗数据返回		PBG2CVideoDamageDataAck*/
	export var Video_QueryDamageDataAck: string = "Video_QueryDamageDataAck";
	/**查询录像数据返回		PBPlayerPetView*/
	export var Video_QueryBattlePetAck: string = "Video_QueryBattlePetAck";
	/**播放录像				PBFightResult*/
	export var Video_Play: string = "Video_Play";
	/**查询单个录像返回		PBVideoDisplay*/
	export var Video_QuerySingleAck: string = "Video_QuerySingleAck";
	/**同步信息				PBPlayerVideo*/
	export var Video_SynInfo: string = "Video_SynInfo";
	/**查询挂机录像返回		PBWorldStageVideoInfo*/
	export var Video_QueryHookAck: string = "Video_QueryHookAck";
	/**查询试练塔录像返回	PBWorldStageVideoInfo*/
	export var Video_QueryTowerAck: string = "Video_QueryTowerAck";
	/**查询玩家录像返回		PBG2CVideoQuerySystemAck*/
	export var Video_PlayerRecordAck: string = "Video_PlayerRecordAck";
	/**查询竞技场录像返回	PBG2CVideoPlayerRecordAck*/
	export var Video_PlayerChallengeAck: string = "Video_PlayerChallengeAck";
	/**查询多个录像返回		PBG2CQueryMutileVideo*/
	export var Video_QueryMutiple: string = "Video_QueryMutiple";
	/**查询跨服录像多个返回	PBG2CQueryMutileVideo*/
	export var Video_QueryMutipleBW: string = "Video_QueryMutipleBW";
	/**查询跨服伤害数据返回 PBG2CVideoDamageDataAck*/
	export var Video_QueryDamageDataBW: string = "Video_QueryDamageDataBW";
	/**查询跨服伙伴数据返回 PBPlayerPetView*/
	export var Video_QueryBattlePetBW: string = "Video_QueryBattlePetBW";
	/**播放跨服录像返回		PBFightResult*/
	export var Video_PlayBW: string = "Video_PlayBW";
	/**	 通用失败返回*/
	export var Privilege_Common: string = "Privilege_Common";
	/**	 新vip经验			PBU32*/
	export var Privilege_UpVipExp: string = "Privilege_UpVipExp";
	/**	 购买vip礼包返回 		PBU32*/
	export var Privilege_BuyVipPacket: string = "Privilege_BuyVipPacket";
	/**	 购买特权商店 		PBU32*/
	export var Privilege_ShopBuy: string = "Privilege_ShopBuy";
	/**	 领取每日奖励			PBU32*/
	export var Privilege_DailyPrize: string = "Privilege_DailyPrize";
	/**	 同步特权卡充值		PBPrivilegeCharge*/
	export var Privilege_CardCharge: string = "Privilege_CardCharge";
	/**	 同步特权卡			PBPrivilegeCard*/
	export var Privilege_SynCard: string = "Privilege_SynCard";
	/** 	 同步特权数据 	    PBPlayerPrivilege*/
	export var Privilege_SynData: string = "Privilege_SynData";
	/** 	 福利通用返回*/
	export var Weal_Common_ACK: string = "Weal_Common_ACK";
	/**	 签到返回 返回当前的状态		PBU32*/
	export var Weal_Signin: string = "Weal_Signin";
	/**	 点石成金获取奖励返回			PBG2CClickGold*/
	export var Weal_ClickGold: string = "Weal_ClickGold";
	/**	 点石成金重置次数通知			PBU32*/
	export var Weal_ClickGoldReset: string = "Weal_ClickGoldReset";
	/**	 返回返利结果			PBFanliInfo*/
	export var Weal_FanliResult: string = "Weal_FanliResult";
	/**	 领取在线奖励返回	PBU32*/
	export var Weal_OnlinePrize: string = "Weal_OnlinePrize";
	/**	获取找回资源数据返回  PBG2CResourceFindBackInfo*/
	export var ResourceFindBack_GetInfo: string = "ResourceFindBack_GetInfo";
	/**	领取找回资源 	PBG2CDrawFindBack*/
	export var ResourceFindBack_Draw: string = "ResourceFindBack_Draw";
	/**	 cdk验证返回	PBU32String*/
	export var Weal_CDK: string = "Weal_CDK";
	/**	 领取礼包返回	PBU32*/
	export var Weal_GetGift: string = "Weal_GetGift";
	/** 	 通用返回*/
	export var Activity_Common_ACK: string = "Activity_Common_ACK";
	/**     领取奖品返回             PBG2CActivityDrawReward*/
	export var Activity_DrawReward: string = "Activity_DrawReward";
	/**     活动开始通知，活动ID     PBU32*/
	export var Activity_Open: string = "Activity_Open";
	/**     活动关闭通知，活动ID     PBU32*/
	export var Activity_Close: string = "Activity_Close";
	/**     活动数据重置，活动ID     PBU32*/
	export var Activity_Refresh: string = "Activity_Refresh";
	/**     返回当前活动的开始时间       PBG2CActivityStartTime*/
	export var Activity_GetStartTime: string = "Activity_GetStartTime";
	/**     返回奖励物品的剩余数量   PBG2CActivityRewardNum*/
	export var Activity_GetRewardNum: string = "Activity_GetRewardNum";
	/**     同步数据                 PBPlayerActivityData*/
	export var Activity_Data: string = "Activity_Data";
	/**     定制礼包预选商品         PBG2CActivityCustomGiftOrder */
	export var Activity_CustomGiftOrder: string = "Activity_CustomGiftOrder";
	/** 通用失败返回*/
	export var Platform_Common: string = "Platform_Common";
	/** 充值 PBChargeData*/
	export var Platform_sanqi_charge: string = "Platform_sanqi_charge";
	/** 更新充值信息 PBChargeInfo*/
	export var Platform_update_chargeinfo: string = "Platform_update_chargeinfo";
	/** 更新充值信息 PBPlayerPlatform*/
	export var Platform_SynCharge: string = "Platform_SynCharge";
	/** 切支付 PBPlatformMisc*/
	export var Platform_MISC: string = "Platform_MISC";
	/**聊天  		PBG2CTalkAck*/
	export var Talk_Talk: string = "Talk_Talk";
	/**同步聊天缓存	PBG2CTalk_SynSaveChat*/
	export var Talk_SynSaveChat: string = "Talk_SynSaveChat";
	/**撤回聊天 PBG2CRecall */
	export var Talk_ChatRecall: string = "Talk_ChatRecall";
	/**	 通用错误返回*/
	export var Treasure_Common: string = "Treasure_Common";
	/**	 刷新返回				PBG2CTreasureRefresh*/
	export var Treasure_Refresh: string = "Treasure_Refresh";
	/**	 探宝返回				PBG2CTreasureHunt*/
	export var Treasure_Hunt: string = "Treasure_Hunt";
	/**	 幸运值兑换物品返回 	 PBG2CTreasureLucky*/
	export var Treasure_Lucky: string = "Treasure_Lucky";
	/** 	 通用返回*/
	export var HeavenDungeon_Common_ACK: string = "HeavenDungeon_Common_ACK";
	/**     领取章节奖品返回             PBU32*/
	export var HeavenDungeon_ChapterReward: string = "HeavenDungeon_ChapterReward";
	/**     购买挑战次数返回             PBG2CHeavenDungeonCount*/
	export var HeavenDungeon_BuyCount: string = "HeavenDungeon_BuyCount";
	/**     祈祷返回                    PBG2CHeavenDungeonPray*/
	export var HeavenDungeon_Pray: string = "HeavenDungeon_Pray";
	/**     关卡战斗或扫荡之后推送       PBG2CHeavenDungeonStageSync*/
	export var HeavenDungeon_StageSync: string = "HeavenDungeon_StageSync";
	/**    失败才返回*/
	export var CrossChallenge_Common_Ack: string = "CrossChallenge_Common_Ack";
	/**    对手信息返回		                        PBCrossChallengeRefresh*/
	export var CrossChallenge_Refresh: string = "CrossChallenge_Refresh";
	/**    领取每日宝箱返回	                        PBCrossChallengeDailyInfo*/
	export var CrossChallenge_DailyPrize: string = "CrossChallenge_DailyPrize";
	/**	打开跨服竞技场返回						PBCrossChallengeOpenInfo*/
	export var CrossChallenge_Open: string = "CrossChallenge_Open";
	/**    查询玩家信息返回	                    	PBCrossChallengeInfo*/
	export var CrossChallenge_Query: string = "CrossChallenge_Query";
	/**    同步次数		                            PBU32*/
	export var CrossChallenge_Count: string = "CrossChallenge_Count";
	/**    点赞返回(key : 玩家id, value : 点赞数)    PBU32U32 */
	export var CrossChallenge_HonourLike: string = "CrossChallenge_HonourLike";
	/**    挑战记录返回		                        PBCrossChallengerResults*/
	export var CrossChallenge_Record: string = "CrossChallenge_Record";
	/**	购买奖品返回 								PBU32*/
	export var CrossChallenge_BuyPrize: string = "CrossChallenge_BuyPrize";
	/**	设置防御队伍返回							PBCrossChallengeSetTeamAck*/
	export var CrossChallenge_SetTeamDEF: string = "CrossChallenge_SetTeamDEF";
	/**	战斗奖品									PBCrossChallengeFightPrize*/
	export var CrossChallenge_Prize: string = "CrossChallenge_Prize";
	/**	设置进攻队伍返回							PBCrossChallengeSetTeamAck*/
	export var CrossChallenge_SetTeamATK: string = "CrossChallenge_SetTeamATK";
	/**增加、放置家具,拜访返回 PBFurnitureInfo*/
	export var Room_placeFurnitureInfo: string = "Room_placeFurnitureInfo";
	/** 	 放入经验返回                 PBMagicJuiceState*/
	export var Tablet_PutExp: string = "Tablet_PutExp";
	/**	 收获魔液返回                 PBMagicJuiceState*/
	export var Tablet_GetMagicJuice: string = "Tablet_GetMagicJuice";
	/**	 放置英雄返回(pos, pet sn)	PBU32U64*/
	export var Tablet_PutHero: string = "Tablet_PutHero";
	/**	 升级晶碑返回(level)		    PBU32*/
	export var Tablet_Upgrade: string = "Tablet_Upgrade";
	/**	 创造英雄返回(pet sn)		    PBU64*/
	export var Tablet_Create: string = "Tablet_Create";
	/**     请求魔液状态返回             PBMagicJuiceState*/
	export var Tablet_MagicJuice: string = "Tablet_MagicJuice";
	/**     取回经验(魔液,exp)           PBU32U64*/
	export var Tablet_GetBackExp: string = "Tablet_GetBackExp";
	/**失败才返回*/
	export var WeekChampion_Common_Ack: string = "WeekChampion_Common_Ack";
	/**我的竞猜返回		PBG2CChampionSelfGuessAck*/
	export var WeekChampion_SelfGuessAck: string = "WeekChampion_SelfGuessAck";
	/**查询竞猜返回		PBG2CChampionQueryGuessAck*/
	export var WeekChampion_QueryGuessAck: string = "WeekChampion_QueryGuessAck";
	/**竞猜下注同步返回	PBG2CChampionSynGuessAck*/
	export var WeekChampion_SysGuessAck: string = "WeekChampion_SysGuessAck";
	/**查询32强返回		PBG2CChampionQuery32ListAck*/
	export var WeekChampion_Query32ListAck: string = "WeekChampion_Query32ListAck";
	/**查询4强返回		PBG2CChampionQuery4ListAck*/
	export var WeekChampion_Query4ListAck: string = "WeekChampion_Query4ListAck";
	/**我的竞猜记录		PBChampionGuessRecord*/
	export var WeekChampion_GuessRecordAck: string = "WeekChampion_GuessRecordAck";
	/**我的战斗记录		PBChampionFightRecord*/
	export var WeekChampion_FightRecordAck: string = "WeekChampion_FightRecordAck";
	/**发送弹幕返回		无内容*/
	export var WeekChampion_SendDanmuAck: string = "WeekChampion_SendDanmuAck";
	/**竞猜结果			PBG2CChampionGuessResultAck*/
	export var WeekChampion_GuessReusltAck: string = "WeekChampion_GuessReusltAck";
	/**查询弹幕返回		PBG2CChampionQueryDanmuAck*/
	export var WeekChampion_QueryDanmuAck: string = "WeekChampion_QueryDanmuAck";
	/**打开返回			PBG2CChampionOpenAck*/
	export var WeekChampion_OpenAck: string = "WeekChampion_OpenAck";
	/**我的结算结果		PBG2CChampionEndResultAck*/
	export var WeekChampion_EndResultAck: string = "WeekChampion_EndResultAck";
	/**查看对战信息		PBChampionBattle*/
	export var WeekChampion_QueryBattleInfo: string = "WeekChampion_QueryBattleInfo";
	/**同步状态			PBG2CChampionSynState*/
	export var WeekChampion_SynState: string = "WeekChampion_SynState";
	/**同步排行结果		PBG2CChampionSynTopResult*/
	export var WeekChampion_SynTopResult: string = "WeekChampion_SynTopResult";
	/**查询对应回合数据	PBG2CChampionQueryRoundAck*/
	export var WeekChampion_QueryRoundAck: string = "WeekChampion_QueryRoundAck";
	/**点赞返回			PBU32U32*/
	export var WeekChampion_Like: string = "WeekChampion_Like";
	/**通用返回(失败才返回)*/
	export var TeamCampaign_CommonAck: string = "TeamCampaign_CommonAck";
	/**选择难度返回			PBU32*/
	export var TeamCampaign_Select: string = "TeamCampaign_Select";
	/**给出三个额外奖励     PBG2CTeamCampaignExtraPrize*/
	export var TeamCampaign_ExtraPrize: string = "TeamCampaign_ExtraPrize";
	/**领取奖励返回 		PBU32*/
	export var TeamCampaign_SelectExtraPrize: string = "TeamCampaign_SelectExtraPrize";
	/**同步伙伴状态 	    PBG2CTeamCampaignState*/
	export var TeamCampaign_SyncPet: string = "TeamCampaign_SyncPet";
	/**同步关卡状态 		PBG2CTeamCampaignStage*/
	export var TeamCampaign_SyncStage: string = "TeamCampaign_SyncStage";
	/**同步技能		        PBG2CTeamCampaignSkill*/
	export var TeamCampaign_SyncSkill: string = "TeamCampaign_SyncSkill";
	/**同步敌人数据		    PBG2CTeamCampaignTarget*/
	export var TeamCampaign_SyncTarget: string = "TeamCampaign_SyncTarget";
	/**废弃*/
	export var TeamCampaign_xxxxxxxxx: string = "TeamCampaign_xxxxxxxxx";
	/**废弃*/
	export var TeamCampaign_xxxxxxxxxxxxxx: string = "TeamCampaign_xxxxxxxxxxxxxx";
	/**解锁返回 	PBU32*/
	export var DragonBall_UnLock: string = "DragonBall_UnLock";
	/**升级(type, level) PBU32U32*/
	export var DragonBall_Levelup: string = "DragonBall_Levelup";
	/**解锁返回 	*/
	export var Convenant_UnLock: string = "Convenant_UnLock";
	/**升级返回 (level) PBU32*/
	export var Convenant_Levelup: string = "Convenant_Levelup";
	/**选择属性返回 (id, index 1, 2, 3) PBU32U32*/
	export var Convenant_Attr: string = "Convenant_Attr";
	/**计算战斗力(id, power) PBU32U32*/
	export var Convenant_Power: string = "Convenant_Power";
	/** 	 许愿回应 PBG2CLotteryRefresh*/
	export var Lottery_Refresh: string = "Lottery_Refresh";
	/** 	 许愿池设置请求 PBG2CLotteryPoolSet*/
	export var Lottery_Pool_Set: string = "Lottery_Pool_Set";
	/**失败才返回*/
	export var Illustration_Common_Ack: string = "Illustration_Common_Ack";
	/**往图鉴背包加 PBG2CADDPetAck*/
	export var Illustration_addPetAck: string = "Illustration_addPetAck";
	/**从图鉴背包减 PBG2CRemovePetAck*/
	export var Illustration_removePetAck: string = "Illustration_removePetAck";
	/**	刷新 PBG2CFreashIllustration*/
	export var Illustration_Freash: string = "Illustration_Freash";
	/**失败才返回*/
	export var RedEnvelope_Common_Ack: string = "RedEnvelope_Common_Ack";
	/**开启红包 PBG2COpenRedEnvelopeAck*/
	export var RedEnvelope_OpenAck: string = "RedEnvelope_OpenAck";
	/**刷新/重置红包 PBG2CRedEnvelopeRefresh*/
	export var RedEnvelope_Refresh: string = "RedEnvelope_Refresh";
	/** 	 初始信息 PBG2CJoyousLinkupStartInfo*/
	export var JoyousLinkup_Start_Info: string = "JoyousLinkup_Start_Info";
	/** 	 连接棋子返回 PBG2CJoyousLinkupConnectResult*/
	export var JoyousLinkup_Connect_Result: string = "JoyousLinkup_Connect_Result";
	/** 	 棋子位置刷新 PBG2CJoyousLinkupChessData*/
	export var JoyousLinkup_Info_Chg: string = "JoyousLinkup_Info_Chg";
	/** 	 游戏结束 PBG2CJoyousLinkupEnd*/
	export var JoyousLinkup_End: string = "JoyousLinkup_End";
	/** 	 退出游戏*/
	export var JoyousLinkup_Quit: string = "JoyousLinkup_Quit";
	/**失败才返回*/
	export var Guess_Common_Ack: string = "Guess_Common_Ack";
	/**选择结果 PBG2CAnswerAck*/
	export var Guess_Answer_Ack: string = "Guess_Answer_Ack";
	/**问题下发 PBG2CQuestion*/
	export var Guess_Question: string = "Guess_Question";
	/**答题结束 PBG2CExit*/
	export var Guess_Exit: string = "Guess_Exit";
	/** 	 升级返回 PBG2CDefendLevelUpAsk*/
	export var Defend_LevelUp_Ask: string = "Defend_LevelUp_Ask";
	/** 	 升阶返回 PBG2CDefendLevelUpAsk*/
	export var Defend_RankUp_Ask: string = "Defend_RankUp_Ask";
	/** 	 保存方案返回 PBDefendPlan*/
	export var Defend_SavePlan_Ask: string = "Defend_SavePlan_Ask";
	/** 	 使用方案返回 PBG2CDefendUsePlanAsk*/
	export var Defend_UsePlan_Ask: string = "Defend_UsePlan_Ask";
	/** 	 解锁方案返回 PBG2CDefendUnlockPlanAsk*/
	export var Defend_UnlockPlan_Ask: string = "Defend_UnlockPlan_Ask";
	/** 	 属性下发 PBG2CDefendAttr*/
	export var Defend_Attr: string = "Defend_Attr";
	/** 	 功能开启下发 PBPlayerDefend*/
	export var Defend_Open: string = "Defend_Open";
	/** 	 属性预览 PBG2CDefendAttr*/
	export var Defend_PreviewAttr: string = "Defend_PreviewAttr";
	/** 	 移除某个宠物方案返回 PBG2CDefendPlansChg*/
	export var Defend_PlansChg: string = "Defend_PlansChg";
	/** 	 开启格子返回 PBG2CResonanceOpenGrid*/
	export var Resonance_OpenGrid: string = "Resonance_OpenGrid";
	/** 	 重置冷却 PBG2CResonanceGridChg*/
	export var Resonance_ResetCD: string = "Resonance_ResetCD";
	/** 	 放置共鸣 PBG2CResonanceGridChg*/
	export var Resonance_PlaceGrid: string = "Resonance_PlaceGrid";
	/** 	 某个共鸣开启 PBPlayerResonanceInfo*/
	export var Resonance_SystemOpen: string = "Resonance_SystemOpen";
	/** 	 共鸣主体更新 PBG2CResonanceMainPetSn*/
	export var Resonance_MainPetSn: string = "Resonance_MainPetSn";
	/** 	 升星返回 PBG2CResonanceUpStar*/
	export var Resonance_UpStar: string = "Resonance_UpStar";
	/**通用返回,错误码*/
	export var IncubateEgg_Common: string = "IncubateEgg_Common";
	/** 开始孵蛋     PBS2CIncubateEggStart*/
	export var IncubateEgg_Start: string = "IncubateEgg_Start";
	/** 加速孵化     PBS2CIncubateEggSpeedUp*/
	export var IncubateEgg_SpeedUp: string = "IncubateEgg_SpeedUp";
	/** 取消孵化     PBS2CIncubateEggCancel*/
	export var IncubateEgg_Cancel: string = "IncubateEgg_Cancel";
	/** 孵蛋破壳     PBS2CIncubateEggPip*/
	export var IncubateEgg_Pip: string = "IncubateEgg_Pip";
	/** 孵化结束同步 PBS2CIncubateEggEndSyn*/
	export var IncubateEgg_EndSyn: string = "IncubateEgg_EndSyn";
	/** 孵蛋         PBIncubateEggData*/
	export var IncubateEgg_SynInfo: string = "IncubateEgg_SynInfo";
	/** 	 信息改变 PBActivityBossData*/
	export var ActivityBoss_InfoChg: string = "ActivityBoss_InfoChg";
	/**失败才返回*/
	export var Order_Common_Ack: string = "Order_Common_Ack";
	/**返回地址数据 PBAddrData*/
	export var Order_AddrData: string = "Order_AddrData";
	/**返回订单数据 PBOrderData*/
	export var Order_OrderData: string = "Order_OrderData";
	/**返回最新的订单信息 PBOrderInfo*/
	export var Order_OneNewOrder: string = "Order_OneNewOrder";
	/**失败才返回*/
	export var GodDeploy_Common_Ack: string = "GodDeploy_Common_Ack";
	/**返回地址数据 PBGodDeployTopList*/
	export var GodDeploy_TopList: string = "GodDeploy_TopList";
	/**返回点赞数据 PBLikeInfo*/
	export var GodDeploy_LikeInfo: string = "GodDeploy_LikeInfo";
	/** 验证请求 	VerifyAsk*/
	export var Operate_Verify_Ask: string = "Operate_Verify_Ask";
	/** Ping请求	PingAsk*/
	export var Operate_Ping_Ask: string = "Operate_Ping_Ask";
	/** 登录请求	(取CAW PBLoginAsk和CAG PBC2GLoginAsk)*/
	export var Operate_Login_Ask: string = "Operate_Login_Ask";
	/** 验证应答	VerifyAck*/
	export var Operate_Verify_Ack: string = "Operate_Verify_Ack";
	/** Ping应答	PingAck*/
	export var Operate_Ping_Ack: string = "Operate_Ping_Ack";
	/** 断开命令 	无内容*/
	export var Operate_Disconnect: string = "Operate_Disconnect";
	/** 错误包通知	BadNotify*/
	export var Operate_Bad_Notify: string = "Operate_Bad_Notify";
	/** 踢出通知 	无内容*/
	export var Operate_Kick_Notify: string = "Operate_Kick_Notify";
	/** 登录应答	(取CAW PBLoginAck 和CAG PBG2CLoginAck)	*/
	export var Operate_Login_Ack: string = "Operate_Login_Ack";
	/** 读取超时		无内容*/
	export var Operate_TimeoutRead: string = "Operate_TimeoutRead";
	/** 写入超时	无内容*/
	export var Operate_TimeoutWrite: string = "Operate_TimeoutWrite";
	/** 关服通知   (取CAW PBCloseServerData)*/
	export var Operate_CloseServer: string = "Operate_CloseServer";
}
