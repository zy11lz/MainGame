
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ActivityChargeAmountCfgData extends ActivityChargeAmountBaseCfgData
	{

		constructor()
		{
			super();
		}

		/** 一个活动ID对应一个列表 */
		protected static _listByActid: Object;
		public static getListByActId(value: number): ActivityChargeAmountCfgInfo[]
		{
			if (this._listByActid == null)
			{
				this._listByActid = TemplateUtil.createSimpleIndexFromObj(this._dataArr, "activityID");
			}
			return this._listByActid[value] || [];
		}


		/**
		 * 根据活动id和列表index获取奖励
		 * @param activityID 
		 * @param index 
		 */
		public static getAddItemAryByInfo(info: ActivityChargeAmountCfgInfo): Array<AddItemInfo>
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

