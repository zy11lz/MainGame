/* eslint-disable no-console */
/**
 *  加载主版本号---》load zlib----> 根据主版本号加载所有文件的版本号---->加载releaseEnter
 */

enum EnterLoadSign
{
    mainVersion = 1,
    zlib = 2,
    versionDat = 3,
    ReleaseEnter = 4,
    libs = 5,
    code = 6,
}


enum RunTime
{
    native = -1,
    debug = 999,
    web = 2,
    wei_xin_miniGame = 3,
    vivo_miniGame = 4,
    oppo_miniGame = 5,
    hua_wei_minigGame = 6,
}

class ReleaseLoader
{
    private _versionLoader: EnterLoader;
    private _mainVersion: any;
    private _versionObj: Object;
    _pid: number;
    _runTime: number;
    noHotPatch = {};
    private _platformType: number;
    private _isAudit: boolean = false;
    private nativeConfigData: Object;
    constructor()
    {
        this.noHotPatch[RunTime.wei_xin_miniGame] = 1;
        this.noHotPatch[RunTime.vivo_miniGame] = 1;
        this.noHotPatch[RunTime.oppo_miniGame] = 1;
        this.noHotPatch[RunTime.hua_wei_minigGame] = 1;
        this.loadPlatInfo();
    }

    loadPlatInfo()
    {
        var conchConfig = window["conchConfig"];
        var PlatformClass = window["PlatformClass"];
        if (conchConfig && PlatformClass)
        {
            NativeBridge.ins.listen("NativeCommonSystem", this.onNaviteMessage.bind(this));
            NativeBridge.ins.sendNativeEx("NativeCommonSystem", 5 /** CommonMsgValue.GET_CONFIG*/);
        } else
        {
            // if (window["getRequest"])
            // {
            //     this.loadMainVersion(window["getRequest"]["platformType"]);
            // }
        }
    }
    urlToObj(url: string)
    {
        //启动参数
        let locationData: Object = {};
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
    private onNaviteMessage(eventID: number, json)
    {
        if (json && json.data)
        {
            NativeBridge.ins.unListen("NativeCommonSystem");

            let dataType: string = typeof json.data;
            var data;
            if (dataType == "object")
            {
                data = json.data;
            }
            else
            {
                data = JSON.parse(json.data);
            }
            this.nativeConfigData = data;

            let updateGroup = Number.parseInt(data['updateGroup']);
            let pid = Number.parseInt(data['__PLATFORM_ID__']);
            let urlData = this.urlToObj(window.location.search);
            let platformType = Number.parseInt(urlData['platformType']);

            console.log(`updateGroup:${ updateGroup } pid:${ pid } platformType:${ platformType } url:${ window.location.search }`);
            if (updateGroup > 0 && pid > 0 && platformType > 0)
            {
                this.loadMainVersion(updateGroup, pid, platformType, 0);
            }
            else
            {
                this.start(data);
            }
        } else
        {
            console.error("加载主版本出错！~~~~~~~~~~~~~~~~~")
        }
    }

    start(data): void
    {
        window["__CONFIG__"] = data;
        var version = data.version;
        this._mainVersion = version
        console.log("#######  mainVersion  ##########", this._mainVersion);
        if (this.noHotPatch.hasOwnProperty(this._runTime))
        {
            this.loadVersion();
        } else
        {
            this.loadZlib()
        }
    }

    public static setNativePrcent(value: number)
    {
        if (window["loadingView"] && window["loadingView"].loading)
        {
            window["loadingView"].loading(value)
        } else if (window["kairong5"] && window["kairong5"].loading)
        {
            kairong5.loading(value);
        }

    }

    loadMainVersion(updateLine: number, pid: number, platformType: number, runTime: number)
    {
        ReleaseLoader.setNativePrcent(10);
        this._pid = pid;
        this._runTime = runTime;
        this._versionLoader = new EnterLoader();
        this._platformType = platformType;
        this.startLoad(updateLine, false);
    }

    loadPoke(updateLine: number, pid: number, platformType: number, runTime: number)
    {
        ReleaseLoader.setNativePrcent(10);
        this._pid = pid;
        this._runTime = runTime;
        this._versionLoader = new EnterLoader();
        this._platformType = platformType;
        this._isAudit = true;
        this.startLoad(updateLine, true);
    }

    private startLoad(updateLine: number, isPoke: boolean)
    {
        this.initRootPath();
        //2是Q1 正式服务
        updateLine = updateLine == null ? 2 : updateLine;
        if (window && window.location && window.location.href && window.location.href.indexOf("47.110") != -1)
        {
            this._versionLoader.load("http://47.110.125.158/version/" + updateLine + "/config.json?v =" + Math.random(), EnterLoadSign.mainVersion, this, this.onMainVersionLoad, "");
        } else
        {
            let versionUrl = "https://update.kairong5.com/version";
            if (this.nativeConfigData && this.nativeConfigData['versionUrl'])
            {
                versionUrl = this.nativeConfigData['versionUrl']
            }
            var configStr = "/config.json?v="
            if (isPoke)
            {
                configStr = "/configGo.json?v="
            }
            this._versionLoader.load(versionUrl + "/" + updateLine + configStr + Math.random(), EnterLoadSign.mainVersion, this, this.onMainVersionLoad, "");
        }
    }


    initRootPath()
    {
        if (this._runTime && this._runTime > 0)
        {
            var cdnPath: string = "https://update.kairong5.com/resource/sprite/dist/";
            if (this._runTime == RunTime.wei_xin_miniGame)
            {
                EnterVersion.ins.rootPath = cdnPath;
            } else if (this._runTime == RunTime.vivo_miniGame)
            {
                EnterVersion.ins.rootPath = cdnPath;
            }
            else if (this._runTime == RunTime.oppo_miniGame)
            {
                EnterVersion.ins.rootPath = cdnPath;
            }
            else if (this._runTime == RunTime.hua_wei_minigGame)
            {
                EnterVersion.ins.rootPath = cdnPath;
            }
        }
    }

    onMainVersionLoad(response: string): void
    {
        var obj = JSON.parse(response);
        ReleaseLoader.setNativePrcent(20);
        if (window["getRequest"])
        {
            obj["__PLATFORM_ID__"] = window["getRequest"]["platformid"]
        }
        if (this._pid && this._pid > 0)
        {
            obj["__PLATFORM_ID__"] = this._pid;
        }
        if (this.nativeConfigData)
        {
            obj = Object.assign(this.nativeConfigData, obj);
        }
        // let config: string = JSON.stringify(obj);
        // console.log(`versionConfig:${ config }`)
        this.start(obj);
    }

    /**
     * zip
     */
    private loadZlib()
    {
        var load: JsLoader = new JsLoader();
        load.load("zlib.min.js", EnterLoadSign.zlib, this, this.onZlibLoad, false)
    }

    onZlibLoad = () =>
    {
        ReleaseLoader.setNativePrcent(40);
        this.loadVersion()
    }

    private loadVersion()
    {
        this._versionLoader = new EnterLoader();
        var versioDatUrl = "version/version_" + this._mainVersion + ".dat"
        this._versionLoader.load(versioDatUrl, EnterLoadSign.versionDat, this, this.onVersionLoad, "arraybuffer")
    }

    private onVersionLoad(arraybuffer)
    {
        ReleaseLoader.setNativePrcent(60);

        var versionStr: string;
        try
        {
            var uint8array = new Uint8Array(arraybuffer);
            var decompressArr = new Zlib.Inflate(uint8array).decompress();
            versionStr = Uint8ArrayToString(decompressArr);
            versionStr = versionStr.substr(versionStr.indexOf("{"));
        }
        catch (e)
        {
            versionStr = "{}";
        }

        this._versionObj = JSON.parse(versionStr);
        EnterVersion.ins.init(this._versionObj);
        var enter: IGameEnter;
        // console.log("runTime:" + this._runTime);
        if (this._runTime && this._runTime > 0)
        {
            var cdnPath: string = "https://update.kairong5.com/resource/sprite/dist/";
            if (this._runTime == RunTime.wei_xin_miniGame)
            {
                EnterVersion.ins.rootPath = cdnPath;
                enter = new WeiXinMiniGameEnter(this._mainVersion, this._versionObj, this._runTime);
            } else if (this._runTime == RunTime.vivo_miniGame)
            {
                EnterVersion.ins.rootPath = cdnPath;
                enter = new VivoMiniGameEnter(this._mainVersion, this._versionObj, this._runTime);
            }
            else if (this._runTime == RunTime.oppo_miniGame)
            {
                EnterVersion.ins.rootPath = cdnPath;
                enter = new OppoMiniGameEnter(this._mainVersion, this._versionObj, this._runTime);
            }
            else if (this._runTime == RunTime.hua_wei_minigGame)
            {
                EnterVersion.ins.rootPath = cdnPath;
                enter = new HuaWeiMiniGameEnter(this._mainVersion, this._versionObj, this._runTime);
            }
            else if (this._runTime == RunTime.debug)
            {
                this._versionObj = {};
                EnterVersion.ins.init({});
                enter = new DebugEnter(this._mainVersion, this._versionObj);
            }
        } else
        {
            enter = new ReleaseEnter(this._mainVersion, this._versionObj);
        }
        if (enter)
        {
            enter.platformType = this._platformType;
            enter.isAudit = this._isAudit;
            enter.start();
        }
    }
}
class EnterVersion
{
    private versionObj: Object;

