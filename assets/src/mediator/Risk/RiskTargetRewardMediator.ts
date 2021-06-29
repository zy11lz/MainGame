module Pro
{
    /**
    * 神界冒险：目标奖励界面
    * @author jason.xu
    */
    export class RiskTargetRewardMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Risk.RiskTargetRewardUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null;
            // return [UrlMgr.getAtlas("test")]
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Risk.RiskTargetRewardUI, 1, BaseAddLayer.TopUI,true);
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
            // this.addEventMgr(EventNotify.test, this, this.test);
            this.UIPanel.btnClose.onClick(this, this.closeUI);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            let list = cfg.RiskGuardPrizeCfgData.getAllList();
            //已领奖的排后面
            this.UIPanel.listView.onRefresh(list.length, this, this.onRefreshListItem);
        }

        private onRefreshListItem(tempUI: ProUI.Risk.ChildView.RiskTargetRewardItemUI, index: number): void
        {
            let cfgInfo = cfg.RiskGuardPrizeCfgData.getAllList()[index];
            let cur = RiskDataMgr.data.killguardcount;
            let target = cfgInfo.count;
            let isGet = cur >= target;
            tempUI.btnGo.visible = !isGet;
            tempUI.imgHasGet.visible = isGet;
            tempUI.btnGo.onClick(this, this.closeUI);
            tempUI.txtContent.text = Global.getLangStr("risk_msg6", target, cur, target);
            // reward preview
            let rewards = cfg.RiskGuardPrizeCfgData.getAddItemAryByInfo(cfgInfo);
            tempUI.listNorItem.onRefresh(rewards.length, this, (itemRewardUI: NorItemUI, indexReward: number) =>
            {
                itemRewardUI.setItemInfo(rewards[indexReward]);
            });
        }
    }
}