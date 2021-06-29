module Pro
{
    /**
    * 界面说明： 超凡段位赛-选择展示的赛区界面
    * @author jason.xu
    */
    export class DanSelectShowAreaMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Dan.DanSelectAreaUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Dan.DanSelectAreaUI, 1, BaseAddLayer.CenterUI, true, 1);
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
            DanSend.seasonAllAreaAsk(this.UIOpenData.customObject, 0, 0);
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);

            // 	 赛季所有赛区查询	PBG2CDanSeasonAllAreaAck
            this.addEventMgr(CmdEvent.Dan_SeasonAllAreaAck, this, this.onSeasonAllAreaAck)
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
		 * 	 赛季所有赛区查询	PBG2CDanSeasonAllAreaAck
		 * @param PBG2CDanSeasonAllAreaAck
		 * 		seasonid			uint32	 赛季ID
		 * 		areaid			uint32	 区域ID
		 */
        protected onSeasonAllAreaAck(value: Pb_God.PBG2CDanSeasonAllAreaAck): void
        {
            let list = value.areaid;
            this.UIPanel.listView.onRefresh(list.length, this, (tempUI: ProUI.Dan.ChildItemView.SelectAreaItemViewUI, index: number) =>
            {
                let areaId = list[index];
                tempUI.txtName.text = cfg.DanAreaCfgData.getAreaNameByID(areaId) + "  赛区";
                let iconId = cfg.DanAreaCfgData.getIconIdByID(areaId);
                tempUI.imgIcon.skin = `res/Unpack/Icon/DanArea/${ iconId }.png`;
                tempUI.btnSel.onClick(this, () =>
                {
                    EventMgr.trigger(EventNotify.Dan_ShowHistroyAreaId_Change, areaId);
                    this.closeUI();
                })
            });
        }

    }
}