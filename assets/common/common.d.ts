/* eslint-disable */
/* eslint-disable */
declare module fly.net {
    class ByteArray {
        classDic: Object;
        static BIG_ENDIAN: string;
        static LITTLE_ENDIAN: string;
        private _length;
        private _objectEncoding_;
        private _position_;
        private _allocated_;
        private _data_;
        private _littleEndian_;
        _byteView_: any;
        constructor();
        clear(): void;
        ensureWrite(lengthToEnsure: number): void;
        readBoolean(): boolean;
        readBytes(bytes: ByteArray, offset?: number, length?: number): void;
        readDouble(): number;
        readFloat(): number;
        private readFullBytes;
        readInt(): number;
        readShort(): number;
        readUnsignedByte(): number;
        readByte(): number;
        readUnsignedInt(): number;
        readUnsignedShort(): number;
        readUTF(): string;
        readUnicode(length: number): string;
        readMultiByte(length: number, charSet: string): string;
        readUTFBytes(len?: number): string;
        toString(): string;
        writeBoolean(value: boolean): void;
        writeByte(value: number): void;
        writeBytes(bytes: ByteArray, offset?: number, length?: number): void;
        writeArrayBuffer(arraybuffer: any, offset?: number, length?: number): void;
        writeDouble(x: number): void;
        writeFloat(x: number): void;
        writeInt(value: number): void;
        writeShort(value: number): void;
        writeUnsignedInt(value: number): void;
        writeUnsignedShort(value: number): void;
        writeUTF(value: string): void;
        writeUnicode(value: string): void;
        writeMultiByte(value: string, charSet: string): void;
        writeUTFBytes(value: string): void;
        private __fromBytes;
        __get(pos: number): number;
        private _getUTFBytesCount;
        _byteAt_(index: number): number;
        _byteSet_(index: number, value: any): void;
        uncompress(algorithm?: string): void;
        compress(algorithm?: string): void;
        private ___resizeBuffer;
        __getBuffer(): ArrayBuffer;
        __set(pos: number, v: number): void;
        static __ofBuffer(buffer: any): ByteArray;
        setUint8Array(data: any): void;
        getUint8Array(): Uint8Array;
        get bytesAvailable(): number;
        get endian(): string;
        set endian(endianStr: string);
        set length(value: number);
        get length(): number;
        get position(): number;
        set position(value: number);
        get pos(): number;
        set pos(pos: number);
        static UNDEFINED_TYPE: number;
        static NULL_TYPE: number;
        static FALSE_TYPE: number;
        static TRUE_TYPE: number;
        static INTEGER_TYPE: number;
        static DOUBLE_TYPE: number;
        static STRING_TYPE: number;
        static XML_TYPE: number;
        static DATE_TYPE: number;
        static ARRAY_TYPE: number;
        static OBJECT_TYPE: number;
        static AVMPLUSXML_TYPE: number;
        static BYTEARRAY_TYPE: number;
        static EMPTY_STRING: string;
        private _strTable;
        private _objTable;
        private _traitsTable;
        static UINT29_MASK: number;
        static INT28_MAX_VALUE: number;
        static INT28_MIN_VALUE: number;
        readObject(): any;
        private readObject2;
        private readObjectValue;
        readByteArray(): ByteArray;
        readInterger(): number;
        private getStrRef;
        private getObjRef;
        private __readString;
        private readTraits;
        protected readScriptObject(): Object;
        protected readArray(): Object;
        protected readUInt29(): number;
        writeObject(o: any): void;
        writeObject2(o: any): void;
        protected writeAMFNull(): void;
        protected writeAMFString(s: string): void;
        protected writeStringWithoutType(s: string): void;
        protected writeAMFInt(i: number): void;
        protected writeAMFDouble(d: number): void;
        protected writeAMFBoolean(b: boolean): void;
        protected writeCustomObject(o: Object): void;
        static getTraitsInfoRef(arr: Array<any>, ti: Object): number;
        static equalsTraitsInfo(ti1: any, ti2: any): boolean;
        private getAliasByObj;
        protected writeArray(value: Array<any>): void;
        protected writeAMFByteArray(ba: ByteArray): void;
        protected writeMapAsECMAArray(o: Object): void;
        protected writeUInt29(ref: number): void;
        protected getTraitReference(ref: number): any;
    }
}

declare class CallBack {
    private _thisArg;
    private _func;
    protected _args: Array<any>;
    constructor(thisArg: any, func: Function, ...args: any[]);
    call(...callArgs: any[]): any;
    private getCallBackArgs;
    destroy(): void;
    get caller(): any;
    get func(): Function;
}

declare class CallerKeyInfo {
    private static COUNT;
    private static CALLER_COUNT;
    constructor();
    func: Function;
    private _callerList;
    private _calllerIdList;
    reset(): void;
    addCaller(caller: any): void;
    removeCaller(caller: any): void;
    isEmpty(): boolean;
    getCallerKey(caller: any): number;
}

declare module fly {
    class ClassConstruct {
        static construct(classObj: any, params: Array<any>): any;
    }
}

declare module fly.utils {
    class ClassUtils {
        private static _temParam;
        private static _classMap;
        constructor();
        static regClass(className: any, classDef: any): void;
        static getRegClass(className: any): any;
    }
}

declare enum CONST_INT {
    MIN_VALUE = -100000000,
    MAX_VALUE = 100000000
}
declare class ResourceGroup {
    static MAP_ZONE: string;
    static AVATAER: string;
    static AVATAER_EFFECT: string;
    static ICON_IMAGE: string;
    static IMAGE: string;
}

declare module fly.utils {
    class CountShare {
        private _shareDataDict;
        private _waitingDestroyShareDataDict;
        private _destroyDelay;
        private _count;
        constructor($destroyDelay: number);
        startCount(): void;
        stopCount(): void;
        hasShareData($key: string): Boolean;
        getShareData($key: string): fly.vo.CountShareData;
        addShareData($key: string, $csd: fly.vo.CountShareData): void;
        removeShareData($key: string): void;
        installShareData($key: string, obj: any): fly.vo.CountShareData;
        uninstallShareData($key: string, obj: any): void;
        private count;
        private checkUninstall;
        uninstallAll(): void;
        uninstallAllWait(): void;
        get cacheCnt(): number;
        getAllCacheKeyList(): Array<string>;
        getAllCacheDataList(): Array<fly.vo.CountShareData>;
    }
}

declare module fly.vo {
    class CountShareData {
        private _count;
        destroyTm: number;
        constructor();
        addCount(obj: any): void;
        removeCount(obj: any): void;
        get count(): number;
        destroy(): void;
    }
}

declare module fly {
    class DelayCall {
        private _map;
        private _id;
        private _isRunning;
        private _keyArr;
        private static _index;
        private _tickname;
        constructor();
        add(time: number, caller: any, func: Function, ...args: any[]): number;
        remove(delayId: number, isCall?: boolean): void;
        private updateRunStat;
        private updateKey;
        private doUpdateKey;
        private tick;
    }
}

declare module fly {
    class DelayCallInfo extends CallBack {
        private _callTime;
        private _isCalled;
        constructor(calltime: number, caller: any, func: Function, args: Array<any>);
        call(): void;
        get isCalled(): boolean;
        get callTime(): number;
    }
}

declare module fly {
    class DelyInfo {
        pre: DelyInfo;
        next: DelyInfo;
        func: Function;
        caller: any;
        callParamerList: any[];
        constructor();
        isEmpty(): boolean;
        clear(): void;
    }
}

declare module fly.utils {
    class DisplayUtil {
        static removeForParent(dis: any): void;
        static removeAllChild(dis: any, isDispose?: boolean): void;
    }
}

declare class Engine {
    constructor();
    setup(): void;
}

declare module fly.utils {
    class EngineStatus {
        private static _instance;
        private pContext;
        private pPixelRatio;
        private pFps;
        private pCanvas;
        private pSprite;
        private pDrawcall;
        private pGPUMem;
        private pGPUParam;
        private pTriangles;
        private pDownload0;
        private pDownload1;
        private pFrame;
        private pTexture;
        private _context;
        private _canvas;
        private _infos;
        private _fontSize;
        private _width;
        private _height;
        private _tx;
        private _ty;
        private _vx;
        private _minFPS;
        private _maxFPS;
        private _avgFPS;
        private _count;
        private _time0;
        private _time1;
        private static _isShowing;
        private constructor();
        private addInfo;
        private static get instance();
        static show(x?: number, y?: number): void;
        static hide(): void;
        private setPosition;
        private innerShow;
        static get isShowing(): boolean;
        private innerHide;
        private loop;
    }
}

declare module fly {
    class EventDispatcher implements IEventDispatcher {
        static MOUSE_EVENTS: {
            rightmousedown: boolean;
            rightmouseup: boolean;
            rightclick: boolean;
            mousedown: boolean;
            mouseup: boolean;
            mousemove: boolean;
            mouseover: boolean;
            mouseout: boolean;
            click: boolean;
            doubleclick: boolean;
        };
        private _events;
        constructor();
        addEventListener(type: string, caller: any, listener: Function, args?: Array<any>): this;
        dispatchEvent(type: string, data?: any): boolean;
        hasListener(type: string): boolean;
        event(type: string, data?: any): boolean;
        on(type: string, caller: any, listener: Function, args?: Array<any>): this;
        once(type: string, caller: any, listener: Function, args?: Array<any>): this;
        _createListener(type: string, caller: any, listener: Function, args: Array<any>, once: any, offBefore?: any): this;
        off(type: string, caller: any, listener: Function, onceOnly?: boolean): this;
        offAll(type: string): this;
        _recoverHandlers(arr: any): void;
        isMouseEvent(type: string): any;
    }
}

declare module fly {
    class EventManager {
        private static arrayPool;
        private static wrapperPool;
        private static _listenersDict;
        private constructor();
        private static get listenersDict();
        static on(type: any, caller: any, func: Function, ...args: any[]): void;
        static addEvent(type: any, caller: any, func: Function, ...args: any[]): void;
        static dispatchEvent(type: any, ...args: any[]): void;
        static removeEvent(type: any, caller: any, listener: Function): void;
        static hasTypeEvent(type: any): boolean;
        static hasEvent(type: string | number, caller: any, listener: Function): boolean;
        static getEventsNum(): number;
        static removeAllEvents(): void;
        static getTypeEventList(type: string): Array<Function>;
        static getAllEventList(): Array<Function>;
        static getTypeEventsNum(type: string): number;
    }
}

declare module FlyEvent {
    var MOUSE_DOWN: string;
    var MOUSE_DOWN: string;
    var MOUSE_UP: string;
    var CLICK: string;
    var RIGHT_MOUSE_DOWN: string;
    var RIGHT_MOUSE_UP: string;
    var RIGHT_CLICK: string;
    var MOUSE_MOVE: string;
    var MOUSE_OVER: string;
    var MOUSE_OUT: string;
    var MOUSE_WHEEL: string;
    var ROLL_OVER: string;
    var ROLL_OUT: string;
    var DOUBLE_CLICK: string;
    var CHANGE: string;
    var CHANGED: string;
    var RESIZE: string;
    var ADDED: string;
    var REMOVED: string;
    var DISPLAY: string;
    var UNDISPLAY: string;
    var ERROR: string;
    var COMPLETE: string;
    var LOADED: string;
    var PROGRESS: string;
    var INPUT: string;
    var RENDER: string;
    var OPEN: string;
    var MESSAGE: string;
    var CLOSE: string;
    var KEY_DOWN: string;
    var KEY_PRESS: string;
    var KEY_UP: string;
    var FRAME: string;
    var DRAG_START: string;
    var DRAG_MOVE: string;
    var DRAG_END: string;
    var ENTER: string;
    var SELECT: string;
    var BLUR: string;
    var FOCUS: string;
    var VISIBILITY_CHANGE: string;
    var FOCUS_CHANGE: string;
    var PLAYED: string;
    var PAUSED: string;
    var STOPPED: string;
    var START: string;
    var END: string;
    var ENABLE_CHANGED: string;
    var ACTIVE_IN_HIERARCHY_CHANGED: string;
    var COMPONENT_ADDED: string;
    var COMPONENT_REMOVED: string;
    var LAYER_CHANGED: string;
    var HIERARCHY_LOADED: string;
    var RECOVERED: string;
    var RELEASED: string;
    var LINK: string;
    var LABEL: string;
    var FULL_SCREEN_CHANGE: string;
    var DEVICE_LOST: string;
    var MESH_CHANGED: string;
    var MATERIAL_CHANGED: string;
    var WORLDMATRIX_NEEDCHANGE: string;
    var ANIMATION_CHANGED: string;
    var TRIGGER_ENTER: string;
    var TRIGGER_STAY: string;
    var TRIGGER_EXIT: string;
    var TRAIL_FILTER_CHANGE: string;
    var DOMINO_FILTER_CHANGE: string;
}

declare module fly {
    class GlobalConfig2D {
        private static _shadowPos;
        private static _shadowTexture;
        private static _nowTime;
        static IS_TWO_ANGLE: boolean;
        static FRAME_RATE: number;
        static SETP_TIME: number;
        static get shadowWidth(): number;
        static get shadowHeight(): number;
        static get shadowTexture(): fly.renders.TextureProxy;
        static setShadowBmpData(value: fly.renders.TextureProxy): void;
        static get tanShadow(): number;
        static get shadowAngle(): number;
        static set shadowAngle(value: number);
        static get nowTime(): number;
        static decode: Function;
        static version: Function;
        static avatarFileVersion: Function;
        static resParseFunc: Function;
        static resUrlFunc: Function;
        static resAngleFunc: Function;
        static shadowYScale: number;
        private static _shadowAngle;
        private static _tanShadow;
        static shadowOffsetX: number;
        static shadowOffsetY: number;
        static shadowAlpha: number;
        static shadowRenderType: number;
        static SHADOW_SHAPE: number;
        static isShowDrawRect: boolean;
        static enableBlendMode: boolean;
        static useWorker: boolean;
        static avatarAtfResAsync: boolean;
        static avatarBpgResScale: boolean;
        static avatarBpgResScaleMemory: number;
        static avatarBpgResScaleValue: number;
        static cameraTween: number;
        static avatarHighlightEnabled: boolean;
        static heightFramRender: boolean;
        constructor();
        static setGlobalConfig($frameRate: number, $decode: Function, $version?: Function): void;
    }
}

