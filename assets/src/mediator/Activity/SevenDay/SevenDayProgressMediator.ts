module Pro
{
    /**
     * 7日目标礼包
     */
    export class SevenDayProgressMediator extends BaseMediator implements IMediator
    {

        /** UI面板 */
        public UIPanel: ProUI.ActivityMain.SevenDay.SevenDayProgressUI;

        // 服务端活动数据
        private act_data: Pb_God.PBPlayerActivityData;

        // 当前选中的天数格子
        private select_day_item: ProUI.ActivityMain.SevenDay.SevenDayProgressItemUI;

        // 当前选中的天数活动配置
        //private select_day_Cfg: cfg.ActivityAchievementCfgInfo;

        // 当前已经开放到的活动天数
        private cur_open_day: number = 1;

        // 当前页签类型 数组
        private cur_tabType_Arr: string[];

        // 当前列表配置数组
        private cur_listItems_Arr: cfg.ActivityAchievementCfgInfo[];


        // 活动总天数
        private day_count = 7;

        // 是否由窗口初始化刷新的每日数据
        // true:切换到最新开启日期 false:刷新当前选中天的数据
        private is_refreshPageByOpen: boolean = false;

        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("sevenDayProgress")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoChildUnLoadOtherRes(): Array<string>
        {
            return [];
        }

        /** UI打开前状态 */
        public openUI(): void
        {
            this.showPanel(ProUI.ActivityMain.SevenDay.SevenDayProgressUI, 3);
        }

        /** 关闭UI*/
        public closeUI(): void
        {
            this.closePanel();
            Laya.timer.clear(this, this.onTimer);

            GuideMgr.Inst.checkAndReActiveGuideByPauseStep(GuideStep.Func_7DayTarget_6);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.select_day_item = null;
            this.UIPanel.btn_close.onClick(this, this.closeUI);

            this.act_data = ActivityDataMgr.getActivityDataByType(Pb_God._emActivityType.Activity_Achievement);
        }

        /** 初始化面板(UI每次打开) */
        public initUI(): void
        {
            this.is_refreshPageByOpen = true;
            this.refreshPage();
            this.UIPanel.tab.setSelectTab(0);
            let select_day: any = this.UIPanel.day_box.getChildAt(0).getChildAt(this.cur_open_day - 1);
            select_day.activeEvent();

            Laya.timer.loop(1000, this, this.onTimer);
            this.onTimer();
        }

        /** 刷新活动倒计时 */
        private onTimer(): void
        {
            let act_end_time = ActivityDataMgr.getSevenDayAchieveEndTime();
            let leftTime = act_end_time - TimeController.currTimer / 1000;
            if (leftTime <= 0)
            {
                this.UIPanel.txt_time.showText = Global.getLangStr("activity_msg23");
                Laya.timer.clear(this, this.onTimer);
                EventMgr.trigger(EventNotify.Activity_Close, this.act_data.id);
                return;
            }
            this.UIPanel.txt_time.showText = Global.getLangStr("activity_msg5", Global.GetRemindTime(leftTime, 1));
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(EventNotify.Achieve_Activity_Update, this, this.refreshUI);
            this.addEventMgr(EventNotify.Activity_DrawReward, this, this.refreshUI);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
            Laya.timer.clear(this, this.onTimer);
        }

        private refreshPage(): void
        {
            this.cur_open_day = ActivityDataMgr.getActivityAchieveOpenDays(this.act_data.id);
            //新手引导时特殊处理
            if (GuideMgr.Inst.getInStep() == GuideStep.Func_7DayTarget_3) { this.cur_open_day = 1; }

            if (this._reddotBindCtrl) { this._reddotBindCtrl.cleanUp(); }
            let cur_progress = AchieveDataMgr.getActivity_LivessValue();

            // 天数
            this.UIPanel.day_box.onRefresh(this.day_count, this, this.onDayItemRefresh);
            // 进度条
            this.UIPanel.txt_progress.text = AchieveDataMgr.getActivity_FinishCount().toString();
            //分段计算进度条值
            let childVlueList: number[] = [];
            for (var cfgInfo of cfg.AchieveActivityLivenessPrizeCfgData.getDataList())
            {
                let needItemAry = cfg.AchieveActivityLivenessPrizeCfgData.getNeedItemAryById(cfgInfo.iD);
                childVlueList.push(needItemAry[0].itemcount);
            }
            let progress: number = Global.getTotalProgressByChildValueList(childVlueList, cur_progress);
            Global.setProgressBarMask(this.UIPanel.ActiveValueImg, progress);
            // 箱子
            this.UIPanel.itemBox.onRefresh(childVlueList.length, this, this.onProgressBoxRefresh);
        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        public refreshUI(): void
        {
            this.is_refreshPageByOpen = false;
            this.refreshPage();
            this.UIPanel.tab.activeCurrentTab();
            /*let select_day: any = this.UIPanel.day_box.getChildAt(0).getChildAt(this.last_select_day_index - 1);
            select_day.activeEvent();*/
        }

        /**
         * 7天数据刷新
         */
        private onDayItemRefresh(tempUI: ProUI.ActivityMain.SevenDay.SevenDayProgressItemUI, index: number): void
        {
            let day_index = index + 1;
            tempUI.txt_name.text = Global.getLangStr("common_theDay", day_index);
            let button_icon_id = cfg.ActivityCfgData.getAchieveButtonItemID(this.act_data.id, index);//按钮图标
            Global.setResIconWithItemID(tempUI.img_icon, CfgID.ResType.Item, button_icon_id);
            tempUI.name = index.toString();
            tempUI.onClick(this, this.onDayItemClick);

            if (this.is_refreshPageByOpen)
            {
                tempUI.img_Select.visible = false;
                tempUI.txt_name.color = "#4c739a";//#f13c55
                if (day_index == this.cur_open_day)
                {
                    this.select_day_item = tempUI;
                    tempUI.activeEvent();
                }
            }
            else{
                tempUI.txt_name.color = "#f13c55";
            }

            // 未到开放天数
            tempUI.img_icon.gray = day_index > this.cur_open_day;
            let reddotModel = AchieveDataMgr.reddotModelSevenDay;
            this.reddotBind(tempUI.RedDotImg, reddotModel.getChildModel(this.act_data.id + "day_" + day_index));
        }

        /**
         * 天数点击事件
         */
        private onDayItemClick(btn: ProUI.ActivityMain.SevenDay.SevenDayProgressItemUI): void
        {
            let day_index = parseInt(btn.name) + 1;
            let is_open = day_index <= this.cur_open_day;
            if (!is_open)
            {
                // 未开启
                TipsUtils.showTips(Global.getLangStr("tips_msg4"));
                return;
            }

            if (this.select_day_item)
            {
                this.select_day_item.img_Select.visible = false;
                this.select_day_item.txt_name.color = "#4c739a";
            }
            btn.img_Select.visible = true;
            btn.txt_name.color = "#f13c55";
            this.select_day_item = btn;


            this.cur_tabType_Arr = cfg.ActivityCfgData.getAchieveTabArr(this.act_data.id, day_index);//标签类型列表
            let tab_content_arr = [];
            for (let i in this.cur_tabType_Arr)//读取每个页签标题
            {
                let text = cfg.TextConfigCfgData.getChineseById("activity_achievement_" + this.cur_tabType_Arr[i]);
                tab_content_arr.push(new component.UITabData(text));
            }
            this.UIPanel.tab.onClick(this, this.onTabClick, tab_content_arr,
                [new component.UITabStyle("#5b545b", 1, "#5b545b"), new component.UITabStyle("#fff9ed", 1, "#fff9ed")]);
                // [new component.UITabStyle("#c3a38c", 2, "#573322"), new component.UITabStyle("#ffe4b5", 2, "#573322")]);                
            this.UIPanel.tab.activeCurrentTab();

            //关联每个页签的红点数据
            let redDotModes: RedDotModel[] = [];
            let reddotModel = AchieveDataMgr.reddotModelSevenDay;
            let day_reddot = reddotModel.getChildModel(this.act_data.id + "day_" + day_index);
            // 最多4个页签
            for (let i = 0; i < this.cur_tabType_Arr.length; i++)
            {
                if (day_reddot)
                { redDotModes.push(day_reddot.getChildModel("tab_" + i)); }
            }

            this.UIPanel.tab.setRedDotModelList(redDotModes);
        }

        /**
         * 活跃度箱子刷新
         * @param tempUI
         * @param index
         */
        private onProgressBoxRefresh(tempUI: Pro.ProgressChestItemUI, index: number): void
        {
            let box_cfg = cfg.AchieveActivityLivenessPrizeCfgData.getDataList()[index];

            let tempItemAry = cfg.AchieveActivityLivenessPrizeCfgData.getNeedItemAryById(box_cfg.iD);
            let tempIsHave = AchieveDataMgr.isActivity_GiftBoxFinish(box_cfg.iD);
            let curNum = AchieveDataMgr.getActivity_LivessValue();
            let tempIsActive = curNum >= tempItemAry[0].itemcount;

            tempUI.setBoxTypeIndex(index);
            tempUI.setText(tempItemAry[0].itemcount, "#5d565d");
            tempUI.index = index;
            tempUI.setOpenState(tempIsActive, tempIsHave);
            tempUI.onClick(this, tempIsHave ? null : this.onProgressBoxClick);
        }

        /**
         * 活跃度箱子点击事件
         * @param tempUI
         */
        private onProgressBoxClick(tempUI: Pro.ProgressChestItemUI): void
        {
            let tempIndex = tempUI.index;
            let tempInfo = cfg.AchieveActivityLivenessPrizeCfgData.getDataList()[tempIndex];
            let tempItemAry = cfg.AchieveActivityLivenessPrizeCfgData.getNeedItemAryById(tempInfo.iD);
            let curNum = AchieveDataMgr.getActivity_LivessValue();
            if (curNum >= tempItemAry[0].itemcount)
            {
                //领取
                AchieveSend.activityLivenessPrize(tempInfo.iD);
            }
            else
            {
                // 预览奖励
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RewardPreview, cfg.AchieveActivityLivenessPrizeCfgData.getAddItemAryById(tempInfo.iD)));
            }
        }

        /**
         * 页签点击
         */
        private onTabClick(tab: component.UITab, tabIndex: number, oldTabIndex: number): void
        {
            let day_index = parseInt(this.select_day_item.name) + 1;
            this.cur_listItems_Arr = AchieveDataMgr.getTabItemIdListByDayInfo(this.act_data.id, day_index, tabIndex, true);
            if (!this.cur_listItems_Arr)
            { logE("表格未配置!"); }
            this.UIPanel.itemList.onRefresh(this.cur_listItems_Arr.length, this, this.onListItemRefresh);
        }

        /**
         * 列表刷新
         * @param item
         * @param index
         */
        private onListItemRefresh(item: ProUI.ActivityMain.SevenDay.SevenDayProgressListItemUI, index: number): void
        {
            let mInfo = this.cur_listItems_Arr[index];
            let achive_cfg = cfg.AchieveActivityLivenessCfgData.getInfo(mInfo.achievement);
            let is_giftType = mInfo.achievement == 0;// =0表示为购买礼包类型

            // item.txt_count.visible = is_giftType;
            item.btn_buy.visible = is_giftType;
            item.txt_basePrice.visible = is_giftType;

            if (!is_giftType)
            {//普通成就类型
                item.txt_title.showText = "<font style='color:#fffced;font-weight:bold'>" + achive_cfg.name + "</font>";
                let tempNum = AchieveDataMgr.getActivity_LiveValue(achive_cfg.iD);
                let taskAllNum = achive_cfg.value;
                let taskType = achive_cfg.achieveType;

                item.txt_count.showText = Global.FormatString("{0}/{1}", tempNum, taskAllNum);
                let rewards = cfg.AchieveActivityLivenessCfgData.getAddItemAryById(achive_cfg.iD);
                item.itemBox.onRefresh(rewards.length, this, (itemUI: NorItemUI, index: number) =>
                {
                    itemUI.setItemInfo(rewards[index]);
                });
                item.btn_get.visible = tempNum >= taskAllNum && !AchieveDataMgr.isActivity_LiveFinish(achive_cfg.iD);
                item.btn_go.visible = !is_giftType && tempNum < taskAllNum;
                item.img_finish.visible = AchieveDataMgr.isActivity_LiveFinish(achive_cfg.iD);

                item.btn_get.onClick(this, () =>
                {
                    //领奖
                    AchieveSend.activityLivenessComplete(achive_cfg.iD);
                });
                item.btn_go.onClick(this, () =>
                {
                    if (!TaskUtils.gotoOpenByAchieveType(taskType, achive_cfg.achieveSubType)) { this.closeUI(); }
                });

            } else
            {
                // 礼包购买类型

                // 已购买信息
                let buyCount = ActivityDataMgr.getActivityIndexDataValue(this.act_data.id, mInfo.index, Pb_God._emActivityDataKey.Activity_Key_BuyCount);
                let hasBuyCount: number = buyCount ? buyCount : 0;
                let can_buy = hasBuyCount < mInfo.count;

                item.txt_title.showText = "<font style='color:#fffced;font-weight:bold'>" + mInfo.name + "</font>";
                item.txt_count.showText = Global.getLangStr("common_leftcount").
                    replace("{0}", (mInfo.count - hasBuyCount).toString());
                item.txt_price.text = cfg.ActivityAchievementCfgData.getNeedItemCount(mInfo.index).toString();
                item.txt_basePrice.text = mInfo.oldPrice.toString();
                item.img_finish.visible = hasBuyCount >= mInfo.count;
                item.btn_get.visible = false;
                item.btn_go.visible = false;
                item.btn_buy.visible = can_buy;
                item.txt_basePrice.visible = can_buy;
                let rewards = cfg.ActivityAchievementCfgData.getAddItemAryById(mInfo.index);
                item.itemBox.onRefresh(rewards.length, this, (itemUI: NorItemUI, index: number) =>
                {
                    itemUI.setItemInfo(rewards[index]);
                });
                item.btn_buy.onClick(this, () =>
                {
                    if (mInfo.vIP > 0 && PrivilegeDataMgr.vipLevel < mInfo.vIP)
                    {
                        //VIP等级限制
                        TipsUtils.showTips(Global.getLangStr("shop_msg8").replace("{0}", mInfo.vIP.toString()));
                        return;
                    }
                    // 钻石数量检测
                    let cost_diamond = cfg.ActivityAchievementCfgData.getNeedItemCount(mInfo.index);
                    if (!Global.isFullRes(CfgID.ItemID.Diamond, cost_diamond, true))
                    { return; }
                    ActivitySend.drawReward(mInfo.activityID, mInfo.index, 0);
                });
            }
        }

        //-----------------------------------新手引导------------------------------------
        /**
         * 进入本步引导
         */
        public Guide_Enter(step: GuideStep)
        {
            if (step == GuideStep.Func_7DayTarget_3)
            {
                Laya.timer.once(100, this, () =>
                {
                    let tmpItemUI = this.UIPanel.tab.getCell(1);
                    GuideMgr.Inst.showFinger(tmpItemUI, true, tmpItemUI as component.UIButton);
                });
            } else if (step == GuideStep.Func_7DayTarget_4)
            {
                Laya.timer.once(100, this, () =>
                {
                    let tmpItemUI = this.UIPanel.itemList.getCell(0) as ProUI.ActivityMain.SevenDay.SevenDayProgressListItemUI;
                    GuideMgr.Inst.showFinger(tmpItemUI.btn_get, true, tmpItemUI.btn_get);
                });
            }
        }
    }
}