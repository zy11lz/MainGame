module Pro
{
	export class ArtifactSkillTable extends ProUI.Artifact.ActiveInfo.UpgradeViewUI
	{

		/** 当前选择的神器ID */
		private id: number;

		setData(artId: number, readyActive: boolean): void
		{

			this.id = artId;

			this.refreshFightState();

			//神器
			let tempArtifactInfo = ArtifactDataMgr.getInfo(this.id);

			//当前技能
			let tempSkillId = cfg.ArtifactCfgData.getSkillIDByID(this.id);
			let tempSkillLv = 1;
			if (tempArtifactInfo && tempArtifactInfo.skilllevel) tempSkillLv = tempArtifactInfo.skilllevel;
			let tempSkillInfo = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(tempSkillId, tempSkillLv);
			this.SkillDesLb.text = tempSkillInfo.des;
			this.SkillNameLb.text = tempSkillInfo.name;
			Global.setResIconWithItemID(this.SkillIconImg, CfgID.ResType.Skill, tempSkillInfo.skillIndex);

			this.NameLb.text = cfg.ArtifactCfgData.getNameByID(this.id);
			this.btnActive.visible = readyActive;
			this.btnGoFight.visible = false;
			this.UpgradeBtn.visible = false;
			this.btnReset.visible = false;

			if (ArtifactDataMgr.isGetAllArtiface)
			{ //所有元灵都激活, 技能可升级
				this.SkillNameLb.text += "+" + tempSkillLv;
				this.NameLb.text += Global.getLangStr("artifact_msg12", tempSkillLv);
				//升级信息
				let nextExpInfo = cfg.ArtifactSkillUpgradeCfgData.getInfoByDoubleKey(tempSkillId, tempSkillLv + 1);

				//升级节点显示
				this.UpgradeCostBox.visible = nextExpInfo != null;
				this.UpgradeBtn.visible = nextExpInfo != null;
				this.SkillLockLb.text = "";

				//重置按钮
				this.btnReset.visible = tempSkillLv > 1;
				this.btnReset.onClick(this, () =>
				{
					let des = Global.getLangStr("artifact_reset_tips");
					AlertShow.showConfirmAlert(des, this, () =>
					{
						ArtifactSend.reset(this.id);
					}, "common_confirm", "common_cancel", 5);
				})

				//升级状态显示
				if (nextExpInfo != null)
				{
					//等级限制
					if (nextExpInfo.needArtifactLevel > ArtifactDataMgr.getFazhenInfo().level)
					{
						this.UpgradeBtn.disabled = true;
						this.imgRedDotUpgrade.visible = false;
						this.UpgradeCostBox.visible = false;
						this.SkillLockLb.text = Global.getLangStr("artifact_msg3", nextExpInfo.needArtifactLevel);
					} else
					{
						this.UpgradeBtn.disabled = false;
						//升级消耗
						this.UpgradeCostBox.visible = true;
						let tempUpgradeAry = cfg.ArtifactSkillUpgradeCfgData.getNeedItemAryByIdLevel(tempSkillId, tempSkillLv + 1);
						this.UpgradeCostBox.onRefresh(tempUpgradeAry.length, this, (itemUI: ProUI.Artifact.CostItemUI, index: number) =>
						{
							Global.drawItemUI(itemUI, tempUpgradeAry[index], false, true, true, "#FFF6e8", "#e60000");
						});

						this.imgRedDotUpgrade.visible = Global.isFullAllRes(tempUpgradeAry, false);
						this.UpgradeBtn.onClick(this, () =>
						{
							if (!Global.isFullAllRes(tempUpgradeAry))
							{
								return;
							}
							ArtifactSend.skill(this.id);
						});
					}

				}

			}
			else
			{
				this.UpgradeCostBox.visible = false;
				if (readyActive)
				{ //当前这个神器处于即将激活状态中
					this.SkillLockLb.text = Global.getLangStr("ui_Artifact_msg20");
					this.btnActive.onClick(this, () =>
					{
						ArtifactSend.unlock(this.id);
					})
				}
				else
				{
					this.SkillLockLb.text = Global.getLangStr("ui_Artifact_msg19");
					this.btnGoFight.visible = true;
					this.btnGoFight.onClick(this, () =>
					{
						EventMgr.trigger(EventNotify.MainUI_BottomFun_Changed, 3);
					})
				}
			}
		}

		/** 出战装配状态 */
		private refreshFightState(): void
		{
			let fightTypeList = ArtifactDataMgr.getToFightEmbattleList(this.id);
			this.txtEquip.visible = fightTypeList.length > 0;
			if (this.txtEquip.visible)
			{
				let strList: string[] = [];
				for (let fightType of fightTypeList)
				{
					strList.push(Global.getLangStr("zhenfatype_name_" + fightType));
				}
				this.txtEquip.text = Global.getLangStr("artifact_msg16", strList.join(Global.getLangStr("common_join2")));
			}
		}
	}
}