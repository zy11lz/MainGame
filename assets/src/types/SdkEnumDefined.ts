module Pro
{
    // 0=创角，1=登录，2=升级 , 3=选服, 4=退出
    export enum UploadSceneValue
    {
        CREATE_ROLE = 0,
        LOGIN_SUCCESS = 1,
        UPLEVEL = 2,
        SELECT_SERVER = 3,
        LOGOUT = 4,

    }

    export class CustomEventType
    {
        public name: string;
        constructor(name:string)
        {
            this.name = name;
        }
        public static GAME_LOAD_START: CustomEventType = new CustomEventType("game_load_start");//这个事件，在原生层上报
        public static GAME_LOAD_END: CustomEventType = new CustomEventType("game_load_end");
        public static GAME_START: CustomEventType = new CustomEventType("game_start");
    }

    export enum CommonMsgValue
    {
        PLAY_VIDEO = 0,
        TRY_GET_INFO = 1,
        GET_CONFIG = 5,

    }

    //SDKDef.java UserEvent
    export enum PlatformMsgValue
    {
        LOGIN = 0,            // 登录
        LOGOUT = 1,           // 登出
        OTHER_LOGIN = 2,      // 第三方登录
        ACCOUNT = 3,          // 请求绑定帐号
        INFO = 4,             // 信息
        REAL_NAME = 5,        // 实名验证
        PAY = 6,             // 支付
        HTTP_GET = 7,        // get请求
        HTTP_POST = 8,       // post请求
        TRACK = 9,         // 埋点
        IOS_SHOW_LOG = 10,  //看起来它是显示日志，实际上他是显示一个网址(不要改这个变量名)
        EXIT_APP = 11,  //退出app
    }

}