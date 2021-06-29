
module Pro
{
	/**
	 * 无尽试炼主界面
	 */
	export class EndlessTowerMainMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.EndlessTower.MainUI;


		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return [UrlMgr.getAtlas("endless")];
		}

		/** 需要自动释放的png|jgp资源列表 */
		public autoUnLoadOtherRes(): Array<string>
		{
			return ["res/endless/lilian_wujinshilian_bg01.png"];
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.EndlessTower.MainUI, 3);
		}

		/** 关闭UI*/
		closeUI(): void
		{
			this.closePanel();
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{
			this.UIPanel.btnClose.onClick(this, this.closeUI);
			this.UIPanel.RewardShowBtn.onClick(this, () =>
			{
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_EndlessTowerPrize));
			});
			this.UIPanel.RankItemBtn.onClick(this, () =>
			{
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_RankDetailReward, Pb_God._emTopListType.TopListType_Endless));
			});
			this.UIPanel.FriendBtn.onClick(this, () =>
			{
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_FightSupport, Pb_God._emFriendSupportType.FriendSupportType_Endless));
			});
			this.UIPanel.FightBtn.onClick(this, () =>
			{
				UIManager.Inst.forceOpen(new EmbattleOpenUIData(0, Pb_God._emBattleType.BattleType_Endless, TrainDataMgr.getEndlessCurfightstage() + 1));
			});
			this.UIPanel.PassRewardBtn.onClick(this, () =>
			{
				let tmpNextPrizeInfo = cfg.TrainEndlessPrizeCfgData.getInfoWithFun(TrainDataMgr.getEndlessPrizestage());
				TrainSend.endlessPrize(tmpNextPrizeInfo.stageID);
			});
			this.UIPanel.HelpBtn.onClick(this, (btn: component.UIButton) =>
			{
					CommonHelpView.showWithLangKey(btn, "championRoadExplain");
			});
		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		addEvent(): void
		{
			this.addEventMgr(CmdEvent.Train_EndlessPrize, this, this.refreshPassInfo);
			this.addEventMgr(CmdEvent.TopList_List_Ack, this, this.refreshPassRank);
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{

		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{
			this.refreshRankReward(0);
			this.UIPanel.RankItemBox.visible = false;
			this.refreshUI();
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

			this.refreshRewardShow();
			this.refreshPassInfo();
			this.requestPassRank();
		}

		/** 玩法奖励 */
		private refreshRewardShow()
		{
			let tmpRewardShowIDAry = cfg.TrainConstantsCfgData.getFirstInfo().mainPagePrize.split(";");
			this.UIPanel.RewardShowBox.onRefresh(tmpRewardShowIDAry.length, this, (itemUI: NorItemUI, index: number) =>
			{
				itemUI.setItemID(parseInt(tmpRewardShowIDAry[index]), 1, false, false);
			});
		}

		/** 请求前3名排行 */
		private requestPassRank()
		{
			TopListSend.list(Pb_God._emTopListType.TopListType_Endless, 1, 3, 0, 0, 0, 0);
		}

		/** 闯关排名 */
		private refreshPassRank(tempClass: Pb_God.PBS2CTopListList)
		{
			if (tempClass.ask.type != Pb_God._emTopListType.TopListType_Endless) return;
			this.UIPanel.RankItemBox.visible = true;
			this.refreshRankReward(tempClass.selfinfo && tempClass.selfinfo.info ? tempClass.selfinfo.info.rank : 0);
			this.UIPanel.RankItemBox.onRefresh(tempClass.list.length, this, (itemUI: ProUI.EndlessTower.RankItemUI, index: number) =>
			{
				itemUI.IconImg.frame = 1 + index;
				if (index < tempClass.list.length)
				{
					let tmpInfo = tempClass.list[index];
					itemUI.NameLb.text = tmpInfo.playerdisplay.playername;
					itemUI.StageLb.text = Global.getLangStr("endlessTower_msg5", tmpInfo.info.value);
				}
				else
				{
					itemUI.NameLb.text = Global.getLangStr("common_empty1");
					itemUI.StageLb.text = "";
				}
			});
		}

		/** 排名奖励 */
		private refreshRankReward(rank: number)
		{
			if (rank <= 0)
			{
				this.UIPanel.RankRewardLb.text = Global.getLangStr("common_norankReward");// 暂无排行奖励";
				this.UIPanel.MyRankLb.text = Global.getLangStr("common_rank4") + Global.getLangStr("common_norank");
				this.UIPanel.RankRewardList.onRefresh(0, null, null);
			} else
			{
				this.UIPanel.MyRankLb.text = Global.getLangStr("common_rank4") + rank;
				this.UIPanel.RankRewardLb.text = ""
				let cfgInfo = cfg.ToplistRewardCfgData.getInfoByRank(rank, Pb_God._emTopListType.TopListType_Endless);
				if (!cfgInfo)
				{
					this.UIPanel.RankRewardLb.text = Global.getLangStr("common_norankReward");// 暂无排行奖励";
					this.UIPanel.RankRewardList.onRefresh(0, null, null);
				} else
				{
					this.UIPanel.RankRewardLb.text = ""
					let addItems = cfg.ToplistRewardCfgData.getAddItemAryByInfo(cfgInfo);
					this.UIPanel.RankRewardList.onRefresh(addItems.length, this, (itemUI: NorItemUI, index: number) =>
					{
						itemUI.setItemInfo(addItems[index]);
					});
				}
			}
		}

		/** 通关信息 */
		private refreshPassInfo()
		{

			let tmpNextPrizeInfo = cfg.TrainEndlessPrizeCfgData.getInfoWithFun(TrainDataMgr.getEndlessPrizestage());
			this.UIPanel.PassRewardBox.visible = tmpNextPrizeInfo != null;
			this.UIPanel.PassStageCountTitleLb.visible = this.UIPanel.PassStageCountLb.visible = tmpNextPrizeInfo != null;
			this.UIPanel.FirstPassLb.visible = tmpNextPrizeInfo != null;
			this.UIPanel.PassRewardBtn.visible = tmpNextPrizeInfo != null;

			if (tmpNextPrizeInfo != null)
			{

				let tmpPrizeList = cfg.TrainEndlessPrizeCfgData.getStagePrizeAryById(tmpNextPrizeInfo.stageID);
				this.UIPanel.PassRewardBox.onRefresh(tmpPrizeList.length, this, (itemUI: NorItemUI, index: number) =>
				{
					itemUI.setItemInfo(tmpPrizeList[index]);
				});
				this.UIPanel.PassStageCountLb.text = (tmpNextPrizeInfo.stageID - TrainDataMgr.getEndlessDaymaxstage()).toString();
				this.UIPanel.FirstPassLb.text = Global.getLangStr("endlessTower_msg2", tmpNextPrizeInfo.stageID);

				this.UIPanel.PassRewardBtn.visible = tmpNextPrizeInfo.stageID <= TrainDataMgr.getEndlessDaymaxstage();
				this.UIPanel.PassStageCountTitleLb.visible = this.UIPanel.PassStageCountLb.visible = !this.UIPanel.PassRewardBtn.visible;
			}

			this.UIPanel.MyOldRankLb.text = TrainDataMgr.getEndlessMaxStageID().toString()
			this.UIPanel.FightStartLb.text = Global.getLangStr("endlessTower_msg3", TrainDataMgr.getEndlessCurfightstage() + 1);
			this.UIPanel.FightTodayPassLb.text = Global.getLangStr("endlessTower_msg4", TrainDataMgr.getEndlessDayStageCount());
		}


		//-----------------------------------新手引导------------------------------------
		/**
		 * 进入本步引导
		 */
		public Guide_Enter(step: GuideStep)
		{
			if (step == GuideStep.Func_EndlessTower_4)
			{
				GuideMgr.Inst.showFinger(this.UIPanel.FriendBtn, true, this.UIPanel.FriendBtn);
			} else if (step == GuideStep.Func_EndlessTower_8)
			{
				GuideMgr.Inst.showFinger(this.UIPanel.FightBtn, true, this.UIPanel.FightBtn);
			}
		}

		// /**
		//  * 操作本步引导
		//  */
		// public Guide_Active(step: GuideStep) {
		// 	if (step == GuideStep.Func_EndlessTower_4) {
		// 		this.UIPanel.FriendBtn.activeEvent();
		// 		GuideMgr.Inst.nextActive();
		// 	} else if (step == GuideStep.Func_EndlessTower_8) {
		// 		this.UIPanel.FightBtn.activeEvent();
		// 		GuideMgr.Inst.nextActive();
		// 	}
		// }

	}
}