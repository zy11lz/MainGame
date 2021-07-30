
/**
* 
*  配置数据访问
*/
module cfg
{
	export class WealOnlinePrizeCfgData extends cfg.WealOnlinePrizeBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.WealOnlinePrizeCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
