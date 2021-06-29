module Pro
{

    /**
    * 
    * 冠军赛界面分离视图逻辑：32强视图
    * 包括了两个子分页： 4个滑页的32强对阵，与最后4强对阵
    * @author jason.xu
    * 
    */
    export class ChampFinal32View extends ProUI.Champion.ChildView.Final32ViewUI
    {
        /** 当前显示的分页是否为32强 */
        private _curPageIs32 = false;
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
        public show(): void
        {
            this.visible = true;
            this._curPageIs32 = false;
            this.addDataEvent();
            this.shiftPage(this._curPageIs32, true);
        }

        public show32(): void
        {
            this.visible = true;
            this._curPageIs32 = true
            this.addDataEvent();
            this.shiftPage(this._curPageIs32, true);
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
            EventMgr.on(CmdEvent.Champion_Query32ListAck, this, this.onQuery32ListAck)
            //查询4强返回		PBChampionFight4
            EventMgr.on(CmdEvent.Champion_Query4ListAck, this, this.onQuery4ListAck)
        }

        private removeDataEvent(): void
        {
            //查询32强返回		PBG2CChampionQuery32ListAck
            EventMgr.off(CmdEvent.Champion_Query32ListAck, this, this.onQuery32ListAck)
            //查询4强返回		PBChampionFight4
            EventMgr.off(CmdEvent.Champion_Query4ListAck, this, this.onQuery4ListAck)

        }
        /**  点击我的竞猜按钮 */
        private onClickMyGuess(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ChampionMyGuess));
        }

        /**
         * 切换分页
         * @param is32Page 是否切到32强分页
         * @param forceRefresh 强制刷新一次
         */
        private shiftPage(is32Page: boolean, forceRefresh: boolean)
        {
            if (is32Page == this._curPageIs32 && !forceRefresh) return;
            this._curPageIs32 = is32Page;
            this.frameImgBtnTab1.frame = is32Page ? 2 : 1;
            this.frameImgBtnTab2.frame = is32Page ? 1 : 2;
            this.txtTabLabel1.color = is32Page ? "#fffced" : "#433d43";
            this.txtTabLabel2.color = !is32Page ? "#fffced" : "#433d43";

            this.view32.visible = false;
            this.view4.visible = false;

            if (is32Page)
            {
                this.setFinal32Page(this._32GroupId);
            } else
            {  //4强分页
                ChampionSend.query4List();
            }
        }

        /** 点击32强的四个分组翻页 */
        private onClickArrowPage(statue: number): void
        {
            let changeId = this._32GroupId;
            if (statue == 0)
            {
                changeId--;
                if (changeId <= 0) changeId = 4;
            }
            else if (statue == 1)
            {
                changeId++;
                if (changeId > 4) changeId = 1;
            }
            this.setFinal32Page(changeId);
        }

        /** 切换32强内的分组（ABCD） */
        private setFinal32Page(index: number): void
        {
            this._32GroupId = index;
            this.txtGroup.text = Global.getLangStr("champ_group", String.fromCharCode(64 + this._32GroupId));   //ABCD组
            ChampionSend.query32List(index);
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
            if (!this._curPageIs32) return;
            if (this._32GroupId != value.areaid) return;

            this.view32.visible = true;

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
            if (this._curPageIs32) return;

            this.view4.visible = true;

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

            let over = ChampionDataMgr.state == Pb_God._emChampionState._emChampionState_End || ChampionDataMgr.round == 0;
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
            let listPlayerBox = this._curPageIs32 ? this.playerList8 : this.playerList4;
            let listShowBtnBox = this._curPageIs32 ? this.btnList8 : this.btnList4;

            var leftBox = listPlayerBox._children[boxIndex * 2] as Laya.Box;
            var rightBox = listPlayerBox._children[boxIndex * 2 + 1] as Laya.Box;
            var showBtn = listShowBtnBox._children[boxIndex] as component.UIButton;


            if (fightData)
            {
                let leftName = idMapPlayerDisplay.get(fightData.leftplayerid).playername;
                let rightName = idMapPlayerDisplay.get(fightData.rightplayerid).playername;
                //当前这个对战已经结束
                let isOver = ChampionDataMgr.state == Pb_God._emChampionState._emChampionState_End || ChampionDataMgr.round > roundId || ChampionDataMgr.round == 0;
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
                EventMgr.trigger(EventNotify.Champion_ShowFightInfo, leftPlayerId, rightPlayerId, round);
            })
        }
    }
}