
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PrivilegeDailyPrizeCfgData extends PrivilegeDailyPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAddItemInfoArrByType(type: number): AddItemInfo[]
		{
			let cfgInfo = this.getInfo(type);
			if (!cfgInfo) return null;
			return AddItemInfo.getAddItemAttr(cfgInfo, cfgInfo.addItem, "addItemInfoArr");
		}

	}
}

