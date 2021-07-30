
/**
* 
*  配置数据访问
*/
module cfg
{
	export class HookActivityDropCfgData extends cfg.HookActivityDropBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.HookActivityDropCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
