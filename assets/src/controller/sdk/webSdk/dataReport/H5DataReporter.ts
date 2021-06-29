/* eslint-disable no-console */
module Pro
{
    class H5EnvironmentConf
    {
        public url: string;
        public key: string;

        constructor(url: string, key: string)
        {
            this.url = url;
            this.key = key;
        }
    }

    export class H5Environment
    {

        public static officialKey: string = "cb03de5" + "2469c4c81" + "ba911ce1" + "7873c659";
        public static testKey: string = "12345678";
        static GUO_LEI: H5EnvironmentConf = new H5EnvironmentConf("https://appdata.kairong5.com", H5Environment.officialKey);           //1、国内：
        static NEI_WANG: H5EnvironmentConf = new H5EnvironmentConf("http://appdata.4g.q1.com:800", H5Environment.testKey);    //2、内网：

    }

    class H5Api
    {
        public static startApi: string = "/api/AppLog/AddAppStartLog";
        public static eventApi: string = "/api/AppLog/AddAppLoginLog";
    }
    export class H5EventType
    {
        //注释掉的为服务器接口有，而客户端不能上报的事件
        public static ON_CREATE = "onCreate";//应用启动
        // public static OPEN_SDK = "openSdk";//打开SDK
        // public static ON_RESUME = "onResume";//应用进入前台
        // public static ON_PAUSE = "onPause";//应用进入后台
        // public static UPDATE_BEGIN = "updateBegin";//更新开始
        // public static UPDATE_ERROR = "updateError";//更新失败
        // public static UPDATE_END = "updateEnd";//更新结束
        public static SDK_LOGIN = "sdkLogin";//sdk客户端登录成功，返回session
        public static SDK_LOGIN_ERROR = "sdkLoginError";//
        public static USER_LOGIN = "userLogin";//服务端校验session成功
        public static USER_LOGIN_ERROR = "userLoginError";//服务端校验session失败
        public static SELECT_SERVER = "selectServer";//选择服务器
        public static CREATE = "create";//创建角色
        public static LOGIN = "login";//角色登录
        public static LOGIN_ERROR = "loginError";//角色登录失败
        public static UPGRADE = "upgrade";//角色升级
        public static PAY_BEGIN = "payBegin";//下单
        public static PAY_CANCEL = "payCancel";
        // public static PAY_ORDER_OK = "payOrderOk";//平台下单成功
        public static PAY_ERROR = "payError";//
        public static PAY_END = "payEnd";//购买成功
        // public static PAY_CHECK_OK = "payCheckOK";//支付校验
        public static ONLINE_TIME = "onlineTime";//应用和角色在线时长
    }
    export class H5DataReporter
    {
        public env: H5EnvironmentConf = H5Environment.NEI_WANG;
        // headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
        // headers.append('Access-Control-Allow-Credentials', 'true');
        // Access-Control-Allow-Methods : GET, POST, OPTIONS
        // Access-Control-Allow-Headers : Origin, Content-Type, Accept
        private header = [
            "Content-Type", "application/json",
            "Accept", "application/json"
        ];
        // "Access-Control-Allow-Methods", "*",
        // "Access-Control-Allow-Headers", "*"
        private platUserId: string;
        private appStartTime: number = 0;
        private appLoginTime: number = 0;
        constructor()
        {
            if (GlobalData.isRelease)
            {
                this.env = H5Environment.GUO_LEI;
            }
            this.appStartTime = TimeController.currTimerSecond;
        }
        public getStartApi(): string
        {
            return this.env.url + H5Api.startApi;
        }

