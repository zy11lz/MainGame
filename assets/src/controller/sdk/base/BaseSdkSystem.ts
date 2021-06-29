/* eslint-disable no-console */

var jwtDecode = window['jwt_decode'];
module Pro
{

    export abstract class BaseSdkSystem extends NativeBaseSystem
    {


        // 平台使用账号ID
        protected userId: string;
        protected sdkUserId: string;
        private session: string;
        protected lastTime: number = 0;
        // protected loginCallback: Function;
        // protected loginTarget: any;
        protected payCallback: Function;
        protected payTarget: any;

        /**
         * 当前充值的订单信息
         */
        protected _currentChargeData: Pb_God.PBChargeData;

        //{"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name":"147915576","UUID":"EBC2F5C5-D831-4C3A-B527-3A07C1174F81","GameId":"2122","UserId":"147915576","UserName":"yxsqqww1","IsPassWord":"true","IsBindMobile":"true","RealNameStatus":"0","NoneKid":"0","IsVisitor":"false","IsNewUser":"false","Pid":"2122011","Pwdcode":"1428215361","nbf":1612838561,"exp":1612860161,"iss":"q1.com","aud":"Everyone"}
        protected sessionData: any;


        protected _isSdkLoginIng: boolean;
        public get isSdkLoginIng(): boolean
        {
            return this._isSdkLoginIng;
        }
        /**
         * 获取平台使用账号ID
         */
        public getUserId(): string
        {
            return this.userId;
        }
        public onHttpLogin(data: Object)
        {
            this.trackUserLogin();
        }
        setChargeData(value: Pb_God.PBChargeData)
        {
            this._currentChargeData = value;
        }

        /**
         * Native层返回的信息
         * @param eventID
         * @param json
         */
        protected onMessage(eventID: number, json: {})
        {
            switch (eventID)
            {
                // 登录回调
                case 0:
                    this.onSdkLoginBack(json as any);
                    break;
                // 支付回调
                case 1:
                    this.onPay(json);
                    break;
                case 2:
                    // this.onPayBegin(json);
                    break
                // 绑定身份证
                case 4:
                    //实名认证成功 (1已成年 2未成年)
                    //let auth: number = json["result"];
                    //AntiAddictionSystem.Instance.showMessageBox("感谢您实名验证通过，请重连游戏解锁防沉迷限制。");
                    break;
                // 绑定身份证
                case 5:
                    //注销
                    ThirdMgr.gameLogOut();
                    break;
                case 10:
                    this.getUserInfo(json);
                    break
                default:
                    break;
            }
        }

        /**
         * 登录回调
         * @param json
         */
        protected onSdkLoginBack(json: { session: string, userId: string, error: string, userName: string })
        {
            this._isSdkLoginIng = false;
            var session = json.session
            try
            {
                if (jwtDecode)
                {
                    this.sessionData = jwtDecode(session);
                }
            }
            catch (e)
            {
                logE("session parse error:" + session)
            }
            var error = json.error
            if (error != '')
            {
                logE("登陆失败: error=" + error);
                // 在 SDK 登录失败时上报
                this.trackSdkLoginError(error);
                return;
            }
            this.userId = json.userId;
            this.sdkUserId = json.userName;//渠道返回的,格式示例：1234567.fq

            // 在 SDK 登录成功时上报：
            if (this.userId)
            {
                this.trackSdkLogin();
                Laya.LocalStorage.setItem(EnumLocalStorageKey.USER_ID, this.userId + "");
            }
            this.requestLoginServe(session, this.userId);
        }

        /**
         * 从平台认证服务器获取平台用户信息
         * @param session
         */
        protected abstract requestLoginServe(session: string, userId: string)

        protected phpLogin(parmArr: string[], parmObj: Object)
        {
            ThirdMgr.callGameLogin(parmArr, parmObj);
        }

        /**
         * 重新登陆
         */
        public reLogin()
        {
            this.logout('reLogin');
            logI("reLogin=======")
            this.sdkLogin();
        }


