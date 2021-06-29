module Pro
{
    /**
    * 远征录像
    */
    export class ExpeditionRecordMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Fuben.Expedition.Record.MainUI;
        public SelStageID: number;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("vedio")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Fuben.Expedition.Record.MainUI, 1, BaseAddLayer.TopUI, true);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.closePanel();
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

            this.SelStageID = cfg.ExpeditionStageCfgData.getStageIDByIndex(this.UIOpenData.customObject);
            VideoSend.queryPlayerRecord(Pb_God._emVideoType.VideoType_PlayerExpdition, this.SelStageID);
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
        }

        /** 本类界面打开状态下监听消息列表 */
        public addEvent(): void
        {
            this.addEventMgr(CmdEvent.Video_PlayerRecordAck, this, this.onRecordAck)
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
        protected onRecordAck(value: Pb_God.PBG2CVideoQuerySystemAck): void
        {
            if (value.videotype != Pb_God._emVideoType.VideoType_PlayerExpdition) return;
            this.UIPanel.imgEmpty.visible = value.display.length <= 0;
            this.UIPanel.listView.visible = true;
            this.UIPanel.listView.onRefreshWithArray(value.display, this, this.onRefreshListItem);
        }

        private onRefreshListItem(tempUI: ProUI.Fuben.Expedition.Record.ListItemUI, index: number): void
        {
            let data = this.UIPanel.listView.array[index] as Pb_God.PBVideoDisplay;

            //left
            tempUI.imgResultL.frame = data.result == Pb_God._emBattleResult.BattleResult_Sucess ? 1 : 2;
            tempUI.imgResultL.visible = data.result != Pb_God._emBattleResult.BattleResult_Equal;
            tempUI.txtNicknameL.text = data.leftdisplay.playerdisplay.playername;
            tempUI.txtLvL.text = data.leftdisplay.playerdisplay.level + Global.getLangStr("common_level");
            tempUI.txtFightPowerL.text = data.leftdisplay.fightpower.toString();
            tempUI.hboxNicknameL.refresh();
            Global.setPetEmbattleList(tempUI.listHerosL, data.leftdisplay, data.battlesn);

            //right
            tempUI.imgResultR.frame = data.result == Pb_God._emBattleResult.BattleResult_Sucess ? 2 : 1;
            tempUI.imgResultR.visible = data.result != Pb_God._emBattleResult.BattleResult_Equal;
            tempUI.txtNicknameR.text = data.rightdisplay.playerdisplay.playername;
            tempUI.txtLvR.text = data.rightdisplay.playerdisplay.level + Global.getLangStr("common_level");
            tempUI.txtFightPowerR.text = data.rightdisplay.fightpower.toString();
            tempUI.hboxNicknameR.refresh();
            Global.setPetEmbattleList(tempUI.listHerosR, data.rightdisplay, data.battlesn);

            //common
            tempUI.txtBattleType.text = "狩猎战场";
            tempUI.txtBoutValue.text = data.curround + "/" + data.maxround;
            tempUI.txtTime.text = Global.getFullTimeString(data.begintime * 1000);

            tempUI.btnReplay.frequencyClickLock = 2000; //控制按钮频繁点击
            tempUI.btnReplay.onClick(this, () =>
            {
                if (data.leftdisplay.playerdisplay.playerid == PlayerDataMgr.uid)
                {
                    VideoSend.playPlayer(Global.getVideoType(data.battletype), data.battlesn, PlayerDataMgr.uid);
                }
                else
                {
                    VideoSend.playSystem(Global.getVideoType(data.battletype), data.battlesn, this.SelStageID);
                }
            });
        }

    }
}