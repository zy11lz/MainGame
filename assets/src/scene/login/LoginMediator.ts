
module Pro
{
    var RegUtils = Public.RegUtils;

    /*
     * 登录界面
     */
    export class LoginMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        public UIPanel: ProUI.Scene.Login.MainUI;

        /** 自动登陆 */
        private autoLogin: boolean = true;

        // /** 登陆按钮或第三方显示的按钮对象 */
        // private enterBtn = null;

        /** 开始按钮的呼吸动画 */
        private btnTween: Laya.Tween;

        private _isLoginSuccess: boolean = false;

        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("login"), PlatformData.loginBg];//登录模块，先加载背景，再让sdk登录，防止 sdk登录时，整个程序要暂停(无法加载资源)，导致背景图无法显示
        }

        public autoUnLoadOtherRes(): Array<string>
        {
            return [UrlMgr.getUnpackUrl("loading/PreLoadingBg.jpg")];
        }

        /** UI打开前状态 */
        public openUI(): void
        {
            this.showPanel(ProUI.Scene.Login.MainUI, 0, BaseAddLayer.BaseUI, false, 0, 0, 0, false);
        }

        /** 关闭UI*/
        public closeUI(): void
        {
            Pro.ChoiceServerUI.closeUI();
            this.closePanel(0, true, true);
            if (this.btnTween != null)
            {
                Laya.Tween.clear(this.btnTween);
                this.btnTween = null;
            }
            spine.TempletMgr.instance.disposeTemplet(Pro.UrlMgr.getSpineSceneUrl("chouka/jingbichouka/jingbichouka"))
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.adjustScreenPos();
        }

        private adjustScreenPos()
        {
            this.UIPanel.height = GameConfig.curHeight();
            this.UIPanel.y = 0;
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(EventNotify.AccountLoginSucceed, this, this.SC_ACCOUNT_LOGIN_SUCCESS);
            this.addEventMgr(EventNotify.Change_ServerSel_Succeed, this, this.refreshChoiceLoginHost);
            this.addEventMgr(EventNotify.PlatformInfo_Change, this, this.onChangePlatInfo);
            this.addEventMgr(EventNotify.HandShakeLater, this, this.ChooseLoginWay);
            this.addEventMgr(EventNotify.LoginFail, this, this.LoginFail);
            this.addEventMgr(EventNotify.User_Agreement, this, this.onAgreement);
            this.UIPanel.agreeBtn.onClick(this, this.onAgreeBtnClick);
            this.UIPanel.agreeHtml.htmlDivElement.on(Laya.Event.LINK, this, (data) =>
            {
                LinkUtils.parseHrefFunc(data);
            })
            EventMgr.on(EnumHttpApi.server_list, this, this.onServerList);
            EventMgr.on(EnumHttpApi.query_server, this, this.onQuerryServer);
            this.addEventMgr(EnumHttpApi.test_register, this, this.onTestRegister);
            this.addEventMgr(EnumHttpApi.query_last_server, this, this.onQueryLastServer);

            this.UIPanel.btnGMOn1.onClick(this, () =>
            {
                this.onGMInit(1)
            });

            this.UIPanel.btnGMOn2.onClick(this, () =>
            {
                this.onGMInit(2)
            });
        }

        onGMInit(index: number)
        {
            if (MinConsoleMgr.Inst.GMFlag1 && MinConsoleMgr.Inst.GMFlag2)
                return;
            MinConsoleMgr.Inst[`GMFlag${ index }`] = true;
            if (MinConsoleMgr.Inst.GMFlag1 && MinConsoleMgr.Inst.GMFlag2)
            {
                MinConsoleMgr.Inst.initEvent();
            }
        }

        onQueryLastServer(stat: number)
        {
            this.refreshChoiceLoginHost();
        }

        onQuerryServer()
        {
            if (this.getIsPopUp())
            {
                this.refreshChoiceLoginHost();
            }
        }
        onServerList()
        {
            var serverId: number = ServerListDataMgr.getFistServerId();
            HttpServer.queryLastServer(serverId);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
            EventMgr.off(EnumHttpApi.server_list, this, this.onServerList);
            EventMgr.off(EnumHttpApi.query_server, this, this.onQuerryServer);
        }

        /** 初始化面板UI */
        public initUI(): void
        {
            this.initAni();
            HttpServer.bulletin();
            this.onChangePlatInfo();
            this.showPingGU();
            //UI初始化
            this.UIPanel.versionNum.text = "版本号:" + GlobalData.Version;
            this.UIPanel.versionNum.y = GameConfig.getBangsTop();
            if (SystemUtils.isIos())
            {
                if (GameConfig.isBangs)
                {
                    this.UIPanel.versionNum.y += 10;
                    this.UIPanel.versionNum.x = (GameConfig.curWidth() - this.UIPanel.versionNum.width) / 2;

                }
            }
            // this.UIPanel.leftTopBox.visible = !GlobalData.isRelease || GlobalData.testServerTag;
            this.UIPanel.BGImg.scaleX = this.UIPanel.BGImg.scaleY = Math.max(Laya.stage.width / GameConfig.WinWidth, Laya.stage.height / GameConfig.WinHeight);

            //切换账号按钮
            this.UIPanel.btnpersonCenter.layoutEnabled = this.UIPanel.btnpersonCenter.visible = this.showPersonCenterBtn();
            this.UIPanel.btnUserAgreement.layoutEnabled = this.UIPanel.btnUserAgreement.visible = this.UIPanel.agreeBtn.visible = this.UIPanel.agreeBox.visible = this.isShowArgee();
            // this.UIPanel.btnUserAgreement.visible = false;
            //公告按钮
            this.UIPanel.btnNotice.layoutEnabled = this.UIPanel.btnNotice.visible = true;
            this.UIPanel.btnChoiceServer.visible = false;
            this.refreshRightTopBtnLayout();

            this.UIPanel.btnpersonCenter.onClick(this, this.OpenPerSonCenter);
            this.UIPanel.btnChoiceServer.onClick(this, this.OnOpenChoiceServer);
            this.UIPanel.btnEnterGame.onClick(this, this.onClickEnterBtn);

            this.UIPanel.btnNotice.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Notice));
            });
            this.UIPanel.btnUserAgreement.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_UserAgreement, 2, 1));
            });

            //加入自定义{id#ip:Port#platType}登陆
            this.UIPanel.TestServerBox.visible = !GlobalData.isRelease;
            this.UIPanel.TestServerBtn.onClick(this, this.onClickTestBtn);
            if (!this.agreeBeforeSdkLogin())
            {
                //调用平台登陆
                if (!ThirdMgr.server_token)
                {
                    this.UIPanel.btnChoiceServer.visible = false;
                    Laya.lateTimer.frameOnce(20, this, this.platLogin)
                }
            }


            var conchConfig = window["conchConfig"];
            var PlatformClass = window["PlatformClass"];
            if ((conchConfig && PlatformClass) || GameConfig.runTime == RunTimeType.vivo_miniGame)
            {
                SoundMgr.Inst().playMusicByType(ScenceSoundType.LOGIN)
            } else
            {
                //非native环境下设置字体（native环境的字体打在包里面了）
                Laya.loader.load("font/腾祥嘉丽大圆简.ttf", Laya.Handler.create(this, this.ttfLoadComplete, null, true), null, Laya.Loader.TTF);
            }

            if (this.isShowArgee())
            {

                this.UIPanel.Descript.text = "";
                if (StringUtils.isNotEmpty(PlatformData.agreement))
                {
                    let url = `res/useragree/${ PlatformData.agreement }/ruanZhu.txt`;
                    Laya.loader.load(url, Laya.Handler.create(this, this.onLoadConfigHandler), null, Laya.Loader.TEXT);
                }
                this.initUserAgreement();
            }
            else
            {
                if (PlatformData.platformType == PlatformData.EnumPlatformType.chuang_sheng)
                {
                    this.UIPanel.Descript.text = "出版单位： 北京伯通电子出版社 批文号：新广出审[2017]1633号 \n ISBN:978-7-7979-5161-6 运营单位：北京月宝盒信息科技有限公司\n 著作权人：苏州美生元信息科技有限公司 软著登记号：2016SR047381"
                } else if (PlatformData.pid == 2122042)
                {
                    this.UIPanel.Descript.text = " 出版单位：华东师范大学电子音像出版社有限公司\n  批文号：新广出审[2017]9107号 ISBN:978-7-498-02028-4 \n 著作权人：南京蓝狐科技发展有限公司 软著登记号：2017SR362413"
                }
                else
                {
                    this.UIPanel.Descript.text = Global.getLangStr("login_info_msg");
                }
            }
        }

        private showPersonCenterBtn()
        {
            if (PlatformData.pid == PlatformData.EnumPlatformId.xiangwan)
            {
                //特殊渠道，凤阳 xiangwan不显示
                return false;
            }
            if (GameConfig.isInWebview)
            {
                //ios 使用webview
                return true;
            }
            if (!GlobalData.isRelease)
            {
                //非发布版本
                return true;
            }
            if (PlatformData.platVarSelfLogin)
            {
                //游戏账号登录，显示方便切账号
                return true;
            }
            if (SystemUtils.isWeb())
            {
                //外网网页版不显示
                return false;
            }
            return true;
        }

        showPingGU()
        {
            if (PlatformData.pid == PlatformData.EnumPlatformId.pingu)
            {
                var data = new Date();
                // 2021-05-10 08:00:00 之前都弹提示
                if (data.getTime() < 1620604800000)
                {
                    AlertShow.showSimpleAlert("5月10日 10:00 正式开服，敬请期待");
                }
            }
        }


        private onLoadConfigHandler(strContent: string)
        {
            this.UIPanel.Descript.text = strContent;
        }
        /**
         * 用户协议
         */
        private initUserAgreement()
        {
            let userAgreementOpenFlag = Laya.LocalStorage.getItem("userAgreementOpenFlag");
            let userAgreementAgreeFlag = Laya.LocalStorage.getItem("userAgreementAgreeFlag");
            //判断是否第一次 第一次弹窗
            if (PlatformData.notPopAgreement <= 0)
            {
                if (PlatformData.isExitAppOnDegree())
                {
                    //如果是绿州的渠道，不设置同意，下次进来还弹
                    if (userAgreementAgreeFlag != "1")
                    {
                        UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_UserAgreement, 1));
                    }
                }
                else
                {
                    if (userAgreementOpenFlag != "1")
                    {
                        UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_UserAgreement, 1));
                    }
                    Laya.LocalStorage.setItem("userAgreementOpenFlag", "1");
                }

            }
            if (this.agreeBeforeSdkLogin())
            {
                this.UIPanel.userAgreeFlag.visible = false;
            }
            else
            {
                //读取上一次的状态
                this.UIPanel.userAgreeFlag.visible = Laya.LocalStorage.getItem("userAgreementAgreeFlag") == "1";
            }
        }

        private onAgreeBtnClick()
        {
            this.setAgreement(!this.UIPanel.userAgreeFlag.visible);
        }

        /**
         * 用户协议操作 不同意的话去掉勾
         */
        private onAgreement(flag: boolean)
        {

            if (this.agreeBeforeSdkLogin())
            {
                if (flag)
                {
                    //调用平台登陆
                    if (!ThirdMgr.server_token)
                    {
                        this.UIPanel.btnChoiceServer.visible = false;
                        Laya.lateTimer.frameOnce(20, this, this.platLogin)
                    }
                }
            }
            this.setAgreement(flag);
        }

        /**
         *  sdk登录之前必需同意协议
         * @private
         */
        private agreeBeforeSdkLogin()
        {
            return false;
        }
        private setAgreement(flag: boolean)
        {
            Laya.LocalStorage.setItem("userAgreementAgreeFlag", flag ? "1" : "0");
            this.UIPanel.userAgreeFlag.visible = flag;
        }

        private platLogin()
        {
            if (GameVersionUpdater.instance.checkOneVersionIng)
            {
                return;
            }
            if (GameVersionUpdater.instance.mustCheckVersion)
            {
                GameVersionUpdater.instance.mustCheckVersion = false;
                GameVersionUpdater.instance.startOneCheckVersion(this.platLogin.bind(this));
                return;
            }

            if (PlatformData.platVarSelfLogin)
            {
                if (LoginServerMgr.getLocalAccount() == null || LoginServerMgr.getLocalAccount() == "")
                {
                    PopUpManager.popUpUIAction(this.UIPanel.accountMsgBox, 0);
                    this.UIPanel.btnpersonCenter.layoutEnabled = this.UIPanel.btnpersonCenter.visible = false;
                    this.refreshRightTopBtnLayout();
                    this.UIPanel.btnRegist.onClick(this, this.OnRegistbtnClick);
                    this.UIPanel.btnLogin.onClick(this, this.OnLoginbtnClick);
                    this.UIPanel.inputAccount.text = LoginServerMgr.getLocalAccount();
                    this.UIPanel.inputPsw.text = LoginServerMgr.getLocalPassword();
                    return;
                }
            }
            this.toLogin();
        }

        ttfLoadComplete()
        {

            Laya.Text.defaultFont = "腾祥嘉丽大圆简";
            EventMgr.trigger(EventNotify.TTF);
            if (this.UIPanel)
            {
                this.UIPanel.serverNameLB.font = "腾祥嘉丽大圆简";
                // this.UIPanel.versionNum.font = "腾祥嘉丽大圆简";
                this.UIPanel.labtip.font = "腾祥嘉丽大圆简";
                this.UIPanel.labPersonCentreAccount.font = "腾祥嘉丽大圆简";
                this.UIPanel.labbindEmailTips.font = "腾祥嘉丽大圆简";
                this.UIPanel.ChangePswTips.font = "腾祥嘉丽大圆简";
                this.UIPanel.labBindEmailTips.font = "腾祥嘉丽大圆简";
                this.UIPanel.Descript.font = "腾祥嘉丽大圆简";

                SoundMgr.Inst().playMusicByType(ScenceSoundType.LOGIN)
            }
        }

        /**
         * 初始化骨骼动画
         */
        private initAni()
        {
            if (PlatformData.platformType == PlatformData.EnumPlatformType.wx_cx)
            {
                this.UIPanel.BGImg.skin = "wxlocal/img/loading-3.jpg";
            } else
            {
                this.UIPanel.BGImg.skin = PlatformData.loginBg;
                if (!PlatformData.hideLoginAnimation)
                {

                    if (GameConfig.useNewLoginSk)
                    {
                        let node = new SkeletonPlayer();
                        node.pos((GameConfig.WinWidth >> 1) - 380, (GameConfig.WinHeight >> 1) - 80);
                        this.UIPanel.BGImg.addChild(node);
                        node.playByIndex(0, true);
                        node.load(Pro.UrlMgr.getSpineSceneUrl("loading/denglu/51denglutu"));

                        // let img = new Laya.Image();
                        // img.skin = "res/Unpack/loading/di.png";
                        // img.width = GameConfig.WinWidth
                        // img.centerX = 0;
                        // img.bottom = 0;
                        // this.UIPanel.BGImg.addChild(img);
                    }
                    else
                    {
                        let node = new SkeletonPlayer();
                        node.pos((GameConfig.WinWidth >> 1) - 120, (GameConfig.WinHeight >> 1) - 80);
                        this.UIPanel.BGImg.addChild(node);
                        node.playByIndex(0, true);
                        node.load(Pro.UrlMgr.getSpineSceneUrl("chouka/jingbichouka/jingbichouka"));
                    }
                }

            }


            let to = { scaleX: 1.05, scaleY: 1.05 };
            let target = this.UIPanel.btnEnterGame;
            this.btnTween = Laya.Tween.to(target, to, 1000, (t: number, b: number, c: number, d: number) =>
            {
                t = Math.sin(t / d * Math.PI * 2) * d;
                return Laya.Ease.linearNone(t, b, c, d);
            });
            this.btnTween.repeat = 0;
        }

        /** 平台信息变更 */
        private onChangePlatInfo(): void
        {

            //服务器维护中，直接拉取服务器列表
            if (!NetMonitorMgr.Inst.serverMaintainBackLogin)
            {
                if (ServerListDataMgr.isFixHostDatas)
                {
                    return;
                }
            }
            NetMonitorMgr.Inst.serverMaintainBackLogin = false;
            //获取公告弹出方式，判断是否直接弹出来
            // this.requestNoticePopupCfg();
            //公告
        }

        /** 拉取更新当前服务器状态 */
        private requestUpdateServerState(): void
        {
            HttpServer.queryServer(ServerListDataMgr.loginHostId)
        }

        private onClickEnterBtn(): void
        {
            this.showPingGU();
            if (this.isShowArgee() && !this.UIPanel.userAgreeFlag.visible)
            {
                TipsUtils.showTipsByLanId("login_info_msg2");
                return
            }
            this.comfilmEnter();
        }

        private isShowArgee(): boolean
        {
            return PlatformData.platformType == PlatformData.EnumPlatformType.test
                || PlatformData.platformType == PlatformData.EnumPlatformType.wx_cx
                || PlatformData.platformType == PlatformData.EnumPlatformType.wx_cx_h5
                || StringUtils.isNotEmpty(PlatformData.agreement);
        }

        private comfilmEnter(): void
        {
            if (ThirdMgr.server_token == null)
            {
                this.platLogin();
                return;
            }
            let hostInfo = ServerListDataMgr.getLoginHostInfo();
            if (!hostInfo)
            {
                if (ServerListDataMgr.isInitServerList)
                {
                    TipsUtils.showTipsByLanId("服务器列表初始化中,请稍后再试");
                } else
                {
                    AlertShow.showSimpleAlert(PlatformData.pid + "服务器未开启");
                }
                return;
            }

            if (hostInfo.status == ServerStat.close) //  0
            {
                // 0 未开放
                this.requestUpdateServerState();
                AlertShow.showSimpleAlert("当前服务器未开放");
                return;
            }
            if (hostInfo.status == ServerStat.hot_close) //  3
            {
                //3 火+未开放
                this.requestUpdateServerState();
                AlertShow.showSimpleAlert(Global.getLangStr("loginErrorTips7"));
                return;
            }
            if (hostInfo.status == ServerStat.normal_close) // 4
            {
                //4 正常+未开放
                this.requestUpdateServerState();
                AlertShow.showSimpleAlert(Global.getLangStr("loginErrorTips5"));
                return;
            }
            ThirdMgr.sdkSystem.trackCustomEvent(CustomEventType.GAME_START);
            this.OpenAccountLogin();
        }

        private onClickTestBtn(): void
        {
            let tmpServerStr = this.UIPanel.TestServerInput.text;
            if (!(tmpServerStr.concat(":") && tmpServerStr.concat("#")))
            {
                return;
            }

            let tmpStrAry = tmpServerStr.split("#");
            if (tmpStrAry.length != 3)
            {
                return;
            }

            //临时改变pid
            PlatformData.pid = parseInt(tmpStrAry[2]);
            //自动选择临时测试
            ServerListDataMgr.debugAddHostData(tmpStrAry[0], tmpStrAry[1]);
            LoginServerMgr.logOut(false);

            //当前选择的服务器地址
            this.refreshChoiceLoginHost();

        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        public refreshUI(): void
        {

        }

        /** 刷新当前选择的登陆服 */
        private refreshChoiceLoginHost()
        {
            this.UIPanel.btnChoiceServer.visible = true;
            let tmpHostInfo = ServerListDataMgr.getLoginHostInfo();
            this.UIPanel.serverNameLB.text = tmpHostInfo ? tmpHostInfo.show : "";
            this.UIPanel.serverStatueFrameImg.frame = tmpHostInfo ? tmpHostInfo.status : 4;
        }

        //---------------------------------------------Event---------------------------------------------
        // 自动登陆
        private ChooseLoginWay(): void
        {
            if (!this.autoLogin)
            {
                this.LoginFail(Global.getLangStr("loginError"), -1); //登陆失败
                return;
            }
            this.autoLogin = false;

            if (LoginServerMgr.api_autoLoginIn())
            {
                return;
            }

            this.OpenAccountLogin();
        }

        // 收到登录失败的结果
        private LoginFail(failReasonStr: string = "", failReasonCode: number = 0)
        {

            //显示打开登陆时的状态
            this.UIPanel.labtip.text = failReasonStr;

            //打开账号秘密登陆页
            this.OpenAccountLogin();
        }

        //------------------------------------------收到平台登录成功的消息-------------------------------------
        /** 账号登陆成功  */
        private SC_ACCOUNT_LOGIN_SUCCESS(loginType: number)
        {
            if (loginType == 1)
            {
                LoginServerMgr.saveLoginArgs(this.UIPanel.inputAccount.text, this.UIPanel.inputPsw.text);
            }
            this.CloseAccountLogin();
        }

        //-----------------------------------------账号与密码登陆----------------------------------------------
        private OpenAccountLogin()
        {
            //平台登陆
            if (ThirdMgr.server_token == null)
            {
                this.platLogin();
            }
            else
            {
                this.SDKLogin();
            }
        }

        /** 刷新右上角按钮排序 */
        private refreshRightTopBtnLayout(): void
        {
            this.UIPanel.rightopBox.refresh();
            //微信小游戏关闭按钮会压着切换按钮所以进行一个下移
            if (GameConfig.isInWxGame())
            {
                this.UIPanel.rightopBox.top = 216;
            }
        }

        private SDKLogin()
        {
            LoginServerMgr.loging();
            this.autoLogin = true;
        }

        private localTestLogin(isRegister: boolean): void
        {
            //isRegister字段待处理
            //...

            let account = this.UIPanel.inputAccount.text;
            let psw = this.UIPanel.inputPsw.text;

            if (account.length == 0 || psw.length == 0)
            {
                this.UIPanel.labtip.text = Global.getLangStr("loginErrorTips1"); //请输入账号和密码";
                return;
            }

            if (FilterHelper.Inst.containStr(account))
            {
                this.UIPanel.labtip.text = Global.getLangStr("loginErrorTips2"); //账号包含屏蔽字";
                return;
            }
            LoginServerMgr.saveLoginArgs(account, psw);
            // LoginServerMgr.loging();
            // this.comfilmEnter();
            this.platLogin();
            this.autoLogin = true;
        }

        private OnLoginbtnClick(): void
        {
            this.localTestLogin(true);
        }

        private OnRegistbtnClick(): void
        {
            let account = this.UIPanel.inputAccount.text;
            let psw = this.UIPanel.inputPsw.text;

            if (account.length == 0 || psw.length == 0)
            {
                this.UIPanel.labtip.text = Global.getLangStr("loginErrorTips1"); //请输入账号和密码";
                return;
            }
            HttpServer.testReister(account, psw);
        }


        onTestRegister(state: number, data)
        {
            if (state == 0 && data.code == 0)
            {
                //注册成功
                this.localTestLogin(false);
            } else
            {
                TipsUtils.showTipsByLanId("http服务器返回 code:" + data.code + data.msg);
            }
        }


        private CloseAccountLogin()
        {
            PopUpManager.removeUIAction(this.UIPanel.accountMsgBox);

            this.UIPanel.btnpersonCenter.layoutEnabled = this.UIPanel.btnpersonCenter.visible = this.showPersonCenterBtn();
            this.refreshRightTopBtnLayout();
        }

        //-----------------------------------------密码和邮箱修改-----------------------------------------------
        // 更改密码
        private OpenChangePassword(): void
        {
            PopUpManager.popUpUIAction(this.UIPanel.changePswBox);
            this.UIPanel.inputOriginalPsw.text = "";
            this.UIPanel.inputNewPsw.text = "";
            this.UIPanel.ChangePswTips.text = "";

            this.UIPanel.btnCloseChangePsw.onClick(this, this.CloseChangePassword);
            this.UIPanel.btnConformChange.onClick(this, this.ConformChangePassword);
        }

        // 确定更改密码
        private ConformChangePassword(): void
        {
            let inputOriginalPsw = this.UIPanel.inputOriginalPsw.text;
            let inputNewPswcord = this.UIPanel.inputNewPsw.text;
            let confirmNewPsw = this.UIPanel.inputConfirmPsw.text;

            if (confirmNewPsw != inputNewPswcord)
            {
                this.UIPanel.ChangePswTips.text = Global.getLangStr("str_register_password_difference");
                return;
            }

            if (!RegUtils.checkStrLen(inputNewPswcord) || !RegUtils.checkStrLen(inputOriginalPsw))
            {
                this.UIPanel.ChangePswTips.text = Global.getLangStr("str_register_password_error");
                return;
            }
        }

        // 关闭更改密码
        private CloseChangePassword(): void
        {
            PopUpManager.removeUIAction(this.UIPanel.changePswBox);
        }

        //-------------------------------------注销账号------------------------------------
        // 注销登录
        private OpenLoginOut(): void
        {
            PopUpManager.popUpUIAction(this.UIPanel.conformLoginOutBox);
            this.UIPanel.labtip.text = "";

            this.UIPanel.btnCloseLoginOut.onClick(this, this.CloseLoginOut);
            this.UIPanel.btnConformLoginOut.onClick(this, this.ConformLoginOut);
        }

        // 关闭注销登录
        private CloseLoginOut(): void
        {
            PopUpManager.removeUIAction(this.UIPanel.conformLoginOutBox);
        }

        // 二次确认注销登录
        private ConformLoginOut(): void
        {
            //关闭父节点
            PopUpManager.removeUIAction(this.UIPanel.personInfoBox);
            PopUpManager.removeUIAction(this.UIPanel.conformLoginOutBox);

            //先确定登出
            ThirdMgr.gameLogOut();
            this.platLogin();
        }

        //--------------------------------------------绑定邮箱-------------------------------------------------
        // 点击绑定邮箱
        private OpenBindEmail(): void
        {
            PopUpManager.popUpUIAction(this.UIPanel.bindEmailBox);
            this.UIPanel.inputBindEmail.text = "";
            this.UIPanel.inputBindEmailPsw.text = "";
            this.UIPanel.labBindEmailTips.text = "";

            this.UIPanel.btnConformBind.onClick(this, this.ConformBindEmail);
            this.UIPanel.btnCloseBindEmail.onClick(this, this.CloseBindEmail);
        }

        // 确定绑定邮箱
        private ConformBindEmail(): void
        {
            let account = this.UIPanel.inputBindEmail.text;
            let psw = this.UIPanel.inputBindEmailPsw.text;

            if (RegUtils.checkEmail(account))
            {
                if (!RegUtils.checkStrLen(psw))
                {
                    this.UIPanel.labBindEmailTips.text = Global.getLangStr("str_register_password_error");
                    return;
                }
                //Public.BaseAPI.CS_ACCOUNT_BIND(LoginServerMgr.PassPortId,LoginServerMgr.Token,account,psw);
            }
            else
            {
                this.UIPanel.labBindEmailTips.text = Global.getLangStr("emailFormat");
            }
        }

        // 关闭绑定邮箱
        private CloseBindEmail(): void
        {
            PopUpManager.removeUIAction(this.UIPanel.bindEmailBox);
        }

        //--------------------------------------------个人中心-------------------------------------------------
        // 打开个人中心
        private OpenPerSonCenter(): void
        {
            // 平台登陆用平台切换账号
            if (!PlatformData.platVarSelfLogin)
            {
                ThirdMgr.sdkSystem.logout('OpenPerSonCenter');

                if (this.needLoginOnOpenPersonCenter())
                {

                    this.toLogin();
                }
                return;
            }

            PopUpManager.popUpUIAction(this.UIPanel.personInfoBox);

            this.UIPanel.labbindEmailTips.visible = false;
            this.UIPanel.btnBindEmail.visible = false;
            this.UIPanel.btnChangePsw.visible = true;
            this.UIPanel.labPersonCentreAccount.text = Global.getLangStr("loginAccountTypeUser") + ":" + LoginServerMgr.getLocalAccount();

            this.UIPanel.btnPercenterClose.onClick(this, this.ClosePerSonCenter);
            this.UIPanel.btnChangePsw.onClick(this, this.OpenChangePassword);
            this.UIPanel.btnBindEmail.onClick(this, this.OpenBindEmail);
            this.UIPanel.btnLoginOut.onClick(this, this.OpenLoginOut);
        }

        // 关闭个人中心
        private ClosePerSonCenter(): void
        {
            PopUpManager.removeUIAction(this.UIPanel.personInfoBox);
        }

        //--------------------------------------------选择服务器-------------------------------------------------

        /**
         * 选择游戏服务器
         */
        private OnOpenChoiceServer(): void
        {
            ChoiceServerUI.show(this.UIPanel);
        }

        toLogin()
        {

            if (ThirdMgr.isLogin)
            {
                //如果 isGameLoginIng=true，是不能再调用sdk登录的,会在这里返回
                TipsUtils.showTipsByLanId("账号登录中...请稍后再试");
                return;
            }
            ThirdMgr.callSdkLogin(this.onLoginPlatform, this);
        }

        /**
         * 登陆平台结果
         * @param succeed
         */
        private onLoginPlatform(succeed: boolean)
        {
            if (succeed)
            {
                this._isLoginSuccess = true;
                if (PlatformData.platVarSelfLogin)
                {

                    this.refreshChoiceLoginHost();
                    PopUpManager.removeUIAction(this.UIPanel.accountMsgBox);
                } else
                {
                    HttpServer.serverList();
                }
            }
        }

        private needLoginOnOpenPersonCenter()
        {
            //安卓里需要调用登录，才会弹出切换账号面板
            let isIos = SystemUtils.isIos();
            if (isIos)
            {
                if (PlatformData.isQ1sdk())
                {
                    //q1 ios只要退出登录，就会打开登录面板,所以不需要再打开登录
                    return false;
                }
            }
            return true;
        }
    }
}