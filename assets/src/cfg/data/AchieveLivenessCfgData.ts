
/**
* 
*  配置数据访问
*/
module cfg
{
	export class AchieveLivenessCfgData extends AchieveLivenessBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataList(): AchieveLivenessCfgInfo[]
		{
			return this._dataArr;
		}
	}
}

