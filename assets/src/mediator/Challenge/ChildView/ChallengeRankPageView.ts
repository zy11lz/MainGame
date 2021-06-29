module Pro
{

    /**
    * 
    * 循环赛界面分离视图逻辑：排名分页
    *
    * @author jason.xu
    * 
    */
    export class ChallengeRankPageView extends ProUI.Challenge.ChildView.RankViewUI implements ITableView
    {
        /** 排行榜类型 */
        private _rankType = Pb_God._emTopListType.TopListType_Challenge;

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {

        }

        public addEvent(): void
        {
            EventMgr.on(CmdEvent.TopList_List_Ack, this, this.onList_Ack);
            EventMgr.on(CmdEvent.Challenge_LikeNum, this, this.onLikeNum);
        }

        public removeEvent(): void
        {
            EventMgr.off(CmdEvent.TopList_List_Ack, this, this.onList_Ack);
            EventMgr.off(CmdEvent.Challenge_LikeNum, this, this.onLikeNum);
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
            this.listView.visible = false;
            this.imgEmpty.visible = false;

            //重置底部自己的基础信息显示
            this.selfView.txtNickname.text = PlayerDataMgr.name;
            this.selfView.viewPlayerIcon.setSimpleInfo(ShapeDataMgr.iconId, ShapeDataMgr.iconFrameID, PlayerDataMgr.gender, 0);
            this.selfView.txtFightValue.text = PlayerDataMgr.fightPower + "";
            this.selfView.txtScore.text = ChallengeDataMgr.getMyScore() + "";
            this.selfView.imgFrameRank.frame = 0;
            this.selfView.imgFrameRank.y = 73;
            this.selfView.txtRank.text = "";
            this.selfView.txtWorshioValue.text = "0"
            this.selfView.frame.skin = UrlMgr.getCommonUrl("xz_bg11");
            this.selfView.txtDesc.y = this.selfView.txtScore.y = 58;
            this.selfView.btnWorship.visible = false;
            this.txtNoRank.visible = true;
            // this.selfView.btnWorship.disabled = true;

            let showcount = cfg.ToplistCfgData.getShowLineByType(this._rankType);
            TopListSend.list(this._rankType, 1, showcount, 0, 0, 0, 0);
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
        }

        public setData($data: any): void
        {

        }

		/*****
		 *点赞次数		PBChallengeLikeAck
		 * @param PBChallengeLikeAck
		 * 		playerID			uint32	玩家id
		 * 		likeNum			uint32	次数
		 */
        protected onLikeNum(value: Pb_God.PBChallengeLikeAck): void
        {
            //找到对应的那条数据，刷新一下次数
            for (let rankdata of this._list)
            {
                if (rankdata.playerdisplay.playerid == value.playerID)
                {
                    if (rankdata.challengeData) rankdata.challengeData.likeNum = value.likeNum;
                    break;
                }
            }

            //要刷新红点，所以全都刷新一次
            let selfPlayerId = PlayerDataMgr.uid;
            this.listView.onRefreshWithArray(this._list, this, (itemUI: ProUI.Challenge.ChildView.RankItemViewUI, index: number) =>
            {
                let data = this._list[index];
                this.refreshItemRankData(itemUI, data, selfPlayerId == data.playerdisplay.playerid);
            });
            //要刷新红点，所以全都刷新一次  ， 下面的屏蔽
            // //找到对应的一条，然后刷新即可
            // for(var i=0; i<this._list.length; i++){
            //     let el = this._list[i];
            //     if(el.playerdisplay.playerid == value.playerID){
            //         if(el.challengeData) el.challengeData.likeNum = value.likeNum;
            //         this.listView.setItem(i, el);
            //         break;
            //     }
            // }
        }

        private _list: Pb_God.PBTopListDetail[] = [];
        /** 收到排行榜 */
        private onList_Ack(tempClass: Pb_God.PBS2CTopListList)
        {
            if (!tempClass.ask || this._rankType != tempClass.ask.type) return;

            let list = tempClass.list;
            this._list = list;
            //玩家自己排名信息
            if (tempClass.selfinfo)
            {
                this.refreshItemRankData(this.selfView, tempClass.selfinfo, true);
                if(tempClass.selfinfo.info.rank <=0){
                    this.txtNoRank.visible = true;
                    this.selfView.txtRank.visible = false;
                }else{
                    this.txtNoRank.visible = false;
                    this.selfView.txtRank.visible = true;
                }
            }

            //将最后一次打开排行榜时，排行榜中列表数量记下来， 把相应的红点去掉或者再次显示出来
            let otherCount = list.length;
            if (tempClass.selfinfo) otherCount--;
            ChallengeDataMgr.setRankOtherCount(otherCount);


            this.listView.visible = true;
            this.imgEmpty.visible = list.length <= 0;

            let selfPlayerId = PlayerDataMgr.uid;
            this.listView.onRefreshWithArray(list, this, (itemUI: ProUI.Challenge.ChildView.RankItemViewUI, index: number) =>
            {
                let data = this._list[index];
                this.refreshItemRankData(itemUI, data, selfPlayerId == data.playerdisplay.playerid);
            });
        }


        /** 刷新排行榜单条item */
        private refreshItemRankData(tempUI: ProUI.Challenge.ChildView.RankItemViewUI, rankInfo: Pb_God.PBTopListDetail, isSelf: boolean = false): void
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
            tempUI.viewPlayerIcon.setPlayerDisplayInfo(playerdisplay,false);
            tempUI.txtNickname.text = playerdisplay.playername;
            tempUI.txtScore.text = rankInfo.info.value + "";
            if (rankInfo.commonData && rankInfo.commonData.fightpower)
                tempUI.txtFightValue.text = rankInfo.commonData.fightpower + "";
            else
                tempUI.txtFightValue.text = rankInfo.info.subvalue + "";

            let canWorship = !isSelf && !ChallengeDataMgr.checkPlayerLike(playerdisplay.playerid) &&
                !ChallengeDataMgr.isLikeMax();  //是否还可以膜拜
            tempUI.btnWorship.disabled = !canWorship;
            tempUI.reddot.visible = canWorship;
            let worshipCount = rankInfo.challengeData ? rankInfo.challengeData.likeNum : 0;
            tempUI.txtWorshioValue.text = worshipCount + "";
            tempUI.btnWorship.onClick(this, () =>
            {
                //点击膜拜
                ChallengeSend.like(playerdisplay.playerid);
            });
        }

        /** 页签组件销毁 */
        public dispose(): void
        {

        }
    }
}