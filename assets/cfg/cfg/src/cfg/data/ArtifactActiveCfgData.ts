
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ArtifactActiveCfgData extends cfg.ArtifactActiveBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.ArtifactActiveCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
