module Pro
{
    /**
    * 界面说明：神界冒险-挑战守卫（战前准备）
    * @author jason.xu
    */
    export class RiskPreBattleMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Risk.RiskPreBattleUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null;
            // return [UrlMgr.getAtlas("test")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Risk.RiskPreBattleUI, 1, BaseAddLayer.TopUI, true, 1);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            //跳过战斗
            this.UIPanel.chkBtnJumpBattle.setText(Global.getLangStr("bat_msg20"));
            this.UIPanel.chkBtnJumpBattle.setClickSelect();
            // this.UIPanel.chkBtnJumpBattle.isSelected = false; //默认状态
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.refreshUI();
            //跳过战斗
            // this.UIPanel.chkBtnJumpBattle.visible = RiskDataMgr.data.curstage >= 20;
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(EventNotify.Risk_Hero_Change, this, this.onChangeSelectHero);
            this.UIPanel.btnEnter.onClick(this, this.onClickEnter);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            this.UIPanel.listHeros.refreshView();
            //刷新当前选中的英雄
            this.onChangeSelectHero();
            //刷新守卫信息
            this.refreshDefHeroInfo();
        }

        /** 刷新守卫信息 */
        private refreshDefHeroInfo(): void
        {
            let guardInfo = this.UIOpenData.customObject as RiskGuardInfo;
            let monsterInfo = cfg.RiskMonsterNewCfgData.getMonterInfoWithID(guardInfo.monsterId);

            let norItem = this.UIPanel.norItemDef;
            norItem.setPetUI(monsterInfo.skinId, monsterInfo.star, false);
            norItem.SelectStatueImg.visible = false;
            this.UIPanel.txtDefName.text = cfg.PetSkinCfgData.getFileNameById(monsterInfo.skinId);
            //显示血量
            norItem.DieImg.visible = false;
            norItem.BloodBgImg.visible = !norItem.DieImg.visible;
            norItem.setBloodProgress(guardInfo.curHp / guardInfo.totalHp);
            norItem.BloodLb.visible = false;
        }


        /** 当前选中的英雄变更 */
        private onChangeSelectHero(index: number = -999): void
        {
            if (index == -999)  //特殊值，表示并非从事件传入，而是首次初始化的时候
                index = RiskDataMgr.getOperaHeroIndex()
            else
                this.UIPanel.listHeros.refreshHeroList();

            let hero = RiskDataMgr.getHeroByIndex(index);
            if (!hero) return;

            this.UIPanel.txtFightPower.text = "" + hero.fightpower;

            let norItemAtk = this.UIPanel.norItemAtk;
            norItemAtk.setPetUI(hero.petdisplay.useskinid, hero.petdisplay.star, false);
            norItemAtk.SelectStatueImg.visible = false;
            let hpProgress = (hero.curhp as Long).toNumber() / (hero.maxhp as Long).toNumber();
            norItemAtk.DieImg.visible = hpProgress <= 0;
            norItemAtk.BloodBgImg.visible = !norItemAtk.DieImg.visible;
            norItemAtk.setBloodProgress(hpProgress);
            //显示血量
            norItemAtk.BloodLb.visible = false;
        }

        /** 点击开始战斗 */
        private onClickEnter(): void
        {
            //判断当前选择的英雄血量
            if (this.UIPanel.norItemAtk.DieImg.visible)
            {
                TipsUtils.showTipsByLanId("tips_msg47");
                return;
            }
            let guardInfo = this.UIOpenData.customObject as RiskGuardInfo;
            let index = RiskDataMgr.getOperaHeroIndex();
            let hero = RiskDataMgr.getHeroByIndex(index);
            this.closeUI();
            //请求进入战斗
            let posData = { pos: 2, petsn: hero.petdisplay.sn };  //只上阵一个英雄，固定位置即可。
            let isJumpBattle = this.UIPanel.chkBtnJumpBattle.visible && this.UIPanel.chkBtnJumpBattle.isSelected;
            FightSend.normalBegin(Pb_God._emBattleType.BattleType_Risk, guardInfo.cfgIndex, 0, 0, [posData], 0, isJumpBattle, "");
        }
    }
}