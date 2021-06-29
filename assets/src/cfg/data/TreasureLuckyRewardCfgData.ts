
/**
* 
*  配置数据访问
*/
module cfg
{
	export class TreasureLuckyRewardCfgData extends TreasureLuckyRewardBaseCfgData
	{
		constructor()
		{
			super();
		}

		private static _dataArrByType: Object;
		/** 类型对应列表 */
		public static getListByType(type: number): TreasureLuckyRewardCfgInfo[]
		{
			if (!this._dataArrByType)
			{
				this._dataArrByType = TemplateUtil.createSimpleIndexFromObj(this._dataArr, "type");
			}
			return this._dataArrByType[type];
		}

		public static getNeedItemInfoByInfo(cfgInfo: TreasureLuckyRewardCfgInfo): AddItemInfo
		{
			if (!cfgInfo) return null;
			return AddItemInfo.getAddItemAttr(cfgInfo, cfgInfo.needItem, "needItemInfo")[0];
		}
	}
}

