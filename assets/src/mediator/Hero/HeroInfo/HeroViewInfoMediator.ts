
module Pro
{
	/**
	 * 英雄装备属性查看
	 */
	export class HeroViewInfoMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Hero.HeroViewInfo.MainUI;

		/** UI打开参数 */
		UIOpenData: HeroViewInfoOpenUIData;

		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return null;
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Hero.HeroViewInfo.MainUI, 0, BaseAddLayer.TopUI, true);
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

		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{

		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{

			if (this.UIOpenData.petView != null)
			{
				this.UIPanel.BGImg.height = 866;
				this.UIPanel.ExBox.visible = true;
				this.refreshPetView();
			}
			else
			{

				this.UIPanel.BGImg.height = 360;
				this.UIPanel.ExBox.visible = false;
				this.refreshPetCfg();
			}

			this.UIPanel.height = this.UIPanel.BGImg.height;
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}

		/** 刷新petView */
		refreshPetView()
		{
			let currentPetInfo = this.UIOpenData.petView.petinfo;
			if (currentPetInfo == null)
			{
				return;
			}

			let currentPetId = currentPetInfo.display.id;
			let skinId = currentPetInfo.display.useskinid;
			let currentStar = currentPetInfo.display.star;
			let currentUpStarInfo = cfg.PetUpStarCfgData.getInfoWithFun(currentPetId, currentStar);
			let currentMaxAdvance = currentUpStarInfo != null ? currentUpStarInfo.maxAdvance : cfg.PetCfgData.getInitMaxAdvanceByPetID(currentPetId);
			let currentAdvance = currentPetInfo.advance;

			// 角色圣物进阶等级
			let tmpHolyLv = this.UIOpenData.petView.holyinfo ? this.UIOpenData.petView.holyinfo.level : 0;
			let tmpHolyAdv = this.UIOpenData.petView.holyinfo ? this.UIOpenData.petView.holyinfo.advance : 0;

			this.UIPanel.ItemInfo.setPetInfo(currentPetInfo.display);
			this.UIPanel.NameLb.text = cfg.PetSkinCfgData.getFileNameById(skinId);
			this.UIPanel.StarBox.onRefresh(currentMaxAdvance, this, (itemUI: component.UIFrameImage, index: number) =>
			{
				itemUI.frame = index < currentAdvance ? 1 : 2;
			});
			this.UIPanel.PowerLb.text = currentPetInfo.fightpower.toString();
			this.UIPanel.AtterBox.onRefresh(4, this, (itemUI: ProUI.Utils.AttrInfoItemUI, index: number) =>
			{
				let tempAttrID = Pb_God._emBattleAttribute.BattleAttribute_Attack + index;
				itemUI.imgType.frame = tempAttrID;
				itemUI.txtValue.text = cfg.BattleCfgData.getDescByAttrType(tempAttrID) + ": " +
					Global.getAtterValue(currentPetInfo.attr, tempAttrID);
			});
			this.UIPanel.SkillBox.onRefresh(currentPetInfo.baseskill.length, this, (itemUI: ProUI.Utils.SkillItemUI, index: number) =>
			{
				let tmpInfo = currentPetInfo.baseskill[index];
				let tmpSkillInfo = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(tmpInfo.key, tmpInfo.value);
				itemUI.LvLb.text = tmpSkillInfo.skillLevel.toString();
				Global.setResIconWithItemID(itemUI.IconImg, CfgID.ResType.Skill, tmpSkillInfo.skillIndex);
				itemUI.onClick(this, () =>
				{
					UIManager.Inst.forceOpen(new SkillReviewOpenUIData(currentPetInfo.display.useskinid, tmpSkillInfo.skillIndex));
				});
			});
			this.UIPanel.TalentBox.onRefresh(currentPetInfo.talent.length, this, (itemUI: ProUI.Utils.SkillItemUI, index: number) =>
			{
				let tmpTalentIndex = currentPetInfo.talent[index].skillindex;
				let tmpTalentCfgInfo = cfg.SkillNewTalentUpgradeCfgData.getInfo(tmpTalentIndex);
				let tmpSkillInfo = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(tmpTalentCfgInfo.skillID, tmpTalentCfgInfo.level);
				itemUI.LvLb.text = tmpSkillInfo.skillLevel.toString();
				Global.setResIconWithItemID(itemUI.IconImg, CfgID.ResType.Skill, tmpSkillInfo.skillIndex);
				itemUI.onClick(this, () =>
				{
					UIManager.Inst.forceOpen(new SkillReviewOpenUIData(0, tmpSkillInfo.skillIndex));
				});
			});
			this.UIPanel.EquipBox.onRefresh(4, this, (itemUI: EquipItemUI, index: number) =>
			{
				let tempEquipType = Pb_God._emEquipType.EquipType_Weapon + index;
				let tempResults = currentPetInfo.equip.filter(elment => elment.equiptype == tempEquipType);
				let tempEquipID = tempResults.length > 0 ? tempResults[0].itemid : -1;
				itemUI.setPetWeaponID(tempEquipType, tempEquipID);
			});
			this.UIPanel.RuneBox.onRefresh(2, this, (itemUI: EquipItemUI, index: number) =>
			{
				let tempEquipType = Pb_God._emPosType.PosType_1 + index;
				let tempResults = currentPetInfo.rune.filter(elment => elment.pos == tempEquipType);
				let tempItemInfo = tempResults.length > 0 ? tempResults[0].iteminfo : null;
				itemUI.setPetRuneID(tempEquipType, tempItemInfo);
			});
			this.UIPanel.GodEquipBox.onRefresh(4, this, (itemUI: EquipItemUI, index: number) =>
			{
				let tempEquipType = Pb_God._emGodEquipType.GodEquipType_Earring + index;
				let tempResults = currentPetInfo.godequip.filter(elment => elment.equiptype == tempEquipType);
				let tempItemInfo = tempResults.length > 0 ? tempResults[0].iteminfo : null;
				itemUI.setPetGodWeaponID(tempEquipType, tempItemInfo, true);
			});
			this.UIPanel.DetailBtn.onClick(this, () =>
			{
				// let tmpFactionSkillLv = FactionDataMgr.getSkillLvByPetJob(currentPetType,this.UIOpenData.petView.factionskilllevel);
				let tmpFactionSkillLv = this.UIOpenData.petView.factionskilllevel;
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroDataInfo, [currentPetId, tmpHolyLv, tmpHolyAdv, currentPetInfo.attr, tmpFactionSkillLv]));
			});
			this.UIPanel.CommentsBtn.onClick(this, () =>
			{
				TipsUtils.showTips(Global.getLangStr("ui_HeroComment_msg3"));
				// UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroComment, [currentPetInfo.display.useskinid, currentPetInfo.display.star]));
			});
		}

		/** 刷新petCfg */
		refreshPetCfg()
		{
			let currentPetInfo = this.UIOpenData.petCfg;
			let currentPetId = currentPetInfo.petID;
			let currentStar = currentPetInfo.star;
			let skinId = cfg.PetCfgData.getBaseSkinByPetID(currentPetId);

			let currentMaxAdvance = currentPetInfo.maxAdvance;


			this.UIPanel.ItemInfo.setPetUI(skinId, currentStar);
			this.UIPanel.NameLb.text = cfg.PetSkinCfgData.getFileNameById(skinId);
			this.UIPanel.StarBox.onRefresh(currentMaxAdvance, this, (itemUI: component.UIFrameImage, index: number) =>
			{
				itemUI.frame = 1;
			});

			let bookCfgInfo = cfg.PetBookCfgData.getInfoByDoubleKey(currentPetId, currentStar);
			if (bookCfgInfo)
			{
				this.UIPanel.PowerLb.text = bookCfgInfo.power + "";
			}

			//属性列表
			let attrList = cfg.PetBookCfgData.getAddAttrListInfoByCfgInfo(bookCfgInfo);
			this.UIPanel.AtterBox.onRefresh(4, this, (itemUI: ProUI.Utils.AttrInfoItemUI, index: number) =>
			{
				let tempAttrID = Pb_God._emBattleAttribute.BattleAttribute_Attack + index;
				itemUI.imgType.frame = tempAttrID;
				itemUI.txtValue.text = cfg.BattleCfgData.getDescByAttrType(tempAttrID) + ": " +
					Global.getAtterValue(attrList, tempAttrID);
			});

			Global.setSkillBoxWithPetInfo(this.UIPanel.SkillBox, true, skinId, currentMaxAdvance, currentStar, true);

			this.UIPanel.DetailBtn.onClick(this, () =>
			{
				let tmpPetType = cfg.PetCfgData.getPetTypeByPetID(currentPetId);
				let tmpPetJob = cfg.PetCfgData.getPetJobTypeByPetID(currentPetId);
				//从英雄卡进来的，不要显示公共属性。
				// let tmpHolyInfo = HolyDataMgr.getHolyInfo(tmpPetType);
				let tmpHolyLv = 0;//tmpHolyInfo!=null ? tmpHolyInfo.level : 0;
				let tmpHolyAdv = 0;//tmpHolyInfo!=null ? tmpHolyInfo.advance : 0;
				let tmpFactionLv = 0;//FactionDataMgr.getSkillLevel(tmpPetJob);
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroDataInfo, [currentPetId, tmpHolyLv, tmpHolyAdv, attrList, tmpFactionLv]));
			});
			this.UIPanel.CommentsBtn.onClick(this, () =>
			{
				TipsUtils.showTips(Global.getLangStr("ui_HeroComment_msg3"));
				// UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroComment, [skinId, currentStar]));
			});
		}
	}
}