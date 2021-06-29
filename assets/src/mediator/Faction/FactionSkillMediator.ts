module Pro
{
    /**
    *
    * 模块：公会技能界面
    *
    * @author jason.xu
    *
    */
    export class FactionSkillMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Faction.FactionSkillUI;

        /** 当前操作的职业类型  */
        private _curJob: number;
        /** 当前正在操作的图标(记下来，升级时做特效有用) */
        private _curOpIcon: Laya.Node;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("factionskill")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Faction.FactionSkillUI, 1, BaseAddLayer.TopUI,true);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            //主分页按钮
            this.UIPanel.tabGroup.onClick(this, this.onClickTabGroup,
                [new component.UITabData("hero_job1"), new component.UITabData("hero_job2"),
                new component.UITabData("hero_job3"), new component.UITabData("hero_job4")],
                [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]
            );
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            //四个分页，关联四个红点模型
            let skillReddotModel = FactionDataMgr.reddotModel.getChildModel("skill");
            let redDotModes = [
                skillReddotModel.getChildModel(1),
                skillReddotModel.getChildModel(2),
                skillReddotModel.getChildModel(3),
                skillReddotModel.getChildModel(4)
            ]
            this.UIPanel.tabGroup.setRedDotModelList(redDotModes);

            this.UIPanel.tabGroup.setSelectTab(0);
        }



        /** 本类界面打开状态下监听消息列表 */
        public addEvent(): void
        {
            this.addEventMgr(EventNotify.Faction_Skill_Update, this, this.onSkillUpdate);

            this.UIPanel.btnClose.onClick(this, this.closeUI);

            this.UIPanel.btnHelp.onClick(this, this.onClickHelp);
            this.UIPanel.btnReset.onClick(this, this.onClickReset);
            this.UIPanel.btnIllume.onClick(this, this.onClickIllume);
        }

        /** 本类界面打开状态下监听消息列表 */
        public removeEvent(): void
        {
        }


        /** 点击分页 */
        onClickTabGroup(tab: component.UITab, tabIndex: number, oldTabIndex: number): void
        {
            this._curJob = tabIndex + 1;
            let reddotModel = FactionDataMgr.reddotModel.getChildModel("skill").getChildModel(this._curJob);
            if (reddotModel.isRedDot) { reddotModel.setOpenState(false); }  //点过一次就关掉不要显示了。
            this.refreshUI();
        }

        /** 点击点亮按钮 */
        private onClickIllume(): void
        {
            let skillLevel = FactionDataMgr.getSkillLevel(this._curJob);
            let cfgData = cfg.FactionSkillUpgradeCfgData.getInfo(skillLevel + 1);  //下一级数据
            if (!cfgData)
            { //满级了
                TipsUtils.showTipsByLanId("common_lv_full");
                return;
            }
            //判断前置等级
            if (cfgData.needAllSkillLevel > FactionDataMgr.getMinSkillLevel())
            {
                let needBigLv = Math.floor(cfgData.needAllSkillLevel / 6) + 1;
                TipsUtils.showTipsByLanId("tips_msg21", needBigLv);
                return;
            }
            //判断道具是否足够
            let needItems = cfg.FactionSkillUpgradeCfgData.getNeedItemAryByLevel(skillLevel + 1);
            if (!Global.isFullAllRes(needItems, true)) { return; }
            FactionSend.upgradeSkill(this._curJob, skillLevel);
            //在对应位置上闪一下光
            //升级特效
            let iconView = this.UIPanel.iconList.getChildAt(skillLevel % 6) as Laya.Box;
            let pos = new Laya.Point(iconView.x + iconView.width / 2, iconView.y + iconView.height / 2);
            EffectMgr.Inst.createEffectOne("ui_unionSkUpgrade", pos, null, 1, 1.5, iconView.parent as Laya.Sprite, true, ResReleaseType.Reference);
        }

        /** 点击重置按钮 */
        private onClickReset(): void
        {
            //打开重置界面
            var panel = new FactionSkillResetPanel();
            panel.show();
            panel.refreshView(this._curJob);
        }

        /** 点击帮助说明 */
        private onClickHelp(btn: component.UIButton): void
        {
            let content = Global.getLangStr("faction_help_skill");
            CommonHelpView.show(btn, content);
        }

        /** 技能等级变化 */
        private onSkillUpdate(jobType: number, level: number): void
        {
            if (this._curJob != jobType) { return; }
            SoundMgr.Inst().playSound("grow");
            this.refreshUI();
        }



        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            let skillCfgList = cfg.FactionSkillCfgData.getDataArrayByJobType(this._curJob);
            //当前等级
            let level = FactionDataMgr.getSkillLevel(this._curJob);
            //最大等级
            let maxLevel = cfg.FactionSkillUpgradeCfgData.getMaxLevel();
            //循环等级数
            let loopLength = skillCfgList.length;

            //当前小等级（循环内）
            let minLevel = level % loopLength;
            //当前大等级（比如2重天， 6个等级一个循环）
            let mainLevel = Math.floor(level / loopLength) + 1;
            let maxMainLevel = Math.floor((maxLevel - 1) / loopLength) + 1;

            this.UIPanel.btnReset.visible = level > 0;

            //是否已满级
            let isMaxLevel = maxLevel <= level;
            this.UIPanel.btnIllume.disabled = isMaxLevel;
            if (isMaxLevel)
            {
                //满级时，显示的等级只需要显示到当前等级的即可，不需要预览到下一阶了。
                mainLevel = Math.floor((level - 1) / loopLength) + 1;
                minLevel = loopLength;
                this.resetUpgradeNeedView([]);
            } else
            {
                //升级所需道具显示
                let needItems = cfg.FactionSkillUpgradeCfgData.getNeedItemAryByLevel(level + 1);
                this.resetUpgradeNeedView(needItems);
            }

            //力量1重天
            this.UIPanel.txtLvTitle.text = Global.getLangStr("faction_skillType" + this._curJob) + Global.getLangStr("faction_msg27", mainLevel); //力量2重天;
            this.UIPanel.txtLvValue.text = "(" + mainLevel + "/" + maxMainLevel + ")";
            //刷新属性显示
            this.resetAttributeView(minLevel, mainLevel);
        }

        // 重置升级所需的材料显示
        private resetUpgradeNeedView(needItems: cfg.AddItemInfo[])
        {
            let needContri = 0;
            let needGold = 0;
            let ownGold = Global.getItemNum(Pb_God._emExpendType.ExpendType_Gold);
            let ownContri = Global.getItemNum(Pb_God._emExpendType.ExpendType_FactionContri);
            for (let element of needItems)
            {
                if (element.itemid == Pb_God._emExpendType.ExpendType_FactionContri) { needContri = element.itemcount; }
                if (element.itemid == Pb_God._emExpendType.ExpendType_Gold) { needGold = element.itemcount; }
            }
            this.UIPanel.txtNeedDonate.color = ownContri >= needContri ? "#784720" : "#e60000";
            this.UIPanel.txtNeedGold.color = ownGold >= needGold ? "#784720" : "#e60000";
            this.UIPanel.txtNeedDonate.text = Global.numberToTuckString(ownContri) + "/" + needContri;
            this.UIPanel.txtNeedGold.text = Global.numberToTuckString(ownGold) + "/" + needGold;
        }

        //重置属性显示
        private resetAttributeView(minLevel: number, mainLevel: number): void
        {
            let skillCfgList = cfg.FactionSkillCfgData.getDataArrayByJobType(this._curJob);
            //属性加成倍率，受大等级与当前循环进度影响
            let attrScale = mainLevel - 1;
            //属性列表显示
            this.UIPanel.attrList.onRefresh(skillCfgList.length, this, (attrBox: Laya.Box, index: number) =>
            {
                let cfgData = skillCfgList[index];
                let scale = attrScale;
                if (minLevel >= cfgData.type) { scale += 1; }
                this.resetSingleAttribute(attrBox, cfg.FactionSkillCfgData.getAddAttrInfoByCfgInfo(cfgData), scale);
            });
            //图标点亮显示
            this.UIPanel.hboxCurProp.visible = false;
            for (let i = 0; i < skillCfgList.length; i++)
            {
                let cfgData = skillCfgList[i];
                let iconView = this.UIPanel.iconList._children[i];
                this.resetSingleIconView(iconView, cfgData, minLevel, mainLevel);
            }
        }

        /** 单个Icon刷新 */
        private resetSingleIconView(iconView: ProUI.Faction.ChildView.FactionSkillItemUI, cfgData: cfg.FactionSkillCfgInfo, minLevel: number, mainLevel: number)
        {
            iconView.imgIcon.skin = `res/factionskill/faction_skill_${ cfgData.jobType }_${ cfgData.type }.png`;
            iconView.imgIcon.gray = minLevel < cfgData.type;
            iconView.txtLv.text = mainLevel + "";
            iconView.imgLight.visible = minLevel + 1 == cfgData.type;
            if (minLevel + 1 == cfgData.type)
            { //当前属性
                this._curOpIcon = iconView;
                this.UIPanel.hboxCurProp.visible = true;
                let attr = cfg.FactionSkillCfgData.getAddAttrInfoByCfgInfo(cfgData);
                this.UIPanel.txtCurPropName.text = cfg.BattleCfgData.getDescByAttrType(attr.type);
                this.UIPanel.txtCurPropValue.text = "+" + Global.getAttrValueString(attr);
                this.UIPanel.hboxCurProp.refresh();
            }
        }

        /** 单个属性显示 */
        private resetSingleAttribute(box: Laya.Box, attr: cfg.AddAtterInfo, scale: number): void
        {
            let imgIcon = box.getChildByName("imgIcon") as component.UIFrameImage;
            let txtName = box.getChildByName("txtAttrName") as component.UILabel;
            let txtValue = box.getChildByName("txtAttrValue") as component.UILabel;
            imgIcon.frame = attr.type;
            txtName.text = cfg.BattleCfgData.getDescByAttrType(attr.type);
            txtValue.text = "+" + Global.getAttrValueString(attr, scale);
            txtValue.x = txtName.x + txtName.width + 5;
        }

    }
}