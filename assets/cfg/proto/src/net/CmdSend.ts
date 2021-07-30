
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


module Pro.PlayerSend
{
	/**
	* 通用无内容
	*/
	export function common()
	{
		CmdMgr.pushCmd(Cmd.C2S_Player_Common);
	}

}
module Pro.CommonSend
{
	/**
	* 前端准备就绪
	*/
	export function go()
	{
		CmdMgr.pushCmd(Cmd.C2S_Common_Go);
	}

	/**
	* 保存数据请求		PBClientData
	*
	* @param saveorder	uint32	序列号
	* @param clientdata	string	前端数据
	*/
	export function clientSave(saveorder: number, clientdata: string)
	{
		let sendParam: Pb_God.PBClientData = new Pb_God.PBClientData();
		sendParam.saveorder = saveorder;
		sendParam.clientdata = clientdata;
		CmdMgr.pushCmd(Cmd.C2S_Common_ClientSave, sendParam);
	}

	/**
	* 文本命令			PBC2GGMCmdTxtCmd
	*
	* @param callbackid	uint64	回调id
	* @param param	string	参数
	*/
	export function gMCmd(callbackid: Long, param: string)
	{
		let sendParam: Pb_God.PBC2GGMCmdTxtCmd = new Pb_God.PBC2GGMCmdTxtCmd();
		sendParam.callbackid = callbackid;
		sendParam.param = param;
		CmdMgr.pushCmd(Cmd.C2S_Common_GMCmd, sendParam);
	}

	/**
	* 查询玩家			PBC2GQueryPlayerView
	*
	* @param playerid	uint32	玩家ID
	* @param logicworldid	uint32	逻辑世界ID
	* @param srplayerid	uint32	源玩家ID
	* @param srlogicworldid	uint32	源世界ID
	* @param viewtype	uint32	查询类型_emQueryPlayerViewType
	*/
	export function queryPlayerView(playerid: number, logicworldid: number, srplayerid: number, srlogicworldid: number, viewtype: number)
	{
		let sendParam: Pb_God.PBC2GQueryPlayerView = new Pb_God.PBC2GQueryPlayerView();
		sendParam.playerid = playerid;
		sendParam.logicworldid = logicworldid;
		sendParam.srplayerid = srplayerid;
		sendParam.srlogicworldid = srlogicworldid;
		sendParam.viewtype = viewtype;
		CmdMgr.pushCmd(Cmd.C2S_Common_QueryPlayerView, sendParam);
	}

	/**
	* 查询玩家伙伴		PBC2GQueryPetView
	*
	* @param playerid	uint32	玩家ID
	* @param logicworldid	uint32	逻辑世界ID
	* @param petsn	uint64	伙伴SN
	* @param srplayerid	uint32	源玩家ID
	* @param srlogicworldid	uint32	源世界ID
	*/
	export function queryPetView(playerid: number, logicworldid: number, petsn: Long, srplayerid: number, srlogicworldid: number)
	{
		let sendParam: Pb_God.PBC2GQueryPetView = new Pb_God.PBC2GQueryPetView();
		sendParam.playerid = playerid;
		sendParam.logicworldid = logicworldid;
		sendParam.petsn = petsn;
		sendParam.srplayerid = srplayerid;
		sendParam.srlogicworldid = srlogicworldid;
		CmdMgr.pushCmd(Cmd.C2S_Common_QueryPetView, sendParam);
	}

	/**
	* 重命名			PBPlayerRename
	*
	* @param name	string	角色名
	* @param gender	uint32	性别
	*/
	export function playerRename(name: string, gender: number)
	{
		let sendParam: Pb_God.PBPlayerRename = new Pb_God.PBPlayerRename();
		sendParam.name = name;
		sendParam.gender = gender;
		CmdMgr.pushCmd(Cmd.C2S_Common_PlayerRename, sendParam);
	}

	/**
	* 查询跨服组
	*/
	export function queryBigWorldGroup()
	{
		CmdMgr.pushCmd(Cmd.C2S_Common_QueryBigWorldGroup);
	}

	/**
	* 查询玩家名称	PBC2GCommonFindPlayerName
	*
	* @param name	string	角色名
	*/
	export function findPlayerName(name: string)
	{
		let sendParam: Pb_God.PBC2GCommonFindPlayerName = new Pb_God.PBC2GCommonFindPlayerName();
		sendParam.name = name;
		CmdMgr.pushCmd(Cmd.C2S_Common_FindPlayerName, sendParam);
	}

	/**
	* 查询世界等级
	*/
	export function queryWorldLevel()
	{
		CmdMgr.pushCmd(Cmd.C2S_Common_QueryWorldLevel);
	}

	/**
	* 保存个人空间背景PBU32
	*
	* @param value	uint32
	*/
	export function setBackground(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Common_SetBackground, sendParam);
	}

	/**
	* 设置展示的英雄PBG2CCommonShowPets
	*
	* @param sn	uint64	sn
	*/
	export function setShowPets(sn: Long[])
	{
		let sendParam: Pb_God.PBG2CCommonShowPets = new Pb_God.PBG2CCommonShowPets();
		sendParam.sn = sn;
		CmdMgr.pushCmd(Cmd.C2S_Common_SetShowPets, sendParam);
	}

	/**
	* 关注(worldid,playerid)PBU32U32
	*
	* @param key	uint32
	* @param value	uint32
	*/
	export function follow(key: number, value: number)
	{
		let sendParam: Pb_God.PBU32U32 = new Pb_God.PBU32U32();
		sendParam.key = key;
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Common_Follow, sendParam);
	}

	/**
	* 取消关注(worldid,playerid)PBU32U32
	*
	* @param key	uint32
	* @param value	uint32
	*/
	export function unFollow(key: number, value: number)
	{
		let sendParam: Pb_God.PBU32U32 = new Pb_God.PBU32U32();
		sendParam.key = key;
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Common_UnFollow, sendParam);
	}

	/**
	* 设置切磋需要验证(1需要0不需要)PBU32
	*
	* @param value	uint32
	*/
	export function setFEONeedConfirm(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Common_SetFEONeedConfirm, sendParam);
	}

	/**
	* 发出切磋的请求PBC2GCommonFightRequest
	*
	* @param worldid	uint32	切磋目标worldid
	* @param playerid	uint32	切磋目标playerid
	*/
	export function fightEachOtherRequest(worldid: number, playerid: number)
	{
		let sendParam: Pb_God.PBC2GCommonFightRequest = new Pb_God.PBC2GCommonFightRequest();
		sendParam.worldid = worldid;
		sendParam.playerid = playerid;
		CmdMgr.pushCmd(Cmd.C2S_Common_FightEachOtherRequest, sendParam);
	}

	/**
	* 切磋验证回复PBC2GCommonFightReply
	*
	* @param worldid	uint32	对方的worldid
	* @param playerid	uint32	对方的playerid
	* @param reply	bool	答复
	*/
	export function fightEachOtherReply(worldid: number, playerid: number, reply: boolean)
	{
		let sendParam: Pb_God.PBC2GCommonFightReply = new Pb_God.PBC2GCommonFightReply();
		sendParam.worldid = worldid;
		sendParam.playerid = playerid;
		sendParam.reply = reply;
		CmdMgr.pushCmd(Cmd.C2S_Common_FightEachOtherReply, sendParam);
	}

	/**
	* 使用邀请码PBString
	*
	* @param value	string
	*/
	export function useInviteCode(value: string)
	{
		let sendParam: Pb_God.PBString = new Pb_God.PBString();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Common_UseInviteCode, sendParam);
	}

	/**
	* 领取邀请奖励(成就ID)PBU32
	*
	* @param value	uint32
	*/
	export function invitePrize(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Common_InvitePrize, sendParam);
	}

	/**
	* 请求校验PBC2GCommonSign
	*
	* @param type	uint32	类型_emSignType
	* @param params	string	请求的参数根据_emSignType里的注释
	*/
	export function sign(type: number, params: string[])
	{
		let sendParam: Pb_God.PBC2GCommonSign = new Pb_God.PBC2GCommonSign();
		sendParam.type = type;
		sendParam.params = params;
		CmdMgr.pushCmd(Cmd.C2S_Common_Sign, sendParam);
	}

	/**
	* 请求全服物品记录(_emWorldItemLogType)PBU32
	*
	* @param value	uint32
	*/
	export function worldItemLog(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Common_WorldItemLog, sendParam);
	}

	/**
	* 领取问卷奖励PBU32
	*
	* @param value	uint32
	*/
	export function surveyPrize(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Common_SurveyPrize, sendParam);
	}

	/**
	* 开启系统奖励PBU32
	*
	* @param value	uint32
	*/
	export function systemSwitchPrize(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Common_SystemSwitchPrize, sendParam);
	}

	/**
	* 简单通用奖励PBU32
	*
	* @param value	uint32
	*/
	export function prize(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Common_Prize, sendParam);
	}

	/**
	* 玩家举报日志PBC2GCommonReportLog
	*
	* @param ReportPlayerID	uint32	举报玩家ID
	* @param ReportPlayerName	string	举报玩家姓名
	* @param ReportPlayerServerID	uint32	举报玩家服务器ID
	* @param Reason	string	举报理由
	* @param Explain	string	解释
	* @param Proof	string	举报证据
	*/
	export function reportLog(ReportPlayerID: number, ReportPlayerName: string, ReportPlayerServerID: number, Reason: string, Explain: string, Proof: string)
	{
		let sendParam: Pb_God.PBC2GCommonReportLog = new Pb_God.PBC2GCommonReportLog();
		sendParam.ReportPlayerID = ReportPlayerID;
		sendParam.ReportPlayerName = ReportPlayerName;
		sendParam.ReportPlayerServerID = ReportPlayerServerID;
		sendParam.Reason = Reason;
		sendParam.Explain = Explain;
		sendParam.Proof = Proof;
		CmdMgr.pushCmd(Cmd.C2S_Common_ReportLog, sendParam);
	}

	/**
	* 玩家引导日志	PBC2GCommonGuideLog
	*
	* @param GuideID	uint32	引导ID
	*/
	export function guideLog(GuideID: number)
	{
		let sendParam: Pb_God.PBC2GCommonGuideLog = new Pb_God.PBC2GCommonGuideLog();
		sendParam.GuideID = GuideID;
		CmdMgr.pushCmd(Cmd.C2S_Common_GuideLog, sendParam);
	}

	/**
	* 玩家问卷调查日志	PBC2GCommonSurveyLog
	*
	* @param QuestionID	uint32	问题ID
	* @param Question	string	问题
	* @param Answer	string	答案
	*/
	export function surveyLog(QuestionID: number, Question: string, Answer: string)
	{
		let sendParam: Pb_God.PBC2GCommonSurveyLog = new Pb_God.PBC2GCommonSurveyLog();
		sendParam.QuestionID = QuestionID;
		sendParam.Question = Question;
		sendParam.Answer = Answer;
		CmdMgr.pushCmd(Cmd.C2S_Common_SurveyLog, sendParam);
	}

}
module Pro.CopymapSend
{
	/**
	* 扫荡	PBU32
	*
	* @param value	uint32
	*/
	export function sweep(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Copymap_Sweep, sendParam);
	}

	/**
	* 购买次数PBU32
	*
	* @param value	uint32
	*/
	export function buyCount(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Copymap_BuyCount, sendParam);
	}

}
module Pro.PetSend
{
	/**
	* 设置阵法		PBPlayerZhenfaInfo
	*
	* @param type	uint32	阵法类型_emZhenfaType
	* @param id	uint32	阵法IDcs_pet表中阵法
	* @param posdata	PBPlayerZhenfaPos	位置伙伴key:位置value:伙伴sn
	* @param artifactid	uint32	神器ID
	*/
	export function set_Zhenfa_Ask(type: number, id: number, posdata: any[], artifactid: number)
	{
		let sendParam: Pb_God.PBPlayerZhenfaInfo = new Pb_God.PBPlayerZhenfaInfo();
		sendParam.type = type;
		sendParam.id = id;
		sendParam.posdata = posdata;
		sendParam.artifactid = artifactid;
		CmdMgr.pushCmd(Cmd.C2S_Pet_Set_Zhenfa_Ask, sendParam);
	}

	/**
	* 伙伴升级		PBC2GPet_UpLevel_Ask
	*
	* @param sn	uint64	伙伴sn
	* @param addlevel	uint32	级数
	*/
	export function upLevel_Ask(sn: Long, addlevel: number)
	{
		let sendParam: Pb_God.PBC2GPet_UpLevel_Ask = new Pb_God.PBC2GPet_UpLevel_Ask();
		sendParam.sn = sn;
		sendParam.addlevel = addlevel;
		CmdMgr.pushCmd(Cmd.C2S_Pet_UpLevel_Ask, sendParam);
	}

	/**
	* 伙伴升阶		PBCAGPet_Advance
	*
	* @param sn	uint64	伙伴sn
	* @param advancelevel	uint32	伙伴当前阶数
	* @param bshow	bool	是否显示突破成功界面
	*/
	export function advance_Ask(sn: Long, advancelevel: number, bshow: boolean)
	{
		let sendParam: Pb_God.PBCAGPet_Advance = new Pb_God.PBCAGPet_Advance();
		sendParam.sn = sn;
		sendParam.advancelevel = advancelevel;
		sendParam.bshow = bshow;
		CmdMgr.pushCmd(Cmd.C2S_Pet_Advance_Ask, sendParam);
	}

	/**
	* 伙伴升星		PBC2GPet_UpStar
	*
	* @param sn	uint64	要升星的伙伴
	* @param expendsn	uint64	消耗的伙伴
	* @param items	PBItemSnCount	消耗的道具
	*/
	export function upStar_Ask(sn: Long, expendsn: Long[], items: any[])
	{
		let sendParam: Pb_God.PBC2GPet_UpStar = new Pb_God.PBC2GPet_UpStar();
		sendParam.sn = sn;
		sendParam.expendsn = expendsn;
		sendParam.items = items;
		CmdMgr.pushCmd(Cmd.C2S_Pet_UpStar_Ask, sendParam);
	}

	/**
	* 穿戴装备		PBCAGPet_Equip
	*
	* @param sn	uint64	伙伴sn
	* @param equiptype	uint32	部位类型
	* @param equipid	uint32	装备ID
	*/
	export function equip_Ask(sn: Long, equiptype: number, equipid: number)
	{
		let sendParam: Pb_God.PBCAGPet_Equip = new Pb_God.PBCAGPet_Equip();
		sendParam.sn = sn;
		sendParam.equiptype = equiptype;
		sendParam.equipid = equipid;
		CmdMgr.pushCmd(Cmd.C2S_Pet_Equip_Ask, sendParam);
	}

	/**
	* 一键穿脱装备	PBC2GPet_AutoEquip
	*
	* @param sn	uint64	伙伴sn
	* @param isequip	bool	是否穿戴
	*/
	export function autoEquip_Ask(sn: Long, isequip: boolean)
	{
		let sendParam: Pb_God.PBC2GPet_AutoEquip = new Pb_God.PBC2GPet_AutoEquip();
		sendParam.sn = sn;
		sendParam.isequip = isequip;
		CmdMgr.pushCmd(Cmd.C2S_Pet_AutoEquip_Ask, sendParam);
	}

	/**
	* 伙伴加锁		PBCAGPet_Lock
	*
	* @param sn	uint64	伙伴sn
	* @param islock	bool	是否加锁
	*/
	export function lock_Ask(sn: Long, islock: boolean)
	{
		let sendParam: Pb_God.PBCAGPet_Lock = new Pb_God.PBCAGPet_Lock();
		sendParam.sn = sn;
		sendParam.islock = islock;
		CmdMgr.pushCmd(Cmd.C2S_Pet_Lock_Ask, sendParam);
	}

	/**
	* 穿戴符文		PBCAGPet_RuneEquip
	*
	* @param sn	uint64	伙伴sn
	* @param pos	uint32	部位
	* @param itemsn	uint64	穿戴的道具0表示脱下
	*/
	export function runeEquip_Ask(sn: Long, pos: number, itemsn: Long)
	{
		let sendParam: Pb_God.PBCAGPet_RuneEquip = new Pb_God.PBCAGPet_RuneEquip();
		sendParam.sn = sn;
		sendParam.pos = pos;
		sendParam.itemsn = itemsn;
		CmdMgr.pushCmd(Cmd.C2S_Pet_RuneEquip_Ask, sendParam);
	}

	/**
	* 天赋领悟		PBCAGPet_Talent
	*
	* @param sn	uint64	伙伴sn
	* @param pos	uint32	部位
	* @param skillindex	uint32	技能索引
	*/
	export function learnTalent_Ask(sn: Long, pos: number, skillindex: number)
	{
		let sendParam: Pb_God.PBCAGPet_Talent = new Pb_God.PBCAGPet_Talent();
		sendParam.sn = sn;
		sendParam.pos = pos;
		sendParam.skillindex = skillindex;
		CmdMgr.pushCmd(Cmd.C2S_Pet_LearnTalent_Ask, sendParam);
	}

	/**
	* 天赋遗忘		PBCAGPet_Talent
	*
	* @param sn	uint64	伙伴sn
	* @param pos	uint32	部位
	* @param skillindex	uint32	技能索引
	*/
	export function delTalent_Ask(sn: Long, pos: number, skillindex: number)
	{
		let sendParam: Pb_God.PBCAGPet_Talent = new Pb_God.PBCAGPet_Talent();
		sendParam.sn = sn;
		sendParam.pos = pos;
		sendParam.skillindex = skillindex;
		CmdMgr.pushCmd(Cmd.C2S_Pet_DelTalent_Ask, sendParam);
	}

	/**
	* 天赋升级	PBCAGPet_Talent
	*
	* @param sn	uint64	伙伴sn
	* @param pos	uint32	部位
	* @param skillindex	uint32	技能索引
	*/
	export function upgradeTalent_Ask(sn: Long, pos: number, skillindex: number)
	{
		let sendParam: Pb_God.PBCAGPet_Talent = new Pb_God.PBCAGPet_Talent();
		sendParam.sn = sn;
		sendParam.pos = pos;
		sendParam.skillindex = skillindex;
		CmdMgr.pushCmd(Cmd.C2S_Pet_UpgradeTalent_Ask, sendParam);
	}

	/**
	* 购买背包	PBCAGPet_BuyBag
	*
	* @param totalbuyspace	uint32	总购买空间
	*/
	export function buyBag_Ask(totalbuyspace: number)
	{
		let sendParam: Pb_God.PBCAGPet_BuyBag = new Pb_God.PBCAGPet_BuyBag();
		sendParam.totalbuyspace = totalbuyspace;
		CmdMgr.pushCmd(Cmd.C2S_Pet_BuyBag_Ask, sendParam);
	}

	/**
	* 伙伴分解	PBC2GPet_Split
	*
	* @param sn	uint64	伙伴
	*/
	export function split_Ask(sn: Long[])
	{
		let sendParam: Pb_God.PBC2GPet_Split = new Pb_God.PBC2GPet_Split();
		sendParam.sn = sn;
		CmdMgr.pushCmd(Cmd.C2S_Pet_Split_Ask, sendParam);
	}

	/**
	* 设置皮肤	PBCAGPet_SetSkin
	*
	* @param sn	uint64	伙伴
	* @param skinid	uint32	皮肤ID
	*/
	export function setSkin_Ask(sn: Long, skinid: number)
	{
		let sendParam: Pb_God.PBCAGPet_SetSkin = new Pb_God.PBCAGPet_SetSkin();
		sendParam.sn = sn;
		sendParam.skinid = skinid;
		CmdMgr.pushCmd(Cmd.C2S_Pet_SetSkin_Ask, sendParam);
	}

	/**
	* 穿戴神装	PBCAGPet_GodEquip
	*
	* @param sn	uint64	伙伴sn
	* @param pos	uint32	部位
	* @param itemsn	uint64	穿戴的道具0表示脱下
	*/
	export function godEquip_Ask(sn: Long, pos: number, itemsn: Long)
	{
		let sendParam: Pb_God.PBCAGPet_GodEquip = new Pb_God.PBCAGPet_GodEquip();
		sendParam.sn = sn;
		sendParam.pos = pos;
		sendParam.itemsn = itemsn;
		CmdMgr.pushCmd(Cmd.C2S_Pet_GodEquip_Ask, sendParam);
	}

