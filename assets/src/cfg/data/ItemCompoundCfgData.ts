/*
* name;
*/
module cfg
{
	export class ItemCompoundCfgData extends ItemCompoundBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataList(): ItemCompoundCfgInfo[]
		{
			return this._dataArr;
		}

		public static getNeedItemAryById(value: number): AddItemInfo
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "needItemAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.needItem);
				}
				return info[saveKey][0];
			}
			return null;
		}

		public static getNeedItemExpendAryById(value: number): AddItemInfo
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "needItemExpendAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.needItemExpend);
				}
				return info[saveKey][0];
			}
			return null;
		}
	}
}