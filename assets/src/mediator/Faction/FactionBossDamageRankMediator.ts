module Pro
{
    /**
    * 界面说明：公会副本伤害排名界面
    * <p> 注： 此界面为共享排行榜带top3的通用界面。
    * @author jason.xu
    */
    export class FactionBossDamageRankMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Rank.Detail.RankDetailUI;

        /** 当前列表表格的位置数据 */
        private _curTabelWidthList = [];
        /** 当前BOSS的伤害排名数据 */
        private _curDamageList: Pb_God.PBFactionCopymapTop[];
        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("rankdetail")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Rank.Detail.RankDetailUI, 3, BaseAddLayer.CenterUI, true, 1);
        }


        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.txtTitle.innerHTML = Global.getLangStr("factionboss_rankTitle");
            // 配置表头
            this.__setSingleTableHeader(0, "rank_header_01", 112);
            this.__setSingleTableHeader(1, "rank_header_02", 318);
            this.__setSingleTableHeader(2, "rank_header_12", 190);
            this.__setSingleTableHeader(3);
            this.__setSingleTableHeader(4);
            this.UIPanel.hboxListHeader.refresh();

        }

        private __setSingleTableHeader(index: number, langKey: string = null, nWidth: number = 0): void
        {
            let label = this.UIPanel.hboxListHeader.getChildAt(index) as component.UILabel;
            if (!langKey)
            {
                label.visible = false;
                return;
            }
            label.visible = true;
            this._curTabelWidthList[index] = nWidth;
            label.width = nWidth;
            label.text = Global.getLangStr(langKey);
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.UIPanel.selfInfoView.setPlayerData(null);  //参数null表示显示玩家自己的信息
            //列表
            let list = this.UIOpenData.customObject as Pb_God.PBFactionCopymapTop[];
            //找自己的
            let isFindSelf = false;
            for (var i = 0; i < list.length; i++)
            {
                let el = list[i]
                //自己的信息
                if (el.displayer.playerid == PlayerDataMgr.uid)
                {
                    isFindSelf = true;
                    this.resetMyInfo(i + 1, el.damage as Long);
                    break;
                }
            }
            if (!isFindSelf)
            {
                //自己的信息显示
                this.resetMyInfo(0, 0);
            }

            this._curDamageList = list;
            this.UIPanel.listView.onRefresh(list.length, this, this.onRefreshItem);
            this.UIPanel.imgEmpty.visible = list.length <= 0;

            //top3
            for (var i = 1; i <= 3; i++)
            {
                var data = list[i - 1];
                let txtTopNickname = this.UIPanel["txtTopNickname" + i] as component.UILabel;
                let viewPlayerIcon = this.UIPanel["viewPlayerIconTop" + i] as Pro.PlayerIconUI;
                txtTopNickname.text = data ? data.displayer.playername : Global.getLangStr("common_empty1");
                viewPlayerIcon.setPlayerDisplayInfo(data ? data.displayer : null, false, true);
            }
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
        }

        private onRefreshItem(tempUI: Pro.RankDetailItemView, index: number): void
        {
            let data = this._curDamageList[index];

            let rank = index + 1;

            tempUI.hideAllChildren();
            tempUI.setRankValue(rank);
            tempUI.setTableWidthList(this._curTabelWidthList);
            tempUI.setPlayerData(data.displayer);
            tempUI.addNormalValueLabel(data.damage);
            // tempUI.addWorshipValue(data.damage, data.likecount);
        }

        /** 刷新我的排名信息 */
        private resetMyInfo(rank: number, damageValue: Long | number): void
        {
            let itemView = this.UIPanel.selfInfoView;
            itemView.hideAllChildren();
            itemView.setRankValue(rank);
            itemView.setTableWidthList(this._curTabelWidthList);
            itemView.addNormalValueLabel(damageValue);
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

    }
}