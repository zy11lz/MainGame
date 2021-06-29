
module Pro.Net
{
    /*
     * 登陆数据管理器
     */
    export class LoginServerBaseMgr
    {

        /** 账号登陆状态 */
        protected _isloginSuccess: boolean = false;

        /** 玩家账号信息 */
        protected acountInfo: Pb_God.PBLoginAck;

        /** 玩家角色信息 */
        protected playerInfo: Pb_God.PBSelectPlayerAck;

        /** 玩家游戏数据 */
        protected gameInfo: any;

        // 玩家登录信息
        private _dataArgs: LoginArgs = null;

        constructor()
        {
            this.loadLoginArgs();

            EventMgr.on(CmdEvent.Player_SelectPlayer, this, this.onSelectPlayer);
            EventMgr.on(CmdEvent.Operate_Verify_Ack, this, this.onVerifyAck);
            EventMgr.on(CmdEvent.Operate_Login_Ack, this, this.onLoginAck);
            EventMgr.on(CmdEvent.Player_LoadComplete, this, this.onPlayerInfoLoadComplete);
            EventMgr.on(EventNotify.Connect_Server_Close, this, this.onSocketStatueClose);
        }

        //===========================================登陆网络状态Event=======================================
        /*****
         *选择角色返回	PBSelectPlayerAck
         * @param PBSelectPlayerAck
         * 		playerID			uint32	 玩家ID
         * 		host			string	 host
         * 		port			uint32	 网络字节端口
         * 		loginsn			int64	 登录SN
         */
        protected onSelectPlayer(value: Pb_God.PBSelectPlayerAck): void
        {
            logI("登陆账号服成功");

            this._isloginSuccess = true;
            this.playerInfo = value;
            this.connectServerByType(2); //连接游戏服
        }

        /**
         * 与服务器连接验证完成
         */
        private onVerifyAck(tempClass: Pb_God.VerifyAck)
        {
            //连接登陆服成功
            if (this.isLoginSuccess == false)
            {
                WaitPanelUtils.hideWaitPanel();
                if (GlobalData.MInScene == GlobalData.StandScene.Login)
                {
                    EventMgr.trigger(EventNotify.HandShakeLater);
                }
                else
                {
                    this.api_autoLoginIn();
                }
            }//连接游戏服成功
            else
            {
                this.api_gameLogin();
            }
        }

        /**
         * 登陆成功(账号登陆/游戏账号登陆)成功
         */
        private onLoginAck(tempClass: Pb_God.PBLoginAck | Pb_God.PBG2CLoginAck): void
        {
            if (this._isloginSuccess == false)
            {
                //记录账号数据
                this.acountInfo = tempClass as Pb_God.PBLoginAck;

                //loginType 0为游客，1为官方
                let loginType = this.acountInfo.account.passwd == "jiuwu-test" ? 0 : 1;
                EventMgr.trigger(EventNotify.AccountLoginSucceed, loginType);
            }
            else
            {
                this.onPlayerInfoLoadStart(tempClass as Pb_God.PBG2CLoginAck, Cmd.S2C_Operate_Login_Ack.cmdName);
            }
        }

        //====================================================收取角色基础数据=========================================
        /** 准备开始接受数据 */
        private onPlayerInfoLoadStart(tempClass: Pb_God.PBG2CLoginAck, serverNoId: string)
        {
            //初始化缓存数据
            this.gameInfo = {};

            //记录记录数据
            this.onPlayerInfoLoading(tempClass, serverNoId);
        }

        /** 片段数据加载 */
        public onPlayerInfoLoading(tempClass: any, serverNoId: string)
        {
            this.gameInfo[serverNoId] = tempClass;
        }

        /** 登陆游戏数据加载完成 */
        private onPlayerInfoLoadComplete()
        {

            //数据加载完成
            GlobalData.MDataLoadedData = true;

            //进入游戏成功后，后续所有的小loading都做一个切换
            WaitPanelUtils.setGameState();

            //加载玩家数据
            GameLaunch.loadData(this.gameInfo, this.acountInfo);

            //刷新界面
            EventMgr.trigger(EventNotify.ReciverLoginData);

            // 在这里可以正式的进入游戏了 发送一个事件，让界面跳转，加载主界面
            // EventMgr.trigger(EventNotify.EnterGame);
            EnterStepController.enterGame();
        }

        //====================================================普通Event==========================================
        /** 与服务器链接状态发生变化 */
        private onSocketStatueClose(statue: Public.ServerStatue)
        {
            this._isloginSuccess = false;
        }

        //====================================================外部接口==========================================
        /** 账号是否登陆成功 */
        public get isLoginSuccess(): boolean
        {
            return this._isloginSuccess;
        }

        /** 重新登陆 */
        public loging()
        {
            this._isloginSuccess = false;
            this.connectServerByType(1); //连接世界服
        }

        /** 登出 */
        public logOut(removeLoginArgs: boolean = true)
        {
            WaitPanelUtils.hideWaitPanel();
            Public.SocketManager.GameSocket.closeServer(Public.ServerStatue.Close);
            if (removeLoginArgs)
            {
                this.removeLoginArgs();
            }
            this._isloginSuccess = false;
        }

