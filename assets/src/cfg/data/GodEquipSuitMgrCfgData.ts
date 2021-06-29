
/**
* 
*  配置数据访问
*/
module cfg
{
	export class GodEquipSuitMgrCfgData extends GodEquipSuitMgrBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAll(): cfg.GodEquipSuitMgrCfgInfo[]
		{
			return this._dataArr;
		}

		public static getNeedItemInfoByInfo(info: cfg.GodEquipSuitMgrCfgInfo): cfg.AddItemInfo
		{
			if (!info) return null;
			return cfg.AddItemInfo.getAddItemAttr(info, info.needItem, "needItemInfoArr")[0];
		}
	}
}