	/**
	* 一键脱下神装	PBU64
	*
	* @param value	uint64
	*/
	export function godUnEquipOneKey_Ask(value: Long)
	{
		let sendParam: Pb_God.PBU64 = new Pb_God.PBU64();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Pet_GodUnEquipOneKey_Ask, sendParam);
	}

	/**
	* 开启套装格子PBU32
	*
	* @param value	uint32
	*/
	export function godSuit_OpenAsk(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Pet_GodSuit_OpenAsk, sendParam);
	}

	/**
	* 保存套装方案PBC2GPet_GodSuitSaveAsk
	*
	* @param petsn	uint64	伙伴sn
	* @param id	uint32	方案ID
	*/
	export function godSuit_SaveAsk(petsn: Long, id: number)
	{
		let sendParam: Pb_God.PBC2GPet_GodSuitSaveAsk = new Pb_God.PBC2GPet_GodSuitSaveAsk();
		sendParam.petsn = petsn;
		sendParam.id = id;
		CmdMgr.pushCmd(Cmd.C2S_Pet_GodSuit_SaveAsk, sendParam);
	}

	/**
	* 穿戴套装	PBC2GPet_GodSuitEquipAsk
	*
	* @param id	uint32	方案ID
	* @param pos	uint32	部位
	* @param itemsn	uint64	穿戴的道具0表示脱下
	*/
	export function godSuit_EquipAsk(id: number, pos: number, itemsn: Long)
	{
		let sendParam: Pb_God.PBC2GPet_GodSuitEquipAsk = new Pb_God.PBC2GPet_GodSuitEquipAsk();
		sendParam.id = id;
		sendParam.pos = pos;
		sendParam.itemsn = itemsn;
		CmdMgr.pushCmd(Cmd.C2S_Pet_GodSuit_EquipAsk, sendParam);
	}

	/**
	* 套装方案改名	PBC2GPet_GodSuitRenameAsk
	*
	* @param id	uint32	方案ID
	* @param name	string	方案名称
	*/
	export function godSuit_RenameAsk(id: number, name: string)
	{
		let sendParam: Pb_God.PBC2GPet_GodSuitRenameAsk = new Pb_God.PBC2GPet_GodSuitRenameAsk();
		sendParam.id = id;
		sendParam.name = name;
		CmdMgr.pushCmd(Cmd.C2S_Pet_GodSuit_RenameAsk, sendParam);
	}

	/**
	* 装配套装方案	PBC2GPet_GodSuitSaveAsk
	*
	* @param petsn	uint64	伙伴sn
	* @param id	uint32	方案ID
	*/
	export function godSuit_SaveEquipAsk(petsn: Long, id: number)
	{
		let sendParam: Pb_God.PBC2GPet_GodSuitSaveAsk = new Pb_God.PBC2GPet_GodSuitSaveAsk();
		sendParam.petsn = petsn;
		sendParam.id = id;
		CmdMgr.pushCmd(Cmd.C2S_Pet_GodSuit_SaveEquipAsk, sendParam);
	}

	/**
	* 查询伙伴评分	PBU64
	*
	* @param value	uint64
	*/
	export function queryScore(value: Long)
	{
		let sendParam: Pb_God.PBU64 = new Pb_God.PBU64();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Pet_QueryScore, sendParam);
	}

	/**
	* 进阶属性预览	PBU64
	*
	* @param value	uint64
	*/
	export function advancePreview(value: Long)
	{
		let sendParam: Pb_God.PBU64 = new Pb_God.PBU64();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Pet_AdvancePreview, sendParam);
	}

	/**
	* 升星属性预览	PBU64
	*
	* @param value	uint64
	*/
	export function upStarPreview(value: Long)
	{
		let sendParam: Pb_God.PBU64 = new Pb_God.PBU64();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Pet_UpStarPreview, sendParam);
	}

	/**
	* 置换		PBCAGPet_Replace
	*
	* @param sn	uint64	7星以上基础伙伴sn
	* @param material	uint64	5星材料
	*/
	export function replace_Ask(sn: Long, material: Long[])
	{
		let sendParam: Pb_God.PBCAGPet_Replace = new Pb_God.PBCAGPet_Replace();
		sendParam.sn = sn;
		sendParam.material = material;
		CmdMgr.pushCmd(Cmd.C2S_Pet_Replace_Ask, sendParam);
	}

	/**
	* 回退		PBU64
	*
	* @param value	uint64
	*/
	export function degenerate_Ask(value: Long)
	{
		let sendParam: Pb_God.PBU64 = new Pb_God.PBU64();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Pet_Degenerate_Ask, sendParam);
	}

	/**
	* 神装预览	PBU64
	*
	* @param value	uint64
	*/
	export function godEquipPreview(value: Long)
	{
		let sendParam: Pb_God.PBU64 = new Pb_God.PBU64();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Pet_GodEquipPreview, sendParam);
	}

	/**
	* 重生		PBU64
	*
	* @param value	uint64
	*/
	export function reborn(value: Long)
	{
		let sendParam: Pb_God.PBU64 = new Pb_God.PBU64();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Pet_Reborn, sendParam);
	}

	/**
	* 购买重生次数
	*/
	export function buyRebornCount()
	{
		CmdMgr.pushCmd(Cmd.C2S_Pet_BuyRebornCount);
	}

	/**
	* 卸载套装(id,petsn)	PBU32U64
	*
	* @param key	uint32
	* @param value	uint64
	*/
	export function godSuit_Unload(key: number, value: Long)
	{
		let sendParam: Pb_God.PBU32U64 = new Pb_God.PBU32U64();
		sendParam.key = key;
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Pet_GodSuit_Unload, sendParam);
	}

	/**
	* 吞噬		PBC2GPet_UpStar
	*
	* @param sn	uint64	要升星的伙伴
	* @param expendsn	uint64	消耗的伙伴
	* @param items	PBItemSnCount	消耗的道具
	*/
	export function swallow(sn: Long, expendsn: Long[], items: any[])
	{
		let sendParam: Pb_God.PBC2GPet_UpStar = new Pb_God.PBC2GPet_UpStar();
		sendParam.sn = sn;
		sendParam.expendsn = expendsn;
		sendParam.items = items;
		CmdMgr.pushCmd(Cmd.C2S_Pet_Swallow, sendParam);
	}

	/**
	* 高星重生		PBU64
	*
	* @param value	uint64
	*/
	export function highStarReborn(value: Long)
	{
		let sendParam: Pb_God.PBU64 = new Pb_God.PBU64();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Pet_HighStarReborn, sendParam);
	}

	/**
	* 进化PBC2GPet_Evolve_Ask
	*
	* @param sn	uint64	伙伴sn
	* @param isevolve	bool	是否进化形态
	*/
	export function evolve_Ask(sn: Long, isevolve: boolean)
	{
		let sendParam: Pb_God.PBC2GPet_Evolve_Ask = new Pb_God.PBC2GPet_Evolve_Ask();
		sendParam.sn = sn;
		sendParam.isevolve = isevolve;
		CmdMgr.pushCmd(Cmd.C2S_Pet_Evolve_Ask, sendParam);
	}

	/**
	* 魂器觉醒PBC2GHorcruxAwake
	*
	* @param sn	uint64	伙伴sn
	*/
	export function horcrux_Awake(sn: Long)
	{
		let sendParam: Pb_God.PBC2GHorcruxAwake = new Pb_God.PBC2GHorcruxAwake();
		sendParam.sn = sn;
		CmdMgr.pushCmd(Cmd.C2S_Pet_Horcrux_Awake, sendParam);
	}

	/**
	* 魂器强化PBC2GHorcruxLevelUp
	*
	* @param sn	uint64	伙伴sn
	*/
	export function horcrux_LevelUp(sn: Long)
	{
		let sendParam: Pb_God.PBC2GHorcruxLevelUp = new Pb_God.PBC2GHorcruxLevelUp();
		sendParam.sn = sn;
		CmdMgr.pushCmd(Cmd.C2S_Pet_Horcrux_LevelUp, sendParam);
	}

	/**
	* 领取档案奖励PBU32
	*
	* @param value	uint32
	*/
	export function getPetAchivesReward(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Pet_GetPetAchivesReward, sendParam);
	}

}
module Pro.ItemSend
{
	/**
	* 	使用道具				PBC2GUseItem
	*
	* @param itemsnid	uint64	道具SN
	* @param itemcount	uint32	道具个数
	*/
	export function use(itemsnid: Long, itemcount: number)
	{
		let sendParam: Pb_God.PBC2GUseItem = new Pb_God.PBC2GUseItem();
		sendParam.itemsnid = itemsnid;
		sendParam.itemcount = itemcount;
		CmdMgr.pushCmd(Cmd.C2S_Item_Use, sendParam);
	}

	/**
	* 	装备合成				PBCAGItemCompound
	*
	* @param itemid	uint32	道具
	* @param itemcount	uint32	道具数量
	*/
	export function equipCompound(itemid: number, itemcount: number)
	{
		let sendParam: Pb_God.PBCAGItemCompound = new Pb_God.PBCAGItemCompound();
		sendParam.itemid = itemid;
		sendParam.itemcount = itemcount;
		CmdMgr.pushCmd(Cmd.C2S_Item_EquipCompound, sendParam);
	}

	/**
	* 	装备一键合成			PBC2GEquipAutoCompound
	*
	* @param equiptype	uint32	装备类型_emEquipType
	*/
	export function equipAutoCompound(equiptype: number)
	{
		let sendParam: Pb_God.PBC2GEquipAutoCompound = new Pb_God.PBC2GEquipAutoCompound();
		sendParam.equiptype = equiptype;
		CmdMgr.pushCmd(Cmd.C2S_Item_EquipAutoCompound, sendParam);
	}

	/**
	* 	符文合成				PBC2GRuneCompound
	*
	* @param itemid	uint32	道具id
	* @param runesn	uint64	符文SN
	*/
	export function runeCompound(itemid: number, runesn: Long[])
	{
		let sendParam: Pb_God.PBC2GRuneCompound = new Pb_God.PBC2GRuneCompound();
		sendParam.itemid = itemid;
		sendParam.runesn = runesn;
		CmdMgr.pushCmd(Cmd.C2S_Item_RuneCompound, sendParam);
	}

	/**
	* 	伙伴合成				PBC2GPetCompound
	*
	* @param itemsn	uint64	道具SN
	* @param itemcount	uint32	合成的数量
	*/
	export function petCompound(itemsn: Long, itemcount: number)
	{
		let sendParam: Pb_God.PBC2GPetCompound = new Pb_God.PBC2GPetCompound();
		sendParam.itemsn = itemsn;
		sendParam.itemcount = itemcount;
		CmdMgr.pushCmd(Cmd.C2S_Item_PetCompound, sendParam);
	}

	/**
	* 	道具出售				PBC2GItemSell
	*
	* @param itemsn	uint64	道具SN
	* @param itemcount	uint32	道具数量
	*/
	export function sell(itemsn: Long, itemcount: number)
	{
		let sendParam: Pb_God.PBC2GItemSell = new Pb_God.PBC2GItemSell();
		sendParam.itemsn = itemsn;
		sendParam.itemcount = itemcount;
		CmdMgr.pushCmd(Cmd.C2S_Item_Sell, sendParam);
	}

	/**
	* 	道具分解				PBC2GItemSplit
	*
	* @param iteminfo	PBItemSnCount	道具SN
	*/
	export function split(iteminfo: any[])
	{
		let sendParam: Pb_God.PBC2GItemSplit = new Pb_God.PBC2GItemSplit();
		sendParam.iteminfo = iteminfo;
		CmdMgr.pushCmd(Cmd.C2S_Item_Split, sendParam);
	}

	/**
	* 	符文重铸				PBC2GRuneRefineAsk
	*
	* @param itemsn	uint64	道具SN
	* @param lockskill	uint32	锁定的技能id
	* @param blockattr	bool	锁定基础属性
	*/
	export function runeRefine(itemsn: Long, lockskill: number[], blockattr: boolean)
	{
		let sendParam: Pb_God.PBC2GRuneRefineAsk = new Pb_God.PBC2GRuneRefineAsk();
		sendParam.itemsn = itemsn;
		sendParam.lockskill = lockskill;
		sendParam.blockattr = blockattr;
		CmdMgr.pushCmd(Cmd.C2S_Item_RuneRefine, sendParam);
	}

	/**
	* 	符文重铸保存			PBItemSn
	*
	* @param itemsn	uint64	道具SN
	*/
	export function saveRuneRefine(itemsn: Long)
	{
		let sendParam: Pb_God.PBItemSn = new Pb_God.PBItemSn();
		sendParam.itemsn = itemsn;
		CmdMgr.pushCmd(Cmd.C2S_Item_SaveRuneRefine, sendParam);
	}

	/**
	* 	全额购买				PBItemInfo
	*
	* @param itemid	uint32	道具ID
	* @param itemcount	uint64	道具个数
	*/
	export function fullBuy(itemid: number, itemcount: Long)
	{
		let sendParam: Pb_God.PBItemInfo = new Pb_God.PBItemInfo();
		sendParam.itemid = itemid;
		sendParam.itemcount = itemcount;
		CmdMgr.pushCmd(Cmd.C2S_Item_FullBuy, sendParam);
	}

	/**
	* 	符文兑换
	*/
	export function runeExchange()
	{
		CmdMgr.pushCmd(Cmd.C2S_Item_RuneExchange);
	}

	/**
	* 	神装洗练				PBC2GGodEquipRefineAsk
	*
	* @param itemsn	uint64	道具SN
	* @param lockattr	uint32	锁定的属性
	*/
	export function godEquipRefine(itemsn: Long, lockattr: number[])
	{
		let sendParam: Pb_God.PBC2GGodEquipRefineAsk = new Pb_God.PBC2GGodEquipRefineAsk();
		sendParam.itemsn = itemsn;
		sendParam.lockattr = lockattr;
		CmdMgr.pushCmd(Cmd.C2S_Item_GodEquipRefine, sendParam);
	}

	/**
	* 	神装洗练	保存		PBItemSn
	*
	* @param itemsn	uint64	道具SN
	*/
	export function saveGodEquipRefine(itemsn: Long)
	{
		let sendParam: Pb_God.PBItemSn = new Pb_God.PBItemSn();
		sendParam.itemsn = itemsn;
		CmdMgr.pushCmd(Cmd.C2S_Item_SaveGodEquipRefine, sendParam);
	}

	/**
	* 	一键出售				PBC2GItemSellOneKeyAsk
	*
	* @param itemsn	uint64	品质
	*/
	export function sellOneKey(itemsn: Long[])
	{
		let sendParam: Pb_God.PBC2GItemSellOneKeyAsk = new Pb_God.PBC2GItemSellOneKeyAsk();
		sendParam.itemsn = itemsn;
		CmdMgr.pushCmd(Cmd.C2S_Item_SellOneKey, sendParam);
	}

	/**
	* 	查询装备合成记录
	*/
	export function equipCompoundLog()
	{
		CmdMgr.pushCmd(Cmd.C2S_Item_EquipCompoundLog);
	}

	/**
	* 	使用礼包道具				PBC2GBagUseItem
	*
	* @param itemsnid	uint64	道具SN
	* @param itemcount	uint32	道具个数
	* @param itemGroupID	uint32	道具组ID
	*/
	export function bag_Use(itemsnid: Long, itemcount: number, itemGroupID: number[])
	{
		let sendParam: Pb_God.PBC2GBagUseItem = new Pb_God.PBC2GBagUseItem();
		sendParam.itemsnid = itemsnid;
		sendParam.itemcount = itemcount;
		sendParam.itemGroupID = itemGroupID;
		CmdMgr.pushCmd(Cmd.C2S_Item_Bag_Use, sendParam);
	}

	/**
	* 	使用升星道具			PBC2GUpstarUseItem
	*
	* @param itemsn	uint64	道具SN
	* @param itemcount	uint32	道具个数
	* @param petsn	uint64	英雄sn
	*/
	export function upStar_Use(itemsn: Long, itemcount: number, petsn: Long)
	{
		let sendParam: Pb_God.PBC2GUpstarUseItem = new Pb_God.PBC2GUpstarUseItem();
		sendParam.itemsn = itemsn;
		sendParam.itemcount = itemcount;
		sendParam.petsn = petsn;
		CmdMgr.pushCmd(Cmd.C2S_Item_UpStar_Use, sendParam);
	}

}
module Pro.FightSend
{
	/**
	* 普通战斗			PBC2GFightNormalBegin
	*
	* @param battletype	uint32	战斗类型_emBattleType
	* @param id	uint32	挑战ID
	* @param param	uint32	参数
	* @param zhenfaid	uint32	阵法ID
	* @param posdata	PBPlayerZhenfaPos	位置伙伴key:位置value:伙伴sn
	* @param artifactid	uint32	神器ID
	* @param autoresult	bool	是否自动跳过
	* @param clientparam	string	客户端参数
	*/
	export function normalBegin(battletype: number, id: number, param: number, zhenfaid: number, posdata: any[], artifactid: number, autoresult: boolean, clientparam: string)
	{
		let sendParam: Pb_God.PBC2GFightNormalBegin = new Pb_God.PBC2GFightNormalBegin();
		sendParam.battletype = battletype;
		sendParam.id = id;
		sendParam.param = param;
		sendParam.zhenfaid = zhenfaid;
		sendParam.posdata = posdata;
		sendParam.artifactid = artifactid;
		sendParam.autoresult = autoresult;
		sendParam.clientparam = clientparam;
		CmdMgr.pushCmd(Cmd.C2S_Fight_NormalBegin, sendParam);
	}

	/**
	* 普通战斗结果		PBC2GFightNormalResult
	*
	* @param battlesn	uint64	流水ID
	* @param result	uint32	战斗结果
	* @param isuseclient	bool	是否用客户端结果
	*/
	export function normalResult(battlesn: Long, result: number, isuseclient: boolean)
	{
		let sendParam: Pb_God.PBC2GFightNormalResult = new Pb_God.PBC2GFightNormalResult();
		sendParam.battlesn = battlesn;
		sendParam.result = result;
		sendParam.isuseclient = isuseclient;
		CmdMgr.pushCmd(Cmd.C2S_Fight_NormalResult, sendParam);
	}

	/**
	* 无尽继续战斗		PBC2GFightBeginBase
	*
	* @param battletype	uint32	战斗类型_emBattleType
	* @param id	uint32	挑战ID
	*/
	export function endlessContinue(battletype: number, id: number)
	{
		let sendParam: Pb_God.PBC2GFightBeginBase = new Pb_God.PBC2GFightBeginBase();
		sendParam.battletype = battletype;
		sendParam.id = id;
		CmdMgr.pushCmd(Cmd.C2S_Fight_EndlessContinue, sendParam);
	}

	/**
	* 退出战斗			PBC2GFightBeginBase
	*
	* @param battletype	uint32	战斗类型_emBattleType
	* @param id	uint32	挑战ID
	*/
	export function exit(battletype: number, id: number)
	{
		let sendParam: Pb_God.PBC2GFightBeginBase = new Pb_God.PBC2GFightBeginBase();
		sendParam.battletype = battletype;
		sendParam.id = id;
		CmdMgr.pushCmd(Cmd.C2S_Fight_Exit, sendParam);
	}

	/**
	* 天界副本放弃战斗	PBC2GFightBeginBase
	*
	* @param battletype	uint32	战斗类型_emBattleType
	* @param id	uint32	挑战ID
	*/
	export function heavenGiveup(battletype: number, id: number)
	{
		let sendParam: Pb_God.PBC2GFightBeginBase = new Pb_God.PBC2GFightBeginBase();
		sendParam.battletype = battletype;
		sendParam.id = id;
		CmdMgr.pushCmd(Cmd.C2S_Fight_HeavenGiveup, sendParam);
	}

}
module Pro.TaskSend
{
	/**
	* 	完成任务			PBC2GTaskCompleteAsk
	*
	* @param taskid	uint32	任务ID
	*/
	export function complete(taskid: number)
	{
		let sendParam: Pb_God.PBC2GTaskCompleteAsk = new Pb_God.PBC2GTaskCompleteAsk();
		sendParam.taskid = taskid;
		CmdMgr.pushCmd(Cmd.C2S_Task_Complete, sendParam);
	}

}
module Pro.MailSend
{
	/**
	* 读取邮件	PBMailID
	*
	* @param mailid	uint32	邮件ID
	*/
	export function read(mailid: number)
	{
		let sendParam: Pb_God.PBMailID = new Pb_God.PBMailID();
		sendParam.mailid = mailid;
		CmdMgr.pushCmd(Cmd.C2S_Mail_Read, sendParam);
	}

