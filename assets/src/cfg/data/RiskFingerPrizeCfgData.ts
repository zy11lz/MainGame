
/**
* 
*  配置数据访问
*/
module cfg
{
	export class RiskFingerPrizeCfgData extends RiskFingerPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getNeedItemInfoBySelectType(value: number): AddItemInfo
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "needItemInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.needItem)[0];
				}
				return info[saveKey];
			}
			return null;
		}
	}
}

