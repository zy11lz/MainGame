
module Pro
{
	/**
	 * 英雄合成界面状态显示
	 */
	export class HeroUpStarLayer extends ProUI.Hero.HeroDetail.UpStar.UpStarLayerUI
	{

		private MainRoleSn: Long;
		private MainPetId: number;
		private MainPetStar: number;
		private MainPetType: number;

		private NeedMainPetCount: number;
		private NeedStarCountAry: cfg.ValueThreeInfo[];
		private NeedStarPetAry: cfg.ValueTwoInfo[];
		private NeedAnyStarPetAry: cfg.ValueTwoInfo[];
		private NeedItemAry: cfg.AddItemInfo[];

		private UpStarChoiceHeros: Array<Long[]> = [];
		/** 当前选择的升星材料道具列表 */
		private MaterialItems: Array<Long[]> = [];
		/** 升星材料放置的位置 */
		private MaterialItemMapIndex = new ds.StringMap<number>();
		/** 弹出卸下精灵提示框*/
		public discharge: boolean = true;

		constructor()
		{
			super();

			// this.GotoBtn.onClick(this, () => {
			// 	TaskUtils.gotoPanel(PanelNotify.Open_HeroCombin);
			// });

			this.UpStarBtn.onClick(this, () =>
			{
				this.sureCombin();
			});

			this.on(Laya.Event.DISPLAY, this, () =>
			{
				this.controllEvents(false);
			});

			this.btnAuto.onClick(this, () =>
			{
				this.autoFlag.visible = !this.autoFlag.visible;
				this.init(this.MainRoleSn, this.MainPetId, this.MainPetStar, true);
			})
		}
		//---------------------------------------Event------------------------------------
		/** 控制消息监听器 */
		private controllEvents(isOff: boolean = true)
		{
			Global.EventsNotifyControl(this.listensEvents(), isOff);
			if (!isOff)
			{
				this.on(Laya.Event.UNDISPLAY, this, this.controllEvents);
			}
		}
		/** 本类监听消息列表 */
		private listensEvents(): Array<any>
		{
			return [
				EventNotify.Pet_Materia_Selected, this, this.onHeroSelected
			];
		}

		public init(mainRoleSn: Long, petID: number, petStar: number, clear: boolean)
		{

			this.MainRoleSn = mainRoleSn;
			this.MainPetId = petID;
			this.MainPetStar = petStar;
			this.MainPetType = cfg.PetCfgData.getPetTypeByPetID(petID);
			if (clear)
			{
				this.UpStarChoiceHeros.splice(0, this.UpStarChoiceHeros.length);
				this.MaterialItems = [];
				this.MaterialItemMapIndex.clear();

				PetDataMgr.resetHeroSelect();
			} else
			{
				this.refreshSelectHeros();
			}

			let currentUpStarInfo = cfg.PetUpStarCfgData.getInfoWithFun(this.MainPetId, this.MainPetStar);

			this.NeedMainPetCount = this.MainRoleSn == null ? 1 : 0;
			this.NeedStarCountAry = cfg.PetUpStarCfgData.getNeedStarCountAryById(currentUpStarInfo.id);
			this.NeedStarPetAry = cfg.PetUpStarCfgData.getNeedStarPetAryById(currentUpStarInfo.id);
			this.NeedAnyStarPetAry = cfg.PetUpStarCfgData.getNeedAnyStarPetAryById(currentUpStarInfo.id);
			this.NeedItemAry = cfg.PetUpStarCfgData.getNeedItemAryById(currentUpStarInfo.id);

			this.UpStarLb.text = Global.getLangStr(mainRoleSn != null ? "hero_msg46" : "hero_msg47");  //升星 or 合成
			this.UpStarLb.visible = this.NeedItemAry.length == 0;
			this.UpStarNeedItemBox.visible = this.NeedItemAry.length > 0;
			this.CostItemBox.visible = this.UpStarNeedItemBox.visible;

			this.refresh(clear);
		}

		/**
		 * 开启自动放入
		 */
		public setAutoVisible(visible: boolean)
		{
			this.btnAuto.visible = visible;
		}

