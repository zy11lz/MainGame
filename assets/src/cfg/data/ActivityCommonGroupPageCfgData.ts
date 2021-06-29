
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ActivityCommonGroupPageCfgData extends ActivityCommonGroupPageBaseCfgData
	{
		constructor()
		{
			super();
		}


		/** 一个活动ID对应一个列表 */
		protected static _listByGrpid: Object;
		public static getListByGrpId(value: number): ActivityCommonGroupPageCfgInfo[]
		{
			if (this._listByGrpid == null)
			{
				this._listByGrpid = TemplateUtil.createSimpleIndexFromObj(this._dataArr, "groupID");
			}
			return this._listByGrpid[value] || [];
		}
	}
}

