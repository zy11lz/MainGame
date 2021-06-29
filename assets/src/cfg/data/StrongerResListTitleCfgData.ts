
/**
* 
*  配置数据访问
*/
module cfg
{
	export class StrongerResListTitleCfgData extends StrongerResListTitleBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAllList(): StrongerResListTitleCfgInfo[]
		{
			return this._dataArr;
		}
	}
}

