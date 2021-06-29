
module Pro
{
	export class EquipItemUI extends ProUI.Utils.EquipItemUI
	{
		constructor()
		{
			super();
		}

		private itemLight: EffNode;

		public checkAndSetItemEffect(itemId: number): void
		{
			let flash = cfg.ItemCfgData.getFlashById(itemId)
			//特殊道具闪光特效
			if (itemId && flash >= 1)
			{ this.setItemEffect(cfg.ItemCfgData.getQualityById(itemId)); }
			else
			{ this.removeItemEffect(); }
		}
		/**
		 * 添加道具特效
		 */
		public setItemEffect(quality: number)
		{
			if (this.itemLight != null)
			{
				this.removeItemEffect();

			}
			if (quality < 3)
			{ quality = 0; }
			this.itemLight = EffectMgr.Inst.createEffectOne(`ui_itemLightNew_${ quality }`, new Laya.Point(this.width / 2 + 1, this.height / 2 - 1), -1, 2, 1, this, false, ResReleaseType.Reference, true);
		}
		/**
		 * 移除道具特效
		 */
		public removeItemEffect()
		{
			if (this.itemLight != null)
			{
				// this.itemLight.removeSelf();
				EffectMgr.Inst.releaseEffect(this.itemLight);
				this.itemLight = null;
			}
		}

		public setPetWeaponID(tempEquipType: number, itemID: number)
		{
			this.NumLb.visible = false;
			this.PlusImg.visible = false;
			this.NameLb.visible = false;
			this.LvLb.visible = false;
			this.godequipSuitTypeImg.visible = false;
			this.StarBox.visible = itemID != -1;
			this.RedDotImg.visible = false
			if (itemID != -1)
			{
				Global.setResIconWithItemID(this.IconImg, CfgID.ResType.Item, itemID);
				Global.setResQuWithItemID(this.bg, CfgID.ResType.Item, itemID);
				this.StarBox.setStar(cfg.ItemCfgData.getStarNumById(itemID));
			}
			else
			{
				Global.setResQuWithNum(this.bg, 0);
				this.IconImg.skin = "res/common/yingxiong_pic_" + tempEquipType + ".png";
			}
			//特殊道具闪光特效
			this.checkAndSetItemEffect(itemID);

			if (itemID > 0)
			{
				let tmpInfo = new Pb_God.PBItem();
				tmpInfo.itemid = itemID;
				tmpInfo.itemcount = 1;
				this.onClick(this, () =>
				{
					UIManager.Inst.forceOpen(new ItemReviewOpenUIData(tmpInfo));
				});
			}
			else
			{
				this.onClick(null, null);
			}

		}

		public setPetRuneID(tempEquipType: number, itemInfo: Pb_God.PBItem)
		{
			this.NumLb.visible = false;
			this.PlusImg.visible = false;
			this.StarBox.visible = false;
			this.godequipSuitTypeImg.visible = false;
			this.NameLb.visible = false;
			this.RedDotImg.visible = false;
			this.LvLb.visible = false;

			if (itemInfo != null)
			{
				this.NameLb.text = cfg.ItemCfgData.getNameById(itemInfo.itemid);
				Global.setResIconWithItemID(this.IconImg, CfgID.ResType.Item, itemInfo.itemid);
				Global.setResQuWithItemID(this.bg, CfgID.ResType.Item, itemInfo.itemid);

				this.onClick(this, () =>
				{
					UIManager.Inst.forceOpen(new ItemReviewOpenUIData(itemInfo));
				});

				//特殊道具闪光特效
				this.checkAndSetItemEffect(itemInfo.itemid);
			}
			else
			{
				this.removeItemEffect();
				this.onClick(null, null);
				// Global.setResQuWithNum(this.bg,0);
				this.bg.skin = "res/common/propicon_100_09.png";
				this.IconImg.skin = "res/common/yingxiong_pic_5.png";
			}
		}

