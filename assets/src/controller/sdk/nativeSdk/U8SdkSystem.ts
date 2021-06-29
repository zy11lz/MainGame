module Pro
{

    import StringMap = ds.StringMap;
    import TimeMgr = Public.TimeMgr;

    export class U8SdkSystem extends BaseSdkSystem
    {
        private valueConvertMap: StringMap<number> = new StringMap();

        constructor()
        {
            super();
            this.valueConvertMap.put(UploadSceneValue.SELECT_SERVER, 1);
            this.valueConvertMap.put(UploadSceneValue.CREATE_ROLE, 2);
            this.valueConvertMap.put(UploadSceneValue.LOGIN_SUCCESS, 3);
            this.valueConvertMap.put(UploadSceneValue.UPLEVEL, 4);
            this.valueConvertMap.put(UploadSceneValue.LOGOUT, 5);
        }
        /**
         * 唯一标识
         */
        public getTag(): string
        {
            return "u8sdk.user";
        }

        private showShortToast(txt: string)
        {
            AlertShow.showRemainConfirmAlert(txt, this, null, "common_confirm", 3, true, true, true);
        }

        /**
        * 请求登录
        * @param callback
        * @param target
        */
        protected doSdkLogin()
        {
            this.sendNative(PlatformMsgValue.LOGIN);
        }

        protected onPay(json: {})
        {
            if (json && json["code"] == CommResultCode.RESULT_OK)
            {
                this.trackPayEnd(this._currentChargeData);
                let successTxt = Global.getLangStr("pay_success");
                this.showShortToast(successTxt);
                if (this._currentChargeData.money)
                {
                    let money = parseInt(this._currentChargeData.money);
                    this.setPurchase(money);
                }
            }
            else if (json && json["code"] == CommResultCode.RESULT_FREE_CANCEL)
            {
                this.trackPayCancel(this._currentChargeData);
            }
            else if (json && json["code"] == CommResultCode.RESULT_FREE_AUDIT)
            {
                //支付审核中，阿游戏不断轮询，这里不做任何处理
            }
            else
            {
                let error: string = "unknown";
                if (json && json["error"])
                {
                    error = json["error"];
                }
                else
                {
                    error = Global.getLangStr("pay_fail");
                }

                this.showShortToast(error);
                this.trackPayError(this._currentChargeData, error);
            }

            // logI(JSON.stringify(json));
            if (this.payCallback)
            {
                this.payCallback.call(this.payTarget, json);
            }
        }


        /**
         * 从平台认证服务器获取平台用户信息
         * @param session
         */
        protected requestLoginServe(session: string, userId: string)
        {
            this.phpLogin(["session", "uid"], { "session": session, "uid": userId });
        }


        reportH5SDKData(dataType: UploadSceneValue)
        {
            if (this.valueConvertMap.containsKey(dataType))
            {

                let sceneType = this.valueConvertMap.getValue(dataType);
                let data = this.getReportInfo(sceneType);
                this.track("dataReport", data);

            }
        }
        trackCustomEvent(type: Pro.CustomEventType,extData:object={})
        {
            extData['eventType']= type.name;
            extData["funcname"] = "trackCustomEvent";
            console.info(`trackCustomEvent: ${JSON.stringify(extData)}`);
            // this.track("trackCustomEvent",extData)
            this.sendNative(PlatformMsgValue.TRACK, extData);
        }

        protected getUploadUserId()
        {
            if(this.sdkUserId)
            {
                return this.sdkUserId;
            }
            return super.getUploadUserId();
        }
        private getReportInfo(sceneType: number)
        {

            // 参数名称	参数类型	参数说明
            // dataType	int	调用时机
            // serverID	String	玩家所在服务器的ID
            // serverName	String	玩家所在服务器的名称
            // roleID	String	玩家角色ID
            // roleName	String	玩家角色名称
            // roleLevel	String	玩家角色等级
            // moneyNum	String	当前角色身上拥有的游戏币数量
            // roleCreateTime	long	角色创建时间，从1970年到现在的时间，单位秒,必须传入真实的数据，否则UC审核不过
            // roleLevelUpTime	long	角色等级变化时间，从1970年到现在的时间，单位秒
            // vip	String	玩家VIP等级
            let roleLevelUpTime = 0;
            if (sceneType == UploadSceneValue.UPLEVEL)
            {
                roleLevelUpTime = TimeController.currTimerSecond;
            }
            let data = {
                dataType: sceneType,
                serverID: PlayerDataMgr.logicworldid,
                serverName: ServerListDataMgr.getServerName(),
                roleID: PlayerDataMgr.uid,
                roleName: PlayerDataMgr.name,
                roleLevel: PlayerDataMgr.level,
                moneyNum: Global.getItemNum(CfgID.ItemID.Diamond),
                roleCreateTime: PlayerDataMgr.createAccountTime,
                roleLevelUpTime: roleLevelUpTime,
                vip: PrivilegeDataMgr.vipLevel,
                power:PlayerDataMgr.fightPower
            }
            return data;
        }

        protected getUserInfo(json: {})
        {
            this.sendNative(10, this.getReportInfo(UploadSceneValue.LOGOUT))
        }

        /**
         * 【数据上报】购买下单事件上报
         * @param value
         */
        public trackPayBegin(
            value: Pb_God.PBChargeData
        )
        {
            this.track("trackPayBegin", {
                "serverId": value.sid,
                "userId": value.uid,
                "money": value.money,
                "roleId": value.actorid,
                "roleName": PlayerDataMgr.name,
                "roleLevel": PlayerDataMgr.level,
                "orderNo": value.orderno,
                "orderItem": value.orderitem,
                "orderSign": value.ordersign,
                "currencyType": value.currencytype
            });
        }

        /**
         * 【数据上报】支付成功
         * @param value
         */
        public trackPayEnd(value: Pb_God.PBChargeData)
        {

            this.track("trackPayEnd", {
                "serverId": value.sid,
                "userId": value.uid,
                "money": value.money,
                "roleId": value.actorid,
                "roleName": PlayerDataMgr.name,
                "roleLevel": PlayerDataMgr.level,
                "orderNo": value.orderno,
                "orderItem": value.orderitem,
                "orderSign": value.ordersign,
                "currencyType": value.currencytype
            });
        }

        /**
         * 【数据上报】取消支付
         * @param value
         */
        public trackPayCancel(value: Pb_God.PBChargeData)
        {

            this.track("trackPayCancel", {
                "serverId": value.sid,
                "userId": value.uid,
                "money": value.money,
                "roleId": value.actorid,
                "roleName": PlayerDataMgr.name,
                "roleLevel": PlayerDataMgr.level,
                "orderNo": value.orderno,
                "orderItem": value.orderitem,
                "orderSign": value.ordersign,
                "currencyType": value.currencytype
            });
        }


        /**
         * 【数据上报】支付失败
         *
         * @param serverId     服务器id
         * @param userId       用户id
         * @param money        支付金额
         * @param roleId       角色id
         * @param roleName     角色名
         * @param roleLevel    角色等级
         * @param orderNo      订单号，游戏服务器下发
         * @param orderItem    订单项，服务下发
         * @param orderSign    订单签名，服务器下发
         * @param currencyType 货币类型，国内传 "CNY"
         */
        public trackPayError(
            value: Pb_God.PBChargeData,
            error: string
        )
        {

            this.track("trackPayError", {
                "serverId": value.sid,
                "userId": value.uid,
                "money": value.money,
                "roleId": value.actorid,
                "roleName": PlayerDataMgr.name,
                "roleLevel": PlayerDataMgr.level,
                "orderNo": value.orderno,
                "orderItem": value.orderitem,
                "orderSign": value.ordersign,
                "currencyType": value.currencytype
            });
        }

        getChargeId(chargeInfo: cfg.ChargeCfgInfo): string
        {
            if (SystemUtils.isIos())
            {
                let key = 'appid' + PlatformData.pid;
                return chargeInfo[key];
            }
            return chargeInfo.iD+"";
        }
        exitApp()
        {
            this.sendNative(PlatformMsgValue.EXIT_APP, {});
        }

        /**
         * u8支付要传userid,但是(2021/05/27)之前打的apk包，使用的是userid字段，(传过去的userid字段没有其它用处，就只传给u8当参数了)
         * 因为之前的apk包换不了，所有在h5里做一下特殊处理，用roleid 填充 userid字段
         * @protected
         */
        protected getPayUserId():string
        {
            return PlayerDataMgr.uid+"";
        }
    }
}