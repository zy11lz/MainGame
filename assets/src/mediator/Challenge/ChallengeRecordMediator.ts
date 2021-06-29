module Pro
{
    /**
    * 
    * 模块：竞技场排位赛战报界面
    *
    * @author jason.xu
    * 
    */
    export class ChallengeRecordMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Challenge.ChallengeRecordUI;

        //战报数据过大时，服务器会拆分为多个包发送过来，所以需要对应序列去把列表拼接处理。
        private _detailIndex = 0;
        private _detail: Pb_God.PBFightResult[] = [];

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("challenge")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Challenge.ChallengeRecordUI, 1, BaseAddLayer.TopUI, true);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.closePanel();
            this._detailIndex = 0;
            this._detail = [];
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
            this.UIPanel.imgEmpty.visible = true;
            this.UIPanel.listView.visible = false;
            this.refreshUI();

            VideoSend.queryPlayerRecord(Pb_God._emVideoType.VideoType_Challenge, 0);
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
        }

        /** 本类界面打开状态下监听消息列表 */
        public addEvent(): void
        {
            //挑战记录		PBChallengeRecordAck
            this.addEventMgr(CmdEvent.Video_PlayerChallengeAck, this, this.onRecordAck)

            this.UIPanel.btnClose.onClick(this, this.closeUI);
        }

        /** 本类界面打开状态下监听消息列表 */
        public removeEvent(): void
        {

        }


		/*****
		 *查询玩家录像记录返回		PBG2CVideoPlayerRecordAck
		 * @param PBG2CVideoPlayerRecordAck
		 * 		battletype			uint32	战斗类型
		 * 		detail			PBFightResult	战斗详情
         * */
        protected onRecordAck(value: Pb_God.PBG2CVideoPlayerRecordAck): void
        {
            if (value.battletype != Pb_God._emVideoType.VideoType_Challenge) return;
            //可能会有多条数据，此处需要对应做拼接处理
            if (value.index != this._detailIndex) return;
            this._detailIndex++;
            this._detail = this._detail.concat(value.detail);
            this.UIPanel.imgEmpty.visible = this._detail.length <= 0;
            this.UIPanel.listView.visible = true;
            this.UIPanel.listView.onRefreshWithArray(this._detail, this, this.onRefreshListItem);
        }

        private onRefreshListItem(tempUI: ProUI.Challenge.ChildView.RecordItemViewUI, index: number): void
        {
            let data = this._detail[index] as Pb_God.PBFightResult;
            if (!data) return;
            let challengeData = data.challengeresult;

            let atkPlayerDisplay = data.base.friend.playerdisplay;
            let defPlayerDisplay = data.base.energy.playerdisplay;
            //把自己摆左边
            let selfIsAtk = atkPlayerDisplay.playerid == PlayerDataMgr.uid;
            let rightPlayerDisplay = selfIsAtk ? defPlayerDisplay : atkPlayerDisplay;

            //左边是胜还是败
            let selfWin = selfIsAtk == (data.result == Pb_God._emBattleResult.BattleResult_Sucess);
            tempUI.imgFrameResult.frame = selfWin ? 1 : 2;

            tempUI.viewPlayerIconSelf.setSimpleInfo(ShapeDataMgr.iconId, ShapeDataMgr.iconFrameID, PlayerDataMgr.gender, 0);
            tempUI.viewPlayerIconEnemy.setPlayerDisplayInfo(rightPlayerDisplay, false, true);
            tempUI.txtNicknameLeft.text = PlayerDataMgr.name;
            tempUI.txtNicknameRight.text = rightPlayerDisplay.playername;

            tempUI.txtTime.text = Global.getFormatTimeString(data.endtime * 1000, 4);

            //结果显示
            if (selfIsAtk)
            {
                if (selfWin) tempUI.txtResult.text = Global.getLangStr("champ_bat_result0"); //进攻成功
                else tempUI.txtResult.text = Global.getLangStr("champ_bat_result1"); //进攻失败
            } else
            {
                if (selfWin) tempUI.txtResult.text = Global.getLangStr("champ_bat_result3"); //防守成功
                else tempUI.txtResult.text = Global.getLangStr("champ_bat_result4"); //防守失败
            }

            //积分变化
            let scoreChange = selfIsAtk ? challengeData.friendaddscore : challengeData.enermyaddscore;
            if (scoreChange == 0)
            { //不变
                tempUI.txtScoreChange.text = Global.getLangStr("challenge_msg6");
                tempUI.txtScoreChange.color = "#5b545b";
                tempUI.imgChangeArrow.frame = 3; //不显示
            } else if (scoreChange > 0)
            { //上升
                tempUI.txtScoreChange.text = "+" + scoreChange;
                tempUI.txtScoreChange.color = "#5bcb72";
                tempUI.imgChangeArrow.frame = 1;
            } else
            { //下降
                tempUI.txtScoreChange.text = "" + scoreChange;
                tempUI.txtScoreChange.color = "#f5785b";
                tempUI.imgChangeArrow.frame = 2;
            }

            tempUI.btnWatch.onClick(this, () =>
            {
                VideoSend.playPlayer(Pb_God._emVideoType.VideoType_Challenge, data.base.battlesn, PlayerDataMgr.uid);
            })
        }

    }
}