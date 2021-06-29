/* eslint-disable no-console */
module Pro
{

    export class ChuanShengOppoSdkSystem extends BaseWebSdkSystem
    {
        constructor()
        {
            super();


            qg.getSystemInfo(
                {
                    success: (res) =>
                    {
                        ChuanShengOppoConfig.platformVersionCode = res.platformVersionCode;
                    },
                    fail: function (err)
                    {

                    },
                    complete: function (res)
                    {

                    }
                })
        }

        onHttpLogin(data: object)
        {
            super.onHttpLogin(data);
            this.reporter.setupOnLogin(this.serverTokenObj['open_id']);
        }
        /**
       * ovrride
       */
        protected doSdkLogin()
        {
            qg.login(
                {
                    success: (res) =>
                    {
                        if (res.data.token)
                        {
                            var token = res.data.token;
                            ChuanShengOppoConfig.oppoToken = token;
                            // 使用token进行服务端对接
                            this.onSdkLoginBack({ session: token, userId: "", error: "", userName: "" })
                        }
                    },
                    fail: (res) =>
                    {
                        logE("登录失败：" + JSON.stringify(res));
                    }
                },
            )
        }


        /**
         * 从平台认证服务
         * @param session
         */
        protected requestLoginServe(session: string, userId: string)
        {
            var parmArr: string[] = ["token"];
            this.phpLogin(parmArr, { token: session });
        }


        payNew(value: Pb_God.PBChargeData, callback: Function = null, target: any = null)
        {
            let chargeInfo = cfg.ChargeCfgData.getInfo(value.productid);
            var timestamp: number = 0;
            for (let index = 0; index < value.clientparam.length; index++)
            {
                const element: Pb_God.ClientParam = value.clientparam[index];
                if (element.key == "timestamp")
                {
                    timestamp = Number(element.value);
                }
            }

            var vivoChargeInfo: qg.ChargeOppoInfo = {} as any;
            //平台分配的游戏appId
            vivoChargeInfo.appId = ChuanShengOppoConfig.appid;
            //  是 qg.login成功时获得的用户token
            vivoChargeInfo.token = ChuanShengOppoConfig.oppoToken;
            // 是	时间戳，CP服务端参与签名的时间戳
            vivoChargeInfo.timestamp = PlatformDataMgr.payTimestamp;
            // 是	支付签名，CP服务端生成
            vivoChargeInfo.paySign = value.ordersign;
            // 是	下单订单号，由统一下单接口返回
            vivoChargeInfo.orderNo = value.orderno;

            vivoChargeInfo.success = function (ret)
            {
                logD("支付成功")
            }
            vivoChargeInfo.fail = function (res)
            {
                logE("支付失败:errmsg:" + JSON.stringify(res))
            }
            vivoChargeInfo.complete = function ()
            {
                logD("支付完成")
            }
            qg.pay(vivoChargeInfo)
        }


        reportH5SDKData(dataType: UploadSceneValue)
        {
        }
    }

}