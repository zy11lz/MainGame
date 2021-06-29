module Pro
{
    /**
    * 界面说明：公会副本排名奖励预览界面
    * @author jason.xu
    */
    export class FactionBossRankRewardMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Faction.FactionBossRankRewardUI;

        private _cfgList: cfg.FactionCopymapTopprizeCfgInfo[];
        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Faction.FactionBossRankRewardUI, 1, BaseAddLayer.TopUI, true);
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
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            let id: number = this.UIOpenData.customObject;
            this._cfgList = cfg.FactionCopymapTopprizeCfgData.getDataArrayByID(id);
            if (this._cfgList)
            {
                this.UIPanel.listView.onRefresh(this._cfgList.length, this, this.onRefreshItem);
            } else
            {
                GameLaunch.PostClientLog("cfg.FactionCopymapTopprizeCfgData.getDataArrayByID(id); 为空 id = " + id)
            }


        }

        private onRefreshItem(tempUI: Pro.RankRewardPreviewUI, index: number): void
        {
            let lastRank = index == 0 ? 0 : this._cfgList[index - 1].rank;
            let cfgData = this._cfgList[index];
            let curRank = cfgData.rank;
            tempUI.setRankRange(lastRank, curRank);
            let addItems = cfg.FactionCopymapTopprizeCfgData.getAddItemAryByInfo(cfgData);
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