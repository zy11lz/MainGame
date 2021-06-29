module Pro
{
    /**
     * 界面说明： 英雄升星成功
    * @author jason.xu
    */
    export class HeroUpStarSucMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Hero.HeroUpSuc.HeroUpStarSucUI;

        private _curHero: Net.hero;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas('heroupsuc'), UrlMgr.getAtlas("rewardpopup")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Hero.HeroUpSuc.HeroUpStarSucUI, 1, BaseAddLayer.TopUI, true, 1);
        }

        public closeUI(): void
        {
            super.closeUI();
            this._curHero = null;
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
            let petInfo: Net.hero = this.UIOpenData.customObject[0];
            this._curHero = petInfo;
            let petId = petInfo.id;
            let currentStar = petInfo.star;
            //头像显示
            this.UIPanel.norItemOld.setPetUI(petInfo.useskinid, this.UIOpenData.customObject[3],false,petInfo.evolve);
            this.UIPanel.norItemNew.setPetUI(petInfo.useskinid, currentStar,false,petInfo.evolve);
            this.refreshSkillView();
            this.refreshAttrList();
            
            SoundMgr.Inst().playSound("levelup");
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            //同步单个战斗力	PBG2CSynPetFightPower
            this.addEventMgr(Cmd.S2C_Pet_SynFightPower.cmdName, this, this.onSynFightPower)
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }


		/*****
		 *同步单个战斗力	PBG2CSynPetFightPower
		 * @param PBG2CSynPetFightPower
		 * 		sn			uint64	伙伴
		 * 		fightpower			uint32	同步战斗力
		 */
        protected onSynFightPower(value: Pb_God.PBG2CSynPetFightPower): void
        {
            if (!this._curHero.sn.equals(value.sn as Long)) return;
            this.refreshAttrList();
        }

        /** 刷新技能显示 */
        private refreshSkillView(): void
        {
            let petInfo = this._curHero;
            let currentAdvance = petInfo.advance;
            let petId = petInfo.id;
            let skinId = petInfo.useskinid;
            let currentStar = petInfo.star;
            let oldStar = this.UIOpenData.customObject[3];
            //判断当前是否有技能升级
            //前一星级的技能
            let lastUpSkillArr = cfg.PetUpsartSkillCfgData.getAddSkillLvMapById(oldStar);
            let curUpSkillArr = cfg.PetUpsartSkillCfgData.getAddSkillLvMapById(currentStar);
            let hasUpSkill = lastUpSkillArr && curUpSkillArr;
            let showUp = false;
            if (hasUpSkill)
            {
                //找出不一样的那一个
                let changeIndex = -1;
                for (var i = 0; i < curUpSkillArr.length; i++)
                {
                    if (lastUpSkillArr[i] != curUpSkillArr[i])
                    {
                        changeIndex = i;
                        break;
                    }
                }
                if (changeIndex != -1)
                {
                    let addSkillList = cfg.PetSkinCfgData.getAddSkillAryById(skinId);
                    if (changeIndex < addSkillList.length)
                    {
                        showUp = true;
                        let skillId = addSkillList[changeIndex].value1;
                        let oldLv = lastUpSkillArr[changeIndex];
                        let newLv = curUpSkillArr[changeIndex];
                        Global.setSkilItem(this.UIPanel.upSkill1, skillId, oldLv, true);
                        Global.setSkilItem(this.UIPanel.upSkill2, skillId, newLv, true);
                    }
                }
            }
            this.UIPanel.upSkillView.visible = showUp;
            this.UIPanel.listViewSkills.visible = !showUp;
            if (!showUp) Global.setSkillBoxWithPetInfo(this.UIPanel.listViewSkills, true, skinId, currentAdvance, currentStar, true);
        }

        /** 刷新属性列表 */
        private refreshAttrList(): void
        {

            let petInfo = this._curHero;
            let oldAttr: Pb_God.PBAttrInfo[] = this.UIOpenData.customObject[1];
            let newAttr: Pb_God.PBAttrInfo[] = petInfo.attr;

            //第一个固定为战斗力变化
            //从第2个开始才是属性变化
            this.UIPanel.listViewAttr.onRefresh(5, this, (tempUI: ProUI.Hero.HeroUpSuc.HeroUpSucAttrItemUI, index: number) =>
            {
                if (index == 0)
                { //战斗力
                    tempUI.txtOldValue.text = Global.getLangStr("hero_msg44") + this.UIOpenData.customObject[2];
                    tempUI.txtNewValue.text = petInfo.fightpower + "";
                } else
                { //属性值
                    let attrType = index;
                    let attrName = cfg.BattleCfgData.getDescByAttrType(attrType);
                    tempUI.txtOldValue.text = attrName + "：" + Global.getAtterValue(oldAttr, attrType);
                    tempUI.txtNewValue.text = Global.getAtterValue(newAttr, attrType) + "";
                }
            });
        }

    }
}