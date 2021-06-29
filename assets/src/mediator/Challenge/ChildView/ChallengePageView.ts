module Pro
{
    /**
    * 
    * 循环赛界面分离视图逻辑： 挑战分页
    *
    * @author jason.xu
    * 
    */
    export class ChallengePageView extends ProUI.Challenge.ChildView.ChallengeViewUI implements ITableView
    {

        /** 刷新按钮倒计时 */
        private _nextRefreshTime: number = 0;

        /** 下面的宝箱节点与奖励配置的映射（简化查找） */
        private _prizeIdMapItemview: ds.StringMap<Pro.ProgressChestItemUI> = new ds.StringMap<Pro.ProgressChestItemUI>();

        /** 竞技币ID */
        private _ticketId: number = 0;

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this._ticketId = cfg.ChallengeConstInfoCfgData.getFirstInfo().enterNeedItemID;
        }

        public addEvent(): void
        {
            //ui
            this.btnShop.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Shop, Pb_God._emShopType.ShopType_Challenge), BaseBackUIType.HideBackUI);
            })
            this.btnBattleRecord.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ChallengeRecord));
            })
            this.btnRefresh.onClick(this, this.onClickRefresh);
            this.btnEmbattle.onClick(this, this.onClickEmbattle);
            this.btnAddCount.onClick(this, this.onClickAddCount);
            this.btnSkip.onClick(this, this.onSkipClick);

            //data
            EventMgr.on(EventNotify.PlayerItemNumChange, this, this.onItemNumChange);
            EventMgr.on(EventNotify.Challenge_Target_Update, this, this.onUpdateTargetList);
            EventMgr.on(EventNotify.Challenge_WeekPrize_Change, this, this.onChangeWeekPrize);
            EventMgr.on(EventNotify.Challenge_EnterCount_Change, this, this.onChangeEnterCount);

            EventMgr.on(EventNotify.Challenge_Score_Change, this, this.onChangeScore);
            EventMgr.on(EventNotify.Challenge_Order_Change, this, this.onChangeRank);

            //对手信息返回		PBG2CChallengeTargetInfo
            EventMgr.on(Cmd.S2C_Challenge_Target_PlayerInfo.cmdName, this, this.onTarget_PlayerInfo)
        }

        public removeEvent(): void
        {
            EventMgr.off(EventNotify.Challenge_Target_Update, this, this.onUpdateTargetList);
            EventMgr.off(EventNotify.PlayerItemNumChange, this, this.onItemNumChange);
            EventMgr.off(EventNotify.Challenge_WeekPrize_Change, this, this.onChangeWeekPrize);
            EventMgr.off(EventNotify.Challenge_Score_Change, this, this.onChangeScore);
            EventMgr.off(EventNotify.Challenge_Order_Change, this, this.onChangeRank);
            EventMgr.off(EventNotify.Challenge_EnterCount_Change, this, this.onChangeEnterCount);
            EventMgr.off(Cmd.S2C_Challenge_Target_PlayerInfo.cmdName, this, this.onTarget_PlayerInfo)
        }

        private onSkipClick()
        {
            this.skipFlag.visible = !this.skipFlag.visible;
            ChallengeDataMgr.autoSkip = this.skipFlag.visible;
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
            //首次打开界面时，请求一次挑战列表
            if (!ChallengeDataMgr.targetList)
            {
                this.listView.onRefresh(0, this, null);
                ChallengeSend.refresh();
            } else
            {
                this.onUpdateTargetList();
            }
            this.refresgBoxProgressValue();
            this.txtTicketCount.text = Global.getItemNum(this._ticketId) + "";

            this.onChangeRank();
            this.onChangeScore();

            //再启动一次检查
            Laya.timer.loop(500, this, this.onCountDownRefresh);
            this.onCountDownRefresh();

            //赛季剩余时间倒计时
            Laya.timer.loop(1000, this, this.onTimer);
            this.onTimer();
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
            this.previewBoxReward.visible = false
            Laya.timer.clear(this, this.onCountDownRefresh);
            Laya.timer.clear(this, this.onTimer);
        }

        public setData($data: any): void
        {

        }

        private onChangeScore(): void
        {
            this.txtScore.text = Global.getLangStr("common_score", ChallengeDataMgr.getMyScore());
        }
        private onChangeRank(): void
        {
            let rank = ChallengeDataMgr.getMyOrder();
            //排名： n名      排名： 未上榜
            this.txtRank.text = Global.getLangStr("common_rank1") + (rank <= 0 ? Global.getLangStr("common_norank") : Global.getLangStr("common_rank2", rank));
        }

        /** 进入次数更新 */
        private onChangeEnterCount(): void
        {
            this.refresgBoxProgressValue();
            this.onUpdateTargetList();
        }

        /** 周宝箱领取进度更新 */
        private onChangeWeekPrize(prizeId: number): void
        {
            let itemView = this._prizeIdMapItemview.get(prizeId);
            if (!itemView)
            {
                this.refresgBoxProgressValue();
            }
            else
            {
                this.onRefreshChallengeProgressItem(itemView, itemView.index);
            }
        }

        /** 刷新道具数量 */
        private onItemNumChange(fID: number, tempNewNum: number): void
        {
            if (fID == this._ticketId)
            { //
                this.txtTicketCount.text = tempNewNum + "";
            }
        }

        private onUpdateTargetList(): void
        {
            let targets = ChallengeDataMgr.targetList || [];
            targets.sort((a, b) =>
            {
                if (a.score != b.score)
                    return b.score - a.score;
                return a.id - b.id;

            })
            this.listView.onRefresh(targets.length, this, this.onRefreshListItem)
        }

        /** 点击刷新按钮 */
        private onClickRefresh(): void
        {
            TipsUtils.showTipsByLanId("challenge_msg8");
            SoundMgr.Inst().playSound("refresh");
            this.btnRefresh.disabled = true;
            this._nextRefreshTime = TimeController.currTimer + 3000;
            Laya.timer.loop(500, this, this.onCountDownRefresh);
            this.onCountDownRefresh();
            //请求刷新
            ChallengeSend.refresh();
        }

        private onCountDownRefresh(): void
        {
            let currTimer = TimeController.currTimer;
            if (this._nextRefreshTime < currTimer)
            {
                Laya.timer.clear(this, this.onCountDownRefresh);
                this.btnRefresh.disabled = false;
                this.txtRefreshBtnLabel.text = Global.getLangStr("common_refresh");
            } else
            {
                this.txtRefreshBtnLabel.text = Global.GetRemindTime((this._nextRefreshTime - currTimer) / 1000, 4);
            }
        }

        /** 点击防守阵营按钮 */
        private onClickEmbattle(): void
        {
            UIManager.Inst.forceOpen(new EmbattleOpenUIData(Pb_God._emZhenfaType.ZhenfaType_Jingjichang));
        }


        /** 购买竞技币数量 */
        private onClickAddCount(): void
        {
            // UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ShopFullPriceBuy, this._ticketId));
            let itemCfg = cfg.ItemCfgData.getInfo(this._ticketId);
            let openUIData = new ExchangeBuyOpenUIData();
            openUIData.needCurrencyID = Pro.CfgID.ItemID.Diamond;
            openUIData.limitBuyCount = -1;       // 无限购买
            openUIData.addItemID = itemCfg.id;
            openUIData.addItemPrice = itemCfg.buyNeedDiamond;
            openUIData.addItemCount = 1;
            openUIData.exchanageCfgIndex = -1;  // 非限时兑换表
            openUIData.maxCount = Math.floor(Pro.PlayerDataMgr.getExpendNum(Pro.CfgID.ItemID.Diamond) / openUIData.addItemPrice);
            UIManager.Inst.forceOpen(openUIData);
        }

        //赛季倒计时
        private onTimer(): void
        {
            let currTimer = TimeController.currTimer / 1000;
            let time = ChallengeDataMgr.getSeasonOverTime() - currTimer;
            this.txtOverTime.text = Global.GetRemindTime(time, 10);
        }

        /** 刷新挑战对象item */
        private onRefreshListItem(tempUI: ProUI.Challenge.ChildView.ChallengeItemViewUI, index: number): void
        {
            let data = ChallengeDataMgr.targetList[index];
            //免费次数
            let isFree = ChallengeDataMgr.hasFree();
            //新手引导代码, 要等服务器的数据才能引导，所以放在这里执行
            if (GuideMgr.Inst.getInStep() == GuideStep.Func_Challenge_4 && index == 0)
            {
                //延时一点，保证按钮初始化
                Laya.timer.once(50, this, () =>
                {
                    GuideMgr.Inst.showFinger(tempUI.btnAttack, true, tempUI.btnAttack);
                });
            }
            tempUI.viewPlayerIcon.setPlayerDisplayInfo(data.display, true, true);
            tempUI.viewPlayerIcon.setClickCallback(Laya.Handler.create(this, this.onClickTargetHead, [data], false));
            if (data.param) //机器人
                tempUI.txtFightValue.text = data.fightpower + "";
            else
                tempUI.txtFightValue.text = data.defense.fightpower + "";
            tempUI.txtNickname.text = data.display.playername;
            tempUI.txtScore.text = Global.getLangStr("common_score", data.score); //积分: " + ;
            tempUI.imgFee.visible = !isFree;
            tempUI.labelFree.visible = isFree;
            tempUI.imgReddot.visible = isFree;
            tempUI.btnAttack.onClick(this, () =>
            {
                if (!isFree && !Global.isFullRes(this._ticketId, 1, true))
                    return;
                //发起挑战
                BattleMgr.Inst.createNormalBat(Pb_God._emBattleType.BattleType_Challenge, data.id, data.param, undefined, this.skipFlag.visible);
            });
        }

        /** 点击挑战对象头像 */
        private onClickTargetHead(data: Pb_God.PBChallengeObject): void
        {
            ChallengeSend.askPlayerInfo(data.id);
        }

		/*****
		 *对手信息返回		PBG2CChallengeTargetInfo
		 * @param PBG2CChallengeTargetInfo
		 * 		order			uint32	自己名次
		 * 		target			PBChallengeObject	对手基本信息
		 */
        protected onTarget_PlayerInfo(value: Pb_God.PBG2CChallengeTargetInfo): void
        {
            ChallengeTargetInfoPanel.show(value.target);
        }


        /** 刷新宝箱进度 */
        private refresgBoxProgressValue()
        {
            let weekEnterCount = ChallengeDataMgr.getWeekEnterCount();
            this.txtCount.text = Global.getLangStr("challenge_msg1", weekEnterCount);
            //分段计算进度条值
            let childVlueList: number[] = [];
            for (var cfgInfo of cfg.ChallengeWeekPrizeCfgData.getAllList()) childVlueList.push(cfgInfo.needFightCount);
            let progress: number = Global.getTotalProgressByChildValueList(childVlueList, weekEnterCount);
            Global.setProgressBarMask(this.imgProgress, progress);

            this.listProgressChest.onRefresh(childVlueList.length, this, this.onRefreshChallengeProgressItem);
        }

        private onRefreshChallengeProgressItem(tempUI: Pro.ProgressChestItemUI, index: number): void
        {
            let cfgData = cfg.ChallengeWeekPrizeCfgData.getAllList()[index];
            this._prizeIdMapItemview.put(cfgData.prizeID, tempUI);
            let needFightCount = cfgData.needFightCount;
            let isActive = needFightCount <= ChallengeDataMgr.getWeekEnterCount();
            let isGetReward = ChallengeDataMgr.isGetWeekPrize(cfgData.prizeID);

            tempUI.setBoxTypeIndex(Math.floor(index / 2));  //每两个箱子换一个资源
            tempUI.setText(needFightCount, "#5d565d");
            tempUI.bindData = cfgData;
            tempUI.index = index;
            tempUI.setOpenState(isActive, isGetReward);
            tempUI.onClick(this, this.onClickProgressBox);
        }

        private onClickProgressBox(chestItem: Pro.ProgressChestItemUI): void
        {
            let cfgData: cfg.ChallengeWeekPrizeCfgInfo = chestItem.bindData;
            if (!ChallengeDataMgr.isGetWeekPrize(cfgData.prizeID) && cfgData.needFightCount <= ChallengeDataMgr.getWeekEnterCount())
            {
                ChallengeSend.weekPrize(cfgData.prizeID);
            } else
            {
                //弹窗提示
                let rewardItems = cfg.ChallengeWeekPrizeCfgData.getAddItemAryByInfo(cfgData);
                this.itemListPreview.onRefresh(rewardItems.length, this, (tempUI: NorItemUI, index: number) =>
                {
                    tempUI.setItemInfo(rewardItems[index], false, true, true);
                })
                this.previewBoxReward.visible = true;
                this.previewBoxReward.x = chestItem.index * 93 + 1;
                this.previewBoxMaskBtn.onClick(this, () =>
                {
                    this.previewBoxReward.visible = false;
                })
            }
        }

        /** 页签组件销毁 */
        public dispose(): void
        {

        }
    }
}