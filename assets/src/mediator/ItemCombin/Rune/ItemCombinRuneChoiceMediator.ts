
module Pro
{
	/**
	 * 选择符文
	 */
	export class ItemCombinRuneChoiceMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.ItemCombin.Rune.Choice.MainUI;


		/** 已选择索引 */
		ChoiceList: Array<Pb_God.PBItem>;

		/** 符文可选择个数 */
		ChoiceMaxNum = 5;

		/** 符文列表 */
		RuneList: Array<Pb_God.PBItem>;

		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return null;
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.ItemCombin.Rune.Choice.MainUI, 1, BaseAddLayer.TopUI, true);
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
			this.UIPanel.btnClose.onClick(this, this.closeUI);
			this.UIPanel.SureBtn.onClick(this, () =>
			{
				this.closeUI();
				EventMgr.trigger(EventNotify.ItemCombin_Rune_Choice, this.ChoiceList);
			});
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{

		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{
			this.ChoiceList = this.UIOpenData.customObject;
			this.RuneList = ItemDataMgr.getRuneAryForCombin();
			this.UIPanel.img_empty.visible = this.RuneList.length == 0;
			this.UIPanel.ItemList.onRefresh(this.RuneList.length, this, this.onItemListRender);
			this.UIPanel.TipLb.text = Global.getLangStr("item_combin_msg2", this.ChoiceList.length, this.ChoiceMaxNum);
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}

		onItemListRender(itemUI: ProUI.ItemCombin.Rune.Choice.ListItemUI, index: number)
		{

			let tempInfo = this.RuneList[index];
			Global.setResIconWithItemID(itemUI.IconImg, CfgID.ResType.Item, tempInfo.itemid);
			Global.setResQuWithItemID(itemUI.ItemBtn, CfgID.ResType.Item, tempInfo.itemid);
			itemUI.SelectImg.visible = this.ChoiceList.indexOf(tempInfo) >= 0;
			itemUI.SelectBtn.onClick(this, this.onItemSelectClick);
			itemUI.ItemBtn.onClick(this, () =>
			{
				UIManager.Inst.forceOpen(new ItemReviewOpenUIData(tempInfo));
			});
		}

		onItemSelectClick(btn: component.UIButton)
		{
			let itemUI = btn.parent as ProUI.ItemCombin.Rune.Choice.ListItemUI;
			let tempIndex = parseInt(itemUI.name);
			let tempInfo = this.RuneList[tempIndex];
			let tempSelectIndex = this.ChoiceList.indexOf(tempInfo);
			if (tempSelectIndex >= 0)
			{
				this.ChoiceList.splice(tempSelectIndex, 1);
			}
			else if (this.ChoiceList.length > 0)
			{
				if (this.ChoiceList[0].itemid != tempInfo.itemid)
				{
					TipsUtils.showTipsByLanId("item_combin_msg3");
					return;
				}
				if (this.ChoiceList.length >= 5)
				{
					TipsUtils.showTipsByLanId("item_combin_msg4");
					return;
				}
				this.ChoiceList.push(tempInfo);
			}
			else
			{
				if (this.ChoiceList.length >= 5)
				{
					TipsUtils.showTipsByLanId("item_combin_msg4");
					return;
				}
				this.ChoiceList.push(tempInfo);
			}

			itemUI.SelectImg.visible = !(tempSelectIndex >= 0);
			this.UIPanel.TipLb.text = Global.getLangStr("item_combin_msg2", this.ChoiceList.length, this.ChoiceMaxNum);
		}
	}
}