module Pro
{
    /**
    * 带加、减、max按钮的滑动条。
    * @author jason.xu
    */
    export class HsliderScrollBar extends ProUI.Utils.HSliderScrollBarUI
    {
        private _max: number = 1;
        private _value: number = -1;

        protected _changeHandler: Laya.Handler;

        /** 滑块滑动范围 */
        private _rollRectangle: Laya.Rectangle;

        /** 拖拽中， UIButton的拖拽没有实时回调，暂自写一个 */
        private _isDraging: boolean = false;

        constructor()
        {
            super();
            this.once(Laya.Event.ADDED, this, this.onAddedCalled);
        }

        private onAddedCalled(event: any): void
        {
            this.addEvents();
            this.initViewData();
        }

        public hideMaxBtn(isHide: boolean = true): void
        {
            this.btnMax.visible = !isHide;
        }

        public setChangeListener(caller: any, callback: Function): void
        {
            this._changeHandler = Laya.Handler.create(caller, callback, null, false);
        }

        private addEvents(): void
        {
            this.btnLeft.onClick(this, this.onClickLeft);
            this.btnRight.onClick(this, this.onClickRight);
            this.btnMax.onClick(this, this.onClickMax);

            this.btnRoll.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDownRollBtn);
            // this.btnRoll.onClick(this, this.onClickRoll, true);
        }

        private initViewData(): void
        {
            let rollLimitLeft = this.imgBg.x + this.btnRoll.width * this.btnRoll.anchorX;
            let rollLimitRight = this.width - this.imgBg.right - this.btnRoll.width * (1 - this.btnRoll.anchorX);
            this._rollRectangle = new Laya.Rectangle(rollLimitLeft, this.btnRoll.y, rollLimitRight - rollLimitLeft, 0);
        }

        private onClickLeft()
        {
            this.value--;
        }

        private onClickRight()
        {
            this.value++;
        }

        private onClickMax()
        {
            this.value = this.max;
        }


        private onMouseDownRollBtn(): void
        {
            this._isDraging = true;
            this.btnRoll.on(Laya.Event.DRAG_END, this, this.onDragEndRollBtn);
            this.btnRoll.on(Laya.Event.DRAG_MOVE, this, this.onDragMove)

            this.btnRoll.startDrag(this._rollRectangle);
        }

        private onDragEndRollBtn(): void
        {
            this.btnRoll.off(Laya.Event.DRAG_END, this, this.onDragEndRollBtn);
            this._isDraging = false;
            this.btnRoll.stopDrag();
        }

        private onDragMove(): void
        {
            //根据滑块的位置 ，换算出进度位置
            let progress = (this.btnRoll.x - this._rollRectangle.x) / this._rollRectangle.width;
            this.value = Math.floor(this.max * progress + 0.5); //四舍五入
            //进度条始终跟随滑块走
            this.imgProgress.width = this.btnRoll.x - this._rollRectangle.x + this.btnRoll.width * 0.5;
        }

        public get max(): number
        {
            return this._max;
        }
        public set max(value: number)
        {
            if (this._max == value) return;
            this._max = value;
            // this.btnRoll.disabled = this._max <= 0;
            Laya.timer.callLater(this, this.refreshView);
        }

        public get value(): number
        {
            return this._value;
        }
        public set value(value: number)
        {
            if (value > this._max) value = this._max;
            if (value < 0) value = 0;
            if (this._value == value) return;
            this._value = value;
            Laya.timer.callLater(this, this.refreshView);
            if (this._changeHandler) this._changeHandler.runWith(this.value);
        }

        /** 刷新当前视图 */
        private refreshView()
        {
            let progress: number = (this.max <= 0) ? 0 : (this.value / this.max);
            if (!this._isDraging)
            {
                let barWidth = progress * this._rollRectangle.width;
                this.btnRoll.x = this._rollRectangle.x + barWidth;
                // this.imgProgress.width = this._progressBarOriginWidth * progress;
                this.imgProgress.width = barWidth + this.btnRoll.width * 0.5;
            }
        }
    }
}