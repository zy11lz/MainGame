
/**
* 
*  配置数据访问
*/
module cfg
{
	export class DanBuyCountCfgData extends DanBuyCountBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAllLength(): number
		{
			return this._dataArr.length;
		}

		public static getNeedItemById(value: number): AddItemInfo
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

