
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ChampionTopPrizeCfgData extends cfg.ChampionTopPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.ChampionTopPrizeCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
