module Pro
{
    export class NativeCommonSystem extends NativeBaseSystem
    {
        private static sInstance: NativeCommonSystem = null;
        public static get Inst(): NativeCommonSystem
        {
            if (NativeCommonSystem.sInstance == null)
            {
                NativeCommonSystem.sInstance = new NativeCommonSystem();
            }
            return NativeCommonSystem.sInstance;
        }

        private lastTime: number = 0;
        private callDict: { [key: string]: Function } = {};

        /**
         * 唯一标识
         */
        public getTag(): string
        {
            return "NativeCommonSystem";
        }

        // NAME(0),
        // TRY_GET_INFO(1),
        // APP_FRONT(2),
        // APP_BACKEND(3),
        // APP_NOTCH(4),
        /**
         * Native层返回的信息
         * @param eventID  //参考打包工程目录下的JsCommand.java
         * @param json
         */
        protected onMessage(eventID: number, json: {})
        {
            switch (eventID)
            {
                case 0:
                    let name = json["name"];
                    if (this.callDict[name])
                    {
                        this.callDict[name]();
                        delete this.callDict[name];
                    }
                    break;
                case 1:
                    if (this.callDict["tryGetInfo"])
                    {
                        this.callDict["tryGetInfo"](json);
                        delete this.callDict["tryGetInfo"];
                    }
                    break;
                case 2://切换到前景
                    logI("切换到前景:" + Public.TimeMgr.Inst.currTimer);

                    Laya.SoundManager.soundMuted = false;
                    break;
                case 3://切换到背景
                    logI("切换到背景:" + Public.TimeMgr.Inst.currTimer);
                    Laya.SoundManager.soundMuted = true;

                    break;

                case 4://检测是否有刘海屏的数据
                    break;
                case 5://获取平台配置
                    logI("h5配置 config.json", json)
                    break;
                case 6://内存警告
                    logI("memory not enough");
                    break;
                default:

                    break;
            }
        }

        /**
         * 播放视频
         * @param name
         * @param finsih
         */
        public playVideo(name: string, finsih: Function)
        {
            if (!ThirdMgr.isLogin)
            {
                finsih();
                return;
            }
            if (Date.now() - this.lastTime < 2000)
            {
                this.lastTime = Date.now();
                return;
            }
            this.callDict[name] = finsih;
            this.sendNative(CommonMsgValue.PLAY_VIDEO, { "name": name });
        }

        /**
         * 获取底层数据
         * @param finsih
         */
        public tryGetInfo(finsih: Function)
        {
            this.callDict["tryGetInfo"] = finsih;
            this.sendNative(CommonMsgValue.TRY_GET_INFO, {});
        }
    }
}