module Pro
{
    /**
    * 录相馆： 好友切蹉
    * @author jason.xu
    */
    export class BattleVedioPageFriendAttack extends BattleVedioPageNomalBase
    {
        /** 获取下拉菜单的内容(子类有下拉菜单的，可重写此方法) */
        protected getComboBoxStrList(): string[]
        {
            return Global.getLangStr("vedio_filters4").split(",");
        }

        /** 当前筛选的列表(子类可根据需要，重写此方法) */
        protected getFilterList(): Pb_God.PBVideoDisplay[]
        {
            let alllist = this._dataList || [];
            let ret = [];
            //筛选等级范围
            //全部,151级以上,101-150级,51-100级,1-50级
            let lvRange = [[-1, 99999], [151, 99999], [101, 150], [51, 100], [1, 50]][this._comboIndex];
            for (var el of alllist)
            {
                let leftLv = el.leftdisplay.playerdisplay.level;
                let rightLv = el.rightdisplay.playerdisplay.level;
                if ((leftLv >= lvRange[0] && leftLv <= lvRange[1]) || (rightLv >= lvRange[0] && rightLv <= lvRange[1]))
                { ret.push(el); }
            }
            return ret;
        }
    }
}
