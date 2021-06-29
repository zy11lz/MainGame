
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ShopFixShopCfgData extends ShopFixShopBaseCfgData
	{
		protected static _dataArrByType: Object;
		constructor()
		{
			super();
		}

		public static getDataArrayByShopType(value: number): Array<ShopFixShopCfgInfo>
		{
			if (this._dataArrByType == null)
			{
				this._dataArrByType = TemplateUtil.createSimpleIndexFromObj(this._dataArr, "shopType");
			}
			return this._dataArrByType[value] || [];
		}

		public static getInfoByTypeAndIndex(shopType: number, index: number): ShopFixShopCfgInfo
		{
			let results = this._dataArr.filter(elment => elment.shopType == shopType && elment.index == index);
			return results.length > 0 ? results[0] : null;
		}

		public static getSellItemAryByInfo(info: ShopFixShopCfgInfo): AddItemInfo[]
		{
			if (info)
			{
				let saveKey = "sellItemAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.sellItem);
				}
				return info[saveKey];
			}
			return null;
		}

		// public static getNeedItemByInfo(info: ShopFixShopCfgInfo): AddItemInfo {
		// 	if (info) {
		// 		let saveKey = "needItemAry";
		// 		if (info[saveKey] == null) {
		// 			info[saveKey] = AddItemInfo.parse(info.needItem)[0];
		// 		}
		// 		return info[saveKey];
		// 	}
		// 	return null;
		// }

	}
}

