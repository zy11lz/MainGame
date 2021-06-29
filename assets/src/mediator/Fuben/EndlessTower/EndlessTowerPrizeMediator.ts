
module Pro
{
	/**
	 * 无尽试炼奖励一览
	 */
	export class EndlessTowerPrizeMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.EndlessTower.Prize.MainUI;


		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return [];
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.EndlessTower.Prize.MainUI, 1, BaseAddLayer.CenterUI, true);
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
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{

		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{
			this.UIPanel.ItemList.onRefresh(3, this, (itemUI: ProUI.EndlessTower.Prize.ListItemUI, index: number) =>
			{
				let addItems = [];
				let constantsInfo = cfg.TrainConstantsCfgData.getFirstInfo();
				if (index == 0)
				{
					itemUI.NameLb.text = Global.getLangStr("endlessTower_msg6")//首通奖励";
					addItems = constantsInfo.firstPrize.split(";");
				}
				else if (index == 1)
				{
					itemUI.NameLb.text = Global.getLangStr("endlessTower_msg7");//日常5关挑战奖励"; 
					addItems = constantsInfo.daylyPrize.split(";");
				}
				else if (index == 2)
				{
					itemUI.NameLb.text = Global.getLangStr("endlessTower_msg8"); //排行榜奖励"; 
					addItems = constantsInfo.rankPrize.split(";");
				}
				itemUI.RewardBox.onRefresh(addItems.length, this, (itemInfo: NorItemUI, itemInfoIndex: number) =>
				{
					itemInfo.setItemID(parseInt(addItems[itemInfoIndex]), 0, false, false);
				});
			});
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}
	}
}