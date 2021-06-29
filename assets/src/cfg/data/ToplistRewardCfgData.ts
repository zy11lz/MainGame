
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ToplistRewardCfgData extends ToplistRewardBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getInfoByRank(rank: number, type: number): ToplistRewardCfgInfo
		{
			let arr = this.getRewardListByType(type);
			for (var el of arr)
			{
				if (el.rank >= rank) return el;
			}
			return null;
		}

		protected static _dataArrByType: Object;
		public static getRewardListByType(type: number): ToplistRewardCfgInfo[]
		{
			if (this._dataArrByType == null)
			{
				this._dataArrByType = TemplateUtil.createSimpleIndexFromObj(this._dataArr, "type");
			}
			return this._dataArrByType[type];
		}

		public static getAddItemAryByInfo(info: ToplistRewardCfgInfo): AddItemInfo[]
		{
			if (info)
			{
				let saveKey = "AddItemArr";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.reward);
				}
				return info[saveKey];
			}
			return [];
		}
	}
}

