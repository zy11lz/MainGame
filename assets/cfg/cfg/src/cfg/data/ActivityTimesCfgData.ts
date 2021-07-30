
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ActivityTimesCfgData extends cfg.ActivityTimesBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.ActivityTimesCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
