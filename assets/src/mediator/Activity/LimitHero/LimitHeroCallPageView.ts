module Pro
{
    /**
     * 活动英雄抽卡页面
    */
    export class LimitHeroCallPageView extends ProUI.ActivityMain.HuPa.HuPaCallPageUI implements ITableView
    {
        private _actId: number;
        private _lotteryInfo: cfg.LotteryTypeCfgInfo;
        private _itemList;
        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {

        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.wishBtn.onClick(this, this.wishOne);
            this.wishsBtn.onClick(this, this.wishTen);
            // this.jumpBuyBtn.onClick(this, this.jumpBuy);
            this.helpBtn.onClick(this, this.onHelpClick);
            this.shopBtn.onClick(this, this.onShopClick);
            this.previewBtn.onClick(this, this.onPreviewClick);

            // 更新许愿池物品
            EventMgr.on(Cmd.S2C_Lottery_Pool_Set.cmdName, this, this.refreshDisplayInfo);
            // 道具有变更
            EventMgr.on(EventNotify.PlayerItemNumChange, this, this.onItemChange);
            EventMgr.on(Cmd.S2C_Lottery_Refresh.cmdName, this, this.onItemChange);
        }

        private onHelpClick()
        {
            let strHelp = Global.getLangStr("limitHero_" + this._lotteryInfo.petId);
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Help, strHelp));
        }

        private onShopClick()
        {
        }

        private onPreviewClick()
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_LimitHero, this._lotteryInfo.petIds), BaseBackUIType.HideBackUI);
        }

        /** 消耗道具变化 */
        private onItemChange(fID: number, tempNewNum: number): void
        {
            if (fID == cfg.LotteryCostCfgData.getCallItemIdByTypeAndIndex(cfg.LotteryTypeCfgData.getInfo(this._actId).type, 1))
            {
                this.itemCount.text = tempNewNum + "";
            }
            Laya.timer.frameOnce(20, this, this.refreshDisplayInfo);
        }

        /** 跳转道具购买入口 */
        private jumpBuy(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_TimeLimitActivity, 6, 1), 0);
            // let uiCfg = cfg.UiconfigUiopenCfgData.getInfo(parseInt(cfg.LotteryTypeCfgData.getInfoByType(cfg.LotteryTypeCfgData.getInfo(this._actId).type).getway));
            // TaskUtils.goto(uiCfg.panelNotify, uiCfg.page);
        }

        /** 刷新显示信息 */
        private refreshDisplayInfo(): void
        {
            let callItemId = cfg.LotteryCostCfgData.getCallItemIdByTypeAndIndex(cfg.LotteryTypeCfgData.getInfo(this._actId).type, 1);
            Global.setResSmallIconWithItemID(this.itemIcon, callItemId);
            this.itemCount.text = `${ Global.getItemNum(callItemId) }`;

            // 免费次数
            this.wishFree.visible = this._lotteryInfo.freeCount > LotteryDataMgr.limitHero.freecount;
            this.needBox.visible = !this.wishFree.visible;
            let wishone = cfg.LotteryCostCfgData.getInfoByTypeAndIndex(cfg.LotteryTypeCfgData.getInfo(this._actId).type, Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY1);
            let wishten = cfg.LotteryCostCfgData.getInfoByTypeAndIndex(cfg.LotteryTypeCfgData.getInfo(this._actId).type, Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY2);
            if (this._lotteryInfo.freeCount > LotteryDataMgr.limitHero.freecount)
            {
                this.wishFree.text = `${ Global.getLangStr("evolution_msg1") }${ this._lotteryInfo.freeCount - LotteryDataMgr.limitHero.freecount }/${ this._lotteryInfo.freeCount }`
            }
            else
            {
                // key1消耗类型 
                let costItem1: Array<cfg.AddItemInfo> = cfg.AddItemInfo.parse(wishone.needItem1);
                let costItem2: Array<cfg.AddItemInfo> = cfg.AddItemInfo.parse(wishone.needItem2);
                if (Global.isFullRes(costItem1[0].itemid, costItem1[0].itemcount, false) || costItem2.length == 0)
                {
                    Global.setResSmallIconWithItemID(this.needIcon1, costItem1[0].itemid);
                    this.needCount1.text = `${ costItem1[0].itemcount }`
                } else
                {
                    Global.setResSmallIconWithItemID(this.needIcon1, costItem2[0].itemid);
                    this.needCount1.text = `${ costItem2[0].itemcount }`
                }
                this.needBox.refresh();
            }
            // key2消耗类型 
            let tenItem1: Array<cfg.AddItemInfo> = cfg.AddItemInfo.parse(wishten.needItem1);
            let tenItem2: Array<cfg.AddItemInfo> = cfg.AddItemInfo.parse(wishten.needItem2);
            if (Global.isFullRes(tenItem1[0].itemid, tenItem1[0].itemcount, false) || tenItem2.length == 0)
            {
                Global.setResSmallIconWithItemID(this.needIcon2, tenItem1[0].itemid);
                this.needCount2.text = `${ tenItem1[0].itemcount }`
            } else
            {
                Global.setResSmallIconWithItemID(this.needIcon2, tenItem2[0].itemid);
                this.needCount2.text = `${ tenItem2[0].itemcount }`
            }

            let openInfo = cfg.ActivityCfgData.getOpenTimeInfoByID(this._actId);
            let iTime = cfg.ActivityCfgData.getIsMergeByID(this._actId) ? TimeController.worldMergeZeroTime : TimeController.worldCreateZeroTime;
            let startTime = openInfo.getStartTime(TimeController.currTimer, iTime);
            let endTime = openInfo.getEndTime(TimeController.currTimer, iTime);
            this.actTimeLbl.text = Global.getLangStr("activity_msg26", Global.getFormatTimeString(startTime, 10), Global.getFormatTimeString(endTime, 10));

            this._itemList = cfg.LotteryHuntCfgData.getHuPaShowInfo(cfg.LotteryTypeCfgData.getInfo(this._actId).type);
            this.list.onRefresh(this._itemList.length, this, this.onRefresh);
        }

        private onRefresh(item: NorItemUI, index: number)
        {
            item.setItemInfo(this._itemList[index], false, true, true);
        }

        /** 许愿一次 */
        private wishOne(): void
        {
            let wishOne = cfg.LotteryCostCfgData.getInfoByTypeAndIndex(cfg.LotteryTypeCfgData.getInfo(this._actId).type, Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY1);
            // 免费
            if (LotteryDataMgr.limitHero.freecount < this._lotteryInfo.freeCount)
            {
                LotterySend.refresh(cfg.LotteryTypeCfgData.getInfo(this._actId).type, Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY1)
                return;
            }
            //判断VIP
            if (PrivilegeDataMgr.vipLevel < wishOne.vIP)
            {
                TipsUtils.showTipsByLanId("tips_msg53", wishOne.vIP);
                return;
            }
            //判断消耗品是否足够
            let costItem1: Array<cfg.AddItemInfo> = cfg.AddItemInfo.parse(wishOne.needItem1);
            let costItem2: Array<cfg.AddItemInfo> = cfg.AddItemInfo.parse(wishOne.needItem2);
            if (!Global.isFullRes(costItem1[0].itemid, costItem1[0].itemcount, false) && costItem2.length < 1)
            {
                Global.isFullRes(costItem1[0].itemid, costItem1[0].itemcount, true) // 消耗品1 提示
            }
            else
            {
                // 消耗提示
                if (!TodayRepeatOpMgr.Inst.getTag(`lottery${ cfg.LotteryTypeCfgData.getInfo(this._actId).type }_${ Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY1 }`))
                {
                    UIManager.Inst.forceOpen(new TroopBuyItemOpenUIData(6, [cfg.LotteryTypeCfgData.getInfo(this._actId).type, Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY1]));
                }
                else
                {
                    LotterySend.refresh(cfg.LotteryTypeCfgData.getInfo(this._actId).type, Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY1)
                }
            }
        }

        /** 许愿十次 */
        private wishTen(): void
        {
            let wishTen = cfg.LotteryCostCfgData.getInfoByTypeAndIndex(cfg.LotteryTypeCfgData.getInfo(this._actId).type, Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY2);
            //判断VIP
            if (PrivilegeDataMgr.vipLevel < wishTen.vIP)
            {
                TipsUtils.showTipsByLanId("tips_msg53", wishTen.vIP);
                return;
            }
            //判断消耗品是否足够
            let costItem1: Array<cfg.AddItemInfo> = cfg.AddItemInfo.parse(wishTen.needItem1);
            let costItem2: Array<cfg.AddItemInfo> = cfg.AddItemInfo.parse(wishTen.needItem2);
            if (!Global.isFullRes(costItem1[0].itemid, costItem1[0].itemcount, false) && costItem2.length < 1)
            {
                Global.isFullRes(costItem1[0].itemid, costItem1[0].itemcount, true); // 消耗品1 提示
            }
            else
            {
                // 消耗提示
                if (!TodayRepeatOpMgr.Inst.getTag(`lottery${ cfg.LotteryTypeCfgData.getInfo(this._actId).type }_${ Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY2 }`))
                {
                    UIManager.Inst.forceOpen(new TroopBuyItemOpenUIData(6, [cfg.LotteryTypeCfgData.getInfo(this._actId).type, Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY2]));
                }
                else
                {
                    LotterySend.refresh(cfg.LotteryTypeCfgData.getInfo(this._actId).type, Pb_God._emLotteryRefreshType.LotteryRefreshType_KEY2)
                }
            }
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        dispose()
        {

        }

        public setData($data: any): void
        {
            this._actId = $data[0];
            this._lotteryInfo = cfg.LotteryTypeCfgData.getInfo(this._actId);
            this.bg.skin = `res/Unpack/limitHero/${ this._lotteryInfo.uIbg }`;
            this.refreshDisplayInfo();
        }

        public show()
        {
            // this.refreshDisplayInfo();
        }

        public hide()
        {

        }
    }
}