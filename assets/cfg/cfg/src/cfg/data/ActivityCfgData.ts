
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ActivityCfgData extends cfg.ActivityBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.ActivityCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
