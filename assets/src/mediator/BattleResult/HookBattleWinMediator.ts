
module Pro
{
    /*
     * 挂机战斗奖励面板
     */
    export class HookBattleWinMediator extends BaseMediator implements IMediator
    {
        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("rewardpopup")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return [];
        }

        private CountDown = 5;
        public UIPanel: ProUI.BattleResult.HookWinUI;

        public openUI(): void
        {
            this.showPanel(ProUI.BattleResult.HookWinUI, 1, BaseAddLayer.TopUI, true);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            Laya.timer.clear(this, this.onCountDownTimer);

            super.closeUI();
            this.showEffRewardFly()
            if (GuideMgr.Inst.getGuideStatue(false, false))
            {
                //前期引导中，触发下一步引导
                GuideMgr.Inst.onReActiveGuideByFight();
            } else
            {
                // let resultData = this.UIOpenData.customObject as Pb_God.PBFightResult;
                //检查是否有功能引导是需要在关卡结束时开启的（比功能开放开关控制晚）
                FuncGuideMgr.Inst.checkGuideByHookStage(HookDataMgr.getStageID());
                //有升级提示的时候，等升级界面结束后再处理后面相同的内容
                if (!UIManager.Inst.checkUIShowState(PanelNotify.Open_PlayerLevelUp, true))
                {
                    //是否有功能开放等着的
                    FuncGuideMgr.Inst.checkStartFuncOpenGuide();

                }
            }
        }

        // 奖励动画
        public showEffRewardFly()
        {
            let resultData = this.UIOpenData.customObject as Pb_God.PBFightResult;
            for (let i = 0; i < resultData.prize.length; i++) 
            {
                let itemUI = this.UIPanel.RewardList.getCell(i);
                if(itemUI)
                {
                    let itemPoint = itemUI.localToGlobal(new Point(itemUI.width / 2, itemUI.height / 2));
                    EventMgr.trigger(EventNotify.Award_Effect_Fly, resultData.prize[i], itemPoint);
                }
            }
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.getDarkUI().graphics.clear();
            this.getDarkUI().graphics.drawRect(0, 0, this.getDarkUI().width, this.getDarkUI().height, "#2d2629");
            this.getDarkUI().alpha = 0.85;
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            // this.UIPanel.btnHitDetail.onClick(this, this.onClickHitDetail);
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnNext.onClick(this, this.onClickNext);
            this.UIPanel.btnTextAuto.onClick(this, this.onBtnTextAutoClick);
            this.UIPanel.btnAuto.onClick(this, this.onBtnAutoClick);
            this.UIPanel.btnEnd.onClick(this, this.onBtnEndClick);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 点击自动下一关 */
        private onClickNext(): void
        {
            // let isWatching = this.UIOpenData.customObject2;
            // logI("isWatching", isWatching);
            let resultData = this.UIOpenData.customObject as Pb_God.PBFightResult;
            let curStage = resultData.base.id;
            //判断是否还有下一关
            if (curStage >= cfg.HookStageCfgData.getMaxStageId())
            {
                TipsUtils.showTipsByLanId("hook_msg18"); //最大关卡
                this.closeUI();
                return;
            }
            //下一关状态
            let nextStageID = curStage + 1;
            let limitLevel = cfg.HookStageCfgData.getNeedPlayerLevelByStageID(nextStageID);
            if (PlayerDataMgr.level < limitLevel)
            {
                TipsUtils.showTipsByLanId("hook_msg20", limitLevel); //达到n级后可继续挑战
                this.closeUI();
                return;
            }
            this.closeUI(); //先把界面关掉，后面方便判断当前还有没有其它界面打开
            if (GuideMgr.Inst.getInAllShowGuide())
                return;

            //是否需要隐藏进入
            //隐藏战斗方式 0-不隐藏，直接显示， 1- 隐藏进入后台播放，可切换打开  2-进入战斗，但不清理当前显示的UI
            let hidestate = 2;
            if (FunInfo.SelectIndex != 3)
            { //当前没有停在挂机界面上
                hidestate = 1;
            }
            // else if (UIManager.Inst.getIsShowingUI()) hidestate = 2;
            BattleMgr.Inst.createNormalBat(Pb_God._emBattleType.BattleType_Hook, nextStageID, 0, Pb_God._emZhenfaType.ZhenfaType_Zhuxian, false, hidestate + "");

        }

        // /** 点击伤害统计 */
        // private onClickHitDetail(): void {
        //     UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_BattleFightStatistics, [null, this.UIOpenData.customObject]));
        // }
        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            SoundMgr.Inst().playSound("battle_success");

            //是否开启下一关功能
            let openNext = PlayerDataMgr.checkSystemSwitchOpen(emSystemSwitchType.StageBattleNext, false);
            this.UIPanel.btnNext.visible = this.UIPanel.btnNext.layoutEnabled = openNext;
            this.UIPanel.hboxBtns.refresh();
            this.UIPanel.hboxAuto.refresh();

            let resultData = this.UIOpenData.customObject as Pb_God.PBFightResult;
            //奖励列表显示
            let itemList = resultData.prize;
            this.UIPanel.RewardList.onRefresh(itemList.length, this, (itemUI: NorItemUI, index: number) =>
            {
                let tempInfo = itemList[index];
                itemUI.setItemID(tempInfo.itemid, tempInfo.itemcount.toNumber(), true);
            });

            //玩家经验变化
            // Global.setResIconWithItemID(this.UIPanel.iconHead, CfgID.ResType.Player_Icon, ShapeDataMgr.iconId);
            this.UIPanel.PlayerIconInfo.setSimpleInfo(ShapeDataMgr.iconId, ShapeDataMgr.iconFrameID, PlayerDataMgr.gender, PlayerDataMgr.level);
            this.UIPanel.PlayerIconInfo.spLv.visible = false;
            this.UIPanel.PlayerIconInfo.txtLv.visible = false;
            this.UIPanel.txtLv.text = "Lv." + PlayerDataMgr.level;
            let curExp = Global.getItemNum(CfgID.ItemID.Exp);
            let maxExp = cfg.PlayerLevelCfgData.getNeedExpByLevel(PlayerDataMgr.level);
            Global.setProgressBarMask(this.UIPanel.imgExpProgress, curExp / maxExp);
            this.UIPanel.txtExpProgress.text = curExp + "/" + maxExp;

            //当前战斗
            let stage = resultData.base.id;
            let sceneId = cfg.HookStageCfgData.getSceneIDByStageID(stage);
            let curName = cfg.HookSceneCfgData.getSceneNameBySceneID(sceneId) + stage;
            this.UIPanel.txtFightName.text = Global.getLangStr("fight_msg49", curName);


            //mvp数据
            let hitValue = -1000;
            let hitTotalValue = 0;
            let mvpPetSn: Long;
            for (let friendstate of resultData.friendstate)
            {
                let hit = friendstate.damage.toNumber();
                hitTotalValue += hit;
                if (hitValue < hit)
                {
                    mvpPetSn = friendstate.petsn;
                    hitValue = hit;
                }
            }

            let mvpPetSkinId = 0;
            for (let battlepet of resultData.base.friend.battlepet.battlepet)
            {
                if (battlepet.pet.display.sn.equals(mvpPetSn))
                {
                    mvpPetSkinId = battlepet.pet.display.useskinid;
                    break;
                }
            }

            this.UIPanel.txtHitValue.text = hitValue + "(" + Global.parsePercentNum(hitValue / hitTotalValue, 2) + ")";
            this.UIPanel.txtHeroName.text = cfg.PetSkinCfgData.getFileNameById(mvpPetSkinId);
            // let sourceId = cfg.PetCfgData.getSkinInfoByPetID(mvpPetSkinId).id;
            Global.setResBigCard(this.UIPanel.imgShape, cfg.PetSkinCfgData.getBigCardById(mvpPetSkinId)); // `res/Unpack/Icon/HalfShape/${ sourceId }.png`;
            this.UIPanel.imgShape.y = 550;
            this.UIPanel.imgShape.x = 1200;
            Laya.Tween.to(this.UIPanel.imgShape, { x: 890 }, 300);


            this.UIPanel.TimeLb.visible = !GuideMgr.Inst.getInShowGuide();
            if (!GuideMgr.Inst.getInShowGuide())
            {
                this.CountDown = 5;
                this.UIPanel.TimeLb.text = Global.getLangStr("common_closeCd", this.CountDown);
                Laya.timer.loop(1000, this, this.onCountDownTimer);
            }

            this.updateBoxsView();
            SoundMgr.Inst().playSound("get_things");
        }


