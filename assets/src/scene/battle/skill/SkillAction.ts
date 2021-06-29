module Pro
{
    export class SkillAction
    {

        private actionData: BattleSkillData | undefined;
        private attacker: BaseAtker
        private skillEffInfo: cfg.SkillEffectNewSkillEffectCfgInfo
        private _playCompleteCall: CallBack;
        private _isComplete: boolean;
        private _battleEffect: BaseBattleEffect;
        private _defendEffect:DefendSkillAction;
        public isYuanLing: boolean = false;
        private _behitTimes: number[];
        private _currentHurtTime: number = 0;

        private _yuanLingAttackBol: boolean = false;
        public get isComplete(): boolean
        {
            return this._isComplete;
        }
        private _batRoleMgr: BatRoleMgr;

        constructor(batRoleMgr: BatRoleMgr)
        {
            this._batRoleMgr = batRoleMgr;
        }

        public play(action: BattleSkillData, playComplete: CallBack)
        {
            this._currentHurtTime = 0;

            Laya.timer.once(30000, this, this.timeout);
            this._playCompleteCall = playComplete;
            this.actionData = action;
            this.attacker = this._batRoleMgr.getBattleRoleByServerIndex(this.actionData.attacker);

            if (this.attacker)
            {
                if (this.attacker.isWatching)
                {
                    var skillType = cfg.SkillNewSkillCfgData.getSkillTypeBySkillIndex(this.actionData.skillIndex);
                    var isShowAttact: boolean = true;
                    if (skillType == Pb_God._emSkillType.SkillType_Passive)
                    {
                        if (cfg.SkillNewSkillCfgData.isFightBack(this.actionData.skillIndex))
                        {
                            //被动技能， 但是反击要放动作


                        } else
                        {
                            isShowAttact = false;
                            SkillUtil.showFightLog("\t-------------------------------- " + this.actionData.attacker + " 放【被动】技能， 无动作  ------------------------------------------------------")
                        }
                    } else
                    {
                        SkillUtil.showFightLog("\t-------------------------------- " + this.actionData.attacker + " 放技能  ------------------------------------------------------")
                    }

                    var data = new Date(getTimer());

                    SkillUtil.showFightLog("\tattacker:", this.actionData.attacker, " target:", this.actionData.target, "  skillInde:", this.actionData.skillIndex, data.getMinutes() + "分" + data.getSeconds() + "秒");
                    var targetRole: BaseAtker = this._batRoleMgr.getBattleRoleByServerIndex(this.actionData.target);
                    var isowner: boolean = false;
                    if (targetRole == null)
                    {
                        targetRole = this.attacker
                    }
                    if (targetRole)
                    {
                        isowner = targetRole.roleData.isOwer;
                    }
                    if (isShowAttact)
                    {
                        this.skillEffInfo = cfg.SkillEffectNewSkillEffectCfgData.getSkillEffectCfg(this.actionData.skillIndex, this.attacker.roleData.skinID, this.attacker.getResourceID());//   this.getSkillEffectCfg(tmpSkillIndex,tmpIsBigSkill);
                        var clientEffectType = cfg.SkillNewSkillCfgData.getClientEffectTypeBySkillIndex(this.actionData.skillIndex)
                        // if (clientEffectType == SkillEffectType.DAN_DAO)
                        // {
                        //     this._battleEffect = new DanDaoSkill(this._batRoleMgr);
                        // }
                        // else if (clientEffectType == SkillEffectType.SHU_DAN_DAO)
                        // {
                        //     this._battleEffect = new ShuDanDaoSkill(this._batRoleMgr);
                        // }
                        // else
                        // {
                        this._battleEffect = new BattleEffect(this._batRoleMgr);
                        // }
                        this._battleEffect.on(BattleEvent.SHOW_HURT, this, this.showHurt);
                        this._battleEffect.on(BattleEvent.SHOW_SINGLE_HURT, this, this.onShowSingleHurt);
                        this._battleEffect.on(BattleEvent.PLAY_COMPLETE, this, this.onPlayComplete);
                        this._battleEffect.on(BattleEvent.ATTACK_COMPLETE, this, this.onAttackComplete);
                        // this._battleEffect.on(BattleEvent.START_PLAY, this, this.onPlayComplete);
                        this._behitTimes = this._battleEffect.showPlayAttack(this.attacker, this.actionData, isowner, targetRole);// BattleEffect.showPlayAttack( this.attacker, this.actionData.skillIndex,isowner,targetRole ,true);
                    } else
                    {
                        this.onAttackComplete();
                        this.doComplete();
                        // Laya.timer.once(100, this, this.doComplete)
                    }
                } else
                {
                    Laya.timer.once(800, this, this.noWatch)
                }
            }
            //援军
            else if(this._batRoleMgr.placeMgr.isDefend(action.attacker)){
                this.defendLogic();

            }
            else
            {

                if (action.attacker == 65636 || action.attacker == 131172)
                {
                    //神器技能， 元灵
                    this.isYuanLing = true;
                    this.artifactLogic(action.attacker == 65636);
                }
                else
                {
                    // this.showHurt();
                    this.onAttackComplete();
                    Laya.timer.once(100, this, this.doComplete)
                    // logI("没有攻击者？ 确认下")
                }




            }

        }

        onShowSingleHurt()
        {
            this.showSingleHurt();
            if (this._batRoleMgr.placeMgr.getIsWatching())
            {
                this.sharkScene();
            }
        }

        private noWatch()
        {
            this.onAttackComplete();
            this.doComplete();
        }

        private timeout()
        {
            logI("啊啊啊啊啊啊， 这么超时了， ", this.actionData.skillIndex);
            this.doComplete();
        }

        private showSingleHurt()
        {
            if (this.actionData.attackArr)
            {

                if (this._currentHurtTime < this.actionData.attackArr.length)
                {
                    let battlePlaybackHurtInfo = this.actionData.attackArr[this._currentHurtTime];
                    this._showHurtByInfo(battlePlaybackHurtInfo);
                } else
                {
                    // logI(" 没有伤害数据了， ")
                    //被动攻击且没有效果时，跳过
                    if (this.skillEffInfo && this.skillEffInfo.behitEffect)
                    {
                        let len: number = this.actionData.dstNum;
                        for (let i = 0; i < len; ++i)
                        {
                            var target = this._batRoleMgr.getBattleRoleByServerIndex(this.actionData.getDst(i));
                            //自己不会伤害自己
                            if (target && target != this.attacker)
                            {
                                SkillUtil.plauHurt(target, target.roleData.standIndex, target.roleData.isOwer);
                                logI(" 没有伤害数据了，适应攻击动画，播放受击动画 ");
                            }
                        }
                    }


                }
            }
            this._currentHurtTime++;
        }
        private _showHurtByInfo(battlePlaybackHurtInfo: BattlePlaybackHurtInfo)
        {
            if (!battlePlaybackHurtInfo) return;

            var target = this._batRoleMgr.getBattleRoleByServerIndex(this.actionData.target);
            if (battlePlaybackHurtInfo.attactInfo.hit)
            {
                var hpArr: Array<Pb_God.PBFightActionHP | BattleSkillData> = battlePlaybackHurtInfo.hpArr;
                var attactInfo: Pb_God.PBFightActionAttack = battlePlaybackHurtInfo.attactInfo;
                for (let index = 0; index < hpArr.length; index++)
                {
                    const info: Pb_God.PBFightActionHP | BattleSkillData = hpArr[index];
                    if (info instanceof Pb_God.PBFightActionHP)
                    {
                        const hpInfo: Pb_God.PBFightActionHP = info;
                        let target = this._batRoleMgr.getBattleRoleByServerIndex(hpInfo.dst);
                        if (hpInfo.hpchanged.toNumber() > 0)
                        {
                            SkillUtil.showNum(target, attactInfo, hpInfo);
                            var tmpSkillEffInfo = this.skillEffInfo;
                            let tmpBeHitEffect = this.skillEffInfo == null ? null : cfg.SkillEffectNewSkillEffectCfgData.getBehitEffAryById(this.skillEffInfo.index);
                            let tmpBeHitPos = tmpSkillEffInfo == null ? 1 : cfg.SkillEffectNewSkillEffectCfgData.getBehitPosByIndex(tmpSkillEffInfo.index);
                            if (tmpBeHitEffect)
                            {
                                // //受击效果
                                // let tmpBehitSpeedScale = Global.getNoZeroValue(cfg.SkillEffectNewSkillEffectCfgData.getBehitSpeedByIndex(tmpSkillEffInfo.skillIndex), GameConfig.EffDetalTime) / GameConfig.EffDetalTime;
                                // let tmpSkillEffectIndex = 0;
                                // //两个受击特效中，分别对应敌方与友方的受击
                                // let behitEff_DiffCamp = cfg.SkillEffectNewSkillEffectCfgData.getExtendsParamsValue(tmpSkillEffInfo.index, BatCfg.SkillEffectExtendsType.behitEff_DiffCamp)
                                // if (behitEff_DiffCamp)
                                // {
                                //     tmpSkillEffectIndex = (hpInfo != null && hpInfo.hpchanged.toNumber() > 0) ? 1 : 2;
                                // }
                                // EffectMgr.Inst.createSkillEffect(tmpSkillEffInfo.heroID, null, tmpBeHitEffect, SkillUtil.getEffPos(target, tmpBeHitPos), target.getActionFlipX() ? 1 : -1, target.actionSpeed * tmpBehitSpeedScale, target, tmpSkillEffectIndex);
                            }
                        } else
                        {


                            if (this.attacker)
                            {
                                let showHurtBol: boolean = this.attacker != target;
                                SkillUtil.showDamageHurtNum(target, attactInfo, hpInfo, this.attacker.roleData.getPetType(), this.skillEffInfo, showHurtBol);
                            } else if (this.isYuanLing)
                            {
                                let tmpArtifactInfo = this._batRoleMgr.placeMgr.getBattlePetArtifact(this.actionData.attacker == 65636);
                                if (tmpArtifactInfo)
                                {
                                    SkillUtil.showDamageHurtNum(target, attactInfo, hpInfo, tmpArtifactInfo.id, this.skillEffInfo);
                                }
                            }
                            else
                            {
                                SkillUtil.showNum(target, attactInfo, hpInfo);
                            }
                        }
                    } else
                    {
                        var subSkill = new SkillAction(this._batRoleMgr);
                        subSkill.play(info, null);
                    }
                }
            } else
            {
                EffectMgr.Inst.showBattleAttackText("res/battle/zhandou_font_shanbi.png", new Laya.Point(target.x, target.y - 75), target.roleData.getBatPlaceMgr().EffCeilLayer);
            }

        }


        private onPlayComplete()
        {
            this.doComplete();
        }

        private doComplete()
        {
            Laya.timer.clear(this, this.timeout);
            if (this._isComplete)
            {
                if (GlobalData.isRelease)
                {
                    // logE("啥情况， 已经完成了， 怎么又要完成一遍");
                } else
                {
                    // throw new Error("啥情况， 已经完成了， 怎么又要完成一遍");
                }
            } else
            {
                this._isComplete = true;
                if (this._playCompleteCall)
                {
                    this._playCompleteCall.call();
                }
                this.descory();
            }
        }

        public descory()
        {
            Laya.timer.clear(this, this.timeout);
            Laya.timer.clear(this, this.doComplete);
            Laya.timer.clearAll(this);
            if (this._battleEffect)
            {
                this._battleEffect.off(BattleEvent.SHOW_HURT, this, this.showHurt);
                this._battleEffect.off(BattleEvent.SHOW_SINGLE_HURT, this, this.showSingleHurt);
                this._battleEffect.off(BattleEvent.PLAY_COMPLETE, this, this.onPlayComplete);
                this._battleEffect.off(BattleEvent.ATTACK_COMPLETE, this, this.onAttackComplete);
                this._battleEffect.finish();
                this._battleEffect = null;
            }
            if(this._defendEffect){
                this._defendEffect.off(BattleEvent.SHOW_SINGLE_HURT, this, this.onShowSingleHurt);
                this._defendEffect.off(BattleEvent.PLAY_COMPLETE, this, this.onPlayComplete);
                this._defendEffect.off(BattleEvent.ATTACK_COMPLETE, this, this._defendEffectComp);
                this._defendEffect.finish();
                this._defendEffect=null;
                

            }
            if (this._playCompleteCall)
            {
                this._playCompleteCall = null;
            }
        }

        private onAttackComplete()
        {
            var data = new Date(getTimer());
            SkillUtil.showFightLog("\tshowHurt:", this.actionData.skillIndex, " attack:", this.actionData.attacker, "  ", data.getMinutes() + "分" + data.getSeconds() + "秒");
            if (this.actionData.attackArr.length)
            {

                if (this._currentHurtTime < this.actionData.attackArr.length)
                {
                    for (let index = this._currentHurtTime; index < this.actionData.attackArr.length; index++)
                    {
                        this.showSingleHurt();
                    }
                }


                // if (this.actionData.hurtTimes && this._currentHurtTime < this.actionData.hurtTimes) {
                //     for (let index = this._currentHurtTime; index < this.actionData.hurtTimes + 1; index++) {
                //         this.showSingleHurt();
                //     }
                // } else if (!this.actionData.hurtTimes && this._currentHurtTime < this.actionData.attackArr.length) {
                //     for (let index = this._currentHurtTime; index < this.actionData.attackArr.length; index++) {
                //         this.showSingleHurt();
                //     }
                // }



            }



            if (this.actionData.hpArr.length)
            {
                for (let index = 0; index < this.actionData.hpArr.length; index++)
                {
                    const element = this.actionData.hpArr[index];
                    var target = this._batRoleMgr.getBattleRoleByServerIndex(element.dst);
                    if (target)
                    {
                        if (this.attacker)
                        {
                            SkillUtil.showDamageHurtNum(target, null, element, this.attacker.roleData.getPetType(), this.skillEffInfo);
                        } else
                        {
                            SkillUtil.showNum(target, null, element);
                        }
                    }
                }
            }
            var buffArr: Array<Pb_God.PBFightActionBuff> = this.actionData.buffArr;
            SkillUtil.playBuff(buffArr, this._batRoleMgr);
            SkillUtil.playBuffX(this.actionData.buffXArr, this._batRoleMgr);
        }
        //-----------------------------------------------援军逻辑------------------
        private defendLogic(){
            let isOwner=this._batRoleMgr.placeMgr.defendIsOwner(this.actionData.attacker);
            this._batRoleMgr.placeMgr.setDefendSkillIndex(isOwner,this.actionData.skillIndex);

            if (this._batRoleMgr.placeMgr.getIsWatching())
            {
                var skillType = cfg.SkillNewSkillCfgData.getSkillTypeBySkillIndex(this.actionData.skillIndex);
                if (skillType == Pb_God._emSkillType.SkillType_Passive)
                {
                    this.onAttackComplete();
                    this.doComplete();
                } else
                {
                    
                    let hurtTimes:number=this.actionData.attackArr.length||1;
                    let defendSkillInfo:Pb_God.PBDefendSkill=this._batRoleMgr.placeMgr.getDefendSkinId(isOwner,this.actionData.skillIndex);
                    let skinId=cfg.PetCfgData.getBaseSkinByPetID(defendSkillInfo.petID);
                    this._defendEffect=new DefendSkillAction(isOwner,skinId,hurtTimes,this.actionData.skillIndex);
                    this._defendEffect.on(BattleEvent.SHOW_SINGLE_HURT, this, this.onShowSingleHurt);
                    this._defendEffect.on(BattleEvent.ATTACK_COMPLETE, this, this.onAttackComplete);
                    this._defendEffect.on(BattleEvent.PLAY_COMPLETE, this, this._defendEffectComp);
                    //this._batRoleMgr.placeMgr.setBGBlackAction(true);
                    this._batRoleMgr.placeMgr.DamageNumLayer.addChild(this._defendEffect);



                     EffectMgr.Inst.showBigSkillName(isOwner, skinId,this.actionData.skillIndex, this._batRoleMgr.placeMgr.UIStatueLayer,null)
                    // let totalTime=1800/BattleMgr.Inst.getActionSpeed();
                    // let times:number=totalTime/hurtTimes;
                    // Laya.timer.loop(times,this,this.showSingleHurt);
                    // Laya.timer.once(totalTime+2000, this, ()=>{
                    //     Laya.timer.clear(this,this.showSingleHurt);
                    //     this.onAttackComplete();
                    //     this.doComplete();
                    // })

                    
                }

            } else
            {
                // //播放伤害
                Laya.timer.once(1800, this, () =>
                {
                    this.onAttackComplete();
                    this.doComplete();
                });
            }




        }
        private _defendEffectComp(){
            if(this._defendEffect){
                this._defendEffect.off(BattleEvent.SHOW_SINGLE_HURT, this, this.onShowSingleHurt);
                this._defendEffect.off(BattleEvent.PLAY_COMPLETE, this, this.onPlayComplete);
                this._defendEffect.off(BattleEvent.ATTACK_COMPLETE, this, this._defendEffectComp);
                this._defendEffect=null;
                this.doComplete();
                

            }
            //this._batRoleMgr.placeMgr.setBGBlackAction(false);
            

        }

        //------------------------------------------------------战斗神器逻辑--------------------------------------------------
        /**
         * 触发一个神器
         */
        private artifactLogic(isOwner: boolean): boolean
        {
            let tmpArtifactInfo = this._batRoleMgr.placeMgr.getBattlePetArtifact(isOwner);
            if (tmpArtifactInfo == null)
            {
                this.doComplete();
                return false;
            }
            if (this._batRoleMgr.placeMgr.getIsWatching())
            {
                var skillType = cfg.SkillNewSkillCfgData.getSkillTypeBySkillIndex(this.actionData.skillIndex);
                if (skillType == Pb_God._emSkillType.SkillType_Passive)
                {
                    this.onAttackComplete();
                    this.doComplete();
                } else
                {
                    // //播放伤害
                    var delyHurtTime: number = cfg.SkillNewSpecialSkillDelayCfgData.getDelayById(tmpArtifactInfo.id)
                    Laya.timer.once(delyHurtTime, this, this.onYuanLingAttackComplete);
                    this._yuanLingAttackBol = true;

                    

                    BattleMgr.Inst.battleUI.onYuanLingRelease(isOwner);
                    Laya.timer.once(600, this, this.showYuanAni, [tmpArtifactInfo.id, isOwner])
                }

            } else
            {
                // //播放伤害
                Laya.timer.once(1800, this, () =>
                {
                    this.onAttackComplete();
                    this.doComplete();
                });
            }
        }


        onYuanLingAttackComplete()
        {
            if (this._yuanLingAttackBol)
            {
                Laya.timer.clear(this, this.onYuanLingAttackComplete);
                this.onAttackComplete();
                this._yuanLingAttackBol = false;
            }

        }

        showYuanAni(id, isOwner)
        {
            if (!this._batRoleMgr.placeMgr.getIsWatching()) return;
            var yu: YuanLingSkillAction = new YuanLingSkillAction(id, isOwner);
            yu.on(LayaEvent.COMPLETE, this, this.onYuanlingComplete)
            yu.play();
            this._batRoleMgr.placeMgr.setBGBlackAction(true);
            this._batRoleMgr.placeMgr.DamageNumLayer.addChild(yu);
        }

        private showHurt()
        {
            if (!this._batRoleMgr.placeMgr.getIsWatching()) return;
            var attackLen: number = this.actionData.attackArr.length;
            for (let index = this._currentHurtTime; index < attackLen; index++)
            {
                this.showSingleHurt();
            }
            this.actionData.attackArr.length = 0;
            this.sharkScene();

        }
        private sharkScene()
        {
            if (this.skillEffInfo && this.skillEffInfo.sharkScreen > 0)
            {
                this._batRoleMgr.placeMgr.sharkScene(this.skillEffInfo.sharkScreen);
            }
        }

        private onYuanlingComplete()
        {
            // this.onAttackComplete();
            this.onYuanLingAttackComplete()
            this._batRoleMgr.placeMgr.setBGBlackAction(false);
            this.doComplete();
        }

        public finish()
        {
            this.descory();
        }
    }
}