
/**
*
*  配置数据访问
*/
module cfg
{
	export class PetAdvanceCfgData extends PetAdvanceBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataAll(): Array<PetAdvanceCfgInfo>
		{
			return this._dataArr;
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

		public static getAddSkillAryById(value: number): Array<ValueTwoInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "addSkillAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = ValueTwoInfo.parse(info.addSkill);
				}
				return info[saveKey];
			}
			return null;
		}

	}
}

