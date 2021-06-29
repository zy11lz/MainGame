module Pro
{
    export class TaskMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Task.MainUI;

        private _isWeekLiveness = false;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Task.MainUI, 3);
        }

        /**
         * 关闭UI
         */
        public closeUI(): void
        {
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.tabGrp.onClick(this, this.onItemTabOnClick,
                [new component.UITabData("task_tab1"), new component.UITabData("task_tab2"), new component.UITabData("task_tab3")],
                [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]
            );
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(EventNotify.Achieve_Update, this, this.onUpdateAchieve);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            //关联红点与tab
            let redDotModes = [
                AchieveDataMgr.reddotModel.getChildModel("daily"),
                AchieveDataMgr.reddotModel.getChildModel("week"),
                AchieveDataMgr.reddotModel.getChildModel("achieve"),
            ]
            this.UIPanel.tabGrp.setRedDotModelList(redDotModes);

            this.UIPanel.btnClose.onClick(this, this.closeUI);
            //默认页签
            let defaultIndex = this.UIOpenData.customObject || 0;
            this.UIPanel.tabGrp.setSelectTab(defaultIndex);
        }

        public refreshUI()
        {

        }

        private onUpdateAchieve(): void
        {
            this.UIPanel.tabGrp.activeCurrentTab();
        }

        //-----------------------------------页签------------------------------------------
        /** 选择页签 */
        private onItemTabOnClick(tab: component.UITab, tabIndex: number)
        {
            this._isWeekLiveness = tabIndex == 1;
            this.UIPanel.DailyTaskBox.visible = tabIndex == 0 || tabIndex == 1;
            this.UIPanel.txtWeekTips.visible = this._isWeekLiveness;
            if (tabIndex == 0 || tabIndex == 1)
            { //周常与日常
                this.UIPanel.itemListBox.y = 490;
                this.UIPanel.itemListBox.height = tabIndex == 0 ? 590 : 580;
                this.refreshActiveBox();
                this.UIPanel.ItemList.onRefreshWithArray(AchieveDataMgr.getLiveList(this._isWeekLiveness, true), this, this.onLiveItemRenderer);
            }
            else
            {
                this.UIPanel.itemListBox.y = 300;
                this.UIPanel.itemListBox.height = 775;
                this.UIPanel.ItemList.onRefreshWithArray(AchieveDataMgr.getMainAchieveList(true), this, this.onMainItemRenderer);
            }
            this.UIPanel.ItemList.scrollTo(0);
        }

        //---------------------------------每日任务----------------------------------------
        /** 每日任务item刷新 */
        private onLiveItemRenderer(itemUI: ProUI.Task.TaskInfoItemUI, index: number)
        {

            let tempInfo = this.UIPanel.ItemList.getItem(index) as Pb_God.PBPlayerOneAchieve;
            if (tempInfo == null) { return; }
            let achieveCfgInfo = this._isWeekLiveness ? cfg.AchieveWeekLivenessCfgData.getInfo(tempInfo.id) : cfg.AchieveLivenessCfgData.getInfo(tempInfo.id);
            let taskRewardAry = cfg.AddItemInfo.getAddItemAttr(achieveCfgInfo, achieveCfgInfo.addItem, "addItemInfoAry");
            let taskAllNum = achieveCfgInfo.value;
            let taskType = achieveCfgInfo.achieveType;
            itemUI.NameLb.text = achieveCfgInfo.name;
            //某些任务类型的显示数据比例不一样
            let showRate = 1;
            if (taskType == Pb_God._emAchieveType.AchieveType_Charge) showRate = 10;
            itemUI.ProgressLb.text = Global.FormatString("{0}/{1}", Math.floor(tempInfo.value / showRate), Math.floor(taskAllNum / showRate));
            itemUI.ProgressImg.width = (tempInfo.value / taskAllNum * 150) > 150 ? 150 : (tempInfo.value / taskAllNum * 150);
            itemUI.ProgressInfo.visible = !AchieveDataMgr.isLiveFinish(tempInfo.id, this._isWeekLiveness);
            itemUI.RewardBox.onRefresh(taskRewardAry.length, this, (itemRewardUI: NorItemUI, index: number) =>
            {
                itemRewardUI.setItemInfo(taskRewardAry[index]);
            });
            itemUI.RewardBtn.visible = tempInfo.value >= taskAllNum && !AchieveDataMgr.isLiveFinish(tempInfo.id, this._isWeekLiveness);
            itemUI.GoBtn.visible = tempInfo.value < taskAllNum;
            itemUI.FinishImg.visible = AchieveDataMgr.isLiveFinish(tempInfo.id, this._isWeekLiveness);
            itemUI.RewardBtn.onClick(this, () =>
            {
                this._isWeekLiveness ? AchieveSend.weekLivenessComplete(tempInfo.id) : AchieveSend.livenessComplete(tempInfo.id);
            });
            itemUI.GoBtn.onClick(this, () =>
            {
                if (!TaskUtils.gotoOpenByAchieveType(taskType, achieveCfgInfo.achieveSubType)) this.closeUI();
            });
        }

        //---------------------------------成就任务----------------------------------------
        /** 成就任务item刷新 */
        private onMainItemRenderer(itemUI: ProUI.Task.TaskInfoItemUI, index: number)
        {
            let tempInfo = this.UIPanel.ItemList.getItem(index) as cfg.AchieveMainAchieveCfgInfo;
            if (tempInfo == null) { return; }
            let tempNum = AchieveDataMgr.getMainValue(tempInfo.iD);
            let achieveCfgInfo = cfg.AchieveMainAchieveCfgData.getInfo(tempInfo.iD);
            let taskRewardAry = cfg.AchieveMainAchieveCfgData.getAddItemAryById(tempInfo.iD);
            let taskAllNum = achieveCfgInfo.value;
            let taskType = achieveCfgInfo.achieveType;
            itemUI.NameLb.text = achieveCfgInfo.name;
            itemUI.ProgressLb.text = Global.FormatString("{0}/{1}", tempNum, taskAllNum);
            itemUI.ProgressImg.width = (tempNum / taskAllNum * 150) > 150 ? 150 : tempNum / taskAllNum * 150;
            itemUI.RewardBox.onRefresh(taskRewardAry.length, this, (itemRewardUI: NorItemUI, index: number) =>
            {
                itemRewardUI.setItemInfo(taskRewardAry[index]);
            });
            let isFinish = AchieveDataMgr.isMainFinish(tempInfo.iD);
            itemUI.RewardBtn.visible = tempNum >= taskAllNum && !isFinish;
            itemUI.GoBtn.visible = tempNum < taskAllNum;
            itemUI.FinishImg.visible = isFinish;
            itemUI.RewardBtn.onClick(this, () =>
            {
                AchieveSend.mainComplete(tempInfo.iD);
            });
            itemUI.GoBtn.onClick(this, () =>
            {
                if (!TaskUtils.gotoOpenByAchieveType(taskType, achieveCfgInfo.achieveSubType)) this.closeUI();
            });
        }

        //---------------------------------活跃度刷新----------------------------------------
        /** 刷新活跃状态 */
        private refreshActiveBox()
        {

            var curNum = AchieveDataMgr.getLivessValue(this._isWeekLiveness);
            let tempLiveAry = this._isWeekLiveness ? cfg.AchieveWeekLivenessPrizeCfgData.getDataList() : cfg.AchieveLivenessPrizeCfgData.getDataList();
            let lastOneInfo = tempLiveAry[tempLiveAry.length - 1];
            let maxNum = cfg.AddItemInfo.getAddItemAttr(lastOneInfo, lastOneInfo.needItem, "needItemAry")[0].itemcount;

            this.UIPanel.ActiveValueImg.width = curNum / maxNum * 530;
            this.UIPanel.ActiveValueLb.text = curNum + "/" + maxNum;
            this.UIPanel.ActivteGiiftBox.onRefresh(tempLiveAry.length, this, (tempUI: Pro.ProgressChestItemUI, index: number) =>
            {
                let cfgInfo = tempLiveAry[index];
                let tempBoxID = cfgInfo.iD;
                let tempItemAry = cfg.AddItemInfo.getAddItemAttr(cfgInfo, cfgInfo.needItem, "needItemAry");
                let tempIsHave = AchieveDataMgr.isGiftBoxFinish(tempBoxID, this._isWeekLiveness);
                var curNum = AchieveDataMgr.getLivessValue(this._isWeekLiveness);
                let tempIsActive = curNum >= tempItemAry[0].itemcount

                tempUI.bindData = cfgInfo;
                tempUI.setBoxTypeIndex(index);
                tempUI.setText(tempItemAry[0].itemcount);
                tempUI.index = index;
                tempUI.setOpenState(tempIsActive, tempIsHave);
                tempUI.onClick(this, tempIsHave ? null : this.onIconClick);

                if (!tempIsHave)
                {
                    let addItem = cfg.AddItemInfo.getAddItemAttr(cfgInfo, cfgInfo.addItem, "addItemAry");
                    tempUI.showBubble(Global.getItemIconById(addItem[0].itemid), addItem[0].itemcount);
                }
                else
                {
                    tempUI.hideBubble();
                }
            });

        }

        private onIconClick(tempUI: Pro.ProgressChestItemUI)
        {
            let cfgInfo = tempUI.bindData as cfg.AchieveLivenessPrizeCfgInfo | cfg.AchieveWeekLivenessPrizeCfgInfo;
            let tempItemAry = cfg.AddItemInfo.getAddItemAttr(cfgInfo, cfgInfo.needItem, "needItemAry");
            let curNum = AchieveDataMgr.getLivessValue(this._isWeekLiveness);
            if (curNum >= tempItemAry[0].itemcount)
            {
                this._isWeekLiveness ? AchieveSend.weekLivenessPrize(cfgInfo.iD) : AchieveSend.livenessPrize(cfgInfo.iD);
            }
            else
            {
                let items = cfg.AddItemInfo.getAddItemAttr(cfgInfo, cfgInfo.addItem, "addItemAry")
              
                //不止有迎新战令所以改成遍历所有战令
                let allActivity = cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_WarOrder);
                for (let actCfgInfo of allActivity)
                {
                    let isOpen = ActivityDataMgr.checkActivityOpenState(actCfgInfo.iD)
                    let arr = [];
                    if (!isOpen)
                    {
                        //如果不再活动中 不要显示战令那边的道具奖励
                        arr = items.filter(element => element.itemid != CfgID.ItemID.WelcomeWarOrderScore);
                    }
                    else
                        arr = items;
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RewardPreview, arr));
                }


            }
        }

    }
}