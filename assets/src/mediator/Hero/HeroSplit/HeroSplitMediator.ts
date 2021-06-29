
module Pro
{
	/**
	 * 英雄分解管理器
	 */
	export class HeroSplitMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Hero.HeroSplit.MainUI;


		/** 背包的英雄列表 */
		TmpMyHeroList: Array<Net.hero>;

		/** 当前选择的英雄类型索引 */
		TmpSelectHeroTypeIndex = -1;

		/** 当前选择的英雄个数 */
		TmpSelectHeroNum = 0;

		/** 当前选择的最大英雄个数 */
		TmpSelectHeroMaxNum = 10;

		/** 背包英雄碎片列表 */
		TmpMyHeroSpinList: Array<Pb_God.PBItem>;

		/** 当前选择的道具索引 */
		TmpSelectItemIndex = -1;

		/** 当前道具选择的个数 */
		TmpSelectItemNum = 0;

		/** 当前选择道具的总个数 */
		TmpSelectItemMaxNum = 0;

		/*** 是否需要重置当前选中页签 */
		NeedResetItemIndex: boolean = true;

		/** 上次选中的Tab下标 */
		LastSelectItemTabIndex: number;

		/** 上次选择的英雄类型下标 */
		LastSelectHeroTypeIndex: number;
		uiRoleSayComponent: UiRoleSayComponet;

