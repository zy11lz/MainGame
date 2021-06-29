/* eslint-disable no-console */

/**
 *  丰趣H5
 */
module Pro
{
    export enum EventType
    {
        MKSDK_LOGIN_SUCCESS = "MKSDK_LOGIN_SUCCESS",
        MKSDK_LOGIN_ERROR = "MKSDK_LOGIN_ERROR",
        MKSDK_PAY_SUCCESS = "MKSDK_PAY_SUCCESS",
        MKSDK_PAY_ERROR = "MKSDK_PAY_ERROR"
    }

    export class FengQuH5SdkSystem extends BaseWebSdkSystem
    {
        constructor()
        {
            super();
            logI("初始化FengQuH5SdkSystem");
            this.fengQuRegister();
        }

        fengQuRegister()
        {
            MKSDK.bind(EventType.MKSDK_LOGIN_SUCCESS, (info: MKSDK.LoginSuccessInfo) =>
            {
                this.onSdkLoginBack({ session: info.token, userId: "", error: "", userName: "" })
            });
            MKSDK.bind(EventType.MKSDK_LOGIN_ERROR, function (data)
            {
                this._isSdkLoginIng = false;
                ThirdMgr.sdkLoginFail();
            });

            MKSDK.bind(EventType.MKSDK_PAY_SUCCESS, function (data)
            {
                logD("成功发起充值（充值结果以服务端为准）");
            });

            MKSDK.bind(EventType.MKSDK_PAY_ERROR, function (data)
            {
                logE("充值失败" + JSON.stringify(data));
            });
        }

        /**
         * 唯一标识
         */
        public getTag(): string
        {
            return "FengQuH5SdkSystem.user";
        }

        /**
         * ovrride
         */
        protected doSdkLogin()
        {
            MKSDK.login();
        }


        /**
         * 从平台认证服务器获取平台用户信息
         * @param session
         */
        protected requestLoginServe(session: string, userId: string)
        {
            var parmArr: string[] = ["token"];
            this.phpLogin(parmArr, { token: session });
        }

        payNew(value: Pb_God.PBChargeData, callback: Function = null, target: any = null)
        {
            // 开始支付
            this.payCallback = callback;
            this.payTarget = target;
            var info: MKSDK.PayInfo = {} as any;
            info.doid = value.orderno
            info.dsid = value.sid.toString();
            info.dext = "test";
            info.dmoney = value.money
            info.money = value.money
            MKSDK.showPay(info);
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
            MKSDK.createRole(this.getReportInfo());
        }

        getReportInfo(): MKSDK.ReportInfo
        {

            var infi: MKSDK.ReportInfo =
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
                roleLevel: PlayerDataMgr.level
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
            MKSDK.enter(this.getReportInfo());
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
            MKSDK.levelUp(this.getReportInfo());
        }
    }
}
