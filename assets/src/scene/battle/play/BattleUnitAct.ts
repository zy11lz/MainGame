module Pro
{
    /**
     * 一个玩家出手
     */
    export class BattleUnitAct
    {
        private _completeCallback: CallBack;
        private _data: BattleUnitActionData;

        private _currentSkillAction: SkillAction;
        private _batRoleMgr: BatRoleMgr;
        private _actionArr: SkillAction[] = [];

        constructor(batRoleMgr: BatRoleMgr)
        {
            this._batRoleMgr = batRoleMgr;
        }

        public play(action: BattleUnitActionData, completeCallback: CallBack)
        {
            this._data = action;
            this._completeCallback = completeCallback;
            SkillUtil.playBuff(this._data.buffArr, this._batRoleMgr);
            SkillUtil.playBuffX(this._data.buffXArr, this._batRoleMgr);
            // if (this._data.skillDataArr.length) {
            //     this.nextAction();
            // } else {
            //     this.playBuffHp();
            // }
            this.playNew();
        }

        playNew()
        {
            this.next();
        }

        next()
        {
            if (this._data.dataArr.length)
            {
                var actionData = this._data.dataArr.shift();
                if (actionData instanceof Pb_God.PBFightAction)
                {
                    var action: Pb_God.PBFightAction = actionData;
                    if (action.type == Pb_God._emFightAction.FightAction_HP)
                    {
                        const hpInfo: Pb_God.PBFightActionHP = action.actionhp
                        let target = this._batRoleMgr.getBattleRoleByServerIndex(hpInfo.dst);
                        SkillUtil.showNum(target, null, hpInfo);
                        this.next();
                    } else
                    {
                        this.next();
                    }
                } else if (actionData instanceof BattleSkillData)
                {
                    var data = this._data.skillDataArr.shift();
                    this._currentSkillAction = new SkillAction(this._batRoleMgr);
                    this._actionArr.push(this._currentSkillAction);
                    this._currentSkillAction.play(data, new CallBack(this, this.next));
                } else
                {
                    logI("未知action 类型")
                }
            } else
            {
                this.setComplete();
            }
        }

        // public nextAction() {
        //     if (this._actionArr == null) return;
        //     if (this._currentSkillAction) {
        //         this._currentSkillAction.descory();
        //         this._currentSkillAction = null;
        //     }
        //     if (this._data && this._data.skillDataArr.length) {
        //         var data = this._data.skillDataArr.shift();
        //         this._currentSkillAction = new SkillAction(this._batRoleMgr);
        //         this._actionArr.push(this._currentSkillAction);
        //         this._currentSkillAction.play(data, new CallBack(this, this.nextAction));
        //     } else {
        //         this.playBuffHp();
        //     }
        // }

        // private playBuffHp() {
        //     if (this._data.hpArr.length) {
        //         this.showHurt();
        //         Laya.timer.once(500, this, this.setComplete);
        //     } else {
        //         this.setComplete();
        //     }
        // }


        private setComplete()
        {
            if (this._completeCallback)
            {
                this.callComplete();
            }
        }

        private callComplete()
        {
            if (this._completeCallback)
            {
                this._completeCallback.call();
                this._completeCallback = null;
            }
        }

        // private showHurt() {
        //     for (let index = 0; index < this._data.hpArr.length; index++) {
        //         const hpInfo: Pb_God.PBFightActionHP = this._data.hpArr[index];
        //         let target = this._batRoleMgr.getBattleRoleByServerIndex(hpInfo.dst);
        //         SkillUtil.showNum(target, null, hpInfo);
        //     }
        // }

        finish()
        {
            if (this._actionArr)
            {
                for (let index = 0; index < this._actionArr.length; index++)
                {
                    const skillAction: SkillAction = this._actionArr[index];
                    skillAction.finish();
                }
            }
            Laya.timer.clearAll(this);
            this._actionArr.length = 0;
            this._actionArr = null;
        }
    }
}