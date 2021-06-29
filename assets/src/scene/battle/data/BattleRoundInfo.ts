module Pro
{
    export class BattleRoundInfo
    {
        private _unitActArr: Array<BattleUnitActionData> = [];
        public get unitActArr(): Array<BattleUnitActionData>
        {
            return this._unitActArr;
        }

        /** 回合数*/
        public round: number;
        // /** 回合开始时的状态*/
        // public states: Pb_God.PBFightUnitState[];

        private _unitStateDic: ds.StringMap<Pb_God.PBFightUnitState>

        constructor()
        {
            this._unitStateDic = new ds.StringMap<Pb_God.PBFightUnitState>();
        }

        parse(pbFightRound: Pb_God.PBFightRound)
        {
            this.round = pbFightRound.round;
            for (let index = 0; index < pbFightRound.unitacts.length; index++)
            {
                const pbFightUnitAct: Pb_God.PBFightUnitAct = pbFightRound.unitacts[index];
                var battleUnitActionData: BattleUnitActionData = new BattleUnitActionData();
                battleUnitActionData.parse(pbFightUnitAct);
                this._unitActArr.push(battleUnitActionData);
            }

            for (let index = 0; index < pbFightRound.states.length; index++)
            {
                const pBFightUnitState: Pb_God.PBFightUnitState = pbFightRound.states[index];
                this._unitStateDic.put(pBFightUnitState.unitid, pBFightUnitState);
            }
        }

        public getRoleStat(unitId: number): Pb_God.PBFightUnitState
        {
            return this._unitStateDic.get(unitId)
        }
    }
}