module Pro
{
    /**
    * 好友界面：领取礼物分页视图
    * @author jason.xu
    */
    export class FriendGiftPageView extends ProUI.Friend.ChildView.GiftPageViewUI implements ITableView
    {

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {

        }

        public addEvent(): void
        {
            EventMgr.on(EventNotify.Friend_RecievePrize_Update, this, this.onUpdateList);
            EventMgr.on(EventNotify.PlayerItemNumChange, this, this.onItemNumChange);

            //一键领取
            this.btnQuickAccept.onClick(this, () =>
            {
                FriendSend.autoRecievePrize();
            });
        }

        public removeEvent(): void
        {
            EventMgr.off(EventNotify.Friend_RecievePrize_Update, this, this.onUpdateList);
            EventMgr.off(EventNotify.PlayerItemNumChange, this, this.onItemNumChange);
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
            this.onUpdateList();
            this.txtLoveCount.text = "" + Global.getItemNum(Pb_God._emExpendType.ExpendType_FrendShip);
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
        }

        public setData($data: any): void
        {

        }

        /** 礼物数变化 */
        private onItemNumChange(fID: number, tempNewNum: number): void
        {
            if (fID == Pb_God._emExpendType.ExpendType_FrendShip)
            {
                this.txtLoveCount.text = "" + tempNewNum;
            }
        }

        /** 列表刷新 */
        private onUpdateList(): void
        {
            let list = FriendDataMgr.getRecieveList();
            let len = list.length;
            this.txtCount.text = Global.getLangStr("friend_msg14", len);
            this.imgListEmpty.visible = len <= 0;
            this.listView.onRefresh(len, this, this.onRefreshListItem);
        }


        private onRefreshListItem(tempUI: ProUI.Friend.ChildView.GiftItemViewUI, index: number): void
        {
            let data = FriendDataMgr.getRecieveList()[index];

            tempUI.txtNickname.text = data.display.playername;
            tempUI.txtOnlineTime.text = Global.getOfflineTimeString(data.offlinetime,tempUI.txtOnlineTime,"#5d565d");
            tempUI.txtFightValue.text = data.fightpower + "";
            tempUI.txtFightDesc.text = Global.getLangStr("common_fightPower");
            tempUI.viewPlayerIcon.setPlayerDisplayInfo(data.display);

            tempUI.btnReturnSend.disabled = FriendDataMgr.isSendPrize(data.display.playerid);
            tempUI.btnAccept.onClick(this, () =>
            {
                FriendSend.recievePrize(data.display.playerid);
            });
            tempUI.btnReturnSend.onClick(this, () =>
            {
                FriendSend.sendPrize(data.display.playerid);
                tempUI.btnReturnSend.disabled = true;
            })
        }

        /** 页签组件销毁 */
        public dispose(): void
        {

        }
    }
}