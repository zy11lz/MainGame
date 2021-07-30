
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ActivityChargeDaysCfgData extends cfg.ActivityChargeDaysBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.ActivityChargeDaysCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
