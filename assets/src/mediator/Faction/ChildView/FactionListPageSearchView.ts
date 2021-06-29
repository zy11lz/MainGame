module Pro
{
    /**
    * 帮会列表界面： 查找帮会分页
    * @author jason.xu
    */
    export class FactionListPageSearchView extends ProUI.Faction.ChildView.FactionListSearchViewUI implements ITableView
    {

        /** 当前正显示的搜索公会列表 */
        private _factionListSearch: Pb_God.PBFactionDisplay[];

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {

        }

        public addEvent(): void
        {
            this.btnSearch.onClick(this, this.onClickSearch);
            this.btnBackSearch.onClick(this, this.onClickBackSearch);
        }

        public removeEvent(): void
        {
        }


        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
            this.childViewSearch.visible = true;
            this.searchResultView.visible = false;
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
        }

        public setData($data: any): void
        {

        }


        /** 点击搜索按钮 */
        private onClickSearch(): void
        {
            let str = this.inputSearch.text;
            str = str.replace(/\s*/g, ""); //去掉空白字符
            if (!str)
            {
                TipsUtils.showTipsByLanId("tips_msg19");
                return;
            }
            //切换到查找界面
            this.childViewSearch.visible = false;
            this.searchResultView.visible = true;
            this.imgSearchEmpty.visible = true;

            let list = FactionDataMgr.getFactionList();
            let listTemp = [];
            for (let element of list)
            {
                if (element.base.name.indexOf(str) >= 0) listTemp.push(element);
            }
            this._factionListSearch = listTemp;
            let len = listTemp.length;
            this.imgSearchEmpty.visible = len == 0;
            if (len > 100) len = 100;
            this.listViewSearchResult.onRefresh(len, this, this.onRefreshSearchListItem);
        }

        /** 公会列表item rander回调 */
        private onRefreshSearchListItem(tempUI: ProUI.Faction.ChildView.FactionListItemViewUI, index: number): void
        {
            let data = this._factionListSearch[index];

            tempUI.txtFactionName.text = data.base.name;
            tempUI.txtLv.text = "(" + Global.getLangStr("attr_lv1", data.base.level) + ")";
            tempUI.txtLv.x = tempUI.txtFactionName.width + tempUI.txtFactionName.x + 5;
            tempUI.txtNickname.text = data.leaderdisplay.playername;
            let curCount = data.people;
            let maxCount = data.peoplemax;
            tempUI.txtCount.text = curCount + "/" + maxCount;
            tempUI.txtCount.color = curCount >= maxCount ? "#d45627" : "#259016";

            let needLv = data.needplayerlevel;
            tempUI.txtCondition.text = Global.getLangStr("faction_msg15", needLv);// `需要达到${needLv}级`; 
            let isReach = needLv <= PlayerDataMgr.level;  //达成目标
            let isApply = FactionDataMgr.isApplyFaction(data.base.factionid);  //已经申请

            tempUI.txtCondition.color = isReach ? "#572f0e" : " #d45627";
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
            this.listViewSearchResult.setItem(index, data);
        }

        /** 点击返回搜索按钮 */
        private onClickBackSearch(): void
        {
            this.childViewSearch.visible = true;
            this.searchResultView.visible = false;
            this.inputSearch.text = "";
        }


        /** 页签组件销毁 */
        public dispose(): void
        {

        }

    }
}