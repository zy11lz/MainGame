/* eslint-disable no-console */
module Pro
{
    //空SDK,执行的时候，不会做任何处理
    export class NoSdkSystem extends BaseWebSdkSystem
    {
        getTag(): string
        {
            return "NoSdkSystem";
        }
        onHttpLogin(data: Object)
        {
            super.onHttpLogin(data);
            this.reporter.setupOnLogin(this.serverTokenObj['open_id']);
        }
        reportH5SDKData(dataType: Pro.UploadSceneValue)
        {
        }
        protected onMessage(eventID: number, json: {})
        {

        }
        public sendNative(eventID: number, json: {} = null)
        {

        }

        /**
       * ovrride
       */
        protected doSdkLogin()
        {
            this.onSdkLoginBack({ session: "", userId: "", error: "", userName: "" })
        }

        /**
         * 从平台认证服务器获取平台用户信息
         * @param session
         */
        protected requestLoginServe(session: string, userId: string)
        {
            var parmArr: string[] = ["account", "password"];
            var account = LoginServerMgr.getLocalAccount();
            var password = LoginServerMgr.getLocalPassword();
            this.phpLogin(parmArr, { account: account, password: password });
        }
    }
}