
/**
* 
*  配置数据访问
*/
module cfg
{
	export class RiskCollectRandprizeCfgData extends RiskCollectRandprizeBaseCfgData
	{
		constructor()
		{
			super();
		}
		protected static _dataArrByType: Object;
		protected static _addItemArrByType: Object;

		public static getAddItemArrayByType(value: Pb_God._emRiskRefreshType): Array<AddItemInfo>
		{
			if (this._addItemArrByType == null)
			{
				this._addItemArrByType = {};
				this._dataArrByType = TemplateUtil.createSimpleIndexFromObj(this._dataArr, "type");
			}
			let ret = this._addItemArrByType[value];
			if (ret) return ret;
			let arr: RiskCollectRandprizeCfgInfo[] = this._dataArrByType[value];
			ret = [];
			for (var info of arr)
			{
				ret = ret.concat(cfg.AddItemInfo.parse(info.addItem));
			}
			this._addItemArrByType[value] = ret;
			return ret;
		}
	}
}

