module Pro
{
    export class HeroDefendChoiceMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Hero.HeroDefend.HeroDefendChoiceViewUI;




        private _plan: Pb_God.PBDefendPlan;
        /**英雄列表*/
        public pets: Pb_God.PBDefendPetSlot[];
        public skills: Pb_God.PBDefendPetSlot[];

        private pet: Pb_God.PBDefendPetSlot;
        /**当前卡槽英雄id */
        private heroid: number;

        public currentHero: Net.hero;

        /** 当前已解锁的英雄 */
        public heros: Array<Net.hero>;
        private _slot: number;
        /**其它卡槽已经有的英雄 */
        private dic: any = {};



        public constructor()
        {
            super();


        }


        public autoLoadAtlas(): Array<any>
        {
            return [];
        }
        public openUI(): void
        {
            this.showPanel(ProUI.Hero.HeroDefend.HeroDefendChoiceViewUI, 1, BaseAddLayer.TopUI, true);

        }
        public closeUI(): void
        {
            this.closePanel();
        }
        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {




        }
        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btn_close.onClick(this, this.closeUI);
            this.UIPanel.btn_choice.onClick(this, this.onBtnChoiseClick);
            this.UIPanel.lbl_des.textField.on(Laya.Event.MOUSE_DOWN, this, this.startScrollText);

        }
        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
            this.UIPanel.lbl_des.textField.off(Laya.Event.MOUSE_DOWN, this, this.startScrollText);

        }

        public onBtnChoiseClick()
        {

            if (this.currentHero)
            {
                if (!this.pet)
                {
                    this.pet = new Pb_God.PBDefendPetSlot();
                    this.pets.push(this.pet);
                }
                this.pet.index = this._slot;
                this.pet.petSnID = this.currentHero.sn;
            } else
            {
                for (let i = 0; i < this.pets.length; i++)
                {
                    if (this.pets[i].index == this._slot)
                    {
                        this.pets.splice(i, 1);
                        break;
                    }
                }
            }
            this.skills = this.pets.concat();
            DefendSend.savePlan(DefendDataMgr.planIndex, this.pets, this.skills);
            this.closeUI();

        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this._slot = this.UIOpenData.customObject;

            this._plan = DefendDataMgr.getCurrentPlan();
            this.pets = this._plan.pets;

            this.currentHero = null;
            this.pet = null;






            this.pet = DefendDataMgr.getPetSlot(this._slot);
            this.heroid = -1;



            this.heros = PetDataMgr.getDefendPetList2()

            if (this.pet)
            {
                this.currentHero = PetDataMgr.getPetInfo(this.pet.petSnID);
                this.heros = PetDataMgr.getDefendUsedHeroArr2(this.currentHero, this.heros);
                this.heros.unshift(this.currentHero);
                this.heroid = this.currentHero.id;
            }


            //其它守护的精灵
            let tempLockHero = [];
            this.dic = {};
            /**排除其它卡槽的英雄id */
            for (let i = 0; i < this.pets.length; i++)
            {
                if (this.pets[i].index != this._slot)
                {
                    let heroTmp = PetDataMgr.getPetInfo(this.pets[i].petSnID);
                    this.dic[heroTmp.id] = true;
                    tempLockHero.push(heroTmp);
                }
            }
            //其它不可选的精灵
            let tempLockHero2 = [];
            this.heros = this.heros.filter(
                elment =>
                {
                    if (this.dic[elment.id])
                    {
                        if (!elment.isDefend)
                        {
                            tempLockHero2.push(elment);
                        }
                        return false;
                    }
                    return true;
                }
            )

            this.heros = this.heros.concat(PetDataMgr.getDefendFightList(), tempLockHero, tempLockHero2);

            // if(this.pet){
            //     this.currentHero=PetDataMgr.getPetInfo(this.pet.petSnID);
            //     this.heroid=this.currentHero.id;
            // }
            // this.heros=null;
            // let tempHeros = []
            // for (let i = 0; i < this.pets.length; i++) {
            //     let pet = this.pets[i];
            //     let hero = PetDataMgr.getPetInfo(pet.petSnID);
            //     if(hero==this.currentHero){
            //         tempHeros.unshift(hero);
            //     }else{
            //         tempHeros.push(hero);
            //     }

            //     this.heros=PetDataMgr.getDefendUsedHeroArr2(hero,this.heros);
            // }
            // if(!this.heros){
            //     this.heros=PetDataMgr.getDefendPetList2().concat(PetDataMgr.getDefendFightList());
            // }
            // this.heros = tempHeros.concat(this.heros);



            this.UIPanel.lbl_noHeros.visible = this.heros.length == 0;


            this.refreshPetsLayer();
        }

        /** 刷新状态 */
        private onHeroListRender(item: NorItemUI, index: number): void
        {
            let tmpHeroInfo = this.heros[index] as Net.hero;
            item.setPetInfo(tmpHeroInfo, false);
            item.SelectStatueImg.visible = tmpHeroInfo.onStore;
            item.name = index.toString();
            item.onClick(this, this.onHeroListClick);

            let bol: boolean = tmpHeroInfo.isFight || (tmpHeroInfo.isDefend && tmpHeroInfo.id != this.heroid);
            item.setLockImgVisible(bol, tmpHeroInfo);

            if (this.dic[tmpHeroInfo.id] && !tmpHeroInfo.isDefend && !tmpHeroInfo.isFight)
            {
                item.LockImg.visible = true;
            }



        }

        /** 获取伙伴在阵法中的坐标索引
         * @param  supportPlayerId 支援英雄的好友Id
         */
        public isOnStoreIndex(snid: Long): boolean
        {
            if (this.currentHero && this.currentHero.sn.equals(snid)) { return true; }
            return false;
        }

        /** 选择英雄列表的目标 */
        private onHeroListClick(item: NorItemUI, statue: boolean)
        {
            let index = parseInt(item.name);
            let tempPetInfo = this.heros[index];


            if (tempPetInfo.isFight)
            {
                let infoArr: Pro.Net.BuZhenInfo[] = EmbattleDataMgr.getBuZhenInfoBySn(tempPetInfo.sn);
                if (infoArr)
                {
                    let str: string = Global.getLangStr("ZhenfaType" + infoArr[0].getTeamType());
                    str = Global.getLangStr("HeroDefendMsg15", str)
                    TipsUtils.showTipsByLanId(str);
                }
                return;
            }

            if (tempPetInfo.onStore)
            {
                this.refreshStorePos(tempPetInfo, false);

            } else
            {
                let isEquip = DefendDataMgr.heroIdIsEquip(tempPetInfo.id);
                if (isEquip && this.heroid != tempPetInfo.id)
                {
                    TipsUtils.showTipsByLanId("tips_msg45");
                    return
                }
                this.refreshStorePos(tempPetInfo, true);
            }

            this.refreshPetsLayer();

        }
        refreshStorePos(tempPetInfo: Net.hero, storeBol: boolean)
        {
            if (this.currentHero)
            {
                this.currentHero.onStore = false;
                this.currentHero = null;
            }
            tempPetInfo.onStore = storeBol;
            if (storeBol)
            {
                this.currentHero = tempPetInfo;
            }
        }

        /** 刷新当前拥有的角色状态 */
        private refreshPetsLayer()
        {
            for (let hero of this.heros)
            {
                //刷新上阵状态
                hero.onStore = this.isOnStoreIndex(hero.sn);
            }
            this.UIPanel.list_hero.onRefresh(this.heros.length, this, this.onHeroListRender);
            if (this.currentHero)
            {
                let tmpHeroInfo = this.currentHero
                let info: cfg.DefendSkillCfgInfo = cfg.DefendSkillCfgData.getInfoByStar(tmpHeroInfo.id, tmpHeroInfo.star);
                if (info)
                {
                    Global.setSkilItem(this.UIPanel.itemUI, info.skillID, info.skillLevel, true);
                    let skillInfo = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(info.skillID, info.skillLevel);
                    this.UIPanel.lbl_des.text = skillInfo.des;
                    this.UIPanel.lbl_des.textField.scrollY = 0;
                    this.UIPanel.lbl_skillType.text = Global.getLangStr("skill_type" + skillInfo.skillType);
                    this.UIPanel.lbl_power.text = info.skillScore.toString();
                    this.UIPanel.lbl_skilName.text = skillInfo.name;
                }
                this.UIPanel.box_skill.visible = true;
                this.UIPanel.lbl_noHero.visible = false;



            } else
            {
                this.UIPanel.box_skill.visible = false;
                this.UIPanel.lbl_noHero.visible = true;
            }


        }

        private prevX: number;
        private prevY: number;
        /*开始滚动文本*/
        private startScrollText()
        {
            this.prevX = this.UIPanel.lbl_des.textField.mouseX;
            this.prevY = this.UIPanel.lbl_des.textField.mouseY;
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.scrollText);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.finishScrollText);
        }
        /*停止滚动文本*/
        private finishScrollText()
        {
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.scrollText);
            Laya.stage.off(Laya.Event.MOUSE_UP, this, this.finishScrollText);
        }
        /*鼠标滚动文本*/
        private scrollText()
        {
            var nowX = this.UIPanel.lbl_des.textField.mouseX;
            var nowY = this.UIPanel.lbl_des.textField.mouseY;
            // 将鼠标偏移值累计到滚动量里
            this.UIPanel.lbl_des.textField.scrollX += this.prevX - nowX;
            this.UIPanel.lbl_des.textField.scrollY += this.prevY - nowY;
            this.prevX = nowX;
            this.prevY = nowY;
        }












    }
}