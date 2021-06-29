module Pro
{
    /**
    * 跨服天梯-战报界面-大神风采分页
    * @author jason.xu
    */
    export class LadderRecordPageNiubility extends ProUI.Ladder.ChildView.RecordPageNiubilityUI implements ITableView
    {

        private _list: Pb_God.PBLadderPublicRecord[];

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.on(Laya.Event.DISPLAY, this, () =>
            {
                LadderSend.queryPublicRecord(0, 0, 0);
            });
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public addEvent(): void
        {
            //查询大神记录返回	PBLadderPublicAllRecord
            EventMgr.on(CmdEvent.Ladder_PublicRecordAck, this, this.onPublicRecordAck)
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public removeEvent(): void
        {
            EventMgr.off(CmdEvent.Ladder_PublicRecordAck, this, this.onPublicRecordAck)
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
		 *查询大神记录返回	PBLadderPublicAllRecord
		 * @param PBLadderPublicAllRecord
		 * 		groupid			uint32	组ID
		 * 		record			PBLadderPublicRecord	大神记录
		 */
        protected onPublicRecordAck(value: Pb_God.PBLadderPublicAllRecord): void
        {
            this._list = value.record;
            let len = 0;
            if (this._list) len = this._list.length;
            this.listView.visible = len > 0;
            this.imgEmpty.visible = len < 0;
            this.listView.onRefresh(len, this, this.onRefreshListItem);
        }

        private onRefreshListItem(tempUI: ProUI.Ladder.ChildView.RecordPageNiubilityItemUI, index: number): void
        {
            let data = this._list[index];
            tempUI.txtTime.text = Global.getFormatTimeString(data.time * 1000, 4);
            tempUI.txtRankL.text = Global.getLangStr("common_rank1") + data.winrank;
            tempUI.txtRankR.text = Global.getLangStr("common_rank1") + data.failrank;

            tempUI.txtNicknameL.text = `[S${ data.windisplay.worldid }]` + data.windisplay.playername;
            tempUI.txtNicknameR.text = `[S${ data.faildisplay.worldid }]` + data.faildisplay.playername;
            tempUI.playerIconL.setPlayerDisplayInfo(data.windisplay);
            tempUI.playerIconR.setPlayerDisplayInfo(data.faildisplay);
            tempUI.btnWatch.onClick(this, () =>
            {
                VideoSend.playBW(Pb_God._emVideoType.VideoType_Ladder, data.battlesn);
            });
        }

        /** 页签组件销毁 */
        public dispose(): void
        {
            this._list = null;
        }
    }
}