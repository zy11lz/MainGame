module Pro
{
    /**
     * 计次活动奖励列表
     */
    export class CountGiftsRewardMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        public UIPanel: ProUI.ActivityMain.TimeLimit.PageView.CountGiftsRewardUI;

        // 排行奖励类型
        private rewardType: Pb_God._emTopListType;

        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
        }

        /** 初始化面板(UI每次打开) */
        public initUI(): void
        {
            this.rewardType = this.UIOpenData.customObject as Pb_God._emTopListType;
            TopListSend.list(this.rewardType, 1, 1, 0, 0, 0, 0);
            this.refreshMyRankInfoView(0, null);
            this.refreshListView();
        }

        /** UI打开前状态 */
        public openUI(): void
        {
            this.showPanel(ProUI.ActivityMain.TimeLimit.PageView.CountGiftsRewardUI, 1, BaseAddLayer.TopUI, true);
        }

        /** 关闭UI*/
        public closeUI(): void
        {
            this.closePanel();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            EventMgr.on(CmdEvent.TopList_List_Ack, this, this.onList_Ack);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
            EventMgr.off(CmdEvent.TopList_List_Ack, this, this.onList_Ack);
        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        public refreshUI(): void
        {

        }

        /** 收到排行榜 */
        private onList_Ack(topListValue: Pb_God.PBS2CTopListList)
        {
            if (!topListValue.ask || this.rewardType != topListValue.ask.type) return;
            let myRank = topListValue.selfinfo && topListValue.selfinfo.info ? topListValue.selfinfo.info.rank : 0;
            if (myRank)
            {
                let cfgInfo = cfg.ToplistRewardCfgData.getInfoByRank(myRank, this.rewardType);
                let addItems = cfg.ToplistRewardCfgData.getAddItemAryByInfo(cfgInfo);
                this.refreshMyRankInfoView(myRank, addItems);
            }
        }
        /** 刷新列表 */
        private refreshListView(): void
        {
            // 显示对应奖励列表
            let list = cfg.ToplistRewardCfgData.getRewardListByType(this.rewardType);
            if (!list) return;
            this.UIPanel.listView.onRefresh(list.length, this, (tempUI: Pro.RankRewardPreviewUI, index: number) =>
            {
                let lastRank = index == 0 ? 0 : list[index - 1].rank;
                let cfgData = list[index];
                let curRank = cfgData.rank;
                tempUI.setRankRange(lastRank, curRank);
                let addItems = cfg.ToplistRewardCfgData.getAddItemAryByInfo(cfgData);
                tempUI.setPrizeList(addItems);
            });
        }

        /** 刷新自己排名相关信息显示 */
        private refreshMyRankInfoView(myRank: number, addItems: cfg.AddItemInfo[]): void
        {
            this.UIPanel.txtMyRank.text = myRank > 0 ? (myRank + "") : Global.getLangStr("common_norank");
            this.UIPanel.txtRewardTips.visible = !!addItems;
            this.UIPanel.norItems.visible = !!addItems;
            if (addItems)
            {
                this.UIPanel.norItems.onRefresh(addItems.length, this, (itemUI: NorItemUI, additemsIndex: number) =>
                {
                    itemUI.setItemInfo(addItems[additemsIndex]);
                });
            }
        }
    }
}