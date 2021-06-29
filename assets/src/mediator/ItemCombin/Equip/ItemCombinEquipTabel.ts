
module Pro
{
	/**
	* 合成装备
	*/
	export class ItemCombinEquipTabel extends ProUI.ItemCombin.Equip.MainUI implements ITableView
	{

		/** 当前选择的装备索引 */
		ItemEquipIndex = -1;

		/** 当前选择的装备列表 */
		ItemCfgList: Array<cfg.ItemCfgInfo>;

		/** 当前选择的转杯类型 */
		ItemTypeID = -1;

		/** 装备类型数据 */
		ItemTabDataList = new Array<component.UITabData>();

		/** 装备类型 */
		ItemTypeList = [Pb_God._emEquipType.EquipType_Weapon, Pb_God._emEquipType.EquipType_Cloth, Pb_God._emEquipType.EquipType_Helmet, Pb_God._emEquipType.EquipType_Shoe];

		/** 当前道具选择的个数 */
		TmpSelectItemNum = 0;

		/** 当前选择道具的总个数 */
		TmpSelectItemMaxNum = 0;

		/** 个系统可一键合成的装备信息 */
		AutoCombinEquipDic = new ds.StringMap<Array<Pb_God.PBItem>>();

		/** 一键合成 */
		AutoCombinUI: ProUI.ItemCombin.Equip.AutoCombinUI;

		private tmpEffNode: EffNode;

		/** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{
			this.ItemList.content.addChild(this.ItemSelectImg);
			this.ItemTypeList.forEach(elment =>
			{
				this.ItemTabDataList.push(new component.UITabData("equip_SubType_" + elment, "", false));
			});
			this.tabGrp.onClick(this, this.onItemTabClick, this.ItemTabDataList, [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]);
			this.NumCutBtn.onClick(this, this.onNumCutClick);
			this.NumPlusBtn.onClick(this, this.onNumPlusClick);
			this.CombinBtn.onClick(this, this.onCombinClick);
			this.AutoCombinBtn.onClick(this, this.onAutoCombinClick);
			this.RecordBtn.onClick(this, () =>
			{
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_ItemCombinEquipRecord));
			});
		}

		//-------------------------------------------------------------------------------------------
		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		addEvent(): void
		{
			EventMgr.on(CmdEvent.Item_EquipCompound, this, this.onItem_EquipCompound);
			EventMgr.on(CmdEvent.Item_EquipAutoCompound, this, this.onItem_EquipCompound);
		}
		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		removeEvent(): void
		{
			EventMgr.off(CmdEvent.Item_EquipCompound, this, this.onItem_EquipCompound);
			EventMgr.off(CmdEvent.Item_EquipAutoCompound, this, this.onItem_EquipCompound);
		}

		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		show(): void
		{
			let tmpAutoCombinLv = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Game, Pb_God._emConstant_Game.C_Game_EquipCompoundNeedLevel);
			this.AutoCombinBtn.gray = PlayerDataMgr.level < tmpAutoCombinLv;
			this.refreshItemTabData();
			// this.tabGrp.setSelectTab(0);
		}

		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		hide(): void
		{
			this.closeAutoCombinUI();
			Laya.timer.clear(this, this.effComplateCall);
		}

		setData($data: any): void
		{

		}

		/** 页签组件销毁 */
		dispose(): void
		{

		}

		//----------------------------------合成----------------------------------------
		/** 合成成功返回 */
		onItem_EquipCompound()
		{

			//关闭一键合成确认界面
			this.closeAutoCombinUI();

			//特效
			let tmpEffPos = new Laya.Point(this.ArrowTipImg.x, this.ArrowTipImg.y);
			this.tmpEffNode = EffectMgr.Inst.createEffectOne("ui_equipCombin", tmpEffPos, null, 1, 1, this, true, ResReleaseType.Reference, true);
			Laya.timer.once(this.tmpEffNode.effAllTime, this, this.effComplateCall);
		}

