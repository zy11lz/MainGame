
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PrivilegeShopCfgData extends PrivilegeShopBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAll(): Array<PrivilegeShopCfgInfo>
		{
			return this._dataArr;
		}

		public static getNeedItemInfoByInfo(cfgInfo: PrivilegeShopCfgInfo): AddItemInfo
		{
			if (!cfgInfo) return null;
			return AddItemInfo.getAddItemAttr(cfgInfo, cfgInfo.needItem, "needItemInfoArr")[0];
		}

		public static getAddItemInfoByInfo(cfgInfo: PrivilegeShopCfgInfo): Array<AddItemInfo>
		{
			if (!cfgInfo) return null;
			return AddItemInfo.getAddItemAttr(cfgInfo, cfgInfo.addItem, "addItemInfoArr");
		}

	}
}

