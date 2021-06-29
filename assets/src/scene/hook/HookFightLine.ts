/**
 * 挂机战斗行
 * @autho
 */
module Pro
{
    export class HookFightLine
    {

        private static _clippingDic: ds.StringMap<RoleActionStatue>;// = { 15508: 1 }
        private _line: number = 0;
        private _attackArr: CityRole[] = [];
        private _monster: CityRole;

        private _roleModelLayer: Laya.Sprite;
        private _statueUILayer: Laya.Sprite;

        constructor(line: number)
        {
            this._line = line;
            if (HookFightLine._clippingDic == null)
            {
                /**
                 *  有些精灵资源的attack动作用了大量clipping， 很消耗性能， 
                 * 在这里重定向到其他技能去
                 */
                HookFightLine._clippingDic = new ds.StringMap<RoleActionStatue>();
                HookFightLine._clippingDic.put(15508, RoleActionStatue.skill1);
            }
        }

        setLayer(_roleModelLayer: Sprite, _statueUILayer: Sprite)
        {
            this._roleModelLayer = _roleModelLayer;
            this._statueUILayer = _statueUILayer;
        }
        public get line(): number
        {
            return this._line;
        }


        public update()
        {
            for (let index = 0; index < this._attackArr.length; index++)
            {
                const element = this._attackArr[index];
                element.update();
            }
            if (this._monster)
            {
                this._monster.update();
            }
        }

        createMonster(): boolean
        {
            if (this._attackArr.length == 0 || this._monster != null)
            {
                return false;
            }
            // //随机怪物信息
            let tmpNextStageID = Math.min(cfg.HookStageCfgData.getMaxStageId(), HookDataMgr.getStageID() + 1);
            let tmpStageBossID = cfg.HookStageCfgData.getBossGroupIDByStageID(tmpNextStageID);
            let tmpMonsterAry = cfg.HookMonsterNewCfgData.getMonterInfoWithID(tmpStageBossID);
            let tmpMonsterInfo = tmpMonsterAry[Global.getRandomNum(0, tmpMonsterAry.length)];
            let tmpUsePetID = tmpMonsterInfo.skinId;

            //创建怪物
            let attackRole = this._attackArr[0];
            let tmpStartPosX = GameConfig.curWidth() + 100 + Global.getRandomNum(0, 3) * 100;
            var attackPosx = attackRole.x;
            let tmpSkillEffInfo = cfg.SkillEffectNewSkillEffectCfgData.getInfoByIdAndLevel(attackRole.getResourceID(), 0);
            if (tmpSkillEffInfo)
            {
                var pos = cfg.SkillEffectNewSkillEffectCfgData.getRoleAttactOffsetPoint(tmpSkillEffInfo.index);
                if (pos && pos.x)
                {
                    //哎，战斗里面当时都加了GameConfig.HeroStandHorSpace，这里也只能跟着加了，不然表里的数据都要对应减
                    attackPosx += ((-pos.x + GameConfig.HeroStandHorSpace) * attackRole.fightScale); //   tmpSkillEffInfo.roleAttackOffset.x;
                }
            }
            this._monster = this.createHero(tmpUsePetID, true, 0, false, tmpStartPosX, attackRole.y);
            this._monster.roleData.standIndex = attackRole.roleData.standIndex;
            this._monster.gotoPosition(new Laya.Point(attackPosx, attackRole.y));
            this._monster.on(RoleActionEvent.ROLE_ACTION_END, this, this.onActionEnd);
            this._monster.on(RoleActionEvent.ROLE_MOVE_END, this, this.toAttack);
            var behitTime = this.getBehitTime(attackRole) / 16;
            this._monster.canHitedFrame = behitTime;
            return true;
        }

        toAttack(): void
        {
            this._monster.off(RoleActionEvent.ROLE_MOVE_END, this, this.toAttack);
            if (this._attackArr.length)
            {
                var attack;
                for (var index = 0; index < this._attackArr.length; index++) {
                    var element = this._attackArr[index];
                    if(!element.isHaveClip())
                    {
                        attack = element;
                    }
                }
                if(attack == null)
                {
                    attack = this._attackArr[0]
                }
                this.showHungAtk(attack);
            }
        }

        reset()
        {
            Laya.timer.clearAll(this);
            for (let index = 0; index < this._attackArr.length; index++)
            {
                const element = this._attackArr[index];
                RoleManager.release(element);
            }
            this._attackArr.length = 0;
            if (this._monster)
            {
                this._monster.off(RoleActionEvent.ROLE_ACTION_END, this, this.onActionEnd);
                RoleManager.release(this._monster);
                this._monster = null;
            }
        }

        isHaveMonster(): boolean
        {
            if (this._monster == null)
            {
                if (this._attackArr.length > 0)
                {
                    if (this._attackArr[0].actionStatue == RoleActionStatue.move)
                    {
                        return false

                    } else
                    {
                        return true;
                    }
                } else
                {
                    return false
                }
            } else
            {
                return true;
            }

            // return this._monster != null;
        }

