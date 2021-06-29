
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ExpeditionStageCfgData extends ExpeditionStageBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataList(): ExpeditionStageCfgInfo[]
		{
			return this._dataArr;
		}

		public static getListWithType(curType: number): ExpeditionStageCfgInfo[]
		{
			return this._dataArr.filter(element => element.expeditionType == curType);
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

		public static getExtraPrizeAryById(value: number): Array<AddItemInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "extraPrizeAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.extraPrize);
				}
				return info[saveKey];
			}
			return null;
		}
	}
}

