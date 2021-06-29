module Pro
{
    /**
    * 录相馆： 冠军赛
    * @author jason.xu
    */
    export class BattleVedioPageChampion extends BattleVedioPageNomalBase
    {
        /** 获取下拉菜单的内容(子类有下拉菜单的，可重写此方法) */
        protected getComboBoxStrList(): string[]
        {
            return Global.getLangStr("vedio_filters2").split(",");
        }

        /** 当前筛选的列表(子类可根据需要，重写此方法) */
        protected getFilterList(): Pb_God.PBVideoDisplay[]
        {
            let alllist = this._dataList || [];
            let ret = [];
            //筛选冠军赛类型
            //"全部,决赛,半决赛,8强赛,16强赛,选拔赛"
            let typeRange = [
                [-1, 999],
                [Pb_God._emChampionRound._emChampionRound_Final1], //决赛
                [Pb_God._emChampionRound._emChampionRound_Final2], //半决赛
                [Pb_God._emChampionRound._emChampionRound_Area1], //4强赛
                [Pb_God._emChampionRound._emChampionRound_Area2], //8强赛
                [Pb_God._emChampionRound._emChampionRound_Area4], //16强赛
                [Pb_God._emChampionRound._emChampionRound_Normal1, Pb_God._emChampionRound._emChampionRound_Normal6], //选拔赛
            ][this._comboIndex];
            for (var el of alllist)
            {
                let roundType = el.id;
                if ((!typeRange[1] && roundType == typeRange[0]) ||
                    (roundType >= typeRange[0] && roundType <= typeRange[1]))
                { ret.push(el); }
            }
            return ret;
        }

    }
}
