
/**
* 
*  配置数据访问
*/
module cfg
{
	export class BattleFormationAttrCfgData extends BattleFormationAttrBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataList(): BattleFormationAttrCfgInfo[]
		{
			return this._dataArr;
		}

		public static setup(dataArr: Array<BattleFormationAttrCfgInfo>): void
		{
			super.setup(dataArr);
		}

		public static getInfosByPetType(tmpType: number): Array<BattleFormationAttrCfgInfo>
		{
			return this._dataArr.filter(element => element.petType == tmpType);
		}

		public static getInfoWithTypeNum(tmpType: number, tmpNum: number): BattleFormationAttrCfgInfo
		{
			let tmpResults = this._dataArr.filter(element => element.petType == tmpType && element.typeCount == tmpNum);
			return tmpResults.length > 0 ? tmpResults[0] : null;
		}

		public static getAddAttrAryWithId(value: number): Array<AddAtterInfo>
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
	}
}

