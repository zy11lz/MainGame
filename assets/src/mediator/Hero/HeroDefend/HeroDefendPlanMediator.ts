module Pro {
    /**
     * 方案管理
     */
    export class HeroDefendPlanMediator extends BaseMediator implements IMediator {
        public UIPanel: ProUI.Hero.HeroDefend.HeroDefendPlanViewUI;
        private _plan:Pb_God.PBDefendPlan;

        public constructor() {
            super();


        }


        public autoLoadAtlas(): Array<any> {
            return [];
        }
        public openUI(): void {
            this.showPanel(ProUI.Hero.HeroDefend.HeroDefendPlanViewUI,1,BaseAddLayer.TopUI,true);

        }
        public closeUI(): void {
            this.closePanel();
        }
        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void {




        }
        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void {
            this.UIPanel.btn_close.onClick(this,this.closeUI);
            EventMgr.on(CmdEvent.Defend_UsePlan_Ask,this,this._refreshCurrentPlan);
            EventMgr.on(CmdEvent.Defend_UnlockPlan_Ask,this,this._refreshListPlan);
            EventMgr.on(CmdEvent.Defend_SavePlan_Ask,this,this.initUI);
            this.UIPanel.btn_locationSet.onClick(this,this._onLocationSetClick);
            this.UIPanel.btn_save.onClick(this,this._onBtnSaveClick);

        }
         /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
         public removeEvent(): void {
            EventMgr.off(CmdEvent.Defend_UsePlan_Ask,this,this._refreshCurrentPlan);
            EventMgr.off(CmdEvent.Defend_UnlockPlan_Ask,this,this._refreshListPlan);
            EventMgr.off(CmdEvent.Defend_SavePlan_Ask,this,this.initUI);

        }
        
       
        _onLocationSetClick(){
            UIManager.Inst.forceOpen(new BaseOpenUIData(Pro.PanelNotify.Open_HeroDefendLocationSet,DefendDataMgr.planIndex));
            //this.closeUI();
        }
        _onBtnSaveClick(){
            UIManager.Inst.forceOpen(new BaseOpenUIData(Pro.PanelNotify.Open_HeroDefendPlanMediator));
        }
        

        /**
         * 初始化面板ui
         */
        public initUI(): void {

            this._refreshCurrentPlan();
            this._refreshListPlan();

        }
        

        private _refreshCurrentPlan(){
            this._plan=DefendDataMgr.getCurrentPlan();
            this.UIPanel.HeroOnStory.onRefresh(4,this,this._heroOnStroyRender);

        }
        private _heroOnStroyRender(item:HeroDefendLocationSetItem,index:number){
            let hero:Net.hero;
            if(this._plan.pets){
                for(let i=0;i<this._plan.pets.length;i++){
                    let pet=this._plan.pets[i];
                    if(pet.index==index+1){
                        hero=PetDataMgr.getPetInfo(pet.petSnID);
                    }
                }
            }
            item.setData(index,hero);
        }

        private _refreshListPlan(){
            let len=DefendDataMgr.plans.length;
            let tempUpgradeAry=cfg.DefendPlanCfgData.getNeedItemAryByIndex(len+1);
            if(tempUpgradeAry.length){
                len++
                Global.setResIconWithItemID(this.UIPanel.loogTroopItem.IconImg, Pro.CfgID.ResType.Item, tempUpgradeAry[0].itemid);
                this.UIPanel.loogTroopItem.NumLb.text=Global.getItemNum(tempUpgradeAry[0].itemid).toString();
                //Global.drawItemUI(this.UIPanel.loogTroopItem, tempUpgradeAry[0], false, true, true, "#5b545b", "#f13b54");
                this.UIPanel.loogTroopItem.visible=true;
            }else{
                this.UIPanel.loogTroopItem.visible=false;
            }
            this.UIPanel.list_plan.onRefresh(len,this,this._listPlanRender)

        }
        private _listPlanRender(item:HeroDefendPlanItem,index:number){
            item.setData(index);
        }




    }
}