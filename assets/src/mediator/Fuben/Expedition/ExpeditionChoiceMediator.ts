
module Pro
{
	/**
	* 远征选择难度
	*/
	export class ExpeditionChoiceMediator extends BaseMediator implements IMediator
	{
		public UIPanel: ProUI.Fuben.Expedition.Choice.MainUI;

		/** 需要自动加载的资源列表 */
		public autoLoadAtlas(): Array<any>
		{
			return [UrlMgr.getAtlas("heroexpeditchoice")];
		}

		/** 需要自动释放的png|jgp资源列表 */
		public autoUnLoadOtherRes(): Array<string>
		{
			return ["res/heroexpeditchoice/lilian_bg_01.png", "res/heroexpeditchoice/lilian_bg_02.png", "res/heroexpeditchoice/lilian_bg_03.png"];
		}

		public openUI(): void
		{
			this.showPanel(ProUI.Fuben.Expedition.Choice.MainUI, 1, BaseAddLayer.TopUI, true);
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
			this.addEventMgr(CmdEvent.Expedition_SelectAck, this, this.onExpedition_SelectAck);
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
			this.UIPanel.DiffuctBox.onRefresh(3, this, (itemUI: ProUI.Fuben.Expedition.Choice.BoxItemUI, index: number) =>
			{
				let tmpStageType = index + 1;
				let tmpNeedPower = cfg.ExpeditionStageTypeCfgData.getNeedFightPowerByStageType(tmpStageType);
				let tmpLockPower = PlayerDataMgr.maxfightPower < tmpNeedPower;
				let tmpLockType = ExpeditionDataMgr.getMaxtype() + 1 < tmpStageType;

				itemUI.BGFrameImg.frame = tmpStageType;
				itemUI.TitleFrameImg.frame = tmpStageType;

				if (tmpStageType == Pb_God._emExpeditionType.ExpeditionType_Simple)
				{
					itemUI.TipsLb.text = "";
				}
				else if (tmpStageType == Pb_God._emExpeditionType.ExpeditionType_Difficulty)
				{
					itemUI.TipsLb.text = tmpLockType ? Global.getLangStr("fight_msg13") : "";  //通关普通模式后开启"
				}
				else if (tmpStageType == Pb_God._emExpeditionType.ExpeditionType_Hell)
				{
					itemUI.TipsLb.text = tmpLockType ? Global.getLangStr("fight_msg14") : "";  //通关困难模式后开启
				}

				itemUI.PowerImg.visible = tmpLockPower;
				itemUI.PowerLb.text = tmpNeedPower.toString();

				itemUI.ChoiceBtn.visible = !tmpLockPower && !tmpLockType;
				itemUI.ChoiceBtn.onClick(this, () =>
				{
					ExpeditionSend.select(tmpStageType);
				});

				let tmpPrizes = cfg.ExpeditionStageTypeCfgData.getAddPrizeAryById(tmpStageType);
				itemUI.RewardItemBox.onRefresh(tmpPrizes.length, this, (rewardItem: NorItemUI, rewardIndex: number) =>
				{
					rewardItem.setItemInfo(tmpPrizes[rewardIndex]);
				});

			});
		}

		public refreshUI()
		{

		}

		private onExpedition_SelectAck()
		{
			this.closeUI();
			UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ExpeditionMain));
		}

		//-----------------------------------新手引导------------------------------------
		/**
		 * 进入本步引导
		 */
		public Guide_Enter(step: GuideStep)
		{
			if (step == GuideStep.Func_Expedition_4)
			{
				Laya.timer.once(500, this, () =>
				{
					let cell = this.UIPanel.DiffuctBox.getCellWithIndex(0) as ProUI.Fuben.Expedition.Choice.BoxItemUI;
					GuideMgr.Inst.showFinger(cell.ChoiceBtn, true, cell.ChoiceBtn);
				});
			}
		}

		// /**
		//  * 操作本步引导
		//  */
		// public Guide_Active(step: GuideStep) {
		// 	if (step == GuideStep.Func_Expedition_4) {
		// 		let cell = this.UIPanel.DiffuctBox.getCellWithIndex(0) as ProUI.Fuben.Expedition.Choice.BoxItemUI;
		// 		cell.ChoiceBtn.activeEvent();
		// 		GuideMgr.Inst.nextActive();
		// 	}
		// }
	}
}