        /**
         * 请求登录
         * @param callback
         * @param target
         */
        public sdkLogin()
        {
            if (Date.now() - this.lastTime < 2000)
            {
                this.lastTime = Date.now();
                return;
            }
            if (this.isSdkLoginIng || StringUtils.isNotEmpty(ThirdMgr.server_token))
            {
                logD(`this.isSdkLoginIng:${ this.isSdkLoginIng }  ThirdMgr.login_uname:${ ThirdMgr.server_token }`)
                return;
            }
            if (!PlatformData.isQ1sdk())
            {
                //Q1的sdk登录时可能不会回调，不标记（比如https://www.tapd.cn/45518777/bugtrace/bugs/view?bug_id=1145518777001067003）
                this._isSdkLoginIng = true;
            }
            logD("=====================开始sdk登录----------------------------");
            // this.loginCallback = callback;
            // this.loginTarget = target;
            this.lastTime = Date.now();
            this.doSdkLogin();
        }

        protected abstract doSdkLogin(): void;

        /**
         * 登出
         */
        public logout(where: string)
        {
            logI(`logout:${ where }`)
            ThirdMgr.server_token = null;//发起登出，就设置为空，要不然切换账号时（部分SDK登出是异步的），这个标记不为空，不能进入登录,见 public login(callback: Function, target: any)
            this.sendNative(PlatformMsgValue.LOGOUT);
        }

        /**
         * 打开实名验证
         * @param closable
         */
        public idAuth(closable: boolean)
        {
            this.sendNative(PlatformMsgValue.REAL_NAME, { "closable": closable });
        }

        /**
         * 是否第一次登陆
         */
        public isFirstLogin(): boolean
        {
            return Laya.LocalStorage.getItem(EnumLocalStorageKey.USER_ID) == null;
        }
        protected getPayUserId():string
        {
            return this.userId;
        }
        public payNew(
            value: Pb_God.PBChargeData,
            callback: Function = null,
            target: any = null)
        {
            let chargeInfo = cfg.ChargeCfgData.getInfo(value.productid);
            let appleId = this.getChargeId(chargeInfo);


            let roleName: string = PlayerDataMgr.name;
            let roleLevel: number = PlayerDataMgr.level;


            // 开始支付
            this.payCallback = callback;
            this.payTarget = target;
            let serverName: string = ServerListDataMgr.getServerName();
            if (!serverName)
            {
                serverName = "s." + value.sid;
            }



            this.sendNative(PlatformMsgValue.PAY, {
                "serverId": value.sid,
                "serverName": serverName,
                "roleId": "" + value.actorid,
                "userId": this.getPayUserId(),
                "money": value.money,
                "item": value.orderitem,
                "orderNo": value.orderno,
                "currencyType": value.currencytype,
                "orderSign": value.ordersign,
                "cpExt": value.productid + "",
                "roleName": roleName,
                "roleLevel": roleLevel,
                "userdata": chargeInfo.iD,
                "desc": chargeInfo.desc,
                "appleId": appleId,
                "productName": chargeInfo.name,
                "vip": PrivilegeDataMgr.vipLevel

            });
        }

        /**
         * 支付回调
         * @param json
         */
        protected onPay(json: {})
        {
            if (json && json["code"] == CommResultCode.RESULT_OK)
            {
                this.trackPayEnd(this._currentChargeData);
                if (this._currentChargeData.money)
                {
                    let money = parseInt(this._currentChargeData.money);
                    this.setPurchase(money);
                }
            } else if (json && json["code"] == CommResultCode.RESULT_FREE_CANCEL)
            {
                this.trackPayCancel(this._currentChargeData);
            } else
            {
                let error: string = "unknown";
                if (json && json["error"])
                {
                    error = json["error"];
                }
                this.trackPayError(this._currentChargeData, error);
            }
            // logI(JSON.stringify(json));
            if (this.payCallback)
            {
                this.payCallback.call(this.payTarget, json);
            }
        }

        protected getUploadUserId()
        {
            return this.userId;
        }
        /******************************    数据上报   ***********************************/

        /**
         * 【数据上报】公共入口
         * @param funcname 函数名
         * @param data
         */
        protected track(funcname: string, data: {} = {})
        {
            data["funcname"] = funcname;

            // *  @param action            事件类型
            // *  @param serverId          服务器id
            // *  @param actorId           角色ID
            // *  @param actorName         角色名称
            // *  @param actorLevel        角色等级
            // *  @param user              用户名或userid(通过session从服务器取)
            // *  @param msg               如：skin=red;eye=cockeye(根据需求定义)


            data["serverId"] = data["serverId"] || PlayerDataMgr.logicworldid;
            data["roleName"] = data["roleName"] || PlayerDataMgr.name;
            data["roleId"] = String(PlayerDataMgr.uid);
            data["roleLevel"] = PlayerDataMgr.level;
            data["userId"] = this.getUploadUserId();
            logD("track--:" + JSON.stringify(data));
            this.sendNative(PlatformMsgValue.TRACK, data);
        }

