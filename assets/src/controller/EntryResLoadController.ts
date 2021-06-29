/* eslint-disable no-console */

module Pro
{
    /**
     * 进游戏之前的资源加载管理
     *
     *
     */
    export class EntryResLoadController
    {
        private static _ins: EntryResLoadController;

        //这里禁止增加任何加载项
        //这里禁止增加任何加载项
        //这里禁止增加任何加载项
        //这里禁止增加任何加载项
        //这里禁止增加任何加载项
        public static resConfig = {
            "login": [
                "res/atlas/res/login.atlas"
            ],
            "main": [
                "res/atlas/res/Eff_ui.atlas",
                "res/atlas/res/battle.atlas",
                "res/atlas/res/common.atlas",
                "res/atlas/res/mainui.atlas",
                "res/atlas/res/guide.atlas",
                "res/atlas/res/zhuchengMap.atlas",
                "res/atlas/res/normalEff/ui66_0.atlas"
            ],
            "mainRelease": [],
            "battle": null
        }
        //这里禁止增加任何加载项
        //这里禁止增加任何加载项
        //这里禁止增加任何加载项
        //这里禁止增加任何加载项

        public static get ins(): EntryResLoadController
        {
            if (this._ins == null)
            {
                this._ins = new EntryResLoadController();
            }
            return this._ins;
        }

        private _completeFunc: CallBack;

        constructor()
        {

        }

        private onError(err: String): void
        {
            logI("资源加载失败: " + err);
        }

        public startLoad(completeFunc: CallBack): void
        {
            // 侦听加载失败
            Laya.loader.on(Laya.Event.ERROR, this, this.onError);
            this._completeFunc = completeFunc;
            //加载前端配置文件
            this.loadClientConfig();
        }

        /** 显示加载界面(发布环境下，在拿到外部资源目录后就可以显示，因为发布环境会提供一个小型的UI配置，无需等待ui.json) */
        private showLoadingView(): void
        {
            //设置加载进度界面
            EventMgr.trigger(EventNotify.LoadingUI_Open, 1);
        }

        private loadClientConfig(errorCount: number = 0): void
        {
            if (window["__CONFIG__"])
            {
                let cfgData = window["__CONFIG__"];
                //外部资源路径
                if (cfgData["__RES_URL__"])
                {
                    Laya.URL.basePath = cfgData["__RES_URL__"];
                }
                //背景音乐是否使用mp3
                if (cfgData["__USE_MP3__"])
                {
                    SoundMgr.musicUseMp3 = cfgData["__USE_MP3__"];
                }
                if (cfgData['hasLiuHai'])
                {
                    GameConfig.isBangs = true
                }
                if (cfgData['playerViewFlag'] == "1")
                {
                    GameConfig.isInWebview = true;
                }
                if (GameConfig.isInWxGame())
                {
                    var top = GameConfig.getBangsTop();
                    if (top > 0)
                    {
                        GameConfig.isBangs = true;
                    }
                }
                //加载前端的资源配置
                this.loadUIZipConfig();
            } else
            {
                let url = "config.json?" + Math.random();
                if (window["_URL_ROOT_"])
                {
                    url = window["_URL_ROOT_"] + url;
                }
                ResMgr.Inst.load(url, this, this.onLoadClientConfigHandler, errorCount + 1, Laya.Loader.JSON);
            }
        }

        /** 加载config.json */
        private onLoadClientConfigHandler(statue: boolean, param: any, data: any)
        {
            if (statue)
            {
                //登陆地址
                if (data["loginHostInfo"])
                {
                    ServerListDataMgr.isFixHostDatas = true;
                    ServerListDataMgr.onGetServerList(data["loginHostInfo"]);
                }
                this.loadUIZipConfig();
            } else
            {
                if (param < 1800) { Laya.timer.once(1000, this, this.loadClientConfig, [param]); }
            }
        }

        /** 检查是否可以加载压缩过的uiconfig */
        private loadUIZipConfig(): void
        {
            if (!GlobalData.isRelease)
            {
                this.loadUIJsonConfig();
                return;
            }

            ResMgr.Inst.load("res/ui.dat", this, (statue: boolean, param: any, data: ArrayBuffer) =>
            {
                if (statue)
                {
                    LoadingUI.ins.setProgress(30);
                    var uint8array = new Uint8Array(data);
                    var aaa = new Zlib.Inflate(uint8array).decompress();
                    var str = Global.Uint8ArrayToString(aaa);
                    let jsonData = JSON.parse(str);
                    this.onLoadinUIConfigComponent(true, null, jsonData);
                } else
                {
                    //出错的话，还是加载原来的吧。
                    this.loadUIJsonConfig();
                }
            }, null, Laya.Loader.BUFFER);
        }

        private loadUIJsonConfig(): void
        {
            ResMgr.Inst.load("res/ui.json", this, this.onLoadinUIConfigComponent, null, Laya.Loader.JSON);
        }

        private onLoadinUIConfigComponent(statue: boolean, param: any, data: any): void
        {
            if (statue)
            {
                View.uiMap = data;
                //与前面的tag1相响应
                if (!GlobalData.isRelease)
                {
                    this.showLoadingView();
                }
                //加载配置表
                this.configLoad();
            } else
            {
                this.onResLoadFail();
            }
        }

        private configLoad()
        {
            CfgManger.configLoad(this, this.onCfgLoadComplete);
        }

        /** 资源加载失败 */
        private onResLoadFail()
        {
            let des = Global.getLangStr("netPoor");//你的网络不佳,请切换到稳定的环境。;
            AlertShow.showConfirmAlert(des, this, () =>
            {
                this.loadUIZipConfig();
            }, "common_again", null);
        }

        /**加载配置完成 */
        private onCfgLoadComplete(statue: boolean): void
        {
            if (statue == false)
            {
                this.onResLoadFail();
                return;
            }
            LoadingUI.ins.setProgress(40);
            EnterStepController.completeStep(LoadStep.configLoad)
            this.loadLoginRes();
        }


        private loadLoginRes()
        {
            var data = EntryResLoadController.resConfig;
            ResMgr.Inst.load(data.login, this, this.loginResLoadComplete);
        }

        loginResLoadComplete(statue2: boolean)
        {
            if (statue2)
            {
                LoadingUI.ins.setProgress(50);
                EnterStepController.completeStep(LoadStep.login_Res)
                var data = EntryResLoadController.resConfig;
                ResMgr.Inst.load(data.main, this, this.firstLoadComplete);
            }
            else
            {
                this.onResLoadFail();
            }
        }

        private firstLoadComplete(statue2: boolean)
        {
            LoadingUI.ins.setProgress(100);
            if (statue2)
            {
                if (this._completeFunc)
                {
                    this._completeFunc.call();
                }
            }
            else
            {
                this.onResLoadFail();
            }
        }
    }
}