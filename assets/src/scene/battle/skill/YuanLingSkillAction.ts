module Pro
{
    export class YuanLingSkillAction extends Laya.Box
    {
        _yunlingId: number;
        private _skillNameBg: SkeletonPlayer;
        private _skillRole: SkeletonPlayer;
        private _skillHit: SkeletonPlayer;

        _isOwner: boolean;

        private _offY = [100, 100, 0, 0, 0]

        constructor(yunlingId: number, isOwner: boolean)
        {
            super();
            this._isOwner = isOwner;
            this._yunlingId = yunlingId;
            this.width = GameConfig.curWidth();
            this.x = this.width >> 1;
            this.anchorX = 0.5
            this.scaleX = isOwner ? 1 : -1;
            // this._yunlingId = 1;
        }

        public play()
        {
            this.showSkillName();
            this.playSound();
        }

        private playSound()
        {
            SoundMgr.Inst().playSound("Elves_skill_" + this._yunlingId);
        }


        private showSkillName()
        {
            if (this._skillNameBg == null)
            {
                this._skillNameBg = new SkeletonPlayer();
                this._skillRole = new SkeletonPlayer();
            }

            this._skillNameBg.setRes(UrlMgr.getSpineSceneUrl("tutengdazhao/" + this._yunlingId))
            this._skillRole.setRes(UrlMgr.getSpineSceneUrl("tuteng/" + this._yunlingId + "/" + this._yunlingId));

            this._skillNameBg.playByIndex(0, false);
            this._skillRole.playByIndex(0, true);
            this._skillNameBg.on(Laya.Event.STOPPED, this, this.onSkillNameComplete)

            this._skillNameBg.x = GameConfig.curWidth() / 2;
            this._skillNameBg.y = Global.getHeroStandPos(12, !this._isOwner).y;

            this._skillRole.scale(0.8, 0.8);
            this._skillRole.x = -200;
            this._skillRole.y = 820 + this._offY[this._yunlingId - 1];
            Laya.Tween.to(this._skillRole, { x: 400 }, 300, Laya.Ease.strongIn)
            this.addChild(this._skillNameBg);
            this.addChild(this._skillRole);

        }

        private onSkillNameComplete()
        {
            EventMgr.trigger(EventNotify.Battle_YuanLing_Complete, this._isOwner);

            this._skillNameBg.releaseSkel();
            this._skillRole.releaseSkel();
            this._skillNameBg = null;
            this._skillRole = null;



            if (!this._skillHit)
            {
                this._skillHit = new SkeletonPlayer();

            }
            this._skillHit.setRes(UrlMgr.getYuanLingSkillUrl(this._yunlingId.toString()));
            this._skillHit.on(Laya.Event.STOPPED, this, this.onSkillPlayComplete);

            this._skillHit.y = Global.getHeroStandPos(12, !this._isOwner).y;
            if (this._yunlingId == 4 || this._yunlingId == 5)
            {
                this._skillHit.x = Global.getHeroStandPos(2, !this._isOwner).x
            } else
            {
                this._skillHit.x = GameConfig.curWidth() / 2;
            }


            this.addChild(this._skillHit);
            this._skillHit.playByIndex(0, false);
        }


        private onSkillPlayComplete()
        {
            this._skillHit.releaseSkel();
            this._skillHit = null;

            this.removeSelf();
            this.event(LayaEvent.COMPLETE);

        }
    }
}