
/**
* 
*  配置数据访问
*/
module cfg
{
	export class HeavenMonsterNewCfgData extends cfg.HeavenMonsterNewBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.HeavenMonsterNewCfgInfo>):void
		{
			super.setup(dataArr);
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
 
