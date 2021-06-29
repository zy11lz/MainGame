
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PetCallChangeCfgData extends PetCallChangeBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataAll(): Array<PetCallChangeCfgInfo>
		{
			return this._dataArr;
		}

		public static getNeedPetTypeAryWithID(value: number): Array<ValueOneInfo>
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

		public static getNeedItemAryWithID(value: number): AddItemInfo
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "needItemAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.needItem);
				}
				return info[saveKey][0];
			}
			return null;
		}
	}
}