		private effComplateCall(): void
		{
			//刷洗面板
			this.refreshItemTabData();
			this.refreshSelectEquip();
			this.ItemList.refresh();
			// this.tabGrp.refresh();
		}

		/** 合成 */
		onCombinClick()
		{
			let tmpSelectInfo = this.ItemCfgList[this.ItemEquipIndex];
			if (!tmpSelectInfo) { return; }
			let tmpNeedItem = cfg.ItemCompoundCfgData.getNeedItemAryById(tmpSelectInfo.compoundID);
			if (Global.getItemNum(tmpNeedItem.itemid) < tmpNeedItem.itemcount * this.TmpSelectItemNum || this.TmpSelectItemNum == 0)
			{
				TipsUtils.showTipsByLanId("hero_msg28");
				return;
			}
			let tmpNeedExpend = cfg.ItemCompoundCfgData.getNeedItemExpendAryById(tmpSelectInfo.compoundID);
			if (Global.getItemNum(tmpNeedExpend.itemid) < tmpNeedExpend.itemcount * this.TmpSelectItemNum)
			{
				TipsUtils.showTipsByLanId("bag_msg7", cfg.ItemCfgData.getNameById(tmpNeedExpend.itemid));
				return;
			}

			ItemSend.equipCompound(tmpSelectInfo.compoundID, this.TmpSelectItemNum);
		}

		/** 刷新合成按钮上的红点 */
		private refreshCombinReddot(): void
		{
			this.reddotCombinBtn.visible = false;
			let tmpSelectInfo = this.ItemCfgList[this.ItemEquipIndex];
			if (!tmpSelectInfo) { return; }
			let tmpNeedItem = cfg.ItemCompoundCfgData.getNeedItemAryById(tmpSelectInfo.compoundID);
			if (Global.getItemNum(tmpNeedItem.itemid) < tmpNeedItem.itemcount * this.TmpSelectItemNum || this.TmpSelectItemNum == 0)
			{
				return;
			}
			let tmpNeedExpend = cfg.ItemCompoundCfgData.getNeedItemExpendAryById(tmpSelectInfo.compoundID);
			if (Global.getItemNum(tmpNeedExpend.itemid) < tmpNeedExpend.itemcount * this.TmpSelectItemNum)
			{
				return;
			}
			this.reddotCombinBtn.visible = true;
		}

		//----------------------------------Tab-------------------------------------------
		/** itemTab 刷新 */
		refreshItemTabData()
		{
			this.AutoCombinEquipDic.clear();
			let defaultTabIndex = -1;
			for (let i = 0; i < this.ItemTypeList.length; i++)
			{
				let elment = this.ItemTypeList[i];
				let tempList = this.onCherkAutoCombinList(elment);
				this.AutoCombinEquipDic.put(elment, tempList);
				this.ItemTabDataList[i].RedDot = tempList.length > 0;
				if (defaultTabIndex == -1 && tempList.length > 0) { defaultTabIndex = i; }
			}
			if (defaultTabIndex == -1) { defaultTabIndex = this.tabGrp.tabIndex; }
			this.tabGrp.setSelectTab(defaultTabIndex);
		}

		/** itemTab 点击 */
		onItemTabClick(tab: component.UITab, index: number)
		{
			this.ItemTypeID = this.ItemTypeList[index];
			this.ItemEquipIndex = -1;
			this.refreshItemList(true);
		}

		//--------------------------------List--------------------------------------------------
		/** 刷新列表 */
		refreshItemList(autoSelect: boolean)
		{
			this.ItemCfgList = cfg.ItemCfgData.getInfoWithCompoundID(Pb_God._emItemType.ItemType_Equip, this.ItemTypeID);
			let seleCanCombin = false;
			this.ItemList.onRefresh(this.ItemCfgList.length, this, (itemUI: NorItemUI, index: number) =>
			{
				let tmpItemID = this.ItemCfgList[index].compoundID;
				itemUI.setItemID(tmpItemID, 0, false, false);
				itemUI.onClick(this, this.onItemEquipClick);
				//选中第一个，或者选中一个可合成的
				let fullNum = this.getFullCompundEquipNum(tmpItemID) > 0;
				if (autoSelect)
				{
					if (this.ItemEquipIndex == -1)
					{ this.setItemSelected(itemUI, false); }
					if ((!seleCanCombin && fullNum))
					{
						seleCanCombin = true;
						this.setItemSelected(itemUI, false);
					}
				}
				itemUI.RedDotImg.visible = this.ItemEquipIndex != index && fullNum;
			});
		}

