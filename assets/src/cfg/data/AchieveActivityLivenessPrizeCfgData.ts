
/**
* 
*  配置数据访问
*/
module cfg
{
	export class AchieveActivityLivenessPrizeCfgData extends AchieveActivityLivenessPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataList(): AchieveActivityLivenessPrizeCfgInfo[]
		{
			return this._dataArr;
		}

		public static getNeedItemAryById(value: number): Array<AddItemInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "needItemAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.needItem);
				}
				return info[saveKey];
			}
			return null;
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

