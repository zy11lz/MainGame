/* eslint-disable no-console */

module Pro
{

    /**
     * 数据上报类型
     */
    export enum GameDataType
    {
        /** 选服 */
        SELECT_SERVER = 1001,
        /** 创角 */
        CREATE_ROLE = 1002,
        /** 进入游戏 */
        ENTER_GAME = 1003,
        /** 角色升级 */
        ROLE_UPDATE = 1004,
        /** 退出游戏 */
        EXIT = 1005,
        /** 角色消费 */
        INGOT_CONSUME = 1006,
        /** 角色战斗力变更 */
        POWER_CHANGE = 1007,
        /** 激活游戏 */
        ACTIVE = 2000
    }

    /**
     * sdk交互管理
     */
    class SdkManager
    {

        //canch 中转类
        private bridge: any;
        /** ios情况下，如果函数穿参数，函数名后需要带上的字符  */
        private bridgeExStr: string;
        //登陆回调
        private loginCall: { callback: Function, target: any } = { callback: null, target: null };
        private _sdkSystem: BaseSdkSystem;
        private _isGameLogining: boolean;

        constructor()
        {
        }

        /** 初始化环境 */
        public init()
        {
            EventMgr.on(EnumHttpApi.login, this, this.onHttpLogin);
            //浏览器的环境没有conch
            if (conch == null)
            {
                if (PlatformData.EnumPlatformType.wx_cx == PlatformData.platformType)
                {
                    this._sdkSystem = new WxCxSdkSystem();
                }
                else if (PlatformData.EnumPlatformType.wx_cx_h5 == PlatformData.platformType)
                {
                    this._sdkSystem = new WxCxH5SdkSystem();
                }
                else if (PlatformData.EnumPlatformType.meng_you == PlatformData.platformType)
                {
                    this._sdkSystem = new MengYouSdkSystem();
                }
                else if (PlatformData.EnumPlatformType.gao_re == PlatformData.platformType)
                {
                    this._sdkSystem = new GaoReH5SdkSystem();
                }
                else if (PlatformData.EnumPlatformType.chuang_sheng == PlatformData.platformType)
                {
                    if (GameConfig.runTime == RunTimeType.vivo_miniGame)
                    {
                        this._sdkSystem = new ChuanShengVivoSdkSystem();
                    }
                    else if (GameConfig.runTime == RunTimeType.oppo_miniGame)
                    {
                        this._sdkSystem = new ChuanShengOppoSdkSystem();
                    }
                    else if (GameConfig.runTime == RunTimeType.hua_wei_minigGame)
                    {
                        this._sdkSystem = new ChuanShengHuaWeiSdkSystem();
                    }
                }
                else if (PlatformData.EnumPlatformType.feng_qu_h5 == PlatformData.platformType)
                {
                    this._sdkSystem = new FengQuH5SdkSystem();
                }
                else if (PlatformData.EnumPlatformType.huan_yu_h5 == PlatformData.platformType)
                {
                    this._sdkSystem = new HuanYuH5SdkSystem();
                }
                else if (PlatformData.EnumPlatformType.kai_rong_web_view == PlatformData.platformType)
                {
                    this._sdkSystem = new KaiRongWebViewSdkSystem();
                }
                else if (PlatformData.EnumPlatformType.pin_gu_h5 == PlatformData.platformType)
                {
                    this._sdkSystem = new PinGuH5SdkSystem();
                }
                else if (PlatformData.EnumPlatformType.jing_hong == PlatformData.platformType)
                {
                    this._sdkSystem = new JingHongH5SdkSystem();
                }
                else if (PlatformData.EnumPlatformType.xun_lu == PlatformData.platformType)
                {
                    this._sdkSystem = new XunLuH5SdkSystem();
                }
                else if (PlatformData.EnumPlatformType.cx_h5 == PlatformData.platformType)
                {
                    this._sdkSystem = new CxH5SdkSystem();
                }
                else
                {
                    logD("！！！！！未匹配到sdk, PlatformData.platformType:" + PlatformData.platformType)
                    this._sdkSystem = new NoSdkSystem();
                }
                return;
            }
            let conchConfig = window["conchConfig"];
            var os = conchConfig.getOS();

            if (os == "Conch-ios")
            {
                this.bridge = window["PlatformClass"].createClass("JSBridge");//创建脚步代理
                this.bridgeExStr = ":";
            }
            else if (os == "Conch-android")
            {
                //需要完整的类路径，注意与iOS的不同
                this.bridge = window["PlatformClass"].createClass("demo.JSBridge");//创建脚步代理
                this.bridgeExStr = "";
            }
            switch (PlatformData.platformType)
            {
                case PlatformData.EnumPlatformType.u8:
                    this._sdkSystem = new U8SdkSystem();
                    break
                default:
                    logI("PlatformData.EnumPlatformType.Q1SdkSystem:")
                    this._sdkSystem = new Q1SdkSystem();
                    break
            }
        }

