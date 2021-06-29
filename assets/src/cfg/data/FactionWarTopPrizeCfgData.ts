
/**
* 
*  配置数据访问
*/
module cfg
{
	export class FactionWarTopPrizeCfgData extends FactionWarTopPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAll(): FactionWarTopPrizeCfgInfo[]
		{
			return this._dataArr;
		}

		public static getAddItemAryByInfo(info: FactionWarTopPrizeCfgInfo): Array<AddItemInfo>
		{
			if (info)
			{
				let saveKey = "addItemAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.addPrize);
				}
				return info[saveKey];
			}
			return null;
		}

	}
}

