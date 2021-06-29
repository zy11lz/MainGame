module Pro
{
    /**
    * 界面说明： 跨服天梯奖励预览
    * @author jason.xu
    */
    export class LadderRewardMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Ladder.LadderRewardUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null;
            // return [UrlMgr.getAtlas("temp")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Ladder.LadderRewardUI, 1,BaseAddLayer.CenterUI,true);
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
            this.refreshMyRankInfoView();
            this.refreshListView();
            this.refreshUI();
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

        /** 刷新列表 */
        private refreshListView(): void
        {
            let cfgList = cfg.LadderTopPrizeCfgData.getAll();
            this.UIPanel.listView.onRefresh(cfgList.length, this, (tempUI: Pro.RankRewardPreviewUI, index: number) =>
            {
                let lastRank = index == 0 ? 0 : cfgList[index - 1].order;
                let cfgData = cfgList[index];
                let curRank = cfgData.order;
                tempUI.setRankRange(lastRank, curRank);
                let addItems = cfg.LadderTopPrizeCfgData.getAddItemAryByInfo(cfgData);
                tempUI.setPrizeList(addItems);
            });
        }

        /** 刷新自己排名相关信息显示 */
        private refreshMyRankInfoView(): void
        {
            let myRank = LadderDataMgr.myRank;
            let cfgInfo = cfg.LadderTopPrizeCfgData.getInfoByRank(myRank);
            let hasRankPrize = !!cfgInfo;
            this.UIPanel.txtMyRank.text = myRank > 0 && hasRankPrize ? (myRank + "") : Global.getLangStr("common_norank");
            this.UIPanel.txtRewardTips.visible = hasRankPrize;
            this.UIPanel.norItems.visible = hasRankPrize;
            if (hasRankPrize)
            {
                let addItems: cfg.AddItemInfo[] = cfg.LadderTopPrizeCfgData.getAddItemAryByInfo(cfgInfo);
                this.UIPanel.norItems.onRefresh(addItems.length, this, (itemUI: NorItemUI, additemsIndex: number) =>
                {
                    itemUI.setItemInfo(addItems[additemsIndex]);
                });
            }
        }

    }
}