
/**
* 
*  配置数据访问
*/
module cfg
{
	export class AchieveWarOrderPrizeCfgData extends AchieveWarOrderPrizeBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAll(): AchieveWarOrderPrizeCfgInfo[]
		{
			return this._dataArr;
		}

	}
}

