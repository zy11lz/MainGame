
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PetRebornCostCfgData extends PetRebornCostBaseCfgData
	{
		constructor()
		{
			super();
		}

		/** 购买次数需要的道具 */
		public static getNeedItemInfo(buyCount: number): cfg.AddItemInfo
		{
			let info = this.getInfo(buyCount);
			if (!info) return null;
			return cfg.AddItemInfo.getAddItemAttr(info, info.needItem, "needItemInfoArr")[0];
		}
	}
}