        //=================================================登陆链接Socket状态处理=================================
        /** 连接服务器
        @param type 连接类型  1-连接世界服 2-连接游戏服
        */
        private connectServerByType(type: number): void
        {
            //这里有一个服务器的坑，由于服务器连接不支持wss， 所以如果是https连接的， 就要连另外的地址去做中转
            let host = "";
            if (type == 1)
            {
                //连接世界服
                if (PlatformData.serverProxyUrl)
                {
                    host = PlatformData.serverProxyUrl + ServerListDataMgr.loginHostId + "/";
                } else
                {
                    host = ServerListDataMgr.getLoginHost();
                }
            }
            else if (type == 2)
            {
                host = this.playerInfo.host;
                if (this.playerInfo.port) { host += ":" + this.playerInfo.port; }
            }
            this.connectServer(host);
        }
        private connectServer(host: string)
        {
            if (!host)
            {
                return;
            } //异常处理， 在基础初始化都还没有完成的时候， 可能会有一些特定的方法会进来，处理异常即可
            WaitPanelUtils.showWaitPanel(false, Global.getLangStr("login_des2"));  //正在连接服务器...
            Public.SocketManager.GameSocket.on(Laya.Event.OPEN, this, this.onSocketOpen);
            // 链接到服务器
            Public.SocketManager.GameSocket.closeServer(Public.ServerStatue.Close);
            host = host.replace("wss://", "");
            Public.SocketManager.GameSocket.connectServer(host, PlatformData.isHttps);
            //表示玩家数据是否已经加载完成
            GlobalData.MDataLoadedData = false;
        }

        //连接成功返回
        private onSocketOpen(): void
        {
            this.api_verify();
        }

        //================================================登陆API=============================================
        /**
         * 使用上次的登陆方式
         */
        public api_autoLoginIn(): boolean
        {
            this.api_accountLogin();
            return true;
        }

        /** 自动选择一个角色进入游戏 */
        public api_reconnect()
        {
            if (this._isloginSuccess)
            {
                this.connectServerByType(2); //连接游戏服
            }
            else
            {
                this.loging();
            }
        }

        /* 平台登录 */
        public api_accountLogin(): void
        {
            WaitPanelUtils.showWaitPanel(false, Global.getLangStr("login_des4")); //正在登录账号...
            let tmpHostInfo = ServerListDataMgr.getLoginHostInfo();
            if (!tmpHostInfo)
            {
                return;
            }
            var pb: Pb_God.PBLoginAsk = new Pb_God.PBLoginAsk();
            pb.login = `ServerID=${ tmpHostInfo.real }&data=` + ThirdMgr.server_token;
            MinConsoleMgr.log("Login_Ask", pb.login); //记录到min控制台，通过2可调出来查看，temp tag:jason
            //这是一段非常蛋疼的代码， 不要抄。， 服务器挖的坑
            let buffer = Pb_God.PBLoginAsk.encode(pb).finish();
            Public.SocketManager.sendGameServerMsg(buffer.byteLength, Cmd.C2S_Operate_Login_Ask.main, Cmd.C2S_Operate_Login_Ask.sub, buffer);
        }

        /** 登陆游戏服 */
        public api_gameLogin()
        {
            WaitPanelUtils.showWaitPanel(false, Global.getLangStr("login_des5"));  //正在拉取数据...
            var p: Pb_God.PBC2GLoginAsk = new Pb_God.PBC2GLoginAsk();
            p.playerID = this.playerInfo.playerID;
            p.loginSN = this.playerInfo.loginsn; // this.acountInfo.account.accountflag.loginsn;
            p.bReconnet = false;
            let buffer = Pb_God.PBC2GLoginAsk.encode(p).finish();
            Public.SocketManager.sendGameServerMsg(buffer.byteLength, Cmd.C2S_Operate_Login_Ask.main, Cmd.C2S_Operate_Login_Ask.sub, buffer);
        }

        /** 与服务器握手验证 */
        public api_verify()
        {
            var ask: Pb_God.VerifyAsk = new Pb_God.VerifyAsk();
            ask.mainVersion = 99;
            ask.subVersion = 215;
            CmdMgr.pushCmd(Cmd.C2S_Operate_Verify_Ask, ask);
        }

        //=====================================本地账号信息处理===================================
        /** 读取本地登陆账号信息 */
        private loadLoginArgs(): void
        {
            let data: LoginArgs = new LoginArgs();
            data.LastOffAcnt = Public.NativeApi.getLocalData("LastOffAcnt");
            data.LastOffPsw = Public.NativeApi.getLocalData("LastOffPsw");
            if (data.LastOffAcnt == null)
            {
                data.LastOffAcnt = "";
            }
            if (data.LastOffPsw == null)
            {
                data.LastOffPsw = "";
            }
            this._dataArgs = data;
        }

        /** 保存登陆账号状态 */
        public saveLoginArgs(accounStr: string, pswStr: string)
        {
            // this.dataArgs.IsRegister = isRegister;
            // Public.NativeApi.setLocalData("IsRegister", isRegister ? "1" : "0");
            if (accounStr != null && accounStr.length > 0)
            {
                this._dataArgs.LastOffAcnt = accounStr;
                Public.NativeApi.setLocalData("LastOffAcnt", accounStr);
            }
            if (pswStr != null && pswStr.length > 0)
            {
                this._dataArgs.LastOffPsw = pswStr;
                Public.NativeApi.setLocalData("LastOffPsw", pswStr);
            }
        }

        /** 移除本地账号信息 */
        public removeLoginArgs()
        {
            Public.NativeApi.deleteLocalData("LastOffAcnt");
            Public.NativeApi.deleteLocalData("LastOffPsw");
            this._dataArgs.LastOffAcnt = "";
            this._dataArgs.LastOffPsw = "";
        }

        public getLocalAccount(): string
        {
            return this._dataArgs.LastOffAcnt;
        }

        public getLocalPassword(): string
        {
            return this._dataArgs.LastOffPsw;
        }

    }
}