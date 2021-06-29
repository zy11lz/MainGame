
/**
* 
*  配置数据访问
*/
module cfg
{
	export class HeavenCommonCfgData extends HeavenCommonBaseCfgData
	{
		constructor()
		{
			super();
		}

		/**
		 * 购买挑战次数消耗物品id
		 * @param idx 
		 */
		public static getCostItemInfobyIndex(idx: number): cfg.AddItemInfo
		{
			let info = this.getInfo(idx);
			if (!info) return null;
			let save_key = "costItemInfo";
			if (!info[save_key])
			{
				info[save_key] = cfg.AddItemInfo.parse(info.buyNeedItem)[0];
			}
			return info[save_key];
		}
	}
}

