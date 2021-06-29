
module Pro
{
	/**
	 * 先知主界面
	 */
	export class HeroExchangeMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Hero.HeroExchange.MainUI;

		BG_ARR: Array<string> = ["xianzhi_bg.jpg", "xianzhishengdian_bg_02.jpg"];

		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return [UrlMgr.getAtlas("seerpalace")];
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Hero.HeroExchange.MainUI, 3, BaseAddLayer.CenterUI, false, 3);
		}

		/*** 关闭UI */
		public closeUI(): void
		{
			CallDataMgr.reddotModelExchange.setRedDot(0);
			this.closePanel(0, true, true); //目前无法处理骨格动画的纹理资源单独消毁， 只能在关闭界面时直接把整个界面销毁以释放内存。
		}


		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{

			this.UIPanel.FunBox.initData(this.UIPanel.ItemTab, [
				new TableBarContinerData("hero_msg33", "heroCall", HeroExchangeCallTabel),
				new TableBarContinerData("hero_msg34", "heroSwitch", HeroExchangeSwitchTabel)
			], [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]);

			this.UIPanel.FunBox.onClick(this, (index: number, tabName: string) =>
			{
				this.setUIBG(Global.getUIBGPathWithResUrl(this.BG_ARR[index]));
				this.UIPanel.DreamPointsBtn.visible = index ? false : true;
			});
			this.UIPanel.CloseBtn.onClick(this, this.closeUI);
			this.UIPanel.HelpBtn.onClick(this, (btn: component.UIButton) =>
			{
				if (this.UIPanel.ItemTab.tabIndex == 0)
					CommonHelpView.showWithLangKey(btn, "PetCall2_help");
				else
					CommonHelpView.showWithLangKey(btn, "petChange_help");
			});
			this.UIPanel.ShopBtn.onClick(this, () =>
			{
				ShopDataMgr.exchangeShopReddotMode.setRedDot(0);
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroExchangeShop));
			});

			this.UIPanel.DreamPointsBtn.onClick(this, () =>
			{
				UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroDreamPointsReward));
			});

			Global.setResIconWithItemID(this.UIPanel.ShuiJIngImg, CfgID.ResType.Item, CfgID.ItemID.ProphetCrystal);
			Global.setResIconWithItemID(this.UIPanel.JInghuaImg, CfgID.ResType.Item, CfgID.ItemID.ProphePoint);
			Global.setResIconWithItemID(this.UIPanel.JieJingImg, CfgID.ResType.Item, CfgID.ItemID.ProphetScore);
			Global.setResIconWithItemID(this.UIPanel.PointsImg, CfgID.ResType.Item, Pb_God._emExpendType.ExpendType_DreamScore);
		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		addEvent(): void
		{
			this.addEventMgr(CmdEvent.Item_UpdateNum, this, this.refreshUI);

		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{

		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{
			this.UIPanel.ItemTab.setRedDotModelList([CallDataMgr.reddotModelExchange, null]);
			this.UIPanel.ItemTab.setSelectTab(this.UIOpenData.customObject || 0);
			this.refreshUI();
			this.reddotBind(this.UIPanel.RedDotImg, ShopDataMgr.exchangeShopReddotMode);
			this.reddotBind(this.UIPanel.integraRedDotImg, ShopDataMgr.integralShopReddotMode);
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{
			this.UIPanel.ShuiJIngLb.text = Global.getItemNum(CfgID.ItemID.ProphetCrystal).toString();
			this.UIPanel.JInghuaLb.text = Global.getItemNum(CfgID.ItemID.ProphePoint).toString();
			this.UIPanel.JieJingLb.text = Global.getItemNum(CfgID.ItemID.ProphetScore).toString();
			this.UIPanel.PointsLabe.text = Global.getItemNum(Pb_God._emExpendType.ExpendType_DreamScore).toString();
			// this.UIPanel.RedDotImg.visible = Global.getItemNum(CfgID.ItemID.ProphetScore) >= 30;
		}
	}
}