
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ElementBuyCountCfgData extends ElementBuyCountBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getDataList(): ElementBuyCountCfgInfo[]
		{
			return this._dataArr;
		}

		public static getLastInfo(): ElementBuyCountCfgInfo
		{
			return this._dataArr[this._dataArr.length - 1];
		}

		public static getInfoWithFun(count: number): ElementBuyCountCfgInfo
		{
			let tmpOld = 0;
			let tempCfgAry = this.getDataList();
			for (let i = 0; i < tempCfgAry.length; i++)
			{
				if (count > tmpOld && count <= tempCfgAry[i].count)
				{
					return tempCfgAry[i];
				}
				tmpOld = tempCfgAry[i].count;
			}

			return tempCfgAry[tempCfgAry.length - 1];
		}
	}
}

