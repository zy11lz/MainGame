module Pro
{
    /**
    * 录相馆： 竞技场
    * @author jason.xu
    */
    export class BattleVedioPageChallenge extends BattleVedioPageNomalBase
    {

        /** 是否显示筛选临近等级的复选框（子类如果需要显示，则重写此方法） */
        protected isShowFilterLevelBtn(): boolean
        {
            return true;
        }

        /** 获取下拉菜单的内容(子类有下拉菜单的，可重写此方法) */
        protected getComboBoxStrList(): string[]
        {
            return Global.getLangStr("vedio_filters1").split(",");
        }

        /** 当前筛选的列表(子类可根据需要，重写此方法) */
        protected getFilterList(): Pb_God.PBVideoDisplay[]
        {
            let alllist = this._dataList || [];
            let ret = [];
            //是否需要筛选临近等级
            let isFilterLevel = this.isFilterLevel();
            let playerLv = PlayerDataMgr.level;
            //筛选名次范围
            //全部,1-10名,11-50名,51-100名,101名以后
            let rankRange = [[-1, 99999], [1, 10], [11, 50], [51, 100], [101, 99999]][this._comboIndex];
            for (var el of alllist)
            {
                if (isFilterLevel)
                {
                    let leftLv = el.leftdisplay.playerdisplay.level;
                    let rightLv = el.rightdisplay.playerdisplay.level;
                    if ((leftLv < playerLv - 10 || leftLv > playerLv + 10) && (rightLv < playerLv - 10 || rightLv > playerLv + 10))
                    { continue; }
                }
                let leftRank = el.friendrank;
                let rigthRank = el.enermyrank;
                if ((leftRank >= rankRange[0] && leftRank <= rankRange[1]) || (rigthRank >= rankRange[0] && rigthRank <= rankRange[1]))
                { ret.push(el); }
            }
            return ret;
        }
    }
}