		/** itemList点击 */
		onItemEquipClick(btn: NorItemUI)
		{
			this.setItemSelected(btn, true);
		}

		/** 点击item后设置 item的选中状态 */
		private setItemSelected(btn: NorItemUI, refreshList: boolean)
		{
			this.ItemEquipIndex = parseInt(btn.name);
			this.ItemSelectImg.x = btn.x;
			this.ItemSelectImg.y = btn.y;
			this.ItemSelectImg.parent.setChildIndex(this.ItemSelectImg, this.ItemSelectImg.parent.numChildren - 1);

			if (refreshList) { this.refreshItemList(false); }
			this.refreshSelectEquip();
		}

		//-----------------------------------------------------------------------------
		/** 是否可以合成 */
		getFullCompundEquipNum(compoundID: number): number
		{
			let tmpNeedItem = cfg.ItemCompoundCfgData.getNeedItemAryById(compoundID);
			let tmpNeedExpend = cfg.ItemCompoundCfgData.getNeedItemExpendAryById(compoundID);

			//查询玩家拥有的
			let tmpEquipItemNum = Global.getItemNum(tmpNeedItem.itemid);
			let tmpEquipNeedNum = tmpNeedItem.itemcount;

			//计算最多和最少合成件数
			let tmpEquipMaxNum = Math.floor(tmpEquipItemNum / tmpEquipNeedNum);
			let tmpExpendMaxNum = Math.floor(Global.getItemNum(tmpNeedExpend.itemid) / tmpNeedExpend.itemcount);
			return Math.min(tmpEquipMaxNum, tmpExpendMaxNum);
		}

		/** 合成显示刷新 */
		refreshSelectEquip()
		{
			//当前选择的合成目标
			let tmpSelectInfo = this.ItemCfgList[this.ItemEquipIndex];
			if (!tmpSelectInfo) { return; }

			//查询玩家拥有的
			let tmpNeedItemInfo = cfg.ItemCompoundCfgData.getNeedItemAryById(tmpSelectInfo.compoundID);
			let tmpNeedExpendInfo = cfg.ItemCompoundCfgData.getNeedItemExpendAryById(tmpSelectInfo.compoundID);
			let tmpEquipItemNum = Global.getItemNum(tmpNeedItemInfo.itemid);
			let tmpEquipNeedNum = tmpNeedItemInfo.itemcount;
			//判断金币数
			let tmpNeedExpend = cfg.ItemCompoundCfgData.getNeedItemExpendAryById(tmpSelectInfo.compoundID);
			let tmpNeedExpendNum = tmpNeedExpend.itemcount;
			let tmpExpendOwnNum = Global.getItemNum(tmpNeedExpend.itemid);

			//设置玩家最多可合成数
			this.TmpSelectItemMaxNum = Math.min(Math.floor(tmpEquipItemNum / tmpEquipNeedNum), Math.floor(tmpExpendOwnNum / tmpNeedExpendNum));
			this.TmpSelectItemNum = this.TmpSelectItemMaxNum > 0 ? this.TmpSelectItemMaxNum : 0;

			//显示合成需求
			this.OldItemInfo.setItemID(tmpNeedItemInfo.itemid, 0, false, false);
			// this.OldItemInfo.setBloodProgress(Math.min(tmpEquipItemNum / tmpEquipNeedNum, 1));
			this.OldItemInfo.BloodLb.text = tmpEquipItemNum + "/" + tmpEquipNeedNum;
			this.OldItemInfo.BloodLb.visible = true;
			this.OldItemInfo.BloodBgImg.visible = true;
			if(tmpEquipItemNum == 0)
			{
				// 这里设置为0 赋值bar的width有问题
				// this.OldItemInfo.setBloodProgress(0); 
				this.OldItemInfo.BloodImg.visible = false;
			} 
			else
			{
				this.OldItemInfo.BloodImg.visible = true
				let progress = (tmpEquipItemNum / tmpEquipNeedNum) > 1 ? 1 : tmpEquipItemNum / tmpEquipNeedNum;
				this.OldItemInfo.setBloodProgress(progress);
			}	
			
			Global.setResIconWithItemID(this.NumRewardImg, CfgID.ResType.Item, tmpNeedExpendInfo.itemid);

			//显示合成物品
			this.NewItemInfo.setItemID(tmpSelectInfo.compoundID, 0, false, false);

			//刷新物品件数
			this.refreshCombinNum();
			//刷新合成按钮红点
			this.refreshCombinReddot();
		}

