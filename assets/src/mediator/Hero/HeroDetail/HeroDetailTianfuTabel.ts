module Pro
{
    export class HeroDetailTianfuTabel extends ProUI.Hero.HeroDetail.FunLayer2UI implements ITableView
    {

        private SelectRole: Net.hero;
        private SelectEquipType: number;
        private SelectInfoUI: ProUI.Hero.HeroDetail.UseTalent.SelectInfoUI;
        private UpgradeInfoUI: ProUI.Hero.HeroDetail.UseTalent.UpgradeInfoUI;

        /** 页签组件销毁 */
        dispose(): void
        {

        }

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        initialization(): void
        {
            this.PreviewBtn.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ItemCombinRuneSkill));
            });
            this.ShopBtn.onClick(this, () =>
            {
                UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Shop, Pb_God._emShopType.ShopType_Skill), BaseBackUIType.HideBackUI);
            });
            this.introduceBtn.onClick(this, (btn: component.UIButton) =>
            {
                CommonHelpView.showWithLangKey(btn, "TalentDescription");
            });
        }

        //-------------------------------------------------------------------------------------------
        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        addEvent(): void
        {
            EventMgr.on(EventNotify.ItemAccess_Jump_Change, this, this.onItemAccessJumpCalled);
        }
        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        removeEvent(): void
        {
            EventMgr.off(EventNotify.ItemAccess_Jump_Change, this, this.onItemAccessJumpCalled);
        }

        /** 跳转去其他界面了 */
        onItemAccessJumpCalled(): void
        {
            this.closeSelectTalentUI();
            this.closeUpgradeTalentUI();
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        show(): void
        {

        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        hide(): void
        {
            Laya.timer.clearAll(this);
            this.closeSelectTalentUI();
            this.closeUpgradeTalentUI();
        }

        setData($data: any): void
        {
            this.SelectRole = $data;
            this.refreshUI();
        }

        /** 刷新状态 */
        public refreshUI()
        {

            for (let i = 0; i < this.ItemBox.numChildren; i++)
            {
                let tempUI = this.ItemBox.getChildAt(i) as EquipItemUI;
                tempUI.name = i.toString();
                tempUI.onClick(this, this.onTianfuItemClick);
                tempUI.setPetTalentInfo(this.SelectRole, Pb_God._emPosType.PosType_1 + i);
            }
        }

        /** 穿/脱装备 */
        private onTianfuItemClick(btn: component.UIButton)
        {

            let tempSelectIndex = parseInt(btn.name);
            this.SelectEquipType = Pb_God._emPosType.PosType_1 + tempSelectIndex;
            let tempEquipInfo = SuitEquipDataMgr.getSuitMgr(this.SelectRole.sn).getTalent(this.SelectEquipType);
            if (tempEquipInfo == null)
            {
                this.selectTalentUI(this.SelectEquipType);
            }
            else
            {
                this.upgradeTalentUI(tempEquipInfo);
            }
        }

        //----------------------------------------选择天赋--------------------------------------------
        /** 选择天赋 */
        private selectTalentUI(tempEquipType: number)
        {

            this.SelectInfoUI = new ProUI.Hero.HeroDetail.UseTalent.SelectInfoUI();
            this.SelectInfoUI.ItemList.content.addChild(this.SelectInfoUI.ItemSelectImg);
            LayerManager.Inst.topUILayer.addChild(this.SelectInfoUI);

            let tempCoverSp = PopUpManager.popUpUIAction(this.SelectInfoUI, 0);
            tempCoverSp.onClick(this, this.closeSelectTalentUI);

            let heroJob = cfg.PetCfgData.getPetJobTypeByPetID(this.SelectRole.id);
            //当前职业对应的推荐技能列表
            let jogRecommendList = cfg.SkillNewRecommendTalentCfgData.getSkillIDByJobType(heroJob).split(";")
            let tempSelectIndex = -1;
            let tempLowAry = cfg.SkillNewTalentUpgradeCfgData.getInfoWithLevel(1);
            let learnList = [];
            let recommendList = [];
            let otherList = []
            //排个序， 可以学习的话最前面， 然后是推荐的，然后是其它
            for (var el of tempLowAry)
            {
                //判断是否可学习
                let needItems = cfg.SkillNewTalentUpgradeCfgData.getNeedItemAryById(el.skillIndex);
                let canLearn = Global.isFullAllRes(needItems, false);
                el["$canLearn"] = canLearn;
                if (canLearn)
                {
                    learnList.push(el);
                    continue;
                }
                //再判断是否为推荐的
                let isRecommend = jogRecommendList.indexOf(el.skillID + "") >= 0;
                el["$isRecommend"] = isRecommend;
                if (isRecommend) recommendList.push(el);
                else otherList.push(el);
            }
            tempLowAry = learnList.concat(recommendList).concat(otherList);
            this.SelectInfoUI.ItemList.onRefresh(tempLowAry.length, this, (itemUI: ProUI.Hero.HeroDetail.UseTalent.TalentItemUI, index: number) =>
            {
                let tempInfo = tempLowAry[index];
                Global.setResIconWithItemID(itemUI.IconImg, CfgID.ResType.Talent, tempInfo.skillIndex);
                Global.setResQuWithItemID(itemUI.QuImg, CfgID.ResType.Talent, tempInfo.skillIndex);
                itemUI.NameLb.text = tempInfo.name;
                itemUI.boxCanLearn.visible = tempInfo["$canLearn"];
                itemUI.boxRecommend.visible = !tempInfo["$canLearn"] && tempInfo["$isRecommend"];
                itemUI.onClick(this, () =>
                {
                    this.onTalentSelectClick(itemUI, tempInfo);
                });
                if (tempSelectIndex == -1)
                {
                    tempSelectIndex = index;
                    this.onTalentSelectClick(itemUI, tempInfo);
                }
            });

        }

        /** 选择一个天赋 */
        private onTalentSelectClick(btn: component.UIButton, tempInfo: cfg.SkillNewTalentUpgradeCfgInfo)
        {

            this.SelectInfoUI.ItemSelectImg.x = btn.x + 61;
            this.SelectInfoUI.ItemSelectImg.y = btn.y + 62;
            this.SelectInfoUI.ItemList.content.setChildIndex(this.SelectInfoUI.ItemSelectImg, this.SelectInfoUI.ItemList.content.numChildren - 1);

            let tmpSkillID = cfg.SkillNewTalentUpgradeCfgData.getSkillIDBySkillIndex(tempInfo.skillIndex);
            let tmpSkillLv = cfg.SkillNewTalentUpgradeCfgData.getLevelBySkillIndex(tempInfo.skillIndex);
            let tmpSkillInfo = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(tmpSkillID, tmpSkillLv);

            Global.setResIconWithItemID(this.SelectInfoUI.SelectItemUI.IconImg, CfgID.ResType.Talent, tempInfo.skillIndex);
            Global.setResQuWithItemID(this.SelectInfoUI.SelectItemUI.BGImg, CfgID.ResType.Talent, tempInfo.skillIndex);
            this.SelectInfoUI.SelectItemUI.NameLb.text = tempInfo.name;
            this.SelectInfoUI.SelectItemUI.DesLb.text = tmpSkillInfo ? tmpSkillInfo.des : "";

            let tempCostAry = cfg.SkillNewTalentUpgradeCfgData.getNeedItemAryById(tempInfo.skillIndex);
            this.SelectInfoUI.CostBox.onRefresh(tempCostAry.length, this, (itemUI: NorItemUI, index: number) =>
            {
                let tmpNeedItem = tempCostAry[index];
                let ownCount = Global.getItemNum(tmpNeedItem.itemid);
                itemUI.setNeedCountItem(tmpNeedItem.itemid, ownCount, tmpNeedItem.itemcount, false);
            });

            this.SelectInfoUI.SureBtn.onClick(this, () =>
            {
                if (!Global.isFullAllRes(tempCostAry))
                {
                    return;
                }
                PetSend.learnTalent_Ask(this.SelectRole.sn, this.SelectEquipType, tempInfo.skillIndex);
                this.closeSelectTalentUI();
            });

        }

        /** 关闭选择天赋UI */
        private closeSelectTalentUI()
        {
            if (this.SelectInfoUI != null)
            {
                PopUpManager.removeUIAction(this.SelectInfoUI, 0, true, true);
                this.SelectInfoUI = null;
            }
        }

        //----------------------------------------升级天赋--------------------------------------------
        /** 升级天赋 */
        private upgradeTalentUI(tempEquipInfo: Pb_God.PBPlayerPetTalent)
        {

            this.UpgradeInfoUI = new ProUI.Hero.HeroDetail.UseTalent.UpgradeInfoUI();
            LayerManager.Inst.topUILayer.addChild(this.UpgradeInfoUI);

            let tempCoverSp = PopUpManager.popUpUIAction(this.UpgradeInfoUI, 0);
            tempCoverSp.onClick(this, this.closeUpgradeTalentUI);

            //获取天赋基础状态
            let tempInfo = cfg.SkillNewTalentUpgradeCfgData.getInfo(tempEquipInfo.skillindex);
            let tempNextInfo = cfg.SkillNewTalentUpgradeCfgData.getInfoWithFun(tempInfo.skillID, tempInfo.level + 1);
            this.UpgradeInfoUI.NextItemUI.gray = tempNextInfo == null;
            this.UpgradeInfoUI.CostBox.gray = tempNextInfo == null;
            this.UpgradeInfoUI.UpgradeBtn.disabled = tempNextInfo == null;

            //当前状态
            Global.setResIconWithItemID(this.UpgradeInfoUI.CurrentItemUI.IconImg, CfgID.ResType.Talent, tempInfo.skillIndex);
            Global.setResQuWithItemID(this.UpgradeInfoUI.CurrentItemUI.BGImg, CfgID.ResType.Talent, tempInfo.skillIndex);
            this.UpgradeInfoUI.CurrentItemUI.NameLb.text = tempInfo.name;
            let skillCfgInfo = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(tempInfo.skillID, tempInfo.level);
            this.UpgradeInfoUI.CurrentItemUI.DesLb.text = skillCfgInfo ? skillCfgInfo.des : "";

            this.UpgradeInfoUI.maxLvBox.visible = tempNextInfo == null;
            this.UpgradeInfoUI.upgradeBox.visible = tempNextInfo != null;

            //下级状态
            if (tempNextInfo != null)
            {
                Global.setResIconWithItemID(this.UpgradeInfoUI.NextItemUI.IconImg, CfgID.ResType.Talent, tempNextInfo.skillIndex);
                Global.setResQuWithItemID(this.UpgradeInfoUI.NextItemUI.BGImg, CfgID.ResType.Talent, tempNextInfo.skillIndex);
                this.UpgradeInfoUI.NextItemUI.NameLb.text = tempNextInfo.name;

                let nextSkillCfgInfo = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(tempInfo.skillID, tempInfo.level + 1);
                this.UpgradeInfoUI.NextItemUI.DesLb.text = nextSkillCfgInfo ? nextSkillCfgInfo.des : "";;

                let tempCostAry = cfg.SkillNewTalentUpgradeCfgData.getNeedItemAryById(tempNextInfo.skillIndex);
                this.UpgradeInfoUI.CostBox.onRefresh(tempCostAry.length, this, (itemUI: ProUI.Hero.HeroDetail.UseTalent.TalentCostItemUI, index: number) =>
                {
                    let tempCostInfo = tempCostAry[index];
                    itemUI.NameLb.text = cfg.ItemCfgData.getNameById(tempCostInfo.itemid);
                    Global.setResIconWithItemID(itemUI.IconImg, CfgID.ResType.Item, tempCostInfo.itemid);
                    Global.setResQuWithItemID(itemUI, CfgID.ResType.Item, tempCostInfo.itemid);
                    Global.setResNumWithItemInfo(itemUI.NumLb, tempCostInfo.itemid, tempCostInfo.itemcount, true, true, "#5b545b", "#f16a3b");
                });

                this.UpgradeInfoUI.UpgradeBtn.onClick(this, () =>
                {
                    if (!Global.isFullAllRes(tempCostAry))
                    {
                        return;
                    }
                    PetSend.upgradeTalent_Ask(this.SelectRole.sn, this.SelectEquipType, tempInfo.skillIndex);
                    this.closeUpgradeTalentUI();
                });
            }

            let need_item_arr = cfg.SkillNewTalentUpgradeCfgData.getDelNeedItemAryById(tempInfo.skillIndex);
            let add_item_Arr = cfg.SkillNewTalentUpgradeCfgData.getDelAddItemAryById(tempInfo.skillIndex);
            let item_name_need = cfg.ItemCfgData.getNameById(need_item_arr[0].itemid);
            let item_name_add = cfg.ItemCfgData.getNameById(add_item_Arr[0].itemid);
            let tip_text = Global.getLangStr("ui_HeroDetail_msg16",
                "<font color='#009e00'>" + need_item_arr[0].itemcount + item_name_need + "</font>",
                "<font color='#009e00'>" + add_item_Arr[0].itemcount + item_name_add + "</font>");

            this.UpgradeInfoUI.RemoveBtn.onClick(this, () =>
            {
                // 提示消耗和返还
                AlertShow.showConfirmAlert(tip_text, this, () =>
                {
                    PetSend.delTalent_Ask(this.SelectRole.sn, this.SelectEquipType, tempInfo.skillIndex);
                    this.closeUpgradeTalentUI();
                });
            });
            /*this.UpgradeInfoUI.RemoveBtn.onClick(this, () => {
                PetSend.delTalent_Ask(this.SelectRole.sn, this.SelectEquipType, tempInfo.skillIndex);
                this.closeUpgradeTalentUI();
            });*/
        }

        /** 关闭升级天赋UI */
        private closeUpgradeTalentUI()
        {
            if (this.UpgradeInfoUI != null)
            {
                PopUpManager.removeUIAction(this.UpgradeInfoUI, 0, true, true);
                this.UpgradeInfoUI = null;
            }
        }
    }
}