
/**
* 
*  配置数据访问
*/
module cfg
{
	export class RiskGuardPrizeCfgData extends cfg.RiskGuardPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.RiskGuardPrizeCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
