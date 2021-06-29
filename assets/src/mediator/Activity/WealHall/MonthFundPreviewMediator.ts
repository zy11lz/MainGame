module Pro
{
    /**
     * 界面说明： 超值月基金奖励预览界面
    * @author jason.xu
    */
    export class MonthFundPreviewMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.ActivityMain.MonthFund.MonthFundPreviewUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        public openUI(): void
        {
            this.showPanel(ProUI.ActivityMain.MonthFund.MonthFundPreviewUI, 1, BaseAddLayer.TopUI, true);
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
            let list = cfg.ActivityFundCfgData.getList(this.UIOpenData.customObject, false);
            this.UIPanel.listView.onRefreshWithArray(list, this, this.onRefreshItem);
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
        }

        private onRefreshItem(tempUI: ProUI.ActivityMain.MonthFund.MonthFundPreviewItemUI, index: number): void
        {
            let cfgInfo = this.UIPanel.listView.getItem(index) as cfg.ActivityFundCfgInfo;
            tempUI.txtDays.text = Global.getLangStr("activity_msg3", cfgInfo.day);
            let addItem = cfg.ActivityFundCfgData.getAddItemInfoByInfo(cfgInfo);
            tempUI.norItem.setItemInfo(addItem);
        }


    }
}