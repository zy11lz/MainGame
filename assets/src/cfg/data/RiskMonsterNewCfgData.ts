
/**
* 
*  配置数据访问
*/
module cfg
{
	export class RiskMonsterNewCfgData extends cfg.RiskMonsterNewBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.RiskMonsterNewCfgInfo>):void
		{
			super.setup(dataArr);
		}

		public static getMonterInfoWithID(index: number): AddMonsterInfo
		{
			let info = this.getInfo(index);
			if (info)
			{
				let saveKey = "monsterInfoAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddMonsterInfo.parse(info.monsterInfo)[0];
				}
				return info[saveKey];
			}
			return null;
		}


		public static getAddAttrAryById(id: number): Array<AddAtterInfo>
		{
			//根据当前等级，查找匹配的等级段
			let info = this.getInfo(id);
			if (info)
			{
				let saveKey = "attributeAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddAtterInfo.parse(info.attribute);
				}
				return info[saveKey];
			}
			return null;
		}
	}
}
 
