module Pro
{
    /**
     * 天界副本章节奖励界面
     */
    export class ChapterRewardViewMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        public UIPanel: ProUI.Heavens.PageView.ChapterRewardViewUI;

        /** 该章节所有奖励配置 */
        private rewardCfgList: Array<cfg.HeavenChapterPrizeCfgInfo>;

        /** 章节下标 */
        private chapterIndex: number;

        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        /** UI打开前状态 */
        public openUI(): void
        {
            this.showPanel(ProUI.Heavens.PageView.ChapterRewardViewUI, 1, BaseAddLayer.CenterUI, true);
        }

        /** 关闭UI*/
        public closeUI(): void
        {
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.btn_close.onClick(this, this.closeUI);
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(EventNotify.Heaven_DrawChapterReward, this, this.initUI);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 初始化面板(UI每次打开) */
        public initUI(): void
        {
            this.chapterIndex = this.UIOpenData.customObject;
            this.rewardCfgList = cfg.HeavenChapterPrizeCfgData.getInfoArrayByChapterIndex(this.chapterIndex);
            this.UIPanel.itemList.onRefresh(this.rewardCfgList.length, this, this.onListItemRefresh);
        }

        /**
         *
         * @param tmpItem
         * @param index
         */
        private onListItemRefresh(tmpItem: ProUI.Heavens.ChildPage.ChapterRewardListItemUI, index: number): void
        {
            let tmpCfg = this.rewardCfgList[index];
            let cur_star = HeavenDungeonDataMgr.getChapterStarsCount(this.chapterIndex);
            tmpItem.txt_title.showText = Global.getLangStr("Heaven_msg1", tmpCfg.star, cur_star, tmpCfg.star);

            let rewards = cfg.HeavenChapterPrizeCfgData.getAddItemAryById(tmpCfg.index);
            tmpItem.itemBox.onRefresh(rewards.length, this, (itemUI: NorItemUI, index: number) =>
            {
                itemUI.setItemInfo(rewards[index]);
            });

            let is_finish = HeavenDungeonDataMgr.isChapterRewardFinish(this.chapterIndex, tmpCfg.index);
            let can_get = cur_star >= tmpCfg.star;

            tmpItem.btn_go.visible = !can_get && !is_finish;
            tmpItem.btn_get.visible = can_get && !is_finish;
            tmpItem.img_finish.visible = is_finish;
            tmpItem.btn_get.onClick(this, () =>
            {
                // 请求领取奖励
                HeavenDungeonSend.chapterReward(tmpCfg.index);
            });

            // EventMgr.trigger(EventNotify.AccountLoginSucceed)
            tmpItem.btn_go.onClick(this, () =>
            {
                // 打开对应章节
                this.closePanel();
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeavenChapterView, tmpCfg.chapter), BaseBackUIType.HideBackUI);
            });
        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        public refreshUI(): void
        {

        }
    }
}