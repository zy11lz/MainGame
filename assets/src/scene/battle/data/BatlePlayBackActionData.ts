module Pro
{
    export class BatlePlayBackActionData
    {
        private _attacker: number = -1;

        public skillIndex: number;
        private _skillAction: Pb_God.PBFightActionSkill;
        private _attackArr: Array<BattlePlaybackHurtInfo> = [];

        private _hpArr: Array<Pb_God.PBFightActionHP> = [];
        private _skillEnd;

        public get attackArr(): Array<BattlePlaybackHurtInfo>
        {
            return this._attackArr;
        }

        private _buffArr: Array<Pb_God.PBFightActionBuff> = [];

        private _preBuffArr: Array<Pb_God.PBFightActionBuff> = [];
        private _isSkillBegin: boolean;
        private _currentBattlePlaybackHurtInfo: BattlePlaybackHurtInfo;

        public get preBuffArr(): Array<Pb_God.PBFightActionBuff>
        {
            return this._preBuffArr;
        }

        public get buffArr(): Array<Pb_God.PBFightActionBuff>
        {
            return this._buffArr;
        }

        constructor()
        {

        }

        public addAction(action: Pb_God.PBFightAction)
        {
            var index = action["index"];
            if (action.type == Pb_God._emFightAction.FightAction_Skill)
            {
                if (this._skillAction != null)
                {
                    logE("技能嵌套暂未实现");
                }
                this._isSkillBegin = true;
                this._skillAction = action.actionskill;
                this._attacker = this._skillAction.src;
                this.skillIndex = this._skillAction.skillindex;
                action.actionskill["index"] = index;
            }
            if (action.type == Pb_God._emFightAction.FightAction_Attack)
            {
                action.actionattack["index"] = index;
                this._currentBattlePlaybackHurtInfo = new BattlePlaybackHurtInfo(action.actionattack);
                this._attackArr.push(this._currentBattlePlaybackHurtInfo);
            }
            if (action.type == Pb_God._emFightAction.FightAction_HP)
            {
                action.actionhp["index"] = index;
                if (this._currentBattlePlaybackHurtInfo)
                {
                    this._currentBattlePlaybackHurtInfo.addHpInfo(action.actionhp);
                } else
                {
                    this._hpArr.push(action.actionhp)
                    logI("当前没有_currentBattlePlaybackHurtInfo")
                }
            }
            if (action.type == Pb_God._emFightAction.FightAction_Buff)
            {
                action.actionbuff["index"] = index;
                if (this._isSkillBegin)
                {
                    this._buffArr.push(action.actionbuff);
                } else
                {
                    this._preBuffArr.push(action.actionbuff);
                }
            }

            if (action.type == Pb_God._emFightAction.FightAction_SkillEnd)
            {
                this._skillEnd = index;
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
            if (this._skillAction && this._skillAction.dst && this._skillAction.dst.length)
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

    }
}