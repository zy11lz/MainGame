
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
	export class PlayerData_auto extends PlayerDataMgrBase
	{
		constructor()
		{
			super()
			// 选择角色返回	PBSelectPlayerAck
			EventMgr.on(Cmd.S2C_Player_SelectPlayer.cmdName, this, this.onSelectPlayer)
			// 基础信息 PBPlayerBase
			EventMgr.on(Cmd.S2C_Player_BaseInfo.cmdName, this, this.onBaseInfo)
			// 功能系统信息 PBPlayerSystem
			EventMgr.on(Cmd.S2C_Player_SystemInfo.cmdName, this, this.onSystemInfo)
			// 功能系统信息 PBPlayerSystemExt	
			EventMgr.on(Cmd.S2C_Player_SystemInfo2.cmdName, this, this.onSystemInfo2)
			// 背包信息 PBPlayerBag
			EventMgr.on(Cmd.S2C_Player_BagInfo.cmdName, this, this.onBagInfo)
			// 背包信息 PBPlayerBag 扩展
			EventMgr.on(Cmd.S2C_Player_BagInfo2.cmdName, this, this.onBagInfo2)
			// 伙伴信息 PBPlayerPet
			EventMgr.on(Cmd.S2C_Player_PetInfo.cmdName, this, this.onPetInfo)
			// 伙伴信息 PBPlayerPet 扩展
			EventMgr.on(Cmd.S2C_Player_PetInfo2.cmdName, this, this.onPetInfo2)
			// 伙伴信息3 PBPlayerPetExt	
			EventMgr.on(Cmd.S2C_Player_PetInfo3.cmdName, this, this.onPetInfo3)
			// 前端信息 PBClientData
			EventMgr.on(Cmd.S2C_Player_ClientInfo.cmdName, this, this.onClientInfo)
			// 好友信息 PBPlayerFriend
			EventMgr.on(Cmd.S2C_Player_Friend.cmdName, this, this.onFriend)
			// 邮件信息 PBPlayerMail
			EventMgr.on(Cmd.S2C_Player_Mail.cmdName, this, this.onMail)
			// 帮会信息 PBPlayerFaction
			EventMgr.on(Cmd.S2C_Player_Faction.cmdName, this, this.onFaction)
			// 检测角色名字 PBPlayerNameAck
			EventMgr.on(Cmd.S2C_Player_CheckPlayerName.cmdName, this, this.onCheckPlayerName)
			// 玩家数据发送完成	
			EventMgr.on(Cmd.S2C_Player_LoadComplete.cmdName, this, this.onLoadComplete)
			// 防沉迷检测 PBPlayerWallowData
			EventMgr.on(Cmd.S2C_Player_CheckWallow.cmdName, this, this.onCheckWallow)
		}
		/*****
		 * 选择角色返回	PBSelectPlayerAck
		 * @param PBSelectPlayerAck
		 * 		playerID			uint32	 玩家ID
		 * 		host			string	 host
		 * 		port			uint32	 网络字节端口
		 * 		loginsn			int64	 登录SN
		 * 		invite			bool	 是否可以填邀请码（账户的第一个角色）
		 */
		protected onSelectPlayer(value: Pb_God.PBSelectPlayerAck): void
		{
			
		}
		/*****
		 * 基础信息 PBPlayerBase
		 * @param PBPlayerBase
		 * 		saveorder			uint32	 序列号
		 * 		playerdisplay			PBPlayerDisplay	 角色标记
		 * 		accountid			uint32	 账号ID
		 * 		factionname			string	 帮派名称
		 * 		factionid			uint32	 帮派ID
		 * 		playermark			uint32	 角色标示
		 * 		lastlogintime			uint32	 最后一次登录时间
		 * 		lastlogouttime			uint32	 最后一次登出时间
		 * 		createtime			uint32	 创建角色时间
		 * 		accountname			string	 账号名称
		 * 		expend			PBPlayerExpend	 消耗
		 * 		onlinetime			uint32	 在线时长
		 * 		itemsequence			uint32	 道具自增长索引
		 * 		fightpower			uint32	 战斗力
		 * 		dailycleantime			uint32	 日清理时间
		 * 		weekcleantime			uint32	 周清理时间
		 * 		monthcleantime			uint32	 月清理时间
		 * 		battlesequence			uint32	 战斗自增长索引
		 * 		lastdaymaxfightpower			uint32	 前日最大战斗力
		 * 		maxfightpower			uint32	 最大战斗力
		 * 		todaymaxfightpower			uint32	 今日日最大战斗力
		 * 		todayrecharge			uint32	 今日充值金额
		 * 		chargesequence			uint32	 充值自增长索引
		 * 		totalrecharge			uint32	 今日充值金额
		 * 		renamecount			uint32	 改名次数
		 * 		rechargecount			uint32	 充值次数
		 * 		oldlogintime			uint32	 上次一次登陆的时间
		 * 		realrecharge			uint32	 真实充值总额
		 * 		flag			uint32	 标识符 _emPBPlayerBaseFlagBit
		 * 		originworldid			uint32	 合服前的原世界ID
		 */
		protected onBaseInfo(value: Pb_God.PBPlayerBase): void
		{
			
		}
		/*****
		 * 功能系统信息 PBPlayerSystem
		 * @param PBPlayerSystem
		 * 		saveorder			uint32	序列号
		 * 		zhenfa			PBPlayerZhenfa	阵法信息
		 * 		copymap			PBPlayerCopymap	副本信息
		 * 		fight			PBPlayerFight	战斗信息
		 * 		task			PBPlayerTask	任务信息
		 * 		challenge			PBPlayerChallenge	竞技场信息
		 * 		faction			PBPlayerFaction	帮派信息
		 * 		call			PBPlayerCall	召唤信息
		 * 		sail			PBPlayerSail	远航数据
		 * 		hook			PBPlayerHook	挂机数据
		 * 		artifact			PBPlayerArtifact	神器数据
		 * 		shop			PBPlayerShop	商店数据
		 * 		train			PBPlayerTrain	试炼数据
		 * 		achieve			PBPlayerAchieve	成就数据
		 * 		expedition			PBPlayerExpedition	远征数据
		 * 		shape			PBPlayerShape	外形数据
		 * 		temple			PBPlayerTemple	神殿数据
		 * 		element			PBPlayerElement	元素数据
		 * 		risk			PBPlayerRisk	冒险数据
		 * 		systemswitch			PBPlayerSysteSwitch	系统开启数据
		 * 		dan			PBPlayerDan	超凡段位
		 * 		ladder			PBPlayerLadder	跨服天梯信息
		 * 		godsuit			PBPlayerGodEquipSuit	神装套装
		 * 		holy			PBPlayerHoly	圣物数据
		 * 		video			PBPlayerVideo	录像数据
		 * 		privilege			PBPlayerPrivilege	特权数据
		 * 		weal			PBPlayerWeal	福利数据
		 * 		activity			PBPlayerActivity	活动数据
		 * 		platform			PBPlayerPlatform	平台数据
		 * 		talk			PBPlayerTalk	聊天数据
		 * 		treasure			PBPlayerTreasure	探宝数据
		 * 		heaven			PBPlayerHeavenDungeon	天界副本数据
		 * 		crosschallenge			PBPlayerCrossChallenge	跨服竞技场
		 * 		room			PBPlayerRoomData	家园数据
		 * 		tablet			PBPlayerTablet	晶碑数据
		 * 		elf			PBElfData	精灵数据
		 * 		toplist			PBPlayerToplist	game排行榜数据
		 * 		weekchampion			PBPlayerWeekChampion	周冠军赛数据
		 * 		teamCampaign			PBPlayerTeamCampaign	组队征战数据
		 * 		privatespace			PBPlayerPrivateSpace	个人空间
		 * 		dragonball			PBPlayerDragonBallData	龙珠数据
		 * 		common			PBPlayerCommonData	common数据
		 * 		convenant			PBPlayerConvenantData	契约数据
		 * 		lottery			PBPlayerLottery	抽獎数据
		 * 		illustration			PBPlayerIllustration	图鉴数据
		 * 		redEnvelope			PBPlayerRedEnvelope	红包数据
		 * 		joyousLinkup			PBPlayerJoyousLinkup	连连看
		 * 		guess			PBPlayerGuess	猜猜猜数据
		 * 		defend			PBPlayerDefend	守护数据
		 * 		resonance			PBPlayerResonance	共鸣数据
		 * 		incubateegg			PBIncubateEggData	孵化蛋
		 * 		activityboss			PBActivityBossData	活动boss
		 */
		protected onSystemInfo(value: Pb_God.PBPlayerSystem): void
		{
			
		}
		/*****
		 * 功能系统信息 PBPlayerSystemExt	
		 * @param PBPlayerSystemExt
		 * 		saveorder			uint32	序列号
		 * 		flag			uint32	扩展功能标识 _emPlayerSystemExtFlag
		 * 		train			PBPlayerTrain	试炼数据
		 * 		crosschallenge			PBPlayerCrossChallenge	跨服竞技场
		 * 		orderdata			PBPlayerOrderData	角色订单管数据
		 */
		protected onSystemInfo2(value: Pb_God.PBPlayerSystemExt): void
		{
			
		}
		/*****
		 * 背包信息 PBPlayerBag
		 * @param PBPlayerBag
		 * 		saveorder			uint32	 序列号
		 * 		itembag			PBItem	 道具背包
		 * 		equipitem			PBItem	 穿戴的道具
		 * 		equiplog			PBEquipCompoundLog	 装备合成记录
		 */
		protected onBagInfo(value: Pb_God.PBPlayerBag): void
		{
			
		}
		/*****
		 * 背包信息 PBPlayerBag 扩展
		 * @param PBPlayerBag
		 * 		saveorder			uint32	 序列号
		 * 		itembag			PBItem	 道具背包
		 * 		equipitem			PBItem	 穿戴的道具
		 * 		equiplog			PBEquipCompoundLog	 装备合成记录
		 */
		protected onBagInfo2(value: Pb_God.PBPlayerBag): void
		{
			
		}
		/*****
		 * 伙伴信息 PBPlayerPet
		 * @param PBPlayerPet
		 * 		saveorder			uint32	序列号
		 * 		pet			PBPlayerPetInfo	伙伴信息
		 * 		sequence			uint32	伙伴自增长索引
		 * 		buyspace			uint32	购买的伙伴空间
		 * 		seenpets			uint32	见过的英雄
		 * 		reborncount			uint32	重生次数
		 * 		rebornbuycount			uint32	购买重生次数
		 * 		rewardpets			uint32	已领取的档案奖励的id
		 */
		protected onPetInfo(value: Pb_God.PBPlayerPet): void
		{
			
		}
		/*****
		 * 伙伴信息 PBPlayerPet 扩展
		 * @param PBPlayerPet
		 * 		saveorder			uint32	序列号
		 * 		pet			PBPlayerPetInfo	伙伴信息
		 * 		sequence			uint32	伙伴自增长索引
		 * 		buyspace			uint32	购买的伙伴空间
		 * 		seenpets			uint32	见过的英雄
		 * 		reborncount			uint32	重生次数
		 * 		rebornbuycount			uint32	购买重生次数
		 * 		rewardpets			uint32	已领取的档案奖励的id
		 */
		protected onPetInfo2(value: Pb_God.PBPlayerPet): void
		{
			
		}
		/*****
		 * 伙伴信息3 PBPlayerPetExt	
		 * @param PBPlayerPetExt
		 * 		saveorder			uint32	序列号
		 * 		pet			PBPlayerPetInfo	伙伴信息
		 */
		protected onPetInfo3(value: Pb_God.PBPlayerPetExt): void
		{
			
		}
		/*****
		 * 前端信息 PBClientData
		 * @param PBClientData
		 * 		saveorder			uint32	 序列号
		 * 		clientdata			string	 前端数据
		 */
		protected onClientInfo(value: Pb_God.PBClientData): void
		{
			
		}
		/*****
		 * 好友信息 PBPlayerFriend
		 * @param PBPlayerFriend
		 * 		saveorder			uint32	 序列号
		 * 		friendlist			PBPlayerFriendInfo	 好友列表
		 * 		applylist			PBPlayerFriendInfo	 申请列表
		 * 		blacklist			PBPlayerFriendInfo	 黑名单列表
		 * 		sendprize			uint32	 送取的礼物好友ID
		 * 		recieveprize			uint32	 收到的礼物好友ID
		 * 		addprize			uint32	 已经领取的礼物好友ID
		 * 		support			PBPlayerSupportHero	 自己的支援
		 * 		hiredsupport			PBFriendSupport	 已雇佣的支援
		 * 		usedsupport			PBFriendSupport	 已使用的支援
		 */
		protected onFriend(value: Pb_God.PBPlayerFriend): void
		{
			
		}
		/*****
		 * 邮件信息 PBPlayerMail
		 * @param PBPlayerMail
		 * 		saveorder			uint32	 序列号
		 * 		mail			PBMail	 邮件数据
		 */
		protected onMail(value: Pb_God.PBPlayerMail): void
		{
			
		}
		/*****
		 * 帮会信息 PBPlayerFaction
		 * @param PBPlayerFaction
		 * 		donatetype			uint32	 捐献类型_emFactionDonateType
		 * 		donateprize			uint32	 捐献活跃奖励
		 * 		livenesslevel			uint32	 活跃等级
		 * 		livenessexp			uint32	 活跃经验
		 * 		dailyliveness			uint32	 日活跃度
		 * 		weekliveness			uint32	 周活跃度
		 * 		skill			PBPlayerFactionSkill	 公会技能
		 * 		skillresetcount			uint32	 技能重置次数
		 * 		copymapbuycount			uint32	 副本购买次数
		 * 		copymapusefreecount			uint32	 副本使用免费次数
		 * 		copymapusebuycount			uint32	 副本使用购买次数
		 * 		factionwarcount			uint32	 公会战挑战次数
		 * 		nextrenametime			uint32	 下次重命名时间
		 * 		nextjointime			uint32	 下次加入公会时间
		 * 		copymapid			uint32	 正在打的副本ID
		 * 		pvpskill			PBPlayerFactionPVPSkill	 公会pvp技能
		 * 		pvpskillresetcount			uint32	 pvp技能重置次数
		 */
		protected onFaction(value: Pb_God.PBPlayerFaction): void
		{
			
		}
		/*****
		 * 检测角色名字 PBPlayerNameAck
		 * @param PBPlayerNameAck
		 * 		ret			uint32	 _emNetResult
		 * 		name			string	
		 */
		protected onCheckPlayerName(value: Pb_God.PBPlayerNameAck): void
		{
			
		}
		/*****
		 * 玩家数据发送完成	
		 * @param 
		 */
		protected onLoadComplete(): void
		{
			
		}
		/*****
		 * 防沉迷检测 PBPlayerWallowData
		 * @param PBPlayerWallowData
		 * 		onlineTime			uint32	 账号在线时间
		 * 		dailyOnlineTime			uint32	 账号今天在线时间
		 * 		isIDBlind			bool	id绑定
		 * 		isAdult			bool	是否成年
		 */
		protected onCheckWallow(value: Pb_God.PBPlayerWallowData): void
		{
			
		}
		/***** 请勿添加其他处理函数， 添加将会被覆盖 **/
	}
}