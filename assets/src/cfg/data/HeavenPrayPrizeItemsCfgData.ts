
/**
* 
*  配置数据访问
*/
module cfg
{
	export class HeavenPrayPrizeItemsCfgData extends HeavenPrayPrizeItemsBaseCfgData
	{
		constructor()
		{
			super();
		}

		// key : 奖池种类 val: 所有对应种类的数据
		private static indexDic: { [key: number]: Array<HeavenPrayPrizeItemsCfgInfo> } = {};

		public static setup(dataArr: Array<HeavenPrayPrizeItemsCfgInfo>): void
		{
			super.setup(dataArr);
			for (let i in dataArr)
			{
				let d = dataArr[i];
				if (!this.indexDic[d.type])
					this.indexDic[d.type] = [];
				this.indexDic[d.type].push(d);
			}
		}

		/**
		 * 根据奖池类型获取所有对应奖励数据
		 * @param type 
		 */
		public static getDataArrByType(type: number): Array<HeavenPrayPrizeItemsCfgInfo>
		{
			return this.indexDic[type] || [];
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

		/**
		 * 对应类型奖池总概率
		 * @param value 
		 */
		public static getSubRateByPoolType(value: number): number
		{
			let arr = this.getDataArrByType(value);
			let result = 0;
			arr.forEach(e => result += e.chance);
			return result;
		}
	}
}

