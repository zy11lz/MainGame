
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ChallengeSeasonPrizeCfgData extends cfg.ChallengeSeasonPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.ChallengeSeasonPrizeCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
