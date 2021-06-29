
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ItemPetSplitCfgData extends ItemPetSplitBaseCfgData
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

		public static getPieceAddItemAryById(value: number): Array<AddItemInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "pieceAddItemAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.pieceAddItem);
				}
				return info[saveKey];
			}
			return null;
		}
	}
}

