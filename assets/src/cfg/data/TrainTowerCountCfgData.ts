
/**
* 
*  配置数据访问
*/
module cfg
{
	export class TrainTowerCountCfgData extends TrainTowerCountBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataList(): TrainTowerCountCfgInfo[]
		{
			return this._dataArr;
		}
	}
}