        public get isSdkLoginIng(): boolean
        {
            return this._sdkSystem.isSdkLoginIng;
        }

        public get isGameLogining(): boolean
        {
            return this._isGameLogining;
        }

        public get isLogin(): boolean
        {
            return this.isSdkLoginIng || this.isGameLogining;
        }

        public sdkLoginFail()
        {
            this._isGameLogining = false;
        }

        get sdkSystem(): Pro.BaseSdkSystem
        {
            return this._sdkSystem;
        }

        /**
         * 调用app接口
         * @param callName 调用方法名， 对应JSBridge.java内的接口方法
         * @param args 参数列表
         */
        private callConchBridge(callName: string, ...args): any
        {
            //不带参数
            if (!args || args.length == 0)
            {
                return this.bridge.call(callName);
            } else
            {
                //ios需要特殊参数和传参方式
                if (this.bridgeExStr.length > 0)
                {
                    return this.bridge.call(callName + this.bridgeExStr, args);
                }
                else
                {
                    return this.bridge.call(callName, ...args);
                }
            }
        }

        /** 隐藏sdk的splash */
        public onHideSplash()
        {
            if (Laya.Browser.window.control == null && !conch) { return; }
            if (conch)
            {
                this.callConchBridge("hideSplash");
                return;
            }
        }
        /** 显示sdk的splash */
        public onShowSplash()
        {
            if (Laya.Browser.window.control == null && !conch) { return; }
            if (conch) { this.callConchBridge("showSplash"); }
        }


        /** 游戏崩馈， 通知app弹窗并刷新游戏 */
        public onCrash(errorStack: string): void
        {
            MinConsoleMgr.log(errorStack);
            //调用conch提供的弹窗（需要更新）
            // //由于alert在apk环境下，无法锁定主线程，并且无法提供点击“确定”后再处理。所以单独在apk下增加此方法， 需要更新apk才生效。
            // if (PlatformData.platVarAppVersion > 0 && this.bridge)
            // {
            //     logE(`errstack1:${errorStack}`);
            //     //能锁定主线程的alert与不能锁定的提示文字不一样
            //     let msg = Global.getLangStr("crashTips");
            //     //如果是测试环境， 把打印信息再额外添加一些，反正是自己看的。
            //     if (GlobalData.testServerTag) { msg += "\n\n测试服额外打印：\n" + errorStack; }
            //     this.callConchBridge("onGameCrashCall", msg);
            // } else
            // {

            //能锁定主线程的alert与不能锁定的提示文字不一样(只有旧版本的apk环境不能锁)
            var msg = this.bridge ? Global.getLangStr("crashTips2") : Global.getLangStr("crashTips");
            //如果是测试环境， 把打印信息再额外添加一些，反正是自己看的。
            if (GlobalData.testServerTag)
            {
                msg += "\n\n测试服额外打印：\n" + errorStack;
            }
            // eslint-disable-next-line no-alert
            if (!SystemUtils.isIos())
            {
                //IOS 当前最高版本不支持，使用时 会报异常
                alert(msg);
            }
            setTimeout(() =>
            {
                this.reloadClient();
            }, 1000);
            // }
        }

        /** 刷新游戏 */
        public reloadClient(): void
        {
            //把防沉迷信息显示重新拉起来(避免重启时会有一小段黑屏)
            this.onShowSplash();
            Laya.stage.renderingEnabled = false;
            Laya.timer.scale = 0;
            Laya.updateTimer.pause();
            this.sdkSystem.logout('reloadClient');
            window.location.reload(true);
        }