	/**
	* 领取奖励	PBMailID
	*
	* @param mailid	uint32	邮件ID
	*/
	export function reward(mailid: number)
	{
		let sendParam: Pb_God.PBMailID = new Pb_God.PBMailID();
		sendParam.mailid = mailid;
		CmdMgr.pushCmd(Cmd.C2S_Mail_Reward, sendParam);
	}

	/**
	* 领取所有奖励无内容
	*/
	export function rewardAll()
	{
		CmdMgr.pushCmd(Cmd.C2S_Mail_RewardAll);
	}

	/**
	* 删除邮件	PBMailID
	*
	* @param mailid	uint32	邮件ID
	*/
	export function deleteSend(mailid: number)
	{
		let sendParam: Pb_God.PBMailID = new Pb_God.PBMailID();
		sendParam.mailid = mailid;
		CmdMgr.pushCmd(Cmd.C2S_Mail_Delete, sendParam);
	}

	/**
	* 领取所有邮件无内容
	*/
	export function deleteAll()
	{
		CmdMgr.pushCmd(Cmd.C2S_Mail_DeleteAll);
	}

}
module Pro.TopListSend
{
	/**
	* 请求排行榜列表PBC2GTopListList
	*
	* @param type	uint32	排行类型_emTopListType
	* @param beginorder	uint32	开始排行
	* @param count	uint32	请求数量
	* @param playerid	uint32	玩家ID
	* @param worldid	uint32	世界ID
	* @param factionid	uint32	帮派ID
	* @param param	uint32	param
	*/
	export function list(type: number, beginorder: number, count: number, playerid: number, worldid: number, factionid: number, param: number)
	{
		let sendParam: Pb_God.PBC2GTopListList = new Pb_God.PBC2GTopListList();
		sendParam.type = type;
		sendParam.beginorder = beginorder;
		sendParam.count = count;
		sendParam.playerid = playerid;
		sendParam.worldid = worldid;
		sendParam.factionid = factionid;
		sendParam.param = param;
		CmdMgr.pushCmd(Cmd.C2S_TopList_List, sendParam);
	}

	/**
	* 请求所有世界排行
	*/
	export function worldAll()
	{
		CmdMgr.pushCmd(Cmd.C2S_TopList_WorldAll);
	}

	/**
	* 请求所有跨服排行
	*/
	export function bWAll()
	{
		CmdMgr.pushCmd(Cmd.C2S_TopList_BWAll);
	}

	/**
	* 请求自己排名信息PBC2GGetSelf
	*
	* @param type	uint32	排行类型_emTopListType
	*/
	export function getSelf(type: number)
	{
		let sendParam: Pb_God.PBC2GGetSelf = new Pb_God.PBC2GGetSelf();
		sendParam.type = type;
		CmdMgr.pushCmd(Cmd.C2S_TopList_GetSelf, sendParam);
	}

	/**
	* 请求奖励索引	PBC2GGetSelf
	*
	* @param type	uint32	排行类型_emTopListType
	*/
	export function rewardID(type: number)
	{
		let sendParam: Pb_God.PBC2GGetSelf = new Pb_God.PBC2GGetSelf();
		sendParam.type = type;
		CmdMgr.pushCmd(Cmd.C2S_TopList_RewardID, sendParam);
	}

}
module Pro.ChallengeSend
{
	/**
	* 刷新对手	无内容
	*/
	export function refresh()
	{
		CmdMgr.pushCmd(Cmd.C2S_Challenge_Refresh);
	}

	/**
	* 领取周宝箱	PBU32
	*
	* @param value	uint32
	*/
	export function weekPrize(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Challenge_WeekPrize, sendParam);
	}

	/**
	* 打开竞技场	无内容
	*/
	export function open()
	{
		CmdMgr.pushCmd(Cmd.C2S_Challenge_Open);
	}

	/**
	* 点赞		PBU32玩家id
	*
	* @param value	uint32
	*/
	export function like(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Challenge_Like, sendParam);
	}

	/**
	* 玩家信息	PBU32玩家id
	*
	* @param value	uint32
	*/
	export function askPlayerInfo(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Challenge_AskPlayerInfo, sendParam);
	}

}
module Pro.FactionSend
{
	/**
	* 	创建帮会				PBC2GFactionCreate
	*
	* @param playerid	uint32	创建者ID
	* @param worldid	uint32	世界ID
	* @param factionname	string	帮派名
	* @param creattime	uint32	创建时间
	* @param factionid	uint32	帮派ID
	* @param declaration	string	帮派宣言
	* @param isauto	uint32	是否验证0不验证
	* @param joinneedlevel	uint32	加入需要的玩家等级
	*/
	export function create(playerid: number, worldid: number, factionname: string, creattime: number, factionid: number, declaration: string, isauto: number, joinneedlevel: number)
	{
		let sendParam: Pb_God.PBC2GFactionCreate = new Pb_God.PBC2GFactionCreate();
		sendParam.playerid = playerid;
		sendParam.worldid = worldid;
		sendParam.factionname = factionname;
		sendParam.creattime = creattime;
		sendParam.factionid = factionid;
		sendParam.declaration = declaration;
		sendParam.isauto = isauto;
		sendParam.joinneedlevel = joinneedlevel;
		CmdMgr.pushCmd(Cmd.C2S_Faction_Create, sendParam);
	}

	/**
	* 	退出
	*/
	export function quit()
	{
		CmdMgr.pushCmd(Cmd.C2S_Faction_Quit);
	}

	/**
	* 	修改帮派公告				PBC2GFactionEdit
	*
	* @param declaration	string	宣言
	*/
	export function edit(declaration: string)
	{
		let sendParam: Pb_God.PBC2GFactionEdit = new Pb_God.PBC2GFactionEdit();
		sendParam.declaration = declaration;
		CmdMgr.pushCmd(Cmd.C2S_Faction_Edit, sendParam);
	}

	/**
	* 	申请加入帮会			PBC2GFactionApply
	*
	* @param factionid	uint32	帮派ID
	* @param isapply	bool	true申请false取消
	*/
	export function apply(factionid: number, isapply: boolean)
	{
		let sendParam: Pb_God.PBC2GFactionApply = new Pb_God.PBC2GFactionApply();
		sendParam.factionid = factionid;
		sendParam.isapply = isapply;
		CmdMgr.pushCmd(Cmd.C2S_Faction_Apply, sendParam);
	}

	/**
	* 	打开帮会
	*/
	export function open()
	{
		CmdMgr.pushCmd(Cmd.C2S_Faction_Open);
	}

	/**
	* 	请求帮会列表
	*/
	export function list()
	{
		CmdMgr.pushCmd(Cmd.C2S_Faction_List);
	}

	/**
	* 	请求帮会成员列表
	*/
	export function memberList()
	{
		CmdMgr.pushCmd(Cmd.C2S_Faction_MemberList);
	}

	/**
	* 	批准/拒绝加入申请		PBC2GFactionAgreeApply
	*
	* @param playerid	uint32	帮派ID
	* @param isagree	bool	true同意false拒绝
	*/
	export function agreeApply(playerid: number, isagree: boolean)
	{
		let sendParam: Pb_God.PBC2GFactionAgreeApply = new Pb_God.PBC2GFactionAgreeApply();
		sendParam.playerid = playerid;
		sendParam.isagree = isagree;
		CmdMgr.pushCmd(Cmd.C2S_Faction_AgreeApply, sendParam);
	}

	/**
	* 	改变官职					PBC2GFactionChangeJob
	*
	* @param playerid	uint32	目标成员
	* @param jobtype	uint32	官职类型_emFactionJob
	*/
	export function changeJob(playerid: number, jobtype: number)
	{
		let sendParam: Pb_God.PBC2GFactionChangeJob = new Pb_God.PBC2GFactionChangeJob();
		sendParam.playerid = playerid;
		sendParam.jobtype = jobtype;
		CmdMgr.pushCmd(Cmd.C2S_Faction_ChangeJob, sendParam);
	}

	/**
	* 	踢出帮派					PBU32
	*
	* @param value	uint32
	*/
	export function kick(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Faction_Kick, sendParam);
	}

	/**
	* 	帮会改名					PBString
	*
	* @param value	string
	*/
	export function rename(value: string)
	{
		let sendParam: Pb_God.PBString = new Pb_God.PBString();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Faction_Rename, sendParam);
	}

	/**
	* 	帮会捐献					PBU32
	*
	* @param value	uint32
	*/
	export function donate(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Faction_Donate, sendParam);
	}

	/**
	* 	查看申请列表
	*/
	export function queryApplyList()
	{
		CmdMgr.pushCmd(Cmd.C2S_Faction_QueryApplyList);
	}

	/**
	* 	领取捐献奖励				PBU32
	*
	* @param value	uint32
	*/
	export function donatePrize(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Faction_DonatePrize, sendParam);
	}

	/**
	* 	活跃度升级
	*/
	export function upgradeLiveness()
	{
		CmdMgr.pushCmd(Cmd.C2S_Faction_UpgradeLiveness);
	}

	/**
	* 	技能升级					PBCAGFactionSkillUpgrade
	*
	* @param jobtype	uint32	职业
	* @param curlevel	uint32	当前等级
	*/
	export function upgradeSkill(jobtype: number, curlevel: number)
	{
		let sendParam: Pb_God.PBCAGFactionSkillUpgrade = new Pb_God.PBCAGFactionSkillUpgrade();
		sendParam.jobtype = jobtype;
		sendParam.curlevel = curlevel;
		CmdMgr.pushCmd(Cmd.C2S_Faction_UpgradeSkill, sendParam);
	}

	/**
	* 	技能重置					PBU32
	*
	* @param value	uint32
	*/
	export function skillReset(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Faction_SkillReset, sendParam);
	}

	/**
	* 	购买副本次数
	*/
	export function copymapBuyCount()
	{
		CmdMgr.pushCmd(Cmd.C2S_Faction_CopymapBuyCount);
	}

	/**
	* 	购买扫荡					PBU32
	*
	* @param value	uint32
	*/
	export function copymapSweep(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Faction_CopymapSweep, sendParam);
	}

	/**
	* 	打开副本系统
	*/
	export function copymapOpen()
	{
		CmdMgr.pushCmd(Cmd.C2S_Faction_CopymapOpen);
	}

	/**
	* 	副本排行					PBU32
	*
	* @param value	uint32
	*/
	export function copymapTop(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Faction_CopymapTop, sendParam);
	}

	/**
	* 	副本集结
	*/
	export function copymapNotice()
	{
		CmdMgr.pushCmd(Cmd.C2S_Faction_CopymapNotice);
	}

	/**
	* 	副本否买加成buff
	*/
	export function copymapBuySkill()
	{
		CmdMgr.pushCmd(Cmd.C2S_Faction_CopymapBuySkill);
	}

	/**
	* 	修改入会条件				PBCAGFactionSetCondition
	*
	* @param isauto	uint32	是否验证0不验证
	* @param joinneedlevel	uint32	加入需要的玩家等级
	*/
	export function setCondition(isauto: number, joinneedlevel: number)
	{
		let sendParam: Pb_God.PBCAGFactionSetCondition = new Pb_God.PBCAGFactionSetCondition();
		sendParam.isauto = isauto;
		sendParam.joinneedlevel = joinneedlevel;
		CmdMgr.pushCmd(Cmd.C2S_Faction_SetCondition, sendParam);
	}

	/**
	* 	公会招募
	*/
	export function recruit()
	{
		CmdMgr.pushCmd(Cmd.C2S_Faction_Recruit);
	}

	/**
	* 	公会弹劾					PBC2GFactionImpeach
	*
	*/
	export function impeach()
	{
		let sendParam: Pb_God.PBC2GFactionImpeach = new Pb_God.PBC2GFactionImpeach();
		CmdMgr.pushCmd(Cmd.C2S_Faction_Impeach, sendParam);
	}

	/**
	* 	PVP技能升级				PBU32
	*
	* @param value	uint32
	*/
	export function upgradePVPSkill(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Faction_UpgradePVPSkill, sendParam);
	}

	/**
	* 	PVP技能重置				PBU32
	*
	* @param value	uint32
	*/
	export function pVPSkillReset(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Faction_PVPSkillReset, sendParam);
	}

	/**
	* 	查询所有对阵列表
	*/
	export function queryAllList()
	{
		CmdMgr.pushCmd(Cmd.C2S_FactionWar_QueryAllList);
	}

	/**
	* 	查询成员列表				PBC2GFactionWarMemberList
	*
	* @param tarfactionid	uint32	目标帮派ID
	* @param playerid	uint32	玩家ID
	* @param worldid	uint32	世界ID
	* @param factionid	uint32	帮派ID
	*/
	export function queryMemberList(tarfactionid: number, playerid: number, worldid: number, factionid: number)
	{
		let sendParam: Pb_God.PBC2GFactionWarMemberList = new Pb_God.PBC2GFactionWarMemberList();
		sendParam.tarfactionid = tarfactionid;
		sendParam.playerid = playerid;
		sendParam.worldid = worldid;
		sendParam.factionid = factionid;
		CmdMgr.pushCmd(Cmd.C2S_FactionWar_QueryMemberList, sendParam);
	}

	/**
	* 	查询成员信息				PBC2GFactionWarMemberInfo
	*
	* @param tarplayerid	uint32	目标玩家ID
	* @param playerid	uint32	玩家ID
	* @param worldid	uint32	世界ID
	* @param factionid	uint32	帮派ID
	*/
	export function queryMemberInfo(tarplayerid: number, playerid: number, worldid: number, factionid: number)
	{
		let sendParam: Pb_God.PBC2GFactionWarMemberInfo = new Pb_God.PBC2GFactionWarMemberInfo();
		sendParam.tarplayerid = tarplayerid;
		sendParam.playerid = playerid;
		sendParam.worldid = worldid;
		sendParam.factionid = factionid;
		CmdMgr.pushCmd(Cmd.C2S_FactionWar_QueryMemberInfo, sendParam);
	}

	/**
	* 	查询战场日志
	*/
	export function queryWarLog()
	{
		CmdMgr.pushCmd(Cmd.C2S_FactionWar_QueryWarLog);
	}

	/**
	* 	查询我的日志
	*/
	export function querySelfLog()
	{
		CmdMgr.pushCmd(Cmd.C2S_FactionWar_QuerySelfLog);
	}

	/**
	* 	查询目标防守记录			PBC2GFactionWarQueryTarRecord
	*
	* @param tarplayerid	uint32	目标ID
	* @param playerid	uint32	玩家ID
	* @param worldid	uint32	世界ID
	*/
	export function queryTarRecord(tarplayerid: number, playerid: number, worldid: number)
	{
		let sendParam: Pb_God.PBC2GFactionWarQueryTarRecord = new Pb_God.PBC2GFactionWarQueryTarRecord();
		sendParam.tarplayerid = tarplayerid;
		sendParam.playerid = playerid;
		sendParam.worldid = worldid;
		CmdMgr.pushCmd(Cmd.C2S_FactionWar_QueryTarRecord, sendParam);
	}

	/**
	* 	查询进攻列表
	*/
	export function queryAttackList()
	{
		CmdMgr.pushCmd(Cmd.C2S_FactionWar_QueryAttackList);
	}

	/**
	* 	查询宝箱
	*/
	export function queryBoxInfo()
	{
		CmdMgr.pushCmd(Cmd.C2S_FactionWar_QueryBoxInfo);
	}

	/**
	* 	开启宝箱					PBC2GFactionWarOpenBox
	*
	* @param pos	uint32	宝箱位置
	* @param playerid	uint32	玩家ID
	* @param worldid	uint32	世界ID
	* @param playername	string	玩家名
	*/
	export function openBox(pos: number, playerid: number, worldid: number, playername: string)
	{
		let sendParam: Pb_God.PBC2GFactionWarOpenBox = new Pb_God.PBC2GFactionWarOpenBox();
		sendParam.pos = pos;
		sendParam.playerid = playerid;
		sendParam.worldid = worldid;
		sendParam.playername = playername;
		CmdMgr.pushCmd(Cmd.C2S_FactionWar_OpenBox, sendParam);
	}

	/**
	* 	打开公会战
	*/
	export function openWar()
	{
		CmdMgr.pushCmd(Cmd.C2S_FactionWar_OpenWar);
	}

	/**
	* 	帮会日志
	*/
	export function log()
	{
		CmdMgr.pushCmd(Cmd.C2S_Faction_Log);
	}

	/**
	* 	同步贡献跟经验			PBC2GFactionAddContriExp
	*
	* @param addcontri	int64	增加帮派贡献值
	* @param addexp	uint32	增加帮派经验
	* @param doingtype	uint32	操作类型
	*/
	export function addContriExp(addcontri: Long, addexp: number, doingtype: number)
	{
		let sendParam: Pb_God.PBC2GFactionAddContriExp = new Pb_God.PBC2GFactionAddContriExp();
		sendParam.addcontri = addcontri;
		sendParam.addexp = addexp;
		sendParam.doingtype = doingtype;
		CmdMgr.pushCmd(Cmd.C2S_Faction_AddContriExp, sendParam);
	}

	/**
	* 	副本进入请求				PBFightBase
	*
	* @param battlesn	uint64	流水ID
	* @param battletype	uint32	战斗类型_emBattleType
	* @param id	uint32	挑战ID
	* @param param	uint32	参数
	* @param randid	uint32	随机种子
	* @param begintime	uint32	开始时间
	* @param maxround	uint32	最大回合
	* @param friend	PBPlayerBattleInfo	伙伴
	* @param energy	PBPlayerBattleInfo	敌方
	* @param playback	PBFightPlayback	战斗回放
	* @param num	uint32	同一对手的第几次战斗
	* @param clientparam	string	客户端参数
	* @param serverparam	uint32	服务器参数
	*/
	export function fightBegin(battlesn: Long, battletype: number, id: number, param: number, randid: number, begintime: number, maxround: number, friend: any, energy: any, playback: any, num: number, clientparam: string, serverparam: number[])
	{
		let sendParam: Pb_God.PBFightBase = new Pb_God.PBFightBase();
		sendParam.battlesn = battlesn;
		sendParam.battletype = battletype;
		sendParam.id = id;
		sendParam.param = param;
		sendParam.randid = randid;
		sendParam.begintime = begintime;
		sendParam.maxround = maxround;
		sendParam.friend = friend;
		sendParam.energy = energy;
		sendParam.playback = playback;
		sendParam.num = num;
		sendParam.clientparam = clientparam;
		sendParam.serverparam = serverparam;
		CmdMgr.pushCmd(Cmd.C2S_Faction_FightBegin, sendParam);
	}

	/**
	* 	副本完成请求				PBC2GFactionAddContriExp
	*
	* @param addcontri	int64	增加帮派贡献值
	* @param addexp	uint32	增加帮派经验
	* @param doingtype	uint32	操作类型
	*/
	export function fightResult(addcontri: Long, addexp: number, doingtype: number)
	{
		let sendParam: Pb_God.PBC2GFactionAddContriExp = new Pb_God.PBC2GFactionAddContriExp();
		sendParam.addcontri = addcontri;
		sendParam.addexp = addexp;
		sendParam.doingtype = doingtype;
		CmdMgr.pushCmd(Cmd.C2S_Faction_FightResult, sendParam);
	}

	/**
	* 	同步活跃等级				PBU32
	*
	* @param value	uint32
	*/
	export function livenessLevel(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Faction_LivenessLevel, sendParam);
	}

	/**
	* 	公会战结果
	*/
	export function fightWarResult()
	{
		CmdMgr.pushCmd(Cmd.C2S_Faction_FightWarResult);
	}

}
module Pro.TeamSend
{
	/**
	* 	创建队伍			PBC2GTeamCreate
	*
	* @param teamtype	uint32	队伍类型
	* @param targetid	uint32	目标ID
	*/
	export function create(teamtype: number, targetid: number)
	{
		let sendParam: Pb_God.PBC2GTeamCreate = new Pb_God.PBC2GTeamCreate();
		sendParam.teamtype = teamtype;
		sendParam.targetid = targetid;
		CmdMgr.pushCmd(Cmd.C2S_Team_Create, sendParam);
	}

	/**
	* 	查看队伍列表			PBC2GTeamList
	*
	* @param teamtype	uint32	队伍类型
	*/
	export function list(teamtype: number)
	{
		let sendParam: Pb_God.PBC2GTeamList = new Pb_God.PBC2GTeamList();
		sendParam.teamtype = teamtype;
		CmdMgr.pushCmd(Cmd.C2S_Team_List, sendParam);
	}

	/**
	* 	离开队伍				无内容
	*/
	export function exit()
	{
		CmdMgr.pushCmd(Cmd.C2S_Team_Exit);
	}

