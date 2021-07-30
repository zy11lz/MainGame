
/**
* 
*  配置数据访问
*/
module cfg
{
	export class CustomGiftCfgData extends cfg.CustomGiftBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.CustomGiftCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
