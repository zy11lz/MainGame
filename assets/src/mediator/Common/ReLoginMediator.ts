module Pro
{
    /**
     * 提示重新登陆UI
     */
    export class ReLoginMediator extends BaseMediator implements IMediator
    {
        public UIOpenData: ReLoginOpenUIData
        public UIPanel: ProUI.Common.AlertWinUI;

        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Common.AlertWinUI, 1);
        }

        public closeUI(): void
        {
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {

        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {

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
            this.UIPanel.TitleLb.text = Global.getLangStr("common_prompt");
            this.UIPanel.DesLb.innerHTML = Global.getLangStr("login_des"); //正在同步数据...";
            this.UIPanel.SureBtn.visible = false;
            this.UIPanel.CloseBtn.visible = false;

            // if(this.UIOpenData.DailyFresh){
            //     Public.BaseAPI.CS_HUMAN_DAILY_REFRESH();
            // }
            // else{
            //     Public.BaseAPI.CS_HUMAN_SYNC_INFO();
            // }
        }

        public refreshUI()
        {

        }
    }
}