
module Pro
{
	/**
	 * 神装售卖 
	 */
	export class BagGodEquipSellMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Bag.GodEquipSellUI;


		/** 当前选择的品质 */
		QuChoiceNumList: Array<number> = [1];

		/** 当前选择的星级 */
		StarChoiceNumList: Array<number> = [1];

		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return null;
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Bag.GodEquipSellUI, 1, BaseAddLayer.TopUI);
		}

		/** 关闭UI*/
		closeUI(): void
		{
			this.closePanel();
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{
			this.UIPanel.CloseBtn.onClick(this, this.closeUI);
			this.UIPanel.SureBtn.onClick(this, this.onSureClick);
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
			this.refreshQuChoiceBox();
			this.refreshStarChoiceBox();
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}

		/** 刷新品质选择 */
		refreshQuChoiceBox()
		{
			this.UIPanel.QuChoiceBox.onRefresh(3, this, (itemUI: Laya.Box, index: number) =>
			{
				let tmpSelBtn = itemUI.getChildAt(0) as component.UIButton;
				let tmpSelImg = tmpSelBtn.getChildAt(0) as Laya.Image;
				let tmpNameLb = itemUI.getChildAt(1) as component.UILabel;
				let tmpQuNum = index + 1;
				tmpNameLb.text = Global.getLangStr("godQu_" + index);
				tmpSelImg.visible = this.QuChoiceNumList.indexOf(tmpQuNum) >= 0;
				tmpSelBtn.onClick(this, () =>
				{
					if (tmpSelImg.visible)
					{
						if (this.QuChoiceNumList.length == 1)
						{
							TipsUtils.showTipsByLanId("tips_msg9");
							return;
						}
						tmpSelImg.visible = false;
						this.QuChoiceNumList.splice(this.QuChoiceNumList.indexOf(tmpQuNum), 1);
					}
					else
					{
						tmpSelImg.visible = true;
						this.QuChoiceNumList.push(tmpQuNum);
					}
				});
			});
		}

		/** 刷新星级选择 */
		refreshStarChoiceBox()
		{
			this.UIPanel.StarChoiceBox.onRefresh(4, this, (itemUI: Laya.Box, index: number) =>
			{
				let tmpSelBtn = itemUI.getChildAt(0) as component.UIButton;
				let tmpSelImg = tmpSelBtn.getChildAt(0) as Laya.Image;
				let tmpNameLb = itemUI.getChildAt(1) as component.UILabel;
				let tmpQuNum = index + 1;
				tmpNameLb.text = Global.getLangStr("common_star", Global.numberToChinese(tmpQuNum));
				tmpSelImg.visible = this.StarChoiceNumList.indexOf(tmpQuNum) >= 0;
				tmpSelBtn.onClick(this, () =>
				{
					if (tmpSelImg.visible)
					{
						if (this.StarChoiceNumList.length == 1)
						{
							TipsUtils.showTipsByLanId("tips_msg10");
							return;
						}
						tmpSelImg.visible = false;
						this.StarChoiceNumList.splice(this.StarChoiceNumList.indexOf(tmpQuNum), 1);
					}
					else
					{
						tmpSelImg.visible = true;
						this.StarChoiceNumList.push(tmpQuNum);
					}
				});
			});
		}

		/** 确定出售 */
		onSureClick(): void
		{

			let tmpItemList = ItemDataMgr.getBagAryWithBagType(Pb_God._emBagType.BagType_GodEquip);
			let tmpSureList = [];
			tmpItemList.forEach(elment =>
			{
				let tmpQuNum = cfg.ItemCfgData.getQualityById(elment.itemid) + 1;
				let tmpStarNum = cfg.ItemCfgData.getStarNumById(elment.itemid);
				if (this.QuChoiceNumList.indexOf(tmpQuNum) >= 0 && this.StarChoiceNumList.indexOf(tmpStarNum) >= 0)
				{
					tmpSureList.push(elment.itemsn);
				}
			});
			if (tmpSureList.length == 0)
			{
				TipsUtils.showTipsByLanId("tips_msg11");
				return;
			}

			//确定出售
			this.closeUI();
			ItemSend.sellOneKey(tmpSureList);
		}
	}
}