	/**
	* 	踢人					PBU32
	*
	* @param value	uint32
	*/
	export function kick(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Team_Kick, sendParam);
	}

	/**
	* 	加入队伍				PBC2GTeamJoin
	*
	* @param teamid	uint32	队伍ID
	* @param teamtype	uint32	队伍类型
	* @param targetid	uint32	队伍目标
	*/
	export function join(teamid: number, teamtype: number, targetid: number)
	{
		let sendParam: Pb_God.PBC2GTeamJoin = new Pb_God.PBC2GTeamJoin();
		sendParam.teamid = teamid;
		sendParam.teamtype = teamtype;
		sendParam.targetid = targetid;
		CmdMgr.pushCmd(Cmd.C2S_Team_Join, sendParam);
	}

	/**
	* 	快速加入队伍			PBC2GTeamJoin
	*
	* @param teamid	uint32	队伍ID
	* @param teamtype	uint32	队伍类型
	* @param targetid	uint32	队伍目标
	*/
	export function autoJoin(teamid: number, teamtype: number, targetid: number)
	{
		let sendParam: Pb_God.PBC2GTeamJoin = new Pb_God.PBC2GTeamJoin();
		sendParam.teamid = teamid;
		sendParam.teamtype = teamtype;
		sendParam.targetid = targetid;
		CmdMgr.pushCmd(Cmd.C2S_Team_AutoJoin, sendParam);
	}

	/**
	* 	设置队伍状态			PBCAGTeamSetStatus
	*
	* @param fullauto	bool	是否队员满自动开启
	* @param timeauto	bool	是否时间到自动开启
	*/
	export function setStatus(fullauto: boolean, timeauto: boolean)
	{
		let sendParam: Pb_God.PBCAGTeamSetStatus = new Pb_God.PBCAGTeamSetStatus();
		sendParam.fullauto = fullauto;
		sendParam.timeauto = timeauto;
		CmdMgr.pushCmd(Cmd.C2S_Team_SetStatus, sendParam);
	}

	/**
	* 	开始挑战				无内容
	*/
	export function start()
	{
		CmdMgr.pushCmd(Cmd.C2S_Team_Start);
	}

	/**
	* 	准备挑战				服务器用	PBPlayerBattleInfo
	*
	* @param playerdisplay	PBPlayerDisplay	玩家外显
	* @param battlepet	PBBattlePet	战斗伙伴
	* @param index	uint32	第几队伍，从1开始
	*/
	export function readyStart(playerdisplay: any, battlepet: any, index: number)
	{
		let sendParam: Pb_God.PBPlayerBattleInfo = new Pb_God.PBPlayerBattleInfo();
		sendParam.playerdisplay = playerdisplay;
		sendParam.battlepet = battlepet;
		sendParam.index = index;
		CmdMgr.pushCmd(Cmd.C2S_Team_ReadyStart, sendParam);
	}

}
module Pro.CallSend
{
	/**
	* 	召唤一次		PBU32
	*
	* @param value	uint32
	*/
	export function onePet(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Call_OnePet, sendParam);
	}

	/**
	* 	召唤十次		PBU32
	*
	* @param value	uint32
	*/
	export function tenPet(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Call_TenPet, sendParam);
	}

	/**
	* 	免费召唤		PBU32
	*
	* @param value	uint32
	*/
	export function free(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Call_Free, sendParam);
	}

	/**
	* 	英雄转换		PBU64
	*
	* @param value	uint64
	*/
	export function change(value: Long)
	{
		let sendParam: Pb_God.PBU64 = new Pb_God.PBU64();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Call_Change, sendParam);
	}

	/**
	* 	英雄转换保存	PBU32
	*
	* @param value	uint32
	*/
	export function saveChange(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Call_SaveChange, sendParam);
	}

	/**
	* 	设置自动分解	PBU32
	*
	* @param value	uint32
	*/
	export function autoSplit(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Call_AutoSplit, sendParam);
	}

	/**
	* 	固定英雄转换	PBC2G_Call_FixChange
	*
	* @param type	uint32	类型值，_emFixChangeType
	* @param value	uint64	伙伴SN
	*/
	export function fixChange(type: number, value: Long)
	{
		let sendParam: Pb_God.PBC2G_Call_FixChange = new Pb_God.PBC2G_Call_FixChange();
		sendParam.type = type;
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Call_FixChange, sendParam);
	}

}
module Pro.SailSend
{
	/**
	* 	刷新
	*/
	export function refresh()
	{
		CmdMgr.pushCmd(Cmd.C2S_Sail_Refresh);
	}

	/**
	* 	接取		PBPlayerSailInfo
	*
	* @param sn	uint32	sn
	* @param index	uint32	索引配置表中
	* @param endtime	uint32	结束时间
	* @param petsn	uint64	派遣伙伴sn
	*/
	export function accpet(sn: number, index: number, endtime: number, petsn: Long[])
	{
		let sendParam: Pb_God.PBPlayerSailInfo = new Pb_God.PBPlayerSailInfo();
		sendParam.sn = sn;
		sendParam.index = index;
		sendParam.endtime = endtime;
		sendParam.petsn = petsn;
		CmdMgr.pushCmd(Cmd.C2S_Sail_Accpet, sendParam);
	}

	/**
	* 	购买时间	PBU32
	*
	* @param value	uint32
	*/
	export function buyHour(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Sail_BuyHour, sendParam);
	}

	/**
	* 	完成		PBU32
	*
	* @param value	uint32
	*/
	export function complete(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Sail_Complete, sendParam);
	}

	/**
	* 	领取所有
	*/
	export function completeAll()
	{
		CmdMgr.pushCmd(Cmd.C2S_Sail_CompleteAll);
	}

}
module Pro.HookSend
{
	/**
	* 收益领奖		无内容
	*/
	export function profit()
	{
		CmdMgr.pushCmd(Cmd.C2S_Hook_Profit);
	}

	/**
	* 飞新挂机地图		无内容
	*/
	export function flyNewScene()
	{
		CmdMgr.pushCmd(Cmd.C2S_Hook_FlyNewScene);
	}

	/**
	* 领取关卡奖励		PBU32
	*
	* @param value	uint32
	*/
	export function stagePrize(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Hook_StagePrize, sendParam);
	}

	/**
	* 购买快速挑战
	*/
	export function buySweep()
	{
		CmdMgr.pushCmd(Cmd.C2S_Hook_BuySweep);
	}

	/**
	* 免费快速挑战
	*/
	export function freeSweep()
	{
		CmdMgr.pushCmd(Cmd.C2S_Hook_FreeSweep);
	}

	/**
	* 挑战关卡
	*/
	export function fightStage()
	{
		CmdMgr.pushCmd(Cmd.C2S_Hook_FightStage);
	}

}
module Pro.ArtifactSend
{
	/**
	* 	激活			PBCAGArtifactActive
	*
	* @param id	uint32	神器ID
	* @param stage	uint32	进度ID
	*/
	export function active(id: number, stage: number)
	{
		let sendParam: Pb_God.PBCAGArtifactActive = new Pb_God.PBCAGArtifactActive();
		sendParam.id = id;
		sendParam.stage = stage;
		CmdMgr.pushCmd(Cmd.C2S_Artifact_Active, sendParam);
	}

	/**
	* 	升级
	*/
	export function upgrade()
	{
		CmdMgr.pushCmd(Cmd.C2S_Artifact_Upgrade);
	}

	/**
	* 	技能升级		PBU32
	*
	* @param value	uint32
	*/
	export function skill(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Artifact_Skill, sendParam);
	}

	/**
	* 	刻印石头		PBU32
	*
	* @param value	uint32
	*/
	export function useStone(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Artifact_UseStone, sendParam);
	}

	/**
	* 	重置			PBU32
	*
	* @param value	uint32
	*/
	export function reset(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Artifact_Reset, sendParam);
	}

	/**
	* 	幻化			PBCAGArtifactShape
	*
	* @param id	uint32	神器ID
	* @param shapeid	uint32	幻化的ID
	*/
	export function shape(id: number, shapeid: number)
	{
		let sendParam: Pb_God.PBCAGArtifactShape = new Pb_God.PBCAGArtifactShape();
		sendParam.id = id;
		sendParam.shapeid = shapeid;
		CmdMgr.pushCmd(Cmd.C2S_Artifact_Shape, sendParam);
	}

	/**
	* 	觉醒(index)	PBU32
	*
	* @param value	uint32
	*/
	export function awake(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Artifact_Awake, sendParam);
	}

	/**
	* 	觉醒奖励		PBU32
	*
	* @param value	uint32
	*/
	export function awakePrize(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Artifact_AwakePrize, sendParam);
	}

	/**
	* 	解锁			PBU32
	*
	* @param value	uint32
	*/
	export function unlock(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Artifact_Unlock, sendParam);
	}

}
module Pro.ShopSend
{
	/**
	* 	购买		PBCAGShopBuy
	*
	* @param shoptype	uint32	商店类型
	* @param id	uint32	固定表示index,随机商店表示pos(0开始)
	* @param buycount	uint32	购买次数
	*/
	export function buy(shoptype: number, id: number, buycount: number)
	{
		let sendParam: Pb_God.PBCAGShopBuy = new Pb_God.PBCAGShopBuy();
		sendParam.shoptype = shoptype;
		sendParam.id = id;
		sendParam.buycount = buycount;
		CmdMgr.pushCmd(Cmd.C2S_Shop_Buy, sendParam);
	}

	/**
	* 	重置		PBU32
	*
	* @param value	uint32
	*/
	export function reset(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Shop_Reset, sendParam);
	}

	/**
	* 	刷新		PBU32
	*
	* @param value	uint32
	*/
	export function refresh(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Shop_Refresh, sendParam);
	}

}
module Pro.TrainSend
{
	/**
	* 试练塔扫荡			PBU32
	*
	* @param value	uint32
	*/
	export function towerSweep(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Train_TowerSweep, sendParam);
	}

	/**
	* 试练塔领奖			PBU32
	*
	* @param value	uint32
	*/
	export function towerPrize(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Train_TowerPrize, sendParam);
	}

	/**
	* 试练塔购买次数		PBU32
	*
	* @param value	uint32
	*/
	export function towerBuyCount(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Train_TowerBuyCount, sendParam);
	}

	/**
	* 无尽试炼领奖			PBU32
	*
	* @param value	uint32
	*/
	export function endlessPrize(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Train_EndlessPrize, sendParam);
	}

	/**
	* 废弃
	*/
	export function xxxxxxxxxxxxxx()
	{
		CmdMgr.pushCmd(Cmd.C2S_Train_xxxxxxxxxxxxxx);
	}

	/**
	* 无尽试炼选择buff返回	PBU32
	*
	* @param value	uint32
	*/
	export function endlessBuff(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Train_EndlessBuff, sendParam);
	}

	/**
	* 查询试练塔录像		PBU32
	*
	* @param value	uint32
	*/
	export function queryTowerVideo(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Train_QueryTowerVideo, sendParam);
	}

	/**
	* 废弃
	*/
	export function xxxxxxxxxxxxxxx()
	{
		CmdMgr.pushCmd(Cmd.C2S_Train_xxxxxxxxxxxxxxx);
	}

	/**
	* 购买buff(技能index)		PBU32
	*
	* @param value	uint32
	*/
	export function peakBuyBuff(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Train_PeakBuyBuff, sendParam);
	}

	/**
	* 购买次数
	*/
	export function peakBuyCount()
	{
		CmdMgr.pushCmd(Cmd.C2S_Train_PeakBuyCount);
	}

}
module Pro.AchieveSend
{
	/**
	* 	活跃完成		PBU32
	*
	* @param value	uint32
	*/
	export function livenessComplete(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Achieve_LivenessComplete, sendParam);
	}

	/**
	* 	活跃领奖		PBU32
	*
	* @param value	uint32
	*/
	export function livenessPrize(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Achieve_LivenessPrize, sendParam);
	}

	/**
	* 	主线完成		PBU32
	*
	* @param value	uint32
	*/
	export function mainComplete(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Achieve_MainComplete, sendParam);
	}

	/**
	* 	历练完成		PBU32
	*
	* @param value	uint32
	*/
	export function trainComplete(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Achieve_TrainComplete, sendParam);
	}

	/**
	* 	活动活跃完成	PBU32
	*
	* @param value	uint32
	*/
	export function activityLivenessComplete(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Achieve_ActivityLivenessComplete, sendParam);
	}

	/**
	* 	活动活跃领奖	PBU32
	*
	* @param value	uint32
	*/
	export function activityLivenessPrize(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Achieve_ActivityLivenessPrize, sendParam);
	}

	/**
	* 	周活跃完成	PBU32
	*
	* @param value	uint32
	*/
	export function weekLivenessComplete(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Achieve_WeekLivenessComplete, sendParam);
	}

	/**
	* 	周活跃领奖	PBU32
	*
	* @param value	uint32
	*/
	export function weekLivenessPrize(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Achieve_WeekLivenessPrize, sendParam);
	}

	/**
	* 	战令完成		PBU32
	*
	* @param value	uint32
	*/
	export function warOrderComplete(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Achieve_WarOrderComplete, sendParam);
	}

	/**
	* 	战令奖励(等级，是否进阶奖励0/1)		PBU32U32
	*
	* @param key	uint32
	* @param value	uint32
	*/
	export function warOrderPrize(key: number, value: number)
	{
		let sendParam: Pb_God.PBU32U32 = new Pb_God.PBU32U32();
		sendParam.key = key;
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Achieve_WarOrderPrize, sendParam);
	}

	/**
	* 	战令一键奖励
	*/
	export function warOrderPrizeOneKey()
	{
		CmdMgr.pushCmd(Cmd.C2S_Achieve_WarOrderPrizeOneKey);
	}

	/**
	* 	图鉴完成		PBU32
	*
	* @param value	uint32
	*/
	export function illustrationComplete(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Achieve_IllustrationComplete, sendParam);
	}

	/**
	* 	图鉴战力完成		PBU32
	*
	* @param value	uint32
	*/
	export function illustrationPowerComplete(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Achieve_IllustrationPowerComplete, sendParam);
	}

	/**
	* 	成就之路完成		PBU32
	*
	* @param value	uint32
	*/
	export function achieveRoadComplete(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Achieve_AchieveRoadComplete, sendParam);
	}

}
module Pro.ExpeditionSend
{
	/**
	* 选择难度			PBU32
	*
	* @param value	uint32
	*/
	export function select(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Expedition_Select, sendParam);
	}

	/**
	* 领取奖励			PBU32
	*
	* @param value	uint32
	*/
	export function stagePrize(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Expedition_StagePrize, sendParam);
	}

	/**
	* 查询关卡信息		PBU32
	*
	* @param value	uint32
	*/
	export function queryStageInfo(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Expedition_QueryStageInfo, sendParam);
	}

	/**
	* 查询伙伴血量
	*/
	export function queryPetHp()
	{
		CmdMgr.pushCmd(Cmd.C2S_Expedition_QueryPetHp);
	}

	/**
	* 废弃
	*/
	export function xXXXXXXXXX()
	{
		CmdMgr.pushCmd(Cmd.C2S_Expedition_XXXXXXXXXX);
	}

}
module Pro.ShapeSend
{
	/**
	* 设置省份PBU32U32
	*
	* @param key	uint32
	* @param value	uint32
	*/
	export function setProvince(key: number, value: number)
	{
		let sendParam: Pb_God.PBU32U32 = new Pb_God.PBU32U32();
		sendParam.key = key;
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Shape_SetProvince, sendParam);
	}

	/**
	* 打开头像
	*/
	export function openHead()
	{
		CmdMgr.pushCmd(Cmd.C2S_Shape_OpenHead);
	}

	/**
	* 设置头像PBU32
	*
	* @param value	uint32
	*/
	export function setHead(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Shape_SetHead, sendParam);
	}

	/**
	* 打开头像框
	*/
	export function openHeadIcon()
	{
		CmdMgr.pushCmd(Cmd.C2S_Shape_OpenHeadIcon);
	}

	/**
	* 设置头像框PBU32
	*
	* @param value	uint32
	*/
	export function setHeadIcon(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Shape_SetHeadIcon, sendParam);
	}

	/**
	* 打开冒险形象
	*/
	export function openRisk()
	{
		CmdMgr.pushCmd(Cmd.C2S_Shape_OpenRisk);
	}

	/**
	* 设置冒险形象PBU32
	*
	* @param value	uint32
	*/
	export function setRisk(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Shape_SetRisk, sendParam);
	}

	/**
	* 打开称号
	*/
	export function openTitle()
	{
		CmdMgr.pushCmd(Cmd.C2S_Shape_OpenTitle);
	}

	/**
	* 设置称号PBU32
	*
	* @param value	uint32
	*/
	export function setTitle(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Shape_SetTitle, sendParam);
	}

	/**
	* 激活称号PBU32
	*
	* @param value	uint32
	*/
	export function activeTitle(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Shape_ActiveTitle, sendParam);
	}

	/**
	* 激活头像框PBU32
	*
	* @param value	uint32
	*/
	export function activeHeadIcon(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Shape_ActiveHeadIcon, sendParam);
	}

	/**
	* 徽章展示PBCAGBadgeDisplay
	*
	* @param id	uint32	徽章ID
	*/
	export function badgeDisplay(id: number[])
	{
		let sendParam: Pb_God.PBCAGBadgeDisplay = new Pb_God.PBCAGBadgeDisplay();
		sendParam.id = id;
		CmdMgr.pushCmd(Cmd.C2S_Shape_BadgeDisplay, sendParam);
	}

}
module Pro.TempleSend
{
	/**
	* 打开界面无内容
	*/
	export function open()
	{
		CmdMgr.pushCmd(Cmd.C2S_Temple_Open);
	}

