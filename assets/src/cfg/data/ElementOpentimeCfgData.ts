
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ElementOpentimeCfgData extends ElementOpentimeBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getOpenTimeInfoByID(id: number): StDateTimeInfo
		{
			let info = this.getInfo(id);
			if (info)
			{
				let saveKey = "openTimeInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = StDateTimeInfo.parse(info.openTime);
				}
				return info[saveKey];
			}
			return null;
		}
	}
}

