
module Pro
{
    /**
     * 组队战斗
     */
    export class TeamCampaignFightMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Fuben.TeamCampaign.Fight.MainUI;
        private selectIndex: number;
        private selectStage: number;

        /** 需要自动加载的资源列表 */
        public autoLoadAtlas(): Array<any>
        {
            return [];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Fuben.TeamCampaign.Fight.MainUI, 0, BaseAddLayer.TopUI, true);
        }

        /*** 关闭UI */
        public closeUI(): void
        {
            this.closePanel();
        }

        /** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
        public initialization(): void
        {
            this.UIPanel.FightBtn.onClick(this, this.onFightClick);
        }

        /** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public addEvent(): void
        {
            this.addEventMgr(CmdEvent.TeamCampaign_SyncTarget, this, this.onStageInfoAck);
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
            this.selectIndex = this.UIOpenData.customObject;
            let tmpSelectStageID = cfg.TeamCampaignStageCfgData.getStageByIndex(this.selectIndex);
            this.selectStage = tmpSelectStageID;
            this.UIPanel.TItleLb.text = Global.getLangStr("bat_msg2", tmpSelectStageID);
            this.UIPanel.txtDesc.text = cfg.TeamCampaignStageCfgData.getMonsterDescByIndex(this.selectIndex);

            //通关最佳
            this.UIPanel.PlayerNameLb.text = "11";
            this.UIPanel.PowerLb.text = "0";

            //奖励
            let tmpPrizeList = cfg.TeamCampaignStageCfgData.getAddPrizeAryById(this.selectIndex);
            this.UIPanel.RewardBox.onRefresh(tmpPrizeList.length, this, (rewardItem: NorItemUI, rewardIndex: number) =>
            {
                let tmpItem = tmpPrizeList[rewardIndex];
                rewardItem.setItemInfo(tmpItem);
            });

            //伙伴列表
            this.UIPanel.StorePetBox.onRefresh(0, null, null);

            //开启战斗
            this.UIPanel.FightBtn.disabled = TeamCampaignDataMgr.getCurstage() != tmpSelectStageID;

            //查询怪物血量
            TeamCampaignSend.queryStageTarget(tmpSelectStageID);
        }

        public refreshUI()
        {

        }

        private onStageInfoAck()
        {
            let tmpStageInfo = TeamCampaignDataMgr.getStageinfo(this.selectStage);
            this.UIPanel.PlayerNameLb.text = tmpStageInfo.display.playername;
            this.UIPanel.PowerLb.text = tmpStageInfo.fightpower.toString();
            // this.UIPanel.PlayerIconInfo.setPlayerDisplayInfo(tmpStageInfo.display,true,false);
            let posArr = [1, 4, 7, 2, 5, 8, 3, 6, 9];
            let posMapHero = Global.listToStringMapData(tmpStageInfo.petdisplay, "pos");
            this.UIPanel.StorePetBox.onRefresh(posArr.length, this, (item: NorItemUI, index: number) =>
            {
                let tmpInfo = posMapHero.get(posArr[index]);
                if (tmpInfo)
                {
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
                }
                else
                {
                    item.setEmptyInfo();
                }
            });
        }

        private onFightClick()
        {
            this.closeUI();

            let tmpBuzhen = EmbattleDataMgr.getBuZhenInfo(Pb_God._emZhenfaType.ZhenfaType_TeamCampaign);

            let tmpPosList = tmpBuzhen.getPosData(true, false);
            if (tmpPosList.length <= 0)
            {
                TipsUtils.showTipsByLanId("teamCampaign_msg10");
                return;
            }

            let tmpCondAry = cfg.TeamCampaignStageCfgData.getConditionAryById(this.selectIndex);
            for (let i = 0; i < tmpCondAry.length; i++)
            {
                let tmpElment = tmpCondAry[i];
                if (tmpElment.uType == Pb_God._emTeamCampaignCondition.TeamCampaignCondition_Hero)
                {
                    for (let j = 0; j < tmpElment.length; j++)
                    {
                        if (!tmpBuzhen.getStoredWithSameHeroID(tmpElment[j]))
                        {
                            TipsUtils.showTipsByLanId("teamCampaign_msg7", cfg.PetSkinCfgData.getFileNameByPetID(tmpElment[j]));
                            return;
                        }
                    }
                }
                else if (tmpElment.uType == Pb_God._emTeamCampaignCondition.TeamCampaignCondition_Job)
                {
                    for (let j = 0; j < tmpElment.length; j++)
                    {
                        if (!tmpBuzhen.getPetTypeNum(tmpElment[j]))
                        {
                            TipsUtils.showTipsByLanId("teamCampaign_msg8", tmpElment[j]);
                            return;
                        }
                    }
                }
                else if (tmpElment.uType == Pb_God._emTeamCampaignCondition.TeamCampaignCondition_Formation)
                {
                    if (tmpBuzhen.getTeamType() != tmpElment[0])
                    {
                        TipsUtils.showTipsByLanId("teamCampaign_msg9", tmpElment[0]);
                        return;
                    }
                }
            }

            let tmpFixPosAry = cfg.TeamCampaignStageCfgData.getFixPosAryById(this.selectIndex);
            if (tmpFixPosAry.length > 0)
            {
                tmpBuzhen.switchzhenfaWithPos(tmpFixPosAry);
            }

            BattleMgr.Inst.createNormalBat(Pb_God._emBattleType.BattleType_TeamCampaign, this.selectIndex, tmpBuzhen.getZhenfaId(), tmpBuzhen.getTeamType());

        }
    }
}