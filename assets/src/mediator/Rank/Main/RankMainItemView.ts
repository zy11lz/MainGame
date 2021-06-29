module Pro
{
    /**
    * 模块：排行榜主界面单条item视图（本服排行与跨服排行共用）
    * @author jason.xu
    */
    export class RankMainItemView extends ProUI.Rank.RankInfoItemUI
    {

        constructor()
        {
            super();
            this.init();
        }

        private init()
        {
        }

        public setEmpty(isEmpty: boolean = true): void
        {
            this.emptyTag.visible = isEmpty;
            this.PlayerNameLb.visible = !isEmpty;
            this.PlayerIcon.visible = !isEmpty;
            this.PlayerRankImg.visible = !isEmpty;
            this.imgFactionIcon.visible = !isEmpty;
            this.PlayerRankInfoLb.visible = !isEmpty;
        }

        /** 设置公会排名信息 */
        public setFactionRankInfo(factionInfo: Pb_God.PBFactionTop, isCrossSvr: boolean): void
        {
            this.btn.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FactionRank, isCrossSvr));
            });
            if (!factionInfo)
            {
                this.setEmpty(true);
                return;
            }
            this.setEmpty(false);
            this.PlayerIcon.visible = false;
            let crossName = isCrossSvr ? `[S${ factionInfo.display.base.worldid }]` : "";
            this.PlayerNameLb.text = crossName + factionInfo.display.base.name;
            this.PlayerRankInfoLb.text = Global.getLangStr("rank_msg5") + factionInfo.display.totalfightpower;
        }

        /** 设置玩家排名信息 */
        public setPlayRankInfo(rankData: Pb_God.PBTopListDetail, rankType: Pb_God._emTopListType, isCrossSvr: boolean): void
        {
            this.btn.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RankDetail, rankType));
            });

            if (!rankData)
            {
                this.setEmpty(true);
                return;
            }
            this.setEmpty(false);
            this.imgFactionIcon.visible = false;
            this.PlayerIcon.setPlayerDisplayInfo(rankData.playerdisplay, false, false);
            let crossName = isCrossSvr ? `[S${ rankData.playerdisplay.worldid }]` : "";
            this.PlayerNameLb.text = crossName + rankData.playerdisplay.playername;
            this.setRankItemByType(rankData.info);
        }

        /** 根据不同的类型， 设置不同排行数值  */
        public setRankItemByType(info: Pb_God.PBTopListInfo): void
        {
            switch (info.type)
            {
                case Pb_God._emTopListType.TopListType_Hook: //  个人剧情进度;
                    let stageId = Global.longToNumber(info.value);
                    let sceneid = cfg.HookStageCfgData.getSceneIDByStageID(stageId);
                    let scenename = cfg.HookSceneCfgData.getSceneNameBySceneID(sceneid);
                    this.PlayerRankInfoLb.text = scenename + stageId;
                    break;
                case Pb_God._emTopListType.TopListType_Train1: //  试练塔;
                case Pb_God._emTopListType.TopListType_Train2: //  试练塔;
                    this.PlayerRankInfoLb.text = Global.getLangStr("rank_msg6") + info.value; //通关层数: 
                    break;
                case Pb_God._emTopListType.TopListType_Challenge: //  竞技场;
                    this.PlayerRankInfoLb.text = Global.getLangStr("rank_msg7") + info.value; //竞技积分: 
                    break;
                case Pb_God._emTopListType.TopListType_Figthpower: //  个人战力;
                case Pb_God._emTopListType.TopListType_BWFigthpower: //  个人战力;
                case Pb_God._emTopListType.TopListType_BWLadder: //  跨服天梯;
                    this.PlayerRankInfoLb.text = Global.getLangStr("rank_msg8") + info.value; //战斗力: 
                    break;
            }
        }

    }
}