
/**
  * 游戏配置文件
  * 存放游戏的配置数据
  * 比如：游戏界面尺寸、分享随机百分比、获取系统数据
  */
module GameConfig
{

    //当前舞台
    export function curStage(): Laya.Stage
    {
        return Laya.stage;
    }

    /** 当前游戏窗口宽度 */
    export function curWidth(): number
    {
        return Laya.stage.width;
    }

    /** 当前游戏高度 */
    export function curHeight(): number
    {
        return Laya.stage.height;
    }

    /**
     * 适配偏移值 = Laya.stage.height - GameConfig.WinHeight;
     */
    export var screenOffY: number = 0;

    /**
     * 刘海目前不好判断，直接把高宽比大于2的手机都当做刘海屏处理
     */
    export var isBangs: boolean = false;
    export var isInWebview: boolean = false;
    export var serverListSFlag: string = "";

    /**
     * 刘海高度 默认50
     */
    export function getBangsTop(): number
    {
        if (GameConfig.isInWxGame())
        {
            let safeArea: WechatMinigame.SafeArea
            if (safeArea == null && wx["getSystemInfoSync"] != null)
            {
                var wxSystemInfo: WechatMinigame.SystemInfo = wx.getSystemInfoSync();
                if (wxSystemInfo && wxSystemInfo["safeArea"] != null)
                {
                    safeArea = wxSystemInfo.safeArea;
                    logI("刘海平高度：" + (safeArea.top || safeArea.left));
                }
            }
            if (safeArea)
            {
                return safeArea.top || safeArea.left;
            }
            return 0;
        }
        else if (runTime == RunTimeType.oppo_miniGame)
        {
            return 0;
        }
        else if (runTime == RunTimeType.vivo_miniGame)
        {
            return 50;
        }
        else if (runTime == RunTimeType.hua_wei_minigGame)
        {

            return 50;
        }
        else
        {
            return isBangs ? 50 : 0;
        }
    }

    export function isInWxGame(): boolean
    {
        if (GameConfig.isWeiXin() && window["wx"] != null)
        {
            return true;
        }
        return false;
    }

    /** UI按Y轴完美适配总偏移值 */
    export var WinCenterY = 0;

    /**
     * 制作UI的界面参考尺寸X
     */
    export var WinWidth: number = 750;
    /**
     * 制作UI的界面参考尺寸Y
     */
    export var WinHeight: number = 1334;
    /**
     * 游戏背景图允许的最长高度
     */
    // export var WinLimitBGHeight: number = 1334;
    /**
     * * 是否在IphoneX
     */
    export var OnIphoneX = false;

    /**
     * 在IphoneX上的偏移值
     */
    export var OnIphoneXDetalY = 50;


    /** 角色场景移动限制 */
    export var MapDown = 1150;
    export var MapUp = 670;
    export var MapCenterY = 910;
    export var MapLeft = 50;
    export var MapRight = 200;

    /** 角色移动到npc最近距离 */
    export var RecentyNPCDistance = 80;

    /** 角色UI行列索引对应场景战力行列
     *  从右到左 : 1排 -> 3排
     *  从上到下 : 1列 -> 3列
     *
     *  后    前
     *  13 12 11
     *  23 22 21
     *  33 32 31
     *        后
     *
     */
    export var AtkStandAry = [11, 21, 31, 12, 22, 32, 13, 23, 33];
    /** 角色UI行列索引对应场景战力行列
     *  从右到左 : 1排 -> 3排
     *  从上到下 : 1列 -> 3列
     *
     *  后    前
     *  13
     *     22
     *  33     31
     *     42
     *  53     51
     *     62
     *  73
     *
     *
     *     12
     *          21
     *     32
     *          41
     *     52
     *
     *
     *
     *              后
     *
     */
    export var AtkStandAry2 = [21, 41, 12, 32, 52];
    export var AtkStandObj = { 2: AtkStandAry2[0], 4: AtkStandAry2[1], 6: AtkStandAry2[2], 7: AtkStandAry2[3], 9: AtkStandAry2[4] };
    /**竞技场 */
    export var AtkStandObj2 = { 1: AtkStandAry2[0], 3: AtkStandAry2[1], 4: AtkStandAry2[2], 6: AtkStandAry2[3], 8: AtkStandAry2[4] };



    /** 角色地图挂机的线路 */
    export var MapHangUp = [new Laya.Point(71, 913),
    new Laya.Point(150, 670),
    new Laya.Point(1138, 670),
    new Laya.Point(2200, 670),
    new Laya.Point(2365, 913),
    new Laya.Point(2200, 1150),
    new Laya.Point(1138, 1150),
    new Laya.Point(150, 1150)];

    /** 序列帧时间间隔 */
    export var EffDetalTime = 80;

    /** 角色横向间隔 */
    export var HeroStandHorSpace = 80;

    /** 角色纵向间隔 */
    export var HeroStandVelSpace = 100;
    /** 角色没行梯度 */
    export var HeroStandGradient = 15;



    /** 角色横向间隔 */
    export var HeroStandHorSpace2 = 181;
    /** 角色纵向间隔 */
    export var HeroStandVelSpace2 = 89;
    /** 角色没行梯度 */
    export var HeroStandGradient2 = 6;

    export var isUseFlySk: boolean = false;

    export var useNewLoginSk: boolean = false;

    export var runTime: RunTimeType = -1;

}



