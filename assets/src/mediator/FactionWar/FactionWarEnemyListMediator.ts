module Pro
{
    /**
    * 界面说明： 公会战-进攻一览（敌方据点列表）
    * @author jason.xu
    */
    export class FactionWarEnemyListMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.FactionWar.FactionWarEnemyListUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("factionwar")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.FactionWar.FactionWarEnemyListUI, 1);
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
            this.refreshUI();
            this.UIPanel.listView.visible = false;
            FactionSend.queryAttackList();
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnConfirm.onClick(this, this.closeUI);
            this.addEventMgr(CmdEvent.FactionWar_QueryAttackListAck, this, this.onQueryAttackListAck);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }


        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            let totalCount = cfg.FactionWarConstCfgData.getFirstInfo().dayFightCount;
            let count = totalCount - FactionDataMgr.warUseCount;
            this.UIPanel.txtLeftCount.text = Global.getLangStr("factionwar_msg2", count, totalCount);
        }

		/*****
		 *	返回查询进攻列表		PBG2CFactionWarAttackListAck
		 * @param PBG2CFactionWarAttackListAck
		 * 		member			PBFactionWarMemberDisplay	成员信息
		 */
        protected onQueryAttackListAck(value: Pb_God.PBG2CFactionWarAttackListAck): void
        {
            let list = value.member;
            this.UIPanel.listView.visible = true;
            this.UIPanel.listView.onRefresh(list.length, this, (tempUI: ProUI.FactionWar.ChildView.EnemyListItemViewUI, index: number) =>
            {
                let fortData = list[index];
                //星星数
                let starCount = fortData.beattackstar;
                for (var i = 0; i < 3; i++)
                {
                    let img = tempUI.listStar.getChildAt(i) as Laya.Image;
                    img.gray = (i + 1) > starCount;
                }
                let isFortDestroy = starCount >= 3;
                tempUI.imgFort.frame = isFortDestroy ? 2 : 1;
                tempUI.txtDestroyTips.visible = isFortDestroy;
                let playerdisplay = fortData.playerdisplay;

                tempUI.txtNickname.text = Global.getLangStr("factionwar_msg10") + playerdisplay.playername;
                tempUI.txtFightValue.text = Global.getLangStr("common_fightPower") + fortData.fightpower;
                tempUI.btnAttack.onClick(this, () =>
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FactionWarEnemyInfo, fortData));
                });
            });
        }

    }
}