        //========================================================================================
        /** 调用SDK登陆 */
        public callSdkLogin(callback: Function, target: any)
        {
            this.loginCall.callback = callback;
            this.loginCall.target = target;
            if (window["getRequest"] != null)
            {
                this.requestGMLogin();
            } else
            {
                if (this.sdkSystem)
                {
                    this.sdkSystem.sdkLogin();
                } else
                {
                    logE("sdkSystem 为空")
                }
            }
        }

        public callGameLogin(parmArr: string[], parmObj)
        {
            this._isGameLogining = true;
            let url = "";
            for (let index = 0; index < parmArr.length; index++)
            {
                const parmName = parmArr[index];
                var value = parmObj[parmName];
                url += `&${ parmName }=${ value }`;
            }
            HttpServer.login(url);
        }


        /** 调用SDK登出 */
        public onSdkLogOut()
        {
            // 登出SDK
            this.sdkSystem.logout('onSdkLogOut');
            //没有SDK可调，就直接游戏内登出即可。
            this.gameLogOut();
        }


        /** 重新登录游戏 */
        public gameLogOut()
        {
            this.server_token = null;
            //没有SDK可调，就直接游戏内登出即可。
            LoginServerMgr.logOut();
            if (GlobalData.MInScene != GlobalData.StandScene.Login)
            {
                EventMgr.trigger(EventNotify.Scene_BACK_MAINUI, "BackLogin");
            }
            else
            {
                EventMgr.trigger(EventNotify.LoginFail);
            }
        }

        /** 调用SDK绑定手机 */
        public onBindPhone()
        {
            if (Laya.Browser.window.control == null && !conch) { return; }
            if (conch)
            {
                this.callConchBridge("onBindPhone");
                return;
            }
            Laya.Browser.window.control.onBindPhone();
        }

        /** 调用SDK退出游戏 */
        public onExitGame()
        {
            if (window["__ExitGameFunc__"])
            {
                window["__ExitGameFunc__"]();
                return;
            }
            if (Laya.Browser.window.control == null && !conch) { return; }
            if (conch)
            {
                this.callConchBridge("onExitGame");
                return;
            }
            Laya.Browser.window.control.onExitGame();
        }
        public onPayGameNew(value: Pb_God.PBChargeData)
        {
            if (value.orderno == "" || value.orderno == null)
            {
                AlertShow.showSimpleAlert("充值订单信息异常，请联系客服，或稍后重试!2")
                var logMsg: string = "充值异常2，------> messContent: " + JSON.stringify(value);
                GameLaunch.PostClientLog(logMsg)
                return;
            }
            this.sdkSystem.setChargeData(value);
            this.sdkSystem.trackPayBegin(value);
            this.sdkSystem.payNew(value,
                () =>
                {
                    WaitPanelUtils.hideWaitPanel();
                }, this);
        }

        /**
         * 调用SDK上报游戏
         * @param dataType
         * @param serverId      服务器id
         * @param serverName    服务器名称
         * @param roleId        角色id
         * @param roleName      角色名称
         * @param roleLv        角色等级
         * @param rolePower     角色战斗力
         * @param roleVipLv     角色vip等级
         * @param unionName     公会名称，没有填“”
         * @param balance       货币剩余数
         * @param roleCtime     创角时间
         * @param roleStime     数据变更时间
         * */
        private onReportGame(dataType: GameDataType, serverId: string, serverName: string,
            roleId: string, roleName: string, roleLv: number, rolePower: number,
            roleVipLv: string, unionName: string, balance: number, roleCtime: string, roleStime: string)
        {
            if (Laya.Browser.window.control == null && !conch) { return; }
            if (conch)
            {
                this.callConchBridge("onReportGame", dataType, serverId, serverName, roleId, roleName, roleLv, rolePower, roleVipLv, unionName, balance, roleCtime, roleStime);
                return;
            }
            Laya.Browser.window.control.onReportGame(dataType, serverId, serverName, roleId, roleName, roleLv, rolePower, roleVipLv, unionName, balance, roleCtime, roleStime);
        }

        /** 调用SDK输出到手机log中 */
        public onLogDevInfo(msg: string)
        {
            if (Laya.Browser.window.control == null && !conch)
            {
                return;
            }
            if (conch)
            {
                this.callConchBridge("onLogDevInfo", msg);
                return;
            }
            Laya.Browser.window.control.onLogDevInfo(msg);
        }


