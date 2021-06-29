module Pro
{
    /**
    * 界面说明： 公会战-对战列表界面（所有参战的公会列表）
    * @author jason.xu
    */
    export class FactionWarFactionListMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.FactionWar.FactionWarFactonListUI;

        private _curStateString = "";
        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        public openUI(): void
        {
            this.showPanel(ProUI.FactionWar.FactionWarFactonListUI, 1);
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
            //当前状态文字
            if (FactionDataMgr.warState == E_FactionWarState.Open)
                this._curStateString = Global.getLangStr("factionwar_msg11");
            else
                this._curStateString = "";
            this.refreshUI();
            //显示自己的信息
            this.UIPanel.txtNoOpen.visible = false;
            this.UIPanel.selfAttackItem.visible = false;
            this.UIPanel.listView.visible = false;

            //向服务器请求公会列表
            FactionSend.queryAllList();
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnHelp.onClick(this, this.onClickHelp);

            this.addEventMgr(CmdEvent.FactionWar_QueryAllListAck, this, this.onQueryAllListAck);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 点击规则说明 */
        private onClickHelp(): void
        {
            let strHelp = Global.getLangStr("factionwar_help");
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Help, strHelp));
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

		/*****
		 *	返回所有对阵列表		PBG2CFactionWarListAck
		 * @param PBG2CFactionWarListAck
		 * 		self			PBFactionWarList	自己
		 * 		list			PBFactionWarList	对阵信息
		 */
        protected onQueryAllListAck(value: Pb_God.PBG2CFactionWarListAck): void
        {
            if (value.self)
            {
                this.UIPanel.txtNoOpen.visible = false;
                this.UIPanel.selfAttackItem.visible = true;
                this.refreshListItemData(this.UIPanel.selfAttackItem, value.self);
            } else
            {
                this.UIPanel.txtNoOpen.visible = true;
                this.UIPanel.selfAttackItem.visible = false;
            }

            let list = value.list;
            this.UIPanel.listView.visible = true;
            this.UIPanel.listView.onRefresh(list.length, this, (tempUI: ProUI.FactionWar.ChildView.FactionListItemViewUI, index: number) =>
            {
                this.refreshListItemData(tempUI, list[index]);
            })
        }

        /** 收到公会列表 */
        private onListData(value): void
        {
        }

        private refreshListItemData(tempUI: ProUI.FactionWar.ChildView.FactionListItemViewUI, data: Pb_God.PBFactionWarList): void
        {
            //状态
            tempUI.txtStatus.text = this._curStateString;
            //左边
            tempUI.txtFactionNameLeft.text = data.left.name;
            tempUI.txtServerNameLeft.text = Global.getWorldNameByWorldId(data.left.worldid);
            tempUI.txtRankLeft.text = Global.getLangStr("factionwar_msg12") + data.left.rank;  //服务器排名: 
            //右边
            tempUI.txtFactionNameRight.text = data.right.name;
            tempUI.txtServerNameRight.text = Global.getWorldNameByWorldId(data.right.worldid);
            tempUI.txtRankRight.text = Global.getLangStr("factionwar_msg12") + data.right.rank; //服务器排名: 
        }

    }
}