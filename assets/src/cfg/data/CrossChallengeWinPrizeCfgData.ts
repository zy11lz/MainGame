
/**
* 
*  配置数据访问
*/
module cfg
{
	export class CrossChallengeWinPrizeCfgData extends CrossChallengeWinPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAddItemAryByID(id: number): Array<AddItemInfo>
		{
			let cfg_info = this.getInfo(id);
			if (!cfg_info) return null;
			return AddItemInfo.getAddItemAttr(cfg_info, cfg_info.addItem, "addItemAry");
		}

	}
}

