module Pro
{
    /**
    * 录相馆普通战斗单条数据，在主界面与个人收藏、个人记录界面均有用到。
    * @author jason.xu
    */
    export class BattleVedioNormalItemView extends ProUI.BattleVedio.ChildView.NomalListItemUI
    {
        private _data: Pb_God.PBVideoDisplay;
        private _vedioType = 0;
        constructor()
        {
            super();
            this.initialization();
        }
        private initialization()
        {
            this.addEvents();
            this.btnReplay.frequencyClickLock = 2000; //控制按钮频繁点击
        }

        private addEvents(): void
        {
            this.btnCollect.onClick(this, this.onClickCollect);
            this.btnUnCollect.onClick(this, this.onClickUnCollect);
            this.btnData.onClick(this, this.onClickData);
            this.btnShare.onClick(this, this.onClickShare);
            this.btnReplay.onClick(this, this.onClickReplay);
            this.btnLike.onClick(this, this.onClickLike);
        }

        /** 点击收藏 */
        private onClickCollect(): void
        {
            VideoSend.collect(this._data.battlesn);
        }

        /** 点击取消收藏 */
        private onClickUnCollect(): void
        {
            VideoSend.unCollect(this._data.battlesn);
        }

        /** 点击数据 */
        private onClickData(): void
        {
            //打开界面再做请求，因为其它地方也有可能会要拉取这个数据
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_BattleFightStatistics, [this._data.battlesn, false, this._vedioType]));
        }

        /** 点击分享 */
        private onClickShare(): void
        {
            ShareChatView.showVedio(this.btnShare, this._data, this._vedioType);
        }

        /** 点击点赞 */
        private onClickLike(): void
        {
            //判断点赞次数
            if (VideoDataMgr.getTodayLikeTime() >= VideoDataMgr.getTodayMaxLikeTime())
            {
                TipsUtils.showTipsByLanId("tips_msg67");
                return;
            }
            VideoSend.like(this._vedioType, this._data.battlesn);
        }
        /** 点击回放 */
        private onClickReplay(): void
        {
            VideoSend.playSystem(this._vedioType, this._data.battlesn, 0);
        }

        public setData(data: Pb_God.PBVideoDisplay, vedioType: number): void
        {
            this._vedioType = vedioType;
            this._data = data;
            let isSelf = data.id == PlayerDataMgr.uid;                             //是否是自己
            let isLike = VideoDataMgr.getIsLikeRideo(data.battlesn as Long);       //是否已经点赞
            let isCollect = VideoDataMgr.getIsCollectRideo(data.battlesn as Long); //是否已经收藏
            let leftLikeCount = VideoDataMgr.getTodayLastLikeTime();               //剩余点赞次数
            this.btnLike.disabled = isSelf;
            this.btnLike.visible = !isLike;
            this.btnYetLike.visible = isLike;
            this.imgReddotLike.visible = leftLikeCount > 0 && !isSelf;
            this.btnCollect.visible = !isCollect;
            this.btnUnCollect.visible = isCollect;
            this.boxAtkDef.visible = data.battletype != Pb_God._emBattleType.BattleType_Champion;
            this.boxRank.visible = data.battletype == Pb_God._emBattleType.BattleType_Challenge;
            //...

            //left
            this.imgResultL.frame = data.result == Pb_God._emBattleResult.BattleResult_Sucess ? 1 : 2;
            this.imgResultL.visible = data.result != Pb_God._emBattleResult.BattleResult_Equal;
            this.txtNicknameL.text = data.leftdisplay.playerdisplay.playername;
            this.txtLvL.text = data.leftdisplay.playerdisplay.level + Global.getLangStr("common_level");
            this.txtFightPowerL.text = data.leftdisplay.fightpower.toString();
            this.txtRankL.text = data.friendrank + "";
            this.hboxNicknameL.refresh();
            Global.setPetEmbattleList(this.listHerosL, data.leftdisplay, data.battlesn);

            //right
            this.imgResultR.frame = data.result == Pb_God._emBattleResult.BattleResult_Sucess ? 2 : 1;
            this.imgResultR.visible = data.result != Pb_God._emBattleResult.BattleResult_Equal;
            this.txtNicknameR.text = data.rightdisplay.playerdisplay.playername;
            this.txtLvR.text = data.rightdisplay.playerdisplay.level + Global.getLangStr("common_level");
            this.txtFightPowerR.text = data.rightdisplay.fightpower.toString();
            this.txtRankR.text = data.enermyrank + ""
            this.hboxNicknameR.refresh();
            Global.setPetEmbattleList(this.listHerosR, data.rightdisplay, data.battlesn);

            //common
            this.txtBoutValue.text = data.curround + "/" + data.maxround;
            this.txtTime.text = Global.getFullTimeString(data.begintime * 1000);
            this.txtPlayCount.text = data.playcount.toString();
            this.txtTranspondCount.text = data.sharecount.toString();
            this.txtLikeCount.text = data.likecount.toString();
            this.txtBattleType.text = cfg.BattleTypeCfgData.getNameByAttrType(data.battletype);
        }

    }
}