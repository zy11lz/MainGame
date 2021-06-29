module Pro
{
    /**
     * 升级礼包
     */
    export class UpgradeGiftView extends ProUI.ActivityMain.TimeLimit.PageView.UpgradeGiftUI implements ITableView
    {
        // 活动id
        private _act_id: number;

        // 服务端活动数据
        private _act_data: any;

        // 活动时间信息
        private _act_timeInfo: cfg.StDateTimeInfo;

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.btn_help.onClick(this, (btn: any) =>
            {
                CommonHelpView.showWithLangKey(btn, "activity_upgradeLevel_help");
            });
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
            if (this._act_id)
                ActivitySend.getRewardNum(this._act_id);
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
            Laya.timer.clear(this, this.onTimer);
        }

        public setData($data: any): void
        {
            this._act_id = $data.id;
            this._act_data = $data;
            this.refreshView();
        }

        private refreshView(): void
        {
            this._act_timeInfo = cfg.ActivityCfgData.getOpenTimeInfoByID(this._act_id);

            let cfgArr = cfg.ActivityLevelupCfgData.getListByActId(this._act_id);
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
            let act_cfg = this.itemList.getItem(index) as cfg.ActivityLevelupCfgInfo;

            let left_count = ActivityDataMgr.getActivityRewardsLeftCount(act_cfg.activityID, act_cfg.index);
            let cur_lv = PlayerDataMgr.level;
            let need_lv = act_cfg.level;
            let can_get = cur_lv >= need_lv;
            let has_get = ActivityDataMgr.isActBoxFinish(this._act_id, act_cfg.index);//是否已领取        ;
            let rewards = cfg.ActivityLevelupCfgData.getAddItemAryByInfo(act_cfg);
            item.txt_title.showText = Global.getLangStr("activity_msg1", need_lv, cur_lv, need_lv);
            item.btn_get.disabled = (!has_get && !can_get) || left_count <= 0;
            item.btn_get.visible = !has_get;
            item.imgGetReddot.visible = !item.btn_get.disabled;
            item.img_finish.visible = has_get;
            item.txt_progress.showText = Global.getLangStr("common_leftcount", left_count);
            item.itemBox.onRefresh(rewards.length, this, (itemUI: NorItemUI, index: number) =>
            {
                itemUI.setItemInfo(rewards[index])
            });

            item.btn_get.onClick(this, () =>
            {
                // 请求领取奖励
                ActivitySend.drawReward(this._act_id, act_cfg.index, 0);
                ActivitySend.getRewardNum(this._act_id);
            });
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
    }
}