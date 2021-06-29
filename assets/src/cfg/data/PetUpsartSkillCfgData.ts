
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PetUpsartSkillCfgData extends PetUpsartSkillBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataAll(): Array<PetUpsartSkillCfgInfo>
		{
			return this._dataArr;
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

		public static getAddSkillLvMapById(value: number): number[]
		{
			let info = this.getInfo(value);
			if (!info) return null;
			let saveKey = "addSkillLvMap";
			if (info[saveKey]) return info[saveKey];
			let ret = info[saveKey] = [];
			let skillAry = this.getAddSkillAryById(value);
			for (var el of skillAry)
			{
				ret[el.value1 - 1] = el.value2;
			}
			return ret;
		}
	}
}

