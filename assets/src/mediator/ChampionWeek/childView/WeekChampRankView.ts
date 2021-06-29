module Pro {

    /**
    * 
    * 冠军赛界面分离视图逻辑：排行榜视图
    *
    * @author jason.xu
    * 
    */
    export class WeekChampRankView extends ProUI.WeekChampion.ChildView.RankViewUI  {

        /** 排行榜类型 */
        private _rankType = Pb_God._emTopListType.TopListType_BWWeekChampion;

        constructor()  {
            super();
            this.init();
            this.addUIEvent();
        }

        private init()  {
            this.listView.visible = false;
            this.imgEmpty.visible = false;
        }

        private addUIEvent(): void  {
        }
        private removeEvent(): void  {
        }

        private addDataEvent(): void  {
            EventMgr.on(CmdEvent.TopList_List_Ack, this, this.onList_Ack);
            EventMgr.on(CmdEvent.Challenge_LikeNum, this, this.onLikeNum);
            EventMgr.on(CmdEvent.WeekChampion_Like, this, this.onLikeNum);
        }

        private removeDataEvent(): void  {
            EventMgr.off(CmdEvent.TopList_List_Ack, this, this.onList_Ack);
            EventMgr.off(CmdEvent.Challenge_LikeNum, this, this.onLikeNum);
            EventMgr.off(CmdEvent.WeekChampion_Like, this, this.onLikeNum);
        }


        public hide(): void  {
            this.visible = false;
            this.removeDataEvent();
        }
        public show(): void  {
            this.visible = true;
            this.addDataEvent();
            this.refreshView();
        }

        private refreshView(): void  {

            //重置底部自己的基础信息显示
            this.selfView.txtNickname.text = PlayerDataMgr.name;
            this.selfView.viewPlayerIcon.setSimpleInfo(ShapeDataMgr.iconId, ShapeDataMgr.iconFrameID, PlayerDataMgr.gender, 0);
            this.selfView.txtFightValue.text = PlayerDataMgr.fightPower + "";
            this.selfView.btnWorship.disabled = true;
            this.selfView.frame.skin = "res/common/xz_bg11.png";
            this.selfView.imgFrameRank.frame = 0;
            this.selfView.txtRank.text = Global.getLangStr("common_norank");
            this.selfView.txtRank.fontSize = 26;
            this.selfView.txtScore.text = "0";
            let showcount = cfg.ToplistCfgData.getShowLineByType(this._rankType);
            TopListSend.list(this._rankType, 1, showcount, 0, 0, 0, 0);
        }


		/*****
		 *点赞次数		PBChallengeLikeAck
		 * @param PBChallengeLikeAck
		 * 		playerID			uint32	玩家id
		 * 		likeNum			uint32	次数
		 */
        protected onLikeNum(value: Pb_God.PBU32U32): void  { //冠军赛与竞技场共用同一份点赞数据
            //找到对应的一条，然后刷新即可
            for (var i = 0; i < this._list.length; i++)  {
                let el = this._list[i];
                if (el.playerdisplay.playerid == value.key)  {
                    if (el.challengeData) el.challengeData.likeNum = value.value;
                    this.listView.setItem(i, el);
                    break;
                }
            }
        }
        private _list: Pb_God.PBTopListDetail[] = [];
        /** 收到排行榜 */
        private onList_Ack(tempClass: Pb_God.PBS2CTopListList)  {
            if (!tempClass.ask || this._rankType != tempClass.ask.type) return;

            let list = tempClass.list;
            this._list = list;
            //玩家自己排名信息
            if (tempClass.selfinfo) this.refreshItemRankData(this.selfView, tempClass.selfinfo, true);
            

            this.listView.visible = true;
            this.imgEmpty.visible = list.length <= 0;

            let selfPlayerId = PlayerDataMgr.uid;
            this.listView.onRefreshWithArray(list, this, (itemUI: ProUI.Champion.ListItems.RankItemViewUI, index: number) =>  {
                let data = this._list[index];
                if(data)this.refreshItemRankData(itemUI, data, selfPlayerId == data.playerdisplay.playerid);
            });


        }

        /** 刷新排行榜单条item */
        private refreshItemRankData(tempUI: ProUI.Champion.ListItems.RankItemViewUI, rankInfo: Pb_God.PBTopListDetail, isSelf: boolean = false): void  {

            let rank = rankInfo.info.rank;
            if (rank <= 3 && rank != 0)  {
                tempUI.imgFrameRank.frame = rank;
                tempUI.txtRank.text = "";
            } else  {
                tempUI.imgFrameRank.frame = 0;
                tempUI.txtRank.fontSize = rank == 0 ? 26 : 32;
                tempUI.txtRank.text = rank == 0 ? Global.getLangStr("common_norank") : "" + rank;
            }

            let playerdisplay = rankInfo.playerdisplay;
            tempUI.viewPlayerIcon.setPlayerDisplayInfo(playerdisplay,false);
            tempUI.txtNickname.text = Global.getLangStr("complain_msg8",playerdisplay.worldid,playerdisplay.playername);
            tempUI.txtScore.text = rankInfo.info.value + "";
            if (rankInfo.commonData && rankInfo.commonData.fightpower)
                tempUI.txtFightValue.text = rankInfo.commonData.fightpower + "";
            else
                tempUI.txtFightValue.text = rankInfo.info.subvalue + "";
                
            let canWorship = !isSelf &&   !WeekChampionDataMgr.checkPlayerLike(playerdisplay.playerid) &&
                !WeekChampionDataMgr.isLikeMax();  //是否还可以膜拜
            tempUI.btnWorship.disabled = !canWorship;
            let worshipCount = rankInfo.challengeData ? rankInfo.challengeData.likeNum : 0;
            tempUI.txtWorshioValue.text = worshipCount + "";
            tempUI.btnWorship.onClick(this, () =>  {
                //点击膜拜
                WeekChampionSend.like(playerdisplay.playerid);
            });
        }

        public cleanUp(): void  {
            this.removeDataEvent();
            this.removeEvent();
        }

    }
}