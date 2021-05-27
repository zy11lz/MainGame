/* eslint-disable */
/* eslint-disable */
class rEnum {
    constructor() {
    }
    static ENUM_START(start = 0) {
        rEnum._value = start;
        return rEnum._value;
    }
    static get next() {
        return ++rEnum._value;
    }
}
rEnum._value = 0;
//# sourceMappingURL=rEnum.js.map
var ds;
(function (ds) {
    class StringMap {
        constructor() {
            this._map = {};
            this._length = 0;
        }
        getValue(key) {
            key = key.toString();
            return this._map[key];
        }
        get(key) {
            return this.getValue(key);
        }
        put(key, value) {
            key = key.toString();
            if (!this.containsKey(key)) {
                this._length++;
            }
            this._map[key] = value;
            return value;
        }
        isEmpty() {
            return this._length == 0;
        }
        containsKey(key) {
            key = key.toString();
            return (key in this._map);
        }
        remove(key) {
            if (this.containsKey(key)) {
                this._length--;
                var deleteValue = this.getValue(key);
                delete this._map[key];
                return deleteValue;
            }
            return null;
        }
        getKeys() {
            var arr = [];
            for (var key in this._map) {
                arr.push(key);
            }
            return arr;
        }
        containsValue(value) {
            for (var key in this._map) {
                if (this._map[key] == value) {
                    return true;
                }
            }
            return false;
        }
        size() {
            return this._length;
        }
        clear() {
            this._length = 0;
            this._map = {};
        }
        toString() {
            let ret = "HashMap Content:\n";
            for (var key in this._map) {
                ret += key + " -> " + this._map[key] + "\n";
            }
            return ret;
        }
        _private_foreachKey(caller, func) {
            for (var key in this._map) {
                func.call(caller, key);
            }
        }
        _private_foreachValue(caller, func) {
            for (var key in this._map) {
                var value = this.getValue(key);
                func.call(caller, value);
            }
        }
    }
    ds.StringMap = StringMap;
})(ds || (ds = {}));
//# sourceMappingURL=StringMap.js.map
var ds;
(function (ds) {
    class HashMap {
        constructor() {
            this._keys = [];
            this._values = [];
        }
        get length() {
            return this._keys.length;
        }
        isEmpty() {
            return this._keys.length == 0;
        }
        keys() {
            return this._keys;
        }
        getValues() {
            return this._values;
        }
        containsValue(value) {
            return this._values.indexOf(value) != -1;
        }
        containsKey(key) {
            return this._keys.indexOf(key) != -1;
        }
        getValue(key) {
            let index = this._keys.indexOf(key);
            if (index == -1) {
                return null;
            }
            return this._values[index];
        }
        key(value) {
            let index = this._values.indexOf(value);
            if (index == -1) {
                return null;
            }
            return this._keys[index];
        }
        add(key, value) {
            let index = this._keys.indexOf(key);
            if (index != -1) {
                var oldValue = this._values[index];
                this._values[index] = value;
                return oldValue;
            }
            this._keys.push(key);
            this._values.push(value);
            return null;
        }
        remove(key) {
            let len = this._keys.length;
            for (let i = len - 1; i >= 0; i--) {
                if (this._keys[i] == key) {
                    let value = this._values[i];
                    this._keys.splice(i, 1);
                    this._values.splice(i, 1);
                    return value;
                }
            }
            return null;
        }
        clear() {
            this._keys.length = 0;
            this._values.length = 0;
        }
        clone() {
            let temp = new HashMap();
            temp._keys = this._keys.concat();
            temp._values = this._values.concat();
            return temp;
        }
        toString() {
            let ret = "HashMap Content:\n";
            for (let i = 0; i < this._keys.length; ++i) {
                ret += this._keys[i] + " -> " + this._values[i] + "\n";
            }
            return ret;
        }
    }
    ds.HashMap = HashMap;
})(ds || (ds = {}));
//# sourceMappingURL=HashMap.js.map
var fly;
(function (fly) {
    var vo;
    (function (vo) {
        class CountShareData {
            constructor() {
                this._count = 0;
                this.destroyTm = 0;
            }
            addCount(obj) {
                this._count++;
            }
            removeCount(obj) {
                this._count--;
            }
            get count() {
                return this._count;
            }
            destroy() {
            }
        }
        vo.CountShareData = CountShareData;
    })(vo = fly.vo || (fly.vo = {}));
})(fly || (fly = {}));
//# sourceMappingURL=CountShareData.js.map
var fly;
(function (fly) {
    class ZMath {
        constructor() {
        }
        static randomInt($min, $max) {
            return Math.round($min + Math.random() * ($max - $min));
        }
        static getDisSquare($x1, $y1, $x2, $y2) {
            return ($x1 - $x2) * ($x1 - $x2) + ($y1 - $y2) * ($y1 - $y2);
        }
        static getRotPoint($p1, $p0, $angle) {
            $angle = $angle * ZMath.toRad;
            var p1 = new fly.Point();
            p1.x = Math.cos($angle) * ($p1.x - $p0.x) - Math.sin($angle) * ($p1.y - $p0.y) + $p0.x;
            p1.y = Math.cos($angle) * ($p1.y - $p0.y) + Math.sin($angle) * ($p1.x - $p0.x) + $p0.y;
            return p1;
        }
        static getTowPointsAngle($p0, $p1) {
            var angle = Math.atan2($p1.y - $p0.y, $p1.x - $p0.x);
            if (angle < 0) {
                angle = angle + 2 * Math.PI;
            }
            return angle * 180 / Math.PI;
        }
        static getNearAngel($angle, $average = 8) {
            $angle = ($angle % 360 + 360) % 360;
            var an = 360 / $average;
            var i = Math.floor($angle / an);
            var min = i * an;
            var max = (i + 1) * an;
            return (($angle - min <= max - $angle) ? min : max) % 360;
        }
        static getAnglePos(startPos, angle, dis) {
            var pos = new fly.Point();
            var radian = angle / 180 * Math.PI;
            pos.x = startPos.x + dis * Math.cos(radian);
            pos.y = startPos.y + dis * Math.sin(radian);
            return pos;
        }
        static get2PosDisPos(startPos, endPos, dis) {
            var angle = ZMath.getTowPointsAngle(startPos, endPos);
            return ZMath.getAnglePos(startPos, angle, dis);
        }
        static getSin($angle) {
            $angle = ($angle % 360 + 360) % 360;
            var index = $angle * 16;
            return ZMath.mathSinArray[index];
        }
        static getCos($angle) {
            $angle = ($angle % 360 + 360) % 360;
            var index = $angle * 16;
            return ZMath.mathCosArray[index];
        }
        static setupSinCos() {
            var index = 0;
            var length = 360 << 4;
            for (var i = 0; i < length; i++) {
                var angle = ((Math.PI * 2) * i) / length;
                ZMath.mathSinArray.push(Math.sin(angle));
                ZMath.mathCosArray.push(Math.cos(angle));
            }
        }
        static distance(p1, p2) {
            return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
        }
    }
    ZMath.abs = Math.abs;
    ZMath.sin = Math.sin;
    ZMath.cos = Math.cos;
    ZMath.sqrt = Math.sqrt;
    ZMath.PI = Math.PI;
    ZMath.toDeg = 180 / ZMath.PI;
    ZMath.toRad = ZMath.PI / 180;
    ZMath.mathSinArray = new Array();
    ZMath.mathCosArray = new Array();
    fly.ZMath = ZMath;
})(fly || (fly = {}));
//# sourceMappingURL=ZMath.js.map
var fly;
(function (fly) {
    var utils;
    (function (utils) {
        class XmlUtil {
            constructor() {
            }
            static getAttrValue(note, valuename) {
                if (valuename in note) {
                    return note[valuename].value;
                }
                return "";
            }
            static getAttrNumberValue(note, valuename) {
                if (valuename in note) {
                    return note[valuename].value;
                }
                return 0;
            }
        }
        utils.XmlUtil = XmlUtil;
    })(utils = fly.utils || (fly.utils = {}));
})(fly || (fly = {}));
//# sourceMappingURL=XmlUtil.js.map
var fly;
(function (fly) {
    var utils;
    (function (utils) {
        class URLUtils {
            constructor() {
            }
            static type(url) {
                let tokens = url.split("?");
                tokens = tokens[0].split(".");
                let type = tokens[tokens.length - 1];
                if (type == url) {
                    type = "NoneType";
                }
                return type;
            }
            static getPath(url) {
                var ofs = url.lastIndexOf('/');
                return ofs > 0 ? url.substr(0, ofs + 1) : "";
            }
            static getFileName(url) {
                var ofs = url.lastIndexOf('/');
                return ofs > 0 ? url.substr(ofs + 1) : url;
            }
        }
        utils.URLUtils = URLUtils;
    })(utils = fly.utils || (fly.utils = {}));
})(fly || (fly = {}));
//# sourceMappingURL=URLUtils.js.map
var fly;
(function (fly) {
    class Transformer {
        constructor() {
        }
        static transTilePoint2ZonePoint($tilePoint) {
            return new fly.Point(($tilePoint.x / fly.SceneConfig.ZONE_SCALE_WIDTH) | 0, ($tilePoint.y / fly.SceneConfig.ZONE_SCALE_HEIGHT) | 0);
        }
        static transTilePoint2PixelPoint($tilePoint) {
            return new fly.Point($tilePoint.x * fly.SceneConfig.TILE_WIDTH, $tilePoint.y * fly.SceneConfig.TILE_HEIGHT);
        }
        static transPixelPoint2TilePoint($pixelPoint) {
            return new fly.Point(($pixelPoint.x / fly.SceneConfig.TILE_WIDTH) | 0, ($pixelPoint.y / fly.SceneConfig.TILE_HEIGHT) | 0);
        }
        static transZoneTilePoint2ZonePixelPoint($zoneTilePoint) {
            return new fly.Point($zoneTilePoint.x * fly.SceneConfig.ZONE_WIDTH, $zoneTilePoint.y * fly.SceneConfig.ZONE_HEIGHT);
        }
        static transLogicAngle2Angle($logicAngle, $average = 8) {
            var an = 360 / $average;
            return $logicAngle * an % 360 + 90;
        }
        static transLogicAngle2Angle8($logicAngle) {
            switch ($logicAngle) {
                case 0:
                    return 90;
                case 1:
                    return 135;
                case 2:
                    return 180;
                case 3:
                    return 225;
                case 4:
                    return 270;
                case 5:
                    return 315;
                case 6:
                    return 0;
                case 7:
                    return 45;
            }
            return 0;
        }
    }
    fly.Transformer = Transformer;
})(fly || (fly = {}));
//# sourceMappingURL=Transformer.js.map
var fly;
(function (fly) {
    var utils;
    (function (utils) {
        class TemplateUtil {
            static converDicKeyToArr(dic) {
                var arr = new Array();
                var i;
                for (i in dic) {
                    arr.push(i);
                }
                return arr;
            }
            static converDicValueToArr(dic) {
                var arr = new Array();
                var i;
                for (i in dic) {
                    arr.push(dic[i]);
                }
                return arr;
            }
            static converArrToDictionary(arr, keyName) {
                var dic = {};
                var obj;
                for (obj of arr) {
                    if (obj.hasOwnProperty(keyName)) {
                        dic[obj[keyName]] = obj;
                    }
                }
                return dic;
            }
            static converArrToStringMap(arr, keyName, map) {
                map.clear();
                var obj;
                for (obj of arr) {
                    if (obj.hasOwnProperty(keyName)) {
                        map.put(obj[keyName], obj);
                    }
                }
            }
            static createUniqIndexFromDic(dataDic, indexArr) {
                return TemplateUtil.createUniqIndexFromObj(dataDic, indexArr);
            }
            static createUniqIndexFromArr(dataArr, indexArr) {
                return TemplateUtil.createUniqIndexFromObj(dataArr, indexArr);
            }
            static createUniqIndexFromVec(dataArr, indexArr) {
                return TemplateUtil.createUniqIndexFromObj(dataArr, indexArr);
            }
            static createUniqIndexFromObj(dataDic, indexArr) {
                var indexDic = {};
                var obj;
                for (obj in dataDic) {
                    var valueArr = new Array();
                    var attName;
                    for (attName of indexArr) {
                        valueArr.push(obj[attName]);
                    }
                    var keyStr = valueArr.join("_");
                    var arr = indexDic[keyStr];
                    if (arr == null) {
                        arr = new Array();
                        indexDic[keyStr] = arr;
                    }
                    arr.push(obj);
                }
                return indexDic;
            }
        }
        utils.TemplateUtil = TemplateUtil;
    })(utils = fly.utils || (fly.utils = {}));
})(fly || (fly = {}));
//# sourceMappingURL=TemplateUtil.js.map
var StatusConvert;
(function (StatusConvert) {
    function getIdByNum(status, angle, frame) {
        return (status * 100000) + (angle * 1000) + frame;
    }
    StatusConvert.getIdByNum = getIdByNum;
})(StatusConvert || (StatusConvert = {}));
//# sourceMappingURL=StatusConvert.js.map
class RenderUnitCallBack {
    constructor(thisArg, func, ...args) {
        this._thisArg = thisArg;
        this._func = func;
        if (args && args.length) {
            this._args = [];
            var firstAr = args;
            if (args[0] instanceof Array) {
                firstAr = args[0];
            }
            for (var index = 0; index < firstAr.length; index++) {
                this._args.push(firstAr[index]);
            }
        }
        if (this._func == null) {
            logE("CallBack-->  func 为空");
        }
    }
    call(...callArgs) {
        var arr = this.getCallBackArgs(callArgs);
        return this._func.apply(this._thisArg, arr);
    }
    getCallBackArgs(callArgs) {
        var arr;
        if (this._args != null) {
            arr = this._args.concat();
        }
        if (callArgs && callArgs.length) {
            arr = arr || [];
            for (var index = 0; index < callArgs.length; index++) {
                arr.push(callArgs[index]);
            }
        }
        return arr;
    }
    destroy() {
        this._thisArg = null;
        this._func = null;
        this._args = null;
    }
    get caller() {
        return this._thisArg;
    }
    get func() {
        return this._func;
    }
}
//# sourceMappingURL=RenderUnitCallBack.js.map
var fly;
(function (fly) {
    class RenderItemAngleUtil {
        static isNeedScaleX(angle) {
            if (fly.GlobalConfig2D.IS_TWO_ANGLE) {
                return (angle > 0) && (angle <= 5);
                ;
            }
            else {
                return (angle >= 1) && (angle <= 3);
            }
        }
        static getAngleScaleX(angle) {
            var scaleX = 1;
            if (RenderItemAngleUtil.isNeedScaleX(angle)) {
                scaleX = -1;
            }
            return scaleX;
        }
        static getResourceKey(actionName, angle, frameIndex) {
            var sourceAngle = angle;
            return actionName + "_" + sourceAngle + "_" + frameIndex;
        }
    }
    fly.RenderItemAngleUtil = RenderItemAngleUtil;
})(fly || (fly = {}));
//# sourceMappingURL=RenderItemAngleUtil.js.map
var common;
(function (common) {
    class PoolSign {
        constructor() {
            this.pid = 0;
            this.gpid = 0;
            this.isFree = true;
            this.poolName = "";
            this.uniqID = "";
        }
    }
    common.PoolSign = PoolSign;
})(common || (common = {}));
//# sourceMappingURL=PoolSign.js.map
var common;
(function (common) {
    class PoolMgr {
        static setup() {
            PoolMgr.poolMap = new ds.StringMap();
        }
        static createPool(poolInfo) {
            var pool = this.getPool(poolInfo);
            if (pool == null) {
                pool = new common.Pool(poolInfo);
                this.poolMap.put(poolInfo.poolname, pool);
            }
            return pool;
        }
        static getPool(poolInfo) {
            return this.getPoolByName(poolInfo.poolname);
        }
        static getFreeCnt(poolInfo) {
            var pool = this.getPool(poolInfo);
            if (pool) {
                return pool.getFreeCnt();
            }
            else {
                throw new Error("请先初始化" + poolInfo.poolname);
            }
        }
        static getAllCnt(poolInfo) {
            var pool = this.getPool(poolInfo);
            if (pool) {
                return pool.getAllCnt();
            }
            else {
                throw new Error("请先初始化" + poolInfo.poolname);
            }
        }
        static getItem(poolInfo) {
            var pool = this.getPool(poolInfo);
            if (pool) {
                return pool.create();
            }
            else {
                throw new Error("请先初始化" + poolInfo.poolname);
            }
        }
        static getPoolByName(poolname) {
            return this.poolMap.get(poolname);
        }
        static releaseItem(item) {
            var pool = this.getPoolByName(item.poolSign.poolName);
            if (pool) {
                return pool.releaseItem(item);
            }
            else {
                throw new Error("请先初始化" + item.poolSign.poolName);
            }
        }
        static destoryItem(item) {
            var pool = this.getPoolByName(item.poolSign.poolName);
            if (pool) {
                return pool.destoryItem(item);
            }
            else {
                throw new Error("请先初始化" + item.poolSign.poolName);
            }
        }
        static dispose(poolInfo) {
            var pool = this.getPool(poolInfo);
            if (pool) {
                pool.dispose();
                this.poolMap.remove(poolInfo.poolname);
            }
        }
    }
    PoolMgr.poolMap = new ds.StringMap();
    common.PoolMgr = PoolMgr;
})(common || (common = {}));
//# sourceMappingURL=PoolMgr.js.map
var common;
(function (common) {
    class PoolInfo {
        constructor(pooName, poolCls, maxSize = 500) {
            this._gpid = 0;
            this._poolname = pooName;
            this._poolCls = poolCls;
            this._maxSize = maxSize;
            this._gpid = PoolInfo._g_poolId++;
        }
        get maxSize() {
            return this._maxSize;
        }
        get poolname() {
            return this._poolname;
        }
        get poolCls() {
            return this._poolCls;
        }
        get gpid() {
            return this._gpid;
        }
    }
    PoolInfo._g_poolId = 0;
    common.PoolInfo = PoolInfo;
})(common || (common = {}));
//# sourceMappingURL=PoolInfo.js.map
var common;
(function (common) {
    class Pool {
        constructor(poolIno) {
            this._disposed = false;
            this._freeArr = [];
            this._pid = 0;
            this._poolInfo = poolIno;
            this._allMap = new ds.StringMap();
            this._inUseMap = new ds.StringMap();
        }
        getFreeCnt() {
            return this._freeArr.length;
        }
        getAllCnt() {
            return this._allMap.size();
        }
        create() {
            var item;
            if (this._freeArr.length) {
                item = this._freeArr.pop();
            }
            else {
                item = new this._poolInfo.poolCls();
                item.poolSign.pid = this._pid++;
                item.poolSign.gpid = this._poolInfo.gpid;
                item.poolSign.poolName = this._poolInfo.poolname;
                item.poolSign.uniqID = this._poolInfo.gpid + "_" + item.poolSign.pid;
                this._allMap.put(item.poolSign.pid, item);
            }
            item.poolSign.isFree = false;
            this._inUseMap.put(item.poolSign.pid, item);
            return item;
        }
        releaseItem(item) {
            if (item.poolSign.isFree) {
                logE("重复释放是干啥");
                return;
            }
            item.poolSign.isFree = true;
            if (this._allMap.size() > this._poolInfo.maxSize) {
                this.destoryItem(item);
            }
            else {
                item.release();
                this._freeArr.push(item);
                this._inUseMap.remove(item.poolSign.pid);
            }
        }
        destoryItem(item) {
            item.dispose();
            this._inUseMap.remove(item.poolSign.pid);
            this._allMap.remove(item.poolSign.pid);
        }
        destoyAll() {
            var keys = this._allMap.getKeys();
            for (let index = 0; index < keys.length; index++) {
                const key = keys[index];
                this.destoryItem(this._allMap.get(key));
            }
        }
        dispose() {
            this._disposed = true;
            this.destoyAll();
        }
        isAllFee() {
            return this._inUseMap.size() == 0;
        }
    }
    common.Pool = Pool;
})(common || (common = {}));
//# sourceMappingURL=Pool.js.map
//# sourceMappingURL=Ipool.js.map
var fly;
(function (fly) {
    class ClassConstruct {
        static construct(classObj, params) {
            if (!params) {
                return (new (classObj)());
            }
            ;
            switch (params.length) {
                case 0:
                    return (new (classObj)());
                case 1:
                    return (new (classObj)(params[0]));
                case 2:
                    return (new (classObj)(params[0], params[1]));
                case 3:
                    return (new (classObj)(params[0], params[1], params[2]));
                case 4:
                    return (new (classObj)(params[0], params[1], params[2], params[3]));
                case 5:
                    return (new (classObj)(params[0], params[1], params[2], params[3], params[4]));
                case 6:
                    return (new (classObj)(params[0], params[1], params[2], params[3], params[4], params[5]));
                case 7:
                    return (new (classObj)(params[0], params[1], params[2], params[3], params[4], params[5], params[6]));
                case 8:
                    return (new (classObj)(params[0], params[1], params[2], params[3], params[4], params[5], params[6], params[7]));
                case 9:
                    return (new (classObj)(params[0], params[1], params[2], params[3], params[4], params[5], params[6], params[7], params[8]));
                case 10:
                    return (new (classObj)(params[0], params[1], params[2], params[3], params[4], params[5], params[6], params[7], params[8], params[9]));
                case 11:
                    return (new (classObj)(params[0], params[1], params[2], params[3], params[4], params[5], params[6], params[7], params[8], params[9], params[10]));
                case 12:
                    return (new (classObj)(params[0], params[1], params[2], params[3], params[4], params[5], params[6], params[7], params[8], params[9], params[10], params[11]));
                case 13:
                    return (new (classObj)(params[0], params[1], params[2], params[3], params[4], params[5], params[6], params[7], params[8], params[9], params[10], params[11], params[12]));
                case 14:
                    return (new (classObj)(params[0], params[1], params[2], params[3], params[4], params[5], params[6], params[7], params[8], params[9], params[10], params[11], params[12], params[13]));
                case 15:
                    return (new (classObj)(params[0], params[1], params[2], params[3], params[4], params[5], params[6], params[7], params[8], params[9], params[10], params[11], params[12], params[13], params[14]));
                default:
                    return;
            }
            ;
        }
    }
    fly.ClassConstruct = ClassConstruct;
})(fly || (fly = {}));
//# sourceMappingURL=ClassConstruct.js.map
var fly;
(function (fly) {
    class LoadBlackListUtils {
        constructor() {
            this._blackListMap = new ds.StringMap();
        }
        static get ins() {
            if (this._ins == null) {
                this._ins = new LoadBlackListUtils();
            }
            return this._ins;
        }
        getIs404Error($url, $checkCnt = 3) {
            var times = this._blackListMap[$url] || 0;
            return ((times > $checkCnt));
        }
        addLoadUrl($url) {
            var _local2 = this._blackListMap.getValue($url) || 0;
            _local2++;
            this._blackListMap.put($url, _local2);
        }
        removeLoadUrl($url) {
            this._blackListMap.remove($url);
        }
    }
    fly.LoadBlackListUtils = LoadBlackListUtils;
})(fly || (fly = {}));
//# sourceMappingURL=LoadBlackListUtils.js.map
var fly;
(function (fly) {
    var utils;
    (function (utils) {
        class EngineStatus {
            constructor() {
                let pixelRatio = Laya.Browser.pixelRatio;
                this._fontSize = 12 * pixelRatio;
                this._minFPS = 0;
                this._maxFPS = 0;
                this._avgFPS = 0;
                this._canvas = new Laya.HTMLCanvas(true);
                this._infos = [];
                this._context = this._canvas.getContext("2d");
                this._context.textBaseline = "top";
                this._context.font = this._fontSize + "px Monaco";
                this.addInfo("Laya.Context", "pContext", "white");
                this.addInfo("PixelRatio", "pPixelRatio", "white");
                this.addInfo("FPS", "pFps", "white");
                this.addInfo("Frames", "pFrame", "white");
                this.addInfo("Laya.Sprite", "pSprite", "white");
                this.addInfo("Drawcall", "pDrawcall", "white");
                this.addInfo("GPUMem", "pGPUMem", "white");
                this.addInfo("Laya.Texture", "pTexture", "white");
                this.addInfo("GPUParam", "pGPUParam", "white");
                this.addInfo("Triangles", "pTriangles", "white");
                this.addInfo("Loader", "pDownload0", "white");
                this.addInfo("Net", "pDownload1", "white");
                this.addInfo("MapZone", "mapZone", "white");
                this.addInfo("RenderUnit", "renderUnit", "white");
                for (let i = 0; i < this._infos.length; ++i) {
                    this._infos[i].x = 4;
                    this._infos[i].y = i * this._fontSize + this._fontSize;
                }
                this._height = this._infos.length * this._fontSize + 3 * pixelRatio + 4;
                this._width = pixelRatio * 250;
                this._vx = pixelRatio * 75;
                this._canvas.size(this._width, this._height);
                this.pContext = "WebGL";
                this.pPixelRatio = pixelRatio;
            }
            addInfo(title, value, color) {
                let info = {
                    title: title,
                    value: value,
                    color: color,
                    units: "",
                    x: 0,
                    y: 0
                };
                this._infos.push(info);
            }
            static get instance() {
                if (!EngineStatus._instance) {
                    EngineStatus._instance = new EngineStatus();
                }
                return EngineStatus._instance;
            }
            static show(x = 0, y = 0) {
                EngineStatus.instance.innerShow(x, y);
                EngineStatus._isShowing = true;
            }
            static hide() {
                EngineStatus.instance.innerHide();
                EngineStatus._isShowing = false;
            }
            setPosition(x, y) {
                let cssStyle = "";
                cssStyle += "pointer-events:none;";
                cssStyle += "background:rgba(33,33,33,0.8);";
                cssStyle += "z-index:100000;";
                cssStyle += "position: absolute;";
                cssStyle += "direction:ltr;";
                cssStyle += "left:" + x + "px;top:" + y + "px;";
                cssStyle += "width:" + (this._width / this.pPixelRatio) + "px;height:" + (this._height / this.pPixelRatio) + "px;";
                this._canvas.source.style.cssText = cssStyle;
            }
            innerShow(x, y) {
                this._minFPS = 60;
                this._maxFPS = 60;
                this._avgFPS = 60;
                this._count = 0;
                this._time0 = Laya.Browser.now();
                this._time1 = this._time0;
                this.pFrame = 0;
                this.setPosition(x, y);
                Tick.addTick("enginestatue", this, this.loop);
                if (isLaya) {
                    Laya.Browser.container.appendChild(this._canvas.source);
                }
                else {
                }
            }
            static get isShowing() {
                return EngineStatus._isShowing;
            }
            innerHide() {
                Laya.timer.clear(this, this.loop);
                Laya.Browser.removeElement(this._canvas.source);
            }
            loop(gap) {
                this._count += 1;
                this.pFrame += 1;
                let time = Tick.time;
                this.pCanvas = Math.round(Laya.Stat.canvasReCache) + "/" + Math.round(Laya.Stat.canvasNormal) + "/" + Math.round(Laya.Stat.canvasBitmap);
                this.pDownload0 = fly.loader.MultiUrlLoadManager.failedCount + "x | " + fly.loader.MultiUrlLoadManager.interruptCount + "! | " + fly.loader.MultiUrlLoadManager.loadedTotalCount + " | T: " + fly.loader.MultiUrlLoadManager.idleCount + " | " + fly.loader.MultiUrlLoadManager.maxQueueSize;
                this.pDownload1 = Math.round(fly.loader.MultiUrlLoadManager.networkSpeed * 100) / 100 + "MB/S" + " | " + Math.round(fly.loader.MultiUrlLoadManager.loadedTotalBytes * 100) / 100 + "MB";
                this.pDrawcall = 0;
                this.pFps = "" + this._avgFPS + " | " + this._minFPS + " | " + this._maxFPS;
                this.pGPUMem = "0";
                this.pGPUParam = Math.round(Laya.Stat.shaderCall) + " | " + Math.round(Laya.Stat.shaderCall);
                this.pSprite = Math.round(Laya.Stat.spriteCount);
                this.pTriangles = Math.round(Laya.Stat.trianglesFaces);
                this._context.clearRect(0, 0, this._width, this._height);
                for (let i = 0; i < this._infos.length; ++i) {
                    let info = this._infos[i];
                    this._context.font = this._fontSize + "px Monaco";
                    this._context.fillStyle = info.color;
                    this._context.fillText(info.title, info.x, info.y, null, null, null);
                    this._context.fillText(this[info.value], info.x + this._vx, info.y, null, null, null);
                }
                if (time - this._time0 > 1000) {
                    this._avgFPS = this._count;
                    this._time0 = time;
                    this._count = 0;
                }
                this._minFPS = Math.min(this._minFPS, this._avgFPS);
                this._maxFPS = Math.max(this._maxFPS, this._avgFPS);
                if (time - this._time1 > 1000 * 60) {
                    this._minFPS = 120;
                    this._maxFPS = 0;
                    this._time1 = time;
                }
                Laya.Stat.clear();
            }
        }
        EngineStatus._isShowing = false;
        utils.EngineStatus = EngineStatus;
    })(utils = fly.utils || (fly.utils = {}));
})(fly || (fly = {}));
//# sourceMappingURL=EngineStatus.js.map
var fly;
(function (fly) {
    var utils;
    (function (utils) {
        class DisplayUtil {
            static removeForParent(dis) {
                if (dis == null || dis.parent == null) {
                    return;
                }
                dis.parent.removeChild(dis);
            }
            static removeAllChild(dis, isDispose = false) {
                if (dis) {
                    var display = null;
                    while (dis.numChildren > 0) {
                        display = dis.removeChildAt(0);
                        if (isDispose && display) {
                            display.dispose();
                        }
                    }
                }
            }
        }
        utils.DisplayUtil = DisplayUtil;
    })(utils = fly.utils || (fly.utils = {}));
})(fly || (fly = {}));
//# sourceMappingURL=DisplayUtil.js.map
var fly;
(function (fly) {
    class OldDelayCall {
        constructor() {
            this._delayIdCursor = 0;
            this._delayPool = [];
            this._callerKeyInfoPool = [];
            this._delayFuncDic = new ds.StringMap();
            this._callerFuncMap = new ds.HashMap();
            this._currentDelayNum = 0;
            this._isRunIng = false;
            this._delatIdToFuncMapping = {};
            this._currentTime = 0;
            this._preTime = 0;
        }
        createDelayKey(caller, fun) {
            var callerKeyInfo = this._callerFuncMap.getValue(fun);
            if (!callerKeyInfo) {
                if (this._callerKeyInfoPool.length > 0) {
                    callerKeyInfo = this._callerKeyInfoPool.pop();
                }
                else {
                    callerKeyInfo = new CallerKeyInfo();
                }
                callerKeyInfo.func = fun;
            }
            var delayKey = callerKeyInfo.getCallerKey(caller);
            if (delayKey > 0) {
                return delayKey;
            }
            callerKeyInfo.addCaller(caller);
            return callerKeyInfo.getCallerKey(caller);
        }
        getDelayKey(caller, fun) {
            var callerKeyInfo = this._callerFuncMap.getValue(fun);
            if (!callerKeyInfo) {
                return 0;
            }
            return callerKeyInfo.getCallerKey(caller);
        }
        removeDelayKey(caller, fun) {
            var callerKeyInfo = this._callerFuncMap.getValue(fun);
            if (!callerKeyInfo) {
                return;
            }
            callerKeyInfo.removeCaller(caller);
            if (callerKeyInfo.isEmpty()) {
                this._callerFuncMap.remove(fun);
                callerKeyInfo.reset();
                this._callerKeyInfoPool.push(callerKeyInfo);
            }
        }
        addDelayCall(callTime, caller, callFunc, callParams = null) {
            if (callTime <= 0) {
                callFunc.apply(caller, callParams);
                return 0;
            }
            this._delayIdCursor++;
            var delayKey = this.createDelayKey(caller, callFunc);
            var delyInfo = this._delayFuncDic[delayKey];
            if (delyInfo == null) {
                delyInfo = this.createDelyInfo(caller, callFunc, delayKey);
                if (this._firstNode == null) {
                    this._firstNode = delyInfo;
                }
                else {
                    delyInfo.next = this._firstNode;
                    this._firstNode.pre = delyInfo;
                    this._firstNode = delyInfo;
                }
            }
            else {
            }
            var outKey = this._delayIdCursor;
            this.addCallToInfo(delyInfo, outKey, this._currentTime + callTime, callParams);
            this.addDelyNum(1);
            this._delatIdToFuncMapping[outKey] = delayKey;
            this.setRunStat();
            return outKey;
        }
        removeDelayCall(outKey, isExcuteFun = false) {
            var delayKey = this._delatIdToFuncMapping[outKey];
            if (delayKey) {
                var delayInfo = this.getDelayInfo(delayKey);
                if (delayInfo) {
                    var deleteObj = this.removeCall(delayInfo, outKey);
                    if (deleteObj != null) {
                        this.subDelyNum(1);
                        if (isExcuteFun) {
                            delayInfo.func.apply(delayInfo.caller, deleteObj.callParams);
                        }
                    }
                    if (delayInfo.isEmpty()) {
                        this.removeEmptyDelayInfo(delayInfo);
                    }
                }
                delete this._delatIdToFuncMapping[outKey];
                this.setRunStat();
            }
        }
        subDelyNum(num) {
            if (num == 0) {
                return;
            }
            this._currentDelayNum -= num;
            if (this._currentDelayNum < 0) {
                logE("currentDelayNum = " + this._currentDelayNum);
            }
        }
        addDelyNum(num) {
            if (num == 0) {
                return;
            }
            this._currentDelayNum += num;
        }
        removeDelayCallByFunction(caller, callFunc) {
            var delayKey = this.getDelayKey(caller, callFunc);
            var delayInfo = this.getDelayInfo(delayKey);
            if (delayInfo) {
                var callParamerList = delayInfo.callParamerList;
                var len = callParamerList.length;
                var delayId = 0;
                for (let obj of callParamerList) {
                    delayId = obj['delayId'];
                    delete this._delatIdToFuncMapping[delayId];
                }
                this.subDelyNum(len);
                this.removeEmptyDelayInfo(delayInfo);
            }
            this.setRunStat();
        }
        run(gapTime) {
            var time = fly.GlobalConfig2D.nowTime;
            gapTime = time - this._preTime;
            this._preTime = time;
            this._currentTime += gapTime;
            var delyInfo = this._firstNode;
            var currentDdelayInfo;
            var i = 0;
            while (delyInfo != null) {
                i++;
                var delDelayIds = this.delayRun(delyInfo, this._currentTime);
                if (delDelayIds != null) {
                    var deleteCount = 0;
                    var jlen = delDelayIds.length;
                    for (var j = 0; j < jlen; j++) {
                        var delDelayId = delDelayIds[i];
                        if (this._delatIdToFuncMapping[delDelayId] != null) {
                            deleteCount++;
                        }
                    }
                    this.subDelyNum(deleteCount);
                }
                currentDdelayInfo = delyInfo;
                delyInfo = delyInfo.next;
                if (currentDdelayInfo.isEmpty()) {
                    this.removeEmptyDelayInfo(currentDdelayInfo);
                }
            }
            this.setRunStat();
        }
        removeEmptyDelayInfo(delayInfo) {
            var index = this._delayPool.indexOf(delayInfo);
            if (index != -1) {
                return;
            }
            if (delayInfo == this._firstNode) {
                if (delayInfo.next != null) {
                    delayInfo.next.pre = null;
                    this._firstNode = delayInfo.next;
                }
                else {
                    this._firstNode = null;
                }
            }
            else {
                if (delayInfo.next != null) {
                    delayInfo.pre.next = delayInfo.next;
                    delayInfo.next.pre = delayInfo.pre;
                }
                else {
                    if (delayInfo.pre) {
                        delayInfo.pre.next = null;
                    }
                    else {
                        logI(delayInfo.pre, "delayInfo.pre-> this.removeEmptyDelayInfo()");
                    }
                }
            }
            var delayKey = this.getDelayKey(delayInfo.caller, delayInfo.func);
            delete this._delayFuncDic[delayKey];
            this.removeDelayKey(delayInfo.caller, delayInfo.func);
            delayInfo.clear();
            this._delayPool.push(delayInfo);
        }
        getDelayInfo(delayKey) {
            return this._delayFuncDic[delayKey];
        }
        setRunStat() {
            if (this._isRunIng) {
                if (this._currentDelayNum <= 0) {
                    Tick.removeTick("delaycall");
                    this._isRunIng = false;
                }
            }
            else {
                if (this._currentDelayNum > 0) {
                    this._preTime = Tick.time;
                    logI("delay start +++++");
                    Tick.addTick("delaycall", this, this.run);
                    this._isRunIng = true;
                }
            }
        }
        createDelyInfo(caller, callFunc, delayKey) {
            var delyInfo;
            if (this._delayPool.length) {
                delyInfo = this._delayPool.pop();
            }
            else {
                delyInfo = new fly.DelyInfo();
            }
            delyInfo.func = callFunc;
            delyInfo.caller = caller;
            this._delayFuncDic[delayKey] = delyInfo;
            return delyInfo;
        }
        removeCall(delayInfo, outKey) {
            var arr = delayInfo.callParamerList;
            var len = arr.length;
            for (var i = 0; i < len; i++) {
                var obj = arr[i];
                if (obj.outKey == outKey) {
                    return arr.splice(i, 1)[0];
                }
            }
            return null;
        }
        addCallToInfo(delayInfo, outKey, callTime, callParams) {
            delayInfo.callParamerList.push({ outKey, callTime, callParams });
        }
        delayRun(delayInfo, currentTime) {
            var runCount = 0;
            var arr = delayInfo.callParamerList;
            var len = arr.length;
            if (len <= 0) {
                return null;
            }
            var delDelayIds = [];
            for (var i = len - 1; i >= 0; i--) {
                var obj = arr[i];
                if (obj) {
                    if (obj.callTime <= currentTime) {
                        delayInfo.func.apply(delayInfo.caller, obj.callParams);
                        var deleteInfo = arr.splice(i, 1);
                        delete this._delatIdToFuncMapping[obj.outKey];
                        delDelayIds.push(obj.outKey);
                    }
                }
                else {
                    logI("延迟调用，obj为空，");
                }
            }
            return delDelayIds;
        }
    }
})(fly || (fly = {}));
//# sourceMappingURL=OldDelayCall.js.map
var fly;
(function (fly) {
    class DelyInfo {
        constructor() {
            this.callParamerList = [];
        }
        isEmpty() {
            return this.callParamerList.length == 0;
        }
        clear() {
            this.caller = null;
            this.func = null;
            this.callParamerList.length = 0;
            this.pre = null;
            this.next = null;
        }
    }
    fly.DelyInfo = DelyInfo;
})(fly || (fly = {}));
//# sourceMappingURL=DelyInfo.js.map
var fly;
(function (fly) {
    class DelayCall {
        constructor() {
            this._id = 0;
            this._isRunning = false;
            DelayCall._index++;
            this._tickname = "fly.DelayCall_" + DelayCall._index;
            this._map = new ds.StringMap();
            this._keyArr = [];
        }
        add(time, caller, func, ...args) {
            this._id++;
            var calltime = Tick.time + time;
            var call = new fly.DelayCallInfo(calltime, caller, func, args);
            this._map.put(this._id, call);
            this.updateRunStat();
            this.updateKey();
            return this._id;
        }
        remove(delayId, isCall = false) {
            var info = this._map.get(delayId);
            if (info != null) {
                this._map.remove(delayId);
                if (isCall && info.isCalled == false) {
                    info.call();
                }
                this.updateKey();
                this.updateRunStat();
            }
        }
        updateRunStat() {
            if (this._map.size() > 0) {
                if (!this._isRunning) {
                    Tick.addTick(this._tickname, this, this.tick);
                    this._isRunning = true;
                }
            }
            else {
                this._isRunning = false;
                Tick.removeTick(this._tickname);
            }
        }
        updateKey() {
            this._keyArr.length = 0;
            this._map._private_foreachKey(this, this.doUpdateKey);
        }
        doUpdateKey(key) {
            this._keyArr.push(key);
        }
        tick(timeGap) {
            var len = this._keyArr.length;
            var time = Tick.time;
            var isHaveUpdate = false;
            for (var index = 0; index < len; index++) {
                var key = this._keyArr[index];
                var del = this._map.get(key);
                if (del.callTime <= time) {
                    if (!del.isCalled) {
                        del.call();
                    }
                    this._map.remove(key);
                    isHaveUpdate = true;
                }
            }
            this.updateRunStat();
            if (isHaveUpdate) {
                this.updateKey();
            }
        }
    }
    DelayCall._index = 0;
    fly.DelayCall = DelayCall;
})(fly || (fly = {}));
//# sourceMappingURL=DelayCall.js.map
class CallerKeyInfo {
    constructor() {
        this._callerList = [];
        this._calllerIdList = [];
        this.reset();
    }
    reset() {
        this._callerList.length = 0;
        this._calllerIdList.length = 0;
        this.func = null;
    }
    addCaller(caller) {
        this._callerList.push(caller);
        this._calllerIdList.push(++CallerKeyInfo.COUNT);
    }
    removeCaller(caller) {
        var index = this._callerList.indexOf(caller);
        if (index > -1) {
            this._callerList.splice(index, 1);
            this._calllerIdList.splice(index, 1);
        }
    }
    isEmpty() {
        return this._callerList.length == 0;
    }
    getCallerKey(caller) {
        var callerIndex = this._callerList.indexOf(caller);
        if (callerIndex == -1) {
            return 0;
        }
        return this._calllerIdList[callerIndex];
    }
}
CallerKeyInfo.COUNT = 0;
CallerKeyInfo.CALLER_COUNT = 0;
//# sourceMappingURL=CallerKeyInfo.js.map
var fly;
(function (fly) {
    var utils;
    (function (utils) {
        class CountShare {
            constructor($destroyDelay) {
                this._destroyDelay = 0;
                this._count = 0;
                this.count = 0;
                this._destroyDelay = $destroyDelay;
                this._shareDataDict = {};
                this._waitingDestroyShareDataDict = {};
            }
            startCount() {
            }
            stopCount() {
            }
            hasShareData($key) {
                return this._shareDataDict[$key] != null;
            }
            getShareData($key) {
                var csd = this._shareDataDict[$key];
                return csd;
            }
            addShareData($key, $csd) {
                var csd = this.getShareData($key);
                if (csd) {
                    csd.destroy();
                    csd = null;
                }
                this._shareDataDict[$key] = $csd;
                this._count++;
            }
            removeShareData($key) {
                var csd = this.getShareData($key);
                if (csd != null) {
                    csd.destroy();
                    csd = null;
                    this._count--;
                }
                delete this._shareDataDict[$key];
                delete this._waitingDestroyShareDataDict[$key];
            }
            installShareData($key, obj) {
                var csd = this._shareDataDict[$key];
                csd.addCount(obj);
                if (this._waitingDestroyShareDataDict[$key] == null) {
                    delete this._waitingDestroyShareDataDict[$key];
                }
                return csd;
            }
            uninstallShareData($key, obj) {
                var csd = this._shareDataDict[$key];
                if (csd) {
                    csd.removeCount(obj);
                    if (csd.count <= 0) {
                        if (this._waitingDestroyShareDataDict[$key] == null) {
                            this._waitingDestroyShareDataDict[$key] = getTimer();
                        }
                    }
                }
            }
            checkUninstall() {
                if (++this.count < 700) {
                    return;
                }
                this.count %= 700;
                var nowTime = getTimer();
                var cnt = 0;
                var csd;
                for (var key in this._waitingDestroyShareDataDict) {
                    cnt++;
                    var tm = nowTime - this._waitingDestroyShareDataDict[key] - this._destroyDelay;
                    if (tm > 0) {
                        delete this._waitingDestroyShareDataDict[key];
                        csd = this.getShareData(key);
                        if (csd) {
                            if (csd.count <= 0 && (tm - csd.destroyTm) > 0) {
                                this.removeShareData(key);
                            }
                        }
                    }
                }
            }
            uninstallAll() {
                for (var key in this._shareDataDict) {
                    this.removeShareData(key);
                }
                this._shareDataDict = {};
                this._waitingDestroyShareDataDict = {};
            }
            uninstallAllWait() {
                var key;
                for (key in this._waitingDestroyShareDataDict) {
                    this.removeShareData(key);
                }
            }
            get cacheCnt() {
                return this._count;
            }
            getAllCacheKeyList() {
                var list = new Array();
                var key;
                for (key in this._shareDataDict) {
                    list.push(key);
                }
                return list;
            }
            getAllCacheDataList() {
                var list = new Array();
                var data;
                for (var key in this._shareDataDict) {
                    data = this._shareDataDict[key];
                    list.push(data);
                }
                return list;
            }
        }
        utils.CountShare = CountShare;
    })(utils = fly.utils || (fly.utils = {}));
})(fly || (fly = {}));
//# sourceMappingURL=CountShare.js.map
var CONST_INT;
(function (CONST_INT) {
    CONST_INT[CONST_INT["MIN_VALUE"] = -100000000] = "MIN_VALUE";
    CONST_INT[CONST_INT["MAX_VALUE"] = 100000000] = "MAX_VALUE";
})(CONST_INT || (CONST_INT = {}));
class ResourceGroup {
}
ResourceGroup.MAP_ZONE = "MAP_ZONE";
ResourceGroup.AVATAER = "AVATAER";
ResourceGroup.AVATAER_EFFECT = "AVATAER_EFFECT";
ResourceGroup.ICON_IMAGE = "ICON_IMAGE";
ResourceGroup.IMAGE = "IMAGE";
//# sourceMappingURL=ConstEnum.js.map
var fly;
(function (fly) {
    var utils;
    (function (utils) {
        class ClassUtils {
            constructor() {
            }
            static regClass(className, classDef) {
                ClassUtils._classMap[className] = classDef;
                if (isLaya) {
                    Laya.ClassUtils.regClass(className, classDef);
                }
            }
            static getRegClass(className) {
                if (isLaya) {
                    return Laya.ClassUtils.getClass(className);
                }
                else {
                    return ClassUtils._classMap[className];
                }
            }
        }
        ClassUtils._temParam = [];
        ClassUtils._classMap = {};
        utils.ClassUtils = ClassUtils;
    })(utils = fly.utils || (fly.utils = {}));
})(fly || (fly = {}));
//# sourceMappingURL=ClassUtils.js.map
class CallBack {
    constructor(thisArg, func, ...args) {
        this._thisArg = thisArg;
        this._func = func;
        this._args = args;
        if (this._func == null) {
            logE("CallBack-->  func 为空");
        }
    }
    call(...callArgs) {
        var arr = this.getCallBackArgs(callArgs);
        return this._func.apply(this._thisArg, arr);
    }
    getCallBackArgs(callArgs) {
        var arr;
        if (this._args != null) {
            arr = this._args;
        }
        if (callArgs && callArgs.length) {
            arr = arr || [];
            for (var index = 0; index < callArgs.length; index++) {
                arr.push(callArgs[index]);
            }
        }
        return arr;
    }
    destroy() {
        this._thisArg = null;
        this._func = null;
        this._args = null;
    }
    get caller() {
        return this._thisArg;
    }
    get func() {
        return this._func;
    }
}
//# sourceMappingURL=CallBack.js.map
function arrayBuffToString(arrayBuffer) {
    var bytesArr = new fly.net.ByteArray();
    bytesArr.endian = fly.net.ByteArray.BIG_ENDIAN;
    bytesArr.writeArrayBuffer(arrayBuffer);
    bytesArr.position = 0;
    var str = bytesArr.readMultiByte(bytesArr.bytesAvailable, "utf-8");
    return str;
}
var isLaya = true;
var logLevel = 0;
function logI(...args) {
    if (logLevel <= fly.enums.LogLevel.INF) {
        var e = new Error("111");
        var msg = e.stack;
        var arr = msg.split("\n");
        var line = arr[2];
        var row = line.split("(");
        console.log("INFO:【" + row[0].trim() + "】 " + " : " + args.join(","));
    }
}
function logW(...args) {
    if (logLevel <= fly.enums.LogLevel.WAR) {
        var e = new Error("111");
        var msg = e.stack;
        var arr = msg.split("\n");
        var line = arr[2];
        var row = line.split("(");
        console.warn("WAR :【" + row[0].trim() + "】 " + " : " + args.join(","), false);
    }
}
function logE(...args) {
    if (logLevel <= fly.enums.LogLevel.ERR) {
        var e = new Error("111");
        var msg = e.stack;
        var arr = msg.split("\n");
        var line = arr[2];
        var row = line.split("(");
        console.error("ERR :【" + row[0].trim() + "】 " + " : " + args.join(","));
    }
}
function logD(...args) {
    if (logLevel <= fly.enums.LogLevel.DEBUG) {
        var e = new Error("111");
        var msg = e.stack;
        var arr = msg.split("\n");
        var line = arr[2];
        var row = line.split("(");
        console.log("DEB :【" + row[0].trim() + "】 " + " : " + args.join(","));
    }
}
function getTimer() {
    return new Date().getTime();
}
function getRequestAnimationFrame() {
    var fun;
    if (window.hasOwnProperty("requestAnimationFrame")) {
        fun = window.requestAnimationFrame;
    }
    else if (window.hasOwnProperty("webkitRequestAnimationFrame")) {
        fun = window.webkitRequestAnimationFrame;
    }
    else if (window.hasOwnProperty("mozRequestAnimationFrame")) {
        fun = window["mozRequestAnimationFrame"];
    }
    else if (window.hasOwnProperty("oRequestAnimationFrame")) {
        fun = window["oRequestAnimationFrame"];
    }
    else if (window.hasOwnProperty("msRequestAnimationFrame")) {
        fun = window["msRequestAnimationFrame"];
    }
    else {
        fun = function (c) { return window.setTimeout(c, 1000 / 60); };
        ;
    }
    return fun;
}
var animationFrame = getRequestAnimationFrame();
//# sourceMappingURL=TopLevel.js.map
class Tick {
    constructor() {
    }
    static setup() {
        this._loopMap = new ds.StringMap();
        animationFrame(this.loop);
    }
    static loop(time) {
        Tick._gapTime = time - Tick._preTime;
        Tick._loopMap._private_foreachValue(this, Tick.run);
        animationFrame(Tick.loop);
        Tick._preTime = time;
    }
    static get time() {
        return this._preTime;
    }
    static run(callBack) {
        var time = Tick._gapTime;
        callBack.call(time);
    }
    static addTick(loopName, caller, func, ...args) {
        if (this._loopMap.containsKey(loopName)) {
            logE("重复的loop：" + loopName);
            throw new Error("重复的loop：" + loopName);
        }
        var call = new RenderUnitCallBack(caller, func, args);
        this._loopMap.put(loopName, call);
    }
    static removeTick(loopName) {
        this._loopMap.remove(loopName);
    }
}
Tick._preTime = 0;
Tick._gapTime = 0;
//# sourceMappingURL=Tick.js.map
var fly;
(function (fly) {
    var renders;
    (function (renders) {
        class SubTexture {
            constructor() {
            }
            parse(tex, rect, name) {
                if (isLaya) {
                    this.setLaya(tex, rect, name);
                }
                else {
                }
            }
            setLaya(tex, rect, name) {
            }
            get width() {
                if (isLaya) {
                    return this._texture.width;
                }
                else {
                    return this._texture.textureWidth;
                }
            }
            get height() {
                if (isLaya) {
                    return this._texture.height;
                }
                else {
                    return this._texture.textureHeight;
                }
            }
            getLayaTexture() {
                return this._texture;
            }
        }
        renders.SubTexture = SubTexture;
    })(renders = fly.renders || (fly.renders = {}));
})(fly || (fly = {}));
//# sourceMappingURL=SubTexture.js.map
//# sourceMappingURL=ITextureProxy.js.map
var fly;
(function (fly) {
    var net;
    (function (net) {
        class ByteArray {
            constructor() {
                this.classDic = {};
                this._length = 0;
                this._objectEncoding_ = 0;
                this._position_ = 0;
                this._allocated_ = 8;
                this._littleEndian_ = false;
                this.___resizeBuffer(this._allocated_);
            }
            clear() {
                this._strTable = [];
                this._objTable = [];
                this._traitsTable = [];
                this._position_ = 0;
                this.length = 0;
            }
            ensureWrite(lengthToEnsure) {
                if (this._length < lengthToEnsure) {
                    this.length = lengthToEnsure;
                }
            }
            readBoolean() {
                return (this.readByte() != 0);
            }
            readBytes(bytes, offset = 0, length = 0) {
                if (offset < 0 || length < 0) {
                    throw new Error("Read error - Out of bounds" + this.length);
                }
                if (length == 0) {
                    length = this._length - this._position_;
                }
                bytes.ensureWrite(offset + length);
                bytes._byteView_.set(this._byteView_.subarray(this._position_, this._position_ + length), offset);
                bytes.pos = offset;
                this._position_ += length;
                if (bytes.pos + length > bytes.length) {
                    bytes.length = bytes.pos + length;
                }
            }
            readDouble() {
                var double = this._data_.getFloat64(this._position_, this._littleEndian_);
                this._position_ += 8;
                return double;
            }
            readFloat() {
                var float = this._data_.getFloat32(this._position_, this._littleEndian_);
                this._position_ += 4;
                return float;
            }
            readFullBytes(bytes, pos, len) {
                this.ensureWrite(len);
                for (var i = pos; i < pos + len; i++) {
                    this._data_.setInt8(this._position_++, bytes.get(i));
                }
            }
            readInt() {
                var tInt = this._data_.getInt32(this._position_, this._littleEndian_);
                this._position_ += 4;
                return tInt;
            }
            readShort() {
                var short = this._data_.getInt16(this._position_, this._littleEndian_);
                this._position_ += 2;
                return short;
            }
            readUnsignedByte() {
                return this._data_.getUint8(this._position_++);
            }
            readByte() {
                return this._data_.getInt8(this._position_++);
            }
            readUnsignedInt() {
                var uInt = this._data_.getUint32(this._position_, this._littleEndian_);
                this._position_ += 4;
                return Number(uInt);
            }
            readUnsignedShort() {
                var uShort = this._data_.getUint16(this._position_, this._littleEndian_);
                this._position_ += 2;
                return uShort;
            }
            readUTF() {
                return this.readUTFBytes(this.readUnsignedShort());
            }
            readUnicode(length) {
                var value = "";
                var max = this._position_ + length;
                var c1, c2 = 0;
                while (this._position_ < max) {
                    c2 = this._byteView_[this._position_++];
                    c1 = this._byteView_[this._position_++];
                    value += String.fromCharCode(c1 << 8 | c2);
                }
                return value;
            }
            readMultiByte(length, charSet) {
                if (charSet == "UNICODE" || charSet == "unicode") {
                    return this.readUnicode(length);
                }
                return this.readUTFBytes(length);
            }
            readUTFBytes(len = -1) {
                var value = "";
                var max = this._position_ + len;
                var c, c2, c3 = 0;
                while (this._position_ < max) {
                    c = this._data_.getUint8(this._position_++);
                    if (c < 0x80) {
                        if (c != 0) {
                            value += String.fromCharCode(c);
                        }
                    }
                    else if (c < 0xE0) {
                        value += String.fromCharCode(((c & 0x3F) << 6) | (this._data_.getUint8(this._position_++) & 0x7F));
                    }
                    else if (c < 0xF0) {
                        c2 = this._data_.getUint8(this._position_++);
                        value += String.fromCharCode(((c & 0x1F) << 12) | ((c2 & 0x7F) << 6) | (this._data_.getUint8(this._position_++) & 0x7F));
                    }
                    else {
                        c2 = this._data_.getUint8(this._position_++);
                        c3 = this._data_.getUint8(this._position_++);
                        value += String.fromCharCode(((c & 0x0F) << 18) | ((c2 & 0x7F) << 12) | ((c3 << 6) & 0x7F) | (this._data_.getUint8(this._position_++) & 0x7F));
                    }
                }
                return value;
            }
            toString() {
                var cachePosition = this._position_;
                this._position_ = 0;
                var value = this.readUTFBytes(this.length);
                this._position_ = cachePosition;
                return value;
            }
            writeBoolean(value) {
                this.writeByte(value ? 1 : 0);
            }
            writeByte(value) {
                this.ensureWrite(this._position_ + 1);
                this._data_.setInt8(this._position_, value);
                this._position_ += 1;
            }
            writeBytes(bytes, offset = 0, length = 0) {
                if (offset < 0 || length < 0) {
                    throw "writeBytes error - Out of bounds";
                }
                if (length == 0) {
                    length = bytes.length - offset;
                }
                this.ensureWrite(this._position_ + length);
                this._byteView_.set(bytes._byteView_.subarray(offset, offset + length), this._position_);
                this._position_ += length;
            }
            writeArrayBuffer(arraybuffer, offset = 0, length = 0) {
                if (offset < 0 || length < 0) {
                    throw "writeArrayBuffer error - Out of bounds";
                }
                if (length == 0) {
                    length = arraybuffer.byteLength - offset;
                }
                this.ensureWrite(this._position_ + length);
                var uint8array = new Uint8Array(arraybuffer);
                this._byteView_.set(uint8array.subarray(offset, offset + length), this._position_);
                this._position_ += length;
            }
            writeDouble(x) {
                this.ensureWrite(this._position_ + 8);
                this._data_.setFloat64(this._position_, x, this._littleEndian_);
                this._position_ += 8;
            }
            writeFloat(x) {
                this.ensureWrite(this._position_ + 4);
                this._data_.setFloat32(this._position_, x, this._littleEndian_);
                this._position_ += 4;
            }
            writeInt(value) {
                this.ensureWrite(this._position_ + 4);
                this._data_.setInt32(this._position_, value, this._littleEndian_);
                this._position_ += 4;
            }
            writeShort(value) {
                this.ensureWrite(this._position_ + 2);
                this._data_.setInt16(this._position_, value, this._littleEndian_);
                this._position_ += 2;
            }
            writeUnsignedInt(value) {
                this.ensureWrite(this._position_ + 4);
                this._data_.setUint32(this._position_, value, this._littleEndian_);
                this._position_ += 4;
            }
            writeUnsignedShort(value) {
                this.ensureWrite(this._position_ + 2);
                this._data_.setUint16(this._position_, value, this._littleEndian_);
                this._position_ += 2;
            }
            writeUTF(value) {
                value = value + "";
                this.writeUnsignedShort(this._getUTFBytesCount(value));
                this.writeUTFBytes(value);
            }
            writeUnicode(value) {
                value = value + "";
                this.ensureWrite(this._position_ + value.length * 2);
                var c = 0;
                for (var i = 0, sz = value.length; i < sz; i++) {
                    c = value.charCodeAt(i);
                    this._byteView_[this._position_++] = c & 0xff;
                    this._byteView_[this._position_++] = c >> 8;
                }
            }
            writeMultiByte(value, charSet) {
                value = value + "";
                if (charSet == "UNICODE" || charSet == "unicode") {
                    return this.writeUnicode(value);
                }
                this.writeUTFBytes(value);
            }
            writeUTFBytes(value) {
                value = value + "";
                this.ensureWrite(this._position_ + value.length * 4);
                for (var i = 0, sz = value.length; i < sz; i++) {
                    var c = value.charCodeAt(i);
                    if (c <= 0x7F) {
                        this.writeByte(c);
                    }
                    else if (c <= 0x7FF) {
                        this.writeByte(0xC0 | (c >> 6));
                        this.writeByte(0x80 | (c & 63));
                    }
                    else if (c <= 0xFFFF) {
                        this.writeByte(0xE0 | (c >> 12));
                        this.writeByte(0x80 | ((c >> 6) & 63));
                        this.writeByte(0x80 | (c & 63));
                    }
                    else {
                        this.writeByte(0xF0 | (c >> 18));
                        this.writeByte(0x80 | ((c >> 12) & 63));
                        this.writeByte(0x80 | ((c >> 6) & 63));
                        this.writeByte(0x80 | (c & 63));
                    }
                }
                this.length = this._position_;
            }
            __fromBytes(inBytes) {
                this._byteView_ = new Uint8Array(inBytes.getData());
                this.length = this._byteView_.length;
                this._allocated_ = this.length;
            }
            __get(pos) {
                return this._data_.getUint8(pos);
            }
            _getUTFBytesCount(value) {
                var count = 0;
                value = value + "";
                for (var i = 0, sz = value.length; i < sz; i++) {
                    var c = value.charCodeAt(i);
                    if (c <= 0x7F) {
                        count += 1;
                    }
                    else if (c <= 0x7FF) {
                        count += 2;
                    }
                    else if (c <= 0xFFFF) {
                        count += 3;
                    }
                    else {
                        count += 4;
                    }
                }
                return count;
            }
            _byteAt_(index) {
                return this._byteView_[index];
            }
            _byteSet_(index, value) {
                this.ensureWrite(index + 1);
                this._byteView_[index] = value;
            }
            uncompress(algorithm = "zlib") {
                var inflate = new Zlib.Inflate(this._byteView_);
                this._byteView_ = inflate.decompress();
                this._data_ = new DataView(this._byteView_.buffer);
                ;
                this._allocated_ = this._length = this._byteView_.byteLength;
                this._position_ = 0;
            }
            compress(algorithm = "zlib") {
                var deflate = new Zlib.Deflate(this._byteView_);
                this._byteView_ = deflate.compress();
                this._data_ = new DataView(this._byteView_.buffer);
                ;
                this._position_ = this._allocated_ = this._length = this._byteView_.byteLength;
            }
            ___resizeBuffer(len) {
                try {
                    var newByteView = new Uint8Array(len);
                    if (this._byteView_ != null) {
                        if (this._byteView_.length <= len) {
                            newByteView.set(this._byteView_);
                        }
                        else {
                            newByteView.set(this._byteView_.subarray(0, len));
                        }
                    }
                    this._byteView_ = newByteView;
                    this._data_ = new DataView(newByteView.buffer);
                }
                catch (error) {
                    throw "___resizeBuffer err:" + len;
                }
            }
            __getBuffer() {
                return this._data_.buffer;
            }
            __set(pos, v) {
                this._data_.setUint8(pos, v);
            }
            static __ofBuffer(buffer) {
                var bytes = new ByteArray();
                bytes.length = bytes.allocated = buffer.byteLength;
                bytes.data = new DataView(buffer);
                bytes.byteView = new Uint8Array(buffer);
                return bytes;
            }
            setUint8Array(data) {
                this._byteView_ = data;
                this._data_ = new DataView(data.buffer);
                this._length = data.byteLength;
                this._position_ = 0;
            }
            getUint8Array() {
                return this._byteView_;
            }
            get bytesAvailable() {
                return this.length - this._position_;
            }
            get endian() {
                return this._littleEndian_ ? ByteArray.LITTLE_ENDIAN : ByteArray.BIG_ENDIAN;
            }
            set endian(endianStr) {
                this._littleEndian_ = (endianStr == ByteArray.LITTLE_ENDIAN);
            }
            set length(value) {
                this.___resizeBuffer(this._allocated_ = value);
                this._length = value;
            }
            get length() {
                return this._length;
            }
            get position() {
                return this.pos;
            }
            set position(value) {
                this.pos = value;
            }
            get pos() {
                return this._position_;
            }
            set pos(pos) {
                if (pos < this._length) {
                    this._position_ = pos < 0 ? 0 : pos;
                }
                else {
                    this._position_ = pos;
                    this.length = pos;
                }
            }
            readObject() {
                this._strTable = [];
                this._objTable = [];
                this._traitsTable = [];
                return this.readObject2();
            }
            readObject2() {
                var type = this.readByte();
                return this.readObjectValue(type);
            }
            readObjectValue(type) {
                var value;
                switch (type) {
                    case ByteArray.NULL_TYPE:
                        break;
                    case ByteArray.STRING_TYPE:
                        value = this.__readString();
                        break;
                    case ByteArray.INTEGER_TYPE:
                        value = this.readInterger();
                        break;
                    case ByteArray.FALSE_TYPE:
                        value = false;
                        break;
                    case ByteArray.TRUE_TYPE:
                        value = true;
                        break;
                    case ByteArray.OBJECT_TYPE:
                        value = this.readScriptObject();
                        break;
                    case ByteArray.ARRAY_TYPE:
                        value = this.readArray();
                        break;
                    case ByteArray.DOUBLE_TYPE:
                        value = this.readDouble();
                        break;
                    case ByteArray.BYTEARRAY_TYPE:
                        value = this.readByteArray();
                        break;
                    default:
                }
                return value;
            }
            readByteArray() {
                var ref = this.readUInt29();
                if ((ref & 1) == 0) {
                    return this.getObjRef(ref >> 1);
                }
                else {
                    var len = (ref >> 1);
                    var ba = new ByteArray();
                    this._objTable.push(ba);
                    this.readBytes(ba, 0, len);
                    return ba;
                }
            }
            readInterger() {
                var i = this.readUInt29();
                i = (i << 3) >> 3;
                return parseInt(i + "");
            }
            getStrRef(ref) {
                return this._strTable[ref];
            }
            getObjRef(ref) {
                return this._objTable[ref];
            }
            __readString() {
                var ref = this.readUInt29();
                if ((ref & 1) == 0) {
                    return this.getStrRef(ref >> 1);
                }
                var len = (ref >> 1);
                if (len == 0) {
                    return ByteArray.EMPTY_STRING;
                }
                var str = this.readUTFBytes(len);
                this._strTable.push(str);
                return str;
            }
            readTraits(ref) {
                var ti;
                if ((ref & 3) == 1) {
                    ti = this.getTraitReference(ref >> 2);
                    return ti.propoties ? ti : { obj: {} };
                }
                else {
                    var externalizable = ((ref & 4) == 4);
                    var isDynamic = ((ref & 8) == 8);
                    var count = (ref >> 4);
                    var className = this.__readString();
                    ti = {};
                    ti.className = className;
                    ti.propoties = [];
                    ti.dynamic = isDynamic;
                    ti.externalizable = externalizable;
                    if (count > 0) {
                        for (var i = 0; i < count; i++) {
                            var propName = this.__readString();
                            ti.propoties.push(propName);
                        }
                    }
                    this._traitsTable.push(ti);
                    return ti;
                }
            }
            readScriptObject() {
                var ref = this.readUInt29();
                if ((ref & 1) == 0) {
                    return this.getObjRef(ref >> 1);
                }
                else {
                    var objref = this.readTraits(ref);
                    var className = objref.className;
                    var externalizable = objref.externalizable;
                    var obj;
                    var propName;
                    var pros = objref.propoties;
                    if (className && className != "") {
                        var rst = fly.utils.ClassUtils.getRegClass(className);
                        if (rst) {
                            obj = new rst();
                        }
                        else {
                            obj = {};
                        }
                    }
                    else {
                        obj = {};
                    }
                    this._objTable.push(obj);
                    if (pros) {
                        for (var d = 0; d < pros.length; d++) {
                            obj[pros[d]] = this.readObject2();
                        }
                    }
                    if (objref.dynamic) {
                        for (;;) {
                            propName = this.__readString();
                            if (propName == null || propName.length == 0) {
                                break;
                            }
                            obj[propName] = this.readObject2();
                        }
                    }
                    return obj;
                }
            }
            readArray() {
                var ref = this.readUInt29();
                if ((ref & 1) == 0) {
                    return this.getObjRef(ref >> 1);
                }
                var obj = null;
                var count = (ref >> 1);
                var propName;
                for (;;) {
                    propName = this.__readString();
                    if (propName == null || propName.length == 0) {
                        break;
                    }
                    if (obj == null) {
                        obj = {};
                        this._objTable.push(obj);
                    }
                    obj[propName] = this.readObject2();
                }
                if (obj == null) {
                    obj = [];
                    this._objTable.push(obj);
                    var i = 0;
                    for (i = 0; i < count; i++) {
                        obj.push(this.readObject2());
                    }
                }
                else {
                    for (i = 0; i < count; i++) {
                        obj[i.toString()] = this.readObject2();
                    }
                }
                return obj;
            }
            readUInt29() {
                var value = 0;
                var b = this.readByte() & 0xFF;
                if (b < 128) {
                    return b;
                }
                value = (b & 0x7F) << 7;
                b = this.readByte() & 0xFF;
                if (b < 128) {
                    return (value | b);
                }
                value = (value | (b & 0x7F)) << 7;
                b = this.readByte() & 0xFF;
                if (b < 128) {
                    return (value | b);
                }
                value = (value | (b & 0x7F)) << 8;
                b = this.readByte() & 0xFF;
                return (value | b);
            }
            writeObject(o) {
                this._strTable = [];
                this._objTable = [];
                this._traitsTable = [];
                this.writeObject2(o);
            }
            writeObject2(o) {
                if (o == null) {
                    this.writeAMFNull();
                    return;
                }
                var type = typeof (o);
                if (type === "string") {
                    this.writeAMFString(o);
                }
                else if (type === "boolean") {
                    this.writeAMFBoolean(o);
                }
                else if (type === "number") {
                    if (String(o).indexOf(".") != -1) {
                        this.writeAMFDouble(o);
                    }
                    else {
                        this.writeAMFInt(o);
                    }
                }
                else if (type === "object") {
                    if (o instanceof Array) {
                        this.writeArray(o);
                    }
                    else if (o instanceof ByteArray) {
                        this.writeAMFByteArray(o);
                    }
                    else {
                        this.writeCustomObject(o);
                    }
                }
            }
            writeAMFNull() {
                this.writeByte(ByteArray.NULL_TYPE);
            }
            writeAMFString(s) {
                this.writeByte(ByteArray.STRING_TYPE);
                this.writeStringWithoutType(s);
            }
            writeStringWithoutType(s) {
                if (s.length == 0) {
                    this.writeUInt29(1);
                    return;
                }
                var ref = this._strTable.indexOf(s);
                if (ref >= 0) {
                    this.writeUInt29(ref << 1);
                }
                else {
                    var utflen = this._getUTFBytesCount(s);
                    this.writeUInt29((utflen << 1) | 1);
                    this.writeUTFBytes(s);
                    this._strTable.push(s);
                }
            }
            writeAMFInt(i) {
                if (i >= ByteArray.INT28_MIN_VALUE && i <= ByteArray.INT28_MAX_VALUE) {
                    i = i & ByteArray.UINT29_MASK;
                    this.writeByte(ByteArray.INTEGER_TYPE);
                    this.writeUInt29(i);
                }
                else {
                    this.writeAMFDouble(i);
                }
            }
            writeAMFDouble(d) {
                this.writeByte(ByteArray.DOUBLE_TYPE);
                this.writeDouble(d);
            }
            writeAMFBoolean(b) {
                if (b) {
                    this.writeByte(ByteArray.TRUE_TYPE);
                }
                else {
                    this.writeByte(ByteArray.FALSE_TYPE);
                }
            }
            writeCustomObject(o) {
                this.writeByte(ByteArray.OBJECT_TYPE);
                var refNum = this._objTable.indexOf(o);
                if (refNum != -1) {
                    this.writeUInt29(refNum << 1);
                }
                else {
                    this._objTable.push(o);
                    var traitsInfo = {};
                    traitsInfo.className = this.getAliasByObj(o);
                    traitsInfo.dynamic = false;
                    traitsInfo.externalizable = false;
                    traitsInfo.properties = [];
                    for (var prop in o) {
                        if (o[prop] instanceof Function) {
                            continue;
                        }
                        traitsInfo.properties.push(prop);
                        traitsInfo.properties.sort();
                    }
                    var tRef = ByteArray.getTraitsInfoRef(this._traitsTable, traitsInfo);
                    var count = traitsInfo.properties.length;
                    var i = 0;
                    if (tRef >= 0) {
                        this.writeUInt29((tRef << 2) | 1);
                    }
                    else {
                        this._traitsTable.push(traitsInfo);
                        this.writeUInt29(3 | (traitsInfo.externalizable ? 4 : 0) | (traitsInfo.dynamic ? 8 : 0) | (count << 4));
                        this.writeStringWithoutType(traitsInfo.className);
                        for (i = 0; i < count; i++) {
                            this.writeStringWithoutType(traitsInfo.properties[i]);
                        }
                    }
                    for (i = 0; i < count; i++) {
                        this.writeObject2(o[traitsInfo.properties[i]]);
                    }
                }
            }
            static getTraitsInfoRef(arr, ti) {
                var i, len = arr.length;
                for (i = 0; i < len; i++) {
                    if (ByteArray.equalsTraitsInfo(ti, arr[i])) {
                        return i;
                    }
                }
                return -1;
            }
            static equalsTraitsInfo(ti1, ti2) {
                if (ti1 == ti2) {
                    return true;
                }
                if (!ti1.className === ti2.className) {
                    return false;
                }
                if (ti1.properties.length != ti2.properties.length) {
                    return false;
                }
                var len = ti1.properties.length;
                var prop;
                ti1.properties.sort();
                ti2.properties.sort();
                for (var i = 0; i < len; i++) {
                    if (ti1.properties[i] != ti2.properties[i]) {
                        return false;
                    }
                }
                return true;
            }
            getAliasByObj(obj) {
                return "";
            }
            writeArray(value) {
                this.writeByte(ByteArray.ARRAY_TYPE);
                var len = value.length;
                var ref = this._objTable.indexOf(value);
                if (ref > -1) {
                    this.writeUInt29(len << 1);
                }
                else {
                    this.writeUInt29((len << 1) | 1);
                    this.writeStringWithoutType(ByteArray.EMPTY_STRING);
                    for (var i = 0; i < len; i++) {
                        this.writeObject2(value[i]);
                    }
                    this._objTable.push(value);
                }
            }
            writeAMFByteArray(ba) {
                this.writeByte(ByteArray.BYTEARRAY_TYPE);
                var ref = this._objTable.indexOf(ba);
                if (ref >= 0) {
                    this.writeUInt29(ref << 1);
                }
                else {
                    var len = ba.length;
                    this.writeUInt29((len << 1) | 1);
                    this.writeBytes(ba, 0, len);
                }
            }
            writeMapAsECMAArray(o) {
                this.writeByte(ByteArray.ARRAY_TYPE);
                this.writeUInt29((0 << 1) | 1);
                var count, key;
                for (key in o) {
                    count++;
                    this.writeStringWithoutType(key);
                    this.writeObject2(o[key]);
                }
                this.writeStringWithoutType(ByteArray.EMPTY_STRING);
            }
            writeUInt29(ref) {
                if (ref < 0x80) {
                    this.writeByte(ref);
                }
                else if (ref < 0x4000) {
                    this.writeByte(((ref >> 7) & 0x7F) | 0x80);
                    this.writeByte(ref & 0x7F);
                }
                else if (ref < 0x200000) {
                    this.writeByte(((ref >> 14) & 0x7F) | 0x80);
                    this.writeByte(((ref >> 7) & 0x7F) | 0x80);
                    this.writeByte(ref & 0x7F);
                }
                else if (ref < 0x40000000) {
                    this.writeByte(((ref >> 22) & 0x7F) | 0x80);
                    this.writeByte(((ref >> 15) & 0x7F) | 0x80);
                    this.writeByte(((ref >> 8) & 0x7F) | 0x80);
                    this.writeByte(ref & 0xFF);
                }
                else {
                }
            }
            getTraitReference(ref) {
                return this._traitsTable[ref];
            }
        }
        ByteArray.BIG_ENDIAN = "bigEndian";
        ByteArray.LITTLE_ENDIAN = "littleEndian";
        ByteArray.UNDEFINED_TYPE = 0;
        ByteArray.NULL_TYPE = 1;
        ByteArray.FALSE_TYPE = 2;
        ByteArray.TRUE_TYPE = 3;
        ByteArray.INTEGER_TYPE = 4;
        ByteArray.DOUBLE_TYPE = 5;
        ByteArray.STRING_TYPE = 6;
        ByteArray.XML_TYPE = 7;
        ByteArray.DATE_TYPE = 8;
        ByteArray.ARRAY_TYPE = 9;
        ByteArray.OBJECT_TYPE = 10;
        ByteArray.AVMPLUSXML_TYPE = 11;
        ByteArray.BYTEARRAY_TYPE = 12;
        ByteArray.EMPTY_STRING = "";
        ByteArray.UINT29_MASK = 0x1FFFFFFF;
        ByteArray.INT28_MAX_VALUE = 0x0FFFFFFF;
        ByteArray.INT28_MIN_VALUE = -268435456;
        net.ByteArray = ByteArray;
    })(net = fly.net || (fly.net = {}));
})(fly || (fly = {}));
//# sourceMappingURL=ByteArray.js.map
var fly;
(function (fly) {
    class Rectangle {
        constructor() {
        }
        setTo(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        clone() {
            var re = new Rectangle();
            re.x = this.x;
            re.y = this.y;
            re.width = this.width;
            re.height = this.height;
            return re;
        }
        contains(x, y) {
            logE("Rectangle-->contains  未实现");
            return false;
        }
    }
    fly.Rectangle = Rectangle;
})(fly || (fly = {}));
//# sourceMappingURL=Rectangle.js.map
var fly;
(function (fly) {
    class Point {
        constructor(x = 0, y = 0) {
        }
        setTo(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }
    }
    fly.Point = Point;
})(fly || (fly = {}));
//# sourceMappingURL=Point.js.map
var fly;
(function (fly) {
    var loader;
    (function (loader) {
        class URLLoaderDataFormat {
            constructor() {
            }
        }
        URLLoaderDataFormat.TEXT = "text";
        URLLoaderDataFormat.BINARY = "arraybuffer";
        loader.URLLoaderDataFormat = URLLoaderDataFormat;
    })(loader = fly.loader || (fly.loader = {}));
})(fly || (fly = {}));
//# sourceMappingURL=URLLoaderDataFormat.js.map
var fly;
(function (fly) {
    class TextureParse {
        constructor() {
        }
        static parse(url, fragment, caller, onload) {
            TextureParse.loadBytes(fragment, caller, onload);
        }
        static loadBytes(fragment, caller, onload) {
            var blobType = { type: "application/octet-binary" };
            var blobFragment = [];
            var blob;
            try {
                blobFragment[0] = fragment;
                blob = new Blob(blobFragment, blobType);
            }
            catch (e) {
                var win = window;
                win.BlobBuilder = win.BlobBuilder || win.WebKitBlobBuilder || win.MozBlobBuilder || win.MSBlobBuilder;
                if (e.name == 'TypeError' && win.BlobBuilder) {
                    var bb = new win.BlobBuilder();
                    bb.append(fragment);
                    blob = bb.getBlob("image/png");
                }
            }
            var url = URL.createObjectURL(blob);
            if (isLaya) {
                var htmlImg = Laya.HTMLImage.create(url);
                if (onload != null) {
                }
            }
            else {
            }
        }
    }
    fly.TextureParse = TextureParse;
})(fly || (fly = {}));
//# sourceMappingURL=TextureParse.js.map
var fly;
(function (fly) {
    var loader;
    (function (loader_1) {
        class MultiUrlLoadManager {
            constructor() {
            }
            static setup(versionFunc) {
                this.getUrlWithVersion = versionFunc;
                this.waitingDict = new ds.StringMap();
                this.loadingDict = new ds.StringMap();
                this.multipleDict = new ds.StringMap();
                this.loadingQueue = [new loader_1.MultiUrlLoader(), new loader_1.MultiUrlLoader(), new loader_1.MultiUrlLoader(), new loader_1.MultiUrlLoader(), new loader_1.MultiUrlLoader()];
                this.waitingQueue = new Array();
                this._detailLoadedBytes = new ds.StringMap();
                this._detailLoadedCount = new ds.StringMap();
                this._detailLoadSpeed = new ds.StringMap();
            }
            static loadByData(task) {
                if (task == null || task.url == null) {
                    logW("加入了一个空的加载任务到加载队列。");
                    return;
                }
                if (MultiUrlLoadManager.inside(task.url)) {
                    MultiUrlLoadManager.addToMultipleQueue(task);
                }
                else {
                    MultiUrlLoadManager.addToWaitingQueue(task);
                    MultiUrlLoadManager.loadNext();
                }
            }
            static load(url, caller = null, onComplete = null, onUpdate = null, onError = null, dataFormat = null, priority = 0) {
                var ld = new fly.loader.MultiLoadData(url, caller, onComplete, onUpdate, onError, dataFormat, priority);
                MultiUrlLoadManager.loadByData(ld);
            }
            static set enableInterrupt(value) {
                MultiUrlLoadManager._enableInterrupt = value;
            }
            static get enableInterrupt() {
                return MultiUrlLoadManager._enableInterrupt;
            }
            static get maxQueueSize() {
                return MultiUrlLoadManager._maxQueueSize;
            }
            static set maxQueueSize(value) {
                if (value == MultiUrlLoadManager._maxQueueSize) {
                    return;
                }
                if (value < 1) {
                    value = 1;
                }
                let i = 0;
                let size = 0;
                let loader = null;
                if (value > MultiUrlLoadManager._maxQueueSize) {
                    size = value - MultiUrlLoadManager._maxQueueSize;
                    for (i = 0; i < size; ++i) {
                        MultiUrlLoadManager.loadingQueue.push(new loader_1.MultiUrlLoader());
                    }
                    MultiUrlLoadManager.loadNext();
                }
                else {
                    size = MultiUrlLoadManager._maxQueueSize - value;
                    for (i = 0; i < size; ++i) {
                        loader = MultiUrlLoadManager.loadingQueue.pop();
                        if (!loader.isLocked && !loader.isLoading) {
                            continue;
                        }
                        MultiUrlLoadManager.interruptTask(loader.rslLoadData);
                    }
                }
                MultiUrlLoadManager._maxQueueSize = value;
                logW("MultiUrlLoadManager 改变加载队列长度:" + MultiUrlLoadManager._maxQueueSize);
            }
            static get detailLoadedCount() {
                return MultiUrlLoadManager._detailLoadedCount;
            }
            static get detailLoadedBytes() {
                return MultiUrlLoadManager._detailLoadedBytes;
            }
            static get loadedTotalCount() {
                return MultiUrlLoadManager._loadedTotalCount;
            }
            static get idleCount() {
                let count = 0;
                for (let i = 0; i < MultiUrlLoadManager._maxQueueSize; ++i) {
                    let loader = MultiUrlLoadManager.loadingQueue[i];
                    if (!loader.isLocked && !loader.isLoading) {
                        count += 1;
                    }
                }
                return count;
            }
            static get waitingCount() {
                return MultiUrlLoadManager.waitingQueue.length;
            }
            static get loadedTotalBytes() {
                return MultiUrlLoadManager._loadedTotalBytes;
            }
            static get networkSpeed() {
                return MultiUrlLoadManager._networkSpeed;
            }
            static get interruptCount() {
                return MultiUrlLoadManager._interruptCount;
            }
            static get failedCount() {
                return MultiUrlLoadManager._failedCount;
            }
            static get loadedSucceedCount() {
                return MultiUrlLoadManager._loadedSucceedCount;
            }
            static inside(url) {
                if (url in MultiUrlLoadManager.loadingDict || url in MultiUrlLoadManager.waitingDict) {
                    return true;
                }
                else {
                    return false;
                }
            }
            static interruptTask(mld) {
                MultiUrlLoadManager.cancelLoadingTask(mld.url);
                MultiUrlLoadManager.addToWaitingQueue(mld);
                MultiUrlLoadManager._interruptCount += 1;
                logW("MultiUrlLoadManager interrupt the loading task: " + mld);
            }
            static cancelTask(mld) {
                if (!mld || !mld.url) {
                    return;
                }
                if (!MultiUrlLoadManager.inside(mld.url)) {
                    return;
                }
                if (mld.url in MultiUrlLoadManager.loadingDict) {
                    MultiUrlLoadManager.interruptTask(mld);
                    MultiUrlLoadManager.removeWaitingTask(mld.url);
                    MultiUrlLoadManager.loadNext();
                }
                else if (mld.url in MultiUrlLoadManager.waitingDict) {
                    MultiUrlLoadManager.removeWaitingTask(mld.url);
                }
                else if (mld.url in MultiUrlLoadManager.multipleDict) {
                    MultiUrlLoadManager.removeMultipleTask(mld.url);
                }
            }
            static cancelLoadingTask(url) {
                if (!MultiUrlLoadManager.loadingDict[url]) {
                    return;
                }
                let loader = MultiUrlLoadManager.loadingDict[url];
                loader.close();
                MultiUrlLoadManager.offLoaderEvents(loader);
                delete MultiUrlLoadManager.loadingDict[url];
                delete MultiUrlLoadManager._detailLoadSpeed[url];
            }
            static removeWaitingTask(url) {
                let waitingDict = MultiUrlLoadManager.waitingDict;
                let waitingQueue = MultiUrlLoadManager.waitingQueue;
                if (!waitingDict[url]) {
                    return;
                }
                delete waitingDict[url];
                for (let i = 0; i < waitingQueue.length; ++i) {
                    let temp = waitingQueue[i];
                    if (url == temp.url) {
                        waitingQueue.splice(i, 1);
                        break;
                    }
                }
            }
            static removeMultipleTask(url) {
                if (!MultiUrlLoadManager.multipleDict[url]) {
                    return;
                }
                let queue = MultiUrlLoadManager.multipleDict[url];
                queue.length = 0;
                MultiUrlLoadManager.arrayPool.push(queue);
                delete MultiUrlLoadManager.multipleDict[url];
            }
            static removeAllTask(url) {
                MultiUrlLoadManager.cancelLoadingTask(url);
                MultiUrlLoadManager.removeWaitingTask(url);
                MultiUrlLoadManager.removeMultipleTask(url);
            }
            static addLoaderEvents(loader) {
                loader.on(FlyEvent.COMPLETE, MultiUrlLoadManager, MultiUrlLoadManager.onLoadComplete, [loader]);
                loader.on(FlyEvent.PROGRESS, MultiUrlLoadManager, MultiUrlLoadManager.onLoadProgress, [loader]);
                loader.on(FlyEvent.ERROR, MultiUrlLoadManager, MultiUrlLoadManager.onLoadError, [loader]);
            }
            static offLoaderEvents(loader) {
                loader.off(FlyEvent.COMPLETE, MultiUrlLoadManager, MultiUrlLoadManager.onLoadComplete);
                loader.off(FlyEvent.PROGRESS, MultiUrlLoadManager, MultiUrlLoadManager.onLoadProgress);
                loader.off(FlyEvent.ERROR, MultiUrlLoadManager, MultiUrlLoadManager.onLoadError);
            }
            static onLoadError(loader, messageArg) {
                let loadTask = loader.rslLoadData;
                var message = "加载错误:" + loader.rslLoadData.reqUrl + " error:" + messageArg;
                logW(message);
                loader.isLocked = true;
                if (loadTask.onError != null) {
                    loadTask.onError.call(loadTask.caller, message);
                }
                MultiUrlLoadManager._failedCount += 1;
                let queue = MultiUrlLoadManager.multipleDict[loadTask.url];
                if (queue && queue.length > 0) {
                    for (let i = 0; i < queue.length; ++i) {
                        if (queue[i].onError) {
                            queue[i].onError.call(queue[i].caller, message);
                        }
                    }
                    MultiUrlLoadManager._failedCount += queue.length;
                }
                MultiUrlLoadManager.removeAllTask(loadTask.url);
                loader.isLocked = false;
                MultiUrlLoadManager.loadNext();
            }
            static profilerNet(loader) {
                let task = loader.rslLoadData;
                if (!task) {
                    return;
                }
                let memb = loader.bytesTotal / 1048576.0;
                MultiUrlLoadManager._loadedCoastTime += ((getTimer() - MultiUrlLoadManager._detailLoadSpeed[task.url]) / 1000);
                MultiUrlLoadManager._loadedTotalBytes += memb;
                MultiUrlLoadManager._detailLoadedBytes.put(task.type, MultiUrlLoadManager._detailLoadedBytes[task.type] + memb);
                MultiUrlLoadManager._networkSpeed = MultiUrlLoadManager._loadedTotalBytes / (MultiUrlLoadManager._loadedCoastTime == 0 ? 1 : MultiUrlLoadManager._loadedCoastTime);
                delete MultiUrlLoadManager._detailLoadSpeed[task.url];
            }
            static onLoadProgress(loader, percent) {
                let loadTask = loader.rslLoadData;
                if (loader.bytesLoaded == loader.bytesTotal) {
                    MultiUrlLoadManager.profilerNet(loader);
                }
                loader.isLocked = true;
                if (loadTask.onUpdate != null) {
                    loadTask.onUpdate.call(loadTask.caller, percent, loadTask);
                }
                let queue = MultiUrlLoadManager.multipleDict[loadTask.url];
                if (queue && queue.length > 0) {
                    for (let i = 0; i < queue.length; ++i) {
                        if (queue[i].onUpdate) {
                            queue[i].onUpdate.call(queue[i].caller, percent, loadTask);
                        }
                    }
                }
                loader.isLocked = false;
            }
            static getName(url) {
                url = url.split("?")[0];
                url = url.split("/").pop();
                return url;
            }
            static onLoadComplete(loader, data) {
                let loadTask = loader.rslLoadData;
                if (loadTask.onComplete != null) {
                    loadTask.onComplete.call(loadTask.caller, data, loader.rslLoadData);
                }
                let queue = MultiUrlLoadManager.multipleDict[loadTask.url];
                if (queue && queue.length > 0) {
                    for (let i = 0; i < queue.length; ++i) {
                        if (queue[i].onComplete) {
                            queue[i].onComplete.call(queue[i].caller, data, loader.rslLoadData);
                        }
                    }
                }
                MultiUrlLoadManager.removeAllTask(loadTask.url);
                MultiUrlLoadManager._loadedSucceedCount += 1;
                MultiUrlLoadManager.loadNext();
            }
            static addToWaitingQueue(task) {
                if (!task) {
                    return;
                }
                if (MultiUrlLoadManager.waitingDict[task.url]) {
                    MultiUrlLoadManager.addToMultipleQueue(task);
                }
                else {
                    MultiUrlLoadManager.waitingDict[task.url] = task;
                    MultiUrlLoadManager.waitingQueue.push(task);
                    MultiUrlLoadManager.sortPriorityAsc(MultiUrlLoadManager.waitingQueue, 0, MultiUrlLoadManager.waitingQueue.length - 1);
                }
            }
            static sortPriorityAsc(data, left, right) {
                let i = 0;
                let j = 0;
                let e = 0;
                let priority = 0;
                let pivot = null;
                let temp = null;
                if (right - left < 20) {
                    i = left + 1;
                    right++;
                    while (i < right) {
                        pivot = data[i];
                        j = i - 1;
                        e = i;
                        priority = pivot.priority;
                        while ((j >= left) && (data[j].priority < priority)) {
                            data[e--] = data[j--];
                        }
                        data[e] = pivot;
                        i++;
                    }
                }
                else {
                    i = left;
                    j = right;
                    pivot = data[(left + right) >>> 1];
                    priority = pivot.priority;
                    while (i <= j) {
                        while (data[j].priority < priority) {
                            j--;
                        }
                        while (data[i].priority > priority) {
                            i++;
                        }
                        if (i <= j) {
                            temp = data[i];
                            data[i] = data[j];
                            i++;
                            data[j] = temp;
                            j--;
                        }
                    }
                    if (left < j) {
                        MultiUrlLoadManager.sortPriorityAsc(data, left, j);
                    }
                    if (i < right) {
                        MultiUrlLoadManager.sortPriorityAsc(data, i, right);
                    }
                }
            }
            static loadNext() {
                if (MultiUrlLoadManager.waitingQueue.length == 0) {
                    return;
                }
                var maxQueueSize = MultiUrlLoadManager._maxQueueSize;
                var loadingQueue = MultiUrlLoadManager.loadingQueue;
                var waitingQueue = MultiUrlLoadManager.waitingQueue;
                var loader = null;
                for (let i = 0; i < loadingQueue.length; ++i) {
                    if (!loadingQueue[i].isLoading && !loadingQueue[i].isLocked) {
                        loader = loadingQueue[i];
                        break;
                    }
                }
                if (!loader && MultiUrlLoadManager._enableInterrupt) {
                    if (MultiUrlLoadManager._loadingSortDirty) {
                        MultiUrlLoadManager.sortPriorityAsc(loadingQueue, 0, loadingQueue.length - 1);
                        MultiUrlLoadManager._loadingSortDirty = false;
                    }
                    if (loadingQueue[maxQueueSize - 1].isLocked || (loadingQueue[maxQueueSize - 1].rslLoadData && (loadingQueue[maxQueueSize - 1].rslLoadData.priority + fly.loader.LoadPriorityType.INTERRUPT_PRIORITY > waitingQueue[0].priority))) {
                        return;
                    }
                    loader = loadingQueue[maxQueueSize - 1];
                    MultiUrlLoadManager.interruptTask(loader.rslLoadData);
                }
                MultiUrlLoadManager.processLoad(loader, MultiUrlLoadManager.shiftWaitingTask());
            }
            static shiftWaitingTask() {
                var task = MultiUrlLoadManager.waitingQueue.shift();
                MultiUrlLoadManager.waitingDict[task.url] = null;
                delete MultiUrlLoadManager.waitingDict[task.url];
                return task;
            }
            static processLoad(loader, task) {
                MultiUrlLoadManager.addLoaderEvents(loader);
                MultiUrlLoadManager.loadingDict[task.url] = loader;
                MultiUrlLoadManager._loadingSortDirty = true;
                MultiUrlLoadManager._loadedTotalCount += 1;
                if (!MultiUrlLoadManager._detailLoadedBytes[task.type]) {
                    MultiUrlLoadManager._detailLoadedBytes[task.type] = 0.0;
                    MultiUrlLoadManager._detailLoadedCount[task.type] = 0;
                }
                MultiUrlLoadManager._detailLoadSpeed[task.url] = getTimer();
                loader.load(task);
            }
            static addToMultipleQueue(task) {
                if (!MultiUrlLoadManager.multipleDict[task.url]) {
                    if (MultiUrlLoadManager.arrayPool.length > 0) {
                        MultiUrlLoadManager.multipleDict[task.url] = MultiUrlLoadManager.arrayPool.pop();
                        MultiUrlLoadManager.multipleDict[task.url].length = 0;
                    }
                    else {
                        MultiUrlLoadManager.multipleDict[task.url] = new Array();
                    }
                }
                var arr = MultiUrlLoadManager.multipleDict[task.url];
                arr.push(task);
            }
        }
        MultiUrlLoadManager.arrayPool = [];
        MultiUrlLoadManager._loadingSortDirty = true;
        MultiUrlLoadManager._maxQueueSize = 5;
        MultiUrlLoadManager._enableInterrupt = true;
        MultiUrlLoadManager._loadedTotalCount = 0;
        MultiUrlLoadManager._loadedSucceedCount = 0;
        MultiUrlLoadManager._failedCount = 0;
        MultiUrlLoadManager._interruptCount = 0;
        MultiUrlLoadManager._networkSpeed = 0;
        MultiUrlLoadManager._loadedTotalBytes = 0;
        MultiUrlLoadManager._loadedCoastTime = 1;
        loader_1.MultiUrlLoadManager = MultiUrlLoadManager;
    })(loader = fly.loader || (fly.loader = {}));
})(fly || (fly = {}));
//# sourceMappingURL=MultiUrlLoadManager.js.map
var fly;
(function (fly) {
    var loader;
    (function (loader) {
        class MultiLoadData {
            constructor(url, caller = null, onComplete = null, onUpdate = null, onError = null, dataFormat = null, priority = 0) {
                this.requestMethod = "get";
                this._tryCount = 3;
                this.uuid = "1";
                this._url = url;
                this._requestURL = loader.MultiUrlLoadManager.getUrlWithVersion != null ? loader.MultiUrlLoadManager.getUrlWithVersion(url) : url;
                this._caller = caller;
                this._onComplete = onComplete;
                this._onUpdate = onUpdate;
                this._onError = onError;
                this._dataFormat = dataFormat;
                this._type = fly.utils.URLUtils.type(url);
                if (dataFormat == null) {
                    this._dataFormat = LoaderType.typeMapping[this._type];
                }
                this.priority = priority;
                this.uuid = (++MultiLoadData.COUNT) + "";
            }
            get caller() {
                return this._caller;
            }
            get type() {
                return this._type;
            }
            get url() {
                return this._url;
            }
            get reqUrl() {
                return this._requestURL;
            }
            get onComplete() {
                return this._onComplete;
            }
            get onUpdate() {
                return this._onUpdate;
            }
            get onError() {
                return this._onError;
            }
            get dataFormat() {
                return this._dataFormat;
            }
            get tryCount() {
                return this._tryCount;
            }
        }
        MultiLoadData.COUNT = 0;
        loader.MultiLoadData = MultiLoadData;
    })(loader = fly.loader || (fly.loader = {}));
})(fly || (fly = {}));
//# sourceMappingURL=MultiLoadData.js.map
var fly;
(function (fly) {
    var loader;
    (function (loader) {
        class LoadPriorityType {
            constructor() {
            }
        }
        LoadPriorityType.LEVEL_DEFAULT = 0;
        LoadPriorityType.INTERRUPT_PRIORITY = 3000;
        LoadPriorityType.LEVEL_2D_UI_DEFAULT = 1;
        loader.LoadPriorityType = LoadPriorityType;
    })(loader = fly.loader || (fly.loader = {}));
})(fly || (fly = {}));
//# sourceMappingURL=LoadPriorityType.js.map
class LoaderType {
    constructor() {
    }
}
LoaderType.TEXT = "text";
LoaderType.BINARY = "arraybuffer";
LoaderType.ATLAS = "atlas";
LoaderType.IMAGE = "image";
LoaderType.json = "json";
LoaderType.fly = "fly";
LoaderType.data = "data";
LoaderType.typeMapping = {
    "png": LoaderType.IMAGE,
    "jpg": LoaderType.IMAGE,
    "data": LoaderType.BINARY,
    "byte": LoaderType.BINARY,
    "json": LoaderType.json,
    "atlas": LoaderType.ATLAS,
    "fly": LoaderType.fly
};
//# sourceMappingURL=LoaderType.js.map
//# sourceMappingURL=IPoolClass.js.map
//# sourceMappingURL=IDynamicPosition.js.map
//# sourceMappingURL=IDisplayObject.js.map
var fly;
(function (fly) {
    class Handler {
        constructor(caller, method, args, once) {
            this.once = false;
            this._id = 0;
            (once === void 0) && (once = false);
            this.setTo(caller, method, args, once);
        }
        setTo(caller, method, args, once) {
            this._id = Handler._gid++;
            this.caller = caller;
            this.method = method;
            this.args = args;
            this.once = once;
            return this;
        }
        run() {
            if (this.method == null) {
                return null;
            }
            var id = this._id;
            var result = this.method.apply(this.caller, this.args);
            this._id === id && this.once && this.recover();
            return result;
        }
        runWith(data) {
            if (this.method == null) {
                return null;
            }
            var id = this._id;
            if (data == null) {
                var result = this.method.apply(this.caller, this.args);
            }
            else if (!this.args && !data.unshift) {
                result = this.method.call(this.caller, data);
            }
            else if (this.args) {
                result = this.method.apply(this.caller, this.args.concat(data));
            }
            else {
                result = this.method.apply(this.caller, data);
            }
            this._id === id && this.once && this.recover();
            return result;
        }
        clear() {
            this.caller = null;
            this.method = null;
            this.args = null;
            return this;
        }
        recover() {
            if (this._id > 0) {
                this._id = 0;
                Handler._pool.push(this.clear());
            }
        }
        static create(caller, method, args, once) {
            (once === void 0) && (once = true);
            if (Handler._pool.length) {
                return Handler._pool.pop().setTo(caller, method, args, once);
            }
            return new Handler(caller, method, args, once);
        }
    }
    Handler._pool = [];
    Handler._gid = 1;
    fly.Handler = Handler;
})(fly || (fly = {}));
//# sourceMappingURL=Handler.js.map
var FlyEvent;
(function (FlyEvent) {
    FlyEvent.MOUSE_DOWN = "mousedown";
    FlyEvent.MOUSE_DOWN = "mousedown";
    FlyEvent.MOUSE_UP = "mouseup";
    FlyEvent.CLICK = "click";
    FlyEvent.RIGHT_MOUSE_DOWN = "rightmousedown";
    FlyEvent.RIGHT_MOUSE_UP = "rightmouseup";
    FlyEvent.RIGHT_CLICK = "rightclick";
    FlyEvent.MOUSE_MOVE = "mousemove";
    FlyEvent.MOUSE_OVER = "mouseover";
    FlyEvent.MOUSE_OUT = "mouseout";
    FlyEvent.MOUSE_WHEEL = "mousewheel";
    FlyEvent.ROLL_OVER = "mouseover";
    FlyEvent.ROLL_OUT = "mouseout";
    FlyEvent.DOUBLE_CLICK = "doubleclick";
    FlyEvent.CHANGE = "change";
    FlyEvent.CHANGED = "changed";
    FlyEvent.RESIZE = "resize";
    FlyEvent.ADDED = "added";
    FlyEvent.REMOVED = "removed";
    FlyEvent.DISPLAY = "display";
    FlyEvent.UNDISPLAY = "undisplay";
    FlyEvent.ERROR = "error";
    FlyEvent.COMPLETE = "complete";
    FlyEvent.LOADED = "loaded";
    FlyEvent.PROGRESS = "progress";
    FlyEvent.INPUT = "input";
    FlyEvent.RENDER = "render";
    FlyEvent.OPEN = "open";
    FlyEvent.MESSAGE = "message";
    FlyEvent.CLOSE = "close";
    FlyEvent.KEY_DOWN = "keydown";
    FlyEvent.KEY_PRESS = "keypress";
    FlyEvent.KEY_UP = "keyup";
    FlyEvent.FRAME = "enterframe";
    FlyEvent.DRAG_START = "dragstart";
    FlyEvent.DRAG_MOVE = "dragmove";
    FlyEvent.DRAG_END = "dragend";
    FlyEvent.ENTER = "enter";
    FlyEvent.SELECT = "select";
    FlyEvent.BLUR = "blur";
    FlyEvent.FOCUS = "focus";
    FlyEvent.VISIBILITY_CHANGE = "visibilitychange";
    FlyEvent.FOCUS_CHANGE = "focuschange";
    FlyEvent.PLAYED = "played";
    FlyEvent.PAUSED = "paused";
    FlyEvent.STOPPED = "stopped";
    FlyEvent.START = "start";
    FlyEvent.END = "end";
    FlyEvent.ENABLE_CHANGED = "enablechanged";
    FlyEvent.ACTIVE_IN_HIERARCHY_CHANGED = "activeinhierarchychanged";
    FlyEvent.COMPONENT_ADDED = "componentadded";
    FlyEvent.COMPONENT_REMOVED = "componentremoved";
    FlyEvent.LAYER_CHANGED = "layerchanged";
    FlyEvent.HIERARCHY_LOADED = "hierarchyloaded";
    FlyEvent.RECOVERED = "recovered";
    FlyEvent.RELEASED = "released";
    FlyEvent.LINK = "link";
    FlyEvent.LABEL = "label";
    FlyEvent.FULL_SCREEN_CHANGE = "fullscreenchange";
    FlyEvent.DEVICE_LOST = "devicelost";
    FlyEvent.MESH_CHANGED = "meshchanged";
    FlyEvent.MATERIAL_CHANGED = "materialchanged";
    FlyEvent.WORLDMATRIX_NEEDCHANGE = "worldmatrixneedchanged";
    FlyEvent.ANIMATION_CHANGED = "animationchanged";
    FlyEvent.TRIGGER_ENTER = "triggerenter";
    FlyEvent.TRIGGER_STAY = "triggerstay";
    FlyEvent.TRIGGER_EXIT = "triggerexit";
    FlyEvent.TRAIL_FILTER_CHANGE = "trailfilterchange";
    FlyEvent.DOMINO_FILTER_CHANGE = "dominofilterchange";
})(FlyEvent || (FlyEvent = {}));
//# sourceMappingURL=FlyEvent.js.map
var fly;
(function (fly) {
    class EventManager {
        constructor() {
        }
        static get listenersDict() {
            if (this._listenersDict == null) {
                this._listenersDict = new ds.StringMap();
            }
            return this._listenersDict;
        }
        static on(type, caller, func, ...args) {
            this.addEvent(type, caller, func, args);
        }
        static addEvent(type, caller, func, ...args) {
            if (!func) {
                throw new Error("listener is null");
            }
            if (EventManager.hasEvent(type, caller, func)) {
                logW("重复注册事件:Type:" + type + ";Listener:" + func.toString());
                return;
            }
            let listeners = EventManager.listenersDict[type];
            if (!listeners) {
                if (EventManager.arrayPool.length > 0) {
                    listeners = EventManager.arrayPool.pop();
                    listeners.length = 0;
                }
                else {
                    listeners = new Array();
                }
                EventManager.listenersDict[type] = listeners;
            }
            let wrapper = null;
            if (EventManager.wrapperPool.length > 0) {
                wrapper = EventManager.wrapperPool.pop();
                wrapper.caller = caller;
                wrapper.method = func;
                wrapper.params = args;
            }
            else {
                wrapper
                    = {
                        caller: caller,
                        method: func,
                        params: args
                    };
            }
            listeners.push(wrapper);
        }
        static dispatchEvent(type, ...args) {
            let listeners = EventManager.listenersDict[type];
            if (!listeners) {
                return;
            }
            for (let i = 0; i < listeners.length; ++i) {
                let wrapper = listeners[i];
                if (args || wrapper.params) {
                    let params = [];
                    if (args) {
                        for (let j = 0; j < args.length; ++j) {
                            params.push(args[j]);
                        }
                    }
                    if (wrapper.params) {
                        for (let j = 0; j < wrapper.params.length; ++j) {
                            params.push(wrapper.params[j]);
                        }
                    }
                    wrapper.method.apply(wrapper.caller, params);
                }
                else {
                    wrapper.method();
                }
            }
        }
        static removeEvent(type, caller, listener) {
            let listeners = EventManager.listenersDict[type];
            if (!listeners) {
                return;
            }
            let len = listeners.length;
            for (let i = len - 1; i >= 0; i--) {
                let wrapper = listeners[i];
                if (wrapper.caller == caller && wrapper.method === listener) {
                    listeners.splice(i, 1);
                    wrapper.method = null;
                    wrapper.params = null;
                    EventManager.wrapperPool.push(wrapper);
                }
            }
            if (listeners.length == 0) {
                EventManager.arrayPool.push(listeners);
                delete EventManager.listenersDict[type];
            }
        }
        static hasTypeEvent(type) {
            let listeners = EventManager.listenersDict[type];
            if (!listeners) {
                return false;
            }
            return listeners.length != 0;
        }
        static hasEvent(type, caller, listener) {
            let listeners = EventManager.listenersDict[type];
            if (!listeners) {
                return false;
            }
            for (let i = 0; i < listeners.length; ++i) {
                var eventWrapper = listeners[i];
                if (eventWrapper.caller == caller && eventWrapper.method == listener) {
                    return true;
                }
            }
            return false;
        }
        static getEventsNum() {
            let ret = 0;
            for (let type in EventManager.listenersDict) {
                let listeners = EventManager.listenersDict[type];
                for (let i = 0; i < listeners.length; ++i) {
                    ret += 1;
                }
            }
            return ret;
        }
        static removeAllEvents() {
            for (let key in EventManager.listenersDict) {
                let listeners = EventManager.listenersDict[key];
                delete EventManager.listenersDict[key];
                if (!listeners) {
                    continue;
                }
                listeners.length = 0;
                EventManager.arrayPool.push(listeners);
            }
        }
        static getTypeEventList(type) {
            let result = [];
            let listeners = EventManager.listenersDict[type];
            if (listeners) {
                for (let i = 0; i < listeners.length; ++i) {
                    result.push(listeners[i].method);
                }
            }
            return result;
        }
        static getAllEventList() {
            let result = [];
            for (let type in EventManager.listenersDict) {
                let listeners = EventManager.listenersDict[type];
                if (!listeners) {
                    continue;
                }
                for (let i = 0; i < listeners.length; ++i) {
                    result.push(listeners[i].method);
                }
            }
            return result;
        }
        static getTypeEventsNum(type) {
            let listeners = EventManager.listenersDict[type];
            if (!listeners) {
                return 0;
            }
            return listeners.length;
        }
    }
    EventManager.arrayPool = [];
    EventManager.wrapperPool = [];
    fly.EventManager = EventManager;
    class EventWrapper {
        constructor(caller, method, params) {
            this.caller = caller;
            this.method = method;
            this.params = params;
        }
    }
})(fly || (fly = {}));
//# sourceMappingURL=EventManager.js.map
var fly;
(function (fly) {
    var enums;
    (function (enums) {
        class LogLevel {
            constructor() {
            }
        }
        LogLevel.INF = 1;
        LogLevel.WAR = 2;
        LogLevel.DEBUG = 3;
        LogLevel.ERR = 4;
        enums.LogLevel = LogLevel;
    })(enums = fly.enums || (fly.enums = {}));
})(fly || (fly = {}));
//# sourceMappingURL=LogLevel.js.map
class Engine {
    constructor() {
    }
    setup() {
        Tick.setup();
    }
}
//# sourceMappingURL=Engine.js.map
var fly;
(function (fly) {
    class SceneConfig {
        constructor($width, $height) {
            this.width = 1000;
            this.height = 580;
            this.width = $width;
            this.height = $height;
        }
        static setSceneConfig($tileWidth, $tileHeight, $zoneWidth, $zoneHeight) {
            SceneConfig.TILE_WIDTH = $tileWidth;
            SceneConfig.TILE_HEIGHT = $tileHeight;
            SceneConfig.ZONE_WIDTH = $zoneWidth;
            SceneConfig.ZONE_HEIGHT = $zoneHeight;
            SceneConfig.ZONE_SCALE_WIDTH = SceneConfig.ZONE_WIDTH / SceneConfig.TILE_WIDTH;
            SceneConfig.ZONE_SCALE_HEIGHT = SceneConfig.ZONE_HEIGHT / SceneConfig.TILE_HEIGHT;
        }
        setViewSize($viewWidth, $viewHeight) {
            this.width = $viewWidth;
            this.height = $viewHeight;
        }
    }
    SceneConfig.TILE_WIDTH = 25;
    SceneConfig.TILE_HEIGHT = 25;
    SceneConfig.ZONE_WIDTH = 256;
    SceneConfig.ZONE_HEIGHT = 256;
    SceneConfig.ZONE_SCALE_WIDTH = SceneConfig.ZONE_WIDTH / SceneConfig.TILE_WIDTH;
    SceneConfig.ZONE_SCALE_HEIGHT = SceneConfig.ZONE_HEIGHT / SceneConfig.TILE_HEIGHT;
    fly.SceneConfig = SceneConfig;
})(fly || (fly = {}));
//# sourceMappingURL=SceneConfig.js.map
var fly;
(function (fly) {
    class GlobalConfig2D {
        constructor() { }
        static get shadowWidth() {
            return GlobalConfig2D._shadowPos.x;
        }
        static get shadowHeight() {
            return GlobalConfig2D._shadowPos.y;
        }
        static get shadowTexture() {
            if (GlobalConfig2D._shadowTexture == null) {
                GlobalConfig2D._shadowTexture = new fly.renders.TextureProxy();
            }
            return GlobalConfig2D._shadowTexture;
        }
        static setShadowBmpData(value) {
            GlobalConfig2D._shadowPos = new fly.Point();
            GlobalConfig2D._shadowPos.setTo(value.width, value.height);
            if (GlobalConfig2D._shadowTexture) {
                GlobalConfig2D._shadowTexture.dispose();
            }
            GlobalConfig2D._shadowTexture = value;
        }
        static get tanShadow() {
            return GlobalConfig2D._tanShadow;
        }
        static get shadowAngle() {
            return GlobalConfig2D._shadowAngle;
        }
        static set shadowAngle(value) {
            GlobalConfig2D._shadowAngle = value;
            GlobalConfig2D._tanShadow = Math.tan((GlobalConfig2D._shadowAngle * Math.PI) / 180);
        }
        static get nowTime() {
            return Tick.time;
        }
        static setGlobalConfig($frameRate, $decode, $version = null) {
            GlobalConfig2D.FRAME_RATE = $frameRate;
            GlobalConfig2D.SETP_TIME = 1000 / $frameRate;
            GlobalConfig2D.decode = $decode;
            GlobalConfig2D.version = $version;
        }
    }
    GlobalConfig2D._nowTime = 0;
    GlobalConfig2D.IS_TWO_ANGLE = false;
    GlobalConfig2D.FRAME_RATE = 60;
    GlobalConfig2D.SETP_TIME = 1000 / GlobalConfig2D.FRAME_RATE;
    GlobalConfig2D.shadowYScale = 0.7;
    GlobalConfig2D._shadowAngle = -30;
    GlobalConfig2D._tanShadow = 0;
    GlobalConfig2D.shadowOffsetX = 0;
    GlobalConfig2D.shadowOffsetY = 0;
    GlobalConfig2D.shadowAlpha = 0.5;
    GlobalConfig2D.shadowRenderType = 2;
    GlobalConfig2D.SHADOW_SHAPE = 2;
    GlobalConfig2D.isShowDrawRect = false;
    GlobalConfig2D.enableBlendMode = true;
    GlobalConfig2D.useWorker = false;
    GlobalConfig2D.avatarAtfResAsync = true;
    GlobalConfig2D.avatarBpgResScale = false;
    GlobalConfig2D.avatarBpgResScaleMemory = 64000000;
    GlobalConfig2D.avatarBpgResScaleValue = 2.0;
    GlobalConfig2D.cameraTween = -1;
    GlobalConfig2D.avatarHighlightEnabled = false;
    GlobalConfig2D.heightFramRender = false;
    fly.GlobalConfig2D = GlobalConfig2D;
})(fly || (fly = {}));
//# sourceMappingURL=GlobalConfig2D.js.map
//# sourceMappingURL=IEventDispatcher.js.map
var fly;
(function (fly) {
    class EventDispatcher {
        constructor() {
            this._events = {};
        }
        addEventListener(type, caller, listener, args) {
            return this.on(type, caller, listener, args);
        }
        dispatchEvent(type, data) {
            return this.event(type, data);
        }
        hasListener(type) {
            var listener = this._events && this._events[type];
            return !!listener;
        }
        event(type, data) {
            if (!this._events || !this._events[type]) {
                return false;
            }
            var listeners = this._events[type];
            if (listeners.run) {
                if (listeners.once) {
                    delete this._events[type];
                }
                data != null ? listeners.runWith(data) : listeners.run();
            }
            else {
                for (var i = 0, n = listeners.length; i < n; i++) {
                    var listener = listeners[i];
                    if (listener) {
                        (data != null) ? listener.runWith(data) : listener.run();
                    }
                    if (!listener || listener.once) {
                        listeners.splice(i, 1);
                        i--;
                        n--;
                    }
                }
                if (listeners.length === 0 && this._events) {
                    delete this._events[type];
                }
            }
            return true;
        }
        on(type, caller, listener, args) {
            return this._createListener(type, caller, listener, args, false);
        }
        once(type, caller, listener, args) {
            return this._createListener(type, caller, listener, args, true);
        }
        _createListener(type, caller, listener, args = null, once, offBefore = null) {
            (offBefore === void 0) && (offBefore = true);
            offBefore && this.off(type, caller, listener, once);
            var handler = fly.Handler.create(caller || this, listener, args, once);
            this._events || (this._events = {});
            var events = this._events;
            if (!events[type]) {
                events[type] = handler;
            }
            else {
                if (!events[type].run) {
                    events[type].push(handler);
                }
                else {
                    events[type] = [events[type], handler];
                }
            }
            return this;
        }
        off(type, caller, listener, onceOnly) {
            (onceOnly === void 0) && (onceOnly = false);
            if (!this._events || !this._events[type]) {
                return this;
            }
            var listeners = this._events[type];
            if (listener != null) {
                if (listeners.run) {
                    if ((!caller || listeners.caller === caller) && listeners.method === listener && (!onceOnly || listeners.once)) {
                        delete this._events[type];
                        listeners.recover();
                    }
                }
                else {
                    var count = 0;
                    for (var i = 0, n = listeners.length; i < n; i++) {
                        var item = listeners[i];
                        if (!item) {
                            count++;
                            continue;
                        }
                        if (item && (!caller || item.caller === caller) && item.method === listener && (!onceOnly || item.once)) {
                            count++;
                            listeners[i] = null;
                            item.recover();
                        }
                    }
                    if (count === n) {
                        delete this._events[type];
                    }
                }
            }
            return this;
        }
        offAll(type) {
            var events = this._events;
            if (!events) {
                return this;
            }
            if (type) {
                this._recoverHandlers(events[type]);
                delete events[type];
            }
            else {
                for (var name in events) {
                    this._recoverHandlers(events[name]);
                }
                this._events = null;
            }
            return this;
        }
        _recoverHandlers(arr) {
            if (!arr) {
                return;
            }
            if (arr.run) {
                arr.recover();
            }
            else {
                for (var i = arr.length - 1; i > -1; i--) {
                    if (arr[i]) {
                        arr[i].recover();
                        arr[i] = null;
                    }
                }
            }
        }
        isMouseEvent(type) {
            return EventDispatcher.MOUSE_EVENTS[type];
        }
    }
    EventDispatcher.MOUSE_EVENTS = { "rightmousedown": true, "rightmouseup": true, "rightclick": true, "mousedown": true, "mouseup": true, "mousemove": true, "mouseover": true, "mouseout": true, "click": true, "doubleclick": true };
    fly.EventDispatcher = EventDispatcher;
})(fly || (fly = {}));
//# sourceMappingURL=EventDispatcher.js.map
//# sourceMappingURL=IDisplayObjectContiner.js.map
var fly;
(function (fly) {
    var loader;
    (function (loader) {
        class LayaAtlasLoader extends fly.EventDispatcher {
            constructor() {
                super(...arguments);
                this._pics = [];
                this._directory = "";
            }
            close() {
            }
            load(atlasurl, atlasData) {
                this._atlasUrl = atlasurl;
                this._atlasJson = JSON.parse(atlasData);
                var data = this._atlasJson;
                if (data.meta && data.meta.image) {
                    var cleanUrl = atlasurl.split("?")[0];
                    this._directory = (data.meta && data.meta.prefix) ? data.meta.prefix : cleanUrl.substring(0, cleanUrl.lastIndexOf(".")) + "/";
                    var toloadPics = data.meta.image.split(",");
                    var split = atlasurl.indexOf("/") >= 0 ? "/" : "\\";
                    var idx = atlasurl.lastIndexOf(split);
                    var folderPath = idx >= 0 ? atlasurl.substr(0, idx + 1) : "";
                    for (var i = 0, len = toloadPics.length; i < len; i++) {
                        toloadPics[i] = folderPath + toloadPics[i];
                    }
                    toloadPics.reverse();
                    this._toLoads = toloadPics;
                    data.pics = [];
                    this.doLoadImg();
                }
                else {
                }
            }
            onAtlasError(messAge) {
                this.event(FlyEvent.ERROR);
            }
            doLoadImg() {
                if (this._toLoads.length > 0) {
                    var url = this._toLoads.shift();
                    loader.MultiUrlLoadManager.load(url, this, this.onImgLoadComplete, null, this.onImgLoadError, LoaderType.IMAGE);
                }
                else {
                    var atlasURL = Laya.URL.formatURL(this._atlasUrl);
                    var layaLoad = Laya.Loader;
                    var map = layaLoad.atlasMap[atlasURL] || (layaLoad.atlasMap[atlasURL] = []);
                    map.dir = this._directory;
                    var name;
                    for (name in this._atlasJson["frames"]) {
                        var obj = this._atlasJson["frames"][name];
                        var tPic = this._pics[obj.frame.idx ? obj.frame.idx : 0];
                        url = Laya.URL.formatURL(this._directory + name);
                        this.cacheRes(url, Laya.Texture.create(tPic, obj.frame.x, obj.frame.y, obj.frame.w, obj.frame.h, obj.spriteSourceSize.x, obj.spriteSourceSize.y, obj.sourceSize.w, obj.sourceSize.h));
                        Laya.Loader.loadedMap[url].url = url;
                        map.push(url);
                    }
                    this.event(FlyEvent.COMPLETE);
                }
            }
            cacheRes(url, data) {
                url = Laya.URL.formatURL(url);
                if (Laya.Loader.loadedMap[url] != null) {
                    logW("Resources already exist,is repeated loading:", url);
                }
                else {
                    Laya.Loader.loadedMap[url] = data;
                }
            }
            onImgLoadComplete(te, mu) {
                this._pics.push(te);
                this.doLoadImg();
            }
            onImgLoadError() {
                this.event(FlyEvent.ERROR);
            }
        }
        loader.LayaAtlasLoader = LayaAtlasLoader;
    })(loader = fly.loader || (fly.loader = {}));
})(fly || (fly = {}));
//# sourceMappingURL=LayaAtlasLoader.js.map
var fly;
(function (fly) {
    var loader;
    (function (loader) {
        class MultiUrlLoader extends fly.EventDispatcher {
            constructor() {
                super();
                this.onUrlTimeoutHandler = () => {
                    this.onUrlError("request timeout.");
                };
                this.isLoading = false;
                this.isLocked = false;
                this._timeoutID = 0;
                this._tryIndex = 0;
                this._data = null;
                this._urlLoader = new loader.URLLoader();
            }
            get data() {
                if (!this._data) {
                    logW("MultiUrlLoader get null data. url:" + (this.rslLoadData ? this.rslLoadData.url : null));
                }
                return this._data;
            }
            close() {
                clearTimeout(this._timeoutID);
                this._timeoutID = 0;
                this._tryIndex = 0;
                this._data = null;
                this.rslLoadData = null;
                this.isLoading = false;
                this.isLocked = false;
                this._urlLoader.close();
                this.removeUrlLoadEvent();
            }
            get priority() {
                return this.rslLoadData ? this.rslLoadData.priority : fly.loader.LoadPriorityType.LEVEL_DEFAULT;
            }
            load(rslLoadData) {
                if (this.isLoading) {
                    return;
                }
                if (!rslLoadData) {
                    this._tryIndex++;
                    this._urlLoader.close();
                    if (!this.rslLoadData) {
                        this.isLoading = false;
                        return;
                    }
                }
                else {
                    this.close();
                    this.rslLoadData = rslLoadData;
                    this.initUrlLoadEvent();
                }
                clearTimeout(this._timeoutID);
                this.isLoading = true;
                if (MultiUrlLoader.ENABLE_TIMEOUT_RELOAD) {
                    this._timeoutID = setTimeout(this.onUrlTimeoutHandler, MultiUrlLoader.TIME_OUT_RETRY_TIME);
                }
                this._urlLoader.method = this.rslLoadData.requestMethod;
                this._urlLoader.load(this.rslLoadData.reqUrl, loader.URLLoaderDataFormat.BINARY);
            }
            initUrlLoadEvent() {
                this._urlLoader.on(FlyEvent.COMPLETE, this, this.onUrlComplete);
                this._urlLoader.on(FlyEvent.PROGRESS, this, this.onUrlProgress);
                this._urlLoader.on(FlyEvent.ERROR, this, this.onUrlError);
            }
            removeUrlLoadEvent() {
                this._urlLoader.off(FlyEvent.COMPLETE, this, this.onUrlComplete);
                this._urlLoader.off(FlyEvent.PROGRESS, this, this.onUrlProgress);
                this._urlLoader.off(FlyEvent.ERROR, this, this.onUrlError);
            }
            onUrlError(param) {
                clearTimeout(this._timeoutID);
                this._timeoutID = 0;
                this.isLoading = false;
                if (!this.rslLoadData) {
                    return;
                }
                fly.LoadBlackListUtils.ins.addLoadUrl(this.rslLoadData.url);
                if (this._tryIndex < this.rslLoadData.tryCount) {
                    this.load(null);
                    return;
                }
                let msg = "重试" + this.rslLoadData.tryCount + "次之后失败。";
                this.event(FlyEvent.ERROR, msg);
            }
            get bytesLoaded() {
                return this._urlLoader.bytesLoaded;
            }
            get bytesTotal() {
                return this._urlLoader.bytesTotal;
            }
            onUrlProgress(percent) {
                this.event(FlyEvent.PROGRESS, percent);
            }
            onUrlComplete(data) {
                let url = this.rslLoadData ? this.rslLoadData.url : "unknown";
                if (this._urlLoader.bytesLoaded != this._urlLoader.bytesTotal) {
                    this.onUrlError("bytesTotal != bytesLoaded!");
                    return;
                }
                if (!data) {
                    this.onUrlError("get null data ! url=" + url);
                    return;
                }
                if (this.rslLoadData.dataFormat == LoaderType.ATLAS) {
                    var al = new loader.LayaAtlasLoader();
                    al.on(FlyEvent.COMPLETE, this, this.onAtlasLoadComplete);
                    let atlasStr = arrayBuffToString(data);
                    al.load(url, atlasStr);
                }
                else if (this.rslLoadData.dataFormat == LoaderType.IMAGE) {
                    fly.TextureParse.parse(url, data, this, this.onImageLoadComplete);
                }
                else if (this.rslLoadData.dataFormat == LoaderType.fly) {
                }
                else {
                    if (this.rslLoadData.dataFormat == LoaderType.json) {
                        let atlasStr = arrayBuffToString(data);
                        this._data = JSON.parse(atlasStr);
                    }
                    else if (this.rslLoadData.dataFormat == LoaderType.TEXT) {
                        this._data = arrayBuffToString(data);
                    }
                    else {
                        this._data = data;
                    }
                    if (isLaya) {
                        Laya.loader.cacheRes(this.rslLoadData.url, this._data);
                    }
                    this.event(FlyEvent.COMPLETE, this._data);
                }
            }
            onAtlasLoadComplete() {
            }
            onImageLoadComplete(image) {
                if (isLaya) {
                    var layaTexture = image;
                    Laya.loader.cacheRes(this.rslLoadData.url, layaTexture);
                    this.event(FlyEvent.COMPLETE, layaTexture);
                }
                else {
                    this.event(FlyEvent.COMPLETE, image);
                }
            }
        }
        MultiUrlLoader.ENABLE_TIMEOUT_RELOAD = true;
        MultiUrlLoader.TIME_OUT_RETRY_TIME = 300 * 1000;
        loader.MultiUrlLoader = MultiUrlLoader;
    })(loader = fly.loader || (fly.loader = {}));
})(fly || (fly = {}));
//# sourceMappingURL=MultiUrlLoader.js.map
var fly;
(function (fly) {
    var loader;
    (function (loader) {
        class URLLoader extends fly.EventDispatcher {
            constructor(url = null, dataformat = loader.URLLoaderDataFormat.TEXT, method = "get") {
                super();
                this._dataFormat = "";
                this._method = "get";
                this.uuid = 0;
                this.loadTime = 0;
                this.onError = (e) => {
                    if (this._loading) {
                        logE("URLLoader.onError:" + this.url);
                        this.clear();
                        this.error("Request failed Status:" + this._httpRequest.status + " text:" + this._httpRequest.statusText);
                    }
                };
                this.onComplete = (e) => {
                    var http = this._httpRequest;
                    var status = this._httpRequest.status !== undefined ? this._httpRequest.status : 200;
                    if (status === 200 || status === 204 || status === 0) {
                        this.complete();
                    }
                    else {
                        this.error("[" + http.status + "]" + http.statusText + ":" + http.responseURL);
                    }
                };
                this.onAbort = (e) => {
                    this.clear();
                    this._closed = true;
                    this.event(FlyEvent.CLOSE, e);
                };
                this.onProgress = (e) => {
                    if (e && e.lengthComputable) {
                        this.event(FlyEvent.PROGRESS, e.loaded / e.total);
                    }
                };
                this._dataFormat = loader.URLLoaderDataFormat.TEXT;
                this._url = url;
                this._disposed = false;
                this._data = null;
                this._dataFormat = dataformat;
                this.method = method;
                this.uuid = ++URLLoader.COUNT;
            }
            get bytesTotal() {
                return this._bytesTotal;
            }
            get bytesLoaded() {
                return this._bytesLoaded;
            }
            set method(value) {
                if (value == "post" || value == "get") {
                    this._method = value;
                }
            }
            get method() {
                return this._method;
            }
            get http() {
                return this._httpRequest;
            }
            get loaded() {
                return this._loaded;
            }
            get dataFormat() {
                return this._dataFormat;
            }
            set dataFormat(value) {
                this._dataFormat = value;
                if (this._loading == true || this._disposed == true) {
                    logW("URLLoader set dataformat invalid.");
                }
            }
            get closed() {
                return this._closed;
            }
            get loading() {
                return this._loading;
            }
            get data() {
                return this._data;
            }
            get url() {
                return this._url;
            }
            clear() {
                this._closed = false;
                this._disposed = false;
                this._loaded = false;
                this._loading = false;
                this._data = null;
                this._bytesTotal = 0;
                this._bytesLoaded = 0;
                this.offHttpRequestEvent();
            }
            close() {
                if (this._loading) {
                    this.clear();
                    this._httpRequest.onabort = this.onAbort;
                    this._httpRequest.abort();
                }
            }
            dispose() {
                if (!this._disposed) {
                    this.close();
                    this.clear();
                    this._disposed = true;
                    this._httpRequest = null;
                }
            }
            load(url, dataformat = null, headers = null) {
                if (this._disposed == true) {
                    throw new Error("Can't load, loader has been disposed.");
                }
                if (url) {
                    this._url = url;
                }
                else {
                    this._url = null;
                }
                if (dataformat) {
                    this._dataFormat = dataformat;
                }
                if (!this._url) {
                    throw new Error("Can't load, url is empty.");
                }
                if (this._loading) {
                    throw new Error("Can't load, loader is loading.");
                }
                this.clear();
                this.close();
                this._loading = true;
                this._httpRequest = new XMLHttpRequest();
                this.addHttpRequestEvent();
                this.loadTime = ++URLLoader.LOAD_TIME;
                var type = (dataformat == loader.URLLoaderDataFormat.BINARY) ? "arraybuffer" : "text";
                this._httpRequest["responseType"] = type;
                this._httpRequest.open("GET", url, true);
                this._httpRequest.send(null);
            }
            addHttpRequestEvent() {
                this.offHttpRequestEvent();
                if (this._httpRequest) {
                    this._httpRequest.onerror = this.onError;
                    this._httpRequest.onabort = this.onAbort;
                    this._httpRequest.onprogress = this.onProgress;
                    this._httpRequest.onload = this.onComplete;
                }
            }
            error(message) {
                this.event(FlyEvent.ERROR, message);
            }
            complete() {
                this.clear();
                var flag = true;
                try {
                    this._data = this._httpRequest.response || this._httpRequest.responseText;
                }
                catch (e) {
                    flag = false;
                    this.error(e.message);
                }
                flag && this.event(FlyEvent.COMPLETE, (this._data instanceof Array) ? [this._data] : this._data);
            }
            offHttpRequestEvent() {
                var http = this._httpRequest;
                if (http) {
                    http.onerror = http.onabort = http.onprogress = http.onload = null;
                }
            }
        }
        URLLoader.UUID = "uu_id";
        URLLoader.COUNT = 0;
        URLLoader.LOAD_TIME = 0;
        loader.URLLoader = URLLoader;
    })(loader = fly.loader || (fly.loader = {}));
})(fly || (fly = {}));
//# sourceMappingURL=URLLoader.js.map
var fly;
(function (fly) {
    var renders;
    (function (renders) {
        class LayaRenderSprite extends Laya.Sprite {
            constructor() {
                super();
            }
            dispose() {
            }
            set subTexture(value) {
                this._subTexture = value;
                this.texture = value.getLayaTexture();
            }
            get subTexture() {
                return this._subTexture;
            }
            add(dis) {
                this.addChild(dis);
            }
        }
        renders.LayaRenderSprite = LayaRenderSprite;
    })(renders = fly.renders || (fly.renders = {}));
})(fly || (fly = {}));
//# sourceMappingURL=LayaRenderSprite.js.map
var fly;
(function (fly) {
    var renders;
    (function (renders) {
        class TexturePack extends fly.EventDispatcher {
            constructor() {
                super();
                this.subTextures = {};
            }
            load(fullSourchPath, configObj) {
                this._url = fullSourchPath;
                this._configObj = configObj;
                this._textureProxy = new renders.TextureProxy();
                this._textureProxy.on(FlyEvent.LOADED, this, this.onTextLoaed, [fullSourchPath]);
                this._textureProxy.load(fullSourchPath, fly.loader.LoadPriorityType.LEVEL_DEFAULT);
            }
            onTextLoaed(fullSourchPath) {
                this.parseTexture();
            }
            parseTexture() {
                this.dispatchEvent(FlyEvent.COMPLETE);
            }
            getTexture(key) {
                return this.subTextures[key];
            }
            dispose() {
            }
        }
        renders.TexturePack = TexturePack;
    })(renders = fly.renders || (fly.renders = {}));
})(fly || (fly = {}));
//# sourceMappingURL=TexturePack.js.map
var fly;
(function (fly) {
    var renders;
    (function (renders) {
        class TextureProxy extends fly.EventDispatcher {
            constructor(url = "", name = "") {
                super();
                this._url = url;
                this._error = false;
                this._name = name;
                this._texture = null;
                this._refCount = 0;
                this._disposed = false;
                this._lastUsed = 0;
            }
            get lastUsed() {
                return this._lastUsed;
            }
            get error() {
                return this._error;
            }
            get loading() {
                return this._loading;
            }
            get loaded() {
                return this._loaded;
            }
            get width() {
                return this._texture ? this._texture.width : 0;
            }
            get height() {
                return this._texture ? this._texture.height : 0;
            }
            load(url = "", priority = fly.loader.LoadPriorityType.LEVEL_DEFAULT) {
            }
            get url() {
                return this._url;
            }
            onTextureProgress(param) {
                param.target = this;
                this.event(FlyEvent.PROGRESS, param);
            }
            onTextureError(param) {
                param.target = this;
                this._error = true;
                logE(this.url + "加载出错");
                this.event(FlyEvent.ERROR, param);
            }
            onTextureComplete(param) {
                this._texture = param.param;
                param.target = this;
                param.param = this;
                this._loaded = true;
                this._loading = false;
                this.event(FlyEvent.LOADED, param);
            }
            addRef() {
                this._refCount += 1;
            }
            getRef() {
                return this._refCount;
            }
            releaseRef() {
                this._refCount -= 1;
                if (this._refCount == 0) {
                    this._lastUsed = getTimer();
                }
                if (this._refCount < 0) {
                    logW(this._refCount.toString() + ",引用计数错误。url:" + this.url);
                }
            }
            toString() {
                let ret = "";
                ret += "[name=" + this._name + ",[url=" + this._url + "]";
                return this._name ? this._name : "";
            }
            dispose() {
                if (this._disposed) {
                    return;
                }
                if (this._refCount > 0) {
                    this._refCount--;
                }
                else {
                    this._disposed = true;
                    if (this._texture) {
                        this._texture.destroy(true);
                        this._texture = null;
                    }
                    let param = {};
                    param.target = this;
                    param.param = this;
                    this.event("disposed", param);
                }
            }
        }
        renders.TextureProxy = TextureProxy;
    })(renders = fly.renders || (fly.renders = {}));
})(fly || (fly = {}));
//# sourceMappingURL=TextureProxy.js.map
var fly;
(function (fly) {
    class DelayCallInfo extends CallBack {
        constructor(calltime, caller, func, args) {
            super(caller, func, args);
            this._isCalled = false;
            this._args = args;
            this._callTime = calltime;
        }
        call() {
            super.call();
            this._isCalled = true;
        }
        get isCalled() {
            return this._isCalled;
        }
        get callTime() {
            return this._callTime;
        }
    }
    fly.DelayCallInfo = DelayCallInfo;
})(fly || (fly = {}));
//# sourceMappingURL=DelayCallInfo.js.map
/* eslint-disable */
var spine;
(function (spine) {
    var webgl;
    (function (webgl) {
        class ManagedWebGLRenderingContext {
            constructor(canvasOrContext, contextConfig = { alpha: "true" }) {
                this.restorables = new Array();
                if (canvasOrContext instanceof HTMLCanvasElement) {
                    let canvas = canvasOrContext;
                    this.gl = (canvas.getContext("webgl", contextConfig) || canvas.getContext("experimental-webgl", contextConfig));
                    this.canvas = canvas;
                    canvas.addEventListener("webglcontextlost", (e) => {
                        let event = e;
                        if (e) {
                            e.preventDefault();
                        }
                    });
                    canvas.addEventListener("webglcontextrestored", (e) => {
                        for (let i = 0, n = this.restorables.length; i < n; i++) {
                            this.restorables[i].restore();
                        }
                    });
                }
                else {
                    this.gl = canvasOrContext;
                    this.canvas = this.gl.canvas;
                }
            }
            addRestorable(restorable) {
                this.restorables.push(restorable);
            }
            removeRestorable(restorable) {
                let index = this.restorables.indexOf(restorable);
                if (index > -1) {
                    this.restorables.splice(index, 1);
                }
            }
        }
        webgl.ManagedWebGLRenderingContext = ManagedWebGLRenderingContext;
        class WebGLBlendModeConverter {
            static getDestGLBlendMode(blendMode) {
                switch (blendMode) {
                    case spine.BlendMode.Normal:
                        return WebGLBlendModeConverter.ONE_MINUS_SRC_ALPHA;
                    case spine.BlendMode.Additive:
                        return WebGLBlendModeConverter.ONE;
                    case spine.BlendMode.Multiply:
                        return WebGLBlendModeConverter.ONE_MINUS_SRC_ALPHA;
                    case spine.BlendMode.Screen:
                        return WebGLBlendModeConverter.ONE_MINUS_SRC_ALPHA;
                    default: throw new Error("Unknown blend mode: " + blendMode);
                }
            }
            static getSourceGLBlendMode(blendMode, premultipliedAlpha = false) {
                switch (blendMode) {
                    case spine.BlendMode.Normal:
                        return premultipliedAlpha ? WebGLBlendModeConverter.ONE : WebGLBlendModeConverter.SRC_ALPHA;
                    case spine.BlendMode.Additive:
                        return premultipliedAlpha ? WebGLBlendModeConverter.ONE : WebGLBlendModeConverter.SRC_ALPHA;
                    case spine.BlendMode.Multiply:
                        return WebGLBlendModeConverter.DST_COLOR;
                    case spine.BlendMode.Screen:
                        return WebGLBlendModeConverter.ONE;
                    default: throw new Error("Unknown blend mode: " + blendMode);
                }
            }
        }
        WebGLBlendModeConverter.ZERO = 0;
        WebGLBlendModeConverter.ONE = 1;
        WebGLBlendModeConverter.SRC_COLOR = 0x0300;
        WebGLBlendModeConverter.ONE_MINUS_SRC_COLOR = 0x0301;
        WebGLBlendModeConverter.SRC_ALPHA = 0x0302;
        WebGLBlendModeConverter.ONE_MINUS_SRC_ALPHA = 0x0303;
        WebGLBlendModeConverter.DST_ALPHA = 0x0304;
        WebGLBlendModeConverter.ONE_MINUS_DST_ALPHA = 0x0305;
        WebGLBlendModeConverter.DST_COLOR = 0x0306;
        webgl.WebGLBlendModeConverter = WebGLBlendModeConverter;
    })(webgl = spine.webgl || (spine.webgl = {}));
})(spine || (spine = {}));
//# sourceMappingURL=WebGL.js.map
var spine;
(function (spine) {
    var webgl;
    (function (webgl) {
        class Vector3 {
            constructor(x = 0, y = 0, z = 0) {
                this.x = 0;
                this.y = 0;
                this.z = 0;
                this.x = x;
                this.y = y;
                this.z = z;
            }
            setFrom(v) {
                this.x = v.x;
                this.y = v.y;
                this.z = v.z;
                return this;
            }
            set(x, y, z) {
                this.x = x;
                this.y = y;
                this.z = z;
                return this;
            }
            add(v) {
                this.x += v.x;
                this.y += v.y;
                this.z += v.z;
                return this;
            }
            sub(v) {
                this.x -= v.x;
                this.y -= v.y;
                this.z -= v.z;
                return this;
            }
            scale(s) {
                this.x *= s;
                this.y *= s;
                this.z *= s;
                return this;
            }
            normalize() {
                let len = this.length();
                if (len == 0) {
                    return this;
                }
                len = 1 / len;
                this.x *= len;
                this.y *= len;
                this.z *= len;
                return this;
            }
            cross(v) {
                return this.set(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
            }
            multiply(matrix) {
                let l_mat = matrix.values;
                return this.set(this.x * l_mat[webgl.M00] + this.y * l_mat[webgl.M01] + this.z * l_mat[webgl.M02] + l_mat[webgl.M03], this.x * l_mat[webgl.M10] + this.y * l_mat[webgl.M11] + this.z * l_mat[webgl.M12] + l_mat[webgl.M13], this.x * l_mat[webgl.M20] + this.y * l_mat[webgl.M21] + this.z * l_mat[webgl.M22] + l_mat[webgl.M23]);
            }
            project(matrix) {
                let l_mat = matrix.values;
                let l_w = 1 / (this.x * l_mat[webgl.M30] + this.y * l_mat[webgl.M31] + this.z * l_mat[webgl.M32] + l_mat[webgl.M33]);
                return this.set((this.x * l_mat[webgl.M00] + this.y * l_mat[webgl.M01] + this.z * l_mat[webgl.M02] + l_mat[webgl.M03]) * l_w, (this.x * l_mat[webgl.M10] + this.y * l_mat[webgl.M11] + this.z * l_mat[webgl.M12] + l_mat[webgl.M13]) * l_w, (this.x * l_mat[webgl.M20] + this.y * l_mat[webgl.M21] + this.z * l_mat[webgl.M22] + l_mat[webgl.M23]) * l_w);
            }
            dot(v) {
                return this.x * v.x + this.y * v.y + this.z * v.z;
            }
            length() {
                return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
            }
            distance(v) {
                let a = v.x - this.x;
                let b = v.y - this.y;
                let c = v.z - this.z;
                return Math.sqrt(a * a + b * b + c * c);
            }
        }
        webgl.Vector3 = Vector3;
    })(webgl = spine.webgl || (spine.webgl = {}));
})(spine || (spine = {}));
//# sourceMappingURL=Vector3.js.map
var spine;
(function (spine) {
    var webgl;
    (function (webgl) {
        class SkeletonRenderer {
            constructor(context, twoColorTint = true) {
                this.premultipliedAlpha = false;
                this.vertexEffect = null;
                this.tempColor = new spine.Color();
                this.tempColor2 = new spine.Color();
                this.vertexSize = 2 + 2 + 4;
                this.twoColorTint = false;
                this.renderable = new spine.Renderable(null, 0, 0);
                this.clipper = new spine.SkeletonClipping("");
                this.temp = new spine.Vector2();
                this.temp2 = new spine.Vector2();
                this.temp3 = new spine.Color();
                this.temp4 = new spine.Color();
                this.twoColorTint = twoColorTint;
                if (twoColorTint) {
                    this.vertexSize += 4;
                }
                this.vertices = spine.Utils.newFloatArray(this.vertexSize * 1024);
            }
            draw(batcher, skeleton, slotRangeStart = -1, slotRangeEnd = -1) {
                let clipper = this.clipper;
                let premultipliedAlpha = this.premultipliedAlpha;
                let twoColorTint = this.twoColorTint;
                let blendMode = null;
                let tempPos = this.temp;
                let tempUv = this.temp2;
                let tempLight = this.temp3;
                let tempDark = this.temp4;
                let renderable = this.renderable;
                let uvs = null;
                let triangles = null;
                let drawOrder = skeleton.drawOrder;
                let attachmentColor = null;
                let skeletonColor = skeleton.color;
                let vertexSize = twoColorTint ? 12 : 8;
                let inRange = false;
                if (slotRangeStart == -1) {
                    inRange = true;
                }
                for (let i = 0, n = drawOrder.length; i < n; i++) {
                    let clippedVertexSize = clipper.isClipping() ? 2 : vertexSize;
                    let slot = drawOrder[i];
                    if (slotRangeStart >= 0 && slotRangeStart == slot.data.index) {
                        inRange = true;
                    }
                    if (!inRange) {
                        clipper.clipEndWithSlot(slot);
                        continue;
                    }
                    if (slotRangeEnd >= 0 && slotRangeEnd == slot.data.index) {
                        inRange = false;
                    }
                    let attachment = slot.getAttachment();
                    let texture = null;
                    if (attachment instanceof spine.RegionAttachment) {
                        let region = attachment;
                        renderable.vertices = this.vertices;
                        renderable.numVertices = 4;
                        renderable.numFloats = clippedVertexSize << 2;
                        region.computeWorldVertices(slot.bone, renderable.vertices, 0, clippedVertexSize);
                        triangles = SkeletonRenderer.QUAD_TRIANGLES;
                        uvs = region.uvs;
                        texture = region.region.renderObject.texture;
                        attachmentColor = region.color;
                    }
                    else if (attachment instanceof spine.MeshAttachment) {
                        let mesh = attachment;
                        renderable.vertices = this.vertices;
                        renderable.numVertices = (mesh.worldVerticesLength >> 1);
                        renderable.numFloats = renderable.numVertices * clippedVertexSize;
                        if (renderable.numFloats > renderable.vertices.length) {
                            renderable.vertices = this.vertices = spine.Utils.newFloatArray(renderable.numFloats);
                        }
                        mesh.computeWorldVertices(slot, 0, mesh.worldVerticesLength, renderable.vertices, 0, clippedVertexSize);
                        triangles = mesh.triangles;
                        texture = mesh.region.renderObject.texture;
                        uvs = mesh.uvs;
                        attachmentColor = mesh.color;
                    }
                    else if (attachment instanceof spine.ClippingAttachment) {
                        let clip = (attachment);
                        clipper.clipStart(slot, clip);
                        continue;
                    }
                    else {
                        continue;
                    }
                    if (texture != null) {
                        let slotColor = slot.color;
                        let finalColor = this.tempColor;
                        finalColor.r = skeletonColor.r * slotColor.r * attachmentColor.r;
                        finalColor.g = skeletonColor.g * slotColor.g * attachmentColor.g;
                        finalColor.b = skeletonColor.b * slotColor.b * attachmentColor.b;
                        finalColor.a = skeletonColor.a * slotColor.a * attachmentColor.a;
                        if (premultipliedAlpha) {
                            finalColor.r *= finalColor.a;
                            finalColor.g *= finalColor.a;
                            finalColor.b *= finalColor.a;
                        }
                        let darkColor = this.tempColor2;
                        if (slot.darkColor == null) {
                            darkColor.set(0, 0, 0, 1.0);
                        }
                        else {
                            if (premultipliedAlpha) {
                                darkColor.r = slot.darkColor.r * finalColor.a;
                                darkColor.g = slot.darkColor.g * finalColor.a;
                                darkColor.b = slot.darkColor.b * finalColor.a;
                            }
                            else {
                                darkColor.setFromColor(slot.darkColor);
                            }
                            darkColor.a = premultipliedAlpha ? 1.0 : 0.0;
                        }
                        let slotBlendMode = slot.data.blendMode;
                        if (slotBlendMode != blendMode) {
                            blendMode = slotBlendMode;
                            batcher.setBlendMode(webgl.WebGLBlendModeConverter.getSourceGLBlendMode(blendMode, premultipliedAlpha), webgl.WebGLBlendModeConverter.getDestGLBlendMode(blendMode));
                        }
                        if (clipper.isClipping()) {
                            clipper.clipTriangles(renderable.vertices, renderable.numFloats, triangles, triangles.length, uvs, finalColor, darkColor, twoColorTint);
                            let clippedVertices = new Float32Array(clipper.clippedVertices);
                            let clippedTriangles = clipper.clippedTriangles;
                            if (this.vertexEffect != null) {
                                let vertexEffect = this.vertexEffect;
                                let verts = clippedVertices;
                                if (!twoColorTint) {
                                    for (let v = 0, n = clippedVertices.length; v < n; v += vertexSize) {
                                        tempPos.x = verts[v];
                                        tempPos.y = verts[v + 1];
                                        tempLight.set(verts[v + 2], verts[v + 3], verts[v + 4], verts[v + 5]);
                                        tempUv.x = verts[v + 6];
                                        tempUv.y = verts[v + 7];
                                        tempDark.set(0, 0, 0, 0);
                                        vertexEffect.transform(tempPos, tempUv, tempLight, tempDark);
                                        verts[v] = tempPos.x;
                                        verts[v + 1] = tempPos.y;
                                        verts[v + 2] = tempLight.r;
                                        verts[v + 3] = tempLight.g;
                                        verts[v + 4] = tempLight.b;
                                        verts[v + 5] = tempLight.a;
                                        verts[v + 6] = tempUv.x;
                                        verts[v + 7] = tempUv.y;
                                    }
                                }
                                else {
                                    for (let v = 0, n = clippedVertices.length; v < n; v += vertexSize) {
                                        tempPos.x = verts[v];
                                        tempPos.y = verts[v + 1];
                                        tempLight.set(verts[v + 2], verts[v + 3], verts[v + 4], verts[v + 5]);
                                        tempUv.x = verts[v + 6];
                                        tempUv.y = verts[v + 7];
                                        tempDark.set(verts[v + 8], verts[v + 9], verts[v + 10], verts[v + 11]);
                                        vertexEffect.transform(tempPos, tempUv, tempLight, tempDark);
                                        verts[v] = tempPos.x;
                                        verts[v + 1] = tempPos.y;
                                        verts[v + 2] = tempLight.r;
                                        verts[v + 3] = tempLight.g;
                                        verts[v + 4] = tempLight.b;
                                        verts[v + 5] = tempLight.a;
                                        verts[v + 6] = tempUv.x;
                                        verts[v + 7] = tempUv.y;
                                        verts[v + 8] = tempDark.r;
                                        verts[v + 9] = tempDark.g;
                                        verts[v + 10] = tempDark.b;
                                        verts[v + 11] = tempDark.a;
                                    }
                                }
                            }
                            batcher.draw(texture, clippedVertices, clippedTriangles);
                        }
                        else {
                            let verts = renderable.vertices;
                            if (this.vertexEffect != null) {
                                let vertexEffect = this.vertexEffect;
                                if (!twoColorTint) {
                                    for (let v = 0, u = 0, n = renderable.numFloats; v < n; v += vertexSize, u += 2) {
                                        tempPos.x = verts[v];
                                        tempPos.y = verts[v + 1];
                                        tempUv.x = uvs[u];
                                        tempUv.y = uvs[u + 1];
                                        tempLight.setFromColor(finalColor);
                                        tempDark.set(0, 0, 0, 0);
                                        vertexEffect.transform(tempPos, tempUv, tempLight, tempDark);
                                        verts[v] = tempPos.x;
                                        verts[v + 1] = tempPos.y;
                                        verts[v + 2] = tempLight.r;
                                        verts[v + 3] = tempLight.g;
                                        verts[v + 4] = tempLight.b;
                                        verts[v + 5] = tempLight.a;
                                        verts[v + 6] = tempUv.x;
                                        verts[v + 7] = tempUv.y;
                                    }
                                }
                                else {
                                    for (let v = 0, u = 0, n = renderable.numFloats; v < n; v += vertexSize, u += 2) {
                                        tempPos.x = verts[v];
                                        tempPos.y = verts[v + 1];
                                        tempUv.x = uvs[u];
                                        tempUv.y = uvs[u + 1];
                                        tempLight.setFromColor(finalColor);
                                        tempDark.setFromColor(darkColor);
                                        vertexEffect.transform(tempPos, tempUv, tempLight, tempDark);
                                        verts[v] = tempPos.x;
                                        verts[v + 1] = tempPos.y;
                                        verts[v + 2] = tempLight.r;
                                        verts[v + 3] = tempLight.g;
                                        verts[v + 4] = tempLight.b;
                                        verts[v + 5] = tempLight.a;
                                        verts[v + 6] = tempUv.x;
                                        verts[v + 7] = tempUv.y;
                                        verts[v + 8] = tempDark.r;
                                        verts[v + 9] = tempDark.g;
                                        verts[v + 10] = tempDark.b;
                                        verts[v + 11] = tempDark.a;
                                    }
                                }
                            }
                            else {
                                if (!twoColorTint) {
                                    for (let v = 2, u = 0, n = renderable.numFloats; v < n; v += vertexSize, u += 2) {
                                        verts[v] = finalColor.r;
                                        verts[v + 1] = finalColor.g;
                                        verts[v + 2] = finalColor.b;
                                        verts[v + 3] = finalColor.a;
                                        verts[v + 4] = uvs[u];
                                        verts[v + 5] = uvs[u + 1];
                                    }
                                }
                                else {
                                    for (let v = 2, u = 0, n = renderable.numFloats; v < n; v += vertexSize, u += 2) {
                                        verts[v] = finalColor.r;
                                        verts[v + 1] = finalColor.g;
                                        verts[v + 2] = finalColor.b;
                                        verts[v + 3] = finalColor.a;
                                        verts[v + 4] = uvs[u];
                                        verts[v + 5] = uvs[u + 1];
                                        verts[v + 6] = darkColor.r;
                                        verts[v + 7] = darkColor.g;
                                        verts[v + 8] = darkColor.b;
                                        verts[v + 9] = darkColor.a;
                                    }
                                }
                            }
                            let view = renderable.vertices.subarray(0, renderable.numFloats);
                            batcher.draw(texture, view, triangles);
                        }
                    }
                    clipper.clipEndWithSlot(slot);
                }
                clipper.clipEnd();
            }
        }
        SkeletonRenderer.QUAD_TRIANGLES = [0, 1, 2, 2, 3, 0];
        webgl.SkeletonRenderer = SkeletonRenderer;
    })(webgl = spine.webgl || (spine.webgl = {}));
})(spine || (spine = {}));
//# sourceMappingURL=SkeletonRenderer.js.map
var spine;
(function (spine) {
    var webgl;
    (function (webgl) {
        webgl.M00 = 0;
        webgl.M01 = 4;
        webgl.M02 = 8;
        webgl.M03 = 12;
        webgl.M10 = 1;
        webgl.M11 = 5;
        webgl.M12 = 9;
        webgl.M13 = 13;
        webgl.M20 = 2;
        webgl.M21 = 6;
        webgl.M22 = 10;
        webgl.M23 = 14;
        webgl.M30 = 3;
        webgl.M31 = 7;
        webgl.M32 = 11;
        webgl.M33 = 15;
        class Matrix4 {
            constructor() {
                this.temp = new Float32Array(16);
                this.values = new Float32Array(16);
                let v = this.values;
                v[webgl.M00] = 1;
                v[webgl.M11] = 1;
                v[webgl.M22] = 1;
                v[webgl.M33] = 1;
            }
            set(values) {
                this.values.set(values);
                return this;
            }
            transpose() {
                let t = this.temp;
                let v = this.values;
                t[webgl.M00] = v[webgl.M00];
                t[webgl.M01] = v[webgl.M10];
                t[webgl.M02] = v[webgl.M20];
                t[webgl.M03] = v[webgl.M30];
                t[webgl.M10] = v[webgl.M01];
                t[webgl.M11] = v[webgl.M11];
                t[webgl.M12] = v[webgl.M21];
                t[webgl.M13] = v[webgl.M31];
                t[webgl.M20] = v[webgl.M02];
                t[webgl.M21] = v[webgl.M12];
                t[webgl.M22] = v[webgl.M22];
                t[webgl.M23] = v[webgl.M32];
                t[webgl.M30] = v[webgl.M03];
                t[webgl.M31] = v[webgl.M13];
                t[webgl.M32] = v[webgl.M23];
                t[webgl.M33] = v[webgl.M33];
                return this.set(t);
            }
            identity() {
                let v = this.values;
                v[webgl.M00] = 1;
                v[webgl.M01] = 0;
                v[webgl.M02] = 0;
                v[webgl.M03] = 0;
                v[webgl.M10] = 0;
                v[webgl.M11] = 1;
                v[webgl.M12] = 0;
                v[webgl.M13] = 0;
                v[webgl.M20] = 0;
                v[webgl.M21] = 0;
                v[webgl.M22] = 1;
                v[webgl.M23] = 0;
                v[webgl.M30] = 0;
                v[webgl.M31] = 0;
                v[webgl.M32] = 0;
                v[webgl.M33] = 1;
                return this;
            }
            invert() {
                let v = this.values;
                let t = this.temp;
                let l_det = v[webgl.M30] * v[webgl.M21] * v[webgl.M12] * v[webgl.M03] - v[webgl.M20] * v[webgl.M31] * v[webgl.M12] * v[webgl.M03] - v[webgl.M30] * v[webgl.M11] * v[webgl.M22] * v[webgl.M03]
                    + v[webgl.M10] * v[webgl.M31] * v[webgl.M22] * v[webgl.M03] + v[webgl.M20] * v[webgl.M11] * v[webgl.M32] * v[webgl.M03] - v[webgl.M10] * v[webgl.M21] * v[webgl.M32] * v[webgl.M03]
                    - v[webgl.M30] * v[webgl.M21] * v[webgl.M02] * v[webgl.M13] + v[webgl.M20] * v[webgl.M31] * v[webgl.M02] * v[webgl.M13] + v[webgl.M30] * v[webgl.M01] * v[webgl.M22] * v[webgl.M13]
                    - v[webgl.M00] * v[webgl.M31] * v[webgl.M22] * v[webgl.M13] - v[webgl.M20] * v[webgl.M01] * v[webgl.M32] * v[webgl.M13] + v[webgl.M00] * v[webgl.M21] * v[webgl.M32] * v[webgl.M13]
                    + v[webgl.M30] * v[webgl.M11] * v[webgl.M02] * v[webgl.M23] - v[webgl.M10] * v[webgl.M31] * v[webgl.M02] * v[webgl.M23] - v[webgl.M30] * v[webgl.M01] * v[webgl.M12] * v[webgl.M23]
                    + v[webgl.M00] * v[webgl.M31] * v[webgl.M12] * v[webgl.M23] + v[webgl.M10] * v[webgl.M01] * v[webgl.M32] * v[webgl.M23] - v[webgl.M00] * v[webgl.M11] * v[webgl.M32] * v[webgl.M23]
                    - v[webgl.M20] * v[webgl.M11] * v[webgl.M02] * v[webgl.M33] + v[webgl.M10] * v[webgl.M21] * v[webgl.M02] * v[webgl.M33] + v[webgl.M20] * v[webgl.M01] * v[webgl.M12] * v[webgl.M33]
                    - v[webgl.M00] * v[webgl.M21] * v[webgl.M12] * v[webgl.M33] - v[webgl.M10] * v[webgl.M01] * v[webgl.M22] * v[webgl.M33] + v[webgl.M00] * v[webgl.M11] * v[webgl.M22] * v[webgl.M33];
                if (l_det == 0) {
                    throw new Error("non-invertible matrix");
                }
                let inv_det = 1.0 / l_det;
                t[webgl.M00] = v[webgl.M12] * v[webgl.M23] * v[webgl.M31] - v[webgl.M13] * v[webgl.M22] * v[webgl.M31] + v[webgl.M13] * v[webgl.M21] * v[webgl.M32]
                    - v[webgl.M11] * v[webgl.M23] * v[webgl.M32] - v[webgl.M12] * v[webgl.M21] * v[webgl.M33] + v[webgl.M11] * v[webgl.M22] * v[webgl.M33];
                t[webgl.M01] = v[webgl.M03] * v[webgl.M22] * v[webgl.M31] - v[webgl.M02] * v[webgl.M23] * v[webgl.M31] - v[webgl.M03] * v[webgl.M21] * v[webgl.M32]
                    + v[webgl.M01] * v[webgl.M23] * v[webgl.M32] + v[webgl.M02] * v[webgl.M21] * v[webgl.M33] - v[webgl.M01] * v[webgl.M22] * v[webgl.M33];
                t[webgl.M02] = v[webgl.M02] * v[webgl.M13] * v[webgl.M31] - v[webgl.M03] * v[webgl.M12] * v[webgl.M31] + v[webgl.M03] * v[webgl.M11] * v[webgl.M32]
                    - v[webgl.M01] * v[webgl.M13] * v[webgl.M32] - v[webgl.M02] * v[webgl.M11] * v[webgl.M33] + v[webgl.M01] * v[webgl.M12] * v[webgl.M33];
                t[webgl.M03] = v[webgl.M03] * v[webgl.M12] * v[webgl.M21] - v[webgl.M02] * v[webgl.M13] * v[webgl.M21] - v[webgl.M03] * v[webgl.M11] * v[webgl.M22]
                    + v[webgl.M01] * v[webgl.M13] * v[webgl.M22] + v[webgl.M02] * v[webgl.M11] * v[webgl.M23] - v[webgl.M01] * v[webgl.M12] * v[webgl.M23];
                t[webgl.M10] = v[webgl.M13] * v[webgl.M22] * v[webgl.M30] - v[webgl.M12] * v[webgl.M23] * v[webgl.M30] - v[webgl.M13] * v[webgl.M20] * v[webgl.M32]
                    + v[webgl.M10] * v[webgl.M23] * v[webgl.M32] + v[webgl.M12] * v[webgl.M20] * v[webgl.M33] - v[webgl.M10] * v[webgl.M22] * v[webgl.M33];
                t[webgl.M11] = v[webgl.M02] * v[webgl.M23] * v[webgl.M30] - v[webgl.M03] * v[webgl.M22] * v[webgl.M30] + v[webgl.M03] * v[webgl.M20] * v[webgl.M32]
                    - v[webgl.M00] * v[webgl.M23] * v[webgl.M32] - v[webgl.M02] * v[webgl.M20] * v[webgl.M33] + v[webgl.M00] * v[webgl.M22] * v[webgl.M33];
                t[webgl.M12] = v[webgl.M03] * v[webgl.M12] * v[webgl.M30] - v[webgl.M02] * v[webgl.M13] * v[webgl.M30] - v[webgl.M03] * v[webgl.M10] * v[webgl.M32]
                    + v[webgl.M00] * v[webgl.M13] * v[webgl.M32] + v[webgl.M02] * v[webgl.M10] * v[webgl.M33] - v[webgl.M00] * v[webgl.M12] * v[webgl.M33];
                t[webgl.M13] = v[webgl.M02] * v[webgl.M13] * v[webgl.M20] - v[webgl.M03] * v[webgl.M12] * v[webgl.M20] + v[webgl.M03] * v[webgl.M10] * v[webgl.M22]
                    - v[webgl.M00] * v[webgl.M13] * v[webgl.M22] - v[webgl.M02] * v[webgl.M10] * v[webgl.M23] + v[webgl.M00] * v[webgl.M12] * v[webgl.M23];
                t[webgl.M20] = v[webgl.M11] * v[webgl.M23] * v[webgl.M30] - v[webgl.M13] * v[webgl.M21] * v[webgl.M30] + v[webgl.M13] * v[webgl.M20] * v[webgl.M31]
                    - v[webgl.M10] * v[webgl.M23] * v[webgl.M31] - v[webgl.M11] * v[webgl.M20] * v[webgl.M33] + v[webgl.M10] * v[webgl.M21] * v[webgl.M33];
                t[webgl.M21] = v[webgl.M03] * v[webgl.M21] * v[webgl.M30] - v[webgl.M01] * v[webgl.M23] * v[webgl.M30] - v[webgl.M03] * v[webgl.M20] * v[webgl.M31]
                    + v[webgl.M00] * v[webgl.M23] * v[webgl.M31] + v[webgl.M01] * v[webgl.M20] * v[webgl.M33] - v[webgl.M00] * v[webgl.M21] * v[webgl.M33];
                t[webgl.M22] = v[webgl.M01] * v[webgl.M13] * v[webgl.M30] - v[webgl.M03] * v[webgl.M11] * v[webgl.M30] + v[webgl.M03] * v[webgl.M10] * v[webgl.M31]
                    - v[webgl.M00] * v[webgl.M13] * v[webgl.M31] - v[webgl.M01] * v[webgl.M10] * v[webgl.M33] + v[webgl.M00] * v[webgl.M11] * v[webgl.M33];
                t[webgl.M23] = v[webgl.M03] * v[webgl.M11] * v[webgl.M20] - v[webgl.M01] * v[webgl.M13] * v[webgl.M20] - v[webgl.M03] * v[webgl.M10] * v[webgl.M21]
                    + v[webgl.M00] * v[webgl.M13] * v[webgl.M21] + v[webgl.M01] * v[webgl.M10] * v[webgl.M23] - v[webgl.M00] * v[webgl.M11] * v[webgl.M23];
                t[webgl.M30] = v[webgl.M12] * v[webgl.M21] * v[webgl.M30] - v[webgl.M11] * v[webgl.M22] * v[webgl.M30] - v[webgl.M12] * v[webgl.M20] * v[webgl.M31]
                    + v[webgl.M10] * v[webgl.M22] * v[webgl.M31] + v[webgl.M11] * v[webgl.M20] * v[webgl.M32] - v[webgl.M10] * v[webgl.M21] * v[webgl.M32];
                t[webgl.M31] = v[webgl.M01] * v[webgl.M22] * v[webgl.M30] - v[webgl.M02] * v[webgl.M21] * v[webgl.M30] + v[webgl.M02] * v[webgl.M20] * v[webgl.M31]
                    - v[webgl.M00] * v[webgl.M22] * v[webgl.M31] - v[webgl.M01] * v[webgl.M20] * v[webgl.M32] + v[webgl.M00] * v[webgl.M21] * v[webgl.M32];
                t[webgl.M32] = v[webgl.M02] * v[webgl.M11] * v[webgl.M30] - v[webgl.M01] * v[webgl.M12] * v[webgl.M30] - v[webgl.M02] * v[webgl.M10] * v[webgl.M31]
                    + v[webgl.M00] * v[webgl.M12] * v[webgl.M31] + v[webgl.M01] * v[webgl.M10] * v[webgl.M32] - v[webgl.M00] * v[webgl.M11] * v[webgl.M32];
                t[webgl.M33] = v[webgl.M01] * v[webgl.M12] * v[webgl.M20] - v[webgl.M02] * v[webgl.M11] * v[webgl.M20] + v[webgl.M02] * v[webgl.M10] * v[webgl.M21]
                    - v[webgl.M00] * v[webgl.M12] * v[webgl.M21] - v[webgl.M01] * v[webgl.M10] * v[webgl.M22] + v[webgl.M00] * v[webgl.M11] * v[webgl.M22];
                v[webgl.M00] = t[webgl.M00] * inv_det;
                v[webgl.M01] = t[webgl.M01] * inv_det;
                v[webgl.M02] = t[webgl.M02] * inv_det;
                v[webgl.M03] = t[webgl.M03] * inv_det;
                v[webgl.M10] = t[webgl.M10] * inv_det;
                v[webgl.M11] = t[webgl.M11] * inv_det;
                v[webgl.M12] = t[webgl.M12] * inv_det;
                v[webgl.M13] = t[webgl.M13] * inv_det;
                v[webgl.M20] = t[webgl.M20] * inv_det;
                v[webgl.M21] = t[webgl.M21] * inv_det;
                v[webgl.M22] = t[webgl.M22] * inv_det;
                v[webgl.M23] = t[webgl.M23] * inv_det;
                v[webgl.M30] = t[webgl.M30] * inv_det;
                v[webgl.M31] = t[webgl.M31] * inv_det;
                v[webgl.M32] = t[webgl.M32] * inv_det;
                v[webgl.M33] = t[webgl.M33] * inv_det;
                return this;
            }
            determinant() {
                let v = this.values;
                return v[webgl.M30] * v[webgl.M21] * v[webgl.M12] * v[webgl.M03] - v[webgl.M20] * v[webgl.M31] * v[webgl.M12] * v[webgl.M03] - v[webgl.M30] * v[webgl.M11] * v[webgl.M22] * v[webgl.M03]
                    + v[webgl.M10] * v[webgl.M31] * v[webgl.M22] * v[webgl.M03] + v[webgl.M20] * v[webgl.M11] * v[webgl.M32] * v[webgl.M03] - v[webgl.M10] * v[webgl.M21] * v[webgl.M32] * v[webgl.M03]
                    - v[webgl.M30] * v[webgl.M21] * v[webgl.M02] * v[webgl.M13] + v[webgl.M20] * v[webgl.M31] * v[webgl.M02] * v[webgl.M13] + v[webgl.M30] * v[webgl.M01] * v[webgl.M22] * v[webgl.M13]
                    - v[webgl.M00] * v[webgl.M31] * v[webgl.M22] * v[webgl.M13] - v[webgl.M20] * v[webgl.M01] * v[webgl.M32] * v[webgl.M13] + v[webgl.M00] * v[webgl.M21] * v[webgl.M32] * v[webgl.M13]
                    + v[webgl.M30] * v[webgl.M11] * v[webgl.M02] * v[webgl.M23] - v[webgl.M10] * v[webgl.M31] * v[webgl.M02] * v[webgl.M23] - v[webgl.M30] * v[webgl.M01] * v[webgl.M12] * v[webgl.M23]
                    + v[webgl.M00] * v[webgl.M31] * v[webgl.M12] * v[webgl.M23] + v[webgl.M10] * v[webgl.M01] * v[webgl.M32] * v[webgl.M23] - v[webgl.M00] * v[webgl.M11] * v[webgl.M32] * v[webgl.M23]
                    - v[webgl.M20] * v[webgl.M11] * v[webgl.M02] * v[webgl.M33] + v[webgl.M10] * v[webgl.M21] * v[webgl.M02] * v[webgl.M33] + v[webgl.M20] * v[webgl.M01] * v[webgl.M12] * v[webgl.M33]
                    - v[webgl.M00] * v[webgl.M21] * v[webgl.M12] * v[webgl.M33] - v[webgl.M10] * v[webgl.M01] * v[webgl.M22] * v[webgl.M33] + v[webgl.M00] * v[webgl.M11] * v[webgl.M22] * v[webgl.M33];
            }
            translate(x, y, z) {
                let v = this.values;
                v[webgl.M03] += x;
                v[webgl.M13] += y;
                v[webgl.M23] += z;
                return this;
            }
            copy() {
                return new Matrix4().set(this.values);
            }
            projection(near, far, fovy, aspectRatio) {
                this.identity();
                let l_fd = (1.0 / Math.tan((fovy * (Math.PI / 180)) / 2.0));
                let l_a1 = (far + near) / (near - far);
                let l_a2 = (2 * far * near) / (near - far);
                let v = this.values;
                v[webgl.M00] = l_fd / aspectRatio;
                v[webgl.M10] = 0;
                v[webgl.M20] = 0;
                v[webgl.M30] = 0;
                v[webgl.M01] = 0;
                v[webgl.M11] = l_fd;
                v[webgl.M21] = 0;
                v[webgl.M31] = 0;
                v[webgl.M02] = 0;
                v[webgl.M12] = 0;
                v[webgl.M22] = l_a1;
                v[webgl.M32] = -1;
                v[webgl.M03] = 0;
                v[webgl.M13] = 0;
                v[webgl.M23] = l_a2;
                v[webgl.M33] = 0;
                return this;
            }
            ortho2d(x, y, width, height) {
                return this.ortho(x, x + width, y, y + height, 0, 1);
            }
            ortho(left, right, bottom, top, near, far) {
                this.identity();
                let x_orth = 2 / (right - left);
                let y_orth = 2 / (top - bottom);
                let z_orth = -2 / (far - near);
                let tx = -(right + left) / (right - left);
                let ty = -(top + bottom) / (top - bottom);
                let tz = -(far + near) / (far - near);
                let v = this.values;
                v[webgl.M00] = x_orth;
                v[webgl.M10] = 0;
                v[webgl.M20] = 0;
                v[webgl.M30] = 0;
                v[webgl.M01] = 0;
                v[webgl.M11] = y_orth;
                v[webgl.M21] = 0;
                v[webgl.M31] = 0;
                v[webgl.M02] = 0;
                v[webgl.M12] = 0;
                v[webgl.M22] = z_orth;
                v[webgl.M32] = 0;
                v[webgl.M03] = tx;
                v[webgl.M13] = ty;
                v[webgl.M23] = tz;
                v[webgl.M33] = 1;
                return this;
            }
            multiply(matrix) {
                let t = this.temp;
                let v = this.values;
                let m = matrix.values;
                t[webgl.M00] = v[webgl.M00] * m[webgl.M00] + v[webgl.M01] * m[webgl.M10] + v[webgl.M02] * m[webgl.M20] + v[webgl.M03] * m[webgl.M30];
                t[webgl.M01] = v[webgl.M00] * m[webgl.M01] + v[webgl.M01] * m[webgl.M11] + v[webgl.M02] * m[webgl.M21] + v[webgl.M03] * m[webgl.M31];
                t[webgl.M02] = v[webgl.M00] * m[webgl.M02] + v[webgl.M01] * m[webgl.M12] + v[webgl.M02] * m[webgl.M22] + v[webgl.M03] * m[webgl.M32];
                t[webgl.M03] = v[webgl.M00] * m[webgl.M03] + v[webgl.M01] * m[webgl.M13] + v[webgl.M02] * m[webgl.M23] + v[webgl.M03] * m[webgl.M33];
                t[webgl.M10] = v[webgl.M10] * m[webgl.M00] + v[webgl.M11] * m[webgl.M10] + v[webgl.M12] * m[webgl.M20] + v[webgl.M13] * m[webgl.M30];
                t[webgl.M11] = v[webgl.M10] * m[webgl.M01] + v[webgl.M11] * m[webgl.M11] + v[webgl.M12] * m[webgl.M21] + v[webgl.M13] * m[webgl.M31];
                t[webgl.M12] = v[webgl.M10] * m[webgl.M02] + v[webgl.M11] * m[webgl.M12] + v[webgl.M12] * m[webgl.M22] + v[webgl.M13] * m[webgl.M32];
                t[webgl.M13] = v[webgl.M10] * m[webgl.M03] + v[webgl.M11] * m[webgl.M13] + v[webgl.M12] * m[webgl.M23] + v[webgl.M13] * m[webgl.M33];
                t[webgl.M20] = v[webgl.M20] * m[webgl.M00] + v[webgl.M21] * m[webgl.M10] + v[webgl.M22] * m[webgl.M20] + v[webgl.M23] * m[webgl.M30];
                t[webgl.M21] = v[webgl.M20] * m[webgl.M01] + v[webgl.M21] * m[webgl.M11] + v[webgl.M22] * m[webgl.M21] + v[webgl.M23] * m[webgl.M31];
                t[webgl.M22] = v[webgl.M20] * m[webgl.M02] + v[webgl.M21] * m[webgl.M12] + v[webgl.M22] * m[webgl.M22] + v[webgl.M23] * m[webgl.M32];
                t[webgl.M23] = v[webgl.M20] * m[webgl.M03] + v[webgl.M21] * m[webgl.M13] + v[webgl.M22] * m[webgl.M23] + v[webgl.M23] * m[webgl.M33];
                t[webgl.M30] = v[webgl.M30] * m[webgl.M00] + v[webgl.M31] * m[webgl.M10] + v[webgl.M32] * m[webgl.M20] + v[webgl.M33] * m[webgl.M30];
                t[webgl.M31] = v[webgl.M30] * m[webgl.M01] + v[webgl.M31] * m[webgl.M11] + v[webgl.M32] * m[webgl.M21] + v[webgl.M33] * m[webgl.M31];
                t[webgl.M32] = v[webgl.M30] * m[webgl.M02] + v[webgl.M31] * m[webgl.M12] + v[webgl.M32] * m[webgl.M22] + v[webgl.M33] * m[webgl.M32];
                t[webgl.M33] = v[webgl.M30] * m[webgl.M03] + v[webgl.M31] * m[webgl.M13] + v[webgl.M32] * m[webgl.M23] + v[webgl.M33] * m[webgl.M33];
                return this.set(this.temp);
            }
            multiplyLeft(matrix) {
                let t = this.temp;
                let v = this.values;
                let m = matrix.values;
                t[webgl.M00] = m[webgl.M00] * v[webgl.M00] + m[webgl.M01] * v[webgl.M10] + m[webgl.M02] * v[webgl.M20] + m[webgl.M03] * v[webgl.M30];
                t[webgl.M01] = m[webgl.M00] * v[webgl.M01] + m[webgl.M01] * v[webgl.M11] + m[webgl.M02] * v[webgl.M21] + m[webgl.M03] * v[webgl.M31];
                t[webgl.M02] = m[webgl.M00] * v[webgl.M02] + m[webgl.M01] * v[webgl.M12] + m[webgl.M02] * v[webgl.M22] + m[webgl.M03] * v[webgl.M32];
                t[webgl.M03] = m[webgl.M00] * v[webgl.M03] + m[webgl.M01] * v[webgl.M13] + m[webgl.M02] * v[webgl.M23] + m[webgl.M03] * v[webgl.M33];
                t[webgl.M10] = m[webgl.M10] * v[webgl.M00] + m[webgl.M11] * v[webgl.M10] + m[webgl.M12] * v[webgl.M20] + m[webgl.M13] * v[webgl.M30];
                t[webgl.M11] = m[webgl.M10] * v[webgl.M01] + m[webgl.M11] * v[webgl.M11] + m[webgl.M12] * v[webgl.M21] + m[webgl.M13] * v[webgl.M31];
                t[webgl.M12] = m[webgl.M10] * v[webgl.M02] + m[webgl.M11] * v[webgl.M12] + m[webgl.M12] * v[webgl.M22] + m[webgl.M13] * v[webgl.M32];
                t[webgl.M13] = m[webgl.M10] * v[webgl.M03] + m[webgl.M11] * v[webgl.M13] + m[webgl.M12] * v[webgl.M23] + m[webgl.M13] * v[webgl.M33];
                t[webgl.M20] = m[webgl.M20] * v[webgl.M00] + m[webgl.M21] * v[webgl.M10] + m[webgl.M22] * v[webgl.M20] + m[webgl.M23] * v[webgl.M30];
                t[webgl.M21] = m[webgl.M20] * v[webgl.M01] + m[webgl.M21] * v[webgl.M11] + m[webgl.M22] * v[webgl.M21] + m[webgl.M23] * v[webgl.M31];
                t[webgl.M22] = m[webgl.M20] * v[webgl.M02] + m[webgl.M21] * v[webgl.M12] + m[webgl.M22] * v[webgl.M22] + m[webgl.M23] * v[webgl.M32];
                t[webgl.M23] = m[webgl.M20] * v[webgl.M03] + m[webgl.M21] * v[webgl.M13] + m[webgl.M22] * v[webgl.M23] + m[webgl.M23] * v[webgl.M33];
                t[webgl.M30] = m[webgl.M30] * v[webgl.M00] + m[webgl.M31] * v[webgl.M10] + m[webgl.M32] * v[webgl.M20] + m[webgl.M33] * v[webgl.M30];
                t[webgl.M31] = m[webgl.M30] * v[webgl.M01] + m[webgl.M31] * v[webgl.M11] + m[webgl.M32] * v[webgl.M21] + m[webgl.M33] * v[webgl.M31];
                t[webgl.M32] = m[webgl.M30] * v[webgl.M02] + m[webgl.M31] * v[webgl.M12] + m[webgl.M32] * v[webgl.M22] + m[webgl.M33] * v[webgl.M32];
                t[webgl.M33] = m[webgl.M30] * v[webgl.M03] + m[webgl.M31] * v[webgl.M13] + m[webgl.M32] * v[webgl.M23] + m[webgl.M33] * v[webgl.M33];
                return this.set(this.temp);
            }
            lookAt(position, direction, up) {
                Matrix4.initTemps();
                let xAxis = Matrix4.xAxis, yAxis = Matrix4.yAxis, zAxis = Matrix4.zAxis;
                zAxis.setFrom(direction).normalize();
                xAxis.setFrom(direction).normalize();
                xAxis.cross(up).normalize();
                yAxis.setFrom(xAxis).cross(zAxis).normalize();
                this.identity();
                let val = this.values;
                val[webgl.M00] = xAxis.x;
                val[webgl.M01] = xAxis.y;
                val[webgl.M02] = xAxis.z;
                val[webgl.M10] = yAxis.x;
                val[webgl.M11] = yAxis.y;
                val[webgl.M12] = yAxis.z;
                val[webgl.M20] = -zAxis.x;
                val[webgl.M21] = -zAxis.y;
                val[webgl.M22] = -zAxis.z;
                Matrix4.tmpMatrix.identity();
                Matrix4.tmpMatrix.values[webgl.M03] = -position.x;
                Matrix4.tmpMatrix.values[webgl.M13] = -position.y;
                Matrix4.tmpMatrix.values[webgl.M23] = -position.z;
                this.multiply(Matrix4.tmpMatrix);
                return this;
            }
            static initTemps() {
                if (Matrix4.xAxis === null) {
                    Matrix4.xAxis = new webgl.Vector3();
                }
                if (Matrix4.yAxis === null) {
                    Matrix4.yAxis = new webgl.Vector3();
                }
                if (Matrix4.zAxis === null) {
                    Matrix4.zAxis = new webgl.Vector3();
                }
            }
        }
        Matrix4.xAxis = null;
        Matrix4.yAxis = null;
        Matrix4.zAxis = null;
        Matrix4.tmpMatrix = new Matrix4();
        webgl.Matrix4 = Matrix4;
    })(webgl = spine.webgl || (spine.webgl = {}));
})(spine || (spine = {}));
//# sourceMappingURL=Matrix4.js.map
var spine;
(function (spine) {
    var webgl;
    (function (webgl) {
        class LoadingScreen {
            constructor(renderer) {
                this.logo = null;
                this.spinner = null;
                this.angle = 0;
                this.fadeOut = 0;
                this.timeKeeper = new spine.TimeKeeper();
                this.backgroundColor = new spine.Color(0.135, 0.135, 0.135, 1);
                this.tempColor = new spine.Color();
                this.firstDraw = 0;
                this.renderer = renderer;
                this.timeKeeper.maxDelta = 9;
                if (LoadingScreen.logoImg === null) {
                    let isSafari = navigator.userAgent.indexOf("Safari") > -1;
                    LoadingScreen.logoImg = new Image();
                    LoadingScreen.logoImg.src = LoadingScreen.SPINE_LOGO_DATA;
                    if (!isSafari) {
                        LoadingScreen.logoImg.crossOrigin = "anonymous";
                    }
                    LoadingScreen.logoImg.onload = (ev) => {
                        LoadingScreen.loaded++;
                    };
                    LoadingScreen.spinnerImg = new Image();
                    LoadingScreen.spinnerImg.src = LoadingScreen.SPINNER_DATA;
                    if (!isSafari) {
                        LoadingScreen.spinnerImg.crossOrigin = "anonymous";
                    }
                    LoadingScreen.spinnerImg.onload = (ev) => {
                        LoadingScreen.loaded++;
                    };
                }
            }
            draw(complete = false) {
                if (complete && this.fadeOut > LoadingScreen.FADE_SECONDS) {
                    return;
                }
                this.timeKeeper.update();
                let a = Math.abs(Math.sin(this.timeKeeper.totalTime + 0.75));
                this.angle -= this.timeKeeper.delta * 360 * (1 + 1.5 * Math.pow(a, 5));
                let renderer = this.renderer;
                let canvas = renderer.canvas;
                let gl = renderer.context.gl;
                let oldX = renderer.camera.position.x, oldY = renderer.camera.position.y;
                renderer.camera.position.set(canvas.width / 2, canvas.height / 2, 0);
                renderer.camera.viewportWidth = canvas.width;
                renderer.camera.viewportHeight = canvas.height;
                renderer.resize(webgl.ResizeMode.Stretch);
                if (!complete) {
                    gl.clearColor(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, this.backgroundColor.a);
                    gl.clear(gl.COLOR_BUFFER_BIT);
                    this.tempColor.a = 1;
                }
                else {
                    this.fadeOut += this.timeKeeper.delta * (this.timeKeeper.totalTime < 1 ? 2 : 1);
                    if (this.fadeOut > LoadingScreen.FADE_SECONDS) {
                        renderer.camera.position.set(oldX, oldY, 0);
                        return;
                    }
                    a = 1 - this.fadeOut / LoadingScreen.FADE_SECONDS;
                    this.tempColor.setFromColor(this.backgroundColor);
                    this.tempColor.a = 1 - (a - 1) * (a - 1);
                    renderer.begin();
                    renderer.quad(true, 0, 0, canvas.width, 0, canvas.width, canvas.height, 0, canvas.height, this.tempColor, this.tempColor, this.tempColor, this.tempColor);
                    renderer.end();
                }
                this.tempColor.set(1, 1, 1, this.tempColor.a);
                if (LoadingScreen.loaded != 2) {
                    return;
                }
                if (this.logo === null) {
                    this.logo = new webgl.GLTexture(renderer.context, LoadingScreen.logoImg);
                    this.spinner = new webgl.GLTexture(renderer.context, LoadingScreen.spinnerImg);
                }
                this.logo.update(false);
                this.spinner.update(false);
                let logoWidth = this.logo.getImage().width;
                let logoHeight = this.logo.getImage().height;
                let spinnerWidth = this.spinner.getImage().width;
                let spinnerHeight = this.spinner.getImage().height;
                renderer.batcher.setBlendMode(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                renderer.begin();
                renderer.drawTexture(this.logo, (canvas.width - logoWidth) / 2, (canvas.height - logoHeight) / 2, logoWidth, logoHeight, this.tempColor);
                renderer.drawTextureRotated(this.spinner, (canvas.width - spinnerWidth) / 2, (canvas.height - spinnerHeight) / 2, spinnerWidth, spinnerHeight, spinnerWidth / 2, spinnerHeight / 2, this.angle, this.tempColor);
                renderer.end();
                renderer.camera.position.set(oldX, oldY, 0);
            }
        }
        LoadingScreen.FADE_SECONDS = 1;
        LoadingScreen.loaded = 0;
        LoadingScreen.spinnerImg = null;
        LoadingScreen.logoImg = null;
        LoadingScreen.SPINNER_DATA = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAChCAMAAAB3TUS6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAYNQTFRFAAAA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AA/0AAkTDRyAAAAIB0Uk5TAAABAgMEBQYHCAkKCwwODxAREhMUFRYXGBkaHB0eICEiIyQlJicoKSorLC0uLzAxMjM0Nzg5Ojs8PT4/QEFDRUlKS0xNTk9QUlRWWFlbXF1eYWJjZmhscHF0d3h5e3x+f4CIiYuMj5GSlJWXm56io6arr7rAxcjO0dXe6Onr8fmb5sOOAAADuElEQVQYGe3B+3vTVBwH4M/3nCRt13br2Lozhug2q25gYQubcxqVKYoMCYoKjEsUdSpeiBc0Kl7yp9t2za39pely7PF5zvuiQKc+/e2f8K+f9g2oyQ77Ag4VGX+HketQ0XYYe0JQ0CdhogwF+WFiBgr6JkxUoKCDMMGgoP0w9gdUtB3GfoCKVsPYAVQ0H8YuQUWVMHYGKuJhrAklPQkjJpT0bdj3O9S0FfZ9ADXxP8MjVSiqFfa8B2VVV8+df14QtB4iwn+BpuZEgyM38WMQHDYhnbkgukrIh5ygZ48glyn6KshlL+jbhVRcxCzk0ApiC5CI5kVsgTAy9jiI/WxBGmqIFBMjqwYphwRZaiLNwsjqQdoVSFISGRwjM4OMFUjBRcYCYWT0XZD2SwUS0LzIKCGH2SDja0LxKiJjCrm0gowVFI6aIs1CTouPg5QvUTgSKXMMuVUeBSmEopFITBPGwO8HCYbCTYtImTAWejuI3CMUjmZFT5NjbM/9GvQcMkhADdFRIxxD7aug4wGDFGSVTcLx0MzutQ2CpmmapmmapmmapmmapmmaphWBmGFV6rNNcaLC0GUuv3LROftUo8wJk0a10207sVED6IIf+9673LIwQeW2PaCEJX/A+xYmhTbtQUu46g96SJgQZg9Zwxf+EAMTwuwhm3jkD7EwIdweBn+YhQlh9pA2HvpDTEwIs4es4GN/CMekNOxBJ9D2B10nTAyfW7fT1hjYgZ/xYIUwUcycaiwuv2h3tOcZADr7ud/12c0ru2cWSwQ1UAcixIgImqZpmqZpmqZpmqZpmqZp2v8HMSIcF186t8oghbnlOJt1wnHwl7yOGxwSlHacrjWG8dVuej03OApn7jhHtiyMiZa9yD6haLYTebWOsbDXvQRHwchJWSTkV/rQS+EoWttJaTHkJe56KXcJRZt20jY48nnBy9hE4WjLSbvAkIfwMm5zFG/KyWgRRke3vYwGZDjpZHCMruJltCAFrTtpVYxu1ktzCHKwbSdlGqOreynXGGQpOylljI5uebFbBuSZc2IbhBxmvcj9GiSiZ52+HQO5nPb6TkIqajs9L5eQk7jnddxZgGT0jNOxYSI36+Kdj9oG5OPV6QpB6yJuGAYnqIrecLveYlDUKffIOtREl90+BiWV3cgMlNR0I09DSS030oaSttzILpT0phu5BBWRmyAoiLkJgoIMN8GgoJKb4FBQzU0YUFDdTRhQUNVNcCjIdBMEBdE7buQ8lFRz+97lUFN5fe+qu//aMkeB/gU2ae9y2HgbngAAAABJRU5ErkJggg==";
        LoadingScreen.SPINE_LOGO_DATA = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAAAZCAYAAACis3k0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAtNJREFUaN7tmT2I1EAUxwN+oWgRT0HFKo0WCkJ6ObmAWFwZbCxsXGysLNJaiCyIoDaSwk4ETzvhmnBaCRbBWoQ01ho4PwotjP8cE337mMy8TLK757mBH3fLTWbe/PbN53neNniqZW8FvAVvQAqugwvgDDgO9niLRyTyJagM/ACPF6bsIl9ZRDac/Cc6tLn5xQdRQ496QlKPLxD5QCDxO9jtGM8QfYoIgUlgCipGCRJL5VvlyOdCU09iEXkCfLSIfCrs7Fab6nOsiafu06iDwES9w/uU1QnDC+ekkVS9vEaDsgVeB0d+z1VDtOGxRaYPboP3Gokb4GgXkZp4chZPJKgvZ3U0XkriK/TIt9YUDllFgTAjGwoaoHqfBhMI58yD4BQ4V6/aHYdfxToftvw9F2SiVroawU2/Cv5C4Thv0KB9S5nxlOd4STxjwUjzSdYlgrYijw2BsEfgsaFcM09lhiys94xXQQwugcvgJrgFLjrEE7WUiTuWCQzt/ZXN7FfqGwuGClyVy2xZAFmfDQvNtwFFSspMDGsD+UTWqu1KoVmVooFEJgKRXw0if85RpISEzwsjzeqWzkjkC4PIJ3MUmQgITAHlQwTFhnZhELkEntfZRwR+AvfAgXmJHOqU02XligWT8ppg67NXbdCXeq7afUQ6L8C2DalEZNt2YyQ94Qy8/ekjMpBMbfyl5iTjG7YAI8cNecROAb4kJmTjaXAF3AGvwQewOiuRxEtlSaT4j2h2lMsUueQEoMlIKpTvAmKhxPMtC876jEX6rE8l8TNx/KVbn6xlWU9NWcSDUsO4NGWpQOTZFpHPOooMXcswmW2XFk3ixb2v0Nq+XVKP00QNaffBLyWwBI/AkTlfMYZDXMf12kc6yjwEjoFdO/5me5oi/6tnyhlZX6OtgmX1c2Uh0k3khmbB2b9TRfpd/jfTUeRDJvHdYg5wE7kPXAN3wQ1weDvH+xufEgpi5qIl3QAAAABJRU5ErkJggg==";
        webgl.LoadingScreen = LoadingScreen;
    })(webgl = spine.webgl || (spine.webgl = {}));
})(spine || (spine = {}));
//# sourceMappingURL=LoadingScreen.js.map
var spine;
(function (spine) {
    var webgl;
    (function (webgl) {
        class Input {
            constructor(element) {
                this.lastX = 0;
                this.lastY = 0;
                this.buttonDown = false;
                this.currTouch = null;
                this.touchesPool = new spine.Pool(() => {
                    return new spine.webgl.Touch(0, 0, 0);
                });
                this.listeners = new Array();
                this.element = element;
                this.setupCallbacks(element);
            }
            setupCallbacks(element) {
                element.addEventListener("mousedown", (ev) => {
                    if (ev instanceof MouseEvent) {
                        let rect = element.getBoundingClientRect();
                        let x = ev.clientX - rect.left;
                        let y = ev.clientY - rect.top;
                        let listeners = this.listeners;
                        for (let i = 0; i < listeners.length; i++) {
                            listeners[i].down(x, y);
                        }
                        this.lastX = x;
                        this.lastY = y;
                        this.buttonDown = true;
                    }
                }, true);
                element.addEventListener("mousemove", (ev) => {
                    if (ev instanceof MouseEvent) {
                        let rect = element.getBoundingClientRect();
                        let x = ev.clientX - rect.left;
                        let y = ev.clientY - rect.top;
                        let listeners = this.listeners;
                        for (let i = 0; i < listeners.length; i++) {
                            if (this.buttonDown) {
                                listeners[i].dragged(x, y);
                            }
                            else {
                                listeners[i].moved(x, y);
                            }
                        }
                        this.lastX = x;
                        this.lastY = y;
                    }
                }, true);
                element.addEventListener("mouseup", (ev) => {
                    if (ev instanceof MouseEvent) {
                        let rect = element.getBoundingClientRect();
                        let x = ev.clientX - rect.left;
                        let y = ev.clientY - rect.top;
                        let listeners = this.listeners;
                        for (let i = 0; i < listeners.length; i++) {
                            listeners[i].up(x, y);
                        }
                        this.lastX = x;
                        this.lastY = y;
                        this.buttonDown = false;
                    }
                }, true);
                element.addEventListener("touchstart", (ev) => {
                    if (this.currTouch != null) {
                        return;
                    }
                    var touches = ev.changedTouches;
                    for (var i = 0; i < touches.length; i++) {
                        var touch = touches[i];
                        let rect = element.getBoundingClientRect();
                        let x = touch.clientX - rect.left;
                        let y = touch.clientY - rect.top;
                        this.currTouch = this.touchesPool.obtain();
                        this.currTouch.identifier = touch.identifier;
                        this.currTouch.x = x;
                        this.currTouch.y = y;
                        break;
                    }
                    let listeners = this.listeners;
                    for (let i = 0; i < listeners.length; i++) {
                        listeners[i].down(this.currTouch.x, this.currTouch.y);
                    }
                    this.lastX = this.currTouch.x;
                    this.lastY = this.currTouch.y;
                    this.buttonDown = true;
                    ev.preventDefault();
                }, false);
                element.addEventListener("touchend", (ev) => {
                    var touches = ev.changedTouches;
                    for (var i = 0; i < touches.length; i++) {
                        var touch = touches[i];
                        if (this.currTouch.identifier === touch.identifier) {
                            let rect = element.getBoundingClientRect();
                            let x = this.currTouch.x = touch.clientX - rect.left;
                            let y = this.currTouch.y = touch.clientY - rect.top;
                            this.touchesPool.free(this.currTouch);
                            let listeners = this.listeners;
                            for (let i = 0; i < listeners.length; i++) {
                                listeners[i].up(x, y);
                            }
                            this.lastX = x;
                            this.lastY = y;
                            this.buttonDown = false;
                            this.currTouch = null;
                            break;
                        }
                    }
                    ev.preventDefault();
                }, false);
                element.addEventListener("touchcancel", (ev) => {
                    var touches = ev.changedTouches;
                    for (var i = 0; i < touches.length; i++) {
                        var touch = touches[i];
                        if (this.currTouch.identifier === touch.identifier) {
                            let rect = element.getBoundingClientRect();
                            let x = this.currTouch.x = touch.clientX - rect.left;
                            let y = this.currTouch.y = touch.clientY - rect.top;
                            this.touchesPool.free(this.currTouch);
                            let listeners = this.listeners;
                            for (let i = 0; i < listeners.length; i++) {
                                listeners[i].up(x, y);
                            }
                            this.lastX = x;
                            this.lastY = y;
                            this.buttonDown = false;
                            this.currTouch = null;
                            break;
                        }
                    }
                    ev.preventDefault();
                }, false);
                element.addEventListener("touchmove", (ev) => {
                    if (this.currTouch == null) {
                        return;
                    }
                    var touches = ev.changedTouches;
                    for (var i = 0; i < touches.length; i++) {
                        var touch = touches[i];
                        if (this.currTouch.identifier === touch.identifier) {
                            let rect = element.getBoundingClientRect();
                            let x = touch.clientX - rect.left;
                            let y = touch.clientY - rect.top;
                            let listeners = this.listeners;
                            for (let i = 0; i < listeners.length; i++) {
                                listeners[i].dragged(x, y);
                            }
                            ("Drag " + x + ", " + y);
                            this.lastX = this.currTouch.x = x;
                            this.lastY = this.currTouch.y = y;
                            break;
                        }
                    }
                    ev.preventDefault();
                }, false);
            }
            addListener(listener) {
                this.listeners.push(listener);
            }
            removeListener(listener) {
                let idx = this.listeners.indexOf(listener);
                if (idx > -1) {
                    this.listeners.splice(idx, 1);
                }
            }
        }
        webgl.Input = Input;
        class Touch {
            constructor(identifier, x, y) {
                this.identifier = identifier;
                this.x = x;
                this.y = y;
            }
        }
        webgl.Touch = Touch;
    })(webgl = spine.webgl || (spine.webgl = {}));
})(spine || (spine = {}));
//# sourceMappingURL=Input.js.map
var spine;
(function (spine) {
    var webgl;
    (function (webgl) {
        class OrthoCamera {
            constructor(viewportWidth, viewportHeight) {
                this.position = new webgl.Vector3(0, 0, 0);
                this.direction = new webgl.Vector3(0, 0, -1);
                this.up = new webgl.Vector3(0, 1, 0);
                this.near = 0;
                this.far = 100;
                this.zoom = 1;
                this.viewportWidth = 0;
                this.viewportHeight = 0;
                this.projectionView = new webgl.Matrix4();
                this.inverseProjectionView = new webgl.Matrix4();
                this.projection = new webgl.Matrix4();
                this.view = new webgl.Matrix4();
                this.tmp = new webgl.Vector3();
                this.viewportWidth = viewportWidth;
                this.viewportHeight = viewportHeight;
                this.update();
            }
            update() {
                let projection = this.projection;
                let view = this.view;
                let projectionView = this.projectionView;
                let inverseProjectionView = this.inverseProjectionView;
                let zoom = this.zoom, viewportWidth = this.viewportWidth, viewportHeight = this.viewportHeight;
                projection.ortho(zoom * (-viewportWidth / 2), zoom * (viewportWidth / 2), zoom * (-viewportHeight / 2), zoom * (viewportHeight / 2), this.near, this.far);
                view.lookAt(this.position, this.direction, this.up);
                projectionView.set(projection.values);
                projectionView.multiply(view);
                inverseProjectionView.set(projectionView.values).invert();
            }
            screenToWorld(screenCoords, screenWidth, screenHeight) {
                let x = screenCoords.x, y = screenHeight - screenCoords.y - 1;
                let tmp = this.tmp;
                tmp.x = (2 * x) / screenWidth - 1;
                tmp.y = (2 * y) / screenHeight - 1;
                tmp.z = (2 * screenCoords.z) - 1;
                tmp.project(this.inverseProjectionView);
                screenCoords.set(tmp.x, tmp.y, tmp.z);
                return screenCoords;
            }
            setViewport(viewportWidth, viewportHeight) {
                this.viewportWidth = viewportWidth;
                this.viewportHeight = viewportHeight;
            }
        }
        webgl.OrthoCamera = OrthoCamera;
    })(webgl = spine.webgl || (spine.webgl = {}));
})(spine || (spine = {}));
//# sourceMappingURL=Camera.js.map
//# sourceMappingURL=VertexEffect.js.map
//# sourceMappingURL=Updatable.js.map
var spine;
(function (spine) {
    class Triangulator {
        constructor() {
            this.convexPolygons = new Array();
            this.convexPolygonsIndices = new Array();
            this.indicesArray = new Array();
            this.isConcaveArray = new Array();
            this.triangles = new Array();
            this.polygonPool = new spine.Pool(() => {
                return new Array();
            });
            this.polygonIndicesPool = new spine.Pool(() => {
                return new Array();
            });
        }
        triangulate(verticesArray) {
            let vertices = verticesArray;
            let vertexCount = verticesArray.length >> 1;
            let indices = this.indicesArray;
            indices.length = 0;
            for (let i = 0; i < vertexCount; i++) {
                indices[i] = i;
            }
            let isConcave = this.isConcaveArray;
            isConcave.length = 0;
            for (let i = 0, n = vertexCount; i < n; ++i) {
                isConcave[i] = Triangulator.isConcave(i, vertexCount, vertices, indices);
            }
            let triangles = this.triangles;
            triangles.length = 0;
            while (vertexCount > 3) {
                let previous = vertexCount - 1, i = 0, next = 1;
                while (true) {
                    outer: if (!isConcave[i]) {
                        let p1 = indices[previous] << 1, p2 = indices[i] << 1, p3 = indices[next] << 1;
                        let p1x = vertices[p1], p1y = vertices[p1 + 1];
                        let p2x = vertices[p2], p2y = vertices[p2 + 1];
                        let p3x = vertices[p3], p3y = vertices[p3 + 1];
                        for (let ii = (next + 1) % vertexCount; ii != previous; ii = (ii + 1) % vertexCount) {
                            if (!isConcave[ii]) {
                                continue;
                            }
                            let v = indices[ii] << 1;
                            let vx = vertices[v], vy = vertices[v + 1];
                            if (Triangulator.positiveArea(p3x, p3y, p1x, p1y, vx, vy)) {
                                if (Triangulator.positiveArea(p1x, p1y, p2x, p2y, vx, vy)) {
                                    if (Triangulator.positiveArea(p2x, p2y, p3x, p3y, vx, vy)) {
                                        break outer;
                                    }
                                }
                            }
                        }
                        break;
                    }
                    if (next == 0) {
                        do {
                            if (!isConcave[i]) {
                                break;
                            }
                            i--;
                        } while (i > 0);
                        break;
                    }
                    previous = i;
                    i = next;
                    next = (next + 1) % vertexCount;
                }
                triangles.push(indices[(vertexCount + i - 1) % vertexCount]);
                triangles.push(indices[i]);
                triangles.push(indices[(i + 1) % vertexCount]);
                indices.splice(i, 1);
                isConcave.splice(i, 1);
                vertexCount--;
                let previousIndex = (vertexCount + i - 1) % vertexCount;
                let nextIndex = i == vertexCount ? 0 : i;
                isConcave[previousIndex] = Triangulator.isConcave(previousIndex, vertexCount, vertices, indices);
                isConcave[nextIndex] = Triangulator.isConcave(nextIndex, vertexCount, vertices, indices);
            }
            if (vertexCount == 3) {
                triangles.push(indices[2]);
                triangles.push(indices[0]);
                triangles.push(indices[1]);
            }
            return triangles;
        }
        decompose(verticesArray, triangles) {
            let vertices = verticesArray;
            let convexPolygons = this.convexPolygons;
            this.polygonPool.freeAll(convexPolygons);
            convexPolygons.length = 0;
            let convexPolygonsIndices = this.convexPolygonsIndices;
            this.polygonIndicesPool.freeAll(convexPolygonsIndices);
            convexPolygonsIndices.length = 0;
            let polygonIndices = this.polygonIndicesPool.obtain();
            polygonIndices.length = 0;
            let polygon = this.polygonPool.obtain();
            polygon.length = 0;
            let fanBaseIndex = -1, lastWinding = 0;
            for (let i = 0, n = triangles.length; i < n; i += 3) {
                let t1 = triangles[i] << 1, t2 = triangles[i + 1] << 1, t3 = triangles[i + 2] << 1;
                let x1 = vertices[t1], y1 = vertices[t1 + 1];
                let x2 = vertices[t2], y2 = vertices[t2 + 1];
                let x3 = vertices[t3], y3 = vertices[t3 + 1];
                let merged = false;
                if (fanBaseIndex == t1) {
                    let o = polygon.length - 4;
                    let winding1 = Triangulator.winding(polygon[o], polygon[o + 1], polygon[o + 2], polygon[o + 3], x3, y3);
                    let winding2 = Triangulator.winding(x3, y3, polygon[0], polygon[1], polygon[2], polygon[3]);
                    if (winding1 == lastWinding && winding2 == lastWinding) {
                        polygon.push(x3);
                        polygon.push(y3);
                        polygonIndices.push(t3);
                        merged = true;
                    }
                }
                if (!merged) {
                    if (polygon.length > 0) {
                        convexPolygons.push(polygon);
                        convexPolygonsIndices.push(polygonIndices);
                    }
                    else {
                        this.polygonPool.free(polygon);
                        this.polygonIndicesPool.free(polygonIndices);
                    }
                    polygon = this.polygonPool.obtain();
                    polygon.length = 0;
                    polygon.push(x1);
                    polygon.push(y1);
                    polygon.push(x2);
                    polygon.push(y2);
                    polygon.push(x3);
                    polygon.push(y3);
                    polygonIndices = this.polygonIndicesPool.obtain();
                    polygonIndices.length = 0;
                    polygonIndices.push(t1);
                    polygonIndices.push(t2);
                    polygonIndices.push(t3);
                    lastWinding = Triangulator.winding(x1, y1, x2, y2, x3, y3);
                    fanBaseIndex = t1;
                }
            }
            if (polygon.length > 0) {
                convexPolygons.push(polygon);
                convexPolygonsIndices.push(polygonIndices);
            }
            for (let i = 0, n = convexPolygons.length; i < n; i++) {
                polygonIndices = convexPolygonsIndices[i];
                if (polygonIndices.length == 0) {
                    continue;
                }
                let firstIndex = polygonIndices[0];
                let lastIndex = polygonIndices[polygonIndices.length - 1];
                polygon = convexPolygons[i];
                let o = polygon.length - 4;
                let prevPrevX = polygon[o], prevPrevY = polygon[o + 1];
                let prevX = polygon[o + 2], prevY = polygon[o + 3];
                let firstX = polygon[0], firstY = polygon[1];
                let secondX = polygon[2], secondY = polygon[3];
                let winding = Triangulator.winding(prevPrevX, prevPrevY, prevX, prevY, firstX, firstY);
                for (let ii = 0; ii < n; ii++) {
                    if (ii == i) {
                        continue;
                    }
                    let otherIndices = convexPolygonsIndices[ii];
                    if (otherIndices.length != 3) {
                        continue;
                    }
                    let otherFirstIndex = otherIndices[0];
                    let otherSecondIndex = otherIndices[1];
                    let otherLastIndex = otherIndices[2];
                    let otherPoly = convexPolygons[ii];
                    let x3 = otherPoly[otherPoly.length - 2], y3 = otherPoly[otherPoly.length - 1];
                    if (otherFirstIndex != firstIndex || otherSecondIndex != lastIndex) {
                        continue;
                    }
                    let winding1 = Triangulator.winding(prevPrevX, prevPrevY, prevX, prevY, x3, y3);
                    let winding2 = Triangulator.winding(x3, y3, firstX, firstY, secondX, secondY);
                    if (winding1 == winding && winding2 == winding) {
                        otherPoly.length = 0;
                        otherIndices.length = 0;
                        polygon.push(x3);
                        polygon.push(y3);
                        polygonIndices.push(otherLastIndex);
                        prevPrevX = prevX;
                        prevPrevY = prevY;
                        prevX = x3;
                        prevY = y3;
                        ii = 0;
                    }
                }
            }
            for (let i = convexPolygons.length - 1; i >= 0; i--) {
                polygon = convexPolygons[i];
                if (polygon.length == 0) {
                    convexPolygons.splice(i, 1);
                    this.polygonPool.free(polygon);
                    polygonIndices = convexPolygonsIndices[i];
                    convexPolygonsIndices.splice(i, 1);
                    this.polygonIndicesPool.free(polygonIndices);
                }
            }
            return convexPolygons;
        }
        static isConcave(index, vertexCount, vertices, indices) {
            let previous = indices[(vertexCount + index - 1) % vertexCount] << 1;
            let current = indices[index] << 1;
            let next = indices[(index + 1) % vertexCount] << 1;
            return !this.positiveArea(vertices[previous], vertices[previous + 1], vertices[current], vertices[current + 1], vertices[next], vertices[next + 1]);
        }
        static positiveArea(p1x, p1y, p2x, p2y, p3x, p3y) {
            return p1x * (p3y - p2y) + p2x * (p1y - p3y) + p3x * (p2y - p1y) >= 0;
        }
        static winding(p1x, p1y, p2x, p2y, p3x, p3y) {
            let px = p2x - p1x, py = p2y - p1y;
            return p3x * py - p3y * px + px * p1y - p1x * py >= 0 ? 1 : -1;
        }
    }
    spine.Triangulator = Triangulator;
})(spine || (spine = {}));
//# sourceMappingURL=Triangulator.js.map
var spine;
(function (spine) {
    class SlotData {
        constructor(index, name, boneData) {
            this.color = new spine.Color(1, 1, 1, 1);
            if (index < 0) {
                throw new Error("index must be >= 0.");
            }
            if (name == null) {
                throw new Error("name cannot be null.");
            }
            if (boneData == null) {
                throw new Error("boneData cannot be null.");
            }
            this.index = index;
            this.name = name;
            this.boneData = boneData;
        }
    }
    spine.SlotData = SlotData;
})(spine || (spine = {}));
//# sourceMappingURL=SlotData.js.map
var spine;
(function (spine) {
    class Slot {
        constructor(data, bone) {
            this.attachmentVertices = new Array();
            if (data == null) {
                throw new Error("data cannot be null.");
            }
            if (bone == null) {
                throw new Error("bone cannot be null.");
            }
            this.data = data;
            this.bone = bone;
            this.color = new spine.Color();
            this.darkColor = data.darkColor == null ? null : new spine.Color();
            this.setToSetupPose();
        }
        getAttachment() {
            return this.attachment;
        }
        setAttachment(attachment) {
            if (this.attachment == attachment) {
                return;
            }
            this.attachment = attachment;
            this.attachmentTime = this.bone.skeleton.time;
            this.attachmentVertices.length = 0;
        }
        setAttachmentTime(time) {
            this.attachmentTime = this.bone.skeleton.time - time;
        }
        getAttachmentTime() {
            return this.bone.skeleton.time - this.attachmentTime;
        }
        setToSetupPose() {
            this.color.setFromColor(this.data.color);
            if (this.darkColor != null) {
                this.darkColor.setFromColor(this.data.darkColor);
            }
            if (this.data.attachmentName == null) {
                this.attachment = null;
            }
            else {
                this.attachment = null;
                this.setAttachment(this.bone.skeleton.getAttachment(this.data.index, this.data.attachmentName));
            }
        }
    }
    spine.Slot = Slot;
})(spine || (spine = {}));
//# sourceMappingURL=Slot.js.map
var spine;
(function (spine) {
    class Skin {
        constructor(name) {
            this.attachments = new Array();
            if (name == null) {
                throw new Error("name cannot be null.");
            }
            this.name = name;
        }
        addAttachment(slotIndex, name, attachment) {
            if (attachment == null) {
                throw new Error("attachment cannot be null.");
            }
            let attachments = this.attachments;
            if (slotIndex >= attachments.length) {
                attachments.length = slotIndex + 1;
            }
            if (!attachments[slotIndex]) {
                attachments[slotIndex] = {};
            }
            attachments[slotIndex][name] = attachment;
        }
        getAttachment(slotIndex, name) {
            let dictionary = this.attachments[slotIndex];
            return dictionary ? dictionary[name] : null;
        }
        attachAll(skeleton, oldSkin) {
            let slotIndex = 0;
            for (let i = 0; i < skeleton.slots.length; i++) {
                let slot = skeleton.slots[i];
                let slotAttachment = slot.getAttachment();
                if (slotAttachment && slotIndex < oldSkin.attachments.length) {
                    let dictionary = oldSkin.attachments[slotIndex];
                    for (let key in dictionary) {
                        let skinAttachment = dictionary[key];
                        if (slotAttachment == skinAttachment) {
                            let attachment = this.getAttachment(slotIndex, key);
                            if (attachment != null) {
                                slot.setAttachment(attachment);
                            }
                            break;
                        }
                    }
                }
                slotIndex++;
            }
        }
    }
    spine.Skin = Skin;
})(spine || (spine = {}));
//# sourceMappingURL=Skin.js.map
var spine;
(function (spine) {
    let BlendMode;
    (function (BlendMode) {
        BlendMode[BlendMode["Normal"] = 0] = "Normal";
        BlendMode[BlendMode["Additive"] = 1] = "Additive";
        BlendMode[BlendMode["Multiply"] = 2] = "Multiply";
        BlendMode[BlendMode["Screen"] = 3] = "Screen";
    })(BlendMode = spine.BlendMode || (spine.BlendMode = {}));
})(spine || (spine = {}));
//# sourceMappingURL=BlendMode.js.map
var spine;
(function (spine) {
    class BoneData {
        constructor(index, name, parent) {
            this.x = 0;
            this.y = 0;
            this.rotation = 0;
            this.scaleX = 1;
            this.scaleY = 1;
            this.shearX = 0;
            this.shearY = 0;
            this.transformMode = TransformMode.Normal;
            this.color = new spine.Color();
            if (index < 0) {
                throw new Error("index must be >= 0.");
            }
            if (name == null) {
                throw new Error("name cannot be null.");
            }
            this.index = index;
            this.name = name;
            this.parent = parent;
        }
    }
    spine.BoneData = BoneData;
    let TransformMode;
    (function (TransformMode) {
        TransformMode[TransformMode["Normal"] = 0] = "Normal";
        TransformMode[TransformMode["OnlyTranslation"] = 1] = "OnlyTranslation";
        TransformMode[TransformMode["NoRotationOrReflection"] = 2] = "NoRotationOrReflection";
        TransformMode[TransformMode["NoScale"] = 3] = "NoScale";
        TransformMode[TransformMode["NoScaleOrReflection"] = 4] = "NoScaleOrReflection";
    })(TransformMode = spine.TransformMode || (spine.TransformMode = {}));
})(spine || (spine = {}));
//# sourceMappingURL=BoneData.js.map
var spine;
(function (spine) {
    class PathConstraintData {
        constructor(name) {
            this.order = 0;
            this.bones = new Array();
            this.name = name;
        }
    }
    spine.PathConstraintData = PathConstraintData;
    let PositionMode;
    (function (PositionMode) {
        PositionMode[PositionMode["Fixed"] = 0] = "Fixed";
        PositionMode[PositionMode["Percent"] = 1] = "Percent";
    })(PositionMode = spine.PositionMode || (spine.PositionMode = {}));
    let SpacingMode;
    (function (SpacingMode) {
        SpacingMode[SpacingMode["Length"] = 0] = "Length";
        SpacingMode[SpacingMode["Fixed"] = 1] = "Fixed";
        SpacingMode[SpacingMode["Percent"] = 2] = "Percent";
    })(SpacingMode = spine.SpacingMode || (spine.SpacingMode = {}));
    let RotateMode;
    (function (RotateMode) {
        RotateMode[RotateMode["Tangent"] = 0] = "Tangent";
        RotateMode[RotateMode["Chain"] = 1] = "Chain";
        RotateMode[RotateMode["ChainScale"] = 2] = "ChainScale";
    })(RotateMode = spine.RotateMode || (spine.RotateMode = {}));
})(spine || (spine = {}));
//# sourceMappingURL=PathConstraintData.js.map
var spine;
(function (spine) {
    class SkeletonJson {
        constructor(attachmentLoader) {
            this.scale = 1;
            this.linkedMeshes = new Array();
            this.attachmentLoader = attachmentLoader;
        }
        readSkeletonData(json) {
            let scale = this.scale;
            let skeletonData = new spine.SkeletonData();
            let root = typeof (json) === "string" ? JSON.parse(json) : json;
            let skeletonMap = root.skeleton;
            if (skeletonMap != null) {
                skeletonData.hash = skeletonMap.hash;
                skeletonData.version = skeletonMap.spine;
                skeletonData.width = skeletonMap.width;
                skeletonData.height = skeletonMap.height;
                skeletonData.fps = skeletonMap.fps;
                skeletonData.imagesPath = skeletonMap.images;
            }
            if (root.bones) {
                for (let i = 0; i < root.bones.length; i++) {
                    let boneMap = root.bones[i];
                    let parent = null;
                    let parentName = this.getValue(boneMap, "parent", null);
                    if (parentName != null) {
                        parent = skeletonData.findBone(parentName);
                        if (parent == null) {
                            throw new Error("Parent bone not found: " + parentName);
                        }
                    }
                    let data = new spine.BoneData(skeletonData.bones.length, boneMap.name, parent);
                    data.length = this.getValue(boneMap, "length", 0) * scale * 1;
                    data.x = this.getValue(boneMap, "x", 0) * scale * 1;
                    data.y = this.getValue(boneMap, "y", 0) * scale * 1;
                    data.rotation = this.getValue(boneMap, "rotation", 0) * 1;
                    data.scaleX = this.getValue(boneMap, "scaleX", 1) * 1;
                    data.scaleY = this.getValue(boneMap, "scaleY", 1) * 1;
                    data.shearX = this.getValue(boneMap, "shearX", 0) * 1;
                    data.shearY = this.getValue(boneMap, "shearY", 0) * 1;
                    data.transformMode = SkeletonJson.transformModeFromString(this.getValue(boneMap, "transform", "normal"));
                    skeletonData.bones.push(data);
                }
            }
            if (root.slots) {
                for (let i = 0; i < root.slots.length; i++) {
                    let slotMap = root.slots[i];
                    let slotName = slotMap.name;
                    let boneName = slotMap.bone;
                    let boneData = skeletonData.findBone(boneName);
                    if (boneData == null) {
                        throw new Error("Slot bone not found: " + boneName);
                    }
                    let data = new spine.SlotData(skeletonData.slots.length, slotName, boneData);
                    let color = this.getValue(slotMap, "color", null);
                    if (color != null) {
                        data.color.setFromString(color);
                    }
                    let dark = this.getValue(slotMap, "dark", null);
                    if (dark != null) {
                        data.darkColor = new spine.Color(1, 1, 1, 1);
                        data.darkColor.setFromString(dark);
                    }
                    data.attachmentName = this.getValue(slotMap, "attachment", null);
                    data.blendMode = SkeletonJson.blendModeFromString(this.getValue(slotMap, "blend", "normal"));
                    skeletonData.slots.push(data);
                }
            }
            if (root.ik) {
                for (let i = 0; i < root.ik.length; i++) {
                    let constraintMap = root.ik[i];
                    let data = new spine.IkConstraintData(constraintMap.name);
                    data.order = this.getValue(constraintMap, "order", 0);
                    for (let j = 0; j < constraintMap.bones.length; j++) {
                        let boneName = constraintMap.bones[j];
                        let bone = skeletonData.findBone(boneName);
                        if (bone == null) {
                            throw new Error("IK bone not found: " + boneName);
                        }
                        data.bones.push(bone);
                    }
                    let targetName = constraintMap.target;
                    data.target = skeletonData.findBone(targetName);
                    if (data.target == null) {
                        throw new Error("IK target bone not found: " + targetName);
                    }
                    data.bendDirection = this.getValue(constraintMap, "bendPositive", true) ? 1 : -1;
                    data.mix = this.getValue(constraintMap, "mix", 1);
                    skeletonData.ikConstraints.push(data);
                }
            }
            if (root.transform) {
                for (let i = 0; i < root.transform.length; i++) {
                    let constraintMap = root.transform[i];
                    let data = new spine.TransformConstraintData(constraintMap.name);
                    data.order = this.getValue(constraintMap, "order", 0);
                    for (let j = 0; j < constraintMap.bones.length; j++) {
                        let boneName = constraintMap.bones[j];
                        let bone = skeletonData.findBone(boneName);
                        if (bone == null) {
                            throw new Error("Transform constraint bone not found: " + boneName);
                        }
                        data.bones.push(bone);
                    }
                    let targetName = constraintMap.target;
                    data.target = skeletonData.findBone(targetName);
                    if (data.target == null) {
                        throw new Error("Transform constraint target bone not found: " + targetName);
                    }
                    data.local = this.getValue(constraintMap, "local", false);
                    data.relative = this.getValue(constraintMap, "relative", false);
                    data.offsetRotation = this.getValue(constraintMap, "rotation", 0);
                    data.offsetX = this.getValue(constraintMap, "x", 0) * scale;
                    data.offsetY = this.getValue(constraintMap, "y", 0) * scale;
                    data.offsetScaleX = this.getValue(constraintMap, "scaleX", 0);
                    data.offsetScaleY = this.getValue(constraintMap, "scaleY", 0);
                    data.offsetShearY = this.getValue(constraintMap, "shearY", 0);
                    data.rotateMix = this.getValue(constraintMap, "rotateMix", 1);
                    data.translateMix = this.getValue(constraintMap, "translateMix", 1);
                    data.scaleMix = this.getValue(constraintMap, "scaleMix", 1);
                    data.shearMix = this.getValue(constraintMap, "shearMix", 1);
                    skeletonData.transformConstraints.push(data);
                }
            }
            if (root.path) {
                for (let i = 0; i < root.path.length; i++) {
                    let constraintMap = root.path[i];
                    let data = new spine.PathConstraintData(constraintMap.name);
                    data.order = this.getValue(constraintMap, "order", 0);
                    for (let j = 0; j < constraintMap.bones.length; j++) {
                        let boneName = constraintMap.bones[j];
                        let bone = skeletonData.findBone(boneName);
                        if (bone == null) {
                            throw new Error("Transform constraint bone not found: " + boneName);
                        }
                        data.bones.push(bone);
                    }
                    let targetName = constraintMap.target;
                    data.target = skeletonData.findSlot(targetName);
                    if (data.target == null) {
                        throw new Error("Path target slot not found: " + targetName);
                    }
                    data.positionMode = SkeletonJson.positionModeFromString(this.getValue(constraintMap, "positionMode", "percent"));
                    data.spacingMode = SkeletonJson.spacingModeFromString(this.getValue(constraintMap, "spacingMode", "length"));
                    data.rotateMode = SkeletonJson.rotateModeFromString(this.getValue(constraintMap, "rotateMode", "tangent"));
                    data.offsetRotation = this.getValue(constraintMap, "rotation", 0);
                    data.position = this.getValue(constraintMap, "position", 0);
                    if (data.positionMode == spine.PositionMode.Fixed) {
                        data.position *= scale;
                    }
                    data.spacing = this.getValue(constraintMap, "spacing", 0);
                    if (data.spacingMode == spine.SpacingMode.Length || data.spacingMode == spine.SpacingMode.Fixed) {
                        data.spacing *= scale;
                    }
                    data.rotateMix = this.getValue(constraintMap, "rotateMix", 1);
                    data.translateMix = this.getValue(constraintMap, "translateMix", 1);
                    skeletonData.pathConstraints.push(data);
                }
            }
            if (root.skins) {
                for (let skinName in root.skins) {
                    let skinMap = root.skins[skinName];
                    let skin = new spine.Skin(skinName);
                    for (let slotName in skinMap) {
                        let slotIndex = skeletonData.findSlotIndex(slotName);
                        if (slotIndex == -1) {
                            throw new Error("Slot not found: " + slotName);
                        }
                        let slotMap = skinMap[slotName];
                        for (let entryName in slotMap) {
                            let attachment = this.readAttachment(slotMap[entryName], skin, slotIndex, entryName, skeletonData);
                            if (attachment != null) {
                                skin.addAttachment(slotIndex, entryName, attachment);
                            }
                        }
                    }
                    skeletonData.skins.push(skin);
                    if (skin.name == "default") {
                        skeletonData.defaultSkin = skin;
                    }
                }
            }
            for (let i = 0, n = this.linkedMeshes.length; i < n; i++) {
                let linkedMesh = this.linkedMeshes[i];
                let skin = linkedMesh.skin == null ? skeletonData.defaultSkin : skeletonData.findSkin(linkedMesh.skin);
                if (skin == null) {
                    throw new Error("Skin not found: " + linkedMesh.skin);
                }
                let parent = skin.getAttachment(linkedMesh.slotIndex, linkedMesh.parent);
                if (parent == null) {
                    throw new Error("Parent mesh not found: " + linkedMesh.parent);
                }
                linkedMesh.mesh.setParentMesh(parent);
                linkedMesh.mesh.updateUVs();
            }
            this.linkedMeshes.length = 0;
            if (root.events) {
                for (let eventName in root.events) {
                    let eventMap = root.events[eventName];
                    let data = new spine.EventData(eventName);
                    data.intValue = this.getValue(eventMap, "int", 0);
                    data.floatValue = this.getValue(eventMap, "float", 0);
                    data.stringValue = this.getValue(eventMap, "string", "");
                    skeletonData.events.push(data);
                }
            }
            if (root.animations) {
                for (let animationName in root.animations) {
                    let animationMap = root.animations[animationName];
                    this.readAnimation(animationMap, animationName, skeletonData);
                }
            }
            return skeletonData;
        }
        readAttachment(map, skin, slotIndex, name, skeletonData) {
            let scale = this.scale;
            name = this.getValue(map, "name", name);
            let type = this.getValue(map, "type", "region");
            switch (type) {
                case "region": {
                    let path = this.getValue(map, "path", name);
                    let region = this.attachmentLoader.newRegionAttachment(skin, name, path);
                    if (region == null) {
                        return null;
                    }
                    region.path = path;
                    region.x = this.getValue(map, "x", 0) * scale;
                    region.y = this.getValue(map, "y", 0) * scale;
                    region.scaleX = this.getValue(map, "scaleX", 1);
                    region.scaleY = this.getValue(map, "scaleY", 1);
                    region.rotation = this.getValue(map, "rotation", 0);
                    region.width = map.width * scale;
                    region.height = map.height * scale;
                    let color = this.getValue(map, "color", null);
                    region.updateOffset();
                    return region;
                }
                case "boundingbox": {
                    let box = this.attachmentLoader.newBoundingBoxAttachment(skin, name);
                    if (box == null) {
                        return null;
                    }
                    this.readVertices(map, box, map.vertexCount << 1);
                    let color = this.getValue(map, "color", null);
                    if (color != null) {
                        box.color.setFromString(color);
                    }
                    return box;
                }
                case "mesh":
                case "linkedmesh": {
                    let path = this.getValue(map, "path", name);
                    let mesh = this.attachmentLoader.newMeshAttachment(skin, name, path);
                    if (mesh == null) {
                        return null;
                    }
                    mesh.path = path;
                    let color = this.getValue(map, "color", null);
                    if (color != null) {
                        mesh.color.setFromString(color);
                    }
                    let parent = this.getValue(map, "parent", null);
                    if (parent != null) {
                        mesh.inheritDeform = this.getValue(map, "deform", true);
                        this.linkedMeshes.push(new LinkedMesh(mesh, this.getValue(map, "skin", null), slotIndex, parent));
                        return mesh;
                    }
                    let uvs = map.uvs;
                    this.readVertices(map, mesh, uvs.length);
                    mesh.triangles = map.triangles;
                    mesh.regionUVs = uvs;
                    mesh.updateUVs();
                    mesh.hullLength = this.getValue(map, "hull", 0) * 2;
                    return mesh;
                }
                case "path": {
                    let path = this.attachmentLoader.newPathAttachment(skin, name);
                    if (path == null) {
                        return null;
                    }
                    path.closed = this.getValue(map, "closed", false);
                    path.constantSpeed = this.getValue(map, "constantSpeed", true);
                    let vertexCount = map.vertexCount;
                    this.readVertices(map, path, vertexCount << 1);
                    let lengths = spine.Utils.newArray(vertexCount / 3, 0);
                    for (let i = 0; i < map.lengths.length; i++) {
                        lengths[i] = map.lengths[i] * scale;
                    }
                    path.lengths = lengths;
                    let color = this.getValue(map, "color", null);
                    if (color != null) {
                        path.color.setFromString(color);
                    }
                    return path;
                }
                case "point": {
                    let point = this.attachmentLoader.newPointAttachment(skin, name);
                    if (point == null) {
                        return null;
                    }
                    point.x = this.getValue(map, "x", 0) * scale;
                    point.y = this.getValue(map, "y", 0) * scale;
                    point.rotation = this.getValue(map, "rotation", 0);
                    let color = this.getValue(map, "color", null);
                    if (color != null) {
                        point.color.setFromString(color);
                    }
                    return point;
                }
                case "clipping": {
                    let clip = this.attachmentLoader.newClippingAttachment(skin, name);
                    if (clip == null) {
                        return null;
                    }
                    let end = this.getValue(map, "end", null);
                    if (end != null) {
                        let slot = skeletonData.findSlot(end);
                        if (slot == null) {
                            throw new Error("Clipping end slot not found: " + end);
                        }
                        clip.endSlot = slot;
                    }
                    let vertexCount = map.vertexCount;
                    this.readVertices(map, clip, vertexCount << 1);
                    let color = this.getValue(map, "color", null);
                    if (color != null) {
                        clip.color.setFromString(color);
                    }
                    return clip;
                }
            }
            return null;
        }
        readVertices(map, attachment, verticesLength) {
            let scale = this.scale;
            attachment.worldVerticesLength = verticesLength;
            let vertices = map.vertices;
            if (verticesLength == vertices.length) {
                let scaledVertices = spine.Utils.toFloatArray(vertices);
                if (scale != 1) {
                    for (let i = 0, n = vertices.length; i < n; i++) {
                        scaledVertices[i] *= scale;
                    }
                }
                attachment.vertices = scaledVertices;
                return;
            }
            let weights = new Array();
            let bones = new Array();
            for (let i = 0, n = vertices.length; i < n;) {
                let boneCount = vertices[i++];
                bones.push(boneCount);
                for (let nn = i + boneCount * 4; i < nn; i += 4) {
                    bones.push(vertices[i]);
                    weights.push(vertices[i + 1] * scale);
                    weights.push(vertices[i + 2] * scale);
                    weights.push(vertices[i + 3]);
                }
            }
            attachment.bones = bones;
            attachment.vertices = spine.Utils.toFloatArray(weights);
        }
        readAnimation(map, name, skeletonData) {
            let scale = this.scale;
            let timelines = new Array();
            let duration = 0;
            if (map.slots) {
                for (let slotName in map.slots) {
                    let slotMap = map.slots[slotName];
                    let slotIndex = skeletonData.findSlotIndex(slotName);
                    if (slotIndex == -1) {
                        throw new Error("Slot not found: " + slotName);
                    }
                    for (let timelineName in slotMap) {
                        let timelineMap = slotMap[timelineName];
                        if (timelineName == "attachment") {
                            let timeline = new spine.AttachmentTimeline(timelineMap.length);
                            timeline.slotIndex = slotIndex;
                            let frameIndex = 0;
                            for (let i = 0; i < timelineMap.length; i++) {
                                let valueMap = timelineMap[i];
                                timeline.setFrame(frameIndex++, valueMap.time, valueMap.name);
                            }
                            timelines.push(timeline);
                            duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);
                        }
                        else if (timelineName == "color") {
                            let timeline = new spine.ColorTimeline(timelineMap.length);
                            timeline.slotIndex = slotIndex;
                            let frameIndex = 0;
                            for (let i = 0; i < timelineMap.length; i++) {
                                let valueMap = timelineMap[i];
                                let color = new spine.Color();
                                color.setFromString(valueMap.color);
                                timeline.setFrame(frameIndex, valueMap.time, color.r, color.g, color.b, color.a);
                                this.readCurve(valueMap, timeline, frameIndex);
                                frameIndex++;
                            }
                            timelines.push(timeline);
                            duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * spine.ColorTimeline.ENTRIES]);
                        }
                        else if (timelineName == "twoColor") {
                            let timeline = new spine.TwoColorTimeline(timelineMap.length);
                            timeline.slotIndex = slotIndex;
                            let frameIndex = 0;
                            for (let i = 0; i < timelineMap.length; i++) {
                                let valueMap = timelineMap[i];
                                let light = new spine.Color();
                                let dark = new spine.Color();
                                light.setFromString(valueMap.light);
                                dark.setFromString(valueMap.dark);
                                timeline.setFrame(frameIndex, valueMap.time, light.r, light.g, light.b, light.a, dark.r, dark.g, dark.b);
                                this.readCurve(valueMap, timeline, frameIndex);
                                frameIndex++;
                            }
                            timelines.push(timeline);
                            duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * spine.TwoColorTimeline.ENTRIES]);
                        }
                        else {
                            throw new Error("Invalid timeline type for a slot: " + timelineName + " (" + slotName + ")");
                        }
                    }
                }
            }
            if (map.bones) {
                for (let boneName in map.bones) {
                    let boneMap = map.bones[boneName];
                    let boneIndex = skeletonData.findBoneIndex(boneName);
                    if (boneIndex == -1) {
                        throw new Error("Bone not found: " + boneName);
                    }
                    for (let timelineName in boneMap) {
                        let timelineMap = boneMap[timelineName];
                        if (timelineName === "rotate") {
                            let timeline = new spine.RotateTimeline(timelineMap.length);
                            timeline.boneIndex = boneIndex;
                            let frameIndex = 0;
                            for (let i = 0; i < timelineMap.length; i++) {
                                let valueMap = timelineMap[i];
                                timeline.setFrame(frameIndex, valueMap.time, valueMap.angle);
                                this.readCurve(valueMap, timeline, frameIndex);
                                frameIndex++;
                            }
                            timelines.push(timeline);
                            duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * spine.RotateTimeline.ENTRIES]);
                        }
                        else if (timelineName === "translate" || timelineName === "scale" || timelineName === "shear") {
                            let timeline = null;
                            let timelineScale = 1;
                            if (timelineName === "scale") {
                                timeline = new spine.ScaleTimeline(timelineMap.length);
                            }
                            else if (timelineName === "shear") {
                                timeline = new spine.ShearTimeline(timelineMap.length);
                            }
                            else {
                                timeline = new spine.TranslateTimeline(timelineMap.length);
                                timelineScale = scale;
                            }
                            timeline.boneIndex = boneIndex;
                            let frameIndex = 0;
                            for (let i = 0; i < timelineMap.length; i++) {
                                let valueMap = timelineMap[i];
                                let x = this.getValue(valueMap, "x", 0), y = this.getValue(valueMap, "y", 0);
                                timeline.setFrame(frameIndex, valueMap.time, x * timelineScale, y * timelineScale);
                                this.readCurve(valueMap, timeline, frameIndex);
                                frameIndex++;
                            }
                            timelines.push(timeline);
                            duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * spine.TranslateTimeline.ENTRIES]);
                        }
                        else {
                            throw new Error("Invalid timeline type for a bone: " + timelineName + " (" + boneName + ")");
                        }
                    }
                }
            }
            if (map.ik) {
                for (let constraintName in map.ik) {
                    let constraintMap = map.ik[constraintName];
                    let constraint = skeletonData.findIkConstraint(constraintName);
                    let timeline = new spine.IkConstraintTimeline(constraintMap.length);
                    timeline.ikConstraintIndex = skeletonData.ikConstraints.indexOf(constraint);
                    let frameIndex = 0;
                    for (let i = 0; i < constraintMap.length; i++) {
                        let valueMap = constraintMap[i];
                        timeline.setFrame(frameIndex, valueMap.time, this.getValue(valueMap, "mix", 1), this.getValue(valueMap, "bendPositive", true) ? 1 : -1);
                        this.readCurve(valueMap, timeline, frameIndex);
                        frameIndex++;
                    }
                    timelines.push(timeline);
                    duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * spine.IkConstraintTimeline.ENTRIES]);
                }
            }
            if (map.transform) {
                for (let constraintName in map.transform) {
                    let constraintMap = map.transform[constraintName];
                    let constraint = skeletonData.findTransformConstraint(constraintName);
                    let timeline = new spine.TransformConstraintTimeline(constraintMap.length);
                    timeline.transformConstraintIndex = skeletonData.transformConstraints.indexOf(constraint);
                    let frameIndex = 0;
                    for (let i = 0; i < constraintMap.length; i++) {
                        let valueMap = constraintMap[i];
                        timeline.setFrame(frameIndex, valueMap.time, this.getValue(valueMap, "rotateMix", 1), this.getValue(valueMap, "translateMix", 1), this.getValue(valueMap, "scaleMix", 1), this.getValue(valueMap, "shearMix", 1));
                        this.readCurve(valueMap, timeline, frameIndex);
                        frameIndex++;
                    }
                    timelines.push(timeline);
                    duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * spine.TransformConstraintTimeline.ENTRIES]);
                }
            }
            if (map.paths) {
                for (let constraintName in map.paths) {
                    let constraintMap = map.paths[constraintName];
                    let index = skeletonData.findPathConstraintIndex(constraintName);
                    if (index == -1) {
                        throw new Error("Path constraint not found: " + constraintName);
                    }
                    let data = skeletonData.pathConstraints[index];
                    for (let timelineName in constraintMap) {
                        let timelineMap = constraintMap[timelineName];
                        if (timelineName === "position" || timelineName === "spacing") {
                            let timeline = null;
                            let timelineScale = 1;
                            if (timelineName === "spacing") {
                                timeline = new spine.PathConstraintSpacingTimeline(timelineMap.length);
                                if (data.spacingMode == spine.SpacingMode.Length || data.spacingMode == spine.SpacingMode.Fixed) {
                                    timelineScale = scale;
                                }
                            }
                            else {
                                timeline = new spine.PathConstraintPositionTimeline(timelineMap.length);
                                if (data.positionMode == spine.PositionMode.Fixed) {
                                    timelineScale = scale;
                                }
                            }
                            timeline.pathConstraintIndex = index;
                            let frameIndex = 0;
                            for (let i = 0; i < timelineMap.length; i++) {
                                let valueMap = timelineMap[i];
                                timeline.setFrame(frameIndex, valueMap.time, this.getValue(valueMap, timelineName, 0) * timelineScale);
                                this.readCurve(valueMap, timeline, frameIndex);
                                frameIndex++;
                            }
                            timelines.push(timeline);
                            duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * spine.PathConstraintPositionTimeline.ENTRIES]);
                        }
                        else if (timelineName === "mix") {
                            let timeline = new spine.PathConstraintMixTimeline(timelineMap.length);
                            timeline.pathConstraintIndex = index;
                            let frameIndex = 0;
                            for (let i = 0; i < timelineMap.length; i++) {
                                let valueMap = timelineMap[i];
                                timeline.setFrame(frameIndex, valueMap.time, this.getValue(valueMap, "rotateMix", 1), this.getValue(valueMap, "translateMix", 1));
                                this.readCurve(valueMap, timeline, frameIndex);
                                frameIndex++;
                            }
                            timelines.push(timeline);
                            duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * spine.PathConstraintMixTimeline.ENTRIES]);
                        }
                    }
                }
            }
            if (map.deform) {
                for (let deformName in map.deform) {
                    let deformMap = map.deform[deformName];
                    let skin = skeletonData.findSkin(deformName);
                    if (skin == null) {
                        throw new Error("Skin not found: " + deformName);
                    }
                    for (let slotName in deformMap) {
                        let slotMap = deformMap[slotName];
                        let slotIndex = skeletonData.findSlotIndex(slotName);
                        if (slotIndex == -1) {
                            throw new Error("Slot not found: " + slotMap.name);
                        }
                        for (let timelineName in slotMap) {
                            let timelineMap = slotMap[timelineName];
                            let attachment = skin.getAttachment(slotIndex, timelineName);
                            if (attachment == null) {
                                throw new Error("Deform attachment not found: " + timelineMap.name);
                            }
                            let weighted = attachment.bones != null;
                            let vertices = attachment.vertices;
                            let deformLength = weighted ? vertices.length / 3 * 2 : vertices.length;
                            let timeline = new spine.DeformTimeline(timelineMap.length);
                            timeline.slotIndex = slotIndex;
                            timeline.attachment = attachment;
                            let frameIndex = 0;
                            for (let j = 0; j < timelineMap.length; j++) {
                                let valueMap = timelineMap[j];
                                let deform;
                                let verticesValue = this.getValue(valueMap, "vertices", null);
                                if (verticesValue == null) {
                                    deform = weighted ? spine.Utils.newFloatArray(deformLength) : vertices;
                                }
                                else {
                                    deform = spine.Utils.newFloatArray(deformLength);
                                    let start = this.getValue(valueMap, "offset", 0);
                                    spine.Utils.arrayCopy(verticesValue, 0, deform, start, verticesValue.length);
                                    if (scale != 1) {
                                        for (let i = start, n = i + verticesValue.length; i < n; i++) {
                                            deform[i] *= scale;
                                        }
                                    }
                                    if (!weighted) {
                                        for (let i = 0; i < deformLength; i++) {
                                            deform[i] += vertices[i];
                                        }
                                    }
                                }
                                timeline.setFrame(frameIndex, valueMap.time, deform);
                                this.readCurve(valueMap, timeline, frameIndex);
                                frameIndex++;
                            }
                            timelines.push(timeline);
                            duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);
                        }
                    }
                }
            }
            let drawOrderNode = map.drawOrder;
            if (drawOrderNode == null) {
                drawOrderNode = map.draworder;
            }
            if (drawOrderNode != null && drawOrderNode.length > 0) {
                let timeline = new spine.DrawOrderTimeline(drawOrderNode.length);
                let slotCount = skeletonData.slots.length;
                let frameIndex = 0;
                for (let j = 0; j < drawOrderNode.length; j++) {
                    let drawOrderMap = drawOrderNode[j];
                    let drawOrder = null;
                    let offsets = this.getValue(drawOrderMap, "offsets", null);
                    if (offsets != null) {
                        drawOrder = spine.Utils.newArray(slotCount, -1);
                        let unchanged = spine.Utils.newArray(slotCount - offsets.length, 0);
                        let originalIndex = 0, unchangedIndex = 0;
                        for (let i = 0; i < offsets.length; i++) {
                            let offsetMap = offsets[i];
                            let slotIndex = skeletonData.findSlotIndex(offsetMap.slot);
                            if (slotIndex == -1) {
                                throw new Error("Slot not found: " + offsetMap.slot);
                            }
                            while (originalIndex != slotIndex) {
                                unchanged[unchangedIndex++] = originalIndex++;
                            }
                            drawOrder[originalIndex + offsetMap.offset] = originalIndex++;
                        }
                        while (originalIndex < slotCount) {
                            unchanged[unchangedIndex++] = originalIndex++;
                        }
                        for (let i = slotCount - 1; i >= 0; i--) {
                            if (drawOrder[i] == -1) {
                                drawOrder[i] = unchanged[--unchangedIndex];
                            }
                        }
                    }
                    timeline.setFrame(frameIndex++, drawOrderMap.time, drawOrder);
                }
                timelines.push(timeline);
                duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);
            }
            let eventTimeline;
            if (map.events && map.events.length > 0) {
                eventTimeline = new spine.EventTimeline(map.events.length);
                let frameIndex = 0;
                for (let i = 0; i < map.events.length; i++) {
                    let eventMap = map.events[i];
                    let eventData = skeletonData.findEvent(eventMap.name);
                    if (eventData == null) {
                        throw new Error("Event not found: " + eventMap.name);
                    }
                    let event = new spine.Event(spine.Utils.toSinglePrecision(eventMap.time), eventData);
                    event.intValue = this.getValue(eventMap, "int", eventData.intValue);
                    event.floatValue = this.getValue(eventMap, "float", eventData.floatValue);
                    event.stringValue = this.getValue(eventMap, "string", eventData.stringValue);
                    eventTimeline.setFrame(frameIndex++, event);
                }
                timelines.push(eventTimeline);
                duration = Math.max(duration, eventTimeline.frames[eventTimeline.getFrameCount() - 1]);
            }
            if (isNaN(duration)) {
                throw new Error("Error while parsing animation, duration is NaN");
            }
            skeletonData.addAnimation(new spine.Animation(name, timelines, duration, eventTimeline));
        }
        readCurve(map, timeline, frameIndex) {
            if (!map.curve) {
                return;
            }
            if (map.curve === "stepped") {
                timeline.setStepped(frameIndex);
            }
            else if (Object.prototype.toString.call(map.curve) === '[object Array]') {
                let curve = map.curve;
                timeline.setCurve(frameIndex, curve[0], curve[1], curve[2], curve[3]);
            }
        }
        getValue(map, prop, defaultValue) {
            return map[prop] !== undefined ? map[prop] : defaultValue;
        }
        static blendModeFromString(str) {
            if ((typeof str) == "string") {
                str = str.toString().toLowerCase();
                if (str == "normal") {
                    return spine.BlendMode.Normal;
                }
                if (str == "additive") {
                    return spine.BlendMode.Additive;
                }
                if (str == "multiply") {
                    return spine.BlendMode.Multiply;
                }
                if (str == "screen") {
                    return spine.BlendMode.Screen;
                }
                throw new Error(`Unknown blend mode: ${str}`);
            }
            else {
                if (str == 0) {
                    return spine.BlendMode.Normal;
                }
                if (str == 1) {
                    return spine.BlendMode.Additive;
                }
                if (str == 2) {
                    return spine.BlendMode.Multiply;
                }
                if (str == 3) {
                    return spine.BlendMode.Screen;
                }
                throw new Error(`Unknown blend mode: ${str}`);
            }
        }
        static positionModeFromString(str) {
            if ((typeof str) == "string") {
                str = str.toString().toLowerCase();
                if (str == "fixed") {
                    return spine.PositionMode.Fixed;
                }
                if (str == "percent") {
                    return spine.PositionMode.Percent;
                }
                throw new Error(`Unknown position mode: ${str}`);
            }
            else {
                if (str == 0) {
                    return spine.PositionMode.Fixed;
                }
                if (str == 1) {
                    return spine.PositionMode.Percent;
                }
                throw new Error(`Unknown position mode: ${str}`);
            }
        }
        static spacingModeFromString(str) {
            if ((typeof str) == "string") {
                str = str.toString().toLowerCase();
                if (str == "length") {
                    return spine.SpacingMode.Length;
                }
                if (str == "fixed") {
                    return spine.SpacingMode.Fixed;
                }
                if (str == "percent") {
                    return spine.SpacingMode.Percent;
                }
                throw new Error(`Unknown position mode: ${str}`);
            }
            else {
                if (str == 0) {
                    return spine.SpacingMode.Length;
                }
                if (str == 1) {
                    return spine.SpacingMode.Fixed;
                }
                if (str == 2) {
                    return spine.SpacingMode.Percent;
                }
                throw new Error(`Unknown position mode: ${str}`);
            }
        }
        static rotateModeFromString(str) {
            if ((typeof str) == "string") {
                str = str.toString().toLowerCase();
                if (str == "tangent") {
                    return spine.RotateMode.Tangent;
                }
                if (str == "chain") {
                    return spine.RotateMode.Chain;
                }
                if (str == "chainscale") {
                    return spine.RotateMode.ChainScale;
                }
                throw new Error(`Unknown rotate mode: ${str}`);
            }
            else {
                if (str == 0) {
                    return spine.RotateMode.Tangent;
                }
                if (str == 1) {
                    return spine.RotateMode.Chain;
                }
                if (str == 2) {
                    return spine.RotateMode.ChainScale;
                }
                throw new Error(`Unknown rotate mode: ${str}`);
            }
        }
        static transformModeFromString(str) {
            if ((typeof str) == "string") {
                str = str.toString().toLowerCase();
                if (str == "normal") {
                    return spine.TransformMode.Normal;
                }
                if (str == "onlytranslation") {
                    return spine.TransformMode.OnlyTranslation;
                }
                if (str == "norotationorreflection") {
                    return spine.TransformMode.NoRotationOrReflection;
                }
                if (str == "noscale") {
                    return spine.TransformMode.NoScale;
                }
                if (str == "noscaleorreflection") {
                    return spine.TransformMode.NoScaleOrReflection;
                }
                throw new Error(`Unknown transform mode: ${str}`);
            }
            else {
                if (str == 0) {
                    return spine.TransformMode.Normal;
                }
                if (str == 1) {
                    return spine.TransformMode.OnlyTranslation;
                }
                if (str == 2) {
                    return spine.TransformMode.NoRotationOrReflection;
                }
                if (str == 3) {
                    return spine.TransformMode.NoScale;
                }
                if (str == 4) {
                    return spine.TransformMode.NoScaleOrReflection;
                }
                throw new Error(`Unknown transform mode: ${str}`);
            }
        }
    }
    spine.SkeletonJson = SkeletonJson;
    class LinkedMesh {
        constructor(mesh, skin, slotIndex, parent) {
            this.mesh = mesh;
            this.skin = skin;
            this.slotIndex = slotIndex;
            this.parent = parent;
        }
    }
})(spine || (spine = {}));
//# sourceMappingURL=SkeletonJson.js.map
var spine;
(function (spine) {
    class SkeletonData {
        constructor() {
            this.bones = new Array();
            this.slots = new Array();
            this.skins = new Array();
            this.events = new Array();
            this.animations = new Array();
            this.ikConstraints = new Array();
            this.transformConstraints = new Array();
            this.pathConstraints = new Array();
            this.animationsArr = [];
            this.fps = 0;
            this.animationsMaps = new ds.StringMap();
        }
        findBone(boneName) {
            if (boneName == null) {
                throw new Error("boneName cannot be null.");
            }
            let bones = this.bones;
            for (let i = 0, n = bones.length; i < n; i++) {
                let bone = bones[i];
                if (bone.name == boneName) {
                    return bone;
                }
            }
            return null;
        }
        findBoneIndex(boneName) {
            if (boneName == null) {
                throw new Error("boneName cannot be null.");
            }
            let bones = this.bones;
            for (let i = 0, n = bones.length; i < n; i++) {
                if (bones[i].name == boneName) {
                    return i;
                }
            }
            return -1;
        }
        findSlot(slotName) {
            if (slotName == null) {
                throw new Error("slotName cannot be null.");
            }
            let slots = this.slots;
            for (let i = 0, n = slots.length; i < n; i++) {
                let slot = slots[i];
                if (slot.name == slotName) {
                    return slot;
                }
            }
            return null;
        }
        findSlotIndex(slotName) {
            if (slotName == null) {
                throw new Error("slotName cannot be null.");
            }
            let slots = this.slots;
            for (let i = 0, n = slots.length; i < n; i++) {
                if (slots[i].name == slotName) {
                    return i;
                }
            }
            return -1;
        }
        findSkin(skinName) {
            if (skinName == null) {
                throw new Error("skinName cannot be null.");
            }
            let skins = this.skins;
            for (let i = 0, n = skins.length; i < n; i++) {
                let skin = skins[i];
                if (skin.name == skinName) {
                    return skin;
                }
            }
            return null;
        }
        findEvent(eventDataName) {
            if (eventDataName == null) {
                throw new Error("eventDataName cannot be null.");
            }
            let events = this.events;
            for (let i = 0, n = events.length; i < n; i++) {
                let event = events[i];
                if (event.name == eventDataName) {
                    return event;
                }
            }
            return null;
        }
        findAnimation(animationName) {
            if (animationName == null) {
                throw new Error("animationName cannot be null.");
            }
            return this.animationsMaps.get(animationName);
        }
        findIkConstraint(constraintName) {
            if (constraintName == null) {
                throw new Error("constraintName cannot be null.");
            }
            let ikConstraints = this.ikConstraints;
            for (let i = 0, n = ikConstraints.length; i < n; i++) {
                let constraint = ikConstraints[i];
                if (constraint.name == constraintName) {
                    return constraint;
                }
            }
            return null;
        }
        findTransformConstraint(constraintName) {
            if (constraintName == null) {
                throw new Error("constraintName cannot be null.");
            }
            let transformConstraints = this.transformConstraints;
            for (let i = 0, n = transformConstraints.length; i < n; i++) {
                let constraint = transformConstraints[i];
                if (constraint.name == constraintName) {
                    return constraint;
                }
            }
            return null;
        }
        findPathConstraint(constraintName) {
            if (constraintName == null) {
                throw new Error("constraintName cannot be null.");
            }
            let pathConstraints = this.pathConstraints;
            for (let i = 0, n = pathConstraints.length; i < n; i++) {
                let constraint = pathConstraints[i];
                if (constraint.name == constraintName) {
                    return constraint;
                }
            }
            return null;
        }
        findPathConstraintIndex(pathConstraintName) {
            if (pathConstraintName == null) {
                throw new Error("pathConstraintName cannot be null.");
            }
            let pathConstraints = this.pathConstraints;
            for (let i = 0, n = pathConstraints.length; i < n; i++) {
                if (pathConstraints[i].name == pathConstraintName) {
                    return i;
                }
            }
            return -1;
        }
        addAnimation(ani) {
            this.animations.push(ani);
            this.animationsMaps.put(ani.name, ani);
            this.animationsArr.push(ani.name);
        }
        dispose() {
            this.bones.length = 0;
            this.bones = null;
            this.slots.length = 0;
            this.slots = null;
            this.skins.length = 0;
            this.skins = null;
            this.events.length = 0;
            this.events = null;
            this.animations.length = 0;
            this.animations = null;
            this.ikConstraints.length = 0;
            this.ikConstraints = null;
            this.transformConstraints.length = 0;
            this.transformConstraints = null;
            this.pathConstraints.length = 0;
            this.pathConstraints = null;
            this.animationsMaps.clear();
            this.animationsMaps = null;
            this.animationsArr.length = 0;
            this.animationsArr = null;
        }
    }
    spine.SkeletonData = SkeletonData;
})(spine || (spine = {}));
//# sourceMappingURL=SkeletonData.js.map
var spine;
(function (spine) {
    class SkeletonClipping {
        constructor(resName) {
            this.triangulator = new spine.Triangulator();
            this.clippingPolygon = new Array();
            this.clipOutput = new Array();
            this.clippedVertices = new Array();
            this.clippedTriangles = new Array();
            this.scratch = new Array();
            this._resName = resName;
        }
        clipStart(slot, clip) {
            if (this.clipAttachment != null) {
                return 0;
            }
            this.clipAttachment = clip;
            let n = clip.worldVerticesLength;
            let vertices = spine.Utils.setArraySize(this.clippingPolygon, n);
            clip.computeWorldVertices(slot, 0, n, vertices, 0, 2);
            let clippingPolygon = this.clippingPolygon;
            SkeletonClipping.makeClockwise(clippingPolygon);
            let clippingPolygons = this.clippingPolygons = this.triangulator.decompose(clippingPolygon, this.triangulator.triangulate(clippingPolygon));
            for (let i = 0, n = clippingPolygons.length; i < n; i++) {
                let polygon = clippingPolygons[i];
                SkeletonClipping.makeClockwise(polygon);
                polygon.push(polygon[0]);
                polygon.push(polygon[1]);
            }
            return clippingPolygons.length;
        }
        clipEndWithSlot(slot) {
            if (this.clipAttachment != null && this.clipAttachment.endSlot == slot.data) {
                this.clipEnd();
            }
        }
        clipEnd() {
            if (this.clipAttachment == null) {
                return;
            }
            this.clipAttachment = null;
            this.clippingPolygons = null;
            this.clippedVertices.length = 0;
            this.clippedTriangles.length = 0;
            this.clippingPolygon.length = 0;
        }
        isClipping() {
            if (spine.FlypineSetting.isOpenClipping == false) {
                return false;
            }
            return this.clipAttachment != null;
        }
        clipTriangles(vertices, verticesLength, triangles, trianglesLength, uvs, light, dark, twoColor) {
            if (spine.FlypineSetting.isOpenClipping == false) {
                return;
            }
            if (spine.FlypineSetting.clipReturn) {
                this.clippedVertices.length = 0;
                this.clippedTriangles.length = 0;
                return true;
            }
            let clipOutput = this.clipOutput;
            let clippedVertices = this.clippedVertices;
            let clippedTriangles = this.clippedTriangles;
            let polygons = this.clippingPolygons;
            let polygonsCount = this.clippingPolygons.length;
            let vertexSize = twoColor ? 12 : 8;
            let index = 0;
            clippedVertices.length = 0;
            clippedTriangles.length = 0;
            outer: for (let i = 0; i < trianglesLength; i += 3) {
                let vertexOffset = triangles[i] << 1;
                let x1 = vertices[vertexOffset], y1 = vertices[vertexOffset + 1];
                let u1 = uvs[vertexOffset], v1 = uvs[vertexOffset + 1];
                vertexOffset = triangles[i + 1] << 1;
                let x2 = vertices[vertexOffset], y2 = vertices[vertexOffset + 1];
                let u2 = uvs[vertexOffset], v2 = uvs[vertexOffset + 1];
                vertexOffset = triangles[i + 2] << 1;
                let x3 = vertices[vertexOffset], y3 = vertices[vertexOffset + 1];
                let u3 = uvs[vertexOffset], v3 = uvs[vertexOffset + 1];
                for (let p = 0; p < polygonsCount; p++) {
                    let s = clippedVertices.length;
                    if (this.clip(x1, y1, x2, y2, x3, y3, polygons[p], clipOutput)) {
                        let clipOutputLength = clipOutput.length;
                        if (clipOutputLength == 0) {
                            continue;
                        }
                        let d0 = y2 - y3, d1 = x3 - x2, d2 = x1 - x3, d4 = y3 - y1;
                        let d = 1 / (d0 * d2 + d1 * (y1 - y3));
                        let clipOutputCount = clipOutputLength >> 1;
                        let clipOutputItems = this.clipOutput;
                        let clippedVerticesItems = spine.Utils.setArraySize(clippedVertices, s + clipOutputCount * vertexSize);
                        for (let ii = 0; ii < clipOutputLength; ii += 2) {
                            let x = clipOutputItems[ii], y = clipOutputItems[ii + 1];
                            clippedVerticesItems[s] = x;
                            clippedVerticesItems[s + 1] = y;
                            clippedVerticesItems[s + 2] = light.r;
                            clippedVerticesItems[s + 3] = light.g;
                            clippedVerticesItems[s + 4] = light.b;
                            clippedVerticesItems[s + 5] = light.a;
                            let c0 = x - x3, c1 = y - y3;
                            let a = (d0 * c0 + d1 * c1) * d;
                            let b = (d4 * c0 + d2 * c1) * d;
                            let c = 1 - a - b;
                            clippedVerticesItems[s + 6] = u1 * a + u2 * b + u3 * c;
                            clippedVerticesItems[s + 7] = v1 * a + v2 * b + v3 * c;
                            if (twoColor) {
                                clippedVerticesItems[s + 8] = dark.r;
                                clippedVerticesItems[s + 9] = dark.g;
                                clippedVerticesItems[s + 10] = dark.b;
                                clippedVerticesItems[s + 11] = dark.a;
                            }
                            s += vertexSize;
                        }
                        s = clippedTriangles.length;
                        let clippedTrianglesItems = spine.Utils.setArraySize(clippedTriangles, s + 3 * (clipOutputCount - 2));
                        clipOutputCount--;
                        for (let ii = 1; ii < clipOutputCount; ii++) {
                            clippedTrianglesItems[s] = index;
                            clippedTrianglesItems[s + 1] = (index + ii);
                            clippedTrianglesItems[s + 2] = (index + ii + 1);
                            s += 3;
                        }
                        index += clipOutputCount + 1;
                    }
                    else {
                        let clippedVerticesItems = spine.Utils.setArraySize(clippedVertices, s + 3 * vertexSize);
                        clippedVerticesItems[s] = x1;
                        clippedVerticesItems[s + 1] = y1;
                        clippedVerticesItems[s + 2] = light.r;
                        clippedVerticesItems[s + 3] = light.g;
                        clippedVerticesItems[s + 4] = light.b;
                        clippedVerticesItems[s + 5] = light.a;
                        if (!twoColor) {
                            clippedVerticesItems[s + 6] = u1;
                            clippedVerticesItems[s + 7] = v1;
                            clippedVerticesItems[s + 8] = x2;
                            clippedVerticesItems[s + 9] = y2;
                            clippedVerticesItems[s + 10] = light.r;
                            clippedVerticesItems[s + 11] = light.g;
                            clippedVerticesItems[s + 12] = light.b;
                            clippedVerticesItems[s + 13] = light.a;
                            clippedVerticesItems[s + 14] = u2;
                            clippedVerticesItems[s + 15] = v2;
                            clippedVerticesItems[s + 16] = x3;
                            clippedVerticesItems[s + 17] = y3;
                            clippedVerticesItems[s + 18] = light.r;
                            clippedVerticesItems[s + 19] = light.g;
                            clippedVerticesItems[s + 20] = light.b;
                            clippedVerticesItems[s + 21] = light.a;
                            clippedVerticesItems[s + 22] = u3;
                            clippedVerticesItems[s + 23] = v3;
                        }
                        else {
                            clippedVerticesItems[s + 6] = u1;
                            clippedVerticesItems[s + 7] = v1;
                            clippedVerticesItems[s + 8] = dark.r;
                            clippedVerticesItems[s + 9] = dark.g;
                            clippedVerticesItems[s + 10] = dark.b;
                            clippedVerticesItems[s + 11] = dark.a;
                            clippedVerticesItems[s + 12] = x2;
                            clippedVerticesItems[s + 13] = y2;
                            clippedVerticesItems[s + 14] = light.r;
                            clippedVerticesItems[s + 15] = light.g;
                            clippedVerticesItems[s + 16] = light.b;
                            clippedVerticesItems[s + 17] = light.a;
                            clippedVerticesItems[s + 18] = u2;
                            clippedVerticesItems[s + 19] = v2;
                            clippedVerticesItems[s + 20] = dark.r;
                            clippedVerticesItems[s + 21] = dark.g;
                            clippedVerticesItems[s + 22] = dark.b;
                            clippedVerticesItems[s + 23] = dark.a;
                            clippedVerticesItems[s + 24] = x3;
                            clippedVerticesItems[s + 25] = y3;
                            clippedVerticesItems[s + 26] = light.r;
                            clippedVerticesItems[s + 27] = light.g;
                            clippedVerticesItems[s + 28] = light.b;
                            clippedVerticesItems[s + 29] = light.a;
                            clippedVerticesItems[s + 30] = u3;
                            clippedVerticesItems[s + 31] = v3;
                            clippedVerticesItems[s + 32] = dark.r;
                            clippedVerticesItems[s + 33] = dark.g;
                            clippedVerticesItems[s + 34] = dark.b;
                            clippedVerticesItems[s + 35] = dark.a;
                        }
                        s = clippedTriangles.length;
                        let clippedTrianglesItems = spine.Utils.setArraySize(clippedTriangles, s + 3);
                        clippedTrianglesItems[s] = index;
                        clippedTrianglesItems[s + 1] = (index + 1);
                        clippedTrianglesItems[s + 2] = (index + 2);
                        index += 3;
                        continue outer;
                    }
                }
            }
        }
        clip(x1, y1, x2, y2, x3, y3, clippingArea, output) {
            if (spine.FlypineSetting.clipReturn) {
                return true;
            }
            let originalOutput = output;
            let clipped = false;
            let input = null;
            if (clippingArea.length % 4 >= 2) {
                input = output;
                output = this.scratch;
            }
            else {
                input = this.scratch;
            }
            input.length = 0;
            input.push(x1);
            input.push(y1);
            input.push(x2);
            input.push(y2);
            input.push(x3);
            input.push(y3);
            input.push(x1);
            input.push(y1);
            output.length = 0;
            let clippingVertices = clippingArea;
            let clippingVerticesLast = clippingArea.length - 4;
            for (let i = 0;; i += 2) {
                let edgeX = clippingVertices[i], edgeY = clippingVertices[i + 1];
                let edgeX2 = clippingVertices[i + 2], edgeY2 = clippingVertices[i + 3];
                let deltaX = edgeX - edgeX2, deltaY = edgeY - edgeY2;
                let inputVertices = input;
                let inputVerticesLength = input.length - 2, outputStart = output.length;
                for (let ii = 0; ii < inputVerticesLength; ii += 2) {
                    let inputX = inputVertices[ii], inputY = inputVertices[ii + 1];
                    let inputX2 = inputVertices[ii + 2], inputY2 = inputVertices[ii + 3];
                    let side2 = deltaX * (inputY2 - edgeY2) - deltaY * (inputX2 - edgeX2) > 0;
                    if (deltaX * (inputY - edgeY2) - deltaY * (inputX - edgeX2) > 0) {
                        if (side2) {
                            output.push(inputX2);
                            output.push(inputY2);
                            continue;
                        }
                        let c0 = inputY2 - inputY, c2 = inputX2 - inputX;
                        let ua = (c2 * (edgeY - inputY) - c0 * (edgeX - inputX)) / (c0 * (edgeX2 - edgeX) - c2 * (edgeY2 - edgeY));
                        output.push(edgeX + (edgeX2 - edgeX) * ua);
                        output.push(edgeY + (edgeY2 - edgeY) * ua);
                    }
                    else if (side2) {
                        let c0 = inputY2 - inputY, c2 = inputX2 - inputX;
                        let ua = (c2 * (edgeY - inputY) - c0 * (edgeX - inputX)) / (c0 * (edgeX2 - edgeX) - c2 * (edgeY2 - edgeY));
                        output.push(edgeX + (edgeX2 - edgeX) * ua);
                        output.push(edgeY + (edgeY2 - edgeY) * ua);
                        output.push(inputX2);
                        output.push(inputY2);
                    }
                    clipped = true;
                }
                if (outputStart == output.length) {
                    originalOutput.length = 0;
                    return true;
                }
                output.push(output[0]);
                output.push(output[1]);
                if (i == clippingVerticesLast) {
                    break;
                }
                let temp = output;
                output = input;
                output.length = 0;
                input = temp;
            }
            if (originalOutput != output) {
                originalOutput.length = 0;
                for (let i = 0, n = output.length - 2; i < n; i++) {
                    originalOutput[i] = output[i];
                }
            }
            else {
                originalOutput.length = originalOutput.length - 2;
            }
            return clipped;
        }
        static makeClockwise(polygon) {
            let vertices = polygon;
            let verticeslength = polygon.length;
            let area = vertices[verticeslength - 2] * vertices[1] - vertices[0] * vertices[verticeslength - 1], p1x = 0, p1y = 0, p2x = 0, p2y = 0;
            for (let i = 0, n = verticeslength - 3; i < n; i += 2) {
                p1x = vertices[i];
                p1y = vertices[i + 1];
                p2x = vertices[i + 2];
                p2y = vertices[i + 3];
                area += p1x * p2y - p2x * p1y;
            }
            if (area < 0) {
                return;
            }
            for (let i = 0, lastX = verticeslength - 2, n = verticeslength >> 1; i < n; i += 2) {
                let x = vertices[i], y = vertices[i + 1];
                let other = lastX - i;
                vertices[i] = vertices[other];
                vertices[i + 1] = vertices[other + 1];
                vertices[other] = x;
                vertices[other + 1] = y;
            }
        }
    }
    spine.SkeletonClipping = SkeletonClipping;
})(spine || (spine = {}));
//# sourceMappingURL=SkeletonClipping.js.map
var spine;
(function (spine) {
    class SkeletonBounds {
        constructor() {
            this.minX = 0;
            this.minY = 0;
            this.maxX = 0;
            this.maxY = 0;
            this.boundingBoxes = new Array();
            this.polygons = new Array();
            this.polygonPool = new spine.Pool(() => {
                return spine.Utils.newFloatArray(16);
            });
        }
        update(skeleton, updateAabb) {
            if (skeleton == null) {
                throw new Error("skeleton cannot be null.");
            }
            let boundingBoxes = this.boundingBoxes;
            let polygons = this.polygons;
            let polygonPool = this.polygonPool;
            let slots = skeleton.slots;
            let slotCount = slots.length;
            boundingBoxes.length = 0;
            polygonPool.freeAll(polygons);
            polygons.length = 0;
            for (let i = 0; i < slotCount; i++) {
                let slot = slots[i];
                let attachment = slot.getAttachment();
                if (attachment instanceof spine.BoundingBoxAttachment) {
                    let boundingBox = attachment;
                    boundingBoxes.push(boundingBox);
                    let polygon = polygonPool.obtain();
                    if (polygon.length != boundingBox.worldVerticesLength) {
                        polygon = spine.Utils.newFloatArray(boundingBox.worldVerticesLength);
                    }
                    polygons.push(polygon);
                    boundingBox.computeWorldVertices(slot, 0, boundingBox.worldVerticesLength, polygon, 0, 2);
                }
            }
            if (updateAabb) {
                this.aabbCompute();
            }
            else {
                this.minX = Number.POSITIVE_INFINITY;
                this.minY = Number.POSITIVE_INFINITY;
                this.maxX = Number.NEGATIVE_INFINITY;
                this.maxY = Number.NEGATIVE_INFINITY;
            }
        }
        aabbCompute() {
            let minX = Number.POSITIVE_INFINITY, minY = Number.POSITIVE_INFINITY, maxX = Number.NEGATIVE_INFINITY, maxY = Number.NEGATIVE_INFINITY;
            let polygons = this.polygons;
            for (let i = 0, n = polygons.length; i < n; i++) {
                let polygon = polygons[i];
                let vertices = polygon;
                for (let ii = 0, nn = polygon.length; ii < nn; ii += 2) {
                    let x = vertices[ii];
                    let y = vertices[ii + 1];
                    minX = Math.min(minX, x);
                    minY = Math.min(minY, y);
                    maxX = Math.max(maxX, x);
                    maxY = Math.max(maxY, y);
                }
            }
            this.minX = minX;
            this.minY = minY;
            this.maxX = maxX;
            this.maxY = maxY;
        }
        aabbContainsPoint(x, y) {
            return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY;
        }
        aabbIntersectsSegment(x1, y1, x2, y2) {
            let minX = this.minX;
            let minY = this.minY;
            let maxX = this.maxX;
            let maxY = this.maxY;
            if ((x1 <= minX && x2 <= minX) || (y1 <= minY && y2 <= minY) || (x1 >= maxX && x2 >= maxX) || (y1 >= maxY && y2 >= maxY)) {
                return false;
            }
            let m = (y2 - y1) / (x2 - x1);
            let y = m * (minX - x1) + y1;
            if (y > minY && y < maxY) {
                return true;
            }
            y = m * (maxX - x1) + y1;
            if (y > minY && y < maxY) {
                return true;
            }
            let x = (minY - y1) / m + x1;
            if (x > minX && x < maxX) {
                return true;
            }
            x = (maxY - y1) / m + x1;
            if (x > minX && x < maxX) {
                return true;
            }
            return false;
        }
        aabbIntersectsSkeleton(bounds) {
            return this.minX < bounds.maxX && this.maxX > bounds.minX && this.minY < bounds.maxY && this.maxY > bounds.minY;
        }
        containsPoint(x, y) {
            let polygons = this.polygons;
            for (let i = 0, n = polygons.length; i < n; i++) {
                if (this.containsPointPolygon(polygons[i], x, y)) {
                    return this.boundingBoxes[i];
                }
            }
            return null;
        }
        containsPointPolygon(polygon, x, y) {
            let vertices = polygon;
            let nn = polygon.length;
            let prevIndex = nn - 2;
            let inside = false;
            for (let ii = 0; ii < nn; ii += 2) {
                let vertexY = vertices[ii + 1];
                let prevY = vertices[prevIndex + 1];
                if ((vertexY < y && prevY >= y) || (prevY < y && vertexY >= y)) {
                    let vertexX = vertices[ii];
                    if (vertexX + (y - vertexY) / (prevY - vertexY) * (vertices[prevIndex] - vertexX) < x) {
                        inside = !inside;
                    }
                }
                prevIndex = ii;
            }
            return inside;
        }
        intersectsSegment(x1, y1, x2, y2) {
            let polygons = this.polygons;
            for (let i = 0, n = polygons.length; i < n; i++) {
                if (this.intersectsSegmentPolygon(polygons[i], x1, y1, x2, y2)) {
                    return this.boundingBoxes[i];
                }
            }
            return null;
        }
        intersectsSegmentPolygon(polygon, x1, y1, x2, y2) {
            let vertices = polygon;
            let nn = polygon.length;
            let width12 = x1 - x2, height12 = y1 - y2;
            let det1 = x1 * y2 - y1 * x2;
            let x3 = vertices[nn - 2], y3 = vertices[nn - 1];
            for (let ii = 0; ii < nn; ii += 2) {
                let x4 = vertices[ii], y4 = vertices[ii + 1];
                let det2 = x3 * y4 - y3 * x4;
                let width34 = x3 - x4, height34 = y3 - y4;
                let det3 = width12 * height34 - height12 * width34;
                let x = (det1 * width34 - width12 * det2) / det3;
                if (((x >= x3 && x <= x4) || (x >= x4 && x <= x3)) && ((x >= x1 && x <= x2) || (x >= x2 && x <= x1))) {
                    let y = (det1 * height34 - height12 * det2) / det3;
                    if (((y >= y3 && y <= y4) || (y >= y4 && y <= y3)) && ((y >= y1 && y <= y2) || (y >= y2 && y <= y1))) {
                        return true;
                    }
                }
                x3 = x4;
                y3 = y4;
            }
            return false;
        }
        getPolygon(boundingBox) {
            if (boundingBox == null) {
                throw new Error("boundingBox cannot be null.");
            }
            let index = this.boundingBoxes.indexOf(boundingBox);
            return index == -1 ? null : this.polygons[index];
        }
        getWidth() {
            return this.maxX - this.minX;
        }
        getHeight() {
            return this.maxY - this.minY;
        }
    }
    spine.SkeletonBounds = SkeletonBounds;
})(spine || (spine = {}));
//# sourceMappingURL=SkeletonBounds.js.map
var spine;
(function (spine) {
    class SkeletonBinary {
        constructor(attachmentLoader) {
            this.scale = 1;
            this.linkedMeshes = new Array();
            this._isHaveClip = false;
            this.attachmentLoader = attachmentLoader;
        }
        get isHaveClip() {
            return this._isHaveClip;
        }
        readSkeletonData(binary) {
            let scale = this.scale;
            let skeletonData = new spine.SkeletonData();
            skeletonData.name = "";
            let input = new BinaryInput(binary);
            skeletonData.hash = input.readString();
            skeletonData.version = input.readString();
            skeletonData.width = input.readFloat();
            skeletonData.height = input.readFloat();
            let nonessential = input.readBoolean();
            if (nonessential) {
                skeletonData.fps = input.readFloat();
                skeletonData.imagesPath = input.readString();
                if (skeletonData.imagesPath == "") {
                    skeletonData.imagesPath = null;
                }
            }
            let n = 0;
            n = input.readInt(true);
            for (let i = 0; i < n; i++) {
                let name = input.readString();
                let parent = i == 0 ? null : skeletonData.bones[input.readInt(true)];
                let data = new spine.BoneData(i, name, parent);
                data.rotation = input.readFloat();
                data.x = input.readFloat() * scale;
                data.y = input.readFloat() * scale;
                data.scaleX = input.readFloat();
                data.scaleY = input.readFloat();
                data.shearX = input.readFloat();
                data.shearY = input.readFloat();
                data.length = input.readFloat() * scale;
                data.transformMode = SkeletonBinary.TransformModeValues[input.readInt(true)];
                if (nonessential) {
                    spine.Color.rgba8888ToColor(data.color, input.readInt32());
                }
                skeletonData.bones.push(data);
            }
            n = input.readInt(true);
            for (let i = 0; i < n; i++) {
                let slotName = input.readString();
                let boneData = skeletonData.bones[input.readInt(true)];
                let data = new spine.SlotData(i, slotName, boneData);
                spine.Color.rgba8888ToColor(data.color, input.readInt32());
                let darkColor = input.readInt32();
                if (darkColor != -1) {
                    spine.Color.rgb888ToColor(data.darkColor = new spine.Color(), darkColor);
                }
                data.attachmentName = input.readString();
                var blendModeValue = input.readInt(true);
                if (spine.FlypineSetting.isOpenBlend == false) {
                    blendModeValue = 0;
                }
                data.blendMode = SkeletonBinary.BlendModeValues[blendModeValue];
                if (data.blendMode != spine.BlendMode.Normal) {
                }
                skeletonData.slots.push(data);
            }
            n = input.readInt(true);
            for (let i = 0, nn; i < n; i++) {
                let data = new spine.IkConstraintData(input.readString());
                data.order = input.readInt(true);
                nn = input.readInt(true);
                for (let ii = 0; ii < nn; ii++) {
                    data.bones.push(skeletonData.bones[input.readInt(true)]);
                }
                data.target = skeletonData.bones[input.readInt(true)];
                data.mix = input.readFloat();
                data.bendDirection = input.readByte();
                skeletonData.ikConstraints.push(data);
            }
            n = input.readInt(true);
            for (let i = 0, nn; i < n; i++) {
                let data = new spine.TransformConstraintData(input.readString());
                data.order = input.readInt(true);
                nn = input.readInt(true);
                for (let ii = 0; ii < nn; ii++) {
                    data.bones.push(skeletonData.bones[input.readInt(true)]);
                }
                data.target = skeletonData.bones[input.readInt(true)];
                data.local = input.readBoolean();
                data.relative = input.readBoolean();
                data.offsetRotation = input.readFloat();
                data.offsetX = input.readFloat() * scale;
                data.offsetY = input.readFloat() * scale;
                data.offsetScaleX = input.readFloat();
                data.offsetScaleY = input.readFloat();
                data.offsetShearY = input.readFloat();
                data.rotateMix = input.readFloat();
                data.translateMix = input.readFloat();
                data.scaleMix = input.readFloat();
                data.shearMix = input.readFloat();
                skeletonData.transformConstraints.push(data);
            }
            n = input.readInt(true);
            for (let i = 0, nn; i < n; i++) {
                let data = new spine.PathConstraintData(input.readString());
                data.order = input.readInt(true);
                nn = input.readInt(true);
                for (let ii = 0; ii < nn; ii++) {
                    data.bones.push(skeletonData.bones[input.readInt(true)]);
                }
                data.target = skeletonData.slots[input.readInt(true)];
                data.positionMode = SkeletonBinary.PositionModeValues[input.readInt(true)];
                data.spacingMode = SkeletonBinary.SpacingModeValues[input.readInt(true)];
                data.rotateMode = SkeletonBinary.RotateModeValues[input.readInt(true)];
                data.offsetRotation = input.readFloat();
                data.position = input.readFloat();
                if (data.positionMode == spine.PositionMode.Fixed) {
                    data.position *= scale;
                }
                data.spacing = input.readFloat();
                if (data.spacingMode == spine.SpacingMode.Length || data.spacingMode == spine.SpacingMode.Fixed) {
                    data.spacing *= scale;
                }
                data.rotateMix = input.readFloat();
                data.translateMix = input.readFloat();
                skeletonData.pathConstraints.push(data);
            }
            var defaultSkin = this.readSkin(input, skeletonData, "default", nonessential);
            if (defaultSkin != null) {
                skeletonData.defaultSkin = defaultSkin;
                skeletonData.skins.push(defaultSkin);
            }
            for (let i = 0, n = input.readInt(true); i < n; i++) {
                skeletonData.skins.push(this.readSkin(input, skeletonData, input.readString(), nonessential));
            }
            n = this.linkedMeshes.length;
            for (let i = 0; i < n; i++) {
                let linkedMesh = this.linkedMeshes[i];
                let skin = linkedMesh.skin == null ? skeletonData.defaultSkin : skeletonData.findSkin(linkedMesh.skin);
                if (skin == null) {
                    throw new Error("Skin not found: " + linkedMesh.skin);
                }
                let parent = skin.getAttachment(linkedMesh.slotIndex, linkedMesh.parent);
                if (parent == null) {
                    throw new Error("Parent mesh not found: " + linkedMesh.parent);
                }
                linkedMesh.mesh.setParentMesh(parent);
                linkedMesh.mesh.updateUVs();
            }
            this.linkedMeshes.length = 0;
            n = input.readInt(true);
            for (let i = 0; i < n; i++) {
                let data = new spine.EventData(input.readString());
                data.intValue = input.readInt(false);
                data.floatValue = input.readFloat();
                data.stringValue = input.readString();
                skeletonData.events.push(data);
            }
            n = input.readInt(true);
            for (let i = 0; i < n; i++) {
                var ani = this.readAnimation(input, input.readString(), skeletonData);
                skeletonData.addAnimation(ani);
            }
            return skeletonData;
        }
        readSkin(input, skeletonData, skinName, nonessential) {
            let slotCount = input.readInt(true);
            if (slotCount == 0) {
                return null;
            }
            var skin = new spine.Skin(skinName);
            for (let i = 0; i < slotCount; i++) {
                let slotIndex = input.readInt(true);
                for (let ii = 0, nn = input.readInt(true); ii < nn; ii++) {
                    let name = input.readString();
                    if (name.indexOf("lx") != -1) {
                        let a = 1;
                    }
                    var attachment = this.readAttachment(input, skeletonData, skin, slotIndex, name, nonessential);
                    if (attachment != null) {
                        skin.addAttachment(slotIndex, name, attachment);
                    }
                }
            }
            return skin;
        }
        readAttachment(input, skeletonData, skin, slotIndex, attachmentName, nonessential) {
            let scale = this.scale;
            let name = input.readString();
            if (name == null) {
                name = attachmentName;
            }
            let typeIndex = input.readByte();
            let type = SkeletonBinary.AttachmentTypeValues[typeIndex];
            switch (type) {
                case spine.AttachmentType.Region: {
                    let path = input.readStringRef();
                    let rotation = input.readFloat();
                    let x = input.readFloat();
                    let y = input.readFloat();
                    let scaleX = input.readFloat();
                    let scaleY = input.readFloat();
                    let width = input.readFloat();
                    let height = input.readFloat();
                    let color = input.readInt32();
                    if (path == null) {
                        path = name;
                    }
                    let region = this.attachmentLoader.newRegionAttachment(skin, name, path);
                    if (region == null) {
                        return null;
                    }
                    region.path = path;
                    region.x = x * scale;
                    region.y = y * scale;
                    region.scaleX = scaleX;
                    region.scaleY = scaleY;
                    region.rotation = rotation;
                    region.width = width * scale;
                    region.height = height * scale;
                    spine.Color.rgba8888ToColor(region.color, color);
                    region.updateOffset();
                    return region;
                }
                case spine.AttachmentType.BoundingBox: {
                    let vertexCount = input.readInt(true);
                    let vertices = this.readVertices(input, vertexCount);
                    let color = nonessential ? input.readInt32() : 0;
                    let box = this.attachmentLoader.newBoundingBoxAttachment(skin, name);
                    if (box == null) {
                        return null;
                    }
                    box.worldVerticesLength = vertexCount << 1;
                    box.vertices = vertices.vertices;
                    box.bones = vertices.bones;
                    if (nonessential) {
                        spine.Color.rgba8888ToColor(box.color, color);
                    }
                    return box;
                }
                case spine.AttachmentType.Mesh: {
                    let path = input.readStringRef();
                    if (path == null) {
                        path = name;
                    }
                    if (path == "effect/shui21") {
                        let a = 1;
                    }
                    let color = input.readInt32();
                    let vertexCount = input.readInt(true);
                    let uvs = this.readFloatArray(input, vertexCount << 1, 1);
                    let triangles = this.readShortArray(input);
                    let vertices = this.readVertices(input, vertexCount);
                    let hullLength = input.readInt(true);
                    let edges = null;
                    let width = 0, height = 0;
                    if (nonessential) {
                        edges = this.readShortArray(input);
                        width = input.readFloat();
                        height = input.readFloat();
                    }
                    let mesh = this.attachmentLoader.newMeshAttachment(skin, name, path);
                    if (mesh == null) {
                        return null;
                    }
                    mesh.path = path;
                    spine.Color.rgba8888ToColor(mesh.color, color);
                    mesh.bones = vertices.bones;
                    mesh.vertices = vertices.vertices;
                    mesh.worldVerticesLength = vertexCount << 1;
                    mesh.triangles = triangles;
                    mesh.regionUVs = uvs;
                    mesh.updateUVs();
                    mesh.hullLength = hullLength << 1;
                    if (nonessential) {
                        mesh.edges = edges;
                        mesh.width = width * scale;
                        mesh.height = height * scale;
                    }
                    return mesh;
                }
                case spine.AttachmentType.LinkedMesh: {
                    let path = input.readStringRef();
                    let color = input.readInt32();
                    let skinName = input.readStringRef();
                    let parent = input.readStringRef();
                    let inheritDeform = input.readBoolean();
                    let width = 0, height = 0;
                    if (nonessential) {
                        width = input.readFloat();
                        height = input.readFloat();
                    }
                    if (path == null) {
                        path = name;
                    }
                    let mesh = this.attachmentLoader.newMeshAttachment(skin, name, path);
                    if (mesh == null) {
                        return null;
                    }
                    mesh.path = path;
                    spine.Color.rgba8888ToColor(mesh.color, color);
                    if (nonessential) {
                        mesh.width = width * scale;
                        mesh.height = height * scale;
                    }
                    this.linkedMeshes.push(new LinkedMesh(mesh, skinName, slotIndex, parent, inheritDeform));
                    return mesh;
                }
                case spine.AttachmentType.Path: {
                    let closed = input.readBoolean();
                    let constantSpeed = input.readBoolean();
                    let vertexCount = input.readInt(true);
                    let vertices = this.readVertices(input, vertexCount);
                    let lengths = spine.Utils.newArray(vertexCount / 3, 0);
                    for (let i = 0, n = lengths.length; i < n; i++) {
                        lengths[i] = input.readFloat() * scale;
                    }
                    let color = nonessential ? input.readInt32() : 0;
                    let path = this.attachmentLoader.newPathAttachment(skin, name);
                    if (path == null) {
                        return null;
                    }
                    path.closed = closed;
                    path.constantSpeed = constantSpeed;
                    path.worldVerticesLength = vertexCount << 1;
                    path.vertices = vertices.vertices;
                    path.bones = vertices.bones;
                    path.lengths = lengths;
                    if (nonessential) {
                        spine.Color.rgba8888ToColor(path.color, color);
                    }
                    return path;
                }
                case spine.AttachmentType.Point: {
                    let rotation = input.readFloat();
                    let x = input.readFloat();
                    let y = input.readFloat();
                    let color = nonessential ? input.readInt32() : 0;
                    let point = this.attachmentLoader.newPointAttachment(skin, name);
                    if (point == null) {
                        return null;
                    }
                    point.x = x * scale;
                    point.y = y * scale;
                    point.rotation = rotation;
                    if (nonessential) {
                        spine.Color.rgba8888ToColor(point.color, color);
                    }
                    return point;
                }
                case spine.AttachmentType.Clipping: {
                    let endSlotIndex = input.readInt(true);
                    let vertexCount = input.readInt(true);
                    let vertices = this.readVertices(input, vertexCount);
                    let color = nonessential ? input.readInt32() : 0;
                    let clip = this.attachmentLoader.newClippingAttachment(skin, name);
                    if (clip == null) {
                        return null;
                    }
                    clip.endSlot = skeletonData.slots[endSlotIndex];
                    clip.worldVerticesLength = vertexCount << 1;
                    clip.vertices = vertices.vertices;
                    clip.bones = vertices.bones;
                    if (nonessential) {
                        spine.Color.rgba8888ToColor(clip.color, color);
                    }
                    this._isHaveClip = true;
                    return clip;
                }
            }
            return null;
        }
        readVertices(input, vertexCount) {
            let verticesLength = vertexCount << 1;
            let vertices = new Vertices();
            let scale = this.scale;
            if (!input.readBoolean()) {
                vertices.vertices = this.readFloatArray(input, verticesLength, scale);
                return vertices;
            }
            let weights = new Array();
            let bonesArray = new Array();
            for (let i = 0; i < vertexCount; i++) {
                let boneCount = input.readInt(true);
                bonesArray.push(boneCount);
                for (let ii = 0; ii < boneCount; ii++) {
                    bonesArray.push(input.readInt(true));
                    weights.push(input.readFloat() * scale);
                    weights.push(input.readFloat() * scale);
                    weights.push(input.readFloat());
                }
            }
            vertices.vertices = spine.Utils.toFloatArray(weights);
            vertices.bones = bonesArray;
            return vertices;
        }
        readFloatArray(input, n, scale) {
            let array = new Array(n);
            if (scale == 1) {
                for (let i = 0; i < n; i++) {
                    array[i] = input.readFloat();
                }
            }
            else {
                for (let i = 0; i < n; i++) {
                    array[i] = input.readFloat() * scale;
                }
            }
            return array;
        }
        readShortArray(input) {
            let n = input.readInt(true);
            let array = new Array(n);
            for (let i = 0; i < n; i++) {
                array[i] = input.readShort();
            }
            return array;
        }
        readUint16Array(input) {
            let n = input.readInt(true);
            let array = new Uint16Array(n);
            for (let i = 0; i < n; i++) {
                array[i] = input.readShort();
            }
            return array;
        }
        readAnimation(input, name, skeletonData) {
            let timelines = new Array();
            let scale = this.scale;
            let duration = 0;
            let tempColor1 = new spine.Color();
            let tempColor2 = new spine.Color();
            for (let i = 0, n = input.readInt(true); i < n; i++) {
                let slotIndex = input.readInt(true);
                for (let ii = 0, nn = input.readInt(true); ii < nn; ii++) {
                    let timelineType = input.readByte();
                    let frameCount = input.readInt(true);
                    switch (timelineType) {
                        case SkeletonBinary.SLOT_ATTACHMENT: {
                            let timeline = new spine.AttachmentTimeline(frameCount);
                            timeline.slotIndex = slotIndex;
                            for (let frameIndex = 0; frameIndex < frameCount; frameIndex++) {
                                timeline.setFrame(frameIndex, input.readFloat(), input.readStringRef());
                            }
                            timelines.push(timeline);
                            duration = Math.max(duration, timeline.frames[frameCount - 1]);
                            break;
                        }
                        case SkeletonBinary.SLOT_COLOR: {
                            let timeline = new spine.ColorTimeline(frameCount);
                            timeline.slotIndex = slotIndex;
                            for (let frameIndex = 0; frameIndex < frameCount; frameIndex++) {
                                let time = input.readFloat();
                                spine.Color.rgba8888ToColor(tempColor1, input.readInt32());
                                timeline.setFrame(frameIndex, time, tempColor1.r, tempColor1.g, tempColor1.b, tempColor1.a);
                                if (frameIndex < frameCount - 1) {
                                    this.readCurve(input, frameIndex, timeline);
                                }
                            }
                            timelines.push(timeline);
                            duration = Math.max(duration, timeline.frames[(frameCount - 1) * spine.ColorTimeline.ENTRIES]);
                            break;
                        }
                        case SkeletonBinary.SLOT_TWO_COLOR: {
                            let timeline = new spine.TwoColorTimeline(frameCount);
                            timeline.slotIndex = slotIndex;
                            for (let frameIndex = 0; frameIndex < frameCount; frameIndex++) {
                                let time = input.readFloat();
                                spine.Color.rgba8888ToColor(tempColor1, input.readInt32());
                                spine.Color.rgb888ToColor(tempColor2, input.readInt32());
                                timeline.setFrame(frameIndex, time, tempColor1.r, tempColor1.g, tempColor1.b, tempColor1.a, tempColor2.r, tempColor2.g, tempColor2.b);
                                if (frameIndex < frameCount - 1) {
                                    this.readCurve(input, frameIndex, timeline);
                                }
                            }
                            timelines.push(timeline);
                            duration = Math.max(duration, timeline.frames[(frameCount - 1) * spine.TwoColorTimeline.ENTRIES]);
                            break;
                        }
                    }
                }
            }
            for (let i = 0, n = input.readInt(true); i < n; i++) {
                let boneIndex = input.readInt(true);
                for (let ii = 0, nn = input.readInt(true); ii < nn; ii++) {
                    let timelineType = input.readByte();
                    let frameCount = input.readInt(true);
                    switch (timelineType) {
                        case SkeletonBinary.BONE_ROTATE: {
                            let timeline = new spine.RotateTimeline(frameCount);
                            timeline.boneIndex = boneIndex;
                            for (let frameIndex = 0; frameIndex < frameCount; frameIndex++) {
                                timeline.setFrame(frameIndex, input.readFloat(), input.readFloat());
                                if (frameIndex < frameCount - 1) {
                                    this.readCurve(input, frameIndex, timeline);
                                }
                            }
                            timelines.push(timeline);
                            duration = Math.max(duration, timeline.frames[(frameCount - 1) * spine.RotateTimeline.ENTRIES]);
                            break;
                        }
                        case SkeletonBinary.BONE_TRANSLATE:
                        case SkeletonBinary.BONE_SCALE:
                        case SkeletonBinary.BONE_SHEAR: {
                            let timeline;
                            let timelineScale = 1;
                            if (timelineType == SkeletonBinary.BONE_SCALE) {
                                timeline = new spine.ScaleTimeline(frameCount);
                            }
                            else if (timelineType == SkeletonBinary.BONE_SHEAR) {
                                timeline = new spine.ShearTimeline(frameCount);
                            }
                            else {
                                timeline = new spine.TranslateTimeline(frameCount);
                                timelineScale = scale;
                            }
                            timeline.boneIndex = boneIndex;
                            for (let frameIndex = 0; frameIndex < frameCount; frameIndex++) {
                                timeline.setFrame(frameIndex, input.readFloat(), input.readFloat() * timelineScale, input.readFloat() * timelineScale);
                                if (frameIndex < frameCount - 1) {
                                    this.readCurve(input, frameIndex, timeline);
                                }
                            }
                            timelines.push(timeline);
                            duration = Math.max(duration, timeline.frames[(frameCount - 1) * spine.TranslateTimeline.ENTRIES]);
                            break;
                        }
                    }
                }
            }
            for (let i = 0, n = input.readInt(true); i < n; i++) {
                let index = input.readInt(true);
                let frameCount = input.readInt(true);
                let timeline = new spine.IkConstraintTimeline(frameCount);
                timeline.ikConstraintIndex = index;
                for (let frameIndex = 0; frameIndex < frameCount; frameIndex++) {
                    timeline.setFrame(frameIndex, input.readFloat(), input.readFloat(), input.readByte());
                    if (frameIndex < frameCount - 1) {
                        this.readCurve(input, frameIndex, timeline);
                    }
                }
                timelines.push(timeline);
                duration = Math.max(duration, timeline.frames[(frameCount - 1) * spine.IkConstraintTimeline.ENTRIES]);
            }
            for (let i = 0, n = input.readInt(true); i < n; i++) {
                let index = input.readInt(true);
                let frameCount = input.readInt(true);
                let timeline = new spine.TransformConstraintTimeline(frameCount);
                timeline.transformConstraintIndex = index;
                for (let frameIndex = 0; frameIndex < frameCount; frameIndex++) {
                    timeline.setFrame(frameIndex, input.readFloat(), input.readFloat(), input.readFloat(), input.readFloat(), input.readFloat());
                    if (frameIndex < frameCount - 1) {
                        this.readCurve(input, frameIndex, timeline);
                    }
                }
                timelines.push(timeline);
                duration = Math.max(duration, timeline.frames[(frameCount - 1) * spine.TransformConstraintTimeline.ENTRIES]);
            }
            for (let i = 0, n = input.readInt(true); i < n; i++) {
                let index = input.readInt(true);
                let data = skeletonData.pathConstraints[index];
                for (let ii = 0, nn = input.readInt(true); ii < nn; ii++) {
                    let timelineType = input.readByte();
                    let frameCount = input.readInt(true);
                    switch (timelineType) {
                        case SkeletonBinary.PATH_POSITION:
                        case SkeletonBinary.PATH_SPACING: {
                            let timeline;
                            let timelineScale = 1;
                            if (timelineType == SkeletonBinary.PATH_SPACING) {
                                timeline = new spine.PathConstraintSpacingTimeline(frameCount);
                                if (data.spacingMode == spine.SpacingMode.Length || data.spacingMode == spine.SpacingMode.Fixed) {
                                    timelineScale = scale;
                                }
                            }
                            else {
                                timeline = new spine.PathConstraintPositionTimeline(frameCount);
                                if (data.positionMode == spine.PositionMode.Fixed) {
                                    timelineScale = scale;
                                }
                            }
                            timeline.pathConstraintIndex = index;
                            for (let frameIndex = 0; frameIndex < frameCount; frameIndex++) {
                                timeline.setFrame(frameIndex, input.readFloat(), input.readFloat() * timelineScale);
                                if (frameIndex < frameCount - 1) {
                                    this.readCurve(input, frameIndex, timeline);
                                }
                            }
                            timelines.push(timeline);
                            duration = Math.max(duration, timeline.frames[(frameCount - 1) * spine.PathConstraintPositionTimeline.ENTRIES]);
                            break;
                        }
                        case SkeletonBinary.PATH_MIX: {
                            let timeline = new spine.PathConstraintMixTimeline(frameCount);
                            timeline.pathConstraintIndex = index;
                            for (let frameIndex = 0; frameIndex < frameCount; frameIndex++) {
                                timeline.setFrame(frameIndex, input.readFloat(), input.readFloat(), input.readFloat());
                                if (frameIndex < frameCount - 1) {
                                    this.readCurve(input, frameIndex, timeline);
                                }
                            }
                            timelines.push(timeline);
                            duration = Math.max(duration, timeline.frames[(frameCount - 1) * spine.PathConstraintMixTimeline.ENTRIES]);
                            break;
                        }
                    }
                }
            }
            for (let i = 0, n = input.readInt(true); i < n; i++) {
                let skin = skeletonData.skins[input.readInt(true)];
                for (let ii = 0, nn = input.readInt(true); ii < nn; ii++) {
                    let slotIndex = input.readInt(true);
                    for (let iii = 0, nnn = input.readInt(true); iii < nnn; iii++) {
                        var attachName = input.readString();
                        let attachment = skin.getAttachment(slotIndex, attachName);
                        let weighted = attachment.bones != null;
                        let vertices = attachment.vertices;
                        let deformLength = weighted ? vertices.length / 3 * 2 : vertices.length;
                        let frameCount = input.readInt(true);
                        let timeline = new spine.DeformTimeline(frameCount);
                        timeline.slotIndex = slotIndex;
                        timeline.attachment = attachment;
                        for (let frameIndex = 0; frameIndex < frameCount; frameIndex++) {
                            let time = input.readFloat();
                            let deform;
                            let end = input.readInt(true);
                            if (end == 0) {
                                deform = weighted ? spine.Utils.newFloatArray(deformLength) : vertices;
                            }
                            else {
                                deform = spine.Utils.newFloatArray(deformLength);
                                let start = input.readInt(true);
                                end += start;
                                if (scale == 1) {
                                    for (let v = start; v < end; v++) {
                                        deform[v] = input.readFloat();
                                    }
                                }
                                else {
                                    for (let v = start; v < end; v++) {
                                        deform[v] = input.readFloat() * scale;
                                    }
                                }
                                if (!weighted) {
                                    for (let v = 0, vn = deform.length; v < vn; v++) {
                                        deform[v] += vertices[v];
                                    }
                                }
                            }
                            timeline.setFrame(frameIndex, time, deform);
                            if (frameIndex < frameCount - 1) {
                                this.readCurve(input, frameIndex, timeline);
                            }
                        }
                        timelines.push(timeline);
                        duration = Math.max(duration, timeline.frames[frameCount - 1]);
                    }
                }
            }
            let drawOrderCount = input.readInt(true);
            if (drawOrderCount > 0) {
                let timeline = new spine.DrawOrderTimeline(drawOrderCount);
                let slotCount = skeletonData.slots.length;
                for (let i = 0; i < drawOrderCount; i++) {
                    let time = input.readFloat();
                    let offsetCount = input.readInt(true);
                    let drawOrder = spine.Utils.newArray(slotCount, 0);
                    for (let ii = slotCount - 1; ii >= 0; ii--) {
                        drawOrder[ii] = -1;
                    }
                    let unchanged = spine.Utils.newArray(slotCount - offsetCount, 0);
                    let originalIndex = 0, unchangedIndex = 0;
                    for (let ii = 0; ii < offsetCount; ii++) {
                        let slotIndex = input.readInt(true);
                        while (originalIndex != slotIndex) {
                            unchanged[unchangedIndex++] = originalIndex++;
                        }
                        drawOrder[originalIndex + input.readInt(true)] = originalIndex++;
                    }
                    while (originalIndex < slotCount) {
                        unchanged[unchangedIndex++] = originalIndex++;
                    }
                    for (let ii = slotCount - 1; ii >= 0; ii--) {
                        if (drawOrder[ii] == -1) {
                            drawOrder[ii] = unchanged[--unchangedIndex];
                        }
                    }
                    timeline.setFrame(i, time, drawOrder);
                }
                timelines.push(timeline);
                duration = Math.max(duration, timeline.frames[drawOrderCount - 1]);
            }
            let eventCount = input.readInt(true);
            let eventTimeline;
            if (eventCount > 0) {
                eventTimeline = new spine.EventTimeline(eventCount);
                for (let i = 0; i < eventCount; i++) {
                    let time = input.readFloat();
                    let eventData = skeletonData.events[input.readInt(true)];
                    let event = new spine.Event(time, eventData);
                    event.intValue = input.readInt(false);
                    event.floatValue = input.readFloat();
                    event.stringValue = input.readBoolean() ? input.readString() : eventData.stringValue;
                    eventTimeline.setFrame(i, event);
                }
                timelines.push(eventTimeline);
                duration = Math.max(duration, eventTimeline.frames[eventCount - 1]);
            }
            return new spine.Animation(name, timelines, duration, eventTimeline);
        }
        readCurve(input, frameIndex, timeline) {
            switch (input.readByte()) {
                case SkeletonBinary.CURVE_STEPPED:
                    timeline.setStepped(frameIndex);
                    break;
                case SkeletonBinary.CURVE_BEZIER:
                    this.setCurve(timeline, frameIndex, input.readFloat(), input.readFloat(), input.readFloat(), input.readFloat());
                    break;
            }
        }
        setCurve(timeline, frameIndex, cx1, cy1, cx2, cy2) {
            timeline.setCurve(frameIndex, cx1, cy1, cx2, cy2);
        }
    }
    SkeletonBinary.AttachmentTypeValues = [0, 1, 2, 3, 4, 5, 6];
    SkeletonBinary.TransformModeValues = [spine.TransformMode.Normal, spine.TransformMode.OnlyTranslation, spine.TransformMode.NoRotationOrReflection, spine.TransformMode.NoScale, spine.TransformMode.NoScaleOrReflection];
    SkeletonBinary.PositionModeValues = [spine.PositionMode.Fixed, spine.PositionMode.Percent];
    SkeletonBinary.SpacingModeValues = [spine.SpacingMode.Length, spine.SpacingMode.Fixed, spine.SpacingMode.Percent];
    SkeletonBinary.RotateModeValues = [spine.RotateMode.Tangent, spine.RotateMode.Chain, spine.RotateMode.ChainScale];
    SkeletonBinary.BlendModeValues = [spine.BlendMode.Normal, spine.BlendMode.Additive, spine.BlendMode.Multiply, spine.BlendMode.Screen];
    SkeletonBinary.BONE_ROTATE = 0;
    SkeletonBinary.BONE_TRANSLATE = 1;
    SkeletonBinary.BONE_SCALE = 2;
    SkeletonBinary.BONE_SHEAR = 3;
    SkeletonBinary.SLOT_ATTACHMENT = 0;
    SkeletonBinary.SLOT_COLOR = 1;
    SkeletonBinary.SLOT_TWO_COLOR = 2;
    SkeletonBinary.PATH_POSITION = 0;
    SkeletonBinary.PATH_SPACING = 1;
    SkeletonBinary.PATH_MIX = 2;
    SkeletonBinary.CURVE_LINEAR = 0;
    SkeletonBinary.CURVE_STEPPED = 1;
    SkeletonBinary.CURVE_BEZIER = 2;
    spine.SkeletonBinary = SkeletonBinary;
    class BinaryInput {
        constructor(data) {
            this.strings = new Array();
            this.index = 0;
            this.buffer = new DataView(data.buffer);
            this.index = data.byteOffset;
        }
        readByte() {
            return this.buffer.getInt8(this.index++);
        }
        readShort() {
            let value = this.buffer.getInt16(this.index);
            this.index += 2;
            return value;
        }
        readInt32() {
            let value = this.buffer.getInt32(this.index);
            this.index += 4;
            return value;
        }
        readInt(optimizePositive) {
            let b = this.readByte();
            let result = b & 0x7F;
            if ((b & 0x80) != 0) {
                b = this.readByte();
                result |= (b & 0x7F) << 7;
                if ((b & 0x80) != 0) {
                    b = this.readByte();
                    result |= (b & 0x7F) << 14;
                    if ((b & 0x80) != 0) {
                        b = this.readByte();
                        result |= (b & 0x7F) << 21;
                        if ((b & 0x80) != 0) {
                            b = this.readByte();
                            result |= (b & 0x7F) << 28;
                        }
                    }
                }
            }
            return optimizePositive ? result : ((result >>> 1) ^ -(result & 1));
        }
        readStringRef() {
            return this.readString();
        }
        readString() {
            let byteCount = this.readInt(true);
            switch (byteCount) {
                case 0:
                    return null;
                case 1:
                    return "";
            }
            byteCount--;
            let chars = "";
            let charCount = 0;
            for (let i = 0; i < byteCount;) {
                let b = this.readByte();
                switch (b >> 4) {
                    case 12:
                    case 13:
                        chars += String.fromCharCode(((b & 0x1F) << 6 | this.readByte() & 0x3F));
                        i += 2;
                        break;
                    case 14:
                        chars += String.fromCharCode(((b & 0x0F) << 12 | (this.readByte() & 0x3F) << 6 | this.readByte() & 0x3F));
                        i += 3;
                        break;
                    default:
                        chars += String.fromCharCode(b);
                        i++;
                }
            }
            return chars;
        }
        readFloat() {
            let value = this.buffer.getFloat32(this.index);
            this.index += 4;
            return value;
        }
        readBoolean() {
            return this.readByte() != 0;
        }
    }
    class LinkedMesh {
        constructor(mesh, skin, slotIndex, parent, inheritDeform) {
            this.mesh = mesh;
            this.skin = skin;
            this.slotIndex = slotIndex;
            this.parent = parent;
            this.inheritDeform = inheritDeform;
        }
    }
    class Vertices {
        constructor(bones = null, vertices = null) {
            this.bones = bones;
            this.vertices = vertices;
        }
    }
})(spine || (spine = {}));
//# sourceMappingURL=SkeletonBinary.js.map
var spine;
(function (spine) {
    class Skeleton {
        constructor(data) {
            this._updateCache = new Array();
            this.updateCacheReset = new Array();
            this.time = 0;
            this.flipX = false;
            this.flipY = false;
            this.x = 0;
            this.y = 0;
            if (data == null) {
                throw new Error("data cannot be null.");
            }
            this.data = data;
            this.bones = new Array();
            for (let i = 0; i < data.bones.length; i++) {
                let boneData = data.bones[i];
                let bone;
                if (boneData.parent == null) {
                    bone = new spine.Bone(boneData, this, null);
                }
                else {
                    let parent = this.bones[boneData.parent.index];
                    bone = new spine.Bone(boneData, this, parent);
                    parent.children.push(bone);
                }
                this.bones.push(bone);
            }
            this.slots = new Array();
            this.drawOrder = new Array();
            for (let i = 0; i < data.slots.length; i++) {
                let slotData = data.slots[i];
                let bone = this.bones[slotData.boneData.index];
                let slot = new spine.Slot(slotData, bone);
                this.slots.push(slot);
                this.drawOrder.push(slot);
            }
            this.ikConstraints = new Array();
            for (let i = 0; i < data.ikConstraints.length; i++) {
                let ikConstraintData = data.ikConstraints[i];
                this.ikConstraints.push(new spine.IkConstraint(ikConstraintData, this));
            }
            this.transformConstraints = new Array();
            for (let i = 0; i < data.transformConstraints.length; i++) {
                let transformConstraintData = data.transformConstraints[i];
                this.transformConstraints.push(new spine.TransformConstraint(transformConstraintData, this));
            }
            this.pathConstraints = new Array();
            for (let i = 0; i < data.pathConstraints.length; i++) {
                let pathConstraintData = data.pathConstraints[i];
                this.pathConstraints.push(new spine.PathConstraint(pathConstraintData, this));
            }
            this.color = new spine.Color(1, 1, 1, 1);
            this.updateCache();
        }
        updateCache() {
            let updateCache = this._updateCache;
            updateCache.length = 0;
            this.updateCacheReset.length = 0;
            let bones = this.bones;
            for (let i = 0, n = bones.length; i < n; i++) {
                bones[i].sorted = false;
            }
            let ikConstraints = this.ikConstraints;
            let transformConstraints = this.transformConstraints;
            let pathConstraints = this.pathConstraints;
            let ikCount = ikConstraints.length, transformCount = transformConstraints.length, pathCount = pathConstraints.length;
            let constraintCount = ikCount + transformCount + pathCount;
            outer: for (let i = 0; i < constraintCount; i++) {
                for (let ii = 0; ii < ikCount; ii++) {
                    let constraint = ikConstraints[ii];
                    if (constraint.data.order == i) {
                        this.sortIkConstraint(constraint);
                        continue outer;
                    }
                }
                for (let ii = 0; ii < transformCount; ii++) {
                    let constraint = transformConstraints[ii];
                    if (constraint.data.order == i) {
                        this.sortTransformConstraint(constraint);
                        continue outer;
                    }
                }
                for (let ii = 0; ii < pathCount; ii++) {
                    let constraint = pathConstraints[ii];
                    if (constraint.data.order == i) {
                        this.sortPathConstraint(constraint);
                        continue outer;
                    }
                }
            }
            for (let i = 0, n = bones.length; i < n; i++) {
                this.sortBone(bones[i]);
            }
        }
        sortIkConstraint(constraint) {
            let target = constraint.target;
            this.sortBone(target);
            let constrained = constraint.bones;
            let parent = constrained[0];
            this.sortBone(parent);
            if (constrained.length > 1) {
                let child = constrained[constrained.length - 1];
                if (!(this._updateCache.indexOf(child) > -1)) {
                    this.updateCacheReset.push(child);
                }
            }
            this._updateCache.push(constraint);
            this.sortReset(parent.children);
            constrained[constrained.length - 1].sorted = true;
        }
        sortPathConstraint(constraint) {
            let slot = constraint.target;
            let slotIndex = slot.data.index;
            let slotBone = slot.bone;
            if (this.skin != null) {
                this.sortPathConstraintAttachment(this.skin, slotIndex, slotBone);
            }
            if (this.data.defaultSkin != null && this.data.defaultSkin != this.skin) {
                this.sortPathConstraintAttachment(this.data.defaultSkin, slotIndex, slotBone);
            }
            for (let i = 0, n = this.data.skins.length; i < n; i++) {
                this.sortPathConstraintAttachment(this.data.skins[i], slotIndex, slotBone);
            }
            let attachment = slot.getAttachment();
            if (attachment instanceof spine.PathAttachment) {
                this.sortPathConstraintAttachmentWith(attachment, slotBone);
            }
            let constrained = constraint.bones;
            let boneCount = constrained.length;
            for (let i = 0; i < boneCount; i++) {
                this.sortBone(constrained[i]);
            }
            this._updateCache.push(constraint);
            for (let i = 0; i < boneCount; i++) {
                this.sortReset(constrained[i].children);
            }
            for (let i = 0; i < boneCount; i++) {
                constrained[i].sorted = true;
            }
        }
        sortTransformConstraint(constraint) {
            this.sortBone(constraint.target);
            let constrained = constraint.bones;
            let boneCount = constrained.length;
            if (constraint.data.local) {
                for (let i = 0; i < boneCount; i++) {
                    let child = constrained[i];
                    this.sortBone(child.parent);
                    if (!(this._updateCache.indexOf(child) > -1)) {
                        this.updateCacheReset.push(child);
                    }
                }
            }
            else {
                for (let i = 0; i < boneCount; i++) {
                    this.sortBone(constrained[i]);
                }
            }
            this._updateCache.push(constraint);
            for (let ii = 0; ii < boneCount; ii++) {
                this.sortReset(constrained[ii].children);
            }
            for (let ii = 0; ii < boneCount; ii++) {
                constrained[ii].sorted = true;
            }
        }
        sortPathConstraintAttachment(skin, slotIndex, slotBone) {
            let attachments = skin.attachments[slotIndex];
            if (!attachments) {
                return;
            }
            for (let key in attachments) {
                this.sortPathConstraintAttachmentWith(attachments[key], slotBone);
            }
        }
        sortPathConstraintAttachmentWith(attachment, slotBone) {
            if (!(attachment instanceof spine.PathAttachment)) {
                return;
            }
            let pathBones = attachment.bones;
            if (pathBones == null) {
                this.sortBone(slotBone);
            }
            else {
                let bones = this.bones;
                let i = 0;
                while (i < pathBones.length) {
                    let boneCount = pathBones[i++];
                    for (let n = i + boneCount; i < n; i++) {
                        let boneIndex = pathBones[i];
                        this.sortBone(bones[boneIndex]);
                    }
                }
            }
        }
        sortBone(bone) {
            if (bone.sorted) {
                return;
            }
            let parent = bone.parent;
            if (parent != null) {
                this.sortBone(parent);
            }
            bone.sorted = true;
            this._updateCache.push(bone);
        }
        sortReset(bones) {
            for (let i = 0, n = bones.length; i < n; i++) {
                let bone = bones[i];
                if (bone.sorted) {
                    this.sortReset(bone.children);
                }
                bone.sorted = false;
            }
        }
        updateWorldTransform() {
            let updateCacheReset = this.updateCacheReset;
            for (let i = 0, n = updateCacheReset.length; i < n; i++) {
                let bone = updateCacheReset[i];
                bone.ax = bone.x;
                bone.ay = bone.y;
                bone.arotation = bone.rotation;
                bone.ascaleX = bone.scaleX;
                bone.ascaleY = bone.scaleY;
                bone.ashearX = bone.shearX;
                bone.ashearY = bone.shearY;
                bone.appliedValid = true;
            }
            let updateCache = this._updateCache;
            for (let i = 0, n = updateCache.length; i < n; i++) {
                updateCache[i].update();
            }
        }
        setToSetupPose() {
            this.setBonesToSetupPose();
            this.setSlotsToSetupPose();
        }
        setBonesToSetupPose() {
            let bones = this.bones;
            for (let i = 0, n = bones.length; i < n; i++) {
                bones[i].setToSetupPose();
            }
            let ikConstraints = this.ikConstraints;
            for (let i = 0, n = ikConstraints.length; i < n; i++) {
                let constraint = ikConstraints[i];
                constraint.bendDirection = constraint.data.bendDirection;
                constraint.mix = constraint.data.mix;
            }
            let transformConstraints = this.transformConstraints;
            for (let i = 0, n = transformConstraints.length; i < n; i++) {
                let constraint = transformConstraints[i];
                let data = constraint.data;
                constraint.rotateMix = data.rotateMix;
                constraint.translateMix = data.translateMix;
                constraint.scaleMix = data.scaleMix;
                constraint.shearMix = data.shearMix;
            }
            let pathConstraints = this.pathConstraints;
            for (let i = 0, n = pathConstraints.length; i < n; i++) {
                let constraint = pathConstraints[i];
                let data = constraint.data;
                constraint.position = data.position;
                constraint.spacing = data.spacing;
                constraint.rotateMix = data.rotateMix;
                constraint.translateMix = data.translateMix;
            }
        }
        setSlotsToSetupPose() {
            let slots = this.slots;
            spine.Utils.arrayCopy(slots, 0, this.drawOrder, 0, slots.length);
            for (let i = 0, n = slots.length; i < n; i++) {
                slots[i].setToSetupPose();
            }
        }
        getRootBone() {
            if (this.bones.length == 0) {
                return null;
            }
            return this.bones[0];
        }
        findBone(boneName) {
            if (boneName == null) {
                throw new Error("boneName cannot be null.");
            }
            let bones = this.bones;
            for (let i = 0, n = bones.length; i < n; i++) {
                let bone = bones[i];
                if (bone.data.name == boneName) {
                    return bone;
                }
            }
            return null;
        }
        findBoneIndex(boneName) {
            if (boneName == null) {
                throw new Error("boneName cannot be null.");
            }
            let bones = this.bones;
            for (let i = 0, n = bones.length; i < n; i++) {
                if (bones[i].data.name == boneName) {
                    return i;
                }
            }
            return -1;
        }
        findSlot(slotName) {
            if (slotName == null) {
                throw new Error("slotName cannot be null.");
            }
            let slots = this.slots;
            for (let i = 0, n = slots.length; i < n; i++) {
                let slot = slots[i];
                if (slot.data.name == slotName) {
                    return slot;
                }
            }
            return null;
        }
        findSlotIndex(slotName) {
            if (slotName == null) {
                throw new Error("slotName cannot be null.");
            }
            let slots = this.slots;
            for (let i = 0, n = slots.length; i < n; i++) {
                if (slots[i].data.name == slotName) {
                    return i;
                }
            }
            return -1;
        }
        setSkinByName(skinName) {
            let skin = this.data.findSkin(skinName);
            if (skin == null) {
                throw new Error("Skin not found: " + skinName);
            }
            this.setSkin(skin);
        }
        setSkin(newSkin) {
            if (newSkin != null) {
                if (this.skin != null) {
                    newSkin.attachAll(this, this.skin);
                }
                else {
                    let slots = this.slots;
                    for (let i = 0, n = slots.length; i < n; i++) {
                        let slot = slots[i];
                        let name = slot.data.attachmentName;
                        if (name != null) {
                            let attachment = newSkin.getAttachment(i, name);
                            if (attachment != null) {
                                slot.setAttachment(attachment);
                            }
                        }
                    }
                }
            }
            this.skin = newSkin;
        }
        getAttachmentByName(slotName, attachmentName) {
            return this.getAttachment(this.data.findSlotIndex(slotName), attachmentName);
        }
        getAttachment(slotIndex, attachmentName) {
            if (attachmentName == null) {
                throw new Error("attachmentName cannot be null.");
            }
            if (this.skin != null) {
                let attachment = this.skin.getAttachment(slotIndex, attachmentName);
                if (attachment != null) {
                    return attachment;
                }
            }
            if (this.data.defaultSkin != null) {
                return this.data.defaultSkin.getAttachment(slotIndex, attachmentName);
            }
            return null;
        }
        setAttachment(slotName, attachmentName) {
            if (slotName == null) {
                throw new Error("slotName cannot be null.");
            }
            let slots = this.slots;
            for (let i = 0, n = slots.length; i < n; i++) {
                let slot = slots[i];
                if (slot.data.name == slotName) {
                    let attachment = null;
                    if (attachmentName != null) {
                        attachment = this.getAttachment(i, attachmentName);
                        if (attachment == null) {
                            throw new Error("Attachment not found: " + attachmentName + ", for slot: " + slotName);
                        }
                    }
                    slot.setAttachment(attachment);
                    return;
                }
            }
            throw new Error("Slot not found: " + slotName);
        }
        findIkConstraint(constraintName) {
            if (constraintName == null) {
                throw new Error("constraintName cannot be null.");
            }
            let ikConstraints = this.ikConstraints;
            for (let i = 0, n = ikConstraints.length; i < n; i++) {
                let ikConstraint = ikConstraints[i];
                if (ikConstraint.data.name == constraintName) {
                    return ikConstraint;
                }
            }
            return null;
        }
        findTransformConstraint(constraintName) {
            if (constraintName == null) {
                throw new Error("constraintName cannot be null.");
            }
            let transformConstraints = this.transformConstraints;
            for (let i = 0, n = transformConstraints.length; i < n; i++) {
                let constraint = transformConstraints[i];
                if (constraint.data.name == constraintName) {
                    return constraint;
                }
            }
            return null;
        }
        findPathConstraint(constraintName) {
            if (constraintName == null) {
                throw new Error("constraintName cannot be null.");
            }
            let pathConstraints = this.pathConstraints;
            for (let i = 0, n = pathConstraints.length; i < n; i++) {
                let constraint = pathConstraints[i];
                if (constraint.data.name == constraintName) {
                    return constraint;
                }
            }
            return null;
        }
        getBounds(offset, size, temp) {
            if (offset == null) {
                throw new Error("offset cannot be null.");
            }
            if (size == null) {
                throw new Error("size cannot be null.");
            }
            let drawOrder = this.drawOrder;
            let minX = Number.POSITIVE_INFINITY, minY = Number.POSITIVE_INFINITY, maxX = Number.NEGATIVE_INFINITY, maxY = Number.NEGATIVE_INFINITY;
            for (let i = 0, n = drawOrder.length; i < n; i++) {
                let slot = drawOrder[i];
                let verticesLength = 0;
                let vertices = null;
                let attachment = slot.getAttachment();
                if (attachment instanceof spine.RegionAttachment) {
                    verticesLength = 8;
                    vertices = spine.Utils.setArraySize(temp, verticesLength, 0);
                    attachment.computeWorldVertices(slot.bone, vertices, 0, 2);
                }
                else if (attachment instanceof spine.MeshAttachment) {
                    let mesh = attachment;
                    verticesLength = mesh.worldVerticesLength;
                    vertices = spine.Utils.setArraySize(temp, verticesLength, 0);
                    mesh.computeWorldVertices(slot, 0, verticesLength, vertices, 0, 2);
                }
                if (vertices != null) {
                    for (let ii = 0, nn = vertices.length; ii < nn; ii += 2) {
                        let x = vertices[ii], y = vertices[ii + 1];
                        minX = Math.min(minX, x);
                        minY = Math.min(minY, y);
                        maxX = Math.max(maxX, x);
                        maxY = Math.max(maxY, y);
                    }
                }
            }
            offset.set(minX, minY);
            size.set(maxX - minX, maxY - minY);
        }
        update(delta) {
            this.time += delta;
        }
        dispose() {
            this.data = null;
            this.bones.length = 0;
            this.slots.length = 0;
            this.drawOrder.length = 0;
            this.ikConstraints.length = 0;
            this.transformConstraints.length = 0;
            this.pathConstraints.length = 0;
            this._updateCache.length = 0;
            this.updateCacheReset.length = 0;
        }
    }
    spine.Skeleton = Skeleton;
})(spine || (spine = {}));
//# sourceMappingURL=Skeleton.js.map
(() => {
    if (!Math.fround) {
        Math.fround = (function (array) {
            return function (x) {
                return array[0] = x, array[0];
            };
        })(new Float32Array(1));
    }
})();
//# sourceMappingURL=polyfills.js.map
var spine;
(function (spine) {
    class EventData {
        constructor(name) {
            this.name = name;
        }
    }
    spine.EventData = EventData;
})(spine || (spine = {}));
//# sourceMappingURL=EventData.js.map
var spine;
(function (spine) {
    class Event {
        constructor(time, data) {
            if (data == null) {
                throw new Error("data cannot be null.");
            }
            this.time = time;
            this.data = data;
        }
    }
    spine.Event = Event;
})(spine || (spine = {}));
//# sourceMappingURL=Event.js.map
var spine;
(function (spine) {
    let AttachmentType;
    (function (AttachmentType) {
        AttachmentType[AttachmentType["Region"] = 0] = "Region";
        AttachmentType[AttachmentType["BoundingBox"] = 1] = "BoundingBox";
        AttachmentType[AttachmentType["Mesh"] = 2] = "Mesh";
        AttachmentType[AttachmentType["LinkedMesh"] = 3] = "LinkedMesh";
        AttachmentType[AttachmentType["Path"] = 4] = "Path";
        AttachmentType[AttachmentType["Point"] = 5] = "Point";
        AttachmentType[AttachmentType["Clipping"] = 6] = "Clipping";
    })(AttachmentType = spine.AttachmentType || (spine.AttachmentType = {}));
})(spine || (spine = {}));
//# sourceMappingURL=AttachmentType.js.map
var spine;
(function (spine) {
    class AnimationStateData {
        constructor(skeletonData) {
            this.animationToMixTime = {};
            this.defaultMix = 0;
            if (skeletonData == null) {
                throw new Error("skeletonData cannot be null.");
            }
            this.skeletonData = skeletonData;
        }
        dispose() {
            this.animationToMixTime = null;
            this.skeletonData = null;
        }
        setMix(fromName, toName, duration) {
            let from = this.skeletonData.findAnimation(fromName);
            if (from == null) {
                throw new Error("Animation not found: " + fromName);
            }
            let to = this.skeletonData.findAnimation(toName);
            if (to == null) {
                throw new Error("Animation not found: " + toName);
            }
            this.setMixWith(from, to, duration);
        }
        setMixWith(from, to, duration) {
            if (from == null) {
                throw new Error("from cannot be null.");
            }
            if (to == null) {
                throw new Error("to cannot be null.");
            }
            let key = from.name + "." + to.name;
            this.animationToMixTime[key] = duration;
        }
        getMix(from, to) {
            let key = from.name + "." + to.name;
            let value = this.animationToMixTime[key];
            return value === undefined ? this.defaultMix : value;
        }
    }
    spine.AnimationStateData = AnimationStateData;
})(spine || (spine = {}));
//# sourceMappingURL=AnimationStateData.js.map
var spine;
(function (spine) {
    class Animation {
        constructor(name, timelines, duration, eventTimeLine) {
            if (name == null) {
                throw new Error("name cannot be null.");
            }
            if (timelines == null) {
                throw new Error("timelines cannot be null.");
            }
            this.name = name;
            this.timelines = timelines;
            this.duration = duration;
            this.initEventFrame(eventTimeLine);
        }
        initEventFrame(eventTimeLine) {
            this.eventMap = new ds.StringMap();
            if (eventTimeLine) {
                for (let index = 0; index < eventTimeLine.events.length; index++) {
                    const element = eventTimeLine.events[index];
                    var frameIndx = spine.FlypineSetting.timeToFrame(element.time);
                    this.eventMap.put(frameIndx, element);
                }
            }
        }
        getFreamEvent(frame) {
            return this.eventMap.get(frame);
        }
        apply(skeleton, lastTime, time, loop, events, alpha, pose, direction) {
            if (skeleton == null) {
                throw new Error("skeleton cannot be null.");
            }
            if (loop && this.duration != 0) {
                time %= this.duration;
                if (lastTime > 0) {
                    lastTime %= this.duration;
                }
            }
            let timelines = this.timelines;
            for (let i = 0, n = timelines.length; i < n; i++) {
                timelines[i].apply(skeleton, lastTime, time, events, alpha, pose, direction);
            }
        }
        static binarySearch(values, target, step = 1) {
            let low = 0;
            let high = values.length / step - 2;
            if (high == 0) {
                return step;
            }
            let current = high >>> 1;
            while (true) {
                if (values[(current + 1) * step] <= target) {
                    low = current + 1;
                }
                else {
                    high = current;
                }
                if (low == high) {
                    return (low + 1) * step;
                }
                current = (low + high) >>> 1;
            }
        }
        static linearSearch(values, target, step) {
            for (let i = 0, last = values.length - step; i <= last; i += step) {
                if (values[i] > target) {
                    return i;
                }
            }
            return -1;
        }
    }
    spine.Animation = Animation;
    let MixPose;
    (function (MixPose) {
        MixPose[MixPose["setup"] = 0] = "setup";
        MixPose[MixPose["current"] = 1] = "current";
        MixPose[MixPose["currentLayered"] = 2] = "currentLayered";
    })(MixPose = spine.MixPose || (spine.MixPose = {}));
    let MixDirection;
    (function (MixDirection) {
        MixDirection[MixDirection["in"] = 0] = "in";
        MixDirection[MixDirection["out"] = 1] = "out";
    })(MixDirection = spine.MixDirection || (spine.MixDirection = {}));
    let TimelineType;
    (function (TimelineType) {
        TimelineType[TimelineType["rotate"] = 0] = "rotate";
        TimelineType[TimelineType["translate"] = 1] = "translate";
        TimelineType[TimelineType["scale"] = 2] = "scale";
        TimelineType[TimelineType["shear"] = 3] = "shear";
        TimelineType[TimelineType["attachment"] = 4] = "attachment";
        TimelineType[TimelineType["color"] = 5] = "color";
        TimelineType[TimelineType["deform"] = 6] = "deform";
        TimelineType[TimelineType["event"] = 7] = "event";
        TimelineType[TimelineType["drawOrder"] = 8] = "drawOrder";
        TimelineType[TimelineType["ikConstraint"] = 9] = "ikConstraint";
        TimelineType[TimelineType["transformConstraint"] = 10] = "transformConstraint";
        TimelineType[TimelineType["pathConstraintPosition"] = 11] = "pathConstraintPosition";
        TimelineType[TimelineType["pathConstraintSpacing"] = 12] = "pathConstraintSpacing";
        TimelineType[TimelineType["pathConstraintMix"] = 13] = "pathConstraintMix";
        TimelineType[TimelineType["twoColor"] = 14] = "twoColor";
    })(TimelineType = spine.TimelineType || (spine.TimelineType = {}));
    class CurveTimeline {
        constructor(frameCount) {
            if (frameCount <= 0) {
                throw new Error("frameCount must be > 0: " + frameCount);
            }
            this.curves = spine.Utils.newFloatArray((frameCount - 1) * CurveTimeline.BEZIER_SIZE);
        }
        getFrameCount() {
            return this.curves.length / CurveTimeline.BEZIER_SIZE + 1;
        }
        setLinear(frameIndex) {
            this.curves[frameIndex * CurveTimeline.BEZIER_SIZE] = CurveTimeline.LINEAR;
        }
        setStepped(frameIndex) {
            this.curves[frameIndex * CurveTimeline.BEZIER_SIZE] = CurveTimeline.STEPPED;
        }
        getCurveType(frameIndex) {
            let index = frameIndex * CurveTimeline.BEZIER_SIZE;
            if (index == this.curves.length) {
                return CurveTimeline.LINEAR;
            }
            let type = this.curves[index];
            if (type == CurveTimeline.LINEAR) {
                return CurveTimeline.LINEAR;
            }
            if (type == CurveTimeline.STEPPED) {
                return CurveTimeline.STEPPED;
            }
            return CurveTimeline.BEZIER;
        }
        setCurve(frameIndex, cx1, cy1, cx2, cy2) {
            let tmpx = (-cx1 * 2 + cx2) * 0.03, tmpy = (-cy1 * 2 + cy2) * 0.03;
            let dddfx = ((cx1 - cx2) * 3 + 1) * 0.006, dddfy = ((cy1 - cy2) * 3 + 1) * 0.006;
            let ddfx = tmpx * 2 + dddfx, ddfy = tmpy * 2 + dddfy;
            let dfx = cx1 * 0.3 + tmpx + dddfx * 0.16666667, dfy = cy1 * 0.3 + tmpy + dddfy * 0.16666667;
            let i = frameIndex * CurveTimeline.BEZIER_SIZE;
            let curves = this.curves;
            curves[i++] = CurveTimeline.BEZIER;
            let x = dfx, y = dfy;
            for (let n = i + CurveTimeline.BEZIER_SIZE - 1; i < n; i += 2) {
                curves[i] = x;
                curves[i + 1] = y;
                dfx += ddfx;
                dfy += ddfy;
                ddfx += dddfx;
                ddfy += dddfy;
                x += dfx;
                y += dfy;
            }
        }
        getCurvePercent(frameIndex, percent) {
            percent = spine.MathUtils.clamp(percent, 0, 1);
            let curves = this.curves;
            let i = frameIndex * CurveTimeline.BEZIER_SIZE;
            let type = curves[i];
            if (type == CurveTimeline.LINEAR) {
                return percent;
            }
            if (type == CurveTimeline.STEPPED) {
                return 0;
            }
            i++;
            let x = 0;
            for (let start = i, n = i + CurveTimeline.BEZIER_SIZE - 1; i < n; i += 2) {
                x = curves[i];
                if (x >= percent) {
                    let prevX, prevY;
                    if (i == start) {
                        prevX = 0;
                        prevY = 0;
                    }
                    else {
                        prevX = curves[i - 2];
                        prevY = curves[i - 1];
                    }
                    return prevY + (curves[i + 1] - prevY) * (percent - prevX) / (x - prevX);
                }
            }
            let y = curves[i - 1];
            return y + (1 - y) * (percent - x) / (1 - x);
        }
    }
    CurveTimeline.LINEAR = 0;
    CurveTimeline.STEPPED = 1;
    CurveTimeline.BEZIER = 2;
    CurveTimeline.BEZIER_SIZE = 10 * 2 - 1;
    spine.CurveTimeline = CurveTimeline;
    class RotateTimeline extends CurveTimeline {
        constructor(frameCount) {
            super(frameCount);
            this.frames = spine.Utils.newFloatArray(frameCount << 1);
        }
        getPropertyId() {
            return (TimelineType.rotate << 24) + this.boneIndex;
        }
        setFrame(frameIndex, time, degrees) {
            frameIndex <<= 1;
            this.frames[frameIndex] = time;
            this.frames[frameIndex + RotateTimeline.ROTATION] = degrees;
        }
        apply(skeleton, lastTime, time, events, alpha, pose, direction) {
            let frames = this.frames;
            let bone = skeleton.bones[this.boneIndex];
            if (time < frames[0]) {
                switch (pose) {
                    case MixPose.setup:
                        bone.rotation = bone.data.rotation;
                        return;
                    case MixPose.current:
                        let r = bone.data.rotation - bone.rotation;
                        r -= (16384 - ((16384.499999999996 - r / 360) | 0)) * 360;
                        bone.rotation += r * alpha;
                }
                return;
            }
            if (time >= frames[frames.length - RotateTimeline.ENTRIES]) {
                if (pose == MixPose.setup) {
                    bone.rotation = bone.data.rotation + frames[frames.length + RotateTimeline.PREV_ROTATION] * alpha;
                }
                else {
                    let r = bone.data.rotation + frames[frames.length + RotateTimeline.PREV_ROTATION] - bone.rotation;
                    r -= (16384 - ((16384.499999999996 - r / 360) | 0)) * 360;
                    bone.rotation += r * alpha;
                }
                return;
            }
            let frame = Animation.binarySearch(frames, time, RotateTimeline.ENTRIES);
            let prevRotation = frames[frame + RotateTimeline.PREV_ROTATION];
            let frameTime = frames[frame];
            let percent = this.getCurvePercent((frame >> 1) - 1, 1 - (time - frameTime) / (frames[frame + RotateTimeline.PREV_TIME] - frameTime));
            let r = frames[frame + RotateTimeline.ROTATION] - prevRotation;
            r -= (16384 - ((16384.499999999996 - r / 360) | 0)) * 360;
            r = prevRotation + r * percent;
            if (pose == MixPose.setup) {
                r -= (16384 - ((16384.499999999996 - r / 360) | 0)) * 360;
                bone.rotation = bone.data.rotation + r * alpha;
            }
            else {
                r = bone.data.rotation + r - bone.rotation;
                r -= (16384 - ((16384.499999999996 - r / 360) | 0)) * 360;
                bone.rotation += r * alpha;
            }
        }
    }
    RotateTimeline.ENTRIES = 2;
    RotateTimeline.PREV_TIME = -2;
    RotateTimeline.PREV_ROTATION = -1;
    RotateTimeline.ROTATION = 1;
    spine.RotateTimeline = RotateTimeline;
    class TranslateTimeline extends CurveTimeline {
        constructor(frameCount) {
            super(frameCount);
            this.frames = spine.Utils.newFloatArray(frameCount * TranslateTimeline.ENTRIES);
        }
        getPropertyId() {
            return (TimelineType.translate << 24) + this.boneIndex;
        }
        setFrame(frameIndex, time, x, y) {
            frameIndex *= TranslateTimeline.ENTRIES;
            this.frames[frameIndex] = time;
            this.frames[frameIndex + TranslateTimeline.X] = x;
            this.frames[frameIndex + TranslateTimeline.Y] = y;
        }
        apply(skeleton, lastTime, time, events, alpha, pose, direction) {
            let frames = this.frames;
            let bone = skeleton.bones[this.boneIndex];
            if (time < frames[0]) {
                switch (pose) {
                    case MixPose.setup:
                        bone.x = bone.data.x;
                        bone.y = bone.data.y;
                        return;
                    case MixPose.current:
                        bone.x += (bone.data.x - bone.x) * alpha;
                        bone.y += (bone.data.y - bone.y) * alpha;
                }
                return;
            }
            let x = 0, y = 0;
            if (time >= frames[frames.length - TranslateTimeline.ENTRIES]) {
                x = frames[frames.length + TranslateTimeline.PREV_X];
                y = frames[frames.length + TranslateTimeline.PREV_Y];
            }
            else {
                let frame = Animation.binarySearch(frames, time, TranslateTimeline.ENTRIES);
                x = frames[frame + TranslateTimeline.PREV_X];
                y = frames[frame + TranslateTimeline.PREV_Y];
                let frameTime = frames[frame];
                let percent = this.getCurvePercent(frame / TranslateTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + TranslateTimeline.PREV_TIME] - frameTime));
                x += (frames[frame + TranslateTimeline.X] - x) * percent;
                y += (frames[frame + TranslateTimeline.Y] - y) * percent;
            }
            if (pose == MixPose.setup) {
                bone.x = bone.data.x + x * alpha;
                bone.y = bone.data.y + y * alpha;
            }
            else {
                bone.x += (bone.data.x + x - bone.x) * alpha;
                bone.y += (bone.data.y + y - bone.y) * alpha;
            }
        }
    }
    TranslateTimeline.ENTRIES = 3;
    TranslateTimeline.PREV_TIME = -3;
    TranslateTimeline.PREV_X = -2;
    TranslateTimeline.PREV_Y = -1;
    TranslateTimeline.X = 1;
    TranslateTimeline.Y = 2;
    spine.TranslateTimeline = TranslateTimeline;
    class ScaleTimeline extends TranslateTimeline {
        constructor(frameCount) {
            super(frameCount);
        }
        getPropertyId() {
            return (TimelineType.scale << 24) + this.boneIndex;
        }
        apply(skeleton, lastTime, time, events, alpha, pose, direction) {
            let frames = this.frames;
            let bone = skeleton.bones[this.boneIndex];
            if (time < frames[0]) {
                switch (pose) {
                    case MixPose.setup:
                        bone.scaleX = bone.data.scaleX;
                        bone.scaleY = bone.data.scaleY;
                        return;
                    case MixPose.current:
                        bone.scaleX += (bone.data.scaleX - bone.scaleX) * alpha;
                        bone.scaleY += (bone.data.scaleY - bone.scaleY) * alpha;
                }
                return;
            }
            let x = 0, y = 0;
            if (time >= frames[frames.length - ScaleTimeline.ENTRIES]) {
                x = frames[frames.length + ScaleTimeline.PREV_X] * bone.data.scaleX;
                y = frames[frames.length + ScaleTimeline.PREV_Y] * bone.data.scaleY;
            }
            else {
                let frame = Animation.binarySearch(frames, time, ScaleTimeline.ENTRIES);
                x = frames[frame + ScaleTimeline.PREV_X];
                y = frames[frame + ScaleTimeline.PREV_Y];
                let frameTime = frames[frame];
                let percent = this.getCurvePercent(frame / ScaleTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + ScaleTimeline.PREV_TIME] - frameTime));
                x = (x + (frames[frame + ScaleTimeline.X] - x) * percent) * bone.data.scaleX;
                y = (y + (frames[frame + ScaleTimeline.Y] - y) * percent) * bone.data.scaleY;
            }
            if (alpha == 1) {
                bone.scaleX = x;
                bone.scaleY = y;
            }
            else {
                let bx = 0, by = 0;
                if (pose == MixPose.setup) {
                    bx = bone.data.scaleX;
                    by = bone.data.scaleY;
                }
                else {
                    bx = bone.scaleX;
                    by = bone.scaleY;
                }
                if (direction == MixDirection.out) {
                    x = Math.abs(x) * spine.MathUtils.signum(bx);
                    y = Math.abs(y) * spine.MathUtils.signum(by);
                }
                else {
                    bx = Math.abs(bx) * spine.MathUtils.signum(x);
                    by = Math.abs(by) * spine.MathUtils.signum(y);
                }
                bone.scaleX = bx + (x - bx) * alpha;
                bone.scaleY = by + (y - by) * alpha;
            }
        }
    }
    spine.ScaleTimeline = ScaleTimeline;
    class ShearTimeline extends TranslateTimeline {
        constructor(frameCount) {
            super(frameCount);
        }
        getPropertyId() {
            return (TimelineType.shear << 24) + this.boneIndex;
        }
        apply(skeleton, lastTime, time, events, alpha, pose, direction) {
            let frames = this.frames;
            let bone = skeleton.bones[this.boneIndex];
            if (time < frames[0]) {
                switch (pose) {
                    case MixPose.setup:
                        bone.shearX = bone.data.shearX;
                        bone.shearY = bone.data.shearY;
                        return;
                    case MixPose.current:
                        bone.shearX += (bone.data.shearX - bone.shearX) * alpha;
                        bone.shearY += (bone.data.shearY - bone.shearY) * alpha;
                }
                return;
            }
            let x = 0, y = 0;
            if (time >= frames[frames.length - ShearTimeline.ENTRIES]) {
                x = frames[frames.length + ShearTimeline.PREV_X];
                y = frames[frames.length + ShearTimeline.PREV_Y];
            }
            else {
                let frame = Animation.binarySearch(frames, time, ShearTimeline.ENTRIES);
                x = frames[frame + ShearTimeline.PREV_X];
                y = frames[frame + ShearTimeline.PREV_Y];
                let frameTime = frames[frame];
                let percent = this.getCurvePercent(frame / ShearTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + ShearTimeline.PREV_TIME] - frameTime));
                x = x + (frames[frame + ShearTimeline.X] - x) * percent;
                y = y + (frames[frame + ShearTimeline.Y] - y) * percent;
            }
            if (pose == MixPose.setup) {
                bone.shearX = bone.data.shearX + x * alpha;
                bone.shearY = bone.data.shearY + y * alpha;
            }
            else {
                bone.shearX += (bone.data.shearX + x - bone.shearX) * alpha;
                bone.shearY += (bone.data.shearY + y - bone.shearY) * alpha;
            }
        }
    }
    spine.ShearTimeline = ShearTimeline;
    class ColorTimeline extends CurveTimeline {
        constructor(frameCount) {
            super(frameCount);
            this.frames = spine.Utils.newFloatArray(frameCount * ColorTimeline.ENTRIES);
        }
        getPropertyId() {
            return (TimelineType.color << 24) + this.slotIndex;
        }
        setFrame(frameIndex, time, r, g, b, a) {
            frameIndex *= ColorTimeline.ENTRIES;
            this.frames[frameIndex] = time;
            this.frames[frameIndex + ColorTimeline.R] = r;
            this.frames[frameIndex + ColorTimeline.G] = g;
            this.frames[frameIndex + ColorTimeline.B] = b;
            this.frames[frameIndex + ColorTimeline.A] = a;
        }
        apply(skeleton, lastTime, time, events, alpha, pose, direction) {
            let slot = skeleton.slots[this.slotIndex];
            let frames = this.frames;
            if (time < frames[0]) {
                switch (pose) {
                    case MixPose.setup:
                        slot.color.setFromColor(slot.data.color);
                        return;
                    case MixPose.current:
                        let color = slot.color, setup = slot.data.color;
                        color.add((setup.r - color.r) * alpha, (setup.g - color.g) * alpha, (setup.b - color.b) * alpha, (setup.a - color.a) * alpha);
                }
                return;
            }
            let r = 0, g = 0, b = 0, a = 0;
            if (time >= frames[frames.length - ColorTimeline.ENTRIES]) {
                let i = frames.length;
                r = frames[i + ColorTimeline.PREV_R];
                g = frames[i + ColorTimeline.PREV_G];
                b = frames[i + ColorTimeline.PREV_B];
                a = frames[i + ColorTimeline.PREV_A];
            }
            else {
                let frame = Animation.binarySearch(frames, time, ColorTimeline.ENTRIES);
                r = frames[frame + ColorTimeline.PREV_R];
                g = frames[frame + ColorTimeline.PREV_G];
                b = frames[frame + ColorTimeline.PREV_B];
                a = frames[frame + ColorTimeline.PREV_A];
                let frameTime = frames[frame];
                let percent = this.getCurvePercent(frame / ColorTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + ColorTimeline.PREV_TIME] - frameTime));
                r += (frames[frame + ColorTimeline.R] - r) * percent;
                g += (frames[frame + ColorTimeline.G] - g) * percent;
                b += (frames[frame + ColorTimeline.B] - b) * percent;
                a += (frames[frame + ColorTimeline.A] - a) * percent;
            }
            if (alpha == 1) {
                slot.color.set(r, g, b, a);
            }
            else {
                let color = slot.color;
                if (pose == MixPose.setup) {
                    color.setFromColor(slot.data.color);
                }
                color.add((r - color.r) * alpha, (g - color.g) * alpha, (b - color.b) * alpha, (a - color.a) * alpha);
            }
        }
    }
    ColorTimeline.ENTRIES = 5;
    ColorTimeline.PREV_TIME = -5;
    ColorTimeline.PREV_R = -4;
    ColorTimeline.PREV_G = -3;
    ColorTimeline.PREV_B = -2;
    ColorTimeline.PREV_A = -1;
    ColorTimeline.R = 1;
    ColorTimeline.G = 2;
    ColorTimeline.B = 3;
    ColorTimeline.A = 4;
    spine.ColorTimeline = ColorTimeline;
    class TwoColorTimeline extends CurveTimeline {
        constructor(frameCount) {
            super(frameCount);
            this.frames = spine.Utils.newFloatArray(frameCount * TwoColorTimeline.ENTRIES);
        }
        getPropertyId() {
            return (TimelineType.twoColor << 24) + this.slotIndex;
        }
        setFrame(frameIndex, time, r, g, b, a, r2, g2, b2) {
            frameIndex *= TwoColorTimeline.ENTRIES;
            this.frames[frameIndex] = time;
            this.frames[frameIndex + TwoColorTimeline.R] = r;
            this.frames[frameIndex + TwoColorTimeline.G] = g;
            this.frames[frameIndex + TwoColorTimeline.B] = b;
            this.frames[frameIndex + TwoColorTimeline.A] = a;
            this.frames[frameIndex + TwoColorTimeline.R2] = r2;
            this.frames[frameIndex + TwoColorTimeline.G2] = g2;
            this.frames[frameIndex + TwoColorTimeline.B2] = b2;
        }
        apply(skeleton, lastTime, time, events, alpha, pose, direction) {
            let slot = skeleton.slots[this.slotIndex];
            let frames = this.frames;
            if (time < frames[0]) {
                switch (pose) {
                    case MixPose.setup:
                        slot.color.setFromColor(slot.data.color);
                        slot.darkColor.setFromColor(slot.data.darkColor);
                        return;
                    case MixPose.current:
                        let light = slot.color, dark = slot.darkColor, setupLight = slot.data.color, setupDark = slot.data.darkColor;
                        light.add((setupLight.r - light.r) * alpha, (setupLight.g - light.g) * alpha, (setupLight.b - light.b) * alpha, (setupLight.a - light.a) * alpha);
                        dark.add((setupDark.r - dark.r) * alpha, (setupDark.g - dark.g) * alpha, (setupDark.b - dark.b) * alpha, 0);
                }
                return;
            }
            let r = 0, g = 0, b = 0, a = 0, r2 = 0, g2 = 0, b2 = 0;
            if (time >= frames[frames.length - TwoColorTimeline.ENTRIES]) {
                let i = frames.length;
                r = frames[i + TwoColorTimeline.PREV_R];
                g = frames[i + TwoColorTimeline.PREV_G];
                b = frames[i + TwoColorTimeline.PREV_B];
                a = frames[i + TwoColorTimeline.PREV_A];
                r2 = frames[i + TwoColorTimeline.PREV_R2];
                g2 = frames[i + TwoColorTimeline.PREV_G2];
                b2 = frames[i + TwoColorTimeline.PREV_B2];
            }
            else {
                let frame = Animation.binarySearch(frames, time, TwoColorTimeline.ENTRIES);
                r = frames[frame + TwoColorTimeline.PREV_R];
                g = frames[frame + TwoColorTimeline.PREV_G];
                b = frames[frame + TwoColorTimeline.PREV_B];
                a = frames[frame + TwoColorTimeline.PREV_A];
                r2 = frames[frame + TwoColorTimeline.PREV_R2];
                g2 = frames[frame + TwoColorTimeline.PREV_G2];
                b2 = frames[frame + TwoColorTimeline.PREV_B2];
                let frameTime = frames[frame];
                let percent = this.getCurvePercent(frame / TwoColorTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + TwoColorTimeline.PREV_TIME] - frameTime));
                r += (frames[frame + TwoColorTimeline.R] - r) * percent;
                g += (frames[frame + TwoColorTimeline.G] - g) * percent;
                b += (frames[frame + TwoColorTimeline.B] - b) * percent;
                a += (frames[frame + TwoColorTimeline.A] - a) * percent;
                r2 += (frames[frame + TwoColorTimeline.R2] - r2) * percent;
                g2 += (frames[frame + TwoColorTimeline.G2] - g2) * percent;
                b2 += (frames[frame + TwoColorTimeline.B2] - b2) * percent;
            }
            if (alpha == 1) {
                slot.color.set(r, g, b, a);
                slot.darkColor.set(r2, g2, b2, 1);
            }
            else {
                let light = slot.color, dark = slot.darkColor;
                if (pose == MixPose.setup) {
                    light.setFromColor(slot.data.color);
                    dark.setFromColor(slot.data.darkColor);
                }
                light.add((r - light.r) * alpha, (g - light.g) * alpha, (b - light.b) * alpha, (a - light.a) * alpha);
                dark.add((r2 - dark.r) * alpha, (g2 - dark.g) * alpha, (b2 - dark.b) * alpha, 0);
            }
        }
    }
    TwoColorTimeline.ENTRIES = 8;
    TwoColorTimeline.PREV_TIME = -8;
    TwoColorTimeline.PREV_R = -7;
    TwoColorTimeline.PREV_G = -6;
    TwoColorTimeline.PREV_B = -5;
    TwoColorTimeline.PREV_A = -4;
    TwoColorTimeline.PREV_R2 = -3;
    TwoColorTimeline.PREV_G2 = -2;
    TwoColorTimeline.PREV_B2 = -1;
    TwoColorTimeline.R = 1;
    TwoColorTimeline.G = 2;
    TwoColorTimeline.B = 3;
    TwoColorTimeline.A = 4;
    TwoColorTimeline.R2 = 5;
    TwoColorTimeline.G2 = 6;
    TwoColorTimeline.B2 = 7;
    spine.TwoColorTimeline = TwoColorTimeline;
    class AttachmentTimeline {
        constructor(frameCount) {
            this.frames = spine.Utils.newFloatArray(frameCount);
            this.attachmentNames = new Array(frameCount);
        }
        getPropertyId() {
            return (TimelineType.attachment << 24) + this.slotIndex;
        }
        getFrameCount() {
            return this.frames.length;
        }
        setFrame(frameIndex, time, attachmentName) {
            this.frames[frameIndex] = time;
            this.attachmentNames[frameIndex] = attachmentName;
        }
        apply(skeleton, lastTime, time, events, alpha, pose, direction) {
            let slot = skeleton.slots[this.slotIndex];
            if (direction == MixDirection.out && pose == MixPose.setup) {
                let attachmentName = slot.data.attachmentName;
                slot.setAttachment(attachmentName == null ? null : skeleton.getAttachment(this.slotIndex, attachmentName));
                return;
            }
            let frames = this.frames;
            if (time < frames[0]) {
                if (pose == MixPose.setup) {
                    let attachmentName = slot.data.attachmentName;
                    slot.setAttachment(attachmentName == null ? null : skeleton.getAttachment(this.slotIndex, attachmentName));
                }
                return;
            }
            let frameIndex = 0;
            if (time >= frames[frames.length - 1]) {
                frameIndex = frames.length - 1;
            }
            else {
                frameIndex = Animation.binarySearch(frames, time, 1) - 1;
            }
            let attachmentName = this.attachmentNames[frameIndex];
            skeleton.slots[this.slotIndex]
                .setAttachment(attachmentName == null ? null : skeleton.getAttachment(this.slotIndex, attachmentName));
        }
    }
    spine.AttachmentTimeline = AttachmentTimeline;
    var zeros = null;
    class DeformTimeline extends CurveTimeline {
        constructor(frameCount) {
            super(frameCount);
            this.frames = spine.Utils.newFloatArray(frameCount);
            this.frameVertices = new Array(frameCount);
            if (zeros == null) {
                zeros = spine.Utils.newFloatArray(64);
            }
        }
        getPropertyId() {
            return (TimelineType.deform << 27) + +this.attachment.id + this.slotIndex;
        }
        setFrame(frameIndex, time, vertices) {
            this.frames[frameIndex] = time;
            this.frameVertices[frameIndex] = vertices;
        }
        apply(skeleton, lastTime, time, firedEvents, alpha, pose, direction) {
            let slot = skeleton.slots[this.slotIndex];
            let slotAttachment = slot.getAttachment();
            if (!(slotAttachment instanceof spine.VertexAttachment) || !slotAttachment.applyDeform(this.attachment)) {
                return;
            }
            let verticesArray = slot.attachmentVertices;
            if (verticesArray.length == 0) {
                alpha = 1;
            }
            let frameVertices = this.frameVertices;
            let vertexCount = frameVertices[0].length;
            let frames = this.frames;
            if (time < frames[0]) {
                let vertexAttachment = slotAttachment;
                switch (pose) {
                    case MixPose.setup:
                        verticesArray.length = 0;
                        return;
                    case MixPose.current:
                        if (alpha == 1) {
                            verticesArray.length = 0;
                            break;
                        }
                        let vertices = spine.Utils.setArraySize(verticesArray, vertexCount);
                        if (vertexAttachment.bones == null) {
                            var setupVertices = vertexAttachment.vertices;
                            for (let i = 0; i < vertexCount; i++) {
                                vertices[i] += (setupVertices[i] - vertices[i]) * alpha;
                            }
                        }
                        else {
                            alpha = 1 - alpha;
                            for (let i = 0; i < vertexCount; i++) {
                                vertices[i] *= alpha;
                            }
                        }
                }
                return;
            }
            let vertices = spine.Utils.setArraySize(verticesArray, vertexCount);
            if (time >= frames[frames.length - 1]) {
                let lastVertices = frameVertices[frames.length - 1];
                if (alpha == 1) {
                    spine.Utils.arrayCopy(lastVertices, 0, vertices, 0, vertexCount);
                }
                else if (pose == MixPose.setup) {
                    let vertexAttachment = slotAttachment;
                    if (vertexAttachment.bones == null) {
                        let setupVertices = vertexAttachment.vertices;
                        for (let i = 0; i < vertexCount; i++) {
                            let setup = setupVertices[i];
                            vertices[i] = setup + (lastVertices[i] - setup) * alpha;
                        }
                    }
                    else {
                        for (let i = 0; i < vertexCount; i++) {
                            vertices[i] = lastVertices[i] * alpha;
                        }
                    }
                }
                else {
                    for (let i = 0; i < vertexCount; i++) {
                        vertices[i] += (lastVertices[i] - vertices[i]) * alpha;
                    }
                }
                return;
            }
            let frame = Animation.binarySearch(frames, time);
            let prevVertices = frameVertices[frame - 1];
            let nextVertices = frameVertices[frame];
            let frameTime = frames[frame];
            let percent = this.getCurvePercent(frame - 1, 1 - (time - frameTime) / (frames[frame - 1] - frameTime));
            if (alpha == 1) {
                for (let i = 0; i < vertexCount; i++) {
                    let prev = prevVertices[i];
                    vertices[i] = prev + (nextVertices[i] - prev) * percent;
                }
            }
            else if (pose == MixPose.setup) {
                let vertexAttachment = slotAttachment;
                if (vertexAttachment.bones == null) {
                    let setupVertices = vertexAttachment.vertices;
                    for (let i = 0; i < vertexCount; i++) {
                        let prev = prevVertices[i], setup = setupVertices[i];
                        vertices[i] = setup + (prev + (nextVertices[i] - prev) * percent - setup) * alpha;
                    }
                }
                else {
                    for (let i = 0; i < vertexCount; i++) {
                        let prev = prevVertices[i];
                        vertices[i] = (prev + (nextVertices[i] - prev) * percent) * alpha;
                    }
                }
            }
            else {
                for (let i = 0; i < vertexCount; i++) {
                    let prev = prevVertices[i];
                    vertices[i] += (prev + (nextVertices[i] - prev) * percent - vertices[i]) * alpha;
                }
            }
        }
    }
    spine.DeformTimeline = DeformTimeline;
    class EventTimeline {
        constructor(frameCount) {
            this.frames = spine.Utils.newFloatArray(frameCount);
            this.events = new Array(frameCount);
        }
        getPropertyId() {
            return TimelineType.event << 24;
        }
        getFrameCount() {
            return this.frames.length;
        }
        setFrame(frameIndex, event) {
            this.frames[frameIndex] = event.time;
            this.events[frameIndex] = event;
        }
        apply(skeleton, lastTime, time, firedEvents, alpha, pose, direction) {
            if (firedEvents == null) {
                return;
            }
            let frames = this.frames;
            let frameCount = this.frames.length;
            if (lastTime > time) {
                this.apply(skeleton, lastTime, Number.MAX_VALUE, firedEvents, alpha, pose, direction);
                lastTime = -1;
            }
            else if (lastTime >= frames[frameCount - 1]) {
                return;
            }
            if (time < frames[0]) {
                return;
            }
            let frame = 0;
            if (lastTime < frames[0]) {
                frame = 0;
            }
            else {
                frame = Animation.binarySearch(frames, lastTime);
                let frameTime = frames[frame];
                while (frame > 0) {
                    if (frames[frame - 1] != frameTime) {
                        break;
                    }
                    frame--;
                }
            }
            for (; frame < frameCount && time >= frames[frame]; frame++) {
                firedEvents.push(this.events[frame]);
            }
        }
    }
    spine.EventTimeline = EventTimeline;
    class DrawOrderTimeline {
        constructor(frameCount) {
            this.frames = spine.Utils.newFloatArray(frameCount);
            this.drawOrders = new Array(frameCount);
        }
        getPropertyId() {
            return TimelineType.drawOrder << 24;
        }
        getFrameCount() {
            return this.frames.length;
        }
        setFrame(frameIndex, time, drawOrder) {
            this.frames[frameIndex] = time;
            this.drawOrders[frameIndex] = drawOrder;
        }
        apply(skeleton, lastTime, time, firedEvents, alpha, pose, direction) {
            let drawOrder = skeleton.drawOrder;
            let slots = skeleton.slots;
            if (direction == MixDirection.out && pose == MixPose.setup) {
                spine.Utils.arrayCopy(skeleton.slots, 0, skeleton.drawOrder, 0, skeleton.slots.length);
                return;
            }
            let frames = this.frames;
            if (time < frames[0]) {
                if (pose == MixPose.setup) {
                    spine.Utils.arrayCopy(skeleton.slots, 0, skeleton.drawOrder, 0, skeleton.slots.length);
                }
                return;
            }
            let frame = 0;
            if (time >= frames[frames.length - 1]) {
                frame = frames.length - 1;
            }
            else {
                frame = Animation.binarySearch(frames, time) - 1;
            }
            let drawOrderToSetupIndex = this.drawOrders[frame];
            if (drawOrderToSetupIndex == null) {
                spine.Utils.arrayCopy(slots, 0, drawOrder, 0, slots.length);
            }
            else {
                for (let i = 0, n = drawOrderToSetupIndex.length; i < n; i++) {
                    drawOrder[i] = slots[drawOrderToSetupIndex[i]];
                }
            }
        }
    }
    spine.DrawOrderTimeline = DrawOrderTimeline;
    class IkConstraintTimeline extends CurveTimeline {
        constructor(frameCount) {
            super(frameCount);
            this.frames = spine.Utils.newFloatArray(frameCount * IkConstraintTimeline.ENTRIES);
        }
        getPropertyId() {
            return (TimelineType.ikConstraint << 24) + this.ikConstraintIndex;
        }
        setFrame(frameIndex, time, mix, bendDirection) {
            frameIndex *= IkConstraintTimeline.ENTRIES;
            this.frames[frameIndex] = time;
            this.frames[frameIndex + IkConstraintTimeline.MIX] = mix;
            this.frames[frameIndex + IkConstraintTimeline.BEND_DIRECTION] = bendDirection;
        }
        apply(skeleton, lastTime, time, firedEvents, alpha, pose, direction) {
            let frames = this.frames;
            let constraint = skeleton.ikConstraints[this.ikConstraintIndex];
            if (time < frames[0]) {
                switch (pose) {
                    case MixPose.setup:
                        constraint.mix = constraint.data.mix;
                        constraint.bendDirection = constraint.data.bendDirection;
                        return;
                    case MixPose.current:
                        constraint.mix += (constraint.data.mix - constraint.mix) * alpha;
                        constraint.bendDirection = constraint.data.bendDirection;
                }
                return;
            }
            if (time >= frames[frames.length - IkConstraintTimeline.ENTRIES]) {
                if (pose == MixPose.setup) {
                    constraint.mix = constraint.data.mix + (frames[frames.length + IkConstraintTimeline.PREV_MIX] - constraint.data.mix) * alpha;
                    constraint.bendDirection = direction == MixDirection.out ? constraint.data.bendDirection
                        : frames[frames.length + IkConstraintTimeline.PREV_BEND_DIRECTION];
                }
                else {
                    constraint.mix += (frames[frames.length + IkConstraintTimeline.PREV_MIX] - constraint.mix) * alpha;
                    if (direction == MixDirection.in) {
                        constraint.bendDirection = frames[frames.length + IkConstraintTimeline.PREV_BEND_DIRECTION];
                    }
                }
                return;
            }
            let frame = Animation.binarySearch(frames, time, IkConstraintTimeline.ENTRIES);
            let mix = frames[frame + IkConstraintTimeline.PREV_MIX];
            let frameTime = frames[frame];
            let percent = this.getCurvePercent(frame / IkConstraintTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + IkConstraintTimeline.PREV_TIME] - frameTime));
            if (pose == MixPose.setup) {
                constraint.mix = constraint.data.mix + (mix + (frames[frame + IkConstraintTimeline.MIX] - mix) * percent - constraint.data.mix) * alpha;
                constraint.bendDirection = direction == MixDirection.out ? constraint.data.bendDirection : frames[frame + IkConstraintTimeline.PREV_BEND_DIRECTION];
            }
            else {
                constraint.mix += (mix + (frames[frame + IkConstraintTimeline.MIX] - mix) * percent - constraint.mix) * alpha;
                if (direction == MixDirection.in) {
                    constraint.bendDirection = frames[frame + IkConstraintTimeline.PREV_BEND_DIRECTION];
                }
            }
        }
    }
    IkConstraintTimeline.ENTRIES = 3;
    IkConstraintTimeline.PREV_TIME = -3;
    IkConstraintTimeline.PREV_MIX = -2;
    IkConstraintTimeline.PREV_BEND_DIRECTION = -1;
    IkConstraintTimeline.MIX = 1;
    IkConstraintTimeline.BEND_DIRECTION = 2;
    spine.IkConstraintTimeline = IkConstraintTimeline;
    class TransformConstraintTimeline extends CurveTimeline {
        constructor(frameCount) {
            super(frameCount);
            this.frames = spine.Utils.newFloatArray(frameCount * TransformConstraintTimeline.ENTRIES);
        }
        getPropertyId() {
            return (TimelineType.transformConstraint << 24) + this.transformConstraintIndex;
        }
        setFrame(frameIndex, time, rotateMix, translateMix, scaleMix, shearMix) {
            frameIndex *= TransformConstraintTimeline.ENTRIES;
            this.frames[frameIndex] = time;
            this.frames[frameIndex + TransformConstraintTimeline.ROTATE] = rotateMix;
            this.frames[frameIndex + TransformConstraintTimeline.TRANSLATE] = translateMix;
            this.frames[frameIndex + TransformConstraintTimeline.SCALE] = scaleMix;
            this.frames[frameIndex + TransformConstraintTimeline.SHEAR] = shearMix;
        }
        apply(skeleton, lastTime, time, firedEvents, alpha, pose, direction) {
            let frames = this.frames;
            let constraint = skeleton.transformConstraints[this.transformConstraintIndex];
            if (time < frames[0]) {
                let data = constraint.data;
                switch (pose) {
                    case MixPose.setup:
                        constraint.rotateMix = data.rotateMix;
                        constraint.translateMix = data.translateMix;
                        constraint.scaleMix = data.scaleMix;
                        constraint.shearMix = data.shearMix;
                        return;
                    case MixPose.current:
                        constraint.rotateMix += (data.rotateMix - constraint.rotateMix) * alpha;
                        constraint.translateMix += (data.translateMix - constraint.translateMix) * alpha;
                        constraint.scaleMix += (data.scaleMix - constraint.scaleMix) * alpha;
                        constraint.shearMix += (data.shearMix - constraint.shearMix) * alpha;
                }
                return;
            }
            let rotate = 0, translate = 0, scale = 0, shear = 0;
            if (time >= frames[frames.length - TransformConstraintTimeline.ENTRIES]) {
                let i = frames.length;
                rotate = frames[i + TransformConstraintTimeline.PREV_ROTATE];
                translate = frames[i + TransformConstraintTimeline.PREV_TRANSLATE];
                scale = frames[i + TransformConstraintTimeline.PREV_SCALE];
                shear = frames[i + TransformConstraintTimeline.PREV_SHEAR];
            }
            else {
                let frame = Animation.binarySearch(frames, time, TransformConstraintTimeline.ENTRIES);
                rotate = frames[frame + TransformConstraintTimeline.PREV_ROTATE];
                translate = frames[frame + TransformConstraintTimeline.PREV_TRANSLATE];
                scale = frames[frame + TransformConstraintTimeline.PREV_SCALE];
                shear = frames[frame + TransformConstraintTimeline.PREV_SHEAR];
                let frameTime = frames[frame];
                let percent = this.getCurvePercent(frame / TransformConstraintTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + TransformConstraintTimeline.PREV_TIME] - frameTime));
                rotate += (frames[frame + TransformConstraintTimeline.ROTATE] - rotate) * percent;
                translate += (frames[frame + TransformConstraintTimeline.TRANSLATE] - translate) * percent;
                scale += (frames[frame + TransformConstraintTimeline.SCALE] - scale) * percent;
                shear += (frames[frame + TransformConstraintTimeline.SHEAR] - shear) * percent;
            }
            if (pose == MixPose.setup) {
                let data = constraint.data;
                constraint.rotateMix = data.rotateMix + (rotate - data.rotateMix) * alpha;
                constraint.translateMix = data.translateMix + (translate - data.translateMix) * alpha;
                constraint.scaleMix = data.scaleMix + (scale - data.scaleMix) * alpha;
                constraint.shearMix = data.shearMix + (shear - data.shearMix) * alpha;
            }
            else {
                constraint.rotateMix += (rotate - constraint.rotateMix) * alpha;
                constraint.translateMix += (translate - constraint.translateMix) * alpha;
                constraint.scaleMix += (scale - constraint.scaleMix) * alpha;
                constraint.shearMix += (shear - constraint.shearMix) * alpha;
            }
        }
    }
    TransformConstraintTimeline.ENTRIES = 5;
    TransformConstraintTimeline.PREV_TIME = -5;
    TransformConstraintTimeline.PREV_ROTATE = -4;
    TransformConstraintTimeline.PREV_TRANSLATE = -3;
    TransformConstraintTimeline.PREV_SCALE = -2;
    TransformConstraintTimeline.PREV_SHEAR = -1;
    TransformConstraintTimeline.ROTATE = 1;
    TransformConstraintTimeline.TRANSLATE = 2;
    TransformConstraintTimeline.SCALE = 3;
    TransformConstraintTimeline.SHEAR = 4;
    spine.TransformConstraintTimeline = TransformConstraintTimeline;
    class PathConstraintPositionTimeline extends CurveTimeline {
        constructor(frameCount) {
            super(frameCount);
            this.frames = spine.Utils.newFloatArray(frameCount * PathConstraintPositionTimeline.ENTRIES);
        }
        getPropertyId() {
            return (TimelineType.pathConstraintPosition << 24) + this.pathConstraintIndex;
        }
        setFrame(frameIndex, time, value) {
            frameIndex *= PathConstraintPositionTimeline.ENTRIES;
            this.frames[frameIndex] = time;
            this.frames[frameIndex + PathConstraintPositionTimeline.VALUE] = value;
        }
        apply(skeleton, lastTime, time, firedEvents, alpha, pose, direction) {
            let frames = this.frames;
            let constraint = skeleton.pathConstraints[this.pathConstraintIndex];
            if (time < frames[0]) {
                switch (pose) {
                    case MixPose.setup:
                        constraint.position = constraint.data.position;
                        return;
                    case MixPose.current:
                        constraint.position += (constraint.data.position - constraint.position) * alpha;
                }
                return;
            }
            let position = 0;
            if (time >= frames[frames.length - PathConstraintPositionTimeline.ENTRIES]) {
                position = frames[frames.length + PathConstraintPositionTimeline.PREV_VALUE];
            }
            else {
                let frame = Animation.binarySearch(frames, time, PathConstraintPositionTimeline.ENTRIES);
                position = frames[frame + PathConstraintPositionTimeline.PREV_VALUE];
                let frameTime = frames[frame];
                let percent = this.getCurvePercent(frame / PathConstraintPositionTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + PathConstraintPositionTimeline.PREV_TIME] - frameTime));
                position += (frames[frame + PathConstraintPositionTimeline.VALUE] - position) * percent;
            }
            if (pose == MixPose.setup) {
                constraint.position = constraint.data.position + (position - constraint.data.position) * alpha;
            }
            else {
                constraint.position += (position - constraint.position) * alpha;
            }
        }
    }
    PathConstraintPositionTimeline.ENTRIES = 2;
    PathConstraintPositionTimeline.PREV_TIME = -2;
    PathConstraintPositionTimeline.PREV_VALUE = -1;
    PathConstraintPositionTimeline.VALUE = 1;
    spine.PathConstraintPositionTimeline = PathConstraintPositionTimeline;
    class PathConstraintSpacingTimeline extends PathConstraintPositionTimeline {
        constructor(frameCount) {
            super(frameCount);
        }
        getPropertyId() {
            return (TimelineType.pathConstraintSpacing << 24) + this.pathConstraintIndex;
        }
        apply(skeleton, lastTime, time, firedEvents, alpha, pose, direction) {
            let frames = this.frames;
            let constraint = skeleton.pathConstraints[this.pathConstraintIndex];
            if (time < frames[0]) {
                switch (pose) {
                    case MixPose.setup:
                        constraint.spacing = constraint.data.spacing;
                        return;
                    case MixPose.current:
                        constraint.spacing += (constraint.data.spacing - constraint.spacing) * alpha;
                }
                return;
            }
            let spacing = 0;
            if (time >= frames[frames.length - PathConstraintSpacingTimeline.ENTRIES]) {
                spacing = frames[frames.length + PathConstraintSpacingTimeline.PREV_VALUE];
            }
            else {
                let frame = Animation.binarySearch(frames, time, PathConstraintSpacingTimeline.ENTRIES);
                spacing = frames[frame + PathConstraintSpacingTimeline.PREV_VALUE];
                let frameTime = frames[frame];
                let percent = this.getCurvePercent(frame / PathConstraintSpacingTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + PathConstraintSpacingTimeline.PREV_TIME] - frameTime));
                spacing += (frames[frame + PathConstraintSpacingTimeline.VALUE] - spacing) * percent;
            }
            if (pose == MixPose.setup) {
                constraint.spacing = constraint.data.spacing + (spacing - constraint.data.spacing) * alpha;
            }
            else {
                constraint.spacing += (spacing - constraint.spacing) * alpha;
            }
        }
    }
    spine.PathConstraintSpacingTimeline = PathConstraintSpacingTimeline;
    class PathConstraintMixTimeline extends CurveTimeline {
        constructor(frameCount) {
            super(frameCount);
            this.frames = spine.Utils.newFloatArray(frameCount * PathConstraintMixTimeline.ENTRIES);
        }
        getPropertyId() {
            return (TimelineType.pathConstraintMix << 24) + this.pathConstraintIndex;
        }
        setFrame(frameIndex, time, rotateMix, translateMix) {
            frameIndex *= PathConstraintMixTimeline.ENTRIES;
            this.frames[frameIndex] = time;
            this.frames[frameIndex + PathConstraintMixTimeline.ROTATE] = rotateMix;
            this.frames[frameIndex + PathConstraintMixTimeline.TRANSLATE] = translateMix;
        }
        apply(skeleton, lastTime, time, firedEvents, alpha, pose, direction) {
            let frames = this.frames;
            let constraint = skeleton.pathConstraints[this.pathConstraintIndex];
            if (time < frames[0]) {
                switch (pose) {
                    case MixPose.setup:
                        constraint.rotateMix = constraint.data.rotateMix;
                        constraint.translateMix = constraint.data.translateMix;
                        return;
                    case MixPose.current:
                        constraint.rotateMix += (constraint.data.rotateMix - constraint.rotateMix) * alpha;
                        constraint.translateMix += (constraint.data.translateMix - constraint.translateMix) * alpha;
                }
                return;
            }
            let rotate = 0, translate = 0;
            if (time >= frames[frames.length - PathConstraintMixTimeline.ENTRIES]) {
                rotate = frames[frames.length + PathConstraintMixTimeline.PREV_ROTATE];
                translate = frames[frames.length + PathConstraintMixTimeline.PREV_TRANSLATE];
            }
            else {
                let frame = Animation.binarySearch(frames, time, PathConstraintMixTimeline.ENTRIES);
                rotate = frames[frame + PathConstraintMixTimeline.PREV_ROTATE];
                translate = frames[frame + PathConstraintMixTimeline.PREV_TRANSLATE];
                let frameTime = frames[frame];
                let percent = this.getCurvePercent(frame / PathConstraintMixTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + PathConstraintMixTimeline.PREV_TIME] - frameTime));
                rotate += (frames[frame + PathConstraintMixTimeline.ROTATE] - rotate) * percent;
                translate += (frames[frame + PathConstraintMixTimeline.TRANSLATE] - translate) * percent;
            }
            if (pose == MixPose.setup) {
                constraint.rotateMix = constraint.data.rotateMix + (rotate - constraint.data.rotateMix) * alpha;
                constraint.translateMix = constraint.data.translateMix + (translate - constraint.data.translateMix) * alpha;
            }
            else {
                constraint.rotateMix += (rotate - constraint.rotateMix) * alpha;
                constraint.translateMix += (translate - constraint.translateMix) * alpha;
            }
        }
    }
    PathConstraintMixTimeline.ENTRIES = 3;
    PathConstraintMixTimeline.PREV_TIME = -3;
    PathConstraintMixTimeline.PREV_ROTATE = -2;
    PathConstraintMixTimeline.PREV_TRANSLATE = -1;
    PathConstraintMixTimeline.ROTATE = 1;
    PathConstraintMixTimeline.TRANSLATE = 2;
    spine.PathConstraintMixTimeline = PathConstraintMixTimeline;
})(spine || (spine = {}));
//# sourceMappingURL=Animation.js.map
var spine;
(function (spine) {
    class AnimationState {
        constructor(data) {
            this.trackEntryArr = new Array();
            this.events = new Array();
            this.listeners = new Array();
            this.eventQueue = new spine.EventQueue(this);
            this.propertyIDs = new spine.IntSet();
            this.mixingTo = new Array();
            this.animationsChanged = false;
            this.timeScale = 1;
            this.trackEntryPool = new spine.Pool(() => new spine.TrackEntry());
            this.data = data;
        }
        dispose() {
            this.data = null;
            this.trackEntryArr.length = 0;
            this.events.length = 0;
            this.listeners.length = 0;
            this.eventQueue = null;
            this.mixingTo.length = 0;
        }
        setPlayTime(time) {
            let tracks = this.trackEntryArr;
            for (let i = 0, n = tracks.length; i < n; i++) {
                let current = tracks[i];
                if (current == null) {
                    continue;
                }
                current.animationLast = current.nextAnimationLast;
                current.trackLast = current.nextTrackLast;
                current.trackTime = time;
            }
            this.eventQueue.drain();
        }
        update(delta) {
            delta *= this.timeScale;
            let tracks = this.trackEntryArr;
            for (let i = 0, n = tracks.length; i < n; i++) {
                let current = tracks[i];
                if (current == null) {
                    continue;
                }
                current.animationLast = current.nextAnimationLast;
                current.trackLast = current.nextTrackLast;
                let currentDelta = delta * current.timeScale;
                if (current.delay > 0) {
                    current.delay -= currentDelta;
                    if (current.delay > 0) {
                        continue;
                    }
                    currentDelta = -current.delay;
                    current.delay = 0;
                }
                let next = current.next;
                if (next != null) {
                    let nextTime = current.trackLast - next.delay;
                    if (nextTime >= 0) {
                        next.delay = 0;
                        next.trackTime = nextTime + delta * next.timeScale;
                        current.trackTime += currentDelta;
                        this.setCurrent(i, next, true);
                        while (next.mixingFrom != null) {
                            next.mixTime += currentDelta;
                            next = next.mixingFrom;
                        }
                        continue;
                    }
                }
                else if (current.trackLast >= current.trackEnd && current.mixingFrom == null) {
                    tracks[i] = null;
                    this.eventQueue.end(current);
                    this.disposeNext(current);
                    continue;
                }
                if (current.mixingFrom != null && this.updateMixingFrom(current, delta)) {
                    let from = current.mixingFrom;
                    current.mixingFrom = null;
                    while (from != null) {
                        this.eventQueue.end(from);
                        from = from.mixingFrom;
                    }
                }
                current.trackTime += currentDelta;
            }
            this.eventQueue.drain();
        }
        updateMixingFrom(to, delta) {
            let from = to.mixingFrom;
            if (from == null) {
                return true;
            }
            let finished = this.updateMixingFrom(from, delta);
            if (to.mixTime > 0 && (to.mixTime >= to.mixDuration || to.timeScale == 0)) {
                if (from.totalAlpha == 0 || to.mixDuration == 0) {
                    to.mixingFrom = from.mixingFrom;
                    to.interruptAlpha = from.interruptAlpha;
                    this.eventQueue.end(from);
                }
                return finished;
            }
            from.animationLast = from.nextAnimationLast;
            from.trackLast = from.nextTrackLast;
            from.trackTime += delta * from.timeScale;
            to.mixTime += delta * to.timeScale;
            return false;
        }
        apply(skeleton) {
            if (skeleton == null) {
                throw new Error("skeleton cannot be null.");
            }
            if (this.animationsChanged) {
                this._animationsChanged();
            }
            let events = this.events;
            let tracks = this.trackEntryArr;
            let applied = false;
            for (let i = 0, n = tracks.length; i < n; i++) {
                let current = tracks[i];
                if (current == null || current.delay > 0) {
                    continue;
                }
                applied = true;
                let currentPose = i == 0 ? spine.MixPose.current : spine.MixPose.currentLayered;
                let mix = current.alpha;
                if (current.mixingFrom != null) {
                    mix *= this.applyMixingFrom(current, skeleton, currentPose);
                    if (current.mixingFrom) {
                        this.trackEntryPool.free(current.mixingFrom);
                        current.mixingFrom = null;
                    }
                }
                else if (current.trackTime >= current.trackEnd && current.next == null) {
                    mix = 0;
                }
                let animationLast = current.animationLast, animationTime = current.getAnimationTime();
                let timelineCount = current.animation.timelines.length;
                let timelines = current.animation.timelines;
                if (mix == 1) {
                    for (let ii = 0; ii < timelineCount; ii++) {
                        timelines[ii].apply(skeleton, animationLast, animationTime, events, 1, spine.MixPose.setup, spine.MixDirection.in);
                    }
                }
                else {
                    let timelineData = current.timelineData;
                    let firstFrame = current.timelinesRotation.length == 0;
                    if (firstFrame) {
                        spine.Utils.setArraySize(current.timelinesRotation, timelineCount << 1, null);
                    }
                    let timelinesRotation = current.timelinesRotation;
                    for (let ii = 0; ii < timelineCount; ii++) {
                        let timeline = timelines[ii];
                        let pose = timelineData[ii] >= AnimationState.FIRST ? spine.MixPose.setup : currentPose;
                        if (timeline instanceof spine.RotateTimeline) {
                            this.applyRotateTimeline(timeline, skeleton, animationTime, mix, pose, timelinesRotation, ii << 1, firstFrame);
                        }
                        else {
                            timeline.apply(skeleton, animationLast, animationTime, events, mix, pose, spine.MixDirection.in);
                        }
                    }
                }
                this.queueEvents(current, animationTime);
                events.length = 0;
                current.nextAnimationLast = animationTime;
                current.nextTrackLast = current.trackTime;
            }
            this.eventQueue.drain();
            return applied;
        }
        applyMixingFrom(to, skeleton, currentPose) {
            let from = to.mixingFrom;
            if (from.mixingFrom != null) {
                this.applyMixingFrom(from, skeleton, currentPose);
            }
            let mix = 0;
            if (to.mixDuration == 0) {
                mix = 1;
                currentPose = spine.MixPose.setup;
            }
            else {
                mix = to.mixTime / to.mixDuration;
                if (mix > 1) {
                    mix = 1;
                }
            }
            let events = mix < from.eventThreshold ? this.events : null;
            let attachments = mix < from.attachmentThreshold, drawOrder = mix < from.drawOrderThreshold;
            let animationLast = from.animationLast, animationTime = from.getAnimationTime();
            let timelineCount = from.animation.timelines.length;
            let timelines = from.animation.timelines;
            let timelineData = from.timelineData;
            let timelineDipMix = from.timelineDipMix;
            let firstFrame = from.timelinesRotation.length == 0;
            if (firstFrame) {
                spine.Utils.setArraySize(from.timelinesRotation, timelineCount << 1, null);
            }
            let timelinesRotation = from.timelinesRotation;
            let pose;
            let alphaDip = from.alpha * to.interruptAlpha, alphaMix = alphaDip * (1 - mix), alpha = 0;
            from.totalAlpha = 0;
            for (var i = 0; i < timelineCount; i++) {
                let timeline = timelines[i];
                switch (timelineData[i]) {
                    case AnimationState.SUBSEQUENT:
                        if (!attachments && timeline instanceof spine.AttachmentTimeline) {
                            continue;
                        }
                        if (!drawOrder && timeline instanceof spine.DrawOrderTimeline) {
                            continue;
                        }
                        pose = currentPose;
                        alpha = alphaMix;
                        break;
                    case AnimationState.FIRST:
                        pose = spine.MixPose.setup;
                        alpha = alphaMix;
                        break;
                    case AnimationState.DIP:
                        pose = spine.MixPose.setup;
                        alpha = alphaDip;
                        break;
                    default:
                        pose = spine.MixPose.setup;
                        alpha = alphaDip;
                        let dipMix = timelineDipMix[i];
                        alpha *= Math.max(0, 1 - dipMix.mixTime / dipMix.mixDuration);
                        break;
                }
                from.totalAlpha += alpha;
                if (timeline instanceof spine.RotateTimeline) {
                    this.applyRotateTimeline(timeline, skeleton, animationTime, alpha, pose, timelinesRotation, i << 1, firstFrame);
                }
                else {
                    timeline.apply(skeleton, animationLast, animationTime, events, alpha, pose, spine.MixDirection.out);
                }
            }
            if (to.mixDuration > 0) {
                this.queueEvents(from, animationTime);
            }
            this.events.length = 0;
            from.nextAnimationLast = animationTime;
            from.nextTrackLast = from.trackTime;
            return mix;
        }
        applyRotateTimeline(timeline, skeleton, time, alpha, pose, timelinesRotation, i, firstFrame) {
            if (firstFrame) {
                timelinesRotation[i] = 0;
            }
            if (alpha == 1) {
                timeline.apply(skeleton, 0, time, null, 1, pose, spine.MixDirection.in);
                return;
            }
            let rotateTimeline = timeline;
            let frames = rotateTimeline.frames;
            let bone = skeleton.bones[rotateTimeline.boneIndex];
            if (time < frames[0]) {
                if (pose == spine.MixPose.setup) {
                    bone.rotation = bone.data.rotation;
                }
                return;
            }
            let r2 = 0;
            if (time >= frames[frames.length - spine.RotateTimeline.ENTRIES]) {
                r2 = bone.data.rotation + frames[frames.length + spine.RotateTimeline.PREV_ROTATION];
            }
            else {
                let frame = spine.Animation.binarySearch(frames, time, spine.RotateTimeline.ENTRIES);
                let prevRotation = frames[frame + spine.RotateTimeline.PREV_ROTATION];
                let frameTime = frames[frame];
                let percent = rotateTimeline.getCurvePercent((frame >> 1) - 1, 1 - (time - frameTime) / (frames[frame + spine.RotateTimeline.PREV_TIME] - frameTime));
                r2 = frames[frame + spine.RotateTimeline.ROTATION] - prevRotation;
                r2 -= (16384 - ((16384.499999999996 - r2 / 360) | 0)) * 360;
                r2 = prevRotation + r2 * percent + bone.data.rotation;
                r2 -= (16384 - ((16384.499999999996 - r2 / 360) | 0)) * 360;
            }
            let r1 = pose == spine.MixPose.setup ? bone.data.rotation : bone.rotation;
            let total = 0, diff = r2 - r1;
            if (diff == 0) {
                total = timelinesRotation[i];
            }
            else {
                diff -= (16384 - ((16384.499999999996 - diff / 360) | 0)) * 360;
                let lastTotal = 0, lastDiff = 0;
                if (firstFrame) {
                    lastTotal = 0;
                    lastDiff = diff;
                }
                else {
                    lastTotal = timelinesRotation[i];
                    lastDiff = timelinesRotation[i + 1];
                }
                let current = diff > 0, dir = lastTotal >= 0;
                if (spine.MathUtils.signum(lastDiff) != spine.MathUtils.signum(diff) && Math.abs(lastDiff) <= 90) {
                    if (Math.abs(lastTotal) > 180) {
                        lastTotal += 360 * spine.MathUtils.signum(lastTotal);
                    }
                    dir = current;
                }
                total = diff + lastTotal - lastTotal % 360;
                if (dir != current) {
                    total += 360 * spine.MathUtils.signum(lastTotal);
                }
                timelinesRotation[i] = total;
            }
            timelinesRotation[i + 1] = diff;
            r1 += total * alpha;
            bone.rotation = r1 - (16384 - ((16384.499999999996 - r1 / 360) | 0)) * 360;
        }
        queueEvents(entry, animationTime) {
            let animationStart = entry.animationStart, animationEnd = entry.animationEnd;
            let duration = animationEnd - animationStart;
            let trackLastWrapped = entry.trackLast % duration;
            let events = this.events;
            let i = 0, n = events.length;
            for (; i < n; i++) {
                let event = events[i];
                if (event.time < trackLastWrapped) {
                    break;
                }
                if (event.time > animationEnd) {
                    continue;
                }
                this.eventQueue.event(entry, event);
            }
            if (entry.loop ? (trackLastWrapped > entry.trackTime % duration)
                : (animationTime >= animationEnd && entry.animationLast < animationEnd)) {
                this.eventQueue.complete(entry);
            }
            for (; i < n; i++) {
                let event = events[i];
                if (event.time < animationStart) {
                    continue;
                }
                this.eventQueue.event(entry, events[i]);
            }
        }
        clearTracks() {
            let oldDrainDisabled = this.eventQueue.drainDisabled;
            this.eventQueue.drainDisabled = true;
            for (let i = 0, n = this.trackEntryArr.length; i < n; i++) {
                this.clearTrack(i);
            }
            this.trackEntryArr.length = 0;
            this.eventQueue.drainDisabled = oldDrainDisabled;
            this.eventQueue.drain();
        }
        clearTrack(trackIndex) {
            if (trackIndex >= this.trackEntryArr.length) {
                return;
            }
            let current = this.trackEntryArr[trackIndex];
            if (current == null) {
                return;
            }
            this.eventQueue.end(current);
            this.disposeNext(current);
            let entry = current;
            while (true) {
                let from = entry.mixingFrom;
                if (from == null) {
                    break;
                }
                this.eventQueue.end(from);
                entry.mixingFrom = null;
                entry = from;
            }
            this.trackEntryArr[current.trackIndex] = null;
            this.eventQueue.drain();
        }
        setCurrent(index, current, interrupt) {
            let from = this.expandToIndex(index);
            this.trackEntryArr[index] = current;
            if (from != null) {
                if (interrupt) {
                    this.eventQueue.interrupt(from);
                }
                current.mixingFrom = from;
                current.mixTime = 0;
                if (from.mixingFrom != null && from.mixDuration > 0) {
                    current.interruptAlpha *= Math.min(1, from.mixTime / from.mixDuration);
                }
                from.timelinesRotation.length = 0;
            }
            this.eventQueue.start(current);
        }
        setAnimation(trackIndex, animationName, loop) {
            let animation = this.data.skeletonData.findAnimation(animationName);
            if (animation == null) {
                logW("无" + animationName + "动作");
                return null;
            }
            return this.setAnimationWith(trackIndex, animation, loop);
        }
        setAnimationWith(trackIndex, animation, loop) {
            if (animation == null) {
                throw new Error("animation cannot be null.");
            }
            let interrupt = true;
            let current = this.expandToIndex(trackIndex);
            if (current != null) {
                if (current.nextTrackLast == -1) {
                    this.trackEntryArr[trackIndex] = current.mixingFrom;
                    this.eventQueue.interrupt(current);
                    this.eventQueue.end(current);
                    this.disposeNext(current);
                    current = current.mixingFrom;
                    interrupt = false;
                }
                else {
                    this.disposeNext(current);
                }
            }
            let entry = this.trackEntry(trackIndex, animation, loop, current);
            this.setCurrent(trackIndex, entry, interrupt);
            this.eventQueue.drain();
            return entry;
        }
        addAnimation(trackIndex, animationName, loop, delay) {
            let animation = this.data.skeletonData.findAnimation(animationName);
            if (animation == null) {
                throw new Error("Animation not found: " + animationName);
            }
            return this.addAnimationWith(trackIndex, animation, loop, delay);
        }
        addAnimationWith(trackIndex, animation, loop, delay) {
            if (animation == null) {
                throw new Error("animation cannot be null.");
            }
            let last = this.expandToIndex(trackIndex);
            if (last != null) {
                while (last.next != null) {
                    last = last.next;
                }
            }
            let entry = this.trackEntry(trackIndex, animation, loop, last);
            if (last == null) {
                this.setCurrent(trackIndex, entry, true);
                this.eventQueue.drain();
            }
            else {
                last.next = entry;
                if (delay <= 0) {
                    let duration = last.animationEnd - last.animationStart;
                    if (duration != 0) {
                        if (last.loop) {
                            delay += duration * (1 + ((last.trackTime / duration) | 0));
                        }
                        else {
                            delay += duration;
                        }
                        delay -= this.data.getMix(last.animation, animation);
                    }
                    else {
                        delay = 0;
                    }
                }
            }
            entry.delay = delay;
            return entry;
        }
        setEmptyAnimation(trackIndex, mixDuration) {
            let entry = this.setAnimationWith(trackIndex, AnimationState.emptyAnimation, false);
            entry.mixDuration = mixDuration;
            entry.trackEnd = mixDuration;
            return entry;
        }
        addEmptyAnimation(trackIndex, mixDuration, delay) {
            if (delay <= 0) {
                delay -= mixDuration;
            }
            let entry = this.addAnimationWith(trackIndex, AnimationState.emptyAnimation, false, delay);
            entry.mixDuration = mixDuration;
            entry.trackEnd = mixDuration;
            return entry;
        }
        setEmptyAnimations(mixDuration) {
            let oldDrainDisabled = this.eventQueue.drainDisabled;
            this.eventQueue.drainDisabled = true;
            for (let i = 0, n = this.trackEntryArr.length; i < n; i++) {
                let current = this.trackEntryArr[i];
                if (current != null) {
                    this.setEmptyAnimation(current.trackIndex, mixDuration);
                }
            }
            this.eventQueue.drainDisabled = oldDrainDisabled;
            this.eventQueue.drain();
        }
        expandToIndex(index) {
            if (index < this.trackEntryArr.length) {
                return this.trackEntryArr[index];
            }
            spine.Utils.ensureArrayCapacity(this.trackEntryArr, index - this.trackEntryArr.length + 1, null);
            this.trackEntryArr.length = index + 1;
            return null;
        }
        trackEntry(trackIndex, animation, loop, last) {
            let entry = this.trackEntryPool.obtain();
            entry.trackIndex = trackIndex;
            entry.animation = animation;
            entry.loop = loop;
            entry.eventThreshold = 0;
            entry.attachmentThreshold = 0;
            entry.drawOrderThreshold = 0;
            entry.animationStart = 0;
            entry.animationEnd = animation.duration;
            entry.animationLast = -1;
            entry.nextAnimationLast = -1;
            entry.delay = 0;
            entry.trackTime = 0;
            entry.trackLast = -1;
            entry.nextTrackLast = -1;
            entry.trackEnd = Number.MAX_VALUE;
            entry.timeScale = 1;
            entry.alpha = 1;
            entry.interruptAlpha = 1;
            entry.mixTime = 0;
            entry.mixDuration = last == null ? 0 : this.data.getMix(last.animation, animation);
            entry.tracekName = animation.name;
            return entry;
        }
        disposeNext(entry) {
            let next = entry.next;
            while (next != null) {
                this.eventQueue.dispose(next);
                next = next.next;
            }
            entry.next = null;
        }
        _animationsChanged() {
            this.animationsChanged = false;
            let propertyIDs = this.propertyIDs;
            propertyIDs.clear();
            let mixingTo = this.mixingTo;
            for (var i = 0, n = this.trackEntryArr.length; i < n; i++) {
                let entry = this.trackEntryArr[i];
                if (entry != null) {
                    entry.setTimelineData(null, mixingTo, propertyIDs);
                }
            }
        }
        getCurrent(trackIndex) {
            if (trackIndex >= this.trackEntryArr.length) {
                return null;
            }
            return this.trackEntryArr[trackIndex];
        }
        addListener(listener) {
            if (listener == null) {
                throw new Error("listener cannot be null.");
            }
            this.listeners.push(listener);
        }
        removeListener(listener) {
            let index = this.listeners.indexOf(listener);
            if (index >= 0) {
                this.listeners.splice(index, 1);
            }
        }
        clearListeners() {
            this.listeners.length = 0;
        }
        clearListenerNotifications() {
            this.eventQueue.clear();
        }
    }
    AnimationState.emptyAnimation = new spine.Animation("<empty>", [], 0, null);
    AnimationState.SUBSEQUENT = 0;
    AnimationState.FIRST = 1;
    AnimationState.DIP = 2;
    AnimationState.DIP_MIX = 3;
    spine.AnimationState = AnimationState;
})(spine || (spine = {}));
//# sourceMappingURL=AnimationState.js.map
var spine;
(function (spine) {
    class IntSet {
        constructor() {
            this.array = new Array();
        }
        add(value) {
            let contains = this.contains(value);
            this.array[value | 0] = value | 0;
            return !contains;
        }
        contains(value) {
            return this.array[value | 0] != undefined;
        }
        remove(value) {
            this.array[value | 0] = undefined;
        }
        clear() {
            this.array.length = 0;
        }
    }
    spine.IntSet = IntSet;
    class Color {
        constructor(r = 0, g = 0, b = 0, a = 0) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
        set(r, g, b, a) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
            this.clamp();
            return this;
        }
        setFromColor(c) {
            this.r = c.r;
            this.g = c.g;
            this.b = c.b;
            this.a = c.a;
            return this;
        }
        setFromString(hex) {
            hex = hex.charAt(0) == '#' ? hex.substr(1) : hex;
            this.r = parseInt(hex.substr(0, 2), 16) / 255.0;
            this.g = parseInt(hex.substr(2, 2), 16) / 255.0;
            this.b = parseInt(hex.substr(4, 2), 16) / 255.0;
            this.a = (hex.length != 8 ? 255 : parseInt(hex.substr(6, 2), 16)) / 255.0;
            return this;
        }
        add(r, g, b, a) {
            this.r += r;
            this.g += g;
            this.b += b;
            this.a += a;
            this.clamp();
            return this;
        }
        clamp() {
            if (this.r < 0) {
                this.r = 0;
            }
            else if (this.r > 1) {
                this.r = 1;
            }
            if (this.g < 0) {
                this.g = 0;
            }
            else if (this.g > 1) {
                this.g = 1;
            }
            if (this.b < 0) {
                this.b = 0;
            }
            else if (this.b > 1) {
                this.b = 1;
            }
            if (this.a < 0) {
                this.a = 0;
            }
            else if (this.a > 1) {
                this.a = 1;
            }
            return this;
        }
        static rgba8888ToColor(color, value) {
            color.r = ((value & 0xff000000) >>> 24) / 255;
            color.g = ((value & 0x00ff0000) >>> 16) / 255;
            color.b = ((value & 0x0000ff00) >>> 8) / 255;
            color.a = ((value & 0x000000ff)) / 255;
        }
        static rgb888ToColor(color, value) {
            color.r = ((value & 0x00ff0000) >>> 16) / 255;
            color.g = ((value & 0x0000ff00) >>> 8) / 255;
            color.b = ((value & 0x000000ff)) / 255;
        }
    }
    Color.WHITE = new Color(1, 1, 1, 1);
    Color.RED = new Color(1, 0, 0, 1);
    Color.GREEN = new Color(0, 1, 0, 1);
    Color.BLUE = new Color(0, 0, 1, 1);
    Color.MAGENTA = new Color(1, 0, 1, 1);
    spine.Color = Color;
    class MathUtils {
        static clamp(value, min, max) {
            if (value < min) {
                return min;
            }
            if (value > max) {
                return max;
            }
            return value;
        }
        static cosDeg(degrees) {
            return Math.cos(degrees * MathUtils.degRad);
        }
        static sinDeg(degrees) {
            return Math.sin(degrees * MathUtils.degRad);
        }
        static signum(value) {
            return value > 0 ? 1 : value < 0 ? -1 : 0;
        }
        static toInt(x) {
            return x > 0 ? Math.floor(x) : Math.ceil(x);
        }
        static cbrt(x) {
            var y = Math.pow(Math.abs(x), 1 / 3);
            return x < 0 ? -y : y;
        }
        static randomTriangular(min, max) {
            return MathUtils.randomTriangularWith(min, max, (min + max) * 0.5);
        }
        static randomTriangularWith(min, max, mode) {
            let u = Math.random();
            let d = max - min;
            if (u <= (mode - min) / d) {
                return min + Math.sqrt(u * d * (mode - min));
            }
            return max - Math.sqrt((1 - u) * d * (max - mode));
        }
    }
    MathUtils.PI = 3.1415927;
    MathUtils.PI2 = MathUtils.PI * 2;
    MathUtils.radiansToDegrees = 180 / MathUtils.PI;
    MathUtils.radDeg = MathUtils.radiansToDegrees;
    MathUtils.degreesToRadians = MathUtils.PI / 180;
    MathUtils.degRad = MathUtils.degreesToRadians;
    spine.MathUtils = MathUtils;
    class Interpolation {
        apply(start, end, a) {
            return start + (end - start) * this.applyInternal(a);
        }
    }
    spine.Interpolation = Interpolation;
    class Pow extends Interpolation {
        constructor(power) {
            super();
            this.power = 2;
            this.power = power;
        }
        applyInternal(a) {
            if (a <= 0.5) {
                return Math.pow(a * 2, this.power) / 2;
            }
            return Math.pow((a - 1) * 2, this.power) / (this.power % 2 == 0 ? -2 : 2) + 1;
        }
    }
    spine.Pow = Pow;
    class PowOut extends Pow {
        constructor(power) {
            super(power);
        }
        applyInternal(a) {
            return Math.pow(a - 1, this.power) * (this.power % 2 == 0 ? -1 : 1) + 1;
        }
    }
    spine.PowOut = PowOut;
    class Utils {
        static arrayCopy(source, sourceStart, dest, destStart, numElements) {
            for (let i = sourceStart, j = destStart; i < sourceStart + numElements; i++, j++) {
                dest[j] = source[i];
            }
        }
        static setArraySize(array, size, value = 0) {
            let oldSize = array.length;
            if (oldSize == size) {
                return array;
            }
            array.length = size;
            if (oldSize < size) {
                for (let i = oldSize; i < size; i++) {
                    array[i] = value;
                }
            }
            return array;
        }
        static ensureArrayCapacity(array, size, value = 0) {
            if (array.length >= size) {
                return array;
            }
            return Utils.setArraySize(array, size, value);
        }
        static newArray(size, defaultValue) {
            let array = new Array(size);
            for (let i = 0; i < size; i++) {
                array[i] = defaultValue;
            }
            return array;
        }
        static newFloatArray(size) {
            if (Utils.SUPPORTS_TYPED_ARRAYS) {
                return new Float32Array(size);
            }
            else {
                let array = new Array(size);
                for (let i = 0; i < array.length; i++) {
                    array[i] = 0;
                }
                return array;
            }
        }
        static newShortArray(size) {
            if (Utils.SUPPORTS_TYPED_ARRAYS) {
                return new Int16Array(size);
            }
            else {
                let array = new Array(size);
                for (let i = 0; i < array.length; i++) {
                    array[i] = 0;
                }
                return array;
            }
        }
        static toFloatArray(array) {
            return Utils.SUPPORTS_TYPED_ARRAYS ? new Float32Array(array) : array;
        }
        static toSinglePrecision(value) {
            return Utils.SUPPORTS_TYPED_ARRAYS ? Math.fround(value) : value;
        }
    }
    Utils.SUPPORTS_TYPED_ARRAYS = typeof (Float32Array) !== "undefined";
    spine.Utils = Utils;
    class DebugUtils {
        static logBones(skeleton) {
            for (let i = 0; i < skeleton.bones.length; i++) {
                let bone = skeleton.bones[i];
                console.log(bone.data.name + ", " + bone.a + ", " + bone.b + ", " + bone.c + ", " + bone.d + ", " + bone.worldX + ", " + bone.worldY);
            }
        }
    }
    spine.DebugUtils = DebugUtils;
    class Pool {
        constructor(instantiator) {
            this.items = new Array();
            this.instantiator = instantiator;
        }
        obtain() {
            return this.items.length > 0 ? this.items.pop() : this.instantiator();
        }
        free(item) {
            if (item.reset) {
                item.reset();
            }
            this.items.push(item);
        }
        freeAll(items) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].reset) {
                    items[i].reset();
                }
                this.items[i] = items[i];
            }
        }
        clear() {
            this.items.length = 0;
        }
    }
    spine.Pool = Pool;
    class Vector2 {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }
        set(x, y) {
            this.x = x;
            this.y = y;
            return this;
        }
        length() {
            let x = this.x;
            let y = this.y;
            return Math.sqrt(x * x + y * y);
        }
        normalize() {
            let len = this.length();
            if (len != 0) {
                this.x /= len;
                this.y /= len;
            }
            return this;
        }
    }
    spine.Vector2 = Vector2;
    class TimeKeeper {
        constructor() {
            this.maxDelta = 64;
            this.framesPerSecond = 0;
            this.delta = 0;
            this.totalTime = 0;
            this.lastTime = Date.now();
            this.frameCount = 0;
            this.frameTime = 0;
        }
        update() {
            var now = Date.now();
            this.delta = now - this.lastTime;
            this.frameTime += this.delta;
            this.totalTime += this.delta;
            if (this.delta > this.maxDelta) {
                this.delta = this.maxDelta;
            }
            this.lastTime = now;
            this.frameCount++;
            if (this.frameTime > 1) {
                this.framesPerSecond = this.frameCount / this.frameTime;
                this.frameTime = 0;
                this.frameCount = 0;
            }
        }
    }
    spine.TimeKeeper = TimeKeeper;
    class WindowedMean {
        constructor(windowSize = 32) {
            this.addedValues = 0;
            this.lastValue = 0;
            this.mean = 0;
            this.dirty = true;
            this.values = new Array(windowSize);
        }
        hasEnoughData() {
            return this.addedValues >= this.values.length;
        }
        addValue(value) {
            if (this.addedValues < this.values.length) {
                this.addedValues++;
            }
            this.values[this.lastValue++] = value;
            if (this.lastValue > this.values.length - 1) {
                this.lastValue = 0;
            }
            this.dirty = true;
        }
        getMean() {
            if (this.hasEnoughData()) {
                if (this.dirty) {
                    let mean = 0;
                    for (let i = 0; i < this.values.length; i++) {
                        mean += this.values[i];
                    }
                    this.mean = mean / this.values.length;
                    this.dirty = false;
                }
                return this.mean;
            }
            else {
                return 0;
            }
        }
    }
    spine.WindowedMean = WindowedMean;
})(spine || (spine = {}));
//# sourceMappingURL=Utils.js.map
var spine;
(function (spine) {
    class AssetManager {
        constructor(textureLoader, pathPrefix = "") {
            this.assets = {};
            this.errors = {};
            this.toLoad = 0;
            this.loaded = 0;
            this.textureLoader = textureLoader;
            this.pathPrefix = pathPrefix;
        }
        get(path) {
            path = this.pathPrefix + path;
            return this.assets[path];
        }
        remove(path) {
            path = this.pathPrefix + path;
            let asset = this.assets[path];
            if (asset.dispose) {
                asset.dispose();
            }
            this.assets[path] = null;
        }
        removeAll() {
            for (let key in this.assets) {
                let asset = this.assets[key];
                if (asset.dispose) {
                    asset.dispose();
                }
            }
            this.assets = {};
        }
        isLoadingComplete() {
            return this.toLoad == 0;
        }
        getToLoad() {
            return this.toLoad;
        }
        getLoaded() {
            return this.loaded;
        }
        dispose() {
            this.removeAll();
        }
        hasErrors() {
            return Object.keys(this.errors).length > 0;
        }
        getErrors() {
            return this.errors;
        }
    }
    spine.AssetManager = AssetManager;
})(spine || (spine = {}));
//# sourceMappingURL=AssetManager.js.map
//# sourceMappingURL=AttachmentLoader.js.map
var spine;
(function (spine) {
    class AtlasAttachmentLoader {
        constructor(atlas) {
            this.atlas = atlas;
        }
        newRegionAttachment(skin, name, path) {
            let region = this.atlas.findRegion(path);
            if (region == null) {
                throw new Error("Region not found in atlas: " + path + " (region attachment: " + name + ")");
            }
            region.renderObject = region;
            let attachment = new spine.RegionAttachment(name);
            attachment.setRegion(region);
            return attachment;
        }
        newMeshAttachment(skin, name, path) {
            let region = this.atlas.findRegion(path);
            if (region == null) {
                return null;
            }
            region.renderObject = region;
            let attachment = new spine.MeshAttachment(name);
            attachment.region = region;
            return attachment;
        }
        newBoundingBoxAttachment(skin, name) {
            return new spine.BoundingBoxAttachment(name);
        }
        newPathAttachment(skin, name) {
            return new spine.PathAttachment(name);
        }
        newPointAttachment(skin, name) {
            return new spine.PointAttachment(name);
        }
        newClippingAttachment(skin, name) {
            return new spine.ClippingAttachment(name);
        }
    }
    spine.AtlasAttachmentLoader = AtlasAttachmentLoader;
})(spine || (spine = {}));
//# sourceMappingURL=AtlasAttachmentLoader.js.map
var spine;
(function (spine) {
    class Attachment {
        constructor(name) {
            if (name == null) {
                throw new Error("name cannot be null.");
            }
            this.name = name;
        }
    }
    spine.Attachment = Attachment;
    class VertexAttachment extends Attachment {
        constructor(name) {
            super(name);
            this.id = (VertexAttachment.nextID++ & 65535) << 11;
            this.worldVerticesLength = 0;
        }
        computeWorldVertices(slot, start, count, worldVertices, offset, stride) {
            count = offset + (count >> 1) * stride;
            let skeleton = slot.bone.skeleton;
            let deformArray = slot.attachmentVertices;
            let vertices = this.vertices;
            let bones = this.bones;
            if (bones == null) {
                if (deformArray.length > 0) {
                    vertices = deformArray;
                }
                let bone = slot.bone;
                let x = bone.worldX;
                let y = bone.worldY;
                let a = bone.a, b = bone.b, c = bone.c, d = bone.d;
                for (let v = start, w = offset; w < count; v += 2, w += stride) {
                    let vx = vertices[v], vy = vertices[v + 1];
                    worldVertices[w] = vx * a + vy * b + x;
                    worldVertices[w + 1] = vx * c + vy * d + y;
                }
                return;
            }
            let v = 0, skip = 0;
            for (let i = 0; i < start; i += 2) {
                let n = bones[v];
                v += n + 1;
                skip += n;
            }
            let skeletonBones = skeleton.bones;
            if (deformArray.length == 0) {
                for (let w = offset, b = skip * 3; w < count; w += stride) {
                    let wx = 0, wy = 0;
                    let n = bones[v++];
                    n += v;
                    for (; v < n; v++, b += 3) {
                        let bone = skeletonBones[bones[v]];
                        let vx = vertices[b], vy = vertices[b + 1], weight = vertices[b + 2];
                        wx += (vx * bone.a + vy * bone.b + bone.worldX) * weight;
                        wy += (vx * bone.c + vy * bone.d + bone.worldY) * weight;
                    }
                    worldVertices[w] = wx;
                    worldVertices[w + 1] = wy;
                }
            }
            else {
                let deform = deformArray;
                for (let w = offset, b = skip * 3, f = skip << 1; w < count; w += stride) {
                    let wx = 0, wy = 0;
                    let n = bones[v++];
                    n += v;
                    for (; v < n; v++, b += 3, f += 2) {
                        let bone = skeletonBones[bones[v]];
                        let vx = vertices[b] + deform[f], vy = vertices[b + 1] + deform[f + 1], weight = vertices[b + 2];
                        wx += (vx * bone.a + vy * bone.b + bone.worldX) * weight;
                        wy += (vx * bone.c + vy * bone.d + bone.worldY) * weight;
                    }
                    worldVertices[w] = wx;
                    worldVertices[w + 1] = wy;
                }
            }
        }
        applyDeform(sourceAttachment) {
            return this == sourceAttachment;
        }
    }
    VertexAttachment.nextID = 0;
    spine.VertexAttachment = VertexAttachment;
})(spine || (spine = {}));
//# sourceMappingURL=Attachment.js.map
var spine;
(function (spine) {
    class BoundingBoxAttachment extends spine.VertexAttachment {
        constructor(name) {
            super(name);
            this.color = new spine.Color(1, 1, 1, 1);
        }
    }
    spine.BoundingBoxAttachment = BoundingBoxAttachment;
})(spine || (spine = {}));
//# sourceMappingURL=BoundingBoxAttachment.js.map
var spine;
(function (spine) {
    class ClippingAttachment extends spine.VertexAttachment {
        constructor(name) {
            super(name);
            this.color = new spine.Color(0.2275, 0.2275, 0.8078, 1);
        }
    }
    spine.ClippingAttachment = ClippingAttachment;
})(spine || (spine = {}));
//# sourceMappingURL=ClippingAttachment.js.map
var spine;
(function (spine) {
    class MeshAttachment extends spine.VertexAttachment {
        constructor(name) {
            super(name);
            this.color = new spine.Color(1, 1, 1, 1);
            this.inheritDeform = false;
            this.tempColor = new spine.Color(0, 0, 0, 0);
        }
        updateUVs() {
            let u = 0, v = 0, width = 0, height = 0;
            if (this.region == null) {
                u = v = 0;
                width = height = 1;
            }
            else {
                u = this.region.u;
                v = this.region.v;
                width = this.region.u2 - u;
                height = this.region.v2 - v;
            }
            let regionUVs = this.regionUVs;
            if (this.uvs == null || this.uvs.length != regionUVs.length) {
                this.uvs = spine.Utils.newFloatArray(regionUVs.length);
            }
            let uvs = this.uvs;
            if (this.region.rotate) {
                for (let i = 0, n = uvs.length; i < n; i += 2) {
                    uvs[i] = u + regionUVs[i + 1] * width;
                    uvs[i + 1] = v + height - regionUVs[i] * height;
                }
            }
            else {
                for (let i = 0, n = uvs.length; i < n; i += 2) {
                    uvs[i] = u + regionUVs[i] * width;
                    uvs[i + 1] = v + regionUVs[i + 1] * height;
                }
            }
        }
        applyDeform(sourceAttachment) {
            return this == sourceAttachment || (this.inheritDeform && this.parentMesh == sourceAttachment);
        }
        getParentMesh() {
            return this.parentMesh;
        }
        setParentMesh(parentMesh) {
            this.parentMesh = parentMesh;
            if (parentMesh != null) {
                this.bones = parentMesh.bones;
                this.vertices = parentMesh.vertices;
                this.worldVerticesLength = parentMesh.worldVerticesLength;
                this.regionUVs = parentMesh.regionUVs;
                this.triangles = parentMesh.triangles;
                this.hullLength = parentMesh.hullLength;
                this.worldVerticesLength = parentMesh.worldVerticesLength;
            }
        }
    }
    spine.MeshAttachment = MeshAttachment;
})(spine || (spine = {}));
//# sourceMappingURL=MeshAttachment.js.map
var spine;
(function (spine) {
    class PathAttachment extends spine.VertexAttachment {
        constructor(name) {
            super(name);
            this.closed = false;
            this.constantSpeed = false;
            this.color = new spine.Color(1, 1, 1, 1);
        }
    }
    spine.PathAttachment = PathAttachment;
})(spine || (spine = {}));
//# sourceMappingURL=PathAttachment.js.map
var spine;
(function (spine) {
    class PointAttachment extends spine.VertexAttachment {
        constructor(name) {
            super(name);
            this.color = new spine.Color(0.38, 0.94, 0, 1);
        }
        computeWorldPosition(bone, point) {
            point.x = this.x * bone.a + this.y * bone.b + bone.worldX;
            point.y = this.x * bone.c + this.y * bone.d + bone.worldY;
            return point;
        }
        computeWorldRotation(bone) {
            let cos = spine.MathUtils.cosDeg(this.rotation), sin = spine.MathUtils.sinDeg(this.rotation);
            let x = cos * bone.a + sin * bone.b;
            let y = cos * bone.c + sin * bone.d;
            return Math.atan2(y, x) * spine.MathUtils.radDeg;
        }
    }
    spine.PointAttachment = PointAttachment;
})(spine || (spine = {}));
//# sourceMappingURL=PointAttachment.js.map
var spine;
(function (spine) {
    class RegionAttachment extends spine.Attachment {
        constructor(name) {
            super(name);
            this.x = 0;
            this.y = 0;
            this.scaleX = 1;
            this.scaleY = 1;
            this.rotation = 0;
            this.width = 0;
            this.height = 0;
            this.color = new spine.Color(1, 1, 1, 1);
            this.offset = spine.Utils.newFloatArray(8);
            this.uvs = spine.Utils.newFloatArray(8);
            this.tempColor = new spine.Color(1, 1, 1, 1);
        }
        updateOffset() {
            let regionScaleX = this.width / this.region.originalWidth * this.scaleX;
            let regionScaleY = this.height / this.region.originalHeight * this.scaleY;
            let localX = -this.width / 2 * this.scaleX + this.region.offsetX * regionScaleX;
            let localY = -this.height / 2 * this.scaleY + this.region.offsetY * regionScaleY;
            let localX2 = localX + this.region.width * regionScaleX;
            let localY2 = localY + this.region.height * regionScaleY;
            let radians = this.rotation * Math.PI / 180;
            let cos = Math.cos(radians);
            let sin = Math.sin(radians);
            let localXCos = localX * cos + this.x;
            let localXSin = localX * sin;
            let localYCos = localY * cos + this.y;
            let localYSin = localY * sin;
            let localX2Cos = localX2 * cos + this.x;
            let localX2Sin = localX2 * sin;
            let localY2Cos = localY2 * cos + this.y;
            let localY2Sin = localY2 * sin;
            let offset = this.offset;
            offset[RegionAttachment.OX1] = localXCos - localYSin;
            offset[RegionAttachment.OY1] = localYCos + localXSin;
            offset[RegionAttachment.OX2] = localXCos - localY2Sin;
            offset[RegionAttachment.OY2] = localY2Cos + localXSin;
            offset[RegionAttachment.OX3] = localX2Cos - localY2Sin;
            offset[RegionAttachment.OY3] = localY2Cos + localX2Sin;
            offset[RegionAttachment.OX4] = localX2Cos - localYSin;
            offset[RegionAttachment.OY4] = localYCos + localX2Sin;
        }
        setRegion(region) {
            this.region = region;
            let uvs = this.uvs;
            if (region.rotate) {
                uvs[2] = region.u;
                uvs[3] = region.v2;
                uvs[4] = region.u;
                uvs[5] = region.v;
                uvs[6] = region.u2;
                uvs[7] = region.v;
                uvs[0] = region.u2;
                uvs[1] = region.v2;
            }
            else {
                uvs[0] = region.u;
                uvs[1] = region.v2;
                uvs[2] = region.u;
                uvs[3] = region.v;
                uvs[4] = region.u2;
                uvs[5] = region.v;
                uvs[6] = region.u2;
                uvs[7] = region.v2;
            }
        }
        computeWorldVertices(bone, worldVertices, offset, stride) {
            let vertexOffset = this.offset;
            let x = bone.worldX, y = bone.worldY;
            let a = bone.a, b = bone.b, c = bone.c, d = bone.d;
            let offsetX = 0, offsetY = 0;
            offsetX = vertexOffset[RegionAttachment.OX1];
            offsetY = vertexOffset[RegionAttachment.OY1];
            worldVertices[offset] = offsetX * a + offsetY * b + x;
            worldVertices[offset + 1] = offsetX * c + offsetY * d + y;
            offset += stride;
            offsetX = vertexOffset[RegionAttachment.OX2];
            offsetY = vertexOffset[RegionAttachment.OY2];
            worldVertices[offset] = offsetX * a + offsetY * b + x;
            worldVertices[offset + 1] = offsetX * c + offsetY * d + y;
            offset += stride;
            offsetX = vertexOffset[RegionAttachment.OX3];
            offsetY = vertexOffset[RegionAttachment.OY3];
            worldVertices[offset] = offsetX * a + offsetY * b + x;
            worldVertices[offset + 1] = offsetX * c + offsetY * d + y;
            offset += stride;
            offsetX = vertexOffset[RegionAttachment.OX4];
            offsetY = vertexOffset[RegionAttachment.OY4];
            worldVertices[offset] = offsetX * a + offsetY * b + x;
            worldVertices[offset + 1] = offsetX * c + offsetY * d + y;
        }
    }
    RegionAttachment.OX1 = 0;
    RegionAttachment.OY1 = 1;
    RegionAttachment.OX2 = 2;
    RegionAttachment.OY2 = 3;
    RegionAttachment.OX3 = 4;
    RegionAttachment.OY3 = 5;
    RegionAttachment.OX4 = 6;
    RegionAttachment.OY4 = 7;
    RegionAttachment.X1 = 0;
    RegionAttachment.Y1 = 1;
    RegionAttachment.C1R = 2;
    RegionAttachment.C1G = 3;
    RegionAttachment.C1B = 4;
    RegionAttachment.C1A = 5;
    RegionAttachment.U1 = 6;
    RegionAttachment.V1 = 7;
    RegionAttachment.X2 = 8;
    RegionAttachment.Y2 = 9;
    RegionAttachment.C2R = 10;
    RegionAttachment.C2G = 11;
    RegionAttachment.C2B = 12;
    RegionAttachment.C2A = 13;
    RegionAttachment.U2 = 14;
    RegionAttachment.V2 = 15;
    RegionAttachment.X3 = 16;
    RegionAttachment.Y3 = 17;
    RegionAttachment.C3R = 18;
    RegionAttachment.C3G = 19;
    RegionAttachment.C3B = 20;
    RegionAttachment.C3A = 21;
    RegionAttachment.U3 = 22;
    RegionAttachment.V3 = 23;
    RegionAttachment.X4 = 24;
    RegionAttachment.Y4 = 25;
    RegionAttachment.C4R = 26;
    RegionAttachment.C4G = 27;
    RegionAttachment.C4B = 28;
    RegionAttachment.C4A = 29;
    RegionAttachment.U4 = 30;
    RegionAttachment.V4 = 31;
    spine.RegionAttachment = RegionAttachment;
})(spine || (spine = {}));
//# sourceMappingURL=RegionAttachment.js.map
var spine;
(function (spine) {
    class Bone {
        constructor(data, skeleton, parent) {
            this.children = new Array();
            this.x = 0;
            this.y = 0;
            this.rotation = 0;
            this.scaleX = 0;
            this.scaleY = 0;
            this.shearX = 0;
            this.shearY = 0;
            this.ax = 0;
            this.ay = 0;
            this.arotation = 0;
            this.ascaleX = 0;
            this.ascaleY = 0;
            this.ashearX = 0;
            this.ashearY = 0;
            this.appliedValid = false;
            this.a = 0;
            this.b = 0;
            this.worldX = 0;
            this.c = 0;
            this.d = 0;
            this.worldY = 0;
            this.sorted = false;
            if (data == null) {
                throw new Error("data cannot be null.");
            }
            if (skeleton == null) {
                throw new Error("skeleton cannot be null.");
            }
            this.data = data;
            this.skeleton = skeleton;
            this.parent = parent;
            this.setToSetupPose();
        }
        update() {
            this.updateWorldTransformWith(this.x, this.y, this.rotation, this.scaleX, this.scaleY, this.shearX, this.shearY);
        }
        updateWorldTransform() {
            this.updateWorldTransformWith(this.x, this.y, this.rotation, this.scaleX, this.scaleY, this.shearX, this.shearY);
        }
        updateWorldTransformWith(x, y, rotation, scaleX, scaleY, shearX, shearY) {
            this.ax = x;
            this.ay = y;
            this.arotation = rotation;
            this.ascaleX = scaleX;
            this.ascaleY = scaleY;
            this.ashearX = shearX;
            this.ashearY = shearY;
            this.appliedValid = true;
            let parent = this.parent;
            if (parent == null) {
                let rotationY = rotation + 90 + shearY;
                let la = spine.MathUtils.cosDeg(rotation + shearX) * scaleX;
                let lb = spine.MathUtils.cosDeg(rotationY) * scaleY;
                let lc = spine.MathUtils.sinDeg(rotation + shearX) * scaleX;
                let ld = spine.MathUtils.sinDeg(rotationY) * scaleY;
                let skeleton = this.skeleton;
                if (skeleton.flipX) {
                    x = -x;
                    la = -la;
                    lb = -lb;
                }
                if (skeleton.flipY) {
                    y = -y;
                    lc = -lc;
                    ld = -ld;
                }
                this.a = la;
                this.b = lb;
                this.c = lc;
                this.d = ld;
                this.worldX = x + skeleton.x;
                this.worldY = y + skeleton.y;
                return;
            }
            let pa = parent.a, pb = parent.b, pc = parent.c, pd = parent.d;
            this.worldX = pa * x + pb * y + parent.worldX;
            this.worldY = pc * x + pd * y + parent.worldY;
            switch (this.data.transformMode) {
                case spine.TransformMode.Normal: {
                    let rotationY = rotation + 90 + shearY;
                    let la = spine.MathUtils.cosDeg(rotation + shearX) * scaleX;
                    let lb = spine.MathUtils.cosDeg(rotationY) * scaleY;
                    let lc = spine.MathUtils.sinDeg(rotation + shearX) * scaleX;
                    let ld = spine.MathUtils.sinDeg(rotationY) * scaleY;
                    this.a = pa * la + pb * lc;
                    this.b = pa * lb + pb * ld;
                    this.c = pc * la + pd * lc;
                    this.d = pc * lb + pd * ld;
                    return;
                }
                case spine.TransformMode.OnlyTranslation: {
                    let rotationY = rotation + 90 + shearY;
                    this.a = spine.MathUtils.cosDeg(rotation + shearX) * scaleX;
                    this.b = spine.MathUtils.cosDeg(rotationY) * scaleY;
                    this.c = spine.MathUtils.sinDeg(rotation + shearX) * scaleX;
                    this.d = spine.MathUtils.sinDeg(rotationY) * scaleY;
                    break;
                }
                case spine.TransformMode.NoRotationOrReflection: {
                    let s = pa * pa + pc * pc;
                    let prx = 0;
                    if (s > 0.0001) {
                        s = Math.abs(pa * pd - pb * pc) / s;
                        pb = pc * s;
                        pd = pa * s;
                        prx = Math.atan2(pc, pa) * spine.MathUtils.radDeg;
                    }
                    else {
                        pa = 0;
                        pc = 0;
                        prx = 90 - Math.atan2(pd, pb) * spine.MathUtils.radDeg;
                    }
                    let rx = rotation + shearX - prx;
                    let ry = rotation + shearY - prx + 90;
                    let la = spine.MathUtils.cosDeg(rx) * scaleX;
                    let lb = spine.MathUtils.cosDeg(ry) * scaleY;
                    let lc = spine.MathUtils.sinDeg(rx) * scaleX;
                    let ld = spine.MathUtils.sinDeg(ry) * scaleY;
                    this.a = pa * la - pb * lc;
                    this.b = pa * lb - pb * ld;
                    this.c = pc * la + pd * lc;
                    this.d = pc * lb + pd * ld;
                    break;
                }
                case spine.TransformMode.NoScale:
                case spine.TransformMode.NoScaleOrReflection: {
                    let cos = spine.MathUtils.cosDeg(rotation);
                    let sin = spine.MathUtils.sinDeg(rotation);
                    let za = pa * cos + pb * sin;
                    let zc = pc * cos + pd * sin;
                    let s = Math.sqrt(za * za + zc * zc);
                    if (s > 0.00001) {
                        s = 1 / s;
                    }
                    za *= s;
                    zc *= s;
                    s = Math.sqrt(za * za + zc * zc);
                    let r = Math.PI / 2 + Math.atan2(zc, za);
                    let zb = Math.cos(r) * s;
                    let zd = Math.sin(r) * s;
                    let la = spine.MathUtils.cosDeg(shearX) * scaleX;
                    let lb = spine.MathUtils.cosDeg(90 + shearY) * scaleY;
                    let lc = spine.MathUtils.sinDeg(shearX) * scaleX;
                    let ld = spine.MathUtils.sinDeg(90 + shearY) * scaleY;
                    if (this.data.transformMode != spine.TransformMode.NoScaleOrReflection ? pa * pd - pb * pc < 0 : this.skeleton.flipX != this.skeleton.flipY) {
                        zb = -zb;
                        zd = -zd;
                    }
                    this.a = za * la + zb * lc;
                    this.b = za * lb + zb * ld;
                    this.c = zc * la + zd * lc;
                    this.d = zc * lb + zd * ld;
                    return;
                }
            }
            if (this.skeleton.flipX) {
                this.a = -this.a;
                this.b = -this.b;
            }
            if (this.skeleton.flipY) {
                this.c = -this.c;
                this.d = -this.d;
            }
        }
        setToSetupPose() {
            let data = this.data;
            this.x = data.x;
            this.y = data.y;
            this.rotation = data.rotation;
            this.scaleX = data.scaleX;
            this.scaleY = data.scaleY;
            this.shearX = data.shearX;
            this.shearY = data.shearY;
        }
        getWorldRotationX() {
            return Math.atan2(this.c, this.a) * spine.MathUtils.radDeg;
        }
        getWorldRotationY() {
            return Math.atan2(this.d, this.b) * spine.MathUtils.radDeg;
        }
        getWorldScaleX() {
            return Math.sqrt(this.a * this.a + this.c * this.c);
        }
        getWorldScaleY() {
            return Math.sqrt(this.b * this.b + this.d * this.d);
        }
        updateAppliedTransform() {
            this.appliedValid = true;
            let parent = this.parent;
            if (parent == null) {
                this.ax = this.worldX;
                this.ay = this.worldY;
                this.arotation = Math.atan2(this.c, this.a) * spine.MathUtils.radDeg;
                this.ascaleX = Math.sqrt(this.a * this.a + this.c * this.c);
                this.ascaleY = Math.sqrt(this.b * this.b + this.d * this.d);
                this.ashearX = 0;
                this.ashearY = Math.atan2(this.a * this.b + this.c * this.d, this.a * this.d - this.b * this.c) * spine.MathUtils.radDeg;
                return;
            }
            let pa = parent.a, pb = parent.b, pc = parent.c, pd = parent.d;
            let pid = 1 / (pa * pd - pb * pc);
            let dx = this.worldX - parent.worldX, dy = this.worldY - parent.worldY;
            this.ax = (dx * pd * pid - dy * pb * pid);
            this.ay = (dy * pa * pid - dx * pc * pid);
            let ia = pid * pd;
            let id = pid * pa;
            let ib = pid * pb;
            let ic = pid * pc;
            let ra = ia * this.a - ib * this.c;
            let rb = ia * this.b - ib * this.d;
            let rc = id * this.c - ic * this.a;
            let rd = id * this.d - ic * this.b;
            this.ashearX = 0;
            this.ascaleX = Math.sqrt(ra * ra + rc * rc);
            if (this.ascaleX > 0.0001) {
                let det = ra * rd - rb * rc;
                this.ascaleY = det / this.ascaleX;
                this.ashearY = Math.atan2(ra * rb + rc * rd, det) * spine.MathUtils.radDeg;
                this.arotation = Math.atan2(rc, ra) * spine.MathUtils.radDeg;
            }
            else {
                this.ascaleX = 0;
                this.ascaleY = Math.sqrt(rb * rb + rd * rd);
                this.ashearY = 0;
                this.arotation = 90 - Math.atan2(rd, rb) * spine.MathUtils.radDeg;
            }
        }
        worldToLocal(world) {
            let a = this.a, b = this.b, c = this.c, d = this.d;
            let invDet = 1 / (a * d - b * c);
            let x = world.x - this.worldX, y = world.y - this.worldY;
            world.x = (x * d * invDet - y * b * invDet);
            world.y = (y * a * invDet - x * c * invDet);
            return world;
        }
        localToWorld(local) {
            let x = local.x, y = local.y;
            local.x = x * this.a + y * this.b + this.worldX;
            local.y = x * this.c + y * this.d + this.worldY;
            return local;
        }
        worldToLocalRotation(worldRotation) {
            let sin = spine.MathUtils.sinDeg(worldRotation), cos = spine.MathUtils.cosDeg(worldRotation);
            return Math.atan2(this.a * sin - this.c * cos, this.d * cos - this.b * sin) * spine.MathUtils.radDeg;
        }
        localToWorldRotation(localRotation) {
            let sin = spine.MathUtils.sinDeg(localRotation), cos = spine.MathUtils.cosDeg(localRotation);
            return Math.atan2(cos * this.c + sin * this.d, cos * this.a + sin * this.b) * spine.MathUtils.radDeg;
        }
        rotateWorld(degrees) {
            let a = this.a, b = this.b, c = this.c, d = this.d;
            let cos = spine.MathUtils.cosDeg(degrees), sin = spine.MathUtils.sinDeg(degrees);
            this.a = cos * a - sin * c;
            this.b = cos * b - sin * d;
            this.c = sin * a + cos * c;
            this.d = sin * b + cos * d;
            this.appliedValid = false;
        }
    }
    spine.Bone = Bone;
})(spine || (spine = {}));
//# sourceMappingURL=Bone.js.map
var spine;
(function (spine) {
    class IkConstraint {
        constructor(data, skeleton) {
            this.mix = 1;
            this.bendDirection = 0;
            if (data == null) {
                throw new Error("data cannot be null.");
            }
            if (skeleton == null) {
                throw new Error("skeleton cannot be null.");
            }
            this.data = data;
            this.mix = data.mix;
            this.bendDirection = data.bendDirection;
            this.bones = new Array();
            for (let i = 0; i < data.bones.length; i++) {
                this.bones.push(skeleton.findBone(data.bones[i].name));
            }
            this.target = skeleton.findBone(data.target.name);
        }
        getOrder() {
            return this.data.order;
        }
        apply() {
            this.update();
        }
        update() {
            let target = this.target;
            let bones = this.bones;
            switch (bones.length) {
                case 1:
                    this.apply1(bones[0], target.worldX, target.worldY, this.mix);
                    break;
                case 2:
                    this.apply2(bones[0], bones[1], target.worldX, target.worldY, this.bendDirection, this.mix);
                    break;
            }
        }
        apply1(bone, targetX, targetY, alpha) {
            if (!bone.appliedValid) {
                bone.updateAppliedTransform();
            }
            let p = bone.parent;
            let id = 1 / (p.a * p.d - p.b * p.c);
            let x = targetX - p.worldX, y = targetY - p.worldY;
            let tx = (x * p.d - y * p.b) * id - bone.ax, ty = (y * p.a - x * p.c) * id - bone.ay;
            let rotationIK = Math.atan2(ty, tx) * spine.MathUtils.radDeg - bone.ashearX - bone.arotation;
            if (bone.ascaleX < 0) {
                rotationIK += 180;
            }
            if (rotationIK > 180) {
                rotationIK -= 360;
            }
            else if (rotationIK < -180) {
                rotationIK += 360;
            }
            bone.updateWorldTransformWith(bone.ax, bone.ay, bone.arotation + rotationIK * alpha, bone.ascaleX, bone.ascaleY, bone.ashearX, bone.ashearY);
        }
        apply2(parent, child, targetX, targetY, bendDir, alpha) {
            if (alpha == 0) {
                child.updateWorldTransform();
                return;
            }
            if (!parent.appliedValid) {
                parent.updateAppliedTransform();
            }
            if (!child.appliedValid) {
                child.updateAppliedTransform();
            }
            let px = parent.ax, py = parent.ay, psx = parent.ascaleX, psy = parent.ascaleY, csx = child.ascaleX;
            let os1 = 0, os2 = 0, s2 = 0;
            if (psx < 0) {
                psx = -psx;
                os1 = 180;
                s2 = -1;
            }
            else {
                os1 = 0;
                s2 = 1;
            }
            if (psy < 0) {
                psy = -psy;
                s2 = -s2;
            }
            if (csx < 0) {
                csx = -csx;
                os2 = 180;
            }
            else {
                os2 = 0;
            }
            let cx = child.ax, cy = 0, cwx = 0, cwy = 0, a = parent.a, b = parent.b, c = parent.c, d = parent.d;
            let u = Math.abs(psx - psy) <= 0.0001;
            if (!u) {
                cy = 0;
                cwx = a * cx + parent.worldX;
                cwy = c * cx + parent.worldY;
            }
            else {
                cy = child.ay;
                cwx = a * cx + b * cy + parent.worldX;
                cwy = c * cx + d * cy + parent.worldY;
            }
            let pp = parent.parent;
            a = pp.a;
            b = pp.b;
            c = pp.c;
            d = pp.d;
            let id = 1 / (a * d - b * c), x = targetX - pp.worldX, y = targetY - pp.worldY;
            let tx = (x * d - y * b) * id - px, ty = (y * a - x * c) * id - py;
            x = cwx - pp.worldX;
            y = cwy - pp.worldY;
            let dx = (x * d - y * b) * id - px, dy = (y * a - x * c) * id - py;
            let l1 = Math.sqrt(dx * dx + dy * dy), l2 = child.data.length * csx, a1 = 0, a2 = 0;
            outer: if (u) {
                l2 *= psx;
                let cos = (tx * tx + ty * ty - l1 * l1 - l2 * l2) / (2 * l1 * l2);
                if (cos < -1) {
                    cos = -1;
                }
                else if (cos > 1) {
                    cos = 1;
                }
                a2 = Math.acos(cos) * bendDir;
                a = l1 + l2 * cos;
                b = l2 * Math.sin(a2);
                a1 = Math.atan2(ty * a - tx * b, tx * a + ty * b);
            }
            else {
                a = psx * l2;
                b = psy * l2;
                let aa = a * a, bb = b * b, dd = tx * tx + ty * ty, ta = Math.atan2(ty, tx);
                c = bb * l1 * l1 + aa * dd - aa * bb;
                let c1 = -2 * bb * l1, c2 = bb - aa;
                d = c1 * c1 - 4 * c2 * c;
                if (d >= 0) {
                    let q = Math.sqrt(d);
                    if (c1 < 0) {
                        q = -q;
                    }
                    q = -(c1 + q) / 2;
                    let r0 = q / c2, r1 = c / q;
                    let r = Math.abs(r0) < Math.abs(r1) ? r0 : r1;
                    if (r * r <= dd) {
                        y = Math.sqrt(dd - r * r) * bendDir;
                        a1 = ta - Math.atan2(y, r);
                        a2 = Math.atan2(y / psy, (r - l1) / psx);
                        break outer;
                    }
                }
                let minAngle = spine.MathUtils.PI, minX = l1 - a, minDist = minX * minX, minY = 0;
                let maxAngle = 0, maxX = l1 + a, maxDist = maxX * maxX, maxY = 0;
                c = -a * l1 / (aa - bb);
                if (c >= -1 && c <= 1) {
                    c = Math.acos(c);
                    x = a * Math.cos(c) + l1;
                    y = b * Math.sin(c);
                    d = x * x + y * y;
                    if (d < minDist) {
                        minAngle = c;
                        minDist = d;
                        minX = x;
                        minY = y;
                    }
                    if (d > maxDist) {
                        maxAngle = c;
                        maxDist = d;
                        maxX = x;
                        maxY = y;
                    }
                }
                if (dd <= (minDist + maxDist) / 2) {
                    a1 = ta - Math.atan2(minY * bendDir, minX);
                    a2 = minAngle * bendDir;
                }
                else {
                    a1 = ta - Math.atan2(maxY * bendDir, maxX);
                    a2 = maxAngle * bendDir;
                }
            }
            let os = Math.atan2(cy, cx) * s2;
            let rotation = parent.arotation;
            a1 = (a1 - os) * spine.MathUtils.radDeg + os1 - rotation;
            if (a1 > 180) {
                a1 -= 360;
            }
            else if (a1 < -180) {
                a1 += 360;
            }
            parent.updateWorldTransformWith(px, py, rotation + a1 * alpha, parent.ascaleX, parent.ascaleY, 0, 0);
            rotation = child.arotation;
            a2 = ((a2 + os) * spine.MathUtils.radDeg - child.ashearX) * s2 + os2 - rotation;
            if (a2 > 180) {
                a2 -= 360;
            }
            else if (a2 < -180) {
                a2 += 360;
            }
            child.updateWorldTransformWith(cx, cy, rotation + a2 * alpha, child.ascaleX, child.ascaleY, child.ashearX, child.ashearY);
        }
    }
    spine.IkConstraint = IkConstraint;
})(spine || (spine = {}));
//# sourceMappingURL=IkConstraint.js.map
var spine;
(function (spine) {
    class IkConstraintData {
        constructor(name) {
            this.order = 0;
            this.bones = new Array();
            this.bendDirection = 1;
            this.mix = 1;
            this.name = name;
        }
    }
    spine.IkConstraintData = IkConstraintData;
})(spine || (spine = {}));
//# sourceMappingURL=IkConstraintData.js.map
var spine;
(function (spine) {
    class PathConstraint {
        constructor(data, skeleton) {
            this.position = 0;
            this.spacing = 0;
            this.rotateMix = 0;
            this.translateMix = 0;
            this.spaces = new Array();
            this.positions = new Array();
            this.world = new Array();
            this.curves = new Array();
            this.lengths = new Array();
            this.segments = new Array();
            if (data == null) {
                throw new Error("data cannot be null.");
            }
            if (skeleton == null) {
                throw new Error("skeleton cannot be null.");
            }
            this.data = data;
            this.bones = new Array();
            for (let i = 0, n = data.bones.length; i < n; i++) {
                this.bones.push(skeleton.findBone(data.bones[i].name));
            }
            this.target = skeleton.findSlot(data.target.name);
            this.position = data.position;
            this.spacing = data.spacing;
            this.rotateMix = data.rotateMix;
            this.translateMix = data.translateMix;
        }
        apply() {
            this.update();
        }
        update() {
            let attachment = this.target.getAttachment();
            if (!(attachment instanceof spine.PathAttachment)) {
                return;
            }
            let rotateMix = this.rotateMix, translateMix = this.translateMix;
            let translate = translateMix > 0, rotate = rotateMix > 0;
            if (!translate && !rotate) {
                return;
            }
            let data = this.data;
            let spacingMode = data.spacingMode;
            let lengthSpacing = spacingMode == spine.SpacingMode.Length;
            let rotateMode = data.rotateMode;
            let tangents = rotateMode == spine.RotateMode.Tangent, scale = rotateMode == spine.RotateMode.ChainScale;
            let boneCount = this.bones.length, spacesCount = tangents ? boneCount : boneCount + 1;
            let bones = this.bones;
            let spaces = spine.Utils.setArraySize(this.spaces, spacesCount), lengths = null;
            let spacing = this.spacing;
            if (scale || lengthSpacing) {
                if (scale) {
                    lengths = spine.Utils.setArraySize(this.lengths, boneCount);
                }
                for (let i = 0, n = spacesCount - 1; i < n;) {
                    let bone = bones[i];
                    let setupLength = bone.data.length;
                    if (setupLength < PathConstraint.epsilon) {
                        if (scale) {
                            lengths[i] = 0;
                        }
                        spaces[++i] = 0;
                    }
                    else {
                        let x = setupLength * bone.a, y = setupLength * bone.c;
                        let length = Math.sqrt(x * x + y * y);
                        if (scale) {
                            lengths[i] = length;
                        }
                        spaces[++i] = (lengthSpacing ? setupLength + spacing : spacing) * length / setupLength;
                    }
                }
            }
            else {
                for (let i = 1; i < spacesCount; i++) {
                    spaces[i] = spacing;
                }
            }
            let positions = this.computeWorldPositions(attachment, spacesCount, tangents, data.positionMode == spine.PositionMode.Percent, spacingMode == spine.SpacingMode.Percent);
            let boneX = positions[0], boneY = positions[1], offsetRotation = data.offsetRotation;
            let tip = false;
            if (offsetRotation == 0) {
                tip = rotateMode == spine.RotateMode.Chain;
            }
            else {
                tip = false;
                let p = this.target.bone;
                offsetRotation *= p.a * p.d - p.b * p.c > 0 ? spine.MathUtils.degRad : -spine.MathUtils.degRad;
            }
            for (let i = 0, p = 3; i < boneCount; i++, p += 3) {
                let bone = bones[i];
                bone.worldX += (boneX - bone.worldX) * translateMix;
                bone.worldY += (boneY - bone.worldY) * translateMix;
                let x = positions[p], y = positions[p + 1], dx = x - boneX, dy = y - boneY;
                if (scale) {
                    let length = lengths[i];
                    if (length != 0) {
                        let s = (Math.sqrt(dx * dx + dy * dy) / length - 1) * rotateMix + 1;
                        bone.a *= s;
                        bone.c *= s;
                    }
                }
                boneX = x;
                boneY = y;
                if (rotate) {
                    let a = bone.a, b = bone.b, c = bone.c, d = bone.d, r = 0, cos = 0, sin = 0;
                    if (tangents) {
                        r = positions[p - 1];
                    }
                    else if (spaces[i + 1] == 0) {
                        r = positions[p + 2];
                    }
                    else {
                        r = Math.atan2(dy, dx);
                    }
                    r -= Math.atan2(c, a);
                    if (tip) {
                        cos = Math.cos(r);
                        sin = Math.sin(r);
                        let length = bone.data.length;
                        boneX += (length * (cos * a - sin * c) - dx) * rotateMix;
                        boneY += (length * (sin * a + cos * c) - dy) * rotateMix;
                    }
                    else {
                        r += offsetRotation;
                    }
                    if (r > spine.MathUtils.PI) {
                        r -= spine.MathUtils.PI2;
                    }
                    else if (r < -spine.MathUtils.PI) {
                        r += spine.MathUtils.PI2;
                    }
                    r *= rotateMix;
                    cos = Math.cos(r);
                    sin = Math.sin(r);
                    bone.a = cos * a - sin * c;
                    bone.b = cos * b - sin * d;
                    bone.c = sin * a + cos * c;
                    bone.d = sin * b + cos * d;
                }
                bone.appliedValid = false;
            }
        }
        computeWorldPositions(path, spacesCount, tangents, percentPosition, percentSpacing) {
            let target = this.target;
            let position = this.position;
            let spaces = this.spaces, out = spine.Utils.setArraySize(this.positions, spacesCount * 3 + 2), world = null;
            let closed = path.closed;
            let verticesLength = path.worldVerticesLength, curveCount = verticesLength / 6, prevCurve = PathConstraint.NONE;
            if (!path.constantSpeed) {
                let lengths = path.lengths;
                curveCount -= closed ? 1 : 2;
                let pathLength = lengths[curveCount];
                if (percentPosition) {
                    position *= pathLength;
                }
                if (percentSpacing) {
                    for (let i = 0; i < spacesCount; i++) {
                        spaces[i] *= pathLength;
                    }
                }
                world = spine.Utils.setArraySize(this.world, 8);
                for (let i = 0, o = 0, curve = 0; i < spacesCount; i++, o += 3) {
                    let space = spaces[i];
                    position += space;
                    let p = position;
                    if (closed) {
                        p %= pathLength;
                        if (p < 0) {
                            p += pathLength;
                        }
                        curve = 0;
                    }
                    else if (p < 0) {
                        if (prevCurve != PathConstraint.BEFORE) {
                            prevCurve = PathConstraint.BEFORE;
                            path.computeWorldVertices(target, 2, 4, world, 0, 2);
                        }
                        this.addBeforePosition(p, world, 0, out, o);
                        continue;
                    }
                    else if (p > pathLength) {
                        if (prevCurve != PathConstraint.AFTER) {
                            prevCurve = PathConstraint.AFTER;
                            path.computeWorldVertices(target, verticesLength - 6, 4, world, 0, 2);
                        }
                        this.addAfterPosition(p - pathLength, world, 0, out, o);
                        continue;
                    }
                    for (;; curve++) {
                        let length = lengths[curve];
                        if (p > length) {
                            continue;
                        }
                        if (curve == 0) {
                            p /= length;
                        }
                        else {
                            let prev = lengths[curve - 1];
                            p = (p - prev) / (length - prev);
                        }
                        break;
                    }
                    if (curve != prevCurve) {
                        prevCurve = curve;
                        if (closed && curve == curveCount) {
                            path.computeWorldVertices(target, verticesLength - 4, 4, world, 0, 2);
                            path.computeWorldVertices(target, 0, 4, world, 4, 2);
                        }
                        else {
                            path.computeWorldVertices(target, curve * 6 + 2, 8, world, 0, 2);
                        }
                    }
                    this.addCurvePosition(p, world[0], world[1], world[2], world[3], world[4], world[5], world[6], world[7], out, o, tangents || (i > 0 && space == 0));
                }
                return out;
            }
            if (closed) {
                verticesLength += 2;
                world = spine.Utils.setArraySize(this.world, verticesLength);
                path.computeWorldVertices(target, 2, verticesLength - 4, world, 0, 2);
                path.computeWorldVertices(target, 0, 2, world, verticesLength - 4, 2);
                world[verticesLength - 2] = world[0];
                world[verticesLength - 1] = world[1];
            }
            else {
                curveCount--;
                verticesLength -= 4;
                world = spine.Utils.setArraySize(this.world, verticesLength);
                path.computeWorldVertices(target, 2, verticesLength, world, 0, 2);
            }
            let curves = spine.Utils.setArraySize(this.curves, curveCount);
            let pathLength = 0;
            let x1 = world[0], y1 = world[1], cx1 = 0, cy1 = 0, cx2 = 0, cy2 = 0, x2 = 0, y2 = 0;
            let tmpx = 0, tmpy = 0, dddfx = 0, dddfy = 0, ddfx = 0, ddfy = 0, dfx = 0, dfy = 0;
            for (let i = 0, w = 2; i < curveCount; i++, w += 6) {
                cx1 = world[w];
                cy1 = world[w + 1];
                cx2 = world[w + 2];
                cy2 = world[w + 3];
                x2 = world[w + 4];
                y2 = world[w + 5];
                tmpx = (x1 - cx1 * 2 + cx2) * 0.1875;
                tmpy = (y1 - cy1 * 2 + cy2) * 0.1875;
                dddfx = ((cx1 - cx2) * 3 - x1 + x2) * 0.09375;
                dddfy = ((cy1 - cy2) * 3 - y1 + y2) * 0.09375;
                ddfx = tmpx * 2 + dddfx;
                ddfy = tmpy * 2 + dddfy;
                dfx = (cx1 - x1) * 0.75 + tmpx + dddfx * 0.16666667;
                dfy = (cy1 - y1) * 0.75 + tmpy + dddfy * 0.16666667;
                pathLength += Math.sqrt(dfx * dfx + dfy * dfy);
                dfx += ddfx;
                dfy += ddfy;
                ddfx += dddfx;
                ddfy += dddfy;
                pathLength += Math.sqrt(dfx * dfx + dfy * dfy);
                dfx += ddfx;
                dfy += ddfy;
                pathLength += Math.sqrt(dfx * dfx + dfy * dfy);
                dfx += ddfx + dddfx;
                dfy += ddfy + dddfy;
                pathLength += Math.sqrt(dfx * dfx + dfy * dfy);
                curves[i] = pathLength;
                x1 = x2;
                y1 = y2;
            }
            if (percentPosition) {
                position *= pathLength;
            }
            if (percentSpacing) {
                for (let i = 0; i < spacesCount; i++) {
                    spaces[i] *= pathLength;
                }
            }
            let segments = this.segments;
            let curveLength = 0;
            for (let i = 0, o = 0, curve = 0, segment = 0; i < spacesCount; i++, o += 3) {
                let space = spaces[i];
                position += space;
                let p = position;
                if (closed) {
                    p %= pathLength;
                    if (p < 0) {
                        p += pathLength;
                    }
                    curve = 0;
                }
                else if (p < 0) {
                    this.addBeforePosition(p, world, 0, out, o);
                    continue;
                }
                else if (p > pathLength) {
                    this.addAfterPosition(p - pathLength, world, verticesLength - 4, out, o);
                    continue;
                }
                for (;; curve++) {
                    let length = curves[curve];
                    if (p > length) {
                        continue;
                    }
                    if (curve == 0) {
                        p /= length;
                    }
                    else {
                        let prev = curves[curve - 1];
                        p = (p - prev) / (length - prev);
                    }
                    break;
                }
                if (curve != prevCurve) {
                    prevCurve = curve;
                    let ii = curve * 6;
                    x1 = world[ii];
                    y1 = world[ii + 1];
                    cx1 = world[ii + 2];
                    cy1 = world[ii + 3];
                    cx2 = world[ii + 4];
                    cy2 = world[ii + 5];
                    x2 = world[ii + 6];
                    y2 = world[ii + 7];
                    tmpx = (x1 - cx1 * 2 + cx2) * 0.03;
                    tmpy = (y1 - cy1 * 2 + cy2) * 0.03;
                    dddfx = ((cx1 - cx2) * 3 - x1 + x2) * 0.006;
                    dddfy = ((cy1 - cy2) * 3 - y1 + y2) * 0.006;
                    ddfx = tmpx * 2 + dddfx;
                    ddfy = tmpy * 2 + dddfy;
                    dfx = (cx1 - x1) * 0.3 + tmpx + dddfx * 0.16666667;
                    dfy = (cy1 - y1) * 0.3 + tmpy + dddfy * 0.16666667;
                    curveLength = Math.sqrt(dfx * dfx + dfy * dfy);
                    segments[0] = curveLength;
                    for (ii = 1; ii < 8; ii++) {
                        dfx += ddfx;
                        dfy += ddfy;
                        ddfx += dddfx;
                        ddfy += dddfy;
                        curveLength += Math.sqrt(dfx * dfx + dfy * dfy);
                        segments[ii] = curveLength;
                    }
                    dfx += ddfx;
                    dfy += ddfy;
                    curveLength += Math.sqrt(dfx * dfx + dfy * dfy);
                    segments[8] = curveLength;
                    dfx += ddfx + dddfx;
                    dfy += ddfy + dddfy;
                    curveLength += Math.sqrt(dfx * dfx + dfy * dfy);
                    segments[9] = curveLength;
                    segment = 0;
                }
                p *= curveLength;
                for (;; segment++) {
                    let length = segments[segment];
                    if (p > length) {
                        continue;
                    }
                    if (segment == 0) {
                        p /= length;
                    }
                    else {
                        let prev = segments[segment - 1];
                        p = segment + (p - prev) / (length - prev);
                    }
                    break;
                }
                this.addCurvePosition(p * 0.1, x1, y1, cx1, cy1, cx2, cy2, x2, y2, out, o, tangents || (i > 0 && space == 0));
            }
            return out;
        }
        addBeforePosition(p, temp, i, out, o) {
            let x1 = temp[i], y1 = temp[i + 1], dx = temp[i + 2] - x1, dy = temp[i + 3] - y1, r = Math.atan2(dy, dx);
            out[o] = x1 + p * Math.cos(r);
            out[o + 1] = y1 + p * Math.sin(r);
            out[o + 2] = r;
        }
        addAfterPosition(p, temp, i, out, o) {
            let x1 = temp[i + 2], y1 = temp[i + 3], dx = x1 - temp[i], dy = y1 - temp[i + 1], r = Math.atan2(dy, dx);
            out[o] = x1 + p * Math.cos(r);
            out[o + 1] = y1 + p * Math.sin(r);
            out[o + 2] = r;
        }
        addCurvePosition(p, x1, y1, cx1, cy1, cx2, cy2, x2, y2, out, o, tangents) {
            if (p == 0 || isNaN(p)) {
                p = 0.0001;
            }
            let tt = p * p, ttt = tt * p, u = 1 - p, uu = u * u, uuu = uu * u;
            let ut = u * p, ut3 = ut * 3, uut3 = u * ut3, utt3 = ut3 * p;
            let x = x1 * uuu + cx1 * uut3 + cx2 * utt3 + x2 * ttt, y = y1 * uuu + cy1 * uut3 + cy2 * utt3 + y2 * ttt;
            out[o] = x;
            out[o + 1] = y;
            if (tangents) {
                out[o + 2] = Math.atan2(y - (y1 * uu + cy1 * ut * 2 + cy2 * tt), x - (x1 * uu + cx1 * ut * 2 + cx2 * tt));
            }
        }
        getOrder() {
            return this.data.order;
        }
    }
    PathConstraint.NONE = -1;
    PathConstraint.BEFORE = -2;
    PathConstraint.AFTER = -3;
    PathConstraint.epsilon = 0.00001;
    spine.PathConstraint = PathConstraint;
})(spine || (spine = {}));
//# sourceMappingURL=PathConstraint.js.map
var spine;
(function (spine) {
    class Assets {
        constructor(clientId) {
            this.toLoad = new Array();
            this.assets = {};
            this.clientId = clientId;
        }
        loaded() {
            var i = 0;
            for (var v in this.assets) {
                i++;
            }
            return i;
        }
    }
    class SharedAssetManager {
        constructor(pathPrefix = "") {
            this.clientAssets = {};
            this.queuedAssets = {};
            this.rawAssets = {};
            this.errors = {};
            this.pathPrefix = pathPrefix;
        }
        queueAsset(clientId, textureLoader, path) {
            var clientAssets = this.clientAssets[clientId];
            if (clientAssets === null || clientAssets === undefined) {
                clientAssets = new Assets(clientId);
                this.clientAssets[clientId] = clientAssets;
            }
            if (textureLoader !== null) {
                clientAssets.textureLoader = textureLoader;
            }
            clientAssets.toLoad.push(path);
            if (this.queuedAssets[path] === path) {
                return false;
            }
            else {
                this.queuedAssets[path] = path;
                return true;
            }
        }
        loadText(clientId, path) {
            path = this.pathPrefix + path;
            if (!this.queueAsset(clientId, null, path)) {
                return;
            }
            Laya.loader.load([{ type: Laya.Loader.TEXT, url: path }], Laya.Handler.create(this, (re) => {
                if (re) {
                    this.rawAssets[path] = Laya.loader.getRes(path);
                }
                else {
                    this.errors[path] = `Couldn't load text ${path}`;
                }
            }));
        }
        loadJson(clientId, path) {
            path = this.pathPrefix + path;
            if (!this.queueAsset(clientId, null, path)) {
                return;
            }
            Laya.loader.load([{ type: Laya.Loader.JSON, url: path }], Laya.Handler.create(this, (re) => {
                if (re) {
                    this.rawAssets[path] = Laya.loader.getRes(path);
                }
                else {
                    this.errors[path] = `Couldn't load text ${path}`;
                }
            }));
        }
        loadTexture(clientId, textureLoader, path) {
            path = this.pathPrefix + path;
            if (!this.queueAsset(clientId, textureLoader, path)) {
                return;
            }
            Laya.loader.load([{ type: Laya.Loader.IMAGE, url: path }], Laya.Handler.create(this, (re) => {
                if (re) {
                    this.rawAssets[path] = Laya.loader.getRes(path);
                }
                else {
                    this.errors[path] = `Couldn't load text ${path}`;
                }
            }));
        }
        loadBinary(clientId, path) {
            path = this.pathPrefix + path;
            if (!this.queueAsset(clientId, null, path)) {
                return;
            }
            Laya.loader.load([{ type: Laya.Loader.BUFFER, url: path }], Laya.Handler.create(this, (re) => {
                if (re) {
                    var arr = Laya.loader.getRes(path);
                    var u8 = new Uint8Array(arr);
                    this.rawAssets[path] = u8;
                }
                else {
                    this.errors[path] = `Couldn't load text ${path}`;
                }
            }));
        }
        get(clientId, path) {
            path = this.pathPrefix + path;
            var clientAssets = this.clientAssets[clientId];
            if (clientAssets === null || clientAssets === undefined) {
                return true;
            }
            return clientAssets.assets[path];
        }
        updateClientAssets(clientAssets) {
            for (var i = 0; i < clientAssets.toLoad.length; i++) {
                var path = clientAssets.toLoad[i];
                var asset = clientAssets.assets[path];
                if (asset === null || asset === undefined) {
                    var rawAsset = this.rawAssets[path];
                    if (rawAsset === null || rawAsset === undefined) {
                        continue;
                    }
                    if (typeof rawAsset == "object" && !!rawAsset._bitmap) {
                        clientAssets.assets[path] = clientAssets.textureLoader(rawAsset);
                    }
                    else {
                        clientAssets.assets[path] = rawAsset;
                    }
                }
            }
        }
        isLoadingComplete(clientId) {
            var clientAssets = this.clientAssets[clientId];
            if (clientAssets === null || clientAssets === undefined) {
                return true;
            }
            this.updateClientAssets(clientAssets);
            return clientAssets.toLoad.length == clientAssets.loaded();
        }
        dispose() {
        }
        hasErrors() {
            return Object.keys(this.errors).length > 0;
        }
        getErrors() {
            var errsStr = "";
            for (var key in this.errors) {
                var element = this.errors[key];
                errsStr += element;
            }
            return errsStr;
        }
    }
    spine.SharedAssetManager = SharedAssetManager;
})(spine || (spine = {}));
//# sourceMappingURL=SharedAssetManager.js.map
var spine;
(function (spine) {
    class Texture {
        constructor(image) {
            this._image = image;
        }
        getImage() {
            return this._image;
        }
        static filterFromString(text) {
            switch (text.toLowerCase()) {
                case "nearest": return TextureFilter.Nearest;
                case "linear": return TextureFilter.Linear;
                case "mipmap": return TextureFilter.MipMap;
                case "mipmapnearestnearest": return TextureFilter.MipMapNearestNearest;
                case "mipmaplinearnearest": return TextureFilter.MipMapLinearNearest;
                case "mipmapnearestlinear": return TextureFilter.MipMapNearestLinear;
                case "mipmaplinearlinear": return TextureFilter.MipMapLinearLinear;
                default: throw new Error(`Unknown texture filter ${text}`);
            }
        }
        static wrapFromString(text) {
            switch (text.toLowerCase()) {
                case "mirroredtepeat": return TextureWrap.MirroredRepeat;
                case "clamptoedge": return TextureWrap.ClampToEdge;
                case "repeat": return TextureWrap.Repeat;
                default: throw new Error(`Unknown texture wrap ${text}`);
            }
        }
    }
    spine.Texture = Texture;
    let TextureFilter;
    (function (TextureFilter) {
        TextureFilter[TextureFilter["Nearest"] = 9728] = "Nearest";
        TextureFilter[TextureFilter["Linear"] = 9729] = "Linear";
        TextureFilter[TextureFilter["MipMap"] = 9987] = "MipMap";
        TextureFilter[TextureFilter["MipMapNearestNearest"] = 9984] = "MipMapNearestNearest";
        TextureFilter[TextureFilter["MipMapLinearNearest"] = 9985] = "MipMapLinearNearest";
        TextureFilter[TextureFilter["MipMapNearestLinear"] = 9986] = "MipMapNearestLinear";
        TextureFilter[TextureFilter["MipMapLinearLinear"] = 9987] = "MipMapLinearLinear";
    })(TextureFilter = spine.TextureFilter || (spine.TextureFilter = {}));
    let TextureWrap;
    (function (TextureWrap) {
        TextureWrap[TextureWrap["MirroredRepeat"] = 33648] = "MirroredRepeat";
        TextureWrap[TextureWrap["ClampToEdge"] = 33071] = "ClampToEdge";
        TextureWrap[TextureWrap["Repeat"] = 10497] = "Repeat";
    })(TextureWrap = spine.TextureWrap || (spine.TextureWrap = {}));
    class TextureRegion {
        constructor() {
            this.u = 0;
            this.v = 0;
            this.u2 = 0;
            this.v2 = 0;
            this.width = 0;
            this.height = 0;
            this.rotate = false;
            this.offsetX = 0;
            this.offsetY = 0;
            this.originalWidth = 0;
            this.originalHeight = 0;
        }
    }
    spine.TextureRegion = TextureRegion;
})(spine || (spine = {}));
//# sourceMappingURL=Texture.js.map
var spine;
(function (spine) {
    class TextureAtlas {
        constructor(atlasText, textureLoader) {
            this.pages = new Array();
            this.regions = new Array();
            this.load(atlasText, textureLoader);
        }
        load(atlasText, textureLoader) {
            if (textureLoader == null) {
                throw new Error("textureLoader cannot be null.");
            }
            let reader = new TextureAtlasReader(atlasText);
            let tuple = new Array(4);
            let page = null;
            while (true) {
                let line = reader.readLine();
                if (line == null) {
                    break;
                }
                line = line.trim();
                if (line.length == 0) {
                    page = null;
                }
                else if (!page) {
                    page = new TextureAtlasPage();
                    page.name = line;
                    if (reader.readTuple(tuple) == 2) {
                        page.width = parseInt(tuple[0]);
                        page.height = parseInt(tuple[1]);
                        reader.readTuple(tuple);
                    }
                    reader.readTuple(tuple);
                    page.minFilter = spine.Texture.filterFromString(tuple[0]);
                    page.magFilter = spine.Texture.filterFromString(tuple[1]);
                    let direction = reader.readValue();
                    page.uWrap = spine.TextureWrap.ClampToEdge;
                    page.vWrap = spine.TextureWrap.ClampToEdge;
                    if (direction == "x") {
                        page.uWrap = spine.TextureWrap.Repeat;
                    }
                    else if (direction == "y") {
                        page.vWrap = spine.TextureWrap.Repeat;
                    }
                    else if (direction == "xy") {
                        page.uWrap = page.vWrap = spine.TextureWrap.Repeat;
                    }
                    page.texture = textureLoader(line);
                    page.texture.setFilters(page.minFilter, page.magFilter);
                    page.texture.setWraps(page.uWrap, page.vWrap);
                    page.width = page.texture.getImage().width;
                    page.height = page.texture.getImage().height;
                    this.pages.push(page);
                }
                else {
                    let region = new TextureAtlasRegion();
                    region.name = line;
                    region.page = page;
                    region.rotate = reader.readValue() == "true";
                    reader.readTuple(tuple);
                    let x = parseInt(tuple[0]);
                    let y = parseInt(tuple[1]);
                    reader.readTuple(tuple);
                    let width = parseInt(tuple[0]);
                    let height = parseInt(tuple[1]);
                    region.u = x / page.width;
                    region.v = y / page.height;
                    if (region.rotate) {
                        region.u2 = (x + height) / page.width;
                        region.v2 = (y + width) / page.height;
                    }
                    else {
                        region.u2 = (x + width) / page.width;
                        region.v2 = (y + height) / page.height;
                    }
                    region.x = x;
                    region.y = y;
                    region.width = Math.abs(width);
                    region.height = Math.abs(height);
                    if (reader.readTuple(tuple) == 4) {
                        if (reader.readTuple(tuple) == 4) {
                            reader.readTuple(tuple);
                        }
                    }
                    region.originalWidth = parseInt(tuple[0]);
                    region.originalHeight = parseInt(tuple[1]);
                    reader.readTuple(tuple);
                    region.offsetX = parseInt(tuple[0]);
                    region.offsetY = parseInt(tuple[1]);
                    region.index = parseInt(reader.readValue());
                    region.texture = page.texture;
                    this.regions.push(region);
                }
            }
        }
        findRegion(name) {
            for (let i = 0; i < this.regions.length; i++) {
                if (this.regions[i].name == name) {
                    return this.regions[i];
                }
            }
            return null;
        }
        dispose() {
            for (let i = 0; i < this.pages.length; i++) {
                this.pages[i].texture.dispose();
            }
        }
    }
    spine.TextureAtlas = TextureAtlas;
    class TextureAtlasReader {
        constructor(text) {
            this.index = 0;
            this.lines = text.split(/\r\n|\r|\n/);
        }
        readLine() {
            if (this.index >= this.lines.length) {
                return null;
            }
            return this.lines[this.index++];
        }
        readValue() {
            let line = this.readLine();
            let colon = line.indexOf(":");
            if (colon == -1) {
                throw new Error("Invalid line: " + line);
            }
            return line.substring(colon + 1).trim();
        }
        readTuple(tuple) {
            let line = this.readLine();
            let colon = line.indexOf(":");
            if (colon == -1) {
                throw new Error("Invalid line: " + line);
            }
            let i = 0, lastMatch = colon + 1;
            for (; i < 3; i++) {
                let comma = line.indexOf(",", lastMatch);
                if (comma == -1) {
                    break;
                }
                tuple[i] = line.substr(lastMatch, comma - lastMatch).trim();
                lastMatch = comma + 1;
            }
            tuple[i] = line.substring(lastMatch).trim();
            return i + 1;
        }
    }
    class TextureAtlasPage {
    }
    spine.TextureAtlasPage = TextureAtlasPage;
    class TextureAtlasRegion extends spine.TextureRegion {
    }
    spine.TextureAtlasRegion = TextureAtlasRegion;
})(spine || (spine = {}));
//# sourceMappingURL=TextureAtlas.js.map
var spine;
(function (spine) {
    class TransformConstraint {
        constructor(data, skeleton) {
            this.rotateMix = 0;
            this.translateMix = 0;
            this.scaleMix = 0;
            this.shearMix = 0;
            this.temp = new spine.Vector2();
            if (data == null) {
                throw new Error("data cannot be null.");
            }
            if (skeleton == null) {
                throw new Error("skeleton cannot be null.");
            }
            this.data = data;
            this.rotateMix = data.rotateMix;
            this.translateMix = data.translateMix;
            this.scaleMix = data.scaleMix;
            this.shearMix = data.shearMix;
            this.bones = new Array();
            for (let i = 0; i < data.bones.length; i++) {
                this.bones.push(skeleton.findBone(data.bones[i].name));
            }
            this.target = skeleton.findBone(data.target.name);
        }
        apply() {
            this.update();
        }
        update() {
            if (this.data.local) {
                if (this.data.relative) {
                    this.applyRelativeLocal();
                }
                else {
                    this.applyAbsoluteLocal();
                }
            }
            else {
                if (this.data.relative) {
                    this.applyRelativeWorld();
                }
                else {
                    this.applyAbsoluteWorld();
                }
            }
        }
        applyAbsoluteWorld() {
            let rotateMix = this.rotateMix, translateMix = this.translateMix, scaleMix = this.scaleMix, shearMix = this.shearMix;
            let target = this.target;
            let ta = target.a, tb = target.b, tc = target.c, td = target.d;
            let degRadReflect = ta * td - tb * tc > 0 ? spine.MathUtils.degRad : -spine.MathUtils.degRad;
            let offsetRotation = this.data.offsetRotation * degRadReflect;
            let offsetShearY = this.data.offsetShearY * degRadReflect;
            let bones = this.bones;
            for (let i = 0, n = bones.length; i < n; i++) {
                let bone = bones[i];
                let modified = false;
                if (rotateMix != 0) {
                    let a = bone.a, b = bone.b, c = bone.c, d = bone.d;
                    let r = Math.atan2(tc, ta) - Math.atan2(c, a) + offsetRotation;
                    if (r > spine.MathUtils.PI) {
                        r -= spine.MathUtils.PI2;
                    }
                    else if (r < -spine.MathUtils.PI) {
                        r += spine.MathUtils.PI2;
                    }
                    r *= rotateMix;
                    let cos = Math.cos(r), sin = Math.sin(r);
                    bone.a = cos * a - sin * c;
                    bone.b = cos * b - sin * d;
                    bone.c = sin * a + cos * c;
                    bone.d = sin * b + cos * d;
                    modified = true;
                }
                if (translateMix != 0) {
                    let temp = this.temp;
                    target.localToWorld(temp.set(this.data.offsetX, this.data.offsetY));
                    bone.worldX += (temp.x - bone.worldX) * translateMix;
                    bone.worldY += (temp.y - bone.worldY) * translateMix;
                    modified = true;
                }
                if (scaleMix > 0) {
                    let s = Math.sqrt(bone.a * bone.a + bone.c * bone.c);
                    let ts = Math.sqrt(ta * ta + tc * tc);
                    if (s > 0.00001) {
                        s = (s + (ts - s + this.data.offsetScaleX) * scaleMix) / s;
                    }
                    bone.a *= s;
                    bone.c *= s;
                    s = Math.sqrt(bone.b * bone.b + bone.d * bone.d);
                    ts = Math.sqrt(tb * tb + td * td);
                    if (s > 0.00001) {
                        s = (s + (ts - s + this.data.offsetScaleY) * scaleMix) / s;
                    }
                    bone.b *= s;
                    bone.d *= s;
                    modified = true;
                }
                if (shearMix > 0) {
                    let b = bone.b, d = bone.d;
                    let by = Math.atan2(d, b);
                    let r = Math.atan2(td, tb) - Math.atan2(tc, ta) - (by - Math.atan2(bone.c, bone.a));
                    if (r > spine.MathUtils.PI) {
                        r -= spine.MathUtils.PI2;
                    }
                    else if (r < -spine.MathUtils.PI) {
                        r += spine.MathUtils.PI2;
                    }
                    r = by + (r + offsetShearY) * shearMix;
                    let s = Math.sqrt(b * b + d * d);
                    bone.b = Math.cos(r) * s;
                    bone.d = Math.sin(r) * s;
                    modified = true;
                }
                if (modified) {
                    bone.appliedValid = false;
                }
            }
        }
        applyRelativeWorld() {
            let rotateMix = this.rotateMix, translateMix = this.translateMix, scaleMix = this.scaleMix, shearMix = this.shearMix;
            let target = this.target;
            let ta = target.a, tb = target.b, tc = target.c, td = target.d;
            let degRadReflect = ta * td - tb * tc > 0 ? spine.MathUtils.degRad : -spine.MathUtils.degRad;
            let offsetRotation = this.data.offsetRotation * degRadReflect, offsetShearY = this.data.offsetShearY * degRadReflect;
            let bones = this.bones;
            for (let i = 0, n = bones.length; i < n; i++) {
                let bone = bones[i];
                let modified = false;
                if (rotateMix != 0) {
                    let a = bone.a, b = bone.b, c = bone.c, d = bone.d;
                    let r = Math.atan2(tc, ta) + offsetRotation;
                    if (r > spine.MathUtils.PI) {
                        r -= spine.MathUtils.PI2;
                    }
                    else if (r < -spine.MathUtils.PI) {
                        r += spine.MathUtils.PI2;
                    }
                    r *= rotateMix;
                    let cos = Math.cos(r), sin = Math.sin(r);
                    bone.a = cos * a - sin * c;
                    bone.b = cos * b - sin * d;
                    bone.c = sin * a + cos * c;
                    bone.d = sin * b + cos * d;
                    modified = true;
                }
                if (translateMix != 0) {
                    let temp = this.temp;
                    target.localToWorld(temp.set(this.data.offsetX, this.data.offsetY));
                    bone.worldX += temp.x * translateMix;
                    bone.worldY += temp.y * translateMix;
                    modified = true;
                }
                if (scaleMix > 0) {
                    let s = (Math.sqrt(ta * ta + tc * tc) - 1 + this.data.offsetScaleX) * scaleMix + 1;
                    bone.a *= s;
                    bone.c *= s;
                    s = (Math.sqrt(tb * tb + td * td) - 1 + this.data.offsetScaleY) * scaleMix + 1;
                    bone.b *= s;
                    bone.d *= s;
                    modified = true;
                }
                if (shearMix > 0) {
                    let r = Math.atan2(td, tb) - Math.atan2(tc, ta);
                    if (r > spine.MathUtils.PI) {
                        r -= spine.MathUtils.PI2;
                    }
                    else if (r < -spine.MathUtils.PI) {
                        r += spine.MathUtils.PI2;
                    }
                    let b = bone.b, d = bone.d;
                    r = Math.atan2(d, b) + (r - spine.MathUtils.PI / 2 + offsetShearY) * shearMix;
                    let s = Math.sqrt(b * b + d * d);
                    bone.b = Math.cos(r) * s;
                    bone.d = Math.sin(r) * s;
                    modified = true;
                }
                if (modified) {
                    bone.appliedValid = false;
                }
            }
        }
        applyAbsoluteLocal() {
            let rotateMix = this.rotateMix, translateMix = this.translateMix, scaleMix = this.scaleMix, shearMix = this.shearMix;
            let target = this.target;
            if (!target.appliedValid) {
                target.updateAppliedTransform();
            }
            let bones = this.bones;
            for (let i = 0, n = bones.length; i < n; i++) {
                let bone = bones[i];
                if (!bone.appliedValid) {
                    bone.updateAppliedTransform();
                }
                let rotation = bone.arotation;
                if (rotateMix != 0) {
                    let r = target.arotation - rotation + this.data.offsetRotation;
                    r -= (16384 - ((16384.499999999996 - r / 360) | 0)) * 360;
                    rotation += r * rotateMix;
                }
                let x = bone.ax, y = bone.ay;
                if (translateMix != 0) {
                    x += (target.ax - x + this.data.offsetX) * translateMix;
                    y += (target.ay - y + this.data.offsetY) * translateMix;
                }
                let scaleX = bone.ascaleX, scaleY = bone.ascaleY;
                if (scaleMix > 0) {
                    if (scaleX > 0.00001) {
                        scaleX = (scaleX + (target.ascaleX - scaleX + this.data.offsetScaleX) * scaleMix) / scaleX;
                    }
                    if (scaleY > 0.00001) {
                        scaleY = (scaleY + (target.ascaleY - scaleY + this.data.offsetScaleY) * scaleMix) / scaleY;
                    }
                }
                let shearY = bone.ashearY;
                if (shearMix > 0) {
                    let r = target.ashearY - shearY + this.data.offsetShearY;
                    r -= (16384 - ((16384.499999999996 - r / 360) | 0)) * 360;
                    bone.shearY += r * shearMix;
                }
                bone.updateWorldTransformWith(x, y, rotation, scaleX, scaleY, bone.ashearX, shearY);
            }
        }
        applyRelativeLocal() {
            let rotateMix = this.rotateMix, translateMix = this.translateMix, scaleMix = this.scaleMix, shearMix = this.shearMix;
            let target = this.target;
            if (!target.appliedValid) {
                target.updateAppliedTransform();
            }
            let bones = this.bones;
            for (let i = 0, n = bones.length; i < n; i++) {
                let bone = bones[i];
                if (!bone.appliedValid) {
                    bone.updateAppliedTransform();
                }
                let rotation = bone.arotation;
                if (rotateMix != 0) {
                    rotation += (target.arotation + this.data.offsetRotation) * rotateMix;
                }
                let x = bone.ax, y = bone.ay;
                if (translateMix != 0) {
                    x += (target.ax + this.data.offsetX) * translateMix;
                    y += (target.ay + this.data.offsetY) * translateMix;
                }
                let scaleX = bone.ascaleX, scaleY = bone.ascaleY;
                if (scaleMix > 0) {
                    if (scaleX > 0.00001) {
                        scaleX *= ((target.ascaleX - 1 + this.data.offsetScaleX) * scaleMix) + 1;
                    }
                    if (scaleY > 0.00001) {
                        scaleY *= ((target.ascaleY - 1 + this.data.offsetScaleY) * scaleMix) + 1;
                    }
                }
                let shearY = bone.ashearY;
                if (shearMix > 0) {
                    shearY += (target.ashearY + this.data.offsetShearY) * shearMix;
                }
                bone.updateWorldTransformWith(x, y, rotation, scaleX, scaleY, bone.ashearX, shearY);
            }
        }
        getOrder() {
            return this.data.order;
        }
    }
    spine.TransformConstraint = TransformConstraint;
})(spine || (spine = {}));
//# sourceMappingURL=TransformConstraint.js.map
var spine;
(function (spine) {
    class TransformConstraintData {
        constructor(name) {
            this.order = 0;
            this.bones = new Array();
            this.rotateMix = 0;
            this.translateMix = 0;
            this.scaleMix = 0;
            this.shearMix = 0;
            this.offsetRotation = 0;
            this.offsetX = 0;
            this.offsetY = 0;
            this.offsetScaleX = 0;
            this.offsetScaleY = 0;
            this.offsetShearY = 0;
            this.relative = false;
            this.local = false;
            if (name == null) {
                throw new Error("name cannot be null.");
            }
            this.name = name;
        }
    }
    spine.TransformConstraintData = TransformConstraintData;
})(spine || (spine = {}));
//# sourceMappingURL=TransformConstraintData.js.map
var spine;
(function (spine) {
    class JitterEffect {
        constructor(jitterX, jitterY) {
            this.jitterX = 0;
            this.jitterY = 0;
            this.jitterX = jitterX;
            this.jitterY = jitterY;
        }
        begin(skeleton) {
        }
        transform(position, uv, light, dark) {
            position.x += spine.MathUtils.randomTriangular(-this.jitterX, this.jitterY);
            position.y += spine.MathUtils.randomTriangular(-this.jitterX, this.jitterY);
        }
        end() {
        }
    }
    spine.JitterEffect = JitterEffect;
})(spine || (spine = {}));
//# sourceMappingURL=JitterEffect.js.map
var spine;
(function (spine) {
    class SwirlEffect {
        constructor(radius) {
            this.centerX = 0;
            this.centerY = 0;
            this.radius = 0;
            this.angle = 0;
            this.worldX = 0;
            this.worldY = 0;
            this.radius = radius;
        }
        begin(skeleton) {
            this.worldX = skeleton.x + this.centerX;
            this.worldY = skeleton.y + this.centerY;
        }
        transform(position, uv, light, dark) {
            let radAngle = this.angle * spine.MathUtils.degreesToRadians;
            let x = position.x - this.worldX;
            let y = position.y - this.worldY;
            let dist = Math.sqrt(x * x + y * y);
            if (dist < this.radius) {
                let theta = SwirlEffect.interpolation.apply(0, radAngle, (this.radius - dist) / this.radius);
                let cos = Math.cos(theta);
                let sin = Math.sin(theta);
                position.x = cos * x - sin * y + this.worldX;
                position.y = sin * x + cos * y + this.worldY;
            }
        }
        end() {
        }
    }
    SwirlEffect.interpolation = new spine.PowOut(2);
    spine.SwirlEffect = SwirlEffect;
})(spine || (spine = {}));
//# sourceMappingURL=SwirlEffect.js.map
var spine;
(function (spine) {
    var webgl;
    (function (webgl) {
        class AssetManager extends spine.AssetManager {
            constructor(context, pathPrefix = "") {
                super((image) => {
                    return new spine.webgl.GLTexture(context, image);
                }, pathPrefix);
            }
        }
        webgl.AssetManager = AssetManager;
    })(webgl = spine.webgl || (spine.webgl = {}));
})(spine || (spine = {}));
//# sourceMappingURL=AssetManager.js.map
var spine;
(function (spine) {
    var webgl;
    (function (webgl) {
        class GLTexture extends spine.Texture {
            constructor(context, image, useMipMaps = false) {
                super(image);
                this.texture = null;
                this.boundUnit = 0;
                this.useMipMaps = false;
                this.context = context instanceof webgl.ManagedWebGLRenderingContext ? context : new webgl.ManagedWebGLRenderingContext(context);
                this.useMipMaps = useMipMaps;
                this.restore();
                this.context.addRestorable(this);
            }
            setFilters(minFilter, magFilter) {
                let gl = this.context.gl;
                this.bind();
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
            }
            setWraps(uWrap, vWrap) {
                let gl = this.context.gl;
                this.bind();
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, uWrap);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, vWrap);
            }
            update(useMipMaps) {
                let gl = this.context.gl;
                if (!this.texture) {
                    this.texture = this.context.gl.createTexture();
                }
                this.bind();
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._image);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, useMipMaps ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                if (useMipMaps) {
                    gl.generateMipmap(gl.TEXTURE_2D);
                }
            }
            restore() {
                this.texture = null;
                this.update(this.useMipMaps);
            }
            bind(unit = 0) {
                let gl = this.context.gl;
                this.boundUnit = unit;
                gl.activeTexture(gl.TEXTURE0 + unit);
                gl.bindTexture(gl.TEXTURE_2D, this.texture);
            }
            unbind() {
                let gl = this.context.gl;
                gl.activeTexture(gl.TEXTURE0 + this.boundUnit);
                gl.bindTexture(gl.TEXTURE_2D, null);
            }
            dispose() {
                this.context.removeRestorable(this);
                let gl = this.context.gl;
                gl.deleteTexture(this.texture);
            }
        }
        webgl.GLTexture = GLTexture;
    })(webgl = spine.webgl || (spine.webgl = {}));
})(spine || (spine = {}));
//# sourceMappingURL=GLTexture.js.map
var spine;
(function (spine) {
    var webgl;
    (function (webgl) {
        class Mesh {
            constructor(context, attributes, maxVertices, maxIndices) {
                this.attributes = attributes;
                this.verticesLength = 0;
                this.dirtyVertices = false;
                this.indicesLength = 0;
                this.dirtyIndices = false;
                this.elementsPerVertex = 0;
                this.context = context instanceof webgl.ManagedWebGLRenderingContext ? context : new webgl.ManagedWebGLRenderingContext(context);
                this.elementsPerVertex = 0;
                for (let i = 0; i < attributes.length; i++) {
                    this.elementsPerVertex += attributes[i].numElements;
                }
                this.vertices = new Float32Array(maxVertices * this.elementsPerVertex);
                this.indices = new Uint16Array(maxIndices);
                this.context.addRestorable(this);
            }
            getAttributes() { return this.attributes; }
            maxVertices() { return this.vertices.length / this.elementsPerVertex; }
            numVertices() { return this.verticesLength / this.elementsPerVertex; }
            setVerticesLength(length) {
                this.dirtyVertices = true;
                this.verticesLength = length;
            }
            getVertices() { return this.vertices; }
            maxIndices() { return this.indices.length; }
            numIndices() { return this.indicesLength; }
            setIndicesLength(length) {
                this.dirtyIndices = true;
                this.indicesLength = length;
            }
            getIndices() { return this.indices; }
            ;
            getVertexSizeInFloats() {
                let size = 0;
                for (var i = 0; i < this.attributes.length; i++) {
                    let attribute = this.attributes[i];
                    size += attribute.numElements;
                }
                return size;
            }
            setVertices(vertices) {
                this.dirtyVertices = true;
                if (vertices.length > this.vertices.length) {
                    throw Error("Mesh can't store more than " + this.maxVertices() + " vertices");
                }
                this.vertices.set(vertices, 0);
                this.verticesLength = vertices.length;
            }
            setIndices(indices) {
                this.dirtyIndices = true;
                if (indices.length > this.indices.length) {
                    throw Error("Mesh can't store more than " + this.maxIndices() + " indices");
                }
                this.indices.set(indices, 0);
                this.indicesLength = indices.length;
            }
            draw(shader, primitiveType) {
                this.drawWithOffset(shader, primitiveType, 0, this.indicesLength > 0 ? this.indicesLength : this.verticesLength / this.elementsPerVertex);
            }
            drawWithOffset(shader, primitiveType, offset, count) {
                let gl = this.context.gl;
                if (this.dirtyVertices || this.dirtyIndices) {
                    this.update();
                }
                this.bind(shader);
                if (this.indicesLength > 0) {
                    gl.drawElements(primitiveType, count, gl.UNSIGNED_SHORT, offset * 2);
                }
                else {
                    gl.drawArrays(primitiveType, offset, count);
                }
                this.unbind(shader);
            }
            bind(shader) {
                let gl = this.context.gl;
                gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
                let offset = 0;
                for (let i = 0; i < this.attributes.length; i++) {
                    let attrib = this.attributes[i];
                    let location = shader.getAttributeLocation(attrib.name);
                    gl.enableVertexAttribArray(location);
                    gl.vertexAttribPointer(location, attrib.numElements, gl.FLOAT, false, this.elementsPerVertex * 4, offset * 4);
                    offset += attrib.numElements;
                }
                if (this.indicesLength > 0) {
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
                }
            }
            unbind(shader) {
                let gl = this.context.gl;
                for (let i = 0; i < this.attributes.length; i++) {
                    let attrib = this.attributes[i];
                    let location = shader.getAttributeLocation(attrib.name);
                    gl.disableVertexAttribArray(location);
                }
                gl.bindBuffer(gl.ARRAY_BUFFER, null);
                if (this.indicesLength > 0) {
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
                }
            }
            update() {
                let gl = this.context.gl;
                if (this.dirtyVertices) {
                    if (!this.verticesBuffer) {
                        this.verticesBuffer = gl.createBuffer();
                    }
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
                    gl.bufferData(gl.ARRAY_BUFFER, this.vertices.subarray(0, this.verticesLength), gl.DYNAMIC_DRAW);
                    this.dirtyVertices = false;
                }
                if (this.dirtyIndices) {
                    if (!this.indicesBuffer) {
                        this.indicesBuffer = gl.createBuffer();
                    }
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
                    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices.subarray(0, this.indicesLength), gl.DYNAMIC_DRAW);
                    this.dirtyIndices = false;
                }
            }
            restore() {
                this.verticesBuffer = null;
                this.indicesBuffer = null;
                this.update();
            }
            dispose() {
                this.context.removeRestorable(this);
                let gl = this.context.gl;
                gl.deleteBuffer(this.verticesBuffer);
                gl.deleteBuffer(this.indicesBuffer);
            }
        }
        webgl.Mesh = Mesh;
        class VertexAttribute {
            constructor(name, type, numElements) {
                this.name = name;
                this.type = type;
                this.numElements = numElements;
            }
        }
        webgl.VertexAttribute = VertexAttribute;
        class Position2Attribute extends VertexAttribute {
            constructor() {
                super(webgl.Shader.POSITION, VertexAttributeType.Float, 2);
            }
        }
        webgl.Position2Attribute = Position2Attribute;
        class Position3Attribute extends VertexAttribute {
            constructor() {
                super(webgl.Shader.POSITION, VertexAttributeType.Float, 3);
            }
        }
        webgl.Position3Attribute = Position3Attribute;
        class TexCoordAttribute extends VertexAttribute {
            constructor(unit = 0) {
                super(webgl.Shader.TEXCOORDS + (unit == 0 ? "" : unit), VertexAttributeType.Float, 2);
            }
        }
        webgl.TexCoordAttribute = TexCoordAttribute;
        class ColorAttribute extends VertexAttribute {
            constructor() {
                super(webgl.Shader.COLOR, VertexAttributeType.Float, 4);
            }
        }
        webgl.ColorAttribute = ColorAttribute;
        class Color2Attribute extends VertexAttribute {
            constructor() {
                super(webgl.Shader.COLOR2, VertexAttributeType.Float, 4);
            }
        }
        webgl.Color2Attribute = Color2Attribute;
        let VertexAttributeType;
        (function (VertexAttributeType) {
            VertexAttributeType[VertexAttributeType["Float"] = 0] = "Float";
        })(VertexAttributeType = webgl.VertexAttributeType || (webgl.VertexAttributeType = {}));
    })(webgl = spine.webgl || (spine.webgl = {}));
})(spine || (spine = {}));
//# sourceMappingURL=Mesh.js.map
var spine;
(function (spine) {
    var webgl;
    (function (webgl) {
        class PolygonBatcher {
            constructor(context, twoColorTint = true, maxVertices = 10920) {
                this.isDrawing = false;
                this.shader = null;
                this.lastTexture = null;
                this.verticesLength = 0;
                this.indicesLength = 0;
                if (maxVertices > 10920) {
                    throw new Error("Can't have more than 10920 triangles per batch: " + maxVertices);
                }
                this.context = context instanceof webgl.ManagedWebGLRenderingContext ? context : new webgl.ManagedWebGLRenderingContext(context);
                let attributes = twoColorTint ?
                    [new webgl.Position2Attribute(), new webgl.ColorAttribute(), new webgl.TexCoordAttribute(), new webgl.Color2Attribute()] :
                    [new webgl.Position2Attribute(), new webgl.ColorAttribute(), new webgl.TexCoordAttribute()];
                this.mesh = new webgl.Mesh(context, attributes, maxVertices, maxVertices * 3);
                this.srcBlend = this.context.gl.SRC_ALPHA;
                this.dstBlend = this.context.gl.ONE_MINUS_SRC_ALPHA;
            }
            begin(shader) {
                let gl = this.context.gl;
                if (this.isDrawing) {
                    throw new Error("PolygonBatch is already drawing. Call PolygonBatch.end() before calling PolygonBatch.begin()");
                }
                this.drawCalls = 0;
                this.shader = shader;
                this.lastTexture = null;
                this.isDrawing = true;
                gl.enable(gl.BLEND);
                gl.blendFunc(this.srcBlend, this.dstBlend);
            }
            setBlendMode(srcBlend, dstBlend) {
                let gl = this.context.gl;
                this.srcBlend = srcBlend;
                this.dstBlend = dstBlend;
                if (this.isDrawing) {
                    this.flush();
                    gl.blendFunc(this.srcBlend, this.dstBlend);
                }
            }
            draw(texture, vertices, indices) {
                if (texture != this.lastTexture) {
                    this.flush();
                    this.lastTexture = texture;
                }
                else if (this.verticesLength + vertices.length > this.mesh.getVertices().length ||
                    this.indicesLength + indices.length > this.mesh.getIndices().length) {
                    this.flush();
                }
                let indexStart = this.mesh.numVertices();
                this.mesh.getVertices().set(vertices, this.verticesLength);
                this.verticesLength += vertices.length;
                this.mesh.setVerticesLength(this.verticesLength);
                let indicesArray = this.mesh.getIndices();
                for (let i = this.indicesLength, j = 0; j < indices.length; i++, j++) {
                    indicesArray[i] = indices[j] + indexStart;
                }
                this.indicesLength += indices.length;
                this.mesh.setIndicesLength(this.indicesLength);
            }
            flush() {
                let gl = this.context.gl;
                if (this.verticesLength == 0) {
                    return;
                }
                this.lastTexture.bind();
                this.mesh.draw(this.shader, gl.TRIANGLES);
                this.verticesLength = 0;
                this.indicesLength = 0;
                this.mesh.setVerticesLength(0);
                this.mesh.setIndicesLength(0);
                this.drawCalls++;
            }
            end() {
                let gl = this.context.gl;
                if (!this.isDrawing) {
                    throw new Error("PolygonBatch is not drawing. Call PolygonBatch.begin() before calling PolygonBatch.end()");
                }
                if (this.verticesLength > 0 || this.indicesLength > 0) {
                    this.flush();
                }
                this.shader = null;
                this.lastTexture = null;
                this.isDrawing = false;
                gl.disable(gl.BLEND);
            }
            getDrawCalls() { return this.drawCalls; }
            dispose() {
                this.mesh.dispose();
            }
        }
        webgl.PolygonBatcher = PolygonBatcher;
    })(webgl = spine.webgl || (spine.webgl = {}));
})(spine || (spine = {}));
//# sourceMappingURL=PolygonBatcher.js.map
var spine;
(function (spine) {
    var webgl;
    (function (webgl) {
        class SceneRenderer {
            constructor(canvas, context, twoColorTint = true) {
                this.twoColorTint = false;
                this.activeRenderer = null;
                this.QUAD = [
                    0, 0, 1, 1, 1, 1, 0, 0,
                    0, 0, 1, 1, 1, 1, 0, 0,
                    0, 0, 1, 1, 1, 1, 0, 0,
                    0, 0, 1, 1, 1, 1, 0, 0,
                ];
                this.QUAD_TRIANGLES = [0, 1, 2, 2, 3, 0];
                this.WHITE = new spine.Color(1, 1, 1, 1);
                this.canvas = canvas;
                this.context = context instanceof webgl.ManagedWebGLRenderingContext ? context : new webgl.ManagedWebGLRenderingContext(context);
                this.twoColorTint = twoColorTint;
                this.camera = new webgl.OrthoCamera(canvas.width, canvas.height);
                this.batcherShader = twoColorTint ? webgl.Shader.newTwoColoredTextured(this.context) : webgl.Shader.newColoredTextured(this.context);
                this.batcher = new webgl.PolygonBatcher(this.context, twoColorTint);
                this.shapesShader = webgl.Shader.newColored(this.context);
                this.shapes = new webgl.ShapeRenderer(this.context);
                this.skeletonRenderer = new webgl.SkeletonRenderer(this.context, twoColorTint);
                this.skeletonDebugRenderer = new webgl.SkeletonDebugRenderer(this.context);
            }
            begin() {
                this.camera.update();
                this.enableRenderer(this.batcher);
            }
            drawSkeleton(skeleton, premultipliedAlpha = false, slotRangeStart = -1, slotRangeEnd = -1) {
                this.enableRenderer(this.batcher);
                this.skeletonRenderer.premultipliedAlpha = premultipliedAlpha;
                this.skeletonRenderer.draw(this.batcher, skeleton, slotRangeStart, slotRangeEnd);
            }
            drawSkeletonDebug(skeleton, premultipliedAlpha = false, ignoredBones = null) {
                this.enableRenderer(this.shapes);
                this.skeletonDebugRenderer.premultipliedAlpha = premultipliedAlpha;
                this.skeletonDebugRenderer.draw(this.shapes, skeleton, ignoredBones);
            }
            drawTexture(texture, x, y, width, height, color = null) {
                this.enableRenderer(this.batcher);
                if (color === null) {
                    color = this.WHITE;
                }
                let quad = this.QUAD;
                var i = 0;
                quad[i++] = x;
                quad[i++] = y;
                quad[i++] = color.r;
                quad[i++] = color.g;
                quad[i++] = color.b;
                quad[i++] = color.a;
                quad[i++] = 0;
                quad[i++] = 1;
                if (this.twoColorTint) {
                    quad[i++] = 0;
                    quad[i++] = 0;
                    quad[i++] = 0;
                    quad[i++] = 0;
                }
                quad[i++] = x + width;
                quad[i++] = y;
                quad[i++] = color.r;
                quad[i++] = color.g;
                quad[i++] = color.b;
                quad[i++] = color.a;
                quad[i++] = 1;
                quad[i++] = 1;
                if (this.twoColorTint) {
                    quad[i++] = 0;
                    quad[i++] = 0;
                    quad[i++] = 0;
                    quad[i++] = 0;
                }
                quad[i++] = x + width;
                quad[i++] = y + height;
                quad[i++] = color.r;
                quad[i++] = color.g;
                quad[i++] = color.b;
                quad[i++] = color.a;
                quad[i++] = 1;
                quad[i++] = 0;
                if (this.twoColorTint) {
                    quad[i++] = 0;
                    quad[i++] = 0;
                    quad[i++] = 0;
                    quad[i++] = 0;
                }
                quad[i++] = x;
                quad[i++] = y + height;
                quad[i++] = color.r;
                quad[i++] = color.g;
                quad[i++] = color.b;
                quad[i++] = color.a;
                quad[i++] = 0;
                quad[i++] = 0;
                if (this.twoColorTint) {
                    quad[i++] = 0;
                    quad[i++] = 0;
                    quad[i++] = 0;
                    quad[i++] = 0;
                }
                this.batcher.draw(texture, quad, this.QUAD_TRIANGLES);
            }
            drawTextureUV(texture, x, y, width, height, u, v, u2, v2, color = null) {
                this.enableRenderer(this.batcher);
                if (color === null) {
                    color = this.WHITE;
                }
                let quad = this.QUAD;
                var i = 0;
                quad[i++] = x;
                quad[i++] = y;
                quad[i++] = color.r;
                quad[i++] = color.g;
                quad[i++] = color.b;
                quad[i++] = color.a;
                quad[i++] = u;
                quad[i++] = v;
                if (this.twoColorTint) {
                    quad[i++] = 0;
                    quad[i++] = 0;
                    quad[i++] = 0;
                    quad[i++] = 0;
                }
                quad[i++] = x + width;
                quad[i++] = y;
                quad[i++] = color.r;
                quad[i++] = color.g;
                quad[i++] = color.b;
                quad[i++] = color.a;
                quad[i++] = u2;
                quad[i++] = v;
                if (this.twoColorTint) {
                    quad[i++] = 0;
                    quad[i++] = 0;
                    quad[i++] = 0;
                    quad[i++] = 0;
                }
                quad[i++] = x + width;
                quad[i++] = y + height;
                quad[i++] = color.r;
                quad[i++] = color.g;
                quad[i++] = color.b;
                quad[i++] = color.a;
                quad[i++] = u2;
                quad[i++] = v2;
                if (this.twoColorTint) {
                    quad[i++] = 0;
                    quad[i++] = 0;
                    quad[i++] = 0;
                    quad[i++] = 0;
                }
                quad[i++] = x;
                quad[i++] = y + height;
                quad[i++] = color.r;
                quad[i++] = color.g;
                quad[i++] = color.b;
                quad[i++] = color.a;
                quad[i++] = u;
                quad[i++] = v2;
                if (this.twoColorTint) {
                    quad[i++] = 0;
                    quad[i++] = 0;
                    quad[i++] = 0;
                    quad[i++] = 0;
                }
                this.batcher.draw(texture, quad, this.QUAD_TRIANGLES);
            }
            drawTextureRotated(texture, x, y, width, height, pivotX, pivotY, angle, color = null, premultipliedAlpha = false) {
                this.enableRenderer(this.batcher);
                if (color === null) {
                    color = this.WHITE;
                }
                let quad = this.QUAD;
                let worldOriginX = x + pivotX;
                let worldOriginY = y + pivotY;
                let fx = -pivotX;
                let fy = -pivotY;
                let fx2 = width - pivotX;
                let fy2 = height - pivotY;
                let p1x = fx;
                let p1y = fy;
                let p2x = fx;
                let p2y = fy2;
                let p3x = fx2;
                let p3y = fy2;
                let p4x = fx2;
                let p4y = fy;
                let x1 = 0;
                let y1 = 0;
                let x2 = 0;
                let y2 = 0;
                let x3 = 0;
                let y3 = 0;
                let x4 = 0;
                let y4 = 0;
                if (angle != 0) {
                    let cos = spine.MathUtils.cosDeg(angle);
                    let sin = spine.MathUtils.sinDeg(angle);
                    x1 = cos * p1x - sin * p1y;
                    y1 = sin * p1x + cos * p1y;
                    x4 = cos * p2x - sin * p2y;
                    y4 = sin * p2x + cos * p2y;
                    x3 = cos * p3x - sin * p3y;
                    y3 = sin * p3x + cos * p3y;
                    x2 = x3 + (x1 - x4);
                    y2 = y3 + (y1 - y4);
                }
                else {
                    x1 = p1x;
                    y1 = p1y;
                    x4 = p2x;
                    y4 = p2y;
                    x3 = p3x;
                    y3 = p3y;
                    x2 = p4x;
                    y2 = p4y;
                }
                x1 += worldOriginX;
                y1 += worldOriginY;
                x2 += worldOriginX;
                y2 += worldOriginY;
                x3 += worldOriginX;
                y3 += worldOriginY;
                x4 += worldOriginX;
                y4 += worldOriginY;
                var i = 0;
                quad[i++] = x1;
                quad[i++] = y1;
                quad[i++] = color.r;
                quad[i++] = color.g;
                quad[i++] = color.b;
                quad[i++] = color.a;
                quad[i++] = 0;
                quad[i++] = 1;
                if (this.twoColorTint) {
                    quad[i++] = 0;
                    quad[i++] = 0;
                    quad[i++] = 0;
                    quad[i++] = 0;
                }
                quad[i++] = x2;
                quad[i++] = y2;
                quad[i++] = color.r;
                quad[i++] = color.g;
                quad[i++] = color.b;
                quad[i++] = color.a;
                quad[i++] = 1;
                quad[i++] = 1;
                if (this.twoColorTint) {
                    quad[i++] = 0;
                    quad[i++] = 0;
                    quad[i++] = 0;
                    quad[i++] = 0;
                }
                quad[i++] = x3;
                quad[i++] = y3;
                quad[i++] = color.r;
                quad[i++] = color.g;
                quad[i++] = color.b;
                quad[i++] = color.a;
                quad[i++] = 1;
                quad[i++] = 0;
                if (this.twoColorTint) {
                    quad[i++] = 0;
                    quad[i++] = 0;
                    quad[i++] = 0;
                    quad[i++] = 0;
                }
                quad[i++] = x4;
                quad[i++] = y4;
                quad[i++] = color.r;
                quad[i++] = color.g;
                quad[i++] = color.b;
                quad[i++] = color.a;
                quad[i++] = 0;
                quad[i++] = 0;
                if (this.twoColorTint) {
                    quad[i++] = 0;
                    quad[i++] = 0;
                    quad[i++] = 0;
                    quad[i++] = 0;
                }
                this.batcher.draw(texture, quad, this.QUAD_TRIANGLES);
            }
            drawRegion(region, x, y, width, height, color = null, premultipliedAlpha = false) {
                this.enableRenderer(this.batcher);
                if (color === null) {
                    color = this.WHITE;
                }
                let quad = this.QUAD;
                var i = 0;
                quad[i++] = x;
                quad[i++] = y;
                quad[i++] = color.r;
                quad[i++] = color.g;
                quad[i++] = color.b;
                quad[i++] = color.a;
                quad[i++] = region.u;
                quad[i++] = region.v2;
                if (this.twoColorTint) {
                    quad[i++] = 0;
                    quad[i++] = 0;
                    quad[i++] = 0;
                    quad[i++] = 0;
                }
                quad[i++] = x + width;
                quad[i++] = y;
                quad[i++] = color.r;
                quad[i++] = color.g;
                quad[i++] = color.b;
                quad[i++] = color.a;
                quad[i++] = region.u2;
                quad[i++] = region.v2;
                if (this.twoColorTint) {
                    quad[i++] = 0;
                    quad[i++] = 0;
                    quad[i++] = 0;
                    quad[i++] = 0;
                }
                quad[i++] = x + width;
                quad[i++] = y + height;
                quad[i++] = color.r;
                quad[i++] = color.g;
                quad[i++] = color.b;
                quad[i++] = color.a;
                quad[i++] = region.u2;
                quad[i++] = region.v;
                if (this.twoColorTint) {
                    quad[i++] = 0;
                    quad[i++] = 0;
                    quad[i++] = 0;
                    quad[i++] = 0;
                }
                quad[i++] = x;
                quad[i++] = y + height;
                quad[i++] = color.r;
                quad[i++] = color.g;
                quad[i++] = color.b;
                quad[i++] = color.a;
                quad[i++] = region.u;
                quad[i++] = region.v;
                if (this.twoColorTint) {
                    quad[i++] = 0;
                    quad[i++] = 0;
                    quad[i++] = 0;
                    quad[i++] = 0;
                }
                this.batcher.draw(region.texture, quad, this.QUAD_TRIANGLES);
            }
            line(x, y, x2, y2, color = null, color2 = null) {
                this.enableRenderer(this.shapes);
                this.shapes.line(x, y, x2, y2, color);
            }
            triangle(filled, x, y, x2, y2, x3, y3, color = null, color2 = null, color3 = null) {
                this.enableRenderer(this.shapes);
                this.shapes.triangle(filled, x, y, x2, y2, x3, y3, color, color2, color3);
            }
            quad(filled, x, y, x2, y2, x3, y3, x4, y4, color = null, color2 = null, color3 = null, color4 = null) {
                this.enableRenderer(this.shapes);
                this.shapes.quad(filled, x, y, x2, y2, x3, y3, x4, y4, color, color2, color3, color4);
            }
            rect(filled, x, y, width, height, color = null) {
                this.enableRenderer(this.shapes);
                this.shapes.rect(filled, x, y, width, height, color);
            }
            rectLine(filled, x1, y1, x2, y2, width, color = null) {
                this.enableRenderer(this.shapes);
                this.shapes.rectLine(filled, x1, y1, x2, y2, width, color);
            }
            polygon(polygonVertices, offset, count, color = null) {
                this.enableRenderer(this.shapes);
                this.shapes.polygon(polygonVertices, offset, count, color);
            }
            circle(filled, x, y, radius, color = null, segments = 0) {
                this.enableRenderer(this.shapes);
                this.shapes.circle(filled, x, y, radius, color, segments);
            }
            curve(x1, y1, cx1, cy1, cx2, cy2, x2, y2, segments, color = null) {
                this.enableRenderer(this.shapes);
                this.shapes.curve(x1, y1, cx1, cy1, cx2, cy2, x2, y2, segments, color);
            }
            end() {
                if (this.activeRenderer === this.batcher) {
                    this.batcher.end();
                }
                else if (this.activeRenderer === this.shapes) {
                    this.shapes.end();
                }
                this.activeRenderer = null;
            }
            resize(resizeMode) {
                let canvas = this.canvas;
                var w = canvas.clientWidth;
                var h = canvas.clientHeight;
                if (canvas.width != w || canvas.height != h) {
                    canvas.width = w;
                    canvas.height = h;
                }
                this.context.gl.viewport(0, 0, canvas.width, canvas.height);
                if (resizeMode === ResizeMode.Stretch) {
                }
                else if (resizeMode === ResizeMode.Expand) {
                    this.camera.setViewport(w, h);
                }
                else if (resizeMode === ResizeMode.Fit) {
                    let sourceWidth = canvas.width, sourceHeight = canvas.height;
                    let targetWidth = this.camera.viewportWidth, targetHeight = this.camera.viewportHeight;
                    let targetRatio = targetHeight / targetWidth;
                    let sourceRatio = sourceHeight / sourceWidth;
                    let scale = targetRatio < sourceRatio ? targetWidth / sourceWidth : targetHeight / sourceHeight;
                    this.camera.viewportWidth = sourceWidth * scale;
                    this.camera.viewportHeight = sourceHeight * scale;
                }
                this.camera.update();
            }
            enableRenderer(renderer) {
                if (this.activeRenderer === renderer) {
                    return;
                }
                this.end();
                if (renderer instanceof webgl.PolygonBatcher) {
                    this.batcherShader.bind();
                    this.batcherShader.setUniform4x4f(webgl.Shader.MVP_MATRIX, this.camera.projectionView.values);
                    this.batcherShader.setUniformi("u_texture", 0);
                    this.batcher.begin(this.batcherShader);
                    this.activeRenderer = this.batcher;
                }
                else if (renderer instanceof webgl.ShapeRenderer) {
                    this.shapesShader.bind();
                    this.shapesShader.setUniform4x4f(webgl.Shader.MVP_MATRIX, this.camera.projectionView.values);
                    this.shapes.begin(this.shapesShader);
                    this.activeRenderer = this.shapes;
                }
                else {
                    this.activeRenderer = this.skeletonDebugRenderer;
                }
            }
            dispose() {
                this.batcher.dispose();
                this.batcherShader.dispose();
                this.shapes.dispose();
                this.shapesShader.dispose();
                this.skeletonDebugRenderer.dispose();
            }
        }
        webgl.SceneRenderer = SceneRenderer;
        let ResizeMode;
        (function (ResizeMode) {
            ResizeMode[ResizeMode["Stretch"] = 0] = "Stretch";
            ResizeMode[ResizeMode["Expand"] = 1] = "Expand";
            ResizeMode[ResizeMode["Fit"] = 2] = "Fit";
        })(ResizeMode = webgl.ResizeMode || (webgl.ResizeMode = {}));
    })(webgl = spine.webgl || (spine.webgl = {}));
})(spine || (spine = {}));
//# sourceMappingURL=SceneRenderer.js.map
var spine;
(function (spine) {
    var webgl;
    (function (webgl) {
        class Shader {
            constructor(context, vertexShader, fragmentShader) {
                this.vertexShader = vertexShader;
                this.fragmentShader = fragmentShader;
                this.vs = null;
                this.fs = null;
                this.program = null;
                this.tmp2x2 = new Float32Array(2 * 2);
                this.tmp3x3 = new Float32Array(3 * 3);
                this.tmp4x4 = new Float32Array(4 * 4);
                this.vsSource = vertexShader;
                this.fsSource = fragmentShader;
                this.context = context instanceof webgl.ManagedWebGLRenderingContext ? context : new webgl.ManagedWebGLRenderingContext(context);
                this.context.addRestorable(this);
                this.compile();
            }
            getProgram() { return this.program; }
            getVertexShader() { return this.vertexShader; }
            getFragmentShader() { return this.fragmentShader; }
            getVertexShaderSource() { return this.vsSource; }
            getFragmentSource() { return this.fsSource; }
            compile() {
                let gl = this.context.gl;
                try {
                    this.vs = this.compileShader(gl.VERTEX_SHADER, this.vertexShader);
                    this.fs = this.compileShader(gl.FRAGMENT_SHADER, this.fragmentShader);
                    this.program = this.compileProgram(this.vs, this.fs);
                }
                catch (e) {
                    this.dispose();
                    throw e;
                }
            }
            compileShader(type, source) {
                let gl = this.context.gl;
                let shader = gl.createShader(type);
                gl.shaderSource(shader, source);
                gl.compileShader(shader);
                if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                    let error = "Couldn't compile shader: " + gl.getShaderInfoLog(shader);
                    gl.deleteShader(shader);
                    if (!gl.isContextLost()) {
                        throw new Error(error);
                    }
                }
                return shader;
            }
            compileProgram(vs, fs) {
                let gl = this.context.gl;
                let program = gl.createProgram();
                gl.attachShader(program, vs);
                gl.attachShader(program, fs);
                gl.linkProgram(program);
                if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                    let error = "Couldn't compile shader program: " + gl.getProgramInfoLog(program);
                    gl.deleteProgram(program);
                    if (!gl.isContextLost()) {
                        throw new Error(error);
                    }
                }
                return program;
            }
            restore() {
                this.compile();
            }
            bind() {
                this.context.gl.useProgram(this.program);
            }
            unbind() {
                this.context.gl.useProgram(null);
            }
            setUniformi(uniform, value) {
                this.context.gl.uniform1i(this.getUniformLocation(uniform), value);
            }
            setUniformf(uniform, value) {
                this.context.gl.uniform1f(this.getUniformLocation(uniform), value);
            }
            setUniform2f(uniform, value, value2) {
                this.context.gl.uniform2f(this.getUniformLocation(uniform), value, value2);
            }
            setUniform3f(uniform, value, value2, value3) {
                this.context.gl.uniform3f(this.getUniformLocation(uniform), value, value2, value3);
            }
            setUniform4f(uniform, value, value2, value3, value4) {
                this.context.gl.uniform4f(this.getUniformLocation(uniform), value, value2, value3, value4);
            }
            setUniform2x2f(uniform, value) {
                let gl = this.context.gl;
                this.tmp2x2.set(value);
                gl.uniformMatrix2fv(this.getUniformLocation(uniform), false, this.tmp2x2);
            }
            setUniform3x3f(uniform, value) {
                let gl = this.context.gl;
                this.tmp3x3.set(value);
                gl.uniformMatrix3fv(this.getUniformLocation(uniform), false, this.tmp3x3);
            }
            setUniform4x4f(uniform, value) {
                let gl = this.context.gl;
                this.tmp4x4.set(value);
                gl.uniformMatrix4fv(this.getUniformLocation(uniform), false, this.tmp4x4);
            }
            getUniformLocation(uniform) {
                let gl = this.context.gl;
                let location = gl.getUniformLocation(this.program, uniform);
                if (!location && !gl.isContextLost()) {
                    throw new Error(`Couldn't find location for uniform ${uniform}`);
                }
                return location;
            }
            getAttributeLocation(attribute) {
                let gl = this.context.gl;
                let location = gl.getAttribLocation(this.program, attribute);
                if (location == -1 && !gl.isContextLost()) {
                    throw new Error(`Couldn't find location for attribute ${attribute}`);
                }
                return location;
            }
            dispose() {
                this.context.removeRestorable(this);
                let gl = this.context.gl;
                if (this.vs) {
                    gl.deleteShader(this.vs);
                    this.vs = null;
                }
                if (this.fs) {
                    gl.deleteShader(this.fs);
                    this.fs = null;
                }
                if (this.program) {
                    gl.deleteProgram(this.program);
                    this.program = null;
                }
            }
            static newColoredTextured(context) {
                let vs = `
				attribute vec4 ${Shader.POSITION};
				attribute vec4 ${Shader.COLOR};
				attribute vec2 ${Shader.TEXCOORDS};
				uniform mat4 ${Shader.MVP_MATRIX};
				varying vec4 v_color;
				varying vec2 v_texCoords;

				void main () {
					v_color = ${Shader.COLOR};
					v_texCoords = ${Shader.TEXCOORDS};
					gl_Position = ${Shader.MVP_MATRIX} * ${Shader.POSITION};
				}
			`;
                let fs = `
				#ifdef GL_ES
					#define LOWP lowp
					precision mediump float;
				#else
					#define LOWP
				#endif
				varying LOWP vec4 v_color;
				varying vec2 v_texCoords;
				uniform sampler2D u_texture;

				void main () {
					gl_FragColor = v_color * texture2D(u_texture, v_texCoords);
				}
			`;
                return new Shader(context, vs, fs);
            }
            static newTwoColoredTextured(context) {
                let vs = `
				attribute vec4 ${Shader.POSITION};
				attribute vec4 ${Shader.COLOR};
				attribute vec4 ${Shader.COLOR2};
				attribute vec2 ${Shader.TEXCOORDS};
				uniform mat4 ${Shader.MVP_MATRIX};
				varying vec4 v_light;
				varying vec4 v_dark;
				varying vec2 v_texCoords;

				void main () {
					v_light = ${Shader.COLOR};
					v_dark = ${Shader.COLOR2};
					v_texCoords = ${Shader.TEXCOORDS};
					gl_Position = ${Shader.MVP_MATRIX} * ${Shader.POSITION};
				}
			`;
                let fs = `
				#ifdef GL_ES
					#define LOWP lowp
					precision mediump float;
				#else
					#define LOWP
				#endif
				varying LOWP vec4 v_light;
				varying LOWP vec4 v_dark;
				varying vec2 v_texCoords;
				uniform sampler2D u_texture;

				void main () {
					vec4 texColor = texture2D(u_texture, v_texCoords);
					gl_FragColor.a = texColor.a * v_light.a;
					gl_FragColor.rgb = ((texColor.a - 1.0) * v_dark.a + 1.0 - texColor.rgb) * v_dark.rgb + texColor.rgb * v_light.rgb;
				}
			`;
                return new Shader(context, vs, fs);
            }
            static newColored(context) {
                let vs = `
				attribute vec4 ${Shader.POSITION};
				attribute vec4 ${Shader.COLOR};
				uniform mat4 ${Shader.MVP_MATRIX};
				varying vec4 v_color;

				void main () {
					v_color = ${Shader.COLOR};
					gl_Position = ${Shader.MVP_MATRIX} * ${Shader.POSITION};
				}
			`;
                let fs = `
				#ifdef GL_ES
					#define LOWP lowp
					precision mediump float;
				#else
					#define LOWP
				#endif
				varying LOWP vec4 v_color;

				void main () {
					gl_FragColor = v_color;
				}
			`;
                return new Shader(context, vs, fs);
            }
        }
        Shader.MVP_MATRIX = "u_projTrans";
        Shader.POSITION = "a_position";
        Shader.COLOR = "a_color";
        Shader.COLOR2 = "a_color2";
        Shader.TEXCOORDS = "a_texCoords";
        Shader.SAMPLER = "u_texture";
        webgl.Shader = Shader;
    })(webgl = spine.webgl || (spine.webgl = {}));
})(spine || (spine = {}));
//# sourceMappingURL=Shader.js.map
var spine;
(function (spine) {
    var webgl;
    (function (webgl) {
        class ShapeRenderer {
            constructor(context, maxVertices = 10920) {
                this.isDrawing = false;
                this.shapeType = ShapeType.Filled;
                this.color = new spine.Color(1, 1, 1, 1);
                this.vertexIndex = 0;
                this.tmp = new spine.Vector2();
                if (maxVertices > 10920) {
                    throw new Error("Can't have more than 10920 triangles per batch: " + maxVertices);
                }
                this.context = context instanceof webgl.ManagedWebGLRenderingContext ? context : new webgl.ManagedWebGLRenderingContext(context);
                this.mesh = new webgl.Mesh(context, [new webgl.Position2Attribute(), new webgl.ColorAttribute()], maxVertices, 0);
                this.srcBlend = this.context.gl.SRC_ALPHA;
                this.dstBlend = this.context.gl.ONE_MINUS_SRC_ALPHA;
            }
            begin(shader) {
                if (this.isDrawing) {
                    throw new Error("ShapeRenderer.begin() has already been called");
                }
                this.shader = shader;
                this.vertexIndex = 0;
                this.isDrawing = true;
                let gl = this.context.gl;
                gl.enable(gl.BLEND);
                gl.blendFunc(this.srcBlend, this.dstBlend);
            }
            setBlendMode(srcBlend, dstBlend) {
                let gl = this.context.gl;
                this.srcBlend = srcBlend;
                this.dstBlend = dstBlend;
                if (this.isDrawing) {
                    this.flush();
                    gl.blendFunc(this.srcBlend, this.dstBlend);
                }
            }
            setColor(color) {
                this.color.setFromColor(color);
            }
            setColorWith(r, g, b, a) {
                this.color.set(r, g, b, a);
            }
            point(x, y, color = null) {
                this.check(ShapeType.Point, 1);
                if (color === null) {
                    color = this.color;
                }
                this.vertex(x, y, color);
            }
            line(x, y, x2, y2, color = null) {
                this.check(ShapeType.Line, 2);
                let vertices = this.mesh.getVertices();
                let idx = this.vertexIndex;
                if (color === null) {
                    color = this.color;
                }
                this.vertex(x, y, color);
                this.vertex(x2, y2, color);
            }
            triangle(filled, x, y, x2, y2, x3, y3, color = null, color2 = null, color3 = null) {
                this.check(filled ? ShapeType.Filled : ShapeType.Line, 3);
                let vertices = this.mesh.getVertices();
                let idx = this.vertexIndex;
                if (color === null) {
                    color = this.color;
                }
                if (color2 === null) {
                    color2 = this.color;
                }
                if (color3 === null) {
                    color3 = this.color;
                }
                if (filled) {
                    this.vertex(x, y, color);
                    this.vertex(x2, y2, color2);
                    this.vertex(x3, y3, color3);
                }
                else {
                    this.vertex(x, y, color);
                    this.vertex(x2, y2, color2);
                    this.vertex(x2, y2, color);
                    this.vertex(x3, y3, color2);
                    this.vertex(x3, y3, color);
                    this.vertex(x, y, color2);
                }
            }
            quad(filled, x, y, x2, y2, x3, y3, x4, y4, color = null, color2 = null, color3 = null, color4 = null) {
                this.check(filled ? ShapeType.Filled : ShapeType.Line, 3);
                let vertices = this.mesh.getVertices();
                let idx = this.vertexIndex;
                if (color === null) {
                    color = this.color;
                }
                if (color2 === null) {
                    color2 = this.color;
                }
                if (color3 === null) {
                    color3 = this.color;
                }
                if (color4 === null) {
                    color4 = this.color;
                }
                if (filled) {
                    this.vertex(x, y, color);
                    this.vertex(x2, y2, color2);
                    this.vertex(x3, y3, color3);
                    this.vertex(x3, y3, color3);
                    this.vertex(x4, y4, color4);
                    this.vertex(x, y, color);
                }
                else {
                    this.vertex(x, y, color);
                    this.vertex(x2, y2, color2);
                    this.vertex(x2, y2, color2);
                    this.vertex(x3, y3, color3);
                    this.vertex(x3, y3, color3);
                    this.vertex(x4, y4, color4);
                    this.vertex(x4, y4, color4);
                    this.vertex(x, y, color);
                }
            }
            rect(filled, x, y, width, height, color = null) {
                this.quad(filled, x, y, x + width, y, x + width, y + height, x, y + height, color, color, color, color);
            }
            rectLine(filled, x1, y1, x2, y2, width, color = null) {
                this.check(filled ? ShapeType.Filled : ShapeType.Line, 8);
                if (color === null) {
                    color = this.color;
                }
                let t = this.tmp.set(y2 - y1, x1 - x2);
                t.normalize();
                width *= 0.5;
                let tx = t.x * width;
                let ty = t.y * width;
                if (!filled) {
                    this.vertex(x1 + tx, y1 + ty, color);
                    this.vertex(x1 - tx, y1 - ty, color);
                    this.vertex(x2 + tx, y2 + ty, color);
                    this.vertex(x2 - tx, y2 - ty, color);
                    this.vertex(x2 + tx, y2 + ty, color);
                    this.vertex(x1 + tx, y1 + ty, color);
                    this.vertex(x2 - tx, y2 - ty, color);
                    this.vertex(x1 - tx, y1 - ty, color);
                }
                else {
                    this.vertex(x1 + tx, y1 + ty, color);
                    this.vertex(x1 - tx, y1 - ty, color);
                    this.vertex(x2 + tx, y2 + ty, color);
                    this.vertex(x2 - tx, y2 - ty, color);
                    this.vertex(x2 + tx, y2 + ty, color);
                    this.vertex(x1 - tx, y1 - ty, color);
                }
            }
            x(x, y, size) {
                this.line(x - size, y - size, x + size, y + size);
                this.line(x - size, y + size, x + size, y - size);
            }
            polygon(polygonVertices, offset, count, color = null) {
                if (count < 3) {
                    throw new Error("Polygon must contain at least 3 vertices");
                }
                this.check(ShapeType.Line, count * 2);
                if (color === null) {
                    color = this.color;
                }
                let vertices = this.mesh.getVertices();
                let idx = this.vertexIndex;
                offset <<= 1;
                count <<= 1;
                let firstX = polygonVertices[offset];
                let firstY = polygonVertices[offset + 1];
                let last = offset + count;
                for (let i = offset, n = offset + count - 2; i < n; i += 2) {
                    let x1 = polygonVertices[i];
                    let y1 = polygonVertices[i + 1];
                    let x2 = 0;
                    let y2 = 0;
                    if (i + 2 >= last) {
                        x2 = firstX;
                        y2 = firstY;
                    }
                    else {
                        x2 = polygonVertices[i + 2];
                        y2 = polygonVertices[i + 3];
                    }
                    this.vertex(x1, y1, color);
                    this.vertex(x2, y2, color);
                }
            }
            circle(filled, x, y, radius, color = null, segments = 0) {
                if (segments === 0) {
                    segments = Math.max(1, (6 * spine.MathUtils.cbrt(radius)) | 0);
                }
                if (segments <= 0) {
                    throw new Error("segments must be > 0.");
                }
                if (color === null) {
                    color = this.color;
                }
                let angle = 2 * spine.MathUtils.PI / segments;
                let cos = Math.cos(angle);
                let sin = Math.sin(angle);
                let cx = radius, cy = 0;
                if (!filled) {
                    this.check(ShapeType.Line, segments * 2 + 2);
                    for (let i = 0; i < segments; i++) {
                        this.vertex(x + cx, y + cy, color);
                        let temp = cx;
                        cx = cos * cx - sin * cy;
                        cy = sin * temp + cos * cy;
                        this.vertex(x + cx, y + cy, color);
                    }
                    this.vertex(x + cx, y + cy, color);
                }
                else {
                    this.check(ShapeType.Filled, segments * 3 + 3);
                    segments--;
                    for (let i = 0; i < segments; i++) {
                        this.vertex(x, y, color);
                        this.vertex(x + cx, y + cy, color);
                        let temp = cx;
                        cx = cos * cx - sin * cy;
                        cy = sin * temp + cos * cy;
                        this.vertex(x + cx, y + cy, color);
                    }
                    this.vertex(x, y, color);
                    this.vertex(x + cx, y + cy, color);
                }
                let temp = cx;
                cx = radius;
                cy = 0;
                this.vertex(x + cx, y + cy, color);
            }
            curve(x1, y1, cx1, cy1, cx2, cy2, x2, y2, segments, color = null) {
                this.check(ShapeType.Line, segments * 2 + 2);
                if (color === null) {
                    color = this.color;
                }
                let subdiv_step = 1 / segments;
                let subdiv_step2 = subdiv_step * subdiv_step;
                let subdiv_step3 = subdiv_step * subdiv_step * subdiv_step;
                let pre1 = 3 * subdiv_step;
                let pre2 = 3 * subdiv_step2;
                let pre4 = 6 * subdiv_step2;
                let pre5 = 6 * subdiv_step3;
                let tmp1x = x1 - cx1 * 2 + cx2;
                let tmp1y = y1 - cy1 * 2 + cy2;
                let tmp2x = (cx1 - cx2) * 3 - x1 + x2;
                let tmp2y = (cy1 - cy2) * 3 - y1 + y2;
                let fx = x1;
                let fy = y1;
                let dfx = (cx1 - x1) * pre1 + tmp1x * pre2 + tmp2x * subdiv_step3;
                let dfy = (cy1 - y1) * pre1 + tmp1y * pre2 + tmp2y * subdiv_step3;
                let ddfx = tmp1x * pre4 + tmp2x * pre5;
                let ddfy = tmp1y * pre4 + tmp2y * pre5;
                let dddfx = tmp2x * pre5;
                let dddfy = tmp2y * pre5;
                while (segments-- > 0) {
                    this.vertex(fx, fy, color);
                    fx += dfx;
                    fy += dfy;
                    dfx += ddfx;
                    dfy += ddfy;
                    ddfx += dddfx;
                    ddfy += dddfy;
                    this.vertex(fx, fy, color);
                }
                this.vertex(fx, fy, color);
                this.vertex(x2, y2, color);
            }
            vertex(x, y, color) {
                let idx = this.vertexIndex;
                let vertices = this.mesh.getVertices();
                vertices[idx++] = x;
                vertices[idx++] = y;
                vertices[idx++] = color.r;
                vertices[idx++] = color.g;
                vertices[idx++] = color.b;
                vertices[idx++] = color.a;
                this.vertexIndex = idx;
            }
            end() {
                if (!this.isDrawing) {
                    throw new Error("ShapeRenderer.begin() has not been called");
                }
                this.flush();
                this.context.gl.disable(this.context.gl.BLEND);
                this.isDrawing = false;
            }
            flush() {
                if (this.vertexIndex == 0) {
                    return;
                }
                this.mesh.setVerticesLength(this.vertexIndex);
                this.mesh.draw(this.shader, this.shapeType);
                this.vertexIndex = 0;
            }
            check(shapeType, numVertices) {
                if (!this.isDrawing) {
                    throw new Error("ShapeRenderer.begin() has not been called");
                }
                if (this.shapeType == shapeType) {
                    if (this.mesh.maxVertices() - this.mesh.numVertices() < numVertices) {
                        this.flush();
                    }
                    else {
                        return;
                    }
                }
                else {
                    this.flush();
                    this.shapeType = shapeType;
                }
            }
            dispose() {
                this.mesh.dispose();
            }
        }
        webgl.ShapeRenderer = ShapeRenderer;
        let ShapeType;
        (function (ShapeType) {
            ShapeType[ShapeType["Point"] = 0] = "Point";
            ShapeType[ShapeType["Line"] = 1] = "Line";
            ShapeType[ShapeType["Filled"] = 4] = "Filled";
        })(ShapeType = webgl.ShapeType || (webgl.ShapeType = {}));
    })(webgl = spine.webgl || (spine.webgl = {}));
})(spine || (spine = {}));
//# sourceMappingURL=ShapeRenderer.js.map
var spine;
(function (spine) {
    var webgl;
    (function (webgl) {
        class SkeletonDebugRenderer {
            constructor(context) {
                this.boneLineColor = new spine.Color(1, 0, 0, 1);
                this.boneOriginColor = new spine.Color(0, 1, 0, 1);
                this.attachmentLineColor = new spine.Color(0, 0, 1, 0.5);
                this.triangleLineColor = new spine.Color(1, 0.64, 0, 0.5);
                this.pathColor = new spine.Color().setFromString("FF7F00");
                this.clipColor = new spine.Color(0.8, 0, 0, 2);
                this.aabbColor = new spine.Color(0, 1, 0, 0.5);
                this.drawBones = true;
                this.drawRegionAttachments = true;
                this.drawBoundingBoxes = true;
                this.drawMeshHull = true;
                this.drawMeshTriangles = true;
                this.drawPaths = true;
                this.drawSkeletonXY = false;
                this.drawClipping = true;
                this.premultipliedAlpha = false;
                this.scale = 1;
                this.boneWidth = 2;
                this.bounds = new spine.SkeletonBounds();
                this.temp = new Array();
                this.vertices = spine.Utils.newFloatArray(2 * 1024);
                this.context = context instanceof webgl.ManagedWebGLRenderingContext ? context : new webgl.ManagedWebGLRenderingContext(context);
            }
            draw(shapes, skeleton, ignoredBones = null) {
                let skeletonX = skeleton.x;
                let skeletonY = skeleton.y;
                let gl = this.context.gl;
                let srcFunc = this.premultipliedAlpha ? gl.ONE : gl.SRC_ALPHA;
                shapes.setBlendMode(srcFunc, gl.ONE_MINUS_SRC_ALPHA);
                let bones = skeleton.bones;
                if (this.drawBones) {
                    shapes.setColor(this.boneLineColor);
                    for (let i = 0, n = bones.length; i < n; i++) {
                        let bone = bones[i];
                        if (ignoredBones && ignoredBones.indexOf(bone.data.name) > -1) {
                            continue;
                        }
                        if (bone.parent == null) {
                            continue;
                        }
                        let x = skeletonX + bone.data.length * bone.a + bone.worldX;
                        let y = skeletonY + bone.data.length * bone.c + bone.worldY;
                        shapes.rectLine(true, skeletonX + bone.worldX, skeletonY + bone.worldY, x, y, this.boneWidth * this.scale);
                    }
                    if (this.drawSkeletonXY) {
                        shapes.x(skeletonX, skeletonY, 4 * this.scale);
                    }
                }
                if (this.drawRegionAttachments) {
                    shapes.setColor(this.attachmentLineColor);
                    let slots = skeleton.slots;
                    for (let i = 0, n = slots.length; i < n; i++) {
                        let slot = slots[i];
                        let attachment = slot.getAttachment();
                        if (attachment instanceof spine.RegionAttachment) {
                            let regionAttachment = attachment;
                            let vertices = this.vertices;
                            regionAttachment.computeWorldVertices(slot.bone, vertices, 0, 2);
                            shapes.line(vertices[0], vertices[1], vertices[2], vertices[3]);
                            shapes.line(vertices[2], vertices[3], vertices[4], vertices[5]);
                            shapes.line(vertices[4], vertices[5], vertices[6], vertices[7]);
                            shapes.line(vertices[6], vertices[7], vertices[0], vertices[1]);
                        }
                    }
                }
                if (this.drawMeshHull || this.drawMeshTriangles) {
                    let slots = skeleton.slots;
                    for (let i = 0, n = slots.length; i < n; i++) {
                        let slot = slots[i];
                        let attachment = slot.getAttachment();
                        if (!(attachment instanceof spine.MeshAttachment)) {
                            continue;
                        }
                        let mesh = attachment;
                        let vertices = this.vertices;
                        mesh.computeWorldVertices(slot, 0, mesh.worldVerticesLength, vertices, 0, 2);
                        let triangles = mesh.triangles;
                        let hullLength = mesh.hullLength;
                        if (this.drawMeshTriangles) {
                            shapes.setColor(this.triangleLineColor);
                            for (let ii = 0, nn = triangles.length; ii < nn; ii += 3) {
                                let v1 = triangles[ii] * 2, v2 = triangles[ii + 1] * 2, v3 = triangles[ii + 2] * 2;
                                shapes.triangle(false, vertices[v1], vertices[v1 + 1], vertices[v2], vertices[v2 + 1], vertices[v3], vertices[v3 + 1]);
                            }
                        }
                        if (this.drawMeshHull && hullLength > 0) {
                            shapes.setColor(this.attachmentLineColor);
                            hullLength = (hullLength >> 1) * 2;
                            let lastX = vertices[hullLength - 2], lastY = vertices[hullLength - 1];
                            for (let ii = 0, nn = hullLength; ii < nn; ii += 2) {
                                let x = vertices[ii], y = vertices[ii + 1];
                                shapes.line(x, y, lastX, lastY);
                                lastX = x;
                                lastY = y;
                            }
                        }
                    }
                }
                if (this.drawBoundingBoxes) {
                    let bounds = this.bounds;
                    bounds.update(skeleton, true);
                    shapes.setColor(this.aabbColor);
                    shapes.rect(false, bounds.minX, bounds.minY, bounds.getWidth(), bounds.getHeight());
                    let polygons = bounds.polygons;
                    let boxes = bounds.boundingBoxes;
                    for (let i = 0, n = polygons.length; i < n; i++) {
                        let polygon = polygons[i];
                        shapes.setColor(boxes[i].color);
                        shapes.polygon(polygon, 0, polygon.length);
                    }
                }
                if (this.drawPaths) {
                    let slots = skeleton.slots;
                    for (let i = 0, n = slots.length; i < n; i++) {
                        let slot = slots[i];
                        let attachment = slot.getAttachment();
                        if (!(attachment instanceof spine.PathAttachment)) {
                            continue;
                        }
                        let path = attachment;
                        let nn = path.worldVerticesLength;
                        let world = this.temp = spine.Utils.setArraySize(this.temp, nn, 0);
                        path.computeWorldVertices(slot, 0, nn, world, 0, 2);
                        let color = this.pathColor;
                        let x1 = world[2], y1 = world[3], x2 = 0, y2 = 0;
                        if (path.closed) {
                            shapes.setColor(color);
                            let cx1 = world[0], cy1 = world[1], cx2 = world[nn - 2], cy2 = world[nn - 1];
                            x2 = world[nn - 4];
                            y2 = world[nn - 3];
                            shapes.curve(x1, y1, cx1, cy1, cx2, cy2, x2, y2, 32);
                            shapes.setColor(SkeletonDebugRenderer.LIGHT_GRAY);
                            shapes.line(x1, y1, cx1, cy1);
                            shapes.line(x2, y2, cx2, cy2);
                        }
                        nn -= 4;
                        for (let ii = 4; ii < nn; ii += 6) {
                            let cx1 = world[ii], cy1 = world[ii + 1], cx2 = world[ii + 2], cy2 = world[ii + 3];
                            x2 = world[ii + 4];
                            y2 = world[ii + 5];
                            shapes.setColor(color);
                            shapes.curve(x1, y1, cx1, cy1, cx2, cy2, x2, y2, 32);
                            shapes.setColor(SkeletonDebugRenderer.LIGHT_GRAY);
                            shapes.line(x1, y1, cx1, cy1);
                            shapes.line(x2, y2, cx2, cy2);
                            x1 = x2;
                            y1 = y2;
                        }
                    }
                }
                if (this.drawBones) {
                    shapes.setColor(this.boneOriginColor);
                    for (let i = 0, n = bones.length; i < n; i++) {
                        let bone = bones[i];
                        if (ignoredBones && ignoredBones.indexOf(bone.data.name) > -1) {
                            continue;
                        }
                        shapes.circle(true, skeletonX + bone.worldX, skeletonY + bone.worldY, 3 * this.scale, SkeletonDebugRenderer.GREEN, 8);
                    }
                }
                if (this.drawClipping) {
                    let slots = skeleton.slots;
                    shapes.setColor(this.clipColor);
                    for (let i = 0, n = slots.length; i < n; i++) {
                        let slot = slots[i];
                        let attachment = slot.getAttachment();
                        if (!(attachment instanceof spine.ClippingAttachment)) {
                            continue;
                        }
                        let clip = attachment;
                        let nn = clip.worldVerticesLength;
                        let world = this.temp = spine.Utils.setArraySize(this.temp, nn, 0);
                        clip.computeWorldVertices(slot, 0, nn, world, 0, 2);
                        for (let i = 0, n = world.length; i < n; i += 2) {
                            let x = world[i];
                            let y = world[i + 1];
                            let x2 = world[(i + 2) % world.length];
                            let y2 = world[(i + 3) % world.length];
                            shapes.line(x, y, x2, y2);
                        }
                    }
                }
            }
            dispose() {
            }
        }
        SkeletonDebugRenderer.LIGHT_GRAY = new spine.Color(192 / 255, 192 / 255, 192 / 255, 1);
        SkeletonDebugRenderer.GREEN = new spine.Color(0, 1, 0, 1);
        webgl.SkeletonDebugRenderer = SkeletonDebugRenderer;
    })(webgl = spine.webgl || (spine.webgl = {}));
})(spine || (spine = {}));
//# sourceMappingURL=SkeletonDebugRenderer.js.map
var spine;
(function (spine) {
    class StringMap {
        constructor() {
            this._map = {};
            this._length = 0;
        }
        getValue(key) {
            key = key.toString();
            return this._map[key];
        }
        get(key) {
            return this.getValue(key);
        }
        put(key, value) {
            key = key.toString();
            if (!this.containsKey(key)) {
                this._length++;
            }
            this._map[key] = value;
            return value;
        }
        isEmpty() {
            return this._length == 0;
        }
        containsKey(key) {
            key = key.toString();
            return (key in this._map);
        }
        remove(key) {
            if (this.containsKey(key)) {
                this._length--;
                var deleteValue = this.getValue(key);
                delete this._map[key];
                return deleteValue;
            }
            return null;
        }
        getKeys() {
            var arr = [];
            for (var key in this._map) {
                arr.push(key);
            }
            return arr;
        }
        containsValue(value) {
            for (var key in this._map) {
                if (this._map[key] == value) {
                    return true;
                }
            }
            return false;
        }
        size() {
            return this._length;
        }
        clear() {
            this._length = 0;
            this._map = {};
        }
        toString() {
            let ret = "HashMap Content:\n";
            for (var key in this._map) {
                ret += key + " -> " + this._map[key] + "\n";
            }
            return ret;
        }
        _private_foreachKey(caller, func) {
            for (var key in this._map) {
                func.call(caller, key);
            }
        }
        _private_foreachValue(caller, func) {
            for (var key in this._map) {
                var value = this.getValue(key);
                func.call(caller, value);
            }
        }
    }
    spine.StringMap = StringMap;
})(spine || (spine = {}));
//# sourceMappingURL=StringMap.js.map
var spine;
(function (spine) {
    class SpineStat {
    }
    SpineStat.rendNum = 0;
    spine.SpineStat = SpineStat;
})(spine || (spine = {}));
//# sourceMappingURL=SpineStat.js.map
var spine;
(function (spine_1) {
    class FlyRender {
        constructor() {
            this._renderArr = [];
            this._isRender = false;
            this._gapNum = 0;
            this.tick = () => {
                this._gapNum++;
                if (this._gapNum % spine_1.FlypineSetting.renderGap == 0) {
                    this._gapNum = 0;
                    spine_1.SpineStat.rendNum = 0;
                    this._timeKeeper.update();
                    var gap = this._timeKeeper.delta;
                    for (let index = 0; index < this._renderArr.length; index++) {
                        const spineSkeleton = this._renderArr[index];
                        spineSkeleton.renderUpdate(gap);
                    }
                }
                if (this._isRender) {
                    requestAnimationFrame(this.tick);
                }
            };
            this._timeKeeper = new spine_1.TimeKeeper();
            this._renderMap = new ds.StringMap();
        }
        static get ins() {
            if (this._ins == null) {
                this._ins = new FlyRender();
            }
            return this._ins;
        }
        start() {
            if (this._isRender == false) {
                this._isRender = true;
                this.tick();
            }
        }
        stop() {
            this._isRender = false;
        }
        addRender(spine) {
            if (this._renderMap.containsKey(spine.poolSign.uniqID)) {
                logW("重复添加");
                return;
            }
            this._renderMap.put(spine.poolSign.uniqID, this._renderArr.length);
            this._renderArr.push(spine);
        }
        remove(skel) {
            if (!this._renderMap.containsKey(skel.poolSign.uniqID)) {
                logW("没添加移除啥？");
                return;
            }
            var index = this._renderArr.indexOf(skel);
            if (index != -1) {
                this._renderArr.splice(index, 1);
            }
            this._renderMap.remove(skel.poolSign.uniqID);
        }
        getRenderCnt() {
            return this._renderArr.length;
        }
    }
    spine_1.FlyRender = FlyRender;
})(spine || (spine = {}));
//# sourceMappingURL=FlyRender.js.map
var spine;
(function (spine) {
    class TrackEntry {
        constructor() {
            this.timelineData = new Array();
            this.timelineDipMix = new Array();
            this.timelinesRotation = new Array();
        }
        reset() {
            this.next = null;
            this.mixingFrom = null;
            this.animation = null;
            this.listener = null;
            this.timelineData.length = 0;
            this.timelineDipMix.length = 0;
            this.timelinesRotation.length = 0;
        }
        setTimelineData(to, mixingToArray, propertyIDs) {
            if (to != null) {
                mixingToArray.push(to);
            }
            let lastEntry = this.mixingFrom != null ? this.mixingFrom.setTimelineData(this, mixingToArray, propertyIDs) : this;
            if (to != null) {
                mixingToArray.pop();
            }
            let mixingTo = mixingToArray;
            let mixingToLast = mixingToArray.length - 1;
            let timelines = this.animation.timelines;
            let timelinesCount = this.animation.timelines.length;
            let timelineData = spine.Utils.setArraySize(this.timelineData, timelinesCount);
            this.timelineDipMix.length = 0;
            let timelineDipMix = spine.Utils.setArraySize(this.timelineDipMix, timelinesCount);
            outer: for (var i = 0; i < timelinesCount; i++) {
                let id = timelines[i].getPropertyId();
                if (!propertyIDs.add(id)) {
                    timelineData[i] = spine.AnimationState.SUBSEQUENT;
                }
                else if (to == null || !to.hasTimeline(id)) {
                    timelineData[i] = spine.AnimationState.FIRST;
                }
                else {
                    for (var ii = mixingToLast; ii >= 0; ii--) {
                        let entry = mixingTo[ii];
                        if (!entry.hasTimeline(id)) {
                            if (entry.mixDuration > 0) {
                                timelineData[i] = spine.AnimationState.DIP_MIX;
                                timelineDipMix[i] = entry;
                                continue outer;
                            }
                        }
                    }
                    timelineData[i] = spine.AnimationState.DIP;
                }
            }
            return lastEntry;
        }
        hasTimeline(id) {
            let timelines = this.animation.timelines;
            for (var i = 0, n = timelines.length; i < n; i++) {
                if (timelines[i].getPropertyId() == id) {
                    return true;
                }
            }
            return false;
        }
        getAnimationTime() {
            if (this.loop) {
                let duration = this.animationEnd - this.animationStart;
                if (duration == 0) {
                    return this.animationStart;
                }
                return (this.trackTime % duration) + this.animationStart;
            }
            return Math.min(this.trackTime + this.animationStart, this.animationEnd);
        }
        setAnimationLast(animationLast) {
            this.animationLast = animationLast;
            this.nextAnimationLast = animationLast;
        }
        isComplete() {
            return this.trackTime >= this.animationEnd - this.animationStart;
        }
        resetRotationDirections() {
            this.timelinesRotation.length = 0;
        }
    }
    spine.TrackEntry = TrackEntry;
})(spine || (spine = {}));
//# sourceMappingURL=TrackEntry.js.map
var spine;
(function (spine) {
    let EventType;
    (function (EventType) {
        EventType[EventType["start"] = 0] = "start";
        EventType[EventType["interrupt"] = 1] = "interrupt";
        EventType[EventType["end"] = 2] = "end";
        EventType[EventType["dispose"] = 3] = "dispose";
        EventType[EventType["complete"] = 4] = "complete";
        EventType[EventType["event"] = 5] = "event";
    })(EventType = spine.EventType || (spine.EventType = {}));
})(spine || (spine = {}));
//# sourceMappingURL=EventType.js.map
var spine;
(function (spine) {
    class EventQueue {
        constructor(animState) {
            this.objects = [];
            this.drainDisabled = false;
            this.animState = animState;
        }
        start(entry) {
            this.objects.push(spine.EventType.start);
            this.objects.push(entry);
            this.animState.animationsChanged = true;
        }
        interrupt(entry) {
            this.objects.push(spine.EventType.interrupt);
            this.objects.push(entry);
        }
        end(entry) {
            this.objects.push(spine.EventType.end);
            this.objects.push(entry);
            this.animState.animationsChanged = true;
        }
        dispose(entry) {
            this.objects.push(spine.EventType.dispose);
            this.objects.push(entry);
        }
        complete(entry) {
            this.objects.push(spine.EventType.complete);
            this.objects.push(entry);
        }
        event(entry, event) {
            this.objects.push(spine.EventType.event);
            this.objects.push(entry);
            this.objects.push(event);
        }
        drain() {
            if (this.drainDisabled) {
                return;
            }
            this.drainDisabled = true;
            let objects = this.objects;
            let listeners = this.animState.listeners;
            for (let i = 0; i < objects.length; i += 2) {
                let type = objects[i];
                let entry = objects[i + 1];
                switch (type) {
                    case spine.EventType.start:
                        if (entry.listener != null && entry.listener.start) {
                            entry.listener.start(entry);
                        }
                        for (let ii = 0; ii < listeners.length; ii++) {
                            if (listeners[ii].start) {
                                listeners[ii].start(entry);
                            }
                        }
                        break;
                    case spine.EventType.interrupt:
                        if (entry.listener != null && entry.listener.interrupt) {
                            entry.listener.interrupt(entry);
                        }
                        for (let ii = 0; ii < listeners.length; ii++) {
                            if (listeners[ii].interrupt) {
                                listeners[ii].interrupt(entry);
                            }
                        }
                        break;
                    case spine.EventType.end:
                        if (entry.listener != null && entry.listener.end) {
                            entry.listener.end(entry);
                        }
                        for (let ii = 0; ii < listeners.length; ii++) {
                            if (listeners[ii].end) {
                                listeners[ii].end(entry);
                            }
                        }
                    case spine.EventType.dispose:
                        if (entry.listener != null && entry.listener.dispose) {
                            entry.listener.dispose(entry);
                        }
                        for (let ii = 0; ii < listeners.length; ii++) {
                            if (listeners[ii].dispose) {
                                listeners[ii].dispose(entry);
                            }
                        }
                        this.animState.trackEntryPool.free(entry);
                        break;
                    case spine.EventType.complete:
                        if (entry.listener != null && entry.listener.complete) {
                            entry.listener.complete(entry);
                        }
                        for (let ii = 0; ii < listeners.length; ii++) {
                            if (listeners[ii].complete) {
                                listeners[ii].complete(entry);
                            }
                        }
                        break;
                    case spine.EventType.event:
                        let event = objects[i++ + 2];
                        if (entry.listener != null && entry.listener.event) {
                            entry.listener.event(entry, event);
                        }
                        for (let ii = 0; ii < listeners.length; ii++) {
                            if (listeners[ii].event) {
                                listeners[ii].event(entry, event);
                            }
                        }
                        break;
                }
            }
            this.clear();
            this.drainDisabled = false;
        }
        clear() {
            this.objects.length = 0;
        }
    }
    spine.EventQueue = EventQueue;
})(spine || (spine = {}));
//# sourceMappingURL=EventQueue.js.map
var spine;
(function (spine) {
    class TempletMgr {
        constructor() {
            this._cacheDic = new ds.StringMap();
            this._templeteDic = new ds.StringMap();
            this._loadingDic = new ds.StringMap();
        }
        static get instance() {
            if (TempletMgr._instance == null) {
                TempletMgr._instance = new TempletMgr();
            }
            return TempletMgr._instance;
        }
        loadSekl(resName, callBack) {
            if (this._cacheDic.containsKey(resName)) {
                callBack.call([resName]);
            }
            else {
                if (this._loadingDic.containsKey(resName)) {
                    var callBackArr = this._loadingDic.get(resName);
                    if (callBackArr.indexOf(callBack) == -1) {
                        callBackArr.push(callBack);
                    }
                }
                else {
                    var spineTemplet = new spine.SpineTemplet(resName);
                    spineTemplet.on(Laya.Event.COMPLETE, this, this.parseComplete);
                    spineTemplet.on(Laya.Event.ERROR, this, this.onError);
                    if (resName.indexOf(".flysk") != -1) {
                        spineTemplet.loadFlySk(resName);
                    }
                    else if (resName.indexOf(".pvrsk") != -1) {
                        spineTemplet.loadPvr(resName);
                    }
                    else {
                        spineTemplet.loadSkel(resName);
                    }
                    this._loadingDic.put(resName, [callBack]);
                }
            }
        }
        parseComplete(mFactory) {
            this._templeteDic.put(mFactory.resName, mFactory);
            this._cacheDic.put(mFactory.resName, "");
            this.onLoadComplete(mFactory.resName);
        }
        onError(e) {
            console.log("error", e);
        }
        onLoadComplete(resName) {
            var callBackArr = this._loadingDic.get(resName);
            if (callBackArr) {
                for (let index = 0; index < callBackArr.length; index++) {
                    const element = callBackArr[index];
                    element.call([resName]);
                }
                callBackArr.length = 0;
                this._loadingDic.remove(resName);
            }
        }
        buildPLayer(resName) {
            var baseTemplete = this.getTemplete(resName);
            if (baseTemplete) {
                var _skelPlayer = baseTemplete.buildArmature();
                return _skelPlayer;
            }
            return null;
        }
        relasePLayer(item) {
            if (item == null) {
                logW("你要销毁啥？ item为空");
                return;
            }
            var fly = this.getTemplete(item.resName);
            if (fly) {
                fly.releasePlayer(item);
            }
            else {
                logI(item.resName, "templete未加载");
            }
        }
        createPlayer() {
        }
        getTemplete(resName) {
            return this._templeteDic.get(resName);
        }
        getAniDurationByAniName(resName, aniName) {
            var flyTemplete = this.getTemplete(resName);
            if (flyTemplete) {
                return flyTemplete.getAniDurationByAniName(aniName);
            }
            return 0;
        }
        disposeTemplet(url) {
            var temp = this.getTemplete(url);
            if (temp) {
                this._templeteDic.remove(url);
                this._cacheDic.remove(url);
                temp.destroy();
            }
        }
        checkFreeTempltet() {
            var freeArr = [];
            var keys = this._templeteDic.getKeys();
            for (let index = 0; index < keys.length; index++) {
                const resKay = keys[index];
                var te = this._templeteDic.get(resKay);
                if (te.isFree()) {
                    freeArr.push(resKay);
                }
            }
            return freeArr;
        }
        getTempleteCnt() {
            return this._cacheDic.size();
        }
    }
    spine.TempletMgr = TempletMgr;
})(spine || (spine = {}));
//# sourceMappingURL=TempletMgr.js.map
var spine;
(function (spine) {
    class SpineSkeletonRenderer {
        constructor(resName, twoColorTint = true) {
            this._resName = resName;
            this.vertexEffect = null;
            this.tempColor = new spine.Color();
            this.tempColor2 = new spine.Color();
            this.vertexSize = 2 + 2 + 4;
            this.twoColorTint = false;
            this.renderable = new spine.Renderable(null, 0, 0);
            this.clipper = new spine.SkeletonClipping(resName);
            this.temp = new spine.Vector2();
            this.temp2 = new spine.Vector2();
            this.temp3 = new spine.Color();
            this.temp4 = new spine.Color();
            this.twoColorTint = twoColorTint;
            if (twoColorTint) {
                this.vertexSize += 4;
            }
            this.vertices = spine.Utils.newFloatArray(this.vertexSize * 1024);
        }
        dispose() {
            if (this.vertices) {
                this.vertices = null;
            }
        }
        draw(skeleton, slotRangeStart = -1, slotRangeEnd = -1, spineSkeletonIns, textureList) {
            let clipper = this.clipper;
            let premultipliedAlpha = this.premultipliedAlpha;
            let twoColorTint = false;
            let tempPos = this.temp;
            let tempUv = this.temp2;
            let tempLight = this.temp3;
            let tempDark = this.temp4;
            let renderable = this.renderable;
            let uvs = null;
            let triangles = null;
            let drawOrder = skeleton.drawOrder;
            let attachmentColor = null;
            let skeletonColor = skeleton.color;
            let vertexSize = 8;
            let inRange = false;
            if (slotRangeStart == -1) {
                inRange = true;
            }
            for (let i = 0, n = drawOrder.length; i < n; i++) {
                let clippedVertexSize = clipper.isClipping() ? 2 : vertexSize;
                let slot = drawOrder[i];
                if (slotRangeStart >= 0 && slotRangeStart == slot.data.index) {
                    inRange = true;
                }
                if (!inRange) {
                    clipper.clipEndWithSlot(slot);
                    continue;
                }
                if (slotRangeEnd >= 0 && slotRangeEnd == slot.data.index) {
                    inRange = false;
                }
                let attachment = slot.getAttachment();
                let name = null;
                let texture;
                if (attachment instanceof spine.RegionAttachment) {
                    let region = attachment;
                    renderable.vertices = this.vertices;
                    renderable.numVertices = 4;
                    renderable.numFloats = clippedVertexSize << 2;
                    region.computeWorldVertices(slot.bone, renderable.vertices, 0, clippedVertexSize);
                    triangles = SpineSkeletonRenderer.QUAD_TRIANGLES;
                    uvs = region.uvs;
                    name = region.region.renderObject.page.name;
                    texture = textureList.get(name);
                    attachmentColor = region.color;
                }
                else if (attachment instanceof spine.MeshAttachment) {
                    let mesh = attachment;
                    renderable.vertices = this.vertices;
                    renderable.numVertices = (mesh.worldVerticesLength >> 1);
                    renderable.numFloats = renderable.numVertices * clippedVertexSize;
                    if (renderable.numFloats > renderable.vertices.length) {
                        renderable.vertices = this.vertices = spine.Utils.newFloatArray(renderable.numFloats);
                    }
                    mesh.computeWorldVertices(slot, 0, mesh.worldVerticesLength, renderable.vertices, 0, clippedVertexSize);
                    triangles = mesh.triangles;
                    name = mesh.region.renderObject.page.name;
                    texture = textureList.get(name);
                    uvs = mesh.uvs;
                    attachmentColor = mesh.color;
                }
                else if (attachment instanceof spine.ClippingAttachment) {
                    let clip = (attachment);
                    clipper.clipStart(slot, clip);
                    continue;
                }
                else {
                    clipper.clipEndWithSlot(slot);
                    continue;
                }
                if (texture != null) {
                    let slotColor = slot.color;
                    let finalColor = this.tempColor;
                    finalColor.r = skeletonColor.r * slotColor.r * attachmentColor.r;
                    finalColor.g = skeletonColor.g * slotColor.g * attachmentColor.g;
                    finalColor.b = skeletonColor.b * slotColor.b * attachmentColor.b;
                    finalColor.a = skeletonColor.a * slotColor.a * attachmentColor.a;
                    if (premultipliedAlpha) {
                        finalColor.r *= finalColor.a;
                        finalColor.g *= finalColor.a;
                        finalColor.b *= finalColor.a;
                    }
                    let slotBlendMode = slot.data.blendMode;
                    if (clipper.isClipping()) {
                        clipper.clipTriangles(renderable.vertices, renderable.numFloats, triangles, triangles.length, uvs, finalColor, null, twoColorTint);
                        let clippedVertices = new Float32Array(clipper.clippedVertices);
                        let clippedTriangles = clipper.clippedTriangles;
                        let mVertices = [];
                        let mUVs = [];
                        let colors = [];
                        if (this.vertexEffect != null) {
                            let vertexEffect = this.vertexEffect;
                            let verts = clippedVertices;
                            {
                                for (let v = 0, n = clippedVertices.length; v < n; v += vertexSize) {
                                    tempPos.x = verts[v];
                                    tempPos.y = verts[v + 1];
                                    tempLight.set(verts[v + 2], verts[v + 3], verts[v + 4], verts[v + 5]);
                                    tempUv.x = verts[v + 6];
                                    tempUv.y = verts[v + 7];
                                    tempDark.set(0, 0, 0, 0);
                                    vertexEffect.transform(tempPos, tempUv, tempLight, tempDark);
                                    verts[v] = tempPos.x;
                                    verts[v + 1] = tempPos.y;
                                    verts[v + 2] = tempLight.r;
                                    verts[v + 3] = tempLight.g;
                                    verts[v + 4] = tempLight.b;
                                    verts[v + 5] = tempLight.a;
                                    verts[v + 6] = tempUv.x;
                                    verts[v + 7] = tempUv.y;
                                    mVertices.push(verts[v], -verts[v + 1]);
                                    colors.push(verts[v + 2], verts[v + 3], verts[v + 4], verts[v + 5]);
                                    mUVs.push(verts[v + 6], verts[v + 7]);
                                }
                            }
                        }
                        else {
                            let vi = 0;
                            while (Number.isFinite(clippedVertices[vi + 6]) && Number.isFinite(clippedVertices[vi + 7])) {
                                mVertices.push(clippedVertices[vi]);
                                mVertices.push(-clippedVertices[vi + 1]);
                                colors.push(clippedVertices[vi + 2]);
                                colors.push(clippedVertices[vi + 3]);
                                colors.push(clippedVertices[vi + 4]);
                                colors.push(clippedVertices[vi + 5]);
                                mUVs.push(clippedVertices[vi + 6]);
                                mUVs.push(clippedVertices[vi + 7]);
                                vi += this.vertexSize;
                            }
                        }
                        let alpha = 1;
                        let color = null;
                        let colorNum = null;
                        let blendMode;
                        switch (slotBlendMode) {
                            case 1:
                                blendMode = "light";
                                break;
                            case 2:
                                blendMode = "multiply";
                                break;
                            case 3:
                                blendMode = "screen";
                                break;
                            default:
                                blendMode = "normal";
                        }
                        colorNum = ((colors[3] * 255) << 24) + colors[0] * 255 | 0 + ((colors[1] * 255) << 8) + ((colors[2] * 255) << 16);
                        this.drawTriangles(spineSkeletonIns.graphics, texture, 0, 0, mVertices, mUVs, new Uint16Array(clippedTriangles), Laya.Matrix.EMPTY, alpha, color, blendMode, colorNum);
                    }
                    else {
                        let verts = renderable.vertices;
                        let mVertices = [];
                        let mUVs = [];
                        let colors = [];
                        if (this.vertexEffect != null) {
                            let vertexEffect = this.vertexEffect;
                            {
                                for (let v = 0, u = 0, n = renderable.numFloats; v < n; v += vertexSize, u += 2) {
                                    tempPos.x = verts[v];
                                    tempPos.y = verts[v + 1];
                                    tempUv.x = uvs[u];
                                    tempUv.y = uvs[u + 1];
                                    tempLight.setFromColor(finalColor);
                                    tempDark.set(0, 0, 0, 0);
                                    vertexEffect.transform(tempPos, tempUv, tempLight, tempDark);
                                    verts[v] = tempPos.x;
                                    verts[v + 1] = tempPos.y;
                                    verts[v + 2] = tempLight.r;
                                    verts[v + 3] = tempLight.g;
                                    verts[v + 4] = tempLight.b;
                                    verts[v + 5] = tempLight.a;
                                    verts[v + 6] = tempUv.x;
                                    verts[v + 7] = tempUv.y;
                                    mVertices.push(verts[v], -verts[v + 1]);
                                    colors.push(verts[v + 2], verts[v + 3], verts[v + 4], verts[v + 5]);
                                    mUVs.push(verts[v + 6], verts[v + 7]);
                                }
                            }
                        }
                        else {
                            {
                                for (let v = 2, u = 0, n = renderable.numFloats; v < n; v += vertexSize, u += 2) {
                                    verts[v] = finalColor.r;
                                    verts[v + 1] = finalColor.g;
                                    verts[v + 2] = finalColor.b;
                                    verts[v + 3] = finalColor.a;
                                    verts[v + 4] = uvs[u];
                                    verts[v + 5] = uvs[u + 1];
                                    mVertices.push(verts[v - 2], -verts[v - 1]);
                                    colors.push(verts[v], verts[v + 1], verts[v + 2], verts[v + 3]);
                                    mUVs.push(verts[v + 4], verts[v + 5]);
                                }
                            }
                        }
                        let alpha = 1;
                        let color = null;
                        let colorNum = null;
                        let blendMode;
                        switch (slotBlendMode) {
                            case 1:
                                blendMode = "light";
                                break;
                            case 2:
                                blendMode = "multiply";
                                break;
                            case 3:
                                blendMode = "screen";
                                break;
                            default:
                                blendMode = "normal";
                        }
                        colorNum = ((colors[3] * 255) << 24) + colors[0] * 255 | 0 + ((colors[1] * 255) << 8) + ((colors[2] * 255) << 16);
                        this.drawTriangles(spineSkeletonIns.graphics, texture, 0, 0, mVertices, mUVs, new Uint16Array(triangles), Laya.Matrix.EMPTY, alpha, color, blendMode, colorNum);
                    }
                }
                clipper.clipEndWithSlot(slot);
            }
            clipper.clipEnd();
        }
        drawTriangles(target, texture, x, y, vertices, uvs, indices, matrix, alpha, color, blendMode, colorNum) {
            return target.drawTriangles(texture, x, y, vertices, uvs, indices, matrix, alpha, color, blendMode, colorNum);
        }
    }
    SpineSkeletonRenderer.QUAD_TRIANGLES = [0, 1, 2, 2, 3, 0];
    spine.SpineSkeletonRenderer = SpineSkeletonRenderer;
})(spine || (spine = {}));
//# sourceMappingURL=SpineSkeletonRenderer.js.map
var spine;
(function (spine) {
    class Renderable {
        constructor(vertices, numVertices, numFloats) {
            this.vertices = vertices;
            this.numVertices = numVertices;
            this.numFloats = numFloats;
        }
    }
    spine.Renderable = Renderable;
})(spine || (spine = {}));
//# sourceMappingURL=Renderable.js.map
var spine;
(function (spine) {
    class ConchSpineSkeletonRenderer {
        constructor(twoColorTint = true) {
            this._nativeObj = null;
            this._nativeObj = new window['_ConchSpineSkeletonRenderer'](twoColorTint);
        }
        get premultipliedAlpha() {
            return this._nativeObj.premultipliedAlpha;
        }
        set premultipliedAlpha(value) {
            this._nativeObj.premultipliedAlpha = value;
        }
        draw(skeleton, slotRangeStart = -1, slotRangeEnd = -1, spineSkeletonIns, textureList) {
            spineSkeletonIns.graphics.drawConchSpine(0, 0, skeleton, textureList);
            this._nativeObj.draw(skeleton, slotRangeStart, slotRangeEnd, textureList);
        }
    }
    spine.ConchSpineSkeletonRenderer = ConchSpineSkeletonRenderer;
})(spine || (spine = {}));
//# sourceMappingURL=ConchSpineSkeletonRenderer.js.map
//# sourceMappingURL=ISkelPlayer.js.map
//# sourceMappingURL=ISkelLayer.js.map

var spine;
(function (spine) {
    class FlypineSetting {
        constructor() {
        }
        static setSkelFrameRate(value) {
            FlypineSetting.skelFrameRate = value;
            FlypineSetting.frameTimeScend = FlypineSetting.onFrameTime * FlypineSetting.skelFrameRate;
            FlypineSetting.skelFrameTime = FlypineSetting.frameTimeScend * 1000;
        }
        static timeToFrame(time) {
            var frame = Math.floor((time * 1000) / FlypineSetting.skelFrameTime);
            return frame;
        }
    }
    FlypineSetting.GLOB_SPEED_SCALE = 1;
    FlypineSetting.IS_LAYA_ONE = false;
    FlypineSetting.isOpenBlend = true;
    FlypineSetting.isOpenClipping = true;
    FlypineSetting.isUseFlySK = false;
    FlypineSetting.onFrameTime = 0.016;
    FlypineSetting.skelFrameRate = 3;
    FlypineSetting.frameTimeScend = FlypineSetting.onFrameTime * FlypineSetting.skelFrameRate;
    FlypineSetting.skelFrameTime = FlypineSetting.frameTimeScend * 1000;
    FlypineSetting.noLoopOnClip = false;
    FlypineSetting.renderGap = 1;
    FlypineSetting.clipReturn = false;
    spine.FlypineSetting = FlypineSetting;
})(spine || (spine = {}));
//# sourceMappingURL=FlypineSetting.js.map
var spine;
(function (spine) {
    class FlypineEvent {
        constructor() {
        }
    }
    FlypineEvent.SKEL_COMPLETE = "skel_complete";
    FlypineEvent.START = "start";
    FlypineEvent.END = "end";
    FlypineEvent.COMPLETE = "complete";
    FlypineEvent.EVENT = "event";
    FlypineEvent.DISPOSE = "dispose";
    FlypineEvent.INTERRUPT = "interrupt";
    spine.FlypineEvent = FlypineEvent;
})(spine || (spine = {}));
//# sourceMappingURL=FlypineEvent.js.map

var spine;
(function (spine) {
    class CallBack {
        constructor(caller, func) {
            this.caller = caller;
            this.func = func;
        }
        call(args) {
            this.func.apply(this.caller, args);
        }
    }
    spine.CallBack = CallBack;
})(spine || (spine = {}));
//# sourceMappingURL=CallBack.js.map
var spine;
(function (spine) {
    var utils;
    (function (utils) {
        class ByteArray {
            constructor() {
                this.classDic = {};
                this._length = 0;
                this._objectEncoding_ = 0;
                this._position_ = 0;
                this._allocated_ = 8;
                this._littleEndian_ = false;
                this.___resizeBuffer(this._allocated_);
            }
            clear() {
                this._strTable = [];
                this._objTable = [];
                this._traitsTable = [];
                this._position_ = 0;
                this.length = 0;
            }
            ensureWrite(lengthToEnsure) {
                if (this._length < lengthToEnsure) {
                    this.length = lengthToEnsure;
                }
            }
            readBoolean() {
                return (this.readByte() != 0);
            }
            readBytes(bytes, offset = 0, length = 0) {
                if (offset < 0 || length < 0) {
                    throw new Error("Read error - Out of bounds" + this.length);
                }
                if (length == 0) {
                    length = this._length - this._position_;
                }
                bytes.ensureWrite(offset + length);
                bytes._byteView_.set(this._byteView_.subarray(this._position_, this._position_ + length), offset);
                bytes.pos = offset;
                this._position_ += length;
                if (bytes.pos + length > bytes.length) {
                    bytes.length = bytes.pos + length;
                }
            }
            readByte_tmp(offset = 0, length = 0) {
                if (offset < 0 || length < 0) {
                    throw new Error("Read error - Out of bounds" + this.length);
                }
                if (length == 0) {
                    length = this._length - this._position_;
                }
                var aaa = this._byteView_.subarray(this._position_, this._position_ + length);
                this._position_ += length;
                return aaa;
            }
            readByte_new(offset = 0, length = 0) {
                if (offset < 0 || length < 0) {
                    throw new Error("Read error - Out of bounds" + this.length);
                }
                if (length == 0) {
                    length = this._length - this._position_;
                }
                var ay = this._byteView_.buffer.slice(this._position_, this._position_ + length);
                this._position_ += length;
                return ay;
            }
            readDouble() {
                var double = this._data_.getFloat64(this._position_, this._littleEndian_);
                this._position_ += 8;
                return double;
            }
            readFloat() {
                var float = this._data_.getFloat32(this._position_, this._littleEndian_);
                this._position_ += 4;
                return float;
            }
            readFullBytes(bytes, pos, len) {
                this.ensureWrite(len);
                for (var i = pos; i < pos + len; i++) {
                    this._data_.setInt8(this._position_++, bytes.get(i));
                }
            }
            readInt() {
                var tInt = this._data_.getInt32(this._position_, this._littleEndian_);
                this._position_ += 4;
                return tInt;
            }
            readShort() {
                var short = this._data_.getInt16(this._position_, this._littleEndian_);
                this._position_ += 2;
                return short;
            }
            readUnsignedByte() {
                return this._data_.getUint8(this._position_++);
            }
            readByte() {
                return this._data_.getInt8(this._position_++);
            }
            readUnsignedInt() {
                var uInt = this._data_.getUint32(this._position_, this._littleEndian_);
                this._position_ += 4;
                return Number(uInt);
            }
            readUnsignedShort() {
                var uShort = this._data_.getUint16(this._position_, this._littleEndian_);
                this._position_ += 2;
                return uShort;
            }
            readUTF() {
                return this.readUTFBytes(this.readUnsignedShort());
            }
            readUnicode(length) {
                var value = "";
                var max = this._position_ + length;
                var c1, c2 = 0;
                while (this._position_ < max) {
                    c2 = this._byteView_[this._position_++];
                    c1 = this._byteView_[this._position_++];
                    value += String.fromCharCode(c1 << 8 | c2);
                }
                return value;
            }
            readMultiByte(length, charSet) {
                if (charSet == "UNICODE" || charSet == "unicode") {
                    return this.readUnicode(length);
                }
                return this.readUTFBytes(length);
            }
            readUTFBytes(len = -1) {
                var value = "";
                var max = this._position_ + len;
                var c, c2, c3 = 0;
                while (this._position_ < max) {
                    c = this._data_.getUint8(this._position_++);
                    if (c < 0x80) {
                        if (c != 0) {
                            value += String.fromCharCode(c);
                        }
                    }
                    else if (c < 0xE0) {
                        value += String.fromCharCode(((c & 0x3F) << 6) | (this._data_.getUint8(this._position_++) & 0x7F));
                    }
                    else if (c < 0xF0) {
                        c2 = this._data_.getUint8(this._position_++);
                        value += String.fromCharCode(((c & 0x1F) << 12) | ((c2 & 0x7F) << 6) | (this._data_.getUint8(this._position_++) & 0x7F));
                    }
                    else {
                        c2 = this._data_.getUint8(this._position_++);
                        c3 = this._data_.getUint8(this._position_++);
                        value += String.fromCharCode(((c & 0x0F) << 18) | ((c2 & 0x7F) << 12) | ((c3 << 6) & 0x7F) | (this._data_.getUint8(this._position_++) & 0x7F));
                    }
                }
                return value;
            }
            toString() {
                var cachePosition = this._position_;
                this._position_ = 0;
                var value = this.readUTFBytes(this.length);
                this._position_ = cachePosition;
                return value;
            }
            writeBoolean(value) {
                this.writeByte(value ? 1 : 0);
            }
            writeByte(value) {
                this.ensureWrite(this._position_ + 1);
                this._data_.setInt8(this._position_, value);
                this._position_ += 1;
            }
            writeBytes(bytes, offset = 0, length = 0) {
                if (offset < 0 || length < 0) {
                    throw "writeBytes error - Out of bounds";
                }
                if (length == 0) {
                    length = bytes.length - offset;
                }
                this.ensureWrite(this._position_ + length);
                this._byteView_.set(bytes._byteView_.subarray(offset, offset + length), this._position_);
                this._position_ += length;
            }
            writeArrayBuffer(arraybuffer, offset = 0, length = 0) {
                if (offset < 0 || length < 0) {
                    throw "writeArrayBuffer error - Out of bounds";
                }
                if (length == 0) {
                    length = arraybuffer.byteLength - offset;
                }
                this.ensureWrite(this._position_ + length);
                var uint8array = new Uint8Array(arraybuffer);
                this._byteView_.set(uint8array.subarray(offset, offset + length), this._position_);
                this._position_ += length;
            }
            writeDouble(x) {
                this.ensureWrite(this._position_ + 8);
                this._data_.setFloat64(this._position_, x, this._littleEndian_);
                this._position_ += 8;
            }
            writeFloat(x) {
                this.ensureWrite(this._position_ + 4);
                this._data_.setFloat32(this._position_, x, this._littleEndian_);
                this._position_ += 4;
            }
            writeInt(value) {
                this.ensureWrite(this._position_ + 4);
                this._data_.setInt32(this._position_, value, this._littleEndian_);
                this._position_ += 4;
            }
            writeShort(value) {
                this.ensureWrite(this._position_ + 2);
                this._data_.setInt16(this._position_, value, this._littleEndian_);
                this._position_ += 2;
            }
            writeUnsignedInt(value) {
                this.ensureWrite(this._position_ + 4);
                this._data_.setUint32(this._position_, value, this._littleEndian_);
                this._position_ += 4;
            }
            writeUnsignedShort(value) {
                this.ensureWrite(this._position_ + 2);
                this._data_.setUint16(this._position_, value, this._littleEndian_);
                this._position_ += 2;
            }
            writeUTF(value) {
                value = value + "";
                this.writeUnsignedShort(this._getUTFBytesCount(value));
                this.writeUTFBytes(value);
            }
            writeUnicode(value) {
                value = value + "";
                this.ensureWrite(this._position_ + value.length * 2);
                var c = 0;
                for (var i = 0, sz = value.length; i < sz; i++) {
                    c = value.charCodeAt(i);
                    this._byteView_[this._position_++] = c & 0xff;
                    this._byteView_[this._position_++] = c >> 8;
                }
            }
            writeMultiByte(value, charSet) {
                value = value + "";
                if (charSet == "UNICODE" || charSet == "unicode") {
                    return this.writeUnicode(value);
                }
                this.writeUTFBytes(value);
            }
            writeUTFBytes(value) {
                value = value + "";
                this.ensureWrite(this._position_ + value.length * 4);
                for (var i = 0, sz = value.length; i < sz; i++) {
                    var c = value.charCodeAt(i);
                    if (c <= 0x7F) {
                        this.writeByte(c);
                    }
                    else if (c <= 0x7FF) {
                        this.writeByte(0xC0 | (c >> 6));
                        this.writeByte(0x80 | (c & 63));
                    }
                    else if (c <= 0xFFFF) {
                        this.writeByte(0xE0 | (c >> 12));
                        this.writeByte(0x80 | ((c >> 6) & 63));
                        this.writeByte(0x80 | (c & 63));
                    }
                    else {
                        this.writeByte(0xF0 | (c >> 18));
                        this.writeByte(0x80 | ((c >> 12) & 63));
                        this.writeByte(0x80 | ((c >> 6) & 63));
                        this.writeByte(0x80 | (c & 63));
                    }
                }
                this.length = this._position_;
            }
            __fromBytes(inBytes) {
                this._byteView_ = new Uint8Array(inBytes.getData());
                this.length = this._byteView_.length;
                this._allocated_ = this.length;
            }
            __get(pos) {
                return this._data_.getUint8(pos);
            }
            _getUTFBytesCount(value) {
                var count = 0;
                value = value + "";
                for (var i = 0, sz = value.length; i < sz; i++) {
                    var c = value.charCodeAt(i);
                    if (c <= 0x7F) {
                        count += 1;
                    }
                    else if (c <= 0x7FF) {
                        count += 2;
                    }
                    else if (c <= 0xFFFF) {
                        count += 3;
                    }
                    else {
                        count += 4;
                    }
                }
                return count;
            }
            _byteAt_(index) {
                return this._byteView_[index];
            }
            _byteSet_(index, value) {
                this.ensureWrite(index + 1);
                this._byteView_[index] = value;
            }
            uncompress(algorithm = "zlib") {
                var inflate = new Zlib.Inflate(this._byteView_);
                this._byteView_ = inflate.decompress();
                this._data_ = new DataView(this._byteView_.buffer);
                ;
                this._allocated_ = this._length = this._byteView_.byteLength;
                this._position_ = 0;
            }
            compress(algorithm = "zlib") {
                var deflate = new Zlib.Deflate(this._byteView_);
                this._byteView_ = deflate.compress();
                this._data_ = new DataView(this._byteView_.buffer);
                ;
                this._position_ = this._allocated_ = this._length = this._byteView_.byteLength;
            }
            ___resizeBuffer(len) {
                try {
                    var newByteView = new Uint8Array(len);
                    if (this._byteView_ != null) {
                        if (this._byteView_.length <= len) {
                            newByteView.set(this._byteView_);
                        }
                        else {
                            newByteView.set(this._byteView_.subarray(0, len));
                        }
                    }
                    this._byteView_ = newByteView;
                    this._data_ = new DataView(newByteView.buffer);
                }
                catch (error) {
                    throw "___resizeBuffer err:" + len;
                }
            }
            __getBuffer() {
                return this._data_.buffer;
            }
            __set(pos, v) {
                this._data_.setUint8(pos, v);
            }
            static __ofBuffer(buffer) {
                var bytes = new ByteArray();
                bytes.length = bytes.allocated = buffer.byteLength;
                bytes.data = new DataView(buffer);
                bytes.byteView = new Uint8Array(buffer);
                return bytes;
            }
            setUint8Array(data) {
                this._byteView_ = data;
                this._data_ = new DataView(data.buffer);
                this._length = data.byteLength;
                this._position_ = 0;
            }
            getUint8Array() {
                return this._byteView_;
            }
            get bytesAvailable() {
                return this.length - this._position_;
            }
            get endian() {
                return this._littleEndian_ ? ByteArray.LITTLE_ENDIAN : ByteArray.BIG_ENDIAN;
            }
            set endian(endianStr) {
                this._littleEndian_ = (endianStr == ByteArray.LITTLE_ENDIAN);
            }
            set length(value) {
                this.___resizeBuffer(this._allocated_ = value);
                this._length = value;
            }
            get length() {
                return this._length;
            }
            get position() {
                return this.pos;
            }
            set position(value) {
                this.pos = value;
            }
            get pos() {
                return this._position_;
            }
            set pos(pos) {
                if (pos < this._length) {
                    this._position_ = pos < 0 ? 0 : pos;
                }
                else {
                    this._position_ = pos;
                    this.length = pos;
                }
            }
            readObject() {
                this._strTable = [];
                this._objTable = [];
                this._traitsTable = [];
                return this.readObject2();
            }
            readObject2() {
                var type = this.readByte();
                return this.readObjectValue(type);
            }
            readObjectValue(type) {
                var value;
                switch (type) {
                    case ByteArray.NULL_TYPE:
                        break;
                    case ByteArray.STRING_TYPE:
                        value = this.__readString();
                        break;
                    case ByteArray.INTEGER_TYPE:
                        value = this.readInterger();
                        break;
                    case ByteArray.FALSE_TYPE:
                        value = false;
                        break;
                    case ByteArray.TRUE_TYPE:
                        value = true;
                        break;
                    case ByteArray.OBJECT_TYPE:
                        value = this.readScriptObject();
                        break;
                    case ByteArray.ARRAY_TYPE:
                        value = this.readArray();
                        break;
                    case ByteArray.DOUBLE_TYPE:
                        value = this.readDouble();
                        break;
                    case ByteArray.BYTEARRAY_TYPE:
                        value = this.readByteArray();
                        break;
                    default:
                }
                return value;
            }
            readByteArray() {
                var ref = this.readUInt29();
                if ((ref & 1) == 0) {
                    return this.getObjRef(ref >> 1);
                }
                else {
                    var len = (ref >> 1);
                    var ba = new ByteArray();
                    this._objTable.push(ba);
                    this.readBytes(ba, 0, len);
                    return ba;
                }
            }
            readInterger() {
                var i = this.readUInt29();
                i = (i << 3) >> 3;
                return parseInt(i + "");
            }
            getStrRef(ref) {
                return this._strTable[ref];
            }
            getObjRef(ref) {
                return this._objTable[ref];
            }
            __readString() {
                var ref = this.readUInt29();
                if ((ref & 1) == 0) {
                    return this.getStrRef(ref >> 1);
                }
                var len = (ref >> 1);
                if (len == 0) {
                    return ByteArray.EMPTY_STRING;
                }
                var str = this.readUTFBytes(len);
                this._strTable.push(str);
                return str;
            }
            readTraits(ref) {
                var ti;
                if ((ref & 3) == 1) {
                    ti = this.getTraitReference(ref >> 2);
                    return ti.propoties ? ti : { obj: {} };
                }
                else {
                    var externalizable = ((ref & 4) == 4);
                    var isDynamic = ((ref & 8) == 8);
                    var count = (ref >> 4);
                    var className = this.__readString();
                    ti = {};
                    ti.className = className;
                    ti.propoties = [];
                    ti.dynamic = isDynamic;
                    ti.externalizable = externalizable;
                    if (count > 0) {
                        for (var i = 0; i < count; i++) {
                            var propName = this.__readString();
                            ti.propoties.push(propName);
                        }
                    }
                    this._traitsTable.push(ti);
                    return ti;
                }
            }
            readScriptObject() {
                var ref = this.readUInt29();
                if ((ref & 1) == 0) {
                    return this.getObjRef(ref >> 1);
                }
                else {
                    var objref = this.readTraits(ref);
                    var className = objref.className;
                    var externalizable = objref.externalizable;
                    var obj;
                    var propName;
                    var pros = objref.propoties;
                    if (className && className != "") {
                        var rst;
                        if (rst) {
                            obj = new rst();
                        }
                        else {
                            obj = {};
                        }
                    }
                    else {
                        obj = {};
                    }
                    this._objTable.push(obj);
                    if (pros) {
                        for (var d = 0; d < pros.length; d++) {
                            obj[pros[d]] = this.readObject2();
                        }
                    }
                    if (objref.dynamic) {
                        for (;;) {
                            propName = this.__readString();
                            if (propName == null || propName.length == 0) {
                                break;
                            }
                            obj[propName] = this.readObject2();
                        }
                    }
                    return obj;
                }
            }
            readArray() {
                var ref = this.readUInt29();
                if ((ref & 1) == 0) {
                    return this.getObjRef(ref >> 1);
                }
                var obj = null;
                var count = (ref >> 1);
                var propName;
                for (;;) {
                    propName = this.__readString();
                    if (propName == null || propName.length == 0) {
                        break;
                    }
                    if (obj == null) {
                        obj = {};
                        this._objTable.push(obj);
                    }
                    obj[propName] = this.readObject2();
                }
                if (obj == null) {
                    obj = [];
                    this._objTable.push(obj);
                    var i = 0;
                    for (i = 0; i < count; i++) {
                        obj.push(this.readObject2());
                    }
                }
                else {
                    for (i = 0; i < count; i++) {
                        obj[i.toString()] = this.readObject2();
                    }
                }
                return obj;
            }
            readUInt29() {
                var value = 0;
                var b = this.readByte() & 0xFF;
                if (b < 128) {
                    return b;
                }
                value = (b & 0x7F) << 7;
                b = this.readByte() & 0xFF;
                if (b < 128) {
                    return (value | b);
                }
                value = (value | (b & 0x7F)) << 7;
                b = this.readByte() & 0xFF;
                if (b < 128) {
                    return (value | b);
                }
                value = (value | (b & 0x7F)) << 8;
                b = this.readByte() & 0xFF;
                return (value | b);
            }
            writeObject(o) {
                this._strTable = [];
                this._objTable = [];
                this._traitsTable = [];
                this.writeObject2(o);
            }
            writeObject2(o) {
                if (o == null) {
                    this.writeAMFNull();
                    return;
                }
                var type = typeof (o);
                if (type === "string") {
                    this.writeAMFString(o);
                }
                else if (type === "boolean") {
                    this.writeAMFBoolean(o);
                }
                else if (type === "number") {
                    if (String(o).indexOf(".") != -1) {
                        this.writeAMFDouble(o);
                    }
                    else {
                        this.writeAMFInt(o);
                    }
                }
                else if (type === "object") {
                    if (o instanceof Array) {
                        this.writeArray(o);
                    }
                    else if (o instanceof ByteArray) {
                        this.writeAMFByteArray(o);
                    }
                    else {
                        this.writeCustomObject(o);
                    }
                }
            }
            writeAMFNull() {
                this.writeByte(ByteArray.NULL_TYPE);
            }
            writeAMFString(s) {
                this.writeByte(ByteArray.STRING_TYPE);
                this.writeStringWithoutType(s);
            }
            writeStringWithoutType(s) {
                if (s.length == 0) {
                    this.writeUInt29(1);
                    return;
                }
                var ref = this._strTable.indexOf(s);
                if (ref >= 0) {
                    this.writeUInt29(ref << 1);
                }
                else {
                    var utflen = this._getUTFBytesCount(s);
                    this.writeUInt29((utflen << 1) | 1);
                    this.writeUTFBytes(s);
                    this._strTable.push(s);
                }
            }
            writeAMFInt(i) {
                if (i >= ByteArray.INT28_MIN_VALUE && i <= ByteArray.INT28_MAX_VALUE) {
                    i = i & ByteArray.UINT29_MASK;
                    this.writeByte(ByteArray.INTEGER_TYPE);
                    this.writeUInt29(i);
                }
                else {
                    this.writeAMFDouble(i);
                }
            }
            writeAMFDouble(d) {
                this.writeByte(ByteArray.DOUBLE_TYPE);
                this.writeDouble(d);
            }
            writeAMFBoolean(b) {
                if (b) {
                    this.writeByte(ByteArray.TRUE_TYPE);
                }
                else {
                    this.writeByte(ByteArray.FALSE_TYPE);
                }
            }
            writeCustomObject(o) {
                this.writeByte(ByteArray.OBJECT_TYPE);
                var refNum = this._objTable.indexOf(o);
                if (refNum != -1) {
                    this.writeUInt29(refNum << 1);
                }
                else {
                    this._objTable.push(o);
                    var traitsInfo = {};
                    traitsInfo.className = this.getAliasByObj(o);
                    traitsInfo.dynamic = false;
                    traitsInfo.externalizable = false;
                    traitsInfo.properties = [];
                    for (var prop in o) {
                        if (o[prop] instanceof Function) {
                            continue;
                        }
                        traitsInfo.properties.push(prop);
                        traitsInfo.properties.sort();
                    }
                    var tRef = ByteArray.getTraitsInfoRef(this._traitsTable, traitsInfo);
                    var count = traitsInfo.properties.length;
                    var i = 0;
                    if (tRef >= 0) {
                        this.writeUInt29((tRef << 2) | 1);
                    }
                    else {
                        this._traitsTable.push(traitsInfo);
                        this.writeUInt29(3 | (traitsInfo.externalizable ? 4 : 0) | (traitsInfo.dynamic ? 8 : 0) | (count << 4));
                        this.writeStringWithoutType(traitsInfo.className);
                        for (i = 0; i < count; i++) {
                            this.writeStringWithoutType(traitsInfo.properties[i]);
                        }
                    }
                    for (i = 0; i < count; i++) {
                        this.writeObject2(o[traitsInfo.properties[i]]);
                    }
                }
            }
            static getTraitsInfoRef(arr, ti) {
                var i, len = arr.length;
                for (i = 0; i < len; i++) {
                    if (ByteArray.equalsTraitsInfo(ti, arr[i])) {
                        return i;
                    }
                }
                return -1;
            }
            static equalsTraitsInfo(ti1, ti2) {
                if (ti1 == ti2) {
                    return true;
                }
                if (!ti1.className === ti2.className) {
                    return false;
                }
                if (ti1.properties.length != ti2.properties.length) {
                    return false;
                }
                var len = ti1.properties.length;
                var prop;
                ti1.properties.sort();
                ti2.properties.sort();
                for (var i = 0; i < len; i++) {
                    if (ti1.properties[i] != ti2.properties[i]) {
                        return false;
                    }
                }
                return true;
            }
            getAliasByObj(obj) {
                return "";
            }
            writeArray(value) {
                this.writeByte(ByteArray.ARRAY_TYPE);
                var len = value.length;
                var ref = this._objTable.indexOf(value);
                if (ref > -1) {
                    this.writeUInt29(len << 1);
                }
                else {
                    this.writeUInt29((len << 1) | 1);
                    this.writeStringWithoutType(ByteArray.EMPTY_STRING);
                    for (var i = 0; i < len; i++) {
                        this.writeObject2(value[i]);
                    }
                    this._objTable.push(value);
                }
            }
            writeAMFByteArray(ba) {
                this.writeByte(ByteArray.BYTEARRAY_TYPE);
                var ref = this._objTable.indexOf(ba);
                if (ref >= 0) {
                    this.writeUInt29(ref << 1);
                }
                else {
                    var len = ba.length;
                    this.writeUInt29((len << 1) | 1);
                    this.writeBytes(ba, 0, len);
                }
            }
            writeMapAsECMAArray(o) {
                this.writeByte(ByteArray.ARRAY_TYPE);
                this.writeUInt29((0 << 1) | 1);
                var count, key;
                for (key in o) {
                    count++;
                    this.writeStringWithoutType(key);
                    this.writeObject2(o[key]);
                }
                this.writeStringWithoutType(ByteArray.EMPTY_STRING);
            }
            writeUInt29(ref) {
                if (ref < 0x80) {
                    this.writeByte(ref);
                }
                else if (ref < 0x4000) {
                    this.writeByte(((ref >> 7) & 0x7F) | 0x80);
                    this.writeByte(ref & 0x7F);
                }
                else if (ref < 0x200000) {
                    this.writeByte(((ref >> 14) & 0x7F) | 0x80);
                    this.writeByte(((ref >> 7) & 0x7F) | 0x80);
                    this.writeByte(ref & 0x7F);
                }
                else if (ref < 0x40000000) {
                    this.writeByte(((ref >> 22) & 0x7F) | 0x80);
                    this.writeByte(((ref >> 15) & 0x7F) | 0x80);
                    this.writeByte(((ref >> 8) & 0x7F) | 0x80);
                    this.writeByte(ref & 0xFF);
                }
                else {
                }
            }
            getTraitReference(ref) {
                return this._traitsTable[ref];
            }
        }
        ByteArray.BIG_ENDIAN = "bigEndian";
        ByteArray.LITTLE_ENDIAN = "littleEndian";
        ByteArray.UNDEFINED_TYPE = 0;
        ByteArray.NULL_TYPE = 1;
        ByteArray.FALSE_TYPE = 2;
        ByteArray.TRUE_TYPE = 3;
        ByteArray.INTEGER_TYPE = 4;
        ByteArray.DOUBLE_TYPE = 5;
        ByteArray.STRING_TYPE = 6;
        ByteArray.XML_TYPE = 7;
        ByteArray.DATE_TYPE = 8;
        ByteArray.ARRAY_TYPE = 9;
        ByteArray.OBJECT_TYPE = 10;
        ByteArray.AVMPLUSXML_TYPE = 11;
        ByteArray.BYTEARRAY_TYPE = 12;
        ByteArray.EMPTY_STRING = "";
        ByteArray.UINT29_MASK = 0x1FFFFFFF;
        ByteArray.INT28_MAX_VALUE = 0x0FFFFFFF;
        ByteArray.INT28_MIN_VALUE = -268435456;
        utils.ByteArray = ByteArray;
    })(utils = spine.utils || (spine.utils = {}));
})(spine || (spine = {}));
//# sourceMappingURL=ByteArray.js.map
var spine;
(function (spine) {
    class SkelLayaLayer extends Laya.Sprite {
        constructor() {
            super();
        }
        addSkel(node) {
            super.addChild(node);
        }
        addSkelAt(value, index) {
            super.addChildAt(value, index);
        }
        removeSkel(node) {
            return super.removeChild(node);
        }
    }
    spine.SkelLayaLayer = SkelLayaLayer;
})(spine || (spine = {}));
//# sourceMappingURL=SkelLayaLayer.js.map
//# sourceMappingURL=SpineLayer.js.map
//# sourceMappingURL=SpineRender.js.map
var spine;
(function (spine) {
    class BaseTemplete extends Laya.Resource {
        constructor(resName, layaPremultipliedAlpha = true, spinePremultipliedAlpha = false) {
            super();
            this._textureMap = new ds.StringMap();
            this._poolInfo = new common.PoolInfo(resName, spine.SpineSkeleton, 100);
            this._pool = common.PoolMgr.createPool(this._poolInfo);
            this._isDestroyed = false;
            this._layaPremultipliedAlpha = layaPremultipliedAlpha;
            this._spinePremultipliedAlpha = spinePremultipliedAlpha;
        }
        get textureMap() {
            return this._textureMap;
        }
        buildArmature() {
            var pl = this._pool.create();
            pl.init(this);
            return pl;
        }
        releasePlayer(item) {
            this._pool.releaseItem(item);
        }
        getAniNameByIndex(index) {
            var tAni = this.skeletonData.animations[index];
            if (tAni) {
                return tAni.name;
            }
            return null;
        }
        getAniDurationByAniName(aniName) {
            var ani = this.skeletonData.findAnimation(aniName);
            if (ani) {
                return ani.duration;
            }
            return 0;
        }
        getAniNameArr() {
            return this.skeletonData.animationsArr;
        }
        getSkinIndexByName(skinName) {
            var skins = this.skeletonData.skins;
            var tSkinData;
            for (var i = 0, n = skins.length; i < n; i++) {
                tSkinData = skins[i];
                if (tSkinData.name == skinName) {
                    return i;
                }
            }
            return -1;
        }
        isHaveClip() {
            return this.skeletonData.isHaveClip;
        }
        destroy() {
            this._isDestroyed = true;
            var keyArr = this._textureMap.getKeys();
            for (let index = 0; index < keyArr.length; index++) {
                const element = keyArr[index];
                var tTexture = this._textureMap.get(element);
                tTexture.destroy();
            }
            this._textureMap.clear();
            this.skeletonData.dispose();
            this.skeletonData = null;
            common.PoolMgr.dispose(this._poolInfo);
            this._pool = null;
            super.destroy();
        }
        isFree() {
            return this._pool.isAllFee();
        }
    }
    spine.BaseTemplete = BaseTemplete;
})(spine || (spine = {}));
//# sourceMappingURL=BaseTemplete.js.map
var spine;
(function (spine) {
    class SpineGLTexture extends Laya.Texture {
        constructor(tex) {
            super(tex);
        }
        getImage() {
            return {
                width: this.sourceWidth,
                height: this.sourceHeight
            };
        }
        setFilters(minFilter, magFilter) {
        }
        setWraps(uWrap, vWrap) {
        }
    }
    spine.SpineGLTexture = SpineGLTexture;
})(spine || (spine = {}));
//# sourceMappingURL=SpineGLTexture.js.map
var spine;
(function (spine) {
    class SpineSkeleton extends Laya.Sprite {
        constructor() {
            super();
            this.pause = true;
            this._currAniName = null;
            this._currentClipIndex = 0;
            this._playbackRate = 1.0;
            this.renderGap = 0;
            this._gapNum = 0;
            this.poolSign = new common.PoolSign();
            this._defaultGraphics = this.graphics;
        }
        get isFree() {
            return this.poolSign.isFree;
        }
        setTimeScale(value) {
            this.playbackRate(value);
        }
        init(templet) {
            if (this._templet == null) {
                this.resName = templet.resName;
                this._templet = templet;
                this.skeleton = new spine.Skeleton(this._templet.skeletonData);
                this.stateData = new spine.AnimationStateData(this.skeleton.data);
                this.state = new spine.AnimationState(this.stateData);
                this.skeletonRenderer = new spine.SpineSkeletonRenderer(this.resName, false);
                this.skeletonRenderer.premultipliedAlpha = this._templet._spinePremultipliedAlpha;
            }
        }
        playByIndex(aniIndex, loop, force, cache) {
            var animationName = this.getAniNameByIndex(aniIndex);
            if (animationName && animationName != "") {
                this.play(animationName, loop, force, cache);
            }
        }
        play(aniName, loop, force, cache) {
            this._userCahce = cache;
            var animationName = aniName;
            this._loop = loop;
            if (this.pause || force || this._currAniName != animationName) {
                this._currAniName = animationName;
                var trackEntry = this.state.setAnimation(0, animationName, loop);
                if (trackEntry == null) {
                    logW(this.resName + " 没有这个动画->" + aniName);
                    animationName = this.getAniNameByIndex(0);
                    this._currAniName = animationName;
                    trackEntry = this.state.setAnimation(0, animationName, loop);
                    if (trackEntry == null) {
                        return;
                    }
                }
                if (this.templet.isHaveClip() && spine.FlypineSetting.noLoopOnClip) {
                    loop = false;
                }
                this._currAnimation = this.stateData.skeletonData.findAnimation(animationName);
                var animationDuration = this.state.getCurrent(0).animation.duration;
                this._maxFrame = spine.FlypineSetting.timeToFrame(animationDuration);
                this.renderGap = fly.ZMath.randomInt(0, spine.FlypineSetting.skelFrameRate - 1) * spine.FlypineSetting.onFrameTime;
                this._currentClipIndex = 0;
                if (this.pause) {
                    this.startPlay();
                }
                if (this._maxFrame > 31) {
                    this._userCahce = cache = false;
                }
                if (cache) {
                }
                else {
                }
            }
        }
        startPlay() {
            this.pause = false;
            spine.FlyRender.ins.addRender(this);
        }
        stopPlay() {
            this.pause = true;
            spine.FlyRender.ins.remove(this);
        }
        renderUpdate(gap) {
            this._update(gap);
        }
        stopTo(frame) {
            this.pause = true;
            frame <= 0 ? 1 : frame;
            frame >= this._maxFrame ? 1 : frame;
            this._currentClipIndex = frame;
            this.renderFrame();
        }
        _update(gap) {
            this.renderGap += gap;
            if (this.renderGap < spine.FlypineSetting.skelFrameTime) {
                return;
            }
            this._gapNum++;
            if (this._gapNum % 2 != 0 && this.templet.isHaveClip()) {
                return;
            }
            this._gapNum = 0;
            this.updateFrame(this.renderGap);
            this._currentClipIndex += this._playbackRate;
            this.renderGap = 0;
            if (!this.isNeedRender()) {
                return;
            }
            spine.SpineStat.rendNum++;
            this.renderFrame();
        }
        renderFrame() {
            this.state.setPlayTime(this._currentClipIndex * spine.FlypineSetting.frameTimeScend);
            this.state.apply(this.skeleton);
            this.skeleton.updateWorldTransform();
            this._defaultGraphics.clear();
            this.graphics = this._defaultGraphics;
            this.skeletonRenderer.draw(this.skeleton, -1, -1, this, this._templet.textureMap);
        }
        updateFrame(gap) {
            for (var index = 1; index <= this._playbackRate; index++) {
                var event = this._currAnimation.getFreamEvent(this._currentClipIndex + index);
                if (event) {
                    var eventData = {
                        floatValue: event.floatValue,
                        intValue: event.intValue,
                        name: event.data.name,
                        stringValue: event.stringValue,
                        time: event.time
                    };
                    this.event(Laya.Event.LABEL, eventData);
                }
            }
            if (this._currentClipIndex > this._maxFrame) {
                if (!this._loop) {
                    this.stop();
                    this.event(Laya.Event.STOPPED);
                }
                else {
                    this.event(Laya.Event.COMPLETE);
                }
                this._currentClipIndex = 0;
            }
        }
        isNeedRender() {
            if (this._currAniName == null || this._currAniName == "") {
                return false;
            }
            if (!this.state || !this.skeleton) {
                return false;
            }
            if (this.pause) {
                return false;
            }
            if (!Laya.stage.contains(this)) {
                return false;
            }
            var targetParcent = this.parent;
            if (targetParcent == null) {
                return false;
            }
            while (targetParcent != null) {
                if (targetParcent.visible == false) {
                    return false;
                }
                if (targetParcent.alpha == 0) {
                    return false;
                }
                targetParcent = targetParcent.parent;
            }
            return true;
        }
        getAnimNum() {
            return this._templet.skeletonData.animations.length;
        }
        getAniNameByIndex(index) {
            return this._templet.getAniNameByIndex(index);
        }
        getSlotByName(slotName) {
            return this.skeleton.findSlot(slotName);
        }
        playbackRate(value) {
            this._playbackRate = value;
        }
        showSkinByName(name) {
            this.showSkinByIndex(this._templet.getSkinIndexByName(name));
        }
        showSkinByIndex(skinIndex) {
            let newSkine = this.skeleton.data.skins[skinIndex];
            this.skeleton.setSkin(newSkine);
            this.skeleton.setSlotsToSetupPose();
        }
        stop() {
            if (!this.pause) {
                this._currAniName = null;
                this.stopPlay();
            }
        }
        paused() {
            if (!this.pause) {
                this.stopPlay();
                this.event(Laya.Event.PAUSED);
            }
        }
        resume() {
            if (this.pause) {
                this.startPlay();
            }
        }
        dispose() {
            this.release();
            spine.FlyRender.ins.remove(this);
            this.skeleton.dispose();
            this.stateData.dispose();
            this.state.dispose();
            this.skeletonRenderer.dispose();
            this._templet = null;
            this._defaultGraphics.clear();
            this._defaultGraphics.destroy();
        }
        get templet() {
            return this._templet;
        }
        get playState() {
            if (!this._currAniName) {
                return SpineSkeleton.stopped;
            }
            if (this.pause) {
                return SpineSkeleton.paused;
            }
            return SpineSkeleton.playing;
        }
        getAniNameArr() {
            return this._templet.getAniNameArr();
        }
        isHaveClip() {
            if (this._templet) {
                return this._templet.isHaveClip();
            }
            return false;
        }
        release() {
            this.stop();
            this._playbackRate = 1;
            this.x = 0;
            this.y = 0;
            this.alpha = 1;
            this.scaleX = 1;
            this.scaleY = 1;
            this.renderGap = 0;
            this._currentClipIndex = 0;
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
        reset() {
        }
        destroy() {
        }
    }
    SpineSkeleton.stopped = 0;
    SpineSkeleton.paused = 1;
    SpineSkeleton.playing = 2;
    spine.SpineSkeleton = SpineSkeleton;
    Laya.ClassUtils.regClass("laya.layaspine.SpineSkeleton", SpineSkeleton);
    Laya.ClassUtils.regClass("Laya.SpineSkeleton", SpineSkeleton);
})(spine || (spine = {}));
//# sourceMappingURL=SpineSkeleton.js.map
var spine;
(function (spine) {
    class SpineTemplet extends spine.BaseTemplete {
        constructor(resName, layaPremultipliedAlpha = true, spinePremultipliedAlpha = false) {
            super(resName, layaPremultipliedAlpha, spinePremultipliedAlpha);
            this._isPngComplete = false;
            this.onImgLoad = () => {
                var atext = new Laya.Texture2D(this._browserImg.width, this._browserImg.height, 1, false, false);
                atext.wrapModeU = Laya.WarpMode.Clamp;
                atext.wrapModeV = Laya.WarpMode.Clamp;
                atext.loadImageSource(this._browserImg, true);
                this.textureLoader(atext);
                this.parseSpineAni();
            };
        }
        loadFlySk(resName) {
            var pngPath = resName.replace(".flysk", ".png");
            this._textName = pngPath.substring(pngPath.lastIndexOf("/") + 1);
            this.resName = resName;
            Laya.loader.load([{ type: Laya.Loader.BUFFER, url: resName }], Laya.Handler.create(this, (re) => {
                if (re) {
                    var arr = Laya.loader.getRes(resName);
                    var aaa = new Uint8Array(arr);
                    var byte = new spine.utils.ByteArray();
                    byte.setUint8Array(aaa);
                    var compressData = byte.readByte_tmp(0, byte.readInt());
                    var pngLen = byte.readInt();
                    var pngByte = byte.readByte_new(0, pngLen);
                    var compressByte = new spine.utils.ByteArray();
                    compressByte.setUint8Array(compressData);
                    compressByte.uncompress();
                    this._atlasText = compressByte.readUTFBytes(compressByte.readInt());
                    this._byteData = compressByte.readByte_tmp(0, compressByte.readInt());
                    this.loadImg(pngByte);
                }
                else {
                    logE(`Couldn't load text ${resName}`);
                }
            }));
        }
        loadPvr(resName) {
            logE("loadPvr");
            var pngPath = resName.replace(".pvrsk", ".png");
            this._textName = pngPath.substring(pngPath.lastIndexOf("/") + 1);
            this.resName = resName;
            Laya.loader.load([{ type: Laya.Loader.BUFFER, url: resName }], Laya.Handler.create(this, (re) => {
                if (re) {
                    var arr = Laya.loader.getRes(resName);
                    var aaa = new Uint8Array(arr);
                    var byte = new spine.utils.ByteArray();
                    byte.setUint8Array(aaa);
                    byte.uncompress();
                    this._atlasText = byte.readUTFBytes(byte.readInt());
                    this._byteData = byte.readByte_tmp(0, byte.readInt());
                    var _pvrData = byte.readByte_new(0, byte.readInt());
                    var texture = new Laya.Texture2D(0, 0, Laya.TextureFormat.PVRTCRGBA_4BPPV, false, false);
                    texture.wrapModeU = Laya.WarpMode.Clamp;
                    texture.wrapModeV = Laya.WarpMode.Clamp;
                    logE("开始解析pvr------------");
                    texture.setCompressData(_pvrData);
                    logE("pvr 解析完成++++++++++++++++++++++");
                    this.textureLoader(texture);
                    this.parseSpineAni();
                }
                else {
                    logE(`Couldn't load text ${resName}`);
                }
            }));
        }
        loadImg(pngByte) {
            var blobType = { type: "application/octet-binary" };
            var blobFragment = [];
            var blob;
            try {
                blobFragment[0] = pngByte;
                blob = new Blob(blobFragment, blobType);
            }
            catch (e) {
                var win = window;
                win.BlobBuilder = win.BlobBuilder || win.WebKitBlobBuilder || win.MozBlobBuilder || win.MSBlobBuilder;
                if (e.name == 'TypeError' && win.BlobBuilder) {
                    var bb = new win.BlobBuilder();
                    bb.append(pngByte);
                    blob = bb.getBlob("image/png");
                }
            }
            var _imgUrl = URL.createObjectURL(blob);
            this._browserImg = new Laya.Browser.window.Image();
            this._browserImg.onload = this.onImgLoad;
            this._browserImg.src = _imgUrl;
        }
        loadSkel(skelUrl) {
            this.resName = skelUrl;
            let atlasUrl = skelUrl.replace(".skel", ".atlas");
            var pngPath = skelUrl.replace(".skel", ".png");
            this._textName = pngPath.substring(pngPath.lastIndexOf("/") + 1);
            this.loadBinary(skelUrl);
            this.loadText(atlasUrl);
            this.loadTexture(pngPath);
        }
        loadBinary(path) {
            Laya.loader.load([{ type: Laya.Loader.BUFFER, url: path }], Laya.Handler.create(this, (re) => {
                if (re) {
                    var arr = Laya.loader.getRes(path);
                    var u8 = new Uint8Array(arr);
                    this._byteData = u8;
                    this.checkComplete();
                }
                else {
                    logE(`Couldn't load text ${path}`);
                }
            }));
        }
        loadText(path) {
            Laya.loader.load([{ type: Laya.Loader.TEXT, url: path }], Laya.Handler.create(this, (re) => {
                if (re) {
                    this._atlasText = Laya.loader.getRes(path);
                    this.checkComplete();
                }
                else {
                    logE(`Couldn't load text ${path}`);
                }
            }));
        }
        loadTexture(path) {
            Laya.loader.load([{ type: Laya.Loader.IMAGE, url: path }], Laya.Handler.create(this, (re) => {
                if (re) {
                    this._isPngComplete = true;
                    this.textureLoader(Laya.loader.getRes(path).bitmap);
                    this.checkComplete();
                }
                else {
                    logE(`Couldn't load text ${path}`);
                }
            }));
        }
        textureLoader(tex) {
            var tTexture = new spine.SpineGLTexture(tex);
            this.textureMap.put(this._textName, tTexture);
            return tTexture;
        }
        checkComplete() {
            if (this._atlasText && this._byteData && this._isPngComplete) {
                this.parseSpineAni();
            }
        }
        parseSpineAni() {
            if (this._isDestroyed) {
                this.destroy();
                return;
            }
            var atlas = new spine.TextureAtlas(this._atlasText, (path) => {
                return this.textureMap.get(path);
            });
            var atlasLoader = new spine.AtlasAttachmentLoader(atlas);
            this._skeletonBinary = new spine.SkeletonBinary(atlasLoader);
            this.skeletonData = this._skeletonBinary.readSkeletonData(this._byteData);
            this.skeletonData.isHaveClip = this._skeletonBinary.isHaveClip;
            this.event(Laya.Event.COMPLETE, this);
        }
        destroy() {
            super.destroy();
            this._skeletonBinary = null;
            this._byteData = null;
            this._atlasText = null;
            var skelUrl = this.resName;
            let atlasUrl = skelUrl.replace(".skel", ".atlas");
            var pngPath = skelUrl.replace(".skel", ".png");
            Laya.loader.clearRes(skelUrl);
            Laya.loader.clearRes(atlasUrl);
            Laya.loader.clearRes(pngPath);
        }
    }
    spine.SpineTemplet = SpineTemplet;
})(spine || (spine = {}));
//# sourceMappingURL=SpineTemplet.js.map
//# sourceMappingURL=AnimationStateListener2.js.map
var spine;
(function (spine) {
    class AnimationStateAdapter2 {
        start(entry) {
        }
        interrupt(entry) {
        }
        end(entry) {
        }
        dispose(entry) {
        }
        complete(entry) {
        }
        event(entry, event) {
        }
    }
    spine.AnimationStateAdapter2 = AnimationStateAdapter2;
})(spine || (spine = {}));
//# sourceMappingURL=AnimationStateAdapter2.js.map
//# sourceMappingURL=Constraint.js.map

var Public;
(function (Public) {
    class UIAdaptive {
        constructor() {
            this.fitX = false;
            this.fitY = false;
            this.fitPerfect = false;
        }
    }
    Public.UIAdaptive = UIAdaptive;
})(Public || (Public = {}));

var Public;
(function (Public) {
    var RegUtils;
    (function (RegUtils) {
        function checkEmail(strEmail) {
            var emailReg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
            if (emailReg.test(strEmail)) {
                return true;
            }
            else {
                return false;
            }
        }
        RegUtils.checkEmail = checkEmail;
        ;
        function isIP(strIP) {
            if (isNull(strIP)) {
                return false;
            }
            var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g;
            if (re.test(strIP)) {
                if (Number(RegExp.$1) < 256 && Number(RegExp.$2) < 256 && Number(RegExp.$3) < 256 && Number(RegExp.$4) < 256) {
                    return true;
                }
            }
            return false;
        }
        RegUtils.isIP = isIP;
        ;
        function checkMobile(strMobile) {
            var regu = /^((\+86)|(86))?[1][3,4,5,7,8]\d{9}$/;
            if (regu.test(strMobile)) {
                return true;
            }
            else {
                return false;
            }
        }
        RegUtils.checkMobile = checkMobile;
        ;
        function checkPhone(strPhone) {
            var phoneRegWithArea = /^[0][1-9]{2,3}-[0-9]{5,10}$/;
            var phoneRegNoArea = /^[1-9]{1}[0-9]{5,8}$/;
            var prompt = "您输入的电话号码不正确!";
            if (strPhone.length > 9) {
                if (phoneRegWithArea.test(strPhone)) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                if (phoneRegNoArea.test(strPhone)) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        RegUtils.checkPhone = checkPhone;
        ;
        function isNull(str) {
            if (str == "") {
                return true;
            }
            var regu = "^[ ]+$";
            var re = new RegExp(regu);
            return re.test(str);
        }
        RegUtils.isNull = isNull;
        ;
        function isInteger(str) {
            var regu = /^[-]{0,1}[0-9]{1,}$/;
            return regu.test(str);
        }
        RegUtils.isInteger = isInteger;
        ;
        function isNumber(s) {
            var regu = "^[0-9]+$";
            var re = new RegExp(regu);
            if (s.search(re) != -1) {
                return true;
            }
            else {
                return false;
            }
        }
        RegUtils.isNumber = isNumber;
        ;
        function isMoney(s) {
            var regu = "^[0-9]+[\.][0-9]{0,3}$";
            var re = new RegExp(regu);
            if (re.test(s)) {
                return true;
            }
            else {
                return false;
            }
        }
        RegUtils.isMoney = isMoney;
        ;
        function cTrim(sInputString, iType) {
            var sTmpStr = ' ';
            var i = -1;
            if (iType == 0 || iType == 1) {
                while (sTmpStr == ' ') {
                    ++i;
                    sTmpStr = sInputString.substr(i, 1);
                }
                sInputString = sInputString.substring(i);
            }
            if (iType == 0 || iType == 2) {
                sTmpStr = ' ';
                i = sInputString.length;
                while (sTmpStr == ' ') {
                    --i;
                    sTmpStr = sInputString.substr(i, 1);
                }
                sInputString = sInputString.substring(0, i + 1);
            }
            return sInputString;
        }
        RegUtils.cTrim = cTrim;
        ;
        function checkStrLen(str) {
            let tips = null;
            if (str.length < 6) {
                return false;
            }
            if (str.length > 20) {
                return false;
            }
            return true;
        }
        RegUtils.checkStrLen = checkStrLen;
        ;
        function isGuestAccount(str) {
            var regu = "^BFG_[0-9]+$";
            var re = new RegExp(regu);
            if (re.test(str)) {
                return true;
            }
            else {
                return false;
            }
        }
        RegUtils.isGuestAccount = isGuestAccount;
        function isAccount(str) {
            var regu = "/^[a-zA-Z]+[\d\w]*$/";
            var re = new RegExp(regu);
            if (re.test(str)) {
                return true;
            }
            else {
                return false;
            }
        }
        RegUtils.isAccount = isAccount;
        ;
    })(RegUtils = Public.RegUtils || (Public.RegUtils = {}));
})(Public || (Public = {}));

var Public;
(function (Public) {
    var NativeApi;
    (function (NativeApi) {
        function isSupportLocalData() {
            return Laya.LocalStorage.support;
        }
        NativeApi.isSupportLocalData = isSupportLocalData;
        function setLocalData(key, value) {
            Laya.LocalStorage.setItem(key, value);
        }
        NativeApi.setLocalData = setLocalData;
        function getLocalData(key) {
            return Laya.LocalStorage.getItem(key);
        }
        NativeApi.getLocalData = getLocalData;
        function deleteLocalData(key) {
            Laya.LocalStorage.removeItem(key);
        }
        NativeApi.deleteLocalData = deleteLocalData;
        function clearLocalData() {
            Laya.LocalStorage.clear();
        }
        NativeApi.clearLocalData = clearLocalData;
        function getMic() {
        }
        NativeApi.getMic = getMic;
        function getScreen() {
        }
        NativeApi.getScreen = getScreen;
        function callPhone(telNum) {
            window.open("tel:" + telNum, '_self');
        }
        NativeApi.callPhone = callPhone;
        function sendMessage(telNum) {
            window.open("sms:" + telNum, '_self');
        }
        NativeApi.sendMessage = sendMessage;
        function getCurUrl() {
            return window.location.href;
        }
        NativeApi.getCurUrl = getCurUrl;
        function getUserAgent() {
            let u = window.navigator.userAgent;
            return {
                LayaAirIDE: u.indexOf('LayaAirIDE') > -1,
                trident: u.indexOf('Trident') > -1,
                presto: u.indexOf('Presto') > -1,
                webKit: u.indexOf('AppleWebKit') > -1,
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/) && u.indexOf('QIHU') && u.indexOf('Chrome') < 0,
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
                iPad: u.indexOf('iPad') > -1,
                webApp: u.indexOf('Safari') == -1,
                ua: u
            };
        }
        NativeApi.getUserAgent = getUserAgent;
        ;
        NativeApi.curAngle = window["orientation"];
    })(NativeApi = Public.NativeApi || (Public.NativeApi = {}));
})(Public || (Public = {}));

var Global;
(function (Global) {
    function Cycle() {
        if (Global.waitPanel != null) {
            Global.waitPanel.removeSelf();
            Global.waitPanel = null;
        }
    }
    Global.Cycle = Cycle;
    function showWaitPanel(DelayShow = true, showMsg = "") {
        if (Global.waitPanel == null) {
            Global.waitPanel = new WaitPanel(1);
            Laya.stage.addChild(Global.waitPanel);
        }
        Global.waitPanel.activeStatue(true, DelayShow, showMsg);
    }
    Global.showWaitPanel = showWaitPanel;
    function hideWaitPanel() {
        if (Global.waitPanel != null) {
            Global.waitPanel.activeStatue(false);
        }
    }
    Global.hideWaitPanel = hideWaitPanel;
    function getNumber(num) {
        let StrAry = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
        return StrAry[num];
    }
    Global.getNumber = getNumber;
    function getUnique(obj) {
        return obj.parent.name + obj.zOrder + obj.name + obj.x + obj.y;
    }
    Global.getUnique = getUnique;
    function ToFitZero(number, num) {
        let s = number.toString();
        let s_length = num - s.length;
        if (s.length < num) {
            let plusZero = "";
            for (let i = 0; i < s_length; i++) {
                plusZero = "0" + plusZero;
            }
            s = plusZero + s;
        }
        return s;
    }
    Global.ToFitZero = ToFitZero;
    function getRandomNum(min, max) {
        return min + Math.floor(Math.random() * (max - min));
    }
    Global.getRandomNum = getRandomNum;
    function splitByStr(orgString, splitStr, isNumberValue = true) {
        let filterArray = ["\\", "\"", "[", "]"];
        filterArray.forEach(element => {
            orgString.replace(element, "");
        });
        if (orgString == null || orgString.length == 0) {
            return [];
        }
        let re = orgString.split(splitStr);
        if (isNumberValue) {
            let result = [];
            re.forEach(elment => {
                if (elment.length > 0) {
                    result.push(parseInt(elment));
                }
            });
            return result;
        }
        return re;
    }
    Global.splitByStr = splitByStr;
    function splitWithTwo(oldString, sp1, sp2, isNumberValue = true) {
        let tmpAry = [];
        let strAry = oldString.split(sp1);
        strAry.forEach(st => {
            if (st.length > 0) {
                let tmpAry2 = st.split(sp2);
                if (isNumberValue) {
                    let tmpNumAry = [];
                    tmpAry2.forEach(elment => {
                        tmpNumAry.push(parseInt(elment));
                    });
                    tmpAry.push(tmpNumAry);
                }
                else {
                    tmpAry.push(tmpAry2);
                }
            }
        });
        return tmpAry;
    }
    Global.splitWithTwo = splitWithTwo;
    function returnFloat(value) {
        let resultValue = Math.round(parseFloat(value) * 100) / 100;
        let tempAry = value.toString().split(".");
        if (tempAry.length == 1) {
            value = value.toString() + ".00";
            return resultValue;
        }
        if (tempAry.length > 1) {
            if (tempAry[1].length < 2) {
                value = value.toString() + "0";
            }
            return resultValue;
        }
    }
    Global.returnFloat = returnFloat;
    function log(message, ...optionalParams) {
        if (GlobalData.isRelease) {
            return;
        }
        logI(message, optionalParams);
    }
    Global.log = log;
    function getUUID() {
        return 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    Global.getUUID = getUUID;
    function lerpAngle(curRota, targetRota, durTime) {
        let detal = targetRota - curRota;
        if (detal > Math.PI) {
            detal = detal - 2 * Math.PI;
        }
        if (detal < -Math.PI) {
            detal = detal + 2 * Math.PI;
        }
        return curRota + detal * durTime;
    }
    Global.lerpAngle = lerpAngle;
    function lerpDistance(curNum, targetNum, durTime) {
        let detal = targetNum - curNum;
        return curNum + detal * durTime;
    }
    Global.lerpDistance = lerpDistance;
    function get3DWinSize(theCamera, distance) {
        let halfFOV = (theCamera.fieldOfView * 0.5) * Math.PI / 180;
        let aspect = theCamera.aspectRatio;
        let height = distance * Math.tan(halfFOV);
        let width = height * aspect;
        return new Laya.Vector2(width * 2, height * 2);
    }
    Global.get3DWinSize = get3DWinSize;
    function get3DDistance(theCamera, width) {
        let halfFOV = (theCamera.fieldOfView * 0.5) * Math.PI / 180;
        let aspect = theCamera.aspectRatio;
        let distance = width * 0.01 / 2 / aspect / Math.tan(halfFOV);
        return distance;
    }
    Global.get3DDistance = get3DDistance;
    function WatchRotation(targetPos, watchPos) {
        let shootAngle = Math.asin((targetPos.y - watchPos.y) / targetPos.distance(watchPos.x, watchPos.y)) * 180 / Math.PI;
        if (targetPos.y > watchPos.y) {
            if (targetPos.x > watchPos.x) {
                return 360 - shootAngle;
            }
            else {
                return 180 + shootAngle;
            }
        }
        else {
            if (targetPos.x > watchPos.x) {
                return -shootAngle;
            }
            else {
                return 180 + shootAngle;
            }
        }
    }
    Global.WatchRotation = WatchRotation;
    function getFullTimeString(time) {
        let date = new Date(time);
        let yyyy = date.getFullYear();
        let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        let dd = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        let hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
        let mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
        return yyyy + "-" + MM + "-" + dd + " " + hh + ":" + mm;
    }
    Global.getFullTimeString = getFullTimeString;
    function getHSTimeString(time) {
        let date = new Date(time);
        let yyyy = date.getFullYear();
        let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        let dd = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        let hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
        let mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
        return hh + ":" + mm;
    }
    Global.getHSTimeString = getHSTimeString;
    function getZeroTimeNumber(time) {
        let date = new Date(time);
        let today = new Date();
        today.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
        today.setHours(0, 0, 0, 0);
        return today.getTime();
    }
    Global.getZeroTimeNumber = getZeroTimeNumber;
    function getPassDaysTime(time) {
        let nowTime = Public.TimeMgr.Inst.currTimer;
        let badTime = (nowTime - time) / 1000;
        let day = Math.floor(badTime / 86400);
        badTime = badTime - (day * 86400);
        let hour = Math.floor(badTime / 3600);
        badTime = badTime - (hour * 3600);
        let minute = Math.floor(badTime / 60);
        let second = Math.floor(badTime - (minute * 60));
        if (hour > 0 || minute > 0 || second > 0) {
            day = day + 1;
        }
        return day;
    }
    Global.getPassDaysTime = getPassDaysTime;
    function PointPlus(v1, v2) {
        return new Laya.Point(v1.x + v2.x, v1.y + v2.y);
    }
    Global.PointPlus = PointPlus;
    function PointScale(v1, scale) {
        return new Laya.Point(v1.x * scale, v1.y * scale);
    }
    Global.PointScale = PointScale;
    function PointCut(v1, v2) {
        return new Laya.Point(v1.x - v2.x, v1.y - v2.y);
    }
    Global.PointCut = PointCut;
    function randomWord(length) {
        let str = "", arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',];
        for (let i = 0; i < length; i++) {
            let pos = Global.getRandomNum(0, arr.length);
            str += arr[pos];
        }
        return str;
    }
    Global.randomWord = randomWord;
    function stringToByte(str) {
        var bytes = new Array();
        var len, c;
        len = str.length;
        for (var i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if (c >= 0x010000 && c <= 0x10FFFF) {
                bytes.push(((c >> 18) & 0x07) | 0xF0);
                bytes.push(((c >> 12) & 0x3F) | 0x80);
                bytes.push(((c >> 6) & 0x3F) | 0x80);
                bytes.push((c & 0x3F) | 0x80);
            }
            else if (c >= 0x000800 && c <= 0x00FFFF) {
                bytes.push(((c >> 12) & 0x0F) | 0xE0);
                bytes.push(((c >> 6) & 0x3F) | 0x80);
                bytes.push((c & 0x3F) | 0x80);
            }
            else if (c >= 0x000080 && c <= 0x0007FF) {
                bytes.push(((c >> 6) & 0x1F) | 0xC0);
                bytes.push((c & 0x3F) | 0x80);
            }
            else {
                bytes.push(c & 0xFF);
            }
        }
        return bytes;
    }
    Global.stringToByte = stringToByte;
    function byteToString(arr) {
        if (typeof arr === 'string') {
            return arr;
        }
        var str = '', _arr = arr;
        for (var i = 0; i < _arr.length; i++) {
            var one = _arr[i].toString(2), v = one.match(/^1+?(?=0)/);
            if (v && one.length == 8) {
                var bytesLength = v[0].length;
                var store = _arr[i].toString(2).slice(7 - bytesLength);
                for (var st = 1; st < bytesLength; st++) {
                    store += _arr[st + i].toString(2).slice(2);
                }
                str += String.fromCharCode(parseInt(store, 2));
                i += bytesLength - 1;
            }
            else {
                str += String.fromCharCode(_arr[i]);
            }
        }
        return str;
    }
    Global.byteToString = byteToString;
    function FormatString(str, ...args) {
        if (args.length == 0) {
            return str;
        }
        for (var i = 0; i < args.length; i++) {
            var re = new RegExp('\\{' + (i) + '\\}', 'gm');
            str = str.replace(re, args[i]);
        }
        return str;
    }
    Global.FormatString = FormatString;
    function GetStrByteLen(str) {
        let realLength = 0, len = str.length, charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) {
                realLength += 1;
            }
            else {
                realLength += 2;
            }
        }
        return realLength;
    }
    Global.GetStrByteLen = GetStrByteLen;
    ;
    function SubStrWithByteLen(str, start, end) {
        let startIndex = -1;
        let endIndex = str.length;
        let realLength = 0;
        for (let i = 0; i < str.length; i++) {
            let charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) {
                realLength += 1;
            }
            else {
                realLength += 2;
            }
            if (start <= realLength && startIndex == -1) {
                startIndex = i;
            }
            if (end < realLength) {
                endIndex = i;
                break;
            }
        }
        if (startIndex == -1) {
            return str;
        }
        return str.substring(startIndex, endIndex);
    }
    Global.SubStrWithByteLen = SubStrWithByteLen;
    Global.getLangStr = function (lanKey, ...args) {
        return "";
    };
})(Global || (Global = {}));

var Global;
(function (Global) {
    var EnCodeKey = 0;
    var fEnCodeKey = 0;
    var EnCodeKeyLenth = 0;
    function InitEnKey(intEnKey, fEnCodeKey) {
        EnCodeKey = intEnKey;
        fEnCodeKey = fEnCodeKey;
        EnCodeKeyLenth = EnCodeKey.toString().length - 2;
    }
    Global.InitEnKey = InitEnKey;
    function EnKeyValue() {
        return EnCodeKey;
    }
    Global.EnKeyValue = EnKeyValue;
    function EnKeyLength() {
        return EnCodeKeyLenth;
    }
    Global.EnKeyLength = EnKeyLength;
    function EnFloatValue(value) {
        let v = Math.floor(value * 1000);
        let num = v ^ fEnCodeKey;
        return num;
    }
    Global.EnFloatValue = EnFloatValue;
    function DesFloatValue(value) {
        let tempKey = value ^ fEnCodeKey;
        if (tempKey == fEnCodeKey) {
            return 0;
        }
        else {
            return tempKey / 1000;
        }
    }
    Global.DesFloatValue = DesFloatValue;
    function EnValue(value) {
        return value ^ EnCodeKey;
    }
    Global.EnValue = EnValue;
    function DesValue(value) {
        let tempKey = value ^ EnCodeKey;
        if (tempKey == EnCodeKey) {
            return 0;
        }
        else {
            return tempKey;
        }
    }
    Global.DesValue = DesValue;
    function CheckValue(mmValue, needValue) {
        return mmValue ^ needValue;
    }
    Global.CheckValue = CheckValue;
})(Global || (Global = {}));

var Public;
(function (Public) {
    var EffectUtils;
    (function (EffectUtils) {
        var rotationArr = [];
        function rotationEffect(obj, time = 1000) {
            if (this.rotationArr == null) {
                this.rotationArr = [];
            }
            var uniqueKey = Global.getUnique(obj);
            if (this.rotationArr[uniqueKey]) {
                return;
            }
            if ((this.rotationArr[uniqueKey] == null) || !this.rotationArr[uniqueKey]) {
                this.rotationArr[uniqueKey] = true;
            }
            var onComplete1 = () => {
                if (this.rotationArr[uniqueKey] && (obj != null)) {
                    obj.rotation = 0;
                    Laya.Tween.to(obj, { rotation: 360 }, time, Laya.Ease.linearIn, Laya.Handler.create(null, onComplete1));
                }
            };
            obj.rotation = 0;
            Laya.Tween.to(obj, { rotation: 360 }, time, Laya.Ease.linearIn, Laya.Handler.create(null, onComplete1));
        }
        EffectUtils.rotationEffect = rotationEffect;
        function removeRotationEffect(obj) {
            if (this.rotationArr == null) {
                this.rotationArr = [];
            }
            var uniqueKey = Global.getUnique(obj);
            this.rotationArr[uniqueKey] = false;
            Laya.Tween.clearAll(obj);
        }
        EffectUtils.removeRotationEffect = removeRotationEffect;
        function blinkEffect(obj, interval = 1000) {
            var blink = new BitmapBlink(obj, interval);
        }
        EffectUtils.blinkEffect = blinkEffect;
        function shakeObj(obj) {
            var shakeNum = 80;
            var oldX = obj.x;
            Laya.Tween.to(obj, { x: obj.x - 10 }, shakeNum);
            Laya.timer.once(shakeNum * 2, null, function () {
                Laya.Tween.to(obj, { x: obj.x + 20 }, shakeNum);
            });
            Laya.timer.once(shakeNum * 3, null, function () {
                Laya.Tween.to(obj, { x: obj.x - 20 }, shakeNum);
            });
            Laya.timer.once(shakeNum * 4, null, function () {
                Laya.Tween.to(obj, { x: obj.x + 20 }, shakeNum);
            });
            Laya.timer.once(shakeNum * 5, null, function () {
                Laya.Tween.to(obj, { x: oldX }, shakeNum);
            });
        }
        EffectUtils.shakeObj = shakeObj;
        function shakeScreen(panel, effectType = 1) {
            var shakeNum = 40;
            var oldX = panel.x;
            var oldY = panel.y;
            if (effectType == 1) {
                Laya.Tween.to(panel, { x: panel.x - 10 }, shakeNum);
                Laya.timer.once(shakeNum * 2, null, function () {
                    Laya.Tween.to(panel, { x: panel.x + 20 }, shakeNum);
                });
                Laya.timer.once(shakeNum * 3, null, function () {
                    Laya.Tween.to(panel, { x: panel.x - 20 }, shakeNum);
                });
                Laya.timer.once(shakeNum * 4, null, function () {
                    Laya.Tween.to(panel, { x: panel.x + 20 }, shakeNum);
                });
                Laya.timer.once(shakeNum * 5, null, function () {
                    Laya.Tween.to(panel, { x: oldX }, shakeNum);
                });
            }
            else {
                Laya.Tween.to(panel, { x: panel.x - 10, y: panel.y }, shakeNum);
                Laya.timer.once(shakeNum * 2, null, function () {
                    Laya.Tween.to(panel, { x: panel.x + 20, y: panel.y }, shakeNum);
                });
                Laya.timer.once(shakeNum * 3, null, function () {
                    Laya.Tween.to(panel, { x: panel.x, y: panel.y + 15 }, shakeNum);
                });
                Laya.timer.once(shakeNum * 4, null, function () {
                    Laya.Tween.to(panel, { x: panel.x, y: panel.y - 20 }, shakeNum);
                });
                Laya.timer.once(shakeNum * 5, null, function () {
                    Laya.Tween.to(panel, { x: panel.x, y: panel.y + 10 }, shakeNum);
                });
                Laya.timer.once(shakeNum * 6, null, function () {
                    Laya.Tween.to(panel, { x: oldX, y: oldY }, shakeNum);
                });
            }
        }
        EffectUtils.shakeScreen = shakeScreen;
        var isPlayEffectPlay = false;
        function playEffect(obj, cartoonType = 1) {
            if (this.isPlayEffectPlay) {
                return;
            }
            this.isPlayEffectPlay = true;
            var onComplete2 = function () {
                this.isPlayEffectPlay = false;
            };
            var onComplete1 = function () {
                if (cartoonType == 1) {
                    Laya.Tween.to(obj, { scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 500, Laya.Ease.elasticOut, Laya.Handler.create(null, onComplete2));
                }
                else if (cartoonType == 2) {
                    Laya.Tween.to(obj, { scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 500, Laya.Ease.backOut, Laya.Handler.create(null, onComplete2));
                }
                else if (cartoonType == 3) {
                    Laya.Tween.to(obj, { scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 100, Laya.Ease.linearIn, Laya.Handler.create(null, onComplete2));
                }
            };
            Laya.Tween.to(obj, { scaleX: 0.5, scaleY: 0.5, x: obj.x + obj.width / 4, y: obj.y + obj.height / 4 }, 100, Laya.Ease.sineIn, Laya.Handler.create(null, onComplete1));
        }
        EffectUtils.playEffect = playEffect;
        function playScaleEffect(obj) {
            var onComplete1 = function () {
                if (obj != null) {
                    var onComplete2 = function () {
                        obj.scaleX = 1;
                        obj.scaleY = 1;
                        Laya.Tween.to(obj, { alpha: 1 }, 1000, Laya.Ease.linearIn, Laya.Handler.create(null, onComplete1));
                    };
                    obj.alpha = 1;
                    Laya.Tween.to(obj, { scaleX: 1.5, scaleY: 1.5, alpha: 0 }, 1000, Laya.Ease.linearIn, Laya.Handler.create(null, onComplete2));
                }
            };
            onComplete1();
        }
        EffectUtils.playScaleEffect = playScaleEffect;
        function flyObj(obj, time, space = 50) {
            var onComplete1 = function () {
                if (obj != null) {
                    var onComplete2 = function () {
                        Laya.Tween.to(obj, { y: obj.y - space }, time, Laya.Ease.linearIn, Laya.Handler.create(null, onComplete1));
                    };
                    Laya.Tween.to(obj, { y: obj.y + space }, time, Laya.Ease.linearIn, Laya.Handler.create(null, onComplete2));
                }
            };
            onComplete1();
        }
        EffectUtils.flyObj = flyObj;
        function rockObj(obj, time, space = 20) {
            var onComplete1 = function () {
                if (obj != null) {
                    var onComplete2 = function () {
                        Laya.Tween.to(obj, { rotation: -space }, time, Laya.Ease.linearIn, Laya.Handler.create(null, onComplete1));
                    };
                    Laya.Tween.to(obj, { rotation: space }, time, Laya.Ease.linearIn, Laya.Handler.create(null, onComplete2));
                }
            };
            onComplete1();
        }
        EffectUtils.rockObj = rockObj;
        function typerEffect(obj, content = "", interval = 200) {
            var strArr = content.split("");
            var len = strArr.length;
            for (var i = 0; i < len; i++) {
                Laya.timer.once(interval * i, i, function () {
                    obj.appendText(strArr[Number(this)]);
                });
            }
        }
        EffectUtils.typerEffect = typerEffect;
        function yoyoTween(target, props, duration, delay = 0, yoyoCount = 0, ease = null, complete = null, coverBefore = true) {
            let isForever = yoyoCount <= 0;
            let yoyoProps = [];
            for (var p in props) {
                if ((typeof (target[p]) == 'number')) {
                    var start = target[p];
                    var end = props[p];
                    yoyoProps.push([p, start, end]);
                }
            }
            let tween = Laya.Pool.getItemByClass("tween", Laya.Tween);
            let singleCompleteHandle = Laya.Handler.create(tween, (reversal) => {
                if (target.hasOwnProperty("displayedInStage") && !target.displayedInStage) {
                    logE("请留意yoyoTween未及时释放，可能是tween目标被隐藏而并未消毁!");
                    tween.clear();
                    Laya.Pool.recover("tween", tween);
                    return;
                }
                if (!isForever) {
                    yoyoCount--;
                    if (yoyoCount <= 0) {
                        Laya.Pool.recover("tween", tween);
                        if (complete) {
                            complete.run();
                        }
                        return;
                    }
                }
                for (var params of yoyoProps) {
                    props[params[0]] = reversal ? params[1] : params[2];
                }
                singleCompleteHandle.args = [!reversal];
                tween.to(target, props, duration, ease, singleCompleteHandle, 0, coverBefore);
            }, [true], false);
            return tween.to(target, props, duration, ease, singleCompleteHandle, delay, coverBefore);
        }
        EffectUtils.yoyoTween = yoyoTween;
        function clearYoyoTween(target) {
            Laya.Tween.clearTween(target);
        }
        EffectUtils.clearYoyoTween = clearYoyoTween;
        function shakeAndStop(target, duration = 600, stopDuration = 400) {
            let dur = duration / 6;
            Laya.Tween.to(target, { rotation: 5 }, dur);
            Laya.Tween.to(target, { rotation: -15 }, dur, null, null, dur);
            Laya.Tween.to(target, { rotation: 10 }, dur, null, null, dur * 2);
            Laya.Tween.to(target, { rotation: -5 }, dur, null, null, dur * 3);
            Laya.Tween.to(target, { rotation: 3 }, dur, null, null, dur * 4);
            Laya.Tween.to(target, { rotation: 0 }, dur, null, null, dur * 5);
            Laya.Tween.to(target, {}, stopDuration, null, Laya.Handler.create(target, () => {
                EffectUtils.shakeAndStop(target, duration);
            }), duration);
        }
        EffectUtils.shakeAndStop = shakeAndStop;
        function clearShakeAndStop(target) {
            Laya.Tween.clearTween(target);
        }
        EffectUtils.clearShakeAndStop = clearShakeAndStop;
    })(EffectUtils = Public.EffectUtils || (Public.EffectUtils = {}));
})(Public || (Public = {}));

var common;
(function (common) {
    class DisplayUtils {
        static removeFromParent(display) {
            if (display && display.parent) {
                display.parent.removeChild(display);
            }
        }
    }
    common.DisplayUtils = DisplayUtils;
})(common || (common = {}));

var Global;
(function (Global) {
    let ImageColor;
    (function (ImageColor) {
        ImageColor[ImageColor["Red"] = 0] = "Red";
        ImageColor[ImageColor["Gray"] = 1] = "Gray";
        ImageColor[ImageColor["Yellow"] = 2] = "Yellow";
        ImageColor[ImageColor["Green"] = 3] = "Green";
        ImageColor[ImageColor["Blue"] = 4] = "Blue";
        ImageColor[ImageColor["White"] = 5] = "White";
        ImageColor[ImageColor["Black"] = 6] = "Black";
        ImageColor[ImageColor["purple"] = 7] = "purple";
    })(ImageColor = Global.ImageColor || (Global.ImageColor = {}));
    function ChangeImageColor(image, imageColor) {
        let colorMatrix = null;
        switch (imageColor) {
            case ImageColor.Red:
                colorMatrix =
                    [
                        1, 0, 0, 0, 0,
                        0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0,
                        0, 0, 0, 1, 0,
                    ];
                break;
            case ImageColor.Gray:
                colorMatrix =
                    [
                        0.3086, 0.6094, 0.0820, 0, 0,
                        0.3086, 0.6094, 0.0820, 0, 0,
                        0.3086, 0.6094, 0.0820, 0, 0,
                        0, 0, 0, 1, 0,
                    ];
                break;
            case ImageColor.Green:
                colorMatrix =
                    [
                        0, 0, 0, 0, 0,
                        0, 1, 0, 0, 0,
                        0, 0, 0, 0, 0,
                        0, 0, 0, 1, 0,
                    ];
                break;
            case ImageColor.Blue:
                colorMatrix =
                    [
                        0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0,
                        0, 0, 0, 1, 0,
                        0, 0, 0, 1, 0,
                    ];
                break;
            case ImageColor.purple:
                colorMatrix =
                    [
                        1, 0, 0, 0, 0,
                        0, 0, 0, 0, 0,
                        0, 0, 0, 1, 0,
                        0, 0, 0, 1, 0,
                    ];
                break;
            case ImageColor.Yellow:
                colorMatrix =
                    [
                        1, 0, 0, 0, 0,
                        0, 1, 0, 0, 0,
                        0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0,
                    ];
                break;
            default:
                break;
        }
        var redFilter = new Laya.ColorFilter(colorMatrix);
        image.filters = [redFilter];
    }
    Global.ChangeImageColor = ChangeImageColor;
})(Global || (Global = {}));

var Public;
(function (Public) {
    class PoolMgr {
        static setup() {
            this.AllSigns = new ds.StringMap();
        }
        static saveSign(group, sign) {
            let signList = this.AllSigns.get(group);
            if (signList == null) {
                signList = new Array();
                this.AllSigns.put(group, signList);
            }
            if (signList.indexOf(sign) == -1) {
                signList.push(sign);
            }
        }
        static recoverItem(sign, item) {
            Laya.Pool.recover(sign, item);
        }
        static getItem(sign, group = "common") {
            let value = Laya.Pool.getItem(sign);
            if (value == null) {
                this.saveSign(group, sign);
            }
            return value;
        }
        static clearItems(group) {
            let signList = this.AllSigns.get(group);
            this.AllSigns.remove(group);
            if (signList != null) {
                signList.forEach(sign => {
                    let values = Laya.Pool.getPoolBySign(sign);
                    values.forEach(element => {
                        element.removeSelf();
                        element = null;
                    });
                    Laya.Pool.clearBySign(sign);
                });
            }
        }
    }
    Public.PoolMgr = PoolMgr;
})(Public || (Public = {}));

var Public;
(function (Public) {
    var SocketManager;
    (function (SocketManager) {
        function Init() {
            if (SocketManager.GameSocket == null) {
                SocketManager.GameSocket = new Public.BaseSocket();
            }
        }
        SocketManager.Init = Init;
        function connectGameServer(host, isWss) {
            SocketManager.GameSocket.connectServer(host, isWss);
        }
        SocketManager.connectGameServer = connectGameServer;
        function closeGameServer(statue, isOwer = true) {
            SocketManager.GameSocket.closeServer(statue, isOwer);
        }
        SocketManager.closeGameServer = closeGameServer;
        function sendGameServerMsg(msgLength, mainPro, sonPro, msgBody) {
            SocketManager.GameSocket.sendMessage(msgLength, mainPro, sonPro, msgBody);
        }
        SocketManager.sendGameServerMsg = sendGameServerMsg;
        function statueGameServer() {
            return SocketManager.GameSocket.isOpen();
        }
        SocketManager.statueGameServer = statueGameServer;
        function getMsgDecodeCmd(pb, data) {
            if (data == null || pb == null) {
                return null;
            }
            if (pb.decode == null) {
                return parseInt(data);
            }
            let message = pb.decode(data, data.length);
            return message;
        }
        SocketManager.getMsgDecodeCmd = getMsgDecodeCmd;
    })(SocketManager = Public.SocketManager || (Public.SocketManager = {}));
})(Public || (Public = {}));

var Public;
(function (Public) {
    class MessageInfo {
        constructor() {
        }
    }
    Public.MessageInfo = MessageInfo;
})(Public || (Public = {}));

var Public;
(function (Public) {
    var HttpManager;
    (function (HttpManager) {
        class Http {
            constructor() {
                this.responseType = "text";
                this.header = null;
                this.http = new Laya.HttpRequest();
            }
            setResponseType(responseType) {
                this.responseType = responseType;
                return this;
            }
            setHeader(header) {
                this.header = header;
                return this;
            }
            setHeaderProperty(name, value) {
                if (this.header == null) {
                    this.header = new Array();
                }
                this.header.push(name + ":" + value);
                return this;
            }
            getRequest(url, caller, callBack) {
                return this.request(url, caller, callBack, "get");
            }
            postRequest(url, caller, callBack, data) {
                return this.request(url, caller, callBack, "post", data);
            }
            request(url, caller, callBack, method, data) {
                this.caller = caller;
                this.callBack = callBack;
                this.http.once(Laya.Event.COMPLETE, this, this.onHttpRequestComplete);
                this.http.once(Laya.Event.ERROR, this, this.onHttpRequestError);
                if (this.header == null) {
                    this.http.send(url, data, method, this.responseType);
                }
                else {
                    this.http.send(url, data, method, this.responseType, this.header);
                }
                return this;
            }
            onHttpRequestComplete(e) {
                if (this.caller != null && this.callBack != null) {
                    this.callBack.call(this.caller, 0, this.http.data);
                }
            }
            onHttpRequestError(e) {
                if (this.caller != null && this.callBack != null) {
                    this.callBack.call(this.caller, 1, e);
                }
            }
        }
        HttpManager.Http = Http;
    })(HttpManager = Public.HttpManager || (Public.HttpManager = {}));
})(Public || (Public = {}));


var Public;
(function (Public) {
    class EventMgr {
        constructor() {
            this.m_event = new Laya.EventDispatcher();
        }
        static Inst() {
            var a;
            if (EventMgr.Instance == null) {
                EventMgr.Instance = new EventMgr();
            }
            return EventMgr.Instance;
        }
        get theRouter() {
            return this.m_event;
        }
        static containsEvent(eventType) {
            return EventMgr.Inst().theRouter.hasListener(eventType.toString());
        }
        static cleanup() {
            EventMgr.Inst().theRouter.offAll();
        }
        static on(eventType, caller, method) {
            EventMgr.Inst().theRouter.on(eventType.toString(), caller, method);
        }
        static off(eventType, caller, method) {
            EventMgr.Inst().theRouter.off(eventType.toString(), caller, method);
        }
        static trigger(eventType, ...args) {
            EventMgr.Inst().theRouter.event(eventType.toString(), args);
        }
    }
    EventMgr.Instance = null;
    Public.EventMgr = EventMgr;
})(Public || (Public = {}));

var Public;
(function (Public) {
    class CommonEvent {
    }
    CommonEvent.SOCKECT_MESSAGE = "sockect_Message";
    CommonEvent.SOCKECT_CLOSE = "sockect_Close";
    CommonEvent.BUTTON_CLICK_SOUND = "Button_click_sound";
    CommonEvent.TRY_ERROR = "TryError";
    Public.CommonEvent = CommonEvent;
})(Public || (Public = {}));

var Public;
(function (Public) {
    let BaseNetNotify;
    (function (BaseNetNotify) {
        BaseNetNotify[BaseNetNotify["First"] = 50] = "First";
        BaseNetNotify[BaseNetNotify["CS_CLIENT_REPORT"] = 51] = "CS_CLIENT_REPORT";
        BaseNetNotify[BaseNetNotify["CS_CLIENT_ERROR"] = 52] = "CS_CLIENT_ERROR";
        BaseNetNotify[BaseNetNotify["P_SO_Verify_Ask"] = 53] = "P_SO_Verify_Ask";
        BaseNetNotify[BaseNetNotify["End"] = 54] = "End";
    })(BaseNetNotify = Public.BaseNetNotify || (Public.BaseNetNotify = {}));
    let MessageTarget;
    (function (MessageTarget) {
        MessageTarget[MessageTarget["ERROR"] = 0] = "ERROR";
        MessageTarget[MessageTarget["CLIENT"] = 1] = "CLIENT";
        MessageTarget[MessageTarget["LOGIN_SERVER"] = 2] = "LOGIN_SERVER";
        MessageTarget[MessageTarget["GATE_SERVER"] = 3] = "GATE_SERVER";
        MessageTarget[MessageTarget["GAME_SERVER"] = 4] = "GAME_SERVER";
        MessageTarget[MessageTarget["MATCH_SERVER"] = 5] = "MATCH_SERVER";
        MessageTarget[MessageTarget["FIGHT_SERVER"] = 6] = "FIGHT_SERVER";
        MessageTarget[MessageTarget["LOG_SERVER"] = 7] = "LOG_SERVER";
    })(MessageTarget = Public.MessageTarget || (Public.MessageTarget = {}));
    let ServerStatue;
    (function (ServerStatue) {
        ServerStatue[ServerStatue["Open"] = 0] = "Open";
        ServerStatue[ServerStatue["Error"] = 1] = "Error";
        ServerStatue[ServerStatue["Maintain"] = 2] = "Maintain";
        ServerStatue[ServerStatue["Kick"] = 3] = "Kick";
        ServerStatue[ServerStatue["Close"] = 4] = "Close";
    })(ServerStatue = Public.ServerStatue || (Public.ServerStatue = {}));
})(Public || (Public = {}));

var Public;
(function (Public) {
    class TimeMgr {
        constructor() {
        }
        static get Inst() {
            if (TimeMgr.Instance == null) {
                TimeMgr.Instance = new TimeMgr();
            }
            return TimeMgr.Instance;
        }
        setup(call) {
            this._callBack = call;
        }
        get currTimer() {
            if (this._callBack) {
                return this._callBack.call();
            }
            return Laya.timer.currTimer;
        }
    }
    TimeMgr.Instance = null;
    Public.TimeMgr = TimeMgr;
})(Public || (Public = {}));

var Public;
(function (Public) {
    class LStorageMgr {
        constructor() {
        }
        static GetInst() {
            if (LStorageMgr.Inst == null) {
                LStorageMgr.Inst = new LStorageMgr();
            }
            return LStorageMgr.Inst;
        }
        getLocalData(key) {
            let value = Public.NativeApi.getLocalData(key);
            return value;
        }
        setLocalData(key, value) {
            Public.NativeApi.setLocalData(key, value);
        }
    }
    Public.LStorageMgr = LStorageMgr;
})(Public || (Public = {}));

var Public;
(function (Public) {
    class CountShareData {
        constructor() {
            this._count = 0;
            this.destroyTm = 0;
        }
        addCount(obj) {
            this._count++;
        }
        removeCount(obj) {
            this._count--;
        }
        get count() {
            return this._count;
        }
        destroy() {
        }
    }
    Public.CountShareData = CountShareData;
})(Public || (Public = {}));

var Public;
(function (Public) {
    class CountShare {
        constructor($destroyDelay = 0, $cherkFrameCount = 10) {
            this._destroyDelay = 0;
            this._cherkFramesCount = 10;
            this._count = 0;
            this.count = 0;
            this._destroyDelay = $destroyDelay;
            this._cherkFramesCount = $cherkFrameCount;
            this._shareDataDict = {};
            this._waitingDestroyShareDataDict = {};
        }
        startCount() {
            Laya.timer.frameLoop(1, this, this.checkUninstall);
        }
        stopCount() {
            Laya.timer.clear(this, this.checkUninstall);
        }
        hasShareData($key) {
            return this._shareDataDict[$key] != null;
        }
        getShareData($key) {
            var csd = this._shareDataDict[$key];
            return csd;
        }
        addShareData($key, $csd) {
            var csd = this.getShareData($key);
            if (csd) {
                csd.destroy();
                csd = null;
            }
            this._shareDataDict[$key] = $csd;
            this._count++;
        }
        removeShareData($key) {
            var csd = this.getShareData($key);
            if (csd != null) {
                csd.destroy();
                csd = null;
                this._count--;
            }
            delete this._shareDataDict[$key];
            delete this._waitingDestroyShareDataDict[$key];
        }
        installShareData($key, obj) {
            var csd = this._shareDataDict[$key];
            csd.addCount(obj);
            if (this._waitingDestroyShareDataDict[$key] == null) {
                delete this._waitingDestroyShareDataDict[$key];
            }
            return csd;
        }
        uninstallShareData($key, obj) {
            var csd = this._shareDataDict[$key];
            if (csd) {
                csd.removeCount(obj);
                if (csd.count <= 0) {
                    if (this._waitingDestroyShareDataDict[$key] == null) {
                        this._waitingDestroyShareDataDict[$key] = Laya.timer.currTimer;
                    }
                }
            }
        }
        checkUninstall() {
            if (++this.count < this._cherkFramesCount) {
                return;
            }
            this.count %= this._cherkFramesCount;
            var nowTime = Laya.timer.currTimer;
            var cnt = 0;
            var csd;
            for (var key in this._waitingDestroyShareDataDict) {
                cnt++;
                var tm = nowTime - this._waitingDestroyShareDataDict[key] - this._destroyDelay;
                if (tm > 0) {
                    delete this._waitingDestroyShareDataDict[key];
                    csd = this.getShareData(key);
                    if (csd) {
                        if (csd.count <= 0 && (tm - csd.destroyTm) > 0) {
                            this.removeShareData(key);
                        }
                    }
                }
            }
        }
        uninstallAll() {
            for (var key in this._shareDataDict) {
                this.removeShareData(key);
            }
            this._shareDataDict = {};
            this._waitingDestroyShareDataDict = {};
        }
        uninstallAllWait() {
            var key;
            for (key in this._waitingDestroyShareDataDict) {
                this.removeShareData(key);
            }
        }
        get cacheCnt() {
            return this._count;
        }
        getAllCacheKeyList() {
            var list = new Array();
            var key;
            for (key in this._shareDataDict) {
                list.push(key);
            }
            return list;
        }
        getAllCacheDataList() {
            var list = new Array();
            var data;
            for (var key in this._shareDataDict) {
                data = this._shareDataDict[key];
                list.push(data);
            }
            return list;
        }
    }
    Public.CountShare = CountShare;
})(Public || (Public = {}));

var GlobalData;
(function (GlobalData) {
    GlobalData.isRelease = true;
    GlobalData.isMiniGame = false;
})(GlobalData || (GlobalData = {}));

var GameConfig;
(function (GameConfig) {
    GameConfig.isOnLine = navigator.onLine;
    GameConfig.TextColors = {
        white: "#FFFFFF",
        milkWhite: "#fbf1af",
        grayWhite: "#ceb6a2",
        yellow: "#ffff00",
        lightYellow: "#ffd375",
        orangeYellow: "#ff9900",
        red: "#f11300",
        green: "#00e500",
        blue: "#1a94d7",
        grayBlue: "#2f5177",
        purple: "#e938f2",
        pink: "#FF3030",
        black: "#2e2d2d",
        golden: "#FFD700"
    };
    GameConfig.LabelFontSize = {
        littleSize: 12,
        middleSize: 18,
        normalSize: 24,
        bigSize: 36
    };
    function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        var microStr = "" + ua.match(/MicroMessenger/i);
        if (microStr == "null") {
            return false;
        }
        else if (microStr == "micromessenger") {
            return true;
        }
    }
    GameConfig.isWeiXin = isWeiXin;
    function isBigScreen() {
        return (document.body.clientHeight / document.body.clientWidth > 1.32);
    }
    GameConfig.isBigScreen = isBigScreen;
    function getTerminal() {
        if (GlobalData.isMiniGame) {
            return "WechatMiniGame";
        }
        else {
            return "H5";
        }
    }
    GameConfig.getTerminal = getTerminal;
    function getDevice() {
        if (Laya.Browser.onAndroid) {
            return "Android";
        }
        else if (Laya.Browser.onIOS) {
            return "IOS";
        }
        else if (Laya.Browser.onWP) {
            return "WP";
        }
        else if (Laya.Browser.onPC) {
            return "PC";
        }
        else {
            return "Other";
        }
    }
    GameConfig.getDevice = getDevice;
    function systemType() {
        var ua = window.navigator.userAgent.toLowerCase();
        var microStr = "" + ua.match(/MicroMessenger/i);
        if (("" + ua.match(/windows nt/i)) == "windows nt") {
            return "windows";
        }
        else if (("" + ua.match(/iphone/i)) == "iphone") {
            return "ios";
        }
        else if (("" + ua.match(/android/i)) == "android") {
            return "android";
        }
        else if (("" + ua.match(/ipad/i)) == "ipad") {
            return "ipad";
        }
        else if (("" + ua.match(/linux/i)) == "linux") {
            return "linux";
        }
        else if (("" + ua.match(/mac/i)) == "mac") {
            return "mac";
        }
        else if (("" + ua.match(/ucbrower/i)) == "ucbrower") {
            return "ucbrower";
        }
        else {
            logI("未知系统类型");
        }
    }
    GameConfig.systemType = systemType;
    function platformType() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (("" + ua.match(/micromessenger/i)) == "micromessenger") {
            return "micromessenger";
        }
        else if (("" + ua.match(/qzone/i)) == "qzone") {
            return "qzone";
        }
        else if (("" + ua.match(/weibo/i)) == "weibo") {
            return "weibo";
        }
        else if (("" + ua.match(/qq/i)) == "qq") {
            return "qq";
        }
        else if (("" + ua.match(/renren/i)) == "renren") {
            return "renren";
        }
        else if (("" + ua.match(/txmicroblog/i)) == "txmicroblog") {
            return "txmicroblog";
        }
        else if (("" + ua.match(/douban/i)) == "douban") {
            return "douban";
        }
        else {
            return "other";
        }
    }
    GameConfig.platformType = platformType;
    GameConfig.WinScaleX = 1;
    GameConfig.WinScaleY = 1;
    GameConfig.WinScaleFit = 1;
})(GameConfig || (GameConfig = {}));

var Public;
(function (Public) {
    class ServerError {
    }
    Public.ServerError = ServerError;
    class BaseSocket extends Laya.EventDispatcher {
        constructor() {
            super();
            this.isBigPackage = false;
        }
        isOpen() {
            return this.socket != null && this.socket.connected;
        }
        connectServer(host, isWss) {
            if (this.socket != null) {
                return;
            }
            this.msgIndex = 1;
            this.lastMsgIndex = 1;
            this.socket = new Laya.Socket();
            this.socket.endian = Laya.Socket.BIG_ENDIAN;
            if (host.indexOf("ws") != 0) {
                this.socket.connectByUrl((isWss ? "wss://" : "ws://") + host);
            }
            else {
                this.socket.connectByUrl(host);
            }
            this.socket.on(Laya.Event.OPEN, this, this.onSocketOpen);
            this.socket.on(Laya.Event.CLOSE, this, this.onSocketClose);
            this.socket.on(Laya.Event.MESSAGE, this, this.onReceiveMessage);
            this.socket.on(Laya.Event.ERROR, this, this.onConnectError);
            logI("与服务器开始建立链接:" + host);
        }
        closeServer(statue, isOwer = true, errorMsg = null) {
            if (this.socket == null) {
                return;
            }
            Laya.timer.clearAll(this);
            this.socket.offAll();
            try {
                this.socket.cleanSocket();
                this.socket.close();
            }
            catch (error) {
                logI(error);
            }
            this.socket = null;
            if (isOwer) {
                logD("与服务器断开链接！！！" + isOwer);
            }
            else {
                this.event(Public.CommonEvent.SOCKECT_CLOSE, [statue, errorMsg]);
            }
        }
        onSocketOpen() {
            this.event(Laya.Event.OPEN);
        }
        onSocketClose(e) {
            this.closeServer(Public.ServerStatue.Close, false);
        }
        onConnectError(e) {
            logE("ConnectError:", e);
            this.closeServer(Public.ServerStatue.Error, false);
        }
        onReceiveMessage(message) {
            let tmpBytes = new Laya.Byte(message);
            tmpBytes.endian = Laya.Byte.BIG_ENDIAN;
            this.splitInputMsg(tmpBytes);
        }
        splitInputMsg(recMsg) {
            while (recMsg.length > 0) {
                let tmpPos = recMsg.pos;
                let msgLength = 0;
                if (this.isBigPackage) {
                    msgLength = recMsg.getUint32();
                }
                else {
                    msgLength = recMsg.getUint16();
                }
                if (msgLength < 5 || recMsg.length < msgLength) {
                    recMsg.pos = tmpPos;
                    break;
                }
                let mainPro = recMsg.getUint8();
                let sonPro = recMsg.getUint8();
                let eventFlag = recMsg.getUint8();
                let cmdDataBA = recMsg.getUint8Array(recMsg.pos, msgLength - 5);
                this.dispathCmdMsg(mainPro, sonPro, eventFlag, cmdDataBA);
                if (recMsg.pos >= recMsg.length) {
                    recMsg.clear();
                }
            }
        }
        dispathCmdMsg(mainPro, sonPro, eventFlag, message) {
            var mess = new Public.MessageInfo();
            mess.main = mainPro;
            mess.sub = sonPro;
            mess.data = message;
            mess.eventFlag = eventFlag;
            this.event(Public.CommonEvent.SOCKECT_MESSAGE, mess);
        }
        sendMessage(msgLength, mainPro, sonPro, msgBody) {
            if (this.socket == null) {
                return;
            }
            if (this.isBigPackage) {
                this.socket.output.writeUint32(msgLength + 7);
            }
            else {
                this.socket.output.writeUint16(msgLength + 5);
            }
            this.socket.output.writeUint8(mainPro);
            this.socket.output.writeUint8(sonPro);
            this.socket.output.writeUint8(0);
            this.socket.output.writeArrayBuffer(msgBody);
            ++this.msgIndex;
            {
                this.flushQueneMsg();
            }
        }
        flushQueneMsg() {
            if (this.isOpen() && this.socket.output.length > 0) {
                this.lastMsgIndex = this.msgIndex;
                try {
                    this.socket.flush();
                }
                catch (error) {
                    logI(error);
                }
            }
        }
    }
    Public.BaseSocket = BaseSocket;
})(Public || (Public = {}));

class BitmapBlink extends Laya.EventDispatcher {
    constructor(target, time, isAuto = true) {
        super();
        this._target = target;
        this._time = time;
        if (isAuto) {
            this.start();
        }
    }
    start() {
        this._currTime = Laya.timer.currTimer;
        this._target.on(Laya.Event.FRAME, this, this.runDown);
    }
    runDown(e) {
        this._target.alpha -= 0.045;
        if (this.checkOver()) {
            return;
        }
        if (this._target.alpha <= 0.6) {
            this._target.off(Laya.Event.FRAME, this, this.runDown);
            this._target.on(Laya.Event.FRAME, this, this.runUp);
        }
    }
    runUp(e) {
        this._target.alpha += 0.045;
        if (this.checkOver()) {
            return;
        }
        if (this._target.alpha >= 1) {
            this._target.off(Laya.Event.FRAME, this, this.runUp);
            this._target.on(Laya.Event.FRAME, this, this.runDown);
        }
    }
    checkOver() {
        var nowTime = Laya.timer.currFrame;
        if (nowTime - this._currTime >= this._time) {
            this.destroy();
            return true;
        }
        return false;
    }
    destroy() {
        this._target.alpha = 1;
        this._target.off(Laya.Event.FRAME, this, this.runDown);
        this._target.off(Laya.Event.FRAME, this, this.runUp);
        this.event(Laya.Event.COMPLETE, this._target);
        this._target = null;
    }
}

class WaitPanel extends Laya.Sprite {
    constructor(type = 1) {
        super();
        this.bg = new Laya.Sprite();
        this.createView();
    }
    createView() {
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        this.bg.graphics.drawRect(0, 0, this.width, this.height, "#000000", 0.2);
        this.bg.width = this.width;
        this.bg.height = this.height;
        this.bg.alpha = 0.2;
        this.bg.visible = false;
        this.addChild(this.bg);
        this.showText = new ui.Label();
        this.showText.fontSize = 24;
        this.showText.color = "#FFFFFF";
        this.showText.bold = true;
        this.showText.stroke = 1;
        this.showText.strokeColor = "#000000";
        this.addChild(this.showText);
        this.showText.x = this.width / 2;
        this.showText.y = this.height / 2 + 45;
        this.showText.anchorX = 0.5;
        this.showText.anchorY = 0.5;
        this.on(Laya.Event.REMOVED, this, this.onRemove);
        this.on(Laya.Event.MOUSE_UP, this, this.mouseUpCalled);
    }
    onRemove() {
    }
    mouseUpCalled() {
    }
    activeStatue(active, DelayShow = true, showMsg = "") {
        this.visible = active;
        Laya.timer.clearAll(this);
        if (active) {
            this.showText.text = showMsg;
            if (DelayShow) {
                Laya.timer.once(1000, this, () => {
                    this.bg.visible = true;
                });
            }
            else {
                this.bg.visible = true;
            }
        }
        else {
            this.bg.visible = false;
        }
    }
}

