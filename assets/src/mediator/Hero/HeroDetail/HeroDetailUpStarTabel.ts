module Pro
{
    export class HeroDetailUpStarTabel extends ProUI.Hero.HeroDetail.FunLayer1UI implements ITableView
    {

        private SelectRole: Net.hero;

        /** 页签组件销毁 */
        dispose(): void
        {

        }

        /** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        initialization(): void
        {

        }

        //-------------------------------------------------------------------------------------------
        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        addEvent(): void
        {
            EventMgr.on(CmdEvent.Pet_SynPreviewAttr, this, this.onUpStarUI);
            //升星返回
            EventMgr.on(EventNotify.Pet_Star_Changed, this, this.onUpStar_Ack);
        }
        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        removeEvent(): void
        {
            EventMgr.off(CmdEvent.Pet_SynPreviewAttr, this, this.onUpStarUI);
            //升星返回
            EventMgr.off(EventNotify.Pet_Star_Changed, this, this.onUpStar_Ack);
        }

        /** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
        show(): void
        {

        }

        /** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
        hide(): void
        {
            this.SelectRole = null;
            Laya.timer.clearAll(this);
        }

        setData($data: any): void
        {
            let isChange = this.SelectRole != $data;
            this.SelectRole = $data;
            this.refreshUI(isChange);
        }


        /** 刷新状态 */
        public refreshUI(isChange: boolean)
        {
            this.CurrentStarBox.setStar(this.SelectRole.star);
            this.NextStarBox.setStar(this.SelectRole.star + 1);

            let tmpUpStarInfo = cfg.PetUpStarCfgData.getInfoWithFun(this.SelectRole.id, this.SelectRole.star + 1);
            tmpUpStarInfo != null && this.UpStarInfo.init(this.SelectRole.sn, this.SelectRole.id, tmpUpStarInfo.star, isChange);

            this.onUpStarUI();
        }

        private getHeroMaxLevel(id: number, star: number): number
        {
            let currentUpStarInfo = cfg.PetUpStarCfgData.getInfoWithFun(id, star);
            let currentMaxLevel = cfg.PetAdvanceCfgData.getMaxPetLevelByAdvance(star);
            if (currentUpStarInfo != null && star > cfg.PetCfgData.getInitMaxAdvanceByPetID(id))
            {
                currentMaxLevel = currentUpStarInfo.maxLevel;
            }
            return currentMaxLevel;
        }

        private onUpStarUI()
        {
            let currMaxLevel = this.getHeroMaxLevel(this.SelectRole.id, this.SelectRole.star);
            let NextMaxLevel = this.getHeroMaxLevel(this.SelectRole.id, this.SelectRole.star + 1);

            this.UpType1Box.visible = this.SelectRole.star < 6;
            this.UpType2Box.visible = !this.UpType1Box.visible;
            if (this.SelectRole.star < 6)
            {
                this.resetAttrAddTextView(this.Type1UpAtterLb, this.SelectRole.id, this.SelectRole.star);
                this.Type1NextLevelLb.text = NextMaxLevel.toString();
                this.Type1OldLevelLb.text = currMaxLevel.toString();
                this.UpType1SkillBox.visible = this.SelectRole.star == 5;
                this.Type1UpAtterLb.y = this.UpType1SkillBox.visible ? 73.5 : 48;
            }
            else
            {
                this.resetAttrAddTextView(this.Type2UpAtterLb, this.SelectRole.id, this.SelectRole.star);
                this.Type2NextLevelLb.text = NextMaxLevel.toString();
                this.Type2OldLevelLb.text = currMaxLevel.toString();

                let tmpSkillAry = cfg.PetSkinCfgData.getAddSkillAryById(this.SelectRole.useskinid);
                let tmpNewSKIndex = this.SelectRole.star - 6;
                let tmpNewSkStatue = this.SelectRole.star + 1 <= 10 && tmpNewSKIndex < tmpSkillAry.length;

                if (tmpNewSkStatue)
                {

                    let tmpNewSKillID = tmpSkillAry[tmpNewSKIndex].value1;

                    let tmpOldSkillInfo = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(tmpNewSKillID, 2);
                    let tmpNewSkillInfo = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(tmpNewSKillID, 3);
                    if (tmpOldSkillInfo == null || tmpNewSkillInfo == null)
                    {
                        tmpNewSkStatue = false;
                        logE("找不到对应的2、3级技能:" + tmpNewSKillID);
                    }
                    else
                    {
                        this.Type2OldSkillInfo.LvLb.text = tmpOldSkillInfo.skillLevel.toString();
                        Global.setResIconWithItemID(this.Type2OldSkillInfo.IconImg, Pro.CfgID.ResType.Skill, tmpOldSkillInfo.skillIndex);
                        this.Type2OldSkillInfo.onClick(this, () =>
                        {
                            Pro.UIManager.Inst.forceOpen(new Pro.SkillReviewOpenUIData(0, tmpOldSkillInfo.skillIndex));
                        });

                        this.Type2NextSkillInfo.LvLb.text = tmpNewSkillInfo.skillLevel.toString();
                        Global.setResIconWithItemID(this.Type2NextSkillInfo.IconImg, Pro.CfgID.ResType.Skill, tmpNewSkillInfo.skillIndex);
                        this.Type2NextSkillInfo.onClick(this, () =>
                        {
                            Pro.UIManager.Inst.forceOpen(new Pro.SkillReviewOpenUIData(0, tmpNewSkillInfo.skillIndex));
                        });
                    }
                }

                this.UpType2Box.x = tmpNewSkStatue ? 30 : -170;
                this.Type2SkillBox.visible = tmpNewSkStatue;
            }
        }

        /** 刷新攻防血提升文字显示 */
        private resetAttrAddTextView(lb: component.UILabel, petId: number, star: number): void
        {
            if (star == 4)
            {
                lb.text = Global.getLangStr("hero_msg42"); //速度提升10
                return;
            }
            let allAttrNames = Global.getLangStr("hero_msg17").split(";");
            let attrNames = [];
            let attrValues = [];
            let petCfgInfo = cfg.PetCfgData.getInfo(petId);
            let nextStar = star + 1;
            let starRateArr = petCfgInfo["starRate" + nextStar].split(";");
            //1|1.4;2|1.45;3|1;4|1
            for (var el of starRateArr)
            {
                let elArr = el.split("|");
                let value = parseFloat(elArr[1]);
                if (value <= 1) continue;
                attrValues[attrValues.length] = Global.parsePercentNum(value - 1, 0);
                attrNames[attrNames.length] = allAttrNames[parseInt(elArr[0]) - 1];
            }
            //攻/血成长提升20%/30%
            lb.text = attrNames.join("/") + Global.getLangStr("hero_msg18") + attrValues.join("/");
        }

        private onUpStar_Ack(): void
        {
            this.refreshUI(true);
        }

    }
}