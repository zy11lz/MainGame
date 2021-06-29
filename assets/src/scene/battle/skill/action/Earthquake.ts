/*
* name;
*/
module Pro
{
    export class Earthquake
    {
        /* 
        * 方向 
         */
        public static LEFT_RIGHT_UP_DOWN: number = 0;
        public static LEFT_RIGHT: number = 1;
        public static UP_DOWN: number = 2;

        /** 
        * 参数 
        */
        private _displayObject: Sprite;
        private _originalX: number;
        private _originalY: number;
        private _intensity: number;
        private _intensityOffset: number;
        /**  时间    */
        private _seconds: number;
        /**  方向     */
        private _direction: number;
        /**  震动中  */
        private _bShaking: boolean = false;
        /**   是否自动销毁     */
        private _bDestroy: boolean = false;

        /** 
         * 对一个显示对象应用地震效果。 
         * @param  displayObject 抖动对象 
         * @param  intensity 强度 
         * @param  seconds 持续时间 秒 
         * @param  direction 方向 
         * @param  autoDestroy 自动销毁 
         */
        constructor(displayObject: Sprite, intensity: number = 10, seconds: number = 100, direction: number = 0, autoDestroy: boolean = false) 
        {
            this._displayObject = displayObject;
            this._originalX = displayObject.x;
            this._originalY = displayObject.y;
            this._intensity = intensity;
            this._intensityOffset = intensity / 2;
            this._seconds = seconds;
            this._direction = direction;
            this._bDestroy = autoDestroy;
        }

        updateIntensity(value: number)
        {
           this._intensity = value;
        }
        
        /** 
         * 开始后抖动 
         */
        public go(): void 
        {
            if (this._bShaking) return;
            this._bShaking = true;
            Laya.timer.frameLoop(1, this, this.quake);
            Laya.timer.once(this._seconds, this, this.resetImage);
            this._displayObject.x = this._originalX;
            this._displayObject.y = this._originalY;
        }

        /** 
         * 抖动 
         * @param   event 
         */
        private quake(): void 
        {
            var newX: number = this._originalX;
            var newY: number = this._originalY;

            switch (this._direction) 
            {
                case Earthquake.LEFT_RIGHT_UP_DOWN:
                    newX = this._originalX + Math.random() * this._intensity - this._intensityOffset;
                    newY = this._originalY + Math.random() * this._intensity - this._intensityOffset;
                    break;
                case Earthquake.LEFT_RIGHT:
                    newX = this._originalX + Math.random() * this._intensity - this._intensityOffset;
                    break;
                case Earthquake.UP_DOWN:
                    newY = this._originalY + Math.random() * this._intensity - this._intensityOffset;
                    break;
            }
            this._displayObject.x = newX;
            this._displayObject.y = newY;
        }
        /** 
         * 重置 
         * @param   event 
         */
        private resetImage(): void 
        {
            this._displayObject.x = this._originalX;
            this._displayObject.y = this._originalY;
            this.cleanup();
        }

        /** 
         * 清除 
         */
        private cleanup(): void 
        {
            Laya.timer.clear(this, this.quake);
            Laya.timer.clear(this, this.resetImage);
            this._bShaking = false;
        }
    }
}