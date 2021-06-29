module Pro
{
    /**
     * 跨服防御布阵
     */
    export class CrossChallengeEmbattleMediator extends BaseMediator implements IMediator
    {
        public UIOpenData: EmbattleOpenUIData;

        public UIPanel: ProUI.CrossChallenge.CrossChallengeEmbattleUI;

        /** 当前已解锁的英雄 */
        private TempPetList: Array<Net.hero>;

        /** 当前选择的英雄类型索引 */
        private TmpSelectHeroTypeIndex = 0;

        /** 阵法坐标索引 */
        private TmpZhenfaPosAry = [7, 4, 1, 8, 5, 2, 9, 6, 3];

        private _zhenfaTypeOpen: Pb_God._emZhenfaType;

        private _hideFlag: boolean[];

        /** 需要自动加载的资源列表 */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("crossChallenge")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.CrossChallenge.CrossChallengeEmbattleUI, 3, BaseAddLayer.TopUI, true);
        }

        /**
         * 关闭UI
         */
        public closeUI(): void
        {
            if (this._zhenfaTypeOpen == Pb_God._emZhenfaType.ZhenfaType_CrossChallengeATK1)
            {
                this.saveCurZhenfa();
            }
            this.closePanel();
            ZhenXingChangePanel.closeUI();
            ArtifactChoicePanel.closeUI();
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
                if (!CrossChallengeDataMgr.openInfo)
                    return;
                let canHide = cfg.CrossChallengeConstantsCfgData.getCanHideCountByRank(CrossChallengeDataMgr.openInfo.self.order)
                if (this.getHideCount() > canHide)
                {
                    TipsUtils.showTipsByLanId("crossChallenge_msg4", canHide)
                    return;
                }

                this.saveCurZhenfa();
                this.setDefTeam();
            });

            this.UIPanel.StartBattleBtn.onClick(this, () =>
            {
                this.saveCurZhenfa();
                this.setFightTeam();
                // this.onStartBattleClick();
            });
        }

        private saveCurZhenfa()
        {
            EmbattleDataMgr.saveBuZhenInfoByType(this._zhenfaTypeOpen, false);
            EmbattleDataMgr.saveBuZhenInfoByType((this._zhenfaTypeOpen + 1), false);
            EmbattleDataMgr.saveBuZhenInfoByType((this._zhenfaTypeOpen + 2), false);
        }

        private setDefTeam()
        {
            let teams = [];
            for (let i = 0; i < 3; i++)
            {
                let zhenfaInfo = EmbattleDataMgr.getCurBuZhenInfoByType(this._zhenfaTypeOpen + i);
                let sendParam: Pb_God.PBPlayerZhenfaInfo = new Pb_God.PBPlayerZhenfaInfo();
                sendParam.type = zhenfaInfo.getTeamType();
                sendParam.id = zhenfaInfo.getZhenfaId();
                sendParam.posdata = zhenfaInfo.getPosData();
                sendParam.artifactid = zhenfaInfo.getArtifactId();
                teams.push(sendParam);
            }
            CrossChallengeSend.setTeamDEF(teams, this._hideFlag);
        }

        private setFightTeam()
        {
            let teams = [];
            for (let i = 0; i < 3; i++)
            {
                let zhenfaInfo = EmbattleDataMgr.getCurBuZhenInfoByType(this._zhenfaTypeOpen + i);
                let sendParam: Pb_God.PBPlayerZhenfaInfo = new Pb_God.PBPlayerZhenfaInfo();
                sendParam.type = zhenfaInfo.getTeamType();
                sendParam.id = zhenfaInfo.getZhenfaId();
                sendParam.posdata = zhenfaInfo.getPosData();
                sendParam.artifactid = zhenfaInfo.getArtifactId();
                teams.push(sendParam);
            }
            CrossChallengeSend.setTeamATK(teams, [false, false, false]);
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(EventNotify.Embattle_Zhenxing_Changed, this, this.zhenXingChangedEvent);
            this.addEventMgr(EventNotify.Embattle_Artifact_Changed, this, this.artifactChangeEvent);
            this.addEventMgr(EventNotify.Embattle_Artifact_Exchanged, this, this.artifactExchangeEvent);
            this.addEventMgr(EventNotify.Pet_State_Chg, this, this.onPetChanged);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
            this.removeEventMgr(EventNotify.Pet_State_Chg, this, this.onPetChanged);
        }
        onPetChanged(){
            Laya.timer.once(100,this,this.refreshPetsLayer);
           
        }
         
       

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this._hideFlag = [];
            this._zhenfaTypeOpen = this.UIOpenData.lockEmType;
            this.UIPanel.SaveZhenfaBtn.visible = this._zhenfaTypeOpen == Pb_God._emZhenfaType.ZhenfaType_CrossChallengeDEF1;

            this.UIPanel.HeroList.onRefresh(0, null, null); //这个代码不要删， 否则会有报错（下面设置spaceY的时候会启动组件的callLater:render, 而当前这个界面显示的英雄数量比上次的少时，会在回调中报错）
            this.UIPanel.HeroList.spaceY = this.UIOpenData.showBlood ? 10 : 2;  //要显示血条时，拉宽一点

            this.UIPanel.ArtifactBtn.visible = PlayerDataMgr.checkSystemSwitchOpen(emSystemSwitchType.Weapon);

            //从列表选择英雄";
            this.UIPanel.ShowStatueLb.text = Global.getLangStr("fight_msg10");
            this.UIPanel.ShowStatueLb.color = "#71503f";

            //切换阵法
            let tabTitles: string[] = [];

            tabTitles.push(Global.getLangStr("fight_msg60"));   //总览
            for (let i = 1; i <= this.UIOpenData.lockEmCount; i++)
            {
                tabTitles.push("zhenfatype_name_0" + i); //队伍1、队伍2...
            }

            let tabDatas: component.UITabData[] = [];
            for (let str of tabTitles)
            {
                tabDatas.push(new component.UITabData(str));
            }
            this.UIPanel.tabGrpZhenfa.onClick(this, this.onZhenFaTabClick,
                tabDatas, [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]
            );

            // TODO 策划要求一键上阵必须显示
            // this.UIPanel.AutoStoreBtn.visible = this.UIOpenData.lockEmType != 0;
            this.UIPanel.StartBattleBtn.visible = !this.UIPanel.SaveZhenfaBtn.visible;

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

            //跨服竞技场不能有两个相同sn的精灵
            let team_1 = EmbattleDataMgr.getCurBuZhenInfoByType(this._zhenfaTypeOpen);
            let team_2 = EmbattleDataMgr.getCurBuZhenInfoByType((this._zhenfaTypeOpen + 1));
            let team_3 = EmbattleDataMgr.getCurBuZhenInfoByType((this._zhenfaTypeOpen + 2));

            for (var hero of this.TempPetList)
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

            //刷新UI
            this.refreshUI();
        }

        /** 开启战斗 */
        private onStartBattleClick()
        {

            //发送战斗接口
            let tmpTeamType = EmbattleDataMgr.getCurBuZhenInfo().getTeamType();
            let battleParam = this.UIOpenData.battleParam;
            BattleMgr.Inst.createNormalBat(Pb_God._emBattleType.BattleType_CrossChallege, this.UIOpenData.battleID, battleParam, this._zhenfaTypeOpen);
            // BattleMgr.Inst.createNormalBat(Pb_God._emBattleType.BattleType_Challenge, data.id, data.param, undefined, this.skipFlag.visible);
            CrossChallengeDataMgr.result = [];
            this.closeUI();
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
            ArtifactChoicePanel.initUI(EmbattleDataMgr.getCurBuZhenInfo().getArtifactId(), EmbattleDataMgr.getCurBuZhenInfo().getTeamType());
        }

        private artifactChangeEvent(newid: number, tType: Pb_God._emZhenfaType)
        {

            let tmpZhanFa = tType ? EmbattleDataMgr.getCurBuZhenInfoByType(tType) : EmbattleDataMgr.getCurBuZhenInfo();
            if (tmpZhanFa.getArtifactId() != newid)
            {
                tmpZhanFa.switchArtifactId(newid);
            }
            this.refreshUI();
        }


        private artifactExchangeEvent(newid: number)
        {
            this.refreshPreview();
            this.refreshOnStoreList()
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

        /**
         * 刷新总览界面
         */
        private refreshPreview()
        {
            this._hideFlag = [];
            this.UIPanel.previewList.onRefresh(3, this, this.onPreviewRefresh);
        }

        private getHideCount()
        {
            let count = 0;
            for (let i = 0; i < this._hideFlag.length; i++)
            {
                this._hideFlag[i] && count++;
            }

            return count;
        }

        /**
         * 总览刷新
         * @param preItem 
         * @param index 
         */
        private onPreviewRefresh(preItem: ProUI.CrossChallenge.CrossChallengeEmbattlePreviewItemUI, index: number)
        {
            let tmpType = this._zhenfaTypeOpen + index;
            let zhenfaInfo = EmbattleDataMgr.getCurBuZhenInfoByType(tmpType);
            preItem.lblTeam.text = Global.getLangStr("zhenfatype_name_0" + (index + 1))
            preItem.btnChangeTeam.visible = index > 0;
            //阵型刷新
            Global.setResPetZhengxing(preItem.ZhenxingBtn, zhenfaInfo.getZhenxingId());
            Global.setResPetZhengfa(preItem.ZhenfaImg, zhenfaInfo.getZhenfaId());

            let power = 0;
            preItem.lblPowera.text = power + "";

            let tmpArtifactID = zhenfaInfo.getArtifactId();
            preItem.ArtifactIconImg.skin = "";
            tmpArtifactID > 0 && Global.setResIconWithItemID(preItem.ArtifactIconImg, CfgID.ResType.ArtifactHead, tmpArtifactID);
            preItem.ArtifactStatueImg.visible = tmpArtifactID == 0;
            preItem.ZhenxingBtn.TitleLb.visible = false;

            preItem.btnArtifact.onClick(this, () =>
            {
                ArtifactChoicePanel.initUI(tmpArtifactID, tmpType);
            })

            preItem.btnHide.visible = this._zhenfaTypeOpen == Pb_God._emZhenfaType.ZhenfaType_CrossChallengeDEF1;
            if (preItem.btnHide)
            {
                preItem.imgHideFlag.visible = CrossChallengeDataMgr.openInfo.self.team[`hideteam${ index + 1 }`]
                preItem.btnHide.onClick(this, () =>
                {
                    if (!preItem.imgHideFlag.visible)
                    {
                        let canHide = cfg.CrossChallengeConstantsCfgData.getCanHideCountByRank(CrossChallengeDataMgr.openInfo.self.order)
                        if (this.getHideCount() >= canHide)
                        {
                            TipsUtils.showTipsByLanId("crossChallenge_msg4", canHide)
                            return;
                        }
                    }
                    preItem.imgHideFlag.visible = !preItem.imgHideFlag.visible;
                    this._hideFlag[index] = preItem.imgHideFlag.visible;
                })
                this._hideFlag[index] = preItem.imgHideFlag.visible;
            }
            else
            {
                this._hideFlag[index] = false;
            }


            preItem.btnChangeTeam.onClick(this, () =>
            {
                let buzhenInfo = EmbattleDataMgr.getCurBuZhenInfoByType(tmpType);
                let lastBuzhenInfo = EmbattleDataMgr.getCurBuZhenInfoByType(tmpType - 1);
                let tmp = buzhenInfo;

                let tmpTeamType = buzhenInfo.getTeamType();

                tmp.setTeamType(lastBuzhenInfo.getTeamType());
                lastBuzhenInfo.setTeamType(tmpTeamType);

                EmbattleDataMgr.setCurBuZhenInfoByType(tmpType, lastBuzhenInfo);
                EmbattleDataMgr.setCurBuZhenInfoByType(tmpType - 1, tmp);


                //对应的阵容隐藏状态也要交换
                let lastHide = this._hideFlag[index - 1];
                let newHide = this._hideFlag[index];
                CrossChallengeDataMgr.openInfo.self.team[`hideteam${ index + 1 }`] = lastHide;
                CrossChallengeDataMgr.openInfo.self.team[`hideteam${ index }`] = newHide;

                this.refreshPreview();
            })

            // preItem.ZhenxingBtn.onClick(this, () =>
            // {
            //     UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroZhenxing, zhenfaInfo.getZhenxingId()));
            // });

            let posAry = zhenfaInfo.getPosAry();
            preItem.heroList.onRefresh(5, this, (item: Pro.NorItemUI, idx: number) =>
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
                        preItem.lblPowera.text = power.toString();
                        item.onClick(this, this.onBattleListSelectMini, true, this.UIPanel.HeroDragEffMini);
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


        //  //图标显示
        //         if (tempStored)
        //         {
        //             let tmpHeroInfo: Net.hero = tmpBuZhenInfo.getHeroByStorePosInfo(tempPosInfo);
        //             if (tmpHeroInfo)
        //             {
        //                 item.setPetInfo(tmpHeroInfo, false);
        //                 tmpBuZhenPower += tmpHeroInfo.fightpower;
        //                 this.UIPanel.ZhanliLb.text = tmpBuZhenPower.toString();
        //             }
        //             else
        //             {   //有阵法信息，却没有英雄信息，可能是英雄已经融掉了，或者被合成了吧。
        //                 item.setEmptyInfo();
        //                 tmpBuZhenInfo.removeStoreByIndex(storeIndex - 1);
        //             }
        //         }
        //         else
        //         {
        //             item.setEmptyInfo();
        //         }

        private onBattleListSelectMini(item: NorItemUI, isDrag: boolean)
        {
            let sData = item.name.split("_");
            let index = parseInt(sData[1]) - 1;
            let zhenfaType = parseInt(sData[0]);

            //开始拖拽
            if (isDrag == true)
            {
                let tmpBuZhenInfo = EmbattleDataMgr.getCurBuZhenInfoByType(zhenfaType);
                let tempStorePosInfo = tmpBuZhenInfo.getPosAry()[index];
                let tempHeroInfo = tmpBuZhenInfo.getHeroByStorePosInfo(tempStorePosInfo);
                this.startDragForItemMini(tempHeroInfo, item);
                // this.controlOnStoreEffect(true);
            }//拖拽结束
            else if (isDrag == false)
            {
                //结束拖拽
                this.endDragForItemMini();



                //交换位置
                let tmpSels = this.dragEffMove_CalledMini(false);
                let tmpSel = tmpSels[1];
                let tmpType = tmpSels[0];

                if (tmpSel == -1)
                    return;
                if (tmpType)
                {
                    if (tmpType == zhenfaType)
                    {
                        //阵容内移动 直接交换位置
                        let tmpBuZhenInfo = EmbattleDataMgr.getCurBuZhenInfoByType(tmpType);
                        if (tmpSel >= 0 && tmpSel != index)
                        {  //当前选择的阵法
                            tmpBuZhenInfo.exChangeStore(tmpSel, index);
                        }
                    }
                    else
                    {
                        //阵容外移动 需要判断id sn 胡帕那些玩意
                        //跨服竞技场不能有两个相同sn的精灵

                        /**原始 */
                        let zhenfaTeam = EmbattleDataMgr.getCurBuZhenInfoByType(zhenfaType);
                        let tmpOldHeroInfo = zhenfaTeam.getHeroByStorePosInfo(zhenfaTeam.getPosAry()[index]);
                        /**目标 */
                        let tmpTeam = EmbattleDataMgr.getCurBuZhenInfoByType(tmpType);
                        let tmpNewHeroInfo = tmpTeam.getPosAry()[tmpSel] ? tmpTeam.getHeroByStorePosInfo(tmpTeam.getPosAry()[tmpSel]) : null;


                        let tmp_hero_inTeam_1 = tmpTeam ? tmpTeam.getStoredWithSameHeroSn(tmpOldHeroInfo.sn) : null;
                        let tmp_hero_inTeam_2 = (tmpNewHeroInfo && zhenfaTeam) ? zhenfaTeam.getStoredWithSameHeroSn(tmpNewHeroInfo.sn) : null;

                        if (tmp_hero_inTeam_1 || tmp_hero_inTeam_2)
                        {
                            TipsUtils.showTipsByLanId("fight_msg59");
                            return;
                        }
                        //判断同类型
                        if (tmpTeam.getStoredWithSameHeroID(tmpOldHeroInfo.id) || (tmpNewHeroInfo && zhenfaTeam.getStoredWithSameHeroID(tmpNewHeroInfo.id)))
                        {
                            TipsUtils.showTipsByLanId("tips_msg45");
                            return;
                        }

                        //判断胡帕
                        if (tmpTeam.hupaCheck(tmpOldHeroInfo.id) || (tmpNewHeroInfo && zhenfaTeam.hupaCheck(tmpNewHeroInfo.id)))
                        {
                            TipsUtils.showTipsByLanId("tips_msg80");
                            return;
                        }

                        tmpTeam.removeStoreByIndex(tmpSel);
                        zhenfaTeam.removeStoreByIndex(index);

                        if (tmpTeam.setStoreIndex(tmpSel, tmpOldHeroInfo))
                        {
                            tmpOldHeroInfo.onStore = true;
                        }
                        if (tmpNewHeroInfo)
                        {
                            if (zhenfaTeam.setStoreIndex(index, tmpNewHeroInfo))
                            {
                                tmpNewHeroInfo.onStore = true;
                            }
                        }

                    }
                }
                else
                {
                    //没有找到 不作处理
                }
                this.refreshOnStoreList();
                this.refreshPetsLayer();
                this.refreshPreview();
                // this.controlOnStoreEffect(false);
            }//点击事件
            else
            {

                let tmpBuZhenInfo = EmbattleDataMgr.getCurBuZhenInfoByType(zhenfaType);
                tmpBuZhenInfo.removeStoreByIndex(index);

                this.refreshOnStoreList();
                this.refreshPetsLayer();
                this.refreshPreview();

                // this.controlOnStoreEffect(false);
            }
        }

        private startDragForItemMini(tmpHeroInfo: Net.hero, item: NorItemUI)
        {
            let itemPos = item.localToGlobal(new Laya.Point(item.width / 2, item.height / 2)); itemPos.y -= GameConfig.WinCenterY / 2;
            this.UIPanel.HeroDragEffMini.pos(itemPos.x - this.UIPanel.x, itemPos.y - this.UIPanel.y);
            this.UIPanel.HeroDragEffMini.visible = true;

            this.UIPanel.HeroDragEffMini.setPetInfo(tmpHeroInfo, false);

            this.UIPanel.HeroDragEffMini.on(Laya.Event.MOUSE_MOVE, this, this.dragEffMove_CalledMini);

            this.dragEffMove_CalledMini();
        }

        private dragEffMove_CalledMini(showEff = true): any[]
        {

            let tmpDragItem = this.UIPanel.HeroDragEffMini as Laya.Sprite;
            let dragPos = tmpDragItem.localToGlobal(new Laya.Point(tmpDragItem.width / 2, tmpDragItem.height / 2));

            let tmpStoryLayer = this.UIPanel.previewList.ContentLayer;
            let tempIndex = -1;
            let tempType;
            for (let i = 0; i < tmpStoryLayer.numChildren; i++)
            {
                let tempSp = tmpStoryLayer.getChildAt(i) as ProUI.CrossChallenge.CrossChallengeEmbattlePreviewItemUI;
                if (tempSp.hitTestPoint(dragPos.x, dragPos.y))
                {
                    //代表是这个阵法
                    let tmpHeroLayer = tempSp.heroList.ContentLayer;
                    tempType = this._zhenfaTypeOpen + i;
                    for (let j = 0; j < tmpHeroLayer.numChildren; j++)
                    {
                        let tmpItem = tmpHeroLayer.getChildAt(j) as Laya.Sprite;
                        if (tmpItem.hitTestPoint(dragPos.x, dragPos.y))
                        {
                            //当前选择的位置
                            tempIndex = parseInt(tmpItem.name.split("_")[1]) - 1;

                            //阵法位置限制
                            let tmpBuZhenInfo = EmbattleDataMgr.getCurBuZhenInfoByType(tempType);
                            let tmpBasePosAry = cfg.PetFormationCfgData.getPosAryById(tmpBuZhenInfo.getZhenfaId());

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
                                return [tempType, -2];
                            }
                            break;
                        }
                    }
                }
            }
            // if (showEff)
            // {
            //     if (tempIndex >= 0)
            //     {
            //         let tmpPos = tmpStoryLayer.getChildByName((tempIndex + 1).toString()) as Laya.Sprite;
            //         this.UIPanel.HeroOnEff.visible = true;
            //         this.UIPanel.HeroOnEff.pos(tmpPos.x + tmpStoryLayer.x, tmpPos.y + tmpStoryLayer.y);
            //     }
            //     else
            //     {
            //         this.UIPanel.HeroOnEff.visible = false;
            //     }
            // }
            return [tempType, tempIndex];
        }

        private endDragForItemMini()
        {
            this.UIPanel.HeroDragEffMini.off(Laya.Event.MOUSE_MOVE, this, this.dragEffMove_Called);
            this.UIPanel.HeroDragEffMini.visible = false;
        }

        private initCrossChallengeZhenFa()
        {
            let tmpTypes = [this._zhenfaTypeOpen, (this._zhenfaTypeOpen + 1), (this._zhenfaTypeOpen + 2)];
            for (let i = 0; i < tmpTypes.length; i++)
            {
                let tmpType = tmpTypes[i];
                if (EmbattleDataMgr.getBuZhenInfo(tmpType) == null)
                {
                    let tempZhenfaCfg = cfg.PetFormationCfgData.getDataList()[0];
                    EmbattleDataMgr.addNewBuZhen(tempZhenfaCfg.iD, tmpType, []);
                }
                EmbattleDataMgr.switchCurBuZhen(tmpType);
            }
        }


        //--------------------------------切换阵法--------------------------------
        /** 切换阵法 */
        private onZhenFaTabClick(tab: component.UITab, index: number, oldIndex: number)
        {
            //总览
            if (index == 0)
            {
                this.UIPanel.previewBox.visible = true;
                this.UIPanel.buzhenBox.visible = false;
                this.initCrossChallengeZhenFa();
                this.refreshPreview();
                return;
            }
            else
            {
                this.UIPanel.previewBox.visible = false;
                this.UIPanel.buzhenBox.visible = true;
            }

            //当前操作布阵类型
            let tmpTeamType = this.UIOpenData.lockEmType + index - 1;

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
                EmbattleDataMgr.addNewBuZhen(tempZhenfaCfg.iD, tmpTeamType, null);
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

            this.UIPanel.HeroList.onRefresh(this.TempPetList.length, this, this.onHeroListRender);
        }

        /** 刷新状态 */
        private onHeroListRender(item: NorItemUI, index: number): void
        {
            let tmpHeroInfo = this.TempPetList[index] as Net.hero;
            item.setPetInfo(tmpHeroInfo, false);
            item.SelectStatueImg.visible = tmpHeroInfo.onStore;
            item.onHold(this, this.onHeroListSelect);
            item.BloodBgImg.visible = this.UIOpenData.showBlood;

            let bol:boolean=tmpHeroInfo.isDefend;
            item.setLockImgVisible(bol,tmpHeroInfo)
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
            if(tempPetInfo.isDefend){
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
                if (this.UIPanel.tabGrpZhenfa.tabIndex == 0)
                {
                    let tmpZhenfaInfo = EmbattleDataMgr.getCurBuZhenInfoByType(tempPetInfo.onStoreTeam);
                    tempPetInfo.onStore = false;
                    tmpZhenfaInfo.removeStore(tempPetInfo.sn);
                }
                else
                {
                    if (tempPetInfo.onStoreTeam != buzhenInfo.getTeamType())
                    {
                        // 要删除的角色不在当前页签内 切换到对应页签
                        this.UIPanel.tabGrpZhenfa.setSelectTab(tempPetInfo.onStoreTeam - this._zhenfaTypeOpen + 1);
                    }
                    buzhenInfo = EmbattleDataMgr.getCurBuZhenInfo();

                    tempPetInfo.onStore = false;
                    buzhenInfo.removeStore(tempPetInfo.sn);
                }
            }
            else
            {
                //跨服竞技场不能有两个相同sn的精灵
                let team_1 = EmbattleDataMgr.getCurBuZhenInfoByType(this._zhenfaTypeOpen);
                let team_2 = EmbattleDataMgr.getCurBuZhenInfoByType((this._zhenfaTypeOpen + 1));
                let team_3 = EmbattleDataMgr.getCurBuZhenInfoByType((this._zhenfaTypeOpen + 2));
                let tmp_hero_inTeam_1 = team_1 ? team_1.getStoredWithSameHeroSn(tempPetInfo.sn) : null;
                let tmp_hero_inTeam_2 = team_2 ? team_2.getStoredWithSameHeroSn(tempPetInfo.sn) : null;
                let tmp_hero_inTeam_3 = team_3 ? team_3.getStoredWithSameHeroSn(tempPetInfo.sn) : null;
                if (tmp_hero_inTeam_1 || tmp_hero_inTeam_2 || tmp_hero_inTeam_3)
                {
                    TipsUtils.showTipsByLanId("fight_msg59");
                    return;
                }

                if (this.UIPanel.tabGrpZhenfa.tabIndex == 0)
                {
                    let empInfo = this.getEmptyZhenfa();
                    if (!empInfo)
                        return;
                    let targetPos = -1;
                    if (empInfo.setStoreIndex(targetPos, tempPetInfo))
                    {
                        tempPetInfo.onStore = true;
                    }
                }
                else
                {
                    let targetPos = -1;
                    if (buzhenInfo.setStoreIndex(targetPos, tempPetInfo))
                    {
                        tempPetInfo.onStore = true;
                    }
                }
            }

            this.refreshOnStoreList();
            this.refreshPetsLayer();
            this.refreshPreview();
        }

        private getEmptyZhenfa()
        {
            let crossTypes = [this._zhenfaTypeOpen, (this._zhenfaTypeOpen + 1), (this._zhenfaTypeOpen + 2)];
            for (let i = 0; i < crossTypes.length; i++)
            {
                let zhenfaInfo = EmbattleDataMgr.getCurBuZhenInfoByType(crossTypes[i]);
                if (zhenfaInfo.getOnStoreNum() < 5)
                {
                    return zhenfaInfo;
                }
            }
        }

        //----------------------------------副本英雄上阵列表------------------------------
        /** 刷新阵容九宫格 */
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
                    if (tmpHeroInfo&&!tmpHeroInfo.isDefend)
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
    }
}