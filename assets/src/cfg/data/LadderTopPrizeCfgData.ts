
/**
* 
*  配置数据访问
*/
module cfg
{
	export class LadderTopPrizeCfgData extends LadderTopPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAll(): LadderTopPrizeCfgInfo[]
		{
			return this._dataArr;
		}

		public static getAddItemAryByInfo(info: LadderTopPrizeCfgInfo): Array<AddItemInfo>
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

		public static getInfoByRank(rank: number): LadderTopPrizeCfgInfo
		{
			if (rank == 0) return null;
			for (const el of this._dataArr)
			{
				if (rank <= el.order) return el;
			}
			return null;
		}
	}
}

