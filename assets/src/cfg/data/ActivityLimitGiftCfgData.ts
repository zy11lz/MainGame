
/**
* 
*  配置数据访问
*/
module cfg
{
	export class ActivityLimitGiftCfgData extends ActivityLimitGiftBaseCfgData
	{
		constructor()
		{
			super();
		}


		/** 一个活动ID对应一个列表 */
		protected static _listByActid: Object;
		public static getListByActId(value: number): ActivityLimitGiftCfgInfo[]
		{
			if (this._listByActid == null)
			{
				this._listByActid = TemplateUtil.createSimpleIndexFromObj(this._dataArr, "activityID");
			}
			return this._listByActid[value] || [];
		}
	}
}