		/*** 快速放入英雄数量的选项 */
		private readonly QUICK_NUMS = [10, 20, 50, Global.getLangStr("common_all")];
		/** 当前选择快速度入的英雄数量索引 */
		private _quickNumIndex = 3;

		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return [UrlMgr.getAtlas("herosplit")];
		}


		/** 需要自动释放的png|jgp资源列表 */
		public autoUnLoadOtherRes(): Array<string>
		{
			return ["res/herosplit/bg_yingxiongjitan.jpg"];
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Hero.HeroSplit.MainUI, 3);
		}

		/** 关闭UI*/
		closeUI(): void
		{
			this.closePanel(0);
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{
			this.UIPanel.ItemTab.onClick(this, this.onItemTabClick,
				[new component.UITabData("heroSplit_msg12"), new component.UITabData("heroSplit_msg13")],
				[new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]);

			this.UIPanel.NumLb.on(Laya.Event.BLUR, this, this.onNumBLURChanged);

			this.UIPanel.BtnClose.onClick(this, this.closeUI);
			this.UIPanel.ShopBtn.onClick(this, () =>
			{
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_Shop, Pb_God._emShopType.ShopType_Pet), BaseBackUIType.HideBackUI);
			});
			this.UIPanel.NumCutBtn.onClick(this, this.onNumCutClick);
			this.UIPanel.NumPlusBtn.onClick(this, this.onNumPlusClick);
			this.UIPanel.NumMaxBtn.onClick(this, this.onNumMaxBtn);
			this.UIPanel.QuickSelectBtn.onClick(this, this.onQuickSelectClick);
			this.UIPanel.SplitCherkBtn.onClick(this, () =>
			{
				this.onPetSplitClick(true);
			});
			this.UIPanel.HelpBtn.onClick(this, () =>
			{
				CommonHelpView.show(this.UIPanel.HelpBtn, Global.getLangStr("pet_split_help"));
			});
			this.UIPanel.btnAutoSplit.onClick(this, this.onClickChangeAutoSplit);
			this.UIPanel.btnComboboxMask.onClick(this, () => { this.UIPanel.comboBoxListView.visible = false; })
			this.UIPanel.comboBoxBtn.onClick(this, this.onClickComboboxBtn);
			this.uiRoleSayComponent = new UiRoleSayComponet(UiRoleSayType.JI_XIAN, this.UIPanel.txtSay, this.UIPanel.sayPaoPao, this.UIPanel.skRoleClick);
			this.adjustScreenPos();
		}

		private adjustScreenPos()
		{
			this.UIPanel.height = GameConfig.curHeight();
			this.UIPanel.y = 0;
		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		addEvent(): void
		{
			this.addEventMgr(EventNotify.Pet_Changed, this, this.onPetChanged);
			this.addEventMgr(EventNotify.Equip_Changed, this, this.onPetChanged);
			this.addEventMgr(EventNotify.Pet_State_Chg, this, this.onPetChanged);
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{
			this.uiRoleSayComponent.clearUiRoleSay();
			this.removeEventMgr(EventNotify.Pet_State_Chg, this, this.onPetChanged);
		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{
			this.NeedResetItemIndex = true;
			this.LastSelectItemTabIndex = 0;
			this.LastSelectHeroTypeIndex = -1;
			this.TmpMyHeroList = [];
			this.UIPanel.ItemTab.setSelectTab(0);
			this.refreshQuickHeroNum();

			this.UIPanel.imgAutoSplitNoSelect.visible = !CallDataMgr.isAutoSplitHero;
			this.UIPanel.imgAutoSplitSelect.visible = CallDataMgr.isAutoSplitHero;

			this.uiRoleSayComponent.uiRoleSay();
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}

		/** 点击切换英雄自动献祭的选择 */
		private onClickChangeAutoSplit(): void
		{
			let isAutoSplit = !CallDataMgr.isAutoSplitHero;
			this.UIPanel.imgAutoSplitNoSelect.visible = !isAutoSplit;
			this.UIPanel.imgAutoSplitSelect.visible = isAutoSplit;
			CallSend.autoSplit(isAutoSplit ? 1 : 0);
		}

		/** 点击下拉菜单 */
		private onClickComboboxBtn(): void
		{
			this.UIPanel.comboBoxListView.visible = true;
			this.UIPanel.comboBoxList.onRefresh(this.QUICK_NUMS.length, this, (btn: component.UIButton, index: number) =>
			{
				let str = typeof (this.QUICK_NUMS[index]) == 'string' ? Global.getLangStr("common_all") : this.QUICK_NUMS[index] + Global.getLangStr("common_num1");
				(btn.getChildByName("label") as component.UILabel).text = str
				btn.onClick(this, () =>
				{
					this._quickNumIndex = index;
					this.refreshQuickHeroNum();
					this.UIPanel.comboBoxListView.visible = false;
				})
			})
		}

		/** 刷新选中的快速放入的英雄数量 */
		private refreshQuickHeroNum(): void
		{
			let num = this.QUICK_NUMS[this._quickNumIndex];
			this.TmpSelectHeroMaxNum = typeof (num) == 'string' ? 999 : num;
			this.UIPanel.comboBoxBtnLable.text = typeof (num) == 'string' ? Global.getLangStr("common_all") : num + Global.getLangStr("common_num1");
			//判断当前选中的英雄数量是不是比选的大了, 超过了的话，就要去掉一些了
			if (this.TmpSelectHeroNum > this.TmpSelectHeroMaxNum)
			{
				this.TmpSelectHeroNum = 0;
				for (let i = 0; i < this.TmpMyHeroList.length; i++)
				{
					let hero = this.TmpMyHeroList[i];
					if (hero.isSelected)
					{
						if (this.TmpSelectHeroNum >= this.TmpSelectHeroMaxNum)
						{
							hero.isSelected = false;
							this.UIPanel.ItemList.setItem(i, hero); //刷新一下当前这一个即可
						}
						else
						{
							this.TmpSelectHeroNum++;
						}
					}
				}
				this.UIPanel.txtHeroSelect.text = this.TmpSelectHeroNum + "/" + this.TmpMyHeroList.length;
			}
			//快速放入的红点
			// this.checkQuickSelectReddot();
		}

		/** 伙伴和碎片变化 */
		onPetChanged()
		{
			Laya.timer.callLater(this, () =>
			{
				this.NeedResetItemIndex = false;
				this.UIPanel.ItemTab.activeCurrentTab();
			});
		}

		//------------------------------Tab---------------------------------
		/** 页签选择 */
		private onItemTabClick(tab: component.UITab, index: number)
		{
			this.UIPanel.boxHeroPage.visible = index == 0;
			this.UIPanel.boxSpinPage.visible = index == 1;
			if (index == 0)
			{
				this.UIPanel.SplitLb.text = Global.getLangStr("heroSplit_msg1");//献祭";
			}
			else
			{
				this.UIPanel.SplitLb.text = Global.getLangStr("heroSplit_msg13");//碎片献祭";
			}
			if (this.LastSelectItemTabIndex != index)
			{ this.NeedResetItemIndex = true; }// 重置列表
			this.LastSelectItemTabIndex = index;
			this.refreshHeroType();
		}

		/** 判断是否有15个<=3星的英雄 */
		// private checkQuickSelectReddot(): void
		// {
		// 	if (!this.UIPanel.QuickSelectBtn.visible) return;
		// 	if (this.TmpSelectHeroNum >= this.TmpSelectHeroMaxNum)
		// 	{
		// 		this.UIPanel.reddotQuickSelect.visible = false;
		// 		return;
		// 	}
		// 	let num = 0;
		// 	for (let i = 0; i < this.TmpMyHeroList.length; i++)
		// 	{
		// 		let tmpInfo = this.TmpMyHeroList[i];
		// 		if (tmpInfo.onStore || tmpInfo.isSelected || tmpInfo.islock || tmpInfo.star > 3)
		// 		{
		// 			continue;
		// 		}
		// 		num++;
		// 		if (num >= this.TmpSelectHeroMaxNum)
		// 		{
		// 			break;
		// 		}
		// 	}

		// 	this.UIPanel.reddotQuickSelect.visible = num >= this.TmpSelectHeroMaxNum;
		// }

		//---------------------------英雄类型------------------------------
		/** 刷新英雄类型 */
		private refreshHeroType()
		{
			if (this.NeedResetItemIndex)
			{ this.TmpSelectHeroTypeIndex = -1; }
			let startTypeIndex = 0;
			let heroTypeNum = 1 + Pb_God._emPetType.PetType_Moon;
			this.UIPanel.HeroTypeBox.onRefresh(heroTypeNum, this, (itemUI: component.UIButton, index: number) =>
			{
				Global.setResPetType(itemUI, startTypeIndex + index);
				itemUI.onClick(this, this.onHeroTypeClick);

				if (this.TmpSelectHeroTypeIndex == -1 ||
					this.LastSelectHeroTypeIndex == index)
				{
					this.onHeroTypeClick(itemUI);
				}
			});
		}

		/** 选择一个英雄类型 */
		private onHeroTypeClick(btn: component.UIButton)
		{

			this.UIPanel.HeroTypeSelectImg.x = btn.x;
			this.UIPanel.HeroTypeSelectImg.y = btn.y;
			this.TmpSelectHeroTypeIndex = parseInt(btn.name);
			this.TmpSelectHeroNum = 0;

			PetDataMgr.resetHeroSelect();
			if (this.UIPanel.ItemTab.tabIndex == 0)
			{
				this.refreshPetSplit();
			}
			else
			{
				this.refreshPetItemSplit();
			}
			this.LastSelectHeroTypeIndex = this.TmpSelectHeroTypeIndex;
		}

		//---------------------------英雄分解------------------------------
		private refreshPetSplit()
		{
			this.TmpMyHeroList = PetDataMgr.getPetList(this.TmpSelectHeroTypeIndex);
			this.TmpMyHeroList = this.TmpMyHeroList.filter(elment => !(elment.isDefend || elment.isFight));

			//把上阵状态重置一次
			for (var hero of this.TmpMyHeroList)
			{
				PetDataMgr.refreshPetOnStore(hero);

			}
			this.TmpMyHeroList.sort(function (a: Net.hero, b: Net.hero): number
			{
				if (a.onStore && !b.onStore) { return 1; }
				else if (!a.onStore && b.onStore) { return -1; }
				else if (!a.isDefend && b.isDefend) { return -1; }
				else if (a.isDefend && !b.isDefend) { return 1; }
				else if (a.islock && !b.islock) { return 1; }
				else if (!a.islock && b.islock) { return -1; }
				else if (a.star != b.star) { return a.star - b.star; }
				else if (a.level != b.level) { return a.level - b.level; }
				else { return b.id - a.id; }
			});

			this.UIPanel.ItemList.onRefreshWithArray(this.TmpMyHeroList, this, (itemUI: NorItemUI, index: number) =>
			{
				let tmpInfo = this.TmpMyHeroList[index];
				itemUI.setPetInfo(tmpInfo);
				let lock = tmpInfo.onStore || tmpInfo.islock || tmpInfo.isDefend;
				itemUI.setLockImgVisible(lock, tmpInfo);
				itemUI.IconImg.gray = lock;
				itemUI.SelectStatueImg.visible = tmpInfo.isSelected;
				itemUI.onClick(this, this.onPetChoiceClick);
			});
			this.UIPanel.txtHeroSelect.text = 0 + "/" + this.TmpMyHeroList.length;
			this.UIPanel.SplitBtn.onClick(this, () =>
			{
				this.onPetSplitClick(false);
			});
			//快速放入的红点
			// this.checkQuickSelectReddot();
		}

		private onPetChoiceClick(btn: NorItemUI)
		{
			let tmpInfo = this.TmpMyHeroList[parseInt(btn.name)];
			if (tmpInfo == null)
			{
				return;
			}

			//援军时，需要先解除才能分解
			if (tmpInfo.isDefend)
			{
				AlertShow.showConfirmAlert(Global.getLangStr("HeroDefendMsg8"), this, () =>
				{
					Pro.DefendSend.removePet(tmpInfo.sn);
				})
				return;
			}




			let func = () =>
			{
				if (tmpInfo.islock)
				{
					TipsUtils.showTipsByLanId("heroSplit_msg2");
					return;
				}

				if (!tmpInfo.isSelected && this.TmpSelectHeroNum >= this.TmpSelectHeroMaxNum)
				{
					TipsUtils.showTipsByLanId("heroSplit_msg10", this.TmpSelectHeroMaxNum);
					return;
				}

				tmpInfo.isSelected = !tmpInfo.isSelected;
				btn.SelectStatueImg.visible = tmpInfo.isSelected;

				this.TmpSelectHeroNum += tmpInfo.isSelected ? 1 : -1;
				this.UIPanel.txtHeroSelect.text = this.TmpSelectHeroNum + "/" + this.TmpMyHeroList.length;

				//快速放入的红点
				// this.checkQuickSelectReddot();
				btn.IconImg.gray = false;
				btn.setLockImgVisible(false);
			}
			if (PetDataMgr.checkPetOnStore(tmpInfo, true, func))
			{
				return;
			}

		}

		private onQuickSelectClick()
		{

			let fastIntoThe = () =>
			{
				if (this.TmpSelectHeroNum >= this.TmpSelectHeroMaxNum)
				{
					TipsUtils.showTipsByLanId("heroSplit_msg10", this.TmpSelectHeroMaxNum);
					return;
				}

				//每个阵营跳过前8个计数
				let skipqQuantity = [0, 0, 0, 0, 0];
				for (let i = 0; i < 3; i++)
				{
					this._selectElves(skipqQuantity, i + 1)
				}

				if (this.TmpSelectHeroNum <= 0)
				{
					TipsUtils.showTipsByLanId("heroSplit_msg17");
				} else
				{
					TipsUtils.showTipsByLanId("heroSplit_msg21", this.TmpSelectHeroNum);
				}
				this.UIPanel.txtHeroSelect.text = this.TmpSelectHeroNum + "/" + this.TmpMyHeroList.length;
				this.UIPanel.ItemList.refresh();
				//快速放入的红点
				// this.checkQuickSelectReddot();
			}

			let alertDes = Global.getLangStr("heroSplit_msg19");
			AlertShow.showConfirmAlert(alertDes, this, () =>
			{
				fastIntoThe();

			})
		}

		/**从低星到高星依次选择精灵，最后每个阵营留下8只3星，不够8只有多少留多少 */
		private _selectElves(skipqQuantity, star)
		{
			for (let i = 0; i < this.TmpMyHeroList.length; i++)
			{
				let tmpInfo = this.TmpMyHeroList[i];

				if (tmpInfo.onStore || tmpInfo.isDefend || tmpInfo.isSelected || tmpInfo.islock || tmpInfo.star > star)
				{
					continue;
				}
				if (star >= 3)
				{
					switch (cfg.PetCfgData.getPetTypeByPetID(tmpInfo.id))
					{
						case 1:
							skipqQuantity[0] += 1;
						case 2:
							skipqQuantity[1] += 1;
						case 3:
							skipqQuantity[2] += 1;
						case 4:
							skipqQuantity[3] += 1;
						case 5:
							skipqQuantity[4] += 1;
					}
					if (skipqQuantity[cfg.PetCfgData.getPetTypeByPetID(tmpInfo.id) - 1] <= 8)
					{
						continue;
					}
				}

				if (this.TmpSelectHeroNum >= this.TmpSelectHeroMaxNum)
				{
					break;
				}
				else
				{
					tmpInfo.isSelected = true;
					this.TmpSelectHeroNum += tmpInfo.isSelected ? 1 : -1;
				}

			}
		}

		private onPetSplitClick(isCherk: boolean)
		{
			let tmpPetList = new Array<Net.hero>();
			this.TmpMyHeroList.forEach(elment =>
			{
				if (elment.isSelected)
				{
					tmpPetList.push(elment);
				}
			});
			if (tmpPetList.length == 0)
			{
				TipsUtils.showTipsByLanId("heroSplit_msg15");
				return;
			}
			UIManager.Inst.forceOpen(new HeroSplitInfoOpenUIData(tmpPetList, null, null, isCherk));
		}

		//---------------------------碎片分解------------------------------
		private choicePetSpinWithHeroType(heroType: number)
		{

			if (this.TmpMyHeroSpinList == null)
			{
				this.TmpMyHeroSpinList = [];
			}
			else
			{
				this.TmpMyHeroSpinList.splice(0, this.TmpMyHeroSpinList.length);
			}

			let tmpAry = ItemDataMgr.getBagAryWithBagType(Pb_God._emBagType.BagType_PetPiece);
			tmpAry.forEach(elment =>
			{

				let tmpSubType = cfg.ItemCfgData.getSubTypeById(elment.itemid) as Pb_God._emItemPetType;
				let tmpCombinId = cfg.ItemCfgData.getCompoundIDById(elment.itemid);
				let tmpHeroType = 0;

				//合成指定伙伴
				if (tmpSubType == Pb_God._emItemPetType.ItemPetType_PetID)
				{
					tmpHeroType = cfg.PetCfgData.getPetTypeByPetID(tmpCombinId);
				}//合成指定种族
				else if (tmpSubType == Pb_God._emItemPetType.ItemPetType_PetType)
				{
					tmpHeroType = tmpCombinId;
				}//合成随机任意星级
				else if (tmpSubType == Pb_God._emItemPetType.ItemPetType_Rand)
				{

				}

				if (tmpHeroType == heroType || heroType == 0)
				{
					this.TmpMyHeroSpinList.push(elment);
				}
			});

		}

		private refreshPetItemSplit()
		{

			this.choicePetSpinWithHeroType(this.TmpSelectHeroTypeIndex);
			this.UIPanel.ItemList.onRefreshWithArray(this.TmpMyHeroSpinList, this, (itemUI: NorItemUI, index: number) =>
			{
				itemUI.setItemInfo(this.TmpMyHeroSpinList[index], false, true, false, false, true);
				itemUI.onClick(this, this.onPetSpinItemClick);
				itemUI.RedDotImg.visible = false;
				itemUI.SelectStatueImg.visible = index == this.TmpSelectItemIndex;
				itemUI.IconImg.gray = false;
			});
			this.UIPanel.SplitBtn.onClick(this, this.onPetItemSplitClick);

			this.TmpSelectItemIndex = -1;
			this.TmpSelectItemNum = 0;
			this.TmpSelectItemMaxNum = 0;
			this.refreshPetItemChoice();
		}

		private onPetSpinItemClick(btn: component.UIButton)
		{
			let tmpIndex = parseInt(btn.name);
			if (this.TmpSelectItemIndex == tmpIndex)
			{
				this.TmpSelectItemIndex = -1;
				this.TmpSelectItemNum = 0;
				this.TmpSelectItemMaxNum = 0;
				this.refreshPetItemChoice();
			}
			else
			{
				this.TmpSelectItemIndex = tmpIndex;
				this.TmpSelectItemNum = 1;
				var info: Pb_God.PBItem = this.TmpMyHeroSpinList[this.TmpSelectItemIndex];
				if (info)
				{
					this.TmpSelectItemMaxNum = info.itemcount ? info.itemcount : 0;
				} else
				{
					//此处有个后台日志记录itemcount为undefined的BUG，但没有排查到问题碎片
					//做了一个特殊处理，如果数据异常就弹提示并无法选中碎片,数据正常则按之前的逻辑运行
					TipsUtils.showTips(Global.getLangStr("FragmentData"));
					this.TmpSelectItemIndex = -1;
					this.TmpSelectItemNum = 0;
				}
				this.refreshPetItemChoice();
			}
			this.UIPanel.ItemList.refresh();
		}

		private onPetItemSplitClick()
		{
			if (this.TmpSelectItemIndex == -1)
			{
				TipsUtils.showTipsByLanId("heroSplit_msg16");
				return;
			}
			UIManager.Inst.forceOpen(new HeroSplitInfoOpenUIData(null, this.TmpMyHeroSpinList[this.TmpSelectItemIndex], this.TmpSelectItemNum, false));
		}

		//--------------------------碎片数量控制----------------------------
		private refreshPetItemChoice()
		{
			this.UIPanel.NumCutBtn.disabled = this.TmpSelectItemNum == 0;
			this.UIPanel.NumPlusBtn.disabled = this.TmpSelectItemNum >= this.TmpSelectItemMaxNum;
			this.UIPanel.NumMaxBtn.disabled = this.TmpSelectItemNum == this.TmpSelectItemMaxNum;
			this.UIPanel.NumLb.text = this.TmpSelectItemNum.toString();
		}

		private onNumBLURChanged()
		{
			this.TmpSelectItemNum = parseInt(this.UIPanel.NumLb.text);
			if (this.TmpSelectItemNum < 0)
			{
				this.TmpSelectItemNum = 0;
			}
			if (this.TmpSelectItemNum > this.TmpSelectItemMaxNum)
			{
				this.TmpSelectItemNum = this.TmpSelectItemMaxNum;
			}
			this.refreshPetItemChoice();
		}

		private onNumCutClick()
		{
			this.TmpSelectItemNum--;
			if (this.TmpSelectItemNum < 0)
			{
				this.TmpSelectItemNum = 0;
			}
			this.refreshPetItemChoice();
		}

		private onNumPlusClick()
		{
			this.TmpSelectItemNum++;
			if (this.TmpSelectItemNum > this.TmpSelectItemMaxNum)
			{
				this.TmpSelectItemNum = this.TmpSelectItemMaxNum;
			}
			this.refreshPetItemChoice();
		}

		private onNumMaxBtn()
		{
			this.TmpSelectItemNum = this.TmpSelectItemMaxNum;
			this.refreshPetItemChoice();
		}

	}
}