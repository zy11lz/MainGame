
/**
* 
*  配置数据访问
*/
module cfg
{
	export class AchieveWeekLivenessCfgData extends AchieveWeekLivenessBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataList(): AchieveWeekLivenessCfgInfo[]
		{
			return this._dataArr;
		}

	}
}

