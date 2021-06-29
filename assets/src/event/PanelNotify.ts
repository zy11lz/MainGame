
module Pro
{
    /***
     * UI管理器列表
     */
    export class PanelNotify
    {
        /** 登陆 */
        public static Open_Login = "LoginMediator";

        /** 主界面 */
        public static Open_Main = "MainMediator";

        /** 通用警告框 */
        public static Open_Alert = "AlertWinMediator";
        public static Open_MinConsole = "MinConsoleMediator";

        /** 通用奖励 */
        public static Open_NormalAward = "NormalAwardMediator";

        /** 通用奖励预览小界面（参数为cfg.AddItemInfo[]） */
        public static Open_RewardPreview = "RewardPreviewMediator";

        /** 通用规则说明 */
        public static Open_Help = "HelpMediator";

        /** 重新登陆确认 */
        public static Open_ReLogin = "ReLoginMediator";

        /** 公告界面（附加参数 1-最新公告  2-用户协议） */
        public static Open_Notice = "NoticeMediator";

        /** GM */
        public static Open_GM = "GMMediator";

        /** 队伍编排 */
        public static Open_EmBattle = "EmbattleMeditor";

        /** 世界地图 */
        public static Open_WorldMap = "WorldMapMediator";

        /**道具信息 */
        public static Open_ItemReview = "ItemReviewMediator";

        /** 自选礼包界面 */
        public static Open_GiftPackSelectView = "GiftPackSelectMediator";

        /** 自选礼包界面(精灵) */
        public static Open_GiftHeroPackSelectView = "GiftHeroPackSelectMediator";

        /**邮件 */
        public static Open_Mail = "MailMediator";
        public static Open_MailDetail = "MailDetailMediator";

        /**任务 */
        public static Open_Task = "TaskMediator";

        /**聊天 */
        public static Open_Chat = "ChatMediator";

        /**远航 */
        public static Open_Sail = "SailMediator";

        /**远航确定信息 */
        public static Open_SailDetail = "SailDetailMediator";

        /** 货币购买其他道具快捷方式 */
        public static Open_TroopBuyItem = "TroopBuyItemMediator";

        /** 挂机副本升级弹窗 */
        public static Open_HookNextTips = "HookNextTipsMediator";

        /** 问卷调查 */
        public static Open_Question = "QuestionMediator";

        //============================= 神器 ==================================
        /** 神器 */
        public static Open_Artifact = "ArtifactMediator";
        /** 失落神器（所有神器列表展示）
         */
        public static Open_ArtifactAllList = "ArtifactAllListMediator";

        /** 技能描述查看 */
        public static Open_SkillReview = "SkillReviewMediator";
        /** 技能buff描述查看 */
        public static Open_SkillBuff = "SkillBuffMediator";

        /** 新手引导昵称 */
        public static Open_ChangeNickName = "ChangeNickNameMediator";

        /** 玩家升级界面 */
        public static Open_PlayerLevelUp = "PlayerLevelUpMediator";
        /** 新功能开启界面（独立于升级提醒时用到） */
        public static Open_SystemSwitchOpen = "SystemSwitchOpenMediator";

        /** 系统功能预览列表界面 */
        public static Open_SystemList = "SystemListMediator";

        /** 道具不足，获取途径提示 */
        public static Open_ItemAccess = "ItemAccessMediator";

        //=============================背包==================================
        /**背包 */
        public static Open_Bag = "BagMediator";
        /**背包出售普通装备 */
        public static Open_BagNorEquipSell = "BagNorEquipSellMediator";
        /**背包出售普通装备确认界面 */
        public static Open_BagNorEquipSellSure = "BagNorEquipSellSureMediator";
        /**背包出售神装备 */
        public static Open_BagGodEquipSell = "BagGodEquipSellMediator";
        /** 背包神装洗练 */
        public static Open_BagGodEquipRefine = "BagGodEquipRefineMediator";
        /** 背包符文洗练 */
        public static Open_BagRuneEquipRefine = "BagRuneEquipRefineMediator";
        /** 道具批量操作界面（包括装备道具出售、批量使用、英雄碎片合成等等） */
        public static Open_BagItemBatchAction = "BagItemBatchActionMediator";

        //=============================探宝==================================
        /** 探宝主界面 */
        public static Open_Treasure = "TreasureMediator";
        /** 探宝奖励 */
        public static Open_TreasureAward = "TreasureAwardMediator";

        //=============================我的心愿==================================
        /** 保底置换 */
        public static Open_Replacement: string = "ReplacementMediator";

