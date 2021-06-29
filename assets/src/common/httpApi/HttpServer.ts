module Pro
{
    class HttpApi
    {

        apiRoot = "https://api-2122.kairong5.com";

        /**
         * 公告接口/client/bulletin
         */
        bulletin()
        {
            var args = "?plat_type=" + PlatformData.pid;
            this.doGet(EnumHttpApi.bulletin, args)
        }

        /**
         * 查询游戏服接口/client/query-server
         * @param server_id
         */
        queryServer(server_id: string)
        {
            var args = "?server_id=" + server_id;
            this.doGet(EnumHttpApi.query_server, args)
        }

        /**
         * 查询角色信息接口/client/query-player
         * @param server_id
         */
        queryPlayer(server_id: string)
        {
            var args = "?plat_type=" + PlatformData.pid + "&data=" + ThirdMgr.server_token + "&server_id=" + server_id;
            this.doGet(EnumHttpApi.query_player, args)
        }

        /**
         * 区服列表接口/client/server-list
         * @param sflag
         */
        serverList()
        {
            var args = "?plat_type=" + PlatformData.pid;
            var sflag: string = "";
            if (PlatformData.isAudit)
            {
                sflag = "audit";
            }
            if (PlatformData.channelId == PlatformData.EnumChannelId.SUPER)
            {
                sflag = PlatformData.channelId;
            }
            if (sflag != "")
            {
                args += "&sflag=" + sflag
            }
            this.doGet(EnumHttpApi.server_list, args)
        }

        /**
         * 查询历史登陆服务器接口/client/query-last-server
         */
        queryLastServer(server_id: number)
        {
            var args = "?plat_type=" + PlatformData.pid + "&server_id=" + server_id + "&data=" + ThirdMgr.server_token;
            this.doGet(EnumHttpApi.query_last_server, args)
        }

        /**
         *  帐号登陆接口/client/login
         * @param parms
         */
        login(parms: string)
        {
            let args: string = "?plat_type=" + PlatformData.pid + parms;
            this.doGet(EnumHttpApi.login, args)
        }

        /**
         * gm登录
         * @param uid
         * @param platformid
         * @param plat_name
         * @param time
         * @param sign
         */
        loginByGm(uid: string, platformid: string, plat_name: string, time: string, sign: string)
        {
            let args: string = `?uid=${ uid }&plat_type=${ platformid }&time=${ time }&sign=${ sign }&flag=inner`;
            this.doGet(EnumHttpApi.login, args)
        }

        /**
         * 测试帐号注册接口/client/test-register
         * @param account
         * @param psw
         */
        testReister(account: string, psw: string)
        {
            let args: string = `?account=${ account }&password=${ psw }`;
            this.doGet(EnumHttpApi.test_register, args)
        }


        doGet(api: EnumHttpApi, argsStr: string)
        {
            var url = this.apiRoot + api + argsStr;
            logD("httpServer:" + url)
            var http: ApiRequest = new ApiRequest();
            http.api = api;
            http.setResponseType(Laya.Loader.JSON)
            http.getRequest(url, this, this.onRequestBack);
        }

        onRequestBack(api: EnumHttpApi, statue: number, data)
        {
            if (statue == 0)
            {
                if (api == EnumHttpApi.bulletin)
                {
                    NoticeDataMgr.onGetNoticeData(data);
                }
                else if (api == EnumHttpApi.server_list)
                {
                    ServerListDataMgr.onGetServerList(data);
                }
                else if (api == EnumHttpApi.query_server)
                {
                    ServerListDataMgr.resetHostState(data.data)
                }
                else if (api == EnumHttpApi.query_last_server)
                {
                    ServerListDataMgr.onQueryLastServer(data)
                }
                else if (api == EnumHttpApi.query_player)
                {
                    ServerListDataMgr.onQueryPLayer(data)
                }
                EventMgr.trigger(api, statue, data);
            } else
            {
                //网络错误
            }
        }
    }
    export var HttpServer = new HttpApi();
}