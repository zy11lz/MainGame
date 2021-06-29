
/**
* 
*  配置数据访问
*/
module cfg
{
	export class CopymapCfgData extends CopymapBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataList(): CopymapCfgInfo[]
		{
			return this._dataArr;
		}

		public static getInfoWithSubType(subType: number): CopymapCfgInfo[]
		{
			let resultAry = this._dataArr.filter(elment => elment.subType == subType);
			return resultAry;
		}

		public static getInfoWithType(type: number): CopymapCfgInfo[]
		{
			let resultAry = this._dataArr.filter(elment => elment.type == type);
			return resultAry;
		}

		public static getAddPrizeAryById(value: number): Array<AddItemInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "addPrizeAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.addPrize);
				}
				return info[saveKey];
			}
			return null;
		}

		public static getSweepNeedItemAryById(value: number): Array<AddItemInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "sweepNeedItemAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.sweepNeedItem);
				}
				return info[saveKey];
			}
			return null;
		}
	}
}

