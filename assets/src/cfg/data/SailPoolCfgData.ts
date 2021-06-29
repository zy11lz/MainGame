
/**
* 
*  配置数据访问
*/
module cfg
{
	export class SailPoolCfgData extends SailPoolBaseCfgData
	{
		constructor()
		{
			super();
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

		public static getNeedPetTypeAryById(value: number): Array<ValueOneInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "needPetTypeAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = ValueOneInfo.parse(info.needPetType);
				}
				return info[saveKey];
			}
			return null;
		}
	}
}

