
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PlayerLevelCfgData extends cfg.PlayerLevelBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.PlayerLevelCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
