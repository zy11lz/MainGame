
/**
* 
*  配置数据访问
*/
module cfg
{
	export class TreasureCostCfgData extends cfg.TreasureCostBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.TreasureCostCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
