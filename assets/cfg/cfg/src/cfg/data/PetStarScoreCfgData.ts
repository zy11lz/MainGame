
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PetStarScoreCfgData extends cfg.PetStarScoreBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.PetStarScoreCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
