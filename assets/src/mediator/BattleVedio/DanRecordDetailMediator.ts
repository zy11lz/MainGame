module Pro
{
    /**
    * 界面说明： 超凡段位赛-战斗记录详情界面
    * @author jason.xu
    */
    export class DanRecordDetailMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.BattleVedio.DanRecordDetailUI;

        private _basedata: Pb_God.PBPlayerDanRecord;
        /** 是否大神记录（查看跨服其它玩家的） */
        private _isCrossMaster = false;

        private _videoList: Pb_God.PBVideoDisplay[];
        private _snMapBattleResult = new ds.StringMap<Pb_God.PBFightResult>();

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("vedio")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.BattleVedio.DanRecordDetailUI, 1, BaseAddLayer.CenterUI, true, 1);
        }

        public closeUI(): void
        {
            super.closeUI();
            this._videoList = [];
            this._snMapBattleResult.clear();
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
            this.UIPanel.listView.visible = false; //收到列表再打开。
            this._basedata = this.UIOpenData.customObject;
            this._isCrossMaster = this.UIOpenData.customObject2;
            this.UIPanel.listView.visible = false;
            this._videoList = [];

            //向服务器请求录相列表, 拉取录相列表的同时，还需要拉取每个录相数据的战斗结果数据，剩余血量在录相信息里面没有，需要单独拉取
            for (let sn of this._basedata.battlesn)
            {
                if (this._isCrossMaster)
                    VideoSend.queryDamageDataBW(Pb_God._emVideoType.VideoType_Dan, sn);
                else
                    VideoSend.queryDamageData(0,sn);
            }
            //再拉录相列表
            if (this._isCrossMaster)
                VideoSend.queryMutipleBW(Pb_God._emVideoType.VideoType_Dan, this._basedata.battlesn);
            else
                VideoSend.queryMutiple(Pb_God._emVideoType.VideoType_Dan,this._basedata.battlesn);
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);

            //查询战斗数据返回		PBG2CVideoDamageDataAck
            this.addEventMgr(Cmd.S2C_Video_QueryDamageDataAck.cmdName, this, this.onQueryDamageDataAck)
            //查询战斗数据返回		PBG2CVideoDamageDataAck
            this.addEventMgr(Cmd.S2C_Video_QueryDamageDataBW.cmdName, this, this.onQueryDamageDataAck);

            //查询多个录像返回		PBG2CQueryMutileVideo
            this.addEventMgr(Cmd.S2C_Video_QueryMutiple.cmdName, this, this.onQueryMutiple)
            //查询跨服录像多个返回	PBG2CQueryMutileVideo
            this.addEventMgr(Cmd.S2C_Video_QueryMutipleBW.cmdName, this, this.onQueryMutiple)
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

		/*****
		 *查询战斗数据返回		PBG2CVideoDamageDataAck
		 * @param PBG2CVideoDamageDataAck
		 * 		fightResult			PBFightResult	战斗信息
		 */
        protected onQueryDamageDataAck(value: Pb_God.PBG2CVideoDamageDataAck): void
        {
            this._snMapBattleResult.put(value.fightResult.base.battlesn + "", value.fightResult);
            if (this._videoList.length > 0) this.refreshList();
        }

		/*****
		 *查询多个录像返回		PBG2CQueryMutileVideo
		 * @param PBG2CQueryMutileVideo
		 * 		type			uint32	视频类型 _emVideoType
		 * 		display			PBVideoDisplay	录像显示
		 */
        protected onQueryMutiple(value: Pb_God.PBG2CQueryMutileVideo): void
        {
            this._videoList = value.display;
            this.refreshTotalScoreView();
            this.refreshList();
        }

        /** 刷新整体比分显示 */
        private refreshTotalScoreView(): void
        {
            this.UIPanel.txtNicknameLeft.text = `[S${ this._basedata.left.worldid }]${ this._basedata.left.playername }`;
            this.UIPanel.txtNicknameRight.text = `[S${ this._basedata.right.worldid }]${ this._basedata.right.playername }`;
            //比分
            let leftWin = 0;
            let rightWin = 0;
            for (let vidioData of this._videoList)
            {
                if (vidioData.result == Pb_God._emBattleResult.BattleResult_Sucess) leftWin++;
                else if (vidioData.result == Pb_God._emBattleResult.BattleResult_Fail) rightWin++;
            }
            this.UIPanel.txtScore.text = leftWin + ":" + rightWin;
        }

        private refreshList(): void
        {
            this.UIPanel.listView.visible = true;
            this.UIPanel.listView.onRefreshWithArray(this._videoList, this, (itemUI: ProUI.BattleVedio.ChildView.DanRecordDetailItemViewUI, index: number) =>
            {
                let vidioData = this._videoList[index];

                let fightResult = this._snMapBattleResult.get(vidioData.battlesn + "");
                if (fightResult)
                {
                    this.setHpProgress(itemUI.imgProgressLeft, itemUI.txtProgressLeft, fightResult.friendstate);
                    this.setHpProgress(itemUI.imgProgressRight, itemUI.txtProgressRight, fightResult.energystate);
                }
                itemUI.txtNameLeft.text = vidioData.leftdisplay.playerdisplay.playername;
                itemUI.txtNameRight.text = vidioData.rightdisplay.playerdisplay.playername;
                itemUI.imgResultLeft.visible = vidioData.result == Pb_God._emBattleResult.BattleResult_Sucess;
                itemUI.imgResultRight.visible = vidioData.result == Pb_God._emBattleResult.BattleResult_Fail;

                //没有数据支持是哪个阵法, 注意是ZhenfaType_Duanwei这样的， zhenfaid是阵型类型（锋疾阵这种）
                itemUI.txtIndexLeft.text = ""; //"[" + Global.getLangStr("zhenfatype_name_0" + (vidioData.leftdisplay.zhenfaid - )) + "]";
                itemUI.txtIndexRight.text = ""; //

                itemUI.txtFightValueLeft.text = vidioData.leftdisplay.fightpower + "";
                itemUI.txtFightValueRight.text = vidioData.rightdisplay.fightpower + "";

                //英雄列表
                Global.setPetEmbattleList(itemUI.listHerosLeft, vidioData.leftdisplay, vidioData.battlesn);
                Global.setPetEmbattleList(itemUI.listHerosRight, vidioData.rightdisplay, vidioData.battlesn);

                //common
                itemUI.txtBout.text = vidioData.curround + "/" + vidioData.maxround;
                itemUI.txtTime.text = Global.getFullTimeString(vidioData.begintime * 1000);


                //点击数据
                itemUI.btnData.onClick(this, () =>
                {
                    //打开界面再做请求，因为其它地方也有可能会要拉取这个数据
                    if (fightResult)
                        UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_BattleFightStatistics, [null, fightResult]));
                    else
                        UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_BattleFightStatistics, [vidioData.battlesn, this._isCrossMaster, Pb_God._emVideoType.VideoType_Dan]));
                })
                //点击回放
                itemUI.btnReplay.onClick(this, () =>
                {
                    if (this._isCrossMaster)
                        VideoSend.playBW(Pb_God._emVideoType.VideoType_Dan, vidioData.battlesn);
                    else
                        VideoSend.playPlayer(Pb_God._emVideoType.VideoType_Dan, vidioData.battlesn, vidioData.leftdisplay.playerdisplay.playerid);
                })
            });
        }

        /** 计算总血量的百分比 */
        private setHpProgress(bar: Laya.Image, label: component.UILabel, stateInfo: Pb_God.PBPetFightStateInfo[]): void
        {
            let cur = 0;
            let max = 0;
            for (let el of stateInfo)
            {
                cur += el.curhp.toNumber();
                max += el.maxhp.toNumber();
            }
            let progress = max == 0 ? 0 : cur / max;
            Global.setProgressBarMask(bar, progress);
            label.text = Global.parsePercentNum(progress, 0);
        }

    }
}