        /** 37平台调用SDK上报游戏数据 */
        public report37SDKData(dataType: GameDataType)
        {
            //只有37上有用
            if (Laya.Browser.window.control == null && !conch)
            {
                return;
            }
            this.onReportGame(dataType, "" + PlayerDataMgr.logicworldid, "S" + PlayerDataMgr.logicworldid,
                "" + PlayerDataMgr.uid, PlayerDataMgr.name, PlayerDataMgr.level, PlayerDataMgr.fightPower, "" + PrivilegeDataMgr.vipLevel,
                FactionDataMgr.getFactionName(), PlayerDataMgr.getExpendNum(CfgID.ItemID.Diamond),
                "" + PlayerDataMgr.createTime, "" + TimeController.currTimer / 1000);
        }

        /** h5平台调用sdk上报游戏数据
         *  0=创角，1=登录，2=升级 , 3=选服
         */
        public reportH5SDKData(dataType: UploadSceneValue): void
        {
            this.sdkSystem.reportH5SDKData(dataType)

        }


        //------------------------------------与java层返回管理-----------------------------
        /** 平台uid */
        public platform_puid: string;

        /** 用户uid */
        public platform_uid: string;

        /** 登陆token */
        public platform_token: string;

        /** 用户名称 */
        public platform_uname: string;

        /** 渠道标识(PlatformId 如37h5) */
        public platform_appid: string;

        /** AppId（如53） */
        public platform_gameId: string;

        /** 所属的子游戏ID（ChildGameId） */
        public platform_cGameId: string;



        /** 平台是否绑定身份证 */
        public platform_isIdCardBind: number = 0;

        /** 平台成人标志 */
        public platform_isAdult: number = 0;


        /** 平台token */
        public server_token: string;
        public serverTokenObj: Object;

        //-------------------------------登陆到游戏平台----------------------------------

        /**
         * GM登录
         */
        public requestGMLogin(): void
        {
            if (PlatformData.getParamString("sign") && PlatformData.getParamString("sign") != "")
            {
                var uid = PlatformData.getParamString("uid");
                var platformid = PlatformData.getParamString("platformid");
                var plat_name = PlatformData.getParamString("plat_name");
                var time = PlatformData.getParamString("time");
                var sign = PlatformData.getParamString("sign");
                HttpServer.loginByGm(uid, platformid, plat_name, time, sign);
            }
        }


        onHttpLogin(state: number, data)
        {
            this.onLoginLoadCallBack(state, data);
        }

        /** 向我们的中心服发起平台账号的登陆 */
        private onRequestPlatform()
        {
            this.callSdkLogin(this.loginCall.callback, this.loginCall.target)
        }

        private onLoginLoadCallBack(state: number, data: any)
        {
            this._isGameLogining = false;
            logD("++++++++++++++++++++++++ sdk登录 返回----------------------------");
            MinConsoleMgr.log("++++++++++++++++++++++++ sdk登录 返回----------------------------");
            MinConsoleMgr.log("login data", JSON.stringify(data));
            logD("login state：" + state + "---");
            logD("login data" + JSON.stringify(data) + "---");
            WaitPanelUtils.hideWaitPanel();
            if (state == 0)
            {
                this.newLoginParse(data);
            }
            else
            {
                MinConsoleMgr.log("login error state=" + state);
                this.onLoginLoadFail();
            }
        }

        newLoginParse(data)
        {
            var code = data["code"];
            if (code == 0)
            {
                this.server_token = data["data"];
                if (this._sdkSystem)
                {
                    this._sdkSystem.onHttpLogin(data);
                }
                if (this.loginCall.callback)
                {
                    this.loginCall.callback.call(this.loginCall.target, true);
                }
            } else
            {
                this.onLoginLoadFail(code, data["msg"]);
            }
        }

        private onLoginLoadFail(code: number = 0, msg: string = "")
        {
            if (this.loginCall.callback)
            {
                this.loginCall.callback.call(this.loginCall.target, false);
            }
            var msgStr = "";
            if (code != 0)
            {
                msgStr = "  " + msg + "->" + code;
            }
            AlertShow.showConfirmAlert_Two(Global.getLangStr("platform_loginErrorTips") + msgStr, this,
                () =>
                {
                    this.onRequestPlatform();
                },
                () =>
                {
                    this.onSdkLogOut();
                }
            );
        }

        //-------------------------------支付订单生成----------------------------------
    }

    export var SdkMgr = new SdkManager();
}

var ThirdMgr = Pro.SdkMgr;

