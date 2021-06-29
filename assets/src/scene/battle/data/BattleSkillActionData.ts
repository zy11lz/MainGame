module Pro  
{
    export class BattleSkillActionData
    {
        private _attackAction: Pb_God.PBFightAction;
        constructor(attackAction: Pb_God.PBFightAction)
        {
            this._attackAction = attackAction;
        }
    }
}