
/**
* 
*  配置数据访问
*/
module cfg
{
	export class HookMonsterNewCfgData extends cfg.HookMonsterNewBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.HookMonsterNewCfgInfo>):void
		{
			super.setup(dataArr);
		}

		
		/** 战斗怪物列表中boss信息 */
		public static getBossMonsterInfoById(index: number): AddMonsterInfo
		{
			let monsterList = this.getMonterInfoWithID(index);
			if (!monsterList) return null;
			return monsterList[this.getBossIndexByIndex(index) - 1];
		}

		public static getMonterInfoWithID(index: number): AddMonsterInfo[]
		{
			let info = this.getInfo(index);
			if (info)
			{
				let saveKey = "monsterInfoAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddMonsterInfo.parse(info.monsterInfo);
				}
				return info[saveKey];
			}
			return null;
		}
	}
}
 
