
/**
* 
*  配置数据访问
*/
module cfg
{
	export class StrongerPetCommandCfgData extends StrongerPetCommandBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAllList(): StrongerPetCommandCfgInfo[]
		{
			return this._dataArr;
		}

		public static getAddMonsterAryByID(id: number): AddMonsterInfo[]
		{
			let info = this.getInfo(id);
			if (info)
			{
				let saveKey = "addMonsterAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddMonsterInfo.parse(info.addMonster);
				}
				return info[saveKey];
			}
			return null;
		}
	}
}

