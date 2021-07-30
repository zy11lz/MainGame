
/**
* 
*  配置数据访问
*/
module cfg
{
	export class TempleCfgData extends cfg.TempleBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.TempleCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