		/**
		 * 显示伙伴穿戴武器状态
		 * @param tempEquipInfo 床带装备属性
		 * @param tempEquipType 装备的子类型
		 */
		public setPetWeaponInfo(petInfo: Net.hero, tempEquipType: number)
		{

			let EquipMgr = SuitEquipDataMgr.getSuitMgr(petInfo.sn);
			let tempEquipInfo = EquipMgr.getEquip(tempEquipType);

			this.NumLb.visible = false;
			this.PlusImg.visible = false;
			this.NameLb.visible = false;
			this.godequipSuitTypeImg.visible = false;
			this.LvLb.visible = false;
			this.StarBox.visible = tempEquipInfo != null;
			this.RedDotImg.visible = PetDataMgr.isHaveEquipItemAction(tempEquipInfo, tempEquipType);
			if (tempEquipInfo != null)
			{
				Global.setResIconWithItemID(this.IconImg, CfgID.ResType.Item, tempEquipInfo.itemid);
				Global.setResQuWithItemID(this.bg, CfgID.ResType.Item, tempEquipInfo.itemid);
				this.StarBox.setStar(cfg.ItemCfgData.getStarNumById(tempEquipInfo.itemid));

				//特殊道具闪光特效
				this.checkAndSetItemEffect(tempEquipInfo.itemid);
			}
			else
			{
				this.removeItemEffect();
				Global.setResQuWithNum(this.bg, 0);
				this.IconImg.skin = "res/common/yingxiong_pic_" + tempEquipType + ".png";
			}
		}

		/**
		 * 显示伙伴穿戴符文状态
		 * @param temRuneIsUnLock 符文是否已经解锁
		 * @param tempRuneInfo 符文解锁配置信息
		 * @param tempEquipInfo 穿戴的符文数据
		 * @param tempEquipType 符文的子类型
		 */
		public setPetRuneInfo(petInfo: Net.hero, tempEquipType: number)
		{
			let EquipMgr = SuitEquipDataMgr.getSuitMgr(petInfo.sn);
			let tempEquipInfo = EquipMgr.getRune(tempEquipType);
			let tempRuneInfo = cfg.PetRunePosCfgData.getInfo(tempEquipType);
			let temRuneIsUnLock = petInfo.star >= tempRuneInfo.needStar && petInfo.level >= tempRuneInfo.needLevel;

			this.NumLb.visible = false;
			this.PlusImg.visible = false;
			this.StarBox.visible = false;
			this.godequipSuitTypeImg.visible = false;
			this.LvLb.visible = false;
			this.RedDotImg.visible = temRuneIsUnLock && PetDataMgr.isHaveEquipRuneAction(tempEquipInfo);

			if (!temRuneIsUnLock)
			{
				this.onClick(null, null);
			}

			let tempItem: Pb_God.PBItem = tempEquipInfo ? ItemDataMgr.getUsesPBItem(tempEquipInfo.itemsn as Long) : null;
			if (tempItem)
			{
				this.NameLb.text = cfg.ItemCfgData.getNameById(tempItem.itemid);
				Global.setResIconWithItemID(this.IconImg, CfgID.ResType.Item, tempItem.itemid);
				Global.setResQuWithItemID(this.bg, CfgID.ResType.Item, tempItem.itemid);

				//特殊道具闪光特效
				this.checkAndSetItemEffect(tempItem.itemid);
			}
			else
			{
				this.removeItemEffect();
				// Global.setResQuWithNum(this.bg,0);
				this.bg.skin = "res/common/propicon_100_09.png";
				this.IconImg.skin = "res/common/yingxiong_pic_5.png";
				// this.IconImg.y = 58;
				if (temRuneIsUnLock)
				{
					this.NameLb.text = "";
				}
				else
				{
					this.NameLb.text = tempRuneInfo.needStar > 0 ? Global.getLangStr("item_review_msg19", tempRuneInfo.needStar) : Global.getLangStr("item_review_msg20", tempRuneInfo.needLevel);
				}
			}
		}

		/**
		 * 显示伙伴穿戴天赋状态
		 */
		public setPetTalentInfo(petInfo: Net.hero, tempEquipType: number)
		{
			this.removeItemEffect();

			let EquipMgr = SuitEquipDataMgr.getSuitMgr(petInfo.sn);
			let tempEquipInfo = EquipMgr.getTalent(tempEquipType);
			let tempNeedStar = cfg.PetTalentPosCfgData.getNeedStarByPos(tempEquipType);
			let tempIsUnlock = petInfo.star >= tempNeedStar;

			this.NumLb.visible = false;
			this.StarBox.visible = false;
			this.IconImg.visible = tempEquipInfo != null;
			this.PlusImg.visible = tempEquipInfo == null;
			this.PlusImg.gray = !tempIsUnlock;
			this.godequipSuitTypeImg.visible = false;
			this.LvLb.visible = false;
			this.RedDotImg.visible = tempIsUnlock && PetDataMgr.isHaveSubPetTalentUpgradeAction(tempEquipInfo);
			if (!tempIsUnlock)
			{
				this.onClick(null, null);
			}

			if (tempEquipInfo != null)
			{
				this.NameLb.text = cfg.SkillNewTalentUpgradeCfgData.getNameBySkillIndex(tempEquipInfo.skillindex);
				Global.setResIconWithItemID(this.IconImg, CfgID.ResType.Talent, tempEquipInfo.skillindex);
				Global.setResQuWithNum(this.bg, cfg.SkillNewTalentUpgradeCfgData.getLevelBySkillIndex(tempEquipInfo.skillindex));
			}
			else
			{
				Global.setResQuWithNum(this.bg, 0);
				this.NameLb.text = !tempIsUnlock ? Global.getLangStr("item_review_msg19", tempNeedStar) : "";
			}
		}

