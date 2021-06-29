module Pro
{
    /**
    * 界面说明： 充值界面主页（包括充值、VIP、特权商城、每日礼包分页）
    * @author jason.xu
    */
    export class PayMainMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Pay.PayMainUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("pay")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return ["res/pay/chongzhi_yueka.jpg", "res/pay/vip_di.jpg", "res/pay/chongzhi_pic08.png", "res/pay/chongzhi_pic02.png",
                "res/pay/chongzhi_pic17.jpg"];
        }


        public openUI(): void
        {
            this.showPanel(ProUI.Pay.PayMainUI, 3);
        }

        public closeUI(): void
        {
            super.closeUI();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            //四个分页视图
            this.UIPanel.pageViewContainer.initData(this.UIPanel.tabGrp, [
                new TableBarContinerData("Pay_tab1", "pay", PayPayPageView),
                new TableBarContinerData("Pay_tab2", "vip", PayVipPageView),
                new TableBarContinerData("Pay_tab3", "monthCard", PayMonthCardPageView),
                new TableBarContinerData("Pay_tab4", "privilege", PayPrivilegeShopPageView)
            ], [new component.UITabStyle("#f13b54"), new component.UITabStyle("#ffffff")]);

            this.UIPanel.tabGrp.onRenderRefresh(this, this.onItemTabRender);
        }

        private onItemTabRender(itemUI: component.UIButton, index: number)
        {
            let frameBg = itemUI.getChildByName("frameBg") as component.UIFrameImage;
            // let frameIcon = itemUI.getChildByName("frameIcon") as component.UIFrameImage;
            let frameTextBg = itemUI.getChildByName("frameTextBg") as component.UIFrameImage;
            let isSel = index == this.UIPanel.tabGrp.tabIndex;
            frameBg.frame = index * 2 + (isSel ? 2 : 1);
            frameTextBg.frame = isSel ? 2 : 1;
        }

        /** 打开中的界面，重新设置uiopendata, 为保留以前的方案，基类不处理赋值， 有需要做更新处理的，子类可继续此方法。 */
        public resetUIOpenData(uiOpenData: BaseOpenUIData): void
        {
            this.UIOpenData = uiOpenData;
            this.openDefaultTab();
        }


        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            let redDotModes = [
                null,
                PrivilegeDataMgr.reddotModel.getChildModel("vipPage"),
                PrivilegeDataMgr.reddotModelMonthCard,
                PrivilegeDataMgr.reddotModel.getChildModel("privilegeShop"),
            ]
            this.UIPanel.tabGrp.setRedDotModelList(redDotModes);
            let PayPrivilege: PayPrivilegeShopPageView = this.UIPanel.pageViewContainer.getTableView("privilege") as PayPrivilegeShopPageView
            if (PayPrivilege.isBuyAll())
            {
                TodayRepeatOpMgr.Inst.setTag("privilegeShopOpen");
            }

            //打开默认分页
            this.openDefaultTab();
            this.refreshUI();
        }

        /** 默认打开的分页 */
        private openDefaultTab(): void
        {
            let defaultPage = this.UIOpenData.customObject || 0;
            if (this.UIOpenData.customObject2)
            {
                let tabName = this.UIPanel.pageViewContainer.getTableNameByIndex(defaultPage);
                this.UIPanel.pageViewContainer.setTableViewData(tabName, this.UIOpenData.customObject2);
                if (defaultPage == 3)
                {
                    Laya.timer.once(200, this, () =>
                    {
                        UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_PayMainHighlight, this.UIOpenData.customObject2), BaseBackUIType.None);
                    })
                }

            }
            
            if(this.UIPanel)this.UIPanel.tabGrp.setSelectTab(defaultPage);
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.addEventMgr(EventNotify.Pay_UIPage_change, this, this.onUIPageChange);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 跳转分页 */
        private onUIPageChange(pageIndex: number): void
        {
            this.UIPanel.tabGrp.setSelectTab(pageIndex);
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

    }
}