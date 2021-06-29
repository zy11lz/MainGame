module Pro
{
    /**
     * 通用活动TimeLimitActivityMediator 
     * 活动分页基类： 带有bannel控制与活动列表显示等
     * @author jason.xu
     */
    export class TimeLimitCommonPageView extends ProUI.ActivityMain.TimeLimit.PageView.CommonActivityPageUI implements ITableView
    {

        /** 对应开启的活动Id */
        protected _actIds: number[];
        /** 对应活动分组配置 */
        protected _actGrpPageCfgInfo: cfg.ActivityCommonGroupPageCfgInfo;

        /** 倒计时结束时间 */
        protected _overTime = 0;

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public addEvent(): void
        {
            EventMgr.on(EventNotify.Activity_Update, this, this.onActivityUpdate);
            this.btn_help.onClick(this, this.onClickHelp);
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public removeEvent(): void
        {
            EventMgr.off(EventNotify.Activity_Update, this, this.onActivityUpdate);
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {

        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
            Laya.timer.clear(this, this.onTimer);
        }

        /** 点击帮助 */
        private onClickHelp(btn: component.UIButton): void
        {
            CommonHelpView.show(btn, this._actGrpPageCfgInfo.helpTips);
        }

        private onActivityUpdate(actid: number): void
        {
            if (this._actIds.indexOf(actid) < 0) return;
            this.refreshListView();
        }

        public setData($data: Pb_God.PBPlayerActivityData): void
        {
            this._actIds = $data[0];
            this._actGrpPageCfgInfo = $data[1];

            //是否有banner
            let showBanner = !!this._actGrpPageCfgInfo.banner;
            this.boxBanner.visible = showBanner;
            if (showBanner)
            {
                this.itemList.height = 630;
                this.imgBanner.skin = `res/Unpack/activityBanner/` + this._actGrpPageCfgInfo.banner;
                if (this._actGrpPageCfgInfo.bannerTips) this.txtBannerTips.showText = this._actGrpPageCfgInfo.bannerTips;
                this.btn_help.visible = !!this._actGrpPageCfgInfo.helpTips;
            } else
            {
                this.itemList.height = 810;
            }

            this.refreshListView();

            this._overTime = ActivityDataMgr.getActivityEndTimeStamp(this._actIds[0]);
            Laya.timer.loop(1000, this, this.onTimer);
            this.onTimer();
        }

        /** 页签组件销毁 */
        public dispose(): void
        {

        }

        /** 跳转充值
         * 由此当前界面就是包含了一键牛逼的通用充值跳转，但当前界面又是一个通用型的活动界面，所以在跳转充值时还需要一些特殊处理。
         * 如果当前界面的分页中，包含有充值付费类的分页， 则直接跳至对应的分页即可，如果没有，则需要跳出去。
         */
        protected gotoCharge(): void
        {
            //判断当前这个界面内，是否还有可购买的付费
            // let actGrpInfo = cfg.ActivityCommonGroupCfgData.getInfo(this._actGrpPageCfgInfo.groupID);
            if (ActivityDataMgr.checkCommonGroupActChargeValid(this._actGrpPageCfgInfo))
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_TimeLimitActivity, this._actGrpPageCfgInfo.groupID, 0), Pro.BaseBackUIType.HideBackUI);
            } else
            {
                PlatformDataMgr.openChargeUI();
            }
        }

        /** 刷新列表显示（子类继承） */
        protected refreshListView(): void
        {

        }


        /** 刷新活动倒计时 */
        private onTimer(): void
        {
            let cur_timer = TimeController.currTimer / 1000;
            let leftTime = this._overTime - cur_timer;
            if (leftTime <= 0)
            {   //活动已结束
                this.htmlTimer.showText = Global.getLangStr("activity_msg23");
                Laya.timer.clear(this, this.onTimer);
                return;
            }
            this.htmlTimer.showText = Global.getLangStr("activity_msg5", Global.GetRemindTime(leftTime, 9));
        }
    }
}