
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ResPreloadCfgData extends ResPreloadBaseCfgData
	{
		constructor()
		{
			super();
		}

		protected static _dataDicByDoubleKey: Object;
		public static getInfosByDoubleKey(triggerType: number, triggerStep: number): ResPreloadCfgInfo[]
		{
			if (!this._dataDicByDoubleKey) this._dataDicByDoubleKey = TemplateUtil.createUniqIndexFromArr(this._dataArr, ["triggerType", "triggerStep"]);
			return this._dataDicByDoubleKey[`${ triggerType }_${ triggerStep }`];
		}

	}
}

