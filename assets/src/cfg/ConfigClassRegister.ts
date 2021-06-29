
module cfg
{
	/**
	* 
	*  根据 excel 配置 文件自动生成的代码
	*	
	* 【**不可手动修改此类**】，
	*	
	* 【任何修改都将被生成工具覆盖，如需修改请直接修改具体的excel文件】
	*
	* @author liuyang.AutoCreater
	* 
	*/	
	
	export class ConfigClassRegister 
	{
		private static _classMap:Object = new Object();
		 /**   【cs_activityboss.xls】  ---> ActivitybossConstantCfgInfo    **/ 
		public static  ActivitybossConstantCfgInfo:string = "ActivitybossConstantCfgInfo";
		 /**   【cs_activityboss.xls】  ---> ActivitybossMonsterNewCfgInfo    **/ 
		public static  ActivitybossMonsterNewCfgInfo:string = "ActivitybossMonsterNewCfgInfo";
		 /**   【cs_activityboss.xls】  ---> ActivitybossBuyCountCfgInfo    **/ 
		public static  ActivitybossBuyCountCfgInfo:string = "ActivitybossBuyCountCfgInfo";
		 /**   【cs_copymap.xls】  ---> CopymapCfgInfo    **/ 
		public static  CopymapCfgInfo:string = "CopymapCfgInfo";
		 /**   【cs_copymap.xls】  ---> CopymapMonsterNewCfgInfo    **/ 
		public static  CopymapMonsterNewCfgInfo:string = "CopymapMonsterNewCfgInfo";
		 /**   【c_question.xls】  ---> QuestionCfgInfo    **/ 
		public static  QuestionCfgInfo:string = "QuestionCfgInfo";
		 /**   【cs_sail.xls】  ---> SailRefreshCfgInfo    **/ 
		public static  SailRefreshCfgInfo:string = "SailRefreshCfgInfo";
		 /**   【cs_sail.xls】  ---> SailPoolCfgInfo    **/ 
		public static  SailPoolCfgInfo:string = "SailPoolCfgInfo";
		 /**   【cs_sail.xls】  ---> SailTypeCfgInfo    **/ 
		public static  SailTypeCfgInfo:string = "SailTypeCfgInfo";
		 /**   【cs_sail.xls】  ---> SailBuyhourCfgInfo    **/ 
		public static  SailBuyhourCfgInfo:string = "SailBuyhourCfgInfo";
		 /**   【cs_uiconfig.xls】  ---> UiconfigUibgCfgInfo    **/ 
		public static  UiconfigUibgCfgInfo:string = "UiconfigUibgCfgInfo";
		 /**   【cs_uiconfig.xls】  ---> UiconfigUiopenCfgInfo    **/ 
		public static  UiconfigUiopenCfgInfo:string = "UiconfigUiopenCfgInfo";
		 /**   【cs_guess.xls】  ---> GuessCfgInfo    **/ 
		public static  GuessCfgInfo:string = "GuessCfgInfo";
		 /**   【cs_guess.xls】  ---> GuessShowRewardCfgInfo    **/ 
		public static  GuessShowRewardCfgInfo:string = "GuessShowRewardCfgInfo";
		 /**   【cs_system_switch.xls】  ---> SystemSwitchSystemSwitchCfgInfo    **/ 
		public static  SystemSwitchSystemSwitchCfgInfo:string = "SystemSwitchSystemSwitchCfgInfo";
		 /**   【cs_system_switch.xls】  ---> SystemSwitchSystemGroupCfgInfo    **/ 
		public static  SystemSwitchSystemGroupCfgInfo:string = "SystemSwitchSystemGroupCfgInfo";
		 /**   【c_helpSprite.xls】  ---> HelpSpriteCfgInfo    **/ 
		public static  HelpSpriteCfgInfo:string = "HelpSpriteCfgInfo";
		 /**   【cs_treasure.xls】  ---> TreasureHuntTypeCfgInfo    **/ 
		public static  TreasureHuntTypeCfgInfo:string = "TreasureHuntTypeCfgInfo";
		 /**   【cs_treasure.xls】  ---> TreasureCostCfgInfo    **/ 
		public static  TreasureCostCfgInfo:string = "TreasureCostCfgInfo";
		 /**   【cs_treasure.xls】  ---> TreasurePoolCfgInfo    **/ 
		public static  TreasurePoolCfgInfo:string = "TreasurePoolCfgInfo";
		 /**   【cs_treasure.xls】  ---> TreasureHuntCfgInfo    **/ 
		public static  TreasureHuntCfgInfo:string = "TreasureHuntCfgInfo";
		 /**   【cs_treasure.xls】  ---> TreasureLuckyRewardCfgInfo    **/ 
		public static  TreasureLuckyRewardCfgInfo:string = "TreasureLuckyRewardCfgInfo";
		 /**   【cs_champion.xls】  ---> ChampionConstInfoCfgInfo    **/ 
		public static  ChampionConstInfoCfgInfo:string = "ChampionConstInfoCfgInfo";
		 /**   【cs_champion.xls】  ---> ChampionTopPrizeCfgInfo    **/ 
		public static  ChampionTopPrizeCfgInfo:string = "ChampionTopPrizeCfgInfo";
		 /**   【cs_champion.xls】  ---> ChampionRoundCfgInfo    **/ 
		public static  ChampionRoundCfgInfo:string = "ChampionRoundCfgInfo";
		 /**   【cs_faction_name.xls】  ---> FactionNameNameCfgInfo    **/ 
		public static  FactionNameNameCfgInfo:string = "FactionNameNameCfgInfo";
		 /**   【cs_hook.xls】  ---> HookSceneCfgInfo    **/ 
		public static  HookSceneCfgInfo:string = "HookSceneCfgInfo";
		 /**   【cs_hook.xls】  ---> HookStageCfgInfo    **/ 
		public static  HookStageCfgInfo:string = "HookStageCfgInfo";
		 /**   【cs_hook.xls】  ---> HookStagePrizeCfgInfo    **/ 
		public static  HookStagePrizeCfgInfo:string = "HookStagePrizeCfgInfo";
		 /**   【cs_hook.xls】  ---> HookBuySweepcountCfgInfo    **/ 
		public static  HookBuySweepcountCfgInfo:string = "HookBuySweepcountCfgInfo";
		 /**   【cs_hook.xls】  ---> HookActivityDropCfgInfo    **/ 
		public static  HookActivityDropCfgInfo:string = "HookActivityDropCfgInfo";
		 /**   【cs_hook.xls】  ---> HookBossDropInfoCfgInfo    **/ 
		public static  HookBossDropInfoCfgInfo:string = "HookBossDropInfoCfgInfo";
		 /**   【cs_hook.xls】  ---> HookNormalDropInfoCfgInfo    **/ 
		public static  HookNormalDropInfoCfgInfo:string = "HookNormalDropInfoCfgInfo";
		 /**   【cs_hook.xls】  ---> HookChapterUnlockCfgInfo    **/ 
		public static  HookChapterUnlockCfgInfo:string = "HookChapterUnlockCfgInfo";
		 /**   【cs_hook.xls】  ---> HookMonsterNewCfgInfo    **/ 
		public static  HookMonsterNewCfgInfo:string = "HookMonsterNewCfgInfo";
		 /**   【cs_mail.xls】  ---> MailCfgInfo    **/ 
		public static  MailCfgInfo:string = "MailCfgInfo";
		 /**   【cs_item.xls】  ---> ItemCfgInfo    **/ 
		public static  ItemCfgInfo:string = "ItemCfgInfo";
		 /**   【cs_item.xls】  ---> ItemPackCfgInfo    **/ 
		public static  ItemPackCfgInfo:string = "ItemPackCfgInfo";
		 /**   【cs_item.xls】  ---> ItemCompoundCfgInfo    **/ 
		public static  ItemCompoundCfgInfo:string = "ItemCompoundCfgInfo";
		 /**   【cs_item.xls】  ---> ItemPetcountCompoundCfgInfo    **/ 
		public static  ItemPetcountCompoundCfgInfo:string = "ItemPetcountCompoundCfgInfo";
		 /**   【cs_item.xls】  ---> ItemPettypeRandCfgInfo    **/ 
		public static  ItemPettypeRandCfgInfo:string = "ItemPettypeRandCfgInfo";
		 /**   【cs_item.xls】  ---> ItemPetidRandCfgInfo    **/ 
		public static  ItemPetidRandCfgInfo:string = "ItemPetidRandCfgInfo";
		 /**   【cs_item.xls】  ---> ItemPetSplitCfgInfo    **/ 
		public static  ItemPetSplitCfgInfo:string = "ItemPetSplitCfgInfo";
		 /**   【cs_item.xls】  ---> ItemEquipSuitCfgInfo    **/ 
		public static  ItemEquipSuitCfgInfo:string = "ItemEquipSuitCfgInfo";
		 /**   【cs_item.xls】  ---> ItemGiftPackCfgInfo    **/ 
		public static  ItemGiftPackCfgInfo:string = "ItemGiftPackCfgInfo";
		 /**   【cs_pet_skin.xls】  ---> PetSkinCfgInfo    **/ 
		public static  PetSkinCfgInfo:string = "PetSkinCfgInfo";
		 /**   【cs_toplist.xls】  ---> ToplistCfgInfo    **/ 
		public static  ToplistCfgInfo:string = "ToplistCfgInfo";
		 /**   【cs_toplist.xls】  ---> ToplistRewardCfgInfo    **/ 
		public static  ToplistRewardCfgInfo:string = "ToplistRewardCfgInfo";
		 /**   【cs_toplist.xls】  ---> ToplistHeroScoreCfgInfo    **/ 
		public static  ToplistHeroScoreCfgInfo:string = "ToplistHeroScoreCfgInfo";
		 /**   【cs_toplist.xls】  ---> ToplistPieceScoreCfgInfo    **/ 
		public static  ToplistPieceScoreCfgInfo:string = "ToplistPieceScoreCfgInfo";
		 /**   【cs_toplist.xls】  ---> ToplistChargeScoreCfgInfo    **/ 
		public static  ToplistChargeScoreCfgInfo:string = "ToplistChargeScoreCfgInfo";
		 /**   【cs_toplist.xls】  ---> ToplistUpstarScoreCfgInfo    **/ 
		public static  ToplistUpstarScoreCfgInfo:string = "ToplistUpstarScoreCfgInfo";
		 /**   【cs_ladder.xls】  ---> LadderConstInfoCfgInfo    **/ 
		public static  LadderConstInfoCfgInfo:string = "LadderConstInfoCfgInfo";
		 /**   【cs_ladder.xls】  ---> LadderRobotCfgInfo    **/ 
		public static  LadderRobotCfgInfo:string = "LadderRobotCfgInfo";
		 /**   【cs_ladder.xls】  ---> LadderTopPrizeCfgInfo    **/ 
		public static  LadderTopPrizeCfgInfo:string = "LadderTopPrizeCfgInfo";
		 /**   【cs_ladder.xls】  ---> LadderBuyCountCfgInfo    **/ 
		public static  LadderBuyCountCfgInfo:string = "LadderBuyCountCfgInfo";
		 /**   【cs_ladder.xls】  ---> LadderMonsterNewCfgInfo    **/ 
		public static  LadderMonsterNewCfgInfo:string = "LadderMonsterNewCfgInfo";
		 /**   【cs_ant.xls】  ---> ConstantCfgInfo    **/ 
		public static  ConstantCfgInfo:string = "ConstantCfgInfo";
		 /**   【cs_ant.xls】  ---> ConstantClientConstantCfgInfo    **/ 
		public static  ConstantClientConstantCfgInfo:string = "ConstantClientConstantCfgInfo";
		 /**   【cs_ant.xls】  ---> ConstantGamesPrizePreviewCfgInfo    **/ 
		public static  ConstantGamesPrizePreviewCfgInfo:string = "ConstantGamesPrizePreviewCfgInfo";
		 /**   【cs_charge.xls】  ---> ChargeCfgInfo    **/ 
		public static  ChargeCfgInfo:string = "ChargeCfgInfo";
		 /**   【cs_joyous_linkup.xls】  ---> JoyousLinkupJoyousLinkupCfgInfo    **/ 
		public static  JoyousLinkupJoyousLinkupCfgInfo:string = "JoyousLinkupJoyousLinkupCfgInfo";
		 /**   【cs_joyous_linkup.xls】  ---> JoyousLinkupStageCfgInfo    **/ 
		public static  JoyousLinkupStageCfgInfo:string = "JoyousLinkupStageCfgInfo";
		 /**   【cs_joyous_linkup.xls】  ---> JoyousLinkupJoyousLinkupChessCfgInfo    **/ 
		public static  JoyousLinkupJoyousLinkupChessCfgInfo:string = "JoyousLinkupJoyousLinkupChessCfgInfo";
		 /**   【cs_artifact.xls】  ---> ArtifactCfgInfo    **/ 
		public static  ArtifactCfgInfo:string = "ArtifactCfgInfo";
		 /**   【cs_artifact.xls】  ---> ArtifactActiveCfgInfo    **/ 
		public static  ArtifactActiveCfgInfo:string = "ArtifactActiveCfgInfo";
		 /**   【cs_artifact.xls】  ---> ArtifactUpgradeCfgInfo    **/ 
		public static  ArtifactUpgradeCfgInfo:string = "ArtifactUpgradeCfgInfo";
		 /**   【cs_artifact.xls】  ---> ArtifactSkillUpgradeCfgInfo    **/ 
		public static  ArtifactSkillUpgradeCfgInfo:string = "ArtifactSkillUpgradeCfgInfo";
		 /**   【cs_artifact.xls】  ---> ArtifactYlactiveCfgInfo    **/ 
		public static  ArtifactYlactiveCfgInfo:string = "ArtifactYlactiveCfgInfo";
		 /**   【cs_artifact.xls】  ---> ArtifactYlstagerewardCfgInfo    **/ 
		public static  ArtifactYlstagerewardCfgInfo:string = "ArtifactYlstagerewardCfgInfo";
		 /**   【cs_artifact.xls】  ---> ArtifactConstCfgInfo    **/ 
		public static  ArtifactConstCfgInfo:string = "ArtifactConstCfgInfo";
		 /**   【cs_shape.xls】  ---> ShapeTitleCfgInfo    **/ 
		public static  ShapeTitleCfgInfo:string = "ShapeTitleCfgInfo";
		 /**   【cs_shape.xls】  ---> ShapeProvinceCfgInfo    **/ 
		public static  ShapeProvinceCfgInfo:string = "ShapeProvinceCfgInfo";
		 /**   【cs_shape.xls】  ---> ShapeHeadIconCfgInfo    **/ 
		public static  ShapeHeadIconCfgInfo:string = "ShapeHeadIconCfgInfo";
		 /**   【cs_shape.xls】  ---> ShapePetSkinCfgInfo    **/ 
		public static  ShapePetSkinCfgInfo:string = "ShapePetSkinCfgInfo";
		 /**   【cs_shape.xls】  ---> ShapeBadgeCfgInfo    **/ 
		public static  ShapeBadgeCfgInfo:string = "ShapeBadgeCfgInfo";
		 /**   【cs_shape.xls】  ---> ShapeHonorUpgradeCfgInfo    **/ 
		public static  ShapeHonorUpgradeCfgInfo:string = "ShapeHonorUpgradeCfgInfo";
		 /**   【cs_privilege.xls】  ---> PrivilegeVipCfgInfo    **/ 
		public static  PrivilegeVipCfgInfo:string = "PrivilegeVipCfgInfo";
		 /**   【cs_privilege.xls】  ---> PrivilegeCfgInfo    **/ 
		public static  PrivilegeCfgInfo:string = "PrivilegeCfgInfo";
		 /**   【cs_privilege.xls】  ---> PrivilegeShopCfgInfo    **/ 
		public static  PrivilegeShopCfgInfo:string = "PrivilegeShopCfgInfo";
		 /**   【cs_privilege.xls】  ---> PrivilegeDailyPrizeCfgInfo    **/ 
		public static  PrivilegeDailyPrizeCfgInfo:string = "PrivilegeDailyPrizeCfgInfo";
		 /**   【cs_privilege.xls】  ---> PrivilegeCardCfgInfo    **/ 
		public static  PrivilegeCardCfgInfo:string = "PrivilegeCardCfgInfo";
		 /**   【cs_privilege.xls】  ---> PrivilegeDailyFirstChargeCfgInfo    **/ 
		public static  PrivilegeDailyFirstChargeCfgInfo:string = "PrivilegeDailyFirstChargeCfgInfo";
		 /**   【cs_player.xls】  ---> PlayerLevelCfgInfo    **/ 
		public static  PlayerLevelCfgInfo:string = "PlayerLevelCfgInfo";
		 /**   【cs_custom_gift.xls】  ---> CustomGiftCfgInfo    **/ 
		public static  CustomGiftCfgInfo:string = "CustomGiftCfgInfo";
		 /**   【cs_custom_gift.xls】  ---> CustomGiftGiftpoolCfgInfo    **/ 
		public static  CustomGiftGiftpoolCfgInfo:string = "CustomGiftGiftpoolCfgInfo";
		 /**   【cs_faction.xls】  ---> FactionUpgradeCfgInfo    **/ 
		public static  FactionUpgradeCfgInfo:string = "FactionUpgradeCfgInfo";
		 /**   【cs_faction.xls】  ---> FactionDonatePrizeCfgInfo    **/ 
		public static  FactionDonatePrizeCfgInfo:string = "FactionDonatePrizeCfgInfo";
		 /**   【cs_faction.xls】  ---> FactionDonateCfgInfo    **/ 
		public static  FactionDonateCfgInfo:string = "FactionDonateCfgInfo";
		 /**   【cs_faction.xls】  ---> FactionLivenessCfgInfo    **/ 
		public static  FactionLivenessCfgInfo:string = "FactionLivenessCfgInfo";
		 /**   【cs_faction.xls】  ---> FactionSkillCfgInfo    **/ 
		public static  FactionSkillCfgInfo:string = "FactionSkillCfgInfo";
		 /**   【cs_faction.xls】  ---> FactionSkillUpgradeCfgInfo    **/ 
		public static  FactionSkillUpgradeCfgInfo:string = "FactionSkillUpgradeCfgInfo";
		 /**   【cs_faction.xls】  ---> FactionSkillResetCfgInfo    **/ 
		public static  FactionSkillResetCfgInfo:string = "FactionSkillResetCfgInfo";
		 /**   【cs_faction.xls】  ---> FactionCopymapCfgInfo    **/ 
		public static  FactionCopymapCfgInfo:string = "FactionCopymapCfgInfo";
		 /**   【cs_faction.xls】  ---> FactionCopymapBuycountCfgInfo    **/ 
		public static  FactionCopymapBuycountCfgInfo:string = "FactionCopymapBuycountCfgInfo";
		 /**   【cs_faction.xls】  ---> FactionCopymapTopprizeCfgInfo    **/ 
		public static  FactionCopymapTopprizeCfgInfo:string = "FactionCopymapTopprizeCfgInfo";
		 /**   【cs_faction.xls】  ---> FactionMonsterNewCfgInfo    **/ 
		public static  FactionMonsterNewCfgInfo:string = "FactionMonsterNewCfgInfo";
		 /**   【cs_faction.xls】  ---> FactionImpeachTimeCfgInfo    **/ 
		public static  FactionImpeachTimeCfgInfo:string = "FactionImpeachTimeCfgInfo";
		 /**   【cs_rune.xls】  ---> RuneCompoundCfgInfo    **/ 
		public static  RuneCompoundCfgInfo:string = "RuneCompoundCfgInfo";
		 /**   【cs_rune.xls】  ---> RuneRefineCfgInfo    **/ 
		public static  RuneRefineCfgInfo:string = "RuneRefineCfgInfo";
		 /**   【cs_rune.xls】  ---> RuneRandattrCfgInfo    **/ 
		public static  RuneRandattrCfgInfo:string = "RuneRandattrCfgInfo";
		 /**   【cs_rune.xls】  ---> RuneRandskillCfgInfo    **/ 
		public static  RuneRandskillCfgInfo:string = "RuneRandskillCfgInfo";
		 /**   【cs_rune.xls】  ---> RuneFixedCfgInfo    **/ 
		public static  RuneFixedCfgInfo:string = "RuneFixedCfgInfo";
		 /**   【cs_faction_war.xls】  ---> FactionWarConstCfgInfo    **/ 
		public static  FactionWarConstCfgInfo:string = "FactionWarConstCfgInfo";
		 /**   【cs_faction_war.xls】  ---> FactionWarFightPrizeCfgInfo    **/ 
		public static  FactionWarFightPrizeCfgInfo:string = "FactionWarFightPrizeCfgInfo";
		 /**   【cs_faction_war.xls】  ---> FactionWarBoxPrizeCfgInfo    **/ 
		public static  FactionWarBoxPrizeCfgInfo:string = "FactionWarBoxPrizeCfgInfo";
		 /**   【cs_faction_war.xls】  ---> FactionWarTopPrizeCfgInfo    **/ 
		public static  FactionWarTopPrizeCfgInfo:string = "FactionWarTopPrizeCfgInfo";
		 /**   【cs_horcrux.xls】  ---> HorcruxConstCfgInfo    **/ 
		public static  HorcruxConstCfgInfo:string = "HorcruxConstCfgInfo";
		 /**   【cs_horcrux.xls】  ---> HorcruxCfgInfo    **/ 
		public static  HorcruxCfgInfo:string = "HorcruxCfgInfo";
		 /**   【cs_horcrux.xls】  ---> HorcruxPropCfgInfo    **/ 
		public static  HorcruxPropCfgInfo:string = "HorcruxPropCfgInfo";
		 /**   【cs_holy.xls】  ---> HolyUpgradeCfgInfo    **/ 
		public static  HolyUpgradeCfgInfo:string = "HolyUpgradeCfgInfo";
		 /**   【cs_holy.xls】  ---> HolyAdvanceCfgInfo    **/ 
		public static  HolyAdvanceCfgInfo:string = "HolyAdvanceCfgInfo";
		 /**   【cs_holy.xls】  ---> HolyUnlockCfgInfo    **/ 
		public static  HolyUnlockCfgInfo:string = "HolyUnlockCfgInfo";
		 /**   【cs_team_campaign.xls】  ---> TeamCampaignStageCfgInfo    **/ 
		public static  TeamCampaignStageCfgInfo:string = "TeamCampaignStageCfgInfo";
		 /**   【cs_team_campaign.xls】  ---> TeamCampaignFormationCfgInfo    **/ 
		public static  TeamCampaignFormationCfgInfo:string = "TeamCampaignFormationCfgInfo";
		 /**   【cs_team_campaign.xls】  ---> TeamCampaignExtraPrizeCfgInfo    **/ 
		public static  TeamCampaignExtraPrizeCfgInfo:string = "TeamCampaignExtraPrizeCfgInfo";
		 /**   【cs_team_campaign.xls】  ---> TeamCampaignRobotCfgInfo    **/ 
		public static  TeamCampaignRobotCfgInfo:string = "TeamCampaignRobotCfgInfo";
		 /**   【cs_team_campaign.xls】  ---> TeamCampaignMonsterNewCfgInfo    **/ 
		public static  TeamCampaignMonsterNewCfgInfo:string = "TeamCampaignMonsterNewCfgInfo";
		 /**   【cs_heaven.xls】  ---> HeavenCommonCfgInfo    **/ 
		public static  HeavenCommonCfgInfo:string = "HeavenCommonCfgInfo";
		 /**   【cs_heaven.xls】  ---> HeavenChapterCfgInfo    **/ 
		public static  HeavenChapterCfgInfo:string = "HeavenChapterCfgInfo";
		 /**   【cs_heaven.xls】  ---> HeavenChapterPrizeCfgInfo    **/ 
		public static  HeavenChapterPrizeCfgInfo:string = "HeavenChapterPrizeCfgInfo";
		 /**   【cs_heaven.xls】  ---> HeavenStageCfgInfo    **/ 
		public static  HeavenStageCfgInfo:string = "HeavenStageCfgInfo";
		 /**   【cs_heaven.xls】  ---> HeavenStarConditionCfgInfo    **/ 
		public static  HeavenStarConditionCfgInfo:string = "HeavenStarConditionCfgInfo";
		 /**   【cs_heaven.xls】  ---> HeavenPrayStatueCfgInfo    **/ 
		public static  HeavenPrayStatueCfgInfo:string = "HeavenPrayStatueCfgInfo";
		 /**   【cs_heaven.xls】  ---> HeavenPrayPrizePoolCfgInfo    **/ 
		public static  HeavenPrayPrizePoolCfgInfo:string = "HeavenPrayPrizePoolCfgInfo";
		 /**   【cs_heaven.xls】  ---> HeavenPrayPrizeItemsCfgInfo    **/ 
		public static  HeavenPrayPrizeItemsCfgInfo:string = "HeavenPrayPrizeItemsCfgInfo";
		 /**   【cs_heaven.xls】  ---> HeavenPrayPrizeTypeCfgInfo    **/ 
		public static  HeavenPrayPrizeTypeCfgInfo:string = "HeavenPrayPrizeTypeCfgInfo";
		 /**   【cs_heaven.xls】  ---> HeavenMonsterNewCfgInfo    **/ 
		public static  HeavenMonsterNewCfgInfo:string = "HeavenMonsterNewCfgInfo";
		 /**   【c_gm.xls】  ---> GmCfgInfo    **/ 
		public static  GmCfgInfo:string = "GmCfgInfo";
		 /**   【cs_train.xls】  ---> TrainTowerPrizeCfgInfo    **/ 
		public static  TrainTowerPrizeCfgInfo:string = "TrainTowerPrizeCfgInfo";
		 /**   【cs_train.xls】  ---> TrainTowerCfgInfo    **/ 
		public static  TrainTowerCfgInfo:string = "TrainTowerCfgInfo";
		 /**   【cs_train.xls】  ---> TrainTowerCountCfgInfo    **/ 
		public static  TrainTowerCountCfgInfo:string = "TrainTowerCountCfgInfo";
		 /**   【cs_train.xls】  ---> TrainEndlessCfgInfo    **/ 
		public static  TrainEndlessCfgInfo:string = "TrainEndlessCfgInfo";
		 /**   【cs_train.xls】  ---> TrainEndlessPrizeCfgInfo    **/ 
		public static  TrainEndlessPrizeCfgInfo:string = "TrainEndlessPrizeCfgInfo";
		 /**   【cs_train.xls】  ---> TrainEndlestBuffCfgInfo    **/ 
		public static  TrainEndlestBuffCfgInfo:string = "TrainEndlestBuffCfgInfo";
		 /**   【cs_train.xls】  ---> TrainConstantsCfgInfo    **/ 
		public static  TrainConstantsCfgInfo:string = "TrainConstantsCfgInfo";
		 /**   【cs_train.xls】  ---> TrainPeakCfgInfo    **/ 
		public static  TrainPeakCfgInfo:string = "TrainPeakCfgInfo";
		 /**   【cs_train.xls】  ---> TrainMonsterNewCfgInfo    **/ 
		public static  TrainMonsterNewCfgInfo:string = "TrainMonsterNewCfgInfo";
		 /**   【cs_achieve.xls】  ---> AchieveMainAchieveCfgInfo    **/ 
		public static  AchieveMainAchieveCfgInfo:string = "AchieveMainAchieveCfgInfo";
		 /**   【cs_achieve.xls】  ---> AchieveLivenessCfgInfo    **/ 
		public static  AchieveLivenessCfgInfo:string = "AchieveLivenessCfgInfo";
		 /**   【cs_achieve.xls】  ---> AchieveFactionLivenessCfgInfo    **/ 
		public static  AchieveFactionLivenessCfgInfo:string = "AchieveFactionLivenessCfgInfo";
		 /**   【cs_achieve.xls】  ---> AchieveLivenessPrizeCfgInfo    **/ 
		public static  AchieveLivenessPrizeCfgInfo:string = "AchieveLivenessPrizeCfgInfo";
		 /**   【cs_achieve.xls】  ---> AchieveTypeCfgInfo    **/ 
		public static  AchieveTypeCfgInfo:string = "AchieveTypeCfgInfo";
		 /**   【cs_achieve.xls】  ---> AchieveTrainCfgInfo    **/ 
		public static  AchieveTrainCfgInfo:string = "AchieveTrainCfgInfo";
		 /**   【cs_achieve.xls】  ---> AchieveActivityLivenessCfgInfo    **/ 
		public static  AchieveActivityLivenessCfgInfo:string = "AchieveActivityLivenessCfgInfo";
		 /**   【cs_achieve.xls】  ---> AchieveActivityLivenessPrizeCfgInfo    **/ 
		public static  AchieveActivityLivenessPrizeCfgInfo:string = "AchieveActivityLivenessPrizeCfgInfo";
		 /**   【cs_achieve.xls】  ---> AchieveWeekLivenessCfgInfo    **/ 
		public static  AchieveWeekLivenessCfgInfo:string = "AchieveWeekLivenessCfgInfo";
		 /**   【cs_achieve.xls】  ---> AchieveWeekLivenessPrizeCfgInfo    **/ 
		public static  AchieveWeekLivenessPrizeCfgInfo:string = "AchieveWeekLivenessPrizeCfgInfo";
		 /**   【cs_achieve.xls】  ---> AchieveWarOrderCfgInfo    **/ 
		public static  AchieveWarOrderCfgInfo:string = "AchieveWarOrderCfgInfo";
		 /**   【cs_achieve.xls】  ---> AchieveWarOrderPrizeCfgInfo    **/ 
		public static  AchieveWarOrderPrizeCfgInfo:string = "AchieveWarOrderPrizeCfgInfo";
		 /**   【cs_achieve.xls】  ---> AchieveConstCfgInfo    **/ 
		public static  AchieveConstCfgInfo:string = "AchieveConstCfgInfo";
		 /**   【cs_achieve.xls】  ---> AchieveRoadCfgInfo    **/ 
		public static  AchieveRoadCfgInfo:string = "AchieveRoadCfgInfo";
		 /**   【cs_battle.xls】  ---> BattleCfgInfo    **/ 
		public static  BattleCfgInfo:string = "BattleCfgInfo";
		 /**   【cs_battle.xls】  ---> BattleTypeRestrainCfgInfo    **/ 
		public static  BattleTypeRestrainCfgInfo:string = "BattleTypeRestrainCfgInfo";
		 /**   【cs_battle.xls】  ---> BattleFormationAttrCfgInfo    **/ 
		public static  BattleFormationAttrCfgInfo:string = "BattleFormationAttrCfgInfo";
		 /**   【cs_battle.xls】  ---> BattleTypeCfgInfo    **/ 
		public static  BattleTypeCfgInfo:string = "BattleTypeCfgInfo";
		 /**   【cs_weal.xls】  ---> WealSigninCfgInfo    **/ 
		public static  WealSigninCfgInfo:string = "WealSigninCfgInfo";
		 /**   【cs_weal.xls】  ---> WealClickgoldCfgInfo    **/ 
		public static  WealClickgoldCfgInfo:string = "WealClickgoldCfgInfo";
		 /**   【cs_weal.xls】  ---> WealOnlinePrizeCfgInfo    **/ 
		public static  WealOnlinePrizeCfgInfo:string = "WealOnlinePrizeCfgInfo";
		 /**   【cs_weal.xls】  ---> WealGiftCfgInfo    **/ 
		public static  WealGiftCfgInfo:string = "WealGiftCfgInfo";
		 /**   【cs_weal.xls】  ---> WealResourceFindbackCfgInfo    **/ 
		public static  WealResourceFindbackCfgInfo:string = "WealResourceFindbackCfgInfo";
		 /**   【cs_convenant.xls】  ---> ConvenantConstCfgInfo    **/ 
		public static  ConvenantConstCfgInfo:string = "ConvenantConstCfgInfo";
		 /**   【cs_convenant.xls】  ---> ConvenantLevelCfgInfo    **/ 
		public static  ConvenantLevelCfgInfo:string = "ConvenantLevelCfgInfo";
		 /**   【cs_convenant.xls】  ---> ConvenantAttrCfgInfo    **/ 
		public static  ConvenantAttrCfgInfo:string = "ConvenantAttrCfgInfo";
		 /**   【cs_temple.xls】  ---> TempleCfgInfo    **/ 
		public static  TempleCfgInfo:string = "TempleCfgInfo";
		 /**   【cs_temple.xls】  ---> TempleEvolveCfgInfo    **/ 
		public static  TempleEvolveCfgInfo:string = "TempleEvolveCfgInfo";
		 /**   【cs_temple.xls】  ---> TempleIdCountCfgInfo    **/ 
		public static  TempleIdCountCfgInfo:string = "TempleIdCountCfgInfo";
		 /**   【cs_temple.xls】  ---> TempleMonsterNewCfgInfo    **/ 
		public static  TempleMonsterNewCfgInfo:string = "TempleMonsterNewCfgInfo";
		 /**   【cs_temple.xls】  ---> TempleLevelInfoCfgInfo    **/ 
		public static  TempleLevelInfoCfgInfo:string = "TempleLevelInfoCfgInfo";
		 /**   【effect.xls】  ---> EffectCfgInfo    **/ 
		public static  EffectCfgInfo:string = "EffectCfgInfo";
		 /**   【cs_challenge.xls】  ---> ChallengeRobotCfgInfo    **/ 
		public static  ChallengeRobotCfgInfo:string = "ChallengeRobotCfgInfo";
		 /**   【cs_challenge.xls】  ---> ChallengeDailyPrizeCfgInfo    **/ 
		public static  ChallengeDailyPrizeCfgInfo:string = "ChallengeDailyPrizeCfgInfo";
		 /**   【cs_challenge.xls】  ---> ChallengeWeekPrizeCfgInfo    **/ 
		public static  ChallengeWeekPrizeCfgInfo:string = "ChallengeWeekPrizeCfgInfo";
		 /**   【cs_challenge.xls】  ---> ChallengeConstInfoCfgInfo    **/ 
		public static  ChallengeConstInfoCfgInfo:string = "ChallengeConstInfoCfgInfo";
		 /**   【cs_challenge.xls】  ---> ChallengeWinPrizeCfgInfo    **/ 
		public static  ChallengeWinPrizeCfgInfo:string = "ChallengeWinPrizeCfgInfo";
		 /**   【cs_challenge.xls】  ---> ChallengeFailPrizeCfgInfo    **/ 
		public static  ChallengeFailPrizeCfgInfo:string = "ChallengeFailPrizeCfgInfo";
		 /**   【cs_challenge.xls】  ---> ChallengeSeasonPrizeCfgInfo    **/ 
		public static  ChallengeSeasonPrizeCfgInfo:string = "ChallengeSeasonPrizeCfgInfo";
		 /**   【cs_challenge.xls】  ---> ChallengeMonsterNewCfgInfo    **/ 
		public static  ChallengeMonsterNewCfgInfo:string = "ChallengeMonsterNewCfgInfo";
		 /**   【cs_god_equip.xls】  ---> GodEquipQualityCfgInfo    **/ 
		public static  GodEquipQualityCfgInfo:string = "GodEquipQualityCfgInfo";
		 /**   【cs_god_equip.xls】  ---> GodEquipRefineCfgInfo    **/ 
		public static  GodEquipRefineCfgInfo:string = "GodEquipRefineCfgInfo";
		 /**   【cs_god_equip.xls】  ---> GodEquipRefineRandCfgInfo    **/ 
		public static  GodEquipRefineRandCfgInfo:string = "GodEquipRefineRandCfgInfo";
		 /**   【cs_god_equip.xls】  ---> GodEquipRandattrCfgInfo    **/ 
		public static  GodEquipRandattrCfgInfo:string = "GodEquipRandattrCfgInfo";
		 /**   【cs_god_equip.xls】  ---> GodEquipSuitCfgInfo    **/ 
		public static  GodEquipSuitCfgInfo:string = "GodEquipSuitCfgInfo";
		 /**   【cs_god_equip.xls】  ---> GodEquipSuitMgrCfgInfo    **/ 
		public static  GodEquipSuitMgrCfgInfo:string = "GodEquipSuitMgrCfgInfo";
		 /**   【cs_activity.xls】  ---> ActivityCfgInfo    **/ 
		public static  ActivityCfgInfo:string = "ActivityCfgInfo";
		 /**   【cs_activity.xls】  ---> ActivityChargeAmountCfgInfo    **/ 
		public static  ActivityChargeAmountCfgInfo:string = "ActivityChargeAmountCfgInfo";
		 /**   【cs_activity.xls】  ---> ActivityChargeDaysCfgInfo    **/ 
		public static  ActivityChargeDaysCfgInfo:string = "ActivityChargeDaysCfgInfo";
		 /**   【cs_activity.xls】  ---> ActivityLevelupCfgInfo    **/ 
		public static  ActivityLevelupCfgInfo:string = "ActivityLevelupCfgInfo";
		 /**   【cs_activity.xls】  ---> ActivityTimesCfgInfo    **/ 
		public static  ActivityTimesCfgInfo:string = "ActivityTimesCfgInfo";
		 /**   【cs_activity.xls】  ---> ActivityExchangeCfgInfo    **/ 
		public static  ActivityExchangeCfgInfo:string = "ActivityExchangeCfgInfo";
		 /**   【cs_activity.xls】  ---> ActivityFirstChargeCfgInfo    **/ 
		public static  ActivityFirstChargeCfgInfo:string = "ActivityFirstChargeCfgInfo";
		 /**   【cs_activity.xls】  ---> ActivityGrowFundCfgInfo    **/ 
		public static  ActivityGrowFundCfgInfo:string = "ActivityGrowFundCfgInfo";
		 /**   【cs_activity.xls】  ---> ActivityFundCfgInfo    **/ 
		public static  ActivityFundCfgInfo:string = "ActivityFundCfgInfo";
		 /**   【cs_activity.xls】  ---> ActivityLoginCfgInfo    **/ 
		public static  ActivityLoginCfgInfo:string = "ActivityLoginCfgInfo";
		 /**   【cs_activity.xls】  ---> ActivityShortTermGiftCfgInfo    **/ 
		public static  ActivityShortTermGiftCfgInfo:string = "ActivityShortTermGiftCfgInfo";
		 /**   【cs_activity.xls】  ---> ActivityAchievementCfgInfo    **/ 
		public static  ActivityAchievementCfgInfo:string = "ActivityAchievementCfgInfo";
		 /**   【cs_activity.xls】  ---> ActivityRankCfgInfo    **/ 
		public static  ActivityRankCfgInfo:string = "ActivityRankCfgInfo";
		 /**   【cs_activity.xls】  ---> ActivityZeroBuyCfgInfo    **/ 
		public static  ActivityZeroBuyCfgInfo:string = "ActivityZeroBuyCfgInfo";
		 /**   【cs_activity.xls】  ---> ActivityLimitGiftCfgInfo    **/ 
		public static  ActivityLimitGiftCfgInfo:string = "ActivityLimitGiftCfgInfo";
		 /**   【cs_activity.xls】  ---> ActivityWeekendCfgInfo    **/ 
		public static  ActivityWeekendCfgInfo:string = "ActivityWeekendCfgInfo";
		 /**   【cs_activity.xls】  ---> ActivityAchieveRoadCfgInfo    **/ 
		public static  ActivityAchieveRoadCfgInfo:string = "ActivityAchieveRoadCfgInfo";
		 /**   【cs_activity.xls】  ---> ActivityLimitDayGiftCfgInfo    **/ 
		public static  ActivityLimitDayGiftCfgInfo:string = "ActivityLimitDayGiftCfgInfo";
		 /**   【cs_activity.xls】  ---> ActivityExchangeExCfgInfo    **/ 
		public static  ActivityExchangeExCfgInfo:string = "ActivityExchangeExCfgInfo";
		 /**   【cs_activity.xls】  ---> ActivityRedEnvelopeCfgInfo    **/ 
		public static  ActivityRedEnvelopeCfgInfo:string = "ActivityRedEnvelopeCfgInfo";
		 /**   【cs_activity.xls】  ---> ActivityRewardPoolCfgInfo    **/ 
		public static  ActivityRewardPoolCfgInfo:string = "ActivityRewardPoolCfgInfo";
		 /**   【cs_activity.xls】  ---> ActivityCommonGroupCfgInfo    **/ 
		public static  ActivityCommonGroupCfgInfo:string = "ActivityCommonGroupCfgInfo";
		 /**   【cs_activity.xls】  ---> ActivityCommonGroupPageCfgInfo    **/ 
		public static  ActivityCommonGroupPageCfgInfo:string = "ActivityCommonGroupPageCfgInfo";
		 /**   【cs_activity.xls】  ---> ActivityWarOrderLevelCfgInfo    **/ 
		public static  ActivityWarOrderLevelCfgInfo:string = "ActivityWarOrderLevelCfgInfo";
		 /**   【cs_resonance.xls】  ---> ResonanceGridCfgInfo    **/ 
		public static  ResonanceGridCfgInfo:string = "ResonanceGridCfgInfo";
		 /**   【cs_resonance.xls】  ---> ResonanceStarCfgInfo    **/ 
		public static  ResonanceStarCfgInfo:string = "ResonanceStarCfgInfo";
		 /**   【cs_resonance.xls】  ---> ResonanceCommonCfgInfo    **/ 
		public static  ResonanceCommonCfgInfo:string = "ResonanceCommonCfgInfo";
		 /**   【cs_common.xls】  ---> CommonChatCfgInfo    **/ 
		public static  CommonChatCfgInfo:string = "CommonChatCfgInfo";
		 /**   【cs_common.xls】  ---> CommonInvitePrizeCfgInfo    **/ 
		public static  CommonInvitePrizeCfgInfo:string = "CommonInvitePrizeCfgInfo";
		 /**   【cs_common.xls】  ---> CommonSurveyConstantsCfgInfo    **/ 
		public static  CommonSurveyConstantsCfgInfo:string = "CommonSurveyConstantsCfgInfo";
		 /**   【cs_common.xls】  ---> CommonSupportCfgInfo    **/ 
		public static  CommonSupportCfgInfo:string = "CommonSupportCfgInfo";
		 /**   【cs_shop.xls】  ---> ShopFixShopCfgInfo    **/ 
		public static  ShopFixShopCfgInfo:string = "ShopFixShopCfgInfo";
		 /**   【cs_shop.xls】  ---> ShopCurrencyTypeCfgInfo    **/ 
		public static  ShopCurrencyTypeCfgInfo:string = "ShopCurrencyTypeCfgInfo";
		 /**   【cs_shop.xls】  ---> ShopRandShopCfgInfo    **/ 
		public static  ShopRandShopCfgInfo:string = "ShopRandShopCfgInfo";
		 /**   【cs_shop.xls】  ---> ShopRandPoolCfgInfo    **/ 
		public static  ShopRandPoolCfgInfo:string = "ShopRandPoolCfgInfo";
		 /**   【cs_shop.xls】  ---> ShopLevelItemCfgInfo    **/ 
		public static  ShopLevelItemCfgInfo:string = "ShopLevelItemCfgInfo";
		 /**   【cs_skillEffect_new.xls】  ---> SkillEffectNewSkillEffectCfgInfo    **/ 
		public static  SkillEffectNewSkillEffectCfgInfo:string = "SkillEffectNewSkillEffectCfgInfo";
		 /**   【cs_activity_egg.xls】  ---> ActivityEggLuckyEggCfgInfo    **/ 
		public static  ActivityEggLuckyEggCfgInfo:string = "ActivityEggLuckyEggCfgInfo";
		 /**   【cs_defend.xls】  ---> DefendRankCfgInfo    **/ 
		public static  DefendRankCfgInfo:string = "DefendRankCfgInfo";
		 /**   【cs_defend.xls】  ---> DefendLevelCfgInfo    **/ 
		public static  DefendLevelCfgInfo:string = "DefendLevelCfgInfo";
		 /**   【cs_defend.xls】  ---> DefendSlotCfgInfo    **/ 
		public static  DefendSlotCfgInfo:string = "DefendSlotCfgInfo";
		 /**   【cs_defend.xls】  ---> DefendSkillCfgInfo    **/ 
		public static  DefendSkillCfgInfo:string = "DefendSkillCfgInfo";
		 /**   【cs_defend.xls】  ---> DefendPlanCfgInfo    **/ 
		public static  DefendPlanCfgInfo:string = "DefendPlanCfgInfo";
		 /**   【cs_stronger.xls】  ---> StrongerFunListCfgInfo    **/ 
		public static  StrongerFunListCfgInfo:string = "StrongerFunListCfgInfo";
		 /**   【cs_stronger.xls】  ---> StrongerCfgInfo    **/ 
		public static  StrongerCfgInfo:string = "StrongerCfgInfo";
		 /**   【cs_stronger.xls】  ---> StrongerResListTitleCfgInfo    **/ 
		public static  StrongerResListTitleCfgInfo:string = "StrongerResListTitleCfgInfo";
		 /**   【cs_stronger.xls】  ---> StrongerResListDetailCfgInfo    **/ 
		public static  StrongerResListDetailCfgInfo:string = "StrongerResListDetailCfgInfo";
		 /**   【cs_stronger.xls】  ---> StrongerPetCommandCfgInfo    **/ 
		public static  StrongerPetCommandCfgInfo:string = "StrongerPetCommandCfgInfo";
		 /**   【cs_stronger.xls】  ---> StrongerQuestionCfgInfo    **/ 
		public static  StrongerQuestionCfgInfo:string = "StrongerQuestionCfgInfo";
		 /**   【cs_buff_new.xls】  ---> BuffNewBuffCfgInfo    **/ 
		public static  BuffNewBuffCfgInfo:string = "BuffNewBuffCfgInfo";
		 /**   【cs_buff_new.xls】  ---> BuffNewBuffGroupCfgInfo    **/ 
		public static  BuffNewBuffGroupCfgInfo:string = "BuffNewBuffGroupCfgInfo";
		 /**   【cs_buff_new.xls】  ---> BuffNewBuffStateCfgInfo    **/ 
		public static  BuffNewBuffStateCfgInfo:string = "BuffNewBuffStateCfgInfo";
		 /**   【cs_illustration.xls】  ---> IllustrationTrammelCfgInfo    **/ 
		public static  IllustrationTrammelCfgInfo:string = "IllustrationTrammelCfgInfo";
		 /**   【cs_illustration.xls】  ---> IllustrationAchieveCfgInfo    **/ 
		public static  IllustrationAchieveCfgInfo:string = "IllustrationAchieveCfgInfo";
		 /**   【cs_illustration.xls】  ---> IllustrationPowerCfgInfo    **/ 
		public static  IllustrationPowerCfgInfo:string = "IllustrationPowerCfgInfo";
		 /**   【cs_dragon_ball.xls】  ---> DragonBallLevelCfgInfo    **/ 
		public static  DragonBallLevelCfgInfo:string = "DragonBallLevelCfgInfo";
		 /**   【cs_dragon_ball.xls】  ---> DragonBallUnlockCfgInfo    **/ 
		public static  DragonBallUnlockCfgInfo:string = "DragonBallUnlockCfgInfo";
		 /**   【c_broad_cast.xls】  ---> BroadCastCastMsgCfgInfo    **/ 
		public static  BroadCastCastMsgCfgInfo:string = "BroadCastCastMsgCfgInfo";
		 /**   【c_broad_cast.xls】  ---> BroadCastTimeMsgCfgInfo    **/ 
		public static  BroadCastTimeMsgCfgInfo:string = "BroadCastTimeMsgCfgInfo";
		 /**   【guide.xls】  ---> GuideCfgInfo    **/ 
		public static  GuideCfgInfo:string = "GuideCfgInfo";
		 /**   【cs_pet.xls】  ---> PetCfgInfo    **/ 
		public static  PetCfgInfo:string = "PetCfgInfo";
		 /**   【cs_pet.xls】  ---> PetUpgradeCfgInfo    **/ 
		public static  PetUpgradeCfgInfo:string = "PetUpgradeCfgInfo";
		 /**   【cs_pet.xls】  ---> PetAdvanceCfgInfo    **/ 
		public static  PetAdvanceCfgInfo:string = "PetAdvanceCfgInfo";
		 /**   【cs_pet.xls】  ---> PetUpsartSkillCfgInfo    **/ 
		public static  PetUpsartSkillCfgInfo:string = "PetUpsartSkillCfgInfo";
		 /**   【cs_pet.xls】  ---> PetUpStarCfgInfo    **/ 
		public static  PetUpStarCfgInfo:string = "PetUpStarCfgInfo";
		 /**   【cs_pet.xls】  ---> PetFormationCfgInfo    **/ 
		public static  PetFormationCfgInfo:string = "PetFormationCfgInfo";
		 /**   【cs_pet.xls】  ---> PetFormationTypeCfgInfo    **/ 
		public static  PetFormationTypeCfgInfo:string = "PetFormationTypeCfgInfo";
		 /**   【cs_pet.xls】  ---> PetRunePosCfgInfo    **/ 
		public static  PetRunePosCfgInfo:string = "PetRunePosCfgInfo";
		 /**   【cs_pet.xls】  ---> PetTalentPosCfgInfo    **/ 
		public static  PetTalentPosCfgInfo:string = "PetTalentPosCfgInfo";
		 /**   【cs_pet.xls】  ---> PetBuyBagCfgInfo    **/ 
		public static  PetBuyBagCfgInfo:string = "PetBuyBagCfgInfo";
		 /**   【cs_pet.xls】  ---> PetStarScoreCfgInfo    **/ 
		public static  PetStarScoreCfgInfo:string = "PetStarScoreCfgInfo";
		 /**   【cs_pet.xls】  ---> PetBookCfgInfo    **/ 
		public static  PetBookCfgInfo:string = "PetBookCfgInfo";
		 /**   【cs_pet.xls】  ---> PetReplaceCfgInfo    **/ 
		public static  PetReplaceCfgInfo:string = "PetReplaceCfgInfo";
		 /**   【cs_pet.xls】  ---> PetDegenerateCostCfgInfo    **/ 
		public static  PetDegenerateCostCfgInfo:string = "PetDegenerateCostCfgInfo";
		 /**   【cs_pet.xls】  ---> PetDegenerateSubstitudeCfgInfo    **/ 
		public static  PetDegenerateSubstitudeCfgInfo:string = "PetDegenerateSubstitudeCfgInfo";
		 /**   【cs_pet.xls】  ---> PetRebornCostCfgInfo    **/ 
		public static  PetRebornCostCfgInfo:string = "PetRebornCostCfgInfo";
		 /**   【cs_pet.xls】  ---> PetStarExpCfgInfo    **/ 
		public static  PetStarExpCfgInfo:string = "PetStarExpCfgInfo";
		 /**   【cs_pet.xls】  ---> PetHighstarRebornCfgInfo    **/ 
		public static  PetHighstarRebornCfgInfo:string = "PetHighstarRebornCfgInfo";
		 /**   【cs_pet.xls】  ---> PetEvolveCfgInfo    **/ 
		public static  PetEvolveCfgInfo:string = "PetEvolveCfgInfo";
		 /**   【cs_pet.xls】  ---> PetMasterMatchCfgInfo    **/ 
		public static  PetMasterMatchCfgInfo:string = "PetMasterMatchCfgInfo";
		 /**   【cs_week_champion.xls】  ---> WeekChampionConstInfoCfgInfo    **/ 
		public static  WeekChampionConstInfoCfgInfo:string = "WeekChampionConstInfoCfgInfo";
		 /**   【cs_week_champion.xls】  ---> WeekChampionTopPrizeCfgInfo    **/ 
		public static  WeekChampionTopPrizeCfgInfo:string = "WeekChampionTopPrizeCfgInfo";
		 /**   【cs_week_champion.xls】  ---> WeekChampionLadderRankIntegralCfgInfo    **/ 
		public static  WeekChampionLadderRankIntegralCfgInfo:string = "WeekChampionLadderRankIntegralCfgInfo";
		 /**   【cs_week_champion.xls】  ---> WeekChampionRoundCfgInfo    **/ 
		public static  WeekChampionRoundCfgInfo:string = "WeekChampionRoundCfgInfo";
		 /**   【cs_dip.xls】  ---> DipCfgInfo    **/ 
		public static  DipCfgInfo:string = "DipCfgInfo";
		 /**   【c_error_code.xls】  ---> ErrorCodeErrorCodeCfgInfo    **/ 
		public static  ErrorCodeErrorCodeCfgInfo:string = "ErrorCodeErrorCodeCfgInfo";
		 /**   【cs_element.xls】  ---> ElementStageCfgInfo    **/ 
		public static  ElementStageCfgInfo:string = "ElementStageCfgInfo";
		 /**   【cs_element.xls】  ---> ElementBuyCountCfgInfo    **/ 
		public static  ElementBuyCountCfgInfo:string = "ElementBuyCountCfgInfo";
		 /**   【cs_element.xls】  ---> ElementOpentimeCfgInfo    **/ 
		public static  ElementOpentimeCfgInfo:string = "ElementOpentimeCfgInfo";
		 /**   【cs_element.xls】  ---> ElementMonsterNewCfgInfo    **/ 
		public static  ElementMonsterNewCfgInfo:string = "ElementMonsterNewCfgInfo";
		 /**   【cs_family_build.xls】  ---> FamilyBuildBuildCfgInfo    **/ 
		public static  FamilyBuildBuildCfgInfo:string = "FamilyBuildBuildCfgInfo";
		 /**   【cs_player_name.xls】  ---> PlayerNameNameCfgInfo    **/ 
		public static  PlayerNameNameCfgInfo:string = "PlayerNameNameCfgInfo";
		 /**   【cs_skill_new.xls】  ---> SkillNewSkillCfgInfo    **/ 
		public static  SkillNewSkillCfgInfo:string = "SkillNewSkillCfgInfo";
		 /**   【cs_skill_new.xls】  ---> SkillNewRaceDamagaCfgInfo    **/ 
		public static  SkillNewRaceDamagaCfgInfo:string = "SkillNewRaceDamagaCfgInfo";
		 /**   【cs_skill_new.xls】  ---> SkillNewTalentUpgradeCfgInfo    **/ 
		public static  SkillNewTalentUpgradeCfgInfo:string = "SkillNewTalentUpgradeCfgInfo";
		 /**   【cs_skill_new.xls】  ---> SkillNewRecommendTalentCfgInfo    **/ 
		public static  SkillNewRecommendTalentCfgInfo:string = "SkillNewRecommendTalentCfgInfo";
		 /**   【cs_skill_new.xls】  ---> SkillNewSpecialSkillDelayCfgInfo    **/ 
		public static  SkillNewSpecialSkillDelayCfgInfo:string = "SkillNewSpecialSkillDelayCfgInfo";
		 /**   【cs_dan.xls】  ---> DanConstCfgInfo    **/ 
		public static  DanConstCfgInfo:string = "DanConstCfgInfo";
		 /**   【cs_dan.xls】  ---> DanUpgradeCfgInfo    **/ 
		public static  DanUpgradeCfgInfo:string = "DanUpgradeCfgInfo";
		 /**   【cs_dan.xls】  ---> DanBuyCountCfgInfo    **/ 
		public static  DanBuyCountCfgInfo:string = "DanBuyCountCfgInfo";
		 /**   【cs_dan.xls】  ---> DanFightPrizeCfgInfo    **/ 
		public static  DanFightPrizeCfgInfo:string = "DanFightPrizeCfgInfo";
		 /**   【cs_dan.xls】  ---> DanAreaCfgInfo    **/ 
		public static  DanAreaCfgInfo:string = "DanAreaCfgInfo";
		 /**   【cs_dan.xls】  ---> DanTopPrizeCfgInfo    **/ 
		public static  DanTopPrizeCfgInfo:string = "DanTopPrizeCfgInfo";
		 /**   【resPreload.xls】  ---> ResPreloadCfgInfo    **/ 
		public static  ResPreloadCfgInfo:string = "ResPreloadCfgInfo";
		 /**   【cs_expedition.xls】  ---> ExpeditionStageCfgInfo    **/ 
		public static  ExpeditionStageCfgInfo:string = "ExpeditionStageCfgInfo";
		 /**   【cs_expedition.xls】  ---> ExpeditionRobotCfgInfo    **/ 
		public static  ExpeditionRobotCfgInfo:string = "ExpeditionRobotCfgInfo";
		 /**   【cs_expedition.xls】  ---> ExpeditionStageTypeCfgInfo    **/ 
		public static  ExpeditionStageTypeCfgInfo:string = "ExpeditionStageTypeCfgInfo";
		 /**   【cs_expedition.xls】  ---> ExpeditionMonsterNewCfgInfo    **/ 
		public static  ExpeditionMonsterNewCfgInfo:string = "ExpeditionMonsterNewCfgInfo";
		 /**   【cs_activity_custom.xls】  ---> ActivityCustomInCfgInfo    **/ 
		public static  ActivityCustomInCfgInfo:string = "ActivityCustomInCfgInfo";
		 /**   【cs_cross_challenge.xls】  ---> CrossChallengeConstantsCfgInfo    **/ 
		public static  CrossChallengeConstantsCfgInfo:string = "CrossChallengeConstantsCfgInfo";
		 /**   【cs_cross_challenge.xls】  ---> CrossChallengeRobotCfgInfo    **/ 
		public static  CrossChallengeRobotCfgInfo:string = "CrossChallengeRobotCfgInfo";
		 /**   【cs_cross_challenge.xls】  ---> CrossChallengeDailyPrizeCfgInfo    **/ 
		public static  CrossChallengeDailyPrizeCfgInfo:string = "CrossChallengeDailyPrizeCfgInfo";
		 /**   【cs_cross_challenge.xls】  ---> CrossChallengeWinPrizeCfgInfo    **/ 
		public static  CrossChallengeWinPrizeCfgInfo:string = "CrossChallengeWinPrizeCfgInfo";
		 /**   【cs_cross_challenge.xls】  ---> CrossChallengeLosePrizeCfgInfo    **/ 
		public static  CrossChallengeLosePrizeCfgInfo:string = "CrossChallengeLosePrizeCfgInfo";
		 /**   【cs_cross_challenge.xls】  ---> CrossChallengeTopPrizeCfgInfo    **/ 
		public static  CrossChallengeTopPrizeCfgInfo:string = "CrossChallengeTopPrizeCfgInfo";
		 /**   【cs_cross_challenge.xls】  ---> CrossChallengeMonsterNewCfgInfo    **/ 
		public static  CrossChallengeMonsterNewCfgInfo:string = "CrossChallengeMonsterNewCfgInfo";
		 /**   【cs_lottery.xls】  ---> LotteryTypeCfgInfo    **/ 
		public static  LotteryTypeCfgInfo:string = "LotteryTypeCfgInfo";
		 /**   【cs_lottery.xls】  ---> LotteryCostCfgInfo    **/ 
		public static  LotteryCostCfgInfo:string = "LotteryCostCfgInfo";
		 /**   【cs_lottery.xls】  ---> LotteryHuntCfgInfo    **/ 
		public static  LotteryHuntCfgInfo:string = "LotteryHuntCfgInfo";
		 /**   【cs_lottery.xls】  ---> LotteryPoolCfgInfo    **/ 
		public static  LotteryPoolCfgInfo:string = "LotteryPoolCfgInfo";
		 /**   【cs_risk.xls】  ---> RiskGuardCfgInfo    **/ 
		public static  RiskGuardCfgInfo:string = "RiskGuardCfgInfo";
		 /**   【cs_risk.xls】  ---> RiskRefreshCfgInfo    **/ 
		public static  RiskRefreshCfgInfo:string = "RiskRefreshCfgInfo";
		 /**   【cs_risk.xls】  ---> RiskShopCfgInfo    **/ 
		public static  RiskShopCfgInfo:string = "RiskShopCfgInfo";
		 /**   【cs_risk.xls】  ---> RiskGridOpenCfgInfo    **/ 
		public static  RiskGridOpenCfgInfo:string = "RiskGridOpenCfgInfo";
		 /**   【cs_risk.xls】  ---> RiskGuardPrizeCfgInfo    **/ 
		public static  RiskGuardPrizeCfgInfo:string = "RiskGuardPrizeCfgInfo";
		 /**   【cs_risk.xls】  ---> RiskCollectPrizeCfgInfo    **/ 
		public static  RiskCollectPrizeCfgInfo:string = "RiskCollectPrizeCfgInfo";
		 /**   【cs_risk.xls】  ---> RiskCollectRandprizeCfgInfo    **/ 
		public static  RiskCollectRandprizeCfgInfo:string = "RiskCollectRandprizeCfgInfo";
		 /**   【cs_risk.xls】  ---> RiskFingerResultCfgInfo    **/ 
		public static  RiskFingerResultCfgInfo:string = "RiskFingerResultCfgInfo";
		 /**   【cs_risk.xls】  ---> RiskFingerPrizeCfgInfo    **/ 
		public static  RiskFingerPrizeCfgInfo:string = "RiskFingerPrizeCfgInfo";
		 /**   【cs_risk.xls】  ---> RiskQuestionCfgInfo    **/ 
		public static  RiskQuestionCfgInfo:string = "RiskQuestionCfgInfo";
		 /**   【cs_risk.xls】  ---> RiskDialogCfgInfo    **/ 
		public static  RiskDialogCfgInfo:string = "RiskDialogCfgInfo";
		 /**   【cs_risk.xls】  ---> RiskEventCfgInfo    **/ 
		public static  RiskEventCfgInfo:string = "RiskEventCfgInfo";
		 /**   【cs_risk.xls】  ---> RiskCollectSkillCfgInfo    **/ 
		public static  RiskCollectSkillCfgInfo:string = "RiskCollectSkillCfgInfo";
		 /**   【cs_risk.xls】  ---> RiskMonsterNewCfgInfo    **/ 
		public static  RiskMonsterNewCfgInfo:string = "RiskMonsterNewCfgInfo";
		 /**   【numberSystem.xls】  ---> NumberSystemCfgInfo    **/ 
		public static  NumberSystemCfgInfo:string = "NumberSystemCfgInfo";
		 /**   【sound.xls】  ---> SoundCfgInfo    **/ 
		public static  SoundCfgInfo:string = "SoundCfgInfo";
		 /**   【cs_drop.xls】  ---> DropDropGroupCfgInfo    **/ 
		public static  DropDropGroupCfgInfo:string = "DropDropGroupCfgInfo";
		 /**   【cs_drop.xls】  ---> DropDropCfgInfo    **/ 
		public static  DropDropCfgInfo:string = "DropDropCfgInfo";
		 /**   【cs_compensate.xls】  ---> CompensateMailCfgInfo    **/ 
		public static  CompensateMailCfgInfo:string = "CompensateMailCfgInfo";
		 /**   【cs_compensate.xls】  ---> CompensatePetCompensateCfgInfo    **/ 
		public static  CompensatePetCompensateCfgInfo:string = "CompensatePetCompensateCfgInfo";
		 /**   【cs_compensate.xls】  ---> CompensateAddpetCompensateCfgInfo    **/ 
		public static  CompensateAddpetCompensateCfgInfo:string = "CompensateAddpetCompensateCfgInfo";
		 /**   【cs_compensate.xls】  ---> CompensateItemExchangeCfgInfo    **/ 
		public static  CompensateItemExchangeCfgInfo:string = "CompensateItemExchangeCfgInfo";
		 /**   【cs_compensate.xls】  ---> CompensatePlayerRankCfgInfo    **/ 
		public static  CompensatePlayerRankCfgInfo:string = "CompensatePlayerRankCfgInfo";
		 /**   【cs_tablet.xls】  ---> TabletConstantsCfgInfo    **/ 
		public static  TabletConstantsCfgInfo:string = "TabletConstantsCfgInfo";
		 /**   【cs_tablet.xls】  ---> TabletMagicJuiceCfgInfo    **/ 
		public static  TabletMagicJuiceCfgInfo:string = "TabletMagicJuiceCfgInfo";
		 /**   【cs_tablet.xls】  ---> TabletCfgInfo    **/ 
		public static  TabletCfgInfo:string = "TabletCfgInfo";
		 /**   【cs_tablet.xls】  ---> TabletStarAdditionCfgInfo    **/ 
		public static  TabletStarAdditionCfgInfo:string = "TabletStarAdditionCfgInfo";
		 /**   【cs_tablet.xls】  ---> TabletCreationCfgInfo    **/ 
		public static  TabletCreationCfgInfo:string = "TabletCreationCfgInfo";
		 /**   【cs_pet_call.xls】  ---> PetCallCallCfgInfo    **/ 
		public static  PetCallCallCfgInfo:string = "PetCallCallCfgInfo";
		 /**   【cs_pet_call.xls】  ---> PetCallCallCostCfgInfo    **/ 
		public static  PetCallCallCostCfgInfo:string = "PetCallCallCostCfgInfo";
		 /**   【cs_pet_call.xls】  ---> PetCallCommonPoolCfgInfo    **/ 
		public static  PetCallCommonPoolCfgInfo:string = "PetCallCommonPoolCfgInfo";
		 /**   【cs_pet_call.xls】  ---> PetCallCallPoolCfgInfo    **/ 
		public static  PetCallCallPoolCfgInfo:string = "PetCallCallPoolCfgInfo";
		 /**   【cs_pet_call.xls】  ---> PetCallChangeCfgInfo    **/ 
		public static  PetCallChangeCfgInfo:string = "PetCallChangeCfgInfo";
		 /**   【cs_pet_call.xls】  ---> PetCallFixChangeCfgInfo    **/ 
		public static  PetCallFixChangeCfgInfo:string = "PetCallFixChangeCfgInfo";
		 /**   【cs_pet_call.xls】  ---> PetCallChangePoolCfgInfo    **/ 
		public static  PetCallChangePoolCfgInfo:string = "PetCallChangePoolCfgInfo";
		 /**   【cs_pet_call.xls】  ---> PetCallSpecailPoolCfgInfo    **/ 
		public static  PetCallSpecailPoolCfgInfo:string = "PetCallSpecailPoolCfgInfo";
		 /**   【textConfig.xls】  ---> TextConfigCfgInfo    **/ 
		public static  TextConfigCfgInfo:string = "TextConfigCfgInfo";
		 /**   【cs_incubate.xls】  ---> IncubateConstCfgInfo    **/ 
		public static  IncubateConstCfgInfo:string = "IncubateConstCfgInfo";
		 /**   【cs_incubate.xls】  ---> IncubatePetEggCfgInfo    **/ 
		public static  IncubatePetEggCfgInfo:string = "IncubatePetEggCfgInfo";
		 /**   【cs_incubate.xls】  ---> IncubateSpeedUpCfgInfo    **/ 
		public static  IncubateSpeedUpCfgInfo:string = "IncubateSpeedUpCfgInfo";
		 /**   【cs_room.xls】  ---> RoomFurnitureCfgInfo    **/ 
		public static  RoomFurnitureCfgInfo:string = "RoomFurnitureCfgInfo";
		 /**   【cs_prize.xls】  ---> PrizeCfgInfo    **/ 
		public static  PrizeCfgInfo:string = "PrizeCfgInfo";
		 /**   【cs_prize.xls】  ---> PrizeFriendPrizeCfgInfo    **/ 
		public static  PrizeFriendPrizeCfgInfo:string = "PrizeFriendPrizeCfgInfo";
		 /**   【cs_prize.xls】  ---> PrizeCommonPrizeCfgInfo    **/ 
		public static  PrizeCommonPrizeCfgInfo:string = "PrizeCommonPrizeCfgInfo";
		 /**   【c_uiRoleSay.xls】  ---> UiRoleSayCfgInfo    **/ 
		public static  UiRoleSayCfgInfo:string = "UiRoleSayCfgInfo";

