
/**
* 
*  配置数据访问
*/
module cfg
{
	export class FactionWarBoxPrizeCfgData extends FactionWarBoxPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}


		public static getAddItemInfoByIndex(value: number): AddItemInfo
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "addItemInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.addPrize)[0];
				}
				return info[saveKey];
			}
			return null;
		}
	}
}

