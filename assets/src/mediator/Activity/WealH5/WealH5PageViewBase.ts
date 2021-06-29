module Pro
{
    /**
     * H5接入福利领奖分页的基类，比如分享、下载微端等。
     * @author jason.xu
     */
    export class WealH5PageViewBase extends ProUI.ActivityMain.H5Weal.CommonViewUI implements ITableView
    {

        /** 对应的类型 */
        protected _type: Pb_God._emCommonPrizeType;

        /** 当前状态 （0-未处理 1-已处理待领奖 2-已领奖） */
        private _state: number = -1;

        constructor(args: number)
        {
            super();
            this._type = args;
            this.resetPrizeReadyState();
        }

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.frameBanner.frame = this._type;
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public addEvent(): void
        {
            this.btnGo.onClick(this, this.onClickGo);
            EventMgr.on(EventNotify.CommonPrizeState_Change, this, this.onChangePrizeState);
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public removeEvent(): void
        {
            EventMgr.off(EventNotify.CommonPrizeState_Change, this, this.onChangePrizeState);
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
            let cfgInfo = cfg.PrizeCommonPrizeCfgData.getInfo(this._type);
            this.txtDesc.text = cfgInfo.desc;
            let addItems = cfg.AddItemInfo.getAddItemAttr(cfgInfo, cfgInfo.addItem, "$addItemInfoArr");
            this.listItems.onRefresh(addItems.length, this, (itemUI: NorItemUI, index) =>
            {
                itemUI.setItemInfo(addItems[index]);
            });

            this.refreshStateView();
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
        }

        public setData($data: any): void
        {
        }

        /** 点击按钮回调 */
        private onClickGo(): void
        {
            if (this._state == 1)
            {
                //待领奖状态
                CommonSend.prize(this._type);
            } else
            {
                this.executeSdkCall();
            }
        }

        private onChangePrizeState(type: number): void
        {
            if (this._type != type) return;
            this.refreshStateView();
        }

        /** 刷新领奖状态 */
        private refreshStateView(): void
        {
            //0-未操作  1-已操作待领奖  2-已领奖
            let state = CommonDataMgr.getCommonPrizeState(this._type);
            if (this._state == state) return;
            this._state = state;
            this.imgGet.visible = state == 2;
            this.btnGo.visible = state != 2 || this.isLasting();
            if (this.btnGo.visible)
            {
                if (state == 1) this.txtBtnLabel.text = Global.getLangStr("common_prize2");
                else this.txtBtnLabel.text = cfg.PrizeCommonPrizeCfgData.getNameByID(this._type);
            }
        }

        /** 按钮是否常驻显示（领完奖励后，按钮显示还原成初始可操作的状态， 比如下载微端，领完奖励后，仍可继续下载） 
         * 默认为false, 子类可重写
        */
        protected isLasting(): boolean
        {
            return false;
        }


        /** 重置奖励准备状态， 部分可通过入口参数来判断是否可以领奖的         */
        protected resetPrizeReadyState(): void
        {

        }

        /** 拉起SDK操作(子类重写此方法，执行相应的操作) */
        protected executeSdkCall(): void
        {

        }

        /** 页签组件销毁 */
        public dispose(): void
        {

        }

    }
}