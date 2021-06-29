module Pro
{
    /**
    * 单选按钮（带勾选框与文字后缀）
    * @author jason.xu
    */
    export class CheckButton extends ProUI.Utils.CheckButtonUI
    {

        private _changeHandler: Laya.Handler;

        /** 当前勾选状态 */
        private _selectState = -1;
        /** 当前是否选中 */
        public get isSelected(): boolean
        {
            return this._selectState == 1;
        }
        public set isSelected(value: boolean)
        {
            let state = value ? 1 : 0;
            if (state == this._selectState) return;
            this._selectState = state;
            this.sel.visible = this.isSelected;
            if (this._changeHandler) this._changeHandler.runWith(this);
        }

        /**
         * 设置是否选中，不回调函数
         * @param value
         */
        public setSelect(value):void
        {
            let state = value ? 1 : 0;
            if (state == this._selectState) return;
            this._selectState = state;
            this.sel.visible = this.isSelected;
        }

        constructor()
        {
            super();
            this.once(Laya.Event.ADDED, this, this.onAddedCalled);
        }

        private onAddedCalled(event: any): void
        {
            this.addEvents();
        }

        private addEvents(): void
        {

        }

        /** 设置文字内容 */
        public setText(value: string, textColor: string = "#5d565d"): void
        {
            this.label.text = value;
            this.label.color = textColor;
            this.btn.width = this.label.x + this.label.width;
        }

        /** 设置选中回调（注：设置后会覆盖掉按扭的click的外部回调） */
        public onSelectChange(caller: any, listener: Function): void
        {
            if (this._changeHandler) this._changeHandler.recover();
            this._changeHandler = Laya.Handler.create(caller, listener, null, false);
            this.setClickSelect();
        }

        /** 设置点击更新选中状态（注：设置后会覆盖掉按扭的click的外部回调） */
        public setClickSelect(): void
        {
            this.btn.onClick(this, () =>
            {
                this.isSelected = !this.isSelected;
            })
        }

    }
}