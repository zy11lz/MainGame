module Pro
{

    export class DefendSkillAction extends Laya.Box
    {


        private _isOwner: boolean;
        private _skinId: number;
        private _skillIndex: number;
        private _skillRole: SkeletonPlayer;
        /**受击的次数 */
        private _hurtTimes: number

        private effName = "DefendSkillUI";
        private tmpUI: ProUI.Scene.Battle.Effect.DefendSkillUI;

        private _backMat: Array<number> = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ]
        private _backFilters: Laya.ColorFilter[] = [new Laya.ColorFilter(this._backMat)];


        constructor(isOwner: boolean, skinID: number, hurtTimes: number, skillIndex: number)
        {
            super();

            this._isOwner = isOwner;
            this._skinId = skinID;
            this._skillIndex = skillIndex;
            this._hurtTimes = hurtTimes;
            let tmpW = GameConfig.curWidth();
            this.x = tmpW >> 1;
            let tmpH = GameConfig.curHeight();
            this.y = tmpH >> 1;

        }
        onAwake()
        {
            this._skillRole = new SkeletonPlayer();
            this._skillRole.play("standby_loop", true);
            this._skillRole.on(Laya.Event.START, this, this._skelStart);

            let info = cfg.PetSkinCfgData.getInfo(this._skinId);


            var skResName = info.skelName;// SkResMapping.getSkResByResId(this.resoureID)
            let tmpActionResPath = UrlMgr.getModelSkUrl(skResName);
            this._skillRole.setRes(tmpActionResPath);
            this._skillRole.y = info.detalHeight * 0.5;

            this._skillRole.scale(this._isOwner ? 1 * info.fightScale : -1 * info.fightScale, info.fightScale);

            Laya.timer.once(20000, this, this._onAlphaFinish);

        }

        private _skelStart()
        {
            this.alpha = 1;
            let speed = BattleMgr.Inst.getActionSpeed()
            this._skillRole.playbackRate(speed);

            this.tmpUI = Public.PoolMgr.getItem(this.effName);
            if (this.tmpUI == null)
            {
                this.tmpUI = new ProUI.Scene.Battle.Effect.DefendSkillUI();
            }
            this.tmpUI.lbl_name.text = cfg.SkillNewSkillCfgData.getNameBySkillIndex(this._skillIndex);
            this.addChild(this.tmpUI);
            this.tmpUI.addChildAt(this._skillRole, 1);
            this.tmpUI.img_bg.rotation = 0;


            let totalTime = 2000 / speed;
            let times: number = totalTime / this._hurtTimes;


            let rotationT: number = 360 * speed;
            rotationT = this._isOwner ? rotationT * -1 : rotationT


            Laya.Tween.to(this.tmpUI.img_bg, { rotation: rotationT }, totalTime + 1000 / speed)

            Laya.timer.loop(times, this, this._showSingleHurt);
            Laya.timer.once(totalTime, this, () =>
            {
                Laya.Tween.to(this, { alpha: 0 }, 1000 / speed, null, Laya.Handler.create(this, this._onAlphaFinish, null, true))
            });


        }

        _onAlphaFinish()
        {
            //return;
            Laya.timer.clearAll(this);
            this._onAttackComplete();
            this._doComplete();
            this._clear();
        }

        public finish()
        {
            Laya.timer.clearAll(this);
            this._clear();

        }


        private _showSingleHurt()
        {
            this._hurtTimes--;
            if (this._hurtTimes <= 0)
            {
                Laya.timer.clear(this, this._showSingleHurt);
            }
            this.event(BattleEvent.SHOW_SINGLE_HURT);
        }

        private _onAttackComplete()
        {
            this.event(BattleEvent.ATTACK_COMPLETE);

        }
        private _doComplete()
        {
            this.event(BattleEvent.PLAY_COMPLETE);
        }
        private _clear()
        {
            if (this._skillRole)
            {
                this._skillRole.off(Laya.Event.START, this, this._skelStart);
                this._skillRole.releaseSkel();
                this._skillRole = null;
            }
            if (this.tmpUI)
            {
                this.tmpUI.removeSelf();
                Public.PoolMgr.recoverItem(this.effName, this.tmpUI);
                this.tmpUI = null;
            }
            this.removeSelf();


        }







    }


}