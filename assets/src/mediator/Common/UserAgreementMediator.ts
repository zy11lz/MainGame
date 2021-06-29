module Pro
{
    /**
     * 界面说明： 用户协议（附加参数 1-用户协议  2-用户协议+隐私协议）
     */
    export class UserAgreementMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Scene.Login.UserAgreementUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas('xinzeng')];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Scene.Login.UserAgreementUI, 0);
        }

        public closeUI(): void
        {
            super.closeUI();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.panel1.vScrollBarSkin = this.UIPanel.panel2.vScrollBarSkin = "";
            this.UIPanel.tabGrp.onClick(this, this.onClickTabGrp,
                [new component.UITabData("login_info_msg4"), new component.UITabData("login_info_msg5")],
                [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]
            );
            //先隐藏 等资源加载完
            this.UIPanel.box1.visible = this.UIPanel.box2.visible = false;
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.setShowDesc(Global.getLangStr("tips_msg68"));
            let url = "";
            if (this.UIOpenData.customObject == 2)
            { //用户协议
                let index = this.UIOpenData.customObject2 ? this.UIOpenData.customObject2 : 1;
                this.UIPanel.tabGrp.setSelectTab(index - 1);
            } else
            { //公告

                url = `res/useragree/${this.getUserAgreeDirectory()}/top.txt`;
                Laya.loader.load(url, Laya.Handler.create(this, this.onLoadConfigHandler), null, Laya.Loader.TEXT);
            }

            this.UIPanel.box1.visible = this.UIOpenData.customObject == 1;
            this.UIPanel.box2.visible = !this.UIPanel.box1.visible;

        }

        private getUserAgreeDirectory(): string
        {
            if (StringUtils.isNotEmpty(PlatformData.agreement))
            {
                return PlatformData.agreement;
            }
            return "wx_cx"
        }

        private onClickTabGrp(tab: component.UITab, newIndex: number, oldIndex: number)
        {
            let url
            if (newIndex > 0)
            {
                url = `res/useragree/${this.getUserAgreeDirectory()}/secret.txt`;
            } else
            {
                url = `res/useragree/${this.getUserAgreeDirectory()}/user.txt`;
            }
            Laya.loader.load(url, Laya.Handler.create(this, this.onLoadConfigHandler), null, Laya.Loader.TEXT);
        }

        private onLoadConfigHandler(strContent): void
        {
            this.setShowDesc(strContent);
            // if (this.UIOpenData.customObject == 1)  //公告兼容
            //     strContent = strContent.replace(/[\n]/g, "<br>"); //换行换成html的格式

        }

        /**
         *
         * @param str 直接赋值就完事了
         */
        private setShowDesc(str: string)
        {
            if (this.UIOpenData == null)
            {
                return;
            }
            str = StringUtils.formatPlatDescString(str);
            let html = this.UIOpenData.customObject == 1 ? this.UIPanel.html1 : this.UIPanel.html2;
            let panel = this.UIOpenData.customObject == 1 ? this.UIPanel.panel1 : this.UIPanel.panel2;
            html.showText = str;
            Laya.timer.frameOnce(1, this, () =>
            {
                html.height = html.htmlDivElement.height;
                panel.refresh();
                panel.scrollTo(0);
            })

        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.knowBtn.onClick(this, this.OnknowClick)
            this.UIPanel.noUseBtn.onClick(this, this.OnNoUseClick)
            this.UIPanel.agreetBtn.onClick(this, this.OnAgreeClick)
            this.UIPanel.btnClose.onClick(this, this.onCloseClick);
        }

        private onCloseClick()
        {
            if (this.UIOpenData.customObject == 1)
            {
                EventMgr.trigger(EventNotify.User_Agreement, false);
                if (PlatformData.isExitAppOnDegree())
                {
                    ThirdMgr.sdkSystem.exitApp();
                }

            }
            this.closeUI();
        }

        private OnknowClick()
        {
            this.closeUI();
        }

        private OnNoUseClick()
        {
            EventMgr.trigger(EventNotify.User_Agreement, false);
            this.closeUI();
            if (PlatformData.isExitAppOnDegree())
            {
                ThirdMgr.sdkSystem.exitApp();
            }
        }

        private OnAgreeClick()
        {
            EventMgr.trigger(EventNotify.User_Agreement, true);
            this.closeUI();
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

    }
}