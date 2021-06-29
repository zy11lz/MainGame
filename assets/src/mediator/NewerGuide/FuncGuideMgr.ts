
module Pro
{
    /**
    * 功能引导管理器
    * 此类只是GuideMgr的一个附属管理， 将功能引导的一些开启前置条件判断逻辑分离。
    * 功能引导的触发形式多一， 有的是从功能开放的时候触发，有的是从玩家升级时触发，有的是英雄相关等。
    * @author jason.xu
    */
    export class FuncGuideMgr
    {

        private static Instance: FuncGuideMgr = null;
        public static get Inst()
        {
            if (FuncGuideMgr.Instance == null)
            {
                FuncGuideMgr.Instance = new FuncGuideMgr();
            }
            return FuncGuideMgr.Instance;
        }

        //////////////////////////////////////////////////////
        //记录某些特定的一次性引导的完成情况        
        /** 英雄升星是否引导 */
        public IsGuideUpstar = 0;
        /** 战斗二倍速引导 */
        public IsGuideBattleSpeed = 0;

        //////////////////////////////////////////////////////


        /** 功能引导与功能开关的对应关系 */
        private funcTypeMapGuide = null;
        /** 功能引导与关卡对应关系 */
        private hookStageMapGuide = null;
        /** 功能引导与等级对应关系 */
        private levelMapGuide = null;
        /** 配置功能引导与功能开关的映射 */
        private initFuncGuideMap(): void
        {
            if (this.funcTypeMapGuide) return;
            let map = this.funcTypeMapGuide = {};
            map[emSystemSwitchType.Challenge] = GuideStep.Func_Challenge_1;
            map[emSystemSwitchType.StarTower] = GuideStep.Func_StarTower_1;
            map[emSystemSwitchType.Risk] = GuideStep.Func_Risk_1;
            map[emSystemSwitchType.Sail] = GuideStep.Func_Sail_1;
            map[emSystemSwitchType.Faction] = GuideStep.Func_Faction_1;
            map[emSystemSwitchType.Trave] = GuideStep.Func_FightDaily_1;
            map[emSystemSwitchType.ClickGold] = GuideStep.Func_ClickGold_1;
            // map[emSystemSwitchType.FirstPay] = GuideStep.Func_FirstPay_1;
            map[emSystemSwitchType.Temple] = GuideStep.Func_Temple_1;
            map[emSystemSwitchType.Expedition] = GuideStep.Func_Expedition_1;
            map[emSystemSwitchType.EndlessTower] = GuideStep.Func_EndlessTower_1;
            // map[emSystemSwitchType.ActivityLogin] = GuideStep.Func_7DayAct_1;
            map[emSystemSwitchType.Weal] = GuideStep.Func_SignIn_1;
            map[emSystemSwitchType.EquipCombin] = GuideStep.Func_EquipCombin_1;
            map[emSystemSwitchType.TeamCampaign] = GuideStep.Func_TeamCampaign_1;
            // map[emSystemSwitchType.ActivityAchieve] = GuideStep.Func_7DayTarget_1;            
        }
        private initFuncGuideMapByHookStage(): void
        {
            if (this.hookStageMapGuide) return;
            let map = this.hookStageMapGuide = {};
            map[10] = this.checkHookStageGuide;
            //由于在此处设置的引导，有可能比功能开放要晚一些，为了避免玩家已经对此系统进行过操作，此处的映射为check方法。
            //首充
            map[11] = this.checkFirstPayGuide;
            //后续通关的奖励提示
            map[16] = this.checkHookStagePirzePrompt;
            //每日首充弹出来
            map[20] = this.checkDailyFirstPay;
        }

        /** 首充 */
        private checkFirstPayGuide(): number
        {
            //是否已经领过首充奖励
            if (ActivityDataMgr.getFinishFirstPayAct()) return 0;
            return GuideStep.Func_FirstPay_1;
        }

        /** 通关10 指引通关奖励 */
        private checkHookStageGuide(): number
        {
            return GuideStep.Stage_Success_10;
        }


