module Pro
{
    /**
     * 界面说明： 英雄神装总属性加成tips展示
    * @author jason.xu
    */
    export class HeroGodEquipTotalMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Hero.HeroDataInfo.GodEquipTotalUI;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return null;
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Hero.HeroDataInfo.GodEquipTotalUI, 0, BaseAddLayer.TopUI, true);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            let data: Pb_God.PBG2CGodEquipPreview = this.UIOpenData.customObject;
            this.UIPanel.txtFightPower.text = Global.getLangStr("rank_msg5") + data.power;

            let totalHeight = this.UIPanel.boxAttr.y + this.UIPanel.listAttr.y
            //看看有没有属性，如果没有，可能是一件神装也没有装上
            if (data.attri && data.attri.length > 0)
            {
                this.UIPanel.boxAttr.visible = true;
                this.UIPanel.listAttr.onRefresh(data.attri.length, this, (itemUI: ProUI.Utils.AttrInfoItemUI, index: number) =>
                {
                    let attrInfo = data.attri[index];
                    itemUI.imgType.frame = attrInfo.type;
                    itemUI.txtValue.text = cfg.BattleCfgData.getDescByAttrType(attrInfo.type) + ":" +
                        Global.getAttrValueStringSub(attrInfo.type, attrInfo.value.toNumber() / 100, 0, 1, 1);
                })
                totalHeight += this.UIPanel.listAttr.getCellTrueHeight();
                //特殊效果
                let suitId = data.suit; //只有在四件齐了的时候才有值
                this.UIPanel.boxSpecial.visible = false;
                if (suitId)
                {
                    let godSuitInfo = cfg.GodEquipSuitCfgData.getInfo(suitId);
                    let tmpSkillInfo = cfg.GodEquipSuitCfgData.getAddSkillInfoByInfo(godSuitInfo);
                    this.UIPanel.boxSpecial.visible = !!tmpSkillInfo;
                    if (tmpSkillInfo)
                    {
                        this.UIPanel.boxSpecial.y = totalHeight + 8;
                        var skillCfgInfo = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(tmpSkillInfo.skillID, tmpSkillInfo.skillLv);
                        this.UIPanel.skillBox.visible = !!godSuitInfo.hasSkillIcon;
                        if (godSuitInfo.hasSkillIcon)
                        {
                            Global.setResIconWithItemID(this.UIPanel.imgSkillIcon, CfgID.ResType.Skill, skillCfgInfo.skillIndex);
                            this.UIPanel.txtSkillDesc.text = skillCfgInfo.des;
                            this.UIPanel.txtSkillName.text = skillCfgInfo.name;
                            this.UIPanel.boxSpecial.height = 175;
                        } else
                        {
                            this.UIPanel.boxSpecial.height = 62;
                            this.UIPanel.txtSkillName.text = skillCfgInfo.des;
                        }
                        totalHeight = this.UIPanel.boxSpecial.y + this.UIPanel.boxSpecial.height;
                    }
                }

            } else
            {
                this.UIPanel.boxAttr.visible = false;
                this.UIPanel.boxSpecial.visible = false;
            }

            this.UIPanel.height = this.UIPanel.imgBg.height = totalHeight + 20;
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

    }
}