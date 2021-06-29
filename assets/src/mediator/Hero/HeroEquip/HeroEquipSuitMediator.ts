
module Pro
{
	/**
	 * 穿装备
	 */
	export class HeroEquipSuitMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Hero.HeroEquip.Suit.MainUI;

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
			this.showPanel(ProUI.Hero.HeroEquip.Suit.MainUI, 3, BaseAddLayer.TopUI, true);
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
			let tmpEquipInfo = tmpEquipMgr.getEquip(this.UIOpenData.subType);
			this.UIPanel.title.innerHTML = Global.getLangStr("ui_HeroEquip_msg1");
			if (tmpEquipInfo == null)
			{
				this.UIPanel.ItemList.y = 348;
				this.UIPanel.ItemList.height = 675;
			}
			else
			{
				this.UIPanel.ItemList.y = 480;
				this.UIPanel.ItemList.height = 540;

				//显示穿戴的装备
				let tmpInfo = new Pb_God.PBItem();
				tmpInfo.itemid = tmpEquipInfo.itemid;
				this.onEquipItemRendered(this.UIPanel.InEquipItem, tmpInfo, true);
			}
			this.UIPanel.InEquipItem.visible = tmpEquipInfo != null;

			//显示符合条件的装备
			this.TmpEquipList = ItemDataMgr.getBagPerfectEquip(Pb_God._emBagType.BagType_Equip, Pb_God._emItemType.ItemType_Equip, this.UIOpenData.subType);
			this.UIPanel.ItemList.onRefreshWithArray(this.TmpEquipList, this, (itemUI: ProUI.Hero.HeroEquip.Suit.ListEquipItemUI, index: number) =>
			{
				this.onEquipItemRendered(itemUI, this.UIPanel.ItemList.array[index], false);
			});
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}

		/** 刷新ListItem */
		onEquipItemRendered(itemUI: ProUI.Hero.HeroEquip.Suit.ListEquipItemUI, itemInfo: Pb_God.PBItem, isEquiped: boolean)
		{

			itemUI.EquipInfo.setItemInfo(itemInfo);

			itemUI.EquipNameLb.text = cfg.ItemCfgData.getNameById(itemInfo.itemid);
			itemUI.EquipLvLb.text =  `Lv.${cfg.ItemCfgData.getLevelById(itemInfo.itemid)}`; //Global.getLangStr("common_level2", );  //等级
			itemUI.EquipScoreLb.text = cfg.ItemCfgData.getAddScoreById(itemInfo.itemid) + ""; //Global.getLangStr("hero_msg50", 1316);  //评分

			let tempAtterAry = cfg.ItemCfgData.getAddAttrAryById(itemInfo.itemid);
			let tempAtterNum = tempAtterAry.length;
			if (tempAtterNum > 1)
			{
				tempAtterNum = 1;
			}
			itemUI.AtterBox.onRefresh(tempAtterNum, this, (itemUI: ProUI.Hero.HeroEquip.Suit.AtterItemUI, index: number) =>
			{
				let tmpAtterID = tempAtterAry[index].type;
				let tmpAtterValue = tempAtterAry[index].value;
				itemUI.TypeImg.frame = tmpAtterID;
				itemUI.TitleLb.text = cfg.BattleCfgData.getDescByAttrType(tmpAtterID);
				itemUI.NumLb.text = tmpAtterValue.toString();
				itemUI.hbox.refresh();
			});

			itemUI.FunBtn.onClick(this, () =>
			{
				this.closeUI();
				PetSend.equip_Ask(this.UIOpenData.petSn, this.UIOpenData.subType, isEquiped ? 0 : itemInfo.itemid);
			});
			itemUI.FunLb.text = isEquiped ? Global.getLangStr("item_review_msg3") : Global.getLangStr("item_review_msg8");
			itemUI.FunBtn.skin = !isEquiped ? "res/common/btn03_01.png" : "res/common/btn03_02.png"
			itemUI.FunLb.color = !isEquiped ? "#fffcf7" : "#eafdff";
			itemUI.FunLb.strokeColor = !isEquiped ? "#ac5f38" : "#468931";
		}

	}
}