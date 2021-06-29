
module Pro
{
    /**
     * 管理战场中角色
     */
    export class BatPlaceMgr implements common.Ipool
    {

        //-----------------------------------------战斗层---------------------------------
        /** 战斗层 */
        private Scene: component.UILayer;

        /** 背景层 */
        private _sceneBGLayer: Laya.Image;

        /** 背景黑色层 */
        private _sceneBGBlackLayer: Laya.Image;

        /** 角色阴影层 */
        private _roleSDLayer: Laya.Sprite;

        /** 角色模型层 */
        private _roleModelLayer: spine.SkelLayaLayer;

        /** 角色模型层 */
        private _roleLayer: Laya.Sprite;
        private _roleBlackBgImage: Laya.Image;

        private skelLayer: spine.ISkelLayer;

        // private webglLayer: spine.SpineLayer;

        /** 特效地板层 */
        public EffFloorLayer: Laya.Sprite;

        /** 特效顶层 */
        public EffCeilLayer: Laya.Sprite;

        /** 角色状态层 */
        public UIStatueLayer: Laya.Sprite;

        /** 伤害效果 */
        public DamageNumLayer: Laya.Sprite;

        //-----------------------------------画面效果控制-------------------------
        /** 是否正观看本场战斗中 */
        private isWatching = false;

        /** 战场已经结束 */
        private _isFinishBat = false;

        //--------------------------------------战斗数据--------------------------
        /** 初始化状态 */
        private isRunning = false;

        /** 战斗是否属于录像 */
        private batIsVideo: boolean = false;

        /** 战斗回合数据 */
        public batInfo: Pb_God.PBFightBase;

        /** 角色管理器 */
        private roleMgr: BatRoleMgr;

        /** 记录战场已经完成战斗场次 */
        private batFinishStages: number = 0;

        /** 记录本场战斗无尽试炼选择buff的战斗次数 */
        private batEndBuffStages: number = 0;

        private _earthquake: Earthquake;

        public poolSign: common.PoolSign;
        private _currentRound: number = 1;
        private _maxRound: number;

        /**当前援军技能的index */
        private _defendSelfSkillIndex: number = 0;
        /**当前地方援军技能的index */
        private _defendEnemySkillIndex: number = 0;
        /** 援军cd 卡槽：回合*/
        public defendSelfCd: any;
        /** 对方援军cd*/
        public defendEnemyCd: any



        get isFree(): boolean
        {
            return this.poolSign.isFree;
        }



        //-----------------------------------初始化-------------------------------
        constructor()
        {
            this.poolSign = new common.PoolSign();
            /** 战斗层父节点 */
            this.Scene = new component.UILayer();
            this.Scene.visible = false;

            /** 统一放大效果 */
            // let tmpFitX = Math.min(GameConfig.WinScaleX, 1);
            let tmpScene = new Laya.Sprite();
            // tmpScene.scale(tmpFitX, tmpFitX);
            // tmpScene.y = GameConfig.curHeight() - GameConfig.WinHeight * tmpFitX;
            this.Scene.addChild(tmpScene);
            tmpScene.name = "tmpScene";

            /** 背景层 */
            this._sceneBGLayer = new Laya.Image();
            this._sceneBGLayer.skin = "";
            this._sceneBGLayer.anchorX = 0.5;
            this._sceneBGLayer.anchorY = 0;
            this._sceneBGLayer.x = GameConfig.curWidth() / 2;
            this._sceneBGLayer.y = 0;
            // this.SceneBGLayer.x = (this.Scene.width - GameConfig.WinWidth) / 2;
            // this.SceneBGLayer.y = GameConfig.WinHeight - Laya.stage.height;
            tmpScene.addChild(this._sceneBGLayer);
            this._sceneBGLayer.name = "SceneBGLayer";

            /** 背景黑色层 */
            this._sceneBGBlackLayer = new Laya.Image();
            // this.SceneBGBlackLayer.y = GameConfig.WinHeight - this.Scene.height;
            this._sceneBGBlackLayer.alpha = 0;
            tmpScene.addChild(this._sceneBGBlackLayer);
            this._sceneBGBlackLayer.name = "SceneBGBlackLayer";

            /** 特效地板层 */
            this.EffFloorLayer = new Laya.Sprite();
            tmpScene.addChild(this.EffFloorLayer);
            this.EffFloorLayer.name = "EffFloorLayer";

            /** 角色阴影层 */
            this._roleSDLayer = new Laya.Sprite();
            tmpScene.addChild(this._roleSDLayer);
            this._roleSDLayer.name = "RoleSDLayer";

            this._roleLayer = new Laya.Sprite;
            tmpScene.addChild(this._roleLayer);
            this._roleLayer.name = "roleLayer";
            /** 角色模型层 */
            if (GlobalData.isUseWebgl)
            {
                // this.RoleModelLayer = new spine.SpineLayer();
                // this.roleLayer.addChild(spine.Flypine.layaSp);
                // spine.SpineRender.instance.addLayer(this.RoleModelLayer);
            } else
            {
                this._roleModelLayer = new spine.SkelLayaLayer();
                this._roleLayer.addChild(this._roleModelLayer as any);
                this._roleBlackBgImage = new Laya.Image();
                this._roleModelLayer.addChild(this._roleBlackBgImage);

                this._roleBlackBgImage.alpha = 0.7;
                this._roleBlackBgImage.visible = false;
            }

            /**  特效顶部层 */
            this.EffCeilLayer = new Laya.Sprite();
            tmpScene.addChild(this.EffCeilLayer);
            this.EffCeilLayer.name = "EffCeilLayer";

            /** 角色UI状态层 */
            this.UIStatueLayer = new Laya.Sprite();
            tmpScene.addChild(this.UIStatueLayer);
            this.UIStatueLayer.name = "UIStatueLayer";

            //添加数字效果
            this.DamageNumLayer = new Laya.Sprite;
            tmpScene.addChild(this.DamageNumLayer);
            this.DamageNumLayer.name = "DamageNumLayer";

            this.adjustScreenPos();
            //角色管理器
            this.roleMgr = new BatRoleMgr(this);
        }

