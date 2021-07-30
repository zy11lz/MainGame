
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ItemCfgData extends cfg.ItemBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.ItemCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
