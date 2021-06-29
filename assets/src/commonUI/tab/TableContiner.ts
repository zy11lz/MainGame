/**
 * TableContiner
 * @author liuyang
 */
module Pro
{
	export class TableContiner extends Laya.Sprite
	{
		protected _displayDic: ds.StringMap<TableBarContinerData>;
		private _instanceDic: ds.StringMap<ITableView>;
		protected _currentDisplaytable: ITableView;
		protected _currentTableName: string = "";


		constructor()
		{
			super();
			this.on(Laya.Event.REMOVED, this, this.dispose);
			this.on(Laya.Event.UNDISPLAY, this, this.onUnDisplay);
		}

        /**
		 * 页签选显卡的容器 
		 * @param pagBarP 			页签组件 
		 * @param displayClassP		每个页签点击后显示的对象的class 需要实现 ITableView
		 * 
		 */
		protected init(displayClassP: TableBarContinerData[])
		{
			this._instanceDic = this._instanceDic || new ds.StringMap<ITableView>();
			this._displayDic = this._displayDic || new ds.StringMap<TableBarContinerData>();
			if (displayClassP != null)
			{
				fly.utils.TemplateUtil.converArrToStringMap(displayClassP, "_tableName", this._displayDic);
				if (displayClassP.length > 0 && (!displayClassP[0].loadRes || displayClassP[0].loadRes.length == 0))
				{
					this.refreshpage(displayClassP[0].tableName);
				}
			}
		}

		/** 当前选择table名称 */
		public get currentTableName(): string
		{
			return this._currentTableName;
		}

		private onUnDisplay(): void
		{
			if (this._currentDisplaytable)
			{
				fly.utils.DisplayUtil.removeForParent(this._currentDisplaytable as any);
				this._currentDisplaytable = null;
			}
		}

		/** 根据table名称刷新页面 */
		protected refreshpage(tableName: string): void
		{
			//var t:number = getTimer();
			var tableBarContinerData: TableBarContinerData = this._displayDic.get(tableName);
			if (tableBarContinerData)
			{
				var dis: ITableView = this.getTableView(tableName);
				if (dis)
				{
					if (this._currentDisplaytable != dis)
					{
						fly.utils.DisplayUtil.removeForParent(this._currentDisplaytable as any);
					}
					this._currentDisplaytable = dis;
					this._currentTableName = tableName;
					this.addChild(dis as any);
				}
			}
			else
			{
				/**<设置不正确的标签，清除显示>*/
				if (this._currentDisplaytable)
				{
					fly.utils.DisplayUtil.removeForParent(this._currentDisplaytable as any);
					this._currentDisplaytable = null;
				}
			}
			//logI(getTimer() - t,"getTimer() - t->TableContiner.refreshpage()");
		}

		/** 根据table名称获取配置的页面 */
		public getTableView(tableName: string): ITableView
		{
			var tableBarContinerData: TableBarContinerData = this._displayDic.get(tableName);
			if (!tableBarContinerData)
			{
				return null;
			}
			var dis: ITableView = this._instanceDic.get(tableName);
			if (dis == null)
			{
				var cls: any = tableBarContinerData.tableClass;
				if (cls != null)
				{
					if (tableBarContinerData.args != null)
					{
						dis = new cls(tableBarContinerData.args);
					}
					else
					{
						dis = new cls();
					}
					dis.initialization();
					dis.on(Laya.Event.DISPLAY, this, this.onTableAddTostage, [dis]);
					dis.on(Laya.Event.UNDISPLAY, this, this.onTableReomveFromstage, [dis]);
					if (this.isITableView(dis))
					{
						this._instanceDic.put(tableName, dis);
					}
					else
					{
						throw new Error("##TableContiner need ITableView child");
					}
				}
			}
			return dis;
		}

		/** 检测table对象是否接入了ITableView接口 */
		private isITableView(obj): boolean
		{
			if (obj == null) return false;
			if ("initialization" in obj && "addEvent" in obj)
			{
				return true;
			}
			return false
		}

		/** 当table页面从舞台中移除，移除事件以及隐藏节点 */
		private onTableReomveFromstage(dis: ITableView): void
		{
			dis.removeEvent();
			dis.hide();
		}

		/** 当table页面从舞台中加入，添加事件以及显示节点 */
		private onTableAddTostage(dis: ITableView): void
		{
			dis.addEvent();
			dis.show();
		}

		/**
		 * 设置pageBar选择到哪一页,标签名
		 */
		public setSelectTable(tableName: string): void
		{
			this.refreshpage(tableName);
		}

		/**
		 * 添加一个页签 
		 * @param tableLabel 页签的标签
		 * @param tableName	 页签的名称
		 * @param tableCls	 页签的类
		 * @param args		 给页签传递的参数
		 * 
		 */
		public addTable(tableLabel: string, tableName: string, tableCls: any, args: Object = null): void
		{
			if (!this.isAlreadyHaveTable(tableName))
			{
				var tableBarContinerData: TableBarContinerData = new TableBarContinerData(tableName, tableCls, args)
				this._displayDic.put(tableName, tableBarContinerData);
			}
		}

		/**
		 * 检测是否存在该页签
		 */
		public isAlreadyHaveTable(tableName: string): boolean
		{
			return this._displayDic.containsKey(tableName)
		}

		public getContinerData(tableName: string): TableBarContinerData
		{
			return this._displayDic.get(tableName);
		}

		/**
		 * 数据清理
		 */
		public dispose(): void
		{
			let keys = this._instanceDic.getKeys();
			for (let key of keys)
			{
				var iTableView: ITableView = this._instanceDic.get(key);
				iTableView.off(Laya.Event.DISPLAY, this, this.onTableAddTostage);
				iTableView.off(Laya.Event.UNDISPLAY, this, this.onTableReomveFromstage);
				iTableView.removeEvent();
				iTableView.dispose();
				iTableView = null;
			}
			this._instanceDic = null;
			this._displayDic = null;
		}
	}

}