
/**
* 
*  配置数据访问
*/
module cfg
{
	export class FactionLivenessCfgData extends cfg.FactionLivenessBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.FactionLivenessCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
