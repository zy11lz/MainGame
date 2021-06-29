
module Pro
{
	/**
     * 快速作战、挂机收益
     */
    export class QuickAwardMediator extends BaseMediator implements IMediator
    {

        UIPanel: ProUI.Common.QuickAwardUI;
        UIOpenData: QuickAwardOpenUIData;
        TmpGetExp: number;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("rewardpopup")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Common.QuickAwardUI, 1, BaseAddLayer.TopUI, true);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.showEffRewardFly();
            this.closePanel();
        }

        // 奖励动画
        public showEffRewardFly(){
            for (let i = 0; i < this.UIOpenData.ItemList.length; i++) 
            {
                let itemUI = this.UIPanel.RewardList.getCell(i);
                if(itemUI)
                {
                    let itemPoint = itemUI.localToGlobal(new Point(itemUI.width / 2,itemUI.height / 2));
                    EventMgr.trigger(EventNotify.Award_Effect_Fly,this.UIOpenData.ItemList[i],itemPoint);
                }
                
            }
        }


        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
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
            //显示标题
            this.UIPanel.TitleFrameImg.frame = this.UIOpenData.isHookReward ? 1 : 2;
            this.UIPanel.TitleLb.text = this.UIOpenData.isHookReward ? Global.getLangStr("hook_msg1") : Global.getLangStr("hook_msg2"); //挂机收益: : 快速作战:;
            this.UIPanel.HookTimeLb.text = Global.GetRemindTime(this.UIOpenData.rewardTime * 60, 7);
            this.UIPanel.PlayerIconInfo.setSimpleInfo(ShapeDataMgr.iconId, ShapeDataMgr.iconFrameID, PlayerDataMgr.gender, PlayerDataMgr.level);
            this.UIPanel.PlayerIconInfo.spLv.visible = false;
            this.UIPanel.PlayerIconInfo.txtLv.visible = false;
            this.TmpGetExp = 0;

            //显示奖励
            let tempItemNum = this.UIOpenData.ItemList.length;
            let tempPetNum = this.UIOpenData.PetList == null ? 0 : this.UIOpenData.PetList.length;
            this.UIPanel.RewardList.onRefresh(tempItemNum + tempPetNum, this, (itemUI: NorItemUI, index: number) =>
            {
                if (index < tempItemNum)
                {
                    let tempInfo = this.UIOpenData.ItemList[index];
                    itemUI.setItemInfo(tempInfo as any, true);
                    if (tempInfo.itemid == CfgID.ItemID.Exp)
                    {
                        this.TmpGetExp = tempInfo.itemcount.toNumber();
                    }
                }
                else
                {
                    let tempInfo = this.UIOpenData.PetList[index - tempItemNum];
                    itemUI.setPetStarInfo(tempInfo);
                }
            });

            //收取经验动画
            let tmpExpMax = cfg.PlayerLevelCfgData.getNeedExpByLevel(this.UIOpenData.oldPlayerLv);
            this.UIPanel.LvLb.text = "LV." + this.UIOpenData.oldPlayerLv;
            this.UIPanel.ExpProImg.scaleX = this.UIOpenData.oldPlayerExp / tmpExpMax;
            this.UIPanel.ExpProLb.text = this.UIOpenData.oldPlayerExp + "/" + tmpExpMax;
            Laya.timer.frameOnce(3, this, this.refreshExpAction);

            SoundMgr.Inst().playSound("hookReward");
        }

        public refreshUI()
        {

        }

        //---------------------------------收取经验动画----------------------------------
        private refreshExpAction()
        {
            let tmpOldGetExp = 0;
            this["expAction"] = 0;
            let tmpTween = Laya.Tween.to(this, { expAction: this.TmpGetExp }, 500, Laya.Ease.linearIn, Laya.Handler.create(this, () =>
            {
                let tmpPlayerExp = Global.getItemNum(CfgID.ItemID.Exp);
                let tmpPlayerExpMax = cfg.PlayerLevelCfgData.getNeedExpByLevel(PlayerDataMgr.level);
                this.UIPanel.LvLb.text = "LV." + PlayerDataMgr.level;
                this.UIPanel.ExpProImg.scaleX = tmpPlayerExp / tmpPlayerExpMax;
                this.UIPanel.ExpProLb.text = tmpPlayerExp + "/" + tmpPlayerExpMax;
            }));
            tmpTween.update = new Laya.Handler(this, () =>
            {

                let tmpExpMax = cfg.PlayerLevelCfgData.getNeedExpByLevel(this.UIOpenData.oldPlayerLv);
                this.UIOpenData.oldPlayerExp += this["expAction"] - tmpOldGetExp;
                this.UIOpenData.oldPlayerExp = Math.floor(this.UIOpenData.oldPlayerExp);
                tmpOldGetExp = this["expAction"];

                if (this.UIOpenData.oldPlayerExp >= tmpExpMax)
                {
                    this.UIOpenData.oldPlayerLv++;
                    this.UIOpenData.oldPlayerExp -= tmpExpMax;
                    tmpExpMax = cfg.PlayerLevelCfgData.getNeedExpByLevel(this.UIOpenData.oldPlayerLv);
                }
                this.UIPanel.LvLb.text = "LV." + this.UIOpenData.oldPlayerLv;
                this.UIPanel.ExpProImg.scaleX = this.UIOpenData.oldPlayerExp / tmpExpMax;
                this.UIPanel.ExpProLb.text = this.UIOpenData.oldPlayerExp + "/" + tmpExpMax;

            });
        }

        //-----------------------------------新手引导------------------------------------
        /**
         * 进入本步引导
         */
        public Guide_Enter(step: GuideStep)
        {
            if (step == GuideStep.QuickFight_13_4 || step == GuideStep.HookReward_12_4)
            {
                Laya.timer.once(200, this, () =>
                {
                    GuideMgr.Inst.showFinger(this.UIPanel.TipsImg, true);
                });
            }
        }

        /**
         * 操作本步引导
         */
        public Guide_Active(step: GuideStep)
        {
            if (step == GuideStep.QuickFight_13_4 || step == GuideStep.HookReward_12_4)
            {
                UIManager.Inst.closeCurrentList();
                GuideMgr.Inst.nextActive();
            }
        }
    }
}