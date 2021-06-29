module Pro
{
    /**
    * 界面说明：  玩家升级界面
    * @author jason.xu
    */
    export class PlayerLevelUpMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Common.LevelUpPanelUI;
        public UIOpenData: PlayerLevelUpOpenUIData;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("levupgrade"), UrlMgr.getAtlas("rewardpopup")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Common.LevelUpPanelUI, 1, BaseAddLayer.TopUI, true, 1);
        }

        public closeUI(): void
        {
            this.UIOpenData.isClose = true; //标记这个已经失效了。
            super.closeUI();
            FuncGuideMgr.Inst.checkStartFuncOpenGuide();  //升级提示界面关闭后，才能启动功能引导
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.listOpenSytems.scrollBar.elasticDistance = 0;
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.refreshLevelUpView();
            this.refreshSystemOpenList();
        }


        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(EventNotify.System_Switch_Open_Update, this, this.refreshSystemOpenList);
            this.addEventMgr(EventNotify.PlayerLevelChange, this, this.refreshLevelUpView);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {

        }

        /** 刷新等级区间对应的显示 */
        private refreshLevelUpView(): void
        {
            let oldLv: number = this.UIOpenData.oldLevel;
            let newLv = this.UIOpenData.newLevel
            this.UIPanel.txtLastLevel.text = oldLv + "";
            this.UIPanel.txtNewLevel.text = newLv + "";
            //获得奖励预览
            //归纳所有等级区间的所有奖励， 把所有奖励的计数总结一下。
            let map = new ds.StringMap<cfg.AddItemInfo>();
            for (let i = oldLv + 1; i <= newLv; i++)
            {
                let additems = cfg.PlayerLevelCfgData.getAddPrizeInfoByLevel(i);
                if (!additems) continue;
                for (let el of additems)
                {
                    let itemInfo = map.get(el.itemid);
                    if (itemInfo)
                    {
                        itemInfo.itemcount += el.itemcount;
                    } else
                    {
                        itemInfo = new cfg.AddItemInfo();
                        itemInfo.itemid = el.itemid;
                        itemInfo.itemcount = el.itemcount;
                        map.put(itemInfo.itemid, itemInfo);
                    }
                }
            }
            let mapkeys = map.getKeys();
            this.UIPanel.listPirzeView.onRefresh(mapkeys.length, this, (itemUI: NorItemUI, prizeIndex: number) =>
            {
                itemUI.setItemInfo(map.get(mapkeys[prizeIndex]),true);
            });
        }

        /** 刷新功能开放图标列表 */
        private refreshSystemOpenList(): void
        {
            let systemList = this.UIOpenData.openSystemSwitchIds;
            let isPreview = false;
            //没有系统功能开启时，检查后续功能开放的
            if (!systemList || systemList.length == 0)
            {
                let nextOpenSystem = PlayerDataMgr.getNextOpenSystemSwitchInfo();
                //还是没有时，直接将功能开启的视图隐藏，把奖励提示往中间放一点。
                if (!nextOpenSystem)
                {
                    this.UIPanel.viewSystemOpen.visible = false;
                    return;
                }
                isPreview = true;
                systemList = [nextOpenSystem.iD];
            }

            this.UIPanel.txtSystemTitle.text = isPreview ? Global.getLangStr("ui_Common_title9") : Global.getLangStr("ui_Common_title5");  //功能开启 or 功能预告
            this.UIPanel.viewSystemOpen.visible = true;
            let len = systemList.length;
            this.UIPanel.listOpenSytems.x = len > 1 ? 0 : 165;  //只有一个的时候，放中间一点。
            this.UIPanel.imgTurnRemind.visible = len > 2;
            this.UIPanel.listOpenSytems.onRefresh(len, this, (tempUI: ProUI.Common.LevelUpPanelSystemItemUI, index: number) =>
            {
                let systemId = systemList[index];
                let systemCfgInfo = cfg.SystemSwitchSystemSwitchCfgData.getInfo(systemId);
                tempUI.icon.skin = "res/Unpack/Icon/SystemIcon/" + systemCfgInfo.icon;
                tempUI.txtDes.text = systemCfgInfo.describe;
                tempUI.txtName.text = systemCfgInfo.name;
                let txtNextTips = "";
                if (isPreview)
                {
                    if (systemCfgInfo.level > 0) txtNextTips = Global.getLangStr("system_msg1", systemCfgInfo.level);
                    else if (systemCfgInfo.stage > 0) txtNextTips = Global.getLangStr("system_msg2", systemCfgInfo.stage);
                    else if (systemCfgInfo.loginDays > 0) txtNextTips = Global.getLangStr("system_msg3", systemCfgInfo.loginDays);
                }
                tempUI.txtNextLv.text = txtNextTips;
                tempUI.imgNew.visible = !isPreview;
            });

        }

        //-----------------------------------新手引导------------------------------------
        /**
         * 进入本步引导
         */
        public Guide_Enter(step: GuideStep)
        {
            Laya.timer.once(50, this, () =>
            {
                if(!GuideMgr.Inst.getInFuncGuide(true))
                {
                    GuideMgr.Inst.showFinger(this.UIPanel.TipsImg, true);
                }
            });
        }

        /**
         * 操作本步引导
         */
        public Guide_Active(step: GuideStep)
        {
            UIManager.Inst.closeCurrentList();
            GuideMgr.Inst.checkStepAndNextActive(GuideStep.ThirdFight_11_6,
                GuideStep.FirstFight_4_6,
                GuideStep.QuickFight_13_5,
                GuideStep.ThirdFight_11_6,
                GuideStep.Artifact_16_12);
        }

    }
}