        public adjustScreenPos()
        {
            this.Scene.size(GameConfig.curWidth(), GameConfig.curHeight());

            let bgScale = Laya.stage.height / GameConfig.WinHeight;
            this._sceneBGLayer.scale(bgScale, bgScale);

            this._sceneBGBlackLayer.graphics.drawRect(0, 0, GameConfig.curWidth(), GameConfig.curHeight(), "#000000");

            this._roleBlackBgImage && this._roleBlackBgImage.graphics.drawRect(0, 0, GameConfig.curWidth(), GameConfig.curHeight(), "#000000");
            this.EffFloorLayer.y = this._roleSDLayer.y = this._roleLayer.y = this.EffCeilLayer.y = this.UIStatueLayer.y = this.DamageNumLayer.y = GameConfig.curHeight() - GameConfig.WinHeight >> 1;
        }

        /**
         * 角色移动后重新排列层级
         * @param attackerArr
         * @param upBaseAtkerArr 技能特效时有黑色遮罩
         * @param upBaseAtker 释放技能的角色 大招
         */
        public resetRoleListIndex(attackerArr: BaseAtker[], upBaseAtkerArr: BaseAtker[] = null, upBaseAtker: BaseAtker = null)
        {
            for (let i = 0; i < attackerArr.length; ++i)
            {
                attackerArr[i].continer.parent.addChild(attackerArr[i].continer);
                if (upBaseAtkerArr)
                {
                    !attackerArr[i].statueUI["specailHide"] && attackerArr[i].continer.parent.addChild(attackerArr[i].statueUI);

                } else
                {
                    !attackerArr[i].statueUI["specailHide"] && this.UIStatueLayer.addChild(attackerArr[i].statueUI);
                    attackerArr[i].showEff(true);
                }
            }
            if (upBaseAtkerArr)
            {
                this._roleBlackBgImage.parent.addChild(this._roleBlackBgImage);
                this._roleBlackBgImage.visible = true;
                for (let i = 0; i < upBaseAtkerArr.length; ++i)
                {
                    upBaseAtkerArr[i].continer.parent.addChild(upBaseAtkerArr[i].continer);
                    !upBaseAtkerArr[i].statueUI["specailHide"] && upBaseAtkerArr[i].continer.parent.addChild(upBaseAtkerArr[i].statueUI);
                }
            } else
            {
                this._roleBlackBgImage.visible = false;
            }
            if (upBaseAtker)
            {
                !upBaseAtker.statueUI["specailHide"] && upBaseAtker.continer.parent.addChild(upBaseAtker.statueUI);
                upBaseAtker.continer.parent.addChild(upBaseAtker.continer);
                upBaseAtker.showEff(false);
                //倒是把表改成0，就不需要这段代码
                this.setBGBlackAction(false);
            }
        }

        //------------------------------------------外部数据访问--------------------------------
        /**
         * 设置战斗数据
         */
        public setBattleInfo(info: Pb_God.PBFightBase, isVedio: boolean = false): void
        {

            this.batInfo = info;
            this.batIsVideo = isVedio;
            if (info != null)
            {
                if (this.batInfo.friend && this.batInfo.friend.battlepet.artifact != null && this.batInfo.friend.battlepet.artifact.id == 0)
                {
                    this.batInfo.friend.battlepet.artifact = null;
                }
                if (this.batInfo.energy && this.batInfo.energy.battlepet.artifact != null && this.batInfo.energy.battlepet.artifact.id == 0)
                {
                    this.batInfo.energy.battlepet.artifact = null;
                }
                //  logI(JSON.stringify(this.batInfo.playback, (key: string, value: any) => {
                //     if (typeof (value) == "object" && (value instanceof window["Long"])) return "Long:" + value;
                //     return value;
                //  },"\t"));
                if (this.batInfo.playback)
                {
                    this.setPlayBackData(this.batInfo);
                } else
                {
                    logI("playback 数据为空， 特殊副本无尽试炼'")
                }

                if (this.batInfo.friend && this.batInfo.friend.battlepet.defend)
                {
                    this.batInfo.friend.battlepet.defend.skills.sort(this.defendSkillSort)
                }
                if (this.batInfo.energy && this.batInfo.energy.battlepet.defend)
                {
                    this.batInfo.energy.battlepet.defend.skills.sort(this.defendSkillSort)
                }

            } else
            {
                if (this.roleMgr)
                {
                    this.clearplayBack();
                }
            }
            this._maxRound = this.batInfo != null ? this.batInfo.maxround : 15;


        }
        defendSkillSort(a: Pb_God.PBDefendSkill, b: Pb_God.PBDefendSkill)
        {
            if (b.index > a.index) { return -1; }
            return 1
        }

        /**
         * 获取战斗伙伴阵型ID
         */
        public getBattlePetZhenfaId(isOwn: boolean): number
        {
            if (isOwn)
            {
                return this.batInfo.friend.battlepet.zhenfaid;
            }
            return this.batInfo.energy.battlepet.zhenfaid;
        }

        /**
         * 获取战斗伙伴战斗力
         */
        public getBattlePetPower(isOwn: boolean): number
        {
            if (isOwn)
            {
                return this.batInfo.friend.battlepet.fightpower;
            }
            return this.batInfo.energy.battlepet.fightpower;
        }

        /**
         * 获取战斗伙伴神器信息
         */
        public getBattlePetArtifact(isOwn: boolean): Pb_God.PBGlobalArtifactDisplay
        {
            if (this.batInfo == null)
            {
                return null;
            }
            if (this.batInfo.friend == null)
            {
                return null;
            }
            if (this.batInfo.friend.battlepet == null)
            {
                return null;
            }
            if (isOwn)
            {
                return this.batInfo.friend.battlepet.artifact;
            }
            return this.batInfo.energy.battlepet.artifact;
        }

