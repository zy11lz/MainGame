module Pro
{
    /**
    * 界面说明：公会战-排名奖励预览界面
    * @author jason.xu
    */
    export class FactionWarRewardMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.FactionWar.FactionWarRewardUI;


        private _cfgList: cfg.FactionWarTopPrizeCfgInfo[];
        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        public openUI(): void
        {
            this.showPanel(ProUI.FactionWar.FactionWarRewardUI, 1);
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
            this.refreshUI();
            this._cfgList = cfg.FactionWarTopPrizeCfgData.getAll();
            if (this._cfgList)
            {
                this.UIPanel.listView.onRefresh(this._cfgList.length, this, this.onRefreshItem);
            } else
            {
                GameLaunch.PostClientLog("cfg.FactionWarTopPrizeCfgData.getAll(); 为空   ");
            }


        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
        }

        private onRefreshItem(tempUI: Pro.RankRewardPreviewUI, index: number): void
        {
            let lastRank = index == 0 ? 0 : this._cfgList[index - 1].rank;
            let cfgData = this._cfgList[index];
            let curRank = cfgData.rank;
            tempUI.setRankRange(lastRank, curRank);
            let addItems = cfg.FactionWarTopPrizeCfgData.getAddItemAryByInfo(cfgData);
            tempUI.setPrizeList(addItems);
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

    }
}