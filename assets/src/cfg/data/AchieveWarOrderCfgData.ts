
/**
* 
*  配置数据访问
*/
module cfg
{
	export class AchieveWarOrderCfgData extends AchieveWarOrderBaseCfgData
	{
		constructor()
		{
			super();
		}

		/** 一个类型对应一个列表 */
		protected static _listByType: Object;
		public static getListByType(value: number): AchieveWarOrderCfgInfo[]
		{
			if (this._listByType == null)
			{
				this._listByType = TemplateUtil.createSimpleIndexFromObj(this._dataArr, "type");
			}
			return this._listByType[value] || [];
		}

	}
}