declare module fly {
    class Handler {
        protected static _pool: any[];
        private static _gid;
        caller: any;
        method: Function;
        args: Array<any>;
        once: boolean;
        protected _id: number;
        constructor(caller?: any, method?: Function, args?: Array<any>, once?: boolean);
        setTo(caller: any, method: any, args: any, once: any): this;
        run(): any;
        runWith(data: any): any;
        clear(): this;
        recover(): void;
        static create(caller: any, method: any, args: any, once: any): any;
    }
}

declare module ds {
    class HashMap<K, T> {
        private _keys;
        private _values;
        constructor();
        get length(): number;
        isEmpty(): boolean;
        keys(): Array<K>;
        getValues(): Array<T>;
        containsValue(value: T): boolean;
        containsKey(key: K): boolean;
        getValue(key: K): T;
        key(value: T): K;
        add(key: K, value: T): T;
        remove(key: K): T;
        clear(): void;
        clone(): HashMap<K, T>;
        toString(): string;
    }
}

declare module fly {
    interface IDisplayObject {
        name: string;
        x: number;
        y: number;
        width: number;
        height: number;
        visible: boolean;
        alpha: number;
        scaleX: number;
        scaleY: number;
        rotation: number;
        parent: any;
        stage: any;
        subTexture: renders.SubTexture;
        dispose(): void;
        add(dis: IDisplayObject): void;
        removeChildren(): any;
    }
}

declare module fly {
    interface IDisplayObjectContiner extends IDisplayObject {
        readonly numChildren: number;
        addChild(child: IDisplayObject): IDisplayObject;
        addChildAt(child: IDisplayObject, index: number): IDisplayObject;
        contains(child: IDisplayObject): boolean;
        getChildAt(index: number): IDisplayObject;
        getChildIndex(child: IDisplayObject): number;
        getChildByName(name: string): IDisplayObject;
        removeChild(child: IDisplayObject): IDisplayObject;
        removeChildAt(index: number): IDisplayObject;
        setChildIndex(child: IDisplayObject, index: number): void;
    }
}

declare module fly {
    interface IDynamicPosition {
        update($dnyObj: any): Point;
    }
}

declare module fly {
    interface IEventDispatcher {
        hasListener(type: string): boolean;
        event(type: string, data?: any): boolean;
        on(type: string, caller: any, listener: Function, args?: Array<any>): IEventDispatcher;
        once(type: string, caller: any, listener: Function, args?: Array<any>): IEventDispatcher;
        off(type: string, caller: any, listener: Function, onceOnly?: boolean): IEventDispatcher;
        offAll(type?: string): IEventDispatcher;
        isMouseEvent(type: string): boolean;
    }
}

declare module fly {
    interface IPoolClass {
        dispose(): void;
        reSet(_arg1: Array<any>): void;
        recyle(): void;
    }
}

declare module fly.renders {
    interface ITextureProxy {
        addRef(): void;
        releaseRef(): void;
        dispose(): void;
        on(type: String, caller: any, listener: Function): void;
        off(type: String, caller: any, listener: Function): void;
    }
}

declare module common {
    interface Ipool {
        poolSign: PoolSign;
        readonly isFree: boolean;
        dispose(): void;
        release(): void;
        reset(): void;
    }
}

declare module fly.loader {
    class LayaAtlasLoader extends fly.EventDispatcher {
        private _atlasJson;
        private _toLoads;
        private _pics;
        private _directory;
        private _atlasUrl;
        close(): void;
        load(atlasurl: string, atlasData: string): void;
        private onAtlasError;
        private doLoadImg;
        private cacheRes;
        private onImgLoadComplete;
        private onImgLoadError;
    }
}

declare module fly.renders {
    class LayaRenderSprite extends Laya.Sprite implements IDisplayObject {
        private _subTexture;
        constructor();
        dispose(): void;
        set subTexture(value: SubTexture);
        get subTexture(): SubTexture;
        add(dis: IDisplayObject): void;
    }
}

declare module fly {
    class LoadBlackListUtils {
        private _blackListMap;
        static _ins: LoadBlackListUtils;
        static get ins(): LoadBlackListUtils;
        getIs404Error($url: string, $checkCnt?: number): boolean;
        addLoadUrl($url: string): void;
        removeLoadUrl($url: string): void;
    }
}

declare module fly.loader {
    class LoadPriorityType {
        static LEVEL_DEFAULT: number;
        static INTERRUPT_PRIORITY: number;
        static LEVEL_2D_UI_DEFAULT: number;
        private constructor();
    }
}

declare class LoaderType {
    static readonly TEXT: string;
    static readonly BINARY: string;
    static readonly ATLAS: string;
    static readonly IMAGE: string;
    static readonly json: string;
    static readonly fly: string;
    static readonly data: string;
    static typeMapping: Object;
    constructor();
}

declare module fly.enums {
    class LogLevel {
        constructor();
        static INF: number;
        static WAR: number;
        static DEBUG: number;
        static ERR: number;
    }
}

declare module fly.loader {
    class MultiLoadData {
        requestMethod: string;
        userData: any;
        priority: number;
        private _requestURL;
        private _url;
        private _type;
        private _onComplete;
        private _onUpdate;
        private _onError;
        private _dataFormat;
        private _tryCount;
        private _caller;
        uuid: string;
        private static COUNT;
        constructor(url: string, caller?: any, onComplete?: Function, onUpdate?: Function, onError?: Function, dataFormat?: string, priority?: number);
        get caller(): any;
        get type(): string;
        get url(): string;
        get reqUrl(): string;
        get onComplete(): Function;
        get onUpdate(): Function;
        get onError(): Function;
        get dataFormat(): string;
        get tryCount(): number;
    }
}

declare module fly.loader {
    type IPriority = {
        priority: number;
    };
    export class MultiUrlLoadManager {
        static getUrlWithVersion: (url: string) => string;
        private static waitingQueue;
        private static waitingDict;
        private static loadingDict;
        private static multipleDict;
        private static loadingQueue;
        private static arrayPool;
        private static _loadingSortDirty;
        private static _maxQueueSize;
        private static _enableInterrupt;
        private static _loadedTotalCount;
        private static _loadedSucceedCount;
        private static _failedCount;
        private static _interruptCount;
        private static _networkSpeed;
        private static _loadedTotalBytes;
        private static _loadedCoastTime;
        private static _detailLoadedBytes;
        private static _detailLoadedCount;
        private static _detailLoadSpeed;
        private constructor();
        static setup(versionFunc: (versionFunc: string) => string): void;
        static loadByData(task: MultiLoadData): void;
        static load(url: string, caller?: any, onComplete?: Function, onUpdate?: Function, onError?: Function, dataFormat?: string, priority?: number): void;
        static set enableInterrupt(value: boolean);
        static get enableInterrupt(): boolean;
        static get maxQueueSize(): number;
        static set maxQueueSize(value: number);
        static get detailLoadedCount(): ds.StringMap<number>;
        static get detailLoadedBytes(): ds.StringMap<number>;
        static get loadedTotalCount(): number;
        static get idleCount(): number;
        static get waitingCount(): number;
        static get loadedTotalBytes(): number;
        static get networkSpeed(): number;
        static get interruptCount(): number;
        static get failedCount(): number;
        static get loadedSucceedCount(): number;
        static inside(url: string): boolean;
        private static interruptTask;
        static cancelTask(mld: MultiLoadData): void;
        private static cancelLoadingTask;
        private static removeWaitingTask;
        private static removeMultipleTask;
        private static removeAllTask;
        private static addLoaderEvents;
        private static offLoaderEvents;
        private static onLoadError;
        private static profilerNet;
        private static onLoadProgress;
        private static getName;
        private static onLoadComplete;
        private static addToWaitingQueue;
        static sortPriorityAsc(data: Array<IPriority>, left: number, right: number): void;
        private static loadNext;
        private static shiftWaitingTask;
        private static processLoad;
        private static addToMultipleQueue;
    }
    export {};
}

declare module fly.loader {
    class MultiUrlLoader extends fly.EventDispatcher {
        static ENABLE_TIMEOUT_RELOAD: boolean;
        static TIME_OUT_RETRY_TIME: number;
        rslLoadData: MultiLoadData;
        isLocked: boolean;
        isLoading: boolean;
        private _urlLoader;
        private _data;
        private _tryIndex;
        private _timeoutID;
        constructor();
        get data(): any;
        close(): void;
        get priority(): number;
        load(rslLoadData: MultiLoadData): void;
        private initUrlLoadEvent;
        private removeUrlLoadEvent;
        private onUrlError;
        get bytesLoaded(): number;
        get bytesTotal(): number;
        private onUrlProgress;
        private onUrlComplete;
        private onAtlasLoadComplete;
        private onImageLoadComplete;
        private onUrlTimeoutHandler;
    }
}

declare module fly {
}

declare module fly {
    class Point {
        x: number;
        y: number;
        constructor(x?: number, y?: number);
        setTo(x?: number, y?: number): void;
    }
}

declare module common {
    class Pool {
        private _disposed;
        private _poolInfo;
        private _freeArr;
        private _allMap;
        private _inUseMap;
        private _pid;
        constructor(poolIno: PoolInfo);
        getFreeCnt(): number;
        getAllCnt(): number;
        create(): Ipool;
        releaseItem(item: Ipool): void;
        destoryItem(item: Ipool): void;
        private destoyAll;
        dispose(): void;
        isAllFee(): boolean;
    }
}

declare module common {
    class PoolInfo {
        private static _g_poolId;
        private _poolname;
        private _poolCls;
        private _maxSize;
        private _gpid;
        constructor(pooName: string, poolCls: any, maxSize?: number);
        get maxSize(): number;
        get poolname(): string;
        get poolCls(): any;
        get gpid(): number;
    }
}

declare module common {
    class PoolMgr {
        static poolMap: ds.StringMap<Pool>;
        static setup(): void;
        static createPool(poolInfo: PoolInfo): Pool;
        static getPool(poolInfo: PoolInfo): Pool;
        static getFreeCnt(poolInfo: PoolInfo): number;
        static getAllCnt(poolInfo: PoolInfo): number;
        static getItem(poolInfo: PoolInfo): Ipool;
        private static getPoolByName;
        static releaseItem(item: Ipool): void;
        static destoryItem(item: Ipool): void;
        static dispose(poolInfo: PoolInfo): void;
    }
}

declare module common {
    class PoolSign {
        pid: number;
        gpid: number;
        isFree: boolean;
        poolName: string;
        uniqID: string;
        constructor();
    }
}

declare module fly {
    class Rectangle {
        x: number;
        y: number;
        width: number;
        height: number;
        constructor();
        setTo(x: number, y: number, width: number, height: number): void;
        clone(): Rectangle;
        contains(x: number, y: number): boolean;
    }
}

declare module fly {
    class RenderItemAngleUtil {
        static isNeedScaleX(angle: number): Boolean;
        static getAngleScaleX(angle: number): number;
        static getResourceKey(actionName: String, angle: number, frameIndex: number): String;
    }
}

declare class RenderUnitCallBack {
    private _thisArg;
    private _func;
    private _args;
    constructor(thisArg: any, func: Function, ...args: any[]);
    call(...callArgs: any[]): any;
    private getCallBackArgs;
    destroy(): void;
    get caller(): any;
    get func(): Function;
}

declare module fly {
    class SceneConfig {
        static TILE_WIDTH: number;
        static TILE_HEIGHT: number;
        static ZONE_WIDTH: number;
        static ZONE_HEIGHT: number;
        static ZONE_SCALE_WIDTH: number;
        static ZONE_SCALE_HEIGHT: number;
        static setSceneConfig($tileWidth: number, $tileHeight: number, $zoneWidth: number, $zoneHeight: number): void;
        width: number;
        height: number;
        constructor($width: number, $height: number);
        setViewSize($viewWidth: number, $viewHeight: number): void;
    }
}

declare module StatusConvert {
    function getIdByNum(status: number, angle: number, frame: number): number;
}

declare module ds {
    class StringMap<T> {
        private _map;
        private _length;
        constructor();
        getValue(key: string | number): T;
        get(key: string | number): T;
        put(key: string | number, value: T): T;
        isEmpty(): boolean;
        containsKey(key: string | number): boolean;
        remove(key: string | number): T;
        getKeys(): string[];
        containsValue(value: T): boolean;
        size(): number;
        clear(): void;
        toString(): string;
        _private_foreachKey(caller: any, func: Function): void;
        _private_foreachValue(caller: any, func: Function): void;
    }
}

declare module fly.renders {
    class SubTexture {
        private _tDisposed;
        private _parent;
        private _texture;
        constructor();
        parse(tex: any, rect: Rectangle, name: string): void;
        setLaya(tex: Laya.Texture, rect: Rectangle, name: string): void;
        get width(): number;
        get height(): number;
        getLayaTexture(): Laya.Texture;
    }
}

declare module fly.utils {
    class TemplateUtil {
        static converDicKeyToArr(dic: Object): any[];
        static converDicValueToArr(dic: Object): any[];
        static converArrToDictionary(arr: any, keyName: string): Object;
        static converArrToStringMap(arr: Array<any>, keyName: string, map: ds.StringMap<any>): void;
        static createUniqIndexFromDic(dataDic: Object, indexArr: any[]): Object;
        static createUniqIndexFromArr(dataArr: any[], indexArr: any[]): Object;
        static createUniqIndexFromVec(dataArr: any, indexArr: any[]): Object;
        private static createUniqIndexFromObj;
    }
}

declare module fly.renders {
    class TexturePack extends EventDispatcher {
        private _textureProxy;
        private _configObj;
        private subTextures;
        private _url;
        constructor();
        load(fullSourchPath: string, configObj: any): void;
        private onTextLoaed;
        private parseTexture;
        getTexture(key: string): SubTexture;
        dispose(): void;
    }
}

declare module fly {
    class TextureParse {
        constructor();
        static parse(url: string, fragment: ArrayBuffer, caller: any, onload: Function): void;
        static loadBytes(fragment: ArrayBuffer, caller: any, onload: Function): void;
    }
}

