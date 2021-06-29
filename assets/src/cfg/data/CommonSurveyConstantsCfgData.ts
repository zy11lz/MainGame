
/**
* 
*  配置数据访问
*/
module cfg
{
	export class CommonSurveyConstantsCfgData extends CommonSurveyConstantsBaseCfgData
	{
		constructor()
		{
			super();
		}

		/** 答题固定奖励 */
		public static getPrizeAddItems(): AddItemInfo[]
		{
			let info = this.getFirstInfo();
			return cfg.AddItemInfo.getAddItemAttr(info, info.prize, "prizeInfoArr");
		}
		/** 幸运奖励预览 */
		public static getLuckeyPrizeAddItems(): AddItemInfo[]
		{
			let info = this.getFirstInfo();
			return cfg.AddItemInfo.getAddItemAttr(info, info.luckyPrize, "luckeyprizeInfoArr");
		}

	}
}

