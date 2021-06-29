
module Pro
{
	/**
	 * 先知奖励预览
	 */
	export class HeroExchangeRewardMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Hero.HeroExchange.Reward.MainUI;


		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return null;
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Hero.HeroExchange.Reward.MainUI, 3, BaseAddLayer.CenterUI, true);
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
			let tmpCallType = this.UIOpenData.customObject as number;
			let tmpShowPetAry = new Array<cfg.PetCallCallPoolCfgInfo>();
			cfg.PetCallCallPoolCfgData.getDataAll().forEach(element =>
			{
				if (element.callType == tmpCallType)
				{
					tmpShowPetAry.push(element);
				}
			});
			this.UIPanel.ItemList.onRefresh(tmpShowPetAry.length, this, (itemUI: NorItemUI, index: number) =>
			{

				let tmpInfo = tmpShowPetAry[index];
				let tmpItemInfo = cfg.PetCallCallPoolCfgData.getAddItemAryById(tmpInfo.index);
				itemUI.setItemInfo(tmpItemInfo, true, true, false);

				itemUI.NameLb.text = Global.parsePercentNum(tmpInfo.rate / 10000, 3);

			});
			this.UIPanel.ItemList.scrollTo(0);
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}
	}
}