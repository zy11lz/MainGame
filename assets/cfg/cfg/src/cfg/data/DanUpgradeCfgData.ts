
/**
* 
*  配置数据访问
*/
module cfg
{
	export class DanUpgradeCfgData extends cfg.DanUpgradeBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.DanUpgradeCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
