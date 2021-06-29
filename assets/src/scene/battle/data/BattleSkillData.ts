
module Pro
{
    export class BattleSkillData
    {

        public skillIndex: number;
        private _skillAction: Pb_God.PBFightActionSkill;
        private _hpArr: Array<Pb_God.PBFightActionHP> = [];

        private _buffXArr: Array<Pb_God.PBFightActionBuffFx> = [];
        private _buffArr: Array<Pb_God.PBFightActionBuff> = [];
        private _attackArr: Array<BattlePlaybackHurtInfo> = [];
        private _currentBattlePlaybackHurtInfo: BattlePlaybackHurtInfo;

        /**
         * 每次伤害的次数 
         * 默认时一个，值为0
        */
        //public hurtTimes:number=0;
        public dstNum:number;



        public get buffXArr(): Array<Pb_God.PBFightActionBuffFx>
        {
            return this._buffXArr;
        }

        public get hpArr(): Array<Pb_God.PBFightActionHP>
        {
            return this._hpArr;
        }

        constructor(action: Pb_God.PBFightActionSkill)
        {

            this._skillAction = action;
            this.skillIndex = action.skillindex;
             this.dstNum=action.dst.length;

            // let tmpSkillInfo = cfg.SkillNewSkillCfgData.getInfo(this.skillIndex);
            // if(tmpSkillInfo.damage){
            //     let damageArr:string[]=tmpSkillInfo.damage.split("_");
            //     if(damageArr&&damageArr.length>=4){
            //         this.hurtTimes=parseInt(damageArr[3]) ;
            //     }
                
            // }

        }
        public getDst(index:number):number{
            return this._skillAction.dst[index]||0
        }

        public get attackArr(): Array<BattlePlaybackHurtInfo>
        {
            return this._attackArr;
        }

        public get buffArr(): Array<Pb_God.PBFightActionBuff>
        {
            return this._buffArr;
        }

        addSubSkill(battleSkillData: BattleSkillData)
        {
            if (this._currentBattlePlaybackHurtInfo)
            {
                this._currentBattlePlaybackHurtInfo.addSubSkill(battleSkillData);
            }
        }

        addAction(action: Pb_God.PBFightAction)
        {
            var index = action["index"];
            if (action.type == Pb_God._emFightAction.FightAction_Skill)
            {
                if (this._skillAction != null)
                {
                    throw new Error("搞错啦， skill 在构造函数里设置")
                }
            }
            if (action.type == Pb_God._emFightAction.FightAction_Attack)
            {
                if(!action.actionattack.hit){
                    logI(" hit==============================false")
                }

                action.actionattack["index"] = index;
                this._currentBattlePlaybackHurtInfo = new BattlePlaybackHurtInfo(action.actionattack);
                this._attackArr.push(this._currentBattlePlaybackHurtInfo);
            }
            else if (action.type == Pb_God._emFightAction.FightAction_HP)
            {
                action.actionhp["index"] = index;
                if (this._currentBattlePlaybackHurtInfo)
                {
                    this._currentBattlePlaybackHurtInfo.addHpInfo(action.actionhp);
                } else
                {
                    this._hpArr.push(action.actionhp)
                    // logI("当前没有_currentBattlePlaybackHurtInfo")
                }
            }
            else if (action.type == Pb_God._emFightAction.FightAction_Buff)
            {
                action.actionbuff["index"] = index;
                this._buffArr.push(action.actionbuff);
            }

            else if (action.type == Pb_God._emFightAction.FightAction_BuffFx)
            {
                action.actionbufffx["index"] = index;
                this._buffXArr.push(action.actionbufffx);
            }
            else if (action.type == Pb_God._emFightAction.FightAction_SkillEnd)
            {
                // this._skillEnd = index;
            }
        }

        public get target(): number
        {
            var target: number = -1;
            if (this._skillAction && this._skillAction.dst && this._skillAction.dst.length)
            {
                target = this._skillAction.dst[0];
            } else
            {
                if (this._attackArr && this._attackArr.length)
                {
                    target = this._attackArr[0].attactInfo.dst;
                } else if (this._buffArr && this._buffArr.length)
                {
                    target = this._buffArr[0].dst;
                }
                else if (this._hpArr && this._hpArr.length)
                {
                    target = this._hpArr[0].dst;
                }
            }
            return target;
        }

        public get attacker(): number
        {
            var target: number = -1;
            if (this._skillAction)
            {
                target = this._skillAction.src;
            } else
            {
                if (this._attackArr && this._attackArr.length)
                {
                    target = this._attackArr[0].attactInfo.src;
                } else if (this._buffArr && this._buffArr.length)
                {
                    target = this._buffArr[0].src;
                }
                else if (this._hpArr && this._hpArr.length)
                {
                    target = this._hpArr[0].src;
                }
            }
            return target;
        }
        public isDstAttaker(uinitId:number):boolean{
            if(this._skillAction.dst.indexOf(uinitId)!=-1){
                return true;
            }
            return uinitId==this._skillAction.src;
        }





    }

}