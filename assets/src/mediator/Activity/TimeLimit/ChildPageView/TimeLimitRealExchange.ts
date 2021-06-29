module Pro
{
    /**
     * 限时兑换
     */
    export class TimeLimitRealExchange extends TimeLimitCommonPageView
    {

        /** 当前显示的列表 */
        private _list: cfg.ActivityExchangeCfgInfo[];

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
                let cfgArr = cfg.ActivityExchangeCfgData.getDataArrayByActivityId(actid);
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
            item.type1.visible = false;
            item.type2.visible = true;
            let act_cfg = this._list[index];

            let has_get = ActivityDataMgr.isActBoxFinish(act_cfg.activityID, act_cfg.index);//是否已领取  
            let surplusNumber = ActivityDataMgr.getActivityIndexDataValue(act_cfg.activityID, act_cfg.index,
                Pb_God._emActivityDataKey.Activity_Key_ExchageNum);

            let consumeItemAry = cfg.ActivityExchangeCfgData.getAddItemAryByInfo(act_cfg);
            let addItemAry = cfg.ActivityExchangeCfgData.getAddItemAryByInfo1(act_cfg);

            item.txt_progress2.showText = "(" + surplusNumber + "/" + act_cfg.limitNum + ")";
            item.img_finish2.visible = has_get;
            item.btn_get2.visible = !has_get;
            item.txt_progress2.visible = !has_get;

            if (consumeItemAry.length <= 3)
            {
                item.itemList1.visible = false;
                item.itemList.visible = true;
                item.itemList.onRefresh(consumeItemAry.length, this, (itemUI: NorItemUI, index: number) =>
                {
                    itemUI.setItemInfo(consumeItemAry[index]);
                });
            }
            else
            {
                item.itemList.visible = false;
                item.itemList1.visible = true;
                item.itemList1.onRefresh(consumeItemAry.length, this, (itemUI: NorItemUI, index: number) =>
                {
                    itemUI.setItemInfo(consumeItemAry[index]);
                });
            }
            item.reward.setItemInfo(addItemAry[0]);

            //红点
            for (var index = 0; index < consumeItemAry.length; index++)
            {
                item.redDot.visible = true;
                var element = consumeItemAry[index];
                if (!Global.isFullRes(element.itemid, element.itemcount, false))
                {
                    item.redDot.visible = false;
                    break;
                }

            }

            item.btn_get2.onClick(this, () =>
            {
                for (var index = 0; index < consumeItemAry.length; index++)
                {
                    var element = consumeItemAry[index];
                    if (!Global.isFullRes(element.itemid, element.itemcount, true)) return;
                }

                // 请求领取奖励
                ActivitySend.drawRewardEx(act_cfg.activityID, act_cfg.index, 1, null);
            });
        }
    }
}