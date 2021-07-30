
/**
* 
*  配置数据访问
*/
module cfg
{
	export class TabletCreationCfgData extends cfg.TabletCreationBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.TabletCreationCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
