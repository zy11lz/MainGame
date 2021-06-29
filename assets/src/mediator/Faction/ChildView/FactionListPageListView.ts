module Pro
{
    /**
    * 帮会列表界面： 列表分页
    * @author jason.xu
    */
    export class FactionListPageListView extends ProUI.Faction.ChildView.FactionListListViewUI implements ITableView
    {

        /** 当前正显示的公会列表 */
        private _factionList: Pb_God.PBFactionDisplay[];

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.chkBoxOnlyUnder.setText(Global.getLangStr("faction_msg16"), "#5d565d");
            this.chkBoxOnlyUnder.isSelected = false;

            //刷新公会列表
            this.imgListEmpty.visible = true;
            this.listViewFactionList.onRefresh(0, this, null);
        }

        public addEvent(): void
        {
            EventMgr.on(CmdEvent.Faction_SelfApplyList, this, this.onFactionList);

            this.chkBoxOnlyUnder.onSelectChange(this, this.refreshFactionList);
        }

        public removeEvent(): void
        {
            EventMgr.off(CmdEvent.Faction_SelfApplyList, this, this.onFactionList);
        }


        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
            //请求公会列表
            FactionSend.open();
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
        }

        public setData($data: any): void
        {

        }

        /** 收到公会列表 */
        private onFactionList(): void
        {
            this.refreshFactionList();
        }


        /** 刷新公会列表 */
        private refreshFactionList(): void
        {
            let list = FactionDataMgr.getFactionList();
            if (this.chkBoxOnlyUnder.isSelected)
            {
                let listTemp = [];
                for (let element of list)
                {
                    if (element.people < element.peoplemax) listTemp.push(element);
                }
                list = listTemp;
            }
            let len = list.length;
            this._factionList = list;
            this.imgListEmpty.visible = len == 0;
            if (len > 100) len = 100;
            this.listViewFactionList.onRefresh(len, this, this.onRefreshListItem);
        }

        /** 公会列表item rander回调 */
        private onRefreshListItem(tempUI: ProUI.Faction.ChildView.FactionListItemViewUI, index: number): void
        {
            let data = this._factionList[index];

            tempUI.txtFactionName.text = data.base.name;
            tempUI.txtLv.text = "(" + Global.getLangStr("attr_lv1", data.base.level) + ")";
            tempUI.txtLv.x = tempUI.txtFactionName.width + tempUI.txtFactionName.x + 5;
            tempUI.txtNickname.text = data.leaderdisplay ? data.leaderdisplay.playername : "???";
            let curCount = data.people;
            let maxCount = data.peoplemax;
            tempUI.txtCount.text = curCount + "/" + maxCount;
            tempUI.txtCount.color = curCount >= maxCount ? "#d45627" : "#34aa28";

            let needLv = data.needplayerlevel;
            tempUI.txtCondition.text = Global.getLangStr("faction_msg15", needLv);// `需要达到${needLv}级`;
            let isReach = needLv <= PlayerDataMgr.level;  //达成目标
            let isApply = FactionDataMgr.isApplyFaction(data.base.factionid);  //已经申请

            tempUI.txtCondition.color = isReach ? "#5d565d" : "#d45627";
            tempUI.btnEnter.disabled = isApply;
            tempUI.btnEnter.visible = isReach;
            tempUI.btnNoCondition.visible = !isReach;
            tempUI.btnEnter.onClick(this, !isReach ? null : () =>
            {
                var factionid = data.base.factionid;
                this.setApplyFactionTag(index, data);
                FactionSend.apply(factionid, true);
            })
        }

        /** 标记某公会已申请 */
        private setApplyFactionTag(index: number, data: Pb_God.PBFactionDisplay): void
        {
            FactionDataMgr.setApplyFactionTag(data.base.factionid);
            this.listViewFactionList.setItem(index, data);
        }


        /** 页签组件销毁 */
        public dispose(): void
        {

        }

    }
}