/* eslint-disable no-console */
/*
* name;
*/
module Pro
{
    export class NativeBaseSystem
    {

        constructor()
        {
            if (!GameConfig.isInWxGame() && NativeBridge != null)
            {
                NativeBridge.ins.listen(this.getTag(), this.onMessage.bind(this));
            }
            if (window.KaiRongSdk != null)
            {
                KaiRongSdk.addCallBack(this.onMessage.bind(this));
            }
        }

        /**
         * 唯一标识
         */
        public getTag(): string
        {
            return 'NativeBaseSystem';
        }

        /**
         * Native层返回的信息
         * @param eventID
         * @param json
         */
        protected onMessage(eventID: number, json: {})
        {
        }

        /**
         * 给底层发送消息
         * @param eventID
         * @param json
         */
        public sendNative(eventID: number, json: {} = null)
        {
            if (!GameConfig.isInWxGame() && NativeBridge != null)
            {
                NativeBridge.ins.sendNativeEx(this.getTag(), eventID, json);
            }
        }
    }
}