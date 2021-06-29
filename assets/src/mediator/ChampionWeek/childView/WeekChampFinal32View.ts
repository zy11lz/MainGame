module Pro
{

    /**
    * 
    * 冠军赛界面分离视图逻辑：32强视图
    * 包括了两个子分页： 4个滑页的32强对阵，与最后4强对阵
    * @author jason.xu
    * 
    */
    export class WeekChampFinal32View extends ProUI.WeekChampion.ChildView.Final32ViewUI
    {
        /** 当前显示的分页是否为64强 */
        private _curPageIs64 = false;
        /** 当前32强分组id(8人1组, 总共4组  1234) */
        private _32GroupId: number = 1;

        constructor()
        {
            super();
            this.init();
            this.addUIEvent();
        }

        private init()
        {

        }

        public hide(): void
        {
            this.visible = false;
            this.removeDataEvent();
        }
        public show8(): void
        {
            this.visible = true;
            this._curPageIs64 = false;
            this.addDataEvent();
            this.shiftPage(this._curPageIs64, true);
        }

        public show64(): void
        {
            this.visible = true;
            this._curPageIs64 = true
            this.addDataEvent();
            this.shiftPage(this._curPageIs64, true);
        }



        public cleanUp(): void
        {
            this.removeDataEvent();
        }


        private addUIEvent(): void
        {
            this.btnTab1.onClick(this, () => { this.shiftPage(true, false); });
            this.btnTab2.onClick(this, () => { this.shiftPage(false, false); });
            this.btnMyGuess.onClick(this, this.onClickMyGuess);
            //32强的四个组切换
            this.ArrowItemUI.onClick(this, this.onClickArrowPage);

        }


        private addDataEvent(): void
        {
            //查询32强返回		PBG2CChampionQuery32ListAck
            EventMgr.on(CmdEvent.WeekChampion_Query32ListAck, this, this.onQuery32ListAck)
            //查询4强返回		PBChampionFight4
            EventMgr.on(CmdEvent.WeekChampion_Query4ListAck, this, this.onQuery4ListAck)
            //查询对应回合数据
            EventMgr.on(CmdEvent.WeekChampion_QueryRoundAck, this, this.onQueryRoundAck)
        }

        private removeDataEvent(): void
        {
            //查询32强返回		PBG2CChampionQuery32ListAck
            EventMgr.off(CmdEvent.WeekChampion_Query32ListAck, this, this.onQuery32ListAck)
            //查询4强返回		PBChampionFight4
            EventMgr.off(CmdEvent.WeekChampion_Query4ListAck, this, this.onQuery4ListAck)
            //查询对应回合数据
            EventMgr.off(CmdEvent.WeekChampion_QueryRoundAck, this, this.onQueryRoundAck)

        }
        /**  点击我的竞猜按钮 */
        private onClickMyGuess(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_WeekChampionMyGuess));
        }

        /**
         * 切换分页
         * @param is32Page 是否切到32强分页
         * @param forceRefresh 强制刷新一次
         */
        private shiftPage(is32Page: boolean, forceRefresh: boolean)
        {
            if (is32Page == this._curPageIs64 && !forceRefresh) return;
            this._curPageIs64 = is32Page;
            this.frameImgBtnTab1.frame = is32Page ? 2 : 1;
            this.frameImgBtnTab2.frame = is32Page ? 1 : 2;
            this.txtTabLabel1.color = is32Page ? "#fffced" : "#433d43";
            this.txtTabLabel2.color = !is32Page ? "#fffced" : "#433d43";

            this.view64.visible = false;
            this.view8.visible = false;

            if (is32Page)
            {
                this.setFinal32Page(this._32GroupId);
            } else
            {  //4强分页
                WeekChampionSend.queryRound(Pb_God._emWeekChampionRound._emWeekChampionRound_TOP8,1);
            }
        }

        /** 点击32强的四个分组翻页 */
        private onClickArrowPage(statue: number): void
        {
            let changeId = this._32GroupId;
            if (statue == 0)
            {
                changeId--;
                if (changeId <= 0) changeId = 8;
            }
            else if (statue == 1)
            {
                changeId++;
                if (changeId > 8) changeId = 1;
            }
            this.setFinal32Page(changeId);
        }

        /** 切换32强内的分组（ABCD） */
        private setFinal32Page(index: number): void
        {
            this._32GroupId = index;
            this.txtGroup.text = Global.getLangStr("champ_group", String.fromCharCode(64 + this._32GroupId));   //ABCD组
            // WeekChampionSend.query32List(index);
            WeekChampionSend.queryRound(Pb_God._emWeekChampionRound._emWeekChampionRound_TOP64,this._32GroupId)
        }

		/*****
		 *查询32强返回		PBG2CChampionQuery32ListAck
		 * @param PBG2CChampionQuery32ListAck
		 * 		begintime			uint32	开始时间
		 * 		round			uint32	回合ID_emChampionRound
		 * 		state			uint32	状态_emChampionState
		 * 		areaid			uint32	赛区ID
		 * 		list			PBChampionFight32	列表
		 */
        protected onQuery32ListAck(value: Pb_God.PBG2CChampionQuery32ListAck): void
        {
            if (!this._curPageIs64) return;
            if (this._32GroupId != value.areaid) return;

            this.view64.visible = true;

            let idMapPlayerDisplay = new ds.StringMap<Pb_God.PBPlayerDisplay>();
            if (value.list) idMapPlayerDisplay = Global.listToStringMapData(value.list.allplayer, "playerid", idMapPlayerDisplay);
            //从后面到前面排列，因为后面的匹配会乱序。
            //分区冠军
            let fightList1 = (value.list && value.list.fight1) ? value.list.fight1 : [];
            this.refreshFightInfo(idMapPlayerDisplay, 6, fightList1[0], Pb_God._emChampionRound._emChampionRound_Area1);
            //分区半决赛
            let fightList2 = (value.list && value.list.fight2) ? value.list.fight2 : [];
            fightList2 = this.sortFinalList(fightList1, fightList2);
            for (var i = 0; i < 2; i++)
            {
                this.refreshFightInfo(idMapPlayerDisplay, i + 4, fightList2[i], Pb_God._emChampionRound._emChampionRound_Area2);
            }
            //分区4强
            var fightList4 = (value.list && value.list.fight4) ? value.list.fight4 : [];
            fightList4 = this.sortFinalList(fightList2, fightList4);
            for (var i = 0; i < 4; i++)
            {
                this.refreshFightInfo(idMapPlayerDisplay, i, fightList4[i], Pb_God._emChampionRound._emChampionRound_Area4);
            }
        }

		/*****
		 *查询4强返回		PBG2CChampionQuery4ListAck
		 * @param PBG2CChampionQuery4ListAck
		 * 		begintime			uint32	开始时间
		 * 		round			uint32	回合ID_emChampionRound
		 * 		state			uint32	状态_emChampionState
		 * 		areaid			uint32	赛区ID
		 * 		list			PBChampionFight4	列表
		 */
        protected onQuery4ListAck(value: Pb_God.PBG2CChampionQuery4ListAck): void
        {
            if (this._curPageIs64) return;

            this.view8.visible = true;

            let idMapPlayerDisplay = new ds.StringMap<Pb_God.PBPlayerDisplay>();
            if (value.list) idMapPlayerDisplay = Global.listToStringMapData(value.list.allplayer, "playerid", idMapPlayerDisplay);
            //冠军
            var fightList1 = (value.list && value.list.fight1) ? value.list.fight1 : [];
            let fight1 = fightList1[0];
            this.refreshFightInfo(idMapPlayerDisplay, 2, fight1, Pb_God._emChampionRound._emChampionRound_Final1);
            //分区半决赛
            var fightList2 = (value.list && value.list.fight2) ? value.list.fight2 : [];
            fightList2 = this.sortFinalList(fightList1, fightList2);
            for (var i = 0; i < 2; i++)
            {
                this.refreshFightInfo(idMapPlayerDisplay, i, fightList2[i], Pb_God._emChampionRound._emChampionRound_Final2);
            }

            let over = WeekChampionDataMgr.state == Pb_God._emChampionState._emChampionState_End || WeekChampionDataMgr.round == 0;
            //冠军单独图标显示
            if (fight1 && fight1.winplayerid != 0 && over)
            {
                var playerdata = idMapPlayerDisplay.get(fight1.winplayerid);
                Global.setResIconWithItemID(this.imgChampionIcon, CfgID.ResType.Player_Icon, playerdata.head);
            } else
            {
                this.imgChampionIcon.skin = "";
            }
        }

		/*****
		 *查询对应回合数据	PBG2CChampionQueryRoundAck
		 * @param PBG2CChampionQueryRoundAck
		 * 		begintime			uint32	开始时间
		 * 		round			uint32	回合ID_emChampionRound
		 * 		state			uint32	状态_emChampionState
		 * 		areaid			uint32	赛区ID
		 * 		list			PBChampionFightList	列表
		 */
        private onQueryRoundAck(value: Pb_God.PBG2CChampionQueryRoundAck): void
		{
            let idMapPlayerDisplay = new ds.StringMap<Pb_God.PBPlayerDisplay>();
            let isShow = WeekChampionDataMgr.isOpening ? true : value.list ? true : false;
            EventMgr.trigger(EventNotify.WeekChampion_ShowTimeView,isShow);
            if(this._curPageIs64)
            {
                this.view64.visible = true;
                let idMapPlayerDisplay = new ds.StringMap<Pb_God.PBPlayerDisplay>();
                if (value.list) idMapPlayerDisplay = Global.listToStringMapData(value.list.allplayer, "playerid", idMapPlayerDisplay);
                //从后面到前面排列，因为后面的匹配会乱序。
                //分区冠军
                let fightList1 = this.getFightListByRound(value.list,Pb_God._emWeekChampionRound._emWeekChampionRound_TOP16);// 
                this.refreshFightInfo(idMapPlayerDisplay, 6, fightList1[0], Pb_God._emWeekChampionRound._emWeekChampionRound_TOP16);

                //分区半决赛
                let fightList2 = this.getFightListByRound(value.list,Pb_God._emWeekChampionRound._emWeekChampionRound_TOP32);// 
                fightList2 = this.sortFinalList(fightList1, fightList2);
                for (let i = 0; i < 2; i++)
                {
                    this.refreshFightInfo(idMapPlayerDisplay, i + 4, fightList2[i], Pb_God._emWeekChampionRound._emWeekChampionRound_TOP32);
                }
                //分区4强
                let fightList4 = this.getFightListByRound(value.list,Pb_God._emWeekChampionRound._emWeekChampionRound_TOP64);// 
                fightList4 = this.sortFinalList(fightList2, fightList4);
                for (let i = 0; i < 4; i++)
                {
                    this.refreshFightInfo(idMapPlayerDisplay, i, fightList4[i], Pb_God._emWeekChampionRound._emWeekChampionRound_TOP64);
                }
            }
            else
            {
                this.view8.visible = true;
                let idMapPlayerDisplay = new ds.StringMap<Pb_God.PBPlayerDisplay>();
                if (value.list) idMapPlayerDisplay = Global.listToStringMapData(value.list.allplayer, "playerid", idMapPlayerDisplay);
                //从后面到前面排列，因为后面的匹配会乱序。
                //分区冠军
                let fightList1 = this.getFightListByRound(value.list,Pb_God._emWeekChampionRound._emWeekChampionRound_TOP2);// 
                this.refreshFightInfo(idMapPlayerDisplay, 6, fightList1[0], Pb_God._emWeekChampionRound._emWeekChampionRound_TOP2);

                //分区半决赛
                let fightList2 = this.getFightListByRound(value.list,Pb_God._emWeekChampionRound._emWeekChampionRound_TOP4);// 
                // fightList2 = this.sortFinalList(fightList1, fightList2);
                for (let i = 0; i < 2; i++)
                {
                    this.refreshFightInfo(idMapPlayerDisplay, i + 4, fightList2[i], Pb_God._emWeekChampionRound._emWeekChampionRound_TOP4);
                }
                //分区4强
                let fightList4 = this.getFightListByRound(value.list,Pb_God._emWeekChampionRound._emWeekChampionRound_TOP8);// 
                // fightList4 = this.sortFinalList(fightList2, fightList4);
                for (let i = 0; i < 4; i++)
                {
                    this.refreshFightInfo(idMapPlayerDisplay, i, fightList4[i], Pb_God._emWeekChampionRound._emWeekChampionRound_TOP8);
                }

                //冠军单独图标显示
                if (fightList1.length > 0 && fightList1[0].winplayerid != 0)
                {
                    var playerdata = idMapPlayerDisplay.get(fightList1[0].winplayerid);
                    Global.setResIconWithItemID(this.imgChampionIcon, CfgID.ResType.Player_Icon, playerdata.head);
                } else
                {
                    this.imgChampionIcon.skin = "";
                }
            }
        }

        /** 根据赢的列表， 将前面的回合对应列表排序 */
        protected sortFinalList(resultList: Pb_God.PBChampionFightUnit[], sortList: Pb_God.PBChampionFightUnit[]): Pb_God.PBChampionFightUnit[]
        {
            if (!resultList || resultList.length == 0) return sortList;
            let maps = Global.listToStringMapData(sortList, "winplayerid");
            let ret = [];
            for (var result of resultList)
            {
                if (!result) continue;
                ret.push(maps.get(result.leftplayerid));
                ret.push(maps.get(result.rightplayerid));
            }
            return ret;
        }


        /** 设置单个对战信息显示 */
        private refreshFightInfo(idMapPlayerDisplay: ds.StringMap<Pb_God.PBPlayerDisplay>, boxIndex: number, fightData: Pb_God.PBChampionFightUnit, roundId: number): void
        {
            let listPlayerBox = this._curPageIs64 ? this.playerList8 : this.playerList4;
            let listShowBtnBox = this._curPageIs64 ? this.btnList8 : this.championBtnList8;

            var leftBox = listPlayerBox._children[boxIndex * 2] as Laya.Box;
            var rightBox = listPlayerBox._children[boxIndex * 2 + 1] as Laya.Box;
            var showBtn = listShowBtnBox._children[boxIndex] as component.UIButton;


            if (fightData)
            {
                let leftName = idMapPlayerDisplay.get(fightData.leftplayerid).playername;
                let rightName = idMapPlayerDisplay.get(fightData.rightplayerid).playername;
                //当前这个对战已经结束
                logI(`WeekChampionDataMgr.round=${WeekChampionDataMgr.round}  roundId==${roundId}`)
                let isOver = WeekChampionDataMgr.state == Pb_God._emChampionState._emChampionState_End || WeekChampionDataMgr.round > roundId || WeekChampionDataMgr.round == 0;
                let leftIsWin = isOver && fightData.winplayerid != 0 && fightData.winplayerid == fightData.leftplayerid;
                let rightIsWin = isOver && fightData.winplayerid != 0 && fightData.winplayerid == fightData.rightplayerid;
                this.__refreshPlayerCellView(leftBox, leftName, leftIsWin);
                this.__refreshPlayerCellView(rightBox, rightName, rightIsWin);

                this.__refreshShowBtnState(showBtn, true, fightData.leftplayerid, fightData.rightplayerid, roundId);
            } else
            {
                this.__refreshPlayerCellView(leftBox, "", false);
                this.__refreshPlayerCellView(rightBox, "", false);
                this.__refreshShowBtnState(showBtn, false);
            }
        }

        /** 设置单个格子的玩家数据
         */
        private __refreshPlayerCellView(node: Laya.Box, nickname: string, isWin: boolean): void
        {
            let txtNickname = node.getChildByName("txtNickname") as component.UILabel;
            let light = node.getChildByName("lightLines") as Laya.Box;
            txtNickname.text = nickname;
            light.visible = isWin;
        }

        /** 单个队阵查看按钮状态*/
        private __refreshShowBtnState(btn: component.UIButton, isShow: boolean, leftPlayerId: number = 0, rightPlayerId: number = 0, round: number = 0): void
        {
            btn.visible = isShow;
            if (!isShow) return;
            // btn._children[0].visible = state == 1; //查看
            // btn._children[1].visible = state == 2; //竞猜
            btn.onClick(this, () =>
            {
                EventMgr.trigger(EventNotify.WeekChampion_ShowFightInfo, leftPlayerId, rightPlayerId, round);
            })
        }

        private getFightListByRound(list: Pb_God.PBChampionFightList, round: Pb_God._emWeekChampionRound)
        {
            let fights = [];
            if(list && list.fightsist.length > 0)
            {
                switch (round) {
                    case Pb_God._emWeekChampionRound._emWeekChampionRound_TOP16:
                    case Pb_God._emWeekChampionRound._emWeekChampionRound_TOP2:
                        {
                            if(list.fightsist.length > 2)
                            {
                                fights = list.fightsist[2].fights; 
                            }
                        }
                        break;
                    case Pb_God._emWeekChampionRound._emWeekChampionRound_TOP32:
                    case Pb_God._emWeekChampionRound._emWeekChampionRound_TOP4:
                        {
                            if(list.fightsist.length > 1)
                            {
                                fights = list.fightsist[1].fights; 
                            }
                        }
                        break;
                    case Pb_God._emWeekChampionRound._emWeekChampionRound_TOP64:
                    case Pb_God._emWeekChampionRound._emWeekChampionRound_TOP8:
                        fights = list.fightsist[0].fights;
                        break;                        
                    default:
                        break;
                }
            }
            return fights;
           
        }
    }
}