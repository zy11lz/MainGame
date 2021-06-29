
/**
* 
*  配置数据访问
*/
module cfg
{
	export class RuneRefineCfgData extends RuneRefineBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getNeedItemAryById(value: number): AddItemInfo[]
		{
			let info = this.getInfo(value);
			if (info)
			{
				return AddItemInfo.getAddItemAttr(info, info.needItemExpend, "needItemExpendInfoAry");
			}
			return null;
		}

		public static getLockNeedItemAryById(value: number): AddItemInfo[]
		{
			let info = this.getInfo(value);
			if (!info) return null;
			return AddItemInfo.getAddItemAttr(info, info.lockNeedItem, "lockNeedItemInfoAry");
		}
	}
}

