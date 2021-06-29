module Pro
{
    /**
    * 界面说明：添加好友界面
    * @author jason.xu
    */
    export class AddFriendMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Friend.AddFriendUI;

        /** 点过申请加好友的 */
        private _applyMap = new ds.StringMap<boolean>();

        /** 当前显示好友 */
        private _friendIds: Array<number> = [];

        private _value: Pb_God.PBG2CFriendRefresh;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("friend")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Friend.AddFriendUI, 3, BaseAddLayer.TopUI, true, 1);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.inputNickname.prompt = Global.getLangStr("friend_msg17"); //请输入玩家姓名
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.UIPanel.inputNickname.text = "";
            this.refreshUI();
            this.UIPanel.imgListEmpty.visible = false;
            this.UIPanel.listView.visible = false;
            this.onClickRefresh();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(CmdEvent.Friend_Refresh, this, this.onRefresh);
            this.addEventMgr(CmdEvent.Friend_Search, this, this.onRefresh);

            this.UIPanel.btnRefresh.onClick(this, this.onClickRefresh);
            this.UIPanel.btnSearch.onClick(this, this.onClickSearch);
            this.UIPanel.btnAddAll.onClick(this, this.onClickAddAll);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 点击刷新 */
        private onClickRefresh(): void
        {
            //将按钮置成不可点状态，避免网络慢时玩家频繁操作
            this.UIPanel.btnSearch.disabled = true;
            this.UIPanel.btnRefresh.disabled = true;
            this._applyMap.clear();
            this._friendIds = [];

            this.UIPanel.listView.visible = false;
            this.UIPanel.txtEmptyLabel.text = Global.getLangStr("friend_msg9");//暂无推荐列表";
            this.UIPanel.txtTitle.text = Global.getLangStr("friend_msg10"); //推荐好友";

            FriendSend.refresh();
        }
        /** 点击开始查找 */
        private onClickSearch(): void
        {
            let str = this.UIPanel.inputNickname.text;
            str = str.replace(/\s*/g, ""); //去掉空白字符
            if (!str)
            {
                TipsUtils.showTipsByLanId("tips_msg25");
                return;
            }

            this.UIPanel.btnSearch.disabled = true;
            this.UIPanel.btnRefresh.disabled = true;
            this.UIPanel.listView.visible = false;
            this.UIPanel.txtEmptyLabel.text = Global.getLangStr("friend_msg7");//未搜索到玩家";
            this.UIPanel.txtTitle.text = Global.getLangStr("friend_msg8");//搜索结果";

            FriendSend.search(str);
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            let friendCount = FriendDataMgr.getFriendList().length;
            let maxCount = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Friend, Pb_God._emConstant_Friend.C_Friend_MaxFriendCount);
            this.UIPanel.txtFriendCount.text = Global.getLangStr("friend_msg6", friendCount, maxCount);
        }

        /** 一键添加好友 */
        public onClickAddAll()
        {
            this._friendIds.forEach(
                playerid =>
                {
                    if (!this._applyMap.containsKey(playerid))
                    {
                        this._applyMap.put(playerid, true);
                        FriendDataMgr.requestApplyFriend(playerid);
                    }
                });
            this.onRefresh(this._value);
            TipsUtils.showTipsByLanId("friend_msg18");
        }

        /*****
         * 	收到好友列表
         */
        protected onRefresh(value: Pb_God.PBG2CFriendRefresh): void
        {
            this._value = value;
            this.UIPanel.listView.visible = true;
            this.UIPanel.btnSearch.disabled = false;
            this.UIPanel.btnRefresh.disabled = false;
            this.UIPanel.imgListEmpty.visible = true;
            if (value && value.info)
            {
                this.UIPanel.imgListEmpty.visible = value.info.length == 0;
                this.UIPanel.listView.onRefreshWithArray(value.info, this, this.onRefreshListItem);
            }
        }


        private onRefreshListItem(tempUI: ProUI.Friend.ChildView.AddFriendItemViewUI, index: number): void
        {
            let data: Pb_God.PBPlayerFriendInfo = this.UIPanel.listView.getItem(index);
            let playerid = data.display.playerid;
            this._friendIds.push(playerid);
            tempUI.txtOnlineTime.text = Global.getOfflineTimeString(data.offlinetime, tempUI.txtOnlineTime, "#5d565d");
            tempUI.txtFightValue.text = data.fightpower + "";
            tempUI.txtFightDesc.text = Global.getLangStr("common_fightPower");
            tempUI.txtNickname.text = data.display.playername;

            tempUI.viewPlayerIcon.setPlayerDisplayInfo(data.display);

            tempUI.btnAddFriend.visible = !this._applyMap.get(playerid);
            tempUI.btnWait.visible = !!this._applyMap.get(playerid);
            tempUI.btnAddFriend.onClick(this, () =>
            {
                this._applyMap.put(playerid, true);
                tempUI.btnAddFriend.visible = false;
                tempUI.btnWait.visible = true;
                TipsUtils.showTipsByLanId("friend_msg18");
                //加为好友
                FriendDataMgr.requestApplyFriend(playerid);
            })
        }
    }
}