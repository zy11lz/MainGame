
/**
*
*  配置数据访问
*/
module cfg
{
	export class RiskShopCfgData extends RiskShopBaseCfgData
	{
		constructor()
		{
			super();
		}

		/** 商品 */
		public static getSellItemByCfgInfo(info: cfg.RiskShopCfgInfo): cfg.AddItemInfo
		{
			if (info)
			{
				let saveKey = "sellItemInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = cfg.AddItemInfo.parse(info.sellItem)[0];
				}
				return info[saveKey];
			}
			return null;
		}
		/** 货币 */
		public static getNeedItemByCfgInfo(info: cfg.RiskShopCfgInfo): cfg.AddItemInfo
		{
			if (info)
			{
				let saveKey = "needItemInfo";
				if (info[saveKey] == null)
				{
					info[saveKey] = cfg.AddItemInfo.parse(info.sellPrize)[0];
				}
				return info[saveKey];
			}
			return null;
		}

	}
}

