
/**
* 
*  配置数据访问
*/
module cfg
{
	export class StrongerFunListCfgData extends StrongerFunListBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAllList(): StrongerFunListCfgInfo[]
		{
			return this._dataArr;
		}
	}
}

