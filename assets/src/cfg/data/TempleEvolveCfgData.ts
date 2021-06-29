
/**
* 
*  配置数据访问
*/
module cfg 
{
	export class TempleEvolveCfgData extends TempleEvolveBaseCfgData 
	{
		constructor() 
		{
			super();
		}

		protected static _dataArrByType: Object;
		/** 根据当前的进化数量区间获取对应的配置数据 */
		public static getInfoByCount(type: number, evolveCount: number): TempleEvolveCfgInfo
		{
			if (this._dataArrByType == null)
			{
				this._dataArrByType = TemplateUtil.createSimpleIndexFromObj(this._dataArr, "type");
			}
			let arr = this._dataArrByType[type];
			let cfgData = null;
			for (cfgData of arr)
			{
				if (evolveCount <= cfgData.count)
					return cfgData;
			}
			return cfgData;
		}
	}
}

