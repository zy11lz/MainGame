module Pro
{
    /**
     * 界面说明： 神庭战令（赛季票成就系统）
    * 任务分页视图
    * @author jason.xu
    */
    export class WarOrderTaskPageView extends ProUI.TaskWarOrder.ChildView.TaskUI implements ITableView
    {
        /** 当前显示的列表 */
        private _list: cfg.AchieveWarOrderCfgInfo[];

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.tabGrp.onClick(this, this.onClickTabGroup,
                [new component.UITabData("warorder_taskTab1"), new component.UITabData("warorder_taskTab2"), new component.UITabData("warorder_taskTab3")],
                [new component.UITabStyle("#5b545b"), new component.UITabStyle("#fffced")]
            );
            let reddot = AchieveDataMgr.reddotModelWarOrder.getChildModel("task");
            this.tabGrp.setRedDotModelList([
                reddot.getChildModel(1), reddot.getChildModel(2), reddot.getChildModel(3)
            ])
            this.btnOneKeyAll.onClick(this,this.onClickOnekeyAll);
        }

        public addEvent(): void
        {
            EventMgr.on(EventNotify.Achieve_WarOrder_Update, this, this.onUpdateAchieve);
        }

        public removeEvent(): void
        {
            EventMgr.off(EventNotify.Achieve_WarOrder_Update, this, this.onUpdateAchieve);
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
            Laya.timer.loop(1000, this, this.onTimer);
            this.tabGrp.setSelectTab(0);
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
            Laya.timer.clear(this, this.onTimer);
        }

        public setData($data: any): void
        {

        }

        /** 成就变更 */
        private onUpdateAchieve(type: number): void
        {
            if (type != this.tabGrp.tabIndex + 1) return;
            this.refreshListView();
        }

        /** 点击分页 */
        private onClickTabGroup(tab: component.UITab, tabIndex: number, oldTabIndex: number): void
        {
            this.refreshListView();
            this.resetRefreshTimer();
        }

        /** 重置刷新时间 */
        private resetRefreshTimer(): void
        {
            //每日，则倒计时显示为当天即可
            if (this.tabGrp.tabIndex == 0)
            {
                this._timerTarget = Global.getZeroTimeNumber(TimeController.currTimer + 24 * 3600 * 1000) / 1000;
            } else
            {
                //时间显示(从配置的开启天数起， 再按周期决定结束时间)
                let worldCreateZeroTime = TimeController.worldCreateZeroTime / 1000; //开服时间
                let currTimer = TimeController.currTimer / 1000;
                let period: number = (this.tabGrp.tabIndex == 1 ? 7 : 30) * 24 * 3600;
                let startTime = worldCreateZeroTime + (cfg.AchieveConstCfgData.getFirstInfo().warOrderOpenDay - 1) * 24 * 3600;
                this._timerTarget = currTimer + period - Math.floor(currTimer - startTime) % period;
            }
            this.onTimer();
        }

        /** 刷新列表 */
        private refreshListView(): void
        {
            let list = cfg.AchieveWarOrderCfgData.getListByType(this.tabGrp.tabIndex + 1);
            let isGetList = []; //已经领过奖的
            let finishList = []; // 可以领奖的
            let otherList = []; //其它
            for (let cfgInfo of list)
            {
                let isGet = AchieveDataMgr.getWarOrderComplete(cfgInfo.iD);
                if (isGet)
                {
                    isGetList.push(cfgInfo);
                } else
                {
                    let achieveData = AchieveDataMgr.getWarOrderAchieveData(cfgInfo.iD);
                    let curValue = achieveData ? achieveData.value : 0;
                    let isFinish = curValue >= cfgInfo.value;
                    if (isFinish) finishList.push(cfgInfo);
                    else otherList.push(cfgInfo);
                }
            }
            this._list = finishList.concat(otherList).concat(isGetList);
            this.listView.onRefreshWithArray(this._list, this, this.onRefreshItem);

            this.reddotOneKey.visible = this.getFinishAchieve().length > 0;
        }

        /** 刷新单个列表数据 */
        private onRefreshItem(itemUI: ProUI.TaskWarOrder.ChildView.TaskItemUI, index: number): void
        {
            let cfgInfo = this._list[index];

            let additem = cfg.AddItemInfo.getAddItemAttr(cfgInfo, cfgInfo.addItem, "additemInfoArr")[0];
            itemUI.norItem.setItemInfo(additem);

            //【每日】叭啦叭啦叭啦
            let loop = ""
            if (cfgInfo.type == Pb_God._emWarOrderType.WarOrder_Day) loop = Global.getLangStr("shop_msg19"); //每日
            else if (cfgInfo.type == Pb_God._emWarOrderType.WarOrder_Week) loop = Global.getLangStr("shop_msg20"); //每周
            else loop = Global.getLangStr("shop_msg21"); //每月
            itemUI.htmlDesc.showText = Global.getLangStr("warorder_msg6", loop, cfgInfo.name);
            //进度显示
            let achieveData = AchieveDataMgr.getWarOrderAchieveData(cfgInfo.iD);
            let curValue = achieveData ? achieveData.value : 0;
            itemUI.txtProgress.text = cfgInfo.desc + Global.getLangStr("common_bracket2", curValue + "/" + cfgInfo.value);

            //领奖状态
            let isGet = AchieveDataMgr.getWarOrderComplete(cfgInfo.iD);
            let isFinish = curValue >= cfgInfo.value;
            itemUI.btnGet.visible = !isGet && isFinish;
            itemUI.btnGo.visible = !isGet && !isFinish;
            itemUI.imgIsGet.visible = isGet;

            itemUI.btnGet.onClick(this, () =>
            {
                AchieveSend.warOrderComplete(cfgInfo.iD);
            })

            itemUI.btnGo.onClick(this, () =>
            {
                TaskUtils.gotoOpenByAchieveType(cfgInfo.achieveType, cfgInfo.achieveSubType);
            })

        }

        private getFinishAchieve(): Array<number>
        {
            let finishList = []; // 可以领奖的
            for (var i = 0; i <  this.tabGrp.length; i++) {
                let list = cfg.AchieveWarOrderCfgData.getListByType(i + 1);
                for (let cfgInfo of list)
                {
                    let isGet = AchieveDataMgr.getWarOrderComplete(cfgInfo.iD);
                    let achieveData = AchieveDataMgr.getWarOrderAchieveData(cfgInfo.iD);
                    let curValue = achieveData ? achieveData.value : 0;
                    let isFinish = curValue >= cfgInfo.value;
                    if (!isGet && isFinish)
                    {
                        finishList.push(cfgInfo.iD);
                    }
                }
            }
            return finishList;
        }

        private onClickOnekeyAll(): void
        {
            let finishAchieve = this.getFinishAchieve();
            for (let i = 0; i < finishAchieve.length; i++) {
                AchieveSend.warOrderComplete(finishAchieve[i]);
            }
            this.reddotOneKey.visible = false;
        }

        private _timerTarget = 0;
        /** 刷新活动倒计时 */
        private onTimer(): void
        {
            let leftTimer = this._timerTarget - TimeController.currTimer / 1000;
            this.htmlTimer.showText = Global.getLangStr("warorder_msg7", Global.GetRemindTime(leftTimer, 9));
        }


        /** 页签组件销毁 */
        public dispose(): void
        {

        }
    }
}