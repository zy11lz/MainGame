
/**
* 
*  配置数据访问
*/
module cfg
{
	export class TrainTowerPrizeCfgData extends TrainTowerPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}

		protected static _listByType: Object;
		public static getListByType(value: number): TrainTowerPrizeCfgInfo[]
		{
			if (this._listByType == null)
			{
				this._listByType = TemplateUtil.createSimpleIndexFromObj(this._dataArr, "type");
			}
			return this._listByType[value] || [];
		}

		public static getStagePrizeAryById(value: number): Array<AddItemInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "stagePrizeAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.stagePrize);
				}
				return info[saveKey];
			}
			return null;
		}
	}
}

