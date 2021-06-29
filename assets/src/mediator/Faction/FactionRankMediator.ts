module Pro
{
    /**
    * 界面说明：公会排名
    * @author jason.xu
    */
    export class FactionRankMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Faction.FactionRankUI;

        private _factionList: Pb_God.PBFactionTop[];
        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("rankdetail")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Faction.FactionRankUI, 3, BaseAddLayer.TopUI, true);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {

        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.refreshUI();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(CmdEvent.TopList_FactionList_Ack, this, this.onList_Ack);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            if (FactionDataMgr.isHaveFaction())
            {
                this.UIPanel.selfview.txtChairmanName.text = Global.getLangStr("faction_msg17") + FactionDataMgr.getFactionLeaderName();
                this.UIPanel.selfview.txtFactionName.text = FactionDataMgr.getFactionName();
                this.UIPanel.selfview.txtFightValue.text = "0";
                this.UIPanel.selfview.txtFactionName.y = 35;
            } else
            {
                this.UIPanel.selfview.txtChairmanName.text = "";
                this.UIPanel.selfview.txtFactionName.text = Global.getLangStr("faction_none"); //未加入公会";
                this.UIPanel.selfview.txtFactionName.y = 55;
                this.UIPanel.selfview.txtFightValue.text = "";
            }
            this.UIPanel.selfview.imgFrameRank.y = 70;
            this.UIPanel.selfview.background1.skin = "res/common/xz_bg11.png";
            this.__showRankValue(this.UIPanel.selfview.txtRank, this.UIPanel.selfview.imgFrameRank, 0);
            this.UIPanel.listView.onRefresh(0, this, null);

            let isCross = this.UIOpenData.customObject;
            let rankType = isCross ? Pb_God._emTopListType.TopListType_BWFaction : Pb_God._emTopListType.TopListType_Faction;
            let showcount = cfg.ToplistCfgData.getShowLineByType(rankType);
            TopListSend.list(rankType, 1, showcount, 0, 0, 0, 0);
        }

        /** 收到排行榜 */
        private onList_Ack(value: Pb_God.PBS2CFactionTopList)
        {
            this._factionList = value.list;
            let len = this._factionList.length;
            this.UIPanel.imgEmpty.visible = len <= 0;
            this.UIPanel.listView.onRefresh(len, this, this.onRefreshListItem);

            //自己帮会信息
            this.refreshSelfInfo(value.selfinfo);

            //top3
            for (var i = 1; i <= 3; i++)
            {
                var data = this._factionList[i - 1];
                let txtTopName = this.UIPanel["txtTopNickname" + i] as component.UILabel;
                let viewPlayerIcon = this.UIPanel["viewPlayerIconTop" + i] as Pro.PlayerIconUI;
                txtTopName.text = data ? data.display.base.name : Global.getLangStr("common_empty1");
                viewPlayerIcon.setPlayerDisplayInfo(data ? data.display.leaderdisplay : null, false, true);
            }
        }

        /** 刷新自己帮会排行信息显示 */
        private refreshSelfInfo(selfinfo: Pb_God.PBFactionTop): void
        {
            if (!selfinfo) return;
            this.__showRankValue(this.UIPanel.selfview.txtRank, this.UIPanel.selfview.imgFrameRank, selfinfo.rank);

            this.UIPanel.selfview.txtFightValue.text = "" + selfinfo.display.totalfightpower;

            this.UIPanel.selfview.txtChairmanName.text = Global.getLangStr("faction_msg17") + selfinfo.display.leaderdisplay.playername;
            this.UIPanel.selfview.txtFactionName.text = selfinfo.display.base.name;
            this.UIPanel.selfview.txtMember.text = selfinfo.display.people + "/" + selfinfo.display.peoplemax;
            this.UIPanel.selfview.txtLv.text = selfinfo.display.base.level + "";
        }

        private onRefreshListItem(tempUI: ProUI.Faction.ChildView.FactionRankItemViewUI, index: number): void
        {
            let data = this._factionList[index];
            tempUI.txtChairmanName.text = Global.getLangStr("faction_msg17") + data.display.leaderdisplay.playername;
            let crossName = this.UIOpenData.customObject ? `[S${ data.display.base.worldid }]` : "";
            tempUI.txtFactionName.text = crossName + data.display.base.name;
            tempUI.txtLv.text = data.display.base.level + "";
            tempUI.txtMember.text = data.display.people + "/" + data.display.peoplemax;
            //战斗力
            tempUI.txtFightValue.text = data.display.totalfightpower + "";
            let rank = data.rank;
            this.__showRankValue(tempUI.txtRank, tempUI.imgFrameRank, data.rank);
        }

        private __showRankValue(label: Laya.Label | component.UIBitmapText, imgRank: component.UIFrameImage, rank: number): void
        {
            if (rank == 0)
            {
                imgRank.frame = 0;
                label.text = Global.getLangStr("common_norank");
            }
            else if (rank <= 3)
            {
                imgRank.frame = rank;
                label.text = "";
            } else
            {
                imgRank.frame = 0;
                label.text = "" + rank;
            }
        }
    }
}