	/**
	* 查看记录	PBU32
	*
	* @param value	uint32
	*/
	export function queryRecord(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Temple_QueryRecord, sendParam);
	}

	/**
	* 战斗
	*/
	export function fight()
	{
		CmdMgr.pushCmd(Cmd.C2S_Temple_Fight);
	}

}
module Pro.FriendSend
{
	/**
	* 	请求加好友		PBU32
	*
	* @param value	uint32
	*/
	export function requestAddFriend(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Friend_RequestAddFriend, sendParam);
	}

	/**
	* 	同意加好友		PBU32
	*
	* @param value	uint32
	*/
	export function agreeAddFriend(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Friend_AgreeAddFriend, sendParam);
	}

	/**
	* 	删除好友			PBU32
	*
	* @param value	uint32
	*/
	export function delFriend(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Friend_DelFriend, sendParam);
	}

	/**
	* 	移除申请			PBU32
	*
	* @param value	uint32
	*/
	export function delApply(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Friend_DelApply, sendParam);
	}

	/**
	* 	增加黑名单		PBU32
	*
	* @param value	uint32
	*/
	export function addBlack(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Friend_AddBlack, sendParam);
	}

	/**
	* 	移除黑名单		PBU32
	*
	* @param value	uint32
	*/
	export function delBlack(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Friend_DelBlack, sendParam);
	}

	/**
	* 	赠送礼物			PBU32
	*
	* @param value	uint32
	*/
	export function sendPrize(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Friend_SendPrize, sendParam);
	}

	/**
	* 	一键赠送礼物
	*/
	export function autoSendPrize()
	{
		CmdMgr.pushCmd(Cmd.C2S_Friend_AutoSendPrize);
	}

	/**
	* 	领取礼物			PBU32
	*
	* @param value	uint32
	*/
	export function recievePrize(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Friend_RecievePrize, sendParam);
	}

	/**
	* 	一键领取礼物
	*/
	export function autoRecievePrize()
	{
		CmdMgr.pushCmd(Cmd.C2S_Friend_AutoRecievePrize);
	}

	/**
	* 	刷新推荐好友
	*/
	export function refresh()
	{
		CmdMgr.pushCmd(Cmd.C2S_Friend_Refresh);
	}

	/**
	* 派遣支援银熊	PBPlayerSendSupportHero
	*
	* @param type	uint32	_emFriendSupportType
	* @param petsn	uint64	支援英雄sn
	*/
	export function sendSupport(type: number, petsn: Long)
	{
		let sendParam: Pb_God.PBPlayerSendSupportHero = new Pb_God.PBPlayerSendSupportHero();
		sendParam.type = type;
		sendParam.petsn = petsn;
		CmdMgr.pushCmd(Cmd.C2S_Friend_SendSupport, sendParam);
	}

	/**
	* 	根据名字搜索		PBString
	*
	* @param value	string
	*/
	export function search(value: string)
	{
		let sendParam: Pb_God.PBString = new Pb_God.PBString();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Friend_Search, sendParam);
	}

	/**
	* 	雇佣支援		PBFriendHireSupport
	*
	* @param type	uint32	类型
	* @param friendid	uint32	好友id
	* @param sn	uint64	petsn
	*/
	export function hireSupport(type: number, friendid: number, sn: Long)
	{
		let sendParam: Pb_God.PBFriendHireSupport = new Pb_God.PBFriendHireSupport();
		sendParam.type = type;
		sendParam.friendid = friendid;
		sendParam.sn = sn;
		CmdMgr.pushCmd(Cmd.C2S_Friend_HireSupport, sendParam);
	}

	/**
	* 	解雇支援			PBFriendHireSupport
	*
	* @param type	uint32	类型
	* @param friendid	uint32	好友id
	* @param sn	uint64	petsn
	*/
	export function fireSupport(type: number, friendid: number, sn: Long)
	{
		let sendParam: Pb_God.PBFriendHireSupport = new Pb_God.PBFriendHireSupport();
		sendParam.type = type;
		sendParam.friendid = friendid;
		sendParam.sn = sn;
		CmdMgr.pushCmd(Cmd.C2S_Friend_FireSupport, sendParam);
	}

	/**
	* 	同步好友信息		PBG2WFriendIDSyn
	*
	* @param playerid	uint32	好友ID
	* @param blackid	uint32	黑名单
	*/
	export function synFriend(playerid: number[], blackid: number[])
	{
		let sendParam: Pb_God.PBG2WFriendIDSyn = new Pb_God.PBG2WFriendIDSyn();
		sendParam.playerid = playerid;
		sendParam.blackid = blackid;
		CmdMgr.pushCmd(Cmd.C2S_Friend_SynFriend, sendParam);
	}

	/**
	* 	真正添加黑名单	PBU32
	*
	* @param value	uint32
	*/
	export function realAddBlack(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Friend_RealAddBlack, sendParam);
	}

	/**
	* 	同步支援信息
	*/
	export function syncSupport()
	{
		CmdMgr.pushCmd(Cmd.C2S_Friend_SyncSupport);
	}

	/**
	* 	支援被使用
	*/
	export function useSupport()
	{
		CmdMgr.pushCmd(Cmd.C2S_Friend_UseSupport);
	}

	/**
	* 支援使用回退
	*/
	export function unuseSupport()
	{
		CmdMgr.pushCmd(Cmd.C2S_Friend_UnuseSupport);
	}

}
module Pro.ElementSend
{
	/**
	* 扫荡			PBU32
	*
	* @param value	uint32
	*/
	export function sweep(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Element_Sweep, sendParam);
	}

	/**
	* 购买次数
	*/
	export function buyCount()
	{
		CmdMgr.pushCmd(Cmd.C2S_Element_BuyCount);
	}

}
module Pro.RiskSend
{
	/**
	* 选择英雄				PBC2GRiskSelectPet
	*
	* @param petsn	uint64	伙伴sn
	*/
	export function selectPet(petsn: Long[])
	{
		let sendParam: Pb_God.PBC2GRiskSelectPet = new Pb_God.PBC2GRiskSelectPet();
		sendParam.petsn = petsn;
		CmdMgr.pushCmd(Cmd.C2S_Risk_SelectPet, sendParam);
	}

	/**
	* 打开界面
	*/
	export function open()
	{
		CmdMgr.pushCmd(Cmd.C2S_Risk_Open);
	}

	/**
	* 开启格子				PBU32
	*
	* @param value	uint32
	*/
	export function openGrid(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Risk_OpenGrid, sendParam);
	}

	/**
	* 拾取格子				PBC2GRiskCoolectGridAsk
	*
	* @param grid	uint32	格子ID
	* @param param1	uint32	参数1
	* @param param2	uint32	参数2
	*/
	export function collectGrid(grid: number, param1: number, param2: number)
	{
		let sendParam: Pb_God.PBC2GRiskCoolectGridAsk = new Pb_God.PBC2GRiskCoolectGridAsk();
		sendParam.grid = grid;
		sendParam.param1 = param1;
		sendParam.param2 = param2;
		CmdMgr.pushCmd(Cmd.C2S_Risk_CollectGrid, sendParam);
	}

	/**
	* 自动拾取(守卫索引)	PBU32
	*
	* @param value	uint32
	*/
	export function autoCollectGrid(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Risk_AutoCollectGrid, sendParam);
	}

	/**
	* 进入下一层
	*/
	export function enterNextStage()
	{
		CmdMgr.pushCmd(Cmd.C2S_Risk_EnterNextStage);
	}

	/**
	* 领取守卫奖励
	*/
	export function guardPrize()
	{
		CmdMgr.pushCmd(Cmd.C2S_Risk_GuardPrize);
	}

	/**
	* 使用生命药剂			PBU64
	*
	* @param value	uint64
	*/
	export function useHpDrug(value: Long)
	{
		let sendParam: Pb_God.PBU64 = new Pb_God.PBU64();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Risk_UseHpDrug, sendParam);
	}

	/**
	* 使用驱魂药剂			PBU32
	*
	* @param value	uint32
	*/
	export function useKillDrug(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Risk_UseKillDrug, sendParam);
	}

	/**
	* 使用召唤商人
	*/
	export function useTrader()
	{
		CmdMgr.pushCmd(Cmd.C2S_Risk_UseTrader);
	}

	/**
	* 答题					PBC2GRiskQuestionAsk
	*
	* @param grid	uint32	格子
	* @param index	uint32	答题索引
	* @param option	uint32	选项123
	*/
	export function question(grid: number, index: number, option: number)
	{
		let sendParam: Pb_God.PBC2GRiskQuestionAsk = new Pb_God.PBC2GRiskQuestionAsk();
		sendParam.grid = grid;
		sendParam.index = index;
		sendParam.option = option;
		CmdMgr.pushCmd(Cmd.C2S_Risk_Question, sendParam);
	}

	/**
	* 打开商店
	*/
	export function shopOpen()
	{
		CmdMgr.pushCmd(Cmd.C2S_Risk_ShopOpen);
	}

	/**
	* 商店购买(索引)		PBU32
	*
	* @param value	uint32
	*/
	export function shopBuy(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Risk_ShopBuy, sendParam);
	}

	/**
	* 查询被动技能
	*/
	export function openSkill()
	{
		CmdMgr.pushCmd(Cmd.C2S_Risk_OpenSkill);
	}

}
module Pro.DanSend
{
	/**
	* 	打开界面
	*/
	export function openAsk()
	{
		CmdMgr.pushCmd(Cmd.C2S_Dan_OpenAsk);
	}

	/**
	* 	领取奖励		PBU32
	*
	* @param value	uint32
	*/
	export function awardAsk(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Dan_AwardAsk, sendParam);
	}

	/**
	* 	购买次数返回PBU32
	*
	* @param value	uint32
	*/
	export function buyCountAsk(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Dan_BuyCountAsk, sendParam);
	}

	/**
	* 	总战绩查询
	*/
	export function totalResultAsk()
	{
		CmdMgr.pushCmd(Cmd.C2S_Dan_TotalResultAsk);
	}

	/**
	* 	赛季战绩查询	PBU32
	*
	* @param value	uint32
	*/
	export function seasonResultAsk(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Dan_SeasonResultAsk, sendParam);
	}

	/**
	* 	赛季所有赛区查询	PBC2GDanSeasonAllAreaAsk
	*
	* @param seasonid	uint32	赛季ID
	* @param playerid	uint32	玩家ID
	* @param worldid	uint32	世界ID
	*/
	export function seasonAllAreaAsk(seasonid: number, playerid: number, worldid: number)
	{
		let sendParam: Pb_God.PBC2GDanSeasonAllAreaAsk = new Pb_God.PBC2GDanSeasonAllAreaAsk();
		sendParam.seasonid = seasonid;
		sendParam.playerid = playerid;
		sendParam.worldid = worldid;
		CmdMgr.pushCmd(Cmd.C2S_Dan_SeasonAllAreaAsk, sendParam);
	}

	/**
	* 	赛区信息查询	PBC2GDanSeasonAreaInfoAsk
	*
	* @param seasonid	uint32	赛季ID
	* @param areaid	uint32	区域ID
	* @param playerid	uint32	玩家ID
	* @param worldid	uint32	世界ID
	*/
	export function seasonAreaInfoAsk(seasonid: number, areaid: number, playerid: number, worldid: number)
	{
		let sendParam: Pb_God.PBC2GDanSeasonAreaInfoAsk = new Pb_God.PBC2GDanSeasonAreaInfoAsk();
		sendParam.seasonid = seasonid;
		sendParam.areaid = areaid;
		sendParam.playerid = playerid;
		sendParam.worldid = worldid;
		CmdMgr.pushCmd(Cmd.C2S_Dan_SeasonAreaInfoAsk, sendParam);
	}

	/**
	* 	搜索对手
	*/
	export function search()
	{
		CmdMgr.pushCmd(Cmd.C2S_Dan_Search);
	}

	/**
	* 	查询我的记录
	*/
	export function record()
	{
		CmdMgr.pushCmd(Cmd.C2S_Dan_Record);
	}

	/**
	* 	查询大神记录
	*/
	export function masterRecord()
	{
		CmdMgr.pushCmd(Cmd.C2S_Dan_MasterRecord);
	}

	/**
	* 	赛区查询	PBU32U32
	*
	* @param key	uint32
	* @param value	uint32
	*/
	export function synMember(key: number, value: number)
	{
		let sendParam: Pb_God.PBU32U32 = new Pb_God.PBU32U32();
		sendParam.key = key;
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.G2BW_Dan_SynMember, sendParam);
	}

	/**
	* 	挑战请求				PBFightBase
	*
	* @param battlesn	uint64	流水ID
	* @param battletype	uint32	战斗类型_emBattleType
	* @param id	uint32	挑战ID
	* @param param	uint32	参数
	* @param randid	uint32	随机种子
	* @param begintime	uint32	开始时间
	* @param maxround	uint32	最大回合
	* @param friend	PBPlayerBattleInfo	伙伴
	* @param energy	PBPlayerBattleInfo	敌方
	* @param playback	PBFightPlayback	战斗回放
	* @param num	uint32	同一对手的第几次战斗
	* @param clientparam	string	客户端参数
	* @param serverparam	uint32	服务器参数
	*/
	export function fightBegin(battlesn: Long, battletype: number, id: number, param: number, randid: number, begintime: number, maxround: number, friend: any, energy: any, playback: any, num: number, clientparam: string, serverparam: number[])
	{
		let sendParam: Pb_God.PBFightBase = new Pb_God.PBFightBase();
		sendParam.battlesn = battlesn;
		sendParam.battletype = battletype;
		sendParam.id = id;
		sendParam.param = param;
		sendParam.randid = randid;
		sendParam.begintime = begintime;
		sendParam.maxround = maxround;
		sendParam.friend = friend;
		sendParam.energy = energy;
		sendParam.playback = playback;
		sendParam.num = num;
		sendParam.clientparam = clientparam;
		sendParam.serverparam = serverparam;
		CmdMgr.pushCmd(Cmd.G2BW_Dan_FightBegin, sendParam);
	}

	/**
	* 	挑战完成				PBG2BWDanFightResultAck
	*
	* @param playerid	uint32	玩家ID
	* @param worldid	uint32	世界ID
	* @param score	uint32	当前积分
	* @param danid	uint32	当前段位
	*/
	export function fightResult(playerid: number, worldid: number, score: number, danid: number)
	{
		let sendParam: Pb_God.PBG2BWDanFightResultAck = new Pb_God.PBG2BWDanFightResultAck();
		sendParam.playerid = playerid;
		sendParam.worldid = worldid;
		sendParam.score = score;
		sendParam.danid = danid;
		CmdMgr.pushCmd(Cmd.G2BW_Dan_FightResult, sendParam);
	}

	/**
	* 	添加记录
	*/
	export function addRecord()
	{
		CmdMgr.pushCmd(Cmd.G2BW_Dan_AddRecord);
	}

}
module Pro.LadderSend
{
	/**
	* 打开			PBG2BWOpenAsk
	*
	* @param playerid	uint32	玩家ID
	* @param worldid	uint32	世界ID
	* @param rank	uint32	刷新名次
	*/
	export function open(playerid: number, worldid: number, rank: number[])
	{
		let sendParam: Pb_God.PBG2BWOpenAsk = new Pb_God.PBG2BWOpenAsk();
		sendParam.playerid = playerid;
		sendParam.worldid = worldid;
		sendParam.rank = rank;
		CmdMgr.pushCmd(Cmd.C2S_Ladder_Open, sendParam);
	}

	/**
	* 刷新对手	PBPlayerQuery
	*
	* @param playerid	uint32	玩家ID
	* @param worldid	uint32	世界ID
	* @param factionid	uint32	帮派ID
	*/
	export function refresh(playerid: number, worldid: number, factionid: number)
	{
		let sendParam: Pb_God.PBPlayerQuery = new Pb_God.PBPlayerQuery();
		sendParam.playerid = playerid;
		sendParam.worldid = worldid;
		sendParam.factionid = factionid;
		CmdMgr.pushCmd(Cmd.C2S_Ladder_Refresh, sendParam);
	}

	/**
	* 购买次数		PBU32
	*
	* @param value	uint32
	*/
	export function buyCount(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Ladder_BuyCount, sendParam);
	}

	/**
	* 一键挑战
	*/
	export function fightOneKey()
	{
		CmdMgr.pushCmd(Cmd.C2S_Ladder_FightOneKey);
	}

	/**
	* 英雄殿
	*/
	export function heroTop()
	{
		CmdMgr.pushCmd(Cmd.C2S_Ladder_HeroTop);
	}

	/**
	* 点赞英雄殿	PBC2GLike
	*
	* @param likeplayerid	uint32	点赞playerid
	* @param robot	bool	是否是机器人
	*/
	export function heroTopLike(likeplayerid: number, robot: boolean)
	{
		let sendParam: Pb_God.PBC2GLike = new Pb_God.PBC2GLike();
		sendParam.likeplayerid = likeplayerid;
		sendParam.robot = robot;
		CmdMgr.pushCmd(Cmd.C2S_Ladder_HeroTopLike, sendParam);
	}

	/**
	* 查询我的记录
	*/
	export function queryRecord()
	{
		CmdMgr.pushCmd(Cmd.C2S_Ladder_QueryRecord);
	}

	/**
	* 查询大神记录	PBPlayerQuery
	*
	* @param playerid	uint32	玩家ID
	* @param worldid	uint32	世界ID
	* @param factionid	uint32	帮派ID
	*/
	export function queryPublicRecord(playerid: number, worldid: number, factionid: number)
	{
		let sendParam: Pb_God.PBPlayerQuery = new Pb_God.PBPlayerQuery();
		sendParam.playerid = playerid;
		sendParam.worldid = worldid;
		sendParam.factionid = factionid;
		CmdMgr.pushCmd(Cmd.C2S_Ladder_QueryPublicRecord, sendParam);
	}

	/**
	* 查询玩家数据PBLadderQueryPlayerInfo
	*
	* @param playerid	uint32	玩家ID/机器人ID
	* @param robot	bool	是否是机器人
	*/
	export function queryPlayerInfo(playerid: number, robot: boolean)
	{
		let sendParam: Pb_God.PBLadderQueryPlayerInfo = new Pb_God.PBLadderQueryPlayerInfo();
		sendParam.playerid = playerid;
		sendParam.robot = robot;
		CmdMgr.pushCmd(Cmd.C2S_Ladder_QueryPlayerInfo, sendParam);
	}

	/**
	* 战斗开始	PBFightBase
	*
	* @param battlesn	uint64	流水ID
	* @param battletype	uint32	战斗类型_emBattleType
	* @param id	uint32	挑战ID
	* @param param	uint32	参数
	* @param randid	uint32	随机种子
	* @param begintime	uint32	开始时间
	* @param maxround	uint32	最大回合
	* @param friend	PBPlayerBattleInfo	伙伴
	* @param energy	PBPlayerBattleInfo	敌方
	* @param playback	PBFightPlayback	战斗回放
	* @param num	uint32	同一对手的第几次战斗
	* @param clientparam	string	客户端参数
	* @param serverparam	uint32	服务器参数
	*/
	export function fightBegin(battlesn: Long, battletype: number, id: number, param: number, randid: number, begintime: number, maxround: number, friend: any, energy: any, playback: any, num: number, clientparam: string, serverparam: number[])
	{
		let sendParam: Pb_God.PBFightBase = new Pb_God.PBFightBase();
		sendParam.battlesn = battlesn;
		sendParam.battletype = battletype;
		sendParam.id = id;
		sendParam.param = param;
		sendParam.randid = randid;
		sendParam.begintime = begintime;
		sendParam.maxround = maxround;
		sendParam.friend = friend;
		sendParam.energy = energy;
		sendParam.playback = playback;
		sendParam.num = num;
		sendParam.clientparam = clientparam;
		sendParam.serverparam = serverparam;
		CmdMgr.pushCmd(Cmd.G2BW_Ladder_FightBegin, sendParam);
	}

	/**
	* 战斗结束	PBFightResult
	*
	* @param base	PBFightBase	战斗公共
	* @param round	uint32	回合数
	* @param result	uint32	战斗结果_emBattleResult
	* @param endtime	uint32	战斗结束时间
	* @param friendstate	PBPetFightStateInfo	友方状态
	* @param energystate	PBPetFightStateInfo	敌方状态
	* @param prize	PBItemInfo	战斗奖励
	* @param achieve	PBU32U32	成就数据(服务器用)
	* @param challengeresult	PBFightChallengeResult	竞技场战斗结果
	* @param danresult	PBFightDanResult	超凡段位赛结果
	* @param ladderresult	PBFightLadderResult	跨服天梯结果
	* @param friendartifactstate	PBPetFightStateInfo	我发神器状态
	* @param enemyartifactstate	PBPetFightStateInfo	敌方神器状态
	* @param heavenresult	PBFightHeavenResult	天界副本结果
	* @param crosschallengeresult	PBFightCrossChallengeResult	跨服竞技场战斗结果
	*/
	export function fightResult(base: any, round: number, result: number, endtime: number, friendstate: any[], energystate: any[], prize: any[], achieve: any[], challengeresult: any, danresult: any, ladderresult: any, friendartifactstate: any, enemyartifactstate: any, heavenresult: any, crosschallengeresult: any)
	{
		let sendParam: Pb_God.PBFightResult = new Pb_God.PBFightResult();
		sendParam.base = base;
		sendParam.round = round;
		sendParam.result = result;
		sendParam.endtime = endtime;
		sendParam.friendstate = friendstate;
		sendParam.energystate = energystate;
		sendParam.prize = prize;
		sendParam.achieve = achieve;
		sendParam.challengeresult = challengeresult;
		sendParam.danresult = danresult;
		sendParam.ladderresult = ladderresult;
		sendParam.friendartifactstate = friendartifactstate;
		sendParam.enemyartifactstate = enemyartifactstate;
		sendParam.heavenresult = heavenresult;
		sendParam.crosschallengeresult = crosschallengeresult;
		CmdMgr.pushCmd(Cmd.G2BW_Ladder_FightResult, sendParam);
	}

	/**
	* 点赞英雄殿	PBG2BWLike
	*
	* @param playerid	uint32	playerid
	* @param worldid	uint32	worldid
	* @param likeplayerid	uint32	点赞playerid
	* @param robot	bool	是否是机器人
	*/
	export function like(playerid: number, worldid: number, likeplayerid: number, robot: boolean)
	{
		let sendParam: Pb_God.PBG2BWLike = new Pb_God.PBG2BWLike();
		sendParam.playerid = playerid;
		sendParam.worldid = worldid;
		sendParam.likeplayerid = likeplayerid;
		sendParam.robot = robot;
		CmdMgr.pushCmd(Cmd.G2BW_Ladder_Like, sendParam);
	}

	/**
	* 英雄殿	PBPlayerQuery
	*
	* @param playerid	uint32	玩家ID
	* @param worldid	uint32	世界ID
	* @param factionid	uint32	帮派ID
	*/
	export function queryHeroTop(playerid: number, worldid: number, factionid: number)
	{
		let sendParam: Pb_God.PBPlayerQuery = new Pb_God.PBPlayerQuery();
		sendParam.playerid = playerid;
		sendParam.worldid = worldid;
		sendParam.factionid = factionid;
		CmdMgr.pushCmd(Cmd.G2BW_Ladder_QueryHeroTop, sendParam);
	}

	/**
	* 更新防守阵容
	*/
	export function updateDefense()
	{
		CmdMgr.pushCmd(Cmd.G2BW_Ladder_UpdateDefense);
	}

}
module Pro.ChampionSend
{
	/**
	* 我的竞猜	无内容
	*/
	export function selfGuessAsk()
	{
		CmdMgr.pushCmd(Cmd.C2S_Champion_SelfGuessAsk);
	}

