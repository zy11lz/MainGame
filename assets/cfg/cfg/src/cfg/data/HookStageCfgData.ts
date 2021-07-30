
/**
* 
*  配置数据访问
*/
module cfg
{
	export class HookStageCfgData extends cfg.HookStageBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.HookStageCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
