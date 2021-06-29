
/**
* 
*  配置数据访问
*/
module cfg
{
	export class HolyUpgradeCfgData extends HolyUpgradeBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getInfoByTypeAndLv(petType: number, lv: number): HolyUpgradeCfgInfo
		{
			let results = this._dataArr.filter(elment => elment.petType == petType && elment.level == lv);
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

		public static getExpAddAttrAryByIndex(value: number): AddAtterInfo[]
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "expAddAttrAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddAtterInfo.parse(info.expAddAttr);
				}
				return info[saveKey];
			}
			return null;
		}
	}
}

