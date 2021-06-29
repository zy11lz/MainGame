
/**
* 
*  配置数据访问
*/
module cfg
{
	export class PetBuyBagCfgData extends PetBuyBagBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getInfoWithFun(totleBuySpace: number): PetBuyBagCfgInfo
		{
			let results = this._dataArr.filter(elment => elment.totalBuySpace == totleBuySpace);
			return results.length > 0 ? results[0] : null;
		}
	}
}

