module Pro
{
    /**
     * 成就之路
     */
    export class RisingStarachievementsMediator extends TimeLimitCommonPageView{
        // 活动ID
        private act_id: number;

        // 当前列表配置数组
        private cur_listItems_Arr: cfg.ActivityAchievementCfgInfo[];


        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
        }

        /** 页签组件销毁 */
        dispose(): void { };

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            super.addEvent();
            EventMgr.on(EventNotify.Achieve_Activity_Update, this, this.refreshListView);
            // this.btn_help.onClick(this, this.onClickHelp);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
            super.removeEvent();
            EventMgr.off(EventNotify.Achieve_Activity_Update, this, this.refreshListView);
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {

        };

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        hide(): void
        {
        };

        /**
         * 页签点击
         */
        protected refreshListView(): void
        {
            this.act_id = this._actIds[0];
            this.cur_listItems_Arr = AchieveDataMgr.getTabItemIdRisingStarInfo(this.act_id);
            if (!this.cur_listItems_Arr)
            { logE("表格未配置!"); }

            //做个排序，已领取过的放到下面
            let canBuyList: (cfg.ActivityAchieveRoadCfgInfo)[] = [];
            let buyFullList: (cfg.ActivityAchieveRoadCfgInfo)[] = [];
            for (let mInfo of this.cur_listItems_Arr)
            {
                let achive_cfg = cfg.AchieveRoadCfgData.getInfo(mInfo.achievement);
                if (!AchieveDataMgr.isActivity_RisingStarFinish(achive_cfg.iD))
                {
                    canBuyList.push(mInfo);
                } else
                {
                    buyFullList.push(mInfo);
                }
            }
            this.cur_listItems_Arr = canBuyList.concat(buyFullList);
            this.itemList.onRefresh(this.cur_listItems_Arr.length, this, this.onListItemRefresh);
        }

        /**
         * 列表刷新
         * @param item
         * @param index
         */
        private onListItemRefresh(item: ProUI.ActivityMain.TimeLimit.PageItemView.CommonListItemUI, index: number): void
        {
            let mInfo = this.cur_listItems_Arr[index];
            let achive_cfg = cfg.AchieveRoadCfgData.getInfo(mInfo.achievement);
            let is_giftType = mInfo.achievement == 0;// =0表示为购买礼包类型

            if (!is_giftType)
            {//普通成就类型
                item.txt_title.showText = achive_cfg.name;
                let tempNum = AchieveDataMgr.getActivity_RisingStarValue(achive_cfg.iD);
                let taskAllNum = achive_cfg.value;
                let taskType = achive_cfg.achieveType;
                let cur_chargeSting = "<font color='#46af00'>" + tempNum + "</font>";
                item.txt_progress.showText = "(" + cur_chargeSting + "/" + taskAllNum + ")";
                let rewards = cfg.AchieveRoadCfgData.getAddItemAryById(achive_cfg.iD);
                item.itemBox.onRefresh(rewards.length, this, (itemUI: NorItemUI, index: number) =>
                {
                    itemUI.setItemInfo(rewards[index]);
                });
                item.btn_get.visible = tempNum >= taskAllNum && !AchieveDataMgr.isActivity_RisingStarFinish(achive_cfg.iD);
                item.btn_go.visible = !is_giftType && tempNum < taskAllNum;
                item.img_finish.visible = AchieveDataMgr.isActivity_RisingStarFinish(achive_cfg.iD);

                item.btn_get.onClick(this, () =>
                {
                    //领奖
                    AchieveSend.achieveRoadComplete(achive_cfg.iD);
                });
                item.btn_go.onClick(this, () =>
                {
                    if (!TaskUtils.gotoOpenByAchieveType(taskType, achive_cfg.achieveSubType)) { }
                });
            }
        }
    }
}