declare module fly.renders {
    class TextureProxy extends EventDispatcher implements ITextureProxy {
        protected _texture: any;
        private _refCount;
        protected _url: string;
        private _name;
        private _disposed;
        private _loading;
        private _loaded;
        private _error;
        private _lastUsed;
        private _smooth;
        private _mipmap;
        constructor(url?: string, name?: string);
        get lastUsed(): number;
        get error(): boolean;
        get loading(): boolean;
        get loaded(): boolean;
        get width(): number;
        get height(): number;
        load(url?: string, priority?: number): void;
        get url(): string;
        private onTextureProgress;
        private onTextureError;
        private onTextureComplete;
        addRef(): void;
        getRef(): number;
        releaseRef(): void;
        toString(): string;
        dispose(): void;
    }
}

declare class Tick {
    private static _loopMap;
    private static _preTime;
    private static _gapTime;
    constructor();
    static setup(): void;
    private static loop;
    static get time(): number;
    private static run;
    static addTick(loopName: string, caller: any, func: Function, ...args: any[]): void;
    static removeTick(loopName: string): void;
}

declare function arrayBuffToString(arrayBuffer: ArrayBuffer): string;
declare var isLaya: boolean;
declare var logLevel: number;
declare function logI(...args: any[]): void;
declare function logW(...args: any[]): void;
declare function logE(...args: any[]): void;
declare function logD(...args: any[]): void;
declare function getTimer(): number;
declare function getRequestAnimationFrame(): Function;
declare var animationFrame: Function;

declare module fly {
    class Transformer {
        constructor();
        static transTilePoint2ZonePoint($tilePoint: Point): Point;
        static transTilePoint2PixelPoint($tilePoint: Point): Point;
        static transPixelPoint2TilePoint($pixelPoint: Point): Point;
        static transZoneTilePoint2ZonePixelPoint($zoneTilePoint: Point): Point;
        static transLogicAngle2Angle($logicAngle: number, $average?: number): number;
        static transLogicAngle2Angle8($logicAngle: number): number;
    }
}

declare module fly.loader {
    class URLLoader extends fly.EventDispatcher {
        private static UUID;
        private _url;
        private _data;
        private _closed;
        private _loaded;
        private _loading;
        private _disposed;
        private _dataFormat;
        private _method;
        private _bytesTotal;
        private _bytesLoaded;
        private _httpRequest;
        private uuid;
        private static COUNT;
        private loadTime;
        private static LOAD_TIME;
        constructor(url?: string, dataformat?: string, method?: string);
        get bytesTotal(): number;
        get bytesLoaded(): number;
        set method(value: string);
        get method(): string;
        get http(): any;
        get loaded(): boolean;
        get dataFormat(): string;
        set dataFormat(value: string);
        get closed(): boolean;
        get loading(): boolean;
        get data(): any;
        get url(): string;
        private clear;
        close(): void;
        dispose(): void;
        load(url: string, dataformat?: string, headers?: Array<string>): void;
        private addHttpRequestEvent;
        private onError;
        private error;
        private onComplete;
        private complete;
        private offHttpRequestEvent;
        protected onAbort: (e: any) => any;
        protected onProgress: (e: any) => any;
    }
}

declare module fly.loader {
    class URLLoaderDataFormat {
        static readonly TEXT: string;
        static readonly BINARY: string;
        private constructor();
    }
}

declare module fly.utils {
    class URLUtils {
        private constructor();
        static type(url: string): string;
        static getPath(url: string): string;
        static getFileName(url: string): string;
    }
}

declare module fly.utils {
    class XmlUtil {
        constructor();
        static getAttrValue(note: any, valuename: string): string;
        static getAttrNumberValue(note: any, valuename: string): number;
    }
}

declare module fly {
    class ZMath {
        private static abs;
        private static sin;
        private static cos;
        private static sqrt;
        private static PI;
        static toDeg: number;
        static toRad: number;
        constructor();
        static randomInt($min: number, $max: number): number;
        static getDisSquare($x1: number, $y1: number, $x2: number, $y2: number): number;
        static getRotPoint($p1: Point, $p0: Point, $angle: number): Point;
        static getTowPointsAngle($p0: Point, $p1: Point): number;
        static getNearAngel($angle: number, $average?: number): number;
        static getAnglePos(startPos: Point, angle: number, dis: number): Point;
        static get2PosDisPos(startPos: Point, endPos: Point, dis: number): Point;
        static mathSinArray: number[];
        static mathCosArray: number[];
        static getSin($angle: number): number;
        static getCos($angle: number): number;
        private static setupSinCos;
        static distance(p1: Point, p2: Point): number;
    }
}

declare class rEnum {
    constructor();
    private static _value;
    static ENUM_START(start?: number): number;
    static get next(): number;
}

/* eslint-disable */
declare module spine.webgl {
    class ManagedWebGLRenderingContext {
        canvas: any;
        gl: WebGLRenderingContext;
        private restorables;
        constructor(canvasOrContext: HTMLCanvasElement | WebGLRenderingContext, contextConfig?: any);
        addRestorable(restorable: Restorable): void;
        removeRestorable(restorable: Restorable): void;
    }
    class WebGLBlendModeConverter {
        static ZERO: number;
        static ONE: number;
        static SRC_COLOR: number;
        static ONE_MINUS_SRC_COLOR: number;
        static SRC_ALPHA: number;
        static ONE_MINUS_SRC_ALPHA: number;
        static DST_ALPHA: number;
        static ONE_MINUS_DST_ALPHA: number;
        static DST_COLOR: number;
        static getDestGLBlendMode(blendMode: BlendMode): number;
        static getSourceGLBlendMode(blendMode: BlendMode, premultipliedAlpha?: boolean): number;
    }
}

declare module spine.webgl {
    class Vector3 {
        x: number;
        y: number;
        z: number;
        constructor(x?: number, y?: number, z?: number);
        setFrom(v: Vector3): Vector3;
        set(x: number, y: number, z: number): Vector3;
        add(v: Vector3): Vector3;
        sub(v: Vector3): Vector3;
        scale(s: number): Vector3;
        normalize(): Vector3;
        cross(v: Vector3): Vector3;
        multiply(matrix: Matrix4): Vector3;
        project(matrix: Matrix4): Vector3;
        dot(v: Vector3): number;
        length(): number;
        distance(v: Vector3): number;
    }
}

declare module spine.webgl {
    class SkeletonRenderer {
        static QUAD_TRIANGLES: number[];
        premultipliedAlpha: boolean;
        vertexEffect: VertexEffect;
        private tempColor;
        private tempColor2;
        private vertices;
        private vertexSize;
        private twoColorTint;
        private renderable;
        private clipper;
        private temp;
        private temp2;
        private temp3;
        private temp4;
        constructor(context: ManagedWebGLRenderingContext | WebGLRenderingContext, twoColorTint?: boolean);
        draw(batcher: PolygonBatcher, skeleton: Skeleton, slotRangeStart?: number, slotRangeEnd?: number): void;
    }
}

declare module spine.webgl {
    const M00 = 0;
    const M01 = 4;
    const M02 = 8;
    const M03 = 12;
    const M10 = 1;
    const M11 = 5;
    const M12 = 9;
    const M13 = 13;
    const M20 = 2;
    const M21 = 6;
    const M22 = 10;
    const M23 = 14;
    const M30 = 3;
    const M31 = 7;
    const M32 = 11;
    const M33 = 15;
    class Matrix4 {
        temp: Float32Array;
        values: Float32Array;
        private static xAxis;
        private static yAxis;
        private static zAxis;
        private static tmpMatrix;
        constructor();
        set(values: ArrayLike<number>): Matrix4;
        transpose(): Matrix4;
        identity(): Matrix4;
        invert(): Matrix4;
        determinant(): number;
        translate(x: number, y: number, z: number): Matrix4;
        copy(): Matrix4;
        projection(near: number, far: number, fovy: number, aspectRatio: number): Matrix4;
        ortho2d(x: number, y: number, width: number, height: number): Matrix4;
        ortho(left: number, right: number, bottom: number, top: number, near: number, far: number): Matrix4;
        multiply(matrix: Matrix4): Matrix4;
        multiplyLeft(matrix: Matrix4): Matrix4;
        lookAt(position: Vector3, direction: Vector3, up: Vector3): this;
        static initTemps(): void;
    }
}

declare module spine.webgl {
    class LoadingScreen {
        static FADE_SECONDS: number;
        private static loaded;
        private static spinnerImg;
        private static logoImg;
        private renderer;
        private logo;
        private spinner;
        private angle;
        private fadeOut;
        private timeKeeper;
        backgroundColor: Color;
        private tempColor;
        private firstDraw;
        private static SPINNER_DATA;
        private static SPINE_LOGO_DATA;
        constructor(renderer: SceneRenderer);
        draw(complete?: boolean): void;
    }
}

declare module spine.webgl {
    class Input {
        element: HTMLElement;
        lastX: number;
        lastY: number;
        buttonDown: boolean;
        currTouch: Touch;
        touchesPool: Pool<Touch>;
        private listeners;
        constructor(element: HTMLElement);
        private setupCallbacks;
        addListener(listener: InputListener): void;
        removeListener(listener: InputListener): void;
    }
    class Touch {
        identifier: number;
        x: number;
        y: number;
        constructor(identifier: number, x: number, y: number);
    }
    interface InputListener {
        down(x: number, y: number): void;
        up(x: number, y: number): void;
        moved(x: number, y: number): void;
        dragged(x: number, y: number): void;
    }
}

declare module spine.webgl {
    class OrthoCamera {
        position: Vector3;
        direction: Vector3;
        up: Vector3;
        near: number;
        far: number;
        zoom: number;
        viewportWidth: number;
        viewportHeight: number;
        projectionView: Matrix4;
        inverseProjectionView: Matrix4;
        projection: Matrix4;
        view: Matrix4;
        private tmp;
        constructor(viewportWidth: number, viewportHeight: number);
        update(): void;
        screenToWorld(screenCoords: Vector3, screenWidth: number, screenHeight: number): Vector3;
        setViewport(viewportWidth: number, viewportHeight: number): void;
    }
}

declare module spine {
    interface VertexEffect {
        begin(skeleton: Skeleton): void;
        transform(position: Vector2, uv: Vector2, light: Color, dark: Color): void;
        end(): void;
    }
}

declare module spine {
    interface Updatable {
        update(): void;
    }
}

declare module spine {
    class Triangulator {
        private convexPolygons;
        private convexPolygonsIndices;
        private indicesArray;
        private isConcaveArray;
        private triangles;
        private polygonPool;
        private polygonIndicesPool;
        triangulate(verticesArray: ArrayLike<number>): Array<number>;
        decompose(verticesArray: Array<number>, triangles: Array<number>): Array<Array<number>>;
        private static isConcave;
        private static positiveArea;
        private static winding;
    }
}

declare module spine {
    class SlotData {
        index: number;
        name: string;
        boneData: BoneData;
        color: Color;
        darkColor: Color;
        attachmentName: string;
        blendMode: BlendMode;
        constructor(index: number, name: string, boneData: BoneData);
    }
}

declare module spine {
    class Slot {
        data: SlotData;
        bone: Bone;
        color: Color;
        darkColor: Color;
        private attachment;
        private attachmentTime;
        attachmentVertices: number[];
        constructor(data: SlotData, bone: Bone);
        getAttachment(): Attachment;
        setAttachment(attachment: Attachment): void;
        setAttachmentTime(time: number): void;
        getAttachmentTime(): number;
        setToSetupPose(): void;
    }
}

declare module spine {
    class Skin {
        name: string;
        attachments: Map<Attachment>[];
        constructor(name: string);
        addAttachment(slotIndex: number, name: string, attachment: Attachment): void;
        getAttachment(slotIndex: number, name: string): Attachment;
        attachAll(skeleton: Skeleton, oldSkin: Skin): void;
    }
}

declare module spine {
    enum BlendMode {
        Normal = 0,
        Additive = 1,
        Multiply = 2,
        Screen = 3
    }
}

declare module spine {
    class BoneData {
        index: number;
        name: string;
        parent: BoneData;
        length: number;
        x: number;
        y: number;
        rotation: number;
        scaleX: number;
        scaleY: number;
        shearX: number;
        shearY: number;
        transformMode: TransformMode;
        color: Color;
        constructor(index: number, name: string, parent: BoneData);
    }
    enum TransformMode {
        Normal = 0,
        OnlyTranslation = 1,
        NoRotationOrReflection = 2,
        NoScale = 3,
        NoScaleOrReflection = 4
    }
}

declare module spine {
    class PathConstraintData {
        name: string;
        order: number;
        bones: BoneData[];
        target: SlotData;
        positionMode: PositionMode;
        spacingMode: SpacingMode;
        rotateMode: RotateMode;
        offsetRotation: number;
        position: number;
        spacing: number;
        rotateMix: number;
        translateMix: number;
        constructor(name: string);
    }
    enum PositionMode {
        Fixed = 0,
        Percent = 1
    }
    enum SpacingMode {
        Length = 0,
        Fixed = 1,
        Percent = 2
    }
    enum RotateMode {
        Tangent = 0,
        Chain = 1,
        ChainScale = 2
    }
}

declare module spine {
    class SkeletonJson {
        attachmentLoader: AttachmentLoader;
        scale: number;
        private linkedMeshes;
        constructor(attachmentLoader: AttachmentLoader);
        readSkeletonData(json: string | any): SkeletonData;
        readAttachment(map: any, skin: Skin, slotIndex: number, name: string, skeletonData: SkeletonData): Attachment;
        readVertices(map: any, attachment: VertexAttachment, verticesLength: number): void;
        readAnimation(map: any, name: string, skeletonData: SkeletonData): void;
        readCurve(map: any, timeline: CurveTimeline, frameIndex: number): void;
        getValue(map: any, prop: string, defaultValue: any): any;
        static blendModeFromString(str: string | number): BlendMode;
        static positionModeFromString(str: string | number): PositionMode;
        static spacingModeFromString(str: string | number): SpacingMode;
        static rotateModeFromString(str: string | number): RotateMode;
        static transformModeFromString(str: string | number): TransformMode;
    }
}

