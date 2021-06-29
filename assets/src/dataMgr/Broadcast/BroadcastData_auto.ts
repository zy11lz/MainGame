
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
	export class BroadcastData_auto extends BroadcastDataMgrBase
	{
		constructor()
		{
			super()
			//	 GM测试			PBBroadcasStringU32	
			EventMgr.on(Cmd.S2C_BroadCast_GM.cmdName, this, this.onGM)
			//	 更新vip等级		PBBroadcasStringU32
			EventMgr.on(Cmd.S2C_BroadCast_VipLevelUp.cmdName, this, this.onVipLevelUp)
			//	 公会招募			PBBroadcasFactionRecruit
			EventMgr.on(Cmd.S2C_BroadCast_FactionRecruit.cmdName, this, this.onFactionRecruit)
			//	 公会副本集结		PBBroadcasFactionCopymapNotice
			EventMgr.on(Cmd.S2C_BroadCast_FactionCopymapNotice.cmdName, this, this.onFactionCopymapNotice)
			//	 竞技场x连胜(名字，多少场)		PBBroadcasStringU32	
			EventMgr.on(Cmd.S2C_BroadCast_Challenge.cmdName, this, this.onChallenge)
			//	 冠军赛提醒(开始时间)		PBU32
			EventMgr.on(Cmd.S2C_BroadCast_Champion.cmdName, this, this.onChampion)
			//	 跨服竞技场x连胜(名字，多少场)	PBBroadcasStringU32
			EventMgr.on(Cmd.S2C_BroadCast_CrossChallenge.cmdName, this, this.onCrossChallenge)
			//	 段位赛x连胜(名字，多少场)	PBBroadcasStringU32
			EventMgr.on(Cmd.S2C_BroadCast_Dan.cmdName, this, this.onDan)
			//	 探宝获得x品质以上道具	PBBroadcastTreasure
			EventMgr.on(Cmd.S2C_BroadCast_Treasure.cmdName, this, this.onTreasure)
			//	 合成6星英雄（名字,pet id）	PBBroadcastHeroStar
			EventMgr.on(Cmd.S2C_BroadCast_Hero6Star.cmdName, this, this.onHero6Star)
			//	 9星以上英雄升星		PBBroadcastHeroStar
			EventMgr.on(Cmd.S2C_BroadCast_Hero9Star.cmdName, this, this.onHero9Star)
			//	 建立工会		PBBroadcasFactionCreate
			EventMgr.on(Cmd.S2C_BroadCast_Faction.cmdName, this, this.onFaction)
			//	 激活月卡	(玩家名字，月卡类型)	PBBroadcasStringU32
			EventMgr.on(Cmd.S2C_BroadCast_MonthCard.cmdName, this, this.onMonthCard)
			//   高级召唤获得5星英雄(玩家名字, pet id)	PBBroadcasStringU32
			EventMgr.on(Cmd.S2C_BroadCast_AdvCall5Star.cmdName, this, this.onAdvCall5Star)
			//   首冲奖励			PBBroadcastItems
			EventMgr.on(Cmd.S2C_BroadCast_FirstCharge.cmdName, this, this.onFirstCharge)
			//   七日登陆			PBBroadcastItems
			EventMgr.on(Cmd.S2C_BroadCast_7DayLogin.cmdName, this, this.on7DayLogin)
			//   主线通关			PBBroadcastHookStage
			EventMgr.on(Cmd.S2C_BroadCast_HookStage.cmdName, this, this.onHookStage)
			//   先知召唤(玩家名字, pet id)	PBBroadcasStringU32
			EventMgr.on(Cmd.S2C_BroadCast_OracleCall.cmdName, this, this.onOracleCall)
			//	 通关试炼塔		PBBroadcastTower
			EventMgr.on(Cmd.S2C_BroadCast_Tower.cmdName, this, this.onTower)
			//	 元灵解锁(名字，元灵ID)		PBBroadcasStringU32	
			EventMgr.on(Cmd.S2C_BroadCast_Artifact.cmdName, this, this.onArtifact)
			//	 先知召唤物品		PBBroadcastItem	
			EventMgr.on(Cmd.S2C_BroadCast_OracleCallItem.cmdName, this, this.onOracleCallItem)
			//	 主线第一名(名字, stageid)	PBBroadcasStringU32	
			EventMgr.on(Cmd.S2C_BroadCast_MainTop1.cmdName, this, this.onMainTop1)
			//	 试炼塔1第一名(名字, 层数)		PBBroadcasStringU32	
			EventMgr.on(Cmd.S2C_BroadCast_Tower1Top1.cmdName, this, this.onTower1Top1)
			//	 竞技场第一名(名字)			PBBroadcasString	
			EventMgr.on(Cmd.S2C_BroadCast_ChallengeTop1.cmdName, this, this.onChallengeTop1)
			//	 战斗力第一名(名字)			PBBroadcasString	
			EventMgr.on(Cmd.S2C_BroadCast_PowerTop1.cmdName, this, this.onPowerTop1)
			//	 高级召唤获得6星英雄(玩家名字, pet id)			PBBroadcasStringU32
			EventMgr.on(Cmd.S2C_BroadCast_AdvCall6Star.cmdName, this, this.onAdvCall6Star)
			//	 充值基金(玩家名字, 商品 id)			PBBroadcasStringU32
			EventMgr.on(Cmd.S2C_BroadCast_ChargeFund.cmdName, this, this.onChargeFund)
			//	 充值礼包(玩家名字, 商品 id)			PBBroadcasStringU32
			EventMgr.on(Cmd.S2C_BroadCast_ChargeGift.cmdName, this, this.onChargeGift)
			//	 充值牛逼礼包(玩家名字, 商品 id)			PBBroadcasStringU32	
			EventMgr.on(Cmd.S2C_BroadCast_ChargeNB.cmdName, this, this.onChargeNB)
			//	 公会boss结算(boss名字,章节 id)			PBBroadcasStringU32	
			EventMgr.on(Cmd.S2C_BroadCast_FactionBoss.cmdName, this, this.onFactionBoss)
			//	 通关试炼塔2		PBBroadcastTower
			EventMgr.on(Cmd.S2C_BroadCast_Tower2.cmdName, this, this.onTower2)
			//	 试炼塔2第一名(名字, 层数)		PBBroadcasStringU32	
			EventMgr.on(Cmd.S2C_BroadCast_Tower2Top1.cmdName, this, this.onTower2Top1)
		}
		/*****
		 *	 GM测试			PBBroadcasStringU32	
		 * @param PBBroadcasStringU32
		 * 		msg			string	字符串
		 * 		value			uint32	值
		 */
		protected onGM(value: Pb_God.PBBroadcasStringU32): void
		{
			this.showBroadCast(1, value.msg, value.value);

			// let notice_type = cfg.BroadCastCastMsgCfgData.getNoticeTypeByID(value.value);
			// if (notice_type == Pb_God._emBroadcast_Notice.BroadcastNotice_Parade) {
			// 	let notice_show_pos = cfg.BroadCastCastMsgCfgData.getNoticeShowPosByID(value.value);
			// 	if (notice_show_pos == 1)//跑马灯
			// 	{
			// 		let show_times = cfg.BroadCastCastMsgCfgData.getShowTimesByID(value.value);
			// 		let content = cfg.BroadCastCastMsgCfgData.getContentByID(value.value);
			// 		FloatNoticeUtils.showNoticeForTimes(content, show_times);
			// 	}
			// }
		}
		/*****
		 *	 更新vip等级		PBBroadcasStringU32
		 * @param PBBroadcasStringU32
		 * 		msg			string	字符串
		 * 		value			uint32	值
		 */
		protected onVipLevelUp(value: Pb_God.PBBroadcasStringU32): void
		{
			this.showBroadCast(2, value.msg, value.value);
		}
		/*****
		 *	 公会招募			PBBroadcasFactionRecruit
		 * @param PBBroadcasFactionRecruit
		 * 		factionlevel			uint32	等级
		 * 		factionname			string	名称
		 * 		factionid			uint32	公会ID
		 * 		applylevel			uint32	申请等级
		 * 		display			PBPlayerDisplay	发起者
		 */
		protected onFactionRecruit(value: Pb_God.PBBroadcasFactionRecruit): void
		{
			//公会招募的广播需要在世界频道与系统频道同时显示
			let chatData = this.getBroadCastToChannel(3, Pb_God._emBroadcast_Channel.BroadcastChannel_World, true, value.factionlevel, value.factionname, value.applylevel, value.factionid);
			chatData.playerdisplay = value.display;
			ChatDataMgr.addChatInfo(chatData, false);
			chatData = this.getBroadCastToChannel(3, Pb_God._emBroadcast_Channel.BroadcastChannel_System, false, value.factionlevel, value.factionname, value.applylevel, value.factionid);
			ChatDataMgr.addChatInfo(chatData, false);


			// let broadcastCfgInfo = cfg.BroadCastCastMsgCfgData.getInfo(3);

			// let showChatMsg = Global.FormatString(broadcastCfgInfo.content,
			// 	value.factionlevel, value.factionname, value.applylevel, value.factionid);

			// //世界频道
			// let chatData = new Pb_God.PBG2CTalkAck();
			// chatData.channel = Pb_God._emBroadcast_Channel.BroadcastChannel_World;
			// chatData.data = showChatMsg;
			// chatData.playerdisplay = value.display;
			// ChatDataMgr.addChatInfo(chatData);

			// //系统频道
			// chatData = new Pb_God.PBG2CTalkAck();
			// chatData.channel = Pb_God._emBroadcast_Channel.BroadcastChannel_System;
			// chatData.data = showChatMsg;
			// chatData.playerdisplay = null;
			// chatData["noticeType"] = broadcastCfgInfo.noticeType;
			// ChatDataMgr.addChatInfo(chatData);

		}
		/*****
		 *	 公会副本集结		PBBroadcasFactionCopymapNotice
		 * @param PBBroadcasFactionCopymapNotice
		 * 		factionjob			uint32	职位
		 * 		playername			string	名称
		 */
		protected onFactionCopymapNotice(value: Pb_God.PBBroadcasFactionCopymapNotice): void
		{
			// if (!FactionDataMgr.isHaveFaction()) return;
			// let broadcastCfgInfo = cfg.BroadCastCastMsgCfgData.getInfo(4);

			// let playerName = value.playername;
			// let job = Global.getLangStr("faction_job" + value.factionjob);
			// let showChatMsg = Global.FormatString(broadcastCfgInfo.content, job, playerName);

			// let chatData = new Pb_God.PBG2CTalkAck();
			// chatData.channel = broadcastCfgInfo.channel;
			// chatData.data = showChatMsg;
			// chatData.playerdisplay = null;
			// chatData["noticeType"] = broadcastCfgInfo.noticeType;
			// ChatDataMgr.addChatInfo(chatData);

			let job = Global.getLangStr("faction_job" + value.factionjob);
			this.showBroadCast(4, job, value.playername);
		}
		/*****
		 *	 竞技场x连胜(名字，多少场)		PBBroadcasStringU32	
		 * @param PBBroadcasStringU32
		 * 		msg			string	字符串
		 * 		value			uint32	值
		 */
		protected onChallenge(value: Pb_God.PBBroadcasStringU32): void
		{
			this.showBroadCast(5, value.msg, value.value);

			// let broadCastId = 5;
			// let show_times = cfg.BroadCastCastMsgCfgData.getShowTimesByID(broadCastId);
			// let content = cfg.BroadCastCastMsgCfgData.getContentByID(broadCastId);
			// let n_type = cfg.BroadCastCastMsgCfgData.getNoticeTypeByID(broadCastId);
			// content = Global.FormatString(content, value.msg, value.value);
			// FloatNoticeUtils.showNoticeForTimes(content, show_times);

			// //系统频道
			// let chatData = new Pb_God.PBG2CTalkAck();
			// chatData.channel = cfg.BroadCastCastMsgCfgData.getChannelByID(broadCastId);
			// chatData.data = content;
			// chatData.playerdisplay = null;
			// chatData["noticeType"] = n_type;
			// ChatDataMgr.addChatInfo(chatData);
		}
		/*****
		 *	 冠军赛提醒(开始时间)		PBU32
		 * @param PBU32
		 * 		value			uint32	 
		 */
		protected onChampion(value: Pb_God.PBU32): void
		{
			// let broadCastId = 6;
			// let show_times = cfg.BroadCastCastMsgCfgData.getShowTimesByID(broadCastId);
			// let content = cfg.BroadCastCastMsgCfgData.getContentByID(broadCastId);
			// let n_type = cfg.BroadCastCastMsgCfgData.getNoticeTypeByID(broadCastId);
			// let time = Global.getFormatTimeString(value.value*1000, 6);
			// content = Global.FormatString(content, time);
			// FloatNoticeUtils.showNoticeForTimes(content, show_times);

			// //系统频道
			// let chatData = new Pb_God.PBG2CTalkAck();
			// chatData.channel = cfg.BroadCastCastMsgCfgData.getChannelByID(broadCastId);
			// chatData.data = content;
			// chatData.playerdisplay = null;
			// chatData["noticeType"] = n_type;
			// ChatDataMgr.addChatInfo(chatData);

			let time = Global.getFormatTimeString(value.value * 1000, 6);
			this.showBroadCast(6, time);
		}
		/*****
		 *	 跨服竞技场x连胜(名字，多少场)	PBBroadcasStringU32
		 * @param PBBroadcasStringU32
		 * 		msg			string	字符串
		 * 		value			uint32	值
		 */
		protected onCrossChallenge(value: Pb_God.PBBroadcasStringU32): void
		{
			this.showBroadCast(7, value.msg, value.value);
			// let broadCastId = 7;
			// let show_times = cfg.BroadCastCastMsgCfgData.getShowTimesByID(broadCastId);
			// let content = cfg.BroadCastCastMsgCfgData.getContentByID(broadCastId);
			// let n_type = cfg.BroadCastCastMsgCfgData.getNoticeTypeByID(broadCastId);
			// content = Global.FormatString(content, value.msg, value.value);
			// FloatNoticeUtils.showNoticeForTimes(content, show_times);

			// //系统频道
			// let chatData = new Pb_God.PBG2CTalkAck();
			// chatData.channel = cfg.BroadCastCastMsgCfgData.getChannelByID(broadCastId);
			// chatData.data = content;
			// chatData.playerdisplay = null;
			// chatData["noticeType"] = n_type;
			// ChatDataMgr.addChatInfo(chatData);
		}
		/*****
		 *	 段位赛x连胜(名字，多少场)	PBBroadcasStringU32
		 * @param PBBroadcasStringU32
		 * 		msg			string	字符串
		 * 		value			uint32	值
		 */
		protected onDan(value: Pb_God.PBBroadcasStringU32): void
		{
			this.showBroadCast(8, value.msg, value.value);
			// let broadCastId = 8;
			// let show_times = cfg.BroadCastCastMsgCfgData.getShowTimesByID(broadCastId);
			// let content = cfg.BroadCastCastMsgCfgData.getContentByID(broadCastId);
			// let n_type = cfg.BroadCastCastMsgCfgData.getNoticeTypeByID(broadCastId);
			// content = Global.FormatString(content, value.msg, value.value);
			// FloatNoticeUtils.showNoticeForTimes(content, show_times);

			// //系统频道
			// let chatData = new Pb_God.PBG2CTalkAck();
			// chatData.channel = cfg.BroadCastCastMsgCfgData.getChannelByID(broadCastId);
			// chatData.data = content;
			// chatData.playerdisplay = null;
			// chatData["noticeType"] = n_type;
			// ChatDataMgr.addChatInfo(chatData);
		}
		/*****
		 *	 探宝获得x品质以上道具	PBBroadcastTreasure
		 * @param PBBroadcastTreasure
		 * 		name			string	玩家名字
		 * 		itemid			uint32	物品id
		 * 		num			uint32	个数
		 */
		protected onTreasure(value: Pb_God.PBBroadcastTreasure): void
		{
			// let broadCastId = 9;
			// let show_times = cfg.BroadCastCastMsgCfgData.getShowTimesByID(broadCastId);
			// let content = cfg.BroadCastCastMsgCfgData.getContentByID(broadCastId);
			// let n_type = cfg.BroadCastCastMsgCfgData.getNoticeTypeByID(broadCastId);
			// let item_name = cfg.ItemCfgData.getNameById(value.itemid);
			// content = Global.FormatString(content, value.name, item_name, value.num);
			// FloatNoticeUtils.showNoticeForTimes(content, show_times);

			// //系统频道
			// let chatData = new Pb_God.PBG2CTalkAck();
			// chatData.channel = cfg.BroadCastCastMsgCfgData.getChannelByID(broadCastId);
			// chatData.data = content;
			// chatData.playerdisplay = null;
			// chatData["noticeType"] = n_type;
			// ChatDataMgr.addChatInfo(chatData);

			let item_name = cfg.ItemCfgData.getNameById(value.itemid);
			this.showBroadCast(9, value.name, item_name, value.num);
		}
		/*****
		 *	 合成6星英雄（名字,pet id）	PBBroadcastHeroStar
		 * @param PBBroadcastHeroStar
		 * 		name			string	玩家名字
		 * 		hero			uint32	英雄ID，换成皮肤id
		 * 		star			uint32	星级
		 */
		protected onHero6Star(value: Pb_God.PBBroadcastHeroStar): void
		{
			// let broadCastId = 10;
			// let show_times = cfg.BroadCastCastMsgCfgData.getShowTimesByID(broadCastId);
			// let content = cfg.BroadCastCastMsgCfgData.getContentByID(broadCastId);
			// let n_type = cfg.BroadCastCastMsgCfgData.getNoticeTypeByID(broadCastId);
			// let hero_name = cfg.PetCfgData.getNameByPetID(value.hero);
			// content = Global.FormatString(content, value.name, hero_name);
			// FloatNoticeUtils.showNoticeForTimes(content, show_times);

			// //系统频道
			// let chatData = new Pb_God.PBG2CTalkAck();
			// chatData.channel = cfg.BroadCastCastMsgCfgData.getChannelByID(broadCastId);
			// chatData.data = content;
			// chatData.playerdisplay = null;
			// chatData["noticeType"] = n_type;
			// ChatDataMgr.addChatInfo(chatData);

			let hero_name = cfg.PetSkinCfgData.getFileNameById(value.hero);
			this.showBroadCast(10, value.name, hero_name);
		}
		/*****
		 *	 9星以上英雄升星		PBBroadcastHeroStar
		 * @param PBBroadcastHeroStar
		 * 		name			string	玩家名字
		 * 		hero			uint32	英雄ID，换成皮肤id
		 * 		star			uint32	星级
		 */
		protected onHero9Star(value: Pb_God.PBBroadcastHeroStar): void
		{
			// let broadCastId = 11;
			// let show_times = cfg.BroadCastCastMsgCfgData.getShowTimesByID(broadCastId);
			// let content = cfg.BroadCastCastMsgCfgData.getContentByID(broadCastId);
			// let n_type = cfg.BroadCastCastMsgCfgData.getNoticeTypeByID(broadCastId);
			// let hero_name = cfg.PetCfgData.getNameByPetID(value.hero);
			// content = Global.FormatString(content, value.name, hero_name, value.star);
			// FloatNoticeUtils.showNoticeForTimes(content, show_times);

			// //系统频道
			// let chatData = new Pb_God.PBG2CTalkAck();
			// chatData.channel = cfg.BroadCastCastMsgCfgData.getChannelByID(broadCastId);
			// chatData.data = content;
			// chatData.playerdisplay = null;
			// chatData["noticeType"] = n_type;
			// ChatDataMgr.addChatInfo(chatData);

			let hero_name = cfg.PetSkinCfgData.getFileNameById(value.hero);
			this.showBroadCast(11, value.name, hero_name, value.star);
		}
		/*****
		 *	 建立工会		PBBroadcasFactionCreate
		 * @param PBBroadcasFactionCreate
		 * 		playername			string	玩家名字
		 * 		factionname			string	公会名称
		 * 		factionid			uint32	公会ID
		 */
		protected onFaction(value: Pb_God.PBBroadcasFactionCreate): void
		{
			// let broadCastId = 12;
			// let show_times = cfg.BroadCastCastMsgCfgData.getShowTimesByID(broadCastId);
			// let content = cfg.BroadCastCastMsgCfgData.getContentByID(broadCastId);
			// let n_type = cfg.BroadCastCastMsgCfgData.getNoticeTypeByID(broadCastId);
			// content = Global.FormatString(content, value.msg[0], value.msg[1]);
			// FloatNoticeUtils.showNoticeForTimes(content, show_times);

			// //系统频道
			// let chatData = new Pb_God.PBG2CTalkAck();
			// chatData.channel = cfg.BroadCastCastMsgCfgData.getChannelByID(broadCastId);
			// chatData.data = content;
			// chatData.playerdisplay = null;
			// chatData["noticeType"] = n_type;
			// ChatDataMgr.addChatInfo(chatData);

			this.showBroadCast(12, value.playername, value.factionname, value.factionid);
		}
		/*****
		 *	 激活月卡	(玩家名字，月卡类型)	PBBroadcasStringU32
		 * @param PBBroadcasStringU32
		 * 		msg			string	字符串
		 * 		value			uint32	值
		 */
		protected onMonthCard(value: Pb_God.PBBroadcasStringU32): void
		{
			// let broadCastId = 13;
			// let show_times = cfg.BroadCastCastMsgCfgData.getShowTimesByID(broadCastId);
			// let content = cfg.BroadCastCastMsgCfgData.getContentByID(broadCastId);
			// let n_type = cfg.BroadCastCastMsgCfgData.getNoticeTypeByID(broadCastId);
			let card_name = cfg.PrivilegeCardCfgData.getNameByCardID(value.value);
			let reward_desc = "";
			let p_type = Pb_God._emPrivilegeDailyPacket.PrivilegeDailyPacket_RRMonth;
			if (value.value == 10)
			{
				// 超级月卡
				p_type = Pb_God._emPrivilegeDailyPacket.PrivilegeDailyPacket_RRMonth;
			} else if (value.value == 9)
			{//普通月卡
				p_type = Pb_God._emPrivilegeDailyPacket.PrivilegeDailyPacket_ZZMonth;
			}
			let addItem = cfg.PrivilegeDailyPrizeCfgData.getAddItemInfoArrByType(p_type)[0];
			let item_name = cfg.ItemCfgData.getNameById(addItem.itemid);
			reward_desc = addItem.itemcount + item_name;

			// content = Global.FormatString(content, value.msg, card_name, reward_desc);
			// FloatNoticeUtils.showNoticeForTimes(content, show_times);			

			// //系统频道
			// let chatData = new Pb_God.PBG2CTalkAck();
			// chatData.channel = cfg.BroadCastCastMsgCfgData.getChannelByID(broadCastId);
			// chatData.data = content;
			// chatData.playerdisplay = null;
			// chatData["noticeType"] = n_type;
			// ChatDataMgr.addChatInfo(chatData);

			this.showBroadCast(13, value.msg, card_name, reward_desc);
		}
		/*****
		 *   高级召唤获得5星英雄(玩家名字, pet id)	PBBroadcasStringU32
		 * @param PBBroadcasStringU32
		 * 		msg			string	字符串
		 * 		value			uint32	值
		 */
		protected onAdvCall5Star(value: Pb_God.PBBroadcasStringU32): void
		{
			let hero_name = cfg.PetSkinCfgData.getFileNameByPetID(value.value);
			this.showBroadCast(14, value.msg, hero_name);

			// let broadCastId = 14;
			// let show_times = cfg.BroadCastCastMsgCfgData.getShowTimesByID(broadCastId);
			// let content = cfg.BroadCastCastMsgCfgData.getContentByID(broadCastId);
			// let n_type = cfg.BroadCastCastMsgCfgData.getNoticeTypeByID(broadCastId);
			// let hero_name = cfg.PetCfgData.getNameByPetID(value.value);
			// content = Global.FormatString(content, value.msg, hero_name);
			// FloatNoticeUtils.showNoticeForTimes(content, show_times);

			// //系统频道
			// let chatData = new Pb_God.PBG2CTalkAck();
			// chatData.channel = cfg.BroadCastCastMsgCfgData.getChannelByID(broadCastId);
			// chatData.data = content;
			// chatData.playerdisplay = null;
			// chatData["noticeType"] = n_type;
			// ChatDataMgr.addChatInfo(chatData);
		}
		/*****
		 *   首冲奖励			PBBroadcastItems
		 * @param PBBroadcastItems
		 * 		name			string	玩家名字
		 * 		items			PBItemInfo	道具们
		 */
		protected onFirstCharge(value: Pb_God.PBBroadcastItems): void
		{
			let strItems = this.getItemListString(value.items);
			this.showBroadCast(15, value.name, strItems);
		}
		/*****
		 *   七日登陆			PBBroadcastItems
		 * @param PBBroadcastItems
		 * 		name			string	玩家名字
		 * 		items			PBItemInfo	道具们
		 */
		protected on7DayLogin(value: Pb_God.PBBroadcastItems): void
		{
			let strItems = this.getItemListString(value.items);
			this.showBroadCast(16, value.name, strItems);
		}
		/*****
		 *   主线通关			PBBroadcastHookStage
		 * @param PBBroadcastHookStage
		 * 		name			string	玩家名字
		 * 		stage			uint32	关卡
		 * 		items			PBItemInfo	道具们
		 */
		protected onHookStage(value: Pb_God.PBBroadcastHookStage): void
		{
			let strItems = this.getItemListString(value.items);
			this.showBroadCast(17, value.name, value.stage, strItems);
		}
		/*****
		 *   先知召唤(玩家名字, pet id)	PBBroadcasStringU32
		 * @param PBBroadcasStringU32
		 * 		msg			string	字符串
		 * 		value			uint32	值
		 */
		protected onOracleCall(value: Pb_God.PBBroadcasStringU32): void
		{
			let hero_name = cfg.PetSkinCfgData.getFileNameByPetID(value.value);
			let hero_type = cfg.PetCfgData.getPetTypeByPetID(value.value);
			let strType = Global.getLangStr("hero_type_" + hero_type);
			this.showBroadCast(18, value.msg, strType, hero_name);
		}
		/*****
		 *	 通关试炼塔		PBBroadcastTower
		 * @param PBBroadcastTower
		 * 		name			string	玩家名字
		 * 		stage			uint32	关卡
		 * 		items			PBItemInfo	道具们
		 */
		protected onTower(value: Pb_God.PBBroadcastTower): void
		{
			let strItems = this.getItemListString(value.items);
			this.showBroadCast(19, value.name, value.stage, strItems);
		}
		/*****
		 *	 元灵解锁(名字，元灵ID)		PBBroadcasStringU32	
		 * @param PBBroadcasStringU32
		 * 		msg			string	字符串
		 * 		value			uint32	值
		 */
		protected onArtifact(value: Pb_God.PBBroadcasStringU32): void
		{
			let artifactName = cfg.ArtifactCfgData.getNameByID(value.value);
			this.showBroadCast(20, value.msg, artifactName);
			EventMgr.trigger(EventNotify.Artifact_Unlock, value.value);
		}
		/*****
		 *	 先知召唤物品		PBBroadcastItem	
		 * @param PBBroadcastItem
		 * 		name			string	玩家名字
		 * 		item			PBItemInfo	道具
		 */
		protected onOracleCallItem(value: Pb_God.PBBroadcastItem): void
		{
			let strItems = this.getItemListString([value.item]);
			this.showBroadCast(21, value.name, strItems);
		}
		/*****
		 *	 主线第一名(名字, stageid)	PBBroadcasStringU32	
		 * @param PBBroadcasStringU32
		 * 		msg			string	字符串
		 * 		value			uint32	值
		 */
		protected onMainTop1(value: Pb_God.PBBroadcasStringU32): void
		{
			this.showBroadCast(22, value.msg, value.value);
		}
		/*****
		 *	 试炼塔1第一名(名字, 层数)		PBBroadcasStringU32	
		 * @param PBBroadcasStringU32
		 * 		msg			string	字符串
		 * 		value			uint32	值
		 */
		protected onTower1Top1(value: Pb_God.PBBroadcasStringU32): void
		{
			let items = cfg.TrainTowerCfgData.getFirstAddPrizeAryById(value.value);
			let strItems = this.getItemInfoListString(items);
			this.showBroadCast(23, value.msg, value.value, strItems);
		}
		/*****
		 *	 竞技场第一名(名字)			PBBroadcasString	
		 * @param PBBroadcasString
		 * 		msg			string	字符串
		 */
		protected onChallengeTop1(value: Pb_God.PBBroadcasString): void
		{
			this.showBroadCast(24, value.msg);
		}
		/*****
		 *	 战斗力第一名(名字)			PBBroadcasString	
		 * @param PBBroadcasString
		 * 		msg			string	字符串
		 */
		protected onPowerTop1(value: Pb_God.PBBroadcasString): void
		{
			this.showBroadCast(25, value.msg);
		}
		/*****
		 *	 高级召唤获得6星英雄(玩家名字, pet id)			PBBroadcasStringU32
		 * @param PBBroadcasStringU32
		 * 		msg			string	字符串
		 * 		value			uint32	值
		 */
		protected onAdvCall6Star(value: Pb_God.PBBroadcasStringU32): void
		{
			let hero_name = cfg.PetSkinCfgData.getFileNameByPetID(value.value);
			this.showBroadCast(26, value.msg, hero_name);
		}
		/*****
		 *	 充值基金(玩家名字, 商品 id)			PBBroadcasStringU32
		 * @param PBBroadcasStringU32
		 * 		msg			string	字符串
		 * 		value			uint32	值
		 */
		protected onChargeFund(value: Pb_God.PBBroadcasStringU32): void
		{
			let showName = cfg.ChargeCfgData.getDescByID(value.value)
			this.showBroadCast(27, value.msg, showName);
		}
		/*****
		 *	 充值礼包(玩家名字, 商品 id)			PBBroadcasStringU32
		 * @param PBBroadcasStringU32
		 * 		msg			string	字符串
		 * 		value			uint32	值
		 */
		protected onChargeGift(value: Pb_God.PBBroadcasStringU32): void
		{
			let showName = cfg.ChargeCfgData.getDescByID(value.value)
			this.showBroadCast(28, value.msg, showName);
		}
		/*****
		 *	 充值牛逼礼包(玩家名字, 商品 id)			PBBroadcasStringU32	
		 * @param PBBroadcasStringU32
		 * 		msg			string	字符串
		 * 		value			uint32	值
		 */
		protected onChargeNB(value: Pb_God.PBBroadcasStringU32): void
		{
			let showName = cfg.ChargeCfgData.getDescByID(value.value)
			this.showBroadCast(29, value.msg, showName);
		}
		/*****
		 *	 公会boss结算(boss名字,章节 id)			PBBroadcasStringU32	
		 * @param PBBroadcasStringU32
		 * 		msg			string	字符串
		 * 		value			uint32	值
		 */
		protected onFactionBoss(value: Pb_God.PBBroadcasStringU32): void
		{
			// let monsterid = cfg.FactionCopymapCfgData.getMonsterByID(value.value);
			// let monsterInfo = cfg.FactionMonsterCfgData.getMonterInfoWithID(monsterid);
			// let petName = cfg.PetCfgData.getNameByPetID(monsterInfo.petId);
			this.showBroadCast(30, value.value, value.msg);
		}
		/*****
		 *	 通关试炼塔2		PBBroadcastTower
		 * @param PBBroadcastTower
		 * 		name			string	玩家名字
		 * 		stage			uint32	关卡
		 * 		items			PBItemInfo	道具们
		 */
		protected onTower2(value: Pb_God.PBBroadcastTower): void
		{
			let strItems = this.getItemListString(value.items);
			this.showBroadCast(19, value.name, value.stage, strItems);
		}
		/*****
		 *	 试炼塔2第一名(名字, 层数)		PBBroadcasStringU32	
		 * @param PBBroadcasStringU32
		 * 		msg			string	字符串
		 * 		value			uint32	值
		 */
		protected onTower2Top1(value: Pb_God.PBBroadcasStringU32): void
		{
			let items = cfg.TrainTowerCfgData.getFirstAddPrizeAryById(value.value);
			let strItems = this.getItemInfoListString(items);
			this.showBroadCast(23, value.msg, value.value, strItems);
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}