    private static _ins: EnterVersion;

    public static get ins(): EnterVersion
    {
        if (EnterVersion._ins == null)
        {
            EnterVersion._ins = new EnterVersion();
        }
        return EnterVersion._ins;
    }
    private _rootPath: string = "";
    public get rootPath(): string
    {
        return this._rootPath;
    }
    public set rootPath(value: string)
    {
        this._rootPath = value;
    }

    constructor()
    {

    }

    init(versionObj: Object)
    {
        this.versionObj = versionObj;
    }


    public getVersionUrl(originURL: string): string
    {
        if (this.versionObj && this.versionObj.hasOwnProperty(originURL))
        {
            var versionNUm: number = this.versionObj[originURL];
            var arr: string[] = originURL.split(".");
            var fileName = arr.shift();
            var versionUrl = fileName + "_v_" + versionNUm + "." + arr.join(".");
            return versionUrl
        }
        return originURL;
    }
}

class EnterLoader
{
    private _versionLoader: XMLHttpRequest;
    private _completeFunc: Function;
    private _caller: any;
    private _url: string;
    private _loadNum: number = 0;
    private _contentType: any = "";
    private _sign: EnterLoadSign;
    private _versionUrl: string;



    load(url: string, sign: EnterLoadSign, caller: any, completeFunc: Function, contentType = "")
    {
        this._completeFunc = completeFunc;
        this._contentType = contentType;
        this._caller = caller;
        this._url = url;
        url = EnterVersion.ins.getVersionUrl(url);
        if (url.indexOf("http") != 0)
        {
            // url = "https://update.kairong5.com/resource/sprite/dist/" + url;
            url = EnterVersion.ins.rootPath + url;
        }
        this._versionUrl = url
        this._sign = sign;
        this.startLoad();
    }