        /**
         * 更新box显示 涉及月卡自动挑战功能
         */
        private updateBoxsView()
        {
            let packetType = Pb_God._emPrivilegeDailyPacket.PrivilegeDailyPacket_RRMonth;
            //对应特权卡类型
            let cardType = cfg.PrivilegeDailyPrizeCfgData.getNeedCardIDByType(packetType);
            //当前是否已经激活
            let isActive = PrivilegeDataMgr.getPrivilegeCardValid(cardType);

            //是否开启下一关功能
            let openNext = PlayerDataMgr.checkSystemSwitchOpen(emSystemSwitchType.StageBattleNext, false);
            if (openNext)
            {
                this.UIPanel.btnTextAuto.visible = !isActive;
                this.UIPanel.hboxBtns.visible = !isActive;
                this.UIPanel.hboxAuto.visible = isActive;
            }
        }

        private onBtnTextAutoClick()
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_PayMain, 2));
            this.closeUI();
        }

        private onBtnAutoClick()
        {
            BattleMgr.Inst.autoHookState = true;
            this.onClickNext();
        }

        private onBtnEndClick()
        {
            BattleMgr.Inst.autoHookState = false;
            this.closeUI();
        }

        protected clickSpaceFunc()
        {
            if (this.UIPanel.hboxAuto.visible)
            {
                BattleMgr.Inst.autoHookState = true;
                this.onClickNext();
            }
            else
            {
                this.closeUI();
            }
        }

        private onCountDownTimer(): void
        {
            this.CountDown--;
            this.UIPanel.TimeLb.text = Global.getLangStr("common_closeCd", this.CountDown);
            if (this.CountDown < 0)
            {
                this.clickSpaceFunc();
            }
        }

        public refreshUI()
        {

        }
    }
}