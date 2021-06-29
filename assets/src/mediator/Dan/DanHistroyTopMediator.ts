module Pro
{
    /**
    * 界面说明： 超凡段位赛-赛季传奇（历史赛季的排名前几名显示界面）
    * @author jason.xu
    */
    export class DanHistroyTopMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Dan.DanHistroyUI;

        private _baseRoleList: BaseRole[] = [];

        /** 当前翻页的赛季 */
        private _curShowSeasonNum = -1;
        /** 当前显示的赛区id */
        private _showAreaId = -1;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("dan_history"), UrlMgr.getAtlas("arenaenter")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Dan.DanHistroyUI, 1);
        }


        /*** 关闭UI */
        public closeUI(): void
        {
            super.closeUI();
            for (let role of this._baseRoleList)
            {
                Global.removeBaseRole(role);
            }
            this._baseRoleList = [];
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
            this._showAreaId = DanDataMgr.curAreaId;
            //默认显示到当前赛季的前一赛季，因为当前赛季不存在有历史记录。
            let defaultSeasonNum = DanDataMgr.seasonNumber - 1;
            if (defaultSeasonNum < 1) defaultSeasonNum = 1;
            this.setShowSeasonNum(defaultSeasonNum, true);
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnShowArea.onClick(this, this.onClickShowArea);
            this.UIPanel.btnLeft.onClick(this, this.onClickLeft);
            this.UIPanel.btnRight.onClick(this, this.onClickRight);

            //data events
            this.addEventMgr(EventNotify.Dan_ShowHistroyAreaId_Change, this, this.onChangeShowArea);
            // 	 赛区信息查询		PBDanKingRecord
            this.addEventMgr(CmdEvent.Dan_SeasonAreaInfoAck, this, this.onSeasonAreaInfoAck)
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        private onClickShowArea(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_DanSelectShowArea, this._curShowSeasonNum));
        }

        private onClickLeft(): void
        {
            this.setShowSeasonNum(this._curShowSeasonNum - 1);
        }

        private onClickRight(): void
        {
            this.setShowSeasonNum(this._curShowSeasonNum + 1);
        }

        /** 修改显示的赛季id */
        private setShowSeasonNum(value: number, forceRefresh: boolean = false): void
        {
            if (this._curShowSeasonNum == value && !forceRefresh) return;
            this._curShowSeasonNum = value;
            this.UIPanel.btnLeft.disabled = value <= 1;
            this.UIPanel.btnRight.disabled = value >= DanDataMgr.seasonNumber;
            //刷新
            this.resetSeasonAreaInfo();
        }
        /** 修改当前查看的赛区ID */
        private onChangeShowArea(areaId: number): void
        {
            this._showAreaId = areaId;
            this.resetSeasonAreaInfo();
        }

        /** 刷新当前赛区与赛季对应的数据 */
        private resetSeasonAreaInfo(): void
        {
            if (this._curShowSeasonNum >= DanDataMgr.seasonNumber)
            {
                //当前赛季固定的虚位以待
                this.onSeasonAreaInfoAck(null);
            } else
            {
                DanSend.seasonAreaInfoAsk(this._curShowSeasonNum, this._showAreaId, 0, 0);
            }
        }

        /*****
         * 	 赛区信息查询		PBDanKingRecord
         * @param PBDanKingRecord
         * 		seasonid			uint32	 赛季ID
         * 		areaid			uint32	 分区ID
         * 		topplayer			PBDanKingTopPlayer	 排名信息
         */
        protected onSeasonAreaInfoAck(value: Pb_God.PBDanKingRecord): void
        {
            //返回的数据已过时了。
            if (value &&
                (value.areaid != this._showAreaId || value.seasonid != this._curShowSeasonNum))
                return;

            let areaName = cfg.DanAreaCfgData.getAreaNameByID(this._showAreaId);
            this.UIPanel.txtTitle.text = Global.getLangStr("dan_msg3", this._curShowSeasonNum, areaName)

            //玩家角色列表
            let list = [];
            if (value && value.topplayer) list = value.topplayer;
            let roleCount = this.UIPanel.playerNodes.numChildren;
            for (var i = 0; i < roleCount; i++)
            {
                var tempUI = this.UIPanel.playerNodes.getChildAt(i) as ProUI.Dan.ChildItemView.HistroyRoleViewUI;
                let playerData = list[i];
                if (playerData)
                {
                    let playerdisplayer: Pb_God.PBPlayerDisplay = playerData.playerdisplay;
                    //称号
                    Global.setResShapeTitle(tempUI.imgTitle, cfg.DanTopPrizeCfgData.getAddTitleByRank(i + 1));
                    //形象
                    let baseRole = this._baseRoleList[i];
                    if (!baseRole)
                    {
                        baseRole = Global.createBaseRoleForPreview(tempUI.spHeroAvatar, false);
                        this._baseRoleList[i] = baseRole;
                    }
                    let shapeResoursId = playerdisplayer.shape || 1;//cfg.PetSkinCfgData.getResourceIDByID();
                    baseRole.resetRes(shapeResoursId, RoleResType.Show, true);
                    var showScale = cfg.PetSkinCfgData.getShowScaleById(shapeResoursId);
                    baseRole.scale(showScale, showScale);

                    tempUI.boxFightValue.visible = true;
                    tempUI.txtFightValue.text = "" + playerData.fightpower;
                    tempUI.txtNickname.text = `[S${ playerdisplayer.worldid }]` + playerdisplayer.playername;

                } else
                {
                    tempUI.imgTitle.skin = "";
                    Global.removeBaseRole(this._baseRoleList[i]);
                    this._baseRoleList[i] = null;
                    tempUI.boxFightValue.visible = false;
                    tempUI.txtFightValue.text = "0";
                    tempUI.txtNickname.text = Global.getLangStr("common_empty1");
                }
            }

        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

    }
}