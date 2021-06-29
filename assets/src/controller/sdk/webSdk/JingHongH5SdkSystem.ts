/* eslint-disable no-console */
module Pro
{

    export class JingHongH5SdkSystem extends BaseWebSdkSystem
    {
        private _sdk: JHH5SDK;

        constructor()
        {
            super();
            var username: string = PlatformData.locationData["username"];
            // sign String 校验令牌 strtolower(md5(strtolower("appid=1&is_age_18=0&is_real_name=0&server_type=&time=1515574890&uid=12158144") + { $key })) 有效期为5分钟
            var sign: string = PlatformData.locationData["login_sign"];
            var model: string = PlatformData.locationData["model"];
            var game_id: string = PlatformData.locationData["game_id"];
            var muid: string = PlatformData.locationData["muid"];

            // 时间戳timestamp、游戏ID game_id、注册时间reg_time、model以及muid
            this._sdk = new JHH5SDK({
                game_id: game_id,
                muid: muid,
                username: username,
                reg_time: new Date().getTime().toString(),
                model: model
            })
        }

        /**
         * 唯一标识
         */
        public getTag(): string
        {
            return "JingHongH5SdkSystem.user";
        }

        /**
         * ovrride
         */
        protected doSdkLogin()
        {
            // uid Int 用户ID √
            var uid: number = PlatformData.locationData["username"];
            var sign: string = PlatformData.locationData["login_sign"];
            this.onSdkLoginBack({ session: sign, userId: uid.toString(), error: "", userName: "" })
        }

        /**
         * 从平台认证服务器获取平台用户信息
         * @param session
         */
        protected requestLoginServe(session: string, userId: string)
        {
            var username: string = PlatformData.locationData["username"];
            var parmArr: string[] = ["username", "timestamp", "login_sign"];
            this.phpLogin(parmArr, PlatformData.locationData);
        }

        payNew(value: Pb_God.PBChargeData, callback: Function = null, target: any = null)
        {
            let chargeInfo = cfg.ChargeCfgData.getInfo(value.productid);
            let serverInfo = ServerListDataMgr.getLoginHostInfo();
            if (value.orderno == "" || value.orderno == null)
            {
                AlertShow.showSimpleAlert("充值订单信息异常，请联系客服，或稍后重试!8")
                var logMsg: string = "充值异常8，------> messContent: " + JSON.stringify(value);
                GameLaunch.PostClientLog(logMsg)
                return;
            }
            // 开始支付
            this.payCallback = callback;
            this.payTarget = target;

            var payInfo: JingHong.PayInfo = {
                server_id: serverInfo.real.toString(),// string,
                server_name: serverInfo.show,// string,
                order_money: value.money,//string,
                pay_money: value.money,//string,
                goods_name: chargeInfo.name,// string,
                goods_id: chargeInfo.iD.toString(),//string,
                role: PlayerDataMgr.nickName,//string,
                role_id: PlayerDataMgr.uid.toString(),//string,
                data: {},// string,
                //订单号
                ext: value.orderno,//string
                pay_sign: value.ordersign,//string,
                timestamp: value.time.toString(),//string,
                // username: PlayerDataMgr.nickName,//string,
                startChargeCallback: () =>
                {
                    console.log("回调了");

                }
            };
            this._sdk.activatePayment(payInfo)
            logD(JSON.stringify(payInfo));
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
        public trackCreateRole(roleName: string)
        {
            super.trackCreateRole(roleName);
            this._sdk.createNewRoleV2({ role: roleName, serer_id: ServerListDataMgr.getServerId() })
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
            super.trackRoleLogin(roleName);
            this._sdk.collectGameActiveV2({ role: roleName, role_id: PlayerDataMgr.uid.toString(), serer_id: ServerListDataMgr.getServerId(), server_name: ServerListDataMgr.getServerName() })
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
            this._sdk.collectRoleLevelV2({ role: PlayerDataMgr.nickName, role_id: PlayerDataMgr.uid.toString(), serer_id: ServerListDataMgr.getServerId(), level: PlayerDataMgr.level.toString() })
        }
    }
}