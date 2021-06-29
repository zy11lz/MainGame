module Pro
{
    /** 法阵升级 */
    export class ArtifactUpgradeTable extends ProUI.Artifact.AllList.UpgradeViewUI
    {

        /** 自动升级中*/
        private _autoUpgrade = false;

        //-------------------------------------Event Fun-----------------------------

        /** 刷新状态 */
        public refreshUI()
        {

            //神器
            let tempInfo = ArtifactDataMgr.getFazhenInfo();

            //当前属性
            let tempLvAtterAry = cfg.ArtifactUpgradeCfgData.getAddAttrAryByIdLevel(tempInfo.level);
            let tempExpAtterAry = cfg.ArtifactUpgradeCfgData.getExpAddAttrAryByIdLevel(tempInfo.level);
            //是否元灵法阵觉醒
            let awakeActive = ArtifactDataMgr.getIsFazhenAwake();
            let awakeAddAttr = awakeActive ? cfg.ArtifactConstCfgData.getFazhenAwakeAddAttr() : null;
            this.AtkLb.text = this.getAttrString(tempLvAtterAry, tempExpAtterAry, tempInfo.exp, awakeAddAttr, Pb_God._emBattleAttribute.BattleAttribute_Attack);
            this.BloodLb.text = this.getAttrString(tempLvAtterAry, tempExpAtterAry, tempInfo.exp, awakeAddAttr, Pb_God._emBattleAttribute.BattleAttribute_HPMax);

            //是否可以升级
            let currExpInfp = cfg.ArtifactUpgradeCfgData.getInfo(tempInfo.level);
            let nextExpInfo = cfg.ArtifactUpgradeCfgData.getInfo(tempInfo.level + 1);

            //升级节点显示
            this.UpgradeCostBox.visible = nextExpInfo != null;
            this.UpgradeBtn.visible = nextExpInfo != null;
            this.AutoUpgradeBtn.visible = nextExpInfo != null;

            //升级状态显示
            if (nextExpInfo == null)
            {
                this.ProgressImg.width = 604;
                this.ProgressLb.text = Global.getLangStr("common_lv_full");

                if (this._autoUpgrade)
                {
                    // 已满级
                    this.autoUpgradeClose();
                }

            }
            else
            {
                //经验进度
                this.ProgressImg.width = tempInfo.exp / currExpInfp.maxExp * 604;
                this.ProgressLb.text = tempInfo.exp + "/" + currExpInfp.maxExp;

                //升级消耗
                let tempNeedItemAry = cfg.ArtifactUpgradeCfgData.getNeedItemAryByIdLevel(tempInfo.level);
                this.UpgradeCostBox.onRefresh(tempNeedItemAry.length, this, (itemUI: ProUI.Artifact.CostItemUI, index: number) =>
                {
                    Global.drawItemUI(itemUI, tempNeedItemAry[index], false, true, true, "#14a52c", "#e92617");
                });

                this.UpgradeBtn.onClick(this, () =>
                {
                    if (!Global.isFullAllRes(tempNeedItemAry))
                    {
                        return;
                    }
                    ArtifactSend.upgrade();
                });

                this.AutoUpgradeBtn.onClick(this, () =>
                {
                    if (!this._autoUpgrade)
                    {
                        if (Global.isFullAllRes(tempNeedItemAry))
                        {
                            this.autoUpgrade();
                        }
                    }
                    else
                    {
                        this.autoUpgradeClose();
                    }
                });

                //自动升级中
                if (this._autoUpgrade)
                {
                    if (!Global.isFullAllRes(tempNeedItemAry))
                    {
                        this.autoUpgradeClose();
                    }
                }


            }
        }

        private getAttrString(baseAttr: cfg.AddAtterInfo[], expAttr: cfg.AddAtterInfo[], exp: number, awakeAddAttr: cfg.ValueTwoInfo[], attrType: number): string
        {
            let value = Global.getAtterValue(baseAttr, attrType);
            //加上经验加成的
            value += Math.floor(Global.getAtterValue(expAttr, attrType) * exp);

            let ret = cfg.BattleCfgData.getDescByAttrType(attrType) + ": " + value;
            if (!awakeAddAttr || awakeAddAttr.length == 0) return ret;

            for (let attrInfo of awakeAddAttr)
            {
                if (attrInfo.value1 == attrType)
                {
                    ret += Global.getLangStr("artifact_msg2", Math.floor(value * attrInfo.value2 / 10000));
                    break;
                }
            }
            return ret;
        }

        //------------------------------------自动升级---------------------------------------
        /** 开启自动升级 */
        private autoUpgrade()
        {
            Laya.timer.loop(300, this, this.autoUpgradeOnce);
            this.AutoUpgradeLb.text = Global.getLangStr("common_stop");
            this._autoUpgrade = true;
        }

        /** 关闭自动升级 */
        public autoUpgradeClose()
        {
            Laya.timer.clear(this, this.autoUpgradeOnce);
            this.AutoUpgradeLb.text = Global.getLangStr("common_auto_upgrade");
            this._autoUpgrade = false;
        }

        /** 触发一次升级 */
        private autoUpgradeOnce()
        {
            ArtifactSend.upgrade();
        }
    }
}