    private startLoad()
    {
        this._loadNum++;
        if (this._versionLoader != null)
        {
            this._versionLoader.onload = null;
            this._versionLoader.onerror = null;
        }
        this._versionLoader = new XMLHttpRequest();
        this._versionLoader.onload = this.onload;
        this._versionLoader.onerror = this.onError;
        // eslint-disable-next-line no-console
        console.log("enterLoad:" + this._versionUrl);
        this._versionLoader.open("GET", this._versionUrl, true);
        this._versionLoader.responseType = this._contentType;
        this._versionLoader.send();
    }

    private onload = (): void =>
    {
        if (this._completeFunc)
        {
            var response = this._versionLoader.response; // not responseText
            console.log("加载完成：" + this._url);
            this._completeFunc.apply(this._caller, [response]);
        }
    }

    private onError = (): void =>
    {
        setTimeout(() =>
        {
            this.startLoad();
        }, 1000);
        if (this._loadNum == 6)
        {
            // eslint-disable-next-line no-console
            console.log("加载失败" + this._url);
            // eslint-disable-next-line no-alert
            alert("网络链接异常，资源加载失败， 请稍后再试 " + this._sign);
        }
    }
}

class JsLoader
{
    codeLoad: EnterLoader;
    private _completeFunc: Function;
    private _isZip: boolean;
    private _caller: any;

    constructor()
    {

    }

    load(url: string, sign: EnterLoadSign, caller: any, completeFunc: Function, isZip: boolean = true)
    {
        this._completeFunc = completeFunc;
        this._caller = caller;
        this._isZip = isZip;
        this.codeLoad = new EnterLoader();
        var responseType = "";
        if (isZip)
        {
            responseType = "arraybuffer";
        }
        this.codeLoad.load(url, sign, this, this.onCodeLoad, responseType)
    }

    onCodeLoad(response: any)
    {
        var codeStr = "";
        if (this._isZip)
        {
            var arraybuffer = response; // not responseText
            var uint8array = new Uint8Array(arraybuffer);
            uint8array = new Zlib.Inflate(uint8array).decompress();
            codeStr = Uint8ArrayToString(uint8array);
        } else
        {
            codeStr = response;
        }
        var fileref = document.createElement("script");
        fileref.setAttribute("type", "text/javascript");
        fileref.text = codeStr;
        if (typeof fileref != "undefined")
        {
            document.getElementsByTagName("head")[0].appendChild(fileref);
        }
        if (this._completeFunc)
        {
            this._completeFunc.apply(this._caller);
        }
    }
}


class NativeBridge
{

    private eventDict: { [key: string]: Function } = {};
    private httpCallDict: { [key: string]: { callback: Function, target: any } } = {};

    private sOS: any;
    private bridge: any;
    public isPhone: any;

    private static _ins: NativeBridge;

    public static get ins(): NativeBridge
    {
        if (NativeBridge._ins == null)
        {
            NativeBridge._ins = new NativeBridge();
        }
        return this._ins;
    }

