module Pro
{

    /**
    * 
    * 冠军赛界面-战斗中数据视图（包括赛事进程，双方阵营等）
    *
    * @author jason.xu
    * 
    */
    export class ChampFightingView extends ProUI.Champion.ChildView.FightingViewUI
    {

        private _fightData: Pb_God.PBChampionBattle;

        constructor()
        {
            super();
            this.init();
            this.addUIEvent();
        }
        private init()
        {
            this.btnWatch.frequencyClickLock = 3000; //控制按钮频繁点击
        }

        private addUIEvent(): void
        {
            this.btnWatch.onClick(this, this.onClickWatch);
        }


        private addDataEvent(): void
        {

        }

        private removeDataEvent(): void
        {

        }

        private onClickWatch(): void
        {
            if (!this._fightData) return;
            VideoSend.playSystem(Pb_God._emVideoType.VideoType_Champion, this._fightData.battlesn, this._fightData.leftbattle.playerdisplay.playerid);
        }

        /** 观战当前战斗对阵 */
        public watchCurFight(): boolean
        {
            if (!this._fightData) return false;
            this.btnWatch.activeEvent(); //走按钮点击的流程，以便内部控制频繁点击
            return true;
        }

        public hide(): void
        {
            this._isReadyShow = false;
            this.visible = false;
            this._fightData = null;
            this.removeDataEvent();
        }
        private _isReadyShow = false;
        /** 界面show时只是标记一下当前可以显示，等收到数据后再正式显示出来 */
        public show(): void
        {
            this._isReadyShow = true;
            this.addDataEvent();
        }

        private showAck(): void
        {
            this.visible = true;
        }

        /** 把对阵数据再刷新一下状态 */
        public refreshView(): void
        {
            if (this.visible) this.setFightInfo(this._fightData);
        }
        /** 显示对阵数据 */
        public setFightInfo(battleData: Pb_God.PBChampionBattle): void
        {
            if (!this._isReadyShow) return;
            this._fightData = battleData;
            if (!battleData) return;
            this.showAck();

            let leftPlayerDisplay = battleData.leftbattle.playerdisplay;
            let rightPlayerDisplay = battleData.rightbattle.playerdisplay;
            this.playerIconL.setPlayerDisplayInfo(leftPlayerDisplay, false);
            this.playerIconR.setPlayerDisplayInfo(rightPlayerDisplay, false);
            this.txtNicknameL.text = leftPlayerDisplay.playername;
            this.txtNicknameR.text = rightPlayerDisplay.playername;
            this.txtLvL.text = "Lv." + leftPlayerDisplay.level;
            this.txtLvR.text = "Lv." + rightPlayerDisplay.level;

            Global.setResPetZhengfa(this.imgEmbattleL, battleData.leftbattle.zhenfaid);
            Global.setResPetZhengfa(this.imgEmbattleR, battleData.rightbattle.zhenfaid);
            this.txtFightValueL.text = "战力：" + battleData.leftbattle.fightpower + "";
            this.txtFightValueR.text = "战力：" + battleData.rightbattle.fightpower + "";

            //伙伴列表
            Global.setPetEmbattleList(this.listHerosL, battleData.leftbattle, battleData.battlesn);
            Global.setPetEmbattleList(this.listHerosR, battleData.rightbattle, battleData.battlesn);

            let state = ChampionDataMgr.state;
            let curRound = ChampionDataMgr.round; //当前赛事的回合ID(选拔赛等)
            //当前这个对战已经结束
            let isOver = state == Pb_God._emChampionState._emChampionState_End || curRound > battleData.roundid || curRound == 0;
            //正在战斗中
            let isFighting = !isOver && state == Pb_God._emChampionState._emChampionState_Fight;

            this.imgWinLeft.visible = isOver && battleData.winplayerid == leftPlayerDisplay.playerid;
            this.imgWinRight.visible = isOver && battleData.winplayerid == rightPlayerDisplay.playerid;

            let canWatch = isOver || isFighting;
            this.imgVs.visible = !canWatch;
            this.btnWatch.visible = canWatch;
            if (canWatch)
            {
                // 1观战 2查看
                this.imgBtnWatch.frame = isFighting ? 1 : 2;
            }
        }


        public cleanUp(): void
        {
            this._isReadyShow = false;
            this.removeDataEvent();
        }

    }
}