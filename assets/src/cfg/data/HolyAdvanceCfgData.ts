
/**
* 
*  配置数据访问
*/
module cfg
{
	export class HolyAdvanceCfgData extends HolyAdvanceBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getInfoAryByType(petType: number): HolyAdvanceCfgInfo[]
		{
			return this._dataArr.filter(elment => elment.petType == petType);
		}

		public static getInfoByTypeAndLv(petType: number, lv: number): HolyAdvanceCfgInfo
		{
			let results = this._dataArr.filter(elment => elment.petType == petType && elment.level == lv);
			return results.length > 0 ? results[0] : null;
		}

		public static getInfoByTypeAndHolyLv(petType: number, holylv: number): HolyAdvanceCfgInfo
		{
			let results = this._dataArr.filter(elment => elment.petType == petType && elment.needHolyLevel == holylv);
			return results.length > 0 ? results[0] : null;
		}

		public static getNeedItemAryByIndex(value: number): AddItemInfo[]
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "needItemAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.needItem);
				}
				return info[saveKey];
			}
			return null;
		}

		public static getAddAttrAryByIndex(value: number): AddAtterInfo[]
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "addAttrAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddAtterInfo.parse(info.addAttr);
				}
				return info[saveKey];
			}
			return null;
		}

		public static getNeedPetAryByType(value: number): ValueTwoInfo[]
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "needPetCountAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = ValueTwoInfo.parse(info.needPetCount);
				}
				return info[saveKey];
			}
			return null;
		}

	}
}