    public constructor()
    {
        console.log("初始化初始化初始化初始化初始化初始化初始化初始化")
        this.onNaciveMessage = this.onNaciveMessage.bind(this);
        var conchConfig = window["conchConfig"];
        var PlatformClass = window["PlatformClass"];
        console.log(conchConfig, PlatformClass)
        if (conchConfig && PlatformClass)
        {
            console.log("有conchConfig和PlatformClass");
            this.sOS = conchConfig.getOS();
            if (this.sOS == "Conch-ios")
            {
                this.bridge = PlatformClass.createClass("JSBridge");
            }
            else if (this.sOS == "Conch-android")
            {
                this.bridge = PlatformClass.createClass("demo.JSBridge");
            }
        }
        this.isPhone = !NativeBridge.isEmpty(this.sOS);
    }
    static isEmpty(str: string): boolean
    {
        return str == undefined || str.length == 0;
    }

    /**
     * 给Native层发送消息
     * @param funcName
     * @param json
     */
    public sendNative(funcName: string, json: {} = null)
    {
        if (json == null) { json = {}; }
        var s = JSON.stringify(json);
        if (window["Laya"] && Laya.Browser.window.control)
        {
            Laya.Browser.window.control.onMessage(s);
        }
        if (this.bridge)
        {
            if (this.sOS == "Conch-ios")
            {
                this.bridge.callWithBack(this.onNaciveMessage, "js2Nactive:", s);
            }
            else if (this.sOS == "Conch-android")
            {
                this.bridge.callWithBack(this.onNaciveMessage, "js2Nactive", s);
            }
        }
    }

    /**
     * 给Native层发送消息
     * @param tag
     * @param eventID
     * @param json
     */
    public sendNativeEx(tag: string, eventID: number, json: {} = null)
    {
        if (json == null) { json = {}; }
        json["tag"] = tag;
        json["eventID"] = eventID;
        this.sendNative("sendToNative", json);
    }

    /**
     * 监听消息
     * @param tag
     * @param callback
     */
    public listen(tag: string, callback: (id: number, json: {}) => {})
    {
        this.eventDict[tag] = callback;
    }

    /**
     *
     * @param tag
     */
    public unListen(tag: string)
    {
        delete this.eventDict[tag];
    }

    /**
     * 原生层回调
     * @param message
     */
    public onNaciveMessage(message: any)
    {
        try
        {
            let type = typeof message;
            var data: any;

            if (type == "object")
            {
                data = message;
            }
            else
            {
                data = JSON.parse(message);

            }
            var tag = String(data["tag"]);
            var eid = parseInt(String(data["eventID"]));
            var call = this.eventDict[tag];
            if (call != null)
            {
                call(eid, data);
            }
            else
            {
                console.error("NativeBridge.sendToJS=>找不到tag：" + tag);
            }
        } catch (error)
        {
            console.log("【Bridge.onNaciveMessage】error=" + error);
        }
    }
}



function Uint8ArrayToString(array)
{
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = array.length;
    i = 0;
    while (i < len)
    {
        c = array[i++];
        switch (c >> 4)
        {
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                // 0xxxxxxx
                out += String.fromCharCode(c);
                break;
            case 12: case 13:
                // 110x xxxx   10xx xxxx
                char2 = array[i++];
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = array[i++];
                char3 = array[i++];
                out += String.fromCharCode(((c & 0x0F) << 12) |
                    ((char2 & 0x3F) << 6) |
                    ((char3 & 0x3F) << 0));
                break;
        }
    }
    return out;
}



//------------------------------------------------------------------------------
//    enter



interface IGameEnter
{
    platformType: number;
    isAudit: boolean;
    start(): void;
}
/*
* name;
*/
abstract class BaseEnter
{
    /**
   * 制作UI的界面参考尺寸X
   */
    static WinWidth: number = 750;
    /**
     * 制作UI的界面参考尺寸Y
     */
    static WinHeight: number = 1334;

    protected _versionObj: any;
    protected _mainVersion: number;
    private _runTime: number;
    platformType: number = 0;
    isAudit: boolean = false;

    // static loadingBg: string = "res/Unpack/loading/bg_dengdai01.jpg";
    static loadingBg: string = "";
    constructor(mainVersion: number, versionObj: Object, runTime: number)
    {
        let config = window["__CONFIG__"];
        if (config && config['loadingBg'])
        {
            BaseEnter.loadingBg = `res/Unpack/loading/${ config['loadingBg'] }`;
        }
        if (BaseEnter.loadingBg == "")
        {
            BaseEnter.loadingBg = `res/Unpack/loading/bg/${ this.getRandomNum(1, 7) }.jpg`;
        }
        this._mainVersion = mainVersion;
        this._versionObj = versionObj;
        this._runTime = runTime;
        window['loadStartTime'] = new Date().getTime();
    }

