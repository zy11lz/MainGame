
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ActivitybossBuyCountCfgData extends cfg.ActivitybossBuyCountBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.ActivitybossBuyCountCfgInfo>):void
		{
			super.setup(dataArr);
		}

		public static getAll()
		{
			return this._dataArr;
		}
	}
}
 
