module Pro
{

    /**
    * 
    *   连连看排行奖励
    */
    export class LianLianKanRankRewardPageView extends ProUI.ActivityMain.LianLianKan.LianLianKanRankRewardPageUI implements ITableView
    {

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {

        }

        public addEvent(): void
        {

        }

        public removeEvent(): void
        {

        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
            this.resetMyOrder(JoyousLinkupDataMgr.myRank);
            let len = cfg.ToplistRewardCfgData.getRewardListByType(Pb_God._emTopListType.TopListType_JoyousLinkup).length;
            this.listView.onRefresh(len, this, this.onRefreshListItem);
            //活动剩余时间倒计时
            Laya.timer.loop(1000, this, this.onTimer);
            this.onTimer();
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
        }

        public setData($data: any): void
        {

        }

        //活动倒计时
        private onTimer(): void
        {
            let actRemainTime =ActivityDataMgr.getActivityEndTimeStamp(cfg.JoyousLinkupJoyousLinkupCfgData.getActivityCfgInfo().iD) * 1000 - TimeController.currTimer;
            this.txtOverTime.text = Global.GetRemindTime(actRemainTime / 1000, 10)
        }

        /** 排名奖励single item */
        private onRefreshListItem(tempUI: ProUI.ActivityMain.LianLianKan.LianLianKanRankRewardItemUI, index: number): void
        {
            let cfgList = cfg.ToplistRewardCfgData.getRewardListByType(Pb_God._emTopListType.TopListType_JoyousLinkup);

            let isRatio = cfg.ToplistCfgData.getRankRatioRewardByType(Pb_God._emTopListType.TopListType_JoyousLinkup);
            let cfgData = cfgList[index];
            let lastRank = index > 0 ? cfgList[index - 1].rank : 0;
            let curRank = cfgData.rank;
            if (curRank > lastRank + 1)
            {
                //中间有差，则显示 a~b的形式
                tempUI.imgFrameRank.frame = 0;
                if (isRatio)
                    tempUI.txtRank.text = (lastRank + 1) / 100 + "%" + "~" + curRank / 100 + "%";
                else
                    tempUI.txtRank.text = (lastRank + 1) + "~" + curRank;
            } else if (curRank <= 3)
            {
                //前3用图片显示
                tempUI.imgFrameRank.frame = curRank;
                tempUI.txtRank.text = "";
            } else
            {
                tempUI.imgFrameRank.frame = 0;
                if (isRatio)
                    tempUI.txtRank.text = curRank / 100 + "%";
                else
                    tempUI.txtRank.text = curRank + "";
            }
            let addItems = cfg.ToplistRewardCfgData.getAddItemAryByInfo(cfgData);
            tempUI.listItems.onRefresh(addItems.length, this, (itemUI: NorItemUI, additemsIndex: number) =>
            {
                itemUI.setItemInfo(addItems[additemsIndex]);
            });
        }

        private resetMyOrder(order: number): void
        {
            let isRatio = cfg.ToplistCfgData.getRankRatioRewardByType(Pb_God._emTopListType.TopListType_JoyousLinkup);
            if (order <= 0)
            { //未上榜
                this.txtRank.text = Global.getLangStr("common_norank");
                this.listItems.onRefresh(0, this, null);
            } else
            {
                if (isRatio)
                    this.txtRank.text = order / 100 + "%";
                else
                    this.txtRank.text = order + "";
                let cfgList = cfg.ToplistRewardCfgData.getRewardListByType(Pb_God._emTopListType.TopListType_JoyousLinkup);
                for (let cfgData of cfgList)
                {
                    if (cfgData.rank >= order)
                    {
                        this.setupMyRankInfo(cfgData);
                        return;
                    }
                }
            }
        }

        //刷新我的排名信息
        private setupMyRankInfo(cfgData: cfg.ToplistRewardCfgInfo)
        {
            let addItems = cfg.ToplistRewardCfgData.getAddItemAryByInfo(cfgData);
            this.listItems.onRefresh(addItems.length, this, (itemUI: NorItemUI, index: number) =>
            {
                itemUI.setItemInfo(addItems[index]);
            });
        }


        /** 页签组件销毁 */
        public dispose(): void
        {

        }

    }
}