    getRandomNum(min: number, max: number)
    {
        return min + Math.floor(Math.random() * (max - min));
    }

    protected initLaya()
    {
        console.log("initLaya++++++");
        //设置为适配UI的原尺寸
        Laya.init(BaseEnter.WinWidth, BaseEnter.WinHeight, Laya.WebGL);
        Laya.SoundManager.autoReleaseSound = false;
        //设置Laya提供的worker.js的路径
        let workerPath = "libs/worker.js";
        if (window["_URL_ROOT_"]) { workerPath = window["_URL_ROOT_"] + workerPath; }
        Laya.WorkerLoader.workerPath = workerPath;
        //开启worker线程
        Laya.WorkerLoader.enable = false;

        let userAgent = this.getUserAgent();
        if (userAgent.mobile || userAgent.LayaAirIDE || window["conch"] != null || this._runTime == RunTime.hua_wei_minigGame)
        {
            Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
            Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
            Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
            Laya.stage.alignV = Laya.Stage.ALIGN_TOP;
        }
        else
        {
            Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
            Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
            Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
            Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        }
        console.log(window.navigator.userAgent);
        Laya.stage.frameRate = Laya.Stage.FRAME_FAST;
    }

    setMiniGamePath()
    {
        Laya.URL.basePath = "https://update.kairong5.com/resource/sprite/dist/";
        // Laya.URL.basePath = "http://47.110.125.158/snzz/dist/";
    }

    //获取当前使用的浏览器
    getUserAgent(): any
    {
        let u = window.navigator.userAgent;
        return {
            // 移动终端浏览器版本信息
            LayaAirIDE: u.indexOf('LayaAirIDE') > -1,  // LayaIDE
            trident: u.indexOf('Trident') > -1,  // IE内核
            presto: u.indexOf('Presto') > -1,    // Opera内核
            webKit: u.indexOf('AppleWebKit') > -1,  // 苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,  // 火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/) && u.indexOf('QIHU') && u.indexOf('Chrome') < 0,  // 是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),  // iOS终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,  // Android 终端或者 UC 浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,  // 是否为 iPhone 或者 QQHD 浏览器
            iPad: u.indexOf('iPad') > -1,   // 是否 iPad
            webApp: u.indexOf('Safari') == -1,   // 是否WEB应该程序，没有头部与底部。
            ua: u
        };
    };


    loadLoading()
    {
        Laya.loader.load(BaseEnter.loadingBg, Laya.Handler.create(this, this.onLoadingBgLoad), null, Laya.Loader.IMAGE, 0);
    }

    onLoadingBgLoad(): void
    {
        LoadingUI.ins.refreshBg();
        this.onLoadingBgComplete();
        ReleaseLoader.setNativePrcent(100);
    }

    abstract onLoadingBgComplete();


    enterGame()
    {
        console.log("enterGame");
        var GameMain = window["GameMain"];
        var gameMain = new GameMain(this._mainVersion, this._versionObj);
        LoadingUI.ins.setProgress(20);
        gameMain.setRelease(this._runTime, this.platformType, this.isAudit);
    }
    showLoading()
    {
        LoadingUI.ins.show(Laya.stage, 0, this._runTime);
    }

}

class WeiXinMiniGameEnter extends BaseEnter implements IGameEnter
{
    constructor(mainVersion: number, versionObj: Object, runTime: number)
    {
        super(mainVersion, versionObj, runTime);
    }

    start()
    {

    }

    onLoadingBgComplete()
    {

    }
}

class VivoMiniGameEnter extends BaseEnter implements IGameEnter
{
    constructor(mainVersion: number, versionObj: Object, runTime: number)
    {
        super(mainVersion, versionObj, runTime);
    }

    start()
    {
        this.initLaya();
        this.setMiniGamePath();

        this.loadLoading();
    }

    onLoadingBgComplete()
    {
        this.showLoading();
        this.enterGame();
    }
}


class OppoMiniGameEnter extends BaseEnter implements IGameEnter
{
    constructor(mainVersion: number, versionObj: Object, runTime: number)
    {
        super(mainVersion, versionObj, runTime);
        qg.onError(
            (res) =>
            {
                console.error(res.location);
                console.error(res.message);
                console.error(res.stack);
            }
        )
    }

    start()
    {
        this.initLaya();
        this.setMiniGamePath();

        this.loadLoading();
    }

    onLoadingBgComplete()
    {
        this.showLoading();
        this.enterGame();
    }
}

class HuaWeiMiniGameEnter extends BaseEnter implements IGameEnter
{
    constructor(mainVersion: number, versionObj: Object, runTime: number)
    {
        super(mainVersion, versionObj, runTime);
        qg.onError(
            (res) =>
            {
                console.error(res.location);
                console.error(res.message);
                console.error(res.stack);
            }
        )
    }

