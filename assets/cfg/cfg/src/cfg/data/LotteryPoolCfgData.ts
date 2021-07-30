
/**
* 
*  配置数据访问
*/
module cfg
{
	export class LotteryPoolCfgData extends cfg.LotteryPoolBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.LotteryPoolCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