        /** 后续关卡通关的奖励提示 */
        private checkHookStagePirzePrompt(): number
        {
            let addItem = new cfg.AddItemInfo();
            addItem.itemid = CfgID.ItemID.HightCallGift;
            //[背景图frame, addItems]
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_NextPreviewPrompt, [10, [addItem]]));
            return 0;
        }
        /** 每日首充 */
        private checkDailyFirstPay(): number
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_DayFirstPay), BaseBackUIType.CloseQuene);
            return 0;
        }

        private initFuncGuideMapByLevel(): void
        {
            if (this.levelMapGuide) return;
            let map = this.levelMapGuide = {};
            // map[1] = GuideStep.Func_7DayAct_1;           
        }

        /** 通关关卡时检查是否需要有引导 */
        public checkGuideByHookStage(hookStage: number): boolean
        {
            this.initFuncGuideMapByHookStage();
            let func: Function = this.hookStageMapGuide[hookStage];
            if (!func) return false;
            let guideStep = func.call(this);
            if (!guideStep) return false;
            this.setFuncPreGuide(guideStep, true);
            return true;
        }

        /** 升级时检查当前等级是否需要有引导 */
        public checkGuideByLevelup(oldLv: number, newLv: number): boolean
        {
            if (oldLv >= newLv) return false;
            this.initFuncGuideMapByLevel();
            let guideStep = this.levelMapGuide[newLv];
            if (!guideStep) return false;
            this.setFuncPreGuide(guideStep, true);
            return true;
        }

        /** 判断功能开启是否需要引导，并记录下当前引导状态，等着下一步启动 */
        public setFuncPreGuideBySystemId(funcId: emSystemSwitchType): boolean
        {
            this.initFuncGuideMap();
            let step = this.funcTypeMapGuide[funcId];
            if (!step) return false;

            this.setFuncPreGuide(step, true);

            return true;
        }

        /** 直接开启某个功能引导，不用等其它界面， 也不做界面清理，直接在当前页面上开启引导 */
        public forceOpenFuncGuide(step: GuideStep): void
        {
            this.setFuncPreGuide(step, false);
            GuideMgr.Inst.enterGuide();
        }

        /** 中断当前引导，预先设置当前功能引导（等当前界面操作完以后，再调用checkStartFuncOpenGuide来真正启动当前引导） */
        public setFuncPreGuide(step: number, closeAllUI: boolean): void
        {
            //功能引导开启时，直接结束掉当前正在进行的新手前期引导
            if (GuideMgr.Inst.getGuideStatue(false, true))
            {
                GuideMgr.Inst.finshGuide();
            }
            GuideMgr.Inst.setGuideStatue(true, false, step, true, false);
            if (closeAllUI)
            {
                //关掉除升级界面以外的其它界面，便于升级界面弹出来，继续进行下一步
                UIManager.Inst.CloseOtherUI([PanelNotify.Open_PlayerLevelUp, PanelNotify.Open_SystemSwitchOpen]);
                //界面回到主界面
                EventMgr.trigger(EventNotify.Zhucheng_Hook_Visible_Changed, FunInfo.SelectIndex == 0 ? 0 : 1);
            }
        }

        /** 检查当前功能引导能否启动 */
        public checkStartFuncOpenGuide(): boolean
        {
            if (!GuideMgr.Inst.getInFuncGuide(false)) return false;
            if (UIManager.Inst.getIsShowingUI())
            {
                // 通知主界面关闭当前显示的界面，回到当前最底一级界面上。
                UIManager.Inst.clearAutoQuene();
                EventMgr.trigger(EventNotify.MainUI_BottomFun_Changed, FunInfo.SelectIndex);
            }
            GuideMgr.Inst.enterGuide();
            return true;
        }

        /** 标记一个引导（不影响当前的），待后续调用检查 */
        private _preFuncTag: number;
        public setPreFuncGuideTag(step: number): void
        {
            //正在其它引导过程中
            if (GuideMgr.Inst.getGuideStatue(false, true)) return;
            this._preFuncTag = step;
        }
        public checkPreFuncGuideTag(step: number): void
        {
            if (this._preFuncTag != step) return;
            this._preFuncTag = 0;
            this.setFuncPreGuide(step, false);
            this.checkStartFuncOpenGuide();
        }

        /** 退出当前功能引导 (与新手前期引导不一样，一个功能对应一个引导， 所以此次退出，只是结束当前功能的，并不是结束了所有引导) */
        public finishFuncGuide(): void
        {
            if (!GuideMgr.Inst.getInFuncGuide(true)) return;
            GuideMgr.Inst.reset();
        }
    }
}