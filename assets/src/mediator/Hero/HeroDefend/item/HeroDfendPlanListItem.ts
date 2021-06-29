
module Pro {
    export class HeroDefendPlanListItem extends ProUI.Hero.HeroDefend.item.HeroDefendSkillItemUI {

        public _data: any;

        /**
         * 类型 0：没有开启，1：已开启但还没有放入精灵，2：已经放有精灵
         */
        public type:number=0;

        private _info:cfg.DefendSlotCfgInfo;

        public showNameBol:boolean=true;
        
        public planIndex:number;
        

        onAwake() {
            
            this.itemUI.mouseEnabled=false;
        }
        onEnable(){
            this.on(Laya.Event.CLICK,this,this.onClickHandler)
        }
        onDisable(){
            this.off(Laya.Event.CLICK,this,this.onClickHandler)
        }
        onClickHandler(){
            UIManager.Inst.forceOpen(new BaseOpenUIData(Pro.PanelNotify.Open_HeroDefendLocationSet,this.planIndex));
        }

        public setData(index: number,hero:Net.hero,planIndex:number) {
            this.planIndex=planIndex;
            this._info=cfg.DefendSlotCfgData.getInfo(index+1);
           let isOpen:boolean=DefendDataMgr.rank>=this._info.rank&&DefendDataMgr.level>=this._info.level;
           this.itemUI.name=index.toString();
           if(!isOpen){
               this.type=0;
              
           }else{
                this.type=1;
                if(hero){
                    let info:cfg.DefendSkillCfgInfo=cfg.DefendSkillCfgData.getInfoByStar(hero.id,hero.star);
                    if(info){
                        Global.setSkilItem(this.itemUI, info.skillID, info.skillLevel, true);
                    }
                    let skillInfo=cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(info.skillID, info.skillLevel);
                    this.lbl_name.text=skillInfo.name;
                    this.lbl_name.visible=this.showNameBol;
                    this.type=2;
                }else{
                    this.lbl_name.visible=false;
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
       











    }



}