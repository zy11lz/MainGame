
/**
* 
*  配置数据访问
*/
module cfg
{
	export class HookBuySweepcountCfgData extends HookBuySweepcountBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataList(): HookBuySweepcountCfgInfo[]
		{
			return this._dataArr;
		}

		public static getLastInfo(): HookBuySweepcountCfgInfo
		{
			return this._dataArr[this._dataArr.length - 1];
		}

		public static getInfoWithFun(count: number): HookBuySweepcountCfgInfo
		{
			let tmpOld = 0;
			let tempCfgAry = this.getDataList();
			for (let i = 0; i < tempCfgAry.length; i++)
			{
				if (count > tmpOld && count <= tempCfgAry[i].buyCount)
				{
					return tempCfgAry[i];
				}
				tmpOld = tempCfgAry[i].buyCount;
			}

			return tempCfgAry[tempCfgAry.length - 1];
		}
	}
}

