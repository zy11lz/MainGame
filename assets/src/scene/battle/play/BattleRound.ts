module Pro
{
    /**
     * 一个大回合
     */
    export class BattleRound
    {

        private roundInfo: BattleRoundInfo;
        private _currentBattleUnitActionData: BattleUnitActionData;
        private _completeCallback: CallBack;
        private _pretime: number = 0;
        private _batRoleMgr: BatRoleMgr;
        private _actArr: BattleUnitAct[] = [];
        private _isFinished: boolean = false;

        constructor(batRoleMgr: BatRoleMgr)
        {
            this._batRoleMgr = batRoleMgr;
        }

        play(roundInfo: BattleRoundInfo, completeCallback: CallBack)
        {
            this.roundInfo = roundInfo;
            this._completeCallback = completeCallback;
            this.nextUnit();
        }

        /**
         * 下一个人出手
         */
        nextUnit()
        {
            this.checkdied();
            if (this._isFinished) return;


            if (this.roundInfo && this.roundInfo.unitActArr.length)
            {
                this._currentBattleUnitActionData = this.roundInfo.unitActArr.shift();
                this.playAction(this._currentBattleUnitActionData)
            } else
            {
                if (this._currentBattleUnitActionData)
                {
                    SkillUtil.showFightLog("\t" + this._currentBattleUnitActionData.actionId + " 出手完成");
                }
                this._completeCallback.call();
            }
        }

        checkdied()
        {
            var roleList: Array<BaseAtker> = this._batRoleMgr.getRoleList()
            for (let index = 0; index < roleList.length; index++)
            {
                const baseAtker: BaseAtker = roleList[index];
                if (baseAtker.roleData.getHp() <= 0 && baseAtker.dieStat == false)
                {
                    baseAtker.die();
                    // logI(baseAtker.roleData.unitId, "死亡状态");
                }
            }
        }

        private playAction(action: BattleUnitActionData)
        {
            this._pretime = getTimer();
            var battleUnitAct: BattleUnitAct = new BattleUnitAct(this._batRoleMgr);
            this._actArr.push(battleUnitAct);
            SkillUtil.showFightLog("");
            var data = new Date(getTimer());
            SkillUtil.showFightLog("\t ============================================");
            SkillUtil.showFightLog("\t" + action.actionId + " 开始出手", data.getMinutes() + "分" + data.getSeconds() + "秒" + data.getMilliseconds());
            battleUnitAct.play(action, new CallBack(this, this.onActionComplete));
        }

        private onActionComplete()
        {
            var subtime = getTimer() - this._pretime;
            this.nextUnit();
        }

        finish()
        {
            this._isFinished = true;
            if (this._actArr)
            {
                for (let index = 0; index < this._actArr.length; index++)
                {
                    const battleUnitAct: BattleUnitAct = this._actArr[index];
                    battleUnitAct.finish();
                }
            }
            this._actArr.length = 0;
            this._actArr = null;
        }


    }
}