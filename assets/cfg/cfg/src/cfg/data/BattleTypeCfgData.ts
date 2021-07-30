
/**
* 
*  配置数据访问
*/
module cfg
{
	export class BattleTypeCfgData extends cfg.BattleTypeBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.BattleTypeCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
