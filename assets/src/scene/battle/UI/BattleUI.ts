
module Pro
{
    /**
     * 战斗回合UI
     */
    export class BattleUI extends ProUI.Scene.Battle.MainUI
    {

        /**
         * 战斗管理器
         */
        private placeMgr: BatPlaceMgr;

        /** 己方阵营数据 */
        private ownZhengxingIdAry: Array<number>;
        /** 敌方阵型数据 */
        private enemyZhengxingIdAry: Array<number>;

        private _roundNum: number = 0;

        private _currentHpIndex: number = 0;

        constructor()
        {
            super();

            this.initEvents();

            //阵型查看
            this.OwnZhenxingBtn.onClick(this, this.onOwnZhenxingClick);
            this.OtherZhenxingBtn.onClick(this, this.onOtherZhenxingClick);
            this.BuffBtn.onClick(this, this.onBuffClick);
            this.JumpBtn.onClick(this, this.onJumpClick);
            this.HeavenExitBtn.onClick(this, this.onExitHeavenBattleClick);
            this.btn_giveUpTeamOne.onClick(this, this.onHeavenGiveUpTeamOneClick);
            this.PassRewardBtn.onClick(this, this.onPassRewardClick)
            this.adjustScreenPos();
            this.btn_skin_skill2.onClick(this, this._onBtnSkinSkill2Click);

        }

        private adjustScreenPos()
        {
            this.TopBox.top = GameConfig.getBangsTop();
            // this.VSBox.bottom = this.VSBox.bottom - (Laya.stage.height - GameConfig.WinHeight);
            // this.TopBox.top = -(Laya.stage.height - GameConfig.WinHeight >> 1) + 20;
            this.placeMgr && this.placeMgr.adjustScreenPos();
        }

        private initEvents(): void
        {
            EventMgr.on(CmdEvent.Train_EndlessPrize, this, this.onTrainEndlessRefresh);
            // EventMgr.on(CmdEvent.Train_SynEndlessInfo, this, this.onTrainEndlessRefresh);
            EventMgr.on(CmdEvent.Train_EndlessBuff, this, this.onTrainEndlessRefresh);
            EventMgr.on(EventNotify.Battle_YuanLing_Complete, this, this.onYuanLingComplete);
            EventMgr.on(CmdEvent.Train_TowerPrize, this, this.refreshRewardReddot);
            EventMgr.on(EventNotify.Screen_Resize, this, this.adjustScreenPos);
            EventMgr.on(EventNotify.Fight_Hook_Changed, this, this._showBtnSkinSkill);
            EventMgr.on(EventNotify.AtkerHpChange, this, this.onHpChange);
        }
        private removeEvents(): void
        {
            EventMgr.off(CmdEvent.Train_EndlessPrize, this, this.onTrainEndlessRefresh);
            // EventMgr.on(CmdEvent.Train_SynEndlessInfo, this, this.onTrainEndlessRefresh);
            EventMgr.off(CmdEvent.Train_EndlessBuff, this, this.onTrainEndlessRefresh);
            EventMgr.off(EventNotify.Battle_YuanLing_Complete, this, this.onYuanLingComplete);
            EventMgr.off(CmdEvent.Train_TowerPrize, this, this.refreshRewardReddot);
            EventMgr.off(EventNotify.Screen_Resize, this, this.adjustScreenPos);
            EventMgr.off(EventNotify.Fight_Hook_Changed, this, this._showBtnSkinSkill);
            EventMgr.off(EventNotify.AtkerHpChange, this, this.onHpChange);
        }

        /** 战斗播放速度 */
        private onSpeedClick()
        {
            //判断VIP特权
            if (!PrivilegeDataMgr.checkVipPrivilege(Pb_God._emPrivilegeType.PrivilegeType_BattleSpeedX2, false) &&
                PlayerDataMgr.level < 5)
            {
                TipsUtils.showTipsByLanId("bat_msg21");
                return;
            }
            let speedNum = BattleMgr.Inst.getActionSpeedId();
            speedNum++;
            if (speedNum > 3)
            {
                speedNum = 1;
            }
            this.SpeedLb.text = Global.getLangStr("bat_msg12", speedNum); //速度x1
            BattleMgr.Inst.setActionSpeedId(speedNum);
            GameLaunch.saveClientData();
        }

