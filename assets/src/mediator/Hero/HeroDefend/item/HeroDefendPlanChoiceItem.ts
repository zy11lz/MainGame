module Pro {
    export class HeroDefendPlanChoiceItem extends ProUI.Hero.HeroDefend.item.HeroDefendPlanChoiceItemUI {

        private _plan:Pb_God.PBDefendPlan;
        onAwake() {
            

        }
        onEnable(){
            this.btn_choice.on(Laya.Event.CLICK,this,this._onBtnChoiceClick);
        }
        onDisable(){
            this.btn_choice.off(Laya.Event.CLICK,this,this._onBtnChoiceClick);
        }

        _onBtnChoiceClick(){
            let pets=DefendDataMgr.getCurrentPlan().pets
            DefendSend.savePlan(this._plan.index,pets,pets);
        }




        public setData(index: number) {
            this._plan=DefendDataMgr.plans[index];
            this.lbl_name.text=Global.getLangStr("HeroDefendMsg4",Global.numberToChinese(this._plan.index));
        }


    }

}