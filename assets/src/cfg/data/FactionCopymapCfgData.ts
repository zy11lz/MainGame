
/**
* 
*  配置数据访问
*/
module cfg
{
	export class FactionCopymapCfgData extends FactionCopymapBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getLength(): number
		{
			return this._dataArr.length;
		}


		public static getDamagePrizeAryByInfo(info: FactionCopymapCfgInfo): Array<AddItemInfo>
		{
			if (info)
			{
				let saveKey = "addItemDamagePrizeAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.damagePrize);
				}
				return info[saveKey];
			}
			return null;
		}


		public static getKillPrizeAryByInfo(info: FactionCopymapCfgInfo): Array<AddItemInfo>
		{
			if (info)
			{
				let saveKey = "addItemKillPrizeAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.killPrize);
				}
				return info[saveKey];
			}
			return null;
		}

	}
}

