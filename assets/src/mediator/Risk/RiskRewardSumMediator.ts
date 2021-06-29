module Pro
{
    /**
    * 神界冒险-通关一层后奖励汇总界面
    * @author jason.xu
    */
    export class RiskRewardSumMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Risk.RiskRewardSumUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("riskrewardsum"), UrlMgr.getAtlas("rewardpopup")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Risk.RiskRewardSumUI, 1, BaseAddLayer.TopUI, true, 1);
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
            let list = this.UIOpenData.customObject as Pb_God.PBItemInfo[];
            this.UIPanel.listView.onRefresh(list.length, this, (tempUI: ProUI.Risk.ChildView.RiskRewardSumItemViewUI, index: number) =>
            {
                let itemInfo = list[index];
                Global.setResSmallIconWithItemID(tempUI.icon, itemInfo.itemid);
                tempUI.txtName.text = cfg.ItemCfgData.getNameById(itemInfo.itemid);
                tempUI.txtCount.text = itemInfo.itemcount + "";
            });
        }

    }
}