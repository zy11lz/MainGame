/* eslint-disable no-console */
module Pro
{

    class EventType
    {
        // eid int 1. 创建角色事件ID
        static create_role = 31
        // 2. 进入游戏事件ID
        static enter_game = 32
        // 3. 角色升级事件ID
        static leve_up = 35
    }

    export class MengYouSdkSystem extends BaseWebSdkSystem
    {

        constructor()
        {
            super();
        }

        /**
         * 唯一标识
         */
        public getTag(): string
        {
            return "MengYouSdkSystem.user";
        }

        /**
         * ovrride
         */
        protected doSdkLogin()
        {
            // uid Int 用户ID √
            var uid: number = PlatformData.locationData["uid"];
            // sign String 校验令牌 strtolower(md5(strtolower("appid=1&is_age_18=0&is_real_name=0&server_type=&time=1515574890&uid=12158144") + { $key })) 有效期为5分钟
            var sign: string = PlatformData.locationData["sign"];
            this.onSdkLoginBack({ session: sign, userId: uid.toString(), error: "", userName: "" })
        }


        /**
         * 从平台认证服务器获取平台用户信息
         * @param session
         */
        protected requestLoginServe(session: string, userId: string)
        {
            var parmArr: string[] = ["appid", "nick", "server_type", "is_age_18", "uid", "is_real_name", "time", "sign"];
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

            //
            // 支付
            //
            let moneyNum = parseInt(value.money);

            var payInfo: any = {};
            // dsn 订单编号
            payInfo.dsn = value.orderno;

            // dsid 服务器ID(必传)
            payInfo.dsid = value.sid;

            // dsname 服务器名称(必传)
            payInfo.dsname = value.sid;

            // drid 角色ID(必传)
            payInfo.drid = value.actorid

            // drname 角色名称(必传)
            payInfo.drname = PlayerDataMgr.name;

            // drlevel 角色等级(必传)
            payInfo.drlevel = PlayerDataMgr.level;

            // money 支付金额单位为分(必传)
            payInfo.money = moneyNum * 100;
            // dext 透传参数，该参数会原样返回给CP服务端
            payInfo.dext = PlatformData.pid;// + "_" + value.orderno + "_" + value.ordersign;
            // time 时间戳，单位为秒(必传) 有效时间为5分钟
            payInfo.time = value.time;
            payInfo.sign = value.ordersign;;
            let that = this;
            MengYouSdk.pay(payInfo, (dsn: string, dext: string, status: number) =>
            {
                if (status == 1)
                {
                    that.trackPayEnd(value);
                }
                else
                {
                    that.trackPayError(value, "支付失败");
                }
                if (this.payCallback)
                {
                    this.payCallback.call(this.payTarget, status);
                }
            })
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
            this.report(EventType.create_role, { "roleName": roleName });
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
            this.report(EventType.enter_game, { "roleName": roleName });
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
            this.report(EventType.leve_up);
        }

        public report(type: number, params = {})
        {
            // serverId: number, userId: string, roleId: string, roleName: string, roleLevel: number;

            let serverId = params["serverId"] || PlayerDataMgr.logicworldid;
            let userId = params["userId"] || this.userId;
            let roleId = params["roleId"] || String(PlayerDataMgr.uid);
            let roleName = params["roleName"] || PlayerDataMgr.name;
            let roleLevel = params["roleLevel"] || PlayerDataMgr.level;


            let serverInfo = ServerListDataMgr.getLoginHostInfo();

            var reportData: any = {};
            //  String 服务器ID(必传)
            reportData.dsid = serverId;

            // dsname String 服务器名称(必传)
            reportData.dsname = serverId;

            // drid String 角色ID(必传)
            reportData.drid = userId;

            // drname String 角色名称(必传)
            reportData.drname = roleName;

            // drlevel String 角色等级(必传)
            reportData.drlevel = roleLevel;
            // drbalance String 角色游戏内余额(必传)
            reportData.drbalance = Global.getItemNum(CfgID.ItemID.Diamond);
            // drvip String 角色游戏内VIP等级(必传)
            reportData.drvip = PrivilegeDataMgr.vipLevel;
            // dcountry String 帮派(例如：武当派、少林派) ，按游戏内命名(必传)
            reportData.dcountry = FactionDataMgr.getFactionName();
            // dparty String 公会。玩家自己创建(必传)
            reportData.dparty = "";
            // dexxt Json 此参数为Json形式，可以自己定义参数(选传)
            reportData.dexxt = "{}";
            // eid int 1. 创建角色事件ID = 31 2. 进入游戏事件ID = 32(必传) 3. 角色升级事件ID = 35
            reportData.eid = type;
            MengYouSdk.event(reportData);
        }
    }
}