
module Pro
{
	/**
	 * 组队
	 */
	export class TeamCampaignMainMediator extends BaseMediator implements IMediator
	{
		public UIPanel: ProUI.Fuben.TeamCampaign.MainUI;

		/** 需要自动加载的资源列表 */
		public autoLoadAtlas(): Array<any>
		{
			return [UrlMgr.getAtlas("teamcampaign")];
		}

		/** 需要自动释放的png|jgp资源列表 */
		public autoUnLoadOtherRes(): Array<string>
		{
			return null;
		}

		public openUI(): void
		{
			this.showPanel(ProUI.Fuben.TeamCampaign.MainUI, 0, BaseAddLayer.CenterUI, false, 1);
		}

		/*** 关闭UI */
		public closeUI(): void
		{
			Laya.timer.clear(this, this.onTimer);
			this.closePanel();
		}

		/** 检查UI是否能被重新拉起来 */
		public checkCanDisplayUI(): boolean
		{
			//如果当前正在观看对应的战斗，则界面还不能拉起来，等战斗结束后才能拉
			if (BattleMgr.Inst.getWatchBattleType() == Pb_God._emBattleType.BattleType_TeamCampaign)
			{
				return false;
			}
			return super.checkCanDisplayUI();
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		public initialization(): void
		{
			this.UIPanel.scrollPanel.vScrollBarSkin = null;
			this.UIPanel.CloseBtn.onClick(this, this.closeUI);
			this.UIPanel.HelpBtn.onClick(this, this.onClickHelp);
			this.UIPanel.ShopBtn.onClick(this, () =>
			{
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Shop, Pb_God._emShopType.ShopType_Team));
			});
			this.UIPanel.SupportBtn.onClick(this, () =>
			{
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FightSupport, Pb_God._emFriendSupportType.FriendSupportType_TeamCampaign));
			});
			this.UIPanel.BuffBtn.onClick(this, this.onClickBuffBtn);
			this.UIPanel.ChangZhenfaBtn.onClick(this, this.onZhenXingChangeClick);
			this.UIPanel.ArtifactBtn.onClick(this, this.onArtifactChangeClick);

			// this.UIPanel.MapLayer.removeSelf();
			// this.UIPanel.scrollPanel.content.addChild(this.UIPanel.MapLayer);
		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		public addEvent(): void
		{
			this.addEventMgr(CmdEvent.TeamCampaign_SyncStage, this, this.refreshUI);
			this.addEventMgr(EventNotify.Embattle_Zhenxing_Changed, this, this.zhenXingChangedEvent);
			this.addEventMgr(EventNotify.Embattle_Artifact_Changed, this, this.artifactChangeEvent);
			this.addEventMgr(EventNotify.Battle_Result, this, this.onBattleResult);
			this.addEventMgr(EventNotify.Battle_Result_Close, this, (battleType: number) =>
			{
				//检查是否还有未选择的BUFF
				if (battleType == Pb_God._emBattleType.BattleType_TeamCampaign)
				{ TeamCampaignDataMgr.checkBuffPrize(); }
			});


			this.addEventMgr(CmdEvent.TeamCampaign_SyncTarget, this, this.onStageInfoAck);
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		public removeEvent(): void
		{

		}

		private onClickHelp(btn: component.UIButton): void
		{
			CommonHelpView.showWithLangKey(btn, "tempcampaign_help");
		}

		/**
		 * 初始化面板ui
		 */
		public initUI(): void
		{
			let tmpBuzhen = EmbattleDataMgr.getBuZhenInfo(Pb_God._emZhenfaType.ZhenfaType_TeamCampaign);
			if (tmpBuzhen == null)
			{
				tmpBuzhen = EmbattleDataMgr.addNewBuZhen(1, Pb_God._emZhenfaType.ZhenfaType_TeamCampaign);
				this.saveZhenInfo();
			} else
			{
				//检查一次数据，做一次阵位纠正，外网环境不知道为啥阵位的人数数据有变。
				tmpBuzhen.switchZhenfaId(tmpBuzhen.getZhenfaId())
			}

			let tmpStageType = TeamCampaignDataMgr.getCurtype();
			this.UIPanel.TItleLb.text = Global.getLangStr("ui_TeamCampaign_title") + " " + Global.getLangStr("teamCampaign_msg1") + tmpStageType;  // "组队征战 难度" + tmpStageType;
			this.UIPanel.ExtralPrizeBox.visible = false;
			this.refreshUI();
			Laya.timer.loop(500, this, this.onTimer);
			this.onTimer();

			this.queryCurStageTarget();
			//检查是否还有未选择的BUFF
			TeamCampaignDataMgr.checkBuffPrize();
		}

		private onBattleResult(battleType: number): void
		{
			if (battleType == Pb_God._emBattleType.BattleType_TeamCampaign) { this.queryCurStageTarget(); }
		}

		private queryCurStageTarget(): void
		{
			let stage = TeamCampaignDataMgr.getCurstage();
			if (stage > this.UIPanel.MapLayer.numChildren) { return; } //全部通关了
			TeamCampaignSend.queryStageTarget(stage);
		}


		/** 倒计时 */
		private _resetTime = 0;
		private onTimer(): void
		{
			let currTimer = TimeController.currTimer;
			if (currTimer > this._resetTime)
			{
				//当天24点
				let endDate = new Date(currTimer);
				endDate.setHours(23, 59, 59, 999); //延伸到当天的23:59:59
				this._resetTime = endDate.getTime();
			}
			let leftTime = this._resetTime - currTimer;
			let strTimer = Global.GetRemindTime(leftTime / 1000, 4);
			this.UIPanel.LastTimeLb.text = Global.getLangStr("teamCampaign_msg5", strTimer);

		}

		public refreshUI()
		{
			this.refreshStageStatue();
			this.refreshPetList();
			this.refreshMiniInfo();
		}

		private refreshMiniInfo()
		{

			let tmpBuzhen = EmbattleDataMgr.getBuZhenInfo(Pb_God._emZhenfaType.ZhenfaType_TeamCampaign);
			let zhenfaId = tmpBuzhen.getZhenfaId() || 1;
			Global.setResPetZhengfa(this.UIPanel.ZhenfaImg, zhenfaId + 7);

			let tmpArtifactID = tmpBuzhen.getArtifactId();

			this.UIPanel.ArtifactStatueImg.visible = tmpArtifactID == 0;
			tmpArtifactID > 0 ?
				Global.setResIconWithItemID(this.UIPanel.ArtifactIconImg, CfgID.ResType.ArtifactHead, tmpArtifactID) :
				this.UIPanel.ArtifactIconImg.skin = "";
		}

		/** 刷新额外奖励 */
		private onClickBuffBtn()
		{
			let skills = TeamCampaignDataMgr.getBuffSkillIds();
			if (this.UIPanel.ExtralPrizeBox.visible)
			{
				this.UIPanel.ExtralPrizeBox.visible = false;
				return;
			}
			if (!skills || skills.length == 0)
			{
				TipsUtils.showTipsByLanId("teamCampaign_msg6");
				return;
			}
			this.UIPanel.ExtralPrizeBox.visible = true;
			this.UIPanel.ExtralPrizeList.onRefresh(skills.length, this, (itemUI: Laya.Box, index: number) =>
			{
				let skill = skills[index];

				let tmpImgIcon = itemUI.getChildByName("imgIcon") as Laya.Image;
				let tmplbTips = itemUI.getChildByName("txtValue") as component.UILabel;

				tmplbTips.text = cfg.SkillNewSkillCfgData.getNameBySkillIndex(skill);
				Global.setResIconWithItemID(tmpImgIcon, Pro.CfgID.ResType.Skill, skill);
			});
		}

		/** 刷新选择的英雄列表 */
		private refreshPetList()
		{

			let tmpBuZhenPower = 0;
			this.UIPanel.FightPowerLb.text = "" + 0;

			let tmpBuzhen = EmbattleDataMgr.getBuZhenInfo(Pb_God._emZhenfaType.ZhenfaType_TeamCampaign);
			let tmpPosList = tmpBuzhen.getPosData(true, false);
			this.UIPanel.PetsBox.onRefresh(3, this, (itemUI: NorItemUI, index: number) =>
			{
				itemUI.onDisplay();
				if (index < tmpPosList.length)
				{
					//刷新上阵英雄
					let tmpHeroInfo = tmpBuzhen.getHeroByStorePosInfo(tmpPosList[index]);
					//阵亡英雄直接下阵
					let isOver = TeamCampaignDataMgr.getPetHpRate(tmpHeroInfo) <= 0;
					if (isOver)
					{
						itemUI.PlusStatueImg.visible = true;
						if (tmpHeroInfo) { tmpHeroInfo.onStore = false; }
						tmpBuzhen.removeStoreByIndex(tmpPosList[index].pos - 1);
						Laya.timer.callLater(this, this.saveZhenInfo);
					} else
					{
						itemUI.setPetInfo(tmpHeroInfo, false, false);
						//刷新战斗力
						tmpBuZhenPower += tmpHeroInfo.fightpower;
						this.UIPanel.FightPowerLb.text = tmpBuZhenPower.toString();
					}

				}
				else
				{
					itemUI.PlusStatueImg.visible = true;
				}
				itemUI.onClick(this, () =>
				{
					UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_TeamCampaignPetChoice));
				});
			});

		}

		/** 刷新关卡状态 */
		private refreshStageStatue()
		{
			let tmpCfgList = cfg.TeamCampaignStageCfgData.getListWithType(TeamCampaignDataMgr.getCurtype());
			let mapCount = this.UIPanel.MapLayer.numChildren;
			let tmpCfgCount = Math.min(tmpCfgList.length, mapCount);
			let curStage = TeamCampaignDataMgr.getCurstage();
			for (let i = 0; i < mapCount; i++)
			{
				let tmpItem = this.UIPanel.MapLayer.getChildAt(i) as ProUI.Fuben.TeamCampaign.MainMapItemUI;
				tmpItem.visible = i < tmpCfgCount;
				if (i >= tmpCfgCount)
				{
					continue;
				}
				let tmpInfo = tmpCfgList[i];
				let isLock = tmpInfo.stage > curStage;
				tmpItem.btn.gray = isLock;
				tmpItem.txtName.text = Global.getLangStr("bat_msg2", tmpInfo.stage);
				tmpItem.imgFinish.visible = tmpInfo.stage < curStage; //已通关
				tmpItem.icon.gray = !(tmpInfo.stage == curStage);
				tmpItem.imgProgress.visible = tmpItem.txtProgress.visible = !tmpItem.imgFinish.visible;
				//怪物头像
				Global.setResIconWithItemID(tmpItem.icon, CfgID.ResType.Pet, tmpInfo.showPetId);

				//怪物血量
				let progress = 0;
				if (isLock) { progress = 1; }
				else if (tmpInfo.stage == curStage)
				{
					progress = TeamCampaignDataMgr.getCurStageHpPercent();
				}
				tmpItem.txtProgress.text = Global.parsePercentNum(progress, 0);
				tmpItem.imgProgress.mask.width = progress * tmpItem.imgProgress.width;

				tmpItem.btn.onClick(this, () =>
				{
					if (isLock)
					{
						TipsUtils.showTipsByLanId("tips_msg26");
					}
					else
					{
						UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_TeamCampaignFight, tmpInfo.index));
					}
				})
			}

			//laya组件BUG， 在刚初始化完还要再等等才能滚动, 要不然滚动的max还没初始化
			Laya.timer.callLater(this, () =>
			{
				this.UIPanel.scrollPanel.scrollTo(0, 475 - (curStage - 1) * 40);
			})
		}


		/** 拿到当前关卡的数据 */
		private onStageInfoAck(value: Pb_God.PBG2CTeamCampaignTarget)
		{
			let curStage = TeamCampaignDataMgr.getCurstage();
			if (value.stage != curStage) { return; }
			let progress = TeamCampaignDataMgr.getCurStageHpPercent();
			let tmpItem = this.UIPanel.MapLayer.getChildAt(curStage - 1) as ProUI.Fuben.TeamCampaign.MainMapItemUI;
			tmpItem.txtProgress.text = Global.parsePercentNum(progress, 0);
			tmpItem.imgProgress.mask.width = progress * tmpItem.imgProgress.width;
		}

		//--------------------------------阵法改变------------------------------
		/** 打开阵型切换界面 */
		private onZhenXingChangeClick()
		{
			ZhenXingChangePanel.initUI(EmbattleDataMgr.getBuZhenInfo(Pb_God._emZhenfaType.ZhenfaType_TeamCampaign).getZhenfaId(), true);
		}

		/** 阵型变化 */
		private zhenXingChangedEvent(newid: number)
		{

			let tmpZhanFa = EmbattleDataMgr.getBuZhenInfo(Pb_God._emZhenfaType.ZhenfaType_TeamCampaign);
			if (tmpZhanFa.getZhenfaId() != newid)
			{
				tmpZhanFa.switchZhenfaId(newid);
				this.saveZhenInfo();
			}

			this.refreshMiniInfo();
		}

		//-------------------------------神器改变--------------------------------
		private onArtifactChangeClick()
		{
			ArtifactChoicePanel.initUI(EmbattleDataMgr.getBuZhenInfo(Pb_God._emZhenfaType.ZhenfaType_TeamCampaign).getArtifactId());
		}

		private artifactChangeEvent(newid: number)
		{
			let tmpZhanFa = EmbattleDataMgr.getBuZhenInfo(Pb_God._emZhenfaType.ZhenfaType_TeamCampaign);
			if (tmpZhanFa.getArtifactId() != newid)
			{
				tmpZhanFa.switchArtifactId(newid);
				this.saveZhenInfo();
			}

			this.refreshMiniInfo();
		}

		private saveZhenInfo(): void
		{
			let tmpZhanFa = EmbattleDataMgr.getBuZhenInfo(Pb_God._emZhenfaType.ZhenfaType_TeamCampaign);
			PetSend.set_Zhenfa_Ask(tmpZhanFa.getTeamType(), tmpZhanFa.getZhenfaId(), tmpZhanFa.getPosData(false), tmpZhanFa.getArtifactId());
		}

		//-----------------------------------新手引导------------------------------------
		/**
		 * 进入本步引导
		 */
		public Guide_Enter(step: GuideStep)
		{
			/*
			if (step == GuideStep.Func_Expedition_5) {
				Laya.timer.once(100, this, () => {
					let tmpBtn = this.UIPanel.MapInfo.PointBox.getChildAt(0) as component.UIButton;
					GuideMgr.Inst.showFinger(tmpBtn, false);
				});
			}
			*/
		}

		/**
		 * 操作本步引导
		 */
		public Guide_Active(step: GuideStep)
		{
			/*
			if (step == GuideStep.Func_Expedition_5) {
				let tmpBtn = this.UIPanel.MapInfo.PointBox.getChildAt(0) as component.UIButton;
				tmpBtn.activeEvent();
				GuideMgr.Inst.nextActive();
			}
			*/
		}

	}
}