
/**
* 
*  配置数据访问
*/
module cfg
{
	export class CrossChallengeDailyPrizeCfgData extends CrossChallengeDailyPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}


		public static getAll()
		{
			return this._dataArr;
		}

		public static getDailyMaxPro()
		{
			let maxPro = 0
			let cfgs = cfg.CrossChallengeDailyPrizeCfgData.getAll();
			for (let i = 0; i < cfgs.length; i++)
			{
				maxPro = Math.max(maxPro, cfgs[i].count)
			}
			return maxPro;
		}

		public static getAddItemAryById(value: number): Array<AddItemInfo>
		{
			let info = this.getInfo(value);
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