		//-----------------------------------------------------------------------------
		/** 合成见数控制 */
		private refreshCombinNum()
		{

			//个数控制
			this.NumCutBtn.disabled = this.TmpSelectItemNum <= 1;
			this.NumPlusBtn.disabled = this.TmpSelectItemNum >= this.TmpSelectItemMaxNum;
			this.NumLb.text = this.TmpSelectItemNum.toString();

			//刷新消耗
			let tmpSelectInfo = this.ItemCfgList[this.ItemEquipIndex];
			if (!tmpSelectInfo) { return; }
			let tmpNeedExpend = cfg.ItemCompoundCfgData.getNeedItemExpendAryById(tmpSelectInfo.compoundID);
			this.NumRewardLb.text = (tmpNeedExpend.itemcount * Math.max(this.TmpSelectItemNum,1)).toString();
		}

		private onNumCutClick()
		{
			this.TmpSelectItemNum--;
			if (this.TmpSelectItemNum < 1)
			{
				this.TmpSelectItemNum = 1;
			}
			this.refreshCombinNum();
			//刷新合成按钮红点
			this.refreshCombinReddot();
		}

		private onNumPlusClick()
		{
			this.TmpSelectItemNum++;
			if (this.TmpSelectItemNum > this.TmpSelectItemMaxNum)
			{
				this.TmpSelectItemNum = this.TmpSelectItemMaxNum;
			}
			this.refreshCombinNum();
			//刷新合成按钮红点
			this.refreshCombinReddot();
		}

