
/**
* 
*  配置数据访问
*/
module cfg
{
	export class JoyousLinkupJoyousLinkupCfgData extends cfg.JoyousLinkupJoyousLinkupBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.JoyousLinkupJoyousLinkupCfgInfo>):void
		{
			super.setup(dataArr);
		}
		public static getActivityCfgInfo()
		{
			return cfg.ActivityCfgData.getListByType(Pb_God._emActivityType.Activity_JoyousLinkup)[0];
		}
	}
}
 
