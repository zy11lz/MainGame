
/**
* 
*  配置数据访问
*/
module cfg
{
	export class DanConstCfgData extends DanConstBaseCfgData
	{
		constructor()
		{
			super();
		}

		private static _openTimeInfo: StDateTimeInfo;
		public static getOpenTimeInfo(): StDateTimeInfo
		{
			if (this._openTimeInfo) return this._openTimeInfo;
			let openTimeStr = this.getFirstInfo().openTime;
			this._openTimeInfo = StDateTimeInfo.parse(openTimeStr);
			return this._openTimeInfo;
		}
	}
}