		public static setup():void
		{
			ConfigClassRegister.regClass("ActivitybossConstantCfgInfo", cfg.ActivitybossConstantCfgInfo);
			ConfigClassRegister.regClass("ActivitybossMonsterNewCfgInfo", cfg.ActivitybossMonsterNewCfgInfo);
			ConfigClassRegister.regClass("ActivitybossBuyCountCfgInfo", cfg.ActivitybossBuyCountCfgInfo);
			ConfigClassRegister.regClass("CopymapCfgInfo", cfg.CopymapCfgInfo);
			ConfigClassRegister.regClass("CopymapMonsterNewCfgInfo", cfg.CopymapMonsterNewCfgInfo);
			ConfigClassRegister.regClass("QuestionCfgInfo", cfg.QuestionCfgInfo);
			ConfigClassRegister.regClass("SailRefreshCfgInfo", cfg.SailRefreshCfgInfo);
			ConfigClassRegister.regClass("SailPoolCfgInfo", cfg.SailPoolCfgInfo);
			ConfigClassRegister.regClass("SailTypeCfgInfo", cfg.SailTypeCfgInfo);
			ConfigClassRegister.regClass("SailBuyhourCfgInfo", cfg.SailBuyhourCfgInfo);
			ConfigClassRegister.regClass("UiconfigUibgCfgInfo", cfg.UiconfigUibgCfgInfo);
			ConfigClassRegister.regClass("UiconfigUiopenCfgInfo", cfg.UiconfigUiopenCfgInfo);
			ConfigClassRegister.regClass("GuessCfgInfo", cfg.GuessCfgInfo);
			ConfigClassRegister.regClass("GuessShowRewardCfgInfo", cfg.GuessShowRewardCfgInfo);
			ConfigClassRegister.regClass("SystemSwitchSystemSwitchCfgInfo", cfg.SystemSwitchSystemSwitchCfgInfo);
			ConfigClassRegister.regClass("SystemSwitchSystemGroupCfgInfo", cfg.SystemSwitchSystemGroupCfgInfo);
			ConfigClassRegister.regClass("HelpSpriteCfgInfo", cfg.HelpSpriteCfgInfo);
			ConfigClassRegister.regClass("TreasureHuntTypeCfgInfo", cfg.TreasureHuntTypeCfgInfo);
			ConfigClassRegister.regClass("TreasureCostCfgInfo", cfg.TreasureCostCfgInfo);
			ConfigClassRegister.regClass("TreasurePoolCfgInfo", cfg.TreasurePoolCfgInfo);
			ConfigClassRegister.regClass("TreasureHuntCfgInfo", cfg.TreasureHuntCfgInfo);
			ConfigClassRegister.regClass("TreasureLuckyRewardCfgInfo", cfg.TreasureLuckyRewardCfgInfo);
			ConfigClassRegister.regClass("ChampionConstInfoCfgInfo", cfg.ChampionConstInfoCfgInfo);
			ConfigClassRegister.regClass("ChampionTopPrizeCfgInfo", cfg.ChampionTopPrizeCfgInfo);
			ConfigClassRegister.regClass("ChampionRoundCfgInfo", cfg.ChampionRoundCfgInfo);
			ConfigClassRegister.regClass("FactionNameNameCfgInfo", cfg.FactionNameNameCfgInfo);
			ConfigClassRegister.regClass("HookSceneCfgInfo", cfg.HookSceneCfgInfo);
			ConfigClassRegister.regClass("HookStageCfgInfo", cfg.HookStageCfgInfo);
			ConfigClassRegister.regClass("HookStagePrizeCfgInfo", cfg.HookStagePrizeCfgInfo);
			ConfigClassRegister.regClass("HookBuySweepcountCfgInfo", cfg.HookBuySweepcountCfgInfo);
			ConfigClassRegister.regClass("HookActivityDropCfgInfo", cfg.HookActivityDropCfgInfo);
			ConfigClassRegister.regClass("HookBossDropInfoCfgInfo", cfg.HookBossDropInfoCfgInfo);
			ConfigClassRegister.regClass("HookNormalDropInfoCfgInfo", cfg.HookNormalDropInfoCfgInfo);
			ConfigClassRegister.regClass("HookChapterUnlockCfgInfo", cfg.HookChapterUnlockCfgInfo);
			ConfigClassRegister.regClass("HookMonsterNewCfgInfo", cfg.HookMonsterNewCfgInfo);
			ConfigClassRegister.regClass("MailCfgInfo", cfg.MailCfgInfo);
			ConfigClassRegister.regClass("ItemCfgInfo", cfg.ItemCfgInfo);
			ConfigClassRegister.regClass("ItemPackCfgInfo", cfg.ItemPackCfgInfo);
			ConfigClassRegister.regClass("ItemCompoundCfgInfo", cfg.ItemCompoundCfgInfo);
			ConfigClassRegister.regClass("ItemPetcountCompoundCfgInfo", cfg.ItemPetcountCompoundCfgInfo);
			ConfigClassRegister.regClass("ItemPettypeRandCfgInfo", cfg.ItemPettypeRandCfgInfo);
			ConfigClassRegister.regClass("ItemPetidRandCfgInfo", cfg.ItemPetidRandCfgInfo);
			ConfigClassRegister.regClass("ItemPetSplitCfgInfo", cfg.ItemPetSplitCfgInfo);
			ConfigClassRegister.regClass("ItemEquipSuitCfgInfo", cfg.ItemEquipSuitCfgInfo);
			ConfigClassRegister.regClass("ItemGiftPackCfgInfo", cfg.ItemGiftPackCfgInfo);
			ConfigClassRegister.regClass("PetSkinCfgInfo", cfg.PetSkinCfgInfo);
			ConfigClassRegister.regClass("ToplistCfgInfo", cfg.ToplistCfgInfo);
			ConfigClassRegister.regClass("ToplistRewardCfgInfo", cfg.ToplistRewardCfgInfo);
			ConfigClassRegister.regClass("ToplistHeroScoreCfgInfo", cfg.ToplistHeroScoreCfgInfo);
			ConfigClassRegister.regClass("ToplistPieceScoreCfgInfo", cfg.ToplistPieceScoreCfgInfo);
			ConfigClassRegister.regClass("ToplistChargeScoreCfgInfo", cfg.ToplistChargeScoreCfgInfo);
			ConfigClassRegister.regClass("ToplistUpstarScoreCfgInfo", cfg.ToplistUpstarScoreCfgInfo);
			ConfigClassRegister.regClass("LadderConstInfoCfgInfo", cfg.LadderConstInfoCfgInfo);
			ConfigClassRegister.regClass("LadderRobotCfgInfo", cfg.LadderRobotCfgInfo);
			ConfigClassRegister.regClass("LadderTopPrizeCfgInfo", cfg.LadderTopPrizeCfgInfo);
			ConfigClassRegister.regClass("LadderBuyCountCfgInfo", cfg.LadderBuyCountCfgInfo);
			ConfigClassRegister.regClass("LadderMonsterNewCfgInfo", cfg.LadderMonsterNewCfgInfo);
			ConfigClassRegister.regClass("ConstantCfgInfo", cfg.ConstantCfgInfo);
			ConfigClassRegister.regClass("ConstantClientConstantCfgInfo", cfg.ConstantClientConstantCfgInfo);
			ConfigClassRegister.regClass("ConstantGamesPrizePreviewCfgInfo", cfg.ConstantGamesPrizePreviewCfgInfo);
			ConfigClassRegister.regClass("ChargeCfgInfo", cfg.ChargeCfgInfo);
			ConfigClassRegister.regClass("JoyousLinkupJoyousLinkupCfgInfo", cfg.JoyousLinkupJoyousLinkupCfgInfo);
			ConfigClassRegister.regClass("JoyousLinkupStageCfgInfo", cfg.JoyousLinkupStageCfgInfo);
			ConfigClassRegister.regClass("JoyousLinkupJoyousLinkupChessCfgInfo", cfg.JoyousLinkupJoyousLinkupChessCfgInfo);
			ConfigClassRegister.regClass("ArtifactCfgInfo", cfg.ArtifactCfgInfo);
			ConfigClassRegister.regClass("ArtifactActiveCfgInfo", cfg.ArtifactActiveCfgInfo);
			ConfigClassRegister.regClass("ArtifactUpgradeCfgInfo", cfg.ArtifactUpgradeCfgInfo);
			ConfigClassRegister.regClass("ArtifactSkillUpgradeCfgInfo", cfg.ArtifactSkillUpgradeCfgInfo);
			ConfigClassRegister.regClass("ArtifactYlactiveCfgInfo", cfg.ArtifactYlactiveCfgInfo);
			ConfigClassRegister.regClass("ArtifactYlstagerewardCfgInfo", cfg.ArtifactYlstagerewardCfgInfo);
			ConfigClassRegister.regClass("ArtifactConstCfgInfo", cfg.ArtifactConstCfgInfo);
			ConfigClassRegister.regClass("ShapeTitleCfgInfo", cfg.ShapeTitleCfgInfo);
			ConfigClassRegister.regClass("ShapeProvinceCfgInfo", cfg.ShapeProvinceCfgInfo);
			ConfigClassRegister.regClass("ShapeHeadIconCfgInfo", cfg.ShapeHeadIconCfgInfo);
			ConfigClassRegister.regClass("ShapePetSkinCfgInfo", cfg.ShapePetSkinCfgInfo);
			ConfigClassRegister.regClass("ShapeBadgeCfgInfo", cfg.ShapeBadgeCfgInfo);
			ConfigClassRegister.regClass("ShapeHonorUpgradeCfgInfo", cfg.ShapeHonorUpgradeCfgInfo);
			ConfigClassRegister.regClass("PrivilegeVipCfgInfo", cfg.PrivilegeVipCfgInfo);
			ConfigClassRegister.regClass("PrivilegeCfgInfo", cfg.PrivilegeCfgInfo);
			ConfigClassRegister.regClass("PrivilegeShopCfgInfo", cfg.PrivilegeShopCfgInfo);
			ConfigClassRegister.regClass("PrivilegeDailyPrizeCfgInfo", cfg.PrivilegeDailyPrizeCfgInfo);
			ConfigClassRegister.regClass("PrivilegeCardCfgInfo", cfg.PrivilegeCardCfgInfo);
			ConfigClassRegister.regClass("PrivilegeDailyFirstChargeCfgInfo", cfg.PrivilegeDailyFirstChargeCfgInfo);
			ConfigClassRegister.regClass("PlayerLevelCfgInfo", cfg.PlayerLevelCfgInfo);
			ConfigClassRegister.regClass("CustomGiftCfgInfo", cfg.CustomGiftCfgInfo);
			ConfigClassRegister.regClass("CustomGiftGiftpoolCfgInfo", cfg.CustomGiftGiftpoolCfgInfo);
			ConfigClassRegister.regClass("FactionUpgradeCfgInfo", cfg.FactionUpgradeCfgInfo);
			ConfigClassRegister.regClass("FactionDonatePrizeCfgInfo", cfg.FactionDonatePrizeCfgInfo);
			ConfigClassRegister.regClass("FactionDonateCfgInfo", cfg.FactionDonateCfgInfo);
			ConfigClassRegister.regClass("FactionLivenessCfgInfo", cfg.FactionLivenessCfgInfo);
			ConfigClassRegister.regClass("FactionSkillCfgInfo", cfg.FactionSkillCfgInfo);
			ConfigClassRegister.regClass("FactionSkillUpgradeCfgInfo", cfg.FactionSkillUpgradeCfgInfo);
			ConfigClassRegister.regClass("FactionSkillResetCfgInfo", cfg.FactionSkillResetCfgInfo);
			ConfigClassRegister.regClass("FactionCopymapCfgInfo", cfg.FactionCopymapCfgInfo);
			ConfigClassRegister.regClass("FactionCopymapBuycountCfgInfo", cfg.FactionCopymapBuycountCfgInfo);
			ConfigClassRegister.regClass("FactionCopymapTopprizeCfgInfo", cfg.FactionCopymapTopprizeCfgInfo);
			ConfigClassRegister.regClass("FactionMonsterNewCfgInfo", cfg.FactionMonsterNewCfgInfo);
			ConfigClassRegister.regClass("FactionImpeachTimeCfgInfo", cfg.FactionImpeachTimeCfgInfo);
			ConfigClassRegister.regClass("RuneCompoundCfgInfo", cfg.RuneCompoundCfgInfo);
			ConfigClassRegister.regClass("RuneRefineCfgInfo", cfg.RuneRefineCfgInfo);
			ConfigClassRegister.regClass("RuneRandattrCfgInfo", cfg.RuneRandattrCfgInfo);
			ConfigClassRegister.regClass("RuneRandskillCfgInfo", cfg.RuneRandskillCfgInfo);
			ConfigClassRegister.regClass("RuneFixedCfgInfo", cfg.RuneFixedCfgInfo);
			ConfigClassRegister.regClass("FactionWarConstCfgInfo", cfg.FactionWarConstCfgInfo);
			ConfigClassRegister.regClass("FactionWarFightPrizeCfgInfo", cfg.FactionWarFightPrizeCfgInfo);
			ConfigClassRegister.regClass("FactionWarBoxPrizeCfgInfo", cfg.FactionWarBoxPrizeCfgInfo);
			ConfigClassRegister.regClass("FactionWarTopPrizeCfgInfo", cfg.FactionWarTopPrizeCfgInfo);
			ConfigClassRegister.regClass("HorcruxConstCfgInfo", cfg.HorcruxConstCfgInfo);
			ConfigClassRegister.regClass("HorcruxCfgInfo", cfg.HorcruxCfgInfo);
			ConfigClassRegister.regClass("HorcruxPropCfgInfo", cfg.HorcruxPropCfgInfo);
			ConfigClassRegister.regClass("HolyUpgradeCfgInfo", cfg.HolyUpgradeCfgInfo);
			ConfigClassRegister.regClass("HolyAdvanceCfgInfo", cfg.HolyAdvanceCfgInfo);
			ConfigClassRegister.regClass("HolyUnlockCfgInfo", cfg.HolyUnlockCfgInfo);
			ConfigClassRegister.regClass("TeamCampaignStageCfgInfo", cfg.TeamCampaignStageCfgInfo);
			ConfigClassRegister.regClass("TeamCampaignFormationCfgInfo", cfg.TeamCampaignFormationCfgInfo);
			ConfigClassRegister.regClass("TeamCampaignExtraPrizeCfgInfo", cfg.TeamCampaignExtraPrizeCfgInfo);
			ConfigClassRegister.regClass("TeamCampaignRobotCfgInfo", cfg.TeamCampaignRobotCfgInfo);
			ConfigClassRegister.regClass("TeamCampaignMonsterNewCfgInfo", cfg.TeamCampaignMonsterNewCfgInfo);
			ConfigClassRegister.regClass("HeavenCommonCfgInfo", cfg.HeavenCommonCfgInfo);
			ConfigClassRegister.regClass("HeavenChapterCfgInfo", cfg.HeavenChapterCfgInfo);
			ConfigClassRegister.regClass("HeavenChapterPrizeCfgInfo", cfg.HeavenChapterPrizeCfgInfo);
			ConfigClassRegister.regClass("HeavenStageCfgInfo", cfg.HeavenStageCfgInfo);
			ConfigClassRegister.regClass("HeavenStarConditionCfgInfo", cfg.HeavenStarConditionCfgInfo);
			ConfigClassRegister.regClass("HeavenPrayStatueCfgInfo", cfg.HeavenPrayStatueCfgInfo);
			ConfigClassRegister.regClass("HeavenPrayPrizePoolCfgInfo", cfg.HeavenPrayPrizePoolCfgInfo);
			ConfigClassRegister.regClass("HeavenPrayPrizeItemsCfgInfo", cfg.HeavenPrayPrizeItemsCfgInfo);
			ConfigClassRegister.regClass("HeavenPrayPrizeTypeCfgInfo", cfg.HeavenPrayPrizeTypeCfgInfo);
			ConfigClassRegister.regClass("HeavenMonsterNewCfgInfo", cfg.HeavenMonsterNewCfgInfo);
			ConfigClassRegister.regClass("GmCfgInfo", cfg.GmCfgInfo);
			ConfigClassRegister.regClass("TrainTowerPrizeCfgInfo", cfg.TrainTowerPrizeCfgInfo);
			ConfigClassRegister.regClass("TrainTowerCfgInfo", cfg.TrainTowerCfgInfo);
			ConfigClassRegister.regClass("TrainTowerCountCfgInfo", cfg.TrainTowerCountCfgInfo);
			ConfigClassRegister.regClass("TrainEndlessCfgInfo", cfg.TrainEndlessCfgInfo);
			ConfigClassRegister.regClass("TrainEndlessPrizeCfgInfo", cfg.TrainEndlessPrizeCfgInfo);
			ConfigClassRegister.regClass("TrainEndlestBuffCfgInfo", cfg.TrainEndlestBuffCfgInfo);
			ConfigClassRegister.regClass("TrainConstantsCfgInfo", cfg.TrainConstantsCfgInfo);
			ConfigClassRegister.regClass("TrainPeakCfgInfo", cfg.TrainPeakCfgInfo);
			ConfigClassRegister.regClass("TrainMonsterNewCfgInfo", cfg.TrainMonsterNewCfgInfo);
			ConfigClassRegister.regClass("AchieveMainAchieveCfgInfo", cfg.AchieveMainAchieveCfgInfo);
			ConfigClassRegister.regClass("AchieveLivenessCfgInfo", cfg.AchieveLivenessCfgInfo);
			ConfigClassRegister.regClass("AchieveFactionLivenessCfgInfo", cfg.AchieveFactionLivenessCfgInfo);
			ConfigClassRegister.regClass("AchieveLivenessPrizeCfgInfo", cfg.AchieveLivenessPrizeCfgInfo);
			ConfigClassRegister.regClass("AchieveTypeCfgInfo", cfg.AchieveTypeCfgInfo);
			ConfigClassRegister.regClass("AchieveTrainCfgInfo", cfg.AchieveTrainCfgInfo);
			ConfigClassRegister.regClass("AchieveActivityLivenessCfgInfo", cfg.AchieveActivityLivenessCfgInfo);
			ConfigClassRegister.regClass("AchieveActivityLivenessPrizeCfgInfo", cfg.AchieveActivityLivenessPrizeCfgInfo);
			ConfigClassRegister.regClass("AchieveWeekLivenessCfgInfo", cfg.AchieveWeekLivenessCfgInfo);
			ConfigClassRegister.regClass("AchieveWeekLivenessPrizeCfgInfo", cfg.AchieveWeekLivenessPrizeCfgInfo);
			ConfigClassRegister.regClass("AchieveWarOrderCfgInfo", cfg.AchieveWarOrderCfgInfo);
			ConfigClassRegister.regClass("AchieveWarOrderPrizeCfgInfo", cfg.AchieveWarOrderPrizeCfgInfo);
			ConfigClassRegister.regClass("AchieveConstCfgInfo", cfg.AchieveConstCfgInfo);
			ConfigClassRegister.regClass("AchieveRoadCfgInfo", cfg.AchieveRoadCfgInfo);
			ConfigClassRegister.regClass("BattleCfgInfo", cfg.BattleCfgInfo);
			ConfigClassRegister.regClass("BattleTypeRestrainCfgInfo", cfg.BattleTypeRestrainCfgInfo);
			ConfigClassRegister.regClass("BattleFormationAttrCfgInfo", cfg.BattleFormationAttrCfgInfo);
			ConfigClassRegister.regClass("BattleTypeCfgInfo", cfg.BattleTypeCfgInfo);
			ConfigClassRegister.regClass("WealSigninCfgInfo", cfg.WealSigninCfgInfo);
			ConfigClassRegister.regClass("WealClickgoldCfgInfo", cfg.WealClickgoldCfgInfo);
			ConfigClassRegister.regClass("WealOnlinePrizeCfgInfo", cfg.WealOnlinePrizeCfgInfo);
			ConfigClassRegister.regClass("WealGiftCfgInfo", cfg.WealGiftCfgInfo);
			ConfigClassRegister.regClass("WealResourceFindbackCfgInfo", cfg.WealResourceFindbackCfgInfo);
			ConfigClassRegister.regClass("ConvenantConstCfgInfo", cfg.ConvenantConstCfgInfo);
			ConfigClassRegister.regClass("ConvenantLevelCfgInfo", cfg.ConvenantLevelCfgInfo);
			ConfigClassRegister.regClass("ConvenantAttrCfgInfo", cfg.ConvenantAttrCfgInfo);
			ConfigClassRegister.regClass("TempleCfgInfo", cfg.TempleCfgInfo);
			ConfigClassRegister.regClass("TempleEvolveCfgInfo", cfg.TempleEvolveCfgInfo);
			ConfigClassRegister.regClass("TempleIdCountCfgInfo", cfg.TempleIdCountCfgInfo);
			ConfigClassRegister.regClass("TempleMonsterNewCfgInfo", cfg.TempleMonsterNewCfgInfo);
			ConfigClassRegister.regClass("TempleLevelInfoCfgInfo", cfg.TempleLevelInfoCfgInfo);
			ConfigClassRegister.regClass("EffectCfgInfo", cfg.EffectCfgInfo);
			ConfigClassRegister.regClass("ChallengeRobotCfgInfo", cfg.ChallengeRobotCfgInfo);
			ConfigClassRegister.regClass("ChallengeDailyPrizeCfgInfo", cfg.ChallengeDailyPrizeCfgInfo);
			ConfigClassRegister.regClass("ChallengeWeekPrizeCfgInfo", cfg.ChallengeWeekPrizeCfgInfo);
			ConfigClassRegister.regClass("ChallengeConstInfoCfgInfo", cfg.ChallengeConstInfoCfgInfo);
			ConfigClassRegister.regClass("ChallengeWinPrizeCfgInfo", cfg.ChallengeWinPrizeCfgInfo);
			ConfigClassRegister.regClass("ChallengeFailPrizeCfgInfo", cfg.ChallengeFailPrizeCfgInfo);
			ConfigClassRegister.regClass("ChallengeSeasonPrizeCfgInfo", cfg.ChallengeSeasonPrizeCfgInfo);
			ConfigClassRegister.regClass("ChallengeMonsterNewCfgInfo", cfg.ChallengeMonsterNewCfgInfo);
			ConfigClassRegister.regClass("GodEquipQualityCfgInfo", cfg.GodEquipQualityCfgInfo);
			ConfigClassRegister.regClass("GodEquipRefineCfgInfo", cfg.GodEquipRefineCfgInfo);
			ConfigClassRegister.regClass("GodEquipRefineRandCfgInfo", cfg.GodEquipRefineRandCfgInfo);
			ConfigClassRegister.regClass("GodEquipRandattrCfgInfo", cfg.GodEquipRandattrCfgInfo);
			ConfigClassRegister.regClass("GodEquipSuitCfgInfo", cfg.GodEquipSuitCfgInfo);
			ConfigClassRegister.regClass("GodEquipSuitMgrCfgInfo", cfg.GodEquipSuitMgrCfgInfo);
			ConfigClassRegister.regClass("ActivityCfgInfo", cfg.ActivityCfgInfo);
			ConfigClassRegister.regClass("ActivityChargeAmountCfgInfo", cfg.ActivityChargeAmountCfgInfo);
			ConfigClassRegister.regClass("ActivityChargeDaysCfgInfo", cfg.ActivityChargeDaysCfgInfo);
			ConfigClassRegister.regClass("ActivityLevelupCfgInfo", cfg.ActivityLevelupCfgInfo);
			ConfigClassRegister.regClass("ActivityTimesCfgInfo", cfg.ActivityTimesCfgInfo);
			ConfigClassRegister.regClass("ActivityExchangeCfgInfo", cfg.ActivityExchangeCfgInfo);
			ConfigClassRegister.regClass("ActivityFirstChargeCfgInfo", cfg.ActivityFirstChargeCfgInfo);
			ConfigClassRegister.regClass("ActivityGrowFundCfgInfo", cfg.ActivityGrowFundCfgInfo);
			ConfigClassRegister.regClass("ActivityFundCfgInfo", cfg.ActivityFundCfgInfo);
			ConfigClassRegister.regClass("ActivityLoginCfgInfo", cfg.ActivityLoginCfgInfo);
			ConfigClassRegister.regClass("ActivityShortTermGiftCfgInfo", cfg.ActivityShortTermGiftCfgInfo);
			ConfigClassRegister.regClass("ActivityAchievementCfgInfo", cfg.ActivityAchievementCfgInfo);
			ConfigClassRegister.regClass("ActivityRankCfgInfo", cfg.ActivityRankCfgInfo);
			ConfigClassRegister.regClass("ActivityZeroBuyCfgInfo", cfg.ActivityZeroBuyCfgInfo);
			ConfigClassRegister.regClass("ActivityLimitGiftCfgInfo", cfg.ActivityLimitGiftCfgInfo);
			ConfigClassRegister.regClass("ActivityWeekendCfgInfo", cfg.ActivityWeekendCfgInfo);
			ConfigClassRegister.regClass("ActivityAchieveRoadCfgInfo", cfg.ActivityAchieveRoadCfgInfo);
			ConfigClassRegister.regClass("ActivityLimitDayGiftCfgInfo", cfg.ActivityLimitDayGiftCfgInfo);
			ConfigClassRegister.regClass("ActivityExchangeExCfgInfo", cfg.ActivityExchangeExCfgInfo);
			ConfigClassRegister.regClass("ActivityRedEnvelopeCfgInfo", cfg.ActivityRedEnvelopeCfgInfo);
			ConfigClassRegister.regClass("ActivityRewardPoolCfgInfo", cfg.ActivityRewardPoolCfgInfo);
			ConfigClassRegister.regClass("ActivityCommonGroupCfgInfo", cfg.ActivityCommonGroupCfgInfo);
			ConfigClassRegister.regClass("ActivityCommonGroupPageCfgInfo", cfg.ActivityCommonGroupPageCfgInfo);
			ConfigClassRegister.regClass("ActivityWarOrderLevelCfgInfo", cfg.ActivityWarOrderLevelCfgInfo);
			ConfigClassRegister.regClass("ResonanceGridCfgInfo", cfg.ResonanceGridCfgInfo);
			ConfigClassRegister.regClass("ResonanceStarCfgInfo", cfg.ResonanceStarCfgInfo);
			ConfigClassRegister.regClass("ResonanceCommonCfgInfo", cfg.ResonanceCommonCfgInfo);
			ConfigClassRegister.regClass("CommonChatCfgInfo", cfg.CommonChatCfgInfo);
			ConfigClassRegister.regClass("CommonInvitePrizeCfgInfo", cfg.CommonInvitePrizeCfgInfo);
			ConfigClassRegister.regClass("CommonSurveyConstantsCfgInfo", cfg.CommonSurveyConstantsCfgInfo);
			ConfigClassRegister.regClass("CommonSupportCfgInfo", cfg.CommonSupportCfgInfo);
			ConfigClassRegister.regClass("ShopFixShopCfgInfo", cfg.ShopFixShopCfgInfo);
			ConfigClassRegister.regClass("ShopCurrencyTypeCfgInfo", cfg.ShopCurrencyTypeCfgInfo);
			ConfigClassRegister.regClass("ShopRandShopCfgInfo", cfg.ShopRandShopCfgInfo);
			ConfigClassRegister.regClass("ShopRandPoolCfgInfo", cfg.ShopRandPoolCfgInfo);
			ConfigClassRegister.regClass("ShopLevelItemCfgInfo", cfg.ShopLevelItemCfgInfo);
			ConfigClassRegister.regClass("SkillEffectNewSkillEffectCfgInfo", cfg.SkillEffectNewSkillEffectCfgInfo);
			ConfigClassRegister.regClass("ActivityEggLuckyEggCfgInfo", cfg.ActivityEggLuckyEggCfgInfo);
			ConfigClassRegister.regClass("DefendRankCfgInfo", cfg.DefendRankCfgInfo);
			ConfigClassRegister.regClass("DefendLevelCfgInfo", cfg.DefendLevelCfgInfo);
			ConfigClassRegister.regClass("DefendSlotCfgInfo", cfg.DefendSlotCfgInfo);
			ConfigClassRegister.regClass("DefendSkillCfgInfo", cfg.DefendSkillCfgInfo);
			ConfigClassRegister.regClass("DefendPlanCfgInfo", cfg.DefendPlanCfgInfo);
			ConfigClassRegister.regClass("StrongerFunListCfgInfo", cfg.StrongerFunListCfgInfo);
			ConfigClassRegister.regClass("StrongerCfgInfo", cfg.StrongerCfgInfo);
			ConfigClassRegister.regClass("StrongerResListTitleCfgInfo", cfg.StrongerResListTitleCfgInfo);
			ConfigClassRegister.regClass("StrongerResListDetailCfgInfo", cfg.StrongerResListDetailCfgInfo);
			ConfigClassRegister.regClass("StrongerPetCommandCfgInfo", cfg.StrongerPetCommandCfgInfo);
			ConfigClassRegister.regClass("StrongerQuestionCfgInfo", cfg.StrongerQuestionCfgInfo);
			ConfigClassRegister.regClass("BuffNewBuffCfgInfo", cfg.BuffNewBuffCfgInfo);
			ConfigClassRegister.regClass("BuffNewBuffGroupCfgInfo", cfg.BuffNewBuffGroupCfgInfo);
			ConfigClassRegister.regClass("BuffNewBuffStateCfgInfo", cfg.BuffNewBuffStateCfgInfo);
			ConfigClassRegister.regClass("IllustrationTrammelCfgInfo", cfg.IllustrationTrammelCfgInfo);
			ConfigClassRegister.regClass("IllustrationAchieveCfgInfo", cfg.IllustrationAchieveCfgInfo);
			ConfigClassRegister.regClass("IllustrationPowerCfgInfo", cfg.IllustrationPowerCfgInfo);
			ConfigClassRegister.regClass("DragonBallLevelCfgInfo", cfg.DragonBallLevelCfgInfo);
			ConfigClassRegister.regClass("DragonBallUnlockCfgInfo", cfg.DragonBallUnlockCfgInfo);
			ConfigClassRegister.regClass("BroadCastCastMsgCfgInfo", cfg.BroadCastCastMsgCfgInfo);
			ConfigClassRegister.regClass("BroadCastTimeMsgCfgInfo", cfg.BroadCastTimeMsgCfgInfo);
			ConfigClassRegister.regClass("GuideCfgInfo", cfg.GuideCfgInfo);
			ConfigClassRegister.regClass("PetCfgInfo", cfg.PetCfgInfo);
			ConfigClassRegister.regClass("PetUpgradeCfgInfo", cfg.PetUpgradeCfgInfo);
			ConfigClassRegister.regClass("PetAdvanceCfgInfo", cfg.PetAdvanceCfgInfo);
			ConfigClassRegister.regClass("PetUpsartSkillCfgInfo", cfg.PetUpsartSkillCfgInfo);
			ConfigClassRegister.regClass("PetUpStarCfgInfo", cfg.PetUpStarCfgInfo);
			ConfigClassRegister.regClass("PetFormationCfgInfo", cfg.PetFormationCfgInfo);
			ConfigClassRegister.regClass("PetFormationTypeCfgInfo", cfg.PetFormationTypeCfgInfo);
			ConfigClassRegister.regClass("PetRunePosCfgInfo", cfg.PetRunePosCfgInfo);
			ConfigClassRegister.regClass("PetTalentPosCfgInfo", cfg.PetTalentPosCfgInfo);
			ConfigClassRegister.regClass("PetBuyBagCfgInfo", cfg.PetBuyBagCfgInfo);
			ConfigClassRegister.regClass("PetStarScoreCfgInfo", cfg.PetStarScoreCfgInfo);
			ConfigClassRegister.regClass("PetBookCfgInfo", cfg.PetBookCfgInfo);
			ConfigClassRegister.regClass("PetReplaceCfgInfo", cfg.PetReplaceCfgInfo);
			ConfigClassRegister.regClass("PetDegenerateCostCfgInfo", cfg.PetDegenerateCostCfgInfo);
			ConfigClassRegister.regClass("PetDegenerateSubstitudeCfgInfo", cfg.PetDegenerateSubstitudeCfgInfo);
			ConfigClassRegister.regClass("PetRebornCostCfgInfo", cfg.PetRebornCostCfgInfo);
			ConfigClassRegister.regClass("PetStarExpCfgInfo", cfg.PetStarExpCfgInfo);
			ConfigClassRegister.regClass("PetHighstarRebornCfgInfo", cfg.PetHighstarRebornCfgInfo);
			ConfigClassRegister.regClass("PetEvolveCfgInfo", cfg.PetEvolveCfgInfo);
			ConfigClassRegister.regClass("PetMasterMatchCfgInfo", cfg.PetMasterMatchCfgInfo);
			ConfigClassRegister.regClass("WeekChampionConstInfoCfgInfo", cfg.WeekChampionConstInfoCfgInfo);
			ConfigClassRegister.regClass("WeekChampionTopPrizeCfgInfo", cfg.WeekChampionTopPrizeCfgInfo);
			ConfigClassRegister.regClass("WeekChampionLadderRankIntegralCfgInfo", cfg.WeekChampionLadderRankIntegralCfgInfo);
			ConfigClassRegister.regClass("WeekChampionRoundCfgInfo", cfg.WeekChampionRoundCfgInfo);
			ConfigClassRegister.regClass("DipCfgInfo", cfg.DipCfgInfo);
			ConfigClassRegister.regClass("ErrorCodeErrorCodeCfgInfo", cfg.ErrorCodeErrorCodeCfgInfo);
			ConfigClassRegister.regClass("ElementStageCfgInfo", cfg.ElementStageCfgInfo);
			ConfigClassRegister.regClass("ElementBuyCountCfgInfo", cfg.ElementBuyCountCfgInfo);
			ConfigClassRegister.regClass("ElementOpentimeCfgInfo", cfg.ElementOpentimeCfgInfo);
			ConfigClassRegister.regClass("ElementMonsterNewCfgInfo", cfg.ElementMonsterNewCfgInfo);
			ConfigClassRegister.regClass("FamilyBuildBuildCfgInfo", cfg.FamilyBuildBuildCfgInfo);
			ConfigClassRegister.regClass("PlayerNameNameCfgInfo", cfg.PlayerNameNameCfgInfo);
			ConfigClassRegister.regClass("SkillNewSkillCfgInfo", cfg.SkillNewSkillCfgInfo);
			ConfigClassRegister.regClass("SkillNewRaceDamagaCfgInfo", cfg.SkillNewRaceDamagaCfgInfo);
			ConfigClassRegister.regClass("SkillNewTalentUpgradeCfgInfo", cfg.SkillNewTalentUpgradeCfgInfo);
			ConfigClassRegister.regClass("SkillNewRecommendTalentCfgInfo", cfg.SkillNewRecommendTalentCfgInfo);
			ConfigClassRegister.regClass("SkillNewSpecialSkillDelayCfgInfo", cfg.SkillNewSpecialSkillDelayCfgInfo);
			ConfigClassRegister.regClass("DanConstCfgInfo", cfg.DanConstCfgInfo);
			ConfigClassRegister.regClass("DanUpgradeCfgInfo", cfg.DanUpgradeCfgInfo);
			ConfigClassRegister.regClass("DanBuyCountCfgInfo", cfg.DanBuyCountCfgInfo);
			ConfigClassRegister.regClass("DanFightPrizeCfgInfo", cfg.DanFightPrizeCfgInfo);
			ConfigClassRegister.regClass("DanAreaCfgInfo", cfg.DanAreaCfgInfo);
			ConfigClassRegister.regClass("DanTopPrizeCfgInfo", cfg.DanTopPrizeCfgInfo);
			ConfigClassRegister.regClass("ResPreloadCfgInfo", cfg.ResPreloadCfgInfo);
			ConfigClassRegister.regClass("ExpeditionStageCfgInfo", cfg.ExpeditionStageCfgInfo);
			ConfigClassRegister.regClass("ExpeditionRobotCfgInfo", cfg.ExpeditionRobotCfgInfo);
			ConfigClassRegister.regClass("ExpeditionStageTypeCfgInfo", cfg.ExpeditionStageTypeCfgInfo);
			ConfigClassRegister.regClass("ExpeditionMonsterNewCfgInfo", cfg.ExpeditionMonsterNewCfgInfo);
			ConfigClassRegister.regClass("ActivityCustomInCfgInfo", cfg.ActivityCustomInCfgInfo);
			ConfigClassRegister.regClass("CrossChallengeConstantsCfgInfo", cfg.CrossChallengeConstantsCfgInfo);
			ConfigClassRegister.regClass("CrossChallengeRobotCfgInfo", cfg.CrossChallengeRobotCfgInfo);
			ConfigClassRegister.regClass("CrossChallengeDailyPrizeCfgInfo", cfg.CrossChallengeDailyPrizeCfgInfo);
			ConfigClassRegister.regClass("CrossChallengeWinPrizeCfgInfo", cfg.CrossChallengeWinPrizeCfgInfo);
			ConfigClassRegister.regClass("CrossChallengeLosePrizeCfgInfo", cfg.CrossChallengeLosePrizeCfgInfo);
			ConfigClassRegister.regClass("CrossChallengeTopPrizeCfgInfo", cfg.CrossChallengeTopPrizeCfgInfo);
			ConfigClassRegister.regClass("CrossChallengeMonsterNewCfgInfo", cfg.CrossChallengeMonsterNewCfgInfo);
			ConfigClassRegister.regClass("LotteryTypeCfgInfo", cfg.LotteryTypeCfgInfo);
			ConfigClassRegister.regClass("LotteryCostCfgInfo", cfg.LotteryCostCfgInfo);
			ConfigClassRegister.regClass("LotteryHuntCfgInfo", cfg.LotteryHuntCfgInfo);
			ConfigClassRegister.regClass("LotteryPoolCfgInfo", cfg.LotteryPoolCfgInfo);
			ConfigClassRegister.regClass("RiskGuardCfgInfo", cfg.RiskGuardCfgInfo);
			ConfigClassRegister.regClass("RiskRefreshCfgInfo", cfg.RiskRefreshCfgInfo);
			ConfigClassRegister.regClass("RiskShopCfgInfo", cfg.RiskShopCfgInfo);
			ConfigClassRegister.regClass("RiskGridOpenCfgInfo", cfg.RiskGridOpenCfgInfo);
			ConfigClassRegister.regClass("RiskGuardPrizeCfgInfo", cfg.RiskGuardPrizeCfgInfo);
			ConfigClassRegister.regClass("RiskCollectPrizeCfgInfo", cfg.RiskCollectPrizeCfgInfo);
			ConfigClassRegister.regClass("RiskCollectRandprizeCfgInfo", cfg.RiskCollectRandprizeCfgInfo);
			ConfigClassRegister.regClass("RiskFingerResultCfgInfo", cfg.RiskFingerResultCfgInfo);
			ConfigClassRegister.regClass("RiskFingerPrizeCfgInfo", cfg.RiskFingerPrizeCfgInfo);
			ConfigClassRegister.regClass("RiskQuestionCfgInfo", cfg.RiskQuestionCfgInfo);
			ConfigClassRegister.regClass("RiskDialogCfgInfo", cfg.RiskDialogCfgInfo);
			ConfigClassRegister.regClass("RiskEventCfgInfo", cfg.RiskEventCfgInfo);
			ConfigClassRegister.regClass("RiskCollectSkillCfgInfo", cfg.RiskCollectSkillCfgInfo);
			ConfigClassRegister.regClass("RiskMonsterNewCfgInfo", cfg.RiskMonsterNewCfgInfo);
			ConfigClassRegister.regClass("NumberSystemCfgInfo", cfg.NumberSystemCfgInfo);
			ConfigClassRegister.regClass("SoundCfgInfo", cfg.SoundCfgInfo);
			ConfigClassRegister.regClass("DropDropGroupCfgInfo", cfg.DropDropGroupCfgInfo);
			ConfigClassRegister.regClass("DropDropCfgInfo", cfg.DropDropCfgInfo);
			ConfigClassRegister.regClass("CompensateMailCfgInfo", cfg.CompensateMailCfgInfo);
			ConfigClassRegister.regClass("CompensatePetCompensateCfgInfo", cfg.CompensatePetCompensateCfgInfo);
			ConfigClassRegister.regClass("CompensateAddpetCompensateCfgInfo", cfg.CompensateAddpetCompensateCfgInfo);
			ConfigClassRegister.regClass("CompensateItemExchangeCfgInfo", cfg.CompensateItemExchangeCfgInfo);
			ConfigClassRegister.regClass("CompensatePlayerRankCfgInfo", cfg.CompensatePlayerRankCfgInfo);
			ConfigClassRegister.regClass("TabletConstantsCfgInfo", cfg.TabletConstantsCfgInfo);
			ConfigClassRegister.regClass("TabletMagicJuiceCfgInfo", cfg.TabletMagicJuiceCfgInfo);
			ConfigClassRegister.regClass("TabletCfgInfo", cfg.TabletCfgInfo);
			ConfigClassRegister.regClass("TabletStarAdditionCfgInfo", cfg.TabletStarAdditionCfgInfo);
			ConfigClassRegister.regClass("TabletCreationCfgInfo", cfg.TabletCreationCfgInfo);
			ConfigClassRegister.regClass("PetCallCallCfgInfo", cfg.PetCallCallCfgInfo);
			ConfigClassRegister.regClass("PetCallCallCostCfgInfo", cfg.PetCallCallCostCfgInfo);
			ConfigClassRegister.regClass("PetCallCommonPoolCfgInfo", cfg.PetCallCommonPoolCfgInfo);
			ConfigClassRegister.regClass("PetCallCallPoolCfgInfo", cfg.PetCallCallPoolCfgInfo);
			ConfigClassRegister.regClass("PetCallChangeCfgInfo", cfg.PetCallChangeCfgInfo);
			ConfigClassRegister.regClass("PetCallFixChangeCfgInfo", cfg.PetCallFixChangeCfgInfo);
			ConfigClassRegister.regClass("PetCallChangePoolCfgInfo", cfg.PetCallChangePoolCfgInfo);
			ConfigClassRegister.regClass("PetCallSpecailPoolCfgInfo", cfg.PetCallSpecailPoolCfgInfo);
			ConfigClassRegister.regClass("TextConfigCfgInfo", cfg.TextConfigCfgInfo);
			ConfigClassRegister.regClass("IncubateConstCfgInfo", cfg.IncubateConstCfgInfo);
			ConfigClassRegister.regClass("IncubatePetEggCfgInfo", cfg.IncubatePetEggCfgInfo);
			ConfigClassRegister.regClass("IncubateSpeedUpCfgInfo", cfg.IncubateSpeedUpCfgInfo);
			ConfigClassRegister.regClass("RoomFurnitureCfgInfo", cfg.RoomFurnitureCfgInfo);
			ConfigClassRegister.regClass("PrizeCfgInfo", cfg.PrizeCfgInfo);
			ConfigClassRegister.regClass("PrizeFriendPrizeCfgInfo", cfg.PrizeFriendPrizeCfgInfo);
			ConfigClassRegister.regClass("PrizeCommonPrizeCfgInfo", cfg.PrizeCommonPrizeCfgInfo);
			ConfigClassRegister.regClass("UiRoleSayCfgInfo", cfg.UiRoleSayCfgInfo);

		}
		
		private static regClass(name:string, cls:any):void
		{
			ConfigClassRegister._classMap[name]= cls;
			Laya.ClassUtils.regClass(name, cls);
		}
		
		public static getClass(name:string):any
		{
			return ConfigClassRegister._classMap[name];
		}
	}
}
 
