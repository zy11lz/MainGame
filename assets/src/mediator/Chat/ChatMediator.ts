module Pro
{
    export class ChatMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Chat.MainUI;

        /** 选择聊天数据列表 */
        private ChoiceChatAry: Pb_God.PBG2CTalkAck[];

        /** 当前选择项的对应聊天channel */
        private ChoiceChannelIDAry = [
            Pb_God._emBroadcast_Channel.BroadcastChannel_Province,
            Pb_God._emBroadcast_Channel.BroadcastChannel_Cross,
            Pb_God._emBroadcast_Channel.BroadcastChannel_World,
            Pb_God._emBroadcast_Channel.BroadcastChannel_Faction,
            Pb_God._emBroadcast_Channel.BroadcastChannel_Player,
            Pb_God._emBroadcast_Channel.BroadcastChannel_System];

        /** 当前选择的频道 */
        private ChoiceChannelID: number = 0;

        /** 当前准备私聊得玩家列表 */
        private ChoicePrivateList: Array<Pb_God.PBPlayerDisplay>;

        /** 当前选择得私人聊天ID */
        private ChoicePrivateInfo: Pb_God.PBPlayerDisplay = null;

        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            let arr = [];
            for (var index = 1; index <= 45; index++)
            {
                arr.push(`res/Unpack/face/face_${ index }.png`)
            }
            arr.push(UrlMgr.getAtlas("chat"), UrlMgr.getAtlas("xinzeng"));
            return arr;
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Chat.MainUI, 3, BaseAddLayer.TopUI);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            Laya.timer.clearAll(this);
            this.closePanel(4);
            ChatDataMgr.setBoradChannel(0, null);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            let tmpTabDataAry = [];
            this.ChoiceChannelIDAry.forEach(elment =>
            {
                tmpTabDataAry.push(new component.UITabData("boradcast_name_" + elment));
            });
            this.UIPanel.tabGrp.onClick(this, this.chatTabOnClick, tmpTabDataAry,
                [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]
            );
            this.UIPanel.tabGrp.hScrollBarSkin = "";
            this.UIPanel.tabGrp.onRenderRefresh(this, (itemUI: component.UIButton, index: number) =>
            {
                let tmpChannelID = this.ChoiceChannelIDAry[index];
                let tmpRedDotImg = itemUI.getChildByName("RedDotImg") as Laya.Image;
                let disabled = false;
                if (tmpChannelID == Pb_God._emBroadcast_Channel.BroadcastChannel_Faction && !FactionDataMgr.isHaveFaction())
                {
                    disabled = true;
                }
                itemUI.disabled = disabled;
                tmpRedDotImg.visible = ChatDataMgr.getUnCherkWithChannel(tmpChannelID) > 0;
            });

            this.UIPanel.CloseBtn.onClick(this, this.closeUI);

            this.UIPanel.ChatList.onClick(ChatDataMgr.LimitShowNum, this, this.onChatBlinkClick);

            this.UIPanel.PrivateAddBtn.onClick(this, () =>
            {
                //先关闭 避免已打开的情况
                UIManager.Inst.closeByName("FriendMediator");
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Friend), BaseBackUIType.CloseBackUI);
            });
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(EventNotify.Chat_Message_New, this, this.Chat_Message_New);
            this.addEventMgr(EventNotify.Chat_Message_ReCall,this,this.Chat_ReCall);
            this.addEventMgr(EventNotify.Friend_Delete, this, this.onFriendDeleteHandler);
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

            this.UIPanel.InputLayer.init();
            this.ChoicePrivateList = ChatDataMgr.getPrivatePlayerList();

            if (this.UIOpenData.customObject == null)
            {
                this.UIPanel.tabGrp.setSelectTab(this.ChoiceChannelIDAry.indexOf(Pb_God._emBroadcast_Channel.BroadcastChannel_World));
            }
            else
            {
                let tmpChannelType = this.UIOpenData.customObject[0] as number;
                if (tmpChannelType == Pb_God._emBroadcast_Channel.BroadcastChannel_Player)
                {
                    let tmpPlayerInfo = this.UIOpenData.customObject[1] as Pb_God.PBPlayerDisplay;
                    let tmpPlayerResults = this.ChoicePrivateList.filter(elment => elment.playerid == tmpPlayerInfo.playerid);
                    if (tmpPlayerResults.length == 0)
                    {
                        this.ChoicePrivateList.push(tmpPlayerInfo);
                    }
                    this.ChoicePrivateInfo = tmpPlayerInfo;
                }
                this.UIPanel.tabGrp.setSelectTab(this.ChoiceChannelIDAry.indexOf(tmpChannelType));
            }
        }

        public refreshUI()
        {

        }

        /** 选择聊天类型 */
        private chatTabOnClick(tab: component.UITab, index: number)
        {
            this.ChoiceChannelID = this.ChoiceChannelIDAry[index];

            //区分私聊
            if (this.ChoiceChannelID == Pb_God._emBroadcast_Channel.BroadcastChannel_Player)
            {
                this.filterPrivatePlayerList();
                // this.UIPanel.ChatBGImg.height = 610;
                // this.UIPanel.ChatBGImg.y = 408;
                this.UIPanel.ChatList.top = 170;
                // this.UIPanel.priBg.visible = true;
                this.ChoicePrivateInfo = this.ChoicePrivateList.length > 0 ? this.ChoicePrivateList[0] : null;
            }
            else
            {
                // this.UIPanel.ChatBGImg.height = 773;
                // this.UIPanel.ChatBGImg.y = 245;
                this.UIPanel.ChatList.top = 14;
                // this.UIPanel.priBg.visible = false;
                this.ChoicePrivateInfo = null;
            }

                //刷新列表
                this.refreshDataList();
        }

        /** 筛选私聊好友列表（剔除掉已经不再是好友的玩家） */
        private filterPrivatePlayerList(): void
        {
            let len = this.ChoicePrivateList.length;
            for (var i = len - 1; i >= 0; i--)
            {
                let player = this.ChoicePrivateList[i];
                if (!FriendDataMgr.getFriendInfo(player.playerid)) { this.ChoicePrivateList.splice(i, 1); }
            }
        }

        /** 刷新玩家列表 */
        refreshDataList()
        {
            //设置聊天类型
            this.UIPanel.InputLayer.setBoradChannel(this.ChoiceChannelID, this.ChoicePrivateInfo);
            ChatDataMgr.setBoradChannel(this.ChoiceChannelID, this.ChoicePrivateInfo != null ? this.ChoicePrivateInfo.playerid : 0);

            //刷新Tab红点
            this.UIPanel.tabGrp.refresh();

            //设置聊天信息类别
            if (this.ChoiceChannelID != Pb_God._emBroadcast_Channel.BroadcastChannel_Player)
            {
                this.UIPanel.PrivateChatList.visible = false;
                this.UIPanel.PrivateAddBtn.visible = false;
            }
            else
            {
                this.UIPanel.PrivateChatList.visible = this.ChoicePrivateList.length > 0;
                this.UIPanel.PrivateAddBtn.visible = this.ChoicePrivateList.length == 0;
                this.UIPanel.PrivateChatList.onRefresh(this.ChoicePrivateList.length, this, this.onPrivateChatRenderer);
            }

            //获取聊天数据
            this.ChoiceChatAry = ChatDataMgr.getDataWithChannel(this.ChoiceChannelID, this.ChoicePrivateInfo);

            //聊天记录为空
            this.UIPanel.ChatEmptyImg.visible = this.ChoiceChatAry.length == 0;

            //聊天记录刷新
            this.UIPanel.ChatList.setContentSize(this.UIPanel.ChatList.width, this.UIPanel.ChatList.height);
            this.UIPanel.ChatList.removeAllItems();
            for (let i = this.ChoiceChatAry.length - 1; i >= 0; i--)
            {
                if (this.ChoiceChatAry.length > 50)
                {
                    Laya.timer.frameOnce(this.ChoiceChatAry.length - i, this, this.addChatByFrame, [this.ChoiceChatAry[i]], false);

                }
                else
                {
                    this.addChatByFrame(this.ChoiceChatAry[i]);
                }
            }
            this.UIPanel.ChatList.scrollToLast(false);
        }

        private addChatByFrame(arg)
        {
            ChatDataMgr.addChatUI(arg, this.UIPanel.ChatList);
        }

        /** 刷新列表 */
        private onPrivateChatRenderer(itemUI: ProUI.Chat.ItemPrivateUI, index: number)
        {
            let tmpPlayerInfo = this.ChoicePrivateList[index];
            if (tmpPlayerInfo == null)
            {
                return
            }
            itemUI.RedDotImg.visible = ChatDataMgr.getUnCherkPlayerTotleNum(tmpPlayerInfo.playerid) > 0;
            itemUI.CoverImg.visible = tmpPlayerInfo.playerid == this.ChoicePrivateInfo.playerid;
            itemUI.IconInfo.setPlayerDisplayInfo(tmpPlayerInfo, true, false);
            itemUI.NameLb.text = tmpPlayerInfo.playername;
            itemUI.DelBtn.onClick(this, () =>
            {
                AlertShow.showConfirmAlert(Global.getLangStr("friend_msg11"), this, () =>
                {  //确定要删除该好友的所有聊天记录吗？"
                    ChatDataMgr.deletePrivateChatWithID(tmpPlayerInfo.playerid);
                    this.ChoicePrivateList.splice(index, 1);
                    if (tmpPlayerInfo == this.ChoicePrivateInfo)
                    {
                        this.ChoicePrivateInfo = this.ChoicePrivateList.length > 0 ? this.ChoicePrivateList[0] : null;
                        this.refreshDataList();
                    }
                }, "common_delete", "common_cancel");
            });
            itemUI.onClick(this, () =>
            {
                this.ChoicePrivateInfo = tmpPlayerInfo;
                this.refreshDataList();
            });
        }

        /** 点击聊天超链接 */
        private onChatBlinkClick(chat: component.UIChat, chatInfo: Pb_God.PBG2CTalkAck, msg: string)
        {
            LinkUtils.parseHrefFunc(msg, this);
        }

        //------------------------------------Event-----------------------------------
        /** 收到新消息 */
        private Chat_Message_New(tempClass: Pb_God.PBG2CTalkAck)
        {
            if (tempClass.channel != this.ChoiceChannelID)
            {
                this.UIPanel.tabGrp.refresh();
                return;
            }

            if (this.ChoiceChannelID == Pb_God._emBroadcast_Channel.BroadcastChannel_Player)
            {
                let tmpTargetInfo = tempClass.playerdisplay;
                if (tmpTargetInfo.playerid == PlayerDataMgr.uid)
                {
                    tmpTargetInfo = tempClass.targetdisplay;
                }
                if (this.ChoicePrivateInfo == null)
                {
                    this.UIPanel.tabGrp.activeCurrentTab();
                }
                else if (this.ChoicePrivateInfo.playerid == tmpTargetInfo.playerid)
                {
                    ChatDataMgr.addChatUI(tempClass, this.UIPanel.ChatList);
                }
                else
                {
                    this.UIPanel.PrivateChatList.onRefresh(this.ChoicePrivateList.length, this, this.onPrivateChatRenderer);
                }
            }
            else
            {
                ChatDataMgr.addChatUI(tempClass, this.UIPanel.ChatList);
            }

            //聊天记录为空
            this.UIPanel.ChatEmptyImg.visible = false;
        }

        private Chat_ReCall()
        {
            this.refreshDataList();
        }

        /** 好友删除（私聊时需要移除） */
        private onFriendDeleteHandler(playerId: number): void
        {
            //在私聊分页才处理
            if (this.ChoiceChannelID != Pb_God._emBroadcast_Channel.BroadcastChannel_Player)
            { return; }
            let len = this.ChoicePrivateList.length;
            for (var i = len - 1; i >= 0; i--)
            {
                let player = this.ChoicePrivateList[i];
                if (player.playerid == playerId)
                {
                    this.ChoicePrivateList.splice(i, 1);
                    break;
                }
            }

            let tmpChoicePrivateId = this.ChoicePrivateInfo != null ? this.ChoicePrivateInfo.playerid : 0;
            if (tmpChoicePrivateId == playerId)
            {  //如果当前选了此人，则需重新选定
                this.ChoicePrivateInfo = this.ChoicePrivateList.length > 0 ? this.ChoicePrivateList[0] : null;
                this.refreshDataList();
            }
        }
    }
}