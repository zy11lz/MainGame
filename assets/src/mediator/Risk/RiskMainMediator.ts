module Pro
{
    /**
    * 神界冒险主玩法界面
    * @author jason.xu
    */
    export class RiskMainMediator extends BaseMediator implements IMediator
    {
        /** 击杀宝箱能否直接领奖 */
        private _targetCanGetReward: boolean = false;
        public UIPanel: ProUI.Risk.RiskMainUI;
        private _targetBtnRewardEff: EffNode;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("riskmain"), UrlMgr.getAtlas("secrettravel"), UrlMgr.getAtlas("heavenspary")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Risk.RiskMainUI, 1);
        }

        public closeUI(): void
        {
            super.closeUI();
            Laya.timer.clear(this, this.onTimer);
        }

        /** 检查UI是否能被重新拉起来 */
        public checkCanDisplayUI(): boolean
        {
            //如果当前正在观看对应的战斗，则界面还不能拉起来，等战斗结束后才能拉
            if (BattleMgr.Inst.getWatchBattleType() == Pb_God._emBattleType.BattleType_Risk)
            {
                return false;
            }
            return super.checkCanDisplayUI();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.bgImg.size(Laya.stage.width, Laya.stage.height);
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            RiskDataMgr.refreshOverTime();
            //刷新地表块数据(界面刚打开时刷新一次即可，其它场合刷新会有事件驱动)
            this.UIPanel.floorView.refreshView();

            this.refreshUI();
            Laya.timer.loop(1000, this, this.onTimer);
            this.onTimer();
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(EventNotify.Risk_KillGuardReward_Change, this, this.refreshTargetBoxView);
            this.addEventMgr(EventNotify.Risk_BaseChange_Change, this, this.refreshBaseView);
            this.addEventMgr(Cmd.S2C_Risk_SynCollectSkill.cmdName, this, this.onSynCollectSkill);
            //英雄血量有变化
            this.addEventMgr(Cmd.S2C_Risk_SynPetHp.cmdName, this, this.refreshHeroList);
            //英雄选择有变化
            this.addEventMgr(EventNotify.Risk_Hero_Change, this, this.refreshHeroList);


            this.UIPanel.btnClose.onClick(this, this.closeUI);

            this.UIPanel.floorView.addEvent();

            this.UIPanel.btnAddBuff.onClick(this, this.onClickAddBuff);
            this.UIPanel.btnCallShop.onClick(this, this.onClickCallShop);
            this.UIPanel.btnShop.onClick(this, this.onClickShop);
            this.UIPanel.btnHelp.onClick(this, this.onClickHelp);
            this.UIPanel.btnHpDrug.onClick(this, this.onClickHpDrug);
            this.UIPanel.btnKillDrug.onClick(this, this.onClickKillDrug);
            this.UIPanel.btnRank.onClick(this, this.onClickRank);
            this.UIPanel.btnTargetReward.onClick(this, this.onClickTargetReward);
        }


        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
            this.UIPanel.floorView.cleanUp();
            this.UIPanel.floorView.removeEvent();
        }


        /** 倒计时 */
        private onTimer(): void
        {
            let time = RiskDataMgr.overTime - TimeController.currTimer / 1000;
            if (time < 0)
            {
                time = 0;
                RiskDataMgr.reset();
                this.closeUI();
                return;
            }
            this.UIPanel.txtTimer.text = Global.GetRemindTime(time, 7);
        }

        /** 点击属性加成 */
        private onClickAddBuff(): void
        {
            //向服务器请求技能列表，等数据返回后再打开界面
            RiskSend.openSkill();
        }
        /** 同步到被动技能 */
        private onSynCollectSkill(value: Pb_God.PBG2CRiskCollectSkill): void
        {
            //显示属性列表小视图
            let list = value.skillinfo;
            //活动是否开启
            let actData = ActivityDataMgr.getActivityDataByType(Pb_God._emActivityType.Activity_Times, Pb_God._emActivityTimesType.Activity_Times_Risk);
            if (actData)
            {
                //活动额外增加一个技能
                let skillStrArr = cfg.ActivityCfgData.getParamByID(actData.id).split(";");
                let actSkill = new Pb_God.PBSkillInfo();
                actSkill.skillid = parseInt(skillStrArr[1]);
                actSkill.skilllevel = parseInt(skillStrArr[2]);
                list.push(actSkill);
            }
            let len = list.length;
            if (len <= 0)
            {
                TipsUtils.showTipsByLanId("tips_msg46");
                return;
            }
            this.UIPanel.addBuffView.visible = true;

            //计算列表实际显示高度
            // let listHeight = this.UIPanel.listAddBuff.getCellTrueHeight(); //还有个BUG
            let col = Math.ceil(len / 2); //一行两个
            let listHeight = col * 33 + (col - 1) * this.UIPanel.listAddBuff.valignSpaceY;
            this.UIPanel.addBuffView.height = listHeight + 63;

            this.UIPanel.listAddBuff.onRefresh(len, this, (box: Laya.Box, index: number) =>
            {
                let icon = box.getChildByName("icon") as Laya.Image;
                let txtContent = box.getChildByName("content") as Laya.Label;
                let data = list[index];
                //取1级的技能。动态计算出技能描述
                let skillCfg = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(data.skillid, data.skilllevel);
                let skillIndex = skillCfg.skillIndex;
                Global.setResIconWithItemID(icon, CfgID.ResType.Skill, skillIndex);
                txtContent.text = skillCfg.des;
            });
            Laya.stage.once(Laya.Event.MOUSE_DOWN, this, () =>
            {
                this.UIPanel.addBuffView.visible = false;
            })
        }

        /** 点击召唤商店 */
        private onClickCallShop(): void
        {
            /** 判断次数 */
            if (RiskDataMgr.data.tradercount <= 0)
            {
                TipsUtils.showTipsByLanId("risk_no_drup");  //暂无该祝福，继续冒险即可发现噢~
                return;
            }
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RiskCallShop));
        }

        /** 点击商店 */
        private onClickShop(): void
        {
            RiskSend.shopOpen();
            // UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RiskShop));
        }

        /** 点击规则说明 */
        private onClickHelp(): void
        {
            let strHelp: string = Global.getLangStr("risk_help");
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Help, strHelp));
        }

        /** 点击生命药水 */
        private onClickHpDrug(): void
        {
            (new RiskDrugHpPanel).show();
        }

        /** 点击击杀药水 */
        private onClickKillDrug(): void
        {
            (new RiskDrugKillPanel).show();
        }

        /** 点击排行 */
        private onClickRank(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RankDetail, Pb_God._emTopListType.TopListType_Risk));
        }

        /** 点击目标奖励 */
        private onClickTargetReward(): void
        {
            //判断当前是否有奖励可以领取
            if (this._targetCanGetReward)
            {
                //发起领奖请求
                RiskSend.guardPrize();
            } else
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RiskTargetReward));
            }
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            this.refreshBaseView();

            //刷新出战英雄列表
            this.UIPanel.listHeros.refreshView();
            //击杀守卫宝箱进度
            this.refreshTargetBoxView();
        }

        /** 刷新英雄列表 */
        private refreshHeroList(): void
        {
            this.UIPanel.listHeros.refreshHeroList();
        }

        /** 刷新击杀守卫宝箱状态 */
        private refreshTargetBoxView(): void
        {
            let skillBossGetRewardCount = RiskDataMgr.data.guardprize;  //已经领奖的数量
            let killBossCount = RiskDataMgr.data.killguardcount;  //总共击杀的数量
            let nextCount = cfg.RiskGuardPrizeCfgData.getNextCount(skillBossGetRewardCount);
            let btnTargetReward = this.UIPanel.btnTargetReward;
            if (nextCount == 0)
            {
                //没有下一个了
                this._targetCanGetReward = false;
                this.UIPanel.txtTarget.text = killBossCount + "/" + skillBossGetRewardCount;
                //宝箱全打开启的效果
                this.UIPanel.imgTargetReward.frame = 2;
                EffectAni.Inst.removeAwardBoxAni(this.UIPanel.imgTargetReward);
                Public.EffectUtils.clearShakeAndStop(this.UIPanel.imgTargetReward);
            } else
            {
                this.UIPanel.txtTarget.text = killBossCount + "/" + nextCount;
                this._targetCanGetReward = killBossCount >= nextCount;
                if (this._targetCanGetReward)
                {
                    EffectAni.Inst.addAwardBoxAni(this.UIPanel.imgTargetReward);
                    Public.EffectUtils.shakeAndStop(this.UIPanel.imgTargetReward);

                } else
                {
                    EffectAni.Inst.removeAwardBoxAni(this.UIPanel.imgTargetReward);
                    Public.EffectUtils.clearShakeAndStop(this.UIPanel.imgTargetReward);
                    this.UIPanel.imgTargetReward.frame = 1;
                }
            }
        }

        /** 刷新基础显示（包括层数、各种药剂、召唤商店的数量显示） */
        private refreshBaseView(): void
        {
            let data = RiskDataMgr.data;
            /** 当前层数 */
            let layer = data.curstage;
            this.UIPanel.txtTitle.text = Global.getLangStr("risk_msg5", layer);
            //生命药水数量
            this.UIPanel.txtHpDrug.text = data.hpdrupcount + "";
            //驱魂药水
            this.UIPanel.txtKillDrug.text = data.killdrupcount + "";
            //召唤商店数量
            this.UIPanel.txtCallShop.text = data.tradercount + "";
        }


    }
}