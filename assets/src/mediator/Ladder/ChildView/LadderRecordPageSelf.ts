module Pro
{
    /**
    * 跨服天梯-战报界面-个人记录分页
    * @author jason.xu
    */
    export class LadderRecordPageSelf extends ProUI.Ladder.ChildView.RecordPageSelfUI implements ITableView
    {

        private _list: Pb_God.PBPlayerLadderRecord[] = [];

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.on(Laya.Event.DISPLAY, this, () =>
            {
                LadderSend.queryRecord();
            });
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public addEvent(): void
        {
            //查询我的记录返回	PBG2CLadderRecordAck
            EventMgr.on(CmdEvent.Ladder_RecordAck, this, this.onRecordAck)
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public removeEvent(): void
        {
            EventMgr.off(CmdEvent.Ladder_RecordAck, this, this.onRecordAck)
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
        }

        public setData($data: any): void
        {

        }


		/*****
		 *查询我的记录返回	PBG2CLadderRecordAck
		 * @param PBG2CLadderRecordAck
		 * 		record			PBPlayerLadderRecord	 记录
		 */
        protected onRecordAck(value: Pb_God.PBG2CLadderRecordAck): void
        {
            this._list = value.record;
            let len = 0;
            if (this._list) len = this._list.length;
            this.listView.visible = len > 0;
            this.imgEmpty.visible = len < 0;
            this.listView.onRefresh(len, this, this.onRefreshListItem);
        }

        private onRefreshListItem(tempUI: ProUI.Ladder.ChildView.RecordPageSelfItemUI, index: number): void
        {
            let data = this._list[index];
            tempUI.txtTime.text = Global.getFormatTimeString(data.beggintime * 1000, 4);
            tempUI.txtFightValue.text = data.fightpower + "";
            tempUI.txtNickname.text = `[S${ data.display.worldid }]` + data.display.playername;
            tempUI.playerIcon.setPlayerDisplayInfo(data.display);
            let green = "#16cd16";
            let red = "#e11e1e";

            //排名变化
            let rankChange = data.newrank - data.oldrank;
            if (rankChange == 0)
            { //排名无变化
                tempUI.txtRankChange.showText = Global.getLangStr("fight_msg5");//排名无变化";
            } else if (rankChange < 0 || data.oldrank == 0)
            { //排名升至xx名
                tempUI.txtRankChange.showText = Global.getLangStr("fight_msg6", green, data.newrank);
            } else
            { //排名降至xx名
                tempUI.txtRankChange.showText = Global.getLangStr("fight_msg7", red, data.newrank);
            }
            //战斗结果显示
            let result = data.result;
            tempUI.txtResult.color = red;
            if (result == Pb_God._emBattleResult.BattleResult_DefenseSuc || result == Pb_God._emBattleResult.BattleResult_Sucess)
            {//防守成功
                tempUI.txtResult.color = green;
            }
            tempUI.txtResult.text = Global.getLangStr("champ_bat_result" + result);

            tempUI.btnWatch.onClick(this, () =>
            {
                VideoSend.playPlayer(Pb_God._emVideoType.VideoType_Ladder, data.battlesn, PlayerDataMgr.uid);
            });
        }

        /** 页签组件销毁 */
        public dispose(): void
        {

        }
    }
}