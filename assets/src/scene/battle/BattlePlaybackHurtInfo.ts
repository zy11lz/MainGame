module Pro
{
    export class BattlePlaybackHurtInfo
    {
        public attactInfo: Pb_God.PBFightActionAttack;
        public hpArr: Array<Pb_God.PBFightActionHP | BattleSkillData> = [];
        constructor(attactInfo: Pb_God.PBFightActionAttack)
        {
            this.attactInfo = attactInfo;
        }

        public addHpInfo(info: Pb_God.PBFightActionHP): void
        {
            this.hpArr.push(info);
        }

        addSubSkill(battleSkillData: BattleSkillData)
        {
            this.hpArr.push(battleSkillData);
        }
    }
}