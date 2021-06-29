/* eslint-disable no-console */

/**
 *  寰宇H5
 */
module Pro
{

    export class XunLuH5SdkSystem extends BaseWebSdkSystem
    {
        private _timeStamp: string;
        constructor()
        {
            super();
        }



        /**
         * 唯一标识
         */
        public getTag(): string
        {
            return "XunLuH5SdkSystem.user";
        }

        /**
         * ovrride
         */
        protected doSdkLogin()
        {

            //登录回调
            XLGame.loginCallback = (msg: string) =>
            {
                var obj = JSON.parse(msg);
                if (obj.code == "21")
                {
                    // // 登录失败:
                    // { "code": "21", "data": { "status": "-1", "msg": "login fail" } }
                    // // 登录取消:
                    // { "code": "21", "data": { "status": "0", "msg": "login canle" } }
                    // // 登录成功:
                    // { "code": "21", "data": { "status": "1", "uid": "1234", "timeStamp": "1492321212", "sign": "jdsjdk232312", "msg    ": "login success" } }
                    if (obj.data.status == '1')
                    {
                        console.log(msg);
                        this._timeStamp = obj.data.timeStamp;
                        this.onSdkLoginBack({ session: obj.data.sign, userId: obj.data.uid, error: "", userName: "" })
                    } else
                    {
                        this._isSdkLoginIng = false;
                        ThirdMgr.sdkLoginFail();
                        logE("登录失败" + msg);
                    }
                }
            }
            XLGame.login();
        }


        /**
         * 从平台认证服务器获取平台用户信息
         * @param session
         */
        protected requestLoginServe(session: string, userId: string)
        {
            var parmArr: string[] = ["uid", "timestamp", "sign"];
            this.phpLogin(parmArr, { uid: userId, timestamp: this._timeStamp, sign: session });
        }

        payNew(value: Pb_God.PBChargeData, callback: Function = null, target: any = null)
        {
            let chargeInfo = cfg.ChargeCfgData.getInfo(value.productid);
            let serverInfo = ServerListDataMgr.getLoginHostInfo();

            // 开始支付
            this.payCallback = callback;
            this.payTarget = target;
            let payData: XLGame.PayInfo = {
                serverId: parseInt(serverInfo.real),//服务器id
                serverName: serverInfo.show,//服务器名称
                roleId: PlayerDataMgr.uid.toString(),//角色id
                roleName: PlayerDataMgr.nickName,//角色名称
                roleLevel: PlayerDataMgr.level.toString(),//角色等级
                outOrderid: value.orderno,//cp支付订单id
                pext: "",//扩展字段",//扩展字段，服务端回调原样返回
                money: value.money.toString(), //"0.1",//充值金额
                productName: chargeInfo.name,
                productId: chargeInfo.iD.toString(),
            };
            XLGame.payCallback = (msg) =>
            {
                var obj = JSON.parse(msg);
                if (obj.code == "23")
                {

                    //充值成功:
                    // { "code": "23", "data": { "status": "1", "msg": "pay success" } }
                    // //充值失败:
                    // { "code": "23", "data": { "status": "-1", "msg": " pay fail" } }
                    // //充值取消:
                    // { "code": "23", "data": { "status": "0", "msg": " pay canle" } }
                    if (obj.data.status == '1')
                    {
                        logD("支付成功");
                    }
                    if (obj.data.status == '-1')
                    {
                        logD("支付取消");
                    }
                    else
                    {
                        logE("支付失败" + msg);
                    }
                }
            }
            logD(JSON.stringify(payData))
            XLGame.pay(payData)
        }

        reportH5SDKData(dataType: UploadSceneValue)
        {
            logI("reportH5SDKData");
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
            super.trackRoleLogin(roleName)
            this.report(1);
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
        public trackCreateRole()
        {
            super.trackCreateRole(PlayerDataMgr.name);
            this.report(2);
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
            super.trackLevelUp();
            this.report(4);
        }

        report(type: number)
        {
            let serverInfo = ServerListDataMgr.getLoginHostInfo();
            let data: XLGame.ReportInfo = {
                type: type,  //1:登录动作，2:创建角色 4:角色升级
                gameAccountId: PlayerDataMgr.uid.toString(),// "账号UID";
                serverId: serverInfo.real.toString(),
                serverName: serverInfo.real,//"服务器名称";
                roleId: PlayerDataMgr.uid.toString(),//"角色id";
                roleName: PlayerDataMgr.nickName,// "角色名称";
                level: PlayerDataMgr.level.toString(),// "玩家等级";
                rolePower: PlayerDataMgr.fightPower.toString(),// "玩家战力值";
                vipLevel: PrivilegeDataMgr.vipLevel.toString(),// "玩家Vip等级";
                region: "0", //写死0
                extend1: "", //扩展参数1
                extend2: "", //扩展参数2
            };
            XLGame.pushData(data);
        }
    }
}
