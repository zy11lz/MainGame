module Pro {
    export class HeroDefendPlanItem extends ProUI.Hero.HeroDefend.item.HeroDefendPlanItemUI {
        private _index:number;
        private _plan:Pb_God.PBDefendPlan;
        private tempUpgradeAry: Array<cfg.AddItemInfo>

        onAwake() {
            

        }

       





        onEnable(){
            this.btn_used.on(Laya.Event.CLICK,this,this.onBtnUsedClick);
            this.btn_open.on(Laya.Event.CLICK,this,this.onBtnOpenClick);

        }
        onDisable(){
            this.btn_used.off(Laya.Event.CLICK,this,this.onBtnUsedClick);
            this.btn_open.off(Laya.Event.CLICK,this,this.onBtnOpenClick);
        }
        onBtnUsedClick(){
            DefendSend.usePlan(this._index);


        }
        onBtnOpenClick(){
            if (!Global.isFullAllRes(this.tempUpgradeAry))
            {
                return;
            }
            //DefendSend.unlockPlan(this._index);


            //二级弹窗确认
            let itemName = cfg.ItemCfgData.getNameById(this.tempUpgradeAry[0].itemid);
            let alertDes = Global.getLangStr("HeroDefendMsg6", this.tempUpgradeAry[0].itemcount,itemName, this._index);
            
            AlertShow.showConfirmAlert(alertDes, this, () =>
            {
                DefendSend.unlockPlan(this._index);
            });





        }
        public setData(index: number) {
            this._index=index+1;
            this._plan=DefendDataMgr.getPlanByIndex(this._index);
            this.lbl_title.text=Global.getLangStr("HeroDefendMsg4",Global.numberToChinese(this._index));
            if(this._plan){
                this.lbl_des.visible=false;
                this.btn_open.visible=false;
                this.HeroOnStory.visible=true;
                this.btn_used.visible=true;
                this.HeroOnStory.onRefresh(4,this,this._heroOnStroyRender);
            }
            else
            {
                this.lbl_des.visible=true;
                this.btn_open.visible=true;
                this.HeroOnStory.visible=false;
                this.btn_used.visible=false;


                this.tempUpgradeAry=cfg.DefendPlanCfgData.getNeedItemAryByIndex(this._index);
                if(this.tempUpgradeAry.length){
                    Global.setResIconWithItemID(this.IconImg, Pro.CfgID.ResType.Item, this.tempUpgradeAry[0].itemid);
                    this.lbl_btnOpen.text=Global.getLangStr("HeroDefendMsg3",this.tempUpgradeAry[0].itemcount)
                }else{
                    this.IconImg.skin=null;
                    this.lbl_btnOpen.text=Global.getLangStr("system_tips_msg");
                }
            }
        }
        private _heroOnStroyRender(item:HeroDefendPlanListItem,index:number){
            let hero:Net.hero;
            if(this._plan.pets){
                for(let i=0;i<this._plan.pets.length;i++){
                    let pet=this._plan.pets[i];
                    if(pet.index==index+1){
                        hero=PetDataMgr.getPetInfo(pet.petSnID);
                    }
                }
            }
            item.showNameBol=false;
            item.setData(index,hero,this._plan.index);
        }

    }
}