
/**
* 
*  配置数据访问
*/
module cfg
{
	export class TrainPeakCfgData extends cfg.TrainPeakBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.TrainPeakCfgInfo>):void
		{
			super.setup(dataArr);
		}
	}
}
 