    start()
    {
        this.initLaya();
        this.setMiniGamePath();

        this.loadLoading();
    }

    onLoadingBgComplete()
    {
        this.showLoading();
        this.enterGame();
    }
}


class ReleaseEnter extends BaseEnter implements IGameEnter
{

    constructor(mainVersion: number = -1, versionObj: Object = {})
    {
        super(mainVersion, versionObj, -1);
        if (window["__CONFIG__"] == null)
        {
            var __CONFIG__ = {};
            window["__CONFIG__"] = __CONFIG__;
            __CONFIG__["__PLATFORM_ID__"] = 2122003;
        }
    }

    start()
    {
        this.loadEngine();
    }

    //---------------- 2. 加载laya引擎代码， 引擎加载就可以初始化舞台了， 添加laoding，再加载项目代码----------------------
    loadEngine()
    {
        var load: JsLoader = new JsLoader();
        load.load("code/libs.fly", EnterLoadSign.libs, this, this.onEngineLoad, true);
    }

    onEngineLoad = () =>
    {
        console.log("onEngineLoad++++++");
        ReleaseLoader.setNativePrcent(80);
        this.initLaya();
        this.loadLoading();
    }

    onLoadingBgComplete()
    {
        this.showLoading();
        this.loadCode();
    }

    //---------------- 3. 加载项目代码  ----------------------
    loadCode()
    {
        var load: JsLoader = new JsLoader();
        LoadingUI.ins.setProgress(5);
        load.load("code/code.fly", EnterLoadSign.code, this, this.onCodeLoad, true);
    }

    onCodeLoad = (e) =>
    {
        LoadingUI.ins.setProgress(10);
        setTimeout(() =>
        {
            this.enterGame();
        }, 100);
    }
}

class DebugEnter extends BaseEnter implements IGameEnter
{

    constructor(mainVersion: number = -1, versionObj: Object = {})
    {
        super(mainVersion, versionObj, -1);
    }

    start()
    {
        this.loadEngine();
    }

    //---------------- 2. 加载laya引擎代码， 引擎加载就可以初始化舞台了， 添加laoding，再加载项目代码----------------------
    loadEngine()
    {
        var load: JsLoader = new JsLoader();
        load.load("code/libs.js", EnterLoadSign.libs, this, this.onEngineLoad, false);
    }

    onEngineLoad = () =>
    {
        ReleaseLoader.setNativePrcent(80);
        this.initLaya();

        this.loadLoading();
    }

    onLoadingBgComplete()
    {
        this.showLoading();
        this.loadCode();
    }

    //---------------- 3. 加载项目代码  ----------------------
    loadCode()
    {
        var load: JsLoader = new JsLoader();
        load.load("code/code.js", EnterLoadSign.code, this, this.onCodeLoad, false);
    }

    onCodeLoad = (e) =>
    {
        setTimeout(() =>
        {
            this.enterGame();
        }, 100);
    }
}


/*
* 加载进度条
*/
class LoadingUI
{
    private static _ins: LoadingUI;
    public static get ins(): LoadingUI
    {
        if (LoadingUI._ins == null)
        {
            LoadingUI._ins = new LoadingUI();
        }
        return LoadingUI._ins;
    }

    private static _loadingTextArr: string[] = [
        "首次加载时间稍长，请耐心等待",
        "正在叫醒皮卡丘……",
        "正在让小火龙烤肉……",
        "正在找杰尼龟的墨镜……",
        "正在摸可达鸭的脑袋……",
        "正在找大葱鸭的大葱……",
        "正在给卡蒂狗洗澡……",
        "正在给菊草叶洗澡……",
        "正在给电击怪充电……",
        "正在给小锯鳄刷牙……",
        "正在喂卡比兽吃早餐……",
        "正在哄皮皮睡觉……"]

    //--------------普通loading--------------
    private _continer: Laya.Sprite;
    bg: Laya.Image;

    private NormalBG: Laya.Sprite;
    private pgBar: Laya.Sprite;
    private pgBarTips: Laya.Sprite;
    private pgBarWidth: number;
    private pgBarHeight: number;

    private textField: Laya.Label;
    private loadingText: Laya.Label;

    private helTxt: Laya.Label;

    //-------------控制-----------------------
    private progress: number = 0;
    private progressMax: number = 100;
    private proStep: number = 1;
    private loadType: number = 1;

    private _progressBar: Laya.Sprite;

