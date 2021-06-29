module Pro
{
	/**
	* 
	* 模块：商城
	*
	* @author jason.xu
	* 
	*/
	export class ShopMediator extends BaseMediator implements IMediator
	{
		/** 主分页按钮对应的商城类型 */
		private _mainPageMapPageType = [Pb_God._emShopType.ShopType_Item, Pb_God._emShopType.ShopType_Pet, 0, Pb_God._emShopType.ShopType_Skill];
		/** 积分会页下的子分页按钮对应的商城类型 */
		private _subPageMapPageType = [Pb_God._emShopType.ShopType_Expedition, Pb_God._emShopType.ShopType_Challenge, Pb_God._emShopType.ShopType_Faction,
		Pb_God._emShopType.ShopType_Treasure, Pb_God._emShopType.ShopType_Team, Pb_God._emShopType.ShopType_Grading,
		Pb_God._emShopType.ShopType_CrossChallenge, Pb_God._emShopType.ShopType_Tower, Pb_God._emShopType.ShopType_MasterTower,Pb_God._emShopType.ShopType_WeekChampion];

		/** 商城类型对应功能id */
		private _shopTypeMapSystemId: ds.StringMap<number>;
		/** 商城类型对应功能锁定状态 0-未锁定可点击 1-未开启 2-已开放但功能不能操作 */
		private _shopTypeMapLockState = new ds.StringMap<number>();

		/** 当前显示的普通商城商品列表 */
		private _curFixShopItemList: Array<cfg.ShopFixShopCfgInfo> = [];
		/** 当前正显示的随机商城的商城数据 */
		private _curRandShopData: Pb_God.PBPlayerRandShop;

		/** 当前正显示的商城类型分页 */
		private _curShopType: Pb_God._emShopType = -1;

		/** 当前正在底部已有资产道具id */
		private _curCurrencyId: number = -1;

		/** itemIndex与shopIndex的映射 */
		private _mapItemIndex = new ds.StringMap<number>();

		private _defaultOpenPage: Pb_God._emShopType;

		public UIPanel: ProUI.Shop.MainUI;

		private _curClickSubpageIndex = -1;

		/** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
		public autoLoadAtlas(): Array<any>
		{
			return [UrlMgr.getAtlas("shop")];
		}

		public openUI(): void
		{
			this.showPanel(ProUI.Shop.MainUI, 3);
		}

		/*** 关闭UI */
		public closeUI(): void
		{
			Laya.timer.clear(this, this.onTimer);
			this.closePanel();
		}
        /**
        * 初始化面板ui 
        */
		public initialization(): void
		{
			//主分页按钮
			this.UIPanel.tabMainGrp.onClick(this, this.onClickMainTab,
				[new component.UITabData("shop_tabItem"), new component.UITabData("shop_tabHero"),
				new component.UITabData("shop_tabScore"), new component.UITabData("shop_tabSkill")],
				[new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]
			);

			//积分分页下的子分页按钮			
			this.UIPanel.tabSubPage.onClick(this, this.onClickSubTab,
				[new component.UITabData("shop_tabExpedition"), new component.UITabData("shop_tabChallenge"),
				new component.UITabData("shop_tabFaction"), new component.UITabData("shop_tabTreasure"),
				new component.UITabData("shop_tabTeamCampaign"), new component.UITabData("shop_tabDan"),
				new component.UITabData("shop_tabCrossChallenge"), new component.UITabData("shop_tabTower"),
				new component.UITabData("shop_tabMasterTower"), new component.UITabData("shop_tabWeekChampion")],
				[new component.UITabStyle("#f13a53", 2, "#fffced"), new component.UITabStyle("#fffced", 2, "#f13a53")]
			);

			this.UIPanel.tabMainGrp.onRenderRefresh(this, this.onMainGrpItemRender);
			this.UIPanel.tabSubPage.onRenderRefresh(this, this.onSubPageItemRender);

			// ShopUtils.setGlowFilter(this.UIPanel.imgCurrency);
			// ShopUtils.setGlowFilter(this.UIPanel.imgRefreshBtnNeed);
		}


        /**
         * 初始化面板ui
         */
		public initUI(): void
		{
			this.setUIBG(Pro.UrlMgr.getUIBgUrl("bg_jpg10"));
			this.initSystemState();
			this._curCurrencyId = -1;
			this._defaultOpenPage = -1;
			this._curShopType = -1;
			if (this.UIOpenData.customObject != null)
			{
				let shopType = this.UIOpenData.customObject;
				//功能开启了才行
				if (!this._shopTypeMapLockState.get(shopType))
					this._defaultOpenPage = shopType;
			}

			if (this._defaultOpenPage >= 0)
			{
				let subIndex = this._subPageMapPageType.indexOf(this._defaultOpenPage);
				let mainIndex = this._mainPageMapPageType.indexOf(this._defaultOpenPage);

				if (subIndex >= 0)
				{ //切换到积分分页
					this.UIPanel.tabMainGrp.setSelectTab(2);
				} else if (mainIndex >= 0)
				{
					this.UIPanel.tabMainGrp.setSelectTab(mainIndex);
					this._defaultOpenPage = -1;
				} else
				{
					this.UIPanel.tabMainGrp.setSelectTab(0);
					this._defaultOpenPage = -1;
				}
			} else
			{
				this.UIPanel.tabMainGrp.setSelectTab(0);
			};
		}

		/** 初始化功能开启的状态 */
		private initSystemState(): void
		{
			if (!this._shopTypeMapSystemId)
			{
				this._shopTypeMapSystemId = new ds.StringMap<number>();

				this._shopTypeMapSystemId.put(Pb_God._emShopType.ShopType_Pet, emSystemSwitchType.Sacrifice);
				this._shopTypeMapSystemId.put(Pb_God._emShopType.ShopType_Expedition, emSystemSwitchType.Expedition);
				this._shopTypeMapSystemId.put(Pb_God._emShopType.ShopType_Challenge, emSystemSwitchType.Challenge);
				this._shopTypeMapSystemId.put(Pb_God._emShopType.ShopType_Faction, emSystemSwitchType.Faction);
				this._shopTypeMapSystemId.put(Pb_God._emShopType.ShopType_Treasure, emSystemSwitchType.Treasure);
				this._shopTypeMapSystemId.put(Pb_God._emShopType.ShopType_Team, emSystemSwitchType.TeamCampaign);
				this._shopTypeMapSystemId.put(Pb_God._emShopType.ShopType_Grading, emSystemSwitchType.Dan);
				this._shopTypeMapSystemId.put(Pb_God._emShopType.ShopType_CrossChallenge, emSystemSwitchType.AcrossChallenge);
				this._shopTypeMapSystemId.put(Pb_God._emShopType.ShopType_Tower, emSystemSwitchType.StarTower);
				this._shopTypeMapSystemId.put(Pb_God._emShopType.ShopType_MasterTower, emSystemSwitchType.StarTower2);
				this._shopTypeMapSystemId.put(Pb_God._emShopType.ShopType_WeekChampion, emSystemSwitchType.WeekChampion);

				//再来处理积分分页的，这个是个汇总，找到最近开放的即可
				let scorePageSystemSort = 99999999;
				let scorePageSystemId = 0;
				for (let shopType of this._subPageMapPageType)
				{
					let systemid = this._shopTypeMapSystemId.get(shopType);
					if (systemid)
					{
						let sort = cfg.SystemSwitchSystemSwitchCfgData.getSortByID(systemid);
						if (sort > 0 && sort < scorePageSystemSort)
						{
							scorePageSystemSort = sort;
							scorePageSystemId = systemid;
						}
					}
				}
				this._shopTypeMapSystemId.put(0, scorePageSystemId);
			}

			let keys = this._shopTypeMapSystemId.getKeys();
			this._shopTypeMapLockState.clear();
			for (let key of keys)
			{
				let shopType = parseInt(key);
				let isOpen = PlayerDataMgr.checkSystemSwitchOpen(this._shopTypeMapSystemId.get(key));
				let openState = isOpen ? 0 : 1;
				//公会商城还需判断是否进入公会
				if (shopType == Pb_God._emShopType.ShopType_Faction && !FactionDataMgr.isHaveFaction() && isOpen)
					openState = 2;

				this._shopTypeMapLockState.put(key, openState);
			}

		}


		/** 本类界面打开状态下监听消息列表 */
		public addEvent(): void
		{
			this.addEventMgr(EventNotify.PlayerItemNumChange, this, this.onItemNumChange);
			this.addEventMgr(EventNotify.Shop_BuyCount_changed, this, this.onBuyCountChange);
			this.addEventMgr(EventNotify.Shop_Reset, this, this.onResetHandler);
			this.addEventMgr(EventNotify.Shop_Refresh, this, this.onRefreshHandler);
			this.addEventMgr(EventNotify.Shop_RefreshCount_Change, this, this.onRefreshCountChange);

			this.UIPanel.btnClose.onClick(this, this.closeUI);
			this.UIPanel.btnFreeRefresh.onClick(this, this.onClickRefresh);
			this.UIPanel.btnFeeRefresh.onClick(this, this.onClickRefresh);
			this.UIPanel.btnHelp.onClick(this, this.onClickHelp);
		}

		/** 本类界面打开状态下监听消息列表 */
		public removeEvent(): void
		{

		}

		/** 模块的刷新方法, 在模块每次被呼出的时候自动调用,  用来同步刷新数据和显示*/
		public refreshUI()
		{
			this.refreshPageUIByShopType(this._curShopType, true);
		}


		/** 页签刷新 */
		private onMainGrpItemRender(item: component.UITab, index: number)
		{
			let shopType = this._mainPageMapPageType[index];
			item.gray = !!this._shopTypeMapLockState.get(shopType)
		}
		/** 页签刷新 */
		private onSubPageItemRender(item: component.UITab, index: number)
		{
			let shopType = this._subPageMapPageType[index];
			item.gray = !!this._shopTypeMapLockState.get(shopType)
			let bgImgold = item.getChildByName("bg") as component.UIFrameImage;
			bgImgold.frame = index != this._curClickSubpageIndex ? 1 : 2;
		}

		/** 切换主分页 */
		private onClickMainTab(tab: component.UITab, tabIndex: number, oldTabIndex: number): void
		{

			let shopType = this._mainPageMapPageType[tabIndex];
			if (this._shopTypeMapLockState.get(shopType))
			{
				let systemId = this._shopTypeMapSystemId.get(shopType);
				PlayerDataMgr.showSystemOpenTips(cfg.SystemSwitchSystemSwitchCfgData.getInfo(systemId));
				this.UIPanel.tabMainGrp.setSelectTab(oldTabIndex);
				return;
			}


			//切换到积分分页时，需要把子分页tab显示出来, 刷新分页的逻辑，也交由子tab的回调处理
			if (shopType == 0)
			{
				this.UIPanel.imgListBg.height = 615;
				this.UIPanel.tabSubPage.visible = true;
				if (this._defaultOpenPage >= 0)
				{
					let idx = this._subPageMapPageType.indexOf(this._defaultOpenPage);
					this.UIPanel.tabSubPage.setSelectTab(idx);
					this.UIPanel.tabSubPage.scrollTo(idx);
					this._defaultOpenPage = -1;
				}
				else
				{
					//找到一个已经开放的显示
					let subTab = 0;
					for (let i = 0; i < this._subPageMapPageType.length; i++)
					{
						let subShopType = this._subPageMapPageType[i];
						if (!this._shopTypeMapLockState.get(subShopType))
						{
							subTab = i;
							break;
						}
					}
					this.UIPanel.tabSubPage.setSelectTab(subTab);
				}
			} else
			{
				this.UIPanel.imgListBg.height = 670//685;
				this.UIPanel.tabSubPage.visible = false;
				this.refreshPageUIByShopType(this._mainPageMapPageType[tabIndex]);
			}

		}

		/** 切换子分页 */
		private onClickSubTab(tab: component.UITab, tabIndex: number, oldTabIndex: number): void
		{
			let shopType = this._subPageMapPageType[tabIndex];
			let lockState = this._shopTypeMapLockState.get(shopType);
			if (lockState)
			{
				if (lockState == 2 && shopType == Pb_God._emShopType.ShopType_Faction)
				{
					TipsUtils.showTipsByLanId("faction_none");
				} else
				{
					let systemId = this._shopTypeMapSystemId.get(shopType);
					PlayerDataMgr.showSystemOpenTips(cfg.SystemSwitchSystemSwitchCfgData.getInfo(systemId));
				}
				this.UIPanel.tabSubPage.setSelectTab(oldTabIndex);
				return;
			} else
			{
				this._curClickSubpageIndex = tabIndex;
				if (tab.getCell(oldTabIndex))
				{
					let bgImgold = tab.getCell(oldTabIndex).getChildByName("bg") as component.UIFrameImage;
					bgImgold.frame = 1
				}
				if (tab.getCell(tabIndex))
				{
					let bgImgindex = tab.getCell(tabIndex).getChildByName("bg") as component.UIFrameImage;
					bgImgindex.frame = 2
				}


			}
			this.refreshPageUIByShopType(this._subPageMapPageType[tabIndex]);
		}

		/**
		 * 刷新显示相应的商城分页
		 */
		private refreshPageUIByShopType(shopType: number, isForceRefresh: boolean = false): void
		{
			if (this._curShopType == shopType && !isForceRefresh) return;
			this._curShopType = shopType;

			this.refreshCurrency(cfg.ShopCurrencyTypeCfgData.getCurrencyIdByShopType(shopType));

			this.UIPanel.btnHelp.visible = shopType == Pb_God._emShopType.ShopType_Pet; //英雄商城才需要显示帮助按钮

			//刷新商品列表
			this._curFixShopItemList = [];
			this._curRandShopData = null;
			this._mapItemIndex.clear();
			//普通商城
			if (this.checkIsFixShopType())
			{
				this._curFixShopItemList = cfg.ShopFixShopCfgData.getDataArrayByShopType(shopType);
				if (shopType == Pb_God._emShopType.ShopType_Item)
				{
					if (PlatformData.platformType == PlatformData.EnumPlatformType.wx_cx)
					{
						//不能支付的话， 屏蔽道具商城
						if (!qingjs.instance.canPay())
						{
							this._curFixShopItemList = [];
						}
					}
				}
				this.UIPanel.listItems.onRefresh(this._curFixShopItemList.length, this, this.onRefreshFixShopItem);
			} else
			{
				this._curRandShopData = ShopDataMgr.getRandShopData(this._curShopType);
				if (this._curRandShopData == null)
				{ //空数据异常情况。
					ShopSend.refresh(this._curShopType);  //空数据时，请求一次刷新
					this.UIPanel.listItems.onRefresh(0, this, this.onRefreshRandShopItem);
				} else
				{
					this.UIPanel.listItems.onRefresh(this._curRandShopData.refreshindex.length, this, this.onRefreshRandShopItem);
				}
			}
			//商城重置刷新数据
			this.resetRefreshView();
		}

		/** 刷新已有货币资产类型 */
		private refreshCurrency(itemid)
		{
			if (this._curCurrencyId == itemid) return;
			this._curCurrencyId = itemid;

			this.UIPanel.txtCurrencyCount.text = Global.numberToTuckString(Global.getItemNum(itemid));;

			//道具ID转换成小图标资源
			Global.setResSmallIconWithItemID(this.UIPanel.imgCurrency, itemid);
			Global.setResSmallIconWithItemID(this.UIPanel.imgRefreshBtnNeed, itemid);
		}


		/** 普通商品元素刷新 */
		private onRefreshFixShopItem(item: ShopItemView, index: number)
		{
			let shopCfgInfo: cfg.ShopFixShopCfgInfo = this._curFixShopItemList[index];
			this._mapItemIndex.put(shopCfgInfo.index, index);
			item.setItemByFixShopCfg(shopCfgInfo);
		}

		/** 随机商城商品元素刷新 */
		private onRefreshRandShopItem(item: ShopItemView, index: number)
		{
			this._mapItemIndex.put(index, index);
			let refreshIndex = this._curRandShopData.refreshindex[index];
			let buyCount = this._curRandShopData["buyCountMaps"].get(index);
			let shopCfgInfo = cfg.ShopRandPoolCfgData.getInfo(refreshIndex);
			item.setItemByRandShopCfg(shopCfgInfo, this._curShopType, index, buyCount);
		}

		/** 重置刷新按钮状态
		 */
		resetRefreshView()
		{
			Laya.timer.clear(this, this.onTimer);
			//英雄商店固定重置，无重置限制
			if (this._curShopType == Pb_God._emShopType.ShopType_Pet)
			{
				this.UIPanel.btnFeeRefresh.visible = true;
				this.UIPanel.btnFreeRefresh.visible = false;
				this.UIPanel.txtRefreshLimit.text = "";
				this.UIPanel.txtFreeCount.text = "";
				this.UIPanel.txtFreeFreshLable.visible = this.UIPanel.txtFreeFreshTime.visible = false;
				this.UIPanel.txtRefreshBtnNeed.text = Global.getLangStr("shop_msg29", cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Game, Pb_God._emConstant_Game.C_Game_PetShopResetExpend));
				this.UIPanel.hboxBtnFeeRefresh.refresh();
			}
			else if (this.checkIsFixShopType() || this._curRandShopData == null)
			{  //其它普通商城无需刷新, 刷新重置相关的元素全部隐藏
				this.UIPanel.btnFeeRefresh.visible = false;
				this.UIPanel.btnFreeRefresh.visible = false;
				this.UIPanel.txtRefreshLimit.text = "";
				this.UIPanel.txtFreeCount.text = "";
				this.UIPanel.txtFreeFreshLable.visible = this.UIPanel.txtFreeFreshTime.visible = false;
			}
			else
			{  //随机商城
				let randCfg = cfg.ShopRandShopCfgData.getInfo(this._curShopType);
				let maxFreeCount = randCfg.freeCount;  //最大免费刷新次数
				if (this._curRandShopData.freeleftcount > 0)
				{ //有免费刷新次数
					this.UIPanel.btnFeeRefresh.visible = false;
					this.UIPanel.btnFreeRefresh.visible = true;
					this.UIPanel.txtFreeCount.text = `(${ this._curRandShopData.freeleftcount }/${ maxFreeCount })`;
				} else
				{
					this.UIPanel.btnFreeRefresh.visible = false;
					this.UIPanel.btnFeeRefresh.visible = true;
					this.UIPanel.txtFreeCount.text = "";
					let needItemArr = randCfg.refreshNeedItem.split("_");
					Global.setResSmallIconWithItemID(this.UIPanel.imgRefreshBtnNeed, parseInt(needItemArr[0]));
					this.UIPanel.txtRefreshBtnNeed.text = needItemArr[1] + Global.getLangStr("common_refresh");
					this.UIPanel.hboxBtnFeeRefresh.refresh();
				}
				// if(this._curRandShopData.freeleftcount >= maxFreeCount)
				Laya.timer.loop(1000, this, this.onTimer);
				this.onTimer();
				this.UIPanel.txtFreeFreshLable.visible = this.UIPanel.txtFreeFreshTime.visible = true;
				if (randCfg.refreshCount > 0)
				{ //有收费刷新次数限制
					this.UIPanel.txtRefreshLimit.text = Global.getLangStr("shop_msg23", this._curRandShopData.daybuyrefreshcount, randCfg.refreshCount);
					this.UIPanel.txtFreeFreshLable.y = this.UIPanel.txtFreeFreshTime.y = 1019;
				} else
				{
					this.UIPanel.txtRefreshLimit.text = "";
					this.UIPanel.txtFreeFreshLable.y = this.UIPanel.txtFreeFreshTime.y = 1033;
				}
			}
		}



		/** 免费刷新倒计时 */
		private onTimer(): void
		{
			let time: number = this._curRandShopData.nextfreetime - TimeController.currTimer / 1000;
			if (time < 0)
			{
				time = 0;
				Laya.timer.clear(this, this.onTimer);
			}
			this.UIPanel.txtFreeFreshTime.text = Global.GetRemindTime(time, 4);
		}

		/** 刷新道具数量 */
		private onItemNumChange(fID: number, tempNewNum: number): void
		{
			if (fID == this._curCurrencyId)
			{
				this.UIPanel.txtCurrencyCount.text = Global.numberToTuckString(tempNewNum);
			}
		}

		/** 单个商品购买次数更新 */
		private onBuyCountChange(shopType: number, shopId: number, buyCount: number)
		{
			if (shopType != this._curShopType) return;
			let itemIndex = this._mapItemIndex.get(shopId);
			let itemView = this.UIPanel.listItems.getCell(itemIndex) as ShopItemView;
			if (!itemView) return;
			if (shopType > Pb_God._emShopType.ShopType_MaxFix)
			{
				let cfgIndex = this._curRandShopData.refreshindex[shopId];
				let shopCfgInfo = cfg.ShopRandPoolCfgData.getInfo(cfgIndex);
				itemView.refreshItemLimitBuyView("", buyCount, shopCfgInfo.buyCount);
			} else
			{
				itemView.refreshFixLimitCountInfo();
			}
		}

		/**普通商城重置次数(此回调仅限于普通商城) */
		private onResetHandler(shopType: number): void
		{
			if (shopType != this._curShopType) return;
			SoundMgr.Inst().playSound("refresh");
			//刷新一次当前分页即可把所有数据全部刷新一遍了
			this.refreshPageUIByShopType(shopType, true);
		}

		/** 刷新随机商店数据回调 */
		private onRefreshHandler(randData: Pb_God.PBPlayerRandShop): void
		{
			if (randData.shoptype != this._curShopType) return;
			SoundMgr.Inst().playSound("refresh");
			//刷新一次当前分页即可把所有数据全部刷新一遍了
			this.refreshPageUIByShopType(randData.shoptype, true);
		}
		//仅刷新重置次数
		private onRefreshCountChange(randData: Pb_God.PBPlayerRandShop): void
		{
			if (randData && randData.shoptype != this._curShopType) return;
			SoundMgr.Inst().playSound("refresh");
			this.resetRefreshView();
		}

		/** 点击帮助按钮 */
		private onClickHelp(btn: component.UIButton): void
		{
			let content = Global.getLangStr("shop_hero_help");
			CommonHelpView.show(btn, content);
		}

		/** 点击刷新按钮 */
		private onClickRefresh(): void
		{
			if (this._curShopType == Pb_God._emShopType.ShopType_Pet)
			{  //英雄商店重置
				//二级弹窗确认
				let needCount = cfg.ConstantCfgData.getDefaultValueWithFun(Pb_God._emConstantType.Constant_Game, Pb_God._emConstant_Game.C_Game_PetShopResetExpend);
				let needName = cfg.ItemCfgData.getNameById(9);
				let alertDes = Global.getLangStr("shop_msg26", needCount + needName);
				AlertShow.showConfirmAlert(alertDes, this, () =>
				{
					ShopSend.reset(this._curShopType);
				});

			} else if (!this.checkIsFixShopType())
			{  //随机商店刷新
				//如果有免费次数， 则直接刷新即可
				if (!this._curRandShopData || this._curRandShopData.freeleftcount > 0)
				{
					ShopSend.refresh(this._curShopType);
				}
				else
				{
					let randCfg = cfg.ShopRandShopCfgData.getInfo(this._curRandShopData.shoptype);
					let refreshNeedItem = randCfg.refreshNeedItem.split("_");
					//二级弹窗确认					
					let needCount = refreshNeedItem[1];
					let needName = cfg.ItemCfgData.getNameById(parseInt(refreshNeedItem[0]));
					let alertDes = Global.getLangStr("shop_msg27", needCount + needName);
					AlertShow.showConfirmAlert(alertDes, this, () =>
					{
						ShopSend.refresh(this._curShopType);
					}, "common_confirm", "common_cancel", 0, 0, "TodayRepeatShopRefresh_" + randCfg.shopType);
				}
			}
		}

		/** 是否是普通商城 */
		private checkIsFixShopType(): boolean
		{
			return this._curShopType <= Pb_God._emShopType.ShopType_MaxFix;
		}
	}
}