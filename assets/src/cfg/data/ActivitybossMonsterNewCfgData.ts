
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ActivitybossMonsterNewCfgData extends cfg.ActivitybossMonsterNewBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static setup(dataArr: Array<cfg.ActivitybossMonsterNewCfgInfo>): void
		{
			super.setup(dataArr);
		}

		public static getShowAward(index: number): Array<AddItemInfo>
		{
			let info = this.getInfo(index);
			if (info)
			{
				let saveKey = "showAward";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.awards);
				}
				return info[saveKey];
			}
			return null;
		}
	}
}

