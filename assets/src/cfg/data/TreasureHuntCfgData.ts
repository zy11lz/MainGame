
/**
* 
*  配置数据访问
*/
module cfg
{
	export class TreasureHuntCfgData extends TreasureHuntBaseCfgData
	{
		constructor()
		{
			super();
		}

		private static _dataArrByGroup: Object;
		/** 类型对应列表 */
		public static getListByGroup(group: number): TreasureHuntCfgInfo[]
		{
			if (!this._dataArrByGroup)
			{
				this._dataArrByGroup = TemplateUtil.createSimpleIndexFromObj(this._dataArr, "group");
			}
			return this._dataArrByGroup[group];
		}

		public static getAddRandItemArrByInfo(cfgInfo: TreasureHuntCfgInfo): AddItemInfo[]
		{
			if (!cfgInfo) return null;
			return AddItemInfo.getAddItemAttr(cfgInfo, cfgInfo.addRandItem, "addRandItemInfo");
		}
	}
}

