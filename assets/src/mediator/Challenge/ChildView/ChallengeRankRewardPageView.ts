module Pro
{

    /**
    * 
    * 循环赛界面分离视图逻辑： 排名奖励分页
    *
    * @author jason.xu
    * 
    */
    export class ChallengeRankRewardPageView extends ProUI.Challenge.ChildView.RankRewardViewUI implements ITableView
    {

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {

        }

        public addEvent(): void
        {
            EventMgr.on(EventNotify.Challenge_Order_Change, this, this.resetMyOrder);
        }

        public removeEvent(): void
        {
            EventMgr.off(EventNotify.Challenge_Order_Change, this, this.resetMyOrder);
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
            this.resetMyOrder(ChallengeDataMgr.getMyOrder());
            let len = cfg.ChallengeSeasonPrizeCfgData.getAllList().length;
            this.listView.onRefresh(len, this, this.onRefreshListItem);
            //赛季剩余时间倒计时
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

        //赛季倒计时
        private onTimer(): void
        {
            let currTimer = TimeController.currTimer / 1000;
            let time = ChallengeDataMgr.getSeasonOverTime() - currTimer;
            this.txtOverTime.text = Global.GetRemindTime(time, 10);
        }

        /** 排名奖励single item */
        private onRefreshListItem(tempUI: ProUI.Challenge.ChildView.RewardItemViewUI, index: number): void
        {
            let cfgList = cfg.ChallengeSeasonPrizeCfgData.getAllList();
            let cfgData = cfgList[index];
            let lastRank = index > 0 ? cfgList[index - 1].order : 0;
            let curRank = cfgData.order;
            if (curRank > lastRank + 1)
            {
                //中间有差，则显示 a~b的形式
                tempUI.imgFrameRank.frame = 0;
                tempUI.txtRank.text = (lastRank + 1) + "~" + curRank;
            } else if (curRank <= 3)
            {
                //前3用图片显示
                tempUI.imgFrameRank.frame = curRank;
                tempUI.txtRank.text = "";
            } else
            {
                tempUI.imgFrameRank.frame = 0;
                tempUI.txtRank.text = curRank + "";
            }
            let addItems = cfg.ChallengeSeasonPrizeCfgData.getAddItemAryByInfo(cfgData);
            tempUI.listItems.onRefresh(addItems.length, this, (itemUI: NorItemUI, additemsIndex: number) =>
            {
                itemUI.setItemInfo(addItems[additemsIndex]);
            });
        }

        private resetMyOrder(order: number): void
        {
            if (order <= 0)
            { //未上榜
                this.txtRank.text = Global.getLangStr("common_norank");
                this.listItems.onRefresh(0, this, null);
            } else
            {
                this.txtRank.text = order + "";
                let cfgList = cfg.ChallengeSeasonPrizeCfgData.getAllList();
                for (let cfgData of cfgList)
                {
                    if (cfgData.order >= order)
                    {
                        this.setupMyRankInfo(cfgData);
                        return;
                    }
                }
            }
        }

        //刷新我的排名信息
        private setupMyRankInfo(cfgData: cfg.ChallengeSeasonPrizeCfgInfo)
        {
            let addItems = cfg.ChallengeSeasonPrizeCfgData.getAddItemAryByInfo(cfgData);
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