
/**
* 
*  配置数据访问
*/
module cfg
{
	export class FactionMonsterNewCfgData extends cfg.FactionMonsterNewBaseCfgData
	{
		constructor()
		{
			super();
		}
		
		public static setup(dataArr:Array<cfg.FactionMonsterNewCfgInfo>):void
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
	}
}
 
