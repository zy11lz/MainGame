module Pro
{
    /**
     * 界面说明： 探宝
    * @author jason.xu
    */
    export class TreasureMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Treasure.TreasureUI;
        /** 格子数量 */
        private GRID_COUNT = 8;

        /** 当前探宝方式(1普通探宝 2高级探宝) */
        private _curType = 0;

        //转盘有几种状态
        //1. 正常等待中
        //2. 向服务器请求探宝，正在等待回应中
        //3. 抽奖过程
        //4. 显示抽奖结果，延时复原
        /** 当前转盘所指向的位置 */
        private _turnIndex = 0;
        /** 抽奖数据（正在抽奖中时才有值，用于在抽奖过程中tween的变化） */
        private _turnData = null;
        /** 驱动转盘跳动的延时时间（正常等待中与抽奖后显示结果的时间不一定相同） */
        private _waitTime = 0;

        /** 刷新动画中 */
        private _refreshing = false;

        /** 当前展示的消耗品ID */
        private _curCostId: number;
        /** 当前展示的幸运值Id */
        private _curLuckeyId: number;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas('treasure')];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return [];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Treasure.TreasureUI, 1, BaseAddLayer.CenterUI, false, 3);
        }

        public closeUI(): void
        {
			TreasureDataMgr.reddotModel.setRedDot(0);
            //如果正在抽奖效果中，则直接弹出奖励提示
            this.checkAndForceShowRewardView();

            this._curType = 0;
            Laya.timer.clear(this, this.onTimer);
            Laya.timer.clear(this, this.onLoop);
            super.closeUI();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            //主分页按钮
            this.UIPanel.tabGrp.onClick(this, this.onClickTabGroup,
                [new component.UITabData("treasure_tab1"), new component.UITabData("treasure_tab2")],
                [new component.UITabStyle("#f13a53", 2, "#fffced"), new component.UITabStyle("#fffced", 2, "#f13a53")]
            );
            this.UIPanel.tabGrp.onRenderRefresh(this, this.onItemTabRender);
        }
        private onItemTabRender(itemUI: component.UIButton, index: number)
        {
            let bgImg = itemUI.getChildByName("bg") as component.UIFrameImage;
            let txtLabel = itemUI.getChildByName("Text") as component.UILabel;
            let RedDotImg = itemUI.getChildByName("RedDotImg") as Laya.Image;

            let isSel = index == this.UIPanel.tabGrp.tabIndex;
            bgImg.frame = isSel ? 2 : 1;
            bgImg.scaleX = index == 0 ? 1 : -1;
            // txtLabel.x = index == 0 ? 107 : 74;
            // RedDotImg.x = index == 0 ? 150 : 127;
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            //关联红点模型
            let reddotModel = TreasureDataMgr.reddotModel;
            let redDotModes = [
                reddotModel.getChildModel(1),
                reddotModel.getChildModel(2)
            ]
            this.UIPanel.tabGrp.setRedDotModelList(redDotModes);

            Laya.timer.frameLoop(1, this, this.onLoop);
            let defauIndex: number = 0;
            if (this.UIOpenData.customObject) { defauIndex = this.UIOpenData.customObject; }
            if (defauIndex == 1 && cfg.TreasureHuntTypeCfgData.getNeedLevelByType(defauIndex + 1) > PlayerDataMgr.level) { defauIndex = 0; }
            this.UIPanel.tabGrp.setSelectTab(defauIndex);
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnHelp.onClick(this, this.onClickHelp);
            this.UIPanel.btnTreasure.onClick(this, this.onClickTreasure);
            this.UIPanel.btnMoreTreasure.onClick(this, this.onClickMoreTreasure);
            this.UIPanel.btnRefresh.onClick(this, this.onClickRefresh);
            this.UIPanel.btnShowAll.onClick(this, this.onClickShowAll);
            this.UIPanel.btnShop.onClick(this, this.onClickShop);
            //data events
            //	 幸运值兑换物品返回 	 PBG2CTreasureLucky
            this.addEventMgr(Cmd.S2C_Treasure_Lucky.cmdName, this, this.onLucky)
            //	 刷新返回				PBG2CTreasureRefresh
            this.addEventMgr(Cmd.S2C_Treasure_Refresh.cmdName, this, this.onRefresh)
            //	 探宝返回				PBG2CTreasureHunt
            this.addEventMgr(Cmd.S2C_Treasure_Hunt.cmdName, this, this.onHunt);
            //道具有变更
            this.addEventMgr(EventNotify.PlayerItemNumChange, this, this.onItemNumChange);
            //	 获得物品记录返回		 PBW2CItemLogs
            this.addEventMgr(Cmd.S2C_Common_WorldItemLog.cmdName, this, this.onGetLog)
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 点击分页 */
        onClickTabGroup(tab: component.UITab, tabIndex: number, oldTabIndex: number): void
        {
            let type = tabIndex + 1;
            if (type == 2 && cfg.TreasureHuntTypeCfgData.getNeedLevelByType(type) > PlayerDataMgr.level)
            {
                TipsUtils.showTipsByLanId("item_review_msg20", cfg.TreasureHuntTypeCfgData.getNeedLevelByType(type));
                this.UIPanel.tabGrp.setSelectTab(oldTabIndex);
                return;
            }

            if (this._curType == type) { return; }
            this._refreshing = false;
            this._curType = type;
            this.setUIBG(Global.getUIBGPathWithResUrl(`tanbao_bg${ type }.jpg`));
            this.UIPanel.turntableBg.frame = type;
            this.refreshView();
            this.checkAndForceShowRewardView();

            //请求控宝记录
            CommonSend.worldItemLog(Pb_God._emWorldItemLogType.WorldItemLog_Treasure + this._curType - 1);
        }

        /** 点击规则说明 */
        private onClickHelp(btn: component.UIButton): void
        {
            CommonHelpView.showWithLangKey(btn, "treasure_help");
        }

        /** 点击探宝 */
        private onClickTreasure(): void
        {
            if (!this.checkCanOp()) { return; }
            let costCfgInfo = cfg.TreasureCostCfgData.getListByType(this._curType)[0];
            //判断消耗品是否足够
            let costItem = cfg.TreasureCostCfgData.getNeedItemInfoByInfo(costCfgInfo);
            if (!Global.isFullRes(costItem.itemid, costItem.itemcount, true)) { return; }
            this._lastTreasureTime = Laya.timer.currTimer;
            TreasureSend.hunt(costCfgInfo.index, false);
        }

        /** 点击批量探宝 */
        private onClickMoreTreasure(): void
        {
            if (!this.checkCanOp()) { return; }
            let costCfgInfo = cfg.TreasureCostCfgData.getListByType(this._curType)[1];
            //判断VIP
            if (PrivilegeDataMgr.vipLevel < costCfgInfo.vIP)
            {
                TipsUtils.showTipsByLanId("tips_msg53", costCfgInfo.vIP);
                return;
            }
            //判断消耗品是否足够
            let costItem = cfg.TreasureCostCfgData.getNeedItemInfoByInfo(costCfgInfo);
            if (!Global.isFullRes(costItem.itemid, costItem.itemcount, true)) { return; }
            this._lastTreasureTime = Laya.timer.currTimer;
            TreasureSend.hunt(costCfgInfo.index, false);
        }

        /** 点击刷新 */
        private onClickRefresh(): void
        {
            if (!this.checkCanOp()) { return; }
            if (this._refreshing)
            {
                TipsUtils.showTipsByLanId("common_OpOften2");
                return;
            }
            let data = TreasureDataMgr.getDataByType(this._curType);
            //判断是否需要收费
            if (data.nextresettime > TimeController.currTimer / 1000)
            {
                //二级弹窗确认
                let cfgInfo = cfg.TreasureHuntTypeCfgData.getInfo(this._curType);
                let needItem = cfg.AddItemInfo.getAddItemAttr(cfgInfo, cfgInfo.refreshNeedItem, "refreshNeedItemArr")[0];
                let needName = cfg.ItemCfgData.getNameById(needItem.itemid);
                let alertDes = Global.getLangStr("shop_msg27", needItem.itemcount + needName);
                AlertShow.showConfirmAlert(alertDes, this, () =>
                {
                    if (!Global.isFullRes(needItem.itemid, needItem.itemcount, true)) { return; }
                    this._refreshing = true;
                    TreasureSend.refresh(this._curType);
                }, "common_confirm", "common_cancel", 0, 0, "TodayRepeatTreasureRefresh");
                return;
            }
            this._refreshing = true;
            TreasureSend.refresh(this._curType);
        }

        /** 记录上次操作的时间 */
        private _lastTreasureTime = 0;
        /** 检查当前能否操作 */
        private checkCanOp(): boolean
        {
            if (this._turnData || this._lastTreasureTime > Laya.timer.currTimer - 2000)
            {
                TipsUtils.showTipsByLanId("tips_msg54");
                return false;
            }
            return true;
        }

        /** 点击查看所有（概率） */
        private onClickShowAll(): void
        {
            TreasureRandomAllTips.show(this._curType);
        }

        /** 点击商店 */
        private onClickShop(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Shop, Pb_God._emShopType.ShopType_Treasure), BaseBackUIType.HideBackUI);
        }

        /** 收到当前探宝记录 */
        private onGetLog(value: Pb_God.PBWorldItemLogs)
        {
            if (this._curType + Pb_God._emWorldItemLogType.WorldItemLog_Treasure - 1 != value.type) { return; }
            let list = value.items.concat();
            
            let len:number=list.length>1?1:list.length;
            if(len){
                this.UIPanel.listRecord.height=len*33-11
            }
            else{
                this.UIPanel.listRecord.height=24;
            }
            this.UIPanel.listRecodBgImg.height=135+this.UIPanel.listRecord.height


            this.UIPanel.listRecord.visible = true;
            this.UIPanel.listRecord.onRefreshWithArray(list, this, (spr: Laya.Sprite, index: number) =>
            {
                let htmltext: component.UIHtmlText=spr.getChildAt(0) as component.UIHtmlText;
                let data = list[index];
                if(data){
                    let itemName = cfg.ItemCfgData.getNameById(data.item[0].key);
                    htmltext.showText = Global.getLangStr("treasure_msg3", data.playername, itemName);                
                }
            });
        }

        /** 刷新道具数量 */
        private onItemNumChange(fID: number, tempNewNum: number): void
        {
            if (fID == this._curCostId)
            { //消耗品（探宝券）有变更
                this.UIPanel.txtItemCount.text = tempNewNum + "";
            } else if (fID == this._curLuckeyId)
            { //幸运值有变更
                this.refreshProgressRewardView();
            }
        }

        /*****
         *	 刷新返回				PBG2CTreasureRefresh
         * @param PBG2CTreasureRefresh
         * 		type			uint32	 类型
         * 		items			uint32	 刷新出来的物品index(也就是displayItems)，先后顺序对应位置
         * 		rand			uint32	 刷出来随机物品（hunt表中index条目的第几个随机物品，从0开始），位置与items对应
         * 		resettime			uint32	 下次免费刷新的重置时间
         */
        protected onRefresh(value: Pb_God.PBG2CTreasureRefresh): void
        {
            if (value.type != this._curType) { return; }
            SoundMgr.Inst().playSound("refresh");
            //特效
            let tmpEffPos = new Laya.Point(this.UIPanel.boxCells.x + this.UIPanel.boxCells.width / 2, this.UIPanel.boxCells.y + this.UIPanel.boxCells.height / 2);
            let tmpEffNode = EffectMgr.Inst.createEffectOne("ui_tanbaoRefresh", tmpEffPos, null, 1.67, 1, this.UIPanel, true, ResReleaseType.Reference, true);
            Laya.timer.once(tmpEffNode.effAllTime / 2, this, () =>
            {
                this._refreshing = false;
                //刷新轮盘道具
                this.refreshAllTurnItems();
                this.resetFreeRefreshTimer();
            });
        }

        /*****
         *	 探宝返回				PBG2CTreasureHunt
         * @param PBG2CTreasureHunt
         * 		type			uint32	 类型
         * 		items			uint32	 得到的物品position(在displayitems里的位置，从0开始的),先后顺序对应第几次摇出
         */
        protected onHunt(value: Pb_God.PBG2CTreasureHunt): void
        {
            if (value.type != this._curType) { return; }
            //如果有广播的道具，则需要重新拉取一次控宝记录
            if (value.broadcast)
            { CommonSend.worldItemLog(Pb_God._emWorldItemLogType.WorldItemLog_Treasure + this._curType - 1); }
            /** 把所有奖励的道具整理一次，等动画播完以后再显示出来 */
            //幸运值分开计算
            let luckyItemInfo = new cfg.AddItemInfo();
            let allItems: cfg.AddItemInfo[] = [];
            let data = TreasureDataMgr.getDataByType(this._curType);
            //策划提出来奇葩道具列表显示排序规则， 探宝积分>1>3>5>7>8>2>4>6
            let sortPosIndex = [1, 3, 5, 7, 8, 2, 4, 6];
            let posMap = {};
            for (var posIndex of value.items)
            {
                let count = posMap[posIndex] || 0;
                posMap[posIndex] = count + 1;
            }
            for (let pos of sortPosIndex)
            {
                let posIndex = pos - 1;
                let count = posMap[posIndex] || 0;
                for (let i = 0; i < count; i++)
                {
                    let cfgInfo = cfg.TreasureHuntCfgData.getInfo(data.displayitems[posIndex]);
                    allItems[allItems.length] = cfg.TreasureHuntCfgData.getAddRandItemArrByInfo(cfgInfo)[data.displayrand[posIndex] || 0];
                    let luckyAddItemInfo = cfg.AddItemInfo.getAddItemAttr(cfgInfo, cfgInfo.addItem, "addItemInfo")[0];
                    luckyItemInfo.itemid = luckyAddItemInfo.itemid;
                    luckyItemInfo.itemcount += luckyAddItemInfo.itemcount;
                }
            }

            // for (var posIndex of value.items) {
            //     let cfgInfo = cfg.TreasureHuntCfgData.getInfo(data.displayitems[posIndex]);
            //     allItems[allItems.length] = cfg.TreasureHuntCfgData.getAddRandItemArrByInfo(cfgInfo)[data.displayrand[posIndex] || 0];
            //     let luckyAddItemInfo = cfg.AddItemInfo.getAddItemAttr(cfgInfo, cfgInfo.addItem, "addItemInfo")[0];
            //     luckyItemInfo.itemid = luckyAddItemInfo.itemid;
            //     luckyItemInfo.itemcount += luckyAddItemInfo.itemcount;
            // }
            allItems.unshift(luckyItemInfo);
            let isMult = value.items.length > 1;
            if (value.oncemone)
            { //如果是从奖励界面点的再来一次， 就不需要播动画了，直接显示奖励即可
                this.refreshAllTurnItems(); //显示道具奖励时，刷新一下轮盘上的显示，将该置灰的置灰
                this.showRewardView(allItems, isMult, true);
            } else
            {
                this.turnToResult(value.items[0], allItems, isMult);
            }
        }

        /*****
         *	 幸运值兑换物品返回 	 PBG2CTreasureLucky
         * @param PBG2CTreasureLucky
         * 		index			uint32	 索引
         * 		reset			bool	 是否重置
         */
        protected onLucky(value: Pb_God.PBG2CTreasureLucky): void
        {
            this.refreshProgressItemList();
        }


        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }


        /** 循环驱动转盘 */
        private onLoop(): void
        {
            if (this._turnData)
            { //正在播放动画效果中
                this.setTurnIndex(Math.ceil(this._turnData.move));
            } else
            {
                if (this._waitTime <= 0)
                {
                    this.setTurnIndex(this._turnIndex + 1);
                    this._waitTime = 700; //毫秒
                } else
                {
                    this._waitTime -= Laya.timer.delta;
                }
            }
        }

        /** 拿到抽奖结果，将转盘转至目标位置 */
        private turnToResult(targetIndex: number, rewards: cfg.AddItemInfo[], isMult: boolean): void
        {
            if (this._turnData) { Laya.Tween.clearTween(this._turnData); }
            this._turnData = { targetIndex: targetIndex, move: this._turnIndex, rewards: rewards, isMult: isMult };
            targetIndex = 5 * this.GRID_COUNT + targetIndex;
            let time = (targetIndex - this._turnIndex) * 90;
            //Laya.Ease.expoOut
            //Laya.Ease.quintOut
            //Laya.Ease.sineOut
            //Laya.Ease.circOut
            //Laya.Ease.cubicOut
            Laya.Tween.to(this._turnData, { move: targetIndex }, time, Laya.Ease.circOut, Laya.Handler.create(this, () =>
            {
                if (!this._turnData) { return; }
                this.refreshAllTurnItems(); //显示道具奖励时，刷新一下轮盘上的显示，将该置灰的置灰
                this.showRewardView(this._turnData.rewards, this._turnData.isMult);
                this.setTurnIndex(this._turnData.targetIndex); //再纠正一次，避免tween的误差
                this._waitTime = 1500; //结果多显示一会
                this._turnData = null;
            }));
        }

        private setTurnIndex(index: number): void
        {
            index = index % this.GRID_COUNT;
            if (this._turnIndex == index) { return; }
            this._turnIndex = index;
            let item = this.UIPanel.boxCells.getChildAt(this._turnIndex) as NorItemUI;
            this.UIPanel.imgTurnSel.pos(item.x, item.y);
        }
        /** 刷新分页显示 */
        private refreshView(): void
        {
            //消耗
            let costArr = cfg.TreasureCostCfgData.getListByType(this._curType);
            let cost1 = cfg.TreasureCostCfgData.getNeedItemInfoByInfo(costArr[0]);
            let cost2 = cfg.TreasureCostCfgData.getNeedItemInfoByInfo(costArr[1]);
            this._curCostId = cost1.itemid;
            Global.setResSmallIconWithItemID(this.UIPanel.imgNeedIcon1, cost1.itemid);
            Global.setResSmallIconWithItemID(this.UIPanel.imgNeedIcon2, cost1.itemid);
            Global.setResSmallIconWithItemID(this.UIPanel.imgNeedIcon3, cost2.itemid);
            this.UIPanel.txtItemCount.text = Global.getItemNum(this._curCostId) + "";
            this.UIPanel.txtMoreNeedCount.text = cost2.itemcount + "";
            this.UIPanel.txtMoreBtnLabel.text = Global.getLangStr("treasure_msg4", costArr[1].times);

            //刷新幸运值奖励显示
            this.refreshProgressRewardView();
            //刷新轮盘道具
            this.refreshAllTurnItems();
            this.resetFreeRefreshTimer();
        }

        /** 刷新轮盘上的道具展示
         */
        private refreshAllTurnItems(): void
        {
            let data = TreasureDataMgr.getDataByType(this._curType);
            for (var i = 0; i < this.GRID_COUNT; i++)
            {
                this.refreshTurnItem(i, data.displayitems[i], data.displayrand[i] || 0, data.displayitemsnum[i] || 0);
            }
        }

        /** 刷新指定位置上轮盘的道具展示
         * @param turnIndex 轮盘的索引位置 （0-7）
         * @param huntIndex 随机表位置
         * @param randomIndex 随机表中，道具的位置（AddRandItem）
         * @param getNum 此道具已获取的数量
         */
        private refreshTurnItem(turnIndex: number, huntIndex: number, randomIndex: number, getNum: number): void
        {
            let item = this.UIPanel.boxCells.getChildAt(turnIndex) as NorItemUI;
            let huntCfgInfo = cfg.TreasureHuntCfgData.getInfo(huntIndex);
            if (!huntCfgInfo)
            {
                logE("treasure hunt error!");
                return;
            }
            let addIteminfo = cfg.TreasureHuntCfgData.getAddRandItemArrByInfo(huntCfgInfo)[randomIndex];
            item.setItemInfo(addIteminfo);
            item.setBoxGray(huntCfgInfo.limitNum > 0 && getNum >= huntCfgInfo.limitNum);
        }

        /** 刷新幸运值奖励显示 */
        private refreshProgressRewardView(): void
        {
            //分段计算进度条值
            //当前幸运值数量
            let cfgList = cfg.TreasureLuckyRewardCfgData.getListByType(this._curType);
            this._curLuckeyId = cfg.TreasureLuckyRewardCfgData.getNeedItemInfoByInfo(cfgList[0]).itemid;
            let boxCount = cfgList.length;
            let ownValue = Global.getItemNum(this._curLuckeyId);
            let childVlueList: number[] = [];
            for (var cfgInfo of cfgList)
            {
                let needItem = cfg.TreasureLuckyRewardCfgData.getNeedItemInfoByInfo(cfgInfo);
                childVlueList.push(needItem.itemcount);
            }
            let progress: number = Global.getTotalProgressByChildValueList(childVlueList, ownValue);
            Global.setProgressBarMask(this.UIPanel.imgProgress, progress);
            this.UIPanel.txtProgressValue.text = ownValue + "/" + cfg.TreasureLuckyRewardCfgData.getNeedItemInfoByInfo(cfgList[boxCount - 1]).itemcount;

            //同时刷新一次奖励列表，刷新奖励激活状态
            this.refreshProgressItemList();
        }
        /** 刷新进度条上的道具列表 */
        private refreshProgressItemList(): void
        {
            let list = cfg.TreasureLuckyRewardCfgData.getListByType(this._curType);
            this.UIPanel.listProgressItems.onRefresh(list.length, this, (tempUI: ProUI.Treasure.ProgressItemUI, index: number) =>
            {
                let cfgInfo = list[index];
                let needItemInfo = cfg.TreasureLuckyRewardCfgData.getNeedItemInfoByInfo(cfgInfo);
                tempUI.txtNum.text = needItemInfo.itemcount + "";
                let addItem = cfg.AddItemInfo.getAddItemAttr(cfgInfo, cfgInfo.addItem, "addItemInfoArr")[0];
                tempUI.txtCount.text = addItem.itemcount > 1 ? addItem.itemcount + "" : "";
                Global.setResIconWithItemID(tempUI.btnIcon, CfgID.ResType.Item, addItem.itemid);
                let data = TreasureDataMgr.getDataByType(this._curType);
                //领奖状态
                let isGet = data && data.luckyitems.indexOf(cfgInfo.index) >= 0;
                let isActive = needItemInfo.itemcount <= Global.getItemNum(this._curLuckeyId);
                tempUI.reddot.visible = isActive && !isGet;
                tempUI.btnIcon.gray = isGet;
                tempUI.btnIcon.onClick(this, () =>
                {
                    //已经领取或者还不能领的时候， 弹出道具详请，否则直接领奖
                    if (isGet || !isActive)
                    {
                        UIManager.Inst.forceOpen(new ItemReviewOpenUIData(addItem));
                    } else
                    {
                        TreasureSend.lucky(cfgInfo.index);
                    }
                })
            });
        }

        /** 重置免费刷新与倒计时显示 */
        private resetFreeRefreshTimer(): void
        {
            Laya.timer.loop(500, this, this.onTimer);

            let data = TreasureDataMgr.getDataByType(this._curType);
            let currTimer = TimeController.currTimer / 1000;
            let targetTime = data ? data.nextresettime : 0;
            let isFree = currTimer >= targetTime;
            this.UIPanel.txtFreeLabel.visible = isFree;
            this.UIPanel.hboxFee.visible = !isFree;
            if (!isFree)
            {
                let price = cfg.TreasureHuntTypeCfgData.getInfo(this._curType).refreshNeedItem.split("_")[1];
                this.UIPanel.txtFeePrice.text = Global.getLangStr("shop_msg25", price);
                this.UIPanel.hboxFee.refresh();
            }
            this.onTimer();
        }

        private onTimer(): void
        {
            let data = TreasureDataMgr.getDataByType(this._curType);
            let currTimer = TimeController.currTimer / 1000;
            let targetTime = data ? data.nextresettime : 0;
            this.UIPanel.txtTimer.text = Global.GetRemindTime(targetTime - currTimer, 4);
            if (targetTime <= currTimer)
            {
                Laya.timer.clear(this, this.onTimer);
                let isFree = true;
                this.UIPanel.txtFreeLabel.visible = isFree;
                this.UIPanel.hboxFee.visible = !isFree;
            }
        }



        /** 强制弹出奖励界面（用于在中途退出动画播放时） */
        private checkAndForceShowRewardView(): void
        {
            if (this._turnData)
            {
                Laya.Tween.clearTween(this._turnData);
                this.showRewardView(this._turnData.rewards, this._turnData.isMult, false);
                this._turnData = null;
            }
        }
        /** 播放奖励获得
         * @param 道具列表
         * @param isMult 是否为批量探宝
         * @param canAgain 是否可再来n次 (主界面关闭是不能再来了。)
         */
        private showRewardView(items: cfg.AddItemInfo[], isMult: boolean, canAgain: boolean = true): void
        {
            let mapCallBack = new ds.StringMap<CallBack>();
            mapCallBack.put("确定", null);
            let cfgList = cfg.TreasureCostCfgData.getListByType(this._curType);
            let cfgInfo = cfgList[isMult ? 1 : 0];
            mapCallBack.put(Global.getLangStr("treasure_msg1", cfgInfo.times), new CallBack(this, this.onAgain, [items, this._curType, isMult, canAgain]));
            AwardOpenUtils.showAwardOpen(items, null, null, mapCallBack);
            // UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_TreasureAward, [items, this._curType, isMult, canAgain]));
        }

        public onAgain(args): void
        {
            let canAgain: boolean = args[3];
            let isMult: boolean = args[2];
            if (!canAgain)
            {
                TipsUtils.showTipsByLanId("treasure_msg2");
                return;
            }
            let type: number = args[1];
            let cfgList = cfg.TreasureCostCfgData.getListByType(type);
            let cfgInfo = cfgList[isMult ? 1 : 0];
            //判断消耗品是否足够
            let costItem = cfg.TreasureCostCfgData.getNeedItemInfoByInfo(cfgInfo);
            if (!Global.isFullRes(costItem.itemid, costItem.itemcount, true)) return;
            TreasureSend.hunt(cfgInfo.index, true);
        }
    }
}