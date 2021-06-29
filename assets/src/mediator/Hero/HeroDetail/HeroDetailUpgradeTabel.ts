module Pro
{
    export class HeroDetailUpgradeTabel extends ProUI.Hero.HeroDetail.FunLayer0UI implements ITableView
    {

        private SelectRole: Net.hero;
        private SelectPetInfo: cfg.PetCfgInfo;
        private SelectPetBookInfo: cfg.PetBookCfgInfo;
        private UpAdvanceUI: ProUI.Hero.HeroDetail.UpAdvance.MainUI;

        /** 页签组件销毁 */
        dispose(): void
        {

        }

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        initialization(): void
        {
            this.DetailBtn.onClick(this, () =>
            {
                let tmpPetId = this.SelectRole ? this.SelectRole.id : (this.SelectPetBookInfo ? this.SelectPetBookInfo.petID : this.SelectPetInfo.petID);
                let tmpAttrAry = this.SelectRole ? this.SelectRole.attr :
                    (this.SelectPetBookInfo ? cfg.PetBookCfgData.getAddAttrListInfoByCfgInfo(this.SelectPetBookInfo) : cfg.PetCfgData.getInitAttrAryById(tmpPetId));
                let tmpPetType = cfg.PetCfgData.getPetTypeByPetID(tmpPetId);
                let tmpPetJob = cfg.PetCfgData.getPetJobTypeByPetID(tmpPetId);

                let tmpHolyLv = 0;
                let tmpHolyAdv = 0;
                let tmpFactionLv = 0;
                if (!this.SelectPetBookInfo) //从图鉴进来的，不要显示全局属性加成
                {
                    let tmpHolyInfo = HolyDataMgr.getHolyInfo(tmpPetType);
                    tmpHolyLv = tmpHolyInfo != null ? tmpHolyInfo.level : 0;
                    tmpHolyAdv = tmpHolyInfo != null ? tmpHolyInfo.advance : 0;
                    tmpFactionLv = FactionDataMgr.getSkillLevel(tmpPetJob);
                }
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroDataInfo, [tmpPetId, tmpHolyLv, tmpHolyAdv, tmpAttrAry, tmpFactionLv]));
            });
        }

        //-------------------------------------------------------------------------------------------
        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        addEvent(): void
        {
            EventMgr.on(CmdEvent.Pet_UpLevel_Ack, this, this.Pet_Lv_Changed);
            EventMgr.on(CmdEvent.Pet_Advance_Ack, this, this.Pet_Advance_Changed);
            EventMgr.on(CmdEvent.Pet_SynPreviewAttr, this, this.onUpAdvanceUI);
        }
        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        removeEvent(): void
        {
            EventMgr.off(CmdEvent.Pet_UpLevel_Ack, this, this.Pet_Lv_Changed);
            EventMgr.off(CmdEvent.Pet_Advance_Ack, this, this.Pet_Advance_Changed);
            EventMgr.off(CmdEvent.Pet_SynPreviewAttr, this, this.onUpAdvanceUI);
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        show(): void
        {

        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        hide(): void
        {
            Laya.timer.clearAll(this);
            this._autoUpLeveling = false;
            this.closeUpAdvanceUI();
        }

        setData($data: any): void
        {
            this.SelectRole = $data[0];
            this.SelectPetInfo = $data[1];
            this.SelectPetBookInfo = $data[2];
            this.refreshUI();
        }

        /** 刷新状态 */
        public refreshUI()
        {

            let petId = this.SelectRole ? this.SelectRole.id : (this.SelectPetBookInfo ? this.SelectPetBookInfo.petID : this.SelectPetInfo.petID);
            let skinId = this.SelectRole ? this.SelectRole.useskinid : (this.SelectPetBookInfo ? cfg.PetCfgData.getBaseSkinByPetID(this.SelectPetBookInfo.petID) : cfg.PetCfgData.getBaseSkinByPetID(this.SelectPetInfo.petID));
            let currentStar = this.SelectRole ? this.SelectRole.star : (this.SelectPetBookInfo ? this.SelectPetBookInfo.star : this.SelectPetInfo.minStar);
            let currentUpStarInfo = cfg.PetUpStarCfgData.getInfoWithFun(petId, currentStar);
            let currentMaxAdvance = currentUpStarInfo != null ? currentUpStarInfo.maxAdvance : cfg.PetCfgData.getInitMaxAdvanceByPetID(petId);
            let currentAdvance = this.SelectRole ? this.SelectRole.advance : currentMaxAdvance;

            let currentMaxLevel = cfg.PetAdvanceCfgData.getMaxPetLevelByAdvance(currentAdvance);
            if (this.SelectPetBookInfo) { currentMaxLevel = this.SelectPetBookInfo.maxLevel; }
            else if (currentUpStarInfo != null && currentAdvance >= currentMaxAdvance)
            {
                currentMaxLevel = currentUpStarInfo.maxLevel;
            }
            let currentLevel = this.SelectRole ? this.SelectRole.level : currentMaxLevel;

            //等级和星
            this.StarBox.onRefresh(currentMaxAdvance, this, (itemUI: component.UIFrameImage, index: number) =>
            {
                itemUI.frame = index < currentAdvance ? 1 : 2;
            });
            this.LvLb.text = Global.getLangStr("hero_msg4", currentLevel, currentMaxLevel);

            //基础属性
            let tempInitAttrAry = this.SelectRole ? this.SelectRole.attr :
                (this.SelectPetBookInfo ? cfg.PetBookCfgData.getAddAttrListInfoByCfgInfo(this.SelectPetBookInfo) : cfg.PetCfgData.getInitAttrAryById(petId));
            this.AtkLb.text = cfg.BattleCfgData.getDescByAttrType(Pb_God._emBattleAttribute.BattleAttribute_Attack) + ": "
            this.AtkLb2.text = Global.getAtterValue(tempInitAttrAry, Pb_God._emBattleAttribute.BattleAttribute_Attack).toString();
            this.DefenceLb.text = cfg.BattleCfgData.getDescByAttrType(Pb_God._emBattleAttribute.BattleAttribute_Defense) + ": "
            this.DefenceLb2.text = Global.getAtterValue(tempInitAttrAry, Pb_God._emBattleAttribute.BattleAttribute_Defense).toString();
            this.BloodLb.text = cfg.BattleCfgData.getDescByAttrType(Pb_God._emBattleAttribute.BattleAttribute_HPMax) + ": "
            this.BloodLb2.text = Global.getAtterValue(tempInitAttrAry, Pb_God._emBattleAttribute.BattleAttribute_HPMax).toString();
            this.SpeedLb.text = cfg.BattleCfgData.getDescByAttrType(Pb_God._emBattleAttribute.BattleAttribute_Speed) + ": "
            this.SpeedLb2.text = Global.getAtterValue(tempInitAttrAry, Pb_God._emBattleAttribute.BattleAttribute_Speed).toString();
            this.RacialValue.text = "种族值：" + cfg.PetCfgData.getRacialvalueByPetID(petId);
            this.PetJobLb.text = Global.getResPetJobTypeName(cfg.PetCfgData.getPetJobTypeByPetID(petId));
            let petDesc = cfg.PetCfgData.getDescByPetID(petId);
            if (petDesc)
            {
                this.PetDescLb.text = `[${ petDesc }]`;
                this.PetDescLb.x = this.PetJobLb.x + this.PetJobLb.width + 5;
            } else
            {
                this.PetDescLb.text = "";
            }
            Global.setResPetGroupType(this.frameJobType, petId);

            //升阶
            this.UpAdvanceRedImg.visible = this.SelectRole && PetDataMgr.isHaveSubPetUpAdvance(this.SelectRole);
            this.UpAdvanceBtn.visible = this.SelectRole && currentLevel >= currentMaxLevel && currentAdvance < currentMaxAdvance;
            this.UpAdvanceBtn.onClick(this, () =>
            {
                //需要处理共鸣相关的
                if (ResonanceDataMgr.checkIsInLevelGrid(Pb_God._emResonanceType.Resonance_Type_Level, this.SelectRole.sn))
                {
                    TipsUtils.showTipsByLanId("resonance_msg14");
                    return;
                }
                PetSend.advancePreview(this.SelectRole.sn);
            });
            //升级
            this.UpgradeRedImg.visible = this.SelectRole && PetDataMgr.isHaveSubPetUpgrade(this.SelectRole);
            this.UpgradeBtn.visible = this.SelectRole && (currentLevel < currentMaxLevel); // || (currentMaxLevel < this.getHeroMaxLevel(this.SelectRole.id, this.SelectRole.star + 1))
            this.UpgradeCostBox.visible = currentLevel < currentMaxLevel;
            this.FullLevelImg.visible = currentLevel >= currentMaxLevel;

            //升级消耗
            if (this.UpgradeBtn.visible)
            {

                let tempCostAry: Array<cfg.AddItemInfo> = null;
                let tempUpgradeInfo = this.getUpgradeNum(currentLevel, currentMaxLevel);
                let tempUpgradeCostDic = tempUpgradeInfo[0] as Laya.Dictionary;
                let tempUpgradeCostLv = tempUpgradeInfo[1] as number;
                if (tempUpgradeCostLv > 0)
                {
                    let tempUpgradeCostKeys = tempUpgradeCostDic.keys;
                    this.UpgradeCostBox.onRefresh(tempUpgradeCostKeys.length, this, (itemUI: ProUI.Utils.LongTroopItemUI, index: number) =>
                    {
                        let tempCostId = tempUpgradeCostKeys[index];
                        let tempCostNum = tempUpgradeCostDic.get(tempCostId);
                        Global.drawItemUIWithID(itemUI, tempCostId, tempCostNum, false, false, true, "#209d0c", "#5b545b");
                    });
                    this.UpgradeLb.text = tempUpgradeCostLv == 1 ? Global.getLangStr("hero_msg6") : Global.getLangStr("hero_msg5", tempUpgradeCostLv);
                }
                else
                {
                    tempCostAry = cfg.PetUpgradeCfgData.getNeedItemAryById(currentLevel + 1);
                    this.UpgradeCostBox.onRefresh(tempCostAry.length, this, (itemUI: ProUI.Utils.LongTroopItemUI, index: number) =>
                    {
                        Global.drawItemUI(itemUI, tempCostAry[index], false, false, true, "#209d0c", "#5b545b");
                    });
                    this.UpgradeLb.text = Global.getLangStr("hero_msg6");
                }

                //升级按钮
                this.UpgradeBtn.onHold(this, (btn: component.UIButton, statue: boolean) =>
                {
                    //开始长按
                    if (statue == true)
                    {
                        this._autoUpLeveling = true;
                        Laya.timer.once(this.AUTO_UPLV_DELAY, this, this.execAutoUpLevel);
                    }//取消长按
                    else if (statue == false)
                    {
                        this._autoUpLeveling = false;
                    }//普通点击
                    else
                    {
                        let addLevel = tempUpgradeCostLv > 0 ? tempUpgradeCostLv : 1;
                        if (!Global.isFullAllRes(tempCostAry, !GuideMgr.Inst.getGuideStatue(true, true)))
                        {
                            this._autoUpLeveling = false;

                            //新手引导里面有个长按需要中断
                            if (GuideMgr.Inst.getInStep() == GuideStep.Func_7DayActUpPet_4)
                            {
                                FuncGuideMgr.Inst.finishFuncGuide();
                            }

                            return;
                        }

                        //需要处理共鸣相关的
                        if (ResonanceDataMgr.checkIsInLevelGrid(Pb_God._emResonanceType.Resonance_Type_Level, this.SelectRole.sn))
                        {
                            TipsUtils.showTipsByLanId("resonance_msg14");
                            return;
                        }
                        PetSend.upLevel_Ask(this.SelectRole.sn, addLevel);
                    }
                });
            }
            else
            {
                this._autoUpLeveling = false;
                // this.UpgradeLb.text = Global.getLangStr("hero_msg6");
                // this.UpgradeBtn.onHold(this, (btn: component.UIButton, statue: boolean) => {
                //     if (statue == null) {
                //         //满星
                //         let maxStar = cfg.PetCfgData.getMaxStarByPetID(this.SelectRole.id);
                //         if (this.SelectRole.star >= maxStar)
                //             TipsUtils.showTipsByLanId("common_lv_full2");
                //         else
                //             TipsUtils.showTipsByLanId("hero_msg61", this.SelectRole.star + 1);
                //     }
                // });
            }

            //新手引导里面有个长按需要中断
            !this.UpgradeBtn.visible && GuideMgr.Inst.checkStepAndNextActive(GuideStep.Func_7DayActUpPet_4);

            //技能列表
            Global.setSkillBoxWithPetInfo(this.SkillBox, true, skinId, currentAdvance, currentStar, true);
        }

        private _autoUpLeveling = false;
        private _lastAutoUpLvTime = 0;
        private readonly AUTO_UPLV_DELAY = 150;
        /** 检查自动升级状态 */
        private checkAutoUpLevel()
        {
            if (!this._autoUpLeveling) { return; }
            let time = getTimer();
            let leftTime = this._lastAutoUpLvTime + this.AUTO_UPLV_DELAY - getTimer();
            if (leftTime <= 0)
            { this.execAutoUpLevel(); }
            else { Laya.timer.once(leftTime, this, this.execAutoUpLevel); }
        }
        /** 执行自动升级 */
        private execAutoUpLevel(): void
        {
            if (!this._autoUpLeveling) { return; }
            this._lastAutoUpLvTime = getTimer();
            this.UpgradeBtn.activeEvent();
        }

        /** 获取当前可以升级的次数 */
        private getUpgradeNum(currentLv: number, maxLv: number): any
        {

            let tmpBaseNumDic = new Laya.Dictionary();
            let tmpCostNumDic = new Laya.Dictionary();
            let tmpUpgradeLv = 0;
            let tmpMaxUpgradeLv = 60 - currentLv;
            if (tmpMaxUpgradeLv > 5)
            {
                tmpMaxUpgradeLv = 5;
            }
            else if (tmpMaxUpgradeLv <= 0)
            {
                tmpMaxUpgradeLv = 1;
            }
            for (let i = 1; i <= tmpMaxUpgradeLv; i++)
            {

                let tmpNextLv = currentLv + i;
                if (tmpNextLv > maxLv)
                {
                    break;
                }

                let tempNeedBreak = false;
                let tempCostAry = cfg.PetUpgradeCfgData.getNeedItemAryById(tmpNextLv);
                for (let j = 0; j < tempCostAry.length; j++)
                {
                    let tmpCostInfo = tempCostAry[j];
                    let tmpHaveNum = tmpBaseNumDic.get(tmpCostInfo.itemid);
                    if (tmpHaveNum == null)
                    {
                        tmpHaveNum = Global.getItemNum(tmpCostInfo.itemid);
                    }
                    if (tmpHaveNum < tmpCostInfo.itemcount)
                    {
                        tempNeedBreak = true;
                        break;
                    }
                    tmpHaveNum -= tmpCostInfo.itemcount;
                    tmpBaseNumDic.set(tmpCostInfo.itemid, tmpHaveNum);
                }
                if (!tempNeedBreak)
                {
                    tmpUpgradeLv = i;
                    tempCostAry.forEach(elment =>
                    {
                        let tmpHaveNum = tmpCostNumDic.get(elment.itemid);
                        if (tmpHaveNum == null)
                        {
                            tmpHaveNum = 0;
                        }
                        tmpHaveNum += elment.itemcount;
                        tmpCostNumDic.set(elment.itemid, tmpHaveNum);
                    });
                }
            }

            return [tmpCostNumDic, tmpUpgradeLv];
        }

        // private getHeroMaxLevel(id: number, star: number): number {
        //     let currentUpStarInfo = cfg.PetUpStarCfgData.getInfoWithFun(id, star);
        //     let currentMaxLevel = cfg.PetAdvanceCfgData.getMaxPetLevelByAdvance(star);
        //     if (currentUpStarInfo != null && star > cfg.PetCfgData.getInitMaxAdvanceByPetID(id)) {
        //         currentMaxLevel = currentUpStarInfo.maxLevel;
        //     }
        //     return currentMaxLevel;
        // }

        //------------------------------------确认升阶------------------------------------
        private onUpAdvanceUI(value: Pb_God.PBG2CSynPreviewAttr)
        {
            if (this.UpAdvanceUI) { return; }  //网络慢时，如果按钮频繁操作，就会有可能出现多个数据包返回的时候，此时只需要一个界面显示即可
            //初始化升阶确认UI
            this.UpAdvanceUI = new ProUI.Hero.HeroDetail.UpAdvance.MainUI();
            LayerManager.Inst.topUILayer.addChild(this.UpAdvanceUI);

            //弹出UI
            let tempCoverSp = PopUpManager.popUpUIAction(this.UpAdvanceUI, 0);
            tempCoverSp.onClick(this, this.closeUpAdvanceUI);
            this.UpAdvanceUI.btnClose.onClick(this, this.closeUpAdvanceUI);

            //升阶属性变化
            this.UpAdvanceUI.AtterBox.onRefresh(5, this, (itemUI: ProUI.Hero.HeroDetail.UpAdvance.AtterItemUI, index: number) =>
            {
                if (index == 0)
                {
                    itemUI.NameLb.text = Global.getLangStr("hero_msg7");//等级上限:";
                    itemUI.imgType.frame = 20;
                    itemUI.CurValueLb.text = cfg.PetAdvanceCfgData.getMaxPetLevelByAdvance(this.SelectRole.advance).toString();
                    itemUI.NextValueLb.text = cfg.PetAdvanceCfgData.getMaxPetLevelByAdvance(this.SelectRole.advance + 1).toString();
                }
                else
                {
                    let tempAttrID = Pb_God._emBattleAttribute.BattleAttribute_Attack + (index - 1);
                    itemUI.imgType.frame = tempAttrID;
                    itemUI.NameLb.text = cfg.BattleCfgData.getDescByAttrType(tempAttrID) + ":";
                    itemUI.CurValueLb.text = Global.getAtterValue(this.SelectRole.attr, tempAttrID).toString();
                    itemUI.NextValueLb.text = Global.getAtterValue(value.attr, tempAttrID).toString();
                }
            });

            //升阶消耗
            let tempCostAry = cfg.PetAdvanceCfgData.getNeedItemAryById(this.SelectRole.advance + 1);
            if (tempCostAry)
            {
                this.UpAdvanceUI.CostBox.onRefresh(tempCostAry.length, this, (itemUI: ProUI.Hero.HeroDetail.UpAdvance.CostItemUI, index: number) =>
                {
                    Global.setResIconWithItemID(itemUI.IconImg, CfgID.ResType.Item, tempCostAry[index].itemid);
                    Global.setResNumWithItemInfo(itemUI.NumLb, tempCostAry[index].itemid, tempCostAry[index].itemcount, true, true, "#5d565d", "#ff0000");
                });
            }


            //技能预览
            this.UpAdvanceUI.SkillInfo.visible = value.addskill != null;
            this.UpAdvanceUI.HaveSkillBox.visible = value.addskill != null;
            if (value.addskill != null)
            {
                let tmpSkillInfo = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(value.addskill.skillid, value.addskill.skilllevel);
                this.UpAdvanceUI.SkillInfo.LvLb.text = tmpSkillInfo.skillLevel.toString();
                Global.setResIconWithItemID(this.UpAdvanceUI.SkillInfo.IconImg, Pro.CfgID.ResType.Skill, tmpSkillInfo.skillIndex);
                this.UpAdvanceUI.SkillInfo.onClick(this, () =>
                {
                    Pro.UIManager.Inst.forceOpen(new Pro.SkillReviewOpenUIData(0, tmpSkillInfo.skillIndex));
                });
                this.UpAdvanceUI.HaveSkillNameLb.text = tmpSkillInfo.name.toString();
            }

            //确认升阶
            this.UpAdvanceUI.SureBtn.onClick(this, () =>
            {
                if (Global.isFullAllRes(tempCostAry))
                {
                    PetSend.advance_Ask(this.SelectRole.sn, 1, true);
                }
                this.closeUpAdvanceUI();
                return;
            })

            //新手引导
            if (GuideMgr.Inst.getInStep() == GuideStep.Func_7DayActUpPet_6)
            {
                Laya.timer.once(200, this, () =>
                {
                    GuideMgr.Inst.showFinger(this.UpAdvanceUI.SureBtn, true, this.UpAdvanceUI.SureBtn);
                });
            }
        }

        private closeUpAdvanceUI()
        {
            if (this.UpAdvanceUI != null)
            {
                PopUpManager.removeUIAction(this.UpAdvanceUI, 0, true, true);
                this.UpAdvanceUI = null;
            }
        }

        //------------------------------------Event-----------------------------------
        /** 升级后回调 */
        private Pet_Lv_Changed()
        {
            this.refreshUI();
            this.checkAutoUpLevel();
            //判断英雄升星引导条件
            this.checkUpstarGuide();
        }

        /** 升级时检查升星引导条件 */
        private checkUpstarGuide(): void
        {
            if (FuncGuideMgr.Inst.IsGuideUpstar) { return; }
            if (!this.SelectRole || this.SelectRole.star != 5) { return; }
            //能升级或者能进阶，表示没有满。
            if (this.UpAdvanceBtn.visible || this.UpgradeBtn.visible) { return; }
            if (cfg.PetCfgData.getMaxStarByPetID(this.SelectRole.id) <= this.SelectRole.star)
            { return; }
            //检查升星表
            if (cfg.PetUpStarCfgData.getInfoWithFun(this.SelectRole.id, this.SelectRole.star + 1) == null)
            { return; }
            if (GuideMgr.Inst.getGuideStatue(false, false)) { return; } //还在前期新手引导中，先跳过
            FuncGuideMgr.Inst.IsGuideUpstar = 1;
            GameLaunch.saveClientData();
            FuncGuideMgr.Inst.forceOpenFuncGuide(GuideStep.Func_HeroUpStar_1)
        }

        private Pet_Advance_Changed()
        {
            this.refreshUI();
        }
    }
}