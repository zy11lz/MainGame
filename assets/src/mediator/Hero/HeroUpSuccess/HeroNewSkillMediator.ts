module Pro
{
    /**
    * 界面说明：  英雄开启新技能提示
    * @author jason.xu
    */
    export class HeroNewSkillMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Hero.HeroUpSuc.HeroNewSkillUI;
        private _effNode: EffNode /**
* 界面说明：  英雄开启新技能提示
* @author jason.xu
*/;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("heroupsuc"), UrlMgr.getAtlas("rewardpopup")];
        }

        public openUI(): void
        {
            SoundMgr.Inst().playSound("pin");
            this.showPanel(ProUI.Hero.HeroUpSuc.HeroNewSkillUI, 1, BaseAddLayer.TopUI, true);
        }

        public closeUI(): void
        {
            EffectMgr.Inst.releaseEffect(this._effNode);
            this._effNode = null;
            super.closeUI();
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
            if (this._effNode == null)
            {
                this._effNode = EffectMgr.Inst.createLoopEffect("ui_heroSkUnlock", new Laya.Point(0, 0), -1, 1.55, 1, this.UIPanel.effNodePos, ResReleaseType.Reference);
            }

            let skillid = this.UIOpenData.customObject as number;
            let skillCfgInfo = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(skillid, 1);
            Global.setResIconWithItemID(this.UIPanel.icon, Pro.CfgID.ResType.Skill, skillCfgInfo.skillIndex);
            this.UIPanel.txtName.text = skillCfgInfo.name;
            this.UIPanel.txtDes.text = skillCfgInfo.des;
            //1行就居中，2行或以上就左对齐
            this.UIPanel.txtDes.align = this.UIPanel.txtDes.textField.lines.length > 1 ? "left" : "center";
            this.UIPanel.imgDesBg.height = this.UIPanel.txtDes.height - 15;
            this.UIPanel.bg.height = this.UIPanel.imgDesBg.height + this.UIPanel.imgDesBg.y - 25;
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

        //-----------------------------------新手引导------------------------------------
        /**
         * 进入本步引导
         */
        public Guide_Enter(step: GuideStep)
        {
            if (step == GuideStep.Func_7DayActUpPet_8)
            {
                Laya.timer.once(50, this, () =>
                {
                    GuideMgr.Inst.showFinger(this.UIPanel.TipsImg, true, this.getDarkUI());
                })
            }
        }

    }
}