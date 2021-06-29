/* eslint-disable no-console */
module Pro
{

    export class ChuanShengVivoSdkSystem extends BaseWebSdkSystem
    {
        static appid: string = "105471701";
        constructor()
        {
            super();
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
            qg.login().then((res) =>
            {
                if (res.data.token)
                {
                    var token = res.data.token;
                    this.onSdkLoginBack({ session: token, userId: "", error: "", userName: "" })
                    // 使用token进行服务端对接
                }
            },
                (err) =>
                {
                    logE('登录失败' + JSON.stringify(err));
                }
            );
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
            let chargeInfo = cfg.ChargeCfgData.getInfo(value.productid);
            var vivoChargeInfo: qg.ChargeInfo = {} as any;
            vivoChargeInfo.appId = ChuanShengVivoSdkSystem.appid;
            // 商户订单号	是	由商户自定义，每笔订单必须唯一。
            vivoChargeInfo.cpOrderNumber = value.orderno;
            // 商品名称	是	商品名称
            vivoChargeInfo.productName = value.productid.toString();
            // 商品描述	是	商品描述
            vivoChargeInfo.productDesc = value.productid.toString();
            // 商品价格	是	单位为分，如商品价格为6元则要传“600”，传“6”或者“600.0”则会报错
            vivoChargeInfo.orderAmount = parseInt(value.money) * 100;
            // 回调通知URL	否	商户指定的回调url，支付成功后vivo会向此url通知支付结果。建议传，以保证支付结果准确。
            vivoChargeInfo.notifyUrl = "https://api-2122.kairong5.com/pay/callback/mini-vivo";
            // // 订单过期时间	否	由商户自定义，格式为yyyyMMddHHmmss
            // vivoChargeInfo.expireTime = "";
            // // 扩展参数	否	扩展参数（长度限制为64位）
            // vivoChargeInfo.extInfo = PlatformData.pid + "_" + value.orderno + "_" + value.ordersign  // 透传参数，将原样返回给发元宝接口;
            // 验签	是	参与签名的字段为以上所有参数，计算方法参见签名计算说明
            vivoChargeInfo.vivoSignature = value.ordersign;
            let that: ChuanShengVivoSdkSystem = this;
            qg.pay({
                orderInfo: JSON.stringify(vivoChargeInfo),
                success: function (ret)
                {
                    logD("支付成功")
                    that.trackPayEnd(value);
                },
                fail: function (errmsg, errcode)
                {
                    logE("支付失败:errmsg:" + errmsg + " errcode:" + errcode)
                    that.trackPayError(value, errmsg + "-" + errcode)
                },
                cancel: function (ret)
                {
                    logD("支付取消")
                    that.trackPayCancel(value);
                },
                complete: function ()
                {
                    logD("支付完成")
                }
            })
        }


        reportH5SDKData(dataType: UploadSceneValue)
        {
        }
    }

}