        //=============================充值主界面（customParam  0-充值 1-VIP 2-每日礼包 3-特权商城）==================================
        public static Open_PayMain = "PayMainMediator";
        //=============================充值特权商城遮罩==================================
        public static Open_PayMainHighlight = "PayMainHighlightMediator";
        //=============================首充==================================
        public static Open_FirstPay = "FirstPayMediator";
        //=============================每日首充==================================
        public static Open_DayFirstPay = "DayFirstPayMediator";
        /** 助力礼包直购界面（各培养界面跳转进来，比如元灵跳转进来购买元灵礼包等） */
        public static Open_StrongerPayGift = "StrongerPayGiftMediator";

        //=============================福利大厅==================================
        public static Open_WealHall = "WealHallMediator";
        /** 超值月基金总界面（对应多个基金类型的分页） */
        public static Open_MonthFund = "MonthFundMediator";
        /** 超值月基金奖励预览 */
        public static Open_MonthFundPreview = "MonthFundPreviewMediator";


        /** 打金币 */
        public static Open_ClickGold = "ClickGoldMediator";

        /** 天降好礼（完成特定成就任务后，自动弹出界面领奖） */
        public static Open_GodGift = "GodGiftMediator";

        /** 神庭战令（赛季票成就系统） */
        public static Open_WarOrder = "WarOrderMediator";
        /** 神庭战令付费进阶界面 */
        public static Open_WarOrderCharge = "WarOrderChargeMediator";


        //=============================排行榜==================================
        /** 排行榜主界面 */
        public static Open_RankMain = "RankMainMediator";
        /** 排行榜详细信息 */
        public static Open_RankDetail = "RankDetailMediator";
        /** 排行榜带奖励详细信息 */
        public static Open_RankDetailReward = "RankDetailRewardMediator";

        //=============================锻造==================================
        /** 锻造 */
        public static Open_ItemCombin = "ItemCombinMediator";
        /** 锻造符文选择 */
        public static Open_ItemCombinRuneChoice = "ItemCombinRuneChoiceMediator";
        /** 锻造符文奖励 */
        public static Open_ItemCombinRuneReward = "ItemCombinRuneRewardMediator";
        /** 锻造符文技能 */
        public static Open_ItemCombinRuneSkill = "ItemCombinRuneSkillMediator";

        /** 锻造装备记录 */
        public static Open_ItemCombinEquipRecord = "ItemCombinEquipRecordMediator";

        //=============================公会====================================
        /** 公会主界面  */
        public static Open_FactionMain: string = "FactionMainMediator";
        /** 公会列表（包括创建帮会、加入帮会的操作） */
        public static Open_FactionList: string = "FactionListMediator";
        /** 公会捐献 */
        public static Open_FactionDonate: string = "FactionDonateMediator";
        /** 公会申请列表 */
        public static Open_FactionApplyList: string = "FactionApplyListMediator";
        /** 公会成员列表 */
        public static Open_FactionMembers: string = "FactionMembersMediator";
        /** 公会日志 */
        public static Open_FactionLog: string = "FactionLogMediator";
        /** 公会技能 */
        public static Open_FactionSkill: string = "FactionSkillMediator";
        /** 公会活跃 */
        public static Open_FactionLiveness: string = "FactionLivenessMediator";
        /** 公会副本 */
        public static Open_FactionBoss: string = "FactionBossMediator";
        /** 公会副本排行奖励界面 */
        public static Open_FactionBossRankReward: string = "FactionBossRankRewardMediator";
        /** 公会副本伤害排名列表界面 */
        public static Open_FactionBossDamageRank: string = "FactionBossDamageRankMediator";
        /** 公会排名 */
        public static Open_FactionRank: string = "FactionRankMediator";

        //=============================公会战====================================
        /** 公会战 */
        public static Open_FactionWar: string = "FactionWarMediator";
        /** 公会战-挑战信息界面(战前准备) */
        public static Open_FactionWarEnemyInfo: string = "FactionWarEnemyInfoMediator";
        /** 公会战-进攻一览（敌方据点列表） */
        public static Open_FactionWarEnemyList: string = "FactionWarEnemyListMediator";
        /** 公会战-排名奖励预览界面 */
        public static Open_FactionWarReward: string = "FactionWarRewardMediator";
        /** 公会战-战场日志界面 */
        public static Open_FactionWarRecord: string = "FactionWarRecordMediator";
        /** 公会战-战果宝箱界面 */
        public static Open_FactionWarResultBox: string = "FactionWarResultBoxMediator";
        /** 公会战-对战列表界面（所有参战的公会列表） */
        public static Open_FactionWarFactionList: string = "FactionWarFactionListMediator";
        /** 公会战-据点防守记录界面 */
        public static Open_FactionWarFortRecord: string = "FactionWarFortRecordMediator";



        //=============================星河神殿====================================
        /** 星河神殿 */
        public static Open_Temple: string = "TempleMediator";
        /** 星河神殿神殿挑战界面 */
        public static Open_TemplePreAttack: string = "TemplePreAttackMediator";
        /** 星河神殿挑战记录 */
        public static Open_TempleRecord: string = "TempleRecordMediator";


