
/**
* 
*  配置数据访问
*/
module cfg
{
	export class HolyUpgradeCfgData extends cfg.HolyUpgradeBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.HolyUpgradeCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
