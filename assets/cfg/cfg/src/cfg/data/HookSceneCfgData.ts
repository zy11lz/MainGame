
/**
* 
*  配置数据访问
*/
module cfg
{
	export class HookSceneCfgData extends cfg.HookSceneBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.HookSceneCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
