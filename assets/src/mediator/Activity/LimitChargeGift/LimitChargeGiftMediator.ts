module Pro
{
    /**
     * 界面说明： 全服限购活动（神龙宝藏）界面
    * @author jason.xu
    */
    export class LimitChargeGiftMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.ActivityMain.LimitChargeGift.LimitChargeGiftUI;
        //public UIOpenData: BaseOpenUIData;

        /** 对应当前开启的活动ID */
        private _actId = 0;
        /** 活动对应的礼包列表。 */
        private _cfgList: cfg.ActivityLimitGiftCfgInfo[];

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas('limitChargeGift'), UrlMgr.getAtlas("activitymain")];
        }
        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return ["res/limitChargeGift/bg.png"];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.ActivityMain.LimitChargeGift.LimitChargeGiftUI, 1, BaseAddLayer.TopUI, true);
        }
        /** 关闭UI*/
        public closeUI(): void
        {
            Laya.timer.clear(this, this.onTimer);
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            //打开界面标记一下。
            TodayRepeatOpMgr.Inst.setTag("limitChargeActOpen");
            //拉取最近的活动
            let actId = ActivityDataMgr.getFirstValidActivityIdByType(Pb_God._emActivityType.Activity_LimitGift);
            if (actId != -1)
            {
                this._actId = actId;
                this._cfgList = cfg.ActivityLimitGiftCfgData.getListByActId(this._actId);
                //拉取剩余数量, 等服务器返回后再展示列表
                this.UIPanel.listview.visible = false;
                ActivitySend.getRewardNum(this._actId);

                this._overTime = ActivityDataMgr.getActivityEndTimeStamp(this._actId);
                Laya.timer.loop(1000, this, this.onTimer);
                this.onTimer();
            }
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);

            this.addEventMgr(CmdEvent.Activity_GetRewardNum, this, this.onGetRewardNum);
            //     同步数据                 PBPlayerActivityData
            this.addEventMgr(CmdEvent.Activity_Data, this, this.onUpdateActivity);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

        /** 活动数据变化 */
        private onUpdateActivity(value: Pb_God.PBPlayerActivityData): void
        {
            if (this._actId != value.id) { return; }
            //重新拉取一次总数量，待数据返回后再刷新列表
            ActivitySend.getRewardNum(this._actId);
        }

        /*****
         *     返回奖励物品的剩余数量   PBG2CActivityRewardNum
         * @param PBG2CActivityRewardNum
         * 		id			uint32	活动ID
         * 		reward			PBU32U32	key是index，value 是num
         */
        protected onGetRewardNum(value: Pb_God.PBG2CActivityRewardNum): void
        {
            this.UIPanel.listview.visible = true;
            //刷新列表显示
            this.UIPanel.listview.onRefreshWithArray(this._cfgList, this, this.onRefreshItem);
        }

        private onRefreshItem(itemUI: ProUI.ActivityMain.LimitChargeGift.LimitChargeGiftItemUI, index: number): void
        {
            let cfgInfo = this._cfgList[index];
            let chargeCfgInfo = cfg.ChargeCfgData.getInfo(cfgInfo.productID);
            if (!chargeCfgInfo)
            {
                logE("charge id error !", cfgInfo.productID);
                return;
            }
            itemUI.txtName.text = chargeCfgInfo.name;
            //道具列表
            let addItems = cfg.ChargeCfgData.getAddItemAryByID(chargeCfgInfo.iD);
            itemUI.listItems.onRefresh(addItems.length, this, (noritem: NorItemUI, itemIndex: number) =>
            {
                noritem.setItemInfo(addItems[itemIndex]);
            })
            //全服剩余数量
            let allLeftCount = ActivityDataMgr.getActivityRewardsLeftCount(cfgInfo.activityID, cfgInfo.index);
            itemUI.htmlLimitAll.visible = allLeftCount < 1000000;
            itemUI.htmlLimitAll.showText = Global.getLangStr("limit_charge_msg1", allLeftCount);
            //个人购买数据
            let buyCount = ActivityDataMgr.getActivityIndexDataValue(cfgInfo.activityID, cfgInfo.index, Pb_God._emActivityDataKey.Activity_Key_BuyCount);
            let hasSelfLimt = cfgInfo.count > 0;
            //已售完
            let isFull = allLeftCount <= 0 || (hasSelfLimt && cfgInfo.count <= buyCount);
            //还能买，并且有个人限购的限制时，才显示个人限购剩余数量
            itemUI.htmlLimit.visible = hasSelfLimt && !isFull;
            if (itemUI.htmlLimit.visible)
            {
                itemUI.htmlLimit.showText = Global.getLangStr("limit_charge_msg2", buyCount, cfgInfo.count);
            }

            itemUI.imgFull.visible = isFull;
            itemUI.btnBuy.visible = !isFull;
            itemUI.txtBtnPrice.text = Global.getLangStr("common_money", chargeCfgInfo.needMoney / 100);
            itemUI.btnBuy.onClick(this, () =>
            {
                //拉起充值
                PlatformDataMgr.onChargeRequest(chargeCfgInfo);
            })
        }


        /** 倒计时结束时间 */
        protected _overTime = 0;
        /** 刷新活动倒计时 */
        private onTimer(): void
        {
            let cur_timer = TimeController.currTimer / 1000;
            let leftTime = this._overTime - cur_timer;
            if (leftTime <= 0)
            {   //活动已结束
                this.UIPanel.htmlTimer.showText = Global.getLangStr("activity_msg23");
                Laya.timer.clear(this, this.onTimer);
                return;
            }
            this.UIPanel.htmlTimer.showText = Global.getLangStr("activity_msg13", Global.GetRemindTime(leftTime, 9));
        }

    }
}