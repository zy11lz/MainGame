module Pro
{
    /**
    * 界面说明：公会战主界面
    * @author jason.xu
    */
    export class FactionWarMediator extends BaseMediator implements IMediator
    {
        /** 屏幕顶部UI影响， 第一页预留几个据点不显示 */
        private _topBlankCount = 3;
        /** 每个循环背景可放置的据点数量 */
        private _fortCountField = 10;
        private _enemyFortList: Pb_God.PBFactionWarMemberDisplay[] = null;
        /** 当前正显示的据点数据列表（包括了已方和敌方） */
        private _fortList: Pb_God.PBFactionWarMemberDisplay[];
        /** 当前是否显示敌方阵地 */
        private _curIsEnemy: boolean = true;

        public UIPanel: ProUI.FactionWar.FactionWarUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("factionwar")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.FactionWar.FactionWarUI, 3, BaseAddLayer.CenterUI, false, 1, 0, GameConfig.curHeight());
        }

        public closeUI(): void
        {
            super.closeUI();
            Laya.timer.clear(this, this.onTimer);
        }

        /** 当前界面是否有全屏显示（全屏背景） */
        public isFullSreenShow(): boolean
        {
            if (this.isClosing) return false;
            if (!this.getUI()) return false;
            return true;
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
            this._enemyFortList = null;
            FactionDataMgr.parseCurFactionWarState();
            this.UIPanel.txtBattleFieldLabel.text = Global.getLangStr("factionwar_msg4");//敌方阵地";
            //刚初始化界面，在等待服务器数据时，先隐藏掉大部分内容
            this.__setOpenState(false);
            if (FactionDataMgr.warState != E_FactionWarState.None) FactionSend.openWar();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnHelp.onClick(this, this.onClickHelp);
            this.UIPanel.btnAttackList.onClick(this, this.onClickAttackList);
            this.UIPanel.btnNoOpenAttackList.onClick(this, this.onClickAttackList);
            this.UIPanel.btnEnemyList.onClick(this, this.onClickEnemyList);
            this.UIPanel.btnReport.onClick(this, this.onClickReport);
            this.UIPanel.btnResultBox.onClick(this, this.onClickResultBox);
            this.UIPanel.btnReward.onClick(this, this.onClickReward);
            this.UIPanel.btnWatchRank.onClick(this, this.onClickWatchRank);
            this.UIPanel.btnBattleField.onClick(this, this.onClickField);

            this.addEventMgr(CmdEvent.FactionWar_QueryMemberListAck, this, this.onQueryMemberListAck);
            this.addEventMgr(CmdEvent.FactionWar_OpenAck, this, this.onOpenAck);
            this.addEventMgr(Cmd.S2C_TopList_List_Ack, this, this.onList_Ack);

            // this.addEventMgr(EventNotify.Battle_Result_Close, this, this.onBattleResultClose);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 点击切换阵地 */
        private onClickField(): void
        {
            this.UIPanel.btnBattleField.mouseEnabled = false;
            if (this._curIsEnemy)
            {  //当前正查看敌方的时候，就查询自己的，因为返回数据的时候，会重置_curIsEnemy的值
                FactionSend.queryMemberList(FactionDataMgr.warSelfInfo.factionid, 0, 0, 0);
            } else
            {
                FactionSend.queryMemberList(FactionDataMgr.warEnemyInfo.factionid, 0, 0, 0);
            }
        }

        /** 点击对战列表(所有公会列表) */
        private onClickAttackList(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FactionWarFactionList));
        }

        /** 点击进攻一览（敌方据点列表） */
        private onClickEnemyList(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FactionWarEnemyList));
        }

        /** 点击进攻日志（战报） */
        private onClickReport(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FactionWarRecord));
        }

        /** 点击战果宝箱 */
        private onClickResultBox(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FactionWarResultBox));
        }

        /** 点击战绩奖励 */
        private onClickReward(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FactionWarReward));
        }

        /** 点击查看战绩排行 */
        private onClickWatchRank(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RankDetail, Pb_God._emTopListType.TopListType_BWFctionWar));
        }

        /** 点击规则说明 */
        private onClickHelp(): void
        {
            let strHelp = Global.getLangStr("factionwar_help");
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Help, strHelp));
        }

        // /** 从战斗结算中退出来 */
        // private onBattleResultClose(battleType: number): void {
        //     //检查是否还有未选择的BUFF
        //     if (battleType == Pb_God._emBattleType.BattleType_FactionWar) {
        //         FactionDataMgr.parseCurFactionWarState();
        //         if (FactionDataMgr.warState != E_FactionWarState.None) FactionSend.openWar();
        //     }
        // }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            //如果战斗在开启中，则每次回到此界面显示时，都重新拉一次数据
            if (this.UIPanel.spBothInfo.visible)
            {
                FactionDataMgr.parseCurFactionWarState();
                //重新拉取数据
                this.UIPanel.btnBattleField.mouseEnabled = false;
                if (!this._curIsEnemy)
                {
                    FactionSend.queryMemberList(FactionDataMgr.warSelfInfo.factionid, 0, 0, 0);
                } else
                {
                    FactionSend.queryMemberList(FactionDataMgr.warEnemyInfo.factionid, 0, 0, 0);
                }
            }
        }

        /** 设置开启状态 */
        private __setOpenState(isOpenWar: boolean): void
        {
            this.UIPanel.btnResultBox.y = isOpenWar ? 10000 : -1; //VBOX有个坑， 即使visible为false了，还是会继续排列占位，此处强行将宝箱按钮提到第一位或者最后一位
            this.UIPanel.spNoOpen.visible = !isOpenWar; //开启时间提示
            this.UIPanel.spBothInfo.visible = isOpenWar;  //双方信息
            this.UIPanel.rankView.visible = isOpenWar; //战绩排行信息www
            this.UIPanel.spCountDown.visible = isOpenWar;  //结束倒计时
            this.UIPanel.bottomBox.visible = isOpenWar;  //底部视图
            //右边的按钮组，在未开启时，只留战果保箱一个按钮
            this.UIPanel.btnAttackList.visible = isOpenWar;
            this.UIPanel.btnEnemyList.visible = isOpenWar;
            this.UIPanel.btnReport.visible = isOpenWar;
            this.UIPanel.btnReward.visible = isOpenWar;
            this.UIPanel.listRightBtns.refresh();
            if (!isOpenWar)
            {
                this.resetFortList(null);  //未开启时，显示一个空的背景即可。
                this.UIPanel.txtNoOpenTips.text = Global.getLangStr("factionwar_noOpenDes1"); //公会战暂未开始，请在每周一、周三、周五 12:00-20:00准时参加哦！";
                this.UIPanel.btnNoOpenAttackList.visible = false;
            }
        }

		/*****
		 *	开启返回				PBG2CFactionWarSynOpen	
		 * @param PBG2CFactionWarSynOpen
		 * 		isjoin			bool	是否参加
		 */
        protected onOpenAck(value: Pb_God.PBG2CFactionWarSynOpen): void
        {
            if (FactionDataMgr.warIsFinalist)
            {
                //是否正在备战中, 备战中时，可以预览到对战公会列表
                this.UIPanel.btnNoOpenAttackList.visible = FactionDataMgr.warState == E_FactionWarState.Ready;
            }
            else
            {
                this.UIPanel.txtNoOpenTips.text = Global.getLangStr("factionwar_noOpenDes2");  //很遗憾，您的公会在此次公会战中匹配轮空或活跃人数未达标，请期待下次！";
                //自己没入围时，可以直接查看入围列表
                this.UIPanel.btnNoOpenAttackList.visible = true;
            }
        }

		/*****
		 *	返回查询成员列表		PBG2CFactionWarMemberListAck
		 * @param PBG2CFactionWarMemberListAck
		 * 		tarfactionid			uint32	目标帮派ID
		 * 		member			PBFactionWarMemberDisplay	成员信息
		 * 		friendstar			uint32	友方总星星
		 * 		enemystar			uint32	敌方总星星
		 * 		ruinslevel			uint32	废墟等级
		 */
        protected onQueryMemberListAck(value: Pb_God.PBG2CFactionWarMemberListAck): void
        {
            //查询阵容返回            
            this.refreshBothSideView();
            this.UIPanel.btnBattleField.mouseEnabled = true;
            this._curIsEnemy = value.tarfactionid != FactionDataMgr.getFactionId();
            this.UIPanel.txtBattleFieldLabel.text = this._curIsEnemy ? Global.getLangStr("factionwar_msg4") : Global.getLangStr("factionwar_msg5");
            this.__setOpenState(true);
            //buff等级
            this.refreshBuffLevel();
            //请求战绩排行
            TopListSend.list(Pb_God._emTopListType.TopListType_BWFctionWar, 1, 3, 0, 0, 0, 0);

            this.resetFortList(value.member);
        }

        /** 刷新BUFF等级显示 */
        private refreshBuffLevel(): void
        {
            let buffLv = FactionDataMgr.warBuffLv;
            let buffTotalLv = cfg.FactionWarConstCfgData.getFirstInfo().runieSkillMaxLevel;
            this.UIPanel.txtBuffLevel.text = buffLv + "/" + buffTotalLv;
        }

        /** 刷新对战双方信息显示 */
        private refreshBothSideView(): void
        {
            Laya.timer.clear(this, this.onTimer);

            let leftStarCount = FactionDataMgr.warSelfInfo.totalstar;
            let rightStarCount = FactionDataMgr.warEnemyInfo.totalstar;
            this.UIPanel.txtNicknameLeft.text = FactionDataMgr.warSelfInfo.name;
            this.UIPanel.txtNicknameRight.text = FactionDataMgr.warEnemyInfo.name;
            this.UIPanel.txtStarCountLeft.text = leftStarCount + "";
            this.UIPanel.txtStarCountRight.text = rightStarCount + "";
            //是否已结束对战, 正在关闭倒计时
            if (FactionDataMgr.warState == E_FactionWarState.Over)
            {
                this.UIPanel.imgDeuceLeft.visible = leftStarCount == rightStarCount;
                this.UIPanel.imgWinLeft.visible = leftStarCount > rightStarCount;
                this.UIPanel.imgDeuceRight.visible = leftStarCount == rightStarCount;
                this.UIPanel.imgWinRight.visible = leftStarCount < rightStarCount;

                this.UIPanel.txtLeftCount.text = Global.getLangStr("factionwar_msg3"); //后关闭";
            } else
            {
                this.UIPanel.imgDeuceLeft.visible = false;
                this.UIPanel.imgWinLeft.visible = false;
                this.UIPanel.imgDeuceRight.visible = false;
                this.UIPanel.imgWinRight.visible = false;

                let totalCount = cfg.FactionWarConstCfgData.getFirstInfo().dayFightCount;
                let count = totalCount - FactionDataMgr.warUseCount;
                this.UIPanel.txtLeftCount.text = Global.getLangStr("factionwar_msg2", count, totalCount);
            }
            Laya.timer.loop(1000, this, this.onTimer);
            this.onTimer();
        }

        /** 倒计时回调 */
        private onTimer(): void
        {
            let leftTime = (FactionDataMgr.warTargetTime - TimeController.currTimer) / 1000;
            if (leftTime <= 0)
            {
                Laya.timer.clear(this, this.onTimer);
                this.UIPanel.spCountDown.visible = false;
                return;
            }
            this.UIPanel.txtCountDown.text = Global.GetRemindTime(leftTime, 4);
        }

        /** 收到排行榜 */
        private onList_Ack(tempClass: Pb_God.PBS2CTopListList)
        {
            if (!tempClass.ask || Pb_God._emTopListType.TopListType_BWFctionWar != tempClass.ask.type) return;

            this.UIPanel.txtRankNickname1.text = tempClass.list[0] ? tempClass.list[0].playerdisplay.playername : Global.getLangStr("common_empty1");
            this.UIPanel.txtRankNickname2.text = tempClass.list[1] ? tempClass.list[1].playerdisplay.playername : Global.getLangStr("common_empty1");
            this.UIPanel.txtRankNickname3.text = tempClass.list[2] ? tempClass.list[2].playerdisplay.playername : Global.getLangStr("common_empty1");
        }

        /** 显示背景列表 */
        private resetFortList(list: Pb_God.PBFactionWarMemberDisplay[]): void
        {
            this._fortList = list || [];
            let bgCount = Math.ceil((this._fortList.length + this._topBlankCount) / this._fortCountField); //每一个循环背景显示n个据点
            if (bgCount < 2) bgCount = 2;  //至少显示两个，要不然不够满屏。
            this.UIPanel.listBg.onRefresh(bgCount, this, this.onRefreshLoopBg);
        }

        /** 单个循环背景（每个背景包括了n个据点位置） */
        private onRefreshLoopBg(tempUI: ProUI.FactionWar.ChildView.MainLoopBgUI, index: number): void
        {
            let fortNum = this._fortCountField;
            for (var i = 0; i < fortNum; i++)
            {
                let dataIndex = index * fortNum + i - this._topBlankCount;
                let fortData = this._fortList[index * fortNum + i - this._topBlankCount];
                let fortNode = tempUI.getChildAt(i) as ProUI.FactionWar.ChildView.MainMemberFortViewUI;
                if (!fortData)
                {
                    fortNode.visible = false;
                    continue;
                }
                fortNode.visible = true;
                this.refreshFortNode(fortNode, fortData)
            }
        }

        /** 刷新单个据点信息 */
        private refreshFortNode(fortNode: ProUI.FactionWar.ChildView.MainMemberFortViewUI, fortData: Pb_God.PBFactionWarMemberDisplay)
        {
            fortNode.txtNickname.color = this._curIsEnemy ? "#f2d6bf" : "#81bce5";

            fortNode.txtNickname.text = `[S${ fortData.playerdisplay.worldid }]${ fortData.playerdisplay.playername }`;
            fortNode.txtFightValue.text = Global.getLangStr("common_fightPower") + fortData.fightpower;
            fortNode.txtNumber.text = fortData.rank + "";
            //星星数
            let starCount = fortData.beattackstar;

            let isFortDestroy = starCount >= 3;  //据点已被摧毁
            fortNode.spAddbuff.visible = isFortDestroy;  //满星时才显示BUFF加成提示
            fortNode.vboxTop.refresh();
            fortNode.img.frame = isFortDestroy ? 2 : 1;
            fortNode.img.x = isFortDestroy ? 32 : 54 

            for (let i = 0; i < 3; i++)
            {
                (fortNode.listStar.getChildAt(i) as Laya.Image).gray = starCount <= i;
            }
            fortNode.onClick(this, () =>
            {
                //点击敌方据点
                if (this._curIsEnemy)
                {
                    if (FactionDataMgr.warState != E_FactionWarState.Open)
                    {
                        TipsUtils.showTipsByLanId("factionwar_msg6");
                        return;
                    }
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FactionWarEnemyInfo, fortData));
                } else
                {
                    //点已方的直接打开防守记录界面
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FactionWarFortRecord, fortData.playerdisplay.playerid));
                }
            })

        }
    }
}