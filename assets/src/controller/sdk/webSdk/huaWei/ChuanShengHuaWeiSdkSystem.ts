/* eslint-disable no-console */
module Pro
{

    export class ChuanShengHuaWeiSdkSystem extends BaseWebSdkSystem
    {
        static appid: string = "104058025";
        private _loginInfo: qg.HuaWeiLoginBackInfo;
        constructor()
        {
            super();


            qg.getSystemInfo(
                {
                    success: (res) =>
                    {
                    },
                    fail: function (err)
                    {

                    },
                    complete: function (res)
                    {

                    }
                })
        }


        /**
       * ovrride
       */
        protected doSdkLogin()
        {
            qg.gameLoginWithReal(
                {
                    forceLogin: 1,
                    appid: "104058025",
                    success: (res: qg.HuaWeiLoginBackInfo) =>
                    {
                        this._loginInfo = res;
                        // 使用token进行服务端对接
                        this.onSdkLoginBack({ session: res.gameAuthSign, userId: res.playerId, error: "", userName: "" })
                    },
                    fail: (data, code) =>
                    {
                        this._isSdkLoginIng = false;
                        ThirdMgr.sdkLoginFail();
                        logE("登录失败：:" + data + ", code:" + code);
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
            var parmArr: string[] = ["ts", "player_id", "player_level", "player_sign"];
            var parmValue: any = {};
            parmValue.ts = this._loginInfo.ts;
            parmValue.player_id = this._loginInfo.playerId;
            parmValue.player_level = this._loginInfo.playerLevel;
            parmValue.player_sign = encodeURIComponent(this._loginInfo.gameAuthSign);
            this.phpLogin(parmArr, parmValue);
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

            var huaWeiPayInfo: qg.HuaWeiPayInfo = {} as any;
            //平台分配的游戏appId
            huaWeiPayInfo.amount = value.money + ".00";
            //  是 qg.login成功时获得的用户token
            huaWeiPayInfo.applicationID = ChuanShengHuaWeiSdkSystem.appid;
            huaWeiPayInfo.productDesc = chargeInfo.iD.toString();
            huaWeiPayInfo.productName = chargeInfo.iD.toString();
            huaWeiPayInfo.serviceCatalog = "X6";
            huaWeiPayInfo.merchantId = "2850086000388435957";
            huaWeiPayInfo.merchantName = "深圳市酷柚信息技术有限公司";
            huaWeiPayInfo.sign = value.ordersign;
            huaWeiPayInfo.requestId = value.orderno;
            huaWeiPayInfo.urlver = "2";
            huaWeiPayInfo.sdkChannel = 3;
            huaWeiPayInfo.publicKey = "MIIBojANBgkqhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEAxE0uJTkf/itKoWRU1piDXoI+l8DKm1hsdsAwr04nBUBNQd0qzzlN8wdjBkATG2Hp4I/n5wJU/57Gbl1tSO5rDaoiDRIutziNdMjYW/DtQLDeJSV5VykIBsORQgAPWIIDCGVLBLSL1+kaT2/1G5BdjxY4cUI0zF5bmBeZj3GZCsMvp+YPS3tdrFVvTXHf0uskEF9FmX4N6UMa+GfWICNmRN97X/dz3OnYY6lUSAOwATHJLmNmhZKvj5nW4scQ3hLuNNODuliaLanYY1aMHSuC+BDaxYu5w72V1pUxVfoAxjaCq1nWatg0MY1elu1jmCdgk1RQPoOb2yZznnj1APuwn1Y3jtWeLCuARDPg1tQpb7JgrcMseKvOnTXamZ/j/e81fgUyBDAO5RxwLcqa7jqhMx+us/Y69huqg22OOpGBXn4j8tuPgD9d8Mu/keXLQHV2GqsJLsUigzVSAWvTJibl+6U2EGhIey+b0OKww4aOAj2xqH51vTLsPjzA+bhFsqD1AgMBAAE=";
            var chargeHuaweiInfo: qg.ChargeHuaweiInfo = {} as any;
            chargeHuaweiInfo.orderInfo = huaWeiPayInfo;
            chargeHuaweiInfo.success = function (ret)
            {
                logD("支付成功")
            }
            chargeHuaweiInfo.fail = function (res)
            {
                logE("支付失败:errmsg:" + JSON.stringify(res))
            }
            chargeHuaweiInfo.complete = function ()
            {
                logD("支付完成")
            }
            qg.hwPay(chargeHuaweiInfo)
        }


        reportH5SDKData(dataType: UploadSceneValue)
        {
        }
    }

}