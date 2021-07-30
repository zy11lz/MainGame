
/**
* 
*  配置数据访问
*/
module cfg
{
	export class LotteryTypeCfgData extends cfg.LotteryTypeBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.LotteryTypeCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
