module Pro
{
    /**
     * 多段伤害的弹道技能（打同一个目标）
     */
    export class MulitHurtFlySkill
    {
        private attacker: BaseAtker;
        private skillEffInfo: cfg.SkillEffectNewSkillEffectCfgInfo;
        private tmpSkillEffect: cfg.SkillEffectInfo;
        private _singleHurtCall: CallBack;
        private _completeCall: CallBack;
        private _bulletCnt: number = 0;
        private _bulletCompleteCnt: number = 0;

        constructor(flyActionAry: Array<FlyBulletInfo>, attacker: BaseAtker, skillEffInfo: cfg.SkillEffectNewSkillEffectCfgInfo, tmpSkillEffect: cfg.SkillEffectInfo,
            singleHurtCall: CallBack, completeCall: CallBack)
        {
            this._singleHurtCall = singleHurtCall;
            this._completeCall = completeCall;
            this.skillEffInfo = skillEffInfo;
            this.attacker = attacker;
            this.tmpSkillEffect = tmpSkillEffect;
            this._bulletCnt = flyActionAry.length;
            Laya.timer.once(1000, this, this.doComplete);
        }

        onFlyComplete(index: number): void
        {
            this._bulletCompleteCnt++;
            // logI("onFlyComplete:", this._bulletCompleteCnt);
            this._singleHurtCall.call();
            if (this._bulletCompleteCnt >= this._bulletCnt)
            {
                // logI("all complete");
                this.doComplete();
            }
        }

        doComplete()
        {
            this._completeCall.call();
        }

        public finis()
        {
            // logI("finis---------",this["$_GID"])
            Laya.timer.clearAll(this);
        }
    }
}