/* eslint-disable no-console */
module Pro
{
    class WxCxReportType
    {

        // 创建角色
        static createrole = "createrole"
        // 进入游戏后（进入游戏内主界面后上报）
        static entergame = "entergame"
        // 角色升级
        static roleupgrade = "roleupgrade"
    }


    export class WxCxSdkSystem extends BaseWebSdkSystem
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
            return "wx_cx_sdk.user";
        }

        /**
         * ovrride
         */
        protected doSdkLogin()
        {
            qingjs.instance.login({}, (loginResult: wxcx.LoginResult) =>
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


        /**
         * 从平台认证服务器获取平台用户信息
         * @param session
         */
        protected requestLoginServe(session: string, userId: string)
        {
            this.phpLogin(["token"], { "token": session });
        }

        cxPay(value: Pb_God.PBChargeData, isXcx: boolean, callback: Function = null, target: any = null)
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
            var api;
            if (isXcx)
            {
                api = QingJS;
            } else
            {
                api = qingjs.instance;
            }
            if (api == null)
            {
                AlertShow.showSimpleAlert("充值接口错误")
                return;
            }
            api.purchase(
                {
                    productName: chargeInfo.name,// 商品名称 必填
                    productId: value.productid, // 商品ID 必填
                    productPrice: moneyNum * 100, // 单位 分 人民币 必填
                    cpOrderId: value.orderno, // CP订单号 必填
                    extendsParam1: PlatformData.pid + "_" + value.orderno + "_" + value.ordersign,  // 服务器将此参数原封不动回传至CP服务器 可选
                    extendsParam2: chargeInfo.desc,  // 服务器将此参数原封不动回传至CP服务器 可选
                    roleId: value.actorid,// 可选 有的话尽量填写
                    roleName: PlayerDataMgr.name,// 可选 有的话尽量填写
                    roleLevel: PlayerDataMgr.level,// 可选 有的话尽量填写
                    serverId: value.sid,// 区服ID需要唯一标识玩家所在区服，如果同时有区ID和服务器ID，请用竖线 “|” 连接起来
                    serverName: serverInfo.show || serverInfo.real,// 可选 有的话尽量填写
                    roleVip: PrivilegeDataMgr.vipLevel// 可选 有的话尽量填写
                },
                (result) =>
                {			// 下单回调，非充值回调，可传null
                    var isSuccess = result.isSuccess;
                    var cpOrderId = result.cpOrderId;
                    if (isSuccess)
                    {
                        this.trackPayEnd(value);
                    }
                    else
                    {
                        this.trackPayError(value, "返回失败");
                    }
                    // logI(JSON.stringify(json));
                    if (this.payCallback)
                    {
                        this.payCallback.call(this.payTarget, result);
                    }
                }
            );
        }

        payNew(value: Pb_God.PBChargeData, callback: Function = null, target: any = null)
        {
            if (qingjs.instance.canPay())
            {
                this.cxPay(value, false, callback, target);
            } else
            {
                if (this.payCallback)
                {
                    this.payCallback.call(this.payTarget, {});
                }
                logI("当前不能充值")
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
        public trackCreateRole(roleName: string)
        {
            super.trackCreateRole(roleName);
            this.report(WxCxReportType.createrole, { "roleName": roleName });
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
            this.report(WxCxReportType.entergame, { "roleName": roleName });
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
            this.report(WxCxReportType.roleupgrade);
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
                reportType: type,   // string 上报类型 "entergame" , "createrole", "roleupgrade"
            }
            //
            // 上报角色信息
            //
            qingjs.instance.reportRoleInfo(reportData, function (result)
            {
                EventMgr.trigger(EventNotify.wx_cs_pay_stat_Update)
            });
        }


        protected static initHiddenn()
        {
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_Sail] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_FactionDonate] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_FactionSkill] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_FactionLiveness] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_FactionBoss] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_FactionWar] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_Temple] = 1;
            WxCxSdkSystem.hiddenDic[PanelNotify.Open_Shop] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_SpriteShop] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_HeroCall] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_HeroDetail] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_HeroExchange] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_SecretTravel] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_RiskMain] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_LadderMain] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_DanMain] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_Element] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_FightSupport] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_StageRedio] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_QuickFight] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_FightDaily] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_StarTowerMain] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_EndlessTowerMain] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_AcrossWar] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_ArenaEnter] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_Challenge] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_Champion] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_HookScene] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_Task] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_HeavenMain] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_Treasure] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_ItemCombin] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_HeroBag] = 1;
            WxCxSdkSystem.hiddenDic[PanelNotify.Open_ClickGold] = 1;
            WxCxSdkSystem.hiddenDic[PanelNotify.Open_FirstPay] = 1;
            WxCxSdkSystem.hiddenDic[PanelNotify.Open_SevenDayLogin] = 1;
            WxCxSdkSystem.hiddenDic[PanelNotify.Open_PayMain] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_PayMainMediator] = 1;
            WxCxSdkSystem.hiddenDic[PanelNotify.Open_MonthFund] = 1;
            WxCxSdkSystem.hiddenDic[PanelNotify.Open_TimeLimitActivity] = 1;
            WxCxSdkSystem.hiddenDic[PanelNotify.Open_DayFirstPay] = 1;
            WxCxSdkSystem.hiddenDic[PanelNotify.Open_StarTowerMainAdv] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_DragonBall] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_Convenant] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_RoadEvolve] = 1;
            // WxCxSdkSystem.hiddenDic[PanelNotify.Open_HuPa_ExChange] = 1;
        }
        static hiddenDic: Object;

        static isNeedHide(appName: string): boolean
        {
            if (WxCxSdkSystem.hiddenDic == null)
            {
                WxCxSdkSystem.hiddenDic = {};
                WxCxSdkSystem.initHiddenn();
            }
            return WxCxSdkSystem.hiddenDic.hasOwnProperty(appName)
        }
    }
}