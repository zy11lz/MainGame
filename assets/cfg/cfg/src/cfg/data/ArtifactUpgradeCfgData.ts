
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ArtifactUpgradeCfgData extends cfg.ArtifactUpgradeBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.ArtifactUpgradeCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
