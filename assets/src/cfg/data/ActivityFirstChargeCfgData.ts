
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ActivityFirstChargeCfgData extends ActivityFirstChargeBaseCfgData
	{
		constructor()
		{
			super();
		}

		/** 一个充值金额对应一个列表 */
		protected static _dataArrByAmount: ActivityFirstChargeCfgInfo[][];
		/** 根据index获取对应金额的列表 */
		public static getListByAmountIndex(index: number): ActivityFirstChargeCfgInfo[]
		{
			if (this._dataArrByAmount == null)
			{
				this._dataArrByAmount = [];
				let i = 0;
				let tempMap = {};
				for (var el of this._dataArr)
				{
					if (tempMap[el.amount] == null)
					{
						tempMap[el.amount] = i;
						this._dataArrByAmount[i] = [];
						i++;
					}
					this._dataArrByAmount[tempMap[el.amount]].push(el);
				}
			}
			return this._dataArrByAmount[index];
		}

	}
}

