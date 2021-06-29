
/**
* 
*  配置数据访问
*/
module cfg
{
	export class RiskCollectPrizeCfgData extends RiskCollectPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}

		protected static _dataMapByStageAndType: Object;

		/** 根据楼层与守卫index，获取对应的配置信息 */
		public static getAddItemArrByStageAndType(stage: number, type: Pb_God._emRiskRefreshType): cfg.AddItemInfo[]
		{
			let key = stage + "_" + type;
			if (!this._dataMapByStageAndType)
			{
				this._dataMapByStageAndType = TemplateUtil.createUniqIndexFromArr(this._dataArr, ["stage", "type"]);
			}
			let list: RiskCollectPrizeCfgInfo[] = this._dataMapByStageAndType[key];
			if (!list || list.length <= 0) return [];
			let info = list[0];
			if (info)
			{
				let saveKey = "addItemArr";
				if (info[saveKey] == null)
				{
					info[saveKey] = cfg.AddItemInfo.parse(info.addItem);
				}
				return info[saveKey];
			}
			return [];
		}

	}
}

