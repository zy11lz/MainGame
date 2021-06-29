module Pro
{
    /**
    * 神界冒险-事件:问答（准备界面
    * @author jason.xu
    */
    export class RiskEventAnswerReadyMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Risk.RiskEventAnswerReadyUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("riskevent")]
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Risk.RiskEventAnswerReadyUI, 1, BaseAddLayer.TopUI);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {

        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.refreshUI();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnEnter.onClick(this, this.onClickEnter);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 点击开始答题 */
        private onClickEnter(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RiskEventAnswer, this.UIOpenData.customObject), BaseBackUIType.CloseBackUI);
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

    }
}