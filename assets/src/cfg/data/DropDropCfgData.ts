
/**
* 
*  配置数据访问
*/
module cfg
{
	export class DropDropCfgData extends DropDropBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAddItemAryById(id: number): AddItemInfo[]
		{
			let info = this.getInfo(id);
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

