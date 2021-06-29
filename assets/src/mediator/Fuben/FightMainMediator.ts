
module Pro
{
    export class FightMainMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Fuben.LiLian.MainUI;

        private _strokeColor = ["#e9711b", "#2b740e", "#1a7086", "#f13c55", "#e9711b"]

        /** 需要自动加载的资源列表 */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("fightmain"), UrlMgr.getAtlas("commontitle01")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return ["res/fightmain/lilian_pic01.jpg",
                "res/fightmain/lilian_pic02.jpg",
                "res/fightmain/lilian_pic03.jpg",
                "res/fightmain/lilian_pic04.jpg",
                "res/fightmain/lilian_pic05.jpg"];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Fuben.LiLian.MainUI, 3);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.closePanel();
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
            this.refreshUI();
            let scollTo = 0;
            // //如果需要引导星河神殿，则将列表滚下来一点
            // if (GuideMgr.Inst.getInStep() == GuideStep.Func_Expedition_3) scollTo = 4;
            this.UIPanel.ItemList.scrollTo(scollTo);
        }

        public refreshUI()
        {
            this.UIPanel.ItemList.onRefresh(5, this, this.onItemRefresh);
        }

        private onItemRefresh(tempUI: ProUI.Fuben.LiLian.ListItemUI, index: number)
        {
            let tempID = index + 1;
            tempUI.DescLb.text = cfg.ConstantGamesPrizePreviewCfgData.getDescById(tempID);
            tempUI.DescLb.strokeColor = this._strokeColor[index];
            tempUI.RedDotImg.visible = false;
            tempUI.bgImg.frame = tempID;
            let systemSwitchId = cfg.ConstantGamesPrizePreviewCfgData.getSystemSwitchIdById(tempID);
            let isSwitchOpen = PlayerDataMgr.checkSystemSwitchOpen(systemSwitchId);
            //日常副本
            if (tempID == 1)
            {
                tempUI.RedDotImg.visible = CopymapDataMgr.reddotModel.isRedDot;
            }
            tempUI.lock.visible = !isSwitchOpen;
            if (!isSwitchOpen)
            {
                //未开启时，显示开启条件
                tempUI.txtOpenCondition.text = cfg.SystemSwitchSystemSwitchCfgData.getUnlockDesByID(systemSwitchId);
            }

            //显示奖励列表            
            let tempItemAry = cfg.ConstantGamesPrizePreviewCfgData.getValueById(tempID).split(";");
            tempUI.RewardItemList.onRefresh(tempItemAry.length, this, (itemUI: NorItemUI, itemIndex: number) =>
            {
                itemUI.setItemID(parseInt(tempItemAry[itemIndex]), 0, false, false, isSwitchOpen, false, false);
            });
            tempUI.btn.onClick(this, isSwitchOpen ? this.onItemClick : null);
        }

        private onItemClick(btn: component.UIButton)
        {
            let tempUI = btn.parent as ProUI.Fuben.LiLian.ListItemUI;
            if (tempUI.name == "0")
            {
                var isInBattle = BattleMgr.Inst.checkAndWatchingBattleView(Pb_God._emBattleType.BattleType_Copymap);
                if (!isInBattle)
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FightDaily));
                }
            }
            else if (tempUI.name == "1")
            {
                var isInBattle = BattleMgr.Inst.checkAndWatchingBattleView(Pb_God._emBattleType.BattleType_Endless);
                if (!isInBattle)
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_EndlessTowerMain));
                }
                //123
            }
            else if (tempUI.name == "2")
            { //组队战      
                var isInBattle = BattleMgr.Inst.checkAndWatchingBattleView(Pb_God._emBattleType.BattleType_TeamCampaign);
                if (!isInBattle)
                {
                    if (TeamCampaignDataMgr.getCurtype() == 0)
                    {
                        UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_TeamCampaignChoice));
                    }
                    else
                    {
                        UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_TeamCampaignMain));
                    }
                }
            }
            else if (tempUI.name == "3")
            { //星河神殿       
                var isInBattle = BattleMgr.Inst.checkAndWatchingBattleView(Pb_God._emBattleType.BattleType_Temple);
                if (!isInBattle)
                {
                    UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Temple), BaseBackUIType.HideBackUI);
                }
            }
            else if (tempUI.name == "4")
            {
                var isInBattle = BattleMgr.Inst.checkAndWatchingBattleView(Pb_God._emBattleType.BattleType_Expedition);
                if (!isInBattle)
                {
                    if (ExpeditionDataMgr.getCurtype() == 0)
                    {
                        UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ExpeditionChoice));
                    }
                    else
                    {
                         if (ExpeditionDataMgr.isConductHunting())
                            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ExpeditionMain));

                    }
                }
            }
        }


        //-----------------------------------新手引导------------------------------------
        /**
         * 进入本步引导
         */
        public Guide_Enter(step: GuideStep)
        {
            let guideIndex = -1;
            if (step == GuideStep.Func_FightDaily_3) guideIndex = 0;
            else if (step == GuideStep.Func_EndlessTower_3) guideIndex = 1;
            else if (step == GuideStep.Func_TeamCampaign_3) guideIndex = 2;
            else if (step == GuideStep.Func_Temple_3)
            {
                this.UIPanel.ItemList.scrollTo(3);
                guideIndex = 3;
            }
            else if (step == GuideStep.Func_Expedition_3)
            {
                //拉下来一点
                this.UIPanel.ItemList.scrollTo(4);
                guideIndex = 4;
            }

            if (guideIndex >= 0)
            {
                Laya.timer.once(200, this, () =>
                {
                    let cell = this.UIPanel.ItemList.getCell(guideIndex) as ProUI.Fuben.LiLian.ListItemUI;
                    GuideMgr.Inst.showFinger(cell, true, cell.btn, 0, 0, 20);
                });
            }
        }

        // /**
        //  * 操作本步引导
        //  */
        // public Guide_Active(step: GuideStep) {
        //     let guideIndex = -1;
        //     if (step == GuideStep.Func_FightDaily_3) guideIndex = 0;
        //     else if (step == GuideStep.Func_EndlessTower_3) guideIndex = 1;
        //     else if (step == GuideStep.Func_Expedition_3) guideIndex = 2;
        //     else if (step == GuideStep.Func_Temple_3) guideIndex = 3;

        //     if (guideIndex >= 0) {
        //         let cell = this.UIPanel.ItemList.getCell(guideIndex) as ProUI.Fuben.LiLian.ListItemUI;
        //         cell.btn.activeEvent();
        //         GuideMgr.Inst.nextActive();
        //     }

        // }
    }
}