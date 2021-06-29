
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ErrorCodeErrorCodeCfgData extends ErrorCodeErrorCodeBaseCfgData
	{
		private static _indexDic: Object = {};
		constructor()
		{
			super();
		}

		public static setup(dataArr: Array<ErrorCodeErrorCodeCfgInfo>): void
		{
			super.setup(dataArr);
			this._indexDic = TemplateUtil.createUniqIndexFromArr(dataArr, ["mainProtocol", "eventFlag"])
		}


		// public static getInfoWithFun(mainProtocol:number,eventFlag:number):ErrorCodeCfgInfo[]{
		// 	let resultAry = this._dataArr.filter(elment=>elment.mainProtocol==mainProtocol && elment.eventFlag == eventFlag)
		// 	return resultAry;
		// }

		public static getErrorCodeTxt(mainProtocol: number, eventFlag: number): string
		{
			let resultAry: Array<ErrorCodeErrorCodeCfgInfo> = this._indexDic[mainProtocol + "_" + eventFlag];
			if (resultAry && resultAry.length > 0)
			{
				return resultAry[0].error;
			}
			return null
		}


	}
}

