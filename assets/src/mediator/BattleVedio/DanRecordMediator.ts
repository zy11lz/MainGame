module Pro
{
    /**
    * 界面说明： 超凡段位赛-战斗记录界面
    * @author jason.xu
    */
    export class DanRecordMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.BattleVedio.DanRecordUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("vedio")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.BattleVedio.DanRecordUI, 1, BaseAddLayer.CenterUI, true, 1);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.tabGrp.onClick(this, this.onClickTabGroup,
                [new component.UITabData("ladder_msg3"), new component.UITabData("ladder_msg4")],
                [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]
            );
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.UIPanel.tabGrp.setSelectTab(0);
            this.refreshUI();
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);

            //	 查询我的记录返回 PBG2CDanRecords
            this.addEventMgr(Cmd.S2C_Dan_Record.cmdName, this, this.onRecord)
            //	 查询大神记录返回 PBG2CDanRecords
            this.addEventMgr(Cmd.S2C_Dan_MasterRecord.cmdName, this, this.onMasterRecord)
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 点击主分页 */
        private onClickTabGroup(tab: component.UITab, tabIndex: number, oldTabIndex: number): void
        {
            this.UIPanel.listEmpty.visible = false;
            this.UIPanel.listView.visible = false;
            if (tabIndex == 1)
            {                //大神记录
                DanSend.masterRecord();
            }
            else
            {
                DanSend.record();
            }
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            this.UIPanel.txtCurDan.text = Global.getLangStr("dan_msg1") + cfg.DanUpgradeCfgData.getDanNameByDanID(DanDataMgr.curDanId);
        }
        protected onRecord(value: Pb_God.PBG2CDanRecords): void
        {
            if (this.UIPanel.tabGrp.tabIndex != 0) return;
            this.setList(value.records, false);
        }

        protected onMasterRecord(value: Pb_God.PBG2CDanRecords): void
        {
            if (this.UIPanel.tabGrp.tabIndex != 1) return;
            this.setList(value.records, true);
        }

        private setList(records: Pb_God.PBPlayerDanRecord[], isCrossMaster: boolean)
        {
            if (!records) records = [];
            //倒个序
            records = records.reverse();
            this.UIPanel.listEmpty.visible = records.length <= 0;
            this.UIPanel.listView.visible = true;
            this.UIPanel.listView.onRefresh(records.length, this, (tempUI: DanRecordItemView, index: number) =>
            {
                tempUI.setData(records[index], isCrossMaster);
            })
        }
    }
}