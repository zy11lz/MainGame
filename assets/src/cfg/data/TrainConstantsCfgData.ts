
/**
* 
*  配置数据访问
*/
module cfg
{
	export class TrainConstantsCfgData extends TrainConstantsBaseCfgData
	{
		constructor()
		{
			super();
		}

		/** 巅峰挑战购买次数的消耗 */
		public static getPeakBuyCountNeedItem(): AddItemInfo
		{
			let info = this.getFirstInfo();
			return cfg.AddItemInfo.getAddItemAttr(info, info.countNeedItem, "countNeedItemInfoArr")[0];
		}
		/** 巅峰挑战购买buff的消耗 */
		public static getPeakBuyBuffNeedItem(): AddItemInfo
		{
			let info = this.getFirstInfo();
			return cfg.AddItemInfo.getAddItemAttr(info, info.buffNeedItem, "buffNeedItemInfoArr")[0];
		}

	}
}

