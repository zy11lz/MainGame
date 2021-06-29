
/**
*
*  配置数据访问
*/
module cfg
{
	export class ActivityExchangeExCfgData extends cfg.ActivityExchangeExBaseCfgData
	{
		private static _activeMap: ds.HashMap<number, ActivityExchangeExCfgInfo[]>
		constructor()
		{
			super();
		}

		public static setup(dataArr: Array<cfg.ActivityExchangeExCfgInfo>): void
		{
			super.setup(dataArr);
		}

		public static getListByActId(actId: number)
		{
			if (this._activeMap == null)
			{
				this._activeMap = new ds.HashMap<number, ActivityExchangeExCfgInfo[]>()
			}
			var actArr = this._activeMap.getValue(actId);
			if (actArr == null)
			{
				actArr = this._dataArr.filter(element => element.activityID == actId);
				if (actArr == null)
				{
					actArr = [];
				}
				this._activeMap.add(actId, actArr);
			}
			return actArr;
		}
	}
}

