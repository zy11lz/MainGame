
/**
* 
*  配置数据访问
*/
module cfg
{
	export class RiskFingerPrizeCfgData extends cfg.RiskFingerPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.RiskFingerPrizeCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
