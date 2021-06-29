
module Pro
{
	/**
	 * 远征战斗
	 */
    export class ExpeditionFightMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Fuben.Expedition.Fight.MainUI;

        private selectIndex: number;

        private _needOpenEmbattle: boolean = false;

        /** 需要自动加载的资源列表 */
        public autoLoadAtlas(): Array<any>
        {
            return [];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Fuben.Expedition.Fight.MainUI, 0, BaseAddLayer.TopUI, true);
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
            this.UIPanel.FightBtn.onClick(this, () =>
            {
                this._needOpenEmbattle = true;
                ExpeditionSend.queryPetHp();
            });
            //策划要求本界面不在又观看通关录像的功能
            // this.UIPanel.PassRecordBtn.onClick(this, () =>
            // {
            //     UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ExpeditionRecord, this.selectIndex));
            // });
            this.addEventMgr(CmdEvent.Expedition_StageInfoAck, this, this.onExpedition_StageInfoAck);
            this.addEventMgr(CmdEvent.Expedition_SynPetHp, this, this.onExpedition_SynPetHp);

            this.addEventMgr(EventNotify.Expedition_Auto_CD, this, this.onAutoCD);
            this.addEventMgr(EventNotify.Expedition_Auto_State_Change, this, this.onAutoChange);

            this.UIPanel.autoBtn.on(LayaEvent.CLICK, this, this.onAutoClick);
        }

        private onAutoChange()
        {
            this.UIPanel.autoImg.visible = ExpeditionDataMgr.autoExpedition > 0;
            this.refreshAutoView();
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        private onAutoClick()
        {
            if (PrivilegeDataMgr.vipLevel >= 1)
            {
                ExpeditionDataMgr.autoExpedition = (this.UIPanel.autoImg.visible = !this.UIPanel.autoImg.visible) ? 1 : 0;
                this.refreshAutoView()
            }
            else
            {
                TipsUtils.showTipsByLanId("shop_msg18", 1)
            }
        }

        private refreshAutoView()
        {
            if (this.UIPanel.autoImg.visible)
            {
                this.UIPanel.autoLbl.showText = Global.getLangStr("ui_Expedition_msg9", "(" + ExpeditionDataMgr.expeditionTime + "s)");
            }
            else
            {
                this.UIPanel.autoLbl.showText = Global.getLangStr("ui_Expedition_msg9", "");
            }
        }

        private onAutoCD(CD: number)
        {
            this.UIPanel.autoLbl.showText = Global.getLangStr("ui_Expedition_msg9", "(" + CD + "s)");
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.selectIndex = this.UIOpenData.customObject;
            let tmpSelectStageID = cfg.ExpeditionStageCfgData.getStageIDByIndex(this.selectIndex);
            this.UIPanel.TItleLb.text = Global.getLangStr("bat_msg2", tmpSelectStageID);

            //通关最佳
            this.UIPanel.PlayerNameLb.text = "11";
            this.UIPanel.PowerLb.text = "0";


            //活动是否开启
            let actData = ActivityDataMgr.getActivityDataByType(Pb_God._emActivityType.Activity_Times, Pb_God._emActivityTimesType.Activity_Times_Expedition);
            //奖励
            let tmpPrizeList = cfg.ExpeditionStageCfgData.getAddPrizeAryById(this.selectIndex);
            this.UIPanel.RewardBox.onRefresh(tmpPrizeList.length, this, (rewardItem: NorItemUI, rewardIndex: number) =>
            {
                let tmpItem = tmpPrizeList[rewardIndex];
                if (actData && tmpItem.itemid == CfgID.ItemID.ExpetitionPoint)
                {
                    rewardItem.setItemID(tmpItem.itemid, tmpItem.itemcount + Math.floor(tmpItem.itemcount * 0.01 * parseInt(cfg.ActivityCfgData.getParamByID(actData.id).split(";")[1])))
                    rewardItem.showActivityTag();
                }
                else rewardItem.setItemInfo(tmpItem);
            });

            //伙伴列表
            this.UIPanel.StorePetBox.onRefresh(0, null, null);

            //开启战斗
            this.UIPanel.FightBtn.disabled = ExpeditionDataMgr.getCurstage() != tmpSelectStageID;

            //查询怪物血量
            ExpeditionSend.queryStageInfo(this.selectIndex);

            this.onAutoChange();
        }

        public refreshUI()
        {

        }

        private onExpedition_StageInfoAck()
        {
            let tmpStageInfo = ExpeditionDataMgr.getStageinfo(this.selectIndex);
            this.UIPanel.PlayerNameLb.text = tmpStageInfo.display.playername;
            this.UIPanel.PowerLb.text = tmpStageInfo.fightpower.toString();
            this.UIPanel.PlayerIconInfo.setPlayerDisplayInfo(tmpStageInfo.display, true, false);
            this.UIPanel.StorePetBox.onRefresh(tmpStageInfo.petdisplay.length, this, (item: NorItemUI, index: number) =>
            {
                let tmpInfo = tmpStageInfo.petdisplay[index];
                item.setPetInfo(tmpInfo.display);
                if (!tmpInfo.hasOwnProperty("curhp"))
                {
                    item.setBloodProgress(1);
                    item.DieImg.visible = false;
                }
                else
                {
                    item.setBloodProgress(tmpInfo.maxhp.toNumber() > 0 ? tmpInfo.curhp.toNumber() / tmpInfo.maxhp.toNumber() : 0);
                    item.DieImg.visible = (tmpInfo.curhp as Long).toNumber() == 0;
                }

                item.BloodBgImg.visible = !item.DieImg.visible;
            });
        }

        private onExpedition_SynPetHp()
        {
            if (this._needOpenEmbattle)
            {
                this._needOpenEmbattle = false;
                this.closeUI();
                UIManager.Inst.forceOpen(new EmbattleOpenUIData(0, Pb_God._emBattleType.BattleType_Expedition, this.selectIndex, 0, true));
            }
        }
    }
}