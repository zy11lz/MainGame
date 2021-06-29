
module Pro
{
	/**
	* 组队战选择难度
	*/
	export class TeamCampaignChoiceMediator extends BaseMediator implements IMediator
	{
		public UIPanel: ProUI.Fuben.TeamCampaign.Choice.MainUI;

		private _selectDiffId = 1;
		private _maxDiffId = 1;

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
			this.showPanel(ProUI.Fuben.TeamCampaign.Choice.MainUI, 1, BaseAddLayer.CenterUI, true);
		}

		/*** 关闭UI */
		public closeUI(): void
		{
			Laya.timer.clear(this, this.onTimer);
			this.closePanel();
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		public initialization(): void
		{
			this.UIPanel.btnLeft.onClick(this, this.onLeftClick);
			this.UIPanel.btnRight.onClick(this, this.onRightClick);
			this.UIPanel.btnSure.onClick(this, this.onSureClick);
		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		public addEvent(): void
		{
			this.addEventMgr(CmdEvent.TeamCampaign_Select, this, this.onTeamCampaign_SelectAck);
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
			this._maxDiffId = TeamCampaignDataMgr.getMaxtype();
			this._selectDiffId = this._maxDiffId;
			this.refreshUI();
			this.refreshChangeBtnState();
			this.refreshSelectReward();
			Laya.timer.loop(500, this, this.onTimer);
			this.onTimer();
		}

		public refreshUI()
		{
		}

		private refreshChangeBtnState(): void
		{
			this.UIPanel.btnLeft.visible = this._selectDiffId > 1;
			this.UIPanel.btnRight.visible = this._selectDiffId < 10; //this._maxDiffId;
		}
		public refreshSelectReward()
		{
			let tmpPrizes = cfg.TeamCampaignStageCfgData.getAddPrizeAryByDifficulty(this._selectDiffId);
			this.UIPanel.listItem.onRefresh(tmpPrizes.length, this, (itmeUI: NorItemUI, index: number) => { itmeUI.setItemInfo(tmpPrizes[index]); });
			this.UIPanel.lbDiffName.text = Global.getLangStr("teamCampaign_msg1") + this._selectDiffId;
		}


		//--------------------------------button---------------------------------------
		private onLeftClick()
		{
			this._selectDiffId--;

			this.refreshChangeBtnState();
			this.refreshSelectReward();
		}

		private onRightClick()
		{
			if (this._selectDiffId + 1 > this._maxDiffId)
			{
				TipsUtils.showTipsByLanId("teamCampaign_msg2"); //通关所有关卡后开启下一难度
				return;
			}
			this._selectDiffId++;
			this.refreshChangeBtnState();
			this.refreshSelectReward();
		}

		private onSureClick()
		{
			TeamCampaignSend.select(this._selectDiffId);
		}

		//---------------------------------event----------------------------------------
		private onTeamCampaign_SelectAck()
		{
			UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_TeamCampaignMain), BaseBackUIType.CloseQuene);
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

		//-----------------------------------新手引导------------------------------------
		/**
		 * 进入本步引导
		 */
		public Guide_Enter(step: GuideStep)
		{
			if (step == GuideStep.Func_TeamCampaign_4)
			{
				GuideMgr.Inst.showFinger(this.UIPanel.btnSure, true, this.UIPanel.btnSure);
			}
		}

		// /**
		//  * 操作本步引导
		//  */
		// public Guide_Active(step: GuideStep) {

		// }
	}
}