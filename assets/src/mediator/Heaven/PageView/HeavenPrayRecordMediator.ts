module Pro
{
    /**
     * 天界祈祷记录
     */
    export class HeavenPrayRecordMediator extends BaseMediator implements IMediator
    {
        /** UI面板 */
        public UIPanel: ProUI.Heavens.PageView.PrayRecordViewUI;

        /** 当前神像配置数据 */
        private cur_pray_statueCfg: cfg.HeavenPrayStatueCfgInfo;

        /** 需要自动加载的资源列表*/
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        /** UI打开前状态 */
        public openUI(): void
        {
            this.showPanel(ProUI.Heavens.PageView.PrayRecordViewUI, 1, BaseAddLayer.TopUI,true);
        }

        /** 关闭UI*/
        public closeUI(): void
        {
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.btn_close.onClick(this, this.closeUI);
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(Cmd.S2C_Common_WorldItemLog.cmdName, this, this.onGetServerListTipDatas);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 初始化面板(UI每次打开) */
        public initUI(): void
        {
            this.cur_pray_statueCfg = this.UIOpenData.customObject;
            CommonSend.worldItemLog(Pb_God._emWorldItemLogType.WorldItemLog_Pray1 + this.cur_pray_statueCfg.index - 1);
            this.initSelfLogDatas();
        }

        /** 刷新面板(UI每次重新从队列中弹出)*/
        public refreshUI(): void
        {

        }

        /**
         * 刷新自己获得的奖励记录
         */
        private initSelfLogDatas(): void
        {
            let statue_data = HeavenDungeonDataMgr.getStatueData(this.cur_pray_statueCfg.index);
            let reward_datas = statue_data ? statue_data.rewards : [];
            this.UIPanel.listSelf.onRefresh(reward_datas.length, this, (tmpItem: component.UIHtmlText, index: number) =>
            {
                let item_name = cfg.ItemCfgData.getNameById(reward_datas[index].key);
                let item_count = reward_datas[index].value;
                tmpItem.showText = Global.getLangStr("Heaven_msg5", item_name + "*" + item_count);
            });
        }

        /**
         * 获取全服神像抽奖记录
         * @param value 
         */
        private onGetServerListTipDatas(value: Pb_God.PBWorldItemLogs): void
        {
            let list = value.items;
            this.UIPanel.listServer.onRefresh(list.length, this, (tmpItem: component.UIHtmlText, index: number) =>
            {
                let data = list[index];
                let itemName = cfg.ItemCfgData.getNameById(data.item[0].key);
                let item_count = data.item[0].value;
                tmpItem.showText = Global.getLangStr("Heaven_msg9", data.playername, itemName + "*" + item_count);
            });
        }
    }
}