module Pro
{
    import UIButton = component.UIButton;

    /**
    * 网络状态监控
    * 注：此类并非网络数据监听处理，而是对网络连接状态的监控，  执行网络状态提示、断线重连、客户端主动断开连接等操作
    *
    * @author jason.xu
    */
    export class NetMonitorMgr
    {
        set serverMaintainBackLogin(value: boolean)
        {
            this._serverMaintainBackLogin = value;
        }
        get serverMaintainBackLogin(): boolean
        {
            return this._serverMaintainBackLogin;
        }

        private static _inst: NetMonitorMgr;
        public static get Inst(): NetMonitorMgr
        {
            if (NetMonitorMgr._inst == null)
            {
                NetMonitorMgr._inst = new NetMonitorMgr();
            }
            return NetMonitorMgr._inst;
        }
        constructor() { }



        ////////////////////////////////////断线重连相关的参数 /////////////////////////////////
        /** 当前是否处于断线重连中 */
        private _isReconnecting = false;

        /** 断线后重新连接失败允许的最大次数 */
        private MAX_ERROR_COUNT = 20;
        /** 连接失败时，延迟再次尝试连接的时间间隔（毫秒） */
        private ERROR_RECONECT_DELAY = 3000;
        /** 当前错误次数 */
        private _errorCount = 0;

        // 检测短时间之内频繁断开的情况（刚连上就立马断开）
        /** 连续断开连接的时间间隔 */
        private FREQUENTLY_CLOSE_DELAY = 1000;
        /** 连续断开连接的最大允许次数 */
        private MAX_FREQUENTLY_CLOSE_COUNT = 3;
        /** 记录上次请求连接的时间 */
        private _lastConnectTime = 0;
        /** 记录当前频繁请求的记数 */
        private _frequentlyTick = 0;

        ////////////////////////////////////断线重连相关的参数 end /////////////////////////////////



        /** 临时存下最后一条错误信息，在服务器主动断开socket时再拿出来做提示 */
        private _lastErrorCode: Public.ServerError = null;
        /**
         * 服务器维护原因，退出到登录界面
         * @private
         */
        private _serverMaintainBackLogin: boolean = false;
        private _isInit = false;
        public init(): void
        {
            if (this._isInit) { return; }
            this._isInit = true;
            this.addEvents();
        }
        /** 清理 */
        public unInit(): void
        {
            if (!this._isInit) { return; }
            this._isInit = false;
            this.removeEvents();
        }

        /** 当前网络状态（0-未连接 1-正常 2-正在连接与同步数据中） */
        public get state(): number
        {
            if (this._isReconnecting) { return 2; }
            if (Public.SocketManager.statueGameServer()) { return 1; }
            return 0;
        }


        private addEvents(): void
        {
            Public.SocketManager.GameSocket.on(Public.CommonEvent.SOCKECT_CLOSE, this, this.onSocketClose);
            // SocketManager.GameSocket.on(Laya.Event.OPEN, this, this.onSocketOpen);

            EventMgr.on(EventNotify.ServerLogicError, this, this.onErrorCode);
            EventMgr.on(EventNotify.ReciverLoginData, this, this.onReciverLoginData);
            EventMgr.on(EventNotify.Connect_Server_Close_Prev, this, this.onReciverServerClose);
            if (conch && SystemUtils.isIos())
            {
                //ios 直接使用websocket侦听监听不到，使用这种方式监听网络断开
                // NET_NO = 0;
                // NET_WIFI = 1;
                // NET_2G = 2;
                // NET_3G = 3;
                // NET_4G = 4;
                // NET_UNKNOWN=5
                let that = this;
                conch.setNetworkEvtFunction(function (type)
                {
                    that.onNetworkEvt(type);
                });
            }

        }
        private onNetworkEvt(type: number)
        {
            logI(`setNetworkEvtFunction:${ type }`);
            if (type == 0)
            {
                this.onSocketClose(Public.ServerStatue.Error, null);
            }
        }
        private removeEvents(): void
        {

            Public.SocketManager.GameSocket.off(Public.CommonEvent.SOCKECT_CLOSE, this, this.onSocketClose);

            EventMgr.off(EventNotify.ServerLogicError, this, this.onErrorCode);
            EventMgr.off(EventNotify.ReciverLoginData, this, this.onReciverLoginData);
        }

        /** 服务器处理之后的错误提示 */
        private onErrorCode(errorClass: Public.ServerError)
        {
            //收到255的错误码时，表示服务器紧接着要断开socket了，不需要tips，把errorcode记下来，等socket断开后再拿出来做弹窗即可
            if (errorClass.mainPro == Pb_God._emPS2C_Protocol.P_S2C_Protocol_Operate)
            {
                this._lastErrorCode = errorClass;
                return;
            }

            var errorText: string = cfg.ErrorCodeErrorCodeCfgData.getErrorCodeTxt(errorClass.mainPro, errorClass.eventFlag);
            logI(errorClass.mainPro, "_", errorClass.eventFlag, errorText);

            let showStr;
            if (GlobalData.isRelease)
            {
                showStr = errorText;
            }
            else
            {
                showStr = errorText + `  错误码:  ${ errorClass.eventFlag },  协议号_emPS2C_Protocol:  ${ errorClass.mainPro }`;
            }

            TipsUtils.showTips(showStr);

        }

        //收到登陆后玩家数据
        private onReciverLoginData()
        {
            this._lastErrorCode = null;
            if (this._isReconnecting)
            { //断线重连后，重新拉起来的
                TipsUtils.showTipsByLanId("relogin_msg1");
                this._isReconnecting = false;
            }
            UIManager.Inst.closeCurrentList();
        }
        private onReciverServerClose(data: Pb_God.PBCloseServerData): void
        {
            this.onServerMaintain(data);
        }

