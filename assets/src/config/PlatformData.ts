/**
 * 平台相关的参数数据
 */

module PlatformData
{

    /** 发行平台枚举(枚举的类型仅供参考，正式发布时，平台类型是动态获取的，运维可能会有一些扩展) */
    import GameVersionUpdater = Pro.GameVersionUpdater;

    export enum EnumPlatformId
    {
        normal = 1,
        pingu = 2122039,//品古
        xiangwan = 2122056,//凤阳xiangwan
    }

    export enum EnumPlatformType
    {
        test = 1,   // q1 测试服
        normal = 2,   // Q1 正式服
        // agame = 3,   // 阿游戏
        // agame_channel = 4,   // 阿游戏
        wx_cx = 5,   // 畅想 微信小游戏
        wx_cx_h5 = 6,   // 畅想 微信H5
        u8 = 7,   // U8
        meng_you = 8,   // 盟友
        gao_re = 9,   // 高热
        chuang_sheng = 10,   // 传盛
        feng_qu_h5 = 11,   // 丰趣H5
        huan_yu_h5 = 12,   // 寰宇H5
        kai_rong_web_view = 13,   // 寰宇H5
        pin_gu_h5 = 14,   // 品古H5
        jing_hong = 15,   //鲸鸿
        xun_lu = 16,   //旬鹿
        cx_h5 = 17,   //畅想


    }
    export class EnumChannelId
    {
        static UNKNOWN = 'unknown';   // 未知
        static UNKNOWNs = 'unknowns';   // 未知
        static SUPER = 'super';   // super 管理员渠道， 可以显示和登录所有服务器， 包括未开放的
        static CN_OPPO = 'cn_oppo';   // oppo
    }


    /** 入口参数 */
    export var locationData: any = {};

    /** 是否采用https安全方式连接 */
    export var isHttps = false;
    /** https环境下，指定的连接世界服的中转代理地址（没有则保持原有连接方式） */
    export var serverProxyUrl = "";
    export var gameServerProxyUrl = "";

    /**  渠道 pid
     * sdk的pid   渠道id
     * pid是唯一的 ，所有平台都不会重复
    */
    export var pid: number = EnumPlatformId.normal;

    /**
     *  平台id
     *  一个平台会对应多个pid，
     */
    export let platformType: number = EnumPlatformType.normal;
    export let channelId: string = "";
    /** 是否是审核状态 */
    export let isAudit: boolean = false;
    export let agreement: string = "";//sdk使用协议
    export let notPopAgreement: number = 0;//第一次不弹出是否同意协议面板
    export let updateGroup: number = 0;//更新线(在远程的config.json里配置)
    export let versionUrl: string = "";//版本地址(在远程的config.json里配置)
    export let versionCheckMinute: number = 0;//版本检查间隔时长（分钟)(在远程的config.json里配置)
    export let loginBg: string = "res/Unpack/loading/PreLoadingBg.jpg";//登录页面背景 (在远程的config.json里配置)
    export let hideLoginAnimation: boolean = false;//隐藏登录动画 (在远程的config.json里配置)

