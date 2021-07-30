
/**
* 
*  配置数据访问
*/
module cfg
{
	export class TabletCfgData extends cfg.TabletBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.TabletCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
