module Pro
{
    /**
     * 主界面刚登陆时，默认打开提示界面的逻辑代理类，
     *  分离MainMediator类的关于新手引导相关的逻辑，减化MainMediator类的代码量。
    * @author jason.xu
    */
    export class MainUILoginShowProxy
    {

        constructor()
        {
            this.LoginShowMainCall();
        }

        /** 首次登陆成功时，检查自动弹出的UI模块 */
        private LoginShowMainCall(): void
        {
            //登陆成功时，检查是否为当天第一次登陆
            let todayFirstLogin = Global.getZeroTimeNumber(TimeController.currTimer) > Global.getZeroTimeNumber(PlayerDataMgr.lastLoginTime * 1000);
            if (todayFirstLogin)
            {
                //检查巅峰挑战
                this.checkPeakEnterState();
                //检查红包活动
                this.checkRedEnvelopeState();
            }
            //检查限时冲榜活动
            this.checkRankActivityOpenState();
            //进入登陆成功时，检查挂机收益是否达到上限
            this.checkHookTimeReward();
            //检查是否有神降好礼奖励可领
            this.checkGodGiftReward();
            //检查是否有充值返利奖励
            this.checkChargeRebate();
        }

        /** 检查限时冲榜活动 */
        private checkRankActivityOpenState(): void
        {
            // if(TodayRepeatOpMgr.Inst.getTag("RankActPromptPopup")) return;  //策划说不要判断每天1次， 每次上线都要。
            //功能是否开启
            let sysOpen = PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.RankActivity);
            if (!sysOpen) { return; }
            let openRankType = -1;
            if (sysOpen)
            {
                //找一个开启状态中，开启时间最近的作为默认打开的类型
                let allActivity = cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_Rank, 0);
                let currTimer = TimeController.currTimer;
                let minStartTime = 0;
                let openServTimer;
                for (let actCfgInfo of allActivity)
                {
                    openServTimer = actCfgInfo.isMerge ? TimeController.worldMergeZeroTime : TimeController.worldCreateZeroTime;
                    let openTimeInfo = cfg.ActivityCfgData.getOpenTimeInfoByID(actCfgInfo.iD);
                    if (openTimeInfo && openTimeInfo.isInOpenTime(currTimer, openServTimer))
                    {
                        let startTime = openTimeInfo.getStartTime(currTimer, openServTimer);
                        if (startTime > minStartTime)
                        {
                            minStartTime = startTime;
                            openRankType = actCfgInfo.topListType;
                            
                        }
                    }
                }
            }
            if (openRankType > 0)
            {
                let rankType = openRankType;
                TopListSend.list(rankType, 1, 1, 0, 0, 0, 2); //拉取排行榜时，最后一个参数1表示只拉取自己前一名的， 2表示拉取榜单第一名用于显示在主界面提示的
                EventMgr.on(CmdEvent.TopList_List_Ack, this, this.onList_Ack);
                // TodayRepeatOpMgr.Inst.setTag("RankActPromptPopup");
            }
        }

        /** 收到排行榜 */
        private onList_Ack(topListValue: Pb_God.PBS2CTopListList)
        {
            EventMgr.off(CmdEvent.TopList_List_Ack, this, this.onList_Ack);
            if (!topListValue.ask) { return; }
            if (topListValue.list.length <= 0) { return; }
            let rankType = topListValue.ask.type;
            UIManager.Inst.pushAutoQueue(new BaseOpenUIData(PanelNotify.Open_RankActivityPrompt, rankType, topListValue.list[0]));
        }

        /** 检查巅峰挑战 */
        private checkPeakEnterState(): void
        {
            //巅峰挑战开启中
            // let isSysOpen = PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.Peak);
            // let actOpen = TrainDataMgr.getPeakOpenDay() >= 0;
            if (PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.Peak) &&
                TrainDataMgr.getPeakOpenDay() > 0 && TrainDataMgr.getPeakLeftCount() > 0)
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_PeakEnter));
            }
        }

        /** 检查挂机收益  */
        private checkHookTimeReward(): void
        {
            if (HookDataMgr.getHookRewardTime() >= 10 * 3600 * 1000 && !GuideMgr.Inst.getInShowGuide())
            {
                let msg = Global.getLangStr("hook_msg15");  //您的挂机收益即将达到上限，请前往出击界面领取
                AlertShow.showConfirmAlert(msg, this, () =>
                {
                    EventMgr.trigger(EventNotify.MainUI_BottomFun_Changed, 3);
                }, "common_go", "common_cancel", 0, 0, null, true);
            }
        }

        /*** 检查是否有神降好礼奖励可领 */
        private checkGodGiftReward(): void
        {
            let achId = AchieveDataMgr.getCanRewardGodGiftId();
            if (achId > 0) { UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_GodGift, achId)); }
        }

        /** 检查是否有充值返利奖励 */
        private checkChargeRebate(): void
        {
            let can_show = WealDataMgr.player_rebateState == Pb_God.player_FanLi_State.Fanli_state_CanAward;
            let min_money = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Fanli, Pb_God._emConstant_Fanli.C_Fanli_LowMoney);
            if (can_show && WealDataMgr.player_rebateMoney >= min_money && PlayerDataMgr.checkSystemSwitchOpen(emSystemSwitchType.PayRebate))
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ChargeRebateView));
            }
        }

        /** 检查红包活动 */
        private checkRedEnvelopeState(): void
        {
            if (PlayerDataMgr.level < 5)
            { return; }

            let actCfgInfo = cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_RedEnvelope, 0)[0];
            let isOpening = false;
            // if (ActivityDataMgr.checkActivityOpenState(actCfgInfo.iD))
            let openTimeInfo = cfg.ActivityCfgData.getOpenTimeInfoByID(actCfgInfo.iD);
            let currTimer = TimeController.currTimer;
            let openServTimer = actCfgInfo.isMerge ? TimeController.worldMergeZeroTime : TimeController.worldCreateZeroTime;
            if (openTimeInfo.isInOpenTime(currTimer, openServTimer))
            {// 有未拆红包情况下继续显示红包入口
                if (RedEnvelopeDataMgr.getIsValidRedEnvelope() > 0)
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RedEnvelopeMediator));
                }
            }
        }
    }
}