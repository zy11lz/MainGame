
/**
* 
*  配置数据访问
*/
module cfg
{
	export class FactionWarConstCfgData extends FactionWarConstBaseCfgData
	{
		constructor()
		{
			super();
		}

		/** 匹配时间 */
		public static getMatchTimeInfo(): StDateTimeInfo
		{
			let info = this.getFirstInfo();
			if (info)
			{
				let saveKey = "matchTimeInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = StDateTimeInfo.parse(info.matchTime);
				}
				return info[saveKey];
			}
			return null;
		}

		/** 开启时间 */
		public static getOpenTimeInfo(): StDateTimeInfo
		{
			let info = this.getFirstInfo();
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

		/** 结算奖励时间 */
		public static getPrizeTimeInfo(): StDateTimeInfo
		{
			let info = this.getFirstInfo();
			if (info)
			{
				let saveKey = "prizeTimeInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = StDateTimeInfo.parse(info.prizeTime);
				}
				return info[saveKey];
			}
			return null;
		}

		/** 领宝箱时间 */
		public static getPrizeBoxTimeInfoList(): StDateTimeInfo[]
		{
			let info = this.getFirstInfo();
			if (info)
			{
				let saveKey = "openTimeInfoList";
				if (info[saveKey] == null)
				{
					info[saveKey] = StDateTimeInfo.parseList(info.prizeBoxTime);
				}
				return info[saveKey];
			}
			return null;
		}

	}
}