		private refresh(autoChoice: boolean)
		{

			let tmpMaxNum = this.NeedMainPetCount + this.NeedStarCountAry.length + this.NeedStarPetAry.length + this.NeedAnyStarPetAry.length;
			let startIndex = this.NeedMainPetCount > 0 ? 0 : 1;
			let isFullAllRes = true;
			for (let i = 0; i < 5 - startIndex; i++)
			{
				let tempCherkIndex = i + startIndex;
				let tempUI = this.getChildAt(tempCherkIndex) as NorItemUI;
				if (tempUI == null)
				{
					continue;
				}
				tempUI.visible = i < tmpMaxNum;
				if (!tempUI.visible) continue;
				if (i < this.NeedMainPetCount)
				{
					if (autoChoice) this.autoChoiceUpStarChoicePet(this.MainPetId, this.MainPetStar - 1, tempCherkIndex, 1, true);
					let tmpChoiceNum = this.getUpStarChoiceNum(tempCherkIndex);
					let firstSelectHeroSn = this.getUpStarChoicePet(tempCherkIndex)[0];
					let skinId = (firstSelectHeroSn && PetDataMgr.getPetInfo(firstSelectHeroSn)) ? PetDataMgr.getPetInfo(firstSelectHeroSn).useskinid : cfg.PetCfgData.getBaseSkinByPetID(this.MainPetId);
					tempUI.setNeedStarCountPetCfgInfo(skinId, this.MainPetStar - 1, 1, tmpChoiceNum, false);
					tempUI.onClick(this, () =>
					{
						let tempAry = this.getUnSelectPetIDList(this.MainPetId, this.MainPetStar - 1, tempCherkIndex, true, true);
						this.onChoiceStarPetClick(tempAry.reverse(), [], 1, tempCherkIndex);  //数组倒过来，与被吞食的不同，主英雄还是以高级别的放前面。
					});
					var isUnder = tmpChoiceNum < 1;
					tempUI.IconImg.gray = isUnder;
					if (isUnder) isFullAllRes = false;
					tempUI.RedDotImg.visible = tmpChoiceNum < 1 && this.getUnSelectPetIDList(this.MainPetId, this.MainPetStar - 1, tempCherkIndex, false, false).length >= 1;
				}
				else if (i < this.NeedMainPetCount + this.NeedStarCountAry.length)
				{
					let tempInfo = this.NeedStarCountAry[i - this.NeedMainPetCount];
					if (autoChoice) this.autoChoiceUpStarChoicePet(tempInfo.value1, tempInfo.value2, tempCherkIndex, tempInfo.value3, false);
					let tmpChoiceNum = this.getUpStarChoiceNum(tempCherkIndex);
					let firstSelectHeroSn = this.getUpStarChoicePet(tempCherkIndex)[0];
					let skinId = (firstSelectHeroSn && PetDataMgr.getPetInfo(firstSelectHeroSn)) ? PetDataMgr.getPetInfo(firstSelectHeroSn).useskinid : cfg.PetCfgData.getBaseSkinByPetID(tempInfo.value1);
					tempUI.setNeedStarCountPetCfgInfo(skinId, tempInfo.value2, tempInfo.value3, tmpChoiceNum, false);
					tempUI.onClick(this, () =>
					{
						let tempAry = this.getUnSelectPetIDList(tempInfo.value1, tempInfo.value2, tempCherkIndex, true, true);
						let itemAry = this.getUnSelectStarItemList(tempInfo.value2, tempCherkIndex, true, false, true);
						this.onChoiceStarPetClick(tempAry, itemAry, tempInfo.value3, tempCherkIndex);
					});
					var isUnder = tmpChoiceNum < tempInfo.value3;
					tempUI.IconImg.gray = isUnder;
					if (isUnder) isFullAllRes = false;
					tempUI.RedDotImg.visible = tmpChoiceNum < tempInfo.value3 &&
						this.getUnSelectPetIDList(tempInfo.value1, tempInfo.value2, tempCherkIndex, false, false).length + this.getUnSelectStarItemList(tempInfo.value2, tempCherkIndex, true, true, false).length >= tempInfo.value3;
				}
				else if (i < this.NeedMainPetCount + this.NeedStarCountAry.length + this.NeedStarPetAry.length)
				{
					let tmpChoiceNum = this.getUpStarChoiceNum(tempCherkIndex);
					let tempInfo = this.NeedStarPetAry[i - this.NeedMainPetCount - this.NeedStarCountAry.length];

					tempUI.setNeedStarPetCfgInfo(this.MainPetType, tempInfo.value1, tempInfo.value2, tmpChoiceNum, false);
					let tempAry = this.getUnSelectPetStarList(tempInfo.value1, tempCherkIndex, true, true, true);
					let itemAry = this.getUnSelectStarItemList(tempInfo.value1, tempCherkIndex, false, true, true);
					tempUI.onClick(this, () =>
					{
						this.onChoiceStarPetClick(tempAry, itemAry, tempInfo.value2, tempCherkIndex);
					});

					if (autoChoice && this.autoFlag.visible && this.MainPetStar <= 5)
						Laya.timer.frameOnce(i, this, this.autoSelectLowStarHero, [tempAry, itemAry, tempInfo.value2, tempCherkIndex], false);
					var isUnder = tmpChoiceNum < tempInfo.value2;
					tempUI.IconImg.gray = isUnder;
					if (isUnder) isFullAllRes = false;
					tempUI.RedDotImg.visible = isUnder &&
						this.getUnSelectPetStarList(tempInfo.value1, tempCherkIndex, true, false, false).length + this.getUnSelectStarItemList(tempInfo.value1, tempCherkIndex, false, true, false).length >= tempInfo.value2;
				}
				else if (i < this.NeedMainPetCount + this.NeedStarCountAry.length + this.NeedStarPetAry.length + this.NeedAnyStarPetAry.length)
				{
					let tmpChoiceNum = this.getUpStarChoiceNum(tempCherkIndex);
					let tempInfo = this.NeedAnyStarPetAry[i - this.NeedMainPetCount - this.NeedStarCountAry.length - this.NeedStarPetAry.length];
					tempUI.setNeedStarPetCfgInfo(0, tempInfo.value1, tempInfo.value2, tmpChoiceNum, false);
					tempUI.onClick(this, () =>
					{
						let tempAry = this.getUnSelectPetStarList(tempInfo.value1, tempCherkIndex, false, true, true);
						let itemAry = this.getUnSelectStarItemList(tempInfo.value1, tempCherkIndex, false, false, true);
						this.onChoiceStarPetClick(tempAry, itemAry, tempInfo.value2, tempCherkIndex);
					});
					var isUnder = tmpChoiceNum < tempInfo.value2;
					tempUI.IconImg.gray = isUnder;
					if (isUnder) isFullAllRes = false;
					tempUI.RedDotImg.visible = isUnder &&
						this.getUnSelectPetStarList(tempInfo.value1, tempCherkIndex, false, false, false).length + this.getUnSelectStarItemList(tempInfo.value1, tempCherkIndex, false, false, false).length >= tempInfo.value2;
				}
				tempUI.NameLb.visible = true;
				tempUI.NameLb.color = "#5b545b";
				tempUI.NameLb.fontSize = 20;
				tempUI.NameLb.scaleX = tempUI.scaleX < 1 ? 1.33 : tempUI.scaleX;
				tempUI.NameLb.scaleY = tempUI.scaleY < 1 ? 1.33 : tempUI.scaleY;
				// tempUI.NameLb.y = tempUI.scaleY < 1 ? tempUI.NameLb.y + 1 : tempUI.NameLb.y;
				// TODO 上面写法会造成每次刷新，NameLb会往下移，暂时没想到好办法，先临时写死
				if (tempUI.scaleY < 1)
					tempUI.NameLb.bottom = -28;
				else
					tempUI.NameLb.bottom = -20;
			}
			(this.getChildAt(0) as NorItemUI).visible = startIndex == 0;

			this.imgUpStarReddot.visible = isFullAllRes && Global.isFullAllRes(this.NeedItemAry, false);

			this.CostItemBox.onRefresh(this.NeedItemAry.length, this, (itemUI: ProUI.Hero.HeroDetail.UpAdvance.CostItemUI, index: number) =>
			{
				Global.setResIconWithItemID(itemUI.IconImg, CfgID.ResType.Item, this.NeedItemAry[index].itemid);
				Global.setResNumWithItemInfo(itemUI.NumLb, this.NeedItemAry[index].itemid, this.NeedItemAry[index].itemcount, true, true, "#fff6e8", "#e60000");
				Global.setResIconWithItemID(this.UpStarIconImg, CfgID.ResType.Item, this.NeedItemAry[index].itemid);
				this.UpStarNeedLb.text = this.NeedItemAry[index].itemcount + Global.getLangStr("hero_msg46");
				this.UpStarNeedItemBox.refresh();
			});
		}

