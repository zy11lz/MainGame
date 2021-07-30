
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PetUpgradeCfgData extends cfg.PetUpgradeBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.PetUpgradeCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
