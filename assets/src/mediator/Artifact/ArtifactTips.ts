module Pro
{

    /**
    * 神器tips
    * @author jason.xu
    */
    export class ArtifactTips extends ProUI.Artifact.Tips.TipsUI
    {

        public static show(artifactInfo: Pb_God.PBPlayerArtifactInfo): void
        {
            if (!artifactInfo) return;
            var view = new ArtifactTips();
            view.initDataByInfo(artifactInfo);
            view.show();
        }
        public static showById(artifactId: number): void
        {
            var view = new ArtifactTips();
            view.initDataByIdParam(artifactId);
            view.show();
        }

        constructor()
        {
            super();
            this.init();
            this.addEvent();
        }

        private init()
        {
        }

        public show(): void
        {
            LayerManager.Inst.topUILayer.addChild(this);
            //背景添加关闭触发
            let tempCoverSp = PopUpManager.popUpUIAction(this, 0);
            if (tempCoverSp)
            {
                tempCoverSp.on(Laya.Event.CLICK, this, this.close);
            }
        }

        public close(): void
        {
            PopUpManager.removeUIAction(this, 0, true, true);
        }

        public initDataByInfo(artifactInfo: Pb_God.PBPlayerArtifactInfo): void
        {
            this.initDataByIdParam(artifactInfo.id, artifactInfo.skilllevel);
        }

        private initDataByIdParam(id: number, skilllevel: number = 1): void
        {
            let level = ArtifactDataMgr.getFazhenInfo().level;
            let isFullShow = level <= 0;  //呈满配显示状态
            let skillId = cfg.ArtifactCfgData.getSkillIDByID(id);
            if (isFullShow)
            {
                level = cfg.ArtifactUpgradeCfgData.getMaxLevelByID(id);
                skilllevel = cfg.SkillNewSkillCfgData.getMaxLevelBySkillId(skillId);
            }
            let strName = cfg.ArtifactCfgData.getNameByID(id);
            this.txtName.text = Global.FormatString("{0}(+{1})", strName, level);
            //技能描述
            let tempSkillInfo = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(skillId, skilllevel || 1);
            this.txtDiscribe.text = tempSkillInfo.des;
            Global.setResIconWithItemID(this.imgIcon, CfgID.ResType.Skill, tempSkillInfo.skillIndex);

            //背景高度适配， vbox的实际高度还要等下下帧才会正常，故此处手动算出来
            let totalHeight = this.vbox.y + 25;
            //升级属性            
            let upgradeAtterAry = cfg.ArtifactUpgradeCfgData.getAddAttrAryByIdLevel(level);
            this.listUpgradeAttr.onRefresh(upgradeAtterAry.length, this, (attrItemUI: ProUI.Artifact.Tips.UpgradeAttrItemUI, attrIndex: number) =>
            {
                var attrData = upgradeAtterAry[attrIndex];
                attrItemUI.iconType.frame = attrData.type;
                var attrName = cfg.BattleCfgData.getDescByAttrType(attrData.type);
                var attrValue = Global.getAttrValueString(attrData);
                attrItemUI.txtValue.text = Global.getLangStr("artifact_msg4", attrName, attrValue);
            })
            this.normal.height = this.listUpgradeAttr.getCellTrueHeight() + this.listUpgradeAttr.y;
            totalHeight += this.normal.height;

            //技能特殊属性
            let cfglist = cfg.ArtifactSkillUpgradeCfgData.getHasAddAddAttrInfos(skillId);
            //是否元灵觉醒
            // let awakeActive = ArtifactDataMgr.getYlActivePro(id) >= 3;
            let awakeActive = ArtifactDataMgr.getIsFazhenAwake();
            this.listSkillAttr.onRefresh(cfglist.length, this, (tempUI: ProUI.Artifact.Tips.SkillAttrItemUI, index: number) =>
            {
                var cfgInfo = cfglist[index];
                let attr: cfg.AddAtterInfo = cfgInfo["addAddAttrInfo"];
                let awakeAttr: cfg.AddAtterInfo = cfgInfo["addAwakeAddAttrInfo"]; //元灵觉醒额外加成
                var attrName = cfg.BattleCfgData.getDescByAttrType(attr.type);
                var attrValue = Global.getAttrValueString(attr);
                //元灵觉醒后还需要加上额外属性
                if (awakeActive)
                {
                    attrValue += Global.getLangStr("artifact_msg2", Global.getAttrValueString(awakeAttr));
                }
                var color = skilllevel >= cfgInfo.skillLevel || isFullShow ? "#009e00" : "#877f77";
                tempUI.txtLevel.text = Global.getLangStr("artifact_msg5", cfgInfo.skillLevel);
                tempUI.txtValue.text = Global.getLangStr("artifact_msg4", attrName, attrValue);
                tempUI.txtLevel.color = color;
                tempUI.txtValue.color = color;
            })
            this.skill.height = this.listSkillAttr.getCellTrueHeight() + this.listSkillAttr.y;
            totalHeight += this.vbox.space + this.skill.height;

            // //精炼属性
            // if (refineLevel > 0) {
            //     this.txtName.text += Global.getLangStr("artifact_msg6", refineLevel);
            //     totalHeight += this.vbox.space + this.refine.height;
            //     // var attr = cfg.ArtifactSkillUpgradeCfgData.getAddAttrInfoById(cfgInfo.index);
            //     // var attrName = cfg.BattleCfgData.getDescByAttrType(attr.type);
            //     // var attrValue = Global.getAttrValueString(attr);
            //     // this.refineAttrView.txtValue.text = Global.getLangStr("artifact_msg7", attrValue);
            //     // this.refineAttrView.txtLevel.text = Global.getLangStr("artifact_msg8", cfgInfo.skillLevel);
            // }
            // else {
            //     // this.refine.removeSelf();
            //     this.refine.visible = false;
            // }

            this.vbox.refresh();
            this.height = totalHeight;
        }

        private addEvent(): void
        {
        }

    }
}