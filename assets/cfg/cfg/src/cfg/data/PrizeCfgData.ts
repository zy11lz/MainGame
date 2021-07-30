
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PrizeCfgData extends cfg.PrizeBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.PrizeCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
