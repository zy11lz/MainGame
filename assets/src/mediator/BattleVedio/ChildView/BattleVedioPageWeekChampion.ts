module Pro
{
    /**
    * 录相馆： 周冠军
    * @author jason.xu
    */
    export class BattleVedioPageWeekChampion extends BattleVedioPageNomalBase
    {
        /** 获取下拉菜单的内容(子类有下拉菜单的，可重写此方法) */
        protected getComboBoxStrList(): string[]
        {
            return Global.getLangStr("vedio_filters3").split(",");
        }
        /** 当前筛选的列表(子类可根据需要，重写此方法) */
        protected getFilterList(): Pb_God.PBVideoDisplay[]
        {
            return this._dataList;
        }

    }
}
