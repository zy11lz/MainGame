
module Pro {
    export class HeroDefendSkillItem extends ProUI.Hero.HeroDefend.item.HeroDefendSkillItemUI {

        public _data: any;

        /**
         * 类型 0：没有开启，1：已开启但还没有放入精灵，2：已经放有精灵
         */
        public type:number=0;

        private _info:cfg.DefendSlotCfgInfo;

        onAwake() {
            this.lbl_name.visible=true;

        }

        public setData(index: number) {
            this._info=cfg.DefendSlotCfgData.getInfo(index+1);
            this.lbl_name.text="";

           let isOpen:boolean=DefendDataMgr.rank>=this._info.rank&&DefendDataMgr.level>=this._info.level;
           if(!isOpen){
               this.type=0;
              
           }else{
                let plan=DefendDataMgr.getCurrentPlan();
                let pet:Pb_God.PBDefendPetSlot;
                this.type=1;
                if(plan&&plan.pets){
                    for(let i=0;i<plan.pets.length;i++){
                        if(plan.pets[i].index==this._info.slot){
                            pet=plan.pets[i];
                            let tmpHeroInfo = PetDataMgr.getPetInfo(pet.petSnID)
                            let info:cfg.DefendSkillCfgInfo=cfg.DefendSkillCfgData.getInfoByStar(tmpHeroInfo.id,tmpHeroInfo.star);
                            if(info){
                                Global.setSkilItem(this.itemUI, info.skillID, info.skillLevel, true);
                            }
                            let skillInfo=cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(info.skillID, info.skillLevel);
                            this.lbl_name.text=skillInfo.name;
                            this.type=2;
                            break;
                        }
                    }
                }
           }
           switch(this.type){
                case 0:
                    this.img_lock.visible=true;
                    this.img_add.visible=false;
                    this.itemUI.visible=false;

                break;
                case 1:
                    this.img_lock.visible=false;
                    this.img_add.visible=true;
                    this.itemUI.visible=false;

                break;
                case 2:
                    this.itemUI.visible=true;

                break;
           }

        }

        onEnable(){
            this.on(Laya.Event.CLICK,this,this.onSelfClick);
        }
        onDisable(){
            this.off(Laya.Event.CLICK,this,this.onSelfClick)
        }
        onSelfClick(){
            if(this.type==1){
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroDefendChoice,this._info.slot));
            }else if(this.type==0){
                TipsUtils.showTips(this._info.unlockDesc);
            
            }
            


        }








    }



}