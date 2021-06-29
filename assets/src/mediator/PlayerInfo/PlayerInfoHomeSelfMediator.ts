module Pro
{
    /**
    * 界面说明： 个人空间主界面
    * 界面与 PlayerInfoHomeOtherMediator 用了同一个UI资源，但操作与逻辑会有很大的区分
    * @author jason.xu
    */
    export class PlayerInfoHomeSelfMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.PlayerInfo.PlayerHomeUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("playerinfohome")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return ["res/playerinfohome/shape_001.png"];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.PlayerInfo.PlayerHomeUI, 1, BaseAddLayer.TopUI, true);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.tab.visible = false; //荣耀墙等功能未完善，屏蔽分页按钮
            this.UIPanel.pageViewContainer.initData(this.UIPanel.tab, [
                new TableBarContinerData("playerinfo_tab1", "baseInfo", PlayerHomePageInfoSelf),
                new TableBarContinerData("playerinfo_tab2", "glory", PlayerHomePageHonor)
            ], [new component.UITabStyle("#ffeacb", 0, "#541d00"), new component.UITabStyle("#ffffff", 3, "#541d00")]);
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.UIPanel.tab.setSelectTab(-1);
            this.UIPanel.tab.setSelectTab(this.UIOpenData.customObject || 0);
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.pageViewContainer.onClick(this, this.onClickTab);
            this.UIPanel.titleLab.on(Laya.Event.CLICK, this, this.onLabClick);
        }

        private _clickNum: number = 0;
        private _vConsole
        private onLabClick()
        {
            this._clickNum++;
            if (this._clickNum > 6)
            {
                if (this._vConsole == null)
                {
                    if (window["VConsole"])
                    {
                        this._vConsole = new VConsole();
                    }
                }
            }
            // if (this._clickNum > 20)
            // {
            //     EventMgr.trigger(EventNotify.show_gm);
            // }
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

        private onClickTab(index: number, tabName: string): void
        {
            if (index == 1) //荣誉
                this.setPageViewData(tabName, [true, PlayerDataMgr.name, ShapeDataMgr.honor, ShapeDataMgr.badgeList]);
        }

        private setPageViewData(pageName: string, data: any): void
        {
            this.UIPanel.pageViewContainer.setTableViewData(pageName, data);
        }
    }
}