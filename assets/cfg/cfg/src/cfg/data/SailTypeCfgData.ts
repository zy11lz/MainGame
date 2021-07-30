
/**
* 
*  配置数据访问
*/
module cfg
{
	export class SailTypeCfgData extends cfg.SailTypeBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.SailTypeCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
