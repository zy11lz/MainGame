module Pro
{
    /**
    * 
    * 道具全价购买弹窗
    * 注： 此购买途径并非走商城模块，而是从道具自身配置，直接使用钻石购买
    *
    * @author jason.xu
    * 
    */
    export class ShopFullPriceBuyMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Shop.FullPriceBuyUI;


        private _count: number = -1;
        private _maxCount: number;
        private _price: number;
        private _hasDiamond: number;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Shop.FullPriceBuyUI, 1, BaseAddLayer.TopUI, true);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.closePanel();
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

        /** 本类界面打开状态下监听消息列表 */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);

            this.UIPanel.btnBuy.onClick(this, this.onClickBuy);
            this.UIPanel.btnLeft.onClick(this, () => { this.resetBuyCount(this._count - 1) });
            this.UIPanel.btnRight.onClick(this, () => { this.resetBuyCount(this._count + 1) });
        }

        /** 本类界面打开状态下监听消息列表 */
        public removeEvent(): void
        {

        }

        //确定购买
        onClickBuy(): void
        {
            let itemId = this.UIOpenData.customObject;
            if (this._count <= 0) return;
            ItemSend.fullBuy(itemId, this._count as any);
            this.closeUI();
        }

        /** 模块的刷新方法, 在模块每次被呼出的时候自动调用,  用来同步刷新数据和显示*/
        public refreshUI()
        {
            let itemId: number = this.UIOpenData.customObject;
            let itemCfg = cfg.ItemCfgData.getInfo(itemId);
            this._price = itemCfg.buyNeedDiamond;
            this._hasDiamond = Global.getItemNum(Pb_God._emExpendType.ExpendType_Diamond);
            this._maxCount = Math.floor(this._hasDiamond / this._price);

            this.UIPanel.norItemView.setItemID(itemId, 1, false, false, false, false, false);
            this.UIPanel.txtName.text = cfg.ItemCfgData.getNameById(itemId);

            this.resetBuyCount(1);
        }

        private resetBuyCount(count: number)
        {
            if (count < 0) count = 0;
            if (count > this._maxCount) count = this._maxCount;
            if (this._count == count) return;
            this._count = count;
            this.UIPanel.txtBuyCount.text = count + "";
            let buyNeedDiamond = this._price * count;
            this.UIPanel.txtDiamon.text = Global.numberToTuckString(this._hasDiamond) + " / " + buyNeedDiamond;
        }

    }
}