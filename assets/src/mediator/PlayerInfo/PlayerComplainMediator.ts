module Pro
{
    /**
    * 界面说明：举报界面
    * @author jason.xu
    */
    export class PlayerComplainMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.PlayerInfo.PlayerComplainUI;

        private _chatSelCount = 0;
        private _selChatList: Pb_God.PBG2CTalkAck[];

        /** 正准备上报的数据(等待签名中) */
        // private _requestData: any = {};


        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        public openUI(): void
        {
            this.showPanel(ProUI.PlayerInfo.PlayerComplainUI, 1, BaseAddLayer.TopUI, true);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this._chatSelCount = 0;
            this.UIPanel.inputContent.prompt = Global.getLangStr("complain_msg2"); //点击输入原因，最多100字
            //纵向滚动
            this.UIPanel.chatPanel.vScrollBarSkin = null;
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.UIPanel.btnConfirm.frequencyClickLock = 2000;
            let seasonList = Global.getLangStr("complain_msg1").split(",");
            this.UIPanel.grpBtnReason.selectEnable = true;
            this.UIPanel.grpBtnReason.selectedIndex = 0;
            this.UIPanel.grpBtnReason.renderHandler = Laya.Handler.create(this,
                (btn: Pro.CheckButton, index: number) =>
                {
                    btn.setText(seasonList[index]);
                    btn.isSelected = index == this.UIPanel.grpBtnReason.selectedIndex;
                }, null, false);
            this.UIPanel.grpBtnReason.array = new Array(seasonList.length);

            this.refreshPlayerInfoView();

            this.refreshUI();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            // this.addEventMgr(EventNotify.test, this, this.test);
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnHelp.onClick(this, this.onClickHelp);
            this.UIPanel.btnConfirm.onClick(this, this.onClickConfirm);

            //签名返回
            // this.addEventMgr(CmdEvent.Common_Sign, this, this.onSign);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 点击帮助说明 */
        private onClickHelp(): void
        {
            CommonHelpView.showWithLangKey(this.UIPanel.btnHelp, "complain_help");
        }

        /** 点击确定 */
        private onClickConfirm(): void
        {
            //判断是否开放
            if (PlayerDataMgr.level < 20)
            {
                TipsUtils.showTipsByLanId("common_needLevel", 20);
                return;
            }
            //判断上限
            if (Global.getZeroTimeNumber(TimeController.currTimer) > Global.getZeroTimeNumber(PlayerDataMgr.lastLoginTime * 1000))
            {
                PlayerDataMgr.todayComplainCount = 0;
            } else if (PlayerDataMgr.todayComplainCount >= 10)
            {
                TipsUtils.showTipsByLanId("complain_msg3");
                return;
            }
            let seasonType = this.UIPanel.grpBtnReason.selectedIndex;
            let displayer: Pb_God.PBPlayerDisplay = this.UIOpenData.customObject;
            let playerId = displayer.playerid;
            let strInputContent = this.UIPanel.inputContent.text;
            strInputContent = strInputContent.replace(/\s*/g, ""); //去掉空白字符
            if (this._selChatList.length == 0 && !strInputContent)
            {
                TipsUtils.showTipsByLanId("complain_msg6");
                return;
            }

            /*
            account
            player_id      玩家ID
            server_id      服务器ID
            player_name      玩家名字
            report_player_id  举报玩家ID
            report_server_id  举办玩家服务器ID
            report_player_name  举报玩家名字
            reason        举报
            explain        说明
            proof        证据
            */
            //聊天证据需要组合一下
            let proofList: string[] = [];
            for (var chatInfo of this._selChatList)
            {
                let channelStr = cfg.CommonChatCfgData.getNameByChannel(chatInfo.channel);
                proofList[proofList.length] = Global.getLangStr("complain_msg4", channelStr, chatInfo.data);
            }



            // * @param accout	string	举报者账号
            // * @param playerid	uint32	举报者玩家ID
            // * @param playername	string	举报者角色名
            // * @param serverid	uint32	举报者服务器id

            // * @param rptplayerid	uint32	被举报者玩家id
            // * @param rptplayername	string	被举报者角色名
            // * @param rptserverid	uint32	被举报者服务器id
            // * @param resons	uint32	举报标签
            // * @param explain	string	举报说明
            // * @param proof	string	举报例证

            //后台要求走协议
            TalkSend.report(
                PlayerDataMgr.uname,
                PlayerDataMgr.uid,
                PlayerDataMgr.name,
                ServerListDataMgr.loginHostId,
                playerId,
                displayer.playername,
                displayer.logicworldid,
                [seasonType],
                strInputContent,
                proofList.join("\n")
            )

            var reason = Global.getLangStr("complain_msg1").split(",")[seasonType];
            CommonSend.reportLog(playerId, displayer.playername, displayer.logicworldid, reason, strInputContent, proofList.join("\n"));
            TipsUtils.showTipsByLanId("complain_msg7");
            this.closeUI();
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
        }

        /** 修改选择的聊天数据 */
        private changeChatInfo(chatInfo: Pb_God.PBG2CTalkAck, isAdd: boolean): void
        {
            if (isAdd)
            {
                this._selChatList.push(chatInfo);
            } else
            {
                let index = this._selChatList.indexOf(chatInfo);
                if (index >= 0) { this._selChatList.splice(index, 1); }
            }
        }

        /** 刷新对方信息 */
        private refreshPlayerInfoView(): void
        {
            let displayer: Pb_God.PBPlayerDisplay = this.UIOpenData.customObject;
            this.UIPanel.txtNickname.text = displayer.playername;

            //聊天列表显示
            //回收旧的
            let chatItemPool: ProUI.PlayerInfo.ItemView.ComplanChatItemUI[] = [];
            let content = this.UIPanel.chatPanel.content;
            while (content.numChildren > 0)
            {
                let item = content.removeChildAt(0) as ProUI.PlayerInfo.ItemView.ComplanChatItemUI;
                chatItemPool.push(item);
            }
            this._chatSelCount = 0;
            this._selChatList = [];
            //拉取聊天列表
            let chatList = ChatDataMgr.getPlayerAllChatList(displayer.playerid);
            let allLen = chatList.length;
            let len = allLen;
            if (len > 10) { len = 10; }
            let posY = 0;
            for (let i = chatList.length - 1; i >= allLen - len; i--)
            {
                let chatInfo = chatList[i];
                let item = chatItemPool.shift();
                if (!item) { item = new ProUI.PlayerInfo.ItemView.ComplanChatItemUI(); }
                let channelStr = cfg.CommonChatCfgData.getNameByChannel(chatInfo.channel);
                item.imgSel.visible = false;
                item.txtContent.text = Global.getLangStr("complain_msg4", channelStr, chatInfo.data);
                item.y = posY;
                content.addChild(item);
                let nh = item.txtContent.textField.height;
                if (nh < 42)
                {
                    nh = 42;
                    item.txtContent.y = 9;
                } else
                {
                    item.txtContent.y = 0;
                }
                item.height = nh;
                posY += nh + 8;
                item.btn.onClick(this, () =>
                {
                    if (item.imgSel.visible)
                    {
                        this.changeChatInfo(chatInfo, false);
                        this._chatSelCount--;
                    } else
                    {
                        if (this._chatSelCount >= 5)
                        {
                            TipsUtils.showTipsByLanId("complain_msg5", 5);
                            return;
                        }
                        this._chatSelCount++;
                        this.changeChatInfo(chatInfo, true);
                    }
                    item.imgSel.visible = !item.imgSel.visible;
                })
            }

            this.UIPanel.chatPanel.scrollTo(0, 0);
        }

    }
}