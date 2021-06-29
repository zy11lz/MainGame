
module Pro {
    export class HeroDefendHeroItem extends ProUI.Hero.HeroDefend.item.HeroDefendHeroItemUI {

        public _data: any;

        /**
         * 类型 0：没有开启，1：已开启但还没有放入精灵，2：已经放有精灵
         */
        public type:number=0;

        private _info:cfg.DefendSlotCfgInfo;

        private _redDotModel:RedDotModel;

        onAwake() {
            

        }

        public setData(index: number) {
            let slot:number=index+1;
            this._info=cfg.DefendSlotCfgData.getInfo(slot);


            let isOpen:boolean=DefendDataMgr.rank>=this._info.rank&&DefendDataMgr.level>=this._info.level;
           if(!isOpen){
               this.type=0;
               this.lbl_name.text=this._info.unlockDesc;
           }else{
                let plan=DefendDataMgr.getCurrentPlan();
                let pet:Pb_God.PBDefendPetSlot;
                this.type=1;
                if(plan&&plan.pets){
                    for(let i=0;i<plan.pets.length;i++){
                        if(plan.pets[i].index==this._info.slot){
                            pet=plan.pets[i];
                            let tmpHeroInfo = PetDataMgr.getPetInfo(pet.petSnID)
                            this.itemUI.setPetInfo(tmpHeroInfo, false);
                            this.type=2;
                            this.lbl_name.text=cfg.PetSkinCfgData.getFileNameById(tmpHeroInfo.useskinid);
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
                    this.lbl_name.text=Global.getLangStr("HeroDefendMsg11");
                break;
                case 2:
                    this.itemUI.visible=true;
                break;


           }

           if(this._redDotModel){
                this._redDotModel.off(Laya.Event.CHANGE, this, this.onChangeReddot);
           }
           this._redDotModel=DefendDataMgr.reddotModel.getChildModel(slot);
           this._redDotModel.on(Laya.Event.CHANGE, this, this.onChangeReddot);
           this.onChangeReddot(null);
        }
        onChangeReddot(reddotModel:any){
            this.RedDotImg.visible=this._redDotModel.isRedDot;

        }





        onEnable(){
            this.on(Laya.Event.CLICK,this,this.onSelfClick);
        }
        onDisable(){
            this.off(Laya.Event.CLICK,this,this.onSelfClick)
        }
        onSelfClick(){
            if(this.type){
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroDefendChoice,this._info.slot));
            }else{
                TipsUtils.showTips(this._info.unlockDesc);
            
            }
            


        }








    }



}