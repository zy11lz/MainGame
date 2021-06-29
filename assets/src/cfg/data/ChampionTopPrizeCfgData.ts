
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ChampionTopPrizeCfgData extends ChampionTopPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}


		public static getAll(): ChampionTopPrizeCfgInfo[]
		{
			return this._dataArr;
		}

		public static getAddItemAryByInfo(info: ChampionTopPrizeCfgInfo): Array<AddItemInfo>
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

