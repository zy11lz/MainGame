
/**
* 
*  配置数据访问
*/
module cfg
{
	export class StrongerCfgData extends cfg.StrongerBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.StrongerCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
