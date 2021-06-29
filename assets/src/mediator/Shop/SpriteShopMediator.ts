module Pro
{
	/**
	*
	* 精灵商店界面(数据全部在商城模块内)
	*
	* @author jason.xu
	*
	*/
	export class SpriteShopMediator extends BaseMediator implements IMediator
	{
		private shopType: number = Pb_God._emShopType.ShopType_Sprite;

		public UIPanel: ProUI.Shop.SpriteShopUI;
		uiRoleSayComponent: UiRoleSayComponet;

		/** 需要自动加载的资源列表(如果资源没有单独加载，可忽略) */
		public autoLoadAtlas(): Array<any>
		{
			return [UrlMgr.getAtlas("spriteshop"), UrlMgr.getAtlas("shop")];
		}

		/** 需要自动释放的png|jgp资源列表 */
		public autoUnLoadOtherRes(): Array<string>
		{
			return ["res/Unpack/UIHeadShow/shangdian_renwu_02.png"];
		}

		public openUI(): void
		{
			this.showPanel(ProUI.Shop.SpriteShopUI, 1);
		}

		/*** 关闭UI */
		public closeUI(): void
		{
			Laya.timer.clear(this, this.onTimer);
			this.closePanel(0, true, true); //目前无法处理骨格动画的纹理资源单独消毁， 只能在关闭界面时直接把整个界面销毁以释放内存。
			SoundMgr.Inst().playMusicByType(Pro.ScenceSoundType.CITY);
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		public initialization(): void
		{
			//	this.setUIBG(UrlMgr.getUIBgUrl("yingxiong_bg"));
			//this.setUIBG(UrlMgr.getUIBgUrl("yingxiong_bg"));
			let tmpBGImg = this.getDarkUI().getChildAt(0) as Laya.Image;
			tmpBGImg.scaleX = -1;
			SoundMgr.Inst().playSound("spriteShop");
			this.uiRoleSayComponent = new UiRoleSayComponet(UiRoleSayType.SPRITE_SHOPE, this.UIPanel.txtSay, this.UIPanel.sayPaoPao, this.UIPanel.skRoleClick);
			this.initAni();
		}

		private initAni()
		{
			let sk = new Pro.SkeletonPlayer();
			sk.load(UrlMgr.getSpineSceneUrl("npc/miaomiao/miaomiao"));
			this.UIPanel.aniPos.addChild(sk);
			sk.playByIndex(0, true);
			sk.scale(0.8, 0.8);
		}

		/**
		 * 初始化面板ui
		 */
		public initUI(): void
		{
			this.refreshUI();
			this.uiRoleSayComponent.uiRoleSay();
		}

		/** 本类界面打开状态下监听消息列表 */
		public addEvent(): void
		{
			this.addEventMgr(EventNotify.Shop_BuyCount_changed, this, this.onBuyCountChange);
			this.addEventMgr(EventNotify.Shop_Refresh, this, this.onRefreshHandler);
			this.addEventMgr(EventNotify.Shop_RefreshCount_Change, this, this.onRefreshCountChange);

			this.UIPanel.closeBtn.onClick(this, this.closeUI);
			this.UIPanel.btnFeeRefresh.onClick(this, this.onClickRefresh);
			this.UIPanel.btnFreeRefresh.onClick(this, this.onClickRefresh);
		}

		/** 本类界面打开状态下监听消息列表 */
		public removeEvent(): void
		{
			this.uiRoleSayComponent.clearUiRoleSay();
		}

		public refreshUI()
		{
			//刷新商品列表
			let randData = ShopDataMgr.getRandShopData(this.shopType);
			if (randData == null)
			{ //空数据异常情况。
				ShopSend.refresh(this.shopType);  //空数据时，请求一次刷新
				this.UIPanel.listView.onRefresh(0, this, this.onRefreshRandShopItem);
				return;
			} else
			{
				this.UIPanel.listView.onRefresh(randData.refreshindex.length, this, this.onRefreshRandShopItem);
			}

			//商城重置刷新数据
			this.resetRefreshView(randData);
		}

		/** 重置刷新按钮状态
		 */
		resetRefreshView(randData: Pb_God.PBPlayerRandShop)
		{
			Laya.timer.clear(this, this.onTimer);

			let randCfg = cfg.ShopRandShopCfgData.getInfo(this.shopType);
			let maxFreeCount = randCfg.freeCount;  //最大免费刷新次数
			let isFree = randData.freeleftcount > 0;
			this.UIPanel.btnFreeRefresh.visible = isFree;
			this.UIPanel.btnFeeRefresh.visible = !isFree;
			if (isFree)
			{ //有免费刷新次数
				this.UIPanel.txtBtnRefreshCount.text = Global.getLangStr("shop_msg24", randData.freeleftcount, maxFreeCount);
			} else
			{
				let needItemArr = randCfg.refreshNeedItem.split("_");
				Global.setResSmallIconWithItemID(this.UIPanel.imgRefreshNeedIcon, parseInt(needItemArr[0]));
				this.UIPanel.txtRefreshNeedValue.text = Global.getLangStr("shop_msg25", needItemArr[1]);
			}
			Laya.timer.loop(500, this, this.onTimer);
			this.onTimer();
			let maxRefreshCount = randCfg.refreshCount + PrivilegeDataMgr.getVipPrivilegeValue(Pb_God._emPrivilegeType.PrivilegeType_SpriteShopRefreshCount);
			if (maxRefreshCount > 0)
			{ //有收费刷新次数限制
				this.UIPanel.txtRefreshCount.text = Global.getLangStr("shop_msg23", randData.daybuyrefreshcount, maxRefreshCount);
			} else
			{
				this.UIPanel.txtRefreshCount.text = "";
			}

		}


		/** 随机商城商品元素刷新 */
		private onRefreshRandShopItem(item: SpriteShopItemView, index: number)
		{
			let randData = ShopDataMgr.getRandShopData(this.shopType);
			let refreshIndex = randData.refreshindex[index];
			let buyCount = randData["buyCountMaps"].get(index);
			let shopCfgInfo = cfg.ShopRandPoolCfgData.getInfo(refreshIndex);
			item.setItemByRandShopCfg(shopCfgInfo, index, buyCount);
		}

		/** 免费刷新倒计时 */
		private onTimer(): void
		{
			let randData = ShopDataMgr.getRandShopData(this.shopType);
			let time: number = randData.nextfreetime - TimeController.currTimer / 1000;
			if (time < 0)
			{
				time = 0;
				Laya.timer.clear(this, this.onTimer);
			}
			this.UIPanel.txtCountDown.text = Global.GetRemindTime(time, 4);
		}

		/** 单个商品购买次数更新 */
		private onBuyCountChange(shopType: number, posIndex: number, buyCount: number)
		{
			if (shopType != this.shopType) { return; }
			let itemView: SpriteShopItemView = this.UIPanel.listView.getCellWithIndex(posIndex) as SpriteShopItemView;
			if (!itemView) { return; }
			let randData = ShopDataMgr.getRandShopData(this.shopType);
			let cfgIndex = randData.refreshindex[posIndex];
			let shopCfgInfo = cfg.ShopRandPoolCfgData.getInfo(cfgIndex);
			itemView.refreshItemLimitBuyView(buyCount, shopCfgInfo.buyCount);
			this.uiRoleSayComponent.eventSay();
		}


		/** 刷新随机商店数据回调 */
		private onRefreshHandler(randData: Pb_God.PBPlayerRandShop): void
		{
			if (randData.shoptype != this.shopType) { return; }
			SoundMgr.Inst().playSound("refresh");
			this.refreshUI();
		}
		//仅刷新重置次数
		private onRefreshCountChange(randData: Pb_God.PBPlayerRandShop): void
		{
			if (randData && randData.shoptype != this.shopType) { return; }
			SoundMgr.Inst().playSound("refresh");
			this.resetRefreshView(randData || ShopDataMgr.getRandShopData(this.shopType));
		}

		/** 点击刷新按钮 */
		private onClickRefresh(): void
		{
			let randData = ShopDataMgr.getRandShopData(this.shopType);
			//如果有免费次数， 则直接刷新即可
			if (!randData || randData.freeleftcount > 0)
			{
				ShopSend.refresh(this.shopType);
			}
			else
			{
				let randCfg = cfg.ShopRandShopCfgData.getInfo(randData.shoptype);
				let refreshNeedItem = randCfg.refreshNeedItem.split("_");
				//二级弹窗确认
				let needCount = refreshNeedItem[1];
				let needName = cfg.ItemCfgData.getNameById(parseInt(refreshNeedItem[0]));
				let alertDes = Global.getLangStr("shop_msg27", needCount + needName); //`是否消耗${needCount + needName}进行刷新？`;
				AlertShow.showConfirmAlert(alertDes, this, () =>
				{
					ShopSend.refresh(this.shopType);
				}, "common_confirm", "common_cancel", 0, 0, "TodayRepeatSpriteShopRefresh");
			}
		}

		//-----------------------------------新手引导------------------------------------
		/**
		 * 进入本步引导
		 */
		public Guide_Enter(step: GuideStep)
		{
			if (step == GuideStep.SecretShop_9_5)
			{
				Laya.timer.once(300, this, () =>
				{
					let tmpItemUI = this.UIPanel.listView.getCellWithIndex(3) as SpriteShopItemView;
					GuideMgr.Inst.showFinger(tmpItemUI.BuyBtn, true);
				});
			}
		}

		/**
		 * 操作本步引导
		 */
		public Guide_Active(step: GuideStep)
		{
			if (step == GuideStep.SecretShop_9_5)
			{

				let tmpItemUI = this.UIPanel.listView.getCellWithIndex(3) as SpriteShopItemView;
				if (!tmpItemUI.BuyBtn.mouseEnabled)
				{
					return;
				}
				tmpItemUI.BuyBtn.activeEvent();
				tmpItemUI.BuyBtn.mouseEnabled = false;

				Laya.timer.once(200, this, () =>
				{
					tmpItemUI.BuyBtn.mouseEnabled = true;
					this.closeUI();
					GuideMgr.Inst.nextActive();
				});
			}
		}
	}
}