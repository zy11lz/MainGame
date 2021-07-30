
/**
* 
*  配置数据访问
*/
module cfg
{
	export class RiskRefreshCfgData extends cfg.RiskRefreshBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.RiskRefreshCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
