
module Pro
{
	/**
	 * 好友助阵
	 */
	export class FightSupportMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Fuben.Support.MainUI;


		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return [UrlMgr.getAtlas("endless")];
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Fuben.Support.MainUI, 1, BaseAddLayer.TopUI,true);
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
				new TableBarContinerData("fight_msg23", "supportMe", FightSupportMeTable),
				new TableBarContinerData("fight_msg24", "toSupport", FightToSupportTable)
			],  [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]);

			this.UIPanel.FunBox.onClick(this, (index: number, tabName: string) =>
			{
				this.UIPanel.FunBox.setTableViewData(tabName, this.UIOpenData.customObject);
			});
		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		addEvent(): void
		{
			this.UIPanel.btnClose.onClick(this, this.closeUI);
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{

		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{
			this.UIPanel.FunBox.setSelectTable("supportMe");
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}


		//-----------------------------------新手引导------------------------------------
		/**
		 * 进入本步引导
		 */
		public Guide_Enter(step: GuideStep)
		{
			if (step == GuideStep.Func_EndlessTower_7)
			{
				GuideMgr.Inst.showFinger(this.UIPanel.btnClose, true, this.UIPanel.btnClose);
			}
			else if (step == GuideStep.Func_EndlessTower_6)
			{
				Laya.timer.once(200, this, () =>
				{
					let tmpPanel = this.UIPanel.FunBox.getTableView("supportMe") as FightSupportMeTable;
					if (tmpPanel.ItemList.length == 0)
					{
						GuideMgr.Inst.nextActive(); //没有元素，直接下一步
					} else
					{
						let tempCell = tmpPanel.ItemList.getCell(0) as ProUI.Fuben.Support.HelpMe.ListItemUI;
						GuideMgr.Inst.showFinger(tempCell.btnSel, true, tempCell.btnSel);
					}
				});

			}
		}

		// /**
		//  * 操作本步引导
		//  */
		// public Guide_Active(step: GuideStep) {
		// 	if (step == GuideStep.Func_EndlessTower_7) {
		// 		this.UIPanel.btnClose.activeEvent();
		// 		GuideMgr.Inst.nextActive();
		// 	} 
		// 	else if (step == GuideStep.Func_EndlessTower_6) {
		// 		let tmpPanel = this.UIPanel.FunBox.getTableView("supportMe") as FightSupportMeTable;
		// 		let tempCell = tmpPanel.ItemList.getCell(0) as ProUI.Fuben.Support.HelpMe.ListItemUI;
		// 		tempCell.btnSel.activeEvent();
		// 		GuideMgr.Inst.nextActive();
		// 	}
		// }
	}
}