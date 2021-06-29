module Pro
{
    /**
    * 界面说明： 跨服天梯-战报界面 
    * @author jason.xu
    */
    export class LadderRecordMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Ladder.LadderRecordUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Ladder.LadderRecordUI, 1,BaseAddLayer.CenterUI,true);
        }

        public closeUI()
        {
            this.closePanel(0, true, true);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {//四个分页视图
            this.UIPanel.pageViewContainer.initData(this.UIPanel.tabGrp, [
                new TableBarContinerData("ladder_msg3", "selfPage", LadderRecordPageSelf),
                new TableBarContinerData("ladder_msg4", "niubilityPage", LadderRecordPageNiubility)
            ], [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]);

        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
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