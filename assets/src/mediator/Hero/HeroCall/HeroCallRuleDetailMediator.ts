
module Pro
{
	/**
	 * 英雄召唤实际每个英雌的概率
     */
	export class HeroCallRuleDetailMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Hero.HeroCall.RuleDetail.MainUI;


		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return null;
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Hero.HeroCall.RuleDetail.MainUI, 3, BaseAddLayer.TopUI, true);
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
			let tmpStarRateAry = cfg.PetCallCallCfgData.getStarRateAryById(tmpCallType);
			let tmpTypeRateAry = cfg.PetCallCallCfgData.getTypeRateAryById(tmpCallType);
			let tmpStartStarNum = tmpStarRateAry[0].value2;
			let tmpEndStarNum = tmpStarRateAry[tmpStarRateAry.length - 1].value2;
			let tmpShowPetAry = new Array<cfg.PetCallCommonPoolCfgInfo>();
			cfg.PetCallCommonPoolCfgData.getDataAll().forEach(element =>
			{
				if (element.petStar >= tmpStartStarNum && element.petStar <= tmpEndStarNum)
				{
					tmpShowPetAry.push(element);
				}
			});
			this.UIPanel.ItemList.onRefresh(tmpShowPetAry.length, this, (itemUI: NorItemUI, index: number) =>
			{

				let tmpInfo = tmpShowPetAry[index];
				let skinId = cfg.PetCfgData.getBaseSkinByPetID(tmpInfo.petID);
				itemUI.setPetUI(skinId, tmpInfo.petStar, false);

				let tmpProbValue = tmpStarRateAry[tmpInfo.petStar - tmpStartStarNum].value1 / 10000 * tmpTypeRateAry[tmpInfo.petType - 1].value1 / 10000 * tmpInfo.rate / 10000;
				itemUI.NameLb.visible = true;
				itemUI.NameLb.text = (tmpProbValue * 100).toFixed(3) + "%";

			});
			this.UIPanel.ItemList.scrollTo(0);
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}
	}
}