        /** 获得称号 */
        public static Open_ShapeTitleAward = "ShapeTitleAwardMediator";

        //=============================个人形象设置====================================
        /** 个人形象配置界面（包括头像、头像框、形象、称号四个类型分页） */
        public static Open_ShapeDev: string = "ShapeDevMediator";
        /** 改名 */
        public static Open_Rename: string = "RenameMediator";
        /** 系统设置 */
        public static Open_SystenSetting: string = "SystemSettingMediator";
        /** 查看其它玩家个人信息(小界面，查看别人个人空间的入口) */
        public static Open_PlayerInfo: string = "PlayerInfoMediator";
        /** 查看其它玩家个人空间界面 */
        public static Open_PlayerInfoHomeOther: string = "PlayerInfoHomeOtherMediator";
        /** 玩家自己形象设置总界面 */
        public static Open_PlayerInfoHomeSelf: string = "PlayerInfoHomeSelfMediator";
        /** 设置徽章展示界面 */
        public static Open_PlayerBadgeSetShow: string = "PlayerBadgeSetShowMediator";
        /** 举报玩家界面 */
        public static Open_PlayerComplain: string = "PlayerComplainMediator";
        /** CD KEY 兑换 */
        public static Open_CDKeyExchange: string = "CDKeyExchangeMediator";

        //=============================好友====================================
        /** 好友  */
        public static Open_Friend: string = "FriendMediator";
        public static Open_AddFriend: string = "AddFriendMediator";


        //=============================商城====================================
        /** 商城 */
        public static Open_Shop = "ShopMediator";
        /** 购买 */
        public static Open_ShopBuyView = "ShopBuyViewMediator";
        /** 精灵商店 */
        public static Open_SpriteShop = "SpriteShopMediator";
        /** 道具全价购买弹窗（非商城购买） */
        public static Open_ShopFullPriceBuy = "ShopFullPriceBuyMediator";
        /** 指定积分商店(界面与商城主界面类似，但此处只指定一种类型的商店，无分页) */
        public static Open_ScoreShop = "ScoreShopMediator";

        //=============================英雄===================================
        /** 英雄合并 */
        public static Open_HeroCombin = "HeroCombinMediator";
        /** 英雄分解 */
        public static Open_HeroSplit = "HeroSplitMediator";
        /** 英雄分解详情 */
        public static Open_HeroSplitInfo = "HeroSplitInfoMediator";
        /** 英雄档案 */
        public static Open_HeroArchivesMediator = "HeroArchivesMediator";
        /** 英雄进化预览 */
        public static Open_HeroEvolutionPreviewMediator = "HeroEvolutionPreviewMediator";
        /** 英雄故事 */
        public static Open_HeroStoryMediator = "HeroStoryMediator";

        /** 英雄携带物 */
        public static Open_HeroHorcrux = "HeroHorcruxMediator";
        /** 英雄携带物强化 */
        public static Open_HeroHorcruxUpMediator = "HeroHorcruxUpMediator";
        /** 英雄觉醒成功 */
        public static Open_HeroHorcruxSucceMediator = "HeroHorcruxSucceMediator";

        /**英雄重生确认 */
        public static Open_HeroRebirth = "HeroRebirthMediator";
        /**英雄高星重生确认 */
        public static Open_HeroHighStarReborn = "HeroHighStarRebornMediator";

        /**英雄召唤 */
        public static Open_HeroCall = "HeroCallMediator";
        /** 英雄召唤积分兑换 */
        public static Open_HeroCallScoreCall = "HeroCallScoreCallMediator";
        /** 英雄召唤规则*/
        public static Open_HeroCallRule = "HeroCallRuleMediator";
        /** 英雄召唤概率 */
        public static Open_HeroCallRuleDetail = "HeroCallRuleDetailMediator";
        /** 英雄召唤伙伴列表 */
        public static Open_HeroCallReward = "HeroCallRewardMediator";
        /** 英雄召唤高级伙伴展示 */
        public static Open_HeroCallBigShow = "HeroCallBigShowMediator";
        /** 英雄高级召唤 */
        public static Open_HeroCallExpandResCall = "HeroCallExpandResCallMediator";
        /** 英雄分享 */
        public static Open_HeroCallShareMediator = "HeroCallShareMediator";

        /** 英雄升星吞噬英雄选择界面 */
        public static Open_HeroUpStarDevour = "HeroUpStarDevourMediator";
        /** 英雄材料选择（圣物升阶等用到） */
        public static Open_HeroMaterialSelect = "HeroMaterialSelectMediator";
        /** 英雄三选一 */
        public static Open_HeroOpt = "HeroOptMediator";

