module Pro
{
    /**
    * 好友界面：好友申请列表分页视图
    * @author jason.xu
    */
    export class FriendApplyListPageView extends ProUI.Friend.ChildView.ApplyListPageViewUI implements ITableView
    {

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {

        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public addEvent(): void
        {
            EventMgr.on(EventNotify.Friend_Apply_Update, this, this.onUpdateList);
            this.btnOneKeyOp.onClick(this, this.onClickOp);
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public removeEvent(): void
        {
            EventMgr.off(EventNotify.Friend_Apply_Update, this, this.onUpdateList);
        }

        /** 一键添加 */
        private onClickOp(): void
        {
            if (this.imgListEmpty.visible)
            {
                TipsUtils.showTipsByLanId("ui_Friend_msg16");
                return;
            }
            for (var el of FriendDataMgr.getApplyList())
            {
                FriendSend.agreeAddFriend(el.display.playerid);
            }
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
        /** 列表刷新 */
        private onUpdateList(): void
        {
            let list = FriendDataMgr.getApplyList();
            let len = list.length;
            let maxCount = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Friend, Pb_God._emConstant_Friend.C_Friend_MaxApplyCount);
            this.txtCount.text = Global.getLangStr("friend_msg12", len, maxCount);

            this.imgListEmpty.visible = len <= 0;
            this.listView.onRefresh(len, this, this.onRefreshListItem);
        }

        private onRefreshListItem(tempUI: ProUI.Friend.ChildView.ApplyItemViewUI, index: number): void
        {
            let data = FriendDataMgr.getApplyList()[index];
            tempUI.txtOnlineTime.text = Global.getOfflineTimeString(data.offlinetime,tempUI.txtOnlineTime,"#5d565d");
            tempUI.txtFightValue.text = data.fightpower + "";
            tempUI.txtFightDesc.text = Global.getLangStr("common_fightPower");

            tempUI.txtNickname.text = data.display.playername;
            tempUI.viewPlayerIcon.setPlayerDisplayInfo(data.display);
            tempUI.btnAgree.onClick(this, () =>
            {
                FriendSend.agreeAddFriend(data.display.playerid);
            });
            tempUI.btnRefuse.onClick(this, () =>
            {
                FriendSend.delApply(data.display.playerid);
            });
        }

        /** 页签组件销毁 */
        public dispose(): void
        {

        }
    }
}