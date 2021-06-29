/**
 *
 * 页签组件的每页的数据
 * @author fly.liuyang
 * 创建时间：2014-3-25 上午11:28:24
 * 
 */
module Pro
{

	export class TableBarContinerData
	{
		private _tableName: string;
		private _buttonLab: string;
		private _tableClass: any;
		private _args: Object;
		private _loadRes: string[];

		/**
		 * 页签组件的每页的数据
		 * @param $tableName 	对应dataProvider里设的data
		 * @param $tableClass	每个页签点击后显示的对象的class 需要实现 ITableView
		 * 
		 */
		constructor($buttonLab: string, $tableName: string, $tableClass: any, $args: Object = null, loadRes: string[] = [])
		{
			this._tableName = $tableName;
			this._tableClass = $tableClass;
			this._buttonLab = $buttonLab;
			this._args = $args;
			this._loadRes = loadRes;
		}

		public get args(): Object
		{
			return this._args;
		}

		/**
		 * 对应dataProvider里设的data 
		 * @return 
		 * 
		 */
		public get tableName(): string
		{
			return this._tableName;
		}

		/**
		 *  每个页签点击后显示的对象的class 需要实现 ITableView
		 * @return 
		 * 
		 */
		public get tableClass(): any
		{
			return this._tableClass;
		}

		public get buttonLab(): string
		{
			return this._buttonLab;
		}

		public get loadRes():string[]
		{
			return this._loadRes;
		}
	}
}
