module Pro
{
    /**
     * 限时兑换活动商店
     */
    export class TimeLimitExchangeShopMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        public UIPanel: ProUI.ActivityMain.TimeLimit.PageView.LimitExchangeShopUI;

        // 活动配置
        private _act_cfg: cfg.ActivityCfgInfo;

        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        /** UI打开前状态 */
        public openUI(): void
        {
            this.showPanel(ProUI.ActivityMain.TimeLimit.PageView.LimitExchangeShopUI, 3);
        }

        /** 关闭UI*/
        public closeUI(): void
        {
            ActivityDataMgr.reddotModel.getChildModel("limitExchange").getChildModel(0).setRedDot(0); // 限时兑换子节点红点
            Laya.timer.clear(this, this.onTimer);
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(EventNotify.Activity_Update, this, this.refreshUI);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 初始化面板(UI每次打开) */
        public initUI(): void
        {
            this._act_cfg = this.UIOpenData.customObject;

            this.UIPanel.tab.onClick(this, null,
                [new component.UITabData("activity_timeLimitExchangeShop")],
                [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]
            );
            this.UIPanel.tab.setSelectTab(0);
            this.UIPanel.btn_close.onClick(this, this.closeUI);
            this.refreshUI();

            Laya.timer.loop(1000, this, this.onTimer);
            this.onTimer();

            this.refreshUI();
        }

        /** 刷新活动倒计时 */
        private onTimer(): void
        {
            let tmp_endTime = ActivityDataMgr.getActivityEndTimeStamp(this._act_cfg.iD);
            let leftTime = tmp_endTime - TimeController.currTimer / 1000;
            if (leftTime <= 0)
            {   //活动已结束
                this.UIPanel.txt_time.showText = Global.getLangStr("activity_msg23");
                Laya.timer.clear(this, this.onTimer);
                return;
            }
            this.UIPanel.txt_time.showText = Global.getLangStr("activity_msg27", Global.GetRemindTime(leftTime, 9));
        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        public refreshUI(): void
        {

            // 道具数量
            let item_id = cfg.ActivityCfgData.getExchangeCostItemID(this._act_cfg.iD);
            this.UIPanel.txt_count.text = Global.getItemNum(item_id).toString();
            Global.setResSmallIconWithItemID(this.UIPanel.imgCurrency, item_id);

            let act_cfg_arr = cfg.ActivityExchangeCfgData.getDataArrayByActivityId(this._act_cfg.iD);
            this.UIPanel.itemList.onRefresh(act_cfg_arr.length, this, (itemUI: ExchangeShopItem, index: number) =>
            {
                let cfg = act_cfg_arr[index];
                itemUI.setItemByActShopCfg(this._act_cfg, cfg);
            });
        }
    }
}