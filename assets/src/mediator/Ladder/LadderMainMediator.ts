module Pro
{
    /**
    * 界面说明： 跨服天梯主界面
    * @author jason.xu
    */
    export class LadderMainMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Ladder.LadderMainUI;

        /** 积分类型 */
        private _scoreExpendType = Pb_God._emExpendType.ExpendType_Ladder;

        /** UI上的英雄显示列表转换成数组存储，方便查询 */
        private _tarRoleList: LadderMainRoleItemView[] = [];

        /** 本轮活动结束时间 */
        private _overTime = 0;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("ladder")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Ladder.LadderMainUI, 1);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            super.closeUI();
            Laya.timer.clear(this, this.onCountDown);
            Laya.timer.clear(this, this.onCountdownRefreshState);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this._tarRoleList = [];
            for (let index = 0; index < this.UIPanel.roleItems._children.length; index++)
            {
                const element = this.UIPanel.roleItems._children[index];
                this._tarRoleList.push(element);
            }
            // for (let item of this.UIPanel.roleItems._children)
            // {
            //     this._tarRoleList.push(item);
            // }
        }

        /** 检查UI是否能被重新拉起来 */
        public checkCanDisplayUI(): boolean
        {
            //如果当前正在观看对应的战斗，则界面还不能拉起来，等战斗结束后才能拉
            if (BattleMgr.Inst.getWatchBattleType() == Pb_God._emBattleType.BattleType_Ladder) { return false; }
            return super.checkCanDisplayUI();
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            //拉取一次竞技场数据，获取当前竞技场排名
            ChallengeSend.open();

            //判断当前时间是否在活动开启中
            let isUnderAway = LadderDataMgr.isUnderAway();
            for (let role of this._tarRoleList)
            {
                if (!isUnderAway) { role.setData(null); }
            }
            this.UIPanel.txtTimeTitle.visible = isUnderAway;
            this.UIPanel.txtTime.visible = isUnderAway;
            this.UIPanel.txtCondition.visible = !isUnderAway;
            Laya.timer.clear(this, this.onCountDown);
            if (isUnderAway)
            {
                LadderSend.open(0, 0, []); //向服务器请求主要信息
                this._overTime = LadderDataMgr.getOverTime();
                Laya.timer.loop(500, this, this.onCountDown);
                this.onCountDown();
            } else
            {

            }

            this.refreshUI();
            this.resetRefreshBtnState();
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnBuyCount.onClick(this, this.onClickBuycount);
            this.UIPanel.btnHelp.onClick(this, this.onClickHelp);
            this.UIPanel.btnQuickAttack.onClick(this, this.onClickQuickAttack);
            this.UIPanel.btnRank.onClick(this, this.onClickRank);
            this.UIPanel.btnRecord.onClick(this, this.onClickRecord);
            this.UIPanel.btnRefresh.onClick(this, this.onClickRefresh);
            this.UIPanel.btnShop.onClick(this, this.onClickShop);
            this.UIPanel.btnTopHero.onClick(this, this.onClickTopHero);
            this.UIPanel.btnReward.onClick(this, this.onClickReward);

            this.addEventMgr(EventNotify.PlayerItemNumChange, this, this.onScoreNumChange);
            //同步信息			PBG2CLadderSynInfo
            this.addEventMgr(CmdEvent.Ladder_SynInfo, this, this.onSynInfo);
            //刷新对手返回		PBG2CLadderRefreshAck
            this.addEventMgr(CmdEvent.Ladder_RefreshAck, this, this.onRefreshAck);

            //购买次数返回		PBU32
            this.addEventMgr(CmdEvent.Ladder_BuyCountAck, this, this.onChangeCount);
            //同步挑战从数		PBU32
            this.addEventMgr(CmdEvent.Ladder_SynFightCount, this, this.onChangeCount);

        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 点击购买次数 */
        private onClickBuycount(): void
        {
            if (!this.checkUnderAway()) { return; }
            if (!this.checkEligibility()) { return; }

            if (LadderDataMgr.getLeftBuyCount() <= 0)
            {
                TipsUtils.showTipsByLanId("shop_msg7");
                return;
            }
            let buyCount = LadderDataMgr.buyCount + 1;
            // //弹窗二级提示
            let needItem = cfg.LadderBuyCountCfgData.getNeedItemById(buyCount);
            let des = Global.getLangStr("fight_msg8", cfg.ItemCfgData.getNameById(needItem.itemid), needItem.itemcount);
            AlertShow.showConfirmAlert(des, this, () =>
            {
                //向服务器发请求
                LadderSend.buyCount(buyCount);
            }, "common_confirm", "common_cancel", 0, 0, "TodayRepeatSpriteLaddeBuy");
        }

        /** 点击问号 */
        private onClickHelp(): void
        {
            let strHelp = Global.getLangStr("ladder_help");
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Help, strHelp));
        }

        /** 点击一键快捷挑战 */
        private onClickQuickAttack(): void
        {
            if (!this.checkUnderAway()) { return; }
            if (!this.checkEligibility()) { return; }

            //弹窗二级提示
            let des = Global.getLangStr("ladder_msg1");//是否一键挑战，排名不变噢！~";
            AlertShow.showConfirmAlert(des, this, () =>
            {
                //向服务器发请求
                LadderSend.fightOneKey();
            });
        }

        /** 点击排行榜 */
        private onClickRank(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RankDetail, Pb_God._emTopListType.TopListType_BWLadder));
        }

        /** 点击排名奖励 */
        private onClickReward(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_LadderReward));
        }

        /** 点击战报 */
        private onClickRecord(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_LadderRecord));
        }

        /** 点击刷新 */
        private onClickRefresh(btn: component.UIButton): void
        {
            if (!this.checkUnderAway()) { return; }
            if (!this.checkEligibility()) { return; }
            btn.disabled = true;
            LadderSend.refresh(0, 0, 0);
        }

        /** 点击商店 */
        private onClickShop(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ScoreShop, Pb_God._emShopType.ShopType_Ladder));
        }

        /** 点击英雄殿 */
        private onClickTopHero(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_LadderTopHero));
        }

        /** 检查开启进行中并弹出提示 */
        private checkUnderAway(): boolean
        {
            if (!LadderDataMgr.isUnderAway())
            {
                TipsUtils.showTipsByLanId("ladder_msg2");
                return false;
            }
            return true;
        }
        /** 检查参赛资格 */
        private checkEligibility(): boolean
        {
            let challengeRank = ChallengeDataMgr.getMyOrder();
            if (challengeRank == 0 || challengeRank > 100)
            {
                TipsUtils.showTipsByLanId("ladder_msg8");
                return false;
            }
            return true;
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            this.refreshCountView();
            this.onScoreNumChange(this._scoreExpendType);
            //刷新红点
            this.UIPanel.reddotTopHero.visible = LadderDataMgr.hasWorshipLeftCount();
        }

        /** 刷新天梯积分数量显示 */
        private onScoreNumChange(fID: number): void
        {
            if (fID == this._scoreExpendType)
            {
                this.UIPanel.txtScoreValue.text = Global.numberToTuckString(PlayerDataMgr.getExpendNum(this._scoreExpendType));
            }
        }

        /** 刷新次数显示 */
        private refreshCountView(): void
        {
         //   this.UIPanel.txtLeftBuyCount.text = LadderDataMgr.getLeftBuyCount() + "";
            this.UIPanel.txtLeftBuyCount.text = Global.getLangStr("ui_Dan_msg15", LadderDataMgr.getLeftBuyCount())
            // let totalUseCount = cfg.LadderConstInfoCfgData.getFirstInfo().dayFightCount;
            let leftUseCount = LadderDataMgr.getLeftCount();
            this.UIPanel.txtLeftCount.text = leftUseCount + "";  // + "/" + totalUseCount
        }

        /*****
         *同步信息			PBG2CLadderSynInfo
         * @param PBG2CLadderSynInfo
         * 		order			uint32	自己名次
         * 		target			PBLadderObject	刷新的目标信息
         */
        protected onSynInfo(value: Pb_God.PBG2CLadderSynInfo): void
        {
            this.UIPanel.txtRank.text = LadderDataMgr.myRank > 0 ? (LadderDataMgr.myRank + "") : Global.getLangStr("common_norank");
            this.refreshRoleList(value.target);
        }
        /*****
         *刷新对手返回		PBG2CLadderRefreshAck
         * @param PBG2CLadderRefreshAck
         * 		target			PBLadderObject	对手基本信息
         * 		nextrefreshtime			uint32	下次刷新时间
         */
        protected onRefreshAck(value: Pb_God.PBG2CLadderRefreshAck): void
        {
            this.refreshRoleList(value.target);
            this.resetRefreshBtnState();
        }

        /** 刷新角色列表  */
        private refreshRoleList(list: Pb_God.PBLadderObject[]): void
        {
            for (var i = 0, len = this._tarRoleList.length; i < len; i++)
            {
                this._tarRoleList[i].setData(list[i]);
            }
        }

        /** 次数变化返回 */
        private onChangeCount(): void
        {
            Laya.timer.callLater(this, this.refreshCountView);
        }

        /** 重置刷新按钮状态 */
        private resetRefreshBtnState(): void
        {
            let curTime = TimeController.currTimer / 1000;
            if (curTime >= LadderDataMgr.nextRefreshTime)
            {
                this.UIPanel.btnRefresh.disabled = false;
                this.UIPanel.txtRefreshLabel.text = Global.getLangStr("common_refresh");
            } else
            {
                this.UIPanel.btnRefresh.disabled = true;
                Laya.timer.loop(500, this, this.onCountdownRefreshState);
                this.onCountdownRefreshState();
            }
        }

        /** 刷新按钮状态倒计时 */
        private onCountdownRefreshState(): void
        {
            let leftTime = LadderDataMgr.nextRefreshTime - TimeController.currTimer / 1000;
            if (leftTime <= 0)
            {
                this.UIPanel.btnRefresh.disabled = false;
                this.UIPanel.txtRefreshLabel.text = Global.getLangStr("common_refresh");
                Laya.timer.clear(this, this.onCountdownRefreshState);
            } else
            {
                this.UIPanel.txtRefreshLabel.text = Math.ceil(leftTime) + Global.getLangStr("common_second");
            }
        }
        /** 活动倒计时 */
        private onCountDown(): void
        {
            let leftTime = this._overTime - TimeController.currTimer;
            this.UIPanel.txtTime.text = Global.GetRemindTime(leftTime / 1000, 7);
            if (leftTime <= 0)
            {
                Laya.timer.clear(this, this.onCountDown);
            }
        }

    }
}