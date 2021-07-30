
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ConstantCfgData extends cfg.ConstantBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.ConstantCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
