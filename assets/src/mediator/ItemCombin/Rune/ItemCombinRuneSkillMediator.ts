
module Pro
{
	/**
	* 符文技能列表
	*/
	export class ItemCombinRuneSkillMediator extends BaseMediator implements IMediator
	{
		/** UI面板 */
		UIPanel: ProUI.ItemCombin.Rune.Skill.MainUI;


		/** 天赋列表 */
		SkillTalentList: cfg.SkillNewTalentUpgradeCfgInfo[];

		/** 需要自动加载的资源列表*/
		autoLoadAtlas(): Array<any>
		{
			return null;
		}

		/** UI打开前状态 */
		openUI(): void
		{
			this.showPanel(ProUI.ItemCombin.Rune.Skill.MainUI, 3, BaseAddLayer.TopUI, true);
		}

		/** 关闭UI*/
		closeUI(): void
		{
			this.closePanel();
		}

		/** 模块初始化函数（可以理解为模块的构造函数）， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{
			this.UIPanel.ItemTab.onClick(this, this.onItemTabClick,
				[new component.UITabData("item_combin_msg7"), new component.UITabData("item_combin_msg8"), new component.UITabData("item_combin_msg9"),
				new component.UITabData("item_combin_msg13")],
				[new component.UITabStyle("#f13b54"), new component.UITabStyle("#fffced")]);
		}

		/** 模块被【添加到舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		addEvent(): void
		{
			this.UIPanel.btnClose.onClick(this, this.closeUI);
			this.UIPanel.HelpBtn.onClick(this, this.onClickHelp);
		}

		/** 模块被【移出舞台】时由 模块管理类 内部自动调用, 无需自己调用, */
		removeEvent(): void
		{

		}

		/** 初始化面板(UI每次打开) */
		initUI(): void
		{
			this.UIPanel.ItemTab.setSelectTab(0);
		}

		/** 刷新面板(UI每次重新从队列中弹出)*/
		refreshUI(): void
		{

		}

		/** 点击帮助 */
		private onClickHelp(btn: component.UIButton): void
		{
			CommonHelpView.showWithLangKey(btn, "fuwenskill_help");
		}

		//-------------------------List------------------------
		onItemListRefresh(level: number)
		{
			this.SkillTalentList = cfg.SkillNewTalentUpgradeCfgData.getInfoWithLevel(level);
			this.UIPanel.ItemList.onRefresh(this.SkillTalentList.length, this, this.onItemListRender);
		}

		onItemListRender(itemUI: ProUI.Hero.HeroDetail.UseTalent.TalentItemUI, index: number)
		{
			let tempInfo = this.SkillTalentList[index];
			Global.setResIconWithItemID(itemUI.IconImg, CfgID.ResType.Talent, tempInfo.skillIndex);
			Global.setResQuWithItemID(itemUI.QuImg, CfgID.ResType.Talent, tempInfo.skillIndex);
			itemUI.NameLb.text = tempInfo.name;
			itemUI.onClick(this, () =>
			{
				let data_arr = cfg.SkillNewSkillCfgData.getDataArrayByID(tempInfo.skillID);
				if (data_arr)
				{// 找出对应技能等级天赋技能
					let results = data_arr.filter(e => e.skillLevel == tempInfo.level);
					if (results.length > 0)
						UIManager.Inst.forceOpen(new SkillReviewOpenUIData(0, results[0].skillIndex));
				}
			});
		}

		//-------------------------Tab--------------------------
		onItemTabClick(tab: component.UITab, index: number)
		{
			this.onItemListRefresh(index + 1);
		}
	}
}