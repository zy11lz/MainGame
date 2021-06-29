
module Pro
{
	/**
	 * 装备或符文合成
	 */
	export class ItemCombinMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.ItemCombin.MainUI;


		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return [UrlMgr.getAtlas("forgehouse")];
		}

		/** 需要自动释放的png|jgp资源列表 */
		public autoUnLoadOtherRes(): Array<string>
		{
			return ["res/forgehouse/duanzaowu_ronglianbg_03.png", "res/forgehouse/duanzaowu_ronglianbg_04.png"];
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.ItemCombin.MainUI, 3);
		}

		/** 关闭UI*/
		closeUI(): void
		{
			this.closePanel();
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{
			this.UIPanel.FunBox.initData(this.UIPanel.ItemTab, [
				new TableBarContinerData("item_combin_tab1", "combinEquip", ItemCombinEquipTabel),
				new TableBarContinerData("item_combin_tab2", "combinRune", ItemCombinRuneTabel)
			], [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]);

		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		addEvent(): void
		{
			this.UIPanel.CloseBtn.onClick(this, this.closeUI);
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{

		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{
			this.UIPanel.ItemTab.setRedDotModelList([ItemDataMgr.reddotModelEquipCombine, ItemDataMgr.reddotModelRuneCombine]);
			let defaultIndex = this.UIOpenData.customObject || 0;
			this.UIPanel.ItemTab.setSelectTab(defaultIndex);
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{
			this.UIPanel.ItemTab.activeCurrentTab();
		}


		//-----------------------------------新手引导------------------------------------
        /**
         * 进入本步引导
         */
		public Guide_Enter(step: GuideStep)
		{
			if (step == GuideStep.Func_EquipCombin_3)
			{
				Laya.timer.once(100, this, () =>
				{
					let tmpTabel = this.UIPanel.FunBox.getTableView("combinEquip") as ItemCombinEquipTabel;
					GuideMgr.Inst.showFinger(tmpTabel.CombinBtn, true, tmpTabel.CombinBtn);
				});
			}
		}
	}
}