
module Pro
{
	/**
	 * 无尽试炼选择buff
	 */
	export class EndlessTowerBuffMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.EndlessTower.ChoiceBuff.MainUI;

		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return null;
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.EndlessTower.ChoiceBuff.MainUI, 1, BaseAddLayer.TopUI, false);
		}

		/** 关闭UI*/
		closeUI(): void
		{
			this.closePanel();
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{

		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		addEvent(): void
		{
			this.addEventMgr(CmdEvent.Train_EndlessBuff, this, this.closeUI);
			this.addEventMgr(CmdEvent.Common_TimeEvent, this, this.onNewDay);
			this.addEventMgr(CmdEvent.Train_EndlessBuffGroup, this, this.refreshBuffList);
			//玩家主动退出战斗
			this.addEventMgr(EventNotify.Battle_SelfExit, this, this.onSelfExit);

			this.addEventMgr(EventNotify.Endless_Auto_CD, this, this.onAutoCD);

			this.UIPanel.autoBtn.on(LayaEvent.CLICK, this, this.onAutoClick);
		}

		private onAutoClick()
		{
			BattleMgr.Inst.autoEndlessTower = (this.UIPanel.autoImg.visible = !this.UIPanel.autoImg.visible) ? 1 : 0;
			this.refreshAutoView()
		}

		private refreshAutoView()
		{
			if (this.UIPanel.autoImg.visible)
			{
				this.UIPanel.autoLbl.showText = Global.getLangStr("ui_EndlessTower_auto", "(" + BattleMgr.Inst.endlessTime + "s)");
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

		onNewDay()
		{
			this.closeUI();
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{
			this.UIPanel.autoBtn.off(LayaEvent.CLICK, this, this.onAutoClick);
		}

		private onSelfExit(batType: number): void
		{
			if (batType == Pb_God._emBattleType.BattleType_Endless)
			{
				this.closeUI();
			}
		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{

			//显示阵型信息
			let tmpZhenfaInfo = EmbattleDataMgr.getBuZhenInfo(Pb_God._emZhenfaType.ZhenfaType_Endless);
			Global.setResPetZhengfa(this.UIPanel.ZhenXingImg, tmpZhenfaInfo.getZhenfaId());
			this.UIPanel.ZhenXingLb.text = cfg.PetFormationCfgData.getNameByID(tmpZhenfaInfo.getZhenfaId());

			let tmpBatInfo = BattleMgr.Inst.getBatPlaceMgr(Pb_God._emBattleType.BattleType_Endless);
			let nextBatId = tmpBatInfo.getBattleID();
			// if (nextBatId >= TrainDataMgr.getEndlessCurfightstage() + 1) nextBatId++;
			if (tmpBatInfo.isFinishBat) { nextBatId++; }
			this.UIPanel.FIghtStageLb.text = Global.getLangStr("endlessTower_msg1", nextBatId);
			//显示伙伴信息
			let tmpPetInfos = tmpBatInfo.getBattlePetInfos(true);
			this.UIPanel.StorePetBox.onRefresh(tmpPetInfos.length, this, (itemUI: NorItemUI, index: number) =>
			{
				let tmpPetStIndex = GameConfig.AtkStandAry[tmpPetInfos[index].pos - 1];
				let tmpPet = tmpBatInfo.getRoleMgr().getRoleWithStandIndex(true, tmpPetStIndex);
				itemUI.setPetInfo(tmpPetInfos[index].pet.display);
				itemUI.DieImg.visible = tmpPet == null;
				itemUI.setBloodProgress(tmpPet ? (tmpPet.roleData.getHp() / tmpPet.roleData.getMaxBlood()) : 0);
			});

			this.refreshBuffList();

			this.UIPanel.autoImg.visible = BattleMgr.Inst.autoEndlessTower > 0;
			this.refreshAutoView();
		}

		/** 刷新 BUFF列表 */
		private refreshBuffList(): void
		{
			//显示buff列表
			let tmpBffIDList = cfg.TrainEndlestBuffCfgData.getBuffIDAryById(TrainDataMgr.getEndlessBuffgroup());
			if (tmpBffIDList == null)
			{
				return;
			}
			this.UIPanel.BuffBox.onRefresh(tmpBffIDList.length, this, (itemUI: ProUI.EndlessTower.ChoiceBuff.BuffItemUI, index: number) =>
			{
				let tmpSkillID = tmpBffIDList[index].value1;
				let tmpSkillInfo = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(tmpSkillID, 1);
				Global.setResIconWithItemID(itemUI.IconImg, CfgID.ResType.Skill, tmpSkillInfo.skillIndex);
				itemUI.NameLb.text = tmpSkillInfo.des;
				itemUI.DesLb.visible = tmpSkillInfo.mask.indexOf(Pb_God._emSkillMaskType.SkillMaskType_EndlessContinue + "") >= 0;
				if (tmpSkillID)
				{
					itemUI.SureBtn.onClick(this, () =>
					{
						TrainSend.endlessBuff(tmpSkillID);
					});
				}
			});
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{
		}
	}
}