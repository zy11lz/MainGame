
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ArtifactSkillUpgradeCfgData extends ArtifactSkillUpgradeBaseCfgData
	{
		constructor()
		{
			super();
		}

		protected static _dataDicByDoubleIndex: Object;
		//双索引，根据id和等级取得配置
		public static getInfoByDoubleKey(skillID: number, skillLevel: number): ArtifactSkillUpgradeCfgInfo
		{
			let key = skillID + "_" + skillLevel;
			if (!this._dataDicByDoubleIndex) this._dataDicByDoubleIndex = TemplateUtil.createUniqIndexFromArr(this._dataArr, ["skillID", "skillLevel"]);
			let list = this._dataDicByDoubleIndex[key];
			if (list) return list[0];
			return null;
		}


		public static getNeedItemAryByIdLevel(skillId: number, skillLevel: number): Array<AddItemInfo>
		{
			let info = this.getInfoByDoubleKey(skillId, skillLevel);
			if (info)
			{
				let saveKey = "needItemAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.needItem);
				}
				return info[saveKey];
			}
			return [];
		}

		protected static _skillIdMapAddAttrInfo: Object;
		/** 获取有额外属性加成的技能等级列表
		 * @return skilllevel to AddAtterInfo
		 */
		public static getHasAddAddAttrInfos(skillId: number): ArtifactSkillUpgradeCfgInfo[]
		{
			//需要先逐级筛选，筛选出有变化的等级
			if (!this._skillIdMapAddAttrInfo) this._skillIdMapAddAttrInfo = {};
			if (!this._skillIdMapAddAttrInfo[skillId])
			{
				let cfgArr = this._dataArr.filter(elment => elment.addAttr && skillId == elment.skillID);
				let filterArr: ArtifactSkillUpgradeCfgInfo[] = [];
				this._skillIdMapAddAttrInfo[skillId] = filterArr;
				let tempAttrStr = "";
				let tempAwakeAttrStr = "";
				for (var cfgInfo of cfgArr)
				{
					if (tempAttrStr != cfgInfo.addAttr)
					{ //有变化的
						var addAddAttr = cfgInfo.addAttr.replace(tempAttrStr + ";", "");
						var addAwakeAddAttr = cfgInfo.addAwakeAttr.replace(tempAwakeAttrStr + ";", "");
						cfgInfo["addAddAttrInfo"] = AddAtterInfo.parse(addAddAttr)[0];
						cfgInfo["addAwakeAddAttrInfo"] = AddAtterInfo.parse(addAwakeAddAttr)[0];
						filterArr[filterArr.length] = cfgInfo;
						tempAttrStr = cfgInfo.addAttr;
						tempAwakeAttrStr = cfgInfo.addAwakeAttr;
					}
				}
			}
			return this._skillIdMapAddAttrInfo[skillId];
		}
	}
}

