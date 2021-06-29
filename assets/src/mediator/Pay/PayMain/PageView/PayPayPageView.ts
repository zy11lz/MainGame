module Pro
{
    /**
    * 充值：充值分页
    * @author jason.xu
    */
    export class PayPayPageView extends ProUI.Pay.PageView.PayViewUI implements ITableView
    {

        /** 购买的类型 */
        private _chargeType = Pb_God._emChargeType.ChargeType_Cash;

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            // //将列表固定背景放到滚动控制里面
            // this.turnbg.removeSelf();
            // this.listView.content.addChildAt(this.turnbg, 0);
            // this.turnbg.y = 0;
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public addEvent(): void
        {
            this.vipChildView.addEvent();
            // 更新充值信息 PBChargeInfo
            EventMgr.on(CmdEvent.Platform_update_chargeinfo, this, this.onUpdate_chargeinfo);
            EventMgr.on(CmdEvent.Platform_SynCharge, this, this.onUpdate_chargeinfo);
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public removeEvent(): void
        {
            this.vipChildView.removeEvent();
            EventMgr.off(CmdEvent.Platform_update_chargeinfo, this, this.onUpdate_chargeinfo);
            EventMgr.off(CmdEvent.Platform_SynCharge, this, this.onUpdate_chargeinfo);
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
            this.vipChildView.show();
            this.refreshView();
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
            this.vipChildView.hide();
        }


        public setData($data: any): void
        {

        }

        protected onUpdate_chargeinfo(): void
        {
            this.refreshView();
        }

        /** 刷新视图显示 */
        private refreshView(): void
        {
            let list = PlatformDataMgr.getValidChargeListByType(this._chargeType);
            this.listView.onRefreshWithArray(list, this, this.onRefreshItem);
            // for(var i=0; i<3 ; i++){
            //     let img = this.turnbg.getChildAt(i) as Laya.Image;
            //     img.visible = list.length > i * 3;
            // }
        }

        private onRefreshItem(tempUI: ProUI.Pay.PageView.PayViewItemUI, index: number): void
        {
            let itemData: cfg.ChargeCfgInfo = this.listView.getItem(index);
            //本档是否为首次充值
            let isFirst = !PlatformDataMgr.getChargeInfoByCfgInfo(itemData);
            tempUI.firstBox.visible = isFirst;
            let extraAddItem = isFirst ? cfg.ChargeCfgData.getFirstAddItemAryByID(itemData.iD)[0] : cfg.ChargeCfgData.getExtraAddItemAryByID(itemData.iD)[0];
            if (extraAddItem) tempUI.txtExtra.text = extraAddItem.itemcount + "";
            tempUI.extraBox.visible = !!extraAddItem;
            tempUI.hboxExtra.refresh();
            tempUI.txtDiamon.text = cfg.ChargeCfgData.getAddItemAryByID(itemData.iD)[0].itemcount + "";
            tempUI.txtPirce.text = "￥" + (itemData.needMoney / 100);

            Laya.Event.DRAG_MOVE

            tempUI.icon.frame = index + 1;

            tempUI.btn.canMoveDistance = 30;
            tempUI.btn.onClick(this, () =>
            {
                PlatformDataMgr.onChargeRequest(itemData);
            });
        }

        /** 页签组件销毁 */
        public dispose(): void
        {
        }
    }
}