        /**
         * 获取伙伴战斗数据
         */
        public getBattlePetInfos(isOwn: boolean): Pb_God.PBBattlePetInfo[]
        {
            if (!this.batInfo) { return []; }//容错处理。
            if (isOwn)
            {
                return this.batInfo.friend.battlepet.battlepet;
            }
            //这里处理一下服务器的脏数据。。。。旧玩家的数据下发时 皮肤id可能会发个0过来。。。
            let tmp = this.batInfo.energy.battlepet.battlepet
            tmp.forEach(element =>
            {
                if (element.pet.display.useskinid == 0)
                {
                    element.pet.display.useskinid = cfg.PetCfgData.getBaseSkinByPetID(element.pet.display.id);
                }
            })

            return this.batInfo.energy.battlepet.battlepet;
        }

        /**
         * 获取伙伴额外技能索引
         */
        public getBattleExSkills(isOwn: boolean): Array<number>
        {
            if (isOwn)
            {
                return this.batInfo.friend.battlepet.extraskill;
            }
            return this.batInfo.energy.battlepet.extraskill;
        }

        /**
         * 获取战斗阵营属于第几支队伍(天界副本boss关)
         * @param isOwn
         */
        public getBattleCampIndex(isOwn: boolean): number
        {
            if (isOwn)
            { return this.batInfo.friend.index; }
            return this.batInfo.energy.index;
        }


        /**
         * 获取伙伴阵型ID
         */
        public getBattlePetZhengxing(isOwner: boolean): Array<number>
        {

            //重置阵型ID
            let tmpZhenxingId = new Array<number>();
            let tmpPetBatList = this.getBattlePetInfos(isOwner);

            //记录各种族的个数
            let tmpMapTypeDic = new Laya.Dictionary();
            for (let i = 0; i < tmpPetBatList.length; i++)
            {
                let tmpPetInfo = tmpPetBatList[i].pet.display;
                let tmpPetType = cfg.PetCfgData.getPetTypeByPetID(tmpPetInfo.id);
                let tmpPetTypeNum = tmpMapTypeDic.get(tmpPetType);
                if (tmpPetTypeNum == null)
                {
                    tmpPetTypeNum = 0;
                }
                tmpPetTypeNum += 1;
                tmpMapTypeDic.set(tmpPetType, tmpPetTypeNum);
            }

            if (tmpMapTypeDic.keys.length == 5)
            {
                tmpZhenxingId.push(0);
            }
            else
            {
                for (let i = 0; i < tmpMapTypeDic.keys.length; i++)
                {
                    let tmpPetType = tmpMapTypeDic.keys[i];
                    let tmpPetNum = tmpMapTypeDic.get(tmpPetType);
                    let tmpInfo = cfg.BattleFormationAttrCfgData.getInfoWithTypeNum(tmpPetType, tmpPetNum);
                    if (tmpInfo != null)
                    {
                        tmpZhenxingId.push(tmpInfo.iD);
                    }
                }
            }

            return tmpZhenxingId;
        }

        /**
         * 获取指定伙伴类型数量
         * @param type
         */
        public getBattlePetTypeCount(type: number, isOwner = true): number
        {
            let result = 0;
            let tmpPetBatList = this.getBattlePetInfos(isOwner);
            for (let i = 0; i < tmpPetBatList.length; i++)
            {
                let tmpPetInfo = tmpPetBatList[i].pet.display;
                let tmpPetType = cfg.PetCfgData.getPetTypeByPetID(tmpPetInfo.id);
                if (tmpPetType == type)
                { result++; }
            }
            return result;
        }

        /**
         * 获取指定伙伴职业类型数量
         * @param type
         * @param isOwner
         */
        public getBattlePetJobCount(type: number, isOwner = true): number
        {
            let result = 0;
            let tmpPetBatList = this.getBattlePetInfos(isOwner);
            for (let i = 0; i < tmpPetBatList.length; i++)
            {
                let tmpPetInfo = tmpPetBatList[i].pet.display;
                let tmpPetType = cfg.PetCfgData.getPetJobTypeByPetID(tmpPetInfo.id);
                if (tmpPetType == type)
                { result++; }
            }
            return result;
        }
        /**
        * 获取援军信息
        * @param isOwner
        */
        public getBattleDefendInfo(isOwner = true): Pb_God.PBGlobalDefendDisplay
        {
            if (isOwner)
            {
                return this.batInfo.friend.battlepet.defend;
            } else
            {
                return this.batInfo.energy.battlepet.defend;
            }

        }
        /**
         * 判断是否是援军
         * @param isOwner
         */
        public isDefend(unitid: number): boolean
        {
            if (!unitid) { return false; }
            if (this.batInfo.friend.battlepet.defend && this.batInfo.friend.battlepet.defend.unitid == unitid)
            {
                return true;
            }
            if (this.batInfo.energy.battlepet.defend && this.batInfo.energy.battlepet.defend.unitid == unitid)
            {
                return true;
            }
            return false;

        }
        public defendIsOwner(unitid: number): boolean
        {
            if (this.batInfo.friend.battlepet.defend && this.batInfo.friend.battlepet.defend.unitid == unitid)
            {
                return true;
            }
            return false;

        }
        public getDefendSkinId(isOwner: boolean, skillindex: number): Pb_God.PBDefendSkill
        {
            let skills: Pb_God.PBDefendSkill[];
            if (isOwner && this.batInfo.friend.battlepet.defend)
            {
                skills = this.batInfo.friend.battlepet.defend.skills;

            } else if (this.batInfo.energy.battlepet.defend)
            {
                skills = this.batInfo.energy.battlepet.defend.skills;
            }
            let skill: Pb_God.PBDefendSkill;
            skill = this.getDefendSkill(skillindex, skills);
            return skill;

        }