declare module spine {
    class SkeletonData {
        name: string;
        bones: BoneData[];
        slots: SlotData[];
        skins: Skin[];
        defaultSkin: Skin;
        events: EventData[];
        animations: Animation[];
        ikConstraints: IkConstraintData[];
        transformConstraints: TransformConstraintData[];
        pathConstraints: PathConstraintData[];
        width: number;
        height: number;
        version: string;
        hash: string;
        animationsMaps: ds.StringMap<Animation>;
        animationsArr: string[];
        fps: number;
        imagesPath: string;
        isHaveClip: boolean;
        constructor();
        findBone(boneName: string): BoneData;
        findBoneIndex(boneName: string): number;
        findSlot(slotName: string): SlotData;
        findSlotIndex(slotName: string): number;
        findSkin(skinName: string): Skin;
        findEvent(eventDataName: string): EventData;
        findAnimation(animationName: string): Animation;
        findIkConstraint(constraintName: string): IkConstraintData;
        findTransformConstraint(constraintName: string): TransformConstraintData;
        findPathConstraint(constraintName: string): PathConstraintData;
        findPathConstraintIndex(pathConstraintName: string): number;
        addAnimation(ani: Animation): void;
        dispose(): void;
    }
}

declare module spine {
    class SkeletonClipping {
        private triangulator;
        private clippingPolygon;
        private clipOutput;
        clippedVertices: number[];
        clippedTriangles: number[];
        private scratch;
        private clipAttachment;
        private clippingPolygons;
        private _resName;
        constructor(resName: string);
        clipStart(slot: Slot, clip: ClippingAttachment): number;
        clipEndWithSlot(slot: Slot): void;
        clipEnd(): void;
        isClipping(): boolean;
        clipTriangles(vertices: ArrayLike<number>, verticesLength: number, triangles: ArrayLike<number>, trianglesLength: number, uvs: ArrayLike<number>, light: Color, dark: Color, twoColor: boolean): boolean;
        private clip;
        static makeClockwise(polygon: ArrayLike<number>): void;
    }
}

declare module spine {
    class SkeletonBounds {
        minX: number;
        minY: number;
        maxX: number;
        maxY: number;
        boundingBoxes: BoundingBoxAttachment[];
        polygons: ArrayLike<number>[];
        private polygonPool;
        update(skeleton: Skeleton, updateAabb: boolean): void;
        aabbCompute(): void;
        aabbContainsPoint(x: number, y: number): boolean;
        aabbIntersectsSegment(x1: number, y1: number, x2: number, y2: number): boolean;
        aabbIntersectsSkeleton(bounds: SkeletonBounds): boolean;
        containsPoint(x: number, y: number): BoundingBoxAttachment;
        containsPointPolygon(polygon: ArrayLike<number>, x: number, y: number): boolean;
        intersectsSegment(x1: number, y1: number, x2: number, y2: number): BoundingBoxAttachment;
        intersectsSegmentPolygon(polygon: ArrayLike<number>, x1: number, y1: number, x2: number, y2: number): boolean;
        getPolygon(boundingBox: BoundingBoxAttachment): ArrayLike<number>;
        getWidth(): number;
        getHeight(): number;
    }
}

declare module spine {
    class SkeletonBinary {
        static AttachmentTypeValues: number[];
        static TransformModeValues: TransformMode[];
        static PositionModeValues: PositionMode[];
        static SpacingModeValues: SpacingMode[];
        static RotateModeValues: RotateMode[];
        static BlendModeValues: BlendMode[];
        static BONE_ROTATE: number;
        static BONE_TRANSLATE: number;
        static BONE_SCALE: number;
        static BONE_SHEAR: number;
        static SLOT_ATTACHMENT: number;
        static SLOT_COLOR: number;
        static SLOT_TWO_COLOR: number;
        static PATH_POSITION: number;
        static PATH_SPACING: number;
        static PATH_MIX: number;
        static CURVE_LINEAR: number;
        static CURVE_STEPPED: number;
        static CURVE_BEZIER: number;
        scale: number;
        attachmentLoader: AttachmentLoader;
        private linkedMeshes;
        private _isHaveClip;
        get isHaveClip(): boolean;
        constructor(attachmentLoader: AttachmentLoader);
        readSkeletonData(binary: Uint8Array): SkeletonData;
        private readSkin;
        private readAttachment;
        private readVertices;
        private readFloatArray;
        private readShortArray;
        private readUint16Array;
        private readAnimation;
        private readCurve;
        setCurve(timeline: CurveTimeline, frameIndex: number, cx1: number, cy1: number, cx2: number, cy2: number): void;
    }
}

declare module spine {
    class Skeleton {
        data: SkeletonData;
        bones: Array<Bone>;
        slots: Array<Slot>;
        drawOrder: Array<Slot>;
        ikConstraints: Array<IkConstraint>;
        transformConstraints: Array<TransformConstraint>;
        pathConstraints: Array<PathConstraint>;
        _updateCache: Updatable[];
        updateCacheReset: Updatable[];
        skin: Skin;
        color: Color;
        time: number;
        flipX: boolean;
        flipY: boolean;
        x: number;
        y: number;
        constructor(data: SkeletonData);
        updateCache(): void;
        sortIkConstraint(constraint: IkConstraint): void;
        sortPathConstraint(constraint: PathConstraint): void;
        sortTransformConstraint(constraint: TransformConstraint): void;
        sortPathConstraintAttachment(skin: Skin, slotIndex: number, slotBone: Bone): void;
        sortPathConstraintAttachmentWith(attachment: Attachment, slotBone: Bone): void;
        sortBone(bone: Bone): void;
        sortReset(bones: Array<Bone>): void;
        updateWorldTransform(): void;
        setToSetupPose(): void;
        setBonesToSetupPose(): void;
        setSlotsToSetupPose(): void;
        getRootBone(): Bone;
        findBone(boneName: string): Bone;
        findBoneIndex(boneName: string): number;
        findSlot(slotName: string): Slot;
        findSlotIndex(slotName: string): number;
        setSkinByName(skinName: string): void;
        setSkin(newSkin: Skin): void;
        getAttachmentByName(slotName: string, attachmentName: string): Attachment;
        getAttachment(slotIndex: number, attachmentName: string): Attachment;
        setAttachment(slotName: string, attachmentName: string): void;
        findIkConstraint(constraintName: string): IkConstraint;
        findTransformConstraint(constraintName: string): TransformConstraint;
        findPathConstraint(constraintName: string): PathConstraint;
        getBounds(offset: Vector2, size: Vector2, temp: Array<number>): void;
        update(delta: number): void;
        dispose(): void;
    }
}

interface Math {
    fround(n: number): number;
}

declare module spine {
    class EventData {
        name: string;
        intValue: number;
        floatValue: number;
        stringValue: string;
        constructor(name: string);
    }
}

declare module spine {
    class Event {
        data: EventData;
        intValue: number;
        floatValue: number;
        stringValue: string;
        time: number;
        constructor(time: number, data: EventData);
    }
}

declare module spine {
    enum AttachmentType {
        Region = 0,
        BoundingBox = 1,
        Mesh = 2,
        LinkedMesh = 3,
        Path = 4,
        Point = 5,
        Clipping = 6
    }
}

declare module spine {
    class AnimationStateData {
        skeletonData: SkeletonData;
        animationToMixTime: Map<number>;
        defaultMix: number;
        dispose(): void;
        constructor(skeletonData: SkeletonData);
        setMix(fromName: string, toName: string, duration: number): void;
        setMixWith(from: Animation, to: Animation, duration: number): void;
        getMix(from: Animation, to: Animation): number;
    }
}

declare module spine {
    class Animation {
        name: string;
        timelines: Array<Timeline>;
        duration: number;
        eventMap: ds.StringMap<Event>;
        constructor(name: string, timelines: Array<Timeline>, duration: number, eventTimeLine: EventTimeline);
        initEventFrame(eventTimeLine: EventTimeline): void;
        getFreamEvent(frame: number): Event;
        apply(skeleton: Skeleton, lastTime: number, time: number, loop: boolean, events: Array<Event>, alpha: number, pose: MixPose, direction: MixDirection): void;
        static binarySearch(values: ArrayLike<number>, target: number, step?: number): number;
        static linearSearch(values: ArrayLike<number>, target: number, step: number): number;
    }
    interface Timeline {
        apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number, pose: MixPose, direction: MixDirection): void;
        getPropertyId(): number;
    }
    enum MixPose {
        setup = 0,
        current = 1,
        currentLayered = 2
    }
    enum MixDirection {
        in = 0,
        out = 1
    }
    enum TimelineType {
        rotate = 0,
        translate = 1,
        scale = 2,
        shear = 3,
        attachment = 4,
        color = 5,
        deform = 6,
        event = 7,
        drawOrder = 8,
        ikConstraint = 9,
        transformConstraint = 10,
        pathConstraintPosition = 11,
        pathConstraintSpacing = 12,
        pathConstraintMix = 13,
        twoColor = 14
    }
    abstract class CurveTimeline implements Timeline {
        static LINEAR: number;
        static STEPPED: number;
        static BEZIER: number;
        static BEZIER_SIZE: number;
        private curves;
        abstract getPropertyId(): number;
        constructor(frameCount: number);
        getFrameCount(): number;
        setLinear(frameIndex: number): void;
        setStepped(frameIndex: number): void;
        getCurveType(frameIndex: number): number;
        setCurve(frameIndex: number, cx1: number, cy1: number, cx2: number, cy2: number): void;
        getCurvePercent(frameIndex: number, percent: number): number;
        abstract apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number, pose: MixPose, direction: MixDirection): void;
    }
    class RotateTimeline extends CurveTimeline {
        static ENTRIES: number;
        static PREV_TIME: number;
        static PREV_ROTATION: number;
        static ROTATION: number;
        boneIndex: number;
        frames: ArrayLike<number>;
        constructor(frameCount: number);
        getPropertyId(): number;
        setFrame(frameIndex: number, time: number, degrees: number): void;
        apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number, pose: MixPose, direction: MixDirection): void;
    }
    class TranslateTimeline extends CurveTimeline {
        static ENTRIES: number;
        static PREV_TIME: number;
        static PREV_X: number;
        static PREV_Y: number;
        static X: number;
        static Y: number;
        boneIndex: number;
        frames: ArrayLike<number>;
        constructor(frameCount: number);
        getPropertyId(): number;
        setFrame(frameIndex: number, time: number, x: number, y: number): void;
        apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number, pose: MixPose, direction: MixDirection): void;
    }
    class ScaleTimeline extends TranslateTimeline {
        constructor(frameCount: number);
        getPropertyId(): number;
        apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number, pose: MixPose, direction: MixDirection): void;
    }
    class ShearTimeline extends TranslateTimeline {
        constructor(frameCount: number);
        getPropertyId(): number;
        apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number, pose: MixPose, direction: MixDirection): void;
    }
    class ColorTimeline extends CurveTimeline {
        static ENTRIES: number;
        static PREV_TIME: number;
        static PREV_R: number;
        static PREV_G: number;
        static PREV_B: number;
        static PREV_A: number;
        static R: number;
        static G: number;
        static B: number;
        static A: number;
        slotIndex: number;
        frames: ArrayLike<number>;
        constructor(frameCount: number);
        getPropertyId(): number;
        setFrame(frameIndex: number, time: number, r: number, g: number, b: number, a: number): void;
        apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number, pose: MixPose, direction: MixDirection): void;
    }
    class TwoColorTimeline extends CurveTimeline {
        static ENTRIES: number;
        static PREV_TIME: number;
        static PREV_R: number;
        static PREV_G: number;
        static PREV_B: number;
        static PREV_A: number;
        static PREV_R2: number;
        static PREV_G2: number;
        static PREV_B2: number;
        static R: number;
        static G: number;
        static B: number;
        static A: number;
        static R2: number;
        static G2: number;
        static B2: number;
        slotIndex: number;
        frames: ArrayLike<number>;
        constructor(frameCount: number);
        getPropertyId(): number;
        setFrame(frameIndex: number, time: number, r: number, g: number, b: number, a: number, r2: number, g2: number, b2: number): void;
        apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number, pose: MixPose, direction: MixDirection): void;
    }
    class AttachmentTimeline implements Timeline {
        slotIndex: number;
        frames: ArrayLike<number>;
        attachmentNames: Array<string>;
        constructor(frameCount: number);
        getPropertyId(): number;
        getFrameCount(): number;
        setFrame(frameIndex: number, time: number, attachmentName: string): void;
        apply(skeleton: Skeleton, lastTime: number, time: number, events: Array<Event>, alpha: number, pose: MixPose, direction: MixDirection): void;
    }
    class DeformTimeline extends CurveTimeline {
        slotIndex: number;
        attachment: VertexAttachment;
        frames: ArrayLike<number>;
        frameVertices: Array<ArrayLike<number>>;
        constructor(frameCount: number);
        getPropertyId(): number;
        setFrame(frameIndex: number, time: number, vertices: ArrayLike<number>): void;
        apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: Array<Event>, alpha: number, pose: MixPose, direction: MixDirection): void;
    }
    class EventTimeline implements Timeline {
        frames: ArrayLike<number>;
        events: Array<Event>;
        constructor(frameCount: number);
        getPropertyId(): number;
        getFrameCount(): number;
        setFrame(frameIndex: number, event: Event): void;
        apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: Array<Event>, alpha: number, pose: MixPose, direction: MixDirection): void;
    }
    class DrawOrderTimeline implements Timeline {
        frames: ArrayLike<number>;
        drawOrders: Array<Array<number>>;
        constructor(frameCount: number);
        getPropertyId(): number;
        getFrameCount(): number;
        setFrame(frameIndex: number, time: number, drawOrder: Array<number>): void;
        apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: Array<Event>, alpha: number, pose: MixPose, direction: MixDirection): void;
    }
    class IkConstraintTimeline extends CurveTimeline {
        static ENTRIES: number;
        static PREV_TIME: number;
        static PREV_MIX: number;
        static PREV_BEND_DIRECTION: number;
        static MIX: number;
        static BEND_DIRECTION: number;
        ikConstraintIndex: number;
        frames: ArrayLike<number>;
        constructor(frameCount: number);
        getPropertyId(): number;
        setFrame(frameIndex: number, time: number, mix: number, bendDirection: number): void;
        apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: Array<Event>, alpha: number, pose: MixPose, direction: MixDirection): void;
    }
    class TransformConstraintTimeline extends CurveTimeline {
        static ENTRIES: number;
        static PREV_TIME: number;
        static PREV_ROTATE: number;
        static PREV_TRANSLATE: number;
        static PREV_SCALE: number;
        static PREV_SHEAR: number;
        static ROTATE: number;
        static TRANSLATE: number;
        static SCALE: number;
        static SHEAR: number;
        transformConstraintIndex: number;
        frames: ArrayLike<number>;
        constructor(frameCount: number);
        getPropertyId(): number;
        setFrame(frameIndex: number, time: number, rotateMix: number, translateMix: number, scaleMix: number, shearMix: number): void;
        apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: Array<Event>, alpha: number, pose: MixPose, direction: MixDirection): void;
    }
    class PathConstraintPositionTimeline extends CurveTimeline {
        static ENTRIES: number;
        static PREV_TIME: number;
        static PREV_VALUE: number;
        static VALUE: number;
        pathConstraintIndex: number;
        frames: ArrayLike<number>;
        constructor(frameCount: number);
        getPropertyId(): number;
        setFrame(frameIndex: number, time: number, value: number): void;
        apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: Array<Event>, alpha: number, pose: MixPose, direction: MixDirection): void;
    }
    class PathConstraintSpacingTimeline extends PathConstraintPositionTimeline {
        constructor(frameCount: number);
        getPropertyId(): number;
        apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: Array<Event>, alpha: number, pose: MixPose, direction: MixDirection): void;
    }
    class PathConstraintMixTimeline extends CurveTimeline {
        static ENTRIES: number;
        static PREV_TIME: number;
        static PREV_ROTATE: number;
        static PREV_TRANSLATE: number;
        static ROTATE: number;
        static TRANSLATE: number;
        pathConstraintIndex: number;
        frames: ArrayLike<number>;
        constructor(frameCount: number);
        getPropertyId(): number;
        setFrame(frameIndex: number, time: number, rotateMix: number, translateMix: number): void;
        apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: Array<Event>, alpha: number, pose: MixPose, direction: MixDirection): void;
    }
}

