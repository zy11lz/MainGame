
/**
* 
*  配置数据访问
*/
module cfg
{
	export class LadderConstInfoCfgData extends LadderConstInfoBaseCfgData
	{
		constructor()
		{
			super();
		}

		private static _openTimeInfo: StDateTimeInfo[];
		public static getOpenTimeInfos(): StDateTimeInfo[]
		{
			if (this._openTimeInfo) return this._openTimeInfo;
			let openTimeStr = this.getFirstInfo().openTime;
			this._openTimeInfo = StDateTimeInfo.parseList(openTimeStr);
			return this._openTimeInfo;
		}

	}
}

