
/**
* 
*  配置数据访问
*/
module cfg
{
	export class LadderBuyCountCfgData extends LadderBuyCountBaseCfgData
	{
		constructor()
		{
			super();
		}


		public static getCanBuyCount(vipLv: number): number
		{
			let ret = 0;
			for (let el of this._dataArr)
			{
				if (el.needVIP > vipLv) return ret;
				ret = el.count;
			}
			return ret;
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

