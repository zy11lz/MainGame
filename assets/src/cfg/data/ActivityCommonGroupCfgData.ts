
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ActivityCommonGroupCfgData extends ActivityCommonGroupBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAll(): ActivityCommonGroupCfgInfo[]
		{
			return this._dataArr;
		}
	}
}

