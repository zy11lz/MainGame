
/**
* 
*  配置数据访问
*/
module cfg
{
	export class HookStagePrizeCfgData extends cfg.HookStagePrizeBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.HookStagePrizeCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
