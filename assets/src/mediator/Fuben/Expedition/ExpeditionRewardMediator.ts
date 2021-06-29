
module Pro
{
	/**
	 * 远征奖励查看
	 */
    export class ExpeditionRewardMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Fuben.Expedition.Reward.MainUI;

        private selectIndex: number;

        /** 需要自动加载的资源列表 */
        public autoLoadAtlas(): Array<any>
        {
            return [];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Fuben.Expedition.Reward.MainUI, 0, BaseAddLayer.TopUI, true);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {

        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.CloseBtn.onClick(this, this.onCloseClick);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.selectIndex = this.UIOpenData.customObject;
            let tmpExtralPrizeList = cfg.ExpeditionStageCfgData.getExtraPrizeAryById(this.selectIndex);

            //活动是否开启
            let actData = ActivityDataMgr.getActivityDataByType(Pb_God._emActivityType.Activity_Times, Pb_God._emActivityTimesType.Activity_Times_Expedition);
            this.UIPanel.RewardBox.onRefresh(tmpExtralPrizeList.length, this, (itmeUI: NorItemUI, index: number) =>
            {
                let tmpItem = tmpExtralPrizeList[index];
                if (actData && tmpItem.itemid == CfgID.ItemID.ExpetitionPoint)
                {
                    itmeUI.setItemID(tmpItem.itemid, tmpItem.itemcount + Math.floor(tmpItem.itemcount * 0.01 * parseInt(cfg.ActivityCfgData.getParamByID(actData.id).split(";")[1])))
                    itmeUI.showActivityTag();
                }
                else itmeUI.setItemInfo(tmpItem);
            });
        }

        public refreshUI()
        {

        }

        private onCloseClick()
        {
            let tmpPrized = ExpeditionDataMgr.getPrizeid(this.selectIndex);
            let tmpStageID = cfg.ExpeditionStageCfgData.getStageIDByIndex(this.selectIndex);
            if (ExpeditionDataMgr.getCurstage() - 1 >= tmpStageID && !tmpPrized)
            {
                ExpeditionSend.stagePrize(this.selectIndex);
            }
            this.closeUI();
        }

    }
}