
/**
* 
*  配置数据访问
*/
module cfg
{
	export class StrongerResListDetailCfgData extends StrongerResListDetailBaseCfgData
	{
		constructor()
		{
			super();
		}

		public static getAllList(): StrongerResListDetailCfgInfo[]
		{
			return this._dataArr;
		}

		public static getListWithTitleID(titleID: number): StrongerResListDetailCfgInfo[]
		{
			return this._dataArr.filter(elment => elment.resTitleID == titleID);
		}
	}
}

