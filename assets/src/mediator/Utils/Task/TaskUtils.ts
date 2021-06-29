module Pro
{
    /**
    * 任务系统工具类
    * @author jason.xu
    */
    export class TaskUtils
    {

        public static gotoOpenByAchieveType(achieveType: number, achieveSonType: number): boolean
        {
            let achieveTypeInfo = cfg.AchieveTypeCfgData.getInfoByTypeAndSubtype(achieveType, achieveSonType);
            if (!achieveTypeInfo) { return; }
            return TaskUtils.gotoOpenByUICfgId(achieveTypeInfo.uIOpenID);
        }

        public static gotoOpenByUICfgId(uiOpenId: number): boolean
        {
            let openInfo = cfg.UiconfigUiopenCfgData.getInfo(uiOpenId);
            if (!openInfo) { return false; }
            if (!PlayerDataMgr.checkSystemSwitchOpen(openInfo.systemSwitchId, true)) { return false; }
            return TaskUtils.goto(openInfo.panelNotify, openInfo.page);
        }

        //---------------------------------任务链接跳转----------------------------------------
        /**
         * 跳转路径
         * @param jumpType
         * @return false表示无跳转目标
         */
        public static goto(jumpType: string, subParam: any = null): boolean
        {

            if (jumpType == "Open_HookScene")
            {
                EventMgr.trigger(EventNotify.MainUI_BottomFun_Changed, 3);
                return true;
            } else if (jumpType == "Open_HookCity")
            {
                EventMgr.trigger(EventNotify.MainUI_BottomFun_Changed, 0);
                return true;
            }

            return TaskUtils.gotoPanel(PanelNotify[jumpType] as string, subParam);
        }

        /**
         * 跳转路径
         * @param panelName PanelNotify定义的UI
         * @return false表示无跳转目标
         */
        public static gotoPanel(panelName: string, subParam: string = null): boolean
        {
            switch (panelName)
            {
                case PanelNotify.Open_Task:
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Task, parseInt(subParam)), BaseBackUIType.HideBackUI);
                    break;
                case PanelNotify.Open_Sail:
                    if (!PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.Sail, true))
                    { return false; }
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Sail), BaseBackUIType.HideBackUI);
                    break;
                case PanelNotify.Open_Artifact:
                    if (!PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.Weapon, true))
                    { return false; }
                    EventMgr.trigger(EventNotify.MainUI_BottomFun_Changed, 6);
                    break;
                case PanelNotify.Open_Bag:
                    EventMgr.trigger(EventNotify.MainUI_BottomFun_Changed, 2);
                    break;
                case PanelNotify.Open_ItemCombin:
                    if (!PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.EquipCombin, true))
                    { return false; }
                    EventMgr.trigger(EventNotify.MainUI_BottomFun_Changed, 0);
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ItemCombin, parseInt(subParam)), BaseBackUIType.HideBackUI);
                    break;
                case PanelNotify.Open_FactionMain:
                    if (!PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.Faction, true))
                    { return false; }
                    EventMgr.trigger(EventNotify.MainUI_BottomFun_Changed, 5);
                    break;
                case PanelNotify.Open_FactionDonate:
                    if (!PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.Faction, true))
                    { return false; }
                    // if (FactionDataMgr.isHaveFaction()) {
                    if (FactionDataMgr.factionDisplay != null)
                    {  //有打开过公会界面，有了公会数据才能打开相应的界面，否则先打开公会界面
                        UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FactionDonate), BaseBackUIType.HideBackUI);
                    }
                    else
                    {
                        EventMgr.trigger(EventNotify.MainUI_BottomFun_Changed, 5);
                    }
                    break;
                case PanelNotify.Open_FactionSkill:
                    if (!PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.Faction, true))
                    { return false; }
                    if (FactionDataMgr.isHaveFaction())
                    {
                        UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FactionSkill), BaseBackUIType.HideBackUI);
                    }
                    else
                    {
                        EventMgr.trigger(EventNotify.MainUI_BottomFun_Changed, 5);
                    }
                    break;
                case PanelNotify.Open_FactionLiveness:
                    if (!PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.Faction, true))
                    { return false; }
                    if (FactionDataMgr.isHaveFaction())
                    {
                        UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FactionLiveness), BaseBackUIType.HideBackUI);
                    }
                    else
                    {
                        EventMgr.trigger(EventNotify.MainUI_BottomFun_Changed, 5);
                    }
                    break;
                case PanelNotify.Open_FactionBoss:
                    if (!PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.Faction, true))
                    { return false; }
                    if (FactionDataMgr.isHaveFaction())
                    {
                        var isInBattle = Pro.BattleMgr.Inst.checkAndWatchingBattleView(Pb_God._emBattleType.BattleType_FactionCopymap);
                        if (!isInBattle)
                        {
                            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FactionBoss), BaseBackUIType.HideBackUI);
                        }
                    }
                    else
                    {
                        EventMgr.trigger(EventNotify.MainUI_BottomFun_Changed, 5);
                    }
                    break;
                case PanelNotify.Open_FactionWar:
                    if (!PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.Faction, true))
                    { return false; }
                    if (FactionDataMgr.isHaveFaction())
                    {
                        UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FactionWar), BaseBackUIType.HideBackUI);
                    }
                    else
                    {
                        EventMgr.trigger(EventNotify.MainUI_BottomFun_Changed, 5);
                    }
                    break;
                case PanelNotify.Open_AcrossWar:
                    if (!PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.CrossWar, true))
                    { return false; }
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_AcrossWar, parseInt(subParam)), BaseBackUIType.HideBackUI);
                    break;
                case PanelNotify.Open_Treasure:
                    if (!PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.Treasure, true))
                    { return false; }
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Treasure, parseInt(subParam)), BaseBackUIType.HideBackUI);
                    break;
                case PanelNotify.Open_Friend:
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Friend), BaseBackUIType.HideBackUI);
                    break;
                case PanelNotify.Open_SevenDayLogin:
                    if (!ActivityDataMgr.getSevenLoginOpenState()) { return false; }
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_SevenDayLogin));
                    break;
                case PanelNotify.Open_Shop:
                    if (parseInt(subParam) != Pb_God._emShopType.ShopType_Sprite)
                    { //精灵商店顺延到下一个位置上
                        if (!PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.Shop, true))
                        { return false; }
                        UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Shop, parseInt(subParam)), BaseBackUIType.HideBackUI);
                        break;
                    }
                case PanelNotify.Open_TimeLimitActivity:
                    let param = subParam.split(";");
                    var actGrpId = parseInt(param[0]) || 1;
                    if (!ActivityDataMgr.checkCommonGroupActivityOpen(actGrpId))
                    {
                        TipsUtils.showTipsByLanId("activity_msg14");
                        return;
                    }
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_TimeLimitActivity, param[0], param[1]), BaseBackUIType.HideBackUI)
                    break;
                case PanelNotify.Open_SpriteShop:
                    if (!PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.SpriteShop, true))
                    { return false; }
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_SpriteShop), BaseBackUIType.HideBackUI);
                    break;
                case PanelNotify.Open_ClickGold:
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ClickGold));
                    break;
                case PanelNotify.Open_HeroCombin:
                    if (!PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.PetCombin, true))
                    { return false; }
                    EventMgr.trigger(EventNotify.MainUI_BottomFun_Changed, 0);
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroCombin), BaseBackUIType.HideBackUI);
                    break;
                case PanelNotify.Open_HeroSplit:
                    if (!PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.Sacrifice, true))
                    { return false; }
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroSplit), BaseBackUIType.HideBackUI);
                    break;
                case PanelNotify.Open_HeroCall:
                    if (!PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.HeroCall, true))
                    { return false; }
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroCall), BaseBackUIType.HideBackUI);
                    break;
                case PanelNotify.Open_HeroBag:
                    EventMgr.trigger(EventNotify.MainUI_BottomFun_Changed, 1, parseInt(subParam));
                    break;
                case PanelNotify.Open_HeroExchange:
                    if (!PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.Seer, true))
                    { return false; }
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroExchange, parseInt(subParam)), BaseBackUIType.HideBackUI);
                    break;
                case PanelNotify.Open_HeroStronger:
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroStronger), BaseBackUIType.HideBackUI);
                    break;
                case PanelNotify.Open_RiskMain:
                    if (!PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.Risk, true))
                    { return false; }
                    var results = BattleMgr.Inst.checkAndWatchingBattleView(Pb_God._emBattleType.BattleType_Risk);
                    if (!results)
                    {
                        RiskSend.open(); //向服务器请求，以返回的数据决定是打开英雄选择界面还是进入神界主界面
                    }
                    EventMgr.trigger(EventNotify.MainUI_BottomFun_Changed, 0);
                    break;
                case PanelNotify.Open_QuickFight:
                    if (FunInfo.SelectIndex != 3)
                    { EventMgr.trigger(EventNotify.MainUI_BottomFun_Changed, 3); }
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_QuickFight), BaseBackUIType.HideBackUI);
                    break;
                case PanelNotify.Open_FightDaily:
                    {
                        if (!PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.Trave, true))
                        { return false; }

                        var results = BattleMgr.Inst.checkAndWatchingBattleView(Pb_God._emBattleType.BattleType_Copymap);
                        if (!results)
                        {
                            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FightDaily), BaseBackUIType.HideBackUI);
                        }
                    }
                    break;
                case PanelNotify.Open_StarTowerMain:
                    {
                        if (!PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.StarTower, true))
                        { return false; }
                        var results = BattleMgr.Inst.checkAndWatchingBattleView(Pb_God._emBattleType.BattleType_Tower);
                        if (!results)
                        {
                            EventMgr.trigger(EventNotify.MainUI_BottomFun_Changed, 0);
                            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_StarTowerMain, parseInt(subParam)), BaseBackUIType.HideBackUI);
                        }
                    }
                    break;
                case PanelNotify.Open_StarTowerMainAdv:
                    {
                        if (!PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.StarTower2, true))
                        { return false; }
                        var results = BattleMgr.Inst.checkAndWatchingBattleView(Pb_God._emBattleType.BattleType_Tower2);
                        if (!results)
                        {
                            EventMgr.trigger(EventNotify.MainUI_BottomFun_Changed, 0);
                            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_StarTowerMainAdv, parseInt(subParam)), BaseBackUIType.HideBackUI);
                        }
                    }
                    break;
                case PanelNotify.Open_EndlessTowerMain:
                    {
                        if (!PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.EndlessTower, true))
                        { return false; }

                        var results = BattleMgr.Inst.checkAndWatchingBattleView(Pb_God._emBattleType.BattleType_Endless);
                        if (!results)
                        {
                            EventMgr.trigger(EventNotify.MainUI_BottomFun_Changed, 0);
                            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_EndlessTowerMain), BaseBackUIType.HideBackUI);
                        }
                    }
                    break;
                case PanelNotify.Open_ExpeditionMain:
                    {
                        if (!PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.Expedition, true))
                        { return false; }

                        var results = BattleMgr.Inst.checkAndWatchingBattleView(Pb_God._emBattleType.BattleType_Expedition);
                        if (!results)
                        {
                            EventMgr.trigger(EventNotify.MainUI_BottomFun_Changed, 0);
                            if (ExpeditionDataMgr.getCurtype() == 0)
                            {
                                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ExpeditionChoice), BaseBackUIType.HideBackUI);
                            }
                            else
                            {
                                if (ExpeditionDataMgr.isConductHunting())
                                { UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ExpeditionMain), BaseBackUIType.HideBackUI); }
                            }
                        }
                        break;
                    }
                case PanelNotify.Open_TeamCampaignChoice:  //组队征战
                case PanelNotify.Open_TeamCampaignMain:
                    {
                        var results = BattleMgr.Inst.checkAndWatchingBattleView(Pb_God._emBattleType.BattleType_TeamCampaign);
                        if (!results)
                        {
                            if (TeamCampaignDataMgr.getCurtype() == 0)
                            {
                                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_TeamCampaignChoice), BaseBackUIType.HideBackUI);
                            }
                            else
                            {
                                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_TeamCampaignMain), BaseBackUIType.HideBackUI);
                            }
                        }
                        break;
                    }
                case PanelNotify.Open_Challenge: {
                    if (!PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.Challenge, true))
                    { return false; }
                    var results = BattleMgr.Inst.checkAndWatchingBattleView(Pb_God._emBattleType.BattleType_Challenge);
                    if (!results)
                    {
                        EventMgr.trigger(EventNotify.MainUI_BottomFun_Changed, 0);
                        UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Challenge), BaseBackUIType.HideBackUI);
                    }
                }
                    break;
                case PanelNotify.Open_StagePrize: {
                    UIManager.Inst.forceOpen(new StagePrizeOpenUIData(Pb_God._emBattleType.BattleType_Hook));
                }
                    break;

                default:
                    if (panelName) { UIManager.Inst.forceOpen(new BaseOpenUIData(panelName, parseInt(subParam)), BaseBackUIType.HideBackUI); }
                    return false;
            }
            return true;
        }
    }
}