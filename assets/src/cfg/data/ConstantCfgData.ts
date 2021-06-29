
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ConstantCfgData extends ConstantBaseCfgData
	{
		private static _indexDic: Object = {};

		constructor()
		{
			super();
		}

		public static setup(dataArr: Array<ConstantCfgInfo>): void
		{
			super.setup(dataArr);
			this._indexDic = TemplateUtil.createUniqIndexFromArr(dataArr, ["typeIndex", "enumIndex"])
		}

		public static getDefaultValueWithFun(typeIndex: Pb_God._emConstantType, enumIndex: number): number
		{
			let results = this._indexDic[typeIndex + "_" + enumIndex];
			if (results != null)
			{
				let tmpInfo = results[0] as ConstantCfgInfo;
				return tmpInfo.constantValue;
			}
			return 0;
		}
	}
}

