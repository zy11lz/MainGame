module Pro
{
    /**
    * 跨服竞技场挑战界面
    */
    export class CrossChallengeFightMediator extends BaseMediator implements IMediator
    {

        public UIPanel: ProUI.CrossChallenge.CrossChallengeFightUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        public openUI(): void
        {
            this.showPanel(ProUI.CrossChallenge.CrossChallengeFightUI, 3, BaseAddLayer.TopUI, true);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            Global.setResSmallIconWithItemID(this.UIPanel.imgIcon, parseInt(cfg.CrossChallengeConstantsCfgData.getFirstInfo().needItem.split("_")[0]))
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.refreshUI();
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.UIPanel.btnChallenge.onClick(this, this.onChallengeClick);
            this.UIPanel.btnEmbattle.onClick(this, this.onEmbattleClick);
            this.UIPanel.btnSkip.onClick(this, this.onSkipClick);

            this.addEventMgr(CmdEvent.CrossChallenge_SetTeamATK, this, this.refreshMyselfView);

        }

        private initNewTeam()
        {
            let isNew = false;
            for (let i = 0; i < 3; i++)
            {
                let tmpType = Pb_God._emZhenfaType.ZhenfaType_CrossChallengeATK1 + i;
                let tmpZhanFa = EmbattleDataMgr.getBuZhenInfo(tmpType);
                if (!tmpZhanFa)
                {
                    let tempZhenfaCfg = cfg.PetFormationCfgData.getDataList()[0];
                    EmbattleDataMgr.addNewBuZhen(tempZhenfaCfg.iD, tmpType, null);
                    isNew = true;
                }
                EmbattleDataMgr.switchCurBuZhen(tmpType);
            }
            return isNew;
        }

        /**
         * 默认给一套自动上阵的阵容
         */
        private initAutoTeam()
        {
            if (this.initNewTeam())
            {
                let petList = PetDataMgr.getPetList()
                for (let i = 0; i < 3; i++)
                {
                    let tmpType = Pb_God._emZhenfaType.ZhenfaType_CrossChallengeATK1 + i;
                    let tmpZhanFa = EmbattleDataMgr.getCurBuZhenInfoByType(tmpType);
                    tmpZhanFa.clearStore();

                    //挑选最强角色
                    let tmpStartIndex = 0;
                    let tmpBasePosAry = cfg.PetFormationCfgData.getPosAryById(tmpZhanFa.getZhenfaId());
                    // let tmpBasePetList = [].concat(this.TempPetList);
                    let tmpBasePetList = [];
                    let idmap = {};

                    //跨服竞技场不能有两个相同sn的精灵
                    let team_1 = EmbattleDataMgr.getCurBuZhenInfoByType(Pb_God._emZhenfaType.ZhenfaType_CrossChallengeATK1);
                    let team_2 = EmbattleDataMgr.getCurBuZhenInfoByType((Pb_God._emZhenfaType.ZhenfaType_CrossChallengeATK1 + 1));
                    let team_3 = EmbattleDataMgr.getCurBuZhenInfoByType((Pb_God._emZhenfaType.ZhenfaType_CrossChallengeATK1 + 2));

                    for (var hero of petList)
                    {
                        if (idmap[hero.id])
                        {
                            continue;
                        }
                        if (hero.isDefend) { continue; }
                        let tmp_hero_inTeam_1 = team_1 ? team_1.getStoredWithSameHeroSn(hero.sn) : null;
                        let tmp_hero_inTeam_2 = team_2 ? team_2.getStoredWithSameHeroSn(hero.sn) : null;
                        let tmp_hero_inTeam_3 = team_3 ? team_3.getStoredWithSameHeroSn(hero.sn) : null;

                        if (tmp_hero_inTeam_1 || tmp_hero_inTeam_2 || tmp_hero_inTeam_3)
                        {
                            continue;
                        }

                        // let hupaCheck1 = team_1 ? team_1.hupaCheck(hero.id) : null;
                        // let hupaCheck2 = team_2 ? team_2.hupaCheck(hero.id) : null;
                        // let hupaCheck3 = team_3 ? team_3.hupaCheck(hero.id) : null;

                        // if (hupaCheck1 || hupaCheck2 || hupaCheck3)
                        // {
                        //     continue;
                        // }
                        if (hero.id == CfgID.PetID.HuPa || hero.id == CfgID.PetID.HuPaLiberate)
                        {
                            idmap[CfgID.PetID.HuPa] = true;
                            idmap[CfgID.PetID.HuPaLiberate] = true;
                        }
                        else
                            idmap[hero.id] = true;

                        tmpBasePetList.push(hero);
                        if (tmpBasePetList.length >= 5)
                        {
                            break;
                        }
                    }

                    //自动上阵排序规则：
                    //先取出战斗力最高的5个单位， 再把这5个排序
                    //职业:坦克、战士、法师、辅助
                    //生命高到低
                    //防御高到低
                    tmpBasePetList.sort((a: Net.hero, b: Net.hero) =>
                    {
                        //先排职业
                        let tmpPetJobA = cfg.PetCfgData.getPetJobTypeByPetID(a.id);
                        let tmpPetJobB = cfg.PetCfgData.getPetJobTypeByPetID(b.id);
                        if (tmpPetJobA != tmpPetJobB) { return tmpPetJobA - tmpPetJobB; }
                        //再排生命值
                        let tmpPetBloodA = Global.getAtterValue(a.attr, Pb_God._emBattleAttribute.BattleAttribute_HPMax);
                        let tmpPetBloodB = Global.getAtterValue(b.attr, Pb_God._emBattleAttribute.BattleAttribute_HPMax);
                        if (tmpPetBloodA != tmpPetBloodB) { return tmpPetBloodB - tmpPetBloodA; }
                        //再排防御值
                        let tmpPetDefA = Global.getAtterValue(a.attr, Pb_God._emBattleAttribute.BattleAttribute_Defense);
                        let tmpPetDefB = Global.getAtterValue(b.attr, Pb_God._emBattleAttribute.BattleAttribute_Defense);
                        return tmpPetDefB - tmpPetDefA;
                    });
                    for (let i = 0; i < tmpBasePetList.length; i++)
                    {
                        let tmpPetInfo = tmpBasePetList[i];
                        let tmpPosIndex = tmpBasePosAry[tmpStartIndex].value1 - 1;
                        if (tmpZhanFa.setStoreIndex(tmpPosIndex, tmpPetInfo, false))
                        {
                            tmpStartIndex++;
                        }
                        if (tmpStartIndex >= tmpBasePosAry.length)
                        {
                            break;
                        }
                    }
                    EmbattleDataMgr.saveBuZhenInfoByType(tmpType, false);
                }
            }
        }

        private onChallengeClick()
        {
            // CrossChallengeSend.
            // logE("战斗相关协议还不确定");
            //发送战斗接口

            let enemy: Pb_God.PBCrossChallengeInfo = this.UIOpenData.customObject;
            BattleMgr.Inst.createNormalBat(Pb_God._emBattleType.BattleType_CrossChallege, enemy.id, enemy.robot ? 1 : 0, Pb_God._emZhenfaType.ZhenfaType_CrossChallengeATK1, this.UIPanel.imgFlag.visible);
            CrossChallengeDataMgr.result = [];
            this.closeUI();
        }

        private onEmbattleClick()
        {
            let enemy: Pb_God.PBCrossChallengeInfo = this.UIOpenData.customObject;
            let UIOpenData = new Pro.CrossChallengeEmbattleOpenUIData(Pb_God._emZhenfaType.ZhenfaType_CrossChallengeATK1);
            UIOpenData.lockEmCount = 3;
            UIOpenData.battleID = enemy.id
            UIOpenData.battleParam = enemy.robot ? 1 : 0;
            Pro.UIManager.Inst.forceOpen(UIOpenData);
        }

        private onSkipClick()
        {
            this.UIPanel.imgFlag.visible = !this.UIPanel.imgFlag.visible;
        }


        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }


        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            this.initAutoTeam();
            this.refreshEnemyView();
            this.refreshMyselfView();
        }

        private refreshEnemyView()
        {
            let enemy: Pb_God.PBCrossChallengeInfo = this.UIOpenData.customObject;
            this.UIPanel.enemyList["hideCount"] = 0;
            this.UIPanel.enemyList.onRefresh(3, this, this.onRenderEnemy)
            this.UIPanel.enemy.setPlayerDisplayInfo(enemy.display, false);
            this.UIPanel.lblEnemyName.text = `[S${ enemy.display.worldid }]${ enemy.display.playername }`;
            this.UIPanel.lblEnemyLv.text = `Lv.${ enemy.display.level }`;
            this.UIPanel.lblEnemyScore.text = Global.getLangStr("common_score", enemy.score);

        }

        private onRenderEnemy(itemUI: ProUI.CrossChallenge.CrossChallengeFightItemUI, index: number)
        {
            let enemy: Pb_God.PBCrossChallengeInfo = this.UIOpenData.customObject;

            itemUI.lblTeamName.text = Global.getLangStr("zhenfatype_name_0" + (index + 1))
            itemUI.btnChangeTeam.visible = false;

            let teamIdx = index + 1;
            let enemyTeam = enemy.team[`team${ teamIdx }`] as Pb_God.PBBattlePet;
            itemUI.lblPowera.text = enemyTeam.fightpower + "";
            let pets = enemyTeam.battlepet;
            let canHide = cfg.CrossChallengeConstantsCfgData.getCanHideCountByRank(enemy.order);
            let isHide = enemy.team[`hideteam${ teamIdx }`] && this.UIPanel.enemyList["hideCount"] < canHide;
            isHide && this.UIPanel.enemyList["hideCount"]++;
            itemUI.heroList.onRefresh(5, this, (item: Pro.NorItemUI, idx: number) =>
            {
                if (isHide)
                {
                    item.setEmptyInfo();
                    (item.getChildByName("hideFlag") as Laya.Image).visible = true
                }
                else
                {
                    (item.getChildByName("hideFlag") as Laya.Image).visible = false
                    if (pets[idx])
                        item.setPetInfo(PetDataMgr.shiftHeroInfo(pets[idx].pet), false);
                    else
                        item.setEmptyInfo();
                }

            });
        }

        private refreshMyselfView()
        {
            let myself: Pb_God.PBCrossChallengeInfo = this.UIOpenData.customObject2;
            this.UIPanel.previewList.onRefresh(3, this, this.onRenderMyself)
            this.UIPanel.myself.setPlayerDisplayInfo(myself.display, false);
            this.UIPanel.lblMyselfName.text = `[S${ myself.display.worldid }]${ myself.display.playername }`;
            this.UIPanel.lblMyselfLv.text = `Lv.${ myself.display.level }`;
            this.UIPanel.lblMyselfScore.text = Global.getLangStr("common_score", myself.score);
        }

        private setFightTeam()
        {
            let teams = [];
            for (let i = 0; i < 3; i++)
            {
                let zhenfaInfo = EmbattleDataMgr.getCurBuZhenInfoByType(Pb_God._emZhenfaType.ZhenfaType_CrossChallengeATK1 + i);
                let sendParam: Pb_God.PBPlayerZhenfaInfo = new Pb_God.PBPlayerZhenfaInfo();
                sendParam.type = zhenfaInfo.getTeamType();
                sendParam.id = zhenfaInfo.getZhenfaId();
                sendParam.posdata = zhenfaInfo.getPosData();
                sendParam.artifactid = zhenfaInfo.getArtifactId();
                teams.push(sendParam);
            }
            CrossChallengeSend.setTeamATK(teams, [false, false, false]);
        }

        private saveCurZhenfa()
        {
            EmbattleDataMgr.saveBuZhenInfoByType(Pb_God._emZhenfaType.ZhenfaType_CrossChallengeATK1, false);
            EmbattleDataMgr.saveBuZhenInfoByType((Pb_God._emZhenfaType.ZhenfaType_CrossChallengeATK1 + 1), false);
            EmbattleDataMgr.saveBuZhenInfoByType((Pb_God._emZhenfaType.ZhenfaType_CrossChallengeATK1 + 2), false);
        }

        private onRenderMyself(itemUI: ProUI.CrossChallenge.CrossChallengeFightItemUI, index: number)
        {
            let myself: Pb_God.PBCrossChallengeInfo = this.UIOpenData.customObject2;

            itemUI.lblTeamName.text = Global.getLangStr("zhenfatype_name_0" + (index + 1))
            itemUI.btnChangeTeam.visible = index > 0;

            let tmpType = Pb_God._emZhenfaType.ZhenfaType_CrossChallengeATK1 + index;
            itemUI.btnChangeTeam.onClick(this, () =>
            {
                let buzhenInfo = EmbattleDataMgr.getCurBuZhenInfoByType(tmpType);
                let lastBuzhenInfo = EmbattleDataMgr.getCurBuZhenInfoByType(tmpType - 1);
                let tmp = buzhenInfo;

                let tmpTeamType = buzhenInfo.getTeamType();

                tmp.setTeamType(lastBuzhenInfo.getTeamType());
                lastBuzhenInfo.setTeamType(tmpTeamType);

                EmbattleDataMgr.setCurBuZhenInfoByType(tmpType, lastBuzhenInfo);
                EmbattleDataMgr.setCurBuZhenInfoByType(tmpType - 1, tmp);
                this.saveCurZhenfa();
                this.setFightTeam();

            })

            // let teamIdx = index + 1;
            // let myselfTeam = myself.team[`team${ teamIdx }`] as Pb_God.PBBattlePet;
            // itemUI.lblPowera.text = myselfTeam.fightpower + "";
            // let pets = myselfTeam.battlepet;



            // itemUI.heroList.onRefresh(5, this, (item: Pro.NorItemUI, idx: number) =>
            // {
            //     if (pets[idx])
            //         item.setPetInfo(PetDataMgr.shiftHeroInfo(pets[idx].pet), false);
            //     else
            //         item.setEmptyInfo();
            // });


            let power = 0;
            itemUI.lblPowera.text = power + "";
            let zhenfaInfo = EmbattleDataMgr.getCurBuZhenInfoByType(tmpType);
            let posAry = zhenfaInfo.getPosAry();
            itemUI.heroList.onRefresh(5, this, (item: Pro.NorItemUI, idx: number) =>
            {
                let posCfgData = cfg.PetFormationCfgData.getPosAryById(zhenfaInfo.getZhenfaId());
                let posIndex = posCfgData[idx].value1
                //重新命名 阵法类型+位置idx
                item.name = zhenfaInfo.getTeamType() + "_" + (posIndex);
                if (posAry[posIndex - 1])
                {
                    let tmpHeroInfo = zhenfaInfo.getHeroByStorePosInfo(posAry[posIndex - 1]) as Net.hero;
                    if (tmpHeroInfo)
                    {
                        item.setPetInfo(tmpHeroInfo, false);
                        power += tmpHeroInfo.fightpower;
                        itemUI.lblPowera.text = power.toString();
                    }
                    else
                        item.setEmptyInfo();
                }
                else
                {
                    item.setEmptyInfo();
                }
            });
        }


    }
}