	/**
	* 查询竞猜		无内容
	*/
	export function queryGuessAsk()
	{
		CmdMgr.pushCmd(Cmd.C2S_Champion_QueryGuessAsk);
	}

	/**
	* 竞猜下注		PBC2GChampionGuessAsk
	*
	* @param isguessleft	bool	是否压住左边
	* @param guesscoin	uint32	压住竞猜币
	*/
	export function guessAsk(isguessleft: boolean, guesscoin: number)
	{
		let sendParam: Pb_God.PBC2GChampionGuessAsk = new Pb_God.PBC2GChampionGuessAsk();
		sendParam.isguessleft = isguessleft;
		sendParam.guesscoin = guesscoin;
		CmdMgr.pushCmd(Cmd.C2S_Champion_GuessAsk, sendParam);
	}

	/**
	* 查询32强		PBU32
	*
	* @param value	uint32
	*/
	export function query32List(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Champion_Query32List, sendParam);
	}

	/**
	* 查询4强
	*/
	export function query4List()
	{
		CmdMgr.pushCmd(Cmd.C2S_Champion_Query4List);
	}

	/**
	* 我的竞猜记录
	*/
	export function guessRecordAsk()
	{
		CmdMgr.pushCmd(Cmd.C2S_Champion_GuessRecordAsk);
	}

	/**
	* 我的战斗记录
	*/
	export function fightRecordAsk()
	{
		CmdMgr.pushCmd(Cmd.C2S_Champion_FightRecordAsk);
	}

	/**
	* 发送弹幕		PBC2GChampionSendDanmuAsk
	*
	* @param msg	string	消息
	*/
	export function sendDanmuAsk(msg: string)
	{
		let sendParam: Pb_God.PBC2GChampionSendDanmuAsk = new Pb_God.PBC2GChampionSendDanmuAsk();
		sendParam.msg = msg;
		CmdMgr.pushCmd(Cmd.C2S_Champion_SendDanmuAsk, sendParam);
	}

	/**
	* 请求查询弹幕PBC2GChampionQueryDanmu
	*
	* @param startindex	uint32	开始索引
	* @param count	uint32	数量
	*/
	export function queryDanmuAsk(startindex: number, count: number)
	{
		let sendParam: Pb_God.PBC2GChampionQueryDanmu = new Pb_God.PBC2GChampionQueryDanmu();
		sendParam.startindex = startindex;
		sendParam.count = count;
		CmdMgr.pushCmd(Cmd.C2S_Champion_QueryDanmuAsk, sendParam);
	}

	/**
	* 查询下注信息
	*/
	export function queryOddsAsk()
	{
		CmdMgr.pushCmd(Cmd.C2S_Champion_QueryOddsAsk);
	}

	/**
	* 打开
	*/
	export function openAsk()
	{
		CmdMgr.pushCmd(Cmd.C2S_Champion_OpenAsk);
	}

	/**
	* 查看对战信息	PBC2GChampionQueryBattleInfo
	*
	* @param roundid	uint32	回合ID
	* @param leftplayerid	uint32	左边玩家ID
	* @param rightplayerid	uint32	右边玩家ID
	*/
	export function queryBattleInfo(roundid: number, leftplayerid: number, rightplayerid: number)
	{
		let sendParam: Pb_God.PBC2GChampionQueryBattleInfo = new Pb_God.PBC2GChampionQueryBattleInfo();
		sendParam.roundid = roundid;
		sendParam.leftplayerid = leftplayerid;
		sendParam.rightplayerid = rightplayerid;
		CmdMgr.pushCmd(Cmd.C2S_Champion_QueryBattleInfo, sendParam);
	}

	/**
	* 查询对应回合数据		PBC2GChampionQueryRound
	*
	* @param roundid	uint32	回合ID
	* @param areaid	uint32	分区id
	*/
	export function queryRound(roundid: number, areaid: number)
	{
		let sendParam: Pb_God.PBC2GChampionQueryRound = new Pb_God.PBC2GChampionQueryRound();
		sendParam.roundid = roundid;
		sendParam.areaid = areaid;
		CmdMgr.pushCmd(Cmd.C2S_Champion_QueryRound, sendParam);
	}

	/**
	* 点赞		PBC2GChampionLike
	*
	* @param likeplayerid	uint32	点赞playerid
	*/
	export function like(likeplayerid: number)
	{
		let sendParam: Pb_God.PBC2GChampionLike = new Pb_God.PBC2GChampionLike();
		sendParam.likeplayerid = likeplayerid;
		CmdMgr.pushCmd(Cmd.C2S_Champion_Like, sendParam);
	}

	/**
	* gm开启活动		PBC2GChampionGM
	*
	* @param type	uint32	操作类型
	* @param value	uint32	参数
	*/
	export function gmOpt(type: number, value: number)
	{
		let sendParam: Pb_God.PBC2GChampionGM = new Pb_God.PBC2GChampionGM();
		sendParam.type = type;
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Champion_GmOpt, sendParam);
	}

	/**
	* 战斗结果返回
	*/
	export function fightResult()
	{
		CmdMgr.pushCmd(Cmd.C2S_Champion_FightResult);
	}

}
module Pro.HolySend
{
	/**
	* 	升级		PBU32
	*
	* @param value	uint32
	*/
	export function upgrade(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Holy_Upgrade, sendParam);
	}

	/**
	* 	进阶		PBC2GHolyAdvanceAsk
	*
	* @param pettype	uint32	伙伴类型
	* @param petsn	uint64	伙伴SN
	*/
	export function advance(pettype: number, petsn: Long[])
	{
		let sendParam: Pb_God.PBC2GHolyAdvanceAsk = new Pb_God.PBC2GHolyAdvanceAsk();
		sendParam.pettype = pettype;
		sendParam.petsn = petsn;
		CmdMgr.pushCmd(Cmd.C2S_Holy_Advance, sendParam);
	}

	/**
	* 	解锁		PBC2GHolyAdvanceAsk
	*
	* @param pettype	uint32	伙伴类型
	* @param petsn	uint64	伙伴SN
	*/
	export function unlock(pettype: number, petsn: Long[])
	{
		let sendParam: Pb_God.PBC2GHolyAdvanceAsk = new Pb_God.PBC2GHolyAdvanceAsk();
		sendParam.pettype = pettype;
		sendParam.petsn = petsn;
		CmdMgr.pushCmd(Cmd.C2S_Holy_Unlock, sendParam);
	}

}
module Pro.VideoSend
{
	/**
	* 查询系统录像		PBU32
	*
	* @param value	uint32
	*/
	export function querySystem(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Video_QuerySystem, sendParam);
	}

	/**
	* 点赞				PBC2GVideoActionAsk
	*
	* @param videotype	uint32	系统录像类型
	* @param battlesn	uint64	流水ID
	*/
	export function like(videotype: number, battlesn: Long)
	{
		let sendParam: Pb_God.PBC2GVideoActionAsk = new Pb_God.PBC2GVideoActionAsk();
		sendParam.videotype = videotype;
		sendParam.battlesn = battlesn;
		CmdMgr.pushCmd(Cmd.C2S_Video_Like, sendParam);
	}

	/**
	* 播放系统录像		PBC2GVideoPlayerAsk
	*
	* @param videotype	uint32	系统录像类型
	* @param battlesn	uint64	流水ID
	* @param key	uint32	挂机/试练塔表示层数,玩家的录像表示玩家ID
	*/
	export function playSystem(videotype: number, battlesn: Long, key: number)
	{
		let sendParam: Pb_God.PBC2GVideoPlayerAsk = new Pb_God.PBC2GVideoPlayerAsk();
		sendParam.videotype = videotype;
		sendParam.battlesn = battlesn;
		sendParam.key = key;
		CmdMgr.pushCmd(Cmd.C2S_Video_PlaySystem, sendParam);
	}

	/**
	* 播放玩家录像		PBC2GVideoPlayerAsk
	*
	* @param videotype	uint32	系统录像类型
	* @param battlesn	uint64	流水ID
	* @param key	uint32	挂机/试练塔表示层数,玩家的录像表示玩家ID
	*/
	export function playPlayer(videotype: number, battlesn: Long, key: number)
	{
		let sendParam: Pb_God.PBC2GVideoPlayerAsk = new Pb_God.PBC2GVideoPlayerAsk();
		sendParam.videotype = videotype;
		sendParam.battlesn = battlesn;
		sendParam.key = key;
		CmdMgr.pushCmd(Cmd.C2S_Video_PlayPlayer, sendParam);
	}

	/**
	* 分享				PBC2GVideoActionAsk
	*
	* @param videotype	uint32	系统录像类型
	* @param battlesn	uint64	流水ID
	*/
	export function share(videotype: number, battlesn: Long)
	{
		let sendParam: Pb_God.PBC2GVideoActionAsk = new Pb_God.PBC2GVideoActionAsk();
		sendParam.videotype = videotype;
		sendParam.battlesn = battlesn;
		CmdMgr.pushCmd(Cmd.C2S_Video_Share, sendParam);
	}

	/**
	* 收藏				PBU64
	*
	* @param value	uint64
	*/
	export function collect(value: Long)
	{
		let sendParam: Pb_God.PBU64 = new Pb_God.PBU64();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Video_Collect, sendParam);
	}

	/**
	* 取消收藏			PBU64
	*
	* @param value	uint64
	*/
	export function unCollect(value: Long)
	{
		let sendParam: Pb_God.PBU64 = new Pb_God.PBU64();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Video_UnCollect, sendParam);
	}

	/**
	* 查询战斗数据		PBC2GVideoActionAsk
	*
	* @param videotype	uint32	系统录像类型
	* @param battlesn	uint64	流水ID
	*/
	export function queryDamageData(videotype: number, battlesn: Long)
	{
		let sendParam: Pb_God.PBC2GVideoActionAsk = new Pb_God.PBC2GVideoActionAsk();
		sendParam.videotype = videotype;
		sendParam.battlesn = battlesn;
		CmdMgr.pushCmd(Cmd.C2S_Video_QueryDamageData, sendParam);
	}

	/**
	* 查询录像伙伴数据	PBC2GQueryBattlePet
	*
	* @param battlesn	uint64	流水ID
	* @param petsn	uint64	伙伴SN
	* @param videotype	uint64	录像类型
	*/
	export function queryBattlePet(battlesn: Long, petsn: Long, videotype: Long)
	{
		let sendParam: Pb_God.PBC2GQueryBattlePet = new Pb_God.PBC2GQueryBattlePet();
		sendParam.battlesn = battlesn;
		sendParam.petsn = petsn;
		sendParam.videotype = videotype;
		CmdMgr.pushCmd(Cmd.C2S_Video_QueryBattlePet, sendParam);
	}

	/**
	* 查询单个录像		PBU64
	*
	* @param value	uint64
	*/
	export function querySingle(value: Long)
	{
		let sendParam: Pb_God.PBU64 = new Pb_God.PBU64();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Video_QuerySingle, sendParam);
	}

	/**
	* 查询挂机录像录像	PBU32
	*
	* @param value	uint32
	*/
	export function queryHook(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Video_QueryHook, sendParam);
	}

	/**
	* 查询试练塔录像	PBU32
	*
	* @param value	uint32
	*/
	export function queryTower(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Video_QueryTower, sendParam);
	}

	/**
	* 查询玩家录像记录	PBC2GQueryPlayerRecord
	*
	* @param videotype	uint32	录像类型_emVideoType
	* @param param	uint32	参数(表示关卡)
	*/
	export function queryPlayerRecord(videotype: number, param: number)
	{
		let sendParam: Pb_God.PBC2GQueryPlayerRecord = new Pb_God.PBC2GQueryPlayerRecord();
		sendParam.videotype = videotype;
		sendParam.param = param;
		CmdMgr.pushCmd(Cmd.C2S_Video_QueryPlayerRecord, sendParam);
	}

	/**
	* 查询多个录像		PBC2GQueryMutileVideo
	*
	* @param type	uint32	视频类型_emVideoType
	* @param battlesn	uint64	战斗sn
	*/
	export function queryMutiple(type: number, battlesn: Long[])
	{
		let sendParam: Pb_God.PBC2GQueryMutileVideo = new Pb_God.PBC2GQueryMutileVideo();
		sendParam.type = type;
		sendParam.battlesn = battlesn;
		CmdMgr.pushCmd(Cmd.C2S_Video_QueryMutiple, sendParam);
	}

	/**
	* 查询跨服录像多个	PBC2GQueryMutileVideoBW
	*
	* @param type	uint32	视频类型_emVideoType
	* @param battlesn	uint64	战斗sn
	*/
	export function queryMutipleBW(type: number, battlesn: Long[])
	{
		let sendParam: Pb_God.PBC2GQueryMutileVideoBW = new Pb_God.PBC2GQueryMutileVideoBW();
		sendParam.type = type;
		sendParam.battlesn = battlesn;
		CmdMgr.pushCmd(Cmd.C2S_Video_QueryMutipleBW, sendParam);
	}

	/**
	* 查询跨服伤害数据(videotype,sn)PBU32U64
	*
	* @param key	uint32
	* @param value	uint64
	*/
	export function queryDamageDataBW(key: number, value: Long)
	{
		let sendParam: Pb_God.PBU32U64 = new Pb_God.PBU32U64();
		sendParam.key = key;
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Video_QueryDamageDataBW, sendParam);
	}

	/**
	* 查询跨服伙伴数据PBC2GQueryBattlePetBW
	*
	* @param type	uint32	视频类型_emVideoType
	* @param battlesn	uint64	战斗sn
	* @param petsn	uint64	伙伴SN
	*/
	export function queryBattlePetBW(type: number, battlesn: Long, petsn: Long)
	{
		let sendParam: Pb_God.PBC2GQueryBattlePetBW = new Pb_God.PBC2GQueryBattlePetBW();
		sendParam.type = type;
		sendParam.battlesn = battlesn;
		sendParam.petsn = petsn;
		CmdMgr.pushCmd(Cmd.C2S_Video_QueryBattlePetBW, sendParam);
	}

	/**
	* 播放跨服录像(videotype,sn)PBU32U64
	*
	* @param key	uint32
	* @param value	uint64
	*/
	export function playBW(key: number, value: Long)
	{
		let sendParam: Pb_God.PBU32U64 = new Pb_God.PBU32U64();
		sendParam.key = key;
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Video_PlayBW, sendParam);
	}

	/**
	* 查询个人收藏	PBC2GQueryCollect
	*
	* @param battlesn	uint64	流水ID
	*/
	export function queryCollect(battlesn: Long[])
	{
		let sendParam: Pb_God.PBC2GQueryCollect = new Pb_God.PBC2GQueryCollect();
		sendParam.battlesn = battlesn;
		CmdMgr.pushCmd(Cmd.C2S_Video_QueryCollect, sendParam);
	}

	/**
	* 查询个人记录	PBU32
	*
	* @param value	uint32
	*/
	export function querySelfRecord(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Video_QuerySelfRecord, sendParam);
	}

	/**
	* 查询挂机录像录像	PBWorldStageVideoInfo
	*
	* @param stageid	uint32	关卡
	* @param fast	PBPlayerVideoDisplay	最快
	* @param fightpower	PBPlayerVideoDisplay	最小战力
	* @param lately	PBPlayerVideoDisplay	最近/我的通关录像
	*/
	export function queryTowerToWorld(stageid: number, fast: any, fightpower: any, lately: any)
	{
		let sendParam: Pb_God.PBWorldStageVideoInfo = new Pb_God.PBWorldStageVideoInfo();
		sendParam.stageid = stageid;
		sendParam.fast = fast;
		sendParam.fightpower = fightpower;
		sendParam.lately = lately;
		CmdMgr.pushCmd(Cmd.C2S_Video_QueryTowerToWorld, sendParam);
	}

	/**
	* 添加离线记录	PBFightResult
	*
	* @param base	PBFightBase	战斗公共
	* @param round	uint32	回合数
	* @param result	uint32	战斗结果_emBattleResult
	* @param endtime	uint32	战斗结束时间
	* @param friendstate	PBPetFightStateInfo	友方状态
	* @param energystate	PBPetFightStateInfo	敌方状态
	* @param prize	PBItemInfo	战斗奖励
	* @param achieve	PBU32U32	成就数据(服务器用)
	* @param challengeresult	PBFightChallengeResult	竞技场战斗结果
	* @param danresult	PBFightDanResult	超凡段位赛结果
	* @param ladderresult	PBFightLadderResult	跨服天梯结果
	* @param friendartifactstate	PBPetFightStateInfo	我发神器状态
	* @param enemyartifactstate	PBPetFightStateInfo	敌方神器状态
	* @param heavenresult	PBFightHeavenResult	天界副本结果
	* @param crosschallengeresult	PBFightCrossChallengeResult	跨服竞技场战斗结果
	*/
	export function addOfflineRecord(base: any, round: number, result: number, endtime: number, friendstate: any[], energystate: any[], prize: any[], achieve: any[], challengeresult: any, danresult: any, ladderresult: any, friendartifactstate: any, enemyartifactstate: any, heavenresult: any, crosschallengeresult: any)
	{
		let sendParam: Pb_God.PBFightResult = new Pb_God.PBFightResult();
		sendParam.base = base;
		sendParam.round = round;
		sendParam.result = result;
		sendParam.endtime = endtime;
		sendParam.friendstate = friendstate;
		sendParam.energystate = energystate;
		sendParam.prize = prize;
		sendParam.achieve = achieve;
		sendParam.challengeresult = challengeresult;
		sendParam.danresult = danresult;
		sendParam.ladderresult = ladderresult;
		sendParam.friendartifactstate = friendartifactstate;
		sendParam.enemyartifactstate = enemyartifactstate;
		sendParam.heavenresult = heavenresult;
		sendParam.crosschallengeresult = crosschallengeresult;
		CmdMgr.pushCmd(Cmd.C2S_Video_AddOfflineRecord, sendParam);
	}

	/**
	* 清除玩家录像(录像类型)	PBU32
	*
	* @param value	uint32
	*/
	export function clearPlayerType(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Video_ClearPlayerType, sendParam);
	}

}
module Pro.PrivilegeSend
{
	/**
	* 	购买vip礼包			PBU32
	*
	* @param value	uint32
	*/
	export function buyVipPacket(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Privilege_BuyVipPacket, sendParam);
	}

	/**
	* 	购买特权商店			PBU32
	*
	* @param value	uint32
	*/
	export function shopBuy(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Privilege_ShopBuy, sendParam);
	}

	/**
	* 	领取每日奖励			PBU32
	*
	* @param value	uint32
	*/
	export function dailyPrize(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Privilege_DailyPrize, sendParam);
	}

}
module Pro.WealSend
{
	/**
	* 	签到
	*/
	export function signin()
	{
		CmdMgr.pushCmd(Cmd.C2S_Weal_Signin);
	}

	/**
	* 	点石成金获取奖励PBU32
	*
	* @param value	uint32
	*/
	export function clickGold(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Weal_ClickGold, sendParam);
	}

	/**
	* 	获取返利奖励
	*/
	export function getFanLiAward()
	{
		CmdMgr.pushCmd(Cmd.C2S_Weal_GetFanLiAward);
	}

	/**
	* 	cdk验证	PBString
	*
	* @param value	string
	*/
	export function cDK(value: string)
	{
		let sendParam: Pb_God.PBString = new Pb_God.PBString();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Weal_CDK, sendParam);
	}

	/**
	* 	领取在线奖励	PBU32
	*
	* @param value	uint32
	*/
	export function onlinePrize(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Weal_OnlinePrize, sendParam);
	}

	/**
	* 	领取礼包	PBU32
	*
	* @param value	uint32
	*/
	export function getGift(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Weal_GetGift, sendParam);
	}

	/**
	* 	获取找回资源数据PBC2GResourceFindBackInfo
	*
	*/
	export function getInfo()
	{
		let sendParam: Pb_God.PBC2GResourceFindBackInfo = new Pb_God.PBC2GResourceFindBackInfo();
		CmdMgr.pushCmd(Cmd.C2S_ResourceFindBack_GetInfo, sendParam);
	}

	/**
	* 	领取找回资源PBC2GDrawFindBack
	*
	* @param DrawMode	uint32	see@EnmDrawMode
	* @param ResourceID	uint32	默认0表示一键领取see@EnmResourceID
	*/
	export function draw(DrawMode: number, ResourceID: number)
	{
		let sendParam: Pb_God.PBC2GDrawFindBack = new Pb_God.PBC2GDrawFindBack();
		sendParam.DrawMode = DrawMode;
		sendParam.ResourceID = ResourceID;
		CmdMgr.pushCmd(Cmd.C2S_ResourceFindBack_Draw, sendParam);
	}

}
module Pro.ActivitySend
{
	/**
	* 	领奖品PBG2CActivityDrawReward
	*
	* @param id	uint32	活动ID
	* @param index	uint32	索引，对应活动配置表里的索引
	* @param num	uint32	领取数量
	*/
	export function drawReward(id: number, index: number, num: number)
	{
		let sendParam: Pb_God.PBG2CActivityDrawReward = new Pb_God.PBG2CActivityDrawReward();
		sendParam.id = id;
		sendParam.index = index;
		sendParam.num = num;
		CmdMgr.pushCmd(Cmd.C2S_Activity_DrawReward, sendParam);
	}

