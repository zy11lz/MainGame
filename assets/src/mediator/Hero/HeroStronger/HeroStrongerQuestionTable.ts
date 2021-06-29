
module Pro
{
	/**
     * 常见问题
     */
	export class HeroStrongerQuestionTable extends ProUI.Hero.HeroStronger.Question.MainUI implements ITableView, component.UITableViewDataSource, component.UITableViewDelegate
	{

		/** 标题列表 */
		TitleList: cfg.StrongerQuestionCfgInfo[];

		/** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{
			this.TitleList = cfg.StrongerQuestionCfgData.getAllList();
		}

		/** 页签组件销毁 */
		dispose(): void
		{

		}

		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		addEvent(): void
		{

		}

		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		removeEvent(): void
		{

		}

		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部主动调用,传递参数信息 */
		setData($data: any): void
		{

		}

		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		show(): void
		{
			Laya.timer.frameOnce(2, this, () =>
			{
				this.ItemTableView.setDelegate(this, this);
				this.ItemTableView.setSectionAllIsOn(false);
				this.ItemTableView.reloadData();
			});
		}

		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		hide(): void
		{

		}

		//------------------------------------------- 控制视图绘制 ---------------------------------------------
		/** 获取 Cell 高度，未设置则使用默认高度 */
		tabelView_heightForRowAtIndexPath(tableView: component.UITableView, indexPath: component.UIIndexPath): number
		{
			let tmpTitleInfo = this.TitleList[indexPath.section];
			this.CalaHtml.innerHTML = tmpTitleInfo.des;
			return this.CalaHtml.contextHeight + 35;
		}
		/** 获取当前段落头部的高度 */
		tabelView_heightForHeaderInSection(tableView: component.UITableView, section: number): number
		{
			return 118;
		}
		/** 获取当前段落底部的高度 */
		tabelView_heightForFooterInSection(tableView: component.UITableView, section: number): number
		{
			return 0;
		}

		//--------------------------------------------控制视图数据---------------------------------------
		/** 获取段落总个数 */
		tabelView_numberOfSectionsInTableView(tableView: component.UITableView): number
		{
			return this.TitleList.length;
		}

		/** 获取当前段落Cell的个数 */
		tabelView_numberOfRowsInSection(tableView: component.UITableView, section: number): number
		{
			return 1;
		}

		/** 刷新一个当前段落CellItem */
		tabelView_cellForRowWithRender(tableView: component.UITableView, indexPath: component.UIIndexPath, itemUI: ProUI.Hero.HeroStronger.Question.TableCellUI): void
		{
			let tmpTitleInfo = this.TitleList[indexPath.section];
			itemUI.htmlDes.showText = tmpTitleInfo.des;
		}

		/** 刷新一个当前段落头部Item */
		tabelView_cellForHeadWithRender(tableView: component.UITableView, section: number, itemUI: ProUI.Hero.HeroStronger.Question.TableHeadUI): void
		{
			let tmpTitleInfo = this.TitleList[section];
			itemUI.NameLb.text = tmpTitleInfo.name;
			itemUI.FunLb.text = tableView.getSectionIsOn(section) ? Global.getLangStr("hero_msg56") : Global.getLangStr("hero_msg57"); //收起 or 查看;
			itemUI.FunBtn.onClick(this, () =>
			{
				let isTableOn = !tableView.getSectionIsOn(section);
				tableView.setSectionIsOn(section, isTableOn, true);
				if (isTableOn)
				{
					tableView.scrollSectionByHead(section, component.UITableViewScrollPosition.Top, false);
				}
			});

		}

		/** 刷新一个当前段落尾部Item */
		tabelView_cellForFootWithRender(tableView: component.UITableView, section: number, itemUI: Laya.Sprite): void
		{

		}
	}
}