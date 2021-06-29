module Pro
{
    /**
    * 冠军赛排行奖励
    * @author jason.xu
    */
    export class ChampRewardMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Champion.ChampionRewardUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Champion.ChampionRewardUI, 1);
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
            let cfgList = cfg.ChampionTopPrizeCfgData.getAll();
            this.UIPanel.listView.onRefresh(cfgList.length, this, (tempUI: Pro.RankRewardPreviewUI, index: number) =>
            {
                let lastRank = index == 0 ? 0 : cfgList[index - 1].rank;
                let cfgData = cfgList[index];
                let curRank = cfgData.rank;
                tempUI.setRankRange(lastRank, curRank);
                let addItems = cfg.ChampionTopPrizeCfgData.getAddItemAryByInfo(cfgData);
                tempUI.setPrizeList(addItems);
            });
        }

    }
}