        /**
         * 【数据上报】开始更新
         */
        public trackUpdateBegin()
        {
            this.track("trackUpdateBegin");
        }

        /**
         * 【数据上报】开始更新
         */
        public trackUpdateEnd()
        {
            this.track("trackUpdateEnd");
        }

        /**
         * 【数据上报】更新失败
         * @param error
         */
        public trackUpdateError(error: string)
        {
            this.track("trackUpdateError", { "error": error });
        }

        /**
         * 【数据上报】SDK登录成功
         * @param userId
         */
        public trackSdkLogin()
        {
            this.track("trackSdkLogin");
        }

        /**
         * 【数据上报】SDK登录失败
         * @param error
         */
        public trackSdkLoginError(error: string)
        {
            this.track("trackSdkLoginError", { "error": error });
        }

        /**
         * 【数据上报】用户校验 session 成功
         * @param userId
         */
        public trackUserLogin()
        {
            this.track("trackUserLogin");
        }

        /**
         * 【数据上报】用户校验 session 成功
         * @param userId
         * @param error
         */
        public trackUserLoginError(error: string)
        {
            this.track("trackUserLoginError", { "error": error });
        }

        /**
         * 【数据上报】选择服务器事件
         *
         * @param serverId 服务器大区id
         * @param userId   用户id
         */
        public trackSelectServer(serverId: number)
        {
            this.track("trackSelectServer", { "serverId": serverId });
        }

        /**
         * 【数据上报】创建角色事件
         *
         * @param serverId  服务器id
         * @param userId    用户id
         * @param roleId    角色id
         * @param roleName  角色名
         * @param roleLevel 角色等级
         */
        public trackCreateRole(roleName: string)
        {
            this.track("trackCreateRole", { "roleName": roleName });
        }

        /**
         * 【数据上报】角色登录成功
         *
         * @param serverId  服务器id
         * @param userId    用户id
         * @param roleId    角色id
         * @param roleName  角色名
         * @param roleLevel 角色等级
         */
        public trackRoleLogin(roleName: string)
        {
            this.track("trackRoleLogin", { "roleName": roleName });
        }

        /**
         * 【数据上报】角色登录失败
         *
         * @param serverId  服务器id
         * @param userId    用户id
         * @param roleId    角色id
         * @param roleName  角色名
         * @param roleLevel 角色等级
         * @param error     登录失败原因
         */
        public trackRoleLoginError(error: string)
        {
            this.track("trackRoleLoginError", { "error": error });
        }

        /**
         * 【数据上报】角色升级事件
         *
         * @param serverId  服务器id
         * @param userId    用户id
         * @param roleId    角色id
         * @param roleName  角色名
         * @param roleLevel 角色等级
         */
        public trackLevelUp()
        {
            this.track("trackLevelUp", {});
        }

        /**
         * 【数据上报】购买下单事件上报
         *
         * @param serverId     服务器id
         * @param userId       用户id
         * @param money        支付金额
         * @param roleId       角色id
         * @param roleName     角色名
         * @param roleLevel    角色等级
         * @param orderNo      订单号，游戏服务器下发
         * @param orderItem    订单项，服务下发
         * @param orderSign    订单签名，服务器下发
         * @param currencyType 货币类型，国内传 "CNY"
         */
        public trackPayBegin(value: Pb_God.PBChargeData)
        {

            // this.track("trackPayBegin", {
            //     "serverId": serverId,
            //     "userId": userId,
            //     "money": money,
            //     "roleId": roleId,
            //     "roleName": roleName,
            //     "roleLevel": roleLevel,
            //     "orderNo": orderNo,
            //     "orderItem": orderItem,
            //     "orderSign": orderSign,
            //     "currencyType": currencyType
            // });
        }

        /**
         * 【数据上报】支付成功
         *
         * @param serverId     服务器id
         * @param userId       用户id
         * @param money        支付金额
         * @param roleId       角色id
         * @param roleName     角色名
         * @param roleLevel    角色等级
         * @param orderNo      订单号，游戏服务器下发
         * @param orderItem    订单项，服务下发
         * @param orderSign    订单签名，服务器下发
         * @param currencyType 货币类型，国内传 "CNY"
         */
        public trackPayEnd(value: Pb_God.PBChargeData)
        {
            // this.track("trackPayEnd", {
            //     "serverId": serverId,
            //     "userId": userId,
            //     "money": money,
            //     "roleId": roleId,
            //     "roleName": roleName,
            //     "roleLevel": roleLevel,
            //     "orderNo": orderNo,
            //     "orderItem": orderItem,
            //     "orderSign": orderSign,
            //     "currencyType": currencyType
            // });
        }

