module Pro
{
    /**
     * 计次活动主界面
     */
    export class CountGiftsView extends ProUI.ActivityMain.TimeLimit.PageView.CountGiftsUI implements ITableView
    {
        // 活动id
        private _act_id: number;

        // 计次活动类型
        private _actType: Pb_God._emActivityTimesType;

        // 排行榜类型
        private _rankType: Pb_God._emTopListType;

        // 已完成次数
        private _finished_times: number;

        // 活动开启时间配置
        private _act_openTime_info: cfg.StDateTimeInfo;

        // 当前活动刷新时间配置数据
        private _act_refreshTime_info: cfg.StDateTimeInfo;

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {

            this.btn_rank.onClick(this, this.onRankClick);
            this.btn_reward.onClick(this, this.onRewardClick);
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public addEvent(): void
        {
            EventMgr.on(EventNotify.Activity_Update, this, this.refreshView);
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public removeEvent(): void
        {
            EventMgr.off(EventNotify.Activity_Update, this, this.refreshView);
        }


        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {

        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
            Laya.timer.clear(this, this.onTimer);
        }

        public setData($data: Pb_God.PBPlayerActivityData): void
        {
            this._act_id = $data.id || $data[0];
            this.refreshView();
        }

        private refreshView(): void
        {
            this._act_openTime_info = cfg.ActivityCfgData.getOpenTimeInfoByID(this._act_id);
            this._act_refreshTime_info = cfg.ActivityCfgData.getRefreshTimeInfoByID(this._act_id);

            this._actType = cfg.ActivityCfgData.getSonTypeByID(this._act_id);
            this._rankType = this.getRankType(this._actType);
            // 修改宣传图
            this.frameImg.frame = this._actType;

            this._finished_times = ActivityDataMgr.getActivity_DataValue(this._act_id, Pb_God._emActivityDataKey.Activity_Key_CompleteNum);

            let cfgArr = cfg.ActivityTimesCfgData.getListByActId(this._act_id);
            //排序(简单处理： 把已领奖的排后面)
            let finishArr = [];
            let noFinishArr = [];
            for (let el of cfgArr)
            {
                if (ActivityDataMgr.isActBoxFinish(el.activityID, el.index)) finishArr.push(el);
                else noFinishArr.push(el);
            }
            let act_Arr = noFinishArr.concat(finishArr);

            this.itemList.onRefreshWithArray(act_Arr, this, this.onItemRefresh);

            Laya.timer.loop(1000, this, this.onTimer);
            this.onTimer();
        }

        /** 页签组件销毁 */
        public dispose(): void
        {

        }

        private onItemRefresh(item: ProUI.ActivityMain.TimeLimit.PageItemView.CommonListItemUI, index: number)
        {
            let act_cfg = this.itemList.getItem(index) as cfg.ActivityTimesCfgInfo;

            let rewards = cfg.ActivityTimesCfgData.getAddItemAryByInfo(act_cfg);
            let cur_time = this._finished_times;//已挑战次数
            let need_time = act_cfg.times;//需要次数            
            let has_get = ActivityDataMgr.isActBoxFinish(this._act_id, act_cfg.index);//是否已领取
            let can_get = cur_time >= need_time;
            item.txt_title.showText = this.getItemTitleText(need_time);
            item.btn_get.visible = !has_get && can_get;
            item.btn_go.visible = !has_get && !can_get;
            item.img_finish.visible = has_get;
            let cur_chargeSting = "<font color='#46af00'>" + cur_time + "</font>";
            item.txt_progress.showText = `(${ cur_chargeSting }/${ need_time })`;
            item.itemBox.onRefresh(rewards.length, this, (itemUI: NorItemUI, index: number) =>
            {
                itemUI.setItemInfo(rewards[index]);
            });
            item.btn_get.onClick(this, () =>
            {
                ActivitySend.drawReward(this._act_id, act_cfg.index, 0);
            });
            item.btn_go.onClick(this, this.onBtnGoClick);
        }

        private getItemTitleText(need_time: number): string
        {
            let result = "";
            switch (this._actType)
            {
                case Pb_God._emActivityTimesType.Activity_Times_ClickGold:// 点石成金
                case Pb_God._emActivityTimesType.Activity_Times_Expedition:// 远征
                case Pb_God._emActivityTimesType.Activity_Times_Raid:// 快速作战
                case Pb_God._emActivityTimesType.Activity_Times_Voyage:// 远航	
                case Pb_God._emActivityTimesType.Activity_Times_Risk:// 神界冒险	
                    result = Global.getLangStr("activity_timesType" + this._actType, need_time);
                default:
                    break;
            }
            return result;
        }

        private onBtnGoClick(): void
        {
            // 前往对应界面
            switch (this._actType)
            {
                case Pb_God._emActivityTimesType.Activity_Times_ClickGold:// 点石成金
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ClickGold), BaseBackUIType.HideBackUI);
                    break;
                case Pb_God._emActivityTimesType.Activity_Times_Expedition://  远征   
                    if (!PlayerDataMgr.checkSystemSwitchOpen(emSystemSwitchType.Expedition, true))
                        return;
                    var isInBattle = BattleMgr.Inst.checkAndWatchingBattleView(Pb_God._emBattleType.BattleType_Expedition);
                    if (!isInBattle)
                    {
                        if (ExpeditionDataMgr.getCurtype() == 0)
                        {
                            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ExpeditionChoice));
                        }
                        else
                        {
                            if (ExpeditionDataMgr.isConductHunting())
                                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ExpeditionMain));
                        }
                    }
                    break;
                case Pb_God._emActivityTimesType.Activity_Times_Raid:// 快速作战                
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_QuickFight), BaseBackUIType.HideBackUI);
                    break;
                case Pb_God._emActivityTimesType.Activity_Times_Voyage:// 远航
                    if (!PlayerDataMgr.checkSystemSwitchOpen(Pro.emSystemSwitchType.Sail, true))
                        return;
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Sail));
                    break;
                case Pb_God._emActivityTimesType.Activity_Times_Risk:// 神界冒险
                    if (!PlayerDataMgr.checkSystemSwitchOpen(emSystemSwitchType.Risk, true))
                        return;
                    var results = BattleMgr.Inst.checkAndWatchingBattleView(Pb_God._emBattleType.BattleType_Risk);
                    if (!results)
                    {
                        RiskSend.open(); //向服务器请求，以返回的数据决定是打开英雄选择界面还是进入神界主界面
                    }
                    break;
                default:
                    break;
            }
        }

        /** 刷新活动倒计时 */
        private onTimer(): void
        {
            let tmp_endTime = ActivityDataMgr.getActivityEndTimeStamp(this._act_id);
            let leftTime = tmp_endTime - TimeController.currTimer / 1000;
            if (leftTime <= 0)
            {   //活动已结束
                this.txt_time.showText = Global.getLangStr("activity_msg23");
                Laya.timer.clear(this, this.onTimer);
                return;
            }
            this.txt_time.showText = Global.getLangStr("activity_msg5", Global.GetRemindTime(leftTime, 9));
        }

        private onRankClick(): void
        {
            // 打开对应排行界面            
            let op_data = new BaseOpenUIData(PanelNotify.Open_RankDetail, this._rankType);
            UIManager.Inst.forceOpen(op_data);
        }

        private onRewardClick(): void
        {
            // 打开对应奖励界面
            let op_data = new BaseOpenUIData(PanelNotify.Open_CountGiftsRewardView, this._rankType);
            UIManager.Inst.forceOpen(op_data);
        }

        private getRankType(act_type: Pb_God._emActivityTimesType): Pb_God._emTopListType
        {
            let result: Pb_God._emTopListType;
            switch (act_type)
            {
                case Pb_God._emActivityTimesType.Activity_Times_ClickGold://点金
                    result = Pb_God._emTopListType.TopListType_ClickGold;
                    break;
                case Pb_God._emActivityTimesType.Activity_Times_Expedition://远征                    
                    result = Pb_God._emTopListType.TopListType_Expedition;
                    break;
                case Pb_God._emActivityTimesType.Activity_Times_Raid://快速作战
                    result = Pb_God._emTopListType.TopListType_Raid;
                    break;
                case Pb_God._emActivityTimesType.Activity_Times_Voyage://远航
                    result = Pb_God._emTopListType.TopListType_Sail;
                    break;
                case Pb_God._emActivityTimesType.Activity_Times_Risk://神界冒险
                    result = Pb_God._emTopListType.TopListType_RiskCount;
                    break;
                default:
                    break;
            }
            return result;
        }
    }
}