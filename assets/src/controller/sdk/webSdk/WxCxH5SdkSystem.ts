/* eslint-disable no-console */
module Pro
{
    export class WxCxH5SdkSystem extends WxCxSdkSystem
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
            return "wx_cx_h5_sdk.user";
        }


        /**
     * ovrride
     */
        protected doSdkLogin()
        {
            QingJS.login((loginResult: wxcx.LoginResult) =>
            {
                if (loginResult.code == 200)
                {
                    this.onSdkLoginBack({ session: loginResult.token, userId: loginResult.uid, error: "", userName: "" })
                } else
                {
                    logE("登录失败", loginResult);
                }
            });
        }

        payNew(value: Pb_God.PBChargeData, callback: Function = null, target: any = null)
        {
            this.cxPay(value, true, callback, target);
        }

        public report(type: string, params = {})
        {
            let serverId = params["serverId"] || PlayerDataMgr.logicworldid;
            let userId = params["userId"] || this.userId;
            let roleId = params["roleId"] || String(PlayerDataMgr.uid);
            let roleName = params["roleName"] || PlayerDataMgr.name;
            let roleLevel = params["roleLevel"] || PlayerDataMgr.level;

            let serverInfo = ServerListDataMgr.getLoginHostInfo();
            var reportData = {
                roleId: roleId,			// string
                roleName: roleName,		// string
                roleLevel: roleLevel,				// int 角色等级
                serverId: serverId,		// string 区服ID需要唯一标识玩家所在区服，如果同时有区ID和服务器ID，请用竖线 “|” 连接起来
                serverName: serverInfo.show || serverInfo.real,	// string
                roleVip: PrivilegeDataMgr.vipLevel,					// int 角色vip等级
                rolePower: PlayerDataMgr.fightPower,  			// int 战力、武力之类角色的核心数值
                roleGold: Global.getItemNum(CfgID.ItemID.Diamond),                // int 次要货币(非氪金、游戏内可得货币)
                roleDiamond: Global.getItemNum(CfgID.ItemID.Gold),             // int 主要货币(氪金获得)
                reportType: type,   // string 上报类型 "entergame" , "createrole", "roleupgrade"
            }
            //
            // 上报角色信息
            //
            QingJS.reportRoleInfo(reportData, function (result)
            {
                // EventMgr.trigger(EventNotify.wx_cs_pay_stat_Update)
            });
        }

    }
}