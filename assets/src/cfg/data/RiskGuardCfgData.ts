
/**
* 
*  配置数据访问
*/
module cfg
{
	export class RiskGuardCfgData extends RiskGuardBaseCfgData
	{
		constructor()
		{
			super();
		}

		protected static _dataMapByStageAndIndex: Object;

		/** 根据楼层与守卫index，获取对应的配置信息 */
		public static getInfoByStageAndIndex(stage: number, guardIndex: number): RiskGuardCfgInfo
		{
			let key = stage + "_" + guardIndex;
			if (!this._dataMapByStageAndIndex) this._dataMapByStageAndIndex = TemplateUtil.createUniqIndexFromArr(this._dataArr, ["stage", "guardIndex"]);
			let list = this._dataMapByStageAndIndex[key];
			if (list) return list[0];
			return null;
		}

		/** 最大层 */
		public static getMaxStage(): number
		{
			return this._dataArr[this._dataArr.length - 1].stage;
		}

	}
}

