
module Pro
{
	/**
     * 指定英雄列表选择框
     */
    export class HeroSelectBoxUI extends ProUI.Hero.HeroHoly.HeroSelectBoxUI
    {

        /** 英雄类型 */
        petType: number = -1;

        /** 需要的伙伴 */
        needStarPet: cfg.ValueTwoInfo;
        /** 当前选择的伙伴 */
        selectHeros: Long[] = [];

        /** 切换时外部响应 */
        private caller: any;
        private listener: Function;

        constructor()
        {
            super();

            this.on(Laya.Event.DISPLAY, this, () =>
            {
                this.controllEvents(false);
            });
        }

        //---------------------------------------Event------------------------------------
        /** 控制消息监听器 */
        private controllEvents(isOff: boolean = true)
        {
            Global.EventsNotifyControl(this.listensEvents(), isOff);
            if (!isOff)
            {
                this.on(Laya.Event.UNDISPLAY, this, this.controllEvents);
            }
        }
        /** 本类监听消息列表 */
        private listensEvents(): Array<any>
        {
            return [
                EventNotify.Pet_Materia_Selected, this, this.onHeroSelected
            ];
        }


        /** 点击选择英雄 */
        private onClickSelectHero(): void
        {
            let needNum = this.needStarPet.value2;
            let allHeros = this.getCanSelectHeros();
            allHeros.sort(function (a: Net.hero, b: Net.hero): number
            {
                // if (a.isSelected != b.isSelected) { return b.isSelected ? 1 : -1; }
                if (a.onStore != b.onStore) { return a.onStore ? 1 : -1; }
                if (a.islock != b.islock) { return a.islock ? 1 : -1; }
                if (a.star != b.star) { return a.star - b.star; }
                if (a.level != b.level) { return a.level - b.level; }
                else return b.id - a.id;
            });
            let customParams = [allHeros, this.selectHeros, [], [], needNum, false,true];
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroMaterialSelect, customParams));
        }

        /** 英雄材料选择完成回调 */
        private onHeroSelected(selectHeros: Long[], selectItems: Long[]): void
        {
            this.selectHeros = selectHeros;
            this.refreshHeroState();
            if (this.listener) this.listener.call(this.caller);
        }

        public setChangeListener(caller: any, callback: Function): void
        {
            this.listener = callback;
            this.caller = caller;
        }


        /** 重置材料英雄列表 */
        public resetData(petType: number, clear: boolean, needStarPet: cfg.ValueTwoInfo): void
        {
            this.petType = petType;
            if (clear) this.selectHeros = [];
            this.needStarPet = needStarPet;
            this.refreshHeroState();
        }

        /** 当前是否已达成条件 */
        public isFinish(): boolean
        {
            return this.needStarPet.value2 <= this.selectHeros.length;
        }

        public checkFullHeros(isTips: boolean): boolean
        {
            if (this.selectHeros.length < this.needStarPet.value2)
            {
                if (isTips) TipsUtils.showTipsByLanId("hero_msg9");
                return false;
            }
            return true;
        }

        /** 获取当前选择的英雄列表 */
        public getSelectHeros(): Long[]
        {
            return this.selectHeros;
        }


        /** 刷新当前选择的状态 */
        private refreshHeroState(): void
        {
            let choiceNum = this.selectHeros.length;
            this.norItem.setNeedStarPetCfgInfo(this.petType, this.needStarPet.value1, this.needStarPet.value2, choiceNum, false);
            this.norItem.onClick(this, this.onClickSelectHero);

            var isUnder = choiceNum < this.needStarPet.value2;
            this.norItem.IconImg.gray = isUnder;
            this.norItem.RedDotImg.visible = isUnder &&
                this.getCanSelectHeros().length >= this.needStarPet.value2;
        }

        /** 获取能使用的英雄列表 */
        private getCanSelectHeros(): Net.hero[]
        {
            let petList = PetDataMgr.getPetList();
            let canSelHeros = [];
            for (let hero of petList)
            {
                if (hero.star != this.needStarPet.value1) continue;
                if (cfg.PetCfgData.getPetTypeByPetID(hero.id) != this.petType) continue;
                canSelHeros.push(hero);
            }
            return canSelHeros;
        }
    }
}