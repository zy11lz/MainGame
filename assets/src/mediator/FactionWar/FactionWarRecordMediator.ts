module Pro
{
    /**
    * 界面说明： 公会战-战场日志界面
    * @author jason.xu
    */
    export class FactionWarRecordMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.FactionWar.FactionWarRecordUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("factionwar")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.FactionWar.FactionWarRecordUI, 1);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {//主分页按钮
            this.UIPanel.tabGrp.onClick(this, this.onClickTabGroup,
                [new component.UITabData("factionwar_msg13"), new component.UITabData("factionwar_msg14")],
                [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]
                // [new component.UITabStyle("#dec3a3", 2, "#7d6252"), new component.UITabStyle("#fff4d0", 2, "#8a5738")]
            );
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.refreshUI();
            this.UIPanel.listView.visible = false;
            this.UIPanel.tabGrp.setSelectTab(0);
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnConfirm.onClick(this, this.closeUI);

            this.addEventMgr(CmdEvent.FactionWar_QuerySelfLog, this, this.onQuerySelfLog);
            this.addEventMgr(CmdEvent.FactionWar_QueryWarLog, this, this.onQueryWarLog);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 点击分页 */
        private onClickTabGroup(tab: component.UITab, tabIndex: number, oldTabIndex: number): void
        {
            if (tabIndex == 1)
                FactionSend.querySelfLog();
            else
                FactionSend.queryWarLog();
        }

		/*****
		 *	返回查询战场日志		PBG2CFactionWarLogAck
		 * @param PBG2CFactionWarLogAck
		 * 		log			PBFactionWarLog	战场日志信息
		 */
        protected onQueryWarLog(value: Pb_God.PBG2CFactionWarLogAck): void
        {
            if (this.UIPanel.tabGrp.tabIndex != 0) return;
            this.refreshList(value.log);
        }

		/*****
		 *	返回查询我的日志		PBG2CFactionWarLogAck
		 * @param PBG2CFactionWarLogAck
		 * 		log			PBFactionWarLog	战场日志信息
		 */
        protected onQuerySelfLog(value: Pb_God.PBG2CFactionWarLogAck): void
        {
            if (this.UIPanel.tabGrp.tabIndex != 1) return;
            this.refreshList(value.log);
        }

        private refreshList(list: Pb_God.PBFactionWarLog[]): void
        {
            this.UIPanel.listView.visible = true;
            this.UIPanel.listView.onRefresh(list.length, this,
                (tempUI: ProUI.FactionWar.ChildView.RecordItemViewUI, index: number) =>
                {
                    let data = list[index];
                    //是否已方进攻
                    let isAtk: boolean = data.logtype == Pb_God._emFactionWarLogType.FactionWarLogType_Friend || data.logtype == Pb_God._emFactionWarLogType.FactionWarLogType_FriendRunie;
                    tempUI.imgTitle.frame = isAtk ? 1 : 2;
                    //时间
                    tempUI.txtTime.text = Global.getFullTimeString(data.logtime * 1000);
                    let htmlContent = tempUI.htmlContent;
                    htmlContent.innerHTML = htmlContent.showText = "&#160;&#160;&#160;&#160;" + this.getRecordContent(data);
                    htmlContent.y = 79 - htmlContent.contextHeight * 0.5;
                });
        }

        private getRecordContent(data: Pb_God.PBFactionWarLog): string
        {
            let result: string;
            result = data.result == 0 ? "胜利" : "失败";
            let selfWorldId = PlayerDataMgr.worldid;
            let selfFactionName = FactionDataMgr.getFactionName();
            if (data.logtype == Pb_God._emFactionWarLogType.FactionWarLogType_Friend)
            { //自己方攻击敌方据点
                //公会成员{0}挑战[s{1}][2]据点成功，获得[{3}颗星]和战绩{4}点，已方公会[s{5}]{6}当前星数为{7}
                return Global.getLangStr("factionwar_record01", data.friendname, data.enemyworldid, data.enemyname, data.addstar, data.addfightpoint, selfWorldId, selfFactionName, data.friendtotalstar, result);
            } else if (data.logtype == Pb_God._emFactionWarLogType.FactionWarLogType_FriendRunie)
            { //自己方攻击敌方废墟
                //公会成员{0}挑战[s{1}][2]废墟成功，将公会Buff等级提升至{3}级
                return Global.getLangStr("factionwar_record03", data.friendname, data.enemyworldid, data.enemyname, data.runieskilllevel, result);
            } else if (data.logtype == Pb_God._emFactionWarLogType.FactionWarLogType_Enemy)
            { //敌方攻击我方据点
                //敌方公会成员[s{0}][1]挑战[s{2}][3]据点成功，获得[{4}颗星]和战绩{5}点，敌方公会[s{6}][7]当前星数为{8}
                return Global.getLangStr("factionwar_record02", data.enemyworldid, data.enemyname, selfWorldId, data.friendname, data.addstar, data.addfightpoint, data.enemyworldid, data.enemyfactionname, data.enemytotalstar, result);
            } else if (data.logtype == Pb_God._emFactionWarLogType.FactionWarLogType_EnemyRunie)
            { //敌方攻击我方废墟
                //敌方公会成员[s{0}]{1}挑战[s{2}]{3}废墟成功，将公会Buff等级提升至{3}级
                return Global.getLangStr("factionwar_record04", data.enemyworldid, data.enemyname, selfWorldId, data.friendname, data.runieskilllevel, result);
            }
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

    }
}