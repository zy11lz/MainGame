module Pro
{
    /**
    * 好友界面：我的好友分页视图
    * @author jason.xu
    */
    export class FriendMyFriendPageView extends ProUI.Friend.ChildView.MyFriendPageViewUI implements ITableView
    {
        /** 当前是否打开删除好友的状态 */
        private _isDeleteState = false;

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {

        }

        public addEvent(): void
        {
            EventMgr.on(EventNotify.Friend_FriendList_Update, this, this.onUpdateFriendList);
            EventMgr.on(EventNotify.Friend_Single_Update, this, this.onUpdateSingleFriend);
            EventMgr.on(EventNotify.PlayerItemNumChange, this, this.onItemNumChange);

            this.btnDel.onClick(this, this.onClickDel);
            this.btnAddFriend.onClick(this, this.onClickAddFriend);
            this.btnCancelDel.onClick(this, this.onClickCancelDel);
            this.btnQuickSend.onClick(this, this.onClickQuickSend);
        }

        public removeEvent(): void
        {
            EventMgr.off(EventNotify.Friend_FriendList_Update, this, this.onUpdateFriendList);
            EventMgr.off(EventNotify.Friend_Single_Update, this, this.onUpdateSingleFriend);
            EventMgr.off(EventNotify.PlayerItemNumChange, this, this.onItemNumChange);
        }

        /** 点击删除好友 */
        private onClickDel(): void
        {
            this.changeDeleteState(true);
            this.listView.refresh();
        }
        /** 点击取消删除好友 */
        private onClickCancelDel(): void
        {
            this.changeDeleteState(false);
            this.listView.refresh();
        }
        /** 点击一键赠送 */
        private onClickQuickSend(): void
        {
            if(FriendDataMgr.getFriendList().length <= 0)
            {
                TipsUtils.showTipsByLanId("friend_msg19");
            }
            
            FriendSend.autoSendPrize();
        }
        /** 点击添加好友 */
        private onClickAddFriend(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_AddFriend), BaseBackUIType.HideBackUI);
        }

        private changeDeleteState(isDelState: boolean): void
        {
            this._isDeleteState = isDelState;
            this.btnCancelDel.visible = this._isDeleteState;
            this.btnDel.visible = !this._isDeleteState;
        }


        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
            this.changeDeleteState(false);
            this.onUpdateFriendList();
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

        /** 单个好友更新 */
        private onUpdateSingleFriend(index: number, friendInfo: Pb_God.PBPlayerFriendInfo): void
        {
            // let item = this.listView.getItem(index) as Pb_God.PBPlayerFriendInfo;
            // if (!item || item.display.playerid != friendInfo.display.playerid) return;
            this.listView.setItem(index, friendInfo);
        }

        /** 好友列表更新 */
        private onUpdateFriendList(): void
        {
            let list = FriendDataMgr.getFriendList();
            let len = list.length;
            let maxCount = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Friend, Pb_God._emConstant_Friend.C_Friend_MaxFriendCount);
            this.txtFriendCount.text = Global.getLangStr("friend_msg15", len, maxCount);

            this.imgListEmpty.visible = len <= 0;
            this.listView.onRefresh(len, this, this.onRefreshListItem);
        }

        private onRefreshListItem(tempUI: ProUI.Friend.ChildView.MyFriendItemViewUI, index: number): void
        {
            // let data = this.listView.getItem(index) as Pb_God.PBPlayerFriendInfo;
            let data = FriendDataMgr.getFriendList()[index];
            tempUI.txtOnlineTime.text = Global.getOfflineTimeString(data.offlinetime,tempUI.txtOnlineTime,"#5d565d");
            tempUI.txtFightDesc.text = Global.getLangStr("common_fightPower");
            tempUI.txtFightValue.text = data.fightpower + "";
            tempUI.txtNickname.text = data.display.playername;

            tempUI.viewPlayerIcon.setPlayerDisplayInfo(data.display);

            tempUI.btnDel.visible = this._isDeleteState;
            tempUI.btnSend.visible = !this._isDeleteState;
            tempUI.btnPrivateChat.visible = !this._isDeleteState;
            tempUI.btnSend.disabled = FriendDataMgr.isSendPrize(data.display.playerid);
            tempUI.btnDel.onClick(this, () =>
            {
                //二次确认
                let alertDes = Global.getLangStr("friend_msg16"); //好友删除后，将清空聊天记录，是否删除好友？";
                AlertShow.showConfirmAlert(alertDes, this, () =>
                {
                    FriendSend.delFriend(data.display.playerid);
                }, "common_delete");
            });
            tempUI.btnSend.onClick(this, () =>
            {
                FriendSend.sendPrize(data.display.playerid);
            })
            tempUI.btnPrivateChat.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Chat, [Pb_God._emBroadcast_Channel.BroadcastChannel_Player, data.display]), BaseBackUIType.CloseBackUI);
            })

        }

        /** 页签组件销毁 */
        public dispose(): void
        {

        }
    }
}