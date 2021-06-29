
/**
* 
*  配置数据访问
*/
module cfg
{
	export class LotteryCostCfgData extends cfg.LotteryCostBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static setup(dataArr: Array<cfg.LotteryCostCfgInfo>): void
		{
			super.setup(dataArr);
		}

		/** 根据类型与索引获取数据 */
		public static getInfoByTypeAndIndex(type: number, index: number): LotteryCostCfgInfo
		{
			let lottery: Array<cfg.LotteryCostCfgInfo> = this._dataArr.filter(elment => elment.type == type && elment.index == index);
			if (lottery.length > 0) return lottery[0];
			return null;
		}

		public static getCallItemIdByTypeAndIndex(type: number, index: number): number
		{
			return parseInt(this.getInfoByTypeAndIndex(type, index).needItem1.split("_")[0]);
		}
	}
}

