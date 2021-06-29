
/**
* 
*  配置数据访问
*/
module cfg
{
	export class FactionCopymapTopprizeCfgData extends FactionCopymapTopprizeBaseCfgData
	{
		constructor()
		{
			super();
		}
		/** 一个ID对应一个列表 */
		protected static _dataArrById: Object;
		public static getDataArrayByID(value: number): Array<FactionCopymapTopprizeCfgInfo>
		{
			if (this._dataArrById == null)
			{
				this._dataArrById = TemplateUtil.createSimpleIndexFromObj(this._dataArr, "iD");
			}
			return this._dataArrById[value];
		}

		public static getAddItemAryByInfo(info: FactionCopymapTopprizeCfgInfo): Array<AddItemInfo>
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

