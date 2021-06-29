module Pro
{
    export class BaseBattleEffect extends EventDispatcher
    {
        protected skillEffCfgInfo: cfg.SkillEffectNewSkillEffectCfgInfo
        protected skillIndex: number;
        protected attacker: BaseAtker;

        protected darkScreenNum: number = 0;//: skillEffInfo.darkScreen; // cfg.SkillEffectNewSkillEffectCfgData.getDarkScreenByIndex(tmpSkillEffInfo.index);
        protected actionName = "attack";// : skillEffInfo.castingAction; //cfg.SkillEffectNewSkillEffectCfgData.getCastingActionByIndex(tmpSkillEffInfo.index);
        protected actionSpeed = 0;//: skillEffInfo.animationSpeed; // cfg.SkillEffectNewSkillEffectCfgData.getAnimationSpeedByIndex(tmpSkillEffInfo.index);

        protected skillEffect: cfg.SkillEffectInfo = null;
        protected castPos: BatCfg.SkillCastPos = BatCfg.SkillCastPos.ParaFront;// 2;

        protected flyActionAry: Array<FlyBulletInfo>;
        protected targetRole: BaseAtker;

        protected actionStatue;

        protected beHiterIsOwner: boolean;
        protected skillEffectTime: number;
        protected standOldPos: Laya.Point;

        protected mulitHurtFlySkill: MulitHurtFlySkill;
        protected beHitInfo: BeHitInfo;
        protected battleSkillData: BattleSkillData;

        protected _batRoleMgr: BatRoleMgr;

        /**大招跳过 */
        //是不是大招
        private _isSkill2Bol: boolean = false;
        //大招开始时间
        private _skill2StartTime: number;
        //跳过大招的持续时间5秒
        private _skill2Duration: number = 5000;
        //大招的攻击事件次数
        private _skillLableEventCount: number;
        //大招已经播放的次数
        protected _currentLableEventCount: number = 0;
        /**跳过大招中**/
        protected _isSkinSKill2EndBol: boolean = false;
        /**跳过大招的飘血时间间隔 */
        private _skinSkill2HurtTime: number = 100;

        private get skill2Duration(): number
        {
            return this._skill2Duration / BattleMgr.Inst.getActionSpeed();
        }



        constructor(batRoleMgr: BatRoleMgr)
        {
            super();
            this._batRoleMgr = batRoleMgr;
            this._addEvent();
        }
        private _addEvent()
        {
            EventMgr.on(EventNotify.Battle_Skin_Skill2, this, this._listenerSkinSkill2);
        }
        private _removeEvent()
        {
            EventMgr.off(EventNotify.Battle_Skin_Skill2, this, this._listenerSkinSkill2);
        }




        // showSkillName  --> move -> moveEnd--->showeffect
        /** 攻击动画 */
        public showPlayAttack(attacker: BaseAtker, battleSkillData: BattleSkillData, beHiterIsOwner: boolean, targetRole: BaseAtker): Array<number>
        {
            this.skillIndex = battleSkillData.skillIndex;
            this.battleSkillData = battleSkillData;
            this.beHiterIsOwner = beHiterIsOwner;
            this.attacker = attacker;
            this.targetRole = targetRole;
            // let isBigSkill = cfg.SkillNewSkillCfgData.isBigSkill(skillIndex);
            this.standOldPos = Global.getHeroStandPos(attacker.roleData.standIndex, attacker.roleData.isOwer);
            //当前技能被限制，无法发起真实攻击
            if (this.skillIndex == -1 || targetRole == null)
            {
                attacker.roleData.getBatRoleMgr().role_Turn_Finish(false, false);
                return;
            }
            this.initSkillEffectInfo();
            //如果对位目标是我方，就站立不动
            if (attacker.roleData.isOwer == targetRole.roleData.isOwer)
            {
                this.castPos = BatCfg.SkillCastPos.StandStay;
            }



            //本次技能动作
            let actionExTime = Global.getNoZeroValue(this.actionSpeed, GameConfig.EffDetalTime);
            this.actionStatue = RoleActionStatue.getAction(this.actionName);
            //本次技能效果时长(考虑到角色释放技能效果时间内回退到站立点的时间)
            this.skillEffectTime = attacker.getActionTime(this.actionStatue, actionExTime);
            if (this.skillEffect != null)
            {
                this.skillEffectTime = Math.max(this.skillEffectTime, this.skillEffect.getDuration() / attacker.actionSpeed);
            }

            //
            this._skillLableEventCount = this.battleSkillData.attackArr.length;

            //---------------------整体动作时间控制
            //获取本次子弹武器以及受击时间点
            this.beHitInfo = new BeHitInfo(attacker, this.actionStatue, actionExTime, targetRole, this.skillEffCfgInfo);// this.getBeHitInfoAndWeaponInfo(attacker, this.actionStatue, actionExTime, timeShowAction, targetRole, this.skillEffCfgInfo);
            this.flyActionAry = this.beHitInfo.flyActionAry;// hitAndWepInfo[0] as Array<Array<any>>;
            let beHitTimes = this.beHitInfo.beHitTimes;// hitAndWepInfo[1] as Array<number>;
            //主角发起移动动画(非大招)
            if (attacker.isWatching)
            {
                this.showSkillName(this.skillIndex, attacker, null);
                this.onShowSkillNameComplete();
            } else
            {
                this.moveBackComplete();
            }
            return beHitTimes;
        }



        /**
        * 显示大招的技能名字
        * @param skillIndex
        * @param attacker
        */
        private showSkillName(skillIndex: number, attacker: BaseAtker, callBack: CallBack)
        {
            let isBigSkill = cfg.SkillNewSkillCfgData.isBigSkill(skillIndex);
            if (isBigSkill)
            {
                EffectMgr.Inst.showBigSkillName(attacker.roleData.isOwer, attacker.roleData.skinID, skillIndex, attacker.roleData.getBatPlaceMgr().UIStatueLayer, callBack);
            } else
            {
                // callBack.call();
            }
        }

        initSkillEffectInfo()
        {
            //获取技能特效数据
            this.skillEffCfgInfo = cfg.SkillEffectNewSkillEffectCfgData.getSkillEffectCfg(this.skillIndex, this.attacker.roleData.skinID, this.attacker.getResourceID());//   this.getSkillEffectCfg(tmpSkillIndex,tmpIsBigSkill);
            if (this.skillEffCfgInfo)
            {
                this.skillEffect = cfg.SkillEffectNewSkillEffectCfgData.getSkillEffInfoAryById(this.skillEffCfgInfo.index);
                this.castPos = this.skillEffCfgInfo.castPos; // cfg.SkillEffectNewSkillEffectCfgData.getCastPosByIndex(tmpSkillEffInfo.index);
                this.darkScreenNum = this.skillEffCfgInfo.darkScreen; // cfg.SkillEffectNewSkillEffectCfgData.getDarkScreenByIndex(tmpSkillEffInfo.index);
                this.actionName = this.skillEffCfgInfo.castingAction; //cfg.SkillEffectNewSkillEffectCfgData.getCastingActionByIndex(tmpSkillEffInfo.index);
                if (this.actionName == null || this.actionName == "")
                {
                    this.actionName = "attack";
                }
                this.actionSpeed = this.skillEffCfgInfo.animationSpeed; // cfg.SkillEffectNewSkillEffectCfgData.getAnimationSpeedByIndex(tmpSkillEffInfo.index);
            }
        }

        onShowSkillNameComplete(): void
        {
            if (this.attacker)
            {

                this.darkScreen(this.darkScreenNum, this.attacker)
                //显示层级提高
                this.attacker["specailZOrder"] = 1;
                this.move();
            } else
            {
                this.dispathComplete();
            }

        }

        move()
        {
            if (this.castPos == BatCfg.SkillCastPos.StandStay)
            {
                this.moveEnd();
            } else
            {
                let timeMove = 150 / this.attacker.actionSpeed;
                let tmpCastPostion = SkillUtil.getCastingActionPosition(this.attacker, this.targetRole, this.castPos);
                var offsetPoint = null;
                if (this.skillEffCfgInfo)
                {
                    offsetPoint = cfg.SkillEffectNewSkillEffectCfgData.getRoleAttactOffsetPoint(this.skillEffCfgInfo.index);
                    let fightScale: number = this.attacker.fightScale;
                    if (this.attacker.roleData.isOwer)
                    {
                        tmpCastPostion.x += offsetPoint.x * fightScale;
                        tmpCastPostion.y += offsetPoint.y * fightScale;
                    } else
                    {
                        tmpCastPostion.x -= offsetPoint.x * fightScale;
                        tmpCastPostion.y -= offsetPoint.y * fightScale;
                    }
                }
                Laya.Tween.to(this.attacker, { x: tmpCastPostion.x, y: tmpCastPostion.y }, timeMove, Laya.Ease.linearIn, Laya.Handler.create(this, this.moveEnd));
            }
        }

        moveEnd()
        {
            this.doMoveEnd();

            this.attackStartIndexSet();
        }


        private attackStartIndexSet()
        {
            let baseAtkerArr: BaseAtker[] = this._batRoleMgr.getRoleList();
            baseAtkerArr.sort(this.baseAtkerSortFuc.bind(this));
            let upAtkerArr: BaseAtker[];
            let upAtker: BaseAtker;
            this._isSkill2Bol = false;
            if (this.skillEffCfgInfo && this.skillEffCfgInfo.skillIndex == 3)
            {
                upAtkerArr = [];
                for (let i = 0; i < baseAtkerArr.length; ++i)
                {
                    if (this.battleSkillData.isDstAttaker(baseAtkerArr[i].roleData.unitId))
                    {
                        if (this.attacker == baseAtkerArr[i] && this.skillEffCfgInfo.castingAction == "skill2")
                        {
                            continue;
                        }
                        upAtkerArr.push(baseAtkerArr[i]);
                    }
                }
                //大招时动画放到最上层
                if (this.skillEffCfgInfo.castingAction == "skill2")
                {
                    upAtker = this.attacker;

                    this._skill2StartTime = TimeController.currTimer;
                    this._isSkill2Bol = true;
                    this._listenerSkinSkill2();

                }
            }
            this._batRoleMgr.placeMgr.resetRoleListIndex(baseAtkerArr, upAtkerArr, upAtker);
        }
        private baseAtkerSortFuc(a: BaseAtker, b: BaseAtker): number
        {
            if (a.y < b.y) { return -1; }
            if (a.y > b.y) { return 1; }
            if (a == this.attacker) { return 1; }
            if (b == this.attacker) { return -1; }

            return a.roleData.serverStandIndex > b.roleData.serverStandIndex ? 1 : -1

            // if(this.beHiterIsOwner){
            //     return a.x<b.x?1:-1
            // }
            // return a.x<b.x?-1:1
        }
        private attackEndIndexSet()
        {
            let baseAtkerArr: BaseAtker[] = this._batRoleMgr.getRoleList();
            baseAtkerArr.sort(this.baseAtkerEndSortFuc.bind(this));
            this._batRoleMgr.placeMgr.resetRoleListIndex(baseAtkerArr);
        }
        private baseAtkerEndSortFuc(a: BaseAtker, b: BaseAtker): number
        {
            if (a.y < b.y) { return -1; }
            if (a.y > b.y) { return 1; }

            return a.roleData.serverStandIndex > b.roleData.serverStandIndex ? 1 : -1

        }





        doMoveEnd()
        {
            throw new Error("Method not implemented.");
        }

        playAttactAction()
        {
            this.playSound(this.skillEffCfgInfo);
            if (this.attacker.isResReady())
            {
                //主角发起攻击动作
                this.attacker.on(RoleActionEvent.ROLE_ACTION_END, this, this.onRoleActionEnd)
                this.attacker.playAction(this.actionStatue);
            } else
            {
                this.onRoleActionEnd(this.actionStatue);
            }

            //技能产生效果
            // logI("去掉少女战争施法特效")
            // if (this.flyActionAry == null && cfg.SkillNewSkillCfgData.getClientEffectTypeBySkillIndex(this.skillIndex) != SkillEffectType.SHU_DAN_DAO)
            // {
            //     let targetRoles = [];
            //     if (this.battleSkillData.attackArr.length > 1)
            //     {
            //         for (var index = 0; index < this.battleSkillData.attackArr.length; index++)
            //         {
            //             var battlePlaybackHurtInfo: BattlePlaybackHurtInfo = this.battleSkillData.attackArr[index];
            //             var targetRole = this._batRoleMgr.getBattleRoleByServerIndex(battlePlaybackHurtInfo.attactInfo.dst);
            //             if (targetRole)
            //             {
            //                 targetRoles.push(targetRole)
            //             }
            //         }
            //     } else
            //     {
            //         targetRoles.push(this.targetRole); //这里回头需要改成传入所有受击者列表
            //     }
            //     this.playSkillEffect(this.attacker, this.beHiterIsOwner, targetRoles, this.skillEffCfgInfo);
            // }
        }

        //监听大招,是否跳过大招
        private _listenerSkinSkill2()
        {
            if (!this._isSkill2Bol) { return; }
            if (this._isSkinSKill2EndBol) { return; }

            if (BattleMgr.Inst.skinSkill2)
            {
                Laya.timer.frameLoop(1, this, this._skill2Timer);

            }
            else
            {
                Laya.timer.clear(this, this._skill2Timer)

            }
        }
        private _skill2Timer()
        {
            if (TimeController.currTimer - this._skill2StartTime >= this.skill2Duration)
            {
                this._isSkinSKill2EndBol = true;
                Laya.timer.clear(this, this._skill2Timer);
                if (this._skillLableEventCount - this._currentLableEventCount > 0)
                {
                    Laya.timer.loop(this._skinSkill2HurtTime, this, this._skinSkill2Frame);
                } else
                {
                    this.onRoleActionEnd(this.actionStatue);
                }
            }
        }
        private _skinSkill2Frame()
        {
            this.showSingleHurt();
            if (this._skillLableEventCount - this._currentLableEventCount <= 0)
            {
                Laya.timer.clear(this, this._skinSkill2Frame);
                this.attacker.onAniPlayStoped();
                this.onRoleActionEnd(this.actionStatue);
            }
        }

        onRoleActionEnd(actionType: RoleActionStatue)
        {
            if (actionType == RoleActionStatue.skill1 || actionType == RoleActionStatue.skill2 || this.actionStatue == RoleActionStatue.skill1_a || this.actionStatue == RoleActionStatue.skill1_b
                || actionType == RoleActionStatue.attack || actionType == RoleActionStatue.win)
            {
                this.attackEndIndexSet();
                this.moveBack();
            }
        }

        protected showCastEffect()
        {
            // logI("去掉少女战争施法特效")
            // let tmpCastEffect: cfg.SkillEffectInfo = this.skillEffCfgInfo == null ? null : cfg.SkillEffectNewSkillEffectCfgData.getCastingEffInfoById(this.skillEffCfgInfo.index);
            // if (tmpCastEffect == null || tmpCastEffect.isEmptyEffect())
            // {
            //     return;
            // }
            // let tempEffScale = this.attacker.roleData.isOwer ? 1 : -1;
            // let tmpCastSpeedScale = Global.getNoZeroValue(cfg.SkillEffectNewSkillEffectCfgData.getCastingSpeedByIndex(this.skillEffCfgInfo.skillIndex), GameConfig.EffDetalTime) / GameConfig.EffDetalTime;
            // EffectMgr.Inst.createSkillEffect(this.attacker.getResourceID(), null, tmpCastEffect, new Laya.Point(0, 0), tempEffScale, this.attacker.actionSpeed * tmpCastSpeedScale, this.attacker, 0, ResReleaseType.Reference);
        }


        protected moveBack(): void
        {
            this.event(BattleEvent.ATTACK_COMPLETE);
            //坐标还原
            if (this.attacker.isWatching)
            {
                let timeMove = this.castPos == BatCfg.SkillCastPos.StandStay ? 0 : 150 / this.attacker.actionSpeed;
                if (timeMove == 0)
                {
                    this.moveBackComplete();
                } else
                {

                    Laya.Tween.to(this.attacker, { x: this.standOldPos.x, y: this.standOldPos.y }, timeMove, Laya.Ease.linearIn, Laya.Handler.create(this, this.moveBackComplete));
                }
            }
            else
            {
                this.attacker.position = this.standOldPos;
                this.moveBackComplete();
            }
        }

        private moveBackComplete(): void
        {
            this.dispathComplete();
        }

        private dispathComplete()
        {
            if (this.attacker)
            {
                this.attacker.finishActionPlayed(this.darkScreenNum);
            }
            this.event(BattleEvent.PLAY_COMPLETE);
        }

        /**
         * 弹道技能
         */
        protected showFlyBullet(flyActionAry: Array<FlyBulletInfo>)
        {
            //远程攻击子弹效果
            if (flyActionAry != null)
            {
                this.mulitHurtFlySkill = new MulitHurtFlySkill(flyActionAry, this.attacker, this.skillEffCfgInfo, this.skillEffect, new CallBack(this, this.showSingleHurt), new CallBack(this, this.flyComplete));
            }
        }

        showSingleHurt()
        {
            this._currentLableEventCount++;
            this.event(BattleEvent.SHOW_SINGLE_HURT);

        }

        showHurt()
        {
            this._currentLableEventCount++;
            this.event(BattleEvent.SHOW_HURT);
        }

        flyComplete()
        {
            this.event(BattleEvent.ATTACK_COMPLETE);
            // this.dispathComplete();
        }

        /**
         * 屏幕变黑
         * @param darkScreen
         * @param attacker
         */
        private darkScreen(darkScreen: number, attacker: BaseAtker)
        {
            //设置场景变化
            if (attacker && darkScreen != 0)
            {
                attacker.roleData.getBatPlaceMgr().setBGBlackAction(true, darkScreen / 10);
            }
        }

        private playSound(skillEffCfgInfo: cfg.SkillEffectNewSkillEffectCfgInfo)
        {
            //音效
            if (skillEffCfgInfo != null && this.attacker.isWatching)
            {
                let tmpCastSound = skillEffCfgInfo.castingSound;
                tmpCastSound.length > 0 && SoundMgr.Inst().delayPlaySound(skillEffCfgInfo.castingSoundDelay, tmpCastSound);
                let tmpSkillSound = skillEffCfgInfo.skillSound;
                tmpSkillSound.length > 0 && SoundMgr.Inst().delayPlaySound(skillEffCfgInfo.skillSoundDelay, tmpSkillSound);
            }
        }



        /** 角色技能效果 */
        private playSkillEffect(attacker: BaseAtker, beHiterIsOwner: boolean, tmpParaRole: BaseAtker[], tmpSkillEffInfo: cfg.SkillEffectNewSkillEffectCfgInfo)
        {

            let tmpSkillEffect = tmpSkillEffInfo == null ? null : cfg.SkillEffectNewSkillEffectCfgData.getSkillEffInfoAryById(tmpSkillEffInfo.index);
            if (tmpSkillEffect == null || tmpSkillEffect.isEmptyEffect())
            {
                return;
            }
            let tempEffScale = attacker.roleData.isOwer ? 1 : -1;
            //动作技能特效
            let tmpSkillSpeedScale = Global.getNoZeroValue(cfg.SkillEffectNewSkillEffectCfgData.getSkillSpeedByIndex(tmpSkillEffInfo.skillIndex), GameConfig.EffDetalTime) / GameConfig.EffDetalTime;
            //如果是受击者身上的效果
            if (cfg.SkillEffectNewSkillEffectCfgData.getExtendsParamsValue(tmpSkillEffInfo.index, BatCfg.SkillEffectExtendsType.skillEff_TotBehit))
            {
                for (let tar of tmpParaRole)
                {
                    // EffectMgr.Inst.createSkillEffect(attacker.getResourceID(), null, tmpSkillEffect, new Laya.Point(0, 0), tempEffScale, attacker.actionSpeed * tmpSkillSpeedScale, tar, 0, ResReleaseType.Reference);
                }
            } else
            {  //全屏效果
                //如果是程序定义的特效，就以屏幕中心为对位点，否则以敌方5号位为对位点
                let endPos = Global.getHeroStandPos(22, beHiterIsOwner);
                if (tmpSkillEffect.aniName != null)
                {
                    endPos.x = GameConfig.curWidth() / 2;
                }
                // EffectMgr.Inst.createSkillEffect(attacker.getResourceID(), null, tmpSkillEffect, endPos, tempEffScale, attacker.actionSpeed * tmpSkillSpeedScale, attacker.roleData.getBatPlaceMgr(), 0, ResReleaseType.Reference);
            }
        }

        finish()
        {
            this._removeEvent();
            Laya.timer.clearAll(this);
            if (this.mulitHurtFlySkill)
            {
                this.mulitHurtFlySkill.finis();
            }


        }

    }

}