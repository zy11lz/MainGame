module Pro
{
    export class BattleEffect extends BaseBattleEffect
    {

        constructor(batRoleMgr: BatRoleMgr)
        {
            super(batRoleMgr);
        }

        doMoveEnd()
        {
            this.showCastEffect();
            this.playAttactAction();
            if (this.flyActionAry)
            {
                this.showFlyBullet(this.flyActionAry);
            } else
            {
                if (GlobalData.isUseWebgl)
                {
                    if (this.beHitInfo.beHitTimes.length == 1)
                    {
                        Laya.timer.once(this.beHitInfo.beHitTimes[0], this, this.showHurt, [], false);

                    } else
                    {
                        for (let index = 0; index < this.beHitInfo.beHitTimes.length; index++)
                        {
                            const element = this.beHitInfo.beHitTimes[index];
                            Laya.timer.once(element, this, this.showSingleHurt, [], false);
                        }
                    }
                }else{
                    this.attacker.on(Laya.Event.LABEL, this, this.skeletonLabelEvent);
                }
            }
        }

        skeletonLabelEvent(e)
        {
            if(this._isSkinSKill2EndBol)return;
            
            // logI("BattleEffect======" + e.intValue + ": " + e.name);
            if (e.name == "999999")
            {
                this.showHurt();
            }else if(this.beHitInfo.beHitTimes.length>0){
                this.showSingleHurt();
            }
        }

        finish()
        {
            super.finish();
            if (this.attacker )
            {
                this.attacker.off(Laya.Event.LABEL, this, this.skeletonLabelEvent);
            }
        }











    }
}
