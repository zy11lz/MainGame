module Pro
{
    export class GameVersionUpdater
    {
        private mustReload: boolean;//配置的要求重启
        get checkOneVersionIng(): boolean
        {
            return this._checkOneVersionIng;
        }

        set checkOneVersionIng(value: boolean)
        {
            this._checkOneVersionIng = value;
        }
        public get mustCheckVersion(): boolean
        {
            return this._mustCheckVersion;
        }

        public set mustCheckVersion(value: boolean)
        {
            this._mustCheckVersion = value;
        }
        private _mustCheckVersion: boolean;//必需检查版本更新，如果版本低于最新版本，必需更新
        private _checkOneVersionIng: boolean;//是否正在版本检查中
        private configUrl: string;
        private timerRunning: boolean = false;
        private newVersion: number = 0;

        private static _instance: GameVersionUpdater;

        public static get instance(): GameVersionUpdater
        {
            if (this._instance == null)
            {
                this._instance = new GameVersionUpdater();
            }
            return this._instance;
        }

        /**
         * 启动循环间隔时长版本检查
         */
        public startLoopCheckVersion()
        {
            this.clearIgnoreVersion();

            if (this.cantCheckVersion())
            {
                return;
            }
            this.configUrl = `${ PlatformData.versionUrl }/${ PlatformData.updateGroup }/config.json`;
            this.startTimer();
        }

        private startTimer()
        {
            if (this.timerRunning)
            {
                return;
            }
            Laya.timer.loop(PlatformData.versionCheckMinute * 60_000, this, this.onTimer);
        }
        private onTimer()
        {
            new Public.HttpManager.Http().setResponseType(Laya.Loader.JSON).getRequest(`${ this.configUrl }?t=${ Laya.timer.currTimer }`, this, (statue, retData) =>
            {
                if (statue != 0)
                {
                    this.showCantLoadVersion();
                    return;
                }
                this.newVersion = retData['version'];
                this.mustReload = Number.parseInt(retData['mustReload']) > 0;
                logE(`startLoopCheckVersion  ${ this.newVersion }-${ GlobalData.MainVersion }`);
                this.checkVersion();
            });
        }

        private checkVersion()
        {
            if (this.newVersion == GlobalData.MainVersion)
            {
                return;
            }
            if (this.mustCheckVersion || this.mustReload)
            {
                this.showMustRebootAlert();
                return;
            }

            this.selectAbleAlertVersionUpdate();

        }

        /**
         * 清除忽略的版本更新
         * @private
         */
        private clearIgnoreVersion()
        {
            Laya.LocalStorage.setItem(EnumLocalStorageKey.IGNORE_VERSION, "");
        }

        /**
         * 必需重启提示
         * @private
         */
        private showMustRebootAlert()
        {
            this.clearIgnoreVersion();
            let that = this;
            AlertShow.showConfirmAlert(Global.getLangStr("update_alert_reboot"), this, function ()
            {
                that.startReload();
            }, "update_alert_now_reboot", "", 0, 0, null, false, true, false);
        }

        /**
         * 检查到有更新，但是可以选择忽略重启
         * @private
         */
        private selectAbleAlertVersionUpdate()
        {
            let ignoreVersion = Number.parseInt(Laya.LocalStorage.getItem(EnumLocalStorageKey.IGNORE_VERSION));
            if (ignoreVersion == this.newVersion)
            {
                return;
            }
            this.stopLoopVersionCheck();
            let that = this;
            AlertShow.showConfirmAlert_Two(Global.getLangStr("update_alert_new_version", this.newVersion), this, function ()
            {
                that.startReload();

            }, function ()
            {
                that.startLoopCheckVersion();
                Laya.LocalStorage.setItem(EnumLocalStorageKey.IGNORE_VERSION, that.newVersion + "");
            }, "update_alert_now_reboot", "update_alert_ignore", 0, 0, false, true, false);
        }
        public startReload(){

            this.startLoopCheckVersion();
            ThirdMgr.reloadClient();
        }
        private stopLoopVersionCheck()
        {
            //暂停循环检查更新
            Laya.timer.clear(this, this.onTimer);
        }

        /**
         * 回到主界面登录的时候,如果服务器维护，重启了，
         * 检查一次版本号，如果客户端版本有更新，必需重启
         * @param callBack
         */
        public startOneCheckVersion(callBack: Function)
        {
            if (this.cantCheckVersion())
            {
                callBack();
                return;
            }
            this.checkOneVersionIng = true;
            this.stopLoopVersionCheck();
            new Public.HttpManager.Http().setResponseType(Laya.Loader.JSON).getRequest(`${ this.configUrl }?t=${ Laya.timer.currTimer }`, this, (statue, retData) =>
            {
                this.checkOneVersionIng = false;
                if (statue != 0)
                {
                    this.showCantLoadVersion();
                    return;
                }
                this.newVersion = retData['version'];
                logE(`startOneCheckVersion ${ this.newVersion }-${ GlobalData.MainVersion }`);
                if (this.newVersion > GlobalData.MainVersion)
                {
                    this.showMustRebootAlert();
                    return;
                }
                callBack();
                //客户端版本没有更新，继续循环间隔检查版本
                this.startLoopCheckVersion();
            });
        }

        /**
         * 加载不到版本文件时提示
         * @private
         */
        private showCantLoadVersion()
        {
            logE(`GameVersionUpdater error! configUrl:${ this.configUrl } `);
            // let that = this;
            // AlertShow.showConfirmAlert(Global.getLangStr("update_alert_no_version"), this, function ()
            // {
            //
            // }, "update_alert_now_reboot", "")
        }

        private cantCheckVersion()
        {
            return PlatformData.updateGroup <= 0 || PlatformData.versionCheckMinute <= 0 || StringUtils.isEmpty(PlatformData.versionUrl);
        }


    }
}