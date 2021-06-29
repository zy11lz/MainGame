module Pro
{
    /**
    * 界面说明： 公会日志 
    * @author jason.xu
    */
    export class FactionLogMediator extends BaseMediator implements IMediator, component.UITableViewDataSource, component.UITableViewDelegate
    {
        public UIPanel: ProUI.Faction.FactionLogUI;

        /** 按时间分好组的事件列表 */
        private _list: { time, list: Pb_God.PBFactionEvent[] }[] = [];

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Faction.FactionLogUI, 1,BaseAddLayer.CenterUI,true);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.tableView.setDelegate(this, this);
            this.UIPanel.tableView.setSectionAllIsOn(true);
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            FactionSend.log();
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);

            //	 帮会日志 			PBFactionAllEvents
            this.addEventMgr(Cmd.S2C_Faction_Log.cmdName, this, this.onLog)
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

		/*****
		 *	 帮会日志 			PBFactionAllEvents
		 * @param PBFactionAllEvents
		 * 		events			PBFactionEvent	事件
		 */
        protected onLog(value: Pb_God.PBFactionAllEvents): void
        {
            this.groupingByDay(value.events);
            let t1 = getTimer();
            this.UIPanel.imgEmpty.visible = this._list.length <= 0;
            this.UIPanel.tableView.reloadData();
            let t2 = getTimer() - t1;
            logI(t2);
        }

        private __getRandomTime(): number
        {
            return (TimeController.currTimer - Global.getRandomNum(0, 1000 * 3600 * 30)) / 1000;
        }

        /** 将列表数据按日期分组 */
        private groupingByDay(list: Pb_God.PBFactionEvent[]): void
        {
            list = list.sort((a: Pb_God.PBFactionEvent, b: Pb_God.PBFactionEvent) =>
            {
                return b.time - a.time;
            })
            this._list = [];
            let dayMap = {};
            for (var el of list)
            {
                let time = el.time;
                let day = new Date(time * 1000).getDay();
                let dayData = dayMap[day];
                if (!dayData)
                {
                    dayMap[day] = dayData = { time: time, list: [] };
                    this._list.push(dayData);
                }
                dayData.list.push(el);
            }
        }

        private getContentString(value: Pb_God.PBFactionEvent): string
        {
            switch (value.type)
            {
                case Pb_God._emFactionEventType.FactionEventType_Donate:
                    let donateType = value.params[0];
                    let donateName = cfg.FactionDonateCfgData.getNameByDonateType(donateType);
                    return Global.getLangStr("faction_log" + value.type, donateName);
                default:
                    return Global.getLangStr("faction_log" + value.type, ...value.params);
            }
        }


        //------------------------------------------- 控制视图绘制 ---------------------------------------------
        /** 获取 Cell 高度，未设置则使用默认高度 */
        tabelView_heightForRowAtIndexPath(tableView: component.UITableView, indexPath: component.UIIndexPath): number
        {
            //此处需要提前把文字展示的高度计算出来，以便编排。但由于此时render还未执行，实际的item高度还拿不到， 暂时拿个模板摆放一次，取出实际的高度。
            //观察： 此方法若性能偏差，则需要放弃此组件， 用其它组件替代。
            let htmlTemplate = this.UIPanel.htmlTemplate;
            let groupData = this._list[indexPath.section];
            let itemData = groupData.list[indexPath.row];
            let content = this.getContentString(itemData);
            itemData.name = itemData.name.replace( /[\u00e0-\u01d4]/g,"");
            htmlTemplate.showText = htmlTemplate.innerHTML = `${ itemData.name }&#160;${ content }`; //此处必须使用innerHTML，而不是showText
            return htmlTemplate.contextHeight + 3;
        }
        /** 获取当前段落头部的高度 */
        tabelView_heightForHeaderInSection(tableView: component.UITableView, section: number): number
        {
            return 50;
        }
        /** 获取当前段落底部的高度 */
        tabelView_heightForFooterInSection(tableView: component.UITableView, section: number): number
        {
            return 0;
        }

        //--------------------------------------------控制视图数据---------------------------------------
        /** 获取段落总个数 */
        tabelView_numberOfSectionsInTableView(tableView: component.UITableView): number
        {
            return this._list.length;
        }

        /** 获取当前段落Cell的个数 */
        tabelView_numberOfRowsInSection(tableView: component.UITableView, section: number): number
        {
            let groupData = this._list[section];
            return groupData.list.length;
        }

        /** 刷新一个当前段落CellItem */
        tabelView_cellForRowWithRender(tableView: component.UITableView, indexPath: component.UIIndexPath, itemUI: ProUI.Faction.ChildView.FactionLogTableCellUI): void
        {
            let groupData = this._list[indexPath.section];
            let list = groupData.list;
            let itemData = list[indexPath.row];
            itemUI.txtTime.text = Global.getFormatTimeString(itemData.time * 1000, 7);
            let content = this.getContentString(itemData);
            itemUI.htmlContent.showText = `<font color='#d76601'>${ itemData.name }</font>&#160;${ content }`;
        }

        /** 刷新一个当前段落头部Item */
        tabelView_cellForHeadWithRender(tableView: component.UITableView, section: number, itemUI: ProUI.Faction.ChildView.FactionLogTableHeadUI): void
        {
            let groupData = this._list[section];
            itemUI.txtDay.text = Global.getFormatTimeString(groupData.time * 1000, 10);
        }

        /** 刷新一个当前段落尾部Item */
        tabelView_cellForFootWithRender(tableView: component.UITableView, section: number, itemUI: any): void
        {

        }

    }
}