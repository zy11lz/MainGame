
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ItemCompoundCfgData extends cfg.ItemCompoundBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.ItemCompoundCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
