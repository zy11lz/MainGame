module Pro
{
    /**
    * 终生卡
    * @author jason.xu
    */
    export class WealHallLifelongFundView extends ProUI.ActivityMain.MonthFund.LifelongFundUI implements ITableView
    {
        private _index: number; //123
        private _activityId: number;

        /** 支付信息 */
        private _chargeCfgInfo: cfg.ChargeCfgInfo;
        /** 当前领奖的进度 */
        private _rewardIndex: number = 0;
        /**奖励组 */
        private _list = [];
        constructor(args: number[])
        {
            super();
            this._activityId = args[0];
        }

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            //需要从活动表的参数中取得对应的支付id.
            let activityInfo = cfg.ActivityCfgData.getInfo(this._activityId);
            if (activityInfo)
            {
                this._chargeCfgInfo = cfg.ChargeCfgData.getInfo(parseInt(activityInfo.param));
            }
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public addEvent(): void
        {
            EventMgr.on(EventNotify.Activity_Update, this, this.onUpdateActivity);
            EventMgr.on(CmdEvent.Platform_update_chargeinfo, this, this.refreshRewardState);
            EventMgr.on(CmdEvent.Platform_SynCharge, this, this.refreshRewardState);

            this.btnActive.onClick(this, this.onClickActive);
            this.btnGet.onClick(this, this.onClickGetPrize);
            this.btnIsGet.onClick(this, this.onClickIsGet);
            this.DetailedIntroduction.onClick(this, () =>
            {
                CommonHelpView.show(this.DetailedIntroduction, Global.getLangStr("lifetimeCardRule"));
            });
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public removeEvent(): void
        {
            EventMgr.off(EventNotify.Activity_Update, this, this.onUpdateActivity);
            EventMgr.off(CmdEvent.Platform_update_chargeinfo, this, this.refreshRewardState);
            EventMgr.off(CmdEvent.Platform_SynCharge, this, this.refreshRewardState);
        }

        /** 点击激活 */
        private onClickActive(): void
        {
            //跳转支付
            if (this._chargeCfgInfo)
            {
                PlatformDataMgr.onChargeRequest(this._chargeCfgInfo);
            }

        }

        /** 点击领奖 */
        private onClickGetPrize(): void
        {
            //向服务器发起请求
            ActivitySend.drawReward(this._activityId, this._rewardIndex, 1);
        }

        /** 点击已领奖按钮 */
        private onClickIsGet(): void
        {
            //玩家已经领取了该任务的奖励，点击弹出文字提示“奖励已领取，请明天再来哟”
            TipsUtils.showTipsByLanId("tips_msg3");
        }

		/*****
		 *    活动更新
		 */
        protected onUpdateActivity(actId: number): void
        {
            if (this._activityId != actId) return;  //不同同一个活动。
            this.refreshRewardState();
        }


        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
            //标记当天已经打开过界面了。
            TodayRepeatOpMgr.Inst.setTag("monthFundOpen" + this._activityId);
            this._list = [];
            this.refreshView();
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
        }

        public setData($data: any): void
        {

        }

        /** 刷新视图显示 */
        private refreshView(): void
        {
            this.refreshRewardState();
        }

        /** 刷新领奖状态 */
        private refreshRewardState(): void
        {
            //支付信息
            if (!this._chargeCfgInfo) return;
            let isActive = false;
            let currTime = TimeController.currTimer;
            let chargeInfo = PlatformDataMgr.getChargeInfoByCfgInfo(this._chargeCfgInfo);

            if (chargeInfo && chargeInfo.buycount > 0)//是否有购买
                isActive = true;

            this.btnActive.visible = !isActive;
            this.btnGet.visible = isActive;
            this.btnIsGet.visible = isActive;
            let activity = isActive ? "lifetimeCardTips2" : "lifetimeCardTips1";
            this.txtTips.showText = Global.getLangStr(activity);
            if (isActive)
            {
                let activeDays = Global.getTargetDaysTime1(chargeInfo.lastbuytime * 1000)+1;
                let fundCfgInfo: cfg.ActivityFundCfgInfo
                let list = cfg.ActivityFundCfgData.getList(this._activityId, true);
                if (list[list.length - 1].day < activeDays)
                {
                    fundCfgInfo = cfg.ActivityFundCfgData.getInfoByActivityIdAndDay(this._activityId, 999999);

                } else
                {
                    fundCfgInfo = cfg.ActivityFundCfgData.getInfoByActivityIdAndDay(this._activityId, activeDays);
                }

                if (!fundCfgInfo)
                {
                    logE("超值基金数据异常， activityId=" + this._activityId + " activeDays=" + activeDays);
                    return;
                }
                this._rewardIndex = fundCfgInfo.index;
                //当天是否已经领奖
                let activityData = ActivityDataMgr.getActivityDataById(this._activityId);
                let time = ActivityDataMgr.getActivity_DataValue(this._activityId, Pb_God._emActivityDataKey.Activity_Key_LifeTime_LastTime);
                let todayIsGet = activityData && time > 0;
                //已经购买且领取过的话，判断今天有没有领取
                if (todayIsGet)
                {
                    let before = Global.getFormatTimeString(time * 1000, 2);//上一次领取的那天
                    let today = Global.getFormatTimeString(TimeController.currTimer, 2);//今天
                    todayIsGet = before != today ? false : true;
                }
                this.btnGet.visible = !todayIsGet;
                this.btnIsGet.visible = todayIsGet;

                //显示奖励
                this._list = cfg.ActivityFundCfgData.getAddLifelongItemInfoByIn(fundCfgInfo);
                this.refreshPreviewList();

            } else
            {
                this.txtPrice.text = Global.getLangStr("common_money", this._chargeCfgInfo.needMoney / 100);
                //没有购买就默认显示第一天奖励
                let fundCfgInfo = cfg.ActivityFundCfgData.getInfoByActivityIdAndDay(this._activityId, 1);
                if (!fundCfgInfo)
                {
                    logE("超值基金数据异常， activityId=" + this._activityId + " activeDays=" + 1);
                    return;
                }
                this._list = cfg.ActivityFundCfgData.getAddLifelongItemInfoByIn(fundCfgInfo);
                this.refreshPreviewList();
            }
        }

        /** 刷新预览列表 */
        private refreshPreviewList(): void
        {
            if (this._list.length > 4)
            {
                this.listView.visible = true;
                this.listView.onRefresh(this._list.length, this, this.onRefreshItem);
                this.list4View.visible = false;
            }
            else
            {
                this.list4View.visible = true;
                this.list4View.width = this._list.length * 110;
                this.list4View.onRefresh(this._list.length, this, this.onRefreshItem);
                this.listView.visible = false;
            }
        }

        private onRefreshItem(tempUI: Pro.NorItemUI, index: number): void
        {
            let addItem = this._list[index];
            tempUI.setItemInfo(addItem);
        }

        /** 页签组件销毁 */
        public dispose(): void
        {
        }
    }
}