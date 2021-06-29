module Pro
{
    /**
    * 界面说明： 活动入口界面基类（目前有多个活动的主界面共用同一个视图风格，比如福利大厅，精彩活动等）， 可继承此类
    * @author jason.xu
    */
    export class ActivityMediatorBase extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.ActivityMain.ActivityMainUI;

        /** 按钮名字列表(与tabName一致) */
        private _btnNames: string[] = [];
        /** 按钮图片列表(与tabIcon一致) */
        private _btnIcon: string[] = [];
        // 数据列表
        private _pageDataList: any[][];

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("activitymain")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.ActivityMain.ActivityMainUI, 3, BaseAddLayer.CenterUI, false, 3);
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): string[]
        {
            let ret = [];
            //收集图标资源
            for (var btnIcon of this._btnIcon)
            {
                ret[ret.length] = `res/Unpack/activityEnterBtns/${ btnIcon }.png`;
            }
            //收集子类需要释放的
            let childList = this.autoChildUnLoadOtherRes();
            if (childList && childList.length > 0)
            {
                ret = ret.concat(childList);
            }

            return ret;
        }

        /** 子类有资源需要释放的，请继承此方法 */
        protected autoChildUnLoadOtherRes(): string[]
        {
            return [];
        }

        public closeUI(): void
        {
            Laya.Tween.clearTween(this.UIPanel.grpTurnBar);
            super.closeUI()
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            //将滑块移到滚动条内部
            this.UIPanel.grpTurnBar.removeSelf();
            this.UIPanel.tabGrp.content.addChild(this.UIPanel.grpTurnBar);
            this.UIPanel.grpTurnBar.y = 0;

            this.UIPanel.tabGrp.onRenderRefresh(this, this.onTabItemRender);
            this.UIPanel.pageViewContainer.onClick(this, this.onChangeTab)

            this.adjustScreenPos();
        }

        private adjustScreenPos()
        {
            this.setUIBG("res/Unpack/uibg/jpg_huodong.jpg");
            // this.UIPanel.topBox.top = -GameConfig.screenOffY / 2 + GameConfig.getBangsTop();
            // this.UIPanel.height = GameConfig.curHeight();
            // this.UIPanel.y = GameConfig.getBangsTop();
            // this.UIPanel.y = this.UIPanel.y + GameConfig.getBangsTop() - GameConfig.screenOffY/2;
        }

        /** 页签刷新 */
        private onTabItemRender(item: component.UIButton, index: number)
        {
            let btnIcon = this._btnIcon[index];
            let icon = item.getChildByName("icon") as Laya.Image;
            let bg = item.getChildByName("frameBg") as component.UIFrameImage;
            bg.frame = index == this.UIPanel.tabGrp.tabIndex ? 2 : 1;
            icon.skin = `res/Unpack/activityEnterBtns/${ btnIcon }.png`;
        }

        private onChangeTab(index: number, tabName: string): void
        {
            let item = this.UIPanel.tabGrp.getCell(index);
            Laya.Tween.clearTween(this.UIPanel.grpTurnBar);
            //滑块滑过来
            if (item.x != this.UIPanel.grpTurnBar.x)
            {
                Laya.Tween.to(this.UIPanel.grpTurnBar, { x: item.x }, 150);
            }

            this.UIPanel.pageViewContainer.setTableViewData(tabName, this._pageDataList[index][4]);
        }


        /** 获取分页列表，可在此方法中筛选正在开启中的活动 每个列表元素为一个数组结构：
         * [分页名(对应中文包名activity_title_XXX), 按钮图片名（空值时表示与分页名相同），分页视图类名，红点model，传给分页的参数] 
         * */
        protected getPageDataList(): any[][]
        {
            logE("子类请重写！");  //可参考WealHallMediator.getPageDataList的写法
            return null;
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this._pageDataList = this.getPageDataList();  //[pagename,btnName,classname, reddot]
            let redDotModes = [];
            let tabBarDatas: TableBarContinerData[] = [];
            this._btnNames = [];
            this._btnIcon = [];
            for (var pageData of this._pageDataList)
            {
                let lanKey = "activity_title_" + pageData[0];
                //如果找不到语言包，则恢复原状显示
                let text = Global.getLangStr(lanKey);
                if (text == lanKey) lanKey = pageData[0];
                tabBarDatas.push(new TableBarContinerData(lanKey, pageData[0], pageData[2], pageData[4], pageData[5]));
                //名字和图片没有分开，导致想打开传进来的默认窗口时，找不到对应的name打不开对应的窗口，下面对名字和图片做了区分
                // this._btnNames.push(pageData[1] || pageData[0]);
                this._btnNames.push(pageData[0]);
                this._btnIcon.push(pageData[1]);
                redDotModes.push(pageData[3]);
            }

            //默认切换到指定分页
            let defaultIndex = this.getDefaultTabIndex();

            //分页视图
            this.UIPanel.pageViewContainer.initData(this.UIPanel.tabGrp, tabBarDatas,
                [new component.UITabStyle("#616465"), new component.UITabStyle("#f54961")], defaultIndex);
            //注册红点列表
            this.UIPanel.tabGrp.setRedDotModelList(redDotModes);

            //this.UIPanel.tabGrp.scrollTo(defaultIndex);
            //this.UIPanel.tabGrp.setSelectTab(defaultIndex);
        }

        protected getDefaultTabName(): string
        {
            return this.UIOpenData.customObject;
        }

        /** 获取默认打开的分页(子类可重写此方法重定义打开默认分页的方式) */
        protected getDefaultTabIndex(): number
        {
            let defaultIndex = 0;
            let defaultTabName = this.getDefaultTabName();
            if (defaultTabName)
            { //用分页名字来指定，而不是index，因为index随活动的开启状态，不准确
                defaultIndex = this._btnNames.indexOf(defaultTabName);
                if (defaultIndex < 0) defaultIndex = 0;
            }
            return defaultIndex;
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.onClickClose);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 子类可重写返回按钮的回调 */
        protected onClickClose(): void
        {
            this.closeUI();
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

    }
}