declare module spine {
    class AnimationState {
        dispose(): void;
        static emptyAnimation: Animation;
        static SUBSEQUENT: number;
        static FIRST: number;
        static DIP: number;
        static DIP_MIX: number;
        private data;
        private trackEntryArr;
        private events;
        listeners: AnimationStateListener2[];
        private eventQueue;
        private propertyIDs;
        private mixingTo;
        animationsChanged: boolean;
        private timeScale;
        trackEntryPool: Pool<TrackEntry>;
        constructor(data: AnimationStateData);
        setPlayTime(time: number): void;
        update(delta: number): void;
        private updateMixingFrom;
        apply(skeleton: Skeleton): boolean;
        private applyMixingFrom;
        private applyRotateTimeline;
        private queueEvents;
        private clearTracks;
        private clearTrack;
        private setCurrent;
        setAnimation(trackIndex: number, animationName: string, loop: boolean): TrackEntry;
        private setAnimationWith;
        addAnimation(trackIndex: number, animationName: string, loop: boolean, delay: number): TrackEntry;
        private addAnimationWith;
        private setEmptyAnimation;
        private addEmptyAnimation;
        private setEmptyAnimations;
        private expandToIndex;
        private trackEntry;
        private disposeNext;
        _animationsChanged(): void;
        getCurrent(trackIndex: number): TrackEntry;
        addListener(listener: AnimationStateListener2): void;
        removeListener(listener: AnimationStateListener2): void;
        clearListeners(): void;
        clearListenerNotifications(): void;
    }
}

declare module spine {
    interface Map<T> {
        [key: string]: T;
    }
    class IntSet {
        array: number[];
        add(value: number): boolean;
        contains(value: number): boolean;
        remove(value: number): void;
        clear(): void;
    }
    interface Disposable {
        dispose(): void;
    }
    interface Restorable {
        restore(): void;
    }
    class Color {
        r: number;
        g: number;
        b: number;
        a: number;
        static WHITE: Color;
        static RED: Color;
        static GREEN: Color;
        static BLUE: Color;
        static MAGENTA: Color;
        constructor(r?: number, g?: number, b?: number, a?: number);
        set(r: number, g: number, b: number, a: number): this;
        setFromColor(c: Color): this;
        setFromString(hex: string): this;
        add(r: number, g: number, b: number, a: number): this;
        clamp(): this;
        static rgba8888ToColor(color: Color, value: number): void;
        static rgb888ToColor(color: Color, value: number): void;
    }
    class MathUtils {
        static PI: number;
        static PI2: number;
        static radiansToDegrees: number;
        static radDeg: number;
        static degreesToRadians: number;
        static degRad: number;
        static clamp(value: number, min: number, max: number): number;
        static cosDeg(degrees: number): number;
        static sinDeg(degrees: number): number;
        static signum(value: number): number;
        static toInt(x: number): number;
        static cbrt(x: number): number;
        static randomTriangular(min: number, max: number): number;
        static randomTriangularWith(min: number, max: number, mode: number): number;
    }
    abstract class Interpolation {
        protected abstract applyInternal(a: number): number;
        apply(start: number, end: number, a: number): number;
    }
    class Pow extends Interpolation {
        protected power: number;
        constructor(power: number);
        applyInternal(a: number): number;
    }
    class PowOut extends Pow {
        constructor(power: number);
        applyInternal(a: number): number;
    }
    class Utils {
        static SUPPORTS_TYPED_ARRAYS: boolean;
        static arrayCopy<T>(source: ArrayLike<T>, sourceStart: number, dest: ArrayLike<T>, destStart: number, numElements: number): void;
        static setArraySize<T>(array: Array<T>, size: number, value?: any): Array<T>;
        static ensureArrayCapacity<T>(array: Array<T>, size: number, value?: any): Array<T>;
        static newArray<T>(size: number, defaultValue: T): Array<T>;
        static newFloatArray(size: number): ArrayLike<number>;
        static newShortArray(size: number): ArrayLike<number>;
        static toFloatArray(array: Array<number>): number[] | Float32Array;
        static toSinglePrecision(value: number): number;
    }
    class DebugUtils {
        static logBones(skeleton: Skeleton): void;
    }
    class Pool<T> {
        private items;
        private instantiator;
        constructor(instantiator: () => T);
        obtain(): T;
        free(item: T): void;
        freeAll(items: ArrayLike<T>): void;
        clear(): void;
    }
    class Vector2 {
        x: number;
        y: number;
        constructor(x?: number, y?: number);
        set(x: number, y: number): Vector2;
        length(): number;
        normalize(): this;
    }
    class TimeKeeper {
        maxDelta: number;
        framesPerSecond: number;
        delta: number;
        totalTime: number;
        private lastTime;
        private frameCount;
        private frameTime;
        update(): void;
    }
    interface ArrayLike<T> {
        length: number;
        [n: number]: T;
    }
    class WindowedMean {
        values: Array<number>;
        addedValues: number;
        lastValue: number;
        mean: number;
        dirty: boolean;
        constructor(windowSize?: number);
        hasEnoughData(): boolean;
        addValue(value: number): void;
        getMean(): number;
    }
}

declare module spine {
    class AssetManager implements Disposable {
        private pathPrefix;
        private textureLoader;
        private assets;
        private errors;
        private toLoad;
        private loaded;
        constructor(textureLoader: (image: HTMLImageElement) => any, pathPrefix?: string);
        get(path: string): any;
        remove(path: string): void;
        removeAll(): void;
        isLoadingComplete(): boolean;
        getToLoad(): number;
        getLoaded(): number;
        dispose(): void;
        hasErrors(): boolean;
        getErrors(): Map<string>;
    }
}

declare module spine {
    interface AttachmentLoader {
        newRegionAttachment(skin: Skin, name: string, path: string): RegionAttachment;
        newMeshAttachment(skin: Skin, name: string, path: string): MeshAttachment;
        newBoundingBoxAttachment(skin: Skin, name: string): BoundingBoxAttachment;
        newPathAttachment(skin: Skin, name: string): PathAttachment;
        newPointAttachment(skin: Skin, name: string): PointAttachment;
        newClippingAttachment(skin: Skin, name: string): ClippingAttachment;
    }
}

declare module spine {
    class AtlasAttachmentLoader implements AttachmentLoader {
        atlas: TextureAtlas;
        constructor(atlas: TextureAtlas);
        newRegionAttachment(skin: Skin, name: string, path: string): RegionAttachment;
        newMeshAttachment(skin: Skin, name: string, path: string): MeshAttachment;
        newBoundingBoxAttachment(skin: Skin, name: string): BoundingBoxAttachment;
        newPathAttachment(skin: Skin, name: string): PathAttachment;
        newPointAttachment(skin: Skin, name: string): PointAttachment;
        newClippingAttachment(skin: Skin, name: string): ClippingAttachment;
    }
}

declare module spine {
    abstract class Attachment {
        name: string;
        constructor(name: string);
    }
    abstract class VertexAttachment extends Attachment {
        private static nextID;
        id: number;
        bones: Array<number>;
        vertices: ArrayLike<number>;
        worldVerticesLength: number;
        constructor(name: string);
        computeWorldVertices(slot: Slot, start: number, count: number, worldVertices: ArrayLike<number>, offset: number, stride: number): void;
        applyDeform(sourceAttachment: VertexAttachment): boolean;
    }
}

declare module spine {
    class BoundingBoxAttachment extends VertexAttachment {
        color: Color;
        constructor(name: string);
    }
}

declare module spine {
    class ClippingAttachment extends VertexAttachment {
        endSlot: SlotData;
        color: Color;
        constructor(name: string);
    }
}

declare module spine {
    class MeshAttachment extends VertexAttachment {
        region: TextureRegion;
        path: string;
        regionUVs: ArrayLike<number>;
        uvs: ArrayLike<number>;
        triangles: number[];
        color: Color;
        hullLength: number;
        private parentMesh;
        inheritDeform: boolean;
        tempColor: Color;
        width: number;
        height: number;
        edges: Array<number>;
        constructor(name: string);
        updateUVs(): void;
        applyDeform(sourceAttachment: VertexAttachment): boolean;
        getParentMesh(): MeshAttachment;
        setParentMesh(parentMesh: MeshAttachment): void;
    }
}

declare module spine {
    class PathAttachment extends VertexAttachment {
        lengths: Array<number>;
        closed: boolean;
        constantSpeed: boolean;
        color: Color;
        constructor(name: string);
    }
}

declare module spine {
    class PointAttachment extends VertexAttachment {
        x: number;
        y: number;
        rotation: number;
        color: Color;
        constructor(name: string);
        computeWorldPosition(bone: Bone, point: Vector2): Vector2;
        computeWorldRotation(bone: Bone): number;
    }
}

declare module spine {
    class RegionAttachment extends Attachment {
        static OX1: number;
        static OY1: number;
        static OX2: number;
        static OY2: number;
        static OX3: number;
        static OY3: number;
        static OX4: number;
        static OY4: number;
        static X1: number;
        static Y1: number;
        static C1R: number;
        static C1G: number;
        static C1B: number;
        static C1A: number;
        static U1: number;
        static V1: number;
        static X2: number;
        static Y2: number;
        static C2R: number;
        static C2G: number;
        static C2B: number;
        static C2A: number;
        static U2: number;
        static V2: number;
        static X3: number;
        static Y3: number;
        static C3R: number;
        static C3G: number;
        static C3B: number;
        static C3A: number;
        static U3: number;
        static V3: number;
        static X4: number;
        static Y4: number;
        static C4R: number;
        static C4G: number;
        static C4B: number;
        static C4A: number;
        static U4: number;
        static V4: number;
        x: number;
        y: number;
        scaleX: number;
        scaleY: number;
        rotation: number;
        width: number;
        height: number;
        color: Color;
        path: string;
        rendererObject: any;
        region: TextureRegion;
        offset: ArrayLike<number>;
        uvs: ArrayLike<number>;
        tempColor: Color;
        constructor(name: string);
        updateOffset(): void;
        setRegion(region: TextureRegion): void;
        computeWorldVertices(bone: Bone, worldVertices: ArrayLike<number>, offset: number, stride: number): void;
    }
}

declare module spine {
    class Bone implements Updatable {
        data: BoneData;
        skeleton: Skeleton;
        parent: Bone;
        children: Bone[];
        x: number;
        y: number;
        rotation: number;
        scaleX: number;
        scaleY: number;
        shearX: number;
        shearY: number;
        ax: number;
        ay: number;
        arotation: number;
        ascaleX: number;
        ascaleY: number;
        ashearX: number;
        ashearY: number;
        appliedValid: boolean;
        a: number;
        b: number;
        worldX: number;
        c: number;
        d: number;
        worldY: number;
        sorted: boolean;
        constructor(data: BoneData, skeleton: Skeleton, parent: Bone);
        update(): void;
        updateWorldTransform(): void;
        updateWorldTransformWith(x: number, y: number, rotation: number, scaleX: number, scaleY: number, shearX: number, shearY: number): void;
        setToSetupPose(): void;
        getWorldRotationX(): number;
        getWorldRotationY(): number;
        getWorldScaleX(): number;
        getWorldScaleY(): number;
        updateAppliedTransform(): void;
        worldToLocal(world: Vector2): Vector2;
        localToWorld(local: Vector2): Vector2;
        worldToLocalRotation(worldRotation: number): number;
        localToWorldRotation(localRotation: number): number;
        rotateWorld(degrees: number): void;
    }
}

declare module spine {
    class IkConstraint implements Constraint {
        data: IkConstraintData;
        bones: Array<Bone>;
        target: Bone;
        mix: number;
        bendDirection: number;
        constructor(data: IkConstraintData, skeleton: Skeleton);
        getOrder(): number;
        apply(): void;
        update(): void;
        apply1(bone: Bone, targetX: number, targetY: number, alpha: number): void;
        apply2(parent: Bone, child: Bone, targetX: number, targetY: number, bendDir: number, alpha: number): void;
    }
}

declare module spine {
    class IkConstraintData {
        name: string;
        order: number;
        bones: BoneData[];
        target: BoneData;
        bendDirection: number;
        mix: number;
        constructor(name: string);
    }
}

