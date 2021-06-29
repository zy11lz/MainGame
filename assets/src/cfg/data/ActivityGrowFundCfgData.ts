
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ActivityGrowFundCfgData extends ActivityGrowFundBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAll(): ActivityGrowFundCfgInfo[]
		{
			return this._dataArr;
		}

		public static getAddItemInfoByInfo(info: ActivityGrowFundCfgInfo): AddItemInfo[]
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

