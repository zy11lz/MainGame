module Pro
{

    /**
    * 分享到聊天
    */
    export class ShareChatView extends ProUI.Utils.ShareChatItemUI
    {

        static itemUI: ShareChatView;

        private tmpCoverUI: component.UIButton;

        public static showPet(bindBtn: component.UIButton, info: Net.hero): void
        {
            if (this.itemUI == null)
            {
                this.itemUI = new ShareChatView();
            }
            this.itemUI.showAndBindHelpBtn(bindBtn);
            this.itemUI.showPetBlinkInfo(info);
        }

        public static showVedio(bindBtn: component.UIButton, info: Pb_God.PBVideoDisplay, videoType: number): void
        {
            if (this.itemUI == null)
            {
                this.itemUI = new ShareChatView();
            }
            this.itemUI.showAndBindHelpBtn(bindBtn);
            this.itemUI.showVedioBlinkInfo(info, videoType);
        }

        public static showNormalShare(bindBtn: component.UIButton, showChatMsg: string): void
        {
            if (this.itemUI == null)
            {
                this.itemUI = new ShareChatView();
            }
            this.itemUI.showAndBindHelpBtn(bindBtn);
            this.itemUI.showNormalChatMsg(showChatMsg);
        }

        constructor()
        {
            super();
        }

        public showAndBindHelpBtn(btn: component.UIButton): void
        {
            //添加遮罩
            if (this.tmpCoverUI == null)
            {
                this.tmpCoverUI = new component.UIButton();
                this.tmpCoverUI["scaleDown"] = 1;
                this.tmpCoverUI["scaleUp"] = 1;
                this.tmpCoverUI.anchorX = 0;
                this.tmpCoverUI.anchorY = 0;
                this.tmpCoverUI.mouseEnabled = true;
                this.tmpCoverUI.onClick(this, this.close);
            }
            this.tmpCoverUI.width = GameConfig.curWidth();
            this.tmpCoverUI.height = GameConfig.curHeight();
            LayerManager.Inst.topUILayer.addChild(this.tmpCoverUI);

            //添加Info
            LayerManager.Inst.topUILayer.addChild(this);

            //根据按钮在屏幕上的位置，决定显示框的位置
            let btnGlobalPos = btn.localToGlobal(new Laya.Point(0, 0)); btnGlobalPos.y -= GameConfig.WinCenterY / 2;
            this.y = btnGlobalPos.y - this.height;
            this.x = btnGlobalPos.x - this.width + 50;
            // this.y = btnGlobalPos.y > GameConfig.WinHeight >> 1 ? btnGlobalPos.y - 35 - this.height : btnGlobalPos.y + 35;
            // this.x = btnGlobalPos.x > GameConfig.WinWidth >> 1 ? btnGlobalPos.x - this.width : btnGlobalPos.x;
        }

        public close(showMsg = false): void
        {
            this.removeSelf();
            this.tmpCoverUI.removeSelf();
            if (showMsg == true)
            {
                TipsUtils.showTipsByLanId("share_success");
            }
        }

        public showNormalChatMsg(showChatMsg: string, shareCallback: Laya.Handler = null): void
        {
            //跨服
            this.AcrossBtn.onClick(this, () =>
            {
                var channel = Pb_God._emBroadcast_Channel.BroadcastChannel_Cross;
                let needLv = cfg.CommonChatCfgData.getNeedPlayerLevelByChannel(channel);
                if (needLv > PlayerDataMgr.level)
                {
                    let channelName = cfg.CommonChatCfgData.getNameByChannel(channel);
                    TipsUtils.showTipsByLanId("chat_msg1", needLv, channelName);  //20级开启世界聊天
                    return;
                }
                ChatDataMgr.sendChatInfo(channel, "", showChatMsg, null, null, 0);
                if (shareCallback) shareCallback.runWith(channel);
                this.close(true);
            });
            //世界
            this.WorldBtn.onClick(this, () =>
            {
                var channel = Pb_God._emBroadcast_Channel.BroadcastChannel_World;
                let needLv = cfg.CommonChatCfgData.getNeedPlayerLevelByChannel(channel);
                if (needLv > PlayerDataMgr.level)
                {
                    let channelName = cfg.CommonChatCfgData.getNameByChannel(channel);
                    TipsUtils.showTipsByLanId("chat_msg1", needLv, channelName);  //20级开启世界聊天
                    return;
                }
                ChatDataMgr.sendChatInfo(channel, "", showChatMsg, null, null, 0);
                if (shareCallback) shareCallback.runWith(channel);
                this.close(true);
            });
            //公会
            this.UnionBtn.onClick(this, () =>
            {
                if (!FactionDataMgr.isHaveFaction())
                {
                    TipsUtils.showTipsByLanId("faction_none2");
                    return;
                }
                ChatDataMgr.sendChatInfo(Pb_God._emBroadcast_Channel.BroadcastChannel_Faction, "", showChatMsg, null, null, 0);
                if (shareCallback) shareCallback.runWith(Pb_God._emBroadcast_Channel.BroadcastChannel_Faction);
                this.close(true);
            });
        }

        public showPetBlinkInfo(petInfo: Net.hero)
        {
            //聊天信息
            let showLinkData = Net.ChatLinkType.PetSN + "*" + PlayerDataMgr.uid + "*" + PlayerDataMgr.worldid + "*" + petInfo.sn.toString(0);
            let showLinkMsg = ChatDataMgr.getLinkChatText("[" + cfg.PetSkinCfgData.getFileNameById(petInfo.useskinid) + "]", showLinkData);
            let showChatMsg = Global.getLangStr("share_msg1", showLinkMsg);
            this.showNormalChatMsg(showChatMsg);
        }

        public showVedioBlinkInfo(info: Pb_God.PBVideoDisplay, videoType: number)
        {
            //聊天信息
            let showLinkData = Net.ChatLinkType.FightRedio + "*" + info.battletype + "*" + info.battlesn.toString(0);
            let showLinkMsg = ChatDataMgr.getLinkChatText(Global.getLangStr("share_msg3"), showLinkData, "#d76601");
            let leftName = info.leftdisplay.playerdisplay.playername;
            let rightName = info.rightdisplay.playerdisplay.playername;
            let showChatMsg = Global.getLangStr("share_msg2", leftName, rightName, showLinkMsg);

            this.showNormalChatMsg(showChatMsg, Laya.Handler.create(this, () =>
            {
                VideoSend.share(videoType, info.battlesn);
            }));
        }
    }
}