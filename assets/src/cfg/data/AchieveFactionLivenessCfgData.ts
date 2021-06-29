
/**
* 
*  配置数据访问
*/
module cfg
{
	export class AchieveFactionLivenessCfgData extends AchieveFactionLivenessBaseCfgData
	{
		constructor()
		{
			super();
		}

		//获取整个列表
		public static getAllList(): Array<AchieveFactionLivenessCfgInfo>
		{
			return this._dataArr;
		}

	}
}

