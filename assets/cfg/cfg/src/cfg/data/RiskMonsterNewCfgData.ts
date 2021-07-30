
/**
* 
*  配置数据访问
*/
module cfg
{
	export class RiskMonsterNewCfgData extends cfg.RiskMonsterNewBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.RiskMonsterNewCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
