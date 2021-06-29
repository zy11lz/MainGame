var jwtDecode = window['jwt_decode'];
module Pro
{

    export enum CommResultCode
    {
        RESULT_OK = 0,
        RESULT_FREE_CANCEL = 1001,
        RESULT_FREE_ERROR = 1002,
        RESULT_FREE_ORDER_SIGN_ERROR = 1003,
        RESULT_FREE_FINISH = 1004,
        RESULT_FREE_AUDIT = 1005,//支付审核中
        RESULT_REFUSE = 1,
        RESULT_REFUSE_FOREVER = 2,
        RESULT_REFUSE_CANCEL_PERMISSION = 3,
        RESULT_LOGIN_PASSWORD_ERROR = 10001
    }

    export class Q1SdkSystem extends BaseSdkSystem
    {


        trackUserLogin()
        {
            super.trackUserLogin();
        }

        /**
         * 唯一标识
         */
        public getTag(): string
        {
            return "q1sdk.user";
        }


        reportH5SDKData(dataType: UploadSceneValue)
        {
            if (!window["__REC_UP__"]) { return; }
            let postData: any = {
                userId: this.userId
            };
            postData.isNewRole = dataType == UploadSceneValue.CREATE_ROLE;
            postData.userRoleId = PlayerDataMgr.uid;
            postData.userRoleName = PlayerDataMgr.name;
            postData.userLevel = PlayerDataMgr.level;
            postData.serverId = PlayerDataMgr.logicworldid;
            postData.serverName = "S" + PlayerDataMgr.logicworldid;
            postData.vipLevel = PrivilegeDataMgr.vipLevel;
            postData.partyId = FactionDataMgr.getFactionId();
            postData.partyName = FactionDataMgr.getFactionName();
            postData.roleCreateTime = PlayerDataMgr.createTime;
            postData.roleUpdateTime = PlayerDataMgr.lastLoginTime; //更新时间
            postData.power = PlayerDataMgr.fightPower;
            postData.userRoleBalance = Global.getItemNum(CfgID.ItemID.Diamond);
            postData.userRoleGender = PlayerDataMgr.gender;


            window["__REC_UP__"](dataType, postData);
        }

        /**
        * 请求登录
        * @param callback
        * @param target
        */
        protected doSdkLogin()
        {
            this.sendNative(PlatformMsgValue.LOGIN);
        }


        /**
         * 从平台认证服务器获取平台用户信息
         * @param session
         */
        protected requestLoginServe(session: string, userId: string)
        {
            this.phpLogin(["session"], { "session": session });
        }

        trackRoleLogin(roleName: string)
        {

            super.trackRoleLogin(roleName);
            if (PlatformData.platVarAppVersion > 2)
            {
                return;
            }
            this.uploadEvent("login", "");
        }



        private uploadEvent(eventType: string, extInfo: string)
        {
            if (!SystemUtils.isIos())
            {
                return;
            }
            if (!this.sessionData)
            {
                return;
            }

            let loginTime: number = TimeController.currTimerSecond;
            let appKey = H5Environment.officialKey;
            let appid = this.sessionData['GameId'];
            let mac = "";
            let radid = "";
            let rsid = "";
            let uuid = this.sessionData['UUID'];
            let serverId = ServerListDataMgr.logicworldid;
            let md5Str = `${ appid }_${ mac }_${ uuid }_${ radid }_${ rsid }_${ loginTime }_${ serverId }_${ appKey }`;
            logI("md5Str:" + md5Str);
            logI("extInfo:" + extInfo);
            let sign = hex_md5(md5Str);


            let data = {
                APPID: appid,

                ServerID: serverId,
                ActorLevel: PlayerDataMgr.level,
                ActorName: PlayerDataMgr.name,
                ActorID: PlayerDataMgr.uid,

                User: this.sessionData['UserId'],
                PID: this.sessionData['Pid'],
                UUID: uuid,
                RADID: radid,
                RSID: rsid,
                MAC: mac,
                LoginTime: loginTime,
                ExtInfo: extInfo,
                sign: sign,
                Action: eventType

            }
            let url = "https://appdata.kairong5.com/api/AppLog/AddAppLoginLog";

            let header = ["Content-Type", "application/json"];
            new Public.HttpManager.Http().setHeader(header).setResponseType(Laya.Loader.JSON).postRequest(url, this, (statue, retData) =>
            {
                if (statue != 0)
                {
                    logW("httperror! trackSdkLogin");
                    return;
                }
                logI("UPLOAD SUCCESS " + JSON.stringify(retData))

            }, data);


        }
        trackCreateRole(roleName: string)
        {

            super.trackCreateRole(roleName);
            if (PlatformData.platVarAppVersion > 2)
            {
                return;
            }
            this.uploadEvent("create", "")
        }

        showLog(str: string)
        {
            super.showLog(str);
            // str = "https://mpay.kairong5.com/?UserID=147915576&money=6&GameID=2122&serverid=1038&OrderItem=10506%2A600%2A1%2A%E5%BF%85%E4%B9%B0%E6%88%90%E9%95%BF%E7%A4%BC%E5%8C%85%2A&OrderNO=109784&OrderSign=642b874708c497db730ad003fdb2a086&uuid=&pid=1038&os=&gamename=&actorid=49066&developerPayload=10506"
            if (SystemUtils.isIos())
            {
                if (this.sessionData)
                {
                    let url = str.substring(0, str.indexOf("?"))
                    let obj = PlatformData.urlToObj(str);
                    let json = {
                        "currencyType": "",
                        "productId": obj['developerPayload'],
                        "orderItem": decodeURI(obj["OrderItem"]),
                        "orderSign": obj['OrderSign'],
                        "message": "请求URL充值下单",
                        "orderUrl": url,
                        "money": obj['money'],
                        "sdkOrderID": "",
                        "bankCode": "",
                        "orderNo": obj['OrderNO'],
                        "code": "",
                        "actorid": obj['actorid'],
                        "pid": PlatformData.pid,
                        "sdkver": GlobalData.Version
                    };

                    this.uploadEvent("payBegin", JSON.stringify(json));

                }
            }
        }
    }


}