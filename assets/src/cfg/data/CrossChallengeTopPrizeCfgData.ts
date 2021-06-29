
/**
* 
*  配置数据访问
*/
module cfg
{
	export class CrossChallengeTopPrizeCfgData extends CrossChallengeTopPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAll()
		{
			return this._dataArr;
		}


		public static getRankPrizeByRank(rank: number)
		{
			if (rank == 0)
				return [];
			for (let i = 0; i < this._dataArr.length; i++)
			{
				if (rank <= this._dataArr[i].order)
				{
					return this.getAddItemAryByID(this._dataArr[i].order);
				}
			}
			return [];
		}

		public static getAddItemAryByID(id: number): Array<AddItemInfo>
		{
			let cfg_info = this.getInfo(id);
			if (!cfg_info) return null;
			return AddItemInfo.getAddItemAttr(cfg_info, cfg_info.addItem, "addItemAry");
		}

	}
}

