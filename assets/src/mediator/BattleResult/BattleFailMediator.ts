
module Pro
{
	/**
	 * 战斗失败通用界面
	 */
    export class BattleFailMediator extends BaseMediator implements IMediator
    {
        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("rewardpopup")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return [];
        }

        private CountDown = 5;
        public UIPanel: ProUI.BattleResult.FailUI;
        public UIOpenData: AwardOpenUIData;

        public openUI(): void
        {
            this.showPanel(ProUI.BattleResult.FailUI, 1, BaseAddLayer.TopUI);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            Laya.timer.clearAll(this);
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.CloseBtn.onClick(this, this.closeUI);
            this.UIPanel.HeroCallBtn.onClick(this, () =>
            {
                this.closeUI();
                TaskUtils.gotoPanel(PanelNotify.Open_HeroCall);
            });
            this.UIPanel.HeroBagBtn.onClick(this, () =>
            {
                this.closeUI();
                TaskUtils.gotoPanel(PanelNotify.Open_HeroBag);
            });
            this.UIPanel.HeroEquipBtn.onClick(this, () =>
            {
                this.closeUI();
                TaskUtils.gotoPanel(PanelNotify.Open_HeroBag);
            });
            this.UIPanel.ArtifactBtn.onClick(this, () =>
            {
                this.closeUI();
                TaskUtils.gotoPanel(PanelNotify.Open_Artifact);
            });
            this.UIPanel.JumpTypeBtn.onClick(this, () =>
            {
                this.closeUI();
                TaskUtils.gotoPanel(PanelNotify.Open_HeroStronger);
            });
            this.getDarkUI().graphics.clear();
            this.getDarkUI().graphics.drawRect(0, 0, this.getDarkUI().width, this.getDarkUI().height, "#2d2629");
            this.getDarkUI().alpha = 0.85;
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {

        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            SoundMgr.Inst().playSound("battle_fail")

            let pFightResult: Pb_God.PBFightResult = this.UIOpenData.customObject;
            // 战败引导 只引导一次 需要存储状态 1引导过 2没引导过
            if (HookDataMgr.failGuideState == 2 && pFightResult && pFightResult.base.battletype == Pb_God._emBattleType.BattleType_Hook)
            {
                HookDataMgr.failGuideState = 1;
                GameLaunch.saveClientData();
                FuncGuideMgr.Inst.forceOpenFuncGuide(GuideStep.Func_Fail_1);
            }

            this.UIPanel.TimeLb.visible = !GuideMgr.Inst.getInAllShowGuide();
            if (!GuideMgr.Inst.getInAllShowGuide())
            {
                this.CountDown = 5;
                this.UIPanel.TimeLb.visible = true;
                this.UIPanel.TimeLb.text = Global.getLangStr("common_closeCd", this.CountDown);
                Laya.timer.loop(1000, this, () =>
                {
                    this.CountDown--;
                    this.UIPanel.TimeLb.text = Global.getLangStr("common_closeCd", this.CountDown);
                    if (this.CountDown < 0)
                    {
                        this.closeUI();
                    }
                });
            }
        }

        public refreshUI()
        {
        }


        //-----------------------------------新手引导------------------------------------
        /**
         * 进入本步引导
         */
        public Guide_Enter(step: GuideStep)
        {
            Laya.timer.once(500, this, () =>
            {
                if (step == GuideStep.Func_Fail_1)
                {
                    GuideMgr.Inst.showFinger(this.UIPanel.JumpTypeBtn, false, this.UIPanel.JumpTypeBtn);
                } else
                {
                    GuideMgr.Inst.showFinger(this.UIPanel.CloseBtn, true, this.UIPanel.CloseBtn);
                }
            });
        }

        /**
         * 操作本步引导
         */
        public Guide_Active(step: GuideStep)
        {
            // this.onClose();
            // GuideMgr.Inst.nextActive();
        }
    }
}