        /**英雄背包 */
        public static Open_HeroBag = "HeroBagMediator";
        /**英雄养成 */
        public static Open_HeroDetail = "HeroDetailMediator";
        /** 英雄进阶成功弹窗 */
        public static Open_HeroUpAdvanceSuc = "HeroUpAdvanceSucMediator";
        /** 英雄进阶成功之后，开启新技能界面 */
        public static Open_HeroNewSkill = "HeroNewSkillMediator";
        /** 英雄升星成功弹窗 */
        public static Open_HeroUpStarSuc = "HeroUpStarSucMediator";
        /**精灵图鉴 */
        public static Open_HeroIllustration = "HeroIllustrationMediator";
        /**精灵图鉴上阵 */
        public static Open_HeroIllustration_UpPet = "HeroIllustrationUpPetMediator";
        /**精灵图鉴下阵 */
        public static Open_HeroIllustration_DownPet = "HeroIllustrationDownPetMediator";
        /**精灵图鉴羁绊 */
        public static Open_HeroIllustration_Trammel = "HeroIllustrationTrammelMediator";
        /**精灵图鉴成就 */
        public static Open_HeroIllustration_Achieve = "HeroIllustrationAchieveMediator";
        /**精灵图鉴属性 */
        public static Open_HeroIllustration_Attr = "HeroIllustrationAttrMediator";


        //圣物升级
        /** 激活新圣物 */
        public static Open_HeroHolyActive = "HeroHolyActiveMediator";
        /** 圣物升级 */
        public static Open_HeroHolyUpLevel = "HeroHolyUpLevelMediator";
        /** 圣物进阶 */
        public static Open_HeroHolyUpAdvance = "HeroHolyUpAdvanceMediator";

        //守护界面
        /**位置调整 */
        public static Open_HeroDefendLocationSet = "HeroDefendLocationSetMediator";
        /**精灵选择 */
        public static Open_HeroDefendChoice = "HeroDefendChoiceMediator";
        /**方案管理 */
        public static Open_HeroDefendPlan = "HeroDefendPlanMediator";
        /**方案选择 */
        public static Open_HeroDefendPlanMediator = "HeroDefendPlanChoiceMediator";
        /**升阶界面 */
        public static Open_HeroDefendAdvanceMeidtor = "HeroDefendAdvanceMediator";
        /**进阶总览 */
        public static Open_HeroDefendPreviewMediator = "HeroDefendPreviewMediator";
        /**守护之书 */
        public static Open_HeroDefendBookMediator = "HeroDefendBookMediator";

        /** 万神殿兑换 */
        public static Open_HeroExchange = "HeroExchangeMediator";
        /** 万神殿奖励预览 */
        public static Open_HeroExchangeReward = "HeroExchangeRewardMediator";
        /**  万神殿兑换商店 */
        public static Open_HeroExchangeShop = "HeroExchangeShopMediator";
        /**  万神殿召唤获得英雄奖励界面 */
        public static Open_HeroExchangeCallReward = "HeroExchangeCallRewardMediator";
        /**  万神殿梦幻积分抽卡 */
        public static Open_HeroDreamPointsReward = "HeroDreamPointsMediator";

        /** 英雄装备更换 */
        public static Open_HeroEquipSuit = "HeroEquipSuitMediator";
        /** 英雄神装装备更换 */
        public static Open_HeroEquipSuitGod = "HeroEquipSuitGodMediator";
        /** 英雄符文替换 */
        public static Open_HeroEquipSuitRune = "HeroEquipSuitRuneMediator";
        /** 神器出售确认界面 */
        public static Open_HeroGodEquipSell = "HeroGodEquipSellMediator";


        /** 英雄阵型查看 */
        public static Open_HeroZhenxing = "HeroZhenxingMediator";
        /** 英雄变强 */
        public static Open_HeroStronger = "HeroStrongerMediator";

        /** 英雄图书馆 */
        public static Open_HeroLibrary = "HeroLibraryMediator";
        /** 英雄立绘详细信息 */
        public static Open_HeroLibraryDetail = "HeroLibraryDetailMediator";
        /** 英雄故事背景介绍 */
        public static Open_HeroLibraryStory = "HeroLibraryStoryMediator";
        /** 英雄立绘 */
        public static Open_HeroLibraryVDraw = "HeroLibraryVDrawMediator";

        /** 英雄属性视图查看 */
        public static Open_HeroViewInfo = "HeroViewInfoMediator";
        /** 英雄属性数据查看 */
        public static Open_HeroDataInfo = "HeroDataInfoMediator";

        /** 英雄神装总属性加成tips展示 */
        public static Open_HeroGodEquipTotal = "HeroGodEquipTotalMediator";

        /** 挂机章节地图 */
        public static Open_HookChapterMap = "HookChapterMapMediator";

        /** 英雄圣物进阶总览 */
        public static Open_HeroHolyInfo = "HeroHolyInfoMediator";