    /** 对应前后端版本匹配的筛选标签（同一平台下，可能有不同版本客户端，对应不同版本的服务器） */
    export var versionMark = 0;

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////// 平台相关的差异化变量控制(集中处理，避免代码中调用过多的平台判断，统一维护) ///////
    /** app外壳的版本，影响到一些与app交互的接口调用权限问题。 */
    export var platVarAppVersion = 0;
    /** 是否使用游戏内账号密码登陆（非第三方SDK登陆） */
    export var platVarSelfLogin = false;
    /** 用户协议 */
    export var platVarUserAgreement = false;
    /** 是否支持版本更新检查 */
    export var platVarCheckVersion = false;
    // /** 渠道 id */
    // export var channelId:number = 0;
    export function urlToObj(url: string)
    {
        //启动参数
        let locationData = {};
        if (url && url.indexOf("?") != -1)
        {
            url = url.substring(url.indexOf("?") + 1);
            let arrParams = url.split("&");
            for (let strParam of arrParams)
            {
                if (strParam.indexOf("=") >= 0)
                {
                    let tmpElemtAry = strParam.split("=");
                    locationData[tmpElemtAry[0]] = tmpElemtAry[1];
                }
            };
        }
        return locationData;
    }
    /** 根据当前平台类型，解析出平台相关的差异化变量(集中处理，避免代码中调用过多的平台判断，统一维护) */
    export function initData(configData: any, strSearch: string): void
    {
        if (strSearch == "")
        {
            strSearch = window.location.search;
        }
        let locationData = urlToObj(strSearch);
        PlatformData.locationData = locationData;
        if (GameConfig.isInWxGame())
        {
            PlatformData.isHttps = true;
        } else
        {
            if (window.location && window.location.protocol)
            {
                PlatformData.isHttps = window.location.protocol.indexOf("https") == 0;
            }
        }

        if (configData)
        {
            PlatformData.pid = configData["__PLATFORM_ID__"] || 0;
            PlatformData.versionMark = configData["__VERSION_MARK__"] || 0;
            //测试服专用打印标记
            GlobalData.testServerTag = configData["testServerTag"] || locationData["testServerTag"];
            //https环境下，指定的连接世界服的中转代理地址（没有则保持原有连接方式）
            if (PlatformData.isHttps)
            {
                PlatformData.serverProxyUrl = configData["__SER_PROXY_URL__"] || "";
                PlatformData.gameServerProxyUrl = configData["__GAME_SER_PROXY_URL__"] || "";
            }
            PlatformData.updateGroup = Number.parseInt(configData["updateGroup"]);
            PlatformData.versionCheckMinute = Number.parseInt(configData["versionCheckMinute"]);
            PlatformData.versionUrl = configData["versionUrl"];
            if (configData['loginBg'])
            {
                PlatformData.loginBg = `res/Unpack/loading/${ configData['loginBg'] }`;
            }
            if (configData.hasOwnProperty("hideLoginAnimation"))
            {
                PlatformData.hideLoginAnimation = parseInt(configData['hideLoginAnimation']) > 0;
            }

        }

        //是否使用游戏内账号密码登陆（非第三方SDK登陆）
        PlatformData.platVarSelfLogin = (!GlobalData.isRelease) || (configData != null && configData["selfLogin"] != null);


        // 打开平台登陆
        let platformType = getParamsInt("platformType");
        if (platformType)
        {
            PlatformData.platformType = platformType
            if (Laya.Browser.window.control)
            { PlatformData.platVarSelfLogin = false; }
        }
        let channelId = getParamString('channelId');
        if (channelId)
        {
            PlatformData.channelId = channelId
        }
        let agreement = getParamString("agreement");
        if (agreement)
        {
            PlatformData.agreement = agreement;
        }
        PlatformData.notPopAgreement = getParamsInt("notPopAgreement");
        // 打开平台登陆（laya原生版本）
        if (window["PlatformClass"])
        {
            PlatformData.platVarSelfLogin = false;
        }
        logI("PlatformData.platVarSelfLogin=" + PlatformData.platVarSelfLogin);
        logI("PlatformData.channelId=" + channelId);
        //app版本号
        PlatformData.platVarAppVersion = getParamsInt("AppVersion");

        GameVersionUpdater.instance.startLoopCheckVersion();

    }
    export function isExitAppOnDegree()
    {
        return PlatformData.agreement == "lvzhou";
    }
    export function getParamString(key: string): string
    {
        return PlatformData.locationData[key];
    }
    export function getParamsInt(key: string): number
    {
        return Number.parseInt(PlatformData.locationData[key] || 0);
    }
    export function isQ1sdk():boolean
    {
        return platformType == PlatformData.EnumPlatformType.normal || platformType== PlatformData.EnumPlatformType.test;
    }

}