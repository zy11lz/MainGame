module Pro
{
    /**
     * 界面说明： 跨服天梯-战前查看对方信息界面 
    * @author jason.xu
    */
    export class LadderPreAttackMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Ladder.LadderPreAttackUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Ladder.LadderPreAttackUI, 1,BaseAddLayer.CenterUI,true);
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
            //再拉取一次最新的数据
            let data: Pb_God.PBLadderObject = this.UIOpenData.customObject;
            LadderSend.queryPlayerInfo(data.id, data.param == 1);
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnAttack.onClick(this, this.onClickAttack);
            this.UIPanel.btnEmbattle.onClick(this, this.onClickEmbattle);

            //查询玩家数据返回  PBLadderPlayerInfo
            this.addEventMgr(Cmd.S2C_Ladder_QueryPlayerInfo.cmdName, this, this.onQueryPlayerInfo)
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

		/*****
		 *查询玩家数据返回  PBLadderPlayerInfo
		 * @param PBLadderPlayerInfo
		 * 		playerdisplay			PBPlayerDisplay	 player display
		 * 		defense			PBBattlePet	 防守阵容
		 * 		rank			uint32	 排名
		 * 		fightpower			uint32	 战斗力
		 * 		factionname			string	 公会名
		 * 		like			uint32	 点赞数
		 */
        protected onQueryPlayerInfo(value: Pb_God.PBLadderPlayerInfo): void
        {
            //与旧数据做个比较，如果数据有变化，则把主界面的列表也重新拉取一下            
            let oldData = this.UIOpenData.customObject as Pb_God.PBLadderObject;
            let isRobot = !!oldData.param;
            let oldFightPower = isRobot ? oldData.fightpower : oldData.defense.fightpower;
            let fightpower = isRobot ? value.fightpower : value.defense.fightpower;
            if (oldData.rank != value.rank || oldFightPower != fightpower)
            {
                LadderSend.open(0, 0, []); //向服务器请求主要信息
                oldData.rank = value.rank; //进入战斗要用
            }

            let playerDisplayer = value.playerdisplay;
            this.UIPanel.txtFightValue.text = fightpower + "";
            this.UIPanel.viewPlayerIcon.setPlayerDisplayInfo(playerDisplayer, true, false);

            this.UIPanel.txtVip.text = playerDisplayer.viplevel + "";
            this.UIPanel.txtNickname.text = playerDisplayer.playername;
            this.UIPanel.imgFrameSex.frame = playerDisplayer.gender + 1;
            //排名
            let rank = value.rank;
            //排名： n名      排名： 未上榜
            this.UIPanel.txtRank.text = Global.getLangStr("common_rank1") + (rank <= 0 ? Global.getLangStr("common_norank") : Global.getLangStr("common_rank2", rank));
            //公会
            this.UIPanel.txtFaction.text = Global.getLangStr("faction_msg32") + (value.factionname ? value.factionname : Global.getLangStr("common_none2"));

            this.UIPanel.listPetView.onRefresh(value.defense.battlepet.length, this, (norItem: NorItemUI, index: number) =>
            {
                norItem.setPetInfoExtend(value.defense.battlepet[index].pet.display, !isRobot, playerDisplayer);
            });
        }

        /** 挑战 */
        private onClickAttack(): void
        {
            //判断时间是否超时
            if (!LadderDataMgr.isUnderAway())
            {
                TipsUtils.showTipsByLanId("common_timeOver");
                return;
            }
            let data: Pb_God.PBLadderObject = this.UIOpenData.customObject;
            // //战前布阵->发起挑战
            // UIManager.Inst.forceOpen(new EmbattleOpenUIData(0, Pb_God._emBattleType.BattleType_Ladder, data.rank, data.param, false));
            this.closeUI();
            BattleMgr.Inst.createNormalBat(Pb_God._emBattleType.BattleType_Ladder, data.rank, data.param);
        }

        /** 防守阵容 */
        private onClickEmbattle(): void
        {
            this.closeUI();
            UIManager.Inst.forceOpen(new EmbattleOpenUIData(Pb_God._emZhenfaType.ZhenfaType_Tianti), BaseBackUIType.HideBackUI);
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

    }
}