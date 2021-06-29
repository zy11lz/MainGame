
module Pro
{
	/**
	 * 组队奖励查看
	 */
    export class TeamCampaignRewardMediator extends BaseMediator implements IMediator
    {
        public UIPanel: ProUI.Fuben.TeamCampaign.Reward.MainUI;
        private selectIndex: number;

        /** 需要自动加载的资源列表 */
        public autoLoadAtlas(): Array<any>
        {
            return [UrlMgr.getAtlas("teamcampaign")];
        }

        public openUI(): void
        {
            this.showPanel(ProUI.Fuben.TeamCampaign.Reward.MainUI, 0, BaseAddLayer.TopUI);
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
            this.UIPanel.CloseBtn.onClick(this, this.onCloseClick);
            this.UIPanel.autoBtn.on(LayaEvent.CLICK, this, this.onAutoClick);
            this.addEventMgr(EventNotify.TeamCampaign_Auto_CD, this, this.onAutoCD);
        }

        /** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
        public removeEvent(): void
        {

        }

        private onAutoClick()
        {
            if (PrivilegeDataMgr.vipLevel >= 1)
            {
                TeamCampaignDataMgr.autoTeamCampaign = (this.UIPanel.autoImg.visible = !this.UIPanel.autoImg.visible) ? 1 : 0;
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
                this.UIPanel.autoLbl.showText = Global.getLangStr("ui_EndlessTower_auto", "(" + TeamCampaignDataMgr.teamCampaignTime + "s)");
            }
            else
            {
                this.UIPanel.autoLbl.showText = Global.getLangStr("ui_EndlessTower_auto", "");
            }
        }

        private onAutoCD(CD: number)
        {
            this.UIPanel.autoLbl.showText = Global.getLangStr("ui_EndlessTower_auto", "(" + CD + "s)");
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void
        {
            this.selectIndex = -1;
            this.UIPanel.CloseBtn.gray = true;
            this.UIPanel.autoImg.visible = TeamCampaignDataMgr.autoTeamCampaign > 0;
            this.refreshAutoView();
            this.refreshRewardList();

        }

        public refreshUI()
        {

        }

        private refreshRewardList()
        {
            let tmpExtralIDList: number[] = this.UIOpenData.customObject;
            this.UIPanel.RewardBox.onRefresh(tmpExtralIDList.length, this, (itemUI: ProUI.Fuben.TeamCampaign.Reward.ListItemUI, index: number) =>
            {
                let tmpInfo = cfg.TeamCampaignExtraPrizeCfgData.getInfo(tmpExtralIDList[index]);
                let tmpType = tmpInfo.type as Pb_God._emTeamCampaignExtraPrize;
                itemUI.imgSelect.visible = this.selectIndex == index;

                if (tmpType == Pb_God._emTeamCampaignExtraPrize.TeamCampaignExtraPrize_Heal)
                {
                    itemUI.imgIcon.skin = `res/teamcampaign/ExtraPrize${ tmpType }.png`;
                    itemUI.lbTips.text = Global.getLangStr("teamCampaign_msg3", tmpInfo.param); // "回复出战英雄血量:" + tmpInfo.param + "%";
                }
                else if (tmpType == Pb_God._emTeamCampaignExtraPrize.TeamCampaignExtraPrize_Revive)
                {
                    itemUI.imgIcon.skin = `res/teamcampaign/ExtraPrize${ tmpType }.png`;
                    itemUI.lbTips.text = Global.getLangStr("teamCampaign_msg4", tmpInfo.param); // "复活已死英雄血量:" + tmpInfo.param + "%";
                }
                else if (tmpType == Pb_God._emTeamCampaignExtraPrize.TeamCampaignExtraPrize_Skill)
                {
                    Global.setResIconWithItemID(itemUI.imgIcon, CfgID.ResType.Skill, tmpInfo.param);
                    itemUI.lbTips.text = cfg.SkillNewSkillCfgData.getNameBySkillIndex(tmpInfo.param); //添加额外技能
                }
                itemUI.onClick(this, () =>
                {
                    this.UIPanel.CloseBtn.gray = false;
                    this.selectIndex = index;
                    this.refreshRewardList();
                });
            });
        }

        private onCloseClick()
        {
            if (this.selectIndex < 0)
            {
                TipsUtils.showTipsByLanId("teamCampaign_msg11");
                return;
            }
            TeamCampaignSend.selectExtraPrize(this.selectIndex);
            if (TeamCampaignDataMgr.autoTeamCampaign > 0)
            {
                TeamCampaignDataMgr.autoFight(false);
            }
            this.closeUI();
        }

    }
}