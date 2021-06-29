module Pro
{
    /**
    * 界面说明： 个人形象配置界面（包括头像、头像框、称号、形象四个类型分页）
    * @author jason.xu
    */
    export class ShapeDevMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Shape.ShapeDevUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("shapedev")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Shape.ShapeDevUI, 1, BaseAddLayer.TopUI, true, 1);
        }

        // TODO 该界面有使用大量的mask 每次new会重新创建新的mask造成爆内存
        // public closeUI(): void
        // {
        //     super.closePanel(0, true, true);  //消毁界面，否则界面内的角色显示未释放。
        // }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {

            this.UIPanel.pageViewContainer.initData(this.UIPanel.tabGroup, [
                new TableBarContinerData("shape_tab1", "head", ShapePageViewHead),
                new TableBarContinerData("shape_tab2", "headFrame", ShapePageViewHeadFrame),
                new TableBarContinerData("shape_tab3", "riskShape", ShapePageViewShape),
                new TableBarContinerData("shape_tab4", "title", ShapePageViewTitle)
            ], [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]);
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.UIPanel.tabGroup.setSelectTab(-1);
            this.UIPanel.tabGroup.setSelectTab(this.UIOpenData.customObject || 0);
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
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