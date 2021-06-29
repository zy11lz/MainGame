
/**
* 
*  配置数据访问
*/
module cfg
{
	export class GuessCfgData extends cfg.GuessBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.GuessCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