        private getDefendSkill(skillIndex: number, skills: Pb_God.PBDefendSkill[]): Pb_God.PBDefendSkill
        {
            let skill: Pb_God.PBDefendSkill;
            let firstSkill: Pb_God.PBDefendSkill;
            for (let i = 0; i < skills.length; i++)
            {
                let skilltmp: number = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(skills[i].skill.skillid, skills[i].skill.skilllevel).skillIndex;
                if (skilltmp == skillIndex)
                {
                    if (!firstSkill)
                    {
                        firstSkill = skills[i];
                        break;
                    }

                } else
                {
                    let intInfo: cfg.SkillValueIntInfo = cfg.SkillNewSkillCfgData.getTriggerParamInfobyIndex(skilltmp);
                    if (intInfo && intInfo.length)
                    {
                        for (let j = 0; j < intInfo.length; j++)
                        {
                            let skillid = cfg.SkillNewSkillCfgData.getSkillIDBySkillIndex(skillIndex);
                            skilltmp = intInfo[j];
                            if (skilltmp == skillid)
                            {
                                if (!firstSkill)
                                {
                                    firstSkill = skills[i];
                                    break;
                                }
                            }
                        }
                        if (firstSkill) { break; }
                    }
                }
            }
            skill = firstSkill;
            if (!skill)
            {
                //TODO 没有找到对应的守护技能 加个打印出错
                let skillsStr = "";
                for (let z = 0; z < skills.length; z++)
                {
                    if (skills[z] && skills[z].skill.skillid)
                    {
                        skill = skills[z];
                        skillsStr += " z:" + skills[z].skill.skillid;
                    }
                }
                logI("没有找到对应的守护技能skillIndex:" + skillIndex + "  skills:" + skillsStr);
                GameLaunch.PostClientLog("not find defend skill skillIndex:" + skillIndex + "  skills:" + skillsStr);
                return skill;
            }
            return skill;
        }
        /**释放技能的卡槽的cd */
        public setDefendSkillIndex(isOwner: boolean = true, skillindex: number)
        {
            let skill: Pb_God.PBDefendSkill;
            skill = this.getDefendSkinId(isOwner, skillindex);
            if (isOwner)
            {
                this._defendSelfSkillIndex = skill.index;
                this.defendSelfCd[skill.index] = this._currentRound;
            } else
            {
                this._defendEnemySkillIndex = skill.index;
                this.defendEnemyCd[skill.index] = this._currentRound;
            }

            if (this.isWatching)
            {
                BattleMgr.Inst.battleUI.refreshDefendList();

            }
        }





        /**
         * 获取我方战斗者名称
         */
        public getAttackName(): string
        {
            if (this.batInfo == null || this.batInfo.friend == null || this.batInfo.friend.playerdisplay == null)
            {
                return "";
            }
            return this.batInfo.friend.playerdisplay.playername;
        }

        /**
         * 获取对方战斗者名称
         */
        public getDefenseName(): string
        {

            if (this.batInfo == null)
            {
                return "";
            }
            if (this.batInfo.energy == null)
            {
                return "";
            }
            //对方是玩家，有名字就直接显示了。
            if (this.batInfo.energy.playerdisplay)
            {
                return this.batInfo.energy.playerdisplay.playername;
            }

            let battleType = this.getBattleType();
            let battleId = this.getBattleID();
            var monsterGrpId = 0;
            let bossId = 0
            let monsterInfo;
            var bossInfo;
            switch (battleType)
            {
                case Pb_God._emBattleType.BattleType_Hook: //挂机BOSS;
                    //怪物组id
                    monsterGrpId = cfg.HookStageCfgData.getBossGroupIDByStageID(battleId);
                    return cfg.HookMonsterNewCfgData.getBossNameByIndex(monsterGrpId);
                case Pb_God._emBattleType.BattleType_Copymap: //日常副本
                    let copyMapCfgInfo = cfg.CopymapCfgData.getInfo(battleId);
                    return copyMapCfgInfo.name + "_" + Global.getLangStr("CopymapStageType_" + copyMapCfgInfo.nayiDu) + (copyMapCfgInfo.typeId ? copyMapCfgInfo.typeId : "");
                case Pb_God._emBattleType.BattleType_Endless: //无尽试炼;
                    return Global.getLangStr("endlessTower_msg9", battleId);  //第112波
                case Pb_God._emBattleType.BattleType_Temple: //星河神殿
                    bossId = cfg.TempleCfgData.getMonsterByID(battleId);
                    monsterInfo = cfg.TempleMonsterNewCfgData.getBossMonsterInfoById(bossId);
                    return cfg.PetSkinCfgData.getFileNameById(monsterInfo.skinId);
                case Pb_God._emBattleType.BattleType_Element: //元素神殿;
                    let stage = cfg.ElementStageCfgData.getStageByIndex(battleId);
                    monsterGrpId = cfg.ElementStageCfgData.getMonsterByIndex(battleId);
                    bossInfo = cfg.ElementMonsterNewCfgData.getBossMonsterInfoById(monsterGrpId);
                    let bossName = cfg.PetSkinCfgData.getFileNameById(bossInfo.skinId);
                    return Global.getLangStr("element_msg4", bossName, stage);
                case Pb_God._emBattleType.BattleType_Tower: //试练塔;
                case Pb_God._emBattleType.BattleType_Tower2: //试练塔;
                    let towerCfgInfo = cfg.TrainTowerCfgData.getInfo(battleId);
                    bossInfo = cfg.TrainMonsterNewCfgData.getBossMonsterInfoById(towerCfgInfo.monster);
                    return Global.getLangStr("fight_msg37", towerCfgInfo.stageShow, cfg.PetSkinCfgData.getFileNameById(bossInfo.skinId));
                case Pb_God._emBattleType.BattleType_HeavenDungeon: //天界副本;
                    let heavenCfgInfo = cfg.HeavenStageCfgData.getInfo(battleId);
                    if (!cfg.HeavenStageCfgData.isBossStage(heavenCfgInfo))// 副本普通关卡
                    { return Global.getLangStr("fight_msg38", Global.numberToChinese(heavenCfgInfo.chapter), heavenCfgInfo.stage); }//第一章：第1关
                    let wave_idx = this.getBattleParam() <= 0 ? 1 : this.getBattleParam();
                    return Global.getLangStr("fight_msg41", wave_idx);
                case Pb_God._emBattleType.BattleType_Risk: //神界冒险;
                    bossId = cfg.RiskGuardCfgData.getMonsterByIndex(battleId);
                    bossInfo = cfg.RiskMonsterNewCfgData.getMonterInfoWithID(bossId);
                    return cfg.PetSkinCfgData.getFileNameById(bossInfo.skinId);;

                case Pb_God._emBattleType.BattleType_FactionCopymap: //公会副本;
                    bossId = cfg.FactionCopymapCfgData.getMonsterByID(battleId);
                    bossInfo = cfg.FactionMonsterNewCfgData.getMonterInfoWithID(bossId);
                    return cfg.PetSkinCfgData.getFileNameById(bossInfo.skinId);;

                case Pb_God._emBattleType.BattleType_Peak: //巅峰挑战;
                    var monstId = cfg.TrainPeakCfgData.getMonsterByDay(battleId);
                    monsterInfo = cfg.TrainMonsterNewCfgData.getBossMonsterInfoById(monstId);
                    return cfg.PetSkinCfgData.getFileNameById(monsterInfo.skinId);;

                case Pb_God._emBattleType.BattleType_ActivityBoss://    限时挑战
                    let info = ActivityBossDataMgr.info;
                    if (!info)
                        return "";
                    return cfg.ActivitybossMonsterNewCfgData.getInfo(info.index).name;
                    
                default:
                    return battleType + ":" + this.getBattleID();
            }
        }

