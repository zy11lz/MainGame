
/**
* 
*  配置数据访问
*/
module cfg
{
	export class HolyUnlockCfgData extends HolyUnlockBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getNeedPetAryByType(value: number): ValueTwoInfo[]
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "needPetCountAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = ValueTwoInfo.parse(info.needPetCount);
				}
				return info[saveKey];
			}
			return null;
		}
	}
}