		public setPetGodWeaponID(tempEquipType: number, itemInfo: Pb_God.PBItem, isClickOpenReview: boolean = false)
		{
			this.removeItemEffect();
			this.NumLb.visible = false;
			this.PlusImg.visible = false;
			this.NameLb.visible = false;
			this.StarBox.visible = itemInfo != null;
			this.godequipSuitTypeImg.visible = itemInfo != null;
			this.LvLb.visible = itemInfo != null;
			this.RedDotImg.visible = false;
			if (itemInfo != null)
			{
				Global.setResIconWithItemID(this.IconImg, CfgID.ResType.Item, itemInfo.itemid);
				Global.setResQuWithItemID(this.bg, CfgID.ResType.Item, itemInfo.itemid);
				this.StarBox.setStar(cfg.ItemCfgData.getStarNumById(itemInfo.itemid));

				this.godequipSuitTypeImg.frame = cfg.GodEquipSuitCfgData.getTypeBySuitID(parseInt(cfg.ItemCfgData.getUseParamById(itemInfo.itemid)));
				this.LvLb.text = Global.getLangStr("godQu_" + cfg.ItemCfgData.getQualityById(itemInfo.itemid));
				//特殊道具闪光特效
				this.checkAndSetItemEffect(itemInfo.itemid);

				if (isClickOpenReview)
				{
					this.onClick(this, () =>
					{
						UIManager.Inst.forceOpen(new ItemReviewOpenUIData(itemInfo));
					});
				}
			}
			else
			{
				this.checkAndSetItemEffect(0);
				Global.setResQuWithNum(this.bg, 0);
				this.IconImg.skin = `res/common/pic_godequip_0${ tempEquipType }.png`;
				if (isClickOpenReview) { this.onClick(null, null); }
			}
		}

		/**
		 * 显示伙伴穿戴神装状态
		 * @param tempEquipInfo 床带装备属性
		 * @param tempEquipType 装备的子类型
		 */
		public setPetGodWeaponInfo(petInfo: Net.hero, tempEquipType: number, showReddot: boolean = true)
		{
			this.removeItemEffect();

			let EquipMgr = SuitEquipDataMgr.getSuitMgr(petInfo.sn);
			let tempEquipInfo = EquipMgr.getGodEquip(tempEquipType);

			this.NumLb.visible = false;
			this.PlusImg.visible = false;
			this.NameLb.visible = false;
			this.StarBox.visible = tempEquipInfo != null;
			this.godequipSuitTypeImg.visible = tempEquipInfo != null;
			this.LvLb.visible = tempEquipInfo != null;
			this.RedDotImg.visible = showReddot && PetDataMgr.isHaveGodEquipItemAction(tempEquipInfo, tempEquipType);
			if (tempEquipInfo != null)
			{
				let tempItemInfo = ItemDataMgr.getUsesPBItem(tempEquipInfo.itemsn as Long);
				if (tempItemInfo)
				{
					Global.setResIconWithItemID(this.IconImg, CfgID.ResType.Item, tempItemInfo.itemid);
					Global.setResQuWithItemID(this.bg, CfgID.ResType.Item, tempItemInfo.itemid);
					this.StarBox.setStar(cfg.ItemCfgData.getStarNumById(tempItemInfo.itemid));

					this.LvLb.text = Global.getLangStr("godQu_" + cfg.ItemCfgData.getQualityById(tempItemInfo.itemid));

					this.godequipSuitTypeImg.frame = cfg.GodEquipSuitCfgData.getTypeBySuitID(parseInt(cfg.ItemCfgData.getUseParamById(tempItemInfo.itemid)));

					//特殊道具闪光特效
					this.checkAndSetItemEffect(tempItemInfo.itemid);
				}
			}
			else
			{
				this.checkAndSetItemEffect(0);
				Global.setResQuWithNum(this.bg, 0);

				this.IconImg.skin = `res/common/pic_godequip_0${ tempEquipType }.png`;
			}
		}

	}
}