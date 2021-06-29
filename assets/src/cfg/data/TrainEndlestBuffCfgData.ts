
/**
*
*  配置数据访问
*/
module cfg
{
	export class TrainEndlestBuffCfgData extends TrainEndlestBuffBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataList(): TrainEndlestBuffCfgInfo[]
		{
			return this._dataArr;
		}

		public static getBuffIDAryById(value: number): Array<ValueOneInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "buffIDAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = ValueOneInfo.parse(info.buffID);
				}
				return info[saveKey];
			}
			return null;
		}
	}
}

