
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PrivilegeDailyPrizeCfgData extends cfg.PrivilegeDailyPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.PrivilegeDailyPrizeCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