declare module spine {
    class PathConstraint implements Constraint {
        static NONE: number;
        static BEFORE: number;
        static AFTER: number;
        static epsilon: number;
        data: PathConstraintData;
        bones: Array<Bone>;
        target: Slot;
        position: number;
        spacing: number;
        rotateMix: number;
        translateMix: number;
        spaces: number[];
        positions: number[];
        world: number[];
        curves: number[];
        lengths: number[];
        segments: number[];
        constructor(data: PathConstraintData, skeleton: Skeleton);
        apply(): void;
        update(): void;
        computeWorldPositions(path: PathAttachment, spacesCount: number, tangents: boolean, percentPosition: boolean, percentSpacing: boolean): number[];
        addBeforePosition(p: number, temp: Array<number>, i: number, out: Array<number>, o: number): void;
        addAfterPosition(p: number, temp: Array<number>, i: number, out: Array<number>, o: number): void;
        addCurvePosition(p: number, x1: number, y1: number, cx1: number, cy1: number, cx2: number, cy2: number, x2: number, y2: number, out: Array<number>, o: number, tangents: boolean): void;
        getOrder(): number;
    }
}

declare module spine {
    class SharedAssetManager implements Disposable {
        private pathPrefix;
        private clientAssets;
        private queuedAssets;
        private rawAssets;
        private errors;
        constructor(pathPrefix?: string);
        private queueAsset;
        loadText(clientId: string, path: string): void;
        loadJson(clientId: string, path: string): void;
        loadTexture(clientId: string, textureLoader: (image: HTMLImageElement) => any, path: string): void;
        loadBinary(clientId: string, path: string): void;
        get(clientId: string, path: string): any;
        private updateClientAssets;
        isLoadingComplete(clientId: string): boolean;
        dispose(): void;
        hasErrors(): boolean;
        getErrors(): string;
    }
}

declare module spine {
    abstract class Texture {
        protected _image: HTMLImageElement;
        constructor(image: HTMLImageElement);
        getImage(): HTMLImageElement;
        abstract setFilters(minFilter: TextureFilter, magFilter: TextureFilter): void;
        abstract setWraps(uWrap: TextureWrap, vWrap: TextureWrap): void;
        abstract dispose(): void;
        static filterFromString(text: string): TextureFilter;
        static wrapFromString(text: string): TextureWrap;
    }
    enum TextureFilter {
        Nearest = 9728,
        Linear = 9729,
        MipMap = 9987,
        MipMapNearestNearest = 9984,
        MipMapLinearNearest = 9985,
        MipMapNearestLinear = 9986,
        MipMapLinearLinear = 9987
    }
    enum TextureWrap {
        MirroredRepeat = 33648,
        ClampToEdge = 33071,
        Repeat = 10497
    }
    class TextureRegion {
        renderObject: any;
        u: number;
        v: number;
        u2: number;
        v2: number;
        width: number;
        height: number;
        rotate: boolean;
        offsetX: number;
        offsetY: number;
        originalWidth: number;
        originalHeight: number;
    }
}

declare module spine {
    class TextureAtlas implements Disposable {
        pages: TextureAtlasPage[];
        regions: TextureAtlasRegion[];
        constructor(atlasText: string, textureLoader: (path: string) => any);
        private load;
        findRegion(name: string): TextureAtlasRegion;
        dispose(): void;
    }
    class TextureAtlasPage {
        name: string;
        minFilter: TextureFilter;
        magFilter: TextureFilter;
        uWrap: TextureWrap;
        vWrap: TextureWrap;
        texture: Texture;
        width: number;
        height: number;
    }
    class TextureAtlasRegion extends TextureRegion {
        page: TextureAtlasPage;
        name: string;
        x: number;
        y: number;
        index: number;
        rotate: boolean;
        texture: Texture;
    }
}

declare module spine {
    class TransformConstraint implements Constraint {
        data: TransformConstraintData;
        bones: Array<Bone>;
        target: Bone;
        rotateMix: number;
        translateMix: number;
        scaleMix: number;
        shearMix: number;
        temp: Vector2;
        constructor(data: TransformConstraintData, skeleton: Skeleton);
        apply(): void;
        update(): void;
        applyAbsoluteWorld(): void;
        applyRelativeWorld(): void;
        applyAbsoluteLocal(): void;
        applyRelativeLocal(): void;
        getOrder(): number;
    }
}

declare module spine {
    class TransformConstraintData {
        name: string;
        order: number;
        bones: BoneData[];
        target: BoneData;
        rotateMix: number;
        translateMix: number;
        scaleMix: number;
        shearMix: number;
        offsetRotation: number;
        offsetX: number;
        offsetY: number;
        offsetScaleX: number;
        offsetScaleY: number;
        offsetShearY: number;
        relative: boolean;
        local: boolean;
        constructor(name: string);
    }
}

declare module spine {
    class JitterEffect implements VertexEffect {
        jitterX: number;
        jitterY: number;
        constructor(jitterX: number, jitterY: number);
        begin(skeleton: Skeleton): void;
        transform(position: Vector2, uv: Vector2, light: Color, dark: Color): void;
        end(): void;
    }
}

declare module spine {
    class SwirlEffect implements VertexEffect {
        static interpolation: PowOut;
        centerX: number;
        centerY: number;
        radius: number;
        angle: number;
        private worldX;
        private worldY;
        constructor(radius: number);
        begin(skeleton: Skeleton): void;
        transform(position: Vector2, uv: Vector2, light: Color, dark: Color): void;
        end(): void;
    }
}

declare module spine.webgl {
    class AssetManager extends spine.AssetManager {
        constructor(context: ManagedWebGLRenderingContext | WebGLRenderingContext, pathPrefix?: string);
    }
}

declare module spine.webgl {
    class GLTexture extends Texture implements Disposable, Restorable {
        private context;
        private texture;
        private boundUnit;
        private useMipMaps;
        constructor(context: ManagedWebGLRenderingContext | WebGLRenderingContext, image: HTMLImageElement, useMipMaps?: boolean);
        setFilters(minFilter: TextureFilter, magFilter: TextureFilter): void;
        setWraps(uWrap: TextureWrap, vWrap: TextureWrap): void;
        update(useMipMaps: boolean): void;
        restore(): void;
        bind(unit?: number): void;
        unbind(): void;
        dispose(): void;
    }
}

declare module spine.webgl {
    class Mesh implements Disposable, Restorable {
        private attributes;
        private context;
        private vertices;
        private verticesBuffer;
        private verticesLength;
        private dirtyVertices;
        private indices;
        private indicesBuffer;
        private indicesLength;
        private dirtyIndices;
        private elementsPerVertex;
        getAttributes(): VertexAttribute[];
        maxVertices(): number;
        numVertices(): number;
        setVerticesLength(length: number): void;
        getVertices(): Float32Array;
        maxIndices(): number;
        numIndices(): number;
        setIndicesLength(length: number): void;
        getIndices(): Uint16Array;
        getVertexSizeInFloats(): number;
        constructor(context: ManagedWebGLRenderingContext | WebGLRenderingContext, attributes: VertexAttribute[], maxVertices: number, maxIndices: number);
        setVertices(vertices: Array<number>): void;
        setIndices(indices: Array<number>): void;
        draw(shader: Shader, primitiveType: number): void;
        drawWithOffset(shader: Shader, primitiveType: number, offset: number, count: number): void;
        bind(shader: Shader): void;
        unbind(shader: Shader): void;
        private update;
        restore(): void;
        dispose(): void;
    }
    class VertexAttribute {
        name: string;
        type: VertexAttributeType;
        numElements: number;
        constructor(name: string, type: VertexAttributeType, numElements: number);
    }
    class Position2Attribute extends VertexAttribute {
        constructor();
    }
    class Position3Attribute extends VertexAttribute {
        constructor();
    }
    class TexCoordAttribute extends VertexAttribute {
        constructor(unit?: number);
    }
    class ColorAttribute extends VertexAttribute {
        constructor();
    }
    class Color2Attribute extends VertexAttribute {
        constructor();
    }
    enum VertexAttributeType {
        Float = 0
    }
}

declare module spine.webgl {
    class PolygonBatcher implements Disposable {
        private context;
        private drawCalls;
        private isDrawing;
        private mesh;
        private shader;
        private lastTexture;
        private verticesLength;
        private indicesLength;
        private srcBlend;
        private dstBlend;
        constructor(context: ManagedWebGLRenderingContext | WebGLRenderingContext, twoColorTint?: boolean, maxVertices?: number);
        begin(shader: Shader): void;
        setBlendMode(srcBlend: number, dstBlend: number): void;
        draw(texture: GLTexture, vertices: ArrayLike<number>, indices: Array<number>): void;
        private flush;
        end(): void;
        getDrawCalls(): number;
        dispose(): void;
    }
}

declare module spine.webgl {
    class SceneRenderer implements Disposable {
        context: ManagedWebGLRenderingContext;
        canvas: HTMLCanvasElement;
        camera: OrthoCamera;
        batcher: PolygonBatcher;
        private twoColorTint;
        private batcherShader;
        private shapes;
        private shapesShader;
        private activeRenderer;
        skeletonRenderer: SkeletonRenderer;
        skeletonDebugRenderer: SkeletonDebugRenderer;
        private QUAD;
        private QUAD_TRIANGLES;
        private WHITE;
        constructor(canvas: HTMLCanvasElement, context: ManagedWebGLRenderingContext | WebGLRenderingContext, twoColorTint?: boolean);
        begin(): void;
        drawSkeleton(skeleton: Skeleton, premultipliedAlpha?: boolean, slotRangeStart?: number, slotRangeEnd?: number): void;
        drawSkeletonDebug(skeleton: Skeleton, premultipliedAlpha?: boolean, ignoredBones?: Array<string>): void;
        drawTexture(texture: GLTexture, x: number, y: number, width: number, height: number, color?: Color): void;
        drawTextureUV(texture: GLTexture, x: number, y: number, width: number, height: number, u: number, v: number, u2: number, v2: number, color?: Color): void;
        drawTextureRotated(texture: GLTexture, x: number, y: number, width: number, height: number, pivotX: number, pivotY: number, angle: number, color?: Color, premultipliedAlpha?: boolean): void;
        drawRegion(region: TextureAtlasRegion, x: number, y: number, width: number, height: number, color?: Color, premultipliedAlpha?: boolean): void;
        line(x: number, y: number, x2: number, y2: number, color?: Color, color2?: Color): void;
        triangle(filled: boolean, x: number, y: number, x2: number, y2: number, x3: number, y3: number, color?: Color, color2?: Color, color3?: Color): void;
        quad(filled: boolean, x: number, y: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, color?: Color, color2?: Color, color3?: Color, color4?: Color): void;
        rect(filled: boolean, x: number, y: number, width: number, height: number, color?: Color): void;
        rectLine(filled: boolean, x1: number, y1: number, x2: number, y2: number, width: number, color?: Color): void;
        polygon(polygonVertices: ArrayLike<number>, offset: number, count: number, color?: Color): void;
        circle(filled: boolean, x: number, y: number, radius: number, color?: Color, segments?: number): void;
        curve(x1: number, y1: number, cx1: number, cy1: number, cx2: number, cy2: number, x2: number, y2: number, segments: number, color?: Color): void;
        end(): void;
        resize(resizeMode: ResizeMode): void;
        private enableRenderer;
        dispose(): void;
    }
    enum ResizeMode {
        Stretch = 0,
        Expand = 1,
        Fit = 2
    }
}

declare module spine.webgl {
    class Shader implements Disposable, Restorable {
        private vertexShader;
        private fragmentShader;
        static MVP_MATRIX: string;
        static POSITION: string;
        static COLOR: string;
        static COLOR2: string;
        static TEXCOORDS: string;
        static SAMPLER: string;
        private context;
        private vs;
        private vsSource;
        private fs;
        private fsSource;
        private program;
        private tmp2x2;
        private tmp3x3;
        private tmp4x4;
        getProgram(): WebGLProgram;
        getVertexShader(): string;
        getFragmentShader(): string;
        getVertexShaderSource(): string;
        getFragmentSource(): string;
        constructor(context: ManagedWebGLRenderingContext | WebGLRenderingContext, vertexShader: string, fragmentShader: string);
        private compile;
        private compileShader;
        private compileProgram;
        restore(): void;
        bind(): void;
        unbind(): void;
        setUniformi(uniform: string, value: number): void;
        setUniformf(uniform: string, value: number): void;
        setUniform2f(uniform: string, value: number, value2: number): void;
        setUniform3f(uniform: string, value: number, value2: number, value3: number): void;
        setUniform4f(uniform: string, value: number, value2: number, value3: number, value4: number): void;
        setUniform2x2f(uniform: string, value: ArrayLike<number>): void;
        setUniform3x3f(uniform: string, value: ArrayLike<number>): void;
        setUniform4x4f(uniform: string, value: ArrayLike<number>): void;
        getUniformLocation(uniform: string): WebGLUniformLocation;
        getAttributeLocation(attribute: string): number;
        dispose(): void;
        static newColoredTextured(context: ManagedWebGLRenderingContext | WebGLRenderingContext): Shader;
        static newTwoColoredTextured(context: ManagedWebGLRenderingContext | WebGLRenderingContext): Shader;
        static newColored(context: ManagedWebGLRenderingContext | WebGLRenderingContext): Shader;
    }
}

declare module spine.webgl {
    class ShapeRenderer implements Disposable {
        private context;
        private isDrawing;
        private mesh;
        private shapeType;
        private color;
        private shader;
        private vertexIndex;
        private tmp;
        private srcBlend;
        private dstBlend;
        constructor(context: ManagedWebGLRenderingContext | WebGLRenderingContext, maxVertices?: number);
        begin(shader: Shader): void;
        setBlendMode(srcBlend: number, dstBlend: number): void;
        setColor(color: Color): void;
        setColorWith(r: number, g: number, b: number, a: number): void;
        point(x: number, y: number, color?: Color): void;
        line(x: number, y: number, x2: number, y2: number, color?: Color): void;
        triangle(filled: boolean, x: number, y: number, x2: number, y2: number, x3: number, y3: number, color?: Color, color2?: Color, color3?: Color): void;
        quad(filled: boolean, x: number, y: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, color?: Color, color2?: Color, color3?: Color, color4?: Color): void;
        rect(filled: boolean, x: number, y: number, width: number, height: number, color?: Color): void;
        rectLine(filled: boolean, x1: number, y1: number, x2: number, y2: number, width: number, color?: Color): void;
        x(x: number, y: number, size: number): void;
        polygon(polygonVertices: ArrayLike<number>, offset: number, count: number, color?: Color): void;
        circle(filled: boolean, x: number, y: number, radius: number, color?: Color, segments?: number): void;
        curve(x1: number, y1: number, cx1: number, cy1: number, cx2: number, cy2: number, x2: number, y2: number, segments: number, color?: Color): void;
        private vertex;
        end(): void;
        private flush;
        private check;
        dispose(): void;
    }
    enum ShapeType {
        Point = 0,
        Line = 1,
        Filled = 4
    }
}

