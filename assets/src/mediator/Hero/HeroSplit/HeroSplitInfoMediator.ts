
module Pro
{
	/**
	 * 碎片合成信息
	 */
	export class HeroSplitInfoMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Hero.HeroSplit.SplitInfo.MainUI;

		/** UI打开参数 */
		UIOpenData: HeroSplitInfoOpenUIData;

		/** 本次有高级英雄被分解 */
		HaveHighPetSplited: boolean = false;

		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return null;
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Hero.HeroSplit.SplitInfo.MainUI, 1, BaseAddLayer.TopUI, true);
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
			this.UIPanel.btnClose.onClick(this, this.closeUI);
			this.UIPanel.CancelBtn.onClick(this, this.closeUI);
			this.UIPanel.SureBtn.onClick(this, this.closeUI);
			this.UIPanel.SureSplitBtn.onClick(this, this.onSureSplitClick);
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{

		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{
			this.UIPanel.bgbox.height = this.UIOpenData.isCherk ? 364 : 489;
			this.UIPanel.DesLb.visible = !this.UIOpenData.isCherk;
			this.UIPanel.SureSplitBtn.visible = !this.UIOpenData.isCherk;
			this.UIPanel.CancelBtn.visible = !this.UIOpenData.isCherk;
			this.UIPanel.SureBtn.visible = this.UIOpenData.isCherk;

			//分解奖励
			let tmpRewardDic = new Laya.Dictionary();
			this.HaveHighPetSplited = false;

			//分解英雄
			if (this.UIOpenData.splitPetList != null)
			{
				this.UIOpenData.splitPetList.forEach(elment =>
				{
					let tmpSplitItemList = cfg.ItemPetSplitCfgData.getAddItemAryById(elment.star);
					tmpSplitItemList.forEach(tmpItem =>
					{
						this.__addItemToDict(tmpRewardDic, tmpItem.itemid, tmpItem.itemcount);
						// let tmpvalue = tmpRewardDic.get(tmpItem.itemid);
						// if (tmpvalue == null) {
						// 	tmpvalue = new Pb_God.PBItem();
						// 	tmpvalue.itemid = tmpItem.itemid;
						// 	tmpRewardDic.set(tmpItem.itemid, tmpvalue);
						// }
						// tmpvalue.itemcount += tmpItem.itemcount;
					});

					for (let i = 1; i <= elment.star; i++)
					{
						let tmpNeedItemAry = cfg.PetUpStarCfgData.getInfoWithFun(elment.id, i);
						if (tmpNeedItemAry)
						{
							cfg.PetUpStarCfgData.getNeedItemAryById(tmpNeedItemAry.id).forEach(tmpItem =>
							{
								this.__addItemToDict(tmpRewardDic, tmpItem.itemid, tmpItem.itemcount);
							});
						}
					}
					for (let i = 1; i <= elment.advance; i++)
					{
						let tmpNeedItemAry = cfg.PetAdvanceCfgData.getNeedItemAryById(i);
						tmpNeedItemAry.forEach(tmpItem =>
						{
							this.__addItemToDict(tmpRewardDic, tmpItem.itemid, tmpItem.itemcount);
						});
					}
					let tmpUpLvItemList = cfg.PetUpgradeCfgData.getNeedItemAryByLv(elment.level);
					tmpUpLvItemList.forEach(tmpItem =>
					{
						this.__addItemToDict(tmpRewardDic, tmpItem.itemid, tmpItem.itemcount);
					});
					let tmpSuitMgr = SuitEquipDataMgr.getSuitMgr(elment.sn);
					tmpSuitMgr.getEquipList().forEach(tmpItem =>
					{
						this.__addItemToDict(tmpRewardDic, tmpItem.itemid, 1);
					});
					tmpSuitMgr.getRuneList().forEach(tmpItem =>
					{
						let tmpvalue = ItemDataMgr.getUsesPBItem(tmpItem.itemsn as Long);
						tmpRewardDic.set(tmpvalue.itemid, tmpvalue);
					});
					tmpSuitMgr.getGodList().forEach(tmpItem =>
					{
						let tmpvalue = ItemDataMgr.getUsesPBItem(tmpItem.itemsn as Long);
						tmpRewardDic.set(tmpvalue.itemid, tmpvalue);
					});
					// 宝石精华
					let talent: Pb_God.PBPlayerPetTalent[] = SuitEquipDataMgr.getSuitMgr(elment.sn).getTalentList();
					talent.forEach(tmpItem =>
					{
						let tempInfo = cfg.SkillNewTalentUpgradeCfgData.getInfo(tmpItem.skillindex);
						let arrItemArr: Array<cfg.AddItemInfo> = cfg.SkillNewTalentUpgradeCfgData.getDelAddItemAryById(tempInfo.skillIndex);
						this.__addItemToDict(tmpRewardDic, arrItemArr[0].itemid, arrItemArr[0].itemcount);
					});
					if (elment.star >= 5)
					{
						this.HaveHighPetSplited = true;
					}

					//进化石
					if(elment.evolve>0){
						let evoluSplitItemList:cfg.PetEvolveCfgInfo[] = cfg.PetEvolveCfgData.getInfoWithIdArr(elment.id);
						evoluSplitItemList.forEach(tmpItem =>
							{
								if(tmpItem.evolve<=elment.evolve){
									let arrItemArr=tmpItem.needItem.split("_");
									this.__addItemToDict(tmpRewardDic, Number(arrItemArr[0]), Number(arrItemArr[1]));
								}
								
							});
					}
					// 魂器
					if(elment.horcrux.level > 0)
					{
						// 魂器 材料
						for (var lv = 1; lv <= elment.horcrux.level; lv++)
						{
							let horcruxProp: cfg.HorcruxPropCfgInfo =  cfg.HorcruxPropCfgData.getHorcruxInfoByIdAndLv(elment.horcrux.id,lv);
							if(!horcruxProp) continue;
							let needItems = cfg.AddItemInfo.parse(horcruxProp.materials);
							needItems.forEach(tmpItem =>
							{
								this.__addItemToDict(tmpRewardDic, tmpItem.itemid, tmpItem.itemcount);
							});
						}
					}
				});

				this.UIPanel.DesLb.showText = Global.getLangStr("heroSplit_des_1");
				this.UIPanel.TitleLb.text = Global.getLangStr("heroSplit_msg12");//英雄献祭";

			}//分解碎片
			else
			{
				let tmpItemStar = cfg.ItemCfgData.getStarNumById(this.UIOpenData.splitItemInfo.itemid);
				let tmpItemList = cfg.ItemPetSplitCfgData.getPieceAddItemAryById(tmpItemStar);
				let tmpNeedCount = cfg.ItemPetcountCompoundCfgData.getNeedItemCountByPetStar(tmpItemStar);
				tmpItemList.forEach(tmpItem =>
				{
					this.__addItemToDict(tmpRewardDic, tmpItem.itemid, tmpItem.itemcount * this.UIOpenData.splitItemCount);
				});

				this.HaveHighPetSplited = this.UIOpenData.splitItemInfo.itemcount >= tmpNeedCount;
				this.UIPanel.TitleLb.text = Global.getLangStr("heroSplit_msg13");//碎片献祭";
				this.UIPanel.DesLb.showText = Global.getLangStr("heroSplit_des_2",
					this.UIOpenData.splitItemCount,
					Global.getResQuColor(cfg.ItemCfgData.getQualityById(this.UIOpenData.splitItemInfo.itemid)),
					cfg.ItemCfgData.getNameById(this.UIOpenData.splitItemInfo.itemid));
			}

			//刷新奖励显示
			let dicKeys = tmpRewardDic.keys;
			this.UIPanel.RewardBox.onRefresh(dicKeys.length, this, (itemUI: NorItemUI, index: number) =>
			{
				let tmpItemID = dicKeys[index];
				let tmpItemInfo = tmpRewardDic.get(tmpItemID);
				itemUI.setItemInfo(tmpItemInfo);
			});
		}

		private __addItemToDict(dict: Laya.Dictionary, itemId: number, itemcount: number): void
		{
			let tmpvalue = dict.get(itemId);
			if (tmpvalue == null)
			{
				tmpvalue = new Pb_God.PBItem();
				tmpvalue.itemid = itemId;
				dict.set(itemId, tmpvalue);
			}
			tmpvalue.itemcount += itemcount;
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}

		/** 确定分解 */
		onSureSplitClick()
		{
			if (!this.HaveHighPetSplited)
			{
				this.onSplitRightNow();
				return;
			}

			//分解英雄
			if (this.UIOpenData.splitPetList != null)
			{
				AlertShow.showConfirmAlert(Global.getLangStr("hero_msg54"), this, this.onSplitRightNow, "common_confirm", "common_cancel", 3);
			}//分解碎片
			else
			{
				AlertShow.showConfirmAlert(Global.getLangStr("hero_msg55"), this, this.onSplitRightNow, "common_confirm", "common_cancel", 3);
			}
		}

		/** 立即分解 */
		onSplitRightNow()
		{

			this.closeUI();

			//分解英雄
			if (this.UIOpenData.splitPetList != null)
			{

				let tmpAry = [];
				this.UIOpenData.splitPetList.forEach(elment =>
				{
					tmpAry.push(elment.sn);
				});
				PetSend.split_Ask(tmpAry);

			}//分解碎片
			else
			{
				let tmpOneItem = new Pb_God.PBItemSnCount();
				tmpOneItem.itemsn = this.UIOpenData.splitItemInfo.itemsn;
				tmpOneItem.itemcount = this.UIOpenData.splitItemCount;
				ItemSend.split([tmpOneItem]);
			}
		}
	}
}