
module Pro
{
	/**
	 * 掉落信息
     */
	export class DropInfoMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Fuben.DropInfo.MainUI;


		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return null;
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Fuben.DropInfo.MainUI, 1, BaseAddLayer.TopUI, true);
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
				new TableBarContinerData("hook_msg7", "bossDrop", DropBossInfoTable),
				new TableBarContinerData("hook_msg8", "hookDrop", DropHookInfoTable)
			], [new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]);

			this.UIPanel.btnClose.onClick(this, this.closeUI);
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
			// Laya.timer.callLater(this.UIPanel.ItemTab, this.UIPanel.ItemTab.scrollTo, [100]);
			this.UIPanel.ItemTab.setSelectTab(0);
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}
	}
}