
/**
* 
*  配置数据访问
*/
module cfg
{
	export class DanUpgradeCfgData extends DanUpgradeBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAllCount(): number
		{
			return this._dataArr.length;
		}

		public static getFirstPrizeAryById(value: number): AddItemInfo[]
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "firstPrizeAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.firstPrize);
				}
				return info[saveKey];
			}
			return null;
		}
		public static getDanPrizeAryById(value: number): AddItemInfo[]
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "danPrizeAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.danPrize);
				}
				return info[saveKey];
			}
			return null;
		}

	}
}

