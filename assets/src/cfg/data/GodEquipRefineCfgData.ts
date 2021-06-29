
/**
* 
*  配置数据访问
*/
module cfg
{
	export class GodEquipRefineCfgData extends GodEquipRefineBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getNeedItemAryByIndex(value: number): AddItemInfo[]
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

		public static getLockOneNeedItemInfoByIndex(value: number): AddItemInfo
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "lockOneNeedItemInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.lockOneNeedItem)[0];
				}
				return info[saveKey];
			}
			return null;
		}

		public static getLockTwoNeedItemInfoByIndex(value: number): AddItemInfo
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "lockTwoNeedItemInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.lockTwoNeedItem)[0];
				}
				return info[saveKey];
			}
			return null;
		}
	}
}

