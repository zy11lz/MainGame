
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ChallengeSeasonPrizeCfgData extends ChallengeSeasonPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}

		//获取整个列表
		public static getAllList(): Array<ChallengeSeasonPrizeCfgInfo>
		{
			return this._dataArr;
		}

		public static getAddItemAryByOrder(value: number): Array<AddItemInfo>
		{
			let info = this.getInfo(value);
			return this.getAddItemAryByInfo(info);
		}

		public static getAddItemAryByInfo(info: ChallengeSeasonPrizeCfgInfo): Array<AddItemInfo>
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

