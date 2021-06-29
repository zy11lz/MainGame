module Pro
{
    /**
     * 限时兑换UI
     */
    export class TimeLimitExchangeView extends ProUI.ActivityMain.TimeLimit.PageView.LimitExchangeUI implements ITableView
    {
        // 活动id
        private _act_id: number;

        // 活动表格配置
        private _act_cfg: cfg.ActivityCfgInfo;

        // 兑换消耗的道具ID
        private _useItemID: number;

        private _effNodes: EffNode[] = [];

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.btn_go.onClick(this, () =>
            {
                this.reddot.visible = false
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_LimitExchangeShop, this._act_cfg));
            });
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public addEvent(): void
        {
            EventMgr.on(EventNotify.Activity_Update, this, this.refreshView);
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public removeEvent(): void
        {
            EventMgr.off(EventNotify.Activity_Update, this, this.refreshView);
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
            Laya.timer.clear(this, this.onTimer);
            this.cleanEffectNode();
        }

        private cleanEffectNode(): void
        {
            for (var i = 0; i < this._effNodes.length; i++)
            {
                let el = this._effNodes[i];
                // if (el) el.removeSelf();
                EffectMgr.Inst.releaseEffect(el);
            }
            this._effNodes = [];
        }

        public setData($data: any): void
        {
            ActivityDataMgr.reddotModel.getChildModel("limitExchange").setRedDot(0);
            this.reddot.visible =  ActivityDataMgr.reddotModel.getChildModel("limitExchange").getChildRedDotState(0);
            this._act_id = $data.id;
            this._act_cfg = cfg.ActivityCfgData.getInfo(this._act_id);
            // 使用道具ID
            this._useItemID = cfg.ActivityCfgData.getExchangeCostItemID(this._act_id);
            let use_item_name = cfg.ItemCfgData.getNameById(this._useItemID);
            this.txt_rules.text = Global.getLangStr("activity_exchange_rule", use_item_name);

            this.refreshView();

            this.cleanEffectNode();
            let act_rewards = cfg.ActivityCfgData.getExchangeAddItem(this._act_id);
            this.itemBox.onRefresh(act_rewards.length, this, (itemUI: NorItemUI, index: number) =>
            {
                itemUI.setItemInfo(act_rewards[index]);
                // if (!this._effNodes[index])
                // {
                //     this._effNodes[index] = EffectMgr.Inst.createEffectOne("ui_limitExchange", new Laya.Point(65, 65), -1, 1.05, 1, itemUI, false, ResReleaseType.Reference, true);
                // }
            });

            Laya.timer.loop(1000, this, this.onTimer);
            this.onTimer();
        }

        private refreshView(): void
        {
            if (!this._useItemID) { return; }
            Global.setResSmallIconWithItemID(this.imgCurrency, this._useItemID);
            this.txt_count.text = Global.getItemNum(this._useItemID).toString();
        }

        /** 页签组件销毁 */
        public dispose(): void
        {
            Laya.timer.clear(this, this.onTimer);
        }

        /** 刷新活动倒计时 */
        private onTimer(): void
        {
            let act_start_time = ActivityDataMgr.getActivityServerOpenTime(this._act_id);
            let act_end_time = act_start_time + cfg.HookActivityDropCfgData.getDaysByActivityID(this._act_id) * 24 * 3600;
            let leftTime = act_end_time - TimeController.currTimer / 1000;
            if (leftTime <= 0)
            {   //活动已结束
                this.txt_time.showText = Global.getLangStr("activity_msg23");
                Laya.timer.clear(this, this.onTimer);
                return;
            }
            this.txt_time.showText = Global.getLangStr("activity_msg13", Global.GetRemindTime(leftTime, 9));
        }
    }
}