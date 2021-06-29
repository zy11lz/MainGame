
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PetCallCallPoolCfgData extends PetCallCallPoolBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataAll(): Array<PetCallCallPoolCfgInfo>
		{
			return this._dataArr;
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
	}
}

