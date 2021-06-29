module Pro
{
    /**
     * 通用活动TimeLimitActivityMediator 分页类型3 ： 累计天数充值
     * @author jason.xu
     */
    export class TimeLimitDayChargeView extends TimeLimitCommonPageView
    {

        /** 当前显示的列表 */
        private _list: cfg.ActivityChargeDaysCfgInfo[];

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public addEvent(): void
        {
            super.addEvent();
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public removeEvent(): void
        {
            super.removeEvent();
        }

        /** 刷新列表显示（子类继承） */
        protected refreshListView(): void
        {
            //排序(简单处理： 把已领奖的排后面)
            let finishArr = [];
            let noFinishArr = [];
            for (let actid of this._actIds)
            {
                let cfgArr = cfg.ActivityChargeDaysCfgData.getListByActId(actid);
                for (let el of cfgArr)
                {
                    if (ActivityDataMgr.isActBoxFinish(el.activityID, el.index)) finishArr.push(el);
                    else noFinishArr.push(el);
                }
            }
            this._list = noFinishArr.concat(finishArr);
            this.itemList.onRefreshWithArray(this._list, this, this.onItemRefresh);
        }


        private onItemRefresh(item: ProUI.ActivityMain.TimeLimit.PageItemView.CommonListItemUI, index: number)
        {
            //let act_cfg = cfg.ActivityChargeDaysCfgData.getActInfo(this._act_id, index);
            let act_cfg = this._list[index];
            let total_charge_day = ActivityDataMgr.getActivity_DataValue(act_cfg.activityID, Pb_God._emActivityDataKey.Activity_Key_ChargeDays);
            let charge_day_need = act_cfg.day;
            let has_get = ActivityDataMgr.isActBoxFinish(act_cfg.activityID, act_cfg.index);//是否已领取   
            let can_get = !has_get && total_charge_day >= charge_day_need;//可以领取
            let rewards = cfg.ActivityChargeDaysCfgData.getAddItemAryByInfo(act_cfg);
            item.txt_title.showText = Global.getLangStr("activity_chargeMsg2", charge_day_need);
            item.btn_get.visible = can_get;
            item.btn_go.visible = total_charge_day < charge_day_need;
            let cur_chargeSting = "<font color='#46af00'>" + (can_get || has_get ? 1 : 0) + "</font>";
            item.txt_progress.showText = "(" + cur_chargeSting + "/1)";
            item.img_finish.visible = has_get;
            item.itemBox.onRefresh(rewards.length, this, (itemUI: NorItemUI, index: number) =>
            {
                itemUI.setItemInfo(rewards[index])
            });

            item.btn_get.onClick(this, () =>
            {
                // 请求领取奖励
                ActivitySend.drawReward(act_cfg.activityID, act_cfg.index, 0);
            });
            item.btn_go.onClick(this, this.gotoCharge);
        }
    }
}