	/**
	* 获取当前活动的开始时间PBC2GActivityStartTime
	*
	* @param id	uint32	活动的ID,如果为空(没有指定活动)，返回所有的活动，否则只返回请求id的开始时间
	*/
	export function getStartTime(id: number[])
	{
		let sendParam: Pb_God.PBC2GActivityStartTime = new Pb_God.PBC2GActivityStartTime();
		sendParam.id = id;
		CmdMgr.pushCmd(Cmd.C2S_Activity_GetStartTime, sendParam);
	}

	/**
	* 获取活动奖励物品的剩余数量(全区共用的奖励数量),活动IDPBU32
	*
	* @param value	uint32
	*/
	export function getRewardNum(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Activity_GetRewardNum, sendParam);
	}

	/**
	* 领奖品PBG2CActivityDrawRewardEx
	*
	* @param id	uint32	活动ID
	* @param index	uint32	索引，对应活动配置表里的索引
	* @param count	uint32	兑换数量
	* @param data	uint64	精灵SN/。。。
	*/
	export function drawRewardEx(id: number, index: number, count: number, data: Long[])
	{
		let sendParam: Pb_God.PBG2CActivityDrawRewardEx = new Pb_God.PBG2CActivityDrawRewardEx();
		sendParam.id = id;
		sendParam.index = index;
		sendParam.count = count;
		sendParam.data = data;
		CmdMgr.pushCmd(Cmd.C2S_Activity_DrawRewardEx, sendParam);
	}

	/**
	* 一键领奖PBG2CActivityDrawRewardOneKey
	*
	* @param id	uint32	活动ID
	* @param index	uint32	索引，对应活动配置表里的索引
	*/
	export function drawRewardOneKey(id: number, index: number)
	{
		let sendParam: Pb_God.PBG2CActivityDrawRewardOneKey = new Pb_God.PBG2CActivityDrawRewardOneKey();
		sendParam.id = id;
		sendParam.index = index;
		CmdMgr.pushCmd(Cmd.C2S_Activity_DrawRewardOneKey, sendParam);
	}

	/**
	* 定制礼包预选商品PBC2GActivityCustomGiftOrder
	*
	* @param ActivityID	uint32	活动ID
	* @param index	uint32	GiftIndex奖励索引
	* @param GiftPoolIndex	uint32	GiftPoolIndex奖励池Index
	*/
	export function customGiftOrder(ActivityID: number, index: number, GiftPoolIndex: number[])
	{
		let sendParam: Pb_God.PBC2GActivityCustomGiftOrder = new Pb_God.PBC2GActivityCustomGiftOrder();
		sendParam.ActivityID = ActivityID;
		sendParam.index = index;
		sendParam.GiftPoolIndex = GiftPoolIndex;
		CmdMgr.pushCmd(Cmd.C2S_Activity_CustomGiftOrder, sendParam);
	}

}
module Pro.PlatformSend
{
	/**
	* 充值PBChargeData
	*
	* @param uid	string	用户ID
	* @param sid	uint32	服务器ID
	* @param actorid	uint32	角色ID
	* @param orderno	string	游戏研发订单id
	* @param money	string	金额
	* @param productid	uint32	商品ID
	* @param time	uint32	当前请求时间
	* @param ordersign	string	订单sign
	* @param orderitem	string	订单Item商品ID*单价（分）*数量*商品名称*内购定义商品ID
	* @param currencytype	string	国内版不传，海外版必传。如美元USD，默认人民币CNY
	* @param version	string	版本号
	* @param clientparam	ClientParam	客户端参数
	*/
	export function charge(uid: string, sid: number, actorid: number, orderno: string, money: string, productid: number, time: number, ordersign: string, orderitem: string, currencytype: string, version: string, clientparam: any[])
	{
		let sendParam: Pb_God.PBChargeData = new Pb_God.PBChargeData();
		sendParam.uid = uid;
		sendParam.sid = sid;
		sendParam.actorid = actorid;
		sendParam.orderno = orderno;
		sendParam.money = money;
		sendParam.productid = productid;
		sendParam.time = time;
		sendParam.ordersign = ordersign;
		sendParam.orderitem = orderitem;
		sendParam.currencytype = currencytype;
		sendParam.version = version;
		sendParam.clientparam = clientparam;
		CmdMgr.pushCmd(Cmd.C2S_Platform_charge, sendParam);
	}

}
module Pro.TalkSend
{
	/**
	* 聊天			PBC2GTalkAsk
	*
	* @param channel	uint32	频道
	* @param data	string	聊天内容
	* @param dataext	string	聊天内容扩展
	* @param targetdisplay	PBPlayerDisplay	指定玩家只有私人聊天有用
	* @param taraccountname	string	目标的账号名
	* @param playerid	uint32	发起者ID
	* @param senderip	string	发起者的ip
	* @param order	uint64	索引
	* @param time	uint32	时间
	*/
	export function talk(channel: number, data: string, dataext: string, targetdisplay: any, taraccountname: string, playerid: number, senderip: string, order: Long, time: number)
	{
		let sendParam: Pb_God.PBC2GTalkAsk = new Pb_God.PBC2GTalkAsk();
		sendParam.channel = channel;
		sendParam.data = data;
		sendParam.dataext = dataext;
		sendParam.targetdisplay = targetdisplay;
		sendParam.taraccountname = taraccountname;
		sendParam.playerid = playerid;
		sendParam.senderip = senderip;
		sendParam.order = order;
		sendParam.time = time;
		CmdMgr.pushCmd(Cmd.C2S_Talk_Talk, sendParam);
	}

	/**
	* 删除私聊记录		PBU32
	*
	* @param value	uint32
	*/
	export function clearPlayerTalk(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Talk_ClearPlayerTalk, sendParam);
	}

	/**
	* 举报			PBC2GReportAsk
	*
	* @param accout	string	举报者账号
	* @param playerid	uint32	举报者玩家ID
	* @param playername	string	举报者角色名
	* @param serverid	string	举报者服务器id
	* @param rptplayerid	uint32	被举报者玩家id
	* @param rptplayername	string	被举报者角色名
	* @param rptserverid	uint32	被举报者服务器id
	* @param resons	uint32	举报标签
	* @param explain	string	举报说明
	* @param proof	string	举报例证
	*/
	export function report(accout: string, playerid: number, playername: string, serverid: string, rptplayerid: number, rptplayername: string, rptserverid: number, resons: number[], explain: string, proof: string)
	{
		let sendParam: Pb_God.PBC2GReportAsk = new Pb_God.PBC2GReportAsk();
		sendParam.accout = accout;
		sendParam.playerid = playerid;
		sendParam.playername = playername;
		sendParam.serverid = serverid;
		sendParam.rptplayerid = rptplayerid;
		sendParam.rptplayername = rptplayername;
		sendParam.rptserverid = rptserverid;
		sendParam.resons = resons;
		sendParam.explain = explain;
		sendParam.proof = proof;
		CmdMgr.pushCmd(Cmd.C2S_Talk_Report, sendParam);
	}

}
module Pro.TreasureSend
{
	/**
	* 	刷新(type)		PBU32
	*
	* @param value	uint32
	*/
	export function refresh(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Treasure_Refresh, sendParam);
	}

	/**
	* 	探宝(costindex)		PBC2GTreasureHunt
	*
	* @param index	uint32	消耗索引
	* @param oncemore	bool	是否是再来一次(仅供客户端使用)
	*/
	export function hunt(index: number, oncemore: boolean)
	{
		let sendParam: Pb_God.PBC2GTreasureHunt = new Pb_God.PBC2GTreasureHunt();
		sendParam.index = index;
		sendParam.oncemore = oncemore;
		CmdMgr.pushCmd(Cmd.C2S_Treasure_Hunt, sendParam);
	}

	/**
	* 	幸运值兑换物品(index)			PBU32
	*
	* @param value	uint32
	*/
	export function lucky(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Treasure_Lucky, sendParam);
	}

}
module Pro.HeavenDungeonSend
{
	/**
	* 	领章节奖品PBU32
	*
	* @param value	uint32
	*/
	export function chapterReward(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_HeavenDungeon_ChapterReward, sendParam);
	}

	/**
	* 	购买挑战次数
	*/
	export function buyCount()
	{
		CmdMgr.pushCmd(Cmd.C2S_HeavenDungeon_BuyCount);
	}

	/**
	* 	祈祷PBC2GHeavenDungeonPray
	*
	* @param statue	uint32	神像
	* @param num	uint32	次数1or10
	*/
	export function pray(statue: number, num: number)
	{
		let sendParam: Pb_God.PBC2GHeavenDungeonPray = new Pb_God.PBC2GHeavenDungeonPray();
		sendParam.statue = statue;
		sendParam.num = num;
		CmdMgr.pushCmd(Cmd.C2S_HeavenDungeon_Pray, sendParam);
	}

	/**
	* 扫荡关卡,服务器用S2C_HeavenDungeon_StageChange返回PBU32
	*
	* @param value	uint32
	*/
	export function sweep(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_HeavenDungeon_Sweep, sendParam);
	}

}
module Pro.CrossChallengeSend
{
	/**
	* 刷新对手
	*/
	export function refresh()
	{
		CmdMgr.pushCmd(Cmd.C2S_CrossChallenge_Refresh);
	}

	/**
	* 领取每日宝箱(index)						PBU32
	*
	* @param value	uint32
	*/
	export function dailyPrize(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_CrossChallenge_DailyPrize, sendParam);
	}

	/**
	* 打开跨服竞技场
	*/
	export function open()
	{
		CmdMgr.pushCmd(Cmd.C2S_CrossChallenge_Open);
	}

	/**
	* 查询玩家信息
	*/
	export function query()
	{
		CmdMgr.pushCmd(Cmd.C2S_CrossChallenge_Query);
	}

	/**
	* 赛季荣耀点赞(玩家id)				PBU32
	*
	* @param value	uint32
	*/
	export function honourLike(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_CrossChallenge_HonourLike, sendParam);
	}

	/**
	* 请求挑战记录
	*/
	export function record()
	{
		CmdMgr.pushCmd(Cmd.C2S_CrossChallenge_Record);
	}

	/**
	* 购买奖品,第一个免费，后边两个要买(index)PBU32
	*
	* @param value	uint32
	*/
	export function buyPrize(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_CrossChallenge_BuyPrize, sendParam);
	}

	/**
	* 设置防守队伍(每个队伍会发送S2C_Pet_Set_Zhenfa_Ack返回)PBCrossChallengeSetTeam
	*
	* @param team	PBPlayerZhenfaInfo	队伍3个
	* @param hideteam	bool	是否隐藏队伍3个
	*/
	export function setTeamDEF(team: any[], hideteam: boolean[])
	{
		let sendParam: Pb_God.PBCrossChallengeSetTeam = new Pb_God.PBCrossChallengeSetTeam();
		sendParam.team = team;
		sendParam.hideteam = hideteam;
		CmdMgr.pushCmd(Cmd.C2S_CrossChallenge_SetTeamDEF, sendParam);
	}

	/**
	* 设置进攻队伍(每个队伍会发送S2C_Pet_Set_Zhenfa_Ack返回)PBCrossChallengeSetTeam
	*
	* @param team	PBPlayerZhenfaInfo	队伍3个
	* @param hideteam	bool	是否隐藏队伍3个
	*/
	export function setTeamATK(team: any[], hideteam: boolean[])
	{
		let sendParam: Pb_God.PBCrossChallengeSetTeam = new Pb_God.PBCrossChallengeSetTeam();
		sendParam.team = team;
		sendParam.hideteam = hideteam;
		CmdMgr.pushCmd(Cmd.C2S_CrossChallenge_SetTeamATK, sendParam);
	}

}
module Pro.TabletSend
{
	/**
	* 	放入经验(exp)PBU64
	*
	* @param value	uint64
	*/
	export function putExp(value: Long)
	{
		let sendParam: Pb_God.PBU64 = new Pb_God.PBU64();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Tablet_PutExp, sendParam);
	}

	/**
	* 	收获魔液
	*/
	export function getMagicJuice()
	{
		CmdMgr.pushCmd(Cmd.C2S_Tablet_GetMagicJuice);
	}

	/**
	* 	放置英雄,空位sn填0(pos,petSn)PBU32U64
	*
	* @param key	uint32
	* @param value	uint64
	*/
	export function putHero(key: number, value: Long)
	{
		let sendParam: Pb_God.PBU32U64 = new Pb_God.PBU32U64();
		sendParam.key = key;
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Tablet_PutHero, sendParam);
	}

	/**
	* 	升级晶碑
	*/
	export function upgrade()
	{
		CmdMgr.pushCmd(Cmd.C2S_Tablet_Upgrade);
	}

	/**
	* 	创造英雄PBC2SCreateHero
	*
	* @param sn	uint64	英雄sn
	* @param skill	PBU32U32	天赋技能
	*/
	export function create(sn: Long, skill: any[])
	{
		let sendParam: Pb_God.PBC2SCreateHero = new Pb_God.PBC2SCreateHero();
		sendParam.sn = sn;
		sendParam.skill = skill;
		CmdMgr.pushCmd(Cmd.C2S_Tablet_Create, sendParam);
	}

	/**
	* 	请求魔液状态
	*/
	export function magicJuice()
	{
		CmdMgr.pushCmd(Cmd.C2S_Tablet_MagicJuice);
	}

	/**
	* 	取回经验
	*/
	export function getBackExp()
	{
		CmdMgr.pushCmd(Cmd.C2S_Tablet_GetBackExp);
	}

}
module Pro.WeekChampionSend
{
	/**
	* 我的竞猜	无内容
	*/
	export function selfGuessAsk()
	{
		CmdMgr.pushCmd(Cmd.C2S_WeekChampion_SelfGuessAsk);
	}

	/**
	* 查询竞猜		无内容
	*/
	export function queryGuessAsk()
	{
		CmdMgr.pushCmd(Cmd.C2S_WeekChampion_QueryGuessAsk);
	}

	/**
	* 竞猜下注		PBC2GChampionGuessAsk
	*
	* @param isguessleft	bool	是否压住左边
	* @param guesscoin	uint32	压住竞猜币
	*/
	export function guessAsk(isguessleft: boolean, guesscoin: number)
	{
		let sendParam: Pb_God.PBC2GChampionGuessAsk = new Pb_God.PBC2GChampionGuessAsk();
		sendParam.isguessleft = isguessleft;
		sendParam.guesscoin = guesscoin;
		CmdMgr.pushCmd(Cmd.C2S_WeekChampion_GuessAsk, sendParam);
	}

	/**
	* 查询32强		PBU32
	*
	* @param value	uint32
	*/
	export function query32List(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_WeekChampion_Query32List, sendParam);
	}

	/**
	* 查询4强
	*/
	export function query4List()
	{
		CmdMgr.pushCmd(Cmd.C2S_WeekChampion_Query4List);
	}

	/**
	* 我的竞猜记录
	*/
	export function guessRecordAsk()
	{
		CmdMgr.pushCmd(Cmd.C2S_WeekChampion_GuessRecordAsk);
	}

	/**
	* 我的战斗记录
	*/
	export function fightRecordAsk()
	{
		CmdMgr.pushCmd(Cmd.C2S_WeekChampion_FightRecordAsk);
	}

	/**
	* 发送弹幕		PBC2GChampionSendDanmuAsk
	*
	* @param msg	string	消息
	*/
	export function sendDanmuAsk(msg: string)
	{
		let sendParam: Pb_God.PBC2GChampionSendDanmuAsk = new Pb_God.PBC2GChampionSendDanmuAsk();
		sendParam.msg = msg;
		CmdMgr.pushCmd(Cmd.C2S_WeekChampion_SendDanmuAsk, sendParam);
	}

	/**
	* 请求查询弹幕PBC2GChampionQueryDanmu
	*
	* @param startindex	uint32	开始索引
	* @param count	uint32	数量
	*/
	export function queryDanmuAsk(startindex: number, count: number)
	{
		let sendParam: Pb_God.PBC2GChampionQueryDanmu = new Pb_God.PBC2GChampionQueryDanmu();
		sendParam.startindex = startindex;
		sendParam.count = count;
		CmdMgr.pushCmd(Cmd.C2S_WeekChampion_QueryDanmuAsk, sendParam);
	}

	/**
	* 查询下注信息
	*/
	export function queryOddsAsk()
	{
		CmdMgr.pushCmd(Cmd.C2S_WeekChampion_QueryOddsAsk);
	}

	/**
	* 打开
	*/
	export function openAsk()
	{
		CmdMgr.pushCmd(Cmd.C2S_WeekChampion_OpenAsk);
	}

	/**
	* 查看对战信息	PBC2GChampionQueryBattleInfo
	*
	* @param roundid	uint32	回合ID
	* @param leftplayerid	uint32	左边玩家ID
	* @param rightplayerid	uint32	右边玩家ID
	*/
	export function queryBattleInfo(roundid: number, leftplayerid: number, rightplayerid: number)
	{
		let sendParam: Pb_God.PBC2GChampionQueryBattleInfo = new Pb_God.PBC2GChampionQueryBattleInfo();
		sendParam.roundid = roundid;
		sendParam.leftplayerid = leftplayerid;
		sendParam.rightplayerid = rightplayerid;
		CmdMgr.pushCmd(Cmd.C2S_WeekChampion_QueryBattleInfo, sendParam);
	}

	/**
	* 查询对应回合玩家		PBC2GChampionQueryRound
	*
	* @param roundid	uint32	回合ID
	* @param areaid	uint32	分区id
	*/
	export function queryRound(roundid: number, areaid: number)
	{
		let sendParam: Pb_God.PBC2GChampionQueryRound = new Pb_God.PBC2GChampionQueryRound();
		sendParam.roundid = roundid;
		sendParam.areaid = areaid;
		CmdMgr.pushCmd(Cmd.C2S_WeekChampion_QueryRound, sendParam);
	}

	/**
	* 点赞		PBC2GChampionLike
	*
	* @param likeplayerid	uint32	点赞playerid
	*/
	export function like(likeplayerid: number)
	{
		let sendParam: Pb_God.PBC2GChampionLike = new Pb_God.PBC2GChampionLike();
		sendParam.likeplayerid = likeplayerid;
		CmdMgr.pushCmd(Cmd.C2S_WeekChampion_Like, sendParam);
	}

	/**
	* gm开启活动		PBC2GChampionGM
	*
	* @param type	uint32	操作类型
	* @param value	uint32	参数
	*/
	export function gmOpt(type: number, value: number)
	{
		let sendParam: Pb_God.PBC2GChampionGM = new Pb_God.PBC2GChampionGM();
		sendParam.type = type;
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_WeekChampion_GmOpt, sendParam);
	}

	/**
	* 战斗结果返回
	*/
	export function fightResult()
	{
		CmdMgr.pushCmd(Cmd.C2S_WeekChampion_FightResult);
	}

}
module Pro.TeamCampaignSend
{
	/**
	* 选择难度(难度1~10)			PBU32
	*
	* @param value	uint32
	*/
	export function select(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_TeamCampaign_Select, sendParam);
	}

	/**
	* 领取额外奖励(序号012)		PBU32
	*
	* @param value	uint32
	*/
	export function selectExtraPrize(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_TeamCampaign_SelectExtraPrize, sendParam);
	}

	/**
	* 查询伙伴状态
	*/
	export function queryPetState()
	{
		CmdMgr.pushCmd(Cmd.C2S_TeamCampaign_QueryPetState);
	}

	/**
	* 查询关卡状态
	*/
	export function queryStageState()
	{
		CmdMgr.pushCmd(Cmd.C2S_TeamCampaign_QueryStageState);
	}

	/**
	* 查询敌人数据(stage)	PBU32
	*
	* @param value	uint32
	*/
	export function queryStageTarget(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_TeamCampaign_QueryStageTarget, sendParam);
	}

	/**
	* 废弃
	*/
	export function xxxxxxxxxx()
	{
		CmdMgr.pushCmd(Cmd.C2S_TeamCampaign_xxxxxxxxxx);
	}

}
module Pro.DragonBallSend
{
	/**
	* 解锁PBU32
	*
	* @param value	uint32
	*/
	export function unLock(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_DragonBall_UnLock, sendParam);
	}

	/**
	* 升级	PBU32
	*
	* @param value	uint32
	*/
	export function levelup(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_DragonBall_Levelup, sendParam);
	}

}
module Pro.ConvenantSend
{
	/**
	* 解锁
	*/
	export function unLock()
	{
		CmdMgr.pushCmd(Cmd.C2S_Convenant_UnLock);
	}