        //------------------------------------------外部参数访问--------------------------------
        /**
         * 获取角色管理器
         */
        public getRoleMgr(): BatRoleMgr
        {
            return this.roleMgr;
        }

        /**
         * 获取战斗类型
         */
        public getBattleType(): Pb_God._emBattleType
        {
            if (this.batInfo == null)
            {
                return -1;
            }
            return this.batInfo.battletype;
        }

        /**
         * 获取战斗副本ID
         */
        public getBattleID(): number
        {
            if (this.batInfo == null)
            {
                return -1;
            }
            return this.batInfo.id;
        }

        public get isFinishBat(): boolean
        {
            return this._isFinishBat;
        }

        /**
         * 战斗额外参数
         */
        public getBattleParam(): number
        {
            if (this.batInfo == null)
            { return -1; }
            return this.batInfo.param;
        }

        /**
         * 是否属于观察中
         */
        public getIsWatching(): boolean
        {
            return this.isWatching;
        }

        /**
         * 获取战斗是否属于录像
         */
        public getBattleIsVideo(): boolean
        {
            return this.batIsVideo;
        }

        /**
         * 设置本次选择无尽buff的战斗轮回
         */
        public setEndBuffStageTimes(value: number)
        {
            this.batEndBuffStages = value;
        }

        /**
         * 获取本次选择无尽buff的战斗轮回
         */
        public getEndBuffStageTimes(): number
        {
            return this.batEndBuffStages;
        }

        /**
         * 获取战场完成得战斗次数
         */
        public getFinishStageTimes(): number
        {
            return this.batFinishStages;
        }

        /**
         * 设置战场完成得战斗次数
         */
        public resetFinishStageTimes()
        {
            this.batFinishStages = 0;
            this.batEndBuffStages = 0;
        }
        //-----------------------------------------------------Event---------------------------------------------------

        //--------------------------逻辑循环控制-------------------------------------------
        /** 开启循环逻辑 */
        private startLoop()
        {
            Laya.timer.frameLoop(1, this, this.loop);
        }

        /** 关闭循环逻辑 */
        private stopLoop()
        {
            Laya.timer.clear(this, this.loop);
        }

        /**
         * 主逻辑循环
         */
        private loop(): void
        {
            this.doLogic();
        }

        //---------------------------------公共管理方法----------------------------
        /**
         * 初始化战斗状态
         * */
        private startLogic()
        {
            if (this.isRunning)
            {
                return;
            }

            this.isRunning = true;

            //开启定时器
            this.startLoop();
        }

        /** 关闭逻辑回收所有状态 */
        public stopLogic()
        {
            if (!this.isRunning)
            {
                return;
            }
            this.isRunning = false;
            //定时器移除
            this.stopLoop();
            //回收角色资源
            this.roleMgr.reset();
            //回收背景资源
            if (this._sceneBGLayer.skin.length > 0)
            {
                ResMgr.Inst.unloadWithUrl(this._sceneBGLayer.skin);
                this._sceneBGLayer.skin = "";
            }

            //隐藏黑色遮罩
            if (this._sceneBGBlackLayer != null)
            {
                Laya.Tween.clearAll(this._sceneBGBlackLayer);
                this._sceneBGBlackLayer.alpha = 0;
            }

            //移除公用场景
            this.Scene.removeSelf();

            //回收内存
            if (this.isWatching)
            {
                ResMgr.Inst.clearAutoReleaseRes();
                BattleMgr.Inst.battleUI.hide();
                BattleMgr.Inst.battleUI.removeSelf();
            }

            //关闭观察状态
            this.isWatching = false;
            this._currentRound = 1;
        }


        //-------------------------------------------------------回合逻辑循环----------------------------------------------
        /**
         * 回合逻辑循环]
         * */
        private doLogic()
        {
            //角色逻辑循环
            this.roleMgr.doRoleLogic();
            // Global.sortSpriteNode(this.RoleModelLayer as any);
        }

