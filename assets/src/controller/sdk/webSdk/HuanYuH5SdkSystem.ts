/* eslint-disable no-console */

/**
 *  寰宇H5
 */
module Pro
{

    export class HuanYuH5SdkSystem extends BaseWebSdkSystem
    {
        constructor()
        {
            super();
            JYProxySDK.onInit({ gameName: "高级驯兽师", gameVersion: "1.0" }, (state) =>
            {
                if (state === 1)
                {
                    logD("初始化成功");
                } else
                {
                    logE("初始化失败");
                }
            });
        }



        /**
         * 唯一标识
         */
        public getTag(): string
        {
            return "HuanYuH5SdkSystem.user";
        }

        /**
         * ovrride
         */
        protected doSdkLogin()
        {
            JYProxySDK.onLogin((state, data) =>
            {
                if (state === 1)
                {
                    this.onSdkLoginBack({ session: data.token, userId: data.userId, error: "", userName: "" })
                } else
                {
                    this._isSdkLoginIng = false;
                    ThirdMgr.sdkLoginFail();
                    logE("登录失败" + JSON.stringify(data));
                    // alert("登录失败");
                }
            });
        }


        /**
         * 从平台认证服务器获取平台用户信息
         * @param session
         */
        protected requestLoginServe(session: string, userId: string)
        {
            var parmArr: string[] = ["token", "userId"];
            this.phpLogin(parmArr, { token: session, userId: userId });
        }

        payNew(value: Pb_God.PBChargeData, callback: Function = null, target: any = null)
        {
            let chargeInfo = cfg.ChargeCfgData.getInfo(value.productid);
            let serverInfo = ServerListDataMgr.getLoginHostInfo();

            // 开始支付
            this.payCallback = callback;
            this.payTarget = target;
            var info: JYProxySDK.PayInfo = {} as any;
            // 苹果产品id（跟productid一样） 可选 String
            // info.appleProductId ? = "";
            // 研发的订单号 是 String
            info.cpBill = value.orderno;
            // 金额, 单位为(分) 是 Number
            info.price = Number(value.money) * 100;
            // 产品描述 是 String
            info.productDesc = chargeInfo.desc;
            // 产品id 是 String
            info.productId = value.productid.toString();
            // 产品名称 是 String
            info.productName = chargeInfo.name
            // /角色id 是 String
            info.roleId = PlayerDataMgr.uid.toString();
            // 角色名称 是 String
            info.roleName = PlayerDataMgr.name;
            // 角色等级 是 Number
            info.roleLevel = PlayerDataMgr.level.toString();
            // 区服id 是 String
            info.serverId = serverInfo.real
            // 区服名称 是 String
            info.serverName = serverInfo.show
            // 扩展数据，如果设置，在发货接口会原样返回该数 据
            // 可选 String
            // info.extension ? = "";
            // 研发发货的 URL 是 String
            info.payNotifyUrl = "https://api-2122.kairong5.com/pay/callback/huanyu";
            // 用户ID 是 String
            info.userId = PlayerDataMgr.accountid.toString();
            JYProxySDK.onPay(info);
        }

        reportH5SDKData(dataType: UploadSceneValue)
        {
            logI("reportH5SDKData");
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
            JYProxySDK.onCreateRole(this.getReportInfo(), () => { });
        }

        getReportInfo(): JYProxySDK.ReportInfo
        {

            var infi: JYProxySDK.ReportInfo =
            {
                // 是	string	CP游戏服ID(标识)
                serverId: PlayerDataMgr.logicworldid.toString(),
                // 是	string	服务器名字
                serverName: ServerListDataMgr.getServerName(),
                // 是	string	CP角色id
                roleId: PlayerDataMgr.uid.toString(),
                // 是	string	CP角色名
                roleName: PlayerDataMgr.name,
                // 是	int	CP角色等级
                roleLevel: PlayerDataMgr.level.toString(),
                // String 创建角色时间 是
                roleCreateTime: PlayerDataMgr.createTime.toString()
            }
            return infi;
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
            JYProxySDK.onEnterGame(this.getReportInfo(), () => { });
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
            JYProxySDK.onRoleUpLevel(this.getReportInfo(), () => { });
        }
    }
}
