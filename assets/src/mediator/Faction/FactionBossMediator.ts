module Pro
{
    /**
    * 界面说明：公会副本
    * @author jason.xu
    */
    export class FactionBossMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Faction.FactionBossUI;

        /** 当前选中的BOSS分页 */
        private _curPage = -1;
        /** 开通的最大章节 */
        private _maxPage = 0;
        /** boss形象 */
        private _role: BaseRole;
        /** 购买次数回调类型(0-没有  1-挑战 2-扫荡) */
        private _buyCountCallback = 0;

        /** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("factionboss")]
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Faction.FactionBossUI, 1, BaseAddLayer.TopUI, true);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.closePanel();
            Global.removeBaseRole(this._role);
            Laya.timer.clear(this, this.onTimerBuff);
            this._role = null;
            FactionDataMgr.reddotModel.getChildModel("factionboss").setRedDot(0);
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.listTabView.selectEnable = true;
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            if (!this._role)
            {
                this._role = Global.createBaseRoleForPreview(this.UIPanel.imgBossAvatar, false);
            }
            this._buyCountCallback = 0;
            this.refreshUI();
        }

        /** 刷新UI视图， 当有子界面回退到此界面时，会自动调用 */
        public refreshUI()
        {
            FactionSend.copymapOpen();
            this.refreshCountView();
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(CmdEvent.Faction_CopymapUpdateSkill, this, this.onUpdateBuffInfo);
            this.addEventMgr(CmdEvent.Faction_CopymapUpdateCount, this, this.onChangeCount);
            this.addEventMgr(CmdEvent.Faction_CopymapSyn, this, this.onBossSyn);
            this.addEventMgr(CmdEvent.Faction_CopymapTop, this, this.onBossDamageRank);


            this.UIPanel.listTabView.on(Laya.Event.CHANGE, this, this.onChangePage);

            this.UIPanel.btnClose.onClick(this, this.closeUI);
            this.UIPanel.btnHelp.onClick(this, this.onClickHelp);
            this.UIPanel.btnAddCount.onClick(this, this.onClickAddCount);
            this.UIPanel.btnAssembly.onClick(this, this.onClickAssembly);
            this.UIPanel.btnAttack.onClick(this, this.onClickAttack);
            this.UIPanel.btnRankReward.onClick(this, this.onClickRankReward);
            this.UIPanel.btnSweep.onClick(this, this.onClickSweep);
            this.UIPanel.btnWatchDamage.onClick(this, this.onClickWatchDamage);
            this.UIPanel.btnAddBuff.onClick(this, this.onClickAddBuff);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        /** 点击BUFF加成 */
        private onClickAddBuff(): void
        {
            //下一级技能属性
            let buffSkillId = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Faction, Pb_God._emConstant_Faction.C_Faction_CopymapSkillID);
            let nextSkill = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(buffSkillId, FactionDataMgr.bossBuffLv + 1);
            if (!nextSkill)
            {  //没有下一级了
                TipsUtils.showTipsByLanId("common_lv_full");
                return;
            }
            //二级确认
            let alertDes = "";
            //先看背包有没有“公会增幅令”道具
            let tokenId = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Faction, Pb_God._emConstant_Faction.C_Faction_CopymapSkillUseItem);
            if (Global.isFullRes(tokenId, 1, false))
            {
                let tokenName = cfg.ItemCfgData.getNameById(tokenId);
                alertDes = Global.getLangStr("factionboss_msg1", tokenName);
            } else
            {
                let needDiamon = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Faction, Pb_God._emConstant_Faction.C_Faction_CopymapSkillNeedDiamond);
                alertDes = Global.getLangStr("factionboss_msg2", needDiamon);
            }
            alertDes += Global.getLangStr("factionboss_msg3", nextSkill.des);
            AlertShow.showConfirmAlert(alertDes, this, FactionSend.copymapBuySkill);
        }

        /** 点击增加次数 */
        private onClickAddCount(): void
        {
            let leftCount = FactionDataMgr.getBossLeftCount();
            if (leftCount > 0)
            {
                TipsUtils.showTipsByLanId("factionboss_msg4");
                return;
            }
            this.executeBuyCount(0, "shop_msg7", "factionboss_msg5");
            // let needItemInfo = cfg.FactionCopymapBuycountCfgData.getNeedItemInfoByCount(FactionDataMgr.bossBuyCount + 1);
            // if (!needItemInfo) {
            //     TipsUtils.showTipsByLanId("shop_msg7");
            //     return;
            // }
            // this._buyCountCallback = 0;
            // let itemName = cfg.ItemCfgData.getNameById(needItemInfo.itemid);
            // //二级弹窗确认
            // let alertDes = Global.getLangStr("factionboss_msg5", needItemInfo.itemcount, itemName);
            // AlertShow.showConfirmAlert(alertDes, this, () => {
            //     if (Global.isFullAllRes([needItemInfo], true)) {
            //         FactionSend.copymapBuyCount();
            //     }
            // });
        }

        /** 执行购买次数
         * @param status 购买的状态 0-普通购买  1-挑战 2-扫荡
         * @param fullTipsLanKey  购买次数满时提示的文字
         * @param alertDesLan 二级提示弹窗的提示文字
         */
        private executeBuyCount(status: number, fullTipsLanKey: string, alertDesLan: string): void
        {
            this._buyCountCallback = 0;
            let needItemInfo = cfg.FactionCopymapBuycountCfgData.getNeedItemInfoByCount(FactionDataMgr.bossBuyCount + 1);
            if (!needItemInfo)
            { //次数不能再买了
                TipsUtils.showTipsByLanId(fullTipsLanKey);
                return;
            }
            let itemName = cfg.ItemCfgData.getNameById(needItemInfo.itemid);
            //二级弹窗确认
            let alertDes = Global.getLangStr(alertDesLan, needItemInfo.itemcount, itemName, FactionDataMgr.bossLastHit);
            AlertShow.showConfirmAlert(alertDes, this, () =>
            {
                if (Global.isFullAllRes([needItemInfo], false))
                {
                    FactionSend.copymapBuyCount();
                    this._buyCountCallback = status;
                } else
                {
                    TipsUtils.showTipsByLanId("bag_msg7", itemName);
                }
            });
        }


        /** 点击发起挑战 */
        private onClickAttack(): void
        {
            let leftCount = FactionDataMgr.getBossLeftCount();
            if (leftCount <= 0)
            {
                this.executeBuyCount(1, "fight_msg45", "factionboss_msg5");
                // let needItemInfo = cfg.FactionCopymapBuycountCfgData.getNeedItemInfoByCount(FactionDataMgr.bossBuyCount + 1);
                // if (!needItemInfo) { //次数不能再买了
                //     TipsUtils.showTipsByLanId("fight_msg45");
                //     return;
                // }
                // let itemName = cfg.ItemCfgData.getNameById(needItemInfo.itemid);
                // //二级弹窗确认
                // let alertDes = Global.getLangStr("factionboss_msg5", needItemInfo.itemcount, itemName);
                // AlertShow.showConfirmAlert(alertDes, this, () => {
                //     if (Global.isFullAllRes([needItemInfo], true)) {
                //         FactionSend.copymapBuyCount();
                //         this._buyCountCallback = 1;
                //     }
                // });

                return;
            }
            //战前布阵->发起挑战
            UIManager.Inst.forceOpen(new EmbattleOpenUIData(0, Pb_God._emBattleType.BattleType_FactionCopymap, this._maxPage + 1));
        }

        /** 点击扫荡 */
        private onClickSweep(): void
        {
            if (!FactionDataMgr.getTodayAttackBoss())
            {
                TipsUtils.showTipsByLanId("factionboss_msg16");
                return;
            }
            let leftCount = FactionDataMgr.getBossLeftCount();
            if (leftCount <= 0)
            {
                this.executeBuyCount(2, "fight_msg45", "factionboss_msg6");

                // let needItemInfo = cfg.FactionCopymapBuycountCfgData.getNeedItemInfoByCount(FactionDataMgr.bossBuyCount + 1);
                // if (!needItemInfo) { //次数不能再买了
                //     TipsUtils.showTipsByLanId("fight_msg45");
                //     return;
                // }
                // let itemName = cfg.ItemCfgData.getNameById(needItemInfo.itemid);
                // //二级弹窗确认
                // let alertDes = Global.getLangStr("factionboss_msg6", needItemInfo.itemcount, itemName, FactionDataMgr.bossLastHit);
                // AlertShow.showConfirmAlert(alertDes, this, () => {
                //     if (Global.isFullAllRes([needItemInfo], true)) {
                //         FactionSend.copymapBuyCount();
                //         this._buyCountCallback = 2;
                //     }
                // });

                return;
            }
            //二次确认
            let alertDes = Global.getLangStr("factionboss_msg7", FactionDataMgr.bossLastHit);
            AlertShow.showConfirmAlert(alertDes, this, () =>
            {
                FactionSend.copymapSweep(this._maxPage + 1);
            });

        }

        /** 点击排行奖励 */
        private onClickRankReward(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FactionBossRankReward, this._curPage + 1), BaseBackUIType.HideBackUI);
        }

        /** 点击集结号角 */
        private onClickAssembly(): void
        {
            if (!FactionDataMgr.isLeader())
            {
                TipsUtils.showTipsByLanId("factionboss_msg8");
                return;
            }

            //判断时间
            let leftTime = FactionDataMgr.nextcopymapnotictime - TimeController.currTimer / 1000;
            if (leftTime > 0)
            {
                let time = Global.getTimeLengthString(leftTime);
                TipsUtils.showTipsByLanId("common_OpOften", time);
                return;
            }

            //二级提示
            let des = Global.getLangStr("factionboss_msg9");///发出集结后将会提醒所有会友，且有1小时内不可再发出集结(全会)，是否确定发出集结？"
            AlertShow.showConfirmAlert(des, this, () =>
            {
                FactionSend.copymapNotice();
            })
        }

        /** 点击查看伤害详细 */
        private onClickWatchDamage(): void
        {
            UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FactionBossDamageRank, this._curDamageList), BaseBackUIType.HideBackUI);
        }

        /** 点击帮助说明 */
        private onClickHelp(btn: component.UIButton): void
        {
            CommonHelpView.showWithLangKey(btn, "faction_help_boss");
        }

        /** 当前BOSS的伤害排名数据 */
        private _curDamageList: Pb_God.PBFactionCopymapTop[];
        /** 收到伤害排名数据 */
        private onBossDamageRank(value: Pb_God.PBG2CFactionCopymapTop): void
        {
            if (value.id != this._curPage + 1) { return; }  //已经切另外的分页了
            this.UIPanel.btnWatchDamage.disabled = false;
            this._curDamageList = value.top;
            for (var i = 1; i <= 3; i++)
            {
                let txtNickname: component.UILabel = this.UIPanel["txtDamageName" + i];
                let txtDamageValue: component.UILabel = this.UIPanel["txtDamageValue" + i];
                let data = value.top[i - 1];
                if (data)
                {
                    txtNickname.text = data.displayer.playername;
                    let strDamage = Global.numberToTuckString((data.damage as Long).toNumber());
                    txtDamageValue.text = Global.getLangStr("factionboss_msg10", strDamage);
                } else
                {
                    txtNickname.text = Global.getLangStr("common_empty1");
                    txtDamageValue.text = "";
                }
            }
        }

        /** 次数变化 */
        private onChangeCount(): void
        {
            if (FactionDataMgr.getBossLeftCount() > 0)
            {
                if (this._buyCountCallback == 1) { this.onClickAttack(); }
                else if (this._buyCountCallback == 2) { FactionSend.copymapSweep(this._maxPage + 1); }
            }
            this._buyCountCallback = 0;
            this.refreshCountView();
        }

        /** buff信息变化 */
        private onUpdateBuffInfo(): void
        {
            let buffSkillId = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Faction, Pb_God._emConstant_Faction.C_Faction_CopymapSkillID);
            let buffLv = FactionDataMgr.bossBuffLv;
            if (buffLv <= 0)
            {
                // this.UIPanel.imgAddBuff.gray = true;
                Laya.timer.clear(this, this.onTimerBuff);
                this.UIPanel.txtBuffTimer.visible = false;
                this.UIPanel.txtAddBuff.color = "#f2d6bf";
                this.UIPanel.txtAddBuff.text = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(buffSkillId, 1).des;
                this.UIPanel.btnAddBuffImg.x = this.UIPanel.txtAddBuff.x + this.UIPanel.txtAddBuff.width + 15;
            } else
            {
                // this.UIPanel.imgAddBuff.gray = false;
                this.UIPanel.btnAddBuff.visible = true;
                this.UIPanel.txtBuffTimer.visible = true;
                this.UIPanel.txtAddBuff.color = "#ffffff";
                this.UIPanel.txtAddBuff.text = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(buffSkillId, buffLv).des;
                this.UIPanel.txtBuffTimer.x = this.UIPanel.txtAddBuff.x + this.UIPanel.txtAddBuff.width + 15;
                this.UIPanel.btnAddBuffImg.x = this.UIPanel.txtBuffTimer.x + this.UIPanel.txtBuffTimer.width + 15;
                Laya.timer.loop(1000, this, this.onTimerBuff);
                this.onTimerBuff();
            }
        }

        /** buff倒计时 */
        private onTimerBuff(): void
        {
            let time = FactionDataMgr.bossBuffOverTime - TimeController.currTimer / 1000;
            if (time < 0)
            {
                time = 0;
                FactionDataMgr.bossBuffLv = 0;
                Laya.timer.clear(this, this.onTimerBuff);
                this.onUpdateBuffInfo();
                return;
            }
            let strTime = Global.GetRemindTime(time, 4);
            this.UIPanel.txtBuffTimer.text = Global.getLangStr("factionboss_msg13", strTime);
        }

        /** 当前正在挑战的BOSS信息变化 */
        private onBossSyn(): void
        {
            this.onUpdateBuffInfo();
            let len = cfg.FactionCopymapCfgData.getLength();
            this._maxPage = len;
            let bossInfo = FactionDataMgr.curBossInfo;
            if (bossInfo)
            {
                if (bossInfo.killplayerid) { this._maxPage = bossInfo.id; }
                else { this._maxPage = bossInfo.id - 1; }
            }
            this.UIPanel.listTabView.onRefresh(len, this, this.onRefreshTabItemView);
            this.UIPanel.listTabView.selectedIndex = this._curPage = -1; //触发强制刷新
            this.UIPanel.listTabView.selectedIndex = Math.min(this._maxPage, len - 1);
            this.UIPanel.listTabView.scrollTo(this._maxPage - 2);
        }

        /** 切换分页 */
        private onChangePage(): void
        {
            let pageIndex = this.UIPanel.listTabView.selectedIndex;
            if (this._curPage == pageIndex || pageIndex < 0) { return; }
            if (pageIndex > this._maxPage)
            {
                // this.UIPanel.listTabView.selectedIndex = this._curPage;
                TipsUtils.showTipsByLanId("factionboss_msg14");
                return;
            }
            this._curPage = pageIndex;
            this.UIPanel.imgKill.visible = this._curPage < this._maxPage;
            //是否是当前正准备挑战的BOSS
            let isCurAttack = this._curPage == this._maxPage;
            this.UIPanel.viewBossInfo.visible = isCurAttack;
            this.UIPanel.btnAddBuff.visible = isCurAttack;
            this.UIPanel.btnAttack.disabled = !isCurAttack;
            this.UIPanel.btnSweep.disabled = !isCurAttack;
            if (isCurAttack) { this.UIPanel.btnSweep.gray = !isCurAttack || !FactionDataMgr.getTodayAttackBoss(); }
            this.UIPanel.imgReddot.visible = isCurAttack && FactionDataMgr.getTodayAttackBoss() && FactionDataMgr.getBossLeftCount() > 0
            let cfgData = cfg.FactionCopymapCfgData.getInfo(this._curPage + 1);
            this.UIPanel.txtBossTitle.text = Global.getLangStr("factionboss_msg15", cfgData.iD) + cfgData.name;

            //设置BOSS信息
            if (isCurAttack)
            {
                this.refreshBossInfo(cfgData);
            }
            //boss形象
            let monsterInfo = cfg.FactionMonsterNewCfgData.getMonterInfoWithID(cfgData.monster);
            let tmpModleID = monsterInfo.skinId;
            if (this._role.getResourceID() != tmpModleID)
            {
                this._role.resetRes(tmpModleID, RoleResType.Show, true);
            }
            var showScale = cfg.PetSkinCfgData.getShowScaleById(tmpModleID);
            this._role.scale(showScale, showScale);

            //伤害奖励与击杀奖励
            let damagePrizes = cfg.FactionCopymapCfgData.getDamagePrizeAryByInfo(cfgData);
            this.UIPanel.norItemViewDamage.onRefresh(damagePrizes.length, this, (norItem: NorItemUI, index: number) =>
            {
                norItem.setItemInfo(damagePrizes[index]);
            })
            let killPrizes = cfg.FactionCopymapCfgData.getKillPrizeAryByInfo(cfgData);
            this.UIPanel.norItemViewKill.onRefresh(killPrizes.length, this, (norItem: NorItemUI, index: number) =>
            {
                norItem.setItemInfo(killPrizes[index]);
            })

            /** 请求当前分页的伤害排行 */
            this._curDamageList = [];
            this.UIPanel.btnWatchDamage.disabled = true; //收到数据后再点亮
            FactionSend.copymapTop(cfgData.iD);
        }

        /** 刷新当前BOSS信息(名字血条等) */
        private refreshBossInfo(cfgData: cfg.FactionCopymapCfgInfo): void
        {
            let bossInfo = FactionDataMgr.curBossInfo;
            let monsterInfo = cfg.FactionMonsterNewCfgData.getMonterInfoWithID(cfgData.monster);
            this.UIPanel.txtBossName.text = cfg.PetSkinCfgData.getFileNameById(monsterInfo.skinId);
            Global.setResIconWithItemID(this.UIPanel.imgBossIcon, CfgID.ResType.Pet, monsterInfo.skinId);
            let hpProgress = (bossInfo.curhp as Long).toNumber() / ((bossInfo.maxhp as Long).toNumber() || 1);
            this.UIPanel.imgProgressMask.width = hpProgress * 119;
            this.UIPanel.txtBossProgress.text = Global.parsePercentNum(hpProgress, 2);
        }

        /** 切换BOSS的分页按钮刷新 */
        private onRefreshTabItemView(tempUI: ProUI.Faction.ChildView.FactionBossTabViewUI, index: number): void
        {
            tempUI.imgLight.visible = index == this._curPage;
            tempUI.txtName.text = Global.getLangStr("factionboss_msg15", index + 1);
            tempUI.imgPass.visible = this._maxPage > index; //已通关
            let isLock = this._maxPage < index;
            tempUI.imgLock.visible = isLock;
            tempUI.btn.gray = isLock;
            let monsterId = cfg.FactionCopymapCfgData.getMonsterByID(index + 1);
            let monsterInfo = cfg.FactionMonsterNewCfgData.getMonterInfoWithID(monsterId);
            Global.setResIconWithItemID(tempUI.imgIcon, CfgID.ResType.Pet, monsterInfo.skinId);
        }

        /** 刷新次数显示 */
        private refreshCountView(): void
        {
            let leftCount = FactionDataMgr.getBossLeftCount();
            this.UIPanel.txtCount.text = leftCount + "";
            let canBuyCount = cfg.FactionCopymapBuycountCfgData.getTotalBuyCount() - FactionDataMgr.bossBuyCount;
            this.UIPanel.txtCanBuyCount.text = canBuyCount + "";
            this.UIPanel.btnAddCount.disabled = canBuyCount <= 0;
        }

    }
}