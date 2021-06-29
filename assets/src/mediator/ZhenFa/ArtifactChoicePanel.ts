
module Pro
{
	export class ArtifactChoicePanel
	{

		private static tempPanel: any;

		/**
		 * 打开神器选择界面
		 * @param id 当前神器id
		 */
		public static initUI(id: number, teamType?: Pb_God._emZhenfaType)
		{
			//有新的神器激活时，只要点开看了一下，就够了。
			ArtifactDataMgr.setNewArtifactState(false);

			let tempUI = new ProUI.Embattle.ArtifactChoiceUI();
			LayerManager.Inst.topUILayer.addChild(tempUI);
			tempUI.btnClose.onClick(this, () =>
			{
				this.closeUI();
				EventMgr.trigger(EventNotify.Embattle_Artifact_Changed, currentId);
			});

			//记录到全局
			this.tempPanel = tempUI;

			//弹出UI
			let tempCoverSp = PopUpManager.popUpUIAction(tempUI, 0);
			tempCoverSp.onClick(this, () =>
			{
				tempUI.btnClose.activeEvent();
			});

			let isCrossChallenge = teamType >= Pb_God._emZhenfaType.ZhenfaType_CrossChallengeDEF1 && teamType <= Pb_God._emZhenfaType.ZhenfaType_CrossChallengeDEF3;
			let isCrossChallengeFight = teamType >= Pb_God._emZhenfaType.ZhenfaType_CrossChallengeATK1 && teamType <= Pb_God._emZhenfaType.ZhenfaType_CrossChallengeATK3;

			//列表刷新
			let currentId = id;
			tempUI.ItemList.onRefresh(5, this, (itemUI: ProUI.Embattle.ArtifactItemUI, index: number) =>
			{

				let tempArtiId = index + 1;
				let tempArtInfo = ArtifactDataMgr.getInfo(tempArtiId);
				let tempIsActiv = tempArtInfo != null && tempArtInfo.isactive;

				itemUI.FunBtn.onClick(this, () =>
				{

					if ((isCrossChallenge || isCrossChallengeFight) && ((currentId > 0 && tempArtiId != currentId) || currentId == 0))
					{
						let tType = ArtifactChoicePanel.checkCrossChallengeHaveUse(tempArtiId, teamType, isCrossChallengeFight);
						if (tType)
						{
							AlertShow.showConfirmAlert_Two(Global.getLangStr("fight_msg61"), this, () =>
							{
								// EventMgr.trigger(EventNotify.Embattle_Artifact_Changed)
								let tmpZhanFa = EmbattleDataMgr.getCurBuZhenInfoByType(tType);
								tmpZhanFa.switchArtifactId(0);
								EmbattleDataMgr.getCurBuZhenInfoByType(teamType).switchArtifactId(tempArtiId);
								this.closeUI();
								EventMgr.trigger(EventNotify.Embattle_Artifact_Changed, tempArtiId, teamType);
								EventMgr.trigger(EventNotify.Embattle_Artifact_Exchanged)
							}, () =>
								{
									this.closeUI();
								})
							return;
						}
					}

					this.closeUI();
					EventMgr.trigger(EventNotify.Embattle_Artifact_Changed, tempArtiId == currentId ? 0 : tempArtiId, teamType);
					EventMgr.trigger(EventNotify.Embattle_Artifact_Exchanged)
				});
				itemUI.DesBtn.onClick(this, () =>
				{
					tempIsActiv ? ArtifactTips.show(tempArtInfo) : ArtifactTips.showById(tempArtiId);
				})

				itemUI.FunBtn.visible = tempIsActiv;
				itemUI.FunLb.visible = tempIsActiv;
				itemUI.LockLb.visible = !tempIsActiv;
				//itemUI.FunBtn.skin = tempArtiId == currentId ? "res/common/btn01_02.png" : "res/common/btn01_01.png"
				itemUI.FunLb.text = tempArtiId == currentId ? Global.getLangStr("artifact_msg10") : Global.getLangStr("artifact_msg11");// 取消配置 or 装配
				//itemUI.FunLb.color = tempArtiId == currentId ? "#fffced" : "#fffced";
				//itemUI.FunLb.strokeColor = tempArtiId == currentId ? "#468931" : "#a45c38";
				itemUI.NameLb.text = cfg.ArtifactCfgData.getNameByID(tempArtiId);
				if (tempArtInfo) itemUI.NameLb.text += "(" + Global.getLangStr("attr_lv1", tempArtInfo.skilllevel) + ")";
				itemUI.DesLb.text = cfg.ArtifactCfgData.getDescByID(tempArtiId)

				// let tempArtSklv = tempArtInfo != null && tempIsActiv ? tempArtInfo.skilllevel : 1;
				// let tempSkillID = cfg.ArtifactCfgData.getSkillIDByID(tempArtiId);
				// let tempSkillInfo = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(tempSkillID, tempArtSklv);
				// if (tempSkillInfo.des.length > 35) {
				// 	itemUI.DesLb.text = tempSkillInfo.des.substr(0, 33) + "...";
				// }
				// else {
				// 	itemUI.DesLb.text = tempSkillInfo.des;
				// }

				Global.setResIconWithItemID(itemUI.imgIcon, CfgID.ResType.ArtifactHead, tempArtiId);
				itemUI.imgIcon.gray = !tempIsActiv;
				itemUI.imgLock.visible = !tempIsActiv;

				//引导
				if (index == 0 && GuideMgr.Inst.getInStep() == GuideStep.Artifact_16_8)
				{
					if (tempIsActiv && tempArtiId != currentId)
					{
						GuideMgr.Inst.showFinger(itemUI.FunBtn, true, itemUI.FunBtn);
					} else
					{
						GuideMgr.Inst.nextActive();
					}
				}

			});
		}

		/**
		 * 检测跨服竞技场是否已经用了这个图腾
		 */
		public static checkCrossChallengeHaveUse(id: number, teamType: Pb_God._emZhenfaType, isFight: boolean = false)
		{
			for (let i = 0; i < 3; i++)
			{
				let tType = isFight ? Pb_God._emZhenfaType.ZhenfaType_CrossChallengeATK1 + i : Pb_God._emZhenfaType.ZhenfaType_CrossChallengeDEF1 + i;
				if (tType == teamType)
				{
					continue;
				}

				if (EmbattleDataMgr.getCurBuZhenInfoByType(tType).getArtifactId() == id)
				{
					return tType;
				}
			}
			return 0;
		}

		/**
		 * 关闭阵型选择界面
		 */
		public static closeUI()
		{
			if (this.tempPanel != null)
			{
				PopUpManager.removeUIAction(this.tempPanel, 0, true, true);
				this.tempPanel = null;
			}
		}

	}
}