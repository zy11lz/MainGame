
module Pro
{
	/**
	 * 普通装备售卖 
	 */
	export class BagNorEquipSellMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Bag.NorEquipSellUI;


		/** 当前选择的品质 */
		QuChoiceNumList: Array<number> = [3];

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
			this.showPanel(ProUI.Bag.NorEquipSellUI, 1, BaseAddLayer.TopUI);
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
			this.UIPanel.ChoiceAllBtn.onClick(this, this.onChoiceAllClick);
			this.UIPanel.ChoiceAllImg.visible = false;
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
				let tmpQuNum = index + 3;
				tmpNameLb.text = Global.getLangStr("equipColor_" + tmpQuNum);
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
						this.UIPanel.ChoiceAllImg.visible = false;
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
			this.UIPanel.StarChoiceBox.onRefresh(10, this, (itemUI: Laya.Box, index: number) =>
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
						this.UIPanel.ChoiceAllImg.visible = false;
					}
					else
					{
						tmpSelImg.visible = true;
						this.StarChoiceNumList.push(tmpQuNum);
					}
				});
			});
		}

		/** 全选 */
		onChoiceAllClick(): void
		{
			if (this.UIPanel.ChoiceAllImg.visible)
			{
				return;
			}
			this.UIPanel.ChoiceAllImg.visible = true;
			this.QuChoiceNumList = [3, 4, 5];
			this.StarChoiceNumList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			this.refreshQuChoiceBox();
			this.refreshStarChoiceBox();
		}

		/** 确定出售 */
		onSureClick(): void
		{

			//赛选合适装备
			let tmpFindItemList = ItemDataMgr.getBagAryWithBagType(Pb_God._emBagType.BagType_Equip);
			let tmpSureItemList = new Array<Pb_God.PBItem>();
			tmpFindItemList.forEach(elment =>
			{
				let tmpQuNum = cfg.ItemCfgData.getQualityById(elment.itemid);
				let tmpStarNum = cfg.ItemCfgData.getStarNumById(elment.itemid);
				if (this.QuChoiceNumList.indexOf(tmpQuNum) >= 0 && this.StarChoiceNumList.indexOf(tmpStarNum) >= 0)
				{
					tmpSureItemList.push(elment);
				}
			});
			if (tmpSureItemList.length == 0)
			{
				TipsUtils.showTipsByLanId("tips_msg11");
				return;
			}

			UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_BagNorEquipSellSure, tmpSureItemList), BaseBackUIType.CloseBackUI);
		}
	}
}