
module Pro
{
    export class BattleUnitActionData
    {
        private _skillDataArr: Array<BattleSkillData> = [];

        public dataArr: any[] = [];
        public actionId: number;
        private _hpArr: Array<Pb_God.PBFightActionHP> = [];
        private _buffArr: Array<Pb_God.PBFightActionBuff> = [];
        private _buffXArr: Array<Pb_God.PBFightActionBuffFx> = [];

        public get skillDataArr(): Array<BattleSkillData>
        {
            return this._skillDataArr;
        }
        public get buffXArr(): Array<Pb_God.PBFightActionBuffFx>
        {
            return this._buffXArr;
        }

        constructor()
        {

        }

        public get buffArr(): Array<Pb_God.PBFightActionBuff>
        {
            return this._buffArr;
        }

        public get hpArr(): Array<Pb_God.PBFightActionHP>
        {
            return this._hpArr;
        }

        parse(element: Pb_God.PBFightUnitAct)
        {
            this.actionId = element.id;
            this.parseAction(element.actions);
        }


        private parseAction(actionArr: Array<Pb_God.PBFightAction>): void
        {
            var battleSkillData: BattleSkillData;
            var subBattleSkillData: BattleSkillData;
            for (let index = 0; index < actionArr.length; index++) 
            {
                var action: Pb_God.PBFightAction = actionArr[index];
                action["index"] = index;
                if (action.type == Pb_God._emFightAction.FightAction_SkillEnd)
                {
                    if (subBattleSkillData != null)
                    {
                        subBattleSkillData = null;
                    } else if (battleSkillData != null)
                    {
                        battleSkillData = null;
                    }
                } else
                {
                    if (action.type == Pb_God._emFightAction.FightAction_Skill)
                    {
                        if (battleSkillData)
                        {
                            if (subBattleSkillData != null)
                            {
                                logE("警告不支持多层嵌套！");
                            }
                            subBattleSkillData = new BattleSkillData(action.actionskill);
                            battleSkillData.addSubSkill(subBattleSkillData);
                            // this.skillDataArr.push(subBattleSkillData);
                            // this.dataArr.push(subBattleSkillData);
                        } else
                        {
                            if (battleSkillData == null)
                            {
                               




                                battleSkillData = new BattleSkillData(action.actionskill);
                                this.skillDataArr.push(battleSkillData);
                                this.dataArr.push(battleSkillData);
                            }
                        }
                    } else
                    {
                        if (subBattleSkillData != null)
                        {
                            subBattleSkillData.addAction(action);
                        } else if (battleSkillData != null)
                        {
                            battleSkillData.addAction(action);
                        } else
                        {
                            this.addAction(action);
                        }
                    }
                }
            }
        }

        addAction(action: Pb_God.PBFightAction)
        {
            var index = action["index"];
            if (action.type == Pb_God._emFightAction.FightAction_HP)
            {
                action.actionhp["index"] = index;
                this._hpArr.push(action.actionhp);
            }
            else if (action.type == Pb_God._emFightAction.FightAction_Buff)
            {
                action.actionbuff["index"] = index;
                this._buffArr.push(action.actionbuff);
            } else if (action.type == Pb_God._emFightAction.FightAction_BuffFx)
            {
                action.actionbufffx["index"] = index;
                this._buffXArr.push(action.actionbufffx);
            }
            else
            {
                logI("为解析类型：", action.type)
            }
            this.dataArr.push(action);
        }

    }
}