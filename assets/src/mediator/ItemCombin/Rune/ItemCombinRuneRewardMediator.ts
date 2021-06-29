
module Pro
{
	/**
	 * 符文奖励
	 */
	export class ItemCombinRuneRewardMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.ItemCombin.Rune.Reward.MainUI;


		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return null;
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.ItemCombin.Rune.Reward.MainUI, 1, BaseAddLayer.TopUI, true);
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
				ItemSend.runeExchange();

				//如果材料不够下次兑换时， 将界面关闭（禅道：id 512）				
				let tmpLimitScore = ItemDataMgr.getRuneExchangeScore();
				let tmpExchangeItemID = ItemDataMgr.getRuneExchangeItem();
				if (!Global.isFullRes(CfgID.ItemID.RonglianRuneScore, tmpLimitScore * 2, false))
				{
					this.closeUI();
				}
			});
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{

		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{
			let tmpLimitScore = ItemDataMgr.getRuneExchangeScore();
			let tmpExchangeItemID = ItemDataMgr.getRuneExchangeItem();
			this.UIPanel.SureBtn.disabled = Global.getItemNum(CfgID.ItemID.RonglianRuneScore) < tmpLimitScore;
			this.UIPanel.ItemUI.setItemID(tmpExchangeItemID, 0, false);
			this.UIPanel.TipsLb.text = Global.getLangStr("item_combin_msg5", tmpLimitScore, cfg.ItemCfgData.getNameById(tmpExchangeItemID));
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}

	}
}