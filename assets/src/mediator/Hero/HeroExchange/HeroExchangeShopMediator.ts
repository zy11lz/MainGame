
module Pro
{
	/**
     * 先知商店
	 */
	export class HeroExchangeShopMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Hero.HeroExchange.Shop.MainUI;


		/** 当前选择的英雄类型索引 */
		TmpSelectHeroTypeIndex = -1;

		/** 商店数据列表 */
		TmpMyShopCfgList: Array<cfg.ShopFixShopCfgInfo>;

		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return [UrlMgr.getAtlas("shop")];
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Hero.HeroExchange.Shop.MainUI, 3, BaseAddLayer.CenterUI, true);
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
			this.addEventMgr(EventNotify.PlayerItemNumChange, this, this.onItemNumChange);
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{

		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{
			this.refreshHeroType();

			Global.setResIconWithItemID(this.UIPanel.ResIconImg, CfgID.ResType.Item, CfgID.ItemID.ProphetScore);
			this.UIPanel.ResNumLb.text = Global.getItemNum(CfgID.ItemID.ProphetScore).toString();
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}

		/** 刷新道具数量 */
		private onItemNumChange(fID: number, tempNewNum: number): void
		{
			if (fID == CfgID.ItemID.ProphetScore)
			{
				this.UIPanel.ResNumLb.text = tempNewNum + "";
			}
			this.refreshHeroType();
		}

		//---------------------------英雄类型------------------------------
		/** 刷新英雄类型 */
		private refreshHeroType()
		{
			this.TmpSelectHeroTypeIndex = -1;
			let startTypeIndex = 0;
			let heroTypeNum = 1 + Pb_God._emPetType.PetType_Moon;
			this.UIPanel.HeroTypeBox.onRefresh(heroTypeNum, this, (itemUI: component.UIButton, index: number) =>
			{

				let tmpHeroType = startTypeIndex + index;
				Global.setResPetType(itemUI, tmpHeroType);
				itemUI.onClick(this, this.onHeroTypeClick);

				if (this.TmpSelectHeroTypeIndex == -1)
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
			this.refreshPetList();
		}

		//---------------------------英雄分解------------------------------
		private choicePetSpinWithHeroType(heroType: number)
		{

			if (this.TmpMyShopCfgList == null)
			{
				this.TmpMyShopCfgList = [];
			}
			else
			{
				this.TmpMyShopCfgList.splice(0, this.TmpMyShopCfgList.length);
			}

			let tmpAry = cfg.ShopFixShopCfgData.getDataArrayByShopType(Pb_God._emShopType.ShopType_Xianzhi);
			tmpAry.forEach(elment =>
			{
				let tmpCompoundID = cfg.ItemCfgData.getCompoundIDById(ShopUtils.getSellItemByCfgInfo(elment)[0].itemid);
				if (cfg.PetCfgData.getPetTypeByPetID(tmpCompoundID) == heroType || heroType == 0)
				{
					this.TmpMyShopCfgList.push(elment);
				}
			});
			this.TmpMyShopCfgList.sort((a: cfg.ShopFixShopCfgInfo, b: cfg.ShopFixShopCfgInfo) =>
			{
				return Number(b.needItem.split("_")[1]) - Number(a.needItem.split("_")[1]);
			})
		}

		private refreshPetList()
		{
			this.choicePetSpinWithHeroType(this.TmpSelectHeroTypeIndex);
			this.UIPanel.ItemList.onRefresh(this.TmpMyShopCfgList.length, this, (itemUI: ShopItemView, index: number) =>
			{
				itemUI.setItemByFixShopCfg(this.TmpMyShopCfgList[index]);
				
				let price = Number(Global.numberToTuckString(ShopUtils.getNeedItemByCfgInfo(this.TmpMyShopCfgList[index]).itemcount) || 0) ;
				itemUI.itemUI.RedDotImg.visible = price >= 30 && Global.getItemNum(CfgID.ItemID.ProphetScore) >= price
			});
		}
	}
}