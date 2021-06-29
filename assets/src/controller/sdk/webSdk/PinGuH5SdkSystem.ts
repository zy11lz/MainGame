/* eslint-disable no-console */

/**
 *  丰趣H5
 */
module Pro
{
    export class PinGuH5SdkSystem extends BaseWebSdkSystem
    {
        constructor()
        {
            super();
            // PD:ah5sdk_bbjlh5_001
            // GD:100106
            // GK: 54b526bfb4d47322
            // GS: afae09e53071fdb5
            // CD: 100888
            // gameid = cd + gd
            // gamekey = gk
            // Sdk.init("100888100106", "54b526bfb4d47322", true);
            logI("初始化PinGuH5SdkSystem");
        }


        /**
         * 唯一标识
         */
        public getTag(): string
        {
            return "PinGuH5SdkSystem.user";
        }

        /**
         * ovrride
         */
        protected doSdkLogin()
        {
            // http://47.110.125.158/snzz/dist/index_pin_gu.html?a_pub=ah5sdk_bbjlh5_001&a_accountid=23609793&a_sessionid=a80f1c90-b628-f590-008d-76e566451073
            var accountid: string = PlatformData.getParamString("a_accountid");
            var sessionid: string = PlatformData.getParamString("a_sessionid");
            this.requestLoginServe(sessionid, accountid);
        }


        /**
         * 从平台认证服务器获取平台用户信息
         * @param session
         */
        protected requestLoginServe(session: string, userId: string)
        {
            var parmArr: string[] = ["session_id", "account_id"];
            this.phpLogin(parmArr, { session_id: session, account_id: userId });
        }

        payNew(value: Pb_God.PBChargeData, callback: Function = null, target: any = null)
        {
            // 开始支付
            this.payCallback = callback;
            this.payTarget = target;
            var info: Sdk.OderInfo = {} as any;
            info.callbackurl = "http://api-2122.kairong5.com/pay/callback/pingu-h5";
            info.paymoney = parseInt(value.money);
            info.custominfo = "pay";
            info.customorderid = value.orderno;
            info.productdesc = value.productid.toString();
            info.productfeecode = "";
            Sdk.pay(JSON.stringify(info), (result: { code: number }) =>
            {

            });
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
            let serverInfo = ServerListDataMgr.getLoginHostInfo();
            var info: Sdk.CreateRoeInfo = {
                playerid: PlayerDataMgr.uid.toString(),// = "1036"; 						//角色ID
                servername: serverInfo.show,// = "天涯海角"; 					//区服名称
                serverid: serverInfo.real,// = "100"; 						//区服ID
                playername: PlayerDataMgr.name,//= "天涯浪子"; 					//角色名称
                time: PlayerDataMgr.createTime.toString()//= "3545531452"; 					//创角时间，unixtime时间戳
            }
            Sdk.uploadinfo(JSON.stringify(info),
                (result: { code: number }) => void {

                }
            );
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
            Sdk.uploadRoleData(this.getReportInfo(),
                (result: { code: number }) => void {

                });
        }

        getReportInfo(): string
        {
            let serverInfo = ServerListDataMgr.getLoginHostInfo();
            var info: Sdk.RoleData = {
                ingot: Global.getItemNum(CfgID.ItemID.Diamond).toString(),// = "100"; 							//剩余游戏代币
                playerid: PlayerDataMgr.uid.toString(),// = "1036"; 						//角色ID
                factionname: FactionDataMgr.getFactionName(),// = "虎头帮"; 					//帮派名称
                viplevel: PrivilegeDataMgr.vipLevel.toString(),// = "10";							//VIP等级
                servername: serverInfo.show,// = "天涯海角"; 					//区服名称
                playerlevel: PlayerDataMgr.level.toString(),// = "100"; 					//角色等级
                serverid: serverInfo.real,// = "100"; 						//区服ID
                playername: PlayerDataMgr.name,// = "天涯浪子"; 					//角色名称
            }
            return JSON.stringify(info);
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
            Sdk.uploadRoleData(this.getReportInfo(),
                (result: { code: number }) => void {

                });
        }
    }
}
