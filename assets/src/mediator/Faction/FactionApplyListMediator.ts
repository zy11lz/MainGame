module Pro
{
    /**
    * 
    * 模块：公会申请列表
    *
    * @author jason.xu
    * 
    */
    export class FactionApplyListMediator extends BaseMediator implements IMediator
    {

        public UIPanel: ProUI.Faction.FactionApplyListUI;


        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Faction.FactionApplyListUI, 1);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.closePanel();
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

        /** 本类界面打开状态下监听消息列表 */
        public addEvent(): void
        {
            this.addEventMgr(EventNotify.Faction_ApplyList_Update, this, this.onApplyListUpdate);

            this.UIPanel.btnClose.onClick(this, this.closeUI);
        }

        /** 本类界面打开状态下监听消息列表 */
        public removeEvent(): void
        {

        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            this.UIPanel.listView.visible = false;
            this.UIPanel.imgEmpty.visible = false;
            FactionSend.queryApplyList();
        }

        /** 列表刷新 */
        private onApplyListUpdate(list: Pb_God.PBFactionApplyData[]): void
        {
            this.UIPanel.listView.visible = true;
            this.UIPanel.imgEmpty.visible = list.length <= 0;
            this.UIPanel.listView.onRefresh(list.length, this, this.onRefreshListItem);
        }

        private onRefreshListItem(tempUI: ProUI.Faction.ChildView.FactionApplyItemViewUI, index: number): void
        {
            let data = FactionDataMgr.getFactionApplyList()[index];
            if (!data) logE("tag!!");  //监控，有异常就有鬼。

            tempUI.txtNickname.text = data.base.displayer.playername;
            tempUI.viewPlayerIcon.setPlayerDisplayInfo(data.base.displayer, true, true);

            Global.getOfflineTimeString(data.base.lastlogouttime, tempUI.txtOnline);

            //接受
            tempUI.btnAccept.onClick(this, () =>
            {
                FactionSend.agreeApply(data.base.displayer.playerid, true);
            });
            //忽略
            tempUI.btnIgnore.onClick(this, () =>
            {
                FactionSend.agreeApply(data.base.displayer.playerid, false);
            })
        }

    }
}