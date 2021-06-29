/**
 *
 * 页签选显卡的容器
 * @author fly.liuyang
 * 创建时间：2014-3-17 下午11:52:39
 *
 */
module Pro
{
	export class TableBarContiner extends TableContiner
	{

		/** tab控制 */
		private _tableBar: component.UITab;

		/** tab切换时外部响应 */
		private caller: any;
		private listener: Function;
		protected _isLoading: boolean = false;

		/** 锁定的页签分页(tabName map tipstring) */
		private _lockPageTips: ds.StringMap<string>;


		//--------------------------------------------外部方法---------------------------------------
		/**
		 * 页签选显卡的容器
		 * @param pagBarP 			页签组件
		 * @param displayClassP		每个页签点击后显示的对象的class
		 * @param tabTextStyleList  页签显示样式
		 */
		public initData(pagBarP: component.UITab, displayClassP: TableBarContinerData[], tabTextStyleList?: Array<component.UITabStyle>, defaultIndex: number = 0)
		{
			super.init(displayClassP)
			this._tableBar = pagBarP;

			var arr: Array<component.UITabData> = new Array<component.UITabData>();
			for (var index = 0; index < displayClassP.length; index++)
			{
				var elementTableBarContinerData = displayClassP[index];
				arr.push(new component.UITabData(elementTableBarContinerData.buttonLab, elementTableBarContinerData.tableName, false))
			}
			this._tableBar.onClick(this, this.onItemTabClick, arr, tabTextStyleList);
			this._tableBar.scrollTo(defaultIndex);
			this._tableBar.setSelectTab(defaultIndex);
		}

		/** 重新设置tableList */
		public setTableData(arr: Array<component.UITabData>)
		{
			if (this._tableBar == null)
			{
				return;
			}
			let tmpOldTableInfo = this._tableBar.array[this._tableBar.tabIndex] as component.UITabData;
			let tmpNewTableInfo = this._tableBar.tabIndex < arr.length ? arr[this._tableBar.tabIndex] : null;
			let tmpOldTableName = tmpOldTableInfo.tabName;
			let tmpNewTableName = tmpNewTableInfo != null ? tmpNewTableInfo.tabName : null;
			this._tableBar.setTableData(arr, this._tableBar["tabTextStyleList"]);
			this._tableBar.refresh();
			if (tmpOldTableName != tmpNewTableName || (this._lockPageTips && this._lockPageTips.get(tmpOldTableName)))
			{
				this._tableBar.setSelectTab(0);
			}
			else
			{
				this._tableBar.activeCurrentTab();
			}
		}

		/** tab点击触发 */
		private onItemTabClick(tab: component.UITab, index: number, oldIndex: number)
		{
			var v: component.UITabData = tab.getItem(index) as component.UITabData;
			if (!v) { return; }
			if (this._lockPageTips && this._lockPageTips.get(v.tabName))
			{
				let tipMsg = this._lockPageTips.get(v.tabName);
				if (tipMsg != "$") { TipsUtils.showTips(this._lockPageTips.get(v.tabName)); }
				if (oldIndex < 0 || oldIndex >= tab.length) { oldIndex = 0; }
				tab.setSelectTab(oldIndex);
				return;
			}
			if (this._isLoading)
				return;
			var tableBarContinerData: TableBarContinerData = this._displayDic.get(v.tabName);
			if (tableBarContinerData)
			{
				//加载返回
				let tmpLoadAtlasFun = (statue: boolean) =>
				{
					//加载完成
					WaitPanelUtils.hideWaitPanel();
					this._isLoading = false;
					//加载成功
					if (statue == true)
					{
						ResMgr.Inst.addAtlasReference(tableBarContinerData.loadRes);

						super.setSelectTable(v.tabName);

						//外部响应触发
						if (this.listener != null)
						{
							this.listener.apply(this.caller, [index, v.tabName]);
						}
					}//加载失败
					else
					{
						TipsUtils.showTipsByLanId("tips_msg12");
					}
				};

				if (!tableBarContinerData.loadRes)
				{
					tmpLoadAtlasFun(true);
				}
				else
				{
					this._isLoading = true;
					WaitPanelUtils.showWaitPanel();
					ResMgr.Inst.load(tableBarContinerData.loadRes, this, tmpLoadAtlasFun, null, null, ResReleaseType.None, 0);  //加载优先级设为0（最高）
				}
			}
		}

		/** tab切换时设置外部响应 */
		public onClick(caller: any, listener: Function)
		{
			this.caller = caller;
			this.listener = listener;
		}

		/**
		 * 设置pageBar选择到哪一页,标签名
		 */
		public setSelectTable(tableName: string): void
		{
			let tmpIndex = this.getIndexByTableName(tableName);
			if (tmpIndex != -1)
			{
				this._tableBar.setSelectTab(tmpIndex);
			}
		}

		/** 给一个table页面传递参数 */
		public setTableViewData(tabName: string, $data: any): void
		{
			var tabView: ITableView = this.getTableView(tabName);
			if (tabView != null)
			{
				tabView.setData($data);
			}
		}

		/** 设置分页锁定
		 * @param tips 点击时提示文字
		 */
		public setLockPage(tabName: string, isLock: boolean, tips: string): void
		{
			if (isLock)
			{
				if (!this._lockPageTips) { this._lockPageTips = new ds.StringMap<string>(); }
				this._lockPageTips.put(tabName, tips || "$");
			} else
			{
				if (this._lockPageTips) { this._lockPageTips.remove(tabName); }
			}
		}

		//---------------------------------------------基础方法---------------------------------------
		/** 添加一个table数据页面 */
		public addTable(tableLabel: string, tableName: string, tableCls: any, args: Object = null): void
		{
			if (this.getIndexByTableName(tableName) == -1)
			{
				super.addTable(tableLabel, tableName, tableCls, args);
				this._tableBar.addItem(new component.UITabData(tableLabel, tableName));
			}
		}

		/** 根据一个table名称移除一个页面 */
		public removeTable(tableName: string): void
		{
			var index: number = this.getIndexByTableName(tableName);
			if (index != -1)
			{
				this._tableBar.deleteItem(index);
			}
			if (tableName == this._currentTableName && this._tableBar.length > 0)
			{
				var item: component.UITabData = this._tableBar.getItem(0);
				this.setSelectTable(item.tabName);
			}
		}

		// /**
		//  * 根据table别名获取tab状态新
		//  */
		// private getTableBarItemByTableName(tableName: string): component.UITabData {
		// 	var len: number = this._tableBar.array.length;
		// 	for (var i: number = 0; i < len; i++) {
		// 		var item: component.UITabData = this._tableBar.getItem(i);
		// 		if (item.tabName == tableName) {
		// 			return item;
		// 		}
		// 	}
		// 	return null;
		// }

		/**
		 * 根据table索引获取它的别名
		 */
		public getTableNameByIndex(tabIndex: number): string
		{
			var item: component.UITabData = this._tableBar.getItem(tabIndex);
			if (!item) { return ""; }
			return item.tabName;
		}

		/**
		 * 根据table别名获取它的索引
		 */
		private getIndexByTableName(tableName: string): number
		{
			var len: number = this._tableBar.array.length;
			for (var i: number = 0; i < len; i++)
			{
				var item: component.UITabData = this._tableBar.getItem(i);
				if (item.tabName == tableName)
				{
					return i;
				}
			}
			return -1;
		}
	}
}
