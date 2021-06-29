
/**
* 
*  配置数据访问
*/
module cfg
{
	export class GodEquipSuitCfgData extends GodEquipSuitBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAddAttr2AryByInfo(info: GodEquipSuitCfgInfo): AddAtterInfo
		{
			if (info)
			{
				let saveKey = "addAttr2Info";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddAtterInfo.parse(info.addAttr1)[0];
				}
				return info[saveKey];
			}
			return null;
		}

		/** 四件属性 */
		public static getAddAttr4AryByInfo(info: GodEquipSuitCfgInfo): AddAtterInfo
		{
			if (info)
			{
				let saveKey = "addAttr4Info";
				if (info[saveKey] == null)
				{
					let attrInfo = AddAtterInfo.parse(info.addAttr2)[0];
					// //四件属性包括了2件的属性，显示的时候会分开显示，所以需要减掉先
					// let attr2Info = this.getAddAttr2AryByInfo(info);
					// if(attr2Info.type == attrInfo.type) {
					// 	attrInfo.value -= attr2Info.value;
					// 	attrInfo.valuePer -= attr2Info.valuePer;
					// }
					info[saveKey] = attrInfo;
				}
				return info[saveKey];
			}
			return null;
		}
		public static getAddSkillInfoByInfo(info: GodEquipSuitCfgInfo): AddSkillInfo
		{
			if (info)
			{
				let saveKey = "addSkillInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddSkillInfo.parse(info.addSkill)[0];
				}
				return info[saveKey];
			}
			return null;
		}

	}
}

