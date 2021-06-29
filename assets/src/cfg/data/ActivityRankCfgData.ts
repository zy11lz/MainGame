
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ActivityRankCfgData extends ActivityRankBaseCfgData
	{
		constructor()
		{
			super();
		}

		private static _actIdMapList = {};
		/** 根据活动ID获取对应的商品列表 */
		public static getListByActivityId(actId: number): ActivityRankCfgInfo[]
		{
			let ret = this._actIdMapList[actId];
			if (ret) return ret;
			ret = this._dataArr.filter(elment => elment.activityID == actId);
			this._actIdMapList[actId] = ret;
			return ret;
		}
	}
}

