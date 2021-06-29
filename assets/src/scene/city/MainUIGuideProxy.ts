module Pro
{
    /**
     * 主界面新手引导代理类， 分离MainMediator类的关于新手引导相关的逻辑，减化MainMediator类的代码量。
    * @author jason.xu
    */
    export class MainUIGuideProxy
    {
        /**
         * 进入本步引导
         */
        public static GuideEnter(step: GuideStep, UIPanel: ProUI.Scene.City.MainUI, zhuchengUI: ZhuCheng, hookLayer: HookLayer): void
        {

            if (step == GuideStep.Plot_1_1)
            {
                SoundMgr.Inst().setMusicVolume(0);
                NativeCommonSystem.Inst.playVideo("CG.mp4", () =>
                {
                    SoundMgr.Inst().setMusicVolume(1);
                });
            }
            else if (step == GuideStep.Rename_2_1)
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ChangeNickName));
            }
            else if (step == GuideStep.NormalCall_3_1 || step == GuideStep.HigherCall_10_4)
            {
                UIManager.Inst.clearAutoQuene();
                UIManager.Inst.closeCurrentList();
                zhuchengUI.mapInfo.guideBtn(zhuchengUI.mapInfo.CallBtn);
            }
            else if (step == GuideStep.FirstFight_4_1 ||
                step == GuideStep.SecondFight_8_1 || step == GuideStep.ThirdFight_11_1 ||
                step == GuideStep.Func_SignIn_6 || step == GuideStep.Func_7DayActUpPet_9 || step == GuideStep.Stage_Success_10)
            {
                GuideMgr.Inst.showFinger(UIPanel.FunInfo.FighterBtn, true, UIPanel.FunInfo.FighterBtn, 0, 0, 1);
            }
            else if (step == GuideStep.ArtifactTask_18_1)
            {
                if (hookLayer && hookLayer.visible)
                {
                    GuideMgr.Inst.nextActive();
                }
                else
                {
                    GuideMgr.Inst.showFinger(UIPanel.FunInfo.FighterBtn, true, UIPanel.FunInfo.FighterBtn, 0, 0, 1);
                }
            }
            else if (step == GuideStep.StageReward_5_2 ||
                step == GuideStep.QuickFight_13_1 || step == GuideStep.HeroStrength_14_2 ||
                step == GuideStep.ArtifactTask_18_3 || step == GuideStep.HookReward_12_1 ||
                step == GuideStep.FourFight_15_2 || step == GuideStep.Func_Sail_2)
            {
                if (hookLayer && hookLayer.visible && !UIManager.Inst.getIsShowingUI())
                {
                    GuideMgr.Inst.nextActive();
                }
                else
                {
                    GuideMgr.Inst.showFinger(UIPanel.FunInfo.FighterBtn, true, UIPanel.FunInfo.FighterBtn, 0, 0, 1);
                }
            }
            else if (step == GuideStep.Func_Sail_3)
            {
                GuideMgr.Inst.showFinger(hookLayer.SailBtn, true, hookLayer.SailBtn);
            }
            else if (step == GuideStep.FirstFight_4_2 || step == GuideStep.SecondFight_8_2 ||
                step == GuideStep.ThirdFight_11_2 || step == GuideStep.Artifact_16_6 || step == GuideStep.ArtifactTask_18_4 ||
                step == GuideStep.FourFight_15_3 || step == GuideStep.ArtifactTask_17_5)
            {
                if (hookLayer)
                {
                    GuideMgr.Inst.showFinger(hookLayer.HookInfo.btnAtkBoss, true, hookLayer.HookInfo.btnAtkBoss, 0, 0, 1);
                }
            }
            else if (step == GuideStep.HookReward_12_3)
            {
                if (hookLayer)
                {
                    GuideMgr.Inst.showFinger(hookLayer.HookInfo.GetRewardBtn, true, hookLayer.HookInfo.GetRewardBtn);
                }
            }
            else if (step == GuideStep.QuickFight_13_2)
            {
                if (hookLayer)
                {
                    GuideMgr.Inst.showFinger(hookLayer.HookInfo.QuickFightBtn, true, hookLayer.HookInfo.QuickFightBtn);
                }
            }
            else if (step == GuideStep.HeroStrength_14_3)
            {
                if (hookLayer)
                {
                    GuideMgr.Inst.showFinger(hookLayer.HookInfo.HeroStrengthBtn, true, hookLayer.HookInfo.HeroStrengthBtn);
                }
            }
            else if (step == GuideStep.StageReward_5_1)
            {
                UIManager.Inst.clearAutoQuene();
                //UIManager.Inst.closeCurrentList();
            }
            else if (step == GuideStep.StageReward_5_3 || step == GuideStep.Stage_Success_11)
            {
                if (hookLayer)
                {
                    GuideMgr.Inst.showFinger(hookLayer.LevelTarget.levelBtn, true, hookLayer.LevelTarget);
                }
            }
            else if (step == GuideStep.Func_ClickGold_2)
            {
                GuideMgr.Inst.showFinger(UIPanel.PlayerInfo.Res_Gold_BtnIcon, true, UIPanel.PlayerInfo.Res_Gold_Btn);
            }
            else if (step == GuideStep.BagCombinHero_6_1)
            {
                GuideMgr.Inst.showFinger(UIPanel.FunInfo.ItemBagBtn, true, UIPanel.FunInfo.ItemBagBtn);
            }
            else if (step == GuideStep.HeroUpgrade_7_1 || step == GuideStep.Func_Pet5StarEmbattle_2 || step == GuideStep.Func_7DayActUpPet_2)
            {
                GuideMgr.Inst.showFinger(UIPanel.FunInfo.HeroBagBtn, true, UIPanel.FunInfo.HeroBagBtn);
            }
            else if (step == GuideStep.SecretShop_9_1)
            {
                UIManager.Inst.clearAutoQuene();
                //UIManager.Inst.closeCurrentList();
            }
            else if (step == GuideStep.FirstFight_4_6 || step == GuideStep.ThirdFight_11_6 ||
                step == GuideStep.Artifact_16_12 || step == GuideStep.QuickFight_13_5
            )
            {
                if (!PlayerDataMgr.getLevelUpUIOpenState()) { GuideMgr.Inst.nextActive(); }
                // UIManager.Inst.closeCurrentList();
            }
            else if (step == GuideStep.SecretShop_9_3 || step == GuideStep.HigherCall_10_3 ||
                step == GuideStep.Func_Challenge_2 || step == GuideStep.Func_StarTower_3 ||
                step == GuideStep.Func_Risk_2 || step == GuideStep.Func_7DayAct_1 || step == GuideStep.Func_SignIn_2 ||
                step == GuideStep.Func_7DayTarget_1 || step == GuideStep.Func_EquipCombin_1)
            {
                if (zhuchengUI != null && zhuchengUI.parent && zhuchengUI.visible && !UIManager.Inst.getIsShowingUI())
                {
                    GuideMgr.Inst.nextActive();
                }
                else
                {
                    GuideMgr.Inst.showFinger(UIPanel.FunInfo.homeIcon, true, UIPanel.FunInfo.HomeBtn);
                }
            }
            else if (step == GuideStep.Func_7DayAct_2)
            {
                UIManager.Inst.clearAutoQuene();
                UIManager.Inst.closeCurrentList();
                GuideMgr.Inst.showFinger(zhuchengUI.btn_sevenDayLogin, true, zhuchengUI.btn_sevenDayLogin);
            }
            else if (step == GuideStep.Func_7DayTarget_2)
            {
                UIManager.Inst.clearAutoQuene();
                UIManager.Inst.closeCurrentList();
                GuideMgr.Inst.showFinger(zhuchengUI.btn_sevenDayProgress, true, zhuchengUI.btn_sevenDayProgress);
            }
            else if (step == GuideStep.Func_SignIn_3)
            {
                UIManager.Inst.clearAutoQuene();
                UIManager.Inst.closeCurrentList();
                GuideMgr.Inst.showFinger(zhuchengUI.btnWelfare, true, zhuchengUI.btnWelfare);
            }
            else if (step == GuideStep.SecretShop_9_4)
            {
                UIManager.Inst.clearAutoQuene();
                UIManager.Inst.closeCurrentList();
                zhuchengUI.mapInfo.guideBtn(zhuchengUI.mapInfo.SecretShopBtn);

            }
            else if (step == GuideStep.Artifact_16_3 || step == GuideStep.ArtifactTask_17_1)
            {
                GuideMgr.Inst.showFinger(UIPanel.FunInfo.WeaponBtn, true, UIPanel.FunInfo.WeaponBtn);
            }
            else if (step == GuideStep.Func_Challenge_3)
            {
                UIManager.Inst.clearAutoQuene();
                UIManager.Inst.closeCurrentList();
                zhuchengUI.mapInfo.guideBtn(zhuchengUI.mapInfo.ArenaBtn);
            }
            else if (step == GuideStep.Func_StarTower_4)
            {
                UIManager.Inst.clearAutoQuene();
                UIManager.Inst.closeCurrentList();
                zhuchengUI.mapInfo.guideBtn(zhuchengUI.mapInfo.StarTowerBtn);
            }
            else if (step == GuideStep.Func_Risk_3)
            {
                UIManager.Inst.clearAutoQuene();
                UIManager.Inst.closeCurrentList();
                zhuchengUI.mapInfo.guideBtn(zhuchengUI.mapInfo.SecretTravelBtn);
            }
            else if (step == GuideStep.Func_EquipCombin_2)
            {
                UIManager.Inst.clearAutoQuene();
                UIManager.Inst.closeCurrentList();
                zhuchengUI.mapInfo.guideBtn(zhuchengUI.mapInfo.EquipCombinBtn);
            }
            else if (step == GuideStep.Func_FirstPay_3)
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FirstPay));
                GuideMgr.Inst.nextActive();
            }
            else if (step == GuideStep.Func_FightDaily_2 ||
                step == GuideStep.Func_EndlessTower_2 ||
                step == GuideStep.Func_Expedition_2 ||
                step == GuideStep.Func_Temple_2 ||
                step == GuideStep.Func_TeamCampaign_2)
            {
                GuideMgr.Inst.showFinger(UIPanel.FunInfo.TraveBtn, true, UIPanel.FunInfo.TraveBtn);
            }
            else if (step == GuideStep.Func_Faction_2)
            {
                //如果当前有公会，则直接结束就好。
                if (FactionDataMgr.isHaveFaction())
                { FuncGuideMgr.Inst.finishFuncGuide(); }
                else
                { GuideMgr.Inst.showFinger(UIPanel.FunInfo.FactionBtn, true, UIPanel.FunInfo.FactionBtn); }
            }

        }

        /**
         * 操作本步引导
         */
        public static GuideActive(step: GuideStep, UIPanel: ProUI.Scene.City.MainUI, zhuchengUI: ZhuCheng): void
        {
            if (cfg.GuideCfgData.getDialogById(step))
            {
                GuideMgr.Inst.nextActive();
            }
            else if (step == GuideStep.StageReward_5_1)
            {
                if (zhuchengUI != null && zhuchengUI.visible)
                {
                    GuideMgr.Inst.nextActive();
                }
            }
        }
    }
}