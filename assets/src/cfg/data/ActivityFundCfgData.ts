
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ActivityFundCfgData extends ActivityFundBaseCfgData
	{
		constructor()
		{
			super();
		}

		private static _activityIdList: number[];
		/** 活动ID列表 */
		public static getActivityIdList(): number[]
		{
			if (this._activityIdList) return this._activityIdList;
			let ret = [];
			let map = {};
			for (let el of this._dataArr)
			{
				if (!map[el.activityID])
				{
					map[el.activityID] = true;
					ret.push(el.activityID);
				}
			}
			this._activityIdList = ret;
			return ret;
		}

		/** 取得对应活动的列表
		 * @param isLimitPreview 是否只显示首页预览的类型
		 */
		public static getList(activityId: number, isLimitPreview: boolean): ActivityFundCfgInfo[]
		{
			let ret = [];
			for (var el of this._dataArr)
			{
				if (el.activityID != activityId) continue;
				if (isLimitPreview && !el.isPreview) continue;
				ret[ret.length] = el;
			}
			return ret;
		}

		public static getInfoByActivityIdAndDay(activityId: number, day: number): ActivityFundCfgInfo
		{
			for (var el of this._dataArr)
			{
				if (el.activityID != activityId) continue;
				if (el.day != day) continue;
				return el;
			}
			return null;
		}

		public static getAddItemInfoByInfo(info: ActivityFundCfgInfo): AddItemInfo
		{
			if (info)
			{
				let saveKey = "addItemInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.addItem)[0];
				}
				return info[saveKey];
			}
			return null;
		}

		public static getAddLifelongItemInfoByIn(info: ActivityFundCfgInfo): AddItemInfo[]
		{
			if (info)
			{
				let saveKey = "addItemInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.addItem);
				}
				return info[saveKey];
			}
			return null;
		}

	}
}

