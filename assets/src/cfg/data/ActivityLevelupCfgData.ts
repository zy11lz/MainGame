
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ActivityLevelupCfgData extends ActivityLevelupBaseCfgData
	{

		constructor()
		{
			super();
		}


		/** 一个活动ID对应一个列表 */
		protected static _listByActid: Object;
		public static getListByActId(value: number): ActivityLevelupCfgInfo[]
		{
			if (this._listByActid == null)
			{
				this._listByActid = TemplateUtil.createSimpleIndexFromObj(this._dataArr, "activityID");
			}
			return this._listByActid[value] || [];
		}

		/**
		 * 根据info获取奖励
		 */
		public static getAddItemAryByInfo(info: ActivityLevelupCfgInfo): Array<AddItemInfo>
		{
			if (!info) return null;
			//存储奖励
			let saveKey = "addItemAry";
			if (info[saveKey] == null)
			{
				info[saveKey] = AddItemInfo.parse(info.addItem);
			}
			return info[saveKey];
		}


	}
}

