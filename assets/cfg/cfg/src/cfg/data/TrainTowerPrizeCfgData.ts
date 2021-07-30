
/**
* 
*  配置数据访问
*/
module cfg
{
	export class TrainTowerPrizeCfgData extends cfg.TrainTowerPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.TrainTowerPrizeCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
