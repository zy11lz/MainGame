
/**
* 
*  配置数据访问
*/
module cfg
{
	export class SkillNewTalentUpgradeCfgData extends SkillNewTalentUpgradeBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getInfoWithLevel(level: number): SkillNewTalentUpgradeCfgInfo[]
		{
			let resultAry = this._dataArr.filter(elment => elment.level == level);
			return resultAry;
		}

		public static getInfoWithSkillId(skillId: number): SkillNewTalentUpgradeCfgInfo[]
		{
			let resultAry = this._dataArr.filter(elment => elment.skillID == skillId);
			return resultAry;
		}

		public static getInfoWithFun(skillId: number, level: number): SkillNewTalentUpgradeCfgInfo
		{
			let resultAry = this._dataArr.filter(elment => elment.skillID == skillId && elment.level == level);
			return resultAry.length > 0 ? resultAry[0] : null;
		}

		public static getNeedItemAryById(value: number): Array<AddItemInfo>
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

		public static getDelNeedItemAryById(value: number): Array<AddItemInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "delNeedItemAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.delNeedItem);
				}
				return info[saveKey];
			}
			return null;
		}

		public static getDelAddItemAryById(value: number): Array<AddItemInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "delAddItemAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.delAddItem);
				}
				return info[saveKey];
			}
			return null;
		}
	}
}

