module Pro
{
    /**
    * 滑动单选按钮（带勾选框与文字后缀）
    * @author jason.xu
    */
    export class SlideButton extends ProUI.Utils.SlideButtonUI
    {

        private _changeHandler: Laya.Handler;

        /** 显示文字 */
        private _text1: string;
        private _text2: string;

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
            let selX = this.width - this.sel.width
            if (this.isSelected)
            {
                Laya.Tween.to(this.sel, { x: selX }, 200);
                Laya.Tween.to(this.selBg, { scalX: 1 }, 200, null, Laya.Handler.create(this, () =>
                { this.selBg.visible = true; }));

            } else
            {
                Laya.Tween.to(this.sel, { x: 0 }, 200);
                Laya.Tween.to(this.selBg, { scalX: 0.3 }, 200, null, Laya.Handler.create(this, () =>
                { this.selBg.visible = false; }));
            }
            this.setText();
            if (this._changeHandler) this._changeHandler.runWith(this);
        }

        /**
         * 设置是否选中，不回调函数
         * @param value
         */
        public setSelect(value): void
        {
            let state = value ? 1 : 0;
            if (state == this._selectState) return;
            this._selectState = state;
            let selX = this.width - this.sel.width
            this.sel.x = this.isSelected ? selX : 0;
            this.selBg.visible = this.isSelected ? true : false;
            this.setText();
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

        /**获取文字内容 */
        public getText(value1: string, value2: string, textColor: string = "#5d565d"): void
        {
            this._text1 = value1;
            this._text2 = value2;

        }

        /** 设置文字内容 */
        public setText(textColor: string = "#5d565d"): void
        {
            this.label.text = this.isSelected ? Global.getLangStr(this._text1) : Global.getLangStr(this._text2);
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