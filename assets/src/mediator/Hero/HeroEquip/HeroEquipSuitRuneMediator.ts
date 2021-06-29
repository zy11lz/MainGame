
module Pro
{
	/**
	 * 穿符文装备
	 */
	export class HeroEquipSuitRuneMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Hero.HeroEquip.SuitRune.MainUI;

		/** UI打开参数 */
		UIOpenData: HeroEquipSuitOpenUIData;

		/** 选择的装备列表 */
		TmpEquipList: Array<Pb_God.PBItem>;

		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return null;
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Hero.HeroEquip.SuitRune.MainUI, 3, BaseAddLayer.TopUI, true);
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

			let tmpEquipMgr = SuitEquipDataMgr.getSuitMgr(this.UIOpenData.petSn);
			let tmpEquipInfo = tmpEquipMgr.getRune(this.UIOpenData.subType);
			//显示穿戴的装备
			let tmpInfo = tmpEquipInfo ? ItemDataMgr.getUsesPBItem(tmpEquipInfo.itemsn as Long) : null;
			if (tmpInfo == null)
			{
				this.UIPanel.ItemList.y = 360;
				this.UIPanel.ItemList.height = 670;
			}
			else
			{
				this.UIPanel.ItemList.y = 500;
				this.UIPanel.ItemList.height = 530;

				this.onEquipItemRendered(this.UIPanel.InEquipItem, tmpInfo, true);
			}
			this.UIPanel.InEquipItem.visible = tmpInfo != null;

			//显示符合条件的装备
			this.TmpEquipList = ItemDataMgr.getBagPerfectEquip(Pb_God._emBagType.BagType_Special, Pb_God._emItemType.ItemType_Rune);
			this.UIPanel.ItemList.onRefreshWithArray(this.TmpEquipList, this, (itemUI: ProUI.Hero.HeroEquip.SuitRune.ListEquipItemUI, index: number) =>
			{
				this.onEquipItemRendered(itemUI, this.UIPanel.ItemList.array[index], false);
			});
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}

		/** 刷新ListItem */
		onEquipItemRendered(itemUI: ProUI.Hero.HeroEquip.SuitRune.ListEquipItemUI, itemInfo: Pb_God.PBItem, isEquiped: boolean)
		{

			itemUI.EquipInfo.setItemInfo(itemInfo);

			//随机属性
			let tempAtterAry = itemInfo.randattr;
			itemUI.AtterBox.onRefresh(tempAtterAry.length, this, (itemEquipUI: ProUI.Hero.HeroEquip.Suit.AtterItemUI, index: number) =>
			{
				let tmpAtterID = tempAtterAry[index].type;
				let tmpAtterValue = Global.floor(tempAtterAry[index].value.toNumber() / 100);
				let tmpAtterRate = Global.floor(tempAtterAry[index].rate / 100);
				itemEquipUI.TypeImg.frame = tmpAtterID;
				itemEquipUI.TitleLb.text = cfg.BattleCfgData.getDescByAttrType(tmpAtterID) + ":";
				itemEquipUI.NumLb.text = tmpAtterValue > 0 ? tmpAtterValue.toString() : tmpAtterRate + "%";
				itemEquipUI.hbox.refresh();
			});

			//随机技能
			let tempSKillAry = itemInfo.skillinfo;
			itemUI.SkillBox.onRefresh(tempSKillAry.length, this, (itemSkillUI: component.UIButton, index: number) =>
			{
				let tempSkill = tempSKillAry[index];
				let tempSkillInfo = cfg.SkillNewSkillCfgData.getInfoByIdAndLevel(tempSkill.skillid, tempSkill.skilllevel);
				let tempNameLb = itemSkillUI.getChildAt(0) as component.UILabel;
				tempNameLb.text = tempSkillInfo.name;
				itemSkillUI.onClick(this, () =>
				{
					UIManager.Inst.forceOpen(new SkillReviewOpenUIData(0, tempSkillInfo.skillIndex));
				});
			});

			itemUI.FunBtn.onClick(this, () =>
			{
				this.closeUI();
				PetSend.runeEquip_Ask(this.UIOpenData.petSn, this.UIOpenData.subType, isEquiped ? null : itemInfo.itemsn);
			});
			itemUI.FunLb.text = isEquiped ? Global.getLangStr("item_review_msg3") : Global.getLangStr("item_review_msg8");
			itemUI.FunBtn.skin = !isEquiped ? "res/common/btn03_01.png" : "res/common/btn03_02.png"
			itemUI.FunLb.color = !isEquiped ? "#fffcf7" : "#eafdff";
			itemUI.FunLb.strokeColor = !isEquiped ? "#ac5f38" : "#468931";
		}

	}
}