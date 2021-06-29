module Pro
{
    /**
    *
    * 胡帕商城
    */
    export class HuPaExChangePageView extends ProUI.ActivityMain.HuPa.HuPaShopUI implements ITableView
    {

        private _curCurrencyId: number;

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this._curCurrencyId = CfgID.ItemID.Hupa_Item1;
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            EventMgr.on(EventNotify.PlayerItemNumChange, this, this.onItemNumChange);
            EventMgr.on(CmdEvent.Activity_Data, this, this.refreshUI);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
            EventMgr.off(EventNotify.PlayerItemNumChange, this, this.onItemNumChange);
            EventMgr.off(CmdEvent.Activity_Data, this, this.refreshUI);
        }

        dispose()
        {

        }

        public setData($data: any): void
        {

        }

        public show()
        {
            this.refreshUI();
        }

        public hide()
        {
        }


        /** 刷新面板(UI每次重新从队列中弹出)*/
        public refreshUI(): void
        {
            var actId = ActivityDataMgr.getFirstValidActivityIdByType(Pb_God._emActivityType.Activity_ExchangeEx);
            if (actId != -1)
            {
                let shopCfgInfo: cfg.ActivityExchangeExCfgInfo[] = cfg.ActivityExchangeExCfgData.getListByActId(actId);
                this.listItems.onRefresh(shopCfgInfo.length, this, this.onRefreshActivityExChangeItem)
            } else
            {
                logE(" 未找到活动")
            }
            this.refreshCurrency();
        }



        /** 刷新已有货币资产类型 */
        private refreshCurrency()
        {
            this.txtCurrencyCount.text = Global.numberToTuckString(Global.getItemNum(this._curCurrencyId));;

            //道具ID转换成小图标资源
            Global.setResSmallIconWithItemID(this.imgCurrency, this._curCurrencyId);
        }


        private onRefreshActivityExChangeItem(item: HuPaExChangeItem, index: number)
        {
            var actId: number = ActivityDataMgr.getFirstValidActivityIdByType(Pb_God._emActivityType.Activity_ExchangeEx);
            if (actId != -1)
            {
                let shopCfgInfo: cfg.ActivityExchangeExCfgInfo[] = cfg.ActivityExchangeExCfgData.getListByActId(actId);
                item.setItemByFixShopCfg(shopCfgInfo[index]);
            }
        }


        /** 刷新道具数量 */
        private onItemNumChange(fID: number, tempNewNum: number): void
        {
            if (fID == this._curCurrencyId)
            {
                this.txtCurrencyCount.text = Global.numberToTuckString(tempNewNum);
            }
        }


    }
}