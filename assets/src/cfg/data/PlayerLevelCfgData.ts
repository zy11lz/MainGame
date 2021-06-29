
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PlayerLevelCfgData extends PlayerLevelBaseCfgData
	{
		constructor()
		{
			super();
		}


		public static getAddPrizeInfoByLevel(value: number): AddItemInfo[]
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "addItemInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.addPrize);
				}
				return info[saveKey];
			}
			return null;
		}
	}
}

