
module Pro
{
	/**
	 * 掉落-boss
	 */
	export class DropBossInfoTable extends ProUI.Fuben.DropInfo.BossDrop.MainUI implements ITableView, component.UITableViewDataSource, component.UITableViewDelegate
	{

		/** 场景列表 */
		TitleList: cfg.HookSceneCfgInfo[] = [];

		/** 当前场景ID */
		TmpSceneID: number;

		/** 页签显示对象的初始化函数， 只会在面板初始化的时候调用一次，其他任何时候都不会调用， */
		initialization(): void
		{

		}

		//-------------------------------------------------------------------------------------------
		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		addEvent(): void
		{

		}
		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		removeEvent(): void
		{

		}

		/** 在页签显示对象被【添加到舞台】时由 TableContiner 内部自动调用 */
		show(): void
		{

			this.TitleList.splice(0, this.TitleList.length);
			let tmpStageId = Math.max(1, HookDataMgr.getStageID());
			let tmpSceneId = cfg.HookStageCfgData.getSceneIDByStageID(tmpStageId);
			let tmpSceneList = cfg.HookSceneCfgData.getAllList();
			for (let i = 0; i < tmpSceneList.length; i++)
			{
				let tmpInfo = tmpSceneList[i];
				if (tmpInfo.sceneID <= tmpSceneId + 1)
				{
					this.TitleList.push(tmpInfo);
				}
			}
			this.TmpSceneID = tmpSceneId;

			Laya.timer.frameOnce(2, this, () =>
			{

				this.ItemTableView.setDelegate(this, this);
				this.ItemTableView.setSectionAllIsOn(false);
				this.ItemTableView.reloadData();

				let tmpSelSection = tmpSceneId - 1;
				this.ItemTableView.setSectionIsOn(tmpSelSection, true, true);
				this.ItemTableView.scrollSectionByHead(tmpSelSection, component.UITableViewScrollPosition.Top, false);

			});
		}

		/** 在页签显示对象被【移出舞台】时由 TableContiner 内部自动调用 */
		hide(): void
		{

		}

		setData($data: any): void
		{

		}

		/** 页签组件销毁 */
		dispose(): void
		{

		}

		//------------------------------------------- 控制视图绘制 ---------------------------------------------
		/** 获取 Cell 高度，未设置则使用默认高度 */
		tabelView_heightForRowAtIndexPath(tableView: component.UITableView, indexPath: component.UIIndexPath): number
		{
			return 171;
		}
		/** 获取当前段落头部的高度 */
		tabelView_heightForHeaderInSection(tableView: component.UITableView, section: number): number
		{
			return 55;
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
			let tmpTitleInfo = this.TitleList[section];
			let tmpStageList = cfg.HookBossDropInfoCfgData.getListWithSceneID(tmpTitleInfo.sceneID);
			return tmpStageList.length;
		}

		/** 刷新一个当前段落CellItem */
		tabelView_cellForRowWithRender(tableView: component.UITableView, indexPath: component.UIIndexPath, itemUI: ProUI.Fuben.DropInfo.DropItemUI): void
		{
			let tmpTitleInfo = this.TitleList[indexPath.section];
			let tmpStageList = cfg.HookBossDropInfoCfgData.getListWithSceneID(tmpTitleInfo.sceneID);
			let tmpStageInfo = tmpStageList[indexPath.row];
			let tmpDropList = cfg.HookBossDropInfoCfgData.getItemIDAryByIndex(tmpStageInfo.index);

			itemUI.NameLb.text = tmpTitleInfo.chapterName + " " + tmpStageInfo.stage;
			itemUI.ItemList.onRefresh(tmpDropList.length, this, (item: NorItemUI, index: number) =>
			{
				item.setItemID(tmpDropList[index].value1, 0);
			});
		}

		/** 刷新一个当前段落头部Item */
		tabelView_cellForHeadWithRender(tableView: component.UITableView, section: number, itemUI: ProUI.Fuben.DropInfo.BossDrop.TableHeadUI): void
		{
			let tmpTitleInfo = this.TitleList[section];
			itemUI.NameLb.text = tmpTitleInfo.chapterName + " " + tmpTitleInfo.sceneName;
			itemUI.HeadSelImg.rotation = tableView.getSectionIsOn(section) ? 0 : 180;
			itemUI.SuoImg.visible = tmpTitleInfo.sceneID > this.TmpSceneID;
			itemUI.HeadSelImg.visible = tmpTitleInfo.sceneID <= this.TmpSceneID;
			itemUI.HeadBtn.onClick(this, () =>
			{
				if (tmpTitleInfo.sceneID > this.TmpSceneID)
				{
					let tmpCurChapName = cfg.HookSceneCfgData.getChapterNameBySceneID(this.TmpSceneID);
					TipsUtils.showTips(Global.getLangStr("hook_msg14", tmpCurChapName));
					return;
				}
				let isTableOn = !tableView.getSectionIsOn(section);
				tableView.setSectionIsOn(section, isTableOn, true);
				if (isTableOn)
				{
					tableView.scrollSectionByHead(section, component.UITableViewScrollPosition.Middle, false);
				}
			});
		}

		/** 刷新一个当前段落尾部Item */
		tabelView_cellForFootWithRender(tableView: component.UITableView, section: number, itemUI: Laya.Sprite): void
		{

		}
	}
}