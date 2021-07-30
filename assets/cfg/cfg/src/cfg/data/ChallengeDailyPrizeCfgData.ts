
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ChallengeDailyPrizeCfgData extends cfg.ChallengeDailyPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.ChallengeDailyPrizeCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
