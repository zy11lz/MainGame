
/**
* 
*  配置数据访问
*/
module cfg
{
	export class DanTopPrizeCfgData extends cfg.DanTopPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.DanTopPrizeCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
