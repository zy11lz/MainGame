
module Pro {
    export class BattleSkillItem extends ProUI.Scene.Battle.item.BattleSkillItemUI {

        public _data: any;

        /**
         * 类型 0：没有开启，1：已开启但还没有放入精灵，2：已经放有精灵
         */
        public type: number = 0;

        private _info: cfg.DefendSlotCfgInfo;

        public showNameBol: boolean = true;

        private _skillInfo: Pb_God.PBSkillInfo;

        /**槽位 */
        private _slot: number = 1;

        private roundDic: any;

        private placeMgr:BatPlaceMgr;
        /**冷却回合数 */
        private coolingRound:number;

        private isOnwer:boolean;


        onAwake() {
            this.itemUI.mouseEnabled = false;

        }
        onEnable() {
            EventMgr.on(EventNotify.Battle_Round_Change, this, this._roundChange);
        }
        onDisable() {
            EventMgr.off(EventNotify.Battle_Round_Change, this, this._roundChange);
            this._skillInfo = null;
        }

        _roundChange(bat: BatPlaceMgr) {
            if (!this._skillInfo) return;



        }

        public setData(index: number, defend: Pb_God.PBGlobalDefendDisplay, tempMgr: BatPlaceMgr,isOnwer:boolean) {
            this.isOnwer=isOnwer;
            this.placeMgr=tempMgr;
            this._slot = index + 1;
            this._skillInfo = null;
            for (let i = 0; i < defend.skills.length; i++) {
                if (defend.skills[i].index == this._slot) {
                    this._skillInfo = defend.skills[i].skill;
                    break;
                }
            }

            this._info = cfg.DefendSlotCfgData.getInfo(index + 1);
            let isOpen: boolean = defend.rank >= this._info.rank && defend.level >= this._info.level;
            this.itemUI.name = index.toString();
            if (!isOpen) {
                this.type = 0;

            } else {
                this.type = 1;
                if (this._skillInfo) {
                    Global.setSkilItem(this.itemUI, this._skillInfo.skillid, this._skillInfo.skilllevel, true);
                    //let skillInfo2=cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(skillInfo.skillid, skillInfo.skilllevel);
                    //this.lbl_name.text=skillInfo.name;
                    this.type = 2;
                }
            }
            switch (this.type) {
                case 0:
                    this.img_lock.visible = true;
                    this.itemUI.visible = false;

                    break;
                case 1:
                    this.img_lock.visible = false;
                    this.itemUI.visible = false;

                    break;
                case 2:
                    this.itemUI.visible = true;
                    let tmpSkillInfo = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(this._skillInfo.skillid, this._skillInfo.skilllevel);
                    let skillIndex=tmpSkillInfo.skillIndex;
                    //技能冷却描述
                    let tmpCoolingInfo = cfg.SkillNewSkillCfgData.getCoolRoundInfoByIndex(skillIndex);
                    //let tmpStartRound = tmpCoolingInfo.length > 0 ? tmpCoolingInfo[0] : 0;
                    this.coolingRound = tmpCoolingInfo.length > 1 ? tmpCoolingInfo[1] : 0;

                    break;
            }

           
            
            this.img_mask.visible=false;
            

            this.refresh();
        }
        public refresh(){
            if(this.type != 2)return;

            let round=this.placeMgr.getInTrun();
            let tmpStartRound:number=this.isOnwer?this.placeMgr.defendSelfCd[this._slot]:this.placeMgr.defendEnemyCd[this._slot];
            if(!tmpStartRound){
                this.img_mask.visible=false;
                return;
            }
            let roundCount=this.coolingRound-(round-tmpStartRound);
            if(roundCount<=0){
                this.img_mask.visible=false;
            }else{
                this.img_mask.visible=true;
                this.lbl_time.text=roundCount.toString();
            }
        }

        











    }



}