
/**
* 
*  配置数据访问
*/
module cfg
{
	export class RiskEventCfgData extends cfg.RiskEventBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.RiskEventCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
