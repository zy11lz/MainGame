
module Pro
{
	/**
	 * 快速战斗
	 */
	export class QuickFightMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Fuben.QuickFight.MainUI;
		effectNode: any;


		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return [UrlMgr.getAtlas("quickfight")];
		}

		/** 需要自动释放的png|jgp资源列表 */
		public autoUnLoadOtherRes(): string[]
		{
			return ["res/Unpack/UIHeadShow/pic_renwu02.png"];
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Fuben.QuickFight.MainUI, 1, BaseAddLayer.TopUI, true);
		}

		/** 关闭UI*/
		closeUI(): void
		{
			this.removeEffNode();
			Laya.timer.clear(this, this.onTimerPrivilege);
			this.closePanel();
		}
		removeEffNode()
		{
			EffectMgr.Inst.releaseEffect(this.effectNode);
			this.effectNode = null;
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{

		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		addEvent(): void
		{
			this.UIPanel.btnClose.onClick(this, this.closeUI);
			this.UIPanel.HelpBtn.onClick(this, this.onHelpClick);
			this.UIPanel.SureBtn.onClick(this, this.onSureClick);
			this.UIPanel.btnGotoPrivilege.onClick(this, this.onClickPrivilege);
			this.UIPanel.btnAddCount.onClick(this, this.onClickPrivilege);
			this.addEventMgr(CmdEvent.Hook_SweepAck, this, this.refreshUI);
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{

		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{
			this.refreshUI();
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{
			let tmpBuyTimes = HookDataMgr.getDaybuysweepcount();
			let tmpMaxBuyTimes = HookDataMgr.getDayMaxBuyCount();

			//活动是否开启
			let isOpenAct = !!ActivityDataMgr.getActivityDataByType(Pb_God._emActivityType.Activity_Times, Pb_God._emActivityTimesType.Activity_Times_Raid);
			this.UIPanel.activityTipsHtml.visible = isOpenAct;
			if (isOpenAct) { this.UIPanel.bg.height = 568; }
			else { this.UIPanel.bg.height = 546; }

			//特权是否激活
			let privilegeActive = PrivilegeDataMgr.getPrivilegeCardValid(Pb_God._emPrivilegeCard.PrivilegeCard_Hook);
			// this.UIPanel.btnGotoPrivilege.visible = !privilegeActive;

			if (!privilegeActive && !HookDataMgr.quickFightPrivilegeClick)
			{
				if (this.effectNode == null)
				{
					let tmpEffPos = new Laya.Point(this.UIPanel.btnGotoPrivilege.width / 2, this.UIPanel.btnGotoPrivilege.height / 2);
					this.effectNode = EffectMgr.Inst.createEffectOne("ui_sailPrivilege", tmpEffPos, null, 1, 1, this.UIPanel.btnGotoPrivilege, false, ResReleaseType.Reference, true);
				}
			}
			if (privilegeActive)
			{
				Laya.timer.loop(1000, this, this.onTimerPrivilege);
				this.UIPanel.btnGotoPrivilege.y = 840;
				this.onTimerPrivilege();
			} else
			{
				Laya.timer.clear(this, this.onTimerPrivilege);
				this.UIPanel.btnGotoPrivilege.y = 840;
				this.UIPanel.txtPrivilegeTime.showText = "<font color='#c92606'>" + Global.getLangStr("shape_msg6") + "</font>";
			}

			let desTips = Global.getLangStr("quickFight_des_1");
			//if (!privilegeActive) { desTips += Global.getLangStr("quickFight_des_3") }			 //特权未激活
			this.UIPanel.DescHtml.showText = desTips;

			if (HookDataMgr.getDayfreesweepcount() > 0)
			{

				this.UIPanel.TipHtml.showText = Global.getLangStr("fight_msg16"); //本次免费";

				this.UIPanel.CostBox.visible = false;
				this.UIPanel.btnAddCount.visible = false;
				this.UIPanel.SureBtn.visible = true;
				this.UIPanel.SureBtn.disabled = false;
			}
			else if (tmpMaxBuyTimes - tmpBuyTimes > 0)
			{

				this.UIPanel.TipHtml.showText = Global.getLangStr("quickFight_des_2", tmpMaxBuyTimes - tmpBuyTimes);

				this.UIPanel.CostBox.visible = true;
				this.UIPanel.btnAddCount.visible = false;
				this.UIPanel.SureBtn.visible = true;
				this.UIPanel.SureBtn.disabled = false;
				let tmpNeedDiamond = cfg.HookBuySweepcountCfgData.getInfoWithFun(tmpBuyTimes + 1).needDiamond;
				Global.setResIconWithItemID(this.UIPanel.CostIconImg, CfgID.ResType.Item, CfgID.ItemID.Diamond);
				this.UIPanel.CostNumLb.text = tmpNeedDiamond + "";
			}
			else
			{

				this.UIPanel.TipHtml.showText = Global.getLangStr("quickFight_des_2", 0);
				if (privilegeActive)
				{
					this.UIPanel.btnAddCount.visible = false;
					this.UIPanel.SureBtn.visible = true;
					this.UIPanel.SureBtn.disabled = true;
					this.UIPanel.CostBox.visible = false;
				} else
				{
					//没有次数了，而且特权也未激活时，显示获取更多次数（激活特权）按钮
					this.UIPanel.btnAddCount.visible = true;
					this.UIPanel.SureBtn.visible = false;
					this.UIPanel.CostBox.visible = false;
				}

			}

			this.UIPanel.CostIconImg.layoutEnabled = this.UIPanel.CostIconImg.visible;
			this.UIPanel.CostBox.refresh();

			let tmpCurrStageId = HookDataMgr.getStageID() > 0 ? HookDataMgr.getStageID() : 1;
			let tmpDropInfo = cfg.HookNormalDropInfoCfgData.getInfoWithStageID(tmpCurrStageId);
			let tmpDropList = cfg.HookNormalDropInfoCfgData.getItemIDAryByIndex(tmpDropInfo.index);
			this.UIPanel.ItemList.onRefresh(tmpDropList.length, this, (itemUI: NorItemUI, index: number) =>
			{
				itemUI.setItemID(tmpDropList[index].value1, 0);
			});
		}

		/** 激活特权 */
		private onClickPrivilege(): void
		{
			this.removeEffNode();
			HookDataMgr.quickFightPrivilegeClick = true;
			UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_PayMain, 3, [Pb_God._emPrivilegeCard.PrivilegeCard_Hook]), BaseBackUIType.CloseQuene);
		}

		/** 帮助 */
		onHelpClick(btn: component.UIButton)
		{
			CommonHelpView.show(btn, Global.getLangStr("quickFight_des_5"));
		}

		/** 扫荡 */
		onSureClick()
		{
			if (HookDataMgr.getStageID() < 3)
			{
				TipsUtils.showTips(Global.getLangStr("tips_msg60", cfg.HookStageCfgData.getStageName(3)));
				return false;
			}

			if (HookDataMgr.getQuickRewardOutOfSailLimit())
			{
				let tmpSailNum = Global.getItemNum(CfgID.ItemID.SailPoint);
				let tmpSailMax = SailDataMgr.getSailMaxPoint();
				AlertShow.showConfirmAlert(Global.getLangStr("sail_limit_tips", tmpSailNum + "/" + tmpSailMax), this, () =>
				{
					this.onSureSweep();
				});
			}
			else
			{
				this.onSureSweep();
			}
		}

		/** 确定扫荡 */
		onSureSweep()
		{
			let tmpBuyTimes = HookDataMgr.getDaybuysweepcount();
			let tmpMaxBuyTimes = HookDataMgr.getDayMaxBuyCount();

			if (HookDataMgr.getDayfreesweepcount() > 0)
			{
				HookSend.freeSweep();
			}
			else if (tmpMaxBuyTimes - tmpBuyTimes > 0)
			{
				if (!TodayRepeatOpMgr.Inst.getTag("QuickBattlePrompt"))
				{
					let tmpNeedDiamond = cfg.HookBuySweepcountCfgData.getInfoWithFun(tmpBuyTimes + 1).needDiamond;
					UIManager.Inst.forceOpen(new TroopBuyItemOpenUIData(5, tmpNeedDiamond));
				} else
				{
					let tempNeedCostID = CfgID.ItemID.Diamond;
					let tempNeedCostNum = this.UIOpenData.customObject as number;
					if (!Global.isFullRes(tempNeedCostID, tempNeedCostNum))
					{
						return;
					}

					HookSend.buySweep();
				}

			}
			else
			{
				TipsUtils.showTipsByLanId("tips_msg27");
			}
		}

		/** 特权倒计时 */
		private onTimerPrivilege(): void
		{
			let overTime = PrivilegeDataMgr.getPrivilegeCardExpiretime(Pb_God._emPrivilegeCard.PrivilegeCard_Hook);
			let leftTime = overTime - TimeController.currTimer / 1000;
			this.UIPanel.txtPrivilegeTime.showText = "<font color='#60c456'>" + Global.GetRemindTime(leftTime, 9) + "</font>";
		}

		//-----------------------------------新手引导------------------------------------
		/**
		 * 进入本步引导
		 */
		public Guide_Enter(step: GuideStep)
		{
			if (step == GuideStep.QuickFight_13_3)
			{
				Laya.timer.once(200, this, () =>
				{
					GuideMgr.Inst.showFinger(this.UIPanel.SureBtn, true, this.UIPanel.SureBtn);
				});
			}
		}
	}
}