        /**
         * 战斗结束
         * @param isPlayerExit 表示玩家是否手动退出
         * @param useSerResult 是否用服务器计算的结果
         * */
        public endBattle(isPlayerExit = false, sendServer: boolean = true)
        {
            //只能结束一次
            if (this._isFinishBat && !isPlayerExit)
            {
                return;
            }
            // //日志打印
            // let tmpPrintStr = "\n==========================战斗日志S==============================";
            // for (let i = 0; i < this.batReport.length; i++) {
            //     tmpPrintStr += "\n" + this.batReport[i];
            // }
            // tmpPrintStr += "\n==========================战斗日志E==============================";
            // logI(tmpPrintStr);
            // var clientResulr = this.roleMgr.getClientBattleResult();
            this.clearplayBack();
            //记录完成得场次
            this.batFinishStages++;
            //非玩家主动操作
            if (!isPlayerExit)
            {

                // //是否胜利
                // let tmpBatResult = this.roleMgr.getBattleResult();
                if (this.getBattleType() == Pb_God._emBattleType.BattleType_Endless)
                {
                    var isExitBat = this.getBattleID() >= cfg.TrainEndlessCfgData.getMaxStage()
                    this.battle_Result_Close(isExitBat);
                } else
                {
                    //战斗结束需要弹出结算界面
                    this.battle_Result_Close();
                }
                // //无尽试炼逻辑继续战斗
                // if (this.getBattleType() == Pb_God._emBattleType.BattleType_Endless && tmpBatResult == Pb_God._emBattleResult.BattleResult_Sucess)
                // {
                //     var isExitBat = this.getBattleID() >= cfg.TrainEndlessCfgData.getMaxStage()
                //     this.battle_Result_Close(isExitBat);
                // }//其他直接退出战斗
                // else {
                //     //战斗结束需要弹出结算界面
                //     this.battle_Result_Close();
                // }
            }//玩家主动退出
            else
            {

                //强制退出
                if (!this.getBattleIsVideo() && sendServer)
                {
                    //无尽试炼当前关卡如果已经打完， 服务器需要将ID+1
                    let battleId = this.getBattleID();
                    if (this.getBattleType() == Pb_God._emBattleType.BattleType_Endless && this._isFinishBat) { battleId++; }
                    FightSend.exit(this.getBattleType(), battleId);
                }
                EventMgr.trigger(EventNotify.Battle_SelfExit, this.getBattleType());
                //重置战场
                this.stopLogic();
                //战斗结束
                BattleMgr.Inst.finishBat(this);
            }
            //这个放最后。
            this._isFinishBat = true;
        }

        //-------------------------------------------------------战斗结算---------------------------------------------------
        /**
         * 关闭结算界面
         * @param isCloseBattle 等于false表示只发送战斗结果，不结束战场
         **/
        public battle_Result_Close(isCloseBattle = true)
        {
            //获取我方剩余角色数据
            if (!this.getBattleIsVideo())
            {
                // FightSend.normalResult(this.batInfo.battlesn,tmpBatResult,tmpBatResult!=-1 && BatCfg.UseClientResult);
                FightSend.normalResult(this.batInfo.battlesn, 0, false);
            }
            //结束战斗
            if (isCloseBattle)
            {
                //重置战场
                this.stopLogic();
                //战斗结束
                BattleMgr.Inst.finishBat(this);
            }
            //新手引导期间自动激活一步
            //GuideMgr.Inst.getInGuide() && GuideMgr.Inst.nextActive();
        }

        /**
         * 重新开启战斗
         * */
        public battle_Result_Reset()
        {

            //重置战场
            this.stopLogic();

            //进入战斗模式
            this.startBattle();
        }

        //--------------------------------------------------------其他Event------------------------------------------------------
        /**
         * 场景放大尺寸
         */
        public scene_Scale_Changed_Called(toScale: number)
        {
            this.Scene.setShowScale(toScale);
        }

        /**
         * 动画加速
         */
        public scene_Speed_Changed_Called(toSpeed: number)
        {
            this.roleMgr.setActionSpeed(toSpeed);
        }

        /**
         * 回合切换
         */
        public role_Round_Change(currentRound: number)
        {
            this._currentRound = currentRound;
            if (!this.getBattleIsVideo())
            {
                //FightSend.updateRound(this.batInfo.battlesn,toRound);
            }
            if (this.isWatching)
            {
                BattleMgr.Inst.battleUI.role_Round_Change(currentRound);
                this.checkHevenStars_OnFightDoing();
            }
        }

        /**
         * UI战斗状态刷新
         */
        public ui_Statue_Change()
        {
            if (this.getBattleType() != Pb_God._emBattleType.BattleType_HeavenDungeon)
            {
                return;
            }
            if (this.isWatching)
            {
                //BattleMgr.Inst.battleUI.checkHevenStars_OnFightDoing();
                this.checkHevenStars_OnFightDoing();
            }
        }