        /** 英雄圣物详细信息 */
        public static Open_HeroHolyReview = "HeroHolyReview";

        /** 英雄评论 */
        public static Open_HeroComment = "HeroCommentMediator";

        //============================英雄End=================================

        //============================ 各大玩法入口 ==============================
        /** 跨服战场（集合了 跨服天梯、超凡段位赛、跨服竞技场 入口） */
        public static Open_AcrossWar = "AcrossWarMediator";
        /** 秘境探险（集合了 神界冒险、元素圣殿、天界副本 入口） */
        public static Open_SecretTravel = "SecretTravelMediator";

        //============================ 神界冒险 ==============================
        /** 神界冒险-选择英雄界面(入口) */
        public static Open_RiskHeroSelect = "RiskHeroSelectMediator";
        /** 神界冒险主玩法界面 */
        public static Open_RiskMain = "RiskMainMediator";
        /** 神界冒险目标奖励界面 */
        public static Open_RiskTargetReward = "RiskTargetRewardMediator";
        /** 神界冒险-冒险商店 */
        public static Open_RiskShop = "RiskShopMediator";
        /** 神界冒险-召唤商店 */
        public static Open_RiskCallShop = "RiskCallShopMediator";
        /** 神界冒险-挑战守卫（战前准备） */
        public static Open_RiskPreBattle = "RiskPreBattleMediator";
        /** 神界冒险-通关一层后奖励汇总界面 */
        public static Open_RiskRewardSum = "RiskRewardSumMediator";
        /** 神界冒险-事件:猜拳 */
        public static Open_RiskEventGuess = "RiskEventGuessMediator";
        /** 神界冒险-事件:宝藏箱 */
        public static Open_RiskEventBox = "RiskEventBoxMediator";
        /** 神界冒险-事件:问答（准备界面） */
        public static Open_RiskEventAnswerReady = "RiskEventAnswerReadyMediator";
        /** 神界冒险-事件:问答 */
        public static Open_RiskEventAnswer = "RiskEventAnswerMediator";
        /** 神界冒险-事件:与老头对话 */
        public static Open_RiskEventDialog = "RiskEventDialogMediator";
        /** 神界冒险-事件:神秘事件（其实是另外一种小型的对话类型） */
        public static Open_RiskEventMystery = "RiskEventMysteryMediator";

        //============================ 跨服天梯 ==============================
        /** 跨服天梯主界面 */
        public static Open_LadderMain = "LadderMainMediator";
        /** 跨服天梯奖励预览 */
        public static Open_LadderReward = "LadderRewardMediator";
        /** 跨服天梯英雄殿（top3） */
        public static Open_LadderTopHero = "LadderTopHeroMediator";
        /** 跨服天梯-战报界面 */
        public static Open_LadderRecord = "LadderRecordMediator";
        /** 跨服天梯-战前查看对方信息界面 */
        public static Open_LadderPreAttack = "LadderPreAttackMediator";



        //============================ 超凡段位赛 ==============================
        /** 超凡段位赛主界面 */
        public static Open_DanMain = "DanMainMediator";
        /** 超凡段位赛-个人战绩界面 */
        public static Open_DanExploits = "DanExploitsMediator";
        /** 超凡段位赛-奖励预览界面 */
        public static Open_DanRewardPreview = "DanRewardPreviewMediator";
        /** 超凡段位赛-战斗记录界面 */
        public static Open_DanRecord = "DanRecordMediator";
        /** 超凡段位赛-战斗记录详情界面 */
        public static Open_DanRecordDetail = "DanRecordDetailMediator";
        /** 超凡段位赛-赛季传奇界面（历史赛季的排名前几名形象展示） */
        public static Open_DanHistroyTop = "DanHistroyTopMediator";
        /** 超凡段位赛-选择展示的赛区 */
        public static Open_DanSelectShowArea = "DanSelectShowAreaMediator";
        /** 超凡段位赛-匹配界面 */
        public static Open_DanMatch = "DanMatchMediator";



        //============================ 元素圣殿 ==============================
        /** 元素圣殿主界面 */
        public static Open_Element = "ElementMediator";
        /** 元素圣殿详细信息 */
        public static Open_ElementDetail = "ElementDetailMediator";

        //=============================战场====================================
        /** 通用战斗失败 */
        public static Open_BattleFail = "BattleFailMediator";
        /** 通用战斗胜利 */
        public static Open_BattleWin = "BattleWinMediator";
        /** 挂机战斗胜利 */
        public static Open_HookBattleWin = "HookBattleWinMediator";
        /** 试炼塔战斗胜利 */
        public static Open_StarTowerBattleWin = "StarTowerBattleWinMediator";
        /** 竞技场战斗战报 */
        public static Open_ChallengeBattleResult: string = "BattleResultChallengeMediator";
        /** 天梯战斗结算界面 */
        public static Open_LadderBattleResult: string = "LadderBattleResultMediator";
        /** 玩家切蹉胜利界面 */
        public static Open_FriendFightResult = "FriendFightResultMediator";

