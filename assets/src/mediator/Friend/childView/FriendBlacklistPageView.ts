module Pro
{
    /**
    * 好友界面：黑名单分页视图
    * @author jason.xu
    */
    export class FriendBlacklistPageView extends ProUI.Friend.ChildView.BlacklistPageViewUI implements ITableView
    {

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {

        }

        public addEvent(): void
        {
            EventMgr.on(EventNotify.Friend_Blacklist_Update, this, this.onUpdateList);
            EventMgr.on(EventNotify.Friend_Blacklist_Add, this, this.onAddBlackList);
        }

        public removeEvent(): void
        {
            EventMgr.off(EventNotify.Friend_Blacklist_Update, this, this.onUpdateList);
            EventMgr.off(EventNotify.Friend_Blacklist_Add, this, this.onAddBlackList);
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
            this.onUpdateList();
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
        }

        public setData($data: any): void
        {

        }
        /** 添加黑名单 */
        private onAddBlackList(value: Pb_God.PBPlayerFriendInfo): void
        {
            this.imgListEmpty.visible = false;
            this.listView.addItem(value);
        }

        /** 列表刷新 */
        private onUpdateList(): void
        {
            let list = FriendDataMgr.getBlackList();
            let len = list.length;
            let maxCount = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Friend, Pb_God._emConstant_Friend.C_Friend_MaxBlackCount);
            this.txtCount.text = Global.getLangStr("friend_msg13", len, maxCount);

            this.imgListEmpty.visible = len <= 0;
            this.listView.onRefresh(len, this, this.onRefreshListItem);
        }

        private onRefreshListItem(tempUI: ProUI.Friend.ChildView.BlacklistItemViewUI, index: number): void
        {
            let data = FriendDataMgr.getBlackList()[index];
            tempUI.txtNickname.text = data.display.playername;
            tempUI.txtOnlineTime.text = Global.getOfflineTimeString(data.offlinetime,tempUI.txtOnlineTime,"#5d565d");
            tempUI.txtFightValue.text = data.fightpower + "";
            tempUI.txtFightDesc.text = Global.getLangStr("common_fightPower");
            tempUI.viewPlayerIcon.setPlayerDisplayInfo(data.display);
            tempUI.btnDel.onClick(this, () =>
            {
                FriendSend.delBlack(data.display.playerid);
            });
        }

        /** 页签组件销毁 */
        public dispose(): void
        {

        }
    }
}