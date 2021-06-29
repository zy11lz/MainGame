module Pro
{
    /**
    * 界面说明：神界冒险商店
    * @author jason.xu
    */
    export class RiskShopMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Risk.RiskShopUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("shop")]
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Risk.RiskShopUI, 1, BaseAddLayer.TopUI,true);
        }
        public closeUI(): void
        {
            super.closeUI();
           Laya.timer.clear(this, this.onTimer);
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

            Laya.timer.loop(1000, this, this.onTimer);
            this.onTimer();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(CmdEvent.Risk_ShopBuyAck, this, this.onShopBuyAck);
            this.UIPanel.btnClose.onClick(this, this.closeUI);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 商品购买回调 */
        private onShopBuyAck(value: Pb_God.PBU32): void
        {
            //找出列表中对应的
            let list = RiskDataMgr.data.shopindex;
            for (var i = 0; i < list.length; i++)
            {
                if (list[i].key == value.value)
                {
                    this.UIPanel.listView.setItem(i, list[i]);
                    return;
                }
            }
        }

        /** 倒计时 */
        private onTimer(): void
        {
            let time = RiskDataMgr.overTime - TimeController.currTimer / 1000;
            if (time < 0)
            {
                time = 0;
                this.closeUI(); //到时间重置了
            }
            this.UIPanel.txtTimer.text = Global.GetRemindTime(time, 4);
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            let list = RiskDataMgr.data.shopindex;
            this.UIPanel.listView.onRefresh(list.length, this, this.onRefreshListItem);
        }

        private onRefreshListItem(tempUI: Pro.RiskShopItemView, index: number): void
        {
            let data = RiskDataMgr.data.shopindex[index];
            tempUI.setShopData(data.key, data.value);
        }

    }
}