        public createHero(skinId: number, isHero: boolean, uid: number, isOwer: boolean, posX: number, posY: number): CityRole
        {
            //创建英雄数据
            let tempRole = RoleManager.getCityRole();
            tempRole.roleData.isOwer = isOwer;
            tempRole.roleData.curRid = skinId;
            tempRole.roleData.isHero = isHero;
            tempRole.roleData.uid = uid;

            //初始化状态
            tempRole.pos(posX, posY);
            tempRole.resetRes(skinId, RoleResType.Hung);
            // this._roleModelLayer.addChildAt(tempRole, 0);
            tempRole.setParent(this._roleModelLayer, 0);

            // https://www.tapd.cn/45518777/prong/stories/view/1145518777001076681
            // 【ID1076681】【战斗】去掉挂机界面的血条
            // this._statueUILayer.addChild(tempRole.statueUI);
            return tempRole;
        }

        /** 创建初始队伍 */
        public createBaseTeam()
        {
            let mainLineZhenfa: Net.BuZhenInfo = EmbattleDataMgr.getBuZhenInfo(Pb_God._emZhenfaType.ZhenfaType_Zhuxian);
            if (mainLineZhenfa == null)
            {
                return;
            }
            //挂机的角色展示
            let zhanfaPosArr = mainLineZhenfa.getPosAry();
            for (let i = 0; i < zhanfaPosArr.length; i++)
            {
                if (zhanfaPosArr[i] != null)
                {
                    let standIndex = GameConfig.AtkStandAry[i];
                    let col = Math.floor(standIndex / 10);
                    if (col == this.line)
                    {
                        let standPos = Global.getHeroStandPos(standIndex, true);
                        let petInfo = PetDataMgr.getPetInfo(zhanfaPosArr[i].petsn);
                        if (!petInfo)
                        {
                            continue;
                        }
                        let cityRole = this.createHero(petInfo.useskinid, true, PlayerDataMgr.uid, true, standPos.x, standPos.y);
                        cityRole.roleData.standIndex = standIndex;
                        cityRole.roleData.curSn = zhanfaPosArr[i].petsn;
                        cityRole.setHangUp();
                        cityRole.isAttacker = true;
                        this._attackArr.push(cityRole);
                    }
                }
            }
            //站立坐标编排
            this._attackArr.sort((a: CityRole, b: CityRole) =>
            {
                if (a.roleData.standIndex < b.roleData.standIndex)
                {
                    return -1;
                }
                else if (a.roleData.standIndex > b.roleData.standIndex)
                {
                    return 1;
                }
                else
                {
                    return 0;
                }
            });
        }



        /** 挂机角色显示攻击特效 */
        public showHungAtk(attacker: CityRole)
        {
            if (attacker.actionStatue.actionName == RoleActionStatue.attack.actionName)
            {
                logI("上一次攻击还未完成，已强制执行新的attack动作， 检查下刷怪时间哪里有问题，下一个怪物要在上一个攻击受伤全部完成之后才能刷出")
            }
            if (HookFightLine._clippingDic.containsKey(attacker.getResourceID()))
            {
                attacker.playAction(HookFightLine._clippingDic.get(attacker.getResourceID()));
            } else
            {
                attacker.playAction(RoleActionStatue.attack);
            }
            this._monster.isAlreasyHit = true;
            //受到伤害的时间点
            //var behitTime = this.getBehitTime(attacker);
            //受攻击角色播放受击逻辑
            //Laya.timer.once(behitTime, this, this.showHungBeHit, [attacker]);
            attacker.on(Laya.Event.LABEL, this, this.showHungBeHit, [attacker])
        }

        getBehitTime(attacker: CityRole): number
        {
            let behitTime = 0;
            //主角发起攻击动作
            let tmpSkillEffInfo = cfg.SkillEffectNewSkillEffectCfgData.getInfoByIdAndLevel(attacker.getResourceID(), 0);
            var arr: number[] = cfg.SkillEffectNewSkillEffectCfgData.getBehitFramesAryById(tmpSkillEffInfo.index);
            if (arr && arr.length)
            {
                behitTime = arr[0] * 80;
            }else{
                //表里没有配置，设置默认值是第10帧
                behitTime=800;
            }
            return behitTime;
        }

        /** 播放受击表现 */
        public showHungBeHit(atker: CityRole)
        {
            atker.off(Laya.Event.LABEL, this, this.showHungBeHit);
            if (this._monster)
            {
                this._monster.stopMoving();
                EventMgr.trigger(EventNotify.City_MRole_HookKill, atker.roleData.curSn, this._monster);
                SkillUtil.plauHurt(this._monster, -1, this._monster.roleData.isOwer)
            }
        }


        onActionEnd(actionStat: RoleActionStatue)
        {
            if (actionStat == RoleActionStatue.hurt)
            {
                // this._monster.statueUI.removeSelf();
                this._monster.off(RoleActionEvent.ROLE_ACTION_END, this, this.onActionEnd);
                Laya.Tween.clearAll(this._monster);
                RoleManager.release(this._monster);
                this._monster = null;
            }
        }
    }
}