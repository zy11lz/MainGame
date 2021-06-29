module Pro
{
    /**
    *
    活动boss
    */
    export class ActivityBossPageView extends ProUI.ActivityMain.ActivityBoss.ActivityBossPageViewUI implements ITableView
    {

        /** 倒计时结束时间 */
        private _overTime = 0;

        private _sk: SkeletonPlayer;

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {

        }

        private onListRefresh(cell: Pro.NorItemUI, index: number)
        {
            let awards = cfg.ActivitybossMonsterNewCfgData.getShowAward(ActivityBossDataMgr.info.index);
            cell.setItemInfo(awards[index], false);
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.btnChallenge.onClick(this, this.onChallengeClick);
            this.btnRankAward.onClick(this, this.onRankAwardClick);
            this.btnSkipBattle.onClick(this, this.onSkipClick);
            this.btnTips.onClick(this, this.onTipsClick);
            this.btnRank.onClick(this, this.onRankClick);

            this.btnAdd.onClick(this, this.onAddClick);

            EventMgr.on(CmdEvent.ActivityBoss_InfoChg, this, this.refreshUI);
            EventMgr.on(CmdEvent.TopList_List_Ack, this, this.refreshRankView);
        }

        private onAddClick()
        {
            if (ActivityBossDataMgr.getCanBuyCount() <= 0)
            {
                TipsUtils.showTipsByLanId("activityboss_add_count");
                return;
            }

            AlertShow.showConfirmAlert(Global.getLangStr("activity_boss_msg2", cfg.ActivitybossBuyCountCfgData.getNeedItemByCount(ActivityBossDataMgr.info.buycount + 1).split("_")[1]), this, () =>
            {
                ActivityBossSend.buyCount();
            })
        }

        private onRankClick()
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RankDetail, Pb_God._emTopListType.TopListType_AcitivtyBoss));
        }

        private onChallengeClick()
        {
            if (ActivityBossDataMgr.getRemainCount() <= 0)
            {
                if (ActivityBossDataMgr.getCanBuyCount() > 0)
                {
                    AlertShow.showConfirmAlert(Global.getLangStr("activity_boss_msg6", cfg.ActivitybossBuyCountCfgData.getNeedItemByCount(ActivityBossDataMgr.info.buycount + 1).split("_")[1]), this, () =>
                    {
                        ActivityBossSend.buyCount();
                        ActivityBossDataMgr.resetDamage();
                        UIManager.Inst.forceOpen(new EmbattleOpenUIData(0, Pb_God._emBattleType.BattleType_ActivityBoss));
                    })
                }
                else
                {
                    TipsUtils.showTipsByLanId("activity_boss_msg1");
                }
                return;
            }
            ActivityBossDataMgr.resetDamage();
            UIManager.Inst.forceOpen(new EmbattleOpenUIData(0, Pb_God._emBattleType.BattleType_ActivityBoss));
        }

        private onRankAwardClick()
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RankDetailReward, Pb_God._emTopListType.TopListType_AcitivtyBoss));
        }

        private onSkipClick()
        {
            if (!ActivityBossDataMgr.checkCanSkip())
            {
                //挑战过一次方可使用扫荡
                TipsUtils.showTipsByLanId("activity_boss_msg4");
                return;
            }

            if (ActivityBossDataMgr.getRemainCount() <= 0)
            {
                if (ActivityBossDataMgr.getCanBuyCount() > 0)
                {
                    AlertShow.showConfirmAlert(Global.getLangStr("activity_boss_msg5", cfg.ActivitybossBuyCountCfgData.getNeedItemByCount(ActivityBossDataMgr.info.buycount + 1).split("_")[1], ActivityBossDataMgr.info.lastdamage), this, () =>
                    {
                        ActivityBossSend.buyCount();
                        ActivityBossSend.sweep();
                    })
                }
                else
                {
                    TipsUtils.showTipsByLanId("activity_boss_msg1");
                }
                return;
            }
            AlertShow.showConfirmAlert(Global.getLangStr("activity_boss_msg3", ActivityBossDataMgr.info.lastdamage), this, () =>
            {
                ActivityBossSend.sweep();
            })
        }

        private onTipsClick(btn: component.UIButton)
        {
            CommonHelpView.showWithLangKey(btn, "activityBossTips");
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
            EventMgr.off(CmdEvent.ActivityBoss_InfoChg, this, this.refreshUI);
            EventMgr.off(CmdEvent.TopList_List_Ack, this, this.refreshRankView);
        }

        dispose()
        {
            Laya.timer.clear(this, this.onTimer);
        }

        public setData($data: any): void
        {
            this._overTime = ActivityDataMgr.getActivityEndTimeStamp($data[0][0]);
            Laya.timer.loop(1000, this, this.onTimer);
            this.onTimer();
        }

        public show()
        {
            this.refreshUI();
        }

        public hide()
        {

        }

        private refreshSK()
        {
            if (!this._sk)
            {
                this._sk = new SkeletonPlayer();
                this._sk.on(LayaEvent.STOPPED, this, this.onSkStop);
                this.petNode.addChild(this._sk);
            }

            let skinID = cfg.ActivitybossMonsterNewCfgData.getSkinIDByIndex(ActivityBossDataMgr.info.index);
            let skelName = cfg.PetSkinCfgData.getSkelNameById(skinID);
            let firstAniAction = cfg.PetSkinCfgData.getFirstActById(skinID);
            this._sk.load(UrlMgr.getModelSkUrl(skelName));
            this._sk.play(firstAniAction ? firstAniAction : "win_loop", false);

        }

        private onSkStop()
        {
            this._sk.play("standby_loop", true);
        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        public refreshUI(): void
        {
            this.refreshSK();

            let info = ActivityBossDataMgr.info;
            let awards = cfg.ActivitybossMonsterNewCfgData.getShowAward(info.index);
            this.awardsList.onRefresh(awards.length, this, this.onListRefresh);
            this.btnSkipBattle.gray = info.challengecount <= 0;
            this.lblName.text = cfg.ActivitybossMonsterNewCfgData.getInfo(info.index).name;

            this.lblCanBuy.text = ActivityBossDataMgr.getCanBuyCount() + "";
            this.lblRemain.text = ActivityBossDataMgr.getRemainCount() + "";

            this.imgRedDotChallenge.visible = ActivityBossDataMgr.checkChallengeRedDot();
            this.imgRedDotSkip.visible = ActivityBossDataMgr.checkSkipRedDot();

            this.resetRankView();
            //需要请求一下排行榜信息
            TopListSend.list(Pb_God._emTopListType.TopListType_AcitivtyBoss, 1, 3, 0, 0, 0, 0);

        }

        private refreshRankView(value: Pb_God.PBS2CTopListList)
        {
            if (value.ask.type == Pb_God._emTopListType.TopListType_AcitivtyBoss)
            {
                for (let i = 1; i <= 3; i++)
                {
                    let lbl = this[`lblName${ i }`] as component.UILabel;
                    value.list[i - 1] && (lbl.text = value.list[i - 1].playerdisplay.playername);
                }
            }
        }

        private resetRankView()
        {
            for (let i = 1; i <= 3; i++)
            {
                let lbl = this[`lblName${ i }`] as component.UILabel;
                lbl.text = Global.getLangStr("common_empty1");
            }
        }


        /** 刷新活动倒计时 */
        private onTimer(): void
        {
            let cur_timer = TimeController.currTimer / 1000;
            let leftTime = this._overTime - cur_timer;
            if (leftTime <= 0)
            {   //活动已结束
                this.htmlTimer.showText = Global.getLangStr("activity_msg23");
                Laya.timer.clear(this, this.onTimer);
                return;
            }
            this.htmlTimer.showText = Global.getLangStr("activity_msg5", Global.GetRemindTime(leftTime, 9));
        }
    }
}