

module Pro
{


    export abstract class BaseWebSdkSystem extends BaseSdkSystem
    {
        protected reporter: H5DataReporter;
        protected serverTokenObj:Object;
        constructor()
        {
            super();
            this.reporter = new Pro.H5DataReporter();
            this.reporter.h5start();
        }

    	protected abstract doSdkLogin(): void;
        onHttpLogin(data: Object)
        {
            super.onHttpLogin(data);
            try
            {
                let server_token = data['data'];
                let json = atob(server_token);
                logI(`httpLogin Data:${json}`)
                this.serverTokenObj = JSON.parse(json);
            }
            catch (e)
            {
                logE(e.message);
            }
        }

        h5event(eventType:string,params={},extInfo:Object = {})
        {
            this.reporter.h5event(eventType,params,extInfo);
        }
        protected onSdkLoginBack(json: { session: string; userId: string; error: string; userName: string })
        {
            this.reporter.setupOnLogin(json.userId);
            super.onSdkLoginBack(json);
        }
        trackSdkLogin()
        {
            super.trackSdkLogin();
            this.h5event(H5EventType.SDK_LOGIN);
        }
        trackSdkLoginError(error: string)
        {
            super.trackSdkLoginError(error);
            this.h5event(H5EventType.SDK_LOGIN_ERROR,{"error":error})
        }

        trackUserLogin()
        {
            super.trackUserLogin();
            this.h5event(H5EventType.USER_LOGIN);
        }
        trackUserLoginError(error: string)
        {
            super.trackUserLoginError( error);
            this.h5event(H5EventType.USER_LOGIN_ERROR,{"error":error});
        }
        trackCreateRole(roleName: string)
        {
            super.trackCreateRole(roleName);
            this.h5event(H5EventType.CREATE,{"roleName":roleName});
        }
        trackPayBegin(value: Pb_God.PBChargeData)
        {
            super.trackPayBegin(value);
            this.h5event(H5EventType.PAY_BEGIN,{},{
                orderNo:value.orderno,
                orderItem:value.orderitem,
                orderSign:"",
                money:value.money
            });
        }
        trackRoleLogin(roleName: string)
        {
            super.trackRoleLogin(roleName);
            this.h5event(H5EventType.LOGIN,{"roleName":roleName});
        }
        trackLevelUp()
        {
            super.trackLevelUp();
            this.h5event(H5EventType.UPGRADE);
        }
        trackPayCancel(value: Pb_God.PBChargeData)
        {
            super.trackPayCancel(value);
            this.h5event(H5EventType.PAY_CANCEL,{},{
                orderNo:value.orderno,
                orderItem:value.orderitem,
                orderSign:"",
                money:value.money
            });
        }
        trackPayEnd(value: Pb_God.PBChargeData)
        {
            super.trackPayEnd(value);
            this.h5event(H5EventType.PAY_END,{},{
                orderNo:value.orderno,
                orderItem:value.orderitem,
                orderSign:"",
                money:value.money
            });
        }
        trackPayError(value: Pb_God.PBChargeData, error: string)
        {
            super.trackPayError(value, error);
            this.h5event(H5EventType.PAY_ERROR,{},{
                orderNo:value.orderno,
                orderItem:value.orderitem,
                orderSign:"",
                money:value.money
            });
        }
        trackRoleLoginError( error: string)
        {
            super.trackRoleLoginError(error);
            this.h5event(H5EventType.LOGIN_ERROR,{"error":error});
        }
        trackSelectServer(serverId: number)
        {
            super.trackSelectServer(serverId);
            this.h5event(H5EventType.SELECT_SERVER,{"serverId":serverId});
        }


    }
}