        // private onSocketOpen():void{

        // }

        /** 连接断开 */
        private onSocketClose(statue: Public.ServerStatue, errorMsg: string)
        {
            if (errorMsg == null)
            {
                switch (statue)
                {
                    case Public.ServerStatue.Close: //连接断开
                        this.onNetClose();
                        break;
                    case Public.ServerStatue.Error: //连接失败
                        this.onNetConnectError();
                        break;
                    case Public.ServerStatue.Maintain: //服务器维护
                        this.onServerMaintain(null);
                        break;
                    case Public.ServerStatue.Kick: //被服务器T下线，或者无法登陆
                        if (this._lastErrorCode)
                        { //如果是服务器主动将人T下线（比如服务器维护， 异处登陆等）， 就不需要重连了
                            errorMsg = cfg.ErrorCodeErrorCodeCfgData.getErrorCodeTxt(this._lastErrorCode.mainPro, this._lastErrorCode.eventFlag);
                            if (!errorMsg) { errorMsg = Global.getLangStr("loginErrorTips3"); }
                        } else
                        {
                            this.onNetClose();
                        }
                        break;
                }
            }

            if (errorMsg)
            {
                this.popUpAlertWindow(errorMsg);
            }
            EventMgr.trigger(EventNotify.Connect_Server_Close, statue, errorMsg);
        }

        /**
         * 服务器维护时执行
         * @param data
         */
        public onServerMaintain(data: Pb_God.PBCloseServerData): void
        {
            GameVersionUpdater.instance.mustCheckVersion = true;
            let errorMsg = Global.getLangStr("loginErrorTips5"); // 服务器正在维护中，请先休息一下吧~
            let sureDelayTime = 10;

            if (data)
            {
                sureDelayTime = Math.round((data.closeTime.toNumber() - TimeController.currTimer) * 0.001);
                errorMsg = data.closeStr;
            }

            AlertShow.showRemainConfirmAlert(errorMsg, this, () =>
            {
                this._isReconnecting = false;

                this.serverMaintainBackLogin = true;
                ThirdMgr.gameLogOut();
            }, "common_confirm", sureDelayTime, true, true, true, false);
        }

        /** 连接失败后的处理 */
        private onNetConnectError(): void
        {
            //连接失败重连逻辑：  会以约定时间的间隔来驱动重新连接，直到连接成功，或者连接次数达到上限。
            if (!this._isReconnecting)
            {
                this.onNetClose();
                return;
            }
            this._errorCount++;
            //重试次数达到上限
            if (this._errorCount >= this.MAX_ERROR_COUNT)
            {
                this.popUpAlertWindow(Global.getLangStr("loginErrorTips6"));
                return;
            }
            WaitPanelUtils.showWaitPanel(false, Global.getLangStr("login_des2") + this._errorCount);  //正在连接服务器...
            logE("network error ## reconnection error count " + this._errorCount);
            Laya.timer.once(this.ERROR_RECONECT_DELAY, this, () =>
            {
                if (!this._isReconnecting || Public.SocketManager.statueGameServer()) { return; }
                LoginServerMgr.loging();
            })

        }
        /** 服务器异常断开的处理 */
        private onNetClose(): void
        {
            //频繁断开, 针对一直连一直断的情况处理
            let time = Laya.timer.currTimer;
            if (this._lastConnectTime && (time - this._lastConnectTime < this.FREQUENTLY_CLOSE_DELAY))
            {
                this._frequentlyTick++;
                logE("net work reconnection frequentlyTick:" + this._frequentlyTick);
                if (this._frequentlyTick >= this.MAX_FREQUENTLY_CLOSE_COUNT)
                {
                    this.popUpAlertWindow(Global.getLangStr("loginErrorTips6"));
                    return;
                }
            } else
            {
                logE("net work reconnection !");
                this._frequentlyTick = 0;
            }
            this._lastConnectTime = time;
            this.reconnectServerStatue();
        }

        // 重新连接服务器
        private reconnectServerStatue()
        {
            if (!ServerListDataMgr.isInitServerList)
            {
                return;
            } //服务器列表基础配置都还没有初始化
            this._isReconnecting = true;
            this._errorCount = 0;
            this._lastErrorCode = null;
            this.clearCurSceneView();
            LoginServerMgr.loging();
        }

        /** 主动断开连接
         * @param isReConnect 断开后是否重连
         */
        public closeServerStatue(isReconnect: boolean): void
        {
            Public.SocketManager.closeGameServer(Public.ServerStatue.Close, true);
            if (isReconnect) { this.reconnectServerStatue(); }
        }

        /** 释放当前场景显示信息 */
        private clearCurSceneView(): void
        {
            UIManager.Inst.clearAutoQuene();
            UIManager.Inst.closeCurrentList();
            if (GlobalData.MInScene == GlobalData.StandScene.Login)
            {
                Public.SocketManager.closeGameServer(Public.ServerStatue.Close);
            } else if (GlobalData.MInScene == GlobalData.StandScene.Main)
            {
                BattleMgr.Inst.exitAllBattle();
                GuideMgr.Inst.reset();
            }
        }

        /** 正式断线后不需要再次重连时，弹出提示， 并且根据当前的场景，做一些释放操作 */
        private popUpAlertWindow(errorMsg: string): void
        {
            //弹断线提示后，游戏已中断，接下来就是刷新页面或退出游戏了，故此处可强制把小loading直接干掉，避免挡住提示
            WaitPanelUtils.hideWaitPanel();
            this._isReconnecting = false;
            AlertShow.showConfirmAlert(errorMsg, this, () =>
            {
                ThirdMgr.onSdkLogOut();
            }, "common_confirm", null, 0, 300);

        }

    }
}