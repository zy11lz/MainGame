
/**
* 
*  配置数据访问
*/
module cfg
{
	export class GmCfgData extends GmBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataList(): GmCfgInfo[]
		{
			return this._dataArr;
		}
	}
}

