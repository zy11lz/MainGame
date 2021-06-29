
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ResonanceGridCfgData extends cfg.ResonanceGridBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static setup(dataArr: Array<cfg.ResonanceGridCfgInfo>): void
		{
			super.setup(dataArr);
		}

		public static getAll()
		{
			return this._dataArr;
		}

		public static getGridCfgByType(iType: Pb_God._emResonanceType): ResonanceGridCfgInfo[]
		{
			let all = this.getAll();
			let arr = [];
			for (let i = 0; i < all.length; i++)
			{
				if (all[i].type == iType)
					arr.push(all[i]);
			}
			return arr;
		}

		public static getConsumeByTypeAndGridIndex(iType: Pb_God._emResonanceType, gridIndex: number)
		{
			let typeInfo = this.getGridCfgByType(iType);
			for (let i = 0; i < typeInfo.length; i++)
			{
				if (typeInfo[i].gridIdx == gridIndex)
				{
					return typeInfo[i].needItem;
				}
			}
		}

		public static getConsume()
		{
			return this._dataArr[1].needItem.split("_");
		}
	}
}

