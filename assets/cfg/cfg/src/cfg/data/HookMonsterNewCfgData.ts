
/**
* 
*  配置数据访问
*/
module cfg
{
	export class HookMonsterNewCfgData extends cfg.HookMonsterNewBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.HookMonsterNewCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