		public sureCombin()
		{

			let tmpChoiceAllSn = [];
			let choiceItemAllSn = [];
			let tmpChoiceMainSn = null;
			let tmpStartIndex = this.NeedMainPetCount > 0 ? 0 : 1;

			for (let i = 0; i < 5; i++)
			{
				let tmpCherkIndex = i + tmpStartIndex;
				let tmpChoiceSnAry = this.UpStarChoiceHeros[tmpCherkIndex];
				let tmpChoiceNum = this.getUpStarChoiceNum(tmpCherkIndex);
				let items = this.MaterialItems[tmpCherkIndex];
				if (items)
				{
					for (let itemsn of items)
					{
						let itemData = new Pb_God.PBItemSnCount();
						itemData.itemsn = itemsn;
						itemData.itemcount = 1;
						choiceItemAllSn.push(itemData);
					}
				}

				if (i < this.NeedMainPetCount)
				{
					if (tmpChoiceNum < 1)
					{
						TipsUtils.showTipsByLanId("hero_msg9");
						return;
					}
					tmpChoiceMainSn = tmpChoiceSnAry[0];
				}
				else if (i < this.NeedMainPetCount + this.NeedStarCountAry.length)
				{
					let tempInfo = this.NeedStarCountAry[i - this.NeedMainPetCount];
					if (tmpChoiceNum < tempInfo.value3)
					{
						TipsUtils.showTipsByLanId("hero_msg9");
						return;
					}
					tmpChoiceAllSn = tmpChoiceAllSn.concat(tmpChoiceSnAry);
				}
				else if (i < this.NeedMainPetCount + this.NeedStarCountAry.length + this.NeedStarPetAry.length)
				{
					let tempInfo = this.NeedStarPetAry[i - this.NeedMainPetCount - this.NeedStarCountAry.length];
					if (tmpChoiceNum < tempInfo.value2)
					{
						TipsUtils.showTipsByLanId("hero_msg9");
						return;
					}
					tmpChoiceAllSn = tmpChoiceAllSn.concat(tmpChoiceSnAry);
				}
				else if (i < this.NeedMainPetCount + this.NeedStarCountAry.length + this.NeedStarPetAry.length + this.NeedAnyStarPetAry.length)
				{
					let tempInfo = this.NeedAnyStarPetAry[i - this.NeedMainPetCount - this.NeedStarCountAry.length - this.NeedStarPetAry.length];
					if (tmpChoiceNum < tempInfo.value2)
					{
						TipsUtils.showTipsByLanId("hero_msg9");
						return;
					}
					tmpChoiceAllSn = tmpChoiceAllSn.concat(tmpChoiceSnAry);
				}
				else
				{
					if (!Global.isFullAllRes(this.NeedItemAry, false))
					{
						TipsUtils.showTipsByLanId("hero_msg9");
						return;
					}
				}
			}

			if (tmpChoiceAllSn)
			{
				for (let i = 0; i < tmpChoiceAllSn.length; i++)
				{
					if (tmpChoiceAllSn.indexOf(tmpChoiceAllSn[i], i + 1) >= 0)
					{
						TipsUtils.showTipsByLanId("hero_msg63");
						return;
					}
				}
			}

			//需要处理共鸣相关的
			if (ResonanceDataMgr.checkIsInLevelGrid(Pb_God._emResonanceType.Resonance_Type_Star, tmpChoiceMainSn != null ? tmpChoiceMainSn : this.MainRoleSn))
			{
				TipsUtils.showTipsByLanId("resonance_msg15");
				return;
			}

			PetSend.upStar_Ask(tmpChoiceMainSn != null ? tmpChoiceMainSn : this.MainRoleSn, tmpChoiceAllSn, choiceItemAllSn);

		}

