module Pro
{
    /**
     * 右下角功能按钮集合
     */
    export class FunInfo extends ProUI.Scene.City.Utils.FunInfoUI
    {
        /** 当前切换的分页（0是主城， 3是挂机界面） */
        public static SelectIndex: number = -1;

        public static hookPage: number = 3;

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
            } else
            {
            }
        }

        /** 本类监听消息列表 */
        private listensEvents(): Array<any>
        {
            return [
                EventNotify.MainUI_BottomFun_Changed, this, this.onBottomFunChanged,
                EventNotify.System_Switch_Open_Update, this, this.refreshSystemOpenState,
                EventNotify.Award_Effect_Fly, this, this.awardEffectFly,
                EventNotify.Show_HookBtn_Pop, this, this.showHookBtnPop,
            ]
        }

        //-------------------------------------Event Fun-----------------------------
        /** 上次选中的按钮 */
        private SelectBtn: component.UIButton;

        /** 初始化 */
        public init()
        {
            this.bubbleTips.bg.scaleX = -1; //箭头要从左指到右

            this.initGrpBtns();

            this.HomeBtn.onClick(this, (btn: component.UIButton) =>
            {
                SoundMgr.Inst().playSound("menu");
                if (this.onCherkVideo()) { return; }
                this.onFunBtnClick(btn);
                BattleMgr.Inst.watchingBattleView(-1, 0);
                if (this._listenUIChangeRefreshBubble)
                {
                    this.refreshBubbleTipsView();
                }
            });

            this.FighterBtn.onClick(this, (btn: component.UIButton) =>
            {
                SoundMgr.Inst().playSound("menu");
                this.onFunBtnClick(btn);
                if (this.onCherkVideo())
                {
                    return;
                }
                UIManager.Inst.closeCurrentList();
                BattleMgr.Inst.watchingBattleView(Pb_God._emBattleType.BattleType_Hook, 1);
            });

            this.ItemBagBtn.onClick(this, (btn: component.UIButton) =>
            {
                SoundMgr.Inst().playSound("menu");
                if (this.onCherkVideo()) { return; }
                this.onFunBtnClick(btn);
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Bag), BaseBackUIType.CloseQuene);
            });

            this.HeroBagBtn.onClick(this, (btn: component.UIButton) =>
            {
                SoundMgr.Inst().playSound("menu");
                if (this.onCherkVideo()) { return; }
                this.onFunBtnClick(btn);
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroBag), BaseBackUIType.CloseQuene);
            });

            this.TraveBtn.onClick(this, (btn: component.UIButton) =>
            {
                SoundMgr.Inst().playSound("menu");
                if (!PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.Trave, true))
                { return; }
                if (this.onCherkVideo()) { return; }
                this.onFunBtnClick(btn);
                UIManager.Inst.forceOpen(new FubenOpenUIData(), BaseBackUIType.CloseQuene);
            });

            this.WeaponBtn.onClick(this, (btn: component.UIButton) =>
            {
                SoundMgr.Inst().playSound("menu");
                if (!PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.Weapon, true))
                { return; }
                if (this.onCherkVideo()) { return; }
                this.onFunBtnClick(btn);
                //判断元灵法阵是否全部激活，如果未激活，则打开待激活的元灵界面， 如果全部激活，则打开法阵界面
                if (ArtifactDataMgr.isGetAllArtiface)   // || GuideMgr.Inst.getInStep() == GuideStep.Artifact_16_3
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ArtifactAllList), BaseBackUIType.CloseQuene);
                }
                else
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Artifact), BaseBackUIType.CloseQuene);
                }
            });

            this.FactionBtn.onClick(this, (btn: component.UIButton) =>
            {
                SoundMgr.Inst().playSound("menu");
                if (!PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.Faction, true))
                { return; }
                if (this.onCherkVideo()) { return; }
                if (!this.onFunBtnClick(btn))
                {
                    return;
                }
                if (FactionDataMgr.isHaveFaction())
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FactionMain), BaseBackUIType.CloseQuene);
                }
                else
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FactionList), BaseBackUIType.CloseQuene);
                }
            });

            {
                //冒泡提示时间点： 1、刚进游戏第一次结束新手引导进到主城时， 2、每10分钟一次轮循。
                Laya.timer.loop(10 * 60 * 1000, this, this.refreshBubbleTipsView);
                this._listenUIChangeRefreshBubble = true;
                EventMgr.on(EventNotify.UI_Show_Change, this, this.refreshBubbleTipsView);
            }
        }

        public guideHookBtn(): void
        {
            FuncGuideMgr.Inst.forceOpenFuncGuide(GuideStep.Simply_HookBtn);
            GuideMgr.Inst.showFinger(this.FighterBtn, false, this.FighterBtn, 3, 0, 0);
        }

        public refreshUI()
        {
            this.refreshSystemOpenState(-1);
            this.initRedDotModel();
        }

        /** 按钮被点击效果 */
        private onFunBtnClick(btn: component.UIButton): boolean
        {
            if (this.SelectBtn == btn)
            {
                return false;
            }
            //将上次选择按钮变为未启动状态
            if (this.SelectBtn != null)
            {
                this.SelectBtn.y = this.SelectBtn == this.FighterBtn ? 68 : 76;
                (this.SelectBtn.getChildByName("bg") as Laya.Image).visible = false;
                let reddot = (this.SelectBtn.getChildByName("reddot") as Laya.Image);
                reddot.visible = reddot["$reddotVisible"];
            }

            FunInfo.SelectIndex = this._btns.indexOf(btn);
            //将本次选择按钮变为启动状态
            this.SelectBtn = btn;
            //策划要求选中的就不要亮红点了。
            var reddot = (this.SelectBtn.getChildByName("reddot") as Laya.Image);
            reddot.visible = false;

            this.SelectBtn.y = this.SelectBtn == this.FighterBtn ? 58 : 66;
            (this.SelectBtn.getChildByName("bg") as Laya.Image).visible = true;

            //点击除主城和出击之外的按钮，隐藏主城和挂机页面
            if (this.SelectBtn != this.HomeBtn && this.SelectBtn != this.FighterBtn)
            {
                BattleMgr.Inst.watchingBattleView(-1, -1);
            }
            return true;
        }

        private _btns: component.UIButton[] = [];
        private initGrpBtns(): void
        {
            this._btns = [
                this.HomeBtn,
                this.HeroBagBtn,
                this.ItemBagBtn,
                this.FighterBtn,
                this.TraveBtn,
                this.FactionBtn,
                this.WeaponBtn
            ]
        }
        private onBottomFunChanged(btnIndex: number)
        {
            let btn = this._btns[btnIndex];
            if (btn) { btn.activeEvent(); }
        }

        private awardEffectFly(itemInfo: cfg.AddItemInfo, startPos: Laya.Point)
        {
            if (itemInfo.itemid != CfgID.ItemID.Gold && itemInfo.itemid != CfgID.ItemID.Diamond && itemInfo.itemid != CfgID.ItemID.PetExp && itemInfo.itemid != CfgID.ItemID.Exp)
            {
                let endPos = this.ItemBagBtn.localToGlobal(new Laya.Point(this.ItemBagBtn.width / 2, this.ItemBagBtn.height / 2));
                Pro.EffectAni.Inst.showEff_Reward_Fly(startPos, endPos, itemInfo);
            }
            else if (itemInfo.itemid == CfgID.ItemID.PetExp || itemInfo.itemid == CfgID.ItemID.Exp)
            {
                let heroEndPos = this.HeroBagBtn.localToGlobal(new Laya.Point(this.HeroBagBtn.width / 2, this.HeroBagBtn.height / 2));
                Pro.EffectAni.Inst.showEff_Reward_Fly(startPos, heroEndPos, itemInfo);
            }
        }

        private showHookBtnPop(info: Pb_God.PBFightBase)
        {
            this.autoFightPop.show(Global.getLangStr("hook_msg22", info.id), 3000, true);

            this.autoFightPop.y = 90 - this.autoFightPop.bg.height - 80;
        }

        public onCherkVideo(): boolean
        {
            let tempWatchType = BattleMgr.Inst.getWatchBattleType();
            let tempBatInfo = BattleMgr.Inst.getBatPlaceMgr(tempWatchType);
            if (!tempBatInfo) { return false; }
            let tempIsVedio = tempBatInfo.getBattleIsVideo();
            if (!tempIsVedio)
            {
                return false;
            }
            //正在观看录像或切磋中，是否退出？
            AlertShow.showConfirmAlert(Global.getLangStr("vedio_msg2"), this, () =>
            {
                BattleMgr.Inst.exitBat(tempWatchType, true);
            });

            return true;
        }

        //-----------------------------------功能开放提示------------------------------------
        /** 刷新指定功能的开启提示（-1表示刷新所有） */
        private refreshSystemOpenState(systemId: number = -1): void
        {
            switch (systemId)
            {
                case Pro.emSystemSwitchType.Trave: //历练功能开放
                    this.__refreshOpenState(systemId, this.openTipsTrave);
                    break;
                case Pro.emSystemSwitchType.Faction: //公会功能开放，
                    this.__refreshOpenState(systemId, this.openTipsFaction);
                    break;
                case Pro.emSystemSwitchType.Weapon: //神器功能开放
                    this.__refreshOpenState(systemId, this.openTipsWeapon);
                    break;
                default: //refreshAll
                    this.__refreshOpenState(Pro.emSystemSwitchType.Trave, this.openTipsTrave);
                    this.__refreshOpenState(Pro.emSystemSwitchType.Faction, this.openTipsFaction);
                    this.__refreshOpenState(Pro.emSystemSwitchType.Weapon, this.openTipsWeapon);
                    break;
            }
        }

        private __refreshOpenState(systemId: Pro.emSystemSwitchType, label: Laya.Label): void
        {
            //全局开关
            let cfgInfo = cfg.SystemSwitchSystemSwitchCfgData.getInfo(systemId);
            if (!cfgInfo)
            {
                label.visible = false;
                return;
            }
            let globalOpen = cfgInfo.open == 0;  //0：开启 1：关闭
            if (!globalOpen)
            {
                label.visible = true;
                label.text = Global.getLangStr("common_noopen2");
                return;
            }
            let isOpen = PlayerDataMgr.checkSystemSwitchOpen(systemId);
            label.visible = !isOpen;
            if (!isOpen)
            {
                label.text = cfgInfo.unlockDes;
            }
        }

        private _listenUIChangeRefreshBubble = false;
        /** 刷新冒泡提示(进游戏后每隔10分钟检查一次，如果当前停在主城，就冒泡提示) */
        private refreshBubbleTipsView(): void
        {
            if (this.SelectBtn != this.HomeBtn) { return; }
            //新手引导中
            if (GuideMgr.Inst.getGuideStatue(false, false)) { return; }
            //还有界面显示中
            if (UIManager.Inst.getIsShowingUI()) { return; }

            if (this._listenUIChangeRefreshBubble)
            {
                EventMgr.off(EventNotify.UI_Show_Change, this, this.refreshBubbleTipsView);
                this._listenUIChangeRefreshBubble = false;
            }

            let checkFight = Math.random() > 0.5;
            let checkArtif = false;
            // eslint-disable-next-line no-constant-condition
            while (true)
            {  //随机一个优先，且保证条件不足时两个都检查到位。
                if (checkFight)
                { //先检查出战
                    var tmpNextStageId = HookDataMgr.getStageID() + 1;
                    var tmpLimitLevel = cfg.HookStageCfgData.getNeedPlayerLevelByStageID(tmpNextStageId);
                    if (tmpLimitLevel != 0 && tmpLimitLevel <= PlayerDataMgr.level)
                    {
                        this.bubbleTips.x = this.FighterBtn.x - 180;
                        this.bubbleTips.show(Global.getLangStr("bubble_tips_02"));
                        break;
                    }
                }
                if (checkArtif) { break; }
                //再检查神器
                checkArtif = true;
                if (!ArtifactDataMgr.isGetAllArtiface && PlayerDataMgr.checkSystemSwitchOpen(emSystemSwitchType.Weapon))
                {
                    this.bubbleTips.x = this.WeaponBtn.x - 180;
                    this.bubbleTips.show(Global.getLangStr("bubble_tips_01"));
                    break;
                }
                if (checkFight) { break; }
                checkFight = true;
            }

        }

        //-----------------------------------红点------------------------------------
        private _reddotBindCtl: ReddotBindImageController = new ReddotBindImageController();
        /** 将红点图片与红点数据模型关联 */
        private initRedDotModel(): void
        {
            this.unInitRedDotModel();

            this._reddotBindCtl.bind(this.FactionRedDotImg, FactionDataMgr.reddotModel);
            this._reddotBindCtl.bind(this.ItemBagRedDotImg, ItemDataMgr.reddotModel);
            this._reddotBindCtl.bindList(this.WeaponRedDotImg, ArtifactDataMgr.reddotModel, ConvenantDataMgr.reddotModel);
            //挂机奖励红点
            this._reddotBindCtl.bindList(this.FightRedDotImg, AchieveDataMgr.reddotModel,
                SailDataMgr.reddotModel, HookDataMgr.reddotModelPassReward);
            //伙伴红点（需要归纳圣物与伙伴操作红点）
            this._reddotBindCtl.bindList(this.HeroBagRedDotImg, HolyDataMgr.reddotModel, PetDataMgr.actionRedDotModel,PetDataMgr.bookArchivesRedDotModel, ArtifactDataMgr.reddotModelEmbattle, DefendDataMgr.reddotModel);
            //历练红点
            this._reddotBindCtl.bindList(this.TraveRedDotImg, CopymapDataMgr.reddotModel);           //还有历练其它模块的也要加进来, 无尽试炼、远征等
            //主城按钮红点(组合)
            this._reddotBindCtl.bindList(this.HomeRedDotImg, RiskDataMgr.reddotModel, ElementDataMgr.reddotModel
                , MailDataMgr.reddotModel, ChampionDataMgr.reddotModel, ChallengeDataMgr.reddotModel, AchieveDataMgr.reddotModel,
                CallDataMgr.reddotModel, PetDataMgr.combinReddotModel, LadderDataMgr.reddotModel, DanDataMgr.reddotModel,
                WealDataMgr.reddotModel, ActivityDataMgr.reddotModel, ActivityDataMgr.reddotModelCommonGrp, TreasureDataMgr.reddotModel,
                ItemDataMgr.reddotModelRuneCombine, ItemDataMgr.reddotModelEquipCombine, IncubateEggDataMgr.reddotModel,
                PrivilegeDataMgr.reddotModel, PrivilegeDataMgr.reddotModelDailyCharge, PrivilegeDataMgr.reddotModelMonthCard, VideoDataMgr.reddotModel
            );
        }
        private unInitRedDotModel(): void
        {
            this._reddotBindCtl.cleanUp();
        }
    }
}