        /** 查看我的阵型 */
        private onOwnZhenxingClick()
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroZhenxing, this.ownZhengxingIdAry));
        }

        /** 查看对面的阵型 */
        private onOtherZhenxingClick()
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroZhenxing, this.enemyZhengxingIdAry));
        }

        /** buff总览 */
        private onBuffClick()
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_BattleHarm, this.placeMgr));
        }

        /** 跳过战斗 */
        private onJumpClick()
        {
            if (!this.placeMgr.getBattleIsVideo())
            {
                //目前只有竞技场而且次数达到30次才可以跳过
                let batType = this.placeMgr.getBattleType();
                if (batType == Pb_God._emBattleType.BattleType_Challenge && !ChallengeDataMgr.canSkipBattle())
                {
                    TipsUtils.showTipsByLanId("challenge_msg5");
                    return;
                }
                if (PlayerDataMgr.level < 12)
                {
                    TipsUtils.showTipsByLanId("tips_msg72");
                    return;
                }
            }
            BattleMgr.Inst.exitBat(this.placeMgr.getBattleType(), false);
        }

        /**
         * 天界副本退出战斗
         */
        private onExitHeavenBattleClick(): void
        {
            AlertShow.showConfirmAlert(Global.getLangStr("Heaven_msg4"), this, () =>
            {
                FightSend.heavenGiveup(Pb_God._emBattleType.BattleType_HeavenDungeon, this.placeMgr.getBattleID());
                BattleMgr.Inst.exitBat(Pb_God._emBattleType.BattleType_HeavenDungeon, true, false);
            }, "battleExitSure", "battleExitCancel");
        }

        /**
         * 天界副本boss关放弃第一队战斗
         */
        private onHeavenGiveUpTeamOneClick(): void
        {
            BattleMgr.Inst.exitBat(Pb_God._emBattleType.BattleType_HeavenDungeon, true);
        }

        /**
         *  试炼塔奖励
         */
        private onPassRewardClick(): void
        {
            let opendata = new StagePrizeOpenUIData(this.placeMgr.getBattleType(), this.placeMgr.getBattleType() == Pb_God._emBattleType.BattleType_Tower ? 1 : 2);
            UIManager.Inst.forceOpen(opendata);
        }

        /** UI隐藏 */
        public hide()
        {
            this.visible = false;
            Laya.timer.clear(this, this.checkNoviceGuide);
            this.removeArtifactEff(this.OwnArtifactUI);
            this.removeArtifactEff(this.EnemyArtifactUI);
        }

        /** 初始化 */
        public init(tempMgr: BatPlaceMgr)
        {
            this._showBtnSkinSkill()
            this.visible = true;
            this.placeMgr = tempMgr;
            this.OwnNameLb.text = this.placeMgr.getAttackName();
            this.OtherNameLb.text = this.placeMgr.getDefenseName();
            this.EndlessBox.visible = this.placeMgr.getBattleType() == Pb_God._emBattleType.BattleType_Endless;
            this.HeavenBox.visible = this.placeMgr.getBattleType() == Pb_God._emBattleType.BattleType_HeavenDungeon;

            this.crossChallengeBox.visible = this.placeMgr.getBattleType() == Pb_God._emBattleType.BattleType_CrossChallege;
            this.activityBossBox.visible = this.placeMgr.getBattleType() == Pb_God._emBattleType.BattleType_ActivityBoss;

            this.PassRewardBtn.visible = (this.placeMgr.getBattleType() == Pb_God._emBattleType.BattleType_Tower) || (this.placeMgr.getBattleType() == Pb_God._emBattleType.BattleType_Tower2);
            this.refreshRewardReddot();
            //速率缩放
            this.SpeedBtn.onClick(this, this.onSpeedClick);
            let speedNum = BattleMgr.Inst.getActionSpeedId();
            this.SpeedLb.text = Global.getLangStr("bat_msg12", speedNum); //速度x1";

            this.refreshJumpBtnState();

            //布局
            this.width = GameConfig.WinWidth/*GameConfig.curWidth()*/;
            this.height = GameConfig.WinHeight/*GameConfig.curHeight()*/;
            this.top = 0;
            // this.bottom = this.placeMgr.getBattleType() == Pb_God._emBattleType.BattleType_Hook ? 70 : 0;

            //刷新回合数
            let tmpCurTrunNum = this.placeMgr.getInTrun();
            let tmpMaxTrunNum = this.placeMgr.getMaxTrun();
            this.RoundLb.text = Global.getLangStr("bat_msg1", tmpCurTrunNum, tmpMaxTrunNum);

            //阵型id获取
            this.ownZhengxingIdAry = this.placeMgr.getBattlePetZhengxing(true);
            this.enemyZhengxingIdAry = this.placeMgr.getBattlePetZhengxing(false);

            //刷新阵型和阵法
            let zhenXinBegin = this.placeMgr.getBattleType() == Pb_God._emBattleType.BattleType_TeamCampaign ? 7 : 0;
            //  Global.setResPetZhengfa(this.OwnZhenfaImg, zhenXinBegin + this.placeMgr.getBattlePetZhenfaId(true));
            //  Global.setResPetZhengfa(this.OtherZhenfaImg, zhenXinBegin + this.placeMgr.getBattlePetZhenfaId(false));
            Global.setResPetZhengxing(this.OwnZhenxingBtn, this.ownZhengxingIdAry, false);
            Global.setResPetZhengxing(this.OtherZhenxingBtn, this.enemyZhengxingIdAry, false);

            // this.OwnZhenfaImg.visible = this.OtherZhenfaImg.visible = false;
            // this.OwnZhenxingBtn.visible = this.OtherZhenxingBtn.visible = true;

            //刷新神器状态
            this.artifact_init(true);
            this.artifact_init(false);

            //援军
            this._defendInit()

            //新手引导相关（要延迟一些时间等开场动画播完）
            Laya.timer.once(2000, this, this.checkNoviceGuide);


            //刷新无尽状态
            if (this.EndlessBox.visible)
            {

                this.EndlessExitBtn.onClick(this, () =>
                {
                    AlertShow.showConfirmAlert(Global.getLangStr("bat_msg3"), this, () =>
                    {
                        BattleMgr.Inst.exitBat(Pb_God._emBattleType.BattleType_Endless, true);
                        //弹出战斗结束（胜利和失败都弹胜利界面）
                        let tmpItemResults = TrainDataMgr.getEndlessCurBattlePrize(true);
                        if (tmpItemResults.length > 0)
                        {
                            AwardOpenUtils.showAwardOpen(tmpItemResults, null);
                        }
                    }, "battleExitSure", "battleExitCancel");
                });
                this.EndlessStageLb.text = Global.getLangStr("bat_msg2", this.placeMgr.getBattleID());

                this.onTrainEndlessRefresh();
            }
            else if (this.HeavenBox.visible)
            {// 天界副本星星描述
                let stageIndex = this.placeMgr.getBattleID();
                let stageCfg = cfg.HeavenStageCfgData.getInfo(stageIndex);
                let star_arr = cfg.HeavenStageCfgData.getStarConditionArray(stageCfg);
                for (let i = 0; i < star_arr.length; i++)
                {
                    let txt_desc = this["txt_rules_" + (i + 1)] as component.UILabel;
                    txt_desc.text = cfg.HeavenStarConditionCfgData.getDescByIndex(star_arr[i]);

                    let img_star = this["img_star_" + (i + 1)] as Laya.Image;
                    img_star.gray = true;
                }

                let isBossStage = cfg.HeavenStageCfgData.isBossStage(stageCfg);
                let teamInfo_1 = EmbattleDataMgr.getBuZhenInfo(Pb_God._emZhenfaType.ZhenfaType_Heaven1);
                let teamInfo_2 = EmbattleDataMgr.getBuZhenInfo(Pb_God._emZhenfaType.ZhenfaType_Heaven2);
                let isOnlyOneTeam = !teamInfo_2 || teamInfo_2.getPosData().length == 0;
                let isTeamOneFighting = this.placeMgr.getBattleCampIndex(true) == 1;
                // boss第一波怪物
                let is_boss_first_wave = isBossStage && this.placeMgr.getBattleCampIndex(false) == 1;
                // boss关有2队可点退出战斗
                this.HeavenExitBtn.visible = isBossStage && !isOnlyOneTeam;
                // boss关 上阵2队且当前为第一队战斗 可点放弃第一队 开始第二队战斗
                this.btn_giveUpTeamOne.visible = isBossStage && isTeamOneFighting && !isOnlyOneTeam;
            }
            else if (this.crossChallengeBox.visible)
            {
                this.lblCrossChallenge.text = Global.getLangStr("fight_msg62", CrossChallengeDataMgr.result.length + 1);

                for (let i = 1; i <= 3; i++)
                {
                    let icon = this[`iconCrossChallenge${ i }`];
                    let resultIcon = this[`resultCrossChallenge${ i }`];

                    if (i > CrossChallengeDataMgr.result.length)
                    {
                        icon.frame = resultIcon.frame = 0;
                    }
                    else
                    {
                        icon.frame = resultIcon.frame = CrossChallengeDataMgr.result[i - 1] ? 1 : 2;
                    }
                }
            }
            else if (this.activityBossBox.visible)
            {
                this.iconBoss.skin = UrlMgr.getActivityBossByIndex(ActivityBossDataMgr.info.index);
                let unit = Math.floor(ActivityBossDataMgr.damage / cfg.ActivitybossConstantCfgData.getFirstInfo().bloodUnit);
                let remainHP = ActivityBossDataMgr.damage % cfg.ActivitybossConstantCfgData.getFirstInfo().bloodUnit;
                this.lblHp.text = `x${ unit }`;

                this.changeHpSkin(true);

                this.imgPro.width = Math.max(1, remainHP / cfg.ActivitybossConstantCfgData.getFirstInfo().bloodUnit * (this.imgProBg.width - 4));
            }

        }

        private onHpChange()
        {
            if (!this.activityBossBox.visible)
                return;
            let bloodUnit = cfg.ActivitybossConstantCfgData.getFirstInfo().bloodUnit;
            let unit = Math.floor(ActivityBossDataMgr.damage / bloodUnit);
            let remainHP = ActivityBossDataMgr.damage % bloodUnit;
            let wid = Math.max(1, remainHP / bloodUnit * (this.imgProBg.width - 4));

            if (`x${ unit }` != this.lblHp.text)
            {
                //说明血条涨了 需要换血条颜色 先跑满

                Laya.Tween.to(this.imgPro, { width: this.imgProBg.width - 4 }, 150, undefined, Laya.Handler.create(this, () =>
                {
                    this.changeHpSkin();
                    this.imgPro.width = 1;
                    Laya.Tween.to(this.imgPro, { width: wid }, 150);
                }))
            }
            else
            {
                Laya.Tween.to(this.imgPro, { width: wid }, 300);
            }
            this.lblHp.text = `x${ unit }`;
        }

        private changeHpSkin(isDefault: boolean = false)
        {
            if (isDefault)
            {
                //默认就黑底+绿色条 要改再说
                this.imgProHead.skin = "";
                this.imgPro.skin = UrlMgr.getActivityBossProImg(`1_1`);
            }
            else
            {
                this._currentHpIndex++;
                if (this._currentHpIndex > 3)
                    this._currentHpIndex = 1;

                let headIndex = this._currentHpIndex - 1 < 1 ? 3 : this._currentHpIndex - 1;
                this.imgProHead.skin = UrlMgr.getActivityBossProImg(`${ headIndex }_1`);
                this.imgPro.skin = UrlMgr.getActivityBossProImg(`${ this._currentHpIndex }_1`);
            }
        }

        /** 新手引导 */
        private checkNoviceGuide(): void
        {
            if (!this.visible) { return; }
            //元灵珠引导
            if (GuideMgr.Inst.getInStep() == GuideStep.Artifact_16_10)
            {
                let guideNode = this.OwnArtifactUI.centerPos;
                if (guideNode && guideNode.displayedInStage)
                { GuideMgr.Inst.showFinger(guideNode, false, guideNode); }
                return;
            }
            //判断是否有引导过二倍加速
            if (!GuideMgr.Inst.getInAllShowGuide() && PlayerDataMgr.level >= 10 && !FuncGuideMgr.Inst.IsGuideBattleSpeed)
            {
                FuncGuideMgr.Inst.IsGuideBattleSpeed = 1;
                GameLaunch.saveClientData();
                if (BattleMgr.Inst.getActionSpeedId() == 1)
                {
                    FuncGuideMgr.Inst.forceOpenFuncGuide(GuideStep.Simply_BattleSpeed);
                    GuideMgr.Inst.showFinger(this.SpeedBtn, true, this.SpeedBtn);
                }
            }
        }


        /** 检查跳过按钮的显示状态 */
        private refreshJumpBtnState(): void
        {
            //查看录相可直接跳过
            if (this.placeMgr.getBattleIsVideo())
            {
                this.JumpBtn.visible = true;
                return;
            }
            if (GuideMgr.Inst.getGuideStatue(false, false))
            {
                this.JumpBtn.visible = false;
            }
            let batType = this.placeMgr.getBattleType();
            switch (batType)
            {
                case Pb_God._emBattleType.BattleType_Hook://挂机BOSS;
                case Pb_God._emBattleType.BattleType_Tower:		//试练塔;
                case Pb_God._emBattleType.BattleType_Tower2:
                    //  this.JumpBtn.visible = PlayerDataMgr.level >= 12 ? true : false;
                    this.JumpBtn.visible = false;
                    break;
                // case Pb_God._emBattleType.BattleType_Copymap:		//日常副本;
                // case Pb_God._emBattleType.BattleType_Endless:		//无尽试炼;
                // case Pb_God._emBattleType.BattleType_Temple:		//星河神殿	;
                // case Pb_God._emBattleType.BattleType_FactionCopymap:		//公会副本;
                // case Pb_God._emBattleType.BattleType_FactionWar:		//公会战;
                // case Pb_God._emBattleType.BattleType_Dan:		//超凡段位赛;
                // case Pb_God._emBattleType.BattleType_Ladder:		//跨服天梯赛;
                // case Pb_God._emBattleType.BattleType_Champion:		//冠军赛;
                // case Pb_God._emBattleType.BattleType_WeekChampion:		//周冠军赛;
                // case Pb_God._emBattleType.BattleType_HeavenDungeon:		//天界副本;
                case Pb_God._emBattleType.BattleType_Challenge:		//竞技场;
                case Pb_God._emBattleType.BattleType_Element:		//元素神殿;
                case Pb_God._emBattleType.BattleType_Risk:		//神界冒险;
                case Pb_God._emBattleType.BattleType_FightEachOther:		//切磋
                    this.JumpBtn.visible = true;
                    break;
                case Pb_God._emBattleType.BattleType_Expedition:		//英雄远征;
                    //中级难度以上可跳过
                    let id = this.placeMgr.getBattleID();
                    this.JumpBtn.visible = cfg.ExpeditionStageCfgData.getExpeditionTypeByIndex(id) != Pb_God._emExpeditionType.ExpeditionType_Simple;
                    break;
                default:
                    this.JumpBtn.visible = false;
            }

        }

        /**
         * 无尽界面刷新
         */
        public onTrainEndlessRefresh()
        {
            if (!(this.EndlessBox.visible && this.placeMgr.getIsWatching()))
            {
                return;
            }

            //buff设置
            let endlessBuffSkillInfo = TrainDataMgr.getEndlessBuffSkillInfo();
            if (endlessBuffSkillInfo)
            {
                if (endlessBuffSkillInfo.mask.indexOf(Pb_God._emSkillMaskType.SkillMaskType_EndlessContinue + "") < 0)
                {
                    this.EndlessBuffLb.text = Global.getLangStr("bat_msg4") + Global.getLangStr("bat_msg5");
                }
                else
                {
                    this.EndlessBuffLb.text = Global.getLangStr("bat_msg4") + endlessBuffSkillInfo.des;
                }
            } else
            {
                this.EndlessBuffLb.text = "";
            }

            //累计奖励总览提示
            let strRewardLbTips = Global.getLangStr("bat_msg6");
            let tmpRewardList = TrainDataMgr.getEndlessCurBattlePrize(false);
            if (tmpRewardList.length > 0)
            {
                this.EndlessPassRewardBox.visible = true;
                this.EndlessPassRewardBox.onRefresh(tmpRewardList.length, this, (itemUI: ProUI.Utils.LongTroopItemUI, index: number) =>
                {
                    let addItem = tmpRewardList[index];
                    Global.setResIconWithItemID(itemUI.IconImg, Pro.CfgID.ResType.Item, addItem.itemid);
                    //   itemUI.NumLb.color = "#ffffff";
                    itemUI.NumLb.text = addItem.itemcount + ""; //策划要求这里不要折断成万的形式，直接显示完整的数字。
                    // Global.drawItemUI(itemUI, tmpRewardList[index], false, false);
                });
            } else
            {
                this.EndlessPassRewardBox.visible = false;

                //今日已通关的最大关卡
                let tmpTodayMaxStage = TrainDataMgr.getEndlessDaymaxstage();
                //今日已通关的关卡数量
                let todayFinishStageCount = TrainDataMgr.getEndlessDayStageCount();
                //配置中最大的关卡
                let cfgMaxStageId = cfg.TrainEndlessCfgData.getMaxStage();
                //可领奖的关卡数
                let canRewardNum = cfg.TrainEndlessCfgData.getFirstInfo().prizeStageCount;
                //是否已经达到今天已经领过奖的层数  //累计奖励显示规则： 每天只有前5关通关才有奖励
                if (tmpTodayMaxStage >= cfgMaxStageId || todayFinishStageCount >= canRewardNum)
                {
                    //当天已达上限，无法再结算奖励
                    strRewardLbTips += Global.getLangStr("bat_msg7");
                } else
                {  //再过{0}关开始结算(今日至第{1}关)
                    let curStageId = this.placeMgr.getBattleID();
                    //领奖的目标关卡
                    let targetStageId = canRewardNum - todayFinishStageCount + curStageId - 1;
                    if (targetStageId > cfgMaxStageId) { targetStageId = cfgMaxStageId; }
                    strRewardLbTips += Global.getLangStr("bat_msg11", tmpTodayMaxStage + 2 - curStageId, targetStageId);
                }
            }
            this.EndlessPassRewardLb.text = strRewardLbTips;


            //成就通关奖励
            let tmpNextPrizeInfo = cfg.TrainEndlessPrizeCfgData.getInfoWithFun(TrainDataMgr.getEndlessPrizestage());
            this.EndlessRewardBtn.visible = tmpNextPrizeInfo != null;
            if (tmpNextPrizeInfo != null)
            {
                let tmpNeedStage = tmpNextPrizeInfo.stageID - this.placeMgr.getBattleID() + 1; //TrainDataMgr.getEndlessMaxStageID();
                this.EndlessRewardLb.text = tmpNeedStage <= 0 ? Global.getLangStr("bat_msg8") : Global.getLangStr("common_unfinish");
                this.EndlessRewardBtn.onClick(this, () =>
                {
                    if (tmpNeedStage <= 0)
                    {
                        TrainSend.endlessPrize(tmpNextPrizeInfo.stageID);
                    }
                    else
                    {
                        TipsUtils.showTipsByLanId("bat_msg10", tmpNeedStage);
                    }
                });
            }
        }

        /**
         * 回合切换
         */
        public role_Round_Change(currentRound: number)
        {

            //临时监控回合数变化，可删除
            // logI("切换回合数显示：", round);

            //回合数显示
            let tmpMaxTrunNum = this.placeMgr.getMaxTrun();
            this.RoundLb.text = Global.getLangStr("bat_msg1", currentRound, tmpMaxTrunNum);
            this._roundNum = currentRound;
            //神器
            this.artifact_Change(true, currentRound);
            this.artifact_Change(false, currentRound);

            //援军
            this.refreshDefendList()

            EventMgr.trigger(EventNotify.Battle_Round_Change, this.placeMgr);
        }
        private onYuanLingComplete(isOwner: boolean)
        {
            this.artifact_Change(true, this._roundNum + 1);

        }

        /**
         * 刷新天界副本关卡星星
         * @param index_arr 传入星星的状态 0-无改变 1-变亮 -1变灰
         * @param is_hideOther 是否隐藏其他星星
         */
        public refreshHeavenStars(index_arr: number[]): void
        {
            for (var index = 0; index < 3; index++)
            {
                let img_star = this["img_star_" + (index + 1)] as Laya.Image;
                let state = index_arr[index];
                if (state != 0)
                { img_star.gray = state == -1; }
            }
        }

        //=======================================================================================
        /**
         * 神器状态初始化
         */
        private artifact_init(isOwner: boolean)
        {
            let tmpArtInfo = this.placeMgr.getBattlePetArtifact(isOwner);
            // let tmpArtInfo = this.placeMgr.getBattlePetArtifact(true);
            let tmpArtUI = isOwner ? this.OwnArtifactUI : this.EnemyArtifactUI;
            tmpArtUI.visible = tmpArtInfo != null;

            if (!tmpArtUI.visible)
            {
                return;
            }
            this.addArtifactEff(tmpArtUI, tmpArtInfo.id);
            this.artifact_Change(isOwner, 0);
            if (!isOwner)
            {
                tmpArtUI.qiNumLab.scaleX = -1;
                tmpArtUI.qiNumLab.x = 36;
            }
        }

        /**
         * 神器状态刷新
         */
        private artifact_Change(isOwner: boolean, round: number)
        {
            let tmpArtUI = isOwner ? this.OwnArtifactUI : this.EnemyArtifactUI;
            if (!tmpArtUI.visible)
            {
                return;
            }
            var info: Pb_God.PBFightBase = this.placeMgr.batInfo;
            var addRound: number = 0;
            if (isOwner)
            {
                if (info && info.friend.battlepet.artifactstate)
                {
                    addRound = info.friend.battlepet.artifactstate.skillcd[0].cd;
                }
            } else
            {
                if (info && info.energy.battlepet.artifactstate)
                {
                    addRound = info.energy.battlepet.artifactstate.skillcd[0].cd;
                }
            }
            var oriRound: number = round;
            round = round == 0 ? 1 : round;
            round = round + (3 - addRound);
            //黃釗 要求改為和闪烁一样， 看不到满的状态
            let curTrun = round == 0 ? 0 : (round) % 3;
            // Laya.Tween.clearTween(tmpArtUI.imgIconMask);
            if (curTrun == 0)
            {
                if (round != 0)
                {
                    curTrun = 3;
                }
            }
            // Laya.Tween.to(tmpArtUI.imgIconMask, { width: (curTrun) * 38 }, 150);
            this.setArtifactNengLiang(tmpArtUI, curTrun);
            tmpArtUI.qiNumLab.text = curTrun.toString();
        }

        onYuanLingRelease(isOwner: boolean)
        {
            // this.playArtifactBoom(isOwner);
        }


        onArtifactBoomComplete(framePlayer: FramePlayer, firePlayer: FramePlayer, isOwner: boolean)
        {

            let tmpArtUI = isOwner ? this.OwnArtifactUI : this.EnemyArtifactUI;
            tmpArtUI.qiNumLab.text = "0";
            // Laya.Tween.to(tmpArtUI.imgIconMask, { width: 0 }, 150);
            this.setArtifactNengLiang(tmpArtUI, 0);
            FramePlayer.release(framePlayer);
            FramePlayer.release(firePlayer);
        }


        private setArtifactNengLiang(tmpArtUI: ProUI.Scene.Battle.ArtifactItemUI, num: number)
        {
            for (let i = 1; i <= 3; i++)
            {
                tmpArtUI["tuteng_nengliang" + i].visible = num >= i;
            }
        }


        /** 移除神器特效 */
        private removeArtifactEff(tmpArtUI: ProUI.Scene.Battle.ArtifactItemUI)
        {
            // tmpArtUI.imgIcon.cleanUp();
            // Laya.Tween.clearTween(tmpArtUI.imgIconMask);
            if (tmpArtUI["artSk"])
            {
                tmpArtUI["artSk"].removeSelf();
                tmpArtUI["artSk"] = null;
            }
        }

        /** 添加神器特效 */
        private addArtifactEff(tmpArtUI: ProUI.Scene.Battle.ArtifactItemUI, tmpId: number)
        {

            this.removeArtifactEff(tmpArtUI);

            let sk = new SkeletonPlayer();
            tmpArtUI.imgIconGray.addChild(sk);
            sk.load(UrlMgr.getSpineSceneUrl(`tuteng/${ tmpId }/${ tmpId }`));
            sk.playByIndex(0, true);
            sk.scale(0.5, 0.5);
            tmpArtUI["artSk"] = sk;
            sk.pos(0, tmpArtUI.height / 2);

            // let tmpEffData = cfg.EffectCfgData.getInfo("ui_artifact_ball" + tmpId);
            // if (tmpEffData == null)
            // {
            //     return null;
            // }
            // Global.setResIconWithItemID(tmpArtUI.imgIconGray, CfgID.ResType.ArtifactIcon, tmpId);
        }

        private refreshRewardReddot(): void
        {
            // 试练塔奖励红点
            if (this.placeMgr.getBattleType() == Pb_God._emBattleType.BattleType_Tower || this.placeMgr.getBattleType() == Pb_God._emBattleType.BattleType_Tower2)
            {
                let towerPety = this.placeMgr.getBattleType() == Pb_God._emBattleType.BattleType_Tower ? 1 : 2
                let prizeList = cfg.TrainTowerPrizeCfgData.getListByType(towerPety);
                let canreward = false;
                for (let info of prizeList)
                {
                    if (TrainDataMgr.getTowerPrizedStage(info.stageID))
                    { continue; }// 奖励已领取
                    let isActive = TrainDataMgr.getTowerStageID(towerPety) >= info.stageID;
                    let isGet = TrainDataMgr.getTowerPrizedStage(info.stageID);
                    if (isActive && !isGet)
                    {
                        canreward = true;
                        break;
                    }
                }
                this.PassRewardRed.visible = canreward;
            }
        }

        private _onBtnSkinSkill2Click()
        {
            if (BattleMgr.Inst.skinSkill2)
            {
                BattleMgr.Inst.skinSkill2 = 0;
                TipsUtils.showTips(Global.getLangStr("openSkill2"))//("大招播放已开启");

            } else
            {
                BattleMgr.Inst.skinSkill2 = 1;
                TipsUtils.showTips(Global.getLangStr("skinSkill2"))//("大招播放已关闭");

            }
            this._showBtnSkinSkill();



        }

        private _showBtnSkinSkill()
        {
            //通关第10关的时候才开启大招跳过功能
            this.btn_skin_skill2.visible = HookDataMgr.getStageID() >= 10;
            this.btn_skin_skill2_gray.visible = BattleMgr.Inst.skinSkill2 > 0;
            if (!this.btn_skin_skill2.visible)
            {
                BattleMgr.Inst.skinSkill2 = 0;
            }
        }

        /**是否跳过大招 */
        private _skinSkillBol(): boolean
        {
            return this.btn_skin_skill2.visible && this.btn_skin_skill2_gray.visible;
        }
        //=======================================================================================
        /**
         * 援军初始化
         */
        private _defendInit()
        {
            let ownerInfo = this.placeMgr.getBattleDefendInfo();
            if (!ownerInfo)
            {
                this.img_defend_self.visible = false;
            }
            else if (!ownerInfo.rank)
            {
                this.img_defend_self.visible = false;
            }
            else
            {
                this.img_defend_self.visible = true;
                this.lbl_defendLevel_self.text = Global.getLangStr("attr_lv3", ownerInfo.level);
                this.itemBox_skill_self.onRefresh(4, this, (item: Pro.BattleSkillItem, index: number) =>
                {
                    item.setData(index, ownerInfo, this.placeMgr, true);
                })
            }
            let energyInfo: Pb_God.PBGlobalDefendDisplay = this.placeMgr.getBattleDefendInfo(false);
            if (!energyInfo)
            {
                this.img_defend_enemy.visible = false;
            } else if (!energyInfo.rank)
            {
                this.img_defend_enemy.visible = false;
            }
            else
            {
                this.lbl_defendLevel_enemy.text = Global.getLangStr("attr_lv3", energyInfo.level);
                this.img_defend_enemy.visible = true;
                this.itemBox_skill_enemy.onRefresh(4, this, (item: Pro.BattleSkillItem, index: number) =>
                {
                    item.setData(index, energyInfo, this.placeMgr, false);
                })
            }
        }
        public refreshDefendList()
        {
            for (let i = 0; i < 4; i++)
            {
                let item: Pro.BattleSkillItem = this.itemBox_skill_self.ContentLayer.getChildAt(i) as Pro.BattleSkillItem;
                item.refresh();
                let item2: Pro.BattleSkillItem = this.itemBox_skill_enemy.ContentLayer.getChildAt(i) as Pro.BattleSkillItem;
                item2.refresh();
            }

        }







        public destroy(destroyChild: boolean = true): void
        {
            this.removeEvents();
            super.destroy(destroyChild)
        }
    }
}