		//------------------------------------选择用于消耗的英雄------------------------------------


		/** 获取未被选择的指定英雄星级的道具列表 */
		private getUnSelectStarItemList(star: number, index: number, isAssign: boolean, isSamePetType: boolean, containSelect: boolean): Pb_God.PBItem[]
		{
			let itemPetType = isAssign ? Pb_God._emItemPetType.ItemPetType_MaterialSpecific : Pb_God._emItemPetType.ItemPetType_MaterialAny
			let itemList = ItemDataMgr.getBagListByItemType(Pb_God._emBagType.BagType_Item, Pb_God._emItemType.ItemType_Pet, itemPetType);
			let ret: Pb_God.PBItem[] = [];
			//过滤选择的与指定英雄类型的
			for (let item of itemList)
			{
				if (star != cfg.ItemCfgData.getStarNumById(item.itemid)) continue;
				if (isSamePetType)
				{
					let petType = cfg.ItemCfgData.getCompoundIDById(item.itemid);
					if (petType != 0 && petType != this.MainPetType)
						continue;
				}
				//需要排除在其它位置已经选了的
				let posIndex = this.MaterialItemMapIndex.get(item.itemsn + "");
				if (posIndex != null)
				{
					if (posIndex != index) continue;
					if (!containSelect) continue;
				}
				ret.push(item);
			}
			return ret;
		}


