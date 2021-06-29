
module Pro
{
	/**
	 * 高级召唤
	 */
	export class HeroCallExpandResCallMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Hero.HeroCall.ExpandResCall.MainUI;


		/** 当前购买获得道具ID */
		TempBuyItemID: number;

		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return null;
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Hero.HeroCall.ExpandResCall.MainUI, 1, BaseAddLayer.TopUI, true);
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
			this.UIPanel.CloseBtn.onClick(this, this.closeUI);
			this.addEventMgr(EventNotify.PlayerItemNumChange, this, this.onItemNumChange);
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{

		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{
			let tmpShopID = this.UIOpenData.customObject as number;
			let tmpShopType = Pb_God._emShopType.ShopType_Common;
			let tmpGetTimes = tmpShopID == 2 ? 10 : 1;

			let tmpBuyInfo = cfg.ShopFixShopCfgData.getInfoByTypeAndIndex(tmpShopType, tmpShopID);
			let tmpNeedInfo = ShopUtils.getNeedItemByCfgInfo(tmpBuyInfo);
			let tmpSellAry = cfg.ShopFixShopCfgData.getSellItemAryByInfo(tmpBuyInfo);
			Global.setResIconWithItemID(this.UIPanel.CostIconImg, CfgID.ResType.Item, tmpNeedInfo.itemid);
			Global.setResNumWithItemInfo(this.UIPanel.CostNumLb, tmpNeedInfo.itemid, tmpNeedInfo.itemcount);
			this.UIPanel.CostBaseLb.text = Global.numberToTuckString(Global.getItemNum(tmpNeedInfo.itemid));

			this.TempBuyItemID = tmpSellAry[0].itemid;

			this.UIPanel.GetNumLb.text = tmpSellAry[1].itemcount.toString();
			this.UIPanel.GetNameLb.text = cfg.ItemCfgData.getNameById(tmpSellAry[1].itemid);
			this.UIPanel.GetTimesLb.text = tmpGetTimes.toString();

			this.UIPanel.TIps3Box.refresh();
			this.UIPanel.TIps1Box.refresh();
			this.UIPanel.TIps2Box.refresh();

			this.UIPanel.SureBtn.onClick(this, () =>
			{
				if (!Global.isFullRes(tmpNeedInfo.itemid, tmpNeedInfo.itemcount))
				{
					this.closeUI();
					return;
				}
				//判断英雄背包格子
				if (PetDataMgr.getPetList().length + tmpGetTimes > PetDataMgr.getSpaceNum())
				{
					TipsUtils.showTipsByLanId("hero_msg24");
					this.closeUI();
					return;
				}
				ShopSend.buy(tmpShopType, tmpShopID, 1);
			});
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}

		/** 刷新道具数量 */
		private onItemNumChange(fID: number, tempNewNum: number): void
		{
			if (fID == this.TempBuyItemID && tempNewNum > 0)
			{
				this.closeUI();

				let tmpShopID = this.UIOpenData.customObject as number;
				CallDataMgr.sendCall(Pb_God._emPetCallType.PetCallType_Advance, tmpShopID != 1);
			}
		}

		//-----------------------------------新手引导------------------------------------
        /**
         * 进入本步引导
         */
		public Guide_Enter(step: GuideStep)
		{
			Laya.timer.once(500, this, () =>
			{
				GuideMgr.Inst.showFinger(this.UIPanel.SureBtn, true);
			});
		}

        /**
         * 操作本步引导
         */
		public Guide_Active(step: GuideStep)
		{
			this.UIPanel.SureBtn.activeEvent();
		}
	}
}