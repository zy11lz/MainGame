
/**
* 
*  配置数据访问
*/
module cfg
{
	export class FactionSkillCfgData extends FactionSkillBaseCfgData
	{
		protected static _dataArrByType: Object;
		constructor()
		{
			super();
		}

		/** 职业类型对应列表 */
		public static getDataArrayByJobType(value: number): Array<FactionSkillCfgInfo>
		{
			if (this._dataArrByType == null)
			{
				this._dataArrByType = TemplateUtil.createSimpleIndexFromObj(this._dataArr, "jobType");
			}
			return this._dataArrByType[value];
		}

		/** 获取技能属性加成数据 */
		public static getAddAttrInfoByCfgInfo(info: FactionSkillCfgInfo): AddAtterInfo
		{
			if (info)
			{
				let saveKey = "addAttrInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddAtterInfo.parse(info.addAttr)[0];
				}
				return info[saveKey];
			}
			return null;
		}

	}
}

