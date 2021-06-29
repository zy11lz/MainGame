
module Pro
{
	/**
	 * 召唤规则
	 */
	export class HeroCallRuleMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.Hero.HeroCall.Rule.MainUI;


		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return [];
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.Hero.HeroCall.Rule.MainUI, 3, BaseAddLayer.TopUI, true);
		}

		/** 关闭UI*/
		closeUI(): void
		{
			this.closePanel();
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{

			this.UIPanel.InfoPanel.vScrollBarSkin = null;
			this.UIPanel.InfoPanel.vScrollBar.elasticDistance = this.UIPanel.InfoPanel.height / 2;

			this.UIPanel.ruleInfo_des_1_lb.innerHTML = Global.getLangStr("heroCall_des_1");

			this.UIPanel.ruleInfo_des_2_lb.innerHTML = Global.getLangStr("heroCall_des_2");

			let tmpStartY = this.UIPanel.Info_des_1_box.y + this.UIPanel.ruleInfo_des_1_lb.y + this.UIPanel.ruleInfo_des_1_lb.height + 10;
			for (let i = 1; i <= 4; i++)
			{

				let tempUI = new ProUI.Hero.HeroCall.Rule.ruleInfo_prob_itemUI();
				this.UIPanel.InfoPanel.content.addChild(tempUI);
				tempUI.x = 7;
				tempUI.y = tmpStartY;

				let tmpStarRateList = cfg.PetCallCallCfgData.getStarRateAryById(i);
				tempUI.DesBtn.onClick(this, () =>
				{
					UIManager.Inst.forceOpen(new BaseOpenUIData(PanelNotify.Open_HeroCallRuleDetail, i));
				});
				tempUI.NameLb.text = cfg.PetCallCallCfgData.getNameByCallType(i);
				tempUI.ProbItemBox.onRefresh(tmpStarRateList.length, this, (itemUI: ProUI.Hero.HeroCall.Rule.ruleInfo_lb_itemUI, index: number) =>
				{
					let tempInfo = tmpStarRateList[index];
					itemUI.NameLb.text = Global.getLangStr("hero_msg1", tempInfo.value2);
					itemUI.ProbLb.text = (tempInfo.value1 / 100).toFixed(2) + "%";
				});

				tmpStartY += tempUI.ProbItemBox.getCellTrueHeight() + tempUI.ProbItemBox.y + 10;
			}

			this.UIPanel.Info_des_2_box.y = tmpStartY;
			this.UIPanel.Info_des_2_box.height = this.UIPanel.ruleInfo_des_2_lb.y + this.UIPanel.ruleInfo_des_2_lb.height + 10;


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

		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}

	}
}