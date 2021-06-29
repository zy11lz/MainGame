
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ShapeBadgeCfgData extends ShapeBadgeBaseCfgData
	{
		constructor()
		{
			super();
		}

		protected static _listByType: Object;
		/** 根据类型获取列表 */
		public static getListByType(value: number): ShapeBadgeCfgInfo[]
		{
			if (this._listByType == null)
			{
				this._listByType = TemplateUtil.createSimpleIndexFromObj(this._dataArr, "type");
			}
			return this._listByType[value] || [];
		}

	}
}

