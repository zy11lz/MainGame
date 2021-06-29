
/**
* 
*  配置数据访问
*/
module cfg
{
	export class RuneCompoundCfgData extends RuneCompoundBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getInfoWithNeedItemID(value: number): RuneCompoundCfgInfo
		{
			let results = this._dataArr.filter(elment => elment.needItemID == value);
			return results.length > 0 ? results[0] : null;
		}

		public static getCountRateAryById(value: number): Array<ValueTwoInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "countRateAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = ValueTwoInfo.parse(info.countRate);
				}
				return info[saveKey];
			}
			return null;
		}

		public static getNeedExpendInfo(value: number): AddItemInfo
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "needItemExpendAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.needItemExpend);
				}
				return info[saveKey][0];
			}
			return null;
		}
	}
}

