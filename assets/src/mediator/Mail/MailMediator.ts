module Pro
{
    export class MailMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Mail.MainUI;

        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("mail")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Mail.MainUI, 3);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.FunBox.initData(this.UIPanel.tabGrp, [
                new TableBarContinerData("mail_tab1", "record", MailRecordTabel),
                new TableBarContinerData("mail_tab2", "notice", MailNoticeTabel)
            ], [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]);
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.addEventMgr(EventNotify.Mail_Changed, this, this.refreshUI);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.UIPanel.tabGrp.setSelectTab(0);
        }

        public refreshUI()
        {
            this.UIPanel.tabGrp.activeCurrentTab();
        }
    }
}