    public constructor()
    {
        this._continer = new Laya.Sprite();
        this._continer.width = BaseEnter.WinWidth;
        this._continer.height = BaseEnter.WinHeight;
        this._progressBar = new Laya.Sprite();
        this._continer.on(Laya.Event.MOUSE_UP, this, this.mouseUpCalled);
        Laya.stage.on(Laya.Event.RESIZE, this, this.resize);
        this.createNormalLoad();
    }

    resize()
    {
        this.refreshBg();
    }

    public refreshBg()
    {
        let ScreenW = Laya.stage.width;
        let ScreenH = Laya.stage.height;
        let bg = this.bg;
        bg.skin = BaseEnter.loadingBg;
        bg.width = 750;
        bg.height = 1334;
        bg.scaleX = bg.scaleY = Math.max(Laya.stage.width / BaseEnter.WinWidth, Laya.stage.height / BaseEnter.WinHeight);
        bg.x = ScreenW / 2 - bg.width * bg.scaleX / 2;
        bg.y = ScreenH / 2 - bg.height * bg.scaleX / 2;
        // console.log(`refreshBg: ScreenW:${ ScreenW } ScreenH:${ ScreenH } bg.skin:${ bg.skin } stage.width:${ Laya.stage.width } stage.height:${ Laya.stage.height } WinWidth:${ BaseEnter.WinWidth } WinHeight:${ BaseEnter.WinHeight }`)
        // console.log(`refreshBg:bg.scaleX:${ bg.scaleX } bg.x:${ bg.x } bg.y:${ bg.y }`);
        this._progressBar.y = ScreenH - 80;
        // this._progressBar.x = (ScreenW - 640) / 2;

    }
    /** 点击Loading层 */
    private mouseUpCalled(): void
    {

    }

    /** 创建普通Loading */
    private createNormalLoad(): void
    {
        let ScreenW = Laya.stage.width;
        let ScreenH = Laya.stage.height;

        this.NormalBG = new Laya.Sprite();
        this.NormalBG.width = ScreenW;
        this.NormalBG.height = ScreenH;
        this._continer.addChild(this.NormalBG);
        this.bg = new Laya.Image();
        this.NormalBG.addChild(this.bg);
        this.initProgressBar();
        this.refreshBg();
    }
    initProgressBar()
    {
        let ScreenW = Laya.stage.width;
        // let ScreenH = Laya.stage.height;


        let pgBg = new Laya.Image("res/Unpack/loading/login_bar_bg.png");
        pgBg.width = 631;
        pgBg.height = 19;
        pgBg.sizeGrid = "7,33,5,36";
        pgBg.x = ScreenW / 2 - pgBg.width / 2;
        // pgBg.y = ScreenH - pgBg.height - 120;
        this._progressBar.addChild(pgBg)
        // this.NormalBG.addChild(pgBg);

        let pgBar = new Laya.Image("res/Unpack/loading/login_bar_01.png");
        pgBar.width = pgBg.width + 13;
        pgBar.height = pgBg.height;
        pgBar.sizeGrid = "7,21,5,27";
        pgBar.x = pgBg.x - 9;
        pgBar.y = pgBg.y + 3;
        // this.NormalBG.addChild(pgBar);
        this._progressBar.addChild(pgBar)

        let pgBarTips = new Laya.Image("res/Unpack/loading/login_bar_02.png");
        pgBarTips.right = 4;
        pgBar.addChild(pgBarTips);

        this.pgBar = pgBar;
        this.pgBarTips = pgBarTips;

        this.pgBarWidth = pgBar.width;
        this.pgBarHeight = pgBar.height;

        this.pgBar.width = 0;

        this.textField = new Laya.Label();
        this.textField.fontSize = 24;
        this.textField.color = "#3e67b8";
        this.textField.width = 100;
        this.textField.text = "0%";
        this.textField.anchorX = 0.5
        this.textField.anchorY = 0.5
        this.textField.x = ScreenW / 2;
        this.textField.y = 40;
        this.textField.align = "center";
        // this.NormalBG.addChild(this.textField);
        this._progressBar.addChild(this.textField)

        this.loadingText = new Laya.Label();
        this.loadingText.fontSize = 24;
        this.loadingText.color = "#3e67b8";
        this.loadingText.width = 768;
        this.loadingText.text = LoadingUI._loadingTextArr[0];
        this.loadingText.x = ScreenW / 2;
        this.loadingText.y = - 20;
        this.loadingText.anchorX = 0.5
        this.loadingText.anchorY = 0.5
        this.loadingText.align = "center";
        // this.NormalBG.addChild(this.loadingText);
        this._progressBar.addChild(this.loadingText)

        // this.helTxt = new Laya.Label();
        // this.helTxt.fontSize = 24;
        // this.helTxt.color = "#3e67b8";
        // this.helTxt.width = 768;
        // this.helTxt.text = "健康忠告\n抵制不良游戏，拒绝盗版游戏。\n 注意自我保护，谨防受骗上当。 \n 适度游戏益脑，沉迷游戏伤身。 \n 合理安排时间，享受健康生活。"
        // this.helTxt.x = ScreenW / 2;
        // this.helTxt.y = pgBg.y - 120;
        // this.helTxt.anchorX = 0.5
        // this.helTxt.anchorY = 0.5
        // this.helTxt.align = "center";
        // this.NormalBG.addChild(this.helTxt);

        this.NormalBG.addChild(this._progressBar);
    }


