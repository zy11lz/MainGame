module Pro
{
    export class ZhuCheng extends ProUI.Scene.City.Utils.ZhuChengUI
    {

        // 最新短期礼包结束时间
        private _shortGiftEndTime: number;

        private _btnIcoSevenDayLogin: SevenDayLoginIco;

        //冲榜礼包提示倒计时是否结束
        private _RankActivityTipsTime: boolean;

        constructor()
        {
            super();

            this.on(Laya.Event.DISPLAY, this, () =>
            {
                this.controllEvents(false);
            });
            this.onExCxPayStatUPdate();
            // this.mapInfo.scale(GameConfig.WinScaleY, GameConfig.WinScaleY);
            this._btnIcoSevenDayLogin = new SevenDayLoginIco(this.sevenDayLoginAwardLab);
        }

        //---------------------------------------Event------------------------------------
        /** 控制消息监听器 */
        private controllEvents(isOff: boolean = true)
        {
            Global.EventsNotifyControl(this.listensEvents(), isOff);
            if (!isOff)
            {
                this.on(Laya.Event.UNDISPLAY, this, this.controllEvents);
            }
            else
            {
                this.unInitRedDotModel();
            }
        }

        /** 本类监听消息列表 */
        private listensEvents(): Array<any>
        {
            return [
                EventNotify.System_Switch_Open_Update, this, this.refreshSystemOpenState,
                CmdEvent.Train_EndlessBuffGroup, this, this.refresh_Train_EndlessBuffGroup,
                CmdEvent.Train_EndlessBuff, this, this.refresh_Train_EndlessBuffGroup,
                EventNotify.Activity_ShortTimeUpdate, this, this.checkShortTimeActOpenState,
                EventNotify.Activity_DrawReward, this, this.checkHefuDelay,
                EventNotify.Achieve_Activity_Update, this, this.checkHefuDelay,
                EventNotify.Activity_Update, this, this.checkHefuDelay,
                // EventNotify.PlayerLevelChange, this, this.onPlayerLevelChange,
                EventNotify.Activity_Close, this, this.onActivityChange,
                EventNotify.Activity_OpenTime_Update, this, this.onActivityChange,
                CmdEvent.Activity_Data, this, this.onRecvActivityData,
                CmdEvent.Platform_update_chargeinfo, this, this.onUpdate_chargeinfo,
                CmdEvent.Common_TimeEvent, this, this.onResetTimerEvent,
                EventNotify.Privilege_Daily_Prize, this, this.checkDayFirstPayState,
                EventNotify.Activity_RebateStateUpdate, this, this.checkActivityRebateOpenState,
                EventNotify.Endless_Auto_CD, this, this.updateEndAutoCD,
                EventNotify.Endless_Auto_State_Change, this, this.endAutoChange,
                EventNotify.Screen_Resize, this, this.adjustScreenPos,
                EventNotify.wx_cs_pay_stat_Update, this, this.onExCxPayStatUPdate
            ]
        }

        private checkHefuDelay()
        {
            Laya.timer.once(500, this, this.checkHefu);
        }

        private hideAllPop()
        {
            this.pop.visible = this.pop2.visible = this.pop3.visible = this.pop4.visible = this.pop5.visible = false;
        }

        /** 初始化 */
        public init()
        {

            //设置一下layer3的层级 遮挡其他 因为其中含有整合按钮气泡
            this.TopLayer3.zOrder = 1;
            this.bindSystemSwitch2Btn();
            this.bindSysytemSwitch2Function();

            let isShowFun = true;
            this.ControlBtn.onClick(this, () =>
            {
                Laya.Tween.to(this.Bottom1Box, { x: isShowFun ? 203 : 750, alpha: isShowFun ? 1 : 0 }, 300, Laya.Ease.backOut);
                Laya.Tween.to(this.Bottom2Box, { y: isShowFun ? 25 : 315, alpha: isShowFun ? 1 : 0 }, 300, Laya.Ease.backOut);
                Laya.Tween.to(this.ControlBtn, { rotation: isShowFun ? 0 : 45 }, 300, Laya.Ease.backOut);
                isShowFun = !isShowFun;
            });
            this.ControlBtn.activeEvent();

            this.btnNewYear.onClick(this, () =>
            {
                if (!this.pop.visible)
                    this.hideAllPop();
                this.pop.visible = !this.pop.visible;
            });

            this.btnSmallGame.onClick(this, () =>
            {
                if (!this.pop2.visible)
                    this.hideAllPop();
                this.pop2.visible = !this.pop2.visible;
            });

            this.btnHefu.onClick(this, () =>
            {
                if (!this.pop3.visible)
                    this.hideAllPop();
                this.pop3.visible = !this.pop3.visible;
            });

            this.btnLiuYi.onClick(this, () =>
            {
                if (!this.pop4.visible)
                    this.hideAllPop();
                this.pop4.visible = !this.pop4.visible;
            })

            this.btnDuanwu.onClick(this, () =>
            {
                if (!this.pop5.visible)
                    this.hideAllPop();
                this.pop5.visible = !this.pop5.visible;
            })

            this.btnWelcomeWarOrder.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Welcome_War_Order, 6103));
            });

            this.btnEvolutionWarOrder.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Welcome_War_Order, 6105));
            });

            this.btnLianLianKan.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_LianLianKan));
            });

            this.VedioBtn.onClick(this, (btn: component.UIButton) =>
            {
                if (!this.checkSystemOpenState(btn)) { return; }
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_BattleVedio));
            });
            this.FriendBtn.onClick(this, (btn: component.UIButton) =>
            {
                if (!this.checkSystemOpenState(btn)) { return; }
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Friend));
            });
            this.MailBtn.onClick(this, (btn: component.UIButton) =>
            {
                if (!this.checkSystemOpenState(btn)) { return; }
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Mail));
            });
            this.RankBtn.onClick(this, (btn: component.UIButton) =>
            {
                if (!this.checkSystemOpenState(btn)) { return; }
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RankMain));
            });
            this.QuestBtn.onClick(this, (btn: component.UIButton) =>
            {
                if (!this.checkSystemOpenState(btn)) { return; }
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Task));
            });
            this.btnFirstPay.onClick(this, (btn: component.UIButton) =>
            { //首充
                if (!this.checkSystemOpenState(btn)) { return; }
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FirstPay));
            });
            this.btnDayFirstPay.onClick(this, (btn: component.UIButton) =>
            { //每日首充
                if (!this.checkSystemOpenState(btn)) { return; }
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_DayFirstPay));
            });
            this.btnPay.onClick(this, (btn: component.UIButton) =>
            { //充值
                if (!this.checkSystemOpenState(btn)) { return; }
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_PayMain));
            });
            this.btnDragonBall.onClick(this, (btn: component.UIButton) =>
            { //龙珠
                if (!this.checkSystemOpenState(btn)) { return; }
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_DragonBall));
            });
            this.btnWelfare.onClick(this, (btn: component.UIButton) =>
            { //福利大厅
                if (!this.checkSystemOpenState(btn)) { return; }
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_WealHall));
            });
            this.btnFund.onClick(this, (btn: component.UIButton) =>
            { //超值基金
                if (!this.checkSystemOpenState(btn)) { return; }
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_MonthFund));
            });
            this.btnTreasure.onClick(this, (btn: component.UIButton) =>
            { //探宝
                if (!this.checkSystemOpenState(btn)) { return; }
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Treasure));
            });

            // this.daylimitbuy6004.onClick(this, (btn: component.UIButton) =>
            // {
            //     //每日限购
            //     UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_DayLimitBuy, 6004));
            // });

            // this.daylimitbuy6005.onClick(this, (btn: component.UIButton) =>
            // {
            //     //每日限购
            //     UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_DayLimitBuy, 6005));
            // });

            // this.daylimitbuy6008.onClick(this, (btn: component.UIButton) =>
            // {
            //     UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_DayLimitBuy, 6008));
            // });

            this.btnChoiceEndBuffs.onClick(this, () =>
            {
                if (BattleMgr.Inst.getBatPlaceMgr(Pb_God._emBattleType.BattleType_Endless) != null)
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_EndlessTowerBuff));
                }
                else
                {//没有战斗，可能是刚刚断线重连，需要再把战斗拉起来
                    BattleMgr.Inst.createNormalBat(Pb_God._emBattleType.BattleType_Endless, TrainDataMgr.getEndlessCurfightstage() + 1, 0, Pb_God._emZhenfaType.ZhenfaType_Endless);
                    // FightSend.endlessContinue(Pb_God._emBattleType.BattleType_Endless, TrainDataMgr.getEndlessCurfightstage() + 1);

                }
            });

            this.btn_sevenDayProgress.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_SevenDayProgress));
            });
            this.btn_sevenDayLogin.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_SevenDayLogin));
            });
            this.btnZeroBuy.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ZeroBuyActivity, this.btnZeroBuy["$bindActId"]));
            });
            this.btn_shotTimeGifts.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_LimitTimeGift));
            });
            this.btn_chargeRebate.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ChargeRebateView));
            });
            this.btnSonOfDestiny.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_SonOfDestiny));
            });
            this.btnRankActivity.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RankActivity));
            });
            this.btnBullishRank.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_BullishRank));
            });

            this.btnRankBag.onClick(this, () =>
            {
                TodayRepeatOpMgr.Inst.setTag("RankActivityTips");
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RankActivity, 2));
                this.btnRankBag.visible = false;
            });

            this.btnWarOrder.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_WarOrder));
            });
            this.btnLimitCharge.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_LimitChargeGift));
            });
            this.btnPeak.onClick(this, () =>
            {
                let openDay = TrainDataMgr.getPeakOpenDay();
                if (openDay == 0)
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_PeakEnter));
                } else
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Peak));
                }
            });

            // this.btnHuPa.onClick(this, () =>
            // {
            //     UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HuPa))
            // });

            this.btnCumulativeLogin.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FestivalCumulativeLogin));
            });

            this.btnRedEnvelope.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RedEnvelopeMediator));
            });
            this.btnGuessHero.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Guess_Hero));
                this.reddotGuessHero.visible = false;
            })
            this.btnWeekWelfare.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Week_Welfare));

            })



            this.refreshUI();

            //左边收缩按钮
            this.btnShrink.onClick(this, () =>
            {
                this.btnShrink.scaleY *= -1;
                this.delayRefreshTopHbox();
            })
            this.adjustScreenPos();
            Laya.timer.once(1000 * 60 * 3, this, () =>
            {
                this._RankActivityTipsTime = true;
                this.RankActivityTips();
            });

        }

        /**
         * 屏幕适配
         */
        private adjustScreenPos()
        {
            this.FunBox.top = this.FunBox.top + GameConfig.getBangsTop();
        }

        public refreshUI()
        {
            this.mapInfo.refreshUI();

            this.initRedDotModel();

            this.checkFirstPayState();
            this.checkDayFirstPayState();
            this.checkActivityRebateOpenState();
            this.refresh_Train_EndlessBuffGroup();
            this.checkSevenDayAchiveOpenState();
            this.checkZeroBuyActState();
            this.checkLimitGiftActState();
            this.checkSevenDayLoginOpenState();
            this.checkSpringFestivalLoginOpenState();
            this.checkTimeLimitActivityOpenState();

            this.checkCustomActivityOpenState();
            this.checkMonthFundOpenState();
            this.checkSonOfDestinyOpenState();
            this.checkShortTimeActOpenState();
            this.checkPeakOpenState();
            this.checkWarOrderState();
            this.refreshSystemOpenState(-1);
            this.checkRankActivityOpenState();
            this.checkBullishRankActivityOpenState();
            this.delayRefreshTopHbox();
            this.checkTimeLimitIconChengedFrame();
            // this.checkDayLimitBuyOpenState();
            this.checkWelcomeWarOrderState();
            this.checkRedEnvelope();
            this.checkGuessActState();
            this.checkWeekWelfareState();
            // this.checkExChangeState();

            this.checkLianLianKan();
            this.checkNewYear();
            this.checkSmallGame();
            this.checkHefu();
            this.checkLiuYi();
            this.checkDuanwu();
        }

        /**
         * 检测春节活动整合入口
         */
        private checkNewYear()
        {
            let isShow = false;
            let wid = 0;
            for (let i = 0; i < this.TopLayer4._children.length; i++)
            {
                let child = this.TopLayer4._children[i];
                if (child["$realityVisible"])
                {
                    isShow = true;
                    wid += child.width + 12;
                }
            }
            this.pop.width = wid + 20;
            this.btnNewYear.visible = isShow;
            this.delayRefreshTopHbox();
        }

        private checkLiuYi()
        {
            let isShow = false;
            let wid = 0;
            for (let i = 0; i < this.TopLayer7._children.length; i++)
            {
                let child = this.TopLayer7._children[i];
                if (child["$realityVisible"])
                {
                    isShow = true;
                    wid += child.width + 12;
                }
            }
            this.pop4.width = wid + 20;
            this.btnLiuYi.visible = isShow;
            this.delayRefreshTopHbox();
        }

        private checkDuanwu()
        {
            let isShow = false;
            let wid = 0;
            for (let i = 0; i < this.TopLayer8._children.length; i++)
            {
                let child = this.TopLayer8._children[i];
                if (child["$realityVisible"])
                {
                    isShow = true;
                    wid += child.width + 12;
                }
            }
            this.pop5.width = wid + 20;
            this.btnDuanwu.visible = isShow;
            this.delayRefreshTopHbox();

        }

        private checkSmallGame()
        {
            let isShow = false;
            let wid = 0;
            for (let i = 0; i < this.TopLayer5._children.length; i++)
            {
                let child = this.TopLayer5._children[i];
                if (child["$realityVisible"])
                {
                    isShow = true;
                    wid += child.width + 12;
                }
            }
            this.pop2.width = wid + 20;
            this.btnSmallGame.visible = isShow;
            this.delayRefreshTopHbox();
        }

        private checkHefu()
        {
            if (!this.btnHefu)
                return;
            let isShow = false;
            let wid = 0;
            let redDot = false;
            for (let i = 0; i < this.TopLayer6._children.length; i++)
            {
                let child = this.TopLayer6._children[i];
                if (child["$realityVisible"])
                {
                    if (child.reddot && child.reddot.visible)
                        redDot = true;
                    isShow = true;
                    wid += child.width + 12;
                }
            }
            this.pop3.width = wid + 20;
            this.btnHefu && (this.btnHefu.visible = isShow);
            this.reddotHefu.visible = redDot;
            this.delayRefreshTopHbox();
        }

        private delayRefreshTopHbox(): void
        {
            Laya.timer.callLater(this, () =>
            {
                this.__refreshTopRightLayer(this.TopLayer1);
                this.__refreshTopRightLayer(this.TopLayer2);
                this.__refreshTopRightLayer(this.TopLayer3);
                this.__refreshTopRightLayer(this.TopLayer4);
                this.__refreshTopRightLayer(this.TopLayer5);
                this.__refreshTopRightLayer(this.TopLayer6);
                this.__refreshTopRightLayer(this.TopLayer7);
                this.__refreshTopRightLayer(this.TopLayer8);
                //左上角
                let isOpen = this.btnShrink.scaleY == -1; //展开
                let index = 0;
                let space = 98;
                for (var btn of this.TopLeftBtns._children)
                {
                    if (!isOpen && index > 0)
                    {
                        btn.visible = false;
                        continue;
                    }
                    if (btn["$realityVisible"]) { btn.visible = true; }
                    if (!btn.visible) { continue; }
                    btn.x = 42;
                    btn.y = 42 + index * space;
                    index++;
                }
                if (index == 0)
                { //1个都没有显示了
                    this.TopLeftLayer.visible = false;
                    return;
                }
                this.TopLeftLayer.visible = true;
                if (PlatformData.platformType == PlatformData.EnumPlatformType.wx_cx)
                {
                    this.TopLeftLayer.visible = qingjs.instance.canPay();
                }
                // this.btnShrink.y = space * index + 97;
                this.btnShrink.bottom = this.btnShrink.scaleY == -1 ? 77 : 30;
                this.TopLeftLayer.height = space * index + 160;

                if (this.btnShrink.scaleY == -1)
                {
                    Laya.timer.once(500, this, () =>
                    {
                        this.RankActivityTips();
                    });
                }
                else
                { this.btnRankBag.visible = false; }
            });


        }
        private __refreshTopRightLayer(layerBox: Laya.Box): void
        {
            let posXBegin = 697; //右上角第一个的位置
            let posX = posXBegin;
            let posY = 51;
            let spaceX = 12;
            for (var node of layerBox._children)
            {
                if (!node.visible) { continue; }
                node.pos(posX, posY);
                posX -= spaceX + node.width;
            }
        }

        /**
         * 帧驱动
         * @param isSecond 帧驱动 每满1秒时，会有一个true
         */
        public updateFrame(isSecond: boolean)
        {
            if (isSecond)
            { //对于时间倒计时类的，不需要每一帧检查
                let currTimer = TimeController.currTimer;
                this.shortTimeGiftTimer(currTimer);
                this.monthFundTimer(currTimer);
                // this.peakActTimer(currTimer);
            }
            this.mapInfo.update();
        }

        // /** 玩家等级变化， 与等级相关的按钮可做刷新 */
        // private onPlayerLevelChange(): void {

        // }

        /** 活动状态变化 */
        private onActivityChange(actId: number): void
        {
            // let actType = cfg.ActivityCfgData.getTypeByID(actId);
            // if (actType == Pb_God._emActivityType.Activity_Achievement)
            // { //七日目标
            //     this.checkSevenDayAchiveOpenState();
            // } else if (actType == Pb_God._emActivityType.Activity_Login)
            // { //七日登陆
            //     this.checkSevenDayLoginOpenState();
            //     //春节累登
            //     this.checkSpringFestivalLoginOpenState()
            // } else if (actType == Pb_God._emActivityType.Activity_Fund)
            // { //超值基金
            //     this.checkMonthFundOpenState();
            // } else if (actType == Pb_God._emActivityType.Activity_FirstCharge)
            // { //首充
            //     this.checkFirstPayState();
            // } else if (actType == Pb_God._emActivityType.Activity_ZeroBuy)
            // { //0元购（少女狂欢节）
            //     this.checkZeroBuyActState();
            // } else if (actType == Pb_God._emActivityType.Activity_LimitGift)
            // { //全服限购（神龙宝藏）
            //     this.checkLimitGiftActState();
            // }
            // else if (actType == Pb_God._emActivityType.Activity_Guess)
            // {
            //     //猜一猜
            //     this.checkGuessActState();
            // }
            // else
            // {
            //     //通用分组，类型不确定
            //     this.checkTimeLimitActivityOpenState();
            // }
            this.refreshUI();
            this.checkHefuDelay();
        }

        /** 同步活动数据 */
        private onRecvActivityData(value: Pb_God.PBPlayerActivityData): void
        {
            this.onActivityChange(value.id);
        }

        /** 刷新首充按钮状态 */
        private checkFirstPayState(): void
        {
            let finishAct = ActivityDataMgr.getFinishFirstPayAct();
            let systemOpen = PlayerDataMgr.checkSystemSwitchOpen(emSystemSwitchType.FirstPay);
            this.btnFirstPay.visible = !finishAct && systemOpen;
            this.delayRefreshTopHbox();
        }

        /** 刷新每日首充按钮状态 */
        private checkDayFirstPayState(): void
        {
            let isShowFun = false;
            let sysOpen = PlayerDataMgr.checkSystemSwitchOpen(emSystemSwitchType.DailyFirstPay);
            if (sysOpen)
            {
                for (var i = 0; i < 3; i++)
                {
                    let packetType = Pb_God._emPrivilegeDailyPacket.PrivilegeDailyPacket_DailyCharge + i;
                    if (!PrivilegeDataMgr.getDailyPacketIsGot(packetType))
                    {
                        isShowFun = true;
                        break;
                    }
                }
            }
            this.btnDayFirstPay.visible = isShowFun;
            this.delayRefreshTopHbox();
        }

        /**
         * 检测短期礼包开启状态
         */
        private checkShortTimeActOpenState(): void
        {
            let act_endTime = ActivityDataMgr.getLatestShortTimeActEndTime();
            this._shortGiftEndTime = act_endTime;

            let cur_time = TimeController.currTimer / 1000;
            let btnVisible = act_endTime && cur_time < act_endTime;
            if (this.btn_shotTimeGifts.visible != btnVisible)
            {
                this.btn_shotTimeGifts.visible = btnVisible;
                if (btnVisible) { this.effShotTimeGift.play(0, true); }
                else { this.effShotTimeGift.stop(); }
                this.delayRefreshTopHbox();
            }
        }

        /**
         * 短期礼包计时器
         */
        private shortTimeGiftTimer(currTimer: number): void
        {
            if (!this.btn_shotTimeGifts.visible) { return; }
            let leftTime = this._shortGiftEndTime - currTimer / 1000;
            if (leftTime <= 0)
            {
                this.checkShortTimeActOpenState();
                return;
            }
            this.txt_shortGiftTime.text = Global.GetRemindTime(leftTime, 7);
        }

        /** 超值基金定时器 */
        private monthFundTimer(currTimer: number): void
        {
            if (!this.btnFund.visible) { return; }
            //判断是不是所有基金都买过了
            let isAllActive = true;
            let activityIds = cfg.ActivityFundCfgData.getActivityIdList();
            for (let i = 1; i <= activityIds.length; i++)
            {
                let activityId = activityIds[i - 1];
                if (!ActivityDataMgr.checkActivityOpenState(activityId)) { continue; }
                let chargeCfgInfo = cfg.ChargeCfgData.getInfo(parseInt(cfg.ActivityCfgData.getParamByID(activityId)));
                let chargeInfo = PlatformDataMgr.getChargeInfoByCfgInfo(chargeCfgInfo);
                let isActive = false;
                if (chargeInfo && chargeInfo.buycount > 0)
                { //如果有购买信息，还需检查一次最后的购买时间往后推30天是否还在有效期内。
                    isActive = Global.getLaterDayTime(chargeInfo.lastbuytime * 1000, 30) > currTimer;
                }
                if (!isActive)
                {
                    isAllActive = false;
                    break;
                }
            }

            //两个基金都购买了就不再在“超值基金”界面图标下显示倒计时
            if (isAllActive)
            {
                this.txtFundTimer.text = "";
            }
            else
            {
                //活动倒计时以开服时间为基准，5天一循环：超过24小时则倒计时格式为“n天m小时”；低于24小时则倒计时格式为“hh：mm：ss”。
                let startServerTime = TimeController.worldCreateZeroTime / 1000; //开服时间
                let period: number = 5 * 24 * 3600; //周期
                let leftTime = period - Math.floor(currTimer / 1000 - startServerTime) % period;
                this.txtFundTimer.text = Global.GetRemindTime(leftTime, 9);
            }
        }

        private onUpdate_chargeinfo(value: Pb_God.PBChargeInfo): void
        {
            if (cfg.ChargeCfgData.getChargeTypeByID(value.groupid) == Pb_God._emChargeType.ChargeType_7DayLogin)
            { this.checkSevenDayLoginOpenState(); }
        }

        /** 时间重置 */
        private onResetTimerEvent(): void
        {
            this.checkPeakOpenState();
            this.checkWarOrderState();
        }

        /**
         * 充值返利活动按钮状态
         */
        private checkActivityRebateOpenState(): void
        {
            let can_show = WealDataMgr.player_rebateState == Pb_God.player_FanLi_State.Fanli_state_CanAward;
            let min_money = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Fanli, Pb_God._emConstant_Fanli.C_Fanli_LowMoney);
            this.btn_chargeRebate.visible = can_show && WealDataMgr.player_rebateMoney >= min_money && PlayerDataMgr.checkSystemSwitchOpen(emSystemSwitchType.PayRebate);
            this.delayRefreshTopHbox();
        }

        /** 检查0元购开启状态 */
        private checkZeroBuyActState(): void
        {
            let sysOpen = PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.ZeroBuy);
            let openActId = -1;
            if (sysOpen)
            {
                //获取一个开启中的活动
                openActId = ActivityDataMgr.getFirstValidActivityIdByType(Pb_God._emActivityType.Activity_ZeroBuy);
            }
            this.btnZeroBuy.visible = false;
            if (openActId > 0)
            {
                let zeroCfgInfo = cfg.ActivityZeroBuyCfgData.getListByActId(openActId)[0];
                this.btnZeroBuy["$bindActId"] = openActId;
                this.btnZeroBuy.skin = `res/Unpack/activityMainBtns/${ zeroCfgInfo.mainIcon }.png`;
                this.btnZeroBuy.visible = true;
            }
            this.delayRefreshTopHbox();
        }

        /** 全服限购（神龙宝藏） */
        private checkLimitGiftActState(): void
        {
            let isOpen = false;
            if (PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.LimitChargeGift))
            {
                //获取一个开启中的活动
                let actId = ActivityDataMgr.getFirstValidActivityIdByType(Pb_God._emActivityType.Activity_LimitGift);
                if (actId != -1)
                {
                    isOpen = true;
                }
            }
            this.btnLimitCharge.visible = isOpen;
            this.delayRefreshTopHbox();
        }

        /**
         * 检测7天登陆活动开启状态
         */
        private checkSevenDayLoginOpenState(): void
        {
            let openState = ActivityDataMgr.getSevenLoginOpenState();
            this.btn_sevenDayLogin.visible = openState;
            if (this.btn_sevenDayLogin.visible) { this._btnIcoSevenDayLogin.refresh(); }
            this.delayRefreshTopHbox();
        }

        /**
        * 检测春节累登活动开启状态
        */
        private checkSpringFestivalLoginOpenState(): void
        {
            let openState = ActivityDataMgr.getSpringFestivalLoginOpenState();
            this.btnCumulativeLogin["$realityVisible"] = this.btnCumulativeLogin.visible = openState;
            let act_data = ActivityDataMgr.getActivityDataByType(Pb_God._emActivityType.Activity_Login, Pb_God._emActivityLoginType.Activity_Login_Total);
            if (act_data && act_data.id == 4019)
            {
                this.TopLayer8.addChild(this.btnCumulativeLogin);
            }
            //    if (this.btnCumulativeLogin.visible) { this._btnIcoSevenDayLogin.refresh(); }
            this.delayRefreshTopHbox();
        }


        /**
         * 检测7日目标活动开启状态
         */
        private checkSevenDayAchiveOpenState(): void
        {
            let isOpen = PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.ActivityAchieve);
            let act_end_time = ActivityDataMgr.getSevenDayAchieveEndTime();
            let leftTime = act_end_time - TimeController.currTimer / 1000;
            let is_time_open = leftTime > 0;
            isOpen = isOpen && is_time_open;

            this.btn_sevenDayProgress.visible = isOpen;
        }
        /**
         * 检测自定义活动开启状态
        */
        private checkCustomActivityOpenState(): void
        {
            let all = cfg.ActivityCustomInCfgData.getAll();

            for (let inCfg of all)
            {
                let actOpen = ActivityDataMgr.checkCustomActivityOpen(inCfg.inId);
                let btnVar = "act_Custom_" + inCfg.inId;
                let btn: ProUI.Scene.City.Utils.ActivityEnterButtonUI = this[btnVar];
                if (actOpen)
                {
                    if (!btn)
                    {
                        btn = new ProUI.Scene.City.Utils.ActivityEnterButtonUI();
                        this[btnVar] = btn;
                        btn["$binddata"] = inCfg.inId;
                        btn.skin = inCfg.mainIcon ? `res/Unpack/activityMainBtns/${ inCfg.mainIcon }.png` : "";
                        //显示位置(1://左侧竖图标2：//顶部第一排图标3：//顶部第二排图标)
                        if (inCfg.mainPositionType == 1)
                        {
                            //左上角的显示，比较特殊，需要从第一个开始显示，往上往下，需要把其它也往下挤
                            this.TopLeftBtns.addChildAt(btn, 0);
                        } else if (inCfg.mainPositionType == 2)
                        {
                            this.TopLayer1.addChild(btn);
                        } else if (inCfg.mainPositionType == 3)
                        {
                            this.TopLayer2.addChild(btn);
                        }
                        else if (inCfg.mainPositionType == 4)
                        {
                            this.TopLayer3.addChild(btn);
                        }
                        else if (inCfg.mainPositionType == 5)
                        {
                            this.TopLayer4.addChild(btn);
                        }
                        else if (inCfg.mainPositionType == 6)
                        {
                            this.TopLayer5.addChild(btn);
                        }
                        else if (inCfg.mainPositionType == 7)
                        {
                            this.TopLayer7.addChild(btn);
                        }
                        else if (inCfg.mainPositionType == 8)
                        {
                            this.TopLayer8.addChild(btn);
                        }
                        else
                        {
                            //其它的就不显示
                            continue;

                        }
                        //特效
                        if (inCfg.mainEff == "ui_timeLimitActBtn")
                        { //牛逼特效
                            EffectMgr.Inst.createLoopEffect(inCfg.mainEff, new Point(42, 42), null, 1, 1, btn.effPos, ResReleaseType.Reference, false);
                        } else if (inCfg.mainEff == "circle")
                        { //转圈圈特效
                            btn.effPos.addChild(new ProUI.Scene.City.Utils.aniActBtnEffectUI());
                        }
                        else if (inCfg.mainEff == "hupa")
                        {
                            btn.effPos.addChild(new ProUI.Scene.City.Utils.hupaBtnUI());
                        }
                        btn.onClick(this, () =>
                        {
                            let actId = inCfg.activityId;
                            let actType = cfg.ActivityCfgData.getInfo(actId).type

                            switch (actType) {
                                default:
                                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify[inCfg.openMediator], inCfg.activityId));
                                    break;
                            }
                            // if (actType == Pb_God._emActivityType.Activity_LimitDayGift)
                            // {
                            //     UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify[inCfg.openMediator], inCfg.activityId));
                            // }
                            // else if (actType == Pb_God._emActivityType.Activity_Rank)
                            // {

                            // }
                            // else if (actType == Pb_God._emActivityType.Activity_FirstCharge)
                            // {

                            // }
                            // else if (actType == Pb_God._emActivityType.Activity_LimitDayGift)
                            // {

                            // }
                            // else if (actType == Pb_God._emActivityType.Activity_Login)
                            // {

                            // }
                            // else if (actType == Pb_God._emActivityType.Activity_Charge_Amount)
                            // {

                            // }
                            // else if (actType == Pb_God._emActivityType.Activity_Charge_Days)
                            // {

                            // }
                        })

                        // this._reddotBindCtl.bind(btn.reddot, ActivityDataMgr.reddotModelCommonGrp.getChildModel(grpCfg.groupID));
                    }
                    btn.visible = btn["$realityVisible"] = true;

                } else
                {
                    if (btn) { btn.visible = btn["$realityVisible"] = false; }
                }
            }
            this.delayRefreshTopHbox();
        }

        /**
         * 检测通用限时活动分组的所有按钮开启状态
         */
        private checkTimeLimitActivityOpenState(): void
        {
            let sysOpen = PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.LimitTimeAct);
            let actGrpList = cfg.ActivityCommonGroupCfgData.getAll();

            for (let grpCfg of actGrpList)
            {
                //检查是否有活动正在开启中的
                let actOpen = false;
                if (sysOpen)
                {
                    actOpen = ActivityDataMgr.checkCommonGroupActivityOpen(grpCfg.groupID);
                    let btnVar = "actGroupBtn_" + grpCfg.groupID;
                    let btn: ProUI.Scene.City.Utils.ActivityEnterButtonUI = this[btnVar];
                    if (actOpen)
                    {
                        if (!btn)
                        {
                            btn = new ProUI.Scene.City.Utils.ActivityEnterButtonUI();
                            this[btnVar] = btn;
                            btn["$binddata"] = grpCfg.groupID;
                            btn.skin = grpCfg.mainIcon ? `res/Unpack/activityMainBtns/${ grpCfg.mainIcon }.png` : "";

                            if (grpCfg.isMerge)
                            {
                                this.TopLayer6.addChild(btn);
                            }
                            else
                            {
                                //显示位置(1://左侧竖图标2：//顶部第一排图标3：//顶部第二排图标)
                                if (grpCfg.mainPositionType == 1)
                                {
                                    //左上角的显示，比较特殊，需要从第一个开始显示，往上往下，需要把其它也往下挤
                                    //除去活动图标以外，冲榜是排第一，也就是把冲榜的往后挤即可。
                                    let childIndex = this.TopLeftBtns.getChildIndex(this.btnRankActivity);
                                    this.TopLeftBtns.addChildAt(btn, childIndex >= 0 ? childIndex : 0);
                                } else if (grpCfg.mainPositionType == 2)
                                {
                                    this.TopLayer1.addChild(btn);
                                } else if (grpCfg.mainPositionType == 3)
                                {
                                    this.TopLayer2.addChild(btn);
                                }
                                else if (grpCfg.mainPositionType == 4)
                                {
                                    this.TopLayer3.addChild(btn);
                                }
                                else if (grpCfg.mainPositionType == 5)
                                {
                                    this.TopLayer4.addChild(btn);
                                }
                                else if (grpCfg.mainPositionType == 6)
                                {
                                    this.TopLayer5.addChild(btn);
                                }
                                else if (grpCfg.mainPositionType == 7)
                                {
                                    this.TopLayer7.addChild(btn);
                                }
                                else if (grpCfg.mainPositionType == 8)
                                {
                                    this.TopLayer8.addChild(btn);
                                }
                                else
                                {
                                    //其它的就不显示
                                    continue;
                                }
                            }
                            //特效
                            if (grpCfg.mainEff == "ui_timeLimitActBtn")
                            { //牛逼特效
                                EffectMgr.Inst.createLoopEffect(grpCfg.mainEff, new Point(42, 42), null, 1, 1, btn.effPos, ResReleaseType.Reference, false);
                            } else if (grpCfg.mainEff == "circle")
                            { //转圈圈特效
                                btn.effPos.addChild(new ProUI.Scene.City.Utils.aniActBtnEffectUI());
                            }
                            else if (grpCfg.mainEff == "hupa")
                            {
                                btn.effPos.addChild(new ProUI.Scene.City.Utils.hupaBtnUI());
                            }
                            btn.onClick(this, () =>
                            {
                                this.openTimeLimitActivity(grpCfg.groupID)
                            })
                            this._reddotBindCtl.bind(btn.reddot, ActivityDataMgr.reddotModelCommonGrp.getChildModel(grpCfg.groupID));
                        }

                        /** 3为龙珠礼包 11为未知图腾 策划要求不在活动列表显示 */
                        btn.visible = btn["$realityVisible"] = grpCfg.groupID != 3 && grpCfg.groupID != 11;

                    } else
                    {
                        if (btn) { btn.visible = btn["$realityVisible"] = false; }
                    }
                }
            }
            this.delayRefreshTopHbox();
        }

        openTimeLimitActivity(groupID)
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_TimeLimitActivity, groupID, 0));
        }

        /**限时礼包 图标切换 */
        private checkTimeLimitIconChengedFrame(): void
        {
            let curTimeLimit = parseInt(Public.LStorageMgr.GetInst().getLocalData("curTimeLimit") || "1");
            let oldTimeLimit = JSON.parse(Public.LStorageMgr.GetInst().getLocalData("oldTimeLimit") || "{}");

            let curTime = new Date().getTime();

            if (!oldTimeLimit["time"])
            {
                Public.LStorageMgr.GetInst().setLocalData("oldTimeLimit", JSON.stringify({ "frame": curTimeLimit, "time": curTime }));
                return;
            }

            if ((curTime - oldTimeLimit["time"]) > 60 * 10 * 1000)
            {
                curTimeLimit = 1 // 10分钟后换回金币/经验
            }

            if (oldTimeLimit["frame"] && oldTimeLimit["frame"] == curTimeLimit && oldTimeLimit["frame"] == 1)
            {
                this.frameTimeGift.frame = Global.getItemNum(CfgID.ItemID.PetExp) > Global.getItemNum(CfgID.ItemID.Gold) ? 1 : 2
                return;
            }

            if (curTimeLimit == 1)
            {
                this.frameTimeGift.frame = Global.getItemNum(CfgID.ItemID.PetExp) > Global.getItemNum(CfgID.ItemID.Gold) ? 1 : 2
                Public.LStorageMgr.GetInst().setLocalData("curTimeLimit", "1");
            }
            else
            {
                this.frameTimeGift.frame = curTimeLimit;
            }
            Public.LStorageMgr.GetInst().setLocalData("oldTimeLimit", JSON.stringify({ "frame": curTimeLimit, "time": curTime }));
        }

        /** 检查超值基金活动开启状态 */
        private checkMonthFundOpenState(): void
        {
            let activityIds = cfg.ActivityFundCfgData.getActivityIdList();
            let hasOpen = false;
            for (let i = 1; i <= activityIds.length; i++)
            {
                let activityId = activityIds[i - 1];
                if (ActivityDataMgr.checkActivityOpenState(activityId))
                {
                    hasOpen = true;
                    break;
                }
            }
            this.btnFund["$realityVisible"] = this.btnFund.visible = hasOpen && PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.Fund);
            this.delayRefreshTopHbox();
        }

        /** 天选之子活动 */
        private checkSonOfDestinyOpenState()
        {
            let overTime = AchieveDataMgr.getSonOfDestinyOverTime();
            //奖励是否全部领完
            let isAllGet = true;
            let cfgList = cfg.AchieveMainAchieveCfgData.getListByBigType(Pb_God._emAchieveBigType.AchieveBigType_SonOfDestiny);
            for (let cfgInfo of cfgList)
            {
                if (!AchieveDataMgr.isMainFinish(cfgInfo.iD))
                {
                    isAllGet = false;
                    break;
                }
            }

            this.btnSonOfDestiny["$realityVisible"] = this.btnSonOfDestiny.visible = !isAllGet && overTime > TimeController.currTimer / 1000;
            this.delayRefreshTopHbox();
        }

        // /**
        //  * 检测每日限购
        //  */
        // private checkDayLimitBuyOpenState(): void
        // {
        //     let activityData = cfg.ActivityCfgData.getDayLimitBuyCfgData();

        //     //这里有可能有两个活动 坑！
        //     for (let i = 0; i < activityData.length; i++)
        //     {
        //         let tmp = activityData[i];
        //         if (ActivityDataMgr.checkActivityOpenState(tmp.iD))
        //         {
        //             this["daylimitbuy" + tmp.iD]["$realityVisible"] = this["daylimitbuy" + tmp.iD].visible = true;
        //         }
        //         else
        //         {
        //             this["daylimitbuy" + tmp.iD]["$realityVisible"] = this["daylimitbuy" + tmp.iD].visible = false;
        //         }
        //     }
        // }

        /** 检测红包活动是否开放 */
        private checkRedEnvelope(): void
        {
            let actCfgInfo = cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_RedEnvelope, 0)[0];
            let isOpening = false;
            let openTimeInfo = cfg.ActivityCfgData.getOpenTimeInfoByID(actCfgInfo.iD);
            let currTimer = TimeController.currTimer;
            let openServTimer = actCfgInfo.isMerge ? TimeController.worldMergeZeroTime : TimeController.worldCreateZeroTime;
            if (openTimeInfo.isInOpenTime(currTimer, openServTimer))
            {// 有未拆红包情况下继续显示红包入口
                if (RedEnvelopeDataMgr.getIsValidRedEnvelope() > 0)
                {
                    isOpening = true;
                }
            }
            this.btnRedEnvelope["$realityVisible"] = this.btnRedEnvelope.visible = isOpening
        }

        /**
         * 检测牛气冲榜活动
         */
        private checkBullishRankActivityOpenState(): void
        {
            //功能是否开启
            // let sysOpen = PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.RankActivity);
            let isOpening = false;
            // if (sysOpen)
            // {
            let allActivity = cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_CrossRank, 0);
            let currTimer = TimeController.currTimer;
            for (let actCfgInfo of allActivity)
            {
                if (ActivityDataMgr.checkActivityOpenState(actCfgInfo.iD))
                {
                    isOpening = true;
                    break;
                }
            }
            // }
            this.btnBullishRank["$realityVisible"] = this.btnBullishRank.visible = isOpening;
        }


        /** 限时冲榜活动 */
        private checkRankActivityOpenState(): void
        {
            //功能是否开启
            let sysOpen = PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.RankActivity);
            let isOpening = false;
            if (sysOpen)
            {
                let allActivity = cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_Rank, 0);
                let currTimer = TimeController.currTimer;
                let openServTimer;
                for (let actCfgInfo of allActivity)
                {
                    openServTimer = actCfgInfo.isMerge ? TimeController.worldMergeZeroTime : TimeController.worldCreateZeroTime;
                    let openTimeInfo = cfg.ActivityCfgData.getOpenTimeInfoByID(actCfgInfo.iD);
                    if (openTimeInfo && openTimeInfo.isInOpenTime(currTimer, openServTimer))
                    {
                        isOpening = true;
                        break;
                    }
                }
                //冲榜活动结束后，再多挂一天
                if (!isOpening)
                {
                    for (let actCfgInfo of allActivity)
                    {
                        openServTimer = actCfgInfo.isMerge ? TimeController.worldMergeZeroTime : TimeController.worldCreateZeroTime;
                        let openTimeInfo = cfg.ActivityCfgData.getOpenTimeInfoByID(actCfgInfo.iD);
                        if (openTimeInfo && openTimeInfo.isInOpenTime(currTimer, openServTimer + 24 * 3600 * 1000))
                        {
                            isOpening = true;
                            break;
                        }
                    }

                }
            }
            this.btnRankActivity["$realityVisible"] = this.btnRankActivity.visible = isOpening;
            if (TimeController.worldMergeTime > 0)
            {
                this.btnRankActivity.skin = "res/mainui/home_icon_hefuchongbang.png";
                this.TopLayer6.addChild(this.btnRankActivity);
            }
        }

        /**限时冲榜活动提示 */
        private RankActivityTips(): void
        {
            if (this.btnRankActivity.parent == this.TopLayer6)
                return;
            if (TodayRepeatOpMgr.Inst.getTag("RankActivityTips")) { return; }
            if (!this._RankActivityTipsTime) { return; }
            if (this.btnRankActivity.visible && !this.btnRankBag.visible)
            {
                this.btnRankBag.visible = true;
                this.btnRankBag.y = this.btnRankActivity.y + this.TopLeftBtns.y - 38;

            } else
            {
                this.btnRankBag.visible = false;
            }
        }

        /** 巅峰挑战活动 */
        private checkPeakOpenState()
        {
            let isSysOpen = PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.Peak);
            let openDay = TrainDataMgr.getPeakOpenDay();
            let actOpen = openDay >= 0;
            this.btnPeak["$realityVisible"] = this.btnPeak.visible = isSysOpen && actOpen;
            if (this.btnPeak.visible)
            {
                this.txtPeakTimer.text = openDay == 0 ? Global.getLangStr("peak_msg7") : "";
            }
            this.delayRefreshTopHbox();
        }

        /** 战令 */
        private checkWarOrderState(): void
        {
            let isOpen = PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.WarOrder) &&
                AchieveDataMgr.getWarOrderIsOpen();
            this.btnWarOrder.visible = isOpen;
            this.delayRefreshTopHbox();
        }

        /**战令是否开启 */
        private checkWelcomeWarOrderState()
        {
            let isOpening = false;
            let allActivity = cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_WarOrder);
            for (let actCfgInfo of allActivity)
            {
                isOpening = ActivityDataMgr.checkActivityOpenState(actCfgInfo.iD);
                if (actCfgInfo.iD == 6103)
                {
                    this.btnWelcomeWarOrder["$realityVisible"] = this.btnWelcomeWarOrder.visible = isOpening;
                }
                if (actCfgInfo.iD == 6105)
                {
                    this.btnEvolutionWarOrder["$realityVisible"] = this.btnEvolutionWarOrder.visible = isOpening;
                }
            }

        }
        /**检测 猜一猜我是谁 是否开放 */
        private checkGuessActState()
        {
            let actCfgInfo = cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_Guess, 0)[0];
            let isOpening = ActivityDataMgr.checkActivityOpenState(actCfgInfo.iD);
            this.btnGuessHero["$realityVisible"] = this.btnGuessHero.visible = isOpening;
        }
        private checkWeekWelfareState()
        {
            let actCfgInfo = cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_LuckyEgg, 0)[0];
            let isOpening = false;
            let openTimeInfo = cfg.ActivityCfgData.getOpenTimeInfoByID(actCfgInfo.iD);
            let currTimer = TimeController.currTimer;
            let openServTimer = actCfgInfo.isMerge ? TimeController.worldMergeZeroTime : TimeController.worldCreateZeroTime;

            if (openTimeInfo.isInOpenTime(currTimer, openServTimer))
            {
                //isOpening = true;
                isOpening = !Pro.ActivityDataMgr.getWeekWelfareAllGift()
            }
            this.btnWeekWelfare["$realityVisible"] = this.btnWeekWelfare.visible = isOpening;
        }

        // private checkExChangeState()
        // {
        //     this.btnExchangeShop["$realityVisible"] = this.btnExchangeShop.visible = true;
        // }

        private checkLianLianKan()
        {
            let act = cfg.JoyousLinkupJoyousLinkupCfgData.getActivityCfgInfo();
            let isOpen = ActivityDataMgr.checkActivityOpenState(act.iD);
            this.btnLianLianKan["$realityVisible"] = this.btnLianLianKan.visible = isOpen;
        }

        // /**
        //  * 巅峰挑战活动计时器
        //  */
        // private peakActTimer(currTimer: number): void {
        //     if (!this.btnPeak.visible) return;
        //     let openDay = TrainDataMgr.getPeakOpenDay();
        //     if (openDay != 0) {
        //         this.txtPeakTimer.text = "";
        //         return;
        //     }

        //     let leftTime = Global.getZeroTimeNumber(currTimer + 24 * 3600 * 1000) - currTimer;
        //     this.txtPeakTimer.text = Global.GetRemindTime(leftTime / 1000, 4);
        // }

        //------------------------------Event--------------------------------------
        /** 主城显示状态变更 */
        public Zhucheng_Visible_Changed(isVisible: boolean)
        {

            if (isVisible != this.visible)
            {
                if (!isVisible)
                {
                    this.mapInfo.leaveScene();
                }
                else
                {
                    this.refreshUI();
                }
                this.visible = isVisible;
            }
        }

        /** 无尽试炼提示选择buff */
        private refresh_Train_EndlessBuffGroup()
        {

            let showBuffChoice = TrainDataMgr.getEndlessBuffgroup() > 0/*  && TrainDataMgr.getEndlessSkillIndex() == -1&& BattleMgr.Inst.getBatPlaceMgr(Pb_God._emBattleType.BattleType_Endless) != null*/;
            if (this.btnChoiceEndBuffs.visible != showBuffChoice)
            {
                this.btnChoiceEndBuffs.visible = showBuffChoice;
                if (showBuffChoice) { this.aniEndlessBuff.play(0, true); }
                else { this.aniEndlessBuff.stop(); }
            }
        }

        private updateEndAutoCD(CD: number)
        {
            this.endAutoChange();
            this.autoChoiceEndBuffsLbl.text = CD + "s";
        }

        private endAutoChange()
        {
            this.autoChoiceEndBuffsLbl.visible = BattleMgr.Inst.autoEndlessTower > 0;
        }

        //-----------------------------------功能开放------------------------------------
        private _systemId2BtnsMap: ds.StringMap<component.UIButton[]>;
        /** 功能开关关联刷新方法（用于一些较复杂的按钮入口判断，比如首充入口，会有开关和活动相关的数据影响按钮出现） */
        private _systemId2Function: ds.StringMap<Function>;
        private refreshSystemOpenState(systemId: number = -1): void
        {
            if (systemId == -1)
            {   //refreshALL
                let keys = this._systemId2BtnsMap.getKeys();
                for (var key of keys)
                {
                    var elBtns = this._systemId2BtnsMap.get(key);
                    let isOpen = PlayerDataMgr.checkSystemSwitchOpen(parseInt(key));
                    for (let elBtn of elBtns)
                    {
                        let isTopBtns = elBtn["$isTopBtns"];
                        if (isTopBtns)
                        {
                            elBtn.visible = isOpen;
                        } else
                        {
                            elBtn.gray = !isOpen;
                            let is_showIcon = cfg.SystemSwitchSystemSwitchCfgData.getShowIconByID(parseInt(key)) == 1;
                            elBtn.visible = !isOpen ? is_showIcon : true;
                        }
                    }

                }
            } else
            {
                let btns = this._systemId2BtnsMap.get(systemId);
                if (btns)
                {
                    let isOpen = PlayerDataMgr.checkSystemSwitchOpen(systemId);
                    for (let btn of btns)
                    {
                        let isTopBtns = btn["$isTopBtns"];
                        if (isTopBtns)
                        {
                            btn.visible = isOpen;
                            this.delayRefreshTopHbox();
                        } else
                        {
                            btn.gray = !isOpen;
                            let is_showIcon = cfg.SystemSwitchSystemSwitchCfgData.getShowIconByID(parseInt(key)) == 1;
                            btn.visible = !isOpen ? is_showIcon : true;
                        }
                    }
                }
                let fun = this._systemId2Function.get(systemId);
                if (fun)
                {
                    fun.call(this);
                }
            }
        }

        /** 将系统功能ID与按钮刷新方法关联起来, 用于在对应功能开放时，刷新按钮状态 */
        private bindSysytemSwitch2Function(): void
        {
            let map = this._systemId2Function = new ds.StringMap<Function>();
            map.put(emSystemSwitchType.ActivityAchieve, this.checkSevenDayAchiveOpenState);
            map.put(emSystemSwitchType.ZeroBuy, this.checkZeroBuyActState);
            map.put(emSystemSwitchType.LimitChargeGift, this.checkLimitGiftActState);
            map.put(emSystemSwitchType.ActivityLogin, this.checkSevenDayLoginOpenState);
            map.put(emSystemSwitchType.FirstPay, this.checkFirstPayState);
            map.put(emSystemSwitchType.DailyFirstPay, this.checkDayFirstPayState);
            map.put(emSystemSwitchType.PayRebate, this.checkActivityRebateOpenState);
            map.put(emSystemSwitchType.LimitTimeAct, this.checkTimeLimitActivityOpenState);
            map.put(emSystemSwitchType.Fund, this.checkMonthFundOpenState);
            map.put(emSystemSwitchType.SonOfDestiny, this.checkSonOfDestinyOpenState);
            map.put(emSystemSwitchType.Peak, this.checkPeakOpenState);
            map.put(emSystemSwitchType.WarOrder, this.checkWarOrderState);
        }

        /** 将主城按钮与系统功能id关联起来 */
        private bindSystemSwitch2Btn(): void
        {
            this._systemId2BtnsMap = new ds.StringMap<component.UIButton[]>();

            this.__bindSystemSwitch2Btn(this.btnTreasure, Pro.emSystemSwitchType.Treasure, true);
            this.__bindSystemSwitch2Btn(this.btnWelfare, Pro.emSystemSwitchType.Weal, true);
            this.__bindSystemSwitch2Btn(this.btnPay, Pro.emSystemSwitchType.Pay, true);
            this.__bindSystemSwitch2Btn(this.VedioBtn, Pro.emSystemSwitchType.Video, false);
            this.__bindSystemSwitch2Btn(this.btnDragonBall, Pro.emSystemSwitchType.DragonBall, false);

            // this.__bindSystemSwitch2Btn(this.HomeSpaceBtn, Pro.emSystemSwitchType.HomeSpace); //家园
            //this.__bindSystemSwitch2Btn(this.btn_sevenDayProgress, Pro.emSystemSwitchType.ActivityAchieve);//7日目标
            //this.__bindSystemSwitch2Btn(this.btn_sevenDayLogin, Pro.emSystemSwitchType.ActivityLogin);//7日登陆
        }
        private __bindSystemSwitch2Btn(btn: component.UIButton, systemId: Pro.emSystemSwitchType, isTopBtns: boolean = false): void
        {
            let btns = this._systemId2BtnsMap.get(systemId);
            if (!btns)
            {
                btns = [btn];
                this._systemId2BtnsMap.put(systemId, btns);
            } else
            {
                btns.push(btn);
            }
            btn["bindSystemId"] = systemId;
            btn["$isTopBtns"] = isTopBtns;  //是否为顶部图标， 顶部图标系统未开启时，强制隐藏，并且需要刷新列表显示位置
        }

        /** 检查功能开放 */
        private checkSystemOpenState(btn: component.UIButton): boolean
        {
            let systemId: number = btn["bindSystemId"];
            if (!systemId) { return true; }
            return PlayerDataMgr.checkSystemSwitchOpen(systemId, true);
        }

        //-----------------------------------红点------------------------------------
        private _reddotBindCtl: ReddotBindImageController = new ReddotBindImageController();
        /** 将红点图片与红点数据模型关联 */
        private initRedDotModel(): void
        {
            this.unInitRedDotModel();

            this._reddotBindCtl.bind(this.imgFriendRedDot, FriendDataMgr.reddotModel);
            this._reddotBindCtl.bind(this.MailRedDotImg, MailDataMgr.reddotModel);
            this._reddotBindCtl.bind(this.TaskRedDodtImg, AchieveDataMgr.reddotModel);
            this._reddotBindCtl.bind(this.reddotTreasure, TreasureDataMgr.reddotModel);
            this._reddotBindCtl.bind(this.reddotFirstPay, ActivityDataMgr.reddotModel.getChildModel("firstPay"));
            this._reddotBindCtl.bind(this.reddotDayFirstPay, PrivilegeDataMgr.reddotModelDailyCharge);
            this._reddotBindCtl.bind(this.imgVedioRedDot, VideoDataMgr.reddotModel);
            this._reddotBindCtl.bind(this.reddotFund, ActivityDataMgr.reddotModel.getChildModel("monthFund"));
            this._reddotBindCtl.bind(this.reddotShortTimeGift, ActivityDataMgr.reddotModel.getChildModel("limitTimeGift"));
            this._reddotBindCtl.bind(this.reddotZeroBuy, ActivityDataMgr.reddotModel.getChildModel("zeroBuy"));
            this._reddotBindCtl.bind(this.reddotLimitCharge, ActivityDataMgr.reddotModel.getChildModel("limitCharge"));
            this._reddotBindCtl.bind(this.reddotSonOfDestiny, AchieveDataMgr.reddotModelSonOfDestiny);
            this._reddotBindCtl.bind(this.reddotPeak, TrainDataMgr.reddotModelPeak);
            this._reddotBindCtl.bind(this.redRedEnvelope, RedEnvelopeDataMgr.reddotModel);
            this._reddotBindCtl.bind(this.reddotWarOrder, AchieveDataMgr.reddotModelWarOrder);
            this._reddotBindCtl.bind(this.reddotWeekWelfare, ActivityDataMgr.reddotModel.getChildModel("luckyEgg"))
            this._reddotBindCtl.bindList(this.reddotNewYear, RedEnvelopeDataMgr.reddotModel, ActivityDataMgr.reddotModel.getChildModel("SpringFestivalLogin").getChildModel(0));
            this._reddotBindCtl.bindList(this.reddotLiuYi, ActivityDataMgr.reddotModel.getChildModel("SpringFestivalLogin"), ActivityDataMgr.reddotModelCommonGrp.getChildModel(19))

            this._reddotBindCtl.bindList(this.reddotDuanwu, ActivityDataMgr.reddotModel.getChildModel("SpringFestivalLogin"), ActivityDataMgr.reddotModelCommonGrp.getChildModel(22))


            this._reddotBindCtl.bindList(this.reddotDragonBall, DragonBallDataMgr.reddotModel, ActivityDataMgr.reddotModelCommonGrp.getChildModel(3));
            this._reddotBindCtl.bindList(this.imgReddotWelfare, WealDataMgr.reddotModel,
                ActivityDataMgr.reddotModel.getChildModel("gradeFund"), ActivityDataMgr.reddotModel.getChildModel("upgradeGift"),
                ActivityDataMgr.reddotModel.getChildModel("countTimes"), ActivityDataMgr.reddotModel.getChildModel("limitExchange"));
            // 7天登陆
            // getChildModel(0)表示取第一个7天登陆活动红点值
            this._reddotBindCtl.bind(this.reddotSevenLogin, ActivityDataMgr.reddotModel.getChildModel("sevenDayLogin").getChildModel(0));
            // 春节累登
            this._reddotBindCtl.bind(this.reddotCumulativeLogin, ActivityDataMgr.reddotModel.getChildModel("SpringFestivalLogin"));
            // 7日目标
            this._reddotBindCtl.bind(this.reddotSevenAchieve, AchieveDataMgr.reddotModelSevenDay);
            this._reddotBindCtl.bindList(this.imgReddotPay, PrivilegeDataMgr.reddotModel, PrivilegeDataMgr.reddotModelMonthCard);
            //迎新战令
            this._reddotBindCtl.bindList(this.redWelcomeWarOrder, ActivityDataMgr.reddotModel.getChildModel("welcomeWarOrderRed"));
            //进阶战令
            this._reddotBindCtl.bindList(this.redEvolutionWarOrder, ActivityDataMgr.reddotModel.getChildModel("evolutionWarOrderRed"));
            //通用限时活动组的红点
            let actGrpList = cfg.ActivityCommonGroupCfgData.getAll();
            for (let grpCfg of actGrpList)
            {
                let btn: ProUI.Scene.City.Utils.ActivityEnterButtonUI = this["actGroupBtn_" + grpCfg.groupID];
                if (!btn) { continue; }
                this._reddotBindCtl.bind(btn.reddot, ActivityDataMgr.reddotModelCommonGrp.getChildModel(grpCfg.groupID));
            }
        }

        private unInitRedDotModel(): void
        {
            this._reddotBindCtl.cleanUp();
        }

        private onExCxPayStatUPdate()
        {
            if (PlatformData.platformType != PlatformData.EnumPlatformType.wx_cx)
            {
                return;
            }
            var isCanPau = qingjs.instance.canPay()
            this.TopLayer1.visible = isCanPau;
            this.TopLayer2.visible = isCanPau;
            this.TopLayer3.visible = isCanPau;
            this.TopLayer4.visible = isCanPau;
            this.TopLeftLayer.visible = isCanPau;
            this.mapInfo.onExCxPayStatUPdate();
        }

        /**
         * destroy
         */
        public destroy(destroyChild: boolean = true)
        {
            this.effShotTimeGift.stop();
            super.destroy(destroyChild)
        }

    }
}