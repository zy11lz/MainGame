
/**
* 
*  配置数据访问
*/
module cfg
{
	export class RiskGuardPrizeCfgData extends RiskGuardPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAllList(): RiskGuardPrizeCfgInfo[]
		{
			return this._dataArr;
		}

		public static getAddItemAryByInfo(info: RiskGuardPrizeCfgInfo): Array<AddItemInfo>
		{
			if (info)
			{
				let saveKey = "addItemAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.addItem);
				}
				return info[saveKey];
			}
			return null;
		}

		/** 取得下一个击杀目标数量 */
		public static getNextCount(count: number): number
		{
			let cfginfo = this.getInfo(count);
			let index = this._dataArr.indexOf(cfginfo);
			if (index == this._dataArr.length - 1) //没有下一个了
				return 0;
			return this._dataArr[index + 1].count;
		}

	}
}

