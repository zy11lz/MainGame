module Pro
{
    export class SkillUtil
    {
        constructor()
        {

        }


        public static getHurtNumRes(attactInfo: Pb_God.PBFightActionAttack, hpInfo: Pb_God.PBFightActionHP): NumResInfo
        {
            var numRes: NumResInfo = EnumNumTypes.PHYSICAL_ATTACK;
            if (hpInfo.hpchanged.toNumber() > 0)
            {
                numRes = EnumNumTypes.ADD_BLOOD;
            } else
            {
                numRes = EnumNumTypes.MAGIC_ATTACK;
                if (attactInfo && attactInfo.physical)
                {
                    numRes = EnumNumTypes.PHYSICAL_ATTACK;
                }
            }
            return numRes;
        }

        public static getHurtNumBg(attactInfo: Pb_God.PBFightActionAttack, hpInfo: Pb_God.PBFightActionHP): string
        {
            var bgRes: string = "";
            if (hpInfo.hpchanged.toNumber() > 0)
            {
                if (hpInfo.critical)
                {
                    bgRes = "zhandou_font_bao03";
                }
            } else
            {
                if (hpInfo.critical)
                {
                    if (attactInfo.physical)
                    {
                        bgRes = "zhandou_font_bao01";
                    } else
                    {
                        bgRes = "zhandou_font_bao02";
                    }
                }

                if (hpInfo.race)
                {
                    if (attactInfo.physical)
                    {
                        bgRes = "zhandou_font_ke01";
                    } else
                    {
                        bgRes = "zhandou_font_ke02";
                    }
                }
            }
            if (bgRes != "")
            {
                bgRes = "res/battle/" + bgRes + ".png";
            }
            return bgRes;
        }


        public static playBuff(buffArr: Pb_God.PBFightActionBuff[], batRoleMgr: BatRoleMgr)
        {
            for (let index = 0; index < buffArr.length; index++)
            {
                let buffInfo: Pb_God.PBFightActionBuff = buffArr[index];
                this.execBuff(buffInfo, batRoleMgr, index);
            }
        }

        static execBuff(buffInfo: Pb_God.PBFightActionBuff, batRoleMgr: BatRoleMgr, index = 0)
        {
            // let buffInfo = buffArr[index];
            var attacker1: BaseAtker = batRoleMgr.getBattleRoleByServerIndex(buffInfo.src);
            var targetRole: BaseAtker = batRoleMgr.getBattleRoleByServerIndex(buffInfo.dst);
            if (targetRole)
            {
                var addRoledata = attacker1 ? attacker1.roleData : null;
                if (buffInfo.add)
                {
                    targetRole.roleData.getBattleBuffMgr().addBuff(false, buffInfo.buffid, addRoledata, buffInfo.skillindex);

                    //buff提示
                    let tmpSkillName = cfg.BuffNewBuffCfgData.getBuffNameByID(buffInfo.buffid);
                    let time: number = targetRole.lastBuffTime - TimeController.currTimer;
                    targetRole.lastBuffTime = targetRole.lastBuffTime + 380 / targetRole.actionSpeed;
                    Laya.timer.once(time, this, (tipStr: string) =>
                    {
                        EffectMgr.Inst.showUI_ProduceStatue(tipStr, targetRole.continer);
                    }, [tmpSkillName]);

                    this.showFightLog("\t", "+++添加buff", "给谁：", buffInfo.dst, " buffId", buffInfo.buffid, " skillindex:", buffInfo.skillindex, "谁干的：", buffInfo.src)
                } else
                {
                    this.showFightLog("\t", "---移除buff：", "谁：", buffInfo.dst, " buffId", buffInfo.buffid, " skillindex:", buffInfo.skillindex, "谁干的：", buffInfo.src)
                    targetRole.roleData.getBattleBuffMgr().removeBuff(buffInfo.buffid);
                }
                targetRole.refreshDamageAfterStatue();
            } else
            {
                logI("加log找不到人了， 啥情况")
            }
        }

        public static playBuffX(buffArr: Pb_God.PBFightActionBuffFx[], batRoleMgr: BatRoleMgr)
        {
            for (let index = 0; index < buffArr.length; index++)
            {
                const element: Pb_God.PBFightActionBuffFx = buffArr[index];

                let target = batRoleMgr.getBattleRoleByServerIndex(element.src);
                if (target && target.roleData && target.roleData.getBatPlaceMgr())
                {
                    if (element.type == Pb_God._emFightBuffFxType.FightBuffFx_Immune)
                    {
                        EffectMgr.Inst.showBattleAttackText("res/battle/zhandou_font_mianyi.png", new Laya.Point(target.x, target.y - 75), target.roleData.getBatPlaceMgr().EffCeilLayer);
                    }
                    if (element.type == Pb_God._emFightBuffFxType.FightBuffFx_Shield)
                    {
                        EffectMgr.Inst.showBattleAttackText("res/battle/zhandou_font_xishou.png", new Laya.Point(target.x, target.y - 75), target.roleData.getBatPlaceMgr().EffCeilLayer);
                    }
                }
            }
        }


        /** 收到伤害播放效果 */
        public static showDamageHurtNum(target: BaseAtker, attactInfo: Pb_God.PBFightActionAttack, hpInfo: Pb_God.PBFightActionHP, petType: number, tmpSkillEffInfo: cfg.SkillEffectNewSkillEffectCfgInfo, showHurtBol: boolean = true)
        {
            if (hpInfo.hpchanged.toNumber() == 0) { return; }
            //主动技能目标需要展示效果
            if (hpInfo.reason == Pb_God._emDoingType.DoingType_Skill)
            {
                //非自己受击效果
                if (showHurtBol && hpInfo.hpchanged.toNumber() < 0)
                {
                    SkillUtil.plauHurt(target, target.roleData.standIndex, target.roleData.isOwer);
                }

                let tmpBeHitEffect = tmpSkillEffInfo == null ? null : cfg.SkillEffectNewSkillEffectCfgData.getBehitEffAryById(tmpSkillEffInfo.index);
                let tmpBeHitPos = tmpSkillEffInfo == null ? 1 : cfg.SkillEffectNewSkillEffectCfgData.getBehitPosByIndex(tmpSkillEffInfo.index);

                if (tmpSkillEffInfo)
                {
                    if (tmpSkillEffInfo.behitSound && target.isWatching)
                    {
                        SoundMgr.Inst().delayPlaySound(tmpSkillEffInfo.behitSoundDelay, tmpSkillEffInfo.behitSound)
                    }
                }
                if (tmpBeHitEffect != null && !tmpBeHitEffect.isEmptyEffect())
                { //受击效果
                    // let tmpBehitSpeedScale = Global.getNoZeroValue(cfg.SkillEffectNewSkillEffectCfgData.getBehitSpeedByIndex(tmpSkillEffInfo.skillIndex), GameConfig.EffDetalTime) / GameConfig.EffDetalTime;
                    // let tmpSkillEffectIndex = 0;
                    // //两个受击特效中，分别对应敌方与友方的受击
                    // let behitEff_DiffCamp = cfg.SkillEffectNewSkillEffectCfgData.getExtendsParamsValue(tmpSkillEffInfo.index, BatCfg.SkillEffectExtendsType.behitEff_DiffCamp)
                    // if (behitEff_DiffCamp)
                    // {
                    //     tmpSkillEffectIndex = (hpInfo != null && hpInfo.hpchanged.toNumber() > 0) ? 1 : 2;
                    // }
                    // EffectMgr.Inst.createSkillEffect(tmpSkillEffInfo.heroID, null, tmpBeHitEffect, SkillUtil.getEffPos(target, tmpBeHitPos), target.getActionFlipX() ? 1 : -1, target.actionSpeed * tmpBehitSpeedScale, target, tmpSkillEffectIndex);
                }//非自己默认打击效果
                else
                {
                    if (!target.isActionPlaying && petType > 0 && hpInfo.hpchanged.toNumber() < 0)
                    {
                        // target.addEffect("norBehit" + petType, null, target.getActionFlipX() ? -1 : 1, target, null, true);
                    } else
                    {
                        // logI("hitEffect:无无受击")
                    }
                }
            } else
            {
                this.showFightLog("非技能掉血")
            }
            SkillUtil.showNum(target, attactInfo, hpInfo);
        }

        static plauHurt(target: BaseRole, standIndex: number, isOwner)
        {
            if (target)
            {
                if (target.isFree)
                {
                    logI("已经desory了还 hurt？")
                    return;
                }
                let tempOldX = standIndex == -1 ? target.x : Global.getHeroStandPos(standIndex, isOwner).x;
                let tempTargetX = tempOldX - (isOwner ? 1 : -1) * 35;
                this.playTweenHurt(target, tempTargetX, tempOldX, 80 / target.actionSpeed);
                target.playAction(RoleActionStatue.hurt);
            }

        }


        private static playTweenHurt(target: BaseRole, tempTargetX: number, tempOldX: number, duration: number)
        {
            Laya.Tween.to(target, { x: tempTargetX }, duration, Laya.Ease.bounceIn, Laya.Handler.create(this, () =>
            {
                Laya.Tween.to(target, { x: tempOldX }, duration, Laya.Ease.linearIn);
            }));
        }




        /** 收到伤害播放效果 */
        public static showNum(target: BaseAtker, attactInfo: Pb_God.PBFightActionAttack, hpInfo: Pb_God.PBFightActionHP)
        {
            if (hpInfo.hpchanged.toNumber() == 0) { return; }
            if (!target || target.isFree) { return; }
            var reason = "其他";
            if (hpInfo.reason == Pb_God._emDoingType.DoingType_Skill)
            {
                reason = "技能:" + hpInfo.skillindex;
            }
            if (hpInfo.reason == Pb_God._emDoingType.DoingType_Buff)
            {
                reason = "buff";
            }
            this.showFightLog("\t", hpInfo.dst + "血量变化", "变化值：", hpInfo.hpchanged, " 变化后值：", hpInfo.hp, "变化原因:", reason, "谁干的：", hpInfo.src);
            var numRes: NumResInfo = SkillUtil.getHurtNumRes(attactInfo, hpInfo);
            var bgRes: string = "";
            if (attactInfo)
            {
                bgRes = SkillUtil.getHurtNumBg(attactInfo, hpInfo)
            }
            target.showHp(hpInfo, bgRes, numRes);
        }

        public static showFightLog(...args: (string | number | protobuf.Long)[])
        {
            if (GlobalData.isRelease || !GlobalData.isPringBattleInfo) { return; }
            logI(args.join("  "));
        }





        /** 角色本次施法位置 */
        public static getCastingActionPosition(attacker: BaseAtker, targetRole: BaseAtker, tmpCastPos: BatCfg.SkillCastPos): Laya.Point
        {
            //屏幕中心放大招
            if (tmpCastPos == BatCfg.SkillCastPos.ScreenCenter)
            {
                let tempCPos = Global.getHeroStandCenter();
                tempCPos.y += 1 * GameConfig.HeroStandVelSpace;
                return tempCPos;
            }//保持不动
            else if (tmpCastPos == BatCfg.SkillCastPos.StandStay)
            {
                return attacker.position;
            }//对面目标前
            else if (tmpCastPos == BatCfg.SkillCastPos.ParaFront)
            {
                let tmpMoveX = targetRole.x + (attacker.roleData.isOwer ? -1 : 1) * GameConfig.HeroStandHorSpace;
                return new Laya.Point(tmpMoveX, targetRole.y);
            }//我方对位排
            else if (tmpCastPos == BatCfg.SkillCastPos.OwnParaRow)
            {
                return new Laya.Point(attacker.x, targetRole.y);
            }//中心对位排
            else if (tmpCastPos == BatCfg.SkillCastPos.CenterParaRow)
            {
                let tmpMoveX = Global.getHeroStandCenter().x;
                let tmpMoveY = targetRole.y;
                return new Laya.Point(tmpMoveX, tmpMoveY);
            }
        }



        /**
         * 获取特效播放坐标点,0:随机，1:脚底，2:头顶，3:中心
         */
        public static getEffPos(resourceID: number, posIndex: number): Laya.Point
        {

            //参考坐标
            let effectPos = new Laya.Point();
            let effectWidth = 130;
            let effectHeigth = cfg.PetSkinCfgData.getRoleHeight(resourceID /*attack.getResourceID()*/);

            //随机
            if (posIndex == 0)
            {
                effectPos.x = effectWidth * Global.getRandomNum(0, 80) / 100 - effectWidth / 2;
                effectPos.y = -effectHeigth * Global.getRandomNum(0, 80) / 100;
            }//脚底
            else if (posIndex == 1)
            {
                effectPos = new Laya.Point();
            }//头顶
            else if (posIndex == 2)
            {
                effectPos = new Laya.Point(0, -effectHeigth);
            }//中心效果
            else if (posIndex == 3)
            {
                effectPos = new Laya.Point(0, -effectHeigth * 0.5 + 10);
            }

            return effectPos;
        }
    }
}