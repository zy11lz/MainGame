module Pro
{
    /** 通用的排名奖励预览item，  
     * 带top3排名图标 与 10~100类似的排名范围字样
     * 奖励道具列表
     */
    export class RankRewardPreviewUI extends ProUI.Utils.RankRewardPreviewItemUI
    {
        constructor()
        {
            super();
        }

        /** 设置排名区间  (lastRank, curRank] */
        public setRankRange(lastRank: number, curRank: number): void
        {
            if (curRank > lastRank + 1)
            {
                //中间有差，则显示 a~b的形式
                this.imgFrameRank.frame = 0;
                this.txtRank.text = (lastRank + 1) + "~" + curRank;
            } else if (curRank <= 3)
            {
                //前3用图片显示
                this.imgFrameRank.frame = curRank;
                this.txtRank.text = "";
            } else
            {
                this.imgFrameRank.frame = 0;
                this.txtRank.text = curRank + "";
            }
        }

        /**  设置奖励列表 */
        public setPrizeList(list: cfg.AddItemInfo[]): void
        {
            this.norItemListView.onRefresh(list.length, this, (itemUI: NorItemUI, additemsIndex: number) =>
            {
                itemUI.setItemInfo(list[additemsIndex]);
            });
        }
    }
}