        public getEventApi(): string
        {
            return this.env.url + H5Api.eventApi;
        }
        public setupOnLogin(userId: string)
        {
            this.platUserId = userId;
            this.appLoginTime = TimeController.currTimerSecond;
        }
        /**
         * 启动api
         */
        public h5start(): void
        {
            let PID = PlatformData.pid
            let APPID = PID.toString().substring(0, 4);
            let OS = this.getOS();
            let MOD = "";
            let VER = "";
            let MAC = "";
            let UUID = GlobalData.getUuid();
            let RADID = "";
            let RSID = "";
            let appkey = this.env.key;
            let StartTime: number = (new Date().getTime() * 0.001) << 0;
            let sign: string = hex_md5(`${ PID }_${ APPID }_${ OS }_${ MOD }_${ VER }_${ MAC }_${ UUID }_${ RADID }_${ RSID }_${ StartTime }_${ appkey }`)
            let eventType = H5EventType.ON_CREATE;
            let extInfo = {};
            extInfo["sdkver"] = "";
            if (SystemUtils.isIos())
            {
                extInfo["startNum"] = 0;
            }
            else
            {
                extInfo["_androidid"] = "";
            }
            let data = {
                APPID: APPID,
                OS: OS,
                MOD: MOD,
                VER: VER,
                MAC: MAC,
                UUID: UUID,
                RADID: RADID,
                RSID: RSID,
                StartTime: StartTime,
                PID: PID,
                Sign: sign,
                Action: eventType,
                ActorID: 0,
                ExtInfo: JSON.stringify(extInfo)
            }
                ;
            this.post(this.getStartApi(), data, eventType);
            this.startTimer4UploadOnlineTime();
        }

        private getOS(): string
        {
            if (SystemUtils.isIos())
            {
                return "ios";
            } else
            {
                return "android";
            }
        }

        public h5event(eventType: string, params = {}, extInfo: object = {})
        {
            let PID = PlatformData.pid
            let APPID = PID.toString().substring(0, 4);
            let ServerID: number = params["serverId"] || PlayerDataMgr.logicworldid;
            let ActorName: string = params["roleName"] || PlayerDataMgr.name;
            let ActorID: number = params["roleId"] || PlayerDataMgr.uid;
            let ActorLevel: number = params["roleLevel"] || PlayerDataMgr.level;
            let User: string = `${ PlayerDataMgr.accountid }.${ PID }`;

            let MAC = "";
            let UUID = GlobalData.getUuid();
            let RADID = "";
            let RSID = "";
            let appkey = this.env.key;
            let LoginTime: number = TimeController.currTimerSecond;
            let sign: string = hex_md5(`${ APPID }_${ MAC }_${ UUID }_${ RADID }_${ RSID }_${ LoginTime }_${ ServerID }_${ appkey }`)

            extInfo["sdkver"] = "";
            if (SystemUtils.isIos())
            {
                extInfo["_idfa"] = 0;
            }
            else
            {
                extInfo["isSimulator"] = false;
                extInfo["_androidid"] = "";
                extInfo["userId"] = User;
            }
            let extInfoStr = JSON.stringify(extInfo);

            let data = {
                APPID: APPID,
                ServerID: ServerID,
                ActorName: ActorName,
                ActorID: ActorID,
                ActorLevel: ActorLevel,
                User: User,
                PID: PID,
                IP: "",
                MAC: MAC,
                UUID: UUID,
                RADID: RADID,
                RSID: RSID,
                LoginTime: LoginTime,
                Sign: sign,
                Action: eventType,
                ExtInfo: extInfoStr
            };
            this.post(this.getEventApi(), data, eventType);
        }

        private post(url: string, data: Object, eventType: string)
        {
            let dataStr = JSON.stringify(data);
            new Public.HttpManager.Http().setHeader(this.header).setResponseType(Laya.Loader.JSON).postRequest(url, this, (statue, retData) =>
            {
                if (statue != 0)
                {
                    logE(`H5DataReporter error! eventType:${ eventType } `);
                    return;
                }
                logD(`H5DataReporter success! eventType:${ eventType } ret:${ JSON.stringify(retData) }`)

            }, dataStr);
        }

        private startTimer4UploadOnlineTime()
        {
            Laya.timer.loop(5 * 60 * 1000, this, this.uploadOnlineTime)
        }
        private uploadOnlineTime()
        {

            let AppOnline: number = TimeController.currTimerSecond - this.appStartTime;
            let GameOnline: number = TimeController.currTimerSecond - this.appLoginTime;
            logI(`AppOnline:${ AppOnline } GameOnline:${ GameOnline }`);
            this.h5event(H5EventType.ONLINE_TIME, {}, {
                AppOnline: AppOnline,
                GameOnline: GameOnline
            })
        }
    }
}