		/** 获取未被选择的指定英雄列表 */
		private getUnSelectPetIDList(petId: number, petStar: number, index: number, containSelect: boolean, containLock: boolean): Array<Net.hero>
		{
			let tempPetList = PetDataMgr.getPetList();
			let tempSelectAry = this.getUpStarChoicePet(index);
			if (containSelect)
			{
				tempPetList = tempPetList.filter(elment => elment.sn != this.MainRoleSn && (containLock || !(elment.islock || elment.onStore || elment.isDefend)) &&
					elment.id == petId && elment.star == petStar &&
					(!elment.isSelected || tempSelectAry.indexOf(elment.sn) >= 0));
			}
			else
			{
				tempPetList = tempPetList.filter(elment => elment.sn != this.MainRoleSn && (containLock || !(elment.islock || elment.onStore || elment.isDefend)) &&
					elment.id == petId && elment.star == petStar &&
					!elment.isSelected && tempSelectAry.indexOf(elment.sn) == -1);
			}
			this.sortPetList(tempPetList);
			return tempPetList;
		}
		/** 获取未被选择的指定英雄星级列表 */
		private getUnSelectPetStarList(petStar: number, index: number, isSamePetType: boolean, containSelect: boolean, containLock: boolean): Array<Net.hero>
		{
			let tempPetList = PetDataMgr.getPetList();
			let tempSelectAry = this.getUpStarChoicePet(index);
			if (containSelect)
			{
				tempPetList = tempPetList.filter(elment => elment.sn != this.MainRoleSn &&
					elment.star == petStar && (containLock || !(elment.islock || elment.onStore || elment.isDefend)) &&
					((isSamePetType && cfg.PetCfgData.getPetTypeByPetID(elment.id) == this.MainPetType) || !isSamePetType) &&
					(!elment.isSelected || tempSelectAry.indexOf(elment.sn) >= 0));
			} else
			{
				tempPetList = tempPetList.filter(elment => elment.sn != this.MainRoleSn &&
					elment.star == petStar && (containLock || !(elment.islock || elment.onStore || elment.isDefend)) &&
					((isSamePetType && cfg.PetCfgData.getPetTypeByPetID(elment.id) == this.MainPetType) || !isSamePetType) &&
					!elment.isSelected && tempSelectAry.indexOf(elment.sn) == -1);
			}
			this.sortPetList(tempPetList);
			return tempPetList;
		}

		private sortPetList(petlist: Net.hero[]): void
		{
			petlist.sort(function (a: Net.hero, b: Net.hero): number
			{
				if (a.isSelected != b.isSelected) { return b.isSelected ? 1 : -1; }
				if (a.onStore != b.onStore) { return a.onStore ? 1 : -1; }
				if (a.isDefend != b.isDefend) { return a.isDefend ? 1 : -1; }
				if (a.islock != b.islock) { return a.islock ? 1 : -1; }
				if (a.evolve != b.evolve) { return a.evolve - b.evolve }
				if (a.star != b.star) { return a.star - b.star; }
				if (a.level != b.level) { return a.level - b.level; }
				else return b.id - a.id;
			});
		}