        /**
         * 【数据上报】取消支付
         *
         * @param serverId     服务器id
         * @param userId       用户id
         * @param money        支付金额
         * @param roleId       角色id
         * @param roleName     角色名
         * @param roleLevel    角色等级
         * @param orderNo      订单号，游戏服务器下发
         * @param orderItem    订单项，服务下发
         * @param orderSign    订单签名，服务器下发
         * @param currencyType 货币类型，国内传 "CNY"
         */
        public trackPayCancel(value: Pb_God.PBChargeData)
        {
            // this.track("trackPayCancel", {
            //     "serverId": serverId,
            //     "userId": userId,
            //     "money": money,
            //     "roleId": roleId,
            //     "roleName": roleName,
            //     "roleLevel": roleLevel,
            //     "orderNo": orderNo,
            //     "orderItem": orderItem,
            //     "orderSign": orderSign,
            //     "currencyType": currencyType
            // });
        }

        /**
         * 【数据上报】支付失败
         *
         * @param serverId     服务器id
         * @param userId       用户id
         * @param money        支付金额
         * @param roleId       角色id
         * @param roleName     角色名
         * @param roleLevel    角色等级
         * @param orderNo      订单号，游戏服务器下发
         * @param orderItem    订单项，服务下发
         * @param orderSign    订单签名，服务器下发
         * @param currencyType 货币类型，国内传 "CNY"
         */
        public trackPayError(value: Pb_God.PBChargeData, error: string)
        {
            // this.track("trackPayError", {
            //     "serverId": serverId,
            //     "userId": userId,
            //     "money": money,
            //     "roleId": roleId,
            //     "roleName": roleName,
            //     "roleLevel": roleLevel,
            //     "orderNo": orderNo,
            //     "orderItem": orderItem,
            //     "orderSign": orderSign,
            //     "currencyType": currencyType
            // });
        }


        /**
         * 自定义启动事件上报
         *
         * @param action    事件名，如：taskBegin
         * @param msg       额外信息，格式：key=value，没有时传空字符或者 null
         */
        public trackStartEvent(action: String, msg: String)
        {
            this.track("trackStartEvent", {
                "action": action,
                "msg": msg,
            });
        }

        /**
         * 自定义用户事件上报
         *
         * @param serverId     服务器id
         * @param userId       用户id
         * @param roleId       角色id
         * @param roleName     角色名
         * @param roleLevel    角色等级
         * @param action       事件名
         * @param msg          额外附加信息，格式同上
         */
        public trackUserEvent(serverId: number, userId: string, roleId: string,
            roleName: string, roleLevel: number,
            action: string, msg: string)
        {
            this.track("trackUserEvent", {
                "serverId": serverId,
                "userId": userId,
                "roleId": roleId,
                "roleName": roleName,
                "roleLevel": roleLevel,
                "action": action,
                "msg": msg
            });
        }

        /**
         * 自定义用户事件上报
         *
         * @param action       事件名
         * @param msg          额外附加信息，格式同上
         */
        public trackUserEventEx(action: string, msg: string)
        {
            let roleName: string = PlayerDataMgr.name;
            let roleLevel: number = PlayerDataMgr.level;
            let roleId: string = String(PlayerDataMgr.uid);
            this.trackUserEvent(ServerListDataMgr.logicworldid, this.userId, roleId, roleName, roleLevel, action, msg);
        }

        /**
         * 游戏需要在支付成功处，调用头条的支付上报
         * @param money
         */
        public setPurchase(money: number)
        {
            this.track("setPurchase", {
                "money": money,
            });
        }

        abstract reportH5SDKData(dataType: UploadSceneValue);
        public trackCustomEvent(type: CustomEventType, extData: Object = {})
        {

        }
        protected getUserInfo(json: {})
        {

        }
        public showLog(str: string)
        {
            this.sendNative(PlatformMsgValue.IOS_SHOW_LOG, { "log": str })
        }
        getChargeId(chargeInfo: cfg.ChargeCfgInfo): string
        {
            if (SystemUtils.isIos())
            {
                return chargeInfo.appid;
            }
            return chargeInfo.iD + "";
        }
        public exitApp()
        {

        }
    }
}