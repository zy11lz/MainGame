
/**
* 
*  配置数据访问
*/
module cfg
{
	export class FactionDonatePrizeCfgData extends FactionDonatePrizeBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAllList(): FactionDonatePrizeCfgInfo[]
		{
			return this._dataArr;
		}


		public static getAddItemAryByInfo(info: FactionDonatePrizeCfgInfo): Array<AddItemInfo>
		{
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