        /**
         * 天界副本战斗开始检测星星状态
         */
        private checkHeavenStars_onFightBegin(): void
        {
            if (this.getBattleType() != Pb_God._emBattleType.BattleType_HeavenDungeon)
            {
                return;
            }
            let stageIndex = this.getBattleID();
            let stageCfg = cfg.HeavenStageCfgData.getInfo(stageIndex);
            let star_arr = cfg.HeavenStageCfgData.getStarConditionArray(stageCfg);
            let results = [];
            for (let i = 0; i < star_arr.length; i++)
            {
                let s_index = star_arr[i];
                let s_type = cfg.HeavenStarConditionCfgData.getTypeByIndex(s_index);
                let s_param = cfg.HeavenStarConditionCfgData.getParamsByIndex(s_index);
                //let img_star = this["img_star_" + (i + 1)] as Laya.Image;
                let is_meet = false;
                let isVaile = false; //是否有效
                switch (s_type)
                {
                    case Pb_God._emHeavenDungeonStarCondition.StarCondition_HeroTypeUnder:
                        {
                            let param_arr = cfg.ValueOneInfo.parse(s_param);
                            let count = this.getBattlePetTypeCount(param_arr[0].value1);
                            is_meet = count < param_arr[1].value1;
                            isVaile = true;
                        }
                        break;
                    case Pb_God._emHeavenDungeonStarCondition.StarCondition_HeroJobUnder:
                        {
                            let param_arr = cfg.ValueOneInfo.parse(s_param);
                            let count = this.getBattlePetJobCount(param_arr[0].value1);
                            is_meet = count < param_arr[1].value1;
                            isVaile = true;
                        }
                        break;
                    case Pb_God._emHeavenDungeonStarCondition.StarCondition_HeroTypeAtLeast:
                        {
                            let param_arr = cfg.ValueOneInfo.parse(s_param);
                            let count = this.getBattlePetTypeCount(param_arr[0].value1);
                            is_meet = count >= param_arr[1].value1;
                            isVaile = true;
                        }
                        break;
                    case Pb_God._emHeavenDungeonStarCondition.StarCondition_HeroJobAtLeast:
                        {
                            let param_arr = cfg.ValueOneInfo.parse(s_param);
                            let count = this.getBattlePetJobCount(param_arr[0].value1);
                            is_meet = count >= param_arr[1].value1;
                            isVaile = true;
                        }
                        break;
                    case Pb_God._emHeavenDungeonStarCondition.StarCondition_Formation:
                        is_meet = this.getBattlePetZhenfaId(true) == parseInt(s_param);
                        isVaile = true;
                        break;
                    default:
                        is_meet = false;
                        isVaile = false;
                        break;
                }
                //img_star.gray = !is_meet;
                let state = 0; //0-无改变 1-变亮 -1变灰
                if (isVaile) { state = is_meet ? 1 : -1; }
                results[i] = state;
            }
            BattleMgr.Inst.battleUI.refreshHeavenStars(results);
        }

        /** 天界副本关卡 战斗时 实时检测星星满足状态 */
        private checkHevenStars_OnFightDoing(): void
        {
            if (this.getBattleType() != Pb_God._emBattleType.BattleType_HeavenDungeon)
            {
                return;
            }
            let stageIndex = this.getBattleID();
            let stageCfg = cfg.HeavenStageCfgData.getInfo(stageIndex);
            let star_arr = cfg.HeavenStageCfgData.getStarConditionArray(stageCfg);
            let results = [];
            for (let i = 0; i < star_arr.length; i++)
            {
                let s_index = star_arr[i];
                let s_type = cfg.HeavenStarConditionCfgData.getTypeByIndex(s_index);
                let s_param = cfg.HeavenStarConditionCfgData.getParamsByIndex(s_index);
                //let img_star = this["img_star_" + (i + 1)] as Laya.Image;
                let state = 0;
                switch (s_type)
                {
                    case Pb_God._emHeavenDungeonStarCondition.StarCondition_Victory:
                        {
                            // //战斗胜利一直暗着就好
                            // let roleMgr = this.getRoleMgr();
                            // let is_win = roleMgr.getBattleResult() == Pb_God._emBattleResult.BattleResult_Sucess;
                            // is_meet = is_win;
                        }
                        break;
                    case Pb_God._emHeavenDungeonStarCondition.StarCondition_NoDeath:
                        {// 己方没有英雄死
                            let roleMgr = this.getRoleMgr();
                            let roles = roleMgr.getRolesWithType(true);
                            let dead_results = roles.filter(e => e.roleData.isDead());
                            state = dead_results.length == 0 ? 1 : -1;
                        }
                        break;
                    case Pb_God._emHeavenDungeonStarCondition.StarCondition_HPAbove:
                        {// 己方全部英雄百分比以上
                            let roleMgr = this.getRoleMgr();
                            let roles = roleMgr.getRolesWithType(true);
                            let percent = parseInt(s_param) / 100;
                            state = 1;
                            for (let e of roles)
                            {
                                let c_hp = e.roleData.getHp();
                                let max_hp = e.roleData.getMaxBlood();
                                let hp_percent = c_hp / max_hp;
                                if (hp_percent < percent)
                                {
                                    state = -1;
                                    break;
                                }
                            }
                        }
                        break;
                    case Pb_God._emHeavenDungeonStarCondition.StarCondition_TurnsUnder:
                        {
                            //战斗回合数
                            let turn_count = this.getInTrun();
                            state = parseInt(s_param) >= turn_count ? 1 : -1;
                        }
                        break;
                    default:
                        break;
                }

                results[i] = state;
            }
            BattleMgr.Inst.battleUI.refreshHeavenStars(results);
        }

        getInTrun(): number
        {
            return this._currentRound;
        }

        getMaxTrun(): number
        {
            return this._maxRound;
        }


        //-----------------------------------------------------------进入、离开---------------------------------------------------------
        /**
         * 进入战斗场景
         */
        public enterMapView(mapSp: Laya.Sprite)
        {

            //将地图层放置到战斗层
            if (mapSp != null)
            {
                this.Scene.addChildAt(mapSp, 0);
            }
            this.Scene.visible = true;
            this.Scene.scale(1, 1);
            this.Scene.pos(0, 0);
            LayerManager.Inst.sceneLayer.addChild(this.Scene);

        }

