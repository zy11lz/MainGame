/* eslint-disable no-console */

/**
 *  高热H5
 */
module Pro
{

    var gao_re_game_id: number = 3361;
    class EventType
    {
        // 1	选择服务器
        // 2	创建角色
        // 3	进入游戏
        // 4	等级提升
        // 5	退出游戏

        static select_server = 1;
        // eid int 1. 创建角色事件ID
        static create_role = 2
        // 2. 进入游戏事件ID
        static enter_game = 3
        // 3. 角色升级事件ID
        static leve_up = 4
        static exit_game: 5;

    }

    export class GaoReH5SdkSystem extends BaseWebSdkSystem
    {
        private _gaoReUserInfp: gaoreSDK.UserInfo;

        constructor()
        {
            super();
        }

        /**
         * 唯一标识
         */
        public getTag(): string
        {
            return "GaoReH5SdkSystem.user";
        }

        /**
         * ovrride
         */
        protected doSdkLogin()
        {
            gaoreSDK.getLoginInfo({
                game_id: gao_re_game_id,
                server_id: 0,
                callFunc: (res: gaoreSDK.UserInfo) =>
                {
                    this._gaoReUserInfp = res;
                    this.onSdkLoginBack({ session: res.sign, userId: res.uid.toString(), error: "", userName: "" })
                }
            });
        }


        /**
         * 从平台认证服务器获取平台用户信息
         * @param session
         */
        protected requestLoginServe(session: string, userId: string)
        {
            var parmArr: string[] = ["sid", "uid", "user_name", "sign"];
            this.phpLogin(parmArr, this._gaoReUserInfp);
        }

        payNew(value: Pb_God.PBChargeData, callback: Function = null, target: any = null)
        {

            let chargeInfo = cfg.ChargeCfgData.getInfo(value.productid);

            let roleName: string = PlayerDataMgr.name;
            let roleLevel: number = PlayerDataMgr.level;

            let serverInfo = ServerListDataMgr.getLoginHostInfo();
            // 开始支付
            this.payCallback = callback;
            this.payTarget = target;

            var info: gaoreSDK.PayInfo = {} as any;
            info.user_name = this._gaoReUserInfp.user_name// 'gr20201010';//用户名，登录接口返回
            info.buy_num = 1;//固定值1
            info.game_id = gao_re_game_id;//平台分配的游戏ID
            info.server_id = value.sid;//游戏服ID
            info.server_name = serverInfo.show;//'游戏一服';//游戏服名称
            info.uid = this._gaoReUserInfp.uid;//高热平台唯一ID，登录接口返回
            info.role_name = roleName;// '无庸从凝';//游戏角色名
            info.role_level = roleLevel;// 10;//游戏角色等级
            info.vip = PrivilegeDataMgr.vipLevel.toString();//游戏角色vip
            info.money = parseInt(value.money);// 1;//充值金额，单位元，INT类型
            info.game_gold = 0;//充值游戏币
            info.role_id = value.actorid.toString();//'412006800';//游戏角色ID
            info.product_id = value.productid.toString();//'26';//产品ID
            info.product_name = chargeInfo.name;// '10元宝';//产品名
            info.product_desc = chargeInfo.desc; // '';//产品描述
            info.ext = PlatformData.pid + "_" + value.orderno + "_" + value.ordersign  // 透传参数，将原样返回给发元宝接口
            gaoreSDK.pay(info);
            if (this.payCallback)
            {
                this.payCallback.call(this.payTarget, status);
            }
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
            this.report(EventType.create_role);
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
            let serverId = params["serverId"] || PlayerDataMgr.logicworldid;
            let userId = params["userId"] || this.userId;
            let roleId = params["roleId"] || String(PlayerDataMgr.uid);
            let roleName = params["roleName"] || PlayerDataMgr.name;
            let roleLevel = params["roleLevel"] || PlayerDataMgr.level;

            let serverInfo = ServerListDataMgr.getLoginHostInfo();
            var roleDiamond = Global.getItemNum(CfgID.ItemID.Gold);             // int 主要货币(氪金获得)
            var reportData: gaoreSDK.ReportInfo = {} as any;
            gaoreSDK.roleinfo(
                {
                    data_type: type,// 4,  // 数据类型
                    server_id: gao_re_game_id,   // 游戏服ID
                    server_name: serverInfo.show, // "游戏一服",  // 游戏服名称
                    role_name: roleName,// "无庸从凝",   // 游戏角色名
                    role_level: roleLevel,// 100,
                    role_id: roleId,// "202010121305672",
                    money_num: roleDiamond.toString(), // 角色身上游戏币数量
                    role_create_time: PlayerDataMgr.createTime.toString(),// "1602479100", // 角色创建时间
                    // guild_id: "8372947", // 角色所在工会id
                    // guild_name: "第一公会", // 角色所在公会名
                    // guild_level: 10, // 角色所在公会等级
                    // guild_leader: "第一会长", // 角色所在公会会长名
                    power: PlayerDataMgr.fightPower.toString(), // 角色战斗力
                    // profession_id: "10", // 职业ID
                    // profession: "盗贼", // 职业名称
                    // gender: "男", // 角色性别，（男、女）
                    vip: PrivilegeDataMgr.vipLevel, // 玩家VIP等级
                    uid: this._gaoReUserInfp.uid, // 平台ID
                    user_name: this._gaoReUserInfp.user_name,    // 平台ID
                }
            )
        }
    }
}