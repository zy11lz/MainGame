
/**
* 
*  配置数据访问
*/
module cfg
{
	export class IllustrationAchieveCfgData extends cfg.IllustrationAchieveBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static setup(dataArr: Array<cfg.IllustrationAchieveCfgInfo>): void
		{
			super.setup(dataArr);
		}

		public static getAllList()
		{
			return this._dataArr;
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

		public static getAchieveByAchieveType(achieveType: Pb_God._emAchieveType)
		{
			return this._dataArr.filter(element =>
				element.achieveType == achieveType
			)
		}
	}
}

