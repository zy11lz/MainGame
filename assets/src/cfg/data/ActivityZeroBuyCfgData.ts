
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ActivityZeroBuyCfgData extends ActivityZeroBuyBaseCfgData
	{
		constructor()
		{
			super();
		}

		/** 一个活动ID对应一个列表 */
		protected static _listByActid: Object;
		public static getListByActId(value: number): ActivityZeroBuyCfgInfo[]
		{
			if (this._listByActid == null)
			{
				this._listByActid = TemplateUtil.createSimpleIndexFromObj(this._dataArr, "activityID");
			}
			return this._listByActid[value] || [];
		}

	}
}