        /** 快速作战挂机奖励 */
        public static Open_QuickAward = "QuickAwardMediator";

        //-----------------------------通用------------------------------------
        /** 试炼主入口 */
        public static Open_FightMain = "FightMainMediator";

        /** 好友支援 */
        public static Open_FightSupport = "FightSupportMediator";

        /** 通关录像 */
        public static Open_StageRedio = "StageRedioMediator";

        /** 通关奖励 */
        public static Open_StagePrize = "StagePrizeMediator";

        /** 掉落信息 */
        public static Open_DropInfo = "DropInfoMediator";

        /** 快速战斗 */
        public static Open_QuickFight = "QuickFightMediator";

        /** 战斗伤害对比 */
        public static Open_BattleHarm = "BattleHarmMediator";

        //-----------------------------日常副本----------------------------------
        /**日常副本 */
        public static Open_FightDaily = "FightDailyMediator";
        /**一键日常副本扫荡弹框提示 */
        public static Open_FightDailyAlertTips = "FightDailyAlertTipsMediator";


        //-----------------------------试炼塔------------------------------------
        /** 试炼塔主界面 */
        public static Open_StarTowerMain = "StarTowerMainMediator";
        /** 试炼塔主界面(精英) */
        public static Open_StarTowerMainAdv = "StarTowerMainAdvMediator";
        /** 试炼塔战斗层信息 */
        public static Open_StarTowerFight = "StarTowerFightMediator";

        //------------------------------无尽试炼----------------------------------
        /** 无尽试炼选择buff */
        public static Open_EndlessTowerBuff = "EndlessTowerBuffMediator";
        /** 无尽试炼主界面 */
        public static Open_EndlessTowerMain = "EndlessTowerMainMediator";
        /** 无尽试炼奖励一栏 */
        public static Open_EndlessTowerPrize = "EndlessTowerPrizeMediator";

        //-----------------------------远征------------------------------------
        /** 远征主界面 */
        public static Open_ExpeditionMain = "ExpeditionMainMediator";
        /** 远征战斗页面 */
        public static Open_ExpeditionFight = "ExpeditionFightMediator";
        /** 远征奖励页面 */
        public static Open_ExpeditionReward = "ExpeditionRewardMediator";
        /** 远征选择难易页面 */
        public static Open_ExpeditionChoice = "ExpeditionChoiceMediator";
        /** 远征录像 */
        public static Open_ExpeditionRecord = "ExpeditionRecordMediator";

        //-----------------------------组队------------------------------------
        /** 组队主界面 */
        public static Open_TeamCampaignMain = "TeamCampaignMainMediator";
        /** 组队战斗页面 */
        public static Open_TeamCampaignFight = "TeamCampaignFightMediator";
        /** 组队选择难易页面 */
        public static Open_TeamCampaignChoice = "TeamCampaignChoiceMediator";
        /** 组队奖励页面 */
        public static Open_TeamCampaignReward = "TeamCampaignRewardMediator";
        /** 组队英雄选择页面 */
        public static Open_TeamCampaignPetChoice = "TeamCampaignPetChoiceMediator";


        //=============================录相馆====================================
        /** 录相馆主界面 */
        public static Open_BattleVedio = "BattleVedioMediator";
        /** 录相馆个人收藏界面 */
        public static Open_BattleVedioCollect = "BattleVedioCollectMediator";
        /** 录相馆个人记录界面 */
        public static Open_BattleVedioSelfRecord = "BattleVedioSelfRecordMediator";



        //=============================竞技场====================================
        /**竞技场总入口界面(排位赛与冠军赛) */
        public static Open_ArenaEnter = "ArenaEnterMediator";
        //竞技场
        public static Open_Challenge: string = "ChallengeMediator";
        public static Open_ChallengeRecord: string = "ChallengeRecordMediator";

        //=============================冠军赛====================================
        /** 冠军赛开启提示界面 */
        public static Open_ChampionPrompt: string = "ChampionPromptMediator";
        /** 冠军赛主界面 */
        public static Open_Champion: string = "ChampionMediator";
        /** 冠军赛top3提示界面 */
        public static Open_ChampionTop3: string = "ChampionTop3Mediator";
        /** 冠军赛上届结算界面 */
        public static Open_ChampionResult: string = "ChampionResultMediator";
        /** 排行奖励 */
        public static Open_ChampReward: string = "ChampRewardMediator";
        /** 冠军赛-我的竞猜界面 */
        public static Open_ChampionMyGuess: string = "ChampionMyGuessMediator";
        /** 冠军赛-战斗记录界面 */
        public static Open_ChampRecord: string = "ChampRecordMediator";

