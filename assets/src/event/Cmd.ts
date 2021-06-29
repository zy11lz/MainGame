
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

module Pro.Cmd
{
	export var cmdDic: Object = {};
	/** 选择角色返回	PBSelectPlayerAck*/
	export var S2C_Player_SelectPlayer: CmdType = createCmd("S2C_Player_SelectPlayer", 0, 1, false, Pb_God.PBSelectPlayerAck);
	/** 基础信息 PBPlayerBase*/
	export var S2C_Player_BaseInfo: CmdType = createCmd("S2C_Player_BaseInfo", 0, 2, false, Pb_God.PBPlayerBase);
	/** 功能系统信息 PBPlayerSystem*/
	export var S2C_Player_SystemInfo: CmdType = createCmd("S2C_Player_SystemInfo", 0, 3, false, Pb_God.PBPlayerSystem);
	/** 功能系统信息 PBPlayerSystemExt	*/
	export var S2C_Player_SystemInfo2: CmdType = createCmd("S2C_Player_SystemInfo2", 0, 4, false, Pb_God.PBPlayerSystemExt);
	/** 背包信息 PBPlayerBag*/
	export var S2C_Player_BagInfo: CmdType = createCmd("S2C_Player_BagInfo", 0, 5, false, Pb_God.PBPlayerBag);
	/** 背包信息 PBPlayerBag 扩展*/
	export var S2C_Player_BagInfo2: CmdType = createCmd("S2C_Player_BagInfo2", 0, 6, false, Pb_God.PBPlayerBag);
	/** 伙伴信息 PBPlayerPet*/
	export var S2C_Player_PetInfo: CmdType = createCmd("S2C_Player_PetInfo", 0, 7, false, Pb_God.PBPlayerPet);
	/** 伙伴信息 PBPlayerPet 扩展*/
	export var S2C_Player_PetInfo2: CmdType = createCmd("S2C_Player_PetInfo2", 0, 8, false, Pb_God.PBPlayerPet);
	/** 伙伴信息3 PBPlayerPetExt	*/
	export var S2C_Player_PetInfo3: CmdType = createCmd("S2C_Player_PetInfo3", 0, 9, false, Pb_God.PBPlayerPetExt);
	/** 前端信息 PBClientData*/
	export var S2C_Player_ClientInfo: CmdType = createCmd("S2C_Player_ClientInfo", 0, 10, false, Pb_God.PBClientData);
	/** 好友信息 PBPlayerFriend*/
	export var S2C_Player_Friend: CmdType = createCmd("S2C_Player_Friend", 0, 12, false, Pb_God.PBPlayerFriend);
	/** 邮件信息 PBPlayerMail*/
	export var S2C_Player_Mail: CmdType = createCmd("S2C_Player_Mail", 0, 13, false, Pb_God.PBPlayerMail);
	/** 帮会信息 PBPlayerFaction*/
	export var S2C_Player_Faction: CmdType = createCmd("S2C_Player_Faction", 0, 14, false, Pb_God.PBPlayerFaction);
	/** 检测角色名字 PBPlayerNameAck*/
	export var S2C_Player_CheckPlayerName: CmdType = createCmd("S2C_Player_CheckPlayerName", 0, 15, false, Pb_God.PBPlayerNameAck);
	/** 玩家数据发送完成	*/
	export var S2C_Player_LoadComplete: CmdType = createCmd("S2C_Player_LoadComplete", 0, 16, false);
	/** 防沉迷检测 PBPlayerWallowData*/
	export var S2C_Player_CheckWallow: CmdType = createCmd("S2C_Player_CheckWallow", 0, 17, false, Pb_God.PBPlayerWallowData);
	/**通用 无内容*/
	export var C2S_Player_Common: CmdType = createCmd("C2S_Player_Common", 0, 0, true);
	/**消耗同步		PBG2CExpendSyn*/
	export var S2C_Common_ExpendSyn: CmdType = createCmd("S2C_Common_ExpendSyn", 1, 1, false, Pb_God.PBG2CExpendSyn);
	/**时间事件		PBG2CCommon_TimeEvent*/
	export var S2C_Common_TimeEvent: CmdType = createCmd("S2C_Common_TimeEvent", 1, 3, false, Pb_God.PBG2CCommon_TimeEvent);
	/**GM命令返回	PBG2CGMCmdTxtCmd*/
	export var S2C_Common_GMCmd: CmdType = createCmd("S2C_Common_GMCmd", 1, 4, false, Pb_God.PBG2CGMCmdTxtCmd);
	/**增加等级 		PBG2CAddLevel*/
	export var S2C_Common_AddLevel: CmdType = createCmd("S2C_Common_AddLevel", 1, 5, false, Pb_God.PBG2CAddLevel);
	/**通用道具奖励	PBG2CCommonShowPrize*/
	export var S2C_Common_ShowPrize: CmdType = createCmd("S2C_Common_ShowPrize", 1, 6, false, Pb_God.PBG2CCommonShowPrize);
	/**查询玩家返回	PBG2CQueryPlayerViewAck*/
	export var S2C_Common_PlayerViewAck: CmdType = createCmd("S2C_Common_PlayerViewAck", 1, 7, false, Pb_God.PBG2CQueryPlayerViewAck);
	/**查询伙伴返回	PBPlayerPetView*/
	export var S2C_Common_PetViewAck: CmdType = createCmd("S2C_Common_PetViewAck", 1, 8, false, Pb_God.PBPlayerPetView);
	/**重命名返回	PBPlayerRename*/
	export var S2C_Common_PlayerRenameAck: CmdType = createCmd("S2C_Common_PlayerRenameAck", 1, 9, false, Pb_God.PBPlayerRename);
	/**更新战斗力	PBU32*/
	export var S2C_Common_UpdateFightPower: CmdType = createCmd("S2C_Common_UpdateFightPower", 1, 10, false, Pb_God.PBU32);
	/**同步跨服信息	PBCommonSynPlayerBigWorld*/
	export var S2C_Common_SynPlayerBigWorld: CmdType = createCmd("S2C_Common_SynPlayerBigWorld", 1, 11, false, Pb_God.PBCommonSynPlayerBigWorld);
	/**系统开启(id, time)		PBU32U32*/
	export var S2C_Common_SystemSwitch: CmdType = createCmd("S2C_Common_SystemSwitch", 1, 12, false, Pb_God.PBU32U32);
	/**查询玩家名称	PBPlayerFriendInfo*/
	export var S2C_Common_FindPlayerNameAck: CmdType = createCmd("S2C_Common_FindPlayerNameAck", 1, 14, false, Pb_God.PBPlayerFriendInfo);
	/**查询世界等级 PBU32*/
	export var S2C_Common_QueryWorldLevel: CmdType = createCmd("S2C_Common_QueryWorldLevel", 1, 15, false, Pb_God.PBU32);
	/**玩家充值通知 PBU32*/
	export var S2C_Common_AddRecharge: CmdType = createCmd("S2C_Common_AddRecharge", 1, 16, false, Pb_God.PBU32);
	/**切磋错误通知 PBU32*/
	export var S2C_Common_FightEachOther: CmdType = createCmd("S2C_Common_FightEachOther", 1, 17, false, Pb_God.PBU32);
	/**保存个人空间背景返回 PBU32*/
	export var S2C_Common_SetBackground: CmdType = createCmd("S2C_Common_SetBackground", 1, 18, false, Pb_God.PBU32);
	/**设置展示的英雄返回  PBG2CCommonShowPets*/
	export var S2C_Common_SetShowPets: CmdType = createCmd("S2C_Common_SetShowPets", 1, 19, false, Pb_God.PBG2CCommonShowPets);
	/**关注返回(world id, player id) PBU32U32*/
	export var S2C_Common_Follow: CmdType = createCmd("S2C_Common_Follow", 1, 20, false, Pb_God.PBU32U32);
	/**取消关注返回(world id, player id) PBU32U32*/
	export var S2C_Common_UnFollow: CmdType = createCmd("S2C_Common_UnFollow", 1, 21, false, Pb_God.PBU32U32);
	/**设置切磋需要验证返回 PBU32*/
	export var S2C_Common_SetFEONeedConfirm: CmdType = createCmd("S2C_Common_SetFEONeedConfirm", 1, 22, false, Pb_God.PBU32);
	/**被请求切磋验证的推送 PBG2CCommonFightRequest*/
	export var S2C_Common_FightEachOtherRequest: CmdType = createCmd("S2C_Common_FightEachOtherRequest", 1, 23, false, Pb_God.PBG2CCommonFightRequest);
	/**对方的切磋验证回复 PBG2CCommonFightReply*/
	export var S2C_Common_FightEachOtherReply: CmdType = createCmd("S2C_Common_FightEachOtherReply", 1, 24, false, Pb_God.PBG2CCommonFightReply);
	/**使用邀请码(邀请人的 world id, player id) PBU32U32*/
	export var S2C_Common_UseInviteCode: CmdType = createCmd("S2C_Common_UseInviteCode", 1, 25, false, Pb_God.PBU32U32);
	/**有接受自己邀请的玩家(world id, player id) PBU32U32*/
	export var S2C_Common_InvitePlayer: CmdType = createCmd("S2C_Common_InvitePlayer", 1, 26, false, Pb_God.PBU32U32);
	/**同步邀请奖励 PBPlayerInvitePrize*/
	export var S2C_Common_InvitePrize: CmdType = createCmd("S2C_Common_InvitePrize", 1, 27, false, Pb_God.PBPlayerInvitePrize);
	/**请求校验返回 PBG2CCommonSign*/
	export var S2C_Common_Sign: CmdType = createCmd("S2C_Common_Sign", 1, 28, false, Pb_God.PBG2CCommonSign);
	/**请求全服物品记录返回 PBWorldItemLogs*/
	export var S2C_Common_WorldItemLog: CmdType = createCmd("S2C_Common_WorldItemLog", 1, 29, false, Pb_God.PBWorldItemLogs);
	/**领取问卷奖励*/
	export var S2C_Common_SurveyPrize: CmdType = createCmd("S2C_Common_SurveyPrize", 1, 30, false);
	/**开启系统奖励返回 PBU32*/
	export var S2C_Common_SystemSwitchPrize: CmdType = createCmd("S2C_Common_SystemSwitchPrize", 1, 31, false, Pb_God.PBU32);
	/**简单通用奖励 PBU32*/
	export var S2C_Common_Prize: CmdType = createCmd("S2C_Common_Prize", 1, 32, false, Pb_God.PBU32);
	/**前端准备就绪*/
	export var C2S_Common_Go: CmdType = createCmd("C2S_Common_Go", 1, 0, true);
	/**保存数据请求		PBClientData*/
	export var C2S_Common_ClientSave: CmdType = createCmd("C2S_Common_ClientSave", 1, 1, true, Pb_God.PBClientData);
	/**文本命令 			PBC2GGMCmdTxtCmd*/
	export var C2S_Common_GMCmd: CmdType = createCmd("C2S_Common_GMCmd", 1, 3, true, Pb_God.PBC2GGMCmdTxtCmd);
	/**查询玩家 			PBC2GQueryPlayerView*/
	export var C2S_Common_QueryPlayerView: CmdType = createCmd("C2S_Common_QueryPlayerView", 1, 4, true, Pb_God.PBC2GQueryPlayerView);
	/**查询玩家伙伴 		PBC2GQueryPetView*/
	export var C2S_Common_QueryPetView: CmdType = createCmd("C2S_Common_QueryPetView", 1, 5, true, Pb_God.PBC2GQueryPetView);
	/**重命名 			PBPlayerRename*/
	export var C2S_Common_PlayerRename: CmdType = createCmd("C2S_Common_PlayerRename", 1, 6, true, Pb_God.PBPlayerRename);
	/**查询跨服组*/
	export var C2S_Common_QueryBigWorldGroup: CmdType = createCmd("C2S_Common_QueryBigWorldGroup", 1, 7, true);
	/**查询玩家名称 	PBC2GCommonFindPlayerName*/
	export var C2S_Common_FindPlayerName: CmdType = createCmd("C2S_Common_FindPlayerName", 1, 9, true, Pb_God.PBC2GCommonFindPlayerName);
	/**查询世界等级 */
	export var C2S_Common_QueryWorldLevel: CmdType = createCmd("C2S_Common_QueryWorldLevel", 1, 11, true);
	/**保存个人空间背景 PBU32*/
	export var C2S_Common_SetBackground: CmdType = createCmd("C2S_Common_SetBackground", 1, 12, true, Pb_God.PBU32);
	/**设置展示的英雄 PBG2CCommonShowPets*/
	export var C2S_Common_SetShowPets: CmdType = createCmd("C2S_Common_SetShowPets", 1, 13, true, Pb_God.PBG2CCommonShowPets);
	/**关注(world id, player id) PBU32U32*/
	export var C2S_Common_Follow: CmdType = createCmd("C2S_Common_Follow", 1, 14, true, Pb_God.PBU32U32);
	/**取消关注(world id, player id) PBU32U32*/
	export var C2S_Common_UnFollow: CmdType = createCmd("C2S_Common_UnFollow", 1, 15, true, Pb_God.PBU32U32);
	/**设置切磋需要验证(1需要0不需要) PBU32*/
	export var C2S_Common_SetFEONeedConfirm: CmdType = createCmd("C2S_Common_SetFEONeedConfirm", 1, 16, true, Pb_God.PBU32);
	/**发出切磋的请求 PBC2GCommonFightRequest*/
	export var C2S_Common_FightEachOtherRequest: CmdType = createCmd("C2S_Common_FightEachOtherRequest", 1, 17, true, Pb_God.PBC2GCommonFightRequest);
	/**切磋验证回复 PBC2GCommonFightReply*/
	export var C2S_Common_FightEachOtherReply: CmdType = createCmd("C2S_Common_FightEachOtherReply", 1, 18, true, Pb_God.PBC2GCommonFightReply);
	/**使用邀请码 PBString*/
	export var C2S_Common_UseInviteCode: CmdType = createCmd("C2S_Common_UseInviteCode", 1, 19, true, Pb_God.PBString);
	/**领取邀请奖励(成就ID) PBU32*/
	export var C2S_Common_InvitePrize: CmdType = createCmd("C2S_Common_InvitePrize", 1, 20, true, Pb_God.PBU32);
	/**请求校验 PBC2GCommonSign*/
	export var C2S_Common_Sign: CmdType = createCmd("C2S_Common_Sign", 1, 21, true, Pb_God.PBC2GCommonSign);
	/**请求全服物品记录(_emWorldItemLogType) PBU32*/
	export var C2S_Common_WorldItemLog: CmdType = createCmd("C2S_Common_WorldItemLog", 1, 22, true, Pb_God.PBU32);
	/**领取问卷奖励*/
	export var C2S_Common_SurveyPrize: CmdType = createCmd("C2S_Common_SurveyPrize", 1, 23, true);
	/**开启系统奖励 PBU32*/
	export var C2S_Common_SystemSwitchPrize: CmdType = createCmd("C2S_Common_SystemSwitchPrize", 1, 24, true, Pb_God.PBU32);
	/**简单通用奖励 PBU32*/
	export var C2S_Common_Prize: CmdType = createCmd("C2S_Common_Prize", 1, 25, true, Pb_God.PBU32);
	/**玩家举报日志  PBC2GCommonReportLog*/
	export var C2S_Common_ReportLog: CmdType = createCmd("C2S_Common_ReportLog", 1, 26, true, Pb_God.PBC2GCommonReportLog);
	/**玩家引导日志	PBC2GCommonGuideLog*/
	export var C2S_Common_GuideLog: CmdType = createCmd("C2S_Common_GuideLog", 1, 27, true, Pb_God.PBC2GCommonGuideLog);
	/**玩家问卷调查日志	PBC2GCommonSurveyLog*/
	export var C2S_Common_SurveyLog: CmdType = createCmd("C2S_Common_SurveyLog", 1, 28, true, Pb_God.PBC2GCommonSurveyLog);
	/**通用返回(失败才返回)*/
	export var S2C_Copymap_CommonAck: CmdType = createCmd("S2C_Copymap_CommonAck", 2, 1, false);
	/**同步副本数据 PBPlayerCopymapInfo*/
	export var S2C_Copymap_SynInfo: CmdType = createCmd("S2C_Copymap_SynInfo", 2, 2, false, Pb_God.PBPlayerCopymapInfo);
	/**同步购买次数 PBPlayerCopymapInfo*/
	export var S2C_Copymap_BuyCount: CmdType = createCmd("S2C_Copymap_BuyCount", 2, 3, false, Pb_God.PBPlayerCopymapInfo);
	/**扫荡	PBU32*/
	export var C2S_Copymap_Sweep: CmdType = createCmd("C2S_Copymap_Sweep", 2, 0, true, Pb_God.PBU32);
	/**购买次数 PBU32*/
	export var C2S_Copymap_BuyCount: CmdType = createCmd("C2S_Copymap_BuyCount", 2, 1, true, Pb_God.PBU32);
	/**新增				PBPlayerPetInfo*/
	export var S2C_Pet_AddNew_Ack: CmdType = createCmd("S2C_Pet_AddNew_Ack", 3, 0, false, Pb_God.PBPlayerPetInfo);
	/**删除				PBG2CPet_Remove_Ack*/
	export var S2C_Pet_Remove_Ack: CmdType = createCmd("S2C_Pet_Remove_Ack", 3, 1, false, Pb_God.PBG2CPet_Remove_Ack);
	/**设置阵法返回		PBPlayerZhenfaInfo*/
	export var S2C_Pet_Set_Zhenfa_Ack: CmdType = createCmd("S2C_Pet_Set_Zhenfa_Ack", 3, 2, false, Pb_God.PBPlayerZhenfaInfo);
	/**升级伙伴返回		PBG2CPet_UpLevel_Ack*/
	export var S2C_Pet_UpLevel_Ack: CmdType = createCmd("S2C_Pet_UpLevel_Ack", 3, 3, false, Pb_God.PBG2CPet_UpLevel_Ack);
	/**伙伴升阶返回		PBCAGPet_Advance*/
	export var S2C_Pet_Advance_Ack: CmdType = createCmd("S2C_Pet_Advance_Ack", 3, 4, false, Pb_God.PBCAGPet_Advance);
	/**伙伴升星返回		PBG2CPet_UpStar*/
	export var S2C_Pet_UpStar_Ack: CmdType = createCmd("S2C_Pet_UpStar_Ack", 3, 5, false, Pb_God.PBG2CPet_UpStar);
	/**穿戴装备返回		PBCAGPet_Equip*/
	export var S2C_Pet_Equip_Ack: CmdType = createCmd("S2C_Pet_Equip_Ack", 3, 6, false, Pb_God.PBCAGPet_Equip);
	/**一键穿戴装备返回	PBG2CPet_AutoEquip*/
	export var S2C_Pet_AutoEquip_Ack: CmdType = createCmd("S2C_Pet_AutoEquip_Ack", 3, 7, false, Pb_God.PBG2CPet_AutoEquip);
	/**伙伴加锁返回		PBCAGPet_Lock*/
	export var S2C_Pet_Lock_Ack: CmdType = createCmd("S2C_Pet_Lock_Ack", 3, 8, false, Pb_God.PBCAGPet_Lock);
	/**穿戴符文返回		PBCAGPet_RuneEquip*/
	export var S2C_Pet_RuneEquip_Ack: CmdType = createCmd("S2C_Pet_RuneEquip_Ack", 3, 9, false, Pb_God.PBCAGPet_RuneEquip);
	/**天赋领悟返回	PBCAGPet_Talent*/
	export var S2C_Pet_LearnTalent_Ack: CmdType = createCmd("S2C_Pet_LearnTalent_Ack", 3, 10, false, Pb_God.PBCAGPet_Talent);
	/**天赋遗忘返回	PBCAGPet_Talent*/
	export var S2C_Pet_DelTalent_Ack: CmdType = createCmd("S2C_Pet_DelTalent_Ack", 3, 11, false, Pb_God.PBCAGPet_Talent);
	/**天赋升级返回	PBCAGPet_Talent*/
	export var S2C_Pet_UpgradeTalent_Ack: CmdType = createCmd("S2C_Pet_UpgradeTalent_Ack", 3, 12, false, Pb_God.PBCAGPet_Talent);
	/**购买背包		PBCAGPet_BuyBag*/
	export var S2C_Pet_BuyBag_Ack: CmdType = createCmd("S2C_Pet_BuyBag_Ack", 3, 13, false, Pb_God.PBCAGPet_BuyBag);
	/**失败才返回*/
	export var S2C_Pet_Common_Ack: CmdType = createCmd("S2C_Pet_Common_Ack", 3, 14, false);
	/**设置皮肤返回	PBCAGPet_SetSkin*/
	export var S2C_Pet_SetSkin_Ack: CmdType = createCmd("S2C_Pet_SetSkin_Ack", 3, 15, false, Pb_God.PBCAGPet_SetSkin);
	/**同步显示属性	PBG2CSynPetAttr*/
	export var S2C_Pet_SynAttr: CmdType = createCmd("S2C_Pet_SynAttr", 3, 16, false, Pb_God.PBG2CSynPetAttr);
	/**同步单个战斗力	PBG2CSynPetFightPower*/
	export var S2C_Pet_SynFightPower: CmdType = createCmd("S2C_Pet_SynFightPower", 3, 17, false, Pb_God.PBG2CSynPetFightPower);
	/**穿戴神装返回	PBCAGPet_GodEquip*/
	export var S2C_Pet_GodEquip_Ack: CmdType = createCmd("S2C_Pet_GodEquip_Ack", 3, 18, false, Pb_God.PBCAGPet_GodEquip);
	/**同步套装格子 	PBPlayerGodEquipSuitInfo*/
	export var S2C_Pet_GodSuit_Syn: CmdType = createCmd("S2C_Pet_GodSuit_Syn", 3, 19, false, Pb_God.PBPlayerGodEquipSuitInfo);
	/**一键脱下神装	PBU64*/
	export var S2C_Pet_GodUnEquipOneKey_Ack: CmdType = createCmd("S2C_Pet_GodUnEquipOneKey_Ack", 3, 20, false, Pb_God.PBU64);
	/**查询伙伴评分 	PBG2CPetQueryScore*/
	export var S2C_Pet_QueryScore_Ack: CmdType = createCmd("S2C_Pet_QueryScore_Ack", 3, 21, false, Pb_God.PBG2CPetQueryScore);
	/**同步属性预览	PBG2CSynPreviewAttr*/
	export var S2C_Pet_SynPreviewAttr: CmdType = createCmd("S2C_Pet_SynPreviewAttr", 3, 22, false, Pb_God.PBG2CSynPreviewAttr);
	/**置换返回		PBPlayerPetInfo*/
	export var S2C_Pet_Replace_Ack: CmdType = createCmd("S2C_Pet_Replace_Ack", 3, 23, false, Pb_God.PBPlayerPetInfo);
	/**回退返回		PBPlayerPetInfo*/
	export var S2C_Pet_Degenerate_Ack: CmdType = createCmd("S2C_Pet_Degenerate_Ack", 3, 24, false, Pb_God.PBPlayerPetInfo);
	/**神装预览返回	PBG2CGodEquipPreview*/
	export var S2C_Pet_GodEquipPreview: CmdType = createCmd("S2C_Pet_GodEquipPreview", 3, 25, false, Pb_God.PBG2CGodEquipPreview);
	/**出现没见过的英雄(doing type, sn)	PBU32U64*/
	export var S2C_Pet_NotSeenPet: CmdType = createCmd("S2C_Pet_NotSeenPet", 3, 26, false, Pb_God.PBU32U64);
	/**重生返回(次数，SN)		PBU32U64*/
	export var S2C_Pet_Reborn: CmdType = createCmd("S2C_Pet_Reborn", 3, 27, false, Pb_God.PBU32U64);
	/**购买重生次数返回		PBU32*/
	export var S2C_Pet_BuyRebornCount: CmdType = createCmd("S2C_Pet_BuyRebornCount", 3, 28, false, Pb_God.PBU32);
	/**吞噬返回(exp, petsn)		PBU32U64*/
	export var S2C_Pet_Swallow: CmdType = createCmd("S2C_Pet_Swallow", 3, 29, false, Pb_God.PBU32U64);
	/**高星重生		PBU64*/
	export var S2C_Pet_HighStarReborn: CmdType = createCmd("S2C_Pet_HighStarReborn", 3, 30, false, Pb_God.PBU64);
	/**进化 PBG2CPet_Evolve_Ack*/
	export var S2C_Pet_Evolve_Ack: CmdType = createCmd("S2C_Pet_Evolve_Ack", 3, 31, false, Pb_God.PBG2CPet_Evolve_Ack);
	/**魂器觉醒  PBG2CHorcruxAwake*/
	export var S2C_Pet_Horcrux_Awake: CmdType = createCmd("S2C_Pet_Horcrux_Awake", 3, 32, false, Pb_God.PBG2CHorcruxAwake);
	/**魂器强化  PBG2CHorcruxLevelUp*/
	export var S2C_Pet_Horcrux_LevelUp: CmdType = createCmd("S2C_Pet_Horcrux_LevelUp", 3, 33, false, Pb_God.PBG2CHorcruxLevelUp);
	/**宠物状态变化 PBG2CPetStateChg*/
	export var S2C_Pet_State_Chg: CmdType = createCmd("S2C_Pet_State_Chg", 3, 34, false, Pb_God.PBG2CPetStateChg);
	/**领取档案奖励 PBU32*/
	export var S2C_Pet_PetAchivesReward_Chg: CmdType = createCmd("S2C_Pet_PetAchivesReward_Chg", 3, 35, false, Pb_God.PBU32);
	/**设置阵法		PBPlayerZhenfaInfo*/
	export var C2S_Pet_Set_Zhenfa_Ask: CmdType = createCmd("C2S_Pet_Set_Zhenfa_Ask", 3, 0, true, Pb_God.PBPlayerZhenfaInfo);
	/**伙伴升级		PBC2GPet_UpLevel_Ask*/
	export var C2S_Pet_UpLevel_Ask: CmdType = createCmd("C2S_Pet_UpLevel_Ask", 3, 1, true, Pb_God.PBC2GPet_UpLevel_Ask);
	/**伙伴升阶		PBCAGPet_Advance*/
	export var C2S_Pet_Advance_Ask: CmdType = createCmd("C2S_Pet_Advance_Ask", 3, 2, true, Pb_God.PBCAGPet_Advance);
	/**伙伴升星		PBC2GPet_UpStar*/
	export var C2S_Pet_UpStar_Ask: CmdType = createCmd("C2S_Pet_UpStar_Ask", 3, 3, true, Pb_God.PBC2GPet_UpStar);
	/**穿戴装备		PBCAGPet_Equip*/
	export var C2S_Pet_Equip_Ask: CmdType = createCmd("C2S_Pet_Equip_Ask", 3, 4, true, Pb_God.PBCAGPet_Equip);
	/**一键穿脱装备	PBC2GPet_AutoEquip*/
	export var C2S_Pet_AutoEquip_Ask: CmdType = createCmd("C2S_Pet_AutoEquip_Ask", 3, 5, true, Pb_God.PBC2GPet_AutoEquip);
	/**伙伴加锁		PBCAGPet_Lock*/
	export var C2S_Pet_Lock_Ask: CmdType = createCmd("C2S_Pet_Lock_Ask", 3, 6, true, Pb_God.PBCAGPet_Lock);
	/**穿戴符文		PBCAGPet_RuneEquip*/
	export var C2S_Pet_RuneEquip_Ask: CmdType = createCmd("C2S_Pet_RuneEquip_Ask", 3, 7, true, Pb_God.PBCAGPet_RuneEquip);
	/**天赋领悟		PBCAGPet_Talent*/
	export var C2S_Pet_LearnTalent_Ask: CmdType = createCmd("C2S_Pet_LearnTalent_Ask", 3, 8, true, Pb_God.PBCAGPet_Talent);
	/**天赋遗忘		PBCAGPet_Talent*/
	export var C2S_Pet_DelTalent_Ask: CmdType = createCmd("C2S_Pet_DelTalent_Ask", 3, 9, true, Pb_God.PBCAGPet_Talent);
	/**天赋升级	PBCAGPet_Talent*/
	export var C2S_Pet_UpgradeTalent_Ask: CmdType = createCmd("C2S_Pet_UpgradeTalent_Ask", 3, 10, true, Pb_God.PBCAGPet_Talent);
	/**购买背包	PBCAGPet_BuyBag*/
	export var C2S_Pet_BuyBag_Ask: CmdType = createCmd("C2S_Pet_BuyBag_Ask", 3, 11, true, Pb_God.PBCAGPet_BuyBag);
	/**伙伴分解	PBC2GPet_Split*/
	export var C2S_Pet_Split_Ask: CmdType = createCmd("C2S_Pet_Split_Ask", 3, 12, true, Pb_God.PBC2GPet_Split);
	/**设置皮肤	PBCAGPet_SetSkin*/
	export var C2S_Pet_SetSkin_Ask: CmdType = createCmd("C2S_Pet_SetSkin_Ask", 3, 13, true, Pb_God.PBCAGPet_SetSkin);
	/**穿戴神装	PBCAGPet_GodEquip*/
	export var C2S_Pet_GodEquip_Ask: CmdType = createCmd("C2S_Pet_GodEquip_Ask", 3, 14, true, Pb_God.PBCAGPet_GodEquip);
	/**一键脱下神装	PBU64*/
	export var C2S_Pet_GodUnEquipOneKey_Ask: CmdType = createCmd("C2S_Pet_GodUnEquipOneKey_Ask", 3, 15, true, Pb_God.PBU64);
	/**开启套装格子 PBU32*/
	export var C2S_Pet_GodSuit_OpenAsk: CmdType = createCmd("C2S_Pet_GodSuit_OpenAsk", 3, 16, true, Pb_God.PBU32);
	/**保存套装方案 PBC2GPet_GodSuitSaveAsk*/
	export var C2S_Pet_GodSuit_SaveAsk: CmdType = createCmd("C2S_Pet_GodSuit_SaveAsk", 3, 17, true, Pb_God.PBC2GPet_GodSuitSaveAsk);
	/**穿戴套装 	 PBC2GPet_GodSuitEquipAsk*/
	export var C2S_Pet_GodSuit_EquipAsk: CmdType = createCmd("C2S_Pet_GodSuit_EquipAsk", 3, 18, true, Pb_God.PBC2GPet_GodSuitEquipAsk);
	/**套装方案改名 	 PBC2GPet_GodSuitRenameAsk*/
	export var C2S_Pet_GodSuit_RenameAsk: CmdType = createCmd("C2S_Pet_GodSuit_RenameAsk", 3, 19, true, Pb_God.PBC2GPet_GodSuitRenameAsk);
	/**装配套装方案 	 PBC2GPet_GodSuitSaveAsk*/
	export var C2S_Pet_GodSuit_SaveEquipAsk: CmdType = createCmd("C2S_Pet_GodSuit_SaveEquipAsk", 3, 20, true, Pb_God.PBC2GPet_GodSuitSaveAsk);
	/**查询伙伴评分 	PBU64*/
	export var C2S_Pet_QueryScore: CmdType = createCmd("C2S_Pet_QueryScore", 3, 21, true, Pb_God.PBU64);
	/**进阶属性预览 	PBU64*/
	export var C2S_Pet_AdvancePreview: CmdType = createCmd("C2S_Pet_AdvancePreview", 3, 22, true, Pb_God.PBU64);
	/**升星属性预览 	PBU64*/
	export var C2S_Pet_UpStarPreview: CmdType = createCmd("C2S_Pet_UpStarPreview", 3, 23, true, Pb_God.PBU64);
	/**置换 		PBCAGPet_Replace*/
	export var C2S_Pet_Replace_Ask: CmdType = createCmd("C2S_Pet_Replace_Ask", 3, 24, true, Pb_God.PBCAGPet_Replace);
	/**回退		PBU64*/
	export var C2S_Pet_Degenerate_Ask: CmdType = createCmd("C2S_Pet_Degenerate_Ask", 3, 25, true, Pb_God.PBU64);
	/**神装预览	PBU64*/
	export var C2S_Pet_GodEquipPreview: CmdType = createCmd("C2S_Pet_GodEquipPreview", 3, 26, true, Pb_God.PBU64);
	/**重生		PBU64*/
	export var C2S_Pet_Reborn: CmdType = createCmd("C2S_Pet_Reborn", 3, 27, true, Pb_God.PBU64);
	/**购买重生次数*/
	export var C2S_Pet_BuyRebornCount: CmdType = createCmd("C2S_Pet_BuyRebornCount", 3, 28, true);
	/**卸载套装(id, petsn) 	 PBU32U64*/
	export var C2S_Pet_GodSuit_Unload: CmdType = createCmd("C2S_Pet_GodSuit_Unload", 3, 29, true, Pb_God.PBU32U64);
	/**吞噬		PBC2GPet_UpStar*/
	export var C2S_Pet_Swallow: CmdType = createCmd("C2S_Pet_Swallow", 3, 30, true, Pb_God.PBC2GPet_UpStar);
	/**高星重生		PBU64*/
	export var C2S_Pet_HighStarReborn: CmdType = createCmd("C2S_Pet_HighStarReborn", 3, 31, true, Pb_God.PBU64);
	/**进化 PBC2GPet_Evolve_Ask*/
	export var C2S_Pet_Evolve_Ask: CmdType = createCmd("C2S_Pet_Evolve_Ask", 3, 32, true, Pb_God.PBC2GPet_Evolve_Ask);
	/**魂器觉醒 PBC2GHorcruxAwake*/
	export var C2S_Pet_Horcrux_Awake: CmdType = createCmd("C2S_Pet_Horcrux_Awake", 3, 33, true, Pb_God.PBC2GHorcruxAwake);
	/**魂器强化 PBC2GHorcruxLevelUp*/
	export var C2S_Pet_Horcrux_LevelUp: CmdType = createCmd("C2S_Pet_Horcrux_LevelUp", 3, 34, true, Pb_God.PBC2GHorcruxLevelUp);
	/**领取档案奖励 PBU32*/
	export var C2S_Pet_GetPetAchivesReward: CmdType = createCmd("C2S_Pet_GetPetAchivesReward", 3, 35, true, Pb_God.PBU32);
	/**	 新增道具				PBG2CNewItem*/
	export var S2C_Item_New: CmdType = createCmd("S2C_Item_New", 4, 0, false, Pb_God.PBG2CNewItem);
	/**	 更新道具信息			PBItem*/
	export var S2C_Item_Update: CmdType = createCmd("S2C_Item_Update", 4, 1, false, Pb_God.PBItem);
	/**	 更新道具数量			PBG2CUpdateItem*/
	export var S2C_Item_UpdateNum: CmdType = createCmd("S2C_Item_UpdateNum", 4, 2, false, Pb_God.PBG2CUpdateItem);
	/**	 使用道具返回			无内容*/
	export var S2C_Item_Use: CmdType = createCmd("S2C_Item_Use", 4, 3, false);
	/**	 通用失败返回*/
	export var S2C_Item_Common: CmdType = createCmd("S2C_Item_Common", 4, 4, false);
	/**	 符文合成返回			PBItemSn*/
	export var S2C_Item_RuneCompound: CmdType = createCmd("S2C_Item_RuneCompound", 4, 5, false, Pb_God.PBItemSn);
	/**	 符文重铸返回			PBG2CRuneRefineAck*/
	export var S2C_Item_RuneRefine: CmdType = createCmd("S2C_Item_RuneRefine", 4, 6, false, Pb_God.PBG2CRuneRefineAck);
	/**	 符文重铸保存返回		PBItem*/
	export var S2C_Item_SaveRuneRefine: CmdType = createCmd("S2C_Item_SaveRuneRefine", 4, 7, false, Pb_God.PBItem);
	/** 	 装备合成返回			失败才返回*/
	export var S2C_Item_EquipCompound: CmdType = createCmd("S2C_Item_EquipCompound", 4, 8, false);
	/** 	 装备一键合成返回		失败才返回*/
	export var S2C_Item_EquipAutoCompound: CmdType = createCmd("S2C_Item_EquipAutoCompound", 4, 9, false);
	/** 	 伙伴合成返回			PBG2CPetCompound*/
	export var S2C_Item_PetCompound: CmdType = createCmd("S2C_Item_PetCompound", 4, 10, false, Pb_God.PBG2CPetCompound);
	/**	 神装洗练	返回		PBG2CGodEquipRefineAck*/
	export var S2C_Item_GodEquipRefine: CmdType = createCmd("S2C_Item_GodEquipRefine", 4, 11, false, Pb_God.PBG2CGodEquipRefineAck);
	/**	 神装洗练	保存返回	PBItem*/
	export var S2C_Item_SaveGodEquipRefine: CmdType = createCmd("S2C_Item_SaveGodEquipRefine", 4, 12, false, Pb_God.PBItem);
	/**	 查询装备合成记录		PBG2CEquipCompoundLog	*/
	export var S2C_Item_EquipCompoundLog: CmdType = createCmd("S2C_Item_EquipCompoundLog", 4, 13, false, Pb_God.PBG2CEquipCompoundLog);
	/** 	 使用道具				PBC2GUseItem*/
	export var C2S_Item_Use: CmdType = createCmd("C2S_Item_Use", 4, 1, true, Pb_God.PBC2GUseItem);
	/** 	 装备合成				PBCAGItemCompound*/
	export var C2S_Item_EquipCompound: CmdType = createCmd("C2S_Item_EquipCompound", 4, 2, true, Pb_God.PBCAGItemCompound);
	/** 	 装备一键合成			PBC2GEquipAutoCompound*/
	export var C2S_Item_EquipAutoCompound: CmdType = createCmd("C2S_Item_EquipAutoCompound", 4, 3, true, Pb_God.PBC2GEquipAutoCompound);
	/** 	 符文合成				PBC2GRuneCompound*/
	export var C2S_Item_RuneCompound: CmdType = createCmd("C2S_Item_RuneCompound", 4, 4, true, Pb_God.PBC2GRuneCompound);
	/** 	 伙伴合成				PBC2GPetCompound*/
	export var C2S_Item_PetCompound: CmdType = createCmd("C2S_Item_PetCompound", 4, 5, true, Pb_God.PBC2GPetCompound);
	/** 	 道具出售				PBC2GItemSell*/
	export var C2S_Item_Sell: CmdType = createCmd("C2S_Item_Sell", 4, 6, true, Pb_God.PBC2GItemSell);
	/** 	 道具分解				PBC2GItemSplit		*/
	export var C2S_Item_Split: CmdType = createCmd("C2S_Item_Split", 4, 7, true, Pb_God.PBC2GItemSplit);
	/** 	 符文重铸				PBC2GRuneRefineAsk	*/
	export var C2S_Item_RuneRefine: CmdType = createCmd("C2S_Item_RuneRefine", 4, 8, true, Pb_God.PBC2GRuneRefineAsk);
	/** 	 符文重铸保存			PBItemSn	*/
	export var C2S_Item_SaveRuneRefine: CmdType = createCmd("C2S_Item_SaveRuneRefine", 4, 9, true, Pb_God.PBItemSn);
	/** 	 全额购买				PBItemInfo*/
	export var C2S_Item_FullBuy: CmdType = createCmd("C2S_Item_FullBuy", 4, 10, true, Pb_God.PBItemInfo);
	/** 	 符文兑换	*/
	export var C2S_Item_RuneExchange: CmdType = createCmd("C2S_Item_RuneExchange", 4, 11, true);
	/** 	 神装洗练				PBC2GGodEquipRefineAsk	*/
	export var C2S_Item_GodEquipRefine: CmdType = createCmd("C2S_Item_GodEquipRefine", 4, 12, true, Pb_God.PBC2GGodEquipRefineAsk);
	/** 	 神装洗练	保存		PBItemSn	*/
	export var C2S_Item_SaveGodEquipRefine: CmdType = createCmd("C2S_Item_SaveGodEquipRefine", 4, 13, true, Pb_God.PBItemSn);
	/** 	 一键出售				PBC2GItemSellOneKeyAsk	*/
	export var C2S_Item_SellOneKey: CmdType = createCmd("C2S_Item_SellOneKey", 4, 14, true, Pb_God.PBC2GItemSellOneKeyAsk);
	/** 	 查询装备合成记录			*/
	export var C2S_Item_EquipCompoundLog: CmdType = createCmd("C2S_Item_EquipCompoundLog", 4, 15, true);
	/** 	 使用礼包道具				PBC2GBagUseItem*/
	export var C2S_Item_Bag_Use: CmdType = createCmd("C2S_Item_Bag_Use", 4, 16, true, Pb_God.PBC2GBagUseItem);
	/**	 使用升星道具			PBC2GUpstarUseItem*/
	export var C2S_Item_UpStar_Use: CmdType = createCmd("C2S_Item_UpStar_Use", 4, 17, true, Pb_God.PBC2GUpstarUseItem);
	/**通用失败返回*/
	export var S2C_Fight_Common_Ack: CmdType = createCmd("S2C_Fight_Common_Ack", 5, 0, false);
	/**普通战斗返回			PBFightBase*/
	export var S2C_Fight_NormalBegin_Ack: CmdType = createCmd("S2C_Fight_NormalBegin_Ack", 5, 1, false, Pb_God.PBFightBase);
	/**普通战斗结果			PBFightResult*/
	export var S2C_Fight_NormalResult_Ack: CmdType = createCmd("S2C_Fight_NormalResult_Ack", 5, 2, false, Pb_God.PBFightResult);
	/**加载正在进行的战斗	PBFightResult*/
	export var S2C_Fight_LoadIng: CmdType = createCmd("S2C_Fight_LoadIng", 5, 3, false, Pb_God.PBFightResult);
	/**无尽继续返回			PBFightResult*/
	export var S2C_Fight_EndlessContinue_Ack: CmdType = createCmd("S2C_Fight_EndlessContinue_Ack", 5, 4, false, Pb_God.PBFightResult);
	/**普通战斗			PBC2GFightNormalBegin*/
	export var C2S_Fight_NormalBegin: CmdType = createCmd("C2S_Fight_NormalBegin", 5, 1, true, Pb_God.PBC2GFightNormalBegin);
	/**普通战斗结果		PBC2GFightNormalResult*/
	export var C2S_Fight_NormalResult: CmdType = createCmd("C2S_Fight_NormalResult", 5, 2, true, Pb_God.PBC2GFightNormalResult);
	/**无尽继续战斗		PBC2GFightBeginBase		*/
	export var C2S_Fight_EndlessContinue: CmdType = createCmd("C2S_Fight_EndlessContinue", 5, 3, true, Pb_God.PBC2GFightBeginBase);
	/**退出战斗			PBC2GFightBeginBase*/
	export var C2S_Fight_Exit: CmdType = createCmd("C2S_Fight_Exit", 5, 4, true, Pb_God.PBC2GFightBeginBase);
	/**天界副本放弃战斗	PBC2GFightBeginBase*/
	export var C2S_Fight_HeavenGiveup: CmdType = createCmd("C2S_Fight_HeavenGiveup", 5, 5, true, Pb_God.PBC2GFightBeginBase);
	/** 	 完成任务返回		失败才返回*/
	export var S2C_Task_CompleteAck: CmdType = createCmd("S2C_Task_CompleteAck", 6, 0, false);
	/**	 新增任务			PBG2CTaskUpdate*/
	export var S2C_Task_Add: CmdType = createCmd("S2C_Task_Add", 6, 1, false, Pb_God.PBG2CTaskUpdate);
	/**	 更新任务参数		PBG2CTaskUpdate*/
	export var S2C_Task_Syn: CmdType = createCmd("S2C_Task_Syn", 6, 2, false, Pb_God.PBG2CTaskUpdate);
	/** 	 完成任务			PBC2GTaskCompleteAsk*/
	export var C2S_Task_Complete: CmdType = createCmd("C2S_Task_Complete", 6, 0, true, Pb_God.PBC2GTaskCompleteAsk);
	/**新邮件 	PBMail*/
	export var S2C_Mail_New: CmdType = createCmd("S2C_Mail_New", 7, 0, false, Pb_God.PBMail);
	/**删除返回	 PBAllMailID*/
	export var S2C_Mail_Delete: CmdType = createCmd("S2C_Mail_Delete", 7, 1, false, Pb_God.PBAllMailID);
	/**已读返回	PBMailID*/
	export var S2C_Mail_Read: CmdType = createCmd("S2C_Mail_Read", 7, 2, false, Pb_God.PBMailID);
	/**领取返回	PBAllMailID*/
	export var S2C_Mail_Reward: CmdType = createCmd("S2C_Mail_Reward", 7, 3, false, Pb_God.PBAllMailID);
	/**读取邮件	PBMailID*/
	export var C2S_Mail_Read: CmdType = createCmd("C2S_Mail_Read", 7, 0, true, Pb_God.PBMailID);
	/**领取奖励	PBMailID*/
	export var C2S_Mail_Reward: CmdType = createCmd("C2S_Mail_Reward", 7, 1, true, Pb_God.PBMailID);
	/**领取所有奖励  无内容*/
	export var C2S_Mail_RewardAll: CmdType = createCmd("C2S_Mail_RewardAll", 7, 2, true);
	/**删除邮件	PBMailID*/
	export var C2S_Mail_Delete: CmdType = createCmd("C2S_Mail_Delete", 7, 3, true, Pb_God.PBMailID);
	/**领取所有邮件  无内容*/
	export var C2S_Mail_DeleteAll: CmdType = createCmd("C2S_Mail_DeleteAll", 7, 4, true);
	/**排行榜列表返回	PBS2CTopListList	*/
	export var S2C_TopList_List_Ack: CmdType = createCmd("S2C_TopList_List_Ack", 8, 0, false, Pb_God.PBS2CTopListList);
	/**帮派排行榜列表返回	PBS2CFactionTopList*/
	export var S2C_TopList_FactionList_Ack: CmdType = createCmd("S2C_TopList_FactionList_Ack", 8, 1, false, Pb_God.PBS2CFactionTopList);
	/**所有世界排行	PBS2CAllTopList*/
	export var S2C_TopList_WorldAll_Ack: CmdType = createCmd("S2C_TopList_WorldAll_Ack", 8, 2, false, Pb_God.PBS2CAllTopList);
	/**所有跨服排行	PBS2CAllTopList*/
	export var S2C_TopList_BWAll_Ack: CmdType = createCmd("S2C_TopList_BWAll_Ack", 8, 3, false, Pb_God.PBS2CAllTopList);
	/**自己排名信息	PBTopListDetail*/
	export var S2C_TopList_GetSelf_Ack: CmdType = createCmd("S2C_TopList_GetSelf_Ack", 8, 4, false, Pb_God.PBTopListDetail);
	/**返回奖励索引	PBS2CRewardID */
	export var S2C_TopList_RewardID: CmdType = createCmd("S2C_TopList_RewardID", 8, 5, false, Pb_God.PBS2CRewardID);
	/**请求排行榜列表 PBC2GTopListList*/
	export var C2S_TopList_List: CmdType = createCmd("C2S_TopList_List", 8, 0, true, Pb_God.PBC2GTopListList);
	/**请求所有世界排行*/
	export var C2S_TopList_WorldAll: CmdType = createCmd("C2S_TopList_WorldAll", 8, 1, true);
	/**请求所有跨服排行*/
	export var C2S_TopList_BWAll: CmdType = createCmd("C2S_TopList_BWAll", 8, 2, true);
	/**请求自己排名信息 PBC2GGetSelf*/
	export var C2S_TopList_GetSelf: CmdType = createCmd("C2S_TopList_GetSelf", 8, 3, true, Pb_God.PBC2GGetSelf);
	/**请求奖励索引	PBC2GGetSelf*/
	export var C2S_TopList_RewardID: CmdType = createCmd("C2S_TopList_RewardID", 8, 4, true, Pb_God.PBC2GGetSelf);
	/**失败才返回*/
	export var S2C_Challenge_Common_Ack: CmdType = createCmd("S2C_Challenge_Common_Ack", 9, 0, false);
	/**对手信息返回		PBG2CChallengeTargetAck*/
	export var S2C_Challenge_Target_Ack: CmdType = createCmd("S2C_Challenge_Target_Ack", 9, 1, false, Pb_God.PBG2CChallengeTargetAck);
	/**领取周宝箱返回	PBU32*/
	export var S2C_Challenge_WeekPrize: CmdType = createCmd("S2C_Challenge_WeekPrize", 9, 2, false, Pb_God.PBU32);
	/**自己的排行信息	PBG2CChallengeTopInfo*/
	export var S2C_Challenge_OpenSyn: CmdType = createCmd("S2C_Challenge_OpenSyn", 9, 3, false, Pb_God.PBG2CChallengeTopInfo);
	/**同步进入次数		PBG2CChallengeSynEnterCount*/
	export var S2C_Challenge_SynEnterCount: CmdType = createCmd("S2C_Challenge_SynEnterCount", 9, 4, false, Pb_God.PBG2CChallengeSynEnterCount);
	/**被点赞次数		PBChallengeLikeAck*/
	export var S2C_Challenge_LikeNum: CmdType = createCmd("S2C_Challenge_LikeNum", 9, 5, false, Pb_God.PBChallengeLikeAck);
	/**点赞次数		PBU32*/
	export var S2C_Challenge_LikeNumToPlayer: CmdType = createCmd("S2C_Challenge_LikeNumToPlayer", 9, 6, false, Pb_God.PBU32);
	/**对手信息返回		PBG2CChallengeTargetInfo*/
	export var S2C_Challenge_Target_PlayerInfo: CmdType = createCmd("S2C_Challenge_Target_PlayerInfo", 9, 7, false, Pb_God.PBG2CChallengeTargetInfo);
	/**点赞返回			PBU32*/
	export var S2C_Challenge_Like: CmdType = createCmd("S2C_Challenge_Like", 9, 8, false, Pb_God.PBU32);
	/**刷新对手 	无内容*/
	export var C2S_Challenge_Refresh: CmdType = createCmd("C2S_Challenge_Refresh", 9, 1, true);
	/**领取周宝箱	PBU32*/
	export var C2S_Challenge_WeekPrize: CmdType = createCmd("C2S_Challenge_WeekPrize", 9, 2, true, Pb_God.PBU32);
	/**打开竞技场	无内容*/
	export var C2S_Challenge_Open: CmdType = createCmd("C2S_Challenge_Open", 9, 3, true);
	/**点赞		PBU32玩家id*/
	export var C2S_Challenge_Like: CmdType = createCmd("C2S_Challenge_Like", 9, 4, true, Pb_God.PBU32);
	/**玩家信息	PBU32玩家id*/
	export var C2S_Challenge_AskPlayerInfo: CmdType = createCmd("C2S_Challenge_AskPlayerInfo", 9, 5, true, Pb_God.PBU32);
	/**	 通用返回				失败才返回*/
	export var S2C_Faction_Common: CmdType = createCmd("S2C_Faction_Common", 10, 0, false);
	/**	 创建帮会				PBC2GFactionCreate*/
	export var S2C_Faction_Create: CmdType = createCmd("S2C_Faction_Create", 10, 1, false, Pb_God.PBC2GFactionCreate);
	/**	 帮会基本数据			PBG2CFactionSyn*/
	export var S2C_Faction_Syn: CmdType = createCmd("S2C_Faction_Syn", 10, 2, false, Pb_God.PBG2CFactionSyn);
	/**	 退出帮会*/
	export var S2C_Faction_Quit: CmdType = createCmd("S2C_Faction_Quit", 10, 3, false);
	/**	 请求自己申请帮会列表	PBG2CFactionApplyList	*/
	export var S2C_Faction_SelfApplyList: CmdType = createCmd("S2C_Faction_SelfApplyList", 10, 4, false, Pb_God.PBG2CFactionApplyList);
	/**	 所有自己申请的帮派	PBG2CFactionAllApply	*/
	export var S2C_Faction_SelfAllApply: CmdType = createCmd("S2C_Faction_SelfAllApply", 10, 5, false, Pb_God.PBG2CFactionAllApply);
	/**	 请求帮会列表			PBG2CFactionList	*/
	export var S2C_Faction_TopList: CmdType = createCmd("S2C_Faction_TopList", 10, 6, false, Pb_God.PBG2CFactionList);
	/**	 请求帮会成员列表		PBG2CFactionMemberList*/
	export var S2C_Faction_MemberList: CmdType = createCmd("S2C_Faction_MemberList", 10, 7, false, Pb_God.PBG2CFactionMemberList);
	/**	 帮会删除				PBU32*/
	export var S2C_Faction_Remove: CmdType = createCmd("S2C_Faction_Remove", 10, 8, false, Pb_God.PBU32);
	/**	 修改帮派公告			PBC2GFactionEdit*/
	export var S2C_Faction_Edit: CmdType = createCmd("S2C_Faction_Edit", 10, 9, false, Pb_God.PBC2GFactionEdit);
	/**	 删除一个申请			PBU32	*/
	export var S2C_Faction_DelApply: CmdType = createCmd("S2C_Faction_DelApply", 10, 10, false, Pb_God.PBU32);
	/**	 改变官职				失败才返回	*/
	export var S2C_Faction_ChangeJob: CmdType = createCmd("S2C_Faction_ChangeJob", 10, 11, false);
	/**	 申请返回				失败才返回	*/
	export var S2C_Faction_Apply: CmdType = createCmd("S2C_Faction_Apply", 10, 12, false);
	/**	 帮会捐献返回			PBU32*/
	export var S2C_Faction_Donate: CmdType = createCmd("S2C_Faction_Donate", 10, 13, false, Pb_God.PBU32);
	/**	 查看申请帮会列表		PBG2CFactionQueryApplyList	*/
	export var S2C_Faction_QueryApplyList: CmdType = createCmd("S2C_Faction_QueryApplyList", 10, 14, false, Pb_God.PBG2CFactionQueryApplyList);
	/**	 修改入会条件			PBCAGFactionSetCondition	*/
	export var S2C_Faction_SetCondition: CmdType = createCmd("S2C_Faction_SetCondition", 10, 15, false, Pb_God.PBCAGFactionSetCondition);
	/**	 通知玩家加入帮会		无内容	*/
	export var S2C_Faction_JoinAck: CmdType = createCmd("S2C_Faction_JoinAck", 10, 16, false);
	/**	 通知玩家退出帮会		无内容	*/
	export var S2C_Faction_ExitAck: CmdType = createCmd("S2C_Faction_ExitAck", 10, 17, false);
	/**	 领取捐献奖励返回		PBU32*/
	export var S2C_Faction_DonatePrize: CmdType = createCmd("S2C_Faction_DonatePrize", 10, 18, false, Pb_God.PBU32);
	/**	 活跃度同步返回		PBG2CFactionSynLiveness*/
	export var S2C_Faction_SynLiveness: CmdType = createCmd("S2C_Faction_SynLiveness", 10, 19, false, Pb_God.PBG2CFactionSynLiveness);
	/**	 技能升级				PBCAGFactionSkillUpgrade*/
	export var S2C_Faction_UpgradeSkill: CmdType = createCmd("S2C_Faction_UpgradeSkill", 10, 20, false, Pb_God.PBCAGFactionSkillUpgrade);
	/**	 技能重置				PBG2CFactionSkillReset*/
	export var S2C_Faction_SkillReset: CmdType = createCmd("S2C_Faction_SkillReset", 10, 21, false, Pb_God.PBG2CFactionSkillReset);
	/**	帮派副本同步			PBG2CFactionCopymapSyn*/
	export var S2C_Faction_CopymapSyn: CmdType = createCmd("S2C_Faction_CopymapSyn", 10, 22, false, Pb_God.PBG2CFactionCopymapSyn);
	/**	帮派副本排行同步		PBG2CFactionCopymapTop*/
	export var S2C_Faction_CopymapTop: CmdType = createCmd("S2C_Faction_CopymapTop", 10, 23, false, Pb_God.PBG2CFactionCopymapTop);
	/**	帮派副本副本否买加成buff	PBG2CFactionCopymapSkill*/
	export var S2C_Faction_CopymapUpdateSkill: CmdType = createCmd("S2C_Faction_CopymapUpdateSkill", 10, 24, false, Pb_God.PBG2CFactionCopymapSkill);
	/**	同步捐献活跃度		PBU32*/
	export var S2C_Faction_SynDonateLiveness: CmdType = createCmd("S2C_Faction_SynDonateLiveness", 10, 25, false, Pb_God.PBU32);
	/**	帮派副本副本更新次数	PBG2CFactionCopymapUpdateCount*/
	export var S2C_Faction_CopymapUpdateCount: CmdType = createCmd("S2C_Faction_CopymapUpdateCount", 10, 26, false, Pb_God.PBG2CFactionCopymapUpdateCount);
	/**	副本扫荡返回			*/
	export var S2C_Faction_CopymapSweep: CmdType = createCmd("S2C_Faction_CopymapSweep", 10, 28, false);
	/**	帮派重命名			PBG2CFactionRenameAck		*/
	export var S2C_Faction_Rename: CmdType = createCmd("S2C_Faction_Rename", 10, 29, false, Pb_God.PBG2CFactionRenameAck);
	/**	公会招募				PBG2CFactionRecruitAck*/
	export var S2C_Faction_Recruit: CmdType = createCmd("S2C_Faction_Recruit", 10, 30, false, Pb_God.PBG2CFactionRecruitAck);
	/**	副本集结				PBU32*/
	export var S2C_Faction_CopymapNotice: CmdType = createCmd("S2C_Faction_CopymapNotice", 10, 31, false, Pb_God.PBU32);
	/**	 帮派红点	无内容*/
	export var S2C_Faction_ApplyHotData: CmdType = createCmd("S2C_Faction_ApplyHotData", 10, 32, false);
	/**	公会弹劾				PBG2CFactionImpeach*/
	export var S2C_Faction_Impeach: CmdType = createCmd("S2C_Faction_Impeach", 10, 33, false, Pb_God.PBG2CFactionImpeach);
	/**	返回所有对阵列表		PBG2CFactionWarListAck*/
	export var S2C_FactionWar_QueryAllListAck: CmdType = createCmd("S2C_FactionWar_QueryAllListAck", 10, 50, false, Pb_God.PBG2CFactionWarListAck);
	/**	返回查询成员列表		PBG2CFactionWarMemberListAck*/
	export var S2C_FactionWar_QueryMemberListAck: CmdType = createCmd("S2C_FactionWar_QueryMemberListAck", 10, 51, false, Pb_God.PBG2CFactionWarMemberListAck);
	/**	返回查询成员信息		PBG2CFactionWarMemberInfoAck*/
	export var S2C_FactionWar_QueryMemberInfoAck: CmdType = createCmd("S2C_FactionWar_QueryMemberInfoAck", 10, 52, false, Pb_God.PBG2CFactionWarMemberInfoAck);
	/**	返回查询战场日志		PBG2CFactionWarLogAck*/
	export var S2C_FactionWar_QueryWarLog: CmdType = createCmd("S2C_FactionWar_QueryWarLog", 10, 53, false, Pb_God.PBG2CFactionWarLogAck);
	/**	返回查询我的日志		PBG2CFactionWarLogAck*/
	export var S2C_FactionWar_QuerySelfLog: CmdType = createCmd("S2C_FactionWar_QuerySelfLog", 10, 54, false, Pb_God.PBG2CFactionWarLogAck);
	/**	返回查询目标防御记录	PBG2CFactionWarTarRecordAck*/
	export var S2C_FactionWar_QueryTarRecordLog: CmdType = createCmd("S2C_FactionWar_QueryTarRecordLog", 10, 55, false, Pb_God.PBG2CFactionWarTarRecordAck);
	/**	返回查询进攻列表		PBG2CFactionWarAttackListAck*/
	export var S2C_FactionWar_QueryAttackListAck: CmdType = createCmd("S2C_FactionWar_QueryAttackListAck", 10, 56, false, Pb_God.PBG2CFactionWarAttackListAck);
	/**	返回所有宝箱信息		PBG2CFactionWarSynBoxInfo*/
	export var S2C_FactionWar_SynBoxInfo: CmdType = createCmd("S2C_FactionWar_SynBoxInfo", 10, 57, false, Pb_God.PBG2CFactionWarSynBoxInfo);
	/**	开启宝箱返回			PBFactionWarBox*/
	export var S2C_FactionWar_OpenBoxPrizeAck: CmdType = createCmd("S2C_FactionWar_OpenBoxPrizeAck", 10, 58, false, Pb_God.PBFactionWarBox);
	/**	开启返回				PBG2CFactionWarSynOpen	*/
	export var S2C_FactionWar_OpenAck: CmdType = createCmd("S2C_FactionWar_OpenAck", 10, 59, false, Pb_God.PBG2CFactionWarSynOpen);
	/**	返回匹配成功			*/
	export var S2C_FactionWar_SynMatch: CmdType = createCmd("S2C_FactionWar_SynMatch", 10, 60, false);
	/**	公会战挑战结果		PBG2CFactionWarFightResult*/
	export var S2C_FactionWar_FightResult: CmdType = createCmd("S2C_FactionWar_FightResult", 10, 61, false, Pb_God.PBG2CFactionWarFightResult);
	/**	 帮会日志 			PBFactionAllEvents*/
	export var S2C_Faction_Log: CmdType = createCmd("S2C_Faction_Log", 10, 62, false, Pb_God.PBFactionAllEvents);
	/**	同步游戏数据			PBFactionSynGame*/
	export var S2C_Faction_SynGame: CmdType = createCmd("S2C_Faction_SynGame", 10, 100, false, Pb_God.PBFactionSynGame);
	/**	副本进入返回			PBFightBase*/
	export var S2C_Faction_FightBeginAck: CmdType = createCmd("S2C_Faction_FightBeginAck", 10, 101, false, Pb_God.PBFightBase);
	/**	公会战挑战返回		PBFightBase*/
	export var S2C_Faction_WarFightBeginAck: CmdType = createCmd("S2C_Faction_WarFightBeginAck", 10, 102, false, Pb_God.PBFightBase);
	/**	宝箱奖励				PBFactionWarBox*/
	export var S2C_Faction_WarOpenBoxPrizeAck: CmdType = createCmd("S2C_Faction_WarOpenBoxPrizeAck", 10, 103, false, Pb_God.PBFactionWarBox);
	/**	 创建帮会 				PBC2GFactionCreate	*/
	export var C2S_Faction_Create: CmdType = createCmd("C2S_Faction_Create", 10, 0, true, Pb_God.PBC2GFactionCreate);
	/**	 退出*/
	export var C2S_Faction_Quit: CmdType = createCmd("C2S_Faction_Quit", 10, 1, true);
	/**	 修改帮派公告				PBC2GFactionEdit*/
	export var C2S_Faction_Edit: CmdType = createCmd("C2S_Faction_Edit", 10, 2, true, Pb_God.PBC2GFactionEdit);
	/**	 申请加入帮会 			PBC2GFactionApply*/
	export var C2S_Faction_Apply: CmdType = createCmd("C2S_Faction_Apply", 10, 3, true, Pb_God.PBC2GFactionApply);
	/**	 打开帮会					*/
	export var C2S_Faction_Open: CmdType = createCmd("C2S_Faction_Open", 10, 4, true);
	/**	 请求帮会列表*/
	export var C2S_Faction_List: CmdType = createCmd("C2S_Faction_List", 10, 5, true);
	/**	 请求帮会成员列表*/
	export var C2S_Faction_MemberList: CmdType = createCmd("C2S_Faction_MemberList", 10, 6, true);
	/**	 批准/拒绝加入申请		PBC2GFactionAgreeApply					*/
	export var C2S_Faction_AgreeApply: CmdType = createCmd("C2S_Faction_AgreeApply", 10, 7, true, Pb_God.PBC2GFactionAgreeApply);
	/**	 改变官职					PBC2GFactionChangeJob							*/
	export var C2S_Faction_ChangeJob: CmdType = createCmd("C2S_Faction_ChangeJob", 10, 9, true, Pb_God.PBC2GFactionChangeJob);
	/**	 踢出帮派					PBU32					*/
	export var C2S_Faction_Kick: CmdType = createCmd("C2S_Faction_Kick", 10, 11, true, Pb_God.PBU32);
	/**	 帮会改名					PBString	*/
	export var C2S_Faction_Rename: CmdType = createCmd("C2S_Faction_Rename", 10, 12, true, Pb_God.PBString);
	/**	 帮会捐献					PBU32*/
	export var C2S_Faction_Donate: CmdType = createCmd("C2S_Faction_Donate", 10, 13, true, Pb_God.PBU32);
	/**	 查看申请列表*/
	export var C2S_Faction_QueryApplyList: CmdType = createCmd("C2S_Faction_QueryApplyList", 10, 14, true);
	/**	 领取捐献奖励				PBU32*/
	export var C2S_Faction_DonatePrize: CmdType = createCmd("C2S_Faction_DonatePrize", 10, 15, true, Pb_God.PBU32);
	/**	 活跃度升级*/
	export var C2S_Faction_UpgradeLiveness: CmdType = createCmd("C2S_Faction_UpgradeLiveness", 10, 16, true);
	/**	 技能升级					PBCAGFactionSkillUpgrade	*/
	export var C2S_Faction_UpgradeSkill: CmdType = createCmd("C2S_Faction_UpgradeSkill", 10, 17, true, Pb_God.PBCAGFactionSkillUpgrade);
	/**	 技能重置					PBU32*/
	export var C2S_Faction_SkillReset: CmdType = createCmd("C2S_Faction_SkillReset", 10, 18, true, Pb_God.PBU32);
	/**	 购买副本次数*/
	export var C2S_Faction_CopymapBuyCount: CmdType = createCmd("C2S_Faction_CopymapBuyCount", 10, 19, true);
	/**	 购买扫荡					PBU32*/
	export var C2S_Faction_CopymapSweep: CmdType = createCmd("C2S_Faction_CopymapSweep", 10, 20, true, Pb_God.PBU32);
	/**	 打开副本系统*/
	export var C2S_Faction_CopymapOpen: CmdType = createCmd("C2S_Faction_CopymapOpen", 10, 21, true);
	/**	 副本排行					PBU32*/
	export var C2S_Faction_CopymapTop: CmdType = createCmd("C2S_Faction_CopymapTop", 10, 22, true, Pb_God.PBU32);
	/**	 副本集结*/
	export var C2S_Faction_CopymapNotice: CmdType = createCmd("C2S_Faction_CopymapNotice", 10, 23, true);
	/**	 副本否买加成buff*/
	export var C2S_Faction_CopymapBuySkill: CmdType = createCmd("C2S_Faction_CopymapBuySkill", 10, 24, true);
	/**	 修改入会条件				PBCAGFactionSetCondition	*/
	export var C2S_Faction_SetCondition: CmdType = createCmd("C2S_Faction_SetCondition", 10, 25, true, Pb_God.PBCAGFactionSetCondition);
	/**	 公会招募*/
	export var C2S_Faction_Recruit: CmdType = createCmd("C2S_Faction_Recruit", 10, 26, true);
	/**	公会弹劾					PBC2GFactionImpeach*/
	export var C2S_Faction_Impeach: CmdType = createCmd("C2S_Faction_Impeach", 10, 27, true, Pb_God.PBC2GFactionImpeach);
	/**	 查询所有对阵列表		*/
	export var C2S_FactionWar_QueryAllList: CmdType = createCmd("C2S_FactionWar_QueryAllList", 10, 50, true);
	/**	 查询成员列表				PBC2GFactionWarMemberList*/
	export var C2S_FactionWar_QueryMemberList: CmdType = createCmd("C2S_FactionWar_QueryMemberList", 10, 51, true, Pb_God.PBC2GFactionWarMemberList);
	/**	 查询成员信息				PBC2GFactionWarMemberInfo*/
	export var C2S_FactionWar_QueryMemberInfo: CmdType = createCmd("C2S_FactionWar_QueryMemberInfo", 10, 52, true, Pb_God.PBC2GFactionWarMemberInfo);
	/**	 查询战场日志*/
	export var C2S_FactionWar_QueryWarLog: CmdType = createCmd("C2S_FactionWar_QueryWarLog", 10, 53, true);
	/**	 查询我的日志		*/
	export var C2S_FactionWar_QuerySelfLog: CmdType = createCmd("C2S_FactionWar_QuerySelfLog", 10, 54, true);
	/**	 查询目标防守记录			PBC2GFactionWarQueryTarRecord		*/
	export var C2S_FactionWar_QueryTarRecord: CmdType = createCmd("C2S_FactionWar_QueryTarRecord", 10, 55, true, Pb_God.PBC2GFactionWarQueryTarRecord);
	/**	 查询进攻列表	*/
	export var C2S_FactionWar_QueryAttackList: CmdType = createCmd("C2S_FactionWar_QueryAttackList", 10, 56, true);
	/**	 查询宝箱	*/
	export var C2S_FactionWar_QueryBoxInfo: CmdType = createCmd("C2S_FactionWar_QueryBoxInfo", 10, 57, true);
	/**	 开启宝箱					PBC2GFactionWarOpenBox			*/
	export var C2S_FactionWar_OpenBox: CmdType = createCmd("C2S_FactionWar_OpenBox", 10, 58, true, Pb_God.PBC2GFactionWarOpenBox);
	/**	 打开公会战*/
	export var C2S_FactionWar_OpenWar: CmdType = createCmd("C2S_FactionWar_OpenWar", 10, 59, true);
	/**	 帮会日志*/
	export var C2S_Faction_Log: CmdType = createCmd("C2S_Faction_Log", 10, 60, true);
	/**	 同步贡献跟经验			PBC2GFactionAddContriExp*/
	export var C2S_Faction_AddContriExp: CmdType = createCmd("C2S_Faction_AddContriExp", 10, 100, true, Pb_God.PBC2GFactionAddContriExp);
	/**	 副本进入请求				PBFightBase*/
	export var C2S_Faction_FightBegin: CmdType = createCmd("C2S_Faction_FightBegin", 10, 101, true, Pb_God.PBFightBase);
	/**	 副本完成请求				PBC2GFactionAddContriExp*/
	export var C2S_Faction_FightResult: CmdType = createCmd("C2S_Faction_FightResult", 10, 102, true, Pb_God.PBC2GFactionAddContriExp);
	/**	 同步活跃等级				PBU32*/
	export var C2S_Faction_LivenessLevel: CmdType = createCmd("C2S_Faction_LivenessLevel", 10, 103, true, Pb_God.PBU32);
	/**	 公会战结果*/
	export var C2S_Faction_FightWarResult: CmdType = createCmd("C2S_Faction_FightWarResult", 10, 104, true);
	/**	 通用				通用失败才返回*/
	export var S2C_Team_Common: CmdType = createCmd("S2C_Team_Common", 11, 0, false);
	/**	 返回队伍列表		PBG2CTeamList*/
	export var S2C_Team_List: CmdType = createCmd("S2C_Team_List", 11, 1, false, Pb_God.PBG2CTeamList);
	/**	 同步队伍信息		PBTeamData*/
	export var S2C_Team_SynData: CmdType = createCmd("S2C_Team_SynData", 11, 2, false, Pb_God.PBTeamData);
	/**	 离开队伍返回*/
	export var S2C_Team_Exit: CmdType = createCmd("S2C_Team_Exit", 11, 3, false);
	/**	 设置队伍状态返回	PBCAGTeamSetStatus*/
	export var S2C_Team_SetStatus: CmdType = createCmd("S2C_Team_SetStatus", 11, 4, false, Pb_God.PBCAGTeamSetStatus);
	/**	 创建队伍 			PBC2GTeamCreate	*/
	export var C2S_Team_Create: CmdType = createCmd("C2S_Team_Create", 11, 0, true, Pb_God.PBC2GTeamCreate);
	/**	 查看队伍列表			PBC2GTeamList*/
	export var C2S_Team_List: CmdType = createCmd("C2S_Team_List", 11, 1, true, Pb_God.PBC2GTeamList);
	/**	 离开队伍				无内容*/
	export var C2S_Team_Exit: CmdType = createCmd("C2S_Team_Exit", 11, 2, true);
	/**	 踢人					PBU32*/
	export var C2S_Team_Kick: CmdType = createCmd("C2S_Team_Kick", 11, 3, true, Pb_God.PBU32);
	/**	 加入队伍				PBC2GTeamJoin*/
	export var C2S_Team_Join: CmdType = createCmd("C2S_Team_Join", 11, 4, true, Pb_God.PBC2GTeamJoin);
	/**	 快速加入队伍			PBC2GTeamJoin*/
	export var C2S_Team_AutoJoin: CmdType = createCmd("C2S_Team_AutoJoin", 11, 5, true, Pb_God.PBC2GTeamJoin);
	/**	 设置队伍状态			PBCAGTeamSetStatus*/
	export var C2S_Team_SetStatus: CmdType = createCmd("C2S_Team_SetStatus", 11, 6, true, Pb_God.PBCAGTeamSetStatus);
	/**	 开始挑战				无内容*/
	export var C2S_Team_Start: CmdType = createCmd("C2S_Team_Start", 11, 7, true);
	/**	 准备挑战				服务器用	PBPlayerBattleInfo*/
	export var C2S_Team_ReadyStart: CmdType = createCmd("C2S_Team_ReadyStart", 11, 8, true, Pb_God.PBPlayerBattleInfo);
	/**	 通用失败返回*/
	export var S2C_Call_Common: CmdType = createCmd("S2C_Call_Common", 12, 0, false);
	/**	 更新召唤信息		PBPlayerCallInfo*/
	export var S2C_Call_Update: CmdType = createCmd("S2C_Call_Update", 12, 1, false, Pb_God.PBPlayerCallInfo);
	/** 	 伙伴转换返回		PBPlayerCallChange*/
	export var S2C_Call_Change: CmdType = createCmd("S2C_Call_Change", 12, 2, false, Pb_God.PBPlayerCallChange);
	/** 	 伙伴转换保存返回	PBU32*/
	export var S2C_Call_SaveChangeAck: CmdType = createCmd("S2C_Call_SaveChangeAck", 12, 3, false, Pb_God.PBU32);
	/** 	 设置自动分解返回	PBU32*/
	export var S2C_Call_AutoSplit: CmdType = createCmd("S2C_Call_AutoSplit", 12, 4, false, Pb_God.PBU32);
	/** 	 固定伙伴转换返回	PBPlayerCallChange*/
	export var S2C_Call_FixChange: CmdType = createCmd("S2C_Call_FixChange", 12, 5, false, Pb_God.PBPlayerCallChange);
	/** 	 召唤一次		PBU32*/
	export var C2S_Call_OnePet: CmdType = createCmd("C2S_Call_OnePet", 12, 1, true, Pb_God.PBU32);
	/** 	 召唤十次		PBU32*/
	export var C2S_Call_TenPet: CmdType = createCmd("C2S_Call_TenPet", 12, 2, true, Pb_God.PBU32);
	/** 	 免费召唤		PBU32*/
	export var C2S_Call_Free: CmdType = createCmd("C2S_Call_Free", 12, 3, true, Pb_God.PBU32);
	/** 	 英雄转换		PBU64*/
	export var C2S_Call_Change: CmdType = createCmd("C2S_Call_Change", 12, 4, true, Pb_God.PBU64);
	/** 	 英雄转换保存	PBU32*/
	export var C2S_Call_SaveChange: CmdType = createCmd("C2S_Call_SaveChange", 12, 5, true, Pb_God.PBU32);
	/** 	 设置自动分解	PBU32*/
	export var C2S_Call_AutoSplit: CmdType = createCmd("C2S_Call_AutoSplit", 12, 6, true, Pb_God.PBU32);
	/**	 固定英雄转换	PBC2G_Call_FixChange*/
	export var C2S_Call_FixChange: CmdType = createCmd("C2S_Call_FixChange", 12, 7, true, Pb_God.PBC2G_Call_FixChange);
	/**	 通用错误返回*/
	export var S2C_Sail_Common: CmdType = createCmd("S2C_Sail_Common", 13, 0, false);
	/**	 刷新返回 	PBG2CSailRefresh*/
	export var S2C_Sail_Refresh: CmdType = createCmd("S2C_Sail_Refresh", 13, 1, false, Pb_God.PBG2CSailRefresh);
	/**	 接取返回		PBPlayerSailInfo*/
	export var S2C_Sail_Accpet: CmdType = createCmd("S2C_Sail_Accpet", 13, 2, false, Pb_God.PBPlayerSailInfo);
	/**	 完成返回		PBU32*/
	export var S2C_Sail_DelAccpet: CmdType = createCmd("S2C_Sail_DelAccpet", 13, 3, false, Pb_God.PBU32);
	/** 	 刷新*/
	export var C2S_Sail_Refresh: CmdType = createCmd("C2S_Sail_Refresh", 13, 1, true);
	/** 	 接取		PBPlayerSailInfo*/
	export var C2S_Sail_Accpet: CmdType = createCmd("C2S_Sail_Accpet", 13, 2, true, Pb_God.PBPlayerSailInfo);
	/** 	 购买时间	PBU32*/
	export var C2S_Sail_BuyHour: CmdType = createCmd("C2S_Sail_BuyHour", 13, 3, true, Pb_God.PBU32);
	/** 	 完成		PBU32*/
	export var C2S_Sail_Complete: CmdType = createCmd("C2S_Sail_Complete", 13, 4, true, Pb_God.PBU32);
	/** 	 领取所有*/
	export var C2S_Sail_CompleteAll: CmdType = createCmd("C2S_Sail_CompleteAll", 13, 5, true);
	/**	通用错误返回*/
	export var S2C_Hook_Common: CmdType = createCmd("S2C_Hook_Common", 14, 0, false);
	/**	收益领奖					PBG2CProfitAck	*/
	export var S2C_Hook_ProfitAck: CmdType = createCmd("S2C_Hook_ProfitAck", 14, 1, false, Pb_God.PBG2CProfitAck);
	/**	飞新地图返回(新地图ID)	PBU32*/
	export var S2C_Hook_FlyNewSceneAck: CmdType = createCmd("S2C_Hook_FlyNewSceneAck", 14, 2, false, Pb_God.PBU32);
	/**	领取关卡奖励返回			PBU32*/
	export var S2C_Hook_StagePrizeAck: CmdType = createCmd("S2C_Hook_StagePrizeAck", 14, 3, false, Pb_God.PBU32);
	/**	快速挑战返回				PBG2CSweepAck	*/
	export var S2C_Hook_SweepAck: CmdType = createCmd("S2C_Hook_SweepAck", 14, 4, false, Pb_God.PBG2CSweepAck);
	/**	同步新关卡				PBG2CSynStageAck*/
	export var S2C_Hook_SynStage: CmdType = createCmd("S2C_Hook_SynStage", 14, 5, false, Pb_God.PBG2CSynStageAck);
	/**收益领奖  		无内容*/
	export var C2S_Hook_Profit: CmdType = createCmd("C2S_Hook_Profit", 14, 0, true);
	/**飞新挂机地图		无内容*/
	export var C2S_Hook_FlyNewScene: CmdType = createCmd("C2S_Hook_FlyNewScene", 14, 1, true);
	/**领取关卡奖励	 	PBU32*/
	export var C2S_Hook_StagePrize: CmdType = createCmd("C2S_Hook_StagePrize", 14, 2, true, Pb_God.PBU32);
	/**购买快速挑战*/
	export var C2S_Hook_BuySweep: CmdType = createCmd("C2S_Hook_BuySweep", 14, 3, true);
	/**免费快速挑战*/
	export var C2S_Hook_FreeSweep: CmdType = createCmd("C2S_Hook_FreeSweep", 14, 4, true);
	/**挑战关卡	*/
	export var C2S_Hook_FightStage: CmdType = createCmd("C2S_Hook_FightStage", 14, 5, true);
	/**	 通用错误返回*/
	export var S2C_Artifact_Common: CmdType = createCmd("S2C_Artifact_Common", 15, 0, false);
	/**	 激活返回 		PBCAGArtifactActive*/
	export var S2C_Artifact_Active: CmdType = createCmd("S2C_Artifact_Active", 15, 1, false, Pb_God.PBCAGArtifactActive);
	/**	 新增神器 		PBPlayerArtifactInfo*/
	export var S2C_Artifact_AddNew: CmdType = createCmd("S2C_Artifact_AddNew", 15, 2, false, Pb_God.PBPlayerArtifactInfo);
	/** 	 升级返回			PBG2CArtifactUpgrade*/
	export var S2C_Artifact_Upgrade: CmdType = createCmd("S2C_Artifact_Upgrade", 15, 3, false, Pb_God.PBG2CArtifactUpgrade);
	/** 	 技能升级返回		PBG2CArtifactSkill*/
	export var S2C_Artifact_Skill: CmdType = createCmd("S2C_Artifact_Skill", 15, 4, false, Pb_God.PBG2CArtifactSkill);
	/** 	 刻印石头返回		PBU32*/
	export var S2C_Artifact_UseStone: CmdType = createCmd("S2C_Artifact_UseStone", 15, 5, false, Pb_God.PBU32);
	/**	 同步信息 		PBPlayerArtifactInfo*/
	export var S2C_Artifact_Syn: CmdType = createCmd("S2C_Artifact_Syn", 15, 6, false, Pb_God.PBPlayerArtifactInfo);
	/** 	 幻化返回			PBCAGArtifactShape*/
	export var S2C_Artifact_Shape: CmdType = createCmd("S2C_Artifact_Shape", 15, 7, false, Pb_God.PBCAGArtifactShape);
	/**	 觉醒				PBU32*/
	export var S2C_Artifact_Awake: CmdType = createCmd("S2C_Artifact_Awake", 15, 8, false, Pb_God.PBU32);
	/**	 觉醒奖励			PBU32*/
	export var S2C_Artifact_AwakePrize: CmdType = createCmd("S2C_Artifact_AwakePrize", 15, 9, false, Pb_God.PBU32);
	/**	 法阵觉醒推送		PBU32*/
	export var S2C_Artifact_FazhenAwake: CmdType = createCmd("S2C_Artifact_FazhenAwake", 15, 10, false, Pb_God.PBU32);
	/** 	 激活			PBCAGArtifactActive*/
	export var C2S_Artifact_Active: CmdType = createCmd("C2S_Artifact_Active", 15, 1, true, Pb_God.PBCAGArtifactActive);
	/** 	 升级			*/
	export var C2S_Artifact_Upgrade: CmdType = createCmd("C2S_Artifact_Upgrade", 15, 2, true);
	/** 	 技能升级		PBU32*/
	export var C2S_Artifact_Skill: CmdType = createCmd("C2S_Artifact_Skill", 15, 3, true, Pb_God.PBU32);
	/** 	 刻印石头		PBU32*/
	export var C2S_Artifact_UseStone: CmdType = createCmd("C2S_Artifact_UseStone", 15, 4, true, Pb_God.PBU32);
	/** 	 重置			PBU32*/
	export var C2S_Artifact_Reset: CmdType = createCmd("C2S_Artifact_Reset", 15, 5, true, Pb_God.PBU32);
	/** 	 幻化			PBCAGArtifactShape*/
	export var C2S_Artifact_Shape: CmdType = createCmd("C2S_Artifact_Shape", 15, 6, true, Pb_God.PBCAGArtifactShape);
	/**	 觉醒(index)	PBU32*/
	export var C2S_Artifact_Awake: CmdType = createCmd("C2S_Artifact_Awake", 15, 7, true, Pb_God.PBU32);
	/**	 觉醒奖励		PBU32*/
	export var C2S_Artifact_AwakePrize: CmdType = createCmd("C2S_Artifact_AwakePrize", 15, 8, true, Pb_God.PBU32);
	/**	 解锁			PBU32*/
	export var C2S_Artifact_Unlock: CmdType = createCmd("C2S_Artifact_Unlock", 15, 9, true, Pb_God.PBU32);
	/**	 通用错误返回*/
	export var S2C_Shop_Common: CmdType = createCmd("S2C_Shop_Common", 16, 0, false);
	/**	 购买返回 			PBCAGShopBuy*/
	export var S2C_Shop_Buy: CmdType = createCmd("S2C_Shop_Buy", 16, 1, false, Pb_God.PBCAGShopBuy);
	/**	 重置返回				PBPlayerFixShop*/
	export var S2C_Shop_Reset: CmdType = createCmd("S2C_Shop_Reset", 16, 2, false, Pb_God.PBPlayerFixShop);
	/**	 刷新返回				PBPlayerRandShop*/
	export var S2C_Shop_Refresh: CmdType = createCmd("S2C_Shop_Refresh", 16, 3, false, Pb_God.PBPlayerRandShop);
	/**	 同步随机商店刷新次数	PBG2CSynRandRefreshCount*/
	export var S2C_Shop_SynRandRefreshCount: CmdType = createCmd("S2C_Shop_SynRandRefreshCount", 16, 4, false, Pb_God.PBG2CSynRandRefreshCount);
	/** 	 购买		PBCAGShopBuy*/
	export var C2S_Shop_Buy: CmdType = createCmd("C2S_Shop_Buy", 16, 1, true, Pb_God.PBCAGShopBuy);
	/** 	 重置		PBU32*/
	export var C2S_Shop_Reset: CmdType = createCmd("C2S_Shop_Reset", 16, 2, true, Pb_God.PBU32);
	/** 	 刷新		PBU32*/
	export var C2S_Shop_Refresh: CmdType = createCmd("C2S_Shop_Refresh", 16, 3, true, Pb_God.PBU32);
	/**通用返回(失败才返回)*/
	export var S2C_Train_CommonAck: CmdType = createCmd("S2C_Train_CommonAck", 17, 1, false);
	/**练塔购买次数返回(类型，次数)	PBU32U32*/
	export var S2C_Train_TowerBuyCount: CmdType = createCmd("S2C_Train_TowerBuyCount", 17, 2, false, Pb_God.PBU32U32);
	/**试练塔领奖返回 			PBU32*/
	export var S2C_Train_TowerPrize: CmdType = createCmd("S2C_Train_TowerPrize", 17, 3, false, Pb_God.PBU32);
	/**试练塔挑战次数 			PBG2CTowerFightCount*/
	export var S2C_Train_TowerFightCount: CmdType = createCmd("S2C_Train_TowerFightCount", 17, 4, false, Pb_God.PBG2CTowerFightCount);
	/**无尽试炼领奖				PBU32*/
	export var S2C_Train_EndlessPrize: CmdType = createCmd("S2C_Train_EndlessPrize", 17, 5, false, Pb_God.PBU32);
	/**无尽试炼选择buff返回		PBU32*/
	export var S2C_Train_EndlessBuff: CmdType = createCmd("S2C_Train_EndlessBuff", 17, 6, false, Pb_God.PBU32);
	/**无尽试炼通知buff组		PBU32*/
	export var S2C_Train_EndlessBuffGroup: CmdType = createCmd("S2C_Train_EndlessBuffGroup", 17, 7, false, Pb_God.PBU32);
	/**无尽试炼同步信息			PBPlayerTrainEndless*/
	export var S2C_Train_SynEndlessInfo: CmdType = createCmd("S2C_Train_SynEndlessInfo", 17, 8, false, Pb_God.PBPlayerTrainEndless);
	/**查询试练塔录像返回		PBWorldStageVideoInfo*/
	export var S2C_Train_QueryTowerVideoAck: CmdType = createCmd("S2C_Train_QueryTowerVideoAck", 17, 9, false, Pb_God.PBWorldStageVideoInfo);
	/**废弃*/
	export var S2C_Train_xxxxxxxxxxx: CmdType = createCmd("S2C_Train_xxxxxxxxxxx", 17, 10, false);
	/**废弃*/
	export var S2C_Train_xxxxxxxxxx: CmdType = createCmd("S2C_Train_xxxxxxxxxx", 17, 11, false);
	/** 废弃*/
	export var S2C_Train_xxxxxxxxx: CmdType = createCmd("S2C_Train_xxxxxxxxx", 17, 12, false);
	/** 购买buff返回			PBU32			*/
	export var S2C_Train_PeakBuyBuff: CmdType = createCmd("S2C_Train_PeakBuyBuff", 17, 13, false, Pb_God.PBU32);
	/** 购买次数返回(fight count, buy count) PBU32U32*/
	export var S2C_Train_PeakBuyCount: CmdType = createCmd("S2C_Train_PeakBuyCount", 17, 14, false, Pb_God.PBU32U32);
	/**试练塔扫荡			PBU32*/
	export var C2S_Train_TowerSweep: CmdType = createCmd("C2S_Train_TowerSweep", 17, 1, true, Pb_God.PBU32);
	/**试练塔领奖			PBU32*/
	export var C2S_Train_TowerPrize: CmdType = createCmd("C2S_Train_TowerPrize", 17, 2, true, Pb_God.PBU32);
	/**试练塔购买次数		PBU32*/
	export var C2S_Train_TowerBuyCount: CmdType = createCmd("C2S_Train_TowerBuyCount", 17, 3, true, Pb_God.PBU32);
	/**无尽试炼领奖			PBU32*/
	export var C2S_Train_EndlessPrize: CmdType = createCmd("C2S_Train_EndlessPrize", 17, 4, true, Pb_God.PBU32);
	/**废弃*/
	export var C2S_Train_xxxxxxxxxxxxxx: CmdType = createCmd("C2S_Train_xxxxxxxxxxxxxx", 17, 5, true);
	/**无尽试炼选择buff返回	PBU32*/
	export var C2S_Train_EndlessBuff: CmdType = createCmd("C2S_Train_EndlessBuff", 17, 6, true, Pb_God.PBU32);
	/**查询试练塔录像		PBU32*/
	export var C2S_Train_QueryTowerVideo: CmdType = createCmd("C2S_Train_QueryTowerVideo", 17, 7, true, Pb_God.PBU32);
	/**废弃*/
	export var C2S_Train_xxxxxxxxxxxxxxx: CmdType = createCmd("C2S_Train_xxxxxxxxxxxxxxx", 17, 8, true);
	/**购买buff(技能index)		PBU32*/
	export var C2S_Train_PeakBuyBuff: CmdType = createCmd("C2S_Train_PeakBuyBuff", 17, 9, true, Pb_God.PBU32);
	/**购买次数*/
	export var C2S_Train_PeakBuyCount: CmdType = createCmd("C2S_Train_PeakBuyCount", 17, 10, true);
	/**	 通用错误返回*/
	export var S2C_Achieve_Common: CmdType = createCmd("S2C_Achieve_Common", 18, 0, false);
	/**	 活跃完成 			PBU32*/
	export var S2C_Achieve_LivenessComplete: CmdType = createCmd("S2C_Achieve_LivenessComplete", 18, 1, false, Pb_God.PBU32);
	/**	 活跃领奖 			PBU32*/
	export var S2C_Achieve_LivenessPrize: CmdType = createCmd("S2C_Achieve_LivenessPrize", 18, 2, false, Pb_God.PBU32);
	/**	 主线完成				PBU32*/
	export var S2C_Achieve_MainComplete: CmdType = createCmd("S2C_Achieve_MainComplete", 18, 3, false, Pb_God.PBU32);
	/**	 新增主线				PBPlayerOneAchieve*/
	export var S2C_Achieve_MainAdd: CmdType = createCmd("S2C_Achieve_MainAdd", 18, 4, false, Pb_God.PBPlayerOneAchieve);
	/**	 更新成就				PBG2CAchieve_Update*/
	export var S2C_Achieve_Update: CmdType = createCmd("S2C_Achieve_Update", 18, 5, false, Pb_God.PBG2CAchieve_Update);
	/**	 历练完成				PBU32*/
	export var S2C_Achieve_TrainComplete: CmdType = createCmd("S2C_Achieve_TrainComplete", 18, 6, false, Pb_God.PBU32);
	/**	 更新日活跃			PBU32*/
	export var S2C_Achieve_SynDailyLiveness: CmdType = createCmd("S2C_Achieve_SynDailyLiveness", 18, 7, false, Pb_God.PBU32);
	/**	 活动活跃完成 		PBU32*/
	export var S2C_Achieve_ActivityLivenessComplete: CmdType = createCmd("S2C_Achieve_ActivityLivenessComplete", 18, 8, false, Pb_God.PBU32);
	/**	 活动活跃领奖 		PBU32*/
	export var S2C_Achieve_ActivityLivenessPrize: CmdType = createCmd("S2C_Achieve_ActivityLivenessPrize", 18, 9, false, Pb_God.PBU32);
	/**	 更新活动活跃			PBU32*/
	export var S2C_Achieve_SynActivityLiveness: CmdType = createCmd("S2C_Achieve_SynActivityLiveness", 18, 10, false, Pb_God.PBU32);
	/**	 周活跃完成 			PBU32*/
	export var S2C_Achieve_WeekLivenessComplete: CmdType = createCmd("S2C_Achieve_WeekLivenessComplete", 18, 11, false, Pb_God.PBU32);
	/**	 周活跃领奖 			PBU32*/
	export var S2C_Achieve_WeekLivenessPrize: CmdType = createCmd("S2C_Achieve_WeekLivenessPrize", 18, 12, false, Pb_God.PBU32);
	/**	 更新周活跃			PBU32*/
	export var S2C_Achieve_SynWeeklyLiveness: CmdType = createCmd("S2C_Achieve_SynWeeklyLiveness", 18, 13, false, Pb_God.PBU32);
	/** 	 战令完成				PBU32*/
	export var S2C_Achieve_WarOrderComplete: CmdType = createCmd("S2C_Achieve_WarOrderComplete", 18, 14, false, Pb_God.PBU32);
	/** 	 战令奖励(等级，是否进阶奖励0/1)				PBU32U32*/
	export var S2C_Achieve_WarOrderPrize: CmdType = createCmd("S2C_Achieve_WarOrderPrize", 18, 15, false, Pb_God.PBU32U32);
	/** 	 同步战令等级(level, exp) PBU32U32*/
	export var S2C_Achieve_SyncWarOrderLevel: CmdType = createCmd("S2C_Achieve_SyncWarOrderLevel", 18, 16, false, Pb_God.PBU32U32);
	/** 	 战令一键奖励			PBG2CWarOrderOneKey*/
	export var S2C_Achieve_WarOrderPrizeOneKey: CmdType = createCmd("S2C_Achieve_WarOrderPrizeOneKey", 18, 17, false, Pb_God.PBG2CWarOrderOneKey);
	/** 	 图鉴完成				PBU32*/
	export var S2C_Achieve_IllustrationComplete: CmdType = createCmd("S2C_Achieve_IllustrationComplete", 18, 18, false, Pb_God.PBU32);
	/** 	 图鉴战力完成		PBU32*/
	export var S2C_Achieve_IllustrationPowerComplete: CmdType = createCmd("S2C_Achieve_IllustrationPowerComplete", 18, 19, false, Pb_God.PBU32);
	/** 	 成就之路完成		PBU32*/
	export var S2C_Achieve_AchieveRoadComplete: CmdType = createCmd("S2C_Achieve_AchieveRoadComplete", 18, 20, false, Pb_God.PBU32);
	/** 	 活跃完成		PBU32*/
	export var C2S_Achieve_LivenessComplete: CmdType = createCmd("C2S_Achieve_LivenessComplete", 18, 1, true, Pb_God.PBU32);
	/** 	 活跃领奖		PBU32*/
	export var C2S_Achieve_LivenessPrize: CmdType = createCmd("C2S_Achieve_LivenessPrize", 18, 2, true, Pb_God.PBU32);
	/** 	 主线完成		PBU32*/
	export var C2S_Achieve_MainComplete: CmdType = createCmd("C2S_Achieve_MainComplete", 18, 3, true, Pb_God.PBU32);
	/** 	 历练完成		PBU32*/
	export var C2S_Achieve_TrainComplete: CmdType = createCmd("C2S_Achieve_TrainComplete", 18, 4, true, Pb_God.PBU32);
	/** 	 活动活跃完成	PBU32*/
	export var C2S_Achieve_ActivityLivenessComplete: CmdType = createCmd("C2S_Achieve_ActivityLivenessComplete", 18, 5, true, Pb_God.PBU32);
	/** 	 活动活跃领奖	PBU32*/
	export var C2S_Achieve_ActivityLivenessPrize: CmdType = createCmd("C2S_Achieve_ActivityLivenessPrize", 18, 6, true, Pb_God.PBU32);
	/** 	 周活跃完成	PBU32*/
	export var C2S_Achieve_WeekLivenessComplete: CmdType = createCmd("C2S_Achieve_WeekLivenessComplete", 18, 7, true, Pb_God.PBU32);
	/** 	 周活跃领奖	PBU32*/
	export var C2S_Achieve_WeekLivenessPrize: CmdType = createCmd("C2S_Achieve_WeekLivenessPrize", 18, 8, true, Pb_God.PBU32);
	/** 	 战令完成		PBU32*/
	export var C2S_Achieve_WarOrderComplete: CmdType = createCmd("C2S_Achieve_WarOrderComplete", 18, 9, true, Pb_God.PBU32);
	/** 	 战令奖励(等级，是否进阶奖励0/1)		PBU32U32*/
	export var C2S_Achieve_WarOrderPrize: CmdType = createCmd("C2S_Achieve_WarOrderPrize", 18, 10, true, Pb_God.PBU32U32);
	/** 	 战令一键奖励*/
	export var C2S_Achieve_WarOrderPrizeOneKey: CmdType = createCmd("C2S_Achieve_WarOrderPrizeOneKey", 18, 11, true);
	/** 	 图鉴完成		PBU32*/
	export var C2S_Achieve_IllustrationComplete: CmdType = createCmd("C2S_Achieve_IllustrationComplete", 18, 12, true, Pb_God.PBU32);
	/** 	 图鉴战力完成		PBU32*/
	export var C2S_Achieve_IllustrationPowerComplete: CmdType = createCmd("C2S_Achieve_IllustrationPowerComplete", 18, 13, true, Pb_God.PBU32);
	/** 	 成就之路完成		PBU32*/
	export var C2S_Achieve_AchieveRoadComplete: CmdType = createCmd("C2S_Achieve_AchieveRoadComplete", 18, 14, true, Pb_God.PBU32);
	/**通用返回(失败才返回)*/
	export var S2C_Expedition_CommonAck: CmdType = createCmd("S2C_Expedition_CommonAck", 19, 1, false);
	/**选择难度返回			PBG2CExpeditionInfo*/
	export var S2C_Expedition_SelectAck: CmdType = createCmd("S2C_Expedition_SelectAck", 19, 2, false, Pb_God.PBG2CExpeditionInfo);
	/**领取奖励返回 		PBU32*/
	export var S2C_Expedition_StagePrizeAck: CmdType = createCmd("S2C_Expedition_StagePrizeAck", 19, 3, false, Pb_God.PBU32);
	/**查询关卡信息返回 	PBExpeditionTar*/
	export var S2C_Expedition_StageInfoAck: CmdType = createCmd("S2C_Expedition_StageInfoAck", 19, 4, false, Pb_God.PBExpeditionTar);
	/**同步伙伴血量 		PBG2CExpeditionSynPetHp		*/
	export var S2C_Expedition_SynPetHp: CmdType = createCmd("S2C_Expedition_SynPetHp", 19, 5, false, Pb_God.PBG2CExpeditionSynPetHp);
	/**同步最新关卡 		PBG2CExpeditionSynCurStage		*/
	export var S2C_Expedition_SynCurStage: CmdType = createCmd("S2C_Expedition_SynCurStage", 19, 6, false, Pb_God.PBG2CExpeditionSynCurStage);
	/**废弃*/
	export var S2C_Expedition_XXXXXXXXX: CmdType = createCmd("S2C_Expedition_XXXXXXXXX", 19, 7, false);
	/**废弃*/
	export var S2C_Expedition_XXXXXX: CmdType = createCmd("S2C_Expedition_XXXXXX", 19, 8, false);
	/**选择难度			PBU32*/
	export var C2S_Expedition_Select: CmdType = createCmd("C2S_Expedition_Select", 19, 1, true, Pb_God.PBU32);
	/**领取奖励			PBU32*/
	export var C2S_Expedition_StagePrize: CmdType = createCmd("C2S_Expedition_StagePrize", 19, 2, true, Pb_God.PBU32);
	/**查询关卡信息		PBU32*/
	export var C2S_Expedition_QueryStageInfo: CmdType = createCmd("C2S_Expedition_QueryStageInfo", 19, 3, true, Pb_God.PBU32);
	/**查询伙伴血量	*/
	export var C2S_Expedition_QueryPetHp: CmdType = createCmd("C2S_Expedition_QueryPetHp", 19, 4, true);
	/**废弃*/
	export var C2S_Expedition_XXXXXXXXXX: CmdType = createCmd("C2S_Expedition_XXXXXXXXXX", 19, 5, true);
	/**通用返回(失败才返回)*/
	export var S2C_Shape_CommonAck: CmdType = createCmd("S2C_Shape_CommonAck", 20, 1, false);
	/**增加称号			PBPlayerTitle*/
	export var S2C_Shape_AddTitle: CmdType = createCmd("S2C_Shape_AddTitle", 20, 2, false, Pb_God.PBPlayerTitle);
	/**删除称号 		PBU32*/
	export var S2C_Shape_DelTitle: CmdType = createCmd("S2C_Shape_DelTitle", 20, 3, false, Pb_God.PBU32);
	/**同步省份 		PBU32U32*/
	export var S2C_Shape_SynProvince: CmdType = createCmd("S2C_Shape_SynProvince", 20, 4, false, Pb_God.PBU32U32);
	/**设置头像返回 	PBU32*/
	export var S2C_Shape_SetHeadAck: CmdType = createCmd("S2C_Shape_SetHeadAck", 20, 5, false, Pb_God.PBU32);
	/**同步所有头像 	PBG2CShapeSynAllHead*/
	export var S2C_Shape_SynAllHead: CmdType = createCmd("S2C_Shape_SynAllHead", 20, 6, false, Pb_God.PBG2CShapeSynAllHead);
	/**设置头像框返回 	PBU32*/
	export var S2C_Shape_SetHeadIconAck: CmdType = createCmd("S2C_Shape_SetHeadIconAck", 20, 7, false, Pb_God.PBU32);
	/**同步所有头像框 	PBG2CShapeSynAllHeadIcon*/
	export var S2C_Shape_SynAllHeadIcon: CmdType = createCmd("S2C_Shape_SynAllHeadIcon", 20, 8, false, Pb_God.PBG2CShapeSynAllHeadIcon);
	/**设置冒险形象返回	PBU32*/
	export var S2C_Shape_SetRiskAck: CmdType = createCmd("S2C_Shape_SetRiskAck", 20, 9, false, Pb_God.PBU32);
	/**同步所有冒险形象 PBG2CShapeSynAllRisk*/
	export var S2C_Shape_SynAllRisk: CmdType = createCmd("S2C_Shape_SynAllRisk", 20, 10, false, Pb_God.PBG2CShapeSynAllRisk);
	/**设置称号 		PBU32*/
	export var S2C_Shape_SetTitleAck: CmdType = createCmd("S2C_Shape_SetTitleAck", 20, 11, false, Pb_God.PBU32);
	/**同步所有称号 	PBG2CShapeSynAllTitle*/
	export var S2C_Shape_SynAllTitle: CmdType = createCmd("S2C_Shape_SynAllTitle", 20, 12, false, Pb_God.PBG2CShapeSynAllTitle);
	/**同步称号 		PBPlayerTitle*/
	export var S2C_Shape_SynTitle: CmdType = createCmd("S2C_Shape_SynTitle", 20, 13, false, Pb_God.PBPlayerTitle);
	/**增加头像框		PBPlayerHeadIcon*/
	export var S2C_Shape_AddHeadIcon: CmdType = createCmd("S2C_Shape_AddHeadIcon", 20, 14, false, Pb_God.PBPlayerHeadIcon);
	/**同步头像框 		PBPlayerHeadIcon*/
	export var S2C_Shape_SynHeadIcon: CmdType = createCmd("S2C_Shape_SynHeadIcon", 20, 15, false, Pb_God.PBPlayerHeadIcon);
	/**删除头像框 		PBU32*/
	export var S2C_Shape_DelTHeadIcon: CmdType = createCmd("S2C_Shape_DelTHeadIcon", 20, 16, false, Pb_God.PBU32);
	/**删除皮肤 		PBU32*/
	export var S2C_Shape_DelPetSkin: CmdType = createCmd("S2C_Shape_DelPetSkin", 20, 17, false, Pb_God.PBU32);
	/**增加徽章 		PBPlayerBadge*/
	export var S2C_Shape_AddBadge: CmdType = createCmd("S2C_Shape_AddBadge", 20, 18, false, Pb_God.PBPlayerBadge);
	/**同步荣誉值 		PBU32*/
	export var S2C_Shape_SynHonorPoint: CmdType = createCmd("S2C_Shape_SynHonorPoint", 20, 19, false, Pb_God.PBU32);
	/**徽章展示 		PBCAGBadgeDisplay*/
	export var S2C_Shape_BadgeDisplay: CmdType = createCmd("S2C_Shape_BadgeDisplay", 20, 20, false, Pb_God.PBCAGBadgeDisplay);
	/**设置省份 PBU32U32*/
	export var C2S_Shape_SetProvince: CmdType = createCmd("C2S_Shape_SetProvince", 20, 1, true, Pb_God.PBU32U32);
	/**打开头像*/
	export var C2S_Shape_OpenHead: CmdType = createCmd("C2S_Shape_OpenHead", 20, 2, true);
	/**设置头像 PBU32*/
	export var C2S_Shape_SetHead: CmdType = createCmd("C2S_Shape_SetHead", 20, 3, true, Pb_God.PBU32);
	/**打开头像框*/
	export var C2S_Shape_OpenHeadIcon: CmdType = createCmd("C2S_Shape_OpenHeadIcon", 20, 4, true);
	/**设置头像框 PBU32*/
	export var C2S_Shape_SetHeadIcon: CmdType = createCmd("C2S_Shape_SetHeadIcon", 20, 5, true, Pb_God.PBU32);
	/**打开冒险形象*/
	export var C2S_Shape_OpenRisk: CmdType = createCmd("C2S_Shape_OpenRisk", 20, 6, true);
	/**设置冒险形象 PBU32*/
	export var C2S_Shape_SetRisk: CmdType = createCmd("C2S_Shape_SetRisk", 20, 7, true, Pb_God.PBU32);
	/**打开称号*/
	export var C2S_Shape_OpenTitle: CmdType = createCmd("C2S_Shape_OpenTitle", 20, 8, true);
	/**设置称号 PBU32*/
	export var C2S_Shape_SetTitle: CmdType = createCmd("C2S_Shape_SetTitle", 20, 9, true, Pb_God.PBU32);
	/**激活称号 PBU32*/
	export var C2S_Shape_ActiveTitle: CmdType = createCmd("C2S_Shape_ActiveTitle", 20, 10, true, Pb_God.PBU32);
	/**激活头像框 PBU32*/
	export var C2S_Shape_ActiveHeadIcon: CmdType = createCmd("C2S_Shape_ActiveHeadIcon", 20, 11, true, Pb_God.PBU32);
	/**徽章展示 PBCAGBadgeDisplay*/
	export var C2S_Shape_BadgeDisplay: CmdType = createCmd("C2S_Shape_BadgeDisplay", 20, 12, true, Pb_God.PBCAGBadgeDisplay);
	/**通用返回(失败才返回)*/
	export var S2C_Temple_CommonAck: CmdType = createCmd("S2C_Temple_CommonAck", 21, 1, false);
	/**同步所有信息			PBG2CTempleSynAll*/
	export var S2C_Temple_SynAll: CmdType = createCmd("S2C_Temple_SynAll", 21, 2, false, Pb_God.PBG2CTempleSynAll);
	/**查看记录返回 		PBG2CTempleQueryRecord*/
	export var S2C_Temple_QueryRecord: CmdType = createCmd("S2C_Temple_QueryRecord", 21, 3, false, Pb_God.PBG2CTempleQueryRecord);
	/**同步数据 			PBPlayerTemple*/
	export var S2C_Temple_Syn: CmdType = createCmd("S2C_Temple_Syn", 21, 4, false, Pb_God.PBPlayerTemple);
	/**打开界面 无内容*/
	export var C2S_Temple_Open: CmdType = createCmd("C2S_Temple_Open", 21, 1, true);
	/**查看记录	PBU32*/
	export var C2S_Temple_QueryRecord: CmdType = createCmd("C2S_Temple_QueryRecord", 21, 2, true, Pb_God.PBU32);
	/**战斗*/
	export var C2S_Temple_Fight: CmdType = createCmd("C2S_Temple_Fight", 21, 10, true);
	/**	 通用失败返回*/
	export var S2C_Friend_CommonAck: CmdType = createCmd("S2C_Friend_CommonAck", 22, 0, false);
	/**	 好友申请			PBPlayerFriendInfo*/
	export var S2C_Friend_AddApply: CmdType = createCmd("S2C_Friend_AddApply", 22, 1, false, Pb_God.PBPlayerFriendInfo);
	/**	 删除申请			PBU32*/
	export var S2C_Friend_DelApply: CmdType = createCmd("S2C_Friend_DelApply", 22, 2, false, Pb_God.PBU32);
	/** 	 加好友			PBPlayerFriendInfo*/
	export var S2C_Friend_AddFriend: CmdType = createCmd("S2C_Friend_AddFriend", 22, 3, false, Pb_God.PBPlayerFriendInfo);
	/** 	 删好友			PBU32*/
	export var S2C_Friend_DelFriend: CmdType = createCmd("S2C_Friend_DelFriend", 22, 4, false, Pb_God.PBU32);
	/** 	 增加黑名单		PBPlayerFriendInfo*/
	export var S2C_Friend_AddBalck: CmdType = createCmd("S2C_Friend_AddBalck", 22, 5, false, Pb_God.PBPlayerFriendInfo);
	/** 	 移除黑名单		PBU32*/
	export var S2C_Friend_DelBalck: CmdType = createCmd("S2C_Friend_DelBalck", 22, 6, false, Pb_God.PBU32);
	/** 	 增加领取礼物		PBU32*/
	export var S2C_Friend_RecievePrize: CmdType = createCmd("S2C_Friend_RecievePrize", 22, 7, false, Pb_God.PBU32);
	/** 	 删除领取礼物		PBG2CFriendPrize*/
	export var S2C_Friend_DelRecievePrize: CmdType = createCmd("S2C_Friend_DelRecievePrize", 22, 8, false, Pb_God.PBG2CFriendPrize);
	/** 	 赠送礼物			PBG2CFriendPrize*/
	export var S2C_Friend_SendPrize: CmdType = createCmd("S2C_Friend_SendPrize", 22, 9, false, Pb_God.PBG2CFriendPrize);
	/** 	 同步好友信息		PBG2CFriendSyn*/
	export var S2C_Friend_SynFriend: CmdType = createCmd("S2C_Friend_SynFriend", 22, 10, false, Pb_God.PBG2CFriendSyn);
	/** 	 同步好友上线		PBPlayerFriendInfo*/
	export var S2C_Friend_Online: CmdType = createCmd("S2C_Friend_Online", 22, 11, false, Pb_God.PBPlayerFriendInfo);
	/** 	 同步好友下线		PBPlayerFriendInfo*/
	export var S2C_Friend_Offline: CmdType = createCmd("S2C_Friend_Offline", 22, 12, false, Pb_God.PBPlayerFriendInfo);
	/** 	 推荐好友			PBG2CFriendRefresh*/
	export var S2C_Friend_Refresh: CmdType = createCmd("S2C_Friend_Refresh", 22, 13, false, Pb_God.PBG2CFriendRefresh);
	/** 	 同步支援信息		PBW2GFriendSupportSync*/
	export var S2C_Friend_SyncSupport: CmdType = createCmd("S2C_Friend_SyncSupport", 22, 14, false, Pb_God.PBW2GFriendSupportSync);
	/**	 派遣支援返回		PBPlayerSendSupportHero*/
	export var S2C_Friend_SendSupport: CmdType = createCmd("S2C_Friend_SendSupport", 22, 15, false, Pb_God.PBPlayerSendSupportHero);
	/**	 搜索返回			PBG2CFriendRefresh*/
	export var S2C_Friend_Search: CmdType = createCmd("S2C_Friend_Search", 22, 16, false, Pb_God.PBG2CFriendRefresh);
	/**	 雇佣支援返回		PBFriendHireSupport*/
	export var S2C_Friend_HireSupport: CmdType = createCmd("S2C_Friend_HireSupport", 22, 17, false, Pb_God.PBFriendHireSupport);
	/**	 解雇支援返回		PBFriendHireSupport*/
	export var S2C_Friend_FireSupport: CmdType = createCmd("S2C_Friend_FireSupport", 22, 18, false, Pb_God.PBFriendHireSupport);
	/**	 同步已使用支援	PBG2CFriendUsedSupportSync*/
	export var S2C_Friend_SyncUsedSupport: CmdType = createCmd("S2C_Friend_SyncUsedSupport", 22, 19, false, Pb_God.PBG2CFriendUsedSupportSync);
	/** 	 请求加好友		PBU32*/
	export var C2S_Friend_RequestAddFriend: CmdType = createCmd("C2S_Friend_RequestAddFriend", 22, 1, true, Pb_God.PBU32);
	/** 	 同意加好友		PBU32*/
	export var C2S_Friend_AgreeAddFriend: CmdType = createCmd("C2S_Friend_AgreeAddFriend", 22, 2, true, Pb_God.PBU32);
	/** 	 删除好友			PBU32*/
	export var C2S_Friend_DelFriend: CmdType = createCmd("C2S_Friend_DelFriend", 22, 3, true, Pb_God.PBU32);
	/** 	 移除申请			PBU32*/
	export var C2S_Friend_DelApply: CmdType = createCmd("C2S_Friend_DelApply", 22, 4, true, Pb_God.PBU32);
	/** 	 增加黑名单		PBU32*/
	export var C2S_Friend_AddBlack: CmdType = createCmd("C2S_Friend_AddBlack", 22, 5, true, Pb_God.PBU32);
	/** 	 移除黑名单		PBU32*/
	export var C2S_Friend_DelBlack: CmdType = createCmd("C2S_Friend_DelBlack", 22, 6, true, Pb_God.PBU32);
	/** 	 赠送礼物			PBU32*/
	export var C2S_Friend_SendPrize: CmdType = createCmd("C2S_Friend_SendPrize", 22, 7, true, Pb_God.PBU32);
	/** 	 一键赠送礼物	*/
	export var C2S_Friend_AutoSendPrize: CmdType = createCmd("C2S_Friend_AutoSendPrize", 22, 8, true);
	/** 	 领取礼物			PBU32*/
	export var C2S_Friend_RecievePrize: CmdType = createCmd("C2S_Friend_RecievePrize", 22, 9, true, Pb_God.PBU32);
	/** 	 一键领取礼物	*/
	export var C2S_Friend_AutoRecievePrize: CmdType = createCmd("C2S_Friend_AutoRecievePrize", 22, 10, true);
	/** 	 刷新推荐好友		*/
	export var C2S_Friend_Refresh: CmdType = createCmd("C2S_Friend_Refresh", 22, 11, true);
	/**  派遣支援银熊	PBPlayerSendSupportHero*/
	export var C2S_Friend_SendSupport: CmdType = createCmd("C2S_Friend_SendSupport", 22, 12, true, Pb_God.PBPlayerSendSupportHero);
	/**	 根据名字搜索		PBString*/
	export var C2S_Friend_Search: CmdType = createCmd("C2S_Friend_Search", 22, 13, true, Pb_God.PBString);
	/**	 雇佣支援 		PBFriendHireSupport*/
	export var C2S_Friend_HireSupport: CmdType = createCmd("C2S_Friend_HireSupport", 22, 14, true, Pb_God.PBFriendHireSupport);
	/**	 解雇支援			PBFriendHireSupport*/
	export var C2S_Friend_FireSupport: CmdType = createCmd("C2S_Friend_FireSupport", 22, 15, true, Pb_God.PBFriendHireSupport);
	/** 	 同步好友信息		PBG2WFriendIDSyn*/
	export var C2S_Friend_SynFriend: CmdType = createCmd("C2S_Friend_SynFriend", 22, 20, true, Pb_God.PBG2WFriendIDSyn);
	/** 	 真正添加黑名单	PBU32*/
	export var C2S_Friend_RealAddBlack: CmdType = createCmd("C2S_Friend_RealAddBlack", 22, 21, true, Pb_God.PBU32);
	/**	 同步支援信息	*/
	export var C2S_Friend_SyncSupport: CmdType = createCmd("C2S_Friend_SyncSupport", 22, 22, true);
	/**	 支援被使用*/
	export var C2S_Friend_UseSupport: CmdType = createCmd("C2S_Friend_UseSupport", 22, 23, true);
	/**   支援使用回退*/
	export var C2S_Friend_UnuseSupport: CmdType = createCmd("C2S_Friend_UnuseSupport", 22, 24, true);
	/**通用返回(失败才返回)*/
	export var S2C_Element_CommonAck: CmdType = createCmd("S2C_Element_CommonAck", 23, 1, false);
	/**更新次数				PBG2CElementUpdateCount*/
	export var S2C_Element_UpdateCount: CmdType = createCmd("S2C_Element_UpdateCount", 23, 2, false, Pb_God.PBG2CElementUpdateCount);
	/**更新关卡				PBPlayerElementInfo*/
	export var S2C_Element_UpdateStage: CmdType = createCmd("S2C_Element_UpdateStage", 23, 3, false, Pb_God.PBPlayerElementInfo);
	/**扫荡			PBU32*/
	export var C2S_Element_Sweep: CmdType = createCmd("C2S_Element_Sweep", 23, 1, true, Pb_God.PBU32);
	/**购买次数*/
	export var C2S_Element_BuyCount: CmdType = createCmd("C2S_Element_BuyCount", 23, 2, true);
	/**通用返回(失败才返回)*/
	export var S2C_Risk_CommonAck: CmdType = createCmd("S2C_Risk_CommonAck", 24, 1, false);
	/**同步所有信息 	PBG2CSynAll*/
	export var S2C_Risk_SynAll: CmdType = createCmd("S2C_Risk_SynAll", 24, 2, false, Pb_God.PBG2CSynAll);
	/**新增格子信息 	PBG2CRiskSynGrid*/
	export var S2C_Risk_AddGrid: CmdType = createCmd("S2C_Risk_AddGrid", 24, 3, false, Pb_God.PBG2CRiskSynGrid);
	/**拾取格子返回		PBPlayerRiskGrid*/
	export var S2C_Risk_CollectGrid: CmdType = createCmd("S2C_Risk_CollectGrid", 24, 4, false, Pb_God.PBPlayerRiskGrid);
	/**进入下一层		PBG2CRiskEnterNextStage*/
	export var S2C_Risk_EnterNextStage: CmdType = createCmd("S2C_Risk_EnterNextStage", 24, 5, false, Pb_God.PBG2CRiskEnterNextStage);
	/**领取守卫奖励		PBU32*/
	export var S2C_Risk_GuardPrize: CmdType = createCmd("S2C_Risk_GuardPrize", 24, 6, false, Pb_God.PBU32);
	/**同步伙伴血量 	PBPetHp*/
	export var S2C_Risk_SynPetHp: CmdType = createCmd("S2C_Risk_SynPetHp", 24, 7, false, Pb_God.PBPetHp);
	/**同步守卫血量 	PBU32U64*/
	export var S2C_Risk_SynGuardHp: CmdType = createCmd("S2C_Risk_SynGuardHp", 24, 8, false, Pb_God.PBU32U64);
	/**同步生命药剂 		PBG2CRiskSynHpDrug*/
	export var S2C_Risk_SynHpDrug: CmdType = createCmd("S2C_Risk_SynHpDrug", 24, 9, false, Pb_God.PBG2CRiskSynHpDrug);
	/**同步驱魂药剂 	PBG2CRiskSynKillDrug*/
	export var S2C_Risk_SynKillDrug: CmdType = createCmd("S2C_Risk_SynKillDrug", 24, 10, false, Pb_God.PBG2CRiskSynKillDrug);
	/**同步击杀守卫个数 PBU32*/
	export var S2C_Risk_SynKillGuard: CmdType = createCmd("S2C_Risk_SynKillGuard", 24, 11, false, Pb_God.PBU32);
	/**同步召唤商人数量 PBU32*/
	export var S2C_Risk_SynTrader: CmdType = createCmd("S2C_Risk_SynTrader", 24, 12, false, Pb_God.PBU32);
	/**使用召唤商人 	PBG2CRiskUseTrader	*/
	export var S2C_Risk_UseTrader: CmdType = createCmd("S2C_Risk_UseTrader", 24, 13, false, Pb_God.PBG2CRiskUseTrader);
	/**答题返回			PBG2CRiskQuestionAck*/
	export var S2C_Risk_QuestionAck: CmdType = createCmd("S2C_Risk_QuestionAck", 24, 14, false, Pb_God.PBG2CRiskQuestionAck);
	/**打开商店			PBG2CRiskShopOpenAck*/
	export var S2C_Risk_ShopOpenAck: CmdType = createCmd("S2C_Risk_ShopOpenAck", 24, 15, false, Pb_God.PBG2CRiskShopOpenAck);
	/**商店购买(位置1开始)	PBU32*/
	export var S2C_Risk_ShopBuyAck: CmdType = createCmd("S2C_Risk_ShopBuyAck", 24, 16, false, Pb_God.PBU32);
	/**同步被动技能 	PBG2CRiskCollectSkill*/
	export var S2C_Risk_SynCollectSkill: CmdType = createCmd("S2C_Risk_SynCollectSkill", 24, 17, false, Pb_God.PBG2CRiskCollectSkill);
	/**选择英雄				PBC2GRiskSelectPet	*/
	export var C2S_Risk_SelectPet: CmdType = createCmd("C2S_Risk_SelectPet", 24, 1, true, Pb_God.PBC2GRiskSelectPet);
	/**打开界面*/
	export var C2S_Risk_Open: CmdType = createCmd("C2S_Risk_Open", 24, 2, true);
	/**开启格子				PBU32*/
	export var C2S_Risk_OpenGrid: CmdType = createCmd("C2S_Risk_OpenGrid", 24, 3, true, Pb_God.PBU32);
	/**拾取格子				PBC2GRiskCoolectGridAsk*/
	export var C2S_Risk_CollectGrid: CmdType = createCmd("C2S_Risk_CollectGrid", 24, 4, true, Pb_God.PBC2GRiskCoolectGridAsk);
	/**自动拾取(守卫索引)	PBU32*/
	export var C2S_Risk_AutoCollectGrid: CmdType = createCmd("C2S_Risk_AutoCollectGrid", 24, 5, true, Pb_God.PBU32);
	/**进入下一层*/
	export var C2S_Risk_EnterNextStage: CmdType = createCmd("C2S_Risk_EnterNextStage", 24, 6, true);
	/**领取守卫奖励*/
	export var C2S_Risk_GuardPrize: CmdType = createCmd("C2S_Risk_GuardPrize", 24, 7, true);
	/**使用生命药剂			PBU64*/
	export var C2S_Risk_UseHpDrug: CmdType = createCmd("C2S_Risk_UseHpDrug", 24, 8, true, Pb_God.PBU64);
	/**使用驱魂药剂			PBU32*/
	export var C2S_Risk_UseKillDrug: CmdType = createCmd("C2S_Risk_UseKillDrug", 24, 9, true, Pb_God.PBU32);
	/**使用召唤商人*/
	export var C2S_Risk_UseTrader: CmdType = createCmd("C2S_Risk_UseTrader", 24, 10, true);
	/**答题					PBC2GRiskQuestionAsk*/
	export var C2S_Risk_Question: CmdType = createCmd("C2S_Risk_Question", 24, 11, true, Pb_God.PBC2GRiskQuestionAsk);
	/**打开商店*/
	export var C2S_Risk_ShopOpen: CmdType = createCmd("C2S_Risk_ShopOpen", 24, 12, true);
	/**商店购买(索引)		PBU32*/
	export var C2S_Risk_ShopBuy: CmdType = createCmd("C2S_Risk_ShopBuy", 24, 13, true, Pb_God.PBU32);
	/**查询被动技能*/
	export var C2S_Risk_OpenSkill: CmdType = createCmd("C2S_Risk_OpenSkill", 24, 14, true);
	/**	 通用错误返回*/
	export var S2C_Dan_Common: CmdType = createCmd("S2C_Dan_Common", 25, 0, false);
	/**	 同步主界面数据 	PBG2CDan_SynInfo	*/
	export var S2C_Dan_SynInfo: CmdType = createCmd("S2C_Dan_SynInfo", 25, 1, false, Pb_God.PBG2CDan_SynInfo);
	/**	 领取奖励返回 	PBU32*/
	export var S2C_Dan_AwardAck: CmdType = createCmd("S2C_Dan_AwardAck", 25, 2, false, Pb_God.PBU32);
	/** 	 购买次数返回		PBU32*/
	export var S2C_Dan_BuyCountAck: CmdType = createCmd("S2C_Dan_BuyCountAck", 25, 3, false, Pb_God.PBU32);
	/** 	 总战绩查询返回	PBPlayerDanResult*/
	export var S2C_Dan_TotalResultAck: CmdType = createCmd("S2C_Dan_TotalResultAck", 25, 4, false, Pb_God.PBPlayerDanResult);
	/** 	 赛季战绩返回		PBPlayerDanResult*/
	export var S2C_Dan_SeasonResultAck: CmdType = createCmd("S2C_Dan_SeasonResultAck", 25, 5, false, Pb_God.PBPlayerDanResult);
	/** 	 赛季所有赛区查询	PBG2CDanSeasonAllAreaAck*/
	export var S2C_Dan_SeasonAllAreaAck: CmdType = createCmd("S2C_Dan_SeasonAllAreaAck", 25, 6, false, Pb_God.PBG2CDanSeasonAllAreaAck);
	/** 	 赛区信息查询		PBDanKingRecord*/
	export var S2C_Dan_SeasonAreaInfoAck: CmdType = createCmd("S2C_Dan_SeasonAreaInfoAck", 25, 7, false, Pb_God.PBDanKingRecord);
	/**	 挑战结果返回		PBG2CDanFightResultAck	*/
	export var S2C_Dan_FightResultAck: CmdType = createCmd("S2C_Dan_FightResultAck", 25, 8, false, Pb_God.PBG2CDanFightResultAck);
	/**	 搜索对手返回		PBG2CDanSearch*/
	export var S2C_Dan_Search: CmdType = createCmd("S2C_Dan_Search", 25, 9, false, Pb_God.PBG2CDanSearch);
	/**	 查询我的记录返回 PBG2CDanRecords*/
	export var S2C_Dan_Record: CmdType = createCmd("S2C_Dan_Record", 25, 10, false, Pb_God.PBG2CDanRecords);
	/**	 查询大神记录返回 PBG2CDanRecords*/
	export var S2C_Dan_MasterRecord: CmdType = createCmd("S2C_Dan_MasterRecord", 25, 11, false, Pb_God.PBG2CDanRecords);
	/**	挑战请求返回		PBFightBase	*/
	export var S2C_Dan_FightBeginAck: CmdType = createCmd("S2C_Dan_FightBeginAck", 25, 50, false, Pb_God.PBFightBase);
	/** 	 打开界面*/
	export var C2S_Dan_OpenAsk: CmdType = createCmd("C2S_Dan_OpenAsk", 25, 1, true);
	/** 	 领取奖励		PBU32*/
	export var C2S_Dan_AwardAsk: CmdType = createCmd("C2S_Dan_AwardAsk", 25, 2, true, Pb_God.PBU32);
	/** 	 购买次数返回 PBU32*/
	export var C2S_Dan_BuyCountAsk: CmdType = createCmd("C2S_Dan_BuyCountAsk", 25, 3, true, Pb_God.PBU32);
	/** 	 总战绩查询*/
	export var C2S_Dan_TotalResultAsk: CmdType = createCmd("C2S_Dan_TotalResultAsk", 25, 4, true);
	/** 	 赛季战绩查询	PBU32*/
	export var C2S_Dan_SeasonResultAsk: CmdType = createCmd("C2S_Dan_SeasonResultAsk", 25, 5, true, Pb_God.PBU32);
	/** 	 赛季所有赛区查询	PBC2GDanSeasonAllAreaAsk*/
	export var C2S_Dan_SeasonAllAreaAsk: CmdType = createCmd("C2S_Dan_SeasonAllAreaAsk", 25, 6, true, Pb_God.PBC2GDanSeasonAllAreaAsk);
	/** 	 赛区信息查询	PBC2GDanSeasonAreaInfoAsk*/
	export var C2S_Dan_SeasonAreaInfoAsk: CmdType = createCmd("C2S_Dan_SeasonAreaInfoAsk", 25, 7, true, Pb_God.PBC2GDanSeasonAreaInfoAsk);
	/** 	 搜索对手*/
	export var C2S_Dan_Search: CmdType = createCmd("C2S_Dan_Search", 25, 8, true);
	/**	 查询我的记录*/
	export var C2S_Dan_Record: CmdType = createCmd("C2S_Dan_Record", 25, 9, true);
	/**	 查询大神记录*/
	export var C2S_Dan_MasterRecord: CmdType = createCmd("C2S_Dan_MasterRecord", 25, 10, true);
	/** 	 赛区查询	PBU32U32*/
	export var G2BW_Dan_SynMember: CmdType = createCmd("G2BW_Dan_SynMember", 25, 50, true, Pb_God.PBU32U32);
	/**	 挑战请求				PBFightBase*/
	export var G2BW_Dan_FightBegin: CmdType = createCmd("G2BW_Dan_FightBegin", 25, 51, true, Pb_God.PBFightBase);
	/**	 挑战完成				PBG2BWDanFightResultAck*/
	export var G2BW_Dan_FightResult: CmdType = createCmd("G2BW_Dan_FightResult", 25, 52, true, Pb_God.PBG2BWDanFightResultAck);
	/**	 添加记录*/
	export var G2BW_Dan_AddRecord: CmdType = createCmd("G2BW_Dan_AddRecord", 25, 53, true);
	/**失败才返回*/
	export var S2C_Ladder_CommonAck: CmdType = createCmd("S2C_Ladder_CommonAck", 26, 0, false);
	/**同步信息			PBG2CLadderSynInfo	*/
	export var S2C_Ladder_SynInfo: CmdType = createCmd("S2C_Ladder_SynInfo", 26, 1, false, Pb_God.PBG2CLadderSynInfo);
	/**刷新对手返回		PBG2CLadderRefreshAck*/
	export var S2C_Ladder_RefreshAck: CmdType = createCmd("S2C_Ladder_RefreshAck", 26, 2, false, Pb_God.PBG2CLadderRefreshAck);
	/**购买次数返回		PBU32*/
	export var S2C_Ladder_BuyCountAck: CmdType = createCmd("S2C_Ladder_BuyCountAck", 26, 3, false, Pb_God.PBU32);
	/**同步挑战从数		PBU32*/
	export var S2C_Ladder_SynFightCount: CmdType = createCmd("S2C_Ladder_SynFightCount", 26, 4, false, Pb_God.PBU32);
	/**战斗结果			PBG2CLadderResult*/
	export var S2C_Ladder_FightResult: CmdType = createCmd("S2C_Ladder_FightResult", 26, 5, false, Pb_God.PBG2CLadderResult);
	/**英雄殿返回		PBG2CLadderHeroTopAck*/
	export var S2C_Ladder_HeroTopAck: CmdType = createCmd("S2C_Ladder_HeroTopAck", 26, 6, false, Pb_God.PBG2CLadderHeroTopAck);
	/**查询我的记录返回	PBG2CLadderRecordAck*/
	export var S2C_Ladder_RecordAck: CmdType = createCmd("S2C_Ladder_RecordAck", 26, 7, false, Pb_God.PBG2CLadderRecordAck);
	/**查询大神记录返回	PBLadderPublicAllRecord*/
	export var S2C_Ladder_PublicRecordAck: CmdType = createCmd("S2C_Ladder_PublicRecordAck", 26, 8, false, Pb_God.PBLadderPublicAllRecord);
	/**同步次数			PBU32*/
	export var S2C_Ladder_SynCountAck: CmdType = createCmd("S2C_Ladder_SynCountAck", 26, 9, false, Pb_God.PBU32);
	/**点赞英雄殿返回	PBG2CLike*/
	export var S2C_Ladder_HeroTopLikeACK: CmdType = createCmd("S2C_Ladder_HeroTopLikeACK", 26, 10, false, Pb_God.PBG2CLike);
	/**查询玩家数据返回  PBLadderPlayerInfo*/
	export var S2C_Ladder_QueryPlayerInfo: CmdType = createCmd("S2C_Ladder_QueryPlayerInfo", 26, 11, false, Pb_God.PBLadderPlayerInfo);
	/**战斗开始	PBFightBase*/
	export var BW2G_Ladder_FightBeginAck: CmdType = createCmd("BW2G_Ladder_FightBeginAck", 26, 51, false, Pb_God.PBFightBase);
	/**同步刷新对手	PBBW2GSynRefreshRank*/
	export var BW2G_Ladder_SynRefreshRank: CmdType = createCmd("BW2G_Ladder_SynRefreshRank", 26, 52, false, Pb_God.PBBW2GSynRefreshRank);
	/**点赞英雄殿返回	PBG2CLike*/
	export var BW2G_Ladder_Like: CmdType = createCmd("BW2G_Ladder_Like", 26, 53, false, Pb_God.PBG2CLike);
	/**检查竞技场排名返回*/
	export var W2G_Ladder_CheckRank: CmdType = createCmd("W2G_Ladder_CheckRank", 26, 54, false);
	/**打开			PBG2BWOpenAsk*/
	export var C2S_Ladder_Open: CmdType = createCmd("C2S_Ladder_Open", 26, 1, true, Pb_God.PBG2BWOpenAsk);
	/**刷新对手 	PBPlayerQuery*/
	export var C2S_Ladder_Refresh: CmdType = createCmd("C2S_Ladder_Refresh", 26, 2, true, Pb_God.PBPlayerQuery);
	/**购买次数		PBU32*/
	export var C2S_Ladder_BuyCount: CmdType = createCmd("C2S_Ladder_BuyCount", 26, 3, true, Pb_God.PBU32);
	/**一键挑战*/
	export var C2S_Ladder_FightOneKey: CmdType = createCmd("C2S_Ladder_FightOneKey", 26, 4, true);
	/**英雄殿*/
	export var C2S_Ladder_HeroTop: CmdType = createCmd("C2S_Ladder_HeroTop", 26, 5, true);
	/**点赞英雄殿	PBC2GLike*/
	export var C2S_Ladder_HeroTopLike: CmdType = createCmd("C2S_Ladder_HeroTopLike", 26, 6, true, Pb_God.PBC2GLike);
	/**查询我的记录*/
	export var C2S_Ladder_QueryRecord: CmdType = createCmd("C2S_Ladder_QueryRecord", 26, 7, true);
	/**查询大神记录	PBPlayerQuery*/
	export var C2S_Ladder_QueryPublicRecord: CmdType = createCmd("C2S_Ladder_QueryPublicRecord", 26, 8, true, Pb_God.PBPlayerQuery);
	/**查询玩家数据 PBLadderQueryPlayerInfo*/
	export var C2S_Ladder_QueryPlayerInfo: CmdType = createCmd("C2S_Ladder_QueryPlayerInfo", 26, 9, true, Pb_God.PBLadderQueryPlayerInfo);
	/**战斗开始	PBFightBase*/
	export var G2BW_Ladder_FightBegin: CmdType = createCmd("G2BW_Ladder_FightBegin", 26, 50, true, Pb_God.PBFightBase);
	/**战斗结束	PBFightResult*/
	export var G2BW_Ladder_FightResult: CmdType = createCmd("G2BW_Ladder_FightResult", 26, 51, true, Pb_God.PBFightResult);
	/**点赞英雄殿	PBG2BWLike*/
	export var G2BW_Ladder_Like: CmdType = createCmd("G2BW_Ladder_Like", 26, 52, true, Pb_God.PBG2BWLike);
	/**英雄殿	PBPlayerQuery*/
	export var G2BW_Ladder_QueryHeroTop: CmdType = createCmd("G2BW_Ladder_QueryHeroTop", 26, 53, true, Pb_God.PBPlayerQuery);
	/**更新防守阵容*/
	export var G2BW_Ladder_UpdateDefense: CmdType = createCmd("G2BW_Ladder_UpdateDefense", 26, 54, true);
	/**失败才返回*/
	export var S2C_Champion_Common_Ack: CmdType = createCmd("S2C_Champion_Common_Ack", 27, 0, false);
	/**我的竞猜返回		PBG2CChampionSelfGuessAck*/
	export var S2C_Champion_SelfGuessAck: CmdType = createCmd("S2C_Champion_SelfGuessAck", 27, 1, false, Pb_God.PBG2CChampionSelfGuessAck);
	/**查询竞猜返回		PBG2CChampionQueryGuessAck*/
	export var S2C_Champion_QueryGuessAck: CmdType = createCmd("S2C_Champion_QueryGuessAck", 27, 2, false, Pb_God.PBG2CChampionQueryGuessAck);
	/**竞猜下注同步返回	PBG2CChampionSynGuessAck*/
	export var S2C_Champion_SysGuessAck: CmdType = createCmd("S2C_Champion_SysGuessAck", 27, 3, false, Pb_God.PBG2CChampionSynGuessAck);
	/**查询32强返回		PBG2CChampionQuery32ListAck*/
	export var S2C_Champion_Query32ListAck: CmdType = createCmd("S2C_Champion_Query32ListAck", 27, 4, false, Pb_God.PBG2CChampionQuery32ListAck);
	/**查询4强返回		PBG2CChampionQuery4ListAck*/
	export var S2C_Champion_Query4ListAck: CmdType = createCmd("S2C_Champion_Query4ListAck", 27, 5, false, Pb_God.PBG2CChampionQuery4ListAck);
	/**我的竞猜记录		PBChampionGuessRecord*/
	export var S2C_Champion_GuessRecordAck: CmdType = createCmd("S2C_Champion_GuessRecordAck", 27, 6, false, Pb_God.PBChampionGuessRecord);
	/**我的战斗记录		PBChampionFightRecord*/
	export var S2C_Champion_FightRecordAck: CmdType = createCmd("S2C_Champion_FightRecordAck", 27, 7, false, Pb_God.PBChampionFightRecord);
	/**发送弹幕返回		无内容*/
	export var S2C_Champion_SendDanmuAck: CmdType = createCmd("S2C_Champion_SendDanmuAck", 27, 8, false);
	/**竞猜结果			PBG2CChampionGuessResultAck*/
	export var S2C_Champion_GuessReusltAck: CmdType = createCmd("S2C_Champion_GuessReusltAck", 27, 9, false, Pb_God.PBG2CChampionGuessResultAck);
	/**查询弹幕返回		PBG2CChampionQueryDanmuAck*/
	export var S2C_Champion_QueryDanmuAck: CmdType = createCmd("S2C_Champion_QueryDanmuAck", 27, 10, false, Pb_God.PBG2CChampionQueryDanmuAck);
	/**打开返回			PBG2CChampionOpenAck*/
	export var S2C_Champion_OpenAck: CmdType = createCmd("S2C_Champion_OpenAck", 27, 11, false, Pb_God.PBG2CChampionOpenAck);
	/**我的结算结果		PBG2CChampionEndResultAck*/
	export var S2C_Champion_EndResultAck: CmdType = createCmd("S2C_Champion_EndResultAck", 27, 12, false, Pb_God.PBG2CChampionEndResultAck);
	/**查看对战信息		PBChampionBattle*/
	export var S2C_Champion_QueryBattleInfo: CmdType = createCmd("S2C_Champion_QueryBattleInfo", 27, 13, false, Pb_God.PBChampionBattle);
	/**同步状态			PBG2CChampionSynState*/
	export var S2C_Champion_SynState: CmdType = createCmd("S2C_Champion_SynState", 27, 14, false, Pb_God.PBG2CChampionSynState);
	/**同步排行结果		PBG2CChampionSynTopResult*/
	export var S2C_Champion_SynTopResult: CmdType = createCmd("S2C_Champion_SynTopResult", 27, 15, false, Pb_God.PBG2CChampionSynTopResult);
	/**查询对应回合数据	PBG2CChampionQueryRoundAck*/
	export var S2C_Champion_QueryRoundAck: CmdType = createCmd("S2C_Champion_QueryRoundAck", 27, 16, false, Pb_God.PBG2CChampionQueryRoundAck);
	/**点赞返回			PBU32U32*/
	export var S2C_Champion_Like: CmdType = createCmd("S2C_Champion_Like", 27, 17, false, Pb_God.PBU32U32);
	/**我的竞猜 	无内容*/
	export var C2S_Champion_SelfGuessAsk: CmdType = createCmd("C2S_Champion_SelfGuessAsk", 27, 1, true);
	/**查询竞猜		无内容*/
	export var C2S_Champion_QueryGuessAsk: CmdType = createCmd("C2S_Champion_QueryGuessAsk", 27, 2, true);
	/**竞猜下注		PBC2GChampionGuessAsk*/
	export var C2S_Champion_GuessAsk: CmdType = createCmd("C2S_Champion_GuessAsk", 27, 3, true, Pb_God.PBC2GChampionGuessAsk);
	/**查询32强		PBU32*/
	export var C2S_Champion_Query32List: CmdType = createCmd("C2S_Champion_Query32List", 27, 4, true, Pb_God.PBU32);
	/**查询4强	*/
	export var C2S_Champion_Query4List: CmdType = createCmd("C2S_Champion_Query4List", 27, 5, true);
	/**我的竞猜记录		*/
	export var C2S_Champion_GuessRecordAsk: CmdType = createCmd("C2S_Champion_GuessRecordAsk", 27, 6, true);
	/**我的战斗记录	*/
	export var C2S_Champion_FightRecordAsk: CmdType = createCmd("C2S_Champion_FightRecordAsk", 27, 7, true);
	/**发送弹幕		PBC2GChampionSendDanmuAsk*/
	export var C2S_Champion_SendDanmuAsk: CmdType = createCmd("C2S_Champion_SendDanmuAsk", 27, 8, true, Pb_God.PBC2GChampionSendDanmuAsk);
	/**请求查询弹幕 PBC2GChampionQueryDanmu	*/
	export var C2S_Champion_QueryDanmuAsk: CmdType = createCmd("C2S_Champion_QueryDanmuAsk", 27, 9, true, Pb_God.PBC2GChampionQueryDanmu);
	/**查询下注信息	*/
	export var C2S_Champion_QueryOddsAsk: CmdType = createCmd("C2S_Champion_QueryOddsAsk", 27, 10, true);
	/**打开	*/
	export var C2S_Champion_OpenAsk: CmdType = createCmd("C2S_Champion_OpenAsk", 27, 11, true);
	/**查看对战信息	PBC2GChampionQueryBattleInfo	*/
	export var C2S_Champion_QueryBattleInfo: CmdType = createCmd("C2S_Champion_QueryBattleInfo", 27, 12, true, Pb_God.PBC2GChampionQueryBattleInfo);
	/**查询对应回合数据		PBC2GChampionQueryRound*/
	export var C2S_Champion_QueryRound: CmdType = createCmd("C2S_Champion_QueryRound", 27, 13, true, Pb_God.PBC2GChampionQueryRound);
	/**点赞		PBC2GChampionLike*/
	export var C2S_Champion_Like: CmdType = createCmd("C2S_Champion_Like", 27, 14, true, Pb_God.PBC2GChampionLike);
	/**gm开启活动		PBC2GChampionGM*/
	export var C2S_Champion_GmOpt: CmdType = createCmd("C2S_Champion_GmOpt", 27, 30, true, Pb_God.PBC2GChampionGM);
	/**战斗结果返回		*/
	export var C2S_Champion_FightResult: CmdType = createCmd("C2S_Champion_FightResult", 27, 31, true);
	/**	 GM测试			PBBroadcasStringU32	*/
	export var S2C_BroadCast_GM: CmdType = createCmd("S2C_BroadCast_GM", 28, 1, false, Pb_God.PBBroadcasStringU32);
	/**	 更新vip等级		PBBroadcasStringU32*/
	export var S2C_BroadCast_VipLevelUp: CmdType = createCmd("S2C_BroadCast_VipLevelUp", 28, 2, false, Pb_God.PBBroadcasStringU32);
	/**	 公会招募			PBBroadcasFactionRecruit*/
	export var S2C_BroadCast_FactionRecruit: CmdType = createCmd("S2C_BroadCast_FactionRecruit", 28, 3, false, Pb_God.PBBroadcasFactionRecruit);
	/**	 公会副本集结		PBBroadcasFactionCopymapNotice*/
	export var S2C_BroadCast_FactionCopymapNotice: CmdType = createCmd("S2C_BroadCast_FactionCopymapNotice", 28, 4, false, Pb_God.PBBroadcasFactionCopymapNotice);
	/**	 竞技场x连胜(名字，多少场)		PBBroadcasStringU32	*/
	export var S2C_BroadCast_Challenge: CmdType = createCmd("S2C_BroadCast_Challenge", 28, 5, false, Pb_God.PBBroadcasStringU32);
	/**	 冠军赛提醒(开始时间)		PBU32*/
	export var S2C_BroadCast_Champion: CmdType = createCmd("S2C_BroadCast_Champion", 28, 6, false, Pb_God.PBU32);
	/**	 跨服竞技场x连胜(名字，多少场)	PBBroadcasStringU32*/
	export var S2C_BroadCast_CrossChallenge: CmdType = createCmd("S2C_BroadCast_CrossChallenge", 28, 7, false, Pb_God.PBBroadcasStringU32);
	/**	 段位赛x连胜(名字，多少场)	PBBroadcasStringU32*/
	export var S2C_BroadCast_Dan: CmdType = createCmd("S2C_BroadCast_Dan", 28, 8, false, Pb_God.PBBroadcasStringU32);
	/**	 探宝获得x品质以上道具	PBBroadcastTreasure*/
	export var S2C_BroadCast_Treasure: CmdType = createCmd("S2C_BroadCast_Treasure", 28, 9, false, Pb_God.PBBroadcastTreasure);
	/**	 合成6星英雄（名字,pet id）	PBBroadcastHeroStar*/
	export var S2C_BroadCast_Hero6Star: CmdType = createCmd("S2C_BroadCast_Hero6Star", 28, 10, false, Pb_God.PBBroadcastHeroStar);
	/**	 9星以上英雄升星		PBBroadcastHeroStar*/
	export var S2C_BroadCast_Hero9Star: CmdType = createCmd("S2C_BroadCast_Hero9Star", 28, 11, false, Pb_God.PBBroadcastHeroStar);
	/**	 建立工会		PBBroadcasFactionCreate*/
	export var S2C_BroadCast_Faction: CmdType = createCmd("S2C_BroadCast_Faction", 28, 12, false, Pb_God.PBBroadcasFactionCreate);
	/**	 激活月卡	(玩家名字，月卡类型)	PBBroadcasStringU32*/
	export var S2C_BroadCast_MonthCard: CmdType = createCmd("S2C_BroadCast_MonthCard", 28, 13, false, Pb_God.PBBroadcasStringU32);
	/**   高级召唤获得5星英雄(玩家名字, pet id)	PBBroadcasStringU32*/
	export var S2C_BroadCast_AdvCall5Star: CmdType = createCmd("S2C_BroadCast_AdvCall5Star", 28, 14, false, Pb_God.PBBroadcasStringU32);
	/**   首冲奖励			PBBroadcastItems*/
	export var S2C_BroadCast_FirstCharge: CmdType = createCmd("S2C_BroadCast_FirstCharge", 28, 15, false, Pb_God.PBBroadcastItems);
	/**   七日登陆			PBBroadcastItems*/
	export var S2C_BroadCast_7DayLogin: CmdType = createCmd("S2C_BroadCast_7DayLogin", 28, 16, false, Pb_God.PBBroadcastItems);
	/**   主线通关			PBBroadcastHookStage*/
	export var S2C_BroadCast_HookStage: CmdType = createCmd("S2C_BroadCast_HookStage", 28, 17, false, Pb_God.PBBroadcastHookStage);
	/**   先知召唤(玩家名字, pet id)	PBBroadcasStringU32*/
	export var S2C_BroadCast_OracleCall: CmdType = createCmd("S2C_BroadCast_OracleCall", 28, 18, false, Pb_God.PBBroadcasStringU32);
	/**	 通关试炼塔		PBBroadcastTower*/
	export var S2C_BroadCast_Tower: CmdType = createCmd("S2C_BroadCast_Tower", 28, 19, false, Pb_God.PBBroadcastTower);
	/**	 元灵解锁(名字，元灵ID)		PBBroadcasStringU32	*/
	export var S2C_BroadCast_Artifact: CmdType = createCmd("S2C_BroadCast_Artifact", 28, 20, false, Pb_God.PBBroadcasStringU32);
	/**	 先知召唤物品		PBBroadcastItem	*/
	export var S2C_BroadCast_OracleCallItem: CmdType = createCmd("S2C_BroadCast_OracleCallItem", 28, 21, false, Pb_God.PBBroadcastItem);
	/**	 主线第一名(名字, stageid)	PBBroadcasStringU32	*/
	export var S2C_BroadCast_MainTop1: CmdType = createCmd("S2C_BroadCast_MainTop1", 28, 22, false, Pb_God.PBBroadcasStringU32);
	/**	 试炼塔1第一名(名字, 层数)		PBBroadcasStringU32	*/
	export var S2C_BroadCast_Tower1Top1: CmdType = createCmd("S2C_BroadCast_Tower1Top1", 28, 23, false, Pb_God.PBBroadcasStringU32);
	/**	 竞技场第一名(名字)			PBBroadcasString	*/
	export var S2C_BroadCast_ChallengeTop1: CmdType = createCmd("S2C_BroadCast_ChallengeTop1", 28, 24, false, Pb_God.PBBroadcasString);
	/**	 战斗力第一名(名字)			PBBroadcasString	*/
	export var S2C_BroadCast_PowerTop1: CmdType = createCmd("S2C_BroadCast_PowerTop1", 28, 25, false, Pb_God.PBBroadcasString);
	/**	 高级召唤获得6星英雄(玩家名字, pet id)			PBBroadcasStringU32*/
	export var S2C_BroadCast_AdvCall6Star: CmdType = createCmd("S2C_BroadCast_AdvCall6Star", 28, 26, false, Pb_God.PBBroadcasStringU32);
	/**	 充值基金(玩家名字, 商品 id)			PBBroadcasStringU32*/
	export var S2C_BroadCast_ChargeFund: CmdType = createCmd("S2C_BroadCast_ChargeFund", 28, 27, false, Pb_God.PBBroadcasStringU32);
	/**	 充值礼包(玩家名字, 商品 id)			PBBroadcasStringU32*/
	export var S2C_BroadCast_ChargeGift: CmdType = createCmd("S2C_BroadCast_ChargeGift", 28, 28, false, Pb_God.PBBroadcasStringU32);
	/**	 充值牛逼礼包(玩家名字, 商品 id)			PBBroadcasStringU32	*/
	export var S2C_BroadCast_ChargeNB: CmdType = createCmd("S2C_BroadCast_ChargeNB", 28, 29, false, Pb_God.PBBroadcasStringU32);
	/**	 公会boss结算(boss名字,章节 id)			PBBroadcasStringU32	*/
	export var S2C_BroadCast_FactionBoss: CmdType = createCmd("S2C_BroadCast_FactionBoss", 28, 30, false, Pb_God.PBBroadcasStringU32);
	/**	 通关试炼塔2		PBBroadcastTower*/
	export var S2C_BroadCast_Tower2: CmdType = createCmd("S2C_BroadCast_Tower2", 28, 31, false, Pb_God.PBBroadcastTower);
	/**	 试炼塔2第一名(名字, 层数)		PBBroadcasStringU32	*/
	export var S2C_BroadCast_Tower2Top1: CmdType = createCmd("S2C_BroadCast_Tower2Top1", 28, 32, false, Pb_God.PBBroadcasStringU32);
	/** 	 升级		PBU32*/
	export var C2S_Holy_Upgrade: CmdType = createCmd("C2S_Holy_Upgrade", 28, 1, true, Pb_God.PBU32);
	/** 	 进阶		PBC2GHolyAdvanceAsk*/
	export var C2S_Holy_Advance: CmdType = createCmd("C2S_Holy_Advance", 28, 2, true, Pb_God.PBC2GHolyAdvanceAsk);
	/** 	 解锁		PBC2GHolyAdvanceAsk*/
	export var C2S_Holy_Unlock: CmdType = createCmd("C2S_Holy_Unlock", 28, 3, true, Pb_God.PBC2GHolyAdvanceAsk);
	/**	 升级返回		PBPlayerHolyInfo*/
	export var S2C_Holy_Upgrade: CmdType = createCmd("S2C_Holy_Upgrade", 29, 0, false, Pb_God.PBPlayerHolyInfo);
	/**	 进阶返回 	PBPlayerHolyInfo*/
	export var S2C_Holy_Advance: CmdType = createCmd("S2C_Holy_Advance", 29, 1, false, Pb_God.PBPlayerHolyInfo);
	/**	 解锁返回 	PBPlayerHolyInfo*/
	export var S2C_Holy_Unlock: CmdType = createCmd("S2C_Holy_Unlock", 29, 2, false, Pb_God.PBPlayerHolyInfo);
	/**查询系统录像		PBU32*/
	export var C2S_Video_QuerySystem: CmdType = createCmd("C2S_Video_QuerySystem", 29, 0, true, Pb_God.PBU32);
	/**点赞				PBC2GVideoActionAsk*/
	export var C2S_Video_Like: CmdType = createCmd("C2S_Video_Like", 29, 1, true, Pb_God.PBC2GVideoActionAsk);
	/**播放系统录像		PBC2GVideoPlayerAsk*/
	export var C2S_Video_PlaySystem: CmdType = createCmd("C2S_Video_PlaySystem", 29, 2, true, Pb_God.PBC2GVideoPlayerAsk);
	/**播放玩家录像		PBC2GVideoPlayerAsk*/
	export var C2S_Video_PlayPlayer: CmdType = createCmd("C2S_Video_PlayPlayer", 29, 3, true, Pb_God.PBC2GVideoPlayerAsk);
	/**分享				PBC2GVideoActionAsk*/
	export var C2S_Video_Share: CmdType = createCmd("C2S_Video_Share", 29, 4, true, Pb_God.PBC2GVideoActionAsk);
	/**收藏				PBU64*/
	export var C2S_Video_Collect: CmdType = createCmd("C2S_Video_Collect", 29, 5, true, Pb_God.PBU64);
	/**取消收藏			PBU64*/
	export var C2S_Video_UnCollect: CmdType = createCmd("C2S_Video_UnCollect", 29, 6, true, Pb_God.PBU64);
	/**查询战斗数据		PBC2GVideoActionAsk*/
	export var C2S_Video_QueryDamageData: CmdType = createCmd("C2S_Video_QueryDamageData", 29, 7, true, Pb_God.PBC2GVideoActionAsk);
	/**查询录像伙伴数据	PBC2GQueryBattlePet*/
	export var C2S_Video_QueryBattlePet: CmdType = createCmd("C2S_Video_QueryBattlePet", 29, 8, true, Pb_God.PBC2GQueryBattlePet);
	/**查询单个录像		PBU64*/
	export var C2S_Video_QuerySingle: CmdType = createCmd("C2S_Video_QuerySingle", 29, 9, true, Pb_God.PBU64);
	/**查询挂机录像录像	PBU32*/
	export var C2S_Video_QueryHook: CmdType = createCmd("C2S_Video_QueryHook", 29, 10, true, Pb_God.PBU32);
	/**查询试练塔录像	PBU32*/
	export var C2S_Video_QueryTower: CmdType = createCmd("C2S_Video_QueryTower", 29, 11, true, Pb_God.PBU32);
	/**查询玩家录像记录	PBC2GQueryPlayerRecord*/
	export var C2S_Video_QueryPlayerRecord: CmdType = createCmd("C2S_Video_QueryPlayerRecord", 29, 12, true, Pb_God.PBC2GQueryPlayerRecord);
	/**查询多个录像		PBC2GQueryMutileVideo*/
	export var C2S_Video_QueryMutiple: CmdType = createCmd("C2S_Video_QueryMutiple", 29, 13, true, Pb_God.PBC2GQueryMutileVideo);
	/**查询跨服录像多个	PBC2GQueryMutileVideoBW*/
	export var C2S_Video_QueryMutipleBW: CmdType = createCmd("C2S_Video_QueryMutipleBW", 29, 14, true, Pb_God.PBC2GQueryMutileVideoBW);
	/**查询跨服伤害数据(video type, sn) PBU32U64*/
	export var C2S_Video_QueryDamageDataBW: CmdType = createCmd("C2S_Video_QueryDamageDataBW", 29, 15, true, Pb_God.PBU32U64);
	/**查询跨服伙伴数据 PBC2GQueryBattlePetBW*/
	export var C2S_Video_QueryBattlePetBW: CmdType = createCmd("C2S_Video_QueryBattlePetBW", 29, 16, true, Pb_God.PBC2GQueryBattlePetBW);
	/**播放跨服录像(video type, sn) PBU32U64*/
	export var C2S_Video_PlayBW: CmdType = createCmd("C2S_Video_PlayBW", 29, 17, true, Pb_God.PBU32U64);
	/**查询个人收藏	PBC2GQueryCollect*/
	export var C2S_Video_QueryCollect: CmdType = createCmd("C2S_Video_QueryCollect", 29, 100, true, Pb_God.PBC2GQueryCollect);
	/**查询个人记录	PBU32*/
	export var C2S_Video_QuerySelfRecord: CmdType = createCmd("C2S_Video_QuerySelfRecord", 29, 101, true, Pb_God.PBU32);
	/**查询挂机录像录像	PBWorldStageVideoInfo*/
	export var C2S_Video_QueryTowerToWorld: CmdType = createCmd("C2S_Video_QueryTowerToWorld", 29, 102, true, Pb_God.PBWorldStageVideoInfo);
	/**添加离线记录	PBFightResult*/
	export var C2S_Video_AddOfflineRecord: CmdType = createCmd("C2S_Video_AddOfflineRecord", 29, 103, true, Pb_God.PBFightResult);
	/**清除玩家录像(录像类型)	PBU32*/
	export var C2S_Video_ClearPlayerType: CmdType = createCmd("C2S_Video_ClearPlayerType", 29, 104, true, Pb_God.PBU32);
	/**通用错误返回*/
	export var S2C_Video_Common: CmdType = createCmd("S2C_Video_Common", 30, 0, false);
	/**查询系统录像返回		PBG2CVideoQuerySystemAck		*/
	export var S2C_Video_QuerySystemAck: CmdType = createCmd("S2C_Video_QuerySystemAck", 30, 1, false, Pb_God.PBG2CVideoQuerySystemAck);
	/**点赞次数返回			PBG2CVideoActionAck*/
	export var S2C_Video_LikeCountAck: CmdType = createCmd("S2C_Video_LikeCountAck", 30, 2, false, Pb_God.PBG2CVideoActionAck);
	/**播放次数返回			PBG2CVideoActionAck*/
	export var S2C_Video_PlayCountAck: CmdType = createCmd("S2C_Video_PlayCountAck", 30, 3, false, Pb_God.PBG2CVideoActionAck);
	/**分享次数返回			PBG2CVideoActionAck*/
	export var S2C_Video_ShareCountAck: CmdType = createCmd("S2C_Video_ShareCountAck", 30, 4, false, Pb_God.PBG2CVideoActionAck);
	/**查询战斗数据返回		PBG2CVideoDamageDataAck*/
	export var S2C_Video_QueryDamageDataAck: CmdType = createCmd("S2C_Video_QueryDamageDataAck", 30, 5, false, Pb_God.PBG2CVideoDamageDataAck);
	/**查询录像数据返回		PBPlayerPetView*/
	export var S2C_Video_QueryBattlePetAck: CmdType = createCmd("S2C_Video_QueryBattlePetAck", 30, 6, false, Pb_God.PBPlayerPetView);
	/**播放录像				PBFightResult*/
	export var S2C_Video_Play: CmdType = createCmd("S2C_Video_Play", 30, 7, false, Pb_God.PBFightResult);
	/**查询单个录像返回		PBVideoDisplay*/
	export var S2C_Video_QuerySingleAck: CmdType = createCmd("S2C_Video_QuerySingleAck", 30, 8, false, Pb_God.PBVideoDisplay);
	/**同步信息				PBPlayerVideo*/
	export var S2C_Video_SynInfo: CmdType = createCmd("S2C_Video_SynInfo", 30, 9, false, Pb_God.PBPlayerVideo);
	/**查询挂机录像返回		PBWorldStageVideoInfo*/
	export var S2C_Video_QueryHookAck: CmdType = createCmd("S2C_Video_QueryHookAck", 30, 10, false, Pb_God.PBWorldStageVideoInfo);
	/**查询试练塔录像返回	PBWorldStageVideoInfo*/
	export var S2C_Video_QueryTowerAck: CmdType = createCmd("S2C_Video_QueryTowerAck", 30, 11, false, Pb_God.PBWorldStageVideoInfo);
	/**查询玩家录像返回		PBG2CVideoQuerySystemAck*/
	export var S2C_Video_PlayerRecordAck: CmdType = createCmd("S2C_Video_PlayerRecordAck", 30, 12, false, Pb_God.PBG2CVideoQuerySystemAck);
	/**查询竞技场录像返回	PBG2CVideoPlayerRecordAck*/
	export var S2C_Video_PlayerChallengeAck: CmdType = createCmd("S2C_Video_PlayerChallengeAck", 30, 13, false, Pb_God.PBG2CVideoPlayerRecordAck);
	/**查询多个录像返回		PBG2CQueryMutileVideo*/
	export var S2C_Video_QueryMutiple: CmdType = createCmd("S2C_Video_QueryMutiple", 30, 14, false, Pb_God.PBG2CQueryMutileVideo);
	/**查询跨服录像多个返回	PBG2CQueryMutileVideo*/
	export var S2C_Video_QueryMutipleBW: CmdType = createCmd("S2C_Video_QueryMutipleBW", 30, 15, false, Pb_God.PBG2CQueryMutileVideo);
	/**查询跨服伤害数据返回 PBG2CVideoDamageDataAck*/
	export var S2C_Video_QueryDamageDataBW: CmdType = createCmd("S2C_Video_QueryDamageDataBW", 30, 16, false, Pb_God.PBG2CVideoDamageDataAck);
	/**查询跨服伙伴数据返回 PBPlayerPetView*/
	export var S2C_Video_QueryBattlePetBW: CmdType = createCmd("S2C_Video_QueryBattlePetBW", 30, 17, false, Pb_God.PBPlayerPetView);
	/**播放跨服录像返回		PBFightResult*/
	export var S2C_Video_PlayBW: CmdType = createCmd("S2C_Video_PlayBW", 30, 18, false, Pb_God.PBFightResult);
	/** 	 购买vip礼包			PBU32*/
	export var C2S_Privilege_BuyVipPacket: CmdType = createCmd("C2S_Privilege_BuyVipPacket", 30, 1, true, Pb_God.PBU32);
	/** 	 购买特权商店			PBU32*/
	export var C2S_Privilege_ShopBuy: CmdType = createCmd("C2S_Privilege_ShopBuy", 30, 2, true, Pb_God.PBU32);
	/** 	 领取每日奖励			PBU32		*/
	export var C2S_Privilege_DailyPrize: CmdType = createCmd("C2S_Privilege_DailyPrize", 30, 3, true, Pb_God.PBU32);
	/**	 通用失败返回*/
	export var S2C_Privilege_Common: CmdType = createCmd("S2C_Privilege_Common", 31, 0, false);
	/**	 新vip经验			PBU32*/
	export var S2C_Privilege_UpVipExp: CmdType = createCmd("S2C_Privilege_UpVipExp", 31, 1, false, Pb_God.PBU32);
	/**	 购买vip礼包返回 		PBU32*/
	export var S2C_Privilege_BuyVipPacket: CmdType = createCmd("S2C_Privilege_BuyVipPacket", 31, 2, false, Pb_God.PBU32);
	/**	 购买特权商店 		PBU32*/
	export var S2C_Privilege_ShopBuy: CmdType = createCmd("S2C_Privilege_ShopBuy", 31, 3, false, Pb_God.PBU32);
	/**	 领取每日奖励			PBU32*/
	export var S2C_Privilege_DailyPrize: CmdType = createCmd("S2C_Privilege_DailyPrize", 31, 4, false, Pb_God.PBU32);
	/**	 同步特权卡充值		PBPrivilegeCharge*/
	export var S2C_Privilege_CardCharge: CmdType = createCmd("S2C_Privilege_CardCharge", 31, 5, false, Pb_God.PBPrivilegeCharge);
	/**	 同步特权卡			PBPrivilegeCard*/
	export var S2C_Privilege_SynCard: CmdType = createCmd("S2C_Privilege_SynCard", 31, 6, false, Pb_God.PBPrivilegeCard);
	/** 	 同步特权数据 	    PBPlayerPrivilege*/
	export var S2C_Privilege_SynData: CmdType = createCmd("S2C_Privilege_SynData", 31, 7, false, Pb_God.PBPlayerPrivilege);
	/** 	 签到*/
	export var C2S_Weal_Signin: CmdType = createCmd("C2S_Weal_Signin", 31, 1, true);
	/**	 点石成金获取奖励 PBU32*/
	export var C2S_Weal_ClickGold: CmdType = createCmd("C2S_Weal_ClickGold", 31, 2, true, Pb_God.PBU32);
	/**	 获取返利奖励*/
	export var C2S_Weal_GetFanLiAward: CmdType = createCmd("C2S_Weal_GetFanLiAward", 31, 3, true);
	/**	 cdk验证	PBString*/
	export var C2S_Weal_CDK: CmdType = createCmd("C2S_Weal_CDK", 31, 4, true, Pb_God.PBString);
	/**	 领取在线奖励	PBU32*/
	export var C2S_Weal_OnlinePrize: CmdType = createCmd("C2S_Weal_OnlinePrize", 31, 5, true, Pb_God.PBU32);
	/**	 领取礼包	PBU32*/
	export var C2S_Weal_GetGift: CmdType = createCmd("C2S_Weal_GetGift", 31, 6, true, Pb_God.PBU32);
	/**	获取找回资源数据 PBC2GResourceFindBackInfo*/
	export var C2S_ResourceFindBack_GetInfo: CmdType = createCmd("C2S_ResourceFindBack_GetInfo", 31, 7, true, Pb_God.PBC2GResourceFindBackInfo);
	/**	领取找回资源  PBC2GDrawFindBack*/
	export var C2S_ResourceFindBack_Draw: CmdType = createCmd("C2S_ResourceFindBack_Draw", 31, 8, true, Pb_God.PBC2GDrawFindBack);
	/** 	 福利通用返回*/
	export var S2C_Weal_Common_ACK: CmdType = createCmd("S2C_Weal_Common_ACK", 32, 1, false);
	/**	 签到返回 返回当前的状态		PBU32*/
	export var S2C_Weal_Signin: CmdType = createCmd("S2C_Weal_Signin", 32, 2, false, Pb_God.PBU32);
	/**	 点石成金获取奖励返回			PBG2CClickGold*/
	export var S2C_Weal_ClickGold: CmdType = createCmd("S2C_Weal_ClickGold", 32, 3, false, Pb_God.PBG2CClickGold);
	/**	 点石成金重置次数通知			PBU32*/
	export var S2C_Weal_ClickGoldReset: CmdType = createCmd("S2C_Weal_ClickGoldReset", 32, 4, false, Pb_God.PBU32);
	/**	 返回返利结果			PBFanliInfo*/
	export var S2C_Weal_FanliResult: CmdType = createCmd("S2C_Weal_FanliResult", 32, 5, false, Pb_God.PBFanliInfo);
	/**	 领取在线奖励返回	PBU32*/
	export var S2C_Weal_OnlinePrize: CmdType = createCmd("S2C_Weal_OnlinePrize", 32, 7, false, Pb_God.PBU32);
	/**	获取找回资源数据返回  PBG2CResourceFindBackInfo*/
	export var S2C_ResourceFindBack_GetInfo: CmdType = createCmd("S2C_ResourceFindBack_GetInfo", 32, 8, false, Pb_God.PBG2CResourceFindBackInfo);
	/**	领取找回资源 	PBG2CDrawFindBack*/
	export var S2C_ResourceFindBack_Draw: CmdType = createCmd("S2C_ResourceFindBack_Draw", 32, 9, false, Pb_God.PBG2CDrawFindBack);
	/**	 cdk验证返回	PBU32String*/
	export var S2C_Weal_CDK: CmdType = createCmd("S2C_Weal_CDK", 32, 26, false, Pb_God.PBU32String);
	/**	 领取礼包返回	PBU32*/
	export var S2C_Weal_GetGift: CmdType = createCmd("S2C_Weal_GetGift", 32, 30, false, Pb_God.PBU32);
	/** 	 领奖品 PBG2CActivityDrawReward*/
	export var C2S_Activity_DrawReward: CmdType = createCmd("C2S_Activity_DrawReward", 32, 1, true, Pb_God.PBG2CActivityDrawReward);
	/**     获取当前活动的开始时间 PBC2GActivityStartTime*/
	export var C2S_Activity_GetStartTime: CmdType = createCmd("C2S_Activity_GetStartTime", 32, 2, true, Pb_God.PBC2GActivityStartTime);
	/**     获取活动奖励物品的剩余数量(全区共用的奖励数量),活动ID PBU32*/
	export var C2S_Activity_GetRewardNum: CmdType = createCmd("C2S_Activity_GetRewardNum", 32, 3, true, Pb_God.PBU32);
	/**     领奖品 PBG2CActivityDrawRewardEx */
	export var C2S_Activity_DrawRewardEx: CmdType = createCmd("C2S_Activity_DrawRewardEx", 32, 4, true, Pb_God.PBG2CActivityDrawRewardEx);
	/**     一键领奖 PBG2CActivityDrawRewardOneKey  */
	export var C2S_Activity_DrawRewardOneKey: CmdType = createCmd("C2S_Activity_DrawRewardOneKey", 32, 5, true, Pb_God.PBG2CActivityDrawRewardOneKey);
	/**     定制礼包预选商品 PBC2GActivityCustomGiftOrder  */
	export var C2S_Activity_CustomGiftOrder: CmdType = createCmd("C2S_Activity_CustomGiftOrder", 32, 6, true, Pb_God.PBC2GActivityCustomGiftOrder);
	/** 	 通用返回*/
	export var S2C_Activity_Common_ACK: CmdType = createCmd("S2C_Activity_Common_ACK", 33, 1, false);
	/**     领取奖品返回             PBG2CActivityDrawReward*/
	export var S2C_Activity_DrawReward: CmdType = createCmd("S2C_Activity_DrawReward", 33, 2, false, Pb_God.PBG2CActivityDrawReward);
	/**     活动开始通知，活动ID     PBU32*/
	export var S2C_Activity_Open: CmdType = createCmd("S2C_Activity_Open", 33, 3, false, Pb_God.PBU32);
	/**     活动关闭通知，活动ID     PBU32*/
	export var S2C_Activity_Close: CmdType = createCmd("S2C_Activity_Close", 33, 4, false, Pb_God.PBU32);
	/**     活动数据重置，活动ID     PBU32*/
	export var S2C_Activity_Refresh: CmdType = createCmd("S2C_Activity_Refresh", 33, 5, false, Pb_God.PBU32);
	/**     返回当前活动的开始时间       PBG2CActivityStartTime*/
	export var S2C_Activity_GetStartTime: CmdType = createCmd("S2C_Activity_GetStartTime", 33, 6, false, Pb_God.PBG2CActivityStartTime);
	/**     返回奖励物品的剩余数量   PBG2CActivityRewardNum*/
	export var S2C_Activity_GetRewardNum: CmdType = createCmd("S2C_Activity_GetRewardNum", 33, 7, false, Pb_God.PBG2CActivityRewardNum);
	/**     同步数据                 PBPlayerActivityData*/
	export var S2C_Activity_Data: CmdType = createCmd("S2C_Activity_Data", 33, 8, false, Pb_God.PBPlayerActivityData);
	/**     定制礼包预选商品         PBG2CActivityCustomGiftOrder */
	export var S2C_Activity_CustomGiftOrder: CmdType = createCmd("S2C_Activity_CustomGiftOrder", 33, 9, false, Pb_God.PBG2CActivityCustomGiftOrder);
	/** 充值 PBChargeData*/
	export var C2S_Platform_charge: CmdType = createCmd("C2S_Platform_charge", 33, 1, true, Pb_God.PBChargeData);
	/** 通用失败返回*/
	export var S2C_Platform_Common: CmdType = createCmd("S2C_Platform_Common", 34, 0, false);
	/** 充值 PBChargeData*/
	export var S2C_Platform_sanqi_charge: CmdType = createCmd("S2C_Platform_sanqi_charge", 34, 1, false, Pb_God.PBChargeData);
	/** 更新充值信息 PBChargeInfo*/
	export var S2C_Platform_update_chargeinfo: CmdType = createCmd("S2C_Platform_update_chargeinfo", 34, 2, false, Pb_God.PBChargeInfo);
	/** 更新充值信息 PBPlayerPlatform*/
	export var S2C_Platform_SynCharge: CmdType = createCmd("S2C_Platform_SynCharge", 34, 3, false, Pb_God.PBPlayerPlatform);
	/** 切支付 PBPlatformMisc*/
	export var S2C_Platform_MISC: CmdType = createCmd("S2C_Platform_MISC", 34, 4, false, Pb_God.PBPlatformMisc);
	/**聊天  			PBC2GTalkAsk*/
	export var C2S_Talk_Talk: CmdType = createCmd("C2S_Talk_Talk", 34, 1, true, Pb_God.PBC2GTalkAsk);
	/**删除私聊记录		PBU32*/
	export var C2S_Talk_ClearPlayerTalk: CmdType = createCmd("C2S_Talk_ClearPlayerTalk", 34, 2, true, Pb_God.PBU32);
	/**  举报			PBC2GReportAsk*/
	export var C2S_Talk_Report: CmdType = createCmd("C2S_Talk_Report", 34, 3, true, Pb_God.PBC2GReportAsk);
	/**聊天  		PBG2CTalkAck*/
	export var S2C_Talk_Talk: CmdType = createCmd("S2C_Talk_Talk", 35, 1, false, Pb_God.PBG2CTalkAck);
	/**同步聊天缓存	PBG2CTalk_SynSaveChat*/
	export var S2C_Talk_SynSaveChat: CmdType = createCmd("S2C_Talk_SynSaveChat", 35, 2, false, Pb_God.PBG2CTalk_SynSaveChat);
	/**撤回聊天 PBG2CRecall */
	export var S2C_Talk_ChatRecall: CmdType = createCmd("S2C_Talk_ChatRecall", 35, 3, false, Pb_God.PBG2CRecall);
	/** 	 刷新(type)                   		PBU32*/
	export var C2S_Treasure_Refresh: CmdType = createCmd("C2S_Treasure_Refresh", 35, 1, true, Pb_God.PBU32);
	/** 	 探宝(cost index)             		PBC2GTreasureHunt*/
	export var C2S_Treasure_Hunt: CmdType = createCmd("C2S_Treasure_Hunt", 35, 2, true, Pb_God.PBC2GTreasureHunt);
	/** 	 幸运值兑换物品(index)	     		 PBU32*/
	export var C2S_Treasure_Lucky: CmdType = createCmd("C2S_Treasure_Lucky", 35, 3, true, Pb_God.PBU32);
	/**	 通用错误返回*/
	export var S2C_Treasure_Common: CmdType = createCmd("S2C_Treasure_Common", 36, 0, false);
	/**	 刷新返回				PBG2CTreasureRefresh*/
	export var S2C_Treasure_Refresh: CmdType = createCmd("S2C_Treasure_Refresh", 36, 1, false, Pb_God.PBG2CTreasureRefresh);
	/**	 探宝返回				PBG2CTreasureHunt*/
	export var S2C_Treasure_Hunt: CmdType = createCmd("S2C_Treasure_Hunt", 36, 2, false, Pb_God.PBG2CTreasureHunt);
	/**	 幸运值兑换物品返回 	 PBG2CTreasureLucky*/
	export var S2C_Treasure_Lucky: CmdType = createCmd("S2C_Treasure_Lucky", 36, 3, false, Pb_God.PBG2CTreasureLucky);
	/** 	 领章节奖品                                               PBU32*/
	export var C2S_HeavenDungeon_ChapterReward: CmdType = createCmd("C2S_HeavenDungeon_ChapterReward", 36, 1, true, Pb_God.PBU32);
	/** 	 购买挑战次数*/
	export var C2S_HeavenDungeon_BuyCount: CmdType = createCmd("C2S_HeavenDungeon_BuyCount", 36, 2, true);
	/** 	 祈祷                                                    PBC2GHeavenDungeonPray*/
	export var C2S_HeavenDungeon_Pray: CmdType = createCmd("C2S_HeavenDungeon_Pray", 36, 3, true, Pb_God.PBC2GHeavenDungeonPray);
	/**     扫荡关卡,服务器用S2C_HeavenDungeon_StageChange返回       PBU32 */
	export var C2S_HeavenDungeon_Sweep: CmdType = createCmd("C2S_HeavenDungeon_Sweep", 36, 4, true, Pb_God.PBU32);
	/** 	 通用返回*/
	export var S2C_HeavenDungeon_Common_ACK: CmdType = createCmd("S2C_HeavenDungeon_Common_ACK", 37, 1, false);
	/**     领取章节奖品返回             PBU32*/
	export var S2C_HeavenDungeon_ChapterReward: CmdType = createCmd("S2C_HeavenDungeon_ChapterReward", 37, 2, false, Pb_God.PBU32);
	/**     购买挑战次数返回             PBG2CHeavenDungeonCount*/
	export var S2C_HeavenDungeon_BuyCount: CmdType = createCmd("S2C_HeavenDungeon_BuyCount", 37, 3, false, Pb_God.PBG2CHeavenDungeonCount);
	/**     祈祷返回                    PBG2CHeavenDungeonPray*/
	export var S2C_HeavenDungeon_Pray: CmdType = createCmd("S2C_HeavenDungeon_Pray", 37, 4, false, Pb_God.PBG2CHeavenDungeonPray);
	/**     关卡战斗或扫荡之后推送       PBG2CHeavenDungeonStageSync*/
	export var S2C_HeavenDungeon_StageSync: CmdType = createCmd("S2C_HeavenDungeon_StageSync", 37, 5, false, Pb_God.PBG2CHeavenDungeonStageSync);
	/**   刷新对手*/
	export var C2S_CrossChallenge_Refresh: CmdType = createCmd("C2S_CrossChallenge_Refresh", 37, 1, true);
	/**   领取每日宝箱 (index)	    					PBU32*/
	export var C2S_CrossChallenge_DailyPrize: CmdType = createCmd("C2S_CrossChallenge_DailyPrize", 37, 2, true, Pb_God.PBU32);
	/**   打开跨服竞技场*/
	export var C2S_CrossChallenge_Open: CmdType = createCmd("C2S_CrossChallenge_Open", 37, 3, true);
	/**   查询玩家信息*/
	export var C2S_CrossChallenge_Query: CmdType = createCmd("C2S_CrossChallenge_Query", 37, 4, true);
	/**   赛季荣耀点赞 (玩家id)		        		PBU32*/
	export var C2S_CrossChallenge_HonourLike: CmdType = createCmd("C2S_CrossChallenge_HonourLike", 37, 5, true, Pb_God.PBU32);
	/**   请求挑战记录*/
	export var C2S_CrossChallenge_Record: CmdType = createCmd("C2S_CrossChallenge_Record", 37, 6, true);
	/**   购买奖品,第一个免费，后边两个要买(index)         PBU32 */
	export var C2S_CrossChallenge_BuyPrize: CmdType = createCmd("C2S_CrossChallenge_BuyPrize", 37, 7, true, Pb_God.PBU32);
	/**   设置防守队伍(每个队伍会发送S2C_Pet_Set_Zhenfa_Ack返回)      PBCrossChallengeSetTeam*/
	export var C2S_CrossChallenge_SetTeamDEF: CmdType = createCmd("C2S_CrossChallenge_SetTeamDEF", 37, 8, true, Pb_God.PBCrossChallengeSetTeam);
	/**   设置进攻队伍(每个队伍会发送S2C_Pet_Set_Zhenfa_Ack返回)      PBCrossChallengeSetTeam */
	export var C2S_CrossChallenge_SetTeamATK: CmdType = createCmd("C2S_CrossChallenge_SetTeamATK", 37, 9, true, Pb_God.PBCrossChallengeSetTeam);
	/**    失败才返回*/
	export var S2C_CrossChallenge_Common_Ack: CmdType = createCmd("S2C_CrossChallenge_Common_Ack", 38, 0, false);
	/**    对手信息返回		                        PBCrossChallengeRefresh*/
	export var S2C_CrossChallenge_Refresh: CmdType = createCmd("S2C_CrossChallenge_Refresh", 38, 1, false, Pb_God.PBCrossChallengeRefresh);
	/**    领取每日宝箱返回	                        PBCrossChallengeDailyInfo*/
	export var S2C_CrossChallenge_DailyPrize: CmdType = createCmd("S2C_CrossChallenge_DailyPrize", 38, 2, false, Pb_God.PBCrossChallengeDailyInfo);
	/**	打开跨服竞技场返回						PBCrossChallengeOpenInfo*/
	export var S2C_CrossChallenge_Open: CmdType = createCmd("S2C_CrossChallenge_Open", 38, 3, false, Pb_God.PBCrossChallengeOpenInfo);
	/**    查询玩家信息返回	                    	PBCrossChallengeInfo*/
	export var S2C_CrossChallenge_Query: CmdType = createCmd("S2C_CrossChallenge_Query", 38, 4, false, Pb_God.PBCrossChallengeInfo);
	/**    同步次数		                            PBU32*/
	export var S2C_CrossChallenge_Count: CmdType = createCmd("S2C_CrossChallenge_Count", 38, 5, false, Pb_God.PBU32);
	/**    点赞返回(key : 玩家id, value : 点赞数)    PBU32U32 */
	export var S2C_CrossChallenge_HonourLike: CmdType = createCmd("S2C_CrossChallenge_HonourLike", 38, 6, false, Pb_God.PBU32U32);
	/**    挑战记录返回		                        PBCrossChallengerResults*/
	export var S2C_CrossChallenge_Record: CmdType = createCmd("S2C_CrossChallenge_Record", 38, 7, false, Pb_God.PBCrossChallengerResults);
	/**	购买奖品返回 								PBU32*/
	export var S2C_CrossChallenge_BuyPrize: CmdType = createCmd("S2C_CrossChallenge_BuyPrize", 38, 8, false, Pb_God.PBU32);
	/**	设置防御队伍返回							PBCrossChallengeSetTeamAck*/
	export var S2C_CrossChallenge_SetTeamDEF: CmdType = createCmd("S2C_CrossChallenge_SetTeamDEF", 38, 9, false, Pb_God.PBCrossChallengeSetTeamAck);
	/**	战斗奖品									PBCrossChallengeFightPrize*/
	export var S2C_CrossChallenge_Prize: CmdType = createCmd("S2C_CrossChallenge_Prize", 38, 10, false, Pb_God.PBCrossChallengeFightPrize);
	/**	设置进攻队伍返回							PBCrossChallengeSetTeamAck*/
	export var S2C_CrossChallenge_SetTeamATK: CmdType = createCmd("S2C_CrossChallenge_SetTeamATK", 38, 11, false, Pb_God.PBCrossChallengeSetTeamAck);
	/** 	 放入经验(exp)            PBU64 */
	export var C2S_Tablet_PutExp: CmdType = createCmd("C2S_Tablet_PutExp", 38, 1, true, Pb_God.PBU64);
	/**	 收获魔液*/
	export var C2S_Tablet_GetMagicJuice: CmdType = createCmd("C2S_Tablet_GetMagicJuice", 38, 2, true);
	/**	 放置英雄,空位sn填0(pos, pet Sn)    PBU32U64 */
	export var C2S_Tablet_PutHero: CmdType = createCmd("C2S_Tablet_PutHero", 38, 3, true, Pb_God.PBU32U64);
	/**	 升级晶碑	*/
	export var C2S_Tablet_Upgrade: CmdType = createCmd("C2S_Tablet_Upgrade", 38, 4, true);
	/**	 创造英雄                 PBC2SCreateHero*/
	export var C2S_Tablet_Create: CmdType = createCmd("C2S_Tablet_Create", 38, 5, true, Pb_God.PBC2SCreateHero);
	/**	 请求魔液状态*/
	export var C2S_Tablet_MagicJuice: CmdType = createCmd("C2S_Tablet_MagicJuice", 38, 6, true);
	/** 	 取回经验*/
	export var C2S_Tablet_GetBackExp: CmdType = createCmd("C2S_Tablet_GetBackExp", 38, 7, true);
	/**增加、放置家具,拜访返回 PBFurnitureInfo*/
	export var S2C_Room_placeFurnitureInfo: CmdType = createCmd("S2C_Room_placeFurnitureInfo", 39, 1, false, Pb_God.PBFurnitureInfo);
	/**我的竞猜 	无内容*/
	export var C2S_WeekChampion_SelfGuessAsk: CmdType = createCmd("C2S_WeekChampion_SelfGuessAsk", 39, 1, true);
	/**查询竞猜		无内容*/
	export var C2S_WeekChampion_QueryGuessAsk: CmdType = createCmd("C2S_WeekChampion_QueryGuessAsk", 39, 2, true);
	/**竞猜下注		PBC2GChampionGuessAsk*/
	export var C2S_WeekChampion_GuessAsk: CmdType = createCmd("C2S_WeekChampion_GuessAsk", 39, 3, true, Pb_God.PBC2GChampionGuessAsk);
	/**查询32强		PBU32*/
	export var C2S_WeekChampion_Query32List: CmdType = createCmd("C2S_WeekChampion_Query32List", 39, 4, true, Pb_God.PBU32);
	/**查询4强	*/
	export var C2S_WeekChampion_Query4List: CmdType = createCmd("C2S_WeekChampion_Query4List", 39, 5, true);
	/**我的竞猜记录		*/
	export var C2S_WeekChampion_GuessRecordAsk: CmdType = createCmd("C2S_WeekChampion_GuessRecordAsk", 39, 6, true);
	/**我的战斗记录	*/
	export var C2S_WeekChampion_FightRecordAsk: CmdType = createCmd("C2S_WeekChampion_FightRecordAsk", 39, 7, true);
	/**发送弹幕		PBC2GChampionSendDanmuAsk*/
	export var C2S_WeekChampion_SendDanmuAsk: CmdType = createCmd("C2S_WeekChampion_SendDanmuAsk", 39, 8, true, Pb_God.PBC2GChampionSendDanmuAsk);
	/**请求查询弹幕 PBC2GChampionQueryDanmu	*/
	export var C2S_WeekChampion_QueryDanmuAsk: CmdType = createCmd("C2S_WeekChampion_QueryDanmuAsk", 39, 9, true, Pb_God.PBC2GChampionQueryDanmu);
	/**查询下注信息	*/
	export var C2S_WeekChampion_QueryOddsAsk: CmdType = createCmd("C2S_WeekChampion_QueryOddsAsk", 39, 10, true);
	/**打开	*/
	export var C2S_WeekChampion_OpenAsk: CmdType = createCmd("C2S_WeekChampion_OpenAsk", 39, 11, true);
	/**查看对战信息	PBC2GChampionQueryBattleInfo	*/
	export var C2S_WeekChampion_QueryBattleInfo: CmdType = createCmd("C2S_WeekChampion_QueryBattleInfo", 39, 12, true, Pb_God.PBC2GChampionQueryBattleInfo);
	/**查询对应回合玩家		PBC2GChampionQueryRound*/
	export var C2S_WeekChampion_QueryRound: CmdType = createCmd("C2S_WeekChampion_QueryRound", 39, 13, true, Pb_God.PBC2GChampionQueryRound);
	/**点赞		PBC2GChampionLike*/
	export var C2S_WeekChampion_Like: CmdType = createCmd("C2S_WeekChampion_Like", 39, 14, true, Pb_God.PBC2GChampionLike);
	/**gm开启活动		PBC2GChampionGM*/
	export var C2S_WeekChampion_GmOpt: CmdType = createCmd("C2S_WeekChampion_GmOpt", 39, 30, true, Pb_God.PBC2GChampionGM);
	/**战斗结果返回		*/
	export var C2S_WeekChampion_FightResult: CmdType = createCmd("C2S_WeekChampion_FightResult", 39, 31, true);
	/** 	 放入经验返回                 PBMagicJuiceState*/
	export var S2C_Tablet_PutExp: CmdType = createCmd("S2C_Tablet_PutExp", 40, 1, false, Pb_God.PBMagicJuiceState);
	/**	 收获魔液返回                 PBMagicJuiceState*/
	export var S2C_Tablet_GetMagicJuice: CmdType = createCmd("S2C_Tablet_GetMagicJuice", 40, 2, false, Pb_God.PBMagicJuiceState);
	/**	 放置英雄返回(pos, pet sn)	PBU32U64*/
	export var S2C_Tablet_PutHero: CmdType = createCmd("S2C_Tablet_PutHero", 40, 3, false, Pb_God.PBU32U64);
	/**	 升级晶碑返回(level)		    PBU32*/
	export var S2C_Tablet_Upgrade: CmdType = createCmd("S2C_Tablet_Upgrade", 40, 4, false, Pb_God.PBU32);
	/**	 创造英雄返回(pet sn)		    PBU64*/
	export var S2C_Tablet_Create: CmdType = createCmd("S2C_Tablet_Create", 40, 5, false, Pb_God.PBU64);
	/**     请求魔液状态返回             PBMagicJuiceState*/
	export var S2C_Tablet_MagicJuice: CmdType = createCmd("S2C_Tablet_MagicJuice", 40, 6, false, Pb_God.PBMagicJuiceState);
	/**     取回经验(魔液,exp)           PBU32U64*/
	export var S2C_Tablet_GetBackExp: CmdType = createCmd("S2C_Tablet_GetBackExp", 40, 7, false, Pb_God.PBU32U64);
	/**选择难度(难度 1~10)			PBU32*/
	export var C2S_TeamCampaign_Select: CmdType = createCmd("C2S_TeamCampaign_Select", 40, 1, true, Pb_God.PBU32);
	/**领取额外奖励(序号0 1 2)		PBU32*/
	export var C2S_TeamCampaign_SelectExtraPrize: CmdType = createCmd("C2S_TeamCampaign_SelectExtraPrize", 40, 2, true, Pb_God.PBU32);
	/**查询伙伴状态*/
	export var C2S_TeamCampaign_QueryPetState: CmdType = createCmd("C2S_TeamCampaign_QueryPetState", 40, 3, true);
	/**查询关卡状态*/
	export var C2S_TeamCampaign_QueryStageState: CmdType = createCmd("C2S_TeamCampaign_QueryStageState", 40, 4, true);
	/**查询敌人数据(stage)	PBU32*/
	export var C2S_TeamCampaign_QueryStageTarget: CmdType = createCmd("C2S_TeamCampaign_QueryStageTarget", 40, 5, true, Pb_God.PBU32);
	/**废弃*/
	export var C2S_TeamCampaign_xxxxxxxxxx: CmdType = createCmd("C2S_TeamCampaign_xxxxxxxxxx", 40, 6, true);
	/**失败才返回*/
	export var S2C_WeekChampion_Common_Ack: CmdType = createCmd("S2C_WeekChampion_Common_Ack", 41, 0, false);
	/**我的竞猜返回		PBG2CChampionSelfGuessAck*/
	export var S2C_WeekChampion_SelfGuessAck: CmdType = createCmd("S2C_WeekChampion_SelfGuessAck", 41, 1, false, Pb_God.PBG2CChampionSelfGuessAck);
	/**查询竞猜返回		PBG2CChampionQueryGuessAck*/
	export var S2C_WeekChampion_QueryGuessAck: CmdType = createCmd("S2C_WeekChampion_QueryGuessAck", 41, 2, false, Pb_God.PBG2CChampionQueryGuessAck);
	/**竞猜下注同步返回	PBG2CChampionSynGuessAck*/
	export var S2C_WeekChampion_SysGuessAck: CmdType = createCmd("S2C_WeekChampion_SysGuessAck", 41, 3, false, Pb_God.PBG2CChampionSynGuessAck);
	/**查询32强返回		PBG2CChampionQuery32ListAck*/
	export var S2C_WeekChampion_Query32ListAck: CmdType = createCmd("S2C_WeekChampion_Query32ListAck", 41, 4, false, Pb_God.PBG2CChampionQuery32ListAck);
	/**查询4强返回		PBG2CChampionQuery4ListAck*/
	export var S2C_WeekChampion_Query4ListAck: CmdType = createCmd("S2C_WeekChampion_Query4ListAck", 41, 5, false, Pb_God.PBG2CChampionQuery4ListAck);
	/**我的竞猜记录		PBChampionGuessRecord*/
	export var S2C_WeekChampion_GuessRecordAck: CmdType = createCmd("S2C_WeekChampion_GuessRecordAck", 41, 6, false, Pb_God.PBChampionGuessRecord);
	/**我的战斗记录		PBChampionFightRecord*/
	export var S2C_WeekChampion_FightRecordAck: CmdType = createCmd("S2C_WeekChampion_FightRecordAck", 41, 7, false, Pb_God.PBChampionFightRecord);
	/**发送弹幕返回		无内容*/
	export var S2C_WeekChampion_SendDanmuAck: CmdType = createCmd("S2C_WeekChampion_SendDanmuAck", 41, 8, false);
	/**竞猜结果			PBG2CChampionGuessResultAck*/
	export var S2C_WeekChampion_GuessReusltAck: CmdType = createCmd("S2C_WeekChampion_GuessReusltAck", 41, 9, false, Pb_God.PBG2CChampionGuessResultAck);
	/**查询弹幕返回		PBG2CChampionQueryDanmuAck*/
	export var S2C_WeekChampion_QueryDanmuAck: CmdType = createCmd("S2C_WeekChampion_QueryDanmuAck", 41, 10, false, Pb_God.PBG2CChampionQueryDanmuAck);
	/**打开返回			PBG2CChampionOpenAck*/
	export var S2C_WeekChampion_OpenAck: CmdType = createCmd("S2C_WeekChampion_OpenAck", 41, 11, false, Pb_God.PBG2CChampionOpenAck);
	/**我的结算结果		PBG2CChampionEndResultAck*/
	export var S2C_WeekChampion_EndResultAck: CmdType = createCmd("S2C_WeekChampion_EndResultAck", 41, 12, false, Pb_God.PBG2CChampionEndResultAck);
	/**查看对战信息		PBChampionBattle*/
	export var S2C_WeekChampion_QueryBattleInfo: CmdType = createCmd("S2C_WeekChampion_QueryBattleInfo", 41, 13, false, Pb_God.PBChampionBattle);
	/**同步状态			PBG2CChampionSynState*/
	export var S2C_WeekChampion_SynState: CmdType = createCmd("S2C_WeekChampion_SynState", 41, 14, false, Pb_God.PBG2CChampionSynState);
	/**同步排行结果		PBG2CChampionSynTopResult*/
	export var S2C_WeekChampion_SynTopResult: CmdType = createCmd("S2C_WeekChampion_SynTopResult", 41, 15, false, Pb_God.PBG2CChampionSynTopResult);
	/**查询对应回合数据	PBG2CChampionQueryRoundAck*/
	export var S2C_WeekChampion_QueryRoundAck: CmdType = createCmd("S2C_WeekChampion_QueryRoundAck", 41, 16, false, Pb_God.PBG2CChampionQueryRoundAck);
	/**点赞返回			PBU32U32*/
	export var S2C_WeekChampion_Like: CmdType = createCmd("S2C_WeekChampion_Like", 41, 17, false, Pb_God.PBU32U32);
	/**解锁 PBU32*/
	export var C2S_DragonBall_UnLock: CmdType = createCmd("C2S_DragonBall_UnLock", 41, 0, true, Pb_God.PBU32);
	/**升级	PBU32*/
	export var C2S_DragonBall_Levelup: CmdType = createCmd("C2S_DragonBall_Levelup", 41, 1, true, Pb_God.PBU32);
	/**通用返回(失败才返回)*/
	export var S2C_TeamCampaign_CommonAck: CmdType = createCmd("S2C_TeamCampaign_CommonAck", 42, 1, false);
	/**选择难度返回			PBU32*/
	export var S2C_TeamCampaign_Select: CmdType = createCmd("S2C_TeamCampaign_Select", 42, 2, false, Pb_God.PBU32);
	/**给出三个额外奖励     PBG2CTeamCampaignExtraPrize*/
	export var S2C_TeamCampaign_ExtraPrize: CmdType = createCmd("S2C_TeamCampaign_ExtraPrize", 42, 3, false, Pb_God.PBG2CTeamCampaignExtraPrize);
	/**领取奖励返回 		PBU32*/
	export var S2C_TeamCampaign_SelectExtraPrize: CmdType = createCmd("S2C_TeamCampaign_SelectExtraPrize", 42, 4, false, Pb_God.PBU32);
	/**同步伙伴状态 	    PBG2CTeamCampaignState*/
	export var S2C_TeamCampaign_SyncPet: CmdType = createCmd("S2C_TeamCampaign_SyncPet", 42, 5, false, Pb_God.PBG2CTeamCampaignState);
	/**同步关卡状态 		PBG2CTeamCampaignStage*/
	export var S2C_TeamCampaign_SyncStage: CmdType = createCmd("S2C_TeamCampaign_SyncStage", 42, 6, false, Pb_God.PBG2CTeamCampaignStage);
	/**同步技能		        PBG2CTeamCampaignSkill*/
	export var S2C_TeamCampaign_SyncSkill: CmdType = createCmd("S2C_TeamCampaign_SyncSkill", 42, 7, false, Pb_God.PBG2CTeamCampaignSkill);
	/**同步敌人数据		    PBG2CTeamCampaignTarget*/
	export var S2C_TeamCampaign_SyncTarget: CmdType = createCmd("S2C_TeamCampaign_SyncTarget", 42, 8, false, Pb_God.PBG2CTeamCampaignTarget);
	/**废弃*/
	export var S2C_TeamCampaign_xxxxxxxxx: CmdType = createCmd("S2C_TeamCampaign_xxxxxxxxx", 42, 9, false);
	/**废弃*/
	export var S2C_TeamCampaign_xxxxxxxxxxxxxx: CmdType = createCmd("S2C_TeamCampaign_xxxxxxxxxxxxxx", 42, 10, false);
	/**解锁 */
	export var C2S_Convenant_UnLock: CmdType = createCmd("C2S_Convenant_UnLock", 42, 0, true);
	/**升级	*/
	export var C2S_Convenant_Levelup: CmdType = createCmd("C2S_Convenant_Levelup", 42, 1, true);
	/**选择属性(id, index 1, 2, 3) PBU32U32*/
	export var C2S_Convenant_Attr: CmdType = createCmd("C2S_Convenant_Attr", 42, 2, true, Pb_God.PBU32U32);
	/**计算战斗力(id) PBU32*/
	export var C2S_Convenant_Power: CmdType = createCmd("C2S_Convenant_Power", 42, 3, true, Pb_God.PBU32);
	/**解锁返回 	PBU32*/
	export var S2C_DragonBall_UnLock: CmdType = createCmd("S2C_DragonBall_UnLock", 43, 0, false, Pb_God.PBU32);
	/**升级(type, level) PBU32U32*/
	export var S2C_DragonBall_Levelup: CmdType = createCmd("S2C_DragonBall_Levelup", 43, 1, false, Pb_God.PBU32U32);
	/** 	 许愿请求 PBC2GLotteryRefresh*/
	export var C2S_Lottery_Refresh: CmdType = createCmd("C2S_Lottery_Refresh", 43, 1, true, Pb_God.PBC2GLotteryRefresh);
	/** 	 许愿池设置请求 PBC2GLotteryPoolSet*/
	export var C2S_Lottery_Pool_Set: CmdType = createCmd("C2S_Lottery_Pool_Set", 43, 2, true, Pb_God.PBC2GLotteryPoolSet);
	/**解锁返回 	*/
	export var S2C_Convenant_UnLock: CmdType = createCmd("S2C_Convenant_UnLock", 44, 0, false);
	/**升级返回 (level) PBU32*/
	export var S2C_Convenant_Levelup: CmdType = createCmd("S2C_Convenant_Levelup", 44, 1, false, Pb_God.PBU32);
	/**选择属性返回 (id, index 1, 2, 3) PBU32U32*/
	export var S2C_Convenant_Attr: CmdType = createCmd("S2C_Convenant_Attr", 44, 2, false, Pb_God.PBU32U32);
	/**计算战斗力(id, power) PBU32U32*/
	export var S2C_Convenant_Power: CmdType = createCmd("S2C_Convenant_Power", 44, 3, false, Pb_God.PBU32U32);
	/**往图鉴背包加 PBC2GADDPetAsk*/
	export var C2S_Illustration_addPetAsk: CmdType = createCmd("C2S_Illustration_addPetAsk", 44, 1, true, Pb_God.PBC2GADDPetAsk);
	/**从图鉴背包减	PBC2GRemovePetAsk*/
	export var C2S_Illustration_removePetAsk: CmdType = createCmd("C2S_Illustration_removePetAsk", 44, 2, true, Pb_God.PBC2GRemovePetAsk);
	/** 	 许愿回应 PBG2CLotteryRefresh*/
	export var S2C_Lottery_Refresh: CmdType = createCmd("S2C_Lottery_Refresh", 45, 1, false, Pb_God.PBG2CLotteryRefresh);
	/** 	 许愿池设置请求 PBG2CLotteryPoolSet*/
	export var S2C_Lottery_Pool_Set: CmdType = createCmd("S2C_Lottery_Pool_Set", 45, 2, false, Pb_God.PBG2CLotteryPoolSet);
	/**打开红包 PBC2GOpenRedEnvelopeAsk*/
	export var C2S_RedEnvelope_OpenAsk: CmdType = createCmd("C2S_RedEnvelope_OpenAsk", 45, 1, true, Pb_God.PBC2GOpenRedEnvelopeAsk);
	/**失败才返回*/
	export var S2C_Illustration_Common_Ack: CmdType = createCmd("S2C_Illustration_Common_Ack", 46, 0, false);
	/**往图鉴背包加 PBG2CADDPetAck*/
	export var S2C_Illustration_addPetAck: CmdType = createCmd("S2C_Illustration_addPetAck", 46, 1, false, Pb_God.PBG2CADDPetAck);
	/**从图鉴背包减 PBG2CRemovePetAck*/
	export var S2C_Illustration_removePetAck: CmdType = createCmd("S2C_Illustration_removePetAck", 46, 2, false, Pb_God.PBG2CRemovePetAck);
	/**	刷新 PBG2CFreashIllustration*/
	export var S2C_Illustration_Freash: CmdType = createCmd("S2C_Illustration_Freash", 46, 3, false, Pb_God.PBG2CFreashIllustration);
	/** 	 开始游戏 PBC2GJoyousLinkupStart*/
	export var C2S_JoyousLinkup_Start: CmdType = createCmd("C2S_JoyousLinkup_Start", 46, 1, true, Pb_God.PBC2GJoyousLinkupStart);
	/** 	 连接棋子 PBC2GJoyousLinkupConnect*/
	export var C2S_JoyousLinkup_Connect: CmdType = createCmd("C2S_JoyousLinkup_Connect", 46, 2, true, Pb_God.PBC2GJoyousLinkupConnect);
	/** 	 刷新棋子位置*/
	export var C2S_JoyousLinkup_Refresh: CmdType = createCmd("C2S_JoyousLinkup_Refresh", 46, 3, true);
	/** 	 退出游戏*/
	export var C2S_JoyousLinkup_Quit: CmdType = createCmd("C2S_JoyousLinkup_Quit", 46, 4, true);
	/**失败才返回*/
	export var S2C_RedEnvelope_Common_Ack: CmdType = createCmd("S2C_RedEnvelope_Common_Ack", 47, 0, false);
	/**开启红包 PBG2COpenRedEnvelopeAck*/
	export var S2C_RedEnvelope_OpenAck: CmdType = createCmd("S2C_RedEnvelope_OpenAck", 47, 1, false, Pb_God.PBG2COpenRedEnvelopeAck);
	/**刷新/重置红包 PBG2CRedEnvelopeRefresh*/
	export var S2C_RedEnvelope_Refresh: CmdType = createCmd("S2C_RedEnvelope_Refresh", 47, 2, false, Pb_God.PBG2CRedEnvelopeRefresh);
	/**答题开始，请求题目 */
	export var C2S_Guess_Begin: CmdType = createCmd("C2S_Guess_Begin", 47, 1, true);
	/**发送选择给服务器 PBC2GAnswerAsk*/
	export var C2S_Guess_Answer_Ask: CmdType = createCmd("C2S_Guess_Answer_Ask", 47, 2, true, Pb_God.PBC2GAnswerAsk);
	/**发送退出给服务器 */
	export var C2S_Guess_Exit_Ask: CmdType = createCmd("C2S_Guess_Exit_Ask", 47, 3, true);
	/**请求服务器下一题 */
	export var C2S_Guess_Next: CmdType = createCmd("C2S_Guess_Next", 47, 4, true);
	/** 	 初始信息 PBG2CJoyousLinkupStartInfo*/
	export var S2C_JoyousLinkup_Start_Info: CmdType = createCmd("S2C_JoyousLinkup_Start_Info", 48, 1, false, Pb_God.PBG2CJoyousLinkupStartInfo);
	/** 	 连接棋子返回 PBG2CJoyousLinkupConnectResult*/
	export var S2C_JoyousLinkup_Connect_Result: CmdType = createCmd("S2C_JoyousLinkup_Connect_Result", 48, 2, false, Pb_God.PBG2CJoyousLinkupConnectResult);
	/** 	 棋子位置刷新 PBG2CJoyousLinkupChessData*/
	export var S2C_JoyousLinkup_Info_Chg: CmdType = createCmd("S2C_JoyousLinkup_Info_Chg", 48, 3, false, Pb_God.PBG2CJoyousLinkupChessData);
	/** 	 游戏结束 PBG2CJoyousLinkupEnd*/
	export var S2C_JoyousLinkup_End: CmdType = createCmd("S2C_JoyousLinkup_End", 48, 4, false, Pb_God.PBG2CJoyousLinkupEnd);
	/** 	 退出游戏*/
	export var S2C_JoyousLinkup_Quit: CmdType = createCmd("S2C_JoyousLinkup_Quit", 48, 5, false);
	/** 	 升级*/
	export var C2S_Defend_LevelUp: CmdType = createCmd("C2S_Defend_LevelUp", 48, 1, true);
	/** 	 升阶*/
	export var C2S_Defend_RankUp: CmdType = createCmd("C2S_Defend_RankUp", 48, 2, true);
	/** 	 保存方案         PBDefendPlan*/
	export var C2S_Defend_SavePlan: CmdType = createCmd("C2S_Defend_SavePlan", 48, 3, true, Pb_God.PBDefendPlan);
	/** 	 使用方案         PBC2GDefendUsePlan*/
	export var C2S_Defend_UsePlan: CmdType = createCmd("C2S_Defend_UsePlan", 48, 4, true, Pb_God.PBC2GDefendUsePlan);
	/** 	 解锁方案         PBC2GDefendUnlockPlan*/
	export var C2S_Defend_UnlockPlan: CmdType = createCmd("C2S_Defend_UnlockPlan", 48, 5, true, Pb_God.PBC2GDefendUnlockPlan);
	/** 	 属性预览         PBC2GDefendPreviewAttr*/
	export var C2S_Defend_PreviewAttr: CmdType = createCmd("C2S_Defend_PreviewAttr", 48, 6, true, Pb_God.PBC2GDefendPreviewAttr);
	/** 	 移除某个宠物     PBC2GDefendRemovePet*/
	export var C2S_Defend_RemovePet: CmdType = createCmd("C2S_Defend_RemovePet", 48, 7, true, Pb_God.PBC2GDefendRemovePet);
	/**失败才返回*/
	export var S2C_Guess_Common_Ack: CmdType = createCmd("S2C_Guess_Common_Ack", 49, 0, false);
	/**选择结果 PBG2CAnswerAck*/
	export var S2C_Guess_Answer_Ack: CmdType = createCmd("S2C_Guess_Answer_Ack", 49, 1, false, Pb_God.PBG2CAnswerAck);
	/**问题下发 PBG2CQuestion*/
	export var S2C_Guess_Question: CmdType = createCmd("S2C_Guess_Question", 49, 2, false, Pb_God.PBG2CQuestion);
	/**答题结束 PBG2CExit*/
	export var S2C_Guess_Exit: CmdType = createCmd("S2C_Guess_Exit", 49, 3, false, Pb_God.PBG2CExit);
	/** 	 开启格子			PBC2GResonanceOpenGrid*/
	export var C2S_Resonance_OpenGrid: CmdType = createCmd("C2S_Resonance_OpenGrid", 49, 1, true, Pb_God.PBC2GResonanceOpenGrid);
	/** 	 重置冷却			PBC2GResonanceResetCD*/
	export var C2S_Resonance_ResetCD: CmdType = createCmd("C2S_Resonance_ResetCD", 49, 2, true, Pb_God.PBC2GResonanceResetCD);
	/** 	 放置共鸣			PBC2GResonancePlaceGrid*/
	export var C2S_Resonance_PlaceGrid: CmdType = createCmd("C2S_Resonance_PlaceGrid", 49, 3, true, Pb_God.PBC2GResonancePlaceGrid);
	/** 	 星级共鸣升星 	 PBC2GResonanceUpStar*/
	export var C2S_Resonance_UpStar: CmdType = createCmd("C2S_Resonance_UpStar", 49, 4, true, Pb_God.PBC2GResonanceUpStar);
	/** 	 升级返回 PBG2CDefendLevelUpAsk*/
	export var S2C_Defend_LevelUp_Ask: CmdType = createCmd("S2C_Defend_LevelUp_Ask", 50, 1, false, Pb_God.PBG2CDefendLevelUpAsk);
	/** 	 升阶返回 PBG2CDefendLevelUpAsk*/
	export var S2C_Defend_RankUp_Ask: CmdType = createCmd("S2C_Defend_RankUp_Ask", 50, 2, false, Pb_God.PBG2CDefendLevelUpAsk);
	/** 	 保存方案返回 PBDefendPlan*/
	export var S2C_Defend_SavePlan_Ask: CmdType = createCmd("S2C_Defend_SavePlan_Ask", 50, 3, false, Pb_God.PBDefendPlan);
	/** 	 使用方案返回 PBG2CDefendUsePlanAsk*/
	export var S2C_Defend_UsePlan_Ask: CmdType = createCmd("S2C_Defend_UsePlan_Ask", 50, 4, false, Pb_God.PBG2CDefendUsePlanAsk);
	/** 	 解锁方案返回 PBG2CDefendUnlockPlanAsk*/
	export var S2C_Defend_UnlockPlan_Ask: CmdType = createCmd("S2C_Defend_UnlockPlan_Ask", 50, 5, false, Pb_God.PBG2CDefendUnlockPlanAsk);
	/** 	 属性下发 PBG2CDefendAttr*/
	export var S2C_Defend_Attr: CmdType = createCmd("S2C_Defend_Attr", 50, 6, false, Pb_God.PBG2CDefendAttr);
	/** 	 功能开启下发 PBPlayerDefend*/
	export var S2C_Defend_Open: CmdType = createCmd("S2C_Defend_Open", 50, 7, false, Pb_God.PBPlayerDefend);
	/** 	 属性预览 PBG2CDefendAttr*/
	export var S2C_Defend_PreviewAttr: CmdType = createCmd("S2C_Defend_PreviewAttr", 50, 8, false, Pb_God.PBG2CDefendAttr);
	/** 	 移除某个宠物方案返回 PBG2CDefendPlansChg*/
	export var S2C_Defend_PlansChg: CmdType = createCmd("S2C_Defend_PlansChg", 50, 9, false, Pb_God.PBG2CDefendPlansChg);
	/** 开始孵蛋 PBC2SIncubateEggStart*/
	export var C2S_IncubateEgg_Start: CmdType = createCmd("C2S_IncubateEgg_Start", 50, 1, true, Pb_God.PBC2SIncubateEggStart);
	/** 加速孵化 PBC2SIncubateEggSpeedUp*/
	export var C2S_IncubateEgg_SpeedUp: CmdType = createCmd("C2S_IncubateEgg_SpeedUp", 50, 2, true, Pb_God.PBC2SIncubateEggSpeedUp);
	/** 取消孵化 PBC2SIncubateEggCancel*/
	export var C2S_IncubateEgg_Cancel: CmdType = createCmd("C2S_IncubateEgg_Cancel", 50, 3, true, Pb_God.PBC2SIncubateEggCancel);
	/** 孵蛋破壳 PBC2SIncubateEggPip*/
	export var C2S_IncubateEgg_Pip: CmdType = createCmd("C2S_IncubateEgg_Pip", 50, 4, true, Pb_God.PBC2SIncubateEggPip);
	/** 	 开启格子返回 PBG2CResonanceOpenGrid*/
	export var S2C_Resonance_OpenGrid: CmdType = createCmd("S2C_Resonance_OpenGrid", 51, 1, false, Pb_God.PBG2CResonanceOpenGrid);
	/** 	 重置冷却 PBG2CResonanceGridChg*/
	export var S2C_Resonance_ResetCD: CmdType = createCmd("S2C_Resonance_ResetCD", 51, 2, false, Pb_God.PBG2CResonanceGridChg);
	/** 	 放置共鸣 PBG2CResonanceGridChg*/
	export var S2C_Resonance_PlaceGrid: CmdType = createCmd("S2C_Resonance_PlaceGrid", 51, 3, false, Pb_God.PBG2CResonanceGridChg);
	/** 	 某个共鸣开启 PBPlayerResonanceInfo*/
	export var S2C_Resonance_SystemOpen: CmdType = createCmd("S2C_Resonance_SystemOpen", 51, 4, false, Pb_God.PBPlayerResonanceInfo);
	/** 	 共鸣主体更新 PBG2CResonanceMainPetSn*/
	export var S2C_Resonance_MainPetSn: CmdType = createCmd("S2C_Resonance_MainPetSn", 51, 5, false, Pb_God.PBG2CResonanceMainPetSn);
	/** 	 升星返回 PBG2CResonanceUpStar*/
	export var S2C_Resonance_UpStar: CmdType = createCmd("S2C_Resonance_UpStar", 51, 6, false, Pb_God.PBG2CResonanceUpStar);
	/** 	 购买次数*/
	export var C2S_ActivityBoss_BuyCount: CmdType = createCmd("C2S_ActivityBoss_BuyCount", 51, 1, true);
	/** 	 扫荡*/
	export var C2S_ActivityBoss_Sweep: CmdType = createCmd("C2S_ActivityBoss_Sweep", 51, 2, true);
	/**通用返回,错误码*/
	export var S2C_IncubateEgg_Common: CmdType = createCmd("S2C_IncubateEgg_Common", 52, 1, false);
	/** 开始孵蛋     PBS2CIncubateEggStart*/
	export var S2C_IncubateEgg_Start: CmdType = createCmd("S2C_IncubateEgg_Start", 52, 2, false, Pb_God.PBS2CIncubateEggStart);
	/** 加速孵化     PBS2CIncubateEggSpeedUp*/
	export var S2C_IncubateEgg_SpeedUp: CmdType = createCmd("S2C_IncubateEgg_SpeedUp", 52, 3, false, Pb_God.PBS2CIncubateEggSpeedUp);
	/** 取消孵化     PBS2CIncubateEggCancel*/
	export var S2C_IncubateEgg_Cancel: CmdType = createCmd("S2C_IncubateEgg_Cancel", 52, 4, false, Pb_God.PBS2CIncubateEggCancel);
	/** 孵蛋破壳     PBS2CIncubateEggPip*/
	export var S2C_IncubateEgg_Pip: CmdType = createCmd("S2C_IncubateEgg_Pip", 52, 5, false, Pb_God.PBS2CIncubateEggPip);
	/** 孵化结束同步 PBS2CIncubateEggEndSyn*/
	export var S2C_IncubateEgg_EndSyn: CmdType = createCmd("S2C_IncubateEgg_EndSyn", 52, 6, false, Pb_God.PBS2CIncubateEggEndSyn);
	/** 孵蛋         PBIncubateEggData*/
	export var S2C_IncubateEgg_SynInfo: CmdType = createCmd("S2C_IncubateEgg_SynInfo", 52, 7, false, Pb_God.PBIncubateEggData);
	/** 	 信息改变 PBActivityBossData*/
	export var S2C_ActivityBoss_InfoChg: CmdType = createCmd("S2C_ActivityBoss_InfoChg", 53, 1, false, Pb_God.PBActivityBossData);
	/** 验证请求 	VerifyAsk*/
	export var S2C_Operate_Verify_Ask: CmdType = createCmd("S2C_Operate_Verify_Ask", 255, 0, false);
	/** Ping请求	PingAsk*/
	export var S2C_Operate_Ping_Ask: CmdType = createCmd("S2C_Operate_Ping_Ask", 255, 1, false, Pb_God.PingAsk);
	/** 登录请求	(取CAW PBLoginAsk和CAG PBC2GLoginAsk)*/
	export var S2C_Operate_Login_Ask: CmdType = createCmd("S2C_Operate_Login_Ask", 255, 2, false, Pb_God.PBC2GLoginAsk);
	/** 验证应答	VerifyAck*/
	export var S2C_Operate_Verify_Ack: CmdType = createCmd("S2C_Operate_Verify_Ack", 255, 3, false);
	/** Ping应答	PingAck*/
	export var S2C_Operate_Ping_Ack: CmdType = createCmd("S2C_Operate_Ping_Ack", 255, 4, false, Pb_God.PingAck);
	/** 断开命令 	无内容*/
	export var S2C_Operate_Disconnect: CmdType = createCmd("S2C_Operate_Disconnect", 255, 5, false);
	/** 错误包通知	BadNotify*/
	export var S2C_Operate_Bad_Notify: CmdType = createCmd("S2C_Operate_Bad_Notify", 255, 6, false);
	/** 踢出通知 	无内容*/
	export var S2C_Operate_Kick_Notify: CmdType = createCmd("S2C_Operate_Kick_Notify", 255, 7, false);
	/** 登录应答	(取CAW PBLoginAck 和CAG PBG2CLoginAck)	*/
	export var S2C_Operate_Login_Ack: CmdType = createCmd("S2C_Operate_Login_Ack", 255, 8, false, Pb_God.PBG2CLoginAck);
	/** 读取超时		无内容*/
	export var S2C_Operate_TimeoutRead: CmdType = createCmd("S2C_Operate_TimeoutRead", 255, 9, false);
	/** 写入超时	无内容*/
	export var S2C_Operate_TimeoutWrite: CmdType = createCmd("S2C_Operate_TimeoutWrite", 255, 10, false);
	/** 关服通知   (取CAW PBCloseServerData)*/
	export var S2C_Operate_CloseServer: CmdType = createCmd("S2C_Operate_CloseServer", 255, 11, false, Pb_God.PBCloseServerData);
	/** 验证请求 	VerifyAsk*/
	export var C2S_Operate_Verify_Ask: CmdType = createCmd("C2S_Operate_Verify_Ask", 255, 0, true);
	/** Ping请求	PingAsk*/
	export var C2S_Operate_Ping_Ask: CmdType = createCmd("C2S_Operate_Ping_Ask", 255, 1, true, Pb_God.PingAsk);
	/** 登录请求	(取CAW PBLoginAsk和CAG PBC2GLoginAsk)*/
	export var C2S_Operate_Login_Ask: CmdType = createCmd("C2S_Operate_Login_Ask", 255, 2, true, Pb_God.PBC2GLoginAsk);
	/** 验证应答	VerifyAck*/
	export var C2S_Operate_Verify_Ack: CmdType = createCmd("C2S_Operate_Verify_Ack", 255, 3, true);
	/** Ping应答	PingAck*/
	export var C2S_Operate_Ping_Ack: CmdType = createCmd("C2S_Operate_Ping_Ack", 255, 4, true, Pb_God.PingAck);
	/** 断开命令 	无内容*/
	export var C2S_Operate_Disconnect: CmdType = createCmd("C2S_Operate_Disconnect", 255, 5, true);
	/** 错误包通知	BadNotify*/
	export var C2S_Operate_Bad_Notify: CmdType = createCmd("C2S_Operate_Bad_Notify", 255, 6, true);
	/** 踢出通知 	无内容*/
	export var C2S_Operate_Kick_Notify: CmdType = createCmd("C2S_Operate_Kick_Notify", 255, 7, true);
	/** 登录应答	(取CAW PBLoginAck 和CAG PBG2CLoginAck)	*/
	export var C2S_Operate_Login_Ack: CmdType = createCmd("C2S_Operate_Login_Ack", 255, 8, true, Pb_God.PBG2CLoginAck);
	/** 读取超时		无内容*/
	export var C2S_Operate_TimeoutRead: CmdType = createCmd("C2S_Operate_TimeoutRead", 255, 9, true);
	/** 写入超时	无内容*/
	export var C2S_Operate_TimeoutWrite: CmdType = createCmd("C2S_Operate_TimeoutWrite", 255, 10, true);

	function createCmd(name: string, main: number, sub: number, isSend: boolean, pb: any = null): CmdType
	{
		var cmd: CmdType = new CmdType(name, main, sub, isSend, pb);
		cmdDic[cmd.key] = cmd;
		return cmd;
	}

	function getCmd(main: number, sub: number, isSend: boolean): CmdType
	{
		return getCmdByKey(main + "_ " + sub + "_" + isSend);
	}

	function getCmdByKey(key: string): CmdType
	{
		return cmdDic[key];
	}

}