		//-------------------------------------自动合成------------------------------------------
		/** 检索当前类型可一键合成的装备数据 */
		private onCherkAutoCombinList(itemType: number): Array<Pb_God.PBItem>
		{

			//暂时记录本次消耗资源
			let tmpCombinCfgList = cfg.ItemCfgData.getInfoWithCompoundID(Pb_God._emItemType.ItemType_Equip, itemType);
			let tmpBaseExpendInfo = cfg.ItemCompoundCfgData.getNeedItemExpendAryById(tmpCombinCfgList[0].compoundID);
			let tmpBaseExpendNum = Global.getItemNum(tmpBaseExpendInfo.itemid);

			//计算最终合成
			let tmpNewItemDic = new ds.StringMap<number>();
			let tmpOldItemDic = new ds.StringMap<number>();
			let tmpItemCfgList = cfg.ItemCfgData.getInfoWithType(Pb_God._emItemType.ItemType_Equip, itemType);
			tmpItemCfgList.forEach(element =>
			{
				let tmpItemHave = Global.getItemNum(element.id);
				tmpOldItemDic.put(element.id, tmpItemHave);
				tmpNewItemDic.put(element.id, tmpItemHave);
			});
			tmpCombinCfgList.forEach(element =>
			{

				let tmpCombinID = element.compoundID;
				let tmpNeedItem = cfg.ItemCompoundCfgData.getNeedItemAryById(tmpCombinID);
				let tmpNeedExpend = cfg.ItemCompoundCfgData.getNeedItemExpendAryById(tmpCombinID);

				let tmpItemHave = tmpNewItemDic.get(tmpNeedItem.itemid);
				let tmpExpendMaxNum = Math.floor(tmpBaseExpendNum / tmpNeedExpend.itemcount);
				let tmpItemMaxNum = Math.floor(tmpItemHave / tmpNeedItem.itemcount);
				let tmpCombinNum = Math.min(tmpExpendMaxNum, tmpItemMaxNum);
				if (tmpCombinNum > 0)
				{

					tmpItemHave -= tmpCombinNum * tmpNeedItem.itemcount;
					tmpBaseExpendNum -= tmpCombinNum * tmpNeedExpend.itemcount;
					tmpNewItemDic.put(tmpNeedItem.itemid, tmpItemHave);

					let tmpCombinNewNum = tmpNewItemDic.get(tmpCombinID) + tmpCombinNum;
					tmpNewItemDic.put(tmpCombinID, tmpCombinNewNum);
				}
			});

			//显示新生成的
			let tmpNewItemList: Array<Pb_God.PBItem> = [];
			let tmpNewKeys = tmpNewItemDic.getKeys();
			tmpNewKeys.forEach(element =>
			{
				let tmpNewNum = tmpNewItemDic.get(element);
				let tmpOldNum = tmpOldItemDic.get(element) == null ? 0 : tmpOldItemDic.get(element);
				if (tmpNewNum > tmpOldNum)
				{
					let tmpItemInfo = new Pb_God.PBItem();
					tmpItemInfo.itemid = parseInt(element);
					tmpItemInfo.itemcount = tmpNewNum - tmpOldNum;
					tmpNewItemList.push(tmpItemInfo);
				}
			});

			//消耗值
			let tmpCostExpendNum = Global.getItemNum(tmpBaseExpendInfo.itemid) - tmpBaseExpendNum;
			tmpNewItemList["tmpCostExpendNum"] = tmpCostExpendNum;

			return tmpNewItemList;
		}

		/** 一键合成 */
		private onAutoCombinClick()
		{
			//功能限制
			let tmpAutoCombinLv = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Game, Pb_God._emConstant_Game.C_Game_EquipCompoundNeedLevel);
			if (PlayerDataMgr.level < tmpAutoCombinLv)
			{
				TipsUtils.showTipsByLanId("tips_msg31", tmpAutoCombinLv);
				return;
			}

			//是否可以合成
			let tmpNewItemList = this.AutoCombinEquipDic.get(this.ItemTypeID);
			let tmpCostExpendNum = tmpNewItemList["tmpCostExpendNum"];
			if (tmpNewItemList.length == 0)
			{
				TipsUtils.showTipsByLanId("tips_msg32");
				return;
			}

			//初始化升阶确认UI
			this.AutoCombinUI = new ProUI.ItemCombin.Equip.AutoCombinUI();
			LayerManager.Inst.topUILayer.addChild(this.AutoCombinUI);

			//弹出UI
			let tempCoverSp = PopUpManager.popUpUIAction(this.AutoCombinUI, 0);
			tempCoverSp.onClick(this, () =>
			{
				this.closeAutoCombinUI();
			});

			//确认选择
			this.AutoCombinUI.SureBtn.onClick(this, () =>
			{
				ItemSend.equipAutoCompound(this.ItemTypeID);
			});

			//取消选择
			this.AutoCombinUI.CancelBtn.onClick(this, () =>
			{
				this.closeAutoCombinUI();
			});

			//显示资源消耗
			this.AutoCombinUI.DesLb.text = Global.getLangStr("item_combin_msg1", tmpCostExpendNum);
			this.AutoCombinUI.RewardBox.onRefresh(tmpNewItemList.length, this, (itemUI: NorItemUI, index: number) =>
			{
				itemUI.setItemInfo(tmpNewItemList[index]);
			});
		}

		private closeAutoCombinUI()
		{
			if (this.AutoCombinUI != null)
			{
				PopUpManager.removeUIAction(this.AutoCombinUI, 0, true, true);
				this.AutoCombinUI = null;
			}
		}
	}
}