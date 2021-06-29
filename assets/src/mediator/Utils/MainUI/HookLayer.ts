module Pro
{
    /**
    * 主界面中，挂机分页视图
    * @author jason.xu
    */
    export class HookLayer extends ProUI.Scene.City.Utils.HookLayerUI
    {

        constructor()
        {
            super();

            this.on(Laya.Event.DISPLAY, this, () =>
            {
                this.controllEvents(false);
            });
            this.width = GameConfig.WinWidth/*GameConfig.curWidth()*/;
            this.height = GameConfig.WinHeight/*GameConfig.curHeight()*/;

            this.adjustScreenPos();

            this.addEvents();
        }

        //---------------------------------------Event------------------------------------
        /** 控制消息监听器 */
        private controllEvents(isOff: boolean = true)
        {
            Global.EventsNotifyControl(this.listensEvents(), isOff);
            if (!isOff)
            {
                this.on(Laya.Event.UNDISPLAY, this, this.controllEvents);
                this.refreshUI();
            }
            else
            {
                this.unInitRedDotModel();
            }
        }

        testHideUI()
        {
            common.DisplayUtils.removeFromParent(this.HookRightTop);
            common.DisplayUtils.removeFromParent(this.hookTopBtnsBox);
            common.DisplayUtils.removeFromParent(this.TaskBtn);
            common.DisplayUtils.removeFromParent(this.TaskRedDotImg);
            common.DisplayUtils.removeFromParent(this.PassRewardBtn);
            common.DisplayUtils.removeFromParent(this.PassRewardRedDotImg);
            common.DisplayUtils.removeFromParent(this.WorldLvBtn);
            common.DisplayUtils.removeFromParent(this.SailBtn);
            common.DisplayUtils.removeFromParent(this.SailProImg);
            common.DisplayUtils.removeFromParent(this.imgSailReddot);
            common.DisplayUtils.removeFromParent(this.SailBGImg);
            common.DisplayUtils.removeFromParent(this.SailProLb);
            common.DisplayUtils.removeFromParent(this.firstPayTips);
            common.DisplayUtils.removeFromParent(this.HookLeftTop);
            common.DisplayUtils.removeFromParent(this.LevelTarget);
            common.DisplayUtils.removeFromParent(this.HookInfo);
            // this.addChild(this.battleLayer);
        }

        /** 本类监听消息列表 */
        private listensEvents(): Array<any>
        {
            return [
                EventNotify.PlayerLevelChange, this, this.refreshWorldLevelBtn,
                EventNotify.PlayerItemNumChange, this, this.onItemNumChange,
                EventNotify.City_MRole_HookKill, this, this.City_MRole_HookKill,
                EventNotify.Fight_Hook_Changed, this, this.onFightHookChanged,
                EventNotify.Embattle_Save, this, this.onEmbattleSave,
                EventNotify.System_Switch_Open_Update, this, this.refreshSystemOpenState,
                EventNotify.Screen_Resize, this, this.adjustScreenPos
            ]
        }

        public show(isShow: boolean): void
        {
            this.visible = isShow;
            if (isShow)
            {
                let batWatchType = BattleMgr.Inst.getWatchBattleType();
                this.HookLeftTop.visible = batWatchType == -1;
                this.HookInfo.visible = batWatchType == -1;
                this.battleLayer.visible = batWatchType == -1;

                this.HookInfo.visible && (this.HookInfo.refreshUI());
                // this.sceneInfoLayer.visible = batWatchType == -1;
                // this.UIPanel.HookInfo.setShowState(batWatchType == -1)
            } else
            {
                this.HookInfo.leaveHookLayer();
            }
            this.battleLayer.controlLogicResume(isShow);
        }

        /** 初始化 */
        public initUI()
        {
            this.HookInfo.init();
            this.LevelTarget.init();
            this.initTimeLimitActivityBtns();
            this.resetAritfactInfoPosY(WealDataMgr.getOnlinePrizeOver() ? 0 : 127);

            Laya.timer.callLater(this, this.refreshHookTopBtns);
        }



        private adjustScreenPos()
        {
            this.HookRightTop.top = GameConfig.getBangsTop();
            this.HookLeftTop.y = this.HookLeftTop.y + GameConfig.getBangsTop();
            this.battleLayer.adjustScreenPos();
        }

        /** 刷新挂机界面顶部按钮显示排列 */
        private refreshHookTopBtns(): void
        {
            let index = 0;
            for (let el of this.hookTopBtnsBox._children)
            {
                if (el.visible)
                {
                    el.x = (index < 2 ? -105 : -111) * index++;
                }
            }
        }

        /** 重新排列元灵头像的位置显示
         * 在线礼包按钮的位置，影响了神器进度的位置（本来是可以用vbox排版的，但是在线礼包的按钮在战斗中也需要显示，所以抽离出来了）
         */
        public resetAritfactInfoPosY(ny: number): void
        {
            // this.ArtifactInfo.y = ny;
            this.LevelTarget.y = ny;
        }

        private addEvents(): void
        {
            this.SailBtn.onClick(this, () =>
            {
                if (!PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.Sail, true))
                { return; }
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Sail));
            });

            this.TaskBtn.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Task));
            });

            this.PassRewardBtn.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new StagePrizeOpenUIData(Pb_God._emBattleType.BattleType_Hook));
            });

            this.WorldLvBtn.onClick(this, () =>
            {
                WorldLvHelpView.show(this.WorldLvBtn);
            });

            this.ChapterMapBtn.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HookChapterMap), BaseBackUIType.HideBackUI);
            });

        }

        /**
         * 帧驱动
         * @param isSecond 帧驱动 每满1秒时，会有一个true
         */
        public updateFrame(isSecond: boolean): void
        {
            if (isSecond && this.HookInfo.visible)
            {
                this.HookInfo.updateUI();
            }
            if (this.battleLayer.visible)
            {
                this.battleLayer.updateFrame();
            }
        }

        /** 唤起界面时刷新视图 */
        public refreshUI(): void
        {
            this.initRedDotModel();
            //刷新资源
            this.onItemNumChange(CfgID.ItemID.SailPoint, Global.getItemNum(CfgID.ItemID.SailPoint));

            this.refreshWorldLevelBtn();
            this.checkTimeLimitActivityOpenState();

            this.HookInfo.refreshUI();
            this.LevelTarget.refreshUI();
            this.firstPayTips.refreshUI();
        }

        /** 功能开放通知 */
        private refreshSystemOpenState(systemId: number = -1): void
        {
            if (systemId == emSystemSwitchType.LimitTimeAct)
            {
                this.checkTimeLimitActivityOpenState();
            }
        }

        private _commonActBtns: ProUI.Scene.City.Utils.ActivityEnterButtonUI[];
        /** 初始化通用的限时活动按钮显示 */
        private initTimeLimitActivityBtns(): void
        {
            if (this._commonActBtns)
            {
                return;
            }
            this._commonActBtns = [];
            let actGrpList = cfg.ActivityCommonGroupCfgData.getAll();
            for (let grpCfg of actGrpList)
            {
                if (!grpCfg.hookShow)
                {
                    continue;
                }
                let btn = new ProUI.Scene.City.Utils.ActivityEnterButtonUI();
                this._commonActBtns.push(btn);
                btn["$bindData"] = grpCfg;
                btn.visible = false;
                btn.skin = `res/Unpack/activityMainBtns/${ grpCfg.mainIcon }.png`;
                btn.y = -12;
                this.hookTopBtnsBox.addChild(btn);
                //特效
                if (grpCfg.mainEff == "ui_timeLimitActBtn")
                { //牛逼特效
                    EffectMgr.Inst.createLoopEffect(grpCfg.mainEff, new Point(42, 42), null, 1, 1, btn.effPos, ResReleaseType.Reference, false);
                } else if (grpCfg.mainEff == "circle")
                { //转圈圈特效
                    btn.effPos.addChild(new ProUI.Scene.City.Utils.aniActBtnEffectUI());
                }
                // eslint-disable-next-line no-loop-func
                btn.onClick(this, () =>
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_TimeLimitActivity, grpCfg.groupID, 0));
                })
            }
        }
        /**
         * 检测限时活动开启状态
         */
        private checkTimeLimitActivityOpenState(): void
        {
            let sysOpen = PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.LimitTimeAct);
            for (let btn of this._commonActBtns)
            {
                let grpCfg = btn["$bindData"] as cfg.ActivityCommonGroupCfgInfo;
                //检查是否有活动正在开启中的
                let actOpen = false;
                if (sysOpen)
                {
                    actOpen = ActivityDataMgr.checkCommonGroupActivityOpen(grpCfg.groupID);
                }
                if (PlatformData.platformType == PlatformData.EnumPlatformType.wx_cx)
                {
                    if (!qingjs.instance.canPay())
                    {
                        actOpen = false;
                    }
                }
                btn.visible = actOpen;
            }
            Laya.timer.callLater(this, this.refreshHookTopBtns);
        }

        /** 关卡变更 */
        private onFightHookChanged(): void
        {
            let stageId = HookDataMgr.getStageID();
            if (this.HookInfo.visible)
            {
                this.HookInfo.resetHookStageId(stageId);
            }
            if (this.battleLayer.visible)
            {
                this.battleLayer.resetHookStageId(stageId);
            }
            // if (this.sceneInfoLayer.visible) this.sceneInfoLayer.resetHookStageId(stageId);
        }


        /** 阵法发生变更 */
        private onEmbattleSave(zhenfaType: Pb_God._emZhenfaType)
        {
            if (zhenfaType != Pb_God._emZhenfaType.ZhenfaType_Zhuxian)
            {
                return;
            }
            if (this.battleLayer.visible)
            {
                this.battleLayer.resetEmbattleInfo();
            }
        }


        /** 刷新世界等级按钮状态 */
        private refreshWorldLevelBtn(): void
        {
            // let isShow = CommonDataMgr.worldLevel >= 50;
            let isShow = PlayerDataMgr.level >= 50;
            this.WorldLvBtn.visible = isShow;
            this.WorldLvBtn.layoutEnabled = isShow;
        }


        /** 角色消耗品变化 */
        private onItemNumChange(fID: number, tempNewNum: number)
        {
            if (fID == CfgID.ItemID.SailPoint)
            {

                this.SailProLb.text = tempNewNum.toString();

                //计算进度    :策划要求进度不在显示
                // let tmpPro = Math.min(tempNewNum / SailDataMgr.getSailMaxPoint(), 1);
                // this.SailProImg.mask.graphics.clear();
                // this.SailProImg.mask.graphics.drawPie(40, 40, 40, 0, tmpPro * 359.9, "#ff0000");
            }
        }

        /** 主角挂机场景击杀怪物 */
        private City_MRole_HookKill(attackSn: Long, beHit: CityRole)
        {
            //显示金币掉落效果
            let tmpEffStartPos = beHit.localToGlobal(SkillUtil.getEffPos(beHit.getResourceID(), 3));
            tmpEffStartPos.y -= GameConfig.WinCenterY / 2;
            let tmpEffEndImage = this.HookInfo.GetRewardBox;
            let tmpEffEndPos = tmpEffEndImage.localToGlobal(new Laya.Point(tmpEffEndImage.width / 2, tmpEffEndImage.height / 2)); tmpEffEndPos.y -= GameConfig.WinCenterY / 2;
            EffectMgr.Inst.showEff_HookCoin(tmpEffStartPos, tmpEffEndPos, this);

            //伤害效果
            let tmpUIStartPos = beHit.localToGlobal(SkillUtil.getEffPos(beHit.getResourceID(), 2));
            tmpUIStartPos.y -= GameConfig.WinCenterY / 2;
            let tmpPetInfo = PetDataMgr.getPetInfo(attackSn);
            let tmpAttackValue = Global.getAtterValue(tmpPetInfo.attr, Pb_God._emBattleAttribute.BattleAttribute_Attack);
            EffectMgr.Inst.showUI_DamageNumUp(-tmpAttackValue, "", EnumNumTypes.PHYSICAL_ATTACK, tmpUIStartPos, 1, this);
        }


        //-----------------------------------红点------------------------------------
        private _reddotBindCtl: ReddotBindImageController = new ReddotBindImageController();
        /** 将红点图片与红点数据模型关联 */
        private initRedDotModel(): void
        {
            this.unInitRedDotModel();

            this._reddotBindCtl.bind(this.TaskRedDotImg, AchieveDataMgr.reddotModel);
            this._reddotBindCtl.bind(this.PassRewardRedDotImg, HookDataMgr.reddotModelPassReward);
            this._reddotBindCtl.bind(this.imgSailReddot, SailDataMgr.reddotModel);
            // 限时活动红点
            for (let btn of this._commonActBtns)
            {
                let grpCfg = btn["$bindData"] as cfg.ActivityCommonGroupCfgInfo;
                this._reddotBindCtl.bind(btn.reddot, ActivityDataMgr.reddotModelCommonGrp.getChildModel(grpCfg.groupID));
            }
        }

        private unInitRedDotModel(): void
        {
            this._reddotBindCtl.cleanUp();
        }

    }
}