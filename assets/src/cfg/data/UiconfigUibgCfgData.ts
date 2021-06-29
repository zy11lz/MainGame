
/**
* 
*  配置数据访问
*/
module cfg
{
	export class UiconfigUibgCfgData extends UiconfigUibgBaseCfgData
	{
		protected static _dataDicByName: Object;
		constructor()
		{
			super();
		}

		public static setup(dataArr: Array<UiconfigUibgCfgInfo>): void
		{
			super.setup(dataArr);
			this._dataDicByName = TemplateUtil.createUniqIndexFromArr(dataArr, ["panelName"])
		}

		public static getUIBGNameWithPanel(panelName: string): string
		{
			if (this._dataDicByName == null)
			{
				return null;
			}
			let results = this._dataDicByName[panelName];
			return results != null ? results[0].bGUrl : null;
		}
	}
}