	/**
	* 升级
	*/
	export function levelup()
	{
		CmdMgr.pushCmd(Cmd.C2S_Convenant_Levelup);
	}

	/**
	* 选择属性(id,index1,2,3)PBU32U32
	*
	* @param key	uint32
	* @param value	uint32
	*/
	export function attr(key: number, value: number)
	{
		let sendParam: Pb_God.PBU32U32 = new Pb_God.PBU32U32();
		sendParam.key = key;
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Convenant_Attr, sendParam);
	}

	/**
	* 计算战斗力(id)PBU32
	*
	* @param value	uint32
	*/
	export function power(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Convenant_Power, sendParam);
	}

}
module Pro.LotterySend
{
	/**
	* 	许愿请求PBC2GLotteryRefresh
	*
	* @param type	uint32	类型值，用于扩展区别不同玩法，_emLotteryType
	* @param index	uint32	许愿序号_emLotteryRefreshType
	*/
	export function refresh(type: number, index: number)
	{
		let sendParam: Pb_God.PBC2GLotteryRefresh = new Pb_God.PBC2GLotteryRefresh();
		sendParam.type = type;
		sendParam.index = index;
		CmdMgr.pushCmd(Cmd.C2S_Lottery_Refresh, sendParam);
	}

	/**
	* 	许愿池设置请求PBC2GLotteryPoolSet
	*
	* @param type	uint32	类型值，用于扩展区别不同玩法，_emLotteryType
	* @param index	uint32	许愿序号，0次数为1;1次数为10次许愿
	*/
	export function pool_Set(type: number, index: number)
	{
		let sendParam: Pb_God.PBC2GLotteryPoolSet = new Pb_God.PBC2GLotteryPoolSet();
		sendParam.type = type;
		sendParam.index = index;
		CmdMgr.pushCmd(Cmd.C2S_Lottery_Pool_Set, sendParam);
	}

}
module Pro.IllustrationSend
{
	/**
	* 往图鉴背包加PBC2GADDPetAsk
	*
	* @param petsn	uint64	伙伴SN
	*/
	export function addPetAsk(petsn: Long)
	{
		let sendParam: Pb_God.PBC2GADDPetAsk = new Pb_God.PBC2GADDPetAsk();
		sendParam.petsn = petsn;
		CmdMgr.pushCmd(Cmd.C2S_Illustration_addPetAsk, sendParam);
	}

	/**
	* 从图鉴背包减	PBC2GRemovePetAsk
	*
	* @param petskinid	uint32	伙伴皮肤id
	*/
	export function removePetAsk(petskinid: number)
	{
		let sendParam: Pb_God.PBC2GRemovePetAsk = new Pb_God.PBC2GRemovePetAsk();
		sendParam.petskinid = petskinid;
		CmdMgr.pushCmd(Cmd.C2S_Illustration_removePetAsk, sendParam);
	}

}
module Pro.RedEnvelopeSend
{
	/**
	* 打开红包PBC2GOpenRedEnvelopeAsk
	*
	* @param index	uint32	红包索引
	*/
	export function openAsk(index: number)
	{
		let sendParam: Pb_God.PBC2GOpenRedEnvelopeAsk = new Pb_God.PBC2GOpenRedEnvelopeAsk();
		sendParam.index = index;
		CmdMgr.pushCmd(Cmd.C2S_RedEnvelope_OpenAsk, sendParam);
	}

}
module Pro.JoyousLinkupSend
{
	/**
	* 	开始游戏PBC2GJoyousLinkupStart
	*
	* @param bStart	bool	是否为重开
	*/
	export function start(bStart: boolean)
	{
		let sendParam: Pb_God.PBC2GJoyousLinkupStart = new Pb_God.PBC2GJoyousLinkupStart();
		sendParam.bStart = bStart;
		CmdMgr.pushCmd(Cmd.C2S_JoyousLinkup_Start, sendParam);
	}

	/**
	* 	连接棋子PBC2GJoyousLinkupConnect
	*
	* @param startPos	PBJoyousLinkupPos	起始棋子坐标
	* @param endPos	PBJoyousLinkupPos	目标棋子坐标
	*/
	export function connect(startPos: any, endPos: any)
	{
		let sendParam: Pb_God.PBC2GJoyousLinkupConnect = new Pb_God.PBC2GJoyousLinkupConnect();
		sendParam.startPos = startPos;
		sendParam.endPos = endPos;
		CmdMgr.pushCmd(Cmd.C2S_JoyousLinkup_Connect, sendParam);
	}

	/**
	* 	刷新棋子位置
	*/
	export function refresh()
	{
		CmdMgr.pushCmd(Cmd.C2S_JoyousLinkup_Refresh);
	}

	/**
	* 	退出游戏
	*/
	export function quit()
	{
		CmdMgr.pushCmd(Cmd.C2S_JoyousLinkup_Quit);
	}

}
module Pro.GuessSend
{
	/**
	* 答题开始，请求题目
	*/
	export function begin()
	{
		CmdMgr.pushCmd(Cmd.C2S_Guess_Begin);
	}

	/**
	* 发送选择给服务器PBC2GAnswerAsk
	*
	* @param answer	uint32	答案索引
	*/
	export function answer_Ask(answer: number)
	{
		let sendParam: Pb_God.PBC2GAnswerAsk = new Pb_God.PBC2GAnswerAsk();
		sendParam.answer = answer;
		CmdMgr.pushCmd(Cmd.C2S_Guess_Answer_Ask, sendParam);
	}

	/**
	* 发送退出给服务器
	*/
	export function exit_Ask()
	{
		CmdMgr.pushCmd(Cmd.C2S_Guess_Exit_Ask);
	}

	/**
	* 请求服务器下一题
	*/
	export function next()
	{
		CmdMgr.pushCmd(Cmd.C2S_Guess_Next);
	}

}
module Pro.DefendSend
{
	/**
	* 	升级
	*/
	export function levelUp()
	{
		CmdMgr.pushCmd(Cmd.C2S_Defend_LevelUp);
	}

	/**
	* 	升阶
	*/
	export function rankUp()
	{
		CmdMgr.pushCmd(Cmd.C2S_Defend_RankUp);
	}

	/**
	* 	保存方案PBDefendPlan
	*
	* @param index	uint32	方案索引
	* @param pets	PBDefendPetSlot	英雄列表
	* @param skills	PBDefendPetSlot	技能顺序列表
	*/
	export function savePlan(index: number, pets: any[], skills: any[])
	{
		let sendParam: Pb_God.PBDefendPlan = new Pb_God.PBDefendPlan();
		sendParam.index = index;
		sendParam.pets = pets;
		sendParam.skills = skills;
		CmdMgr.pushCmd(Cmd.C2S_Defend_SavePlan, sendParam);
	}

	/**
	* 	使用方案PBC2GDefendUsePlan
	*
	* @param index	uint32	方案索引
	*/
	export function usePlan(index: number)
	{
		let sendParam: Pb_God.PBC2GDefendUsePlan = new Pb_God.PBC2GDefendUsePlan();
		sendParam.index = index;
		CmdMgr.pushCmd(Cmd.C2S_Defend_UsePlan, sendParam);
	}

	/**
	* 	解锁方案PBC2GDefendUnlockPlan
	*
	* @param index	uint32	方案索引
	*/
	export function unlockPlan(index: number)
	{
		let sendParam: Pb_God.PBC2GDefendUnlockPlan = new Pb_God.PBC2GDefendUnlockPlan();
		sendParam.index = index;
		CmdMgr.pushCmd(Cmd.C2S_Defend_UnlockPlan, sendParam);
	}

	/**
	* 	属性预览PBC2GDefendPreviewAttr
	*
	* @param blevel	bool	是否为等级
	*/
	export function previewAttr(blevel: boolean)
	{
		let sendParam: Pb_God.PBC2GDefendPreviewAttr = new Pb_God.PBC2GDefendPreviewAttr();
		sendParam.blevel = blevel;
		CmdMgr.pushCmd(Cmd.C2S_Defend_PreviewAttr, sendParam);
	}

	/**
	* 	移除某个宠物PBC2GDefendRemovePet
	*
	* @param snid	uint64	宠物id
	*/
	export function removePet(snid: Long)
	{
		let sendParam: Pb_God.PBC2GDefendRemovePet = new Pb_God.PBC2GDefendRemovePet();
		sendParam.snid = snid;
		CmdMgr.pushCmd(Cmd.C2S_Defend_RemovePet, sendParam);
	}

}
module Pro.ResonanceSend
{
	/**
	* 	开启格子			PBC2GResonanceOpenGrid
	*
	* @param type	uint32	_emResonanceType
	*/
	export function openGrid(type: number)
	{
		let sendParam: Pb_God.PBC2GResonanceOpenGrid = new Pb_God.PBC2GResonanceOpenGrid();
		sendParam.type = type;
		CmdMgr.pushCmd(Cmd.C2S_Resonance_OpenGrid, sendParam);
	}

	/**
	* 	重置冷却			PBC2GResonanceResetCD
	*
	* @param type	uint32	_emResonanceType
	* @param grididx	uint32	格子索引id
	*/
	export function resetCD(type: number, grididx: number)
	{
		let sendParam: Pb_God.PBC2GResonanceResetCD = new Pb_God.PBC2GResonanceResetCD();
		sendParam.type = type;
		sendParam.grididx = grididx;
		CmdMgr.pushCmd(Cmd.C2S_Resonance_ResetCD, sendParam);
	}

	/**
	* 	放置共鸣			PBC2GResonancePlaceGrid
	*
	* @param type	uint32	_emResonanceType
	* @param grididx	uint32	格子索引id
	* @param petsn	uint64	宠物id
	*/
	export function placeGrid(type: number, grididx: number, petsn: Long)
	{
		let sendParam: Pb_God.PBC2GResonancePlaceGrid = new Pb_God.PBC2GResonancePlaceGrid();
		sendParam.type = type;
		sendParam.grididx = grididx;
		sendParam.petsn = petsn;
		CmdMgr.pushCmd(Cmd.C2S_Resonance_PlaceGrid, sendParam);
	}

	/**
	* 	星级共鸣升星	PBC2GResonanceUpStar
	*
	* @param grididx	uint32	格子索引id
	*/
	export function upStar(grididx: number)
	{
		let sendParam: Pb_God.PBC2GResonanceUpStar = new Pb_God.PBC2GResonanceUpStar();
		sendParam.grididx = grididx;
		CmdMgr.pushCmd(Cmd.C2S_Resonance_UpStar, sendParam);
	}

}
module Pro.IncubateEggSend
{
	/**
	* 开始孵蛋PBC2SIncubateEggStart
	*
	* @param Index	uint32	孵化索引
	*/
	export function start(Index: number)
	{
		let sendParam: Pb_God.PBC2SIncubateEggStart = new Pb_God.PBC2SIncubateEggStart();
		sendParam.Index = Index;
		CmdMgr.pushCmd(Cmd.C2S_IncubateEgg_Start, sendParam);
	}

	/**
	* 加速孵化PBC2SIncubateEggSpeedUp
	*
	* @param IncubateEggIndex	uint32	加速孵化蛋索引
	* @param ItemID	uint32	使用加速道具ID
	*/
	export function speedUp(IncubateEggIndex: number, ItemID: number)
	{
		let sendParam: Pb_God.PBC2SIncubateEggSpeedUp = new Pb_God.PBC2SIncubateEggSpeedUp();
		sendParam.IncubateEggIndex = IncubateEggIndex;
		sendParam.ItemID = ItemID;
		CmdMgr.pushCmd(Cmd.C2S_IncubateEgg_SpeedUp, sendParam);
	}

	/**
	* 取消孵化PBC2SIncubateEggCancel
	*
	* @param Index	uint32	取消孵化Index
	*/
	export function cancel(Index: number)
	{
		let sendParam: Pb_God.PBC2SIncubateEggCancel = new Pb_God.PBC2SIncubateEggCancel();
		sendParam.Index = Index;
		CmdMgr.pushCmd(Cmd.C2S_IncubateEgg_Cancel, sendParam);
	}

	/**
	* 孵蛋破壳PBC2SIncubateEggPip
	*
	* @param Index	uint32	破壳孵蛋Index
	*/
	export function pip(Index: number)
	{
		let sendParam: Pb_God.PBC2SIncubateEggPip = new Pb_God.PBC2SIncubateEggPip();
		sendParam.Index = Index;
		CmdMgr.pushCmd(Cmd.C2S_IncubateEgg_Pip, sendParam);
	}

}
module Pro.ActivityBossSend
{
	/**
	* 	购买次数
	*/
	export function buyCount()
	{
		CmdMgr.pushCmd(Cmd.C2S_ActivityBoss_BuyCount);
	}

	/**
	* 	扫荡
	*/
	export function sweep()
	{
		CmdMgr.pushCmd(Cmd.C2S_ActivityBoss_Sweep);
	}

}
module Pro.OrderSend
{
	/**
	* 请求地址无内容
	*/
	export function addrData()
	{
		CmdMgr.pushCmd(Cmd.C2S_Order_AddrData);
	}

	/**
	* 增加地址	PBAddrInfo
	*
	* @param id	uint32	地址序号
	* @param name	string	收件人
	* @param number	string	联系方式
	* @param addr	string	地址信息
	*/
	export function newAddr(id: number, name: string, number: string, addr: string)
	{
		let sendParam: Pb_God.PBAddrInfo = new Pb_God.PBAddrInfo();
		sendParam.id = id;
		sendParam.name = name;
		sendParam.number = number;
		sendParam.addr = addr;
		CmdMgr.pushCmd(Cmd.C2S_Order_NewAddr, sendParam);
	}

	/**
	* 修改地址	PBAddrInfo
	*
	* @param id	uint32	地址序号
	* @param name	string	收件人
	* @param number	string	联系方式
	* @param addr	string	地址信息
	*/
	export function changeAddr(id: number, name: string, number: string, addr: string)
	{
		let sendParam: Pb_God.PBAddrInfo = new Pb_God.PBAddrInfo();
		sendParam.id = id;
		sendParam.name = name;
		sendParam.number = number;
		sendParam.addr = addr;
		CmdMgr.pushCmd(Cmd.C2S_Order_ChangeAddr, sendParam);
	}

	/**
	* 请求订单信息，参数订单类型PBU32
	*
	* @param value	uint32
	*/
	export function orderData(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Order_OrderData, sendParam);
	}

	/**
	* 确认订单地址PBC2SOrderInfo
	*
	* @param ordersn	string	游戏订单流水
	* @param type	uint32	订单类型_emOrderType
	* @param addrID	uint32	地址id
	*/
	export function completed(ordersn: string, type: number, addrID: number)
	{
		let sendParam: Pb_God.PBC2SOrderInfo = new Pb_God.PBC2SOrderInfo();
		sendParam.ordersn = ordersn;
		sendParam.type = type;
		sendParam.addrID = addrID;
		CmdMgr.pushCmd(Cmd.C2S_Order_Completed, sendParam);
	}

	/**
	* 设置默认参数参数地址idPBU32
	*
	* @param value	uint32
	*/
	export function setDefault(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Order_SetDefault, sendParam);
	}

	/**
	* 删除地址	PBU32
	*
	* @param value	uint32
	*/
	export function deleteAddr(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_Order_DeleteAddr, sendParam);
	}

	/**
	* 获取最新订单信息无内容
	*/
	export function getNewOrder()
	{
		CmdMgr.pushCmd(Cmd.C2S_Order_GetNewOrder);
	}

}
module Pro.GodDeploySend
{
	/**
	* 请求排行榜(精灵ID)PBU32
	*
	* @param value	uint32
	*/
	export function topList(value: number)
	{
		let sendParam: Pb_God.PBU32 = new Pb_God.PBU32();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_GodDeploy_TopList, sendParam);
	}

	/**
	* 点赞(精灵SN)	PBU64
	*
	* @param value	uint64
	*/
	export function like(value: Long)
	{
		let sendParam: Pb_God.PBU64 = new Pb_God.PBU64();
		sendParam.value = value;
		CmdMgr.pushCmd(Cmd.C2S_GodDeploy_Like, sendParam);
	}

}
module Pro.OperateSend
{
	/**
	* 验证请求	VerifyAsk
	*/
	export function verify_Ask()
	{
		CmdMgr.pushCmd(Cmd.C2S_Operate_Verify_Ask);
	}

	/**
	* Ping请求	PingAsk
	*
	* @param order	uint32	序号
	*/
	export function ping_Ask(order: number)
	{
		let sendParam: Pb_God.PingAsk = new Pb_God.PingAsk();
		sendParam.order = order;
		CmdMgr.pushCmd(Cmd.C2S_Operate_Ping_Ask, sendParam);
	}

	/**
	* 登录请求	(取CAWPBLoginAsk和CAGPBC2GLoginAsk)
	*
	* @param playerID	uint32	角色ID
	* @param loginSN	int64	登录流水号
	* @param bReconnet	bool	是否断线重连
	*/
	export function login_Ask(playerID: number, loginSN: Long, bReconnet: boolean)
	{
		let sendParam: Pb_God.PBC2GLoginAsk = new Pb_God.PBC2GLoginAsk();
		sendParam.playerID = playerID;
		sendParam.loginSN = loginSN;
		sendParam.bReconnet = bReconnet;
		CmdMgr.pushCmd(Cmd.C2S_Operate_Login_Ask, sendParam);
	}

	/**
	* 验证应答	VerifyAck
	*/
	export function verify_Ack()
	{
		CmdMgr.pushCmd(Cmd.C2S_Operate_Verify_Ack);
	}

	/**
	* Ping应答	PingAck
	*
	* @param order	uint32	序号
	* @param systemTick	uint64	系统启动毫秒
	* @param systemTime	uint32	系统时间
	*/
	export function ping_Ack(order: number, systemTick: Long, systemTime: number)
	{
		let sendParam: Pb_God.PingAck = new Pb_God.PingAck();
		sendParam.order = order;
		sendParam.systemTick = systemTick;
		sendParam.systemTime = systemTime;
		CmdMgr.pushCmd(Cmd.C2S_Operate_Ping_Ack, sendParam);
	}

	/**
	* 断开命令	无内容
	*/
	export function disconnect()
	{
		CmdMgr.pushCmd(Cmd.C2S_Operate_Disconnect);
	}

	/**
	* 错误包通知	BadNotify
	*/
	export function bad_Notify()
	{
		CmdMgr.pushCmd(Cmd.C2S_Operate_Bad_Notify);
	}

	/**
	* 踢出通知	无内容
	*/
	export function kick_Notify()
	{
		CmdMgr.pushCmd(Cmd.C2S_Operate_Kick_Notify);
	}

	/**
	* 登录应答	(取CAWPBLoginAck和CAGPBG2CLoginAck)
	*
	* @param curtime	uint32	当前时间
	*/
	export function login_Ack(curtime: number)
	{
		let sendParam: Pb_God.PBG2CLoginAck = new Pb_God.PBG2CLoginAck();
		sendParam.curtime = curtime;
		CmdMgr.pushCmd(Cmd.C2S_Operate_Login_Ack, sendParam);
	}

	/**
	* 读取超时		无内容
	*/
	export function timeoutRead()
	{
		CmdMgr.pushCmd(Cmd.C2S_Operate_TimeoutRead);
	}

	/**
	* 写入超时	无内容
	*/
	export function timeoutWrite()
	{
		CmdMgr.pushCmd(Cmd.C2S_Operate_TimeoutWrite);
	}

}