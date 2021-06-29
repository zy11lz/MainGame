
/**
* 
*  配置数据访问
*/
module cfg
{
	export class StrongerCfgData extends StrongerBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAllList(): StrongerCfgInfo[]
		{
			return this._dataArr;
		}
	}
}

