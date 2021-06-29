
/**
* 
*  配置数据访问
*/
module cfg
{
	export class HookSceneCfgData extends HookSceneBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAllList(): HookSceneCfgInfo[]
		{
			return this._dataArr;
		}
	}
}

