
module Pro
{
    export class FightDailyMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Fuben.Daily.MainUI;

        /**
         *  副本数据列表
         */
        private TempFubenTitleAry: Array<cfg.CopymapCfgInfo>;

        /**
         *  当前选择得副本数据列表
         */
        private TempFubenItemAry: Array<cfg.CopymapCfgInfo>;

        /**
         * 选择副本类型
         */
        private TempSelectFubenType = -1;

        /**
         * 选择副本最大挑战ID
         */
        private TempFubenMaxSubType;

        /**
         * 选择推荐副本Index
         */
        private TempFubenReCommandType;

        /**
         * 上次购买的扫荡副本ID
         */
        private TempBuyCountFubenInfo: cfg.CopymapCfgInfo;

        /** 需要自动加载的资源列表 */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("fubenDaily")];
        }

        /** 需要自动释放的png|jgp资源列表 */
        public autoUnLoadOtherRes(): Array<string>
        {
            return ["res/fubenDaily/richangfuben_bg_01.png",
                "res/fubenDaily/richangfuben_bg_02.png",
                "res/fubenDaily/richangfuben_bg_03.png",
                "res/fubenDaily/richangfuben_bg_04.png",
                "res/fubenDaily/richangfuben_bg_05.png"];
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.closePanel();
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Fuben.Daily.MainUI, 3);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.TitleItemList.content.addChildAt(this.UIPanel.ItemSelectEffNode, 0);
            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnOneKeyAll.onClick(this, this.clickOneKeyAll);
            this.UIPanel.QABtn.onClick(this, () =>
            {
                CommonHelpView.show(this.UIPanel.QABtn, Global.getLangStr("hook_help"));
            });
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(CmdEvent.Copymap_SynInfo, this, this.refreshUI);
            this.addEventMgr(CmdEvent.Copymap_BuyCount, this, this.onBuyCount);
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
            this.TempSelectFubenType = -1;
            this.refreshTitleList();
        }

        public refreshUI()
        {
            this.refreshTitleList();
            this.refreshItemList(false);
            this.refreshCountView();
        }

        /** 一键扫荡 */
        public clickOneKeyAll()
        {
            // 是否存在可扫荡的管卡
            if (!this.TempFubenItemAry || this.TempFubenMaxSubType == 0)
            {
                TipsUtils.showTipsByLanId("fight_msg56");
                return;
            }
            // 可扫荡次数
            let tempFubenLastFightCount = CopymapDataMgr.getFightDailyLastFightCount(this.TempSelectFubenType);
            let tempFubenLastBuyCount = CopymapDataMgr.getFightDailyLastBuyCount(this.TempSelectFubenType);
            if ((tempFubenLastFightCount + tempFubenLastBuyCount) <= 0)
            {
                TipsUtils.showTipsByLanId("fight_msg53");
                return;
            }
            this.TempBuyCountFubenInfo = null;
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FightDailyAlertTips, this.TempSelectFubenType, this.TempFubenItemAry[this.TempFubenMaxSubType - 1].iD));
        }

        /** 刷新次数显示 */
        private refreshCountView(): void
        {
            let tempFubenLastFightCount = CopymapDataMgr.getFightDailyLastFightCount(this.TempSelectFubenType);
            let tempFubenLastBuyCount = CopymapDataMgr.getFightDailyLastBuyCount(this.TempSelectFubenType);

            if (tempFubenLastFightCount > 0)
            { this.UIPanel.LastEnterTimeLb.text = Global.getLangStr("hook_msg4", tempFubenLastFightCount); }
            else
            { this.UIPanel.LastEnterTimeLb.text = Global.getLangStr("hook_msg5", tempFubenLastBuyCount); }
        }

        //----------------------------------刷新标题---------------------------------------
        private refreshTitleList()
        {
            this.TempFubenTitleAry = cfg.CopymapCfgData.getInfoWithSubType(1);
            this.UIPanel.TitleItemList.onRefresh(this.TempFubenTitleAry.length, this, this.onTitleItemRefresh);
        }
        private onTitleItemRefresh(tempUI: ProUI.Fuben.Daily.TitleItemUI, index: number): void
        {

            let tempInfo = this.TempFubenTitleAry[index];
            let tempLastEnterCount = CopymapDataMgr.getFightDailyLastFightCount(tempInfo.type);

            let isSel = this.TempSelectFubenType == index + 1;
            tempUI.LockImg.visible = !(PlayerDataMgr.level >= tempInfo.needPlayerLevel && PlayerDataMgr.maxfightPower >= tempInfo.needFightPower);
            tempUI.RedDotImg.visible = !isSel && !tempUI.LockImg.visible && tempLastEnterCount > 0;
            tempUI.NameLb.text = tempInfo.name;
            tempUI.IconImg.frame = index + 1;
            tempUI.onClick(this, this.onTitleItemClick);
            if (this.TempSelectFubenType == -1)
            {
                tempUI.activeEvent();
            }
        }

        private onTitleItemClick(btn: ProUI.Fuben.Daily.TitleItemUI)
        {
            let tmpSelectIndex = parseInt(btn.name);
            let tempInfo = this.TempFubenTitleAry[tmpSelectIndex];
            if (btn.LockImg.visible)
            {
                TipsUtils.showTipsByLanId("hook_msg3", tempInfo.needPlayerLevel);
                return;
            }

            this.UIPanel.ItemSelectEffNode.x = btn.x;
            this.UIPanel.ItemSelectEffNode.y = btn.y;
            this.TempSelectFubenType = tmpSelectIndex + 1;
            this.refreshCountView();
            this.refreshItemList();
        }

        //-------------------------------刷新列表--------------------------------------------
        private refreshItemList(scrollToDefault: boolean = true)
        {

            this.TempFubenMaxSubType = CopymapDataMgr.getFightDailyMaxSubtype(this.TempSelectFubenType);
            this.TempFubenItemAry = cfg.CopymapCfgData.getInfoWithType(this.TempSelectFubenType);
            this.TempFubenReCommandType = 0;
            this.TempFubenItemAry.forEach(elment =>
            {
                let tempFubenUnLock = PlayerDataMgr.level >= elment.needPlayerLevel && PlayerDataMgr.maxfightPower >= elment.needFightPower;
                if (this.TempFubenMaxSubType == 0 && elment.subType == 1)
                {
                    this.TempFubenReCommandType = elment.subType;
                }
                if (this.TempFubenMaxSubType > 0 && elment.subType == this.TempFubenMaxSubType)
                {
                    this.TempFubenReCommandType = elment.subType;
                }
                if (this.TempFubenMaxSubType > 0 && elment.subType == this.TempFubenMaxSubType + 1 && tempFubenUnLock)
                {
                    this.TempFubenReCommandType = elment.subType;
                }
            });
            this.UIPanel.FubenItemList.onRefresh(this.TempFubenItemAry.length, this, this.onListItemRefresh);
            if (scrollToDefault) { this.UIPanel.FubenItemList.scrollTo(this.TempFubenReCommandType - 1); }

            this.UIPanel.FunBGImg.frame = this.TempSelectFubenType;
            this.UIPanel.FunWenziImg.frame = this.TempSelectFubenType;
        }

        private onListItemRefresh(tempUI: ProUI.Fuben.Daily.ListItemUI, index: number): void
        {

            let tempInfo = this.TempFubenItemAry[index];

            let tmpRewardList = cfg.CopymapCfgData.getAddPrizeAryById(tempInfo.iD);
            tempUI.RewardBox.onRefresh(tmpRewardList.length, this, (itemUI: NorItemUI, index: number) =>
            {
                itemUI.setItemInfo(tmpRewardList[index])
            });

            tempUI.TuiJianImg.visible = tempInfo.subType == this.TempFubenReCommandType;
            tempUI.QuImgFrame.frame = tempInfo.nayiDu;
            //图片显示难度，不在需要文字显示
            tempUI.QuLb.text = Global.getLangStr("CopymapStageType_" + tempInfo.subType);
            tempUI.QuLb.visible = false;

            tempUI.reddotFreeAtk.visible = false;

            let tempFubenUnLock = PlayerDataMgr.level >= tempInfo.needPlayerLevel && PlayerDataMgr.maxfightPower >= tempInfo.needFightPower;
            if (!tempFubenUnLock)
            {
                tempUI.FunBtn.gray = true;
                tempUI.NeedBuyBox.visible = false;
                tempUI.FunLb.visible = true;
                //如果等级没达到，则在按钮上展示n级开启
                if (PlayerDataMgr.level < tempInfo.needPlayerLevel)
                {
                    tempUI.FunLb.text = Global.getLangStr("system_msg1", tempInfo.needPlayerLevel);
                    tempUI.LockLb.text = "";
                } else
                {
                    tempUI.FunLb.text = Global.getLangStr("common_noopen");
                    tempUI.LockLb.text = Global.getLangStr("fight_msg39", tempInfo.needFightPower);
                }

            }
            else
            {
                tempUI.LockLb.text = "";
                tempUI.FunBtn.gray = false;
                tempUI.NeedBuyTitleLb.text = tempInfo.subType <= this.TempFubenMaxSubType ? Global.getLangStr("common_sweep") : Global.getLangStr("common_attack");
                let tempFubenLastFightCount = CopymapDataMgr.getFightDailyLastFightCount(this.TempSelectFubenType);
                tempUI.NeedBuyBox.visible = tempFubenLastFightCount == 0 && tempInfo.subType <= this.TempFubenMaxSubType + 1;
                tempUI.FunLb.text = tempUI.NeedBuyTitleLb.text;
                tempUI.FunLb.visible = !tempUI.NeedBuyBox.visible;
                tempUI.reddotFreeAtk.visible = tempUI.FunLb.visible && tempInfo.subType <= this.TempFubenMaxSubType + 1;
                if (tempUI.NeedBuyBox.visible)
                {
                    let tempItemInfo = cfg.CopymapCfgData.getSweepNeedItemAryById(tempInfo.iD)[0];
                    Global.setResIconWithItemID(tempUI.NeedBuyImg, CfgID.ResType.Item, tempItemInfo.itemid);
                    Global.setResNumWithItemInfo(tempUI.NeedBuyLb, tempItemInfo.itemid, tempItemInfo.itemcount);
                    tempUI.NeedBuyBox.refresh();
                }
            }
            tempUI.FunBtn.onClick(this, this.onListItemClick);

        }

        private onListItemClick(btn: ProUI.Fuben.Daily.ListItemUI)
        {
            let tempInfo = this.TempFubenItemAry[parseInt(btn.parent.name)];
            if (PlayerDataMgr.level < tempInfo.needPlayerLevel)
            {
                TipsUtils.showTipsByLanId("system_msg1", tempInfo.needPlayerLevel);
                return;
            }
            if (PlayerDataMgr.maxfightPower < tempInfo.needFightPower)
            {
                TipsUtils.showTipsByLanId("fight_msg39", tempInfo.needFightPower);
                return;
            }
            //判断前置关卡
            if (tempInfo.subType > this.TempFubenMaxSubType + 1)
            {
                TipsUtils.showTipsByLanId("fight_msg35"); //通关前置难度后开启
                return;
            }
            let tempFubenLastFightCount = CopymapDataMgr.getFightDailyLastFightCount(this.TempSelectFubenType);
            let tempFubenLastBuyCount = CopymapDataMgr.getFightDailyLastBuyCount(this.TempSelectFubenType);
            let tmpCanBuyCount = tempFubenLastBuyCount > 0 && tempFubenLastFightCount == 0;
            if (tempFubenLastFightCount > 0)
            {
                if (tempInfo.subType <= this.TempFubenMaxSubType)
                {
                    CopymapSend.sweep(tempInfo.iD);
                }
                else
                {
                    BattleMgr.Inst.createNormalBat(Pb_God._emBattleType.BattleType_Copymap, tempInfo.iD);
                }
            }
            else if (tmpCanBuyCount)
            {
                if (!Global.isFullAllRes(cfg.CopymapCfgData.getSweepNeedItemAryById(tempInfo.iD)))
                {
                    return;
                }
                WaitPanelUtils.showWaitPanel();
                this.TempBuyCountFubenInfo = tempInfo;
                CopymapSend.buyCount(tempInfo.iD);
            } else
            {
                //看看后面还有没有VIP特权再增加次数的
                let nextPrivilegeVipLv = PrivilegeDataMgr.getUpVipPrivilegeVipLevel(Pb_God._emPrivilegeType.PrivilegeType_CopymapBuyCount);
                if (nextPrivilegeVipLv > 0)
                { TipsUtils.showTipsByLanId("tips_msg63", nextPrivilegeVipLv); }  //需要VIP等级达到{0}级后可购买
                else
                { TipsUtils.showTipsByLanId("tips_msg27"); } //本日挑战次数已达上限
            }
        }

        private onBuyCount()
        {
            if (!this.TempBuyCountFubenInfo)
            {
                this.refreshCountView();
                return;
            }
            WaitPanelUtils.hideWaitPanel();
            if (this.TempBuyCountFubenInfo.subType <= this.TempFubenMaxSubType)
            {
                CopymapSend.sweep(this.TempBuyCountFubenInfo.iD);
            }
            else
            {
                BattleMgr.Inst.createNormalBat(Pb_God._emBattleType.BattleType_Copymap, this.TempBuyCountFubenInfo.iD);
            }
            this.TempBuyCountFubenInfo = null;
        }



        //-----------------------------------新手引导------------------------------------
        /**
         * 进入本步引导
         */
        public Guide_Enter(step: GuideStep)
        {
            if (step == GuideStep.Func_FightDaily_4)
            {
                Laya.timer.once(200, this, () =>
                {
                    let cell = this.UIPanel.FubenItemList.getCell(0) as ProUI.Fuben.Daily.ListItemUI;
                    if (cell)
                    {
                        GuideMgr.Inst.showFinger(cell.FunBtn, true, cell.FunBtn);
                    }
                });
            }
        }
    }
}