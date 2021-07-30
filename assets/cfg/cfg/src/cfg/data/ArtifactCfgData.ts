
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ArtifactCfgData extends cfg.ArtifactBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.ArtifactCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
