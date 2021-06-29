module Pro
{
    /**
    * 月基金：128分页与328分页共用视图
    * @author jason.xu
    */
    export class WealHallMonthFundView extends ProUI.ActivityMain.MonthFund.MonthFundUI implements ITableView
    {
        private _index: number; //123
        private _activityId: number;

        /** 支付信息 */
        private _chargeCfgInfo: cfg.ChargeCfgInfo;
        /** 当前领奖的进度 */
        private _rewardIndex: number = 0;
        /**不同基金领取文本字体颜色 */
        private _color = ["#734c80", "#d23c3c"];
        /**奖励组 */
        private _list = [];
        constructor(args: number[])
        {
            super();
            this._index = args[0];
            this._activityId = args[1];
        }

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            //需要从活动表的参数中取得对应的支付id.
            let activityInfo = cfg.ActivityCfgData.getInfo(this._activityId);
            if (activityInfo)
            {
                this._chargeCfgInfo = cfg.ChargeCfgData.getInfo(parseInt(activityInfo.param));

                let activity = ["activity_monthFund_msg7", "activity_monthFund_msg7_0"][this._index - 1];
                this.txtTips.showText = Global.getLangStr(activity);
            }

            //文字外发光颜色随背景颜色变化
            this.frameBg.frame = this._index;
            let strokeColor = ["#4e1d5f", "#53142a"][this._index - 1];
            this.txtTips.fontStrokeColor = strokeColor;
            this.txtTotalTitle.strokeColor = strokeColor;
            this.txtNoActiveTips1.strokeColor = strokeColor;
            this.txtNoActiveTips2.strokeColor = strokeColor;
            this.txtGetDay.color = this._color[this._index - 1];
            this.txtActiveTips.color = this._color[this._index - 1];
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public addEvent(): void
        {
            EventMgr.on(EventNotify.Activity_Update, this, this.onUpdateActivity);
            EventMgr.on(CmdEvent.Platform_update_chargeinfo, this, this.refreshRewardState);
            EventMgr.on(CmdEvent.Platform_SynCharge, this, this.refreshRewardState);


            this.btnPreview.onClick(this, this.onClickPreview);
            this.btnActive.onClick(this, this.onClickActive);
            this.btnGet.onClick(this, this.onClickGetPrize);
            this.btnIsGet.onClick(this, this.onClickIsGet);
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public removeEvent(): void
        {
            EventMgr.off(EventNotify.Activity_Update, this, this.onUpdateActivity);
            EventMgr.off(CmdEvent.Platform_update_chargeinfo, this, this.refreshRewardState);
            EventMgr.off(CmdEvent.Platform_SynCharge, this, this.refreshRewardState);
        }

        /** 点击奖励预览 */
        private onClickPreview(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_MonthFundPreview, this._activityId));
        }

        /** 点击激活 */
        private onClickActive(): void
        {
            //2020.11.25  策划要求解除没有购买至尊月卡就不能买月基金的限制
            //至尊月卡未激活时不能激活
            // if (!PrivilegeDataMgr.getPrivilegeCardValid(Pb_God._emPrivilegeCard.PrivilegeCard_MonthZZCard))
            // {
            //     TipsUtils.showTipsByLanId("tips_msg2");
            //     return;
            // }
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
            this.refreshPreviewList();
        }

        /** 刷新领奖状态 */
        private refreshRewardState(): void
        {
            //支付信息
            if (!this._chargeCfgInfo) return;
            //总价值
            this.txtTotalCost.text = this._chargeCfgInfo.params;

            //检查当前基金是否已经激活 
            let isActive = false;
            let activeEndTime = 0;
            let currTime = TimeController.currTimer;
            let chargeInfo = PlatformDataMgr.getChargeInfoByCfgInfo(this._chargeCfgInfo);
            if (chargeInfo && chargeInfo.buycount > 0)
            { //如果有购买信息，还需检查一次最后的购买时间往后推30天是否还在有效期内。
                activeEndTime = Global.getLaterDayTime(chargeInfo.lastbuytime * 1000, 30);
                isActive = activeEndTime > currTime;
            }
            //ui
            this.boxNoActive.visible = !isActive;
            this.boxActive.visible = isActive;

            if (isActive)
            {
                //计算当前激活的总天数(包括当天)
                let activeDays = 30 - Math.floor((activeEndTime - TimeController.currTimer) / (24 * 3600 * 1000));
                let fundCfgInfo = cfg.ActivityFundCfgData.getInfoByActivityIdAndDay(this._activityId, activeDays);
                if (!fundCfgInfo)
                {
                    logE("超值基金数据异常， activityId=" + this._activityId + " activeDays=" + activeDays);
                    return;
                }
                this._rewardIndex = fundCfgInfo.index;
                //当天是否已经领奖
                let activityData = ActivityDataMgr.getActivityDataById(this._activityId);
                let todayIsGet = activityData && activityData.acquired.indexOf(this._rewardIndex) >= 0;
                //当前已经领奖的天数
                let rewardDays = todayIsGet ? activeDays : (activeDays - 1);
                //显示道具
                this.norItem.setItemInfo(cfg.ActivityFundCfgData.getAddItemInfoByInfo(fundCfgInfo));
                this.txtGetDay.text = Global.getLangStr("activity_monthFund_msg5", rewardDays);
                this.txtDate.text = Global.getLangStr("activity_msg2", Global.getFormatTimeString(chargeInfo.lastbuytime * 1000, 10), Global.getFormatTimeString(activeEndTime, 10));
                this.txtDate.color = this._color[this._index - 1];
                this.btnGet.visible = !todayIsGet;
                this.btnIsGet.visible = todayIsGet;
            } else
            {
                let addItem = cfg.ChargeCfgData.getAddItemAryByID(this._chargeCfgInfo.iD)[0];
                if (addItem) this.txtDiamonValue.text = addItem.itemcount + "";
                else this.txtDiamonValue.text = "0"
                this.txtPrice.text = Global.getLangStr("common_money", this._chargeCfgInfo.needMoney / 100);
            }
        }


        /** 刷新预览列表 */
        private refreshPreviewList(): void
        {
            //如果是重复的奖励，数量叠加，多余的就不再显示了
            let list: cfg.ActivityFundCfgInfo[];
            list = cfg.ActivityFundCfgData.getList(this._activityId, true);
            let tmpRewardDic = new Laya.Dictionary();
            for (let index = 0; index < list.length; index++)
            {
                let Item = cfg.ActivityFundCfgData.getAddItemInfoByInfo(list[index]);
                this.__addItemToDict(tmpRewardDic, Item.itemid, Item.itemcount);

            }
            // 返还道具显示
            this._list = tmpRewardDic.values;
            this.listView.onRefresh(this._list.length, this, this.onRefreshItem);
        }

        private onRefreshItem(tempUI: Pro.NorItemUI, index: number): void
        {
            let addItem = this._list[index];
            tempUI.setItemInfo(addItem);
        }

        private __addItemToDict(dict: Laya.Dictionary, itemId: number, itemcount: number): void
        {
            let tmpvalue = dict.get(itemId);
            if (tmpvalue == null)
            {
                tmpvalue = new Pb_God.PBItem();
                tmpvalue.itemid = itemId;
                dict.set(itemId, tmpvalue);
            }
            tmpvalue.itemcount += itemcount;
        }

        /** 页签组件销毁 */
        public dispose(): void
        {
        }
    }
}