        /** 战斗数据统计界面 */
        public static Open_BattleFightStatistics: string = "BattleFightStatisticsMediator";

        //=============================周冠军赛====================================
        /** 周冠军赛开启提示界面 */
        public static Open_WeekChampionPrompt: string = "WeekChampionPromptMediator";
        /** 周冠军赛主界面 */
        public static Open_WeekChampion: string = "WeekChampionMediator";
        /** 周冠军赛top3提示界面 */
        public static Open_WeekChampionTop3: string = "WeekChampionTop3Mediator";
        /** 周冠军赛上届结算界面 */
        public static Open_WeekChampionResult: string = "WeekChampionResultMediator";
        /** 周排行奖励 */
        public static Open_WeekChampReward: string = "WeekChampRewardMediator";
        /** 周冠军赛-我的竞猜界面 */
        public static Open_WeekChampionMyGuess: string = "WeekChampionMyGuessMediator";
        /** 周冠军赛-战斗记录界面 */
        public static Open_WeekChampRecord: string = "WeekChampRecordMediator";
        /** 周冠军赛-点赞页面 */
        public static Open_WeekChampionArenaTop3: string = "WeekChampionArenaTop3Mediator";


        ///---------------------------------活动UI-----------------------
        /** 通用的限时活动分类界面 */
        public static Open_TimeLimitActivity: string = "TimeLimitActivityMediator";
        // 限时兑换活动商店
        public static Open_LimitExchangeShop: string = "TimeLimitExchangeShopMediator";
        /** 购买 */
        public static Open_LimitExchangeBuy = "ExchangeBuyViewMediator";
        // 7日目标
        public static Open_SevenDayProgress: string = "SevenDayProgressMediator";
        // 7日登陆
        public static Open_SevenDayLogin: string = "SevenDayLoginMediator";
        // 新春累计登陆
        public static Open_FestivalCumulativeLogin: string = "CumulativeLoginMediator";
        // 计次活动奖励列表ui
        public static Open_CountGiftsRewardView: string = "CountGiftsRewardMediator";
        /** 短期礼包活动 */
        public static Open_LimitTimeGift: string = "LimitTimeGiftMediator";
        /** 充值返利 */
        public static Open_ChargeRebateView: string = "ChargeRebateMediator";
        /** 在线礼包 */
        public static Open_OnlinePrize: string = "OnlinePrizeMediator";
        /** 天命之子活动界面 */
        public static Open_SonOfDestiny: string = "SonOfDestinyMediator";
        /** 限时冲榜活动界面 */
        public static Open_RankActivity: string = "RankActivityMediator";
        /** 限时冲榜活动开启提示弹窗 */
        public static Open_RankActivityPrompt: string = "RankActivityPromptMediator";
        /** 0元购（少女狂欢节）活动界面 */
        public static Open_ZeroBuyActivity: string = "ZeroBuyActivityMediator";
        /** 全服限购活动（神龙宝藏）界面 */
        public static Open_LimitChargeGift: string = "LimitChargeGiftMediator";
        /** 新年红包 */
        public static Open_RedEnvelopeMediator: string = "RedEnvelopeMediator";
        /** 新年红包奖励 */
        public static Open_RedEnvelopeRewardMediator: string = "RedEnvelopeRewardMediator";

        // 后续待开启的奖励预览，七日登陆关闭之后预览第二天的界面 或者 关卡通关时预览30关的奖励。
        public static Open_NextPreviewPrompt: string = "NextPreviewPromptMediator";
        /** 定制礼包 */
        public static Open_DiyGiftsView: string = "DiyGiftsMediator";

        


        ///---------------------------------巅峰挑战-----------------------
        /*** 巅峰挑战入口界面（宣传页面） */
        public static Open_PeakEnter: string = "PeakEnterMediator";
        /*** 巅峰挑战主界面 */
        public static Open_Peak: string = "PeakMediator";



        ///---------------------------------天界副本-----------------------
        /*** 天界副本章节列表界面 */
        public static Open_HeavenMain: string = "HeavenMediator";
        /**  天界关卡列表界面 */
        public static Open_HeavenChapterView: string = "HeavenChapterMediator";
        /**  天界副本章节奖励界面 */
        public static Open_HeavenChapterRewardView: string = "ChapterRewardViewMediator";
        /** 天界副本章节结算界面 */
        public static Open_HeavenBattleResultView: string = "ChapterBattleResultMediator";
        /** 天界副本祈祷界面 */
        public static Open_HeavenPrayView: string = "HeavenPrayMediator";
        /** 天界副本祈祷记录界面 */
        public static Open_HeavenPrayRecordView: string = "HeavenPrayRecordMediator";

