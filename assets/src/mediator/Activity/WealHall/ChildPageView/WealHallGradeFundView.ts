module Pro
{
    /**
    * 福利大厅：等级基金
    * @author jason.xu
    */
    export class WealHallGradeFundView extends ProUI.ActivityMain.PageView.GradeFundUI implements ITableView
    {
        /** 对应支付配置 */
        private _chargeCfgInfo: cfg.ChargeCfgInfo;

        /** 当前活动ID */
        private _actId: number = 0;

        /** 是否已经购买 */
        private _isActive = false;

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this._chargeCfgInfo = PlatformDataMgr.getValidChargeListByType(Pb_God._emChargeType.ChargeType_GrowFund)[0];
            this._actId = cfg.ActivityGrowFundCfgData.getFirstInfo().activityID;
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public addEvent(): void
        {
            EventMgr.on(CmdEvent.Platform_update_chargeinfo, this, this.onPlatformUpgrade);
            EventMgr.on(CmdEvent.Platform_SynCharge, this, this.onPlatformUpgrade);
            EventMgr.on(EventNotify.Activity_Update, this, this.onUpdateActivity);
            this.btnBuy.onClick(this, this.onClickBuy);
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public removeEvent(): void
        {
            EventMgr.off(CmdEvent.Platform_update_chargeinfo, this, this.onPlatformUpgrade);
            EventMgr.off(CmdEvent.Platform_SynCharge, this, this.onPlatformUpgrade);
            EventMgr.off(EventNotify.Activity_Update, this, this.onUpdateActivity);
        }

        private onClickBuy(): void
        {
            PlatformDataMgr.onChargeRequest(this._chargeCfgInfo);
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
            //标记当天已经打开过界面了。
            TodayRepeatOpMgr.Inst.setTag("gradeFundOpen");

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
            this.refreshActiveState();
            //列表
            this.refreshList();
        }

        private onPlatformUpgrade(): void
        {
            let hasBuy = !!this.checkIsActive();
            if (this._isActive == hasBuy) return;

            this.refreshActiveState();
            //列表
            this.refreshList();
        }

        /** 刷新购买状态 */
        private refreshActiveState(): void
        {
            //当前是否已经购买过
            let hasBuy = !!this.checkIsActive();
            this.btnBuy.disabled = hasBuy;
            this._isActive = hasBuy;
            if (hasBuy) this.txtPirce.text = Global.getLangStr("common_isBuy");
            else this.txtPirce.text = Global.getLangStr("activity_msg6", this._chargeCfgInfo.needMoney / 100);
        }

		/*****
		 *    活动更新
		 */
        protected onUpdateActivity(actId: number): void
        {
            if (this._actId != actId) return;  //不同同一个活动。
            this.refreshList();
        }

        private refreshList(): void
        {
            let list = cfg.ActivityGrowFundCfgData.getAll();
            /** 当前活动数据 */
            let activityData = ActivityDataMgr.getActivityDataById(this._actId);
            //排序，将已经领奖的放后面。
            let list1 = [];
            let list2 = [];
            for (var el of list)
            {
                let isGet = activityData && activityData.acquired.indexOf(el.index) >= 0;
                if (isGet) list2.push(el);
                else list1.push(el);
            }
            list = list1.concat(list2);
            this.listView.onRefreshWithArray(list, this, this.onRefreshItem);
        }

        private onRefreshItem(tempUI: ProUI.ActivityMain.ChildItemView.GradeFundItemUI, index: number): void
        {
            let cfgInfo = this.listView.getItem(index) as cfg.ActivityGrowFundCfgInfo;
            let needGrade = cfgInfo.level;
            let addItems = cfg.ActivityGrowFundCfgData.getAddItemInfoByInfo(cfgInfo);
            if (addItems == null)
            {
                return;
            }
            let basePrize = addItems[0].itemcount;
            let addPirze = addItems[1].itemcount;

            /** 当前活动数据 */
            let activityData = ActivityDataMgr.getActivityDataById(cfgInfo.activityID);
            let isGet = activityData && activityData.acquired.indexOf(cfgInfo.index) >= 0;

            tempUI.txtCondition.text = Global.getLangStr("activity_msg7", needGrade);
            tempUI.imgPrize1.skin = Global.getItemIconById(addItems[0].itemid);
            tempUI.imgPrize2.skin = Global.getItemIconById(addItems[1].itemid);
            tempUI.txtPrizeValue1.text = "x" + basePrize;
            tempUI.txtPrizeValue2.text = "x" + addPirze;
            let isActiveGrade = needGrade <= PlayerDataMgr.level;
            tempUI.btnNoCan.visible = !isActiveGrade;
            tempUI.btnGet.visible = isActiveGrade && !isGet;
            tempUI.btnIsGet.visible = isActiveGrade && isGet;
            tempUI.reddotGet.visible = this._isActive;
            tempUI.btnGet.onClick(this, () =>
            {
                //是否已经激活基金可以领取
                if (!this._isActive)
                {  //玩家在已达成等级条件但未激活基金的情况下，点击领券按钮，弹出文字提示”购买基金后才能领取哦”
                    TipsUtils.showTipsByLanId("tips_msg6");
                    return;
                }
                //向服务器请求领奖
                ActivitySend.drawReward(cfgInfo.activityID, cfgInfo.index, 1);
            })
        }

        /** 判断是否购买过该基金 */
        private checkIsActive(): boolean
        {
            let chargeInfo = PlatformDataMgr.getChargeInfoByCfgInfo(this._chargeCfgInfo);
            return chargeInfo && chargeInfo.buycount > 0;
        }


        /** 页签组件销毁 */
        public dispose(): void
        {
        }
    }
}