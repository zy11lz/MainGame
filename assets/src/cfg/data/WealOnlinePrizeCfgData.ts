
/**
* 
*  配置数据访问
*/
module cfg
{
	export class WealOnlinePrizeCfgData extends WealOnlinePrizeBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAll(): WealOnlinePrizeCfgInfo[]
		{
			return this._dataArr;
		}

		public static getAddItemInfoByInfo(info: WealOnlinePrizeCfgInfo): AddItemInfo
		{
			if (!info) return null;
			return AddItemInfo.getAddItemAttr(info, info.addItem, "addItemInfoArr")[0];
		}

	}
}

