
/**
* 
*  配置数据访问
*/
module cfg
{
	export class AchieveLivenessPrizeCfgData extends AchieveLivenessPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataList(): AchieveLivenessPrizeCfgInfo[]
		{
			return this._dataArr;
		}
	}
}

