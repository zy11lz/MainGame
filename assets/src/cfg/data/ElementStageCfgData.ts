
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ElementStageCfgData extends ElementStageBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataList(): ElementStageCfgInfo[]
		{
			return this._dataArr;
		}

		public static getInfoWithType(week: number, type: number): ElementStageCfgInfo[]
		{
			return this._dataArr.filter(elment => elment.type == type && elment.week == week);
		}

		public static getNeedPetTypeAryById(value: number): ValueTwoInfo
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "needPetTypeAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = ValueTwoInfo.parse(info.needPetType)[0];
				}
				return info[saveKey];
			}
			return null;
		}

		public static getFirstAddItemAryById(value: number): Array<AddItemInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "firstAddItemAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.firstAddItem);
				}
				return info[saveKey];
			}
			return null;
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
	}
}

