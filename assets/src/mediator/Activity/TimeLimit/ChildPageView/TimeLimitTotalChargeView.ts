module Pro
{
    /**
     * 通用活动TimeLimitActivityMediator 分页类型2 ： 累计充值
     * @author jason.xu
     */
    export class TimeLimitTotalChargeView extends TimeLimitCommonPageView
    {
        /** 当前显示的列表 */
        private _list: cfg.ActivityChargeAmountCfgInfo[];

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

        /** 页签组件销毁 */
        public dispose(): void
        {

        }

        /** 刷新列表显示（子类继承） */
        protected refreshListView(): void
        {
            //排序(简单处理： 把已领奖的排后面)
            let finishArr = [];
            let noFinishArr = [];
            for (let actid of this._actIds)
            {
                let cfgArr = cfg.ActivityChargeAmountCfgData.getListByActId(actid);
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
            let act_cfg = this._list[index];
            let need_money = act_cfg.charge / GlobalData.moneyToDiamon;
            let total_charge_count = ActivityDataMgr.getActivity_DataValue(act_cfg.activityID, Pb_God._emActivityDataKey.Activity_Key_ChargeAmount);

            let cur_charge = Math.floor(total_charge_count / GlobalData.moneyToDiamon); //已充值钱数
            let need_charge = act_cfg.charge;//需要充值钻石数
            let has_get = ActivityDataMgr.isActBoxFinish(act_cfg.activityID, act_cfg.index);//是否已领取            
            let can_get = total_charge_count >= need_charge;
            let rewards = cfg.ActivityChargeAmountCfgData.getAddItemAryByInfo(act_cfg);
            item.txt_title.showText = Global.getLangStr("activity_chargeMsg1", need_money); //累计充值<font color='#009e00'>" +  + "</font>元可领取";
            item.btn_get.visible = !has_get && can_get;
            item.btn_go.visible = !has_get && !can_get;
            item.img_finish.visible = has_get;
            let cur_chargeSting = "<font color='#46af00'>" + cur_charge + "</font>";
            item.txt_progress.showText = "(" + cur_chargeSting + "/" + need_money + ")";
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