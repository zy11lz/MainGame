module Pro
{
    /**
    * 界面说明：系统设置
    * @author jason.xu
    */
    export class SystemSettingMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.PlayerInfo.SystemSettingUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("setting")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.PlayerInfo.SystemSettingUI, 1, BaseAddLayer.TopUI, true);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            //退出按钮
            if (conch || window["__ExitGameFunc__"])
            {
                //app环境也没有退出的意义
                this.UIPanel.btnExitGame.visible = false;
                this.UIPanel.btnChangeLogin.x = 500;
            } else
            { //非app环境没有退出的意义
                this.UIPanel.btnExitGame.visible = false;
                this.UIPanel.btnChangeLogin.x = 500;
            }
            //账号切换按钮，只有在特定的环境下出现
            if (SystemUtils.isWeb())
            {
                this.UIPanel.btnChangeLogin.visible = false;
                //如果是37web下，需要入口参数中change_account_switch为2时才显示切换账号按钮
                // this.UIPanel.btnChangeLogin.visible = PlatformData.locationData["change_account_switch"] == 2;
            } else
            {
                this.UIPanel.btnChangeLogin.visible = true;
            }
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.UIPanel.txtUID.text = PlayerDataMgr.uid + "";
            let serverInfo = ServerListDataMgr.getLoginHostInfo();
            this.UIPanel.txtServerName.text = serverInfo.show || serverInfo.real;
            this.UIPanel.btnQuality.visible = false;
            this.refreshUI();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);

            this.UIPanel.btnMusic.onSelectChange(this, this.onClickCheckBtn);
            this.UIPanel.btnSound.onSelectChange(this, this.onClickCheckBtn);
            this.UIPanel.btnVoice.onSelectChange(this, this.onClickCheckBtn);
            this.UIPanel.btnQuality.onSelectChange(this, this.onClickQualityCheckBtn);
            this.UIPanel.btnAttackVerify.onSelectChange(this, this.onClickCheckBtn);

            this.UIPanel.btnShare.onClick(this, this.onClickShare);
            this.UIPanel.btnCDKey.onClick(this, this.onClickCDKey);
            this.UIPanel.btnRecommend.onClick(this, this.onClickRecommend);
            this.UIPanel.btnBug.onClick(this, this.onClickBug);

            this.UIPanel.btnExitGame.onClick(this, this.onClickExitGame);
            this.UIPanel.btnChangeLogin.onClick(this, this.onClickChangeLogin);

            // this.UIPanel.btnTest1.onClick(this, this.onClickTest1);
            // this.UIPanel.btnTest2.onClick(this, this.onClickTest2);
        }

        // /** 给测试提供一个特殊入口（目前用于测试报错弹窗的问题，模拟一个报错） */
        // private _testIndex = 0;
        // private onClickTest1(): void {
        //     //左边先4下，右边6下，再左边5下。
        //     if (this._testIndex < 4 || (this._testIndex >= 10 && this._testIndex < 15)) {
        //         this._testIndex++;
        //     } else {
        //         this._testIndex = 0;
        //     }
        // }
        // private onClickTest2(): void {
        //     if (this._testIndex >= 4 && this._testIndex < 10) {
        //         this._testIndex++;
        //     } else {
        //         this._testIndex = 0;
        //     }
        // }

        // private throwerror(): void {
        //     this.UIOpenData.customObject.test.test = "test";
        // }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 点击切换复选按钮 */
        private onClickCheckBtn(btn: Pro.CheckButton): void
        {
            let type = parseInt(btn.name);
            let isCheck = btn.isSelected;
            SystemSettingMgr.Inst.resetSettingValue(type, isCheck ? 1 : 0);
        }
        /** 点击切换复选按钮 */
        private onClickQualityCheckBtn(btn: Pro.CheckButton): void
        {
            let type = parseInt(btn.name);
            let isCheck = btn.isSelected;
            if (isCheck)
            {
                AlertShow.showConfirmAlert_Two(Global.getLangStr("heightQualityMusicAlert"), this, () =>
                {
                    SystemSettingMgr.Inst.resetSettingValue(type, isCheck ? 1 : 0);
                    btn.setSelect(true);
                }, () =>
                {
                    btn.setSelect(false);
                })
            }
            else
            {
                SystemSettingMgr.Inst.resetSettingValue(type, isCheck ? 1 : 0);
            }
        }

        /** 点击游戏分享 */
        private onClickShare(): void
        {

        }

        /** 点击礼包兑换 */
        private onClickCDKey(): void
        {
            // if (this._testIndex == 15)
            //     this.throwerror()
            // else
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_CDKeyExchange), BaseBackUIType.HideBackUI);
            // this._testIndex = 0;
        }

        /** 点击推荐码 */
        private onClickRecommend(): void
        {

        }

        /** 点击Bug反馈 */
        private onClickBug(): void
        {

        }

        /** 点击退出游戏 */
        private onClickExitGame(): void
        {
            ThirdMgr.onExitGame();
        }

        /** 点击切换账号 */
        private onClickChangeLogin(): void
        {
            ThirdMgr.onSdkLogOut();
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            this.setCheckBtn(this.UIPanel.btnMusic, "setting_msg1", SystemSettingType.Music);
            this.setCheckBtn(this.UIPanel.btnSound, "setting_msg2", SystemSettingType.Sound);
            this.setCheckBtn(this.UIPanel.btnVoice, "setting_msg3", SystemSettingType.Voice);
            this.setCheckBtn(this.UIPanel.btnQuality, "setting_msg4", SystemSettingType.Quality);
            this.setCheckBtn(this.UIPanel.btnAttackVerify, "setting_msg5", SystemSettingType.AttackVerify);
        }

        private setCheckBtn(btn: Pro.CheckButton, langId: string, settingType: number): void
        {
            btn.name = settingType + "";
            btn.setText(Global.getLangStr(langId));
            btn.setSelect(!!SystemSettingMgr.Inst.getSettingValueByType(settingType));
        }

    }
}