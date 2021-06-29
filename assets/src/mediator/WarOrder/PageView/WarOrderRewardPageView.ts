module Pro
{
    /**
     * 界面说明： 神庭战令（赛季票成就系统）
    * 奖励分页视图
    * @author jason.xu
    */
    export class WarOrderRewardPageView extends ProUI.TaskWarOrder.ChildView.RewardUI implements ITableView
    {

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.btnAutoReward.frequencyClickLock = 1000; //不要频繁点击
        }

        public addEvent(): void
        {
            this.btnUnlockAdvance.onClick(this, this.onClickUpAdvance);
            this.btnAutoReward.onClick(this, this.onClickAutoReward);
            EventMgr.on(EventNotify.Privilege_Card_Change, this, this.onChangePriviegeCard);
            // 	 战令奖励(等级，是否进阶奖励0/1)				PBU32U32
            EventMgr.on(Cmd.S2C_Achieve_WarOrderPrize.cmdName, this, this.onWarOrderPrize)
            // 	 同步战令等级(level, exp) PBU32U32
            EventMgr.on(Cmd.S2C_Achieve_SyncWarOrderLevel.cmdName, this, this.onSyncWarOrderLevel)
            // 	 战令一键奖励			PBG2CWarOrderOneKey
            EventMgr.on(Cmd.S2C_Achieve_WarOrderPrizeOneKey.cmdName, this, this.onWarOrderPrizeOneKey)
        }

        public removeEvent(): void
        {
            EventMgr.off(EventNotify.Privilege_Card_Change, this, this.onChangePriviegeCard);
            // 	 战令奖励(等级，是否进阶奖励0/1)				PBU32U32
            EventMgr.off(Cmd.S2C_Achieve_WarOrderPrize.cmdName, this, this.onWarOrderPrize)
            // 	 同步战令等级(level, exp) PBU32U32
            EventMgr.off(Cmd.S2C_Achieve_SyncWarOrderLevel.cmdName, this, this.onSyncWarOrderLevel)
            // 	 战令一键奖励			PBG2CWarOrderOneKey
            EventMgr.off(Cmd.S2C_Achieve_WarOrderPrizeOneKey.cmdName, this, this.onWarOrderPrizeOneKey)
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
            this.resetTimer();

            let list = cfg.AchieveWarOrderPrizeCfgData.getAll();
            this.listView.onRefreshWithArray(list, this, this.onRefreshListItem);

            //刷新进阶按钮状态
            this.refreshUpAdvanceState();
            this.refreshAutoBtnState();
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
            Laya.timer.clear(this, this.onTimer);
        }

        public setData($data: any): void
        {

        }

        /*****
		 * 	 战令奖励(等级，是否进阶奖励0/1)				PBU32U32
		 * @param PBU32U32
		 * 		key			uint32	
		 * 		value			uint32	 
		 */
        protected onWarOrderPrize(value: Pb_God.PBU32U32): void
        {
            //刷新单个数据即可
            this.listView.setItem(value.key - 1, cfg.AchieveWarOrderPrizeCfgData.getInfo(value.key));
            this.refreshAutoBtnState();
        }

		/*****
		 * 	 战令一键奖励			PBG2CWarOrderOneKey
		 * @param PBG2CWarOrderOneKey
		 * 		prize			PBU32U32	 奖励的领取状态(等级，普通 1 进阶 2 both 3)(改变了的)
		 */
        protected onWarOrderPrizeOneKey(value: Pb_God.PBG2CWarOrderOneKey): void
        {
            for (let el of value.prize)
            {
                //刷新单个数据即可
                this.listView.setItem(el.key - 1, cfg.AchieveWarOrderPrizeCfgData.getInfo(el.key));
            }
            this.btnAutoReward.disabled = true;
            this.reddotOneKey.visible = false;
        }

		/*****
		 * 	 同步战令等级(level, exp) PBU32U32
		 * @param PBU32U32
		 * 		key			uint32	
		 * 		value			uint32	 
		 */
        protected onSyncWarOrderLevel(value: Pb_God.PBU32U32): void
        {
            this.listView.refresh();
            this.refreshAutoBtnState();
        }

        private onRefreshListItem(itemUI: ProUI.TaskWarOrder.ChildView.RewardItemUI, index: number): void
        {
            let cfgInfo = cfg.AchieveWarOrderPrizeCfgData.getAll()[index];
            itemUI.txtLevel.text = cfgInfo.level + "";
            let curLevel = AchieveDataMgr.getWarOrderData().level;
            let isOpenAdv = PrivilegeDataMgr.getPrivilegeCardValid(Pb_God._emPrivilegeCard.PrivilegeCard_WarOrder);
            //普通奖励
            let addItem = cfg.AddItemInfo.getAddItemAttr(cfgInfo, cfgInfo.addItem, "addItemInfoArr")[0];
            if (addItem)
                itemUI.norItem.setItemInfo(addItem);
            else
                itemUI.norItem.setEmptyInfo();
            var extraImgLock = itemUI.norItem.getChildByName("extraImgLock") as Laya.Image;
            extraImgLock.visible = cfgInfo.level > curLevel && addItem != null;
            //进阶奖励
            let advanceItems = cfg.AddItemInfo.getAddItemAttr(cfgInfo, cfgInfo.advAddItem, "advAddItemInfoArr");
            itemUI.listAdvance.onRefresh(advanceItems.length, this, (noritem: NorItemUI, itemIndex: number) =>
            {
                noritem.setItemInfo(advanceItems[itemIndex]);
                var extraImgLock = noritem.getChildByName("extraImgLock") as Laya.Image;
                extraImgLock.visible = cfgInfo.level > curLevel || !isOpenAdv;
            })

            //奖励领取状态
            let prizeStete = AchieveDataMgr.getWarOrderLevelPrizeState(cfgInfo.level);
            //领取状态
            itemUI.imgNormalGet.visible = (prizeStete & 1) == 1;
            itemUI.imgAdvanceGet.visible = (prizeStete & 2) >> 1 == 1;
            itemUI.btnNormal.onClick(this, () =>
            {
                if (itemUI.imgNormalGet.visible) return;
                if (cfgInfo.level > curLevel)
                {                    //等级不足
                    TipsUtils.showTipsByLanId("common_needLevel", cfgInfo.level);
                    return;
                }
                AchieveSend.warOrderPrize(cfgInfo.level, 0);
            })
            itemUI.btnAdvance.onClick(this, () =>
            {
                if (itemUI.imgAdvanceGet.visible) return;
                if (cfgInfo.level > curLevel)
                {                    //等级不足
                    TipsUtils.showTipsByLanId("common_needLevel", cfgInfo.level);
                    return;
                }
                if (!isOpenAdv)
                { //没有开通进阶
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_WarOrderCharge));
                    return;
                }

                AchieveSend.warOrderPrize(cfgInfo.level, 1);
            })

            // itemUI.btn.onClick(this, () => {
            //     if (prizeStete == 3) return; //全领完了
            //     if (cfgInfo.level > curLevel) {                    //等级不足
            //         TipsUtils.showTipsByLanId("common_needLevel", cfgInfo.level);
            //         return;
            //     }
            //     if (!isOpenAdv) { //没有开通进阶
            //         if (prizeStete == 1) { //已经领过普通的了
            //             UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_WarOrderCharge));
            //         } else {
            //             AchieveSend.warOrderPrize(cfgInfo.level, 0);
            //         }
            //     } else { //已经开通了进阶
            //         if (prizeStete == 2) { //只领过进阶的， 还要再领一次普通的
            //             AchieveSend.warOrderPrize(cfgInfo.level, 0);
            //         } else {
            //             AchieveSend.warOrderPrize(cfgInfo.level, 1);
            //         }
            //     }
            // })
        }

        /** 特权卡变更 */
        private onChangePriviegeCard(cardType: number): void
        {
            if (cardType != Pb_God._emPrivilegeCard.PrivilegeCard_WarOrder) return;
            this.refreshUpAdvanceState();
            this.refreshAutoBtnState();
            this.listView.refresh();
        }
        /** 刷新进阶按钮显示状态 */
        private refreshUpAdvanceState(): void
        {
            this.btnUnlockAdvance.visible = this.boxUnlockAdvance.visible = !PrivilegeDataMgr.getPrivilegeCardValid(Pb_God._emPrivilegeCard.PrivilegeCard_WarOrder);
        }

        /** 刷新一键领奖按钮的状态 */
        private refreshAutoBtnState(): void
        {
            //是否有奖励可领
            let hasReward = false;
            //进阶是否开启
            let isOpenAdv = PrivilegeDataMgr.getPrivilegeCardValid(Pb_God._emPrivilegeCard.PrivilegeCard_WarOrder);
            let list = cfg.AchieveWarOrderPrizeCfgData.getAll();
            let curLevel = AchieveDataMgr.getWarOrderData().level;
            for (let cfgInfo of list)
            {
                if (cfgInfo.level > curLevel) continue;
                let prizeStete = AchieveDataMgr.getWarOrderLevelPrizeState(cfgInfo.level);
                //普通奖励没领
                if ((prizeStete & 1) == 0)
                {
                    hasReward = true;
                    break;
                }
                //进阶奖励可以领
                if (isOpenAdv && ((prizeStete & 2) >> 1 == 0))
                {
                    hasReward = true;
                    break;
                }
            }
            this.btnAutoReward.disabled = !hasReward;
            this.reddotOneKey.visible = hasReward;
        }

        /** 点击进阶 */
        private onClickUpAdvance(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_WarOrderCharge));
        }
        /** 点击一键领奖 */
        private onClickAutoReward(): void
        {
            AchieveSend.warOrderPrizeOneKey();
        }

        private _timerTarget = 0;
        private resetTimer(): void
        {
            //时间显示(从配置的开启天数起， 再按周期决定结束时间)
            let worldCreateZeroTime = TimeController.worldCreateZeroTime / 1000; //开服时间
            let currTimer = TimeController.currTimer / 1000;
            let startTime = worldCreateZeroTime + (cfg.AchieveConstCfgData.getFirstInfo().warOrderOpenDay - 1) * 24 * 3600;
            let period: number = cfg.AchieveConstCfgData.getFirstInfo().warOrderDuration * 24 * 3600; //周期
            this._timerTarget = currTimer + period - Math.floor(currTimer - startTime) % period;
            Laya.timer.loop(1000, this, this.onTimer);
            this.onTimer();
        }
        /** 刷新活动倒计时 */
        private onTimer(): void
        {
            let leftTimer = this._timerTarget - TimeController.currTimer / 1000;
            if (leftTimer < 0)
            {
                this.htmlTimer.showText = Global.getLangStr("activity_msg23");
            } else
            {
                this.htmlTimer.showText = Global.getLangStr("warorder_msg8", Global.GetRemindTime(leftTimer, 9));
            }
        }

        /** 页签组件销毁 */
        public dispose(): void
        {

        }
    }
}