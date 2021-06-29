module Pro
{
    /**
     * 界面说明： 公告界面（附加参数 1-最新公告  2-用户协议）
    * @author jason.xu
    */
    export class NoticeMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Scene.Login.NoticeUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Scene.Login.NoticeUI, 0, undefined, true);
        }
        public closeUI(): void
        {
            super.closeUI();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            //纵向滚动
            this.UIPanel.panel.vScrollBarSkin = "";
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.UIPanel.tabGrp.visible = false;
            this.setShowDesc(Global.getLangStr("tips_msg68"));
            this.onBulletin();
        }

        private onClickTabGrp(tab: component.UITab, newIndex: number, oldIndex: number)
        {
            let noticeInfo: NoticeInfo = NoticeDataMgr.getNoticeByIndex(newIndex);
            if (!noticeInfo)
            {
                return;
            }
            this.UIPanel.titleLbl.text = noticeInfo.title;
            let strContent = noticeInfo.content.replace(/[\n]/g, "<br>"); //换行换成html的格式
            if (PlatformData.agreement && PlatformData.agreement == "pingu")
            {
                if (PlatformData.channelId == "oppo" || PlatformData.channelId == "vivo")
                {

                } else
                {
                    //渠道的特殊要求
                    strContent = strContent.replace("如有任何问题，请联系官方客服：349273877", "");
                }
            }
            this.setShowDesc(strContent);
        }

        /**
         *
         * @param str 直接赋值就完事了
         */
        private setShowDesc(str: string)
        {
            str = StringUtils.formatPlatDescString(str);
            str = str.replace(/\<br\/\>/g, "<br>");
            try
            {
                this.UIPanel.html.innerHTML = str;
            }
            catch (error)
            {
                logE("notice:" + error + ",str" + str);
                this.UIPanel.html.innerHTML = Global.getLangStr("tips_msg69");
            }

            Laya.timer.frameOnce(1, this, () =>
            {
                this.UIPanel.html.height = this.UIPanel.html.htmlDivElement.height;
                this.UIPanel.panel.refresh();
            })

        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            EventMgr.on(EnumHttpApi.bulletin, this, this.onBulletin)
        }

        onBulletin()
        {
            let arr = NoticeDataMgr.notiveArr;
            if (arr.length == 0)
            {
                this.setShowDesc(Global.getLangStr("tips_msg69"));
                return;
            }
            let tabs = [];
            arr.forEach(element =>
            {
                tabs.push(new component.UITabData(element.title));
            })
            //需要获取公告组 等平台定好格式再做支持
            this.UIPanel.tabGrp.visible = true;
            this.UIPanel.tabGrp.onClick(this, this.onClickTabGrp,
                tabs,
                [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]
            );
            this.UIPanel.tabGrp.setSelectTab(0);


        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
            EventMgr.off(EnumHttpApi.bulletin, this, this.onBulletin)
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

    }
}