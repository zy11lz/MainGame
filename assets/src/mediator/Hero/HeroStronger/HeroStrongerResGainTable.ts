
module Pro
{
	/**
     * 资源获取
     */
	export class HeroStrongerResGainTable extends ProUI.Hero.HeroStronger.ResGain.MainUI implements ITableView, component.UITableViewDataSource, component.UITableViewDelegate
	{

		/** 标题列表 */
		TitleList: cfg.StrongerResListTitleCfgInfo[];

		/** 每个标题对应的列表 */
		DetailDic: ds.StringMap<cfg.StrongerResListDetailCfgInfo[]>;

		/** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{

			this.TitleList = cfg.StrongerResListTitleCfgData.getAllList();
			this.DetailDic = new ds.StringMap<cfg.StrongerResListDetailCfgInfo[]>();
			this.TitleList.forEach(elment =>
			{
				this.DetailDic.put(elment.iD, cfg.StrongerResListDetailCfgData.getListWithTitleID(elment.iD));
			});

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
			this.refreshData();
		}

		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		hide(): void
		{

		}

		//------------------------------------------- 数据准备-------------------------------------------------
		refreshData()
		{
			Laya.timer.frameOnce(2, this, () =>
			{
				this.ItemTableView.setDelegate(this, this);
				this.ItemTableView.setSectionAllIsOn(false);
				this.ItemTableView.reloadData();
			});
		}

		//------------------------------------------- 控制视图绘制 ---------------------------------------------
		/** 获取 Cell 高度，未设置则使用默认高度 */
		tabelView_heightForRowAtIndexPath(tableView: component.UITableView, indexPath: component.UIIndexPath): number
		{
			return 105;
		}
		/** 获取当前段落头部的高度 */
		tabelView_heightForHeaderInSection(tableView: component.UITableView, section: number): number
		{
			return 140;
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
			let tmpDetailList = this.DetailDic.get(this.TitleList[section].iD);
			return tmpDetailList.length;
		}

		/** 刷新一个当前段落CellItem */
		tabelView_cellForRowWithRender(tableView: component.UITableView, indexPath: component.UIIndexPath, itemUI: ProUI.Hero.HeroStronger.ResGain.TableCellUI): void
		{
			let tmpDetailList = this.DetailDic.get(this.TitleList[indexPath.section].iD);
			let tmpDetailInfo = tmpDetailList[indexPath.row];
			itemUI.NameLb.text = tmpDetailInfo.name;
			itemUI.DesLb.text = tmpDetailInfo.des;
			itemUI.ItemInfo.setItemID(tmpDetailInfo.itemID, 0);
			itemUI.GoBtn.onClick(this, () =>
			{
				if (!TaskUtils.gotoOpenByUICfgId(tmpDetailInfo.uIOpenID))
				{
					UIManager.Inst.closeCurrentList();
				}
			});
		}

		/** 刷新一个当前段落头部Item */
		tabelView_cellForHeadWithRender(tableView: component.UITableView, section: number, itemUI: ProUI.Hero.HeroStronger.ResGain.TableHeadUI): void
		{

			let tmpTitleInfo = this.TitleList[section];
			itemUI.ItemInfo.setItemID(tmpTitleInfo.itemID, 1);
			itemUI.NameLb.text = tmpTitleInfo.name;
			itemUI.DesLb.text = tmpTitleInfo.des;
			itemUI.FunLb.text = tableView.getSectionIsOn(section) ? Global.getLangStr("hero_msg56") : Global.getLangStr("hero_msg58"); //收起 or 展开; 
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