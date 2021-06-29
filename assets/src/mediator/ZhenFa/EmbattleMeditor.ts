module Pro
{
    /**
     * 布阵
     */
    export class EmbattleMeditor extends BaseMediator implements IMediator
    {
        public UIOpenData: EmbattleOpenUIData;

        public UIPanel: ProUI.Embattle.MainUI;

        /** 当前已解锁的英雄 */
        private TempPetList: Array<Net.hero>;

        /** 当前选择的英雄类型索引 */
        private TmpSelectHeroTypeIndex = 0;

        /** 阵法坐标索引 */
        private TmpZhenfaPosAry = [7, 4, 1, 8, 5, 2, 9, 6, 3];

        /** 不能同时存在的上阵精灵 */
        private NotCoexistPet = [
                             [CfgID.PetID.HuPa, CfgID.PetID.HuPaLiberate]
                             ];

        /** 需要自动加载的资源列表 */
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Embattle.MainUI, 3, BaseAddLayer.TopUI, true);
        }

        /**
         * 关闭UI
         */
        public closeUI(): void
        {

            this.closePanel(0);
            ZhenXingChangePanel.closeUI();
            ArtifactChoicePanel.closeUI();
            PetDataMgr.refreshOnStoreHeroForMainLine();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.tabGrpZhenfa.onRenderRefresh(this, this.onZhanfaRender);
            this.UIPanel.tabGrpZhenfa.hScrollBarSkin = "";

            this.UIPanel.ZhenxingBtn.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroZhenxing, EmbattleDataMgr.getCurBuZhenInfo().getZhenxingId()));
            });

            this.UIPanel.ArtifactBtn.onClick(this, this.onArtifactChangeClick);
            this.UIPanel.ChangZhenfaBtn.onClick(this, this.onZhenXingChangeClick);
            this.UIPanel.AutoStoreBtn.onClick(this, this.onAutoStoreOnClick);
            this.UIPanel.SaveZhenfaBtn.onClick(this, () =>
            {
                // 段位王者赛需要保存两个布阵
                if (this.UIOpenData.lockEmType == Pb_God._emZhenfaType.ZhenfaType_Duanwei && this.UIOpenData.lockEmCount > 1)
                {
                    EmbattleDataMgr.saveBuZhenInfoByType(Pb_God._emZhenfaType.ZhenfaType_Duanwei, true);
                    EmbattleDataMgr.saveBuZhenInfoByType(Pb_God._emZhenfaType.ZhenfaType_Duanwei2, false);
                } else
                {
                    EmbattleDataMgr.saveCurBuZhenInfo(true);
                }
            });
            this.UIPanel.StartBattleBtn.onClick(this, this.onStartBattleClick);
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(EventNotify.Embattle_Zhenxing_Changed, this, this.zhenXingChangedEvent);
            this.addEventMgr(EventNotify.Embattle_Artifact_Changed, this, this.artifactChangeEvent);
            EventMgr.on(CmdEvent.Defend_SavePlan_Ask, this, this.refreshDefendList);
            EventMgr.on(CmdEvent.Defend_UsePlan_Ask, this, this.refreshDefendList);
            this.UIPanel.itemBox_defend.on(Laya.Event.CLICK, this, this.openDefendPanel);
            this.addEventMgr(EventNotify.Pet_State_Chg, this, this.onPetChanged);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
            EventMgr.off(CmdEvent.Defend_SavePlan_Ask, this, this.refreshDefendList)
            EventMgr.off(CmdEvent.Defend_UsePlan_Ask, this, this.refreshDefendList);
            this.UIPanel.itemBox_defend.off(Laya.Event.CLICK, this, this.openDefendPanel);
            this.removeEventMgr(EventNotify.Pet_State_Chg, this, this.onPetChanged);
        }
        onPetChanged()
        {
            Laya.timer.once(100, this, this.refreshDefendList, [true]);
            this.refreshOnStoreList();
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.UIPanel.itemBox_defend.visible = PlayerDataMgr.checkSystemSwitchOpen(emSystemSwitchType.HeroDefend, false);
            this.refreshDefendList(null);
            this.UIPanel.HeroList.onRefresh(0, null, null); //这个代码不要删， 否则会有报错（下面设置spaceY的时候会启动组件的callLater:render, 而当前这个界面显示的英雄数量比上次的少时，会在回调中报错）
            this.UIPanel.HeroList.spaceY = this.UIOpenData.showBlood ? 10 : 2;  //要显示血条时，拉宽一点

            this.UIPanel.ArtifactBtn.visible = PlayerDataMgr.checkSystemSwitchOpen(emSystemSwitchType.Weapon);

            //出战限制
            if (this.UIOpenData.battleType == Pb_God._emBattleType.BattleType_HeavenDungeon &&
                cfg.HeavenStageCfgData.isBossStageByIndex(this.UIOpenData.battleID))
            {
                // 天界副本boss关 可上阵2支队伍
                this.UIPanel.ShowStatueLb.text = Global.getLangStr("fight_msg42");
                this.UIPanel.ShowStatueLb.color = "#ff3908";
            }
            else
            {
                //从列表选择英雄";
                this.UIPanel.ShowStatueLb.text = Global.getLangStr("fight_msg10");
                this.UIPanel.ShowStatueLb.color = "#71503f";
            }

            let reddotModels = null;
            //切换阵法
            let tabTitles: string[] = [];
            if (this.UIOpenData.lockEmType == 0)
            { //战前布阵，不指定阵法类型， 也无需切换阵法。
                tabTitles.push(Global.getLangStr("zhenfatype_name_0")); //队伍

                //出战队伍限制
                if (this.UIOpenData.battleType == Pb_God._emBattleType.BattleType_Element)
                {
                    let tmpNeedTypeInfo = cfg.ElementStageCfgData.getNeedPetTypeAryById(this.UIOpenData.battleID);
                    let tmpLockStr = Global.getLangStr("fight_msg11", tmpNeedTypeInfo.value2, Global.getLangStr("hero_type_name_" + tmpNeedTypeInfo.value1));
                    this.UIPanel.ShowStatueLb.text = tmpLockStr;
                }
                else if (this.UIOpenData.battleType == Pb_God._emBattleType.BattleType_HeavenDungeon)
                {
                    if (this.UIOpenData.lockEmCount == 2)
                    {
                        tabTitles.pop();
                        tabTitles.push(Global.getLangStr("zhenfatype_name_01"));
                        tabTitles.push(Global.getLangStr("zhenfatype_name_02"));
                    }
                }
            }
            else if (this.UIOpenData.lockEmType == -1)
            { //配置各防守阵容，可切换阵法配置。
                tabTitles.push("zhenfatype_name_1");
                tabTitles.push("zhenfatype_name_2");
                tabTitles.push("zhenfatype_name_3");
                tabTitles.push("zhenfatype_name_4");
                tabTitles.push("zhenfatype_name_5");
                reddotModels = [ArtifactDataMgr.reddotModelEmbattle];
            }
            else if (this.UIOpenData.lockEmCount > 1)
            { //指定阵法配置（同一个阵法多个队伍, 极少数情况下用到）
                for (let i = 1; i <= this.UIOpenData.lockEmCount; i++)
                {
                    tabTitles.push("zhenfatype_name_0" + i); //队伍1、队伍2...
                }
            }
            else
            { //指定阵法配置，仅做保存即可。
                tabTitles.push(Global.getLangStr("zhenfatype_name_" + this.UIOpenData.lockEmType));
            }

            let tabDatas: component.UITabData[] = [];
            for (let str of tabTitles)
            {
                tabDatas.push(new component.UITabData(str));
            }
            this.UIPanel.tabGrpZhenfa.onClick(this, this.onZhenFaTabClick,
                tabDatas, [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]
            );
            if (reddotModels)
            {
                this.UIPanel.tabGrpZhenfa.setRedDotModelList(reddotModels);
            }

            // TODO 策划要求一键上阵必须显示
            // this.UIPanel.AutoStoreBtn.visible = this.UIOpenData.lockEmType != 0;
            this.UIPanel.SaveZhenfaBtn.visible = this.UIOpenData.lockEmType != 0;
            this.UIPanel.StartBattleBtn.visible = this.UIOpenData.lockEmType == 0;

            //清空缓存布阵
            EmbattleDataMgr.clearCurBuZhen();

            //其他
            this.refreshHeroType();
            this.UIPanel.tabGrpZhenfa.setSelectTab(0);
        }

        public refreshUI()
        {
            this.UIPanel.tabGrpZhenfa.activeCurrentTab();
        }

        //-------------------------------自动上阵------------------------------
        /** 自动上阵 */
        private onAutoStoreOnClick()
        {

            //清空队列
            let tmpZhanFa = EmbattleDataMgr.getCurBuZhenInfo();
            tmpZhanFa.clearStore();

            //挑选最强角色
            let tmpStartIndex = 0;
            let tmpBasePosAry = cfg.PetFormationCfgData.getPosAryById(tmpZhanFa.getZhenfaId());
            // let tmpBasePetList = [].concat(this.TempPetList);
            let tmpBasePetList = [];
            let idmap = {};
            for (var hero of this.TempPetList)
            {
                if (idmap[hero.id]) { continue; }
                if (hero.isDefend) { continue; }
                if (this.checkCoexist(hero,tmpBasePetList)) {continue; }
                idmap[hero.id] = true;
                tmpBasePetList.push(hero);
                if (tmpBasePetList.length >= 5) { break; }
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

            //刷新UI
            this.refreshUI();
        }

        /**校验共存精灵 */
        private checkCoexist(hero: Net.hero,tmpBasePetList: Net.hero[]): boolean
        {
            let coexistPets = [];
            for (let petArr of this.NotCoexistPet) {
                for (let petID of petArr) {
                    if(petID == hero.id)
                    {
                        coexistPets = petArr;
                    }
                }
            }
            if(coexistPets.length == 0)return false;

            for (let heroInfo of tmpBasePetList) {
                if(coexistPets.indexOf(heroInfo.id) != -1 && coexistPets.indexOf(hero.id) != -1)
                {
                    return true;
                }
            }
            return false;
        }

        /** 开启战斗 */
        private onStartBattleClick()
        {

            if (this.UIOpenData.battleType == Pb_God._emBattleType.BattleType_HeavenDungeon &&
                cfg.HeavenStageCfgData.isBossStageByIndex(this.UIOpenData.battleID))
            {

                // 天界副本boss关卡 存储2支队伍信息
                EmbattleDataMgr.saveBuZhenInfoByType(Pb_God._emZhenfaType.ZhenfaType_Heaven1, true);
                EmbattleDataMgr.saveBuZhenInfoByType(Pb_God._emZhenfaType.ZhenfaType_Heaven2, false);

                // 只布阵了一支队伍检测
                let teamInfo_2 = EmbattleDataMgr.getBuZhenInfo(Pb_God._emZhenfaType.ZhenfaType_Heaven2);
                if (!teamInfo_2 || teamInfo_2.getPosData().length == 0)
                {
                    AlertShow.showConfirmAlert(Global.getLangStr("fight_msg44"), this, () =>
                    {
                        let tmp_teamType = Pb_God._emZhenfaType.ZhenfaType_Heaven1;
                        BattleMgr.Inst.createNormalBat(this.UIOpenData.battleType, this.UIOpenData.battleID, this.UIOpenData.battleParam, tmp_teamType);
                    });
                }// 布阵两支队伍 直接开始战斗
                else
                {
                    let tmp_teamType = Pb_God._emZhenfaType.ZhenfaType_Heaven1;
                    BattleMgr.Inst.createNormalBat(this.UIOpenData.battleType, this.UIOpenData.battleID, this.UIOpenData.battleParam, tmp_teamType);
                }
                return;
            }

            //出战队伍限制
            if (this.UIOpenData.lockEmType == 0)
            {
                if (this.UIOpenData.battleType == Pb_God._emBattleType.BattleType_Element)
                {
                    let tmpNeedTypeInfo = cfg.ElementStageCfgData.getNeedPetTypeAryById(this.UIOpenData.battleID);
                    let tmpHaveTypeNum = EmbattleDataMgr.getCurBuZhenInfo().getPetTypeNum(tmpNeedTypeInfo.value1);
                    if (tmpHaveTypeNum < tmpNeedTypeInfo.value2)
                    {
                        TipsUtils.showTips(this.UIPanel.ShowStatueLb.text);
                        return;
                    }
                }
            }

            //保存阵法
            if (!EmbattleDataMgr.saveCurBuZhenInfo(false))
            {
                return;
            }

            //发送战斗接口
            if (this.UIOpenData.battleType == Pb_God._emBattleType.BattleType_Hook)
            {
                BattleMgr.Inst.createHungBattle();
            }
            else
            {
                let tmpTeamType = EmbattleDataMgr.getCurBuZhenInfo().getTeamType();
                let battleParam = this.UIOpenData.battleParam;
                //天界副本服务器需要知道阵法ID （疾风阵等。）
                if (this.UIOpenData.battleType == Pb_God._emBattleType.BattleType_HeavenDungeon)
                {
                    battleParam = EmbattleDataMgr.getCurBuZhenInfo().getZhenfaId();
                }
                BattleMgr.Inst.createNormalBat(this.UIOpenData.battleType, this.UIOpenData.battleID, battleParam, tmpTeamType);
            }
        }

        //--------------------------------阵法改变------------------------------
        /** 打开阵型切换界面 */
        private onZhenXingChangeClick()
        {
            ZhenXingChangePanel.initUI(EmbattleDataMgr.getCurBuZhenInfo().getZhenfaId());
        }

        /** 阵型变化 */
        private zhenXingChangedEvent(newid: number)
        {
            let tmpZhanFa = EmbattleDataMgr.getCurBuZhenInfo();
            if (tmpZhanFa.getZhenfaId() != newid)
            {
                tmpZhanFa.switchZhenfaId(newid);
            }
            this.refreshUI();
        }

        //-------------------------------神器改变--------------------------------
        private onArtifactChangeClick()
        {
            ArtifactChoicePanel.initUI(EmbattleDataMgr.getCurBuZhenInfo().getArtifactId());
        }

        private artifactChangeEvent(newid: number)
        {
            let tmpZhanFa = EmbattleDataMgr.getCurBuZhenInfo();
            if (tmpZhanFa.getArtifactId() != newid)
            {
                tmpZhanFa.switchArtifactId(newid);
            }

            this.refreshUI();
        }

        //--------------------------------选择英雄类型---------------------------
        /** 刷新英雄类型 */
        private refreshHeroType()
        {
            let heroTypeNum = 1 + Pb_God._emPetType.PetType_Moon;
            this.UIPanel.HeroTypeBox.onRefresh(heroTypeNum, this, (itemUI: component.UIButton, index: number) =>
            {
                Global.setResPetType(itemUI, index);
                itemUI.onClick(this, this.onHeroTypeClick);

                if (index == 0)
                {
                    this.onHeroTypeClick(itemUI);
                }
            });
        }

        /** 选择一个英雄类型 */
        private onHeroTypeClick(btn: component.UIButton)
        {
            this.UIPanel.HeroTypeSelectImg.x = btn.x;
            this.UIPanel.HeroTypeSelectImg.y = btn.y;
            this.TmpSelectHeroTypeIndex = parseInt(btn.name);
            this.refreshPetsLayer();
        }

        //--------------------------------切换阵法--------------------------------
        /** 切换阵法 */
        private onZhenFaTabClick(tab: component.UITab, index: number, oldIndex: number)
        {

            //当前操作布阵类型
            let tmpTeamType = 0;
            if (this.UIOpenData.lockEmType == 0)
            {
                tmpTeamType = Pb_God._emZhenfaType.ZhenfaType_Zhuxian;
                /*通天塔改用主线if (this.UIOpenData.battleType == Pb_God._emBattleType.BattleType_Tower) {
                    tmpTeamType = Pb_God._emZhenfaType.ZhenfaType_Tower;
                }
                else */if (this.UIOpenData.battleType == Pb_God._emBattleType.BattleType_Endless)
                {
                    tmpTeamType = Pb_God._emZhenfaType.ZhenfaType_Endless;
                }
                else if (this.UIOpenData.battleType == Pb_God._emBattleType.BattleType_Expedition)
                {
                    tmpTeamType = Pb_God._emZhenfaType.ZhenfaType_Expedition;
                }
                else if (this.UIOpenData.battleType == Pb_God._emBattleType.BattleType_HeavenDungeon)
                {// 天界副本
                    tmpTeamType = Pb_God._emZhenfaType.ZhenfaType_Heaven1 + index;
                }
            }
            else if (this.UIOpenData.lockEmType > 0)
            {
                tmpTeamType = this.UIOpenData.lockEmType + index;
            }
            else if (this.UIOpenData.lockEmType == -1)
            {
                tmpTeamType = Pb_God._emZhenfaType.ZhenfaType_Zhuxian + index;
            }

            //提示开启条件
            let tmpNeedLockLevel = cfg.PetFormationTypeCfgData.getNeedLevelByType(tmpTeamType);
            if (PlayerDataMgr.level < tmpNeedLockLevel)
            {
                index != oldIndex && this.UIPanel.tabGrpZhenfa.setSelectTab(oldIndex);
                TipsUtils.showTipsByLanId("system_msg1", tmpNeedLockLevel);
                return;
            }

            //解锁新阵法
            if (EmbattleDataMgr.getBuZhenInfo(tmpTeamType) == null)
            {
                let tempZhenfaCfg = cfg.PetFormationCfgData.getDataList()[0];
                // 天界副本boss关第二队默认数据为空
                let zhenFaPosData: Pb_God.PBPlayerZhenfaPos[] = tmpTeamType == Pb_God._emZhenfaType.ZhenfaType_Heaven2 ? [] : null;
                EmbattleDataMgr.addNewBuZhen(tempZhenfaCfg.iD, tmpTeamType, zhenFaPosData);
            }

            //切换操作阵法
            EmbattleDataMgr.switchCurBuZhen(tmpTeamType);
            Global.setResPetZhengfa(this.UIPanel.ZhenfaImg, EmbattleDataMgr.getCurBuZhenInfo().getZhenfaId());

            //设置神器ID
            let tmpArtifactID = EmbattleDataMgr.getCurBuZhenInfo().getArtifactId();
            this.UIPanel.ArtifactIconImg.skin = "";
            this.UIPanel.ArtifactStatueImg.visible = tmpArtifactID == 0;
            //第一个神器有激活，就亮起红点
            let firstArtifact = ArtifactDataMgr.getInfo(1);
            this.UIPanel.imgArtifactReddot.visible = ArtifactDataMgr.hasNewArtifact() ||
                (tmpArtifactID == 0 && firstArtifact && firstArtifact.isactive);
            // this.UIPanel.imgArtifactReddot.visible = ArtifactDataMgr.reddotModelEmbattle.isRedDot;

            tmpArtifactID > 0 && Global.setResIconWithItemID(this.UIPanel.ArtifactIconImg, CfgID.ResType.ArtifactHead, tmpArtifactID);

            //远征战斗中需要删除死亡英雄
            if (this.UIOpenData.showBlood)
            {
                let tmpBuZhenInfo = EmbattleDataMgr.getCurBuZhenInfo();
                tmpBuZhenInfo.getPosAry().forEach(element =>
                {
                    if (element != null)
                    {
                        let hero = tmpBuZhenInfo.getHeroByStorePosInfo(element);
                        let heroHpRate = 0;
                        let supportType = 0;
                        if (this.UIOpenData.battleType == Pb_God._emBattleType.BattleType_Expedition)
                        {
                            supportType = Pb_God._emFriendSupportType.FriendSupportType_Expedition;
                            heroHpRate = ExpeditionDataMgr.getPetHpRate(hero);
                        }
                        else if (this.UIOpenData.battleType == Pb_God._emBattleType.BattleType_TeamCampaign)
                        {
                            supportType = Pb_God._emFriendSupportType.FriendSupportType_TeamCampaign;
                            heroHpRate = TeamCampaignDataMgr.getPetHpRate(hero)
                        }
                        //如果是增援英雄，还需要判断是否可以重复上阵
                        if (element.friendid &&
                            !cfg.CommonSupportCfgData.getCanUseAgainByType(supportType) &&
                            FriendDataMgr.isUseHiredSupportHero(supportType, element.petsn))
                        {
                            tmpBuZhenInfo.removeStore(element.petsn);
                        } else if (heroHpRate <= 0)
                        {
                            tmpBuZhenInfo.removeStore(element.petsn);
                        }
                    }
                });
            }

            //重置拖拽
            this.controlOnStoreEffect(false);
            this.endDragForItem();

            //刷新列表
            this.refreshOnStoreList();
            this.refreshPetsLayer();
        }

        /** 阵法item刷新 */
        private onZhanfaRender(tempUI: component.UIButton, index: number)
        {
            let tmpZhenfaType = Pb_God._emZhenfaType.ZhenfaType_Zhuxian + index;
            tempUI.gray = PlayerDataMgr.level < cfg.PetFormationTypeCfgData.getNeedLevelByType(tmpZhenfaType);
        }

        //--------------------------------英雄列表--------------------------------
        /** 刷新当前拥有的角色状态 */
        private refreshPetsLayer()
        {
            let zheninfo = EmbattleDataMgr.getCurBuZhenInfo();
            PetDataMgr.refreshOnStoreHeroWithZhenfa(zheninfo);
            this.TempPetList = PetDataMgr.getPetList(this.TmpSelectHeroTypeIndex);
            let supportList = this.getFriendSupportHeroList(this.TmpSelectHeroTypeIndex, zheninfo);
            if (supportList && supportList.length > 0)
            {
                this.TempPetList = supportList.concat(this.TempPetList);
            }
            this.UIPanel.HeroList.onRefresh(this.TempPetList.length, this, this.onHeroListRender);
        }

        /** 根据当前出战类型与英雄类型分类，获取好友增援的英雄列表 */
        private getFriendSupportHeroList(petType: Pb_God._emPetType = 0, buzhenInfo: Net.BuZhenInfo): Net.hero[]
        {
            if (this.UIOpenData.lockEmType != 0) { return null; } //只有战前布阵
            let supportType = -1;
            if (this.UIOpenData.battleType == Pb_God._emBattleType.BattleType_Endless)
            { //无尽试炼
                supportType = Pb_God._emFriendSupportType.FriendSupportType_Endless;
            }
            else if (this.UIOpenData.battleType == Pb_God._emBattleType.BattleType_Expedition)
            { //英雄远征;
                supportType = Pb_God._emFriendSupportType.FriendSupportType_Expedition;
            }
            else if (this.UIOpenData.battleType == Pb_God._emBattleType.BattleType_TeamCampaign)
            { //组队战斗;
                supportType = Pb_God._emFriendSupportType.FriendSupportType_TeamCampaign;
            }
            if (supportType < 0) { return null; }
            let heros = FriendDataMgr.getHiredSupportHeroList(supportType, true);
            for (let hero of heros)
            {
                //刷新上阵状态
                hero.onStore = buzhenInfo.isOnStoreIndex(hero.sn) >= 0;
            }
            return heros;
        }

        /** 刷新状态 */
        private onHeroListRender(item: NorItemUI, index: number): void
        {
            let tmpHeroInfo = this.TempPetList[index] as Net.hero;
            item.setPetInfo(tmpHeroInfo, false);
            item.SelectStatueImg.visible = tmpHeroInfo.onStore;
            item.onHold(this, this.onHeroListSelect);
            item.BloodBgImg.visible = this.UIOpenData.showBlood;

            let bol: boolean = tmpHeroInfo.isDefend;
            item.setLockImgVisible(bol, tmpHeroInfo)

            //显示血量
            if (this.UIOpenData.showBlood)
            {
                let tmpHpPro = 1;
                if (this.UIOpenData.battleType == Pb_God._emBattleType.BattleType_Expedition)
                {
                    tmpHpPro = ExpeditionDataMgr.getPetHpRate(tmpHeroInfo);
                }
                else if (this.UIOpenData.battleType == Pb_God._emBattleType.BattleType_TeamCampaign)
                {
                    tmpHpPro = TeamCampaignDataMgr.getPetHpRate(tmpHeroInfo);
                }
                item.setBloodProgress(tmpHpPro);
                item.DieImg.visible = tmpHpPro == 0;
                item.BloodBgImg.visible = !item.DieImg.visible;
                if (tmpHpPro == 0)
                {
                    item.onHold(null, null);
                }
            }
        }

        /** 选择英雄列表的目标 */
        private onHeroListSelect(item: NorItemUI, statue: boolean)
        {
            let index = parseInt(item.name);
            let tempPetInfo = this.TempPetList[index];
            //开始长按
            if (statue == true)
            {
                if (!tempPetInfo.supportMePlayerId) { CommonSend.queryPetView(PlayerDataMgr.uid, PlayerDataMgr.worldid, tempPetInfo.sn, 0, 0); }
                return;
            }//取消长按
            else if (statue == false)
            {
                return;
            }
            if (tempPetInfo.isDefend)
            {
                AlertShow.showConfirmAlert(Global.getLangStr("HeroDefendMsg8"), this, () =>
                {
                    Pro.DefendSend.removePet(tempPetInfo.sn);
                })
                return;
            }

            //普通点击
            let buzhenInfo = EmbattleDataMgr.getCurBuZhenInfo();
            if (tempPetInfo.onStore)
            {
                if (this.UIOpenData.battleType == Pb_God._emBattleType.BattleType_HeavenDungeon &&
                    cfg.HeavenStageCfgData.isBossStageByIndex(this.UIOpenData.battleID))
                {
                    // 天界副本boss关 删除角色单独处理
                    if (tempPetInfo.onStoreTeam != buzhenInfo.getTeamType())
                    {
                        // 要删除的角色不在当前页签内 切换到对应页签
                        if (this.UIPanel.tabGrpZhenfa.tabIndex == 0)
                        { this.UIPanel.tabGrpZhenfa.setSelectTab(1); }
                        else
                        { this.UIPanel.tabGrpZhenfa.setSelectTab(0); }
                    }
                    buzhenInfo = EmbattleDataMgr.getCurBuZhenInfo();
                }

                tempPetInfo.onStore = false;
                buzhenInfo.removeStore(tempPetInfo.sn);

            }
            else
            {
                if (this.UIOpenData.battleType == Pb_God._emBattleType.BattleType_HeavenDungeon &&
                    cfg.HeavenStageCfgData.isBossStageByIndex(this.UIOpenData.battleID))
                {
                    // 天界副本boss关 两个队伍不可以有相同英雄
                    let team_1 = EmbattleDataMgr.getCurBuZhenInfoByType(Pb_God._emZhenfaType.ZhenfaType_Heaven1);
                    let team_2 = EmbattleDataMgr.getCurBuZhenInfoByType(Pb_God._emZhenfaType.ZhenfaType_Heaven2);
                    let tmp_hero_inTeam_1 = team_1 ? team_1.getStoredWithSameHeroID(tempPetInfo.id) : null;
                    let tmp_hero_inTeam_2 = team_2 ? team_2.getStoredWithSameHeroID(tempPetInfo.id) : null;
                    if (tmp_hero_inTeam_1 || tmp_hero_inTeam_2)
                    {
                        TipsUtils.showTipsByLanId("fight_msg43");
                        return;
                    }
                } else if (this.UIOpenData.lockEmType == Pb_God._emZhenfaType.ZhenfaType_Duanwei && this.UIOpenData.lockEmCount > 1)
                {
                    // 段位赛王者赛布阵
                    let team_1 = EmbattleDataMgr.getCurBuZhenInfoByType(Pb_God._emZhenfaType.ZhenfaType_Duanwei);
                    let team_2 = EmbattleDataMgr.getCurBuZhenInfoByType(Pb_God._emZhenfaType.ZhenfaType_Duanwei2);
                    let tmp_hero_inTeam_1 = team_1 ? team_1.getStoredWithSameHeroID(tempPetInfo.id) : null;
                    let tmp_hero_inTeam_2 = team_2 ? team_2.getStoredWithSameHeroID(tempPetInfo.id) : null;
                    if (tmp_hero_inTeam_1 || tmp_hero_inTeam_2)
                    {
                        TipsUtils.showTipsByLanId("fight_msg43");
                        return;
                    }
                }
                //新手引导时指定上阵位置
                let targetPos = -1;
                let guideStep = GuideMgr.Inst.getInStep();
                if (guideStep == GuideStep.FirstFight_4_3) { targetPos = 3; }
                if (guideStep == GuideStep.SecondFight_8_3) { targetPos = 5; }
                if (guideStep == GuideStep.ThirdFight_11_3) { targetPos = 6; }
                // if(targetPos > 0 && buzhenInfo.getPosData)
                if (buzhenInfo.setStoreIndex(targetPos, tempPetInfo))
                {
                    tempPetInfo.onStore = true;
                }
            }

            this.refreshOnStoreList();
            this.refreshPetsLayer();
        }

        //----------------------------------副本英雄上阵列表------------------------------
        /** 刷新上阵列表 */
        private refreshOnStoreList()
        {

            let tmpBuZhenPower = 0;
            this.UIPanel.ZhanliLb.text = tmpBuZhenPower.toString();

            let tmpBuZhenInfo = EmbattleDataMgr.getCurBuZhenInfo();
            let tmpBasePosAry = cfg.PetFormationCfgData.getPosAryById(tmpBuZhenInfo.getZhenfaId());
            this.UIPanel.HeroOnStory.onRefresh(9, this, (item: NorItemUI, index: number) =>
            {

                //站立位置
                let storeIndex = this.TmpZhenfaPosAry[index];

                //重新命名
                item.name = storeIndex.toString();

                //是否上阵角色
                let tempPosInfo = tmpBuZhenInfo.getPosAry()[storeIndex - 1];
                let tempStored = tempPosInfo != null;

                //图标显示
                if (tempStored)
                {
                    let tmpHeroInfo: Net.hero = tmpBuZhenInfo.getHeroByStorePosInfo(tempPosInfo);
                    if (tmpHeroInfo && !tmpHeroInfo.isDefend)
                    {
                        item.setPetInfo(tmpHeroInfo, false);
                        tmpBuZhenPower += tmpHeroInfo.fightpower;
                        this.UIPanel.ZhanliLb.text = tmpBuZhenPower.toString();
                    }
                    else
                    {   //有阵法信息，却没有英雄信息，可能是英雄已经融掉了，或者被合成了吧。
                        item.setEmptyInfo();
                        tmpBuZhenInfo.removeStoreByIndex(storeIndex - 1);
                    }
                }
                else
                {
                    item.setEmptyInfo();
                }

                //是否可以拖动
                item.onClick(this, tempStored ? this.onBattleListSelect : null, tempStored, this.UIPanel.HeroDragEff);
                item.IconImg.visible = tempStored;
            });
            this.UIPanel.HeroStoryBGBox.onRefresh(9, this, (img: component.UIFrameImage, index: number) =>
            {

                //站立位置
                let storeIndex = this.TmpZhenfaPosAry[index];

                //是否上阵角色
                let tempPosInfo = tmpBuZhenInfo.getPosAry()[storeIndex - 1];
                let tempStored = tempPosInfo != null;

                //图标显示
                if (!tempStored)
                {
                    img.frame = tmpBasePosAry.filter(elment => elment.value1 == storeIndex).length > 0 ? 2 : 1;
                }
            });

            //出战队伍限制
            if (this.UIOpenData.lockEmType == 0)
            {
                if (this.UIOpenData.battleType == Pb_God._emBattleType.BattleType_Element)
                {
                    let tmpNeedTypeInfo = cfg.ElementStageCfgData.getNeedPetTypeAryById(this.UIOpenData.battleID);
                    let tmpHaveTypeNum = EmbattleDataMgr.getCurBuZhenInfo().getPetTypeNum(tmpNeedTypeInfo.value1);
                    this.UIPanel.ShowStatueLb.color = tmpHaveTypeNum < tmpNeedTypeInfo.value2 ? "#ff0000" : "#71503f";
                }
            }

            //阵型刷新
            Global.setResPetZhengxing(this.UIPanel.ZhenxingBtn, EmbattleDataMgr.getCurBuZhenInfo().getZhenxingId());
        }

        /** 选择上阵列表的目标 */
        private onBattleListSelect(item: NorItemUI, isDrag: boolean)
        {
            let index = parseInt(item.name) - 1;

            //开始拖拽
            if (isDrag == true)
            {
                let tmpBuZhenInfo = EmbattleDataMgr.getCurBuZhenInfo();
                let tempStorePosInfo = tmpBuZhenInfo.getPosAry()[index];
                let tempHeroInfo = tmpBuZhenInfo.getHeroByStorePosInfo(tempStorePosInfo);
                this.startDragForItem(tempHeroInfo, item);
                this.controlOnStoreEffect(true);
            }//拖拽结束
            else if (isDrag == false)
            {
                //结束拖拽
                this.endDragForItem();

                //当前选择的阵法
                let tmpBuZhenInfo = EmbattleDataMgr.getCurBuZhenInfo();

                //交换位置
                let tmpSel = this.dragEffMove_Called(false);
                if (tmpSel >= 0 && tmpSel != index)
                {
                    tmpBuZhenInfo.exChangeStore(tmpSel, index);
                }
                else if (tmpSel == -1)
                {
                    tmpBuZhenInfo.removeStoreByIndex(index);
                }
                this.refreshOnStoreList();
                this.refreshPetsLayer();
                this.controlOnStoreEffect(false);
            }//点击事件
            else
            {

                let tmpBuZhenInfo = EmbattleDataMgr.getCurBuZhenInfo();
                tmpBuZhenInfo.removeStoreByIndex(index);

                this.refreshOnStoreList();
                this.refreshPetsLayer();
                this.controlOnStoreEffect(false);
            }
        }

        //-----------------------------------------上阵效果------------------------------------------------
        /**
         * 控制上阵列表中的效果
         */
        private controlOnStoreEffect(show: boolean)
        {
            this.UIPanel.HeroOnEff.visible = show;
        }

        // /** 创建 */
        // private createHeroBattleEff(tempSp: Laya.Sprite, show: boolean) {
        //     Laya.Tween.clearAll(tempSp);
        //     if (show) {
        //         let fadeOut = () => {
        //             Laya.Tween.to(tempSp, { alpha: 0 }, 400, Laya.Ease.linearIn, Laya.Handler.create(this, () => {
        //                 fadeIn();
        //             }));
        //         };

        //         let fadeIn = () => {
        //             Laya.Tween.to(tempSp, { alpha: 1 }, 400, Laya.Ease.linearIn, Laya.Handler.create(this, () => {
        //                 fadeOut();
        //             }));
        //         };

        //         tempSp.alpha = 1;
        //         fadeOut();
        //     }
        // }

        //------------------------------------------拖拽事件-----------------------------------------------------
        private startDragForItem(tmpHeroInfo: Net.hero, item: NorItemUI)
        {
            let itemPos = item.localToGlobal(new Laya.Point(item.width / 2, item.height / 2)); itemPos.y -= GameConfig.WinCenterY / 2;
            this.UIPanel.HeroDragEff.pos(itemPos.x - this.UIPanel.x, itemPos.y - this.UIPanel.y);
            this.UIPanel.HeroDragEff.visible = true;

            this.UIPanel.HeroDragEff.setPetInfo(tmpHeroInfo, false);

            this.UIPanel.HeroDragEff.on(Laya.Event.MOUSE_MOVE, this, this.dragEffMove_Called);

            this.dragEffMove_Called();
        }

        private endDragForItem()
        {

            this.UIPanel.HeroDragEff.off(Laya.Event.MOUSE_MOVE, this, this.dragEffMove_Called);
            this.UIPanel.HeroDragEff.visible = false;
        }

        private dragEffMove_Called(showEff = true): number
        {

            let tmpDragItem = this.UIPanel.HeroDragEff as Laya.Sprite;
            let dragPos = tmpDragItem.localToGlobal(new Laya.Point(tmpDragItem.width / 2, tmpDragItem.height / 2));

            let tmpStoryLayer = this.UIPanel.HeroOnStory.ContentLayer;
            let tempIndex = -1;
            for (let i = 0; i < tmpStoryLayer.numChildren; i++)
            {
                let tempSp = tmpStoryLayer.getChildAt(i) as Laya.Sprite;
                if (tempSp.hitTestPoint(dragPos.x, dragPos.y))
                {

                    //当前选择的位置
                    tempIndex = parseInt(tempSp.name) - 1;

                    //阵法位置限制
                    let tmpBuZhenInfo = EmbattleDataMgr.getCurBuZhenInfo();
                    let tmpBasePosAry = cfg.PetFormationCfgData.getPosAryById(tmpBuZhenInfo.getZhenfaId());
                    // var arr = tmpBasePosAry.filter(
                    //     (element) =>
                    //     {
                    //         element.value1 == tempIndex + 1
                    //     }
                    // )
                    var cnt = 0;
                    for (let index = 0; index < tmpBasePosAry.length; index++)
                    {
                        const element = tmpBasePosAry[index];
                        if (element.value1 == tempIndex + 1)
                        {
                            cnt++;
                        }
                    }
                    if (cnt == 0)
                    {
                        return -2;
                    }

                    break;
                }
            }
            if (showEff)
            {
                if (tempIndex >= 0)
                {
                    let tmpPos = tmpStoryLayer.getChildByName((tempIndex + 1).toString()) as Laya.Sprite;
                    this.UIPanel.HeroOnEff.visible = true;
                    this.UIPanel.HeroOnEff.pos(tmpPos.x + tmpStoryLayer.x, tmpPos.y + tmpStoryLayer.y);
                }
                else
                {
                    this.UIPanel.HeroOnEff.visible = false;
                }
            }

            return tempIndex;
        }

        //-----------------------------------新手引导------------------------------------
        /** 根据引导步骤，获取需要上阵的英雄序号 */
        private getGuideHeroIndex(step: GuideStep): number
        {
            //皮卡丘
            if (step == GuideStep.FirstFight_4_3)
            {
                return 0;
            }

            let list = this.TempPetList;
            for (let i = 0; i < list.length; i++)
            {
                let pet = list[i];
                if ((pet.id == 23501 && step == GuideStep.ThirdFight_11_3) || pet.id == 21405 && step == GuideStep.SecondFight_8_3)
                {
                    return i;
                }
            }
            return 1;
        }
        // private CherkNotOnStoreHeroIndex() {
        //     this.notOnStoreHeroIndex = -1;
        //     for (let i = 0; i < this.TempPetList.length; i++) {
        //         if (!this.TempPetList[i].onStore) {
        //             this.notOnStoreHeroIndex = i;
        //             break;
        //         }
        //     }
        // }

        /**
         * 进入本步引导
         */
        public Guide_Enter(step: GuideStep)
        {
            if (step == GuideStep.FirstFight_4_3 || step == GuideStep.SecondFight_8_3 || step == GuideStep.ThirdFight_11_3)
            {
                Laya.timer.frameOnce(2, this, () =>
                {
                    let petIndex = this.getGuideHeroIndex(step);
                    let tmpItemUI = this.UIPanel.HeroList.getCell(petIndex) as NorItemUI;
                    if (tmpItemUI == null || !this.TempPetList[petIndex] || this.TempPetList[petIndex].onStore)
                    {
                        GuideMgr.Inst.nextActive();
                    } else
                    {
                        GuideMgr.Inst.showFinger(tmpItemUI, true, tmpItemUI, 0, 0, 20);
                    }
                });
            }
            else if (step == GuideStep.FirstFight_4_4 || step == GuideStep.SecondFight_8_11 || step == GuideStep.ThirdFight_11_4 || step == GuideStep.Artifact_16_9)
            {
                GuideMgr.Inst.showFinger(this.UIPanel.StartBattleBtn, true, this.UIPanel.StartBattleBtn);
            }
            else if (step == GuideStep.Artifact_16_7)
            { //神器引导-布阵界面引导选择神器
                GuideMgr.Inst.showFinger(this.UIPanel.ArtifactBtn, true, this.UIPanel.ArtifactBtn);
            }
            else if (step == GuideStep.FourFight_15_4)
            {
                Laya.timer.frameOnce(1, this, () =>
                {
                    GuideMgr.Inst.showFinger(this.UIPanel.StartBattleBtn, true, this.UIPanel.StartBattleBtn);
                });
            }
            else if (step == GuideStep.SecondFight_8_5)
            { //种族克制
                GuideMgr.Inst.showFinger(this.UIPanel.ZhenxingBtn, true, this.UIPanel.ZhenxingBtn);
            }
        }

        // /**
        //  * 操作本步引导
        //  */
        // public Guide_Active(step: GuideStep) {
        //     if (step == GuideStep.FirstFight_4_3 || step == GuideStep.SecondFight_8_3 || step == GuideStep.ThirdFight_11_3) {
        //         let tmpItemUI = this.UIPanel.HeroList.getCell(this.notOnStoreHeroIndex) as NorItemUI;
        //         if (tmpItemUI != null) {
        //             tmpItemUI.activeEvent();
        //         }
        //         GuideMgr.Inst.nextActive();
        //     }
        // }

        /** 刷新上阵列表 */
        private refreshDefendList(data)
        {

            /**方案列表*/
            let plan: Pb_God.PBDefendPlan = DefendDataMgr.getCurrentPlan();
            if (!plan)
            {
                this.UIPanel.itemBox_defend.visible = false;
                return;
            } else
            {
                this.UIPanel.itemBox_defend.visible = true;

            }
            this.UIPanel.itemBox_defend.onRefresh(4, this, (item: HeroDefendLocationSetItem, index: number) =>
            {
                let hero: Net.hero;
                if (plan.pets)
                {
                    for (let i = 0; i < plan.pets.length; i++)
                    {
                        let pet = plan.pets[i];
                        if (pet.index == index + 1)
                        {
                            hero = PetDataMgr.getPetInfo(pet.petSnID);
                        }
                    }
                }
                item.showNameBol = false;
                item.setData(index, hero);
                item.mouseEnabled = false;
            });


            if (data)
            {
                this.refreshPetsLayer()
            }
        }
        openDefendPanel(e: Laya.Event)
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(Pro.PanelNotify.Open_HeroDefendLocationSet))
        }
    }
}