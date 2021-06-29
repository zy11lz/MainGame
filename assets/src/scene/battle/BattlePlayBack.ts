module Pro
{


    export class BattlePlayBack
    {

        private _data: Pb_God.PBFightPlayback;
        private _roundInfoArr: Array<BattleRoundInfo> = [];
        private _batRoleMgr: BatRoleMgr;
        private _playComplete: CallBack;
        private _currentRound: BattleRound;
        private roundArr: BattleRound[] = [];
        private _friendHaveArtifactSkill: boolean;
        private _engryHaveArtifactSkill: boolean;
        private _artifactResArr: string[] = [];
        _fightBase: Pb_God.PBFightBase;
        isWin: boolean;
        private _currentRoundInfo: BattleRoundInfo
        private _batPlaceMgr: BatPlaceMgr;

        constructor(batPlaceMgr: BatPlaceMgr, value: Pb_God.PBFightBase, playComplete: CallBack)
        {
            this._playComplete = playComplete;
            this._data = value.playback;
            this._fightBase = value;
            this.isWin = this.findResult();
            this._batPlaceMgr = batPlaceMgr;
            this._batRoleMgr = this._batPlaceMgr.getRoleMgr();
            var artifactArr: Pb_God.PBGlobalArtifactDisplay = value.friend.battlepet.artifact;
            var energyArtifactArr: Pb_God.PBGlobalArtifactDisplay = value.energy.battlepet.artifact;
            this.findArtifact();
            if (this._friendHaveArtifactSkill && artifactArr)
            {
                this.addArtifact(artifactArr.id);
            }
            if (this._friendHaveArtifactSkill && energyArtifactArr)
            {
                this.addArtifact(energyArtifactArr.id)
            }
            if (this._artifactResArr.length)
            {
                ResMgr.Inst.load(this._artifactResArr, this, this.onAriftLoadComplete, null, null, ResReleaseType.Reference);
            }
        }

        onAriftLoadComplete()
        {

        }

        private addArtifact(id: number)
        {
            // logI("预加载元灵资源:" , id);
        }

        findArtifact()
        {
            for (let i = 0; i < this._data.rounds.length; i++)
            {
                var pbFightRound: Pb_God.PBFightRound = this._data.rounds[i];
                for (let j = 0; j < pbFightRound.unitacts.length; j++)
                {
                    var unit: Pb_God.PBFightUnitAct = pbFightRound.unitacts[j];
                    for (let k = 0; k < unit.actions.length; k++)
                    {
                        const action: Pb_God.PBFightAction = unit.actions[k];
                        if (action.type == Pb_God._emFightAction.FightAction_Skill)
                        {
                            var srcId = action.actionskill.src;
                            if (srcId == 65636)
                            {
                                this._friendHaveArtifactSkill = true;
                            }
                            if (srcId == 131172)
                            {
                                this._engryHaveArtifactSkill = true;
                            }
                        }
                    }
                }
            }
        }

        public findResult(): boolean
        {
            var dieDic: Object = {};
            var pbFightRound: Pb_God.PBFightRound = this._data.rounds[this._data.rounds.length - 1];
            var states: Pb_God.PBFightUnitState[] = pbFightRound.states;
            for (let index = 0; index < states.length; index++)
            {
                const fightUnitState: Pb_God.PBFightUnitState = states[index];
                if (fightUnitState.hp.toNumber() <= 0)
                {
                    dieDic[fightUnitState.unitid] = 1;
                }
            }

            for (let j = 0; j < pbFightRound.unitacts.length; j++)
            {
                var unit: Pb_God.PBFightUnitAct = pbFightRound.unitacts[j];
                for (let k = 0; k < unit.actions.length; k++)
                {
                    const action: Pb_God.PBFightAction = unit.actions[k];
                    if (action.type == Pb_God._emFightAction.FightAction_HP)
                    {
                        if (action.actionhp.hp.toNumber() <= 0)
                        {
                            dieDic[action.actionhp.dst] = 1;
                        }
                    }
                }
            }

            var isWin: boolean = true;
            if (this._fightBase.energy && this._fightBase.energy.battlepet && this._fightBase.energy.battlepet.battlepet)
            {
                var battlepetarr: Pb_God.PBBattlePetInfo[] = this._fightBase.energy.battlepet.battlepet;
                for (let index = 0; index < battlepetarr.length; index++)
                {
                    const element: Pb_God.PBBattlePetInfo = battlepetarr[index];
                    //有人没死
                    if (!dieDic.hasOwnProperty(element.unitid.toString()))
                    {
                        isWin = false;
                    }
                }
            }

            return isWin;
        }

        public startPlay(): void
        {
            for (let index = 0; index < this._data.rounds.length; index++)
            {
                const element = this._data.rounds[index];
                var battleRoundInfo: BattleRoundInfo = new BattleRoundInfo();
                battleRoundInfo.parse(element);
                this._roundInfoArr.push(battleRoundInfo);
            }
            this.nextRound();
        }

        private nextRound(): void
        {
            if (this._roundInfoArr.length)
            {
                this.playNextRound();
            } else
            {
                SkillUtil.showFightLog("战斗全部播放完成");
                this._batPlaceMgr.playWinAni();
                Laya.timer.once(2800, this, this.onPlayEnd)
            }
        }

        playNextRound()
        {
            this._currentRoundInfo = this._roundInfoArr.shift();
            SkillUtil.showFightLog("----- 第 " + this._currentRoundInfo.round + " 回合开始");
            if (this._currentRoundInfo.round > 0)
            {
                // this._batRoleMgr.role_Round_Changed(this._currentRoundInfo.round);
                this._batPlaceMgr.role_Round_Change(this._currentRoundInfo.round);
            }

            this.roundStartSyncBuffer();
            //临时监控回合数变化，可删除
            // logI("playNextRound", roundInfo.round, this._batRoleMgr.getInTrun());

            var battleRound: BattleRound = new BattleRound(this._batRoleMgr);
            this.roundArr.push(battleRound);
            battleRound.play(this._currentRoundInfo, new CallBack(this, this.onRoundPlayComplete));
        }

        roundStartSyncBuffer()
        {
            if (this._currentRoundInfo && this._batRoleMgr)
            {
                var roleList: BaseAtker[] = this._batRoleMgr.getRoleList()
                for (let index = 0; index < roleList.length; index++)
                {
                    const baseAtker: BaseAtker = roleList[index];
                    var pBFightUnitState: Pb_God.PBFightUnitState = this._currentRoundInfo.getRoleStat(baseAtker.roleData.unitId);
                    if (pBFightUnitState)
                    {
                        baseAtker.syncBeforRoundBuff(pBFightUnitState.buff);
                    }
                }
            }
        }

        onRoundPlayComplete()
        {
            this.nextRound();
        }

        onPlayEnd()
        {
            if (this._playComplete)
            {
                this._playComplete.call();
                this._playComplete = null;
            }
        }


        finish()
        {
            this._playComplete = null;
            if (this.roundArr)
            {
                for (let index = 0; index < this.roundArr.length; index++)
                {
                    const element: BattleRound = this.roundArr[index];
                    element.finish();
                }
            }
            this.roundArr = null
        }

        public getRoleStat(unitId: number): Pb_God.PBFightUnitState
        {
            if (this._currentRoundInfo)
            {
                return this._currentRoundInfo.getRoleStat(unitId);
            }
            return null;
        }

    }
}