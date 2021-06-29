/*
* name;
*/

module Pro
{
    export class LinkUtils
    {
        /** 点击超链接 */
        public static parseHrefFunc(msg: string, handler?: any)
        {
            if (msg == null)
            {
                return;
            }

            let tmpAry = msg.split("*");

            let tmpType = parseInt(tmpAry.shift());
            switch (tmpType)
            {
                case Net.ChatLinkType.UserID://玩家id
                    CommonSend.queryPlayerView(parseInt(tmpAry[0]), parseInt(tmpAry[1]), 0, 0, Pb_God._emQueryPlayerViewType.QueryPlayerViewType_Main);
                    break;
                case Net.ChatLinkType.PetSN://伙伴SN
                    CommonSend.queryPetView(parseInt(tmpAry[0]), parseInt(tmpAry[1]), Global.initLongFromValue(tmpAry[2]), 0, 0);
                    break;
                case Net.ChatLinkType.ActivityID://活动ID

                    break;
                case Net.ChatLinkType.ItemInfo://道具属性
                    {
                        let tmpInfo = ItemDataMgr.getPbItemFromString(tmpAry);
                        UIManager.Inst.forceOpen(new ItemReviewOpenUIData(tmpInfo));
                    }
                    break;
                case Net.ChatLinkType.ChargeID://充值类型

                    break;
                case Net.ChatLinkType.FightRedio://录像ID
                    {
                        if (tmpAry[2])
                            VideoSend.playPlayer(Global.getVideoType(parseInt(tmpAry[0])), Global.initLongFromValue(tmpAry[1]), parseInt(tmpAry[3]));
                        else
                            VideoSend.playSystem(Global.getVideoType(parseInt(tmpAry[0])), Global.initLongFromValue(tmpAry[1]), 0);
                    }
                    break;
                case Net.ChatLinkType.Challenge://挑战
                    break;
                case Net.ChatLinkType.JoinUnion://加入公会
                    {
                        if (FactionDataMgr.isHaveFaction())
                        {
                            TipsUtils.showTipsByLanId("tips_msg17");
                            return;
                        }
                        handler && handler.closeUI && handler.closeUI()
                        FactionSend.apply(parseInt(tmpAry[0]), true);
                    }
                    break;
                case Net.ChatLinkType.FactionBoss://公会副本集结
                    {
                        if (!FactionDataMgr.isHaveFaction())
                        {
                            TipsUtils.showTipsByLanId("faction_none2");
                            return;
                        }
                        handler && handler.closeUI && handler.closeUI()
                        var isInBattle = Pro.BattleMgr.Inst.checkAndWatchingBattleView(Pb_God._emBattleType.BattleType_FactionCopymap);
                        if (!isInBattle)
                        {
                            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FactionBoss));
                        }
                    }
                    break;
                case Net.ChatLinkType.FightArea://竞技场
                    {
                        if (!PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.Challenge, true)) return;
                        UIManager.Inst.closeCurrentList();
                        //竞技场按钮打开规则： 冠军赛开启时，打开冠军赛入口，否则打开竞技挑战界面               
                        var isOpenChampion = ChampionDataMgr.isOpening;
                        if (GuideMgr.Inst.getInAllShowGuide() || !isOpenChampion)
                        {
                            var isInBattle = BattleMgr.Inst.checkAndWatchingBattleView(Pb_God._emBattleType.BattleType_Challenge);
                            if (!isInBattle)
                            {
                                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Challenge));
                            }
                        } else
                        {
                            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ArenaEnter, 1));
                        }
                    }
                    break;
                case Net.ChatLinkType.CrossArea://跨服竞技场
                case Net.ChatLinkType.DuanWeiMatch:// 段位赛
                    {
                        if (!PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.CrossWar, true)) return;
                        handler && handler.closeUI && handler.closeUI()
                        UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_AcrossWar));
                    }
                    break;
                case Net.ChatLinkType.MonthCard://月卡界面
                    {
                        handler && handler.closeUI && handler.closeUI()
                        UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_PayMain, 2));
                    }
                    break;
                case Net.ChatLinkType.UIOpen:  //通用UI跳转
                    {
                        let openId = parseInt(tmpAry[0]);
                        if (TaskUtils.gotoOpenByUICfgId(openId))
                            handler && handler.closeUI && handler.closeUI();
                        break;
                    }
                case Net.ChatLinkType.Share:
                    tmpAry[0] = JSON.parse(tmpAry[0]);
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroCallShareMediator, tmpAry));
                    break;
                case Net.ChatLinkType.UserAgreement:
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_UserAgreement, 2, tmpAry[0]));
                    break;
                default:
                    break;
            }
        }

    }
}