        /**
         * 是否正在观看本场战斗中
         */
        public setIsWatching(isShow: boolean)
        {
            if (this.isWatching == isShow)
            {
                return;
            }
            this.isWatching = isShow;

            //显示战斗场景
            if (!this.Scene.parent)
            {
                this.enterMapView(null);
            }
            this.Scene.visible = isShow;

            //刷新场景背景
            if (isShow)
            {
                let tmpBGUrl = ""
                if (this.getBattleType() == Pb_God._emBattleType.BattleType_Hook)
                {
                    tmpBGUrl = cfg.HookStageCfgData.getBgmapByStageID(HookDataMgr.getStageID());
                }

                if (!tmpBGUrl || tmpBGUrl.length < 1 || this.getBattleType() != Pb_God._emBattleType.BattleType_Hook)
                {
                    tmpBGUrl = cfg.BattleTypeCfgData.getBattleSceneByAttrType(this.getBattleType());
                }

                this._sceneBGLayer.skin = tmpBGUrl && tmpBGUrl.length > 0 ? Global.getFightBGPathWithResUrl(tmpBGUrl) : "";
            }
            else
            {
                if (this._sceneBGLayer.skin.length > 0)
                {
                    ResMgr.Inst.unloadWithUrl(this._sceneBGLayer.skin);
                    this._sceneBGLayer.skin = "";
                }
            }

            //刷新战斗UI
            if (isShow)
            {
                if (BattleMgr.Inst.battleUI == null)
                {
                    BattleMgr.Inst.battleUI = new Pro.BattleUI();

                    //这里做一下处理 兼容一下pad这种分辨率
                    BattleMgr.Inst.battleUI.x = GameConfig.curWidth() - GameConfig.WinWidth >> 1;
                }
                BattleMgr.Inst.battleUI.init(this);
                LayerManager.Inst.baseUILayer.addChild(BattleMgr.Inst.battleUI);
            }
            else if (BattleMgr.Inst.battleUI != null)
            {
                BattleMgr.Inst.battleUI.hide();
            }

            //设置角色可见状态
            this.roleMgr.setIsWatching(isShow);
        }

        /** 设置背景黑色动画 */
        public setBGBlackAction(isShow: boolean, alpha: number = 0.5)
        {
            if (isShow)
            {
                Laya.Tween.to(this._sceneBGBlackLayer, { alpha: alpha }, 100 / BattleMgr.Inst.getActionScale());
            }
            else
            {
                Laya.Tween.to(this._sceneBGBlackLayer, { alpha: 0 }, 100 / BattleMgr.Inst.getActionScale());
            }
        }

        //-------------------------------------------------------------开启战斗--------------------------------------------------------
        /**
         * 开始战斗
         */
        public startBattle(): void
        {

            this._defendSelfSkillIndex = 0;
            this._defendEnemySkillIndex = 0;
            this.defendSelfCd = {};
            this.defendEnemyCd = {};

            //重置战场结束状态
            this._isFinishBat = false;

            //创建战斗数据
            this.roleMgr.createBatTeam();

            //初始化控制器
            this.startLogic();

            //战斗界面刷新
            if (this.isWatching)
            {
                BattleMgr.Inst.battleUI.init(this);
                this.checkHeavenStars_onFightBegin();
                this.checkHevenStars_OnFightDoing();
            }
        }

        /** 创建英雄模型 */
        public createHero(battleType: Pb_God._emBattleType, isOwer: boolean): BaseAtker
        {
            //创建英雄数据
            let tempRole = RoleManager.getAttackRole();
            // this.skelLayer.addSkel(tempRole.sk);
            // this.RoleSDLayer.addChild(tempRole.shadeUI);
            // this.RoleModelLayer.addSkel(tempRole.skeletonPlayer)
            // this.RoleModelLayer.addSkel(tempRole)
            tempRole.setParent(this._roleModelLayer as any);

            //隐藏限时挑战boss的状态栏 因为它太TMD大了
            if (battleType == Pb_God._emBattleType.BattleType_ActivityBoss && !isOwer)
                tempRole.statueUI["specailHide"] = true;
            !tempRole.statueUI["specailHide"] && this.UIStatueLayer.addChild(tempRole.statueUI);
            //坐标限制
            // tempRole.pos(-100, -100);
            return tempRole;
        }

        public showFightRole()
        {
            this._roleLayer.visible = true;
            this.UIStatueLayer.visible = true;
        }


        public hideFightRole()
        {
            this._roleLayer.visible = false;
            this.UIStatueLayer.visible = false;
        }

        //-----------------------------------------------------战报--------------------------------------------

        public sharkScene(sharkValue: number)
        {
            if (this._earthquake == null)
            {
                this._earthquake = new Earthquake(this.Scene, 10, 200);
            }
            this._earthquake.updateIntensity(sharkValue * 10)
            this._earthquake.go();
        }

        ///--------------------------------------------------------


        private battlePlayData: Pb_God.PBFightPlayback;
        private _battlePlayBack: BattlePlayBack;

        /** 第一回合开始 */
        public role_Round_Start()
        {
            this.startPlayback();
        }

        public startPlayback()
        {
            if (this.battlePlayData && this._battlePlayBack)
            {
                this._battlePlayBack.startPlay()
            }
        }

        private onPlayComplete(): void
        {
            this.endBattle();
            this.clearplayBack();
        }

        public setPlayBackData(value: Pb_God.PBFightBase): void
        {
            this.battlePlayData = value.playback;
            this._battlePlayBack = new BattlePlayBack(this, value, new CallBack(this, this.onPlayComplete));
        }

        public clearplayBack()
        {
            if (this._battlePlayBack)
            {
                this._battlePlayBack.finish();
                this._battlePlayBack = null;
            }
        }

        public getRoleStat(unitId: number): Pb_God.PBFightUnitState
        {
            if (this._battlePlayBack)
            {
                return this._battlePlayBack.getRoleStat(unitId);
            }
            return null;
        }

        playWinAni()
        {
            if (this._battlePlayBack && this._battlePlayBack.isWin)
            {
                this.roleMgr.toPlayWinAni();
            }
        }

        dispose(): void
        {
            let a = 1;
        }

        release(): void
        {
            this.stopLoop();
            SkelAniInit.recyleSpine();
        }

        reset(): void
        {
            let a = 1;
        }
    }
}

