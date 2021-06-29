
/**
* 
*  配置数据访问
*/
module cfg
{
	export class FactionSkillUpgradeCfgData extends FactionSkillUpgradeBaseCfgData
	{
		constructor()
		{
			super();
		}

		/** 最大等级 */
		public static getMaxLevel(): number
		{
			return this._dataArr[this._dataArr.length - 1].level;
		}

		public static getNeedItemAryByLevel(value: number): Array<AddItemInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "addItemAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.needItem);
				}
				return info[saveKey];
			}
			return null;
		}
	}
}

