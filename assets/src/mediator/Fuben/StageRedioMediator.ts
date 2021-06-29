module Pro
{

    /**
     * 通关录像
     */
    export class StageRedioMediator extends BaseMediator implements IMediator
    {

        /** UI面板 */
        UIPanel: ProUI.Fuben.Redio.MainUI;

        /** UI打开参数 */
        UIOpenData: StageRedioOpenUIData;

        /** 需要自动加载的资源列表*/
        autoLoadAtlas(): Array<any>
        {
            return [];
        }

        /** UI打开前状态 */
        openUI(): void
        {
            this.showPanel(ProUI.Fuben.Redio.MainUI, 3, BaseAddLayer.TopUI, true);
        }

        /** 关闭UI*/
        closeUI(): void
        {
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        initialization(): void
        {

        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.addEventMgr(Cmd.S2C_Video_QueryHookAck, this, this.onVideoDataCallBack);
            this.addEventMgr(Cmd.S2C_Video_QueryTowerAck, this, this.onVideoDataCallBack);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        removeEvent(): void
        {

        }

        /** 初始化面板(UI每次打开) */
        initUI(): void
        {
            if (this.UIOpenData.battleType == Pb_God._emBattleType.BattleType_Tower || this.UIOpenData.battleType == Pb_God._emBattleType.BattleType_Tower2)
            {
                VideoSend.queryTower(this.UIOpenData.battleID);
            }
            else if (this.UIOpenData.battleType == Pb_God._emBattleType.BattleType_Hook)
            {
                VideoSend.queryHook(this.UIOpenData.battleID);
            }
            else if (this.UIOpenData.battleType == Pb_God._emBattleType.BattleType_Expedition)
            {
                VideoSend.queryPlayerRecord(Pb_God._emVideoType.VideoType_PlayerExpdition, this.UIOpenData.battleID);
            }
            this.UIPanel.RankItemBox.visible = false;
        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        refreshUI(): void
        {

        }

        /** 数据返回 */
        onVideoDataCallBack(value: Pb_God.PBWorldStageVideoInfo)
        {
            this.UIPanel.RankItemBox.visible = true;
            this.UIPanel.RankItemBox.onRefresh(2, this, (itemUI: ProUI.Fuben.Redio.RankItemUI, index: number) =>
            {
                let tmpInfo: Pb_God.PBPlayerVideoDisplay = null;
                itemUI.shareBtn.visible = false;
                itemUI.imgTitleBg.visible = true;
                if (index == 0)
                {
                    tmpInfo = (value.fast && value.fast["display"] != null) ? value.fast : null;
                    itemUI.PlayerIconInfo.visible = tmpInfo != null;
                    if (tmpInfo != null)
                    {
                        itemUI.PlayerIconInfo.setPlayerDisplayInfo(tmpInfo.display, false, false);
                    }
                    itemUI.TitleLb.text = Global.getLangStr("fight_msg17");//最快";
                    itemUI.PassTimeLb.text = tmpInfo ? (Global.getLangStr("fight_msg20") + Global.GetRemindTime(tmpInfo.param, 5)) : "";
                    itemUI.NameLb.text = tmpInfo == null ? Global.getLangStr("fight_msg22") : tmpInfo.display.playername;
                }
                else if (index == 1)
                {
                    tmpInfo = (value.fightpower && value.fightpower["display"] != null) ? value.fightpower : null;
                    itemUI.PlayerIconInfo.visible = tmpInfo != null;
                    if (tmpInfo != null)
                    {
                        itemUI.PlayerIconInfo.setPlayerDisplayInfo(tmpInfo.display, false, false);
                    }
                    itemUI.TitleLb.text = Global.getLangStr("fight_msg18");//最低";
                    itemUI.PassTimeLb.text = tmpInfo ? (Global.getLangStr("fight_msg21") + tmpInfo.param) : "";
                    itemUI.NameLb.text = tmpInfo == null ? Global.getLangStr("fight_msg22") : tmpInfo.display.playername;
                }
                //策划要求不显示自己的记录
                // else if (index == 2)
                // {
                //     tmpInfo = (value.lately && value.lately["display"]) != null ? value.lately : null;
                //     let isTower = (this.UIOpenData.battleType == Pb_God._emBattleType.BattleType_Tower || this.UIOpenData.battleType == Pb_God._emBattleType.BattleType_Tower2);
                //     itemUI.PlayerIconInfo.visible = !!tmpInfo || isTower;
                //     if (isTower)
                //     { //试炼塔的显示自己的信息
                //         itemUI.PlayerIconInfo.setSimpleInfo(ShapeDataMgr.iconId, ShapeDataMgr.iconFrameID, PlayerDataMgr.gender, 0);
                //         itemUI.NameLb.text = Global.getLangStr("fight_msg46");
                //         //试炼塔显示通关时长 或者 暂未通关
                //         itemUI.PassTimeLb.text = tmpInfo ? (Global.getLangStr("fight_msg20") + Global.GetRemindTime(tmpInfo.param, 5)) : Global.getLangStr("fight_msg47");
                //     } else
                //     {
                //         tmpInfo && itemUI.PlayerIconInfo.setPlayerDisplayInfo(tmpInfo.display, false, false);
                //         itemUI.NameLb.text = tmpInfo == null ? Global.getLangStr("fight_msg22") : tmpInfo.display.playername;

                //         itemUI.PassTimeLb.text = tmpInfo ? (Global.getLangStr("fight_msg20") + Global.GetRemindTime(tmpInfo.param, 5)) : "";
                //         // ////挂机显示时间点 或者 不显示
                //         // itemUI.PassTimeLb.text = tmpInfo ? (Global.getLangStr("fight_msg48") + Global.getFormatTimeString(tmpInfo.param*1000, 1)) : "";

                //     }
                //     itemUI.shareBtn.visible = tmpInfo && isTower;
                //     itemUI.imgTitleBg.visible = !isTower;
                //     itemUI.TitleLb.text = isTower ? "" : Global.getLangStr("fight_msg19");//最近";
                // }
                //只有通天塔才会显示这个按钮
                itemUI.shareBtn.onClick(this, () =>
                {
                    //聊天信息
                    let showLinkData = Net.ChatLinkType.FightRedio + "*" + this.UIOpenData.battleType + "*" + tmpInfo.battlesn.toString(0) + "*1*" + PlayerDataMgr.uid;
                    let leftName = PlayerDataMgr.name;
                    let stageCfgInfo = cfg.TrainTowerCfgData.getInfo(this.UIOpenData.battleID);
                    let rightName = Global.getLangStr("ui_StarTower_title" + stageCfgInfo.type) + Global.getLangStr("fight_msg2", stageCfgInfo.stageShow); //试炼塔第n层                    
                    let showLinkMsg = ChatDataMgr.getLinkChatText(Global.getLangStr("share_msg3"), showLinkData, "#d76601");
                    let showChatMsg = Global.getLangStr("share_msg2", leftName, rightName, showLinkMsg);
                    ShareChatView.showNormalShare(itemUI.shareBtn, showChatMsg);
                });
                itemUI.SureBtn.visible = tmpInfo != null;
                itemUI.SureBtn.frequencyClickLock = 2000; //控制按钮频繁点击
                itemUI.SureBtn.onClick(this, () =>
                {
                    if (this.UIOpenData.battleType == Pb_God._emBattleType.BattleType_Hook)
                    {
                        VideoSend.playSystem(Global.getVideoType(this.UIOpenData.battleType), tmpInfo.battlesn, this.UIOpenData.battleID);
                        return;
                    }
                    if (index == 2)
                    {
                        VideoSend.playPlayer(Global.getVideoType(this.UIOpenData.battleType), tmpInfo.battlesn, PlayerDataMgr.uid);
                    }
                    else
                    {
                        VideoSend.playSystem(Global.getVideoType(this.UIOpenData.battleType), tmpInfo.battlesn, this.UIOpenData.battleID);
                    }
                });
            });
        }
    }
}