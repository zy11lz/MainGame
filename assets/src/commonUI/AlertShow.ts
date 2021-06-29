/*
* name;
*/
module Pro.AlertShow
{
    export function showSimpleAlert(msg: string): void
    {
        //打开警告框
        let openUIData = new AlertOpenUIData();
        openUIData.des = msg;
        openUIData.sure = new AlertOpenUIData_Fun();
        openUIData.sure.Txt = Global.getLangStr("common_confirm");
        __showAlert(openUIData);
    }

    /**
     * 带有倒计时的Alert
     * @param des 提示内容
     * @param caller
     * @param callFun 确定按钮回调
     * @param strSureLanId 按钮显示样式
     * @param sureDelayTime 延时时长
     * @param autoCloseOnDelayEnd 延时结束后，是否自动关闭
     * @param clickEnableOnDelay 延时期间是否可以差点按钮
     * @param executeCallFunOnClose 界面关闭时，是否执行回调
     * @param clickEnableOnClip 空白区域是否可以点击
     */
    export function showRemainConfirmAlert(des: string, caller: any, callFun: Function,
        strSureLanId: string = "common_confirm",
        sureDelayTime: number = 0, autoCloseOnDelayEnd: boolean = false, clickEnableOnDelay: boolean = false, executeCallFunOnClose: boolean = false, clickEnableOnClip: boolean = false): void
    {

        //二级弹窗确认
        let openUIData = new AlertOpenUIData();
        openUIData.des = des;
        openUIData.todayRepeatKey = null;
        openUIData.sure = new AlertOpenUIData_Fun();
        if (!strSureLanId) { strSureLanId = "common_confirm"; }
        openUIData.sure.Txt = Global.getLangStr(strSureLanId);
        openUIData.sure.caller = caller;
        openUIData.sure.fun = callFun;
        openUIData.sureDelayTime = sureDelayTime;
        openUIData.priority = 0;
        openUIData.autoCloseOnEnd = autoCloseOnDelayEnd;
        openUIData.clickEnableOnDelay = clickEnableOnDelay;
        openUIData.executeCallFunOnClose = executeCallFunOnClose;
        openUIData.clickEnableOnClip = clickEnableOnClip;

        __showAlert(openUIData, false);
    }
    /** 显示简单的二级确认界面(带确定取消按钮， 该接口为简化二次确认的弹窗逻辑，所以点击取消时无需做回调处理)
     * @param sureDelayTime 倒计时确定按钮才点亮(秒)
     * @param priority 显示优先级：当有多个alert弹窗时，以优先级最高的显示。
     * @param todayRepeatKey 今日不再提示用的key值， 如果有值：则对应保存的key  如果没有值，表示不需要显示“今日不再提示”
     * @param pushToUiQueue 是否添加到ui队列中 不立即展示
     */
    export function showConfirmAlert(des: string, caller: any, callFun: Function,
        strSureLanId: string = "common_confirm", strCloseLanId: string = "common_cancel",
        sureDelayTime: number = 0, priority: number = 0, todayRepeatKey: string = null, pushToUiQueue: boolean = false, executeCallFunOnClose: boolean = false, clickEnableOnClip: boolean = true): void
    {
        //如果有今日不再提示，则直接判断当前是否还需要弹窗, 如果有今日不再提示存储了，就直接回调即可
        if (todayRepeatKey && TodayRepeatOpMgr.Inst.getTag(todayRepeatKey))
        {
            if (callFun) { callFun.apply(caller); }
            return;
        }
        //二级弹窗确认
        let openUIData = new AlertOpenUIData();
        openUIData.des = des;
        openUIData.todayRepeatKey = todayRepeatKey;
        openUIData.sure = new AlertOpenUIData_Fun();
        if (!strSureLanId) { strSureLanId = "common_confirm"; }
        openUIData.sure.Txt = Global.getLangStr(strSureLanId);
        openUIData.sure.caller = caller;
        openUIData.sure.fun = callFun;
        openUIData.sureDelayTime = sureDelayTime;
        openUIData.priority = priority;
        if (strCloseLanId)
        {
            openUIData.close = new AlertOpenUIData_Fun();
            openUIData.close.Txt = Global.getLangStr(strCloseLanId);
        }
        openUIData.executeCallFunOnClose = executeCallFunOnClose;
        openUIData.clickEnableOnClip = clickEnableOnClip;
        __showAlert(openUIData, pushToUiQueue);
    }

    /**
     * 添加确定和取消回调接口
     */
    export function showConfirmAlert_Two(des: string, caller: any, sure_callFun: Function, canecel_callFun: Function,
        strSureLanId: string = "common_confirm", strCloseLanId: string = "common_cancel",
        sureDelayTime: number = 0, priority: number = 0, pushToUiQueue: boolean = false, executeCallFunOnClose: boolean = false, clickEnableOnClip: boolean = true): void
    {
        //二级弹窗确认
        let openUIData = new AlertOpenUIData();
        openUIData.des = des;
        openUIData.sure = new AlertOpenUIData_Fun();
        if (!strSureLanId) { strSureLanId = "common_confirm"; }
        openUIData.sure.Txt = Global.getLangStr(strSureLanId);
        openUIData.sure.caller = caller;
        openUIData.sure.fun = sure_callFun;
        openUIData.sureDelayTime = sureDelayTime;
        openUIData.priority = priority;
        if (strCloseLanId)
        {
            openUIData.close = new AlertOpenUIData_Fun();
            openUIData.close.Txt = Global.getLangStr(strCloseLanId);
            openUIData.close.caller = caller;
            openUIData.close.fun = canecel_callFun;
        }
        openUIData.executeCallFunOnClose = executeCallFunOnClose;
        openUIData.clickEnableOnClip = clickEnableOnClip;
        __showAlert(openUIData, pushToUiQueue);
    }

    /**
     * @param pushToUiQueue 是否添加到ui队列中 不立即展示
     */
    function __showAlert(uiData: AlertOpenUIData, pushToUiQueue = false): void
    {
        //拿到当前显示的或者正准备显示的界面信息，判断优先级，再决定是否替换之
        let mediator = UIManager.Inst.getUIMeditorInOpenList(PanelNotify.Open_Alert) as AlertWinMediator;
        if (mediator)
        {
            //当前界面的状态 0:未初始化，1:正在初始化，2:初始化完成
            let uiState = mediator.getIsInitStatue();
            if (uiState == 0)
            {
                if (!pushToUiQueue)
                { UIManager.Inst.forceOpen(uiData); }
                else
                { UIManager.Inst.pushAutoQueue(uiData); }
                return;
            }
            //新的优先级比旧的大，需要替换成新的
            if (mediator.UIOpenData.priority < uiData.priority)
            {
                //如果界面正在加载初始中，只替换数据即可，如果界面已经打开，替换数据还需要再重新init一次界面
                mediator.UIOpenData = uiData;
                if (uiState == 2)
                {
                    mediator.initUI();
                }
            }
        } else
        {
            if (!pushToUiQueue)
            { UIManager.Inst.forceOpen(uiData); }
            else
            {
                uiData.orderIndex = 99;// 优先打开
                UIManager.Inst.pushAutoQueue(uiData);
            }
        }
    }
}