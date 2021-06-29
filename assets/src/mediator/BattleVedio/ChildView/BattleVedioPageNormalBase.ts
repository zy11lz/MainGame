module Pro
{
    /**
    * 录相馆： 普通分页的基类， 仅用于区分段位赛的分页类型， 子类可动态配置分组筛选方式
    * @author jason.xu
    */
    export class BattleVedioPageNomalBase extends Laya.Box implements ITableView
    {
        //////////////////////////// 静态方法 （保持全局分页中只有一个视图，节省资源）/////////////////////////////
        private static uiView: Laya.UIComponent;
        /** 获取一个view */
        private static getView(): ProUI.BattleVedio.ChildView.NomalListPageViewUI
        {
            let ret = this.uiView;
            if (ret)
            {
                this.uiView = null;
                ret.visible = true;
                return ret as ProUI.BattleVedio.ChildView.NomalListPageViewUI;
            }
            return new ProUI.BattleVedio.ChildView.NomalListPageViewUI;
        }

        private uiView: ProUI.BattleVedio.ChildView.NomalListPageViewUI;

        /** 当前下拉菜单选中的index */
        protected _comboIndex = 0;

        /** 录像数据 */
        protected _dataList: Pb_God.PBVideoDisplay[];

        /** 录像类型 */
        protected _videoType: Pb_God._emVideoType;

        constructor(videoType: number)
        {
            super();
            this._videoType = videoType;
        }

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {

        }

        /** 页签组件销毁 */
        public dispose(): void
        {

        }

        public addEvent(): void
        {
        }

        public removeEvent(): void
        {

        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        public show(): void
        {
            if (!this.uiView)
            {
                this.uiView = BattleVedioPageNomalBase.getView();
                this.addChild(this.uiView);
            }
            this.resetBaseViewByType();
            this.clearList();
            this.uiView.chkBtnFilter.mouseEnabled = false;
            this.uiView.btnComboBox.mouseEnabled = false;
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
            if (this.uiView)
            {
                this.uiView.removeSelf();
                BattleVedioPageNomalBase.uiView = this.uiView;
                this.uiView = null;
            }
        }

        protected resetBaseViewByType(): void
        {
            this.showCheckButton(this.isShowFilterLevelBtn());
            this.setComboBoxList(this.getComboBoxStrList());
        }

        public setData($data: any): void
        {
            this._dataList = $data as Pb_God.PBVideoDisplay[];
            this.resetBaseViewByType();
            this.uiView.chkBtnFilter.mouseEnabled = true;
            this.uiView.btnComboBox.mouseEnabled = true;
            this.refreshListView();
        }

        /** 是否显示筛选临近等级的复选框（子类如果需要显示，则重写此方法） */
        protected isShowFilterLevelBtn(): boolean
        {
            return false;
        }

        /** 显示临近等级复选按钮(子类在初始化的时候调用即可) */
        private showCheckButton(isShow: boolean): void
        {
            this.uiView.chkBtnFilter.visible = isShow;
            if (isShow)
            {
                this.uiView.chkBtnFilter.setText(Global.getLangStr("vedio_filterLevel"));
                this.uiView.chkBtnFilter.onSelectChange(this, this.onFilterSelChange);
            }
        }

        /** 获取下拉菜单的内容(子类有下拉菜单的，可重写此方法) */
        protected getComboBoxStrList(): string[]
        {
            return null;
        }

        /** 设置下拉菜单内容(子类在初始化的时候调用即可) */
        private setComboBoxList(list: string[]): void
        {
            let isShow = list && list.length > 0;
            this.uiView.comboBox.visible = isShow;
            this.uiView.comboListPanel.visible = false;
            if (isShow)
            {
                this.uiView.btnComboBox.onClick(this, () =>
                {
                    this.uiView.comboListPanel.visible = true;
                    this.uiView.comboListPanelMask.once(Laya.Event.MOUSE_DOWN, this, () =>
                    {
                        if (this.uiView.comboListPanel)
                        {
                            this.uiView.comboListPanel.visible = false;
                        }
                    })
                })

                this.uiView.txtComboTitle.text = list[this._comboIndex];
                this.uiView.comboListView.onRefresh(list.length, this, (btn: component.UIButton, index: number) =>
                {
                    (btn.getChildByName("label") as Laya.Label).text = list[index];
                    btn.onClick(this, () =>
                    {
                        this.uiView.comboListPanel.visible = false;
                        this.changeComboBoxIndex(index);
                        this.uiView.txtComboTitle.text = list[index];
                    })
                });
                this.uiView.comboListPanel.height = this.uiView.comboListView.getCellTrueHeight() + 17;
            }
        }

        /** 选中下拉菜单项 */
        protected changeComboBoxIndex(index: number): void
        {
            if (this._comboIndex == index) { return; }
            this._comboIndex = index;
            this.refreshListView();
        }

        /** 点击切换筛选临近等级 */
        protected onFilterSelChange(): void
        {
            this.refreshListView();
        }

        /** 当前筛选的列表(子类可根据需要，重写此方法) */
        protected getFilterList(): Pb_God.PBVideoDisplay[]
        {
            return this._dataList;
        }

        /** 是否需要筛选临近等级 */
        protected isFilterLevel(): boolean
        {
            if (!this.uiView.chkBtnFilter.visible) { return false; }
            return this.uiView.chkBtnFilter.isSelected;
        }

        /** 清理列表显示 */
        public clearList(): void
        {
            this.uiView.listView.visible = false;
            this.uiView.imgEmpty.visible = false;
            this.uiView.listView.onRefresh(0, null, null);
        }

        /** 刷新列表 */
        protected refreshListView(): void
        {
            let list = this.getFilterList();
            this.uiView.listView.visible = list != null && list.length > 0;
            this.uiView.imgEmpty.visible = !this.uiView.listView.visible;
            if (this.uiView.listView.visible)
            {
                this.uiView.listView.onRefresh(list.length, this, (tempUI: Pro.BattleVedioNormalItemView, index: number) =>
                {
                    tempUI.setData(list[index], this._videoType);
                });
            }
        }
    }
}