module Pro
{
    /**
    * 界面说明： 超凡段位赛-奖励预览界面
    * @author jason.xu
    */
    export class DanRewardPreviewMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Dan.DanRewardPreviewUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null;
            // return [UrlMgr.getAtlas("temp")]
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Dan.DanRewardPreviewUI, 1, BaseAddLayer.CenterUI, true, 1);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.tabGrp.onClick(this, this.onClickTabGroup,
                [new component.UITabData("dan_msg16"), new component.UITabData("dan_msg17")],
                [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]
            );
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.UIPanel.tabGrp.setSelectTab(0);
            this.refreshUI();
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        private _isFirstPage: boolean = false;
        /** 点击主分页 */
        private onClickTabGroup(tab: component.UITab, tabIndex: number, oldTabIndex: number): void
        {
            this._isFirstPage = tabIndex == 0;
            if (this._isFirstPage)
            { //显示首达奖励分页
                this.UIPanel.txtDes.text = Global.getLangStr("dan_msg18"); //每个赛季首次提升对应段位可手动领取";
            }
            else
            { //显示段位奖励分页
                this.UIPanel.txtDes.text = Global.getLangStr("dan_msg19"); //分别在上、下赛季结束后发放";
            }
            let count = cfg.DanUpgradeCfgData.getAllCount();
            if (this._isFirstPage) count--; //首达奖励，要排除第1个。
            this.UIPanel.listView.onRefresh(count, this, this.onRefreshListItem);
        }

        private onRefreshListItem(tempUI: ProUI.Dan.ChildItemView.RewardPreviewItemUI, index: number): void
        {
            let danId = cfg.DanUpgradeCfgData.getAllCount() - index; //从最后一个排到前
            let addItems = this._isFirstPage ? cfg.DanUpgradeCfgData.getFirstPrizeAryById(danId) : cfg.DanUpgradeCfgData.getDanPrizeAryById(danId);
            tempUI.norItemListView.onRefresh(addItems.length, this, (itemUI: NorItemUI, additemsIndex: number) =>
            {
                itemUI.setItemInfo(addItems[additemsIndex]);
            });
            Global.setDanNormalIcon(tempUI.imgIcon, danId);
            tempUI.txtName.text = cfg.DanUpgradeCfgData.getDanNameByDanID(danId);
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            this.UIPanel.txtCurDan.text = Global.getLangStr("dan_msg1") + cfg.DanUpgradeCfgData.getDanNameByDanID(DanDataMgr.curDanId); //当前你的段位为:" 
        }

    }
}