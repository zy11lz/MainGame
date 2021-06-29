module Pro
{

    /**
    * 
    *   连连看排行榜
    */
    export class LianLianKanRankPageView extends ProUI.ActivityMain.LianLianKan.LianLianKanRankPageUI implements ITableView
    {
        /** 排行榜类型 */
        private _rankType = Pb_God._emTopListType.TopListType_JoyousLinkup;

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {

        }

        public addEvent(): void
        {
            EventMgr.on(CmdEvent.TopList_List_Ack, this, this.onList_Ack);
        }

        public removeEvent(): void
        {
            EventMgr.off(CmdEvent.TopList_List_Ack, this, this.onList_Ack);
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
            this.listView.visible = false;
            this.imgEmpty.visible = false;

            //重置底部自己的基础信息显示
            this.selfView.txtNickname.text = PlayerDataMgr.name;
            this.selfView.viewPlayerIcon.setSimpleInfo(ShapeDataMgr.iconId, ShapeDataMgr.iconFrameID, PlayerDataMgr.gender, 0);
            this.selfView.txtScore.text = JoyousLinkupDataMgr.myScore + "";
            this.selfView.imgFrameRank.frame = 0;
            this.selfView.imgFrameRank.y = 73;
            this.selfView.txtRank.text = "";
            this.selfView.frame.skin = UrlMgr.getCommonUrl("xz_bg11");
            this.txtNoRank.visible = true;
            // this.selfView.btnWorship.disabled = true;

            let showcount = cfg.ToplistCfgData.getShowLineByType(this._rankType);
            TopListSend.list(this._rankType, 1, showcount, 0, 0, 0, 0);

            //活动剩余时间倒计时
            Laya.timer.loop(1000, this, this.onTimer);
            this.onTimer();
        }

        //活动倒计时
        private onTimer(): void
        {
            let actRemainTime = ActivityDataMgr.getActivityEndTimeStamp(cfg.JoyousLinkupJoyousLinkupCfgData.getActivityCfgInfo().iD) * 1000 - TimeController.currTimer;
            this.txtOverTime.text = Global.GetRemindTime(actRemainTime / 1000, 10)
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
        }

        public setData($data: any): void
        {

        }

        private _list: Pb_God.PBTopListDetail[] = [];
        /** 收到排行榜 */
        private onList_Ack(tempClass: Pb_God.PBS2CTopListList)
        {
            if (!tempClass.ask || this._rankType != tempClass.ask.type) return;

            let list = tempClass.list;
            this._list = list;
            //玩家自己排名信息
            if (tempClass.selfinfo && tempClass.selfinfo.info)
            {
                JoyousLinkupDataMgr.myRank = tempClass.selfinfo.info.rank;
                JoyousLinkupDataMgr.myScore = tempClass.selfinfo.info.value.toNumber();

                this.refreshItemRankData(this.selfView, tempClass.selfinfo, true);
                if (tempClass.selfinfo.info.rank <= 0)
                {
                    this.txtNoRank.visible = true;
                    this.selfView.txtRank.visible = false;
                } else
                {
                    this.txtNoRank.visible = false;
                    this.selfView.txtRank.visible = true;
                }
            }


            this.listView.visible = true;
            this.imgEmpty.visible = list.length <= 0;

            let selfPlayerId = PlayerDataMgr.uid;
            this.listView.onRefreshWithArray(list, this, (itemUI: ProUI.ActivityMain.LianLianKan.LianLianKanRankItemUI, index: number) =>
            {
                let data = this._list[index];
                this.refreshItemRankData(itemUI, data, selfPlayerId == data.playerdisplay.playerid);
            });
        }


        /** 刷新排行榜单条item */
        private refreshItemRankData(tempUI: ProUI.ActivityMain.LianLianKan.LianLianKanRankItemUI, rankInfo: Pb_God.PBTopListDetail, isSelf: boolean = false): void
        {

            let rank = rankInfo.info.rank;
            if (rank <= 3 && rank != 0)
            {
                tempUI.imgFrameRank.frame = rank;
                tempUI.txtRank.text = "";
            } else
            {
                tempUI.imgFrameRank.frame = 0;
                tempUI.txtRank.text = "" + rank;
            }

            let playerdisplay = rankInfo.playerdisplay;
            tempUI.viewPlayerIcon.setPlayerDisplayInfo(playerdisplay, false);
            tempUI.txtNickname.text = playerdisplay.playername;
            tempUI.txtScore.text = rankInfo.info.value + "";

        }

        /** 页签组件销毁 */
        public dispose(): void
        {

        }
    }
}