module Pro
{
    export class SystemUtils
    {

        public static initTextOffset()
        {
            if (SystemUtils.isIos())
            {
                UiSetting.textOffsetY = -2;
                UiSetting.htmlTextOffsetY = 0;
            }
        }


        public static validateCallLater()
        {
            Laya.CallLater.prototype['_update'] = function ()
            {

                let laters = this._laters;
                let len = laters.length;
                if (len > 0)
                {
                    for (let i = 0, n = len - 1; i <= n; i++)
                    {
                        let handler = laters[i];

                        if (handler.method !== null)
                        {
                            handler.run();
                            handler.clear();
                        }
                        this._map[handler.key] = null;
                        this._pool.push(handler);
                        i === n && (n = laters.length - 1);
                    }
                    laters.length = 0;
                }
            }
        }


        public static isIos(): boolean
        {
            var conchConfig = window["conchConfig"];
            if (conchConfig)
            {
                let os = conchConfig.getOS();
                if (os == "Conch-ios")
                {
                    return true;
                }
            } else
            {
                var isiOS = false;
                /* 判断android与ios*/
                if (window && window.navigator)
                {
                    var u = navigator.userAgent;
                    // var app = navigator.appVersion;
                    // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
                    isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                }
                return isiOS;
            }
            return false;
        }

        public static isWeb(): boolean
        {
            return GameConfig.isInWebview || conch == null;
        }
    }

}
