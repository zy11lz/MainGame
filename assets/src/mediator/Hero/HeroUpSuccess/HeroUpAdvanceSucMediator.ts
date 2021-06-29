module Pro
{
    /**
    * 界面说明： 英雄进阶成功弹窗
    * @author jason.xu
    */
    export class HeroUpAdvanceSucMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Hero.HeroUpSuc.HeroUpAdvanceSucUI;

        private _curHero: Net.hero;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas('heroupsuc'), UrlMgr.getAtlas("rewardpopup")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Hero.HeroUpSuc.HeroUpAdvanceSucUI, 1, BaseAddLayer.TopUI, true, 1);
        }

        public closeUI(): void
        {
            super.closeUI();
            // Laya.timer.clear(this, this.refreshAttrList);
            //在关掉此界面时，检查一次是否同时还有新技能开放。  由于此界面是放在其它界面上层，所以不便于做队列处理
            if (this._curHero && this._curHero.preopenSkill)
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroNewSkill, this._curHero.preopenSkill));
            }
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
            let currentAdvance = petInfo.advance;
            //头像显示
            this.UIPanel.norItem.setPetInfo(petInfo, false, false);

            let petId = petInfo.id;
            let currentStar = petInfo.star;
            let currentUpStarInfo = cfg.PetUpStarCfgData.getInfoWithFun(petId, currentStar);
            let currentMaxAdvance = currentUpStarInfo != null ? currentUpStarInfo.maxAdvance : cfg.PetCfgData.getInitMaxAdvanceByPetID(petId);
            //进阶进度显示
            this.UIPanel.starList.onRefresh(currentMaxAdvance, this, (itemUI: component.UIFrameImage, index: number) =>
            {
                itemUI.frame = index < currentAdvance ? 1 : 2;
            });

            this.refreshAttrList();

            SoundMgr.Inst().playSound("levelup");
        }

        /** 刷新属性列表 */
        private refreshAttrList(): void
        {

            let petInfo = this._curHero;
            let oldAttr: Pb_God.PBAttrInfo[] = this.UIOpenData.customObject[1];

            //第一个固定为战斗力变化
            //第二个固定为等级上限变化
            //从第三个开始才是属性变化
            this.UIPanel.listView.onRefresh(6, this, (tempUI: ProUI.Hero.HeroUpSuc.HeroUpSucAttrItemUI, index: number) =>
            {
                if (index == 0)
                { //战斗力
                    tempUI.txtOldValue.text = Global.getLangStr("hero_msg44") + this.UIOpenData.customObject[2];
                    tempUI.txtNewValue.text = petInfo.fightpower + "";
                } else if (index == 1)
                { //等级上限
                    tempUI.txtOldValue.text = Global.getLangStr("hero_msg45") + petInfo.level;
                    tempUI.txtNewValue.text = cfg.PetAdvanceCfgData.getMaxPetLevelByAdvance(petInfo.advance) + "";
                } else
                { //属性值
                    let attrType = index - 1;
                    let attrName = cfg.BattleCfgData.getDescByAttrType(attrType);
                    tempUI.txtOldValue.text = attrName + "：" + Global.getAtterValue(oldAttr, attrType);
                    tempUI.txtNewValue.text = Global.getAtterValue(petInfo.preUpAttr, attrType) + "";
                }
            });
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            //同步单个战斗力	PBG2CSynPetFightPower
            this.addEventMgr(Cmd.S2C_Pet_SynFightPower.cmdName, this, this.onSynFightPower)
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

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

        //-----------------------------------新手引导------------------------------------
        /**
         * 进入本步引导
         */
        public Guide_Enter(step: GuideStep)
        {
            if (step == GuideStep.Func_7DayActUpPet_7)
            {
                GuideMgr.Inst.showFinger(this.UIPanel.TipsImg, true, this.getDarkUI());
            }
        }

    }
}