    /**
     * 进度条
     */
    public setProgress(current: number): void
    {
        this.textField.text = current + "%";
        var scaele = current / 100;
        scaele = scaele > 1 ? 1 : scaele;
        scaele = scaele < 0 ? 0 : scaele;
        this.pgBar.width = this.pgBarWidth * scaele;
    }

    /**
     * 进度开始
     */
    public StartLoad(loadType: number)
    {
        //记录当前打开的load
        this.loadType = loadType;
        this.NormalBG.visible = this.loadType == 1;
        //进度增加的帧循环
        this.progress = 0;
        this.progressMax = 99;
        this.proStep = 1;

        if (this.loadType == 1)
        {
            Laya.timer.clearAll(this);
            Laya.timer.loop(3000, this, this.onLoop);
            //默认信息显示
            this.loadingText.text = LoadingUI._loadingTextArr[0];
            this.textField.text = 10 + "%";
            // this.pgBar.width = 0;
        }
    }

    /*资源加载进度模拟（假进度）*/
    private onLoop(): void
    {
        this.loadingText.text = this.GetTipStr();
    }

    private GetTipStr(): string
    {
        var loadingTextIndex = this.getRandomNum(0, LoadingUI._loadingTextArr.length - 1)
        return LoadingUI._loadingTextArr[loadingTextIndex]
    }

    private getRandomNum(min: number, max: number): number
    {
        return min + Math.floor(Math.random() * (max - min));
    }

    show(parent: Laya.Node, index = -1, runTime: number = 0)
    {
        if (this.helTxt)
        {
            this.helTxt.visible = runTime > 0;
        }
        if (parent)
        {
            if (index == -1)
            {
                parent.addChild(this._continer);
            } else
            {
                parent.addChildAt(this._continer, index);
            }
        }
        this.StartLoad(1);
    }

    /**
     * 进度立刻完成
     */
    public FinishLoad(): void
    {
        this.progressMax = 100;
        if (this.loadType == 1)
        {
            this.proStep = 15;
        }
    }

    /**
     * 关闭处理
     */
    private remove()
    {
        Laya.timer.clearAll(this);
        if (this._continer.parent)
        {
            this._continer.parent.removeChild(this._continer);
        }
    }

    public static close()
    {
        if (this._ins)
        {
            this._ins.remove();
            this._ins.FinishLoad();
        }
    }

    public static show(parent: Laya.Sprite)
    {
        this.ins.show(parent)
    }
}

if (typeof Object.assign !== 'function')
{
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs)
        { // .length of function is 2
            'use strict';
            if (target === null || target === undefined)
            {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++)
            {
                var nextSource = arguments[index];

                if (nextSource !== null && nextSource !== undefined)
                {
                    for (var nextKey in nextSource)
                    {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey))
                        {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}

//-----------------------------------------------------

class QuickGameEnter
{
    private _currentVersion = 5;
    private _versionLoader: EnterLoader;

    constructor()
    {
        this._versionLoader = new EnterLoader();
    }

    enter(updateLine: number, pid: number, platformType: number, runTime: number)
    {
        let versionUrl = "https://update.kairong5.com/version";
        this._versionLoader.load(versionUrl + "/" + updateLine + "/channel/" + runTime + ".json?v=" + Math.random(),
            EnterLoadSign.mainVersion, this, (response: string) =>
        {
            var maxPassVersion = parseInt(response);
            if (maxPassVersion >= this._currentVersion)
            {
                releaseLoader.loadMainVersion(updateLine, pid, platformType, runTime)
            } else
            {
                releaseLoader.loadPoke(updateLine, pid, platformType, runTime)
                // versionUrl = versionUrl + "/" + updateGroup + "/configGO.json";
            }
        }, "");
    }
}

window['NativeBridge'] = NativeBridge;
window['JsLoader'] = JsLoader;
window['ReleaseLoader'] = ReleaseLoader;
window['EnterLoader'] = EnterLoader;
window['LoadingUI'] = LoadingUI;

window["QuickGameEnter"] = QuickGameEnter;
var releaseLoader: ReleaseLoader = new ReleaseLoader();
window['releaseLoader'] = releaseLoader;