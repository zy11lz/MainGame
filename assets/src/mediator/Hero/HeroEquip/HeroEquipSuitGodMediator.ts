
module Pro
{
	/**
	 * 穿神级装备
	 */
	export class HeroEquipSuitGodMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Hero.HeroEquip.SuitGod.MainUI;

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
			this.showPanel(ProUI.Hero.HeroEquip.SuitGod.MainUI, 3, BaseAddLayer.TopUI, true);
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
			//显示符合条件的装备
			this.TmpEquipList = ItemDataMgr.getBagPerfectEquip(Pb_God._emBagType.BagType_GodEquip, Pb_God._emItemType.ItemType_GodEquip, this.UIOpenData.subType);

			if (this.UIOpenData.petSn)
			{
				let tmpEquipMgr = SuitEquipDataMgr.getSuitMgr(this.UIOpenData.petSn);
				let tmpEquipInfo = tmpEquipMgr.getGodEquip(this.UIOpenData.subType);
				this.initCurEquip(tmpEquipInfo)
			} else if (this.UIOpenData.godEquipSuitMgrId)
			{
				let equipInfo: Pb_God.PBPosEquip = null;
				let suitMgrInfo = SuitEquipDataMgr.getGodEquipSuitInfoById(this.UIOpenData.godEquipSuitMgrId);
				for (let equipPosInfo of suitMgrInfo.posequip)
				{
					if (equipPosInfo.pos == this.UIOpenData.subType)
					{
						equipInfo = equipPosInfo;
						break;
					}
				}
				this.initCurEquip(equipInfo);
				//神装套装管理上面，还需要排除在其它套装方案上的
				let itemList: Pb_God.PBItem[] = [];
				for (let item of this.TmpEquipList)
				{
					if (!SuitEquipDataMgr.checkGodEquipUseProject(item.itemsn)) itemList.push(item);
				}
				this.TmpEquipList = itemList;
			}


			this.UIPanel.ItemList.onRefreshWithArray(this.TmpEquipList, this, (itemUI: ProUI.Hero.HeroEquip.SuitGod.ListEquipItemUI, index: number) =>
			{
				this.onEquipItemRendered(itemUI, this.UIPanel.ItemList.array[index], false);
			});
		}

		/** 设置当前正操作的神装显示 */
		private initCurEquip(equipInfo: Pb_God.PBPlayerPetGodEquip | Pb_God.PBPosEquip): void
		{
			//显示穿戴的装备
			let tmpInfo = equipInfo ? (ItemDataMgr.getUsesPBItem(equipInfo.itemsn) || ItemDataMgr.getBagPBItem(equipInfo.itemsn)) : null;
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
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}

		/** 刷新ListItem */
		onEquipItemRendered(itemUI: ProUI.Hero.HeroEquip.SuitGod.ListEquipItemUI, itemInfo: Pb_God.PBItem, isEquiped: boolean)
		{

			itemUI.EquipInfo.setItemInfo(itemInfo);

			itemUI.EquipNameLb.text = cfg.ItemCfgData.getNameById(itemInfo.itemid);

			itemUI.FunBtn.onClick(this, () =>
			{
				this.closeUI();
				if (this.UIOpenData.petSn)
				{
					PetSend.godEquip_Ask(this.UIOpenData.petSn, this.UIOpenData.subType, isEquiped ? null : itemInfo.itemsn);
				}
				else if (this.UIOpenData.godEquipSuitMgrId)
				{
					PetSend.godSuit_EquipAsk(this.UIOpenData.godEquipSuitMgrId, this.UIOpenData.subType, isEquiped ? null : itemInfo.itemsn);
				}
			});
			itemUI.FunLb.text = isEquiped ? Global.getLangStr("item_review_msg3") : Global.getLangStr("item_review_msg8");
			itemUI.FunBtn.skin = !isEquiped ? "res/common/btn03_01.png" : "res/common/btn03_02.png"
			itemUI.FunLb.color = !isEquiped ? "#fffcf7" : "#eafdff";
			itemUI.FunLb.strokeColor = !isEquiped ? "#ac5f38" : "#468931";

			//基础属性
			let tempAtterAry = cfg.ItemCfgData.getAddAttrAryById(itemInfo.itemid);
			let tmpAttrStrAry: string[] = [];
			for (const el of tempAtterAry)
			{
				tmpAttrStrAry.push(Global.getFullAttrValueString(el, ": "));
			}
			itemUI.txtValueBase.text = tmpAttrStrAry.join("    ");

			//随机属性
			let tmpRandAttrAry = itemInfo.randattr;
			tmpAttrStrAry = [];
			for (const el of tmpRandAttrAry)
			{
				tmpAttrStrAry.push(cfg.BattleCfgData.getDescByAttrType(el.type) + ": " +
					Global.getAttrValueStringSub(el.type, Global.longToNumber(el.value) / 100, el.rate, 1, 1));
			}
			itemUI.txtValueRand.text = tmpAttrStrAry.length > 0 ? tmpAttrStrAry.join("    ") : Global.getLangStr("common_none");
		}

	}
}