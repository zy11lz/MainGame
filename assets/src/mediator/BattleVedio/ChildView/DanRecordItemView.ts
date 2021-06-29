module Pro
{
    /**
    * 段位赛战斗记录单条item， 此UI在段位赛记录界面与录相馆都有使用，请注意UI的影响
    * @author jason.xu
    */
    export class DanRecordItemView extends ProUI.BattleVedio.ChildView.DanItemViewUI
    {
        private _data: Pb_God.PBPlayerDanRecord;
        /** 是否大神记录（查看跨服其它玩家的） */
        private _isCrossMaster = false;
        constructor()
        {
            super();
            this.initialization();
        }
        private initialization()
        {
            this.btnDetail.onClick(this, this.onClickDetail);
        }

        /** 点击详细按钮回调 */
        private onClickDetail(): void
        {
            if (!this._data) return;
            //打开战斗详细界面                    
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_DanRecordDetail, this._data, this._isCrossMaster));
        }

        public setData(data: Pb_God.PBPlayerDanRecord, isCrossMaster: boolean): void
        {
            this._data = data;
            this._isCrossMaster = isCrossMaster;
            //类型(常规赛 or 王者赛)
            let isNormal = data.type == Pb_God._emBattleType.BattleType_Dan;
            this.txtType.text = isNormal ? Global.getLangStr("dan_type1") : Global.getLangStr("dan_type2");
            this.txtType.color = isNormal ? "#6180b9" : "#d45627";
            this.txtTime.text = Global.getFullTimeString(data.time * 1000);

            //左边玩家信息
            this.imgResultLeft.frame = data.winner == 0 ? 1 : 2;
            // this.imgResultLeft.visible = data.result != Pb_God._emBattleResult.BattleResult_Equal;
            this.playerIconLeft.setPlayerDisplayInfo(data.left, false, true);
            this.txtServerNameLeft.text = `[S${ data.left.worldid }]`;
            this.txtNicknameLeft.text = data.left.playername;
            this.txtRankLeft.text = data.leftrank.toString();
            this.txtLevelLeft.text = data.left.level.toString();
            Global.setDanNormalIcon(this.imgIconLeft, data.leftdan);
            //右边玩家信息
            this.imgResultRight.frame = data.winner == 0 ? 2 : 1;
            // this.imgResultRight.visible = data.result != Pb_God._emBattleResult.BattleResult_Equal;
            this.playerIconRight.setPlayerDisplayInfo(data.right, false, true);
            this.txtServerNameRight.text = `[S${ data.right.worldid }]`;
            this.txtNicknameRight.text = data.right.playername;
            this.txtRankRight.text = data.rightrank.toString();
            this.txtLevelRight.text = data.right.level.toString();
            Global.setDanNormalIcon(this.imgIconRight, data.rightdan);
        }

    }
}