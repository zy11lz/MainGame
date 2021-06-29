module Pro
{

    export class ChatInput extends ProUI.Chat.ChatInputUI
    {

        private curChannel: number;
        private curTargetInfo: Pb_God.PBPlayerDisplay = null;

        private curTroopInfo: Pb_God.PBItem;
        private curTroopInfoStr: string;
        private curEquipInfo: Pb_God.PBItem;
        private curEquipInfoStr: string;

        constructor()
        {
            super();
        }

        //---------------------------------------Event------------------------------------
        /** 控制消息监听器 */
        private controllEvents(isOff: boolean = true)
        {
            Global.EventsNotifyControl(this.listensEvents(), isOff);
            if (!isOff)
            {
                this.on(Laya.Event.REMOVED, this, this.controllEvents);
            }
        }

        /** 本类监听消息列表 */
        private listensEvents(): Array<any>
        {
            return [

            ]
        }


        //-------------------------------------Event Fun-----------------------------
        /** 初始化 */
        public init()
        {
            this.MsgInput.prompt = Global.getLangStr("chat_inputPrompt");

            this.controllEvents(false);

            this.ExInfoBox.visible = false;
            this.ChoiceFaceBtn.onClick(this, () =>
            {
                this.ExInfoBox.visible = !this.ExInfoBox.visible;
                if (this.ExInfoBox.visible)
                {
                    this.ExItemTab.setSelectTab(0);
                }
            });
            this.SendBtn.onClick(this, () =>
            {
                let tmpShowMsg = this.MsgInput.text;
                tmpShowMsg = tmpShowMsg.replace(/\s*/g, ""); //去掉空白字符
                if (tmpShowMsg.length == 0)
                {
                    TipsUtils.showTipsByLanId("chat_msg8");
                    return;
                }
                if (Global.GetStrByteLen(tmpShowMsg) >= 256)
                {
                    TipsUtils.showTipsByLanId("chat_msg6");
                    return;
                }
                if (this.curChannel == Pb_God._emBroadcast_Channel.BroadcastChannel_Player && this.curTargetInfo == null)
                {
                    TipsUtils.showTipsByLanId("tips_msg16");
                    return;
                }

                let needLv = cfg.CommonChatCfgData.getNeedPlayerLevelByChannel(this.curChannel);
                if (needLv > PlayerDataMgr.level)
                {
                    let channelName = cfg.CommonChatCfgData.getNameByChannel(this.curChannel);
                    TipsUtils.showTipsByLanId("chat_msg1", needLv, channelName);  //20级开启世界聊天
                    return;
                }

                if (FilterHelper.Inst.containStr(tmpShowMsg))
                {
                    // TipsUtils.showTipsByLanId("tips_msg15");
                    // return;
                    tmpShowMsg = "******";
                }

                if (this.curTroopInfoStr != null)
                {
                    let tmpLinkData = Net.ChatLinkType.ItemInfo + "*" + ItemDataMgr.getPbItemToString(this.curTroopInfo);
                    let tmpLinkMsg = "[" + cfg.ItemCfgData.getNameById(this.curTroopInfo.itemid) + "x" + this.curTroopInfo.itemcount + "]";
                    tmpShowMsg = tmpShowMsg.replace(this.curTroopInfoStr, ChatDataMgr.getLinkChatText(tmpLinkMsg, tmpLinkData, "#009e00"));
                }
                if (this.curEquipInfoStr != null)
                {
                    let tmpLinkData = Net.ChatLinkType.ItemInfo + "*" + ItemDataMgr.getPbItemToString(this.curEquipInfo);
                    let tmpLinkMsg = "[" + cfg.ItemCfgData.getNameById(this.curEquipInfo.itemid) + "x" + this.curEquipInfo.itemcount + "]";
                    tmpShowMsg = tmpShowMsg.replace(this.curEquipInfoStr, ChatDataMgr.getLinkChatText(tmpLinkMsg, tmpLinkData, "#009e00"));
                }
                if (this.curTroopInfoStr == null && this.curEquipInfoStr == null)
                {
                    ChatDataMgr.sendChatInfo(this.curChannel, tmpShowMsg, "", this.curTargetInfo, PlayerDataMgr.uname, PlayerDataMgr.uid);
                }
                else
                {
                    ChatDataMgr.sendChatInfo(this.curChannel, "", tmpShowMsg, this.curTargetInfo, PlayerDataMgr.uname, PlayerDataMgr.uid);
                }


                this.MsgInput.text = "";
                this.ExInfoBox.visible = false;
                this.curTroopInfoStr = null;
                this.curEquipInfoStr = null;

            });

            this.ExItemTab.onClick(this, (tab: component.UITab, index: number) =>
            {
                this.ExItemList.visible = index != 0;
                this.ExEmojiList.visible = index == 0;
                if (index == 0)
                {
                    this.refreshEmojiList();
                }
                else
                {
                    this.refreshEquipList(index);
                }
            },
                [new component.UITabData("chat_msg2"), new component.UITabData("chat_msg3"), new component.UITabData("chat_msg4")]  //表情 道具 装备
            );
            this.ExItemTab.onRenderRefresh(this, (itemUI: component.UIButton, index: number) =>
            {
                let tmpBGImg = itemUI.getChildAt(0) as component.UIFrameImage;
                tmpBGImg.frame = index * 2 + (this.ExItemTab.tabIndex == index ? 2 : 1);
            });
        }

        /** 设置当前所在频道 */
        public setBoradChannel(channel: number, targetInfo: Pb_God.PBPlayerDisplay)
        {
            this.curChannel = channel;
            this.curTargetInfo = targetInfo;
            this.InputBox.visible = channel != Pb_God._emBroadcast_Channel.BroadcastChannel_System;
            this.NoInputLb.visible = !this.InputBox.visible;
        }

        /** 刷新item */
        private refreshEmojiList(): void
        {
            this.ExEmojiList.onRefresh(45, this, (itemUI: component.UIButton, index: number) =>
            {
                let tmpFaceId = index + 1;
                let tmpFaceImg = itemUI.getChildAt(0) as Laya.Image;
                tmpFaceImg.skin = "res/Unpack/face/face_" + tmpFaceId + ".png";;
                itemUI.onClick(this, () =>
                {
                    this.MsgInput.text += "[" + tmpFaceId + "]";
                });
            });
        }

        /** 刷新道具或装备 */
        private refreshEquipList(tabIndex: number)
        {
            let tmpItemList: Array<Pb_God.PBItem>;
            if (tabIndex == 1)
            {
                tmpItemList = ItemDataMgr.getBagAryWithBagTypeAry([Pb_God._emBagType.BagType_Item, Pb_God._emBagType.BagType_Special]);
            }
            else
            {
                //tmpItemList = ItemDataMgr.getUsesEquip();
                tmpItemList = ItemDataMgr.getBagAryWithBagTypeAry([Pb_God._emBagType.BagType_Equip]);
            }
            this.ExItemList.onRefresh(tmpItemList.length, this, (itemUI: NorItemUI, index: number) =>
            {
                let tmpInfo = tmpItemList[index];
                itemUI.setItemInfo(tmpInfo, false, true, false);
                itemUI.onClick(this, () =>
                {
                    let tmpShowMsg = "[" + cfg.ItemCfgData.getNameById(tmpInfo.itemid) + "]";
                    if (tabIndex == 1)
                    {
                        this.curTroopInfo = tmpInfo;
                        if (this.curTroopInfoStr != null)
                        {
                            //有可能已经删掉了 
                            if(this.MsgInput.text.indexOf(this.curTroopInfoStr)>-1){
                                this.MsgInput.text = this.MsgInput.text.replace(this.curTroopInfoStr, tmpShowMsg);
                            }else{
                                this.MsgInput.text += tmpShowMsg;
                            }
                        }
                        else
                        {
                            this.MsgInput.text += tmpShowMsg;
                        }
                        this.curTroopInfoStr = tmpShowMsg;
                    }
                    else
                    {
                        this.curEquipInfo = tmpInfo;
                        if (this.curEquipInfoStr != null)
                        {
                            if(this.MsgInput.text.indexOf(this.curEquipInfoStr)>-1){
                                this.MsgInput.text = this.MsgInput.text.replace(this.curEquipInfoStr, tmpShowMsg);
                            }else{
                                this.MsgInput.text += tmpShowMsg;
                            }
                        }
                        else
                        {
                            this.MsgInput.text += tmpShowMsg;
                        }
                        this.curEquipInfoStr = tmpShowMsg;
                    }
                });
            });
        }
    }
}