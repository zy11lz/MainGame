module Pro
{
    /**
     * 界面说明： 玩家切蹉战斗胜利界面
    * @author jason.xu
    */
    export class FriendFightResultMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.BattleResult.FriendFightResultUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("rewardpopup")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.BattleResult.FriendFightResultUI, 1, BaseAddLayer.TopUI, true);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            super.closeUI();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.getDarkUI().graphics.clear();
            this.getDarkUI().graphics.drawRect(0, 0, this.getDarkUI().width,  this.getDarkUI().height, "#2d2629");
            this.getDarkUI().alpha = 0.85;
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            var fightresult: Pb_God.PBFightResult = this.UIOpenData.customObject;
            let isWin = fightresult.result == Pb_God._emBattleResult.BattleResult_DefenseSuc || fightresult.result == Pb_God._emBattleResult.BattleResult_Sucess;
            this.UIPanel.boxWin.visible = isWin;
            this.UIPanel.boxLose.visible = !isWin;
            if (isWin)
            {
                SoundMgr.Inst().playSound("battle_success")
            } else
            {
                SoundMgr.Inst().playSound("battle_fail")
            }
            // //胜利特效表现
            // if (isWin)
            // {
            //     this.UIPanel.boxWinImg.alpha = 0;
            //     let tmpEffPos = new Laya.Point(this.UIPanel.boxWinImg.x, this.UIPanel.boxWinImg.y);
            //     let tmpEffNode = EffectMgr.Inst.createEffectOne("ui_challenge_succ", tmpEffPos, null, 1.35, 1, this.UIPanel.boxWin, true, ResReleaseType.Reference);
            //     Laya.timer.once(tmpEffNode.effAllTime, this, () =>
            //     {
            //         this.UIPanel.boxWinImg.alpha = 1;
            //     });
            // }
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnHitDetail.onClick(this, this.onClickHitDetail);
            this.UIPanel.btnShareFaction.onClick(this, this.onClickShareFaction);
            this.UIPanel.btnShareWorld.onClick(this, this.onClickShareWorld);
            this.UIPanel.btnReplay.onClick(this, this.onClickReplay);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 点击公会分享 */
        private onClickShareFaction(): void
        {
            if (!FactionDataMgr.isHaveFaction())
            {
                TipsUtils.showTipsByLanId("faction_none2");
                return;
            }
            this.shareToChat(Pb_God._emBroadcast_Channel.BroadcastChannel_Faction);
        }

        /** 点击世界分享 */
        private onClickShareWorld(): void
        {
            let channel = Pb_God._emBroadcast_Channel.BroadcastChannel_World;
            let needLv = cfg.CommonChatCfgData.getNeedPlayerLevelByChannel(channel);
            if (needLv > PlayerDataMgr.level)
            {
                let channelName = cfg.CommonChatCfgData.getNameByChannel(channel);
                TipsUtils.showTipsByLanId("chat_msg1", needLv, channelName);  //20级开启世界聊天
                return;
            }
            this.shareToChat(channel);
        }

        /** 点击回放 */
        private onClickReplay(): void
        {
            var fightresult: Pb_God.PBFightResult = this.UIOpenData.customObject;
            VideoSend.playSystem(Global.getVideoType(fightresult.base.battletype), fightresult.base.battlesn, 0);
            this.closeUI();
        }

        /** 点击伤害统计 */
        private onClickHitDetail(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_BattleFightStatistics, [null, this.UIOpenData.customObject]));
        }

        private shareToChat(channel: Pb_God._emBroadcast_Channel): void
        {
            var fightresult: Pb_God.PBFightResult = this.UIOpenData.customObject;

            //聊天信息
            let showLinkData = Net.ChatLinkType.FightRedio + "*" + fightresult.base.battletype + "*" + fightresult.base.battlesn.toString(0);
            let showLinkMsg = ChatDataMgr.getLinkChatText(Global.getLangStr("share_msg3"), showLinkData, "#d76601");
            let leftName = fightresult.base.friend.playerdisplay.playername;
            let rightName = fightresult.base.energy.playerdisplay.playername;
            let showChatMsg = Global.getLangStr("share_msg2", leftName, rightName, showLinkMsg);

            ChatDataMgr.sendChatInfo(channel, "", showChatMsg, null, null, 0);
            TipsUtils.showTipsByLanId("share_success"); //分享成功
            this.closeUI();
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

    }
}