        /**  天界副本神装图鉴界面 */
        public static Open_HeavenGodEquipView: string = "GodEquipViewMediator";
        /**  天界副本神装商店界面 */
        public static Open_HeavenGodEquipShopView: string = "GodEquipShopMediator";
        /** 神装套装管理界面 */
        public static Open_GodEquipSuitMgr: string = "GodEquipSuitMgrMediator";
        /** 神装套装方案改名界面 */
        public static Open_GodEquipSuitProjectRename: string = "GodEquipSuitProjectRenameMediator";
        /** 神装套装方案保存确认界面 */
        public static Open_GodEquipSuitProjectSave: string = "GodEquipSuitProjectSaveMediator";
        /** 神装套装方案装配确认界面 */
        public static Open_GodEquipSuitProjectUse: string = "GodEquipSuitProjectUseMediator";
        //----------------------------进化-----------------------------
        /**进化主界面 */
        public static Open_EvolutionMainView: string = "EvolutionMainViewMediator";
        public static Open_EvolutionEffectUpView: string = "EvolutionEffectUpViewMediator"

        ///---------------------------------龙珠-----------------------
        /** 龙珠主界面 */
        public static Open_DragonBall: string = "DragonBallMediator";
        /** 龙珠升级界面 */
        public static Open_DragonBallUpLevel: string = "DragonBallUpLevelMediator";

        ///---------------------------------元素契约-----------------------
        /** 元素契约主界面 */
        public static Open_Convenant: string = "ConvenantMediator";

        //---------------------------用户协议------------------
        /**用户协议主界面 */
        public static Open_UserAgreement: string = "UserAgreementMediator";

        //---------------------------每日限购-------------------
        /**每日限购主界面 */
        public static Open_DayLimitBuy: string = "DayLimitBuyMediator";
        
        /**活动精灵预览 */
        public static Open_LimitHero: string = "LimitHeroMediator";

        /**胡帕预览 */
        public static Open_HuPa_Preview: string = "HuPaPreviewMediator";

        /**胡帕解放 */
        public static Open_HuPa_Liberate: string = "HuPaLiberateMediator";

        /**胡帕兑换选择材料 */
        public static Open_HuPa_Select_Material: string = "HuPaSelectMaterialMediator";

        /**兑换选择材料 */
        public static Open_LimitHero_Select_Material: string = "LimitHeroSelectMaterialMediator";

        /**胡帕解放特效界面 */
        public static Open_HuPa_Liberate_Show: string = "HuPaLiberateShowMediator";

        /**猜猜我是谁*/
        public static Open_Guess_Hero: string = "GuessHeroMainViewMediator";
        /**猜猜我是谁排行 */
        public static Open_Guess_Hero_Rank: string = "GuessHeroRankMainMediator";
        /**周末福蛋 */
        public static Open_Week_Welfare: string = "WeekWelfareMainViewMediator";
        /**牛气冲榜 */
        public static Open_BullishRank: string = "BullishRankActivityMediator";
        /**
         * 迎新战令
         */
        public static Open_Welcome_War_Order: string = "WelcomeWarOrderMediator";

        /**
         * 购买战令
         */
        public static Open_Welcome_War_Order_Charge: string = "WelcomeWarOrderChargeMediator";



        /**
         * 连连看
         */
        public static Open_LianLianKan: string = "LianLianKanMediator";
        /**
         * 连连看
         */
        public static Open_LianLianKanRank: string = "LianLianKanRankMediator";


        /**
         * 跨服竞技场
         */
        public static Open_CrossChallenge: string = "CrossChallengeMediator";

        
        /**
         * 跨服竞技场防守阵容
         */
        public static Open_CrossChallengeEmbattle: string = "CrossChallengeEmbattleMediator";


        /**
         * 跨服进攻
         */
        public static Open_CrossChallengeFight: string = "CrossChallengeFightMediator";

        /**
         * 跨服奖励
         */
        public static Open_CrossChallengeAward: string = "CrossChallengeAwardMediator";

        public static Open_CrossChallengeResult: string = "CrossChallengeResultMediator";

        /**
         * 共鸣
         */
        public static Open_HeroResonance: string = "HeroResonanceMediator";
        public static Open_HeroResonanceSelect: string = "HeroResonanceSelectMediator";
        public static Open_HeroResonanceDown: string = "HeroResonanceDownMediator";
        public static Open_HeroResonanceResult: string = "HeroResonanceResultMediator";

        /**
         * 孵化
         */
        public static Open_EggHatchChoice:string="EggHatchChoiceViewMediator";
        public static Open_EggHatchMain:string="EggHatchMainViewMediator";
        public static Open_EggHatchAddSpeed:string="EggHatchAddSpeedViewMediator";
        public static Open_EggHatchSucced:string="EggHatchSuccedViewMediator";

    }
}



