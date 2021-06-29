module Pro
{
    /**
     * 挂机战斗
     */
    export class HookInfo extends ProUI.Scene.City.Utils.HookInfoUI
    {

        private Eff_hook_show: EffNode = null;
        //宝箱skeleton
        public treasureChest: SkeletonPlayer;
        constructor()
        {
            super();
            this.on(Laya.Event.DISPLAY, this, () =>
            {
                this.controllEvents(false);
            });
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
                if (this.Eff_hook_show != null)
                {
                    // this.Eff_hook_show.removeSelf();
                    EffectMgr.Inst.releaseEffect(this.Eff_hook_show);
                    this.Eff_hook_show = null;
                }
            }
        }

        /** 本类监听消息列表 */
        private listensEvents(): Array<any>
        {
            return [
            ]
        }

        //-------------------------------------Event Fun-----------------------------
        /** 初始化 */
        public init()
        {
            let sk = new Pro.SkeletonPlayer();
            sk.load(Pro.UrlMgr.getSpineSceneUrl("UIeffect/tiaozhanguanka"));
            this.btnAtkBoss.addChild(sk);
            sk.playByIndex(1, true);
            sk.pos(118, 33);
            sk.scale(2, 2.1);

            this.bubbleTips.bg.scaleX = 1; //箭头要从右指到左
            this.bubbleTips.showTime = 1;

            this.GoNewMapBtn.onClick(this, () =>
            {
                HookSend.flyNewScene();
            });

            if (!this.treasureChest)
            {
                this.treasureChest = new SkeletonPlayer();
                this.GetRewardBox.addChildAt(this.treasureChest, 0);
                this.treasureChest.pos(50, 140);
                this.treasureChest.scale(-0.5, 0.5);
                this.GetRewardBox.on(LayaEvent.CLICK, this, this.onSkClick);
                this.treasureChest.on(LayaEvent.STOPPED, this, this.onSkStop);
                this.treasureChest.load(UrlMgr.getSpineSceneUrl("texiao/baoxiang/baoxiang"));
                this.treasureChest.playByIndex(0, true);
                this.treasureChest.hitArea.hit.clear();

            }

            this.GetRewardBtn.onClick(this, (e) =>
            {
                this.onSkClick(e);
            })

            this.btnAtkBoss.onClick(this, () =>
            {
                if (BattleMgr.Inst.getBatPlaceMgr(Pb_God._emBattleType.BattleType_Hook))
                {
                    TipsUtils.showTipsByLanId("tips_msg56");
                    return;
                }
                // this.setAutoAtk(false);
                UIManager.Inst.forceOpen(new EmbattleOpenUIData(0, Pb_God._emBattleType.BattleType_Hook));
            });

            this.QuickFightBtn.onClick(this, () =>
            {
                if (HookDataMgr.getStageID() < 3)
                {
                    TipsUtils.showTips(Global.getLangStr("tips_msg60", cfg.HookStageCfgData.getStageName(3)));
                    return false;
                }
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_QuickFight));
            });

            this.HeroStrengthBtn.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroStronger));
            });

            this.DetailBtn.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_DropInfo));
            });

            //挑战boss特效
            {
                // let tmpEffPos = new Laya.Point(this.btnAtkBoss.width / 2, this.btnAtkBoss.height / 2);
                // EffectMgr.Inst.createLoopEffect("ui_hookChallegeBoss", tmpEffPos, null, 1, 1, this.btnAtkBoss, ResReleaseType.SceneChange);
            }

        }

        // /** 设置显示状态（挂机界面和战斗中）
        //  * @param 显示挂机信息
        //  */
        // public setShowState(showHookInfo: boolean): void {
        //     this.hookInfoView.visible = showHookInfo;
        //     if (showHookInfo) this.bg.height = 317;
        //     else this.bg.height = 117;
        // }

        /**
                * 点击后随即播放动作 其中没有loop的动作播放完成后 播放standby_loop
                * @param e
                */
        private onSkClick(e: LayaEvent)
        {


            if (HookDataMgr.getStageID() < 1)
            {
                TipsUtils.showTips(Global.getLangStr("tips_msg60", cfg.HookStageCfgData.getStageName(1)));
                return false;
            }

            if (HookDataMgr.getHookRewardTime() < HookDataMgr.getRewardDurtion())
            {
                if (GuideMgr.Inst.getInStep() == GuideStep.HookReward_12_3)
                {
                    GuideMgr.Inst.jumpActive(GuideStep.HookReward_12_4); //接着会有执行next.
                }
                TipsUtils.showTipsByLanId("tips_msg55");
                return;
            }

            //远航上限判断
            if (HookDataMgr.getHookRewardOutOfSailLimit())
            {
                let tmpSailNum = Global.getItemNum(CfgID.ItemID.SailPoint);
                let tmpSailMax = SailDataMgr.getSailMaxPoint();
                AlertShow.showConfirmAlert(Global.getLangStr("sail_limit_tips", tmpSailNum + "/" + tmpSailMax), this, () =>
                {
                    this.treasureChest.playByIndex(1, false);
                });
            }
            else
            {
                this.treasureChest.playByIndex(1, false);
            }
        }

        private onSkStop(e: LayaEvent)
        {
            HookSend.profit();
            this.treasureChest.playByIndex(0, true);
        }

        /**挂机奖励数据 */
        public cruiseReward()
        {
            let tmpSceneID = HookDataMgr.getSceneID();
            let tmpCurrStageId = HookDataMgr.getStageID() > 0 ? HookDataMgr.getStageID() : 1;
            let tmpSceneInfo = cfg.HookSceneCfgData.getInfo(tmpSceneID);
            let tmpInfoSIndex = 0;
            let tmpHookList = cfg.HookNormalDropInfoCfgData.getDataAll();
            for (let i = 0; i < tmpHookList.length; i++)
            {
                let tmpInfo = tmpHookList[i];
                if (tmpCurrStageId >= tmpInfo.stage)
                {
                    tmpInfoSIndex = i;
                }

            }
            let tmpStageInfo = tmpHookList[tmpInfoSIndex];
            let tmpDropList = cfg.HookNormalDropInfoCfgData.getItemIDAryByIndex(tmpStageInfo.index);
            // let tmpDropList = cfg.ArtifactActiveCfgData.getAddPrizeAryById(tmpStageInfo.index);
            this.ItemList.onRefresh(tmpDropList.length, this, (itemUI: NorItemUI, itemIndex: number) =>
            {
                let tmpInfo = new Pb_God.PBItem();
                tmpInfo.itemid = tmpDropList[itemIndex].value1;
                tmpInfo.itemcount = 0;
                // itemUI.setItemID(tmpDropList[itemIndex].value1, 0, false, false, true, false, false);
                itemUI.setItemInfo(tmpInfo, false, false, true, false, false);
            });


            // let tmpRewardAry = cfg.ArtifactActiveCfgData.getAddPrizeAryById(tempCfgInfo.index);
            // itemUI.rewardItem.setItemInfo(tmpRewardAry[0]);
        }

        /** 刷新状态 */
        public refreshUI()
        {

            let tmpCurrStageId = HookDataMgr.getStageID() > 0 ? HookDataMgr.getStageID() : 1;

            // let tmpDropInfo = cfg.HookNormalDropInfoCfgData.getInfoWithStageID(tmpCurrStageId);
            // let tmpDropList = cfg.HookNormalDropInfoCfgData.getItemIDAryByIndex(tmpDropInfo.index);
            // this.ItemRewardList.onRefresh(tmpDropList.length, this, (itemUI: NorItemUI, index: number) => {
            //     itemUI.setItemID(tmpDropList[index].value1, 0, false, false);
            // });

            //策划要求不在显示章节名字
            // let sceneId = cfg.HookStageCfgData.getSceneIDByStageID(tmpCurrStageId);
            // this.imgSceneNameNum.skin = `res/Unpack/hookSceneName/guaji_font${ Global.ToFitZero(sceneId, 2) }.png`;
            // this.imgSceneName.skin = `res/Unpack/hookSceneName/guaji_font${ Global.ToFitZero(sceneId, 2) }_1.png`;
            // this.hboxSceneName.refresh();
            // //坑爹的组件，异步加载的， hbox不会刷。
            // this.imgSceneNameNum.once(Laya.Event.LOADED, this, () =>
            // {
            //     this.hboxSceneName.refresh();
            // })

            let tmpStageBossID = cfg.HookStageCfgData.getHookDropIDByStageID(tmpCurrStageId);
            let tmpHoldList = cfg.DropDropCfgData.getAddItemAryById(tmpStageBossID);
            this.HookRewardBox.onRefresh(tmpHoldList.length, this, (itemUI: ProUI.Utils.LongTroopItemUI, index: number) =>
            {
                Global.drawItemUI(itemUI, tmpHoldList[index]);
                itemUI.NumLb.text = itemUI.NumLb.text + "/m";
            });

            //详情不在显示当前关卡
            let stageId = HookDataMgr.getStageID();
            let showText = stageId >= 1 ? `第${ stageId }关` : ``;
            // this.DetailBtn.text = showText;
            this.Checkpoint.text = showText;
            this.updateUI();
            //挂机奖励
            this.cruiseReward();
        }

        /** 定时刷新 */
        public updateUI()
        {
            //下一关状态
            let tmpNextStageId = HookDataMgr.getStageID() + 1;
            let tmpHookSceneId = HookDataMgr.getSceneID();
            let tmpSceneInfo = cfg.HookSceneCfgData.getInfo(tmpNextStageId);
            let tmpSceneInfoID = cfg.HookStageCfgData.getSceneIDByStageID(tmpNextStageId);
            let tmpLimitLevel = cfg.HookStageCfgData.getNeedPlayerLevelByStageID(tmpNextStageId);

            //挂机奖励
            let tmpMaxTime = HookDataMgr.getHookRewardMaxTime();
            let tmpRewardTime = Math.min(HookDataMgr.getHookRewardTime() / 1000, tmpMaxTime);
            this.GetRewardLb.text = Global.GetRemindTime(tmpRewardTime, 3);
            this.HookProIMg.width = 116 * tmpRewardTime / tmpMaxTime;

            //下一关战斗状态
            this.GoNewMapBtn.visible = /*!isHookBat && */tmpSceneInfoID != tmpHookSceneId && tmpSceneInfo != null;
            this.btnAtkBoss.visible = !this.GoNewMapBtn.visible;
            if (this.GoNewMapBtn.visible/* || isHookBat*/)
            {
                this.AtkBossLb.text = "";
            }
            else if (tmpLimitLevel == 0)
            {
                this.btnAtkBoss.visible = false;
                this.AtkBossLb.text = Global.getLangStr("hook_msg13");
            }
            else if (PlayerDataMgr.level < tmpLimitLevel)
            {
                this.btnAtkBoss.visible = false;
                this.AtkBossLb.text = Global.getLangStr("hook_msg3", tmpLimitLevel);
            } else
            {
                this.AtkBossLb.text = "";
                // let getAtkBossTime = HookDataMgr.getNextFightTime() * 1000 - TimeController.currTimer;
                // this.btnAtkBoss.visible = getAtkBossTime <= 0;
                // this.AtkBossLb.text = getAtkBossTime > 0 ? Global.GetRemindTime(getAtkBossTime / 1000) : "";
            }
            this.AtkBossImage.visible = !!this.AtkBossLb.text;
            this.checkFreeGuideFight();
            // //冒泡tips
            // this.refreshBubbleTips();
        }

        /** 上一次引导的时间 */
        private _lastShowGuideFightTime = 0;
        /** 检查是否在空闲状态，需要指引一下挑战BOSS */
        private checkFreeGuideFight(): void
        {

            //等级限制
            if (PlayerDataMgr.level > 10)
            {
                this.resetGuideAtkBossTime();
                return;
            }

            if (GuideMgr.Inst.getGuideStatue(false, true))
            { //新手引导中
                this.resetGuideAtkBossTime();
                return;
            }
            //有界面开启中或者按钮都没有出来
            if (UIManager.Inst.getIsShowingUI() || (!this.btnAtkBoss.visible || !this.btnAtkBoss.displayedInStage))
            {
                this.resetGuideAtkBossTime();
                return;
            }

            if (!this.visible)
            {
                this.resetGuideAtkBossTime();
                return;
            }
            let currTimer = TimeController.currTimer;
            if (currTimer > this._lastShowGuideFightTime + 2 * 60 * 1000)
            {
                this.resetGuideAtkBossTime();
                FuncGuideMgr.Inst.forceOpenFuncGuide(GuideStep.Simply_HookFightBoss);
                GuideMgr.Inst.showFinger(this.btnAtkBoss, true, this.btnAtkBoss, 3, 0, 0);
                GuideMgr.Inst.setAutoNext(3000, false);
            }
        }

        private resetGuideAtkBossTime()
        {
            this._lastShowGuideFightTime = TimeController.currTimer;
        }

        // private refreshBubbleTips(): void {
        //     if (GuideMgr.Inst.getGuideStatue(false, false)) { //新手引导中
        //         this.bubbleTips.hide();
        //         this.bubbleTips.showTime = 1;  //取巧的方式，保证下次再进来时，就可以直接显示了。
        //         return;
        //     }
        //     //有界面开启中
        //     if (UIManager.Inst.getIsShowingUI()) {
        //         this.bubbleTips.hide();
        //         return;
        //     }
        //     //特权商城功能开启，快速作战特权提示
        //     if (!PlayerDataMgr.recordQuickFightPrivilge && PlayerDataMgr.checkSystemSwitchOpen(emSystemSwitchType.Pay)) {
        //         PlayerDataMgr.recordQuickFightPrivilge = 1;
        //         GameLaunch.saveClientData();

        //         this.bubbleTips.x = 140; //指向快速作战按钮
        //         this.bubbleTips.show("bubble_tips_04", 20000);
        //     }
        //     else {
        //         if (this.btnAtkBoss.visible) {
        //             let currTimer = TimeController.currTimer;
        //             let showTime = this.bubbleTips.showTime;
        //             if (showTime == 0) this.bubbleTips.showTime = currTimer + 2 * 60 * 1000;
        //             else if (showTime > 0 && showTime <= currTimer) {
        //                 this.bubbleTips.x = 372; //指向挑战BOSS按钮
        //                 this.bubbleTips.show("bubble_tips_03", 2000);
        //             }
        //         } else {
        //             // this.bubbleTips.hide();
        //         }
        //     }

        // }

        /** 离开挂机场景 */
        public leaveHookLayer(): void
        {
            this._lastShowGuideFightTime = 0;  //时间置0， 保证在下次进入界面时，可以直接显示
            // this.bubbleTips.hide();
            // this.bubbleTips.showTime = ;
        }

        /** 关卡变化 */
        public resetHookStageId(stageId: number): void
        {
            this.refreshUI();
        }

    }
}