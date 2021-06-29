
/**
* 
*  配置数据访问
*/
module cfg
{
	export class HeavenPrayPrizePoolCfgData extends HeavenPrayPrizePoolBaseCfgData
	{
		constructor()
		{
			super();
		}

		// key : 奖池种类 val: 所有对应种类的数据
		private static indexDic: { [key: number]: Array<HeavenPrayPrizePoolCfgInfo> } = {};

		public static setup(dataArr: Array<HeavenPrayPrizePoolCfgInfo>): void
		{
			super.setup(dataArr);
			for (let i in dataArr)
			{
				let d = dataArr[i];
				if (!this.indexDic[d.pool])
					this.indexDic[d.pool] = [];
				this.indexDic[d.pool].push(d);
			}
		}

		/**
		 * 根据奖池类型获取所有对应奖励种类数据
		 * @param pid 
		 */
		public static getDataArrByPool(pid: number): Array<HeavenPrayPrizePoolCfgInfo>
		{
			return this.indexDic[pid] || [];
		}

	}
}

