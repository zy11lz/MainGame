
/**
* 
*  配置数据访问
*/
module cfg
{
	export class HeavenChapterPrizeCfgData extends HeavenChapterPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}

		protected static _indexDic: { [key: number]: Array<HeavenChapterPrizeCfgInfo> } = {};

		public static setup(dataArr: Array<HeavenChapterPrizeCfgInfo>): void
		{
			super.setup(dataArr);

			for (let i in dataArr)
			{
				let info = dataArr[i];
				if (!this._indexDic[info.chapter])
					this._indexDic[info.chapter] = [];
				this._indexDic[info.chapter].push(info);
			}
		}

		/**
		 * 获取章节奖励箱子列表
		 * @param index 
		 */
		public static getInfoArrayByChapterIndex(index: number): Array<HeavenChapterPrizeCfgInfo>
		{
			return this._indexDic[index] || [];
		}

		public static getAddItemAryById(value: number): Array<AddItemInfo>
		{
			let info = this.getInfo(value);
			if (info)
			{
				let saveKey = "addItemAry";
				if (info[saveKey] == null)
				{
					info[saveKey] = AddItemInfo.parse(info.addItem);
				}
				return info[saveKey];
			}
			return null;
		}

	}
}

