
module Pro
{
	/**
	 * 英雄变强
	 */
	export class HeroStrongerMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Hero.HeroStronger.MainUI;


		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return [UrlMgr.getAtlas("herostronger")];
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Hero.HeroStronger.MainUI, 3);
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

			this.UIPanel.FunBox.initData(this.UIPanel.tabGrp, [
				new TableBarContinerData("hero_msg38", "stronger", HeroStrongerStrongerTable),
				new TableBarContinerData("hero_msg39", "resGain", HeroStrongerResGainTable),
				new TableBarContinerData("hero_msg40", "teamCommand", HeroStrongerTeamCommandTable),
				new TableBarContinerData("hero_msg41", "question", HeroStrongerQuestionTable)
			], [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]);

		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		addEvent(): void
		{

		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{

		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{
			let tabNum = this.UIOpenData.customObject ? this.UIOpenData.customObject : 0;
			this.UIPanel.tabGrp.setSelectTab(tabNum);
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
			if (step == GuideStep.HeroStrength_14_4 || step == GuideStep.Func_Fail_2)
			{
				Laya.timer.once(500, this, () =>
				{
					let tmpTable = this.UIPanel.FunBox.getTableView("stronger") as HeroStrongerStrongerTable;
					let tmpItemInfo = tmpTable.ItemLIst.getCell(0) as ProUI.Hero.HeroStronger.Stronger.ListItemUI;
					if (tmpItemInfo)
					{
						GuideMgr.Inst.showFinger(tmpItemInfo.GoBtn, true, tmpItemInfo.GoBtn);
					}
				});
			}
		}

		// /**
		//  * 操作本步引导
		//  */
		// public Guide_Active(step:GuideStep){
		//     if(step == GuideStep.HeroStrength_14_4){
		//         let tmpTable    = this.UIPanel.FunBox.getTableView("stronger") as HeroStrongerStrongerTable;
		// 		let tmpItemInfo = tmpTable.ItemLIst.getCell(0) as ProUI.Hero.HeroStronger.Stronger.ListItemUI;
		// 		tmpItemInfo.GoBtn.activeEvent();
		//         GuideMgr.Inst.nextActive();
		//     }
		// }
	}
}