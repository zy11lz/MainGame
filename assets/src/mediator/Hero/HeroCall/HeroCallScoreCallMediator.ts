
module Pro
{
	/**
	 * 召唤积分奖励
	 */
	export class HeroCallScoreCallMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Hero.HeroCall.ScoreCall.MainUI;


		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return null;
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Hero.HeroCall.ScoreCall.MainUI, 1, BaseAddLayer.TopUI, true);
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
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{

		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{

			let tempJifenCallType = CallDataMgr.getJifenCallType();
			let tempOneNeedItem = cfg.PetCallCallCostCfgData.getNeedItemAryByTypeAndCount(tempJifenCallType, 1)[0];
			let tempCallPoint = Global.getItemNum(tempOneNeedItem.itemid);
			this.UIPanel.ItemUI.setItemID(90509, 0, false);
			this.UIPanel.TipsLb.text = Global.getLangStr("hero_msg2", tempOneNeedItem.itemcount);

			//判断VIP等级
			let needVip = cfg.PetCallCallCfgData.getNeedVipLevelByCallType(tempJifenCallType);
			this.UIPanel.txtVipTips.text = Global.getLangStr("hero_msg16", needVip); //vip3方可召唤
			this.UIPanel.txtVipTips.visible = PrivilegeDataMgr.vipLevel < needVip;
			this.UIPanel.SureBtn.disabled = tempCallPoint < tempOneNeedItem.itemcount || PrivilegeDataMgr.vipLevel < needVip;

			this.UIPanel.SureBtn.onClick(this, () =>
			{
				if (CallDataMgr.sendCall(tempJifenCallType, false))
				{
					//如果材料不够下次召唤时， 将界面关闭 （禅道：id 512）	
					if (!Global.isFullRes(tempOneNeedItem.itemid, tempOneNeedItem.itemcount * 2, false))
					{
						this.closeUI();
					}
				}
			});
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}

	}
}