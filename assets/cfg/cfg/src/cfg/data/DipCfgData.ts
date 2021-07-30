
/**
* 
*  配置数据访问
*/
module cfg
{
	export class DipCfgData extends cfg.DipBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.DipCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