declare module spine.webgl {
    class SkeletonDebugRenderer implements Disposable {
        boneLineColor: Color;
        boneOriginColor: Color;
        attachmentLineColor: Color;
        triangleLineColor: Color;
        pathColor: Color;
        clipColor: Color;
        aabbColor: Color;
        drawBones: boolean;
        drawRegionAttachments: boolean;
        drawBoundingBoxes: boolean;
        drawMeshHull: boolean;
        drawMeshTriangles: boolean;
        drawPaths: boolean;
        drawSkeletonXY: boolean;
        drawClipping: boolean;
        premultipliedAlpha: boolean;
        scale: number;
        boneWidth: number;
        private context;
        private bounds;
        private temp;
        private vertices;
        private static LIGHT_GRAY;
        private static GREEN;
        constructor(context: ManagedWebGLRenderingContext | WebGLRenderingContext);
        draw(shapes: ShapeRenderer, skeleton: Skeleton, ignoredBones?: Array<string>): void;
        dispose(): void;
    }
}

declare module spine {
    class StringMap<T> {
        private _map;
        private _length;
        constructor();
        getValue(key: string | number): T;
        get(key: string | number): T;
        put(key: string | number, value: T): T;
        isEmpty(): boolean;
        containsKey(key: string | number): boolean;
        remove(key: string | number): T;
        getKeys(): string[];
        containsValue(value: T): boolean;
        size(): number;
        clear(): void;
        toString(): string;
        _private_foreachKey(caller: any, func: Function): void;
        _private_foreachValue(caller: any, func: Function): void;
    }
}

declare module spine {
    class SpineStat {
        static rendNum: number;
    }
}

declare module spine {
    class FlyRender {
        private static _ins;
        private _timeKeeper;
        static get ins(): FlyRender;
        private _renderArr;
        private _renderMap;
        private _isRender;
        private _gapNum;
        constructor();
        start(): void;
        stop(): void;
        tick: () => void;
        addRender(spine: SpineSkeleton): void;
        remove(skel: SpineSkeleton): void;
        getRenderCnt(): number;
    }
}

declare module spine {
    class TrackEntry {
        tracekName: string;
        animation: Animation;
        next: TrackEntry;
        mixingFrom: TrackEntry;
        listener: AnimationStateListener2;
        trackIndex: number;
        loop: boolean;
        eventThreshold: number;
        attachmentThreshold: number;
        drawOrderThreshold: number;
        animationStart: number;
        animationEnd: number;
        animationLast: number;
        nextAnimationLast: number;
        delay: number;
        trackTime: number;
        trackLast: number;
        nextTrackLast: number;
        trackEnd: number;
        timeScale: number;
        alpha: number;
        mixTime: number;
        mixDuration: number;
        interruptAlpha: number;
        totalAlpha: number;
        timelineData: number[];
        timelineDipMix: TrackEntry[];
        timelinesRotation: number[];
        constructor();
        reset(): void;
        setTimelineData(to: TrackEntry, mixingToArray: Array<TrackEntry>, propertyIDs: IntSet): TrackEntry;
        hasTimeline(id: number): boolean;
        getAnimationTime(): number;
        setAnimationLast(animationLast: number): void;
        isComplete(): boolean;
        resetRotationDirections(): void;
    }
}

declare module spine {
    enum EventType {
        start = 0,
        interrupt = 1,
        end = 2,
        dispose = 3,
        complete = 4,
        event = 5
    }
}

declare module spine {
    class EventQueue {
        objects: Array<any>;
        drainDisabled: boolean;
        animState: AnimationState;
        constructor(animState: AnimationState);
        start(entry: TrackEntry): void;
        interrupt(entry: TrackEntry): void;
        end(entry: TrackEntry): void;
        dispose(entry: TrackEntry): void;
        complete(entry: TrackEntry): void;
        event(entry: TrackEntry, event: Event): void;
        drain(): void;
        clear(): void;
    }
}

declare module spine {
    class TempletMgr {
        private static _instance;
        static get instance(): TempletMgr;
        private _cacheDic;
        private _loadingDic;
        private _templeteDic;
        constructor();
        loadSekl(resName: string, callBack: CallBack): void;
        private parseComplete;
        private onError;
        private onLoadComplete;
        buildPLayer(resName: string): spine.SpineSkeleton;
        relasePLayer(item: spine.SpineSkeleton): void;
        createPlayer(): void;
        getTemplete(resName: string): BaseTemplete;
        getAniDurationByAniName(resName: string, aniName: string): number;
        disposeTemplet(url: string): void;
        checkFreeTempltet(): string[];
        getTempleteCnt(): number;
    }
}

declare module spine {
    class SpineSkeletonRenderer {
        vertexEffect: any;
        tempColor: Color;
        tempColor2: Color;
        vertexSize: number;
        twoColorTint: boolean;
        renderable: Renderable;
        clipper: SkeletonClipping;
        temp: Vector2;
        temp2: Vector2;
        temp3: Color;
        temp4: Color;
        vertices: ArrayLike<number>;
        premultipliedAlpha: any;
        static QUAD_TRIANGLES: any;
        private _resName;
        constructor(resName: string, twoColorTint?: boolean);
        dispose(): void;
        draw(skeleton: any, slotRangeStart: number, slotRangeEnd: number, spineSkeletonIns: any, textureList: ds.StringMap<SpineGLTexture>): void;
        drawTriangles(target: Laya.Graphics, texture: laya.resource.Texture, x: number, y: number, vertices: Float32Array, uvs: Float32Array, indices: Uint16Array, matrix?: laya.maths.Matrix, alpha?: number, color?: string, blendMode?: string, colorNum?: number): Laya.DrawTrianglesCmd;
    }
}

declare module spine {
    class Renderable {
        vertices: ArrayLike<number>;
        numVertices: number;
        numFloats: number;
        constructor(vertices: ArrayLike<number>, numVertices: number, numFloats: number);
    }
}

declare module spine {
    class ConchSpineSkeletonRenderer {
        _nativeObj: any;
        constructor(twoColorTint?: boolean);
        get premultipliedAlpha(): any;
        set premultipliedAlpha(value: any);
        draw(skeleton: any, slotRangeStart: number, slotRangeEnd: number, spineSkeletonIns: any, textureList: any): void;
    }
}

declare module spine {
    interface ISkelPlayer {
        setRes(value: string): void;
        stop(): void;
        isPause(): boolean;
        pause(bPause: boolean): void;
        play(name: string, isLoop?: boolean, force?: boolean, userCache?: boolean): void;
        playByIndex(index: number, isLoop?: boolean, force?: boolean, userCache?: boolean): void;
        getActionDuration(aniName: string): number;
        releaseSkel(): void;
        isResReady(): boolean;
        playbackRate(value: number): any;
        alpha: number;
        x: number;
        y: number;
        flipX: boolean;
        flipY: boolean;
        hasListener(type: string): boolean;
        event(type: string, data?: any): boolean;
        on(type: string, caller: any, listener: Function, args?: any[]): Laya.EventDispatcher;
        once(type: string, caller: any, listener: Function, args?: any[]): Laya.EventDispatcher;
        off(type: string, caller: any, listener: Function, onceOnly?: boolean): Laya.EventDispatcher;
        offAll(type?: string): Laya.EventDispatcher;
        offAllCaller(caller: any): Laya.EventDispatcher;
        isMouseEvent(type: string): boolean;
        isHaveClip(): boolean;
    }
}

declare module spine {
    interface ISkelLayer {
        addSkel(node: ISkelPlayer): void;
        addSkelAt(value: ISkelPlayer, index: number): void;
        removeSkel(node: ISkelPlayer): ISkelPlayer;
    }
}


declare module spine {
    class FlypineSetting {
        static GLOB_SPEED_SCALE: number;
        static IS_LAYA_ONE: boolean;
        static isOpenBlend: boolean;
        static isOpenClipping: boolean;
        static isUseFlySK: boolean;
        static onFrameTime: number;
        static skelFrameRate: number;
        static frameTimeScend: number;
        static skelFrameTime: number;
        static noLoopOnClip: boolean;
        static renderGap: number;
        static clipReturn: boolean;
        constructor();
        static setSkelFrameRate(value: number): void;
        static timeToFrame(time: number): number;
    }
}

declare module spine {
    class FlypineEvent {
        static SKEL_COMPLETE: string;
        static START: string;
        static END: string;
        static COMPLETE: string;
        static EVENT: string;
        static DISPOSE: string;
        static INTERRUPT: string;
        constructor();
    }
}


declare module spine {
    class CallBack {
        private caller;
        private func;
        constructor(caller: any, func: Function);
        call(args?: any[]): void;
    }
}

declare module spine.utils {
    class ByteArray {
        classDic: Object;
        static BIG_ENDIAN: string;
        static LITTLE_ENDIAN: string;
        private _length;
        private _objectEncoding_;
        private _position_;
        private _allocated_;
        private _data_;
        private _littleEndian_;
        _byteView_: any;
        constructor();
        clear(): void;
        ensureWrite(lengthToEnsure: number): void;
        readBoolean(): boolean;
        readBytes(bytes: ByteArray, offset?: number, length?: number): void;
        readByte_tmp(offset?: number, length?: number): Uint8Array;
        readByte_new(offset?: number, length?: number): ArrayBuffer;
        readDouble(): number;
        readFloat(): number;
        private readFullBytes;
        readInt(): number;
        readShort(): number;
        readUnsignedByte(): number;
        readByte(): number;
        readUnsignedInt(): number;
        readUnsignedShort(): number;
        readUTF(): string;
        readUnicode(length: number): string;
        readMultiByte(length: number, charSet: string): string;
        readUTFBytes(len?: number): string;
        toString(): string;
        writeBoolean(value: boolean): void;
        writeByte(value: number): void;
        writeBytes(bytes: ByteArray, offset?: number, length?: number): void;
        writeArrayBuffer(arraybuffer: any, offset?: number, length?: number): void;
        writeDouble(x: number): void;
        writeFloat(x: number): void;
        writeInt(value: number): void;
        writeShort(value: number): void;
        writeUnsignedInt(value: number): void;
        writeUnsignedShort(value: number): void;
        writeUTF(value: string): void;
        writeUnicode(value: string): void;
        writeMultiByte(value: string, charSet: string): void;
        writeUTFBytes(value: string): void;
        private __fromBytes;
        __get(pos: number): number;
        private _getUTFBytesCount;
        _byteAt_(index: number): number;
        _byteSet_(index: number, value: any): void;
        uncompress(algorithm?: string): void;
        compress(algorithm?: string): void;
        private ___resizeBuffer;
        __getBuffer(): ArrayBuffer;
        __set(pos: number, v: number): void;
        static __ofBuffer(buffer: any): ByteArray;
        setUint8Array(data: any): void;
        getUint8Array(): Uint8Array;
        get bytesAvailable(): number;
        get endian(): string;
        set endian(endianStr: string);
        set length(value: number);
        get length(): number;
        get position(): number;
        set position(value: number);
        get pos(): number;
        set pos(pos: number);
        static UNDEFINED_TYPE: number;
        static NULL_TYPE: number;
        static FALSE_TYPE: number;
        static TRUE_TYPE: number;
        static INTEGER_TYPE: number;
        static DOUBLE_TYPE: number;
        static STRING_TYPE: number;
        static XML_TYPE: number;
        static DATE_TYPE: number;
        static ARRAY_TYPE: number;
        static OBJECT_TYPE: number;
        static AVMPLUSXML_TYPE: number;
        static BYTEARRAY_TYPE: number;
        static EMPTY_STRING: string;
        private _strTable;
        private _objTable;
        private _traitsTable;
        static UINT29_MASK: number;
        static INT28_MAX_VALUE: number;
        static INT28_MIN_VALUE: number;
        readObject(): any;
        private readObject2;
        private readObjectValue;
        readByteArray(): ByteArray;
        readInterger(): number;
        private getStrRef;
        private getObjRef;
        private __readString;
        private readTraits;
        protected readScriptObject(): Object;
        protected readArray(): Object;
        protected readUInt29(): number;
        writeObject(o: any): void;
        writeObject2(o: any): void;
        protected writeAMFNull(): void;
        protected writeAMFString(s: string): void;
        protected writeStringWithoutType(s: string): void;
        protected writeAMFInt(i: number): void;
        protected writeAMFDouble(d: number): void;
        protected writeAMFBoolean(b: boolean): void;
        protected writeCustomObject(o: Object): void;
        static getTraitsInfoRef(arr: Array<any>, ti: Object): number;
        static equalsTraitsInfo(ti1: any, ti2: any): boolean;
        private getAliasByObj;
        protected writeArray(value: Array<any>): void;
        protected writeAMFByteArray(ba: ByteArray): void;
        protected writeMapAsECMAArray(o: Object): void;
        protected writeUInt29(ref: number): void;
        protected getTraitReference(ref: number): any;
    }
}

declare module spine {
    class SkelLayaLayer extends Laya.Sprite implements ISkelLayer {
        constructor();
        addSkel(node: ISkelPlayer): void;
        addSkelAt(value: ISkelPlayer, index: number): void;
        removeSkel(node: ISkelPlayer): ISkelPlayer;
    }
}



declare module spine {
    class BaseTemplete extends Laya.Resource {
        private _textureMap;
        protected _isDestroyed: boolean;
        protected _layaPremultipliedAlpha: boolean;
        _spinePremultipliedAlpha: boolean;
        skeletonData: SkeletonData;
        resName: string;
        private _pool;
        private _poolInfo;
        get textureMap(): ds.StringMap<SpineGLTexture>;
        constructor(resName: string, layaPremultipliedAlpha?: boolean, spinePremultipliedAlpha?: boolean);
        buildArmature(): SpineSkeleton;
        releasePlayer(item: SpineSkeleton): void;
        getAniNameByIndex(index: any): string;
        getAniDurationByAniName(aniName: string): number;
        getAniNameArr(): string[];
        getSkinIndexByName(skinName: any): number;
        isHaveClip(): boolean;
        destroy(): void;
        isFree(): boolean;
    }
}

