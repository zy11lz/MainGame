
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ChallengeDailyPrizeCfgData extends ChallengeDailyPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}

		//获取整个列表
		public static getAllList(): Array<ChallengeDailyPrizeCfgInfo>
		{
			return this._dataArr;
		}

		public static getAddItemAryByOrder(value: number): Array<AddItemInfo>
		{
			let info = this.getInfo(value);
			return this.getAddItemAryByInfo(info);
		}

		public static getAddItemAryByInfo(info: ChallengeDailyPrizeCfgInfo): Array<AddItemInfo>
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

