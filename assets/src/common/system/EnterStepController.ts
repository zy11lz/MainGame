module Pro
{
    class EnterStepController_cls
    {
        private _isResReady: boolean = false;
        private _isPlayerDataReady: boolean;
        start(mainVersion: number = -1, versionObj: Object = null, strSearch: string = "")
        {
            Polyfill.setup();
            //微信不需要
            if (!GameConfig.isInWxGame())
            {
                NativeCommonSystem.Inst; //勿删，生成实例，并注册Native侦听
            }
            SystemUtils.initTextOffset();
            VersionControl.ins.init(versionObj);
            Laya.URL.customFormat = VersionControl.ins.addVersionPrefix;
            GlobalData.MainVersion = mainVersion;
            //设置为适配UI的原尺寸
            MinConsoleMgr.Inst.init();
            Laya.SoundManager.autoReleaseSound = false;
            GlobalData.isPringNetMsg = true;
            Laya.stage.frameRate = Laya.Stage.FRAME_FAST;
            Laya.loader.maxLoader = 10;
            if (window["__CONFIG__"] != null)
            {
                GlobalData.isRelease = true;
            }
            //初始化平台相关的参数
            PlatformData.initData(window["__CONFIG__"], strSearch);
            LoadingUI.ins.show(Laya.stage);
            this.initEngine();
            //一贞之后加载
            Laya.timer.frameOnce(1, this, this.startLoad);
        }

        public completeStep(loadStep: LoadStep)
        {
            EventMgr.trigger(loadStep.stepName);
        }

        initEngine()
        {
            if (!GlobalData.isRelease && Laya["setText"] != null)
            {
                Laya["setText"](Pro.FlyTexture2D);
            }
            //设置进入自动图集的图片尺寸(目前目标就是缓存图标)
            // logE("自动大图设置注释了， 2.0API暂时未匹配到")
            // Laya.AtlasResourceManager.atlasLimitWidth = 125;
            // Laya.AtlasResourceManager.atlasLimitHeight = 125;
            //---------------------------------
            //Laya.AtlasResourceManager.maxTextureCount  = 3;

            Laya.Stat._StatRender = new FlyStatUI();
            Pro.Resource.polyFill();
            if (!GlobalData.isRelease)
            {
                Laya.Stat.show();
            }
            //全局引用计数激活
            CountShare.startCount();
            Laya.ClassUtils.createByJson = PolyFil.createByJson;
            common.PoolMgr.setup();
            Public.PoolMgr.setup();
            PoolTypes.init();
            RoleManager.init();
            SkelAniInit.init(SystemUtils.isIos());
            component.UISetup.getLangStr = Global.getLangStr;
            component.UISetup.recoverItem = Public.PoolMgr.recoverItem;
            component.UISetup.eventTrigger = Public.EventMgr.trigger;
            if (window["isUseFlySk"])
            {
                GameConfig.isUseFlySk = window["isUseFlySk"]
            }
        }

        public startLoad(): void
        {
            //初始化平台

            ThirdMgr.init();
            GlobalData.Version = "1.0." + GlobalData.MainVersion + "." + PlatformData.pid + "." + PlatformData.platVarAppVersion;
            //#TODO
            if (window["__CONFIG__"] != null)
            {
                PlatformData.platVarCheckVersion = false;
                GlobalData.isShowDebugInfo = false;
            }
            ExceptionsCapture.setup();
            this.refreshWinScale();
            //游戏自定义容器添加到舞台上
            Laya.stage.addChild(LayerManager.Inst);
            //初始化管理器
            this.initFrame();
            //读取本地服务器地址
            let tempLoginHost = Public.LStorageMgr.GetInst().getLocalData("loginHostId");
            if (tempLoginHost != null)
            {
                if (PlatformData.platVarSelfLogin)
                {
                    ServerListDataMgr.loginHostId = tempLoginHost;
                }
            }
            EventMgr.on(Pro.LoadStep.login_Res.stepName, this, this.onLoginResComplete);
            //进游戏之前的资源加载管理
            EntryResLoadController.ins.startLoad(new CallBack(this, this.createScene));
        }

        onLoginResComplete()
        {
            ServerDataReg.setup();
            dataMgrSetup();
            SoundMgr.Inst().init();
            //刷新stage
            Laya.stage.repaint();
            //根据最新配置初始化
            FilterHelper.Inst.init();
            EffectMgr.Inst.init();
            BangsManager.Inst.init();

            //正式进入游戏
            GlobalData.isLoadGame = true;
            Laya.stage.on(Laya.Event.RESIZE, this, this.resize);
            GameConfig.HeroStandHorSpace = cfg.ConstantClientConstantCfgData.getConstantValueByEnumIndex(13);
            GameConfig.HeroStandVelSpace = cfg.ConstantClientConstantCfgData.getConstantValueByEnumIndex(14);
            GameConfig.HeroStandGradient = cfg.ConstantClientConstantCfgData.getConstantValueByEnumIndex(15);
            if (PlatformData.platformType == PlatformData.EnumPlatformType.wx_cx)
            {
                qingjs.instance.showMenu({
                    stage: Laya.stage,
                    entryIconX: 0,  // 可选
                    entryIconY: 550,  // 可选
                })
            }
            logD("打开登录界面")
            //打开登陆界面
            EventMgr.trigger(EventNotify.Open_Login);
        }

        // 创建场景
        private createScene()
        {
            logD("所有图集加载完成")
            this._isResReady = true;
            this.tryEnterGame();
        }

        private resize()
        {
            this.refreshWinScale();
            if (GlobalData.isLoadGame == true)
            {
                EventMgr.trigger(EventNotify.Screen_Resize);
            }
        }

        /**
         * 记录stage被缩放的尺寸
         */
        private refreshWinScale()
        {
            //适配y轴偏移值
            GameConfig.screenOffY = Laya.stage.height - GameConfig.WinHeight;
        }

        //------------------------------------框架管理-----------------------------
        private initFrame()
        {
            //必须添加
            SystemSettingMgr.Inst.init();
            Global.InitEnKey(Global.getRandomNum(154096856, 999999999), 169310);

            //自定义管理
            SceneMgr.Inst.init();
            UIManager.Inst.init();
            FocusController.init();

            var isBigPackage: boolean = false;
            if (!GlobalData.isRelease)
            {
                var isBigPackageStr: string = PlatformData.getParamString("isBigPackage");
                if (isBigPackageStr)
                {
                    // eslint-disable-next-line no-alert
                    alert(isBigPackageStr);
                    isBigPackage = isBigPackageStr.toString() == "1";
                    if (isBigPackage)
                    {
                        logI("使用socket大包,使用socket大包，使用socket大包，使用socket大包")
                    }
                }
            }
            isBigPackage = true;
            //初始化服务器
            CmdMgr.setup(isBigPackage);
            NetMonitorMgr.Inst.init();
        }

        // 收到Human消息后正式的进入游戏
        public enterGame()
        {
            SceneMgr.Inst.cleanSceneRes();
            if (this._isResReady == false)
            {
                EventMgr.trigger(EventNotify.LoadingUI_Open, 1);
            }
            this._isPlayerDataReady = true;
            this.tryEnterGame();
        }


        tryEnterGame()
        {
            if (this._isResReady && this._isPlayerDataReady)
            {
                EventMgr.trigger(EventNotify.Open_Main);
                HelpSpriteController.instance.start();
            }
            this.uploadLoadEnd();

        }

        private uploadLoadEnd()
        {
            let loadStartTime = window['loadStartTime'];
            let useTime = 60;
            if (loadStartTime > 0)
            {
                let now = new Date().getTime();
                useTime = ((now - loadStartTime) / 1000) >> 0;
            }
            ThirdMgr.sdkSystem.trackCustomEvent(CustomEventType.GAME_LOAD_END, { time: useTime })
        }
    }

    export var EnterStepController = new EnterStepController_cls();
}
