module Pro
{

    /**
     * 排行榜详细信息(带TOP3显示的界面)
     */
    export class RankDetailMediator extends BaseMediator implements IMediator
    {

        /** 不同类型的排行榜对应的列表头的名称与宽度显示列表 */
        private _listHeaderDatas = {};
        /** 当前列表表格的位置数据 */
        private _curTabelWidthList = [];

        /** UI面板 */
        UIPanel: ProUI.Rank.Detail.RankDetailUI;

        /** 排行榜类型 */
        RankType: Pb_God._emTopListType;

        /** 获取当前选择的榜单数据 */
        TempRankList: Pb_God.PBTopListDetail[];
        /** 是否跨服显示 */
        private _isCross: boolean;

        /** 表头总宽度 */
        private TitleTotalWidth = 665;
        /** 需要自动加载的资源列表*/
        autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("rankdetail"), UrlMgr.getAtlas("ladder")];
        }

        /** UI打开前状态 */
        openUI(): void
        {
            this.showPanel(ProUI.Rank.Detail.RankDetailUI, 3, BaseAddLayer.TopUI, true, 1);
        }

        /** 关闭UI*/
        closeUI(): void
        {
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        initialization(): void
        {
            //初始化表头显示数据， 由于不同类型的排行榜，界面上显示的表头内容与宽度都不一样，所以需要动态配置。
            //每个类型对应一组表头数据，每一个数据由language key与显示宽度组成，
            //显示宽度： 可以每一组总和为665，也可以只配置权重。

            /** 第一版语言包内容， 最终显示以textConfig为准
             * rank_header_01: 排名
             * rank_header_02: 玩家昵称
             * rank_header_03: 公会名称
             * rank_header_04: 等级
             * rank_header_05: 战斗力
             * rank_header_06: 主线进度
             * rank_header_07: 层数
             * rank_header_08: 通关用时
             * rank_header_09: 成员
             * rank_header_10: 竞技积分
             * rank_header_11: 探索度
             */

            this.__setListHeaderData(Pb_God._emTopListType.TopListType_Hook,
                [["rank_header_01", 160], ["rank_header_02", 301], ["rank_header_06", 203]]);

            this.__setListHeaderData(Pb_God._emTopListType.TopListType_Train1,
                [["rank_header_01", 160], ["rank_header_02", 224], ["rank_header_07", 125], ["rank_header_08", 156]]);

            this.__setListHeaderData(Pb_God._emTopListType.TopListType_Train2,
                [["rank_header_01", 160], ["rank_header_02", 224], ["rank_header_07", 125], ["rank_header_08", 156]]);

            this.__setListHeaderData(Pb_God._emTopListType.TopListType_Challenge,
                [["rank_header_01", 160], ["rank_header_02", 301], ["rank_header_10", 203]]);

            this.__setListHeaderData(Pb_God._emTopListType.TopListType_Figthpower,
                [["rank_header_01", 160], ["rank_header_02", 301], ["rank_header_05", 203]]);

            this.__setListHeaderData(Pb_God._emTopListType.TopListType_Element,
                [["rank_header_01", 160], ["rank_header_02", 301], ["rank_header_05", 203]]);

            this.__setListHeaderData(Pb_God._emTopListType.TopListType_Risk,
                [["rank_header_01", 160], ["rank_header_02", 224], ["rank_header_07", 125], ["rank_header_11", 156]]);

            this.__setListHeaderData(Pb_God._emTopListType.TopListType_PlayerLevel,
                [["rank_header_01", 160], ["rank_header_02", 301], ["rank_header_04", 203]]);

            this.__setListHeaderData(Pb_God._emTopListType.TopListType_Champion,
                [["rank_header_01", 160], ["rank_header_02", 301], ["rank_header_15", 203]]);

            this.__setListHeaderData(Pb_God._emTopListType.TopListType_BWFigthpower,
                [["rank_header_01", 160], ["rank_header_02", 301], ["rank_header_05", 203]]);

            this.__setListHeaderData(Pb_God._emTopListType.TopListType_BWLadder,
                [["rank_header_01", 160], ["rank_header_02", 301], ["rank_header_03", 203]]);

            this.__setListHeaderData(Pb_God._emTopListType.TopListType_BWFctionWar, //公会战
                [["rank_header_01", 160], ["rank_header_02", 224], ["rank_header_13", 125], ["rank_header_14", 156]]);

            this.__setListHeaderData(Pb_God._emTopListType.TopListType_ClickGold,//点石成金次数
                [["rank_header_01", 160], ["rank_header_02", 301], ["rank_header_16", 203]]);

            this.__setListHeaderData(Pb_God._emTopListType.TopListType_Sail,//远航次数
                [["rank_header_01", 160], ["rank_header_02", 301], ["rank_header_17", 203]]);

            this.__setListHeaderData(Pb_God._emTopListType.TopListType_Expedition,//远征次数
                [["rank_header_01", 160], ["rank_header_02", 301], ["rank_header_18", 203]]);

            this.__setListHeaderData(Pb_God._emTopListType.TopListType_Raid,//快速战斗次数
                [["rank_header_01", 160], ["rank_header_02", 301], ["rank_header_19", 203]]);

            this.__setListHeaderData(Pb_God._emTopListType.TopListType_HeavenStar,//天界副本
                [["rank_header_01", 160], ["rank_header_02", 301], ["rank_header_20", 203]]);

            this.__setListHeaderData(Pb_God._emTopListType.TopListType_RiskCount,//神界冒险次数(活动)
                [["rank_header_01", 160], ["rank_header_02", 301], ["rank_header_21", 203]]);

            this.__setListHeaderData(Pb_God._emTopListType.TopListType_BWChallenge,//跨服竞技场
                [["rank_header_01", 160], ["rank_header_02", 301], ["rank_header_22", 203]]);

            this.__setListHeaderData(Pb_God._emTopListType.TopListType_BWWeekChampion,// 周冠军
                [["rank_header_01", 160], ["rank_header_02", 301], ["rank_header_15", 203]]);

                
            this.__setListHeaderData(Pb_God._emTopListType.TopListType_AcitivtyBoss,// 限时挑战
                [["rank_header_01", 160], ["rank_header_02", 301], ["rank_header_12", 203]]);
        }

        private __setListHeaderData(type: number, headList: Array<any>[])
        {
            this._listHeaderDatas[type] = headList;
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        addEvent(): void
        {
            this.addEventMgr(CmdEvent.TopList_List_Ack, this, this.onList_Ack);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        removeEvent(): void
        {

        }

        /** 初始化面板(UI每次打开) */
        initUI(): void
        {
            this.RankType = this.UIOpenData.customObject;
            let titleName = cfg.ToplistCfgData.getNameByType(this.RankType);
            if (titleName.length == 4)
            {
                titleName = titleName.substr(0, 2) + "<span style='font-size:24px'>" + titleName.substr(2, 2) + "</span>";
            }
            this.UIPanel.txtTitle.showText = titleName;
            this._isCross = this.RankType >= Pb_God._emTopListType.TopListType_BWBegin;
            this.refreshListHeaderView();
            //重置底部自己的信息显示
            this.UIPanel.selfInfoView.hideAllChildren();
            this.UIPanel.selfInfoView.setPlayerData(null);  //参数null表示显示玩家自己的信息
            //重置top3
            for (var i = 1; i <= 3; i++)
            {
                let txtTopNickname = this.UIPanel["txtTopNickname" + i] as component.UILabel;
                let viewPlayerIcon = this.UIPanel["viewPlayerIconTop" + i] as Pro.PlayerIconUI;
                txtTopNickname.text = Global.getLangStr("common_empty1");
                viewPlayerIcon.setPlayerDisplayInfo(null, false, false);
            }

            let showcount = cfg.ToplistCfgData.getShowLineByType(this.RankType) || 3;
            TopListSend.list(this.RankType, 1, showcount, 0, 0, 0, 0);

            this.UIPanel.imgEmpty.visible = true;
            this.UIPanel.listView.onRefresh(0, null, null);
        }

        /** 根据类型刷新表头信息 */
        private refreshListHeaderView(): void
        {
            let headerDatas = this._listHeaderDatas[this.RankType];
            if (!headerDatas) { return; }
            let count = this.UIPanel.hboxListHeader.numChildren;
            let totalWidth = 0;
            this._curTabelWidthList = [];
            for (var el of headerDatas)
            {
                totalWidth += el[1];
            }
            for (var i = 0; i < count; i++)
            {
                let dataArr = headerDatas[i];
                let label = this.UIPanel.hboxListHeader.getChildAt(i) as component.UILabel;
                if (!dataArr)
                {
                    label.layoutEnabled = label.visible = false;
                    continue;
                }
                label.layoutEnabled = label.visible = true;
                label.text = Global.getLangStr(dataArr[0]);
                let nw = Math.floor(dataArr[1] * this.TitleTotalWidth / totalWidth);
                label.width = nw;
                this._curTabelWidthList.push(nw);
            }
            this.UIPanel.hboxListHeader.refresh();
        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        refreshUI(): void
        {

        }

        /** 收到排行榜 */
        private onList_Ack(tempClass: Pb_God.PBS2CTopListList)
        {
            if (!tempClass.ask || this.RankType != tempClass.ask.type) { return; }
            this.TempRankList = tempClass.list;
            this.UIPanel.imgEmpty.visible = this.TempRankList.length == 0;
            this.UIPanel.listView.onRefresh(this.TempRankList.length, this, this.onItemListRender);

            //自己排行信息
            this.refreshSelfInfo(tempClass.selfinfo);

            //重置top3
            for (var i = 1; i <= 3; i++)
            {
                let data = tempClass.list[i - 1];
                let txtTopNickname = this.UIPanel["txtTopNickname" + i] as component.UILabel;
                let viewPlayerIcon = this.UIPanel["viewPlayerIconTop" + i] as Pro.PlayerIconUI;
                txtTopNickname.text = data ? data.playerdisplay.playername : Global.getLangStr("common_empty1");
                viewPlayerIcon.setPlayerDisplayInfo(data ? data.playerdisplay : null, false, false);
            }
        }

        private onItemListRender(itemUI: RankDetailItemView, index: number)
        {
            let data = this.TempRankList[index];
            //hide all
            itemUI.hideAllChildren();
            itemUI.setTableWidthList(this._curTabelWidthList);
            itemUI.setPlayerData(data.playerdisplay, this._isCross);
            itemUI.setTabelData(this.RankType, data.info);
        }

        /** 刷新玩家自己的信息展示（可跟据排行榜类型显示单独数据，或者走通用处理，保持上面的排行榜列表格式） */
        private refreshSelfInfo(selfInfo: Pb_God.PBTopListDetail): void
        {
            let itemUI = this.UIPanel.selfInfoView;
            //根据不同排行榜类型，显示不同的内容
            switch (this.RankType)
            {
                case Pb_God._emTopListType.TopListType_BWLadder: //  跨服天梯
                    itemUI.setTableWidthList(this._curTabelWidthList);
                    itemUI.setRankValue(selfInfo && selfInfo.info ? selfInfo.info.rank : 0);
                    itemUI.showHeadFightPower(PlayerDataMgr.fightPower);
                    var factionanme = FactionDataMgr.getFactionName();
                    let topRank = LadderDataMgr.myHistroyTopRank;
                    var topRankStr = Global.getLangStr("common_historyTop") + (topRank ? Global.getLangStr("common_rank2", topRank) : Global.getLangStr("common_none"));
                    itemUI.addTwoLineValue(factionanme, topRankStr);
                    break;
                default:
                    itemUI.setTableWidthList(this._curTabelWidthList);
                    if (selfInfo)
                    {
                        itemUI.setTabelData(this.RankType, selfInfo.info);
                    } else
                    {
                        this.UIPanel.selfInfoView.setTabelData(0, null);
                    }
                    break;
            }
        }
    }
}