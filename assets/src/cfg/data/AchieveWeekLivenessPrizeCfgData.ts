
/**
* 
*  配置数据访问
*/
module cfg
{
	export class AchieveWeekLivenessPrizeCfgData extends AchieveWeekLivenessPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataList(): AchieveWeekLivenessPrizeCfgInfo[]
		{
			return this._dataArr;
		}


		public static getNeedItemAryById(value: number): Array<AddItemInfo>
		{
			let info = this.getInfo(value);
			if (!info) return null;
			return AddItemInfo.getAddItemAttr(info, info.needItem, "needItemAry");
		}

	}
}

