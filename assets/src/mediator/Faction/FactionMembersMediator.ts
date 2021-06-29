module Pro
{

    /**
    *
    * 公会成员列表界面
    *
    * @author jason.xu
    *
    */
    export class FactionMembersMediator extends BaseMediator implements IMediator
    {

        /** 当前正显示的公会成员列表 */
        private _memberList: Pb_God.PBFactionMember[] = [];

        public UIPanel: ProUI.Faction.FactionMembersUI;


        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("faction")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Faction.FactionMembersUI, 1, BaseAddLayer.TopUI, true);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.listView.onRefresh(0, this, null);
        }
        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            FactionSend.memberList();

            this.onJobtypeChange();

            this.refreshUI();
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.closePanel();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnHelp.onClick(this, this.onClickHelp);
            this.UIPanel.btnExit.onClick(this, this.onClickExit);
            this.UIPanel.btnWatchApply.onClick(this, this.onClickWatchApply);

            this.addEventMgr(EventNotify.Faction_Change, this, this.onFactionChange);
            this.addEventMgr(EventNotify.Faction_JobTypeChange, this, this.onJobtypeChange);
            this.addEventMgr(CmdEvent.Faction_MemberList, this, this.onMemberList);
            this.addEventMgr(CmdEvent.Faction_Remove, this, this.onRemove);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 点击查看申请 */
        private onClickWatchApply(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FactionApplyList), BaseBackUIType.HideBackUI);
        }

        /** 点击帮助说明 */
        private onClickHelp(btn: component.UIButton): void
        {
            let content = Global.getLangStr("faction_help_member");
            CommonHelpView.show(btn, content);
        }

        /** 点击退出帮会 */
        private onClickExit(): void
        {
            let factionName = FactionDataMgr.getFactionName();
            //二级弹窗确认
            let alertDes = FactionDataMgr.isChairman() ? Global.getLangStr("faction_msg6", factionName) : Global.getLangStr("faction_msg7", factionName);
            let isFirst = FactionDataMgr.nextjointime == 0;
            alertDes += isFirst ? Global.getLangStr("faction_msg33") : Global.getLangStr("faction_msg34");
            alertDes += Global.getLangStr("faction_msg39");
            AlertShow.showConfirmAlert(alertDes, this, FactionSend.quit, "common_confirm", "common_cancel", 3);
        }

        /** 公会信息有变化 */
        private onFactionChange(): void
        {
            //帮会退出了
            if (!FactionDataMgr.isHaveFaction())
            { this.closeUI(); }
        }

        /** 职务变化 */
        private onJobtypeChange(): void
        {
            this.refreshMemberList();

            //会长显示解散公会， 其它成员显示退出公会
            if (FactionDataMgr.isChairman())
            {
                this.UIPanel.txtExitLabel.text = Global.getLangStr("faction_msg8");//解散公会";
                this.UIPanel.txtLeaderTip.visible = true;
                this.UIPanel.btnExit.y = this.UIPanel.btnWatchApply.y = 995;
            }
            else
            {
                this.UIPanel.txtExitLabel.text = Global.getLangStr("faction_msg9");//退出公会";
                this.UIPanel.txtLeaderTip.visible = false;
                this.UIPanel.btnExit.y = this.UIPanel.btnWatchApply.y = 983; //提示文字不显示时，按钮往上移一点，否则显示上会空一块，不好看。
            }

            this.UIPanel.btnWatchApply.visible = FactionDataMgr.isLeader();
        }

        /*****
         *	 帮会删除				PBU32
         * @param PBU32
         * 		value			uint32
         */
        protected onRemove(value: Pb_God.PBU32): void
        {
            FactionSend.memberList();
        }

        private onMemberList(value: Pb_God.PBG2CFactionMemberList): void
        {
            let list = value.members;
            //把自己放到第一个, 顺便数一数副会长人数
            let selfId = PlayerDataMgr.uid;
            let deputyNum = 0;  //副会长人数
            this._memberList = [];
            for (var element of list)
            {
                if (element.displayer.playerid == selfId)
                { this._memberList.unshift(element); }
                else
                { this._memberList.push(element); }
                if (element.job == Pb_God._emFactionJob.FactionJob_Deputy) { deputyNum++; }
            }
            // let factionDisplay = FactionDataMgr.factionDisplay;
            let strPeople = Global.getLangStr("faction_msg10") + list.length + "/" + FactionDataMgr.getPeoplemax();//
            if (FactionDataMgr.isChairman())
            {
                let deputyMax = cfg.FactionUpgradeCfgData.getDeputyCountByLevel(FactionDataMgr.getFactionLevel());
                this.UIPanel.txtCount.text = strPeople + Global.getLangStr("faction_msg11") + deputyNum + "/" + deputyMax;
            } else
            {
                this.UIPanel.txtCount.text = strPeople;
            }
            this.refreshMemberList();
        }

        private refreshMemberList(): void
        {
            let list = this._memberList;
            this.UIPanel.listView.onRefresh(list.length, this, this.onRefreshListItem);
        }


        public refreshUI(): void
        {
            //红点显示
            this.UIPanel.reddotApply.visible = FactionDataMgr.reddotModel.getChildRedDotState("apply");
        }

        private onRefreshListItem(tempUI: ProUI.Faction.ChildView.FactionMemberListItemViewUI, index: number): void
        {
            tempUI.back1.visible = index > 0;
            tempUI.back2.visible = index == 0;

            let data = this._memberList[index];
            tempUI.txtNickname.text = data.displayer.playername;
            tempUI.viewPlayerIcon.setPlayerDisplayInfo(data.displayer, true, true);
            tempUI.txtJob.text = Global.getLangStr("faction_job" + data.job);
            tempUI.txtJob.color = data.job == Pb_God._emFactionJob.FactionJob_People ? "#784720" : "#d618ff";

            tempUI.txtDonate.text = data.totalcontri + "";
            tempUI.txtTodayDonate.text = data.daycontri + "";
            tempUI.txtQuestLv.text = data.livenesslevel + "";

            Global.getOfflineTimeString(data.lastlogouttime, tempUI.txtOnlineTime);

            tempUI.btnOperate.visible = FactionDataMgr.isLeader() && FactionDataMgr.getJobType() < data.job;


            let impeach: cfg.FactionImpeachTimeCfgInfo;
            if (data.job == Pb_God._emFactionJob.FactionJob_Leader)
            {
                let FactionImpeachTimeCfg = cfg.FactionImpeachTimeCfgData.getAllList();
                let offlineDay = Global.getTargetDaysTime1(data.lastlogouttime * 1000);

                for (var index = 0; index < FactionImpeachTimeCfg.length; index++)
                {
                    if (offlineDay >= FactionImpeachTimeCfg[index].impeachTime)
                    {
                        impeach = FactionImpeachTimeCfg[index]
                    }
                }
                if (impeach && impeach.type == Pb_God._emFactionJob.FactionJob_People)//如果会长离线天数大于7
                {
                    tempUI.btnOperate.visible = true;
                } else if (impeach && impeach.type == Pb_God._emFactionJob.FactionJob_Deputy && FactionDataMgr.isVicePresident())//如果会长离线天数大于3且当前帐号是副会长
                {
                    tempUI.btnOperate.visible = true;
                }

            }
            tempUI.btnOperate.onClick(this, () =>
            {
                var panel = new Pro.FactionOpMemberPanel();
                panel.setData(data, impeach);
                panel.show();
            })
        }
    }
}