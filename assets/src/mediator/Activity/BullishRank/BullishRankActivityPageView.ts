module Pro
{
    /**
     * 界面说明： 牛气冲榜分页
     * 所有分页共用同一个视图类，但不同的实例。
    */
    export class BullishRankActivityPageView extends ProUI.ActivityMain.RankAct.MainViewUI implements ITableView
    {
        /** 对应的活动配置 */
        private _actCfgInfo: cfg.ActivityCfgInfo;
        private _rankActType: Pb_God._emActivityCrossRankType;
        private _rankType: Pb_God._emTopListType;

        /** 对应的付费商品列表 */
        private _chargeGiftList: cfg.ChargeCfgInfo[] = [];
        /** 对应的钻石购买商品列表 */
        private _diamonBuyList: cfg.ActivityRankCfgInfo[] = [];

        /** 活动倒计时的目标时间 */
        private _overTargetTime = 0;

        /**tab组 */
        private _tabDatas: component.UITabData[];

        constructor(actCfgInfo: cfg.ActivityCfgInfo)
        {
            super();
            this._actCfgInfo = actCfgInfo;
            this._rankActType = actCfgInfo.sonType;
            this._rankType = Pb_God._emTopListType.TopListType_CrossAcitivtyHero - Pb_God._emActivityCrossRankType.Activity_CrossRank_Hero + this._rankActType;
        }

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.bg.skin = "res/Unpack/bullishRank/xianshichongbang_pic04.jpg";
            this.tabGrp.onClick(this, this.onTabClick, null);
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public addEvent(): void
        {
            EventMgr.on(CmdEvent.TopList_List_Ack, this, this.onList_Ack);
            EventMgr.on(CmdEvent.Platform_update_chargeinfo, this, this.onUpdatePlatformRecharge);
            EventMgr.on(CmdEvent.Platform_SynCharge, this, this.onUpdatePlatformRecharge);

            EventMgr.on(EventNotify.Activity_Update, this, this.onActUpdate);

            EventMgr.on(EventNotify.RankActivity_Title, this, this.onRankActivityTitle)

            this.btnGift.onClick(this, this.onClickGift);
            this.btnHelp.onClick(this, this.onClickHelp);
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public removeEvent(): void
        {
            EventMgr.off(CmdEvent.TopList_List_Ack, this, this.onList_Ack);
            EventMgr.off(CmdEvent.Platform_update_chargeinfo, this, this.onUpdatePlatformRecharge);
            EventMgr.off(CmdEvent.Platform_SynCharge, this, this.onUpdatePlatformRecharge);
            EventMgr.off(EventNotify.Activity_Update, this, this.onActUpdate);
            EventMgr.off(EventNotify.RankActivity_Title, this, this.onRankActivityTitle)
        }

        private onRankActivityTitle(title)
        {
            if (this._tabDatas.length > 2)
            { this.tabGrp.setSelectTab(title); }
        }

        private onClickGift(): void
        {
            let tabIndex = 2;
            if (this.tabGrp.tabIndex == tabIndex)
            { TipsUtils.showTipsByLanId("common_currentPage"); }
            else
            { this.tabGrp.setSelectTab(tabIndex); }
        }

        private onClickHelp(btn: component.UIButton): void
        {
            CommonHelpView.showWithLangKey(btn, "Help_Bullish_Rank_Activity_" + this._rankActType);
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
            this._tabDatas = [new component.UITabData("activity_Rank_tab1"), new component.UITabData("activity_Rank_tab2")];
            this.refreshRankRewardView();
            //判断是否还在活动期内
            let openTimeInfo = cfg.ActivityCfgData.getOpenTimeInfoByID(this._actCfgInfo.iD);

            let tTime = this._actCfgInfo.isMerge ? TimeController.worldMergeZeroTime : TimeController.worldCreateZeroTime;
            if (openTimeInfo.isInOpenTime(TimeController.currTimer, tTime))
            {
                //判断是否有礼包可购买的
                this._chargeGiftList = PlatformDataMgr.getValidChargeListByType(Pb_God._emChargeType.ChargeType_ActivityCrossRank, this._rankActType);
                this._diamonBuyList = cfg.ActivityRankCfgData.getListByActivityId(this._actCfgInfo.iD);
                this.btnGift.visible = this._diamonBuyList.length + this._chargeGiftList.length > 0;
                if (this.btnGift.visible)
                {
                    this._tabDatas[this._tabDatas.length] = new component.UITabData("activity_Rank_tab3");
                    this.refreshChargeGiftView();
                }
                //活动倒计时
                this._overTargetTime = openTimeInfo.getEndTime(TimeController.currTimer, tTime);
                Laya.timer.loop(1000, this, this.onTimer);
                this.onTimer();
            } else
            {
                this._overTargetTime = 0;
                this.onTimer();
                this.btnGift.visible = false;
            }
            this.tabGrp.setTableData(this._tabDatas, [new component.UITabStyle("#5b545b"), new component.UITabStyle("#fff8db")])
            this.tabGrp.setSelectTab(0);
            //拉取排行数据
            this.vboxContent.visible = false;
            this.listRank.onRefresh(0, null, null);
            let showcount = cfg.ToplistCfgData.getShowLineByType(this._rankType);
            TopListSend.list(this._rankType, 1, showcount, 0, 0, 0, 0);
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
            Laya.timer.clear(this, this.onTimer);
        }

        private onTabClick(tab: component.UITab, tabIndex: number, oldTabIndex: number): void
        {
            this.listRankReward.visible = tabIndex == 0;
            this.listRank.visible = tabIndex == 1;
            this.listBuyGift.visible = tabIndex == 2;
        }

        public setData($data: any): void
        {

        }

        /** 更新充值信息 */
        private onUpdatePlatformRecharge(): void
        {
            if (this.tabGrp.tabIndex != 2) { return; }
            this.refreshChargeGiftView();
        }

        /** 更新付费购买信息 */
        private onActUpdate(actId: number): void
        {
            if (this._actCfgInfo && actId == this._actCfgInfo.iD)
            {
                this.refreshChargeGiftView();
            }
        }

        /** 收到排行榜 */
        private onList_Ack(topListValue: Pb_God.PBS2CTopListList)
        {
            if (!topListValue.ask || this._rankType != topListValue.ask.type) { return; }
            // //如果当前是充值排行，则还需要拉取自己与前一名的差距
            // if (this._rankActType == Pb_God._emActivityRankType.Activity_Rank_Charge)
            // {
            //     if (topListValue.ask.param == 0)
            //     {
            //         this.refreshRankView(topListValue.list);
            //         //再拉取一次自己前一名的
            //         if (topListValue.selfinfo && topListValue.selfinfo.info && topListValue.selfinfo.info.rank > 1)
            //         { TopListSend.list(this._rankType, topListValue.selfinfo.info.rank - 1, 1, 0, 0, 0, 1); } //拉取排行榜时，最后一个参数1表示只拉取自己前一名的， 2表示拉取榜单第一名用于显示在主界面提示的
            //         else
            //         { this.refreshSelfInfoView(topListValue.selfinfo); }
            //     } else if (topListValue.ask.param == 1)
            //     {
            //         this.refreshSelfInfoView(topListValue.selfinfo, topListValue.list[0]);
            //     }
            // } else
            // {
            this.refreshRankView(topListValue.list);
            this.refreshSelfInfoView(topListValue.selfinfo);
            // }
        }

        /** 刷新自己的排名信息显示 */
        private refreshSelfInfoView(selfInfo: Pb_God.PBTopListDetail, beforeOne: Pb_God.PBTopListDetail = null): void
        {
            this.vboxContent.visible = true;
            this.boxBeforeLastView.visible = this.boxBeforeLastView.layoutEnabled = !!beforeOne;
            this.vboxContent.refresh();
            //上榜限制
            let needValue = this._actCfgInfo.param.split(";")[1];
            let needValueTitle = Global.getLangStr("activity_Bullish_Rank_RankValue" + this._rankActType);
            let needValueString = Global.getLangStr("common_fieldbody", needValue); //:123
            this.txtLimitContent.text = Global.getLangStr("activity_Rank_msg2") + needValueTitle + needValueString;
            //我的排名+当前积分显示
            let rank = 0;
            let selfScoreValue = -1;
            //没有数据
            if (selfInfo && selfInfo.info)
            {
                rank = selfInfo.info.rank;
                selfScoreValue = selfInfo.info.value.toNumber();
            } else
            { //排行榜数据里面拿不到。就从活动数据里面去拿。
                selfScoreValue = ActivityDataMgr.getActivity_DataValue(this._actCfgInfo.iD, Pb_God._emActivityDataKey.Activity_Key_CrossRankValue);
            }
            this.txtMyRank.text = rank > 0 ? rank + "" : Global.getLangStr("common_norank");
            let scoreString = needValueTitle + (this._rankActType <= 2 ? "+" : "") + Global.getLangStr("common_fieldbody", selfScoreValue);
            this.txtMyScoreInfo.text = Global.getLangStr("common_bracket2", scoreString);
            this.txtMyScoreInfo.x = this.txtMyRank.x + this.txtMyRank.width + 5;

            //与前一名的数值差距
            if (beforeOne)
            {
                let leftValue = beforeOne.info.value.toNumber() - selfInfo.info.value.toNumber();
                if (leftValue <= 0) { leftValue = 1; }
                this.txtBeforeLastValue.text = Global.getLangStr("activity_Rank_msg3", leftValue);
            }
        }

        /** 刷新排行榜显示 */
        private refreshRankView(list: Pb_God.PBTopListDetail[]): void
        {
            let len = Math.max(list.length, 10);
            this.listRank.onRefresh(len, this, (itemUI: ProUI.ActivityMain.RankAct.RankItemUI, index: number) =>
            {
                let data = list[index];

                let rank = data ? data.info.rank : index + 1;
                if (rank <= 3 && rank != 0)
                {
                    itemUI.frameImgRank.frame = rank;
                    itemUI.txtRankNum.text = "";
                } else
                {
                    itemUI.frameImgRank.frame = 0;
                    itemUI.txtRankNum.text = "" + rank;
                }

                if (!data)
                { //没有数据时，只要显示虚位以待即可
                    itemUI.playerIcon.visible = false;
                    itemUI.txtNickname.text = Global.getLangStr("common_empty1"); //虚位以待
                    itemUI.txtNickname.y = 53;
                    itemUI.btnDetail.visible = false;
                    itemUI.txtRankValue.visible = false;
                    return;
                }

                itemUI.playerIcon.visible = true;
                itemUI.btnDetail.visible = true;
                itemUI.playerIcon.setPlayerDisplayInfo(data.playerdisplay, false, true);
                itemUI.txtNickname.text = data.playerdisplay.playername;
                itemUI.txtNickname.y = 33;

                //排行数值显示
                let needValueTitle = Global.getLangStr("activity_Bullish_Rank_RankValue" + this._rankActType);
                itemUI.txtRankValue.text = needValueTitle + Global.getLangStr("common_fieldbody", data.info.value);
                //充值榜特殊性：不显示积分
                itemUI.txtRankValue.visible = true;// this._rankActType != Pb_God._emActivityRankType.Activity_Rank_Charge;

                itemUI.btnDetail.onClick(this, () =>
                {
                    //是玩家自己
                    if (data.playerdisplay.playerid == PlayerDataMgr.uid)
                    {
                        TipsUtils.showTipsByLanId("tips_msg71");
                        return;
                    }
                    //查看玩家详细信息
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_PlayerInfo, data.playerdisplay));
                })
            })
        }

        /** 刷新排名奖励显示 */
        private refreshRankRewardView(): void
        {
            let list = cfg.ToplistRewardCfgData.getRewardListByType(this._rankType) || [];
            this.listRankReward.onRefreshWithArray(list, this, (itemUI: ProUI.ActivityMain.RankAct.RankRewardItemUI, index: number) =>
            {
                let cfgData = list[index];
                let lastRank = index > 0 ? list[index - 1].rank : 0;
                let curRank = cfgData.rank;
                if (curRank > lastRank + 1)
                {
                    //中间有差，则显示 a~b的形式
                    itemUI.frameImgRank.frame = 0;
                    itemUI.txtRankNum.text = (lastRank + 1) + "-" + curRank;
                } else if (curRank <= 3)
                {
                    //前3用图片显示
                    itemUI.frameImgRank.frame = curRank;
                    itemUI.txtRankNum.text = "";
                } else
                {
                    itemUI.frameImgRank.frame = 0;
                    itemUI.txtRankNum.text = curRank + "";
                }
                //奖励限制
                if (cfgData.limit > 0)
                {
                    itemUI.htmlExtraCondition.visible = true;
                    let scoreTitle = Global.getLangStr("activity_Bullish_Rank_RankValue" + this._rankActType);
                    itemUI.htmlExtraCondition.showText = Global.getLangStr("activity_Rank_msg5", cfgData.rank, scoreTitle, cfgData.limit);
                } else
                {
                    itemUI.htmlExtraCondition.visible = false;
                }
                let addItems = cfg.ToplistRewardCfgData.getAddItemAryByInfo(cfgData);
                itemUI.listItems.onRefresh(addItems.length, this, (itemUI: NorItemUI, index: number) =>
                {
                    itemUI.setItemInfo(addItems[index]);
                });
            });
        }

        /** 刷新直购礼包显示 */
        private refreshChargeGiftView(): void
        {
            let diamonLen = this._diamonBuyList.length;
            let allLen = diamonLen + this._chargeGiftList.length;
            this.listBuyGift.onRefresh(allLen, this, (itemUI: ProUI.ActivityMain.RankAct.GiftBuyItemUI, idx: number) =>
            {
                //付费购买
                if (idx >= diamonLen)
                {
                    let chargeCfgInfo = this._chargeGiftList[idx - diamonLen];
                    let chargeInfo = PlatformDataMgr.getChargeInfoByCfgInfo(chargeCfgInfo);
                    //限购
                    let buyCount = chargeInfo ? chargeInfo.buycount : 0;
                    let isFull = chargeCfgInfo.maxBuyCount > 0 && chargeCfgInfo.maxBuyCount <= buyCount;
                    itemUI.imgOver.visible = isFull;
                    if (isFull)
                    { //已购完
                        itemUI.btnDiamionBuy.visible = false;
                        itemUI.btnMoneyBuy.visible = false;
                        itemUI.htmlLimitCount.showText = "";
                    } else
                    {
                        itemUI.btnDiamionBuy.visible = false;
                        itemUI.btnMoneyBuy.visible = true;
                        itemUI.txtMoneyCount.text = Global.getLangStr("common_money", chargeCfgInfo.needMoney / 100);
                        itemUI.htmlLimitCount.showText = chargeCfgInfo.maxBuyCount > 0 ? Global.getLangStr("shop_msg22", buyCount, chargeCfgInfo.maxBuyCount) : "";
                    }
                    itemUI.btnMoneyBuy.onClick(this, () =>
                    {
                        PlatformDataMgr.onChargeRequest(chargeCfgInfo);
                    })
                    let addItems = cfg.ChargeCfgData.getAddItemAryByID(chargeCfgInfo.iD);
                    itemUI.listItems.onRefresh(addItems.length, this, (norItemUI: NorItemUI, addItemIndex: number) =>
                    {
                        norItemUI.setItemInfo(addItems[addItemIndex]);
                    });
                }
                else
                { //钻石购买
                    let cfgInfo = this._diamonBuyList[idx];
                    //已购数量
                    let buyCount = ActivityDataMgr.getActivityIndexDataValue(this._actCfgInfo.iD, cfgInfo.index, Pb_God._emActivityDataKey.Activity_Key_BuyCount);

                    let needItems = cfg.AddItemInfo.getAddItemAttr(cfgInfo, cfgInfo.needItem, "needItemInfoArr");
                    let isFull = buyCount >= cfgInfo.count;
                    itemUI.imgOver.visible = isFull;
                    if (isFull)
                    { //已购完
                        itemUI.btnDiamionBuy.visible = false;
                        itemUI.btnMoneyBuy.visible = false;
                        itemUI.htmlLimitCount.showText = "";
                    } else
                    {
                        itemUI.btnDiamionBuy.visible = true;
                        itemUI.btnMoneyBuy.visible = false;
                        itemUI.txtDiamionCount.text = needItems[0].itemcount + "";
                        itemUI.htmlLimitCount.showText = Global.getLangStr("shop_msg22", buyCount, cfgInfo.count);
                    }
                    itemUI.btnDiamionBuy.onClick(this, () =>
                    {
                        if (!Global.isFullAllRes(needItems, true))
                        { return; }
                        ActivitySend.drawReward(cfgInfo.activityID, cfgInfo.index, 0);
                    })
                    let addItems = cfg.AddItemInfo.getAddItemAttr(cfgInfo, cfgInfo.addItem, "addItemInfoArr");
                    itemUI.listItems.onRefresh(addItems.length, this, (norItemUI: NorItemUI, addItemIndex: number) =>
                    {
                        norItemUI.setItemInfo(addItems[addItemIndex]);
                    });

                }
            })
        }

        /** 页签组件销毁 */
        public dispose(): void
        {
            Laya.timer.clear(this, this.onTimer);
        }

        /** 刷新活动倒计时 */
        private onTimer(): void
        {
            let leftTime = this._overTargetTime - TimeController.currTimer;
            if (leftTime < 0)
            {
                this.txtTimer.text = Global.getLangStr("common_over");
                this.txtTimer.color = "#f54961";
            } else
            {
                this.txtTimer.text = Global.GetRemindTime(leftTime / 1000, 9);
                this.txtTimer.color = "#6eff62";
            }
        }
    }
}