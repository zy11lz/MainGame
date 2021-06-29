module Pro
{
    /**
    * 进度条上的宝箱
    * 有三种形态  未激活  可开启  已开启
    * 用途：比如竞技场的周宝箱，任务活跃进度宝箱等
    * @author jason.xu
    */
    export class ProgressChestItemUI extends ProUI.Utils.ProgressChestItemUI
    {

        public bindData: any;
        public index: number;

        private _typeIndex: number;

        private _clickCaller: any;
        private _clickListener: Function;

        /** 宝箱是否正在播放效果 */
        private _isPlayEff = false;
        private _btnEffectNode: EffNode;

        constructor()
        {
            super();
            this.once(Laya.Event.ADDED, this, this.onAddedCalled);
            this.bubbleRoot.visible = false;
            this.bubbleNum.visible = false;
        }

        private onAddedCalled(event: any): void
        {
            this.addEvents();
        }

        private addEvents(): void
        {
            this.on(Laya.Event.UNDISPLAY, this, () =>
            {
                this.playCanGetEffect(false);
            });
            this.btn.onClick(this, () =>
            {
                if (this._clickListener != null)
                {
                    this._clickListener.apply(this._clickCaller, [this]);
                }
            })
        }

        /** 注册点击回调 */
        public onClick(caller: any = null, listener: Function = null)
        {
            this._clickCaller = caller;
            this._clickListener = listener;
        }

        /** 宝箱显示类型索引 */
        public setBoxTypeIndex(index: number): void
        {
            this._typeIndex = index;
        }

        /** 设置文字内容 */
        public setText(value: string | number, textColor: string = null, textStokeColor: string = null): void
        {
            this.NumLb.text = value + "";
            if (textColor) { this.NumLb.color = textColor; }
            if (textStokeColor)
            {
                this.NumLb.strokeColor = textStokeColor;
                this.NumLb.stroke = 2;
            } else
            {
                this.NumLb.stroke = 0;
            }
        }

        /** 设置开启状态 */
        public setOpenState(isActive: boolean, isGet: boolean): void
        {
            if (!isActive) { this.setState(0); }
            else if (!isGet) { this.setState(1); }
            else { this.setState(2); }
        }

        /** 设置当前状态 0-未激活 1-可以开启  2-已开启 */
        private setState(state: number): void
        {
            //if (this._state == state) return;
            this.icon.frame = this._typeIndex * 2 + (state == 2 ? 2 : 1);
            //Public.EffectUtils.clearYoyoTween(this.icon);
            // this.playCanGetEffect(state == 1);

            if (state == 1)
            {
                EffectAni.Inst.addAwardBoxAni(this.icon);
                Public.EffectUtils.shakeAndStop(this.icon);

            } else
            {
                EffectAni.Inst.removeAwardBoxAni(this.icon);
                Public.EffectUtils.clearShakeAndStop(this.icon);
            }
        }

        /** 宝箱可领奖时，播放跳动的效果 */
        private playCanGetEffect(isPlay: boolean): void
        {
            if (isPlay == this._isPlayEff)
            {
                return;
            }
            this._isPlayEff = isPlay;
            //this.icon.scaleY = 1;
            //this.icon.y = 59;
            this.icon.visible = !isPlay;
            if (isPlay)
            { //播放动画效果， 如果有其它效果，往这加。
                let tmpEffPos = new Laya.Point(this.icon.x - 9, this.icon.y + 8);
                this._btnEffectNode = EffectMgr.Inst.createLoopEffect("ui_giftBox_" + (this._typeIndex + 1), tmpEffPos, -1, 1, 1, this.btn, ResReleaseType.Reference);
            }
            else
            {
                //Public.EffectUtils.clearYoyoTween(this.icon);
                EffectMgr.Inst.releaseEffect(this._btnEffectNode);
                this._btnEffectNode = null;
            }
        }

        /**
         * 显示冒泡
         */
        public showBubble(skin:string, num:number){
            this.bubbleRoot.visible = true;
            this.bubbleItem.skin = skin;
            this.bubbleNum.text = num.toString();
        }

        /**
         * 显示冒泡
         */
        public hideBubble(){
            this.bubbleRoot.visible = false;
        }

    }
}