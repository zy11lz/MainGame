
/**
* 
*  配置数据访问
*/
module cfg
{
	export class AchieveActivityLivenessCfgData extends AchieveActivityLivenessBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataList(): AchieveActivityLivenessCfgInfo[]
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

	}
}