		/** 自动选择指定的英雄到已选列表中 */
		private autoChoiceUpStarChoicePet(petId: number, petStar: number, index: number, choiceNum: number, priorityLow: boolean): void
		{
			let tmpPetList = this.getUnSelectPetIDList(petId, petStar, index, false, false);
			let choiceHeros = this.UpStarChoiceHeros[index];
			if (!choiceHeros) choiceHeros = this.UpStarChoiceHeros[index] = new Array<Long>();
			else choiceHeros.splice(0, choiceHeros.length);
			if (priorityLow) tmpPetList = tmpPetList.reverse();
			for (var pet of tmpPetList)
			{
				if (choiceNum >= 1)
				{
					choiceNum--;
					pet.isSelected = true;
					choiceHeros.push(pet.sn);
				} else
				{
					break;
				}
			}
		}

		/** 获取当前需要的英雄和替代材料道具已经选择的个数 */
		private getUpStarChoiceNum(index: number): number
		{
			let petCount = 0;
			if (this.UpStarChoiceHeros[index] != null)
			{
				petCount = this.UpStarChoiceHeros[index].length;
			}
			let itemCount = 0;
			if (this.MaterialItems[index] != null)
			{
				itemCount = this.MaterialItems[index].length;
			}

			return petCount + itemCount;
		}

		/** 获取当前需要的英雄已经选择的记录 */
		private getUpStarChoicePet(index: number): Array<Long>
		{
			if (this.UpStarChoiceHeros[index] != null)
			{
				return this.UpStarChoiceHeros[index];
			}
			let tempAry = [];
			this.UpStarChoiceHeros[index] = tempAry;
			return tempAry;
		}
		/** 获取当前需要的英雄替换道具已经选择的记录 */
		private getUpStarChoiceItems(index: number): Array<Long>
		{
			if (this.MaterialItems[index] != null)
			{
				return this.MaterialItems[index];
			}
			let ret = [];
			this.MaterialItems[index] = ret;
			return ret;
		}

		/** 刷新已经选择的道具列表状态 */
		private refreshSelectItems(): void
		{
			this.MaterialItemMapIndex.clear();
			for (let i = 0; i <= 5; i++)
			{
				let items = this.MaterialItems[i];
				if (!items) continue;
				for (let sn of items)
				{
					this.MaterialItemMapIndex.put(sn + "", i);
				}
			}
		}

		/** 刷新已选择的英雄选择状态 */
		private refreshSelectHeros(): void
		{
			PetDataMgr.resetHeroSelect();
			for (let i = 0; i <= 5; i++)
			{
				let heros = this.UpStarChoiceHeros[i];
				if (!heros) continue;
				for (let sn of heros)
				{
					let hero = PetDataMgr.getPetInfo(sn);
					if (hero) hero.isSelected = true;
				}
			}

		}

		//-------------------------------------选择指定英雄UI------------------------------------------
		/** 选择指定英雄 */
		private onChoiceStarPetClick(tempAry: Array<Net.hero>, materialItems: Pb_God.PBItem[], needNum: number, index: number)
		{

			//获取上次选择
			let tempSelectAry = [].concat(this.getUpStarChoicePet(index));
			let tempSelectItemAry = [].concat(this.getUpStarChoiceItems(index));
			//是否需要显示一键选择按钮
			let isShowAutoSel = this.MainPetStar <= 5;
			let customParams = [tempAry, tempSelectAry, materialItems, tempSelectItemAry, needNum, isShowAutoSel, this.discharge];

			UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroMaterialSelect, customParams, index));

		}

		private autoSelectLowStarHero(tempAry: Array<Net.hero>, materialItems: Pb_God.PBItem[], needNum: number, index: number)
		{
			let needCount = needNum;
			//先看看材料道具
			let selectItems: Long[] = [];
			for (let item of materialItems)
			{
				selectItems.push(item.itemsn);
			}
			needCount -= selectItems.length;
			//再过一遍英雄列表，顺便重置一下状态
			let selectHeros: Long[] = [];
			for (let hero of tempAry)
			{
				if (needCount > 0)
				{
					needCount--;
					selectHeros.push(hero.sn);
					hero.isSelected = true;
				} else
				{
					hero.isSelected = false;
				}
			}

			this.onHeroSelected(selectHeros, selectItems, index)
		}

		/** 英雄材料选择完成回调 */
		private onHeroSelected(selectHeros: Long[], selectItems: Long[], index: number): void
		{
			this.UpStarChoiceHeros[index] = selectHeros;
			this.MaterialItems[index] = selectItems;
			this.refreshSelectItems();
			this.refreshSelectHeros();
			this.refresh(false);
		}

	}
}