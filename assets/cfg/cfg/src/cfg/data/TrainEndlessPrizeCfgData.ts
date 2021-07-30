
/**
* 
*  配置数据访问
*/
module cfg
{
	export class TrainEndlessPrizeCfgData extends cfg.TrainEndlessPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.TrainEndlessPrizeCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
