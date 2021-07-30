
/**
* 
*  配置数据访问
*/
module cfg
{
	export class BattleCfgData extends cfg.BattleBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.BattleCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
