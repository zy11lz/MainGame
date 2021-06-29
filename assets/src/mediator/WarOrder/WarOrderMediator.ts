module Pro
{
    /**
     * 界面说明： 神庭战令（赛季票成就系统）
    * @author jason.xu
    */
    export class WarOrderMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.TaskWarOrder.WarOrderUI;
        //public UIOpenData: BaseOpenUIData;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas('warorder')];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.TaskWarOrder.WarOrderUI, 1, BaseAddLayer.TopUI, true);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.pageViewContainer.initData(this.UIPanel.tabGrp, [
                new TableBarContinerData("warorder_tab1", "reward", WarOrderRewardPageView),
                new TableBarContinerData("warorder_tab2", "task", WarOrderTaskPageView)
            ], [new component.UITabStyle("#5b545b"), new component.UITabStyle("#fffced")]);
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            //赛季周期显示
            let worldCreateZeroTime = TimeController.worldCreateZeroTime; //开服时间
            let currTimer = TimeController.currTimer;
            let startTime = worldCreateZeroTime + (cfg.AchieveConstCfgData.getFirstInfo().warOrderOpenDay - 1) * 24 * 3600 * 1000;
            let period: number = cfg.AchieveConstCfgData.getFirstInfo().warOrderDuration * 24 * 3600 * 1000; //周期
            let beginTime = currTimer - Math.floor(currTimer - startTime) % period;
            let endTime = beginTime + period;
            this.UIPanel.htmlTimer.showText = Global.getLangStr("warorder_msg5", Global.getFormatTimeString(beginTime, 10), Global.getFormatTimeString(endTime, 10));

            //红点
            this.UIPanel.tabGrp.setRedDotModelList([
                AchieveDataMgr.reddotModelWarOrder.getChildModel("reward"),
                AchieveDataMgr.reddotModelWarOrder.getChildModel("task")
            ])

            this.refreshLevelInfoView();
            this.refreshUpAdvanceState();

            this.UIPanel.tabGrp.setSelectTab(0);
            
            let warOderCharge =  Public.LStorageMgr.GetInst().getLocalData(`warOderCharge_${PlayerDataMgr.name}`);
            if (!PrivilegeDataMgr.getPrivilegeCardValid(Pb_God._emPrivilegeCard.PrivilegeCard_WarOrder) && !warOderCharge)
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_WarOrderCharge));
            }
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnUpAdvance.onClick(this, this.onClickUpAdvance);

            this.addEventMgr(CmdEvent.Common_TimeEvent, this, this.closeUI);
            this.addEventMgr(EventNotify.Privilege_Card_Change, this, this.refreshUpAdvanceState);
            this.addEventMgr(CmdEvent.Achieve_SyncWarOrderLevel, this, this.refreshLevelInfoView);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 刷新进阶按钮显示状态 */
        private refreshUpAdvanceState(): void
        {
            this.UIPanel.btnUpAdvance.visible = !PrivilegeDataMgr.getPrivilegeCardValid(Pb_God._emPrivilegeCard.PrivilegeCard_WarOrder);
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

        /** 刷新经验等级显示 */
        private refreshLevelInfoView(): void
        {
            let data = AchieveDataMgr.getWarOrderData();
            let level = data.level;
            let maxExp = cfg.AchieveWarOrderPrizeCfgData.getExpByLevel(level);
            this.UIPanel.txtLevel.text = level + "";
            this.UIPanel.txtProgress.text = data.exp + "/" + maxExp;
            if(data.exp == 0)
			{
				// 这里设置为0 赋值bar的width有问题
				this.UIPanel.imgProgress.visible = false;
			}
            else
            {
                this.UIPanel.imgProgress.visible = true
                let progress = (data.exp / maxExp) > 1 ? 1 : data.exp / maxExp;
                Global.setProgressBarMask(this.UIPanel.imgProgress, data.exp / maxExp);
            }
        }

        /** 点击战令进阶按钮 */
        private onClickUpAdvance(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_WarOrderCharge));
        }

    }
}