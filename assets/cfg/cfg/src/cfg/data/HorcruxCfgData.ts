
/**
* 
*  配置数据访问
*/
module cfg
{
	export class HorcruxCfgData extends cfg.HorcruxBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.HorcruxCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
