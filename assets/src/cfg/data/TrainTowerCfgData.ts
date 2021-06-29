
/**
* 
*  配置数据访问
*/
module cfg
{
	export class TrainTowerCfgData extends TrainTowerBaseCfgData
	{
		constructor()
		{
			super();
		}

		protected static _listByType: Object;
		public static getListByType(value: number): TrainTowerCfgInfo[]
		{
			if (this._listByType == null)
			{
				this._listByType = TemplateUtil.createSimpleIndexFromObj(this._dataArr, "type");
			}
			return this._listByType[value] || [];
		}

		public static getMaxStage(type: number): number
		{
			let list = this.getListByType(type);
			return list[list.length - 1].stageID;
		}

		public static getFirstAddPrizeAryById(value: number): Array<AddItemInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "firstAddPrizeAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.firstAddPrize);
				}
				return info[saveKey];
			}
			return null;
		}

		public static getAddPrizeAryById(value: number): Array<AddItemInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "AddPrizeAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.addPrize);
				}
				return info[saveKey];
			}
			return null;
		}
	}
}

