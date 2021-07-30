
/**
* 
*  配置数据访问
*/
module cfg
{
	export class GmCfgData extends cfg.GmBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.GmCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
