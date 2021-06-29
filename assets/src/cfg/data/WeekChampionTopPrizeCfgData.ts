
/**
* 
*  配置数据访问
*/
module cfg
{
	export class WeekChampionTopPrizeCfgData extends WeekChampionTopPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAll(): WeekChampionTopPrizeCfgInfo[]
		{
			return this._dataArr;
		}

		public static getAddItemAryByInfo(info: WeekChampionTopPrizeCfgInfo): Array<AddItemInfo>
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