declare module spine {
    class SpineGLTexture extends Laya.Texture {
        constructor(tex: Laya.Texture2D);
        getImage(): {
            width: number;
            height: number;
        };
        setFilters(minFilter: any, magFilter: any): void;
        setWraps(uWrap: any, vWrap: any): void;
    }
}

declare module spine {
    class SpineSkeleton extends Laya.Sprite implements common.Ipool {
        static stopped: number;
        static paused: number;
        static playing: number;
        pause: boolean;
        private _currAnimation;
        private _loop;
        private _userCahce;
        poolSign: common.PoolSign;
        private _currAniName;
        private _currentClipIndex;
        private _playbackRate;
        private _templet;
        private skeleton;
        private stateData;
        private state;
        private skeletonRenderer;
        private _maxFrame;
        resName: string;
        private renderGap;
        private _defaultGraphics;
        constructor();
        get isFree(): boolean;
        setTimeScale(value: number): void;
        init(templet: BaseTemplete): void;
        playByIndex(aniIndex: number, loop: boolean, force: boolean, cache: boolean): void;
        play(aniName: string, loop: boolean, force: boolean, cache: boolean): void;
        startPlay(): void;
        stopPlay(): void;
        renderUpdate(gap: number): void;
        stopTo(frame: number): void;
        private _gapNum;
        private _update;
        renderFrame(): void;
        private updateFrame;
        private isNeedRender;
        getAnimNum(): number;
        private getAniNameByIndex;
        private getSlotByName;
        playbackRate(value: any): void;
        private showSkinByName;
        private showSkinByIndex;
        stop(): void;
        paused(): void;
        resume(): void;
        dispose(): void;
        get templet(): BaseTemplete;
        get playState(): number;
        getAniNameArr(): string[];
        isHaveClip(): boolean;
        release(): void;
        reset(): void;
        destroy(): void;
    }
}

declare module spine {
    class SpineTemplet extends BaseTemplete {
        private _skeletonBinary;
        private _byteData;
        private _atlasText;
        private _isPngComplete;
        private _browserImg;
        private _textName;
        constructor(resName: string, layaPremultipliedAlpha?: boolean, spinePremultipliedAlpha?: boolean);
        loadFlySk(resName: string): void;
        loadPvr(resName: string): void;
        private loadImg;
        private onImgLoad;
        loadSkel(skelUrl: string): void;
        private loadBinary;
        private loadText;
        private loadTexture;
        private textureLoader;
        private checkComplete;
        private parseSpineAni;
        destroy(): void;
    }
}

declare module spine {
    interface AnimationStateListener2 {
        start(entry: TrackEntry): void;
        interrupt(entry: TrackEntry): void;
        end(entry: TrackEntry): void;
        dispose(entry: TrackEntry): void;
        complete(entry: TrackEntry): void;
        event(entry: TrackEntry, event: Event): void;
    }
}

declare module spine {
    abstract class AnimationStateAdapter2 implements AnimationStateListener2 {
        start(entry: TrackEntry): void;
        interrupt(entry: TrackEntry): void;
        end(entry: TrackEntry): void;
        dispose(entry: TrackEntry): void;
        complete(entry: TrackEntry): void;
        event(entry: TrackEntry, event: Event): void;
    }
}

declare module spine {
    interface Constraint extends Updatable {
        getOrder(): number;
    }
}


declare module Public {
    class UIAdaptive {
        fitX: boolean;
        fitY: boolean;
        private fitPerfect;
        constructor();
    }
}

declare module Public.RegUtils {
    function checkEmail(strEmail: any): boolean;
    function isIP(strIP: any): boolean;
    function checkMobile(strMobile: any): boolean;
    function checkPhone(strPhone: any): boolean;
    function isNull(str: any): boolean;
    function isInteger(str: any): boolean;
    function isNumber(s: any): boolean;
    function isMoney(s: any): boolean;
    function cTrim(sInputString: any, iType: any): boolean;
    function checkStrLen(str: string): boolean;
    function isGuestAccount(str: string): boolean;
    function isAccount(str: any): boolean;
}

declare module Public.NativeApi {
    function isSupportLocalData(): boolean;
    function setLocalData(key: string, value: string): void;
    function getLocalData(key: string): string;
    function deleteLocalData(key: string): void;
    function clearLocalData(): void;
    function getMic(): void;
    function getScreen(): void;
    function callPhone(telNum: number): void;
    function sendMessage(telNum: number): void;
    function getCurUrl(): string;
    function getUserAgent(): any;
    var curAngle: number | string;
}

declare module Global {
    function Cycle(): void;
    var waitPanel: WaitPanel;
    function showWaitPanel(DelayShow?: boolean, showMsg?: string): void;
    function hideWaitPanel(): void;
    function getNumber(num: number): string;
    function getUnique(obj: Laya.Sprite): string;
    function ToFitZero(number: number, num: number): string;
    function getRandomNum(min: number, max: number): number;
    function splitByStr(orgString: string, splitStr: string, isNumberValue?: boolean): any[];
    function splitWithTwo(oldString: string, sp1: string, sp2: string, isNumberValue?: boolean): any[];
    function returnFloat(value: string): number;
    function log(message?: any, ...optionalParams: any[]): void;
    function getUUID(): string;
    function lerpAngle(curRota: number, targetRota: number, durTime: number): number;
    function lerpDistance(curNum: number, targetNum: number, durTime: number): number;
    function get3DWinSize(theCamera: Laya.Camera, distance: number): Laya.Vector2;
    function get3DDistance(theCamera: Laya.Camera, width: number): number;
    function WatchRotation(targetPos: Laya.Point, watchPos: Laya.Point): number;
    function getFullTimeString(time: number): string;
    function getHSTimeString(time: number): string;
    function getZeroTimeNumber(time: number): number;
    function getPassDaysTime(time: number): number;
    function PointPlus(v1: Laya.Point, v2: Laya.Point): Laya.Point;
    function PointScale(v1: Laya.Point, scale: number): Laya.Point;
    function PointCut(v1: Laya.Point, v2: Laya.Point): Laya.Point;
    function randomWord(length: number): string;
    function stringToByte(str: any): Array<number>;
    function byteToString(arr: any): string;
    function FormatString(str: string, ...args: any[]): string;
    function GetStrByteLen(str: string): number;
    function SubStrWithByteLen(str: string, start: number, end: number): string;
    var getLangStr: (lanKey: string, ...args: any[]) => string;
}

declare module Global {
    function InitEnKey(intEnKey: number, fEnCodeKey: number): void;
    function EnKeyValue(): number;
    function EnKeyLength(): number;
    function EnFloatValue(value: number): number;
    function DesFloatValue(value: number): number;
    function EnValue(value: number): number;
    function DesValue(value: number): number;
    function CheckValue(mmValue: number, needValue: number): number;
}

declare module Public.EffectUtils {
    function rotationEffect(obj: any, time?: number): void;
    function removeRotationEffect(obj: any): void;
    function blinkEffect(obj: any, interval?: number): void;
    function shakeObj(obj: any): void;
    function shakeScreen(panel: Laya.Sprite, effectType?: number): void;
    function playEffect(obj: any, cartoonType?: number): void;
    function playScaleEffect(obj: any): void;
    function flyObj(obj: any, time: any, space?: number): void;
    function rockObj(obj: any, time: any, space?: number): void;
    function typerEffect(obj: any, content?: string, interval?: number): void;
    function yoyoTween(target: any, props: any, duration: number, delay?: number, yoyoCount?: number, ease?: Function, complete?: Laya.Handler, coverBefore?: boolean): Laya.Tween;
    function clearYoyoTween(target: any): void;
    function shakeAndStop(target: any, duration?: number, stopDuration?: number): void;
    function clearShakeAndStop(target: any): void;
}

declare module common {
    class DisplayUtils {
        static removeFromParent(display: Laya.Node): void;
    }
}

declare module Global {
    enum ImageColor {
        Red = 0,
        Gray = 1,
        Yellow = 2,
        Green = 3,
        Blue = 4,
        White = 5,
        Black = 6,
        purple = 7
    }
    function ChangeImageColor(image: Laya.Sprite, imageColor: ImageColor): void;
}

declare module Public {
    class PoolMgr {
        static AllSigns: ds.StringMap<string[]>;
        static setup(): void;
        static saveSign(group: string, sign: string): void;
        static recoverItem(sign: string, item: any): void;
        static getItem(sign: string, group?: string): any;
        static clearItems(group: string): void;
    }
}

declare module Public.SocketManager {
    var GameSocket: BaseSocket;
    var cmdDic: Object;
    function Init(): void;
    function connectGameServer(host: string, isWss: boolean): void;
    function closeGameServer(statue: ServerStatue, isOwer?: boolean): void;
    function sendGameServerMsg(msgLength: number, mainPro: number, sonPro: number, msgBody: any): void;
    function statueGameServer(): boolean;
    function getMsgDecodeCmd(pb: any, data: any): any;
}

declare module Public {
    class MessageInfo {
        main: number;
        sub: number;
        data: Laya.Byte;
        eventFlag: number;
        constructor();
    }
}

declare module Public.HttpManager {
    class Http {
        private http;
        private responseType;
        private header;
        private caller;
        private callBack;
        constructor();
        setResponseType(responseType: string): Http;
        setHeader(header: Array<any>): Http;
        setHeaderProperty(name: string, value: string): Http;
        getRequest(url: string, caller: any, callBack: any): Http;
        postRequest(url: string, caller: any, callBack: any, data?: any): Http;
        private request;
        private onHttpRequestComplete;
        private onHttpRequestError;
    }
}


declare module Public {
    class EventMgr {
        private static Instance;
        private m_event;
        private static Inst;
        constructor();
        get theRouter(): Laya.EventDispatcher;
        static containsEvent(eventType: any): boolean;
        static cleanup(): void;
        static on(eventType: any, caller: any, method: Function): void;
        static off(eventType: any, caller: any, method: Function): void;
        static trigger(eventType: any, ...args: any[]): void;
    }
}

declare module Public {
    class CommonEvent {
        static SOCKECT_MESSAGE: string;
        static SOCKECT_CLOSE: string;
        static BUTTON_CLICK_SOUND: string;
        static TRY_ERROR: string;
    }
}

declare module Public {
    enum BaseNetNotify {
        First = 50,
        CS_CLIENT_REPORT = 51,
        CS_CLIENT_ERROR = 52,
        P_SO_Verify_Ask = 53,
        End = 54
    }
    enum MessageTarget {
        ERROR = 0,
        CLIENT = 1,
        LOGIN_SERVER = 2,
        GATE_SERVER = 3,
        GAME_SERVER = 4,
        MATCH_SERVER = 5,
        FIGHT_SERVER = 6,
        LOG_SERVER = 7
    }
    enum ServerStatue {
        Open = 0,
        Error = 1,
        Maintain = 2,
        Kick = 3,
        Close = 4
    }
}

declare module Public {
    class TimeMgr {
        private static Instance;
        static get Inst(): TimeMgr;
        constructor();
        private _callBack;
        setup(call: CallBack): void;
        get currTimer(): any;
    }
}

declare module Public {
    class LStorageMgr {
        private static Inst;
        static GetInst(): LStorageMgr;
        constructor();
        getLocalData(key: string): string;
        setLocalData(key: string, value: string): void;
    }
}

declare module Public {
    class CountShareData {
        private _count;
        destroyTm: number;
        constructor();
        addCount(obj: any): void;
        removeCount(obj: any): void;
        get count(): number;
        destroy(): void;
    }
}

declare module Public {
    class CountShare {
        private _shareDataDict;
        private _waitingDestroyShareDataDict;
        private _destroyDelay;
        private _cherkFramesCount;
        private _count;
        constructor($destroyDelay?: number, $cherkFrameCount?: number);
        startCount(): void;
        stopCount(): void;
        hasShareData($key: string): boolean;
        getShareData($key: string): CountShareData;
        addShareData($key: string, $csd: CountShareData): void;
        removeShareData($key: string): void;
        installShareData($key: string, obj: any): CountShareData;
        uninstallShareData($key: string, obj: any): void;
        private count;
        private checkUninstall;
        uninstallAll(): void;
        uninstallAllWait(): void;
        get cacheCnt(): number;
        getAllCacheKeyList(): Array<string>;
        getAllCacheDataList(): Array<CountShareData>;
    }
}

declare module GlobalData {
    var isRelease: boolean;
    var isMiniGame: boolean;
}

declare module GameConfig {
    var isOnLine: boolean;
    var TextColors: {
        white: string;
        milkWhite: string;
        grayWhite: string;
        yellow: string;
        lightYellow: string;
        orangeYellow: string;
        red: string;
        green: string;
        blue: string;
        grayBlue: string;
        purple: string;
        pink: string;
        black: string;
        golden: string;
    };
    var LabelFontSize: {
        littleSize: number;
        middleSize: number;
        normalSize: number;
        bigSize: number;
    };
    function isWeiXin(): boolean;
    function isBigScreen(): boolean;
    function getTerminal(): string;
    function getDevice(): string;
    function systemType(): string;
    function platformType(): string;
    var WinScaleX: number;
    var WinScaleY: number;
    var WinScaleFit: number;
}

declare module Public {
    class ServerError {
        serverNoId: string;
        mainPro: number;
        sonPro: number;
        eventFlag: number;
    }
    class BaseSocket extends Laya.EventDispatcher {
        private socket;
        private msgIndex;
        private lastMsgIndex;
        isBigPackage: boolean;
        constructor();
        isOpen(): boolean;
        connectServer(host: string, isWss: boolean): void;
        closeServer(statue: ServerStatue, isOwer?: boolean, errorMsg?: string): void;
        private onSocketOpen;
        private onSocketClose;
        private onConnectError;
        private onReceiveMessage;
        private splitInputMsg;
        private dispathCmdMsg;
        sendMessage(msgLength: number, mainPro: number, sonPro: number, msgBody: any): void;
        private flushQueneMsg;
    }
}

declare class BitmapBlink extends Laya.EventDispatcher {
    private _target;
    private _time;
    private _currTime;
    constructor(target: Laya.Sprite, time: number, isAuto?: boolean);
    start(): void;
    private runDown;
    private runUp;
    private checkOver;
    private destroy;
}

declare class WaitPanel extends Laya.Sprite {
    private bg;
    private showText;
    constructor(type?: number);
    private createView;
    private onRemove;
    private mouseUpCalled;
    activeStatue(active: boolean, DelayShow?: boolean, showMsg?: string): void;
}

