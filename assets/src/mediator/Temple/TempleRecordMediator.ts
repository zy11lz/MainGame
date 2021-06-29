module Pro
{
    /**
    * 界面说明：
    * @author jason.xu
    */
    export class TempleRecordMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Temple.TempleRecordUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("temple")]
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Temple.TempleRecordUI, 1, BaseAddLayer.CenterUI, true);
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
            TempleSend.queryRecord(this.UIOpenData.customObject);
            this.UIPanel.imgEmpty.visible = true;
            this.UIPanel.listView.onRefresh(0, null, null);

            this.refreshUI();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(CmdEvent.Temple_QueryRecord, this, this.onRecord);

            this.UIPanel.btnClose.onClick(this, this.closeUI);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        private _recordList: Pb_God.PBTempleRecord[];
        /** 收到战报列表 */
        private onRecord(value: Pb_God.PBG2CTempleQueryRecord): void
        {
            if (this.UIOpenData.customObject != value.id) return;
            let list = value.record;
            this._recordList = list;
            this.UIPanel.imgEmpty.visible = list.length == 0;
            this.UIPanel.listView.onRefresh(list.length, this, this.onRefreshListItem);
        }

        private onRefreshListItem(tempUI: ProUI.Temple.TempleRecordItemViewUI, index: number): void
        {
            let data = this._recordList[index];
            if (data.battledisplay == null || data.battledisplay.playerdisplay)
            {
                logI("playerdisplay 为空")
                return
            }
            tempUI.txtAttackName.text = Global.getLangStr("temple_msg5") + data.battledisplay.playerdisplay.playername;
            tempUI.txtFightValue.text = Global.getLangStr("common_fightPower") + data.battledisplay.fightpower;
            tempUI.txtEmbattle.text = cfg.PetFormationCfgData.getNameByID(data.battledisplay.zhenfaid);
            tempUI.txtTime.text = Global.getFormatTimeString(data.time * 1000, 4);

            //挑战结果
            let htmlTxt = tempUI.txtResult;
            let result = Global.getLangStr("temple_msg6");//成功";
            htmlTxt.showText = Global.getLangStr("temple_msg7", data.evolvecount, result);
            //上阵英雄列表
            tempUI.listPet.onRefresh(data.battledisplay.petdisplay.length, this, (norItem: NorItemUI, indexPet: number) =>
            {
                let petData = data.battledisplay.petdisplay[indexPet];
                norItem.setPetInfo(petData, false, false);
            })
            tempUI.btnWatch.visible = false;
            //观战按钮
            tempUI.btnWatch.onClick(this, () =>
            {
                //观战功能暂未完善，后续统一接入
                // data.battlesn;
            })
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
        }

    }
}