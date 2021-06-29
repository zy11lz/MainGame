
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PetCallCallCfgData extends PetCallCallBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAddItemAryById(value: number): AddItemInfo
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "addItemAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.addItem)[0];
				}
				return info[saveKey];
			}
			return null;
		}

		public static getStarRateAryById(value: number): Array<ValueTwoInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "starRateAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = ValueTwoInfo.parse(info.starRate);
				}
				return info[saveKey];
			}
			return null;
		}

		public static getTypeRateAryById(value: number): Array<ValueTwoInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "typeRateAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = ValueTwoInfo.parse(info.typeRate);
				}
				return info[saveKey];
			}
			return null;
		}
	}
}

