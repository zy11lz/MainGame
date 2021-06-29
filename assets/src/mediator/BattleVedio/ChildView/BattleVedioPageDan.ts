module Pro
{
    /**
    * 录相馆： 超凡段位赛分页
    * @author jason.xu
    */
    export class BattleVedioPageDan extends ProUI.BattleVedio.ChildView.DanPageViewUI implements ITableView
    {

        /** 录像数据 */
        protected _dataList: Pb_God.PBPlayerDanRecord[];

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
        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        public hide(): void
        {
        }

        public setData($data: any): void
        {
            this._dataList = $data as Pb_God.PBPlayerDanRecord[];
            this.refreshListView();
        }

        /** 设置列表 */
        private refreshListView(): void
        {
            this.listView.visible = this._dataList != null && this._dataList.length > 0;
            this.imgEmpty.visible = !this.listView.visible;
            if (this.listView.visible)
            {
                this.listView.onRefresh(this._dataList.length, this, (tempUI: DanRecordItemView, index: number) =>
                {
                    tempUI.setData(this._dataList[index], true);
                });
            }
        }
    }
}