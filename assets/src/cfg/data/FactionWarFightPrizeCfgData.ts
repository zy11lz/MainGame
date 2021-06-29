
/**
* 
*  配置数据访问
*/
module cfg
{
	export class FactionWarFightPrizeCfgData extends FactionWarFightPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}


		public static getSucAddItemAryByStar(value: number): Array<AddItemInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "addItemAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.sucAddItem);
				}
				return info[saveKey];
			}
			return null;
		}

	}
}

