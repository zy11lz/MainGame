
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ActivityExchangeCfgData extends ActivityExchangeBaseCfgData
	{
		constructor()
		{
			super();
		}

		/** 一个活动ID对应一个列表 */
		protected static _dataArrByActivityId: Object;
		public static getDataArrayByActivityId(value: number): ActivityExchangeCfgInfo[]
		{
			if (this._dataArrByActivityId == null)
			{
				this._dataArrByActivityId = TemplateUtil.createSimpleIndexFromObj(this._dataArr, "activityID");
			}
			return this._dataArrByActivityId[value];
		}

		/** 根据info获取消耗物品*/
		public static getAddItemAryByInfo(info: ActivityExchangeCfgInfo): Array<AddItemInfo>
		{
			if (info)
			{
				let saveKey = "consumeItemAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.needItem);
				}
				return info[saveKey];
			}
			return null;
		}
		/** 根据info获取奖励*/
		public static getAddItemAryByInfo1(info: ActivityExchangeCfgInfo): Array<AddItemInfo>
		{
			if (info)
			{
				let saveKey = "addItemAry";
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

