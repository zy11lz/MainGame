
/**
* 
*  配置数据访问
*/
module cfg
{
	export class IncubateConstCfgData extends cfg.IncubateConstBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.IncubateConstCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
