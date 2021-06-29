
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ExpeditionStageTypeCfgData extends ExpeditionStageTypeBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAddPrizeAryById(value: number): Array<AddItemInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "addPrizeAry";
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

