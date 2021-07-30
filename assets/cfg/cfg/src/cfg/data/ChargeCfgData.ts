
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ChargeCfgData extends cfg.ChargeBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.ChargeCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
