
/**
* 
*  配置数据访问
*/
module cfg
{
	export class LadderTopPrizeCfgData extends cfg.LadderTopPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.LadderTopPrizeCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
